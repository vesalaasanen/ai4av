---
spec_id: admin/sharp-nec-ma491-pc5
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ma491 Pc5 Control Spec"
manufacturer: Sharp/NEC
model_family: "Ma491 Pc5"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ma491 Pc5"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T07:05:39.148Z
last_checked_at: 2026-06-18T08:27:09.878Z
generated_at: 2026-06-18T08:27:09.878Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "model code (ID2) value for this specific model not stated in source"
  - "control ID (ID1) default not stated in source"
  - "flow control not explicitly stated; \"Full duplex\" communication mode only"
  - "source documents settable values via the 030-/098-/053- command"
  - "source describes no unsolicited notifications / push events."
  - "source describes no multi-step command sequences / macros."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "default baud rate not stated"
  - "flow control not stated"
  - "ID1/ID2 default values not stated"
  - "input terminal / eco mode / aspect / base model / sub input value enumerations referenced but not present in source excerpt"
  - "Ma491 Pc5 lamp count (single vs dual) not stated in source"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:27:09.878Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC Ma491 Pc5 Control Spec

## Summary
Sharp/NEC Ma491 Pc5 projector. Binary hex control protocol over RS-232C serial and wired/wireless LAN (TCP). Commands are framed hex bytes with a trailing checksum byte (low 8 bits of the sum of all preceding bytes). Source: "Projector Control Command Reference Manual" BDT140013 Revision 7.1.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: model code (ID2) value for this specific model not stated in source -->
<!-- UNRESOLVED: control ID (ID1) default not stated in source -->

## Transport
```yaml
# Source documents BOTH serial and LAN (TCP). Both transports use the same
# binary command framing. ID1 (control ID) and ID2 (model code) are per-device
# parameters that appear in every frame's response path.
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists selectable: 115200/38400/19200/9600/4800 bps; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated; "Full duplex" communication mode only
addressing:
  port: 7142  # stated for LAN command send/receive
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: POWER ON / POWER OFF commands present
  - queryable     # inferred: many REQUEST commands returning state
  - routable      # inferred: INPUT SW CHANGE selects input terminal
  - levelable     # inferred: PICTURE ADJUST, VOLUME ADJUST, LAMP/LIGHT ADJUST
```

## Actions
```yaml
# Framing: every command is a hex byte sequence. Trailing byte is CKS (checksum)
# = low 8 bits of the sum of all preceding bytes. <ID1>=control ID, <ID2>=model
# code are inserted by the controller into response frames (not into outbound
# command frames shown below - outbound commands are literal as documented).
# Parameterized actions show <DATAxx> placeholders for the variable byte(s).
# Per source §2.1: "20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>" is the
# RESPONSE shape; the literal command line above it is what the controller SENDS.

actions:
  # --- Error / status queries (009-037 family) ---
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12 bitfield error flags (cover, fan, temp, lamp, etc.). See source pp.13-14."

  # --- Power ---
  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power-on is in progress."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off (including cooling time)."

  # --- Input switching ---
  - id: input_switch_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Input terminal byte (e.g. 06h = video port). Full value list in Appendix 'Supplementary Information by Command' (not in this source excerpt)."
    notes: "Example: switch to video port = '02h 03h 00h 00h 02h 01h 06h 0Eh'."

  # --- Mute controls (each is a distinct source row) ---
  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input terminal switch or video signal switch."

  - id: picture_mute_off
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: "Cleared by input terminal switch, video signal switch, or volume adjustment."

  - id: sound_mute_off
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: "Cleared by input terminal switch or video signal switch."

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  # --- Picture / volume / aspect / lamp adjust (030 family) ---
  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: data02
        type: integer
        description: "Mode: 00h=absolute, 01h=relative."
      - name: data03
        type: integer
        description: "Value (low 8 bits)."
      - name: data04
        type: integer
        description: "Value (high 8 bits)."
    notes: "Example set brightness to 10: '03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h'. Example set brightness to -10: '03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch'."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Mode: 00h=absolute, 01h=relative."
      - name: data02
        type: integer
        description: "Value (low 8 bits)."
      - name: data03
        type: integer
        description: "Value (high 8 bits)."
    notes: "Example set volume to 10: '03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h'."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: integer
        description: "Aspect value. Full value list in Appendix 'Supplementary Information by Command' (not in this source excerpt)."

  - id: other_adjust_lamp_light
    label: "030-15. OTHER ADJUST (LAMP/LIGHT)"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Target high byte: 96h = LAMP ADJUST / LIGHT ADJUST."
      - name: data02
        type: integer
        description: "Target low byte: FFh (per source table)."
      - name: data03
        type: integer
        description: "Mode: 00h=absolute, 01h=relative."
      - name: data04
        type: integer
        description: "Value (low 8 bits)."
      - name: data05
        type: integer
        description: "Value (high 8 bits)."

  # --- Information requests (037 family) ---
  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. '-1' returned if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (Lamp 2 only valid on two-lamp models)."
      - name: data02
        type: integer
        description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)."
    notes: "Eco mode values reflect eco when enabled. Negative remaining life returned if replacement deadline exceeded."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
    notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

  # --- Remote key code (single parameterized action; key codes are enum values) ---
  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Key code low byte (WORD type). See key code list."
      - name: data02
        type: integer
        description: "Key code high byte (always 00h in source table)."
    notes: "Key code list (DATA01/DATA02): 02h/00h=POWER ON, 03h/00h=POWER OFF, 05h/00h=AUTO, 06h/00h=MENU, 07h/00h=UP, 08h/00h=DOWN, 09h/00h=RIGHT, 0Ah/00h=LEFT, 0Bh/00h=ENTER, 0Ch/00h=EXIT, 0Dh/00h=HELP, 0Fh/00h=MAGNIFY UP, 10h/00h=MAGNIFY DOWN, 13h/00h=MUTE, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, 4Ch/00h=COMPUTER2, 4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1, 84h/00h=VOLUME UP, 85h/00h=VOLUME DOWN, 8Ah/00h=FREEZE, A3h/00h=ASPECT, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO."

  # --- Shutter ---
  - id: shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  # --- Lens control family (053) ---
  - id: lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Lens axis target. 06h=Periphery Focus shown in source; other axis values per Appendix (not in excerpt)."
      - name: data02
        type: integer
        description: "Motion: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s."
    notes: "After 7Fh/81h continuous drive, send 00h to stop. Same command may be issued without stop during drive."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: integer
        description: "Lens axis target (same axis values as 053 LENS CONTROL)."
    notes: "Returns upper/lower limit and current value (16-bit each)."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Axis target; FFh=Stop (mode/value ignored when Stop)."
      - name: data02
        type: integer
        description: "Mode: 00h=absolute, 02h=relative."
      - name: data03
        type: integer
        description: "Value (low 8 bits)."
      - name: data04
        type: integer
        description: "Value (high 8 bits)."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
    notes: "Operates on profile selected via 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    notes: "Returns setting: 00h=OFF, 01h=ON."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: data02
        type: integer
        description: "Setting: 00h=OFF, 01h=ON."

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: bit0=Lens memory, bit1=Zoom, bit2=Focus, bit3=Lens Shift (H), bit4=Lens Shift (V) - each 0=Stop/1=During operation."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Profile: 00h=Profile 1, 01h=Profile 2."

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns profile: 00h=Profile 1, 01h=Profile 2."

  # --- Gain parameter request ---
  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: data01
        type: integer
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
    notes: "Returns status, upper/lower limits, default, current value, wide/narrow adjustment widths."

  # --- Status request family (078) ---
  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock/sleep function (DATA05)."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling process, power on/off process, operation status."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal type, test pattern display, content displayed."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute and OSD display states."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns 00h=Normal (cover opened), 01h=Cover closed."

  # --- Freeze ---
  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "01h=freeze on, 02h=freeze off."

  # --- Information string ---
  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: data01
        type: integer
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency."

  # --- 097 request family ---
  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns eco mode (Light mode or Lamp mode depending on model). Value list in Appendix."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns projector name (DATA01-17, NUL-terminated)."

  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns MAC address (DATA01-06)."

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns 00h=OFF, 01h=ON."

  # --- 098 set family ---
  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Eco mode value. Full value list in Appendix."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: name_bytes
        type: string
        description: "Projector name, up to 16 bytes (DATA01-DATA16)."
    notes: "Command template shows 16 named data bytes plus trailing 00h before checksum."

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: data02
        type: integer
        description: "Setting value (MODE: 00h=PIP, 01h=PBP; START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT; SUB INPUT: see Appendix)."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Setting: 00h=OFF, 01h=ON."

  # --- 305 family ---
  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11)."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns serial number (DATA01-16, NUL-terminated)."

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal types, mute states, freeze status."

  # --- Audio select ---
  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Input terminal. Value list in Appendix."
      - name: data02
        type: integer
        description: "Setting: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
# Every command returns an ACK frame (2Xh prefix) and, on failure, an error
# frame (AXh prefix) carrying ERR1/ERR2. Query commands additionally return a
# data frame (2Xh with LEN>0).
feedbacks:
  - id: command_ack
    type: enum
    description: "Acknowledgment frame. Prefix byte 2Xh (where X = command low nibble). Body: <ID1> <ID2> <LEN> <DATA...> <CKS>. LEN=00h means no data payload (action accepted)."
    values: [acknowledged]

  - id: command_error
    type: struct
    description: "Error frame. Prefix AXh. Body: <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>. ERR1/ERR2 codes per source §2.4."
    fields:
      err1: "Error category byte"
      err2: "Error sub-code byte"

  - id: error_status_bitfield
    type: struct
    description: "Response to 009 ERROR STATUS REQUEST. 12 bytes of bitfield flags."
    fields:
      data01: "Cover error, temp (bimetal), fan error, power error, lamp off, lamp replacement due"
      data02: "Lamp usage exceeded, formatter error, lamp 2 off, extended status ref"
      data03: "FPGA error, temp (sensor), lamp not present, lamp data error, mirror cover, lamp 2 replacement, lamp 2 usage exceeded"
      data04: "Lamp 2 not present, lamp 2 data error, temp (dust), foreign matter sensor, ballast comm, iris calibration, lens not installed"
      data09: "Extended status: portrait cover, interlock switch open, system errors (slave CPU / formatter)"

  - id: running_status
    type: struct
    description: "Response to 078-2 RUNNING STATUS REQUEST."
    fields:
      power_status: "00h=Standby, 01h=Power on, FFh=Not supported"
      cooling_process: "00h=Not executed, 01h=During execution"
      power_onoff_process: "00h=Not executed, 01h=During execution"
      operation_status: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

  - id: input_status
    type: struct
    description: "Response to 078-3 INPUT STATUS REQUEST."
    fields:
      signal_switch_process: "00h=Not executed, 01h=During execution"
      signal_list_number: "00h-C7h (= practical number - 1), FFh=Not supported"
      selection_signal_type_2: "01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10)"

  - id: mute_status
    type: struct
    description: "Response to 078-4 MUTE STATUS REQUEST."
    fields:
      picture_mute: "00h=Off, 01h=On"
      sound_mute: "00h=Off, 01h=On"
      onscreen_mute: "00h=Off, 01h=On"
      forced_onscreen_mute: "00h=Off, 01h=On"

  - id: cover_status
    type: enum
    description: "Response to 078-6 COVER STATUS REQUEST."
    values: [normal_opened, cover_closed]

  - id: error_code_pair
    type: table
    description: "ERR1/ERR2 combinations per source §2.4 (selection): 00h/00h=command not recognized; 00h/01h=not supported by model; 01h/00h=invalid value; 01h/01h=invalid input terminal; 02h/00h=memory allocation error; 02h/03h=value cannot be set; 02h/0Dh=power off; 02h/0Eh=execution failed; 02h/0Fh=no authority; 03h/00h=incorrect gain number; 03h/02h=adjustment failed. Full list in source pp.12."
```

## Variables
```yaml
# UNRESOLVED: source documents settable values via the 030-/098-/053- command
# actions above; no separate persistent-variable model is described. Settable
# parameters (brightness, contrast, volume, eco mode, projector name, lens
# position, lens memory profile, edge blending, PIP/PBP) are addressed through
# their respective Actions entries.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications / push events.
# All data is obtained by explicit request commands.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step command sequences / macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: no other command accepted while power-on is in progress (source §3.2)."
  - "POWER OFF: no other command accepted during power-off including cooling time (source §3.3)."
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements beyond the command-acceptance notes above.
```

## Notes
- Command framing: every frame is a hex byte sequence. The trailing byte is CKS (checksum) = low-order 8 bits of the sum of all preceding bytes. Worked example from source §2.2: `20h 81h 01h 60h 01h 00h <CKS>` → 20h+81h+01h+60h+01h+00h = 103h → CKS = 03h.
- ID1 (control ID) and ID2 (model code) appear in response frames (prefix 2Xh / AXh). They are configured per-projector; values for this model are not stated in this source.
- Baud rate is selectable among 115200/38400/19200/9600/4800 bps; the default is not stated. 9600 is shown above as a representative documented option, not the default.
- Communication mode is full duplex. Flow control is not specified.
- TCP port 7142 is the documented LAN command port.
- Many value enumerations (input terminal codes, eco mode values, aspect values, base model types, sub input values) live in an "Appendix: Supplementary Information by Command" referenced throughout this source but NOT present in the supplied excerpt. Those parameters are marked in their action's `description` field accordingly.
- Lamp 2 selectors (037-4, etc.) only apply to two-lamp projector models; Ma491 Pc5 lamp count is not stated in this excerpt.
<!-- UNRESOLVED: default baud rate not stated -->
<!-- UNRESOLVED: flow control not stated -->
<!-- UNRESOLVED: ID1/ID2 default values not stated -->
<!-- UNRESOLVED: input terminal / eco mode / aspect / base model / sub input value enumerations referenced but not present in source excerpt -->
<!-- UNRESOLVED: Ma491 Pc5 lamp count (single vs dual) not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T07:05:39.148Z
last_checked_at: 2026-06-18T08:27:09.878Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:27:09.878Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "model code (ID2) value for this specific model not stated in source"
- "control ID (ID1) default not stated in source"
- "flow control not explicitly stated; \"Full duplex\" communication mode only"
- "source documents settable values via the 030-/098-/053- command"
- "source describes no unsolicited notifications / push events."
- "source describes no multi-step command sequences / macros."
- "source contains no explicit safety warnings, interlock procedures,"
- "default baud rate not stated"
- "flow control not stated"
- "ID1/ID2 default values not stated"
- "input terminal / eco mode / aspect / base model / sub input value enumerations referenced but not present in source excerpt"
- "Ma491 Pc5 lamp count (single vs dual) not stated in source"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
