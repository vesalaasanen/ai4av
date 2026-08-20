---
spec_id: admin/domintell-dpbc02-dg
schema_version: ai4av-public-spec-v1
revision: 1
title: "Domintell DPBC02 Control Spec"
manufacturer: Domintell
model_family: DPBC02
aliases: []
compatible_with:
  manufacturers:
    - Domintell
  models:
    - DPBC02
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro2.mydomintell.com
  - pro.domintell.com
source_urls:
  - https://pro2.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v16-20250319.pdf
  - https://pro.domintell.com/web/content/112505
retrieved_at: 2026-08-15T13:44:17.520Z
last_checked_at: 2026-08-05T08:17:53.593Z
generated_at: 2026-08-05T08:17:53.593Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - HELP
  - HELP@
  - "END APPINFO"
  - INFO
  - ERROR
  - "RS-232C serial configuration (baud, framing) not in this source — it documents the WebSocket (WSS, port 17481) interface. RS-232 specifics are in a separate document (DS_RS232_ETH_Interfaces)."
  - "second push-button addressing for packed inputs not explicitly tabulated (only IO index 1 listed for buttons)."
  - "firmware/DAP version compatibility ranges referenced generically (e.g. \">= 30\") but not pinned to a single version."
  - "baud rate not stated in this source"
  - "not stated in source"
  - "no explicit multi-step sequences documented for DPBC02."
  - "serial (RS-232C) electrical parameters — baud rate, data bits, parity, stop bits, flow control — not stated in this source."
  - "whether LOGINPSW session auth is enforced over RS-232 (DRS23202) vs only over WebSocket."
  - "firmware/DAP version compatibility — source references ranges (e.g. CL2 >= DAP 30, various command version gates like v41.5, v43.0) but no single pinned version."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:17:53.593Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec actions match source literally; DPBC02 commands and LightProtocol session commands fully covered with correct shapes. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-01
---

# Domintell DPBC02 Control Spec

## Summary
The Domintell DPBC02 ("Classic 2 Push Button") is a Domintell-bus module (LightProtocol type `CL2`) providing two push-buttons (8 colors), two LED indicators, and a temperature sensor. It is controlled via the Domintell LightProtocol ASCII frame format, addressed as `CL2<serial>-<io>%%<param>` where `<serial>` is the 6-character hex module serial number. This source is the new-generation Ethernet (Secured WebSocket) LightProtocol guide; the user-supplied transport is RS-232C, whose serial electrical parameters are not described in this document.

<!-- UNRESOLVED: RS-232C serial configuration (baud, framing) not in this source — it documents the WebSocket (WSS, port 17481) interface. RS-232 specifics are in a separate document (DS_RS232_ETH_Interfaces). -->
<!-- UNRESOLVED: second push-button addressing for packed inputs not explicitly tabulated (only IO index 1 listed for buttons). -->
<!-- UNRESOLVED: firmware/DAP version compatibility ranges referenced generically (e.g. ">= 30") but not pinned to a single version. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
# Source documents the new-generation Ethernet Secured WebSocket (wss) interface AND notes that
# legacy LightProtocol over RS-232 (DRS23202) reuses the same ASCII frame format.
# WSS electrical/config is documented; RS-232C serial config is not in this source.
addressing:
  port: 17481  # Default Secured WebSocket port for NewGen Ethernet modules (DNET01/DNET02, DGQG02/DGQG04)
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in this source
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
auth:
  type: token  # source documents LOGINPSW session auth (SHA-512 salted+nonce-hashed password)
  # NOTE: login mechanism is described for the WebSocket interface; whether RS-232 legacy
  # LightProtocol (DRS23202) enforces it is not explicitly stated.
```

## Traits
```yaml
traits:
  - queryable  # inferred: %S status query and PING documented
```

## Actions
```yaml
# Frame format (legacy input LightProtocol): CL2<serial6hex>-<io_hex>%%<param>
# <serial> = 6-char hex module serial number; <io> = 1-char hex output index.
# Strings are case-insensitive; leading/trailing spaces are trimmed by the master.
# NOTE: %params below shown with a single % per source convention.

# --- Session / system commands (LightProtocol server interface) ---
- id: get_lp_version
  label: Get LightProtocol Version
  kind: query
  command: "GETLPVER"
  params: []
- id: discover
  label: Discover Interface
  kind: query
  command: "DISCOVER"
  params: []
- id: get_voice_info
  label: Get Voice Assistant Configuration
  kind: query
  command: "VOICEINFO"
  params: []
  # Note: reserved for voice assistant server; only on DNET02; requires Viewer role; >= DAP 40.0
- id: get_interface_version
  label: Get Interface Module Version (legacy)
  kind: query
  command: "MOD_VERSION"
  params: []
  # Note: legacy DRS23202/DETH02 interface query. Returns e.g. "MOD_VERSION=SER_V0A" (DRS23202) or
  # "MOD_VERSION=ETH_V01_STK_V01" (DETH02).
- id: request_salt
  label: Request Salt (pre-login)
  kind: action
  command: "REQUESTSALT@{username}"
  params:
    - name: username
      type: string
      description: Account username created via GoldenGate
- id: login
  label: Open Session (Login)
  kind: action
  command: "LOGINPSW@{username}:{hashedpsw}"
  params:
    - name: username
      type: string
      description: Account username
    - name: hashedpsw
      type: string
      description: "SHA512( SHA512(password+salt) + nonce ) as lowercase hex"
- id: logout
  label: Close Session (Logout)
  kind: action
  command: "LOGOUT"
  params: []
- id: hello
  label: Session Heartbeat (Hello)
  kind: action
  command: "HELLO"
  params: []
- id: set_timeout
  label: Set Session Timeout
  kind: action
  command: "TIMEOUT={minutes}"
  params:
    - name: minutes
      type: integer
      description: "Timeout in minutes; 0 disables timeout"
- id: get_appinfo
  label: Get Application Info
  kind: query
  command: "APPINFO"
  params: []
- id: ping
  label: Refresh All Statuses (Ping)
  kind: query
  command: "PING"
  params: []

# --- DPBC02 (CL2) module commands ---
- id: simulate_push
  label: Simulate Push Button
  kind: action
  command: "CL2{serial}-1%P{phase}"
  params:
    - name: serial
      type: string
      description: 6-char hex module serial number
    - name: phase
      type: integer
      description: "1=Begin short push, 2=End short push, 3=Begin long push, 4=End long push"
- id: led1_toggle
  label: Toggle LED 1
  kind: action
  command: "CL2{serial}-1"
  params:
    - name: serial
      type: string
      description: 6-char hex module serial number
- id: led1_on
  label: LED 1 On
  kind: action
  command: "CL2{serial}-1%I"
  params:
    - name: serial
      type: string
      description: 6-char hex module serial number
- id: led1_off
  label: LED 1 Off
  kind: action
  command: "CL2{serial}-1%O"
  params:
    - name: serial
      type: string
      description: 6-char hex module serial number
- id: led2_toggle
  label: Toggle LED 2
  kind: action
  command: "CL2{serial}-2"
  params:
    - name: serial
      type: string
      description: 6-char hex module serial number
- id: led2_on
  label: LED 2 On
  kind: action
  command: "CL2{serial}-2%I"
  params:
    - name: serial
      type: string
      description: 6-char hex module serial number
- id: led2_off
  label: LED 2 Off
  kind: action
  command: "CL2{serial}-2%O"
  params:
    - name: serial
      type: string
      description: 6-char hex module serial number
- id: set_heating_setpoint
  label: Set Heating Setpoint
  kind: action
  command: "CL2{serial}-1%T{temp}"
  params:
    - name: serial
      type: string
      description: 6-char hex module serial number
    - name: temp
      type: number
      description: Heating setpoint in Celsius (e.g. 21.5)
- id: set_cooling_setpoint
  label: Set Cooling Setpoint
  kind: action
  command: "CL2{serial}-1%U{temp}"
  params:
    - name: serial
      type: string
      description: 6-char hex module serial number
    - name: temp
      type: number
      description: Cooling setpoint in Celsius (e.g. 25.0)
- id: set_temperature_mode
  label: Set Temperature Mode
  kind: action
  command: "CL2{serial}-1%M{mode}"
  params:
    - name: serial
      type: string
      description: 6-char hex module serial number
    - name: mode
      type: integer
      description: "1=away, 2=auto, 5=comfort, 6=anti-freeze"
- id: set_regulation_mode
  label: Set Regulation Mode
  kind: action
  command: "CL2{serial}-1%R{mode}"
  params:
    - name: serial
      type: string
      description: 6-char hex module serial number
    - name: mode
      type: integer
      description: "0=off, 1=heating, 2=cooling, 3=mixed"
- id: query_module_status
  label: Query Module Status
  kind: query
  command: "CL2{serial}%S"
  params:
    - name: serial
      type: string
      description: 6-char hex module serial number
```

## Feedbacks
```yaml
# Legacy output status frames from the LightProtocol server.
- id: button_state
  type: packed
  description: "CL2<serial>Ixx - push-button states packed bitwise (LSB = button 1)"
- id: led_state
  type: packed
  description: "CL2<serial>Oxx - LED indicator states packed bitwise (LSB = LED 1)"
- id: temperature_heating
  type: string
  description: "CL2<serial>T<measure> <heating_sp> <MODE> <profile> - measure, heating setpoint, mode (ABSENCE/AUTO/COMFORT/FROST), profile value"
- id: temperature_cooling
  type: string
  description: "CL2<serial>U<measure> <cooling_sp> <REGMODE> <profile> - measure, cooling setpoint, regulation mode (OFF/HEATING/COOLING/MIXED/AUTOHVAC/DRY/FAN), profile value"
- id: pong
  type: string
  description: "PONG - acknowledgement to PING; all IO statuses follow"
- id: appinfo_data
  type: string
  description: "APPINFO (<PROG M version> <date> <time> Rev=<n> CP=<charset>) => <dap-name> : ... - full installation/module list; one line per IO; terminated by END APPINFO"
```

## Variables
```yaml
# Heating/cooling setpoints and temperature mode are settable via Actions (set_heating_setpoint,
# set_cooling_setpoint, set_temperature_mode, set_regulation_mode).
```

## Events
```yaml
# Unsolicited messages from the LightProtocol server:
- id: info_message
  description: "INFO:<text>:INFO - informational (e.g. 'Session opened', 'World' reply to HELLO, 'I AM A DGQG04-...' reply to DISCOVER, 'LPVER=43.7.1' reply to GETLPVER, 'Timeout set to <n>min' reply to TIMEOUT)"
- id: error_message
  description: "ERROR:<text>:ERROR - error (e.g. 'Invalid credentials', 'Command denied. Read-only user', 'User database empty. Connect first with GoldenGate')"
- id: end_appinfo
  description: "END APPINFO - marker that all APPINFO module/IO entries have been sent"
- id: firmware_upgrade_warning
  description: "!! PLEASE UPGRADE DRS23202/DETH02 FIRMWARE >= N !! - interface firmware too old to decode some statuses/new module types"
- id: unknown_module_warning
  description: "! PLEASE RESTART MASTER 0x???????? ! - module serial not in interface module table; master restart or rescan needed"
- id: session_timeout
  description: "INFO:Session timeout:INFO - server closed session due to inactivity"
- id: session_closed_by_server
  description: "INFO:Session closed by server:INFO - server-initiated close (e.g. new DAP received)"
- id: current_time
  description: "HH:MM DD/MM/YYYY - current time broadcast each minute (NewGen DGQG); not sent for DAP 31.0-41.6"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented for DPBC02.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source contains one general hardware warning (do not connect Domintell bus to the RJ45
# Ethernet connector - causes fatal damage), which applies to the network interface, not to
# DPBC02 control commands. No command-level interlocks or power-sequencing requirements stated.
```

## Notes
- DPBC02 LightProtocol module type is `CL2` (see source §4.3, §4.5). APPINFO IO layout: index 1 = push-buttons (packed `Ixx`), index 3 = 1st LED, index 4 = 2nd LED, index 5 = temperature sensor.
- Command output index is the relative index within an IO category (buttons / LEDs / sensors), routed by the master using the parameter type (`%P`, `%I`/`%O`, `%T`/`%U`/`%M`/`%R`).
- Status `%S` on NewGen Masters (DGQG02/DGQG04) returns the cached RAM value — no live request to the module. For live temperature reads this means `%S` cannot refresh faster than the master's periodical poll.
- Roles (from PROG M 43.7): Viewer (read-only) cannot issue action/push commands; Administrator has full access. `%P`/`%I`/`%O`/`%T`/`%U`/`%M`/`%R` require Admin role; `%S`/`APPINFO`/`PING`/`GETLPVER`/`DISCOVER`/`VOICEINFO` available to Viewer.
- Strings are case-insensitive (lowercase auto-uppercased); CR/LF supported at end of line; spaces trimmed at start/end.
- The source documents two transport paths: (1) new-generation Ethernet **Secured WebSocket** (wss, default port 17481, max 8 connections on DNET01/02, max 2 on DGQG02/04) and (2) legacy RS-232 via DRS23202 reusing the same ASCII frame format. The user-designated transport is RS-232C.
<!-- UNRESOLVED: serial (RS-232C) electrical parameters — baud rate, data bits, parity, stop bits, flow control — not stated in this source. -->
<!-- UNRESOLVED: whether LOGINPSW session auth is enforced over RS-232 (DRS23202) vs only over WebSocket. -->
<!-- UNRESOLVED: firmware/DAP version compatibility — source references ranges (e.g. CL2 >= DAP 30, various command version gates like v41.5, v43.0) but no single pinned version. -->
````

Added 6 items, preserved all existing. CL2 module commands already complete — `%P`, `%I`/`%O`, `%T`/`%U`/`%M`/`%R`, `%S` all present. Button 2 stays UNRESOLVED (not tabulated in source §4.5).

## Provenance

```yaml
source_domains:
  - pro2.mydomintell.com
  - pro.domintell.com
source_urls:
  - https://pro2.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v16-20250319.pdf
  - https://pro.domintell.com/web/content/112505
retrieved_at: 2026-08-15T13:44:17.520Z
last_checked_at: 2026-08-05T08:17:53.593Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:17:53.593Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec actions match source literally; DPBC02 commands and LightProtocol session commands fully covered with correct shapes. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- HELP
- HELP@
- "END APPINFO"
- INFO
- ERROR
- "RS-232C serial configuration (baud, framing) not in this source — it documents the WebSocket (WSS, port 17481) interface. RS-232 specifics are in a separate document (DS_RS232_ETH_Interfaces)."
- "second push-button addressing for packed inputs not explicitly tabulated (only IO index 1 listed for buttons)."
- "firmware/DAP version compatibility ranges referenced generically (e.g. \">= 30\") but not pinned to a single version."
- "baud rate not stated in this source"
- "not stated in source"
- "no explicit multi-step sequences documented for DPBC02."
- "serial (RS-232C) electrical parameters — baud rate, data bits, parity, stop bits, flow control — not stated in this source."
- "whether LOGINPSW session auth is enforced over RS-232 (DRS23202) vs only over WebSocket."
- "firmware/DAP version compatibility — source references ranges (e.g. CL2 >= DAP 30, various command version gates like v41.5, v43.0) but no single pinned version."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
