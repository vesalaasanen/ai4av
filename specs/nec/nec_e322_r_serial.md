---
spec_id: admin/nec-e322-r
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC E322-R Control Spec"
manufacturer: NEC
model_family: E322-R
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - E322-R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:17:25.749Z
generated_at: 2026-04-25T21:17:25.749Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:17:25.749Z
  matched_actions: 52
  action_count: 52
  confidence: high
  summary: "All 52 spec actions match NEC projector source; transport parameters verified; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC E322-R Control Spec

## Summary
NEC E322-R professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control. The serial interface uses RS-232C at selectable baud rates up to 115200 bps. The LAN interface uses TCP port 7142 for sending and receiving commands. Supports power control, input routing, picture/sound muting, picture adjustment, lens control, eco mode, and comprehensive status queries.

<!-- UNRESOLVED: input terminal values vary by model; some hex codes have alternatives; refer to appendix for full list -->

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
  flow_control: null
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
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 06h for VIDEO, 01h for COMPUTER, A1h for HDMI)

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
      description: "Adjustment mode: 00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order then high-order)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "Adjustment mode: 00h=Absolute value, 01h=Relative value"
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
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "Adjustment target: 96hFFh=LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "Adjustment mode: 00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code to send (see key code table)

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
      description: "Target: 06h=Periphery Focus"
    - name: direction
      type: integer
      description: "Direction: 00h=Stop, 01h/02h/03h=Drive plus 1/0.5/0.25s, 7Fh=Drive plus, 81h=Drive minus, FDh/FEh/FFh=Drive minus 0.25/0.5/1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: stop
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute value, 02h=Relative value"
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
      description: "01h=Freeze on, 02h=Freeze off"

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
      description: Input terminal hex code
    - name: value
      type: integer
      description: "00h=Terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  type: bitset
  values:
    - bit0: Cover error
      bit4: Fan error
    - bit0: Lamp usage time exceeded
      bit1: Formatter error
      bit2: Lamp 2 off
    - bit0: None (fixed 0)
      bit1: FPGA error
      bit2: Temperature error
      bit3: Lamp not present
    - bit0: Lamp 2 not present
      bit1: Lamp 2 data error
      bit2: Temperature error due to dust
      bit3: Foreign matter sensor error
      bit7: Lens not installed properly
    - bit9: Extended status (portrait cover, interlock switch, system errors)

- id: running_status
  label: Running Status Request
  type: object
  values:
    power_status: "00h=Standby, 01h=Power on"
    cooling_process: "00h=Not executed, 01h=During execution"
    power_on_off_process: "00h=Not executed, 01h=During execution"
    operation_status: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

- id: input_status
  label: Input Status Request
  type: object
  values:
    signal_switch_process: "00h=Not executed, 01h=During execution"
    signal_list_number: integer
    selection_signal_type_1: integer
    selection_signal_type_2: "01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10)"
    signal_list_type: "00h=Default, 01h=User"
    test_pattern_display: "00h=Not displayed, 01h=Displayed"
    content_displayed: "00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN"

- id: mute_status
  label: Mute Status Request
  type: object
  values:
    picture_mute: "00h=Off, 01h=On"
    sound_mute: "00h=Off, 01h=On"
    onscreen_mute: "00h=Off, 01h=On"
    forced_onscreen_mute: "00h=Off, 01h=On"
    onscreen_display: "00h=Not displayed, 01h=Displayed"

- id: model_name
  label: Model Name Request
  type: string

- id: cover_status
  label: Cover Status Request
  type: enum
  values:
    - "00h: Normal (cover opened)"
    - "01h: Cover closed"

- id: information_request
  label: Information Request
  type: object
  values:
    projector_name: string
    lamp_usage_time_seconds: integer
    filter_usage_time_seconds: integer

- id: filter_usage_information
  label: Filter Usage Information Request
  type: object
  values:
    filter_usage_time_seconds: integer
    filter_alarm_start_time_seconds: integer

- id: lamp_information
  label: Lamp Information Request 3
  type: object
  values:
    lamp_number: "00h=Lamp 1, 01h=Lamp 2"
    content: "01h=Lamp usage time, 04h=Lamp remaining life (%)"
    value: integer

- id: carbon_savings_information
  label: Carbon Savings Information Request
  type: object
  values:
    type: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    carbon_kg: integer
    carbon_mg: integer

- id: lens_control_request
  label: Lens Control Request
  type: object
  values:
    upper_limit: integer
    lower_limit: integer
    current_value: integer

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: object
  values:
    option: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    setting: "00h=OFF, 01h=ON"

- id: lens_profile_request
  label: Lens Profile Request
  type: enum
  values:
    - "00h: Profile 1"
    - "01h: Profile 2"

- id: gain_parameter_request
  label: Gain Parameter Request 3
  type: object
  values:
    adjusted_value_name: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST"
    status: "00h=Display not possible, 01h=Adjustment not possible, 02h=Adjustment possible, FFh=Specified gain does not exist"
    upper_limit: integer
    lower_limit: integer
    default_value: integer
    current_value: integer

- id: setting_request
  label: Setting Request
  type: object
  values:
    base_model_type: string
    sound_function: "00h=Not available, 01h=Available"
    profile_number: "00h=Not available, 01h=Clock function, 02h=Sleep timer function, 03h=Clock+Sleep timer"

- id: eco_mode_request
  label: Eco Mode Request
  type: integer

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: string

- id: lan_mac_address_status_request
  label: LAN MAC Address Status Request2
  type: string

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  type: object
  values:
    item: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    value: integer

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: enum
  values:
    - "00h: OFF"
    - "01h: ON"

- id: information_string_request
  label: Information String Request
  type: string

- id: base_model_type_request
  label: Base Model Type Request
  type: string

- id: serial_number_request
  label: Serial Number Request
  type: string

- id: basic_information_request
  label: Basic Information Request
  type: object
  values:
    operation_status: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"
    content_displayed: integer
    selection_signal_type_1: integer
    selection_signal_type_2: integer
    display_signal_type: integer
    video_mute: "00h=Off, 01h=On"
    sound_mute: "00h=Off, 01h=On"
    onscreen_mute: "00h=Off, 01h=On"
    freeze_status: "00h=Off, 01h=On"
```

## Variables
```yaml
# No standalone variables; all parameters are embedded in action/feedback messages
```

## Events
```yaml
# No unsolicited event messages documented; all communication is request/response
```

## Macros
```yaml
# No explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
The protocol uses a binary message format with hexadecimal encoding. Each command includes ID1 (control ID), ID2 (model code), and a checksum (CKS). Responses include ERR1/ERR2 error codes. Baud rate is selectable: 115200/38400/19200/9600/4800 bps. Power on/off commands block other commands during execution (including cooling time). Some models require specific standby modes for serial or LAN control to be effective. The appendix provides model-specific hex code variations for input terminals, aspect modes, eco modes, and signal types.
<!-- UNRESOLVED: exact baud rate must be configured to match projector settings; document does not specify a single default baud rate -->
<!-- UNRESOLVED: some input terminal hex codes vary by model (e.g., HDMI=A1h or 1Ah); consult appendix for full per-model values -->
<!-- UNRESOLVED: standby mode requirements vary by model; some models require specific standby mode for LAN vs serial control -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:17:25.749Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:17:25.749Z
matched_actions: 52
action_count: 52
confidence: high
summary: "All 52 spec actions match NEC projector source; transport parameters verified; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
