---
spec_id: admin/sharp-nec-e758
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC E758 Control Spec"
manufacturer: Sharp/NEC
model_family: E758
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - E758
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:05:28.964Z
last_checked_at: 2026-06-17T19:45:00.177Z
generated_at: 2026-06-17T19:45:00.177Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Model code (ID2) value not stated. Input terminal value list referenced to appendix not included in refined source."
  - "flow control not stated; full-duplex noted"
  - "no unsolicited notification documented in source. All responses are command-initiated."
  - "no explicit multi-step sequences documented in source."
  - "no explicit power-on sequencing or interlock procedure documented beyond command-acceptance notes."
  - "firmware version compatibility not stated. Model code (ID2) for E758 not stated. Default baud rate not stated. Flow control type not stated. Appendix tables (input terminal values, eco mode values, aspect values, sub-input values, base model types) not included in refined source. Wireless LAN unit details deferred to separate operation manual."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:45:00.177Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 actions matched exactly against source hex commands; transport parameters confirmed in specification sections. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC E758 Control Spec

## Summary
Sharp/NEC E758 projector. Control via RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN (TCP port 7142). Binary hex command protocol with checksum byte. Large command catalogue covering power, input switching, mute, picture/volume/aspect adjust, lens control + memory, eco mode, status queries, and information requests.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Model code (ID2) value not stated. Input terminal value list referenced to appendix not included in refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; full-duplex noted
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: multiple status/info request commands present
  - levelable    # inferred: picture/volume/gain adjust commands present
```

## Actions
```yaml
actions:
  - id: error_status_request_009
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h  88h  00h  00h  00h  88h"
    params: []
    notes: "Response carries DATA01-DATA12 error bitfield. 0=normal, 1=error."

  - id: power_on_015
    label: "015. POWER ON"
    kind: action
    command: "02h  00h  00h  00h  00h  02h"
    params: []
    notes: "No other command accepted while power-on in progress."

  - id: power_off_016
    label: "016. POWER OFF"
    kind: action
    command: "02h  01h  00h  00h  00h  03h"
    params: []
    notes: "No other command accepted during power-off incl. cooling time."

  - id: input_sw_change_018
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h  03h  00h  00h  02h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal value (e.g. 06h = video port). Full list in appendix 'Supplementary Information by Command'."
    notes: "Example: switch to video port => 02h 03h 00h 00h 02h 01h 06h 0Eh"

  - id: picture_mute_on_020
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h  10h  00h  00h  00h  12h"
    params: []
    notes: "Turned off by input/video switch."

  - id: picture_mute_off_021
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02h  11h  00h  00h  00h  13h"
    params: []

  - id: sound_mute_on_022
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02h  12h  00h  00h  00h  14h"
    params: []
    notes: "Turned off by input/video/volume change."

  - id: sound_mute_off_023
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02h  13h  00h  00h  00h  15h"
    params: []

  - id: onscreen_mute_on_024
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02h  14h  00h  00h  00h  16h"
    params: []
    notes: "Turned off by input/video switch."

  - id: onscreen_mute_off_025
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h  15h  00h  00h  00h  17h"
    params: []

  - id: picture_adjust_030_1
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h  10h  00h  00h  05h  <DATA01>  FFh  <DATA02>  <DATA03>  <DATA04>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: volume_adjust_030_2
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h  10h  00h  00h  05h  05h  00h  <DATA01>  <DATA02>  <DATA03>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA02
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: aspect_adjust_030_12
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h  10h  00h  00h  05h  18h  00h  00h  <DATA01>  00h  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Aspect value. List in appendix 'Supplementary Information by Command'."

  - id: other_adjust_030_15
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h  10h  00h  00h  05h  <DATA01>  <DATA02>  <DATA03>  <DATA04>  <DATA05>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Target. 96h=LAMP ADJUST / LIGHT ADJUST (with DATA02=FFh)"
      - name: DATA02
        type: byte
        description: "FFh pairs with DATA01=96h target"
      - name: DATA03
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: information_request_037
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h  8Ah  00h  00h  00h  8Dh"
    params: []
    notes: "Returns projector name, lamp usage time (DATA83-86 sec), filter usage time (DATA87-90 sec)."

  - id: filter_usage_information_request_037_3
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h  95h  00h  00h  00h  98h"
    params: []
    notes: "Returns filter usage time + alarm start time (sec). -1 if undefined."

  - id: lamp_information_request_037_4
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h  96h  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: byte
        description: "Content: 01h=usage time (sec), 04h=remaining life (%)"

  - id: carbon_savings_information_request_037_6
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h  9Ah  00h  00h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code_050
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h  0Fh  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Key code low byte. List in source key code table."
      - name: DATA02
        type: byte
        description: "Key code high byte"
    notes: "Key code table (DATA01,DATA02): 02h,00h=POWER ON; 03h,00h=POWER OFF; 05h,00h=AUTO; 06h,00h=MENU; 07h,00h=UP; 08h,00h=DOWN; 09h,00h=RIGHT; 0Ah,00h=LEFT; 0Bh,00h=ENTER; 0Ch,00h=EXIT; 0Dh,00h=HELP; 0Fh,00h=MAGNIFY UP; 10h,00h=MAGNIFY DOWN; 13h,00h=MUTE; 29h,00h=PICTURE; 4Bh,00h=COMPUTER1; 4Ch,00h=COMPUTER2; 4Fh,00h=VIDEO1; 51h,00h=S-VIDEO1; 84h,00h=VOLUME UP; 85h,00h=VOLUME DOWN; 8Ah,00h=FREEZE; A3h,00h=ASPECT; D7h,00h=SOURCE; EEh,00h=LAMP MODE/ECO"

  - id: shutter_close_051
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02h  16h  00h  00h  00h  18h"
    params: []

  - id: shutter_open_052
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02h  17h  00h  00h  00h  19h"
    params: []

  - id: lens_control_053
    label: "053. LENS CONTROL"
    kind: action
    command: "02h  18h  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Target. 06h=Periphery Focus. (other targets referenced in appendix)"
      - name: DATA02
        type: byte
        description: "Content: 00h=Stop; 01h=+1s; 02h=+0.5s; 03h=+0.25s; 7Fh=+dir; 81h=-dir; FDh=-0.25s; FEh=-0.5s; FFh=-1s"
    notes: "Send 00h after 7Fh/81h to stop continuous drive."

  - id: lens_control_request_053_1
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h  1Ch  00h  00h  02h  <DATA01>  00h  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lens target"
    notes: "Returns upper/lower limits + current value (16-bit)."

  - id: lens_control_2_053_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h  1Dh  00h  00h  04h  <DATA01>  <DATA02>  <DATA03>  <DATA04>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Target. FFh=Stop (then DATA02-04 ignored)"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: lens_memory_control_053_3
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h  1Eh  00h  00h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control_053_4
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h  1Fh  00h  00h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Acts on profile selected by 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request_053_5
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h  20h  00h  00h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    notes: "Returns DATA02 setting: 00h=OFF, 01h=ON"

  - id: lens_memory_option_set_053_6
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h  21h  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: byte
        description: "00h=OFF, 01h=ON"

  - id: lens_information_request_053_7
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h  22h  00h  00h  01h  00h  25h"
    params: []
    notes: "Returns DATA01 bitfield: bit0=Lens memory, bit1=Zoom, bit2=Focus, bit3=Lens Shift H, bit4=Lens Shift V (0=Stop, 1=During operation)."

  - id: lens_profile_set_053_10
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h  27h  00h  00h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request_053_11
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h  28h  00h  00h  00h  2Ah"
    params: []
    notes: "Returns DATA01: 00h=Profile 1, 01h=Profile 2"

  - id: gain_parameter_request_060_1
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h  05h  00h  00h  03h  <DATA01>  00h  00h  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

  - id: setting_request_078_1
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h  85h  00h  00h  01h  00h  86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), clock/sleep profile (DATA05)."

  - id: running_status_request_078_2
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h  85h  00h  00h  01h  01h  87h"
    params: []
    notes: "Returns DATA03 power status, DATA04 cooling, DATA05 power on/off process, DATA06 operation status."

  - id: input_status_request_078_3
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h  85h  00h  00h  01h  02h  88h"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern display, content displayed."

  - id: mute_status_request_078_4
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h  85h  00h  00h  01h  03h  89h"
    params: []
    notes: "Returns DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display."

  - id: model_name_request_078_5
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h  85h  00h  00h  01h  04h  8Ah"
    params: []
    notes: "Returns DATA01-32 model name (NUL-terminated)."

  - id: cover_status_request_078_6
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h  85h  00h  00h  01h  05h  8Bh"
    params: []
    notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  - id: freeze_control_079
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h  98h  00h  00h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "01h=freeze ON, 02h=freeze OFF"

  - id: information_string_request_084
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h  D0h  00h  00h  03h  00h  <DATA01>  01h  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: eco_mode_request_097_8
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h  B0h  00h  00h  01h  07h  BBh"
    params: []
    notes: "Returns DATA01 eco mode value (list in appendix). May reflect Light mode or Lamp mode depending on model."

  - id: lan_projector_name_request_097_45
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h  B0h  00h  00h  01h  2Ch  E0h"
    params: []
    notes: "Returns DATA01-17 projector name (NUL-terminated)."

  - id: lan_mac_address_status_request_097_155
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h  B0h  00h  00h  02h  9Ah  00h  4Fh"
    params: []
    notes: "Returns DATA01-06 MAC address."

  - id: pip_pbp_request_097_198
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h  B0h  00h  00h  02h  C5h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request_097_243_1
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h  B0h  00h  00h  02h  DFh  00h  94h"
    params: []
    notes: "Returns DATA01: 00h=OFF, 01h=ON"

  - id: eco_mode_set_098_8
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h  B1h  00h  00h  02h  07h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Eco mode value (list in appendix 'Supplementary Information by Command')."

  - id: lan_projector_name_set_098_45
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h  B1h  00h  00h  12h  2Ch  <DATA01>  -  <DATA16>  00h  <CKS>"
    params:
      - name: DATA01_to_DATA16
        type: string
        description: "Projector name (up to 16 bytes)"

  - id: pip_pbp_set_098_198
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h  B1h  00h  00h  03h  C5h  <DATA01>  <DATA02>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: byte
        description: "Setting value (mode: 00h=PIP, 01h=PBP; position: 00h=TOP-LEFT ... 03h=BOTTOM-RIGHT; sub input values in appendix)"

  - id: edge_blending_mode_set_098_243_1
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h  B1h  00h  00h  03h  DFh  00h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: base_model_type_request_305_1
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h  BFh  00h  00h  01h  00h  C0h"
    params: []
    notes: "Returns base model type (DATA01-02), model name (DATA03-11), base model type (DATA12-13)."

  - id: serial_number_request_305_2
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h  BFh  00h  00h  02h  01h  06h  C8h"
    params: []
    notes: "Returns DATA01-16 serial number (NUL-terminated)."

  - id: basic_information_request_305_3
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h  BFh  00h  00h  01h  02h  C2h"
    params: []
    notes: "Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status."

  - id: audio_select_set_319_10
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h  C9h  00h  00h  03h  09h  <DATA01>  <DATA02>  <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal (values in appendix)"
      - name: DATA02
        type: byte
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: command_ack
    type: struct
    description: "Success response echoes command opcode with prefix byte (02h->22h, 03h->23h, 00h->20h, 01h->21h) + <ID1> <ID2> + LEN + data + <CKS>"
  - id: command_error
    type: struct
    description: "Error response uses A-prefix (02h->A2h, etc.) + <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  - id: error_codes
    type: enum
    description: "ERR1/ERR2 pairs: 00h,00h=unrecognized; 00h,01h=unsupported by model; 01h,00h=invalid value; 01h,01h=invalid input terminal; 01h,02h=invalid language; 02h,00h=memory allocation error; 02h,02h=memory in use; 02h,03h=value cannot be set; 02h,04h=forced onscreen mute on; 02h,06h=viewer error; 02h,07h=no signal; 02h,08h=test pattern/filter displayed; 02h,09h=no PC card; 02h,0Ah=memory operation error; 02h,0Ch=entry list displayed; 02h,0Dh=power off (command not accepted); 02h,0Eh=execution failed; 02h,0Fh=no authority; 03h,00h=incorrect gain number; 03h,01h=invalid gain; 03h,02h=adjustment failed"
```

## Variables
```yaml
# N/A - all settable params exposed as Actions above.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification documented in source. All responses are command-initiated.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: no other command accepted during power-on process"
  - "POWER OFF: no other command accepted during power-off incl. cooling time"
# UNRESOLVED: no explicit power-on sequencing or interlock procedure documented beyond command-acceptance notes.
```

## Notes
- Checksum (CKS): sum all preceding bytes, use low-order one byte of result. Each command payload shown verbatim includes the literal bytes; `<CKS>` placeholder denotes computed checksum byte.
- `<ID1>` = control ID set on projector; `<ID2>` = model code (varies by model — value for E758 not stated in source).
- Baud rate auto/configurable among 115200/38400/19200/9600/4800; default not stated. `serial.baud_rate: 115200` above reflects first listed value, not a confirmed default.
- Commands with no ID1/ID2 in payload (e.g. POWER ON `02h 00h 00h 00h 00h 02h`) are broadcast/control-ID-agnostic per source format; responses include `<ID1> <ID2>`.
- Signal list number returned is practical value minus 1; add 1 to decode.
- Lamp usage time returned in seconds, updated at 1-minute intervals.
- Full input terminal value list, eco mode value list, and sub-input setting values referenced to appendix "Supplementary Information by Command" — not present in refined source.

<!-- UNRESOLVED: firmware version compatibility not stated. Model code (ID2) for E758 not stated. Default baud rate not stated. Flow control type not stated. Appendix tables (input terminal values, eco mode values, aspect values, sub-input values, base model types) not included in refined source. Wireless LAN unit details deferred to separate operation manual. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:05:28.964Z
last_checked_at: 2026-06-17T19:45:00.177Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:45:00.177Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 actions matched exactly against source hex commands; transport parameters confirmed in specification sections. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Model code (ID2) value not stated. Input terminal value list referenced to appendix not included in refined source."
- "flow control not stated; full-duplex noted"
- "no unsolicited notification documented in source. All responses are command-initiated."
- "no explicit multi-step sequences documented in source."
- "no explicit power-on sequencing or interlock procedure documented beyond command-acceptance notes."
- "firmware version compatibility not stated. Model code (ID2) for E758 not stated. Default baud rate not stated. Flow control type not stated. Appendix tables (input terminal values, eco mode values, aspect values, sub-input values, base model types) not included in refined source. Wireless LAN unit details deferred to separate operation manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
