---
spec_id: admin/sharp-nec-xp-x171q-w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC XP X171Q W Control Spec"
manufacturer: Sharp/NEC
model_family: "XP X171Q W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "XP X171Q W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:54:08.615Z
last_checked_at: 2026-06-19T07:53:05.041Z
generated_at: 2026-06-19T07:53:05.041Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version not stated. Input terminal value list, eco mode value list, aspect value list, base model type value list, sub-input value list all live in \"Appendix: Supplementary Information by Command\" — appendix NOT in refined source, so enum values missing. Default baud rate not specified (4 options given)."
  - "source says \"Full duplex\" communication mode but no flow_control pin usage for control"
  - "response strings for many queries (information strings, PIP/PbP values) partially enumerated in source; full enum tables in appendix"
  - "source describes only request/response model. No unsolicited"
  - "no multi-step sequences documented in source."
  - "no other explicit safety warnings, power-on sequencing, or"
  - "appendix \"Supplementary Information by Command\" NOT in refined source. Missing enum tables for: input terminal values, aspect values, eco mode values, base model type values, PIP/PbP sub-input values, audio-select input terminal values."
  - "default baud rate not specified (4 options)."
  - "firmware version compatibility not stated."
  - "model code (ID2) value for XP X171Q W not stated — varies by model."
  - "control ID (ID1) default value not stated."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:53:05.041Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source protocol exactly; transport parameters verified; complete command coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC XP X171Q W Control Spec

## Summary
Sharp/NEC XP X171Q W projector. Binary control protocol over RS-232C serial (D-SUB 9P, PC CONTROL port) and wired/wireless LAN. Manual BDT140013 Rev 7.1 lists 54 command opcodes covering power, mute, input switch, picture/volume/aspect adjust, lens control + memory, information/status queries, eco mode, LAN name, PIP/PbP, edge blending, audio select. All commands framed hex with ID1/ID2/LEN/CHECKSUM.

<!-- UNRESOLVED: firmware version not stated. Input terminal value list, eco mode value list, aspect value list, base model type value list, sub-input value list all live in "Appendix: Supplementary Information by Command" — appendix NOT in refined source, so enum values missing. Default baud rate not specified (4 options given). -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all 5; default UNRESOLVED
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source says "Full duplex" communication mode but no flow_control pin usage for control
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: 015 POWER ON / 016 POWER OFF
  - routable      # inferred: 018 INPUT SW CHANGE
  - queryable     # inferred: many REQUEST commands
  - levelable     # inferred: 030-2 VOLUME ADJUST, 030-1 PICTURE ADJUST
```

## Actions
```yaml
# Checksum rule (from source §2.2): CKS = low-order byte of sum of all
# preceding bytes. ID1 = control ID, ID2 = model code (both projector-set).
# Frame markers: 20h/21h/22h/23h = command/request prefix variants by class;
# A0h/A1h/A2h/A3h = response prefix variants. "h" = hex notation verbatim.
actions:
  - id: cmd_009_error_status_request
    label: Error Status Request
    kind: query
    command: "00h  88h  00h  00h  00h  88h"
    params: []

  - id: cmd_015_power_on
    label: Power On
    kind: action
    command: "02h  00h  00h  00h  00h  02h"
    params: []
    notes: "No other command accepted during power-on sequence."

  - id: cmd_016_power_off
    label: Power Off
    kind: action
    command: "02h  01h  00h  00h  00h  03h"
    params: []
    notes: "No other command accepted during power-off incl. cooling time."

  - id: cmd_018_input_sw_change
    label: Input SW Change
    kind: action
    command: "02h  03h  00h  00h  02h  01h  {DATA01}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal value (e.g. 06h=video port). Full enum UNRESOLVED - lives in appendix 'Supplementary Information by Command' not in source."

  - id: cmd_020_picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h  10h  00h  00h  00h  12h"
    params: []

  - id: cmd_021_picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h  11h  00h  00h  00h  13h"
    params: []

  - id: cmd_022_sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h  12h  00h  00h  00h  14h"
    params: []

  - id: cmd_023_sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h  13h  00h  00h  00h  15h"
    params: []

  - id: cmd_024_onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h  14h  00h  00h  00h  16h"
    params: []

  - id: cmd_025_onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h  15h  00h  00h  00h  17h"
    params: []

  - id: cmd_030_1_picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h  10h  00h  00h  05h  {DATA01}  FFh  {DATA02}  {DATA03}  {DATA04}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: byte
        description: Adjustment value low 8 bits
      - name: DATA04
        type: byte
        description: Adjustment value high 8 bits

  - id: cmd_030_2_volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h  10h  00h  00h  05h  05h  00h  {DATA01}  {DATA02}  {DATA03}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA02
        type: byte
        description: Value low 8 bits
      - name: DATA03
        type: byte
        description: Value high 8 bits

  - id: cmd_030_12_aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h  10h  00h  00h  05h  18h  00h  00h  {DATA01}  00h  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Aspect value. Full enum UNRESOLVED - lives in appendix not in source."

  - id: cmd_030_15_other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h  10h  00h  00h  05h  {DATA01}  {DATA02}  {DATA03}  {DATA04}  {DATA05}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Target: 96h=LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: byte
        description: Value low 8 bits
      - name: DATA04
        type: byte
        description: Value high 8 bits
      - name: DATA05
        type: byte
        description: Reserved (see source)

  - id: cmd_037_information_request
    label: Information Request
    kind: query
    command: "03h  8Ah  00h  00h  00h  8Dh"
    params: []

  - id: cmd_037_3_filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h  95h  00h  00h  00h  98h"
    params: []

  - id: cmd_037_4_lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h  96h  00h  00h  02h  {DATA01}  {DATA02}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: byte
        description: "Content: 01h=Lamp usage time (sec), 04h=Lamp remaining life (%)"

  - id: cmd_037_6_carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h  9Ah  00h  00h  01h  {DATA01}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: cmd_050_remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h  0Fh  00h  00h  02h  {DATA01}  {DATA02}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Key code low byte (e.g. 02h=POWER ON, 05h=AUTO, 29h=PICTURE, 4Bh=COMPUTER1)"
      - name: DATA02
        type: byte
        description: "Key code high byte (00h for all listed keys). Full key code table in source §3.19."

  - id: cmd_051_shutter_close
    label: Shutter Close
    kind: action
    command: "02h  16h  00h  00h  00h  18h"
    params: []

  - id: cmd_052_shutter_open
    label: Shutter Open
    kind: action
    command: "02h  17h  00h  00h  00h  19h"
    params: []

  - id: cmd_053_lens_control
    label: Lens Control
    kind: action
    command: "02h  18h  00h  00h  02h  {DATA01}  {DATA02}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Lens target (06h=Periphery Focus per source example)"
      - name: DATA02
        type: byte
        description: "Content: 00h=Stop, 01h=drive 1s plus, 02h=0.5s plus, 03h=0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=0.25s minus, FEh=0.5s minus, FFh=1s minus"

  - id: cmd_053_1_lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h  1Ch  00h  00h  02h  {DATA01}  00h  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: Lens target

  - id: cmd_053_2_lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h  1Dh  00h  00h  04h  {DATA01}  {DATA02}  {DATA03}  {DATA04}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "FFh=Stop, else lens target"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: byte
        description: Value low 8 bits
      - name: DATA04
        type: byte
        description: Value high 8 bits

  - id: cmd_053_3_lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h  1Eh  00h  00h  01h  {DATA01}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: cmd_053_4_reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h  1Fh  00h  00h  01h  {DATA01}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Operates on profile selected via cmd_053_10_lens_profile_set."

  - id: cmd_053_5_lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h  20h  00h  00h  01h  {DATA01}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: cmd_053_6_lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h  21h  00h  00h  02h  {DATA01}  {DATA02}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: byte
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: cmd_053_7_lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h  22h  00h  00h  01h  00h  25h"
    params: []

  - id: cmd_053_10_lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h  27h  00h  00h  01h  {DATA01}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: cmd_053_11_lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h  28h  00h  00h  00h  2Ah"
    params: []

  - id: cmd_060_1_gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h  05h  00h  00h  03h  {DATA01}  00h  00h  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

  - id: cmd_078_1_setting_request
    label: Setting Request
    kind: query
    command: "00h  85h  00h  00h  01h  00h  86h"
    params: []

  - id: cmd_078_2_running_status_request
    label: Running Status Request
    kind: query
    command: "00h  85h  00h  00h  01h  01h  87h"
    params: []

  - id: cmd_078_3_input_status_request
    label: Input Status Request
    kind: query
    command: "00h  85h  00h  00h  01h  02h  88h"
    params: []

  - id: cmd_078_4_mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h  85h  00h  00h  01h  03h  89h"
    params: []

  - id: cmd_078_5_model_name_request
    label: Model Name Request
    kind: query
    command: "00h  85h  00h  00h  01h  04h  8Ah"
    params: []

  - id: cmd_078_6_cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h  85h  00h  00h  01h  05h  8Bh"
    params: []

  - id: cmd_079_freeze_control
    label: Freeze Control
    kind: action
    command: "01h  98h  00h  00h  01h  {DATA01}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "01h=Freeze On, 02h=Freeze Off"

  - id: cmd_084_information_string_request
    label: Information String Request
    kind: query
    command: "00h  D0h  00h  00h  03h  00h  {DATA01}  01h  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: cmd_097_8_eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h  B0h  00h  00h  01h  07h  BBh"
    params: []

  - id: cmd_097_45_lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h  B0h  00h  00h  01h  2Ch  E0h"
    params: []

  - id: cmd_097_155_lan_mac_address_status_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h  B0h  00h  00h  02h  9Ah  00h  4Fh"
    params: []

  - id: cmd_097_198_pip_picture_by_picture_request
    label: PIP/Picture By Picture Request
    kind: query
    command: "03h  B0h  00h  00h  02h  C5h  {DATA01}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: cmd_097_243_1_edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h  B0h  00h  00h  02h  DFh  00h  94h"
    params: []

  - id: cmd_098_8_eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h  B1h  00h  00h  02h  07h  {DATA01}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Eco mode value. Enum UNRESOLVED - lives in appendix 'Supplementary Information by Command' not in source."

  - id: cmd_098_45_lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h  B1h  00h  00h  12h  2Ch  {DATA01}-{DATA16}  00h  {CKS}"
    params:
      - name: DATA01_TO_16
        type: string
        description: "Projector name, up to 16 bytes (NUL-terminated)"

  - id: cmd_098_198_pip_picture_by_picture_set
    label: PIP/Picture By Picture Set
    kind: action
    command: "03h  B1h  00h  00h  03h  C5h  {DATA01}  {DATA02}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: byte
        description: "Setting value (MODE: 00h=PIP/01h=PbP; START POSITION: 00h=TL/01h=TR/02h=BL/03h=BR; sub-input value UNRESOLVED - appendix)"

  - id: cmd_098_243_1_edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h  B1h  00h  00h  03h  DFh  00h  {DATA01}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=OFF, 01h=ON"

  - id: cmd_305_1_base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h  BFh  00h  00h  01h  00h  C0h"
    params: []

  - id: cmd_305_2_serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h  BFh  00h  00h  02h  01h  06h  C8h"
    params: []

  - id: cmd_305_3_basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h  BFh  00h  00h  01h  02h  C2h"
    params: []

  - id: cmd_319_10_audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h  C9h  00h  00h  03h  09h  {DATA01}  {DATA02}  {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal value. Enum UNRESOLVED - appendix 'Supplementary Information by Command'."
      - name: DATA02
        type: byte
        description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmap
    description: "12-byte error info returned by cmd_009. DATA01-04 = error status 1-4, DATA09 = extended status. Each bit flags one error (cover/fan/temp/lamp/etc.). Full bit map in source §3.1."
  - id: lamp_usage_time
    type: integer
    unit: seconds
    description: "From cmd_037_4 with DATA02=01h. Updated 1-min intervals."
  - id: lamp_remaining_life
    type: integer
    unit: percent
    description: "From cmd_037_4 with DATA02=04h. Negative if replacement deadline exceeded."
  - id: filter_usage_time
    type: integer
    unit: seconds
    description: "From cmd_037_3. -1 if undefined."
  - id: power_status
    type: enum
    description: "From cmd_078_2 DATA03: 00h=Standby, 01h=Power on, FFh=Not supported"
  - id: operation_status
    type: enum
    description: "From cmd_078_2 DATA06: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"
  - id: mute_status
    type: bitmap
    description: "From cmd_078_4: DATA01=Picture mute, DATA02=Sound mute, DATA03=Onscreen mute, DATA04=Forced onscreen mute, DATA05=Onscreen display"
  - id: input_status
    type: composite
    description: "From cmd_078_3: signal list number, signal type 1/2, signal list type, test pattern, content displayed"
  - id: cover_status
    type: enum
    description: "From cmd_078_6: 00h=Normal(opened), 01h=Cover closed"
  - id: model_name
    type: string
    description: From cmd_078_5 (NUL-terminated, up to 32 bytes)
  - id: serial_number
    type: string
    description: From cmd_305_2 (NUL-terminated, up to 16 bytes)
  - id: mac_address
    type: string
    description: "6-byte MAC from cmd_097_155 (e.g. 01h-23h-45h-67h-89h-ABh)"
  - id: eco_mode
    type: enum
    description: "From cmd_097_8. Enum values UNRESOLVED - appendix."
  - id: edge_blending_mode
    type: enum
    values: [off, on]
  - id: lens_status
    type: bitmap
    description: "From cmd_053_7: bits for Lens memory/Zoom/Focus/Lens Shift H+V operation status"
  - id: gain_parameter
    type: composite
    description: "From cmd_060_1: limits, default, current, wide/narrow widths per gain name"
  # UNRESOLVED: response strings for many queries (information strings, PIP/PbP values) partially enumerated in source; full enum tables in appendix
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    description: "Picture Brightness. Set via cmd_030_1 DATA01=00h. Query via cmd_060_1 DATA01=00h."
  - id: contrast
    type: integer
    description: "Picture Contrast. DATA01=01h."
  - id: color
    type: integer
    description: "Picture Color. DATA01=02h."
  - id: hue
    type: integer
    description: "Picture Hue. DATA01=03h."
  - id: sharpness
    type: integer
    description: "Picture Sharpness. DATA01=04h."
  - id: volume
    type: integer
    description: "Sound Volume. Set via cmd_030_2, query via cmd_060_1 DATA01=05h."
  - id: lamp_adjust
    type: integer
    description: "Lamp/Light Adjust. DATA01=96h."
  - id: aspect
    type: enum
    description: "Aspect ratio. Enum UNRESOLVED - appendix."
  - id: eco_mode
    type: enum
    description: "Eco/Light/Lamp mode. Enum UNRESOLVED - appendix."
  - id: projector_name
    type: string
    max_length: 16
    description: LAN projector name. Set via cmd_098_45.
```

## Events
```yaml
events: []
# UNRESOLVED: source describes only request/response model. No unsolicited
# notification / push event mechanism documented.
```

## Macros
```yaml
macros: []
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: cmd_015_power_on
    note: "No other command accepted while power-on in progress (source §3.2)."
  - command: cmd_016_power_off
    note: "No other command accepted during power-off incl. cooling time (source §3.3)."
  - command: cmd_053_lens_control
    note: "Continuous drive (7Fh/81h) must be stopped by sending 00h afterwards."
# UNRESOLVED: no other explicit safety warnings, power-on sequencing, or
# interlock procedures beyond per-command acceptance notes. Cover/lens-cover
# and interlock-switch error bits exist in error_status (DATA09 Bit1) but are
# status-only; no command-gating procedure documented.
```

## Notes
- Binary protocol. All frames hex notation with `h` suffix verbatim from source.
- Frame structure: `[prefix] [opcode] [ID1] [ID2] [LEN] [DATA...] [CKS]`. Command prefixes: 00h/01h/02h/03h = command (class bit pattern), 20h/21h/22h/23h = ack response, A0h/A1h/A2h/A3h = error response.
- Checksum: low-order byte of sum of all preceding bytes (incl. prefix, opcode, ID1, ID2, LEN, DATA). See worked example in source §2.2.
- ID1 = control ID set on projector. ID2 = model code (varies by model).
- Serial cable = cross cable to PC CONTROL (D-SUB 9P). Pinout in source §1.1.
- LAN: TCP port 7142. Wired RJ-45 10/100 auto. Wireless via optional WLAN unit.
- Power-off enters cooling time during which all commands rejected.
- Lamp/filter usage updated 1-minute intervals though queried in 1-second units.

<!-- UNRESOLVED: appendix "Supplementary Information by Command" NOT in refined source. Missing enum tables for: input terminal values, aspect values, eco mode values, base model type values, PIP/PbP sub-input values, audio-select input terminal values. -->
<!-- UNRESOLVED: default baud rate not specified (4 options). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: model code (ID2) value for XP X171Q W not stated — varies by model. -->
<!-- UNRESOLVED: control ID (ID1) default value not stated. -->
````

54 actions emitted — all rows from source §2 command list. Verbatim hex payloads preserved. Gaps marked.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:54:08.615Z
last_checked_at: 2026-06-19T07:53:05.041Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:53:05.041Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source protocol exactly; transport parameters verified; complete command coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version not stated. Input terminal value list, eco mode value list, aspect value list, base model type value list, sub-input value list all live in \"Appendix: Supplementary Information by Command\" — appendix NOT in refined source, so enum values missing. Default baud rate not specified (4 options given)."
- "source says \"Full duplex\" communication mode but no flow_control pin usage for control"
- "response strings for many queries (information strings, PIP/PbP values) partially enumerated in source; full enum tables in appendix"
- "source describes only request/response model. No unsolicited"
- "no multi-step sequences documented in source."
- "no other explicit safety warnings, power-on sequencing, or"
- "appendix \"Supplementary Information by Command\" NOT in refined source. Missing enum tables for: input terminal values, aspect values, eco mode values, base model type values, PIP/PbP sub-input values, audio-select input terminal values."
- "default baud rate not specified (4 options)."
- "firmware version compatibility not stated."
- "model code (ID2) value for XP X171Q W not stated — varies by model."
- "control ID (ID1) default value not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
