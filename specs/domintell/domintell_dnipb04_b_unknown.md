---
spec_id: admin/domintell-dnipb04-b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Domintell Dnipb04 B Control Spec"
manufacturer: Domintell
model_family: "Domintell Dnipb04 B"
aliases: []
compatible_with:
  manufacturers:
    - Domintell
  models:
    - "Domintell Dnipb04 B"
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
retrieved_at: 2026-07-03T09:01:44.675Z
last_checked_at: 2026-07-07T11:35:06.175Z
generated_at: 2026-07-07T11:35:06.175Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact hardware model \"Dnipb04 B\" not named in source; source is a"
  - "user accounts must be pre-created in the configuration software"
  - "per-module NewGen (/type) status payloads (§4.8.k) not present in"
  - "no explicit multi-step sequences described in source."
  - "no other interlock / power-on sequencing procedures stated."
  - "model name mismatch (source covers family, not \"Dnipb04 B\" verbatim), NewGen `/type` IO payloads (§4.8.j-k) absent from excerpt, voltage/power specs not stated."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:35:06.175Z
  matched_actions: 37
  action_count: 37
  confidence: medium
  summary: "All 37 spec actions map one-to-one to wire-level tokens documented verbatim in source; transport wss/17481/LOGINPSW confirmed. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-03
---

# Domintell Dnipb04 B Control Spec

## Summary
The Domintell Dnipb04 B is a new-generation Domintell Ethernet communication interface module that exposes the Domintell LightProtocol over a Secured WebSocket (wss) on TCP port 17481. It acts as a LightProtocol server: third-party clients authenticate, download the installation configuration (APPINFO), then send ASCII command frames to control outputs (relays, dimmers, shutters, DMX, DALI, sound, temperature) across the Domintell bus and receive pushed status updates.

<!-- UNRESOLVED: exact hardware model "Dnipb04 B" not named in source; source is a
family protocol guide. Confirm model mapping against the device label or Convex entity. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  # Secured WebSocket (wss). Source: "now use Secured WebSocket (wss: data are
  # encrypted in encapsulated frame over HTTP protocol)".
  scheme: wss
  port: 17481  # "Default port 17481."
  base_url: "wss://{host}:17481"  # host = module IP (DHCP or static, static recommended)
auth:
  # Source documents a LOGINPSW challenge-response mechanism (first generation
  # accepts "LOGINPSW@:" with no password; newer generation uses REQUESTSALT +
  # salted+hashed password). Not "none".
  type: loginpsw
  mechanism: challenge_response
  hash_algorithm: SHA-512
  formula: "SHA512(SHA512(password + salt) + nonce)"
  # UNRESOLVED: user accounts must be pre-created in the configuration software
  # (GoldenGate); credential/token storage and rotation not detailed in source.
```

## Traits
```yaml
traits:
  - queryable  # inferred: APPINFO, PING, %S and GETLPVER query commands present
  - powerable  # inferred: relay toggle/set/reset (%I/%O/none) commands present
  - levelable  # inferred: dimmer/volume percentage (%Dnnn) commands present
  - routable   # inferred: sound source selection (%An) commands present
```

## Actions
```yaml
# ===========================================================================
# System / session commands (verbatim keywords from §4.1 Reserved keywords and §5)
# ===========================================================================
- id: get_lp_version
  label: Get LightProtocol Version
  kind: query
  command: "GETLPVER"
  params: []
  notes: "Available before and after session open; requires PROG M >= 43.7"

- id: discover
  label: Discover Device Information
  kind: query
  command: "DISCOVER"
  params: []
  notes: "Requests info of the device hosting the LightProtocol server; requires PROG M >= 43.7"

- id: request_salt
  label: Request Salt and Nonce
  kind: query
  command: "REQUESTSALT@{username}"
  params:
    - name: username
      type: string
      description: Registered username created in GoldenGate
  notes: "Returns INFO:REQUESTSALT:USERNAME=<username>:NONCE=<nonce>:SALT=<salt>:INFO"

- id: login
  label: Open Session (Login)
  kind: action
  command: "LOGINPSW@{username}:{hashedpsw}"
  params:
    - name: username
      type: string
      description: Registered username
    - name: hashedpsw
      type: string
      description: 'SHA512( SHA512(password+salt) + nonce ) as hex string; first-gen devices accept "LOGINPSW@:" with no password'
  notes: "On success replies INFO:Session opened:INFO"

- id: logout
  label: Close Session (Logout)
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
      description: "Timeout in minutes; 0 disables timeout (socket closed only on LOGOUT or connection loss)"
  notes: "Replies INFO:Timeout set to <n>min:INFO or INFO:Timeout disabled...:INFO"

- id: hello
  label: Session Heartbeat (Hello)
  kind: action
  command: "HELLO"
  params: []
  notes: "Send every ~50s to keep session open; replies INFO:World:INFO"

- id: appinfo
  label: Request Application Info
  kind: query
  command: "APPINFO"
  params: []
  notes: "Downloads full installation/module/IO list; terminated by 'END APPINFO'"

- id: ping
  label: Request All Statuses (Ping)
  kind: query
  command: "PING"
  params: []
  notes: "Replies PONG followed by all cached statuses. Use sparingly (only on reconnect)."

- id: voiceinfo
  label: Request Voice Assistant Configuration (VoiceInfo)
  kind: query
  command: "VOICEINFO"
  params: []
  notes: "DNET02 only; requires PROG M >= 40.0; Viewer role"

# ===========================================================================
# Legacy Input LightProtocol - module control action parameters (§4.6.c-4.6.e)
# Frame format: {ModType}{Serial}-{OutputNumber}{action_param}
#   ModType     = 3-char module type code (e.g. BU1, DIM, BIR, TRV, AMP, ...)
#   Serial      = 6-char hexadecimal serial number
#   OutputNumber = 1-2 hex digits (2 for DINTDALI01)
# The distinguishing, verbatim command payload is the action parameter suffix.
# ===========================================================================
- id: module_toggle_output
  label: Toggle Output
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}"
  params:
    - {name: ModType, type: string, description: "3-char module type (e.g. BU1, DIM, BIR)"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "1-2 hex digit output/IO index"}
  notes: "Toggles output state if supported (Admin role)"

- id: ask_status
  label: Ask Module/Group/Scene Status
  kind: query
  command: "{ModType}{Serial}-{OutputNumber}%S"
  params:
    - {name: ModType, type: string, description: "3-char module type"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index; omit for module/group/scene status"}
  notes: "Viewer role. On NewGen masters returns cached RAM value (PROG M >= 40.1 for legacy modules)"

- id: set_output
  label: Set Output / Increase Value / Shutter Up
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%I"
  params:
    - {name: ModType, type: string, description: "3-char module type"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
  notes: "Sets output ON / increases a value variable / drives shutter up (down-output drives down). Admin role"

- id: reset_output
  label: Reset Output / Decrease Value / Stop Shutter
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%O"
  params:
    - {name: ModType, type: string, description: "3-char module type"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
  notes: "Resets output OFF / decreases a value variable / stops shutter. Admin role"

- id: set_percent
  label: Set Dimmer/Value Percentage
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%D{percent}"
  params:
    - {name: ModType, type: string, description: "3-char module type"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
    - {name: percent, type: integer, description: "Decimal 0-100 (1-3 digits), e.g. 1, 23, 100"}
  notes: "Assigns a percentage to a dimmable output or sets a value variable. Admin role"

- id: increase_percent
  label: Increase Value/Dimmer/Volume
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%I%D{step}"
  params:
    - {name: ModType, type: string, description: "3-char module type"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
    - {name: step, type: integer, description: "Decimal 1-100 increase amount"}
  notes: "AMP module ignores step (always +1%). Broken for DAP 31-41.4 inclusive. Admin role"

- id: decrease_percent
  label: Decrease Value/Dimmer/Volume
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%O%D{step}"
  params:
    - {name: ModType, type: string, description: "3-char module type"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
    - {name: step, type: integer, description: "Decimal 1-100 decrease amount"}
  notes: "AMP module ignores step (always -1%). Broken for DAP 31-41.4 inclusive. Admin role"

- id: increase_percent_alt
  label: Increase Value/Dimmer/Volume (alt mnemonic)
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%DI{step}"
  params:
    - {name: ModType, type: string, description: "3-char module type"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
    - {name: step, type: integer, description: "Decimal 1-100 increase amount"}
  notes: "Same as %I%Dnnn; available from version 41.5. Admin role"

- id: decrease_percent_alt
  label: Decrease Value/Dimmer/Volume (alt mnemonic)
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%DO{step}"
  params:
    - {name: ModType, type: string, description: "3-char module type"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
    - {name: step, type: integer, description: "Decimal 1-100 decrease amount"}
  notes: "Same as %O%Dnnn; available from version 41.5. Admin role"

- id: start_dimming
  label: Start Dimming
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%DB"
  params:
    - {name: ModType, type: string, description: "3-char module type"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
  notes: "Starts dimming a dimmer/volume output. Admin role"

- id: stop_dimming
  label: Stop Dimming
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%DE"
  params:
    - {name: ModType, type: string, description: "3-char module type"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
  notes: "Stops dimming a dimmer/volume output. Admin role"

- id: set_dmx_value
  label: Set DMX Channel Value
  kind: action
  command: "{ModType}{Serial}-{Device}-{Channel}%X{value}"
  params:
    - {name: ModType, type: string, description: "3-char module type (DMX)"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: Device, type: string, description: "DMX slave/canal number"}
    - {name: Channel, type: string, description: "Channel index"}
    - {name: value, type: integer, description: "Decimal 0-255 (1-3 digits)"}
  notes: "Assigns a 0-255 value to a DMX output. Admin role"

- id: set_heating_setpoint
  label: Set Heating Temperature Setpoint
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%T{temp}"
  params:
    - {name: ModType, type: string, description: "3-char module type"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
    - {name: temp, type: number, description: "Floating point Celsius, e.g. 21.5"}
  notes: "Sets new heating setpoint. Admin role"

- id: set_cooling_setpoint
  label: Set Cooling Temperature Setpoint
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%U{temp}"
  params:
    - {name: ModType, type: string, description: "3-char module type"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
    - {name: temp, type: number, description: "Floating point Celsius, e.g. 25.0"}
  notes: "Sets new cooling setpoint. Admin role"

- id: set_temperature_mode
  label: Set Temperature Mode
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%M{mode}"
  params:
    - {name: ModType, type: string, description: "3-char module type"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
    - {name: mode, type: integer, description: "1=away, 2=auto, 5=comfort, 6=anti-freeze"}
  notes: "Admin role"

- id: set_regulation_mode
  label: Set Regulation Mode
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%R{mode}"
  params:
    - {name: ModType, type: string, description: "3-char module type"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
    - {name: mode, type: integer, description: "0=off, 1=heating, 2=cooling, 3=mixed"}
  notes: "Admin role"

- id: set_color_cycle
  label: Set DMX Color Cycle
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%C{state}"
  params:
    - {name: ModType, type: string, description: "3-char module type (DMX)"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
    - {name: state, type: integer, description: "(none)=toggle, 1=start, 0=stop"}
  notes: "Source: 'not yet available'. Admin role"

- id: select_sound_source
  label: Select Sound Module Source
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%A{source}"
  params:
    - {name: ModType, type: string, description: "3-char module type (AMP)"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
    - {name: source, type: integer, description: "1-4 auxiliary source, 5 FM tuner"}
  notes: "Broken for DAP 31-41.4 inclusive. Admin role"

- id: next_sound_source
  label: Jump to Next Sound Source
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%I%A%AN"
  params:
    - {name: ModType, type: string, description: "3-char module type (AMP)"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
  notes: "From v41.7. Admin role"

- id: previous_sound_source
  label: Jump to Previous Sound Source
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%O%A%AP"
  params:
    - {name: ModType, type: string, description: "3-char module type (AMP)"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
  notes: "From v41.7. Admin role"

- id: set_tuner_frequency
  label: Set Tuner Frequency
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%F{freq}"
  params:
    - {name: ModType, type: string, description: "3-char module type (AMP)"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
    - {name: freq, type: number, description: "Floating point MHz, e.g. 99.1"}
  notes: "Broken for DAP 31-41.4 inclusive. Admin role"

- id: seek_next_frequency
  label: Seek Next Tuner Frequency
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%I%F%FN"
  params:
    - {name: ModType, type: string, description: "3-char module type (AMP)"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
  notes: "From v41.7. Admin role"

- id: seek_previous_frequency
  label: Seek Previous Tuner Frequency
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%O%F%FP"
  params:
    - {name: ModType, type: string, description: "3-char module type (AMP)"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
  notes: "From v41.7. Admin role"

- id: shutter_move_up
  label: Move Shutter Up
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%H"
  params:
    - {name: ModType, type: string, description: "3-char module type (TRV/TRP/V24/TPV)"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
  notes: "Moves shutter High. Admin role"

- id: shutter_move_down
  label: Move Shutter Down
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%L"
  params:
    - {name: ModType, type: string, description: "3-char module type (TRV/TRP/V24/TPV)"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
  notes: "Moves shutter Low. Admin role"

- id: set_clock_data
  label: Change Clock Data
  kind: action
  command: "{ModType}{Serial}%K{hh:mm:ss} {WD} {DD}/{MM}/{YY} {offset}"
  params:
    - {name: ModType, type: string, description: "3-char module type (CLK)"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: "hh:mm:ss", type: string, description: "24h execution time"}
    - {name: WD, type: string, description: "Hex day mask OR-ed: 01=Sun,02=Mon,04=Tue,08=Wed,10=Thu,20=Fri,40=Sat,80=disabled"}
    - {name: "DD/MM/YY", type: string, description: "Date restriction, 00 = no restriction"}
    - {name: offset, type: string, description: "Optional astronomical-clock offset oh:om:os; '-' anticipates, else postpones (from v43)"}
  notes: "Broken for DAP 31-42.x inclusive. Admin role"

- id: simulate_push
  label: Simulate Button Push
  kind: action
  command: "{ModType}{Serial}-{OutputNumber}%P{action}"
  params:
    - {name: ModType, type: string, description: "3-char module type"}
    - {name: Serial, type: string, description: "6-char hex serial number"}
    - {name: OutputNumber, type: string, description: "IO index"}
    - {name: action, type: integer, description: "1=begin short push, 2=end short push, 3=begin long push, 4=end long push"}
  notes: "Admin role"
```

## Feedbacks
```yaml
- id: pong
  type: ack
  description: 'Acknowledgement to PING; statuses of all IO follow (no end-of-list marker)'

- id: info_message
  type: text
  description: 'System info wrapped in INFO:...:INFO tags (e.g. INFO:Session opened:INFO, INFO:World:INFO, INFO:Timeout set to <n>min:INFO, INFO:Session closed by server:INFO, INFO:Session timeout:INFO)'

- id: error_message
  type: text
  description: 'Error wrapped in ERROR:...:ERROR tags (e.g. ERROR:Invalid LOGINPSW..., ERROR:Invalid credentials:ERROR, ERROR:Invalid command. Use REQUESTSALT...:ERROR, ERROR:Command denied. Read-only user:ERROR)'

- id: salt_nonce_reply
  type: text
  description: 'INFO:REQUESTSALT:USERNAME=<user>:NONCE=<nonce>:SALT=<salt>:INFO'

- id: discover_reply
  type: text
  description: 'INFO:I AM A DGQG04-192.168.1.250-169.254.162.138-17481-54000001WSS:INFO'

- id: lp_version_reply
  type: text
  description: 'INFO:LPVER=<x.y.z>:INFO'

- id: output_status
  type: bitmask
  description: 'Oxx (outputs) - LSB=output 1, concatenated bytes for >8 outputs'

- id: input_status
  type: bitmask
  description: 'Ixx (inputs) - LSB=input 1, concatenated bytes for >8 inputs'

- id: dimmer_status
  type: percent
  description: 'Dxx - 2 hex bytes per output (%) e.g. 6432 = out1 100%, out2 50%'

- id: dmx_status
  type: raw
  description: 'Xxx - 2 hex bytes per channel; trailing CC byte = color cycle running (v39.1+, RGBx)'

- id: temperature_status
  type: text
  description: 'T/U - measure, setpoint, mode (ABSENCE/AUTO/COMFORT/FROST / HEATING/COOLING/MIXED/AUTOHVAC/DRY/FAN), profile value'

- id: ir_remote_key
  type: raw
  description: 'Cxx - two hex bytes; 00 = key released'

- id: sound_status
  type: text
  description: 'S - e.g. 1-32-TUNE-63-03E8 = output 1, 50%, tuner, 99.1MHz (module v5+)'

- id: time_broadcast
  type: text
  description: 'HH:MM DD/MM/YYYY sent each minute (YYYY 4-digit on NewGen; suppressed for DAP 31-41.6 inclusive)'

- id: firmware_warning
  type: text
  description: '"!! PLEASE UPGRADE DETH02/DRS23202 FIRMWARE ..." / "! PLEASE RESTART MASTER 0x???????? !"'

# UNRESOLVED: per-module NewGen (/type) status payloads (§4.8.k) not present in
# the supplied refined source excerpt - referenced but not included verbatim.
```

## Variables
```yaml
- id: dimmer_level
  type: percent
  range: "0-100"
  description: 'Dimmer / 0-10V / analog output level (command %Dnnn, status Dxx)'

- id: volume_level
  type: percent
  range: "0-100"
  description: 'DAMPLI01 output volume (command %Dnnn; step ignored on AMP)'

- id: dmx_value
  type: integer
  range: "0-255"
  description: 'DMX channel value (command %Xnnn, status Xxx)'

- id: heating_setpoint
  type: number
  unit: Celsius
  description: 'Heating setpoint (command %Tnn.n)'

- id: cooling_setpoint
  type: number
  unit: Celsius
  description: 'Cooling setpoint (command %Unn.n)'

- id: temperature_mode
  type: enum
  values: [1_away, 2_auto, 5_comfort, 6_antifreeze]
  description: 'Temperature mode (command %Mn)'

- id: regulation_mode
  type: enum
  values: [0_off, 1_heating, 2_cooling, 3_mixed]
  description: 'Regulation mode (command %Rn)'

- id: sound_source
  type: enum
  values: [1_aux, 2_aux, 3_aux, 4_aux, 5_fm_tuner]
  description: 'Sound module source (command %An)'

- id: value_variable
  type: percent
  range: "0-100"
  description: 'Virtual value variable (VAR module, command %Dnnn)'
```

## Events
```yaml
- id: status_push
  description: 'Unsolicited status frame pushed by server on any IO state change: {ModType}{Serial}{-IO}{DataType}{Data}'

- id: session_closed_by_server
  description: 'INFO:Session closed by server:INFO - server closes connection itself (e.g. new DAP file received); no LOGOUT from client'

- id: session_timeout
  description: 'INFO:Session timeout:INFO - no action/HELLO received before timeout'

- id: time_tick
  description: 'Current time broadcast each minute (HH:MM DD/MM/YYYY)'

- id: upgrade_notice
  description: 'Unsolicited "!! PLEASE UPGRADE ... FIRMWARE" warning when an incompatible firmware/new module type is detected'
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: rj45_bus_separation
    severity: critical
    description: >
      WARNING (verbatim): "Do NOT connect Domintell bus on the RJ45 connector,
      this can cause fatal damages to the module." The RJ45 connects only to the
      LAN (UTP Cat5+) via a switch/router.
  - id: fan_valve_interlock
    severity: warning
    description: >
      DFAN01 valves always follow the setpoint regulation; toggling valves
      requires first changing the setpoint on the associated sensor. If valves
      are OFF the fan will not start.
# UNRESOLVED: no other interlock / power-on sequencing procedures stated.
```

## Notes
- Transport is **Secured WebSocket (wss)** over TCP, default port **17481**. Connect with `wscat -n -c wss://<ip>:17481`.
- Connection limits: DNET01/DNET02 up to 8 simultaneous wss connections; DGQG02/DGQG04 up to 2.
- Roles (PROG M >= 43.7): `None` (disabled), `Viewer` (read-only — cannot trigger outputs or simulate pushes), `Administrator` (full access). Query/status commands require Viewer minimum; control commands require Administrator.
- Strings are NOT case sensitive (lowercase auto-uppercased). ASCII recommended; `<CR>`/`<LF>`/`<TAB>` map to 0x0D/0x0A/0x09. Frames can no longer be concatenated with `&`.
- APPINFO line 1 carries DAP version: `APPINFO (PROG M 33.0 ...) => <name>.dap :`. Module-type availability and several commands are gated on this `PROG M` version.
- `PING` returns cached RAM statuses on NewGen masters — it does NOT poll modules live. Do not call PING periodically; only on reconnect. Prefer `HELLO` (~every 50s) to keep a session open.
- Several commands are explicitly broken for DAP versions **31–41.4/41.6/42.x** (noted per-action); verify `PROG M` from APPINFO before using them.

<!-- UNRESOLVED: -->
<!-- - Exact model "Dnipb04 B" not named in source; source is the family LightProtocol guide. -->
<!-- - Voltage / current / power / hardware specs not stated in source. -->
<!-- - Firmware version compatibility ranges referenced indirectly via PROG M; not a single device firmware range. -->
<!-- - NewGen (/type) IO status & command payloads (§4.8.j–4.8.k) referenced but not present in supplied refined excerpt. -->
<!-- - UDP legacy fallback parameters and DRS23201/DETH02 legacy specifics out of scope for this new-gen wss guide. -->
```

Spec output above. Key gaps flagged UNRESOLVED: model name mismatch (source covers family, not "Dnipb04 B" verbatim), NewGen `/type` IO payloads (§4.8.j-k) absent from excerpt, voltage/power specs not stated.

## Provenance

```yaml
source_domains:
  - pro2.mydomintell.com
  - pro.mydomintell.com
source_urls:
  - https://pro2.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v16-20250319.pdf
  - https://pro.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v13-20230222.pdf
retrieved_at: 2026-07-03T09:01:44.675Z
last_checked_at: 2026-07-07T11:35:06.175Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:35:06.175Z
matched_actions: 37
action_count: 37
confidence: medium
summary: "All 37 spec actions map one-to-one to wire-level tokens documented verbatim in source; transport wss/17481/LOGINPSW confirmed. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact hardware model \"Dnipb04 B\" not named in source; source is a"
- "user accounts must be pre-created in the configuration software"
- "per-module NewGen (/type) status payloads (§4.8.k) not present in"
- "no explicit multi-step sequences described in source."
- "no other interlock / power-on sequencing procedures stated."
- "model name mismatch (source covers family, not \"Dnipb04 B\" verbatim), NewGen `/type` IO payloads (§4.8.j-k) absent from excerpt, voltage/power specs not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
