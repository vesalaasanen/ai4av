---
spec_id: admin/domintell-dpbc02-b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Domintell DPBC02 B Control Spec"
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
  - pro.mydomintell.com
source_urls:
  - https://pro.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v16-20250319.pdf
  - https://pro.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v15-20231130.pdf
  - https://pro.mydomintell.com/share/manual/lightprotocol/DS_RS232_ETH_Interfaces-1.27.08-rev2.pdf
  - "https://pro.mydomintell.com/share/manual/DPBC0x/Product%20Datasheet%20-%20DPBC0x%20-%20EN-NL-FR%20-%20V1.pdf"
retrieved_at: 2026-07-01T15:04:27.587Z
last_checked_at: 2026-07-21T21:56:51.597Z
generated_at: 2026-07-21T21:56:51.597Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "This source is the shared LightProtocol guide; it confirms the RS-232 path via DRS23202 works with the identical ASCII command set but does not state the RS-232 electrical parameters (baud/data/parity/stop) for that path."
  - "baud rate not stated in source"
  - "not stated in source"
  - "no settable variables identified in source for this module."
  - "no DPBC02-specific safety warnings, interlocks, or power-on"
  - "RS-232 serial parameters (baud/data bits/parity/stop/flow) not stated in source."
  - "firmware/hardware version compatibility range not stated (only min DAP 30 for CL2)."
verification:
  verdict: verified
  checked_at: 2026-07-21T21:56:51.597Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 CL2 actions map 1:1 to the DPBC02 I/O-mapping row plus the generic %S query, and WSS/auth transport values match verbatim. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Domintell DPBC02 B Control Spec

## Summary
The Domintell DPBC02 (module type code `CL2`) is a 2-button "Classic" push-button module with two LED indicators and an integrated temperature sensor, operating on the Domintell bus. It is controlled through a Domintell LightProtocol server (master module such as DGQG02/DGQG04, or a DNET01/DNET02 Ethernet interface) using the legacy ASCII LightProtocol command set. The same command set is reachable either via a DRS23202 RS-232 interface (legacy serial path) or via a Secured WebSocket (WSS) connection to a NewGen Ethernet module (default port 17481). This spec covers the device-level commands and status frames for the `CL2` module.

<!-- UNRESOLVED: This source is the shared LightProtocol guide; it confirms the RS-232 path via DRS23202 works with the identical ASCII command set but does not state the RS-232 electrical parameters (baud/data/parity/stop) for that path. -->

## Transport
```yaml
# Two transports reach the same LightProtocol command set:
#   1. serial  - legacy RS-232 via DRS23202 (electrical params NOT in source)
#   2. http    - Secured WebSocket (wss://) via DNET01/DNET02/DGQG02/DGQG04
#      (source 2.2: "Secured WebSocket ... data are encrypted in encapsulated
#       frame over HTTP protocol"; default port 17481)
protocols:
  - serial
  - http
serial:
  baud_rate: null     # UNRESOLVED: baud rate not stated in source
  data_bits: null     # UNRESOLVED: not stated in source
  parity: null        # UNRESOLVED: not stated in source
  stop_bits: null     # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
addressing:
  port: 17481
  base_url: "wss://{host}:17481"  # source 5.2.a: wscat -n -c wss://<ip>:17481
  # Connection limits (source 2.2): max 8 simultaneous WSS on DNET01/DNET02;
  # max 2 simultaneous WSS on DGQG02/DGQG04.
auth:
  type: password  # LightProtocol session uses REQUESTSALT + LOGINPSW@<user>:<hash>
  # Hash algorithm (source 5.3.a): sha512(sha512(password + salt) + nonce)
  #   - salt + nonce are obtained via REQUESTSALT@<username>
  #   - "Possibility to set a password" (source 2.2, DNET01/DNET02)
  # First-gen modules accept bare LOGINPSW@: (no user/pass) per source 5.5.
```

## Traits
```yaml
- queryable  # inferred: %S status query and packed status frames documented
- levelable  # inferred: %Tnn.n / %Unn.n continuous temperature setpoints documented
```

## Actions
```yaml
# Legacy input LightProtocol frame format (source 4.6.c):
#   {ModType 3 char}{SerialNumber 6 char hex}-{OutputNumber 1 hex}{%params}
# For CL2 the command output numbers (per source 4.5 I/O mapping) are:
#   -1  push-button 1  AND  temperature-sensor addressing (shared)
#   -1  LED 1 indicator
#   -2  LED 2 indicator
# {serial} = 6-char hexadecimal module serial number, e.g. 000043.
# Source notes: strings are NOT case sensitive (auto-uppercased); leading/trailing
# spaces are trimmed; CR/LF supported at line end; frames can NOT be joined with '&'.

- id: push_button_simulate
  label: Simulate Push-Button Press
  kind: action
  command: "CL2{serial}-1%P{n}"
  params:
    - name: serial
      type: string
      description: 6-char hexadecimal module serial number (e.g. "000043")
    - name: n
      type: integer
      description: "1=begin short push, 2=end short push, 3=begin long push, 4=end long push"

- id: led1_toggle
  label: LED 1 Toggle
  kind: action
  command: "CL2{serial}-1"
  params:
    - name: serial
      type: string
      description: 6-char hexadecimal module serial number

- id: led1_set_on
  label: LED 1 Set On
  kind: action
  command: "CL2{serial}-1%I"
  params:
    - name: serial
      type: string
      description: 6-char hexadecimal module serial number

- id: led1_reset_off
  label: LED 1 Reset Off
  kind: action
  command: "CL2{serial}-1%O"
  params:
    - name: serial
      type: string
      description: 6-char hexadecimal module serial number

- id: led2_toggle
  label: LED 2 Toggle
  kind: action
  command: "CL2{serial}-2"
  params:
    - name: serial
      type: string
      description: 6-char hexadecimal module serial number

- id: led2_set_on
  label: LED 2 Set On
  kind: action
  command: "CL2{serial}-2%I"
  params:
    - name: serial
      type: string
      description: 6-char hexadecimal module serial number

- id: led2_reset_off
  label: LED 2 Reset Off
  kind: action
  command: "CL2{serial}-2%O"
  params:
    - name: serial
      type: string
      description: 6-char hexadecimal module serial number

- id: temp_heating_setpoint
  label: Set Heating Temperature Setpoint
  kind: action
  command: "CL2{serial}-1%T{value}"
  params:
    - name: serial
      type: string
      description: 6-char hexadecimal module serial number
    - name: value
      type: number
      description: Floating-point heating setpoint in Celsius (e.g. 21.5). Valid range is bounded per-install by APPINFO LHH/LHL flags.

- id: temp_cooling_setpoint
  label: Set Cooling Temperature Setpoint
  kind: action
  command: "CL2{serial}-1%U{value}"
  params:
    - name: serial
      type: string
      description: 6-char hexadecimal module serial number
    - name: value
      type: number
      description: Floating-point cooling setpoint in Celsius (e.g. 25.0). Valid range is bounded per-install by APPINFO LCH/LCL flags.

- id: temp_mode
  label: Set Temperature Mode
  kind: action
  command: "CL2{serial}-1%M{mode}"
  params:
    - name: serial
      type: string
      description: 6-char hexadecimal module serial number
    - name: mode
      type: integer
      description: "1=away, 2=auto, 5=comfort, 6=anti-freeze. Per-install availability is gated by APPINFO HMT flags."

- id: temp_regulation_mode
  label: Set Regulation Mode
  kind: action
  command: "CL2{serial}-1%R{mode}"
  params:
    - name: serial
      type: string
      description: 6-char hexadecimal module serial number
    - name: mode
      type: integer
      description: "0=off, 1=heating, 2=cooling, 3=mixed. Per-install availability is gated by APPINFO HMR flags."

- id: module_status_query
  label: Module Status Query
  kind: query
  command: "CL2{serial}%S"
  params:
    - name: serial
      type: string
      description: >
        6-char hexadecimal module serial number. Output index is OMITTED for %S
        (module-wide query). On NewGen masters (DGQG02/DGQG04/...) this command
        requires DAP version 40.1 (OS 25.3.0) or higher for legacy modules
        (source 4.6.d) and returns the cached RAM value - no fresh bus read is
        performed, so it cannot accelerate sensor refresh beyond the master's
        periodic polling.
```

## Feedbacks
```yaml
# Status frame format (source 4.7.a):
#   {ModType 3}{Serial 6 hex}{-IO?}{DataType 1 char}{Data n*2 hex}
# CL2 uses packed/global status for inputs and outputs.

- id: push_button_state
  type: bitmask
  format: "CL2{serial}I{xx}"
  description: >
    Packed input bitmask, LSB = push-button 1.
    Example "CL2000043I01" = button 1 pressed; "CL2000043I00" = released.

- id: led_output_state
  type: bitmask
  format: "CL2{serial}O{xx}"
  description: >
    Packed output bitmask, LSB = LED 1.
    Example "CL2000043O02" = LED 2 on; "CL2000043O00" = all LEDs off.

- id: temperature_heating
  type: string
  format: "CL2{serial}T{measured} {heating_setpoint} {MODE} {profile_value}"
  description: >
    Heating temperature info (source 4.7.b type T). MODE is one of
    ABSENCE/AUTO/COMFORT/FROST. Measured value includes software offset.
    Example "CL2000043T25.2 21.0 AUTO 18.0".

- id: temperature_cooling
  type: string
  format: "CL2{serial}U{measured} {cooling_setpoint} {REG_MODE} {profile_value}"
  description: >
    Cooling temperature info (source 4.7.b type U). REG_MODE is one of
    OFF/HEATING/COOLING/MIXED (HVAC-only: AUTOHVAC/DRY/FAN).
    Example "CL2000043U25.2 21.0 HEATING 19.5".
```

## Variables
```yaml
# No separate settable parameters beyond the actions above.
# Temperature-sensor capability bounds are read from APPINFO (not settable via
# LightProtocol): [HMR=0x00-HMT=0x00][LHH=30.0-LHL=10.0-LCH=40.0-LCL=20.0-ISP=0.5]
# UNRESOLVED: no settable variables identified in source for this module.
```

## Events
```yaml
# The LightProtocol server pushes the Feedback status frames above unsolicited
# whenever a CL2 input/output/temperature state changes, and on demand after a
# PING -> PONG refresh cycle (source 4.1, 5.9).
# System INFO/ERROR messages are also sent by the server, e.g.:
#   INFO:Waiting for LOGINPSW:NONCE=123456789:INFO
#   INFO:REQUESTSALT:USERNAME=<user>:NONCE=<n>:SALT=<salt>:INFO
#   INFO:Session opened:INFO
#   INFO:Session timeout:INFO
#   INFO:World:INFO                                  (reply to HELLO)
#   INFO:Timeout disabled. Socket will never be closed...:INFO  (reply to TIMEOUT=0)
#   ERROR:Invalid LOGINPSW. Use REQUESTSALT@<user> and LOGINPSW@<user>:<hashedpsw>:ERROR
#   ERROR:Invalid credentials:ERROR
#   ERROR:Command denied. Read-only user:ERROR        (from PROG M 43.7)
```

## Macros
```yaml
# Session login flow required before any device command is accepted (source 4.1, 5.5).
# Hash algorithm (source 5.3.a): sha512(sha512(password + salt) + nonce)
- id: session_login
  name: LightProtocol Session Login
  steps:
    - "REQUESTSALT@{username}"
    - "# expect INFO:REQUESTSALT:USERNAME={username}:NONCE={nonce}:SALT={salt}:INFO"
    - "# compute hashedpsw = sha512( sha512(password + salt) + nonce )  [hex strings]"
    - "LOGINPSW@{username}:{hashedpsw}"
    - "# expect INFO:Session opened:INFO"
  notes: >
    First-gen modules with no user database accept a bare LOGINPSW@: to open a
    session without credentials (source 5.5).

- id: session_keepalive
  name: Session Keep-Alive (HELLO)
  steps:
    - "HELLO"
    - "# expect INFO:World:INFO (send every ~50s before session timeout)"
  notes: >
    Alternative: TIMEOUT=0 disables the session timeout entirely (reply:
    INFO:Timeout disabled...). Preferred over PING for keepalive to avoid
    bus traffic (source 5.8).

- id: session_logout
  name: Close Session
  steps:
    - "LOGOUT"
    - "# expect INFO:Closing session:INFO"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no DPBC02-specific safety warnings, interlocks, or power-on
# sequencing found in source. (The source's RJ45/bus warning applies to the
# communication-interface modules, not to this bus push-button module.)
```

## Notes
- **Module identity:** `CL2` = DPBC02 "Classic 2 Push Button (8 colors and temperature sensor)"; minimum DAP (`PROG M`) version 30 (source 4.3).
- **Command addressing quirk:** temperature-sensor commands use output index `-1` (shared with the push-button), even though the temperature sensor is APPINFO IO index 5 and LED 1 is IO index 3 — see source 4.5 DPBC02 row. LED 1 = command output 1, LED 2 = command output 2.
- **String handling:** not case sensitive (lowercase auto-replaced with uppercase); leading/trailing spaces trimmed; `<CR>`/`<LF>`/`<TAB>` literals replaced by 0x0D/0x0A/0x09; CR/LF supported at line end; frames cannot be concatenated with `&` (source 4.6.b).
- **Status query caveat:** on NewGen masters (DGQG02/DGQG04) `%S` returns the cached RAM value — it does not force a fresh read from the module, so it cannot accelerate sensor refresh beyond the master's periodic polling. For legacy modules on NewGen masters, `%S` requires DAP version 40.1 / OS 25.3.0 or higher (source 4.6.d).
- **Temperature-sensor capability metadata (APPINFO, source 4.7.d):** each CL2 temperature IO carries `[LOCAL][HMR=0x00-HMT=0x00][LHH=30.0-LHL=10.0-LCH=40.0-LCL=20.0-ISP=0.5]` describing per-install limits:
  - `HMR` (Hide Mode Regulation bitmask): 0x01=off disabled, 0x02=heating disabled, 0x04=cooling disabled, 0x08=mixed disabled, 0x10=auto-HVAC disabled (v42+), 0x20=dry disabled (v42+), 0x40=fan disabled (v42+).
  - `HMT` (Hide Mode Temperature bitmask): 0x01=auto disabled, 0x02=comfort disabled, 0x04=away disabled, 0x08=frost disabled.
  - `LHH`/`LHL` = high/low heating setpoint limits; `LCH`/`LCL` = high/low cooling setpoint limits (from `PROG M 37.0`).
  - `ISP` = setpoint increment step (from `PROG M 37.0`).
  These are read-only descriptors; a client should gate `%M`/`%R`/`%T`/`%U` requests against them.
- **Transport scope:** the source states it "only covers Ethernet modules of new generation … using Secured Websockets instead of RS232 or UDP socket" (default port 17481, max 8 WSS connections on DNET01/DNET02, max 2 on DGQG02/DGQG04). It nonetheless confirms legacy input/output LightProtocol works over the DRS23202 RS-232 interface using the identical ASCII command set documented here; the RS-232 electrical parameters for that path are not given.
- **Roles (from `PROG M 43.7`):** Viewer (read-only) can issue `%S`/APPINFO/PING/GETLPVER but not actions; Administrator has full access. Push-button simulation and LED/toggle/set/reset and setpoint commands require Administrator role (source 4.6.d, 5.4).

<!-- UNRESOLVED: RS-232 serial parameters (baud/data bits/parity/stop/flow) not stated in source. -->
<!-- UNRESOLVED: firmware/hardware version compatibility range not stated (only min DAP 30 for CL2). -->

---

Upgrade summary: device action list unchanged (all 12 CL2 commands already covered). Added WSS transport (port 17481), resolved hash algo `sha512(sha512(pw+salt)+nonce)`, enriched temp-setpoint actions with APPINFO LHH/LHL/LCH/LCL bound refs, enriched `%M`/`%R` with HMR/HMT gate refs, added `%S` DAP-40.1 requirement, added roles note. Serial electricals still UNRESOLVED (source silent).

## Provenance

```yaml
source_domains:
  - pro.mydomintell.com
source_urls:
  - https://pro.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v16-20250319.pdf
  - https://pro.mydomintell.com/share/manual/lightprotocol/domintell_ligthprotocol-v15-20231130.pdf
  - https://pro.mydomintell.com/share/manual/lightprotocol/DS_RS232_ETH_Interfaces-1.27.08-rev2.pdf
  - "https://pro.mydomintell.com/share/manual/DPBC0x/Product%20Datasheet%20-%20DPBC0x%20-%20EN-NL-FR%20-%20V1.pdf"
retrieved_at: 2026-07-01T15:04:27.587Z
last_checked_at: 2026-07-21T21:56:51.597Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:56:51.597Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 CL2 actions map 1:1 to the DPBC02 I/O-mapping row plus the generic %S query, and WSS/auth transport values match verbatim. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "This source is the shared LightProtocol guide; it confirms the RS-232 path via DRS23202 works with the identical ASCII command set but does not state the RS-232 electrical parameters (baud/data/parity/stop) for that path."
- "baud rate not stated in source"
- "not stated in source"
- "no settable variables identified in source for this module."
- "no DPBC02-specific safety warnings, interlocks, or power-on"
- "RS-232 serial parameters (baud/data bits/parity/stop/flow) not stated in source."
- "firmware/hardware version compatibility range not stated (only min DAP 30 for CL2)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
