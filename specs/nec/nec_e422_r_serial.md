---
spec_id: admin/nec_e422_r
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC E422-R Control Spec"
manufacturer: NEC
model_family: E422-R
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - E422-R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:17:26.590Z
generated_at: 2026-04-25T21:17:26.590Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:17:26.590Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions verified against source with exact hex opcodes; transport parameters all confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC E422-R Control Spec

## Summary
NEC professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control. Supports power management, input routing, picture/sound muting, lens control, eco mode, and comprehensive status querying via hexadecimal command protocol.

<!-- UNRESOLVED: exact model E422-R confirmation; manual covers multiple projector models; some commands reference appendix for values not fully enumerated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port for LAN control
serial:
  baud_rate: 115200  # also supports: 38400, 19200, 9600, 4800
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
- id: power_on
  label: Power On
  kind: action
  params: []
  command: 02h 00h 00h 00h 00h 02h
  response: A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: power_off
  label: Power Off
  kind: action
  params: []
  command: 02h 01h 00h 00h 00h 03h
  response: A2h 01h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: input_sw_change
  label: Input Switch
  kind: action
  params:
    - name: input
      type: string
      description: Hex code for input terminal (see appendix)
  command: 02h 03h 00h 00h 02h 01h <DATA01> <CKS>
  response: 22h 03h <ID1> <ID2> 01h <DATA01> <CKS>

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  command: 02h 10h 00h 00h 00h 12h
  response: A2h 10h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []
  command: 02h 11h 00h 00h 00h 13h
  response: A2h 11h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  command: 02h 12h 00h 00h 00h 14h
  response: A2h 12h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []
  command: 02h 13h 00h 00h 00h 15h
  response: A2h 13h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  command: 02h 14h 00h 00h 00h 16h
  response: A2h 14h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []
  command: 02h 15h 00h 00h 00h 17h
  response: A2h 15h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

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
      description: Adjustment value (16-bit)
  command: 03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: 00h=absolute, 01h=relative
    - name: value
      type: integer
      description: Adjustment value (16-bit)
  command: 03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect
      type: integer
      description: Hex aspect code (see appendix)
  command: 03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: 96h=Lamp/Light adjust
    - name: mode
      type: integer
      description: 00h=absolute, 01h=relative
    - name: value
      type: integer
      description: Adjustment value (16-bit)
  command: 03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: keycode
      type: integer
      description: Key code (WORD type, see key code table)
  command: 02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  command: 02h 16h 00h 00h 00h 18h
  response: A2h 16h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  command: 02h 17h 00h 00h 00h 19h
  response: A2h 17h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: 06h=Periphery Focus
    - name: direction
      type: integer
      description: 00h=Stop, 01h/02h/03h=plus direction, 7Fh=continuous plus, 81h=continuous minus, FDh/FEh/FFh=minus direction
  command: 02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: action
      type: integer
      description: FFh=Stop
    - name: mode
      type: integer
      description: 00h=absolute, 02h=relative
    - name: value
      type: integer
      description: 16-bit adjustment value
  command: 02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: 00h=MOVE, 01h=STORE, 02h=RESET
  command: 02h 1Eh 00h 00h 01h <DATA01> <CKS>

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: 00h=MOVE, 01h=STORE, 02h=RESET
  command: 02h 1Fh 00h 00h 01h <DATA01> <CKS>

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
  command: 02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: 00h=Profile 1, 01h=Profile 2
  command: 02h 27h 00h 00h 01h <DATA01> <CKS>

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: 01h=On, 02h=Off
  command: 01h 98h 00h 00h 01h <DATA01> <CKS>

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode value (see appendix)
  command: 03h B1h 00h 00h 02h 07h <DATA01> <CKS>

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)
  command: 03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3
    - name: value
      type: integer
      description: Setting value (depends on target)
  command: 03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: 00h=OFF, 01h=ON
  command: 03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal (see appendix)
    - name: source
      type: integer
      description: 00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER
  command: 03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>

- id: error_status_request
  label: Error Status Request
  kind: action
  params: []
  command: 00h 88h 00h 00h 00h 88h
  response: 20h 88h <ID1> <ID2> 0Ch <DATA01-12> <CKS>
  # Returns 12 bytes of error bitfield data

- id: information_request
  label: Information Request
  kind: action
  params: []
  command: 03h 8Ah 00h 00h 00h 8Dh
  response: 23h 8Ah <ID1> <ID2> 62h <DATA01-98> <CKS>

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: action
  params: []
  command: 03h 95h 00h 00h 00h 98h
  response: 23h 95h <ID1> <ID2> 08h <DATA01-08> <CKS>

- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: action
  params:
    - name: lamp
      type: integer
      description: 00h=Lamp 1, 01h=Lamp 2
    - name: content
      type: integer
      description: 01h=usage time, 04h=remaining life
  command: 03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>

- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: action
  params:
    - name: type
      type: integer
      description: 00h=Total, 01h=During operation
  command: 03h 9Ah 00h 00h 01h <DATA01> <CKS>

- id: lens_control_request
  label: Lens Control Request
  kind: action
  params:
    - name: target
      type: integer
  command: 02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>
  response: 22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02-07> <CKS>

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: action
  params:
    - name: option
      type: integer
      description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE
  command: 02h 20h 00h 00h 01h <DATA01> <CKS>

- id: lens_info_request
  label: Lens Information Request
  kind: action
  params: []
  command: 02h 22h 00h 00h 01h 00h 25h

- id: lens_profile_request
  label: Lens Profile Request
  kind: action
  params: []
  command: 02h 28h 00h 00h 00h 2Ah

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: action
  params:
    - name: parameter
      type: integer
      description: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp
  command: 03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>

- id: setting_request
  label: Setting Request
  kind: action
  params: []
  command: 00h 85h 00h 00h 01h 00h 86h
  response: 20h 85h <ID1> <ID2> 20h <DATA01-32> <CKS>

- id: running_status_request
  label: Running Status Request
  kind: action
  params: []
  command: 00h 85h 00h 00h 01h 01h 87h
  response: 20h 85h <ID1> <ID2> 10h <DATA01-16> <CKS>

- id: input_status_request
  label: Input Status Request
  kind: action
  params: []
  command: 00h 85h 00h 00h 01h 02h 88h
  response: 20h 85h <ID1> <ID2> 10h <DATA01-16> <CKS>

- id: mute_status_request
  label: Mute Status Request
  kind: action
  params: []
  command: 00h 85h 00h 00h 01h 03h 89h
  response: 20h 85h <ID1> <ID2> 10h <DATA01-16> <CKS>

- id: model_name_request
  label: Model Name Request
  kind: action
  params: []
  command: 00h 85h 00h 00h 01h 04h 8Ah
  response: 20h 85h <ID1> <ID2> 20h <DATA01-32> <CKS>

- id: cover_status_request
  label: Cover Status Request
  kind: action
  params: []
  command: 00h 85h 00h 00h 01h 05h 8Bh
  response: 20h 85h <ID1> <ID2> 01h <DATA01> <CKS>

- id: information_string_request
  label: Information String Request
  kind: action
  params:
    - name: type
      type: integer
      description: 03h=Horizontal sync freq, 04h=Vertical sync freq
  command: 00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>

- id: eco_mode_request
  label: Eco Mode Request
  kind: action
  params: []
  command: 03h B0h 00h 00h 01h 07h BBh
  response: 23h B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: action
  params: []
  command: 03h B0h 00h 00h 01h 2Ch E0h
  response: 23h B0h <ID1> <ID2> 12h 2Ch <DATA01-17> <CKS>

- id: lan_mac_address_request
  label: LAN MAC Address Request
  kind: action
  params: []
  command: 03h B0h 00h 00h 02h 9Ah 00h 4Fh
  response: 23h B0h <ID1> <ID2> 08h 9Ah 00h <DATA01-06> <CKS>

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: action
  params:
    - name: target
      type: integer
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3
  command: 03h B0h 00h 00h 02h C5h <DATA01> <CKS>

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: action
  params: []
  command: 03h B0h 00h 00h 02h DFh 00h 94h
  response: 23h B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>

- id: base_model_type_request
  label: Base Model Type Request
  kind: action
  params: []
  command: 00h BFh 00h 00h 01h 00h C0h
  response: 20h BFh <ID1> <ID2> 10h 00h <DATA01-15> <CKS>

- id: serial_number_request
  label: Serial Number Request
  kind: action
  params: []
  command: 00h BFh 00h 00h 02h 01h 06h C8h
  response: 20h BFh <ID1> <ID2> 12h 01h 06h <DATA01-16> <CKS>

- id: basic_information_request
  label: Basic Information Request
  kind: action
  params: []
  command: 00h BFh 00h 00h 01h 02h C2h
  response: 20h BFh <ID1> <ID2> 10h 02h <DATA01-15> <CKS>

# UNRESOLVED: commands 053-3 through 053-11 partially documented; lens memory appendix values not fully enumerated in source
```

## Feedbacks
```yaml
- id: error_status_response
  type: bitfield
  description: 12-byte error status bitfield (command 009)
  fields:
    DATA01: Bit0=Cover, Bit1=Temp, Bit3=Fan, Bit4=Fan, Bit5=Power, Bit6=Lamp, Bit7=Lamp
    DATA02: Bit0=Lamp time exceeded, Bit1=Formatter, Bit2=Lamp2
    DATA03: Bit1=FPGA, Bit2=Temp sensor, Bit4=Lamp data, Bit5=Mirror cover, Bit6=Lamp2 moratorium, Bit7=Lamp2 time
    DATA04: Bit1=Lamp2 data, Bit2=Dust temp, Bit3=Foreign matter, Bit5=Ballast, Bit6=Iris, Bit7=Lens
    DATA09: Bit0=Portrait, Bit1=Interlock, Bit2=Slave CPU, Bit3=Formatter

- id: power_response
  type: enum
  values: [standby, power_on, cooling]
  # from 078-2 RUNNING STATUS REQUEST

- id: input_status_response
  type: object
  description: Input signal status from command 078-3
  fields:
    signal_switch: [not_executed, executing]
    signal_list_number: integer
    signal_type_1: [1-5, COMPONENT, HDMI, DVI-D, DisplayPort, VIEWER, NETWORK, etc.]
    signal_type_2: [COMPUTER, VIDEO, S-VIDEO, COMPONENT, HDMI, DVI-D, DisplayPort, HDBaseT, VIEWER, SDI]
    content: [video_signal, no_signal, viewer, test_pattern, lan_displayed]

- id: mute_status_response
  type: object
  description: Mute status from command 078-4
  fields:
    picture_mute: [off, on]
    sound_mute: [off, on]
    onscreen_mute: [off, on]
    forced_onscreen_mute: [off, on]
    onscreen_display: [not_displayed, displayed]

- id: model_name_response
  type: string
  description: Up to 32-character NUL-terminated model name

- id: cover_status_response
  type: enum
  values: [normal, closed]

- id: projector_info_response
  type: object
  description: From command 037 INFORMATION REQUEST
  fields:
    name: string (DATA01-49, NUL-terminated)
    lamp_usage_seconds: integer (DATA83-86)
    filter_usage_seconds: integer (DATA87-90)

- id: filter_usage_response
  type: object
  fields:
    usage_time_seconds: integer (DATA01-04)
    alarm_start_time_seconds: integer (DATA05-08, -1 if undefined)

- id: lamp_info_response
  type: object
  fields:
    lamp: [lamp_1, lamp_2]
    content: [usage_time, remaining_life_percent]
    value: integer
    # negative value indicates replacement deadline exceeded

- id: carbon_savings_response
  type: object
  fields:
    type: [total, during_operation]
    kilograms: integer (max 99999)
    milligrams: integer (max 999999)

- id: lens_position_response
  type: object
  from_command: 053-1
  fields:
    upper_limit: integer (16-bit)
    lower_limit: integer (16-bit)
    current_value: integer (16-bit)

- id: lens_memory_option_response
  type: object
  fields:
    option: [load_by_signal, forced_mute]
    value: [off, on]

- id: lens_info_response
  type: bitfield
  fields:
    bit0: [lens_memory_stop, lens_memory_operating]
    bit1: [zoom_stop, zoom_operating]
    bit2: [focus_stop, focus_operating]
    bit3: [lens_shift_h_stop, lens_shift_h_operating]
    bit4: [lens_shift_v_stop, lens_shift_v_operating]

- id: lens_profile_response
  type: enum
  values: [profile_1, profile_2]

- id: gain_parameter_response
  type: object
  description: From command 060-1
  fields:
    status: [display_not_possible, adjustment_not_possible, adjustment_possible, gain_not_exist]
    upper_limit: integer (16-bit)
    lower_limit: integer (16-bit)
    default_value: integer (16-bit)
    current_value: integer (16-bit)
    wide_adjustment_width: integer (16-bit)
    narrow_adjustment_width: integer (16-bit)
    default_valid: [invalid, valid]

- id: eco_mode_response
  type: integer
  description: Eco mode value (see appendix for mapping)

- id: projector_name_response
  type: string
  description: Up to 17-character NUL-terminated projector name

- id: mac_address_response
  type: string
  description: 6-byte MAC address (hex)

- id: pip_pbp_response
  type: object
  fields:
    mode: [pip, picture_by_picture]
    position: [top_left, top_right, bottom_left, bottom_right]

- id: edge_blending_response
  type: enum
  values: [off, on]

- id: serial_number_response
  type: string
  description: Up to 16-character NUL-terminated serial number

- id: basic_info_response
  type: object
  description: From command 305-3
  fields:
    operation_status: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    content_displayed: [video_signal, no_signal, viewer, test_pattern, lan_displayed, test_pattern_user, signal_switching]
    signal_type_1: integer
    signal_type_2: [COMPUTER, VIDEO, S-VIDEO, COMPONENT, HDMI, DVI-D, DisplayPort, VIEWER, HDBaseT, SDI]
    display_signal_type: [NTSC3.58, NTSC4.43, PAL, PAL60, SECAM, etc.]
    video_mute: [off, on]
    sound_mute: [off, on]
    onscreen_mute: [off, on]
    freeze_status: [off, on]

- id: information_string_response
  type: string
  description: NUL-terminated string (horizontal or vertical sync frequency)

- id: execution_result
  type: enum
  values: [success, error]
  # Generic; actual ERR1/ERR2 codes defined below

- id: error_codes
  type: enum
  values:
    - 00h/00h: Unrecognized command
    - 00h/01h: Command not supported
    - 01h/00h: Invalid value
    - 01h/01h: Invalid input terminal
    - 01h/02h: Invalid language
    - 02h/00h: Memory allocation error
    - 02h/02h: Memory in use
    - 02h/03h: Value cannot be set
    - 02h/04h: Forced onscreen mute on
    - 02h/06h: Viewer error
    - 02h/07h: No signal
    - 02h/08h: Test pattern or filter displayed
    - 02h/09h: No PC card
    - 02h/0Ah: Memory operation error
    - 02h/0Ch: Entry list displayed
    - 02h/0Dh: Power is off
    - 02h/0Eh: Command execution failed
    - 02h/0Fh: No authority
    - 03h/00h: Incorrect gain number
    - 03h/01h: Invalid gain
    - 03h/02h: Adjustment failed
```

## Variables
```yaml
# UNRESOLVED: continuous parameters like brightness, contrast, volume are
# handled via Actions (picture_adjust, volume_adjust) rather than
# independent Variables. No standalone settable parameter commands
# beyond what is covered in Actions.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source.
# Device only responds to commands; does not push status autonomously.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - type: standby_mode_requirement
    description: Some models require specific standby modes to receive commands via serial or LAN. Serial supported modes: Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON. LAN supported modes: Normal, NORMAL, NETWORK STANDBY, SLEEP, HTBaseT STANDBY, OFF, ON, STANDBY POWER ON. Supported modes vary by model.
  - type: power_transition_blocking
    description: While POWER ON command is executing, no other command is accepted. While POWER OFF command is executing (including cooling time), no other command is accepted.
# UNRESOLVED: voltage, current, power consumption specifications not provided
# UNRESOLVED: no explicit safety interlocks for lens travel limits described
```

## Notes

**Command Protocol Format:** All commands use hexadecimal notation. Basic format: `[PREAMBLE] [CMD] [ID1] [ID2] [LEN] [DATA...] [CKS]`. Checksum (CKS) = low-order byte of sum of all preceding bytes.

**Control ID:** Commands require `<ID1>` (control ID set on projector) and `<ID2>` (model code varies by model).

**Serial Config:** The projector supports multiple baud rates (115200/38400/19200/9600/4800 bps). No auto-baud detection described; the higher rate may need to be negotiated or set manually.

**LAN Control:** TCP port 7142. No mention of HTTP/REST protocol; commands are sent raw over TCP.

**Input Terminal Codes (partial):** COMPUTER=01h, COMPUTER2=02h, VIDEO=06h, S-VIDEO=0Bh, HDMI=A1h/1Ah, HDMI2=A2h/1Bh, DisplayPort=A6h, DVI-D=9Ch, NETWORK/LAN=20h, HDBaseT=BFh, USB-B=22h.

**Aspect Codes:** AUTO=00h, WIDE ZOOM=01h, 16:9=02h, NATIVE=03h, 4:3=04h, 15:9=05h, 16:10=06h, LETTER BOX=07h, FULL=09h/10h.

**Eco Mode Codes:** OFF=00h, Normal=00h/01h, ECO=02h/03h, AUTO ECO=01h, LONG LIFE=04h, BOOST=05h, SILENT=06h.

**Key Codes (partial):** POWER ON=0200h, POWER OFF=0300h, MENU=0600h, UP=0700h, DOWN=0800h, LEFT=0A00h, RIGHT=0900h, ENTER=0B00h, EXIT=0C00h, MUTE=1300h, VOLUME UP=8500h, VOLUME DOWN=8600h, COMPUTER1=4B00h, VIDEO1=4F00h, HDMI=4C00h ( COMPUTER2), FREEZE=8A00h, ASPECT=A300h, SOURCE=D700h, LAMP MODE/ECO=EE00h.

<!-- UNRESOLVED: full appendix tables for input terminal codes by model variant not reproduced in source -->
<!-- UNRESOLVED: standby mode compatibility matrix per model not enumerated -->
<!-- UNRESOLVED: HDBaseT control mentioned but not detailed -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: some DATA01/DATA02 byte values in command examples include extra trailing bytes that appear to be part of the DATA payload rather than separate fields (e.g., "02h 00h 00h 00h 00h 02h" — the 02h after LEN may be part of the data length encoding) -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:17:26.590Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:17:26.590Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions verified against source with exact hex opcodes; transport parameters all confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
