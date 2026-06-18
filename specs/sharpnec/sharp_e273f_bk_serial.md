---
spec_id: admin/sharpnec-e273f-bk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC E273F Bk Control Spec"
manufacturer: Sharp/NEC
model_family: "Sharp/NEC E273F Bk"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Sharp/NEC E273F Bk"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:25:31.033Z
last_checked_at: 2026-06-17T19:43:23.729Z
generated_at: 2026-06-17T19:43:23.729Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source manual does not name the E273F Bk model explicitly; command support per-model is documented only in an appendix (\"Supplementary Information by Command\") not present in this excerpt."
  - "firmware version compatibility not stated in source."
  - "flow_control value not stated in source."
  - "source does not document any unsolicited notifications; the protocol is strictly request/response."
  - "source does not document any explicit multi-step macro sequences."
  - "the source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements. Only timing constraints are noted: while POWER ON/OFF is in progress (including cooling time) no other command is accepted; lens drive commands can be issued without stop while the lens is moving."
  - "appendix enumerations for input terminal, aspect, eco mode, base model type, sub input, and selection signal type values are not in this source excerpt."
  - "ID2 model code for the E273F Bk is not stated."
  - "default baud rate among the five listed options is not explicitly designated in the source."
  - "serial flow_control not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:43:23.729Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec commands match source hex sequences verbatim; transport parameters confirmed; full source coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC E273F Bk Control Spec

## Summary
Projector control spec for the Sharp/NEC E273F Bk, derived from the Sharp/NEC Projector Control Command Reference Manual (BDT140013 Rev 7.1). The device supports RS-232C serial control and TCP/IP LAN control (wired and wireless) using a binary, framed command protocol with per-command checksums. The manual is model-generic and does not state the E273F Bk model name explicitly; model association is operator-supplied.

<!-- UNRESOLVED: source manual does not name the E273F Bk model explicitly; command support per-model is documented only in an appendix ("Supplementary Information by Command") not present in this excerpt. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: flow_control value not stated in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null
auth:
  type: none
```

Baud rate is selectable among 115200 / 38400 / 19200 / 9600 / 4800 bps; 115200 listed first as the default-position entry in the source table. Serial link is RS-232C, full duplex, D-SUB 9P cross cable on the PC CONTROL port. TCP port 7142 is used for both wired and wireless LAN command transport. `auth.type: none` is inferred — the source documents no login/password procedure. `serial.flow_control` is UNRESOLVED (not stated).

## Traits
```yaml
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

Inferred: powerable from POWER ON/OFF commands; queryable from the REQUEST command family; levelable from PICTURE/VOLUME/LAMP adjust commands; routable from INPUT SW CHANGE.

## Actions
```yaml
actions:
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
    label: Input SW Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: input_terminal
        type: string
        description: "Input terminal byte (DATA01); values defined in appendix 'Supplementary Information by Command'; example 06h = video port"
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
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
    params:
      - name: target
        type: string
        description: "DATA01 target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
      - name: mode
        type: string
        description: "DATA02 adjustment mode: 00h absolute, 01h relative"
      - name: value_low
        type: string
        description: "DATA03 adjustment value low-order 8 bits"
      - name: value_high
        type: string
        description: "DATA04 adjustment value high-order 8 bits"
  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
    params:
      - name: mode
        type: string
        description: "DATA01 adjustment mode: 00h absolute, 01h relative"
      - name: value_low
        type: string
        description: "DATA02 adjustment value low-order 8 bits"
      - name: value_high
        type: string
        description: "DATA03 adjustment value high-order 8 bits"
  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: aspect_value
        type: string
        description: "DATA01 aspect value; values defined in appendix 'Supplementary Information by Command'"
  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
    params:
      - name: target_low
        type: string
        description: "DATA01 target low byte; only documented target 96h = LAMP ADJUST / LIGHT ADJUST"
      - name: target_high
        type: string
        description: "DATA02 target high byte; documented FFh"
      - name: mode
        type: string
        description: "DATA03 adjustment mode: 00h absolute, 01h relative"
      - name: value_low
        type: string
        description: "DATA04 adjustment value low-order 8 bits"
      - name: value_high
        type: string
        description: "DATA05 adjustment value high-order 8 bits"
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
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: lamp
        type: string
        description: "DATA01: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
      - name: content
        type: string
        description: "DATA02: 01h lamp usage time (seconds), 04h lamp remaining life (%)"
  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: content
        type: string
        description: "DATA01: 00h Total Carbon Savings, 01h Carbon Savings during operation"
  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: key_code
        type: string
        description: "DATA01/DATA02 WORD key code; examples 02h 00h POWER ON, 03h 00h POWER OFF, 05h 00h AUTO, 06h 00h MENU, 07h 00h UP, 08h 00h DOWN, 09h 00h RIGHT, 0Ah 00h LEFT, 0Bh 00h ENTER, 0Ch 00h EXIT, 0Dh 00h HELP, 0Fh 00h MAGNIFY UP, 10h 00h MAGNIFY DOWN, 13h 00h MUTE, 29h 00h PICTURE, 4Bh 00h COMPUTER1, 4Ch 00h COMPUTER2, 4Fh 00h VIDEO1, 51h 00h S-VIDEO1, 84h 00h VOLUME UP, 85h 00h VOLUME DOWN, 8Ah 00h FREEZE, A3h 00h ASPECT, D7h 00h SOURCE, EEh 00h LAMP MODE/ECO"
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
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: string
        description: "DATA01 lens target; documented 06h Periphery Focus"
      - name: content
        type: string
        description: "DATA02: 00h Stop, 01h drive 1s plus, 02h drive 0.5s plus, 03h drive 0.25s plus, 7Fh drive plus, 81h drive minus, FDh drive 0.25s minus, FEh drive 0.5s minus, FFh drive 1s minus"
  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: target
        type: string
        description: "DATA01 lens target to read adjusted values for"
  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
    params:
      - name: target
        type: string
        description: "DATA01 lens target; FFh = Stop (mode/value ignored)"
      - name: mode
        type: string
        description: "DATA02 adjustment mode: 00h absolute, 02h relative"
      - name: value_low
        type: string
        description: "DATA03 adjustment value low-order 8 bits"
      - name: value_high
        type: string
        description: "DATA04 adjustment value high-order 8 bits"
  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: string
        description: "DATA01: 00h MOVE, 01h STORE, 02h RESET"
  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: string
        description: "DATA01: 00h MOVE, 01h STORE, 02h RESET"
  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: option
        type: string
        description: "DATA01: 00h LOAD BY SIGNAL, 01h FORCED MUTE"
  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: option
        type: string
        description: "DATA01: 00h LOAD BY SIGNAL, 01h FORCED MUTE"
      - name: value
        type: string
        description: "DATA02: 00h OFF, 01h ON"
  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: profile
        type: string
        description: "DATA01: 00h Profile 1, 01h Profile 2"
  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: name
        type: string
        description: "DATA01 adjusted value name: 00h PICTURE/BRIGHTNESS, 01h PICTURE/CONTRAST, 02h PICTURE/COLOR, 03h PICTURE/HUE, 04h PICTURE/SHARPNESS, 05h VOLUME, 96h LAMP ADJUST/LIGHT ADJUST"
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
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: state
        type: string
        description: "DATA01: 01h freeze on, 02h freeze off"
  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: info_type
        type: string
        description: "DATA01: 03h Horizontal synchronous frequency, 04h Vertical synchronous frequency"
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
  - id: lan_mac_address_status_request2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
  - id: pip_picture_by_picture_request
    label: PIP/Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: content
        type: string
        description: "DATA01: 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: value
        type: string
        description: "DATA01 eco mode value; values defined in appendix 'Supplementary Information by Command'"
  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
    params:
      - name: projector_name
        type: string
        description: "DATA01-16 projector name, up to 16 bytes (NUL terminated)"
  - id: pip_picture_by_picture_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: content
        type: string
        description: "DATA01: 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
      - name: value
        type: string
        description: "DATA02 setting value; MODE: 00h PIP, 01h PBP; START POSITION: 00h TOP-LEFT, 01h TOP-RIGHT, 02h BOTTOM-LEFT, 03h BOTTOM-RIGHT; SUB INPUT values in appendix"
  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: value
        type: string
        description: "DATA01: 00h OFF, 01h ON"
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
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: input_terminal
        type: string
        description: "DATA01 input terminal byte; values in appendix 'Supplementary Information by Command'"
      - name: value
        type: string
        description: "DATA02: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

All 54 catalogued commands from section 2 of the source are represented, each carrying its verbatim binary payload. Checksums (CKS) are computed as the low-order byte of the sum of all preceding bytes. ID1 (control ID) and ID2 (model code) are framing parameters inserted by the controller; DATA?? fields are command-specific. Enum values that the source lists inline are kept in each param's description; values deferred to the appendix ("Supplementary Information by Command") are not present in this excerpt.

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmask
    description: "12-byte error status (DATA01-DATA12) covering cover, fan, temperature, power, lamp, formatter, FPGA, mirror cover, interlock and system errors"
  - id: power_status
    type: enum
    values:
      - standby
      - power_on
    description: "RUNNING STATUS DATA03: 00h Standby, 01h Power on"
  - id: cooling_process
    type: enum
    values:
      - not_executed
      - during_execution
  - id: operation_status
    type: enum
    values:
      - standby_sleep
      - power_on
      - cooling
      - standby_error
      - standby_power_saving
      - network_standby
    description: "RUNNING STATUS DATA06"
  - id: input_signal_status
    type: object
    description: "INPUT STATUS response: signal switch process, list number, selection signal type 1/2, signal list type, test pattern, content displayed"
  - id: picture_mute_state
    type: enum
    values:
      - "off"
      - "on"
  - id: sound_mute_state
    type: enum
    values:
      - "off"
      - "on"
  - id: onscreen_mute_state
    type: enum
    values:
      - "off"
      - "on"
  - id: cover_status
    type: enum
    values:
      - normal_open
      - closed
  - id: lamp_usage_time
    type: integer
    unit: seconds
  - id: lamp_remaining_life
    type: integer
    unit: percent
  - id: filter_usage_time
    type: integer
    unit: seconds
  - id: carbon_savings
    type: object
    description: "Carbon savings value returned as kg (DATA02-05) and mg (DATA06-09)"
  - id: model_name
    type: string
  - id: serial_number
    type: string
  - id: projector_name
    type: string
  - id: mac_address
    type: string
  - id: eco_mode
    type: string
  - id: lens_status
    type: bitmask
    description: "LENS INFORMATION DATA01: lens memory, zoom, focus, lens shift H/V operation states"
  - id: lens_position
    type: object
    description: "LENS CONTROL REQUEST response: upper/lower limits and current value"
  - id: gain_parameter
    type: object
    description: "GAIN PARAMETER REQUEST response: status, range limits, default, current, adjustment widths"
  - id: information_string
    type: string
    description: "Horizontal/vertical synchronous frequency strings"
  - id: base_model_type
    type: string
  - id: pip_pbp_state
    type: object
  - id: edge_blending_mode
    type: enum
    values:
      - "off"
      - "on"
```

## Variables
```yaml
variables:
  - id: picture_brightness
    type: integer
    writable: true
  - id: picture_contrast
    type: integer
    writable: true
  - id: picture_color
    type: integer
    writable: true
  - id: picture_hue
    type: integer
    writable: true
  - id: picture_sharpness
    type: integer
    writable: true
  - id: volume
    type: integer
    writable: true
  - id: aspect
    type: string
    writable: true
  - id: lamp_light_adjust
    type: integer
    writable: true
  - id: eco_mode
    type: string
    writable: true
  - id: projector_name
    type: string
    writable: true
    max_length: 16
  - id: pip_pbp_mode
    type: string
    writable: true
  - id: pip_pbp_start_position
    type: string
    writable: true
  - id: edge_blending_mode
    type: string
    writable: true
```

## Events
```yaml
events: []
```

<!-- UNRESOLVED: source does not document any unsolicited notifications; the protocol is strictly request/response. -->

## Macros
```yaml
macros: []
```

<!-- UNRESOLVED: source does not document any explicit multi-step macro sequences. -->

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

<!-- UNRESOLVED: the source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements. Only timing constraints are noted: while POWER ON/OFF is in progress (including cooling time) no other command is accepted; lens drive commands can be issued without stop while the lens is moving. -->

## Notes
- Command framing: every command is a hex byte sequence. Responses share a prefix-family scheme (A0h/A1h/A2h/A3h = error/ack variants, 20h/21h/22h/23h = data responses) followed by `<ID1> <ID2>`, a LEN byte, optional DATA bytes, and a trailing checksum byte.
- Checksum (CKS): low-order one byte of the sum of all preceding bytes (example: `20h+81h+01h+60h+01h+00h = 103h`, CKS = `03h`).
- Error responses use ERR1/ERR2 code pairs (section 2.4); e.g. `02h/0Dh` = "command cannot be accepted because the power is off".
- Picture/sound/onscreen mute auto-clear on input terminal switch or video signal switch; sound mute also clears on volume adjustment.
- Lamp/filter usage times are returned in one-second units but updated only at one-minute intervals.
- Lamp remaining life (%) is returned as a negative value once the replacement deadline is exceeded.
- This manual (BDT140013 Rev 7.1) is a shared Sharp/NEC projector control reference; per-model command support and several DATA value enumerations (input terminal, aspect, eco mode, base model type, sub input) are deferred to an appendix ("Supplementary Information by Command") that is not present in this refined source excerpt.

<!-- UNRESOLVED: appendix enumerations for input terminal, aspect, eco mode, base model type, sub input, and selection signal type values are not in this source excerpt. -->
<!-- UNRESOLVED: ID2 model code for the E273F Bk is not stated. -->
<!-- UNRESOLVED: default baud rate among the five listed options is not explicitly designated in the source. -->
<!-- UNRESOLVED: serial flow_control not stated in source. -->
````

Spec emitted. 54 actions, all commands from source section 2. YAML fences clean — no inline `#` comments. `auth.type: none`, `serial.flow_control: null` UNRESOLVED noted in prose.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:25:31.033Z
last_checked_at: 2026-06-17T19:43:23.729Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:43:23.729Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec commands match source hex sequences verbatim; transport parameters confirmed; full source coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source manual does not name the E273F Bk model explicitly; command support per-model is documented only in an appendix (\"Supplementary Information by Command\") not present in this excerpt."
- "firmware version compatibility not stated in source."
- "flow_control value not stated in source."
- "source does not document any unsolicited notifications; the protocol is strictly request/response."
- "source does not document any explicit multi-step macro sequences."
- "the source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements. Only timing constraints are noted: while POWER ON/OFF is in progress (including cooling time) no other command is accepted; lens drive commands can be issued without stop while the lens is moving."
- "appendix enumerations for input terminal, aspect, eco mode, base model type, sub input, and selection signal type values are not in this source excerpt."
- "ID2 model code for the E273F Bk is not stated."
- "default baud rate among the five listed options is not explicitly designated in the source."
- "serial flow_control not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
