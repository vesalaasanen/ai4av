---
spec_id: admin/sharp-nec-p435
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC P435 Control Spec"
manufacturer: Sharp/NEC
model_family: P435
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - P435
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:27:37.958Z
last_checked_at: 2026-06-18T08:59:05.383Z
generated_at: 2026-06-18T08:59:05.383Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "voltage/power specs not in source. Model code (ID2) value not given — varies by model. Appendix \"Supplementary Information by Command\" (input terminal values, base model type values, eco mode values, signal type values) not included in this refined excerpt — many enum tables referenced but not expanded."
  - "flow_control not explicitly stated; RTS/CTS pins wired per pinout table"
  - "appendix not in source excerpt). Example 06h = Video.\""
  - "appendix not in source excerpt)\""
  - "target codes not enumerated in this section)\""
  - "no push/event mechanism described in source."
  - "populate if discovered in expanded manual appendix."
  - "no voltage/current/power specs in source. No external interlock wiring procedure documented in this excerpt."
  - "specific value for P435 not stated in excerpt."
  - "firmware version compatibility not stated in source."
  - "P435-specific model code (ID2) value not in excerpt."
  - "Appendix enum tables (input terminals, base model types, eco mode, aspect, signal types, sub-input values) not included in refined excerpt."
  - "serial flow_control not explicitly stated (RTS/CTS pins wired in cable pinout but protocol behavior undocumented)."
  - "no voltage/current/power specifications in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:59:05.383Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC P435 Control Spec

## Summary
Sharp/NEC P435 projector control spec. Binary command protocol over RS-232C serial (D-SUB 9P PC CONTROL port) and TCP/IP LAN (port 7142). Frames are hex byte sequences terminated by a checksum byte (low-order byte of sum of all preceding bytes). Manual revision: BDT140013 Rev 7.1.

<!-- UNRESOLVED: voltage/power specs not in source. Model code (ID2) value not given — varies by model. Appendix "Supplementary Information by Command" (input terminal values, base model type values, eco mode values, signal type values) not included in this refined excerpt — many enum tables referenced but not expanded. -->

## Transport
```yaml
# Source documents both RS-232C serial AND TCP LAN. Both blocks emitted.
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source: "115200/38400/19200/9600/4800 bps" - multiple selectable; highest shown
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow_control not explicitly stated; RTS/CTS pins wired per pinout table
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: 015 POWER ON / 016 POWER OFF present
  - queryable     # inferred: many status/information request commands present
  - levelable     # inferred: 030-2 VOLUME ADJUST, 030-1 PICTURE ADJUST present
  - routable      # inferred: 018 INPUT SW CHANGE present
```

## Actions
```yaml
# All 52 command rows from Section 2 enumerated. Each named opcode = one action.
# Binary frames verbatim from source. {placeholders} mark variable DATA bytes.
# CKS = checksum = low byte of sum of all preceding bytes (computed at send time).
# ID1 = control ID set on projector; ID2 = model code (varies by model - UNRESOLVED value).

- id: error_status_request
  label: 009. ERROR STATUS REQUEST
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  response: "20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>"

- id: power_on
  label: 015. POWER ON
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted during power-on transition."
  response_ok: "22h 00h <ID1> <ID2> 00h <CKS>"

- id: power_off
  label: 016. POWER OFF
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."
  response_ok: "22h 01h <ID1> <ID2> 00h <CKS>"

- id: input_sw_change
  label: 018. INPUT SW CHANGE
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (see Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source excerpt). Example 06h = Video."
  response_ok: "22h 03h <ID1> <ID2> 01h <DATA01> <CKS>"

- id: picture_mute_on
  label: 020. PICTURE MUTE ON
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Auto-off on input/video switch."

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
  notes: "Auto-off on input/video switch or volume adjust."

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
  notes: "Auto-off on input/video switch."

- id: onscreen_mute_off
  label: 025. ONSCREEN MUTE OFF
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: 030-1. PICTURE ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02>-<DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA03_DATA04
      type: integer
      description: "Adjustment value (16-bit, low byte DATA03 high byte DATA04)"
  response_ok: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: volume_adjust
  label: 030-2. VOLUME ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01>-<DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA02_DATA03
      type: integer
      description: "Adjustment value (16-bit)"

- id: aspect_adjust
  label: 030-12. ASPECT ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value (see Appendix - UNRESOLVED: appendix not in source excerpt)"

- id: other_adjust
  label: 030-15. OTHER ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01>-<DATA05> <CKS>"
  params:
    - name: DATA01_DATA02
      type: integer
      description: "Adjustment target. Documented: 96h FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA04_DATA05
      type: integer
      description: "Adjustment value (16-bit)"

- id: information_request
  label: 037. INFORMATION REQUEST
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  response: "23h 8Ah <ID1> <ID2> 62h <DATA01>-<DATA98> <CKS>"

- id: filter_usage_information_request
  label: 037-3. FILTER USAGE INFORMATION REQUEST
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  response: "23h 95h <ID1> <ID2> 08h <DATA01>-<DATA08> <CKS>"

- id: lamp_information_request_3
  label: 037-4. LAMP INFORMATION REQUEST 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "01h usage time (s), 04h remaining life (%)"
  response: "23h 96h <ID1> <ID2> 06h <DATA01>-<DATA06> <CKS>"

- id: carbon_savings_information_request
  label: 037-6. CARBON SAVINGS INFORMATION REQUEST
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation"
  response: "23h 9Ah <ID1> <ID2> 09h <DATA01>-<DATA09> <CKS>"

- id: remote_key_code
  label: 050. REMOTE KEY CODE
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01_DATA02
      type: integer
      description: "WORD key code. Documented list: 02h00h POWER ON, 03h00h POWER OFF, 05h00h AUTO, 06h00h MENU, 07h00h UP, 08h00h DOWN, 09h00h RIGHT, 0Ah00h LEFT, 0Bh00h ENTER, 0Ch00h EXIT, 0Dh00h HELP, 0Fh00h MAGNIFY UP, 10h00h MAGNIFY DOWN, 13h00h MUTE, 29h00h PICTURE, 4Bh00h COMPUTER1, 4Ch00h COMPUTER2, 4Fh00h VIDEO1, 51h00h S-VIDEO1, 84h00h VOLUME UP, 85h00h VOLUME DOWN, 8Ah00h FREEZE, A3h00h ASPECT, D7h00h SOURCE, EEh00h LAMP MODE/ECO"
  response_ok: "22h 0Fh <ID1> <ID2> 01h <DATA01> <CKS>"

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
      description: "Target: 06h Periphery Focus"
    - name: DATA02
      type: integer
      description: "00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +continuous, 81h -continuous, FDh -0.25s, FEh -0.5s, FFh -1s"
  response_ok: "22h 18h <ID1> <ID2> 01h <DATA01> <CKS>"

- id: lens_control_request
  label: 053-1. LENS CONTROL REQUEST
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens position target (UNRESOLVED: target codes not enumerated in this section)"
  response: "22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02>-<DATA07> <CKS>"

- id: lens_control_2
  label: 053-2. LENS CONTROL 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01>-<DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "FFh Stop (when stop, DATA02-04 not referenced)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 02h relative"
    - name: DATA03_DATA04
      type: integer
      description: "Adjustment value (16-bit)"

- id: lens_memory_control
  label: 053-3. LENS MEMORY CONTROL
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control
  label: 053-4. REFERENCE LENS MEMORY CONTROL
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET"
  notes: "Operates on profile selected by 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: 053-5. LENS MEMORY OPTION REQUEST
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
  response: "22h 20h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: lens_memory_option_set
  label: 053-6. LENS MEMORY OPTION SET
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: DATA02
      type: integer
      description: "00h OFF, 01h ON"

- id: lens_information_request
  label: 053-7. LENS INFORMATION REQUEST
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  response: "22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>"

- id: lens_profile_set
  label: 053-10. LENS PROFILE SET
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h Profile 1, 01h Profile 2"

- id: lens_profile_request
  label: 053-11. LENS PROFILE REQUEST
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  response: "22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: gain_parameter_request_3
  label: 060-1. GAIN PARAMETER REQUEST 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h PICTURE/BRIGHTNESS, 01h PICTURE/CONTRAST, 02h PICTURE/COLOR, 03h PICTURE/HUE, 04h PICTURE/SHARPNESS, 05h VOLUME, 96h LAMP ADJUST/LIGHT ADJUST"
  response: "23h 05h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"

- id: setting_request
  label: 078-1. SETTING REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  response: "20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>"

- id: running_status_request
  label: 078-2. RUNNING STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"

- id: input_status_request
  label: 078-3. INPUT STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"

- id: mute_status_request
  label: 078-4. MUTE STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"

- id: model_name_request
  label: 078-5. MODEL NAME REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  response: "20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>"

- id: cover_status_request
  label: 078-6. COVER STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  response: "20h 85h <ID1> <ID2> 01h <DATA01> <CKS>"

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
      description: "03h Horizontal sync frequency, 04h Vertical sync frequency"
  response: "20h D0h <ID1> <ID2> LEN <DATA01> 01h <DATA02>-<DATA??> <CKS>"

- id: eco_mode_request
  label: 097-8. ECO MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  response: "23h B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>"

- id: lan_projector_name_request
  label: 097-45. LAN PROJECTOR NAME REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  response: "23h B0h <ID1> <ID2> 12h 2Ch <DATA01>-<DATA17> <CKS>"

- id: lan_mac_address_status_request2
  label: 097-155. LAN MAC ADDRESS STATUS REQUEST2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  response: "23h B0h <ID1> <ID2> 08h 9Ah 00h <DATA01>-<DATA06> <CKS>"

- id: pip_picture_by_picture_request
  label: 097-198. PIP/PICTURE BY PICTURE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
  response: "23h B0h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"

- id: edge_blending_mode_request
  label: 097-243-1. EDGE BLENDING MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  response: "23h B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"

- id: eco_mode_set
  label: 098-8. ECO MODE SET
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value (see Appendix - UNRESOLVED: appendix not in source excerpt)"

- id: lan_projector_name_set
  label: 098-45. LAN PROJECTOR NAME SET
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
  params:
    - name: DATA01_DATA16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

- id: pip_picture_by_picture_set
  label: 098-198. PIP/PICTURE BY PICTURE SET
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "For MODE: 00h PIP, 01h PICTURE BY PICTURE. For START POSITION: 00h TOP-LEFT, 01h TOP-RIGHT, 02h BOTTOM-LEFT, 03h BOTTOM-RIGHT. For SUB INPUT: sub input value (see Appendix - UNRESOLVED)"

- id: edge_blending_mode_set
  label: 098-243-1. EDGE BLENDING MODE SET
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h OFF, 01h ON"

- id: base_model_type_request
  label: 305-1. BASE MODEL TYPE REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  response: "20h BFh <ID1> <ID2> 10h 00h <DATA01>-<DATA15> <CKS>"

- id: serial_number_request
  label: 305-2. SERIAL NUMBER REQUEST
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  response: "20h BFh <ID1> <ID2> 12h 01h 06h <DATA01>-<DATA16> <CKS>"

- id: basic_information_request
  label: 305-3. BASIC INFORMATION REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  response: "20h BFh <ID1> <ID2> 10h 02h <DATA01>-<DATA15> <CKS>"

- id: audio_select_set
  label: 319-10. AUDIO SELECT SET
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (see Appendix - UNRESOLVED: appendix not in source excerpt)"
    - name: DATA02
      type: integer
      description: "00h terminal in DATA01, 01h BNC, 02h COMPUTER"
  response_ok: "23h C9h <ID1> <ID2> 03h 09h <DATA01> <DATA02> <CKS>"
```

## Feedbacks
```yaml
# One entry per observable state returned by query responses.

- id: power_status
  type: enum
  values: [standby, power_on]
  source: "078-2 RUNNING STATUS REQUEST DATA03 (00h Standby, 01h Power On)"

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  source: "078-2 DATA04"

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 DATA06"

- id: picture_mute
  type: enum
  values: [off, on]
  source: "078-4 MUTE STATUS REQUEST DATA01"

- id: sound_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA02"

- id: onscreen_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA03"

- id: freeze_status
  type: enum
  values: [off, on]
  source: "305-3 BASIC INFORMATION REQUEST DATA09"

- id: cover_status
  type: enum
  values: [normal_open, closed]
  source: "078-6 COVER STATUS REQUEST DATA01"

- id: lens_operation_status
  type: bitmask
  description: "Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V); 0=Stop, 1=During operation"
  source: "053-7 LENS INFORMATION REQUEST DATA01"

- id: error_status
  type: bitmask
  description: "12-byte error bitfield (DATA01-12) covering cover/fan/temp/power/lamp/formatter/FPGA/mirror-cover/interlock/ballast/iris/lens errors"
  source: "009. ERROR STATUS REQUEST"

- id: execution_result_code
  type: enum
  values: [success, error]
  description: "ERR1/ERR2 error code pair per Section 2.4"
  source: "All command failure responses (A0h/A1h/A2h/A3h prefix frames)"
```

## Variables
```yaml
- id: volume
  type: integer
  unit: level
  description: "Sound volume level"
  source: "030-2 VOLUME ADJUST"

- id: brightness
  type: integer
  description: "Picture brightness"
  source: "030-1 PICTURE ADJUST DATA01=00h"

- id: contrast
  type: integer
  source: "030-1 PICTURE ADJUST DATA01=01h"

- id: color
  type: integer
  source: "030-1 PICTURE ADJUST DATA01=02h"

- id: hue
  type: integer
  source: "030-1 PICTURE ADJUST DATA01=03h"

- id: sharpness
  type: integer
  source: "030-1 PICTURE ADJUST DATA01=04h"

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: "037-4 LAMP INFORMATION REQUEST 3, DATA02=01h"

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: "037-4 LAMP INFORMATION REQUEST 3, DATA02=04h. Negative if replacement deadline exceeded."

- id: filter_usage_time
  type: integer
  unit: seconds
  source: "037-3 FILTER USAGE INFORMATION REQUEST"

- id: projector_name
  type: string
  max_length: 16
  source: "098-45 LAN PROJECTOR NAME SET / 097-45 REQUEST"

- id: eco_mode
  type: integer
  source: "098-8 ECO MODE SET / 097-8 REQUEST (enum values in Appendix - UNRESOLVED)"
```

## Events
```yaml
# No unsolicited notifications documented. Device only responds to commands.
# UNRESOLVED: no push/event mechanism described in source.
```

## Macros
```yaml
# No multi-step sequences explicitly documented in source.
# UNRESOLVED: populate if discovered in expanded manual appendix.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Power-on transition: no other command accepted while 015 POWER ON executes."
    source: "Section 3.2"
  - description: "Power-off transition incl. cooling time: no other command accepted while 016 POWER OFF executes."
    source: "Section 3.3"
  - description: "Interlock switch open flagged in 009 ERROR STATUS REQUEST DATA09 Bit1."
    source: "Section 3.1, Error information list"
  - description: "Mirror cover / lens cover error flagged in 009 DATA03 Bit5 (mirror cover error)."
    source: "Section 3.1"
  - description: "Lens not installed properly flagged in 009 DATA04 Bit7."
    source: "Section 3.1"
  - description: "Temperature error (bi-metallic strip) flagged in 009 DATA01 Bit1; temperature sensor error in DATA03 Bit2; dust temp error in DATA04 Bit2."
    source: "Section 3.1"
  - description: "Fan error flagged in 009 DATA01 Bit0 and Bit3."
    source: "Section 3.1"
# UNRESOLVED: no voltage/current/power specs in source. No external interlock wiring procedure documented in this excerpt.
```

## Notes
- **Frame format:** All commands/responses are hex byte sequences. Standard structure: `<prefix> <command> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Prefixes: `0xh`=command types 0xx, `2xh`=success response, `3xh`=N/A, `Axh`=error response (matches command nibble).
- **Checksum (CKS):** Low-order byte of sum of all preceding bytes. Example from source: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`.
- **Control ID (ID1):** Value of "control ID" set on projector.
- **Model code (ID2):** Varies by model. UNRESOLVED: specific value for P435 not stated in excerpt.
- **Baud rate:** Five selectable rates (115200/38400/19200/9600/4800). 115200 shown as default in `serial.baud_rate`; integrator must match projector setting.
- **Cooling lockout:** During power-off + cooling, all commands rejected. Integrator should poll `078-2 RUNNING STATUS REQUEST` before issuing next command.
- **Usage time granularity:** Lamp/filter usage returned in seconds but updated only at 1-minute intervals.
- **Auto-unmute side effects:** Picture mute auto-clears on input/video switch. Sound mute auto-clears on input/video switch or volume adjust. Onscreen mute auto-clears on input/video switch.
- **Lens control:** Continuous-drive (`7Fh`/`81h`) requires explicit `00h` Stop command afterwards.
- **Error code table (Section 2.4):** 21 ERR1/ERR2 combinations documented, covering unrecognized command, unsupported feature, invalid value, memory errors, forced mute, no signal, power-off rejection, etc.
- **Appendix "Supplementary Information by Command"** referenced repeatedly (input terminal values, base model types, eco mode values, aspect values, signal type values, sub-input values) but NOT included in this refined excerpt — multiple enum tables UNRESOLVED.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: P435-specific model code (ID2) value not in excerpt. -->
<!-- UNRESOLVED: Appendix enum tables (input terminals, base model types, eco mode, aspect, signal types, sub-input values) not included in refined excerpt. -->
<!-- UNRESOLVED: serial flow_control not explicitly stated (RTS/CTS pins wired in cable pinout but protocol behavior undocumented). -->
<!-- UNRESOLVED: no voltage/current/power specifications in source. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:27:37.958Z
last_checked_at: 2026-06-18T08:59:05.383Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:59:05.383Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "voltage/power specs not in source. Model code (ID2) value not given — varies by model. Appendix \"Supplementary Information by Command\" (input terminal values, base model type values, eco mode values, signal type values) not included in this refined excerpt — many enum tables referenced but not expanded."
- "flow_control not explicitly stated; RTS/CTS pins wired per pinout table"
- "appendix not in source excerpt). Example 06h = Video.\""
- "appendix not in source excerpt)\""
- "target codes not enumerated in this section)\""
- "no push/event mechanism described in source."
- "populate if discovered in expanded manual appendix."
- "no voltage/current/power specs in source. No external interlock wiring procedure documented in this excerpt."
- "specific value for P435 not stated in excerpt."
- "firmware version compatibility not stated in source."
- "P435-specific model code (ID2) value not in excerpt."
- "Appendix enum tables (input terminals, base model types, eco mode, aspect, signal types, sub-input values) not included in refined excerpt."
- "serial flow_control not explicitly stated (RTS/CTS pins wired in cable pinout but protocol behavior undocumented)."
- "no voltage/current/power specifications in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
