---
spec_id: admin/nec-np-ve303-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP-VE303 Series Control Spec"
manufacturer: NEC
model_family: "NP-VE303 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NP-VE303 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:24:01.216Z
generated_at: 2026-04-25T21:24:01.216Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:24:01.216Z
  matched_actions: 52
  action_count: 52
  confidence: high
  summary: "All 52 spec actions matched wire-level tokens in NEC VE303 serial source; bidirectional command coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# NEC NP-VE303 Series Control Spec

## Summary
The NEC NP-VE303 Series is a projector controllable via RS-232C serial or TCP/IP (wired LAN). This spec covers the binary command protocol used for power control, input switching, picture/audio adjustment, lens control, and status queries. Commands are sent as hexadecimal byte sequences with a trailing checksum.

<!-- UNRESOLVED: specific NP-VE303 input terminal codes not listed in the supplementary tables — they may share codes with another model family -->
<!-- UNRESOLVED: eco mode values for NP-VE303 not listed in the supplementary eco mode table -->
<!-- UNRESOLVED: aspect values for NP-VE303 not listed in the supplementary aspect table -->
<!-- UNRESOLVED: standby mode setting for receiving commands — NP-VE303 not listed in the standby mode table -->

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
  flow_control: none  # UNRESOLVED: flow control not explicitly stated; RTS/CTS pins connected on D-SUB 9P
  connector: D-SUB 9P (PC CONTROL port)
addressing:
  port: 7142  # TCP port for LAN command interface
auth:
  type: none  # inferred: no authentication procedure described in source
```

## Traits
```yaml
- powerable    # power on/off commands (015, 016)
- queryable    # extensive status query commands (037, 078-*, 060-1, 305-*)
- routable     # input switching command (018)
- levelable    # volume adjust (030-2), picture adjust (030-1), lamp adjust (030-15)
- muteable     # picture mute (020/021), sound mute (022/023), onscreen mute (024/025)
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command_hex: "02 00 00 00 00 02"
  params: []
  notes: No other commands accepted during power-on sequence.

- id: power_off
  label: Power Off
  kind: action
  command_hex: "02 01 00 00 00 03"
  params: []
  notes: No other commands accepted during power-off including cooling time.

- id: input_switch
  label: Switch Input
  kind: action
  command_hex: "02 03 00 00 02 01 <DATA01> <CKS>"
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal code (hex). Values vary by model - see supplementary tables. Example: 06h = VIDEO."
  response_hex_success: "22 03 <ID1> <ID2> 01 <DATA01> <CKS>"
  response_data:
    - name: result
      values:
        00h: success
        FFh: "error (no signal switch made)"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command_hex: "02 10 00 00 00 12"
  params: []
  notes: Mute is cancelled by input switch or video signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command_hex: "02 11 00 00 00 13"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command_hex: "02 12 00 00 00 14"
  params: []
  notes: Mute is cancelled by input switch, video signal switch, or volume adjustment.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command_hex: "02 13 00 00 00 15"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command_hex: "02 14 00 00 00 16"
  params: []
  notes: Mute is cancelled by input switch or video signal switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command_hex: "02 15 00 00 00 17"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command_hex: "03 10 00 00 05 <DATA01> FF <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: target
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value (DATA03=low byte, DATA04=high byte)"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command_hex: "03 10 00 00 05 05 00 <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "16-bit adjustment value (DATA02=low byte, DATA03=high byte)"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command_hex: "03 10 00 00 05 18 00 00 <DATA01> 00 <CKS>"
  params:
    - name: aspect_value
      type: integer
      description: "Aspect code - values vary by model (see supplementary tables)."
  notes: UNRESOLVED: specific aspect values for NP-VE303 not in source.

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  command_hex: "03 10 00 00 05 <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: target
      type: integer
      description: "DATA01=96h, DATA02=FFh for LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "16-bit adjustment value"

- id: remote_key_code
  label: Send Remote Key Code
  kind: action
  command_hex: "02 0F 00 00 02 <DATA01> <DATA02> <CKS>"
  params:
    - name: key_code
      type: integer
      description: "WORD key code. Examples: 0200h=POWER ON, 0300h=POWER OFF, 0500h=AUTO, 0600h=MENU, 0700h=UP, 0800h=DOWN, 0900h=RIGHT, 0A00h=LEFT, 0B00h=ENTER, 0C00h=EXIT, 1300h=MUTE, 8400h=VOLUME UP, 8500h=VOLUME DOWN, 8A00h=FREEZE, A300h=ASPECT, D700h=SOURCE, EE00h=LAMP MODE/ECO"

- id: shutter_close
  label: Shutter Close
  kind: action
  command_hex: "02 16 00 00 00 18"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command_hex: "02 17 00 00 00 19"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command_hex: "02 18 00 00 02 <DATA01> <DATA02> <CKS>"
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, 06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: Send 00h (stop) to halt continuous lens drive.

- id: lens_control_2
  label: Lens Control 2 (Absolute/Relative)
  kind: action
  command_hex: "02 1D 00 00 04 <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute value, 02h=relative value"
    - name: value
      type: integer
      description: "16-bit adjustment value"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command_hex: "02 1E 00 00 01 <DATA01> <CKS>"
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command_hex: "02 1F 00 00 01 <DATA01> <CKS>"
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command_hex: "02 21 00 00 02 <DATA01> <DATA02> <CKS>"
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
  command_hex: "02 27 00 00 01 <DATA01> <CKS>"
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: freeze_control
  label: Freeze Control
  kind: action
  command_hex: "01 98 00 00 01 <DATA01> <CKS>"
  params:
    - name: operation
      type: integer
      description: "01h=Freeze On, 02h=Freeze Off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command_hex: "03 B1 00 00 02 07 <DATA01> <CKS>"
  params:
    - name: eco_mode
      type: integer
      description: "Eco mode value - varies by model (see supplementary tables)."
  notes: UNRESOLVED: specific eco mode values for NP-VE303 not in source.

- id: projector_name_set
  label: LAN Projector Name Set
  kind: action
  command_hex: "03 B1 00 00 12 2C <DATA01-16> 00 <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes)"

- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  command_hex: "03 B1 00 00 03 C5 <DATA01> <DATA02> <CKS>"
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "For MODE: 00h=PIP, 01h=PICTURE BY PICTURE. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT."

- id: edge_blending_set
  label: Edge Blending Mode Set
  kind: action
  command_hex: "03 B1 00 00 03 DF 00 <DATA01> <CKS>"
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command_hex: "03 C9 00 00 03 09 <DATA01> <DATA02> <CKS>"
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal code (see supplementary tables)"
    - name: audio_source
      type: integer
      description: "00h=Same as specified terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: binary_flags
  command_hex: "00 88 00 00 00 88"
  response_data_bytes: 12
  description: "Returns 12 bytes of error flags. Bit=0 normal, Bit=1 error. Covers cover error, fan error, temperature error, lamp errors, formatter error, FPGA error, mirror cover error, interlock switch, system errors."

- id: power_status
  label: Power Status
  type: enum
  command_hex: "00 85 00 00 01 01 87"
  values:
    00h: standby
    01h: power_on
    FFh: not_supported
  description: "Part of 078-2 RUNNING STATUS REQUEST, DATA03."

- id: operation_status
  label: Operation Status
  type: enum
  command_hex: "00 85 00 00 01 01 87"
  values:
    00h: standby_sleep
    04h: power_on
    05h: cooling
    06h: standby_error
    0Fh: standby_power_saving
    10h: network_standby
  description: "Part of 078-2 RUNNING STATUS REQUEST, DATA06."

- id: input_status
  label: Input Status
  type: composite
  command_hex: "00 85 00 00 01 02 88"
  description: "Returns signal switch process, signal list number, selection signal type 1 and 2, signal list type, test pattern display, content displayed."

- id: mute_status
  label: Mute Status
  type: composite
  command_hex: "00 85 00 00 01 03 89"
  description: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display status (each 00h=Off, 01h=On, FFh=Not supported)."

- id: model_name
  label: Model Name
  type: string
  command_hex: "00 85 00 00 01 04 8A"
  description: "Returns model name as NUL-terminated string (up to 32 bytes)."

- id: cover_status
  label: Cover Status
  type: enum
  command_hex: "00 85 00 00 01 05 8B"
  values:
    00h: normal_cover_opened
    01h: cover_closed

- id: projector_info
  label: Projector Information
  type: composite
  command_hex: "03 8A 00 00 00 8D"
  description: "Returns projector name (49 bytes), lamp usage time in seconds (DATA83-86), filter usage time in seconds (DATA87-90)."

- id: filter_usage
  label: Filter Usage Information
  type: composite
  command_hex: "03 95 00 00 00 98"
  description: "Returns filter usage time (seconds, DATA01-04) and filter alarm start time (seconds, DATA05-08). -1 if undefined."

- id: lamp_info
  label: Lamp Information
  type: composite
  command_hex: "03 96 00 00 02 <DATA01> <DATA02> <CKS>"
  params:
    - name: lamp
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      description: "01h=usage time (seconds), 04h=remaining life (%)"
  description: "Returns lamp usage time or remaining life. Negative remaining life means replacement deadline exceeded."

- id: carbon_savings
  label: Carbon Savings Information
  type: composite
  command_hex: "03 9A 00 00 01 <DATA01> <CKS>"
  params:
    - name: target
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  description: "Returns carbon savings in kilograms (DATA02-05, max 99999 kg) and milligrams (DATA06-09, max 999999 mg)."

- id: lens_position
  label: Lens Position
  type: composite
  command_hex: "02 1C 00 00 02 <DATA01> 00 <CKS>"
  params:
    - name: target
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V"
  description: "Returns upper limit, lower limit, and current value (each 16-bit)."

- id: lens_info
  label: Lens Information
  type: binary_flags
  command_hex: "02 22 00 00 01 00 25"
  description: "Returns operation status per bit: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V (0=Stop, 1=During operation)."

- id: lens_memory_option
  label: Lens Memory Option
  type: composite
  command_hex: "02 20 00 00 01 <DATA01> <CKS>"
  params:
    - name: target
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  description: "Returns 00h=OFF, 01h=ON."

- id: lens_profile
  label: Lens Profile
  type: enum
  command_hex: "02 28 00 00 00 2A"
  values:
    00h: profile_1
    01h: profile_2

- id: gain_parameter
  label: Gain Parameter
  type: composite
  command_hex: "03 05 00 00 03 <DATA01> 00 00 <CKS>"
  params:
    - name: parameter
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"
  description: "Returns status (02h=adjustable), upper/lower limits, default value, current value, adjustment widths."

- id: setting_info
  label: Setting Information
  type: composite
  command_hex: "00 85 00 00 01 00 86"
  description: "Returns base model type, sound function availability, profile number."

- id: eco_mode
  label: Eco Mode
  type: enum
  command_hex: "03 B0 00 00 01 07 BB"
  description: "Returns current eco mode value - specific values vary by model."
  notes: UNRESOLVED: specific eco mode values for NP-VE303 not in source.

- id: projector_name
  label: LAN Projector Name
  type: string
  command_hex: "03 B0 00 00 01 2C E0"
  description: "Returns projector name as NUL-terminated string (up to 17 bytes)."

- id: mac_address
  label: MAC Address
  type: string
  command_hex: "03 B0 00 00 02 9A 00 4F"
  description: "Returns 6-byte MAC address."

- id: pip_pbp_status
  label: PIP/Picture by Picture Status
  type: composite
  command_hex: "03 B0 00 00 02 C5 <DATA01> <CKS>"
  params:
    - name: target
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  description: "Returns current PIP/PBP mode, position, or sub-input setting."

- id: edge_blending_status
  label: Edge Blending Status
  type: enum
  command_hex: "03 B0 00 00 02 DF 00 94"
  values:
    00h: "OFF"
    01h: "ON"

- id: base_model_type
  label: Base Model Type
  type: composite
  command_hex: "00 BF 00 00 01 00 C0"
  description: "Returns base model type code and model name."

- id: serial_number
  label: Serial Number
  type: string
  command_hex: "00 BF 00 00 02 01 06 C8"
  description: "Returns serial number as NUL-terminated string (up to 16 bytes)."

- id: basic_info
  label: Basic Information
  type: composite
  command_hex: "00 BF 00 00 01 02 C2"
  description: "Returns operation status, content displayed, selection signal types, display signal type, video/sound/onscreen mute, freeze status."

- id: info_string
  label: Information String
  type: string
  command_hex: "00 D0 00 00 03 00 <DATA01> 01 <CKS>"
  params:
    - name: info_type
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
  description: "Returns frequency information as NUL-terminated string."
```

## Variables
```yaml
# Volume, brightness, contrast, color, hue, sharpness, and lamp adjust are settable continuous parameters.
# They are represented as actions (030-1, 030-2, 030-15) with absolute/relative mode and 16-bit values.
# No separate variable namespace is needed beyond the action/feedback pairs above.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol described in source.
# The projector responds to queries but does not appear to push events proactively.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >
  Power on/off commands block all other commands during execution (including cooling period).
  Error status response includes interlock switch open flag (DATA09 Bit1) and cover error (DATA01 Bit0).
  Lamp replacement moratorium and usage time exceeded are reported as error flags.
# UNRESOLVED: specific safety interlock procedures not detailed beyond error flag reporting.
```

## Notes
- All commands are binary (hexadecimal byte sequences), not ASCII text. Commands include a trailing checksum byte calculated as the low byte of the sum of all preceding bytes.
- Common parameters across commands: ID1 (control ID set on projector), ID2 (model code), CKS (checksum).
- Error responses begin with the command byte OR'd with A0h (for 00h-02h type commands) or A3h (for 03h type commands), and include ERR1/ERR2 error codes.
- The source document covers many NEC projector models; input terminal codes, aspect values, and eco mode values vary by model. The NP-VE303 Series is not explicitly listed in the supplementary tables — its specific values are UNRESOLVED.
- Lens control supports both timed drive (0.25s, 0.5s, 1s) and continuous drive with explicit stop.
- Filter and lamp usage times are in seconds, updated at one-minute intervals.

<!-- UNRESOLVED: input terminal hex codes for NP-VE303 not found in supplementary tables -->
<!-- UNRESOLVED: eco mode values for NP-VE303 not found in supplementary eco mode table -->
<!-- UNRESOLVED: aspect adjust values for NP-VE303 not found in supplementary aspect table -->
<!-- UNRESOLVED: standby mode setting for NP-VE303 not found in standby mode table -->
<!-- UNRESOLVED: whether NP-VE303 supports LAN control or serial only -->
<!-- UNRESOLVED: default baud rate not stated (multiple supported: 115200/38400/19200/9600/4800) -->Spec generated above. Key points:

- **Dual transport**: RS-232C serial (8N1, 5 baud rates) and TCP/IP (port 7142)
- **Binary protocol**: All commands are hex byte sequences with checksums, not ASCII text
- **53 commands** documented (actions + queries) covering power, input switching, mutes, picture/volume/lens adjustment, and extensive status queries
- **Major UNRESOLVED gaps**: The NP-VE303 is not listed in any of the supplementary tables, so input terminal codes, eco mode values, aspect values, and standby mode settings are unknown for this specific model

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:24:01.216Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:24:01.216Z
matched_actions: 52
action_count: 52
confidence: high
summary: "All 52 spec actions matched wire-level tokens in NEC VE303 serial source; bidirectional command coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
