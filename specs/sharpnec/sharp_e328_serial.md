---
spec_id: admin/sharp-nec-e328
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC E328 Control Spec"
manufacturer: Sharp/NEC
model_family: E328
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - E328
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-19T01:20:24.930Z
last_checked_at: 2026-06-19T07:42:21.887Z
generated_at: 2026-06-19T07:42:21.887Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value for E328 not stated in this manual — varies by model"
  - "input terminal value table, aspect value table, eco mode value table, base model type value table, sub input value table all live in an \"Appendix: Supplementary Information by Command\" not present in this source"
  - "no multi-step sequences explicitly described in source."
  - "no power-on sequencing / voltage interlock procedures in this manual."
  - "E328 model code (ID2) byte value not in source"
  - "input terminal DATA01 value table for 018/319-10 (Appendix missing)"
  - "aspect DATA01 value table for 030-12 (Appendix missing)"
  - "eco mode DATA01 value table for 097-8/098-8 (Appendix missing)"
  - "base model type value table for 078-1/305-1 (Appendix missing)"
  - "sub input value table for 097-198/098-198 (Appendix missing)"
  - "firmware version compatibility not stated"
  - "053 LENS CONTROL DATA01 full target table (only 06h=Periphery Focus row shown)"
verification:
  verdict: verified
  checked_at: 2026-06-19T07:42:21.887Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match literal hex commands in source §3 command details; transport parameters verified in §1.2 Communication conditions. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-19
---

# Sharp/NEC E328 Control Spec

## Summary
Sharp/NEC E328 projector controlled via RS-232C (PC CONTROL D-SUB 9P) or wired/wireless LAN. Binary command protocol with hex framing, checksum byte, and fixed response frames. Manual BDT140013 Rev 7.1 documents 53 commands spanning power, input switching, mutes, picture/volume/aspect/lamp adjustment, lens & lens memory control, eco/PIP/edge-blend set, and many status queries.

<!-- UNRESOLVED: model code (ID2) value for E328 not stated in this manual — varies by model -->
<!-- UNRESOLVED: input terminal value table, aspect value table, eco mode value table, base model type value table, sub input value table all live in an "Appendix: Supplementary Information by Command" not present in this source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 - pick per device config
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: full_duplex  # source: "Communication mode: Full duplex"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF
  - routable     # inferred: 018 INPUT SW CHANGE
  - queryable    # inferred: extensive *REQUEST command set
  - levelable    # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST / 030-15 OTHER ADJUST
```

## Actions
```yaml
# Framing: commands shown are the literal payload from projector's perspective
# (byte 0 = command class, includes checksum CKS). Responses prefixed 2xh/Axh
# echo <ID1>=control ID and <ID2>=model code. CKS = low byte of sum of all
# preceding bytes. Parameterized DATA bytes shown as <DATAxx>.

- id: error_status_request_009
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  response: "20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>"
  notes: "DATA01-12 = 12-byte error bitmap. See source error list (cover/fan/temp/lamp/lens/etc)."

- id: power_on_015
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  response: "22h 00h <ID1> <ID2> 00h <CKS> / A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: "No other command accepted while power-on in progress."

- id: power_off_016
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  response: "22h 01h <ID1> <ID2> 00h <CKS> / A2h 01h ..."
  notes: "No other command accepted during power-off incl. cooling time."

- id: input_sw_change_018
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal value (e.g. 06h=video). Full table in Appendix - UNRESOLVED."
  response: "22h 03h <ID1> <ID2> 01h <DATA01> <CKS> (FFh=error)"
  notes: "Example for video port: 02h 03h 00h 00h 02h 01h 06h 0Eh"

- id: picture_mute_on_020
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input/video switch."

- id: picture_mute_off_021
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on_022
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Cleared by input/video switch or volume adjustment."

- id: sound_mute_off_023
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on_024
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: "Cleared by input/video switch."

- id: onscreen_mute_off_025
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust_030_1
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: byte
      description: "Mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: byte
      description: "Adjustment value (low 8 bits)"
    - name: DATA04
      type: byte
      description: "Adjustment value (high 8 bits)"
  response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS> (0000h=success)"
  notes: "Brightness=10 example: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: volume_adjust_030_2
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: byte
      description: "Value (low 8 bits)"
    - name: DATA03
      type: byte
      description: "Value (high 8 bits)"
  response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
  notes: "Vol=10 example: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust_030_12
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Aspect value. Full table in Appendix - UNRESOLVED."
  response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: other_adjust_030_15
  label: "030-15. OTHER ADJUST (LAMP/LIGHT)"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Target high byte (96h for LAMP/LIGHT ADJUST)"
    - name: DATA02
      type: byte
      description: "Target low byte (FFh for LAMP/LIGHT ADJUST)"
    - name: DATA03
      type: byte
      description: "Mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: byte
      description: "Value (low 8 bits)"
    - name: DATA05
      type: byte
      description: "Value (high 8 bits)"
  response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: information_request_037
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  response: "23h 8Ah <ID1> <ID2> 62h <DATA01>-<DATA98> <CKS>"
  notes: "DATA01-49 projector name, DATA83-86 lamp usage sec, DATA87-90 filter usage sec."

- id: filter_usage_info_request_037_3
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  response: "23h 95h <ID1> <ID2> 08h <DATA01>-<DATA08> <CKS>"
  notes: "DATA01-04 usage sec, DATA05-08 alarm start sec (-1 if undefined)."

- id: lamp_info_request_3_037_4
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: byte
      description: "01h=usage time sec, 04h=remaining life %"
  response: "23h 96h <ID1> <ID2> 06h <DATA01>-<DATA06> <CKS>"
  notes: "Lamp1 usage example: 03h 96h 00h 00h 02h 00h 01h 9Ch"

- id: carbon_savings_info_request_037_6
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=total, 01h=during operation"
  response: "23h 9Ah <ID1> <ID2> 09h <DATA01>-<DATA09> <CKS>"
  notes: "DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."

- id: remote_key_code_050
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Key code low byte (see key code list)"
    - name: DATA02
      type: byte
      description: "Key code high byte (always 00h in listed codes)"
  response: "22h 0Fh <ID1> <ID2> 01h <DATA01> <CKS> (FFh=error)"
  notes: "Key codes: POWER ON 02h, POWER OFF 03h, AUTO 05h, MENU 06h, UP 07h, DOWN 08h, RIGHT 09h, LEFT 0Ah, ENTER 0Bh, EXIT 0Ch, HELP 0Dh, MAGNIFY UP 0Fh, MAGNIFY DOWN 10h, MUTE 13h, PICTURE 29h, COMPUTER1 4Bh, COMPUTER2 4Ch, VIDEO1 4Fh, S-VIDEO1 51h, VOLUME UP 84h, VOLUME DOWN 85h, FREEZE 8Ah, ASPECT A3h, SOURCE D7h, LAMP MODE/ECO EEh."

- id: shutter_close_051
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open_052
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control_053
  label: "053. LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Lens target (06h=Periphery Focus per source row)"
    - name: DATA02
      type: byte
      description: "00h=Stop, 01h/+1s, 02h/+0.5s, 03h/+0.25s, 7Fh/plus, 81h/minus, FDh/-0.25s, FEh/-0.5s, FFh/-1s"
  response: "22h 18h <ID1> <ID2> 01h <DATA01> <CKS> (FFh=error)"

- id: lens_control_request_053_1
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Lens target"
  response: "22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02>-<DATA07> <CKS>"
  notes: "DATA02/03 upper limit, DATA04/05 lower limit, DATA06/07 current value."

- id: lens_control_2_053_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "FFh=Stop (mode/value ignored), else target"
    - name: DATA02
      type: byte
      description: "00h=absolute, 02h=relative"
    - name: DATA03
      type: byte
      description: "Value (low 8 bits)"
    - name: DATA04
      type: byte
      description: "Value (high 8 bits)"

- id: lens_memory_control_053_3
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  response: "22h 1Eh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS> (FFh=error)"

- id: reference_lens_memory_control_053_4
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  response: "22h 1Fh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS> (FFh=error)"
  notes: "Acts on profile set by 053-10 LENS PROFILE SET."

- id: lens_memory_option_request_053_5
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  response: "22h 20h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS> (DATA02: 00h=OFF, 01h=ON)"

- id: lens_memory_option_set_053_6
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: byte
      description: "00h=OFF, 01h=ON"
  response: "23h 21h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: lens_information_request_053_7
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  response: "22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>"
  notes: "DATA01 bitmap: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift(H), Bit4 Lens Shift(V); 0=Stop, 1=During operation."

- id: lens_profile_set_053_10
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=Profile 1, 01h=Profile 2"
  response: "22h 27h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: lens_profile_request_053_11
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  response: "22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS> (DATA01: 00h=Profile 1, 01h=Profile 2)"

- id: gain_parameter_request_3_060_1
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  response: "23h 05h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
  notes: "Brightness example: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. DATA02-13 limits/defaults/current/widths, DATA14 default validity."

- id: setting_request_078_1
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  response: "20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>"
  notes: "DATA01-03 base model type, DATA04 sound fn (00h=none,01h=avail), DATA05 profile/clock/sleep."

- id: running_status_request_078_2
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
  notes: "DATA03 power (00h=Standby,01h=On,FFh=N/S), DATA04 cooling, DATA05 power process, DATA06 op status (00h/04h/05h/06h/0Fh/10h)."

- id: input_status_request_078_3
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
  notes: "DATA01 signal switch, DATA02 list num (off-by-one), DATA03/04 signal type, DATA05 list type, DATA06 test pattern, DATA09 content."

- id: mute_status_request_078_4
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
  notes: "DATA01 pic mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 OSD."

- id: model_name_request_078_5
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  response: "20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>"
  notes: "DATA01-32 model name NUL-terminated."

- id: cover_status_request_078_6
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  response: "20h 85h <ID1> <ID2> 01h <DATA01> <CKS>"
  notes: "DATA01: 00h=Normal(opened), 01h=Cover closed."

- id: freeze_control_079
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "01h=freeze on, 02h=freeze off"
  response: "21h 98h <ID1> <ID2> 01h <DATA01> <CKS>"

- id: information_string_request_084
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "03h=Horizontal sync freq, 04h=Vertical sync freq"
  response: "20h D0h <ID1> <ID2> LEN <DATA01> 01h <DATA02>-<DATA??> <CKS>"

- id: eco_mode_request_097_8
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  response: "23h B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>"
  notes: "DATA01 eco value - table in Appendix (UNRESOLVED)."

- id: lan_projector_name_request_097_45
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  response: "23h B0h <ID1> <ID2> 12h 2Ch <DATA01>-<DATA17> <CKS>"
  notes: "DATA01-17 projector name NUL-terminated."

- id: lan_mac_address_request_097_155
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  response: "23h B0h <ID1> <ID2> 08h 9Ah 00h <DATA01>-<DATA06> <CKS>"
  notes: "DATA01-06 MAC address."

- id: pip_pbypic_request_097_198
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  response: "23h B0h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"

- id: edge_blending_mode_request_097_243_1
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  response: "23h B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS> (00h=OFF, 01h=ON)"

- id: eco_mode_set_098_8
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Eco mode value - table in Appendix (UNRESOLVED)"
  response: "23h B1h <ID1> <ID2> 02h 07h <DATA01> <CKS>"

- id: lan_projector_name_set_098_45
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name, up to 16 bytes"
  response: "23h B1h <ID1> <ID2> 02h 2Ch <DATA01> <CKS>"

- id: pip_pbypic_set_098_198
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: byte
      description: "Setting value (MODE: 00h=PIP,01h=PbP; POS: 00-03 corners; SUB INPUT: Appendix table UNRESOLVED)"
  response: "23h B1h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"

- id: edge_blending_mode_set_098_243_1
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=OFF, 01h=ON"
  response: "23h B1h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"

- id: base_model_type_request_305_1
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  response: "20h BFh <ID1> <ID2> 10h 00h <DATA01>-<DATA15> <CKS>"
  notes: "DATA01-02 / 12-13 base model type, DATA03-11 model name."

- id: serial_number_request_305_2
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  response: "20h BFh <ID1> <ID2> 12h 01h 06h <DATA01>-<DATA16> <CKS>"
  notes: "DATA01-16 serial number NUL-terminated."

- id: basic_information_request_305_3
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  response: "20h BFh <ID1> <ID2> 10h 02h <DATA01>-<DATA15> <CKS>"
  notes: "DATA01 op status, DATA02 content, DATA03/04 signal type, DATA05 video signal, DATA06-09 mutes/freeze."

- id: audio_select_set_319_10
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal (table in Appendix - UNRESOLVED)"
    - name: DATA02
      type: byte
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
  response: "23h C9h <ID1> <ID2> 03h 09h <DATA01> <DATA02> <CKS> (00h=ok, 01h=err)"
```

## Feedbacks
```yaml
# Each *REQUEST query above yields a binary response frame; observable states
# derived from those frames:
- id: error_status
  type: bitmap
  source_query: error_status_request_009
  description: "12-byte error bitmap (cover/fan/temp/lamp/lens/etc). See source."

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source_query: running_status_request_078_2
  description: "From 078-2 DATA03 + DATA06."

- id: input_signal
  type: string
  source_query: input_status_request_078_3
  description: "Signal list number + signal type combo."

- id: mute_state
  type: bitmap
  source_query: mute_status_request_078_4
  description: "Picture/Sound/Onscreen/Forced onscreen mute flags."

- id: lamp_usage_time
  type: integer
  unit: seconds
  source_query: lamp_info_request_3_037_4
  description: "Lamp usage seconds (updated 1-min intervals)."

- id: lamp_remaining_life
  type: integer
  unit: percent
  source_query: lamp_info_request_3_037_4
  description: "Negative if replacement deadline exceeded."

- id: filter_usage_time
  type: integer
  unit: seconds
  source_query: filter_usage_info_request_037_3

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source_query: basic_information_request_305_3
```

## Variables
```yaml
- id: brightness
  type: integer
  set_action: picture_adjust_030_1
  query_action: gain_parameter_request_3_060_1
  description: "030-1 target 00h; signed."

- id: contrast
  type: integer
  set_action: picture_adjust_030_1
  query_action: gain_parameter_request_3_060_1
  description: "030-1 target 01h."

- id: color
  type: integer
  set_action: picture_adjust_030_1
  query_action: gain_parameter_request_3_060_1
  description: "030-1 target 02h."

- id: hue
  type: integer
  set_action: picture_adjust_030_1
  query_action: gain_parameter_request_3_060_1
  description: "030-1 target 03h."

- id: sharpness
  type: integer
  set_action: picture_adjust_030_1
  query_action: gain_parameter_request_3_060_1
  description: "030-1 target 04h."

- id: volume
  type: integer
  set_action: volume_adjust_030_2
  query_action: gain_parameter_request_3_060_1
  description: "030-2; 060-1 target 05h."

- id: lamp_light_adjust
  type: integer
  set_action: other_adjust_030_15
  query_action: gain_parameter_request_3_060_1
  description: "030-15 DATA01=96h/02=FFh; 060-1 target 96h."

- id: eco_mode
  type: byte
  set_action: eco_mode_set_098_8
  query_action: eco_mode_request_097_8
  description: "Value table UNRESOLVED (Appendix)."

- id: projector_name
  type: string
  max_length: 16
  set_action: lan_projector_name_set_098_45
  query_action: lan_projector_name_request_097_45

- id: edge_blending_mode
  type: enum
  values: [off, on]
  set_action: edge_blending_mode_set_098_243_1
  query_action: edge_blending_mode_request_097_243_1
```

## Events
```yaml
# Source documents no unsolicited notifications. Device only replies to commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON (015): no other command accepted during power-on sequence."
  - "POWER OFF (016): no other command accepted during power-off including cooling time."
  - "Lens drive via 053 DATA02=7Fh/81h continuous: stop by sending DATA02=00h."
  - "Picture/Sound/Onscreen mute auto-cleared by input or video signal switch (see respective command notes)."
# UNRESOLVED: no power-on sequencing / voltage interlock procedures in this manual.
```

## Notes
- Manual revision: BDT140013 Rev 7.1. All commands expressed in hex.
- **Checksum (CKS)** = low-order byte of sum of all preceding bytes. Worked example in source: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`.
- **Framing**: commands start with class byte (`00h`=read-only query, `01h`/`02h`/`03h`=write/action). Successful response prefixes: `20h`/`21h`/`22h`/`23h` (echo DATA). Error response prefix: `A0h`/`A1h`/`A2h`/`A3h` (high bit set), carrying `<ERR1> <ERR2>`.
- **Error codes** (ERR1/ERR2): `00h/00h`=unrecognized, `00h/01h`=unsupported by model, `01h/00h`=invalid value, `01h/01h`=invalid input terminal, `02h/0Dh`=power off, `02h/0Eh`=exec failed, `02h/0Fh`=no authority, `03h/00h-02h`=gain errors. See source §2.4 for full 30-entry table.
- **ID2 (model code)** varies by model — not stated for E328 in this manual.
- **Appendix "Supplementary Information by Command"** (referenced for input terminal values, aspect values, eco mode values, base model types, sub input values) is **not present** in this refined source — those enums are UNRESOLVED.

<!-- UNRESOLVED: E328 model code (ID2) byte value not in source -->
<!-- UNRESOLVED: input terminal DATA01 value table for 018/319-10 (Appendix missing) -->
<!-- UNRESOLVED: aspect DATA01 value table for 030-12 (Appendix missing) -->
<!-- UNRESOLVED: eco mode DATA01 value table for 097-8/098-8 (Appendix missing) -->
<!-- UNRESOLVED: base model type value table for 078-1/305-1 (Appendix missing) -->
<!-- UNRESOLVED: sub input value table for 097-198/098-198 (Appendix missing) -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: 053 LENS CONTROL DATA01 full target table (only 06h=Periphery Focus row shown) -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-19T01:20:24.930Z
last_checked_at: 2026-06-19T07:42:21.887Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:42:21.887Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match literal hex commands in source §3 command details; transport parameters verified in §1.2 Communication conditions. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value for E328 not stated in this manual — varies by model"
- "input terminal value table, aspect value table, eco mode value table, base model type value table, sub input value table all live in an \"Appendix: Supplementary Information by Command\" not present in this source"
- "no multi-step sequences explicitly described in source."
- "no power-on sequencing / voltage interlock procedures in this manual."
- "E328 model code (ID2) byte value not in source"
- "input terminal DATA01 value table for 018/319-10 (Appendix missing)"
- "aspect DATA01 value table for 030-12 (Appendix missing)"
- "eco mode DATA01 value table for 097-8/098-8 (Appendix missing)"
- "base model type value table for 078-1/305-1 (Appendix missing)"
- "sub input value table for 097-198/098-198 (Appendix missing)"
- "firmware version compatibility not stated"
- "053 LENS CONTROL DATA01 full target table (only 06h=Periphery Focus row shown)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
