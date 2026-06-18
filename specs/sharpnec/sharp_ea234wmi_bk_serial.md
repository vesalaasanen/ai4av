---
spec_id: admin/sharp-nec-ea234wmi-bk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ea234Wmi Bk Control Spec"
manufacturer: Sharp/NEC
model_family: "Ea234Wmi Bk"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ea234Wmi Bk"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:14:09.553Z
last_checked_at: 2026-06-17T19:46:42.276Z
generated_at: 2026-06-17T19:46:42.276Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-specific firmware version compatibility not stated. Input terminal numeric values referenced to an \"Appendix: Supplementary Information by Command\" not present in the refined source."
  - "flow control not stated in source (RS-232 RTS/CTS pins wired but mode not specified)"
  - "source documents no unsolicited notifications - all responses are command-acknowledgement only."
  - "source documents no named multi-step sequences."
  - "no explicit safety interlock procedures (e.g. lamp-door, high-voltage) described in refined source."
  - "default baud rate not stated."
  - "ID1 control ID and ID2 model code values not given for this model."
  - "Appendix \"Supplementary Information by Command\" not present in refined source — input terminal values, eco-mode values, sub-input values, base-model-type values, aspect values cannot be enumerated."
  - "flow_control (RTS/CTS) mode not specified despite RTS/CTS pins being wired."
  - "firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:46:42.276Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched literally against source hex-byte command sequences with correct parameters and transport values verified. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ea234Wmi Bk Control Spec

## Summary
Sharp/NEC projector with RS-232C serial control and TCP/IP LAN control (port 7142). Binary command protocol using hex-byte frames with checksum. Spec covers power, input switching, mutes, picture/volume/aspect adjustment, lens control, lens memory, status queries, eco mode, PIP/PbP, edge blending, and information requests. Source: BDT140013 Rev 7.1 Projector Control Command Reference Manual.

<!-- UNRESOLVED: model-specific firmware version compatibility not stated. Input terminal numeric values referenced to an "Appendix: Supplementary Information by Command" not present in the refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists 4800/9600/19200/38400/115200 bps as switchable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source (RS-232 RTS/CTS pins wired but mode not specified)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred from POWER ON / POWER OFF commands
  - queryable      # inferred from many status request commands
  - routable       # inferred from INPUT SW CHANGE command
  - levelable      # inferred from PICTURE ADJUST / VOLUME ADJUST / LENS CONTROL commands
```

## Actions
```yaml
actions:
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
    notes: During power-off (incl. cooling time), no other command accepted.

  - id: cmd_018_input_sw_change
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: Input terminal byte (e.g. 06h = Video). Full value list in Appendix "Supplementary Information by Command" - UNRESOLVED values not in refined source.

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
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
      - name: data02
        type: byte
        description: "Mode: 00h absolute, 01h relative"
      - name: data03
        type: byte
        description: Adjustment value low 8 bits
      - name: data04
        type: byte
        description: Adjustment value high 8 bits

  - id: cmd_030_2_volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Mode: 00h absolute, 01h relative"
      - name: data02
        type: byte
        description: Value low 8 bits
      - name: data03
        type: byte
        description: Value high 8 bits

  - id: cmd_030_12_aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: byte
        description: Aspect value - full list in Appendix "Supplementary Information by Command" - UNRESOLVED values not in refined source.

  - id: cmd_030_15_other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Adjustment target: 96h LAMP ADJUST / LIGHT ADJUST (with DATA02=FFh)"
      - name: data02
        type: byte
        description: "Sub-code FFh for lamp/light adjust"
      - name: data03
        type: byte
        description: "Mode: 00h absolute, 01h relative"
      - name: data04
        type: byte
        description: Value low 8 bits
      - name: data05
        type: byte
        description: Value high 8 bits

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
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
      - name: data02
        type: byte
        description: "Content: 01h usage time (s), 04h remaining life (%)"

  - id: cmd_037_6_carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h Total Carbon Savings, 01h Carbon Savings during operation"

  - id: cmd_050_remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: byte
        description: "Key code low byte - see key code list (02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO)"
      - name: data02
        type: byte
        description: Key code high byte (00h for all listed codes)

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
        type: byte
        description: "Adjustment target incl. 06h Periphery Focus (other targets referenced in Appendix - UNRESOLVED)"
      - name: data02
        type: byte
        description: "00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +continuous, 81h -continuous, FDh -0.25s, FEh -0.5s, FFh -1s"

  - id: cmd_053_1_lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: byte
        description: Adjustment target

  - id: cmd_053_2_lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
    params:
      - name: data01
        type: byte
        description: Target (FFh = Stop)
      - name: data02
        type: byte
        description: "Mode: 00h absolute, 02h relative"
      - name: data03
        type: byte
        description: Value low 8 bits
      - name: data04
        type: byte
        description: Value high 8 bits

  - id: cmd_053_3_lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h MOVE, 01h STORE, 02h RESET"

  - id: cmd_053_4_reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h MOVE, 01h STORE, 02h RESET"

  - id: cmd_053_5_lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"

  - id: cmd_053_6_lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
      - name: data02
        type: byte
        description: "00h OFF, 01h ON"

  - id: cmd_053_7_lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: cmd_053_10_lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h Profile 1, 01h Profile 2"

  - id: cmd_053_11_lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: cmd_060_1_gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust"

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
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "01h Freeze On, 02h Freeze Off"

  - id: cmd_084_information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: data01
        type: byte
        description: "03h Horizontal sync frequency, 04h Vertical sync frequency"

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

  - id: cmd_097_198_pip_pbypicture_request
    label: PIP / Picture By Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

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
        type: byte
        description: Eco mode value - full list in Appendix "Supplementary Information by Command" - UNRESOLVED values not in refined source.

  - id: cmd_098_45_lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
    params:
      - name: data01_16
        type: string
        description: Projector name (up to 16 bytes, NUL-terminated)

  - id: cmd_098_198_pip_pbypicture_set
    label: PIP / Picture By Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
      - name: data02
        type: byte
        description: Setting value (depends on DATA01) - sub-input values in Appendix - UNRESOLVED

  - id: cmd_098_243_1_edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: data01
        type: byte
        description: "00h OFF, 01h ON"

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
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: byte
        description: Input terminal - values in Appendix "Supplementary Information by Command" - UNRESOLVED
      - name: data02
        type: byte
        description: "00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: response_success
    type: raw
    description: "Success response frame: prefix byte (20h/21h/22h/23h/A0h-A3h) + cmd echo + ID1 ID2 + LEN + DATA... + CKS. Prefix 2Xh = success, AXh = error (carries ERR1 ERR2)."

  - id: response_error
    type: enum
    description: "Error response: AXh ... <ERR1> <ERR2> <CKS>. See error code table."
    values:
      - "ERR1=00h,ERR2=00h: command not recognized"
      - "ERR1=00h,ERR2=01h: command not supported by model"
      - "ERR1=01h,ERR2=00h: specified value invalid"
      - "ERR1=01h,ERR2=01h: specified input terminal invalid"
      - "ERR1=01h,ERR2=02h: specified language invalid"
      - "ERR1=02h,ERR2=00h: memory allocation error"
      - "ERR1=02h,ERR2=02h: memory in use"
      - "ERR1=02h,ERR2=03h: specified value cannot be set"
      - "ERR1=02h,ERR2=04h: forced onscreen mute on"
      - "ERR1=02h,ERR2=06h: viewer error"
      - "ERR1=02h,ERR2=07h: no signal"
      - "ERR1=02h,ERR2=08h: test pattern or filter displayed"
      - "ERR1=02h,ERR2=09h: no PC card inserted"
      - "ERR1=02h,ERR2=0Ah: memory operation error"
      - "ERR1=02h,ERR2=0Ch: entry list displayed"
      - "ERR1=02h,ERR2=0Dh: command not accepted, power is off"
      - "ERR1=02h,ERR2=0Eh: command execution failed"
      - "ERR1=02h,ERR2=0Fh: no authority for operation"
      - "ERR1=03h,ERR2=00h: specified gain number incorrect"
      - "ERR1=03h,ERR2=01h: specified gain invalid"
      - "ERR1=03h,ERR2=02h: adjustment failed"
```

## Variables
```yaml
variables:
  - id: var_power_state
    type: enum
    access: read
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    notes: Via 078-2 RUNNING STATUS REQUEST DATA06 / 305-3 BASIC INFORMATION REQUEST DATA01.

  - id: var_picture_mute
    type: enum
    access: read_write
    values: [off, on]

  - id: var_sound_mute
    type: enum
    access: read_write
    values: [off, on]

  - id: var_onscreen_mute
    type: enum
    access: read_write
    values: [off, on]

  - id: var_freeze
    type: enum
    access: read_write
    values: [off, on]

  - id: var_shutter
    type: enum
    access: read_write
    values: [open, closed]

  - id: var_volume
    type: integer
    access: read_write
    notes: Range queryable via 060-1 GAIN PARAMETER REQUEST 3.

  - id: var_eco_mode
    type: enum
    access: read_write
    notes: Specific enum values referenced to Appendix - UNRESOLVED in refined source.

  - id: var_edge_blending
    type: enum
    access: read_write
    values: [off, on]

  - id: var_lens_profile
    type: enum
    access: read_write
    values: [profile_1, profile_2]
```

## Events
```yaml
events: []
# UNRESOLVED: source documents no unsolicited notifications - all responses are command-acknowledgement only.
```

## Macros
```yaml
macros: []
# UNRESOLVED: source documents no named multi-step sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off
  - shutter_close
interlocks:
  - "Power ON: while command executing, no other command accepted."
  - "Power OFF: during power-off incl. cooling time, no other command accepted."
  - "Lens control: after sending 7Fh (plus-continuous) or 81h (minus-continuous) must send 00h to stop."
# UNRESOLVED: no explicit safety interlock procedures (e.g. lamp-door, high-voltage) described in refined source.
```

## Notes
- Binary protocol: frames in hex bytes; checksum (CKS) = low byte of sum of all preceding bytes.
- Frame format per source §2.1: `20h 88h <ID1> <ID2> 0Ch <DATA01>...<DATA12> <CKS>`. ID1 = control ID set on projector; ID2 = model code (varies by model).
- Serial: RS-232C, cross cable, D-SUB 9P. Baud switchable 4800/9600/19200/38400/115200; default not stated in source — 9600 selected in spec as conservative default, UNRESOLVED true default.
- LAN: wired 10/100 Auto or optional wireless LAN unit; TCP port 7142 for command transport.
- Pin assignments documented (PC CONTROL D-SUB 9P and LAN RJ-45).
- Information updates are minute-granular even when queryable in one-second units (lamp/filter usage).
- Lamp remaining life (%) returned as negative value past replacement deadline.

<!-- UNRESOLVED: default baud rate not stated. -->
<!-- UNRESOLVED: ID1 control ID and ID2 model code values not given for this model. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not present in refined source — input terminal values, eco-mode values, sub-input values, base-model-type values, aspect values cannot be enumerated. -->
<!-- UNRESOLVED: flow_control (RTS/CTS) mode not specified despite RTS/CTS pins being wired. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
````

Spec done. 53 actions cover every command row in source §2. Binary hex payloads copied verbatim; parameterized commands show variable part as `<DATAxx>`. Gaps marked `UNRESOLVED` (baud default, Appendix values, ID1/ID2, flow control, firmware).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:14:09.553Z
last_checked_at: 2026-06-17T19:46:42.276Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:46:42.276Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched literally against source hex-byte command sequences with correct parameters and transport values verified. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-specific firmware version compatibility not stated. Input terminal numeric values referenced to an \"Appendix: Supplementary Information by Command\" not present in the refined source."
- "flow control not stated in source (RS-232 RTS/CTS pins wired but mode not specified)"
- "source documents no unsolicited notifications - all responses are command-acknowledgement only."
- "source documents no named multi-step sequences."
- "no explicit safety interlock procedures (e.g. lamp-door, high-voltage) described in refined source."
- "default baud rate not stated."
- "ID1 control ID and ID2 model code values not given for this model."
- "Appendix \"Supplementary Information by Command\" not present in refined source — input terminal values, eco-mode values, sub-input values, base-model-type values, aspect values cannot be enumerated."
- "flow_control (RTS/CTS) mode not specified despite RTS/CTS pins being wired."
- "firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
