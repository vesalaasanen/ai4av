---
schema_version: ai4av-public-spec-v1
device_id: nec/x461unv-r-series
entity_id: nec_x461unv_r_series
spec_id: admin/nec-x461unv_r_series
revision: 1
author: admin
title: "NEC X461UNV-R Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "X461UNV-R Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "X461UNV-R Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_x461unv_r_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T21:32:03.587Z
retrieved_at: 2026-04-26T21:32:03.587Z
last_checked_at: 2026-04-26T21:32:03.587Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T21:32:03.587Z
  matched_actions: 50
  action_count: 50
  confidence: high
  summary: "All 50 spec actions matched source; transport verified"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X461UNV-R Series Control Spec

## Summary
NEC professional projector support RS-232C serial and wired LAN (TCP/IP) control interfaces. This spec covers power control, input routing, picture/sound mute, volume and picture adjustment, lens control, eco mode, and query commands. Communication via hex-encoded binary packets with checksum validation.

<!-- UNRESOLVED: specific model designation (X461UNV-R) not confirmed in source; manual title "Projector Control Command Reference Manual BDT140013 Rev 7.1" used for manufacturer attribution -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # also supports: 38400, 19200, 9600, 4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142  # LAN TCP port for command sending/receiving
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable     # POWER ON/OFF commands present (015, 016)
- routable      # INPUT SW CHANGE command present (018)
- queryable    # INFORMATION REQUEST, STATUS REQUEST commands present (037, 078 series, 305 series)
- levelable    # VOLUME ADJUST, PICTURE ADJUST commands present (030-1, 030-2)
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
      description: Input terminal hex code (see Appendix for valid values)

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

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=Lamp Adjust/Light Adjust"
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
      description: Key code value (see key code table for valid codes)

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
      description: "00h=Stop, 01h/02h/03h=drive plus, 7Fh=continue plus, 81h=continue minus, FDh/FEh/FFh=drive minus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: control
      type: integer
      description: "FFh=Stop"
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
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value depends on target

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
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=On, 02h=Off"

- id: error_status_request
  label: Error Status Request
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
      description: "01h=usage time, 04h=remaining life"

- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: action
  params:
    - name: type
      type: integer
      description: "00h=Total, 01h=During operation"
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
- id: information_request
  label: Information Request
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
```

## Feedbacks
```yaml
- id: error_status
  type: bitfield
  description: Error information returned as 12-byte bitfield
  bits:
    DATA01:
      0: Cover error
      1: Temperature error (bi-metallic strip)
      3: Fan error
      4: Fan error
      5: Power error
      6: Lamp off or backlight off
      7: Lamp in replacement moratorium
    DATA02:
      0: Lamp usage time exceeded
      1: Formatter error
      2: Lamp 2 off
    DATA03:
      1: FPGA error
      2: Temperature error (sensor)
      3: Lamp not present
      4: Lamp data error
      5: Mirror cover error
      6: Lamp 2 in replacement moratorium
      7: Lamp 2 usage time exceeded
    DATA04:
      0: Lamp 2 not present
      1: Lamp 2 data error
      2: Temperature error due to dust
      3: Foreign matter sensor error
      7: Lens not installed properly

- id: power_state
  type: enum
  values:
    - standby
    - power_on
    - cooling
    - network_standby
    - standby_error
    - standby_power_saving

- id: mute_status
  type: object
  fields:
    picture_mute: [off, on]
    sound_mute: [off, on]
    onscreen_mute: [off, on]
    forced_onscreen_mute: [off, on]

- id: input_status
  type: object
  fields:
    signal_switch_process: [not_executed, during_execution]
    signal_list_number: integer
    selection_signal_type_1: integer
    selection_signal_type_2: integer
    test_pattern_display: [not_displayed, displayed]
    content_displayed: [video_signal, no_signal, viewer, test_pattern, lan]

- id: projector_info
  type: object
  fields:
    projector_name: string
    lamp_usage_time_seconds: integer
    filter_usage_time_seconds: integer

- id: lamp_info
  type: object
  fields:
    lamp: [lamp_1, lamp_2]
    usage_time_seconds: integer
    remaining_life_percent: integer

- id: filter_usage
  type: object
  fields:
    usage_time_seconds: integer
    alarm_start_time_seconds: integer

- id: carbon_savings
  type: object
  fields:
    type: [total, during_operation]
    kilograms: integer
    milligrams: integer

- id: model_name
  type: string

- id: serial_number
  type: string

- id: base_model_type
  type: string

- id: eco_mode
  type: enum
  values:
    - OFF
    - Normal
    - ECO
    - AUTO_ECO
    - LONG_LIFE
    - BOOST
    - SILENT

- id: projector_name
  type: string

- id: mac_address
  type: string

- id: pip_pip_value
  type: object
  fields:
    mode: [PIP, PICTURE_BY_PICTURE]
    start_position: [TOP-LEFT, TOP-RIGHT, BOTTOM-LEFT, BOTTOM-RIGHT]
    sub_input: integer

- id: edge_blending_mode
  type: enum
  values: [OFF, ON]

- id: cover_status
  type: enum
  values:
    - Normal (cover opened)
    - Cover closed

- id: lens_position
  type: object
  fields:
    upper_limit: integer
    lower_limit: integer
    current_value: integer

- id: lens_memory_option
  type: object
  fields:
    option: [LOAD_BY_SIGNAL, FORCED_MUTE]
    value: [off, on]

- id: lens_profile
  type: enum
  values: [Profile_1, Profile_2]

- id: lens_info
  type: bitfield
  description: Lens operation status bitfield

- id: gain_parameter
  type: object
  fields:
    status: [display_not_possible, adjustment_not_possible, adjustment_possible, gain_not_exist]
    upper_limit: integer
    lower_limit: integer
    default_value: integer
    current_value: integer
    wide_adjustment_width: integer
    narrow_adjustment_width: integer
    default_value_valid: boolean

- id: basic_info
  type: object
  fields:
    operation_status: enum
    content_displayed: enum
    selection_signal_type_1: integer
    selection_signal_type_2: integer
    display_signal_type: integer
    video_mute: [off, on]
    sound_mute: [off, on]
    onscreen_mute: [off, on]
    freeze_status: [off, on]

- id: command_response
  type: enum
  values: [success, error]
  description: Generic command response indicating success or error with error codes

- id: information_string
  type: object
  fields:
    type: [horizontal_sync_frequency, vertical_sync_frequency]
    string: string
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters found in source; uses action-based adjustments
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
  - power_on_command_rejection: "While POWER ON command is executing, no other command can be accepted."
  - power_off_command_rejection: "While POWER OFF command is executing (including cooling time), no other command can be accepted."
  - lens_continue_drive_stop: "After sending continue drive command (7Fh/81h), stop by sending 00h."
# UNRESOLVED: no safety warnings or interlock procedures beyond those stated in command descriptions
```

## Notes

**Command Packet Structure:**
- Header: `20h` (read) or `02h/03h` (write) followed by command code, then ID1, ID2, data length, data bytes, checksum
- Checksum: low-order byte of sum of all preceding bytes
- Response format differs between read (20h/23h) and write (22h) commands

**Supported Baud Rates:**
The device supports auto-baud detection or manual selection: 115200, 38400, 19200, 9600, 4800 bps

**Standby Mode Requirements:**
Some models require specific standby modes to receive commands:
- Serial: Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON
- LAN: Normal, NORMAL, NETWORK STANDBY, SLEEP, HTBaseT STANDBY, OFF, ON, STANDBY POWER ON

**Error Code Reference (ERR1/ERR2):**
- `00h 00h`: Command not recognized
- `00h 01h`: Command not supported
- `01h 00h`: Invalid value
- `01h 01h`: Invalid input terminal
- `01h 02h`: Invalid language
- `02h 00h` to `03h 02h`: Memory, input, and adjustment errors (see section 2.4)

**Power Commands Timing:**
Power on/off commands block all other commands until completion. Include adequate wait time in client implementations.

<!-- UNRESOLVED: input terminal hex code mapping not fully enumerated in source; appendix lists common values but some entries show "varies" or multiple possible values -->
<!-- UNRESOLVED: ID2 model code values not enumerated in source -->
<!-- UNRESOLVED: aspect ratio hex codes include duplicate/overlapping entries (e.g., 16:9 and WIDE SCREEN both map to 02h/03h) -->
<!-- UNRESOLVED: audio select mapping incomplete for some terminal types -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_x461unv_r_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T21:32:03.587Z
retrieved_at: 2026-04-26T21:32:03.587Z
last_checked_at: 2026-04-26T21:32:03.587Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T21:32:03.587Z
matched_actions: 50
action_count: 50
confidence: high
summary: "All 50 spec actions matched source; transport verified"
```

## Known Gaps

```yaml
[]
```
