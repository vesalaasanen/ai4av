---
spec_id: admin/parasound-newclassic-200-pre
schema_version: ai4av-public-spec-v1
revision: 1
title: "Parasound NewClassic 200 Pre Control Spec"
manufacturer: Parasound
model_family: "NewClassic 200 Pre"
aliases: []
compatible_with:
  manufacturers:
    - Parasound
  models:
    - "NewClassic 200 Pre"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.shopify.com
source_urls:
  - "https://cdn.shopify.com/s/files/1/0763/0864/4159/files/200_Pre_Int-rs-232-guide.pdf?v=1718769361"
retrieved_at: 2026-05-21T16:57:33.061Z
last_checked_at: 2026-10-01T06:42:01.977Z
generated_at: 2026-10-01T06:42:01.977Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device model variants (e.g., integrated vs. pre only) not distinguished in source"
  - "no safety warnings or interlock procedures in source"
  - "full status response mapping table (line 102-103 has minor transcription errors in source — L vs W sub level)"
verification:
  verdict: verified
  checked_at: 2026-10-01T06:42:01.977Z
  matched_actions: 35
  action_count: 35
  confidence: medium
  summary: "All 35 action units match source commands and serial params; select_input collapses seven input commands; all 9 read commands are covered by feedbacks. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Parasound NewClassic 200 Pre Control Spec

## Summary
Parasound NewClassic 200 Pre stereo preamplifier. RS-232C serial control at 9600 baud, 8N1. ASCII command protocol with hex equivalents. Unsolicited status broadcasts on IR/panel/RS-232 control. Supports power, volume, mute, input routing, bass/treble/balance, and subwoofer level.

<!-- UNRESOLVED: device model variants (e.g., integrated vs. pre only) not distinguished in source -->

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
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable       # power on/off/toggle commands present
- queryable      # read commands for all status items
- levelable      # volume, bass, treble, balance, sub level
- routable       # input selection commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
- id: volume_up
  label: Volume Up 1 Step
  kind: action
  params: []
- id: volume_down
  label: Volume Down 1 Step
  kind: action
  params: []
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: mute_toggle
  label: Mute Toggle
  kind: action
  params: []
- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input selector; documented values only: 1=Input 1 (W 1 2 6), 2=Input 2 (W 1 2 7), 3=Input 3 (W 1 2 8), 5=Bypass (W 1 2 3), 6=USB (W 1 2 9), 7=OPT 1 (W 1 2 10), 8=COAX (W 1 2 11). Value 4 (Input 4/Aux) has no select command in source - UNRESOLVED, do not send.
- id: input_next
  label: Next Input
  kind: action
  params: []
- id: input_previous
  label: Previous Input
  kind: action
  params: []
- id: bass_increment
  label: Bass +
  kind: action
  params: []
- id: bass_decrement
  label: Bass -
  kind: action
  params: []
- id: treble_increment
  label: Treble +
  kind: action
  params: []
- id: treble_decrement
  label: Treble -
  kind: action
  params: []
- id: bass_flat
  label: Set Bass to Flat (0 dB)
  kind: action
  params: []
- id: treble_flat
  label: Set Treble to Flat (0 dB)
  kind: action
  params: []
- id: balance_left
  label: Balance Left +1 dB
  kind: action
  params: []
- id: balance_right
  label: Balance Right +1 dB
  kind: action
  params: []
- id: balance_reset
  label: Reset Balance to Even
  kind: action
  params: []
- id: sub_level_up
  label: Sub Level +1 dB
  kind: action
  params: []
- id: sub_level_down
  label: Sub Level -1 dB
  kind: action
  params: []
- id: sub_level_flat
  label: Reset Sub Level to Flat (0 dB)
  kind: action
  params: []
- id: sub_on
  label: Sub On
  kind: action
  params: []
- id: sub_off
  label: Sub Off
  kind: action
  params: []
- id: jump_to_volume
  label: Jump to Volume XX
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume level 0-100
```

## Feedbacks
```yaml
- id: power_state
  query_command: "R 1 1<CR>"
  label: Power State
  type: enum
  values: [G0, G1]
  description: G0=Off, G1=On
- id: input_state
  query_command: "R 1 2<CR>"
  label: Input State
  type: enum
  values: [S1, S2, S3, S4, S5, S6, S7, S8]
  description: Input 1-8 (S4=Input 4/Aux, S5=Bypass, S6=USB, S7=OPT 1, S8=COAX)
- id: volume_state
  query_command: "R 1 7<CR>"
  label: Volume State
  type: integer
  range: [0, 100]
  description: Vxx, current volume 0-100
- id: mute_state
  query_command: "R 1 10<CR>"
  label: Mute State
  type: enum
  values: [M0, M1]
  description: M0=Off, M1=On (M1 also shown when unit is off)
- id: bass_state
  query_command: "R 1 4<CR>"
  label: Bass State
  type: integer
  range: [0, 16]
  description: B08=flat, B09=+1, B10=+2, B07=-1, etc.
- id: treble_state
  query_command: "R 1 5<CR>"
  label: Treble State
  type: integer
  range: [0, 16]
  description: T08=flat, T09=+1, T10=+2, T07=-1, etc.
- id: balance_state
  query_command: "R 1 6<CR>"
  label: Balance State
  type: integer
  range: [0, 32]
  description: L16=even, L17=left+1, L15=right+1, etc.
- id: sub_level_state
  query_command: "R 1 8<CR>"
  label: Sub Level State
  type: integer
  range: [0, 32]
  description: W16=flat 0dB, W17=sub+1, W15=sub-1, etc.
- id: full_status
  query_command: "R 1 13<CR>"
  label: Full Status
  type: string
  description: "*G1 S3 V55 M1 B10 T10 L10 W16<CR>" - unsolicited broadcast format
```

## Variables
```yaml
# No standalone settable variables beyond actions; state is managed via actions and feedbacks.
```

## Events
```yaml
# Unsolicited status broadcast sent on any control (IR, front panel, RS-232):
# Format: *G1 S3 V55 M1 B10 T10 L10 W16<CR>
# Breakdowns:
#   G = power (G0/G1)
#   S = input (S1-S8)
#   V = volume 0-100
#   M = mute (M0/M1)
#   B = bass 0-16 (B08=flat)
#   T = treble 0-16 (T08=flat)
#   L = balance 0-32 (L16=even)
#   W = sub level 0-32 (W16=flat)
```

## Macros
```yaml
# No explicit macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command format: `W 1 XX YYY<CR>` (ASCII) where XX/YYY are parameter groups. Hex space=20, CR=0D. Commands are space-separated except 2-digit numbers already combined. Query format: `R 1 X<CR>`. No login or authentication procedure described.

<!-- UNRESOLVED: full status response mapping table (line 102-103 has minor transcription errors in source — L vs W sub level) -->

## Provenance

```yaml
source_domains:
  - cdn.shopify.com
source_urls:
  - "https://cdn.shopify.com/s/files/1/0763/0864/4159/files/200_Pre_Int-rs-232-guide.pdf?v=1718769361"
retrieved_at: 2026-05-21T16:57:33.061Z
last_checked_at: 2026-10-01T06:42:01.977Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T06:42:01.977Z
matched_actions: 35
action_count: 35
confidence: medium
summary: "All 35 action units match source commands and serial params; select_input collapses seven input commands; all 9 read commands are covered by feedbacks. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device model variants (e.g., integrated vs. pre only) not distinguished in source"
- "no safety warnings or interlock procedures in source"
- "full status response mapping table (line 102-103 has minor transcription errors in source — L vs W sub level)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
