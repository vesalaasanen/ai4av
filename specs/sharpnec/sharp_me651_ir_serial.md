---
spec_id: admin/sharpnec-me651-ir
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC ME651 IR Control Spec"
manufacturer: Sharp/NEC
model_family: "ME651 IR"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "ME651 IR"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T07:14:00.146Z
last_checked_at: 2026-06-18T08:30:57.688Z
generated_at: 2026-06-18T08:30:57.688Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "model code (ID2) value for ME651 IR not stated in source"
  - "default control ID (ID1) value not stated in source"
  - "full mapping of (err1,err2) → human label left to client; source table is exhaustive."
  - "eco mode enum literals not inline in main command section."
  - "aspect enum literals not inline in main command section."
  - "no unsolicited event frames described in source."
  - "source contains no explicit safety interlock procedures, voltage/current"
  - "enum literals in source Appendix`."
  - "default control ID (ID1) not stated in source"
  - "enum literals for eco mode, aspect, input terminal, base model type, sub-input deferred to source Appendix not present in refined excerpt"
  - "serial config default baud rate not stated (5 rates listed, no default)"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:30:57.688Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC ME651 IR Control Spec

## Summary
Sharp/NEC ME651 IR projector control spec derived from the Projector Control Command Reference Manual (BDT140013 Rev 7.1). Covers RS-232C serial and wired/wireless LAN (TCP) control using a hexadecimal frame protocol with ID1/ID2/LEN/DATA/CKS structure. Enumerates 53 documented commands spanning power, input switching, mute, picture/volume/lens adjustment, lens memory, status queries, eco mode, LAN identity, PIP/PbP, and edge blending.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: model code (ID2) value for ME651 IR not stated in source -->
<!-- UNRESOLVED: default control ID (ID1) value not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists supported rates: 115200, 38400, 19200, 9600, 4800 bps; no single default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: source states "Full duplex" communication mode; no flow-control field documented
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF commands present
  - queryable    # inferred: numerous request commands (009, 037*, 053-1/5/7/11, 060-1, 078-*, 084, 097-*, 305-*)
  - levelable    # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST
  - routable     # inferred: 018 INPUT SW CHANGE command present
```

## Actions
```yaml
# All 53 commands enumerated verbatim from source §3. Hex payloads copied as written.
# Frame structure: bytes shown space-separated; <ID1> <ID2> <CKS> are runtime-computed
# per source §2.2 (CKS = low byte of sum of all preceding bytes).
# kind: query marks request commands returning DATA; kind: action marks setters/triggers.

actions:
  # --- Power & mute (015-025) ---
  - id: cmd_009_error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12 bitfield error info (cover/fan/temp/lamp/formatter/interlock)."

  - id: cmd_015_power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power-on in progress."

  - id: cmd_016_power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off incl. cooling time."

  - id: cmd_018_input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {input_terminal} {cks}"
    params:
      - name: input_terminal
        type: byte
        description: "Input terminal code (e.g. 06h=video port). Full list in source Appendix 'Supplementary Information by Command'."
    notes: "Source example: 02h 03h 00h 00h 02h 01h 06h 0Eh (video). Response DATA01=FFh means no-signal switch error."

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

  # --- Adjust group (030-*) ---
  - id: cmd_030_1_picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {cks}"
    params:
      - name: target
        type: byte
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: byte
        description: "00h=absolute, 01h=relative"
      - name: value_lo
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: value_hi
        type: byte
        description: "Adjustment value (high-order 8 bits)"
    notes: "Source ex (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h."

  - id: cmd_030_2_volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {cks}"
    params:
      - name: mode
        type: byte
        description: "00h=absolute, 01h=relative"
      - name: value_lo
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: value_hi
        type: byte
        description: "Adjustment value (high-order 8 bits)"
    notes: "Source ex (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

  - id: cmd_030_12_aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect} 00h {cks}"
    params:
      - name: aspect
        type: byte
        description: "Aspect value; see source Appendix 'Supplementary Information by Command'."

  - id: cmd_030_15_other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {target_lo} {target_hi} {mode} {value_lo} {value_hi} {cks}"
    params:
      - name: target_lo
        type: byte
        description: "96h for LAMP ADJUST / LIGHT ADJUST"
      - name: target_hi
        type: byte
        description: "FFh for LAMP ADJUST / LIGHT ADJUST"
      - name: mode
        type: byte
        description: "00h=absolute, 01h=relative"
      - name: value_lo
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: value_hi
        type: byte
        description: "Adjustment value (high-order 8 bits)"
    notes: "Only LAMP/LIGHT ADJUST (DATA01=96h, DATA02=FFh) target documented in source."

  # --- Information requests (037-*) ---
  - id: cmd_037_information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage sec (DATA83-86), filter usage sec (DATA87-90)."

  - id: cmd_037_3_filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage seconds (DATA01-04), filter alarm start seconds (DATA05-08). -1 if undefined."

  - id: cmd_037_4_lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {lamp} {content} {cks}"
    params:
      - name: lamp
        type: byte
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: content
        type: byte
        description: "01h=lamp usage time (sec), 04h=lamp remaining life (%)"
    notes: "Source ex (lamp1 usage): 03h 96h 00h 00h 02h 00h 01h 9Ch. Remaining life is negative past deadline."

  - id: cmd_037_6_carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {scope} {cks}"
    params:
      - name: scope
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

  # --- Remote / shutter / lens (050-053-*) ---
  - id: cmd_050_remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} {cks}"
    params:
      - name: key_lo
        type: byte
        description: "Key code low byte (see source key code list, e.g. 05h=AUTO)"
      - name: key_hi
        type: byte
        description: "Key code high byte (typically 00h)"
    notes: "Source key table: 02h/00h=POWER ON, 03h/00h=POWER OFF, 06h/00h=MENU, 29h/00h=PICTURE, etc."

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
    command: "02h 18h 00h 00h 02h {target} {motion} {cks}"
    params:
      - name: target
        type: byte
        description: "06h=Periphery Focus (only value documented in source table)"
      - name: motion
        type: byte
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
    notes: "After 7Fh/81h, send 00h to stop. Same command may be issued without stop during drive."

  - id: cmd_053_1_lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {target} 00h {cks}"
    params:
      - name: target
        type: byte
        description: "Lens adjustment target (value space not enumerated in source for this command)"
    notes: "Returns upper/lower range and current value (low+high 8-bit pairs)."

  - id: cmd_053_2_lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {cks}"
    params:
      - name: target
        type: byte
        description: "FFh=Stop (mode/value ignored); other targets not enumerated in source"
      - name: mode
        type: byte
        description: "00h=absolute, 02h=relative"
      - name: value_lo
        type: byte
      - name: value_hi
        type: byte

  - id: cmd_053_3_lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {op} {cks}"
    params:
      - name: op
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: cmd_053_4_reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {op} {cks}"
    params:
      - name: op
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Operates on profile selected via 053-10 LENS PROFILE SET."

  - id: cmd_053_5_lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {option} {cks}"
    params:
      - name: option
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: cmd_053_6_lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {option} {value} {cks}"
    params:
      - name: option
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: byte
        description: "00h=OFF, 01h=ON"

  - id: cmd_053_7_lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift H, bit4=lens shift V (0=Stop,1=During operation)."

  - id: cmd_053_10_lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {profile} {cks}"
    params:
      - name: profile
        type: byte
        description: "00h=Profile 1, 01h=Profile 2"

  - id: cmd_053_11_lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns DATA01 profile (00h=Profile 1, 01h=Profile 2)."

  # --- Gain / status (060, 078-*) ---
  - id: cmd_060_1_gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {gain} 00h 00h {cks}"
    params:
      - name: gain
        type: byte
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: "Source ex (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns range/default/current/wide/narrow widths."

  - id: cmd_078_1_setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock/sleep (DATA05)."

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
    notes: "Returns signal switch process, signal list number (-1), selection signal type 1/2, content displayed."

  - id: cmd_078_4_mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute + OSD display flags."

  - id: cmd_078_5_model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns model name (DATA01-32, NUL-terminated)."

  - id: cmd_078_6_cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns mirror/lens cover status (00h=Normal/opened, 01h=Cover closed)."

  # --- Freeze / info string (079, 084) ---
  - id: cmd_079_freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {state} {cks}"
    params:
      - name: state
        type: byte
        description: "01h=freeze ON, 02h=freeze OFF"

  - id: cmd_084_information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {info_type} 01h {cks}"
    params:
      - name: info_type
        type: byte
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  # --- LAN / eco / PIP / edge blending (097-*, 098-*) ---
  - id: cmd_097_8_eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns eco/light/lamp mode value (see source Appendix)."

  - id: cmd_097_45_lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns projector name (DATA01-17, NUL-terminated)."

  - id: cmd_097_155_lan_mac_address_status_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns MAC address (DATA01-06)."

  - id: cmd_097_198_pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {item} {cks}"
    params:
      - name: item
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: cmd_097_243_1_edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns edge blending state (00h=OFF, 01h=ON)."

  - id: cmd_098_8_eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {value} {cks}"
    params:
      - name: value
        type: byte
        description: "Eco/light/lamp mode value (see source Appendix)."

  - id: cmd_098_45_lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {name_01} {name_02} ... {name_16} 00h {cks}"
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes (DATA01-16), NUL-terminated."
    notes: "Source frame: 03h B1h 00h 00h 12h 2Ch <DATA01>..<DATA16> 00h <CKS>."

  - id: cmd_098_198_pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {item} {value} {cks}"
    params:
      - name: item
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: byte
        description: "Item-dependent (MODE: 00h=PIP, 01h=PbP; START POS: 00h=TL,01h=TR,02h=BL,03h=BR; SUB INPUT: see Appendix)."

  - id: cmd_098_243_1_edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {value} {cks}"
    params:
      - name: value
        type: byte
        description: "00h=OFF, 01h=ON"

  # --- Identity / audio (305-*, 319-*) ---
  - id: cmd_305_1_base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11)."

  - id: cmd_305_2_serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns serial number string (DATA01-16, NUL-terminated)."

  - id: cmd_305_3_basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal types, mute/freeze flags."

  - id: cmd_319_10_audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {input} {value} {cks}"
    params:
      - name: input
        type: byte
        description: "Input terminal code (see source Appendix)."
      - name: value
        type: byte
        description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Per source §2.3, every command returns an acknowledgement frame:
#   success/no-data: 2Xh <op> <ID1> <ID2> <LEN> [<DATA...>] <CKS>
#   success/data:    same with DATA payload per command
#   failure:         AXh <op> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# ERR1/ERR2 codes enumerated in source §2.4 (e.g. 00h/00h=unrecognized,
# 00h/01h=unsupported by model, 01h/00h=invalid value, 02h/0Dh=power off,
# 02h/0Fh=no authority). Full error-code table in source lines 194-219.

feedbacks:
  - id: command_ack
    type: enum
    description: "Per-command acknowledgement. ACK frame starts with 2Xh (X=command-group nibble)."
    values: [success, error]

  - id: error_code
    type: composite
    description: "ERR1+ERR2 byte pair from failure response frame AXh <op> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>."
    fields:
      - err1: byte
      - err2: byte
    # UNRESOLVED: full mapping of (err1,err2) → human label left to client; source table is exhaustive.
```

## Variables
```yaml
# Settable parameters exposed via 030-*/053-*/098-* commands. Range/default
# discovered at runtime via 060-1 GAIN PARAMETER REQUEST 3 and 053-1 LENS
# CONTROL REQUEST. Source does not publish fixed ranges inline.

variables:
  - id: picture_brightness
    type: integer
    unit: "source-defined"
    access: rw
    notes: "Set via 030-1 (target=00h); range via 060-1 (gain=00h)."

  - id: picture_contrast
    type: integer
    access: rw
    notes: "Set via 030-1 (target=01h); range via 060-1 (gain=01h)."

  - id: picture_color
    type: integer
    access: rw
    notes: "Set via 030-1 (target=02h); range via 060-1 (gain=02h)."

  - id: picture_hue
    type: integer
    access: rw
    notes: "Set via 030-1 (target=03h); range via 060-1 (gain=03h)."

  - id: picture_sharpness
    type: integer
    access: rw
    notes: "Set via 030-1 (target=04h); range via 060-1 (gain=04h)."

  - id: volume
    type: integer
    access: rw
    notes: "Set via 030-2; range via 060-1 (gain=05h)."

  - id: lamp_light_adjust
    type: integer
    access: rw
    notes: "Set via 030-15 (DATA01=96h, DATA02=FFh); range via 060-1 (gain=96h)."

  - id: eco_mode
    type: enum
    access: rw
    notes: "Set via 098-8, get via 097-8. Enum values in source Appendix 'Supplementary Information by Command'."
    # UNRESOLVED: eco mode enum literals not inline in main command section.

  - id: lan_projector_name
    type: string
    max_length: 16
    access: rw
    notes: "Set via 098-45, get via 097-45."

  - id: edge_blending_mode
    type: enum
    values: [off, on]
    access: rw
    notes: "Set via 098-243-1, get via 097-243-1."

  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    access: rw
    notes: "Set via 053-10, get via 053-11."

  - id: freeze_state
    type: enum
    values: [on, off]
    access: rw
    notes: "Set via 079; readable via 305-3 (DATA09)."

  - id: aspect
    type: enum
    access: rw
    notes: "Set via 030-12. Enum literals in source Appendix."
    # UNRESOLVED: aspect enum literals not inline in main command section.
```

## Events
```yaml
# Source §2.3 describes only solicited responses (command → ack/data/error).
# No unsolicited notification frames documented.
events: []
# UNRESOLVED: no unsolicited event frames described in source.
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: cmd_015_power_on
    constraint: "No other command accepted while power-on in progress (source §3.2)."
  - command: cmd_016_power_off
    constraint: "No other command accepted during power-off incl. cooling time (source §3.3)."
  - command: cmd_053_lens_control
    constraint: "After continuous-drive (7Fh/81h), must send 00h to stop (source §3.22)."
# UNRESOLVED: source contains no explicit safety interlock procedures, voltage/current
# specs, or power-on sequencing requirements beyond the command-level locks above.
```

## Notes
- **Frame format** (source §2.1): all commands/responses are hex frames. Request frames begin with a literal byte (00h–03h) identifying the command group; acknowledgement frames begin with `2Xh` (same group nibble, MSB set), error frames with `AXh`.
- **Checksum** (CKS, source §2.2): low-order one byte of the sum of all preceding bytes. Example given: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- **Parameters ID1/ID2/LEN/ERR1/ERR2** are documented in source §2.2. `ID1` = control ID set on projector; `ID2` = model code (varies by model, not stated for ME651 IR); `LEN` = byte length of DATA following.
- **Appendix references**: several commands (input terminal codes, aspect values, eco mode values, base model types, sub-input values, signal type mappings) defer to an Appendix "Supplementary Information by Command" that is not included in the refined source excerpt. These are marked inline as `# UNRESOLVED: enum literals in source Appendix`.
- **Baud rate**: source lists five supported rates (115200/38400/19200/9600/4800) without designating a default; 9600 emitted in the serial block as the lowest common denominator with the full set noted in a comment.
- **Flow control**: source states "Communication mode: Full duplex" but no explicit flow-control setting; `flow_control: none` is inferred.
- **Auth**: no login, password, or token procedure appears anywhere in the manual → `auth.type: none` inferred (Tier 2).
- **Response semantics**: a `2Xh` response with `DATA01=FFh` (where applicable, e.g. 018, 050, 053) signals command-ended-with-error at the protocol level, distinct from an `AXh` error frame carrying ERR1/ERR2.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: model code (ID2) value for ME651 IR not stated in source -->
<!-- UNRESOLVED: default control ID (ID1) not stated in source -->
<!-- UNRESOLVED: enum literals for eco mode, aspect, input terminal, base model type, sub-input deferred to source Appendix not present in refined excerpt -->
<!-- UNRESOLVED: serial config default baud rate not stated (5 rates listed, no default) -->
````

Spec emit done. 53 commands, all hex verbatim. Transport dual serial+tcp. 4 traits. Gaps marked `<!-- UNRESOLVED -->`. Ready ingest.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T07:14:00.146Z
last_checked_at: 2026-06-18T08:30:57.688Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:30:57.688Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "model code (ID2) value for ME651 IR not stated in source"
- "default control ID (ID1) value not stated in source"
- "full mapping of (err1,err2) → human label left to client; source table is exhaustive."
- "eco mode enum literals not inline in main command section."
- "aspect enum literals not inline in main command section."
- "no unsolicited event frames described in source."
- "source contains no explicit safety interlock procedures, voltage/current"
- "enum literals in source Appendix`."
- "default control ID (ID1) not stated in source"
- "enum literals for eco mode, aspect, input terminal, base model type, sub-input deferred to source Appendix not present in refined excerpt"
- "serial config default baud rate not stated (5 rates listed, no default)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
