---
spec_id: admin/sharp-nec-m491-ir
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC M491 Ir Control Spec"
manufacturer: Sharp/NEC
model_family: "M491 Ir"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "M491 Ir"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:09:07.569Z
last_checked_at: 2026-06-18T08:10:03.552Z
generated_at: 2026-06-18T08:10:03.552Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version range not stated. Input terminal value table referenced in Appendix \"Supplementary Information by Command\" but not present in this refined source. Eco mode value table referenced in same appendix, not present. Sub input setting value table referenced, not present."
  - "source states \"Full duplex\" communication mode; flow_control wire type (RTS/CTS pins wired per pinout table) not explicitly named"
  - "appendix not in this source).\""
  - "no separate settable parameter registry in source beyond what is exposed via Actions (PICTURE ADJUST targets, VOLUME, lens position, eco mode). Populate via GAIN PARAMETER REQUEST 3 outputs at runtime."
  - "no unsolicited notification documented in source. All responses are solicited (after a command)."
  - "no multi-step sequences documented in source."
  - "source notes POWER ON/OFF blocks all other commands during execution (incl. cooling), but no formal safety interlock procedure, power-on sequencing requirement, or operator confirmation workflow is documented. Interlock switch open state is reported in 009 ERROR STATUS REQUEST extended status (DATA09 bit1) - read-only signal, not a control interlock."
  - "firmware version compatibility range not stated."
  - "Appendix value tables missing — input terminal, aspect, eco mode, sub input, base model type, selection signal type."
  - "serial default baud rate not stated (only options listed)."
  - "ID2 model code value for M491 Ir not stated in source."
  - "full lens target axis enumeration for 053 LENS CONTROL beyond \"06h=Periphery Focus\" not present."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:10:03.552Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC M491 Ir Control Spec

## Summary
Sharp/NEC M491 Ir projector control spec covering RS-232C serial and TCP (LAN port 7142) control per BDT140013 Rev 7.1. Binary command protocol with hex byte framing and checksums. 53 documented commands spanning power, mute, picture/volume adjust, lens control/memory, info/status queries, eco mode, PIP/PbP, edge blending, audio select.

<!-- UNRESOLVED: firmware version range not stated. Input terminal value table referenced in Appendix "Supplementary Information by Command" but not present in this refined source. Eco mode value table referenced in same appendix, not present. Sub input setting value table referenced, not present. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps; default unset - pick one
  # baud_rate options stated in source: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode; flow_control wire type (RTS/CTS pins wired per pinout table) not explicitly named
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: POWER ON / POWER OFF commands present
  - queryable      # inferred: many REQUEST commands return values
  - levelable      # inferred: PICTURE/VOLUME/LAMP adjust commands present
  # routable: NOT set - input SW change selects input terminal, no matrix routing in source
```

## Actions
```yaml
actions:
  - id: error_status_request_009
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Response frame: 20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>. DATA1-DATA12 = error bitmask (0=normal, 1=error)."

  - id: power_on_015
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power-on in progress."

  - id: power_off_016
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off including cooling time."

  - id: input_sw_change_018
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal value. Example: 06h = video port. Full value table in Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in this source)."
    notes: "Example to video port: 02h 03h 00h 00h 02h 01h 06h 0Eh."

  - id: picture_mute_on_020
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared on input/video signal switch."

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
    notes: "Cleared on input/video switch or volume adjust."

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
    notes: "Cleared on input/video signal switch."

  - id: onscreen_mute_off_025
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust_030_1
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: DATA02
        type: integer
        description: "Mode: 00h=absolute, 01h=relative."
      - name: DATA03
        type: integer
        description: "Value low-order 8 bits."
      - name: DATA04
        type: integer
        description: "Value high-order 8 bits."
    notes: "Brightness=10 example: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Brightness=-10 example: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch."

  - id: volume_adjust_030_2
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Mode: 00h=absolute, 01h=relative."
      - name: DATA02
        type: integer
        description: "Value low-order 8 bits."
      - name: DATA03
        type: integer
        description: "Value high-order 8 bits."
    notes: "Volume=10 example: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

  - id: aspect_adjust_030_12
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Aspect value. Full table in Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in this source)."

  - id: other_adjust_030_15
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target high byte: 96h = LAMP ADJUST / LIGHT ADJUST (with DATA02=FFh)."
      - name: DATA02
        type: integer
        description: "Target low byte: FFh for LAMP/LIGHT ADJUST."
      - name: DATA03
        type: integer
        description: "Mode: 00h=absolute, 01h=relative."
      - name: DATA04
        type: integer
        description: "Value low-order 8 bits."
      - name: DATA05
        type: integer
        description: "Value high-order 8 bits."

  - id: information_request_037
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Response DATA01-49 = projector name (NUL terminated), DATA50-82 reserved, DATA83-86 = lamp usage seconds, DATA87-90 = filter usage seconds."

  - id: filter_usage_info_request_037_3
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Response DATA01-04 = filter usage seconds, DATA05-08 = filter alarm start seconds. '-1' if undefined."

  - id: lamp_info_request_037_4
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
      - name: DATA02
        type: integer
        description: "Content: 01h=usage seconds, 04h=remaining life %."

  - id: carbon_savings_request_037_6
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."

  - id: remote_key_code_050
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte. Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO."
      - name: DATA02
        type: integer
        description: "Key code high byte (00h for all listed keys)."
    notes: "AUTO example: 02h 0Fh 00h 00h 02h 05h 00h 18h."

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
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Target: 06h=Periphery Focus. Other lens targets referenced."
      - name: DATA02
        type: integer
        description: "Motion: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s."
    notes: "Send 00h to stop after 7Fh/81h continuous drive. Same command can be issued without stop while driving."

  - id: lens_control_request_053_1
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Target (lens axis)."
    notes: "Response DATA02-03 = upper limit, DATA04-05 = lower limit, DATA06-07 = current value."

  - id: lens_control_2_053_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "FFh=Stop; otherwise target axis."
      - name: DATA02
        type: integer
        description: "Mode: 00h=absolute, 02h=relative."
      - name: DATA03
        type: integer
        description: "Value low-order 8 bits."
      - name: DATA04
        type: integer
        description: "Value high-order 8 bits."
    notes: "Adjustment mode/value ignored when DATA01=FFh (Stop)."

  - id: lens_memory_control_053_3
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET."

  - id: reference_lens_memory_control_053_4
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET."
    notes: "Controls profile number set via 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request_053_5
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."

  - id: lens_memory_option_set_053_6
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: DATA02
        type: integer
        description: "00h=OFF, 01h=ON."

  - id: lens_info_request_053_7
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Response DATA01 bitmask: bit0=Lens memory, bit1=Zoom, bit2=Focus, bit3=Lens Shift H, bit4=Lens Shift V (0=Stop, 1=During operation)."

  - id: lens_profile_set_053_10
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Profile: 00h=Profile 1, 01h=Profile 2."

  - id: lens_profile_request_053_11
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_060_1
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
    notes: "Brightness example: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh."

  - id: setting_request_078_1
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Response DATA01-03 = base model type, DATA04 = sound function (00h=no, 01h=yes), DATA05 = profile (00h=none, 01h=clock, 02h=sleep, 03h=clock+sleep)."

  - id: running_status_request_078_2
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Response DATA03 = power status, DATA04 = cooling process, DATA05 = power on/off process, DATA06 = operation status (00h=Standby Sleep, 04h=Power on, 05h=Cooling, 06h=Standby error, 0Fh=Standby Power saving, 10h=Network standby)."

  - id: input_status_request_078_3
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Response DATA01 = signal switch process, DATA02 = signal list number (returns N-1), DATA03 = selection signal type 1, DATA04 = selection signal type 2, DATA05 = signal list type, DATA06 = test pattern display, DATA09 = content displayed."

  - id: mute_status_request_078_4
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Response: DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (00h/01h)."

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
    notes: "Response DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  - id: freeze_control_079
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "01h=Freeze ON, 02h=Freeze OFF."

  - id: information_string_request_084
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency."

  - id: eco_mode_request_097_8
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns Light mode or Lamp mode depending on projector. Value table in Appendix (UNRESOLVED)."

  - id: lan_projector_name_request_097_45
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_request_097_155
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_pbp_request_097_198
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."

  - id: edge_blending_mode_request_097_243_1
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set_098_8
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Eco mode value. Full table in Appendix (UNRESOLVED)."

  - id: lan_projector_name_set_098_45
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
    params:
      - name: DATA01_DATA16
        type: string
        description: "Projector name, up to 16 bytes."

  - id: pip_pbp_set_098_198
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: DATA02
        type: integer
        description: "For MODE: 00h=PIP, 01h=PICTURE BY PICTURE. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. For SUB INPUT: sub input value (Appendix, UNRESOLVED)."

  - id: edge_blending_mode_set_098_243_1
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=OFF, 01h=ON."

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
    notes: "Response: DATA01 operation status, DATA02 content displayed, DATA03 selection signal type 1, DATA04 selection signal type 2, DATA05 display signal type, DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze status."

  - id: audio_select_set_319_10
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal value (Appendix, UNRESOLVED)."
      - name: DATA02
        type: integer
        description: "00h = terminal specified in DATA01, 01h = BNC, 02h = COMPUTER."
```

## Feedbacks
```yaml
# Per command response ACKs (success = 2xh/2Xh frame, error = Axh frame with ERR1/ERR2).
feedbacks:
  - id: ack_success
    type: raw
    description: "Success response frame begins with 2Xh (20h/21h/22h/23h) header mirroring command group. DATA per command."

  - id: ack_error
    type: raw
    description: "Error response frame begins with A0h/A1h/A2h/A3h: Axh <CMD> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>. ERR1/ERR2 per error code table."

  - id: error_status_bitmap
    type: raw
    description: "Response to 009. ERROR STATUS REQUEST. DATA01-12 bitmask, 12 bytes covering cover/fan/temp/power/lamp/ formatter/FPGA/mirror/iris/lens and extended system/interlock status."
```

## Variables
```yaml
# UNRESOLVED: no separate settable parameter registry in source beyond what is exposed via Actions (PICTURE ADJUST targets, VOLUME, lens position, eco mode). Populate via GAIN PARAMETER REQUEST 3 outputs at runtime.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification documented in source. All responses are solicited (after a command).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes POWER ON/OFF blocks all other commands during execution (incl. cooling), but no formal safety interlock procedure, power-on sequencing requirement, or operator confirmation workflow is documented. Interlock switch open state is reported in 009 ERROR STATUS REQUEST extended status (DATA09 bit1) - read-only signal, not a control interlock.
```

## Notes
- Binary protocol. All frames hex bytes. Header byte indicates group: 00h–03h = request/command, 20h–23h = success response, A0h–A3h = error response. Second byte = command opcode. Followed by `<ID1> <ID2>` (control ID + model code), LEN, DATA, CKS.
- Checksum (CKS) = low-order byte of sum of all preceding bytes. Worked example: 20h+81h+01h+60h+01h+00h = 103h → CKS = 03h.
- ID1 = projector's configured Control ID. ID2 = model code, varies by model — both must be supplied by integrator.
- Serial config: baud selectable 115200/38400/19200/9600/4800, 8N1, full duplex. Default baud not stated in source — UNRESOLVED.
- TCP port 7142 (stated). No auth procedure documented — infer none.
- Error code table covers ERR1/ERR2 combinations: unrecognized command (00h/00h), unsupported by model (00h/01h), invalid value (01h/00h), invalid input terminal (01h/01h), invalid language (01h/02h), memory errors (02h/00h–0Ah), forced onscreen mute (02h/04h), no signal (02h/07h), power off (02h/0Dh), exec failed (02h/0Eh), no authority (02h/0Fh), invalid gain (03h/00h–02h).
- Usage times (lamp/filter) returned in seconds, updated at one-minute intervals.
- Lamp remaining life returns negative % if replacement deadline exceeded.
- Source repeatedly references Appendix "Supplementary Information by Command" for full value tables (input terminal, aspect, eco mode, sub input, base model type). That appendix is NOT in this refined source document — those enum tables UNRESOLVED.

<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: Appendix value tables missing — input terminal, aspect, eco mode, sub input, base model type, selection signal type. -->
<!-- UNRESOLVED: serial default baud rate not stated (only options listed). -->
<!-- UNRESOLVED: ID2 model code value for M491 Ir not stated in source. -->
<!-- UNRESOLVED: full lens target axis enumeration for 053 LENS CONTROL beyond "06h=Periphery Focus" not present. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:09:07.569Z
last_checked_at: 2026-06-18T08:10:03.552Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:10:03.552Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version range not stated. Input terminal value table referenced in Appendix \"Supplementary Information by Command\" but not present in this refined source. Eco mode value table referenced in same appendix, not present. Sub input setting value table referenced, not present."
- "source states \"Full duplex\" communication mode; flow_control wire type (RTS/CTS pins wired per pinout table) not explicitly named"
- "appendix not in this source).\""
- "no separate settable parameter registry in source beyond what is exposed via Actions (PICTURE ADJUST targets, VOLUME, lens position, eco mode). Populate via GAIN PARAMETER REQUEST 3 outputs at runtime."
- "no unsolicited notification documented in source. All responses are solicited (after a command)."
- "no multi-step sequences documented in source."
- "source notes POWER ON/OFF blocks all other commands during execution (incl. cooling), but no formal safety interlock procedure, power-on sequencing requirement, or operator confirmation workflow is documented. Interlock switch open state is reported in 009 ERROR STATUS REQUEST extended status (DATA09 bit1) - read-only signal, not a control interlock."
- "firmware version compatibility range not stated."
- "Appendix value tables missing — input terminal, aspect, eco mode, sub input, base model type, selection signal type."
- "serial default baud rate not stated (only options listed)."
- "ID2 model code value for M491 Ir not stated in source."
- "full lens target axis enumeration for 053 LENS CONTROL beyond \"06h=Periphery Focus\" not present."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
