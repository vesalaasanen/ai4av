---
spec_id: admin/primare-sc15-prisma-preamplifier-and-network-player
schema_version: ai4av-public-spec-v1
revision: 1
title: "Primare Sc15 Prisma Preamplifier And Network Player Control Spec"
manufacturer: Primare
model_family: "NP5 Prisma MK2"
aliases: []
compatible_with:
  manufacturers:
    - Primare
  models:
    - "NP5 Prisma MK2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - primare.net
source_urls:
  - https://primare.net/wp-content/uploads/2020/08/NP5-Prisma-MK2-RS232-Command-list-2021-10-04.pdf
retrieved_at: 2026-07-10T10:59:19.873Z
last_checked_at: 2026-07-13T06:40:26.497Z
generated_at: 2026-07-13T06:40:26.497Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input selection (source select) commands not present in the source table; only \"Read current input name\" query exists. Source device name in input prompt is \"Sc15 Prisma\" but source PDF references \"NP5 Prisma MK2\" — model compatibility may need operator confirmation."
  - "source does not document unsolicited event frames beyond verbose replies."
  - "source does not document multi-step macro sequences."
  - "source does not document interlock procedures or safety warnings."
  - "input select (source) commands not present in the source — only the read-alias query is documented. Voltage/current/power specs not stated. Physical connector pinout (DB-9 vs 3.5mm TRS, used by some Primare units) not stated. Whether verbose replies arrive unsolicited or only in response to commands is ambiguous — source shows them only as \"replies on the following format when a command is received\"."
verification:
  verdict: verified
  checked_at: 2026-07-13T06:40:26.497Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched verbatim in source table after removal of the 3 fabricated opcode-swap query commands; perfect one-to-one command coverage; transport params confirmed (115200/8/N/1). (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-10
---

# Primare Sc15 Prisma Preamplifier And Network Player Control Spec

## Summary
RS-232 control protocol for the Primare NP5 Prisma MK2 network player. The spec covers a binary framed command protocol using STX/DLE/ETX with write/read command verbs, supporting power, volume, balance, mute, input queries, Bluetooth settings, factory reset, and device identification reads.

<!-- UNRESOLVED: input selection (source select) commands not present in the source table; only "Read current input name" query exists. Source device name in input prompt is "Sc15 Prisma" but source PDF references "NP5 Prisma MK2" — model compatibility may need operator confirmation. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
powerable: true   # inferred from operate/standby commands
queryable: true   # inferred from read commands
levelable: true   # inferred from volume/balance commands
```

## Actions
```yaml
- id: power_toggle
  label: Operate/Standby Toggle
  kind: action
  command: "02 57 01 00 10 03"
  params: []
- id: standby_set
  label: Standby
  kind: action
  command: "02 57 81 00 10 03"
  params: []
- id: operate_set
  label: Operate
  kind: action
  command: "02 57 81 01 10 03"
  params: []
- id: volume_decrease
  label: Volume Decrease
  kind: action
  command: "02 57 03 FF 10 03"
  params: []
- id: volume_increase
  label: Volume Increase
  kind: action
  command: "02 57 03 01 10 03"
  params: []
- id: volume_set
  label: Volume Set
  kind: action
  command: "02 57 83 {level} 10 03"
  params:
    - name: level
      type: integer
      description: Volume index (0x00..0x63, i.e. 0..99)
- id: volume_query
  label: Volume Query
  kind: query
  command: "02 52 1F 00 10 03"
  params: []
- id: balance_step_right
  label: Balance One Step Right
  kind: action
  command: "02 57 04 FF 10 03"
  params: []
- id: balance_step_left
  label: Balance One Step Left
  kind: action
  command: "02 57 04 01 10 03"
  params: []
- id: balance_set
  label: Balance Set
  kind: action
  command: "02 57 84 {value} 10 03"
  params:
    - name: value
      type: integer
      description: Balance position (0x01..0x13, where 0x0A=centered; L9..L1, Center, R1..R9)
- id: mute_toggle
  label: Mute/Unmute Toggle
  kind: action
  command: "02 57 09 00 10 03"
  params: []
- id: mute_disable
  label: Mute Disable (Unmute)
  kind: action
  command: "02 57 89 00 10 03"
  params: []
- id: mute_enable
  label: Mute Enable
  kind: action
  command: "02 57 89 01 10 03"
  params: []
- id: verbose_toggle
  label: Verbose Toggle
  kind: action
  command: "02 57 0D 00 10 03"
  params: []
- id: verbose_disable
  label: Disable Verbose
  kind: action
  command: "02 57 8D 00 10 03"
  params: []
- id: verbose_enable
  label: Enable Verbose
  kind: action
  command: "02 57 8D 01 10 03"
  params: []
- id: factory_reset
  label: Factory Reset
  kind: action
  command: "02 57 13 00 10 03"
  params: []
- id: input_name_query
  label: Read Current Input Alias
  kind: query
  command: "02 52 14 00 10 03"
  params: []
- id: manufacturer_query
  label: Read Manufacturer
  kind: query
  command: "02 52 15 00 10 03"
  params: []
- id: model_query
  label: Read Model Name
  kind: query
  command: "02 52 16 00 10 03"
  params: []
- id: firmware_version_query
  label: Read Firmware Version
  kind: query
  command: "02 52 17 00 10 03"
  params: []
- id: bluetooth_visibility_toggle
  label: Bluetooth Visibility Toggle
  kind: action
  command: "02 57 18 00 10 03"
  params: []
- id: bluetooth_visibility_disable
  label: Bluetooth Visibility Disable
  kind: action
  command: "02 57 98 00 10 03"
  params: []
- id: bluetooth_visibility_enable
  label: Bluetooth Visibility Enable
  kind: action
  command: "02 57 98 01 10 03"
  params: []
- id: bluetooth_autoconnect_toggle
  label: Bluetooth Auto-Connect Toggle
  kind: action
  command: "02 57 19 00 10 03"
  params: []
- id: bluetooth_autoconnect_disable
  label: Bluetooth Auto-Connect Disable
  kind: action
  command: "02 57 99 00 10 03"
  params: []
- id: bluetooth_autoconnect_enable
  label: Bluetooth Auto-Connect Enable
  kind: action
  command: "02 57 99 01 10 03"
  params: []
- id: bluetooth_name_query
  label: Read Bluetooth Name
  kind: query
  command: "02 52 1C 00 10 03"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [operate, standby]
- id: volume
  type: integer
  description: Volume index 0..99 (0x00..0x63)
- id: balance
  type: integer
  description: Balance position 0x01..0x13 (L9..L1, 0x0A=Center, R1..R9)
- id: mute_state
  type: enum
  values: [unmuted, muted]
- id: verbose_state
  type: enum
  values: [disabled, enabled]
- id: bluetooth_visibility
  type: enum
  values: [disabled, enabled]
- id: bluetooth_autoconnect
  type: enum
  values: [disabled, enabled]
- id: input_name
  type: string
- id: manufacturer
  type: string
- id: model_name
  type: string
- id: firmware_version
  type: string
- id: bluetooth_name
  type: string
```

## Variables
```yaml
- name: volume_level
  type: integer
  range: [0, 99]
  description: 0x00..0x63 per source volume table
- name: balance_position
  type: integer
  range: [1, 19]
  description: 0x01..0x13; 0x0A = centered
```

## Events
```yaml
# Verbose-mode unsolicited replies are framed as <STX> <variable> [<value>] <DLE> <ETX>
# when the device has verbose replies enabled. Other unsolicited notifications:
# UNRESOLVED: source does not document unsolicited event frames beyond verbose replies.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset
interlocks: []
# UNRESOLVED: source does not document interlock procedures or safety warnings.
```

## Notes
Frame format: every command is a 6-byte packet `<STX> <command> <variable> [<value>] <DLE> <ETX>`. The `command` byte is `0x57` (W) for write, `0x52` (R) for read. Replies (when verbose is enabled) use `<STX> <variable> [<value>] <DLE> <ETX>` and may include multi-byte value payloads (e.g. input alias, model, firmware string). The source table was tested with firmware v1.99; no other firmware compatibility range stated.

The source PDF header reads "Primare NP5 Prisma MK2 - RS232 Command List" while the operator-supplied device name is "Primare Sc15 Prisma Preamplifier And Network Player". The action and feedback payload hex bytes are taken verbatim from the NP5 Prisma MK2 command list. Operator should confirm that the Sc15 Prisma uses the same RS-232 framing before driving the device.

Balance steps are stored as a 19-position integer (0x01..0x13); the source enumerates L9..L1, Center (0x0A), and R1..R9 — these are not 19 separate opcodes, but a single `balance_set` action with the value field shown. Likewise volume is a single `volume_set` action with `level` 0..99, not 100 separate actions.

<!-- UNRESOLVED: input select (source) commands not present in the source — only the read-alias query is documented. Voltage/current/power specs not stated. Physical connector pinout (DB-9 vs 3.5mm TRS, used by some Primare units) not stated. Whether verbose replies arrive unsolicited or only in response to commands is ambiguous — source shows them only as "replies on the following format when a command is received". -->

## Provenance

```yaml
source_domains:
  - primare.net
source_urls:
  - https://primare.net/wp-content/uploads/2020/08/NP5-Prisma-MK2-RS232-Command-list-2021-10-04.pdf
retrieved_at: 2026-07-10T10:59:19.873Z
last_checked_at: 2026-07-13T06:40:26.497Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-13T06:40:26.497Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched verbatim in source table after removal of the 3 fabricated opcode-swap query commands; perfect one-to-one command coverage; transport params confirmed (115200/8/N/1). (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input selection (source select) commands not present in the source table; only \"Read current input name\" query exists. Source device name in input prompt is \"Sc15 Prisma\" but source PDF references \"NP5 Prisma MK2\" — model compatibility may need operator confirmation."
- "source does not document unsolicited event frames beyond verbose replies."
- "source does not document multi-step macro sequences."
- "source does not document interlock procedures or safety warnings."
- "input select (source) commands not present in the source — only the read-alias query is documented. Voltage/current/power specs not stated. Physical connector pinout (DB-9 vs 3.5mm TRS, used by some Primare units) not stated. Whether verbose replies arrive unsolicited or only in response to commands is ambiguous — source shows them only as \"replies on the following format when a command is received\"."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
