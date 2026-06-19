---
spec_id: admin/sharp-nec-np-pa653ul
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP PA653UL Control Spec"
manufacturer: Sharp/NEC
model_family: "NP PA653UL"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP PA653UL"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:02:04.140Z
last_checked_at: 2026-06-18T08:49:58.545Z
generated_at: 2026-06-18T08:49:58.545Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value list, aspect value list, eco mode value list, sub-input value list, and base-model-type value list are defined in a separate \"Supplementary Information by Command\" appendix that is not included in this source excerpt."
  - "full input terminal value list not in this source"
  - "aspect value list not in this source"
  - "full DATA01 target list not complete in this source"
  - "eco mode value list not in this source"
  - "sub-input value list not in this source"
  - "input terminal value list not in this source"
  - "base model type value list not in this source"
  - "eco mode enum values not defined in this source"
  - "no explicit safety interlock sequences or power-on sequencing"
  - "firmware version compatibility not stated in source."
  - "factory-default baud rate not stated."
  - "input terminal, aspect, eco mode, sub-input, base-model-type value lists live in a separate appendix not included here."
  - "wireless LAN unit specifications referenced out to a separate operation manual."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:49:58.545Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP PA653UL Control Spec

## Summary
The Sharp/NEC NP PA653UL is a professional LCD projector controllable via an RS-232C serial port or a wired/wireless LAN (TCP port 7142). The device uses a binary frame protocol: each command is a sequence of hex bytes terminated by a one-byte checksum (low-order byte of the sum of all preceding bytes). This spec covers the full command catalogue documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input switching, mute, picture/volume/lens adjustment, lens memory, status queries, eco mode, PIP/PbP, edge blending, and informational requests.

<!-- UNRESOLVED: input terminal value list, aspect value list, eco mode value list, sub-input value list, and base-model-type value list are defined in a separate "Supplementary Information by Command" appendix that is not included in this source excerpt. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port for LAN command send/receive, stated in source
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # auto/configurable; all listed in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # full duplex stated; specific flow-control line usage (RTS/CTS pins wired) noted but mode not named
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON / POWER OFF commands present
  - queryable       # inferred: many status/information request commands present
  - levelable       # inferred: volume, brightness, contrast, lamp/light adjust commands present
  - routable        # inferred: INPUT SW CHANGE input-terminal switching present
```

## Actions
```yaml
# Binary protocol notes (apply to every action below):
#  - Bytes are hexadecimal, space-separated, as written in the source.
#  - {checksum} = low-order one byte (8 bits) of the sum of ALL preceding bytes.
#  - Frames sent by the controller carry no ID1/ID2; the projector's response
#    echoes back <ID1> (control ID) and <ID2> (model code) plus a checksum.
#  - Success response opcode = command opcode | 0x20; error response opcode = command opcode | 0x80.
#  - This manual is a shared Sharp/NEC projector command reference; some DATA01
#    value lists (input terminal, aspect, eco mode, sub-input, base model type)
#    live in a separate appendix not present in this source - marked UNRESOLVED.

actions:
  # ---- 009. ERROR STATUS REQUEST (query) ----
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00 88 00 00 00 88"
    params: []

  # ---- 015. POWER ON ----
  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02 00 00 00 00 02"
    params: []

  # ---- 016. POWER OFF ----
  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02 01 00 00 00 03"
    params: []

  # ---- 018. INPUT SW CHANGE ----
  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02 03 00 00 02 01 {input} {checksum}"
    params:
      - name: input
        type: integer
        description: "Input terminal byte (DATA01). Value list in 'Supplementary Information by Command' appendix. Example: 06 = video port."
        # UNRESOLVED: full input terminal value list not in this source

  # ---- 020. PICTURE MUTE ON ----
  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02 10 00 00 00 12"
    params: []

  # ---- 021. PICTURE MUTE OFF ----
  - id: picture_mute_off
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02 11 00 00 00 13"
    params: []

  # ---- 022. SOUND MUTE ON ----
  - id: sound_mute_on
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02 12 00 00 00 14"
    params: []

  # ---- 023. SOUND MUTE OFF ----
  - id: sound_mute_off
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02 13 00 00 00 15"
    params: []

  # ---- 024. ONSCREEN MUTE ON ----
  - id: onscreen_mute_on
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02 14 00 00 00 16"
    params: []

  # ---- 025. ONSCREEN MUTE OFF ----
  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02 15 00 00 00 17"
    params: []

  # ---- 030-1. PICTURE ADJUST ----
  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03 10 00 00 05 {target} FF {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: integer
        description: "Adjustment target (DATA01): 00 Brightness, 01 Contrast, 02 Color, 03 Hue, 04 Sharpness."
      - name: mode
        type: integer
        description: "Adjustment mode (DATA02): 00 absolute value, 01 relative value."
      - name: value
        type: integer
        description: "16-bit signed adjustment value, split into value_lo (DATA03) and value_hi (DATA04)."
    notes: "Example brightness=10: 03 10 00 00 05 00 FF 00 0A 00 21. Example brightness=-10: 03 10 00 00 05 00 FF 00 F6 FF 0C."

  # ---- 030-2. VOLUME ADJUST ----
  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03 10 00 00 05 05 00 {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: mode
        type: integer
        description: "Adjustment mode (DATA01): 00 absolute value, 01 relative value."
      - name: value
        type: integer
        description: "16-bit adjustment value, split into value_lo (DATA02) and value_hi (DATA03)."
    notes: "Example volume=10: 03 10 00 00 05 05 00 00 0A 00 27."

  # ---- 030-12. ASPECT ADJUST ----
  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03 10 00 00 05 18 00 00 {aspect} 00 {checksum}"
    params:
      - name: aspect
        type: integer
        description: "Aspect value (DATA01). Value list in 'Supplementary Information by Command' appendix."
        # UNRESOLVED: aspect value list not in this source

  # ---- 030-15. OTHER ADJUST (LAMP/LIGHT ADJUST) ----
  - id: other_adjust_lamp_light
    label: "030-15. OTHER ADJUST (LAMP ADJUST / LIGHT ADJUST)"
    kind: action
    command: "03 10 00 00 05 96 FF {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: mode
        type: integer
        description: "Adjustment mode (DATA03): 00 absolute value, 01 relative value."
      - name: value
        type: integer
        description: "16-bit adjustment value, split into value_lo (DATA04) and value_hi (DATA05)."
    notes: "DATA01=96h, DATA02=FFh select LAMP ADJUST / LIGHT ADJUST."

  # ---- 050. REMOTE KEY CODE ----
  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02 0F 00 00 02 {key_lo} {key_hi} {checksum}"
    params:
      - name: key
        type: integer
        description: "Remote key code (WORD, DATA01=lo DATA02=hi). Documented codes: 02 POWER ON, 03 POWER OFF, 05 AUTO, 06 MENU, 07 UP, 08 DOWN, 09 RIGHT, 0A LEFT, 0B ENTER, 0C EXIT, 0D HELP, 0F MAGNIFY UP, 10 MAGNIFY DOWN, 13 MUTE, 29 PICTURE, 4B COMPUTER1, 4C COMPUTER2, 4F VIDEO1, 51 S-VIDEO1, 84 VOLUME UP, 85 VOLUME DOWN, 8A FREEZE, A3 ASPECT, D7 SOURCE, EE LAMP MODE/ECO (DATA02=00h for all listed)."
    notes: "Example AUTO: 02 0F 00 00 02 05 00 18."

  # ---- 051. SHUTTER CLOSE ----
  - id: shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02 16 00 00 00 18"
    params: []

  # ---- 052. SHUTTER OPEN ----
  - id: shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02 17 00 00 00 19"
    params: []

  # ---- 053. LENS CONTROL ----
  - id: lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02 18 00 00 02 {target} {content} {checksum}"
    params:
      - name: target
        type: integer
        description: "Lens target (DATA01). Source shows 06 = Periphery Focus; other target values not enumerated in this excerpt."
        # UNRESOLVED: full DATA01 target list not complete in this source
      - name: content
        type: integer
        description: "Drive content (DATA02): 00 Stop, 01 +1s, 02 +0.5s, 03 +0.25s, 7F +continuous, 81 -continuous, FD -0.25s, FE -0.5s, FF -1s."
    notes: "After 7F/81 continuous drive, send 00 to stop. While lens is driving, re-issuing the same command continues motion without stop."

  # ---- 053-2. LENS CONTROL 2 ----
  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02 1D 00 00 04 {target} {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: integer
        description: "Lens target (DATA01); FF = Stop (mode/value ignored)."
      - name: mode
        type: integer
        description: "Adjustment mode (DATA02): 00 absolute value, 02 relative value."
      - name: value
        type: integer
        description: "16-bit adjustment value, split into value_lo (DATA03) and value_hi (DATA04)."

  # ---- 053-3. LENS MEMORY CONTROL ----
  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02 1E 00 00 01 {operation} {checksum}"
    params:
      - name: operation
        type: integer
        description: "DATA01: 00 MOVE, 01 STORE, 02 RESET."

  # ---- 053-4. REFERENCE LENS MEMORY CONTROL ----
  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02 1F 00 00 01 {operation} {checksum}"
    params:
      - name: operation
        type: integer
        description: "DATA01: 00 MOVE, 01 STORE, 02 RESET. Operates on the profile selected by 053-10 LENS PROFILE SET."

  # ---- 053-6. LENS MEMORY OPTION SET ----
  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02 21 00 00 02 {option} {value} {checksum}"
    params:
      - name: option
        type: integer
        description: "DATA01: 00 LOAD BY SIGNAL, 01 FORCED MUTE."
      - name: value
        type: integer
        description: "DATA02: 00 OFF, 01 ON."

  # ---- 053-10. LENS PROFILE SET ----
  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02 27 00 00 01 {profile} {checksum}"
    params:
      - name: profile
        type: integer
        description: "DATA01: 00 Profile 1, 01 Profile 2."

  # ---- 079. FREEZE CONTROL ----
  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01 98 00 00 01 {state} {checksum}"
    params:
      - name: state
        type: integer
        description: "DATA01: 01 freeze on, 02 freeze off."

  # ---- 098-8. ECO MODE SET ----
  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03 B1 00 00 02 07 {value} {checksum}"
    params:
      - name: value
        type: integer
        description: "Eco mode value (DATA01). Value list in 'Supplementary Information by Command' appendix."
        # UNRESOLVED: eco mode value list not in this source

  # ---- 098-45. LAN PROJECTOR NAME SET ----
  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03 B1 00 00 12 2C {name[0..15]} 00 {checksum}"
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes (DATA01-DATA16), followed by 00 terminator."

  # ---- 098-198. PIP/PICTURE BY PICTURE SET ----
  - id: pip_pbp_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03 B1 00 00 03 C5 {target} {value} {checksum}"
    params:
      - name: target
        type: integer
        description: "DATA01: 00 MODE, 01 START POSITION, 02 SUB INPUT / SUB INPUT 1, 09 SUB INPUT 2, 0A SUB INPUT 3."
      - name: value
        type: integer
        description: "DATA02. MODE: 00 PIP, 01 PBP. START POSITION: 00 TOP-LEFT, 01 TOP-RIGHT, 02 BOTTOM-LEFT, 03 BOTTOM-RIGHT. Sub-input values in 'Supplementary Information by Command' appendix."
        # UNRESOLVED: sub-input value list not in this source

  # ---- 098-243-1. EDGE BLENDING MODE SET ----
  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03 B1 00 00 03 DF 00 {value} {checksum}"
    params:
      - name: value
        type: integer
        description: "DATA01: 00 OFF, 01 ON."

  # ---- 319-10. AUDIO SELECT SET ----
  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03 C9 00 00 03 09 {input} {value} {checksum}"
    params:
      - name: input
        type: integer
        description: "Input terminal (DATA01). Value list in 'Supplementary Information by Command' appendix."
        # UNRESOLVED: input terminal value list not in this source
      - name: value
        type: integer
        description: "DATA02: 00 audio from the terminal specified in DATA01, 01 BNC, 02 COMPUTER."

  # ===================================================================
  # Queries (kind: query) - request commands that return data
  # ===================================================================

  # ---- 037. INFORMATION REQUEST ----
  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03 8A 00 00 00 8D"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90)."

  # ---- 037-3. FILTER USAGE INFORMATION REQUEST ----
  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03 95 00 00 00 98"
    params: []
    notes: "Returns filter usage time seconds (DATA01-04) and filter alarm start time seconds (DATA05-08); -1 if undefined."

  # ---- 037-4. LAMP INFORMATION REQUEST 3 ----
  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03 96 00 00 02 {lamp} {content} {checksum}"
    params:
      - name: lamp
        type: integer
        description: "DATA01: 00 Lamp 1, 01 Lamp 2 (two-lamp models only)."
      - name: content
        type: integer
        description: "DATA02: 01 lamp usage time (seconds), 04 lamp remaining life (%)."
    notes: "Example lamp1 usage time: 03 96 00 00 02 00 01 9C. Remaining life is negative if replacement deadline exceeded."

  # ---- 037-6. CARBON SAVINGS INFORMATION REQUEST ----
  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03 9A 00 00 01 {type} {checksum}"
    params:
      - name: type
        type: integer
        description: "DATA01: 00 Total Carbon Savings, 01 Carbon Savings during operation."
    notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

  # ---- 053-1. LENS CONTROL REQUEST ----
  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02 1C 00 00 02 {target} 00 {checksum}"
    params:
      - name: target
        type: integer
        description: "Lens target (DATA01)."
    notes: "Returns upper/lower limit and current value (16-bit each)."

  # ---- 053-5. LENS MEMORY OPTION REQUEST ----
  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02 20 00 00 01 {option} {checksum}"
    params:
      - name: option
        type: integer
        description: "DATA01: 00 LOAD BY SIGNAL, 01 FORCED MUTE."
    notes: "Returns option + setting value (00 OFF, 01 ON)."

  # ---- 053-7. LENS INFORMATION REQUEST ----
  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02 22 00 00 01 00 25"
    params: []
    notes: "Returns DATA01 bitmask: lens memory / zoom / focus / lens-shift-H / lens-shift-V operation state (0=stop, 1=operating)."

  # ---- 053-11. LENS PROFILE REQUEST ----
  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02 28 00 00 00 2A"
    params: []
    notes: "Returns selected reference lens memory profile (DATA01: 00 Profile 1, 01 Profile 2)."

  # ---- 060-1. GAIN PARAMETER REQUEST 3 ----
  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03 05 00 00 03 {name} 00 00 {checksum}"
    params:
      - name: name
        type: integer
        description: "DATA01: 00 Brightness, 01 Contrast, 02 Color, 03 Hue, 04 Sharpness, 05 Volume, 96 Lamp/Light Adjust."
    notes: "Example brightness: 03 05 00 00 03 00 00 00 0B. Returns status, upper/lower/default/current limits, wide/narrow adjustment widths."

  # ---- 078-1. SETTING REQUEST ----
  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00 85 00 00 01 00 86"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile number (DATA05)."

  # ---- 078-2. RUNNING STATUS REQUEST ----
  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 01 87"
    params: []
    notes: "Returns power status, cooling process, power on/off process, operation status."

  # ---- 078-3. INPUT STATUS REQUEST ----
  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 02 88"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern, content displayed."

  # ---- 078-4. MUTE STATUS REQUEST ----
  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 03 89"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute and onscreen display state."

  # ---- 078-5. MODEL NAME REQUEST ----
  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00 85 00 00 01 04 8A"
    params: []
    notes: "Returns model name string (DATA01-32, NUL-terminated)."

  # ---- 078-6. COVER STATUS REQUEST ----
  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00 85 00 00 01 05 8B"
    params: []
    notes: "Returns mirror/lens cover status (DATA01: 00 normal/opened, 01 closed)."

  # ---- 084. INFORMATION STRING REQUEST ----
  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00 D0 00 00 03 00 {type} 01 {checksum}"
    params:
      - name: type
        type: integer
        description: "DATA01: 03 horizontal sync frequency, 04 vertical sync frequency."
    notes: "Returns label/info string (variable length, NUL-terminated)."

  # ---- 097-8. ECO MODE REQUEST ----
  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03 B0 00 00 01 07 BB"
    params: []
    notes: "Returns eco mode value (Light mode or Lamp mode depending on model)."
    # UNRESOLVED: eco mode value list not in this source

  # ---- 097-45. LAN PROJECTOR NAME REQUEST ----
  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03 B0 00 00 01 2C E0"
    params: []
    notes: "Returns projector name string (DATA01-17, NUL-terminated)."

  # ---- 097-155. LAN MAC ADDRESS STATUS REQUEST2 ----
  - id: lan_mac_address_request
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03 B0 00 00 02 9A 00 4F"
    params: []
    notes: "Returns MAC address (DATA01-06)."

  # ---- 097-198. PIP/PICTURE BY PICTURE REQUEST ----
  - id: pip_pbp_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03 B0 00 00 02 C5 {target} {checksum}"
    params:
      - name: target
        type: integer
        description: "DATA01: 00 MODE, 01 START POSITION, 02 SUB INPUT / SUB INPUT 1, 09 SUB INPUT 2, 0A SUB INPUT 3."

  # ---- 097-243-1. EDGE BLENDING MODE REQUEST ----
  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03 B0 00 00 02 DF 00 94"
    params: []
    notes: "Returns edge blending state (DATA01: 00 OFF, 01 ON)."

  # ---- 305-1. BASE MODEL TYPE REQUEST ----
  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00 BF 00 00 01 00 C0"
    params: []
    notes: "Returns base model type (DATA01-02) and model name (DATA03-11)."
    # UNRESOLVED: base model type value list not in this source

  # ---- 305-2. SERIAL NUMBER REQUEST ----
  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00 BF 00 00 02 01 06 C8"
    params: []
    notes: "Returns serial number string (DATA01-16, NUL-terminated)."

  # ---- 305-3. BASIC INFORMATION REQUEST ----
  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00 BF 00 00 01 02 C2"
    params: []
    notes: "Returns operation status, content displayed, selection signal type 1/2, display signal type, video/sound/onscreen mute, freeze status."
```

## Feedbacks
```yaml
# Error response frame (returned by the projector when a command fails):
#   A{op_lo}h <ID1> <ID2> 02 <ERR1> <ERR2> <CKS>
# where {op_lo} is the low byte of the issued command's opcode.
feedbacks:
  - id: command_error
    type: object
    description: "Error response returned on command failure; ERR1/ERR2 encode the cause."
    fields:
      - name: ERR1
        type: integer
      - name: ERR2
        type: integer
    error_codes:
      "00 00": "Command cannot be recognized."
      "00 01": "Command not supported by the model in use."
      "01 00": "Specified value is invalid."
      "01 01": "Specified input terminal is invalid."
      "01 02": "Specified language is invalid."
      "02 00": "Memory allocation error."
      "02 02": "Memory in use."
      "02 03": "Specified value cannot be set."
      "02 04": "Forced onscreen mute on."
      "02 06": "Viewer error."
      "02 07": "No signal."
      "02 08": "A test pattern or filter is displayed."
      "02 09": "No PC card is inserted."
      "02 0A": "Memory operation error."
      "02 0C": "An entry list is displayed."
      "02 0D": "Command cannot be accepted because the power is off."
      "02 0E": "Command execution failed."
      "02 0F": "No authority for the operation."
      "03 00": "Specified gain number is incorrect."
      "03 01": "Specified gain is invalid."
      "03 02": "Adjustment failed."
```

## Variables
```yaml
variables:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source: "078-2 RUNNING STATUS REQUEST DATA06"
  - id: picture_mute
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST DATA01"
  - id: sound_mute
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST DATA02"
  - id: onscreen_mute
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST DATA03"
  - id: freeze_state
    type: enum
    values: [off, on]
    source: "305-3 BASIC INFORMATION REQUEST DATA09"
  - id: volume
    type: integer
    source: "060-1 GAIN PARAMETER REQUEST 3 (name=05)"
  - id: brightness
    type: integer
    source: "060-1 GAIN PARAMETER REQUEST 3 (name=00)"
  - id: lamp_usage_time
    type: integer
    unit: seconds
    source: "037-4 LAMP INFORMATION REQUEST 3 (content=01)"
  - id: lamp_remaining_life
    type: integer
    unit: percent
    source: "037-4 LAMP INFORMATION REQUEST 3 (content=04)"
  - id: eco_mode
    type: integer
    source: "097-8 ECO MODE REQUEST"
    # UNRESOLVED: eco mode enum values not defined in this source
```

## Events
```yaml
# No unsolicited notifications documented. The projector only responds to issued commands.
events: []
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
macros: []
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: during power-off (incl. cooling time) no other command is accepted
interlocks:
  - "POWER ON: while turning on, no other command can be accepted."
  - "POWER OFF: while turning off (including cooling time), no other command can be accepted."
  - "Error code 02 0D: command cannot be accepted because the power is off."
# UNRESOLVED: no explicit safety interlock sequences or power-on sequencing
# requirements beyond the command-acceptance notes above are stated in this source.
```

## Notes
- **Shared manual:** BDT140013 Rev 7.1 is a common Sharp/NEC projector command reference; not all listed commands/features apply to every model. Several value lists (input terminal, aspect, eco mode, sub-input, base model type) are defined in a separate "Supplementary Information by Command" appendix not present in this source excerpt.
- **Frame structure:** Controller→projector commands carry no ID1/ID2 bytes (the projector infers control/model IDs). Projector→controller responses echo `<ID1>` (control ID set on projector) and `<ID2>` (model code). Every frame ends in `<CKS>`, the low-order byte of the sum of all preceding bytes.
- **Response opcodes:** success = command opcode with bit5 set (e.g. 02h→22h, 03h→23h, 01h→21h, 00h→20h); error = command opcode with bit7 set (e.g. 02h→A2h, 03h→A3h, 00h→A0h).
- **Baud rate:** five rates are supported (115200/38400/19200/9600/4800); the source does not state which is the factory default.
- **Two-lamp models:** Lamp 2 selectors (DATA01=01h) apply only to two-lamp projector models.
- **Usage time granularity:** lamp/filter usage times are obtainable in one-second units but are updated only at one-minute intervals.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: factory-default baud rate not stated. -->
<!-- UNRESOLVED: input terminal, aspect, eco mode, sub-input, base-model-type value lists live in a separate appendix not included here. -->
<!-- UNRESOLVED: wireless LAN unit specifications referenced out to a separate operation manual. -->
````

Spec done. 53 actions (binary hex payloads verbatim + checksum rule). Both serial + TCP 7142 transport. Gaps marked `UNRESOLVED` (appendix value lists, default baud, firmware).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:02:04.140Z
last_checked_at: 2026-06-18T08:49:58.545Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:49:58.545Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value list, aspect value list, eco mode value list, sub-input value list, and base-model-type value list are defined in a separate \"Supplementary Information by Command\" appendix that is not included in this source excerpt."
- "full input terminal value list not in this source"
- "aspect value list not in this source"
- "full DATA01 target list not complete in this source"
- "eco mode value list not in this source"
- "sub-input value list not in this source"
- "input terminal value list not in this source"
- "base model type value list not in this source"
- "eco mode enum values not defined in this source"
- "no explicit safety interlock sequences or power-on sequencing"
- "firmware version compatibility not stated in source."
- "factory-default baud rate not stated."
- "input terminal, aspect, eco mode, sub-input, base-model-type value lists live in a separate appendix not included here."
- "wireless LAN unit specifications referenced out to a separate operation manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
