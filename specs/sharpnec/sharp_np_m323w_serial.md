---
spec_id: admin/sharp-nec-np-m323w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP M323W Control Spec"
manufacturer: Sharp/NEC
model_family: "NP M323W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP M323W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:39:28.121Z
last_checked_at: 2026-06-18T08:34:44.791Z
generated_at: 2026-06-18T08:34:44.791Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name \"NP M323W\" supplied by operator, not printed verbatim in source manual (generic multi-model reference). ID2 model code not stated for this model."
  - "flow control not stated in source"
  - "baud rate has 5 selectable values, source does not state which is default/factory. baud_rate above uses highest as placeholder."
  - "source lists \"Communication mode: Full duplex\" but no flow_control (RTS/CTS hardware lines present in pinout, usage unstated)."
  - "source does not document any push/event mechanism."
  - "no explicit power-on sequencing interlock or safety certification"
  - "ID2 model code for NP M323W not stated."
  - "factory-default baud rate not stated (5 selectable)."
  - "flow_control not stated (RTS/CTS pins present in pinout, role unclear)."
  - "full input terminal / aspect / eco mode / sub-input / base model type value lists require Appendix not in refined source."
  - "lens target byte values for 053/053-2 only partially enumerated (06h=Periphery Focus; FFh=Stop on 053-2)."
  - "firmware version compatibility not stated."
  - "model name \"NP M323W\" supplied by operator; generic manual covers multiple Sharp/NEC projector models."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:34:44.791Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP M323W Control Spec

## Summary
Sharp/NEC NP M323W projector. Control via RS-232C serial (PC CONTROL D-SUB 9P, cross cable) and wired/wireless LAN. Hex-byte command framing with checksum. Manual BDT140013 Rev 7.1 covers ~60 control commands: power, input switch, mute, picture/volume/aspect adjust, lens control + memory, shutter, freeze, status queries, eco mode, PIP/PbP, edge blending, audio select.

<!-- UNRESOLVED: model name "NP M323W" supplied by operator, not printed verbatim in source manual (generic multi-model reference). ID2 model code not stated for this model. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps; default not stated, picked highest
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

<!-- UNRESOLVED: baud rate has 5 selectable values, source does not state which is default/factory. baud_rate above uses highest as placeholder. -->
<!-- UNRESOLVED: source lists "Communication mode: Full duplex" but no flow_control (RTS/CTS hardware lines present in pinout, usage unstated). -->

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON / POWER OFF commands present
  - queryable       # inferred: many status request commands return values
  - levelable       # inferred: VOLUME ADJUST, PICTURE ADJUST (brightness/contrast/etc.)
  - routable        # inferred: INPUT SW CHANGE switches input terminal
```

## Actions
```yaml
# All command bytes verbatim from source. Framing: the full frame is
# <firstbyte> <ID1> <ID2> <LEN> <DATA...> <CKS> for commands directed at projector;
# bare bytes shown in source (e.g. 02h 00h 00h 00h 00h 02h) are the
# <firstbyte> <opcode> <00h> <00h> <len/00h> <data/cks> compact form from the manual.
# ID1=control ID set on projector, ID2=model code (not stated for NP M323W).
# CKS = low byte of sum of all preceding bytes (see source checksum rule).

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
  notes: "No other command accepted during power-on sequence."

- id: power_off_016
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."

- id: input_sw_change_018
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal byte (DATA01). Source example uses 06h = video port. Full value list in Appendix 'Supplementary Information by Command' (not included in refined source)."

- id: picture_mute_on_020
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

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
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: string
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data03
      type: string
      description: "Adjustment value low-order 8 bits"
    - name: data04
      type: string
      description: "Adjustment value high-order 8 bits"

- id: volume_adjust_030_2
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data02
      type: string
      description: "Adjustment value low-order 8 bits"
    - name: data03
      type: string
      description: "Adjustment value high-order 8 bits"

- id: aspect_adjust_030_12
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Aspect value. Value list in Appendix 'Supplementary Information by Command' (not in refined source)."

- id: other_adjust_030_15
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "Target high byte (source shows DATA01=96h for LAMP ADJUST / LIGHT ADJUST)"
    - name: data02
      type: string
      description: "Target low byte (source shows DATA02=FFh)"
    - name: data03
      type: string
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data04
      type: string
      description: "Adjustment value low-order 8 bits"
    - name: data05
      type: string
      description: "Adjustment value high-order 8 bits"

- id: information_request_037
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name, lamp usage time (s), filter usage time (s). Updated at 1-min intervals."

- id: filter_usage_info_request_037_3
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (s) and filter alarm start time (s); -1 if undefined."

- id: lamp_information_request_037_4
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: string
      description: "Content: 01h=lamp usage time (s), 04h=lamp remaining life (%)"

- id: carbon_savings_info_request_037_6
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code_050
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Key code low byte (WORD type). See key code list."
    - name: data02
      type: string
      description: "Key code high byte. Examples: 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT, 0Dh 00h=HELP, 0Fh 00h=MAGNIFY UP, 10h 00h=MAGNIFY DOWN, 13h 00h=MUTE, 29h 00h=PICTURE, 4Bh 00h=COMPUTER1, 4Ch 00h=COMPUTER2, 4Fh 00h=VIDEO1, 51h 00h=S-VIDEO1, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN, 8Ah 00h=FREEZE, A3h 00h=ASPECT, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO"

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
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target. Source row shows 06h=Periphery Focus. Other target codes not enumerated in refined source."
    - name: data02
      type: string
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

- id: lens_control_request_053_1
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target (same codes as 053 LENS CONTROL)"

- id: lens_control_2_053_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Target (FFh=Stop; other target codes not enumerated in refined source)"
    - name: data02
      type: string
      description: "Mode: 00h=absolute, 02h=relative"
    - name: data03
      type: string
      description: "Adjustment value low-order 8 bits"
    - name: data04
      type: string
      description: "Adjustment value high-order 8 bits"

- id: lens_memory_control_053_3
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control_053_4
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET. Acts on profile set by 053-10."

- id: lens_memory_option_request_053_5
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set_053_6
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: string
      description: "Setting: 00h=OFF, 01h=ON"

- id: lens_information_request_053_7
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns lens operation status bitmap (lens memory / zoom / focus / lens shift H+V)."

- id: lens_profile_set_053_10
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Profile: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request_053_11
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3_060_1
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: string
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: setting_request_078_1
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type, sound function availability, profile/clock/sleep-timer function."

- id: running_status_request_078_2
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status, cooling process, power on/off process, operation status."

- id: input_status_request_078_3
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal types, test pattern, displayed content."

- id: mute_status_request_078_4
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture/sound/onscreen/forced-onscreen mute + onscreen display flags."

- id: model_name_request_078_5
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request_078_6
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control_079
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "01h=freeze ON, 02h=freeze OFF"

- id: information_string_request_084
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request_097_8
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco / Light / Lamp mode value. Value list in Appendix (not in refined source)."

- id: lan_projector_name_request_097_45
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_request_097_155
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_pbp_request_097_198
  label: PIP / Picture-by-Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request_097_243_1
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set_098_8
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Eco mode value. Value list in Appendix (not in refined source)."

- id: lan_projector_name_set_098_45
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
  params:
    - name: name
      type: string
      description: "Projector name, up to 16 bytes (DATA01-DATA16), NUL-terminated."

- id: pip_pbp_set_098_198
  label: PIP / Picture-by-Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: string
      description: "Setting value (depends on DATA01). MODE: 00h=PIP,01h=PbP. START POS: 00h=TL,01h=TR,02h=BL,03h=BR. Sub-input value list in Appendix."

- id: edge_blending_mode_set_098_243_1
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request_305_1
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request_305_2
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request_305_3
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, displayed content, signal types, video/sound mute, freeze status."

- id: audio_select_set_319_10
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal. Value list in Appendix (not in refined source)."
    - name: data02
      type: string
      description: "Setting: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Observable states returned by query responses (one entry per distinct state field).
- id: error_status
  type: bitmap
  description: "12-byte error bitmap from 009 ERROR STATUS REQUEST (cover/fan/temp/lamp/ formatter/FPGA/interlock/etc.)"

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  description: "From 078-2 RUNNING STATUS REQUEST DATA03-DATA06 and 305-3 DATA01"

- id: cooling_in_progress
  type: boolean
  description: "078-2 DATA04"

- id: power_process_in_progress
  type: boolean
  description: "078-2 DATA05"

- id: picture_mute
  type: enum
  values: [off, on]
  description: "078-4 DATA01"

- id: sound_mute
  type: enum
  values: [off, on]
  description: "078-4 DATA02"

- id: onscreen_mute
  type: enum
  values: [off, on]
  description: "078-4 DATA03"

- id: forced_onscreen_mute
  type: enum
  values: [off, on]
  description: "078-4 DATA04"

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  description: "078-6 DATA01"

- id: model_name
  type: string
  description: "078-5 DATA01-32"

- id: projector_name
  type: string
  description: "037 DATA01-49 and 097-45 DATA01-17"

- id: lamp_usage_time_seconds
  type: integer
  description: "037 DATA83-86, 037-4 DATA03-06"

- id: lamp_remaining_life_percent
  type: integer
  description: "037-4 (DATA02=04h). Negative if replacement deadline exceeded."

- id: filter_usage_time_seconds
  type: integer
  description: "037-3 DATA01-04"

- id: filter_alarm_start_time_seconds
  type: integer
  description: "037-3 DATA05-08 (-1 if undefined)"

- id: mac_address
  type: string
  description: "097-155 DATA01-06"

- id: serial_number
  type: string
  description: "305-2 DATA01-16"

- id: base_model_type
  type: string
  description: "305-1 DATA01-02 / DATA12-13"

- id: eco_mode
  type: enum
  description: "097-8. Value list in Appendix (not in refined source)."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: "097-243-1 DATA01"

- id: lens_operation_status
  type: bitmap
  description: "053-7 DATA01 (lens memory/zoom/focus/shift H/shift V operation flags)"

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: "053-11 DATA01"

- id: lens_adjustment_range
  type: object
  description: "053-1 returns upper/lower limit + current value (16-bit) per lens target."

- id: gain_parameter
  type: object
  description: "060-1 returns status, upper/lower/default/current/wide/narrow widths + default-valid flag per gain name."

- id: input_signal_status
  type: object
  description: "078-3 returns signal switch process, list number, signal types, test pattern, displayed content."

- id: displayed_content
  type: enum
  description: "305-3 DATA02 (video / no signal / viewer / test pattern / LAN / etc.)"

- id: freeze_status
  type: enum
  values: [off, on]
  description: "305-3 DATA09"
```

## Variables
```yaml
# Settable parameters that are not discrete actions (covered by SET/ADJUST actions above
# but listed here as the controllable variables):
- id: brightness
  type: integer
  description: "Via 030-1 (DATA01=00h) / readable via 060-1"
- id: contrast
  type: integer
  description: "Via 030-1 (DATA01=01h)"
- id: color
  type: integer
  description: "Via 030-1 (DATA01=02h)"
- id: hue
  type: integer
  description: "Via 030-1 (DATA01=03h)"
- id: sharpness
  type: integer
  description: "Via 030-1 (DATA01=04h)"
- id: volume
  type: integer
  description: "Via 030-2"
- id: aspect
  type: enum
  description: "Via 030-12. Values in Appendix (not in refined source)."
- id: lamp_light_adjust
  type: integer
  description: "Via 030-15 (DATA01=96h)"
- id: eco_mode_value
  type: enum
  description: "Via 098-8. Values in Appendix (not in refined source)."
- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]
  description: "Via 098-198 (DATA01=00h)"
- id: pip_pbp_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]
  description: "Via 098-198 (DATA01=01h)"
- id: edge_blending
  type: enum
  values: [off, on]
  description: "Via 098-243-1"
```

## Events
```yaml
# No unsolicited notifications documented. All responses are solicited replies to commands.
# UNRESOLVED: source does not document any push/event mechanism.
```

## Macros
```yaml
# No explicit multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON (015): no other command accepted during power-on sequence."
  - "POWER OFF (016): no other command accepted during power-off incl. cooling time."
  - "Picture/Sound/Onscreen mute auto-clear on input terminal switch or video signal switch."
  - "Sound mute also clears on volume adjustment."
  - "LENS CONTROL (053): after 7Fh/81h continuous drive, must send 00h to stop."
# UNRESOLVED: no explicit power-on sequencing interlock or safety certification
# values stated. Error bitmap (009) reports interlock-switch-open and cover errors
# but no operator procedure is documented.
```

## Notes
- Command framing: full frame is `<firstbyte> <ID1> <ID2> <LEN> <DATA...> <CKS>`. ID1 = control ID set on projector; ID2 = model code (model-specific, **not stated for NP M323W in refined source**). CKS = low byte of sum of all preceding bytes.
- Source shows compact 6-byte forms (e.g. `02h 00h 00h 00h 00h 02h`) — these are the `<firstbyte> <opcode> <00h> <00h> <len> <cks>` representation before ID1/ID2 insertion per manual section 2.1.
- Response first byte encodes class: `2xh` success (no/echoed data), `Axh` error (carries ERR1/ERR2).
- Lamp/filter usage time updated at 1-minute intervals despite 1-second resolution.
- Lamp remaining life (%) returns negative if replacement deadline exceeded.
- Many value lists (input terminal codes, aspect values, eco mode values, sub-input values, base model types) live in an Appendix "Supplementary Information by Command" **not present in the refined source**.

<!-- UNRESOLVED: ID2 model code for NP M323W not stated. -->
<!-- UNRESOLVED: factory-default baud rate not stated (5 selectable). -->
<!-- UNRESOLVED: flow_control not stated (RTS/CTS pins present in pinout, role unclear). -->
<!-- UNRESOLVED: full input terminal / aspect / eco mode / sub-input / base model type value lists require Appendix not in refined source. -->
<!-- UNRESOLVED: lens target byte values for 053/053-2 only partially enumerated (06h=Periphery Focus; FFh=Stop on 053-2). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: model name "NP M323W" supplied by operator; generic manual covers multiple Sharp/NEC projector models. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:39:28.121Z
last_checked_at: 2026-06-18T08:34:44.791Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:34:44.791Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name \"NP M323W\" supplied by operator, not printed verbatim in source manual (generic multi-model reference). ID2 model code not stated for this model."
- "flow control not stated in source"
- "baud rate has 5 selectable values, source does not state which is default/factory. baud_rate above uses highest as placeholder."
- "source lists \"Communication mode: Full duplex\" but no flow_control (RTS/CTS hardware lines present in pinout, usage unstated)."
- "source does not document any push/event mechanism."
- "no explicit power-on sequencing interlock or safety certification"
- "ID2 model code for NP M323W not stated."
- "factory-default baud rate not stated (5 selectable)."
- "flow_control not stated (RTS/CTS pins present in pinout, role unclear)."
- "full input terminal / aspect / eco mode / sub-input / base model type value lists require Appendix not in refined source."
- "lens target byte values for 053/053-2 only partially enumerated (06h=Periphery Focus; FFh=Stop on 053-2)."
- "firmware version compatibility not stated."
- "model name \"NP M323W\" supplied by operator; generic manual covers multiple Sharp/NEC projector models."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
