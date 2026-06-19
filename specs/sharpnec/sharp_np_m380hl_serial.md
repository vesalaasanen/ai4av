---
spec_id: admin/sharp-nec-np-m380hl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-M380HL Control Spec"
manufacturer: Sharp/NEC
model_family: "NP M380HL"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP M380HL"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T07:09:29.966Z
last_checked_at: 2026-06-18T08:36:00.888Z
generated_at: 2026-06-18T08:36:00.888Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value table and aspect value table are referenced in an \"Appendix: Supplementary Information by Command\" that is not present in the source file. Values for DATA01 of 018 INPUT SW CHANGE, 030-12 ASPECT ADJUST, sub-input of 097/098-198, base model type of 078-1/305-1, eco-mode value, and 319-10 input terminal are not enumerated here."
  - "source states \"Full duplex\" communication mode but does not specify hardware/software flow control"
  - "appendix not present in source file.\""
  - "source describes no unsolicited notifications / push events. All"
  - "source documents no named multi-step sequences."
  - "no power-on sequencing voltage/current interlocks stated in source."
  - "firmware version compatibility not stated in source."
  - "Appendix \"Supplementary Information by Command\" (input terminal, aspect, sub-input, eco-mode, base-model-type value tables) not present in source file — several actions reference these tables but cannot be fully enumerated here."
  - "serial flow_control not specified (source only states \"Full duplex\" communication mode)."
  - "factory-default baud rate not stated (only the switchable set is listed)."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:36:00.888Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC NP-M380HL Control Spec

## Summary
Sharp/NEC NP-M380HL is an LCD projector controllable via RS-232C serial or wired/wireless LAN (TCP port 7142). This spec covers the binary command set documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input selection, mute, picture/volume/lens adjustment, status queries, and lens memory control.

<!-- UNRESOLVED: input terminal value table and aspect value table are referenced in an "Appendix: Supplementary Information by Command" that is not present in the source file. Values for DATA01 of 018 INPUT SW CHANGE, 030-12 ASPECT ADJUST, sub-input of 097/098-198, base model type of 078-1/305-1, eco-mode value, and 319-10 input terminal are not enumerated here. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # source: switchable; not a single fixed rate
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: source states "Full duplex" communication mode but does not specify hardware/software flow control
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from 015 POWER ON / 016 POWER OFF commands
  - queryable    # inferred from numerous *REQUEST commands returning state
  - levelable    # inferred from 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 053 LENS CONTROL
  - routable     # inferred from 018 INPUT SW CHANGE / 319-10 AUDIO SELECT SET
```

## Actions
```yaml
actions:
  - id: error_status_request_009
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-12 error bitfield (cover, fan, temperature, lamp, mirror cover, interlock, etc.)."

  - id: power_on_015
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning on power, no other command can be accepted."

  - id: power_off_016
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "While turning off (incl. cooling time), no other command can be accepted."

  - id: input_sw_change_018
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal selector. Example value 06h = video port. Full value table is in source Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not present in source file."
    notes: "Response DATA01=FFh means ended with error (no signal switch). Example payload: 02h 03h 00h 00h 02h 01h 06h 0Eh"

  - id: picture_mute_on_020
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

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

  - id: onscreen_mute_off_025
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust_030_1
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
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
    notes: "Example (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

  - id: volume_adjust_030_2
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
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
    notes: "Example (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

  - id: aspect_adjust_030_12
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Aspect value. Value table is in source Appendix - UNRESOLVED: appendix not present in source file."

  - id: other_adjust_030_15
    label: "030-15. OTHER ADJUST (LAMP/LIGHT ADJUST)"
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    notes: "Adjustment target fixed: DATA01=96h, DATA02=FFh (LAMP ADJUST / LIGHT ADJUST)."

  - id: information_request_037
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90)."

  - id: filter_usage_info_request_037_3
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 = undefined."

  - id: lamp_info_request_037_4
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
    notes: "Example (lamp 1 usage time): 03h 96h 00h 00h 02h 00h 01h 9Ch"

  - id: carbon_savings_info_request_037_6
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: "Returns kilograms (DATA02-05, max 99999) and milligrams (DATA06-09, max 999999)."

  - id: remote_key_code_050
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (see source Key code list)"
      - name: DATA02
        type: integer
        description: "Key code high byte"
    notes: "Examples: 05h/00h=AUTO, 06h/00h=MENU, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO. Full list in source."

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
    command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lens target. Source documents 06h=Periphery Focus; other targets referenced but only 06h enumerated verbatim."
      - name: DATA02
        type: integer
        description: "00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

  - id: lens_control_request_053_1
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lens target selector (matches DATA01 of 053 LENS CONTROL)"
    notes: "Returns upper/lower limits and current value (16-bit each)."

  - id: lens_control_2_053_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lens target; FFh=Stop (mode/value ignored)"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: lens_memory_control_053_3
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control_053_4
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Controls profile selected via 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request_053_5
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set_053_6
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: lens_info_request_053_7
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) - 0=Stop, 1=During operation."

  - id: lens_profile_set_053_10
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request_053_11
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_060_1
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: "Returns status, upper/lower/default/current values, wide/narrow adjustment widths, default-validity."

  - id: setting_request_078_1
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile number (DATA05)."

  - id: running_status_request_078_2
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling/power process flags, operation status (DATA06: 00h=Standby Sleep, 04h=Power on, 05h=Cooling, 06h=Standby error, 0Fh=Standby Power saving, 10h=Network standby)."

  - id: input_status_request_078_3
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal type 1 & 2, signal list type, test pattern, content displayed."

  - id: mute_status_request_078_4
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display flags."

  - id: model_name_request_078_5
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cover_status_request_078_6
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  - id: freeze_control_079
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "01h=freeze on, 02h=freeze off"

  - id: information_string_request_084
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"
    notes: "Returns label string + value string."

  - id: eco_mode_request_097_8
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns DATA01 eco mode value. Value table in source Appendix - UNRESOLVED: appendix not present in source file."

  - id: lan_projector_name_request_097_45
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns projector name (DATA01-17, NUL-terminated)."

  - id: lan_mac_address_request_097_155
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns 6-byte MAC address (DATA01-06)."

  - id: pip_pbp_request_097_198
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request_097_243_1
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns DATA01: 00h=OFF, 01h=ON."

  - id: eco_mode_set_098_8
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Eco mode value. Value table in source Appendix - UNRESOLVED: appendix not present in source file."

  - id: lan_projector_name_set_098_45
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes (DATA01-DATA16), NUL-terminated."

  - id: pip_pbp_set_098_198
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Setting value (mode/position/sub-input). Sub-input value table in source Appendix - UNRESOLVED: appendix not present in source file."

  - id: edge_blending_mode_set_098_243_1
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: base_model_type_request_305_1
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02, DATA12-13), model name (DATA03-11). Value table in source Appendix - UNRESOLVED: appendix not present in source file."

  - id: serial_number_request_305_2
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns 16-byte serial number string (DATA01-16, NUL-terminated)."

  - id: basic_information_request_305_3
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal types, video/sound/onscreen mute flags, freeze status."

  - id: audio_select_set_319_10
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal. Value table in source Appendix - UNRESOLVED: appendix not present in source file."
      - name: DATA02
        type: integer
        description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitfield
    description: "009 ERROR STATUS REQUEST response. DATA01-12 bitfield: cover error, fan error, temperature error (bimetallic/sensor), power error, lamp off, lamp replacement moratorium, lamp usage time exceeded, formatter error, FPGA error, mirror cover error, foreign matter sensor, iris calibration, lens not installed, interlock switch open, system errors."
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "From 078-2 RUNNING STATUS REQUEST DATA03/DATA06."
  - id: input_signal_status
    type: composite
    description: "From 078-3 INPUT STATUS REQUEST: signal switch process, list number, selection signal types 1/2, list type, test pattern, content displayed."
  - id: mute_state
    type: composite
    description: "From 078-4: picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display."
  - id: cover_state
    type: enum
    values: [normal_opened, cover_closed]
  - id: lens_operation_state
    type: bitfield
    description: "053-7 DATA01: lens memory, zoom, focus, lens shift H, lens shift V operation flags."
  - id: command_result
    type: enum
    values: [success, error]
    description: "Every command response. ERR1/ERR2 codes per source §2.4 (00h/00h=unrecognized, 00h/01h=unsupported, 01h/00h=invalid value, 02h/0Dh=power off, 02h/0Eh=execution failed, etc.)."
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    query: "060-1 GAIN PARAMETER REQUEST 3 with DATA01=00h"
    set: "030-1 PICTURE ADJUST with DATA01=00h"
  - id: contrast
    type: integer
    query: "060-1 with DATA01=01h"
    set: "030-1 with DATA01=01h"
  - id: color
    type: integer
    query: "060-1 with DATA01=02h"
    set: "030-1 with DATA01=02h"
  - id: hue
    type: integer
    query: "060-1 with DATA01=03h"
    set: "030-1 with DATA01=03h"
  - id: sharpness
    type: integer
    query: "060-1 with DATA01=04h"
    set: "030-1 with DATA01=04h"
  - id: volume
    type: integer
    query: "060-1 with DATA01=05h"
    set: "030-2 VOLUME ADJUST"
  - id: lamp_light_adjust
    type: integer
    query: "060-1 with DATA01=96h"
    set: "030-15 OTHER ADJUST"
  - id: lamp_usage_time_seconds
    type: integer
    query: "037-4 LAMP INFORMATION REQUEST 3 with DATA02=01h"
  - id: lamp_remaining_life_percent
    type: integer
    query: "037-4 with DATA02=04h"
  - id: filter_usage_time_seconds
    type: integer
    query: "037-3 FILTER USAGE INFORMATION REQUEST"
  - id: eco_mode
    type: integer
    query: "097-8 ECO MODE REQUEST"
    set: "098-8 ECO MODE SET"
  - id: projector_name
    type: string
    query: "097-45 LAN PROJECTOR NAME REQUEST"
    set: "098-45 LAN PROJECTOR NAME SET"
  - id: edge_blending_mode
    type: enum
    values: [off, on]
    query: "097-243-1 EDGE BLENDING MODE REQUEST"
    set: "098-243-1 EDGE BLENDING MODE SET"
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications / push events. All
# data is returned in response to explicit request commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "015 POWER ON: while turning on, no other command is accepted."
  - "016 POWER OFF: while turning off (including cooling time), no other command is accepted."
  - "020/024 PICTURE/ONSCREEN MUTE ON: cleared by input terminal switch or video signal switch."
  - "022 SOUND MUTE ON: cleared by input switch, video signal switch, or volume adjustment."
  - "009 ERROR STATUS bit 'The interlock switch is open' (DATA09 Bit1)."
  - "009 ERROR STATUS bit 'The lens is not installed properly' (DATA04 Bit7)."
# UNRESOLVED: no power-on sequencing voltage/current interlocks stated in source.
```

## Notes
- Command frame format: `20h/21h/22h/23h  <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>` (request/response leading byte differs by command class — see §3). `<ID1>` = projector control ID; `<ID2>` = model code; `<CKS>` = low-byte sum of all preceding bytes; `<LEN>` = data byte count following LEN.
- Error responses share form `A<h>`  `<cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>` with codes per §2.4 (00h/00h unrecognized, 02h/0Dh power-off rejection, 02h/0Fh no authority, etc.).
- Baud rate is switchable across {4800, 9600, 19200, 38400, 115200}; the active rate is whatever the controller configures. No single factory default is stated in source.
- Lamp/filter usage times update at one-minute intervals even though returned in one-second units.
- Lamp remaining life returns negative if replacement deadline is exceeded.
- 097/098-198 sub-input value tables, 018/319-10 input terminal tables, 030-12 aspect value table, eco-mode value table, and 078-1/305-1 base-model-type table are referenced in an "Appendix: Supplementary Information by Command" that is not contained in the supplied source file.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal, aspect, sub-input, eco-mode, base-model-type value tables) not present in source file — several actions reference these tables but cannot be fully enumerated here. -->
<!-- UNRESOLVED: serial flow_control not specified (source only states "Full duplex" communication mode). -->
<!-- UNRESOLVED: factory-default baud rate not stated (only the switchable set is listed). -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T07:09:29.966Z
last_checked_at: 2026-06-18T08:36:00.888Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:36:00.888Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value table and aspect value table are referenced in an \"Appendix: Supplementary Information by Command\" that is not present in the source file. Values for DATA01 of 018 INPUT SW CHANGE, 030-12 ASPECT ADJUST, sub-input of 097/098-198, base model type of 078-1/305-1, eco-mode value, and 319-10 input terminal are not enumerated here."
- "source states \"Full duplex\" communication mode but does not specify hardware/software flow control"
- "appendix not present in source file.\""
- "source describes no unsolicited notifications / push events. All"
- "source documents no named multi-step sequences."
- "no power-on sequencing voltage/current interlocks stated in source."
- "firmware version compatibility not stated in source."
- "Appendix \"Supplementary Information by Command\" (input terminal, aspect, sub-input, eco-mode, base-model-type value tables) not present in source file — several actions reference these tables but cannot be fully enumerated here."
- "serial flow_control not specified (source only states \"Full duplex\" communication mode)."
- "factory-default baud rate not stated (only the switchable set is listed)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
