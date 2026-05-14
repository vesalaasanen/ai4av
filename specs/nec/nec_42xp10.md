---
spec_id: admin/nec-42xp10
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC 42XP10 Control Spec"
manufacturer: NEC
model_family: 42XP10
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - 42XP10
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:15.972Z
last_checked_at: 2026-04-24T14:34:25.538Z
generated_at: 2026-04-24T14:34:25.538Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-24T14:34:25.538Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "Complete verification: all actions present, transport parameters match, intentional null values documented"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# NEC 42XP10 Control Spec

## Summary
The NEC 42XP10 is a professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control. This spec covers the full command set including power control, input routing, picture/sound mute, lens positioning, eco mode, and comprehensive status queries. Control is via hexadecimal command packets with checksum.

<!-- UNRESOLVED: wireless LAN unit manual not included; TCP port 7142 confirmed for wired LAN -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142
auth:
  type: none
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
      description: Input terminal value (hex). See appendix for valid input codes.

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
      description: Adjustment target (00h=brightness, 01h=contrast, 02h=color, 03h=hue, 04h=sharpness)
    - name: mode
      type: integer
      description: "0=absolute, 1=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value (low + high bytes)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=absolute, 1=relative"
    - name: value
      type: integer
      description: 16-bit signed volume value (low + high bytes)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_value
      type: integer
      description: Aspect setting value (hex). See appendix.

- id: other_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "0=absolute, 1=relative"
    - name: value
      type: integer
      description: 16-bit signed value (low + high bytes)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code from key code table (e.g., 02h=POWER ON, 05h=AUTO, 06h=MENU)

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
      description: "00h=Stop, 01h/02h/03h=Drive plus 1s/0.5s/0.25s, 7Fh=Drive plus, 81h=Drive minus, FDh/FEh/FFh=Drive minus 0.25s/0.5s/1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: control
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "0=absolute, 2=relative"
    - name: value
      type: integer
      description: 16-bit position value (low + high bytes)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "0=MOVE, 1=STORE, 2=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "0=MOVE, 1=STORE, 2=RESET"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: integer
      description: "0=LOAD BY SIGNAL, 1=FORCED MUTE"
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "0=Profile 1, 1=Profile 2"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: freeze
      type: integer
      description: "1=On, 2=Off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode value. See appendix.

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name string (up to 16 bytes, NUL-terminated)

- id: pip_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "0=MODE, 1=START POSITION, 2=SUB INPUT, 9=SUB INPUT 2, A=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value per target. See appendix for sub input values.

- id: edge_blending_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=OFF, 1=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: terminal
      type: integer
      description: Input terminal value. See appendix.
    - name: value
      type: integer
      description: "0=terminal in DATA01, 2=COMPUTER"
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
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp_number
      type: integer
      description: 00h=Lamp 1, 01h=Lamp 2
    - name: content
      type: integer
      description: 01h=Lamp usage time, 04h=Lamp remaining life (%)

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: integer
      description: 00h=Total, 01h=During operation

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: 06h=Periphery Focus

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: option
      type: integer
      description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE

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
    - name: gain_name
      type: integer
      description: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST

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
      description: 03h=Horizontal sync freq, 04h=Vertical sync freq

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
  label: PIP/Picture By Picture Request
  kind: query
  params:
    - name: target
      type: integer
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT

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
- id: power_state
  label: Power State
  type: enum
  values:
    - "00h Standby"
    - "01h Power on"
    - "05h Cooling"
    - "06h Standby (error)"
    - "0Fh Standby (Power saving)"
    - "10h Network standby"

- id: error_status
  label: Error Status
  type: object
  fields:
    - name: data01
      type: object
      description: Error status 1 (bits: 0=cover, 1=temp, 3=fan, 4=fan, 5=power, 6=lamp off, 7=lamp moratorium)
    - name: data02
      type: object
      description: Error status 2 (bits: 0=lamp time exceeded, 1=formatter, 2=lamp2 off, 7=extended)
    - name: data03
      type: object
      description: Error status 3 (bits: 1=FPGA, 2=temp sensor, 3=lamp not present, 4=lamp data, 5=mirror cover, 6=lamp2 moratorium, 7=lamp2 time exceeded)
    - name: data04
      type: object
      description: Error status 4 (bits: 0=lamp2 not present, 1=lamp2 data, 2=temp dust, 3=foreign matter, 6=iris calibration, 7=lens not installed)
    - name: data05
      type: object
      description: Extended status (bits: 0=portrait cover, 1=interlock switch open, 2=system error slave CPU, 3=system error formatter)

- id: input_status
  label: Input Status
  type: object
  fields:
    - name: signal_switch
      type: enum
      values: ["00h Not executed", "01h During execution"]
    - name: signal_list_number
      type: integer
      description: Signal list number minus 1
    - name: signal_type_1
      type: enum
      values: ["01h-05h Signal type 1-5"]
    - name: signal_type_2
      type: enum
      values: ["01h COMPUTER", "02h VIDEO", "03h S-VIDEO", "04h COMPONENT", "07h VIEWER(1-5)", "20h DVI-D", "21h HDMI", "22h DisplayPort", "23h VIEWER(6-10)"]
    - name: content_displayed
      type: enum
      values: ["00h Video signal", "01h No signal", "02h Viewer", "03h Test pattern", "04h LAN"]

- id: mute_status
  label: Mute Status
  type: object
  fields:
    - name: picture_mute
      type: enum
      values: ["00h Off", "01h On"]
    - name: sound_mute
      type: enum
      values: ["00h Off", "01h On"]
    - name: onscreen_mute
      type: enum
      values: ["00h Off", "01h On"]
    - name: forced_onscreen_mute
      type: enum
      values: ["00h Off", "01h On"]

- id: lamp_info
  label: Lamp Information
  type: object
  fields:
    - name: lamp_number
      type: integer
      description: "0=Lamp 1, 1=Lamp 2"
    - name: usage_time_seconds
      type: integer
      description: Lamp usage time in seconds (updated at 1-minute intervals)
    - name: remaining_life_percent
      type: integer
      description: Remaining life percentage (negative if replacement deadline exceeded)

- id: filter_usage
  label: Filter Usage Information
  type: object
  fields:
    - name: usage_time_seconds
      type: integer
      description: Filter usage time in seconds (-1 if not defined)
    - name: alarm_start_time_seconds
      type: integer
      description: Filter alarm start time in seconds (-1 if not defined)

- id: model_name
  label: Model Name
  type: string
  description: Model name string (NUL-terminated)

- id: serial_number
  label: Serial Number
  type: string
  description: Serial number string (NUL-terminated)

- id: projector_name
  label: LAN Projector Name
  type: string
  description: Projector name string (NUL-terminated, up to 17 bytes)

- id: mac_address
  label: MAC Address
  type: string
  description: MAC address as 6 hex bytes

- id: eco_mode
  label: Eco Mode
  type: integer
  description: Current eco mode value. See appendix.

- id: pip_mode
  label: PIP/Picture by Picture
  type: object
  fields:
    - name: mode
      type: enum
      values: ["00h PIP", "01h PICTURE BY PICTURE"]
    - name: start_position
      type: enum
      values: ["00h TOP-LEFT", "01h TOP-RIGHT", "02h BOTTOM-LEFT", "03h BOTTOM-RIGHT"]

- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  values: ["00h OFF", "01h ON"]

- id: cover_status
  label: Cover Status
  type: enum
  values: ["00h Normal (opened)", "01h Closed"]
```

## Variables
```yaml
- id: brightness
  label: Brightness
  type: integer
  range:
    min: null
    max: null
  description: Picture brightness adjustment value

- id: contrast
  label: Contrast
  type: integer
  range:
    min: null
    max: null
  description: Picture contrast adjustment value

- id: color
  label: Color
  type: integer
  range:
    min: null
    max: null
  description: Picture color adjustment value

- id: hue
  label: Hue
  type: integer
  range:
    min: null
    max: null
  description: Picture hue adjustment value

- id: sharpness
  label: Sharpness
  type: integer
  range:
    min: null
    max: null
  description: Picture sharpness adjustment value

- id: volume
  label: Volume
  type: integer
  range:
    min: null
    max: null
  description: Sound volume adjustment value

- id: lamp_adjust
  label: Lamp/Light Adjust
  type: integer
  range:
    min: null
    max: null
  description: Lamp or light output adjustment value
```

## Events
```yaml
# UNRESOLVED: projector does not appear to send unsolicited event notifications per source documentation
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```
<!-- UNRESOLVED: no safety warnings or interlock procedures stated in source. Power on/off commands block other commands during execution (cooling time). -->

## Notes
Serial baud rate is selectable: 115200/38400/19200/9600/4800 bps. Default not stated in source — baud_rate left null.

Command format: `20h <ID1> <ID2> <LEN> <DATA> <CKS>` for commands; `A0h`/`A2h`/`A3h` prefix in responses. Checksum = low-order byte of sum of all preceding bytes.

Power ON and Power OFF commands block all other commands while executing (including cooling time).

Input terminal values and aspect values are documented in an Appendix not included in this source document — those parameter enums marked as "See appendix."

Lens position drive commands (7Fh/81h) continue until explicit Stop (00h) is sent.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:15.972Z
last_checked_at: 2026-04-24T14:34:25.538Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-24T14:34:25.538Z
matched_actions: 53
action_count: 53
confidence: high
summary: "Complete verification: all actions present, transport parameters match, intentional null values documented"
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
