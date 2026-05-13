---
spec_id: admin/yamaha-bd-s-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha BD-S Series Control Spec"
manufacturer: Yamaha
model_family: BD-S2900
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - BD-S2900
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - avsforum.com
  - applicationmarket.crestron.com
retrieved_at: 2026-05-12T09:53:19.993Z
last_checked_at: 2026-05-12T14:58:23.763Z
generated_at: 2026-05-12T14:58:23.763Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-12T14:58:23.763Z
  matched_actions: 42
  action_count: 42
  confidence: high
  summary: "All 42 spec actions match literal wire tokens in source. All transport parameters verified in sections 1.2-1.3. Complete bidirectional coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-09
---

# Yamaha BD-S Series Control Spec

## Summary
Yamaha BD-S2900 Blu-ray/DVD/CD player with RS-232C serial control. Supports transport operations (play, pause, stop, search, skip), tray control, menu navigation, and status queries via a binary packet protocol with ASCII-encoded command parameters. Full duplex, start-stop synchronization.

<!-- UNRESOLVED: source covers BD-S2900 only; applicability to other BD-S models not confirmed -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable     # POWER ON / POWER OFF / STANDBY/ON commands present
- queryable     # Report Player Status, Report Media Status, Report Track Status, Report Time Code commands present
```

## Actions
```yaml
- id: standby_on
  label: Standby/On Toggle
  kind: action
  params: []
  command: STX 30 37 43 38 30 ETX

- id: power_on
  label: Power On
  kind: action
  params: []
  command: STX 30 37 43 46 36 ETX

- id: power_off
  label: Power Off
  kind: action
  params: []
  command: STX 30 37 43 46 37 ETX

- id: open_close
  label: Open/Close Tray
  kind: action
  params: []
  command: STX 30 37 43 38 31 ETX

- id: play
  label: Play
  kind: action
  params: []
  command: STX 30 37 43 38 32 ETX

- id: pause
  label: Pause
  kind: action
  params: []
  command: STX 30 37 43 38 33 ETX

- id: stop
  label: Stop
  kind: action
  params: []
  command: STX 30 37 43 38 35 ETX

- id: search_backward
  label: Search Backward
  kind: action
  params: []
  command: STX 30 37 43 38 36 ETX

- id: search_forward
  label: Search Forward
  kind: action
  params: []
  command: STX 30 37 43 38 37 ETX

- id: skip_backward
  label: Skip Backward
  kind: action
  params: []
  command: STX 30 37 43 42 39 ETX

- id: skip_forward
  label: Skip Forward
  kind: action
  params: []
  command: STX 30 37 43 42 41 ETX

- id: clear
  label: Clear
  kind: action
  params: []
  command: STX 30 37 43 39 46 ETX

- id: on_screen
  label: On Screen Display
  kind: action
  params: []
  command: STX 30 37 43 41 36 ETX

- id: status
  label: Status Display
  kind: action
  params: []
  command: STX 30 37 43 41 38 ETX

- id: setup
  label: Setup Menu
  kind: action
  params: []
  command: STX 30 37 43 41 43 ETX

- id: audio
  label: Audio Toggle
  kind: action
  params: []
  command: STX 30 37 43 41 44 ETX

- id: secondary_audio
  label: Secondary Audio Toggle
  kind: action
  params: []
  command: STX 30 37 43 45 45 ETX

- id: top_menu
  label: Top Menu / Direct Navigator
  kind: action
  params: []
  command: STX 30 37 43 42 31 ETX

- id: popup_menu
  label: Pop-up Menu
  kind: action
  params: []
  command: STX 30 37 43 43 46 ETX

- id: sub_menu
  label: Sub Menu / Option
  kind: action
  params: []
  command: STX 30 37 43 44 30 ETX

- id: functions
  label: Functions
  kind: action
  params: []
  command: STX 30 37 43 45 38 ETX

- id: pip
  label: Picture-in-Picture Toggle
  kind: action
  params: []
  command: STX 30 37 43 45 44 ETX

- id: cursor_down
  label: Cursor Down
  kind: action
  params: []
  command: STX 30 37 43 42 33 ETX

- id: cursor_up
  label: Cursor Up
  kind: action
  params: []
  command: STX 30 37 43 42 34 ETX

- id: cursor_left
  label: Cursor Left
  kind: action
  params: []
  command: STX 30 37 43 42 35 ETX

- id: cursor_right
  label: Cursor Right
  kind: action
  params: []
  command: STX 30 37 43 42 36 ETX

- id: return
  label: Return
  kind: action
  params: []
  command: STX 30 37 43 42 37 ETX

- id: enter
  label: OK / Enter
  kind: action
  params: []
  command: STX 30 37 43 42 38 ETX

- id: red
  label: Red Button
  kind: action
  params: []
  command: STX 30 37 43 45 39 ETX

- id: green
  label: Green Button
  kind: action
  params: []
  command: STX 30 37 43 45 41 ETX

- id: blue
  label: Blue Button
  kind: action
  params: []
  command: STX 30 37 43 45 42 ETX

- id: yellow
  label: Yellow Button
  kind: action
  params: []
  command: STX 30 37 43 45 43 ETX

- id: bd_sd
  label: BD/SD Toggle
  kind: action
  params: []
  command: STX 30 37 43 45 46 ETX

- id: numeric
  label: Numeric Key
  kind: action
  params:
    - name: digit
      type: integer
      description: "Digit 0-9"
  note: "CMDT2/CMDT3 encode digit (0=93,1=94,2=95,3=96,4=97,5=98,6=99,7=9A,8=9B,9=9C)"

- id: report_command_enable
  label: Set Report Command Enable/Disable
  kind: action
  params:
    - name: enable
      type: enum
      values: ["enable", "disable"]
      description: "Enable or disable command reports. Enable is power-on default."
  command: "STX 31 30 30 30 {CMDT3} ETX where CMDT3=30(enable)/31(disable)"

- id: set_report_interval
  label: Set Report Command Interval
  kind: action
  params:
    - name: interval
      type: enum
      values: [realtime, 50ms, 100ms, 150ms, 200ms, 250ms, 300ms, 350ms, 400ms]
      description: "BD-S2900 only supports 200ms; other values may be denied."
  command: "STX 31 31 30 30 {CMDT3} ETX where CMDT3=30..38"

- id: set_baud_rate
  label: Set Baud Rate
  kind: action
  params:
    - name: rate
      type: enum
      values: ["9600_8N", "19200_8N", "38400_8N", "9600_8E", "19200_8E", "38400_8E"]
      description: "BD-S2900 only supports 9600bps/No parity; other values may be denied."
  command: "STX 31 32 30 30 {CMDT3} ETX where CMDT3=30..37"

- id: report_player_status
  label: Report Player Status
  kind: action
  params: []
  command: STX 34 31 30 30 30 ETX

- id: report_media_status
  label: Report Media Status
  kind: action
  params: []
  command: STX 34 32 30 30 30 ETX

- id: report_track_status
  label: Report Track Status
  kind: action
  params: []
  command: STX 34 33 30 30 30 ETX
  note: "Only applicable for audio CD. Query after confirming PLAY status."

- id: report_timecode
  label: Report Time Code
  kind: action
  params: []
  command: STX 34 34 30 30 30 ETX
  note: "Query after confirming PLAY status."

- id: ready
  label: Ready / Start Transaction
  kind: action
  params:
    - name: timeout
      type: integer
      description: "Communication timeout (0=no timeout, range 0-0xFFF). BD-S2900 ignores this."
  command: "DC1 {TOUT0} {TOUT1} {TOUT2} ETX"
  note: "Used to get Configuration reply. BD-S2900 ignores timeout setting. Retry 5x at 1s intervals if no reply."
```

## Feedbacks
```yaml
- id: player_status
  type: enum
  values:
    - power_on
    - standby
    - tray_open
    - tray_close
    - toc_read
    - no_disc
    - menu
    - pause
    - stop
    - play
    - search_forward
    - search_backward
    - setup
  description: "Reported via Report Player Status command and Player Status Report events. RCMD1+RCMD2 hex pair from Table 3-4."

- id: media_status
  type: enum
  values:
    - busy
    - no_disc
    - cd
    - dvd
    - bd
  description: "Disc type detected in tray."

- id: track_number
  type: integer
  description: "Current track number (audio CD only). Returned as hex in RCMD2."

- id: timecode
  type: string
  description: "Current position as HH:MM:SS (hex-encoded). RCMD0=hour, RCMD1=min, RCMD2=sec."

- id: command_report
  type: object
  description: "Reply packet for every command (when reports enabled). Contains TYP(control source), GRD(guard status), RCMD0-2(command echo or status)."
```

## Variables
```yaml
- id: report_enabled
  type: boolean
  description: "Whether command reports are enabled. Power-on default: true (enabled)."

- id: report_interval
  type: enum
  values: [realtime, 50ms, 100ms, 150ms, 200ms, 250ms, 300ms, 350ms, 400ms]
  description: "Interval between command receipt and reply. BD-S2900 fixed at 200ms."
```

## Events
```yaml
- id: player_status_report
  description: "Unsolicited Player Status Report sent when player state changes (e.g. disc load, playback start, power state change). Packet: STX TYP GRD SW RCMD0 RCMD1 RCMD2 ETX. TYP indicates control source (0=RS-232C, 1=IR, 2=keys, 3=system, 4=encoder)."

- id: system_status_report
  description: "NOT SUPPORTED on BD-S2900."

- id: operation_report
  description: "NOT SUPPORTED on BD-S2900."
```

## Macros
```yaml
- id: start_transaction
  description: "Send Ready command, receive Configuration reply. Confirms player presence and retrieves model ID, software version, and capabilities. Retry up to 5 times at 1s intervals."
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "BD-S2900 only accepts power commands and system commands while in standby. All other commands are rejected when power is off."
  - description: "PLAY command rejected when no disc is present (guard status='1')."
# UNRESOLVED: no explicit safety warnings or interlock procedures in source beyond command guard table
```

## Notes
- 3-wire RS-232C connection: TxD, RxD, GND only. RTS/CTS must be left open (not connected). Hardware handshaking disabled.
- Packet format: Header (DC1/DC2/STX) + ASCII-encoded data bytes + Footer (ETX). Checksum on Configuration reply is lower 1 byte of 2's complement of all data excluding Header/Footer.
- BD-S2900 ignores timeout setting in Ready command; only use Ready to obtain Configuration.
- BD-S2900 only supports 9600bps/no parity; set_baud_rate and set_report_interval commands will deny other values with guard status.
- No cancel command — once sent, a command cannot be revoked. Last command has highest priority.
- If no reply within 1 second, retry up to 5 times; after 5 failures, restart communication from start transaction.
- Remote control codes use YAMAHA customer code '7C' (CMDT0=7, CMDT1=C).
- Report Track Status only works for audio CD. Query after confirming PLAY state.
<!-- UNRESOLVED: exact cable pinout (DB-9 vs DB-25) not specified -->
<!-- UNRESOLVED: maximum cable length not specified -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - avsforum.com
  - applicationmarket.crestron.com
retrieved_at: 2026-05-12T09:53:19.993Z
last_checked_at: 2026-05-12T14:58:23.763Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-12T14:58:23.763Z
matched_actions: 42
action_count: 42
confidence: high
summary: "All 42 spec actions match literal wire tokens in source. All transport parameters verified in sections 1.2-1.3. Complete bidirectional coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
