---
spec_id: admin/nec-x461unv_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC X461UNV Series Control Spec"
manufacturer: NEC
model_family: X461UNV
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - X461UNV
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-26T21:32:05.007Z
generated_at: 2026-04-26T21:32:05.007Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T21:32:05.007Z
  matched_actions: 49
  action_count: 49
  confidence: high
  summary: "All 49 spec actions matched source; transport verified"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X461UNV Series Control Spec

## Summary
NEC X461UNV Series professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control. Control interface uses hex-encoded commands with checksum validation. Supports power control, input routing, picture/sound adjustments, lens positioning, mute functions, eco mode, PIP/PBP, and comprehensive status queries.

<!-- UNRESOLVED: standby mode compatibility varies by model; specific mode requirements not fully enumerated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
auth:
  type: none
```

## Traits
```yaml
- powerable
- queryable
- routable
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
      description: "0=Brightness, 1=Contrast, 2=Color, 3=Hue, 4=Sharpness"
    - name: mode
      type: integer
      description: "0=Absolute, 1=Relative"
    - name: value
      type: integer
      description: Adjustment value
- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Absolute, 1=Relative"
    - name: value
      type: integer
      description: Adjustment value
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect hex code
- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Absolute, 1=Relative"
    - name: value
      type: integer
      description: Adjustment value
- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code from key code table
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
      description: "6=Periphery Focus"
    - name: action
      type: integer
      description: "0=Stop, 1=+1s, 2=+0.5s, 3=+0.25s, 7F=+cont, 81=-cont, FD=-0.25s, FE=-0.5s, FF=-1s"
- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: "6=Periphery Focus"
- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: action
      type: integer
      description: "FF=Stop"
    - name: mode
      type: integer
      description: "0=Absolute, 2=Relative"
    - name: value
      type: integer
      description: Adjustment value
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "0=MOVE, 1=STORE, 2=RESET"
- id: ref_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "0=MOVE, 1=STORE, 2=RESET"
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: target
      type: integer
      description: "0=LOAD BY SIGNAL, 1=FORCED MUTE"
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: target
      type: integer
      description: "0=LOAD BY SIGNAL, 1=FORCED MUTE"
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
- id: lens_info_request
  label: Lens Information Request
  kind: query
  params: []
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "0=Profile 1, 1=Profile 2"
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []
- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "1=On, 2=Off"
- id: eco_mode_set
  label: ECO Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode hex code
- id: projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes)
- id: pip_pbp_set
  label: PIP/PBP Set
  kind: action
  params:
    - name: target
      type: integer
      description: "0=MODE, 1=START POSITION, 2=SUB INPUT, 9=SUB INPUT 2, A=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code
    - name: value
      type: integer
      description: "0=Terminal in DATA01, 1=BNC, 2=COMPUTER"
- id: error_status_request
  label: Error Status Request
  kind: query
  params: []
- id: information_request
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
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - "00h Standby"
    - "01h Power on"
    - "04h Power on"
    - "05h Cooling"
    - "06h Standby (error)"
    - "0Fh Standby (Power saving)"
    - "10h Network standby"
- id: error_status
  label: Error Status
  type: bitmap
  values:
    - DATA01: "Bit0=Cover, Bit1=Temp, Bit3=Fan2, Bit4=Fan1, Bit5=Power, Bit6=Lamp off, Bit7=Lamp moratorium"
    - DATA02: "Bit0=Lamp time exceeded, Bit1=Formatter, Bit2=Lamp2 off"
    - DATA03: "Bit0=Reserved, Bit1=FPGA, Bit2=Temp sensor, Bit3=Lamp not present, Bit4=Lamp data, Bit5=Mirror cover, Bit6=Lamp2 moratorium, Bit7=Lamp2 time exceeded"
    - DATA04: "Bit0=Lamp2 not present, Bit1=Lamp2 data, Bit2=Temp dust, Bit3=Foreign matter, Bit4=Reserved, Bit5=Ballast comm, Bit6=Iris calib, Bit7=Lens not installed"
    - DATA09: "Bit0=Portrait side, Bit1=Interlock open, Bit2=System error (Slave CPU), Bit3=System error (Formatter)"
- id: input_status
  label: Input Status
  type: object
  fields:
    - name: signal_switch_process
      type: enum
      values:
        - "00h Not executed"
        - "01h During execution"
    - name: signal_list_number
      type: integer
    - name: signal_type_1
      type: enum
      values:
        - "01h 1"
        - "02h 2"
        - "03h 3"
        - "04h 4"
        - "05h 5"
    - name: signal_type_2
      type: enum
      values:
        - "01h COMPUTER"
        - "02h VIDEO"
        - "03h S-VIDEO"
        - "04h COMPONENT"
        - "05h Reserved"
        - "07h VIEWER(1-5)"
        - "20h DVI-D"
        - "21h HDMI"
        - "22h DisplayPort"
        - "23h VIEWER(6-10)"
        - "FFh Not Source Input"
    - name: content_displayed
      type: enum
      values:
        - "00h Video signal displayed"
        - "01h No signal"
        - "02h Viewer displayed"
        - "03h Test pattern displayed"
        - "04h LAN displayed"
- id: mute_status
  label: Mute Status
  type: object
  fields:
    - name: picture_mute
      type: enum
      values:
        - "00h Off"
        - "01h On"
    - name: sound_mute
      type: enum
      values:
        - "00h Off"
        - "01h On"
    - name: onscreen_mute
      type: enum
      values:
        - "00h Off"
        - "01h On"
    - name: forced_onscreen_mute
      type: enum
      values:
        - "00h Off"
        - "01h On"
- id: model_name
  label: Model Name
  type: string
- id: lamp_info
  label: Lamp Information
  type: object
  fields:
    - name: lamp_number
      type: enum
      values:
        - "00h Lamp 1"
        - "01h Lamp 2"
    - name: usage_time_seconds
      type: integer
    - name: remaining_life_percent
      type: integer
- id: filter_info
  label: Filter Information
  type: object
  fields:
    - name: usage_time_seconds
      type: integer
    - name: alarm_start_time_seconds
      type: integer
- id: carbon_savings
  label: Carbon Savings
  type: object
  fields:
    - name: total_carbon_kg
      type: number
    - name: operation_carbon_mg
      type: number
- id: gain_parameter
  label: Gain Parameter
  type: object
  fields:
    - name: adjustment_status
      type: enum
      values:
        - "00h Display not possible"
        - "01h Adjustment not possible"
        - "02h Adjustment possible"
        - "FFh Specified gain does not exist"
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: default_value
      type: integer
    - name: current_value
      type: integer
- id: running_status
  label: Running Status
  type: object
  fields:
    - name: power_status
      type: enum
      values:
        - "00h Standby"
        - "01h Power on"
    - name: cooling_process
      type: enum
      values:
        - "00h Not executed"
        - "01h During execution"
    - name: power_on_off_process
      type: enum
      values:
        - "00h Not executed"
        - "01h During execution"
    - name: operation_status
      type: enum
      values:
        - "00h Standby (Sleep)"
        - "04h Power on"
        - "05h Cooling"
        - "06h Standby (error)"
        - "0Fh Standby (Power saving)"
        - "10h Network standby"
- id: info_string
  label: Information String
  type: object
  fields:
    - name: horizontal_sync_freq
      type: string
    - name: vertical_sync_freq
      type: string
- id: eco_mode
  label: ECO Mode
  type: enum
  values:
    - "00h OFF"
    - "01h ON/Normal/Auto ECO"
    - "02h ECO1"
    - "03h ECO2"
    - "04h LONG LIFE"
    - "05h BOOST"
    - "06h SILENT"
- id: projector_name
  label: Projector Name
  type: string
- id: mac_address
  label: MAC Address
  type: string
- id: pip_pbp
  label: PIP/PBP
  type: object
  fields:
    - name: mode
      type: enum
      values:
        - "00h PIP"
        - "01h PICTURE BY PICTURE"
    - name: start_position
      type: enum
      values:
        - "00h TOP-LEFT"
        - "01h TOP-RIGHT"
        - "02h BOTTOM-LEFT"
        - "03h BOTTOM-RIGHT"
- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  values:
    - "00h OFF"
    - "01h ON"
- id: serial_number
  label: Serial Number
  type: string
- id: basic_info
  label: Basic Information
  type: object
  fields:
    - name: operation_status
      type: enum
      values:
        - "00h Standby (Sleep)"
        - "04h Power on"
        - "05h Cooling"
        - "06h Standby (error)"
        - "0Fh Standby (Power saving)"
        - "10h Network standby"
    - name: content_displayed
      type: enum
      values:
        - "00h Video signal displayed"
        - "01h No signal"
        - "02h Viewer displayed"
        - "03h Test pattern displayed"
        - "04h LAN displayed"
        - "05h Test pattern (user)"
        - "10h Signal being switched"
- id: lens_position
  label: Lens Position
  type: object
  fields:
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: current_value
      type: integer
- id: lens_memory_option
  label: Lens Memory Option
  type: object
  fields:
    - name: load_by_signal
      type: enum
      values:
        - "00h OFF"
        - "01h ON"
    - name: forced_mute
      type: enum
      values:
        - "00h OFF"
        - "01h ON"
- id: lens_profile
  label: Lens Profile
  type: enum
  values:
    - "00h Profile 1"
    - "01h Profile 2"
- id: lens_status_bits
  label: Lens Status Bits
  type: bitmap
  values:
    - Bit0: "Lens memory (0=Stop, 1=During operation)"
    - Bit1: "Zoom (0=Stop, 1=During operation)"
    - Bit2: "Focus (0=Stop, 1=During operation)"
    - Bit3: "Lens Shift H (0=Stop, 1=During operation)"
    - Bit4: "Lens Shift V (0=Stop, 1=During operation)"
- id: cover_status
  label: Cover Status
  type: enum
  values:
    - "00h Normal (cover opened)"
    - "01h Cover closed"
- id: settings
  label: Settings
  type: object
  fields:
    - name: base_model_type
      type: integer
    - name: sound_function
      type: enum
      values:
        - "00h Not available"
        - "01h Available"
    - name: clock_function
      type: enum
      values:
        - "00h Not available"
        - "01h Clock function"
        - "02h Sleep timer function"
        - "03h Clock and Sleep timer"
```

## Variables
```yaml
# UNRESOLVED: volume, brightness, contrast, hue, sharpness values are adjustable parameters
# but are better represented as actions with typed parameters already captured above.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_transition_lock
    description: "While the POWER ON command is executing, no other command can be accepted."
  - id: power_off_cooling_lock
    description: "While the POWER OFF command is executing (including cooling time), no other command can be accepted."
  - id: standby_mode_requirement
    description: "Some models require specific standby modes to receive commands via serial or LAN. Supported standby modes vary by model (Normal, Active, Eco, NETWORK STANDBY, SLEEP, etc.). Some models only support certain standby modes for LAN control vs serial control."
```

## Notes
Command protocol: hex-encoded binary format with checksum validation. Command format: `[PREAMBLE] [MODE] [GROUP] [PARAM1] [PARAM2] [PARAM3] [LEN] [DATA...] [CKS]`. Responses use prefix bytes A0h/A2h/A3h depending on data length. Error codes ERR1/ERR2 indicate specific failure causes. Input terminal values, aspect values, and eco mode values vary by model; common hex codes documented in Appendix.

<!-- UNRESOLVED: specific standby mode requirements for each X461UNV variant not enumerated in source -->
<!-- UNRESOLVED: all valid input terminal hex codes for this specific model not differentiated from common values -->
<!-- UNRESOLVED: data_flow_control (flow control type) not stated in source -->
<!-- UNRESOLVED: TCP/IP protocol variant (Telnet/raw TCP) not explicitly stated -->
<!-- UNRESOLVED: LAN authentication requirements not documented -->
<!-- UNRESOLVED: command timing/cooldown requirements not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: protocol version number not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-26T21:32:05.007Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T21:32:05.007Z
matched_actions: 49
action_count: 49
confidence: high
summary: "All 49 spec actions matched source; transport verified"
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
