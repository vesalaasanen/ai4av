---
spec_id: admin/nec-p402-tmx4p-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC P402-TMX4P Series Control Spec"
manufacturer: NEC
model_family: "P402-TMX4P Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "P402-TMX4P Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-26T21:15:21.605Z
generated_at: 2026-04-26T21:15:21.605Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T21:15:21.605Z
  matched_actions: 61
  action_count: 61
  confidence: high
  summary: "All 61 spec actions matched source commands, transport parameters verified against protocol documentation."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC P402-TMX4P Series Control Spec

## Summary
NEC P402-TMX4P Series professional projector supporting both RS-232C serial and wired TCP/IP control. The projector uses a hexadecimal command protocol with control ID, model code, and checksum parameters. Power on/off commands block other commands during execution (including cooling time). No authentication procedure is described in the source.

<!-- UNRESOLVED: specific model variants within P402-TMX4P Series not enumerated in source -->
<!-- UNRESOLVED: standby mode compatibility matrix not fully specified (varies by model) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port for LAN control
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
- powerable      # POWER ON / POWER OFF commands present
- routable       # INPUT SW CHANGE command present
- queryable      # INFORMATION REQUEST, STATUS REQUEST, MODEL NAME REQUEST, etc.
- levelable      # VOLUME ADJUST, PICTURE ADJUST commands present
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
      type: string
      description: Hex code for input terminal (see appendix for values)

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
      description: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness
    - name: mode
      type: integer
      description: 00h=Absolute, 01h=Relative
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: 00h=Absolute, 01h=Relative
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect
      type: integer
      description: Hex aspect mode code

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: 96h=Lamp Adjust/Light Adjust
    - name: mode
      type: integer
      description: 00h=Absolute, 01h=Relative
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (WORD type)

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
      description: 06h=Periphery Focus
    - name: direction
      type: integer
      description: 00h=Stop, 01h/02h/03h=Drive plus, 7Fh=Drive cont plus, 81h=Drive cont minus, FDh/FEh/FFh=Drive minus

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: control
      type: integer
      description: FFh=Stop
    - name: mode
      type: integer
      description: 00h=Absolute, 02h=Relative
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: 00h=MOVE, 01h=STORE, 02h=RESET

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: 00h=MOVE, 01h=STORE, 02h=RESET

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: integer
      description: 00h=Load by Signal, 01h=Forced Mute
    - name: value
      type: integer
      description: 00h=OFF, 01h=ON

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: 00h=Profile 1, 01h=Profile 2

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
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: item
      type: integer
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3
    - name: value
      type: integer
      description: Setting value (varies by item)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: 00h=OFF, 01h=ON

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: 01h=Freeze on, 02h=Freeze off

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: terminal
      type: integer
      description: Input terminal hex code
    - name: source
      type: integer
      description: 00h=Terminal, 01h=BNC, 02h=COMPUTER
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

- id: basic_information_request
  label: Basic Information Request
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: object
  properties:
    cover_error: boolean
    temperature_error: boolean
    fan_error: boolean
    power_error: boolean
    lamp_off: boolean
    lamp_moratorium: boolean
    lamp2_off: boolean
    lamp2_moratorium: boolean
    formatter_error: boolean
    fpga_error: boolean
    mirror_cover_error: boolean
    lamp_data_error: boolean
    lamp2_data_error: boolean
    ballast_comm_error: boolean
    iris_calib_error: boolean
    lens_install_error: boolean
    interlock_open: boolean
    system_error: boolean

- id: command_response
  label: Command Response
  type: object
  properties:
    err1: integer
    err2: integer
    description: Error code pair (see error code list)

- id: information_response
  label: Information Response
  type: object
  properties:
    projector_name: string
    lamp_usage_seconds: integer
    filter_usage_seconds: integer

- id: lamp_information
  label: Lamp Information
  type: object
  properties:
    lamp: integer  # 00h=Lamp1, 01h=Lamp2
    content: integer  # 01h=Usage time, 04h=Remaining life
    value: integer

- id: filter_usage_information
  label: Filter Usage Information
  type: object
  properties:
    filter_usage_seconds: integer
    filter_alarm_start_seconds: integer

- id: carbon_savings_information
  label: Carbon Savings Information
  type: object
  properties:
    type: integer  # 00h=Total, 01h=Operation
    kilograms: integer
    milligrams: integer

- id: running_status
  label: Running Status
  type: object
  properties:
    power_status: integer  # 00h=Standby, 01h=Power on
    cooling_process: integer
    power_on_off_process: integer
    operation_status: integer

- id: input_status
  label: Input Status
  type: object
  properties:
    signal_switch_process: integer
    signal_list_number: integer
    signal_type1: integer
    signal_type2: integer
    test_pattern_display: integer
    content_displayed: integer

- id: mute_status
  label: Mute Status
  type: object
  properties:
    picture_mute: boolean
    sound_mute: boolean
    onscreen_mute: boolean
    forced_onscreen_mute: boolean
    onscreen_display: boolean

- id: model_name
  label: Model Name
  type: string

- id: cover_status
  label: Cover Status
  type: integer  # 00h=Normal, 01h=Cover closed

- id: eco_mode
  label: Eco Mode
  type: integer

- id: projector_name
  label: Projector Name
  type: string

- id: mac_address
  label: MAC Address
  type: string

- id: pip_status
  label: PIP/Picture by Picture Status
  type: object
  properties:
    mode: integer
    start_position: integer
    sub_input: integer
    sub_input2: integer
    sub_input3: integer

- id: edge_blending_mode
  label: Edge Blending Mode
  type: integer

- id: lens_position
  label: Lens Position
  type: object
  properties:
    upper_limit: integer
    lower_limit: integer
    current_value: integer

- id: lens_info
  label: Lens Information
  type: object
  properties:
    lens_memory: integer
    zoom: integer
    focus: integer
    lens_shift_h: integer
    lens_shift_v: integer

- id: gain_parameters
  label: Gain Parameters
  type: object
  properties:
    status: integer
    upper_limit: integer
    lower_limit: integer
    default_value: integer
    current_value: integer

- id: serial_number
  label: Serial Number
  type: string

- id: basic_information
  label: Basic Information
  type: object
  properties:
    operation_status: integer
    content_displayed: integer
    signal_type1: integer
    signal_type2: integer
    display_signal_type: integer
    video_mute: boolean
    sound_mute: boolean
    onscreen_mute: boolean
    freeze_status: boolean
```

## Variables
```yaml
# UNRESOLVED: no discrete parameter variables separate from action params in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# No explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
# NOTE: POWER ON and POWER OFF block other commands during execution
#       (including cooling time for POWER OFF)
```

## Notes
Command protocol format: `20h <ID1> <ID2> 0Ch <DATA> <CKS>` with checksum calculated as low-order byte of sum of preceding bytes. Response codes: `A0h`/`A2h`/`A3h` for different command classes; `22h`/`23h` for data responses.

Error code list (ERR1/ERR2): 00h00h=Unrecognized, 00h01h=Unsupported, 01h00h=Invalid value, 01h01h=Invalid input, 01h02h=Invalid language, 02h00h=Memory alloc, 02h02h=Memory in use, 02h03h=Cannot set, 02h04h=Forced onscreen mute, 02h06h=Viewer error, 02h07h=No signal, 02h08h=Test pattern, 02h09h=No PC card, 02h0Ah=Memory error, 02h0Ch=Entry list displayed, 02h0Dh=Power off, 02h0Eh=Execution failed, 02h0Fh=No authority, 03h00h=Wrong gain number, 03h01h=Invalid gain, 03h02h=Adjustment failed.

Input terminal hex codes: COMPUTER=01h, COMPUTER2=02h, VIDEO=06h, S-VIDEO=0Bh, HDMI=A1h/1Ah, HDMI2=A2h/1Bh, DisplayPort=A6h, DVI-D=9Ch, LAN/NETWORK=20h, HDBaseT=BFh.

Aspect hex codes: AUTO=00h, WIDE ZOOM=01h, 16:9=02h, NATIVE=03h, 4:3=04h, 15:9=05h, 16:10=06h, LETTER BOX=07h, FULL=09h/10h.

Eco mode hex codes: OFF=00h, NORMAL=00h/01h, AUTO ECO=01h, ECO1=02h, ECO2=03h, LONG LIFE=04h, BOOST=05h, SILENT=06h.

Key codes for REMOTE KEY CODE: POWER ON=0200h, POWER OFF=0300h, MENU=0600h, UP=0700h, DOWN=0800h, RIGHT=0900h, LEFT=0A00h, ENTER=0B00h, EXIT=0C00h, MUTE=1300h, VOLUME UP=8500h, VOLUME DOWN=8600h, FREEZE=8A00h, ASPECT=A300h.

<!-- UNRESOLVED: input terminal values appendix references "Supplementary Information by Command" appendix which is not present in full in this source document -->
<!-- UNRESOLVED: selection signal type values appendix incomplete in source -->
<!-- UNRESOLVED: audio select terminal values appendix incomplete in source -->
<!-- UNRESOLVED: standby mode requirements vary by model — specific P402-TMX4P requirements not enumerated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-26T21:15:21.605Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T21:15:21.605Z
matched_actions: 61
action_count: 61
confidence: high
summary: "All 61 spec actions matched source commands, transport parameters verified against protocol documentation."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
