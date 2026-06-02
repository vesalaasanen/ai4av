---
spec_id: admin/nec-np6_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP6 Series Control Spec"
manufacturer: NEC
model_family: "NP6 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NP6 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:52:49.979Z
last_checked_at: 2026-04-23T08:15:05.299Z
generated_at: 2026-04-23T08:15:05.299Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not describe unsolicited event notifications"
  - "no explicit multi-step macros described in source"
  - "no explicit safety warnings or interlock procedures in source"
  - "appendix values (input terminal codes, aspect values, eco mode values) not included - source references appendix not present in extracted text"
  - "wireless LAN unit details not in source"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-04-23T08:15:05.299Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions found verbatim in source command table; transport parameters (port 7142, baud rates, serial config) verified in connection specifications. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# NEC NP6 Series Control Spec

## Summary
NEC NP6 Series projector. Supports RS-232 and TCP/IP control. Serial: 115200/38400/19200/9600/4800 bps, 8N1. TCP: port 7142. Binary command protocol with checksum, ID-based addressing.

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none
```

## Traits
```yaml
- powerable
- queryable
- routable
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
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal value (hex, see appendix)

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
      description: "00h=Absolute, 01h=Relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute, 01h=Relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect ratio value (see appendix)

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=Lamp/Light Adjust"
    - name: mode
      type: integer
      description: "00h=Absolute, 01h=Relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (see key code table)

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
      description: "00h=Stop, 01h/02h/03h=Drive plus, 7Fh=Drive plus cont, 81h=Drive minus, FDh/FEh/FFh=Drive minus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: cmd
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute, 02h=Relative"
    - name: value
      type: integer
      description: Position value (16-bit)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: cmd
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: ref_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: cmd
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

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

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=On, 02h=Off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: Eco mode value (see appendix)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value per target

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: terminal
      type: integer
      description: Input terminal value
    - name: value
      type: integer
      description: "00h=Terminal in DATA01, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  type: bitfield
  values:
    - bit0: Cover error
    - bit1: Temperature error
    - bit2: Reserved
    - bit3: Fan error
    - bit4: Fan error
    - bit5: Power error
    - bit6: Lamp off
    - bit7: Lamp replacement moratorium

- id: information_request
  label: Information Request
  type: composite

- id: filter_usage_request
  label: Filter Usage Information Request
  type: composite

- id: lamp_information_request_3
  label: Lamp Information Request 3
  type: composite

- id: carbon_savings_request
  label: Carbon Savings Information Request
  type: composite

- id: lens_control_request
  label: Lens Control Request
  type: composite

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  type: composite

- id: setting_request
  label: Setting Request
  type: composite

- id: running_status_request
  label: Running Status Request
  type: composite

- id: input_status_request
  label: Input Status Request
  type: composite

- id: mute_status_request
  label: Mute Status Request
  type: composite

- id: model_name_request
  label: Model Name Request
  type: string

- id: cover_status_request
  label: Cover Status Request
  type: enum
  values:
    - "00h": Normal
    - "01h": Cover closed

- id: information_string_request
  label: Information String Request
  type: string

- id: eco_mode_request
  label: Eco Mode Request
  type: integer

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: string

- id: lan_mac_address_request2
  label: LAN MAC Address Status Request 2
  type: string

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  type: composite

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: enum
  values:
    - "00h": OFF
    - "01h": ON

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: composite

- id: lens_profile_request
  label: Lens Profile Request
  type: enum
  values:
    - "00h": Profile 1
    - "01h": Profile 2

- id: lens_information_request
  label: Lens Information Request
  type: bitfield

- id: base_model_type_request
  label: Base Model Type Request
  type: composite

- id: serial_number_request
  label: Serial Number Request
  type: string

- id: basic_information_request
  label: Basic Information Request
  type: composite
```

## Variables
```yaml
- id: brightness
  label: Brightness
  type: integer
  range:
    lo: 0
    hi: 255

- id: contrast
  label: Contrast
  type: integer
  range:
    lo: 0
    hi: 255

- id: color
  label: Color
  type: integer
  range:
    lo: 0
    hi: 255

- id: hue
  label: Hue
  type: integer
  range:
    lo: 0
    hi: 255

- id: sharpness
  label: Sharpness
  type: integer
  range:
    lo: 0
    hi: 255

- id: volume
  label: Volume
  type: integer
  range:
    lo: 0
    hi: 255

- id: lamp_adjust
  label: Lamp/Light Adjust
  type: integer

- id: eco_mode
  label: Eco Mode
  type: integer

- id: projector_name
  label: Projector Name
  type: string
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event notifications
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
Command protocol: binary with header `20h 88h <ID1> <ID2> 0Ch <DATA> <CKS>`. Response: `A0h/A2h/A3h` prefix. Checksum = low-order byte of sum of all preceding bytes. Power-on command blocks other commands until power-on completes. Power-off command blocks until cooling complete. Lens drive-continue command (7Fh/81h) requires explicit Stop (00h) to halt.

<!-- UNRESOLVED: appendix values (input terminal codes, aspect values, eco mode values) not included - source references appendix not present in extracted text -->
<!-- UNRESOLVED: wireless LAN unit details not in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:52:49.979Z
last_checked_at: 2026-04-23T08:15:05.299Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:15:05.299Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions found verbatim in source command table; transport parameters (port 7142, baud rates, serial config) verified in connection specifications. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not describe unsolicited event notifications"
- "no explicit multi-step macros described in source"
- "no explicit safety warnings or interlock procedures in source"
- "appendix values (input terminal codes, aspect values, eco mode values) not included - source references appendix not present in extracted text"
- "wireless LAN unit details not in source"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
