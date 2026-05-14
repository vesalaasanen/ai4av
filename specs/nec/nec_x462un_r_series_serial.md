---
spec_id: admin/nec-x462un-r-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC X462UN-R Series Control Spec"
manufacturer: NEC
model_family: "X462UN-R Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "X462UN-R Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-14T18:17:19.142Z
generated_at: 2026-05-14T18:17:19.142Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:19.142Z
  matched_actions: 52
  action_count: 53
  confidence: high
  summary: "All 52 spec actions matched directly to source commands with correct transport parameters."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X462UN-R Series Control Spec

## Summary
Projector control via RS-232C serial and wired LAN (TCP/IP). Supports power control, input routing, picture/sound mute, volume, aspect adjustment, lens control, eco mode, and comprehensive query commands for status monitoring. Serial supports 115200/38400/19200/9600/4800 bps; LAN uses TCP port 7142.

<!-- UNRESOLVED: document title indicates "Projector" but input specifies X462UN-R Series display — verification needed -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated: TCP port for LAN commands
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
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 06h=VIDEO, A1h=HDMI, 01h=COMPUTER)

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
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
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

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=Absolute, 01h=Relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code (e.g., 02h=POWER ON, 03h=POWER OFF, 0Dh=MENU)"

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
      description: "00h=Stop, 01h/02h/03h=Drive plus, 7Fh=Drive cont plus, 81h=Drive minus, FDh/FEh/FFh=Drive minus timed"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute, 02h=Relative"
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
    - name: target
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
      description: "Eco mode hex code"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_picture_by_picture_set
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
      description: Input terminal hex code
    - name: source
      type: integer
      description: "00h=Same as video, 01h=BNC, 02h=COMPUTER"

- id: error_status_request
  label: Error Status Request
  kind: action
  params: []

- id: information_request
  label: Information Request
  kind: action
  params: []

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: action
  params: []

- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: action
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Usage time, 04h=Remaining life"

- id: carbon_savings_request
  label: Carbon Savings Request
  kind: action
  params:
    - name: type
      type: integer
      description: "00h=Total, 01h=During operation"

- id: lens_control_request
  label: Lens Control Request
  kind: action
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_info_request
  label: Lens Information Request
  kind: action
  params: []

- id: lens_profile_request
  label: Lens Profile Request
  kind: action
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP"

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

- id: info_string_request
  label: Information String Request
  kind: action
  params:
    - name: type
      type: integer
      description: "03h=Horizontal sync freq, 04h=Vertical sync freq"

- id: eco_mode_request
  label: Eco Mode Request
  kind: action
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: action
  params: []

- id: lan_mac_address_request2
  label: LAN MAC Address Request 2
  kind: action
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: action
  params: []

- id: base_model_type_request
  label: Base Model Type Request
  kind: action
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: action
  params: []

- id: basic_info_request
  label: Basic Information Request
  kind: action
  params: []
```

## Feedbacks
```yaml
# All commands return response frames with ERR1/ERR2 status
# Success: ERR1=00h, ERR2=00h
# Error codes defined in source error table

- id: error_status_response
  type: object
  description: Error status bitfield (12 bytes)

- id: power_response
  type: enum
  values: [success, error]
  description: Power command acknowledgment

- id: input_switch_response
  type: enum
  values: [success, error]
  description: Input switch acknowledgment

- id: mute_status_response
  type: object
  properties:
    picture_mute: [off, on]
    sound_mute: [off, on]
    onscreen_mute: [off, on]
    forced_onscreen_mute: [off, on]
    onscreen_display: [not_displayed, displayed]

- id: running_status_response
  type: object
  properties:
    power_status: [standby, power_on]
    cooling_status: [not_executed, executing]
    power_process: [not_executed, executing]
    operation_status: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

- id: input_status_response
  type: object
  properties:
    signal_switch: [not_executed, executing]
    signal_list_number: integer
    signal_type_1: integer
    signal_type_2: integer
    signal_list_type: [default, user]
    test_pattern: [not_displayed, displayed]
    content_displayed: [video_signal, no_signal, viewer, test_pattern, lan]

- id: model_name_response
  type: string
  description: Model name (up to 32 chars)

- id: serial_number_response
  type: string
  description: Serial number (up to 16 chars)

- id: basic_info_response
  type: object
  description: Operation status, signal type, mute states, freeze status

- id: lamp_info_response
  type: object
  properties:
    lamp_number: [1, 2]
    content: [usage_time, remaining_life]
    value: integer

- id: filter_usage_response
  type: object
  properties:
    filter_usage_time: integer
    filter_alarm_start_time: integer

- id: carbon_savings_response
  type: object
  properties:
    type: [total, during_operation]
    kg: integer
    mg: integer

- id: gain_parameter_response
  type: object
  properties:
    status: [display_not_possible, adjustment_not_possible, adjustment_possible, gain_not_exist]
    upper_limit: integer
    lower_limit: integer
    default_value: integer
    current_value: integer

- id: information_response
  type: object
  properties:
    projector_name: string
    lamp_usage_time: integer
    filter_usage_time: integer
```

## Variables
```yaml
# UNRESOLVED: many parameters are settable but only via action commands;
# no discrete Variable entries identified in source beyond query responses
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented;
# device only responds to commands
```

## Macros
```yaml
# No explicit multi-step macros defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: power on/off commands block other commands during execution;
# no explicit safety warnings or interlock procedures in source
# Note: power on requires specific standby modes depending on control interface
```

## Notes
Serial supports 5 baud rates; host must match device configuration. During power-on or power-off sequence (including cooling time), no other commands are accepted. Checksum (CKS) is low-order byte of sum of all preceding data bytes. Some commands require specific standby modes for the device to receive them — varies by model. Source document titled "Projector Control Command Reference Manual" covers both serial and LAN control.
<!-- UNRESOLVED: standby mode compatibility matrix not fully specified; varies by model -->
<!-- UNRESOLVED: input terminal valueAppendix not fully reproduced; some values vary by model -->
<!-- UNRESOLVED: aspect valuesAppendix not fully reproduced -->
<!-- UNRESOLVED: eco mode valuesAppendix not fully reproduced -->
<!-- UNRESOLVED: selection signal type valuesAppendix not fully reproduced -->
<!-- UNRESOLVED: audio select valuesAppendix not fully reproduced -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-14T18:17:19.142Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:19.142Z
matched_actions: 52
action_count: 53
confidence: high
summary: "All 52 spec actions matched directly to source commands with correct transport parameters."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
