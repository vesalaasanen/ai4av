---
spec_id: admin/sharp-nec-me501-avt3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC ME501 AVT3 Control Spec"
manufacturer: Sharp/NEC
model_family: "ME501 AVT3"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "ME501 AVT3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:04:29.563Z
last_checked_at: 2026-06-18T08:29:52.351Z
generated_at: 2026-06-18T08:29:52.351Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value for this specific model not stated in the command reference; protocol version number not stated."
  - "flow control not explicitly stated in source (RTS/CTS pins wired but mode not named)"
  - "full enum not in extracted source"
  - "numeric range not stated in source; returned at runtime"
  - "numeric range not stated in source"
  - "per-axis limits returned at runtime, not stated as constants"
  - "no unsolicited notifications documented in source. All responses"
  - "no multi-step sequences explicitly described in source."
  - "no explicit power-on sequencing procedure (e.g. wait times,"
  - "model code (ID2) value for ME501 AVT3 not stated."
  - "control ID (ID1) default value not stated."
  - "firmware version compatibility not stated."
  - "serial flow control mode not explicitly named (RTS/CTS pins present)."
  - "numeric ranges for brightness/contrast/color/hue/sharpness/volume not stated; only returned at runtime via GAIN PARAMETER REQUEST 3."
  - "full enum lists for input terminals, aspect values, eco mode values, PIP sub-input values, base model types — referenced appendix not in extracted source."
  - "response timing / inter-command delay requirements not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:29:52.351Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC ME501 AVT3 Control Spec

## Summary
Sharp/NEC ME501 AVT3 projector controlled via a binary command protocol over RS-232C serial or TCP/IP network (port 7142). Frames are hexadecimal byte sequences with a leading message type byte, command bytes, and a trailing checksum byte (low-order 8 bits of the sum of all preceding bytes). This spec enumerates the 53 commands documented in BDT140013 Revision 7.1 covering power, mute, input switching, picture/volume/aspect/gain adjustment, shutter, lens control and memory, status queries, eco mode, PIP/PbP, edge blending, and information requests.

<!-- UNRESOLVED: model code (ID2) value for this specific model not stated in the command reference; protocol version number not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # all five stated as supported in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not explicitly stated in source (RTS/CTS pins wired but mode not named)
addressing:
  port: 7142  # TCP port for command send/receive (source: "Use TCP port number 7142")
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON / POWER OFF commands
  - queryable    # inferred from numerous request/status query commands
  - levelable    # inferred from PICTURE ADJUST / VOLUME ADJUST / OTHER ADJUST gain controls
```

## Actions
```yaml
# Frame convention (from source "2.1 Understanding command details"):
#   Command  : <MT> <CMD1> <ID1> <ID2> <LEN> [ <DATA...> ] <CKS>
#   <MT>     message-type byte (00h/01h/02h/03h for requests; 20h/21h/22h/23h for ack responses; A0h/A1h/A2h/A3h for error responses)
#   <ID1>    control ID set on the projector
#   <ID2>    model code (varies by model)
#   <LEN>    data length following LEN, in bytes
#   <CKS>    checksum = low-order 8 bits of sum of all preceding bytes
# Commands below show the payload verbatim from the source. ID1/ID2/CKS are
# frame-runtime values shown as placeholders; fixed literal bytes are quoted.

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
  notes: "No other command accepted while power-on is in progress."

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off (including cooling time)."

- id: input_switch_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Input terminal value (e.g. 06h = video port). Full list in Appendix 'Supplementary Information by Command'."
  notes: "Example from source switching to video: 02h 03h 00h 00h 02h 01h 06h 0Eh. Response DATA01 FFh = ended with error (no signal switch made)."

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Picture mute turns off on input/video signal switch."

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
  notes: "Sound mute turns off on input/video signal switch or volume adjustment."

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
  notes: "Onscreen mute turns off on input/video signal switch."

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02}-{DATA04} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Source example sets brightness to 10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Brightness -10: ...00h F6h FFh 0Ch."

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01}-{DATA03} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Source example sets volume to 10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Aspect value. Full list in Appendix 'Supplementary Information by Command'."

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01}-{DATA05} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjustment target high byte (96h for LAMP ADJUST / LIGHT ADJUST per source table)"
    - name: DATA02
      type: string
      description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST per source table)"
    - name: DATA03
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90)."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined."

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: string
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
  notes: "Source example (Lamp 1 usage time): 03h 96h 00h 00h 02h 00h 01h 9Ch. Remaining life returns negative if replacement deadline exceeded."

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Content: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Returns kilograms (DATA02-05, max 99999) and milligrams (DATA06-09, max 999999)."

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Key code low byte (WORD type, see key code list)"
    - name: DATA02
      type: string
      description: "Key code high byte (WORD type, see key code list)"
  notes: "Source example sends key code AUTO (05h 00h): 02h 0Fh 00h 00h 02h 05h 00h 18h. Response DATA01 FFh = ended with error. Key code list includes POWER ON (02h/00h), POWER OFF (03h/00h), AUTO, MENU, UP, DOWN, RIGHT, LEFT, ENTER, EXIT, HELP, MAGNIFY UP/DOWN, MUTE, PICTURE, COMPUTER1/2, VIDEO1, S-VIDEO1, VOLUME UP/DOWN, FREEZE, ASPECT, SOURCE, LAMP MODE/ECO."

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []
  notes: "Closes the lens shutter."

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []
  notes: "Opens the lens shutter."

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Lens target; 06h=Periphery Focus documented in source"
    - name: DATA02
      type: string
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus continuous, 81h=drive minus continuous, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
  notes: "Send 00h in DATA02 to stop continuous drive (7Fh/81h). Lens position can be re-commanded without stop while driving."

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Lens target selector (matches DATA01 of LENS CONTROL)"
  notes: "Returns upper limit, lower limit, and current value (16-bit each) for the selected lens axis."

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01}-{DATA04} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Lens target; FFh=Stop (mode/value ignored when Stop)"
    - name: DATA02
      type: string
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on profile number selected via LENS PROFILE SET (053-10)."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "Returns setting value 00h=OFF or 01h=ON for the queried option."

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitfield: bit0=Lens memory, bit1=Zoom, bit2=Focus, bit3=Lens Shift (H), bit4=Lens Shift (V) - 0=Stop, 1=During operation. Bits 5-7 reserved."

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns selected reference lens memory profile number (DATA01): 00h=Profile 1, 01h=Profile 2."

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Source example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns status, upper/lower limits, default, current, wide/narrow adjustment width, and default-validity flag."

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function availability (DATA04: 00h=not available, 01h=available), profile number/function (DATA05)."

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (DATA03: 00h=Standby, 01h=Power on), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06: 00h=Standby Sleep, 04h=Power on, 05h=Cooling, 06h=Standby error, 0Fh=Power saving, 10h=Network standby)."

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number (returned value is practical value minus 1), selection signal type 1 & 2, signal list type, test pattern display, and content displayed."

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute (DATA01), sound mute (DATA02), onscreen mute (DATA03), forced onscreen mute (DATA04), onscreen display (DATA05) - each 00h=Off, 01h=On."

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns model name string (DATA01-32, NUL-terminated)."

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns mirror/lens cover status (DATA01): 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"
  notes: "Returns label/information string length (DATA02) and string (DATA03+)."

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco mode value (some models return 'Light mode' or 'Lamp mode'). Values in Appendix 'Supplementary Information by Command'."

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name (DATA01-17, NUL-terminated)."

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns 6-byte MAC address (DATA01-06)."

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Parameter: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  notes: "Returns MODE (00h=PIP, 01h=PbP), START POSITION (00h=TOP-LEFT..03h=BOTTOM-RIGHT), or sub input setting value."

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns edge blending setting value (DATA01): 00h=OFF, 01h=ON."

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Eco mode value (see Appendix 'Supplementary Information by Command')"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
  params:
    - name: DATA01-16
      type: string
      description: "Projector name (up to 16 bytes), NUL-terminated"

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Parameter: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: string
      description: "Setting value (depends on DATA01): MODE 00h=PIP/01h=PbP; START POSITION 00h-03h; sub input value (Appendix)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02, DATA12-13) and model name string (DATA03-11, NUL-terminated). Values in Appendix."

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns 16-byte serial number string (DATA01-16, NUL-terminated)."

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status (DATA01: 00h=Standby Sleep, 04h=Power on, 05h=Cooling, 06h=Standby error, 0Fh=Power saving, 10h=Network standby), content displayed (DATA02), selection signal type 1/2 (DATA03/04), display signal type (DATA05), video/sound/onscreen mute, and freeze status."

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Input terminal value (see Appendix 'Supplementary Information by Command')"
    - name: DATA02
      type: string
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# All request/query commands above produce an ack response frame whose message-type
# byte encodes success/error:
#   Success (no data):  20h/21h/22h/23h <CMD1> <ID1> <ID2> <LEN=00h> <CKS>
#   Success (with data): same MT with <LEN> and <DATA...> populated
#   Failure:            A0h/A1h/A2h/A3h <CMD1> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# Per source "2.4 Error code list" (ERR1/ERR2 pairs):
#   00h/00h: command cannot be recognized
#   00h/01h: command not supported by model
#   01h/00h: specified value invalid
#   01h/01h: specified input terminal invalid
#   01h/02h: specified language invalid
#   02h/00h: memory allocation error
#   02h/02h: memory in use
#   02h/03h: specified value cannot be set
#   02h/04h: forced onscreen mute on
#   02h/06h: viewer error
#   02h/07h: no signal
#   02h/08h: test pattern or filter displayed
#   02h/09h: no PC card inserted
#   02h/0Ah: memory operation error
#   02h/0Ch: entry list displayed
#   02h/0Dh: command cannot be accepted because power is off
#   02h/0Eh: command execution failed
#   02h/0Fh: no authority for operation
#   03h/00h: specified gain number incorrect
#   03h/01h: specified gain invalid
#   03h/02h: adjustment failed

# Below: observable states queryable via the request actions above. Each maps a
# query action to the discrete enum it exposes.

- id: error_state
  type: bitfield
  query_action: error_status_request
  description: "DATA01-12 bitfield (1=error). Covers cover/fan/temperature/power/lamp errors, formatter/FPGA errors, mirror-cover, ballast-comms, iris-calibration, lens-install, interlock-switch-open, and system errors."

- id: power_state
  type: enum
  values: [standby, power_on]
  query_action: running_status_request

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  query_action: running_status_request

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  query_action: running_status_request

- id: power_on_off_process
  type: enum
  values: [not_executed, during_execution]
  query_action: running_status_request

- id: picture_mute_state
  type: enum
  values: [off, on]
  query_action: mute_status_request

- id: sound_mute_state
  type: enum
  values: [off, on]
  query_action: mute_status_request

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  query_action: mute_status_request

- id: forced_onscreen_mute_state
  type: enum
  values: [off, on]
  query_action: mute_status_request

- id: cover_state
  type: enum
  values: [normal_opened, closed]
  query_action: cover_status_request

- id: freeze_state
  type: enum
  values: [off, on]
  query_action: basic_information_request

- id: eco_mode_value
  type: enum
  query_action: eco_mode_request
  description: "Enum values not enumerated in source; see Appendix 'Supplementary Information by Command'."  # UNRESOLVED: full enum not in extracted source

- id: edge_blending_state
  type: enum
  values: [off, on]
  query_action: edge_blending_mode_request

- id: lens_operation_bitfield
  type: bitfield
  query_action: lens_information_request
  description: "DATA01 bits: lens-memory, zoom, focus, lens-shift-H, lens-shift-V (0=stop, 1=operating)."
```

## Variables
```yaml
# Settable numeric/level parameters (not discrete actions). Mirrors the gain
# parameters returned by GAIN PARAMETER REQUEST 3 and adjusted by the
# corresponding adjust actions. Range/default sourced from the device response
# at runtime; absolute min/max numeric values are not stated in this reference
# (they are returned per-device by 060-1).

- id: brightness
  type: integer
  signed: true
  set_action: picture_adjust  # DATA01=00h
  query_action: gain_parameter_request_3  # DATA01=00h
  range: null  # UNRESOLVED: numeric range not stated in source; returned at runtime

- id: contrast
  type: integer
  signed: true
  set_action: picture_adjust  # DATA01=01h
  query_action: gain_parameter_request_3  # DATA01=01h
  range: null  # UNRESOLVED: numeric range not stated in source

- id: color
  type: integer
  signed: true
  set_action: picture_adjust  # DATA01=02h
  query_action: gain_parameter_request_3  # DATA01=02h
  range: null  # UNRESOLVED: numeric range not stated in source

- id: hue
  type: integer
  signed: true
  set_action: picture_adjust  # DATA01=03h
  query_action: gain_parameter_request_3  # DATA01=03h
  range: null  # UNRESOLVED: numeric range not stated in source

- id: sharpness
  type: integer
  signed: true
  set_action: picture_adjust  # DATA01=04h
  query_action: gain_parameter_request_3  # DATA01=04h
  range: null  # UNRESOLVED: numeric range not stated in source

- id: volume
  type: integer
  signed: true
  set_action: volume_adjust
  query_action: gain_parameter_request_3  # DATA01=05h
  range: null  # UNRESOLVED: numeric range not stated in source

- id: lamp_light_adjust
  type: integer
  signed: true
  set_action: other_adjust  # DATA01/02 = 96h/FFh
  query_action: gain_parameter_request_3  # DATA01=96h
  range: null  # UNRESOLVED: numeric range not stated in source

- id: lens_axis_value
  type: integer
  signed: true
  set_action: lens_control_2
  query_action: lens_control_request
  range: null  # UNRESOLVED: per-axis limits returned at runtime, not stated as constants
  notes: "Upper/lower limit and current value returned per selected lens axis."

- id: projector_name
  type: string
  max_length: 16
  set_action: lan_projector_name_set
  query_action: lan_projector_name_request
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source. All responses
# are direct command replies (request/response model).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: projector becomes unresponsive during power-off incl. cooling time; high-impact thermal event
  - power_on   # source: no other command accepted during power-on sequence
interlocks:
  - condition: "Power off in progress (cooling time)"
    effect: "No command other than the in-progress power-off is accepted."
    source: "016. POWER OFF"
  - condition: "Power on in progress"
    effect: "No other command can be accepted."
    source: "015. POWER ON"
  - condition: "Interlock switch open"
    effect: "Reported as error bit DATA09 bit1 of ERROR STATUS REQUEST."
    source: "009. ERROR STATUS REQUEST - Extended status"
  - condition: "Power is off"
    effect: "Commands return error ERR1=02h ERR2=0Dh ('command cannot be accepted because the power is off')."
    source: "2.4 Error code list"
# UNRESOLVED: no explicit power-on sequencing procedure (e.g. wait times,
# warm-up delays) stated in this command reference.
```

## Notes
- **Protocol**: Binary, hex-byte frames. Request MT bytes 00h–03h, success ack MT bytes 20h–23h, error ack MT bytes A0h–A3h. The high nibble of the request MT pairs with the ack MT (e.g. 02h → 22h success / A2h error).
- **Checksum**: Low-order 8 bits of the sum of all preceding bytes (worked example in source: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`).
- **ID1 / ID2**: ID1 is the control ID set on the projector; ID2 is the model code. Neither constant value for the ME501 AVT3 is given in this reference — both are runtime-configured / model-specific.
- **Appendix cross-references**: Several commands (INPUT SW CHANGE values, ASPECT values, eco mode values, PIP sub-input values, base model types) reference an "Appendix: Supplementary Information by Command" that is not present in the extracted source text. Those enum lists are left as `UNRESOLVED` where their values were not in the body.
- **Multi-value baud**: Source lists five supported baud rates (115200/38400/19200/9600/4800); the device auto-detects or is configured via the host software. All five are emitted in `serial.baud_rate`.
- **Wireless LAN**: Mentioned as supported via an optional wireless LAN unit; specifics deferred to the wireless unit's own manual (not in this reference).

<!-- UNRESOLVED: model code (ID2) value for ME501 AVT3 not stated. -->
<!-- UNRESOLVED: control ID (ID1) default value not stated. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: serial flow control mode not explicitly named (RTS/CTS pins present). -->
<!-- UNRESOLVED: numeric ranges for brightness/contrast/color/hue/sharpness/volume not stated; only returned at runtime via GAIN PARAMETER REQUEST 3. -->
<!-- UNRESOLVED: full enum lists for input terminals, aspect values, eco mode values, PIP sub-input values, base model types — referenced appendix not in extracted source. -->
<!-- UNRESOLVED: response timing / inter-command delay requirements not stated. -->
````

Spec output. 53 actions, all literal payloads verbatim. Serial+TCP transport, port 7142, 5 baud rates, no auth (inferred). Safety interlocks from power-on/off + power-off error code. Appendix-referenced enum lists marked UNRESOLVED (not in extracted body).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:04:29.563Z
last_checked_at: 2026-06-18T08:29:52.351Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:29:52.351Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value for this specific model not stated in the command reference; protocol version number not stated."
- "flow control not explicitly stated in source (RTS/CTS pins wired but mode not named)"
- "full enum not in extracted source"
- "numeric range not stated in source; returned at runtime"
- "numeric range not stated in source"
- "per-axis limits returned at runtime, not stated as constants"
- "no unsolicited notifications documented in source. All responses"
- "no multi-step sequences explicitly described in source."
- "no explicit power-on sequencing procedure (e.g. wait times,"
- "model code (ID2) value for ME501 AVT3 not stated."
- "control ID (ID1) default value not stated."
- "firmware version compatibility not stated."
- "serial flow control mode not explicitly named (RTS/CTS pins present)."
- "numeric ranges for brightness/contrast/color/hue/sharpness/volume not stated; only returned at runtime via GAIN PARAMETER REQUEST 3."
- "full enum lists for input terminals, aspect values, eco mode values, PIP sub-input values, base model types — referenced appendix not in extracted source."
- "response timing / inter-command delay requirements not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
