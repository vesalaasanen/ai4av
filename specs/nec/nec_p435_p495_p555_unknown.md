---
spec_id: admin/nec-p435-p495-p555
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC P435 P495 P555 Control Spec"
manufacturer: NEC
model_family: P435
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - P435
    - P495
    - P555
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-18T16:38:00.767Z
generated_at: 2026-05-18T16:38:00.767Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T16:38:00.767Z
  matched_actions: 28
  action_count: 28
  confidence: high
  summary: "All 28 action hex sequences verified against source; transport parameters and command shapes confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# NEC P435 P495 P555 Control Spec

## Summary

NEC P435/P495/P555 projectors with RS-232C serial and TCP/IP LAN control. Binary command protocol using hex-encoded frames with checksum. Covers power, input switching, mute, volume, picture adjust, lens control, shutter, eco mode, edge blending, PIP, freeze, and various status queries.

<!-- UNRESOLVED: specific input terminal values are in an Appendix not included in the refined source -->
<!-- UNRESOLVED: eco mode values are in an Appendix not included in the refined source -->
<!-- UNRESOLVED: aspect values are in an Appendix not included in the refined source -->
<!-- UNRESOLVED: sub input values for PIP/PbyP are in an Appendix not included in the refined source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: source lists 115200/38400/19200/9600/4800 as options but does not state a default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated (full duplex noted but hardware/software flow control unspecified)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred from power on/off commands
- routable     # inferred from input switch commands
- queryable    # inferred from multiple status/information request commands
- levelable    # inferred from volume, brightness, contrast, color, hue, sharpness adjust
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  hex: "02h 00h 00h 00h 00h 02h"
  response_success: "22h 00h <ID1> <ID2> 00h <CKS>"
  response_error: "A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: No other commands accepted during power-on sequence.

- id: power_off
  label: Power Off
  kind: action
  params: []
  hex: "02h 01h 00h 00h 00h 03h"
  response_success: "22h 01h <ID1> <ID2> 00h <CKS>"
  response_error: "A2h 01h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: No other commands accepted during power-off (including cooling time).

- id: input_switch
  label: Input Switch
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal byte value (see Appendix for model-specific values; e.g. 06h = video)
  hex: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  response_success: "22h 03h <ID1> <ID2> 01h <DATA01> <CKS>"
  response_error: "A2h 03h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  hex: "02h 10h 00h 00h 00h 12h"
  notes: Cancelled by input switch or video signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []
  hex: "02h 11h 00h 00h 00h 13h"

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  hex: "02h 12h 00h 00h 00h 14h"
  notes: Cancelled by input switch, video signal switch, or volume adjustment.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []
  hex: "02h 13h 00h 00h 00h 15h"

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  hex: "02h 14h 00h 00h 00h 16h"
  notes: Cancelled by input switch or video signal switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []
  hex: "02h 15h 00h 00h 00h 17h"

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
      description: 16-bit signed adjustment value (low byte, high byte)
  hex: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute, 01h=Relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value (low byte, high byte)
  hex: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_value
      type: integer
      description: Aspect byte value (see Appendix for model-specific values)
  hex: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute, 01h=Relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value (low byte, high byte)
  hex: "03h 10h 00h 00h 05h 96h FFh <DATA03> <DATA04> <DATA05> <CKS>"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "WORD key code (e.g. 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP, 08h 00h=DOWN)"
  hex: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  hex: "02h 16h 00h 00h 00h 18h"

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  hex: "02h 17h 00h 00h 00h 19h"

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: direction
      type: integer
      description: "06h=Periphery Focus; DATA02: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  hex: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: target
      type: integer
      description: "FFh=Stop, other values for lens axis"
    - name: mode
      type: integer
      description: "00h=Absolute, 02h=Relative"
    - name: value
      type: integer
      description: 16-bit adjustment value (low byte, high byte)
  hex: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: action
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  hex: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: action
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  hex: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"

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
  hex: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"
  hex: "02h 27h 00h 00h 01h <DATA01> <CKS>"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=On, 02h=Off"
  hex: "01h 98h 00h 00h 01h <DATA01> <CKS>"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: Eco mode value (see Appendix for model-specific values)
  hex: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes)
  hex: "03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>"

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: parameter
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "MODE: 00h=PIP, 01h=PbyP; POSITION: 00h=TL, 01h=TR, 02h=BL, 03h=BR; SUB INPUT: see Appendix"
  hex: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"
  hex: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (see Appendix)
    - name: setting
      type: integer
      description: "00h=Follow specified terminal, 01h=BNC, 02h=COMPUTER"
  hex: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: binary
  hex_request: "00h 88h 00h 00h 00h 88h"
  response: "20h 88h <ID1> <ID2> 0Ch <DATA01-12> <CKS>"
  description: 12 bytes of error bitfields (cover, fan, temp, lamp, formatter, FPGA, ballast, lens, interlock, etc.)

- id: power_status
  label: Power Status
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  description: Via 078-2 RUNNING STATUS REQUEST DATA03/DATA06.

- id: operation_status
  label: Operation Status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  hex_request: "00h 85h 00h 00h 01h 01h 87h"
  response: "20h 85h <ID1> <ID2> 10h <DATA01-16> <CKS>"
  notes: "DATA06: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

- id: cooling_status
  label: Cooling Process
  type: enum
  values: [not_executed, during_execution, not_supported]
  description: Via 078-2 DATA04.

- id: power_on_off_process
  label: Power On/Off Process
  type: enum
  values: [not_executed, during_execution, not_supported]
  description: Via 078-2 DATA05.

- id: input_status
  label: Input Status
  type: composite
  hex_request: "00h 85h 00h 00h 01h 02h 88h"
  response: "20h 85h <ID1> <ID2> 10h <DATA01-16> <CKS>"
  description: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern display, content displayed"

- id: mute_status
  label: Mute Status
  type: composite
  hex_request: "00h 85h 00h 00h 01h 03h 89h"
  response: "20h 85h <ID1> <ID2> 10h <DATA01-16> <CKS>"
  description: "DATA01=Picture mute, DATA02=Sound mute, DATA03=Onscreen mute, DATA04=Forced onscreen mute, DATA05=Onscreen display"

- id: model_name
  label: Model Name
  type: string
  hex_request: "00h 85h 00h 00h 01h 04h 8Ah"
  response: "20h 85h <ID1> <ID2> 20h <DATA01-32> <CKS>"
  description: NUL-terminated model name string.

- id: cover_status
  label: Cover Status
  type: enum
  values: [normal_cover_open, cover_closed]
  hex_request: "00h 85h 00h 00h 01h 05h 8Bh"
  response: "20h 85h <ID1> <ID2> 01h <DATA01> <CKS>"

- id: information_request
  label: Projector Information
  type: composite
  hex_request: "03h 8Ah 00h 00h 00h 8Dh"
  response: "23h 8Ah <ID1> <ID2> 62h <DATA01-98> <CKS>"
  description: "DATA01-49=Projector name, DATA83-86=Lamp usage time (seconds), DATA87-90=Filter usage time (seconds)"

- id: filter_usage_info
  label: Filter Usage Information
  type: composite
  hex_request: "03h 95h 00h 00h 00h 98h"
  response: "23h 95h <ID1> <ID2> 08h <DATA01-08> <CKS>"
  description: "DATA01-04=Filter usage time (seconds), DATA05-08=Filter alarm start time (seconds)"

- id: lamp_information
  label: Lamp Information
  type: composite
  hex_request: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: lamp
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: content
      description: "01h=Usage time (seconds), 04h=Remaining life (%)"
  description: "Returns lamp usage time or remaining life percentage"

- id: carbon_savings_info
  label: Carbon Savings Information
  type: composite
  hex_request: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: type
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  description: "DATA02-05=Kilograms (max 99999), DATA06-09=Milligrams (max 999999)"

- id: lens_control_request
  label: Lens Control Position
  type: composite
  hex_request: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  description: "Returns upper limit, lower limit, current value (each 16-bit)"

- id: lens_memory_option
  label: Lens Memory Option
  type: composite
  hex_request: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: option
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  description: "Returns setting value: 00h=OFF, 01h=ON"

- id: lens_information
  label: Lens Information
  type: binary
  hex_request: "02h 22h 00h 00h 01h 00h 25h"
  description: "Bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V (0=Stop, 1=During operation)"

- id: lens_profile
  label: Lens Profile
  type: enum
  values: [profile_1, profile_2]
  hex_request: "02h 28h 00h 00h 00h 2Ah"

- id: gain_parameter
  label: Gain Parameter
  type: composite
  hex_request: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: target
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"
  description: "Returns status, upper/lower limits, default value, current value, wide/narrow adjustment width"

- id: setting_request
  label: Setting Information
  type: composite
  hex_request: "00h 85h 00h 00h 01h 00h 86h"
  description: "DATA01-03=Base model type, DATA04=Sound function (00h=Not available, 01h=Available), DATA05=Profile number"

- id: information_string
  label: Information String
  type: string
  hex_request: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: type
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode
  label: Eco Mode
  type: integer
  hex_request: "03h B0h 00h 00h 01h 07h BBh"
  description: Value depends on model (see Appendix).

- id: lan_projector_name
  label: LAN Projector Name
  type: string
  hex_request: "03h B0h 00h 00h 01h 2Ch E0h"

- id: lan_mac_address
  label: MAC Address
  type: string
  hex_request: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  description: Returns 6-byte MAC address.

- id: pip_pbp_status
  label: PIP/Picture by Picture Status
  type: composite
  hex_request: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: parameter
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_status
  label: Edge Blending Mode
  type: enum
  values: [off, on]
  hex_request: "03h B0h 00h 00h 02h DFh 00h 94h"

- id: base_model_type
  label: Base Model Type
  type: composite
  hex_request: "00h BFh 00h 00h 01h 00h C0h"
  description: "Returns base model type and model name string"

- id: serial_number
  label: Serial Number
  type: string
  hex_request: "00h BFh 00h 00h 02h 01h 06h C8h"

- id: basic_information
  label: Basic Information
  type: composite
  hex_request: "00h BFh 00h 00h 01h 02h C2h"
  description: "Operation status, content displayed, signal type, video/sound/onscreen mute, freeze status"
```

## Variables
```yaml
# UNRESOLVED: variables with continuous ranges (brightness, contrast, volume, etc.) have adjustment commands
# documented in Actions. Min/max/default ranges are queryable per-gain via 060-1 GAIN PARAMETER REQUEST 3
# but the numeric ranges are not stated in this source document.
```

## Events
```yaml
# No unsolicited notifications documented. All responses are command-reply.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes: power on/off commands lock out all other commands during execution.
# Error status bitfield includes interlock switch open (DATA09 Bit1).
# No explicit safety interlock procedures documented.
```

## Notes

- Binary protocol. All commands and responses are hex byte sequences with a checksum (low byte of sum of all preceding bytes).
- Commands include control ID (`ID1`) and model code (`ID2`) parameters.
- Error responses use `A0h`/`A1h`/`A2h`/`A3h` prefix (matching command class) with `ERR1`/`ERR2` error codes.
- Multiple baud rates supported (115200/38400/19200/9600/4800) but no default stated.
- TCP port 7142 for LAN control.
- Wireless LAN also supported but details deferred to wireless LAN unit manual.
- Many command values (input terminals, eco modes, aspect ratios, sub inputs) reference an Appendix not included in this refined source.

<!-- UNRESOLVED: baud rate default not stated (multiple options listed) -->
<!-- UNRESOLVED: flow control setting not stated -->
<!-- UNRESOLVED: input terminal byte values (Appendix not in refined source) -->
<!-- UNRESOLVED: eco mode byte values (Appendix not in refined source) -->
<!-- UNRESOLVED: aspect ratio byte values (Appendix not in refined source) -->
<!-- UNRESOLVED: sub input byte values for PIP/PbyP (Appendix not in refined source) -->
<!-- UNRESOLVED: gain adjustment numeric ranges (queryable but not stated) -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-18T16:38:00.767Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:38:00.767Z
matched_actions: 28
action_count: 28
confidence: high
summary: "All 28 action hex sequences verified against source; transport parameters and command shapes confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
