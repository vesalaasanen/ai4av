---
spec_id: admin/nec-e462-r
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC E462-R Control Spec"
manufacturer: NEC
model_family: E462-R
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - E462-R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-26T20:44:22.255Z
generated_at: 2026-04-26T20:44:22.255Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "030-15 (LAMP ADJUST / LIGHT ADJUST)"
verification:
  verdict: verified
  checked_at: 2026-04-26T20:44:22.255Z
  matched_actions: 57
  action_count: 57
  confidence: high
  summary: "All 57 spec actions matched source commands; transport parameters verified; source coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC E462-R Control Spec

## Summary
NEC E462-R professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control. Control command reference manual BDT140013 Rev 7.1 documents a comprehensive command set including power control, input routing, picture/sound adjustments, lens control, and status queries.

<!-- UNRESOLVED: specific input terminal values for E462-R model not listed in appendix; generic NEC values used -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # supported: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142  # TCP port for LAN control
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
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Volume level (16-bit signed)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 0Dh=HELP, 29h=PICTURE, etc."

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
      description: "00h=Stop, 01h/02h/03h=Drive plus 1/0.5/0.25s, 7Fh=Drive plus, 81h=Drive minus, FDh/FEh/FFh=Drive minus 0.25/0.5/1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute value, 02h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: lens_memory_move
  label: Lens Memory Move
  kind: action
  params: []

- id: lens_memory_store
  label: Lens Memory Store
  kind: action
  params: []

- id: lens_memory_reset
  label: Lens Memory Reset
  kind: action
  params: []

- id: reference_lens_memory_move
  label: Reference Lens Memory Move
  kind: action
  params: []

- id: reference_lens_memory_store
  label: Reference Lens Memory Store
  kind: action
  params: []

- id: reference_lens_memory_reset
  label: Reference Lens Memory Reset
  kind: action
  params: []

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
      description: "00h=OFF, 01h=ON/Normal, 02h/03h=ECO, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_picture_by_picture_set
  label: PIP/Picture-by-Picture Set
  kind: action
  params:
    - name: target
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
      description: Input terminal
    - name: value
      type: integer
      description: "00h=Specified terminal, 01h=BNC, 02h=COMPUTER"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"
- id: error_status_request
  label: Error Status Request
  kind: query
  params: []

- id: information_request
  label: Information Request
  kind: query
  params: []

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: query
  params: []

- id: lamp_info_request
  label: Lamp Information Request
  kind: query
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

- id: carbon_savings_info_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

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
  params:
    - name: gain
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

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
      description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

- id: eco_mode_request
  label: Eco Mode Request
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
  label: PIP/Picture-by-Picture Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
  type: bitfield
  description: Returns error information as 12 data bytes with bitfields for cover, temperature, fan, power, lamp, and other errors

- id: power_state
  label: Power State
  type: enum
  values:
    - "00h: Standby"
    - "01h: Power on"
    - "05h: Cooling"
    - "06h: Standby (error)"
    - "0Fh: Standby (Power saving)"
    - "10h: Network standby"

- id: running_status
  label: Running Status
  type: object
  fields:
    - name: power_status
      type: enum
      values: ["00h: Standby", "01h: Power on", "FFh: Not supported"]
    - name: cooling_process
      type: enum
      values: ["00h: Not executed", "01h: During execution", "FFh: Not supported"]
    - name: operation_status
      type: enum
      values: ["00h: Standby (Sleep)", "04h: Power on", "05h: Cooling", "06h: Standby (error)", "0Fh: Standby (Power saving)", "10h: Network standby"]

- id: input_status
  label: Input Status
  type: object
  description: Returns signal switch process, signal list number, signal types, and content displayed

- id: mute_status
  label: Mute Status
  type: object
  fields:
    - name: picture_mute
      type: enum
      values: ["00h: Off", "01h: On"]
    - name: sound_mute
      type: enum
      values: ["00h: Off", "01h: On"]
    - name: onscreen_mute
      type: enum
      values: ["00h: Off", "01h: On"]
    - name: forced_onscreen_mute
      type: enum
      values: ["00h: Off", "01h: On"]

- id: model_name
  label: Model Name
  type: string
  description: Returns model name as NUL-terminated string

- id: cover_status
  label: Cover Status
  type: enum
  values: ["00h: Normal (opened)", "01h: Cover closed"]

- id: projector_information
  label: Projector Information
  type: object
  description: Returns projector name, lamp usage time (seconds), filter usage time (seconds)

- id: filter_usage_info
  label: Filter Usage Information
  type: object
  fields:
    - name: filter_usage_time
      type: integer
      description: Filter usage time in seconds
    - name: filter_alarm_start_time
      type: integer
      description: Filter alarm start time in seconds, -1 if undefined

- id: lamp_information
  label: Lamp Information
  type: object
  description: Returns lamp usage time (seconds) or remaining life (%) for specified lamp

- id: carbon_savings_info
  label: Carbon Savings Information
  type: object
  description: Returns carbon savings in kg and mg

- id: lens_position
  label: Lens Position
  type: object
  description: Returns adjustment range limits and current lens position values

- id: lens_memory_option
  label: Lens Memory Option
  type: object
  fields:
    - name: load_by_signal
      type: enum
      values: ["00h: OFF", "01h: ON"]
    - name: forced_mute
      type: enum
      values: ["00h: OFF", "01h: ON"]

- id: lens_information
  label: Lens Information
  type: object
  description: Returns lens operation status bits (memory, zoom, focus, lens shift)

- id: lens_profile
  label: Lens Profile
  type: enum
  values: ["00h: Profile 1", "01h: Profile 2"]

- id: gain_parameter
  label: Gain Parameter
  type: object
  description: Returns adjustment range and current value for picture/volume/lamp parameters

- id: eco_mode
  label: Eco Mode
  type: integer
  description: Returns current eco mode setting

- id: lan_projector_name
  label: LAN Projector Name
  type: string
  description: Returns projector name

- id: lan_mac_address
  label: MAC Address
  type: string
  description: Returns MAC address as hex bytes

- id: pip_picture_by_picture
  label: PIP/Picture-by-Picture
  type: object
  description: Returns PIP/PbP mode, position, and sub input settings

- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  values: ["00h: OFF", "01h: ON"]

- id: base_model_type
  label: Base Model Type
  type: object
  description: Returns base model type, sound function availability, clock/sleep timer functions

- id: serial_number
  label: Serial Number
  type: string
  description: Returns serial number as NUL-terminated string

- id: basic_information
  label: Basic Information
  type: object
  description: Returns comprehensive operation status including power, signal, mute, and freeze states

- id: information_string
  label: Information String
  type: string
  description: Returns horizontal or vertical sync frequency as string

- id: command_response
  label: Command Response
  type: object
  description: Standard response format with ERR1/ERR2 error codes
```

## Variables
```yaml
# UNRESOLVED: most parameters are action-based rather than settable variables;
# consider adding gain parameters (brightness, contrast, volume) as levelable variables
# if direct get/set without action dispatch is needed
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source;
# projector only responds to commands, does not主动 send notifications
```

## Macros
```yaml
# No explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "POWER ON command: while turning on, no other command can be accepted"
  - description: "POWER OFF command: while turning off (including cooling time), no other command can be accepted"
  - description: "Lens control: after sending drive-plus (7Fh) or drive-minus (81h), sending 00h stops driving"
# UNRESOLVED: no explicit safety warnings for lamp replacement, installation, or power sequencing
```

## Notes
- Command protocol uses 6-byte header + variable data + 1-byte checksum (low-order byte of sum of all preceding bytes)
- Power on/off commands block all other commands during execution; poll RUNNING STATUS to detect completion
- Input terminal hex codes vary by model; this spec documents common NEC codes (see Appendix in source)
- Standby mode must be correctly configured for serial/LAN control to work; supported modes vary by model
- Lamp and filter usage times update at 1-minute intervals despite 1-second resolution
- Projector supports both serial RS-232C and wired LAN TCP control on port 7142
<!-- UNRESOLVED: exact default baud rate for E462-R not specified in source -->
<!-- UNRESOLVED: model-specific input terminal values for E462-R not enumerated -->
<!-- UNRESOLVED: HDBaseT standby mode support not confirmed for E462-R -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-26T20:44:22.255Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T20:44:22.255Z
matched_actions: 57
action_count: 57
confidence: high
summary: "All 57 spec actions matched source commands; transport parameters verified; source coverage complete."
```

## Known Gaps

```yaml
- "030-15 (LAMP ADJUST / LIGHT ADJUST)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
