---
spec_id: admin/sharp-nec-ld-fa192
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld Fa192 Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld Fa192"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld Fa192"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:55:50.983Z
last_checked_at: 2026-06-23T07:49:53.359Z
generated_at: 2026-06-23T07:49:53.359Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "input terminal value table referenced via \"Appendix\" not present in refined source"
  - "eco mode value table referenced via \"Appendix\" not present in refined source"
  - "flow control not stated; full-duplex mode stated"
  - "full value table not in refined source.\""
  - "value table not in refined source.\""
  - "source does not describe any push/event mechanism."
  - "none documented."
  - "no explicit power-on sequencing or safety interlock procedure stated beyond command-acceptance windows."
  - "input terminal / aspect / eco mode / sub-input value tables not in refined source"
  - "firmware version compatibility not stated"
  - "flow control setting not stated"
  - "ID2 model code value for Ld Fa192 not stated"
verification:
  verdict: verified
  checked_at: 2026-06-23T07:49:53.359Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec commands match source hex sequences exactly; transport verified. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld Fa192 Control Spec

## Summary
Sharp/NEC Ld Fa192 is a projector controllable via RS-232C serial or wired/wireless LAN (TCP). This spec covers the binary hex command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input switching, mute, lens, picture/volume adjust, and status query commands. Commands are framed hex byte sequences with a trailing checksum byte.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: input terminal value table referenced via "Appendix" not present in refined source -->
<!-- UNRESOLVED: eco mode value table referenced via "Appendix" not present in refined source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists selectable rates
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; full-duplex mode stated
addressing:
  port: 7142  # TCP port for LAN command send/receive
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred from POWER ON / POWER OFF commands
  - routable    # inferred from INPUT SW CHANGE command
  - queryable   # inferred from numerous REQUEST commands
  - levelable   # inferred from VOLUME ADJUST / PICTURE ADJUST commands
```

## Actions
```yaml
actions:
  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning on, no other command accepted."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "While turning off (incl. cooling time), no other command accepted."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal byte (e.g. 06h = video). See Appendix - UNRESOLVED: full value table not in refined source."
      - name: cks
        type: integer
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."
    response_ok: "22h 03h <ID1> <ID2> 01h <DATA01> <CKS>  (DATA01=FFh => error, no switch)"
    response_err: "A2h 03h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input/video signal switch."

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
    notes: "Cleared by input/video switch or volume adjustment."

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
    notes: "Cleared by input/video signal switch."

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: data02
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)"
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data02
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data03
        type: integer
        description: "Adjustment value (high-order 8 bits)"
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Aspect value. See Appendix - UNRESOLVED: value table not in refined source."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: integer
        description: "Target: 96h = LAMP ADJUST / LIGHT ADJUST"
      - name: data02
        type: integer
        description: "Sub-target FFh (per source row)"
      - name: data03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data05
        type: integer
        description: "Adjustment value (high-order 8 bits)"
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Key code low byte (WORD type). E.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: data02
        type: integer
        description: "Key code high byte (always 00h per source table)"
      - name: cks
        type: integer
        description: "Checksum byte."

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

  - id: lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment target: 06h=Periphery Focus"
      - name: data02
        type: integer
        description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus, 81h=minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "After 7Fh/81h, send 00h to stop driving."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: integer
        description: "Target FFh=Stop (then data02-04 not referenced)"
      - name: data02
        type: integer
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)"
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "Controls profile number specified by 053-10 LENS PROFILE SET."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "01h=freeze ON, 02h=freeze OFF"
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Eco mode value. See Appendix - UNRESOLVED: value table not in refined source."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01}-{data16} 00h {cks}"
    params:
      - name: data01_to_data16
        type: string
        description: "Projector name (up to 16 bytes, NUL terminated)"
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: integer
        description: "MODE: 00h=PIP,01h=PbP. START POS: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT. SUB INPUT: see Appendix (UNRESOLVED)."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=OFF, 01h=ON"
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal. See Appendix - UNRESOLVED: value table not in refined source."
      - name: data02
        type: integer
        description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
      - name: cks
        type: integer
        description: "Checksum byte."
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Response DATA01-12 bitfields: bit=0 normal, bit=1 error."

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "DATA01-49 projector name; DATA83-86 lamp usage time (sec); DATA87-90 filter usage time (sec)."

  - id: filter_usage_info_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "DATA01-04 filter usage time (sec); DATA05-08 filter alarm start time (sec)."

  - id: lamp_information_request
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=Lamp 1, 01h=Lamp 2"
      - name: data02
        type: integer
        description: "01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: carbon_savings_info_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment target (06h=Periphery Focus)"
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []

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

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: integer
        description: "03h=horizontal synchronous frequency, 04h=vertical synchronous frequency"
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_request
    label: "097-155. LAN MAC ADDRESS REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_pbp_request
    label: "097-198. PIP REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: edge_blending_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: "009. ERROR STATUS REQUEST"
    type: query
    command: "00h 88h 00h 00h 00h 88h"
    response: "20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>"
    notes: "DATA01-12 bitfields: bit=0 normal, bit=1 error. Covers cover/fan/temp/power/lamp/formatter/FPGA/interlock errors."

  - id: information_request
    label: "037. INFORMATION REQUEST"
    type: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    response: "23h 8Ah <ID1> <ID2> 62h <DATA01>-<DATA98> <CKS>"
    notes: "DATA01-49 projector name; DATA83-86 lamp usage time (sec); DATA87-90 filter usage time (sec)."

  - id: filter_usage_info
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    type: query
    command: "03h 95h 00h 00h 00h 98h"
    response: "23h 95h <ID1> <ID2> 08h <DATA01>-<DATA08> <CKS>"
    notes: "DATA01-04 filter usage time (sec); DATA05-08 filter alarm start time (sec, -1 if undefined)."

  - id: lamp_information
    label: "037-4. LAMP INFORMATION REQUEST 3"
    type: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: data02
        type: integer
        description: "01h=usage time (sec), 04h=remaining life (%)"
      - name: cks
        type: integer
    response: "23h 96h <ID1> <ID2> 06h <DATA01>-<DATA06> <CKS>"

  - id: carbon_savings_info
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    type: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
      - name: cks
        type: integer
    response: "23h 9Ah <ID1> <ID2> 09h <DATA01>-<DATA09> <CKS> (DATA02-05 kg, DATA06-09 mg)"

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    type: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment target (06h=Periphery Focus)"
      - name: cks
        type: integer
    response: "22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02>-<DATA07> <CKS> (upper/lower/current limits)"

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    type: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: cks
        type: integer
    response: "22h 20h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS> (DATA02: 00h=OFF, 01h=ON)"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    type: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    response: "22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>"
    notes: "DATA01 bitfield: Bit0=lens memory, Bit1=zoom, Bit2=focus, Bit3=lens shift H, Bit4=lens shift V (0=stop, 1=operating)."

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    type: query
    command: "02h 28h 00h 00h 00h 2Ah"
    response: "22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS> (DATA01: 00h=Profile 1, 01h=Profile 2)"

  - id: gain_parameter_request
    label: "060-1. GAIN PARAMETER REQUEST 3"
    type: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
      - name: cks
        type: integer
    response: "23h 05h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS> (limits/default/current/widths)"

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    type: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    response: "20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS> (base model type, sound function, profile)"

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    type: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
    notes: "DATA03 power status; DATA04 cooling; DATA05 power process; DATA06 operation status."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    type: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS> (signal switch, list number, signal type)"

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    type: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS> (picture/sound/onscreen mute + OSD)"

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    type: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    response: "20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS> (model name string)"

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    type: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    response: "20h 85h <ID1> <ID2> 01h <DATA01> <CKS> (00h=opened, 01h=closed)"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    type: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: integer
        description: "03h=horizontal sync freq, 04h=vertical sync freq"
      - name: cks
        type: integer
    response: "20h D0h <ID1> <ID2> LEN <DATA01> 01h <DATA02>-<DATA??> <CKS>"

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    type: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    response: "23h B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>"

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    type: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    response: "23h B0h <ID1> <ID2> 12h 2Ch <DATA01>-<DATA17> <CKS>"

  - id: lan_mac_address_request
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    type: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    response: "23h B0h <ID1> <ID2> 08h 9Ah 00h <DATA01>-<DATA06> <CKS>"

  - id: pip_pbp_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    type: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: cks
        type: integer
    response: "23h B0h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"

  - id: edge_blending_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    type: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    response: "23h B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS> (00h=OFF, 01h=ON)"

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    type: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    response: "20h BFh <ID1> <ID2> 10h 00h <DATA01>-<DATA15> <CKS>"

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    type: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    response: "20h BFh <ID1> <ID2> 12h 01h 06h <DATA01>-<DATA16> <CKS>"

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    type: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    response: "20h BFh <ID1> <ID2> 10h 02h <DATA01>-<DATA15> <CKS> (operation status, content, signal type, mute states)"
```

## Variables
```yaml
variables:
  - name: brightness
    description: "Picture brightness (set via 030-1 PICTURE ADJUST, query via 060-1)"
  - name: contrast
    description: "Picture contrast (set via 030-1, query via 060-1)"
  - name: color
    description: "Picture color (set via 030-1, query via 060-1)"
  - name: hue
    description: "Picture hue (set via 030-1, query via 060-1)"
  - name: sharpness
    description: "Picture sharpness (set via 030-1, query via 060-1)"
  - name: volume
    description: "Sound volume (set via 030-2 VOLUME ADJUST, query via 060-1)"
  - name: lamp_adjust
    description: "Lamp/light adjust (set via 030-15, query via 060-1)"
  - name: projector_name
    description: "LAN projector name, up to 16 bytes (set via 098-45, query via 097-45)"
  - name: eco_mode
    description: "Eco/Light/Lamp mode (set via 098-8, query via 097-8)"
```

## Events
```yaml
# No unsolicited notifications documented in source.
# UNRESOLVED: source does not describe any push/event mechanism.
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
# UNRESOLVED: none documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: while turning on, no other command accepted."
  - "POWER OFF: while turning off (incl. cooling time), no other command accepted."
  - "PICTURE/SOUND/ONSCREEN mute ON cleared automatically by input/video switch (and volume adjust for sound mute)."
# UNRESOLVED: no explicit power-on sequencing or safety interlock procedure stated beyond command-acceptance windows.
```

## Notes
- Manual revision: BDT140013 Rev 7.1.
- Commands/responses are framed hex byte sequences. Frame markers: leading byte (00h–03h for commands, 20h/21h/22h/23h for ACK responses, A0h/A1h/A2h/A3h for error responses). `<ID1>` = control ID set on projector; `<ID2>` = model code (varies by model).
- Checksum (`<CKS>`): sum all preceding bytes, take low-order 8 bits. Example from source: `20h+81h+01h+60h+01h+00h = 103h` → checksum `03h`.
- Error responses carry `<ERR1>` and `<ERR2>` codes per section 2.4 (e.g. `00h/00h` = unrecognized command, `02h/0Dh` = power off, `00h/01h` = command not supported by model).
- Lamp usage / filter usage times update at one-minute intervals despite one-second resolution.
- Signal list number returned is (practical value − 1).
- Several commands reference an "Appendix: Supplementary Information by Command" for input terminal, aspect, eco mode, and sub-input value tables — that appendix is not present in the refined source.
<!-- UNRESOLVED: input terminal / aspect / eco mode / sub-input value tables not in refined source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: flow control setting not stated -->
<!-- UNRESOLVED: ID2 model code value for Ld Fa192 not stated -->
````

53 commands covered (22 actions + 25 feedbacks/queries + 6 dual). Binary payloads verbatim. Serial+TCP both documented. Appendix value tables marked unresolved.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:55:50.983Z
last_checked_at: 2026-06-23T07:49:53.359Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T07:49:53.359Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec commands match source hex sequences exactly; transport verified. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "input terminal value table referenced via \"Appendix\" not present in refined source"
- "eco mode value table referenced via \"Appendix\" not present in refined source"
- "flow control not stated; full-duplex mode stated"
- "full value table not in refined source.\""
- "value table not in refined source.\""
- "source does not describe any push/event mechanism."
- "none documented."
- "no explicit power-on sequencing or safety interlock procedure stated beyond command-acceptance windows."
- "input terminal / aspect / eco mode / sub-input value tables not in refined source"
- "firmware version compatibility not stated"
- "flow control setting not stated"
- "ID2 model code value for Ld Fa192 not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
