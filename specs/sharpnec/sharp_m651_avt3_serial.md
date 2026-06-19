---
spec_id: admin/sharp-nec-m651-avt3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC M651 Avt3 Control Spec"
manufacturer: Sharp/NEC
model_family: "M651 Avt3"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "M651 Avt3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:46:23.951Z
last_checked_at: 2026-06-18T08:11:20.648Z
generated_at: 2026-06-18T08:11:20.648Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value for M651 Avt3 not stated in this command reference; must be discovered from per-model appendix or device."
  - "control ID (ID1) default value not stated in source."
  - "firmware version compatibility not stated in source."
  - "serial flow_control (RTS/CTS hardware vs none) not explicitly stated; pinout wires RTS/CTS but comm-conditions table does not list flow control."
  - "input-terminal value table, aspect value table, eco-mode value table, base-model-type value table, and sub-input value table are referenced as \"Appendix: Supplementary Information by Command\" which is not present in this refined source."
  - "RTS/CTS wired in pinout but flow control mode not stated"
  - "full input-terminal value table lives in 'Supplementary Information by Command' appendix not present in this source.\""
  - "aspect value table lives in 'Supplementary Information by Command' appendix not present in this source.\""
  - "full target enum (shift/zoom/focus) not in this excerpt.\""
  - "eco-mode value table lives in 'Supplementary Information by Command' appendix not present in this source.\""
  - "aspect value table not in this source.\""
  - "eco-mode value table not in this source.\""
  - "source does not document unsolicited notifications. All responses"
  - "source does not document multi-step command sequences as macros."
  - "source lists no explicit power-on sequencing procedure or"
  - "model code (ID2) for M651 Avt3 not in this source."
  - "control ID (ID1) default not in this source."
  - "input-terminal value table (used by 018, 319-10, 097-198 sub-input) not in this source."
  - "aspect value table (030-12) not in this source."
  - "eco-mode value table (098-8, 097-8) not in this source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:11:20.648Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC M651 Avt3 Control Spec

## Summary
Sharp/NEC M651 Avt3 large-venue projector controlled via RS-232C serial (PC CONTROL D-SUB 9P) and/or wired/wireless LAN (TCP port 7142). Binary protocol: frames of hex bytes with leading opcode, `<ID1> <ID2>`, length, optional DATA bytes, and a trailing checksum byte. Spec covers the full Projector Control Command Reference (BDT140013 Rev 7.1): power, mute, input switch, picture/volume/aspect/gain adjust, shutter, lens control & memory, freeze, eco mode, edge blending, PIP/PbP, audio select, and a broad set of status queries.

<!-- UNRESOLVED: model code (ID2) value for M651 Avt3 not stated in this command reference; must be discovered from per-model appendix or device. -->
<!-- UNRESOLVED: control ID (ID1) default value not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: serial flow_control (RTS/CTS hardware vs none) not explicitly stated; pinout wires RTS/CTS but comm-conditions table does not list flow control. -->
<!-- UNRESOLVED: input-terminal value table, aspect value table, eco-mode value table, base-model-type value table, and sub-input value table are referenced as "Appendix: Supplementary Information by Command" which is not present in this refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source: "115200/38400/19200/9600/4800 bps" selectable; no single fixed default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS wired in pinout but flow control mode not stated
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from 015 POWER ON / 016 POWER OFF commands
  - queryable    # inferred from large set of REQUEST commands (009, 037 family, 078 family, 097 family, 305 family)
  - levelable    # inferred from 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST / 030-15 OTHER ADJUST
  - routable     # inferred from 018 INPUT SW CHANGE command
```

## Actions
```yaml
# All frames are hex byte sequences as written in source. <ID1> = control ID,
# <ID2> = model code, <CKS> = checksum (sum of all preceding bytes, low-order byte).
# Frames marked <ID1> <ID2> <CKS> are not pre-computed here; they are filled at
# runtime with the device's control ID and model code. Literal frames with a
# trailing checksum byte are emitted verbatim from the source.

- id: cmd_009_error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response DATA01-DATA12 = 12-byte error bitmask (cover/fan/temp/lamp/interlock)."

- id: cmd_015_power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on is in progress."

- id: cmd_016_power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off (incl. cooling time)."

- id: cmd_018_input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "Input terminal byte (e.g. 06h = video). UNRESOLVED: full input-terminal value table lives in 'Supplementary Information by Command' appendix not present in this source."

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
    - name: data01
      type: string
      description: "Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)"
    - name: data02
      type: string
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_030_2_volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: data01
      type: string
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: data02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_030_12_aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: string
      description: "Aspect value. UNRESOLVED: aspect value table lives in 'Supplementary Information by Command' appendix not present in this source."

- id: cmd_030_15_other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: data01
      type: string
      description: "Adjustment target high byte (96h = LAMP ADJUST / LIGHT ADJUST)"
    - name: data02
      type: string
      description: "Adjustment target low byte (FFh per source)"
    - name: data03
      type: string
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: data04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_037_information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name, lamp usage time, filter usage time."

- id: cmd_037_3_filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: cmd_037_4_lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Lamp (00h=Lamp 1, 01h=Lamp 2 [two-lamp models only])"
    - name: data02
      type: string
      description: "Content (01h=usage time seconds, 04h=remaining life %)"

- id: cmd_037_6_carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: cmd_050_remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Key code low byte (see key code list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO)"
    - name: data02
      type: string
      description: "Key code high byte (00h for all listed codes)"

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
    - name: data01
      type: string
      description: "Lens target. Source documents 06h=Periphery Focus. UNRESOLVED: full target enum (shift/zoom/focus) not in this excerpt."
    - name: data02
      type: string
      description: "Content (00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus continuous, 81h=drive minus continuous, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus)"

- id: cmd_053_1_lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: string
      description: "Lens target (see 053 DATA01)"

- id: cmd_053_2_lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: data01
      type: string
      description: "Lens target (FFh=Stop)"
    - name: data02
      type: string
      description: "Adjustment mode (00h=absolute, 02h=relative)"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_053_3_lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)"

- id: cmd_053_4_reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)"

- id: cmd_053_5_lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)"

- id: cmd_053_6_lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)"
    - name: data02
      type: string
      description: "Setting value (00h=OFF, 01h=ON)"

- id: cmd_053_7_lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: cmd_053_10_lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "Profile number (00h=Profile 1, 01h=Profile 2)"

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
    - name: data01
      type: string
      description: "Adjusted value name (00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST)"

- id: cmd_078_1_setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

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
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "01h=freeze on, 02h=freeze off"

- id: cmd_084_information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: data01
      type: string
      description: "Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency)"

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
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "Item (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)"

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
    - name: data01
      type: string
      description: "Eco mode value. UNRESOLVED: eco-mode value table lives in 'Supplementary Information by Command' appendix not present in this source."

- id: cmd_098_45_lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: name_bytes
      type: string
      description: "Projector name (DATA01-DATA16, up to 16 bytes), NUL-padded; trailing 00h terminator appended."

- id: cmd_098_198_pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Item (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)"
    - name: data02
      type: string
      description: "Setting value (e.g. for MODE: 00h=PIP, 01h=PICTURE BY PICTURE; for START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT)"

- id: cmd_098_243_1_edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "Setting value (00h=OFF, 01h=ON)"

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
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Input terminal. UNRESOLVED: full input-terminal value table lives in 'Supplementary Information by Command' appendix not present in this source."
    - name: data02
      type: string
      description: "Setting value (00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER)"
```

## Feedbacks
```yaml
# Responses: success frames carry leading A0h/A1h/A2h/A3h + <ID1> <ID2> + LEN +
# optional DATA + <CKS>. Failure frames carry ERR1/ERR2. ERR code pairs:
#  00h/00h = command not recognized
#  00h/01h = command not supported by model
#  01h/00h = specified value invalid
#  01h/01h = specified input terminal invalid
#  01h/02h = specified language invalid
#  02h/00h = memory allocation error
#  02h/02h = memory in use
#  02h/03h = specified value cannot be set
#  02h/04h = forced onscreen mute on
#  02h/06h = viewer error
#  02h/07h = no signal
#  02h/08h = test pattern/filter displayed
#  02h/09h = no PC card inserted
#  02h/0Ah = memory operation error
#  02h/0Ch = entry list displayed
#  02h/0Dh = command cannot be accepted (power off)
#  02h/0Eh = command execution failed
#  02h/0Fh = no authority for operation
#  03h/00h = specified gain number incorrect
#  03h/01h = specified gain invalid
#  03h/02h = adjustment failed

- id: response_power_status
  type: enum
  values: [standby, power_on, not_supported]
  source: "078-2 DATA03 (00h=Standby, 01h=Power On, FFh=Not supported)"

- id: response_operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 DATA06"

- id: response_picture_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA01"

- id: response_sound_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA02"

- id: response_onscreen_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA03"

- id: response_freeze_status
  type: enum
  values: [off, on]
  source: "305-3 DATA09"

- id: response_cover_status
  type: enum
  values: [normal_opened, cover_closed]
  source: "078-6 DATA01"

- id: response_edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1 DATA01"

- id: response_error_status
  type: bitmask
  source: "009 DATA01-DATA12 (12-byte error field; bit semantics documented in source)"
```

## Variables
```yaml
- id: var_volume
  type: integer
  source: "030-2 VOLUME ADJUST; 060-1 DATA01=05h"

- id: var_brightness
  type: integer
  source: "030-1 DATA01=00h; 060-1 DATA01=00h"

- id: var_contrast
  type: integer
  source: "030-1 DATA01=01h; 060-1 DATA01=01h"

- id: var_color
  type: integer
  source: "030-1 DATA01=02h; 060-1 DATA01=02h"

- id: var_hue
  type: integer
  source: "030-1 DATA01=03h; 060-1 DATA01=03h"

- id: var_sharpness
  type: integer
  source: "030-1 DATA01=04h; 060-1 DATA01=04h"

- id: var_lamp_adjust_light_adjust
  type: integer
  source: "030-15 DATA01=96h; 060-1 DATA01=96h"

- id: var_aspect
  type: enum
  source: "030-12. UNRESOLVED: aspect value table not in this source."

- id: var_eco_mode
  type: enum
  source: "098-8 / 097-8. UNRESOLVED: eco-mode value table not in this source."

- id: var_projector_name
  type: string
  source: "098-45 / 097-45 (up to 16 bytes)"

- id: var_lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: "053-10 / 053-11"
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications. All responses
# are solicited replies to commands.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step command sequences as macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "015 POWER ON: while power-on is in progress, no other command can be accepted."
  - "016 POWER OFF: while power-off is in progress (including cooling time), no other command can be accepted."
  - "Error DATA09 Bit1: interlock switch open indicates a safety condition reported by the device."
# UNRESOLVED: source lists no explicit power-on sequencing procedure or
# confirmation-required operations; interlocks above are behavioral constraints
# extracted verbatim from the command descriptions, not a vendor safety section.
```

## Notes
- Manual revision: BDT140013 Rev 7.1. Generic projector command reference; M651 Avt3 is one of the covered models. Model code `<ID2>` and base-model type values are model-dependent and live in a per-model appendix not present in this refined source.
- Checksum rule: sum all preceding bytes, take low-order 8 bits. Example from source: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`.
- Frame leading bytes encode command class: `00h`=query (response `20h`), `01h`=control-set type A (response `21h`/`A1h`), `02h`=control type B (response `22h`/`A2h`), `03h`=control type C (response `23h`/`A3h`). `A*h` prefix = acknowledgement/error response.
- Serial settings are selectable (115200/38400/19200/9600/4800); the projector and controller must match. No single fixed default is stated.
- TCP control uses port 7142 for both send and receive over wired/wireless LAN.
- Pin assignment: PC CONTROL D-SUB 9P cross cable (2↔3, 7↔8 cross, 5=GND).

<!-- UNRESOLVED: model code (ID2) for M651 Avt3 not in this source. -->
<!-- UNRESOLVED: control ID (ID1) default not in this source. -->
<!-- UNRESOLVED: input-terminal value table (used by 018, 319-10, 097-198 sub-input) not in this source. -->
<!-- UNRESOLVED: aspect value table (030-12) not in this source. -->
<!-- UNRESOLVED: eco-mode value table (098-8, 097-8) not in this source. -->
<!-- UNRESOLVED: base-model-type value table (078-1, 305-1) not in this source. -->
<!-- UNRESOLVED: full lens-control target enum (053 DATA01 beyond 06h=Periphery Focus) not in this excerpt. -->
<!-- UNRESOLVED: serial flow_control mode not explicitly stated. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
````

Spec emitted. 54 commands, all distinct rows from source command list. Hex payloads verbatim. Big gaps flagged UNRESOLVED: model code `<ID2>`, control ID `<ID1>`, plus appendix value tables (input-terminal, aspect, eco-mode, base-model-type, lens target enum) — those live in "Supplementary Information by Command" appendix not present in refined source.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:46:23.951Z
last_checked_at: 2026-06-18T08:11:20.648Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:11:20.648Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value for M651 Avt3 not stated in this command reference; must be discovered from per-model appendix or device."
- "control ID (ID1) default value not stated in source."
- "firmware version compatibility not stated in source."
- "serial flow_control (RTS/CTS hardware vs none) not explicitly stated; pinout wires RTS/CTS but comm-conditions table does not list flow control."
- "input-terminal value table, aspect value table, eco-mode value table, base-model-type value table, and sub-input value table are referenced as \"Appendix: Supplementary Information by Command\" which is not present in this refined source."
- "RTS/CTS wired in pinout but flow control mode not stated"
- "full input-terminal value table lives in 'Supplementary Information by Command' appendix not present in this source.\""
- "aspect value table lives in 'Supplementary Information by Command' appendix not present in this source.\""
- "full target enum (shift/zoom/focus) not in this excerpt.\""
- "eco-mode value table lives in 'Supplementary Information by Command' appendix not present in this source.\""
- "aspect value table not in this source.\""
- "eco-mode value table not in this source.\""
- "source does not document unsolicited notifications. All responses"
- "source does not document multi-step command sequences as macros."
- "source lists no explicit power-on sequencing procedure or"
- "model code (ID2) for M651 Avt3 not in this source."
- "control ID (ID1) default not in this source."
- "input-terminal value table (used by 018, 319-10, 097-198 sub-input) not in this source."
- "aspect value table (030-12) not in this source."
- "eco-mode value table (098-8, 097-8) not in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
