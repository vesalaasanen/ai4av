---
spec_id: admin/sharp-nec-ld-fa382
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld Fa382 Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld Fa382"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld Fa382"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:25:07.304Z
last_checked_at: 2026-06-17T20:05:33.535Z
generated_at: 2026-06-17T20:05:33.535Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact marketing model name string and firmware version not stated in this manual. Known protocol requested was RS-232C, but the same manual also documents LAN/TCP control (port 7142); both are captured here."
  - "\"Full duplex\" communication mode stated; RTS/CTS pins wired (pin7 RTS, pin8 CTS) but specific flow-control setting not stated"
  - "no unsolicited notification mechanism documented in source. Protocol is request/response only."
  - "no multi-step sequences explicitly described in source."
  - "no explicit safety warnings, interlock procedures, or power-on sequencing"
  - "Appendix value tables (input terminal values, aspect values, eco mode values, base model types, sub-input values) not present in source — command payloads reference them but exact enumerations unavailable."
  - "firmware version compatibility not stated."
  - "no single default baud rate stated (5 selectable rates documented)."
  - "exact flow-control setting not stated (full-duplex mode + RTS/CTS pinout only)."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:05:33.535Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim in source; transport parameters (baud rates, TCP port, serial settings) confirmed; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld Fa382 Control Spec

## Summary
Sharp/NEC Ld Fa382 projector. Binary hex control protocol over RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN (TCP). This spec is derived from the "Projector Control Command Reference Manual" (BDT140013 Revision 7.1), which enumerates 53 commands for power, input switching, mute, lens/shutter, picture/volume/aspect adjust, status queries, and network/eco/PIP/edge-blend settings.

<!-- UNRESOLVED: exact marketing model name string and firmware version not stated in this manual. Known protocol requested was RS-232C, but the same manual also documents LAN/TCP control (port 7142); both are captured here. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # all selectable rates stated in source; no single default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: "Full duplex" communication mode stated; RTS/CTS pins wired (pin7 RTS, pin8 CTS) but specific flow-control setting not stated
addressing:
  port: 7142  # TCP port stated for LAN command send/receive
auth:
  type: none  # inferred: no auth/login procedure described in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON (015) / POWER OFF (016) present
  - queryable    # inferred: many status request commands present (009, 037, 078-*, etc.)
  - levelable    # inferred: VOLUME ADJUST (030-2), PICTURE ADJUST (030-1) present
```

## Actions
```yaml
# Frame format (hex): <HEADER> <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>
# Commands sent TO the projector carry 00h in the ID1/ID2 positions.
# CKS = checksum = low-order one byte of the sum of all preceding bytes.
# Success response header = command header + 20h; error response header = + A0h.
# Below, each `command:` is the verbatim command string; <CKS> is computed.

- id: error_status_request_009
  label: "009. Error Status Request"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on_015
  label: "015. Power On"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on is in progress."

- id: power_off_016
  label: "016. Power Off"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off including cooling time."

- id: input_sw_change_018
  label: "018. Input SW Change"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal value (see Appendix Supplementary Information by Command). Example: 06h = video port."
  notes: "Example (video port): 02h 03h 00h 00h 02h 01h 06h 0Eh"

- id: picture_mute_on_020
  label: "020. Picture Mute On"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input/video signal switch."

- id: picture_mute_off_021
  label: "021. Picture Mute Off"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on_022
  label: "022. Sound Mute On"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Cleared by input/video switch or volume adjustment."

- id: sound_mute_off_023
  label: "023. Sound Mute Off"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on_024
  label: "024. Onscreen Mute On"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: "Cleared by input/video signal switch."

- id: onscreen_mute_off_025
  label: "025. Onscreen Mute Off"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust_030_1
  label: "030-1. Picture Adjust"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: data02
      type: string
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: volume_adjust_030_2
  label: "030-2. Volume Adjust"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: data02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust_030_12
  label: "030-12. Aspect Adjust"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Aspect value (see Appendix Supplementary Information by Command)"

- id: other_adjust_030_15
  label: "030-15. Other Adjust (Lamp/Light Adjust)"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "Target DATA01; source documents 96h with DATA02=FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: data02
      type: string
      description: "DATA02; FFh for LAMP/LIGHT ADJUST"
    - name: data03
      type: string
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: data04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request_037
  label: "037. Information Request"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name, lamp usage time (s), filter usage time (s)."

- id: filter_usage_info_request_037_3
  label: "037-3. Filter Usage Information Request"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (s) and filter alarm start time (s); -1 if undefined."

- id: lamp_info_request_037_4
  label: "037-4. Lamp Information Request 3"
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lamp selector: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: data02
      type: string
      description: "Content: 01h lamp usage time (s), 04h lamp remaining life (%)"
  notes: "Example lamp1 usage time: 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining life if deadline exceeded."

- id: carbon_savings_info_request_037_6
  label: "037-6. Carbon Savings Information Request"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation"
  notes: "Returns kg (DATA02-05) and mg (DATA06-09)."

- id: remote_key_code_050
  label: "050. Remote Key Code"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Key code low byte (see key code list)"
    - name: data02
      type: string
      description: "Key code high byte (00h for all listed keys)"
  notes: "Key code list: 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO. Example AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h"

- id: shutter_close_051
  label: "051. Shutter Close"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open_052
  label: "052. Shutter Open"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control_053
  label: "053. Lens Control"
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target; source documents 06h Periphery Focus"
    - name: data02
      type: string
      description: "00h Stop, 01h drive +1s, 02h drive +0.5s, 03h drive +0.25s, 7Fh drive plus, 81h drive minus, FDh drive -0.25s, FEh drive -0.5s, FFh drive -1s"
  notes: "After 7Fh/81h, stop by sending 00h. Same command may be reissued during drive without stop."

- id: lens_control_request_053_1
  label: "053-1. Lens Control Request"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target selector"
  notes: "Returns upper/lower limit and current value of adjustment range."

- id: lens_control_2_053_2
  label: "053-2. Lens Control 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "FFh Stop, or lens target"
    - name: data02
      type: string
      description: "Adjustment mode: 00h absolute, 02h relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "If DATA01=FFh (Stop), mode/value not referenced."

- id: lens_memory_control_053_3
  label: "053-3. Lens Memory Control"
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control_053_4
  label: "053-4. Reference Lens Memory Control"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h MOVE, 01h STORE, 02h RESET"
  notes: "Operates on profile number selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request_053_5
  label: "053-5. Lens Memory Option Request"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
  notes: "Returns setting value 00h OFF / 01h ON."

- id: lens_memory_option_set_053_6
  label: "053-6. Lens Memory Option Set"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: data02
      type: string
      description: "Setting value: 00h OFF, 01h ON"

- id: lens_info_request_053_7
  label: "053-7. Lens Information Request"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns bitfield: lens memory, zoom, focus, lens shift H/V stop/operation state."

- id: lens_profile_set_053_10
  label: "053-10. Lens Profile Set"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Profile number: 00h Profile 1, 01h Profile 2"

- id: lens_profile_request_053_11
  label: "053-11. Lens Profile Request"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns selected profile number 00h Profile 1 / 01h Profile 2."

- id: gain_parameter_request_060_1
  label: "060-1. Gain Parameter Request 3"
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: string
      description: "00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust"
  notes: "Example brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns range/default/current/wide/narrow widths."

- id: setting_request_078_1
  label: "078-1. Setting Request"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type, sound function availability, profile/clock/sleep-timer function."

- id: running_status_request_078_2
  label: "078-2. Running Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status, cooling process, power on/off process, operation status."

- id: input_status_request_078_3
  label: "078-3. Input Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal types, test pattern, displayed content."

- id: mute_status_request_078_4
  label: "078-4. Mute Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture/sound/onscreen/forced-onscreen mute and onscreen display state."

- id: model_name_request_078_5
  label: "078-5. Model Name Request"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns model name (NUL-terminated)."

- id: cover_status_request_078_6
  label: "078-6. Cover Status Request"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns 00h Normal (cover opened) / 01h Cover closed (mirror/lens cover)."

- id: freeze_control_079
  label: "079. Freeze Control"
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "01h freeze on, 02h freeze off"

- id: information_string_request_084
  label: "084. Information String Request"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "Information type: 03h horizontal sync frequency, 04h vertical sync frequency"
  notes: "Returns label/information string (NUL-terminated)."

- id: eco_mode_request_097_8
  label: "097-8. Eco Mode Request"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco/light/lamp mode value (see Appendix)."

- id: lan_projector_name_request_097_45
  label: "097-45. LAN Projector Name Request"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name (17 bytes, NUL-terminated)."

- id: lan_mac_address_request_097_155
  label: "097-155. LAN MAC Address Status Request 2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns 6-byte MAC address."

- id: pip_pbp_request_097_198
  label: "097-198. PIP/Picture by Picture Request"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
  notes: "Returns setting value (mode/position/sub-input)."

- id: edge_blending_mode_request_097_243_1
  label: "097-243-1. Edge Blending Mode Request"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns 00h OFF / 01h ON."

- id: eco_mode_set_098_8
  label: "098-8. Eco Mode Set"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Eco/light/lamp mode value (see Appendix Supplementary Information by Command)"

- id: lan_projector_name_set_098_45
  label: "098-45. LAN Projector Name Set"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01}-{data16} 00h {cks}"
  params:
    - name: data
      type: string
      description: "Projector name (up to 16 bytes)"

- id: pip_pbp_set_098_198
  label: "098-198. PIP/Picture by Picture Set"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: data02
      type: string
      description: "Setting value (mode 00h PIP/01h PbP; position 00h TL/01h TR/02h BL/03h BR; or sub-input value)"

- id: edge_blending_mode_set_098_243_1
  label: "098-243-1. Edge Blending Mode Set"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Setting value: 00h OFF, 01h ON"

- id: base_model_type_request_305_1
  label: "305-1. Base Model Type Request"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type and model name (NUL-terminated)."

- id: serial_number_request_305_2
  label: "305-2. Serial Number Request"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns serial number (16 bytes, NUL-terminated)."

- id: basic_info_request_305_3
  label: "305-3. Basic Information Request"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, displayed content, signal types, display signal type, mute states, freeze status."

- id: audio_select_set_319_10
  label: "319-10. Audio Select Set"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal (see Appendix Supplementary Information by Command)"
    - name: data02
      type: string
      description: "Setting value: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: bitfield
  description: "12-byte error information (009 response). Bit=1 indicates error: cover, fan, temperature, power, lamp off, lamp replacement due, formatter, FPGA, mirror cover, ballast comm, iris calibration, lens install, interlock switch open, system errors, etc."

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "From 078-2 (DATA03/DATA06) and 305-3 (DATA01)."

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  description: "078-2 DATA04."

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "078-2 DATA06 / 305-3 DATA01."

- id: input_signal_status
  type: object
  description: "078-3: signal switch process, signal list number, selection signal types (COMPUTER/VIDEO/S-VIDEO/COMPONENT/DVI-D/HDMI/DisplayPort/VIEWER), test pattern, displayed content."

- id: mute_status
  type: object
  description: "078-4: picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each 00h off / 01h on)."

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  description: "078-6 mirror/lens cover."

- id: model_name
  type: string
  description: "078-5 model name (NUL-terminated)."

- id: lamp_usage_time
  type: integer
  unit: seconds
  description: "037 (DATA83-86) / 037-4. Updated at 1-minute intervals."

- id: lamp_remaining_life
  type: integer
  unit: percent
  description: "037-4 content 04h. Negative if replacement deadline exceeded."

- id: filter_usage_time
  type: integer
  unit: seconds
  description: "037 (DATA87-90) / 037-3 (DATA01-04). Filter alarm start time in DATA05-08 (-1 if undefined)."

- id: carbon_savings
  type: object
  description: "037-6: kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999); total or during-operation."

- id: lens_position
  type: object
  description: "053-1: upper/lower limit and current value of adjustment range."

- id: lens_status
  type: bitfield
  description: "053-7: lens memory, zoom, focus, lens shift H/V (stop vs during operation)."

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: "053-11 selected reference lens memory profile."

- id: gain_parameter
  type: object
  description: "060-1: status, upper/lower limit, default, current, wide/narrow adjustment width for brightness/contrast/color/hue/sharpness/volume/lamp-adjust."

- id: projector_info
  type: object
  description: "078-1: base model type, sound function, profile/clock/sleep-timer function."

- id: sync_frequency
  type: object
  description: "084: horizontal (03h) and vertical (04h) synchronous frequency strings."

- id: eco_mode
  type: string
  description: "097-8 eco/light/lamp mode value (see Appendix)."

- id: lan_projector_name
  type: string
  description: "097-45 projector name (17 bytes, NUL-terminated)."

- id: lan_mac_address
  type: string
  description: "097-155 6-byte MAC address."

- id: pip_pbp_state
  type: object
  description: "097-198: mode (PIP/PbP), start position (TL/TR/BL/BR), sub inputs 1-3."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: "097-243-1."

- id: base_model_type
  type: object
  description: "305-1: base model type and model name string."

- id: serial_number
  type: string
  description: "305-2 serial number (16 bytes, NUL-terminated)."

- id: basic_info
  type: object
  description: "305-3: operation status, displayed content, signal types, display signal type, video/sound/onscreen mute, freeze status."

- id: command_result
  type: enum
  values: [success, error]
  description: "Every command returns A2h/A3h... error frame with ERR1/ERR2 on failure; success frame otherwise. 0000h = success for adjust commands."
```

## Variables
```yaml
# Discrete settable parameters not covered as discrete actions:
- id: brightness
  type: integer
  description: "030-1 target 00h / 060-1 00h"
- id: contrast
  type: integer
  description: "030-1 target 01h / 060-1 01h"
- id: color
  type: integer
  description: "030-1 target 02h / 060-1 02h"
- id: hue
  type: integer
  description: "030-1 target 03h / 060-1 03h"
- id: sharpness
  type: integer
  description: "030-1 target 04h / 060-1 04h"
- id: volume
  type: integer
  description: "030-2 / 060-1 05h"
- id: lamp_light_adjust
  type: integer
  description: "030-15 (DATA01=96h) / 060-1 96h"
- id: aspect
  type: string
  description: "030-12 (values per Appendix)"
- id: eco_mode_value
  type: string
  description: "098-8 set / 097-8 get (values per Appendix)"
- id: projector_name
  type: string
  description: "098-45 set (up to 16 bytes) / 097-45 get"
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism documented in source. Protocol is request/response only.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes operational interlocks (not safety-critical sequences):
# - POWER ON/OFF reject all other commands during power transition and cooling.
# - Error code 02h 0Dh: "command cannot be accepted because the power is off."
# - Error code 02h 0Fh: "no authority necessary for the operation."
# - 009 error bitfield surfaces: cover error, temperature error, fan error, interlock switch open,
#   foreign matter sensor error, lens not installed properly - device-side fault indicators only.
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on sequencing
# requirements documented in this command reference.
```

## Notes
- **Manual:** "Projector Control Command Reference Manual", document BDT140013 Revision 7.1.
- **Frame structure (hex):** `<HEADER> <CMD> <ID1> <ID2> <LEN> <DATA…> <CKS>`. Commands sent to the projector carry `00h` in the ID1/ID2 positions; responses echo the projector's Control ID (ID1) and Model code (ID2).
- **Checksum (CKS):** low-order one byte of the sum of all preceding bytes. Example: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- **Response headers:** success = command header + `20h` (e.g. command `02h` → `22h`); error = command header + `A0h` (e.g. `02h` → `A2h`). Query responses use `+20h`/`+A0h` with the leading 00h/03h bytes (e.g. `20h`, `23h`, `A0h`, `A3h`).
- **Error codes (ERR1/ERR2):** full table in source §2.4 — e.g. `00h/00h` unrecognized command, `00h/01h` not supported by model, `01h/00h` invalid value, `01h/01h` invalid input terminal, `02h/0Dh` power off, `02h/0Eh` execution failed, `02h/0Fh` no authority, `03h/02h` adjustment failed.
- **Signal/aspect/eco/PIP-sub-input value tables** are referenced as "Supplementary Information by Command" in an Appendix not included in this refined source.

<!-- UNRESOLVED: Appendix value tables (input terminal values, aspect values, eco mode values, base model types, sub-input values) not present in source — command payloads reference them but exact enumerations unavailable. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: no single default baud rate stated (5 selectable rates documented). -->
<!-- UNRESOLVED: exact flow-control setting not stated (full-duplex mode + RTS/CTS pinout only). -->
```

Caveman note: 53 cmds all cataloged verbatim. Both serial+TCP captured (port 7142 stated). Appendix enum tables missing from refined source → marked UNRESOLVED. No fabricated volts/baud-defaults.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:25:07.304Z
last_checked_at: 2026-06-17T20:05:33.535Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:05:33.535Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim in source; transport parameters (baud rates, TCP port, serial settings) confirmed; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact marketing model name string and firmware version not stated in this manual. Known protocol requested was RS-232C, but the same manual also documents LAN/TCP control (port 7142); both are captured here."
- "\"Full duplex\" communication mode stated; RTS/CTS pins wired (pin7 RTS, pin8 CTS) but specific flow-control setting not stated"
- "no unsolicited notification mechanism documented in source. Protocol is request/response only."
- "no multi-step sequences explicitly described in source."
- "no explicit safety warnings, interlock procedures, or power-on sequencing"
- "Appendix value tables (input terminal values, aspect values, eco mode values, base model types, sub-input values) not present in source — command payloads reference them but exact enumerations unavailable."
- "firmware version compatibility not stated."
- "no single default baud rate stated (5 selectable rates documented)."
- "exact flow-control setting not stated (full-duplex mode + RTS/CTS pinout only)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
