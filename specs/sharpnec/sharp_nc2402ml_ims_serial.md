---
spec_id: admin/sharp-nec-nc2402ml-ims
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NC2402ML IMS Control Spec"
manufacturer: Sharp/NEC
model_family: "NC2402ML IMS"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NC2402ML IMS"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:38:26.463Z
last_checked_at: 2026-06-18T08:33:26.334Z
generated_at: 2026-06-18T08:33:26.334Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input-terminal code table, aspect value table, eco-mode value table, sub-input value table, base-model-type code table all referenced as \"see Appendix\" but appendix not in refined source"
  - "full code list in appendix not in refined source\""
  - "value list in appendix not in refined source\""
  - "source documents no unsolicited notifications; protocol is request/response only."
  - "source documents no multi-step sequences."
  - "source states no explicit electrical safety warnings or power-on"
  - "default baud rate not stated (source lists supported rates 115200/38400/19200/9600/4800 but not which is the device default)"
  - "serial flow_control not stated; source says full-duplex only"
  - "model code (ID2) value for NC2402ML IMS not stated"
  - "firmware version compatibility not stated in source"
  - "appendix value tables (input terminal, aspect, eco mode, sub-input, base-model type) not present in refined source"
  - "wireless LAN unit models / specs not in source"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:33:26.334Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NC2402ML IMS Control Spec

## Summary
Sharp/NEC NC2402ML IMS projector (BDT140013 Rev 7.1 command reference). Supports RS-232C serial and wired/wireless LAN (TCP port 7142) control via a binary hex frame protocol with checksum. Spec covers all 53 documented commands: power, input switching, mute, picture/volume/aspect adjust, shutter, lens control & memory, status queries, eco mode, edge blending, PIP/PbP, and audio select.

<!-- UNRESOLVED: input-terminal code table, aspect value table, eco-mode value table, sub-input value table, base-model-type code table all referenced as "see Appendix" but appendix not in refined source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists supported rates 115200/38400/19200/9600/4800; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred; source states full-duplex but no flow-control field
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # 015 POWER ON / 016 POWER OFF present
- routable        # 018 INPUT SW CHANGE present
- queryable       # many status request commands (037, 078-x, 305-x, etc.)
- levelable       # 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST present
```

## Actions
```yaml
# All payloads verbatim from source (hex byte frames). Frame layout:
#   <lead> <CMD> 00h 00h <LEN> [DATA...] <CKS>
# CKS = low byte of sum of all preceding bytes. For parameterized commands CKS
# is computed at runtime; shown as {checksum}. <ID1>=control ID, <ID2>=model code
# are inserted by the projector in responses; commands in this manual use 00h 00h.
# 00h bytes inside command body are the ID1/ID2 placeholder slots (00h 00h).

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

- id: power_off_016
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change_018
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {input_terminal} {checksum}"
  params:
    - name: input_terminal
      type: enum
      description: "Input terminal code (see Appendix; e.g. 06h = Video). UNRESOLVED: full code list in appendix not in refined source"
    - name: checksum
      type: computed
      description: "Low byte of sum of all preceding bytes"

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
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_low} {value_high} {checksum}"
  params:
    - name: target
      type: enum
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: enum
      description: "00h=absolute value, 01h=relative value"
    - name: value_low
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: value_high
      type: integer
      description: "Adjustment value (high-order 8 bits)"
    - name: checksum
      type: computed

- id: volume_adjust_030_2
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_low} {value_high} {checksum}"
  params:
    - name: mode
      type: enum
      description: "00h=absolute value, 01h=relative value"
    - name: value_low
      type: integer
    - name: value_high
      type: integer
    - name: checksum
      type: computed

- id: aspect_adjust_030_12
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect_value} 00h {checksum}"
  params:
    - name: aspect_value
      type: enum
      description: "Aspect value (see Appendix). UNRESOLVED: value list in appendix not in refined source"
    - name: checksum
      type: computed

- id: other_adjust_030_15
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {target_low} {target_high} {mode} {value_low} {value_high} {checksum}"
  params:
    - name: target_low
      type: enum
      description: "Adjustment target low byte (source lists 96h for LAMP/LIGHT ADJUST)"
    - name: target_high
      type: enum
      description: "Adjustment target high byte (source lists FFh)"
    - name: mode
      type: enum
      description: "00h=absolute value, 01h=relative value"
    - name: value_low
      type: integer
    - name: value_high
      type: integer
    - name: checksum
      type: computed

- id: information_request_037
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_info_request_037_3
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_info_request_037_4
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
  params:
    - name: lamp
      type: enum
      description: "00h=Lamp 1, 01h=Lamp 2 (Lamp 2 only for two-lamp models)"
    - name: content
      type: enum
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"
    - name: checksum
      type: computed

- id: carbon_savings_info_request_037_6
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {type} {checksum}"
  params:
    - name: type
      type: enum
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    - name: checksum
      type: computed

- id: remote_key_code_050
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_low} {key_high} {checksum}"
  params:
    - name: key_low
      type: enum
      description: "Key code WORD low byte. Source table: 02h=POWER ON,03h=POWER OFF,05h=AUTO,06h=MENU,07h=UP,08h=DOWN,09h=RIGHT,0Ah=LEFT,0Bh=ENTER,0Ch=EXIT,0Dh=HELP,0Fh=MAGNIFY UP,10h=MAGNIFY DOWN,13h=MUTE,29h=PICTURE,4Bh=COMPUTER1,4Ch=COMPUTER2,4Fh=VIDEO1,51h=S-VIDEO1,84h=VOLUME UP,85h=VOLUME DOWN,8Ah=FREEZE,A3h=ASPECT,D7h=SOURCE,EEh=LAMP MODE/ECO"
    - name: key_high
      type: integer
      description: "Key code WORD high byte (00h for all keys in source table)"
    - name: checksum
      type: computed

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
  command: "02h 18h 00h 00h 02h {target} {action} {checksum}"
  params:
    - name: target
      type: enum
      description: "Lens target. Source lists 06h=Periphery Focus"
    - name: action
      type: enum
      description: "00h=Stop, 01h=Drive +1s, 02h=Drive +0.5s, 03h=Drive +0.25s, 7Fh=Drive plus, 81h=Drive minus, FDh=Drive -0.25s, FEh=Drive -0.5s, FFh=Drive -1s"
    - name: checksum
      type: computed

- id: lens_control_request_053_1
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
  params:
    - name: target
      type: integer
      description: "Lens target identifier"
    - name: checksum
      type: computed

- id: lens_control_2_053_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {mode} {value_low} {value_high} {checksum}"
  params:
    - name: target
      type: enum
      description: "Lens target (FFh = Stop, mode/value ignored when Stop)"
    - name: mode
      type: enum
      description: "00h=absolute value, 02h=relative value"
    - name: value_low
      type: integer
    - name: value_high
      type: integer
    - name: checksum
      type: computed

- id: lens_memory_control_053_3
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: enum
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
    - name: checksum
      type: computed

- id: reference_lens_memory_control_053_4
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: enum
      description: "00h=MOVE, 01h=STORE, 02h=RESET (controls profile selected by 053-10 LENS PROFILE SET)"
    - name: checksum
      type: computed

- id: lens_memory_option_request_053_5
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {option} {checksum}"
  params:
    - name: option
      type: enum
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: checksum
      type: computed

- id: lens_memory_option_set_053_6
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {option} {value} {checksum}"
  params:
    - name: option
      type: enum
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: enum
      description: "00h=OFF, 01h=ON"
    - name: checksum
      type: computed

- id: lens_information_request_053_7
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set_053_10
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {profile} {checksum}"
  params:
    - name: profile
      type: enum
      description: "00h=Profile 1, 01h=Profile 2"
    - name: checksum
      type: computed

- id: lens_profile_request_053_11
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_060_1
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {name} 00h 00h {checksum}"
  params:
    - name: name
      type: enum
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    - name: checksum
      type: computed

- id: setting_request_078_1
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request_078_2
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request_078_3
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request_078_4
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

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

- id: freeze_control_079
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {state} {checksum}"
  params:
    - name: state
      type: enum
      description: "01h=freeze ON, 02h=freeze OFF"
    - name: checksum
      type: computed

- id: information_string_request_084
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {info_type} 01h {checksum}"
  params:
    - name: info_type
      type: enum
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    - name: checksum
      type: computed

- id: eco_mode_request_097_8
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request_097_45
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request2_097_155
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_pbp_request_097_198
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {item} {checksum}"
  params:
    - name: item
      type: enum
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: checksum
      type: computed

- id: edge_blending_mode_request_097_243_1
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set_098_8
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {value} {checksum}"
  params:
    - name: value
      type: enum
      description: "Eco mode value (see Appendix). UNRESOLVED: value list in appendix not in refined source"
    - name: checksum
      type: computed

- id: lan_projector_name_set_098_45
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_01} {name_02} {name_03} {name_04} {name_05} {name_06} {name_07} {name_08} {name_09} {name_10} {name_11} {name_12} {name_13} {name_14} {name_15} {name_16} 00h {checksum}"
  params:
    - name: name_01
      type: integer
      description: "Projector name byte 1 (up to 16 bytes total, NUL-terminated)"
    - name: checksum
      type: computed

- id: pip_pbp_set_098_198
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {item} {value} {checksum}"
  params:
    - name: item
      type: enum
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: enum
      description: "For MODE: 00h=PIP,01h=PICTURE BY PICTURE. For START POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT. For SUB INPUT: sub-input value (see Appendix)"
    - name: checksum
      type: computed

- id: edge_blending_mode_set_098_243_1
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} {checksum}"
  params:
    - name: value
      type: enum
      description: "00h=OFF, 01h=ON"
    - name: checksum
      type: computed

- id: base_model_type_request_305_1
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

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

- id: audio_select_set_319_10
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {input_terminal} {value} {checksum}"
  params:
    - name: input_terminal
      type: enum
      description: "Input terminal code (see Appendix). UNRESOLVED: value list in appendix not in refined source"
    - name: value
      type: enum
      description: "00h=terminal specified in DATA01, 01h=BNC"
    - name: checksum
      type: computed
```

## Feedbacks
```yaml
# All commands return a response frame:
#   Success (no data):    A2h/A0h/A1h/A3h <CMD> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
#   Success (with data):  20h/21h/22h/23h <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>
#   Failure:              A0h..A3h <CMD> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# ERR1/ERR2 error code pairs (verbatim from source):
#   00h/00h = command not recognized
#   00h/01h = command not supported by model
#   01h/00h = specified value invalid
#   01h/01h = specified input terminal invalid
#   01h/02h = specified language invalid
#   02h/00h = memory allocation error
#   02h/02h = memory in use
#   02h/03h = specified value cannot be set
#   02h/04h = forced onscreen mute on
#   02h/06h = viewer error
#   02h/07h = no signal
#   02h/08h = test pattern or filter displayed
#   02h/09h = no PC card inserted
#   02h/0Ah = memory operation error
#   02h/0Ch = entry list displayed
#   02h/0Dh = command not accepted (power off)
#   02h/0Eh = command execution failed
#   02h/0Fh = no authority for operation
#   03h/00h = specified gain number incorrect
#   03h/01h = specified gain invalid
#   03h/02h = adjustment failed
# Each query response carries its own DATA layout (see per-command source text).

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, network_standby]
  description: "From 078-2 RUNNING STATUS REQUEST DATA03/DATA06 and 305-3 DATA01"

- id: input_signal_state
  type: composite
  description: "From 078-3 INPUT STATUS REQUEST: signal list number, signal type 1/2, test pattern, content displayed"

- id: mute_state
  type: composite
  description: "From 078-4 MUTE STATUS REQUEST: picture/sound/onscreen/forced-onscreen mute + OSD display"

- id: error_status
  type: bitmask
  description: "From 009 ERROR STATUS REQUEST: 12 bytes of error flags (cover, fan, temperature, lamp, mirror cover, interlock, etc.)"

- id: cover_status
  type: enum
  values: [normal_open, closed]
  description: "From 078-6 COVER STATUS REQUEST"
```

## Variables
```yaml
# Settable continuous/level parameters (each driven by a dedicated action above):
- id: brightness
  description: "PICTURE/BRIGHTNESS via 030-1 (target 00h) or read via 060-1 (name 00h)"
- id: contrast
  description: "PICTURE/CONTRAST via 030-1 (target 01h)"
- id: color
  description: "PICTURE/COLOR via 030-1 (target 02h)"
- id: hue
  description: "PICTURE/HUE via 030-1 (target 03h)"
- id: sharpness
  description: "PICTURE/SHARPNESS via 030-1 (target 04h)"
- id: volume
  description: "VOLUME via 030-2"
- id: lamp_light_adjust
  description: "LAMP/LIGHT ADJUST via 030-15 (target 96h FFh)"
- id: lamp_usage_time
  description: "Read-only seconds counter via 037-4 (content 01h)"
- id: lamp_remaining_life_pct
  description: "Read-only percent via 037-4 (content 04h); negative if replacement deadline exceeded"
- id: filter_usage_time
  description: "Read-only seconds counter via 037-3"
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications; protocol is request/response only.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: while power-on in progress, no other command accepted"
  - "POWER OFF: while power-off (including cooling time) in progress, no other command accepted"
  - "PICTURE/SOUND/ONSCREEN MUTE ON auto-cancelled by input terminal switch or video signal switch"
  - "SOUND MUTE also auto-cancelled by volume adjustment"
# UNRESOLVED: source states no explicit electrical safety warnings or power-on
# sequencing interlocks; observations above are command-execution interlocks
# quoted verbatim from source.
```

## Notes
- Command/response frames use hex byte notation. The 3rd/4th bytes (shown as `00h 00h` in the command column) are the `<ID1> <ID2>` slots; `ID1`=control ID, `ID2`=model code (model-dependent). Responses echo the projector's actual ID1/ID2.
- Checksum (CKS) = low-order byte of the sum of all preceding bytes (see worked example: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`).
- Serial connection requires a cross cable wired to the PC CONTROL D-SUB 9P port per the pin table in §1.1 (RxD/TxD crossed, RTS/CTS crossed, GND common).
- LAN control uses TCP port 7142 over wired (10/100 Mbps auto) or wireless LAN.
- Lamp/filter usage time is reported in one-second units but updated at one-minute intervals.
- Lamp remaining life (%) returns negative once the replacement deadline is exceeded.
- Several value tables (input terminal codes, aspect values, eco-mode values, sub-input values, base-model types) are referenced as "see Appendix Supplementary Information by Command" but the appendix is not present in the refined source.

<!-- UNRESOLVED: default baud rate not stated (source lists supported rates 115200/38400/19200/9600/4800 but not which is the device default) -->
<!-- UNRESOLVED: serial flow_control not stated; source says full-duplex only -->
<!-- UNRESOLVED: model code (ID2) value for NC2402ML IMS not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: appendix value tables (input terminal, aspect, eco mode, sub-input, base-model type) not present in refined source -->
<!-- UNRESOLVED: wireless LAN unit models / specs not in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:38:26.463Z
last_checked_at: 2026-06-18T08:33:26.334Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:33:26.334Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input-terminal code table, aspect value table, eco-mode value table, sub-input value table, base-model-type code table all referenced as \"see Appendix\" but appendix not in refined source"
- "full code list in appendix not in refined source\""
- "value list in appendix not in refined source\""
- "source documents no unsolicited notifications; protocol is request/response only."
- "source documents no multi-step sequences."
- "source states no explicit electrical safety warnings or power-on"
- "default baud rate not stated (source lists supported rates 115200/38400/19200/9600/4800 but not which is the device default)"
- "serial flow_control not stated; source says full-duplex only"
- "model code (ID2) value for NC2402ML IMS not stated"
- "firmware version compatibility not stated in source"
- "appendix value tables (input terminal, aspect, eco mode, sub-input, base-model type) not present in refined source"
- "wireless LAN unit models / specs not in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
