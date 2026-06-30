---
spec_id: admin/sharp-nec-ld-d091
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld D091 Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld D091"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld D091"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:50:22.479Z
last_checked_at: 2026-06-17T19:58:28.864Z
generated_at: 2026-06-17T19:58:28.864Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact Ld D091 model family mapping not confirmed in source (doc is generic \"Projector Control Command Reference Manual\" BDT140013 Rev 7.1). Input-terminal value tables and eco-mode value table referenced to \"Appendix: Supplementary Information by Command\" which is not in this refined excerpt."
  - "not stated in source (RTS/CTS pins wired but flow-control mode not specified)"
  - "no explicit safety warnings, interlock sequences, or power-on"
  - "input-terminal value table, eco-mode value table, aspect value table, base-model-type values, and sub-input setting values are referenced to \"Appendix: Supplementary Information by Command\" which is NOT present in this refined excerpt."
  - "exact Ld D091 model code (ID2) not stated — varies by model."
  - "firmware compatibility range not stated."
  - "serial flow_control mode not stated (RTS/CTS pins wired but mode unspecified)."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:58:28.864Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source; transport parameters (port 7142, baud 115200, 8N1) confirmed in source documentation. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld D091 Control Spec

## Summary
Sharp/NEC projector controlled via binary hex command protocol over RS-232C serial or TCP/IP (wired/wireless LAN). Commands are framed with header bytes, control ID, model code, data length, payload, and a low-byte checksum. Covers power, input switching, mute, picture/volume/aspect adjust, lens control and memory, status queries, eco mode, PIP/PbP, edge blending, and identity requests.

<!-- UNRESOLVED: exact Ld D091 model family mapping not confirmed in source (doc is generic "Projector Control Command Reference Manual" BDT140013 Rev 7.1). Input-terminal value tables and eco-mode value table referenced to "Appendix: Supplementary Information by Command" which is not in this refined excerpt. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port stated for LAN command send/receive
serial:
  baud_rate: 115200  # source: 115200/38400/19200/9600/4800 bps selectable
  # full selectable set: [4800, 9600, 19200, 38400, 115200]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: not stated in source (RTS/CTS pins wired but flow-control mode not specified)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many REQUEST commands returning state
  - routable     # inferred: INPUT SW CHANGE command present
  - levelable    # inferred: PICTURE/VOLUME/OTHER ADJUST commands present
```

## Actions
```yaml
# Command frame: <hdr> <ID1> <ID2> <LEN> <DATA...> <CKS>
# CKS = low byte of sum of all preceding bytes. ID1=control ID, ID2=model code
# (device-specific). Templates below show literal command bytes as written in source;
# <ID1>/<ID2>/<CKS> are runtime-computed.

- id: error_status_request_009
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Returns DATA01-DATA12 bitmap (cover/fan/temp/lamp/formatter/mirror-cover/interlock errors)."

- id: power_on_015
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While turning on, no other command accepted."

- id: power_off_016
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While turning off (incl. cooling), no other command accepted."

- id: input_sw_change_018
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "Input terminal byte (e.g. 06h=Video). Full value list in Appendix 'Supplementary Information by Command' (not in excerpt)."
  notes: "Example (video): 02h 03h 00h 00h 02h 01h 06h 0Eh"

- id: picture_mute_on_020
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input/video signal switch."

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
  notes: "Cleared by input/video switch or volume adjust."

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
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: data01
      type: string
      description: "Target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: string
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data03
      type: integer
      description: "Value low 8 bits"
    - name: data04
      type: integer
      description: "Value high 8 bits"
  notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: volume_adjust_030_2
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: data01
      type: string
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data02
      type: integer
      description: "Value low 8 bits"
    - name: data03
      type: integer
      description: "Value high 8 bits"
  notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust_030_12
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: string
      description: "Aspect value (see Appendix 'Supplementary Information by Command' - not in excerpt)"

- id: other_adjust_030_15
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: data01
      type: string
      description: "Target: 96h/FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: data03
      type: string
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: "Value low 8 bits"
    - name: data05
      type: integer
      description: "Value high 8 bits"

- id: information_request_037
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (D01-49), lamp usage sec (D83-86), filter usage sec (D87-90)."

- id: filter_usage_info_request_037_3
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage sec (D01-04), filter alarm start sec (D05-08). -1 if undefined."

- id: lamp_info_request_037_4
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=Lamp1, 01h=Lamp2 (two-lamp models only)"
    - name: data02
      type: string
      description: "01h=usage sec, 04h=remaining life %"
  notes: "Returns 4-byte value. Negative remaining life if past replacement deadline."

- id: carbon_savings_info_request_037_6
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=Total, 01h=During operation"
  notes: "Returns kg (D02-05, max 99999) + mg (D06-09, max 999999)."

- id: remote_key_code_050
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Key code low byte (WORD type)"
    - name: data02
      type: string
      description: "Key code high byte (always 00h in listed codes)"
  notes: "Key codes: POWER ON(02h,00h), POWER OFF(03h,00h), AUTO(05h,00h), MENU(06h,00h), UP(07h,00h), DOWN(08h,00h), RIGHT(09h,00h), LEFT(0Ah,00h), ENTER(0Bh,00h), EXIT(0Ch,00h), HELP(0Dh,00h), MAGNIFY UP(0Fh,00h), MAGNIFY DOWN(10h,00h), MUTE(13h,00h), PICTURE(29h,00h), COMPUTER1(4Bh,00h), COMPUTER2(4Ch,00h), VIDEO1(4Fh,00h), S-VIDEO1(51h,00h), VOLUME UP(84h,00h), VOLUME DOWN(85h,00h), FREEZE(8Ah,00h), ASPECT(A3h,00h), SOURCE(D7h,00h), LAMP MODE/ECO(EEh,00h)"

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
    - name: data01
      type: string
      description: "Lens function (06h=Periphery Focus in excerpt)"
    - name: data02
      type: string
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "Send 00h to stop after 7Fh/81h continuous drive."

- id: lens_control_request_053_1
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: string
      description: "Lens function selector"
  notes: "Returns upper/lower limit + current value (4×16-bit)."

- id: lens_control_2_053_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: data01
      type: string
      description: "FFh=Stop, else lens function"
    - name: data02
      type: string
      description: "Mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: "Value low 8 bits"
    - name: data04
      type: integer
      description: "Value high 8 bits"

- id: lens_memory_control_053_3
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control_053_4
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on profile selected by 053-10 LENS PROFILE SET."

- id: lens_memory_option_request_053_5
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "Returns option (D01) + setting ON/OFF (D02)."

- id: lens_memory_option_set_053_6
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: string
      description: "00h=OFF, 01h=ON"

- id: lens_information_request_053_7
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns D01 bitmap: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V) - 0=Stop/1=Operating."

- id: lens_profile_set_053_10
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request_053_11
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns D01 profile number (00h=Profile1, 01h=Profile2)."

- id: gain_parameter_request_060_1
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Returns status, upper/lower/default/current limits, wide/narrow step widths."

- id: setting_request_078_1
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (D01-03), sound function (D04), profile features (D05)."

- id: running_status_request_078_2
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (D03), cooling (D04), power on/off proc (D05), operation status (D06)."

- id: input_status_request_078_3
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch proc, signal list no, selection signal type 1/2, content displayed. Signal list number returned = practical - 1."

- id: mute_status_request_078_4
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture/sound/onscreen/forced-onscreen mute + OSD display flags."

- id: model_name_request_078_5
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns 32-byte NUL-terminated model name."

- id: cover_status_request_078_6
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns D01: 00h=Normal(open), 01h=Cover closed."

- id: freeze_control_079
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "01h=Freeze ON, 02h=Freeze OFF"

- id: information_string_request_084
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: data01
      type: string
      description: "03h=Horizontal sync freq, 04h=Vertical sync freq"
  notes: "Returns label + value string (English)."

- id: eco_mode_request_097_8
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco/light/lamp mode value (see Appendix - not in excerpt)."

- id: lan_projector_name_request_097_45
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns 17-byte NUL-terminated projector name."

- id: lan_mac_address_request_097_155
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns 6-byte MAC address."

- id: pip_pbp_request_097_198
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request_097_243_1
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns D01: 00h=OFF, 01h=ON."

- id: eco_mode_set_098_8
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "Eco mode value (see Appendix 'Supplementary Information by Command' - not in excerpt)"

- id: lan_projector_name_set_098_45
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes)"

- id: pip_pbp_set_098_198
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: string
      description: "MODE: 00h=PIP/01h=PbP. START POSITION: 00h=TL/01h=TR/02h=BL/03h=BR. SUB INPUT: see Appendix."

- id: edge_blending_mode_set_098_243_1
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request_305_1
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (D01-02), model name (D03-11), secondary type (D12-13)."

- id: serial_number_request_305_2
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns 16-byte NUL-terminated serial number."

- id: basic_information_request_305_3
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, signal types, display signal type, mute flags, freeze status."

- id: audio_select_set_319_10
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Input terminal (see Appendix - not in excerpt)"
    - name: data02
      type: string
      description: "00h=terminal-specified audio, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST D06"

- id: error_status
  type: bitmap
  source: "009 ERROR STATUS REQUEST D01-D12"
  notes: "Cover/fan/temp/lamp/formatter/mirror-cover/interlock/ballast/iris errors."

- id: input_signal_status
  type: composite
  source: "078-3 INPUT STATUS REQUEST"

- id: mute_status
  type: composite
  source: "078-4 MUTE STATUS REQUEST (picture/sound/onscreen/forced-onscreen/OSD)"

- id: cover_status
  type: enum
  values: [normal_open, closed]
  source: "078-6 COVER STATUS REQUEST"

- id: lens_operation
  type: bitmap
  source: "053-7 LENS INFORMATION REQUEST D01"
  notes: "Lens memory/zoom/focus/lens-shift-H/lens-shift-V operation state."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1"

- id: eco_mode
  type: raw
  source: "097-8 (value table in Appendix - not in excerpt)"
```

## Variables
```yaml
- id: picture_brightness
  type: integer
  source: "030-1 PICTURE ADJUST target 00h"
- id: picture_contrast
  type: integer
  source: "030-1 PICTURE ADJUST target 01h"
- id: picture_color
  type: integer
  source: "030-1 PICTURE ADJUST target 02h"
- id: picture_hue
  type: integer
  source: "030-1 PICTURE ADJUST target 03h"
- id: picture_sharpness
  type: integer
  source: "030-1 PICTURE ADJUST target 04h"
- id: volume
  type: integer
  source: "030-2 VOLUME ADJUST"
- id: lamp_light_adjust
  type: integer
  source: "030-15 OTHER ADJUST target 96h/FFh"
- id: aspect
  type: enum
  source: "030-12 ASPECT ADJUST (values in Appendix - not in excerpt)"
- id: projector_name
  type: string
  max_length: 16
  source: "098-45 LAN PROJECTOR NAME SET"
```

## Events
```yaml
# No unsolicited notifications documented. Device responds only to commands.
```

## Macros
```yaml
# No multi-step sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes: 015 POWER ON and 016 POWER OFF reject all other commands during the power
# transition (incl. cooling). No explicit safety interlock procedures documented.
# <!-- UNRESOLVED: no explicit safety warnings, interlock sequences, or power-on
# sequencing requirements stated in this excerpt. -->
```

## Notes
- Command frame: `<hdr> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Response header high nibble flips `0→2`, `2→A`, `3→2/3` (success/failure variants). Failure response carries `<ERR1> <ERR2>` from the error code table (e.g. 02h/0Dh = "command cannot be accepted because the power is off").
- Checksum: low byte of sum of all preceding bytes (example: 20h+81h+01h+60h+01h+00h = 103h → CKS=03h).
- Lamp/filter usage times update at 1-minute intervals though stored in 1-second units.
- Lamp remaining life (%) returns negative if past replacement deadline.
- "01h" Lamp 2 selector only valid on two-lamp models.
- Signal list number returned is practical value − 1 (add 1 for actual).
- <!-- UNRESOLVED: input-terminal value table, eco-mode value table, aspect value table, base-model-type values, and sub-input setting values are referenced to "Appendix: Supplementary Information by Command" which is NOT present in this refined excerpt. -->
- <!-- UNRESOLVED: exact Ld D091 model code (ID2) not stated — varies by model. -->
- <!-- UNRESOLVED: firmware compatibility range not stated. -->
- <!-- UNRESOLVED: serial flow_control mode not stated (RTS/CTS pins wired but mode unspecified). -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:50:22.479Z
last_checked_at: 2026-06-17T19:58:28.864Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:58:28.864Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source; transport parameters (port 7142, baud 115200, 8N1) confirmed in source documentation. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact Ld D091 model family mapping not confirmed in source (doc is generic \"Projector Control Command Reference Manual\" BDT140013 Rev 7.1). Input-terminal value tables and eco-mode value table referenced to \"Appendix: Supplementary Information by Command\" which is not in this refined excerpt."
- "not stated in source (RTS/CTS pins wired but flow-control mode not specified)"
- "no explicit safety warnings, interlock sequences, or power-on"
- "input-terminal value table, eco-mode value table, aspect value table, base-model-type values, and sub-input setting values are referenced to \"Appendix: Supplementary Information by Command\" which is NOT present in this refined excerpt."
- "exact Ld D091 model code (ID2) not stated — varies by model."
- "firmware compatibility range not stated."
- "serial flow_control mode not stated (RTS/CTS pins wired but mode unspecified)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
