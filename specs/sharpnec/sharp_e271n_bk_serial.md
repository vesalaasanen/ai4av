---
spec_id: admin/sharpnec-e271n-bk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC E271N Bk Control Spec"
manufacturer: Sharp/NEC
model_family: "E271N Bk"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "E271N Bk"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:04:08.507Z
last_checked_at: 2026-06-17T19:43:22.970Z
generated_at: 2026-06-17T19:43:22.970Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. The Appendix \"Supplementary Information by Command\" referenced for input-terminal values, eco-mode values, base-model-type values, and signal-type values is not present in the provided source excerpt — those enum tables are therefore not reproduced."
  - "numeric ranges for brightness/contrast/volume/etc not stated in source excerpt (Appendix missing)."
  - "source documents no unsolicited notifications. Protocol is strict request/response."
  - "source documents no multi-step command sequences."
  - "Appendix \"Supplementary Information by Command\" not present in source excerpt — input-terminal enum values, eco-mode enum values, base-model-type codes, and signal-type detail tables could not be reproduced."
  - "numeric adjustment ranges (brightness/contrast/color/volume min/max/default) referenced via GAIN PARAMETER REQUEST 060-1 but not enumerated in source excerpt."
  - "firmware version compatibility not stated."
  - "command timing / inter-command delays not specified beyond the power-transition windows."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:43:22.970Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command manual; bidirectional coverage 53/53 = 1.0; all transport parameters verified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC E271N Bk Control Spec

## Summary
The Sharp/NEC E271N Bk is a projector controllable via RS-232C (PC CONTROL D-SUB 9P) and a wired/wireless LAN TCP connection. This spec covers the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), enumerating all 52 documented commands including power, input switching, mutes, picture/volume/aspect/gain adjust, lens and lens-memory control, shutter, freeze, remote key code, eco mode, edge blending, PIP/PbP, and the full set of status/information/serial-number/model-name queries.

<!-- UNRESOLVED: firmware version compatibility not stated in source. The Appendix "Supplementary Information by Command" referenced for input-terminal values, eco-mode values, base-model-type values, and signal-type values is not present in the provided source excerpt — those enum tables are therefore not reproduced. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port for LAN command send/receive (source: "Port number" section)
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # configurable; source lists all
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states "Full duplex" communication mode; no hardware flow control mentioned
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
- powerable  # inferred from POWER ON / POWER OFF commands
- routable   # inferred from INPUT SW CHANGE / audio select commands
- queryable  # inferred from extensive status/information request commands
- levelable  # inferred from PICTURE ADJUST / VOLUME ADJUST / OTHER ADJUST commands
```

## Actions
```yaml
# All command bytes shown verbatim per source. <ID1> <ID2> are frame parameters
# (control ID + model code); <CKS> is a checksum = low byte of sum of all
# preceding bytes. Parameter rows from source are preserved where present.

- id: error_status_request_009
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on_015
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While turning on power, no other command accepted."

- id: power_off_016
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "During power-off incl. cooling time, no other command accepted."

- id: input_sw_change_018
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "Input terminal value; see Appendix 'Supplementary Information by Command'. Example: 06h = video port."
  notes: "Response DATA01=FFh means ended with error (no signal switch made)."

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
      type: enum
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: volume_adjust_030_2
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: aspect_adjust_030_12
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "Aspect value; see Appendix 'Supplementary Information by Command'."

- id: other_adjust_030_15
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment target: 96h=LAMP ADJUST / LIGHT ADJUST (DATA02=FFh)"
    - name: DATA03
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request_037
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90). Updated at 1-min intervals."

- id: filter_usage_request_037_3
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage seconds (DATA01-04) and filter alarm start seconds (DATA05-08). -1 if undefined."

- id: lamp_info_request_037_4
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: enum
      description: "01h=usage time (seconds), 04h=remaining life (%)"
  notes: "Reflects eco mode. Negative remaining-life % returned past replacement deadline."

- id: carbon_savings_request_037_6
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "DATA02-05 = kg (max 99999), DATA06-09 = mg (max 999999)."

- id: remote_key_code_050
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). See key code list in Feedbacks."
    - name: DATA02
      type: integer
      description: "Key code high byte."
  notes: "Response DATA01=FFh means error. Key codes: 02h/00h=POWER ON, 03h/00h=POWER OFF, 05h/00h=AUTO, 06h/00h=MENU, 07h/00h=UP, 08h/00h=DOWN, 09h/00h=RIGHT, 0Ah/00h=LEFT, 0Bh/00h=ENTER, 0Ch/00h=EXIT, 0Dh/00h=HELP, 0Fh/00h=MAGNIFY UP, 10h/00h=MAGNIFY DOWN, 13h/00h=MUTE, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, 4Ch/00h=COMPUTER2, 4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1, 84h/00h=VOLUME UP, 85h/00h=VOLUME DOWN, 8Ah/00h=FREEZE, A3h/00h=ASPECT, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO."

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
      type: enum
      description: "06h=Periphery Focus"
    - name: DATA02
      type: enum
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "Send 00h to stop after 7Fh/81h continuous drive. Same command can be reissued without stop while driving."

- id: lens_control_request_053_1
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "Target (see 053 command)."
  notes: "Returns upper/lower limits and current value of adjustment range."

- id: lens_control_2_053_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "FFh=Stop (mode/value ignored)"
    - name: DATA02
      type: enum
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
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control_053_4
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on profile selected by 053-10 LENS PROFILE SET."

- id: lens_memory_option_request_053_5
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "Returns DATA02 setting 00h=OFF / 01h=ON."

- id: lens_memory_option_set_053_6
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: enum
      description: "00h=OFF, 01h=ON"

- id: lens_information_request_053_7
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitmask: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) - 0=Stop, 1=During operation."

- id: lens_profile_set_053_10
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request_053_11
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_060_1
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Returns status, upper/lower/default/current values, wide/narrow adjustment widths."

- id: setting_request_078_1
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock/sleep (DATA05)."

- id: running_status_request_078_2
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status, cooling/power-on process flags, operation status."

- id: input_status_request_078_3
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number (returned value is practical-1), selection signal types, test pattern, displayed content."

- id: mute_status_request_078_4
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture/sound/onscreen/forced-onscreen mute + OSD display flags."

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
  notes: "DATA01: 00h=Normal (opened), 01h=Cover closed."

- id: freeze_control_079
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "01h=freeze ON, 02h=freeze OFF"

- id: information_string_request_084
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
  notes: "Returns variable-length label/string (NUL-terminated)."

- id: eco_mode_request_097_8
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns Light mode / Lamp mode value per Appendix."

- id: lan_projector_name_request_097_45
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_request_097_155
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns 6-byte MAC address."

- id: pip_pbp_request_097_198
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request_097_243_1
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "DATA01: 00h=OFF, 01h=ON."

- id: eco_mode_set_098_8
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "Value per Appendix 'Supplementary Information by Command'."

- id: lan_projector_name_set_098_45
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: DATA01-16
      type: string
      description: "Projector name, up to 16 bytes (NUL-terminated)."

- id: pip_pbp_set_098_198
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: enum
      description: "For MODE: 00h=PIP, 01h=PICTURE BY PICTURE. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. For SUB INPUT: value per Appendix."

- id: edge_blending_mode_set_098_243_1
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request_305_1
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type and model name (NUL-terminated)."

- id: serial_number_request_305_2
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request_305_3
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, displayed content, selection signal types, video/sound/onscreen mute, freeze status."

- id: audio_select_set_319_10
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "Input terminal; see Appendix."
    - name: DATA02
      type: enum
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Frame structure: response lead byte A0h/A1h/A2h/A3h indicates command-class error/success.
# Success response shape: {lead} {cmd} <ID1> <ID2> {LEN} [<DATA...>] <CKS>
# Error response shape:  A{class}h {cmd} <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: command_result
  type: enum
  values: [success, error]
  description: "Every command returns either a success frame or an error frame with ERR1/ERR2 codes."

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  description: "From 078-2 RUNNING STATUS DATA06 / 305-3 DATA01."

- id: input_signal
  type: enum
  values: [computer, video, s_video, component, dvi_d, hdmi, displayport, viewer]
  description: "From 078-3 DATA04 selection signal type 2."

- id: mute_state
  type: object
  description: "Picture/sound/onscreen/forced-onscreen mute + OSD display flags from 078-4."

- id: lamp_usage_hours
  type: integer
  description: "From 037-4 DATA03-06 seconds / 3600."

- id: lamp_remaining_life_pct
  type: integer
  description: "From 037-4 with DATA02=04h. Negative if past replacement deadline."

- id: error_status
  type: bitmask
  description: "12-byte DATA01-12 from 009. Bits encode cover/fan/temperature/power/lamp/formatter/FPGA/mirror-cover/foreign-matter/ballast/iris/lens/interlock/system errors."

- id: error_code
  type: object
  description: "ERR1/ERR2 pair. Full code list from source §2.4 reproduced in Notes."
```

## Variables
```yaml
- id: picture_brightness
  type: integer
  description: "PICTURE ADJUST target 00h."
- id: picture_contrast
  type: integer
  description: "PICTURE ADJUST target 01h."
- id: picture_color
  type: integer
  description: "PICTURE ADJUST target 02h."
- id: picture_hue
  type: integer
  description: "PICTURE ADJUST target 03h."
- id: picture_sharpness
  type: integer
  description: "PICTURE ADJUST target 04h."
- id: volume
  type: integer
  description: "VOLUME ADJUST / GAIN PARAMETER 05h."
- id: lamp_light_adjust
  type: integer
  description: "OTHER ADJUST target 96h LAMP/LIGHT ADJUST."
- id: eco_mode
  type: enum
  description: "ECO MODE SET; values per Appendix."
- id: aspect
  type: enum
  description: "ASPECT ADJUST; values per Appendix."
- id: projector_name
  type: string
  description: "LAN PROJECTOR NAME SET, up to 16 bytes."
- id: edge_blending_mode
  type: enum
  values: [off, on]
- id: freeze
  type: enum
  values: [on, off]
- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
# UNRESOLVED: numeric ranges for brightness/contrast/volume/etc not stated in source excerpt (Appendix missing).
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. Protocol is strict request/response.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: while turning on, no other command accepted."
  - "POWER OFF: during power-off incl. cooling time, no other command accepted."
  - "LENS CONTROL: continuous drive (7Fh/81h) must be stopped by sending 00h."
  - "Error code 02h/0Dh: command rejected because power is off."
  - "Error code 02h/0Fh: no authority for the operation."
# Source describes error conditions and interlock-like behavior but no explicit
# safety-warning section. Cover/temperature/fan/lamp/interlock-switch errors are
# reported via 009 ERROR STATUS REQUEST but no power-on sequencing procedure is
# documented in this excerpt.
```

## Notes
- **Frame format:** `20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>`. Lead bytes 00h–03h = command (varies by class), 20h/21h/22h/23h = success response, A0h/A1h/A2h/A3h = error response.
- **Checksum (CKS):** low-order byte of the sum of all preceding bytes.
- **ID1:** projector control ID. **ID2:** model code (varies by model).
- **LEN:** byte length of DATA part following LEN.
- **Cooling/power-on windows** block other commands — callers should poll 078-2 RUNNING STATUS before issuing follow-up commands after a power transition.
- **Signal list number** returned by 078-3 is practical value − 1.
- **Lamp/filter usage** updated at 1-minute intervals despite 1-second resolution.
- **Two-lamp models:** DATA01=01h (Lamp 2) effective only on two-lamp projectors.

### Error code list (source §2.4)
| ERR1 | ERR2 | Description |
|------|------|-------------|
| 00h | 00h | Command not recognized |
| 00h | 01h | Command not supported by model |
| 01h | 00h | Specified value invalid |
| 01h | 01h | Specified input terminal invalid |
| 01h | 02h | Specified language invalid |
| 02h | 00h | Memory allocation error |
| 02h | 02h | Memory in use |
| 02h | 03h | Specified value cannot be set |
| 02h | 04h | Forced onscreen mute on |
| 02h | 06h | Viewer error |
| 02h | 07h | No signal |
| 02h | 08h | Test pattern or filter displayed |
| 02h | 09h | No PC card inserted |
| 02h | 0Ah | Memory operation error |
| 02h | 0Ch | Entry list displayed |
| 02h | 0Dh | Command rejected — power is off |
| 02h | 0Eh | Command execution failed |
| 02h | 0Fh | No authority for operation |
| 03h | 00h | Specified gain number incorrect |
| 03h | 01h | Specified gain invalid |
| 03h | 02h | Adjustment failed |

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not present in source excerpt — input-terminal enum values, eco-mode enum values, base-model-type codes, and signal-type detail tables could not be reproduced. -->
<!-- UNRESOLVED: numeric adjustment ranges (brightness/contrast/color/volume min/max/default) referenced via GAIN PARAMETER REQUEST 060-1 but not enumerated in source excerpt. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: command timing / inter-command delays not specified beyond the power-transition windows. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:04:08.507Z
last_checked_at: 2026-06-17T19:43:22.970Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:43:22.970Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command manual; bidirectional coverage 53/53 = 1.0; all transport parameters verified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. The Appendix \"Supplementary Information by Command\" referenced for input-terminal values, eco-mode values, base-model-type values, and signal-type values is not present in the provided source excerpt — those enum tables are therefore not reproduced."
- "numeric ranges for brightness/contrast/volume/etc not stated in source excerpt (Appendix missing)."
- "source documents no unsolicited notifications. Protocol is strict request/response."
- "source documents no multi-step command sequences."
- "Appendix \"Supplementary Information by Command\" not present in source excerpt — input-terminal enum values, eco-mode enum values, base-model-type codes, and signal-type detail tables could not be reproduced."
- "numeric adjustment ranges (brightness/contrast/color/volume min/max/default) referenced via GAIN PARAMETER REQUEST 060-1 but not enumerated in source excerpt."
- "firmware version compatibility not stated."
- "command timing / inter-command delays not specified beyond the power-transition windows."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
