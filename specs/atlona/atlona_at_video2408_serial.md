---
spec_id: admin/atlona-at-video2408
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-VIDEO2408 Control Spec"
manufacturer: Atlona
model_family: AT-VIDEO2408
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-VIDEO2408
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/pdf/manuals/AT-VIDEO-MATRIX.pdf
retrieved_at: 2026-06-03T20:48:08.981Z
last_checked_at: 2026-06-04T06:24:27.234Z
generated_at: 2026-06-04T06:24:27.234Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device has a 9-digit password mechanism (/+xxxxxxxx) but the source does not describe a connection-time login flow; auth.type left unresolved."
  - "password reset command (/+xxxxxxxx) implies a 9-digit password mechanism, but no connection/login flow is described in the source"
  - "source documents query commands return data (Status, StatusX, SG, /*Type, /^Version)"
  - "firmware version compatibility not stated in source."
  - "response message format for all query commands not stated in source."
  - "connection-time authentication/login flow not described; only a password-reset command is documented."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:24:27.234Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched literally in source with correct shapes; transport fully verified; complete bidirectional command coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Atlona AT-VIDEO2408 Control Spec

## Summary
The Atlona AT-VIDEO2408 is a 24x8 BNC composite-video matrix switcher controlled via RS-232. This spec covers the ASCII command set documented in the vendor's RS-232 connection and command reference, including system commands (model/version queries, keyboard lock, buzzer, password reset) and operation commands (per-input/per-output video and audio routing, output grouping, status queries, and memory save/recall/clear).

<!-- UNRESOLVED: device has a 9-digit password mechanism (/+xxxxxxxx) but the source does not describe a connection-time login flow; auth.type left unresolved. -->

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
  type: null  # UNRESOLVED: password reset command (/+xxxxxxxx) implies a 9-digit password mechanism, but no connection/login flow is described in the source
```

## Traits
```yaml
- routable  # inferred: input/output routing commands (V, A, B, P, All) present
- queryable  # inferred: status, group, model, and version query commands present
```

## Actions
```yaml
# All commands must be terminated with one of: . ; ! " $ &
# System commands documented as terminated with ";"
# Operation commands documented as terminated with "."

- id: query_model
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
      description: 9-digit password (per source: "must be 9 digits")

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

- id: query_software_version
  label: Query Software Version
  kind: query
  command: "/^Version;"
  params: []

- id: transfer_to_all_outputs
  label: Transfer Input To All Outputs
  kind: action
  command: "[ {input} ]All."
  params:
    - name: input
      type: integer
      description: Input number (X in source notation)

- id: mirror_all_inputs
  label: Mirror All Inputs To Matching Outputs
  kind: action
  command: "All#."
  params: []

- id: switch_off_all_outputs
  label: Switch Off All Outputs
  kind: action
  command: "All$."
  params: []

- id: mirror_input_to_matching_output
  label: Mirror Input N To Output N
  kind: action
  command: "{input}#."
  params:
    - name: input
      type: integer
      description: Input number; routes to the same-numbered output

- id: route_video_single
  label: Route Video Input To Output
  kind: action
  command: "{input}V{output}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: route_video_multi
  label: Route Video Input To Multiple Outputs
  kind: action
  command: "{input}V{output1},{output2},{output3}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output1
      type: integer
      description: First output number
    - name: output2
      type: integer
      description: Second output number
    - name: output3
      type: integer
      description: Third output number

- id: route_audio_single
  label: Route Audio Input To Output
  kind: action
  command: "{input}A{output}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: route_audio_multi
  label: Route Audio Input To Multiple Outputs
  kind: action
  command: "{input}A{output1},{output2},{output3}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output1
      type: integer
      description: First output number
    - name: output2
      type: integer
      description: Second output number
    - name: output3
      type: integer
      description: Third output number

- id: route_both_single
  label: Route Both Video And Audio Input To Output
  kind: action
  command: "{input}B{output}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: route_both_multi
  label: Route Both Video And Audio Input To Multiple Outputs
  kind: action
  command: "{input}B{output1},{output2},{output3}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output1
      type: integer
      description: First output number
    - name: output2
      type: integer
      description: Second output number
    - name: output3
      type: integer
      description: Third output number

- id: route_to_group
  label: Route Input To Output Group
  kind: action
  command: "{input}P{group}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: group
      type: integer
      description: Group number (G in source notation)

- id: form_output_group
  label: Form Output Group
  kind: action
  command: "{group}PP{output1},{output2},{output3}."
  params:
    - name: group
      type: integer
      description: Group number
    - name: output1
      type: integer
      description: First output in group
    - name: output2
      type: integer
      description: Second output in group
    - name: output3
      type: integer
      description: Third output in group

- id: query_group_members
  label: Query Group Members
  kind: query
  command: "S{group}."
  params:
    - name: group
      type: integer
      description: Group number

- id: query_input_status
  label: Query Outputs Connected To Input
  kind: query
  command: "Status{input}."
  params:
    - name: input
      type: integer
      description: Input number

- id: query_full_status
  label: Query All Input/Output Mapping
  kind: query
  command: "Status."
  params: []

- id: save_memory
  label: Save Current Routes To Memory
  kind: action
  command: "Save{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot number 0-9 (per source: "Memories go from 0 to 9")

- id: recall_memory
  label: Recall Memory
  kind: action
  command: "Recall{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot number 0-9

- id: clear_memory
  label: Clear Memory
  kind: action
  command: "Clear{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot number 0-9
```

## Feedbacks
```yaml
# UNRESOLVED: source documents query commands return data (Status, StatusX, SG, /*Type, /^Version)
# but does not specify the response message format. Response schemas omitted.
```

## Notes
- Physical interface: 9-pin female D-sub connector. Pin 2 = Tx, Pin 3 = Rx, Pin 5 = Gnd. All other pins unused.
- The source notation defines X = input, W/Y/Z = output, G = group, N = memory number.
- Every command must be terminated with one of: `. ; ! " $ &` — without a terminator the code will fail. The source's documented examples use `.` for operation commands and `;` for system commands, but the policy permits any of those six terminators.
- Commands are case- and spacing-sensitive: "do not change capitalization, spacing, or lettering."
- The device has 10 memory slots (0-9) for saved route configurations.
- Power commands are not present in the source (this is a passive matrix switcher with no documented power-state control via RS-232).

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: response message format for all query commands not stated in source. -->
<!-- UNRESOLVED: connection-time authentication/login flow not described; only a password-reset command is documented. -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/pdf/manuals/AT-VIDEO-MATRIX.pdf
retrieved_at: 2026-06-03T20:48:08.981Z
last_checked_at: 2026-06-04T06:24:27.234Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:24:27.234Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched literally in source with correct shapes; transport fully verified; complete bidirectional command coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device has a 9-digit password mechanism (/+xxxxxxxx) but the source does not describe a connection-time login flow; auth.type left unresolved."
- "password reset command (/+xxxxxxxx) implies a 9-digit password mechanism, but no connection/login flow is described in the source"
- "source documents query commands return data (Status, StatusX, SG, /*Type, /^Version)"
- "firmware version compatibility not stated in source."
- "response message format for all query commands not stated in source."
- "connection-time authentication/login flow not described; only a password-reset command is documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
