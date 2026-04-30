---
schema_version: ai4av-public-spec-v1
device_id: nec/np-ph1002hl-series
entity_id: nec_np_ph1002hl_series
spec_id: admin/nec-np-ph1002hl-series
revision: 1
author: admin
title: "NEC NP-PH1002HL Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "NP-PH1002HL Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NP-PH1002HL Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_np_ph1002hl_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:21:20.577Z
retrieved_at: 2026-04-25T21:21:20.577Z
last_checked_at: 2026-04-25T21:21:20.577Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:21:20.577Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions (28 control + 25 feedback) matched literally in NEC PH1002HL serial source; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# NEC NP-PH1002HL Series Control Spec

## Summary
The NEC NP-PH1002HL Series is a professional projector controllable via RS-232C serial or wired LAN (TCP). The protocol uses binary (hexadecimal byte) framing with a checksum. This spec covers power control, input switching, picture/volume adjustment, lens control, mute functions, shutter, freeze, edge blending, PIP/PbP, and various status queries.

<!-- UNRESOLVED: NP-PH1002HL Series is not listed in the supplementary tables for input terminal codes, aspect values, or eco mode values. The exact hex parameter values for those commands are model-specific and not documented for this model in the source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: not stated, but RTS/CTS pins present on connector
  connector: "D-SUB 9P (PC CONTROL port)"
  pinout:
    2: RxD
    3: TxD
    5: GND
    7: RTS
    8: CTS
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # power on/off commands present
- routable     # input switching commands present
- queryable    # multiple status request commands present
- levelable    # volume, brightness, contrast, etc. adjust commands present
- mutable      # picture mute, sound mute, onscreen mute commands present
```

## Actions
```yaml
- id: power_on
  label: "Power On (015)"
  kind: action
  params: []
  command_hex: "02 00 00 00 00 02"
  notes: No other commands accepted while power is turning on.

- id: power_off
  label: "Power Off (016)"
  kind: action
  params: []
  command_hex: "02 01 00 00 00 03"
  notes: No other commands accepted during power-off including cooling time.

- id: input_switch
  label: "Input Switch (018)"
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal hex code (model-specific). See supplementary tables."
      # UNRESOLVED: NP-PH1002HL Series not listed in input terminal code table
  command_hex: "02 03 00 00 02 01 <DATA01> <CKS>"
  response_success_data01:
    "00h": "Ended successfully"
    "FFh": "Ended with error (no signal switch)"

- id: picture_mute_on
  label: "Picture Mute On (020)"
  kind: action
  params: []
  command_hex: "02 10 00 00 00 12"
  notes: Automatically turned off on input terminal switch or video signal switch.

- id: picture_mute_off
  label: "Picture Mute Off (021)"
  kind: action
  params: []
  command_hex: "02 11 00 00 00 13"

- id: sound_mute_on
  label: "Sound Mute On (022)"
  kind: action
  params: []
  command_hex: "02 12 00 00 00 14"
  notes: Automatically turned off on input switch, video signal switch, or volume adjust.

- id: sound_mute_off
  label: "Sound Mute Off (023)"
  kind: action
  params: []
  command_hex: "02 13 00 00 00 15"

- id: onscreen_mute_on
  label: "Onscreen Mute On (024)"
  kind: action
  params: []
  command_hex: "02 14 00 00 00 16"
  notes: Automatically turned off on input terminal switch or video signal switch.

- id: onscreen_mute_off
  label: "Onscreen Mute Off (025)"
  kind: action
  params: []
  command_hex: "02 15 00 00 00 17"

- id: picture_adjust
  label: "Picture Adjust (030-1)"
  kind: action
  params:
    - name: target
      type: enum
      values:
        - { value: "00h", label: Brightness }
        - { value: "01h", label: Contrast }
        - { value: "02h", label: Color }
        - { value: "03h", label: Hue }
        - { value: "04h", label: Sharpness }
    - name: mode
      type: enum
      values:
        - { value: "00h", label: "Absolute value" }
        - { value: "01h", label: "Relative value" }
    - name: value
      type: integer
      description: "16-bit adjustment value (low byte, high byte)"
  command_hex: "03 10 00 00 05 <DATA01> FF <DATA02> <DATA03> <DATA04> <CKS>"

- id: volume_adjust
  label: "Volume Adjust (030-2)"
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - { value: "00h", label: "Absolute value" }
        - { value: "01h", label: "Relative value" }
    - name: value
      type: integer
      description: "16-bit adjustment value (low byte, high byte)"
  command_hex: "03 10 00 00 05 05 00 <DATA01> <DATA02> <DATA03> <CKS>"

- id: aspect_adjust
  label: "Aspect Adjust (030-12)"
  kind: action
  params:
    - name: aspect
      type: integer
      description: "Aspect value (model-specific hex code). See supplementary tables."
      # UNRESOLVED: NP-PH1002HL Series not listed in aspect value table
  command_hex: "03 10 00 00 05 18 00 00 <DATA01> 00 <CKS>"

- id: lamp_adjust
  label: "Lamp/Light Adjust (030-15)"
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - { value: "00h", label: "Absolute value" }
        - { value: "01h", label: "Relative value" }
    - name: value
      type: integer
      description: "16-bit adjustment value (low byte, high byte)"
  command_hex: "03 10 00 00 05 96 FF <DATA03> <DATA04> <DATA05> <CKS>"

- id: remote_key_code
  label: "Remote Key Code (050)"
  kind: action
  params:
    - name: key_code
      type: integer
      description: "16-bit key code (WORD type, low byte, high byte)"
  command_hex: "02 0F 00 00 02 <DATA01> <DATA02> <CKS>"
  key_codes:
    - { code: "0200h", label: POWER ON }
    - { code: "0300h", label: POWER OFF }
    - { code: "0500h", label: AUTO }
    - { code: "0600h", label: MENU }
    - { code: "0700h", label: UP }
    - { code: "0800h", label: DOWN }
    - { code: "0900h", label: RIGHT }
    - { code: "0A00h", label: LEFT }
    - { code: "0B00h", label: ENTER }
    - { code: "0C00h", label: EXIT }
    - { code: "0D00h", label: HELP }
    - { code: "0F00h", label: MAGNIFY UP }
    - { code: "1000h", label: MAGNIFY DOWN }
    - { code: "1300h", label: MUTE }
    - { code: "2900h", label: PICTURE }
    - { code: "4B00h", label: COMPUTER1 }
    - { code: "4C00h", label: COMPUTER2 }
    - { code: "4F00h", label: VIDEO1 }
    - { code: "5100h", label: S-VIDEO1 }
    - { code: "8400h", label: VOLUME UP }
    - { code: "8500h", label: VOLUME DOWN }
    - { code: "8A00h", label: FREEZE }
    - { code: "A300h", label: ASPECT }
    - { code: "D700h", label: SOURCE }
    - { code: "EE00h", label: "LAMP MODE/ECO" }

- id: shutter_close
  label: "Shutter Close (051)"
  kind: action
  params: []
  command_hex: "02 16 00 00 00 18"

- id: shutter_open
  label: "Shutter Open (052)"
  kind: action
  params: []
  command_hex: "02 17 00 00 00 19"

- id: lens_control
  label: "Lens Control (053)"
  kind: action
  params:
    - name: target
      type: enum
      values:
        - { value: "00h", label: Zoom }
        - { value: "01h", label: Focus }
        - { value: "02h", label: "Lens Shift (H)" }
        - { value: "03h", label: "Lens Shift (V)" }
        - { value: "06h", label: "Periphery Focus" }
    - name: content
      type: enum
      values:
        - { value: "00h", label: Stop }
        - { value: "01h", label: "Drive 1s plus" }
        - { value: "02h", label: "Drive 0.5s plus" }
        - { value: "03h", label: "Drive 0.25s plus" }
        - { value: "7Fh", label: "Drive plus (continuous)" }
        - { value: "81h", label: "Drive minus (continuous)" }
        - { value: "FDh", label: "Drive 0.25s minus" }
        - { value: "FEh", label: "Drive 0.5s minus" }
        - { value: "FFh", label: "Drive 1s minus" }
  command_hex: "02 18 00 00 02 <DATA01> <DATA02> <CKS>"
  notes: "For continuous drive (7Fh/81h), send 00h to stop."

- id: lens_control_2
  label: "Lens Control 2 (053-2)"
  kind: action
  params:
    - name: target
      type: enum
      values:
        - { value: "00h", label: Zoom }
        - { value: "01h", label: Focus }
        - { value: "02h", label: "Lens Shift (H)" }
        - { value: "03h", label: "Lens Shift (V)" }
        - { value: "FFh", label: Stop }
    - name: mode
      type: enum
      values:
        - { value: "00h", label: "Absolute value" }
        - { value: "02h", label: "Relative value" }
    - name: value
      type: integer
      description: "16-bit adjustment value (low byte, high byte)"
  command_hex: "02 1D 00 00 04 <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"

- id: lens_memory_control
  label: "Lens Memory Control (053-3)"
  kind: action
  params:
    - name: operation
      type: enum
      values:
        - { value: "00h", label: MOVE }
        - { value: "01h", label: STORE }
        - { value: "02h", label: RESET }
  command_hex: "02 1E 00 00 01 <DATA01> <CKS>"

- id: reference_lens_memory_control
  label: "Reference Lens Memory Control (053-4)"
  kind: action
  params:
    - name: operation
      type: enum
      values:
        - { value: "00h", label: MOVE }
        - { value: "01h", label: STORE }
        - { value: "02h", label: RESET }
  command_hex: "02 1F 00 00 01 <DATA01> <CKS>"
  notes: "Controls the profile number specified by Lens Profile Set (053-10)."

- id: lens_memory_option_set
  label: "Lens Memory Option Set (053-6)"
  kind: action
  params:
    - name: target
      type: enum
      values:
        - { value: "00h", label: "LOAD BY SIGNAL" }
        - { value: "01h", label: "FORCED MUTE" }
    - name: value
      type: enum
      values:
        - { value: "00h", label: OFF }
        - { value: "01h", label: ON }
  command_hex: "02 21 00 00 02 <DATA01> <DATA02> <CKS>"

- id: lens_profile_set
  label: "Lens Profile Set (053-10)"
  kind: action
  params:
    - name: profile
      type: enum
      values:
        - { value: "00h", label: "Profile 1" }
        - { value: "01h", label: "Profile 2" }
  command_hex: "02 27 00 00 01 <DATA01> <CKS>"

- id: freeze_control
  label: "Freeze Control (079)"
  kind: action
  params:
    - name: operation
      type: enum
      values:
        - { value: "01h", label: "Freeze on" }
        - { value: "02h", label: "Freeze off" }
  command_hex: "01 98 00 00 01 <DATA01> <CKS>"

- id: eco_mode_set
  label: "Eco Mode Set (098-8)"
  kind: action
  params:
    - name: value
      type: integer
      description: "Eco mode value (model-specific hex code). See supplementary tables."
      # UNRESOLVED: NP-PH1002HL Series not listed in eco mode value table
  command_hex: "03 B1 00 00 02 07 <DATA01> <CKS>"

- id: lan_projector_name_set
  label: "LAN Projector Name Set (098-45)"
  kind: action
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes)"
  command_hex: "03 B1 00 00 12 2C <DATA01-16> 00 <CKS>"

- id: pip_pbp_set
  label: "PIP/Picture by Picture Set (098-198)"
  kind: action
  params:
    - name: target
      type: enum
      values:
        - { value: "00h", label: MODE }
        - { value: "01h", label: "START POSITION" }
        - { value: "02h", label: "SUB INPUT / SUB INPUT 1" }
        - { value: "09h", label: "SUB INPUT 2" }
        - { value: "0Ah", label: "SUB INPUT 3" }
    - name: value
      type: integer
      description: "Setting value (interpretation depends on target)"
  command_hex: "03 B1 00 00 03 C5 <DATA01> <DATA02> <CKS>"

- id: edge_blending_set
  label: "Edge Blending Mode Set (098-243-1)"
  kind: action
  params:
    - name: value
      type: enum
      values:
        - { value: "00h", label: OFF }
        - { value: "01h", label: ON }
  command_hex: "03 B1 00 00 03 DF 00 <DATA01> <CKS>"

- id: audio_select_set
  label: "Audio Select Set (319-10)"
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal hex code (model-specific)"
      # UNRESOLVED: NP-PH1002HL Series not listed in input terminal code table
    - name: value
      type: enum
      values:
        - { value: "00h", label: "Terminal specified in input_terminal" }
        - { value: "01h", label: BNC }
        - { value: "02h", label: COMPUTER }
  command_hex: "03 C9 00 00 03 09 <DATA01> <DATA02> <CKS>"
```

## Feedbacks
```yaml
- id: error_status
  label: "Error Status (009)"
  type: binary_flags
  command_hex: "00 88 00 00 00 88"
  response_data:
    DATA01:
      bit0: "Cover error"
      bit1: "Temperature error (bi-metallic strip)"
      bit3: "Fan error"
      bit4: "Fan error"
      bit5: "Power error"
      bit6: "Lamp 1 off or backlight off"
      bit7: "Lamp 1 replacement moratorium"
    DATA02:
      bit0: "Lamp 1 usage time exceeded limit"
      bit1: "Formatter error"
      bit2: "Lamp 2 off"
      bit7: "Refer to extended status"
    DATA03:
      bit1: "FPGA error"
      bit2: "Temperature error (sensor)"
      bit3: "Lamp 1 not present"
      bit4: "Lamp 1 data error"
      bit5: "Mirror cover error"
      bit6: "Lamp 2 replacement moratorium"
      bit7: "Lamp 2 usage time exceeded limit"
    DATA04:
      bit0: "Lamp 2 not present"
      bit1: "Lamp 2 data error"
      bit2: "Temperature error due to dust"
      bit3: "Foreign matter sensor error"
      bit5: "Ballast communication error"
      bit6: "Iris calibration error"
      bit7: "Lens not installed properly"
    DATA09:
      bit0: "Portrait cover side is up"
      bit1: "Interlock switch is open"
      bit2: "System error (Slave CPU)"
      bit3: "System error (Formatter)"

- id: projector_info
  label: "Information Request (037)"
  type: composite
  command_hex: "03 8A 00 00 00 8D"
  response_data:
    DATA01_49: "Projector name (NUL-terminated string)"
    DATA83_86: "Lamp usage time (seconds)"
    DATA87_90: "Filter usage time (seconds)"
  notes: "Usage time updated at 1-minute intervals."

- id: filter_usage
  label: "Filter Usage Info Request (037-3)"
  type: composite
  command_hex: "03 95 00 00 00 98"
  response_data:
    DATA01_04: "Filter usage time (seconds)"
    DATA05_08: "Filter alarm start time (seconds)"
  notes: "Returns -1 if no time defined."

- id: lamp_info
  label: "Lamp Information Request 3 (037-4)"
  type: composite
  command_hex: "03 96 00 00 02 <DATA01> <DATA02> <CKS>"
  params:
    - name: target
      type: enum
      values:
        - { value: "00h", label: "Lamp 1" }
        - { value: "01h", label: "Lamp 2" }
    - name: content
      type: enum
      values:
        - { value: "01h", label: "Lamp usage time (seconds)" }
        - { value: "04h", label: "Lamp remaining life (%)" }
  response_data:
    DATA03_06: "Obtained information (usage time or remaining life)"
  notes: "Negative value for remaining life means replacement deadline exceeded. Eco mode values reflect eco mode settings."

- id: carbon_savings
  label: "Carbon Savings Info Request (037-6)"
  type: composite
  command_hex: "03 9A 00 00 01 <DATA01> <CKS>"
  params:
    - name: target
      type: enum
      values:
        - { value: "00h", label: "Total Carbon Savings" }
        - { value: "01h", label: "Carbon Savings during operation" }
  response_data:
    DATA02_05: "Carbon Savings (Kilogram, max 99999 kg)"
    DATA06_09: "Carbon Savings (Milligram, max 999999 mg)"

- id: lens_position
  label: "Lens Control Request (053-1)"
  type: composite
  command_hex: "02 1C 00 00 02 <DATA01> 00 <CKS>"
  params:
    - name: target
      type: enum
      values:
        - { value: "00h", label: Zoom }
        - { value: "01h", label: Focus }
        - { value: "02h", label: "Lens Shift (H)" }
        - { value: "03h", label: "Lens Shift (V)" }
  response_data:
    DATA02_03: "Upper limit of adjustment range (16-bit)"
    DATA04_05: "Lower limit of adjustment range (16-bit)"
    DATA06_07: "Current value (16-bit)"

- id: lens_memory_option
  label: "Lens Memory Option Request (053-5)"
  type: enum
  command_hex: "02 20 00 00 01 <DATA01> <CKS>"
  params:
    - name: target
      type: enum
      values:
        - { value: "00h", label: "LOAD BY SIGNAL" }
        - { value: "01h", label: "FORCED MUTE" }
  response_data:
    DATA02:
      "00h": "OFF"
      "01h": "ON"

- id: lens_info
  label: "Lens Information Request (053-7)"
  type: binary_flags
  command_hex: "02 22 00 00 01 00 25"
  response_data:
    DATA01_bit0: "Lens memory operation (0=Stop, 1=During operation)"
    DATA01_bit1: "Zoom (0=Stop, 1=During operation)"
    DATA01_bit2: "Focus (0=Stop, 1=During operation)"
    DATA01_bit3: "Lens Shift H (0=Stop, 1=During operation)"
    DATA01_bit4: "Lens Shift V (0=Stop, 1=During operation)"

- id: lens_profile
  label: "Lens Profile Request (053-11)"
  type: enum
  command_hex: "02 28 00 00 00 2A"
  response_data:
    DATA01:
      "00h": "Profile 1"
      "01h": "Profile 2"

- id: gain_parameter
  label: "Gain Parameter Request 3 (060-1)"
  type: composite
  command_hex: "03 05 00 00 03 <DATA01> 00 00 <CKS>"
  params:
    - name: target
      type: enum
      values:
        - { value: "00h", label: "Brightness" }
        - { value: "01h", label: "Contrast" }
        - { value: "02h", label: "Color" }
        - { value: "03h", label: "Hue" }
        - { value: "04h", label: "Sharpness" }
        - { value: "05h", label: "Volume" }
        - { value: "96h", label: "Lamp/Light Adjust" }
  response_data:
    DATA01:
      "00h": "Display not possible"
      "01h": "Adjustment not possible"
      "02h": "Adjustment possible"
      "FFh": "Specified gain does not exist"
    DATA02_03: "Upper limit (16-bit)"
    DATA04_05: "Lower limit (16-bit)"
    DATA06_07: "Default value (16-bit)"
    DATA08_09: "Current value (16-bit)"
    DATA10_11: "Wide adjustment width (16-bit)"
    DATA12_13: "Narrow adjustment width (16-bit)"
    DATA14:
      "00h": "Default value invalid"
      "01h": "Default value valid"

- id: setting_info
  label: "Setting Request (078-1)"
  type: composite
  command_hex: "00 85 00 00 01 00 86"
  response_data:
    DATA01_03: "Base model type"
    DATA04:
      "00h": "Sound not available"
      "01h": "Sound available"
    DATA05:
      "00h": "Profile not available"
      "01h": "Clock function"
      "02h": "Sleep timer function"
      "03h": "Clock and Sleep timer"

- id: running_status
  label: "Running Status Request (078-2)"
  type: composite
  command_hex: "00 85 00 00 01 01 87"
  response_data:
    DATA03_power:
      "00h": "Standby"
      "01h": "Power on"
      "FFh": "Not supported"
    DATA04_cooling:
      "00h": "Not executing"
      "01h": "During execution"
    DATA05_power_process:
      "00h": "Not executing"
      "01h": "During execution"
    DATA06_operation:
      "00h": "Standby (Sleep)"
      "04h": "Power on"
      "05h": "Cooling"
      "06h": "Standby (error)"
      "0Fh": "Standby (Power saving)"
      "10h": "Network standby"

- id: input_status
  label: "Input Status Request (078-3)"
  type: composite
  command_hex: "00 85 00 00 01 02 88"
  response_data:
    DATA01_signal_switch:
      "00h": "Not executing"
      "01h": "During execution"
    DATA02_signal_list: "Signal list number minus 1 (00h-C7h)"
    DATA03_signal_type_1: "Selection signal type 1 (01h-05h)"
    DATA04_signal_type_2:
      "01h": "COMPUTER"
      "02h": "VIDEO"
      "03h": "S-VIDEO"
      "04h": "COMPONENT"
      "07h": "VIEWER(1-5)"
      "20h": "DVI-D"
      "21h": "HDMI"
      "22h": "DisplayPort"
      "23h": "VIEWER(6-10)"
      "FFh": "Not Source Input"
    DATA09_content:
      "00h": "Video signal displayed"
      "01h": "No signal"
      "02h": "Viewer displayed"
      "03h": "Test pattern displayed"
      "04h": "LAN displayed"

- id: mute_status
  label: "Mute Status Request (078-4)"
  type: composite
  command_hex: "00 85 00 00 01 03 89"
  response_data:
    DATA01_picture_mute:
      "00h": "Off"
      "01h": "On"
      "FFh": "Not supported"
    DATA02_sound_mute:
      "00h": "Off"
      "01h": "On"
      "FFh": "Not supported"
    DATA03_onscreen_mute:
      "00h": "Off"
      "01h": "On"
      "FFh": "Not supported"
    DATA04_forced_onscreen_mute:
      "00h": "Off"
      "01h": "On"
      "FFh": "Not supported"

- id: model_name
  label: "Model Name Request (078-5)"
  type: string
  command_hex: "00 85 00 00 01 04 8A"
  response_data:
    DATA01_32: "Model name (NUL-terminated string)"

- id: cover_status
  label: "Cover Status Request (078-6)"
  type: enum
  command_hex: "00 85 00 00 01 05 8B"
  response_data:
    DATA01:
      "00h": "Normal (cover opened)"
      "01h": "Cover closed"

- id: info_string
  label: "Information String Request (084)"
  type: string
  command_hex: "00 D0 00 00 03 00 <DATA01> 01 <CKS>"
  params:
    - name: info_type
      type: enum
      values:
        - { value: "03h", label: "Horizontal sync frequency" }
        - { value: "04h", label: "Vertical sync frequency" }
  response_data:
    DATA03_next: "Label/information strings (NUL-terminated)"

- id: eco_mode
  label: "Eco Mode Request (097-8)"
  type: integer
  command_hex: "03 B0 00 00 01 07 BB"
  response_data:
    DATA01: "Eco mode value (model-specific)"
  # UNRESOLVED: NP-PH1002HL Series not listed in eco mode value table

- id: lan_projector_name
  label: "LAN Projector Name Request (097-45)"
  type: string
  command_hex: "03 B0 00 00 01 2C E0"
  response_data:
    DATA01_17: "Projector name (NUL-terminated string)"

- id: mac_address
  label: "LAN MAC Address Request 2 (097-155)"
  type: string
  command_hex: "03 B0 00 00 02 9A 00 4F"
  response_data:
    DATA01_06: "MAC address (6 bytes)"

- id: pip_pbp_status
  label: "PIP/Picture by Picture Request (097-198)"
  type: composite
  command_hex: "03 B0 00 00 02 C5 <DATA01> <CKS>"
  params:
    - name: target
      type: enum
      values:
        - { value: "00h", label: MODE }
        - { value: "01h", label: "START POSITION" }
        - { value: "02h", label: "SUB INPUT / SUB INPUT 1" }
        - { value: "09h", label: "SUB INPUT 2" }
        - { value: "0Ah", label: "SUB INPUT 3" }
  response_data:
    mode_values:
      "00h": "PIP"
      "01h": "PICTURE BY PICTURE"
    position_values:
      "00h": "TOP-LEFT"
      "01h": "TOP-RIGHT"
      "02h": "BOTTOM-LEFT"
      "03h": "BOTTOM-RIGHT"

- id: edge_blending_status
  label: "Edge Blending Mode Request (097-243-1)"
  type: enum
  command_hex: "03 B0 00 00 02 DF 00 94"
  response_data:
    DATA01:
      "00h": "OFF"
      "01h": "ON"

- id: base_model_type
  label: "Base Model Type Request (305-1)"
  type: composite
  command_hex: "00 BF 00 00 01 00 C0"
  response_data:
    DATA01_02: "Base model type"
    DATA03_11: "Model name (NUL-terminated string)"
    DATA12_13: "Base model type"

- id: serial_number
  label: "Serial Number Request (305-2)"
  type: string
  command_hex: "00 BF 00 00 02 01 06 C8"
  response_data:
    DATA01_16: "Serial number (NUL-terminated string)"

- id: basic_info
  label: "Basic Information Request (305-3)"
  type: composite
  command_hex: "00 BF 00 00 01 02 C2"
  response_data:
    DATA01_operation:
      "00h": "Standby (Sleep)"
      "04h": "Power on"
      "05h": "Cooling"
      "06h": "Standby (error)"
      "0Fh": "Standby (Power saving)"
      "10h": "Network standby"
    DATA02_content:
      "00h": "Video signal displayed"
      "01h": "No signal"
      "02h": "Viewer displayed"
      "03h": "Test pattern displayed"
      "04h": "LAN displayed"
      "05h": "Test pattern (user) displayed"
      "10h": "Signal being switched"
    DATA06_video_mute:
      "00h": "Off"
      "01h": "On"
    DATA07_sound_mute:
      "00h": "Off"
      "01h": "On"
    DATA08_onscreen_mute:
      "00h": "Off"
      "01h": "On"
    DATA09_freeze:
      "00h": "Off"
      "01h": "On"
```

## Variables
```yaml
# No continuously-settable variables beyond the actions above.
# The gain parameter request/response pairs expose ranges and current values.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism described in source.
# All responses are solicited (command/response model).
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in the command reference.
# The error status response includes interlock switch status (DATA09 bit1) and cover error (DATA01 bit0).
# Power on/off commands block other commands during transitions but no confirmation is required by the protocol.
```

## Notes
- All commands use binary (hexadecimal byte) framing with a checksum byte. Checksum is the low-order byte of the sum of all preceding bytes.
- Response success byte is the command byte with bit 5 set (e.g., 02h -> 22h, 03h -> 23h). Response failure byte has bit 5 set and bit 7 set (e.g., 02h -> A2h).
- Parameters `<ID1>` (control ID) and `<ID2>` (model code) are present in all responses and vary per projector configuration.
- Picture mute, sound mute, and onscreen mute are automatically cancelled on input switch or video signal switch. Sound mute is also cancelled on volume adjustment.
- Lens control (053) with continuous drive values (7Fh/81h) requires sending 00h to stop.
- Lens memory control (053-3) is separate from reference lens memory control (053-4), which operates on a selected profile.
- Lamp information reflects eco mode settings when eco mode is enabled.
- Usage time data is updated at 1-minute intervals despite being queryable in seconds.
- Some models cannot receive commands in standby mode via LAN.

<!-- UNRESOLVED: NP-PH1002HL Series is not listed in the supplementary tables for input terminal codes, aspect values, or eco mode values. The hex parameter values for input_switch, aspect_adjust, eco_mode_set, and audio_select_set are model-specific and must be determined from a NP-PH1002HL-specific source. -->
<!-- UNRESOLVED: standby mode setting for receiving POWER ON command not documented for NP-PH1002HL Series. -->
<!-- UNRESOLVED: the specific sub-input values for PIP/PbP commands reference an appendix not included in this source. -->
<!-- UNRESOLVED: flow control method not stated despite RTS/CTS pins being present on the serial connector. -->
<!-- UNRESOLVED: response timeout and command retry behavior not documented. -->
<!-- UNRESOLVED: maximum command queue depth or rate limiting not documented. -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_np_ph1002hl_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:21:20.577Z
retrieved_at: 2026-04-25T21:21:20.577Z
last_checked_at: 2026-04-25T21:21:20.577Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:21:20.577Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions (28 control + 25 feedback) matched literally in NEC PH1002HL serial source; transport parameters verified."
```

## Known Gaps

```yaml
[]
```
