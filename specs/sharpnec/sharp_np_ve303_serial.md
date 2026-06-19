---
spec_id: admin/sharp-nec-np-ve303
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-VE303 Control Spec"
manufacturer: Sharp/NEC
model_family: NP-VE303
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-VE303
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:37:37.952Z
last_checked_at: 2026-06-18T08:58:01.692Z
generated_at: 2026-06-18T08:58:01.692Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "NP-VE303 model name not explicitly stated in source manual (source is a generic projector command reference, BDT140013 Rev 7.1). Model taken from caller-provided context."
  - "firmware version compatibility not stated in source."
  - "serial flow control not stated in source."
  - "Appendix \"Supplementary Information by Command\" referenced but not included in refined source — input terminal values, aspect values, eco mode values, base model types, sub input values not enumerated here."
  - "flow control not stated in source (source lists \"Communication mode: Full duplex\" only)"
  - "appendix not in refined source).\""
  - "not in refined source).\""
  - "no separate variable table in source beyond action params."
  - "source documents no unsolicited notification events. All responses are"
  - "source documents no named multi-step macro sequences."
  - "source contains no explicit user-confirmation requirements or"
  - "model name (NP-VE303) not explicitly stated in source — taken from caller context."
  - "Appendix \"Supplementary Information by Command\" referenced for input terminal values, aspect values, eco mode values, base model types, and PIP sub-input values — appendix not present in refined source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:58:01.692Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC NP-VE303 Control Spec

## Summary
Sharp/NEC NP-VE303 projector control spec. Binary hex command protocol over both RS-232C serial and TCP/IP (LAN, wired or wireless). Command frames use `20h/02h/03h`-prefixed hex with `<ID1> <ID2>` and trailing `<CKS>` checksum. Covers power, input switch, mute, picture/volume/aspect adjust, lens control/memory, shutter, freeze, eco mode, edge blending, PIP/PbP, and status/information queries.

<!-- UNRESOLVED: NP-VE303 model name not explicitly stated in source manual (source is a generic projector command reference, BDT140013 Rev 7.1). Model taken from caller-provided context. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: serial flow control not stated in source. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced but not included in refined source — input terminal values, aspect values, eco mode values, base model types, sub input values not enumerated here. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200/38400/19200/9600/4800  # source states auto-selectable rates
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (source lists "Communication mode: Full duplex" only)
addressing:
  port: 7142  # TCP port for command send/receive over LAN
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: 015 POWER ON / 016 POWER OFF present
  - queryable       # inferred: many REQUEST commands return state
  - levelable       # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST
  - routable        # inferred: 018 INPUT SW CHANGE selects input terminal
```

## Actions
```yaml
actions:
  - id: cmd_009_error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12 error bits; see source §2.4 + error information list."

  - id: cmd_015_power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning on power, no other command accepted."

  - id: cmd_016_power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "During cooldown, no other command accepted."

  - id: cmd_018_input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal value. Example: 06h = video port. Full value list in Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in refined source)."
    notes: "Source example for video: 02h 03h 00h 00h 02h 01h 06h 0Eh"

  - id: cmd_020_picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

  - id: cmd_021_picture_mute_off
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: cmd_022_sound_mute_on
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []

  - id: cmd_023_sound_mute_off
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: cmd_024_onscreen_mute_on
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []

  - id: cmd_025_onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: cmd_030_1_picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
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
    notes: "Brightness=10 example: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

  - id: cmd_030_2_volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
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
    notes: "Volume=10 example: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

  - id: cmd_030_12_aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Aspect value. Full list in Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in refined source)."

  - id: cmd_030_15_other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target: 96h=LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: byte
        description: "FFh (per source table)"
      - name: DATA03
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: cmd_037_information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time (DATA83-86), filter usage time (DATA87-90)."

  - id: cmd_037_3_filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08). -1 if undefined."

  - id: cmd_037_4_lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: byte
        description: "01h=lamp usage time (sec), 04h=lamp remaining life (%)"
    notes: "Lamp usage time example: 03h 96h 00h 00h 02h 00h 01h 9Ch"

  - id: cmd_037_6_carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: cmd_050_remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Key code low byte (WORD type). See key code list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: DATA02
        type: byte
        description: "Key code high byte (00h for all listed keys)"
    notes: "AUTO example: 02h 0Fh 00h 00h 02h 05h 00h 18h"

  - id: cmd_051_shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: cmd_052_shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: cmd_053_lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lens target: 06h=Periphery Focus"
      - name: DATA02
        type: byte
        description: "00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"

  - id: cmd_053_1_lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lens target (same as cmd_053)"
    notes: "Returns upper/lower adjustment limits and current value (DATA02-07)."

  - id: cmd_053_2_lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "FFh=Stop"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: cmd_053_3_lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: cmd_053_4_reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Controls profile number set via 053-10 LENS PROFILE SET."

  - id: cmd_053_5_lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: cmd_053_6_lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: byte
        description: "00h=OFF, 01h=ON"

  - id: cmd_053_7_lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift H, bit4=lens shift V operating state (0=Stop, 1=During operation)."

  - id: cmd_053_10_lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: cmd_053_11_lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: cmd_060_1_gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
    notes: "Brightness example: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

  - id: cmd_078_1_setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type, sound function, profile number."

  - id: cmd_078_2_running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling process, power on/off process, operation status."

  - id: cmd_078_3_input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal types 1/2, etc."

  - id: cmd_078_4_mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []

  - id: cmd_078_5_model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cmd_078_6_cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns mirror/lens cover status: 00h=Normal (opened), 01h=Cover closed."

  - id: cmd_079_freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "01h=freeze on, 02h=freeze off"

  - id: cmd_084_information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00 <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: cmd_097_8_eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns Light mode or Lamp mode value depending on projector. Value list in Appendix (UNRESOLVED: not in refined source)."

  - id: cmd_097_45_lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: cmd_097_155_lan_mac_address_status_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: cmd_097_198_pip_pbp_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: cmd_097_243_1_edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: cmd_098_8_eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Eco mode value. Full list in Appendix (UNRESOLVED: not in refined source)."

  - id: cmd_098_45_lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
    params:
      - name: DATA01_DATA16
        type: bytes
        description: "Projector name (up to 16 bytes, NUL-terminated)"

  - id: cmd_098_198_pip_pbp_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: byte
        description: "Setting value. For MODE: 00h=PIP, 01h=PbP. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values in Appendix (UNRESOLVED: not in refined source)."

  - id: cmd_098_243_1_edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=OFF, 01h=ON"

  - id: cmd_305_1_base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02), model name string (DATA03-11)."

  - id: cmd_305_2_serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: cmd_305_3_basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal types 1/2, mute/freeze status."

  - id: cmd_319_10_audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal. Value list in Appendix (UNRESOLVED: not in refined source)."
      - name: DATA02
        type: byte
        description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: command_response_success
    type: ack
    description: "All commands return A0h/A1h/A2h/A3h-prefixed response with <ID1> <ID2> LEN <ERR1> <ERR2> <CKS> when execution succeeds (no data) or with DATA appended when data requested."

  - id: command_response_error
    type: error
    description: "On failure, response returns ERR1/ERR2 code pair. See §2.4 error code list. Examples: 00h/00h=unrecognized, 00h/01h=not supported, 01h/00h=invalid value, 02h/0Dh=power off, 02h/0Eh=execution failed, 02h/0Fh=no authority."
```

## Variables
```yaml
# No separate settable-variable model; settable parameters live in Actions
# (PICTURE ADJUST targets, VOLUME, ASPECT, LAMP ADJUST, eco mode, lens memory
# options). UNRESOLVED: no separate variable table in source beyond action params.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notification events. All responses are
# reply-framed to a preceding command.
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes:
#   - 015 POWER ON: while turning on power, no other command accepted.
#   - 016 POWER OFF: during cooldown (including cooling time), no other command accepted.
# These are projector-side command-blocking interlocks, not confirmation prompts.
# <!-- UNRESOLVED: source contains no explicit user-confirmation requirements or
#     safety interlock procedures beyond the power-on/off command blocking notes. -->
```

## Notes
- Binary hex protocol. Frame shape: `<prefix> <cmd> <ID1> <ID2> <LEN> [DATA...] <CKS>`. Prefix bytes encode command class (`00h/01h/02h/03h` request, `20h/21h/22h/23h` reply, `A0h/A1h/A2h/A3h` error).
- Checksum (CKS) = low-order byte of sum of all preceding bytes. Worked example from source: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- `<ID1>` = control ID set on projector; `<ID2>` = model code (varies by model).
- Both RS-232C and LAN (TCP port 7142) supported. RS-232C requires cross cable on PC CONTROL D-SUB 9P.
- Wireless LAN requires separate wireless LAN unit (see model operation manual).
- Usage times (lamp, filter) update at one-minute intervals even though resolution is one second.
- Lamp remaining life returns negative when replacement deadline exceeded.

<!-- UNRESOLVED: model name (NP-VE303) not explicitly stated in source — taken from caller context. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: serial flow control not stated in source. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced for input terminal values, aspect values, eco mode values, base model types, and PIP sub-input values — appendix not present in refined source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:37:37.952Z
last_checked_at: 2026-06-18T08:58:01.692Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:58:01.692Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "NP-VE303 model name not explicitly stated in source manual (source is a generic projector command reference, BDT140013 Rev 7.1). Model taken from caller-provided context."
- "firmware version compatibility not stated in source."
- "serial flow control not stated in source."
- "Appendix \"Supplementary Information by Command\" referenced but not included in refined source — input terminal values, aspect values, eco mode values, base model types, sub input values not enumerated here."
- "flow control not stated in source (source lists \"Communication mode: Full duplex\" only)"
- "appendix not in refined source).\""
- "not in refined source).\""
- "no separate variable table in source beyond action params."
- "source documents no unsolicited notification events. All responses are"
- "source documents no named multi-step macro sequences."
- "source contains no explicit user-confirmation requirements or"
- "model name (NP-VE303) not explicitly stated in source — taken from caller context."
- "Appendix \"Supplementary Information by Command\" referenced for input terminal values, aspect values, eco mode values, base model types, and PIP sub-input values — appendix not present in refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
