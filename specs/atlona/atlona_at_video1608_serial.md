---
spec_id: admin/atlona-at-video1608
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-VIDEO1608 Control Spec"
manufacturer: Atlona
model_family: AT-VIDEO1608
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-VIDEO1608
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
  - files.bzbexpress.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://files.bzbexpress.com/files/descriptions/665.pdf
  - https://atlona.com/support/
retrieved_at: 2026-06-12T02:03:08.737Z
last_checked_at: 2026-06-12T19:09:53.517Z
generated_at: 2026-06-12T19:09:53.517Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "flow control not stated in source"
  - "source does not document response format for query commands"
  - "no settable parameters beyond discrete actions documented in source"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "response format for all query commands not documented"
  - "feedback/notification protocol not documented"
  - "command timing constraints not documented"
  - "flow control setting not stated"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:09:53.517Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched literal commands in source; transport parameters verified. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Atlona AT-VIDEO1608 Control Spec

## Summary
16×8 matrix switcher controlled via RS-232C serial. Supports video-only, audio-only, and combined routing from any input to any output or group of outputs. Includes memory presets, keyboard lock, buzzer toggle, and status queries.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source (password reset exists but no login)
```

## Traits
```yaml
- routable
- queryable
```

## Actions
```yaml
- id: get_model_info
  label: Get Model Info
  kind: query
  command: "/*"
  params: []
  notes: "Acquires matrix model information. Terminator required."

- id: reset_password
  label: Reset Password
  kind: action
  command: "/+{password}"
  params:
    - name: password
      type: string
      description: "9-digit password"
  notes: "Must be exactly 9 digits."

- id: lock_keyboard
  label: Lock Keyboard
  kind: action
  command: "/%Lock"
  params: []

- id: unlock_keyboard
  label: Unlock Keyboard
  kind: action
  command: "/%Unlock"
  params: []

- id: buzzer_off
  label: Buzzer Off
  kind: action
  command: "/:BellOff"
  params: []

- id: buzzer_on
  label: Buzzer On
  kind: action
  command: "/:BellOn"
  params: []

- id: get_software_version
  label: Get Software Version
  kind: query
  command: "/^Version"
  params: []

- id: route_input_to_all_outputs
  label: Route Input to All Outputs
  kind: action
  command: "[{input}]All."
  params:
    - name: input
      type: integer
      description: "Input number"
  notes: "Transfers signal from one input to all outputs."

- id: mirror_all
  label: Mirror All
  kind: action
  command: "All#."
  params: []
  notes: "Mirrors all inputs to all matching outputs (input 1→output 1, input 2→output 2, etc.)"

- id: all_outputs_off
  label: All Outputs Off
  kind: action
  command: "All$"
  params: []
  notes: "Switches off all outputs."

- id: mirror_input
  label: Mirror Input to Matching Output
  kind: action
  command: "{input}#."
  params:
    - name: input
      type: integer
      description: "Input number (mirrors to same-numbered output)"
  notes: "Mirrors input number with corresponding output. Ex: 3#. routes input 3 to output 3."

- id: route_video_single
  label: Route Video Single Output
  kind: action
  command: "{input}V{output}."
  params:
    - name: input
      type: integer
      description: "Input number"
    - name: output
      type: integer
      description: "Output number"
  notes: "Transfers video from input to single output. Ex: 2V3."

- id: route_video_multi
  label: Route Video Multiple Outputs
  kind: action
  command: "{input}V{outputs}."
  params:
    - name: input
      type: integer
      description: "Input number"
    - name: outputs
      type: string
      description: "Comma-separated output numbers (e.g. '4,7,8')"
  notes: "Transfers video from input to multiple outputs. Ex: 2V4,7,8."

- id: route_audio_single
  label: Route Audio Single Output
  kind: action
  command: "{input}A{output}."
  params:
    - name: input
      type: integer
      description: "Input number"
    - name: output
      type: integer
      description: "Output number"
  notes: "Transfers audio from input to single output. Ex: 4A3."

- id: route_audio_multi
  label: Route Audio Multiple Outputs
  kind: action
  command: "{input}A{outputs}."
  params:
    - name: input
      type: integer
      description: "Input number"
    - name: outputs
      type: string
      description: "Comma-separated output numbers (e.g. '2,4,6')"
  notes: "Transfers audio from input to multiple outputs. Ex: 1A2,4,6."

- id: route_both_single
  label: Route Video+Audio Single Output
  kind: action
  command: "{input}B{output}."
  params:
    - name: input
      type: integer
      description: "Input number"
    - name: output
      type: integer
      description: "Output number"
  notes: "Transfers both video and audio from input to single output. Ex: 3B2."

- id: route_both_multi
  label: Route Video+Audio Multiple Outputs
  kind: action
  command: "{input}B{outputs}."
  params:
    - name: input
      type: integer
      description: "Input number"
    - name: outputs
      type: string
      description: "Comma-separated output numbers (e.g. '3,4,5')"
  notes: "Transfers both video and audio from input to multiple outputs. Ex: 4B3,4,5."

- id: route_input_to_group
  label: Route Input to Output Group
  kind: action
  command: "{input}P{group}."
  params:
    - name: input
      type: integer
      description: "Input number"
    - name: group
      type: integer
      description: "Group number"
  notes: "Transfers audio and video from input to the output group. Ex: 3P2."

- id: create_group
  label: Create Output Group
  kind: action
  command: "{group}PP{outputs}."
  params:
    - name: group
      type: integer
      description: "Group number"
    - name: outputs
      type: string
      description: "Comma-separated output numbers (e.g. '4,5,6')"
  notes: "Forms a group from the specified outputs. Ex: 2PP4,5,6."

- id: query_group
  label: Query Group Members
  kind: query
  command: "S{group}."
  params:
    - name: group
      type: integer
      description: "Group number"
  notes: "Acquires which outputs are in the group. Ex: S2."

- id: status_input
  label: Status by Input
  kind: query
  command: "Status{input}."
  params:
    - name: input
      type: integer
      description: "Input number"
  notes: "Acquires which outputs are connected to the input. Ex: Status2."

- id: status_all
  label: Status All
  kind: query
  command: "Status."
  params: []
  notes: "Acquires which inputs are with which outputs."

- id: save_memory
  label: Save to Memory
  kind: action
  command: "Save{memory}."
  params:
    - name: memory
      type: integer
      description: "Memory slot (0-9)"
  notes: "Saves current routes to memory. Ex: Save4."

- id: recall_memory
  label: Recall Memory
  kind: action
  command: "Recall{memory}."
  params:
    - name: memory
      type: integer
      description: "Memory slot (0-9)"
  notes: "Recalls saved route memory. Ex: Recall4."

- id: clear_memory
  label: Clear Memory
  kind: action
  command: "Clear{memory}."
  params:
    - name: memory
      type: integer
      description: "Memory slot (0-9)"
  notes: "Clears the saved routes from memory. Ex: Clear4."
```

## Feedbacks
```yaml
# UNRESOLVED: source does not document response format for query commands
```

## Variables
```yaml
# UNRESOLVED: no settable parameters beyond discrete actions documented in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Command terminators: each command line must end with `.`, `;`, `!`, `$`, or `&` or the code will fail.
- Command codes are case-sensitive — do not change capitalization, spacing, or lettering.
- Memory slots range from 0 to 9 (10 total).
- Password reset requires exactly 9 digits.

<!-- UNRESOLVED: response format for all query commands not documented -->
<!-- UNRESOLVED: feedback/notification protocol not documented -->
<!-- UNRESOLVED: command timing constraints not documented -->
<!-- UNRESOLVED: flow control setting not stated -->

## Provenance

```yaml
source_domains:
  - atlona.com
  - files.bzbexpress.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://files.bzbexpress.com/files/descriptions/665.pdf
  - https://atlona.com/support/
retrieved_at: 2026-06-12T02:03:08.737Z
last_checked_at: 2026-06-12T19:09:53.517Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:09:53.517Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched literal commands in source; transport parameters verified. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "flow control not stated in source"
- "source does not document response format for query commands"
- "no settable parameters beyond discrete actions documented in source"
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "response format for all query commands not documented"
- "feedback/notification protocol not documented"
- "command timing constraints not documented"
- "flow control setting not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
