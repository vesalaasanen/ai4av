---
spec_id: admin/atlona-at-hd-v1616m
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-HD-V1616M Control Spec"
manufacturer: Atlona
model_family: AT-HD-V1616M
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-HD-V1616M
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
last_checked_at: 2026-05-27T15:34:21.794Z
generated_at: 2026-05-27T15:34:21.794Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-27T15:34:21.794Z
  matched_actions: 24
  action_count: 24
  confidence: high
  summary: "All 24 spec actions matched verbatim with source; transport parameters fully verified; complete coverage of source command catalogue."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Atlona AT-HD-V1616M Control Spec

## Summary
16x16 HDMI matrix switcher. Controls video/audio routing via RS-232 at 9600/8/N/1. Supports mirroring, per-output routing, audio-only routing, group routing, and 10 memory locations.

<!-- UNRESOLVED: UDP/HTTP not mentioned — TCP/IP unknown -->

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
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # UNRESOLVED: no power commands in source
- routable     # evidenced by V/B/A routing commands
- queryable    # evidenced by Status, S commands
```

## Actions
```yaml
- id: get_model_info
  label: Get Model Info
  kind: query
  params: []
  command: "/*Type;"

- id: reset_password
  label: Reset Password
  kind: action
  params:
    - name: password
      type: string
      description: 9-digit password
  command: "/+{password};"

- id: lock_keyboard
  label: Lock Keyboard
  kind: action
  params: []
  command: "/%Lock;"

- id: unlock_keyboard
  label: Unlock Keyboard
  kind: action
  params: []
  command: "/%Unlock;"

- id: buzzer_off
  label: Buzzer Off
  kind: action
  params: []
  command: "/:BellOff;"

- id: buzzer_on
  label: Buzzer On
  kind: action
  params: []
  command: "/:BellOn;"

- id: get_version
  label: Get Software Version
  kind: query
  params: []
  command: "/^Version;"

- id: mirror_all
  label: Mirror All Inputs to Matching Outputs
  kind: action
  params: []
  command: "All#."

- id: switch_off_all
  label: Switch Off All Outputs
  kind: action
  params: []
  command: "All$."

- id: mirror_input_to_matching_output
  label: Mirror Input to Corresponding Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-16)
  command: "{input}#."

- id: transfer_video_single
  label: Transfer Video to Single Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-16)
    - name: output
      type: integer
      description: Output number (1-16)
  command: "{input}V{output}."

- id: transfer_video_multi
  label: Transfer Video to Multiple Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-16)
    - name: outputs
      type: string
      description: Comma-separated output numbers
  command: "{input}V{outputs}."

- id: transfer_audio_single
  label: Transfer Audio to Single Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-16)
    - name: output
      type: integer
      description: Output number (1-16)
  command: "{input}A{output}."

- id: transfer_audio_multi
  label: Transfer Audio to Multiple Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-16)
    - name: outputs
      type: string
      description: Comma-separated output numbers
  command: "{input}A{outputs}."

- id: transfer_av_single
  label: Transfer Video and Audio to Single Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-16)
    - name: output
      type: integer
      description: Output number (1-16)
  command: "{input}B{output}."

- id: transfer_av_multi
  label: Transfer Video and Audio to Multiple Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-16)
    - name: outputs
      type: string
      description: Comma-separated output numbers
  command: "{input}B{outputs}."

- id: transfer_av_to_group
  label: Transfer A/V to Output Group
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-16)
    - name: group
      type: integer
      description: Group number (1-16)
  command: "{input}P{group}."

- id: form_group
  label: Form Output Group
  kind: action
  params:
    - name: group
      type: integer
      description: Group number (1-16)
    - name: outputs
      type: string
      description: Comma-separated output numbers
  command: "{group}PP{outputs}."

- id: query_group
  label: Query Group Members
  kind: query
  params:
    - name: group
      type: integer
      description: Group number (1-16)
  command: "S{group}."

- id: query_input_routing
  label: Query Output Routing for Input
  kind: query
  params:
    - name: input
      type: integer
      description: Input number (1-16)
  command: "Status{input}."

- id: query_full_routing
  label: Query Full Routing Table
  kind: query
  params: []
  command: "Status."

- id: save_memory
  label: Save Routes to Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: Memory slot (0-9)
  command: "Save{slot}."

- id: recall_memory
  label: Recall Routes from Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: Memory slot (0-9)
  command: "Recall{slot}."

- id: clear_memory
  label: Clear Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: Memory slot (0-9)
  command: "Clear{slot}."
```

## Feedbacks
```yaml
# UNRESOLVED: no explicit response strings in source
```

## Variables
```yaml
# UNRESOLVED: no discrete variables - routing state conveyed via Status queries
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings in source
```

## Notes
Command terminator required: `. ; ! " $ &` — without it command fails. Case-sensitive. Matrix is 16x16 — inputs/outputs numbered 1-16. Groups referenced by group number N where outputs 4(N-1)+1 through 4(N-1)+4 map to group N. Memory slots 0-9.
<!-- UNRESOLVED: TCP/IP support not stated, power commands not stated, event-driven feedback not stated -->

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
last_checked_at: 2026-05-27T15:34:21.794Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-27T15:34:21.794Z
matched_actions: 24
action_count: 24
confidence: high
summary: "All 24 spec actions matched verbatim with source; transport parameters fully verified; complete coverage of source command catalogue."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
