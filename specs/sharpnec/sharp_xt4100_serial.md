---
spec_id: admin/sharp-nec-xt4100
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Xt4100 Control Spec"
manufacturer: Sharp/NEC
model_family: Xt4100
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - Xt4100
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:43:35.034Z
last_checked_at: 2026-06-19T07:54:37.552Z
generated_at: 2026-06-19T07:54:37.552Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal hex value table lives in \"Appendix Supplementary Information by Command\" — not present in refined source. Several commands reference it (018 INPUT SW CHANGE, 098-198 sub input, 319-10 AUDIO SELECT SET). Eco mode enum values also referenced from same appendix."
  - "flow control not stated; \"Communication mode: Full duplex\" only"
  - "no event/notification mechanism described in source."
  - "none documented."
  - "input terminal hex table, eco mode enum values, base model type values, sub input setting values all referenced from \"Appendix Supplementary Information by Command\" — not present in refined source."
  - "053 LENS CONTROL full DATA01 target list — only 06h (Periphery Focus) shown in refined doc; other targets truncated."
  - "flow_control not stated (only \"Full duplex\" comm mode)."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:54:37.552Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action hex commands matched verbatim against source sections 3.1-3.53; transport parameters (115200 baud, port 7142) verified; complete coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Xt4100 Control Spec

## Summary
Sharp/NEC Xt4100 installation projector. RS-232C serial and TCP/LAN control via binary command protocol (hex frame with checksum). Covers power, input switch, mutes, picture/volume/aspect adjust, lens control + memory, status/error/lamp/filter info requests, eco mode, PIP/PbP, edge blending, and audio select.

<!-- UNRESOLVED: input terminal hex value table lives in "Appendix Supplementary Information by Command" — not present in refined source. Several commands reference it (018 INPUT SW CHANGE, 098-198 sub input, 319-10 AUDIO SELECT SET). Eco mode enum values also referenced from same appendix. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists selectable: 115200/38400/19200/9600/4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; "Communication mode: Full duplex" only
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # 015 POWER ON / 016 POWER OFF
- queryable       # many status/error/info request commands
- levelable       # 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 053 LENS CONTROL
- routable        # 018 INPUT SW CHANGE, 319-10 AUDIO SELECT SET
```

## Actions
```yaml
# Binary frame protocol. Hex bytes space-separated. <CKS> = checksum = low byte of
# sum of all preceding bytes. <ID1> = control ID, <ID2> = model code (varies).
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
  notes: "No other command accepted while powering on."

- id: power_off_016
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."

- id: input_sw_change_018
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal hex (e.g. 06h = video). Full table in Appendix Supplementary Information by Command."
  notes: "Example to video port: 02h 03h 00h 00h 02h 01h 06h 0Eh"

- id: picture_mute_on_020
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input/video switch."

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
  notes: "Cleared by input/video switch."

- id: onscreen_mute_off_025
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust_030_1
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 00h=Brightness 01h=Contrast 02h=Color 03h=Hue 04h=Sharpness"
    - name: data03
      type: integer
      description: "Adjustment value low byte"
    - name: data04
      type: integer
      description: "Adjustment value high byte"
  notes: "Mode fixed FFh (absolute). Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: volume_adjust_030_2
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data02} {data03} {cks}"
  params:
    - name: data02
      type: integer
      description: "Adjustment value low byte"
    - name: data03
      type: integer
      description: "Adjustment value high byte"
  notes: "Mode fixed 00h (absolute). Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust_030_12
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Aspect value hex. Table in Appendix Supplementary Information by Command."

- id: other_adjust_030_15
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "96h for LAMP/LIGHT ADJUST"
    - name: data02
      type: string
      description: "FFh paired with 96h"
    - name: data04
      type: integer
      description: "Adjustment value low byte"
    - name: data05
      type: integer
      description: "Adjustment value high byte"
  notes: "DATA03 = mode: 00h absolute / 01h relative"

- id: information_request_037
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage sec (DATA83-86), filter usage sec (DATA87-90). Updated 1-min intervals."

- id: filter_usage_info_request_037_3
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04) and alarm start time (DATA05-08), in seconds. -1 if undefined."

- id: lamp_info_request_037_4
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: string
      description: "01h=usage time seconds, 04h=remaining life %"
  notes: "Eco mode reflected. Negative remaining life if deadline exceeded. Example lamp1 usage: 03h 96h 00h 00h 02h 00h 01h 9Ch"

- id: carbon_savings_request_037_6
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Total, 01h=During operation"
  notes: "Returns kg (DATA02-05, max 99999) + mg (DATA06-09, max 999999)."

- id: remote_key_code_050
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Key code low byte (see key code list)"
    - name: data02
      type: string
      description: "Key code high byte (typically 00h)"
  notes: "Key codes: 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO. Example AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h"

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
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target - source shows 06h Periphery Focus; full target list truncated in refined doc."
    - name: data02
      type: string
      description: "00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +continuous, 81h -continuous, FDh -0.25s, FEh -0.5s, FFh -1s"
  notes: "Send 00h to stop after 7Fh/81h continuous. Same command can be re-issued without stop while driving."

- id: lens_control_request_053_1
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target (per 053)"
  notes: "Returns upper/lower limits and current value (16-bit each)."

- id: lens_control_2_053_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "FFh = Stop; otherwise lens target"
    - name: data02
      type: string
      description: "Adjustment mode: 00h absolute, 02h relative"
    - name: data03
      type: integer
      description: "Adjustment value low byte"
    - name: data04
      type: integer
      description: "Adjustment value high byte"
  notes: "If DATA01=FFh (Stop), mode/value ignored."

- id: lens_memory_control_053_3
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control_053_4
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h MOVE, 01h STORE, 02h RESET"
  notes: "Acts on profile selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request_053_5
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"

- id: lens_memory_option_set_053_6
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: data02
      type: string
      description: "00h OFF, 01h ON"

- id: lens_information_request_053_7
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "DATA01 bitmap: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift H, Bit4 Lens Shift V (0=Stop, 1=Operating)."

- id: lens_profile_set_053_10
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h Profile 1, 01h Profile 2"

- id: lens_profile_request_053_11
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3_060_1
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: string
      description: "00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust"
  notes: "Returns status, upper/lower limits, default, current, wide/narrow step. Example brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

- id: setting_request_078_1
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock/sleep (DATA05)."

- id: running_status_request_078_2
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "DATA03 power (00h Standby, 01h On), DATA04 cooling, DATA05 power on/off process, DATA06 operation status."

- id: input_status_request_078_3
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Signal switch, list number (returned value + 1 = practical), signal types, test pattern, displayed content."

- id: mute_status_request_078_4
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 OSD."

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
  notes: "DATA01: 00h Normal (cover opened), 01h Cover closed."

- id: freeze_control_079
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "01h freeze on, 02h freeze off"

- id: information_string_request_084
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "03h Horizontal sync freq, 04h Vertical sync freq"

- id: eco_mode_request_097_8
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns Light/Lamp mode value. Enum in Appendix."

- id: lan_projector_name_request_097_45
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name (17 bytes)."

- id: lan_mac_address_request_097_155
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns 6-byte MAC. Example resp for 01-23-45-67-89-AB: 23h B0h <ID1> <ID2> 08h 9Ah 00h 01h 23h 45h 67h 89h ABh <CKS>"

- id: pip_pbp_request_097_198
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

- id: edge_blending_mode_request_097_243_1
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "DATA01: 00h OFF, 01h ON."

- id: eco_mode_set_098_8
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Eco mode value. Enum in Appendix Supplementary Information by Command."

- id: lan_projector_name_set_098_45
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01-16} 00h {cks}"
  params:
    - name: data01-16
      type: string
      description: "Projector name, up to 16 bytes"

- id: pip_pbp_set_098_198
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: data02
      type: string
      description: "Setting value (mode: 00h PIP / 01h PbP; position: 00h TL/01h TR/02h BL/03h BR; sub input per Appendix)"

- id: edge_blending_mode_set_098_243_1
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h OFF, 01h ON"

- id: base_model_type_request_305_1
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type + model name. Type values in Appendix."

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
  notes: "Returns operation status, displayed content, signal types, video/sound/onscreen/freeze mute states."

- id: audio_select_set_319_10
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal hex. Table in Appendix Supplementary Information by Command."
    - name: data02
      type: string
      description: "00h terminal-specified audio, 01h BNC"
```

## Feedbacks
```yaml
# Response framing: success = 2xh/3xh prefix echo + LEN + data + CKS.
# Failure = Axh prefix + <ERR1> <ERR2> <CKS>. Query responses carry DATA per command.

- id: command_ack
  type: enum
  values: [success, error]
  description: "Success: 22h/23h/20h/21h prefix echo + data. Error: A2h/A3h/A0h/A1h + ERR1+ERR2."

- id: error_status
  type: bitmap
  description: "009 ERROR STATUS REQUEST DATA01-12 bitfield. See error information list (cover, fan, temp, lamp, mirror cover, interlock, system, etc.)."

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "078-2 DATA06 / 305-3 DATA01."

- id: mute_states
  type: object
  description: "078-4: picture, sound, onscreen, forced onscreen, OSD display flags."

- id: input_signal_state
  type: object
  description: "078-3 / 305-3: signal type, list number, displayed content, test pattern."

- id: lens_operation_state
  type: bitmap
  description: "053-7 DATA01: lens memory, zoom, focus, lens shift H/V operation bits."
```

## Variables
```yaml
- id: lamp_usage_seconds
  description: "037 DATA83-86 / 037-4 DATA03-06. Updated 1-min intervals."

- id: filter_usage_seconds
  description: "037 DATA87-90 / 037-3 DATA01-04."

- id: lamp_remaining_life_percent
  description: "037-4 content 04h. Negative if replacement deadline exceeded."

- id: carbon_savings_kg
  description: "037-6 DATA02-05 (max 99999 kg) + DATA06-09 mg."

- id: lens_position
  description: "053-1 returns upper/lower limits + current value per lens target."

- id: gain_adjustment
  description: "060-1 returns limits, default, current, wide/narrow step per gain target."

- id: projector_name
  description: "078-5 / 097-45 / settable via 098-45 (16 bytes)."

- id: eco_mode
  description: "097-8 / settable via 098-8. Enum in Appendix."
```

## Events
```yaml
# No unsolicited notifications documented. Device responds only to commands.
# UNRESOLVED: no event/notification mechanism described in source.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: none documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes:
# - 015 POWER ON / 016 POWER OFF: no other command accepted during power transition (incl. cooling).
# - 009 ERROR STATUS: interlock switch open (DATA09 Bit1), system errors, cover errors reported.
# - 078-6 COVER STATUS: mirror/lens cover state.
# No explicit safety interlock procedures or power-on sequencing requirements stated beyond above.
```

## Notes
- Binary protocol. Every frame ends in checksum byte = low 8 bits of sum of all preceding bytes.
- Command/response framing: leading byte indicates direction+class — `02h/03h/00h/01h` = command prefix, `22h/23h/20h/21h` = success response prefix, `A2h/A3h/A0h/A1h` = error response prefix.
- Baud rate selectable: 115200 / 38400 / 19200 / 9600 / 4800. Pick one in software config.
- TCP port 7142 for LAN control.
- Wireless LAN supported via optional wireless LAN unit (config not in this doc).
- Lamp/filter usage returned in seconds, updated at 1-minute intervals.
- Two-lamp projector models: 037-4 DATA01=01h (Lamp 2) effective only on those models.

<!-- UNRESOLVED: input terminal hex table, eco mode enum values, base model type values, sub input setting values all referenced from "Appendix Supplementary Information by Command" — not present in refined source. -->
<!-- UNRESOLVED: 053 LENS CONTROL full DATA01 target list — only 06h (Periphery Focus) shown in refined doc; other targets truncated. -->
<!-- UNRESOLVED: flow_control not stated (only "Full duplex" comm mode). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:43:35.034Z
last_checked_at: 2026-06-19T07:54:37.552Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:54:37.552Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action hex commands matched verbatim against source sections 3.1-3.53; transport parameters (115200 baud, port 7142) verified; complete coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal hex value table lives in \"Appendix Supplementary Information by Command\" — not present in refined source. Several commands reference it (018 INPUT SW CHANGE, 098-198 sub input, 319-10 AUDIO SELECT SET). Eco mode enum values also referenced from same appendix."
- "flow control not stated; \"Communication mode: Full duplex\" only"
- "no event/notification mechanism described in source."
- "none documented."
- "input terminal hex table, eco mode enum values, base model type values, sub input setting values all referenced from \"Appendix Supplementary Information by Command\" — not present in refined source."
- "053 LENS CONTROL full DATA01 target list — only 06h (Periphery Focus) shown in refined doc; other targets truncated."
- "flow_control not stated (only \"Full duplex\" comm mode)."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
