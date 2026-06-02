---
spec_id: admin/nec-c751q-avt2-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC C751Q-AVT2 Series Control Spec"
manufacturer: NEC
model_family: "C751Q-AVT2 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "C751Q-AVT2 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:36.196Z
last_checked_at: 2026-06-02T19:39:08.476Z
generated_at: 2026-06-02T19:39:08.476Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal code values vary across NEC model families; appendix provides common values but some entries show alternative codes (e.g., HDMI: A1h or 1Ah)"
  - "selectable 115200/38400/19200/9600/4800 bps - no single default stated"
  - "RTS/CTS hardware handshaking noted in pinout but flow_control setting not documented"
  - "no discrete settable parameter commands separate from Actions above."
  - "no unsolicited event notifications documented. All communication"
  - "no multi-step macro sequences documented in source."
  - "no explicit safety warnings for voltage, current, or physical hazards stated in source."
  - "aspect mode values vary by model (appendix shows multiple codes for same modes, e.g., ZOOM=07h or 08h, FULL=09h or 10h)"
  - "input terminal hex codes vary significantly across NEC model families; appendix lists common values but some entries show alternatives"
  - "eco mode hex codes vary across models (e.g., NORMAL=00h or 01h, ECO=02h or 03h)"
  - "flow_control setting not documented despite RTS/CTS pinout being specified"
  - "CONTROL ID (ID1) and MODEL CODE (ID2) values are model-specific and not stated in this document"
  - "default serial baud rate not stated — must be configured from the documented options (115200/38400/19200/9600/4800)"
verification:
  verdict: verified
  checked_at: 2026-06-02T19:39:08.476Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched their source hex sequences verbatim including the corrected picture_adjust FFh byte; transport values verified; source and spec share an identical 53-command catalogue. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC C751Q-AVT2 Series Control Spec

## Summary
NEC professional projector supporting both RS-232C serial and wired TCP/IP control. The document (BDT140013 Rev 7.1) defines a binary command protocol with checksum verification, supporting power control, input routing, picture/sound adjustment, lens control, mute, freeze, ECO mode, PIP/PbP, and extensive status querying. Both control interfaces share the same command set.

<!-- UNRESOLVED: input terminal code values vary across NEC model families; appendix provides common values but some entries show alternative codes (e.g., HDMI: A1h or 1Ah) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port for LAN control
serial:
  baud_rate: null  # UNRESOLVED: selectable 115200/38400/19200/9600/4800 bps - no single default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS hardware handshaking noted in pinout but flow_control setting not documented
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
- powerable      # POWER ON / POWER OFF commands present
- routable       # INPUT SW CHANGE command present
- queryable      # multiple information request commands returning state
- levelable      # PICTURE ADJUST, VOLUME ADJUST, GAIN PARAMETER REQUEST present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on projector power. No other command accepted during power-on sequence.
  command: "02h 00h 00h 00h 00h 02h"
  response: "A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off projector power. No other command accepted during power-off/cooling sequence.
  command: "02h 01h 00h 00h 00h 03h"
  response: "A2h 01h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Hex code for input terminal (see appendix for values: COMPUTER=01h, HDMI=A1h/1Ah, DVI-D=9Ch, etc.)
  command_format: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  response: "22h 03h <ID1> <ID2> 01h <DATA01> <CKS>"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  command: "02h 10h 00h 00h 00h 12h"

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
      description: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness
    - name: mode
      type: integer
      description: 00h=absolute value, 01h=relative value
    - name: value
      type: integer
      description: 16-bit signed adjustment value (low-order byte first)
  command_format: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  example: "03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: 00h=absolute value, 01h=relative value
    - name: value
      type: integer
      description: 16-bit signed volume value (low-order byte first)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_mode
      type: integer
      description: Hex code for aspect mode (see appendix: AUTO=00h, WIDE ZOOM=01h, 16:9=02h, etc.)
  command_format: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: mode
      type: integer
      description: 00h=absolute value, 01h=relative value
    - name: value
      type: integer
      description: 16-bit signed value (low-order byte first)
  command_format: "03h 10h 00h 00h 05h 96h FFh <DATA03> <DATA04> <DATA05> <CKS>"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: KEY CODE value from key code table (e.g., POWER ON=02h, MENU=06h, UP=07h, etc.)
  command_format: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"

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
      description: 06h=Periphery Focus
    - name: direction
      type: integer
      description: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous+, 81h=continuous-, FDh=-0.25s, FEh=-0.5s, FFh=-1s

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: action
      type: integer
      description: FFh=Stop
    - name: mode
      type: integer
      description: 00h=absolute value, 02h=relative value
    - name: value
      type: integer
      description: 16-bit position value (low-order byte first)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: 00h=MOVE, 01h=STORE, 02h=RESET

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: 00h=MOVE, 01h=STORE, 02h=RESET

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

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: 00h=Profile 1, 01h=Profile 2

- id: eco_mode_set
  label: ECO Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode hex code (see appendix: OFF=00h, NORMAL=00h/01h, ECO=02h/03h, LONG LIFE=04h, etc.)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name string (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: item
      type: integer
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3
    - name: value
      type: integer
      description: Setting value (MODE: 00h=PIP, 01h=PbP; POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: 00h=OFF, 01h=ON

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal hex code
    - name: audio_source
      type: integer
      description: 00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: 01h=freeze on, 02h=freeze off
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  type: object
  query_command: "00h 88h 00h 00h 00h 88h"
  response_format: "A0h 88h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  fields:
    - name: data01
      description: Error status 1 - Bit0=Cover, Bit1=Temperature(bi-metallic), Bit3=Fan, Bit4=Fan, Bit5=Power, Bit6=Lamp off, Bit7=Lamp moratorium
    - name: data02
      description: Error status 2 - Bit0=Lamp1 time exceeded, Bit1=Formatter, Bit2=Lamp2 off, Bit7=Extended status
    - name: data03
      description: Error status 3 - Bit1=FPGA, Bit2=Temperature(sensor), Bit3=Lamp1 not present, Bit4=Lamp1 data, Bit5=Mirror cover, Bit6=Lamp2 moratorium, Bit7=Lamp2 time exceeded
    - name: data04
      description: Error status 4 - Bit0=Lamp2 not present, Bit1=Lamp2 data, Bit2=Dust temp, Bit3=Foreign matter, Bit5=Ballast comm, Bit6=Iris calib, Bit7=Lens not installed
    - name: data09
      description: Extended status - Bit0=Portrait cover up, Bit1=Interlock switch open, Bit2=System error (Slave CPU), Bit3=System error (Formatter)

- id: information_request
  label: Information Request
  type: object
  query_command: "03h 8Ah 00h 00h 00h 8Dh"
  response_fields:
    - data01_49: Projector name (NUL-terminated string)
    - data83_86: Lamp usage time in seconds
    - data87_90: Filter usage time in seconds

- id: filter_usage_information_request
  label: Filter Usage Information Request
  type: object
  query_command: "03h 95h 00h 00h 00h 98h"
  response_fields:
    - data01_04: Filter usage time in seconds
    - data05_08: Filter alarm start time in seconds (-1 if undefined)

- id: lamp_information_request_3
  label: Lamp Information Request 3
  type: object
  params:
    - name: lamp
      type: integer
      description: 00h=Lamp 1, 01h=Lamp 2
    - name: content
      type: integer
      description: 01h=Lamp usage time, 04h=Lamp remaining life (%)
  query_command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  response_fields:
    - data01: Lamp number
    - data02: Content type
    - data03_06: Obtained information value

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  type: object
  params:
    - name: type
      type: integer
      description: 00h=Total Carbon Savings, 01h=Carbon Savings during operation
  query_command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  response_fields:
    - data02_05: Carbon Savings in kg (max 99999)
    - data06_09: Carbon Savings in mg (max 999999)

- id: lens_control_request
  label: Lens Control Request
  type: object
  params:
    - name: target
      type: integer
      description: Target item code
  query_command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  response_fields:
    - data02_03: Upper limit of adjustment range (16-bit)
    - data04_05: Lower limit of adjustment range (16-bit)
    - data06_07: Current value (16-bit)

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: object
  params:
    - name: option
      type: integer
      description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE
  query_command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  response_fields:
    - data01: Option type
    - data02: Setting value (00h=OFF, 01h=ON)

- id: lens_information_request
  label: Lens Information Request
  type: object
  query_command: "02h 22h 00h 00h 01h 00h 25h"
  response_fields:
    - data01: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V)

- id: lens_profile_request
  label: Lens Profile Request
  type: object
  query_command: "02h 28h 00h 00h 00h 2Ah"
  response_fields:
    - data01: Profile number (00h=Profile 1, 01h=Profile 2)

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  type: object
  params:
    - name: parameter
      type: integer
      description: 00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT
  query_command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  response_fields:
    - data01: Adjustment status (00h=not possible, 01h=not possible, 02h=possible, FFh=does not exist)
    - data02_03: Upper limit (16-bit)
    - data04_05: Lower limit (16-bit)
    - data06_07: Default value (16-bit)
    - data08_09: Current value (16-bit)

- id: setting_request
  label: Setting Request
  type: object
  query_command: "00h 85h 00h 00h 01h 00h 86h"
  response_fields:
    - data01_03: Base model type
    - data04: Sound function (00h=not available, 01h=available)
    - data05: Clock/sleep timer function

- id: running_status_request
  label: Running Status Request
  type: object
  query_command: "00h 85h 00h 00h 01h 01h 87h"
  response_fields:
    - data03: Power status (00h=Standby, 01h=Power on)
    - data04: Cooling process (00h=not executed, 01h=during execution)
    - data05: Power On/Off process (00h=not executed, 01h=during execution)
    - data06: Operation status (00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(power saving), 10h=Network standby)

- id: input_status_request
  label: Input Status Request
  type: object
  query_command: "00h 85h 00h 00h 01h 02h 88h"
  response_fields:
    - data01: Signal switch process
    - data02: Signal list number (+1 for actual value)
    - data03: Selection signal type 1
    - data04: Selection signal type 2
    - data09: Content displayed (00h=Video, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN)

- id: mute_status_request
  label: Mute Status Request
  type: object
  query_command: "00h 85h 00h 00h 01h 03h 89h"
  response_fields:
    - data01: Picture mute (00h=Off, 01h=On)
    - data02: Sound mute (00h=Off, 01h=On)
    - data03: Onscreen mute (00h=Off, 01h=On)
    - data04: Forced onscreen mute (00h=Off, 01h=On)
    - data05: Onscreen display (00h=not displayed, 01h=displayed)

- id: model_name_request
  label: Model Name Request
  type: object
  query_command: "00h 85h 00h 00h 01h 04h 8Ah"
  response_fields:
    - data01_32: Model name (NUL-terminated string)

- id: cover_status_request
  label: Cover Status Request
  type: object
  query_command: "00h 85h 00h 00h 01h 05h 8Bh"
  response_fields:
    - data01: Status (00h=Normal/cover opened, 01h=Cover closed)

- id: information_string_request
  label: Information String Request
  type: object
  params:
    - name: type
      type: integer
      description: 03h=Horizontal sync frequency, 04h=Vertical sync frequency
  query_command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  response_fields:
    - data01: Information type
    - data02: String length
    - data03_??: Information string (NUL-terminated)

- id: eco_mode_request
  label: ECO Mode Request
  type: object
  query_command: "03h B0h 00h 00h 01h 07h BBh"
  response_fields:
    - data01: ECO mode value

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: object
  query_command: "03h B0h 00h 00h 01h 2Ch E0h"
  response_fields:
    - data01_17: Projector name (NUL-terminated)

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  type: object
  query_command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  response_fields:
    - data01_06: MAC address (6 bytes)

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  type: object
  params:
    - name: item
      type: integer
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3
  query_command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  response_fields:
    - data01: Item type
    - data02: Setting value

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: object
  query_command: "03h B0h 00h 00h 02h DFh 00h 94h"
  response_fields:
    - data01: Setting value (00h=OFF, 01h=ON)

- id: base_model_type_request
  label: Base Model Type Request
  type: object
  query_command: "00h BFh 00h 00h 01h 00h C0h"
  response_fields:
    - data01_02: Base model type
    - data03_11: Model name (NUL-terminated)

- id: serial_number_request
  label: Serial Number Request
  type: object
  query_command: "00h BFh 00h 00h 02h 01h 06h C8h"
  response_fields:
    - data01_16: Serial number (NUL-terminated string)

- id: basic_information_request
  label: Basic Information Request
  type: object
  query_command: "00h BFh 00h 00h 01h 02h C2h"
  response_fields:
    - data01: Operation status
    - data02: Content displayed
    - data03: Selection signal type 1
    - data04: Selection signal type 2
    - data05: Display signal type
    - data06: Video mute
    - data07: Sound mute
    - data08: Onscreen mute
    - data09: Freeze status
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameter commands separate from Actions above.
# All settable parameters are represented as Actions in this spec.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented. All communication
# is command/response; the device does not initiate messages.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Power-on commands (015. POWER ON): while power is turning on, no other command can be accepted
  - description: Power-off commands (016. POWER OFF): while power is turning off (including cooling time), no other command can be accepted
  - description: Standby mode requirements: some models require specific standby modes (Normal, Active, Eco, Network Standby, Sleep, etc.) to receive commands via serial or LAN. Supported standby modes vary by model.
# UNRESOLVED: no explicit safety warnings for voltage, current, or physical hazards stated in source.
```

## Notes
Command protocol: binary hexadecimal format with checksum. All commands begin with a source address byte, followed by model code, control ID, data length, optional parameters, and a low-order byte checksum of all preceding bytes.

Standby mode dependency: the document explicitly notes that some models require specific standby modes to receive serial or LAN commands, and the supported modes differ between serial and LAN control. This is a critical configuration step for reliable operation.

Lens control note: sending continuous drive commands (7Fh or 81h) requires a subsequent stop command (00h) to halt lens movement.

Lamp/filter usage times are updated at one-minute intervals even though they can be queried in one-second resolution.

Carbon savings values returned in kilogram (max 99999kg) and milligram (max 999999mg) components.

<!-- UNRESOLVED: aspect mode values vary by model (appendix shows multiple codes for same modes, e.g., ZOOM=07h or 08h, FULL=09h or 10h) -->
<!-- UNRESOLVED: input terminal hex codes vary significantly across NEC model families; appendix lists common values but some entries show alternatives -->
<!-- UNRESOLVED: eco mode hex codes vary across models (e.g., NORMAL=00h or 01h, ECO=02h or 03h) -->
<!-- UNRESOLVED: flow_control setting not documented despite RTS/CTS pinout being specified -->
<!-- UNRESOLVED: CONTROL ID (ID1) and MODEL CODE (ID2) values are model-specific and not stated in this document -->
<!-- UNRESOLVED: default serial baud rate not stated — must be configured from the documented options (115200/38400/19200/9600/4800) -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:36.196Z
last_checked_at: 2026-06-02T19:39:08.476Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T19:39:08.476Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched their source hex sequences verbatim including the corrected picture_adjust FFh byte; transport values verified; source and spec share an identical 53-command catalogue. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal code values vary across NEC model families; appendix provides common values but some entries show alternative codes (e.g., HDMI: A1h or 1Ah)"
- "selectable 115200/38400/19200/9600/4800 bps - no single default stated"
- "RTS/CTS hardware handshaking noted in pinout but flow_control setting not documented"
- "no discrete settable parameter commands separate from Actions above."
- "no unsolicited event notifications documented. All communication"
- "no multi-step macro sequences documented in source."
- "no explicit safety warnings for voltage, current, or physical hazards stated in source."
- "aspect mode values vary by model (appendix shows multiple codes for same modes, e.g., ZOOM=07h or 08h, FULL=09h or 10h)"
- "input terminal hex codes vary significantly across NEC model families; appendix lists common values but some entries show alternatives"
- "eco mode hex codes vary across models (e.g., NORMAL=00h or 01h, ECO=02h or 03h)"
- "flow_control setting not documented despite RTS/CTS pinout being specified"
- "CONTROL ID (ID1) and MODEL CODE (ID2) values are model-specific and not stated in this document"
- "default serial baud rate not stated — must be configured from the documented options (115200/38400/19200/9600/4800)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
