---
spec_id: admin/nec-p552-avt-r-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC P552-AVT-R Series Control Spec"
manufacturer: NEC
model_family: "P552-AVT-R Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "P552-AVT-R Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:53:03.355Z
last_checked_at: 2026-05-14T18:17:18.927Z
generated_at: 2026-05-14T18:17:18.927Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "product firmware version not stated in source"
  - "no discrete settable parameters found beyond action commands"
  - "no unsolicited event notifications described in source"
  - "no multi-step macro sequences described in source"
  - "baud rate default not stated in source"
  - "standby mode compatibility matrix not fully specified"
  - "HDBaseT standby mode support varies by model"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:18.927Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 52 spec actions matched literal source commands; shapes, parameters, and transport parameters verified; command catalogue comprehensively represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC P552-AVT-R Series Control Spec

## Summary
Professional laser projector supporting both RS-232C serial and wired LAN (TCP) control. Supports power control, input routing, picture/sound mute, lens adjustment, and comprehensive query commands. No authentication required.

<!-- UNRESOLVED: product firmware version not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142
auth:
  type: none
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
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
      description: "00h=brightness, 01h=contrast, 02h=color, 03h=hue, 04h=sharpness"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Remote control key code

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
      description: "06h=periphery focus"
    - name: direction
      type: integer
      description: "00h=stop, 01h/02h/03h=plus drive, 7Fh=plus, 81h=minus, FDh/FEh/FFh=minus drive"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: ref_lens_memory_control
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
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
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

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode hex code

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

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=ON, 02h=OFF"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code
    - name: value
      type: integer
      description: "00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  type: object
  fields:
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
    - name: lamp_time_exceeded
      type: boolean
    - name: lamp2_off
      type: boolean
    - name: fpga_error
      type: boolean
    - name: mirror_cover_error
      type: boolean

- id: running_status
  label: Running Status Request
  type: object
  fields:
    - name: power_status
      type: enum
      values:
        - standby
        - power_on
    - name: cooling
      type: enum
      values:
        - not_executed
        - executing
    - name: power_process
      type: enum
      values:
        - not_executed
        - executing
    - name: operation_status
      type: enum
      values:
        - standby_sleep
        - standby_power_saving
        - power_on
        - cooling
        - standby_error
        - network_standby

- id: input_status
  label: Input Status Request
  type: object
  fields:
    - name: signal_switch_process
      type: enum
      values:
        - not_executed
        - executing
    - name: signal_list_number
      type: integer
    - name: signal_type_1
      type: integer
    - name: signal_type_2
      type: enum
      values:
        - computer
        - video
        - s_video
        - component
        - dvi_d
        - hdmi
        - displayport
        - viewer
    - name: content_displayed
      type: enum
      values:
        - video_signal
        - no_signal
        - viewer
        - test_pattern
        - lan_displayed

- id: mute_status
  label: Mute Status Request
  type: object
  fields:
    - name: picture_mute
      type: boolean
    - name: sound_mute
      type: boolean
    - name: onscreen_mute
      type: boolean
    - name: forced_onscreen_mute
      type: boolean
    - name: onscreen_display
      type: boolean

- id: model_name
  label: Model Name Request
  type: string

- id: cover_status
  label: Cover Status Request
  type: enum
  values:
    - normal
    - closed

- id: information_request
  label: Information Request
  type: object
  fields:
    - name: projector_name
      type: string
    - name: lamp_usage_time
      type: integer
      description: seconds
    - name: filter_usage_time
      type: integer
      description: seconds

- id: filter_usage_info
  label: Filter Usage Information Request
  type: object
  fields:
    - name: usage_time
      type: integer
      description: seconds
    - name: alarm_start_time
      type: integer
      description: seconds

- id: lamp_info_3
  label: Lamp Information Request 3
  type: object
  fields:
    - name: lamp
      type: integer
      description: "0=lamp1, 1=lamp2"
    - name: content
      type: integer
      description: "01h=usage time, 04h=remaining life"
    - name: value
      type: integer

- id: carbon_savings
  label: Carbon Savings Information Request
  type: object
  fields:
    - name: type
      type: integer
      description: "00h=total, 01h=during operation"
    - name: kilograms
      type: number
    - name: milligrams
      type: number

- id: lens_control_request
  label: Lens Control Request
  type: object
  fields:
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: current_value
      type: integer

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: object
  fields:
    - name: option
      type: integer
    - name: value
      type: integer

- id: lens_profile_request
  label: Lens Profile Request
  type: object
  fields:
    - name: profile
      type: integer
    - name: reserved
      type: integer

- id: gain_parameter_3
  label: Gain Parameter Request 3
  type: object
  fields:
    - name: status
      type: enum
      values:
        - not_possible
        - not_adjustable
        - adjustable
        - not_exist
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: default_value
      type: integer
    - name: current_value
      type: integer

- id: eco_mode_request
  label: Eco Mode Request
  type: integer

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: string

- id: lan_mac_address
  label: LAN MAC Address Status Request 2
  type: string

- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  type: object
  fields:
    - name: target
      type: integer
    - name: value
      type: integer

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: integer

- id: setting_request
  label: Setting Request
  type: object
  fields:
    - name: base_model_type
      type: string
    - name: sound_function
      type: boolean
    - name: clock_function
      type: integer

- id: basic_information
  label: Basic Information Request
  type: object
  fields:
    - name: operation_status
      type: enum
    - name: content_displayed
      type: enum
    - name: signal_type_1
      type: integer
    - name: signal_type_2
      type: integer
    - name: display_signal_type
      type: integer
    - name: video_mute
      type: boolean
    - name: sound_mute
      type: boolean
    - name: onscreen_mute
      type: boolean
    - name: freeze_status
      type: boolean

- id: information_string
  label: Information String Request
  type: object
  fields:
    - name: type
      type: integer
      description: "03h=horizontal sync freq, 04h=vertical sync freq"
    - name: string
      type: string

- id: serial_number
  label: Serial Number Request
  type: string

- id: base_model_type
  label: Base Model Type Request
  type: string
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters found beyond action commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Baud rate is configurable (115200/38400/19200/9600/4800 bps) but default is not stated in source. Projector requires specific standby modes to receive commands: Normal, Active, Eco, NETWORK STANDBY, SLEEP, STANDBY POWER ON — mode support varies by model. Serial connection uses full duplex RS-232C. LAN uses TCP port 7142. Some commands (power on/off) block acceptance of other commands while executing.
<!-- UNRESOLVED: baud rate default not stated in source -->
<!-- UNRESOLVED: standby mode compatibility matrix not fully specified -->
<!-- UNRESOLVED: HDBaseT standby mode support varies by model -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:53:03.355Z
last_checked_at: 2026-05-14T18:17:18.927Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:18.927Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 52 spec actions matched literal source commands; shapes, parameters, and transport parameters verified; command catalogue comprehensively represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "product firmware version not stated in source"
- "no discrete settable parameters found beyond action commands"
- "no unsolicited event notifications described in source"
- "no multi-step macro sequences described in source"
- "baud rate default not stated in source"
- "standby mode compatibility matrix not fully specified"
- "HDBaseT standby mode support varies by model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
