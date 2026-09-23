---
spec_id: admin/sharpnec-np-um351w-wk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-UM351W Control Spec"
manufacturer: Sharp/NEC
model_family: NP-UM351W
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-UM351W
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:05:04.878Z
last_checked_at: 2026-09-20T22:18:12.480Z
generated_at: 2026-09-20T22:18:12.480Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value table, aspect value table, eco mode value table, base model type values, and PIP sub-input values are referenced to a manual Appendix (\"Supplementary Information by Command\") not present in the refined source"
  - "flow control not explicitly stated; RTS/CTS pins wired in pin assignment table"
  - "appendix table not in source\""
  - "value list in manual Appendix not present in source\""
  - "target values not enumerated in source section\""
  - "sub input value table not in source\""
  - "value meanings in manual Appendix not in source\""
  - "source contains no explicit safety warnings or interlock"
  - "appendix tables (input terminal values, aspect values, eco mode values, base model type values, PIP sub-input values, standby-mode command reception per model) referenced by source but not included in it"
  - "flow control setting not explicitly stated (only pin wiring shown)"
  - "default baud rate not stated (115200/38400/19200/9600/4800 all supported)"
  - "ID2 model code values per model not stated"
  - "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
verification:
  verdict: verified
  checked_at: 2026-09-20T22:18:12.480Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions have verbatim hex command matches in the source's section 3 command catalogue; transport values (baud, parity, port) are sourced directly. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Sharp/NEC NP-UM351W Control Spec

## Summary
Short-throw LCD projector controlled via RS-232C serial (PC CONTROL port, D-SUB 9P) or wired/wireless LAN (TCP port 7142). Spec covers the binary control protocol from the Sharp/NEC Projector Control Command Reference Manual: power, input switching, mutes, picture/volume/aspect adjust, lens control and memory, lamp/filter/carbon info queries, status requests, and set commands.

<!-- UNRESOLVED: input terminal value table, aspect value table, eco mode value table, base model type values, and PIP sub-input values are referenced to a manual Appendix ("Supplementary Information by Command") not present in the refined source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: "115200/38400/19200/9600/4800"  # selectable per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated; RTS/CTS pins wired in pin assignment table
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable    (015 POWER ON / 016 POWER OFF)
# - routable     (018 INPUT SW CHANGE)
# - queryable    (009/037/078/097/305 request commands)
# - levelable    (030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST)
traits:
  - powerable    # inferred from power command examples
  - routable     # inferred from routing command examples
  - queryable    # inferred from query command examples
  - levelable    # inferred from level control examples
```

## Actions
```yaml
# Protocol frame: command bytes in hex. Responses: 20h-23h prefix = success,
# A0h-A3h prefix = error with <ERR1> <ERR2> <CKS>.
# CKS = low-order byte of sum of all preceding bytes.
- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While turning on power, no other command accepted."

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While turning off power (including cooling time), no other command accepted."

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value. Example: 06h = video port. Full value list in manual Appendix 'Supplementary Information by Command'. # UNRESOLVED: appendix table not in source"
  notes: "Response DATA01 FFh = ended with error (no signal switch made)."

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Turned off by input terminal switch or video signal switch."

- id: picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Turned off by input terminal switch, video signal switch, or volume adjustment."

- id: sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: "Turned off by input terminal switch or video signal switch."

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: enum
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: DATA03_DATA04
      type: integer
      description: "Adjustment value, 16-bit little-endian (DATA03 low, DATA04 high). Example: brightness 10 = 00h 0Ah 00h; brightness -10 = 00h F6h FFh."

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: DATA02_DATA03
      type: integer
      description: "Adjustment value, 16-bit little-endian (DATA02 low, DATA03 high). Example: volume 10 = 00h 0Ah 00h."

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value. # UNRESOLVED: value list in manual Appendix not present in source"

- id: other_adjust
  label: "030-15. OTHER ADJUST (LAMP ADJUST / LIGHT ADJUST)"
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA03
      type: enum
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: DATA04_DATA05
      type: integer
      description: "Adjustment value, 16-bit little-endian (DATA04 low, DATA05 high)"
  notes: "DATA01=96h, DATA02=FFh fixed (adjustment target LAMP ADJUST / LIGHT ADJUST)."

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Response 98 data bytes: DATA01-49 projector name, DATA83-86 lamp usage time (seconds), DATA87-90 filter usage time (seconds). Updated at one-minute intervals."

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Response DATA01-04 filter usage time (seconds), DATA05-08 filter alarm start time (seconds); -1 if undefined."

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: enum
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
  notes: "Values reflect eco mode when enabled. Remaining life negative if replacement deadline exceeded. Updated at one-minute intervals."

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Content: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Response DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01_DATA02
      type: enum
      description: "Key code (WORD): 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT, 0Dh 00h=HELP, 0Fh 00h=MAGNIFY UP, 10h 00h=MAGNIFY DOWN, 13h 00h=MUTE, 29h 00h=PICTURE, 4Bh 00h=COMPUTER1, 4Ch 00h=COMPUTER2, 4Fh 00h=VIDEO1, 51h 00h=S-VIDEO1, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN, 8Ah 00h=FREEZE, A3h 00h=ASPECT, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO"
  notes: "Example AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h. Response DATA01 FFh = error."

- id: shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: "053. LENS CONTROL (Periphery Focus)"
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Target: 06h=Periphery Focus"
    - name: DATA02
      type: enum
      description: "Content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"
  notes: "After 7Fh/81h, stop by sending 00h. Same command reissued while driving controls position without stop. Response DATA01 FFh = error."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Target # UNRESOLVED: target values not enumerated in source section"
  notes: "Response: DATA02-03 upper limit, DATA04-05 lower limit, DATA06-07 current value (16-bit LE)."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Target: FFh=Stop (mode/value not referenced when Stop)"
    - name: DATA02
      type: enum
      description: "Adjustment mode: 00h=absolute value, 02h=relative value"
    - name: DATA03_DATA04
      type: integer
      description: "Adjustment value, 16-bit little-endian (DATA03 low, DATA04 high)"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Response DATA01 FFh = error."

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls profile number selected by 053-10 LENS PROFILE SET. Response DATA01 FFh = error."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Setting: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "Response DATA02: 00h=OFF, 01h=ON."

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Setting: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: enum
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Response DATA01 bitfield: Bit0 lens memory, Bit1 zoom, Bit2 focus, Bit3 lens shift H, Bit4 lens shift V (0=Stop, 1=During operation); Bits 5-7 reserved."

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Response DATA01: 00h=Profile 1, 01h=Profile 2; DATA02 reserved."

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjusted value: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
  notes: "Response: DATA01 status (00h display not possible, 01h adjustment not possible, 02h adjustment possible, FFh gain does not exist), DATA02-05 range upper/lower, DATA06-07 default, DATA08-09 current, DATA10-13 wide/narrow adjustment width, DATA14 default valid (00h invalid, 01h valid)."

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Response: DATA01-03 base model type, DATA04 sound function (00h not available, 01h available), DATA05 profile (00h none, 01h clock, 02h sleep timer, 03h clock+sleep timer). Base model type values in manual Appendix. # UNRESOLVED: appendix table not in source"

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Response: DATA03 power status (00h Standby, 01h Power on, FFh not supported), DATA04 cooling process, DATA05 power on/off process, DATA06 operation status (00h Standby Sleep, 04h Power on, 05h Cooling, 06h Standby error, 0Fh Standby power saving, 10h Network standby, FFh not supported)."

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Response: DATA01 signal switch process, DATA02 signal list number (returned value + 1 = practical number), DATA03 selection signal type 1, DATA04 selection signal type 2 (01h COMPUTER, 02h VIDEO, 03h S-VIDEO, 04h COMPONENT, 07h VIEWER(1-5), 20h DVI-D, 21h HDMI, 22h DisplayPort, 23h VIEWER(6-10)), DATA05 signal list type, DATA06 test pattern display, DATA09 content displayed."

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Response: DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (00h off/not displayed, 01h on/displayed)."

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Response DATA01-32 model name (NUL-terminated string)."

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Response DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Information type: 03h=horizontal synchronous frequency, 04h=vertical synchronous frequency"
  notes: "Response LEN variable; DATA02 string length, DATA03.. label/information string (NUL-terminated)."

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Response DATA01 eco mode value ('Light mode' or 'Lamp mode' depending on projector). Value list in manual Appendix. # UNRESOLVED: appendix table not in source"

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Response DATA01-17 projector name (NUL-terminated string)."

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Response DATA01-06 MAC address."

- id: pip_pbp_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Item: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  notes: "Response DATA02: MODE 00h=PIP, 01h=PICTURE BY PICTURE; START POSITION 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT; sub input values in manual Appendix. # UNRESOLVED: sub input value table not in source"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Response DATA01: 00h=OFF, 01h=ON."

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value. Value list in manual Appendix 'Supplementary Information by Command'. # UNRESOLVED: appendix table not in source"

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
  params:
    - name: DATA01_DATA16
      type: string
      description: "Projector name (up to 16 bytes)"

- id: pip_pbp_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Item: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: enum
      description: "Setting value: MODE 00h=PIP, 01h=PICTURE BY PICTURE; START POSITION 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT; sub input values in manual Appendix # UNRESOLVED: sub input value table not in source"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Response: DATA01-02 base model type, DATA03-11 model name (NUL-terminated), DATA12-13 base model type. Values in manual Appendix. # UNRESOLVED: appendix table not in source"

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Response DATA01-16 serial number (NUL-terminated string)."

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Response: DATA01 operation status (00h Standby Sleep, 04h Power on, 05h Cooling, 06h Standby error, 0Fh Standby power saving, 10h Network standby), DATA02 content displayed, DATA03 selection signal type 1, DATA04 selection signal type 2, DATA05 display signal type (video formats), DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze status."

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal. Values in manual Appendix 'Supplementary Information by Command'. # UNRESOLVED: appendix table not in source"
    - name: DATA02
      type: enum
      description: "Audio source: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
  notes: "Response DATA02 execution result: 00h=success, 01h=error."
```

## Feedbacks
```yaml
- id: error_status
  type: bitfield
  values: [cover_error, fan_error, temperature_error_bimetallic, power_error, lamp_off, lamp_replacement_moratorium, lamp_usage_time_over, formatter_error, fpga_error, temperature_error_sensor, lamp_not_present, lamp_data_error, mirror_cover_error, lamp2_errors, ballast_communication_error, foreign_matter_sensor_error, iris_calibration_error, lens_not_installed, interlock_switch_open, system_error_slave_cpu, system_error_formatter]
  notes: "009 response DATA01-12. Bit=1 means error. DATA09 extended status: Bit1 interlock switch open, Bit2 system error (Slave CPU), Bit3 system error (Formatter)."

- id: power_state
  type: enum
  values: [standby, power_on]
  notes: "078-2 DATA03: 00h Standby, 01h Power on."

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  notes: "078-2 DATA06: 00h, 04h, 05h, 06h, 0Fh, 10h."

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  notes: "078-2 DATA04."

- id: picture_mute_state
  type: enum
  values: [off, on]
  notes: "078-4 DATA01."

- id: sound_mute_state
  type: enum
  values: [off, on]
  notes: "078-4 DATA02."

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  notes: "078-4 DATA03."

- id: input_signal_status
  type: object
  notes: "078-3 response: signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern display, content displayed."

- id: freeze_state
  type: enum
  values: [off, on]
  notes: "305-3 DATA09."

- id: lamp_usage_time
  type: integer
  unit: seconds
  notes: "037 DATA83-86 or 037-4 (content 01h) DATA03-06. Updated one-minute intervals."

- id: lamp_remaining_life
  type: integer
  unit: percent
  notes: "037-4 (content 04h). Negative if replacement deadline exceeded."

- id: filter_usage_time
  type: integer
  unit: seconds
  notes: "037-3 DATA01-04."

- id: carbon_savings
  type: number
  unit: kg
  notes: "037-6: kg (DATA02-05) + mg (DATA06-09)."

- id: model_name
  type: string
  notes: "078-5 DATA01-32, NUL-terminated."

- id: serial_number
  type: string
  notes: "305-2 DATA01-16, NUL-terminated."

- id: lan_mac_address
  type: string
  notes: "097-155 DATA01-06."

- id: lan_projector_name
  type: string
  notes: "097-45 DATA01-17, NUL-terminated."

- id: eco_mode
  type: integer
  notes: "097-8 DATA01. # UNRESOLVED: value meanings in manual Appendix not in source"

- id: edge_blending_mode
  type: enum
  values: [off, on]
  notes: "097-243-1 DATA01."

- id: cover_status
  type: enum
  values: [opened, closed]
  notes: "078-6 DATA01."

- id: lens_operation_status
  type: bitfield
  values: [lens_memory, zoom, focus, lens_shift_h, lens_shift_v]
  notes: "053-7 DATA01 bits; 0=stop, 1=operation."

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  notes: "053-11 DATA01."

- id: sync_frequency_info
  type: string
  notes: "084: horizontal (03h) / vertical (04h) synchronous frequency label strings."

- id: command_error
  type: enum
  values: [unrecognized_command, not_supported, invalid_value, invalid_input_terminal, invalid_language, memory_allocation_error, memory_in_use, value_cannot_be_set, forced_onscreen_mute_on, viewer_error, no_signal, test_pattern_displayed, no_pc_card, memory_operation_error, entry_list_displayed, power_off, execution_failed, no_authority, wrong_gain_number, invalid_gain, adjustment_failed]
  notes: "ERR1/ERR2 pairs in error responses (Axh prefix). See source 2.4 error code list."
```

## Variables
```yaml
# Settable parameters are represented as parameterized Actions (030-1, 030-2,
# 030-12, 030-15, 098-8, 098-45, 098-198, 098-243-1, 319-10).
# No additional variables beyond those actions.
```

## Events
```yaml
# No unsolicited notifications documented in source.
```

## Macros
```yaml
# No multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock
# procedures. Interlock switch appears only as an error-status bit (009 DATA09 Bit1).
```

## Notes
- Binary protocol. Command first byte by type: 00h/01h/02h/03h. Success responses prefix 20h/21h/22h/23h; error responses prefix A0h/A1h/A2h/A3h with `<ERR1> <ERR2>`.
- Checksum (CKS): sum all preceding bytes, take low-order byte. Example: `20h 81h 01h 60h 01h 00h` → 103h → CKS 03h.
- Command bytes 3-4 are `<ID1> <ID2>`: ID1 = control ID set on projector, ID2 = model code. Example command frames show 00h 00h.
- Serial cable must be cross (null-modem) wired to PC CONTROL port (D-SUB 9P): pin2 RxD↔TxD, pin3 TxD↔RxD, pin5 GND, pin7 RTS↔CTS, pin8 CTS↔RTS.
- LAN: TCP port 7142 for send/receive. Some models cannot receive commands in standby mode (see manual Appendix "Standby Mode setting for receiving commands").
- POWER ON/OFF: no other command accepted during power-on, power-off, or cooling.
- Picture/onscreen mute auto-cancel on input or video signal switch; sound mute also cancels on volume adjustment.
- Lamp/filter usage times obtainable in one-second units but updated at one-minute intervals.
- Multi-byte numeric values little-endian (low byte first).
- Wireless LAN control possible via optional wireless LAN unit (see unit's operation manual).

<!-- UNRESOLVED: appendix tables (input terminal values, aspect values, eco mode values, base model type values, PIP sub-input values, standby-mode command reception per model) referenced by source but not included in it -->
<!-- UNRESOLVED: flow control setting not explicitly stated (only pin wiring shown) -->
<!-- UNRESOLVED: default baud rate not stated (115200/38400/19200/9600/4800 all supported) -->
<!-- UNRESOLVED: ID2 model code values per model not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:05:04.878Z
last_checked_at: 2026-09-20T22:18:12.480Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-20T22:18:12.480Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions have verbatim hex command matches in the source's section 3 command catalogue; transport values (baud, parity, port) are sourced directly. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value table, aspect value table, eco mode value table, base model type values, and PIP sub-input values are referenced to a manual Appendix (\"Supplementary Information by Command\") not present in the refined source"
- "flow control not explicitly stated; RTS/CTS pins wired in pin assignment table"
- "appendix table not in source\""
- "value list in manual Appendix not present in source\""
- "target values not enumerated in source section\""
- "sub input value table not in source\""
- "value meanings in manual Appendix not in source\""
- "source contains no explicit safety warnings or interlock"
- "appendix tables (input terminal values, aspect values, eco mode values, base model type values, PIP sub-input values, standby-mode command reception per model) referenced by source but not included in it"
- "flow control setting not explicitly stated (only pin wiring shown)"
- "default baud rate not stated (115200/38400/19200/9600/4800 all supported)"
- "ID2 model code values per model not stated"
- "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
