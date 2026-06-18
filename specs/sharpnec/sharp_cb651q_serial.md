---
spec_id: admin/sharp-nec-cb651q
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Cb651Q Control Spec"
manufacturer: Sharp/NEC
model_family: Cb651Q
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - Cb651Q
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:41:17.059Z
last_checked_at: 2026-06-17T19:40:31.247Z
generated_at: 2026-06-17T19:40:31.247Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "control ID (ID1) default and model code (ID2) for this model are not stated in this manual; values referenced in responses as <ID1> <ID2>. The Appendix \"Supplementary Information by Command\" (input terminal codes, aspect values, eco-mode values, base-model-type codes) is not present in this refined excerpt."
  - "source states \"Full duplex\" communication mode but no explicit flow_control; pinout exposes RTS/CTS"
  - "source does not document any unsolicited event/notification mechanism."
  - "source does not define separately settable numeric variables outside the action set."
  - "source does not document any unsolicited event/notification messages from the projector."
  - "source does not document any named multi-step macros."
  - "source does not describe safety interlock procedures, power-on sequencing"
  - "default control ID (ID1) and model code (ID2) for the Cb651Q are not stated in this manual — `<ID1>` and `<ID2>` placeholders appear in every response frame and must be substituted at runtime."
  - "Appendix 'Supplementary Information by Command' (input terminal codes, aspect values, eco-mode values, base-model-type codes, sub-input setting values) is not present in this refined excerpt; several parameterized actions reference it for valid enum values."
  - "source does not state firmware-version compatibility ranges."
  - "serial flow_control not explicitly stated (pinout exposes RTS/CTS; source states 'Full duplex' communication mode only)."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:40:31.247Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched word-for-word with source hex opcodes; transport parameters verified; bidirectional coverage complete. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Cb651Q Control Spec

## Summary
Sharp/NEC Cb651Q projector control spec covering the binary RS-232C and TCP/IP (LAN) control protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1). Commands are fixed-length hex frames with a trailing additive checksum byte.

<!-- UNRESOLVED: control ID (ID1) default and model code (ID2) for this model are not stated in this manual; values referenced in responses as <ID1> <ID2>. The Appendix "Supplementary Information by Command" (input terminal codes, aspect values, eco-mode values, base-model-type codes) is not present in this refined excerpt. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all five as supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode but no explicit flow_control; pinout exposes RTS/CTS
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: 015 POWER ON / 016 POWER OFF commands present
  - routable        # inferred: 018 INPUT SW CHANGE present
  - queryable       # inferred: large catalogue of status/Information requests (037, 078, 097, 305, etc.)
  - levelable       # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST / 053 LENS CONTROL
```

## Actions
```yaml
actions:
  # --- Status / Error queries ---
  - id: error_status_request_009
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00 88 00 00 00 88"
    params: []
    notes: "Response: 20 88 <ID1> <ID2> 0C <DATA01..DATA12> <CKS>; DATA01..DATA12 = bit-packed error flags (0=normal, 1=error). See source §3.1 for full error-bit map."

  # --- Power ---
  - id: power_on_015
    label: "015. POWER ON"
    kind: action
    command: "02 00 00 00 00 02"
    params: []
    notes: "No other command accepted while power-on in progress. Response: 22 00 <ID1> <ID2> 00 <CKS>; error: A2 00 <ID1> <ID2> 02 <ERR1> <ERR2> <CKS>."

  - id: power_off_016
    label: "016. POWER OFF"
    kind: action
    command: "02 01 00 00 00 03"
    params: []
    notes: "No other command accepted while power-off (incl. cooling time) in progress. Response: 22 01 <ID1> <ID2> 00 <CKS>; error: A2 01 <ID1> <ID2> 02 <ERR1> <ERR2> <CKS>."

  # --- Input routing ---
  - id: input_switch_018
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02 03 00 00 02 01 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal code (1 byte hex). Source example: 06h = video port. Full code table is in Appendix 'Supplementary Information by Command' (not present in this excerpt)."
    notes: "Response: 22 03 <ID1> <ID2> 01 <DATA01> <CKS> (DATA01=FFh => ended with error, no switch made)."

  # --- Mute (picture / sound / onscreen) ---
  - id: picture_mute_on_020
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02 10 00 00 00 12"
    params: []
    notes: "Picture mute cancels on input/video-signal switch. Response: 22 10 <ID1> <ID2> 00 <CKS>."

  - id: picture_mute_off_021
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02 11 00 00 00 13"
    params: []
    notes: "Response: 22 11 <ID1> <ID2> 00 <CKS>."

  - id: sound_mute_on_022
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02 12 00 00 00 14"
    params: []
    notes: "Sound mute cancels on input/video-signal switch or volume adjustment. Response: 22 12 <ID1> <ID2> 00 <CKS>."

  - id: sound_mute_off_023
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02 13 00 00 00 15"
    params: []
    notes: "Response: 22 13 <ID1> <ID2> 00 <CKS>."

  - id: onscreen_mute_on_024
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02 14 00 00 00 16"
    params: []
    notes: "Onscreen mute cancels on input/video-signal switch. Response: 22 14 <ID1> <ID2> 00 <CKS>."

  - id: onscreen_mute_off_025
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02 15 00 00 00 17"
    params: []
    notes: "Response: 22 15 <ID1> <ID2> 00 <CKS>."

  # --- Picture / Volume / Aspect / Other adjust ---
  - id: picture_adjust_030_1
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03 10 00 00 05 {data01} FF {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: data02
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)."
    notes: "Response: 23 10 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS> (0000h = success, else error)."

  - id: volume_adjust_030_2
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03 10 00 00 05 05 00 {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data02
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data03
        type: integer
        description: "Adjustment value (high-order 8 bits)."
    notes: "Response: 23 10 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS> (0000h = success)."

  - id: aspect_adjust_030_12
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03 10 00 00 05 18 00 00 {data01} 00 {cks}"
    params:
      - name: data01
        type: integer
        description: "Aspect value (1 byte hex). Full code table in Appendix 'Supplementary Information by Command' (not present in this excerpt)."
    notes: "Response: 23 10 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>."

  - id: other_adjust_030_15
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03 10 00 00 05 {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment target high byte (96h with DATA02=FFh = LAMP ADJUST / LIGHT ADJUST per source)."
      - name: data02
        type: integer
        description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)."
      - name: data03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data04
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data05
        type: integer
        description: "Adjustment value (high-order 8 bits)."
    notes: "Response: 23 10 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>."

  # --- Information requests ---
  - id: information_request_037
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03 8A 00 00 00 8D"
    params: []
    notes: "Response: 23 8A <ID1> <ID2> 62 <DATA01..DATA98> <CKS>. DATA01..49=Projector name; DATA83..86=Lamp usage time (sec); DATA87..90=Filter usage time (sec). Updated at 1-minute intervals."

  - id: filter_usage_request_037_3
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03 95 00 00 00 98"
    params: []
    notes: "Response: 23 95 <ID1> <ID2> 08 <DATA01..DATA08> <CKS>. DATA01..04=Filter usage time (sec); DATA05..08=Filter alarm start time (sec, -1 if undefined)."

  - id: lamp_info_request_037_4
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03 96 00 00 02 {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
      - name: data02
        type: integer
        description: "Content: 01h=Lamp usage time (sec), 04h=Lamp remaining life (%)."
    notes: "Response: 23 96 <ID1> <ID2> 06 <DATA01..DATA06> <CKS>. Negative remaining-life value if replacement deadline exceeded. Updated at 1-minute intervals."

  - id: carbon_savings_request_037_6
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03 9A 00 00 01 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
    notes: "Response: 23 9A <ID1> <ID2> 09 <DATA01..DATA09> <CKS>. DATA02..05=kg (max 99999), DATA06..09=mg (max 999999)."

  # --- Remote key code ---
  - id: remote_key_code_050
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02 0F 00 00 02 {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Key code low byte (WORD). See source key-code table: 02h/00h=POWER ON, 03h/00h=POWER OFF, 05h/00h=AUTO, 06h/00h=MENU, 07h/00h=UP, 08h/00h=DOWN, 09h/00h=RIGHT, 0Ah/00h=LEFT, 0Bh/00h=ENTER, 0Ch/00h=EXIT, 0Dh/00h=HELP, 0Fh/00h=MAGNIFY UP, 10h/00h=MAGNIFY DOWN, 13h/00h=MUTE, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, 4Ch/00h=COMPUTER2, 4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1, 84h/00h=VOLUME UP, 85h/00h=VOLUME DOWN, 8Ah/00h=FREEZE, A3h/00h=ASPECT, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO."
      - name: data02
        type: integer
        description: "Key code high byte (WORD) - 00h for all listed key codes."
    notes: "Response: 22 0F <ID1> <ID2> 01 <DATA01> <CKS> (DATA01=FFh => ended with error)."

  # --- Shutter ---
  - id: shutter_close_051
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02 16 00 00 00 18"
    params: []
    notes: "Response: 22 16 <ID1> <ID2> 00 <CKS>."

  - id: shutter_open_052
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02 17 00 00 00 19"
    params: []
    notes: "Response: 22 17 <ID1> <ID2> 00 <CKS>."

  # --- Lens control family ---
  - id: lens_control_053
    label: "053. LENS CONTROL"
    kind: action
    command: "02 18 00 00 02 {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Lens function selector. 06h=Periphery Focus. (Other selector values per source; full list see Appendix 'Supplementary Information by Command'.)"
      - name: data02
        type: integer
        description: "Drive content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous plus, 81h=continuous minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s."
    notes: "After 7Fh/81h, send DATA02=00h to stop driving. Response: 22 18 <ID1> <ID2> 01 <DATA01> <CKS> (FFh => error)."

  - id: lens_control_request_053_1
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02 1C 00 00 02 {data01} 00 {cks}"
    params:
      - name: data01
        type: integer
        description: "Lens function selector (same encoding as 053 LENS CONTROL DATA01; 06h=Periphery Focus)."
    notes: "Response: 22 1C <ID1> <ID2> 08 <DATA01> 00 <DATA02..DATA07> <CKS>: upper-limit, lower-limit, current value (each 16-bit, low then high)."

  - id: lens_control_2_053_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02 1D 00 00 04 {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: integer
        description: "Lens function selector. FFh=Stop (mode/value ignored)."
      - name: data02
        type: integer
        description: "Adjustment mode: 00h=absolute, 02h=relative."
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)."
    notes: "Response: 22 1D <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>."

  - id: lens_memory_control_053_3
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02 1E 00 00 01 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
    notes: "Response: 22 1E <ID1> <ID2> 02 <DATA01> <DATA02> <CKS> (DATA02=FFh => error)."

  - id: reference_lens_memory_control_053_4
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02 1F 00 00 01 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
    notes: "Operates on the profile selected via 053-10 LENS PROFILE SET. Response: 22 1F <ID1> <ID2> 02 <DATA01> <DATA02> <CKS> (DATA02=FFh => error)."

  - id: lens_memory_option_request_053_5
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02 20 00 00 01 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Option selector: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    notes: "Response: 22 20 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS> (DATA02=setting value 00h=OFF, 01h=ON)."

  - id: lens_memory_option_set_053_6
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02 21 00 00 02 {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Option selector: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: data02
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON."
    notes: "Response: 23 21 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>."

  - id: lens_information_request_053_7
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02 22 00 00 01 00 25"
    params: []
    notes: "Response: 22 22 <ID1> <ID2> 02 00 <DATA01> <CKS>. DATA01 bit0=Lens memory, bit1=Zoom, bit2=Focus, bit3=Lens Shift (H), bit4=Lens Shift (V) (0=stop, 1=operation)."

  - id: lens_profile_set_053_10
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02 27 00 00 01 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2."
    notes: "Response: 22 27 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>."

  - id: lens_profile_request_053_11
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02 28 00 00 00 2A"
    params: []
    notes: "Response: 22 28 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>. DATA01=00h=Profile 1, 01h=Profile 2; DATA02 reserved."

  # --- Gain parameter request ---
  - id: gain_parameter_request_060_1
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03 05 00 00 03 {data01} 00 00 {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST / LIGHT ADJUST."
    notes: "Response: 23 05 <ID1> <ID2> 10 <DATA01..DATA16> <CKS>. DATA01=adjustability status (00/01/02/FF), DATA02..05=range, DATA06..07=default, DATA08..09=current, DATA10..13=wide/narrow step, DATA14=default validity."

  # --- Projector status requests (078 family) ---
  - id: setting_request_078_1
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00 85 00 00 01 00 86"
    params: []
    notes: "Response: 20 85 <ID1> <ID2> 20 <DATA01..DATA32> <CKS>. DATA01..03=Base model type; DATA04=Sound function; DATA05=Profile number (00h=none, 01h=clock, 02h=sleep timer, 03h=both)."

  - id: running_status_request_078_2
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 01 87"
    params: []
    notes: "Response: 20 85 <ID1> <ID2> 10 <DATA01..DATA16> <CKS>. DATA03=Power status (00h=Standby, 01h=Power on, FFh=unsupported); DATA04=Cooling process; DATA05=Power On/Off process; DATA06=Operation status (00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby)."

  - id: input_status_request_078_3
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 02 88"
    params: []
    notes: "Response: 20 85 <ID1> <ID2> 10 <DATA01..DATA16> <CKS>. DATA01=signal switch process; DATA02=signal list number (-1 of practical); DATA03/04=selection signal type; DATA05=signal list type; DATA06=test pattern; DATA09=content displayed."

  - id: mute_status_request_078_4
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 03 89"
    params: []
    notes: "Response: 20 85 <ID1> <ID2> 10 <DATA01..DATA16> <CKS>. DATA01=Picture mute, DATA02=Sound mute, DATA03=Onscreen mute, DATA04=Forced onscreen mute, DATA05=Onscreen display (00h/01h each)."

  - id: model_name_request_078_5
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00 85 00 00 01 04 8A"
    params: []
    notes: "Response: 20 85 <ID1> <ID2> 20 <DATA01..DATA32> <CKS> = model name (NUL-terminated)."

  - id: cover_status_request_078_6
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 05 8B"
    params: []
    notes: "Response: 20 85 <ID1> <ID2> 01 <DATA01> <CKS>. DATA01=00h=Normal (cover opened), 01h=Cover closed."

  # --- Freeze ---
  - id: freeze_control_079
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01 98 00 00 01 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "01h=Freeze ON, 02h=Freeze OFF."
    notes: "Response: 21 98 <ID1> <ID2> 01 <DATA01> <CKS>; error: A1 98 <ID1> <ID2> 02 <ERR1> <ERR2> <CKS>."

  # --- Information string request ---
  - id: information_string_request_084
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00 D0 00 00 03 00 {data01} 01 {cks}"
    params:
      - name: data01
        type: integer
        description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency."
    notes: "Response: 20 D0 <ID1> <ID2> LEN <DATA01> 01 <DATA02..??> <CKS>. DATA02=string length, DATA03..=label/info strings (NUL-terminated)."

  # --- 097 family (settings requests) ---
  - id: eco_mode_request_097_8
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03 B0 00 00 01 07 BB"
    params: []
    notes: "Response: 23 B0 <ID1> <ID2> 02 07 <DATA01> <CKS>. DATA01=eco-mode value (code table in Appendix, not present in this excerpt). Returns 'Light mode' or 'Lamp mode' value depending on projector."

  - id: lan_projector_name_request_097_45
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03 B0 00 00 01 2C E0"
    params: []
    notes: "Response: 23 B0 <ID1> <ID2> 12 2C <DATA01..DATA17> <CKS> = projector name (NUL-terminated)."

  - id: lan_mac_address_request_097_155
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03 B0 00 00 02 9A 00 4F"
    params: []
    notes: "Response: 23 B0 <ID1> <ID2> 08 9A 00 <DATA01..DATA06> <CKS> = MAC address (6 bytes)."

  - id: pip_pbypicture_request_097_198
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03 B0 00 00 02 C5 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Selector: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    notes: "Response: 23 B0 <ID1> <ID2> 03 C5 <DATA01> <DATA02> <CKS>. DATA02 meaning depends on selector (MODE: 00h=PIP/01h=PICTURE BY PICTURE; START POSITION: 00h..03h corners; sub inputs per Appendix)."

  - id: edge_blending_mode_request_097_243_1
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03 B0 00 00 02 DF 00 94"
    params: []
    notes: "Response: 23 B0 <ID1> <ID2> 03 DF 00 <DATA01> <CKS>. DATA01=00h=OFF, 01h=ON."

  # --- 098 family (settings set) ---
  - id: eco_mode_set_098_8
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03 B1 00 00 02 07 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Eco-mode value (code table in Appendix, not present in this excerpt). Sets 'Light mode' or 'Lamp mode' depending on projector."
    notes: "Response: 23 B1 <ID1> <ID2> 02 07 <DATA01> <CKS>."

  - id: lan_projector_name_set_098_45
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03 B1 00 00 12 2C {data01..data16} 00 {cks}"
    params:
      - name: data01_to_data16
        type: string
        description: "Projector name ASCII bytes, up to 16 bytes, NUL-padded."
    notes: "Response: 23 B1 <ID1> <ID2> 02 2C <DATA01> <CKS>."

  - id: pip_pbypicture_set_098_198
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03 B1 00 00 03 C5 {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Selector: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: data02
        type: integer
        description: "Setting value (depends on selector; see source §3.48)."
    notes: "Response: 23 B1 <ID1> <ID2> 03 C5 <DATA01> <DATA02> <CKS>. Note: source's response DATA01 encoding differs (00h=MODE, 03h=SUB INPUT 2, 04h=SUB INPUT 3) from command selector."

  - id: edge_blending_mode_set_098_243_1
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03 B1 00 00 03 DF 00 {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON."
    notes: "Response: 23 B1 <ID1> <ID2> 03 DF 00 <DATA01> <CKS>."

  # --- 305 family ---
  - id: base_model_type_request_305_1
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00 BF 00 00 01 00 C0"
    params: []
    notes: "Response: 20 BF <ID1> <ID2> 10 00 <DATA01..DATA15> <CKS>. DATA01..02=base model type; DATA03..11=model name; DATA12..13=base model type; DATA14..15=reserved. Code table in Appendix."

  - id: serial_number_request_305_2
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00 BF 00 00 02 01 06 C8"
    params: []
    notes: "Response: 20 BF <ID1> <ID2> 12 01 06 <DATA01..DATA16> <CKS> = serial number (NUL-terminated)."

  - id: basic_information_request_305_3
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00 BF 00 00 01 02 C2"
    params: []
    notes: "Response: 20 BF <ID1> <ID2> 10 02 <DATA01..DATA15> <CKS>. DATA01=operation status, DATA02=content displayed, DATA03/04=signal types, DATA05=display signal type, DATA06..09=video/sound/onscreen/freeze mute states."

  # --- 319 family ---
  - id: audio_select_set_319_10
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03 C9 00 00 03 09 {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal code (full code table in Appendix, not present in this excerpt)."
      - name: data02
        type: integer
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
    notes: "Response: 23 C9 <ID1> <ID2> 03 09 <DATA01> <DATA02> <CKS>. DATA02=00h success, 01h error."
```

## Feedbacks
```yaml
feedbacks:
  # The 078/305 query commands above ARE the feedback sources; their responses are documented in each action's notes.
  # No separate unsolicited feedback channel documented; all status is response-driven.
  # UNRESOLVED: source does not document any unsolicited event/notification mechanism.
```

## Variables
```yaml
# UNRESOLVED: source does not define separately settable numeric variables outside the action set.
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited event/notification messages from the projector.
```

## Macros
```yaml
# UNRESOLVED: source does not document any named multi-step macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not describe safety interlock procedures, power-on sequencing
# requirements, or confirmation steps. Note only: POWER ON and POWER OFF commands
# lock out all other commands during execution (incl. cooling time). Source mentions
# an interlock switch bit in the 009 ERROR STATUS response (DATA09 bit1 = "interlock
# switch is open"), but no operational interlock procedure is documented here.
```

## Notes
- Checksum rule (verbatim from source §2.2): add all preceding bytes; use the low-order one byte of the sum.
- Example from source: `20h 81h 01h 60h 01h 00h` → sum=103h → CKS=03h.
- Command frames are always prefixed with a header byte indicating direction/message class:
  - `00h`/`01h`/`02h`/`03h` = command (host→projector); first nibble distinguishes parameter count.
  - `20h`/`21h`/`22h`/`23h` = response success (projector→host).
  - `A0h`/`A1h`/`A2h`/`A3h` = response with error (carries ERR1/ERR2).
- Power-state and cooling-state locks: during POWER ON / POWER OFF (incl. cooling time), no other command is accepted.
- Lamp usage time and filter usage time are reported in seconds; values are refreshed at 1-minute intervals.
- Two-lamp projector models: 037-4 LAMP INFORMATION REQUEST DATA01=01h (Lamp 2) is effective only on two-lamp models.
- Error codes ERR1/ERR2: full 22-code table is documented in source §2.4 (00h..03h ranges covering unrecognized command, unsupported, invalid value, invalid input, memory errors, forced mute, no signal, power-off rejection, no authority, gain errors, etc.).

<!-- UNRESOLVED: default control ID (ID1) and model code (ID2) for the Cb651Q are not stated in this manual — `<ID1>` and `<ID2>` placeholders appear in every response frame and must be substituted at runtime. -->
<!-- UNRESOLVED: Appendix 'Supplementary Information by Command' (input terminal codes, aspect values, eco-mode values, base-model-type codes, sub-input setting values) is not present in this refined excerpt; several parameterized actions reference it for valid enum values. -->
<!-- UNRESOLVED: source does not state firmware-version compatibility ranges. -->
<!-- UNRESOLVED: serial flow_control not explicitly stated (pinout exposes RTS/CTS; source states 'Full duplex' communication mode only). -->
```

Spec done. 53 commands all enumerated verbatim. Both serial + TCP transports documented. No fabricated values — baud rate from source (5 rates listed), port 7142 from source, ID1/ID2/Appendix codes marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:41:17.059Z
last_checked_at: 2026-06-17T19:40:31.247Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:40:31.247Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched word-for-word with source hex opcodes; transport parameters verified; bidirectional coverage complete. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "control ID (ID1) default and model code (ID2) for this model are not stated in this manual; values referenced in responses as <ID1> <ID2>. The Appendix \"Supplementary Information by Command\" (input terminal codes, aspect values, eco-mode values, base-model-type codes) is not present in this refined excerpt."
- "source states \"Full duplex\" communication mode but no explicit flow_control; pinout exposes RTS/CTS"
- "source does not document any unsolicited event/notification mechanism."
- "source does not define separately settable numeric variables outside the action set."
- "source does not document any unsolicited event/notification messages from the projector."
- "source does not document any named multi-step macros."
- "source does not describe safety interlock procedures, power-on sequencing"
- "default control ID (ID1) and model code (ID2) for the Cb651Q are not stated in this manual — `<ID1>` and `<ID2>` placeholders appear in every response frame and must be substituted at runtime."
- "Appendix 'Supplementary Information by Command' (input terminal codes, aspect values, eco-mode values, base-model-type codes, sub-input setting values) is not present in this refined excerpt; several parameterized actions reference it for valid enum values."
- "source does not state firmware-version compatibility ranges."
- "serial flow_control not explicitly stated (pinout exposes RTS/CTS; source states 'Full duplex' communication mode only)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
