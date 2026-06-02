---
spec_id: admin/atlona-at-dvi0808
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-DVI0808 Control Spec"
manufacturer: Atlona
model_family: AT-DVI0808
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-DVI0808
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/pdf/manuals/AT-DVI-MATRIX.pdf
retrieved_at: 2026-05-19T18:48:56.762Z
last_checked_at: 2026-05-20T04:51:22.522Z
generated_at: 2026-05-20T04:51:22.522Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP, HTTP, or other protocol support not mentioned in source"
  - "flow control not stated in source"
  - "port number not applicable for serial-only device"
  - "power on/off commands not found in source"
  - "device does not appear to send unsolicited status notifications"
  - "no explicit multi-step macros described in source"
  - "no safety warnings or interlock procedures in source"
  - "voltage/current/power specs not in source"
  - "firmware version compatibility not stated"
  - "TCP/IP or HTTP control paths not mentioned in source"
verification:
  verdict: verified
  checked_at: 2026-05-20T04:51:22.522Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec actions matched literally to source commands; transport parameters verified; bidirectional coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Atlona AT-DVI0808 Control Spec

## Summary
The Atlona AT-DVI0808 is a DVI matrix switcher supporting 8 inputs and 8 outputs. Control via RS-232 through a 9-pin female D connector at 9600bps. Supports video-only, audio-only, and combined audio/video routing to individual outputs or output groups.

<!-- UNRESOLVED: TCP/IP, HTTP, or other protocol support not mentioned in source -->

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
addressing:
  port: null  # UNRESOLVED: port number not applicable for serial-only device
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # UNRESOLVED: power on/off commands not found in source
- routable
- queryable
```

## Actions
```yaml
- id: acquire_model_info
  label: Acquire Matrix Model Information
  kind: action
  params: []
- id: reset_password
  label: Reset Password
  kind: action
  params:
    - name: password
      type: string
      description: Must be exactly 9 digits
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
- id: acquire_version
  label: Acquire Software Version
  kind: action
  params: []
- id: transfer_video_to_all
  label: Transfer Video to All Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-8)
- id: mirror_all
  label: Mirror All Inputs to Matching Outputs
  kind: action
  params: []
- id: switch_off_all
  label: Switch Off All Outputs
  kind: action
  params: []
- id: mirror_input
  label: Mirror Input to Corresponding Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-8)
- id: transfer_video_single
  label: Transfer Video to Single Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: output
      type: integer
      description: Output number (1-8)
- id: transfer_video_multi
  label: Transfer Video to Multiple Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: outputs
      type: string
      description: Comma-separated output numbers (e.g. "4,7,8")
- id: transfer_audio_single
  label: Transfer Audio to Single Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: output
      type: integer
      description: Output number (1-8)
- id: transfer_audio_multi
  label: Transfer Audio to Multiple Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: outputs
      type: string
      description: Comma-separated output numbers (e.g. "2,4,6")
- id: transfer_av_single
  label: Transfer Audio and Video to Single Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: output
      type: integer
      description: Output number (1-8)
- id: transfer_av_multi
  label: Transfer Audio and Video to Multiple Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: outputs
      type: string
      description: Comma-separated output numbers (e.g. "3,4,5")
- id: transfer_to_group
  label: Transfer Audio and Video to Output Group
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: group
      type: integer
      description: Group number
- id: form_group
  label: Form Output Group
  kind: action
  params:
    - name: group
      type: integer
      description: Group number to create
    - name: outputs
      type: string
      description: Comma-separated output numbers (e.g. "4,5,6")
- id: acquire_group_outputs
  label: Acquire Group Outputs
  kind: action
  params:
    - name: group
      type: integer
      description: Group number to query
- id: save_memory
  label: Save Routes to Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: Memory slot number (0-9)
- id: recall_memory
  label: Recall Routes from Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: Memory slot number (0-9)
- id: clear_memory
  label: Clear Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: Memory slot number (0-9)
```

## Feedbacks
```yaml
- id: input_to_output_status
  label: Input to Output Status
  kind: query
  params:
    - name: input
      type: integer
      description: Input number (1-8) to query
- id: full_status
  label: Full Input/Output Status
  kind: query
  params: []
```

## Variables
```yaml
# Memory slots 0-9 store routing configurations; recall_memory and clear_memory
# actions manage these. No independent settable parameters beyond routing.
```

## Events
```yaml
# UNRESOLVED: device does not appear to send unsolicited status notifications
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

Command syntax summary:
- Commands end with one of: `.` `;` `!` `"` `$` `&`
- Commands are case-sensitive; spacing and capitalization must be exact
- X = input, Y/Z/W = output numbers, G = group number, N = memory number

Example command strings from source:
- `/*;` — acquire model info
- `3V2.` — route input 3 video to output 2
- `2V4,7,8.` — route input 2 video to outputs 4, 7, 8
- `3B2.` — route input 3 audio+video to output 2
- `Status2.` — query input 2 routing status

<!-- UNRESOLVED: voltage/current/power specs not in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: TCP/IP or HTTP control paths not mentioned in source -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/pdf/manuals/AT-DVI-MATRIX.pdf
retrieved_at: 2026-05-19T18:48:56.762Z
last_checked_at: 2026-05-20T04:51:22.522Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T04:51:22.522Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec actions matched literally to source commands; transport parameters verified; bidirectional coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP, HTTP, or other protocol support not mentioned in source"
- "flow control not stated in source"
- "port number not applicable for serial-only device"
- "power on/off commands not found in source"
- "device does not appear to send unsolicited status notifications"
- "no explicit multi-step macros described in source"
- "no safety warnings or interlock procedures in source"
- "voltage/current/power specs not in source"
- "firmware version compatibility not stated"
- "TCP/IP or HTTP control paths not mentioned in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
