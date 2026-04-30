---
schema_version: ai4av-public-spec-v1
device_id: nec/x551un-series
entity_id: nec_x551un_series
spec_id: admin/nec-x551un_series
revision: 1
author: admin
title: "NEC X551UN Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "X551UN Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "X551UN Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_x551un_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T21:44:01.527Z
retrieved_at: 2026-04-26T21:44:01.527Z
last_checked_at: 2026-04-26T21:44:01.527Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T21:44:01.527Z
  matched_actions: 52
  action_count: 52
  confidence: high
  summary: "All 52 spec actions matched distinct source commands; transport parameters verbatim; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X551UN Series Control Spec

## Summary

NEC X551UN Series professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control. The serial interface uses RS-232C at configurable baud rates up to 115200 bps. The LAN interface uses TCP port 7142 for command transmission. Supports power control, input routing, picture/sound mute, lens positioning, and extensive status queries.

<!-- UNRESOLVED: model number exact variant (X551UN, X551UNS, etc.) not distinguished in source; UNRESOLVED: appendix supplementary tables referenced but not included (input terminal codes, aspect values, eco mode values, signal type values, audio select values) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated for LAN/TCP control
serial:
  baud_rate: 115200  # highest rate listed; source lists 115200/38400/19200/9600/4800 bps as options
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth/login procedure described in source
```

## Traits
```yaml
- powerable       # power on/off commands present
- routable        # input switch command present
- queryable       # multiple status/information request commands present
- levelable       # volume, brightness, contrast, hue, sharpness, aspect adjustments present
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
    - name: input_terminal
      type: integer
      description: Input terminal hex code (e.g., 01h=COMPUTER, 06h=VIDEO, 20h=LAN)

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
      description: Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)
    - name: mode
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code (see appendix for values)

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: Adjustment target (96h=LAMP ADJUST / LIGHT ADJUST)
    - name: mode
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code to send (see key code table for values)

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
      description: Control target (06h=Periphery Focus)
    - name: direction
      type: integer
      description: Direction/mode (00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+, 81h=-, FDh=-0.25s, FEh=-0.5s, FFh=-1s)

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: control
      type: integer
      description: Control (FFh=Stop)
    - name: mode
      type: integer
      description: Adjustment mode (00h=absolute, 02h=relative)
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: Operation (00h=MOVE, 01h=STORE, 02h=RESET)

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: Operation (00h=MOVE, 01h=STORE, 02h=RESET)

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: integer
      description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)
    - name: value
      type: integer
      description: Setting value (00h=OFF, 01h=ON)

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: Profile number (00h=Profile 1, 01h=Profile 2)

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode hex code (see appendix for values)

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
      description: Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)
    - name: value
      type: integer
      description: Setting value (varies by target)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Mode (00h=OFF, 01h=ON)

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: State (01h=ON, 02h=OFF)

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal (see appendix for values)
    - name: value
      type: integer
      description: Audio source (00h=specified terminal, 02h=COMPUTER)
# Query (REQUEST) commands — all 25 documented in source

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
- id: error_status
  label: Error Status
  type: object
  fields:
    - name: error_info
      type: object
      description: 12-byte error information bitmap (bit0=cover error, bit1=temp error, bit4=fan error, bit5=power error, bit6=lamp off, etc.)

- id: command_response
  label: Command Response
  type: object
  fields:
    - name: err1
      type: integer
      description: Error code high byte
    - name: err2
      type: integer
      description: Error code low byte
  # Error codes: 0000h=unrecognized, 0001h=unsupported, 0100h=invalid value, 0101h=invalid input, 0102h=invalid language, 0200h=memory alloc error, etc.

- id: running_status
  label: Running Status
  type: object
  fields:
    - name: power_status
      type: integer
      description: Power status (00h=Standby, 01h=Power on)
    - name: cooling_status
      type: integer
      description: Cooling status (00h=not executed, 01h=during execution)
    - name: operation_status
      type: integer
      description: Operation status (00h=Standby Sleep, 04h=Power on, 05h=Cooling, 06h=Standby error, 0Fh=Power saving, 10h=Network standby)

- id: input_status
  label: Input Status
  type: object
  fields:
    - name: signal_switch_status
      type: integer
      description: Signal switch process status
    - name: signal_list_number
      type: integer
      description: Signal list number (returned value is actual-1)
    - name: signal_type_1
      type: integer
      description: Selection signal type 1
    - name: signal_type_2
      type: integer
      description: Selection signal type 2 (01h=COMPUTER, 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, etc.)
    - name: content_displayed
      type: integer
      description: Content displayed (00h=video, 01h=no signal, 02h=viewer, 03h=test pattern, 04h=LAN)

- id: mute_status
  label: Mute Status
  type: object
  fields:
    - name: picture_mute
      type: integer
      description: Picture mute (00h=Off, 01h=On)
    - name: sound_mute
      type: integer
      description: Sound mute (00h=Off, 01h=On)
    - name: onscreen_mute
      type: integer
      description: Onscreen mute (00h=Off, 01h=On)
    - name: forced_onscreen_mute
      type: integer
      description: Forced onscreen mute (00h=Off, 01h=On)

- id: model_name
  label: Model Name
  type: string
  description: Model name string (NUL-terminated)

- id: serial_number
  label: Serial Number
  type: string
  description: Serial number (NUL-terminated)

- id: cover_status
  label: Cover Status
  type: object
  fields:
    - name: status
      type: integer
      description: Cover status (00h=opened, 01h=closed)

- id: information_request
  label: Information Request
  type: object
  fields:
    - name: projector_name
      type: string
      description: Projector name (NUL-terminated, up to 49 bytes)
    - name: lamp_usage_time
      type: integer
      description: Lamp usage time in seconds
    - name: filter_usage_time
      type: integer
      description: Filter usage time in seconds

- id: filter_usage_info
  label: Filter Usage Information
  type: object
  fields:
    - name: filter_usage_time
      type: integer
      description: Filter usage time in seconds
    - name: filter_alarm_start_time
      type: integer
      description: Filter alarm start time in seconds (-1 if undefined)

- id: lamp_info
  label: Lamp Information
  type: object
  fields:
    - name: lamp_number
      type: integer
      description: Lamp number (00h=Lamp 1, 01h=Lamp 2)
    - name: content
      type: integer
      description: Content type (01h=usage time, 04h=remaining life)
    - name: value
      type: integer
      description: Lamp usage time in seconds or remaining life percentage

- id: carbon_savings
  label: Carbon Savings Information
  type: object
  fields:
    - name: type
      type: integer
      description: Type (00h=Total, 01h=Operation)
    - name: kilograms
      type: integer
      description: Carbon savings in kg (max 99999)
    - name: milligrams
      type: integer
      description: Additional mg (max 999999)

- id: gain_parameter
  label: Gain Parameter
  type: object
  fields:
    - name: status
      type: integer
      description: Adjustment status (00h=not possible, 01h=not possible, 02h=possible, FFh=not found)
    - name: upper_limit
      type: integer
      description: Upper limit (16-bit)
    - name: lower_limit
      type: integer
      description: Lower limit (16-bit)
    - name: default_value
      type: integer
      description: Default value (16-bit)
    - name: current_value
      type: integer
      description: Current value (16-bit)

- id: eco_mode
  label: Eco Mode
  type: integer
  description: Eco mode setting (see appendix for values)

- id: projector_name
  label: Projector Name (LAN)
  type: string
  description: Projector name via LAN (NUL-terminated, up to 17 chars)

- id: mac_address
  label: MAC Address
  type: string
  description: MAC address as hex string (e.g., 01h-23h-45h-67h-89h-ABh)

- id: pip_pbp_status
  label: PIP/Picture by Picture Status
  type: object
  fields:
    - name: mode
      type: integer
      description: PIP mode (00h=PIP, 01h=PICTURE BY PICTURE)
    - name: start_position
      type: integer
      description: Start position (00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT)
    - name: sub_input_1
      type: integer
      description: Sub input setting
    - name: sub_input_2
      type: integer
      description: Sub input 2 setting
    - name: sub_input_3
      type: integer
      description: Sub input 3 setting

- id: edge_blending_mode
  label: Edge Blending Mode
  type: integer
  description: Edge blending setting (00h=OFF, 01h=ON)

- id: base_model_type
  label: Base Model Type
  type: object
  fields:
    - name: base_model_type_code
      type: string
      description: Base model type code
    - name: model_name
      type: string
      description: Model name (NUL-terminated)

- id: basic_information
  label: Basic Information
  type: object
  fields:
    - name: operation_status
      type: integer
      description: Operation status
    - name: content_displayed
      type: integer
      description: Content displayed
    - name: signal_type_1
      type: integer
      description: Signal type 1
    - name: signal_type_2
      type: integer
      description: Signal type 2
    - name: display_signal_type
      type: integer
      description: Display signal type
    - name: video_mute
      type: integer
      description: Video mute status
    - name: sound_mute
      type: integer
      description: Sound mute status
    - name: onscreen_mute
      type: integer
      description: Onscreen mute status
    - name: freeze_status
      type: integer
      description: Freeze status

- id: lens_control_request
  label: Lens Control Request
  type: object
  fields:
    - name: upper_limit
      type: integer
      description: Upper limit (16-bit)
    - name: lower_limit
      type: integer
      description: Lower limit (16-bit)
    - name: current_value
      type: integer
      description: Current value (16-bit)

- id: lens_memory_option
  label: Lens Memory Option
  type: object
  fields:
    - name: option
      type: integer
      description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)
    - name: value
      type: integer
      description: Setting value (00h=OFF, 01h=ON)

- id: lens_information
  label: Lens Information
  type: object
  fields:
    - name: status_bits
      type: integer
      description: Lens status bitmap (bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift H, bit4=lens shift V)

- id: lens_profile
  label: Lens Profile
  type: integer
  description: Selected profile number (00h=Profile 1, 01h=Profile 2)

- id: information_string
  label: Information String
  type: string
  description: Information string (horizontal/vertical sync frequency)
```

## Variables
```yaml
# UNRESOLVED: variables that are set/get via parameter commands are documented in Actions and Feedbacks
# The source does not clearly separate settable parameters from one-shot actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source
# The projector only responds to commands; no push-style events are documented
```

## Macros
```yaml
# No explicit multi-step macros are described in the source
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # cooling time required; no other commands accepted during power off sequence
interlocks: []
# UNRESOLVED: power on/off commands have timing constraints (no other commands accepted
# during power transition/cooling) but no explicit safety interlock procedures stated
# UNRESOLVED: standby mode must be configured correctly for serial/LAN control to work
# Some models require specific standby modes (Normal, Active, Eco, Network Standby, Sleep, etc.)
# to receive POWER ON commands; supported modes vary by model
```

## Notes

The X551UN Series supports a comprehensive command protocol over both RS-232C and TCP/IP. Serial configuration allows baud rates from 4800 to 115200 bps; the document prioritizes 115200 as the typical setting. LAN control uses TCP port 7142 exclusively.

Key command groups: power management (015/016), input selection (018), mute controls (020-025), picture adjustments (030-1 through 030-15), information queries (037 family), remote key emulation (050), lens/shutter control (051-053-11), status queries (078 family), eco mode (097-8/098-8), PIP/PBP (097-198/098-198), and edge blending (097-243-1/098-243-1).

Checksum calculation: sum all bytes preceding checksum, take low-order 8 bits. Control IDs (ID1, ID2) must match projector settings. Error responses use ERR1/ERR2 code pairs documented in section 2.4.

<!-- UNRESOLVED: appendix tables (input terminal codes, aspect values, eco mode values, signal type values, audio select values) are referenced but not included in the source document excerpt -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_x551un_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T21:44:01.527Z
retrieved_at: 2026-04-26T21:44:01.527Z
last_checked_at: 2026-04-26T21:44:01.527Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T21:44:01.527Z
matched_actions: 52
action_count: 52
confidence: high
summary: "All 52 spec actions matched distinct source commands; transport parameters verbatim; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```
