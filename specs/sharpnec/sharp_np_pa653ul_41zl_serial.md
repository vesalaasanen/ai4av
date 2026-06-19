---
spec_id: admin/sharp-nec-np-pa653ul-41zl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP PA653UL 41ZL Control Spec"
manufacturer: Sharp/NEC
model_family: "NP PA653UL 41ZL"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP PA653UL 41ZL"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:05:20.760Z
last_checked_at: 2026-06-18T08:49:57.790Z
generated_at: 2026-06-18T08:49:57.790Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "exact model code (ID2) value for this model not stated in source"
  - "default control ID (ID1) value not stated in source"
  - "input terminal DATA01 value table lives in \"Appendix: Supplementary Information by Command\" not present in refined source"
  - "aspect value enumeration in Appendix, not present in refined source"
  - "eco mode value enumeration in Appendix, not present in refined source"
  - "no explicit power-on sequencing procedure stated in source."
  - "ID1 (control ID) default value not stated"
  - "ID2 (model code) for NP PA653UL 41ZL not stated"
  - "input terminal DATA01 value table (Appendix \"Supplementary Information by Command\") absent from refined source"
  - "aspect adjust DATA01 value table absent from refined source"
  - "eco mode value enumeration absent from refined source"
  - "sub-input setting value table for PIP/PbP absent from refined source"
  - "base model type value encoding absent from refined source"
  - "lens axis identifiers beyond 06h (Periphery Focus) for cmd_053 / cmd_053_1 / cmd_053_2 not enumerated in refined source"
  - "no voltage / power / lamp-wattage ratings in this command reference — see product installation manual"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:49:57.790Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP PA653UL 41ZL Control Spec

## Summary
The Sharp/NEC NP PA653UL 41ZL is a projector controllable via an RS-232C serial port (D-SUB 9P PC CONTROL port) and via wired/wireless LAN using TCP port 7142. This spec covers the binary command set documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mute, lens/shutter control, picture/volume/aspect adjustment, and a range of status query commands. Commands are framed binary hex sequences with a checksum byte computed as the low-order byte of the sum of all preceding bytes.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact model code (ID2) value for this model not stated in source -->
<!-- UNRESOLVED: default control ID (ID1) value not stated in source -->
<!-- UNRESOLVED: input terminal DATA01 value table lives in "Appendix: Supplementary Information by Command" not present in refined source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; pick configured rate
  baud_rates_supported: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: full duplex, RTS/CTS pins wired but no flow control setting documented
addressing:
  port: 7142  # TCP port number stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: POWER ON / POWER OFF commands present
  - queryable      # inferred: many status query commands present
  - levelable      # inferred: picture/volume/lamp adjust commands present
  - routable       # inferred: INPUT SW CHANGE command present
```

## Actions
```yaml
# All payloads verbatim from source. <ID1> <ID2> <CKS> are frame parameters
# documented in §2.2. Checksum = low byte of sum of all preceding bytes.

- id: cmd_009_error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response: 20h 88h <ID1> <ID2> 0Ch <DATA01>..<DATA12> <CKS>. DATA01-12 = error bitmasks; bit=1 means error."

- id: cmd_015_power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on in progress."

- id: cmd_016_power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."

- id: cmd_018_input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "Input terminal value (hex). Source example: 06h = video. Full value table in Appendix not present in refined source."
  notes: "Source example switches to video (06h): 02h 03h 00h 00h 02h 01h 06h 0Eh. Response 22h 03h <ID1> <ID2> 01h <DATA01> <CKS>; FFh = error."

- id: cmd_020_picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: cmd_021_picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: cmd_022_sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: cmd_023_sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: cmd_024_onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: cmd_025_onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: cmd_030_1_picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02>..<DATA04> <CKS>"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: string
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Brightness=-10: ...00h F6h FFh 0Ch."

- id: cmd_030_2_volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01>..<DATA03> <CKS>"
  params:
    - name: data01
      type: string
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: cmd_030_12_aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: string
      description: "Aspect value (hex). Value table in Appendix not present in refined source."

- id: cmd_030_15_other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01>..<DATA05> <CKS>"
  params:
    - name: data01
      type: string
      description: "Adjustment target - source documents 96h = LAMP ADJUST / LIGHT ADJUST (DATA02=FFh)"
    - name: data02
      type: string
      description: "Sub-target; FFh for documented LAMP/LIGHT ADJUST"
    - name: data03
      type: string
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_037_information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Response 23h 8Ah <ID1> <ID2> 62h <DATA01>..<DATA98> <CKS>. DATA01-49 projector name, DATA83-86 lamp usage sec, DATA87-90 filter usage sec."

- id: cmd_037_3_filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Response 23h 95h <ID1> <ID2> 08h <DATA01>..<DATA08> <CKS>. DATA01-04 filter usage sec, DATA05-08 filter alarm start sec. -1 if undefined."

- id: cmd_037_4_lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: string
      description: "Content: 01h=usage time sec, 04h=remaining life %"
  notes: "Example get usage time: 03h 96h 00h 00h 02h 00h 01h 9Ch."

- id: cmd_037_6_carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: cmd_050_remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Key code low byte (see source key code table)"
    - name: data02
      type: string
      description: "Key code high byte"
  notes: "Source documents key codes incl. POWER ON(02h 00h), POWER OFF(03h 00h), AUTO(05h 00h), MENU(06h 00h), UP(07h 00h), DOWN(08h 00h), RIGHT(09h 00h), LEFT(0Ah 00h), ENTER(0Bh 00h), EXIT(0Ch 00h), HELP(0Dh 00h), MAGNIFY UP(0Fh 00h), MAGNIFY DOWN(10h 00h), MUTE(13h 00h), PICTURE(29h 00h), COMPUTER1(4Bh 00h), COMPUTER2(4Ch 00h), VIDEO1(4Fh 00h), S-VIDEO1(51h 00h), VOLUME UP(84h 00h), VOLUME DOWN(85h 00h), FREEZE(8Ah 00h), ASPECT(A3h 00h), SOURCE(D7h 00h), LAMP MODE/ECO(EEh 00h). AUTO example: 02h 0Fh 00h 00h 02h 05h 00h 18h."

- id: cmd_051_shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: cmd_052_shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: cmd_053_lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Lens axis - source documents 06h=Periphery Focus only"
    - name: data02
      type: string
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: cmd_053_1_lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: string
      description: "Lens axis identifier"
  notes: "Response 22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02>..<DATA07> <CKS> (upper/lower/current, 16-bit LE pairs)."

- id: cmd_053_2_lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01>..<DATA04> <CKS>"
  params:
    - name: data01
      type: string
      description: "Lens axis; FFh=Stop (mode/value ignored)"
    - name: data02
      type: string
      description: "Mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_053_3_lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: cmd_053_4_reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls profile selected via 053-10 LENS PROFILE SET."

- id: cmd_053_5_lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: cmd_053_6_lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: string
      description: "Setting: 00h=OFF, 01h=ON"

- id: cmd_053_7_lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Response 22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>. DATA01 bitmask: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V) - 0=Stop, 1=During operation."

- id: cmd_053_10_lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=Profile 1, 01h=Profile 2"

- id: cmd_053_11_lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Response 22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>; DATA01 00h=Profile 1, 01h=Profile 2."

- id: cmd_060_1_gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: data01
      type: string
      description: "Adjusted value name: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"
  notes: "Brightness example: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Response carries limits, default, current, wide/narrow step widths."

- id: cmd_078_1_setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Response 20h 85h <ID1> <ID2> 20h <DATA01>..<DATA32> <CKS>. DATA01-03 base model type, DATA04 sound function, DATA05 profile number."

- id: cmd_078_2_running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Response 20h 85h <ID1> <ID2> 10h <DATA01>..<DATA16> <CKS>. DATA03 power status, DATA04 cooling, DATA05 power on/off proc, DATA06 operation status."

- id: cmd_078_3_input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Response 20h 85h <ID1> <ID2> 10h <DATA01>..<DATA16> <CKS>. Signal switch proc, signal list number (-1), selection signal types, content displayed."

- id: cmd_078_4_mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Response 20h 85h <ID1> <ID2> 10h <DATA01>..<DATA16> <CKS>. DATA01 picture, DATA02 sound, DATA03 onscreen, DATA04 forced onscreen, DATA05 OSD."

- id: cmd_078_5_model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Response 20h 85h <ID1> <ID2> 20h <DATA01>..<DATA32> <CKS> (NUL-terminated model name)."

- id: cmd_078_6_cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Response 20h 85h <ID1> <ID2> 01h <DATA01> <CKS>; 00h=normal/opened, 01h=closed."

- id: cmd_079_freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "01h=freeze on, 02h=freeze off"

- id: cmd_084_information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: data01
      type: string
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: cmd_097_8_eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns Light mode or Lamp mode value depending on projector. Value table in Appendix."

- id: cmd_097_45_lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: cmd_097_155_lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Response DATA01-06 = MAC address bytes."

- id: cmd_097_198_pip_picture_by_picture_request
  label: PIP / Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: cmd_097_243_1_edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: cmd_098_8_eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "Eco mode value (hex). Value table in Appendix."

- id: cmd_098_45_lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01>..<DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name, up to 16 bytes (DATA01-16); 00h NUL terminator follows"

- id: cmd_098_198_pip_picture_by_picture_set
  label: PIP / Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: string
      description: "Setting value. MODE: 00h=PIP, 01h=PiP-by-PiP. START POSITION: 00h=TL, 01h=TR, 02h=BL, 03h=BR. Sub-input values per Appendix."

- id: cmd_098_243_1_edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h=OFF, 01h=ON"

- id: cmd_305_1_base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Response 20h BFh <ID1> <ID2> 10h 00h <DATA01>..<DATA15> <CKS>. DATA01-02 type, DATA03-11 model name, DATA12-13 type."

- id: cmd_305_2_serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Response DATA01-16 = NUL-terminated serial number."

- id: cmd_305_3_basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Response 20h BFh <ID1> <ID2> 10h 02h <DATA01>..<DATA15> <CKS>. DATA01 operation status, DATA02 content displayed, DATA03-05 signal types, DATA06-09 mute/freeze."

- id: cmd_319_10_audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Input terminal value (hex) - table in Appendix not present in refined source"
    - name: data02
      type: string
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# One entry per observable state or query response.

- id: fb_error_status
  type: bitmask
  source_command: cmd_009_error_status_request
  description: "DATA01-12 error bitmasks (cover/fan/temp/power/lamp/ formatter/FPGA/mirror/foreign-matter/ballast/iris/lens errors, interlock switch, system errors)."

- id: fb_power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source_command: cmd_078_2_running_status_request
  description: "DATA03 + DATA06 power status enumeration."

- id: fb_input_state
  type: composite
  source_command: cmd_078_3_input_status_request
  description: "Signal switch proc, signal list number, selection signal types, content displayed."

- id: fb_mute_state
  type: composite
  source_command: cmd_078_4_mute_status_request
  description: "Picture/sound/onscreen/forced-onscreen/OSD mute bits."

- id: fb_cover_state
  type: enum
  values: [normal_opened, closed]
  source_command: cmd_078_6_cover_status_request

- id: fb_lamp_usage
  type: numeric
  unit: seconds
  source_command: cmd_037_4_lamp_information_request_3
  description: "Lamp usage time (seconds); updated at 1-min intervals."

- id: fb_lamp_remaining_life
  type: numeric
  unit: percent
  source_command: cmd_037_4_lamp_information_request_3
  description: "Remaining life %. Negative when replacement deadline exceeded."

- id: fb_filter_usage
  type: numeric
  unit: seconds
  source_command: cmd_037_3_filter_usage_information_request

- id: fb_lens_operation
  type: bitmask
  source_command: cmd_053_7_lens_information_request
  description: "Lens memory/Zoom/Focus/Lens-Shift-H/Lens-Shift-V operation flags."

- id: fb_gain_parameter
  type: composite
  source_command: cmd_060_1_gain_parameter_request_3
  description: "Adjustment status, limits, default, current, step widths for brightness/contrast/color/hue/sharpness/volume/lamp-adjust."
```

## Variables
```yaml
- id: var_brightness
  set_via: cmd_030_1_picture_adjust (DATA01=00h)
  query_via: cmd_060_1_gain_parameter_request_3 (DATA01=00h)
  mode: [absolute, relative]

- id: var_contrast
  set_via: cmd_030_1_picture_adjust (DATA01=01h)
  query_via: cmd_060_1_gain_parameter_request_3 (DATA01=01h)

- id: var_color
  set_via: cmd_030_1_picture_adjust (DATA01=02h)
  query_via: cmd_060_1_gain_parameter_request_3 (DATA01=02h)

- id: var_hue
  set_via: cmd_030_1_picture_adjust (DATA01=03h)
  query_via: cmd_060_1_gain_parameter_request_3 (DATA01=03h)

- id: var_sharpness
  set_via: cmd_030_1_picture_adjust (DATA01=04h)
  query_via: cmd_060_1_gain_parameter_request_3 (DATA01=04h)

- id: var_volume
  set_via: cmd_030_2_volume_adjust
  query_via: cmd_060_1_gain_parameter_request_3 (DATA01=05h)

- id: var_lamp_adjust
  set_via: cmd_030_15_other_adjust (DATA01=96h DATA02=FFh)
  query_via: cmd_060_1_gain_parameter_request_3 (DATA01=96h)

- id: var_aspect
  set_via: cmd_030_12_aspect_adjust
  # UNRESOLVED: aspect value enumeration in Appendix, not present in refined source

- id: var_eco_mode
  set_via: cmd_098_8_eco_mode_set
  query_via: cmd_097_8_eco_mode_request
  # UNRESOLVED: eco mode value enumeration in Appendix, not present in refined source

- id: var_projector_name
  set_via: cmd_098_45_lan_projector_name_set
  query_via: cmd_097_45_lan_projector_name_request
  max_length_bytes: 16

- id: var_edge_blending
  values: [off, on]
  set_via: cmd_098_243_1_edge_blending_mode_set
  query_via: cmd_097_243_1_edge_blending_mode_request

- id: var_pip_pbyP_mode
  values: [pip, picture_by_picture]
  set_via: cmd_098_198_pip_picture_by_picture_set (DATA01=00h)
  query_via: cmd_097_198_pip_picture_by_picture_request (DATA01=00h)

- id: var_pip_start_position
  values: [top_left, top_right, bottom_left, bottom_right]
  set_via: cmd_098_198_pip_picture_by_picture_set (DATA01=01h)
  query_via: cmd_097_198_pip_picture_by_picture_request (DATA01=01h)

- id: var_lens_memory_load_by_signal
  values: [off, on]
  set_via: cmd_053_6_lens_memory_option_set (DATA01=00h)
  query_via: cmd_053_5_lens_memory_option_request (DATA01=00h)

- id: var_lens_memory_forced_mute
  values: [off, on]
  set_via: cmd_053_6_lens_memory_option_set (DATA01=01h)
  query_via: cmd_053_5_lens_memory_option_request (DATA01=01h)

- id: var_lens_profile
  values: [profile_1, profile_2]
  set_via: cmd_053_10_lens_profile_set
  query_via: cmd_053_11_lens_profile_request
```

## Events
```yaml
# No unsolicited notifications documented in source.
# All responses are solicited (reply to a command).
```

## Macros
```yaml
# No multi-step sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes:
# - POWER ON: no other command accepted while power-on in progress
# - POWER OFF: no other command accepted during power-off incl. cooling time
# - Error bitmask (cmd 009) includes interlock switch open (DATA09 Bit1),
#   foreign matter sensor, mirror cover, lens not installed properly, fan,
#   temperature, lamp - device surfaces these as error bits, not as
#   procedural interlocks the controller must enforce.
# UNRESOLVED: no explicit power-on sequencing procedure stated in source.
```

## Notes
- All commands are binary hex frames. Frame layout: first bytes are the operation code, then `<ID1>` (Control ID set on projector), `<ID2>` (model code), `LEN` (data byte count), `DATA??`, `<CKS>`. Checksum = low-order byte of the sum of all preceding bytes.
- Error responses use the frame prefix `A?h` (high nibble A) and carry `<ERR1> <ERR2>` per §2.4 error code table (00h/00h unrecognized, 00h/01h unsupported by model, 01h/00h invalid value, 02h/0Dh power off, etc.).
- Both RS-232C (D-SUB 9P, PC CONTROL port, cross cable, pin 2/3 TX/RX crossed, pin 7/8 RTS/CTS crossed, pin 5 GND) and TCP port 7142 carry the same binary command set.
- Lamp/filter usage times are reported in one-second units but updated only at one-minute intervals.
- Lamp remaining life (%) becomes negative once the replacement deadline is exceeded.
- Signal list number returned by INPUT STATUS REQUEST is 1 less than the practical number; add 1 to convert.
- Volume adjust reuses the `03h 10h` opcode family with DATA01=05h to distinguish from picture adjust.

<!-- UNRESOLVED: ID1 (control ID) default value not stated -->
<!-- UNRESOLVED: ID2 (model code) for NP PA653UL 41ZL not stated -->
<!-- UNRESOLVED: input terminal DATA01 value table (Appendix "Supplementary Information by Command") absent from refined source -->
<!-- UNRESOLVED: aspect adjust DATA01 value table absent from refined source -->
<!-- UNRESOLVED: eco mode value enumeration absent from refined source -->
<!-- UNRESOLVED: sub-input setting value table for PIP/PbP absent from refined source -->
<!-- UNRESOLVED: base model type value encoding absent from refined source -->
<!-- UNRESOLVED: lens axis identifiers beyond 06h (Periphery Focus) for cmd_053 / cmd_053_1 / cmd_053_2 not enumerated in refined source -->
<!-- UNRESOLVED: no voltage / power / lamp-wattage ratings in this command reference — see product installation manual -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:05:20.760Z
last_checked_at: 2026-06-18T08:49:57.790Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:49:57.790Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "exact model code (ID2) value for this model not stated in source"
- "default control ID (ID1) value not stated in source"
- "input terminal DATA01 value table lives in \"Appendix: Supplementary Information by Command\" not present in refined source"
- "aspect value enumeration in Appendix, not present in refined source"
- "eco mode value enumeration in Appendix, not present in refined source"
- "no explicit power-on sequencing procedure stated in source."
- "ID1 (control ID) default value not stated"
- "ID2 (model code) for NP PA653UL 41ZL not stated"
- "input terminal DATA01 value table (Appendix \"Supplementary Information by Command\") absent from refined source"
- "aspect adjust DATA01 value table absent from refined source"
- "eco mode value enumeration absent from refined source"
- "sub-input setting value table for PIP/PbP absent from refined source"
- "base model type value encoding absent from refined source"
- "lens axis identifiers beyond 06h (Periphery Focus) for cmd_053 / cmd_053_1 / cmd_053_2 not enumerated in refined source"
- "no voltage / power / lamp-wattage ratings in this command reference — see product installation manual"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
