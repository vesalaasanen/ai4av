---
spec_id: admin/nec-np-v3-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP-V3 Series Control Spec"
manufacturer: NEC
model_family: "NP-V3 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NP-V3 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:52:44.515Z
last_checked_at: 2026-06-02T22:11:17.978Z
generated_at: 2026-06-02T22:11:17.978Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific NP-V3 input terminal codes not listed in the supplementary tables; the manual covers many NEC models but NP-V3 is not explicitly enumerated in the appendix tables"
  - "no authentication or password procedure documented"
  - "protocol version not stated"
  - "RTS/CTS pins wired but no flow control setting stated"
  - "no unsolicited notification/event mechanism described in source."
  - "no multi-step macro sequences described in source"
  - "power-on sequencing requirements not fully documented"
  - "interlock behavior details not fully documented"
  - "NP-V3 Series not explicitly listed in the supplementary input terminal, aspect, or eco mode tables"
  - "specific input terminal hex codes for NP-V3 models not confirmed"
  - "specific eco mode values for NP-V3 models not confirmed"
  - "specific aspect ratio values for NP-V3 models not confirmed"
  - "standby mode requirements for NP-V3 to receive LAN commands not confirmed"
  - "maximum concurrent connection count for TCP port 7142 not stated"
  - "command response timeout not stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:11:17.978Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "All 50 spec actions traced to source (dip-safe re-verify). (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# NEC NP-V3 Series Control Spec

## Summary
NEC NP-V3 Series projector control via binary protocol over RS-232C serial or TCP/IP (wired LAN). The protocol uses fixed-length and variable-length hexadecimal command frames with a checksum byte. This spec covers power control, input switching, picture/sound/onscreen mute, volume, picture adjustment, lens control, shutter, freeze, eco mode, PIP, edge blending, and extensive status query commands.

<!-- UNRESOLVED: specific NP-V3 input terminal codes not listed in the supplementary tables; the manual covers many NEC models but NP-V3 is not explicitly enumerated in the appendix tables -->
<!-- UNRESOLVED: no authentication or password procedure documented -->
<!-- UNRESOLVED: protocol version not stated -->

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
  flow_control: none  # UNRESOLVED: RTS/CTS pins wired but no flow control setting stated
addressing:
  port: 7142  # TCP port for LAN command interface
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable     # inferred from power on/off commands (015, 016)
- queryable     # inferred from numerous request commands (037, 078-*, 097-*, 305-*)
- routable      # inferred from input switch change command (018)
- levelable     # inferred from volume adjust (030-2), picture adjust (030-1), lamp adjust (030-15)
- muteable      # inferred from picture/sound/onscreen mute commands (020-025)
- shutterable   # inferred from shutter open/close commands (051, 052)
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: 02h 00h 00h 00h 00h 02h
  description: "Turns on the projector power. No other commands accepted during power-on sequence."
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: 02h 01h 00h 00h 00h 03h
  description: "Turns off the projector power. No other commands accepted during cooldown."
  params: []

- id: input_switch
  label: Input Switch Change
  kind: action
  command: 02h 03h 00h 00h 02h 01h <DATA01> <CKS>
  description: "Switches the input terminal or entry list."
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal code (hex). Values vary by model - see supplementary table. e.g. 01h=COMPUTER, 06h=VIDEO, 1Ah=HDMI, A1h=HDMI, 20h=LAN"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: 02h 10h 00h 00h 00h 12h
  description: "Turns picture mute on. Automatically off on input or signal switch."
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: 02h 11h 00h 00h 00h 13h
  description: "Turns picture mute off."
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: 02h 12h 00h 00h 00h 14h
  description: "Turns sound mute on. Automatically off on input switch, signal switch, or volume adjust."
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: 02h 13h 00h 00h 00h 15h
  description: "Turns sound mute off."
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: 02h 14h 00h 00h 00h 16h
  description: "Turns onscreen mute on. Automatically off on input or signal switch."
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: 02h 15h 00h 00h 00h 17h
  description: "Turns onscreen mute off."
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: 03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>
  description: "Adjusts picture parameters (brightness, contrast, color, hue, sharpness)."
  params:
    - name: target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: "16-bit adjustment value (low byte, high byte)"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: 03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>
  description: "Adjusts sound volume."
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: "16-bit adjustment value (low byte, high byte)"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: 03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>
  description: "Sets the aspect ratio. Values vary by model."
  params:
    - name: aspect
      type: integer
      description: "Aspect value code - see supplementary table per model"

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  command: 03h 10h 00h 00h 05h 96h FFh <DATA01> <DATA02> <DATA03> <DATA04> <CKS>
  description: "Adjusts lamp/light output level."
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: "16-bit adjustment value (low byte, high byte)"

- id: shutter_close
  label: Shutter Close
  kind: action
  command: 02h 16h 00h 00h 00h 18h
  description: "Closes the lens shutter."
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: 02h 17h 00h 00h 00h 19h
  description: "Opens the lens shutter."
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: 02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>
  description: "Adjusts lens position (zoom, focus, shift). Timed drive modes available."
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, 06h=Periphery Focus"
    - name: content
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_2
  label: Lens Control 2 (Absolute/Relative)
  kind: action
  command: 02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>
  description: "Adjusts lens position with absolute or relative values."
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute value, 02h=Relative value"
    - name: value
      type: integer
      description: "16-bit adjustment value (low byte, high byte)"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: 02h 1Eh 00h 00h 01h <DATA01> <CKS>
  description: "Controls lens memory (move, store, reset)."
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: 02h 1Fh 00h 00h 01h <DATA01> <CKS>
  description: "Controls reference lens memory for the selected profile."
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: 02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>
  description: "Sets lens memory options."
  params:
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: 02h 27h 00h 00h 01h <DATA01> <CKS>
  description: "Selects the reference lens memory profile number."
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: freeze_control
  label: Freeze Control
  kind: action
  command: 01h 98h 00h 00h 01h <DATA01> <CKS>
  description: "Turns freeze function on or off."
  params:
    - name: operation
      type: integer
      description: "01h=Freeze On, 02h=Freeze Off"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: 02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>
  description: "Sends a remote control key code."
  params:
    - name: key_code
      type: integer
      description: "WORD key code. Examples: 02h00h=POWER ON, 03h00h=POWER OFF, 05h00h=AUTO, 06h00h=MENU, 0Bh00h=ENTER, 84h00h=VOLUME UP, 85h00h=VOLUME DOWN"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: 03h B1h 00h 00h 02h 07h <DATA01> <CKS>
  description: "Sets the eco mode. Values vary by model."
  params:
    - name: mode
      type: integer
      description: "Eco mode value - see supplementary table per model"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: 03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>
  description: "Sets the projector name (up to 16 bytes)."
  params:
    - name: name
      type: string
      description: "Projector name up to 16 bytes"

- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  command: 03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>
  description: "Sets PIP or Picture by Picture mode and options."
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "For MODE: 00h=PIP, 01h=PICTURE BY PICTURE. For POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT"

- id: edge_blending_set
  label: Edge Blending Mode Set
  kind: action
  command: 03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>
  description: "Sets edge blending on or off."
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: 03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>
  description: "Sets the audio input selection for a given terminal."
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal code - see supplementary table"
    - name: value
      type: integer
      description: "00h=Terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  query_command: 078-2 RUNNING STATUS REQUEST (command: 00h 85h 00h 00h 01h 01h 87h)
  description: "Returns power status from DATA03 of running status response."
  values: [standby, power_on, not_supported]
  response_map:
    00h: standby
    01h: power_on
    FFh: not_supported

- id: operation_status
  label: Operation Status
  type: enum
  query_command: 078-2 RUNNING STATUS REQUEST
  description: "Detailed operation status from DATA06."
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  response_map:
    00h: standby_sleep
    04h: power_on
    05h: cooling
    06h: standby_error
    0Fh: standby_power_saving
    10h: network_standby

- id: error_status
  label: Error Status
  type: bitmap
  query_command: 009 ERROR STATUS REQUEST (command: 00h 88h 00h 00h 00h 88h)
  description: "Returns 12 bytes of error bit flags. Bit=0 normal, Bit=1 error."
  fields:
    - bit: DATA01 Bit0
      label: Cover error
    - bit: DATA01 Bit1
      label: Temperature error (bi-metallic)
    - bit: DATA01 Bit3
      label: Fan error
    - bit: DATA01 Bit4
      label: Fan error
    - bit: DATA01 Bit5
      label: Power error
    - bit: DATA01 Bit6
      label: Lamp off or backlight off
    - bit: DATA01 Bit7
      label: Lamp replacement moratorium
    - bit: DATA02 Bit0
      label: Lamp usage time exceeded limit
    - bit: DATA03 Bit1
      label: FPGA error
    - bit: DATA03 Bit2
      label: Temperature error (sensor)
    - bit: DATA03 Bit5
      label: Mirror cover error
    - bit: DATA09 Bit1
      label: Interlock switch open

- id: input_status
  label: Input Status
  type: composite
  query_command: 078-3 INPUT STATUS REQUEST (command: 00h 85h 00h 00h 01h 02h 88h)
  description: "Returns current input signal status including signal type, content displayed, test pattern."

- id: mute_status
  label: Mute Status
  type: composite
  query_command: 078-4 MUTE STATUS REQUEST (command: 00h 85h 00h 00h 01h 03h 89h)
  description: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, and OSD status."
  fields:
    - name: picture_mute
      values: [off, on, not_supported]
    - name: sound_mute
      values: [off, on, not_supported]
    - name: onscreen_mute
      values: [off, on, not_supported]

- id: lamp_usage_time
  label: Lamp Usage Time
  type: integer
  unit: seconds
  query_command: 037 INFORMATION REQUEST (command: 03h 8Ah 00h 00h 00h 8Dh) - DATA83-86
  description: "Lamp usage time in seconds, updated at one-minute intervals."

- id: lamp_info
  label: Lamp Information
  type: composite
  query_command: 037-4 LAMP INFORMATION REQUEST 3 (command: 03h 96h 00h 00h 02h <target> <content> <CKS>)
  description: "Gets lamp usage time or remaining life for lamp 1 or lamp 2."
  params:
    - name: target
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: content
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

- id: filter_usage_time
  label: Filter Usage Time
  type: integer
  unit: seconds
  query_command: 037-3 FILTER USAGE INFORMATION REQUEST (command: 03h 95h 00h 00h 00h 98h) - DATA01-04
  description: "Filter usage time in seconds. Returns -1 if no time defined."

- id: model_name
  label: Model Name
  type: string
  query_command: 078-5 MODEL NAME REQUEST (command: 00h 85h 00h 00h 01h 04h 8Ah)
  description: "Returns model name as NUL-terminated string."

- id: serial_number
  label: Serial Number
  type: string
  query_command: 305-2 SERIAL NUMBER REQUEST (command: 00h BFh 00h 00h 02h 01h 06h C8h)
  description: "Returns serial number as NUL-terminated string."

- id: projector_name
  label: Projector Name
  type: string
  query_command: 097-45 LAN PROJECTOR NAME REQUEST (command: 03h B0h 00h 00h 01h 2Ch E0h)
  description: "Returns projector name (17 bytes, NUL-terminated)."

- id: mac_address
  label: MAC Address
  type: string
  query_command: 097-155 LAN MAC ADDRESS STATUS REQUEST2 (command: 03h B0h 00h 00h 02h 9Ah 00h 4Fh)
  description: "Returns 6-byte MAC address."

- id: gain_parameter
  label: Gain Parameter
  type: composite
  query_command: 060-1 GAIN PARAMETER REQUEST 3 (command: 03h 05h 00h 00h 03h <target> 00h 00h <CKS>)
  description: "Returns adjustment range, default, and current value for a gain parameter."
  params:
    - name: target
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"

- id: lens_position
  label: Lens Position
  type: composite
  query_command: 053-1 LENS CONTROL REQUEST (command: 02h 1Ch 00h 00h 02h <target> 00h <CKS>)
  description: "Returns upper/lower limits and current value for zoom, focus, or lens shift."
  params:
    - name: target
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V"

- id: lens_info
  label: Lens Operation Status
  type: bitmap
  query_command: 053-7 LENS INFORMATION REQUEST (command: 02h 22h 00h 00h 01h 00h 25h)
  description: "Returns bit flags indicating which lens functions are in motion."
  fields:
    - bit: "Bit0: Lens memory (0=Stop, 1=During operation)"
    - bit: "Bit1: Zoom"
    - bit: "Bit2: Focus"
    - bit: "Bit3: Lens Shift H"
    - bit: "Bit4: Lens Shift V"

- id: cover_status
  label: Cover Status
  type: enum
  query_command: 078-6 COVER STATUS REQUEST (command: 00h 85h 00h 00h 01h 05h 8Bh)
  description: "Mirror cover or lens cover status."
  values: [normal_cover_opened, cover_closed]

- id: eco_mode
  label: Eco Mode
  type: integer
  query_command: 097-8 ECO MODE REQUEST (command: 03h B0h 00h 00h 01h 07h BBh)
  description: "Returns current eco mode value. Values vary by model."

- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  query_command: 097-243-1 EDGE BLENDING MODE REQUEST (command: 03h B0h 00h 00h 02h DFh 00h 94h)
  values: [off, on]

- id: basic_information
  label: Basic Information
  type: composite
  query_command: 305-3 BASIC INFORMATION REQUEST (command: 00h BFh 00h 00h 01h 02h C2h)
  description: "Returns operation status, displayed content, signal type, video/sound/onscreen mute, and freeze status in a single response."

- id: sync_frequency
  label: Sync Frequency
  type: string
  query_command: 084 INFORMATION STRING REQUEST (command: 00h D0h 00h 00h 03h 00h <type> 01h <CKS>)
  description: "Returns horizontal or vertical sync frequency as a string."
  params:
    - name: type
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: lens_profile
  label: Lens Profile
  type: enum
  query_command: 053-11 LENS PROFILE REQUEST (command: 02h 28h 00h 00h 00h 2Ah)
  values: [profile_1, profile_2]
  response_map:
    00h: profile_1
    01h: profile_2

- id: carbon_savings
  label: Carbon Savings
  type: composite
  query_command: 037-6 CARBON SAVINGS INFORMATION REQUEST (command: 03h 9Ah 00h 00h 01h <target> <CKS>)
  description: "Returns carbon savings in kg and mg."
  params:
    - name: target
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
```

## Variables
```yaml
- id: brightness
  label: Brightness
  type: integer
  set_command: 030-1 PICTURE ADJUST (target=00h)
  description: "Picture brightness. Absolute or relative adjustment."

- id: contrast
  label: Contrast
  type: integer
  set_command: 030-1 PICTURE ADJUST (target=01h)
  description: "Picture contrast. Absolute or relative adjustment."

- id: color
  label: Color
  type: integer
  set_command: 030-1 PICTURE ADJUST (target=02h)
  description: "Color saturation. Absolute or relative adjustment."

- id: hue
  label: Hue
  type: integer
  set_command: 030-1 PICTURE ADJUST (target=03h)
  description: "Hue adjustment. Absolute or relative."

- id: sharpness
  label: Sharpness
  type: integer
  set_command: 030-1 PICTURE ADJUST (target=04h)
  description: "Picture sharpness. Absolute or relative adjustment."

- id: volume
  label: Volume
  type: integer
  set_command: 030-2 VOLUME ADJUST
  description: "Sound volume level. Absolute or relative adjustment."

- id: lamp_output
  label: Lamp/Light Output
  type: integer
  set_command: 030-15 OTHER ADJUST (target=96h FFh)
  description: "Lamp or light output level. Absolute or relative adjustment."

- id: eco_mode_var
  label: Eco Mode
  type: integer
  set_command: 098-8 ECO MODE SET
  description: "Eco mode setting. Values vary by model - see supplementary table."

- id: projector_name
  label: Projector Name
  type: string
  set_command: 098-45 LAN PROJECTOR NAME SET
  description: "Network projector name, up to 16 bytes."

- id: edge_blending
  label: Edge Blending
  type: enum
  set_command: 098-243-1 EDGE BLENDING MODE SET
  values: [off, on]
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification/event mechanism described in source.
# All responses are replies to explicitly sent commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes: power on/off commands lock out all other commands during execution
# (including cooling period for power off). Error status includes interlock switch
# open detection (DATA09 Bit1). No explicit safety confirmation or interlock
# command sequences documented.
# UNRESOLVED: power-on sequencing requirements not fully documented
# UNRESOLVED: interlock behavior details not fully documented
```

## Notes
- All commands and responses use **binary hexadecimal encoding** with a trailing checksum byte. The checksum is the low-order byte of the sum of all preceding bytes.
- Commands include a `control ID` (ID1) and `model code` (ID2) that vary per projector configuration.
- Error responses use `ERR1`/`ERR2` codes. Key errors include: `02h 0Dh` = "command cannot be accepted because power is off", `02h 0Eh` = "command execution failed", `02h 0Fh` = "no authority for operation".
- Input terminal codes are model-specific and documented in supplementary appendix tables. The NP-V3 Series is not explicitly listed in the provided appendix tables — input codes must be confirmed against the specific model's documentation.
- Picture mute, sound mute, and onscreen mute are automatically cancelled on input terminal switch or video signal switch. Sound mute is also cancelled on volume adjustment.
- While lens is being driven with continuous commands (7Fh/81h), subsequent same-type commands can be issued without an explicit stop.
- Standby mode availability for LAN command reception varies by model. Some models require specific standby mode settings (Normal, Network Standby, etc.) to accept POWER ON via LAN.

<!-- UNRESOLVED: NP-V3 Series not explicitly listed in the supplementary input terminal, aspect, or eco mode tables -->
<!-- UNRESOLVED: specific input terminal hex codes for NP-V3 models not confirmed -->
<!-- UNRESOLVED: specific eco mode values for NP-V3 models not confirmed -->
<!-- UNRESOLVED: specific aspect ratio values for NP-V3 models not confirmed -->
<!-- UNRESOLVED: standby mode requirements for NP-V3 to receive LAN commands not confirmed -->
<!-- UNRESOLVED: maximum concurrent connection count for TCP port 7142 not stated -->
<!-- UNRESOLVED: command response timeout not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:52:44.515Z
last_checked_at: 2026-06-02T22:11:17.978Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:11:17.978Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "All 50 spec actions traced to source (dip-safe re-verify). (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific NP-V3 input terminal codes not listed in the supplementary tables; the manual covers many NEC models but NP-V3 is not explicitly enumerated in the appendix tables"
- "no authentication or password procedure documented"
- "protocol version not stated"
- "RTS/CTS pins wired but no flow control setting stated"
- "no unsolicited notification/event mechanism described in source."
- "no multi-step macro sequences described in source"
- "power-on sequencing requirements not fully documented"
- "interlock behavior details not fully documented"
- "NP-V3 Series not explicitly listed in the supplementary input terminal, aspect, or eco mode tables"
- "specific input terminal hex codes for NP-V3 models not confirmed"
- "specific eco mode values for NP-V3 models not confirmed"
- "specific aspect ratio values for NP-V3 models not confirmed"
- "standby mode requirements for NP-V3 to receive LAN commands not confirmed"
- "maximum concurrent connection count for TCP port 7142 not stated"
- "command response timeout not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
