---
spec_id: admin/jvc-kenwood-dla-v50
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC KENWOOD DLA-V50 External Control Spec"
manufacturer: "JVC KENWOOD"
model_family: DLA-V50
aliases: []
compatible_with:
  manufacturers:
    - "JVC KENWOOD"
  models:
    - DLA-V50
    - DLA-V90RLTD
    - DLA-V90R
    - DLA-V80R
    - DLA-V70R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - manuals.jvckenwood.com
  - victor.jp
source_urls:
  - https://manuals.jvckenwood.com/download/files/B5A-3961-30.pdf
  - https://www.victor.jp/projector/lineup/dla-v50/
retrieved_at: 2026-06-23T10:14:10.242Z
last_checked_at: 2026-06-24T12:07:05.609Z
generated_at: 2026-06-24T12:07:05.609Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "only the external-control excerpt is available; picture-quality, installation, and full menu command sets are not in the source. Firmware version compatibility not stated."
  - "flow control not stated in source"
  - "no continuous settable parameters in this excerpt (picture-quality / install params dropped from source)."
  - "no multi-step sequences described in source."
  - "no fault-recovery / power-on sequencing procedures beyond ECO Mode and TCP handshake stated in source."
  - "source is an external-control excerpt only; full command catalogue (picture modes, lens, installation, calibration) not present. Firmware version compatibility, flow control, and any fault/error codes beyond power-state \"34 abnormal\" are not stated."
verification:
  verdict: verified
  checked_at: 2026-06-24T12:07:05.609Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions matched verbatim in source commands; bidirectional coverage confirmed; transport parameters verified against protocol specifications. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# JVC KENWOOD DLA-V50 External Control Spec

## Summary
JVC KENWOOD DLA-V50 (D-ILA projector) external control over LAN (TCP/IP) and RS-232C. Devices speak a shared binary frame protocol (header + unit ID + command + data + end). TCP sessions additionally require a `PJ_OK`/`PJREQ`/`PJACK` handshake before commands may be sent. Source covers DLA-V90RLTD / DLA-V90R / DLA-V80R / DLA-V70R / DLA-V50; marker `3` denotes DLA-V50-specific items.

<!-- UNRESOLVED: only the external-control excerpt is available; picture-quality, installation, and full menu command sets are not in the source. Firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 20554
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
  form: binary  # source: データ形式 バイナリ
auth:
  type: handshake  # TCP only: projector sends PJ_OK, controller must reply PJREQ within 5 s, projector returns PJACK (ok) or PJ_NG / PJNAK (fail). RS-232C has no handshake - direct binary frames.
```

## Traits
```yaml
traits:
  - powerable   # inferred from power on/off commands (5057 / 31, 30)
  - queryable   # inferred from reference commands (3F) returning power/input state
```

## Actions
```yaml
# Frame = header(1) unit_id(8901, 2) command(2) data(n) end(0A, 1). Hex bytes verbatim from source.
# Header 21 = operation command. Header 3F = reference (query). Projector replies 06 (ACK) and 40 (response).
actions:
  - id: connection_check
    label: Connection Check
    kind: action
    command: "21 89 01 00 00 0A"
    params: []
    notes: Confirms communication possible during standby. Projector ACKs with "06 89 01 00 00 0A".

  - id: power_on
    label: Power On
    kind: action
    command: "21 89 01 50 57 31 0A"
    params: []
    notes: From standby → power on. ACK "06 89 01 50 57 0A".

  - id: power_off
    label: Power Off (Standby)
    kind: action
    command: "21 89 01 50 57 30 0A"
    params: []
    notes: From power-on → standby. ACK "06 89 01 50 57 0A".

  - id: select_input_hdmi1
    label: Select Input HDMI 1
    kind: action
    command: "21 89 01 49 50 36 0A"
    params: []
    notes: Power-on state only. Data 36 = HDMI 1.

  - id: select_input_hdmi2
    label: Select Input HDMI 2
    kind: action
    command: "21 89 01 49 50 37 0A"
    params: []
    notes: Power-on state only. Data 37 = HDMI 2.

  # Remote-control command 5243: sends the same code as the supplied remote.
  # Each row below is a distinct remote button with its verbatim 4-byte code (data for command 5243).
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
    notes: Source comms example. ACK "06 89 01 52 43 0A".
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

  # Reference (query) commands - header 3F. Projector replies 06 (ACK) then 40 (response with data).
  - id: power_status_query
    label: Power Status Query
    kind: query
    command: "3F 89 01 50 57 0A"
    params: []
    notes: Response "40 89 01 50 57 <state> 0A"; state 30 standby / 31 on / 32 cooldown / 34 abnormal.
  - id: input_status_query
    label: Input Status Query
    kind: query
    command: "3F 89 01 49 50 0A"
    params: []
    notes: Response "40 89 01 49 50 <input> 0A"; input 36 HDMI 1 / 37 HDMI 2.
```

## Feedbacks
```yaml
feedbacks:
  - id: command_ack
    type: raw
    description: ACK frame returned when a command is accepted. "06 89 01 <command> 0A".
  - id: power_state
    type: enum
    description: Power state returned in the 40 response (data byte for command 5057).
    values:
      - { value: "30", label: standby }
      - { value: "31", label: power_on }
      - { value: "32", label: cooldown }
      - { value: "34", label: abnormal }
  - id: input_state
    type: enum
    description: Input source returned in the 40 response (data byte for command 4950).
    values:
      - { value: "36", label: hdmi_1 }
      - { value: "37", label: hdmi_2 }
```

## Variables
```yaml
# UNRESOLVED: no continuous settable parameters in this excerpt (picture-quality / install params dropped from source).
```

## Events
```yaml
events:
  - id: pj_ok
    description: On TCP connect, projector sends ASCII "PJ_OK" to begin the connection handshake.
  - id: pjack
    description: Projector replies "PJACK" after a valid "PJREQ" - handshake success.
  - id: pj_ng
    description: Projector replies "PJ_NG" - handshake failed; re-establish TCP connection.
  - id: pjnak
    description: Projector replies "PJNAK" - handshake failed; re-establish TCP connection.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "ECO Mode must be OFF to use RS-232C / LAN control during standby. With ECO Mode ON, standby serial/LAN communication is unavailable (all indicators including STANDBY/ON extinguish)."
  - "TCP command path requires PJ_OK → PJREQ (within 5 s) → PJACK before any binary command may be sent."
# UNRESOLVED: no fault-recovery / power-on sequencing procedures beyond ECO Mode and TCP handshake stated in source.
```

## Notes
- Command frame layout: header (1 byte) + unit ID (2 bytes, fixed `8901`) + command (2 bytes) + data (n bytes) + end (1 byte, fixed `0A`).
- Headers: `21` operation (PC→unit), `3F` reference/query (PC→unit), `40` response (unit→PC), `06` ACK (unit→PC).
- RS-232C connector: D-Sub 9-pin male. Pin 2 RxD (PC←unit), Pin 3 TxD (unit→PC), Pin 5 GND, Pins 1/4/6-9 N/C. Async, 8 bits, no parity, 1 start, 1 stop, 19200 bps, binary.
- LAN connector: RJ-45, 10BASE-T/100BASE-TX. TCP port 20554.
- Network settings (DHCP client, IP, subnet mask, gateway, MAC) and Control4 SDDP discovery toggle are user-configurable on-device.
- Remote control has two codes (A/B); if remote-code setting on body differs from remote, the STANDBY/ON indicator flashes green on receipt.
- Control4 SDDP discovery is supported (enable on-device when on a Control4 network).

<!-- UNRESOLVED: source is an external-control excerpt only; full command catalogue (picture modes, lens, installation, calibration) not present. Firmware version compatibility, flow control, and any fault/error codes beyond power-state "34 abnormal" are not stated. -->
````

Spec emitted. Covers TCP+serial, port 20554, 19200/8N1, full binary frame protocol, 27 actions (incl. all 20 remote buttons as distinct rows per coverage rule), 2 queries, handshake auth, ECO-Mode interlock. Gaps marked UNRESOLVED. Want me write to `drafts.jsonl` / ingest, or output as file?

## Provenance

```yaml
source_domains:
  - manuals.jvckenwood.com
  - victor.jp
source_urls:
  - https://manuals.jvckenwood.com/download/files/B5A-3961-30.pdf
  - https://www.victor.jp/projector/lineup/dla-v50/
retrieved_at: 2026-06-23T10:14:10.242Z
last_checked_at: 2026-06-24T12:07:05.609Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-24T12:07:05.609Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions matched verbatim in source commands; bidirectional coverage confirmed; transport parameters verified against protocol specifications. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "only the external-control excerpt is available; picture-quality, installation, and full menu command sets are not in the source. Firmware version compatibility not stated."
- "flow control not stated in source"
- "no continuous settable parameters in this excerpt (picture-quality / install params dropped from source)."
- "no multi-step sequences described in source."
- "no fault-recovery / power-on sequencing procedures beyond ECO Mode and TCP handshake stated in source."
- "source is an external-control excerpt only; full command catalogue (picture modes, lens, installation, calibration) not present. Firmware version compatibility, flow control, and any fault/error codes beyond power-state \"34 abnormal\" are not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
