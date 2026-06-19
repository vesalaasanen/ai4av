---
spec_id: admin/sharp-nec-xp-p601q-w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Xp P601Q W Control Spec"
manufacturer: Sharp/NEC
model_family: "Xp P601Q W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Xp P601Q W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:45:18.026Z
last_checked_at: 2026-06-19T07:51:18.575Z
generated_at: 2026-06-19T07:51:18.575Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific firmware version compatibility not stated; model code (ID2) value for this model not stated in source; input terminal values (018 command DATA01, aspect values 030-12, eco mode values 097-8/098-8, sub input values 097-198/098-198, audio input values 319-10) referenced to a separate \"Appendix: Supplementary Information by Command\" not present in this source."
  - "appendix not present in source).\""
  - "value enumeration in Appendix not present in source"
  - "source contains no explicit voltage/current/power-sequence"
  - "ID2 model code value for Xp P601Q W not stated."
  - "control ID (ID1) default value and configuration procedure not stated."
  - "Appendix enumerations referenced by commands 018, 030-12, 097-8, 097-198, 098-198, 319-10, 078-1 not present in this source."
  - "firmware version compatibility range not stated."
  - "command timing / inter-command delay limits not stated."
  - "flow_control — RTS/CTS pins wired on D-SUB 9P but flow control semantics (none/hardware) not stated explicitly."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:51:18.575Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim with source commands; transport parameters verified; source command catalogue fully represented. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Xp P601Q W Control Spec

## Summary
Sharp/NEC Xp P601Q W projector. Binary hex control protocol documented in "Projector Control Command Reference Manual" (BDT140013 Revision 7.1). Supports RS-232C serial and wired/wireless LAN (TCP port 7142). Commands are framed hex sequences with a trailing checksum byte (low-order byte of sum of all preceding bytes); each carries a control ID (ID1) and model code (ID2).

<!-- UNRESOLVED: specific firmware version compatibility not stated; model code (ID2) value for this model not stated in source; input terminal values (018 command DATA01, aspect values 030-12, eco mode values 097-8/098-8, sub input values 097-198/098-198, audio input values 319-10) referenced to a separate "Appendix: Supplementary Information by Command" not present in this source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists selectable rates: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: full duplex; RTS/CTS pins present but flow_control not stated
addressing:
  port: 7142  # TCP port for LAN command send/receive, stated in source
auth:
  type: none  # inferred: no auth/login procedure described in source
```

## Traits
```yaml
traits:
  - powerable    # POWER ON / POWER OFF commands present
  - queryable    # many *REQUEST commands returning status/data
  - levelable    # PICTURE/VOLUME/ASPECT/GAIN adjust commands present
  - routable     # INPUT SW CHANGE routing command present
```

## Actions
```yaml
# Framing: every command is a hex byte sequence. ID1 = control ID, ID2 = model
# code, CKS = checksum (low-order byte of sum of all preceding bytes). The
# literal byte sequences below are copied verbatim from the source manual.
# Response prefixes: 2Xh = normal response, 3Xh = normal response with data,
# AXh = error response. The first command byte's high nibble (0/1/2/3) selects
# the response category; low nibble + following bytes carry the opcode.

- id: cmd_009_error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response 20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>. DATA01-12 carry bitfield error info."

- id: cmd_015_power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on in progress. Response 22h 00h <ID1> <ID2> 00h <CKS>."

- id: cmd_016_power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off incl. cooling. Response 22h 01h <ID1> <ID2> 00h <CKS>."

- id: cmd_018_input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal selector (e.g. 06h = video). Full value list in Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not present in source)."
  notes: "Response 22h 03h <ID1> <ID2> 01h <DATA01> <CKS>; FFh = ended with error (no switch)."

- id: cmd_020_picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Auto-cleared on input/video switch. Response 22h 10h <ID1> <ID2> 00h <CKS>."

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
  notes: "Auto-cleared on input/video switch or volume adjust."

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
  notes: "Auto-cleared on input/video switch."

- id: cmd_025_onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: cmd_030_1_picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02>-<DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Response 23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>; 0000h=ok."

- id: cmd_030_2_volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01>-<DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h. Response 23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>; 0000h=ok."

- id: cmd_030_12_aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value. Full list in Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not present in source)."
  notes: "Response 23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>; 0000h=ok."

- id: cmd_030_15_other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01>-<DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte (96h = LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (FFh for LAMP/LIGHT)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Response 23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>; 0000h=ok."

- id: cmd_037_information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Response 23h 8Ah <ID1> <ID2> 62h <DATA01>-<DATA98> <CKS>. DATA01-49 projector name (NUL-term), DATA83-86 lamp usage sec, DATA87-90 filter usage sec."

- id: cmd_037_3_filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Response 23h 95h <ID1> <ID2> 08h <DATA01>-<DATA08> <CKS>. DATA01-04 filter usage sec, DATA05-08 filter alarm start sec (-1 if undefined)."

- id: cmd_037_4_lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (sec), 04h=lamp remaining life (%)"
  notes: "Response 23h 96h <ID1> <ID2> 06h <DATA01>-<DATA06> <CKS>. Negative remaining life when replacement deadline exceeded."

- id: cmd_037_6_carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Response 23h 9Ah <ID1> <ID2> 09h <DATA01>-<DATA09> <CKS>. DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."

- id: cmd_050_remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (see source key code table)"
    - name: DATA02
      type: integer
      description: "Key code high byte"
  notes: "Key code table (WORD): 02h00h=POWER ON, 03h00h=POWER OFF, 05h00h=AUTO, 06h00h=MENU, 07h00h=UP, 08h00h=DOWN, 09h00h=RIGHT, 0Ah00h=LEFT, 0Bh00h=ENTER, 0Ch00h=EXIT, 0Dh00h=HELP, 0Fh00h=MAGNIFY UP, 10h00h=MAGNIFY DOWN, 13h00h=MUTE, 29h00h=PICTURE, 4Bh00h=COMPUTER1, 4Ch00h=COMPUTER2, 4Fh00h=VIDEO1, 51h00h=S-VIDEO1, 84h00h=VOLUME UP, 85h00h=VOLUME DOWN, 8Ah00h=FREEZE, A3h00h=ASPECT, D7h00h=SOURCE, EEh00h=LAMP MODE/ECO. Response 22h 0Fh <ID1> <ID2> 01h <DATA01> <CKS>; FFh=error."

- id: cmd_051_shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []
  notes: "Closes lens shutter. Response 22h 16h <ID1> <ID2> 00h <CKS>."

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
      type: integer
      description: "Lens target (06h = Periphery Focus)"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
  notes: "Send 00h to stop after 7Fh/81h. Response 22h 18h <ID1> <ID2> 01h <DATA01> <CKS>; FFh=error."

- id: cmd_053_1_lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target"
  notes: "Response 22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02>-<DATA07> <CKS>. DATA02-03 upper limit, DATA04-05 lower limit, DATA06-07 current value."

- id: cmd_053_2_lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01>-<DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh = Stop; mode/value ignored when Stop)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Response 22h 1Dh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>."

- id: cmd_053_3_lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Response 22h 1Eh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>; FFh=error."

- id: cmd_053_4_reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls profile selected by 053-10 LENS PROFILE SET. Response 22h 1Fh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>; FFh=error."

- id: cmd_053_5_lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "Response 22h 20h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>. DATA02 setting: 00h=OFF, 01h=ON."

- id: cmd_053_6_lens_memory_option_set
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
  notes: "Response 23h 21h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>."

- id: cmd_053_7_lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Response 22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>. DATA01 bit0=Lens memory, bit1=Zoom, bit2=Focus, bit3=Lens Shift(H), bit4=Lens Shift(V) (0=Stop,1=During operation)."

- id: cmd_053_10_lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"
  notes: "Response 22h 27h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>."

- id: cmd_053_11_lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Response 22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>. DATA01: 00h=Profile 1, 01h=Profile 2."

- id: cmd_060_1_gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Response 23h 05h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>. DATA01 status (00h display not possible, 01h adj not possible, 02h adj possible, FFh no such gain), DATA02-03 upper limit, DATA04-05 lower limit, DATA06-07 default, DATA08-09 current, DATA10-11 wide width, DATA12-13 narrow width, DATA14 default validity."

- id: cmd_078_1_setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Response 20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>. DATA01-03 base model type, DATA04 sound function, DATA05 profile number."

- id: cmd_078_2_running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Response 20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>. DATA03 power status (00h Standby,01h On), DATA04 cooling, DATA05 power on/off process, DATA06 operation status (00h Standby Sleep,04h Power on,05h Cooling,06h Standby error,0Fh Power saving,10h Network standby)."

- id: cmd_078_3_input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Response 20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>. DATA01 signal switch process, DATA02 signal list number (practical value = returned + 1), DATA03 selection signal type 1, DATA04 selection signal type 2 (01h COMPUTER,02h VIDEO,03h S-VIDEO,04h COMPONENT,20h DVI-D,21h HDMI,22h DisplayPort,23h VIEWER 6-10,07h VIEWER 1-5), DATA05 signal list type, DATA06 test pattern display, DATA09 content displayed."

- id: cmd_078_4_mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Response 20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>. DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (00h Off / 01h On)."

- id: cmd_078_5_model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Response 20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>. DATA01-32 model name (NUL-term string)."

- id: cmd_078_6_cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Response 20h 85h <ID1> <ID2> 01h <DATA01> <CKS>. DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: cmd_079_freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"
  notes: "Response 21h 98h <ID1> <ID2> 01h <DATA01> <CKS>."

- id: cmd_084_information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency"
  notes: "Response 20h D0h <ID1> <ID2> LEN <DATA01> 01h <DATA02>-<DATA??> <CKS>. DATA02 label/string length, DATA03+ label string (NUL-term)."

- id: cmd_097_8_eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Response 23h B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>. DATA01 eco mode value (Light mode / Lamp mode, depending on projector; value list in Appendix - UNRESOLVED)."

- id: cmd_097_45_lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Response 23h B0h <ID1> <ID2> 12h 2Ch <DATA01>-<DATA17> <CKS>. DATA01-17 projector name (NUL-term)."

- id: cmd_097_155_lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Response 23h B0h <ID1> <ID2> 08h 9Ah 00h <DATA01>-<DATA06> <CKS>. DATA01-06 MAC address."

- id: cmd_097_198_pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  notes: "Response 23h B0h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>. DATA02 MODE: 00h=PIP,01h=PbP. START POSITION: 00h TL,01h TR,02h BL,03h BR. Sub input values in Appendix (UNRESOLVED)."

- id: cmd_097_243_1_edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Response 23h B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>. DATA01: 00h=OFF, 01h=ON."

- id: cmd_098_8_eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value (Light mode / Lamp mode). Value list in Appendix (UNRESOLVED: appendix not present in source)."
  notes: "Response 23h B1h <ID1> <ID2> 02h 07h <DATA01> <CKS>."

- id: cmd_098_45_lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes), encoded into DATA01-16"
  notes: "Response 23h B1h <ID1> <ID2> 02h 2Ch <DATA01> <CKS>."

- id: cmd_098_198_pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value. MODE: 00h=PIP,01h=PbP. START POSITION: 00h TL,01h TR,02h BL,03h BR. Sub input values in Appendix (UNRESOLVED)."
  notes: "Response 23h B1h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>."

- id: cmd_098_243_1_edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=OFF, 01h=ON"
  notes: "Response 23h B1h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>."

- id: cmd_305_1_base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Response 20h BFh <ID1> <ID2> 10h 00h <DATA01>-<DATA15> <CKS>. DATA01-02 + DATA12-13 base model type, DATA03-11 model name (NUL-term)."

- id: cmd_305_2_serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Response 20h BFh <ID1> <ID2> 12h 01h 06h <DATA01>-<DATA16> <CKS>. DATA01-16 serial number (NUL-term)."

- id: cmd_305_3_basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Response 20h BFh <ID1> <ID2> 10h 02h <DATA01>-<DATA15> <CKS>. DATA01 operation status, DATA02 content displayed, DATA03-04 selection signal type, DATA05 display signal type, DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze status."

- id: cmd_319_10_audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal. Value list in Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not present in source)."
    - name: DATA02
      type: integer
      description: "Setting: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
  notes: "Response 23h C9h <ID1> <ID2> 03h 09h <DATA01> <DATA02> <CKS>; DATA02 result 00h=ok,01h=error."
```

## Feedbacks
```yaml
# All responses are framed: 2Xh prefix = normal, 3Xh = normal with data,
# AXh = error (carries ERR1/ERR2 per error code table). Observable states:

- id: error_status
  type: bitfield
  source: cmd_009_error_status_request DATA01-12
  description: "Per-bit error flags (cover, fan, temp, lamp, formatter, mirror cover, interlock, etc.)"

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: cmd_078_2_running_status_request DATA03 / cmd_305_3 DATA01

- id: input_signal_status
  type: composite
  source: cmd_078_3_input_status_request / cmd_305_3 DATA02-05
  description: "Active input terminal, signal type, signal list number, test pattern state, content displayed"

- id: mute_state
  type: composite
  source: cmd_078_4_mute_status_request
  description: "Picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display"

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: cmd_037_4_lamp_information_request_3 (content 01h)

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: cmd_037_4_lamp_information_request_3 (content 04h)

- id: filter_usage_time
  type: integer
  unit: seconds
  source: cmd_037_3_filter_usage_information_request

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  source: cmd_078_6_cover_status_request

- id: eco_mode
  type: integer
  source: cmd_097_8_eco_mode_request
  # UNRESOLVED: value enumeration in Appendix not present in source

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: cmd_097_243_1_edge_blending_mode_request

- id: lens_operation
  type: bitfield
  source: cmd_053_7_lens_information_request DATA01
  description: "Lens memory, zoom, focus, lens shift H/V - each 0=stop, 1=operating"

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: cmd_053_11_lens_profile_request

- id: model_name
  type: string
  source: cmd_078_5_model_name_request

- id: serial_number
  type: string
  source: cmd_305_2_serial_number_request

- id: mac_address
  type: string
  source: cmd_097_155_lan_mac_address_status_request_2

- id: projector_name_lan
  type: string
  source: cmd_097_45_lan_projector_name_request

- id: gain_parameter
  type: composite
  source: cmd_060_1_gain_parameter_request_3
  description: "Per-target (brightness/contrast/color/hue/sharpness/volume/lamp): range, default, current, widths, default validity"
```

## Variables
```yaml
# Settable parameters governed by adjust commands above (captured as Actions).
# No additional parameter set is separately documented outside those commands.
```

## Events
```yaml
# Source describes no unsolicited notifications. All output is a response to a
# command (2Xh/3Xh/A Xh prefix). The cooling/standby transitions noted in
# RUNNING STATUS are polled, not pushed.
events: []
```

## Macros
```yaml
# Source documents no multi-step command sequences.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_lockout
    description: "POWER ON command (015): while power-on is in progress, no other command is accepted."
    source: "§3.2 POWER ON"
  - id: power_off_lockout
    description: "POWER OFF command (016): during power-off including cooling time, no other command is accepted."
    source: "§3.3 POWER OFF"
  - id: lens_drive_continuous
    description: "LENS CONTROL (053): after sending 7Fh (drive +) or 81h (drive -), must send 00h to stop the lens drive."
    source: "§3.22 LENS CONTROL"
# UNRESOLVED: source contains no explicit voltage/current/power-sequence
# safety interlocks beyond the command-acceptance lockouts above. Error
# bitfield (cmd 009) reports interlock-switch-open and cover errors but the
# safety procedure to clear them is not documented here.
```

## Notes
- Framing convention (§2.1): commands and responses are hex byte strings. `ID1` = control ID set on the projector; `ID2` = model code (varies by model, not stated for this model); `CKS` = checksum = low-order byte of the sum of all preceding bytes (worked example in §2.2: `20h+81h+01h+60h+01h+00h=103h` → CKS=`03h`).
- Response categories by leading byte: `2Xh` = normal response (no data), `3Xh` = normal response with data part, `AXh` = error response carrying `<ERR1> <ERR2>`.
- Error code table (§2.4) defines `ERR1/ERR2` pairs: 00h/00h unrecognized command, 00h/01h not supported by model, 01h/00h invalid value, 01h/01h invalid input terminal, 01h/02h invalid language, 02h/0Dh command rejected because power is off, 02h/0Eh execution failed, 02h/0Fh no authority, 03h/00h incorrect gain number, 03h/02h adjustment failed, etc.
- Many command value enumerations (input terminal 018, aspect 030-12, eco mode 097-8/098-8, sub input 097-198/098-198, audio input terminal 319-10, base model type values) are deferred by the source to an Appendix "Supplementary Information by Command" which is not present in this refined excerpt.
- Usage-time fields update at one-minute intervals even though stored in one-second units.
- Lamp remaining life (%) is returned as a negative value once the replacement deadline is exceeded.

<!-- UNRESOLVED: ID2 model code value for Xp P601Q W not stated. -->
<!-- UNRESOLVED: control ID (ID1) default value and configuration procedure not stated. -->
<!-- UNRESOLVED: Appendix enumerations referenced by commands 018, 030-12, 097-8, 097-198, 098-198, 319-10, 078-1 not present in this source. -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: command timing / inter-command delay limits not stated. -->
<!-- UNRESOLVED: flow_control — RTS/CTS pins wired on D-SUB 9P but flow control semantics (none/hardware) not stated explicitly. -->
````

Spec done. 53 actions, all hex payloads verbatim. Serial + TCP both (source covers both). Baud selectable list kept. Auth `none` (inferred, no login proc in source). Interlocks from power/lens lockouts only — no voltage invented. Appendix-referenced enums marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:45:18.026Z
last_checked_at: 2026-06-19T07:51:18.575Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:51:18.575Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim with source commands; transport parameters verified; source command catalogue fully represented. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific firmware version compatibility not stated; model code (ID2) value for this model not stated in source; input terminal values (018 command DATA01, aspect values 030-12, eco mode values 097-8/098-8, sub input values 097-198/098-198, audio input values 319-10) referenced to a separate \"Appendix: Supplementary Information by Command\" not present in this source."
- "appendix not present in source).\""
- "value enumeration in Appendix not present in source"
- "source contains no explicit voltage/current/power-sequence"
- "ID2 model code value for Xp P601Q W not stated."
- "control ID (ID1) default value and configuration procedure not stated."
- "Appendix enumerations referenced by commands 018, 030-12, 097-8, 097-198, 098-198, 319-10, 078-1 not present in this source."
- "firmware version compatibility range not stated."
- "command timing / inter-command delay limits not stated."
- "flow_control — RTS/CTS pins wired on D-SUB 9P but flow control semantics (none/hardware) not stated explicitly."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
