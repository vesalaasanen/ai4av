---
spec_id: admin/sharpnec-ex241un-bk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ex241Un Bk Control Spec"
manufacturer: Sharp/NEC
model_family: "Ex241Un Bk"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ex241Un Bk"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:39:24.803Z
last_checked_at: 2026-06-17T19:56:57.551Z
generated_at: 2026-06-17T19:56:57.551Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source document is a generic \"Projector Control Command Reference Manual\" describing projector features (lamp, lens, shutter, filter). The declared model \"Ex241Un Bk\" is not mentioned in the source text. Confirm the source document matches this device family."
  - "Control ID (ID1) and model code (ID2) values are device-specific and not stated in the source."
  - "Firmware version compatibility not stated in source."
  - "flow control not stated in source (communication mode is Full duplex)"
  - "no explicit safety interlock procedures or power-on sequencing"
  - "source/model mismatch — source is a Projector Control Command Reference Manual; declared model \"Ex241Un Bk\" not referenced in source."
  - "ID1 (control ID) and ID2 (model code) values not stated."
  - "appendix values for input terminals, aspect, eco mode, and PIP sub-inputs not in provided source text."
  - "firmware version compatibility not stated."
  - "flow control not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:56:57.551Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched literal hex commands in source; transport parameters verified; full command coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ex241Un Bk Control Spec

## Summary
Control spec for the Sharp/NEC Ex241Un Bk derived from the vendor Projector Control Command Reference Manual (BDT140013 Revision 7.1). The device supports RS-232C serial control and LAN (TCP) control. Commands are binary hex frames with a trailing checksum byte computed as the low-order byte of the sum of all preceding bytes.

<!-- UNRESOLVED: The source document is a generic "Projector Control Command Reference Manual" describing projector features (lamp, lens, shutter, filter). The declared model "Ex241Un Bk" is not mentioned in the source text. Confirm the source document matches this device family. -->
<!-- UNRESOLVED: Control ID (ID1) and model code (ID2) values are device-specific and not stated in the source. -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 4800|9600|19200|38400|115200  # source lists all five as supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (communication mode is Full duplex)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       # inferred: POWER ON (015) / POWER OFF (016) commands present
# - queryable       # inferred: many REQUEST commands present
# - levelable       # inferred: PICTURE ADJUST (030-1), VOLUME ADJUST (030-2), OTHER ADJUST (030-15)
# - routable        # inferred: INPUT SW CHANGE (018) selects input terminal
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

## Actions
```yaml
# All command payloads are hex bytes copied verbatim from the source. <ID1> = control ID,
# <ID2> = model code, <CKS> = checksum (low-order byte of sum of preceding bytes).
# Parameterized commands show the variable DATA bytes in braces.

- id: cmd_009_error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response carries DATA01-DATA12 bitfield error info (cover, fan, temp, lamp, etc.)."

- id: cmd_015_power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on is in progress."

- id: cmd_016_power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."

- id: cmd_018_input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (e.g. 06h = video port). See appendix in source."
  notes: "Example for video port: 02h 03h 00h 00h 02h 01h 06h 0Eh"

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
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_030_2_volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_030_12_aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value (see appendix in source)"

- id: cmd_030_15_other_adjust
  label: Other Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target; 96h=LAMP ADJUST / LIGHT ADJUST (with DATA02=FFh)"
    - name: DATA02
      type: integer
      description: "Sub-target (96h target uses FFh here)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_037_information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time (DATA83-86), filter usage time (DATA87-90)."

- id: cmd_037_3_filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds."

- id: cmd_037_4_lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: cmd_037_6_carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: cmd_050_remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: "Key code high byte (typically 00h)"

- id: cmd_051_shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []
  notes: "Closes the lens shutter."

- id: cmd_052_shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []
  notes: "Opens the lens shutter."

- id: cmd_053_lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (06h=Periphery Focus)"
    - name: DATA02
      type: integer
      description: "Drive: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "Send 00h to stop continuous drive."

- id: cmd_053_1_lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target"
  notes: "Returns upper/lower limit and current value for the lens adjustment."

- id: cmd_053_2_lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh=Stop)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_053_3_lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: cmd_053_4_reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls the profile number specified by LENS PROFILE SET (053-10)."

- id: cmd_053_5_lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: cmd_053_6_lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: cmd_053_7_lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitfield: lens memory/zoom/focus/lens shift(H/V) operation status."

- id: cmd_053_10_lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: cmd_053_11_lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns selected reference lens memory profile number."

- id: cmd_060_1_gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"
  notes: "Returns adjustment range (upper/lower/default/current) and wide/narrow step widths."

- id: cmd_078_1_setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile number (DATA05)."

- id: cmd_078_2_running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06)."

- id: cmd_078_3_input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal type 1/2, content displayed."

- id: cmd_078_4_mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture/sound/onscreen/forced-onscreen mute and OSD display states."

- id: cmd_078_5_model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns model name (NUL-terminated)."

- id: cmd_078_6_cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns mirror/lens cover status: 00h=open, 01h=closed."

- id: cmd_079_freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: cmd_084_information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency"

- id: cmd_097_8_eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco mode value (see appendix). May reflect Light mode or Lamp mode."

- id: cmd_097_45_lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name (NUL-terminated, DATA01-17)."

- id: cmd_097_155_lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns 6-byte MAC address (DATA01-06)."

- id: cmd_097_198_pip_picture_by_picture_request
  label: PIP / Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: cmd_097_243_1_edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns edge blending setting: 00h=OFF, 01h=ON."

- id: cmd_098_8_eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value (see appendix in source)"

- id: cmd_098_45_lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
  params:
    - name: DATA01_to_DATA16
      type: string
      description: "Projector name (up to 16 bytes)"

- id: cmd_098_198_pip_picture_by_picture_set
  label: PIP / Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (varies by DATA01; MODE: 00h=PIP/01h=PBYP; START POSITION: 00h-03h corners; sub input values per appendix)"

- id: cmd_098_243_1_edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: cmd_305_1_base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type and model name (DATA03-11)."

- id: cmd_305_2_serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns serial number (NUL-terminated, DATA01-16)."

- id: cmd_305_3_basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, signal types, mute states, freeze status."

- id: cmd_319_10_audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (see appendix in source)"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Observable states returned by query commands.
- id: error_status
  type: bitfield
  source: cmd_009_error_status_request
  description: "12-byte error bitfield (cover, fan, temperature, lamp, mirror cover, interlock, etc.)"

- id: power_status
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: cmd_078_2_running_status_request

- id: mute_status
  type: composite
  source: cmd_078_4_mute_status_request
  description: "Picture mute, sound mute, onscreen mute, forced onscreen mute, OSD display"

- id: input_status
  type: composite
  source: cmd_078_3_input_status_request
  description: "Signal list number, selection signal type, content displayed"

- id: cover_status
  type: enum
  values: [normal_open, closed]
  source: cmd_078_6_cover_status_request

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: cmd_037_4_lamp_information_request_3

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: cmd_037_4_lamp_information_request_3

- id: filter_usage_time
  type: integer
  unit: seconds
  source: cmd_037_3_filter_usage_information_request

- id: eco_mode
  type: enum
  source: cmd_097_8_eco_mode_request
  description: "Values per appendix in source (not enumerated in main body)."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: cmd_097_243_1_edge_blending_mode_request

- id: lens_operation_status
  type: bitfield
  source: cmd_053_7_lens_information_request
  description: "Lens memory, zoom, focus, lens shift (H/V) operation status"

- id: model_name
  type: string
  source: cmd_078_5_model_name_request

- id: mac_address
  type: string
  source: cmd_097_155_lan_mac_address_status_request2

- id: serial_number
  type: string
  source: cmd_305_2_serial_number_request
```

## Variables
```yaml
# Adjustable parameters set via the 030-series adjust actions and read via 060-1.
# Ranges (upper/lower/default/current) are queryable through cmd_060_1_gain_parameter_request_3.
- id: brightness
  type: integer
  set_via: cmd_030_1_picture_adjust
  range_source: cmd_060_1_gain_parameter_request_3

- id: contrast
  type: integer
  set_via: cmd_030_1_picture_adjust
  range_source: cmd_060_1_gain_parameter_request_3

- id: color
  type: integer
  set_via: cmd_030_1_picture_adjust
  range_source: cmd_060_1_gain_parameter_request_3

- id: hue
  type: integer
  set_via: cmd_030_1_picture_adjust
  range_source: cmd_060_1_gain_parameter_request_3

- id: sharpness
  type: integer
  set_via: cmd_030_1_picture_adjust
  range_source: cmd_060_1_gain_parameter_request_3

- id: volume
  type: integer
  set_via: cmd_030_2_volume_adjust
  range_source: cmd_060_1_gain_parameter_request_3

- id: lamp_light_adjust
  type: integer
  set_via: cmd_030_15_other_adjust
  range_source: cmd_060_1_gain_parameter_request_3

- id: aspect
  type: enum
  set_via: cmd_030_12_aspect_adjust
  description: "Values per appendix in source."
```

## Events
```yaml
# No unsolicited notifications documented in source. The device only responds to commands.
```

## Macros
```yaml
# No multi-step sequences documented explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: cmd_015_power_on
    note: "No other command accepted while power-on is in progress."
  - command: cmd_016_power_off
    note: "No other command accepted during power-off including cooling time."
  - command: cmd_053_lens_control
    note: "Continuous lens drive (7Fh/81h) must be stopped with 00h."
# UNRESOLVED: no explicit safety interlock procedures or power-on sequencing
# requirements stated beyond the command-level notes above.
```

## Notes
- Command/response frames use hex notation. Format: `<header> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Headers use distinct byte pairs for command (`02h`/`03h`), success response (`22h`/`23h`), and error response (`A2h`/`A3h`).
- Checksum (`CKS`) = low-order byte of the sum of all preceding bytes.
- `ID1` = control ID set on the projector; `ID2` = model code (varies by model). Neither value is stated in the source.
- Error responses carry `<ERR1> <ERR2>` codes (see source §2.4 error code list: 00h/00h unrecognized command, 01h/00h invalid value, 02h/0Dh power off, etc.).
- Serial: RS-232C cross cable, D-SUB 9P. LAN: wired (10/100 Mbps, RJ-45) or wireless LAN unit, TCP port 7142.
- Several commands reference an "Appendix: Supplementary Information by Command" for input terminal values, aspect values, eco mode values, and sub-input values. That appendix is not included in the provided source text.
<!-- UNRESOLVED: source/model mismatch — source is a Projector Control Command Reference Manual; declared model "Ex241Un Bk" not referenced in source. -->
<!-- UNRESOLVED: ID1 (control ID) and ID2 (model code) values not stated. -->
<!-- UNRESOLVED: appendix values for input terminals, aspect, eco mode, and PIP sub-inputs not in provided source text. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: flow control not stated in source. -->
```

53 actions enumerated (all source commands). Two flags worth attention:

1. **Source/model mismatch** — source is projector manual (lamp/lens/shutter/filter). Model `Ex241Un Bk` not mentioned anywhere in source. Verify correct doc attached before ingest.
2. **Missing appendix** — several commands reference "Supplementary Information by Command" appendix (input terminal values, aspect values, eco mode values). Appendix absent from provided text → params marked as referencing source appendix.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:39:24.803Z
last_checked_at: 2026-06-17T19:56:57.551Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:56:57.551Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched literal hex commands in source; transport parameters verified; full command coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source document is a generic \"Projector Control Command Reference Manual\" describing projector features (lamp, lens, shutter, filter). The declared model \"Ex241Un Bk\" is not mentioned in the source text. Confirm the source document matches this device family."
- "Control ID (ID1) and model code (ID2) values are device-specific and not stated in the source."
- "Firmware version compatibility not stated in source."
- "flow control not stated in source (communication mode is Full duplex)"
- "no explicit safety interlock procedures or power-on sequencing"
- "source/model mismatch — source is a Projector Control Command Reference Manual; declared model \"Ex241Un Bk\" not referenced in source."
- "ID1 (control ID) and ID2 (model code) values not stated."
- "appendix values for input terminals, aspect, eco mode, and PIP sub-inputs not in provided source text."
- "firmware version compatibility not stated."
- "flow control not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
