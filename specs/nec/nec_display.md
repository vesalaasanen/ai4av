---
spec_id: admin/nec-display
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC Display Control Spec"
manufacturer: NEC
model_family: "NEC Display"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NEC Display"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-30T00:18:04.588Z
last_checked_at: 2026-06-02T22:10:11.069Z
generated_at: 2026-06-02T22:10:11.069Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "flow_control not explicitly stated; full-duplex communication mode noted"
  - "valid range not explicitly stated; gain parameter request returns upper/lower limits dynamically"
  - "no unsolicited event/notification protocol described in source"
  - "no multi-step sequences explicitly described in source"
  - "full safety interlock procedures not documented in source"
  - "specific projector models covered by this command reference not enumerated in source"
  - "default serial baud rate not stated (only supported rates listed)"
  - "flow control method not stated (full-duplex mode noted)"
  - "command timing/latency specifications not stated"
  - "maximum concurrent connection count not stated"
  - "protocol version not stated (document revision BDT140013 Rev 7.1)"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:10:11.069Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions traced to source (dip-safe re-verify). (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# NEC Display Control Spec

## Summary

NEC projector control protocol using binary commands over RS-232C serial and TCP/IP (wired LAN). Supports power on/off, input switching, picture/sound/onscreen mute, volume and picture adjustment, lens control and memory, shutter, freeze, eco mode, edge blending, PIP, and extensive status querying. Commands use a binary frame format with checksum validation.

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # supports 4800/9600/19200/38400/115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow_control not explicitly stated; full-duplex communication mode noted
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from power on/off commands
- routable  # inferred from input switching commands
- queryable  # inferred from numerous status request commands
- levelable  # inferred from volume/picture adjustment commands
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command_hex: "02 00 00 00 00 02"
  params: []
  notes: No other commands accepted while power is turning on.

- id: power_off
  label: Power Off
  kind: action
  command_hex: "02 01 00 00 00 03"
  params: []
  notes: No other commands accepted during power-off including cooling time.

- id: input_switch
  label: Input Switch
  kind: action
  command_hex: "02 03 00 00 02 01 <DATA01> <CKS>"
  params:
    - name: input_terminal
      type: enum
      values:
        - COMPUTER: "01h"
        - COMPUTER2: "02h"
        - COMPUTER3: "1Ah or 03h"
        - VIDEO: "06h"
        - S_VIDEO: "0Bh"
        - COMPONENT: "10h"
        - HDMI: "A1h or 1Ah"
        - HDMI2: "A2h or 1Bh"
        - DisplayPort: "A6h"
        - DisplayPort2: "A7h"
        - DVI_D: "9Ch"
        - HDBaseT: "BFh"
        - SDI: "C4h"
        - NETWORK: "20h"
        - VIEWER: "1Fh"
      description: Input terminal hex code

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command_hex: "02 10 00 00 00 12"
  params: []
  notes: Mute is cancelled by input switch or video signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command_hex: "02 11 00 00 00 13"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command_hex: "02 12 00 00 00 14"
  params: []
  notes: Mute is cancelled by input switch, video signal switch, or volume adjustment.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command_hex: "02 13 00 00 00 15"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command_hex: "02 14 00 00 00 16"
  params: []
  notes: Mute is cancelled by input switch or video signal switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command_hex: "02 15 00 00 00 17"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command_hex: "03 10 00 00 05 <DATA01> FF <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: target
      type: enum
      values:
        - BRIGHTNESS: "00h"
        - CONTRAST: "01h"
        - COLOR: "02h"
        - HUE: "03h"
        - SHARPNESS: "04h"
      description: Picture adjustment target
    - name: mode
      type: enum
      values:
        - ABSOLUTE: "00h"
        - RELATIVE: "01h"
      description: Absolute or relative adjustment
    - name: value
      type: integer
      description: 16-bit adjustment value (low byte, high byte)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command_hex: "03 10 00 00 05 05 00 <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: mode
      type: enum
      values:
        - ABSOLUTE: "00h"
        - RELATIVE: "01h"
      description: Absolute or relative adjustment
    - name: value
      type: integer
      description: 16-bit adjustment value (low byte, high byte)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command_hex: "03 10 00 00 05 18 00 00 <DATA01> 00 <CKS>"
  params:
    - name: aspect
      type: enum
      values:
        - AUTO: "00h"
        - WIDE_ZOOM: "01h"
        - "16:9": "02h"
        - NATIVE: "03h"
        - "4:3": "04h"
        - "15:9": "05h"
        - "16:10": "06h"
        - LETTER_BOX: "07h"
        - ZOOM: "07h or 08h"
        - FULL: "09h or 10h"
      description: Aspect ratio mode

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  command_hex: "03 10 00 00 05 96 FF <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: mode
      type: enum
      values:
        - ABSOLUTE: "00h"
        - RELATIVE: "01h"
      description: Absolute or relative adjustment
    - name: value
      type: integer
      description: 16-bit adjustment value (low byte, high byte)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command_hex: "02 0F 00 00 02 <DATA01> <DATA02> <CKS>"
  params:
    - name: key_code
      type: enum
      values:
        - POWER_ON: "02h 00h"
        - POWER_OFF: "03h 00h"
        - AUTO: "05h 00h"
        - MENU: "06h 00h"
        - UP: "07h 00h"
        - DOWN: "08h 00h"
        - RIGHT: "09h 00h"
        - LEFT: "0Ah 00h"
        - ENTER: "0Bh 00h"
        - EXIT: "0Ch 00h"
        - HELP: "0Dh 00h"
        - MAGNIFY_UP: "0Fh 00h"
        - MAGNIFY_DOWN: "10h 00h"
        - MUTE: "13h 00h"
        - PICTURE: "29h 00h"
        - COMPUTER1: "4Bh 00h"
        - COMPUTER2: "4Ch 00h"
        - VIDEO1: "4Fh 00h"
        - S_VIDEO1: "51h 00h"
        - VOLUME_UP: "84h 00h"
        - VOLUME_DOWN: "85h 00h"
        - FREEZE: "8Ah 00h"
        - ASPECT: "A3h 00h"
        - SOURCE: "D7h 00h"
        - LAMP_MODE_ECO: "EEh 00h"
      description: 16-bit key code (DATA01=low, DATA02=high)

- id: shutter_close
  label: Shutter Close
  kind: action
  command_hex: "02 16 00 00 00 18"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command_hex: "02 17 00 00 00 19"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command_hex: "02 18 00 00 02 06 <DATA02> <CKS>"
  params:
    - name: direction
      type: enum
      values:
        - STOP: "00h"
        - PLUS_1S: "01h"
        - PLUS_0_5S: "02h"
        - PLUS_0_25S: "03h"
        - PLUS_CONTINUOUS: "7Fh"
        - MINUS_CONTINUOUS: "81h"
        - MINUS_0_25S: "FDh"
        - MINUS_0_5S: "FEh"
        - MINUS_1S: "FFh"
      description: Lens drive direction and duration
  notes: Send 00h (STOP) to stop continuous drive.

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command_hex: "02 1D 00 00 04 <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: operation
      type: enum
      values:
        - STOP: "FFh"
        - ADJUST: "other"
      description: FFh to stop, otherwise adjust
    - name: mode
      type: enum
      values:
        - ABSOLUTE: "00h"
        - RELATIVE: "02h"
      description: Adjustment mode
    - name: value
      type: integer
      description: 16-bit adjustment value

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command_hex: "02 1E 00 00 01 <DATA01> <CKS>"
  params:
    - name: operation
      type: enum
      values:
        - MOVE: "00h"
        - STORE: "01h"
        - RESET: "02h"
      description: Lens memory operation

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command_hex: "02 1F 00 00 01 <DATA01> <CKS>"
  params:
    - name: operation
      type: enum
      values:
        - MOVE: "00h"
        - STORE: "01h"
        - RESET: "02h"
      description: Reference lens memory operation

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command_hex: "02 21 00 00 02 <DATA01> <DATA02> <CKS>"
  params:
    - name: option
      type: enum
      values:
        - LOAD_BY_SIGNAL: "00h"
        - FORCED_MUTE: "01h"
      description: Lens memory option
    - name: value
      type: enum
      values:
        - OFF: "00h"
        - ON: "01h"
      description: Setting value

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command_hex: "02 27 00 00 01 <DATA01> <CKS>"
  params:
    - name: profile
      type: enum
      values:
        - PROFILE_1: "00h"
        - PROFILE_2: "01h"
      description: Profile number

- id: freeze_control
  label: Freeze Control
  kind: action
  command_hex: "01 98 00 00 01 <DATA01> <CKS>"
  params:
    - name: state
      type: enum
      values:
        - ON: "01h"
        - OFF: "02h"
      description: Freeze on or off

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command_hex: "03 B1 00 00 02 07 <DATA01> <CKS>"
  params:
    - name: mode
      type: enum
      values:
        - OFF: "00h"
        - NORMAL: "00h or 01h"
        - AUTO_ECO: "01h"
        - ECO: "02h or 03h"
        - ECO1: "02h"
        - ECO2: "03h"
        - LONG_LIFE: "04h"
        - BOOST: "05h"
        - SILENT: "06h"
      description: Eco mode value

- id: projector_name_set
  label: Projector Name Set
  kind: action
  command_hex: "03 B1 00 00 12 2C <DATA01-16> 00 <CKS>"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_pbp_set
  label: PIP/Picture-by-Picture Set
  kind: action
  command_hex: "03 B1 00 00 03 C5 <DATA01> <DATA02> <CKS>"
  params:
    - name: target
      type: enum
      values:
        - MODE: "00h"
        - START_POSITION: "01h"
        - SUB_INPUT: "02h"
        - SUB_INPUT_2: "09h"
        - SUB_INPUT_3: "0Ah"
      description: PIP/PBP setting target
    - name: value
      type: integer
      description: Setting value (varies by target)

- id: edge_blending_set
  label: Edge Blending Set
  kind: action
  command_hex: "03 B1 00 00 03 DF 00 <DATA01> <CKS>"
  params:
    - name: state
      type: enum
      values:
        - OFF: "00h"
        - ON: "01h"
      description: Edge blending state

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command_hex: "03 C9 00 00 03 09 <DATA01> <DATA02> <CKS>"
  params:
    - name: input_terminal
      type: enum
      values:
        - HDMI1: "00h"
        - HDMI2: "01h"
        - DisplayPort: "02h"
        - HDBaseT: "03h"
        - USB_A: "04h"
        - USB_B: "05h"
        - ETHERNET: "03h or 04h"
      description: Audio input terminal
    - name: audio_source
      type: enum
      values:
        - SAME_TERMINAL: "00h"
        - COMPUTER: "02h"
        - BNC: "01h"
      description: Audio source selection
- id: carbon_savings_information
  label: Carbon Savings Information
  kind: query
  command_hex: "03 9A 00 00 01 <DATA01> <CKS>"
  response_hex: "23 9A <ID1> <ID2> 09 <DATA01-09> <CKS>"
  params:
    - name: type
      type: integer
      description: "0x00 = Total Carbon Savings, 0x01 = Carbon Savings during operation"
  fields:
    - path: DATA01
      label: savings_type
      type: integer
    - path: DATA02-05
      label: carbon_savings_kg
      type: integer
      description: "Carbon Savings in kilograms (max 99999 kg)"
    - path: DATA06-09
      label: carbon_savings_mg
      type: integer
      description: "Carbon Savings in milligrams (max 999999 mg)"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  command_hex: "00 88 00 00 00 88"
  response_hex: "20 88 <ID1> <ID2> 0C <DATA01-12> <CKS>"
  type: bitmask
  description: 12-byte error status bitmask. Bit=0 normal, bit=1 error.
  fields:
    - path: DATA01
      bits:
        - bit: 0
          label: cover_error
        - bit: 1
          label: temperature_error_bimetallic
        - bit: 3
          label: fan_error
        - bit: 4
          label: fan_error_alt
        - bit: 5
          label: power_error
        - bit: 6
          label: lamp_off_or_backlight_off
        - bit: 7
          label: lamp_replacement_moratorium
    - path: DATA02
      bits:
        - bit: 0
          label: lamp_usage_time_exceeded
        - bit: 1
          label: formatter_error
        - bit: 2
          label: lamp_2_off
        - bit: 7
          label: extended_status
    - path: DATA03
      bits:
        - bit: 1
          label: fpga_error
        - bit: 2
          label: temperature_error_sensor
        - bit: 3
          label: lamp_not_present
        - bit: 4
          label: lamp_data_error
        - bit: 5
          label: mirror_cover_error
        - bit: 6
          label: lamp_2_replacement_moratorium
        - bit: 7
          label: lamp_2_usage_time_exceeded
    - path: DATA04
      bits:
        - bit: 0
          label: lamp_2_not_present
        - bit: 1
          label: lamp_2_data_error
        - bit: 2
          label: temperature_error_dust
        - bit: 3
          label: foreign_matter_sensor_error
        - bit: 5
          label: ballast_communication_error
        - bit: 6
          label: iris_calibration_error
        - bit: 7
          label: lens_not_installed
    - path: DATA09
      bits:
        - bit: 0
          label: portrait_cover_side_up
        - bit: 1
          label: interlock_switch_open
        - bit: 2
          label: system_error_slave_cpu
        - bit: 3
          label: system_error_formatter

- id: running_status
  label: Running Status
  command_hex: "00 85 00 00 01 01 87"
  response_hex: "20 85 <ID1> <ID2> 10 <DATA01-16> <CKS>"
  type: composite
  fields:
    - path: DATA03
      label: power_status
      type: enum
      values:
        - STANDBY: "00h"
        - POWER_ON: "01h"
        - NOT_SUPPORTED: "FFh"
    - path: DATA04
      label: cooling_process
      type: enum
      values:
        - NOT_EXECUTED: "00h"
        - DURING_EXECUTION: "01h"
        - NOT_SUPPORTED: "FFh"
    - path: DATA05
      label: power_on_off_process
      type: enum
      values:
        - NOT_EXECUTED: "00h"
        - DURING_EXECUTION: "01h"
        - NOT_SUPPORTED: "FFh"
    - path: DATA06
      label: operation_status
      type: enum
      values:
        - STANDBY_SLEEP: "00h"
        - POWER_ON: "04h"
        - COOLING: "05h"
        - STANDBY_ERROR: "06h"
        - STANDBY_POWER_SAVING: "0Fh"
        - NETWORK_STANDBY: "10h"

- id: input_status
  label: Input Status
  command_hex: "00 85 00 00 01 02 88"
  response_hex: "20 85 <ID1> <ID2> 10 <DATA01-16> <CKS>"
  type: composite
  fields:
    - path: DATA01
      label: signal_switch_process
      type: enum
      values:
        - NOT_EXECUTED: "00h"
        - DURING_EXECUTION: "01h"
        - NOT_SUPPORTED: "FFh"
    - path: DATA03
      label: selection_signal_type_1
      type: integer
    - path: DATA04
      label: selection_signal_type_2
      type: enum
      values:
        - COMPUTER: "01h"
        - VIDEO: "02h"
        - S_VIDEO: "03h"
        - COMPONENT: "04h"
        - DVI_D: "20h"
        - HDMI: "21h"
        - DisplayPort: "22h"
        - NOT_SOURCE_INPUT: "FFh"
    - path: DATA09
      label: content_displayed
      type: enum
      values:
        - VIDEO_SIGNAL: "00h"
        - NO_SIGNAL: "01h"
        - VIEWER: "02h"
        - TEST_PATTERN: "03h"
        - LAN: "04h"
        - NOT_SUPPORTED: "FFh"

- id: mute_status
  label: Mute Status
  command_hex: "00 85 00 00 01 03 89"
  response_hex: "20 85 <ID1> <ID2> 10 <DATA01-16> <CKS>"
  type: composite
  fields:
    - path: DATA01
      label: picture_mute
      type: enum
      values: [OFF, ON]
    - path: DATA02
      label: sound_mute
      type: enum
      values: [OFF, ON]
    - path: DATA03
      label: onscreen_mute
      type: enum
      values: [OFF, ON]
    - path: DATA04
      label: forced_onscreen_mute
      type: enum
      values: [OFF, ON]

- id: model_name
  label: Model Name
  command_hex: "00 85 00 00 01 04 8A"
  response_hex: "20 85 <ID1> <ID2> 20 <DATA01-32> <CKS>"
  type: string
  description: Model name (NUL-terminated string)

- id: cover_status
  label: Cover Status
  command_hex: "00 85 00 00 01 05 8B"
  response_hex: "20 85 <ID1> <ID2> 01 <DATA01> <CKS>"
  type: enum
  values:
    - NORMAL_COVER_OPENED: "00h"
    - COVER_CLOSED: "01h"

- id: information_request
  label: Projector Information
  command_hex: "03 8A 00 00 00 8D"
  response_hex: "23 8A <ID1> <ID2> 62 <DATA01-98> <CKS>"
  type: composite
  fields:
    - path: DATA01-49
      label: projector_name
      type: string
    - path: DATA83-86
      label: lamp_usage_time_seconds
      type: integer
    - path: DATA87-90
      label: filter_usage_time_seconds
      type: integer

- id: filter_usage_information
  label: Filter Usage Information
  command_hex: "03 95 00 00 00 98"
  response_hex: "23 95 <ID1> <ID2> 08 <DATA01-08> <CKS>"
  type: composite
  fields:
    - path: DATA01-04
      label: filter_usage_time_seconds
      type: integer
    - path: DATA05-08
      label: filter_alarm_start_time_seconds
      type: integer

- id: lamp_information
  label: Lamp Information
  command_hex: "03 96 00 00 02 <DATA01> <DATA02> <CKS>"
  response_hex: "23 96 <ID1> <ID2> 06 <DATA01-06> <CKS>"
  type: composite
  params:
    - name: lamp
      type: enum
      values:
        - LAMP_1: "00h"
        - LAMP_2: "01h"
    - name: content
      type: enum
      values:
        - USAGE_TIME_SECONDS: "01h"
        - REMAINING_LIFE_PERCENT: "04h"
  fields:
    - path: DATA03-06
      label: obtained_information
      type: integer

- id: gain_parameter
  label: Gain Parameter
  command_hex: "03 05 00 00 03 <DATA01> 00 00 <CKS>"
  response_hex: "23 05 <ID1> <ID2> 10 <DATA01-16> <CKS>"
  type: composite
  params:
    - name: target
      type: enum
      values:
        - BRIGHTNESS: "00h"
        - CONTRAST: "01h"
        - COLOR: "02h"
        - HUE: "03h"
        - SHARPNESS: "04h"
        - VOLUME: "05h"
        - LAMP_ADJUST: "96h"
  fields:
    - path: DATA01
      label: status
      type: enum
      values:
        - DISPLAY_NOT_POSSIBLE: "00h"
        - ADJUSTMENT_NOT_POSSIBLE: "01h"
        - ADJUSTMENT_POSSIBLE: "02h"
        - GAIN_NOT_FOUND: "FFh"
    - path: DATA02-03
      label: upper_limit
      type: integer
    - path: DATA04-05
      label: lower_limit
      type: integer
    - path: DATA06-07
      label: default_value
      type: integer
    - path: DATA08-09
      label: current_value
      type: integer

- id: lens_control_request
  label: Lens Control Position
  command_hex: "02 1C 00 00 02 <DATA01> 00 <CKS>"
  response_hex: "22 1C <ID1> <ID2> 08 <DATA01> 00 <DATA02-07> <CKS>"
  type: composite
  fields:
    - path: DATA02-03
      label: upper_limit
      type: integer
    - path: DATA04-05
      label: lower_limit
      type: integer
    - path: DATA06-07
      label: current_value
      type: integer

- id: lens_information
  label: Lens Information
  command_hex: "02 22 00 00 01 00 25"
  response_hex: "22 22 <ID1> <ID2> 02 00 <DATA01> <CKS>"
  type: bitmask
  fields:
    - bit: 0
      label: lens_memory_operation
    - bit: 1
      label: zoom_operation
    - bit: 2
      label: focus_operation
    - bit: 3
      label: lens_shift_h_operation
    - bit: 4
      label: lens_shift_v_operation

- id: lens_memory_option
  label: Lens Memory Option
  command_hex: "02 20 00 00 01 <DATA01> <CKS>"
  response_hex: "22 20 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>"
  type: composite
  params:
    - name: option
      type: enum
      values:
        - LOAD_BY_SIGNAL: "00h"
        - FORCED_MUTE: "01h"
  fields:
    - path: DATA02
      label: setting_value
      type: enum
      values:
        - OFF: "00h"
        - ON: "01h"

- id: lens_profile
  label: Lens Profile
  command_hex: "02 28 00 00 00 2A"
  response_hex: "22 28 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>"
  type: enum
  values:
    - PROFILE_1: "00h"
    - PROFILE_2: "01h"

- id: eco_mode
  label: Eco Mode
  command_hex: "03 B0 00 00 01 07 BB"
  response_hex: "23 B0 <ID1> <ID2> 02 07 <DATA01> <CKS>"
  type: enum
  values:
    - OFF: "00h"
    - NORMAL: "00h or 01h"
    - AUTO_ECO: "01h"
    - ECO: "02h or 03h"
    - ECO1: "02h"
    - ECO2: "03h"
    - LONG_LIFE: "04h"
    - BOOST: "05h"
    - SILENT: "06h"

- id: projector_name_request
  label: Projector Name
  command_hex: "03 B0 00 00 01 2C E0"
  response_hex: "23 B0 <ID1> <ID2> 12 2C <DATA01-17> <CKS>"
  type: string
  description: Projector name (NUL-terminated)

- id: mac_address
  label: MAC Address
  command_hex: "03 B0 00 00 02 9A 00 4F"
  response_hex: "23 B0 <ID1> <ID2> 08 9A 00 <DATA01-06> <CKS>"
  type: string
  description: 6-byte MAC address

- id: serial_number
  label: Serial Number
  command_hex: "00 BF 00 00 02 01 06 C8"
  response_hex: "20 BF <ID1> <ID2> 12 01 06 <DATA01-16> <CKS>"
  type: string
  description: Serial number (NUL-terminated)

- id: basic_information
  label: Basic Information
  command_hex: "00 BF 00 00 01 02 C2"
  response_hex: "20 BF <ID1> <ID2> 10 02 <DATA01-15> <CKS>"
  type: composite
  fields:
    - path: DATA01
      label: operation_status
      type: enum
      values:
        - STANDBY_SLEEP: "00h"
        - POWER_ON: "04h"
        - COOLING: "05h"
        - STANDBY_ERROR: "06h"
        - STANDBY_POWER_SAVING: "0Fh"
        - NETWORK_STANDBY: "10h"
    - path: DATA02
      label: content_displayed
      type: enum
      values:
        - VIDEO_SIGNAL: "00h"
        - NO_SIGNAL: "01h"
        - VIEWER: "02h"
        - TEST_PATTERN: "03h"
        - LAN: "04h"
        - TEST_PATTERN_USER: "05h"
        - SIGNAL_SWITCHING: "10h"
    - path: DATA06
      label: video_mute
      type: enum
      values: [OFF, ON]
    - path: DATA07
      label: sound_mute
      type: enum
      values: [OFF, ON]
    - path: DATA08
      label: onscreen_mute
      type: enum
      values: [OFF, ON]
    - path: DATA09
      label: freeze_status
      type: enum
      values: [OFF, ON]

- id: information_string
  label: Information String
  command_hex: "00 D0 00 00 03 00 <DATA01> 01 <CKS>"
  response_hex: "20 D0 <ID1> <ID2> LEN <DATA01> 01 <DATA02> <DATA03-??> <CKS>"
  type: string
  params:
    - name: info_type
      type: enum
      values:
        - HORIZONTAL_SYNC_FREQ: "03h"
        - VERTICAL_SYNC_FREQ: "04h"
  description: Frequency information string (NUL-terminated)

- id: setting_request
  label: Setting Information
  command_hex: "00 85 00 00 01 00 86"
  response_hex: "20 85 <ID1> <ID2> 20 <DATA01-32> <CKS>"
  type: composite
  fields:
    - path: DATA01-03
      label: base_model_type
      type: integer
    - path: DATA04
      label: sound_function
      type: enum
      values:
        - NOT_AVAILABLE: "00h"
        - AVAILABLE: "01h"
    - path: DATA05
      label: profile_number
      type: enum
      values:
        - NOT_AVAILABLE: "00h"
        - CLOCK_FUNCTION: "01h"
        - SLEEP_TIMER: "02h"
        - CLOCK_AND_SLEEP: "03h"
```

## Variables
```yaml
- id: brightness
  label: Brightness
  type: integer
  writable: true
  description: Picture brightness (adjust via picture_adjust action)
  # UNRESOLVED: valid range not explicitly stated; gain parameter request returns upper/lower limits dynamically

- id: contrast
  label: Contrast
  type: integer
  writable: true
  description: Picture contrast

- id: color
  label: Color
  type: integer
  writable: true
  description: Picture color saturation

- id: hue
  label: Hue
  type: integer
  writable: true
  description: Picture hue

- id: sharpness
  label: Sharpness
  type: integer
  writable: true
  description: Picture sharpness

- id: volume
  label: Volume
  type: integer
  writable: true
  description: Sound volume level

- id: lamp_adjust
  label: Lamp/Light Level
  type: integer
  writable: true
  description: Lamp or light output level

- id: eco_mode
  label: Eco Mode
  type: enum
  writable: true
  values: [OFF, NORMAL, AUTO_ECO, ECO, ECO1, ECO2, LONG_LIFE, BOOST, SILENT]
  description: Eco/lamp mode setting

- id: edge_blending
  label: Edge Blending
  type: enum
  writable: true
  values: [OFF, ON]
  description: Edge blending mode

- id: freeze
  label: Freeze
  type: enum
  writable: true
  values: [ON, OFF]
  description: Freeze display state

- id: projector_name
  label: Projector Name
  type: string
  writable: true
  description: Network projector name (up to 16 bytes)
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification protocol described in source
# The protocol appears to be strictly request-response
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # cooling period follows; no commands accepted during cooling
interlocks:
  - description: No commands accepted during power-on or power-off (including cooling) sequence
  - description: Interlock switch open status reported in error status DATA09 bit 1
# UNRESOLVED: full safety interlock procedures not documented in source
```

## Notes

- Command protocol is binary with hex byte frames. Each command includes a checksum byte calculated as the low-order 8 bits of the sum of all preceding bytes.
- Response format uses a leading byte with bit 7 set (Axh) for error responses and (2xh/2xh) for success. Commands starting with 02h get 22h response prefix; 03h get 23h; 00h get 20h.
- Power on/off commands block all other commands during the transition period (including cooling after power-off).
- Error responses include ERR1/ERR2 byte pairs with specific error codes (see section 2.4 of source).
- Mute states (picture, sound, onscreen) are automatically cancelled by input switch or video signal change. Sound mute is also cancelled by volume adjustment.
- Lamp usage time and filter usage time are returned in seconds but updated at one-minute intervals.
- Serial baud rate supports 4800, 9600, 19200, 38400, and 115200 bps. Default is not stated.
- Some input terminal and eco mode hex values vary by model (see Appendix tables).
- Standby mode requirements for receiving power-on commands vary by model and connection type (serial vs LAN).
- The `compatible_with.models` field uses "NEC Display" as a generic placeholder; this command reference covers multiple NEC projector models (the source document references model-specific variations throughout).

<!-- UNRESOLVED: specific projector models covered by this command reference not enumerated in source -->
<!-- UNRESOLVED: default serial baud rate not stated (only supported rates listed) -->
<!-- UNRESOLVED: flow control method not stated (full-duplex mode noted) -->
<!-- UNRESOLVED: command timing/latency specifications not stated -->
<!-- UNRESOLVED: maximum concurrent connection count not stated -->
<!-- UNRESOLVED: protocol version not stated (document revision BDT140013 Rev 7.1) -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-30T00:18:04.588Z
last_checked_at: 2026-06-02T22:10:11.069Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:10:11.069Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions traced to source (dip-safe re-verify). (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "flow_control not explicitly stated; full-duplex communication mode noted"
- "valid range not explicitly stated; gain parameter request returns upper/lower limits dynamically"
- "no unsolicited event/notification protocol described in source"
- "no multi-step sequences explicitly described in source"
- "full safety interlock procedures not documented in source"
- "specific projector models covered by this command reference not enumerated in source"
- "default serial baud rate not stated (only supported rates listed)"
- "flow control method not stated (full-duplex mode noted)"
- "command timing/latency specifications not stated"
- "maximum concurrent connection count not stated"
- "protocol version not stated (document revision BDT140013 Rev 7.1)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
