---
spec_id: admin/sharp-nec-ld-d151
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld D151 Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld D151"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld D151"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:16:04.050Z
last_checked_at: 2026-06-17T19:59:53.461Z
generated_at: 2026-06-17T19:59:53.461Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "input-terminal DATA01 value enumerations and eco-mode values are referenced as \"see Appendix Supplementary Information by Command\" which is not included in the provided refined source text"
  - "flow control not explicitly named; \"Full duplex\" communication mode stated but RTS/CTS flow-control semantics not specified"
  - "no standalone variable definitions distinct from action params found in source"
  - "no unsolicited event notifications described in source"
  - "no multi-step macro sequences described in source"
  - "flow-control semantics not specified (only \"Full duplex\" communication mode stated)"
  - "default baud rate not stated (source lists 5 selectable values)"
  - "full input-terminal DATA01 value enumerations referenced as Appendix 'Supplementary Information by Command' — not present in refined source"
  - "full eco-mode value enumerations referenced as Appendix 'Supplementary Information by Command' — not present in refined source"
  - "full aspect value enumerations referenced as Appendix — not present in refined source"
  - "sub-input setting values for PIP/PbP referenced as Appendix — not present in refined source"
verification:
  verdict: verified
  checked_at: 2026-06-17T19:59:53.461Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim to source command reference. Transport parameters verified against section 1.2. No command gaps detected. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld D151 Control Spec

## Summary
Sharp/NEC Ld D151 projector control spec covering RS-232C serial and wired/wireless LAN (TCP) interfaces per the Projector Control Command Reference Manual (BDT140013 Revision 7.1). Commands are binary hex frames with checksums; control covers power, input switching, muting, picture/volume/aspect adjustment, lens control and memory, status queries, eco mode, PIP/PbP, edge blending, and audio select.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: input-terminal DATA01 value enumerations and eco-mode values are referenced as "see Appendix Supplementary Information by Command" which is not included in the provided refined source text -->

## Transport
```yaml
# Source documents BOTH a serial port (PC CONTROL D-SUB 9P, RS-232C) and a
# LAN connection (wired/wireless) using TCP port 7142 for command send/receive.
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  # Source states "115200/38400/19200/9600/4800 bps" as selectable baud rates.
  # Default not explicitly stated; all stated values listed.
  baud_rate: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly named; "Full duplex" communication mode stated but RTS/CTS flow-control semantics not specified
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: 015 POWER ON / 016 POWER OFF present
  - queryable   # inferred: many status/information request commands present
  - routable    # inferred: 018 INPUT SW CHANGE present
  - levelable   # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 053 LENS CONTROL present
```

## Actions
```yaml
# All 53 commands from section 2 command list enumerated. Payloads verbatim
# from source. <ID1>, <ID2>, <CKS> are frame parameters common to all commands
# (ID1 = control ID, ID2 = model code, CKS = low-byte checksum of all preceding
# bytes). DATA?? are command-specific variable bytes.
actions:
  - id: cmd_009_error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Response carries DATA01-DATA12 error bitmap."

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
    notes: "No other command accepted during power-off including cooling time."

  - id: cmd_018_input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal value. See Appendix 'Supplementary Information by Command'. Example: 06h = video port."
    notes: "Example from source switching to video port: 02h 03h 00h 00h 02h 01h 06h 0Eh"

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
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

  - id: cmd_030_2_volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA02
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

  - id: cmd_030_12_aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Aspect value. See Appendix 'Supplementary Information by Command'."

  - id: cmd_030_15_other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target high byte (96h for LAMP/LIGHT ADJUST)"
      - name: DATA02
        type: integer
        description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)"
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: cmd_037_information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name, lamp usage time (DATA83-86, seconds), filter usage time (DATA87-90, seconds)."

  - id: cmd_037_3_filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "DATA01-04 filter usage time (seconds), DATA05-08 filter alarm start time. -1 if undefined."

  - id: cmd_037_4_lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "Content: 01h=usage time (seconds), 04h=remaining life (%)"

  - id: cmd_037_6_carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: cmd_050_remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (WORD type). See key code list."
      - name: DATA02
        type: integer
        description: "Key code high byte. See key code list."
    notes: "Key code list includes POWER ON(02h,00h), POWER OFF(03h,00h), AUTO(05h), MENU(06h), UP(07h), DOWN(08h), RIGHT(09h), LEFT(0Ah), ENTER(0Bh), EXIT(0Ch), HELP(0Dh), MAGNIFY UP(0Fh), MAGNIFY DOWN(10h), MUTE(13h), PICTURE(29h), COMPUTER1(4Bh), COMPUTER2(4Ch), VIDEO1(4Fh), S-VIDEO1(51h), VOLUME UP(84h), VOLUME DOWN(85h), FREEZE(8Ah), ASPECT(A3h), SOURCE(D7h), LAMP MODE/ECO(EEh). Example AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h"

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
    command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target. 06h=Periphery Focus"
      - name: DATA02
        type: integer
        description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=drive +, 81h=drive -, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: cmd_053_1_lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target (same as 053 LENS CONTROL DATA01)"
    notes: "Response returns upper/lower limits and current value (16-bit)."

  - id: cmd_053_2_lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target. FFh=Stop (mode/value ignored)"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: cmd_053_3_lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: cmd_053_4_reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Controls profile selected by 053-10 LENS PROFILE SET."

  - id: cmd_053_5_lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: cmd_053_6_lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: cmd_053_7_lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Response DATA01 bitmap: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V)."

  - id: cmd_053_10_lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: cmd_053_11_lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: cmd_060_1_gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: "Example brightness request: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

  - id: cmd_078_1_setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type, sound function, profile/timer info."

  - id: cmd_078_2_running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []

  - id: cmd_078_3_input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []

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

  - id: cmd_079_freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "01h=freeze on, 02h=freeze off"

  - id: cmd_084_information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "03h=horizontal sync frequency, 04h=vertical sync frequency"

  - id: cmd_097_8_eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []

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
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: cmd_097_243_1_edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: cmd_098_8_eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Eco mode value. See Appendix 'Supplementary Information by Command'."

  - id: cmd_098_45_lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
    params:
      - name: DATA01_DATA16
        type: string
        description: "Projector name (up to 16 bytes, NUL terminated)"

  - id: cmd_098_198_pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Setting value (MODE: 00h=PIP,01h=PbP; START POSITION: 00h=TL,01h=TR,02h=BL,03h=BR)"

  - id: cmd_098_243_1_edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=OFF, 01h=ON"

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

  - id: cmd_319_10_audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal. See Appendix 'Supplementary Information by Command'."
      - name: DATA02
        type: integer
        description: "Setting value: 00h=specified terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# All responses are framed: success ack = 2Xh/AXh prefix + ID1/ID2 + LEN + data/err + CKS.
# Error responses carry ERR1/ERR2 per error code table (section 2.4).
feedbacks:
  - id: generic_success_ack
    type: raw
    description: "2Xh <ID1> <ID2> <LEN> [data] <CKS> - command accepted"

  - id: generic_error_response
    type: raw
    description: "AXh <ID1> <ID2> 02h <ERR1> <ERR2> <CKS> - command failed, see error code table"
    # Error codes per source 2.4: ERR1=00h ERR2=00h unrecognized; 00h/01h not supported;
    # 01h/00h invalid value; 01h/01h invalid input terminal; 01h/02h invalid language;
    # 02h/00h memory alloc error; 02h/02h memory in use; 02h/03h value cannot be set;
    # 02h/04h forced onscreen mute on; 02h/06h viewer error; 02h/07h no signal;
    # 02h/08h test pattern/filter displayed; 02h/09h no PC card; 02h/0Ah memory op error;
    # 02h/0Ch entry list displayed; 02h/0Dh power off (cmd not accepted); 02h/0Eh execution failed;
    # 02h/0Fh no authority; 03h/00h incorrect gain number; 03h/01h invalid gain; 03h/02h adjustment failed.

  - id: error_status_bitmap
    type: raw
    description: "Response to 009 ERROR STATUS REQUEST: DATA01-DATA12 bitmap (bit=1 => error). Covers cover/fan/temperature/power/lamp/ formatter/FPGA/mirror cover/interlock/system errors."

  - id: information_response
    type: raw
    description: "Response to 037 INFORMATION REQUEST: projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90)."
```

## Variables
```yaml
# Source does not document a discrete settable-parameter namespace outside the
# Actions above (each adjust command carries its own params). No separate
# Variables section populated.
# UNRESOLVED: no standalone variable definitions distinct from action params found in source
```

## Events
```yaml
# Source documents only request/response semantics; no unsolicited notifications.
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: cmd_015_power_on
    note: "No other command accepted while power-on in progress (source section 3.2)."
  - command: cmd_016_power_off
    note: "No other command accepted during power-off including cooling time (source section 3.3)."
  - command: cmd_018_input_sw_change
    note: "Response returns FFh when ended with error (no signal switch made)."
# No explicit user-confirmation warnings in source beyond power-on/off acceptance locks.
```

## Notes
- Reference manual: BDT140013 Revision 7.1. Cover/lamp/mirror cover interlocks surface in the error bitmap (command 009) but no explicit operator safety procedure is documented.
- Checksum algorithm (source 2.2): sum all preceding bytes, use low-order byte of result.
- All commands share frame parameters: ID1 = control ID set on projector, ID2 = model code (varies by model), CKS = checksum, LEN = data length, DATA?? = variable data, ERR1/ERR2 = response error.
- RS-232C uses D-SUB 9P cross cable (pin assignment documented in source 1.1). LAN uses RJ-45 (wired) or optional wireless LAN unit.
- "Standby (Power saving)" / "Network standby" operation-status codes (0Fh/10h) imply low-power modes controllable via 015/016.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: flow-control semantics not specified (only "Full duplex" communication mode stated) -->
<!-- UNRESOLVED: default baud rate not stated (source lists 5 selectable values) -->
<!-- UNRESOLVED: full input-terminal DATA01 value enumerations referenced as Appendix 'Supplementary Information by Command' — not present in refined source -->
<!-- UNRESOLVED: full eco-mode value enumerations referenced as Appendix 'Supplementary Information by Command' — not present in refined source -->
<!-- UNRESOLVED: full aspect value enumerations referenced as Appendix — not present in refined source -->
<!-- UNRESOLVED: sub-input setting values for PIP/PbP referenced as Appendix — not present in refined source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:16:04.050Z
last_checked_at: 2026-06-17T19:59:53.461Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:59:53.461Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim to source command reference. Transport parameters verified against section 1.2. No command gaps detected. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "input-terminal DATA01 value enumerations and eco-mode values are referenced as \"see Appendix Supplementary Information by Command\" which is not included in the provided refined source text"
- "flow control not explicitly named; \"Full duplex\" communication mode stated but RTS/CTS flow-control semantics not specified"
- "no standalone variable definitions distinct from action params found in source"
- "no unsolicited event notifications described in source"
- "no multi-step macro sequences described in source"
- "flow-control semantics not specified (only \"Full duplex\" communication mode stated)"
- "default baud rate not stated (source lists 5 selectable values)"
- "full input-terminal DATA01 value enumerations referenced as Appendix 'Supplementary Information by Command' — not present in refined source"
- "full eco-mode value enumerations referenced as Appendix 'Supplementary Information by Command' — not present in refined source"
- "full aspect value enumerations referenced as Appendix — not present in refined source"
- "sub-input setting values for PIP/PbP referenced as Appendix — not present in refined source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
