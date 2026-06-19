---
spec_id: admin/sharp-nec-v984q-mpi
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC V984Q Mpi Control Spec"
manufacturer: Sharp/NEC
model_family: "V984Q Mpi"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "V984Q Mpi"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:00:07.529Z
last_checked_at: 2026-06-19T07:45:42.468Z
generated_at: 2026-06-19T07:45:42.468Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-code (ID2) value for this specific model not stated in the command reference; control-ID (ID1) default assumed 00h. Appendix \"Supplementary Information by Command\" (input-terminal values, aspect values, eco-mode values, base-model-type values, sub-input values) not included in the refined source excerpt."
  - "flow control not stated in source (full-duplex mode stated, not flow control)"
  - "exact eco-mode enum values not in refined source excerpt"
  - "absolute min/max not stated in refined excerpt"
  - "target enumeration incomplete in refined excerpt (only 06h=Periphery Focus shown)"
  - "no macros documented."
  - "no explicit safety interlock procedures, power-on sequencing"
  - "Appendix \"Supplementary Information by Command\" (input-terminal values, aspect values, eco-mode values, base-model-type values, sub-input setting values) was not part of the refined source excerpt and could not be transcribed."
  - "model code (ID2) for V984Q Mpi not stated; control ID (ID1) default of 00h assumed."
  - "firmware version compatibility, protocol version number, and absolute numeric ranges for gain parameters not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:45:42.468Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source commands with confirmed transport parameters; bidirectional coverage is complete (1:1 ratio). (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC V984Q Mpi Control Spec

## Summary
Sharp/NEC V984Q Mpi large-format display / projector controlled via RS-232C serial (PC CONTROL D-SUB 9P) or wired/wireless LAN using TCP port 7142. Binary framed protocol: each command is a hex byte sequence terminated by a checksum byte (low-order 8 bits of the sum of all preceding bytes). Manual reference BDT140013 Rev 7.1 enumerates 53 distinct commands covering power, input switching, mutes, picture/volume/aspect adjustment, lens control & memory, status queries, eco mode, PIP/PbP, edge blending, and audio select.

<!-- UNRESOLVED: model-code (ID2) value for this specific model not stated in the command reference; control-ID (ID1) default assumed 00h. Appendix "Supplementary Information by Command" (input-terminal values, aspect values, eco-mode values, base-model-type values, sub-input values) not included in the refined source excerpt. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: "115200, 38400, 19200, 9600, 4800"  # source lists all five as supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (full-duplex mode stated, not flow control)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many status REQUEST commands return values
  - routable     # inferred: INPUT SW CHANGE selects input terminal
  - levelable    # inferred: VOLUME ADJUST, PICTURE ADJUST (brightness/contrast/etc.), LENS CONTROL
```

## Actions
```yaml
# All command payloads are the literal hex byte sequences documented in the
# source, verbatim. <DATA??> = variable parameter byte(s); <CKS> = checksum
# (low-order 8 bits of the sum of all preceding bytes, including ID1/ID2 when
# present). Default framing uses ID1=00h (control ID 0), ID2=model code.

- id: c009_error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h  88h  00h  00h  00h  88h"
  params: []

- id: c015_power_on
  label: "015. POWER ON"
  kind: action
  command: "02h  00h  00h  00h  00h  02h"
  params: []
  notes: "While turning on power, no other command accepted."

- id: c016_power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h  01h  00h  00h  00h  03h"
  params: []
  notes: "While turning off (incl. cooling time), no other command accepted."

- id: c018_input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h  03h  00h  00h  02h  01h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal value (e.g. 06h = video port). See Appendix 'Supplementary Information by Command'."
  notes: "Source example (video port): 02h  03h  00h  00h  02h  01h  06h  0Eh"

- id: c020_picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h  10h  00h  00h  00h  12h"
  params: []
  notes: "Cleared on input/video switch."

- id: c021_picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h  11h  00h  00h  00h  13h"
  params: []

- id: c022_sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h  12h  00h  00h  00h  14h"
  params: []
  notes: "Cleared on input/video switch or volume adjustment."

- id: c023_sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h  13h  00h  00h  00h  15h"
  params: []

- id: c024_onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h  14h  00h  00h  00h  16h"
  params: []
  notes: "Cleared on input/video switch."

- id: c025_onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h  15h  00h  00h  00h  17h"
  params: []

- id: c030_1_picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h  10h  00h  00h  05h  <DATA01>  FFh  <DATA02> - <DATA04>  <CKS>"
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
  notes: "Source example (brightness=10): 03h  10h  00h  00h  05h  00h  FFh  00h  0Ah  00h  21h"

- id: c030_2_volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h  10h  00h  00h  05h  05h  00h  <DATA01> - <DATA03>  <CKS>"
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
  notes: "Source example (volume=10): 03h  10h  00h  00h  05h  05h  00h  00h  0Ah  00h  27h"

- id: c030_12_aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h  10h  00h  00h  05h  18h  00h  00h  <DATA01>  00h  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Aspect value. See Appendix 'Supplementary Information by Command'."

- id: c030_15_other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h  10h  00h  00h  05h  <DATA01> - <DATA05>  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target: 96h=LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: byte
      description: "FFh (fixed per source)"
    - name: DATA03
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: byte
      description: "Adjustment value (high-order 8 bits)"

- id: c037_information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h  8Ah  00h  00h  00h  8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time (DATA83-86, sec), filter usage time (DATA87-90, sec). Updated at 1-min intervals."

- id: c037_3_filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h  95h  00h  00h  00h  98h"
  params: []
  notes: "Returns filter usage time (DATA01-04, sec) and filter alarm start time (DATA05-08, sec). -1 if undefined."

- id: c037_4_lamp_information_request_3
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
  notes: "Remaining life is negative if replacement deadline exceeded. Source example (Lamp1 usage): 03h  96h  00h  00h  02h  00h  01h  9Ch"

- id: c037_6_carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h  9Ah  00h  00h  01h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

- id: c050_remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h  0Fh  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Key code low byte (WORD). Source key list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: byte
      description: "Key code high byte (00h for all listed keys)"
  notes: "Source example (AUTO): 02h  0Fh  00h  00h  02h  05h  00h  18h"

- id: c051_shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h  16h  00h  00h  00h  18h"
  params: []

- id: c052_shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h  17h  00h  00h  00h  19h"
  params: []

- id: c053_lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02h  18h  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Lens target (source shows 06h=Periphery Focus; full list in Appendix)"
    - name: DATA02
      type: byte
      description: "Motion: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "After 7Fh/81h, send 00h to stop. Same command can be reissued while driving (no stop)."

- id: c053_1_lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h  1Ch  00h  00h  02h  <DATA01>  00h  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Lens target (same enumeration as LENS CONTROL DATA01)"
  notes: "Returns upper/lower limits and current value (16-bit) for the target."

- id: c053_2_lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h  1Dh  00h  00h  04h  <DATA01> - <DATA04>  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Lens target; FFh=Stop (mode/value ignored)"
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: byte
      description: "Adjustment value (high-order 8 bits)"

- id: c053_3_lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h  1Eh  00h  00h  01h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: c053_4_reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h  1Fh  00h  00h  01h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on profile selected by 053-10 LENS PROFILE SET."

- id: c053_5_lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h  20h  00h  00h  01h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: c053_6_lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h  21h  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: byte
      description: "Setting value: 00h=OFF, 01h=ON"

- id: c053_7_lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h  22h  00h  00h  01h  00h  25h"
  params: []
  notes: "Returns DATA01 bitmask: bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift H, bit4=lens shift V (0=stop,1=operating)."

- id: c053_10_lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h  27h  00h  00h  01h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: c053_11_lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h  28h  00h  00h  00h  2Ah"
  params: []

- id: c060_1_gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h  05h  00h  00h  03h  <DATA01>  00h  00h  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Returns status, upper/lower limits, default, current value, wide/narrow adjustment widths. Source example (brightness): 03h  05h  00h  00h  03h  00h  00h  00h  0Bh"

- id: c078_1_setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  00h  86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock/sleep-timer function (DATA05)."

- id: c078_2_running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  01h  87h"
  params: []
  notes: "Returns power status, cooling process, power on/off process, operation status."

- id: c078_3_input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  02h  88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern, content displayed."

- id: c078_4_mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  03h  89h"
  params: []
  notes: "Returns picture/sound/onscreen/forced-onscreen mute and OSD display state."

- id: c078_5_model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  04h  8Ah"
  params: []

- id: c078_6_cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  05h  8Bh"
  params: []
  notes: "Returns 00h=normal (cover open), 01h=cover closed."

- id: c079_freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h  98h  00h  00h  01h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "01h=freeze on, 02h=freeze off"

- id: c084_information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h  D0h  00h  00h  03h  00h  <DATA01>  01h  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency"

- id: c097_8_eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h  B0h  00h  00h  01h  07h  BBh"
  params: []
  notes: "Returns eco-mode value (or Light/Lamp mode on some models). Values in Appendix."

- id: c097_45_lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h  B0h  00h  00h  01h  2Ch  E0h"
  params: []

- id: c097_155_lan_mac_address_status_request2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h  B0h  00h  00h  02h  9Ah  00h  4Fh"
  params: []
  notes: "Returns 6-byte MAC address."

- id: c097_198_pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h  B0h  00h  00h  02h  C5h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: c097_243_1_edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h  B0h  00h  00h  02h  DFh  00h  94h"
  params: []
  notes: "Returns 00h=OFF, 01h=ON."

- id: c098_8_eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h  B1h  00h  00h  02h  07h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Eco-mode value. Values in Appendix 'Supplementary Information by Command'."

- id: c098_45_lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h  B1h  00h  00h  12h  2Ch  <DATA01> - <DATA16>  00h  <CKS>"
  params:
    - name: DATA01_DATA16
      type: string
      description: "Projector name, up to 16 bytes (NUL-terminated)"

- id: c098_198_pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h  B1h  00h  00h  03h  C5h  <DATA01>  <DATA02>  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: byte
      description: "Setting value (MODE: 00h=PIP,01h=PbP; START POSITION: 00h=TL,01h=TR,02h=BL,03h=BR; sub-input values in Appendix)"

- id: c098_243_1_edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h  B1h  00h  00h  03h  DFh  00h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=OFF, 01h=ON"

- id: c305_1_base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h  BFh  00h  00h  01h  00h  C0h"
  params: []
  notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11)."

- id: c305_2_serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h  BFh  00h  00h  02h  01h  06h  C8h"
  params: []

- id: c305_3_basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h  BFh  00h  00h  01h  02h  C2h"
  params: []
  notes: "Returns operation status, content displayed, selection signal type 1/2, display signal type, video/sound/onscreen mute, freeze status."

- id: c319_10_audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h  C9h  00h  00h  03h  09h  <DATA01>  <DATA02>  <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal. Values in Appendix 'Supplementary Information by Command'."
    - name: DATA02
      type: byte
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Observable states surfaced by the query commands above. One entry per
# distinct reported state. Response payloads are binary; field offsets
# reference the DATA?? positions documented in the source.

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST DATA03/DATA06; 305-3 BASIC INFORMATION REQUEST DATA01"

- id: cooling_in_progress
  type: boolean
  source: "078-2 DATA04 (01h=during execution)"

- id: input_signal_status
  type: object
  source: "078-3 INPUT STATUS REQUEST (signal list number, selection signal type 1/2, content displayed)"

- id: mute_status
  type: object
  source: "078-4 MUTE STATUS REQUEST (picture/sound/onscreen/forced-onscreen mute + OSD display)"

- id: cover_status
  type: enum
  values: [normal_open, closed]
  source: "078-6 COVER STATUS REQUEST DATA01"

- id: error_status
  type: bitmask
  source: "009 ERROR STATUS REQUEST DATA01-12 (cover/fan/temperature/power/lamp/ballast/iris/formatter/FPGA/foreign-matter/interlock/system errors)"

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: "037 DATA83-86; 037-4 DATA03-06 (per lamp)"

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: "037-4 (content 04h); negative if replacement deadline exceeded"

- id: filter_usage_time
  type: integer
  unit: seconds
  source: "037-3 DATA01-04"

- id: filter_alarm_start_time
  type: integer
  unit: seconds
  source: "037-3 DATA05-08 (-1 if undefined)"

- id: carbon_savings
  type: object
  source: "037-6 (kg + mg, total or operation)"

- id: lens_operation_status
  type: bitmask
  source: "053-7 DATA01 (memory/zoom/focus/shift-H/shift-V operating bits)"

- id: lens_position
  type: object
  source: "053-1 (upper/lower limits + current value per lens target)"

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: "053-11 LENS PROFILE REQUEST DATA01"

- id: gain_parameter
  type: object
  source: "060-1 (status, limits, default, current, wide/narrow width per gain name)"

- id: model_name
  type: string
  source: "078-5 MODEL NAME REQUEST; 305-1 DATA03-11"

- id: base_model_type
  type: object
  source: "305-1 DATA01-02/DATA12-13"

- id: serial_number
  type: string
  source: "305-2 SERIAL NUMBER REQUEST DATA01-16"

- id: eco_mode
  type: enum
  source: "097-8 (values in Appendix)"
  # UNRESOLVED: exact eco-mode enum values not in refined source excerpt

- id: lan_projector_name
  type: string
  source: "097-45 LAN PROJECTOR NAME REQUEST DATA01-17"

- id: mac_address
  type: string
  source: "097-155 DATA01-06"

- id: pip_pbp_state
  type: object
  source: "097-198 (mode/start-position/sub-inputs)"

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1 DATA01"

- id: info_string
  type: string
  source: "084 INFORMATION STRING REQUEST (H/V sync frequency)"

- id: setting_info
  type: object
  source: "078-1 SETTING REQUEST (base model type, sound function, clock/sleep-timer profile)"
```

## Variables
```yaml
# Settable continuous/numeric parameters (discrete actions live in Actions).
# Limits and defaults come from the 060-1 GAIN PARAMETER REQUEST 3 response;
# absolute numeric ranges are model-dependent and not stated verbatim in the
# source excerpt.

- id: brightness
  source: "030-1 DATA01=00h; 060-1 DATA01=00h"
  # UNRESOLVED: absolute min/max not stated in refined excerpt

- id: contrast
  source: "030-1 DATA01=01h; 060-1 DATA01=01h"
  # UNRESOLVED: absolute min/max not stated in refined excerpt

- id: color
  source: "030-1 DATA01=02h; 060-1 DATA01=02h"
  # UNRESOLVED: absolute min/max not stated in refined excerpt

- id: hue
  source: "030-1 DATA01=03h; 060-1 DATA01=03h"
  # UNRESOLVED: absolute min/max not stated in refined excerpt

- id: sharpness
  source: "030-1 DATA01=04h; 060-1 DATA01=04h"
  # UNRESOLVED: absolute min/max not stated in refined excerpt

- id: volume
  source: "030-2; 060-1 DATA01=05h"
  # UNRESOLVED: absolute min/max not stated in refined excerpt

- id: lamp_light_adjust
  source: "030-15 DATA01=96h; 060-1 DATA01=96h"
  # UNRESOLVED: absolute min/max not stated in refined excerpt

- id: lens_position_target
  source: "053 / 053-2 (absolute/relative lens drive per target)"
  # UNRESOLVED: target enumeration incomplete in refined excerpt (only 06h=Periphery Focus shown)

- id: projector_name
  source: "098-45 (up to 16 bytes, NUL-terminated)"
```

## Events
```yaml
# The source describes no unsolicited notifications / push events. All
# information is obtained by polling via REQUEST commands.
# Section empty by design - not UNRESOLVED.
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
# UNRESOLVED: no macros documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: "015. POWER ON"
    behavior: "While power-on is in progress, no other command is accepted."
    source: "3.2"
  - command: "016. POWER OFF"
    behavior: "While power-off (including cooling time) is in progress, no other command is accepted."
    source: "3.3"
  - command: "053. LENS CONTROL"
    behavior: "After continuous-drive (7Fh/81h) a Stop (00h) must be sent to halt the lens."
    source: "3.22"
# UNRESOLVED: no explicit safety interlock procedures, power-on sequencing
# requirements, or personnel-safety warnings present in the refined source
# excerpt. Error code 02h 0Dh ("command cannot be accepted because the power
# is off") implies commands require power-on, but no formal interlock table.
```

## Notes
- **Protocol framing:** Each command is a hex byte sequence. Format: `[type][cmd][ID1][ID2][LEN][DATA...][CKS]`. `ID1` = control ID (default 00h), `ID2` = model code (varies by model — value for V984Q Mpi not in this excerpt). `CKS` = low-order 8 bits of the sum of all preceding bytes.
- **Response discrimination:** success-response leading byte = command-type + 20h; error-response leading byte = command-type + A0h. Error responses carry `<ERR1> <ERR2>` codes (see source §2.4, 23 code combinations).
- **Two transport paths:** RS-232C cross-cable on PC CONTROL (D-SUB 9P, pins 2/3/5/7/8 used), or LAN (wired RJ-45 or optional wireless LAN unit) on TCP port 7142. Both carry the same binary command set.
- **Baud rate:** five rates supported (115200 / 38400 / 19200 / 9600 / 4800); source does not designate a default — must match the projector's configured setting.
- **Polling cadence:** lamp/filter usage times are delivered in one-second units but updated internally at one-minute intervals.
- **Key-code list** (command 050) maps 25 remote keys; DATA02 is 00h for every listed key.
- **Picture/volume mute** auto-clears on input/video switch (and volume adjust clears sound mute).
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input-terminal values, aspect values, eco-mode values, base-model-type values, sub-input setting values) was not part of the refined source excerpt and could not be transcribed. -->
<!-- UNRESOLVED: model code (ID2) for V984Q Mpi not stated; control ID (ID1) default of 00h assumed. -->
<!-- UNRESOLVED: firmware version compatibility, protocol version number, and absolute numeric ranges for gain parameters not stated in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:00:07.529Z
last_checked_at: 2026-06-19T07:45:42.468Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:45:42.468Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source commands with confirmed transport parameters; bidirectional coverage is complete (1:1 ratio). (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-code (ID2) value for this specific model not stated in the command reference; control-ID (ID1) default assumed 00h. Appendix \"Supplementary Information by Command\" (input-terminal values, aspect values, eco-mode values, base-model-type values, sub-input values) not included in the refined source excerpt."
- "flow control not stated in source (full-duplex mode stated, not flow control)"
- "exact eco-mode enum values not in refined source excerpt"
- "absolute min/max not stated in refined excerpt"
- "target enumeration incomplete in refined excerpt (only 06h=Periphery Focus shown)"
- "no macros documented."
- "no explicit safety interlock procedures, power-on sequencing"
- "Appendix \"Supplementary Information by Command\" (input-terminal values, aspect values, eco-mode values, base-model-type values, sub-input setting values) was not part of the refined source excerpt and could not be transcribed."
- "model code (ID2) for V984Q Mpi not stated; control ID (ID1) default of 00h assumed."
- "firmware version compatibility, protocol version number, and absolute numeric ranges for gain parameters not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
