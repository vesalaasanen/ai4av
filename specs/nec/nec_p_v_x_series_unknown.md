---
spec_id: admin/nec-p-v-x-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC P V X Series Control Spec"
manufacturer: NEC
model_family: "NEC P V X Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NEC P V X Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-27T05:54:51.512Z
last_checked_at: 2026-05-31T06:46:47.618Z
generated_at: 2026-05-31T06:46:47.618Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model variants within the P V X Series not enumerated in source"
  - "firmware version compatibility not stated"
  - "serial flow control mode not explicitly stated (RTS/CTS pins wired but mode unspecified)"
  - "input terminal values referenced in appendix not included in refined source"
  - "flow control not explicitly stated; RTS/CTS pins connected"
  - "no unsolicited notification protocol described in source"
  - "no multi-step sequences explicitly described in source"
  - "no explicit safety warnings or interlock procedures in refined source."
  - "appendix with model-specific input terminal values, aspect values, eco mode values, base model types, and sub-input values not included in refined source"
  - "specific model variants within P V X Series not identified"
  - "maximum lens memory slots and profile count beyond Profile 1/2 not confirmed"
  - "response timing constraints and minimum command intervals not stated"
verification:
  verdict: verified
  checked_at: 2026-05-31T06:46:47.618Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source hex commands; transport parameters verified; perfect one-to-one coverage with source command catalog. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# NEC P V X Series Control Spec

## Summary
NEC P V X Series projector control via binary protocol over RS-232 serial or TCP/IP (port 7142). Covers power, input switching, picture/sound/onscreen mute, picture adjustment, volume, aspect, lens control, lens memory, eco mode, PIP, edge blending, freeze, shutter, and various status queries. Document reference BDT140013 Revision 7.1.

<!-- UNRESOLVED: specific model variants within the P V X Series not enumerated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: serial flow control mode not explicitly stated (RTS/CTS pins wired but mode unspecified) -->
<!-- UNRESOLVED: input terminal values referenced in appendix not included in refined source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not explicitly stated; RTS/CTS pins connected
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from power on/off commands
  - queryable    # inferred from query commands (error status, information, settings, etc.)
  - routable     # inferred from input switch command
  - levelable    # inferred from volume, brightness, contrast, color, hue, sharpness adjustments
```

## Actions
```yaml
actions:
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: 00h 88h 00h 00h 00h 88h
    description: Gets error information from projector (12 bytes of bit-mapped error status)
    params: []

  - id: power_on
    label: Power On
    kind: action
    command: 02h 00h 00h 00h 00h 02h
    description: Turns on projector power. No other commands accepted during power-on sequence.
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: 02h 01h 00h 00h 00h 03h
    description: Turns off projector power. No other commands accepted during cooling period.
    params: []

  - id: input_switch_change
    label: Input Switch Change
    kind: action
    command: 02h 03h 00h 00h 02h 01h <DATA01> <CKS>
    description: Switches the input terminal or entry list
    params:
      - name: input_terminal
        type: integer
        description: Input terminal value (hex byte) - see appendix for model-specific values

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: 02h 10h 00h 00h 00h 12h
    description: Turns picture mute on. Cleared by input switch or video signal switch.
    params: []

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: 02h 11h 00h 00h 00h 13h
    description: Turns picture mute off
    params: []

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: 02h 12h 00h 00h 00h 14h
    description: Turns sound mute on. Cleared by input switch, video signal switch, or volume adjust.
    params: []

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: 02h 13h 00h 00h 00h 15h
    description: Turns sound mute off
    params: []

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: 02h 14h 00h 00h 00h 16h
    description: Turns onscreen mute on. Cleared by input switch or video signal switch.
    params: []

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: 02h 15h 00h 00h 00h 17h
    description: Turns onscreen mute off
    params: []

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: 03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>
    description: Adjusts picture parameters (brightness, contrast, color, hue, sharpness)
    params:
      - name: target
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "Adjustment mode: 00h=Absolute, 01h=Relative"
      - name: value
        type: integer
        description: "Adjustment value (16-bit signed, little-endian in DATA03+DATA04)"

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: 03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>
    description: Adjusts sound volume
    params:
      - name: mode
        type: integer
        description: "Adjustment mode: 00h=Absolute, 01h=Relative"
      - name: value
        type: integer
        description: "Adjustment value (16-bit signed, little-endian in DATA02+DATA03)"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: 03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>
    description: Adjusts the aspect ratio
    params:
      - name: aspect_value
        type: integer
        description: Aspect value - see appendix for model-specific values

  - id: other_adjust
    label: Other Adjust
    kind: action
    command: 03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>
    description: Adjusts various gains (lamp adjust / light adjust)
    params:
      - name: target
        type: integer
        description: "DATA01=96h, DATA02=FFh for LAMP ADJUST / LIGHT ADJUST"
      - name: mode
        type: integer
        description: "Adjustment mode: 00h=Absolute, 01h=Relative"
      - name: value
        type: integer
        description: "Adjustment value (16-bit signed, little-endian in DATA04+DATA05)"

  - id: information_request
    label: Information Request
    kind: query
    command: 03h 8Ah 00h 00h 00h 8Dh
    description: Gets projector information including name, lamp usage time (seconds), filter usage time (seconds)
    params: []

  - id: filter_usage_info_request
    label: Filter Usage Information Request
    kind: query
    command: 03h 95h 00h 00h 00h 98h
    description: Gets filter usage time (seconds) and filter alarm start time (seconds)
    params: []

  - id: lamp_info_request_3
    label: Lamp Information Request 3
    kind: query
    command: 03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>
    description: Gets lamp usage time or remaining life. Eco mode values reflect eco settings.
    params:
      - name: lamp
        type: integer
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: content
        type: integer
        description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

  - id: carbon_savings_info_request
    label: Carbon Savings Information Request
    kind: query
    command: 03h 9Ah 00h 00h 01h <DATA01> <CKS>
    description: Gets carbon savings values
    params:
      - name: type
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: 02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>
    description: Sends remote control key code (WORD type)
    params:
      - name: key_code
        type: integer
        description: "Key code value (WORD): 2=POWER ON, 3=POWER OFF, 5=AUTO, 6=MENU, 7=UP, 8=DOWN, 9=RIGHT, 10=LEFT, 11=ENTER, 12=EXIT, 13=HELP, 15=MAGNIFY UP, 16=MAGNIFY DOWN, 19=MUTE, 41=PICTURE, 75=COMPUTER1, 76=COMPUTER2, 79=VIDEO1, 81=S-VIDEO1, 132=VOLUME UP, 133=VOLUME DOWN, 138=FREEZE, 163=ASPECT, 215=SOURCE, 238=LAMP MODE/ECO"

  - id: shutter_close
    label: Shutter Close
    kind: action
    command: 02h 16h 00h 00h 00h 18h
    description: Closes the lens shutter
    params: []

  - id: shutter_open
    label: Shutter Open
    kind: action
    command: 02h 17h 00h 00h 00h 19h
    description: Opens the lens shutter
    params: []

  - id: lens_control
    label: Lens Control
    kind: action
    command: 02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>
    description: Adjusts lens position (drive-based control)
    params:
      - name: target
        type: integer
        description: "06h=Periphery Focus"
      - name: direction
        type: integer
        description: "00h=Stop, 01h=Drive 1s plus, 02h=Drive 0.5s plus, 03h=Drive 0.25s plus, 7Fh=Drive plus (continuous), 81h=Drive minus (continuous), FDh=Drive 0.25s minus, FEh=Drive 0.5s minus, FFh=Drive 1s minus"

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: 02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>
    description: Gets adjusted values of lens position (upper/lower limits and current value)
    params:
      - name: target
        type: integer
        description: Lens adjustment target

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: 02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>
    description: Adjusts lens position (value-based control)
    params:
      - name: target
        type: integer
        description: "FFh=Stop (mode and value ignored)"
      - name: mode
        type: integer
        description: "00h=Absolute, 02h=Relative"
      - name: value
        type: integer
        description: "Adjustment value (16-bit, little-endian in DATA03+DATA04)"

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: 02h 1Eh 00h 00h 01h <DATA01> <CKS>
    description: Controls lens memory (not reference lens memory)
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: 02h 1Fh 00h 00h 01h <DATA01> <CKS>
    description: Controls reference lens memory for the profile specified by LENS PROFILE SET
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: 02h 20h 00h 00h 01h <DATA01> <CKS>
    description: Gets lens memory option setting
    params:
      - name: option
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: 02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>
    description: Sets lens memory option
    params:
      - name: option
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: lens_info_request
    label: Lens Information Request
    kind: query
    command: 02h 22h 00h 00h 01h 00h 25h
    description: Gets lens operation status (bit-mapped: lens memory, zoom, focus, lens shift H/V)
    params: []

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: 02h 27h 00h 00h 01h <DATA01> <CKS>
    description: Selects profile number for reference lens memory
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: 02h 28h 00h 00h 00h 2Ah
    description: Gets selected profile number of reference lens memory
    params: []

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: 03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>
    description: Gets adjusted values of picture, volume, and lamp/light parameters including limits, defaults, current value, and adjustment widths
    params:
      - name: target
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"

  - id: setting_request
    label: Setting Request
    kind: query
    command: 00h 85h 00h 00h 01h 00h 86h
    description: Gets projector settings including base model type, sound function availability, profile/sleep timer capability
    params: []

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: 00h 85h 00h 00h 01h 01h 87h
    description: Gets operation status - power status, cooling process, power on/off process, operation state
    params: []

  - id: input_status_request
    label: Input Status Request
    kind: query
    command: 00h 85h 00h 00h 01h 02h 88h
    description: Gets input signal status - signal switch process, signal list number, selection signal type, test pattern display, content displayed
    params: []

  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: 00h 85h 00h 00h 01h 03h 89h
    description: Gets mute status - picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display
    params: []

  - id: model_name_request
    label: Model Name Request
    kind: query
    command: 00h 85h 00h 00h 01h 04h 8Ah
    description: Gets model name (NUL-terminated string)
    params: []

  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: 00h 85h 00h 00h 01h 05h 8Bh
    description: Gets mirror cover or lens cover status
    params: []

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: 01h 98h 00h 00h 01h <DATA01> <CKS>
    description: Turns freeze function on or off
    params:
      - name: state
        type: integer
        description: "01h=Freeze on, 02h=Freeze off"

  - id: information_string_request
    label: Information String Request
    kind: query
    command: 00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>
    description: Gets information strings displayed on projector
    params:
      - name: info_type
        type: integer
        description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: 03h B0h 00h 00h 01h 07h BBh
    description: Gets eco mode setting (light mode or lamp mode depending on projector)
    params: []

  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: 03h B0h 00h 00h 01h 2Ch E0h
    description: Gets projector name (NUL-terminated, up to 17 bytes)
    params: []

  - id: lan_mac_address_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: 03h B0h 00h 00h 02h 9Ah 00h 4Fh
    description: Gets MAC address of the projector
    params: []

  - id: pip_picture_by_picture_request
    label: PIP/Picture by Picture Request
    kind: query
    command: 03h B0h 00h 00h 02h C5h <DATA01> <CKS>
    description: Gets PIP or Picture by Picture setting
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: 03h B0h 00h 00h 02h DFh 00h 94h
    description: Gets edge blending setting
    params: []

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: 03h B1h 00h 00h 02h 07h <DATA01> <CKS>
    description: Sets eco mode (light mode or lamp mode depending on projector)
    params:
      - name: value
        type: integer
        description: Eco mode value - see appendix for model-specific values

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: 03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>
    description: Sets projector name (up to 16 bytes)
    params:
      - name: name
        type: string
        description: Projector name (up to 16 bytes)

  - id: pip_picture_by_picture_set
    label: PIP/Picture by Picture Set
    kind: action
    command: 03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>
    description: Sets PIP or Picture by Picture
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "For MODE: 00h=PIP, 01h=PICTURE BY PICTURE. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. For SUB INPUT: see appendix."

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: 03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>
    description: Sets edge blending mode
    params:
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: 00h BFh 00h 00h 01h 00h C0h
    description: Gets base model type and model name
    params: []

  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: 00h BFh 00h 00h 02h 01h 06h C8h
    description: Gets projector serial number (NUL-terminated, up to 16 bytes)
    params: []

  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: 00h BFh 00h 00h 01h 02h C2h
    description: Gets basic operation status - operation status, content displayed, signal type, video/sound/onscreen mute, freeze status
    params: []

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: 03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>
    description: Sets audio input selection for a given input terminal
    params:
      - name: input_terminal
        type: integer
        description: Input terminal value - see appendix
      - name: audio_source
        type: integer
        description: "00h=Terminal specified in input_terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: object
    description: 12-byte bit-mapped error status (cover, fan, temperature, power, lamp, formatter, FPGA, mirror, ballast, iris, interlock, etc.)

  - id: command_result
    type: enum
    values: [success, error]
    description: Binary response with ERR1/ERR2 error codes on failure

  - id: power_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: From running status request DATA03

  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: From running status request DATA06 and basic information request DATA01

  - id: input_signal_type
    type: enum
    values: [COMPUTER, VIDEO, S_VIDEO, COMPONENT, DVI_D, HDMI, DisplayPort, VIEWER_1_5, VIEWER_6_10]
    description: From input status request DATA04

  - id: mute_status
    type: object
    description: Picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display - each on/off

  - id: cover_status
    type: enum
    values: [normal_opened, closed]
    description: Mirror cover or lens cover status

  - id: lens_position
    type: object
    description: Upper/lower adjustment limits and current value for a lens target

  - id: lens_operation_status
    type: object
    description: Bit-mapped status of lens memory, zoom, focus, lens shift H/V - each stop/in_operation

  - id: gain_parameter
    type: object
    description: Adjustment status, upper/lower limits, default, current value, wide/narrow adjustment width for a gain target

  - id: lamp_usage_time
    type: integer
    description: Lamp usage time in seconds

  - id: lamp_remaining_life
    type: integer
    description: Lamp remaining life percentage (negative if deadline exceeded)

  - id: filter_usage_time
    type: integer
    description: Filter usage time in seconds

  - id: model_name
    type: string
    description: Projector model name (NUL-terminated)

  - id: projector_name
    type: string
    description: LAN projector name (NUL-terminated)

  - id: serial_number
    type: string
    description: Projector serial number (NUL-terminated)

  - id: mac_address
    type: string
    description: Projector MAC address (6 bytes)

  - id: eco_mode
    type: integer
    description: Current eco mode setting value

  - id: edge_blending_status
    type: enum
    values: [off, on]

  - id: pip_pbp_status
    type: object
    description: PIP/Picture by Picture mode, start position, sub input settings

  - id: freeze_status
    type: enum
    values: [off, on]
    description: Freeze function status

  - id: information_string
    type: string
    description: Horizontal or vertical synchronous frequency string
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    description: Sound volume level

  - id: brightness
    type: integer
    description: Picture brightness level

  - id: contrast
    type: integer
    description: Picture contrast level

  - id: color
    type: integer
    description: Picture color level

  - id: hue
    type: integer
    description: Picture hue level

  - id: sharpness
    type: integer
    description: Picture sharpness level

  - id: lamp_adjust
    type: integer
    description: Lamp/light adjust level

  - id: eco_mode_setting
    type: integer
    description: Eco mode (light/lamp mode) setting

  - id: projector_name
    type: string
    description: LAN projector name (up to 16 bytes)

  - id: selected_input
    type: integer
    description: Current input terminal selection
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in refined source.
# Error status bitfield includes cover error, fan error, temperature error, interlock switch open -
# but no interlock procedure or safety sequencing described.
```

## Notes
- Binary protocol: commands are hex byte sequences with frame structure `[cmd_byte1] [cmd_byte2] [ID1] [ID2] [LEN] [DATA...] [CKS]`.
- ID1 = Control ID (set on projector), ID2 = Model code (varies by model). These are substituted at send time.
- Checksum (CKS) = low-order byte of sum of all preceding bytes.
- Lamp usage time and filter usage time update at one-minute intervals despite being reported in seconds.
- Power on/off commands block all other commands during execution (including cooling period for power off).
- Picture mute and onscreen mute are auto-cleared by input switch or video signal switch. Sound mute is also auto-cleared by volume adjustment.
- Lamp remaining life returns negative value when lamp replacement deadline is exceeded.
- Remote key codes (command 050) emulate physical remote control buttons; the source lists 22 distinct key codes.
- PIP/PBP sub-input values and input terminal values reference an appendix ("Supplementary Information by Command") not included in the refined source.
<!-- UNRESOLVED: appendix with model-specific input terminal values, aspect values, eco mode values, base model types, and sub-input values not included in refined source -->
<!-- UNRESOLVED: specific model variants within P V X Series not identified -->
<!-- UNRESOLVED: maximum lens memory slots and profile count beyond Profile 1/2 not confirmed -->
<!-- UNRESOLVED: response timing constraints and minimum command intervals not stated -->
````Spec output above. 53 actions enumerated (matching all command list entries). Transport: serial (RS-232C, multi-baud) + TCP (port 7142). Key gap: appendix with model-specific input terminal/aspect/eco-mode values not in refined source.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-27T05:54:51.512Z
last_checked_at: 2026-05-31T06:46:47.618Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T06:46:47.618Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source hex commands; transport parameters verified; perfect one-to-one coverage with source command catalog. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model variants within the P V X Series not enumerated in source"
- "firmware version compatibility not stated"
- "serial flow control mode not explicitly stated (RTS/CTS pins wired but mode unspecified)"
- "input terminal values referenced in appendix not included in refined source"
- "flow control not explicitly stated; RTS/CTS pins connected"
- "no unsolicited notification protocol described in source"
- "no multi-step sequences explicitly described in source"
- "no explicit safety warnings or interlock procedures in refined source."
- "appendix with model-specific input terminal values, aspect values, eco mode values, base model types, and sub-input values not included in refined source"
- "specific model variants within P V X Series not identified"
- "maximum lens memory slots and profile count beyond Profile 1/2 not confirmed"
- "response timing constraints and minimum command intervals not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
