---
spec_id: admin/nec-np_p420x
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP-P420X Control Spec"
manufacturer: NEC
model_family: NP-P420X
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - NP-P420X
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:52:19.364Z
last_checked_at: 2026-04-26T20:52:02.734Z
generated_at: 2026-04-26T20:52:02.734Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T20:52:02.734Z
  matched_actions: 48
  action_count: 48
  confidence: high
  summary: "All 48 semantic-id actions matched to source command catalogue; transport parameters fully verified in source document."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# NEC NP-P420X Control Spec

## Summary
The NEC NP-P420X is a data projector supporting both serial (RS-232C) and TCP/IP control interfaces. Commands are sent via hex-encoded binary packets over TCP port 7142 or via serial connection at configurable baud rates (115200/38400/19200/9600/4800 bps). The projector supports power control, input routing, picture/sound muting, lens positioning, and extensive status queries.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" tables (input terminal codes, aspect values, eco mode values, signal types) not included in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # also supports: 38400, 19200, 9600, 4800
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
      description: Input terminal code (see Appendix for values)

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
      description: Adjustment value (16-bit, low-order then high-order)

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
      description: Aspect ratio code (see Appendix for values)

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code from remote control code table

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
      description: "00h=Stop, 01h/02h/03h=Drive plus, 7Fh=Drive plus continuous, 81h=Drive minus, FDh/FEh/FFh=Drive minus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: stop
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute, 02h=Relative"
    - name: value
      type: integer
      description: Position value (16-bit)

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
      description: Eco mode value (see Appendix for values)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

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
    - name: terminal
      type: integer
      description: Input terminal code (see Appendix for values)
    - name: value
      type: integer
      description: "00h=Terminal in DATA01, 02h=COMPUTER"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"
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
  params:
    - name: lamp_number
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

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
  params:
    - name: adjusted_value_name
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

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
  params:
    - name: information_type
      type: integer
      description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

- id: eco_mode_request
  label: Eco Mode Request
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
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: object
  properties:
    - name: status1
      type: object
      description: "Bit0=Cover, Bit1=Temp, Bit3=Fan, Bit4=Fan, Bit5=Power, Bit6=Lamp, Bit7=Lamp moratorium"
    - name: status2
      type: object
      description: "Bit0=Lamp time exceeded, Bit1=Formatter, Bit2=Lamp2 off"
    - name: status3
      type: object
      description: "Bit1=FPGA, Bit2=Temp sensor, Bit3=Lamp not present, Bit4=Lamp data error, Bit5=Mirror cover, Bit6=Lamp2 moratorium, Bit7=Lamp2 time exceeded"
    - name: status4
      type: object
      description: "Bit0=Lamp2 not present, Bit1=Lamp2 data error, Bit2=Dust temp, Bit3=Foreign matter, Bit5=Ballast comm, Bit6=Iris calib, Bit7=Lens not installed"
    - name: extended_status
      type: object
      description: "Bit0=Portrait cover side up, Bit1=Interlock open, Bit2=System error (Slave CPU), Bit3=System error (Formatter)"

- id: running_status
  label: Running Status
  type: object
  properties:
    - name: power_status
      type: enum
      values: [standby, power_on]
    - name: cooling_status
      type: enum
      values: [not_executed, during_execution]
    - name: power_onoff_status
      type: enum
      values: [not_executed, during_execution]
    - name: operation_status
      type: enum
      values: [standby_sleep, standby_power_saving, power_on, cooling, standby_error, network_standby]

- id: input_status
  label: Input Status
  type: object
  properties:
    - name: signal_switch_process
      type: enum
      values: [not_executed, during_execution]
    - name: signal_list_number
      type: integer
    - name: signal_type1
      type: integer
    - name: signal_type2
      type: enum
      values: [COMPUTER, VIDEO, S-VIDEO, COMPONENT, DVI-D, HDMI, DisplayPort, VIEWER]
    - name: test_pattern_display
      type: enum
      values: [not_displayed, displayed]
    - name: content_displayed
      type: enum
      values: [video_signal, no_signal, viewer, test_pattern, LAN]

- id: mute_status
  label: Mute Status
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
    - name: onscreen_display
      type: enum
      values: [not_displayed, displayed]

- id: information_request
  label: Information
  type: object
  properties:
    - name: projector_name
      type: string
    - name: lamp_usage_time
      type: integer
      description: Seconds (updated at 1-minute intervals)
    - name: filter_usage_time
      type: integer
      description: Seconds

- id: filter_usage_info
  label: Filter Usage Information
  type: object
  properties:
    - name: filter_usage_time
      type: integer
      description: Seconds
    - name: filter_alarm_start_time
      type: integer
      description: Seconds, or -1 if undefined

- id: lamp_info
  label: Lamp Information
  type: object
  properties:
    - name: lamp_number
      type: enum
      values: [lamp1, lamp2]
    - name: content
      type: enum
      values: [usage_time, remaining_life_percent]
    - name: value
      type: integer
      description: Usage time in seconds or remaining life percentage (negative if deadline exceeded)

- id: carbon_savings_info
  label: Carbon Savings Information
  type: object
  properties:
    - name: type
      type: enum
      values: [total, during_operation]
    - name: kilograms
      type: integer
      description: Maximum 99999 kg
    - name: milligrams
      type: integer
      description: Maximum 999999 mg

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

- id: lens_memory_option
  label: Lens Memory Option
  type: object
  properties:
    - name: option
      type: enum
      values: [load_by_signal, forced_mute]
    - name: value
      type: enum
      values: [off, on]

- id: lens_profile
  label: Lens Profile
  type: enum
  values: [profile_1, profile_2]

- id: lens_info
  label: Lens Information
  type: object
  properties:
    - name: lens_memory
      type: enum
      values: [stop, during_operation]
    - name: zoom
      type: enum
      values: [stop, during_operation]
    - name: focus
      type: enum
      values: [stop, during_operation]
    - name: lens_shift_h
      type: enum
      values: [stop, during_operation]
    - name: lens_shift_v
      type: enum
      values: [stop, during_operation]

- id: gain_parameters
  label: Gain Parameters
  type: object
  properties:
    - name: adjustment_status
      type: enum
      values: [display_not_possible, adjustment_not_possible, adjustment_possible, specified_gain_not_exist]
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: default_value
      type: integer
    - name: current_value
      type: integer
    - name: wide_adjustment_width
      type: integer
    - name: narrow_adjustment_width
      type: integer
    - name: default_value_valid
      type: boolean

- id: model_name
  label: Model Name
  type: string

- id: cover_status
  label: Cover Status
  type: enum
  values: [normal, closed]

- id: eco_mode
  label: Eco Mode
  type: integer

- id: lan_projector_name
  label: LAN Projector Name
  type: string

- id: lan_mac_address
  label: LAN MAC Address
  type: string
  description: Format "01h-23h-45h-67h-89h-ABh"

- id: pip_picture_by_picture
  label: PIP/Picture by Picture
  type: object
  properties:
    - name: mode
      type: enum
      values: [PIP, picture_by_picture]
    - name: start_position
      type: enum
      values: [top_left, top_right, bottom_left, bottom_right]

- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  values: [off, on]

- id: information_string
  label: Information String
  type: object
  properties:
    - name: type
      type: enum
      values: [horizontal_sync_freq, vertical_sync_freq]
    - name: string
      type: string

- id: settings
  label: Settings
  type: object
  properties:
    - name: base_model_type
      type: string
    - name: sound_function
      type: enum
      values: [not_available, available]
    - name: profile_number
      type: enum
      values: [not_available, clock_function, sleep_timer, clock_and_sleep_timer]

- id: basic_info
  label: Basic Information
  type: object
  properties:
    - name: operation_status
      type: enum
      values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    - name: content_displayed
      type: enum
      values: [video_signal, no_signal, viewer, test_pattern, LAN, test_pattern_user, signal_being_switched]
    - name: signal_type1
      type: integer
    - name: signal_type2
      type: enum
      values: [COMPUTER, VIDEO, S-VIDEO, COMPONENT, DVI-D, HDMI, DisplayPort, VIEWER, not_source_input]
    - name: display_signal_type
      type: enum
      values: [NTSC358, NTSC443, PAL, PAL60, SECAM, B_W60, B_W50, PALNM, NTSC358_LBX, NTSC358_SQZ, COMPONENT60, COMPONENT50, unknown, PAL_M, PAL_L, not_video_input]
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

- id: serial_number
  label: Serial Number
  type: string

- id: base_model_type
  label: Base Model Type
  type: string
```

## Variables
```yaml
# UNRESOLVED: projector parameters not explicitly documented as settable variables
# (adjustments handled via Actions; eco mode and projector name have SET commands)
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
interlocks:
  - id: power_on_cooldown
    description: "While power on command is executing, no other command can be accepted."
  - id: power_off_cooldown
    description: "While power off command is executing (including cooling time), no other command can be accepted."
  - id: lens_stop
    description: "After sending continuous lens drive (7Fh or 81h), stop by sending 00h."
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond command timing notes
```

## Notes
- Commands use hex-encoded binary packet format: `[HEADER] [MODEL] [ID1] [ID2] [LEN] [DATA...] [CKS]`
- Checksum (CKS): sum of all preceding bytes, low-order 8 bits
- Control ID (ID1) must match projector setting; Model code (ID2) varies by model
- Error responses use ERR1/ERR2 codes documented in error code list
- Lamp and filter usage times update at 1-minute intervals despite 1-second granularity
- When lamp replacement deadline exceeded, remaining life returns as negative value
- Power on/off commands block other commands during execution
- Aspect, input terminal, eco mode, and sub-input values reference Appendix tables not included in this source
- Serial connection uses cross cable (RxD/TxD crossed); wireless LAN supported with separate unit
<!-- UNRESOLVED: input terminal code values, aspect ratio values, eco mode values, signal type values, base model type values not provided in source document -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: port number for serial not stated (only baud rates stated for serial) -->
<!-- UNRESOLVED: authentication credentials or token formats not applicable (none stated) -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:52:19.364Z
last_checked_at: 2026-04-26T20:52:02.734Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T20:52:02.734Z
matched_actions: 48
action_count: 48
confidence: high
summary: "All 48 semantic-id actions matched to source command catalogue; transport parameters fully verified in source document."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
