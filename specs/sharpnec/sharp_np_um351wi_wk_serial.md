---
spec_id: admin/sharp-nec-np-um351wi-wk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP Um351Wi WK Control Spec"
manufacturer: Sharp/NEC
model_family: "NP Um351Wi WK"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP Um351Wi WK"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:40:27.163Z
last_checked_at: 2026-06-18T08:56:39.994Z
generated_at: 2026-06-18T08:56:39.994Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model/firmware strings, flow control mode, ID1/ID2 default values, and input-terminal value tables (referenced only as \"see Appendix\") are not present in this refined source."
  - "flow control mode not stated in source (RTS/CTS pins present but config not specified)"
  - "full enumerated enum value lists for eco mode and input-terminal tables not in source (referenced as Appendix)"
  - "enum values referenced as Appendix, not in source."
  - "no event/notification mechanism described in source."
  - "populate from source, or remove section if not applicable."
  - "no explicit power-on sequencing procedure or safety interlock steps stated in source beyond command-acceptance notes."
  - "ID1 (control ID) default value not stated."
  - "ID2 (model code) for NP Um351Wi WK not stated."
  - "input-terminal value table (Appendix \"Supplementary Information by Command\") not in this source."
  - "eco mode / aspect enum value tables not in this source."
  - "exact model name string and firmware version not stated."
  - "ID1/ID2 defaults, input-terminal/eco/aspect enum tables (referenced as Appendix, not in refined source), flow control, firmware version."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:56:39.994Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP Um351Wi WK Control Spec

## Summary
Sharp/NEC NP Um351Wi WK projector control spec covering the binary RS-232C and wired/wireless LAN (TCP) control interface documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1). Commands use a hex-byte frame format with ID1 (control ID), ID2 (model code), and a trailing checksum byte. The spec enumerates power, input switching, mute, picture/volume/aspect/gain adjust, lens control and memory, shutter, freeze, eco mode, edge blending, PIP/PbP, and a broad set of status/error/lamp/filter/information queries.

<!-- UNRESOLVED: exact model/firmware strings, flow control mode, ID1/ID2 default values, and input-terminal value tables (referenced only as "see Appendix") are not present in this refined source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists selectable: 115200/38400/19200/9600/4800; 9600 is one supported value
  baud_rates_supported: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  duplex: full
  flow_control: null  # UNRESOLVED: flow control mode not stated in source (RTS/CTS pins present but config not specified)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many status/error/information request commands present
  - routable     # inferred: INPUT SW CHANGE and audio select routing commands present
  - levelable    # inferred: PICTURE ADJUST, VOLUME ADJUST, OTHER ADJUST, LENS CONTROL present
```

## Actions
```yaml
# Frame: commands are hex bytes; <ID1> <ID2> are control/model IDs inserted by controller;
# trailing byte is checksum (low byte of sum of all preceding bytes).
# Fixed commands below include the precomputed checksum as last byte (verifiable: sum of bytes mod 256).

- id: cmd_009_error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: cmd_015_power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: While powering on, no other command is accepted.

- id: cmd_016_power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: During power-off (incl. cooling time), no other command is accepted.

- id: cmd_018_input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal value (e.g. 06h = video port). See Appendix 'Supplementary Information by Command' for full table."
  notes: Example (video port): 02h 03h 00h 00h 02h 01h 06h 0Eh

- id: cmd_020_picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Turned off by input/video signal switch.

- id: cmd_021_picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: cmd_022_sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: Turned off by input/video signal switch or volume adjustment.

- id: cmd_023_sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: cmd_024_onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: Turned off by input/video signal switch.

- id: cmd_025_onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: cmd_030_1_picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: byte
      description: Adjustment value (high-order 8 bits)
  notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Example brightness=-10: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch"

- id: cmd_030_2_volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: byte
      description: Adjustment value (high-order 8 bits)
  notes: Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h

- id: cmd_030_12_aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Value set for the aspect. See Appendix 'Supplementary Information by Command'."

- id: cmd_030_15_other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target hi: 96h = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: byte
      description: "Adjustment target lo: FFh (with DATA01=96h)"
    - name: DATA03
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: cmd_037_information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals.

- id: cmd_037_3_filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined.

- id: cmd_037_4_lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: byte
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
  notes: Eco mode values reflect eco mode. Negative remaining life if replacement deadline exceeded. Example (lamp1 usage): 03h 96h 00h 00h 02h 00h 01h 9Ch

- id: cmd_037_6_carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999).

- id: cmd_050_remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Key code low byte (WORD type). See key code list."
    - name: DATA02
      type: byte
      description: "Key code high byte. See key code list."
  notes: "Key code list (DATA01/DATA02): 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO. Example (AUTO): 02h 0Fh 00h 00h 02h 05h 00h 18h"

- id: cmd_051_shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: cmd_052_shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: cmd_053_lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Target: 06h=Periphery Focus"
    - name: DATA02
      type: byte
      description: "Content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"
  notes: After 7Fh/81h, send 00h to stop. Re-issuing same command drives lens without stop.

- id: cmd_053_1_lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Target: 06h=Periphery Focus"
  notes: Returns upper/lower limit and current value (16-bit each).

- id: cmd_053_2_lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Target (FFh=Stop)"
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: byte
      description: Adjustment value (high-order 8 bits)
  notes: If DATA01=FFh (Stop), mode/value not referenced.

- id: cmd_053_3_lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: cmd_053_4_reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: Controls profile number set via cmd_053_10.

- id: cmd_053_5_lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: Returns setting value 00h=OFF, 01h=ON.

- id: cmd_053_6_lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: byte
      description: "Setting value: 00h=OFF, 01h=ON"

- id: cmd_053_7_lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) (0=Stop, 1=During operation)."

- id: cmd_053_10_lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: cmd_053_11_lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: Returns profile number 00h=Profile 1, 01h=Profile 2.

- id: cmd_060_1_gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Returns status, upper/lower limits, default, current value, wide/narrow adjustment widths. Example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

- id: cmd_078_1_setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type (DATA01-03), sound function (DATA04), profile number (DATA05).

- id: cmd_078_2_running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06)."

- id: cmd_078_3_input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: Returns signal switch process, signal list number, selection signal types, test pattern, content displayed.

- id: cmd_078_4_mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display.

- id: cmd_078_5_model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: Returns model name string (NUL-terminated).

- id: cmd_078_6_cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns 00h=Normal (cover opened), 01h=Cover closed."

- id: cmd_079_freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "01h=freeze on, 02h=freeze off"

- id: cmd_084_information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"
  notes: Returns label/info string (NUL-terminated).

- id: cmd_097_8_eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns eco mode value (Light mode or Lamp mode depending on projector).

- id: cmd_097_45_lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: Returns projector name (NUL-terminated, up to 17 bytes).

- id: cmd_097_155_lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: Returns MAC address (6 bytes).

- id: cmd_097_198_pip_picture_by_picture_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  notes: Mode values 00h=PIP, 01h=PICTURE BY PICTURE. Start position 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT.

- id: cmd_097_243_1_edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns 00h=OFF, 01h=ON."

- id: cmd_098_8_eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Value set for eco mode. See Appendix 'Supplementary Information by Command'."

- id: cmd_098_45_lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: DATA01-16
      type: string
      description: Projector name (up to 16 bytes)

- id: cmd_098_198_pip_picture_by_picture_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: byte
      description: "Setting value (mode/position/sub-input per DATA01). See Appendix for sub-input values."

- id: cmd_098_243_1_edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Setting value: 00h=OFF, 01h=ON"

- id: cmd_305_1_base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: Returns base model type and model name string.

- id: cmd_305_2_serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: Returns serial number string (NUL-terminated, up to 16 bytes).

- id: cmd_305_3_basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status.

- id: cmd_319_10_audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal. See Appendix 'Supplementary Information by Command'."
    - name: DATA02
      type: byte
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Ack/error frame for all commands: A{cmd_hi}h {cmd_lo}h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# Success (no data): 2{cmd_hi}h {cmd_lo}h <ID1> <ID2> 00h <CKS>
# Success (with data): 2{cmd_hi}h {cmd_lo}h <ID1> <ID2> {LEN} <DATA..> <CKS>  (or 20h/23h prefix per command class)

- id: error_status
  type: bitfield
  description: "Error status from cmd_009. DATA01-12 bitfields: cover/fan/temperature/power/lamp errors, lamp usage limits, formatter/FPGA/mirror-cover errors, foreign-matter sensor, interlock switch, system errors."

- id: power_state
  type: enum
  description: "From cmd_078_2 DATA03: 00h=Standby, 01h=Power on, FFh=Not supported"

- id: operation_status
  type: enum
  description: "From cmd_078_2 DATA06: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

- id: mute_state
  type: composite
  description: "From cmd_078_4: picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each 00h=Off/01h=On)"

- id: cover_state
  type: enum
  values: [normal_open, closed]

- id: lens_operation_state
  type: bitfield
  description: "From cmd_053_7 DATA01: lens memory, zoom, focus, lens shift H/V operation flags"

- id: lamp_info
  type: composite
  description: "From cmd_037_4: lamp usage time (seconds), lamp remaining life (%)"

- id: gain_parameter
  type: composite
  description: "From cmd_060_1: status, upper/lower limits, default, current value, adjustment widths"

# UNRESOLVED: full enumerated enum value lists for eco mode and input-terminal tables not in source (referenced as Appendix)
```

## Variables
```yaml
- id: brightness
  type: integer
  description: Picture brightness (cmd_030_1 DATA01=00h); absolute or relative.
- id: contrast
  type: integer
  description: Picture contrast (cmd_030_1 DATA01=01h).
- id: color
  type: integer
  description: Picture color (cmd_030_1 DATA01=02h).
- id: hue
  type: integer
  description: Picture hue (cmd_030_1 DATA01=03h).
- id: sharpness
  type: integer
  description: Picture sharpness (cmd_030_1 DATA01=04h).
- id: volume
  type: integer
  description: Sound volume (cmd_030_2).
- id: aspect
  type: enum
  description: Aspect value (cmd_030_12). UNRESOLVED: enum values referenced as Appendix, not in source.
- id: lamp_light_adjust
  type: integer
  description: Lamp/Light adjust gain (cmd_030_15 DATA01=96h).
- id: eco_mode
  type: enum
  description: Eco/Light/Lamp mode (cmd_098_8). UNRESOLVED: enum values referenced as Appendix, not in source.
- id: projector_name
  type: string
  description: LAN projector name, up to 16 bytes (cmd_098_45).
- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: Edge blending on/off (cmd_098_243_1).
```

## Events
```yaml
# No unsolicited notifications documented. Device responds only to commands.
# UNRESOLVED: no event/notification mechanism described in source.
```

## Macros
```yaml
# No multi-step sequences explicitly documented.
# UNRESOLVED: populate from source, or remove section if not applicable.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: no other command accepted while power-on in progress."
  - "POWER OFF: no other command accepted during power-off including cooling time."
  - "cmd_009 error status includes interlock switch open (DATA09 Bit1) and cover errors."
# UNRESOLVED: no explicit power-on sequencing procedure or safety interlock steps stated in source beyond command-acceptance notes.
```

## Notes
- Command frame is hex bytes; response prefix is 20h/22h/23h (success, with class byte = command's first byte ORed), error prefix is A0h/A2h/A3h. `<ID1>` = control ID set on projector, `<ID2>` = model code (varies by model).
- Checksum = low-order byte of the sum of all preceding bytes. Verified example: `20h 81h 01h 60h 01h 00h` → sum=103h → CKS=03h.
- Baud rate is selectable among 4800/9600/19200/38400/115200; controller and projector must match. `baud_rate: 9600` is one valid selection, not a fixed default.
- Error codes (ERR1/ERR2): 00h/00h=unrecognized command, 00h/01h=not supported by model, 01h/00h=invalid value, 01h/01h=invalid input terminal, 02h/0Dh=power off, 02h/0Eh=execution failed, 02h/0Fh=no authority, etc.
- Pin assignment for PC CONTROL (D-SUB 9P): 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS (cross cable).
- LAN: RJ-45, 10/100 Mbps auto-sensing, TCP port 7142.

<!-- UNRESOLVED: ID1 (control ID) default value not stated. -->
<!-- UNRESOLVED: ID2 (model code) for NP Um351Wi WK not stated. -->
<!-- UNRESOLVED: input-terminal value table (Appendix "Supplementary Information by Command") not in this source. -->
<!-- UNRESOLVED: eco mode / aspect enum value tables not in this source. -->
<!-- UNRESOLVED: exact model name string and firmware version not stated. -->
```

53 actions, all hex payloads verbatim. Gaps marked UNRESOLVED: ID1/ID2 defaults, input-terminal/eco/aspect enum tables (referenced as Appendix, not in refined source), flow control, firmware version.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:40:27.163Z
last_checked_at: 2026-06-18T08:56:39.994Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:56:39.994Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model/firmware strings, flow control mode, ID1/ID2 default values, and input-terminal value tables (referenced only as \"see Appendix\") are not present in this refined source."
- "flow control mode not stated in source (RTS/CTS pins present but config not specified)"
- "full enumerated enum value lists for eco mode and input-terminal tables not in source (referenced as Appendix)"
- "enum values referenced as Appendix, not in source."
- "no event/notification mechanism described in source."
- "populate from source, or remove section if not applicable."
- "no explicit power-on sequencing procedure or safety interlock steps stated in source beyond command-acceptance notes."
- "ID1 (control ID) default value not stated."
- "ID2 (model code) for NP Um351Wi WK not stated."
- "input-terminal value table (Appendix \"Supplementary Information by Command\") not in this source."
- "eco mode / aspect enum value tables not in this source."
- "exact model name string and firmware version not stated."
- "ID1/ID2 defaults, input-terminal/eco/aspect enum tables (referenced as Appendix, not in refined source), flow control, firmware version."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
