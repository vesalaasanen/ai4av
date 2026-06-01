---
spec_id: admin/key-digital-systems-kd-msv8x8
schema_version: ai4av-public-spec-v1
revision: 1
title: "Key Digital Systems KD-MSV8X8 Control Spec"
manufacturer: "Key Digital"
model_family: KD-MSV8X8
aliases: []
compatible_with:
  manufacturers:
    - "Key Digital"
    - "Key Digital Systems"
  models:
    - KD-MSV8X8
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - keydigital.com
source_urls:
  - "http://keydigital.com/Control Mods Codes/KD-MSV8X8/RS-232/KD-MSV8X8_232_Commands.pdf"
  - "http://keydigital.com/Control%20Mods%20Codes/KDMSW8x4_RS232_Commands.pdf"
retrieved_at: 2026-05-04T15:19:02.622Z
last_checked_at: 2026-05-27T15:39:42.209Z
generated_at: 2026-05-27T15:39:42.209Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-27T15:39:42.209Z
  matched_actions: 18
  action_count: 18
  confidence: high
  summary: "All 18 spec actions matched against source with correct command formats and transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Key Digital Systems KD-MSV8X8 Control Spec

## Summary
The KD-MSV8X8 is an 8×8 HDMI matrix switcher controlled via RS-232C. This spec covers serial I/O routing, fade-to-black transitions, video mute, IR/front-panel lockout, unit addressing, and status queries.

<!-- UNRESOLVED: source only covers KD-MSV8X8 (8×8); no info on whether protocol applies to other KD-MSV models -->
<!-- UNRESOLVED: no response format documented beyond mention of numeric/verbose modes -->
<!-- UNRESOLVED: no power on/off commands in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - routable    # I/O switching commands present
  - queryable   # output status and global status queries present
```

## Actions
```yaml
actions:
  - id: io_switch_set
    label: I/O Switching Set
    kind: action
    command: "SP O{output:02d} SI{input:02d}"
    description: Route an input to a specific output
    params:
      - name: output
        type: integer
        min: 1
        max: 8
        description: Output number (01-08)
      - name: input
        type: integer
        min: 1
        max: 8
        description: Input number (01-08)

  - id: unit_address_set
    label: Unit Address Set
    kind: action
    command: "SP CA{address:02d}"
    description: Set the 2-digit unit address for daisy-chain configurations; 00 = stand-alone
    params:
      - name: address
        type: integer
        min: 0
        max: 99
        description: Unit address (00-99, 00 = stand-alone)

  - id: fade_to_black_interval_set
    label: Fade-to-Black Interval Set
    kind: action
    command: "SP O{output:02d} MI{interval:02d}"
    description: Set seamless-switching fade-to-black interval for an output; interval covers the full fade-out + switch + fade-in cycle
    params:
      - name: output
        type: integer
        min: 1
        max: 8
        description: Output number (01-08)
      - name: interval
        type: integer
        enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        enum_labels:
          - "0 ms (off)"
          - "40 ms"
          - "80 ms"
          - "160 ms"
          - "240 ms"
          - "320 ms"
          - "480 ms"
          - "640 ms"
          - "800 ms"
          - "1200 ms"
        description: Fade-to-black interval code (00-09)

  - id: ir_sensor_enable
    label: IR Sensor Enable
    kind: action
    command: "SPCIRE"
    description: Enable IR sensor response
    params: []

  - id: ir_sensor_disable
    label: IR Sensor Disable
    kind: action
    command: "SPCIRD"
    description: Disable IR sensor response
    params: []

  - id: front_panel_enable
    label: Front Panel Enable
    kind: action
    command: "SPCFBE"
    description: Enable front panel push-button response
    params: []

  - id: front_panel_disable
    label: Front Panel Disable
    kind: action
    command: "SPCFBD"
    description: Disable front panel push-button response
    params: []

  - id: output_video_mute
    label: Output Video Mute
    kind: action
    command: "SP O{output:02d} CME"
    description: Mute video on a specific output
    params:
      - name: output
        type: integer
        min: 1
        max: 8
        description: Output number (01-08)

  - id: output_video_unmute
    label: Output Video Un-Mute
    kind: action
    command: "SP O{output:02d} CMD"
    description: Un-mute video on a specific output
    params:
      - name: output
        type: integer
        min: 1
        max: 8
        description: Output number (01-08)

  - id: all_outputs_mute
    label: All Outputs Mute
    kind: action
    command: "SPCCME"
    description: Mute video on all output channels
    params: []

  - id: all_outputs_unmute
    label: All Outputs Un-Mute
    kind: action
    command: "SPCCMD"
    description: Un-mute video on all output channels
    params: []

  - id: reset_unit
    label: Reset Unit
    kind: action
    command: "SPCDF"
    description: Reset the unit to factory defaults
    params: []

  - id: output_status_query
    label: Output Status Query
    kind: query
    command: "ST O{output:02d}"
    description: Query the current routing status of a specific output
    params:
      - name: output
        type: integer
        min: 1
        max: 8
        description: Output number (01-08)

  - id: global_status_query
    label: Global Status Query
    kind: query
    command: "STA"
    description: Query current status of all parameters
    params: []

  - id: numeric_response_mode
    label: Set Numeric RS-232 Response
    kind: action
    command: "SPCRSN"
    description: Set RS-232 responses to numeric format
    params: []

  - id: verbose_response_mode
    label: Set Verbose RS-232 Response
    kind: action
    command: "SPCRSV"
    description: Set RS-232 responses to verbose format
    params: []

  - id: list_commands
    label: List RS-232 Commands
    kind: query
    command: "H"
    description: Display list of all available RS-232 commands
    params: []

  - id: amx_status
    label: AMX Status
    kind: query
    command: "AMX"
    description: View current system status when connected to an AMX control system
    params: []
```

## Feedbacks
```yaml
# UNRESOLVED: source does not document response format or returned values
# for status queries (ST Oxx, ST A, AMX). Only the query commands are specified.
```

## Variables
```yaml
# UNRESOLVED: no settable continuous parameters beyond discrete actions above
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing in source
```

## Notes
- Commands are not case sensitive.
- Spaces in command strings are optional (shown in docs for readability; omitting them has no effect).
- The `Oxx` prefix in routing/mute/fade commands uses the letter "O" followed by a zero-padded two-digit output number (e.g., `O03` = output 3).
- Fade-to-black interval value represents the full fade-out + switch + fade-in cycle; a setting of 80 ms yields ~40 ms fade-out, switch, ~40 ms fade-in.
- Unit address `00` = stand-alone mode; addresses 01–99 used for daisy-chain configurations.
- Response format is selectable between numeric (`SPCRSN`) and verbose (`SPCRSV`).

<!-- UNRESOLVED: response payload format for numeric and verbose modes not documented -->
<!-- UNRESOLVED: no power on/off or standby commands found in source -->
<!-- UNRESOLVED: no audio-related commands documented; unclear whether audio follows video or has separate control -->
<!-- UNRESOLVED: EDID/HDCP management not covered in source -->

## Provenance

```yaml
source_domains:
  - keydigital.com
source_urls:
  - "http://keydigital.com/Control Mods Codes/KD-MSV8X8/RS-232/KD-MSV8X8_232_Commands.pdf"
  - "http://keydigital.com/Control%20Mods%20Codes/KDMSW8x4_RS232_Commands.pdf"
retrieved_at: 2026-05-04T15:19:02.622Z
last_checked_at: 2026-05-27T15:39:42.209Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-27T15:39:42.209Z
matched_actions: 18
action_count: 18
confidence: high
summary: "All 18 spec actions matched against source with correct command formats and transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
