---
spec_id: admin/sharpnec-np-v332w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP V332W Control Spec"
manufacturer: Sharp/NEC
model_family: "NP V332W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP V332W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:43:28.845Z
last_checked_at: 2026-06-18T08:59:48.406Z
generated_at: 2026-06-18T08:59:48.406Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Appendix \"Supplementary Information by Command\" referenced for input terminal values, aspect values, eco mode values, base model type values, and sub-input setting values — not present in source."
  - "not explicitly stated; RTS/CTS pins cross-wired but \"Full duplex\" mode only documented"
  - "not in source).\""
  - "value list in Appendix, not present in source"
  - "no unsolicited notification documented in source. All responses are replies to commands."
  - "no multi-step sequences documented in source."
  - "Appendix \"Supplementary Information by Command\" referenced for input terminal values, aspect values, eco mode values, base model type values, and PIP/PbP sub-input values — not present in refined source."
  - "flow_control not explicitly stated (RTS/CTS pins cross-wired but only \"Full duplex\" documented)."
  - "firmware version compatibility not stated in source."
  - "which 030-1 PICTURE ADJUST targets and 053 LENS CONTROL DATA01 values apply specifically to NP V332W vs. the broader projector line."
  - "ID1 default value and ID2 model code for NP V332W not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:59:48.406Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions have exact hex-byte command literals confirmed verbatim in source; source command list and spec are 1:1; transport baud rates and TCP port 7142 confirmed. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP V332W Control Spec

## Summary
Sharp/NEC NP V332W projector control spec covering RS-232C serial and wired/wireless LAN (TCP port 7142) interfaces. Binary command protocol with hex-byte payloads, checksum byte, and parameter data fields. 53 documented commands spanning power, input switching, mute, picture/volume/aspect adjust, lens control, lens memory, status queries, eco mode, PIP/PbP, and edge blending.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced for input terminal values, aspect values, eco mode values, base model type values, and sub-input setting values — not present in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source: 115200/38400/19200/9600/4800 bps supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: not explicitly stated; RTS/CTS pins cross-wired but "Full duplex" mode only documented
addressing:
  port: 7142  # TCP, stated: "Use TCP port number 7142 for sending and receiving commands"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # 015 POWER ON / 016 POWER OFF
  - queryable    # numerous status requests (078-*, 305-*, 097-*, etc.)
  - levelable    # 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 053 LENS CONTROL
  - routable     # 018 INPUT SW CHANGE, 319-10 AUDIO SELECT SET
```

## Actions
```yaml
- id: cmd_009_error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00 88 00 00 00 88"
  params: []
  notes: "Response DATA01-DATA12 carry bitfield error info (cover, fan, temp, lamp, formatter, FPGA, mirror cover, interlock switch, etc.)"

- id: cmd_015_power_on
  label: "015. POWER ON"
  kind: action
  command: "02 00 00 00 00 02"
  params: []
  notes: "No other command accepted while power-on in progress."

- id: cmd_016_power_off
  label: "016. POWER OFF"
  kind: action
  command: "02 01 00 00 00 03"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."

- id: cmd_018_input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02 03 00 00 02 01 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal byte (e.g. 06h = video port). Full value list in Appendix 'Supplementary Information by Command' (UNRESOLVED: not in source)."
    - name: cks
      type: integer
      description: "Checksum = low byte of sum of all preceding bytes."

- id: cmd_020_picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02 10 00 00 00 12"
  params: []
  notes: "Cleared by input/video switch."

- id: cmd_021_picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02 11 00 00 00 13"
  params: []

- id: cmd_022_sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02 12 00 00 00 14"
  params: []
  notes: "Cleared by input/video switch or volume adjust."

- id: cmd_023_sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02 13 00 00 00 15"
  params: []

- id: cmd_024_onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02 14 00 00 00 16"
  params: []
  notes: "Cleared by input/video switch."

- id: cmd_025_onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02 15 00 00 00 17"
  params: []

- id: cmd_030_1_picture_adjust
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
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_030_2_volume_adjust
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
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_030_12_aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03 10 00 00 05 18 00 00 {data01} 00 {cks}"
  params:
    - name: data01
      type: integer
      description: "Aspect value. Full list in Appendix 'Supplementary Information by Command' (UNRESOLVED: not in source)."
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_030_15_other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03 10 00 00 05 {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 96h = LAMP ADJUST / LIGHT ADJUST."
    - name: data02
      type: integer
      description: "Sub-target (FFh when DATA01=96h)."
    - name: data03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: data04
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: data05
      type: integer
      description: "Adjustment value (high-order 8 bits)."
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_037_information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03 8A 00 00 00 8D"
  params: []
  notes: "Response DATA01-49 = projector name; DATA83-86 = lamp usage time (sec); DATA87-90 = filter usage time (sec). Updated at 1-min intervals."

- id: cmd_037_3_filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03 95 00 00 00 98"
  params: []
  notes: "Response DATA01-04 = filter usage time (sec); DATA05-08 = filter alarm start time (sec); -1 if undefined."

- id: cmd_037_4_lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03 96 00 00 02 {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lamp: 00h=Lamp1, 01h=Lamp2 (two-lamp models only)."
    - name: data02
      type: integer
      description: "Content: 01h=usage time (sec), 04h=remaining life (%)."
    - name: cks
      type: integer
      description: "Checksum."
  notes: "Negative remaining-life % if replacement deadline exceeded."

- id: cmd_037_6_carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03 9A 00 00 01 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
    - name: cks
      type: integer
      description: "Checksum."
  notes: "Response DATA02-05 = kg (max 99999), DATA06-09 = mg (max 999999)."

- id: cmd_050_remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02 0F 00 00 02 {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte. Documented codes: 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO."
    - name: data02
      type: integer
      description: "Key code high byte (always 00h in documented list)."
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_051_shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02 16 00 00 00 18"
  params: []

- id: cmd_052_shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02 17 00 00 00 19"
  params: []

- id: cmd_053_lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02 18 00 00 02 {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens target: 06h = Periphery Focus. (Other values referenced but not enumerated in source.)"
    - name: data02
      type: integer
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s."
    - name: cks
      type: integer
      description: "Checksum."
  notes: "Send 00h after 7Fh/81h to stop continuous drive."

- id: cmd_053_1_lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02 1C 00 00 02 {data01} 00 {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens target (same values as 053 LENS CONTROL)."
    - name: cks
      type: integer
      description: "Checksum."
  notes: "Response carries upper/lower adjustment limits + current value (DATA02-07)."

- id: cmd_053_2_lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02 1D 00 00 04 {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens target. FFh = Stop (mode/value ignored)."
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative."
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)."
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_053_3_lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02 1E 00 00 01 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_053_4_reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02 1F 00 00 01 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
    - name: cks
      type: integer
      description: "Checksum."
  notes: "Acts on profile number set via 053-10 LENS PROFILE SET."

- id: cmd_053_5_lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02 20 00 00 01 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_053_6_lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02 21 00 00 02 {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: data02
      type: integer
      description: "Setting: 00h=OFF, 01h=ON."
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_053_7_lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02 22 00 00 01 00 25"
  params: []
  notes: "Response DATA01 bitfield: bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift H, bit4=lens shift V (0=stop, 1=operating)."

- id: cmd_053_10_lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02 27 00 00 01 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Profile: 00h=Profile 1, 01h=Profile 2."
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_053_11_lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02 28 00 00 00 2A"
  params: []

- id: cmd_060_1_gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03 05 00 00 03 {data01} 00 00 {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjusted value: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
    - name: cks
      type: integer
      description: "Checksum."
  notes: "Response DATA01=status (00h display-N/A, 01h adjust-N/A, 02h adjustable, FFh no such gain); DATA02-09 limits/default/current; DATA10-13 wide/narrow step."

- id: cmd_078_1_setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00 85 00 00 01 00 86"
  params: []
  notes: "Response DATA01-03 = base model type; DATA04 = sound function; DATA05 = profile/clock/sleep-timer."

- id: cmd_078_2_running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 01 87"
  params: []
  notes: "Response DATA03=power status (00h standby, 01h on); DATA04=cooling; DATA05=power on/off process; DATA06=operation status (00h standby-sleep, 04h power-on, 05h cooling, 06h standby-error, 0Fh power-saving, 10h network standby)."

- id: cmd_078_3_input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 02 88"
  params: []
  notes: "Response DATA01=signal switch process, DATA02=signal list number (returned value is practical-1), DATA03-04=selection signal type, DATA05=signal list type, DATA06=test pattern display, DATA09=content displayed."

- id: cmd_078_4_mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 03 89"
  params: []
  notes: "Response DATA01=picture mute, DATA02=sound mute, DATA03=onscreen mute, DATA04=forced onscreen mute, DATA05=onscreen display."

- id: cmd_078_5_model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00 85 00 00 01 04 8A"
  params: []

- id: cmd_078_6_cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 05 8B"
  params: []
  notes: "Response DATA01: 00h=normal (cover open), 01h=cover closed."

- id: cmd_079_freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01 98 00 00 01 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "01h=freeze ON, 02h=freeze OFF."
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_084_information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00 D0 00 00 03 00 {data01} 01 {cks}"
  params:
    - name: data01
      type: integer
      description: "03h=horizontal sync frequency, 04h=vertical sync frequency."
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_097_8_eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03 B0 00 00 01 07 BB"
  params: []
  notes: "Returns 'Light mode' or 'Lamp mode' value depending on projector. Value list in Appendix (UNRESOLVED: not in source)."

- id: cmd_097_45_lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03 B0 00 00 01 2C E0"
  params: []

- id: cmd_097_155_lan_mac_address_status_request2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03 B0 00 00 02 9A 00 4F"
  params: []

- id: cmd_097_198_pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03 B0 00 00 02 C5 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_097_243_1_edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03 B0 00 00 02 DF 00 94"
  params: []

- id: cmd_098_8_eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03 B1 00 00 02 07 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Eco mode value. Full list in Appendix (UNRESOLVED: not in source)."
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_098_45_lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03 B1 00 00 12 2C {data01..16} 00 {cks}"
  params:
    - name: data01_16
      type: string
      description: "Projector name, up to 16 bytes."
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_098_198_pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03 B1 00 00 03 C5 {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: data02
      type: integer
      description: "Setting: MODE 00h=PIP/01h=PbP; START POS 00h=TL/01h=TR/02h=BL/03h=BR; sub-input values in Appendix (UNRESOLVED)."
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_098_243_1_edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03 B1 00 00 03 DF 00 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Setting: 00h=OFF, 01h=ON."
    - name: cks
      type: integer
      description: "Checksum."

- id: cmd_305_1_base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00 BF 00 00 01 00 C0"
  params: []
  notes: "Response DATA01-02 = base model type; DATA03-11 = model name; DATA12-13 = base model type."

- id: cmd_305_2_serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00 BF 00 00 02 01 06 C8"
  params: []

- id: cmd_305_3_basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00 BF 00 00 01 02 C2"
  params: []
  notes: "Response DATA01=operation status, DATA02=content displayed, DATA03-04=signal type, DATA05=display signal type, DATA06=video mute, DATA07=sound mute, DATA08=onscreen mute, DATA09=freeze status."

- id: cmd_319_10_audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03 C9 00 00 03 09 {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal. Values in Appendix (UNRESOLVED: not in source)."
    - name: data02
      type: integer
      description: "Setting: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
    - name: cks
      type: integer
      description: "Checksum."
```

## Feedbacks
```yaml
- id: error_status
  type: bitfield
  description: "009 ERROR STATUS REQUEST response. DATA01-DATA12 bitfield: cover error, fan error, temperature (bi-metallic + sensor), power error, lamp off, lamp replacement moratorium, lamp usage exceeded, formatter error, FPGA error, mirror cover, foreign-matter sensor, iris calibration, lens-not-installed, interlock switch open, system errors."
  values: []

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 DATA06 / 305-3 DATA01"

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  source: "078-2 DATA04"

- id: input_signal
  type: composite
  description: "078-3 / 305-3 response: signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern display, content displayed."
  values: []

- id: mute_state
  type: bitfield
  description: "078-4 DATA01-05: picture, sound, onscreen, forced onscreen, onscreen display."
  values: []

- id: cover_state
  type: enum
  values: [normal_open, closed]
  source: "078-6 DATA01"

- id: lens_operation_state
  type: bitfield
  description: "053-7 DATA01: bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift H, bit4 lens shift V."
  values: []

- id: gain_parameter
  type: composite
  description: "060-1 response: status, upper/lower limits, default, current, wide/narrow step, default validity."
  values: []

- id: eco_mode
  type: enum
  values: []  # UNRESOLVED: value list in Appendix, not present in source
  source: "097-8 / 098-8"

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1 DATA01"

- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]
  source: "097-198 DATA02 (when DATA01=00h MODE)"

- id: pip_pbp_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]
  source: "097-198 DATA02 (when DATA01=01h START POSITION)"
```

## Variables
```yaml
- id: lamp_usage_time_seconds
  type: integer
  unit: seconds
  access: read
  source: "037 DATA83-86 / 037-4 DATA03-06 (content 01h)"

- id: lamp_remaining_life_percent
  type: integer
  unit: percent
  access: read
  source: "037-4 DATA03-06 (content 04h). Negative if past replacement deadline."

- id: filter_usage_time_seconds
  type: integer
  unit: seconds
  access: read
  source: "037 DATA87-90 / 037-3 DATA01-04"

- id: filter_alarm_start_time_seconds
  type: integer
  unit: seconds
  access: read
  source: "037-3 DATA05-08 (-1 if undefined)"

- id: carbon_savings_kg
  type: integer
  unit: kilograms
  access: read
  source: "037-6 DATA02-05 (max 99999)"

- id: carbon_savings_mg
  type: integer
  unit: milligrams
  access: read
  source: "037-6 DATA06-09 (max 999999)"

- id: projector_name
  type: string
  access: read_write
  source: "037 / 097-45 / 098-45 (max 16 bytes)"

- id: mac_address
  type: string
  access: read
  source: "097-155 DATA01-06"

- id: serial_number
  type: string
  access: read
  source: "305-2 DATA01-16"

- id: picture_brightness
  type: integer
  access: read_write
  source: "030-1 (DATA01=00h) / 060-1 (DATA01=00h)"

- id: picture_contrast
  type: integer
  access: read_write
  source: "030-1 (DATA01=01h) / 060-1 (DATA01=01h)"

- id: picture_color
  type: integer
  access: read_write
  source: "030-1 (DATA01=02h) / 060-1 (DATA01=02h)"

- id: picture_hue
  type: integer
  access: read_write
  source: "030-1 (DATA01=03h) / 060-1 (DATA01=03h)"

- id: picture_sharpness
  type: integer
  access: read_write
  source: "030-1 (DATA01=04h) / 060-1 (DATA01=04h)"

- id: volume
  type: integer
  access: read_write
  source: "030-2 / 060-1 (DATA01=05h)"

- id: lamp_light_adjust
  type: integer
  access: read_write
  source: "030-15 (DATA01=96h) / 060-1 (DATA01=96h)"

- id: lens_position
  type: composite
  access: read_write
  source: "053 / 053-1 / 053-2"
  description: "Per-target lens position with upper/lower limits and current value."

- id: aspect
  type: enum
  access: read_write
  values: []  # UNRESOLVED: value list in Appendix, not present in source
  source: "030-12 / 078-3"
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification documented in source. All responses are replies to commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: "015. POWER ON"
    note: "No other command accepted while power-on in progress."
    source: "§3.2"
  - command: "016. POWER OFF"
    note: "No other command accepted during power-off incl. cooling time."
    source: "§3.3"
  - command: "050. REMOTE KEY CODE (POWER ON/OFF)"
    note: "POWER ON (02h) and POWER OFF (03h) key codes map to safety-critical power transitions."
    source: "§3.19 Key code list"
# Error-path: ERR1=02h ERR2=0Dh 'command cannot be accepted because the power is off' acts as soft interlock for non-power commands.
# Lens cover / mirror cover / interlock switch open surfaced via 009 ERROR STATUS REQUEST bitfields - informational only, no documented procedural interlock.
```

## Notes
- Command framing: every command is a hex-byte sequence. Byte 0 = message-type prefix (00h/01h/02h/03h for commands, 20h/21h/22h/23h for success responses, A0h/A1h/A2h/A3h for error responses). Final byte = checksum = low-order byte of sum of all preceding bytes.
- Responses with ID1=<control ID set on projector> and ID2=<model code>.
- Source document: BDT140013 Revision 7.1. Document scope: "Projector Control Command Reference Manual" — generic across Sharp/NEC projector line, not V332W-specific. Model applicability per command varies; values marked UNRESOLVED live in the referenced "Appendix: Supplementary Information by Command" which was not in the refined source.
- RS-232C uses D-SUB 9P cross cable (pin 2 RxD↔TxD, pin 3 TxD↔RxD, pin 5 GND, pin 7 RTS↔CTS, pin 8 CTS↔RTS).
- LAN: wired RJ-45 (10/100 Mbps auto) or wireless LAN unit (see projector operation manual).
- Usage-time telemetry updates at 1-minute granularity despite 1-second resolution.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced for input terminal values, aspect values, eco mode values, base model type values, and PIP/PbP sub-input values — not present in refined source. -->
<!-- UNRESOLVED: flow_control not explicitly stated (RTS/CTS pins cross-wired but only "Full duplex" documented). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: which 030-1 PICTURE ADJUST targets and 053 LENS CONTROL DATA01 values apply specifically to NP V332W vs. the broader projector line. -->
<!-- UNRESOLVED: ID1 default value and ID2 model code for NP V332W not stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:43:28.845Z
last_checked_at: 2026-06-18T08:59:48.406Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:59:48.406Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions have exact hex-byte command literals confirmed verbatim in source; source command list and spec are 1:1; transport baud rates and TCP port 7142 confirmed. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Appendix \"Supplementary Information by Command\" referenced for input terminal values, aspect values, eco mode values, base model type values, and sub-input setting values — not present in source."
- "not explicitly stated; RTS/CTS pins cross-wired but \"Full duplex\" mode only documented"
- "not in source).\""
- "value list in Appendix, not present in source"
- "no unsolicited notification documented in source. All responses are replies to commands."
- "no multi-step sequences documented in source."
- "Appendix \"Supplementary Information by Command\" referenced for input terminal values, aspect values, eco mode values, base model type values, and PIP/PbP sub-input values — not present in refined source."
- "flow_control not explicitly stated (RTS/CTS pins cross-wired but only \"Full duplex\" documented)."
- "firmware version compatibility not stated in source."
- "which 030-1 PICTURE ADJUST targets and 053 LENS CONTROL DATA01 values apply specifically to NP V332W vs. the broader projector line."
- "ID1 default value and ID2 model code for NP V332W not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
