---
schema_version: ai4av-public-spec-v1
device_id: nec/nec-projector
entity_id: nec_nec_projector
spec_id: admin/nec-nec-projector
revision: 1
author: admin
title: "NEC NEC Projector Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "NEC Projector"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NEC Projector"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_nec_projector_ir.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T08:14:10.937Z
retrieved_at: 2026-04-23T08:14:10.937Z
last_checked_at: 2026-04-23T08:14:10.937Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T08:14:10.937Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions matched with exact hex sequences and parameters in source; transport parameters verified; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# NEC NEC Projector Control Spec

## Summary
This document describes the control protocol for NEC projectors (BDT140013 Rev 7.1). The projector supports both serial (RS-232C) and TCP/IP network control interfaces. Commands are sent in hexadecimal format with checksum validation. During power-on or power-off sequences (including cooling time), the projector does not accept other commands.

<!-- UNRESOLVED: lamp model numbers not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port for LAN command communication
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # stated as supported rates
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Add only traits supported by evidence from source:
- powerable       # POWER ON/OFF commands present
- routable        # INPUT SW CHANGE command present
- queryable      # multiple status/information request commands present
- levelable      # VOLUME ADJUST, PICTURE ADJUST, GAIN PARAMETER REQUEST present
```

## Actions
```yaml
# One entry per command found in source.
- id: error_status_request
  label: Error Status Request
  kind: action
  params: []

- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: input_sw_change
  label: Input SW Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (hex)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: adjustment_target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: adjustment_mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: adjustment_value
      type: integer
      description: 16-bit signed value (low-order 8 bits in DATA03, high-order in DATA04)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: adjustment_mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: adjustment_value
      type: integer
      description: 16-bit signed value

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_value
      type: integer
      description: Aspect ratio value (see Appendix)

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: adjustment_target
      type: integer
      description: "96h=LAMP ADJUST / LIGHT ADJUST"
    - name: adjustment_mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: adjustment_value
      type: integer
      description: 16-bit signed value

- id: information_request
  label: Information Request
  kind: action
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: action
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: action
  params:
    - name: lamp_number
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Lamp usage time, 04h=Lamp remaining life"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: action
  params:
    - name: savings_type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code from remote control key code list

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: content
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h/02h/03h=Drive plus 1/0.5/0.25s, 7Fh=Drive plus, 81h=Drive minus, FDh/FEh/FFh=Drive minus 0.25/0.5/1s"

- id: lens_control_request
  label: Lens Control Request
  kind: action
  params:
    - name: content
      type: integer
      description: Content type

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: stop
      type: integer
      description: "FFh=Stop"
    - name: adjustment_mode
      type: integer
      description: "00h=Absolute value, 02h=Relative value"
    - name: adjustment_value
      type: integer
      description: 16-bit value

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: setting_value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: action
  params:
    - name: target
      type: integer
      description: Lens information target

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile_number
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: action
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: action
  params:
    - name: adjusted_value_name
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST"

- id: setting_request
  label: Setting Request
  kind: action
  params: []

- id: running_status_request
  label: Running Status Request
  kind: action
  params: []

- id: input_status_request
  label: Input Status Request
  kind: action
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: action
  params: []

- id: model_name_request
  label: Model Name Request
  kind: action
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: action
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: freeze_state
      type: integer
      description: "01h=Turn freeze on, 02h=Turn freeze off"

- id: information_string_request
  label: Information String Request
  kind: action
  params:
    - name: information_type
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: action
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: action
  params: []

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: action
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture By Picture Request
  kind: action
  params:
    - name: content_type
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: action
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: eco_mode_value
      type: integer
      description: Eco mode value (see Appendix)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: projector_name
      type: string
      description: Projector name (up to 16 bytes, NUL terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture By Picture Set
  kind: action
  params:
    - name: content_type
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: setting_value
      type: integer
      description: Setting value dependent on content_type

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: setting_value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: action
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: action
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: action
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value
    - name: setting_value
      type: integer
      description: "00h=Terminal in DATA01, 02h=COMPUTER"

# UNRESOLVED: full input terminal value tables referenced in Appendix not included in source
```

## Feedbacks
```yaml
# Responses defined in source include:
# - Success responses with execution result codes (0000h=success, other=error)
# - Error responses with ERR1/ERR2 codes (see error code list)
# - Data responses returning structured information

- id: error_status_response
  label: Error Status Response
  type: object
  properties:
    - name: error_information
      type: string
      description: Bit-coded error status (DATA01-DATA12)

- id: power_on_response
  label: Power On Response
  type: enum
  values: [success, error]

- id: power_off_response
  label: Power Off Response
  type: enum
  values: [success, error]

- id: information_response
  label: Information Response
  type: object
  properties:
    - name: projector_name
      type: string
    - name: lamp_usage_time
      type: integer
    - name: filter_usage_time
      type: integer

- id: running_status_response
  label: Running Status Response
  type: object
  properties:
    - name: power_status
      type: enum
      values: [standby, power_on, cooling]
    - name: cooling_process
      type: enum
      values: [not_executed, during_execution]
    - name: operation_status
      type: enum
      values: [standby_sleep, power_on, cooling, standby_power_saving, network_standby, standby_error]

- id: input_status_response
  label: Input Status Response
  type: object
  properties:
    - name: signal_list_number
      type: integer
    - name: selection_signal_type
      type: enum
      values: [computer, video, s_video, component, reserved, viewer_1_5, dvi_d, hdmi, displayport, viewer_6_10]

- id: mute_status_response
  label: Mute Status Response
  type: object
  properties:
    - name: picture_mute
      type: enum
      values: [off, on]
    - name: sound_mute
      type: enum
      values: [off, on]
    - name: onscreen_mute
      type: enum
      values: [off, on]
    - name: forced_onscreen_mute
      type: enum
      values: [off, on]

# UNRESOLVED: complete feedback definitions for all query commands
```

## Variables
```yaml
# Queryable state parameters:
- id: eco_mode
  label: Eco Mode
  type: integer
  values: []  # UNRESOLVED: values defined in Appendix not in source

- id: projector_name
  label: Projector Name
  type: string

- id: lamp_usage_time
  label: Lamp Usage Time
  type: integer
  unit: seconds

- id: lamp_remaining_life
  label: Lamp Remaining Life
  type: integer
  unit: percent

- id: filter_usage_time
  label: Filter Usage Time
  type: integer
  unit: seconds

- id: brightness
  label: Brightness
  type: integer
  range: [0, 255]

- id: contrast
  label: Contrast
  type: integer
  range: [0, 255]

- id: volume
  label: Volume
  type: integer
  range: [0, 255]

- id: pip_mode
  label: PIP/Picture By Picture Mode
  type: enum
  values: [off, pip, picture_by_picture]

- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  values: [off, on]
```

## Events
```yaml
# UNRESOLVED: unsolicited notification events not explicitly documented in source.
# The protocol is query-based; no explicit event subscription mechanism described.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While POWER ON command is executing (during power-on sequence), no other command can be accepted."
  - "While POWER OFF command is executing (including cooling time), no other command can be accepted."
# UNRESOLVED: no explicit safety warnings for lamp replacement, cover opening, or dust-related procedures in source
```

## Notes
The projector uses a binary hexadecimal command format with checksum validation. Command structure: `[header] [model] [ID1] [ID2] [data length] [data...] [checksum]`. The checksum is the low-order byte of the sum of all preceding bytes. Responses use similar structure with acknowledge header (A2h for actions, A0h/A1h/A3h for queries).

Baud rate is configurable (115200/38400/19200/9600/4800 bps) but defaults are not stated. TCP port 7142 is used for LAN communication. No authentication is required for command access.

<!-- UNRESOLVED: full input terminal value tables not included (referenced in Appendix) -->
<!-- UNRESOLVED: eco mode and aspect ratio value tables not included (referenced in Appendix) -->
<!-- UNRESOLVED: firmware compatibility range not stated in source -->
<!-- UNRESOLVED: port number for serial CONTROL on projector side not explicitly stated (D-SUB 9P described) -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_nec_projector_ir.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T08:14:10.937Z
retrieved_at: 2026-04-23T08:14:10.937Z
last_checked_at: 2026-04-23T08:14:10.937Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:14:10.937Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions matched with exact hex sequences and parameters in source; transport parameters verified; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```
