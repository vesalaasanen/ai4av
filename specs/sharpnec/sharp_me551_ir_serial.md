---
spec_id: admin/sharp-nec-me551
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC ME551 Control Spec"
manufacturer: Sharp/NEC
model_family: ME551
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - ME551
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:49:58.952Z
last_checked_at: 2026-06-18T08:29:55.300Z
generated_at: 2026-06-18T08:29:55.300Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic family command reference; it does not state ME551-specific firmware, model code (ID2), voltage/power specs, or which optional commands this exact model implements."
  - "source shows RTS/CTS pins wired (pin 7 RTS, pin 8 CTS) but does not state a flow-control mode"
  - "ME551-specific model code (ID2) not stated."
  - "Default baud rate not stated (selectable list only)."
  - "Flow control mode not stated (RTS/CTS pins present but no mode declared)."
  - "Appendix enum tables (input terminals, aspect, eco mode, sub-input, base model types) not in refined source excerpt."
  - "Voltage / current / power specs not in source."
  - "Firmware version compatibility not stated."
  - "Wireless LAN unit model compatibility not specified in this document."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:29:55.300Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC ME551 Control Spec

## Summary
Sharp/NEC ME551 large-format display / projector controllable via RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN (TCP). This spec covers the binary frame protocol documented in the vendor Projector Control Command Reference Manual (BDT140013 Rev 7.1), enumerating all 53 listed commands (power, input switch, mutes, picture/volume/aspect/gain adjust, lens & lens-memory control, eco mode, PIP/PbP, edge blending, freeze, audio select, and the various status/information/lamp/filter/error queries).

<!-- UNRESOLVED: source is a generic family command reference; it does not state ME551-specific firmware, model code (ID2), voltage/power specs, or which optional commands this exact model implements. -->

## Transport
```yaml
# Source documents BOTH serial (PC CONTROL D-SUB 9P, RS-232C) and LAN (wired + wireless, TCP).
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps as selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: source shows RTS/CTS pins wired (pin 7 RTS, pin 8 CTS) but does not state a flow-control mode
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred from POWER ON / POWER OFF commands
  - routable       # inferred from INPUT SW CHANGE command
  - queryable      # inferred from numerous status/information request commands
  - levelable      # inferred from PICTURE ADJUST / VOLUME ADJUST / OTHER ADJUST commands
```

## Actions
```yaml
# All 53 command-bearing entries from source §2 Command List, in source order.
# Frame layout (per source §2.1/§2.2): request = [type] [opcode] [ID1] [ID2] [LEN] [DATA...] [CKS]
# CKS = low byte of sum of all preceding bytes (source §2.2). ID1 = control ID, ID2 = model code.
# Bytes copied verbatim from source. <DATA..> placeholders denote parameterized fields documented in the source row.

- id: error_status_request
  label: 009. ERROR STATUS REQUEST
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: 015. POWER ON
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: 016. POWER OFF
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: 018. INPUT SW CHANGE
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal selector (e.g. 06h = video port). Full value list in source Appendix 'Supplementary Information by Command'."

- id: picture_mute_on
  label: 020. PICTURE MUTE ON
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: 021. PICTURE MUTE OFF
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: 022. SOUND MUTE ON
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: 023. SOUND MUTE OFF
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: 024. ONSCREEN MUTE ON
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: 025. ONSCREEN MUTE OFF
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: 030-1. PICTURE ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: volume_adjust
  label: 030-2. VOLUME ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: aspect_adjust
  label: 030-12. ASPECT ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value (full list in source Appendix 'Supplementary Information by Command')"

- id: other_adjust
  label: 030-15. OTHER ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte (96h when DATA02=FFh = LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (FFh = LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request
  label: 037. INFORMATION REQUEST
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: 037-3. FILTER USAGE INFORMATION REQUEST
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: 037-4. LAMP INFORMATION REQUEST 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h lamp usage time (seconds), 04h lamp remaining life (%)"

- id: carbon_savings_information_request
  label: 037-6. CARBON SAVINGS INFORMATION REQUEST
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation"

- id: remote_key_code
  label: 050. REMOTE KEY CODE
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD-type key code; see source Key code list, e.g. 05h=AUTO, 06h=MENU, 4Bh=COMPUTER1)"
    - name: DATA02
      type: integer
      description: "Key code high byte (always 00h in source key code list)"

- id: shutter_close
  label: 051. SHUTTER CLOSE
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: 052. SHUTTER OPEN
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: 053. LENS CONTROL
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target: 06h Periphery Focus"
    - name: DATA02
      type: integer
      description: "Drive content: 00h stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +continuous, 81h -continuous, FDh -0.25s, FEh -0.5s, FFh -1s"

- id: lens_control_request
  label: 053-1. LENS CONTROL REQUEST
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (same selector space as 053 LENS CONTROL)"

- id: lens_control_2
  label: 053-2. LENS CONTROL 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target; FFh = Stop (mode/value ignored)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 02h relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: 053-3. LENS MEMORY CONTROL
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control
  label: 053-4. REFERENCE LENS MEMORY CONTROL
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h MOVE, 01h STORE, 02h RESET (acts on profile selected via 053-10)"

- id: lens_memory_option_request
  label: 053-5. LENS MEMORY OPTION REQUEST
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h LOAD BY SIGNAL, 01h FORCED MUTE"

- id: lens_memory_option_set
  label: 053-6. LENS MEMORY OPTION SET
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h OFF, 01h ON"

- id: lens_information_request
  label: 053-7. LENS INFORMATION REQUEST
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: 053-10. LENS PROFILE SET
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h Profile 1, 01h Profile 2"

- id: lens_profile_request
  label: 053-11. LENS PROFILE REQUEST
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: 060-1. GAIN PARAMETER REQUEST 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust"

- id: setting_request
  label: 078-1. SETTING REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: 078-2. RUNNING STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: 078-3. INPUT STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: 078-4. MUTE STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: 078-5. MODEL NAME REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: 078-6. COVER STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: 079. FREEZE CONTROL
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h freeze on, 02h freeze off"

- id: information_string_request
  label: 084. INFORMATION STRING REQUEST
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h Horizontal sync frequency, 04h Vertical sync frequency"

- id: eco_mode_request
  label: 097-8. ECO MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: 097-45. LAN PROJECTOR NAME REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: 097-155. LAN MAC ADDRESS STATUS REQUEST2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: 097-198. PIP/PICTURE BY PICTURE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

- id: edge_blending_mode_request
  label: 097-243-1. EDGE BLENDING MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: 098-8. ECO MODE SET
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value (full list in source Appendix 'Supplementary Information by Command')"

- id: lan_projector_name_set
  label: 098-45. LAN PROJECTOR NAME SET
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: DATA01-16
      type: string
      description: "Projector name, up to 16 bytes (NUL-terminated)"

- id: pip_picture_by_picture_set
  label: 098-198. PIP/PICTURE BY PICTURE SET
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (MODE: 00h PIP / 01h PbP; START POSITION: 00h TL/01h TR/02h BL/03h BR; sub-input values per Appendix)"

- id: edge_blending_mode_set
  label: 098-243-1. EDGE BLENDING MODE SET
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h OFF, 01h ON"

- id: base_model_type_request
  label: 305-1. BASE MODEL TYPE REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: 305-2. SERIAL NUMBER REQUEST
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: 305-3. BASIC INFORMATION REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: 319-10. AUDIO SELECT SET
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (full value list in source Appendix 'Supplementary Information by Command')"
    - name: DATA02
      type: integer
      description: "Setting value: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
# One entry per documented success-response shape. Response frame marker bytes per source §2.3:
#   success (no data): [type|20h] [opcode] <ID1> <ID2> 00h <CKS>
#   success (with data): [type|20h/23h] [opcode] <ID1> <ID2> LEN <DATA..> <CKS>
#   error:              [type|A0h/A1h/A2h/A3h] [opcode] <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: error_status_response
  type: bytes
  description: "009 response - 20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>; DATA01-12 are bitfield error words (source §3.1 error information list)"

- id: power_response
  type: enum
  values: [ack, error]
  description: "015/016 success: 22h 00h|01h <ID1> <ID2> 00h <CKS>; error: A2h 00h|01h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: input_sw_change_response
  type: enum
  values: [switched, error_ff]
  description: "018 success: 22h 03h <ID1> <ID2> 01h <DATA01> <CKS>; DATA01=FFh means ended with error (no switch). Error frame: A2h 03h ..."

- id: mute_response
  type: enum
  values: [ack, error]
  description: "020-025 success: 22h 1xh <ID1> <ID2> 00h <CKS> (1xh = 10h..15h). Error: A2h 1xh ..."

- id: adjust_response
  type: bytes
  description: "030-1/030-2/030-12/030-15 success: 23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>; DATA01+DATA02 = 0000h success, other = error"

- id: information_response
  type: bytes
  description: "037 success: 23h 8Ah <ID1> <ID2> 62h <DATA01>-<DATA98> <CKS>; DATA01-49 projector name, DATA83-86 lamp usage seconds, DATA87-90 filter usage seconds"

- id: filter_usage_response
  type: bytes
  description: "037-3 success: 23h 95h <ID1> <ID2> 08h <DATA01>-<DATA08> <CKS>; DATA01-04 filter usage seconds, DATA05-08 filter alarm start seconds (-1 if undefined)"

- id: lamp_information_response
  type: bytes
  description: "037-4 success: 23h 96h <ID1> <ID2> 06h <DATA01>-<DATA06> <CKS>; DATA01 lamp selector, DATA02 content, DATA03-06 value (negative if lamp deadline exceeded)"

- id: carbon_savings_response
  type: bytes
  description: "037-6 success: 23h 9Ah <ID1> <ID2> 09h <DATA01>-<DATA09> <CKS>; DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)"

- id: remote_key_response
  type: enum
  values: [ack, error_ff]
  description: "050 success: 22h 0Fh <ID1> <ID2> 01h <DATA01> <CKS>; DATA01=FFh = error"

- id: shutter_response
  type: enum
  values: [ack, error]
  description: "051/052 success: 22h 16h|17h <ID1> <ID2> 00h <CKS>; error: A2h 16h|17h ..."

- id: lens_control_response
  type: enum
  values: [ack, error_ff]
  description: "053 success: 22h 18h <ID1> <ID2> 01h <DATA01> <CKS>; DATA01=FFh = error"

- id: lens_control_request_response
  type: bytes
  description: "053-1 success: 22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02>-<DATA07> <CKS>; upper/lower bounds + current value"

- id: lens_control_2_response
  type: bytes
  description: "053-2 success: 22h 1Dh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: lens_memory_response
  type: enum
  values: [move, store, reset, error_ff]
  description: "053-3/053-4 success: 22h 1Eh|1Fh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>; DATA02=FFh = error"

- id: lens_memory_option_response
  type: bytes
  description: "053-5 success: 22h 20h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: lens_memory_option_set_response
  type: bytes
  description: "053-6 success: 23h 21h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: lens_information_response
  type: bytes
  description: "053-7 success: 22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>; DATA01 bitfield: bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift H, bit4 lens shift V (0=stop,1=operating)"

- id: lens_profile_response
  type: enum
  values: [profile_1, profile_2]
  description: "053-10/053-11 success: 22h 27h|28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>; DATA01: 00h Profile 1, 01h Profile 2"

- id: gain_parameter_response
  type: bytes
  description: "060-1 success: 23h 05h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>; DATA01 status (00h/01h/02h/FFh), bounds, default, current, wide/narrow widths"

- id: setting_response
  type: bytes
  description: "078-1 success: 20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>; DATA01-03 base model type, DATA04 sound function, DATA05 profile number"

- id: running_status_response
  type: bytes
  description: "078-2 success: 20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>; DATA03 power, DATA04 cooling, DATA05 power on/off proc, DATA06 operation status"

- id: input_status_response
  type: bytes
  description: "078-3 success: 20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>; signal switch, list number, signal types, test pattern, content displayed"

- id: mute_status_response
  type: bytes
  description: "078-4 success: 20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>; DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 OSD"

- id: model_name_response
  type: string
  description: "078-5 success: 20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>; DATA01-32 NUL-terminated model name"

- id: cover_status_response
  type: enum
  values: [normal_open, closed]
  description: "078-6 success: 20h 85h <ID1> <ID2> 01h <DATA01> <CKS>; DATA01: 00h normal/open, 01h closed"

- id: freeze_response
  type: enum
  values: [on, off]
  description: "079 success: 21h 98h <ID1> <ID2> 01h <DATA01> <CKS>; echoes 01h on / 02h off"

- id: information_string_response
  type: string
  description: "084 success: 20h D0h <ID1> <ID2> LEN <DATA01> 01h <DATA02>-<DATA??> <CKS>; DATA03+ NUL-terminated label/frequency string"

- id: eco_mode_response
  type: bytes
  description: "097-8 success: 23h B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>; DATA01 eco mode value (Appendix)"

- id: lan_projector_name_response
  type: string
  description: "097-45 success: 23h B0h <ID1> <ID2> 12h 2Ch <DATA01>-<DATA17> <CKS>; NUL-terminated projector name"

- id: lan_mac_address_response
  type: bytes
  description: "097-155 success: 23h B0h <ID1> <ID2> 08h 9Ah 00h <DATA01>-<DATA06> <CKS>; 6-byte MAC"

- id: pip_pbp_response
  type: bytes
  description: "097-198 success: 23h B0h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"

- id: edge_blending_response
  type: enum
  values: [off, on]
  description: "097-243-1 success: 23h B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>; DATA01 00h OFF / 01h ON"

- id: eco_mode_set_response
  type: bytes
  description: "098-8 success: 23h B1h <ID1> <ID2> 02h 07h <DATA01> <CKS>"

- id: lan_projector_name_set_response
  type: bytes
  description: "098-45 success: 23h B1h <ID1> <ID2> 02h 2Ch <DATA01> <CKS>"

- id: pip_pbp_set_response
  type: bytes
  description: "098-198 success: 23h B1h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"

- id: edge_blending_set_response
  type: bytes
  description: "098-243-1 success: 23h B1h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"

- id: base_model_type_response
  type: bytes
  description: "305-1 success: 20h BFh <ID1> <ID2> 10h 00h <DATA01>-<DATA15> <CKS>; DATA01-02 + DATA12-13 base model type, DATA03-11 NUL-terminated model name"

- id: serial_number_response
  type: string
  description: "305-2 success: 20h BFh <ID1> <ID2> 12h 01h 06h <DATA01>-<DATA16> <CKS>; NUL-terminated serial number"

- id: basic_information_response
  type: bytes
  description: "305-3 success: 20h BFh <ID1> <ID2> 10h 02h <DATA01>-<DATA15> <CKS>; operation status, content displayed, signal types, mute/freeze state"

- id: audio_select_set_response
  type: enum
  values: [success, error]
  description: "319-10 success: 23h C9h <ID1> <ID2> 03h 09h <DATA01> <DATA02> <CKS>; DATA02: 00h success, 01h error"

- id: error_frame
  type: bytes
  description: "Common error frame: [A0h|A1h|A2h|A3h] [opcode] <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>. ERR1/ERR2 per source §2.4 (e.g. 00h/00h unrecognized, 02h/0Dh power off, 02h/0Fh no authority, 02h/0Eh exec failed)"
```

## Variables
```yaml
# Settable parameters already represented as parameterized Actions (PICTURE ADJUST targets,
# VOLUME ADJUST, ASPECT, ECO MODE, EDGE BLENDING, LENS PROFILE, LENS MEMORY OPTION, PIP/PbP).
# No additional standalone variable set is documented outside those action payloads.
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are replies to commands.
```

## Macros
```yaml
# Source documents no explicit multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes operational constraints but no explicit safety interlocks:
#   - POWER ON: "While this command is turning on the power, no other command can be accepted."
#   - POWER OFF: "While this command is turning off the power (including the cooling time), no other command can be accepted."
#   - LENS CONTROL: continuous drive (7Fh/81h) must be stopped by sending 00h.
# No power-on sequencing, voltage/current specs, or interlock procedures are stated in the source.
```

## Notes
- **Frame format** (source §2.1/§2.2): request = `[type] [opcode] [ID1] [ID2] [LEN] [DATA...] [CKS]`. Type byte 00h–03h varies by command class (00h info req, 01h freeze, 02h action, 03h set/adjust). Response type byte mirrors with bit 5 set (20h–23h) on success, bit 5 + bit 7 set (A0h–A3h) on error.
- **Checksum**: low-order byte of the sum of all preceding bytes (source §2.2 worked example).
- **ID1** = control ID set on projector; **ID2** = model code (varies by model — UNRESOLVED for ME551 specifically).
- **Baud rate** is selectable among 4800/9600/19200/38400/115200 bps; default value not stated in source.
- **Appendix "Supplementary Information by Command"** (referenced for input terminal values, aspect values, eco mode values, sub-input values, base model types) is not present in this refined excerpt — those enum tables are UNRESOLVED.
- Lamp/filter usage times are returned in seconds and updated at one-minute intervals.

<!-- UNRESOLVED: ME551-specific model code (ID2) not stated. -->
<!-- UNRESOLVED: Default baud rate not stated (selectable list only). -->
<!-- UNRESOLVED: Flow control mode not stated (RTS/CTS pins present but no mode declared). -->
<!-- UNRESOLVED: Appendix enum tables (input terminals, aspect, eco mode, sub-input, base model types) not in refined source excerpt. -->
<!-- UNRESOLVED: Voltage / current / power specs not in source. -->
<!-- UNRESOLVED: Firmware version compatibility not stated. -->
<!-- UNRESOLVED: Wireless LAN unit model compatibility not specified in this document. -->
````

Spec above. 53 actions, all from §2 command list, payloads verbatim. Serial+TCP both documented — user's "RS-232C" hint incomplete, followed source instead.

Next steps if want ingest:
```bash
# Append to drafts.jsonl then ingest
```

Want me write file to disk or wrap into JSONL row?

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:49:58.952Z
last_checked_at: 2026-06-18T08:29:55.300Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:29:55.300Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic family command reference; it does not state ME551-specific firmware, model code (ID2), voltage/power specs, or which optional commands this exact model implements."
- "source shows RTS/CTS pins wired (pin 7 RTS, pin 8 CTS) but does not state a flow-control mode"
- "ME551-specific model code (ID2) not stated."
- "Default baud rate not stated (selectable list only)."
- "Flow control mode not stated (RTS/CTS pins present but no mode declared)."
- "Appendix enum tables (input terminals, aspect, eco mode, sub-input, base model types) not in refined source excerpt."
- "Voltage / current / power specs not in source."
- "Firmware version compatibility not stated."
- "Wireless LAN unit model compatibility not specified in this document."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
