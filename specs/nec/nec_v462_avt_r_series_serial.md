---
schema_version: ai4av-public-spec-v1
device_id: nec/v462-avt-r-series
entity_id: nec_v462_avt_r_series
spec_id: admin/nec-v462_avt_r_series
revision: 1
author: admin
title: "NEC V462-AVT-R Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "V462-AVT-R Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "V462-AVT-R Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_v462_avt_r_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T21:36:04.248Z
retrieved_at: 2026-04-26T21:36:04.248Z
last_checked_at: 2026-04-26T21:36:04.248Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T21:36:04.248Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions matched source commands; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC V462-AVT-R Series Control Spec

## Summary
NEC V462-AVT-R Series projector supporting both RS-232C serial and wired LAN (TCP/IP) control. Serial communication at 115200/38400/19200/9600/4800 bps, 8N1. LAN uses TCP port 7142. Supports power control, input routing, mute functions, picture adjustment, lens control, and extensive status querying.

<!-- UNRESOLVED: wired LAN auth type not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: 115200  # stated: supports 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from command examples:
# - powerable: power on/off commands present (015, 016)
# - routable: input switching command present (018)
# - queryable: many status/info request commands present
# - levelable: volume adjust, picture adjust commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: input_sw_change
  label: Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code

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
    - name: target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect
      type: integer
      description: "00h=Auto, 01h=Wide Zoom, 02h=16:9, 03h=Native, 04h=4:3, etc."

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=Lamp/Light Adjust"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code from Remote Key Code table

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
    - name: target
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h/02h/03h=Drive plus, 7Fh=Drive plus cont, 81h=Drive minus cont, FDh/FEh/FFh=Drive minus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: Adjustment value

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

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: integer
      description: "00h=Load by Signal, 01h=Forced Mute"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=On, 02h=Off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=Normal/NORMAL, 02h/03h=ECO, 04h=Long Life, 05h=Boost, 06h=Silent"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal
    - name: source
      type: integer
      description: "00h=Same terminal, 01h=BNC, 02h=COMPUTER"
- id: error_status_request
  label: Error Status Request
  kind: query
  params: []
- id: information_request_cmd
  label: Information Request
  kind: query
  params: []
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  params: []
- id: lamp_information_request
  label: Lamp Information Request
  kind: query
  params: []
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  params: []
- id: lens_control_request
  label: Lens Control Status Request
  kind: query
  params: []
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params: []
- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []
- id: gain_parameter_request
  label: Gain Parameter Request
  kind: query
  params: []
- id: setting_request
  label: Setting Request
  kind: query
  params: []
- id: running_status_request
  label: Running Status Request
  kind: query
  params: []
- id: input_status_request
  label: Input Status Request
  kind: query
  params: []
- id: mute_status_request
  label: Mute Status Request
  kind: query
  params: []
- id: model_name_request
  label: Model Name Request
  kind: query
  params: []
- id: cover_status_request
  label: Cover Status Request
  kind: query
  params: []
- id: information_string_request
  label: Information String Request
  kind: query
  params: []
- id: eco_mode_request
  label: Eco Mode Status Request
  kind: query
  params: []
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []
- id: lan_mac_address_request
  label: LAN MAC Address Request
  kind: query
  params: []
- id: pip_picture_by_picture_request
  label: PIP/Picture-by-Picture Status Request
  kind: query
  params: []
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  params: []
- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  params: []
- id: serial_number_request
  label: Serial Number Request
  kind: query
  params: []
- id: basic_information_request
  label: Basic Information Request
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: object
  properties:
    - name: cover_error
      type: boolean
    - name: temp_error
      type: boolean
    - name: fan_error
      type: boolean
    - name: power_error
      type: boolean
    - name: lamp_off
      type: boolean
    - name: lamp_usage_exceeded
      type: boolean
    - name: formatter_error
      type: boolean

- id: input_status
  label: Input Status
  type: object
  properties:
    - name: signal_switch_process
      type: enum
      values: [not_executed, during_execution]
    - name: signal_list_number
      type: integer
    - name: signal_type_1
      type: enum
      values: [1, 2, 3, 4, 5]
    - name: signal_type_2
      type: string
    - name: content_displayed
      type: enum
      values: [video_signal, no_signal, viewer, test_pattern, lan]

- id: mute_status
  label: Mute Status
  type: object
  properties:
    - name: picture_mute
      type: enum
      values: [on, off]
    - name: sound_mute
      type: enum
      values: [on, off]
    - name: onscreen_mute
      type: enum
      values: [on, off]
    - name: forced_onscreen_mute
      type: enum
      values: [on, off]

- id: power_status
  label: Power Status
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]

- id: model_name
  label: Model Name
  type: string

- id: cover_status
  label: Cover Status
  type: enum
  values: [normal, closed]

- id: eco_mode
  label: Eco Mode
  type: enum
  values: [off, normal, eco1, eco2, auto_eco, long_life, boost, silent]

- id: projector_name
  label: Projector Name
  type: string

- id: mac_address
  label: MAC Address
  type: string

- id: pip_pbp
  label: PIP/PBP Status
  type: object

- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  values: [off, on]

- id: information_request
  label: Information
  type: object
  properties:
    - name: projector_name
      type: string
    - name: lamp_usage_time
      type: integer
      description: seconds
    - name: filter_usage_time
      type: integer
      description: seconds

- id: filter_usage_info
  label: Filter Usage Info
  type: object
  properties:
    - name: usage_time
      type: integer
      description: seconds
    - name: alarm_start_time
      type: integer
      description: seconds, -1 if undefined

- id: lamp_info
  label: Lamp Info
  type: object
  properties:
    - name: lamp
      type: enum
      values: [lamp1, lamp2]
    - name: usage_time
      type: integer
      description: seconds
    - name: remaining_life
      type: integer
      description: percentage, negative if exceeded

- id: carbon_savings
  label: Carbon Savings
  type: object
  properties:
    - name: type
      type: enum
      values: [total, operation]
    - name: kilograms
      type: integer
    - name: milligrams
      type: integer

- id: gain_parameters
  label: Gain Parameters
  type: object
  properties:
    - name: status
      type: enum
      values: [display_not_possible, adjustment_not_possible, adjustment_possible, not_exist]
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: default_value
      type: integer
    - name: current_value
      type: integer

- id: lens_position
  label: Lens Position
  type: object
  properties:
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: current_value
      type: integer

- id: lens_info
  label: Lens Info
  type: object
  properties:
    - name: lens_memory
      type: enum
      values: [stop, operating]
    - name: zoom
      type: enum
      values: [stop, operating]
    - name: focus
      type: enum
      values: [stop, operating]
    - name: lens_shift_h
      type: enum
      values: [stop, operating]
    - name: lens_shift_v
      type: enum
      values: [stop, operating]

- id: lens_memory_option
  label: Lens Memory Option
  type: object
  properties:
    - name: load_by_signal
      type: enum
      values: [off, on]
    - name: forced_mute
      type: enum
      values: [off, on]

- id: lens_profile
  label: Lens Profile
  type: enum
  values: [profile1, profile2]

- id: basic_info
  label: Basic Info
  type: object
  properties:
    - name: operation_status
      type: enum
    - name: content_displayed
      type: enum
    - name: signal_type_1
      type: integer
    - name: signal_type_2
      type: string
    - name: display_signal_type
      type: string
    - name: video_mute
      type: enum
      values: [off, on]
    - name: sound_mute
      type: enum
      values: [off, on]
    - name: onscreen_mute
      type: enum
      values: [off, on]
    - name: freeze_status
      type: enum
      values: [off, on]

- id: base_model_type
  label: Base Model Type
  type: string

- id: serial_number
  label: Serial Number
  type: string

- id: information_string
  label: Information String
  type: string
  properties:
    - name: type
      type: enum
      values: [horizontal_sync_freq, vertical_sync_freq]
    - name: value
      type: string

- id: command_response
  label: Command Response
  type: object
  properties:
    - name: err1
      type: integer
    - name: err2
      type: integer
    - name: description
      type: string
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters found in source beyond action params
```

## Events
```yaml
# UNRESOLVED: no unsolicited event definitions in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro definitions in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While power on command is executing, no other command can be accepted"
  - "While power off command is executing (including cooling time), no other command can be accepted"
# UNRESOLVED: power-on sequencing requirements not explicitly stated
```

## Notes
Serial baud rate is configurable (115200/38400/19200/9600/4800). Device uses Checksum (CKS) calculated as low-order byte of sum of preceding bytes. Commands use Control ID (ID1) and Model code (ID2) parameters. Responses include ERR1/ERR2 error codes. For input terminal values, aspect values, eco mode values, signal types, and audio select values, see the Appendix tables in the source document.

Error code combinations from source:
- 00h/00h: command not recognized
- 00h/01h: command not supported
- 01h/00h: specified value invalid
- 01h/01h: specified input terminal invalid
- 01h/02h: specified language invalid
- 02h/00h: memory allocation error
- 02h/02h: memory in use
- 02h/03h: specified value cannot be set
- 02h/04h: forced onscreen mute on
- 02h/06h: viewer error
- 02h/07h: no signal
- 02h/08h: test pattern or filter displayed
- 02h/09h: no PC card inserted
- 02h/0Ah: memory operation error
- 02h/0Ch: entry list displayed
- 02h/0Dh: command cannot be accepted because power is off
- 02h/0Eh: command execution failed
- 02h/0Fh: no authority for operation
- 03h/00h: incorrect gain number
- 03h/01h: specified gain invalid
- 03h/02h: adjustment failed

<!-- UNRESOLVED: wired LAN authentication mechanism not stated -->
<!-- UNRESOLVED: standby mode configuration required for command reception not detailed for all models -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_v462_avt_r_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T21:36:04.248Z
retrieved_at: 2026-04-26T21:36:04.248Z
last_checked_at: 2026-04-26T21:36:04.248Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T21:36:04.248Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions matched source commands; transport verified."
```

## Known Gaps

```yaml
[]
```
