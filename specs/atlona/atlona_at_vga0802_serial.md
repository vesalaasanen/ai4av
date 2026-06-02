---
spec_id: admin/atlona-at-vga0802
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-VGA0802 Control Spec"
manufacturer: Atlona
model_family: AT-VGA0802
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-VGA0802
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://www.manualslib.com/manual/734471/Atlona-At-Vga0801-To-At-Vga9601.html
retrieved_at: 2026-05-21T18:11:38.097Z
last_checked_at: 2026-05-22T13:30:15.816Z
generated_at: 2026-05-22T13:30:15.816Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "No power on/off commands found in source"
  - "flow control not stated in source"
  - "source describes commands that return status but does not specify"
  - "no unsolicited notification descriptions found in source."
  - "no safety warnings or interlock procedures in source."
  - "flow control (RTS/CTS, XON/XOFF) not stated in source"
  - "response format strings for Status and query commands not documented"
  - "group output membership ranges not stated (e.g., group 2 = outputs 4,5,6)"
verification:
  verdict: verified
  checked_at: 2026-05-22T13:30:15.816Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched distinct source commands; transport parameters verified; complete one-to-one coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Atlona AT-VGA0802 Control Spec

## Summary
8×2 VGA matrix switcher with RS-232 control. Supports video-only, audio-only, and combined A/V routing to single or multiple outputs. Supports output grouping and preset memory (0–9). Serial config: 9600 baud, 8N1.

<!-- UNRESOLVED: No power on/off commands found in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable  # inferred from routing command examples (X V Y, X B Y, etc.)
- queryable  # inferred from Status, /*Type;, /^Version; commands
```

## Actions
```yaml
- id: get_type
  label: Get Matrix Model Info
  kind: action
  params: []

- id: reset_password
  label: Reset Password
  kind: action
  params:
    - name: password
      type: string
      pattern: "^[0-9]{9}$"
      description: 9-digit password

- id: lock_keyboard
  label: Lock Keyboard
  kind: action
  params: []

- id: unlock_keyboard
  label: Unlock Keyboard
  kind: action
  params: []

- id: buzzer_off
  label: Turn Buzzer Off
  kind: action
  params: []

- id: buzzer_on
  label: Turn Buzzer On
  kind: action
  params: []

- id: get_version
  label: Get Software Version
  kind: action
  params: []

- id: route_video_all
  label: Transfer Video to All Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)

- id: mirror_all
  label: Mirror All Inputs to All Matching Outputs
  kind: action
  params: []

- id: switch_off_all
  label: Switch Off All Outputs
  kind: action
  params: []

- id: mirror_input_to_output
  label: Mirror Input to Corresponding Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (mirrors to same output number)

- id: route_video_to_output
  label: Transfer Video from Input to Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: output
      type: integer
      description: Output number (1-based)

- id: route_video_to_outputs
  label: Transfer Video from Input to Multiple Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: outputs
      type: array
      items:
        type: integer
      description: Output numbers (1-based)

- id: route_audio_to_output
  label: Transfer Audio from Input to Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: output
      type: integer
      description: Output number (1-based)

- id: route_audio_to_outputs
  label: Transfer Audio from Input to Multiple Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: outputs
      type: array
      items:
        type: integer
      description: Output numbers (1-based)

- id: route_av_to_output
  label: Transfer Audio and Video from Input to Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: output
      type: integer
      description: Output number (1-based)

- id: route_av_to_outputs
  label: Transfer Audio and Video from Input to Multiple Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: outputs
      type: array
      items:
        type: integer
      description: Output numbers (1-based)

- id: route_to_group
  label: Transfer Audio and Video from Input to Output Group
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: group
      type: integer
      description: Group number

- id: create_group
  label: Create Output Group
  kind: action
  params:
    - name: group
      type: integer
      description: Group number to create
    - name: outputs
      type: array
      items:
        type: integer
      description: Output numbers to include in group

- id: query_group
  label: Acquire Group Outputs
  kind: action
  params:
    - name: group
      type: integer
      description: Group number to query

- id: query_input_status
  label: Acquire Which Outputs Are Connected to Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number to query

- id: query_all_status
  label: Acquire All Input/Output Routes
  kind: action
  params: []

- id: save_memory
  label: Save Routes to Memory
  kind: action
  params:
    - name: slot
      type: integer
      minimum: 0
      maximum: 9
      description: Memory slot number (0-9)

- id: recall_memory
  label: Recall Route Memory
  kind: action
  params:
    - name: slot
      type: integer
      minimum: 0
      maximum: 9
      description: Memory slot number (0-9)

- id: clear_memory
  label: Clear Memory
  kind: action
  params:
    - name: slot
      type: integer
      minimum: 0
      maximum: 9
      description: Memory slot number (0-9)
```

## Feedbacks
```yaml
# UNRESOLVED: source describes commands that return status but does not specify
# response string formats. Feedback formats not documented.
```

## Variables
```yaml
# No discrete settable parameters found in source beyond routing commands.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification descriptions found in source.
```

## Macros
```yaml
# No explicit multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source.
```

## Notes

**Command syntax rules:**
- Commands are case-sensitive
- Command terminators (end-of-line): `.` `;` `!` `"` `$` `&`
- Format: `[command]X[operator]Y.` where X=input, Y=output
- Group operations use output groups predefined via `G PP W,Y,Z.` command

**Pinout (9-pin female D):**
| Pin | Function |
|-----|----------|
| 2 | Tx (Transmit) |
| 3 | Rx (Receive) |
| 5 | Ground |

**Memory slots 0–9** store complete input/output route configurations.

<!-- UNRESOLVED: flow control (RTS/CTS, XON/XOFF) not stated in source -->
<!-- UNRESOLVED: response format strings for Status and query commands not documented -->
<!-- UNRESOLVED: group output membership ranges not stated (e.g., group 2 = outputs 4,5,6) -->

## Provenance

```yaml
source_domains:
  - atlona.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://www.manualslib.com/manual/734471/Atlona-At-Vga0801-To-At-Vga9601.html
retrieved_at: 2026-05-21T18:11:38.097Z
last_checked_at: 2026-05-22T13:30:15.816Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-22T13:30:15.816Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched distinct source commands; transport parameters verified; complete one-to-one coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "No power on/off commands found in source"
- "flow control not stated in source"
- "source describes commands that return status but does not specify"
- "no unsolicited notification descriptions found in source."
- "no safety warnings or interlock procedures in source."
- "flow control (RTS/CTS, XON/XOFF) not stated in source"
- "response format strings for Status and query commands not documented"
- "group output membership ranges not stated (e.g., group 2 = outputs 4,5,6)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
