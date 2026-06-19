---
spec_id: admin/sharp-nec-np-mc372x
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP MC372X Control Spec"
manufacturer: Sharp/NEC
model_family: "NP MC372X"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP MC372X"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:47:03.645Z
last_checked_at: 2026-06-18T08:36:04.011Z
generated_at: 2026-06-18T08:36:04.011Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name \"NP MC372X\" supplied by operator; the source manual is generic and does not name a specific model. Firmware version, voltage/power specs, and exact default serial rate not stated in source."
  - "source lists selectable rates 115200/38400/19200/9600/4800 bps; default not stated"
  - "not stated in source (RTS/CTS pins present on connector but flow_control setting unspecified)"
  - "get path not documented in source excerpt"
  - "source documents no unsolicited notifications. All responses are command-acknowledgement frames (success 2xh / error Axh)."
  - "source documents no multi-step command sequences."
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "input terminal value list (018, 319-10), aspect value list (030-12), eco mode value list (097-8/098-8), sub input value list (097-198/098-198), base model type value list (078-1/305-1) are referenced as \"see Appendix 'Supplementary Information by Command'\" but the Appendix is not included in the source excerpt."
  - "default serial baud rate not stated (5 selectable rates given)."
  - "serial flow_control not stated (RTS/CTS pins wired but setting unspecified)."
  - "firmware version compatibility not stated in source."
  - "no auth procedure documented; auth.type:none is inferred, not confirmed."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:36:04.011Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP MC372X Control Spec

## Summary
Sharp/NEC NP MC372X projector control spec covering RS-232C serial and wired/wireless LAN (TCP) control per the Projector Control Command Reference Manual (BDT140013 Rev 7.1). Commands use a binary hex frame with a leading byte, command bytes, parameters, and a trailing checksum byte (low-order 8 bits of the sum of all preceding bytes). Covers power, input switching, mute, lens/shutter, picture/volume/aspect adjustment, lamp/filter/info queries, lens memory, eco mode, PIP/PbP, edge blending, and audio select.

<!-- UNRESOLVED: model name "NP MC372X" supplied by operator; the source manual is generic and does not name a specific model. Firmware version, voltage/power specs, and exact default serial rate not stated in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
# Connector: PC CONTROL port D-SUB 9P (cross cable). LAN: RJ-45 (wired) / wireless LAN unit.
serial:
  baud_rate: null  # UNRESOLVED: source lists selectable rates 115200/38400/19200/9600/4800 bps; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: not stated in source (RTS/CTS pins present on connector but flow_control setting unspecified)
  communication_mode: full_duplex
addressing:
  port: 7142  # TCP port for command send/receive over LAN
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON (015) / POWER OFF (016) commands present
  - queryable       # inferred: many status/information request commands present
  - levelable       # inferred: volume, brightness, contrast, color, hue, sharpness, lamp adjust present
  - routable        # inferred: INPUT SW CHANGE (018) input terminal switching present
```

## Actions
```yaml
# Frame format: <lead> <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>
# CKS = low-order 8 bits of the sum of all preceding bytes (computed).
# ID1 = projector control ID; ID2 = model code. Both vary per device.
# Response lead bytes: 2xh = success (2-digit cmd echo), Axh = error with ERR1/ERR2.
#
# Hex values shown verbatim from source; parameters in <DATA??> placeholders.

- id: error_status_request_009
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on_015
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: While powering on, no other command accepted.

- id: power_off_016
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: While powering off (incl. cooling time), no other command accepted.

- id: input_sw_change_018
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal value (e.g. 06h = video port). Full value list in Appendix 'Supplementary Information by Command' (not reproduced in source excerpt)."
  notes: Example to video port -> "02h 03h 00h 00h 02h 01h 06h 0Eh".

- id: picture_mute_on_020
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Turned off by input/video signal switch.

- id: picture_mute_off_021
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on_022
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: Turned off by input/video signal switch or volume adjustment.

- id: sound_mute_off_023
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on_024
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off_025
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust_030_1
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: target
      type: enum
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: "16-bit value: DATA03 low-order 8 bits, DATA04 high-order 8 bits (signed; negative allowed)"
  notes: "Example set brightness=10 -> 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Set brightness=-10 -> 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch."

- id: volume_adjust_030_2
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: mode
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: "16-bit value: DATA02 low-order 8 bits, DATA03 high-order 8 bits"
  notes: "Example set volume=10 -> 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust_030_12
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: aspect
      type: integer
      description: "Aspect value (DATA01). Full value list in Appendix 'Supplementary Information by Command' (not reproduced in source excerpt)."

- id: other_adjust_030_15
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: target
      type: enum
      description: "Adjustment target: DATA01=96h, DATA02=FFh -> LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: enum
      description: "Adjustment mode (DATA03): 00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: "16-bit value: DATA04 low-order 8 bits, DATA05 high-order 8 bits"

- id: information_request_037
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals."

- id: filter_usage_info_request_037_3
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined."

- id: lamp_info_request_037_4
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: lamp
      type: enum
      description: "DATA01: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: content
      type: enum
      description: "DATA02: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
  notes: "Remaining life may be negative if replacement deadline exceeded. Example get usage -> 03h 96h 00h 00h 02h 00h 01h 9Ch."

- id: carbon_savings_info_request_037_6
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: type
      type: enum
      description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

- id: remote_key_code_050
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: key_code
      type: enum
      description: "WORD key code (DATA01 low, DATA02 high). Values: 02h/00h=POWER ON, 03h/00h=POWER OFF, 05h/00h=AUTO, 06h/00h=MENU, 07h/00h=UP, 08h/00h=DOWN, 09h/00h=RIGHT, 0Ah/00h=LEFT, 0Bh/00h=ENTER, 0Ch/00h=EXIT, 0Dh/00h=HELP, 0Fh/00h=MAGNIFY UP, 10h/00h=MAGNIFY DOWN, 13h/00h=MUTE, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, 4Ch/00h=COMPUTER2, 4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1, 84h/00h=VOLUME UP, 85h/00h=VOLUME DOWN, 8Ah/00h=FREEZE, A3h/00h=ASPECT, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO"
  notes: "Example send AUTO -> 02h 0Fh 00h 00h 02h 05h 00h 18h."

- id: shutter_close_051
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open_052
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control_053
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: target
      type: enum
      description: "DATA01: 06h=Periphery Focus (other targets in Appendix)"
    - name: content
      type: enum
      description: "DATA02: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
  notes: After sending 7Fh or 81h, send 00h to stop.

- id: lens_control_request_053_1
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: target
      type: integer
      description: "Lens target (DATA01). Returns upper/lower limits and current value (DATA02-07)."

- id: lens_control_2_053_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: target
      type: enum
      description: "DATA01: FFh=Stop (mode/value ignored), otherwise lens target"
    - name: mode
      type: enum
      description: "DATA02: 00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: "16-bit value: DATA03 low, DATA04 high"

- id: lens_memory_control_053_3
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: enum
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control_053_4
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: enum
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"
  notes: Controls profile number specified by LENS PROFILE SET (053-10).

- id: lens_memory_option_request_053_5
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: option
      type: enum
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE (returns DATA02 00h=OFF, 01h=ON)"

- id: lens_memory_option_set_053_6
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: option
      type: enum
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: enum
      description: "DATA02: 00h=OFF, 01h=ON"

- id: lens_information_request_053_7
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitmask: bit0=Lens memory, bit1=Zoom, bit2=Focus, bit3=Lens Shift (H), bit4=Lens Shift (V) (0=Stop, 1=During operation)."

- id: lens_profile_set_053_10
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: profile
      type: enum
      description: "DATA01: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request_053_11
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns DATA01: 00h=Profile 1, 01h=Profile 2 (DATA02 reserved)."

- id: gain_parameter_request_060_1
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: name
      type: enum
      description: "DATA01: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
  notes: "Returns status, upper/lower limits, default, current value, wide/narrow adjustment width. Example brightness -> 03h 05h 00h 00h 03h 00h 00h 00h 0Bh."

- id: setting_request_078_1
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04 00h=NA/01h=avail), clock/sleep function (DATA05)."

- id: running_status_request_078_2
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (DATA03 00h=Standby/01h=Power on), cooling process, power on/off process, operation status (DATA06)."

- id: input_status_request_078_3
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number (DATA02, practical = returned+1), selection signal type 1/2, content displayed."

- id: mute_status_request_078_4
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute (DATA01), sound mute (DATA02), onscreen mute (DATA03), forced onscreen mute (DATA04), onscreen display (DATA05). 00h=Off, 01h=On."

- id: model_name_request_078_5
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns model name string (DATA01-32, NUL-terminated)."

- id: cover_status_request_078_6
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control_079
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: state
      type: enum
      description: "DATA01: 01h=Freeze On, 02h=Freeze Off"

- id: information_string_request_084
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: info_type
      type: enum
      description: "DATA01: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
  notes: "Returns label/info string length (DATA02) and string (DATA03+, NUL-terminated)."

- id: eco_mode_request_097_8
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco/light/lamp mode value (DATA01). Full value list in Appendix."

- id: lan_projector_name_request_097_45
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name (DATA01-17, NUL-terminated)."

- id: lan_mac_address_request_097_155
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns MAC address (DATA01-06)."

- id: pip_pbp_request_097_198
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: target
      type: enum
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request_097_243_1
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns DATA01: 00h=OFF, 01h=ON."

- id: eco_mode_set_098_8
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: value
      type: integer
      description: "Eco/light/lamp mode value (DATA01). Full value list in Appendix."

- id: lan_projector_name_set_098_45
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name (DATA01-16, up to 16 bytes), NUL-terminated."

- id: pip_pbp_set_098_198
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: target
      type: enum
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "Setting value (DATA02). MODE: 00h=PIP/01h=PbP. START POSITION: 00h=TOP-LEFT/01h=TOP-RIGHT/02h=BOTTOM-LEFT/03h=BOTTOM-RIGHT. Sub input values in Appendix."

- id: edge_blending_mode_set_098_243_1
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: value
      type: enum
      description: "DATA01: 00h=OFF, 01h=ON"

- id: base_model_type_request_305_1
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02, DATA12-13), model name (DATA03-11)."

- id: serial_number_request_305_2
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns serial number (DATA01-16, NUL-terminated)."

- id: basic_information_request_305_3
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status (DATA01), content displayed (DATA02), selection signal type 1/2 (DATA03/04), display signal type (DATA05), video/sound/onscreen mute (DATA06-08), freeze status (DATA09)."

- id: audio_select_set_319_10
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal (DATA01). Full value list in Appendix."
    - name: value
      type: enum
      description: "DATA02: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on]
  source: 078-2 RUNNING STATUS REQUEST DATA03 (00h=Standby, 01h=Power on)

- id: cooling_in_progress
  type: enum
  values: [not_executed, in_progress]
  source: 078-2 DATA04

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: 078-2 DATA06 (00h/04h/05h/06h/0Fh/10h)

- id: picture_mute_state
  type: enum
  values: [off, on]
  source: 078-4 MUTE STATUS REQUEST DATA01

- id: sound_mute_state
  type: enum
  values: [off, on]
  source: 078-4 DATA02

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  source: 078-4 DATA03

- id: forced_onscreen_mute_state
  type: enum
  values: [off, on]
  source: 078-4 DATA04

- id: cover_state
  type: enum
  values: [normal_opened, closed]
  source: 078-6 COVER STATUS REQUEST DATA01

- id: freeze_state
  type: enum
  values: [off, on]
  source: 305-3 BASIC INFORMATION REQUEST DATA09

- id: error_status
  type: bitmask
  source: 009 ERROR STATUS REQUEST DATA01-12
  notes: "Bit fields per source: cover/fan/temperature/power/lamp errors, lamp usage exceeded, formatter/FPGA errors, mirror cover, iris calibration, lens not installed, interlock switch open, system errors."

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: 037-4 LAMP INFORMATION REQUEST 3 (content 01h), DATA03-06; also 037 DATA83-86

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: 037-4 LAMP INFORMATION REQUEST 3 (content 04h), DATA03-06 (may be negative)

- id: filter_usage_time
  type: integer
  unit: seconds
  source: 037-3 FILTER USAGE INFORMATION REQUEST DATA01-04; also 037 DATA87-90

- id: model_name
  type: string
  source: 078-5 MODEL NAME REQUEST

- id: serial_number
  type: string
  source: 305-2 SERIAL NUMBER REQUEST

- id: mac_address
  type: string
  source: 097-155 LAN MAC ADDRESS STATUS REQUEST 2

- id: projector_name
  type: string
  source: 097-45 LAN PROJECTOR NAME REQUEST

- id: eco_mode
  type: integer
  source: 097-8 ECO MODE REQUEST DATA01

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: 097-243-1 EDGE BLENDING MODE REQUEST DATA01

- id: input_signal_status
  type: composite
  source: 078-3 INPUT STATUS REQUEST
  notes: "Signal list number, selection signal type 1/2, content displayed."

- id: horizontal_sync_frequency
  type: string
  source: 084 INFORMATION STRING REQUEST (info_type 03h)

- id: vertical_sync_frequency
  type: string
  source: 084 INFORMATION STRING REQUEST (info_type 04h)
```

## Variables
```yaml
- id: volume
  type: integer
  description: Sound volume level
  set: 030-2 VOLUME ADJUST
  get: 060-1 GAIN PARAMETER REQUEST 3 (name 05h)

- id: brightness
  type: integer
  description: Picture brightness
  set: 030-1 PICTURE ADJUST (target 00h)
  get: 060-1 GAIN PARAMETER REQUEST 3 (name 00h)

- id: contrast
  type: integer
  description: Picture contrast
  set: 030-1 PICTURE ADJUST (target 01h)
  get: 060-1 GAIN PARAMETER REQUEST 3 (name 01h)

- id: color
  type: integer
  description: Picture color
  set: 030-1 PICTURE ADJUST (target 02h)
  get: 060-1 GAIN PARAMETER REQUEST 3 (name 02h)

- id: hue
  type: integer
  description: Picture hue
  set: 030-1 PICTURE ADJUST (target 03h)
  get: 060-1 GAIN PARAMETER REQUEST 3 (name 03h)

- id: sharpness
  type: integer
  description: Picture sharpness
  set: 030-1 PICTURE ADJUST (target 04h)
  get: 060-1 GAIN PARAMETER REQUEST 3 (name 04h)

- id: lamp_light_adjust
  type: integer
  description: Lamp/Light adjust gain
  set: 030-15 OTHER ADJUST (target 96h/FFh)
  get: 060-1 GAIN PARAMETER REQUEST 3 (name 96h)

- id: aspect
  type: integer
  description: Aspect ratio setting
  set: 030-12 ASPECT ADJUST
  # UNRESOLVED: get path not documented in source excerpt

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  set: 053-10 LENS PROFILE SET
  get: 053-11 LENS PROFILE REQUEST

- id: lens_memory_option
  type: enum
  description: "LOAD BY SIGNAL / FORCED MUTE on-off"
  set: 053-6 LENS MEMORY OPTION SET
  get: 053-5 LENS MEMORY OPTION REQUEST
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All responses are command-acknowledgement frames (success 2xh / error Axh).
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes from source (informational, not safety interlock procedures):
#   - POWER ON (015): no other command accepted during power-on sequence.
#   - POWER OFF (016): no other command accepted during power-off incl. cooling time.
#   - Lens drive (053): continuous drive via 7Fh/81h must be stopped by sending 00h.
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. Cover/interlock-switch status is queryable (009, 078-6)
# but no safety procedure is documented.
```

## Notes
- **Frame structure:** `<lead> <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Lead byte encodes direction (0xh/1xh/2xh/3xh = command variants; 2xh = success response; Axh = error response). ID1 = projector control ID; ID2 = model code (device-specific).
- **Checksum (CKS):** low-order 8 bits of the sum of all preceding bytes. Source example: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- **Responses:** success returns `2xh` frame (no data part if command doesn't request data, with data if it does); failure returns `Axh` frame with ERR1/ERR2.
- **Error codes (ERR1/ERR2):** `00h/00h`=unrecognized command, `00h/01h`=not supported by model, `01h/00h`=invalid value, `01h/01h`=invalid input terminal, `01h/02h`=invalid language, `02h/00h`=memory allocation error, `02h/02h`=memory in use, `02h/03h`=value cannot be set, `02h/04h`=forced onscreen mute on, `02h/06h`=viewer error, `02h/07h`=no signal, `02h/08h`=test pattern/filter displayed, `02h/09h`=no PC card inserted, `02h/0Ah`=memory operation error, `02h/0Ch`=entry list displayed, `02h/0Dh`=command rejected (power off), `02h/0Eh`=execution failed, `02h/0Fh`=no authority, `03h/00h`=incorrect gain number, `03h/01h`=invalid gain, `03h/02h`=adjustment failed.
- **Signal list number:** returned value is practical number minus 1; add 1 to get the practical number.
- **Usage time granularity:** lamp/filter usage time available in 1-second units but updated at 1-minute intervals.
- **Lamp 2:** `01h` (Lamp 2) in 037-4 DATA01 effective only on two-lamp models.

<!-- UNRESOLVED: input terminal value list (018, 319-10), aspect value list (030-12), eco mode value list (097-8/098-8), sub input value list (097-198/098-198), base model type value list (078-1/305-1) are referenced as "see Appendix 'Supplementary Information by Command'" but the Appendix is not included in the source excerpt. -->
<!-- UNRESOLVED: default serial baud rate not stated (5 selectable rates given). -->
<!-- UNRESOLVED: serial flow_control not stated (RTS/CTS pins wired but setting unspecified). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: no auth procedure documented; auth.type:none is inferred, not confirmed. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:47:03.645Z
last_checked_at: 2026-06-18T08:36:04.011Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:36:04.011Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name \"NP MC372X\" supplied by operator; the source manual is generic and does not name a specific model. Firmware version, voltage/power specs, and exact default serial rate not stated in source."
- "source lists selectable rates 115200/38400/19200/9600/4800 bps; default not stated"
- "not stated in source (RTS/CTS pins present on connector but flow_control setting unspecified)"
- "get path not documented in source excerpt"
- "source documents no unsolicited notifications. All responses are command-acknowledgement frames (success 2xh / error Axh)."
- "source documents no multi-step command sequences."
- "source contains no explicit safety warnings, interlock procedures, or"
- "input terminal value list (018, 319-10), aspect value list (030-12), eco mode value list (097-8/098-8), sub input value list (097-198/098-198), base model type value list (078-1/305-1) are referenced as \"see Appendix 'Supplementary Information by Command'\" but the Appendix is not included in the source excerpt."
- "default serial baud rate not stated (5 selectable rates given)."
- "serial flow_control not stated (RTS/CTS pins wired but setting unspecified)."
- "firmware version compatibility not stated in source."
- "no auth procedure documented; auth.type:none is inferred, not confirmed."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
