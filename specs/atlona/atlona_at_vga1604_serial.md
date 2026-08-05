---
spec_id: admin/atlona-at-vga1604
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-VGA1604 Control Spec"
manufacturer: Atlona
model_family: AT-VGA1604
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-VGA1604
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
  - files.avprosupply.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://files.avprosupply.com/files/attachments/260/atlona-at-vga1604-a-manual.pdf
  - https://atlona.com
retrieved_at: 2026-07-22T00:14:34.203Z
last_checked_at: 2026-07-22T00:56:39.221Z
generated_at: 2026-07-22T00:56:39.221Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no independently settable non-discrete parameters documented in source"
  - "unsolicited notifications not documented in source"
  - "explicit multi-step sequences not documented in source"
  - "safety warnings, interlock procedures, and power-on sequencing not documented in source"
  - "command responses and acknowledgement formats not fully specified in source."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:56:39.221Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched in source with whitespace-collapsed matching; transport parameters verified; no unrepresented commands. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Atlona AT-VGA1604 Control Spec

## Summary

Atlona AT-VGA1604 is controlled through RS-232 using a 9-pin female D connector. Source documents system commands, video/audio routing, groups, status queries, and route memory operations.

## Transport

```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- routable  # inferred from video and audio routing commands
- queryable  # inferred from status and information query commands
```

## Actions

```yaml
- id: acquire_model_information
  label: Acquire Model Information
  kind: query
  command: "/*Type;"
  params: []

- id: reset_password
  label: Reset Password
  kind: action
  command: "/+xxxxxxxx;"
  params:
    - name: password
      type: string
      description: Nine-digit password

- id: lock_keyboard
  label: Lock Keyboard
  kind: action
  command: "/%Lock;"
  params: []

- id: unlock_keyboard
  label: Unlock Keyboard
  kind: action
  command: "/%Unlock;"
  params: []

- id: buzzer_off
  label: Turn Buzzer Off
  kind: action
  command: "/:BellOff;"
  params: []

- id: buzzer_on
  label: Turn Buzzer On
  kind: action
  command: "/:BellOn;"
  params: []

- id: acquire_software_version
  label: Acquire Software Version
  kind: query
  command: "/^Version;"
  params: []

- id: route_input_to_all_outputs
  label: Route Input to All Outputs
  kind: action
  command: "[ X ]All."
  params:
    - name: input
      type: integer
      description: Input number

- id: mirror_all_matching_routes
  label: Mirror All Inputs to Matching Outputs
  kind: action
  command: "All#."
  params: []

- id: switch_off_all_outputs
  label: Switch Off All Outputs
  kind: action
  command: "All$."
  params: []

- id: mirror_input_to_matching_output
  label: Mirror Input to Corresponding Output
  kind: action
  command: "X#."
  params:
    - name: input
      type: integer
      description: Input number

- id: route_video_to_output
  label: Route Video Input to Output
  kind: action
  command: "XVY."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: route_video_to_outputs
  label: Route Video Input to Multiple Outputs
  kind: action
  command: "XVW,Y,Z."
  params:
    - name: input
      type: integer
      description: Input number
    - name: outputs
      type: string
      description: Comma-separated output numbers

- id: route_audio_to_output
  label: Route Audio Input to Output
  kind: action
  command: "XAY."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: route_audio_to_outputs
  label: Route Audio Input to Multiple Outputs
  kind: action
  command: "XAW,Y,Z."
  params:
    - name: input
      type: integer
      description: Input number
    - name: outputs
      type: string
      description: Comma-separated output numbers

- id: route_video_audio_to_output
  label: Route Video and Audio Input to Output
  kind: action
  command: "XBY."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: route_video_audio_to_outputs
  label: Route Video and Audio Input to Multiple Outputs
  kind: action
  command: "XBW,Y,Z."
  params:
    - name: input
      type: integer
      description: Input number
    - name: outputs
      type: string
      description: Comma-separated output numbers

- id: route_video_audio_to_group
  label: Route Video and Audio Input to Output Group
  kind: action
  command: "XPG."
  params:
    - name: input
      type: integer
      description: Input number
    - name: group
      type: integer
      description: Group number

- id: form_output_group
  label: Form Output Group
  kind: action
  command: "GPPW,Y,Z."
  params:
    - name: group
      type: integer
      description: Group number
    - name: outputs
      type: string
      description: Comma-separated output numbers

- id: acquire_group_outputs
  label: Acquire Group Outputs
  kind: query
  command: "SG."
  params:
    - name: group
      type: integer
      description: Group number

- id: acquire_input_outputs
  label: Acquire Outputs Connected to Input
  kind: query
  command: "StatusX."
  params:
    - name: input
      type: integer
      description: Input number

- id: acquire_all_routes
  label: Acquire All Input and Output Routes
  kind: query
  command: "Status."
  params: []

- id: save_routes
  label: Save Routes to Memory
  kind: action
  command: "SaveN."
  params:
    - name: memory
      type: integer
      description: Memory number from 0 to 9

- id: recall_routes
  label: Recall Saved Route Memory
  kind: action
  command: "RecallN."
  params:
    - name: memory
      type: integer
      description: Memory number

- id: clear_route_memory
  label: Clear Route Memory
  kind: action
  command: "ClearN."
  params:
    - name: memory
      type: integer
      description: Memory number
```

## Feedbacks

```yaml
- id: model_information
  type: string
  description: Matrix model information returned by /*Type; query

- id: software_version
  type: string
  description: Software version returned by /^Version; query

- id: group_outputs
  type: string
  description: Outputs belonging to requested group

- id: input_output_routes
  type: string
  description: Outputs connected to requested input

- id: all_routes
  type: string
  description: Current input and output routing state
```

## Variables

```yaml
# UNRESOLVED: no independently settable non-discrete parameters documented in source
```

## Events

```yaml
# UNRESOLVED: unsolicited notifications not documented in source
```

## Macros

```yaml
# UNRESOLVED: explicit multi-step sequences not documented in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings, interlock procedures, and power-on sequencing not documented in source
```

## Notes

Command codes are case-, spacing-, and lettering-sensitive. Every command requires an ending character: `.`, `;`, `!`, `$`, or `&`.

RS-232 pin assignments: pin 2 Tx, pin 3 Rx, pin 5 Gnd; remaining listed pins not used.

<!-- UNRESOLVED: command responses and acknowledgement formats not fully specified in source. -->

## Provenance

```yaml
source_domains:
  - atlona.com
  - files.avprosupply.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://files.avprosupply.com/files/attachments/260/atlona-at-vga1604-a-manual.pdf
  - https://atlona.com
retrieved_at: 2026-07-22T00:14:34.203Z
last_checked_at: 2026-07-22T00:56:39.221Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:56:39.221Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched in source with whitespace-collapsed matching; transport parameters verified; no unrepresented commands. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no independently settable non-discrete parameters documented in source"
- "unsolicited notifications not documented in source"
- "explicit multi-step sequences not documented in source"
- "safety warnings, interlock procedures, and power-on sequencing not documented in source"
- "command responses and acknowledgement formats not fully specified in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
