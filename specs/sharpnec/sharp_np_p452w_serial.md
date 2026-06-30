---
spec_id: admin/sharp-nec-np-p452w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP P452W Control Spec"
manufacturer: Sharp/NEC
model_family: "NP P452W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP P452W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:06:51.330Z
last_checked_at: 2026-06-18T08:47:45.930Z
generated_at: 2026-06-18T08:47:45.930Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "model code (ID2) value for NP P452W not stated in source"
  - "control ID (ID1) default value not stated in source"
  - "input terminal DATA01 value table referenced in Appendix but Appendix not included in refined source"
  - "source states \"Full duplex\" communication mode but does not specify flow_control"
  - "source documents no unsolicited notifications; device responds"
  - "source documents no explicit multi-step macro sequences."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "ID1 (control ID) default value not stated"
  - "ID2 (model code) value for NP P452W not stated"
  - "Appendix 'Supplementary Information by Command' not in refined source — input terminal, aspect, eco mode, base model type, sub input value tables missing"
  - "firmware version compatibility not stated"
  - "flow_control not stated (only 'Full duplex' communication mode documented)"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:47:45.930Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP P452W Control Spec

## Summary
Sharp/NEC NP P452W projector control spec per "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). Device supports RS-232C serial control and wired/wireless LAN control over TCP port 7142. Binary command protocol using hex byte frames with ID1 (control ID), ID2 (model code), and checksum bytes. Covers power, input switch, mute, picture/volume/aspect adjust, lens control & memory, status queries, eco mode, edge blending, PIP/PbP, and audio select.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: model code (ID2) value for NP P452W not stated in source -->
<!-- UNRESOLVED: control ID (ID1) default value not stated in source -->
<!-- UNRESOLVED: input terminal DATA01 value table referenced in Appendix but Appendix not included in refined source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists selectable: 115200/38400/19200/9600/4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode but does not specify flow_control
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred from POWER ON / POWER OFF commands
  - routable      # inferred from INPUT SW CHANGE command
  - queryable     # inferred from many REQUEST/query commands
  - levelable     # inferred from PICTURE ADJUST / VOLUME ADJUST commands
```

## Actions
```yaml
# All command frames verbatim from source. ID1, ID2, CKS are runtime-computed
# (ID1 = control ID set on projector; ID2 = model code; CKS = low byte of sum
# of all preceding bytes per section 2.2). Commands shown WITHOUT leading
# 20h/22h/A2h frame markers where source lists the bare opcode row; full
# request frames shown as documented.

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
  notes: "While turning on, no other command accepted."

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While turning off (incl. cooling time), no other command accepted."

- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal value (e.g. 06h = video port). See Appendix 'Supplementary Information by Command' for full table."
  notes: "Example to video port: 02h 03h 00h 00h 02h 01h 06h 0Eh"

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

- id: volume_adjust
  label: Volume Adjust
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

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Aspect value. See Appendix 'Supplementary Information by Command'."

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 96h=LAMP ADJUST / LIGHT ADJUST"
    - name: data02
      type: string
      description: "FFh (per source table)"
    - name: data03
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: string
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: string
      description: "Adjustment value (high-order 8 bits)"

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name, lamp usage time, filter usage time."

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
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: string
      description: "Content: 01h=usage time (s), 04h=remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Key code low byte (see Key code list)"
    - name: data02
      type: string
      description: "Key code high byte"
  notes: "Key codes: 02h/00h=POWER ON, 03h/00h=POWER OFF, 05h/00h=AUTO, 06h/00h=MENU, 07h/00h=UP, 08h/00h=DOWN, 09h/00h=RIGHT, 0Ah/00h=LEFT, 0Bh/00h=ENTER, 0Ch/00h=EXIT, 0Dh/00h=HELP, 0Fh/00h=MAGNIFY UP, 10h/00h=MAGNIFY DOWN, 13h/00h=MUTE, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, 4Ch/00h=COMPUTER2, 4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1, 84h/00h=VOLUME UP, 85h/00h=VOLUME DOWN, 8Ah/00h=FREEZE, A3h/00h=ASPECT, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO"

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
      description: "Target: 06h=Periphery Focus"
    - name: data02
      type: string
      description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Target (per source)"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "FFh=Stop, else target"
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: string
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: string
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls profile number set by 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"

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
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

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
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

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
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

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
  label: PIP / Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
      description: "Eco mode value. See Appendix 'Supplementary Information by Command'."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01}-{data16} 00h {cks}"
  params:
    - name: name_bytes
      type: string
      description: "DATA01-16: projector name, up to 16 bytes (NUL terminated)"

- id: pip_picture_by_picture_set
  label: PIP / Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: string
      description: "Setting value (mode/position/sub-input per DATA01). See Appendix."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"

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
      description: "Input terminal. See Appendix."
    - name: data02
      type: string
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: bitmask
  description: "Error info from 009. ERROR STATUS REQUEST. DATA01-12, each bit 0=normal, 1=error. Covers cover/fan/temp/power/lamp errors, formatter/FPGA/mirror/lens errors, interlock switch."

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "From 078-2 RUNNING STATUS REQUEST DATA03/06 and 305-3 DATA01."

- id: input_signal_state
  type: composite
  description: "From 078-3 INPUT STATUS REQUEST. Includes signal switch process, signal list number, selection signal type, test pattern display, content displayed."

- id: mute_state
  type: composite
  description: "From 078-4 MUTE STATUS REQUEST. Picture/sound/onscreen/forced-onscreen mute + onscreen display flags."

- id: cover_state
  type: enum
  values: [normal_open, closed]
  description: "From 078-6 COVER STATUS REQUEST."

- id: lens_state
  type: composite
  description: "From 053-7 LENS INFORMATION REQUEST. Bitmask: lens memory / zoom / focus / lens shift (H/V) operation status."

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: "From 053-11 LENS PROFILE REQUEST."

- id: eco_mode
  type: enum
  description: "From 097-8 ECO MODE REQUEST. Values per Appendix."

- id: edge_blending_mode
  type: enum
  values: [off, on]

- id: lamp_info
  type: composite
  description: "From 037-4. Lamp usage time (s) and remaining life (%)."

- id: filter_usage
  type: composite
  description: "From 037-3. Filter usage time (s) and alarm start time (s)."

- id: carbon_savings
  type: composite
  description: "From 037-6. Carbon savings in kg + mg, total or during-operation."
```

## Variables
```yaml
- id: picture_brightness
  type: integer
  description: "Via 030-1 PICTURE ADJUST, target 00h. Range per 060-1 gain request."
- id: picture_contrast
  type: integer
  description: "Via 030-1, target 01h."
- id: picture_color
  type: integer
  description: "Via 030-1, target 02h."
- id: picture_hue
  type: integer
  description: "Via 030-1, target 03h."
- id: picture_sharpness
  type: integer
  description: "Via 030-1, target 04h."
- id: volume
  type: integer
  description: "Via 030-2 VOLUME ADJUST."
- id: lamp_adjust
  type: integer
  description: "Via 030-15 OTHER ADJUST, target 96h."
- id: aspect
  type: enum
  description: "Via 030-12 ASPECT ADJUST. Values per Appendix."
- id: projector_name
  type: string
  description: "Via 098-45. Up to 16 bytes."
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications; device responds
# only to commands. No event/subscription mechanism described.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements beyond notes that no other command is
# accepted during power on/off transitions.
```

## Notes
- Command frames use hex notation with `h` suffix. Each full frame includes leading header byte (`20h`/`02h`/`03h`/`01h`/`00h` for requests, `22h`/`23h`/`21h`/`20h` for success responses, `A2h`/`A3h`/`A1h`/`A0h` for error responses) followed by opcode, `<ID1>` (control ID), `<ID2>` (model code), length, data, and `<CKS>` (checksum).
- Checksum (CKS) = low-order byte of sum of all preceding bytes.
- Power ON/OFF commands lock out all other commands during transition (incl. cooling).
- Picture/Sound/Onscreen mute auto-clear on input/video switch; Sound mute also clears on volume adjust.
- Lamp/filter usage time reported in seconds, updated at 1-minute intervals.
- Lamp remaining life (%) returned negative if replacement deadline exceeded.
- Error response format: `A2h <opcode> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>`. Full ERR1/ERR2 code table in section 2.4 (24 distinct error codes).
- Remote key code 050 command emulates IR remote; full 25-key code list included in source.

<!-- UNRESOLVED: ID1 (control ID) default value not stated -->
<!-- UNRESOLVED: ID2 (model code) value for NP P452W not stated -->
<!-- UNRESOLVED: Appendix 'Supplementary Information by Command' not in refined source — input terminal, aspect, eco mode, base model type, sub input value tables missing -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: flow_control not stated (only 'Full duplex' communication mode documented) -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:06:51.330Z
last_checked_at: 2026-06-18T08:47:45.930Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:47:45.930Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "model code (ID2) value for NP P452W not stated in source"
- "control ID (ID1) default value not stated in source"
- "input terminal DATA01 value table referenced in Appendix but Appendix not included in refined source"
- "source states \"Full duplex\" communication mode but does not specify flow_control"
- "source documents no unsolicited notifications; device responds"
- "source documents no explicit multi-step macro sequences."
- "source contains no explicit safety warnings, interlock procedures,"
- "ID1 (control ID) default value not stated"
- "ID2 (model code) value for NP P452W not stated"
- "Appendix 'Supplementary Information by Command' not in refined source — input terminal, aspect, eco mode, base model type, sub input value tables missing"
- "firmware version compatibility not stated"
- "flow_control not stated (only 'Full duplex' communication mode documented)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
