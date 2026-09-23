---
spec_id: admin/parasound-newclassic-200-integrated
schema_version: ai4av-public-spec-v1
revision: 1
title: "Parasound NewClassic 200 Integrated Control Spec"
manufacturer: Parasound
model_family: "Parasound NewClassic 200 Integrated"
aliases: []
compatible_with:
  manufacturers:
    - Parasound
  models:
    - "Parasound NewClassic 200 Integrated"
    - "Parasound 200 Pre"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.shopify.com
source_urls:
  - "https://cdn.shopify.com/s/files/1/0763/0864/4159/files/200_Pre_Int-rs-232-guide.pdf?v=1718769361"
retrieved_at: 2026-09-02T16:59:20.715Z
last_checked_at: 2026-09-18T22:16:23.722Z
generated_at: 2026-09-18T22:16:23.722Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version range not stated in source"
  - "no settable parameters distinct from discrete actions documented in source"
  - "no multi-step sequences described in source"
  - "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-09-18T22:16:23.722Z
  matched_actions: 41
  action_count: 41
  confidence: medium
  summary: "All 41 spec ids match source verbatim; transport values all present; source command catalogue fully represented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Parasound NewClassic 200 Integrated Control Spec

## Summary
RS-232C control protocol for the Parasound NewClassic 200 Integrated amplifier (and 200 Pre). Commands are ASCII strings framed by `<CR>` (0x0D) with single-space delimiters; hex equivalents provided in source. Unsolicited feedback string emitted whenever state changes via IR, front panel, or RS-232.

<!-- UNRESOLVED: firmware version range not stated in source -->

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
    txd: pin 2
    rxd: pin 3
    gnd: pin 5
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from power commands
- routable  # inferred from input selection commands
- queryable  # inferred from status read commands
- levelable  # inferred from volume/bass/treble/balance/sub controls
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "W 1 1 2<CR>"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "W 1 1 1<CR>"
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  command: "W 1 1 3<CR>"
  params: []

- id: volume_up
  label: Volume Up 1 step
  kind: action
  command: "W 1 9 1<CR>"
  params: []

- id: volume_down
  label: Volume Down 1 step
  kind: action
  command: "W 1 9 2<CR>"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "W 1 10 2<CR>"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "W 1 10 1<CR>"
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "W 1 10 3<CR>"
  params: []

- id: input_usb
  label: Input USB
  kind: action
  command: "W 1 2 9<CR>"
  params: []

- id: input_opt1
  label: Input OPT 1
  kind: action
  command: "W 1 2 10<CR>"
  params: []

- id: input_coax
  label: Input COAX
  kind: action
  command: "W 1 2 11<CR>"
  params: []

- id: input_1
  label: Input 1
  kind: action
  command: "W 1 2 6<CR>"
  params: []

- id: input_2
  label: Input 2
  kind: action
  command: "W 1 2 7<CR>"
  params: []

- id: input_3
  label: Input 3
  kind: action
  command: "W 1 2 8<CR>"
  params: []

- id: input_bypass
  label: Bypass Input
  kind: action
  command: "W 1 2 3<CR>"
  params: []

- id: input_next
  label: Next Input
  kind: action
  command: "W 1 2 4<CR>"
  params: []

- id: input_previous
  label: Previous Input
  kind: action
  command: "W 1 2 5<CR>"
  params: []

- id: bass_up
  label: Bass +
  kind: action
  command: "W 1 3 1<CR>"
  params: []

- id: bass_down
  label: Bass -
  kind: action
  command: "W 1 3 2<CR>"
  params: []

- id: treble_up
  label: Treble +
  kind: action
  command: "W 1 3 3<CR>"
  params: []

- id: treble_down
  label: Treble -
  kind: action
  command: "W 1 3 4<CR>"
  params: []

- id: bass_flat
  label: Set Bass to Flat (0 dB)
  kind: action
  command: "W 1 3 5<CR>"
  params: []

- id: treble_flat
  label: Set Treble to Flat (0 dB)
  kind: action
  command: "W 1 3 6<CR>"
  params: []

- id: balance_left
  label: Balance Left +1 dB
  kind: action
  command: "W 1 3 7<CR>"
  params: []

- id: balance_right
  label: Balance Right +1 dB
  kind: action
  command: "W 1 3 8<CR>"
  params: []

- id: balance_even
  label: Reset Balance to Even
  kind: action
  command: "W 1 3 9<CR>"
  params: []

- id: sub_level_up
  label: Sub Level +1 dB
  kind: action
  command: "W 1 4 1<CR>"
  params: []

- id: sub_level_down
  label: Sub Level -1 dB
  kind: action
  command: "W 1 4 2<CR>"
  params: []

- id: sub_level_flat
  label: Reset Sub Level to Flat (0 dB)
  kind: action
  command: "W 1 4 3<CR>"
  params: []

- id: sub_on
  label: Sub On
  kind: action
  command: "W 1 4 4<CR>"
  params: []

- id: sub_off
  label: Sub Off
  kind: action
  command: "W 1 4 5<CR>"
  params: []

- id: volume_set
  label: Jumpto Volume XX
  kind: action
  command: "W 2 {XX}<CR>"
  params:
    - name: XX
      type: integer
      description: Volume level 00 to 100 (matches front panel display)

- id: query_input
  label: Current Input
  kind: query
  command: "R 1 2<CR>"
  params: []

- id: query_power
  label: Power Status
  kind: query
  command: "R 1 1<CR>"
  params: []

- id: query_mute
  label: Mute Status
  kind: query
  command: "R 1 10<CR>"
  params: []

- id: query_bass
  label: Bass Status
  kind: query
  command: "R 1 4<CR>"
  params: []

- id: query_treble
  label: Treble Status
  kind: query
  command: "R 1 5<CR>"
  params: []

- id: query_balance
  label: Balance Status
  kind: query
  command: "R 1 6<CR>"
  params: []

- id: query_volume
  label: Volume Status
  kind: query
  command: "R 1 7<CR>"
  params: []

- id: query_sub_level
  label: Sub Level Status
  kind: query
  command: "R 1 8<CR>"
  params: []

- id: query_full_status
  label: Full Status Request
  kind: query
  command: "R 1 13<CR>"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  description: "G0 = Power Off, G1 = Power On"

- id: input_state
  type: enum
  values: [input_1, input_2, input_3, input_4_aux, bypass, usb, opt1, coax]
  description: |
 S1=Input 1, S2=Input 2, S3=Input 3, S4=Input 4/Aux,
    S5=Bypass Input, S6=USB (in unsolicited feedback shown as S3 only per doc example),
    S7=OPT 1, S8=COAX. Unsolicited feedback string in doc lists S3 for Input 3.

- id: volume_value
  type: integer
  range: [0, 100]
  description: "Vxx, xx = 0 to 100"

- id: mute_state
  type: enum
  values: [off, on]
  description: "M0=Mute Off, M1=Mute On (shown ON when unit off)"

- id: bass_level
  type: integer
  range: [0, 16]
  description: "Bxx, 08=flat, 09=+1, 16=+8, 07=-1"

- id: treble_level
  type: integer
  range: [0, 16]
  description: "Txx, 08=flat, 09=+1, 16=+8, 07=-1"

- id: balance_level
  type: integer
  range: [0, 32]
  description: "Lxx, 16=Even, 17=Left +1, 15=Right +1, 14=Right +2, 13=Right +3"

- id: sub_level
  type: integer
  range: [0, 32]
  description: "Wxx, 16=flat 0dB, 17=Sub +1, 15=Sub -1, 14=Sub -2"

- id: full_status
  type: composite
  description: |
    Unsolicited feedback format: *G1 S3 V55 M1 B08 T08 L16 W16<CR>
    Full status read response: *G1 S3 V55 M1 B10 T10 L10 W16<CR>
```

## Variables
```yaml
# UNRESOLVED: no settable parameters distinct from discrete actions documented in source
```

## Events
```yaml
- id: unsolicited_state
  description: |
    Sent anytime the unit is controlled by IR remote, Front Panel, or RS-232.
    Format: *G{0|1} S{n} V{xx} M{0|1} B{xx} T{xx} L{xx} W{xx}<CR>
    Fields separated by 0x0D per source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements stated in source
```

## Notes
- All command strings terminated with `<CR>` (0x0D) with no space before the terminator.
- Space delimiter is 0x20.
- Mute feedback shows M1 (on) whenever unit is powered off.
- Source applies to both Parasound 200 Pre and 200 Integrated; some unsolicited-feedback examples omit Input 4/Aux (S4) and show only S1-S3, S5-S8 responses.
- Source contains a typo in the unsolicited feedback example: shows `M1` paired with `G1` (power on, mute on) in the literal `G1 S3 V55 M1 B08 T08 L16 W16`.
- "Bypass Input" appears both as an action target (S5) and as a routable command.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - cdn.shopify.com
source_urls:
  - "https://cdn.shopify.com/s/files/1/0763/0864/4159/files/200_Pre_Int-rs-232-guide.pdf?v=1718769361"
retrieved_at: 2026-09-02T16:59:20.715Z
last_checked_at: 2026-09-18T22:16:23.722Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-18T22:16:23.722Z
matched_actions: 41
action_count: 41
confidence: medium
summary: "All 41 spec ids match source verbatim; transport values all present; source command catalogue fully represented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version range not stated in source"
- "no settable parameters distinct from discrete actions documented in source"
- "no multi-step sequences described in source"
- "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
