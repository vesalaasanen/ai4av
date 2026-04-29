---
schema_version: ai4av-public-spec-v1
device_id: nec/np-px803ul-wh-series
entity_id: nec_np_px803ul_wh_series
spec_id: admin/nec-np-px803ul-wh-series
revision: 1
author: admin
title: "NEC NP-PX803UL-WH Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "NP-PX803UL-WH Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NP-PX803UL-WH Series"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_np_px803ul_wh_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:21:22.269Z
retrieved_at: 2026-04-25T21:21:22.269Z
last_checked_at: 2026-04-25T21:21:22.269Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:21:22.269Z
  matched_actions: 48
  action_count: 48
  confidence: high
  summary: "All 48 spec actions matched verbatim to NEC PX803UL-WH serial source commands; transport parameters verified; no drift or fabrication."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC NP-PX803UL-WH Series Control Spec

## Summary
Professional laser projector supporting RS-232C serial and wired TCP/IP control. Supports power management, input routing, picture/sound mute, volume, lens control with memory, eco mode, and comprehensive status monitoring via query commands. Protocol uses proprietary hex-based command format with checksum validation.

<!-- UNRESOLVED: LAN port number (7142) stated for TCP/IP; serial baud rate options (115200/38400/19200/9600/4800) stated but specific rate must be configured by user -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # 115200/38400/19200/9600/4800 bps selectable
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
- powerable       # POWER ON/OFF commands present
- routable        # INPUT SW CHANGE command present
- queryable       # INFORMATION REQUEST, STATUS REQUEST commands present
- levelable       # VOLUME ADJUST, PICTURE ADJUST commands present
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
      description: Input terminal hex code (e.g., 01h=COMPUTER, 06h=VIDEO, A1h=HDMI)

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
      description: Volume value (16-bit)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code (00h=AUTO, 01h=WIDE ZOOM, 02h=16:9, etc.)

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Remote control key code (e.g., 02h=POWER ON, 03h=POWER OFF, 0Ah=LEFT, 0Bh=RIGHT)

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
      description: Lens target (06h=Periphery Focus)
    - name: direction
      type: integer
      description: Direction/speed (00h=Stop, 01h/02h/03h=plus, 7Fh=continuous plus, 81h=continuous minus, FDh/FEh/FFh=minus)

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: Command (FFh=Stop)
    - name: mode
      type: integer
      description: Mode (00h=absolute, 02h=relative)
    - name: value
      type: integer
      description: Position value (16-bit)

- id: lens_memory_control
  label: Lens Memory Control
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
      description: Setting (00h=OFF, 01h=ON)

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: Profile number (00h=Profile 1, 01h=Profile 2)

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: Freeze state (01h=On, 02h=Off)

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode hex code (00h=OFF, 01h=ON/NORMAL, 02h/03h=ECO, etc.)

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
      description: Item (00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)
    - name: value
      type: integer
      description: Setting value

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Edge blending mode (00h=OFF, 01h=ON)

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code
    - name: source
      type: integer
      description: Audio source (00h=HDMI1, 01h=HDMI2, 02h=DisplayPort, etc.)

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

- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp
      type: integer
      description: Lamp number (00h=Lamp 1, 01h=Lamp 2)
    - name: content
      type: integer
      description: Content type (01h=Lamp usage time, 04h=Lamp remaining life)

- id: carbon_savings_request
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
      description: Lens target (06h=Periphery Focus)

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: option
      type: integer
      description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []

- id: lens_info_request
  label: Lens Information Request
  kind: query
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: target
      type: integer
      description: Adjusted value name (00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST)

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
    - name: type
      type: integer
      description: Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency)

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []

- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: query
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: item
      type: integer
      description: Item (00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)

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
# Error responses use ERR1/ERR2 codes:
# 00h/00h: Command not recognized
# 00h/01h: Command not supported by model
# 01h/00h: Invalid value
# 01h/01h: Invalid input terminal
# 01h/02h: Invalid language
# 02h/00h: Memory allocation error
# 02h/02h: Memory in use
# 02h/03h: Value cannot be set
# 02h/06h: Viewer error
# 02h/07h: No signal
# 02h/08h: Test pattern or filter displayed
# 02h/0Dh: Power is off
# 02h/0Eh: Command execution failed
# 02h/0Fh: No authority
# 03h/00h: Incorrect gain number
# 03h/01h: Invalid gain
# 03h/02h: Adjustment failed
```

## Variables
```yaml
# UNRESOLVED: settable parameters that are not discrete actions are covered by
# action params; no separate Variables section needed based on source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for:
  - power_on   # "While this command is turning on the power, no other command can be accepted"
  - power_off  # "While this command is turning off the power (including the cooling time), no other command can be accepted"
interlocks:
  - "Input terminal switch or video signal switch turns off picture mute"
  - "Input terminal switch, video signal switch, or sound volume adjustment turns off sound mute"
  - "Input terminal switch or video signal switch turns off onscreen mute"
  - "Sending Stop (00h) after continuous lens drive (7Fh/81h) stops lens motion"
  # UNRESOLVED: specific standby mode requirements vary by model; some require specific standby modes for serial vs LAN control
```

## Notes
- Command format: `20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>` with checksum calculated as low-order byte of sum of all preceding bytes
- Response format varies by command type (22h, 23h, A0h, A2h, A3h prefixes)
- ID1 = Control ID set on projector; ID2 = Model code (varies by model)
- Serial connection uses D-SUB 9P with RxD/TxD/GND/RTS/CTS pins wired straight-through (not crossed)
- Lamp and filter usage times update at 1-minute intervals despite 1-second resolution
- <!-- UNRESOLVED: Input terminal hex codes vary by model (documented in appendix as common values); aspect adjustment values vary -->
- <!-- UNRESOLVED: Specific standby mode required for command acceptance varies by model; source lists options but does not specify which is required -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_np_px803ul_wh_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:21:22.269Z
retrieved_at: 2026-04-25T21:21:22.269Z
last_checked_at: 2026-04-25T21:21:22.269Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:21:22.269Z
matched_actions: 48
action_count: 48
confidence: high
summary: "All 48 spec actions matched verbatim to NEC PX803UL-WH serial source commands; transport parameters verified; no drift or fabrication."
```

## Known Gaps

```yaml
[]
```
