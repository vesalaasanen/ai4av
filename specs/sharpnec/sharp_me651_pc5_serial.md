---
spec_id: admin/sharp-nec-me651-pc5
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC ME651-PC5 Control Spec"
manufacturer: Sharp/NEC
model_family: ME651-PC5
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - ME651-PC5
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:11:16.751Z
last_checked_at: 2026-10-01T13:12:42.723Z
generated_at: 2026-10-01T13:12:42.723Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a multi-model generic command reference; model-specific appendix tables (\"Supplementary Information by Command\": input terminal values, aspect values, eco mode values, sub input values, base model types) are not included in the refined source, so several parameter enum values are unresolved."
  - "flow control not stated in source (RTS/CTS pins wired in D-SUB 9P pinout)"
  - "not present in source\""
  - "value list in vendor appendix, not present in source\""
  - "value list truncated in source\""
  - "value list in vendor appendix, not present in source. Returns Light mode or Lamp mode depending on projector\""
  - "base model type values in vendor appendix\""
  - "eco mode values in vendor appendix, not present in source"
  - "aspect values in vendor appendix, not present in source"
  - "no multi-step sequences described in source"
  - "model-specific appendix tables (input terminal values, aspect values, eco mode values, sub input values, base model types, standby mode command reception) referenced throughout but not included in refined source"
  - "firmware version compatibility not stated in source"
  - "default baud rate among the five selectable rates not stated"
verification:
  verdict: verified
  checked_at: 2026-10-01T13:12:42.723Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source hex commands verbatim; transport values appear in source; auth is honestly UNRESOLVED; coverage ratio 53/53. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Sharp/NEC ME651-PC5 Control Spec

## Summary
Sharp/NEC ME651-PC5 large-venue projector controlled via binary hex command protocol over RS-232C (PC CONTROL port, D-SUB 9P) or wired/wireless LAN (TCP port 7142). Spec covers the vendor Projector Control Command Reference Manual rev 8.0 (June 29, 2022): power, input switching, mutes, picture/volume/lens adjustment, status queries, and network settings commands.

<!-- UNRESOLVED: source is a multi-model generic command reference; model-specific appendix tables ("Supplementary Information by Command": input terminal values, aspect values, eco mode values, sub input values, base model types) are not included in the refined source, so several parameter enum values are unresolved. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: 115200  # source lists selectable rates: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (RTS/CTS pins wired in D-SUB 9P pinout)
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
# inferred from command evidence in source
- powerable    # 015 POWER ON / 016 POWER OFF
- routable     # 018 INPUT SW CHANGE
- queryable    # 009/037/078/097/305 request commands
- levelable    # 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST / 030-15 LAMP-LIGHT ADJUST
```

## Actions
```yaml
- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h  88h  00h  00h  00h  88h"
  params: []
  notes: "Response DATA01-DATA12 bit flags: cover/fan/temperature/power/lamp errors; DATA09 extended status incl. interlock switch open (Bit1)"

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h  00h  00h  00h  00h  02h"
  params: []
  notes: "No other command accepted while power is turning on"

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h  01h  00h  00h  00h  03h"
  params: []
  notes: "No other command accepted during power-off including cooling time"

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h  03h  00h  00h  02h  01h  <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Input terminal value. Example from source: 06h = video port. Full value list in vendor appendix - UNRESOLVED: not present in source"
  notes: "Example (switch to video port): 02h  03h  00h  00h  02h  01h  06h  0Eh. Response DATA01 FFh = error (no signal switch made)"

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h  10h  00h  00h  00h  12h"
  params: []
  notes: "Picture mute canceled by input terminal switch or video signal switch"

- id: picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h  11h  00h  00h  00h  13h"
  params: []

- id: sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h  12h  00h  00h  00h  14h"
  params: []
  notes: "Sound mute canceled by input switch, video signal switch, or volume adjustment"

- id: sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h  13h  00h  00h  00h  15h"
  params: []

- id: onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h  14h  00h  00h  00h  16h"
  params: []
  notes: "Onscreen mute canceled by input terminal switch or video signal switch"

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h  15h  00h  00h  00h  17h"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h  10h  00h  00h  05h  <DATA01>  FFh  <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: data01
      type: enum
      description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: data02
      type: enum
      description: "Adjustment mode: 00h absolute value, 01h relative value"
    - name: value
      type: integer
      description: "DATA03 low-order 8 bits, DATA04 high-order 8 bits. Source example: brightness +10 → 00h 0Ah 00h; brightness -10 → 00h F6h FFh"

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h  10h  00h  00h  05h  05h  00h  <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: data01
      type: enum
      description: "Adjustment mode: 00h absolute value, 01h relative value"
    - name: value
      type: integer
      description: "DATA02 low-order 8 bits, DATA03 high-order 8 bits. Source example: volume 10 → 00h 0Ah 00h (full: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h)"

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h  10h  00h  00h  05h  18h  00h  00h  <DATA01>  00h  <CKS>"
  params:
    - name: data01
      type: integer
      description: "Aspect value. UNRESOLVED: value list in vendor appendix, not present in source"

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h  10h  00h  00h  05h  <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 96h (with DATA02 FFh) = LAMP ADJUST / LIGHT ADJUST"
    - name: data02
      type: integer
      description: "FFh (pairs with DATA01 96h)"
    - name: data03
      type: enum
      description: "Adjustment mode: 00h absolute value, 01h relative value"
    - name: value
      type: integer
      description: "DATA04 low-order 8 bits, DATA05 high-order 8 bits"

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h  8Ah  00h  00h  00h  8Dh"
  params: []
  notes: "Response: DATA01-49 projector name, DATA83-86 lamp usage time (seconds), DATA87-90 filter usage time (seconds). Updated at 1-minute intervals"

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h  95h  00h  00h  00h  98h"
  params: []
  notes: "Response: DATA01-04 filter usage time (seconds), DATA05-08 filter alarm start time (seconds); -1 if undefined"

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h  96h  00h  00h  02h  <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: enum
      description: "Lamp select: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: data02
      type: enum
      description: "Content: 01h lamp usage time (seconds), 04h lamp remaining life (%)"
  notes: "Source example (lamp 1 usage time): 03h  96h  00h  00h  02h  00h  01h  9Ch. Negative remaining life = replacement deadline exceeded. Values reflect eco mode; updated at 1-minute intervals"

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h  9Ah  00h  00h  01h  <DATA01> <CKS>"
  params:
    - name: data01
      type: enum
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation"
  notes: "Response: DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h  0Fh  00h  00h  02h  <DATA01> <DATA02> <CKS>"
  params:
    - name: key_code
      type: enum
      description: "WORD key code (DATA01 DATA02): 02h 00h POWER ON, 03h 00h POWER OFF, 05h 00h AUTO, 06h 00h MENU, 07h 00h UP, 08h 00h DOWN, 09h 00h RIGHT, 0Ah 00h LEFT, 0Bh 00h ENTER, 0Ch 00h EXIT, 0Dh 00h HELP, 0Fh 00h MAGNIFY UP, 10h 00h MAGNIFY DOWN, 13h 00h MUTE, 29h 00h PICTURE, 4Bh 00h COMPUTER1, 4Ch 00h COMPUTER2, 4Fh 00h VIDEO1, 51h 00h S-VIDEO1, 84h 00h VOLUME UP, 85h 00h VOLUME DOWN, 8Ah 00h FREEZE, A3h 00h ASPECT, D7h 00h SOURCE, EEh 00h LAMP MODE/ECO"
  notes: "Source example (AUTO): 02h  0Fh  00h  00h  02h  05h  00h  18h. Response DATA01 FFh = error"

- id: shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h  16h  00h  00h  00h  18h"
  params: []

- id: shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h  17h  00h  00h  00h  19h"
  params: []

- id: lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02h  18h  00h  00h  02h  <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 06h Periphery Focus"
    - name: data02
      type: enum
      description: "Content: 00h Stop, 01h drive 1s plus, 02h drive 0.5s plus, 03h drive 0.25s plus, 7Fh drive plus (continuous), 81h drive minus (continuous), FDh drive 0.25s minus, FEh drive 0.5s minus, FFh drive 1s minus"
  notes: "Send 00h to stop after 7Fh/81h continuous drive. Re-issuing same command while driving adjusts without stop. Response DATA01 FFh = error"

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h  1Ch  00h  00h  02h  <DATA01>  00h  <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment target. UNRESOLVED: value list truncated in source"
  notes: "Response DATA02-03 upper limit, DATA04-05 lower limit, DATA06-07 current value"

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h  1Dh  00h  00h  04h  <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: FFh Stop (mode/value not referenced when Stop)"
    - name: data02
      type: enum
      description: "Adjustment mode: 00h absolute value, 02h relative value"
    - name: value
      type: integer
      description: "DATA03 low-order 8 bits, DATA04 high-order 8 bits"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h  1Eh  00h  00h  01h  <DATA01> <CKS>"
  params:
    - name: data01
      type: enum
      description: "00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h  1Fh  00h  00h  01h  <DATA01> <CKS>"
  params:
    - name: data01
      type: enum
      description: "00h MOVE, 01h STORE, 02h RESET"
  notes: "Controls profile number selected by 053-10 LENS PROFILE SET"

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h  20h  00h  00h  01h  <DATA01> <CKS>"
  params:
    - name: data01
      type: enum
      description: "Option: 00h LOAD BY SIGNAL, 01h FORCED MUTE"
  notes: "Response DATA02 setting value: 00h OFF, 01h ON"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h  21h  00h  00h  02h  <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: enum
      description: "Option: 00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: data02
      type: enum
      description: "Setting value: 00h OFF, 01h ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h  22h  00h  00h  01h  00h  25h"
  params: []
  notes: "Response DATA01 bit flags: Bit0 lens memory, Bit1 zoom, Bit2 focus, Bit3 lens shift H, Bit4 lens shift V (0=Stop, 1=During operation); Bits 5-7 reserved"

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h  27h  00h  00h  01h  <DATA01> <CKS>"
  params:
    - name: data01
      type: enum
      description: "Profile number: 00h Profile 1, 01h Profile 2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h  28h  00h  00h  00h  2Ah"
  params: []
  notes: "Response DATA01: 00h Profile 1, 01h Profile 2"

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h  05h  00h  00h  03h  <DATA01>  00h  00h  <CKS>"
  params:
    - name: data01
      type: enum
      description: "Adjusted value name: 00h PICTURE/BRIGHTNESS, 01h PICTURE/CONTRAST, 02h PICTURE/COLOR, 03h PICTURE/HUE, 04h PICTURE/SHARPNESS, 05h VOLUME, 96h LAMP ADJUST/LIGHT ADJUST"
  notes: "Source example (brightness): 03h  05h  00h  00h  03h  00h  00h  00h  0Bh. Response: DATA01 status (00h display not possible, 01h adjustment not possible, 02h adjustment possible, FFh gain does not exist), DATA02-13 limits/default/current/step widths, DATA14 default validity"

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  00h  86h"
  params: []
  notes: "Response: DATA01-03 base model type, DATA04 sound function (00h not available, 01h available), DATA05 function (00h none, 01h clock, 02h sleep timer, 03h both)"

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  01h  87h"
  params: []
  notes: "Response: DATA03 power status (00h standby, 01h power on, FFh not supported), DATA04 cooling process, DATA05 power on/off process, DATA06 operation status (00h standby sleep, 04h power on, 05h cooling, 06h standby error, 0Fh standby power saving, 10h network standby, FFh not supported)"

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  02h  88h"
  params: []
  notes: "Response: DATA01 signal switch process, DATA02 signal list number (returned value = actual - 1; FFh not supported), DATA03 selection signal type 1, DATA04 selection signal type 2 (01h COMPUTER, 02h VIDEO, 03h S-VIDEO, 04h COMPONENT, 07h VIEWER(1-5), 20h DVI-D, 21h HDMI, 22h DisplayPort, 23h VIEWER(6-10)), DATA05 signal list type, DATA06 test pattern display, DATA09 content displayed"

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  03h  89h"
  params: []
  notes: "Response: DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (all 00h Off, 01h On)"

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  04h  8Ah"
  params: []
  notes: "Response: DATA01-32 model name (NUL-terminated)"

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  05h  8Bh"
  params: []
  notes: "Response DATA01: 00h Normal (cover opened), 01h Cover closed"

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h  98h  00h  00h  01h  <DATA01> <CKS>"
  params:
    - name: data01
      type: enum
      description: "01h freeze on, 02h freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h  D0h  00h  00h  03h  00h  <DATA01>  01h  <CKS>"
  params:
    - name: data01
      type: enum
      description: "Information type: 03h horizontal synchronous frequency, 04h vertical synchronous frequency"
  notes: "Response: DATA02 label/info string length, DATA03.. string (NUL-terminated)"

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h  B0h  00h  00h  01h  07h  BBh"
  params: []
  notes: "Response DATA01 eco mode value. UNRESOLVED: value list in vendor appendix, not present in source. Returns Light mode or Lamp mode depending on projector"

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h  B0h  00h  00h  01h  2Ch  E0h"
  params: []
  notes: "Response: DATA01-17 projector name (NUL-terminated)"

- id: lan_mac_address_status_request2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h  B0h  00h  00h  02h  9Ah  00h  4Fh"
  params: []
  notes: "Response: DATA01-06 MAC address"

- id: pip_pbp_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h  B0h  00h  00h  02h  C5h  <DATA01> <CKS>"
  params:
    - name: data01
      type: enum
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
  notes: "Response DATA02: MODE 00h PIP / 01h PICTURE BY PICTURE; START POSITION 00h TOP-LEFT, 01h TOP-RIGHT, 02h BOTTOM-LEFT, 03h BOTTOM-RIGHT; sub input values UNRESOLVED (vendor appendix)"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h  B0h  00h  00h  02h  DFh  00h  94h"
  params: []
  notes: "Response DATA01: 00h OFF, 01h ON"

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h  B1h  00h  00h  02h  07h  <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Eco mode value. UNRESOLVED: value list in vendor appendix, not present in source"
  notes: "Sets Light mode or Lamp mode depending on projector"

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h  B1h  00h  00h  12h  2Ch  <DATA01> - <DATA16>  00h  <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name, DATA01-16 (up to 16 bytes)"

- id: pip_pbp_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h  B1h  00h  00h  03h  C5h  <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: enum
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: data02
      type: integer
      description: "MODE: 00h PIP, 01h PICTURE BY PICTURE; START POSITION: 00h TOP-LEFT, 01h TOP-RIGHT, 02h BOTTOM-LEFT, 03h BOTTOM-RIGHT; sub input values UNRESOLVED (vendor appendix)"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h  B1h  00h  00h  03h  DFh  00h  <DATA01> <CKS>"
  params:
    - name: data01
      type: enum
      description: "Setting value: 00h OFF, 01h ON"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h  BFh  00h  00h  01h  00h  C0h"
  params: []
  notes: "Response: DATA01-02 base model type, DATA03-11 model name (NUL-terminated), DATA12-13 base model type. UNRESOLVED: base model type values in vendor appendix"

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h  BFh  00h  00h  02h  01h  06h  C8h"
  params: []
  notes: "Response: DATA01-16 serial number (NUL-terminated)"

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h  BFh  00h  00h  01h  02h  C2h"
  params: []
  notes: "Response: DATA01 operation status, DATA02 content displayed, DATA03-04 signal types, DATA05 display signal type, DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze status"

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h  C9h  00h  00h  03h  09h  <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Input terminal. UNRESOLVED: value list in vendor appendix, not present in source"
    - name: data02
      type: enum
      description: "Audio source: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
- id: command_response
  type: object
  description: "Every command returns a response. Success: first byte = command block byte + 20h (e.g. 22h/23h/20h/21h) with ID1 ID2, LEN, optional DATA, CKS. Failure: first byte = block byte + A0h (e.g. A2h/A3h/A0h/A1h) with ERR1 ERR2 CKS"

- id: error_code
  type: enum
  description: "ERR1/ERR2 pairs: 00h 00h command not recognized; 00h 01h not supported by model; 01h 00h invalid value; 01h 01h invalid input terminal; 01h 02h invalid language; 02h 00h memory allocation error; 02h 02h memory in use; 02h 03h value cannot be set; 02h 04h forced onscreen mute on; 02h 06h viewer error; 02h 07h no signal; 02h 08h test pattern/filter displayed; 02h 09h no PC card; 02h 0Ah memory operation error; 02h 0Ch entry list displayed; 02h 0Dh power off; 02h 0Eh execution failed; 02h 0Fh no authority; 03h 00h wrong gain number; 03h 01h invalid gain; 03h 02h adjustment failed"

- id: power_state
  type: enum
  values: [standby, power_on]
  description: "078-2 DATA03: 00h standby, 01h power on, FFh not supported"

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "078-2 DATA06: 00h, 04h, 05h, 06h, 0Fh, 10h"

- id: input_status
  type: object
  description: "078-3: signal switch process, signal list number (actual-1), signal types, test pattern, content displayed"

- id: mute_status
  type: object
  description: "078-4: picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display - each Off/On"

- id: error_status
  type: bitmask
  description: "009 response DATA01-12: cover error, temperature error, fan error, power error, lamp off/replacement moratorium, lamp usage exceeded, formatter error, FPGA error, ballast communication error, interlock switch open (DATA09 Bit1), system errors"

- id: lamp_info
  type: object
  description: "037-4: lamp usage time (seconds), lamp remaining life (%) - negative if replacement deadline exceeded"

- id: filter_info
  type: object
  description: "037-3: filter usage time (seconds), filter alarm start time (seconds), -1 if undefined"

- id: cover_status
  type: enum
  values: [open, closed]
  description: "078-6 DATA01: 00h normal (opened), 01h cover closed"

- id: lens_operation_status
  type: bitmask
  description: "053-7 DATA01: per-axis stop/operation bits for lens memory, zoom, focus, lens shift H/V"
```

## Variables
```yaml
- id: volume
  description: "Sound volume (030-2 VOLUME ADJUST, absolute or relative)"
  read_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=05h)"
  write_via: "030-2 VOLUME ADJUST"

- id: picture_brightness
  description: "Brightness (030-1, target 00h)"
  read_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=00h)"
  write_via: "030-1 PICTURE ADJUST"

- id: picture_contrast
  description: "Contrast (030-1, target 01h)"
  read_via: "060-1 (DATA01=01h)"
  write_via: "030-1 PICTURE ADJUST"

- id: picture_color
  description: "Color (030-1, target 02h)"
  read_via: "060-1 (DATA01=02h)"
  write_via: "030-1 PICTURE ADJUST"

- id: picture_hue
  description: "Hue (030-1, target 03h)"
  read_via: "060-1 (DATA01=03h)"
  write_via: "030-1 PICTURE ADJUST"

- id: picture_sharpness
  description: "Sharpness (030-1, target 04h)"
  read_via: "060-1 (DATA01=04h)"
  write_via: "030-1 PICTURE ADJUST"

- id: lamp_light_adjust
  description: "Lamp/light adjust gain (030-15)"
  read_via: "060-1 (DATA01=96h)"
  write_via: "030-15 OTHER ADJUST"

- id: eco_mode
  description: "Eco/Light/Lamp mode"
  read_via: "097-8 ECO MODE REQUEST"
  write_via: "098-8 ECO MODE SET"
  # UNRESOLVED: eco mode values in vendor appendix, not present in source

- id: aspect
  description: "Aspect setting"
  write_via: "030-12 ASPECT ADJUST"
  # UNRESOLVED: aspect values in vendor appendix, not present in source

- id: projector_name
  description: "LAN projector name (up to 16 bytes)"
  read_via: "097-45 LAN PROJECTOR NAME REQUEST"
  write_via: "098-45 LAN PROJECTOR NAME SET"

- id: edge_blending
  description: "Edge blending on/off"
  read_via: "097-243-1 EDGE BLENDING MODE REQUEST"
  write_via: "098-243-1 EDGE BLENDING MODE SET"

- id: pip_pbp_mode
  description: "PIP or Picture-by-Picture mode, start position, sub inputs"
  read_via: "097-198 PIP/PBP REQUEST"
  write_via: "098-198 PIP/PBP SET"
```

## Events
```yaml
# Source documents no unsolicited notifications - protocol is command/response only.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source reports an interlock switch status bit (009 DATA09 Bit1 "The interlock
# switch is open") but documents no interlock procedure or safety warnings.
# Nothing to populate from explicit source text.
```

## Notes
- Frame structure: command = `<block> <code> 00h 00h <LEN> [DATA...] <CKS>`; response = `<block+20h> <code> <ID1> <ID2> <LEN> [DATA...] <CKS>` on success, `<block+A0h> ...` with ERR1 ERR2 on failure.
- Checksum: sum all preceding bytes, use low-order byte. Source example: 20h+81h+01h+60h+01h+00h = 103h → CKS = 03h.
- ID1 = projector control ID; ID2 = model code (varies by model).
- POWER ON/OFF accept no other commands during transition (including cooling).
- Picture/onscreen mute auto-cancel on input or signal switch; sound mute also cancels on volume adjustment.
- Lamp/filter usage times returnable in 1-second units but updated at 1-minute intervals.
- Some models cannot receive commands in standby mode (source 1.1).
- Serial cable: cross cable, D-SUB 9P; only pins 2 (RxD), 3 (TxD), 5 (GND), 7 (RTS), 8 (CTS) used.
- LAN: 10/100 Mbps auto-switchable, IEEE802.3/802.3u; TCP 7142. Wireless LAN via optional wireless LAN unit.
- Source: Projector Control Command Reference Manual rev 8.0 (June 29, 2022), No.BDT140014 appendix series.
<!-- UNRESOLVED: model-specific appendix tables (input terminal values, aspect values, eco mode values, sub input values, base model types, standby mode command reception) referenced throughout but not included in refined source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: default baud rate among the five selectable rates not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:11:16.751Z
last_checked_at: 2026-10-01T13:12:42.723Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T13:12:42.723Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source hex commands verbatim; transport values appear in source; auth is honestly UNRESOLVED; coverage ratio 53/53. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a multi-model generic command reference; model-specific appendix tables (\"Supplementary Information by Command\": input terminal values, aspect values, eco mode values, sub input values, base model types) are not included in the refined source, so several parameter enum values are unresolved."
- "flow control not stated in source (RTS/CTS pins wired in D-SUB 9P pinout)"
- "not present in source\""
- "value list in vendor appendix, not present in source\""
- "value list truncated in source\""
- "value list in vendor appendix, not present in source. Returns Light mode or Lamp mode depending on projector\""
- "base model type values in vendor appendix\""
- "eco mode values in vendor appendix, not present in source"
- "aspect values in vendor appendix, not present in source"
- "no multi-step sequences described in source"
- "model-specific appendix tables (input terminal values, aspect values, eco mode values, sub input values, base model types, standby mode command reception) referenced throughout but not included in refined source"
- "firmware version compatibility not stated in source"
- "default baud rate among the five selectable rates not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
