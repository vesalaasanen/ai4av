---
spec_id: admin/nec-c750q-c860q
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC C750Q C860Q Control Spec"
manufacturer: NEC
model_family: C750Q
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - C750Q
    - C860Q
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T07:34:00.101Z
last_checked_at: 2026-06-02T22:10:05.178Z
generated_at: 2026-06-02T22:10:05.178Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "wireless LAN unit manual not included; external wireless LAN module required but specs not provided"
  - "source does not describe unsolicited event/notification messages"
  - "no explicit multi-step macro sequences defined in source"
  - "no voltage, current, power specifications in source"
  - "appendix \"Supplementary Information by Command\" values not provided"
  - "key code list appendix values not fully enumerated beyond sample codes"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:10:05.178Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions traced to source (dip-safe re-verify). (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC C750Q C860Q Control Spec

## Summary
Professional laser projector supporting both serial (RS-232C) and TCP/IP control. Commands sent via hex-encoded protocol with control ID, model code, and checksum. No authentication required per source.

<!-- UNRESOLVED: wireless LAN unit manual not included; external wireless LAN module required but specs not provided -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port for LAN commands
serial:
  baud_rate: 115200  # also supports: 38400, 19200, 9600, 4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # POWER ON/OFF commands present
- routable        # INPUT SW CHANGE command present
- queryable       # multiple status/information request commands present
- levelable       # VOLUME ADJUST, PICTURE ADJUST, brightness, contrast, hue, etc.
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request
  kind: query
  params: []
  description: Gets error information bitfield (cover, fan, temperature, lamp, power errors)

- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on projector power. No other commands accepted during power-on sequence.

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off projector power including cooling time. No other commands accepted during shutdown.

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal selector (hex values per appendix)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  description: Disables video output. Cleared by input or video signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  description: Disables audio output. Cleared by input switch, video signal switch, or volume adjustment.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  description: Enables onscreen blackout. Cleared by input or video signal switch.

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
      description: "0=Brightness, 1=Contrast, 2=Color, 3=Hue, 4=Sharpness"
    - name: mode
      type: integer
      description: "0=absolute value, 1=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value (low byte first)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=absolute value, 1=relative value"
    - name: value
      type: integer
      description: 16-bit signed volume value (low byte first)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect ratio selector (per appendix)

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: "96h= Lamp/Light adjust"
    - name: mode
      type: integer
      description: "0=absolute value, 1=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: information_request
  label: Information Request
  kind: query
  params: []
  description: Gets projector name, lamp usage time (seconds), filter usage time (seconds)

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: query
  params: []
  description: Gets filter usage time and alarm start time in seconds

- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp
      type: integer
      description: "0=Lamp1, 1=Lamp2"
    - name: content
      type: integer
      description: "1=usage time (seconds), 4=remaining life (%)"

- id: carbon_savings_info_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: integer
      description: "0=Total Carbon Savings, 1=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: 16-bit key code (e.g., 0x0200=POWER ON, 0x0300=POWER OFF, 0x0500=AUTO, etc.)

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  description: Closes lens shutter

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  description: Opens lens shutter

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: "6h=Periphery Focus"
    - name: direction
      type: integer
      description: "0=Stop, 1=+1s, 2=+0.5s, 3=+0.25s, 7F=+continuous, 81=-continuous, FD=-0.25s, FE=-0.5s, FF=-1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: "6h=Periphery Focus"
  response_fields:
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: current_value
      type: integer

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "0=absolute, 2=relative"
    - name: value
      type: integer
      description: 16-bit position value

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

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: target
      type: integer
      description: "0=LOAD BY SIGNAL, 1=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: target
      type: integer
      description: "0=LOAD BY SIGNAL, 1=FORCED MUTE"
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: lens_info_request
  label: Lens Information Request
  kind: query
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "0=Profile 1, 1=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: parameter
      type: integer
      description: "0=PICTURE/BRIGHTNESS, 1=CONTRAST, 2=COLOR, 3=HUE, 4=SHARPNESS, 5=VOLUME, 96h=LAMP/LIGHT"

- id: setting_request
  label: Settings Request
  kind: query
  params: []
  description: Gets base model type, sound function availability, profile number, clock/sleep timer availability

- id: running_status_request
  label: Running Status Request
  kind: query
  params: []
  description: Gets power status (Standby/Power on/Cooling), power on/off process status, operation status

- id: input_status_request
  label: Input Status Request
  kind: query
  params: []
  description: Gets signal switch status, signal list number, signal type (COMPUTER/VIDEO/S-VIDEO/COMPONENT/DVI-D/HDMI/DisplayPort/VIEWER)

- id: mute_status_request
  label: Mute Status Request
  kind: query
  params: []
  description: Gets picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display status

- id: model_name_request
  label: Model Name Request
  kind: query
  params: []
  description: Gets projector model name string

- id: cover_status_request
  label: Cover Status Request
  kind: query
  params: []
  description: Gets mirror/lens cover open/closed status

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "1=Freeze on, 2=Freeze off"

- id: info_string_request
  label: Information String Request
  kind: query
  params:
    - name: type
      type: integer
      description: "3=Horizontal sync frequency, 4=Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []
  description: Gets current eco/light/lamp mode setting

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []
  description: Gets projector name via LAN

- id: lan_mac_address_request
  label: LAN MAC Address Request
  kind: query
  params: []
  description: Gets projector MAC address

- id: pip_pbp_request
  label: PIP/Picture-by-Picture Request
  kind: query
  params:
    - name: target
      type: integer
      description: "0=MODE, 1=START POSITION, 2=SUB INPUT, 9=SUB INPUT 2, A=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: Eco mode setting (per appendix)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_pbp_set
  label: PIP/Picture-by-Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "0=MODE, 1=START POSITION, 2=SUB INPUT, 9=SUB INPUT 2, A=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

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
  description: Gets operation status, content displayed, signal types, video/sound/freeze mute status

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: terminal
      type: integer
      description: Input terminal for audio
    - name: source
      type: integer
      description: "0=terminal in DATA01, 2=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: bitfield
  description: 12-byte error information (cover, temperature, fan, lamp, power errors)

- id: power_state
  type: enum
  values: [standby, power_on, cooling, network_standby, standby_error, standby_sleep, standby_powersaving]

- id: input_status
  type: object
  fields:
    - signal_switch_process: enum [not_executed, in_execution]
    - signal_list_number: integer
    - signal_type_1: enum [1-5, COMPUTER, VIDEO, S-VIDEO, COMPONENT, DVI-D, HDMI, DisplayPort, VIEWER]
    - signal_type_2: enum
    - content_displayed: enum [video_signal, no_signal, viewer, test_pattern, lan_displayed]

- id: mute_status
  type: object
  fields:
    - picture_mute: enum [off, on]
    - sound_mute: enum [off, on]
    - onscreen_mute: enum [off, on]
    - forced_onscreen_mute: enum [off, on]
    - onscreen_display: enum [not_displayed, displayed]

- id: model_name
  type: string
  description: NUL-terminated model name string

- id: serial_number
  type: string
  description: NUL-terminated serial number string

- id: lamp_usage_time
  type: integer
  description: Lamp usage time in seconds (updated at 1-minute intervals)

- id: lamp_remaining_life
  type: integer
  description: Lamp remaining life percentage (-1 if deadline exceeded)

- id: filter_usage_time
  type: integer
  description: Filter usage time in seconds (-1 if not defined)

- id: eco_mode
  type: integer
  description: Eco mode setting value

- id: projector_name
  type: string
  description: NUL-terminated projector name (up to 17 chars)

- id: mac_address
  type: string
  description: MAC address (6 bytes, e.g. "01-23-45-67-89-AB")

- id: pip_pbp_status
  type: object
  fields:
    - mode: enum [PIP, PICTURE_BY_PICTURE]
    - position: enum [TOP-LEFT, TOP-RIGHT, BOTTOM-LEFT, BOTTOM-RIGHT]
    - sub_input: integer

- id: edge_blending_mode
  type: enum
  values: [off, on]

- id: cover_status
  type: enum
  values: [normal, cover_closed]

- id: freeze_status
  type: enum
  values: [off, on]

- id: info_string
  type: string
  description: Horizontal or vertical sync frequency string

- id: basic_info
  type: object
  description: Operation status, content displayed, signal types, mute states
```

## Variables
```yaml
# All adjustable via corresponding SET actions; queryable via REQUEST actions:
# - eco_mode (097-8 / 098-8)
# - projector_name (097-45 / 098-45)
# - pip_pbp (097-198 / 098-198)
# - edge_blending (097-243-1 / 098-243-1)
# - audio_select (319-10)
# - lens_memory_option (053-5 / 053-6)
# - lens_profile (053-10 / 053-11)
# - picture_adjustments (brightness/contrast/color/hue/sharpness via 030-1 and 060-1)
# - volume (030-2 and 060-1)
# - aspect (030-12)
# - lamp/light adjust (030-15)
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event/notification messages
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Power on sequence: While POWER ON command is executing, no other commands are accepted."
  - description: "Power off sequence: While POWER OFF command is executing (including cooling time), no other commands are accepted."
  - description: "Lens continuous drive: After sending 7Fh (drive plus) or 81h (drive minus), stop by sending 00h."
# UNRESOLVED: no voltage, current, power specifications in source
```

## Notes
- Command protocol: hex-encoded binary with structure [HEADER] [ID1] [ID2] [LEN] [DATA...] [CKS]
- Control ID (ID1) and Model code (ID2) must match projector settings
- Checksum (CKS): low-order byte of sum of all preceding bytes
- Serial supports 5 baud rates: 115200/38400/19200/9600/4800 bps (auto-detected)
- LAN uses TCP port 7142 exclusively
- Response format differs by command class: 2xh for actions, 3xh for adjustments, 0xh for info queries
- Error codes: ERR1/ERR2 combine for specific failure reasons (see error code table)
- Input terminal and aspect values reference an appendix not included in this source
- Wireless LAN requires separate wireless LAN unit (not specified in source)
<!-- UNRESOLVED: appendix "Supplementary Information by Command" values not provided -->
<!-- UNRESOLVED: key code list appendix values not fully enumerated beyond sample codes -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T07:34:00.101Z
last_checked_at: 2026-06-02T22:10:05.178Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:10:05.178Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions traced to source (dip-safe re-verify). (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wireless LAN unit manual not included; external wireless LAN module required but specs not provided"
- "source does not describe unsolicited event/notification messages"
- "no explicit multi-step macro sequences defined in source"
- "no voltage, current, power specifications in source"
- "appendix \"Supplementary Information by Command\" values not provided"
- "key code list appendix values not fully enumerated beyond sample codes"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
