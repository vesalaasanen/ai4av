---
spec_id: admin/sharp-nec-m981-avt3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC M981 Avt3 Control Spec"
manufacturer: Sharp/NEC
model_family: "M981 Avt3"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "M981 Avt3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:35:33.570Z
last_checked_at: 2026-06-18T08:13:42.207Z
generated_at: 2026-06-18T08:13:42.207Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Control ID (ID1) and model code (ID2) are runtime device values, not stated in source. Input terminal value table (DATA01 of INPUT SW CHANGE) and aspect value table referenced in an \"Appendix\" not present in this refined source — sub-values therefore unresolved. Sub input setting values for PiP/PbP likewise referenced to that appendix."
  - "source states \"Full duplex\" communication mode but no flow-control (RTS/CTS hardware handshake) value"
  - "appendix not in refined source.\""
  - "appendix table not in refined source).\""
  - "value table in source Appendix not in refined source.\""
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "firmware version compatibility not stated. Input-terminal value table, aspect value table, eco-mode value table, and PiP/PbP sub-input value table are referenced to an \"Appendix: Supplementary Information by Command\" that is not present in this refined source. Control ID (ID1) default and model code (ID2) for M981 Avt3 not stated. Flow-control / hardware-handshake setting not stated (only \"Full duplex\" mode)."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:13:42.207Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC M981 Avt3 Control Spec

## Summary
Sharp/NEC M981 Avt3 projector. Controlled via RS-232C serial (PC CONTROL D-SUB 9P) and/or TCP/IP LAN (wired RJ-45 / wireless LAN unit), TCP port 7142. Binary framed protocol: each command is a hex byte sequence terminated by a checksum byte (CKS = low byte of sum of all preceding bytes). 53 documented commands covering power, input switching, mute, picture/volume/aspect/gain adjust, lens control & memory, shutter, freeze, eco mode, edge blending, PiP/PbP, and a large set of status/information queries.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Control ID (ID1) and model code (ID2) are runtime device values, not stated in source. Input terminal value table (DATA01 of INPUT SW CHANGE) and aspect value table referenced in an "Appendix" not present in this refined source — sub-values therefore unresolved. Sub input setting values for PiP/PbP likewise referenced to that appendix. -->

## Transport
```yaml
# Two transports documented: RS-232C serial and TCP/IP LAN.
# UDP / HTTP / OSC: not documented → omitted (N/A, not UNRESOLVED).
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands."
auth:
  type: none  # inferred: no login/password/auth procedure in source
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all five as valid
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: source states "Full duplex" communication mode but no flow-control (RTS/CTS hardware handshake) value
```

## Traits
```yaml
traits:
  - powerable     # inferred: 015 POWER ON / 016 POWER OFF commands
  - routable      # inferred: 018 INPUT SW CHANGE command
  - queryable     # inferred: many *REQUEST commands return state/values
  - levelable     # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST set continuous values
```

## Actions
```yaml
# Protocol framing (verbatim from source §2.1-2.2):
#   Command: hex byte sequence. Last byte <CKS> = checksum.
#   CKS rule: ① sum all bytes preceding the checksum; ② low-order one byte of the
#            sum is the checksum. (Source example: 20+81+01+60+01+00 = 103h → CKS = 03h.)
#   <ID1> = control ID (runtime device value); <ID2> = model code (runtime device value).
#   Fixed commands below carry the literal CKS as the final byte, copied verbatim.
#   Parameterized commands carry <CKS> placeholder (computed at runtime) plus <DATA??> args.
#   Response codes A0/A1/A2/A3h prefixes + <ERR1> <ERR2> per source §2.3-2.4.
#   Query kind = commands that elicit a returned value/status (per source §2 Command List
#   descriptions "Gets ..."). Action kind = set/execute commands.

actions:
  - id: cmd_009_error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    note: "Returns DATA01-DATA12 error bitmap (cover/fan/temp/lamp/etc.). See §3.1."

  - id: cmd_015_power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    note: "While turning on, no other command accepted."

  - id: cmd_016_power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    note: "During power-off incl. cooling, no other command accepted."

  - id: cmd_018_input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal value (e.g. 06h = video port). Full value table in source Appendix - UNRESOLVED: appendix not in refined source."

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
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h absolute, 01h relative"
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: cmd_030_2_volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment mode: 00h absolute, 01h relative"
      - name: DATA02
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: cmd_030_12_aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Aspect value. Full value table in source Appendix - UNRESOLVED: appendix not in refined source."

  - id: cmd_030_15_other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target high byte (96h with DATA02=FFh → LAMP ADJUST / LIGHT ADJUST per source table)"
      - name: DATA02
        type: byte
        description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)"
      - name: DATA03
        type: byte
        description: "Adjustment mode: 00h absolute, 01h relative"
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
    note: "Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90)."

  - id: cmd_037_3_filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    note: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined."

  - id: cmd_037_4_lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: byte
        description: "Content: 01h usage time (seconds), 04h remaining life (%)"

  - id: cmd_037_6_carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h Total Carbon Savings, 01h Carbon Savings during operation"

  - id: cmd_050_remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Key code low byte (WORD type). Source key code list includes e.g. 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO."
      - name: DATA02
        type: byte
        description: "Key code high byte (all listed keys use 00h)."

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
        description: "Target (e.g. 06h Periphery Focus; other target values in source table)"
      - name: DATA02
        type: byte
        description: "Content: 00h Stop, 01h drive +1s, 02h +0.5s, 03h +0.25s, 7Fh drive +, 81h drive -, FDh -0.25s, FEh -0.5s, FFh -1s."

  - id: cmd_053_1_lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lens target to query (upper/lower limits + current value)"

  - id: cmd_053_2_lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Target (FFh = Stop; adjustment mode/value ignored when Stop)"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h absolute, 02h relative"
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
        description: "00h MOVE, 01h STORE, 02h RESET"

  - id: cmd_053_4_reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h MOVE, 01h STORE, 02h RESET (acts on profile set by 053-10)"

  - id: cmd_053_5_lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"

  - id: cmd_053_6_lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
      - name: DATA02
        type: byte
        description: "Setting value: 00h OFF, 01h ON"

  - id: cmd_053_7_lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    note: "Returns DATA01 bitmap: lens memory/zoom/focus/lens-shift(H/V) stop or in-operation."

  - id: cmd_053_10_lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Profile number: 00h Profile 1, 01h Profile 2"

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
        description: "Adjusted value name: 00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST"

  - id: cmd_078_1_setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    note: "Returns base model type, sound function availability, profile/timer capability."

  - id: cmd_078_2_running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    note: "Returns power status, cooling/power-on process state, operation status."

  - id: cmd_078_3_input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    note: "Returns signal switch state, signal list number, selection signal types, content displayed."

  - id: cmd_078_4_mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    note: "Returns picture/sound/onscreen/forced-onscreen mute + OSD display state."

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
    note: "00h Normal (cover opened), 01h Cover closed."

  - id: cmd_079_freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "01h freeze ON, 02h freeze OFF"

  - id: cmd_084_information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "03h Horizontal sync frequency, 04h Vertical sync frequency"

  - id: cmd_097_8_eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    note: "Returns Light mode / Lamp mode value. Value table in source Appendix - UNRESOLVED: appendix not in refined source."

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

  - id: cmd_097_198_pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

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
        description: "Eco/Light/Lamp mode value. Value table in source Appendix - UNRESOLVED: appendix not in refined source."

  - id: cmd_098_45_lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: DATA01_16
        type: bytes
        description: "Projector name (up to 16 bytes, NUL-terminated)"

  - id: cmd_098_198_pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
      - name: DATA02
        type: byte
        description: "Setting value (MODE: 00h PIP / 01h PbP; START POSITION: 00h TOP-LEFT, 01h TOP-RIGHT, 02h BOTTOM-LEFT, 03h BOTTOM-RIGHT; SUB INPUT: sub input value - UNRESOLVED: appendix table not in refined source)."

  - id: cmd_098_243_1_edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h OFF, 01h ON"

  - id: cmd_305_1_base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

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
    note: "Returns operation status, content displayed, signal types, mute/freeze state."

  - id: cmd_319_10_audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal value - UNRESOLVED: value table in source Appendix not in refined source."
      - name: DATA02
        type: byte
        description: "Audio source: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
# All responses share framing: <prefix>h <opcode> <ID1> <ID2> <LEN> <DATA??..> <CKS>
# Success prefixes by command group: A0h (00h-cmds), A1h (01h), A2h (02h), A3h (03h).
# Failure: same prefix + <ERR1> <ERR2> + <CKS>. See Events/Notes for the ERR table.
feedbacks:
  - id: ack_success
    type: ack
    description: "Success response (no data): <PFX>h <op> <ID1> <ID2> 00h <CKS>"
  - id: ack_success_with_data
    type: ack
    description: "Success response (with data): <PFX>h <op> <ID1> <ID2> <LEN> <DATA..> <CKS>"
  - id: error_response
    type: enum
    description: "Failure: <PFX>h <op> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>. ERR1/ERR2 per §2.4 table."
    values:
      - "00h 00h: command not recognized"
      - "00h 01h: command not supported by model"
      - "01h 00h: specified value invalid"
      - "01h 01h: specified input terminal invalid"
      - "01h 02h: specified language invalid"
      - "02h 00h: memory allocation error"
      - "02h 02h: memory in use"
      - "02h 03h: specified value cannot be set"
      - "02h 04h: forced onscreen mute on"
      - "02h 06h: viewer error"
      - "02h 07h: no signal"
      - "02h 08h: test pattern or filter displayed"
      - "02h 09h: no PC card inserted"
      - "02h 0Ah: memory operation error"
      - "02h 0Ch: entry list displayed"
      - "02h 0Dh: command not accepted (power off)"
      - "02h 0Eh: command execution failed"
      - "02h 0Fh: no authority for operation"
      - "03h 00h: specified gain number incorrect"
      - "03h 01h: specified gain invalid"
      - "03h 02h: adjustment failed"
```

## Variables
```yaml
# Query responses expose device variables (read-only state). Settable parameters are
# already modeled as Actions (030-1/030-2/030-15, 098-*, lens memory, etc.).
# No additional settable non-discrete variables beyond those actions.
variables: []
```

## Events
```yaml
# Source describes no unsolicited notifications - all responses are solicited
# (returned after a command). No event section to populate.
events: []
```

## Macros
```yaml
# Source documents no multi-step macro sequences.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements beyond behavioral notes that POWER ON/OFF reject
# other commands during transition. Those timing notes are captured per-action.
```

## Notes
- **Checksum (CKS)**: sum of all preceding bytes, take low-order 8 bits. Example from source: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- **ID1 / ID2**: runtime device values (control ID + model code). Not fixed in source; populated at runtime from the projector's configured control ID and the model in use.
- **Response prefixes**: `A0h` for `00h`-group commands, `A1h` for `01h`, `A2h` for `02h`, `A3h` for `03h`. Failure replaces the data payload with `02h <ERR1> <ERR2>`.
- **POWER ON / POWER OFF**: no other commands accepted during the on/off transition (incl. cooling time) — source §3.2/§3.3.
- **PICTURE/SOUND/ONSCREEN MUTE ON**: auto-cleared on input/video-signal switch (and volume adjust for sound mute) — source §3.5/§3.7/§3.9.
- **LENS CONTROL**: while lens driving, re-issuing the same command continues motion without an intermediate stop (§3.22). After 7Fh/81h continuous-drive, send 00h to stop.
- **Serial**: full-duplex, cross cable, D-SUB 9P. Pin-out: 2↔3 RxD/TxD, 7↔8 RTS/CTS, 5 GND.
- **LAN**: wired RJ-45 (10/100 Mbps auto) or optional wireless LAN unit; TCP 7142 for command send/receive.

<!-- UNRESOLVED: firmware version compatibility not stated. Input-terminal value table, aspect value table, eco-mode value table, and PiP/PbP sub-input value table are referenced to an "Appendix: Supplementary Information by Command" that is not present in this refined source. Control ID (ID1) default and model code (ID2) for M981 Avt3 not stated. Flow-control / hardware-handshake setting not stated (only "Full duplex" mode). -->
````

Spec above. 53 actions = full command list enumerated, payloads verbatim. Gaps marked UNRESOLVED (appendix tables, flow control, ID1/ID2, firmware).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:35:33.570Z
last_checked_at: 2026-06-18T08:13:42.207Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:13:42.207Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Control ID (ID1) and model code (ID2) are runtime device values, not stated in source. Input terminal value table (DATA01 of INPUT SW CHANGE) and aspect value table referenced in an \"Appendix\" not present in this refined source — sub-values therefore unresolved. Sub input setting values for PiP/PbP likewise referenced to that appendix."
- "source states \"Full duplex\" communication mode but no flow-control (RTS/CTS hardware handshake) value"
- "appendix not in refined source.\""
- "appendix table not in refined source).\""
- "value table in source Appendix not in refined source.\""
- "source contains no explicit safety warnings, interlock procedures, or"
- "firmware version compatibility not stated. Input-terminal value table, aspect value table, eco-mode value table, and PiP/PbP sub-input value table are referenced to an \"Appendix: Supplementary Information by Command\" that is not present in this refined source. Control ID (ID1) default and model code (ID2) for M981 Avt3 not stated. Flow-control / hardware-handshake setting not stated (only \"Full duplex\" mode)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
