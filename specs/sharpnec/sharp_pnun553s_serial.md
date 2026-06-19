---
spec_id: admin/sharp-nec-pnun553s
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Pnun553S Control Spec"
manufacturer: Sharp/NEC
model_family: Pnun553S
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - Pnun553S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:13:44.374Z
last_checked_at: 2026-06-18T09:12:55.210Z
generated_at: 2026-06-18T09:12:55.210Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "specific input-terminal DATA01 value table lives in an external \"Appendix: Supplementary Information by Command\" not present in the refined source"
  - "source states \"Communication mode: Full duplex\"; RTS/CTS hardware flow_control mapping not specified. Hardware wiring exposes RTS/CTS pins."
  - "numeric min/max/default ranges for picture/volume parameters are"
  - "no push/event mechanism documented."
  - "populate if a separate macro/automation doc exists."
  - "source contains no explicit safety interlock procedures, voltage"
  - "input-terminal DATA01 value table (used by 018, 319-10, 097-198 sub-inputs, 030-12 aspect values, eco-mode values) lives in external \"Appendix: Supplementary Information by Command\" not included in the refined source"
  - "RTS/CTS flow-control behavior (hardware pins present but source only states \"Full duplex\" communication mode)"
verification:
  verdict: verified
  checked_at: 2026-06-18T09:12:55.210Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Pnun553S Control Spec

## Summary
The Sharp/NEC Pnun553S is a projector controllable via RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN. This spec covers the BDT140013 Rev 7.1 command set: power, input switching, mute, lens/lens-memory control, picture/volume/aspect adjustment, status queries, and system settings, all framed as binary command/response packets with checksums.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: specific input-terminal DATA01 value table lives in an external "Appendix: Supplementary Information by Command" not present in the refined source -->

## Transport
```yaml
# Two transports documented in source: RS-232C serial and LAN (TCP port 7142).
# Baud rate is multi-valued (selectable); flow_control source states "Full duplex".
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # source: "Use TCP port number 7142"
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800 as selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Communication mode: Full duplex"; RTS/CTS hardware flow_control mapping not specified. Hardware wiring exposes RTS/CTS pins.
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred from 015 POWER ON / 016 POWER OFF
- routable     # inferred from 018 INPUT SW CHANGE
- queryable    # inferred from many *REQUEST commands
- levelable    # inferred from 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST
```

## Actions
```yaml
# Every command-row from section 2 of the source is enumerated below (53 rows).
# Each carries its verbatim binary payload from the source (hex with "h" suffix).
# Framing: leading direction byte (00h=009/037/078/084/305 query class via 20h resp,
# 01h=079, 02h=action, 03h=030/037/097/098/319). CKS = low-order 8 bits of the sum
# of all preceding bytes (see source "2.2 Parameters"). <ID1>=control ID, <ID2>=model code.
- id: cmd_009_error_status_request
  label: 009. ERROR STATUS REQUEST
  kind: query
  command: "00h  88h  00h  00h  00h  88h"
  params: []
  notes: "Response: 20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>. DATA1-12 = error bitmap."

- id: cmd_015_power_on
  label: 015. POWER ON
  kind: action
  command: "02h  00h  00h  00h  00h  02h"
  params: []
  notes: "While turning power on, no other command accepted. Success resp: 22h 00h <ID1> <ID2> 00h <CKS>."

- id: cmd_016_power_off
  label: 016. POWER OFF
  kind: action
  command: "02h  01h  00h  00h  00h  03h"
  params: []
  notes: "Blocks other commands during power-off incl. cooling time."

- id: cmd_018_input_sw_change
  label: 018. INPUT SW CHANGE
  kind: action
  command: "02h  03h  00h  00h  02h  01h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal byte (e.g. 06h = video port). Value table in Appendix 'Supplementary Information by Command'."
  notes: "Example to video port: 02h 03h 00h 00h 02h 01h 06h 0Eh. Resp DATA01=FFh => error (no switch)."

- id: cmd_020_picture_mute_on
  label: 020. PICTURE MUTE ON
  kind: action
  command: "02h  10h  00h  00h  00h  12h"
  params: []
  notes: "Auto-off on input/video signal switch."

- id: cmd_021_picture_mute_off
  label: 021. PICTURE MUTE OFF
  kind: action
  command: "02h  11h  00h  00h  00h  13h"
  params: []

- id: cmd_022_sound_mute_on
  label: 022. SOUND MUTE ON
  kind: action
  command: "02h  12h  00h  00h  00h  14h"
  params: []
  notes: "Auto-off on input/video switch or volume change."

- id: cmd_023_sound_mute_off
  label: 023. SOUND MUTE OFF
  kind: action
  command: "02h  13h  00h  00h  00h  15h"
  params: []

- id: cmd_024_onscreen_mute_on
  label: 024. ONSCREEN MUTE ON
  kind: action
  command: "02h  14h  00h  00h  00h  16h"
  params: []

- id: cmd_025_onscreen_mute_off
  label: 025. ONSCREEN MUTE OFF
  kind: action
  command: "02h  15h  00h  00h  00h  17h"
  params: []

- id: cmd_030_1_picture_adjust
  label: 030-1. PICTURE ADJUST
  kind: action
  command: "03h  10h  00h  00h  05h  <DATA01>  FFh  <DATA02>  <DATA03>  <DATA04>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness."
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative."
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)."
  notes: "Brightness=10 example: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Brightness=-10: ... 00h F6h FFh 0Ch."

- id: cmd_030_2_volume_adjust
  label: 030-2. VOLUME ADJUST
  kind: action
  command: "03h  10h  00h  00h  05h  05h  00h  <DATA01>  <DATA02>  <DATA03>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative."
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)."
  notes: "Volume=10 example: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: cmd_030_12_aspect_adjust
  label: 030-12. ASPECT ADJUST
  kind: action
  command: "03h  10h  00h  00h  05h  18h  00h  00h  <DATA01>  00h  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value (see Appendix 'Supplementary Information by Command')."

- id: cmd_030_15_other_adjust
  label: 030-15. OTHER ADJUST
  kind: action
  command: "03h  10h  00h  00h  05h  <DATA01>  <DATA02>  <DATA03>  <DATA04>  <DATA05>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target high byte (source shows 96h for LAMP ADJUST / LIGHT ADJUST)."
    - name: DATA02
      type: integer
      description: "Target low byte (FFh per source)."
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative."
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)."

- id: cmd_050_remote_key_code
  label: 050. REMOTE KEY CODE
  kind: action
  command: "02h  0Fh  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD key code; e.g. 05h=AUTO, 07h=UP, 0Fh=MAGNIFY UP, 4Bh=COMPUTER1, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO)."
    - name: DATA02
      type: integer
      description: "Key code high byte (always 00h per source key list)."
  notes: "Full key code table in source section 3.19. Example AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h."

- id: cmd_051_shutter_close
  label: 051. SHUTTER CLOSE
  kind: action
  command: "02h  16h  00h  00h  00h  18h"
  params: []

- id: cmd_052_shutter_open
  label: 052. SHUTTER OPEN
  kind: action
  command: "02h  17h  00h  00h  00h  19h"
  params: []

- id: cmd_053_lens_control
  label: 053. LENS CONTROL
  kind: action
  command: "02h  18h  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Axis (source table head shows 06h = Periphery Focus; other axis values in Appendix)."
    - name: DATA02
      type: integer
      description: "Drive: 00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +, 81h -, FDh -0.25s, FEh -0.5s, FFh -1s."
  notes: "Send 00h in DATA02 to stop after 7Fh/81h continuous drive."

- id: cmd_053_2_lens_control_2
  label: 053-2. LENS CONTROL 2
  kind: action
  command: "02h  1Dh  00h  00h  04h  <DATA01>  <DATA02>  <DATA03>  <DATA04>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Axis; FFh = Stop (mode/value ignored)."
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 02h relative."
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)."

- id: cmd_053_3_lens_memory_control
  label: 053-3. LENS MEMORY CONTROL
  kind: action
  command: "02h  1Eh  00h  00h  01h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET."

- id: cmd_053_4_reference_lens_memory_control
  label: 053-4. REFERENCE LENS MEMORY CONTROL
  kind: action
  command: "02h  1Fh  00h  00h  01h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET."
  notes: "Operates on profile selected via 053-10 LENS PROFILE SET."

- id: cmd_053_6_lens_memory_option_set
  label: 053-6. LENS MEMORY OPTION SET
  kind: action
  command: "02h  21h  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE."
    - name: DATA02
      type: integer
      description: "00h OFF, 01h ON."

- id: cmd_053_10_lens_profile_set
  label: 053-10. LENS PROFILE SET
  kind: action
  command: "02h  27h  00h  00h  01h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h Profile 1, 01h Profile 2."

- id: cmd_079_freeze_control
  label: 079. FREEZE CONTROL
  kind: action
  command: "01h  98h  00h  00h  01h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h freeze on, 02h freeze off."

- id: cmd_098_8_eco_mode_set
  label: 098-8. ECO MODE SET
  kind: action
  command: "03h  B1h  00h  00h  02h  07h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value (see Appendix 'Supplementary Information by Command')."
  notes: "Sets 'Light mode' or 'Lamp mode' depending on model."

- id: cmd_098_45_lan_projector_name_set
  label: 098-45. LAN PROJECTOR NAME SET
  kind: action
  command: "03h  B1h  00h  00h  12h  2Ch  <DATA01>  -  <DATA16>  00h  <CKS>"
  params:
    - name: DATA01_DATA16
      type: string
      description: "Projector name (up to 16 bytes)."

- id: cmd_098_198_pip_pbp_set
  label: 098-198. PIP/PICTURE BY PICTURE SET
  kind: action
  command: "03h  B1h  00h  00h  03h  C5h  <DATA01>  <DATA02>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."
    - name: DATA02
      type: integer
      description: "Setting value (MODE: 00h PIP/01h PBP; START POSITION: 00h TL/01h TR/02h BL/03h BR; sub-input values in Appendix)."

- id: cmd_098_243_1_edge_blending_mode_set
  label: 098-243-1. EDGE BLENDING MODE SET
  kind: action
  command: "03h  B1h  00h  00h  03h  DFh  00h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h OFF, 01h ON."

- id: cmd_319_10_audio_select_set
  label: 319-10. AUDIO SELECT SET
  kind: action
  command: "03h  C9h  00h  00h  03h  09h  <DATA01>  <DATA02>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (values in Appendix 'Supplementary Information by Command')."
    - name: DATA02
      type: integer
      description: "00h terminal in DATA01, 01h BNC, 02h COMPUTER."

# ---- Query-class commands (kind: query) ----

- id: cmd_037_information_request
  label: 037. INFORMATION REQUEST
  kind: query
  command: "03h  8Ah  00h  00h  00h  8Dh"
  params: []
  notes: "Resp DATA1-49 projector name, DATA83-86 lamp usage time (s), DATA87-90 filter usage time (s). Updated 1-min intervals."

- id: cmd_037_3_filter_usage_information_request
  label: 037-3. FILTER USAGE INFORMATION REQUEST
  kind: query
  command: "03h  95h  00h  00h  00h  98h"
  params: []
  notes: "Resp DATA1-04 filter usage time (s), DATA5-08 filter alarm start time (s); -1 if undefined."

- id: cmd_037_4_lamp_information_request_3
  label: 037-4. LAMP INFORMATION REQUEST 3
  kind: query
  command: "03h  96h  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h Lamp 1, 01h Lamp 2 (two-lamp models only)."
    - name: DATA02
      type: integer
      description: "01h lamp usage time (s), 04h lamp remaining life (%)."
  notes: "Usage-time example: 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining-life returned if deadline exceeded."

- id: cmd_037_6_carbon_savings_information_request
  label: 037-6. CARBON SAVINGS INFORMATION REQUEST
  kind: query
  command: "03h  9Ah  00h  00h  01h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation."
  notes: "Resp DATA2-05 kg (max 99999), DATA6-09 mg (max 999999)."

- id: cmd_053_1_lens_control_request
  label: 053-1. LENS CONTROL REQUEST
  kind: query
  command: "02h  1Ch  00h  00h  02h  <DATA01>  00h  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Axis (same axis values as 053 LENS CONTROL)."
  notes: "Resp DATA2-7 = upper/lower/current 16-bit adjustment range."

- id: cmd_053_5_lens_memory_option_request
  label: 053-5. LENS MEMORY OPTION REQUEST
  kind: query
  command: "02h  20h  00h  00h  01h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE."
  notes: "Resp DATA02: 00h OFF, 01h ON."

- id: cmd_053_7_lens_information_request
  label: 053-7. LENS INFORMATION REQUEST
  kind: query
  command: "02h  22h  00h  00h  01h  00h  25h"
  params: []
  notes: "Resp DATA01 bitmap: bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens-shift H, bit4 lens-shift V (0=stop,1=moving)."

- id: cmd_053_11_lens_profile_request
  label: 053-11. LENS PROFILE REQUEST
  kind: query
  command: "02h  28h  00h  00h  00h  2Ah"
  params: []
  notes: "Resp DATA01: 00h Profile 1, 01h Profile 2."

- id: cmd_060_1_gain_parameter_request_3
  label: 060-1. GAIN PARAMETER REQUEST 3
  kind: query
  command: "03h  05h  00h  00h  03h  <DATA01>  00h  00h  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust."
  notes: "Brightness example: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Resp returns 16-byte gain block (limits/default/current/widths)."

- id: cmd_078_1_setting_request
  label: 078-1. SETTING REQUEST
  kind: query
  command: "00h  85h  00h  00h  01h  00h  86h"
  params: []
  notes: "Resp DATA1-03 base model type, DATA04 sound fn, DATA05 clock/sleep profile."

- id: cmd_078_2_running_status_request
  label: 078-2. RUNNING STATUS REQUEST
  kind: query
  command: "00h  85h  00h  00h  01h  01h  87h"
  params: []
  notes: "Resp DATA03 power, DATA04 cooling, DATA05 power-on/off process, DATA06 operation status."

- id: cmd_078_3_input_status_request
  label: 078-3. INPUT STATUS REQUEST
  kind: query
  command: "00h  85h  00h  00h  01h  02h  88h"
  params: []
  notes: "Resp DATA01 signal switch proc, DATA02 signal list num (value-1), DATA03/04 selection signal type, DATA05 list type, DATA06 test pattern, DATA09 content displayed."

- id: cmd_078_4_mute_status_request
  label: 078-4. MUTE STATUS REQUEST
  kind: query
  command: "00h  85h  00h  00h  01h  03h  89h"
  params: []
  notes: "Resp DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display."

- id: cmd_078_5_model_name_request
  label: 078-5. MODEL NAME REQUEST
  kind: query
  command: "00h  85h  00h  00h  01h  04h  8Ah"
  params: []
  notes: "Resp DATA01-32 model name (NUL-terminated)."

- id: cmd_078_6_cover_status_request
  label: 078-6. COVER STATUS REQUEST
  kind: query
  command: "00h  85h  00h  00h  01h  05h  8Bh"
  params: []
  notes: "Resp DATA01: 00h normal (cover open), 01h cover closed."

- id: cmd_084_information_string_request
  label: 084. INFORMATION STRING REQUEST
  kind: query
  command: "00h  D0h  00h  00h  03h  00h  <DATA01>  01h  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h horizontal sync frequency, 04h vertical sync frequency."
  notes: "Resp returns label string (NUL-terminated)."

- id: cmd_097_8_eco_mode_request
  label: 097-8. ECO MODE REQUEST
  kind: query
  command: "03h  B0h  00h  00h  01h  07h  BBh"
  params: []
  notes: "Resp DATA01 eco mode value (see Appendix)."

- id: cmd_097_45_lan_projector_name_request
  label: 097-45. LAN PROJECTOR NAME REQUEST
  kind: query
  command: "03h  B0h  00h  00h  01h  2Ch  E0h"
  params: []
  notes: "Resp DATA01-17 projector name (NUL-terminated)."

- id: cmd_097_155_lan_mac_address_status_request2
  label: 097-155. LAN MAC ADDRESS STATUS REQUEST2
  kind: query
  command: "03h  B0h  00h  00h  02h  9Ah  00h  4Fh"
  params: []
  notes: "Resp DATA01-06 MAC address."

- id: cmd_097_198_pip_pbp_request
  label: 097-198. PIP/PICTURE BY PICTURE REQUEST
  kind: query
  command: "03h  B0h  00h  00h  02h  C5h  <DATA01>  <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."
  notes: "Resp DATA02 setting value (MODE/position/sub-input)."

- id: cmd_097_243_1_edge_blending_mode_request
  label: 097-243-1. EDGE BLENDING MODE REQUEST
  kind: query
  command: "03h  B0h  00h  00h  02h  DFh  00h  94h"
  params: []
  notes: "Resp DATA01: 00h OFF, 01h ON."

- id: cmd_305_1_base_model_type_request
  label: 305-1. BASE MODEL TYPE REQUEST
  kind: query
  command: "00h  BFh  00h  00h  01h  00h  C0h"
  params: []
  notes: "Resp DATA1-02 base model type, DATA3-11 model name, DATA12-13 base model type."

- id: cmd_305_2_serial_number_request
  label: 305-2. SERIAL NUMBER REQUEST
  kind: query
  command: "00h  BFh  00h  00h  02h  01h  06h  C8h"
  params: []
  notes: "Resp DATA01-16 serial number (NUL-terminated)."

- id: cmd_305_3_basic_information_request
  label: 305-3. BASIC INFORMATION REQUEST
  kind: query
  command: "00h  BFh  00h  00h  01h  02h  C2h"
  params: []
  notes: "Resp DATA01 op status, DATA02 content displayed, DATA03/04 signal type, DATA05 display signal type, DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze."
```

## Feedbacks
```yaml
# Each query-class command above produces a response framed as:
#   20h|23h|22h <OPCODE> <ID1> <ID2> <LEN> <DATA...> <CKS>
# On error: A0h|A3h|A2h <OPCODE> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# ERR1/ERR2 codes per source section 2.4.

- id: error_status
  type: bitmap
  description: "009 ERROR STATUS REQUEST response bitmap (DATA1-12)."

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "From 078-2 RUNNING STATUS REQUEST DATA06 / 305-3 DATA01."

- id: input_state
  type: object
  description: "From 078-3 INPUT STATUS REQUEST (signal list/type/test-pattern/content)."

- id: mute_state
  type: object
  description: "From 078-4 MUTE STATUS REQUEST (picture/sound/onscreen/forced-onscreen/OSD)."

- id: cover_state
  type: enum
  values: [normal_open, closed]
  description: "From 078-6 COVER STATUS REQUEST DATA01."

- id: lens_motion
  type: bitmap
  description: "From 053-7 LENS INFORMATION REQUEST DATA01 (memory/zoom/focus/shift-H/shift-V motion)."
```

## Variables
```yaml
# Settable parameters already modelled as Actions (030-1 PICTURE ADJUST targets,
# 030-2 VOLUME, 030-12 ASPECT, 030-15 LAMP/LIGHT ADJUST, 060-1 gain block).
# Read/write of these is via the parameterized commands above; no separate
# variable abstraction is added here.
# UNRESOLVED: numeric min/max/default ranges for picture/volume parameters are
# returned dynamically by 060-1 GAIN PARAMETER REQUEST 3 (per-device), so they
# are not statically enumerated.
```

## Events
```yaml
# Source documents only request/response semantics. No unsolicited notifications
# are described.
# UNRESOLVED: no push/event mechanism documented.
```

## Macros
```yaml
# No multi-step command sequences are described in source.
# UNRESOLVED: populate if a separate macro/automation doc exists.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "015 POWER ON: while powering on, no other command is accepted."
  - "016 POWER OFF: blocks all other commands during power-off incl. cooling time."
  - "020/022/024 mute commands auto-release on input/video switch (and volume change for sound mute)."
# UNRESOLVED: source contains no explicit safety interlock procedures, voltage
# specs, or power-on sequencing requirements beyond the command-blocking notes
# above. Error bitmap (009) reports cover/temperature/fan/lamp/interlock-switch
# faults but no user-side recovery procedure is documented.
```

## Notes
- All command/response bytes are hex with `h` suffix, verbatim from source BDT140013 Rev 7.1.
- Checksum `CKS` = low-order 8 bits of the sum of all preceding bytes (worked example: 20h+81h+01h+60h+01h+00h = 103h → CKS=03h).
- `<ID1>` = control ID set on projector; `<ID2>` = model code (varies by model). Both must be supplied at runtime.
- LAN transport uses TCP port 7142; serial transport uses RS-232C cross-cable to the PC CONTROL D-SUB 9P port (pin 2 RxD, 3 TxD, 5 GND, 7 RTS, 8 CTS).
- Baud rate is selectable among 4800/9600/19200/38400/115200; data 8/N/1.
- Lamp/filter usage times update at one-minute intervals despite one-second resolution.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: input-terminal DATA01 value table (used by 018, 319-10, 097-198 sub-inputs, 030-12 aspect values, eco-mode values) lives in external "Appendix: Supplementary Information by Command" not included in the refined source -->
<!-- UNRESOLVED: RTS/CTS flow-control behavior (hardware pins present but source only states "Full duplex" communication mode) -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:13:44.374Z
last_checked_at: 2026-06-18T09:12:55.210Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:12:55.210Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "specific input-terminal DATA01 value table lives in an external \"Appendix: Supplementary Information by Command\" not present in the refined source"
- "source states \"Communication mode: Full duplex\"; RTS/CTS hardware flow_control mapping not specified. Hardware wiring exposes RTS/CTS pins."
- "numeric min/max/default ranges for picture/volume parameters are"
- "no push/event mechanism documented."
- "populate if a separate macro/automation doc exists."
- "source contains no explicit safety interlock procedures, voltage"
- "input-terminal DATA01 value table (used by 018, 319-10, 097-198 sub-inputs, 030-12 aspect values, eco-mode values) lives in external \"Appendix: Supplementary Information by Command\" not included in the refined source"
- "RTS/CTS flow-control behavior (hardware pins present but source only states \"Full duplex\" communication mode)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
