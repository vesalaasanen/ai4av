---
spec_id: admin/sharp-nec-led-fe009i2-104
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FE009I2-104 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FE009I2-104"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FE009I2-104"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:21:56.248Z
last_checked_at: 2026-06-18T08:04:50.720Z
generated_at: 2026-06-18T08:04:50.720Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "control ID default value not stated in source (must be read from projector config)"
  - "model code (ID2) value not stated in source for this model"
  - "appendix \"Supplementary Information by Command\" values (input terminal map, aspect values, eco mode values, base model type values, sub input values) not present in this refined source"
  - "flow control not explicitly stated; full-duplex noted"
  - "value table not in refined source). Example 06h = video port.\""
  - "value table not in refined source).\""
  - "eco mode value table not in refined source"
  - "aspect value table not in refined source"
  - "input terminal value table not in refined source"
  - "source describes no unsolicited notifications; all responses are command-acknowledgement only."
  - "source documents no multi-step sequences."
  - "power-on sequencing voltage/current specs not in source."
  - "default baud rate not stated (5 options listed, no default marked)"
  - "control ID (ID1) default value not stated"
  - "model code (ID2) for LED FE009I2-104 not stated"
  - "appendix value tables missing — input terminal, aspect, eco mode, base model type, sub input"
  - "flow_control not explicitly stated (full-duplex only noted)"
  - "firmware version compatibility not stated"
  - "voltage/current/power specs not in this refined source"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:04:50.720Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FE009I2-104 Control Spec

## Summary
Sharp/NEC projector control spec covering RS-232C serial and TCP (wired/wireless LAN) control interfaces. Binary framed protocol with hex byte commands, checksum, control ID and model code. Covers power, input switch, mutes, picture/volume/aspect/gain adjust, shutter, lens control/memory, status queries, eco mode, edge blending, PIP/PbP, and audio select.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: control ID default value not stated in source (must be read from projector config) -->
<!-- UNRESOLVED: model code (ID2) value not stated in source for this model -->
<!-- UNRESOLVED: appendix "Supplementary Information by Command" values (input terminal map, aspect values, eco mode values, base model type values, sub input values) not present in this refined source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; default not stated
  baud_rate_options: [4800, 9600, 19200, 38400, 115200]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated; full-duplex noted
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
# Framing: commands/responses are hex byte sequences wrapped in a frame.
# Frame layout: [op1] [op2] <ID1> <ID2> [LEN] <DATA...> <CKS>
# ID1 = control ID (set on projector), ID2 = model code (varies by model).
# CKS = checksum: sum of all preceding bytes, low-order one byte.
```

## Traits
```yaml
traits:
  - powerable       # inferred from POWER ON/OFF commands (015/016)
  - routable        # inferred from INPUT SW CHANGE (018) and AUDIO SELECT SET (319-10)
  - queryable       # inferred from many *REQUEST commands
  - levelable       # inferred from PICTURE/VOLUME/ASPECT/GAIN adjust commands
```

## Actions
```yaml
# All command payloads verbatim from source. Hex byte sequences.
# <ID1>, <ID2>, <CKS> are frame parameters inserted by the transport layer.
# Format: "OP1 OP2 00 00 LEN [DATA...] <CKS>" - ID1/ID2 inserted between OP2 and LEN.
actions:
  - id: error_status_request_009
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00 88 00 00 00 88"
    params: []
    notes: "Returns 12 bytes of error bit fields (DATA01-DATA12)."

  - id: power_on_015
    label: "015. POWER ON"
    kind: action
    command: "02 00 00 00 00 02"
    params: []
    notes: "No other command accepted during power-on sequence."

  - id: power_off_016
    label: "016. POWER OFF"
    kind: action
    command: "02 01 00 00 00 03"
    params: []
    notes: "No other command accepted during power-off incl. cooling time."

  - id: input_sw_change_018
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02 03 00 00 02 01 <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Input terminal hex value (see appendix - UNRESOLVED: value table not in refined source). Example 06h = video port."
    notes: "Response DATA01=FFh means ended with error (no switch made)."

  - id: picture_mute_on_020
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02 10 00 00 00 12"
    params: []

  - id: picture_mute_off_021
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02 11 00 00 00 13"
    params: []

  - id: sound_mute_on_022
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02 12 00 00 00 14"
    params: []

  - id: sound_mute_off_023
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02 13 00 00 00 15"
    params: []

  - id: onscreen_mute_on_024
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02 14 00 00 00 16"
    params: []

  - id: onscreen_mute_off_025
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02 15 00 00 00 17"
    params: []

  - id: picture_adjust_030_1
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03 10 00 00 05 <DATA01> FF <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Adjustment target - 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness."
      - name: DATA02
        type: string
        description: "Adjustment mode - 00h absolute, 01h relative."
      - name: DATA03
        type: string
        description: "Adjustment value low-order 8 bits."
      - name: DATA04
        type: string
        description: "Adjustment value high-order 8 bits."

  - id: volume_adjust_030_2
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03 10 00 00 05 05 00 <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Adjustment mode - 00h absolute, 01h relative."
      - name: DATA02
        type: string
        description: "Adjustment value low-order 8 bits."
      - name: DATA03
        type: string
        description: "Adjustment value high-order 8 bits."

  - id: aspect_adjust_030_12
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03 10 00 00 05 18 00 00 <DATA01> 00 <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Aspect value (see appendix - UNRESOLVED: value table not in refined source)."

  - id: other_adjust_030_15
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03 10 00 00 05 <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Adjustment target - 96h LAMP ADJUST / LIGHT ADJUST (DATA02 must be FFh)."
      - name: DATA02
        type: string
        description: "Target qualifier (FFh for LAMP ADJUST)."
      - name: DATA03
        type: string
        description: "Adjustment mode - 00h absolute, 01h relative."
      - name: DATA04
        type: string
        description: "Adjustment value low-order 8 bits."
      - name: DATA05
        type: string
        description: "Adjustment value high-order 8 bits."

  - id: information_request_037
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03 8A 00 00 00 8D"
    params: []
    notes: "Returns 98 bytes: DATA01-49 projector name, DATA83-86 lamp usage seconds, DATA87-90 filter usage seconds."

  - id: filter_usage_information_request_037_3
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03 95 00 00 00 98"
    params: []
    notes: "DATA01-04 filter usage seconds, DATA05-08 filter alarm start seconds. -1 if undefined."

  - id: lamp_information_request_3_037_4
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03 96 00 00 02 <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "00h Lamp 1, 01h Lamp 2 (two-lamp models only)."
      - name: DATA02
        type: string
        description: "01h usage time seconds, 04h remaining life %."

  - id: carbon_savings_information_request_037_6
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03 9A 00 00 01 <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "00h Total Carbon Savings, 01h Carbon Savings during operation."

  - id: remote_key_code_050
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02 0F 00 00 02 <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Key code low byte. Examples: 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO."
      - name: DATA02
        type: string
        description: "Key code high byte (00h for all listed codes)."

  - id: shutter_close_051
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02 16 00 00 00 18"
    params: []

  - id: shutter_open_052
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02 17 00 00 00 19"
    params: []

  - id: lens_control_053
    label: "053. LENS CONTROL"
    kind: action
    command: "02 18 00 00 02 <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Lens target - 06h Periphery Focus (other targets per appendix - UNRESOLVED)."
      - name: DATA02
        type: string
        description: "00h stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +continuous, 81h −continuous, FDh −0.25s, FEh −0.5s, FFh −1s."
    notes: "Continuous drive (7Fh/81h) must be stopped by sending 00h."

  - id: lens_control_request_053_1
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02 1C 00 00 02 <DATA01> 00 <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Lens target (see 053 DATA01)."
    notes: "Returns upper/lower range and current value (16-bit each)."

  - id: lens_control_2_053_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02 1D 00 00 04 <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Lens target; FFh = Stop (mode/value ignored)."
      - name: DATA02
        type: string
        description: "Adjustment mode - 00h absolute, 02h relative."
      - name: DATA03
        type: string
        description: "Adjustment value low-order 8 bits."
      - name: DATA04
        type: string
        description: "Adjustment value high-order 8 bits."

  - id: lens_memory_control_053_3
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02 1E 00 00 01 <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "00h MOVE, 01h STORE, 02h RESET."

  - id: reference_lens_memory_control_053_4
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02 1F 00 00 01 <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "00h MOVE, 01h STORE, 02h RESET. Operates on profile selected by 053-10."

  - id: lens_memory_option_request_053_5
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02 20 00 00 01 <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE."

  - id: lens_memory_option_set_053_6
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02 21 00 00 02 <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE."
      - name: DATA02
        type: string
        description: "00h OFF, 01h ON."

  - id: lens_information_request_053_7
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02 22 00 00 01 00 25"
    params: []
    notes: "Returns DATA01 bit field: Bit0 lens memory, Bit1 zoom, Bit2 focus, Bit3 lens shift H, Bit4 lens shift V (0=stop, 1=operating)."

  - id: lens_profile_set_053_10
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02 27 00 00 01 <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "00h Profile 1, 01h Profile 2."

  - id: lens_profile_request_053_11
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02 28 00 00 00 2A"
    params: []

  - id: gain_parameter_request_3_060_1
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03 05 00 00 03 <DATA01> 00 00 <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Adjusted value name - 00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST."
    notes: "Returns 16-byte block: status, range limits, default, current, wide/narrow step."

  - id: setting_request_078_1
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00 85 00 00 01 00 86"
    params: []
    notes: "DATA01-03 base model type, DATA04 sound function, DATA05 profile/clock/sleep function flags."

  - id: running_status_request_078_2
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 01 87"
    params: []
    notes: "DATA03 power status, DATA04 cooling, DATA05 power on/off process, DATA06 operation status."

  - id: input_status_request_078_3
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 02 88"
    params: []
    notes: "Returns signal switch state, list number, selection signal type 1/2, test pattern, displayed content."

  - id: mute_status_request_078_4
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 03 89"
    params: []
    notes: "DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display."

  - id: model_name_request_078_5
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00 85 00 00 01 04 8A"
    params: []

  - id: cover_status_request_078_6
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 05 8B"
    params: []
    notes: "DATA01 00h normal/cover open, 01h cover closed."

  - id: freeze_control_079
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01 98 00 00 01 <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "01h freeze on, 02h freeze off."

  - id: information_string_request_084
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00 D0 00 00 03 00 <DATA01> 01 <CKS>"
    params:
      - name: DATA01
        type: string
        description: "03h horizontal sync frequency, 04h vertical sync frequency."

  - id: eco_mode_request_097_8
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03 B0 00 00 01 07 BB"
    params: []
    notes: "Returns Light mode or Lamp mode value per projector model."

  - id: lan_projector_name_request_097_45
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03 B0 00 00 01 2C E0"
    params: []

  - id: lan_mac_address_status_request2_097_155
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03 B0 00 00 02 9A 00 4F"
    params: []

  - id: pip_picture_by_picture_request_097_198
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03 B0 00 00 02 C5 <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."

  - id: edge_blending_mode_request_097_243_1
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03 B0 00 00 02 DF 00 94"
    params: []

  - id: eco_mode_set_098_8
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03 B1 00 00 02 07 <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Eco mode value (see appendix - UNRESOLVED: value table not in refined source)."

  - id: lan_projector_name_set_098_45
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03 B1 00 00 12 2C <DATA01..DATA16> 00 <CKS>"
    params:
      - name: name
        type: string
        description: "Projector name (up to 16 bytes, NUL-terminated)."

  - id: pip_picture_by_picture_set_098_198
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03 B1 00 00 03 C5 <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."
      - name: DATA02
        type: string
        description: "Setting value per DATA01 (MODE: 00h PIP/01h PbP; START POSITION: 00h TL/01h TR/02h BL/03h BR; sub input value per appendix)."

  - id: edge_blending_mode_set_098_243_1
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03 B1 00 00 03 DF 00 <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "00h OFF, 01h ON."

  - id: base_model_type_request_305_1
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00 BF 00 00 01 00 C0"
    params: []
    notes: "DATA01-02 base model type, DATA03-11 model name, DATA12-13 base model type."

  - id: serial_number_request_305_2
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00 BF 00 00 02 01 06 C8"
    params: []

  - id: basic_information_request_305_3
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00 BF 00 00 01 02 C2"
    params: []
    notes: "Returns operation status, displayed content, signal types, mutes, freeze status."

  - id: audio_select_set_319_10
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03 C9 00 00 03 09 <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Input terminal (see appendix - UNRESOLVED: value table not in refined source)."
      - name: DATA02
        type: string
        description: "00h terminal specified in DATA01, 01h BNC, 02h COMPUTER."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, network_standby]
    source: "078-2 DATA03/DATA06, 305-3 DATA01"

  - id: picture_mute_state
    type: enum
    values: [off, on]
    source: "078-4 DATA01"

  - id: sound_mute_state
    type: enum
    values: [off, on]
    source: "078-4 DATA02"

  - id: onscreen_mute_state
    type: enum
    values: [off, on]
    source: "078-4 DATA03"

  - id: freeze_state
    type: enum
    values: [off, on]
    source: "305-3 DATA09"

  - id: cover_state
    type: enum
    values: [normal_open, closed]
    source: "078-6 DATA01"

  - id: shutter_state
    type: enum
    values: [open, closed]
    source: "inferred from 051/052 commands"

  - id: error_status
    type: bitmask
    source: "009 DATA01-DATA12 bit fields (cover, fan, temp, power, lamp, formatter, FPGA, mirror cover, iris, interlock, etc.)"

  - id: lamp_usage_time
    type: integer
    unit: seconds
    source: "037 DATA83-86, 037-4 DATA03-06"

  - id: filter_usage_time
    type: integer
    unit: seconds
    source: "037 DATA87-90, 037-3 DATA01-04"

  - id: lamp_remaining_life
    type: integer
    unit: percent
    source: "037-4 (DATA02=04h). Negative if replacement deadline exceeded."

  - id: input_signal_status
    type: object
    source: "078-3 DATA01-09"

  - id: eco_mode_value
    type: enum
    values: []  # UNRESOLVED: eco mode value table not in refined source
    source: "097-8"

  - id: edge_blending_mode
    type: enum
    values: [off, on]
    source: "097-243-1"
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    source: "030-1 (DATA01=00h), 060-1 (DATA01=00h)"

  - id: contrast
    type: integer
    source: "030-1 (DATA01=01h), 060-1 (DATA01=01h)"

  - id: color
    type: integer
    source: "030-1 (DATA01=02h), 060-1 (DATA01=02h)"

  - id: hue
    type: integer
    source: "030-1 (DATA01=03h), 060-1 (DATA01=03h)"

  - id: sharpness
    type: integer
    source: "030-1 (DATA01=04h), 060-1 (DATA01=04h)"

  - id: volume
    type: integer
    source: "030-2, 060-1 (DATA01=05h)"

  - id: lamp_light_adjust
    type: integer
    source: "030-15 (DATA01=96h), 060-1 (DATA01=96h)"

  - id: projector_name
    type: string
    max_length: 16
    source: "098-45 / 097-45"

  - id: aspect
    type: enum
    values: []  # UNRESOLVED: aspect value table not in refined source
    source: "030-12"

  - id: selected_input
    type: enum
    values: []  # UNRESOLVED: input terminal value table not in refined source
    source: "018"

  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    source: "053-10 / 053-11"
```

## Events
```yaml
events: []
# UNRESOLVED: source describes no unsolicited notifications; all responses are command-acknowledgement only.
```

## Macros
```yaml
macros: []
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off_016       # source: cooling time blocks other commands
  - shutter_close_051   # lens shutter blocks projection
interlocks:
  - "POWER ON (015): no other command accepted during power-on sequence."
  - "POWER OFF (016): no other command accepted during power-off incl. cooling time."
  - "PICTURE MUTE ON (020): auto-cleared on input/video signal switch."
  - "SOUND MUTE ON (022): auto-cleared on input/video signal switch or volume adjust."
  - "ONSCREEN MUTE ON (024): auto-cleared on input/video signal switch."
  - "Error 02h 0Dh: command rejected when power is off."
  - "Error 02h 0Fh: no authority for operation."
# UNRESOLVED: power-on sequencing voltage/current specs not in source.
```

## Notes
- Binary framed protocol. All commands and responses are hex byte sequences. `<ID1>` = control ID set on projector, `<ID2>` = model code (model-specific), `<CKS>` = checksum (sum of preceding bytes, low byte).
- Command direction prefix in response: `A`-prefixed opcode (e.g. `A2h`, `A3h`, `A0h`, `A1h`) = error response; `2`-prefixed (e.g. `22h`, `23h`, `20h`, `21h`) = success response.
- Serial config: 115200/38400/19200/9600/4800 bps selectable (default not stated), 8N1, full duplex. Cross serial cable required.
- TCP port 7142 for LAN control (wired or wireless LAN unit).
- Response error codes (ERR1/ERR2) documented in section 2.4: 00h/00h unrecognized, 00h/01h unsupported by model, 01h/00h invalid value, 02h/0Dh power off, 02h/0Eh execution failed, 02h/0Fh no authority, 03h/00h wrong gain number, etc.
- Several commands reference an appendix "Supplementary Information by Command" for value tables (input terminals, aspect, eco mode, base model type, sub input). These appendix values are not present in this refined source and are marked UNRESOLVED.

<!-- UNRESOLVED: default baud rate not stated (5 options listed, no default marked) -->
<!-- UNRESOLVED: control ID (ID1) default value not stated -->
<!-- UNRESOLVED: model code (ID2) for LED FE009I2-104 not stated -->
<!-- UNRESOLVED: appendix value tables missing — input terminal, aspect, eco mode, base model type, sub input -->
<!-- UNRESOLVED: flow_control not explicitly stated (full-duplex only noted) -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: voltage/current/power specs not in this refined source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:21:56.248Z
last_checked_at: 2026-06-18T08:04:50.720Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:04:50.720Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "control ID default value not stated in source (must be read from projector config)"
- "model code (ID2) value not stated in source for this model"
- "appendix \"Supplementary Information by Command\" values (input terminal map, aspect values, eco mode values, base model type values, sub input values) not present in this refined source"
- "flow control not explicitly stated; full-duplex noted"
- "value table not in refined source). Example 06h = video port.\""
- "value table not in refined source).\""
- "eco mode value table not in refined source"
- "aspect value table not in refined source"
- "input terminal value table not in refined source"
- "source describes no unsolicited notifications; all responses are command-acknowledgement only."
- "source documents no multi-step sequences."
- "power-on sequencing voltage/current specs not in source."
- "default baud rate not stated (5 options listed, no default marked)"
- "control ID (ID1) default value not stated"
- "model code (ID2) for LED FE009I2-104 not stated"
- "appendix value tables missing — input terminal, aspect, eco mode, base model type, sub input"
- "flow_control not explicitly stated (full-duplex only noted)"
- "firmware version compatibility not stated"
- "voltage/current/power specs not in this refined source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
