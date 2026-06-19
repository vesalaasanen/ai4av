---
spec_id: admin/sharp-nec-led-fe019i2-165in
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FE019I2 165IN Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FE019I2 165IN"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FE019I2 165IN"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:01:52.949Z
last_checked_at: 2026-06-18T08:07:18.960Z
generated_at: 2026-06-18T08:07:18.960Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model types, eco mode values, sub input values) is referenced but not included in the refined source excerpt; several command parameter enumerations are therefore incomplete."
  - "firmware version compatibility not stated in source"
  - "model code (ID2) value for this specific model not stated in source"
  - "flow control not stated; source lists \"Full duplex\" communication mode only"
  - "enum list in Appendix"
  - "no unsolicited notification / push event mechanism described in source."
  - "no multi-step sequences described explicitly in source."
  - "authority/auth model not described further"
  - "Appendix \"Supplementary Information by Command\" not present in refined source — input terminal values, aspect values, base model types, eco mode values, and sub input values cannot be enumerated."
  - "model code (ID2) for this specific model not stated."
  - "firmware version compatibility not stated."
  - "serial flow_control not specified (only \"Full duplex\" communication mode listed)."
  - "no auth/login procedure described, but error code 02h/0Fh (\"no authority for operation\") implies some authority model exists — details not documented in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:07:18.960Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FE019I2 165IN Control Spec

## Summary
Large-format LED projector (165") controlled via Sharp/NEC's binary hex control protocol over RS-232C serial or wired/wireless LAN (TCP). This spec covers the command set documented in the Projector Control Command Reference Manual (BDT140013 Revision 7.1), including power, input switching, mute, picture/volume/aspect adjust, lens control and memory, status queries, eco mode, edge blending, and PIP/PbP control. Commands are framed hex sequences terminated by a one-byte additive checksum (low-order byte of sum of all preceding bytes).

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal values, aspect values, base model types, eco mode values, sub input values) is referenced but not included in the refined source excerpt; several command parameter enumerations are therefore incomplete. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: model code (ID2) value for this specific model not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists supported set: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; source lists "Full duplex" communication mode only
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON / POWER OFF commands present
  - routable        # inferred: INPUT SW CHANGE command present
  - queryable       # inferred: many status request commands present
  - levelable       # inferred: PICTURE ADJUST, VOLUME ADJUST, LAMP/LIGHT ADJUST present
```

## Actions
```yaml
# Frame convention (from source §2.1-2.2):
#   <Header> <Cmd> 00h 00h <LEN> <DATA...> <CKS>
# Header byte selects command class (00h/01h/02h/03h). Success response header =
# command header + 20h (e.g. 02h -> 22h). Error response header = command header + A0h
# (e.g. 02h -> A2h). Responses carry <ID1> <ID2> (projector control ID + model code)
# and end with <ERR1> <ERR2> <CKS> on error. CKS = low-order byte of sum of all
# preceding bytes (see checksum example in source §2.2).

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

- id: power_off_016
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change_018
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Input terminal byte (e.g. 06h = video port); full value list in Appendix "Supplementary Information by Command"
    - name: cks
      type: string
      description: Checksum byte = low-order byte of sum of all preceding bytes

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
      description: Adjustment target (00h=Brightness,01h=Contrast,02h=Color,03h=Hue,04h=Sharpness)
    - name: data02
      type: string
      description: Adjustment mode (00h=absolute,01h=relative)
    - name: data03
      type: string
      description: Adjustment value low-order 8 bits
    - name: data04
      type: string
      description: Adjustment value high-order 8 bits
    - name: cks
      type: string
      description: Checksum byte

- id: volume_adjust_030_2
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: Adjustment mode (00h=absolute,01h=relative)
    - name: data02
      type: string
      description: Adjustment value low-order 8 bits
    - name: data03
      type: string
      description: Adjustment value high-order 8 bits
    - name: cks
      type: string
      description: Checksum byte

- id: aspect_adjust_030_12
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: Value set for the aspect; full list in Appendix "Supplementary Information by Command"
    - name: cks
      type: string
      description: Checksum byte

- id: other_adjust_030_15
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: Adjustment target high byte (96h for LAMP ADJUST / LIGHT ADJUST)
    - name: data02
      type: string
      description: Adjustment target low byte (FFh for LAMP/LIGHT ADJUST per source table)
    - name: data03
      type: string
      description: Adjustment mode (00h=absolute,01h=relative)
    - name: data04
      type: string
      description: Adjustment value low-order 8 bits
    - name: data05
      type: string
      description: Adjustment value high-order 8 bits
    - name: cks
      type: string
      description: Checksum byte

- id: information_request_037
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request_037_3
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3_037_4
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: Lamp selector (00h=Lamp 1,01h=Lamp 2; Lamp 2 only on two-lamp models)
    - name: data02
      type: string
      description: Content (01h=lamp usage time seconds,04h=lamp remaining life %)
    - name: cks
      type: string
      description: Checksum byte

- id: carbon_savings_information_request_037_6
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Content (00h=Total Carbon Savings,01h=Carbon Savings during operation)
    - name: cks
      type: string
      description: Checksum byte

- id: remote_key_code_050
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: Key code low byte (WORD-type key code; see Key code list in source §3.19)
    - name: data02
      type: string
      description: Key code high byte (typically 00h)
    - name: cks
      type: string
      description: Checksum byte

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
      description: Lens target (e.g. 06h=Periphery Focus)
    - name: data02
      type: string
      description: Drive command (00h=Stop,01h=+1s,02h=+0.5s,03h=+0.25s,7Fh=+continuous,81h=-continuous,FDh=-0.25s,FEh=-0.5s,FFh=-1s)
    - name: cks
      type: string
      description: Checksum byte

- id: lens_control_request_053_1
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: Lens target to query
    - name: cks
      type: string
      description: Checksum byte

- id: lens_control_2_053_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: Lens target (FFh=Stop)
    - name: data02
      type: string
      description: Adjustment mode (00h=absolute,02h=relative)
    - name: data03
      type: string
      description: Adjustment value low-order 8 bits
    - name: data04
      type: string
      description: Adjustment value high-order 8 bits
    - name: cks
      type: string
      description: Checksum byte

- id: lens_memory_control_053_3
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Operation (00h=MOVE,01h=STORE,02h=RESET)
    - name: cks
      type: string
      description: Checksum byte

- id: reference_lens_memory_control_053_4
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Operation (00h=MOVE,01h=STORE,02h=RESET); acts on profile set via 053-10
    - name: cks
      type: string
      description: Checksum byte

- id: lens_memory_option_request_053_5
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Option (00h=LOAD BY SIGNAL,01h=FORCED MUTE)
    - name: cks
      type: string
      description: Checksum byte

- id: lens_memory_option_set_053_6
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: Option (00h=LOAD BY SIGNAL,01h=FORCED MUTE)
    - name: data02
      type: string
      description: Setting value (00h=OFF,01h=ON)
    - name: cks
      type: string
      description: Checksum byte

- id: lens_information_request_053_7
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set_053_10
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Profile number (00h=Profile 1,01h=Profile 2)
    - name: cks
      type: string
      description: Checksum byte

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
      description: Adjusted value name (00h=BRIGHTNESS,01h=CONTRAST,02h=COLOR,03h=HUE,04h=SHARPNESS,05h=VOLUME,96h=LAMP/LIGHT ADJUST)
    - name: cks
      type: string
      description: Checksum byte

- id: setting_request_078_1
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request_078_2
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request_078_3
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request_078_4
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

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

- id: freeze_control_079
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Freeze state (01h=On,02h=Off)
    - name: cks
      type: string
      description: Checksum byte

- id: information_string_request_084
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: Information type (03h=Horizontal sync frequency,04h=Vertical sync frequency)
    - name: cks
      type: string
      description: Checksum byte

- id: eco_mode_request_097_8
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request_097_45
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2_097_155
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_pbp_request_097_198
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Target (00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3)
    - name: cks
      type: string
      description: Checksum byte

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
      description: Eco mode value; full list in Appendix "Supplementary Information by Command"
    - name: cks
      type: string
      description: Checksum byte

- id: lan_projector_name_set_098_45
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01..16} 00h {cks}"
  params:
    - name: data01_16
      type: string
      description: Projector name bytes (up to 16 bytes, NUL-terminated)
    - name: cks
      type: string
      description: Checksum byte

- id: pip_pbp_set_098_198
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: Target (00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3)
    - name: data02
      type: string
      description: Setting value (enum depends on DATA01; e.g. MODE: 00h=PIP,01h=PbP; START POSITION: 00h-03h corners)
    - name: cks
      type: string
      description: Checksum byte

- id: edge_blending_mode_set_098_243_1
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Setting value (00h=OFF,01h=ON)
    - name: cks
      type: string
      description: Checksum byte

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

- id: audio_select_set_319_10
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: Input terminal; full list in Appendix "Supplementary Information by Command"
    - name: data02
      type: string
      description: Setting value (00h=terminal specified in DATA01,01h=BNC,02h=COMPUTER)
    - name: cks
      type: string
      description: Checksum byte
```

## Feedbacks
```yaml
# Each query command produces a framed response with a data payload. Response frame
# shape: <resp_header> <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS> (success) or
# <err_header> <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS> (error).
# resp_header = command_header + 20h ; err_header = command_header + A0h.

- id: error_status
  type: bitmap
  source_query: error_status_request_009
  description: 12 bytes (DATA01-DATA12) of error bits; bit=0 normal, bit=1 error. Covers cover/fan/temperature/power/lamp/formatter/mirror-cover/interlock/system errors.

- id: lamp_info
  type: composite
  source_query: lamp_information_request_3_037_4
  description: 4-byte value; interpretation per requested content (usage seconds or remaining-life %)

- id: power_status
  type: enum
  values: [standby, power_on]
  source_query: running_status_request_078_2
  description: DATA03 of RUNNING STATUS response (00h=Standby,01h=Power on,FFh=Not supported)

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source_query: running_status_request_078_2
  description: DATA06 (00h=Standby Sleep,04h=Power on,05h=Cooling,06h=Standby error,0Fh=Standby Power saving,10h=Network standby)

- id: mute_status
  type: composite
  source_query: mute_status_request_078_4
  description: DATA01=Picture mute, DATA02=Sound mute, DATA03=Onscreen mute, DATA04=Forced onscreen mute, DATA05=Onscreen display

- id: cover_status
  type: enum
  values: [normal_open, closed]
  source_query: cover_status_request_078_6

- id: lens_operation_status
  type: bitmap
  source_query: lens_information_request_053_7
  description: DATA01 bits - Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V (0=Stop,1=During operation)

- id: gain_parameter
  type: composite
  source_query: gain_parameter_request_3_060_1
  description: Adjustment range, default, current, wide/narrow adjustment widths

- id: eco_mode_value
  type: enum
  source_query: eco_mode_request_097_8
  description: Light mode / Lamp mode value; full value list in Appendix <!-- UNRESOLVED -->

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source_query: edge_blending_mode_request_097_243_1

- id: pip_pbp_value
  type: composite
  source_query: pip_pbp_request_097_198

- id: projector_name
  type: string
  source_query: lan_projector_name_request_097_45

- id: mac_address
  type: string
  source_query: lan_mac_address_status_request_2_097_155

- id: model_name
  type: string
  source_query: model_name_request_078_5

- id: serial_number
  type: string
  source_query: serial_number_request_305_2

- id: base_model_type
  type: composite
  source_query: base_model_type_request_305_1

- id: input_status
  type: composite
  source_query: input_status_request_078_3
  description: Signal switch process, signal list number, selection signal type 1 & 2, signal list type, test pattern, content displayed

- id: basic_information
  type: composite
  source_query: basic_information_request_305_3
  description: Operation status, content displayed, signal types, video/sound/onscreen mute, freeze status

- id: information_string
  type: string
  source_query: information_string_request_084
  description: Horizontal/vertical synchronous frequency strings

- id: error_response
  type: composite
  description: Universal error frame <err_header> <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>; ERR1/ERR2 codes per source §2.4
```

## Variables
```yaml
- id: brightness
  type: integer
  description: Picture brightness; adjusted via picture_adjust_030_1 (DATA01=00h)
- id: contrast
  type: integer
  description: Picture contrast; adjusted via picture_adjust_030_1 (DATA01=01h)
- id: color
  type: integer
  description: Picture color; adjusted via picture_adjust_030_1 (DATA01=02h)
- id: hue
  type: integer
  description: Picture hue; adjusted via picture_adjust_030_1 (DATA01=03h)
- id: sharpness
  type: integer
  description: Picture sharpness; adjusted via picture_adjust_030_1 (DATA01=04h)
- id: volume
  type: integer
  description: Sound volume; adjusted via volume_adjust_030_2
- id: lamp_light_adjust
  type: integer
  description: Lamp/Light adjust; adjusted via other_adjust_030_15 (DATA01=96h)
- id: aspect
  type: enum
  description: Aspect ratio value; set via aspect_adjust_030_12 <!-- UNRESOLVED: enum list in Appendix -->
- id: eco_mode
  type: enum
  description: Eco/Light/Lamp mode; set via eco_mode_set_098_8 <!-- UNRESOLVED: enum list in Appendix -->
- id: projector_name_lan
  type: string
  description: LAN projector name (up to 16 bytes); set via lan_projector_name_set_098_45
- id: freeze
  type: enum
  values: [on, off]
  description: Freeze state; set via freeze_control_079
- id: shutter
  type: enum
  values: [closed, open]
  description: Lens shutter; set via shutter_close_051 / shutter_open_052
- id: edge_blending
  type: enum
  values: [off, on]
  description: Edge blending mode; set via edge_blending_mode_set_098_243_1
- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: Reference lens memory profile; set via lens_profile_set_053_10
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification / push event mechanism described in source.
# All responses are solicited (returned after a command is sent).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on_015
    note: "While this command is turning on the power, no other command can be accepted. (source §3.2)"
  - command: power_off_016
    note: "While this command is turning off the power (including the cooling time), no other command can be accepted. (source §3.3)"
  - command: picture_mute_on_020
    note: "Picture mute is turned off by input terminal switch or video signal switch. (source §3.5)"
  - command: sound_mute_on_022
    note: "Sound mute is turned off by input terminal switch, video signal switch, or sound volume adjustment. (source §3.7)"
  - command: onscreen_mute_on_024
    note: "Onscreen mute is turned off by input terminal switch or video signal switch. (source §3.9)"
# Error code 02h/0Dh: "The command cannot be accepted because the power is off." (source §2.4)
# Error code 02h/0Fh: "There is no authority necessary for the operation." (source §2.4) <!-- UNRESOLVED: authority/auth model not described further -->
```

## Notes
- **Reference manual:** BDT140013 Revision 7.1.
- **Checksum:** CKS = low-order one byte (8 bits) of the sum of all preceding bytes in the frame. Worked example from source: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- **Frame structure:** `<Header> <Cmd> 00h 00h <LEN> <DATA...> <CKS>`. Header byte (00h/01h/02h/03h) indicates command class. Success response header = command header + 20h. Error response header = command header + A0h. Responses carry `<ID1>` (control ID set on projector) and `<ID2>` (model code, varies by model).
- **Power-state gating:** many commands return error `02h 0Dh` ("command cannot be accepted because the power is off").
- **Usage time granularity:** lamp/filter usage time returned in one-second units but updated at one-minute intervals.
- **Lamp remaining life:** returns negative percentage when lamp replacement deadline is exceeded.
- **Two-lamp models:** DATA01=01h (Lamp 2) in lamp commands effective only on two-lamp projector models.
- **Signal list number:** response value is one less than the practical number; add 1 to obtain the practical number.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not present in refined source — input terminal values, aspect values, base model types, eco mode values, and sub input values cannot be enumerated. -->
<!-- UNRESOLVED: model code (ID2) for this specific model not stated. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: serial flow_control not specified (only "Full duplex" communication mode listed). -->
<!-- UNRESOLVED: no auth/login procedure described, but error code 02h/0Fh ("no authority for operation") implies some authority model exists — details not documented in source. -->
````

Spec written. 53 actions = full source enumeration. Dual transport (serial + tcp:7142), no fabricated values, all gaps marked `UNRESOLVED`. Caveat: Appendix "Supplementary Information by Command" missing from refined excerpt → input/aspect/eco-mode enum values incomplete.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:01:52.949Z
last_checked_at: 2026-06-18T08:07:18.960Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:07:18.960Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model types, eco mode values, sub input values) is referenced but not included in the refined source excerpt; several command parameter enumerations are therefore incomplete."
- "firmware version compatibility not stated in source"
- "model code (ID2) value for this specific model not stated in source"
- "flow control not stated; source lists \"Full duplex\" communication mode only"
- "enum list in Appendix"
- "no unsolicited notification / push event mechanism described in source."
- "no multi-step sequences described explicitly in source."
- "authority/auth model not described further"
- "Appendix \"Supplementary Information by Command\" not present in refined source — input terminal values, aspect values, base model types, eco mode values, and sub input values cannot be enumerated."
- "model code (ID2) for this specific model not stated."
- "firmware version compatibility not stated."
- "serial flow_control not specified (only \"Full duplex\" communication mode listed)."
- "no auth/login procedure described, but error code 02h/0Fh (\"no authority for operation\") implies some authority model exists — details not documented in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
