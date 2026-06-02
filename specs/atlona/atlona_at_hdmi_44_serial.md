---
spec_id: admin/atlona-at-hdmi-44
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-HDMI-44 Control Spec"
manufacturer: Atlona
model_family: AT-HDMI-44
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-HDMI-44
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
retrieved_at: 2026-05-31T08:32:32.819Z
last_checked_at: 2026-05-31T20:54:06.627Z
generated_at: 2026-05-31T20:54:06.627Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input/output count not explicitly stated; inferred from routing command syntax (X, W,Y,Z pattern; group examples referencing outputs 4-6)"
  - "flow control not stated in source"
  - "COM port number not stated in source"
  - "no standalone settable parameters outside of discrete routing actions"
  - "no unsolicited notification protocol described in source"
  - "no explicit multi-step macro sequences documented"
  - "no safety warnings, interlock procedures, or power sequencing documented in source"
  - "input/output count not explicitly stated in source; inferred from command syntax and group examples"
  - "flow control (RTS/CTS, XON/XOFF) not stated in source"
  - "unsolicited event/polling protocol not described in source"
verification:
  verdict: verified
  checked_at: 2026-05-31T20:54:06.627Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions matched their source commands verbatim; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-31
---

# Atlona AT-HDMI-44 Control Spec

## Summary
4×4 HDMI matrix switcher. Independent video, audio, and combined A/V routing across four inputs and four outputs. RS-232 control at 9600 bps 8/N/1. Routing commands, output grouping, and 10-slot memory save/recall documented.

<!-- UNRESOLVED: input/output count not explicitly stated; inferred from routing command syntax (X, W,Y,Z pattern; group examples referencing outputs 4-6) -->

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
  port: null  # UNRESOLVED: COM port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable       # evidenced by video/audio/combined routing commands
- queryable      # evidenced by Status, S, and system info commands
```

## Actions
```yaml
- id: system_info
  label: System Info
  kind: query
  params: []
  description: Returns matrix model information

- id: reset_password
  label: Reset Password
  kind: action
  params:
    - name: password
      type: string
      description: Must be exactly 9 digits
  description: Resets the password

- id: lock_keyboard
  label: Lock Keyboard
  kind: action
  params: []
  description: Locks the front-panel keyboard

- id: unlock_keyboard
  label: Unlock Keyboard
  kind: action
  params: []
  description: Unlocks the front-panel keyboard

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
  description: Returns the software version

- id: mirror_all
  label: Mirror All
  kind: action
  params: []
  description: Transfers signal from each input to its corresponding output (1→1, 2→2, 4→4, etc.)

- id: switch_off_all
  label: Switch Off All Outputs
  kind: action
  params: []
  description: Switches off all outputs

- id: mirror_input_to_output
  label: Mirror Input to Corresponding Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
  description: Mirrors input X to output X (e.g. 3# → input 3 to output 3)

- id: transfer_video_single
  label: Transfer Video to Single Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: output
      type: integer
      description: Output number (1-based)
  description: Transfers video from input X to output Y (e.g. 2V3.)

- id: transfer_video_multiple
  label: Transfer Video to Multiple Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: outputs
      type: string
      description: Comma-separated output numbers (e.g. 4,7,8)
  description: Transfers video from input X to outputs W,Y,Z (e.g. 2V4,7,8.)

- id: transfer_audio_single
  label: Transfer Audio to Single Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: output
      type: integer
      description: Output number (1-based)
  description: Transfers audio from input X to output Y (e.g. 4A3.)

- id: transfer_audio_multiple
  label: Transfer Audio to Multiple Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: outputs
      type: string
      description: Comma-separated output numbers (e.g. 2,4,6)
  description: Transfers audio from input X to outputs W,Y,Z (e.g. 1A2,4,6.)

- id: transfer_av_single
  label: Transfer Audio and Video to Single Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: output
      type: integer
      description: Output number (1-based)
  description: Transfers both audio and video from input X to output Y (e.g. 3B2.)

- id: transfer_av_multiple
  label: Transfer Audio and Video to Multiple Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: outputs
      type: string
      description: Comma-separated output numbers (e.g. 3,4,5)
  description: Transfers both audio and video from input X to outputs W,Y,Z (e.g. 4B3,4,5.)

- id: transfer_to_group
  label: Transfer Audio and Video to Output Group
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: group
      type: integer
      description: Group number
  description: Transfers audio and video from input X to output group G (e.g. 3P2.)

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
  description: Groups outputs W,Y,Z into group G (e.g. 2PP4,5,6.)

- id: query_group
  label: Query Group Members
  kind: query
  params:
    - name: group
      type: integer
      description: Group number
  description: Returns which outputs are in group G (e.g. S2.)

- id: status_input
  label: Status Query by Input
  kind: query
  params:
    - name: input
      type: integer
      description: Input number (1-based)
  description: Returns which outputs are connected to input X (e.g. Status2.)

- id: status_all
  label: Status Query All
  kind: query
  params: []
  description: Returns which inputs are connected to which outputs

- id: save_memory
  label: Save to Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: Memory slot number (0-9)
  description: Saves current routing configuration to memory slot N (e.g. Save4.)

- id: recall_memory
  label: Recall Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: Memory slot number (0-9)
  description: Recalls routing configuration from memory slot N (e.g. Recall4.)

- id: clear_memory
  label: Clear Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: Memory slot number (0-9)
  description: Clears memory slot N (e.g. Clear4.)
```

## Feedbacks
```yaml
- id: system_info_response
  type: string
  description: Matrix model information response to /*Type; command

- id: version_response
  type: string
  description: Software version string response to /^Version; command

- id: group_query_response
  type: string
  description: Comma-separated output list for given group (response to SG.)

- id: status_input_response
  type: string
  description: Comma-separated output list connected to given input (response to StatusX.)

- id: status_all_response
  type: string
  description: Full routing map of all inputs to outputs (response to Status.)
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters outside of discrete routing actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power sequencing documented in source
```

## Notes
Command terminators: each command must end with one of `.` `;` `!` `"` `$` `&` — without the end the command fails. Do not append a carriage return.

Command syntax is case-sensitive. Capitalization, spacing, and lettering must not be changed.

Group example: 3P2 routes input 3 to group 2 (outputs 4, 5, and 6) — confirms at least 4 outputs.

Memory slots: 0 through 9 (10 total).
<!-- UNRESOLVED: input/output count not explicitly stated in source; inferred from command syntax and group examples -->
<!-- UNRESOLVED: flow control (RTS/CTS, XON/XOFF) not stated in source -->
<!-- UNRESOLVED: unsolicited event/polling protocol not described in source -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
retrieved_at: 2026-05-31T08:32:32.819Z
last_checked_at: 2026-05-31T20:54:06.627Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T20:54:06.627Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions matched their source commands verbatim; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input/output count not explicitly stated; inferred from routing command syntax (X, W,Y,Z pattern; group examples referencing outputs 4-6)"
- "flow control not stated in source"
- "COM port number not stated in source"
- "no standalone settable parameters outside of discrete routing actions"
- "no unsolicited notification protocol described in source"
- "no explicit multi-step macro sequences documented"
- "no safety warnings, interlock procedures, or power sequencing documented in source"
- "input/output count not explicitly stated in source; inferred from command syntax and group examples"
- "flow control (RTS/CTS, XON/XOFF) not stated in source"
- "unsolicited event/polling protocol not described in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
