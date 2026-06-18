---
spec_id: admin/sharp-nec-as173m-bk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC AS173M BK Control Spec"
manufacturer: Sharp/NEC
model_family: "AS173M BK"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "AS173M BK"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:56:54.863Z
last_checked_at: 2026-06-17T19:32:55.817Z
generated_at: 2026-06-17T19:32:55.817Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-specific appendix values (input terminal codes, eco mode values, base model type codes, aspect values, sub input values) referenced but not included in the refined source."
  - "firmware version compatibility not stated in source."
  - "flow control not explicitly stated; pinout shows RTS/CTS wired"
  - "full input terminal list not in refined source."
  - "aspect value list not in refined source."
  - "complete DATA01 target table not present in refined source.\""
  - "target list not in refined source."
  - "eco mode value list not in refined source."
  - "sub input value list not in refined source.\""
  - "input terminal list not in refined source."
  - "enum values in Appendix, not in refined source."
  - "no multi-step sequences explicitly described in source."
  - "Appendix \"Supplementary Information by Command\" not included in refined source — missing input terminal codes, aspect values, eco mode values, base model type codes, sub input values."
  - "single default baud rate not stated; source lists 5 supported rates without picking one."
  - "flow_control not explicitly specified (RTS/CTS pins wired but mode not stated)."
  - "complete DATA01 target table for cmd_053 (Lens Control) not in refined source — only 06h (Periphery Focus) listed."
  - "firmware version compatibility range not stated."
  - "model \"AS173M BK\" appears as an LCD monitor model name in Sharp/NEC literature, while this command reference is a projector manual (BDT140013). Model-to-manual fit not confirmed against the device."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:32:55.817Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim hex sequences in source; all transport parameters verified in source documentation. (18 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC AS173M BK Control Spec

## Summary
Sharp/NEC AS173M BK projector control spec. Covers RS-232C serial and wired/wireless LAN (TCP) control via a binary, checksummed command protocol. Spec derived from "Projector Control Command Reference Manual" BDT140013 Rev 7.1.

<!-- UNRESOLVED: model-specific appendix values (input terminal codes, eco mode values, base model type codes, aspect values, sub input values) referenced but not included in the refined source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port number stated in source
serial:
  baud_rate: 115200  # one of: 115200/38400/19200/9600/4800 - device auto/configurable; source does not state a single default
  baud_rates_supported: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated; pinout shows RTS/CTS wired
  communication_mode: full_duplex
auth:
  type: none  # inferred: no auth procedure in source
# Framing: commands are hex byte frames. Format:
#   <HDR> <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>
# Checksum = low-order byte of sum of all preceding bytes.
```

## Traits
```yaml
traits:
  - powerable     # inferred: POWER ON/OFF commands present
  - queryable     # inferred: many status request commands present
  - levelable     # inferred: picture/volume/lamp adjust commands present
  - routable      # inferred: INPUT SW CHANGE present
```

## Actions
```yaml
# All payloads verbatim from source. ID1=control ID, ID2=model code, CKS=checksum
# (low byte of sum of preceding bytes). Request frames omit ID1/ID2 per source
# (literal 00h placeholders); responses include them.

- id: cmd_009_error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: cmd_015_power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: While turning on, no other command accepted.

- id: cmd_016_power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: During power-off incl. cooling time, no other command accepted.

- id: cmd_018_input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal code (see Appendix; e.g. 06h = video port). UNRESOLVED: full input terminal list not in refined source.
  notes: Source example for video port: "02h 03h 00h 00h 02h 01h 06h 0Eh".

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
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

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
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: cmd_030_12_aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Aspect value (see Appendix). UNRESOLVED: aspect value list not in refined source.

- id: cmd_030_15_other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target (per source table: DATA01=96h, DATA02=FFh => LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: Secondary target code (FFh for LAMP/LIGHT ADJUST)
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: cmd_037_information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: cmd_037_3_filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: cmd_037_4_lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (s), 04h=lamp remaining life (%)"

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
      description: "Key code low byte (see source Key code list: e.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO)"
    - name: DATA02
      type: integer
      description: Key code high byte (00h for all listed keys)

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
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (06h=Periphery Focus listed; full list not in refined source). UNRESOLVED: complete DATA01 target table not present in refined source."
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: cmd_053_1_lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens target selector. UNRESOLVED: target list not in refined source.

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
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

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

- id: cmd_060_1_gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: cmd_078_1_setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: cmd_078_2_running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: cmd_078_3_input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: cmd_078_4_mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: cmd_078_5_model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cmd_078_6_cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: cmd_079_freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"

- id: cmd_084_information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: cmd_097_8_eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: cmd_097_45_lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: cmd_097_155_lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: cmd_097_198_pip_pbp_request
  label: PIP/Picture By Picture Request
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

- id: cmd_098_8_eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Eco mode value (see Appendix). UNRESOLVED: eco mode value list not in refined source.

- id: cmd_098_45_lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA16} 00h {CKS}"
  params:
    - name: DATA01_DATA16
      type: string
      description: Projector name (up to 16 bytes, NUL terminated)

- id: cmd_098_198_pip_pbp_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (mode-dependent: MODE 00h=PIP/01h=PbP; START POSITION 00h=TL/01h=TR/02h=BL/03h=BR; SUB INPUT values see Appendix). UNRESOLVED: sub input value list not in refined source."

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

- id: cmd_305_2_serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: cmd_305_3_basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: cmd_319_10_audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal (see Appendix). UNRESOLVED: input terminal list not in refined source.
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Response framing:
# Success (no data): A{x}h {cmd} <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# Success (with data): 2{x}h {cmd} <ID1> <ID2> <LEN> <DATA...> <CKS>
# Error: A{x}h {cmd} <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# ERR1=00h ERR2=00h => command not recognized; see full error code list in Notes.

- id: error_status
  type: bitmap
  source: cmd_009_error_status_request
  description: 12-byte error bitmap (DATA01-DATA12). Bit=1 => error.

- id: power_status
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: cmd_078_2_running_status_request DATA03/DATA06

- id: input_status
  type: composite
  source: cmd_078_3_input_status_request

- id: mute_status
  type: composite
  source: cmd_078_4_mute_status_request
  fields: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, onscreen_display]

- id: cover_status
  type: enum
  values: [normal_open, cover_closed]
  source: cmd_078_6_cover_status_request

- id: lens_operation_status
  type: bitmap
  source: cmd_053_7_lens_information_request
  bits: [lens_memory, zoom, focus, lens_shift_h, lens_shift_v]

- id: eco_mode_value
  type: enum
  source: cmd_097_8_eco_mode_request
  # UNRESOLVED: enum values in Appendix, not in refined source.

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: cmd_097_243_1_edge_blending_mode_request

- id: pip_pbp_setting
  type: composite
  source: cmd_097_198_pip_pbp_request
```

## Variables
```yaml
- id: brightness
  type: integer
  unit: level
  source: cmd_030_1_picture_adjust DATA01=00h

- id: contrast
  type: integer
  source: cmd_030_1_picture_adjust DATA01=01h

- id: color
  type: integer
  source: cmd_030_1_picture_adjust DATA01=02h

- id: hue
  type: integer
  source: cmd_030_1_picture_adjust DATA01=03h

- id: sharpness
  type: integer
  source: cmd_030_1_picture_adjust DATA01=04h

- id: volume
  type: integer
  source: cmd_030_2_volume_adjust

- id: lamp_light_adjust
  type: integer
  source: cmd_030_15_other_adjust (DATA01=96h, DATA02=FFh)

- id: aspect
  type: enum
  source: cmd_030_12_aspect_adjust
  # UNRESOLVED: enum values in Appendix, not in refined source.

- id: eco_mode
  type: enum
  source: cmd_098_8_eco_mode_set
  # UNRESOLVED: enum values in Appendix, not in refined source.

- id: projector_name
  type: string
  max_length: 16
  source: cmd_098_45_lan_projector_name_set

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: cmd_053_10_lens_profile_set

- id: freeze
  type: enum
  values: [on, off]
  source: cmd_079_freeze_control

- id: shutter
  type: enum
  values: [closed, open]
  source: cmd_051_shutter_close / cmd_052_shutter_open

- id: picture_mute
  type: enum
  values: [on, off]

- id: sound_mute
  type: enum
  values: [on, off]

- id: onscreen_mute
  type: enum
  values: [on, off]

- id: edge_blending
  type: enum
  values: [off, on]
  source: cmd_098_243_1_edge_blending_mode_set

- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]
  source: cmd_098_198_pip_pbp_set DATA01=00h

- id: pip_pbp_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]
  source: cmd_098_198_pip_pbp_set DATA01=01h
```

## Events
```yaml
# No unsolicited notifications documented in source.
# Device only responds to commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: cmd_015_power_on
    note: "While turning on power, no other command accepted."
  - command: cmd_016_power_off
    note: "During power-off (incl. cooling time), no other command accepted."
# Power on/off sequences are documented; no interlock confirmation requirement
# stated beyond command lockout windows.
```

## Notes
- **Protocol framing:** All commands/responses are hex byte frames. Request frames in this manual use literal `00h` for `<ID1>`/`<ID2>` placeholders (the projector fills actual control ID and model code in responses). A response echoes the command's high nibble (e.g. `02h` cmd -> `22h` success / `A2h` error; `03h` cmd -> `23h` / `A3h`).
- **Checksum:** `CKS` = low-order byte (8 bits) of the sum of all preceding bytes in the frame. Worked example from source: `20h+81h+01h+60h+01h+00h = 103h`, CKS = `03h`.
- **Error codes:** `ERR1`/`ERR2` combinations are fully enumerated in the source (e.g. `00h/00h` = command not recognized; `02h/0Dh` = power off; `02h/0Fh` = no authority). See source §2.4 for the complete 30-entry list.
- **RS-232 cabling:** cross (null-modem) cable required. PC CONTROL port is D-SUB 9P; pins 2(RxD)/3(TxD)/5(GND)/7(RTS)/8(CTS) used.
- **LAN:** wired RJ-45 (10/100BASE-TX auto) or optional wireless LAN unit. All LAN control uses TCP port 7142.
- **Signal list number** (cmd_078_3): returned value is practical number minus 1.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not included in refined source — missing input terminal codes, aspect values, eco mode values, base model type codes, sub input values. -->
<!-- UNRESOLVED: single default baud rate not stated; source lists 5 supported rates without picking one. -->
<!-- UNRESOLVED: flow_control not explicitly specified (RTS/CTS pins wired but mode not stated). -->
<!-- UNRESOLVED: complete DATA01 target table for cmd_053 (Lens Control) not in refined source — only 06h (Periphery Focus) listed. -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: model "AS173M BK" appears as an LCD monitor model name in Sharp/NEC literature, while this command reference is a projector manual (BDT140013). Model-to-manual fit not confirmed against the device. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:56:54.863Z
last_checked_at: 2026-06-17T19:32:55.817Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:32:55.817Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim hex sequences in source; all transport parameters verified in source documentation. (18 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-specific appendix values (input terminal codes, eco mode values, base model type codes, aspect values, sub input values) referenced but not included in the refined source."
- "firmware version compatibility not stated in source."
- "flow control not explicitly stated; pinout shows RTS/CTS wired"
- "full input terminal list not in refined source."
- "aspect value list not in refined source."
- "complete DATA01 target table not present in refined source.\""
- "target list not in refined source."
- "eco mode value list not in refined source."
- "sub input value list not in refined source.\""
- "input terminal list not in refined source."
- "enum values in Appendix, not in refined source."
- "no multi-step sequences explicitly described in source."
- "Appendix \"Supplementary Information by Command\" not included in refined source — missing input terminal codes, aspect values, eco mode values, base model type codes, sub input values."
- "single default baud rate not stated; source lists 5 supported rates without picking one."
- "flow_control not explicitly specified (RTS/CTS pins wired but mode not stated)."
- "complete DATA01 target table for cmd_053 (Lens Control) not in refined source — only 06h (Periphery Focus) listed."
- "firmware version compatibility range not stated."
- "model \"AS173M BK\" appears as an LCD monitor model name in Sharp/NEC literature, while this command reference is a projector manual (BDT140013). Model-to-manual fit not confirmed against the device."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
