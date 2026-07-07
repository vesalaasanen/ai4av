---
spec_id: admin/domintell-dnipb02-b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Domintell LightProtocol Communication Interface Control Spec"
manufacturer: Domintell
model_family: DNET01
aliases: []
compatible_with:
  manufacturers:
    - Domintell
  models:
    - DNET01
    - DNET02
    - DGQG02
    - DGQG04
    - DGQG05
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro2.mydomintell.com
  - pro.mydomintell.com
source_urls:
  - https://pro2.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v16-20250319.pdf
  - https://pro.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v13-20230222.pdf
retrieved_at: 2026-07-01T15:13:38.500Z
last_checked_at: 2026-07-07T11:35:05.402Z
generated_at: 2026-07-07T11:35:05.402Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "provided device name \"Dnipb02 B\" and known protocol \"RS-232C\" do not match the source. Source explicitly states it \"only covers Ethernet modules of new generation ... using Secured Websockets instead of RS232 or UDP socket.\" No RS-232/serial electrical parameters (baud, data bits, parity) are given."
  - "no discrete variable table in source; values are IO-instance specific."
  - "no named macros in source."
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware/protocol version compatibility is per-installation (PROG M / DAP version in APPINFO header); no fixed range stated."
  - "several verbs are version-gated (e.g. %I%D/%O%D, %A, %F broken for DAP 31..41.4; /104,/105,/82 require PROG M 43.7; /77 requires 39.1) — capability depends on the connected master's version."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:35:05.402Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "All 50 spec actions matched their wire-literal counterparts in the source; transport values (port 17481, wss base_url, password auth) are confirmed; source command catalogue is fully represented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Domintell LightProtocol Communication Interface Control Spec

## Summary
Domintell "LightProtocol" text control interface exposed by the new-generation Ethernet communication modules (DNET01, DNET02, DGQG02, DGQG04, DGQG05). The modules act as a LightProtocol server that a third-party client drives over a **Secured WebSocket (wss)** connection on TCP port 17481. The spec covers session management, the APPINFO configuration discovery command, legacy text-frame commands, and the new-generation (NewGen) slash-command frame format used to control relays, dimmers, shutters, fans, sensors, DMX/RGBW, HVAC and energy-metering IO across the Domintell2 installation.

<!-- UNRESOLVED: provided device name "Dnipb02 B" and known protocol "RS-232C" do not match the source. Source explicitly states it "only covers Ethernet modules of new generation ... using Secured Websockets instead of RS232 or UDP socket." No RS-232/serial electrical parameters (baud, data bits, parity) are given. -->

## Transport
```yaml
# Source: section 2.1/2.2 - new-gen Ethernet modules use Secured WebSocket
# (wss) on default port 17481. Not RS-232 despite the RS-232C hint in the task.
# WebSocket upgrades from HTTP; closest enum value is `http`. No serial: block
# (serial is N/A for this interface, not UNRESOLVED).
protocols:
  - http
addressing:
  port: 17481
  base_url: "wss://{ip}:17481"  # Secure WebSocket; data encrypted in encapsulated frame over HTTP
auth:
  type: password  # source describes a login procedure (REQUESTSALT + LOGINPSW)
  # Mechanism (section 5.3/5.5): token = sha512( sha512(password + salt) + nonce )
  # First-gen modules accept bare "LOGINPSW@:" with no credentials.
```

## Traits
```yaml
# - queryable       (PING, %S, /103 status queries documented)        # inferred
# - levelable       (%Dnnn, %Xnnn, /5 dimmer/0-10V/DMX level control)  # inferred
traits:
  - queryable  # inferred: status query commands present in source
  - levelable  # inferred: percentage/level set commands present in source
```

## Actions
```yaml
# =====================================================================
# Coverage note: distinct commands are enumerated per source row.
#   - Section 4.1 reserved keywords  -> session commands (one each)
#   - Section 4.6.d action parameters -> legacy "%" verbs (one each)
#   - Section 4.8.j/4.8.k            -> NewGen "/" command verbs (one each)
# Parameter ranges inside one verb (e.g. %D0..%D100) are NOT split.
# =====================================================================
# Legacy frame prefix (section 4.6.c), used by every legacy "%" verb:
#   <ModType(3)><Serial(6 hex)><-><IONum(1-2 hex)>
# Example frame: "BU1    11-1"  (module DPBU01, s/n 0x000011, output 1).
# Below, "{frame}" = that prefix; the literal verb follows it verbatim.

# ---- Session / management commands (section 4.1, 5.x) ----
- id: request_salt
  label: Request Salt
  kind: query
  command: "REQUESTSALT@{username}"
  params:
    - name: username
      type: string
      description: Account username created in GoldenGate

- id: open_session
  label: Open Session (LOGINPSW)
  kind: action
  command: "LOGINPSW@{username}:{hashedpsw}"
  params:
    - name: username
      type: string
      description: Account username
    - name: hashedpsw
      type: string
      description: "sha512(sha512(password+salt)+nonce) as lowercase hex; first-gen modules use bare LOGINPSW@: with empty user/psw"
  notes: "First-gen welcome 'INFO:Waiting for LOGINPSW:INFO' -> send 'LOGINPSW@:' (no credentials)."

- id: logout
  label: Logout
  kind: action
  command: "LOGOUT"
  params: []

- id: set_timeout
  label: Set Session Timeout
  kind: action
  command: "TIMEOUT={minutes}"
  params:
    - name: minutes
      type: integer
      description: "Timeout in minutes; 0 disables timeout (socket stays open until LOGOUT or connection loss)"

- id: hello
  label: Hello (Heartbeat)
  kind: action
  command: "HELLO"
  params: []
  notes: "Send every ~50s to keep session open. Avoid PING for keepalive."

- id: appinfo
  label: Download Application Info
  kind: query
  command: "APPINFO"
  params: []
  notes: "Streams the full installation (modules/IOs). Terminated by 'END APPINFO'."

- id: ping
  label: Refresh All Statuses
  kind: query
  command: "PING"
  params: []
  notes: "Server replies PONG then all cached IO statuses. Use only on reconnect, not periodically."

- id: getlpver
  label: Get LightProtocol Version
  kind: query
  command: "GETLPVER"
  params: []
  notes: "From PROG M 43.7. Returns e.g. 'INFO:LPVER=43.7.1:INFO'."

- id: discover
  label: Discover Host Device
  kind: query
  command: "DISCOVER"
  params: []
  notes: "From PROG M 43.7. Returns e.g. 'INFO:I AM A DGQG04-192.168.1.250-...-17481-...:INFO'."

- id: voiceinfo
  label: Voice Assistant Info
  kind: query
  command: "VOICEINFO"
  params: []
  notes: "Reserved for voice-assistant servers; DNET02 only. From DAP 40.0."

# ---- Legacy action/command parameters (section 4.6.d) ----
# Each command is "{frame}{verb}". {frame} = <ModType><Serial>-<IO>.
- id: legacy_toggle
  label: Toggle Output
  kind: action
  command: "{frame}"
  params:
    - name: frame
      type: string
      description: "Legacy frame prefix <ModType><SerialHex>-<IONumHex>"

- id: legacy_ask_status
  label: Ask Status (%S)
  kind: query
  command: "{frame}%S"
  params:
    - name: frame
      type: string
      description: "Module frame; IO index omitted to ask whole module/group/scene"
  notes: "NewGen masters return cached RAM value (no bus poll). For NewGen modules use /103."

- id: legacy_set_on
  label: Set Output On (%I)
  kind: action
  command: "{frame}%I"
  params:
    - name: frame
      type: string
      description: Legacy frame prefix

- id: legacy_set_off
  label: Reset Output Off (%O)
  kind: action
  command: "{frame}%O"
  params:
    - name: frame
      type: string
      description: Legacy frame prefix

- id: legacy_set_percent
  label: Set Percent (%Dnnn)
  kind: action
  command: "{frame}%D{value}"
  params:
    - name: frame
      type: string
      description: Legacy frame prefix
    - name: value
      type: integer
      description: "0-100 (1-3 decimal digits)"

- id: legacy_increase_percent
  label: Increase Percent (%I%Dnnn)
  kind: action
  command: "{frame}%I%D{value}"
  params:
    - name: frame
      type: string
    - name: value
      type: integer
      description: "1-100 step (no effect on AMP volume, always +1%)"
  notes: "Alias %DInnn from v41.5. Broken for DAP 31..41.4 inclusive."

- id: legacy_decrease_percent
  label: Decrease Percent (%O%Dnnn)
  kind: action
  command: "{frame}%O%D{value}"
  params:
    - name: frame
      type: string
    - name: value
      type: integer
      description: "1-100 step"
  notes: "Alias %DOnnn from v41.5. Broken for DAP 31..41.4 inclusive."

- id: legacy_start_dim
  label: Start Dimming (%DB)
  kind: action
  command: "{frame}%DB"
  params:
    - name: frame
      type: string

- id: legacy_stop_dim
  label: Stop Dimming (%DE)
  kind: action
  command: "{frame}%DE"
  params:
    - name: frame
      type: string

- id: legacy_set_dmx
  label: Set DMX Channel (%Xnnn)
  kind: action
  command: "{frame}%X{value}"
  params:
    - name: frame
      type: string
    - name: value
      type: integer
      description: "0-255"

- id: legacy_set_heating_setpoint
  label: Set Heating Setpoint (%Tnn.n)
  kind: action
  command: "{frame}%T{temp}"
  params:
    - name: frame
      type: string
    - name: temp
      type: number
      description: Celsius, floating point

- id: legacy_set_cooling_setpoint
  label: Set Cooling Setpoint (%Unn.n)
  kind: action
  command: "{frame}%U{temp}"
  params:
    - name: frame
      type: string
    - name: temp
      type: number
      description: Celsius, floating point

- id: legacy_set_temperature_mode
  label: Set Temperature Mode (%Mn)
  kind: action
  command: "{frame}%M{mode}"
  params:
    - name: frame
      type: string
    - name: mode
      type: integer
      description: "1=away, 2=auto, 5=comfort, 6=anti-freeze"

- id: legacy_set_regulation_mode
  label: Set Regulation Mode (%Rn)
  kind: action
  command: "{frame}%R{mode}"
  params:
    - name: frame
      type: string
    - name: mode
      type: integer
      description: "0=off, 1=heating, 2=cooling, 3=mixed"

- id: legacy_color_cycle
  label: DMX Color Cycle (%Cn)
  kind: action
  command: "{frame}%C{state}"
  params:
    - name: frame
      type: string
    - name: state
      type: integer
      description: "(none)=toggle, 1=start, 0=stop"
  notes: "Not yet available per source."

- id: legacy_select_source
  label: Select Sound Source (%An)
  kind: action
  command: "{frame}%A{source}"
  params:
    - name: frame
      type: string
    - name: source
      type: integer
      description: "1-4 aux, 5=FM tuner"
  notes: "Broken for DAP 31..41.4 inclusive."

- id: legacy_source_next
  label: Next Source (%I%A / %AN)
  kind: action
  command: "{frame}%I%A"
  params:
    - name: frame
      type: string
  notes: "Alternate verb %AN. From v41.7."

- id: legacy_source_prev
  label: Previous Source (%O%A / %AP)
  kind: action
  command: "{frame}%O%A"
  params:
    - name: frame
      type: string
  notes: "Alternate verb %AP. From v41.7."

- id: legacy_set_frequency
  label: Set Tuner Frequency (%Fnnn.nn)
  kind: action
  command: "{frame}%F{freq}"
  params:
    - name: frame
      type: string
    - name: freq
      type: number
      description: MHz, floating point
  notes: "Broken for DAP 31..41.4 inclusive."

- id: legacy_seek_next_freq
  label: Seek Next Frequency (%I%F / %FN)
  kind: action
  command: "{frame}%I%F"
  params:
    - name: frame
      type: string
  notes: "Alternate verb %FN. From v41.7."

- id: legacy_seek_prev_freq
  label: Seek Previous Frequency (%O%F / %FP)
  kind: action
  command: "{frame}%O%F"
  params:
    - name: frame
      type: string
  notes: "Alternate verb %FP. From v41.7."

- id: legacy_shutter_up
  label: Shutter Up (%H)
  kind: action
  command: "{frame}%H"
  params:
    - name: frame
      type: string

- id: legacy_shutter_down
  label: Shutter Down (%L)
  kind: action
  command: "{frame}%L"
  params:
    - name: frame
      type: string

- id: legacy_set_clock
  label: Set Clock (%K)
  kind: action
  command: "{frame}%K{timespec}"
  params:
    - name: frame
      type: string
    - name: timespec
      type: string
      description: "hh:mm:ss WD DD/MM/YY [-oh:om:os]; WD=hex day mask; trailing offset only for SUNRISE/SUNSET (from v43)"
  notes: "Broken for DAP 31..42.x inclusive."

- id: legacy_simulate_push
  label: Simulate Push (%Pn)
  kind: action
  command: "{frame}%P{type}"
  params:
    - name: frame
      type: string
    - name: type
      type: integer
      description: "1=begin short, 2=end short, 3=begin long, 4=end long"

# ---- New-generation commands (section 4.8.i / 4.8.j / 4.8.k) ----
# NewGen frame: <ModuleType>/<serial(dec)>/<IOtype>/<IOoffset>/<cmd>[|data]
# Prefix shown as "{ngframe}" below.
- id: ng_toggle
  label: NewGen Toggle (/1)
  kind: action
  command: "{ngframe}/1"
  params:
    - name: ngframe
      type: string
      description: "ModuleType/serial/IOtype/IOoffset"
  notes: "For TypeSensorIo, /1|<temp> instead means set heating setpoint."

- id: ng_on
  label: NewGen On (/2)
  kind: action
  command: "{ngframe}/2"
  params:
    - name: ngframe
      type: string
  notes: "For TypeSensorIo, /2|<temp> instead means set cooling setpoint."

- id: ng_off
  label: NewGen Off (/3)
  kind: action
  command: "{ngframe}/3"
  params:
    - name: ngframe
      type: string

- id: ng_set_value
  label: NewGen Set Value (/5)
  kind: action
  command: "{ngframe}/5|{value}"
  params:
    - name: ngframe
      type: string
    - name: value
      type: integer
      description: "Type-dependent (0-100 dimmer/0-10V/fan speed; 1..npositions vanes; 252/253/254 special)"

- id: ng_move_up
  label: NewGen Shutter Up (/10)
  kind: action
  command: "{ngframe}/10"
  params:
    - name: ngframe
      type: string

- id: ng_move_down
  label: NewGen Shutter Down (/11)
  kind: action
  command: "{ngframe}/11"
  params:
    - name: ngframe
      type: string

- id: ng_increase
  label: NewGen Increase Speed/Position (/16)
  kind: action
  command: "{ngframe}/16"
  params:
    - name: ngframe
      type: string

- id: ng_decrease
  label: NewGen Decrease Speed/Position (/17)
  kind: action
  command: "{ngframe}/17"
  params:
    - name: ngframe
      type: string

- id: ng_set_color
  label: NewGen Set Color (/71)
  kind: action
  command: "{ngframe}/71|{mask}|{v1}|{v2}|..."
  params:
    - name: ngframe
      type: string
    - name: mask
      type: integer
      description: "Bit mask; bit n selects channel value n+1 (e.g. 7=RGB, 8=intensity, 16=white)"
    - name: v1
      type: integer
      description: "Channel values 0-255; count = highest set bit + 1"
  notes: "For TypeRgbwIo all values must be decimal. Mask 0x07=RGB, 0x08=intensity, 0x10=white."

- id: ng_color_cycle
  label: NewGen Color Cycle (/77)
  kind: action
  command: "{ngframe}/77|{enable}"
  params:
    - name: ngframe
      type: string
    - name: enable
      type: integer
      description: "1=start, 0=stop; omit for toggle"
  notes: "RGB slaves only. From PROG M 39.1."

- id: ng_ask_status
  label: NewGen Ask Status (/103)
  kind: query
  command: "{ngframe}/103"
  params:
    - name: ngframe
      type: string
      description: "ModuleType/serial/IOtype/IOoffset; use 0 for IOtype/offset to ask whole type/module"
  notes: "Reply carries /S tag when explicitly requested."

- id: ng_simulate_push
  label: NewGen Simulate Push (/104)
  kind: action
  command: "{ngframe}/104|{type}"
  params:
    - name: ngframe
      type: string
    - name: type
      type: integer
      description: "1=start short, 2=end short, 3=start long, 4=end long"
  notes: "From PROG M 43.7. Replaces bare /<type> deprecated form."

- id: ng_gesture
  label: NewGen Gesture (/105)
  kind: action
  command: "{ngframe}/105|{gesture}"
  params:
    - name: ngframe
      type: string
    - name: gesture
      type: integer
      description: "4=up, 5=down"
  notes: "From PROG M 43.7. TypeGestureIo only."

- id: ng_set_temperature_mode
  label: NewGen Set Temperature Mode (/55)
  kind: action
  command: "{ngframe}/55|{mode}"
  params:
    - name: ngframe
      type: string
    - name: mode
      type: integer
      description: "1=absence, 2=auto, 5=comfort, 6=no frost"
  notes: "TypeSensorIo only."

- id: ng_set_regulation_mode
  label: NewGen Set Regulation Mode (/82)
  kind: action
  command: "{ngframe}/82|{mode}"
  params:
    - name: ngframe
      type: string
    - name: mode
      type: integer
      description: "0=off, 1=heating, 2=cooling, 3=mixed, 5=auto-hvac, 6=dry, 7=fan"
  notes: "TypeSensorIo only."
```

## Feedbacks
```yaml
# Legacy status frame (section 4.7.a): <ModType><SerialHex>[-<IO>]<DataType><DataHex>
# NewGen status frame (section 4.8.g): <ModuleType>/<serial>/<IOtype>/<offset>/<data>[#...]
# Data type letter (legacy) determines payload; NewGen data depends on IO type (4.8.k).

- id: system_info
  type: string
  values: []
  description: "Server INFO message wrapped as 'INFO:<text>:INFO' (welcome, session opened/closed/timeout, salt reply, DISCOVER reply, LPVER)."

- id: system_error
  type: string
  values: []
  description: "Server ERROR message wrapped as 'ERROR:<text>:ERROR' (invalid LOGINPSW, invalid command, read-only user denied)."

- id: pong
  type: enum
  values: ["PONG"]
  description: "Acknowledge to PING; all IO statuses follow."

- id: end_appinfo
  type: enum
  values: ["END APPINFO"]
  description: "Marks end of the APPINFO stream."

- id: io_status_change
  type: string
  values: []
  description: "Unsolicited pushed status of a changed IO, in legacy or NewGen frame format (see 4.7/4.8.k)."

- id: master_clock_tick
  type: string
  values: []
  description: "Current DGQG time sent each minute: 'HH:MM DD/MM/YYYY' (NewGen 4-digit year). Not sent for DAP 31.0..41.6 inclusive."
```

## Variables
```yaml
# Settable parameters are driven via the Actions above (percent, setpoint,
# frequency, clock). No standalone variable namespace is defined by the
# protocol beyond per-IO values reflected in status frames.
# UNRESOLVED: no discrete variable table in source; values are IO-instance specific.
```

## Events
```yaml
# Unsolicited server -> client notifications:
- id: status_push
  description: "Status frame pushed on IO state change (legacy or NewGen format)."
- id: info_session_closed_by_server
  description: "'INFO:Session closed by server:INFO' - server drops session (e.g. new DAP received)."
- id: info_session_timeout
  description: "'INFO:Session timeout:INFO' - no HELLO/action before expiry."
- id: firmware_upgrade_warning
  description: "'!! PLEASE UPGRADE DETH02/DRS23202 FIRMWARE' - interface firmware incompatible with master OS."
- id: missing_module_warning
  description: "'! PLEASE RESTART MASTER 0x???????? !' - module absent from interface's module table."
```

## Macros
```yaml
# Source documents no explicit multi-step command macros. Command chaining via
# '&' is explicitly disallowed (section 4.6.b). NewGen frames may bundle
# multiple commands per IO using the '#' separator within a single frame.
# UNRESOLVED: no named macros in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. DFAN01 note (valves follow setpoint
# regulation; toggling valves requires changing the associated sensor setpoint
# first) is an operational constraint, not a safety interlock.
```

## Notes
- **Transport mismatch:** task input supplied known protocol "RS-232C", but the source explicitly covers Secure WebSocket (wss) on port 17481 for new-gen Ethernet modules and states it replaces RS232/UDP. RS232 interfaces (DRS3202, DETH02, DRS23201/02) are referenced only as legacy/older hardware and are *not* documented here. No serial electrical parameters exist in this source.
- **Device-name mismatch:** "Dnipb02 B" does not appear in the source. Documented interface modules: DNET01, DNET02 (≤8 wss connections), DGQG02/DGQG04 (≤2 wss connections), DGQG05.
- **Authentication:** accounts must be created in GoldenGate first. Token = `sha512( sha512(password + salt) + nonce )`, hex-encoded. Salt and nonce are obtained via `REQUESTSALT@<username>`. First-gen modules with welcome `INFO:Waiting for LOGINPSW:INFO` accept bare `LOGINPSW@:`. Roles since PROG M 43.7: None / Viewer (read-only) / Administrator — Viewer cannot issue action commands.
- **Permissions:** `%S`, `/103`, `PING`, `APPINFO`, `GETLPVER`, `DISCOVER` require Viewer; all action/control verbs require Admin.
- **NewGen vs Legacy:** all newly released modules use NewGen input LightProtocol (slash frames, decimal numbers, `0x` for hex). Legacy modules use the text `%`-verb frames. Both are emitted by the same server. Full module-type abbreviation table and per-module I/O mapping are in source sections 4.3 and 4.5.
- **Case/encoding:** strings are case-insensitive (auto-uppercased); use ASCII only where possible. `<CR>`, `<LF>`, `<TAB>` map to 0x0D/0x0A/0x09. Leading/trailing spaces are trimmed.
- **`PING` caveat:** on NewGen masters returns cached RAM statuses only — does not poll modules. Use only on reconnect.

<!-- UNRESOLVED: firmware/protocol version compatibility is per-installation (PROG M / DAP version in APPINFO header); no fixed range stated. -->
<!-- UNRESOLVED: several verbs are version-gated (e.g. %I%D/%O%D, %A, %F broken for DAP 31..41.4; /104,/105,/82 require PROG M 43.7; /77 requires 39.1) — capability depends on the connected master's version. -->

## Provenance

```yaml
source_domains:
  - pro2.mydomintell.com
  - pro.mydomintell.com
source_urls:
  - https://pro2.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v16-20250319.pdf
  - https://pro.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v13-20230222.pdf
retrieved_at: 2026-07-01T15:13:38.500Z
last_checked_at: 2026-07-07T11:35:05.402Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:35:05.402Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "All 50 spec actions matched their wire-literal counterparts in the source; transport values (port 17481, wss base_url, password auth) are confirmed; source command catalogue is fully represented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "provided device name \"Dnipb02 B\" and known protocol \"RS-232C\" do not match the source. Source explicitly states it \"only covers Ethernet modules of new generation ... using Secured Websockets instead of RS232 or UDP socket.\" No RS-232/serial electrical parameters (baud, data bits, parity) are given."
- "no discrete variable table in source; values are IO-instance specific."
- "no named macros in source."
- "source contains no safety warnings, interlock procedures, or"
- "firmware/protocol version compatibility is per-installation (PROG M / DAP version in APPINFO header); no fixed range stated."
- "several verbs are version-gated (e.g. %I%D/%O%D, %A, %F broken for DAP 31..41.4; /104,/105,/82 require PROG M 43.7; /77 requires 39.1) — capability depends on the connected master's version."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
