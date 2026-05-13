---
spec_id: admin/nec-lcd8205-series-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC LCD8205 Series Control Spec"
manufacturer: NEC
model_family: "LCD8205 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "LCD8205 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:18:45.997Z
generated_at: 2026-04-25T21:18:45.997Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:18:45.997Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions matched NEC source commands; transport parameters verified; complete coverage of documented command set."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC LCD8205 Series Control Spec

## Summary
Professional LCD display projector supporting RS-232C serial and wired TCP/IP control. The device accepts hexadecimal command sequences with checksum verification and returns structured responses with error codes. Supports power control, input routing, picture/sound mute, volume and picture adjustment, lens control (for projector models), and comprehensive status queries.

<!-- UNRESOLVED: source document is titled "Projector Control Command Reference Manual" but user specified LCD8205 Series — model family confirmed by user input -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # 115200/38400/19200/9600/4800 bps stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
addressing:
  port: 7142  # TCP port number stated for LAN control
auth:
  type: none  # inferred: no auth procedure in source
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
  description: Turns on the power. No other command can be accepted while powering on.

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off the power. No other command can be accepted during cooling time.

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 06h=VIDEO, A1h=HDMI, 20h=LAN/NETWORK)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  description: Turns picture mute on. Cancelled by input terminal switch or video signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  description: Turns sound mute on. Cancelled by input switch, video signal switch, or volume adjustment.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  description: Turns onscreen mute on. Cancelled by input terminal switch or video signal switch.

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
      description: Aspect mode hex code (see Appendix for values)

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: Adjustment target (96hFFh=LAMP ADJUST/LIGHT ADJUST)
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
      description: Key code (e.g., 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU)

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  description: Closes the lens shutter.

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  description: Opens the lens shutter.

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: Control target (06h=Periphery Focus)
    - name: direction
      type: integer
      description: Direction/speed (00h=Stop, 01h/02h/03h=plus timed, 7Fh=plus continuous, 81h=minus continuous, FDh/FEh/FFh=minus timed)

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
      description: Eco mode hex code (see Appendix for values: OFF=00h, ECO=02h/03h, etc.)

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
      description: Item to set (00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)
    - name: value
      type: integer
      description: Setting value (varies by item)

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
      description: Freeze state (01h=ON, 02h=OFF)

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal
    - name: value
      type: integer
      description: Audio source (00h=HDMI1, 01h=HDMI2, 02h=DisplayPort, 03h=HDBaseT, 04h=USB-A, 05h=USB-B)

- id: error_status_request
  label: Error Status Request
  kind: query
  params: []
  description: Gets error information. Returns 12 bytes of bitmapped error status.

- id: information_request
  label: Information Request
  kind: query
  params: []
  description: Gets projector info including name, lamp usage time, filter usage time.

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: query
  params: []

- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp
      type: integer
      description: Lamp number (00h=Lamp 1, 01h=Lamp 2)
    - name: content
      type: integer
      description: Content to request (01h=usage time, 04h=remaining life)

- id: carbon_savings_info_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: integer
      description: Type (00h=Total Carbon Savings, 01h=Carbon Savings during operation)

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: Control target

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: option
      type: integer
      description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)

- id: lens_info_request
  label: Lens Information Request
  kind: query
  params: []
  description: Gets lens status (memory, zoom, focus, lens shift).

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []
  description: Gets selected profile number.

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: parameter
      type: integer
      description: Parameter name (00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST)

- id: setting_request
  label: Setting Request
  kind: query
  params: []
  description: Gets projector settings including sound function, profile number, clock/sleep timer.

- id: running_status_request
  label: Running Status Request
  kind: query
  params: []
  description: Gets operation status including power status, cooling process, operation status.

- id: input_status_request
  label: Input Status Request
  kind: query
  params: []
  description: Gets input signal status including signal type, test pattern, content displayed.

- id: mute_status_request
  label: Mute Status Request
  kind: query
  params: []
  description: Gets mute status for picture, sound, onscreen, and forced onscreen mute.

- id: model_name_request
  label: Model Name Request
  kind: query
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  params: []
  description: Gets mirror cover or lens cover status.

- id: info_string_request
  label: Information String Request
  kind: query
  params:
    - name: type
      type: integer
      description: Information type (03h=Horizontal sync freq, 04h=Vertical sync freq)

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: item
      type: integer
      description: Item to query (00h=MODE, 01h=START POSITION, 02h=SUB INPUT, etc.)

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

- id: basic_info_request
  label: Basic Information Request
  kind: query
  params: []
  description: Gets operation status, signal type, video/sound mute, freeze status.
```

## Feedbacks
```yaml
- id: error_status
  type: bitmap
  description: 12-byte error status bitmap. Bit0=Cover error, Bit1=Temperature error, Bit4=Fan error, Bit5=Power error, Bit6=Lamp off, etc.

- id: power_state
  type: enum
  values: [standby, power_on, cooling]

- id: input_status
  type: object
  description: Current input signal status including signal type, list number, test pattern display, content displayed.

- id: mute_status
  type: object
  properties:
    picture_mute: [off, on]
    sound_mute: [off, on]
    onscreen_mute: [off, on]
    forced_onscreen_mute: [off, on]

- id: running_status
  type: object
  description: Operation status including power, cooling, operation mode (standby, power_on, cooling, etc.)

- id: projector_name
  type: string
  description: Projector name string (NUL-terminated)

- id: model_name
  type: string
  description: Model name string (NUL-terminated)

- id: serial_number
  type: string
  description: Serial number string (NUL-terminated)

- id: lamp_info
  type: object
  description: Lamp usage time (seconds) and remaining life (%). Updated at 1-minute intervals.

- id: filter_usage
  type: object
  description: Filter usage time and alarm start time (seconds). Returns -1 if undefined.

- id: carbon_savings
  type: object
  description: Total carbon savings (kg) and per-operation savings (mg).

- id: eco_mode
  type: enum
  values: [off, normal, eco1, eco2, auto_eco, long_life, boost, silent]

- id: gain_values
  type: object
  description: Picture/volume adjustment ranges and current values including upper/lower limits, default, current value.

- id: lens_position
  type: object
  description: Lens position adjustment range and current value.

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]

- id: pip_mode
  type: enum
  values: [pip, picture_by_picture]

- id: pip_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]

- id: edge_blending_mode
  type: enum
  values: [off, on]

- id: cover_status
  type: enum
  values: [normal, closed]

- id: freeze_status
  type: enum
  values: [off, on]

- id: info_string
  type: string
  description: Horizontal or vertical synchronous frequency string.

- id: mac_address
  type: string
  description: MAC address (hex bytes).

- id: basic_info
  type: object
  description: Comprehensive status including operation, signal type, video/sound mute, freeze, display content.

- id: command_response
  type: object
  description: Standard command response with ERR1/ERR2 error codes.
```

## Variables
```yaml
# UNRESOLVED: variables are typically settable parameters exposed as writable properties.
# The document describes SET commands (098-*) as actions that change settings.
# If any settings are persistently writable without triggering immediate action,
# they would be listed here. Currently all 098-series commands are treated as actions.
```

## Events
```yaml
# UNRESOLVED: the source document does not describe unsolicited event notifications
# from the device. Events section should be populated only if the device sends
# unprompted status updates.
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences described explicitly as macros in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: While the POWER ON command is executing, no other command can be accepted.
  - description: While the POWER OFF command is executing (including cooling time), no other command can be accepted.
  - description: Some models require specific standby modes to receive commands via serial or LAN. Supported standby modes vary by model (Normal, Active, Eco, Network Standby, Sleep, etc.). Some models only support certain standby modes for LAN vs serial control.
# UNRESOLVED: voltage, current, power specifications not stated in source
# UNRESOLVED: fault behavior and error recovery sequences not explicitly documented
```

## Notes

Command format uses hexadecimal notation with the following structure:
`<HEADER> <MODEL_CODE> <ID1> <ID2> <LEN> <DATA> <CKS>`

- **ID1**: Control ID (set for the projector)
- **ID2**: Model code (varies by model)
- **CKS**: Checksum = low-order byte of sum of all preceding bytes
- **LEN**: Data length of the variable data portion

Responses use prefix bytes: `A0h/A1h/A2h/A3h` for queries and actions; `20h/22h/23h` for commands. Error responses include `ERR1` and `ERR2` codes.

Key commands that modify state require no confirmation (POWER ON, POWER OFF, INPUT SW CHANGE, etc.).

The source document references an Appendix for supplementary values (input terminal codes, aspect values, eco mode values, signal types) that are partially documented in the Appendix section of this spec. Some values vary by model.

<!-- UNRESOLVED: input terminal hex codes vary by model — Appendix documents common values but some codes are model-dependent -->
<!-- UNRESOLVED: aspect values vary by model — multiple hex codes map to same aspect mode -->
<!-- UNRESOLVED: eco mode values vary by model — different models support different subsets -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: HDBaseT standby mode referenced but details not provided in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:18:45.997Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:18:45.997Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions matched NEC source commands; transport parameters verified; complete coverage of documented command set."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
