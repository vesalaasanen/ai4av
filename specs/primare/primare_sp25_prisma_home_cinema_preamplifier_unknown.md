---
spec_id: admin/primare-np5-prisma-mk2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Primare NP5 Prisma MK2 Control Spec"
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
retrieved_at: 2026-07-10T10:58:22.842Z
last_checked_at: 2026-07-12T09:02:39.460Z
generated_at: 2026-07-12T09:02:39.460Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document title is \"NP5 Prisma MK2\", but operator requested spec for \"SP25 Prisma Home Cinema Preamplifier\". Treating NP5 as authoritative source; SP25 compatibility not confirmed."
  - "no settable scalar parameters beyond those covered as discrete actions"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures stated in source"
  - "source provides no information on TCP/IP control even though NP5 Prisma MK2 is a network player; only RS-232 documented."
verification:
  verdict: verified
  checked_at: 2026-07-12T09:02:39.460Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec actions matched verbatim against source; parameterized command shapes confirmed; transport verified; comprehensive coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-10
---

# Primare NP5 Prisma MK2 Control Spec

## Summary
RS-232 control spec for Primare NP5 Prisma MK2 network player. Covers power, volume, balance, mute, verbose mode, factory reset, input alias reads, device info reads, and Bluetooth visibility/auto-connect commands. Tested with firmware v1.99.

<!-- UNRESOLVED: source document title is "NP5 Prisma MK2", but operator requested spec for "SP25 Prisma Home Cinema Preamplifier". Treating NP5 as authoritative source; SP25 compatibility not confirmed. -->

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
- powerable       # inferred from power/standby commands
- levelable       # inferred from volume/balance commands
- queryable       # inferred from read commands
```

## Actions
```yaml
- id: power_standby_toggle
  label: Operate/Standby toggle
  kind: action
  command: "02 57 01 00 10 03"
  params: []

- id: power_standby_set
  label: Operate/Standby set
  kind: action
  command: "02 57 81 {state} 10 03"
  params:
    - name: state
      type: integer
      description: "00 = Standby, 01 = Operate"

- id: volume_decrease
  label: Volume decrease
  kind: action
  command: "02 57 03 FF 10 03"
  params: []

- id: volume_increase
  label: Volume increase
  kind: action
  command: "02 57 03 01 10 03"
  params: []

- id: volume_set
  label: Volume set
  kind: action
  command: "02 57 83 {level} 10 03"
  params:
    - name: level
      type: integer
      description: "Volume value 00..63 hex (0..99 decimal)"

- id: balance_step_right
  label: Balance one step right
  kind: action
  command: "02 57 04 FF 10 03"
  params: []

- id: balance_step_left
  label: Balance one step left
  kind: action
  command: "02 57 04 01 10 03"
  params: []

- id: balance_set
  label: Balance set
  kind: action
  command: "02 57 84 {value} 10 03"
  params:
    - name: value
      type: integer
      description: "01..13 hex = L9..R9, 0A = Centered"

- id: mute_toggle
  label: Mute toggle
  kind: action
  command: "02 57 09 00 10 03"
  params: []

- id: mute_set
  label: Mute set
  kind: action
  command: "02 57 89 {state} 10 03"
  params:
    - name: state
      type: integer
      description: "00 = unmute, 01 = mute"

- id: verbose_toggle
  label: Verbose toggle
  kind: action
  command: "02 57 0D 00 10 03"
  params: []

- id: verbose_set
  label: Verbose set
  kind: action
  command: "02 57 8D {state} 10 03"
  params:
    - name: state
      type: integer
      description: "00 = disable verbose, 01 = enable verbose"

- id: factory_reset
  label: Factory reset
  kind: action
  command: "02 57 13 00 10 03"
  params: []

- id: read_current_input
  label: Read current input name
  kind: query
  command: "02 52 14 00 10 03"
  params: []

- id: read_manufacturer
  label: Read manufacturer
  kind: query
  command: "02 52 15 00 10 03"
  params: []

- id: read_model
  label: Read model name
  kind: query
  command: "02 52 16 00 10 03"
  params: []

- id: read_version
  label: Read firmware version
  kind: query
  command: "02 52 17 00 10 03"
  params: []

- id: read_volume
  label: Read current volume
  kind: query
  command: "02 52 1F 00 10 03"
  params: []

- id: bt_visible_toggle
  label: Bluetooth visible toggle
  kind: action
  command: "02 57 18 00 10 03"
  params: []

- id: bt_visible_set
  label: Bluetooth visible set
  kind: action
  command: "02 57 98 {state} 10 03"
  params:
    - name: state
      type: integer
      description: "00 = disable, 01 = enable"

- id: bt_autoconnect_toggle
  label: Bluetooth auto-connect toggle
  kind: action
  command: "02 57 19 00 10 03"
  params: []

- id: bt_autoconnect_set
  label: Bluetooth auto-connect set
  kind: action
  command: "02 57 99 {state} 10 03"
  params:
    - name: state
      type: integer
      description: "00 = disable, 01 = enable"

- id: read_bt_name
  label: Read Bluetooth name
  kind: query
  command: "02 52 1C 00 10 03"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, operate]
  notes: "Reply frame 0x02 0x01 {value} 0x10 0x03, value 00=standby, 01=operate"

- id: volume_level
  type: integer
  range: "0..99"
  notes: "Reply frame 0x02 0x03 {level} 0x10 0x03"

- id: balance_position
  type: enum
  values: [L9, L8, L7, L6, L5, L4, L3, L2, L1, centered, R1, R2, R3, R4, R5, R6, R7, R8, R9]
  notes: "Reply frame 0x02 0x04 {value} 0x10 0x03, 01..09=L9..L1, 0A=Centered, 0B..13=R1..R9"

- id: mute_state
  type: enum
  values: [unmuted, muted]
  notes: "Reply frame 0x02 0x09 {value} 0x10 0x03, 00=unmuted, 01=muted"

- id: verbose_state
  type: enum
  values: [disabled, enabled]
  notes: "Reply frame 0x02 0x0D {value} 0x10 0x03"

- id: current_input_alias
  type: string
  notes: "Reply frame 0x02 0x14 {ascii} 0x10 0x03"

- id: manufacturer_name
  type: string
  notes: "Reply frame 0x02 0x15 {ascii} 0x10 0x03, observed: PRIMARE"

- id: model_name
  type: string
  notes: "Reply frame 0x02 0x16 {ascii} 0x10 0x03"

- id: firmware_version
  type: string
  notes: "Reply frame 0x02 0x17 {ascii} 0x10 0x03, tested with v1.99"

- id: bt_visible_state
  type: enum
  values: [disabled, enabled]
  notes: "Reply frame 0x02 0x18 {value} 0x10 0x03"

- id: bt_autoconnect_state
  type: enum
  values: [disabled, enabled]
  notes: "Reply frame 0x02 0x19 {value} 0x10 0x03"

- id: bt_name
  type: string
  notes: "Reply frame 0x02 0x1C {ascii} 0x10 0x03"
```

## Variables
```yaml
# UNRESOLVED: no settable scalar parameters beyond those covered as discrete actions
```

## Events
```yaml
# Source describes verbose-mode replies only when verbose enabled.
# Unsolicited notifications beyond verbose reply frames not documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
- Frame format: `<STX> <command> <variable> [<value>] <DLE> <ETX>` with STX=0x02, DLE=0x10, ETX=0x03, Write=0x57 (W), Read=0x52 (R).
- All hex values in source: spaces separate bytes; commands are 6 bytes for fixed-value writes/reads.
- Verbose mode must be enabled (0x02 0x57 0x8D 0x01 0x10 0x03) for device to send replies; with verbose off, no reply frames are emitted.
- Source doc tested with firmware v1.99.
- **Device mismatch warning:** operator requested spec for "Primare SP25 Prisma Home Cinema Preamplifier" but the supplied source document covers the "Primare NP5 Prisma MK2" network player. Spec generated from NP5 source; SP25 protocol may differ (e.g. SP25 uses different baud/commands — verify before use).

<!-- UNRESOLVED: source provides no information on TCP/IP control even though NP5 Prisma MK2 is a network player; only RS-232 documented. -->
```

## Provenance

```yaml
source_domains:
  - primare.net
source_urls:
  - https://primare.net/wp-content/uploads/2020/08/NP5-Prisma-MK2-RS232-Command-list-2021-10-04.pdf
retrieved_at: 2026-07-10T10:58:22.842Z
last_checked_at: 2026-07-12T09:02:39.460Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T09:02:39.460Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec actions matched verbatim against source; parameterized command shapes confirmed; transport verified; comprehensive coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document title is \"NP5 Prisma MK2\", but operator requested spec for \"SP25 Prisma Home Cinema Preamplifier\". Treating NP5 as authoritative source; SP25 compatibility not confirmed."
- "no settable scalar parameters beyond those covered as discrete actions"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures stated in source"
- "source provides no information on TCP/IP control even though NP5 Prisma MK2 is a network player; only RS-232 documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
