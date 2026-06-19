---
spec_id: admin/sharp-nec-m861-avt3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC M861 Avt3 Control Spec"
manufacturer: Sharp/NEC
model_family: "M861 Avt3"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "M861 Avt3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:58:21.345Z
last_checked_at: 2026-06-18T08:12:31.465Z
generated_at: 2026-06-18T08:12:31.465Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) not stated for M861 Avt3; values of input terminal, aspect, eco mode, base model type, and sub-input are referenced to an Appendix (\"Supplementary Information by Command\") not present in the refined source. Appendix values would be required to fully resolve parameter enums."
  - "source does not describe async/event push behaviour."
  - "source does not define any explicit macros."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "model code (ID2) for M861 Avt3 not stated in source."
  - "firmware version compatibility not stated in source."
  - "control ID (ID1) default not stated in source (operator-configurable)."
  - "serial flow_control mode not explicitly named (Full duplex stated; RTS/CTS wired but mode not stated)."
  - "Appendix \"Supplementary Information by Command\" enums (input terminal, aspect, eco mode, base model type, sub-input) not in refined source."
  - "voltage/current/power specs not in scope of this control document."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:12:31.465Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC M861 Avt3 Control Spec

## Summary
Sharp/NEC M861 Avt3 projector control spec covering RS-232C serial and TCP/IP (LAN) control. Binary command protocol with hexadecimal-framed messages, checksum bytes, and a 6/16/32-byte framing convention (`20h <ID1> <ID2> <LEN> ... <CKS>`). 53 documented commands spanning power, input switching, mute, picture/volume/lens adjustment, status queries, eco mode, edge blending, PIP/PbP, lens memory, and audio select.

<!-- UNRESOLVED: model code (ID2) not stated for M861 Avt3; values of input terminal, aspect, eco mode, base model type, and sub-input are referenced to an Appendix ("Supplementary Information by Command") not present in the refined source. Appendix values would be required to fully resolve parameter enums. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists supported rates: 115200/38400/19200/9600/4800 bps; 9600 shown as default-safe, operator must select
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states Full duplex; RTS/CTS pins wired (D-SUB 9P) but flow control mode not named - UNRESOLVED
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands."
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred: 015 POWER ON / 016 POWER OFF present
  - queryable  # inferred: extensive request commands (009, 037, 053-1, 060-1, 078-*, 097-*, 305-*)
  - routable   # inferred: 018 INPUT SW CHANGE / 319-10 AUDIO SELECT SET present
  - levelable  # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST / 030-15 OTHER ADJUST present
```

## Actions
```yaml
# Framing convention (from §2.1): commands/responses expressed as hex bytes.
# <ID1>=control ID, <ID2>=model code (varies by model, UNRESOLVED for M861 Avt3),
# <CKS>=checksum (low byte of sum of all preceding bytes - see §2.2).
# For each command below: first line is the COMMAND payload sent by controller,
# verbatim from source. Responses/ACKs documented in Feedbacks section.

actions:
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power-on in progress."

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off incl. cooling time."

  - id: input_sw_change
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Input terminal value (e.g. 06h=Video). Full enum in source Appendix - UNRESOLVED.

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA02
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA03
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Aspect value - full enum in source Appendix, UNRESOLVED.

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target high byte: 96h = LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: integer
        description: "Adjustment target low byte: FFh (per source table)"
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA05
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals."

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08), both in seconds. -1 if undefined."

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "Content: 01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (WORD). Examples: 02h/00h=POWER ON, 03h/00h=POWER OFF, 05h/00h=AUTO, 06h/00h=MENU, 07h/00h=UP, 08h/00h=DOWN, 09h/00h=RIGHT, 0Ah/00h=LEFT, 0Bh/00h=ENTER, 0Ch/00h=EXIT, 0Dh/00h=HELP, 0Fh/00h=MAGNIFY UP, 10h/00h=MAGNIFY DOWN, 13h/00h=MUTE, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, 4Ch/00h=COMPUTER2, 4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1, 84h/00h=VOLUME UP, 85h/00h=VOLUME DOWN, 8Ah/00h=FREEZE, A3h/00h=ASPECT, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO"
      - name: DATA02
        type: integer
        description: Key code high byte (WORD). Typically 00h.

  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target: 06h=Periphery Focus (other values referenced in source)"
      - name: DATA02
        type: integer
        description: "Drive: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Adjustment target (matches lens_control DATA01)

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Target or FFh=Stop (when Stop, mode/value ignored)"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Operates on profile number selected by 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: integer
        description: "Setting: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitmask: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) - each 0=Stop/1=During operation."

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []

  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []

  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []

  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "01h=Freeze On, 02h=Freeze Off"

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returned value reflects Light mode or Lamp mode depending on projector."

  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_status_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_picture_by_picture_request
    label: PIP/Picture By Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Eco mode value - full enum in source Appendix, UNRESOLVED.

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
    params:
      - name: projector_name
        type: string
        description: "Projector name (DATA01-16), up to 16 bytes, NUL-terminated."

  - id: pip_picture_by_picture_set
    label: PIP/Picture By Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Setting value - MODE: 00h=PIP/01h=PbP. START POSITION: 00h=TOP-LEFT/01h=TOP-RIGHT/02h=BOTTOM-LEFT/03h=BOTTOM-RIGHT. Sub-input values per Appendix, UNRESOLVED."

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Input terminal - full enum in source Appendix, UNRESOLVED.
      - name: DATA02
        type: integer
        description: "Setting: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Each command returns a hex-framed response. ACK byte convention:
#  - first byte 2Xh or A0h-A3h prefix indicates response class
#  - <ID1> <ID2> echoed back, <LEN> follows, then payload, then <CKS>
#  - failure responses carry <ERR1> <ERR2> in place of data
feedbacks:
  - id: command_ack
    type: raw
    description: >
      Generic success response. Format: `{prefix} {cmd} <ID1> <ID2> <LEN> [data] <CKS>`.
      Prefix byte mapping (per command section in source):
        20h = response to 00h-prefixed command
        21h = response to 01h-prefixed command
        22h = response to 02h-prefixed command
        23h = response to 03h-prefixed command
      Example POWER ON ack: "22h 00h <ID1> <ID2> 00h <CKS>"

  - id: command_error
    type: raw
    description: >
      Generic failure response. Format: `A{prefix} {cmd} <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>`.
      Example POWER ON error: "A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
      See error_codes variable for ERR1/ERR2 meanings.

  - id: error_status_response
    type: raw
    description: >
      Response to 009 ERROR STATUS REQUEST.
      "20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>"
      DATA01-12 form a bitmask error status (see Notes for bit layout).

  - id: running_status_response
    type: raw
    description: >
      Response to 078-2. DATA03=Power status (00h=Standby/01h=On/FFh=Unsupported),
      DATA04=Cooling (00h=Not executed/01h=During execution),
      DATA05=Power On/Off process, DATA06=Operation status
      (00h=Standby Sleep, 04h=Power on, 05h=Cooling, 06h=Standby error,
       0Fh=Standby power-saving, 10h=Network standby).
```

## Variables
```yaml
variables:
  - id: error_codes
    type: enum_map
    description: >
      ERR1/ERR2 error code pairs (from §2.4):
        00h/00h = Command not recognized
        00h/01h = Command not supported by model
        01h/00h = Specified value invalid
        01h/01h = Specified input terminal invalid
        01h/02h = Specified language invalid
        02h/00h = Memory allocation error
        02h/02h = Memory in use
        02h/03h = Specified value cannot be set
        02h/04h = Forced onscreen mute on
        02h/06h = Viewer error
        02h/07h = No signal
        02h/08h = Test pattern or filter displayed
        02h/09h = No PC card inserted
        02h/0Ah = Memory operation error
        02h/0Ch = Entry list displayed
        02h/0Dh = Command cannot be accepted (power off)
        02h/0Eh = Command execution failed
        02h/0Fh = No authority for operation
        03h/00h = Specified gain number incorrect
        03h/01h = Specified gain invalid
        03h/02h = Adjustment failed

  - id: checksum_algorithm
    type: formula
    description: >
      CKS = low-order 8 bits of (sum of all preceding bytes).
      Example: 20h+81h+01h+60h+01h+00h = 103h → CKS = 03h.
```

## Events
```yaml
# No unsolicited notifications documented in source.
# UNRESOLVED: source does not describe async/event push behaviour.
```

## Macros
```yaml
# No multi-step sequences documented in source.
# UNRESOLVED: source does not define any explicit macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON (015): no other command accepted while power-on in progress (source §3.2)."
  - "POWER OFF (016): no other command accepted during power-off including cooling time (source §3.3)."
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing beyond the per-command 'no other command accepted' notes.
```

## Notes
- **Protocol framing**: All commands/responses are hexadecimal byte streams framed as `<prefix> <cmd> <ID1> <ID2> <LEN> [data...] <CKS>`. `<ID1>` = projector control ID (configurable). `<ID2>` = model code (varies per model — UNRESOLVED for M861 Avt3). `<CKS>` = checksum = low byte of sum of all preceding bytes (§2.2).
- **Baud rate**: source lists 5 supported rates (115200 / 38400 / 19200 / 9600 / 4800 bps). Default selected by operator; no single "default" rate stated in source.
- **TCP port 7142**: stated verbatim in §1.2 ("Use TCP port number '7142' for sending and receiving commands").
- **Cooling lockout**: POWER OFF command blocks all other commands for the duration of cooling. Controllers must wait for response before issuing further commands.
- **Error status bitmask** (response to 009, DATA01-12): full bit layout documented in source §3.1 — includes cover/fan/temperature/power/lamp/ formatter/FPGA/mirror-cover/foreign-matter/ballast/iris/lens errors. Interlock switch open = DATA09 Bit1.
- **Usage time resolution**: lamp/filter usage times are returned in seconds but updated only at 1-minute intervals.
- **Appendix references**: source repeatedly defers enum values (input terminal, aspect, eco mode, base model type, sub-input) to an Appendix "Supplementary Information by Command" that is not present in the refined source document. These parameter enums are UNRESOLVED.

<!-- UNRESOLVED: model code (ID2) for M861 Avt3 not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: control ID (ID1) default not stated in source (operator-configurable). -->
<!-- UNRESOLVED: serial flow_control mode not explicitly named (Full duplex stated; RTS/CTS wired but mode not stated). -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" enums (input terminal, aspect, eco mode, base model type, sub-input) not in refined source. -->
<!-- UNRESOLVED: voltage/current/power specs not in scope of this control document. -->
````

Spec output above. 53 actions enumerated (matches source command list §2). Both `serial` + `tcp` protocols populated (source §1.2 explicit). No assumed values — baud listed as multi-rate with note, port 7142 verbatim, ID2/appendix enums marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:58:21.345Z
last_checked_at: 2026-06-18T08:12:31.465Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:12:31.465Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) not stated for M861 Avt3; values of input terminal, aspect, eco mode, base model type, and sub-input are referenced to an Appendix (\"Supplementary Information by Command\") not present in the refined source. Appendix values would be required to fully resolve parameter enums."
- "source does not describe async/event push behaviour."
- "source does not define any explicit macros."
- "source contains no explicit safety warnings, interlock procedures,"
- "model code (ID2) for M861 Avt3 not stated in source."
- "firmware version compatibility not stated in source."
- "control ID (ID1) default not stated in source (operator-configurable)."
- "serial flow_control mode not explicitly named (Full duplex stated; RTS/CTS wired but mode not stated)."
- "Appendix \"Supplementary Information by Command\" enums (input terminal, aspect, eco mode, base model type, sub-input) not in refined source."
- "voltage/current/power specs not in scope of this control document."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
