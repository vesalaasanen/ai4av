---
spec_id: admin/sharp-nec-np-mc453x
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP MC453X Control Spec"
manufacturer: Sharp/NEC
model_family: "NP MC453X"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP MC453X"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:31:20.159Z
last_checked_at: 2026-06-18T08:37:16.145Z
generated_at: 2026-06-18T08:37:16.145Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input-terminal value table lives in an \"Appendix / Supplementary Information by Command\" not present in the refined source; input-terminal enums for 018, 098-198, 319-10 are not enumerable here. Same appendix holds aspect, eco-mode, and base-model-type value tables."
  - "not in source.\""
  - "enum not in source.\""
  - "value enum in Appendix, not in source"
  - "input-terminal value table in Appendix, not in source"
  - "source describes no unsolicited notifications; all responses are"
  - "source documents no multi-step command sequences."
  - "source does not specify a required power-on sequencing procedure beyond the 015 command"
  - "enums for input terminal, aspect, eco-mode, and base-model-type values live in the document's \"Appendix / Supplementary Information by Command\" which is not part of the refined source text supplied here. These four enums must be filled from the appendix before the spec can be promoted above draft."
  - "default baud rate not stated (5 selectable rates listed); firmware version compatibility not stated; wireless-LAN command path not documented (defers to wireless unit manual)."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:37:16.145Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP MC453X Control Spec

## Summary
Sharp/NEC NP MC453X LCD projector controlled via binary hex command frames over RS-232C serial or TCP/IP LAN (port 7142). Each command is a fixed-format byte sequence terminated by a modulo-256 checksum byte. Spec covers the full BDT140013 Rev 7.1 command catalogue: power, input switching, mutes, picture/volume/aspect adjust, lens control and memory, status queries, eco/PIP/edge-blend set, and information requests.

<!-- UNRESOLVED: input-terminal value table lives in an "Appendix / Supplementary Information by Command" not present in the refined source; input-terminal enums for 018, 098-198, 319-10 are not enumerable here. Same appendix holds aspect, eco-mode, and base-model-type value tables. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 as selectable; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states full duplex; hardware flow line not specified
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from 015 POWER ON / 016 POWER OFF
  - routable        # inferred from 018 INPUT SW CHANGE
  - queryable       # inferred from large query command set (009, 037, 078, 097, 305, etc.)
  - levelable       # inferred from 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST / 030-15 OTHER ADJUST
```

## Actions
```yaml
# All command bytes verbatim from source. <ID1>=control ID, <ID2>=model code,
# <CKS>=modulo-256 checksum of preceding bytes (low byte of sum). Framing bytes
# 20h/22h/23h/A0h/A2h/A3h are response/request markers documented §2.1-2.3.

- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on in progress."

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off including cooling time."

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal byte (e.g. 06h = video). Full value table in Appendix 'Supplementary Information by Command' - UNRESOLVED: not in source."
    - name: cks
      type: string
      description: "Checksum byte = low byte of sum of all preceding bytes."

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

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
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: data03
      type: string
      description: "Adjustment value (low-order 8 bits)."
    - name: data04
      type: string
      description: "Adjustment value (high-order 8 bits)."
    - name: cks
      type: string
      description: "Checksum byte."

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: data02
      type: string
      description: "Adjustment value (low-order 8 bits)."
    - name: data03
      type: string
      description: "Adjustment value (high-order 8 bits)."
    - name: cks
      type: string
      description: "Checksum byte."

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Aspect value byte. Value table in Appendix 'Supplementary Information by Command' - UNRESOLVED: not in source."
    - name: cks
      type: string
      description: "Checksum byte."

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target high byte (96h for LAMP ADJUST / LIGHT ADJUST)."
    - name: data02
      type: string
      description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)."
    - name: data03
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: data04
      type: string
      description: "Adjustment value (low-order 8 bits)."
    - name: data05
      type: string
      description: "Adjustment value (high-order 8 bits)."
    - name: cks
      type: string
      description: "Checksum byte."

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns 98-byte block: name(D01-49), lamp usage seconds(D83-86), filter usage seconds(D87-90)."

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
    - name: data02
      type: string
      description: "Content: 01h=usage time (seconds), 04h=remaining life (%)."
    - name: cks
      type: string
      description: "Checksum byte."

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
    - name: cks
      type: string
      description: "Checksum byte."

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Key code low byte (see key code list, e.g. 05h=AUTO, 06h=MENU)."
    - name: data02
      type: string
      description: "Key code high byte (00h for all listed keys)."
    - name: cks
      type: string
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
      type: string
      description: "Target: 06h=Periphery Focus (source lists only this one)."
    - name: data02
      type: string
      description: "Content: 00h=Stop, 01h/02h/03h=drive plus 1s/0.5s/0.25s, 7Fh=drive plus, 81h=drive minus, FDh/FEh/FFh=drive minus 0.25s/0.5s/1s."
    - name: cks
      type: string
      description: "Checksum byte."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Target selector (same as 053 DATA01)."
    - name: cks
      type: string
      description: "Checksum byte."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Target byte; FFh=Stop (skips mode/value)."
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 02h=relative."
    - name: data03
      type: string
      description: "Adjustment value (low-order 8 bits)."
    - name: data04
      type: string
      description: "Adjustment value (high-order 8 bits)."
    - name: cks
      type: string
      description: "Checksum byte."

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET."
    - name: cks
      type: string
      description: "Checksum byte."

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET."
    - name: cks
      type: string
      description: "Checksum byte. Operates on profile selected by 053-10."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: cks
      type: string
      description: "Checksum byte."

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: data02
      type: string
      description: "Setting value: 00h=OFF, 01h=ON."
    - name: cks
      type: string
      description: "Checksum byte."

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Profile 1, 01h=Profile 2."
    - name: cks
      type: string
      description: "Checksum byte."

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
      type: string
      description: "Adjusted value name: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust."
    - name: cks
      type: string
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

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "01h=freeze on, 02h=freeze off."
    - name: cks
      type: string
      description: "Checksum byte."

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency."
    - name: cks
      type: string
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

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: cks
      type: string
      description: "Checksum byte."

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Eco-mode value byte. Value table in Appendix 'Supplementary Information by Command' - UNRESOLVED: not in source."
    - name: cks
      type: string
      description: "Checksum byte."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01_16} 00h {cks}"
  params:
    - name: data01_16
      type: string
      description: "Projector name, up to 16 bytes (NUL-terminated)."
    - name: cks
      type: string
      description: "Checksum byte."

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: data02
      type: string
      description: "Setting value (MODE: 00h=PIP,01h=PbP; POSITION: 00h-03h corners; sub-input value per Appendix - UNRESOLVED)."
    - name: cks
      type: string
      description: "Checksum byte."

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=OFF, 01h=ON."
    - name: cks
      type: string
      description: "Checksum byte."

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

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal byte. Value table in Appendix 'Supplementary Information by Command' - UNRESOLVED: not in source."
    - name: data02
      type: string
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
    - name: cks
      type: string
      description: "Checksum byte."
```

## Feedbacks
```yaml
- id: error_status
  type: bitmask
  source_query: error_status_request
  description: "12-byte error bitmap; bit set = error. DATA01 bit0=cover, bit3/4=fan, bit5=power, bit7=lamp replacement moratorium; DATA02 bit0=lamp usage exceeded, bit1=formatter; DATA03 bit1=FPGA, bit2=temp sensor, bit5=mirror cover; DATA04 bit5=ballast comms, bit7=lens not installed; DATA09 bit1=interlock switch open, bit2/bit3=system error."

- id: power_state
  type: enum
  source_query: running_status_request
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  description: "DATA03 of 078-2: 00h=Standby, 01h=Power on, FFh=unsupported. Operation status DATA06: 00h/04h/05h/06h/0Fh/10h."

- id: input_signal_status
  type: object
  source_query: input_status_request
  description: "Signal switch in progress, signal list number, selection signal type 1/2, signal list type, test pattern, content displayed."

- id: mute_status
  type: object
  source_query: mute_status_request
  description: "Picture mute, sound mute, onscreen mute, forced onscreen mute, OSD display (each 00h=off / 01h=on)."

- id: cover_status
  type: enum
  source_query: cover_status_request
  values: [normal_open, closed]
  description: "DATA01: 00h=normal (cover opened), 01h=cover closed."

- id: lamp_usage_time
  type: integer
  unit: seconds
  source_query: [information_request, lamp_information_request_3]
  description: "Updated at one-minute intervals; 32-bit seconds. DATA83-86 of 037, or DATA03-06 of 037-4 with DATA02=01h."

- id: lamp_remaining_life
  type: integer
  unit: percent
  source_query: lamp_information_request_3
  description: "DATA02=04h. Negative if replacement deadline exceeded."

- id: filter_usage_time
  type: integer
  unit: seconds
  source_query: [information_request, filter_usage_information_request]
  description: "DATA87-90 of 037, or DATA01-04 of 037-3. -1 if undefined."

- id: filter_alarm_start_time
  type: integer
  unit: seconds
  source_query: filter_usage_information_request
  description: "DATA05-08 of 037-3. -1 if undefined."

- id: carbon_savings
  type: object
  source_query: carbon_savings_information_request
  description: "DATA02-05 kg (max 99999) + DATA06-09 mg (max 999999). Type 00h=total, 01h=during operation."

- id: gain_parameter
  type: object
  source_query: gain_parameter_request_3
  description: "Per adjusted-value-name: status, upper/lower/default/current value, wide/narrow adjustment width, default-valid flag."

- id: lens_position
  type: object
  source_query: lens_control_request
  description: "Upper/lower limit and current value (16-bit each) for requested target."

- id: lens_operation_status
  type: bitmask
  source_query: lens_information_request
  description: "DATA01 bits: lens memory, zoom, focus, lens shift H/V - 0=stop, 1=operating."

- id: lens_profile
  type: enum
  source_query: lens_profile_request
  values: [profile_1, profile_2]

- id: lens_memory_option
  type: object
  source_query: lens_memory_option_request
  description: "Option (LOAD BY SIGNAL / FORCED MUTE) + ON/OFF setting."

- id: eco_mode
  type: raw
  source_query: eco_mode_request
  description: "Value byte per Appendix 'Supplementary Information by Command' - UNRESOLVED: enum not in source."

- id: projector_name
  type: string
  source_query: [lan_projector_name_request, information_request]
  description: "NUL-terminated ASCII name."

- id: mac_address
  type: string
  source_query: lan_mac_address_status_request_2
  description: "6-byte MAC."

- id: pip_pbp_status
  type: object
  source_query: pip_picture_by_picture_request
  description: "Mode / start position / sub input 1-3 values."

- id: edge_blending_mode
  type: enum
  source_query: edge_blending_mode_request
  values: [off, on]

- id: model_name
  type: string
  source_query: model_name_request

- id: base_model_type
  type: raw
  source_query: [base_model_type_request, setting_request]
  description: "Type code per Appendix 'Supplementary Information by Command' - UNRESOLVED: enum not in source."

- id: serial_number
  type: string
  source_query: serial_number_request

- id: sync_frequency
  type: object
  source_query: information_string_request
  description: "Horizontal (DATA01=03h) / vertical (DATA01=04h) sync frequency strings."

- id: basic_information
  type: object
  source_query: basic_information_request
  description: "Operation status, content displayed, signal types 1/2, display signal type, video/sound/onscreen mute, freeze status."
```

## Variables
```yaml
# Discrete settable parameters (non-action state). Each maps to a SET action above.
- name: picture_brightness
  set_via: picture_adjust  # DATA01=00h
  mode: [absolute, relative]
- name: picture_contrast
  set_via: picture_adjust  # DATA01=01h
- name: picture_color
  set_via: picture_adjust  # DATA01=02h
- name: picture_hue
  set_via: picture_adjust  # DATA01=03h
- name: picture_sharpness
  set_via: picture_adjust  # DATA01=04h
- name: volume
  set_via: volume_adjust
- name: lamp_light_adjust
  set_via: other_adjust  # DATA01=96h DATA02=FFh
- name: aspect
  set_via: aspect_adjust
  # UNRESOLVED: value enum in Appendix, not in source
- name: eco_mode
  set_via: eco_mode_set
  # UNRESOLVED: value enum in Appendix, not in source
- name: projector_name
  set_via: lan_projector_name_set
  max_length_bytes: 16
- name: lens_memory_load_by_signal
  set_via: lens_memory_option_set  # DATA01=00h
- name: lens_memory_forced_mute
  set_via: lens_memory_option_set  # DATA01=01h
- name: lens_profile
  set_via: lens_profile_set
  values: [profile_1, profile_2]
- name: edge_blending
  set_via: edge_blending_mode_set
  values: [off, on]
- name: freeze
  set_via: freeze_control
  values: [on, off]
- name: pip_pbp_mode
  set_via: pip_picture_by_picture_set  # DATA01=00h
  values: [pip, picture_by_picture]
- name: pip_pbp_start_position
  set_via: pip_picture_by_picture_set  # DATA01=01h
  values: [top_left, top_right, bottom_left, bottom_right]
- name: audio_select
  set_via: audio_select_set
  # UNRESOLVED: input-terminal value table in Appendix, not in source
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications; all responses are
# replies to commands (see §2.3). Device does not appear to push events.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off       # 016: blocks all other commands during cooling time
  - power_on        # 015: blocks all other commands during power-on
interlocks:
  - "Interlock switch open is reported as DATA09 bit1 of error_status (009)."
  - "Mirror cover / lens cover closed is reported via cover_status (078-6) and as error DATA03 bit5."
  - "Lamp not installed properly: error DATA04 bit7."
  - "Temperature errors: DATA01 bit1 (bi-metallic strip), DATA03 bit2 (sensor), DATA04 bit2 (dust)."
power_on_sequence: null  # UNRESOLVED: source does not specify a required power-on sequencing procedure beyond the 015 command
```

## Notes
- Command framing: requests use leading bytes `00h/01h/02h/03h`; normal responses use `20h/21h/22h/23h`; error responses use `A0h/A1h/A2h/A3h`. The first response byte mirrors the request first byte with the high nibble switched to `2` (ok) or `A` (error).
- Checksum `<CKS>` = low-order byte (8 bits) of the sum of all preceding bytes in the frame. Worked example: `20h 81h 01h 60h 01h 00h` → sum `103h` → CKS `03h`.
- While lens is being driven via 053, the same command can be reissued without an explicit stop (§3.22).
- Picture/onscreen mute auto-clears on input terminal switch or video signal switch; sound mute also clears on volume adjust.
- Lamp/filter usage times update at one-minute intervals even though resolution is one-second.
- Serial cable must be a cross (null-modem) cable; PC CONTROL port is D-SUB 9P.
- ID2 (model code) varies by model and must be obtained from projector settings; not enumerated in this source.
- `# UNRESOLVED:` enums for input terminal, aspect, eco-mode, and base-model-type values live in the document's "Appendix / Supplementary Information by Command" which is not part of the refined source text supplied here. These four enums must be filled from the appendix before the spec can be promoted above draft.
<!-- UNRESOLVED: default baud rate not stated (5 selectable rates listed); firmware version compatibility not stated; wireless-LAN command path not documented (defers to wireless unit manual). -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:31:20.159Z
last_checked_at: 2026-06-18T08:37:16.145Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:37:16.145Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input-terminal value table lives in an \"Appendix / Supplementary Information by Command\" not present in the refined source; input-terminal enums for 018, 098-198, 319-10 are not enumerable here. Same appendix holds aspect, eco-mode, and base-model-type value tables."
- "not in source.\""
- "enum not in source.\""
- "value enum in Appendix, not in source"
- "input-terminal value table in Appendix, not in source"
- "source describes no unsolicited notifications; all responses are"
- "source documents no multi-step command sequences."
- "source does not specify a required power-on sequencing procedure beyond the 015 command"
- "enums for input terminal, aspect, eco-mode, and base-model-type values live in the document's \"Appendix / Supplementary Information by Command\" which is not part of the refined source text supplied here. These four enums must be filled from the appendix before the spec can be promoted above draft."
- "default baud rate not stated (5 selectable rates listed); firmware version compatibility not stated; wireless-LAN command path not documented (defers to wireless unit manual)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
