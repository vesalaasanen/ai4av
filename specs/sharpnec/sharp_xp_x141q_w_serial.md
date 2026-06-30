---
spec_id: admin/sharp-nec-xp-x141q-w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Xp X141Q W Control Spec"
manufacturer: Sharp/NEC
model_family: "Xp X141Q W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Xp X141Q W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:28:30.614Z
last_checked_at: 2026-06-19T07:53:03.544Z
generated_at: 2026-06-19T07:53:03.544Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value codes (DATA01 of 018, 319-10) reference an Appendix \"Supplementary Information by Command\" not present in source. Eco mode values, aspect values, base model type values, and sub-input setting values also reference that missing Appendix."
  - "flow_control not stated; full-duplex mode stated"
  - "other target codes not in this source\""
  - "full code list not in this source\""
  - "none additional identified in source"
  - "no event/notification mechanism described in source"
  - "no macros described in source"
  - "source contains no explicit power-on sequencing procedure,"
  - "source repeatedly references an Appendix \"Supplementary Information by Command\" for value code lists (input terminal codes for 018/319-10, aspect values for 030-12, eco mode values for 097-8/098-8, base model type values for 078-1/305-1, sub-input setting values for 097-198/098-198, selection signal type details). That Appendix is not present in the refined source document."
  - "firmware version compatibility not stated in source"
  - "default baud rate not stated (5 options listed, no default marked)"
  - "flow control not stated"
  - "ID2 model code value for Xp X141Q W not stated (varies by model)"
  - "wireless LAN unit compatibility / protocol details deferred to separate operation manual"
verification:
  verdict: verified
  checked_at: 2026-06-19T07:53:03.544Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action commands matched verbatim to source; transport parameters verified; full bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Xp X141Q W Control Spec

## Summary
Sharp/NEC Xp X141Q W projector control spec covering RS-232C serial and wired/wireless LAN (TCP) interfaces. Binary command protocol with hex-byte frames, checksum byte (sum of preceding bytes mod 256), and fixed 6-byte command header. Covers power, input switching, mutes, lens/shutter, picture/volume adjust, status queries, eco mode, edge blending, and PIP/PbP control.

<!-- UNRESOLVED: input terminal value codes (DATA01 of 018, 319-10) reference an Appendix "Supplementary Information by Command" not present in source. Eco mode values, aspect values, base model type values, and sub-input setting values also reference that missing Appendix. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps as switchable; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow_control not stated; full-duplex mode stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: 015 POWER ON / 016 POWER OFF commands
  - queryable      # inferred: numerous query commands (009, 037, 078-*, 305-*, etc.)
  - levelable      # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST
  - routable       # inferred: 018 INPUT SW CHANGE
```

## Actions
```yaml
- id: error_status_request_009
  label: Error Status Request (009)
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on_015
  label: Power On (015)
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off_016
  label: Power Off (016)
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change_018
  label: Input Switch Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal byte (e.g. 06h = video port). Full code list in source Appendix 'Supplementary Information by Command' - not present in this source. # UNRESOLVED"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: picture_mute_on_020
  label: Picture Mute On (020)
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off_021
  label: Picture Mute Off (021)
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on_022
  label: Sound Mute On (022)
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off_023
  label: Sound Mute Off (023)
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on_024
  label: Onscreen Mute On (024)
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off_025
  label: Onscreen Mute Off (025)
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust_030_1
  label: Picture Adjust (030-1)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data03
      type: string
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: string
      description: "Adjustment value (high-order 8 bits)"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: volume_adjust_030_2
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data02
      type: string
      description: "Adjustment value (low-order 8 bits)"
    - name: data03
      type: string
      description: "Adjustment value (high-order 8 bits)"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: aspect_adjust_030_12
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Aspect value byte. Code list in source Appendix 'Supplementary Information by Command' - not present in this source. # UNRESOLVED"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: other_adjust_030_15
  label: Other Adjust (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target MSB; pair (DATA01,DATA02). Documented target: 96h/FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: data02
      type: string
      description: "Adjustment target LSB (e.g. FFh for LAMP/LIGHT ADJUST)"
    - name: data03
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: string
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: string
      description: "Adjustment value (high-order 8 bits)"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: information_request_037
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request_037_3
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_037_4
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: string
      description: "Content: 01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: carbon_savings_information_request_037_6
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Type: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: remote_key_code_050
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Key code low byte (WORD type). E.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: data02
      type: string
      description: "Key code high byte (00h for all listed codes)"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: shutter_close_051
  label: Shutter Close (051)
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open_052
  label: Shutter Open (052)
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control_053
  label: Lens Control (053)
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target. Source documents 06h=Periphery Focus. # UNRESOLVED: other target codes not in this source"
    - name: data02
      type: string
      description: "Motion: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus dir, 81h=minus dir, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: lens_control_request_053_1
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target (same code space as 053 LENS CONTROL). # UNRESOLVED: full code list not in this source"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: lens_control_2_053_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target; FFh=Stop (mode/value ignored when Stop)"
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: string
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: string
      description: "Adjustment value (high-order 8 bits)"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: lens_memory_control_053_3
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: reference_lens_memory_control_053_4
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET (applies to profile set via 053-10)"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: lens_memory_option_request_053_5
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: lens_memory_option_set_053_6
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: string
      description: "Setting: 00h=OFF, 01h=ON"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: lens_information_request_053_7
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set_053_10
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: lens_profile_request_053_11
  label: Lens Profile Request (053-11)
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_060_1
  label: Gain Parameter Request 3 (060-1)
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: setting_request_078_1
  label: Setting Request (078-1)
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request_078_2
  label: Running Status Request (078-2)
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request_078_3
  label: Input Status Request (078-3)
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request_078_4
  label: Mute Status Request (078-4)
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request_078_5
  label: Model Name Request (078-5)
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request_078_6
  label: Cover Status Request (078-6)
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control_079
  label: Freeze Control (079)
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "01h=freeze on, 02h=freeze off"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: information_string_request_084
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: eco_mode_request_097_8
  label: Eco Mode Request (097-8)
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request_097_45
  label: LAN Projector Name Request (097-45)
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_097_155
  label: LAN MAC Address Status Request 2 (097-155)
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_pbp_request_097_198
  label: PIP/Picture by Picture Request (097-198)
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Parameter: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: edge_blending_mode_request_097_243_1
  label: Edge Blending Mode Request (097-243-1)
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set_098_8
  label: Eco Mode Set (098-8)
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Eco mode value byte. Code list in source Appendix 'Supplementary Information by Command' - not present in this source. # UNRESOLVED"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: lan_projector_name_set_098_45
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01}-{data16} 00h {cks}"
  params:
    - name: data01_to_data16
      type: string
      description: "Projector name (up to 16 bytes)"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: pip_pbp_set_098_198
  label: PIP/Picture by Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Parameter: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: string
      description: "Setting value (varies by DATA01: MODE: 00h=PIP/01h=PbP; START POSITION: 00h=TOP-LEFT/01h=TOP-RIGHT/02h=BOTTOM-LEFT/03h=BOTTOM-RIGHT; SUB INPUT codes in source Appendix - not present. # UNRESOLVED)"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: edge_blending_mode_set_098_243_1
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."

- id: base_model_type_request_305_1
  label: Base Model Type Request (305-1)
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request_305_2
  label: Serial Number Request (305-2)
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request_305_3
  label: Basic Information Request (305-3)
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set_319_10
  label: Audio Select Set (319-10)
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal byte. Code list in source Appendix 'Supplementary Information by Command' - not present in this source. # UNRESOLVED"
    - name: data02
      type: string
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
    - name: cks
      type: string
      description: "Checksum byte = sum of all preceding bytes, low-order 8 bits."
```

## Feedbacks
```yaml
# All queries return a response frame. Success responses begin with 2Xh, error
# responses begin with AXh. Format: "<resp_msb> <cmd_lsb> <ID1> <ID2> <LEN> <DATA...> <CKS>"
# ID1 = projector control ID, ID2 = model code (both returned by device).
# Below are documented response payloads per query:

- id: error_status_response
  type: bytes
  description: "009 response: 20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>. DATA01-12 = error bitfields (bit=0 normal, bit=1 error). See source for full bit map (cover/fan/temp/lamp/formatter/mirror cover/etc.)."

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  description: "078-2 DATA03: 00h=Standby, 01h=Power on; 078-2 DATA06: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

- id: cooling_process
  type: enum
  values: [not_executed, during_execution, not_supported]
  description: "078-2 DATA04: 00h=Not executed, 01h=During execution, FFh=Not supported"

- id: power_on_off_process
  type: enum
  values: [not_executed, during_execution, not_supported]
  description: "078-2 DATA05: 00h=Not executed, 01h=During execution, FFh=Not supported"

- id: mute_status
  type: composite
  description: "078-4 response: DATA01=Picture mute, DATA02=Sound mute, DATA03=Onscreen mute, DATA04=Forced onscreen mute, DATA05=Onscreen display (each 00h=Off/01h=On or Not displayed/Displayed)"

- id: cover_status
  type: enum
  values: [normal_open, closed]
  description: "078-6 DATA01: 00h=Normal (cover opened), 01h=Cover closed"

- id: lamp_info
  type: composite
  description: "037-4 response: DATA03-06 = lamp usage time (seconds) or remaining life (%) per DATA02 request. Negative remaining life if replacement deadline exceeded."

- id: filter_info
  type: composite
  description: "037-3 response: DATA01-04=Filter usage time (seconds), DATA05-08=Filter alarm start time (seconds). -1 if undefined."

- id: carbon_savings
  type: composite
  description: "037-6 response: DATA02-05=Carbon Savings (kg, max 99999), DATA06-09=Carbon Savings (mg, max 999999)"

- id: lens_position
  type: composite
  description: "053-1 response: DATA02-03=upper limit, DATA04-05=lower limit, DATA06-07=current value (16-bit signed)"

- id: lens_operation_status
  type: bitmask
  description: "053-7 response DATA01: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V) (0=Stop, 1=During operation)"

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: "053-11 response DATA01: 00h=Profile 1, 01h=Profile 2"

- id: gain_parameter
  type: composite
  description: "060-1 response: DATA01=status(00h display N/A, 01h adjust N/A, 02h OK, FFh no such gain), DATA02-09=limits/default/current, DATA10-13=wide/narrow adjustment widths, DATA14=default validity"

- id: eco_mode_value
  type: raw
  description: "097-8 response DATA01: eco/light/lamp mode value. Code list in source Appendix - not present. # UNRESOLVED"

- id: projector_name
  type: string
  description: "097-45 response DATA01-17 / 098-45 echoes name. NUL-terminated."

- id: mac_address
  type: bytes
  description: "097-155 response DATA01-06: MAC address (6 bytes)"

- id: pip_pbp_value
  type: composite
  description: "097-198 response DATA02: varies by queried param (MODE/START POSITION/SUB INPUT)"

- id: edge_blending_value
  type: enum
  values: [off, on]
  description: "097-243-1 response DATA01: 00h=OFF, 01h=ON"

- id: model_name
  type: string
  description: "078-5 response DATA01-32: model name, NUL-terminated"

- id: base_model_type
  type: composite
  description: "305-1 response: DATA01-02=base model type, DATA03-11=model name, DATA12-13=base model type. Code list in source Appendix - not present. # UNRESOLVED"

- id: serial_number
  type: string
  description: "305-2 response DATA01-16: serial number, NUL-terminated"

- id: basic_information
  type: composite
  description: "305-3 response: DATA01=operation status, DATA02=content displayed, DATA03-04=signal types, DATA05=display signal type, DATA06=video mute, DATA07=sound mute, DATA08=onscreen mute, DATA09=freeze status"

- id: projector_information
  type: composite
  description: "037 response: DATA01-49=Projector name, DATA83-86=Lamp usage time (seconds), DATA87-90=Filter usage time (seconds). Updated at 1-minute intervals."

- id: input_switch_result
  type: enum
  values: [success, ended_with_error_no_signal]
  description: "018 response DATA01: FFh = ended with error (no signal switch)"

- id: remote_key_result
  type: enum
  values: [success, error]
  description: "050 response DATA01: FFh = ended with error"

- id: adjust_result
  type: enum
  values: [success, error]
  description: "030-1/030-2/030-12/030-15 response DATA01-02: 0000h=success, other=error"

- id: sync_frequency
  type: string
  description: "084 response DATA03-??: horizontal (DATA01=03h) or vertical (DATA01=04h) sync frequency string, NUL-terminated"

- id: setting_info
  type: composite
  description: "078-1 response: DATA01-03=base model type, DATA04=sound function(00h N/A, 01h available), DATA05=profile number(00h none, 01h clock, 02h sleep timer, 03h both)"
```

## Variables
```yaml
# Settable parameters not covered as discrete actions are embedded in the
# parameterized Actions above (picture/volume/lens gains, eco mode, projector
# name, edge blending, PIP/PbP). No additional standalone variables documented.
# UNRESOLVED: none additional identified in source
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are replies to
# commands. # UNRESOLVED: no event/notification mechanism described in source
```

## Macros
```yaml
# Source documents no explicit multi-step command sequences.
# UNRESOLVED: no macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes:
  - "Power on/off commands block all other commands during execution (015 blocks during power-on; 016 blocks during power-off including cooling time)."
  - "Command 02 0Dh error code = 'command cannot be accepted because the power is off'."
  - "Error status (009) reports safety-relevant bits: cover error, fan error, temperature error, lamp off/replacement moratorium, mirror cover error, foreign matter sensor, interlock switch open (DATA09 Bit1), system errors."
  - "DATA09 Bit1 'interlock switch is open' is a safety interlock signal reported via query, not a command-side interlock procedure."
# UNRESOLVED: source contains no explicit power-on sequencing procedure,
# confirmation-required list, or command-side interlock enforcement beyond
# the power-state blocking noted above.
```

## Notes
- Binary protocol. All commands/responses are hex byte sequences. Format illustration from source §2.1: `20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>`.
- **Checksum (CKS):** sum all preceding bytes, take low-order 8 bits. Example from source: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- **Common parameters:** `ID1` = control ID (projector setting), `ID2` = model code (varies by model), `LEN` = data length following LEN byte, `DATA??` = variable data, `ERR1/ERR2` = response error codes.
- **Response framing:** success responses begin with `2Xh` (20h/21h/22h/23h); error responses begin with `AXh` (A0h/A1h/A2h/A3h). First byte high nibble 2 = OK, A = error.
- **Baud rate:** source lists 115200/38400/19200/9600/4800 bps as switchable; no single default stated. Used 115200 as representative in transport block.
- **Flow control:** not stated; communication mode is full-duplex.
- **Lamp usage/filter usage:** returned in seconds, updated at 1-minute intervals.
- **Two-lamp models:** DATA01=01h (Lamp 2) effective only on two-lamp projector models.
- **Power state machine** (from 078-2/305-3): Standby(Sleep) → Power on → Cooling → Standby; plus Standby(error), Standby(Power saving), Network standby.
- Commands `02 0Dh` error = power off; `02 0Eh` = execution failed; `02 0Fh` = no authority; `00 00h` = unrecognized command; `00 01h` = command not supported by model.

<!-- UNRESOLVED: source repeatedly references an Appendix "Supplementary Information by Command" for value code lists (input terminal codes for 018/319-10, aspect values for 030-12, eco mode values for 097-8/098-8, base model type values for 078-1/305-1, sub-input setting values for 097-198/098-198, selection signal type details). That Appendix is not present in the refined source document. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: default baud rate not stated (5 options listed, no default marked) -->
<!-- UNRESOLVED: flow control not stated -->
<!-- UNRESOLVED: ID2 model code value for Xp X141Q W not stated (varies by model) -->
<!-- UNRESOLVED: wireless LAN unit compatibility / protocol details deferred to separate operation manual -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:28:30.614Z
last_checked_at: 2026-06-19T07:53:03.544Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:53:03.544Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action commands matched verbatim to source; transport parameters verified; full bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value codes (DATA01 of 018, 319-10) reference an Appendix \"Supplementary Information by Command\" not present in source. Eco mode values, aspect values, base model type values, and sub-input setting values also reference that missing Appendix."
- "flow_control not stated; full-duplex mode stated"
- "other target codes not in this source\""
- "full code list not in this source\""
- "none additional identified in source"
- "no event/notification mechanism described in source"
- "no macros described in source"
- "source contains no explicit power-on sequencing procedure,"
- "source repeatedly references an Appendix \"Supplementary Information by Command\" for value code lists (input terminal codes for 018/319-10, aspect values for 030-12, eco mode values for 097-8/098-8, base model type values for 078-1/305-1, sub-input setting values for 097-198/098-198, selection signal type details). That Appendix is not present in the refined source document."
- "firmware version compatibility not stated in source"
- "default baud rate not stated (5 options listed, no default marked)"
- "flow control not stated"
- "ID2 model code value for Xp X141Q W not stated (varies by model)"
- "wireless LAN unit compatibility / protocol details deferred to separate operation manual"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
