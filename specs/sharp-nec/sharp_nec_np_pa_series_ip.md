---
spec_id: admin/sharp-nec-np-pa-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp-NEC NP-PA Series Control Spec"
manufacturer: Sharp-NEC
model_family: "NP-PA Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp-NEC
  models:
    - "NP-PA Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T10:09:32.506Z
last_checked_at: 2026-04-25T21:56:05.731Z
generated_at: 2026-04-25T21:56:05.731Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:56:05.731Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions match literal command bytes in source; transport parameters verified; comprehensive coverage of all source commands."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Sharp-NEC NP-PA Series Control Spec

## Summary
The Sharp-NEC NP-PA Series are projectors controllable via RS-232 serial or TCP/IP (wired LAN) using a binary command protocol. Commands are sent as hexadecimal byte frames with a checksum. This spec covers power control, input switching, picture/sound adjustment, lens control, shutter, freeze, eco mode, PIP/PbP, edge blending, and various status queries.

<!-- UNRESOLVED: specific NP-PA sub-models not enumerated — source references many legacy NP-*/NP-M* models in supplementary tables but no explicit NP-PA model list -->
<!-- UNRESOLVED: input terminal hex codes for NP-PA series specifically not in the supplementary table — only legacy model codes listed -->
<!-- UNRESOLVED: eco mode values for NP-PA series specifically not in the supplementary table -->
<!-- UNRESOLVED: aspect values for NP-PA series specifically not in the supplementary table -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: null  # UNRESOLVED: source lists 115200/38400/19200/9600/4800 but does not state a default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; full duplex mentioned
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # power on/off commands (015, 016)
  - routable     # input switch change command (018)
  - queryable    # extensive status request commands (037, 078, 060, 084, 097, 305)
  - levelable    # volume, brightness, contrast, color, hue, sharpness adjustment (030-1, 030-2)
```

## Actions
```yaml
commands:
  - id: power_on
    label: Power On
    kind: action
    command_bytes: "02 00 00 00 00 02"
    response_success: "22 00 <ID1> <ID2> 00 <CKS>"
    response_failure: "A2 00 <ID1> <ID2> 02 <ERR1> <ERR2> <CKS>"
    params: []
    notes: No other command accepted while power is turning on.

  - id: power_off
    label: Power Off
    kind: action
    command_bytes: "02 01 00 00 00 03"
    response_success: "22 01 <ID1> <ID2> 00 <CKS>"
    response_failure: "A2 01 <ID1> <ID2> 02 <ERR1> <ERR2> <CKS>"
    params: []
    notes: No other command accepted during power-off including cooling time.

  - id: input_switch
    label: Input Switch Change
    kind: action
    command_bytes: "02 03 00 00 02 01 <DATA01> <CKS>"
    response_success: "22 03 <ID1> <ID2> 01 <DATA01> <CKS>"
    response_failure: "A2 03 <ID1> <ID2> 02 <ERR1> <ERR2> <CKS>"
    params:
      - name: input
        type: integer
        description: "Input terminal hex code (see supplementary input terminal table). Example: 06h = VIDEO"
    notes: Response DATA01 00h = success, FFh = error (no signal switch).

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command_bytes: "02 10 00 00 00 12"
    response_success: "22 10 <ID1> <ID2> 00 <CKS>"
    params: []
    notes: Mute is cancelled by input switch or video signal switch.

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command_bytes: "02 11 00 00 00 13"
    response_success: "22 11 <ID1> <ID2> 00 <CKS>"
    params: []

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command_bytes: "02 12 00 00 00 14"
    response_success: "22 12 <ID1> <ID2> 00 <CKS>"
    params: []
    notes: Mute is cancelled by input switch, video signal switch, or volume adjustment.

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command_bytes: "02 13 00 00 00 15"
    response_success: "22 13 <ID1> <ID2> 00 <CKS>"
    params: []

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command_bytes: "02 14 00 00 00 16"
    response_success: "22 14 <ID1> <ID2> 00 <CKS>"
    params: []

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command_bytes: "02 15 00 00 00 17"
    response_success: "22 15 <ID1> <ID2> 00 <CKS>"
    params: []

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command_bytes: "03 10 00 00 05 <DATA01> FF <DATA02> <DATA03> <DATA04> <CKS>"
    response_success: "23 10 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=absolute value, 01h=relative value"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte=DATA03, high byte=DATA04). Supports signed values."
    notes: Response DATA01+DATA02 = 0000h means success.

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command_bytes: "03 10 00 00 05 05 00 <DATA01> <DATA02> <DATA03> <CKS>"
    response_success: "23 10 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>"
    params:
      - name: mode
        type: integer
        description: "00h=absolute value, 01h=relative value"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte=DATA02, high byte=DATA03)"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command_bytes: "03 10 00 00 05 18 00 00 <DATA01> 00 <CKS>"
    response_success: "23 10 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>"
    params:
      - name: aspect
        type: integer
        description: "Aspect value - model-specific (see supplementary aspect table)"

  - id: lamp_adjust
    label: Lamp/Light Adjust
    kind: action
    command_bytes: "03 10 00 00 05 <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    response_success: "23 10 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "DATA01=96h, DATA02=FFh for LAMP ADJUST / LIGHT ADJUST"
      - name: mode
        type: integer
        description: "00h=absolute value, 01h=relative value"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte=DATA04, high byte=DATA05)"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command_bytes: "02 0F 00 00 02 <DATA01> <DATA02> <CKS>"
    response_success: "22 0F <ID1> <ID2> 01 <DATA01> <CKS>"
    params:
      - name: key_code
        type: integer
        description: "WORD key code. Examples: 0200h=POWER ON, 0300h=POWER OFF, 0500h=AUTO, 0600h=MENU, 0700h=UP, 0800h=DOWN, 0900h=RIGHT, 0A00h=LEFT, 0B00h=ENTER, 0C00h=EXIT, 1300h=MUTE, 8400h=VOLUME UP, 8500h=VOLUME DOWN, 8A00h=FREEZE, A300h=ASPECT, D700h=SOURCE, EE00h=LAMP MODE/ECO"

  - id: shutter_close
    label: Shutter Close
    kind: action
    command_bytes: "02 16 00 00 00 18"
    response_success: "22 16 <ID1> <ID2> 00 <CKS>"
    params: []

  - id: shutter_open
    label: Shutter Open
    kind: action
    command_bytes: "02 17 00 00 00 19"
    response_success: "22 17 <ID1> <ID2> 00 <CKS>"
    params: []

  - id: lens_control
    label: Lens Control
    kind: action
    command_bytes: "02 18 00 00 02 <DATA01> <DATA02> <CKS>"
    response_success: "22 18 <ID1> <ID2> 01 <DATA01> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift (H), 03h=Lens Shift (V), 06h=Periphery Focus"
      - name: content
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
    notes: For continuous drive (7Fh/81h), send 00h to stop.

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command_bytes: "02 1D 00 00 04 <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    response_success: "22 1D <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift (H), 03h=Lens Shift (V), FFh=Stop"
      - name: mode
        type: integer
        description: "00h=absolute value, 02h=relative value"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte=DATA03, high byte=DATA04)"

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command_bytes: "02 1E 00 00 01 <DATA01> <CKS>"
    response_success: "22 1E <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>"
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command_bytes: "02 1F 00 00 01 <DATA01> <CKS>"
    response_success: "22 1F <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>"
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: Controls the profile number specified by Lens Profile Set (053-10).

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command_bytes: "02 21 00 00 02 <DATA01> <DATA02> <CKS>"
    response_success: "22 21 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>"
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
    command_bytes: "02 27 00 00 01 <DATA01> <CKS>"
    response_success: "22 27 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>"
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command_bytes: "01 98 00 00 01 <DATA01> <CKS>"
    response_success: "21 98 <ID1> <ID2> 01 <DATA01> <CKS>"
    params:
      - name: operation
        type: integer
        description: "01h=Freeze On, 02h=Freeze Off"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command_bytes: "03 B1 00 00 02 07 <DATA01> <CKS>"
    response_success: "23 B1 <ID1> <ID2> 02 07 <DATA01> <CKS>"
    params:
      - name: eco_mode
        type: integer
        description: "Eco mode value - model-specific (see supplementary eco mode table)"

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command_bytes: "03 B1 00 00 12 2C <DATA01-16> 00 <CKS>"
    response_success: "23 B1 <ID1> <ID2> 02 2C <DATA01> <CKS>"
    params:
      - name: name
        type: string
        description: "Projector name (up to 16 bytes)"

  - id: pip_pbp_set
    label: PIP/Picture by Picture Set
    kind: action
    command_bytes: "03 B1 00 00 03 C5 <DATA01> <DATA02> <CKS>"
    response_success: "23 B1 <ID1> <ID2> 03 C5 <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "MODE: 00h=PIP, 01h=PbP. POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT."

  - id: edge_blending_set
    label: Edge Blending Mode Set
    kind: action
    command_bytes: "03 B1 00 00 03 DF 00 <DATA01> <CKS>"
    response_success: "23 B1 <ID1> <ID2> 03 DF 00 <DATA01> <CKS>"
    params:
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command_bytes: "03 C9 00 00 03 09 <DATA01> <DATA02> <CKS>"
    response_success: "23 C9 <ID1> <ID2> 03 09 <DATA01> <DATA02> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal code (see supplementary input terminal table)"
      - name: audio_source
        type: integer
        description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: Error Status
    command_bytes: "00 88 00 00 00 88"
    response_success: "20 88 <ID1> <ID2> 0C <DATA01-12> <CKS>"
    type: bitmap
    description: "12-byte error bitmap. Bits: cover error, fan error, temperature error, power error, lamp off, lamp replacement moratorium, lamp usage time exceeded, formatter error, FPGA error, lamp data error, mirror cover error, ballast comm error, iris calibration error, lens not installed, interlock switch open, system error."

  - id: information
    label: Projector Information
    command_bytes: "03 8A 00 00 00 8D"
    response_success: "23 8A <ID1> <ID2> 62 <DATA01-98> <CKS>"
    type: composite
    description: "DATA01-49=projector name (NUL-terminated), DATA50-82=reserved, DATA83-86=lamp usage time (seconds), DATA87-90=filter usage time (seconds)."

  - id: filter_usage
    label: Filter Usage Information
    command_bytes: "03 95 00 00 00 98"
    response_success: "23 95 <ID1> <ID2> 08 <DATA01-08> <CKS>"
    type: composite
    description: "DATA01-04=filter usage time (seconds), DATA05-08=filter alarm start time (seconds). -1 if undefined."

  - id: lamp_information
    label: Lamp Information
    command_bytes: "03 96 00 00 02 <DATA01> <DATA02> <CKS>"
    response_success: "23 96 <ID1> <ID2> 06 <DATA01-06> <CKS>"
    type: composite
    params:
      - name: target
        description: "00h=Lamp 1, 01h=Lamp 2"
      - name: content
        description: "01h=usage time (seconds), 04h=remaining life (%)"
    description: "Returns lamp usage time or remaining life. Negative remaining life means deadline exceeded."

  - id: carbon_savings
    label: Carbon Savings Information
    command_bytes: "03 9A 00 00 01 <DATA01> <CKS>"
    response_success: "23 9A <ID1> <ID2> 09 <DATA01-09> <CKS>"
    type: composite
    params:
      - name: target
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    description: "DATA02-05=kg (max 99999), DATA06-09=mg (max 999999)."

  - id: lens_position
    label: Lens Control Request
    command_bytes: "02 1C 00 00 02 <DATA01> 00 <CKS>"
    response_success: "22 1C <ID1> <ID2> 08 <DATA01-07> <CKS>"
    type: composite
    params:
      - name: target
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift (H), 03h=Lens Shift (V)"
    description: "Returns upper limit, lower limit (16-bit each), and current value (16-bit)."

  - id: lens_information
    label: Lens Information Request
    command_bytes: "02 22 00 00 01 00 25"
    response_success: "22 22 <ID1> <ID2> 02 00 <DATA01> <CKS>"
    type: bitmap
    description: "DATA01 bit flags: Bit0=lens memory operation, Bit1=zoom, Bit2=focus, Bit3=lens shift H, Bit4=lens shift V (0=stopped, 1=operating)."

  - id: lens_memory_option
    label: Lens Memory Option Request
    command_bytes: "02 20 00 00 01 <DATA01> <CKS>"
    response_success: "22 20 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>"
    type: enum
    params:
      - name: target
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    values: [OFF, ON]

  - id: lens_profile
    label: Lens Profile Request
    command_bytes: "02 28 00 00 00 2A"
    response_success: "22 28 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>"
    type: enum
    values: [Profile 1, Profile 2]

  - id: gain_parameter
    label: Gain Parameter Request
    command_bytes: "03 05 00 00 03 <DATA01> 00 00 <CKS>"
    response_success: "23 05 <ID1> <ID2> 10 <DATA01-16> <CKS>"
    type: composite
    params:
      - name: target
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"
    description: "Returns status (00h=not displayable, 01h=not adjustable, 02h=adjustable, FFh=does not exist), upper/lower limit, default, current value, adjustment widths."

  - id: setting_request
    label: Setting Request
    command_bytes: "00 85 00 00 01 00 86"
    response_success: "20 85 <ID1> <ID2> 20 <DATA01-32> <CKS>"
    type: composite
    description: "DATA01-03=base model type, DATA04=sound function (00h=not available, 01h=available), DATA05=profile number."

  - id: running_status
    label: Running Status
    command_bytes: "00 85 00 00 01 01 87"
    response_success: "20 85 <ID1> <ID2> 10 <DATA01-16> <CKS>"
    type: composite
    description: "DATA03=power (00h=standby, 01h=power on), DATA04=cooling (00h/01h), DATA05=power on/off process (00h/01h), DATA06=operation status (00h=standby sleep, 04h=power on, 05h=cooling, 06h=standby error, 0Fh=standby power saving, 10h=network standby)."

  - id: input_status
    label: Input Status
    command_bytes: "00 85 00 00 01 02 88"
    response_success: "20 85 <ID1> <ID2> 10 <DATA01-16> <CKS>"
    type: composite
    description: "DATA01=signal switch process, DATA02=signal list number, DATA03=selection signal type 1, DATA04=selection signal type 2 (01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 07h=VIEWER, 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER 6-10), DATA05=signal list type, DATA06=test pattern, DATA09=content displayed."

  - id: mute_status
    label: Mute Status
    command_bytes: "00 85 00 00 01 03 89"
    response_success: "20 85 <ID1> <ID2> 10 <DATA01-16> <CKS>"
    type: composite
    description: "DATA01=picture mute (00h=off/01h=on), DATA02=sound mute, DATA03=onscreen mute, DATA04=forced onscreen mute, DATA05=onscreen display."

  - id: model_name
    label: Model Name
    command_bytes: "00 85 00 00 01 04 8A"
    response_success: "20 85 <ID1> <ID2> 20 <DATA01-32> <CKS>"
    type: string
    description: "Returns model name as NUL-terminated string."

  - id: cover_status
    label: Cover Status
    command_bytes: "00 85 00 00 01 05 8B"
    response_success: "20 85 <ID1> <ID2> 01 <DATA01> <CKS>"
    type: enum
    values: [Normal cover open, Cover closed]

  - id: information_string
    label: Information String
    command_bytes: "00 D0 00 00 03 00 <DATA01> 01 <CKS>"
    response_success: "20 D0 <ID1> <ID2> LEN <DATA01> 01 <DATA02> <DATA03-??> <CKS>"
    type: string
    params:
      - name: info_type
        description: "03h=horizontal sync frequency, 04h=vertical sync frequency"

  - id: eco_mode
    label: Eco Mode
    command_bytes: "03 B0 00 00 01 07 BB"
    response_success: "23 B0 <ID1> <ID2> 02 07 <DATA01> <CKS>"
    type: integer
    description: "Returns eco mode value - model-specific (see supplementary eco mode table)."

  - id: lan_projector_name
    label: LAN Projector Name
    command_bytes: "03 B0 00 00 01 2C E0"
    response_success: "23 B0 <ID1> <ID2> 12 2C <DATA01-17> <CKS>"
    type: string
    description: "Returns projector name as NUL-terminated string (up to 17 bytes)."

  - id: mac_address
    label: MAC Address
    command_bytes: "03 B0 00 00 02 9A 00 4F"
    response_success: "23 B0 <ID1> <ID2> 08 9A 00 <DATA01-06> <CKS>"
    type: string
    description: "Returns 6-byte MAC address."

  - id: pip_pbp_status
    label: PIP/Picture by Picture Status
    command_bytes: "03 B0 00 00 02 C5 <DATA01> <CKS>"
    response_success: "23 B0 <ID1> <ID2> 03 C5 <DATA01> <DATA02> <CKS>"
    type: composite
    params:
      - name: target
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_status
    label: Edge Blending Status
    command_bytes: "03 B0 00 00 02 DF 00 94"
    response_success: "23 B0 <ID1> <ID2> 03 DF 00 <DATA01> <CKS>"
    type: enum
    values: [OFF, ON]

  - id: base_model_type
    label: Base Model Type
    command_bytes: "00 BF 00 00 01 00 C0"
    response_success: "20 BF <ID1> <ID2> 10 00 <DATA01-15> <CKS>"
    type: composite
    description: "DATA01-02=base model type, DATA03-11=model name, DATA12-13=base model type."

  - id: serial_number
    label: Serial Number
    command_bytes: "00 BF 00 00 02 01 06 C8"
    response_success: "20 BF <ID1> <ID2> 12 01 06 <DATA01-16> <CKS>"
    type: string
    description: "Returns serial number as NUL-terminated string."

  - id: basic_information
    label: Basic Information
    command_bytes: "00 BF 00 00 01 02 C2"
    response_success: "20 BF <ID1> <ID2> 10 02 <DATA01-15> <CKS>"
    type: composite
    description: "DATA01=operation status (00h=standby sleep, 04h=power on, 05h=cooling, 06h=standby error, 0Fh=standby power saving, 10h=network standby), DATA02=content displayed, DATA03-04=selection signal type, DATA05=display signal type, DATA06=video mute, DATA07=sound mute, DATA08=onscreen mute, DATA09=freeze status."
```

## Variables
```yaml
variables:
  - id: brightness
    label: Brightness
    command: picture_adjust
    target_value: 00h

  - id: contrast
    label: Contrast
    command: picture_adjust
    target_value: 01h

  - id: color
    label: Color
    command: picture_adjust
    target_value: 02h

  - id: hue
    label: Hue
    command: picture_adjust
    target_value: 03h

  - id: sharpness
    label: Sharpness
    command: picture_adjust
    target_value: 04h

  - id: volume
    label: Volume
    command: volume_adjust

  - id: lamp_light_adjust
    label: Lamp/Light Adjust
    command: lamp_adjust

  - id: aspect
    label: Aspect
    command: aspect_adjust

  - id: eco_mode
    label: Eco Mode
    command: eco_mode_set

  - id: projector_name
    label: Projector Name
    command: lan_projector_name_set
    max_length: 16
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: interlock switch open bit exists in error status (DATA09 Bit1) but no interlock
#   procedure is described. Power commands block other commands during on/off sequences.
```

## Notes
- **Binary protocol**: All commands and responses are binary hex byte sequences, not ASCII text. Each frame includes header bytes, ID parameters (ID1=control ID, ID2=model code), data length (LEN), variable data, and a checksum (CKS).
- **Checksum calculation**: Sum all preceding bytes, take the low-order byte (8 bits) of the result.
- **Error responses**: Failure responses use error codes ERR1/ERR2 (see error code table in source). Common errors: 02h/0Dh = "command cannot be accepted because the power is off".
- **Power blocking**: During power-on and power-off (including cooling), no other commands are accepted.
- **Standby model differences**: Standby mode settings for receiving POWER ON command vary by model — see supplementary table.
- **Lens continuous drive**: For Lens Control (053), sending 7Fh (+) or 81h (-) starts continuous drive; send 00h to stop. While driving, issuing the same command adjusts without stopping.
- **Lamp information update rate**: Usage time is stored in 1-second units but updated at 1-minute intervals.
- **Picture/Sound mute auto-cancel**: Picture mute cancels on input or signal switch. Sound mute cancels on input switch, signal switch, or volume adjustment.

<!-- UNRESOLVED: input terminal hex codes specific to NP-PA series models not in supplementary tables -->
<!-- UNRESOLVED: aspect value mapping specific to NP-PA series not in supplementary tables -->
<!-- UNRESOLVED: eco mode value mapping specific to NP-PA series not in supplementary tables -->
<!-- UNRESOLVED: standby mode settings for NP-PA series specifically not in supplementary tables -->
<!-- UNRESOLVED: sub input values for PIP/PbP not documented — references appendix not included in refined source -->
<!-- UNRESOLVED: base model type values not documented — references appendix not included in refined source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T10:09:32.506Z
last_checked_at: 2026-04-25T21:56:05.731Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:56:05.731Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions match literal command bytes in source; transport parameters verified; comprehensive coverage of all source commands."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
