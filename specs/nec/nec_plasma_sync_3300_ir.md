---
spec_id: admin/nec-plasma-sync-3300
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC PLASMA SYNC 3300 Control Spec"
manufacturer: NEC
model_family: "PLASMA SYNC 3300"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "PLASMA SYNC 3300"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:53:09.362Z
last_checked_at: 2026-06-02T22:11:49.409Z
generated_at: 2026-06-02T22:11:49.409Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document header identifies model as BDT140013; file path suggests PLASMA SYNC 3300 — discrepancy not resolved"
  - "baud rate configurable (115200/38400/19200/9600/4800 bps) but none fixed in source"
  - "hardware flow control pins present (RTS/CTS) but no protocol stated"
  - "projector may send asynchronous status changes - not documented."
  - "no safety warnings or interlock procedures stated in source."
  - "Appendix \"Supplementary Information by Command\" referenced but not included in source — input/output values for some commands (INPUT SW CHANGE, ASPECT ADJUST, ECO MODE, PIP/PBP sub inputs) are not fully documented"
  - "wireless LAN unit specifications and configuration not documented (source directs to operation manual of wireless LAN unit)"
  - "firmware version compatibility not stated in source"
  - "authentication tokens or session management not documented — none described"
  - "binary protocol byte-level timing requirements not stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:11:49.409Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# NEC PLASMA SYNC 3300 Control Spec

## Summary
NEC projector supporting both serial (RS-232C) and wired TCP/IP control. Communication settings include configurable baud rates from 4800 to 115200 bps, 8 data bits, no parity, 1 stop bit, full duplex. LAN control uses TCP port 7142. No authentication required for either interface.

<!-- UNRESOLVED: source document header identifies model as BDT140013; file path suggests PLASMA SYNC 3300 — discrepancy not resolved -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated: "Use TCP port number 7142"
serial:
  baud_rate: null  # UNRESOLVED: baud rate configurable (115200/38400/19200/9600/4800 bps) but none fixed in source
  data_bits: 8  # stated: "Data length 8 bits"
  parity: none  # stated: "Parity bit None"
  stop_bits: 1  # stated: "Stop bit 1 bit"
  flow_control: null  # UNRESOLVED: hardware flow control pins present (RTS/CTS) but no protocol stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: POWER ON (015) and POWER OFF (016) commands present
- routable  # inferred: INPUT SW CHANGE (018) command present
- queryable  # inferred: multiple status request commands present (ERROR STATUS, RUNNING STATUS, INPUT STATUS, MUTE STATUS, etc.)
- levelable  # inferred: PICTURE ADJUST (030-1), VOLUME ADJUST (030-2), ASPECT ADJUST (030-12) commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on the projector. No other command accepted during power-on sequence.
  command_payload: "02h 00h 00h 00h 00h 02h"
  response_payload: "A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off the projector. No other command accepted during power-off sequence including cooling time.
  command_payload: "02h 01h 00h 00h 00h 03h"
  response_payload: "A2h 01h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (hex). See Appendix for values.
  command_payload: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  response_payload: "22h 03h <ID1> <ID2> 01h <DATA01> <CKS>"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  description: Turns picture mute on. Automatically cleared by input terminal switch or video signal switch.
  command_payload: "02h 10h 00h 00h 00h 12h"

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  description: Turns sound mute on. Automatically cleared by input switch, video signal switch, or volume adjustment.
  command_payload: "02h 12h 00h 00h 00h 14h"

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  description: Turns onscreen mute on. Automatically cleared by input terminal switch or video signal switch.
  command_payload: "02h 14h 00h 00h 00h 16h"

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
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value
  command_payload: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value
  command_payload: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect ratio value. See Appendix.
  command_payload: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: "96h/FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value
  command_payload: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code to send. See key code table for values (e.g., 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, etc.)
  command_payload: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  description: Closes the lens shutter.
  command_payload: "02h 16h 00h 00h 00h 18h"

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  description: Opens the lens shutter.
  command_payload: "02h 17h 00h 00h 00h 19h"

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: function
      type: integer
      description: "06h=Periphery Focus"
    - name: action
      type: integer
      description: "00h=Stop, 01h=Drive 1s plus, 02h=Drive 0.5s plus, 03h=Drive 0.25s plus, 7Fh=Drive plus, 81h=Drive minus, FDh=Drive 0.25s minus, FEh=Drive 0.5s minus, FFh=Drive 1s minus"
  command_payload: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: 16-bit adjustment value
  command_payload: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  command_payload: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  command_payload: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"

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
  command_payload: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"
  command_payload: "02h 27h 00h 00h 01h <DATA01> <CKS>"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: Eco mode value. See Appendix.
  command_payload: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)
  command_payload: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"

- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value (mode: 00h=PIP, 01h=PICTURE BY PICTURE; position: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT)
  command_payload: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"
  command_payload: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value. See Appendix.
    - name: value
      type: integer
      description: "00h=terminal specified in DATA01, 02h=COMPUTER"
  command_payload: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=Turn freeze on, 02h=Turn freeze off"
  command_payload: "01h 98h 00h 00h 01h <DATA01> <CKS>"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  kind: query
  command_payload: "00h 88h 00h 00h 00h 88h"
  response_payload: "A0h 88h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  response_data: |
    DATA01 (bits): Bit0=Cover error, Bit1=Temperature error, Bit3=Fan error, Bit4=Fan error, Bit5=Power error, Bit6=Lamp off/backlight off, Bit7=Lamp replacement moratorium
    DATA02: Bit0=Lamp usage exceeded, Bit1=Formatter error, Bit2=Lamp 2 off
    DATA03: Bit1=FPGA error, Bit2=Temperature sensor, Bit4=Lamp data error, Bit5=Mirror cover error, Bit6=Lamp 2 moratorium, Bit7=Lamp 2 usage exceeded
    DATA04: Bit0=Lamp 2 not present, Bit1=Lamp 2 data error, Bit2=Temperature dust, Bit3=Foreign matter sensor, Bit6=Iris calibration error, Bit7=Lens not installed
    DATA09: Bit0=Portrait cover side up, Bit1=Interlock switch open, Bit2=System error (Slave CPU), Bit3=System error (Formatter)

- id: running_status
  label: Running Status Request
  kind: query
  command_payload: "00h 85h 00h 00h 01h 01h 87h"
  response_data: |
    DATA03: 00h=Standby, 01h=Power on
    DATA04: 00h=Not executed, 01h=During cooling
    DATA05: 00h=Not executed, 01h=During power on/off
    DATA06: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby

- id: input_status
  label: Input Status Request
  kind: query
  command_payload: "00h 85h 00h 00h 01h 02h 88h"
  response_data: |
    DATA01: 00h=Not executed, 01h=During execution
    DATA02: Signal list number (add 1 for practical value)
    DATA03: Signal type (1-5)
    DATA04: 01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 07h/23h=VIEWER
    DATA06: 00h=Test pattern not displayed, 01h=Displayed
    DATA09: 00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN displayed

- id: mute_status
  label: Mute Status Request
  kind: query
  command_payload: "00h 85h 00h 00h 01h 03h 89h"
  response_data: |
    DATA01: 00h=Off, 01h=On (picture mute)
    DATA02: 00h=Off, 01h=On (sound mute)
    DATA03: 00h=Off, 01h=On (onscreen mute)
    DATA04: 00h=Off, 01h=On (forced onscreen mute)
    DATA05: 00h=Not displayed, 01h=Displayed (onscreen display)

- id: model_name
  label: Model Name Request
  kind: query
  command_payload: "00h 85h 00h 00h 01h 04h 8Ah"
  response_data: "DATA01-32: Model name (NUL-terminated string)"

- id: cover_status
  label: Cover Status Request
  kind: query
  command_payload: "00h 85h 00h 00h 01h 05h 8Bh"
  response_data: "DATA01: 00h=Normal (opened), 01h=Cover closed"

- id: information_request
  label: Information Request
  kind: query
  command_payload: "03h 8Ah 00h 00h 00h 8Dh"
  response_data: |
    DATA01-49: Projector name (NUL-terminated)
    DATA83-86: Lamp usage time (seconds)
    DATA87-90: Filter usage time (seconds)

- id: filter_usage_info
  label: Filter Usage Information Request
  kind: query
  command_payload: "03h 95h 00h 00h 00h 98h"
  response_data: |
    DATA01-04: Filter usage time (seconds)
    DATA05-08: Filter alarm start time (seconds)
    Returns -1 if no time defined

- id: lamp_info_3
  label: Lamp Information Request 3
  kind: query
  command_payload: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Usage time (seconds), 04h=Remaining life (%)"
  response_data: |
    DATA03-06: Obtained information
    Lamp 2 only effective for two-lamp models
    If replacement deadline exceeded, remaining life returns negative value

- id: carbon_savings_info
  label: Carbon Savings Information Request
  kind: query
  command_payload: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  response_data: |
    DATA02-05: Carbon Savings (Kilogram, max 99999kg)
    DATA06-09: Carbon Savings (Milligram, max 999999mg)

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command_payload: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: function
      type: integer
      description: Lens function to query
  response_data: |
    DATA02-03: Upper limit (16-bit)
    DATA04-05: Lower limit (16-bit)
    DATA06-07: Current value (16-bit)

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command_payload: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  response_data: |
    DATA01: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)
    DATA02: Setting (00h=OFF, 01h=ON)

- id: lens_info_request
  label: Lens Information Request
  kind: query
  command_payload: "02h 22h 00h 00h 01h 00h 25h"
  response_data: |
    DATA01 bits: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V)

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command_payload: "02h 28h 00h 00h 00h 2Ah"
  response_data: |
    DATA01: Profile number (00h=Profile 1, 01h=Profile 2)
    DATA02: Reserved

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command_payload: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: parameter
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
  response_data: |
    DATA01: 00h=Display not possible, 01h=Adjustment not possible, 02h=Adjustment possible, FFh=Gain does not exist
    DATA02-03: Upper limit (16-bit)
    DATA04-05: Lower limit (16-bit)
    DATA06-07: Default value (16-bit)
    DATA08-09: Current value (16-bit)
    DATA10-11: Wide adjustment width (16-bit)
    DATA12-13: Narrow adjustment width (16-bit)
    DATA14: 00h=Default invalid, 01h=Default valid

- id: setting_request
  label: Setting Request
  kind: query
  command_payload: "00h 85h 00h 00h 01h 00h 86h"
  response_data: |
    DATA01-03: Base model type
    DATA04: 00h=Sound not available, 01h=Sound available
    DATA05: 00h=Not available, 01h=Clock function, 02h=Sleep timer, 03h=Clock+Sleep timer

- id: info_string_request
  label: Information String Request
  kind: query
  command_payload: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: type
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
  response_data: |
    DATA02: String length (excluding NUL)
    DATA03-??: Information string (NUL-terminated)

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command_payload: "03h B0h 00h 00h 01h 07h BBh"
  response_data: "DATA01: Eco mode value (see Appendix)"

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command_payload: "03h B0h 00h 00h 01h 2Ch E0h"
  response_data: "DATA01-17: Projector name (NUL-terminated)"

- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: query
  command_payload: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  response_data: "DATA01-06: MAC address (hex)"

- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  kind: query
  command_payload: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  response_data: |
    DATA01: Item (same as request)
    DATA02: Setting value (see spec for possible values per item)

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command_payload: "03h B0h 00h 00h 02h DFh 00h 94h"
  response_data: "DATA01: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command_payload: "00h BFh 00h 00h 01h 00h C0h"
  response_data: |
    DATA01-02: Base model type
    DATA03-11: Model name (NUL-terminated)
    DATA12-13: Base model type

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command_payload: "00h BFh 00h 00h 02h 01h 06h C8h"
  response_data: "DATA01-16: Serial number (NUL-terminated string)"

- id: basic_info_request
  label: Basic Information Request
  kind: query
  command_payload: "00h BFh 00h 00h 01h 02h C2h"
  response_data: |
    DATA01: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby
    DATA02: 00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN, 05h=Test pattern(user), 10h=Signal being switched
    DATA03: Signal type 1 (1-5)
    DATA04: 01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 07h/23h=VIEWER, 05h=Reserved, FFh=Not Source Input
    DATA05: Display signal type (effective when DATA04 is 02h or 03h)
    DATA06: 00h=Off, 01h=On (video mute)
    DATA07: 00h=Off, 01h=On (sound mute)
    DATA08: 00h=Off, 01h=On (onscreen mute)
    DATA09: 00h=Off, 01h=On (freeze)
```

## Variables
```yaml
# No standalone settable parameters found; all parameters are command-specific.
# See Actions section for parameter details.
```

## Events
```yaml
# No unsolicited event notifications described in source.
# UNRESOLVED: projector may send asynchronous status changes - not documented.
```

## Macros
```yaml
# No multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source.
# Power on/off commands note that no other commands are accepted during execution
# (cooling time included for power off), but no explicit safety interlock procedure is documented.
```

## Notes
Command format: `[BRK] [SOM] [ID1] [ID2] [LEN] [DATA...] [CKS]` — all values in hexadecimal.

Common parameter meanings:
- `ID1`: Control ID (set for projector)
- `ID2`: Model code (varies by model)
- `CKS`: Checksum = low-order byte of sum of all preceding bytes
- `LEN`: Data length of DATA portion
- `ERR1/ERR2`: Error code combination (see error table)

Error code table (ERR1/ERR2):
- `00h/00h`: Command not recognized
- `00h/01h`: Command not supported by model
- `01h/00h`: Invalid specified value
- `01h/01h`: Invalid input terminal
- `01h/02h`: Invalid language
- `02h/00h`: Memory allocation error
- `02h/02h`: Memory in use
- `02h/03h`: Value cannot be set
- `02h/04h`: Forced onscreen mute on
- `02h/06h`: Viewer error
- `02h/07h`: No signal
- `02h/08h`: Test pattern or filter displayed
- `02h/09h`: No PC card inserted
- `02h/0Ah`: Memory operation error
- `02h/0Ch`: Entry list displayed
- `02h/0Dh`: Command cannot be accepted (power off)
- `02h/0Eh`: Command execution failed
- `02h/0Fh`: No authority for operation
- `03h/00h`: Incorrect gain number
- `03h/01h`: Invalid gain
- `03h/02h`: Adjustment failed

Serial baud rate is configurable (115200/38400/19200/9600/4800 bps) — no single fixed rate stated.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced but not included in source — input/output values for some commands (INPUT SW CHANGE, ASPECT ADJUST, ECO MODE, PIP/PBP sub inputs) are not fully documented -->
<!-- UNRESOLVED: wireless LAN unit specifications and configuration not documented (source directs to operation manual of wireless LAN unit) -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: authentication tokens or session management not documented — none described -->
<!-- UNRESOLVED: binary protocol byte-level timing requirements not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:53:09.362Z
last_checked_at: 2026-06-02T22:11:49.409Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:11:49.409Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document header identifies model as BDT140013; file path suggests PLASMA SYNC 3300 — discrepancy not resolved"
- "baud rate configurable (115200/38400/19200/9600/4800 bps) but none fixed in source"
- "hardware flow control pins present (RTS/CTS) but no protocol stated"
- "projector may send asynchronous status changes - not documented."
- "no safety warnings or interlock procedures stated in source."
- "Appendix \"Supplementary Information by Command\" referenced but not included in source — input/output values for some commands (INPUT SW CHANGE, ASPECT ADJUST, ECO MODE, PIP/PBP sub inputs) are not fully documented"
- "wireless LAN unit specifications and configuration not documented (source directs to operation manual of wireless LAN unit)"
- "firmware version compatibility not stated in source"
- "authentication tokens or session management not documented — none described"
- "binary protocol byte-level timing requirements not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
