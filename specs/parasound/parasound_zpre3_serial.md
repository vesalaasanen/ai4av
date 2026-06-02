---
spec_id: admin/parasound-zpre3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Parasound Zpre3 Control Spec"
manufacturer: Parasound
model_family: Zpre3
aliases: []
compatible_with:
  manufacturers:
    - Parasound
  models:
    - Zpre3
    - "ZPRE V.3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.shopify.com
source_urls:
  - "https://cdn.shopify.com/s/files/1/0763/0864/4159/files/Zpre3RS-232Guide.pdf?v=1718771526"
retrieved_at: 2026-05-21T17:00:47.559Z
last_checked_at: 2026-05-31T07:00:30.833Z
generated_at: 2026-05-31T07:00:30.833Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated in source"
  - "no power-on sequencing requirements documented"
  - "command response timing / latency not specified"
  - "error recovery behavior not documented"
verification:
  verdict: verified
  checked_at: 2026-05-31T07:00:30.833Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec actions (25 controls + 8 query commands) matched literally in source; transport parameters verified against protocol specs table. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Parasound Zpre3 Control Spec

## Summary
Parasound Zpre3 stereo preamplifier with RS-232 serial control. ASCII command protocol with space-delimited tokens terminated by carriage return. Supports power, volume, mute, input selection, bass/treble tone controls, and balance. Provides both polled feedback queries and unsolicited status updates.

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
  pinout:
    txd: 2
    rxd: 3
    gnd: 5
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # power on/off/toggle commands
  - queryable    # read commands for all state
  - levelable    # volume, bass, treble, balance
  - routable     # 5 inputs + bypass
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "W 1 1 2"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "W 1 1 1"
    params: []

  - id: power_toggle
    label: Power Toggle
    kind: action
    command: "W 1 1 3"
    params: []

  - id: volume_up
    label: Volume Up 1 Step
    kind: action
    command: "W 1 9 1"
    params: []

  - id: volume_down
    label: Volume Down 1 Step
    kind: action
    command: "W 1 9 2"
    params: []

  - id: volume_set
    label: Jump to Volume
    kind: action
    command: "W 2 {volume}"
    params:
      - name: volume
        type: integer
        min: 0
        max: 100
        description: "Volume level (0-100, matches front panel display)"

  - id: mute_on
    label: Mute On
    kind: action
    command: "W 1 10 2"
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: "W 1 10 1"
    params: []

  - id: mute_toggle
    label: Mute Toggle
    kind: action
    command: "W 1 10 3"
    params: []

  - id: select_input_1
    label: Select Input 1
    kind: action
    command: "W 1 2 6"
    params: []

  - id: select_input_2
    label: Select Input 2
    kind: action
    command: "W 1 2 7"
    params: []

  - id: select_input_3
    label: Select Input 3
    kind: action
    command: "W 1 2 8"
    params: []

  - id: select_input_4
    label: Select Input 4
    kind: action
    command: "W 1 2 9"
    params: []

  - id: select_bypass
    label: Select Bypass Input
    kind: action
    command: "W 1 2 3"
    params: []

  - id: input_next
    label: Next Input
    kind: action
    command: "W 1 2 4"
    params: []

  - id: input_previous
    label: Previous Input
    kind: action
    command: "W 1 2 5"
    params: []

  - id: bass_up
    label: Bass Increase
    kind: action
    command: "W 1 3 1"
    params: []

  - id: bass_down
    label: Bass Decrease
    kind: action
    command: "W 1 3 2"
    params: []

  - id: bass_flat
    label: Set Bass to Flat
    kind: action
    command: "W 1 3 5"
    params: []

  - id: treble_up
    label: Treble Increase
    kind: action
    command: "W 1 3 3"
    params: []

  - id: treble_down
    label: Treble Decrease
    kind: action
    command: "W 1 3 4"
    params: []

  - id: treble_flat
    label: Set Treble to Flat
    kind: action
    command: "W 1 3 6"
    params: []

  - id: balance_left
    label: Balance Left
    kind: action
    command: "W 1 3 7"
    params: []

  - id: balance_right
    label: Balance Right
    kind: action
    command: "W 1 3 8"
    params: []

  - id: balance_even
    label: Reset Balance to Even
    kind: action
    command: "W 1 3 9"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_status
    label: Power Status
    query_command: "R 1 1"
    type: enum
    values:
      - value: "G0"
        meaning: "Power Off"
      - value: "G1"
        meaning: "Power On"
    response_prefix: "*"

  - id: input_status
    label: Current Input
    query_command: "R 1 2"
    type: enum
    values:
      - value: "S1"
        meaning: "Input 1"
      - value: "S2"
        meaning: "Input 2"
      - value: "S3"
        meaning: "Input 3"
      - value: "S4"
        meaning: "Input 4/Aux"
      - value: "S5"
        meaning: "Bypass Input"
    response_prefix: "*"

  - id: mute_status
    label: Mute Status
    query_command: "R 1 10"
    type: enum
    values:
      - value: "M0"
        meaning: "Mute Off"
      - value: "M1"
        meaning: "Mute On"
    response_prefix: "*"

  - id: volume_status
    label: Volume Level
    query_command: "R 1 7"
    type: integer
    min: 0
    max: 100
    response_prefix: "*V"
    response_suffix: "<CR>"

  - id: bass_status
    label: Bass Level
    query_command: "R 1 4"
    type: integer
    min: 0
    max: 16
    response_prefix: "*B"
    neutral: 8
    description: "08 = flat, 09 = +1, 16 = +8, 07 = -1, etc."

  - id: treble_status
    label: Treble Level
    query_command: "R 1 5"
    type: integer
    min: 0
    max: 16
    response_prefix: "*T"
    neutral: 8
    description: "08 = flat, 09 = +1, 16 = +8, 07 = -1, etc."

  - id: balance_status
    label: Balance
    query_command: "R 1 6"
    type: integer
    min: 0
    max: 32
    response_prefix: "*L"
    neutral: 16
    description: "16 = even, 17 = left +1, 15 = right +1, etc."

  - id: full_status
    label: Full Status
    query_command: "R 1 13"
    type: string
    description: "Returns full state: *Gx Sx Vxx Mx Bxx Txx Lxx"
```

## Variables
```yaml
variables:
  - id: volume
    label: Volume
    type: integer
    min: 0
    max: 100
    set_command: "W 2 {value}"
    query_command: "R 1 7"
    description: "Volume level 0-100 matching front panel display"
```

## Events
```yaml
events:
  - id: unsolicited_feedback
    label: Unsolicited Status Update
    description: >-
      Sent automatically whenever Zpre3 is controlled by IR remote, front panel,
      or RS232. Format: *Gx Sx Vxx Mx Bxx Txx Lxx<CR>
      where * = start of transmission, <CR> = end of transmission.
    fields:
      - token: "G"
        meaning: "Power (0=off, 1=on)"
      - token: "S"
        meaning: "Input (1-5)"
      - token: "V"
        meaning: "Volume (0-100)"
      - token: "M"
        meaning: "Mute (0=off, 1=on; always 1 when unit off)"
      - token: "B"
        meaning: "Bass (08=flat, range 00-16)"
      - token: "T"
        meaning: "Treble (08=flat, range 00-16)"
      - token: "L"
        meaning: "Balance (16=even, range 00-32)"
```

## Macros
```yaml
# No multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- All commands are ASCII, space-delimited between each number or letter (except two-digit numbers), terminated with `<CR>` (hex `0D`).
- Hex equivalent for space is `20`. Commands prefixed with `W` for write/control, `R` for read/query.
- Mute feedback always shows `M1` when unit is powered off.
- Bass and treble use offset encoding: value 08 = flat, values above 08 = positive boost, values below 08 = negative cut. Range 00-16 maps to approximately -8 to +8 dB.
- Balance uses offset encoding: value 16 = even, values above 16 = left bias, values below 16 = right bias. Range 00-32.
- Input 4 is also labeled "Aux" in feedback responses.
- Bypass input is input 5 in feedback (`S5`).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: no power-on sequencing requirements documented -->
<!-- UNRESOLVED: command response timing / latency not specified -->
<!-- UNRESOLVED: error recovery behavior not documented -->

## Provenance

```yaml
source_domains:
  - cdn.shopify.com
source_urls:
  - "https://cdn.shopify.com/s/files/1/0763/0864/4159/files/Zpre3RS-232Guide.pdf?v=1718771526"
retrieved_at: 2026-05-21T17:00:47.559Z
last_checked_at: 2026-05-31T07:00:30.833Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T07:00:30.833Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec actions (25 controls + 8 query commands) matched literally in source; transport parameters verified against protocol specs table. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated in source"
- "no power-on sequencing requirements documented"
- "command response timing / latency not specified"
- "error recovery behavior not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
