---
spec_id: admin/nec-x431bt-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC X431BT Series Control Spec"
manufacturer: NEC
model_family: "X431BT Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "X431BT Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-26T20:32:23.523Z
generated_at: 2026-04-26T20:32:23.523Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T20:32:23.523Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions verified against source; transport parameters confirmed verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X431BT Series Control Spec

## Summary
NEC X431BT Series projector supporting both RS-232C serial and wired LAN (TCP/IP) control. The projector uses a binary command protocol with checksum validation, control ID, and model code parameters. Serial supports multiple baud rates (115200/38400/19200/9600/4800 bps) with 8N1 configuration. LAN uses TCP port 7142 with no authentication required.

<!-- UNRESOLVED: specific model variants within X431BT series not distinguished in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: HDBaseT standby mode only mentioned for some models -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # also supports 38400/19200/9600/4800 bps (selectable)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142  # TCP port for LAN control
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # POWER ON (015), POWER OFF (016)
- routable        # INPUT SW CHANGE (018)
- queryable       # 037, 037-3, 037-4, 037-6, 078-1 through 078-6, 305-1, 305-2, 305-3
- levelable       # PICTURE ADJUST (030-1), VOLUME ADJUST (030-2)
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
      description: Input terminal hex code (e.g., 01h=COMPUTER, 06h=VIDEO, A1h=HDMI, 20h=LAN)

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
      description: Adjustment value (16-bit, low-order then high-order)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=Lamp/Light adjust"
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
      description: Key code from key code table (e.g., 02h=POWER ON, 03h=POWER OFF, 05h=AUTO)

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
      description: "00h=Stop, 01h/02h/03h=Plus drive, 7Fh=Continuous plus, 81h=Continuous minus, FDh/FEh/FFh=Minus drive"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: control
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
      description: Eco mode hex code

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
    - name: item
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
    - name: value
      type: integer
      description: "00h=Terminal in DATA01, 02h=COMPUTER, 01h=BNC"
- id: lens_information_request
  label: Lens Information Request (053-7)
  kind: query
  params: []
  description: "Returns lens status bits: lens memory, zoom, focus, lens shift H/V - bit 0=1 means during operation"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  type: object
  properties:
    - name: data01
      type: object
      description: Error status 1 (bitmask: Bit0=Cover, Bit1=Temperature, Bit3/Fan4=Fan, Bit5=Power, Bit6=Lamp off, Bit7=Lamp moratorium)
    - name: data02
      type: object
      description: Error status 2 (bitmask: Bit0=Lamp time exceeded, Bit1=Formatter, Bit2=Lamp2 off, Bit7=Extended status)
    - name: data03
      type: object
      description: Error status 3 (bitmask: Bit1=FPGA, Bit2=Temp sensor, Bit3=Lamp not present, Bit4=Lamp data error, Bit5=Mirror cover, Bit6=Lamp2 moratorium, Bit7=Lamp2 time exceeded)
    - name: data04
      type: object
      description: Error status 4 (bitmask: Bit0=Lamp2 not present, Bit1=Lamp2 data error, Bit2=Dust temp, Bit3=Foreign matter, Bit5=Ballast comm, Bit6=Iris calibration, Bit7=Lens not installed)
    - name: data09
      type: object
      description: Extended status (bitmask: Bit0=Portrait cover up, Bit1=Interlock open, Bit2=System error slave CPU, Bit3=System error formatter)

- id: running_status
  label: Running Status Request
  type: object
  properties:
    - name: power_status
      type: enum
      values: [standby, power_on]
    - name: cooling_status
      type: enum
      values: [not_executed, during_execution]
    - name: power_process
      type: enum
      values: [not_executed, during_execution]
    - name: operation_status
      type: enum
      values: [standby_sleep, standby_power_saving, power_on, cooling, standby_error, network_standby]

- id: input_status
  label: Input Status Request
  type: object
  properties:
    - name: signal_process
      type: enum
      values: [not_executed, during_execution]
    - name: signal_list_number
      type: integer
    - name: signal_type_1
      type: integer
    - name: signal_type_2
      type: integer
    - name: content_displayed
      type: enum
      values: [video_signal, no_signal, viewer, test_pattern, lan_displayed]

- id: mute_status
  label: Mute Status Request
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

- id: model_name
  label: Model Name Request
  type: string

- id: cover_status
  label: Cover Status Request
  type: enum
  values: [normal, closed]

- id: information_request
  label: Information Request
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
  label: Filter Usage Information Request
  type: object
  properties:
    - name: filter_usage_time
      type: integer
      description: Seconds
    - name: filter_alarm_start_time
      type: integer
      description: Seconds (-1 if undefined)

- id: lamp_info
  label: Lamp Information Request 3
  type: object
  properties:
    - name: lamp
      type: enum
      values: [lamp_1, lamp_2]
    - name: content
      type: enum
      values: [usage_time, remaining_life]
    - name: value
      type: integer
      description: Seconds for usage time, percentage for remaining life

- id: carbon_savings_info
  label: Carbon Savings Information Request
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

- id: lens_control_request
  label: Lens Control Request
  type: object
  properties:
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: current_value
      type: integer

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: object
  properties:
    - name: option
      type: enum
      values: [load_by_signal, forced_mute]
    - name: value
      type: enum
      values: [off, on]

- id: lens_profile_request
  label: Lens Profile Request
  type: enum
  values: [profile_1, profile_2]

- id: gain_parameter_request
  label: Gain Parameter Request 3
  type: object
  properties:
    - name: status
      type: enum
      values: [display_not_possible, adjustment_not_possible, adjustment_possible, gain_not_exist]
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

- id: lan_mac_address_request
  label: LAN MAC Address Request 2
  type: string
  description: MAC address (e.g., "01h-23h-45h-67h-89h-ABh")

- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  type: object
  properties:
    - name: item
      type: enum
      values: [mode, start_position, sub_input, sub_input_2, sub_input_3]
    - name: value
      type: integer

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: enum
  values: [off, on]

- id: setting_request
  label: Setting Request
  type: object
  properties:
    - name: base_model_type
      type: string
    - name: sound_function
      type: enum
      values: [not_available, available]
    - name: clock_function
      type: enum
      values: [not_available, clock, sleep_timer, clock_and_sleep_timer]

- id: information_string_request
  label: Information String Request
  type: object
  properties:
    - name: type
      type: enum
      values: [horizontal_sync_freq, vertical_sync_freq]
    - name: string
      type: string

- id: base_model_type_request
  label: Base Model Type Request
  type: object
  properties:
    - name: base_model_type
      type: string
    - name: model_name
      type: string

- id: serial_number_request
  label: Serial Number Request
  type: string

- id: basic_info_request
  label: Basic Information Request
  type: object
  properties:
    - name: operation_status
      type: enum
      values: [standby_sleep, standby_error, power_on, cooling, standby_power_saving, network_standby]
    - name: content_displayed
      type: enum
      values: [video_signal, no_signal, viewer, test_pattern, lan_displayed, test_pattern_user, signal_switching]
    - name: signal_type_1
      type: integer
    - name: signal_type_2
      type: integer
    - name: display_signal_type
      type: integer
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
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond action commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: While POWER ON command is executing, no other command can be accepted
  - description: While POWER OFF command is executing (including cooling time), no other command can be accepted
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond command timing notes
```

## Notes
The protocol uses a binary command format with checksum validation. Command structure: `[Header] [Model Code] [ID1] [ID2] [Length] [Data...] [Checksum]`. Responses follow similar structure with response header byte (A0h for queries, A2h/A3h for actions).

Supported baud rates are selectable on the device (115200/38400/19200/9600/4800 bps). Default is typically 9600 but varies by model configuration.

Some models require specific standby modes to receive commands via serial or LAN. Supported standby modes vary by model. HDBaseT standby mode exists but is not universally supported.

<!-- UNRESOLVED: standby mode requirements for specific X431BT models not stated -->
<!-- UNRESOLVED: input terminal values vary by model (documented in appendix as common values) -->
<!-- UNRESOLVED: aspect values vary by model (documented in appendix as common values) -->
<!-- UNRESOLVED: eco mode values vary by model (documented in appendix as common values) -->
<!-- UNRESOLVED: selection signal type values vary by model (documented in appendix as common values) -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-26T20:32:23.523Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T20:32:23.523Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions verified against source; transport parameters confirmed verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
