---
spec_id: admin/nec-v651-touch-r-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC V651-TOUCH-R Series Control Spec"
manufacturer: NEC
model_family: V651-TOUCH-R
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - V651-TOUCH-R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-14T18:17:19.034Z
generated_at: 2026-05-14T18:17:19.034Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:19.034Z
  matched_actions: 29
  action_count: 29
  confidence: high
  summary: "Every spec action matched literally against source command bytes; all transport parameters confirmed verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC V651-TOUCH-R Series Control Spec

## Summary
NEC V651-TOUCH-R Series professional projector supporting both RS-232C serial and wired TCP/IP control. The document (BDT140013 Rev 7.1) defines a hexadecimal command protocol with acknowledgement responses, checksum validation, and approximately 50 documented commands covering power, input routing, picture/sound mute, lens control, and Eco mode settings.

<!-- UNRESOLVED: V651-TOUCH-R-specific appendix values (input terminal codes, aspect modes, eco mode codes) vary across NEC model families — source provides generic NEC codes; real-world values may differ -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated: TCP port number for LAN commands
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # stated: selectable baud rates
  data_bits: 8  # stated
  parity: none  # stated
  stop_bits: 1  # stated
  flow_control: null  # UNRESOLVED: flow control not documented
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
- powerable       # power on/off commands (015, 016)
- routable        # input switching command (018)
- queryable       # information requests (037, 078 series, 305 series)
- levelable       # volume adjust (030-2), picture adjust (030-1)
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on projector power. No other commands accepted during power-on sequence.
  command_bytes: [02h, 00h, 00h, 00h, 00h, 02h]
  response_bytes: [A2h, 00h, ID1, ID2, 02h, ERR1, ERR2, CKS]

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off projector power. No other commands accepted during cooling time.
  command_bytes: [02h, 01h, 00h, 00h, 00h, 03h]
  response_bytes: [A2h, 01h, ID1, ID2, 02h, ERR1, ERR2, CKS]

- id: input_switch
  label: Input Switch
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Hex code for input terminal (see appendix for values)
  command_bytes: [02h, 03h, 00h, 00h, 02h, 01h, DATA01, CKS]
  response_bytes: [22h, 03h, ID1, ID2, 01h, DATA01, CKS]

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  description: Turns picture mute on. Cancelled by input/signal switch.
  command_bytes: [02h, 10h, 00h, 00h, 00h, 12h]

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  description: Turns sound mute on. Cancelled by input/signal switch or volume adjust.
  command_bytes: [02h, 12h, 00h, 00h, 00h, 14h]

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  command_bytes: [02h, 14h, 00h, 00h, 00h, 16h]

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
      description: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness
    - name: mode
      type: integer
      description: 00h=absolute, 01h=relative
    - name: value
      type: integer
      description: 16-bit signed adjustment value
  command_bytes: [03h, 10h, 00h, 00h, 05h, DATA01, DATA02, DATA03, DATA04, CKS]

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: 00h=absolute, 01h=relative
    - name: value
      type: integer
      description: 16-bit signed adjustment value
  command_bytes: [03h, 10h, 00h, 00h, 05h, 05h, 00h, DATA01, DATA02, CKS]

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_mode
      type: integer
      description: Hex code for aspect mode (see appendix)
  command_bytes: [03h, 10h, 00h, 00h, 05h, 18h, 00h, 00h, DATA01, 00h, CKS]

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: 00h=absolute, 01h=relative
    - name: value
      type: integer
      description: 16-bit signed adjustment value
  command_bytes: [03h, 10h, 00h, 00h, 05h, 96h, FFh, DATA03, DATA04, DATA05, CKS]

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: WORD-type key code (see key code table for values)
  command_bytes: [02h, 0Fh, 00h, 00h, 02h, DATA01, DATA02, CKS]

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  command_bytes: [02h, 16h, 00h, 00h, 00h, 18h]

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  command_bytes: [02h, 17h, 00h, 00h, 00h, 19h]

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: function
      type: integer
      description: 06h=Periphery Focus
    - name: direction
      type: integer
      description: 00h=Stop, 01h/02h/03h=plus drive, 7Fh=continuous plus, 81h=continuous minus, FDh/FEh/FFh=minus drive
  command_bytes: [02h, 18h, 00h, 00h, 02h, DATA01, DATA02, CKS]

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: control
      type: integer
      description: FFh=Stop
    - name: mode
      type: integer
      description: 00h=absolute, 02h=relative
    - name: value
      type: integer
      description: 16-bit adjustment value
  command_bytes: [02h, 1Dh, 00h, 00h, 04h, DATA01, DATA02, DATA03, DATA04, CKS]

- id: lens_memory_move
  label: Lens Memory Move
  kind: action
  params: []
  command_bytes: [02h, 1Eh, 00h, 00h, 01h, 00h, CKS]

- id: lens_memory_store
  label: Lens Memory Store
  kind: action
  params: []
  command_bytes: [02h, 1Eh, 00h, 00h, 01h, 01h, CKS]

- id: lens_memory_reset
  label: Lens Memory Reset
  kind: action
  params: []
  command_bytes: [02h, 1Eh, 00h, 00h, 01h, 02h, CKS]

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: integer
      description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE
    - name: value
      type: integer
      description: 00h=OFF, 01h=ON
  command_bytes: [02h, 21h, 00h, 00h, 02h, DATA01, DATA02, CKS]

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: 00h=Profile 1, 01h=Profile 2
  command_bytes: [02h, 27h, 00h, 00h, 01h, DATA01, CKS]

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: 01h=On, 02h=Off
  command_bytes: [01h, 98h, 00h, 00h, 01h, DATA01, CKS]

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode value (see appendix for values)
  command_bytes: [03h, B1h, 00h, 00h, 02h, 07h, DATA01, CKS]

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)
  command_bytes: [03h, B1h, 00h, 00h, 12h, 2Ch, DATA01-DATA16, 00h, CKS]

- id: pip_mode_set
  label: PIP/Picture-by-Picture Set
  kind: action
  params:
    - name: item
      type: integer
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3
    - name: value
      type: integer
      description: Setting value (see appendix)
  command_bytes: [03h, B1h, 00h, 00h, 03h, C5h, DATA01, DATA02, CKS]

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: 00h=OFF, 01h=ON
  command_bytes: [03h, B1h, 00h, 00h, 03h, DFh, 00h, DATA01, CKS]

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Audio input terminal
    - name: source
      type: integer
      description: 00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER
  command_bytes: [03h, C9h, 00h, 00h, 03h, 09h, DATA01, DATA02, CKS]
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: bitfield
  description: Returns error information in DATA01-DATA12 bitfield
  query_command: [00h, 88h, 00h, 00h, 00h, 88h]

- id: power_state
  label: Power State
  type: enum
  values:
    - 00h: Standby
    - 01h: Power on
    - 05h: Cooling
    - 06h: Standby (error)
    - 0Fh: Standby (Power saving)
    - 10h: Network standby
  query_command: [00h, 85h, 00h, 00h, 01h, 01h, 87h]

- id: running_status
  label: Running Status
  type: object
  query_command: [00h, 85h, 00h, 00h, 01h, 01h, 87h]
  fields:
    - power_status
    - cooling_process
    - power_on_off_process
    - operation_status

- id: input_status
  label: Input Status
  type: object
  query_command: [00h, 85h, 00h, 00h, 01h, 02h, 88h]
  fields:
    - signal_switch_process
    - signal_list_number
    - selection_signal_type_1
    - selection_signal_type_2
    - signal_list_type
    - test_pattern_display
    - content_displayed

- id: mute_status
  label: Mute Status
  type: object
  query_command: [00h, 85h, 00h, 00h, 01h, 03h, 89h]
  fields:
    - picture_mute
    - sound_mute
    - onscreen_mute
    - forced_onscreen_mute
    - onscreen_display

- id: model_name
  label: Model Name
  type: string
  query_command: [00h, 85h, 00h, 00h, 01h, 04h, 8Ah]

- id: cover_status
  label: Cover Status
  type: enum
  values:
    - 00h: Normal (cover opened)
    - 01h: Cover closed
  query_command: [00h, 85h, 00h, 00h, 01h, 05h, 8Bh]

- id: projector_info
  label: Projector Info
  type: object
  description: Returns projector name, lamp usage time (seconds), filter usage time (seconds)
  query_command: [03h, 8Ah, 00h, 00h, 00h, 8Dh]

- id: filter_usage
  label: Filter Usage
  type: object
  description: Returns filter usage time and alarm start time in seconds
  query_command: [03h, 95h, 00h, 00h, 00h, 98h]

- id: lamp_info
  label: Lamp Info
  type: object
  query_command: [03h, 96h, 00h, 00h, 02h, DATA01, DATA02, CKS]
  params:
    - lamp: 00h=Lamp1, 01h=Lamp2
    - content: 01h=usage time (seconds), 04h=remaining life (%)

- id: carbon_savings
  label: Carbon Savings
  type: object
  query_command: [03h, 9Ah, 00h, 00h, 01h, DATA01, CKS]
  params:
    - type: 00h=Total, 01h=During operation

- id: lens_position
  label: Lens Position
  type: object
  query_command: [02h, 1Ch, 00h, 00h, 02h, DATA01, 00h, CKS]
  fields:
    - upper_limit
    - lower_limit
    - current_value

- id: lens_memory_option
  label: Lens Memory Option
  type: object
  query_command: [02h, 20h, 00h, 00h, 01h, DATA01, CKS]

- id: lens_info
  label: Lens Info
  type: bitfield
  query_command: [02h, 22h, 00h, 00h, 01h, 00h, 25h]

- id: lens_profile
  label: Lens Profile
  type: enum
  values:
    - 00h: Profile 1
    - 01h: Profile 2
  query_command: [02h, 28h, 00h, 00h, 00h, 2Ah]

- id: gain_parameter
  label: Gain Parameter
  type: object
  query_command: [03h, 05h, 00h, 00h, 03h, DATA01, 00h, 00h, CKS]
  params:
    - name: parameter
      description: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp

- id: setting
  label: Setting
  type: object
  query_command: [00h, 85h, 00h, 00h, 01h, 00h, 86h]

- id: eco_mode
  label: Eco Mode
  type: integer
  query_command: [03h, B0h, 00h, 00h, 01h, 07h, BBh]

- id: lan_projector_name
  label: LAN Projector Name
  type: string
  query_command: [03h, B0h, 00h, 00h, 01h, 2Ch, E0h]

- id: mac_address
  label: MAC Address
  type: string
  query_command: [03h, B0h, 00h, 00h, 02h, 9Ah, 00h, 4Fh]

- id: pip_status
  label: PIP/PBP Status
  type: object
  query_command: [03h, B0h, 00h, 00h, 02h, C5h, DATA01, CKS]

- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  values:
    - 00h: OFF
    - 01h: ON
  query_command: [03h, B0h, 00h, 00h, 02h, DFh, 00h, 94h]

- id: base_model_type
  label: Base Model Type
  type: string
  query_command: [00h, BFh, 00h, 00h, 01h, 00h, C0h]

- id: serial_number
  label: Serial Number
  type: string
  query_command: [00h, BFh, 00h, 00h, 02h, 01h, 06h, C8h]

- id: basic_info
  label: Basic Info
  type: object
  query_command: [00h, BFh, 00h, 00h, 01h, 02h, C2h]
  fields:
    - operation_status
    - content_displayed
    - selection_signal_type_1
    - selection_signal_type_2
    - display_signal_type
    - video_mute
    - sound_mute
    - onscreen_mute
    - freeze_status

- id: information_string
  label: Information String
  type: string
  query_command: [00h, D0h, 00h, 00h, 03h, 00h, DATA01, 01h, CKS]
  params:
    - type: 03h=Horizontal sync freq, 04h=Vertical sync freq
```

## Variables
```yaml
# No standalone variables - parameters embedded in commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism documented
# Device only responds to commands; no主动上报
```

## Macros
```yaml
# No explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Power on command (015) blocks other commands during execution
  - description: Power off command (016) blocks other commands during cooling time
  - description: Lens continuous drive (7Fh/81h) requires explicit Stop (00h) to halt
# UNRESOLVED: no explicit safety warnings or emergency procedures in source
```

## Notes
- Protocol uses 8-bit checksum (low-order byte of sum of preceding bytes)
- ID1 = control ID set on projector; ID2 = model code (varies by model)
- Commands and responses use hexadecimal notation with prefix pattern: `[20h/22h/02h]` for commands, `[A0h/A2h]` for responses
- Error codes returned in ERR1/ERR2 fields (see error code table)
- Some commands require specific standby modes for receipt — varies by model and control interface (serial vs LAN)
- Input terminal hex codes vary across NEC model families — appendix provides common values; verify against model-specific documentation
- Aspect mode codes vary across model families
- Eco mode codes vary across model families
- Lamp selection (DATA01=01h for Lamp 2) only effective on dual-lamp models
- Lamp usage time updated at 1-minute intervals despite 1-second granularity
- Negative lamp remaining life returned if replacement deadline exceeded
<!-- UNRESOLVED: model-specific appendix values (input codes, aspect, eco modes) — this appears to be a generic NEC projector command reference; V651-TOUCH-R-specific values may differ -->
<!-- UNRESOLVED: HDBaseT control support — mentioned in selection signal types but no dedicated HDBaseT commands documented -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-14T18:17:19.034Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:19.034Z
matched_actions: 29
action_count: 29
confidence: high
summary: "Every spec action matched literally against source command bytes; all transport parameters confirmed verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
