---
spec_id: admin/nec-xr3_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC XR3 Series Control Spec"
manufacturer: NEC
model_family: "XR3 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "XR3 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-31T06:53:00.459Z
generated_at: 2026-05-31T06:53:00.459Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T06:53:00.459Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec action IDs matched one-to-one to source command definitions; transport parameters verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# NEC XR3 Series Control Spec

## Summary
Projector supporting both RS-232C serial and wired TCP/IP control interfaces. Supports power management, input switching, picture/sound/onscreen mute, lens control, aspect adjustment, eco mode, freeze, PIP/PbP, edge blending, and comprehensive status queries.

<!-- UNRESOLVED: wireless LAN control not detailed in source — see operation manual of wireless LAN unit -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: hardware flow control not explicitly stated; pin assignment shows RTS/CTS but no explicit configuration command
addressing:
  port: 7142  # TCP port for LAN control; serial port number not stated in source
auth:
  type: none  # inferred: no auth/login procedure in source
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

- id: input_switch_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal number (see Appendix for values)

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
      description: "0=Brightness, 1=Contrast, 2=Color, 3=Hue, 4=Sharpness"
    - name: mode
      type: integer
      description: "0=Absolute value, 1=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Absolute value, 1=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect ratio value (see Appendix)

- id: lamp_light_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "0x96=Lamp Adjust/Light Adjust"
    - name: mode
      type: integer
      description: "0=Absolute value, 1=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

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
      description: "0=Lamp1, 1=Lamp2"
    - name: content
      type: integer
      description: "1=Lamp usage time (seconds), 4=Lamp remaining life (%)"

- id: carbon_savings_information_request
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
      description: Key code to send (see key code table for values 2-238)

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
      description: "0x06=Periphery Focus"
    - name: direction
      type: integer
      description: "0=Stop, 1=+1sec, 2=+0.5sec, 3=+0.25sec, 0x7F=drive+, 0x81=drive-, 0xFD=-0.25sec, 0xFE=-0.5sec, 0xFF=-1sec"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: Lens control target

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "0xFF=Stop"
    - name: mode
      type: integer
      description: "0=Absolute value, 2=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

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
    - name: option
      type: integer
      description: "0=Load by Signal, 1=Forced Mute"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: integer
      description: "0=Load by Signal, 1=Forced Mute"
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

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
      description: "0=Profile 1, 1=Profile 2"

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
      description: "0=Picture/Brightness, 1=Picture/Contrast, 2=Picture/Color, 3=Picture/Hue, 4=Picture/Sharpness, 5=Volume, 0x96=Lamp Adjust/Light Adjust"

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
      description: "1=Freeze on, 2=Freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  params:
    - name: information_type
      type: integer
      description: "3=Horizontal sync frequency, 4=Vertical sync frequency"

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
      description: "0=Mode, 1=Start Position, 2=Sub Input/Sub Input 1, 9=Sub Input 2, 0x0A=Sub Input 3"

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
      description: Eco mode value (see Appendix)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: item
      type: integer
      description: "0=Mode, 1=Start Position, 2=Sub Input/Sub Input 1, 9=Sub Input 2, 0x0A=Sub Input 3"
    - name: value
      type: integer
      description: Setting value (see Appendix for sub input values)

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
      description: Input terminal number
    - name: setting
      type: integer
      description: "0=Terminal specified in DATA01, 1=BNC, 2=COMPUTER"
```

## Feedbacks
```yaml
# Error codes returned in ERR1/ERR2 fields:
# 00h/00h: Command not recognized
# 00h/01h: Command not supported by model
# 01h/00h: Invalid value
# 01h/01h: Invalid input terminal
# 01h/02h: Invalid language
# 02h/00h: Memory allocation error
# 02h/02h: Memory in use
# 02h/03h: Value cannot be set
# 02h/04h: Forced onscreen mute on
# 02h/06h: Viewer error
# 02h/07h: No signal
# 02h/08h: Test pattern or filter displayed
# 02h/09h: No PC card inserted
# 02h/0Ah: Memory operation error
# 02h/0Ch: Entry list displayed
# 02h/0Dh: Power is off
# 02h/0Eh: Command execution failed
# 02h/0Fh: No authority
# 03h/00h: Incorrect gain number
# 03h/01h: Invalid gain
# 03h/02h: Adjustment failed
```

## Variables
```yaml
# All settable parameters are represented as Actions above.
# UNRESOLVED: no standalone Variables section in source - parameters set via dedicated SET actions
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
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Command format: 20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>
- ID1 = Control ID set for projector; ID2 = Model code (varies by model)
- Checksum (CKS): low-order byte of sum of all preceding bytes
- Response format: A0h/22h/23h <ID1> <ID2> <LEN> <DATA> <CKS> or A2h/A3h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
- Power on/off commands block other commands during execution (including cooling time)
- Picture/Sound/Onscreen mute auto-cleared on input switch, video signal switch, or volume adjustment
- Lens drive commands can be issued continuously without stop; send Stop (00h/FFh) to halt
- Lamp usage time updated at 1-minute intervals despite 1-second resolution
- Serial cable: cross cable required (PC CONTROL port D-SUB 9P)
- LAN: IEEE802.3 (10BASE-T) / IEEE802.3u (100BASE-TX, Auto-Negotiation)
- Data rate: Auto switchable 10/100 Mbps

<!-- UNRESOLVED: wireless LAN unit specification — see operation manual of wireless LAN unit -->
<!-- UNRESOLVED: input terminal numeric codes — see Appendix "Supplementary Information by Command" -->
<!-- UNRESOLVED: aspect ratio values — see Appendix "Supplementary Information by Command" -->
<!-- UNRESOLVED: eco mode numeric values — see Appendix "Supplementary Information by Command" -->
<!-- UNRESOLVED: sub input setting values — see Appendix "Supplementary Information by Command" -->
<!-- UNRESOLVED: base model type values — see Appendix "Supplementary Information by Command" -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-31T06:53:00.459Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T06:53:00.459Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec action IDs matched one-to-one to source command definitions; transport parameters verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
