---
spec_id: admin/jvc-kenwood-dla-v70r
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC KENWOOD DLA-V70R Control Spec"
manufacturer: "JVC KENWOOD"
model_family: DLA-V70R
aliases: []
compatible_with:
  manufacturers:
    - "JVC KENWOOD"
  models:
    - DLA-V70R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - manuals.jvckenwood.com
source_urls:
  - https://manuals.jvckenwood.com/download/files/B5A-3961-30.pdf
retrieved_at: 2026-06-23T10:15:30.082Z
last_checked_at: 2026-06-24T12:07:06.349Z
generated_at: 2026-06-24T12:07:06.349Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Full command catalogue beyond power/input/remote/connection not enumerated (source only documents these categories)."
  - "flow control not explicitly stated; connector pins 1,4,6-9 are N/C"
  - "source documents no settable scalar parameters (volume/gain/delay/etc.)."
  - "source documents no other unsolicited runtime events (e.g. lamp/fault push notifications)."
  - "source contains a TRIGGER terminal hardware warning (\"接続を誤ると、機器破損の原因\" /"
  - "firmware version compatibility not stated in source."
  - "full command catalogue beyond power/input/remote/connection not provided — source only documents these categories for the V70R. Lamp, picture-mode, lens, anamorphic, installation-memory, and trigger-setting direct commands are referenced only as remote-button emulations, not as native opcodes."
  - "RS-232C flow control not explicitly stated (only baud/data/parity/stop bits given)."
  - "command timing / inter-command spacing not stated (only the 5-second PJREQ window for TCP auth is given)."
  - "TRIGGER terminal voltage (12 V) and current (100 mA) are source-stated but not placed in structured fields per Tier-3 population policy."
verification:
  verdict: verified
  checked_at: 2026-06-24T12:07:06.349Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec actions matched literally to source commands; transport parameters (port 20554, 19200 bps, 8N1, TCP/serial auth) confirmed verbatim in Japanese source document. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# JVC KENWOOD DLA-V70R Control Spec

## Summary
JVC KENWOOD DLA-V70R home theater projector (D-ILA) with external control over RS-232C (D-Sub 9, 19200 8N1 binary) and TCP/IP LAN (port 20554). This spec covers the binary command framing (header + unit ID `8901` + command + data + end `0A`) for power, input selection, remote-button emulation, connection check, and reference (query) commands.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Full command catalogue beyond power/input/remote/connection not enumerated (source only documents these categories). -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 20554  # TCP/IP control port (source: "TCPポート番号 20554")
serial:
  baud_rate: 19200      # source: "データ速度 19200 bps"
  data_bits: 8          # source: "キャラクター長 8ビット"
  parity: none          # source: "パリティ なし"
  stop_bits: 1          # source: "ストップビット 1"
  flow_control: none    # UNRESOLVED: flow control not explicitly stated; connector pins 1,4,6-9 are N/C
auth:
  # Two different auth situations exist (one per protocol):
  # - TCP: explicit connection-authentication handshake (PJ_OK → PJREQ → PJACK), documented in source.
  # - RS-232C: no login procedure in source → none (inferred).
  type: handshake  # source documents PJ_OK→PJREQ→PJACK connection authentication for TCP
  notes: |
    TCP flow: after TCP 3-way handshake the projector sends "PJ_OK"; the controller
    must reply "PJREQ" within 5 seconds; the projector replies "PJACK" (accepted),
    or "PJ_NG" / "PJNAK" (rejected, retry from TCP connect). RS-232C has no such
    handshake (auth.type: none inferred for serial).
```

## Traits
```yaml
# - powerable   (power on/off commands present: op 5057 31/30)  # inferred from power command examples
# - queryable   (reference commands 3F returning state present: power, input)  # inferred from query command examples
# - routable    (input source selection present: 4950 36/37)  # inferred from input select command
traits:
  - powerable
  - queryable
  - routable
```

## Actions
```yaml
# Command framing: Header(1) + UnitID(2)=8901 + Command(2) + Data(n) + End(1)=0A
# Headers: 21=operation, 3F=reference(query), 40=response, 06=ACK
# All command: fields are VERBATIM hex bytes from the source.

# --- Operation commands (header 21) ---

- id: connection_check
  label: Connection Check (Operation)
  kind: action
  command: "21 89 01 00 00 0A"
  params: []
  notes: "PC→projector: 21 89 01 00 00 0A. Projector→PC ACK: 06 89 01 00 00 0A."

- id: power_set
  label: Set Power
  kind: action
  command: "21 89 01 50 57 {state} 0A"
  params:
    - name: state
      type: enum
      description: "Power state byte. 31 = power on (from standby); 30 = power off / standby (from on)."
      values:
        "31": Power ON
        "30": Power OFF (standby)
  notes: |
    Power ON full frame: 21 89 01 50 57 31 0A → ACK 06 89 01 50 57 0A.
    Power OFF full frame: 21 89 01 50 57 30 0A → ACK 06 89 01 50 57 0A.

- id: select_input
  label: Select Input
  kind: action
  command: "21 89 01 49 50 {input} 0A"
  params:
    - name: input
      type: enum
      description: "Input source byte (power-on state only)."
      values:
        "36": HDMI 1
        "37": HDMI 2
  notes: "Command valid only in power-on state. ACK: 06 89 01 49 50 0A."

# --- Remote-button emulation (operation command 5243, header 21) ---
# Source lists each remote button as a distinct row with a distinct 4-byte hex code;
# each is a separate action per the granularity rule. Full frame: 21 89 01 52 43 {code} 0A.
# All remote buttons return ACK: 06 89 01 52 43 0A.

- id: remote_standby
  label: Remote STANDBY
  kind: action
  command: "21 89 01 52 43 37 33 30 36 0A"
  params: []

- id: remote_on
  label: Remote ON
  kind: action
  command: "21 89 01 52 43 37 33 30 35 0A"
  params: []

- id: remote_input
  label: Remote INPUT
  kind: action
  command: "21 89 01 52 43 37 33 30 38 0A"
  params: []

- id: remote_setting_memory
  label: Remote SETTING MEMORY
  kind: action
  command: "21 89 01 52 43 37 33 44 34 0A"
  params: []

- id: remote_lens_control
  label: Remote LENS CONTROL
  kind: action
  command: "21 89 01 52 43 37 33 33 30 0A"
  params: []

- id: remote_hide
  label: Remote HIDE
  kind: action
  command: "21 89 01 52 43 37 33 31 44 0A"
  params: []

- id: remote_info
  label: Remote INFO.
  kind: action
  command: "21 89 01 52 43 37 33 37 34 0A"
  params: []

- id: remote_j
  label: Remote J
  kind: action
  command: "21 89 01 52 43 37 33 30 31 0A"
  params: []

- id: remote_k
  label: Remote K
  kind: action
  command: "21 89 01 52 43 37 33 30 32 0A"
  params: []

- id: remote_i
  label: Remote I
  kind: action
  command: "21 89 01 52 43 37 33 33 34 0A"
  params: []

- id: remote_h
  label: Remote H
  kind: action
  command: "21 89 01 52 43 37 33 33 36 0A"
  params: []

- id: remote_ok
  label: Remote OK
  kind: action
  command: "21 89 01 52 43 37 33 32 46 0A"
  params: []

- id: remote_menu
  label: Remote MENU
  kind: action
  command: "21 89 01 52 43 37 33 32 45 0A"
  params: []

- id: remote_back
  label: Remote BACK
  kind: action
  command: "21 89 01 52 43 37 33 30 33 0A"
  params: []

- id: remote_picture_mode
  label: Remote PICTURE MODE
  kind: action
  command: "21 89 01 52 43 37 33 46 34 0A"
  params: []

- id: remote_color_profile
  label: Remote COLOR PROFILE
  kind: action
  command: "21 89 01 52 43 37 33 38 38 0A"
  params: []

- id: remote_gamma_settings
  label: Remote GAMMA SETTINGS
  kind: action
  command: "21 89 01 52 43 37 33 46 35 0A"
  params: []

- id: remote_cmd
  label: Remote C.M.D.
  kind: action
  command: "21 89 01 52 43 37 33 38 41 0A"
  params: []

- id: remote_mpc
  label: Remote MPC
  kind: action
  command: "21 89 01 52 43 37 33 46 30 0A"
  params: []

- id: remote_advanced_menu
  label: Remote ADVANCED MENU
  kind: action
  command: "21 89 01 52 43 37 33 37 33 0A"
  params: []

# --- Reference (query) commands (header 3F) ---

- id: query_connection
  label: Connection Check (Reference)
  kind: query
  command: "3F 89 01 00 00 0A"
  params: []

- id: query_power
  label: Power State Query
  kind: query
  command: "3F 89 01 50 57 0A"
  params: []
  notes: |
    PC→projector: 3F 89 01 50 57 0A.
    ACK: 06 89 01 50 57 0A.
    Response (header 40): 40 89 01 50 57 {state} 0A where state:
      30 = standby, 31 = power on, 32 = cooldown mode, 34 = abnormal/error state.

- id: query_input
  label: Input State Query
  kind: query
  command: "3F 89 01 49 50 0A"
  params: []
  notes: |
    PC→projector: 3F 89 01 49 50 0A.
    ACK: 06 89 01 49 50 0A.
    Response (header 40): 40 89 01 49 50 {input} 0A where input:
      36 = HDMI 1, 37 = HDMI 2.
```

## Feedbacks
```yaml
# Observable states returned by reference-command responses (header 40) and operation ACKs (header 06).

- id: power_state
  type: enum
  values:
    "30": standby
    "31": power_on
    "32": cooldown
    "34": abnormal
  notes: "Returned in query_power response data byte (40 89 01 50 57 {state} 0A)."

- id: input_state
  type: enum
  values:
    "36": hdmi_1
    "37": hdmi_2
  notes: "Returned in query_input response data byte (40 89 01 49 50 {input} 0A)."

- id: command_ack
  type: raw
  values:
    - "06 89 01 {cmd} 0A"
  notes: "ACK frame sent by projector for every accepted command (header 06 + unit ID + echoed command bytes + 0A)."
```

## Variables
```yaml
# UNRESOLVED: source documents no settable scalar parameters (volume/gain/delay/etc.).
# Power and input are discrete actions; no continuous variables enumerated.
```

## Events
```yaml
# Unsolicited / connection-phase messages from the projector:
- id: pj_ok
  type: raw
  value: "PJ_OK"
  notes: "Sent by projector unsolicited immediately after TCP 3-way handshake (initiates auth)."

- id: pjack
  type: raw
  value: "PJACK"
  notes: "Auth-accepted reply to PJREQ."

- id: pj_ng
  type: raw
  value: "PJ_NG"
  notes: "Auth-rejected (not accepted). Retry from TCP connect."

- id: pjnak
  type: raw
  value: "PJNAK"
  notes: "Auth-rejected (negative ack). Retry from TCP connect."

# UNRESOLVED: source documents no other unsolicited runtime events (e.g. lamp/fault push notifications).
```

## Macros
```yaml
# Source describes the TCP connection-establishment sequence as a required procedure (not a user macro).
- id: tcp_connect_handshake
  steps:
    - "Establish TCP connection (3-way handshake) to port 20554."
    - "Wait for projector to send PJ_OK."
    - "Within 5 seconds, send PJREQ."
    - "Expect PJACK (proceed to control). If PJ_NG or PJNAK, or 5s timeout, restart from TCP connect."
  notes: "Required before any binary control command over TCP. RS-232C does not use this handshake."
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: eco_mode_blocks_standby_control
    description: |
      When "ECO Mode" is ON, RS-232C and LAN (TCP) communication are UNAVAILABLE in
      standby. ECO Mode must be set to OFF to allow external control during standby
      (or when using Control4). Source also notes: in ECO Mode ON, auto power-off
      occurs after 15 min of no signal and no operation while projecting.
    source: "RS-232C/LAN仕様 + ECO Mode section (P.76/P.94)"
  - id: input_command_power_gate
    description: "Input selection command (4950) is valid only in power-on state."
    source: "operation command table: 電源オン時 (during power-on)"
# UNRESOLVED: source contains a TRIGGER terminal hardware warning ("接続を誤ると、機器破損の原因" /
# wrong connection causes equipment damage) for the DC 12 V 100 mA trigger output - this is a
# hardware-wiring interlock, not a control-command safety rule, and voltage/current specs are
# not populated into structured fields per population policy (Tier 3). See Notes.
```

## Notes
- Control interface: RS-232C (D-Sub 9-pin male, cross cable) AND TCP/IP LAN (RJ-45). Network port is control-only, not for video signal transport.
- Binary framing is fixed: `Header + 8901 + Command(2) + Data(n) + 0A`. Unit ID `8901` and End `0A` are fixed for this device.
- Header semantics: `21`=operation (PC→projector), `3F`=reference/query (PC→projector), `40`=response (projector→PC), `06`=ACK (projector→PC on accepted command).
- RS-232C pinout (source): pin 2=RxD (PC←projector), pin 3=TxD (projector→PC), pin 5=GND, pins 1/4/6-9=N/C.
- All operation and reference commands return an ACK frame `06 89 01 {command} 0A`; reference commands additionally return a `40 ...` response frame carrying the queried value.
- TRIGGER terminal (source-stated hardware spec, kept here, not in structured fields per policy): DC 12 V, 100 mA output; Tip = +12 V, Sleeve = GND; used to drive a motorized screen with trigger input. Wrong wiring causes equipment damage. Trigger output behavior is configurable (off / power-on / anamorphic / installation memory modes 1–10).
- Network settings exposed in source: DHCP client (on/off), manual IP/subnet/gateway, MAC address display, Control4 SDDP discovery (on/off).
- DLA-V70R shares the JVC D-ILA PJREQ/PJACK + 8901-framed protocol family with related models (V80R, V9R, NZ-series); command set here is limited to what the V70R source explicitly documents.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: full command catalogue beyond power/input/remote/connection not provided — source only documents these categories for the V70R. Lamp, picture-mode, lens, anamorphic, installation-memory, and trigger-setting direct commands are referenced only as remote-button emulations, not as native opcodes. -->
<!-- UNRESOLVED: RS-232C flow control not explicitly stated (only baud/data/parity/stop bits given). -->
<!-- UNRESOLVED: command timing / inter-command spacing not stated (only the 5-second PJREQ window for TCP auth is given). -->
<!-- UNRESOLVED: TRIGGER terminal voltage (12 V) and current (100 mA) are source-stated but not placed in structured fields per Tier-3 population policy. -->

## Provenance

```yaml
source_domains:
  - manuals.jvckenwood.com
source_urls:
  - https://manuals.jvckenwood.com/download/files/B5A-3961-30.pdf
retrieved_at: 2026-06-23T10:15:30.082Z
last_checked_at: 2026-06-24T12:07:06.349Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-24T12:07:06.349Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec actions matched literally to source commands; transport parameters (port 20554, 19200 bps, 8N1, TCP/serial auth) confirmed verbatim in Japanese source document. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Full command catalogue beyond power/input/remote/connection not enumerated (source only documents these categories)."
- "flow control not explicitly stated; connector pins 1,4,6-9 are N/C"
- "source documents no settable scalar parameters (volume/gain/delay/etc.)."
- "source documents no other unsolicited runtime events (e.g. lamp/fault push notifications)."
- "source contains a TRIGGER terminal hardware warning (\"接続を誤ると、機器破損の原因\" /"
- "firmware version compatibility not stated in source."
- "full command catalogue beyond power/input/remote/connection not provided — source only documents these categories for the V70R. Lamp, picture-mode, lens, anamorphic, installation-memory, and trigger-setting direct commands are referenced only as remote-button emulations, not as native opcodes."
- "RS-232C flow control not explicitly stated (only baud/data/parity/stop bits given)."
- "command timing / inter-command spacing not stated (only the 5-second PJREQ window for TCP auth is given)."
- "TRIGGER terminal voltage (12 V) and current (100 mA) are source-stated but not placed in structured fields per Tier-3 population policy."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
