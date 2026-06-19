---
spec_id: admin/sharp-nec-m861
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC M861 Control Spec"
manufacturer: Sharp/NEC
model_family: M861
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - M861
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:39:14.218Z
last_checked_at: 2026-06-18T08:12:32.249Z
generated_at: 2026-06-18T08:12:32.249Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "command appendix \"Supplementary Information by Command\" is not in the refined source, so enumerated values for input terminal, aspect, eco mode, sub-input, and base model type are not captured."
  - "flow control not stated (RTS/CTS pins present on D-SUB 9P)"
  - "axis enum not stated in source.\""
  - "enum referenced appendix not in source"
  - "no additional standalone variables beyond those covered by Actions."
  - "no event/notification frames stated in source."
  - "no multi-step command sequences documented in source."
  - "no explicit power-on sequencing procedure or safety interlock"
  - "ID1 control ID value not stated."
  - "ID2 model code for M861 not stated."
  - "default baud rate not stated."
  - "serial flow control not stated."
  - "appendix \"Supplementary Information by Command\" missing — input terminal, aspect, eco mode, sub-input, audio-select input, and base-model-type enum tables not captured."
  - "lens axis byte enums for LENS CONTROL (053) and LENS CONTROL 2 (053-2) only partially documented in source."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:12:32.249Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC M861 Control Spec

## Summary
Sharp/NEC M861 large-venue projector controlled via RS-232C serial or wired/wireless LAN (TCP, port 7142). Binary frame protocol: each command is a hex byte sequence terminated by a one-byte checksum (low-order 8 bits of the sum of all preceding bytes). This spec covers the full command catalogue from the Projector Control Command Reference Manual (BDT140013 Rev 7.1).

<!-- UNRESOLVED: command appendix "Supplementary Information by Command" is not in the refined source, so enumerated values for input terminal, aspect, eco mode, sub-input, and base model type are not captured. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # all stated as supported; default UNRESOLVED
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated (RTS/CTS pins present on D-SUB 9P)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: 015 POWER ON / 016 POWER OFF commands
- routable        # inferred: 018 INPUT SW CHANGE command
- queryable       # inferred: many *REQUEST commands return state
- levelable       # inferred: 030-2 VOLUME ADJUST, 030-1 PICTURE ADJUST
```

## Actions
```yaml
# All payloads verbatim from source. Checksum (CKS) = low-order byte of sum of all preceding bytes.
# <ID1> <ID2> are runtime-substituted control ID and model code; their values are UNRESOLVED (set on projector / model-dependent).

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal byte (hex). Example: 06h = video port. Full enum UNRESOLVED - referenced appendix 'Supplementary Information by Command' not in source."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target (hex): 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: data02
      type: string
      description: "Adjustment mode (hex): 00h=absolute, 01h=relative."
    - name: data03
      type: string
      description: "Adjustment value low-order 8 bits (hex)."
    - name: data04
      type: string
      description: "Adjustment value high-order 8 bits (hex)."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment mode (hex): 00h=absolute, 01h=relative."
    - name: data02
      type: string
      description: "Adjustment value low-order 8 bits (hex)."
    - name: data03
      type: string
      description: "Adjustment value high-order 8 bits (hex)."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Aspect value (hex). Enum UNRESOLVED - referenced appendix 'Supplementary Information by Command' not in source."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target high byte (hex). Source only documents 96h."
    - name: data02
      type: string
      description: "Adjustment target low byte (hex). Source only documents FFh."
    - name: data03
      type: string
      description: "Adjustment mode (hex): 00h=absolute, 01h=relative."
    - name: data04
      type: string
      description: "Adjustment value low-order 8 bits (hex)."
    - name: data05
      type: string
      description: "Adjustment value high-order 8 bits (hex)."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lamp selector (hex): 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
    - name: data02
      type: string
      description: "Content (hex): 01h=usage time (s), 04h=remaining life (%)."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Scope (hex): 00h=Total, 01h=during operation."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Key code low byte (hex). See key code list (e.g. 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO)."
    - name: data02
      type: string
      description: "Key code high byte (hex). All documented codes have high byte 00h."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lens axis (hex). Source only documents 06h=Periphery Focus. Other axes UNRESOLVED."
    - name: data02
      type: string
      description: "Drive command (hex): 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Lens axis selector (hex). UNRESOLVED: axis enum not stated in source."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Lens axis (hex). Source only documents FFh=Stop. Other axes UNRESOLVED."
    - name: data02
      type: string
      description: "Adjustment mode (hex): 00h=absolute, 02h=relative."
    - name: data03
      type: string
      description: "Adjustment value low-order 8 bits (hex)."
    - name: data04
      type: string
      description: "Adjustment value high-order 8 bits (hex)."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Operation (hex): 00h=MOVE, 01h=STORE, 02h=RESET."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Operation (hex): 00h=MOVE, 01h=STORE, 02h=RESET. Acts on profile selected via 053-10."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Option (hex): 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Option (hex): 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: data02
      type: string
      description: "Setting value (hex): 00h=OFF, 01h=ON."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Profile number (hex): 00h=Profile 1, 01h=Profile 2."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Adjusted value name (hex): 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Freeze state (hex): 01h=ON, 02h=OFF."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "Information type (hex): 03h=Horizontal sync frequency, 04h=Vertical sync frequency."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Target (hex): 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Eco mode value (hex). Enum UNRESOLVED - referenced appendix 'Supplementary Information by Command' not in source."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01} {data02} {data03} {data04} {data05} {data06} {data07} {data08} {data09} {data10} {data11} {data12} {data13} {data14} {data15} {data16} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Projector name byte 1 (hex). DATA01-DATA16 = up to 16 bytes, NUL-terminated."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Target (hex): 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: data02
      type: string
      description: "Setting value (hex). For MODE: 00h=PIP, 01h=PBP. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. For SUB INPUT: value enum UNRESOLVED (appendix not in source)."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Setting value (hex): 00h=OFF, 01h=ON."
    - name: cks
      type: string
      description: "Checksum byte (computed)."

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal (hex). Enum UNRESOLVED - referenced appendix 'Supplementary Information by Command' not in source."
    - name: data02
      type: string
      description: "Audio source (hex): 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
    - name: cks
      type: string
      description: "Checksum byte (computed)."
```

## Feedbacks
```yaml
# Observable states returned by query responses. Full byte-layout in source §3.
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: running_status_request DATA03/DATA06

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  source: running_status_request DATA04

- id: input_signal
  type: composite
  description: "Signal list number + selection signal type 1/2 + signal list type. See 078-3 INPUT STATUS REQUEST DATA01-DATA10."

- id: mute_state
  type: composite
  description: "Picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each 00h=off / 01h=on). See 078-4 MUTE STATUS REQUEST."

- id: cover_state
  type: enum
  values: [normal_open, cover_closed]
  source: cover_status_request DATA01

- id: freeze_state
  type: enum
  values: [off, on]
  source: basic_information_request DATA09

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: lamp_information_request_3 (DATA03-DATA06 when content=01h)

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: lamp_information_request_3 (DATA03-DATA06 when content=04h); negative if replacement deadline exceeded

- id: filter_usage_time
  type: integer
  unit: seconds
  source: filter_usage_information_request DATA01-DATA04

- id: lens_motion
  type: composite
  description: "Per-axis stop/during-operation flags for lens memory, zoom, focus, lens shift H/V. See 053-7 LENS INFORMATION REQUEST DATA01."

- id: eco_mode
  type: enum
  values: []  # UNRESOLVED: enum referenced appendix not in source

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: edge_blending_mode_request DATA01

- id: error_status
  type: composite
  description: "12-byte bitmap: cover, fan, temperature, power, lamp, formatter, FPGA, mirror-cover, foreign-matter, iris, lens-installed, ballast-comm, interlock-switch-open, system errors. See 009 ERROR STATUS REQUEST DATA01-DATA12."
```

## Variables
```yaml
# Settable parameters with continuous/enum ranges (distinct from discrete actions above).
# Most settable state is expressed via the Actions above; this section reserved for
# parameters that are read/write pairs.
# UNRESOLVED: no additional standalone variables beyond those covered by Actions.
```

## Events
```yaml
# Source describes only request/response. No unsolicited notifications documented.
# UNRESOLVED: no event/notification frames stated in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: lens_cover_interlock
    description: "Interlock switch status reported in error_status_request DATA09 bit1 (1 = open)."
    source: 009 ERROR STATUS REQUEST
  - id: portrait_cover_orientation
    description: "Portrait cover side-up reported in error_status_request DATA09 bit0."
    source: 009 ERROR STATUS REQUEST
  - id: power_lockout
    description: "While POWER ON is executing, no other command is accepted. While POWER OFF is executing (including cooling time), no other command is accepted."
    source: 015 POWER ON / 016 POWER OFF
# UNRESOLVED: no explicit power-on sequencing procedure or safety interlock
# enforcement commands documented in source.
```

## Notes
- Frame format: `{first byte} {cmd byte} {ID1} {ID2} {LEN} {DATA...} {CKS}`. First byte indicates direction/message class (`00h`/`01h`/`02h`/`03h` = host→projector request variants; `20h`/`21h`/`22h`/`23h` = projector→host success response; `A*h` = error response).
- Checksum (CKS) = low-order 8 bits of the sum of all preceding bytes (including the first byte). Example from source: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- ID1 = projector control ID (set on device); ID2 = model code (model-dependent). Both values UNRESOLVED for M861 — not stated in this source.
- Default baud rate not stated; the projector accepts 4800–115200 bps. Configure the host to match the projector's setting.
- Several commands (INPUT SW CHANGE, ASPECT ADJUST, ECO MODE SET, PIP SUB INPUT, AUDIO SELECT, BASE MODEL TYPE) reference an appendix "Supplementary Information by Command" that is not present in the refined source — their enum value tables are UNRESOLVED.
- Lamp information and projector information are updated at one-minute intervals despite one-second resolution in the returned values.
- Lamp 2 fields are only valid on two-lamp projector models.

<!-- UNRESOLVED: ID1 control ID value not stated. -->
<!-- UNRESOLVED: ID2 model code for M861 not stated. -->
<!-- UNRESOLVED: default baud rate not stated. -->
<!-- UNRESOLVED: serial flow control not stated. -->
<!-- UNRESOLVED: appendix "Supplementary Information by Command" missing — input terminal, aspect, eco mode, sub-input, audio-select input, and base-model-type enum tables not captured. -->
<!-- UNRESOLVED: lens axis byte enums for LENS CONTROL (053) and LENS CONTROL 2 (053-2) only partially documented in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:39:14.218Z
last_checked_at: 2026-06-18T08:12:32.249Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:12:32.249Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "command appendix \"Supplementary Information by Command\" is not in the refined source, so enumerated values for input terminal, aspect, eco mode, sub-input, and base model type are not captured."
- "flow control not stated (RTS/CTS pins present on D-SUB 9P)"
- "axis enum not stated in source.\""
- "enum referenced appendix not in source"
- "no additional standalone variables beyond those covered by Actions."
- "no event/notification frames stated in source."
- "no multi-step command sequences documented in source."
- "no explicit power-on sequencing procedure or safety interlock"
- "ID1 control ID value not stated."
- "ID2 model code for M861 not stated."
- "default baud rate not stated."
- "serial flow control not stated."
- "appendix \"Supplementary Information by Command\" missing — input terminal, aspect, eco mode, sub-input, audio-select input, and base-model-type enum tables not captured."
- "lens axis byte enums for LENS CONTROL (053) and LENS CONTROL 2 (053-2) only partially documented in source."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
