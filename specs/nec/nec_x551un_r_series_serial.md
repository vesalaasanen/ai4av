---
spec_id: admin/nec-x551un-r-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC X551UN-R Series Control Spec"
manufacturer: NEC
model_family: X551UN-R
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - X551UN-R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:39:03.482Z
generated_at: 2026-04-25T21:39:03.482Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:39:03.482Z
  matched_actions: 53
  action_count: 53
  confidence: low
  summary: "All 53 spec actions matched source including queries; transport verified"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X551UN-R Series Control Spec

## Summary
NEC X551UN-R Series professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control. Serial communication at 115200/38400/19200/9600/4800 bps, 8N1. LAN uses TCP port 7142. No authentication procedure described in source.

<!-- UNRESOLVED: source document does not specify HDBaseT control protocol details -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated: TCP port 7142 for LAN commands
serial:
  baud_rate: 115200  # stated: supports 115200/38400/19200/9600/4800 bps
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
  kind: action
  params: []

- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: input_switch
  label: Input Switch Change
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
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=Auto, 01h=Wide Zoom, 02h=16:9, 03h=Native, 04h=4:3, etc."

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: "96h= Lamp/Light Adjust"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: information_request
  label: Information Request
  kind: action
  params: []

- id: filter_usage_request
  label: Filter Usage Information Request
  kind: action
  params: []

- id: lamp_info_request
  label: Lamp Information Request 3
  kind: action
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp1, 01h=Lamp2"
    - name: content
      type: integer
      description: "01h=Usage time, 04h=Remaining life"

- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: action
  params:
    - name: type
      type: integer
      description: "00h=Total, 01h=During operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: keycode
      type: integer
      description: 16-bit key code (e.g., 02h=POWER ON, 03h=POWER OFF, 07h=UP)

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
      description: "00h=Stop, 01h/02h/03h=plus drive, 7Fh=continuous plus, 81h=continuous minus"

- id: lens_control_request
  label: Lens Control Request
  kind: action
  params:
    - name: target
      type: integer

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: control
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer

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
    - name: option
      type: integer
      description: "00h=Load by Signal, 01h=Forced Mute"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: integer
      description: "00h=Load by Signal, 01h=Forced Mute"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_info_request
  label: Lens Information Request
  kind: action
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile1, 01h=Profile2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: action
  params: []

- id: gain_parameter_request
  label: Gain Parameter Request 3
  kind: action
  params:
    - name: parameter
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp"

- id: setting_request
  label: Setting Request
  kind: action
  params: []

- id: running_status_request
  label: Running Status Request
  kind: action
  params: []

- id: input_status_request
  label: Input Status Request
  kind: action
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: action
  params: []

- id: model_name_request
  label: Model Name Request
  kind: action
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: action
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=On, 02h=Off"

- id: info_string_request
  label: Information String Request
  kind: action
  params:
    - name: type
      type: integer
      description: "03h=Horizontal sync freq, 04h=Vertical sync freq"

- id: eco_mode_request
  label: Eco Mode Request
  kind: action
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: action
  params: []

- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: action
  params: []

- id: pip_request
  label: PIP/Picture by Picture Request
  kind: action
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: action
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: Eco mode setting value

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: action
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: action
  params: []

- id: basic_info_request
  label: Basic Information Request
  kind: action
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal
    - name: source
      type: integer
      description: "00h=HDMI1, 01h=HDMI2, 02h=DisplayPort, 03h=HDBaseT, 04h=USB-A, 05h=USB-B"
```

## Feedbacks
```yaml
- id: error_status
  type: object
  description: Error information bitfield (12 bytes)

- id: power_state
  type: enum
  values: [standby, power_on, cooling]
  note: From 078-2 RUNNING STATUS REQUEST (DATA03: 00h=Standby, 01h=Power on, 05h=Cooling)

- id: input_status
  type: object
  description: Input signal status including signal type, list number, test pattern state

- id: mute_status
  type: object
  properties:
    - picture_mute: [off, on]
    - sound_mute: [off, on]
    - onscreen_mute: [off, on]
    - forced_onscreen_mute: [off, on]

- id: model_name
  type: string

- id: cover_status
  type: enum
  values: [normal, closed]

- id: projector_name
  type: string

- id: mac_address
  type: string
  format: hex-separated (e.g., 01h-23h-45h-67h-89h-ABh)

- id: lamp_info
  type: object
  properties:
    - lamp: [1, 2]
    - usage_time_seconds: integer
    - remaining_life_percent: integer

- id: filter_usage
  type: object
  properties:
    - usage_time_seconds: integer
    - alarm_start_time_seconds: integer

- id: carbon_savings
  type: object
  properties:
    - type: [total, during_operation]
    - kilograms: integer
    - milligrams: integer

- id: eco_mode
  type: integer
  description: Eco mode value (00h=OFF, 01h=ON/AUTO, 02h=ECO1, 03h=ECO2, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT)

- id: pip_mode
  type: enum
  values: [off, pip, picture_by_picture]
  description: From 097-198

- id: edge_blending
  type: enum
  values: [off, on]

- id: freeze_state
  type: enum
  values: [off, on]

- id: lens_position
  type: object
  properties:
    - current: integer
    - upper_limit: integer
    - lower_limit: integer

- id: lens_info
  type: object
  properties:
    - lens_memory_status: [stop, operating]
    - zoom_status: [stop, operating]
    - focus_status: [stop, operating]
    - lens_shift_h_status: [stop, operating]
    - lens_shift_v_status: [stop, operating]

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]

- id: gain_parameters
  type: object
  properties:
    - status: [not_possible, possible, not_supported]
    - upper_limit: integer
    - lower_limit: integer
    - default_value: integer
    - current_value: integer

- id: basic_info
  type: object
  description: Operation status, content displayed, signal type, mute states, freeze status

- id: audio_select
  type: enum
  values: [hdmi1, hdmi2, displayport, hdbaset, usb_a, usb_b, ethernet]
```

## Variables
```yaml
# UNRESOLVED: source documents adjustable parameters as Actions rather than persistent Variables.
# Volume, brightness, contrast, hue, sharpness, aspect ratio, eco mode, PIP mode, edge blending,
# projector name, and audio select are controlled via command Actions.
```

## Events
```yaml
# UNRESOLVED: source document describes only command-response pattern, not unsolicited device events.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_on  # While power is turning on, no other commands accepted
  - power_off  # While power is turning off (including cooling), no other commands accepted
interlocks:
  - Some models require specific standby modes to receive commands via serial or LAN
  - Serial cable connection standby modes: Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON
  - Wired LAN standby modes: Normal, NORMAL, NETWORK STANDBY, SLEEP, HDBaseT STANDBY, OFF, ON, STANDBY POWER ON
  - Supported standby modes vary by model; some only support certain modes for LAN vs serial control
```

## Notes
Command format: 20h 88h \<ID1\> \<ID2\> 0Ch \<DATA01\>-\<DATA12\> \<CKS\> (hexadecimal).
Checksum (CKS): low-order byte of sum of all preceding bytes.
ID1 = Control ID set for projector; ID2 = Model code (varies by model).
Response format varies by command type (A0h/A2h/A3h for different response classes).
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" values (input terminal codes, aspect codes, eco mode codes, signal type codes) are model-dependent and partially documented with alternatives -->
<!-- UNRESOLVED: HDBaseT standby mode not detailed in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:39:03.482Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:39:03.482Z
matched_actions: 53
action_count: 53
confidence: low
summary: "All 53 spec actions matched source including queries; transport verified"
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
