---
spec_id: admin/nec-xr4_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC XR4 Series Control Spec"
manufacturer: NEC
model_family: "XR4 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "XR4 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-26T20:10:49.317Z
last_checked_at: 2026-05-31T06:54:47.800Z
generated_at: 2026-05-31T06:54:47.800Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "wireless LAN spec not detailed in source; model number exact match not confirmed"
  - "no standalone variable parameters outside of action/feedback flow; all settable params are action-driven"
  - "no unsolicited event notifications described in source; device only responds to commands"
  - "no multi-step macro sequences documented in source"
  - "wireless LAN unit manual reference only; TCP port 7142 stated for LAN but serial must be manually configured at one of 5 baud rates; firmware version compatibility not stated; input terminal value mappings deferred to appendix not included in source"
verification:
  verdict: verified
  checked_at: 2026-05-31T06:54:47.800Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match their source counterparts; all transport parameters verified in source documentation. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# NEC XR4 Series Control Spec

## Summary
NEC XR4 Series data projector supporting RS-232C serial and wired LAN (TCP/IP) control. Supports power, input routing, picture/sound mute, lens positioning, eco mode, and comprehensive query commands. No login or password required.
<!-- UNRESOLVED: wireless LAN spec not detailed in source; model number exact match not confirmed -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port for LAN commands; serial uses standard RS-232C
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # auto-selectable per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
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
- id: error_status_request
  label: Error Status Request
  kind: query
  params: []

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
      description: Input terminal value (see appendix for mapping)

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
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value (low-order byte then high-order byte)"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value (low-order byte then high-order byte)"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_value
      type: integer
      description: Aspect value (see appendix for mapping)

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value (low-order byte then high-order byte)"

- id: information_request
  label: Information Request
  kind: query
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp_number
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code per key code list (e.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, etc.)"

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
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous+, 81h=continuous-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: control
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute value, 02h=Relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value"

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

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

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

- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile_number
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: adjusted_value_name
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

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

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  params:
    - name: information_type
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

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: eco_value
      type: integer
      description: Eco mode value (see appendix for mapping)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: projector_name
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value (see appendix for mapping)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

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

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal (see appendix for mapping)
    - name: setting_value
      type: integer
      description: "00h=Terminal specified in DATA01, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: command_execution_result
  type: enum
  values: [success, error]
  description: "ERR1/ERR2 error code response; 00h/00h=success"

- id: error_status
  type: bitfield
  description: "12-byte error information bitfield (see error code list)"

- id: power_status
  type: enum
  values: [standby, power_on, cooling]
  description: "From RUNNING STATUS REQUEST"

- id: input_status
  type: object
  description: "Input signal status from 078-3 request (signal list number, signal type, etc.)"

- id: mute_status
  type: object
  description: "Picture mute, sound mute, onscreen mute, forced onscreen mute status"

- id: model_name
  type: string
  description: "Model name string from 078-5 request"

- id: serial_number
  type: string
  description: "Serial number from 305-2 request"

- id: lamp_info
  type: object
  description: "Lamp usage time (seconds) and remaining life (%) from 037-4 request"

- id: filter_usage_info
  type: object
  description: "Filter usage time and alarm start time from 037-3 request"

- id: carbon_savings
  type: object
  description: "Carbon savings in kg and mg from 037-6 request"

- id: eco_mode
  type: integer
  description: "Eco mode value from 097-8 request"

- id: projector_name
  type: string
  description: "LAN projector name from 097-45 request"

- id: mac_address
  type: string
  description: "MAC address from 097-155 request"

- id: pip_pbp_status
  type: object
  description: "PIP/PBP mode, position, sub-input settings from 097-198 request"

- id: edge_blending_status
  type: enum
  values: [off, on]
  description: "Edge blending mode from 097-243-1 request"

- id: lens_info
  type: bitfield
  description: "Lens memory, zoom, focus, shift status from 053-7 request"

- id: lens_position
  type: object
  description: "Adjustment range and current value from 053-1 request"

- id: gain_parameters
  type: object
  description: "Adjustment range, default, current value, width from 060-1 request"

- id: information_strings
  type: object
  description: "Horizontal/vertical sync frequency strings from 084 request"

- id: basic_info
  type: object
  description: "Operation status, signal type, mute states from 305-3 request"

- id: cover_status
  type: enum
  values: [normal, cover_closed]
  description: "Cover status from 078-6 request"
```

## Variables
```yaml
# UNRESOLVED: no standalone variable parameters outside of action/feedback flow; all settable params are action-driven
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source; device only responds to commands
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON command: while turning on, no other command can be accepted"
  - "POWER OFF command: while turning off (including cooling), no other command can be accepted"
  - "Lens control: after sending continuous drive (7Fh/81h), send 00h to stop"
  - "INTERLOCK SWITCH OPEN (DATA09 Bit1): safety interlock indicated in error status"
```
<!-- UNRESOLVED: wireless LAN unit manual reference only; TCP port 7142 stated for LAN but serial must be manually configured at one of 5 baud rates; firmware version compatibility not stated; input terminal value mappings deferred to appendix not included in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-26T20:10:49.317Z
last_checked_at: 2026-05-31T06:54:47.800Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T06:54:47.800Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match their source counterparts; all transport parameters verified in source documentation. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wireless LAN spec not detailed in source; model number exact match not confirmed"
- "no standalone variable parameters outside of action/feedback flow; all settable params are action-driven"
- "no unsolicited event notifications described in source; device only responds to commands"
- "no multi-step macro sequences documented in source"
- "wireless LAN unit manual reference only; TCP port 7142 stated for LAN but serial must be manually configured at one of 5 baud rates; firmware version compatibility not stated; input terminal value mappings deferred to appendix not included in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
