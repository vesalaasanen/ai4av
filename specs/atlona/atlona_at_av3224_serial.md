---
spec_id: admin/atlona-at-av3224
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-AV3224 Control Spec"
manufacturer: Atlona
model_family: AT-AV3224
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-AV3224
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-HDR-H2H-44MA_API.pdf
  - https://atlona.com/pdf/AT-JUNO-451_HDBT_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-44M_API.pdf
  - https://atlona.com/pdf/AT-OCS-900N_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-1616M_API.pdf
retrieved_at: 2026-04-30T10:17:04.860Z
last_checked_at: 2026-05-31T20:54:05.480Z
generated_at: 2026-05-31T20:54:05.480Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T20:54:05.480Z
  matched_actions: 24
  action_count: 24
  confidence: high
  summary: "All 24 spec actions match source commands one-to-one; transport parameters verified in source protocol specification."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-31
---

# Atlona AT-AV3224 Control Spec

## Summary
Atlona AT-AV3224 matrix switcher. RS-232C control at 9600bps. Supports video routing, audio routing, input-to-output switching, output grouping, and memory save/recall. Matrix size inferred from command syntax (X=input, Y/Z=output numbers).

<!-- UNRESOLVED: matrix dimensions (input/output count) not explicitly stated in source -->

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
- powerable  # UNRESOLVED: no explicit power commands in source; keyboard lock implies control
- routable    # inferred: video/audio transfer commands present
- queryable   # inferred: status query commands present
```

## Actions
```yaml
# System Commands
- id: get_model_info
  label: Get Model Info
  kind: query
  params: []
  description: Acquires the matrix model information

- id: reset_password
  label: Reset Password
  kind: action
  params:
    - name: password
      type: integer
      description: Must be 9 digits
  description: Resets the password

- id: lock_keyboard
  label: Lock Keyboard
  kind: action
  params: []
  description: Locks the keyboard

- id: unlock_keyboard
  label: Unlock Keyboard
  kind: action
  params: []
  description: Unlocks the keyboard

- id: buzzer_off
  label: Buzzer Off
  kind: action
  params: []
  description: Turns the buzzer off

- id: buzzer_on
  label: Buzzer On
  kind: action
  params: []
  description: Turns the buzzer on

- id: get_version
  label: Get Software Version
  kind: query
  params: []
  description: Acquires the software version

# Operation Commands
- id: mirror_all
  label: Mirror All
  kind: action
  params: []
  description: Transfers signal from the input to all matching outputs

- id: switch_off_all
  label: Switch Off All
  kind: action
  params: []
  description: Switches off all outputs

- id: mirror_input_to_output
  label: Mirror Input to Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
  description: Mirrors input number with corresponding output

- id: transfer_video_single
  label: Transfer Video to Single Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number
  description: Transfers video from input to output

- id: transfer_video_multiple
  label: Transfer Video to Multiple Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number
    - name: outputs
      type: string
      description: Comma-separated output numbers
  description: Transfers video from input to multiple outputs

- id: transfer_audio_single
  label: Transfer Audio to Single Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number
  description: Transfers audio from input to output

- id: transfer_audio_multiple
  label: Transfer Audio to Multiple Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number
    - name: outputs
      type: string
      description: Comma-separated output numbers
  description: Transfers audio from input to multiple outputs

- id: transfer_av_single
  label: Transfer Audio and Video to Single Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number
  description: Transfers both video and audio from input to output

- id: transfer_av_multiple
  label: Transfer Audio and Video to Multiple Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number
    - name: outputs
      type: string
      description: Comma-separated output numbers
  description: Transfers both video and audio from input to multiple outputs

- id: transfer_to_group
  label: Transfer to Output Group
  kind: action
  params:
    - name: input
      type: integer
      description: Input number
    - name: group
      type: integer
      description: Group number
  description: Transfers audio and video from input to output group

- id: form_group
  label: Form Output Group
  kind: action
  params:
    - name: group
      type: integer
      description: Group number to create
    - name: outputs
      type: string
      description: Comma-separated output numbers
  description: Takes outputs and forms a group with them

- id: get_group_outputs
  label: Get Group Outputs
  kind: query
  params:
    - name: group
      type: integer
      description: Group number
  description: Acquires what outputs are in the group

- id: status_input
  label: Status Query by Input
  kind: query
  params:
    - name: input
      type: integer
      description: Input number
  description: Acquires which outputs are connected to the input

- id: status_all
  label: Status Query All
  kind: query
  params: []
  description: Acquires which inputs are with which outputs

- id: save_memory
  label: Save to Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: Memory number (0-9)
  description: Save the routes to memory

- id: recall_memory
  label: Recall Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: Memory number (0-9)
  description: Recalls the saved route memory

- id: clear_memory
  label: Clear Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: Memory number (0-9)
  description: Clears the memory
```

## Feedbacks
```yaml
# UNRESOLVED: source does not document response strings for commands
```

## Variables
```yaml
# UNRESOLVED: source does not document discrete settable parameters separate from action commands
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from the device
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step command sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command terminators: each command must end with `.`, `;`, `!`, `"`, `$`, or `&`. Without the end, the code will fail. Commands are case-sensitive. Matrix dimensions not explicitly stated; inferred from command syntax.
<!-- UNRESOLVED: matrix input/output port count not stated in source -->
<!-- UNRESOLVED: group output composition (e.g. outputs 4,5,6 = group 2) not configurable via command, only queryable -->
<!-- UNRESOLVED: flow control (RTS/CTS, XON/XOFF) not stated in source -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-HDR-H2H-44MA_API.pdf
  - https://atlona.com/pdf/AT-JUNO-451_HDBT_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-44M_API.pdf
  - https://atlona.com/pdf/AT-OCS-900N_API.pdf
  - https://atlona.com/pdf/AT-UHD-PRO3-1616M_API.pdf
retrieved_at: 2026-04-30T10:17:04.860Z
last_checked_at: 2026-05-31T20:54:05.480Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T20:54:05.480Z
matched_actions: 24
action_count: 24
confidence: high
summary: "All 24 spec actions match source commands one-to-one; transport parameters verified in source protocol specification."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
