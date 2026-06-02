---
spec_id: admin/nec-x551un-tmx4p-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC X551UN-TMX4P Series Control Spec"
manufacturer: NEC
model_family: "X551UN-TMX4P Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "X551UN-TMX4P Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:53:38.380Z
last_checked_at: 2026-06-02T22:12:34.441Z
generated_at: 2026-06-02T22:12:34.441Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Appendix \"Supplementary Information by Command\" referenced throughout but not included in source"
  - "flow control not documented"
  - "no unsolicited event notifications documented in source."
  - "no multi-step macro sequences documented in source."
  - "power-on sequencing requirements, voltage/current specifications not documented in source"
  - "Input terminal hex code mapping incomplete (varies by model); appendix referenced but not included in source"
  - "Aspect mode hex code mapping partial (varies by model); appendix referenced but not included in source"
  - "Eco mode hex code mapping varies by model"
  - "Selection signal type hex codes vary by model"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:12:34.441Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X551UN-TMX4P Series Control Spec

## Summary
NEC X551UN-TMX4P Series projector supporting both RS-232C serial and wired LAN (TCP/IP) control. The device accepts hexadecimal command strings with checksum-based error detection and returns acknowledgements with error codes. Control ID and model code parameters are required in every command.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced throughout but not included in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # stated: "115200/38400/19200/9600/4800 bps"
  data_bits: 8  # stated: "8 bits"
  parity: none  # stated: "None"
  stop_bits: 1  # stated: "1 bit"
  flow_control: null  # UNRESOLVED: flow control not documented
addressing:
  port: 7142  # stated: "Use TCP port number '7142' for sending and receiving commands"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: POWER ON / POWER OFF commands present
- queryable      # inferred: multiple STATUS REQUEST, INFORMATION REQUEST commands present
- routable       # inferred: INPUT SW CHANGE command present
- levelable      # inferred: VOLUME ADJUST, PICTURE ADJUST commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on projector power. No other command accepted during power-on sequence.

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off projector power. No other command accepted during cooling time.

- id: input_sw_change
  label: Input Switch
  kind: action
  params:
    - name: input
      type: hex
      description: Input terminal hex code (e.g. 01h=COMPUTER, 06h=VIDEO, 1Ah=HDMI)

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
      type: hex
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: hex
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: hex
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect
      type: hex
      description: "00h=Auto, 01h=Wide Zoom, 02h=16:9, 03h=Native, 04h=4:3, etc."

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: hex
      description: "96h/FFh=Lamp Adjust/Light Adjust"
    - name: mode
      type: hex
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: hex
      description: 16-bit key code (e.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU)

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
      type: hex
      description: "06h=Periphery Focus"
    - name: direction
      type: hex
      description: "00h=Stop, 01h/02h/03h=Drive 1s/0.5s/0.25s plus, 7Fh=Drive plus, 81h=Drive minus, FDh/FEh/FFh=Drive 0.25s/0.5s/1s minus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: control
      type: hex
      description: "FFh=Stop"
    - name: mode
      type: hex
      description: "00h=Absolute value, 02h=Relative value"
    - name: value
      type: integer
      description: 16-bit adjustment value

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: hex
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: hex
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: hex
      description: "00h=Load by Signal, 01h=Forced Mute"
    - name: value
      type: hex
      description: "00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: hex
      description: "00h=Profile 1, 01h=Profile 2"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: hex
      description: "01h=Freeze on, 02h=Freeze off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: hex
      description: "00h=Off, 01h=Auto Eco/Normal, 02h/03h=Eco, 04h=Long Life, 05h=Boost, 06h=Silent"

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
      type: hex
      description: "00h=Mode, 01h=Start Position, 02h/09h/0Ah=Sub Input"
    - name: value
      type: hex
      description: Varies by target (e.g. 00h=PIP, 01h=PbP for Mode; 00h-03h for Position)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: state
      type: hex
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: terminal
      type: hex
      description: Input terminal hex code
    - name: value
      type: hex
      description: "00h=Terminal in DATA01, 01h=BNC, 02h=COMPUTER"
# Query (REQUEST) commands - all 25 documented in source

- id: error_status_request
  label: Error Status Request
  kind: query
  params: []

- id: information_request_cmd
  label: Information Request
  kind: query
  params: []

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: query
  params: []

- id: lamp_info_request
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp_number
      type: integer
      description: "Lamp number (00h=Lamp 1, 01h=Lamp 2)"

- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: integer
      description: "Type (00h=Total, 01h=Operation)"

- id: lens_control_request_cmd
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: "Control target (06h=Periphery Focus)"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: option
      type: integer
      description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []

- id: gain_parameter_request
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: target
      type: integer
      description: "Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Sharpness Detail, 96h=Lamp/Light)"

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
    - name: info_type
      type: integer
      description: "Type number (01h=Horizontal/Vertical sync freq)"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []

- id: projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []

- id: mac_address_request
  label: LAN MAC Address Status Request
  kind: query
  params: []

- id: pip_pbp_request
  label: PIP/Picture by Picture Request
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
- id: command_response
  label: Command Response
  type: object
  description: Standard response structure for all commands
  fields:
    - name: result_code
      type: hex
      description: "A0h/22h/23h=Success, A2h/A3h=Error"
    - name: err1
      type: hex
      description: Primary error code
    - name: err2
      type: hex
      description: Secondary error code

- id: error_status
  label: Error Status
  type: bitfield
  description: Error information from ERR STATUS REQUEST (command 009)
  fields:
    - name: bit0
      description: Cover error
    - name: bit1
      description: Temperature error
    - name: bit3
      description: Fan error
    - name: bit4
      description: Fan error
    - name: bit5
      description: Power error
    - name: bit6
      description: Lamp off or backlight off
    - name: bit7
      description: Lamp replacement moratorium

- id: running_status
  label: Running Status
  type: object
  description: Operation status from RUNNING STATUS REQUEST (command 078-2)
  fields:
    - name: power_status
      type: enum
      values: [standby, power_on]
    - name: cooling_status
      type: enum
      values: [not_executed, during_execution]
    - name: operation_status
      type: enum
      values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

- id: input_status
  label: Input Status
  type: object
  description: Input signal status from INPUT STATUS REQUEST (command 078-3)
  fields:
    - name: signal_switch_process
      type: enum
      values: [not_executed, during_execution]
    - name: signal_list_number
      type: integer
    - name: signal_type
      type: hex
      description: Signal type code (01h=COMPUTER, 20h=DVI-D, 21h=HDMI, etc.)
    - name: content_displayed
      type: enum
      values: [video_signal, no_signal, viewer_displayed, test_pattern, lan_displayed]

- id: mute_status
  label: Mute Status
  type: object
  description: Mute status from MUTE STATUS REQUEST (command 078-4)
  fields:
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

- id: projector_info
  label: Projector Info
  type: object
  description: Information from INFORMATION REQUEST (command 037)
  fields:
    - name: name
      type: string
      description: Projector name (NUL-terminated, up to 49 bytes)
    - name: lamp_usage_time
      type: integer
      description: Lamp usage time in seconds (updated at 1-minute intervals)
    - name: filter_usage_time
      type: integer
      description: Filter usage time in seconds

- id: lamp_info
  label: Lamp Info
  type: object
  description: Lamp information from LAMP INFO REQUEST 3 (command 037-4)
  fields:
    - name: usage_time
      type: integer
      description: Lamp usage time in seconds
    - name: remaining_life
      type: integer
      description: Remaining life percentage (-1 if no deadline defined)

- id: model_name
  label: Model Name
  type: string
  description: Model name from MODEL NAME REQUEST (command 078-5)

- id: serial_number
  label: Serial Number
  type: string
  description: Serial number from SERIAL NUMBER REQUEST (command 305-2)

- id: basic_info
  label: Basic Info
  type: object
  description: Basic information from BASIC INFO REQUEST (command 305-3)
  fields:
    - name: operation_status
      type: enum
      values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    - name: content_displayed
      type: enum
      values: [video_signal, no_signal, viewer_displayed, test_pattern, lan_displayed, test_pattern_user, signal_switching]
    - name: video_mute
      type: enum
      values: [off, on]
    - name: sound_mute
      type: enum
      values: [off, on]
    - name: freeze_status
      type: enum
      values: [off, on]
```

## Variables
```yaml
- id: brightness
  label: Brightness
  type: integer
  range: [0, 255]
  default: 128
  description: Picture brightness from GAIN PARAMETER REQUEST 3 (060-1)

- id: contrast
  label: Contrast
  type: integer
  range: [0, 255]
  default: 128
  description: Picture contrast from GAIN PARAMETER REQUEST 3

- id: color
  label: Color
  type: integer
  range: [0, 255]
  default: 128
  description: Picture color from GAIN PARAMETER REQUEST 3

- id: hue
  label: Hue
  type: integer
  range: [0, 255]
  default: 128
  description: Picture hue from GAIN PARAMETER REQUEST 3

- id: sharpness
  label: Sharpness
  type: integer
  range: [0, 255]
  default: 128
  description: Picture sharpness from GAIN PARAMETER REQUEST 3

- id: volume
  label: Volume
  type: integer
  range: [0, 255]
  default: 128
  description: Volume level from GAIN PARAMETER REQUEST 3

- id: lamp_adjust
  label: Lamp Adjust
  type: integer
  range: [0, 255]
  description: Lamp/light adjustment from GAIN PARAMETER REQUEST 3

- id: eco_mode
  label: Eco Mode
  type: enum
  values: [off, auto_eco, normal, eco1, eco2, boost, long_life, silent]
  description: Eco mode from ECO MODE REQUEST (097-8)

- id: projector_name
  label: Projector Name
  type: string
  maxLength: 16
  description: Projector name from LAN PROJECTOR NAME REQUEST (097-45)

- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  values: [off, on]
  description: Edge blending mode from EDGE BLENDING MODE REQUEST (097-243-1)

- id: pip_mode
  label: PIP Mode
  type: enum
  values: [off, pip, picture_by_picture]
  description: PIP/PbP mode from PIP/PICTURE BY PICTURE REQUEST (097-198)
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source.
# Commands do not appear to trigger push-style events; all communication is request/response.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "POWER ON command: While the projector is turning on, no other command can be accepted."
  - description: "POWER OFF command: While the projector is turning off (including cooling time), no other command can be accepted."
  - description: "Some models require specific standby modes to receive commands via serial or LAN. Supported standby modes vary by model."
# UNRESOLVED: power-on sequencing requirements, voltage/current specifications not documented in source
```

## Notes
- Command format: `20h <ID1> <ID2> <LEN> <DATA> <CKS>` — checksum is low-order byte of sum of all preceding bytes
- Response format on success: `A0h/A2h/A3h <ID1> <ID2> <LEN> <DATA/ERR> <CKS>`
- Error codes ERR1/ERR2 provide specific failure reason (see error code table)
- Lens position commands (7Fh/81h) continue driving until stop command (00h) is sent
- Input terminal values vary by model — appendix reference was not included in source
- Standby mode must be configured correctly for serial/LAN control to work (varies by model)
<!-- UNRESOLVED: Input terminal hex code mapping incomplete (varies by model); appendix referenced but not included in source -->
<!-- UNRESOLVED: Aspect mode hex code mapping partial (varies by model); appendix referenced but not included in source -->
<!-- UNRESOLVED: Eco mode hex code mapping varies by model -->
<!-- UNRESOLVED: Selection signal type hex codes vary by model -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:53:38.380Z
last_checked_at: 2026-06-02T22:12:34.441Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:12:34.441Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Appendix \"Supplementary Information by Command\" referenced throughout but not included in source"
- "flow control not documented"
- "no unsolicited event notifications documented in source."
- "no multi-step macro sequences documented in source."
- "power-on sequencing requirements, voltage/current specifications not documented in source"
- "Input terminal hex code mapping incomplete (varies by model); appendix referenced but not included in source"
- "Aspect mode hex code mapping partial (varies by model); appendix referenced but not included in source"
- "Eco mode hex code mapping varies by model"
- "Selection signal type hex codes vary by model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
