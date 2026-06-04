---
spec_id: admin/atlona-at-vga0804
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-VGA0804 Control Spec"
manufacturer: Atlona
model_family: AT-VGA0804
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-VGA0804
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/pdf/manuals/AT-VGA-MATRIX.pdf
  - https://www.manualslib.com/manual/734471/Atlona-At-Vga0801-To-At-Vga9601.html
  - https://atlona.com/support/
retrieved_at: 2026-06-03T07:38:04.120Z
last_checked_at: 2026-06-04T06:22:40.910Z
generated_at: 2026-06-04T06:22:40.910Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source provides no firmware compatibility range, no electrical ratings, no fault recovery behavior"
  - "source provides no fault behavior, error recovery, or electrical specifications"
verification:
  verdict: verified
  checked_at: 2026-06-04T06:22:40.910Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched literal commands in source with correct shapes and transport parameters verified. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Atlona AT-VGA0804 Control Spec

## Summary
The AT-VGA0804 is an 8x4 VGA matrix switcher controllable via RS-232. This spec covers the ASCII command set for routing video, audio, or both between inputs and outputs, plus system commands for keyboard lock, buzzer, password reset, and route memory.

<!-- UNRESOLVED: source provides no firmware compatibility range, no electrical ratings, no fault recovery behavior -->

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
  connector: DB-9 female
  pinout:
    tx: 2
    rx: 3
    gnd: 5
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable  # inferred: input/output routing commands present
- queryable  # inferred: status and version query commands present
```

## Actions
```yaml
# System commands
- id: query_type
  label: Query Matrix Model
  kind: query
  command: "/*Type;"
  params: []

- id: reset_password
  label: Reset Password
  kind: action
  command: "/+{password};"
  params:
    - name: password
      type: string
      description: 9-digit password

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
  label: Buzzer Off
  kind: action
  command: "/:BellOff;"
  params: []

- id: buzzer_on
  label: Buzzer On
  kind: action
  command: "/:BellOn;"
  params: []

- id: query_version
  label: Query Software Version
  kind: query
  command: "/^Version;"
  params: []

- id: transfer_input_to_all_outputs
  label: Transfer Input To All Outputs
  kind: action
  command: "[{input}]All."
  params:
    - name: input
      type: integer
      description: Input number

# Operation commands
- id: mirror_all_matching
  label: Mirror All Inputs To Matching Outputs
  kind: action
  command: "All#."
  params: []

- id: all_outputs_off
  label: All Outputs Off
  kind: action
  command: "All$."
  params: []

- id: mirror_input_to_matching_output
  label: Mirror Input To Matching Output
  kind: action
  command: "{input}#."
  params:
    - name: input
      type: integer
      description: Input number

- id: route_video_to_output
  label: Route Video To Output
  kind: action
  command: "{input}V{output}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: route_video_to_outputs
  label: Route Video To Multiple Outputs
  kind: action
  command: "{input}V{outputs}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: outputs
      type: string
      description: Comma-separated output numbers (e.g. 4,7,8)

- id: route_audio_to_output
  label: Route Audio To Output
  kind: action
  command: "{input}A{output}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: route_audio_to_outputs
  label: Route Audio To Multiple Outputs
  kind: action
  command: "{input}A{outputs}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: outputs
      type: string
      description: Comma-separated output numbers (e.g. 2,4,6)

- id: route_both_to_output
  label: Route Audio And Video To Output
  kind: action
  command: "{input}B{output}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: route_both_to_outputs
  label: Route Audio And Video To Multiple Outputs
  kind: action
  command: "{input}B{outputs}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: outputs
      type: string
      description: Comma-separated output numbers (e.g. 3,4,5)

- id: route_input_to_group
  label: Route Input To Output Group
  kind: action
  command: "{input}P{group}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: group
      type: integer
      description: Group number

- id: form_group
  label: Form Output Group
  kind: action
  command: "{group}PP{outputs}."
  params:
    - name: group
      type: integer
      description: Group number
    - name: outputs
      type: string
      description: Comma-separated output numbers to include in group

- id: query_group
  label: Query Group Membership
  kind: query
  command: "S{group}."
  params:
    - name: group
      type: integer
      description: Group number

- id: query_input_routing
  label: Query Outputs For Input
  kind: query
  command: "Status{input}."
  params:
    - name: input
      type: integer
      description: Input number

- id: query_all_routing
  label: Query All Input/Output Mapping
  kind: query
  command: "Status."
  params: []

- id: save_routes
  label: Save Current Routes To Memory
  kind: action
  command: "Save{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot (0-9)

- id: recall_routes
  label: Recall Saved Routes
  kind: action
  command: "Recall{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot (0-9)

- id: clear_memory
  label: Clear Saved Routes From Memory
  kind: action
  command: "Clear{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot (0-9)
```

## Feedbacks
```yaml
- id: matrix_model
  type: string
  description: Model identifier returned by /*Type;
- id: software_version
  type: string
  description: Firmware/software version string returned by /^Version;
- id: input_routing
  type: string
  description: Output numbers connected to a given input, returned by Status{input}.
- id: full_routing_map
  type: string
  description: Complete input-to-output mapping, returned by Status.
- id: group_membership
  type: string
  description: Output numbers belonging to a group, returned by S{group}.
```

## Notes
- Each command line MUST terminate with one of: `.` `;` `!` `"` `$` `&`. Source states: "Each line must have an end, which is either a . ; ! " $ or & without the end the code will fail."
- Command codes are case- and spacing-sensitive; do not alter capitalization or whitespace.
- Variable substitutions per source: X = input, W/Y/Z = output number, G = group number, N = memory number (0-9).
- Password reset (`/+xxxxxxxx;`) requires exactly 9 digits.
- Group operation (`XPG.`) routes to all outputs in the named group; group membership defined by `GPPW,Y,Z.`.
- Save/Recall/Clear memory slots: 0-9.

<!-- UNRESOLVED: source provides no fault behavior, error recovery, or electrical specifications -->

## Provenance

```yaml
source_domains:
  - atlona.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/pdf/manuals/AT-VGA-MATRIX.pdf
  - https://www.manualslib.com/manual/734471/Atlona-At-Vga0801-To-At-Vga9601.html
  - https://atlona.com/support/
retrieved_at: 2026-06-03T07:38:04.120Z
last_checked_at: 2026-06-04T06:22:40.910Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:22:40.910Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched literal commands in source with correct shapes and transport parameters verified. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source provides no firmware compatibility range, no electrical ratings, no fault recovery behavior"
- "source provides no fault behavior, error recovery, or electrical specifications"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
