---
spec_id: admin/nec-xm29_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC XM29 Series Control Spec"
manufacturer: NEC
model_family: "XM29 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "XM29 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-26T21:32:07.102Z
generated_at: 2026-04-26T21:32:07.102Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T21:32:07.102Z
  matched_actions: 49
  action_count: 49
  confidence: high
  summary: "All 49 spec actions matched source; transport verified"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# NEC XM29 Series Control Spec

## Summary
NEC XM29 Series projector supporting both RS-232 serial and wired TCP/IP control interfaces. TCP port 7142 is used for LAN command communication. Serial supports multiple baud rates (115200/38400/19200/9600/4800 bps), 8 data bits, no parity, 1 stop bit. Commands include power control, input routing, picture/sound mute, lens positioning, and extensive status querying.

<!-- UNRESOLVED: wireless LAN unit commands not documented in source; UNRESOLVED: eco mode / lamp mode values not enumerated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: 115200  # stated: supports 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# UNRESOLVED: populate from source
# Based on command presence:
# - powerable: commands 015 (POWER ON), 016 (POWER OFF)
# - routable: command 018 (INPUT SW CHANGE)
# - queryable: commands 009, 037, 037-3, 037-4, 037-6, 078-1 through 078-6, 084, 097-8, 097-45, 097-155, 097-198, 097-243-1, 305-1, 305-2, 305-3
# - levelable: commands 030-1 (PICTURE ADJUST), 030-2 (VOLUME ADJUST), 030-12 (ASPECT ADJUST), 030-15 (OTHER ADJUST)
```
- powerable
- routable
- queryable
- levelable

## Actions
```yaml
# Format: id (numeric suffix from command code), label, kind, params
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: input_sw_change
  label: Input SW Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (hex)

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
    - name: adjustment_target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: adjustment_mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: adjustment_value
      type: integer
      description: 16-bit value (low-order then high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: adjustment_mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: adjustment_value
      type: integer
      description: 16-bit value (low-order then high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_value
      type: integer
      description: Aspect ratio value

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: adjustment_target
      type: integer
      description: "96h=LAMP ADJUST / LIGHT ADJUST"
    - name: adjustment_mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: adjustment_value
      type: integer
      description: 16-bit value (low-order then high-order 8 bits)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: 16-bit key code from key code table

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
    - name: content
      type: integer
      description: "06h=Periphery Focus; 00h=Stop, 01h/02h/03h=drive plus, 7Fh=drive plus cont, 81h=drive minus cont, FDh/FEh/FFh=drive minus"

- id: lens_control_request
  label: Lens Control Request
  kind: action
  params:
    - name: target
      type: integer
      description: Lens position target

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: control
      type: integer
      description: "FFh=Stop"
    - name: adjustment_mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: adjustment_value
      type: integer
      description: 16-bit value

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
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: setting_value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile_number
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: eco_mode_set
  label: ECO Mode Set
  kind: action
  params:
    - name: eco_mode_value
      type: integer
      description: ECO mode value

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: projector_name
      type: string
      description: Up to 16 bytes (NUL terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture By Picture Set
  kind: action
  params:
    - name: parameter
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: setting_value
      type: integer
      description: Setting value

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: setting_value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal
    - name: setting_value
      type: integer
      description: "00h=terminal in DATA01, 02h=COMPUTER"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: freeze
      type: integer
      description: "01h=On, 02h=Off"
- id: error_status_request
  label: Error Status Request
  kind: query
  params: []
- id: information_request_cmd
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
- id: gain_parameter_request_cmd
  label: Gain Parameter Request
  kind: query
  params: []
- id: setting_request_cmd
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
- id: eco_mode_request_cmd
  label: Eco Mode Status Request
  kind: query
  params: []
- id: lan_projector_name_request_cmd
  label: LAN Projector Name Request
  kind: query
  params: []
- id: lan_mac_address_request
  label: LAN MAC Address Request
  kind: query
  params: []
- id: pip_picture_by_picture_request_cmd
  label: PIP/Picture-by-Picture Status Request
  kind: query
  params: []
- id: edge_blending_mode_request_cmd
  label: Edge Blending Mode Request
  kind: query
  params: []
- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []
- id: lens_profile_request_cmd
  label: Lens Profile Request
  kind: query
  params: []
```

## Feedbacks
```yaml
# Response format: success includes data, failure includes ERR1/ERR2 error codes
# Error codes (ERR1/ERR2):
# 00h/00h: command not recognized
# 00h/01h: command not supported
# 01h/00h: invalid value
# 01h/01h: invalid input terminal
# 01h/02h: invalid language
# 02h/00h: memory allocation error
# 02h/02h: memory in use
# 02h/03h: value cannot be set
# 02h/04h: forced onscreen mute on
# 02h/06h: viewer error
# 02h/07h: no signal
# 02h/08h: test pattern or filter displayed
# 02h/09h: no PC card inserted
# 02h/0Ah: memory operation error
# 02h/0Ch: entry list displayed
# 02h/0Dh: command cannot be accepted (power off)
# 02h/0Eh: command execution failed
# 02h/0Fh: no authority
# 03h/00h: incorrect gain number
# 03h/01h: invalid gain
# 03h/02h: adjustment failed

- id: error_status
  label: Error Status
  type: bitfield
  description: Error information bits (cover, temp, fan, power, lamp errors)
  values: []

- id: information_request
  label: Information Request
  type: object
  description: Projector name, lamp usage time, filter usage time

- id: filter_usage_info
  label: Filter Usage Information
  type: object
  description: Filter usage time (seconds), filter alarm start time

- id: lamp_info_3
  label: Lamp Information 3
  type: object
  description: Lamp usage time (seconds), lamp remaining life (%)

- id: carbon_savings_info
  label: Carbon Savings Information
  type: object
  description: Total carbon savings (kg), carbon savings during operation (mg)

- id: running_status
  label: Running Status
  type: object
  description: Power status, cooling process, operation status

- id: input_status
  label: Input Status
  type: object
  description: Signal switch process, signal list number, signal type, content displayed

- id: mute_status
  label: Mute Status
  type: object
  description: Picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display

- id: model_name
  label: Model Name
  type: string
  description: Up to 32 character model name

- id: cover_status
  label: Cover Status
  type: enum
  values: [normal, closed]

- id: information_string
  label: Information String
  type: string
  description: Horizontal/vertical sync frequency strings

- id: eco_mode_request
  label: ECO Mode Request
  type: integer
  description: ECO mode value

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: string
  description: Up to 17 character projector name

- id: lan_mac_address_status
  label: LAN MAC Address Status
  type: string
  description: MAC address (6 bytes)

- id: pip_picture_by_picture_request
  label: PIP/Picture By Picture Request
  type: object
  description: PIP mode, start position, sub input settings

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: enum
  values: [off, on]

- id: lens_control_request
  label: Lens Control Request
  type: object
  description: Adjustment range upper/lower limits, current value

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: object
  description: LOAD BY SIGNAL or FORCED MUTE setting

- id: lens_profile_request
  label: Lens Profile Request
  type: enum
  values: [profile_1, profile_2]

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  type: object
  description: Picture, volume, backlight adjustment values

- id: setting_request
  label: Setting Request
  type: object
  description: Base model type, sound function, profile number

- id: base_model_type_request
  label: Base Model Type Request
  type: object
  description: Base model type, model name, serial info

- id: serial_number_request
  label: Serial Number Request
  type: string
  description: Up to 16 character serial number

- id: basic_information_request
  label: Basic Information Request
  type: object
  description: Operation status, content displayed, signal types, mute/freeze status
```

## Variables
```yaml
# UNRESOLVED: many settable parameters are command-based rather than variable-based
# Variables below are settable via SET commands:
- id: eco_mode
  type: integer
  writeable: true
  description: ECO mode value (set via 098-8)

- id: projector_name
  type: string
  writeable: true
  description: Projector name (set via 098-45)

- id: pip_picture_by_picture
  type: object
  writeable: true
  description: PIP/Picture-by-Picture settings (set via 098-198)

- id: edge_blending_mode
  type: enum
  values: [off, on]
  writeable: true
  description: Edge blending mode (set via 098-243-1)

- id: lens_memory_option
  type: object
  writeable: true
  description: Lens memory option (LOAD BY SIGNAL/FORCED MUTE, ON/OFF) (set via 053-6)

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  writeable: true
  description: Lens profile number (set via 053-10)

- id: audio_select
  type: object
  writeable: true
  description: Audio input terminal selection (set via 319-10)

- id: freeze
  type: enum
  values: [on, off]
  writeable: true
  description: Freeze function state (set via 079)
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
# Note: Power on (015) blocks other commands while turning on
# Note: Power off (016) blocks other commands during cooling time
```

## Notes
Serial cable is cross-pinned (null modem). TCP port 7142 stated for LAN control. Command protocol uses hex notation with checksum (CKS) calculated as low-order byte of sum of preceding bytes. Response format varies: success without data (22h/23h prefix), success with data (20h/23h/21h prefix), failure includes ERR1/ERR2 codes (A0h/A1h/A2h/A3h prefix).
<!-- UNRESOLVED: wireless LAN unit commands not documented; refer to wireless LAN unit operation manual -->
<!-- UNRESOLVED: appendix "Supplementary Information by Command" values not available in source -->
<!-- UNRESOLVED: MODEL CODE (ID2) values by model not stated in source -->
<!-- UNRESOLVED: input terminal hex values referenced but not enumerated (see appendix) -->
<!-- UNRESOLVED: aspect ratio values referenced but not enumerated (see appendix) -->
<!-- UNRESOLVED: eco mode numeric values referenced but not enumerated (see appendix) -->
<!-- UNRESOLVED: key code table partial — only SOURCE, COMPUTER1/2, VIDEO1, S-VIDEO1, VOLUME UP/DOWN, ASPECT, FREEZE, LAMP MODE/ECO, etc. shown; other codes in appendix not available -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-26T21:32:07.102Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T21:32:07.102Z
matched_actions: 49
action_count: 49
confidence: high
summary: "All 49 spec actions matched source; transport verified"
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
