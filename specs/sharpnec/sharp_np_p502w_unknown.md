---
spec_id: admin/sharp-nec-np-p502w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP P502W Control Spec"
manufacturer: Sharp/NEC
model_family: "NP P502W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP P502W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:44:38.783Z
last_checked_at: 2026-06-18T08:48:58.540Z
generated_at: 2026-06-18T08:48:58.540Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input-terminal value table, aspect value table, eco-mode value table, base-model-type values, and signal-type values are referenced to an \"Appendix: Supplementary Information by Command\" that is not present in the refined source."
  - "flow control not stated in source (RTS/CTS pins wired but mode unspecified)"
  - "source does not describe any event/push-notification mechanism."
  - "no explicit safety/interlock procedures beyond power command acceptance notes;"
  - "input-terminal value table, aspect value table, eco-mode value table, base-model-type values, and signal-type mapping referenced to an Appendix (\"Supplementary Information by Command\") not present in this refined source."
  - "firmware version compatibility not stated in source."
  - "serial flow control mode not explicitly stated (RTS/CTS pins wired in pin assignment)."
  - "protocol version number not stated; manual revision is BDT140013 Rev 7.1."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:48:58.540Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP P502W Control Spec

## Summary
The Sharp/NEC NP P502W is an LCD projector controllable via RS-232C serial (PC CONTROL D-SUB 9P) or wired/wireless LAN (TCP port 7142). This spec covers the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input switching, mute, picture/volume/aspect adjustment, lens and lens-memory control, shutter, freeze, eco mode, edge blending, PIP/PbP, and a broad set of status queries.

<!-- UNRESOLVED: input-terminal value table, aspect value table, eco-mode value table, base-model-type values, and signal-type values are referenced to an "Appendix: Supplementary Information by Command" that is not present in the refined source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: "115200/38400/19200/9600/4800"  # multiple rates supported per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (RTS/CTS pins wired but mode unspecified)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred from POWER ON / POWER OFF commands
  - queryable     # inferred from numerous status query commands
  - levelable     # inferred from picture/volume/lamp adjustment commands
```

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
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {input} {checksum}"
    params:
      - name: input
        type: integer
        description: "Input terminal value (DATA01); see Appendix Supplementary Information by Command. Example: 06h = video port"

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
    command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: enum
        description: "Adjustment target (DATA01): 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: enum
        description: "Adjustment mode (DATA02): 00h=absolute, 01h=relative"
      - name: value_lo
        type: integer
        description: "Adjustment value low-order 8 bits (DATA03)"
      - name: value_hi
        type: integer
        description: "Adjustment value high-order 8 bits (DATA04)"

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: mode
        type: enum
        description: "Adjustment mode (DATA01): 00h=absolute, 01h=relative"
      - name: value_lo
        type: integer
        description: "Adjustment value low-order 8 bits (DATA02)"
      - name: value_hi
        type: integer
        description: "Adjustment value high-order 8 bits (DATA03)"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect} 00h {checksum}"
    params:
      - name: aspect
        type: integer
        description: "Aspect value (DATA01); see Appendix Supplementary Information by Command"

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: mode
        type: enum
        description: "Adjustment mode (DATA03): 00h=absolute, 01h=relative"
      - name: value_lo
        type: integer
        description: "Adjustment value low-order 8 bits (DATA04)"
      - name: value_hi
        type: integer
        description: "Adjustment value high-order 8 bits (DATA05)"

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
    command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
    params:
      - name: lamp
        type: enum
        description: "Lamp selector (DATA01): 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: content
        type: enum
        description: "Content (DATA02): 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {type} {checksum}"
    params:
      - name: type
        type: enum
        description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {keycode_lo} {keycode_hi} {checksum}"
    params:
      - name: keycode_lo
        type: integer
        description: "Key code low byte (DATA01), e.g. 05h=AUTO, 06h=MENU, 84h=VOLUME UP"
      - name: keycode_hi
        type: integer
        description: "Key code high byte (DATA02), typically 00h"

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
    command: "02h 18h 00h 00h 02h {target} {content} {checksum}"
    params:
      - name: target
        type: enum
        description: "DATA01 adjustment target (e.g. 06h=Periphery Focus)"
      - name: content
        type: enum
        description: "DATA02: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
    params:
      - name: target
        type: integer
        description: "DATA01 lens adjustment target"

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: enum
        description: "DATA01: FFh=Stop, or lens target"
      - name: mode
        type: enum
        description: "DATA02: 00h=absolute, 02h=relative"
      - name: value_lo
        type: integer
        description: "Adjustment value low-order 8 bits (DATA03)"
      - name: value_hi
        type: integer
        description: "Adjustment value high-order 8 bits (DATA04)"

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
    params:
      - name: operation
        type: enum
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
    params:
      - name: operation
        type: enum
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {option} {checksum}"
    params:
      - name: option
        type: enum
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {option} {value} {checksum}"
    params:
      - name: option
        type: enum
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: enum
        description: "DATA02: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {profile} {checksum}"
    params:
      - name: profile
        type: enum
        description: "DATA01: 00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {name} 00h 00h {checksum}"
    params:
      - name: name
        type: enum
        description: "DATA01 adjusted value: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"

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
    command: "01h 98h 00h 00h 01h {state} {checksum}"
    params:
      - name: state
        type: enum
        description: "DATA01: 01h=freeze on, 02h=freeze off"

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {type} 01h {checksum}"
    params:
      - name: type
        type: enum
        description: "DATA01: 03h=horizontal sync frequency, 04h=vertical sync frequency"

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
    label: PIP / Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {item} {checksum}"
    params:
      - name: item
        type: enum
        description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {mode} {checksum}"
    params:
      - name: mode
        type: integer
        description: "Eco mode value (DATA01); see Appendix Supplementary Information by Command"

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {name_bytes} 00h {checksum}"
    params:
      - name: name_bytes
        type: string
        description: "Projector name up to 16 bytes (DATA01-16), NUL-terminated"

  - id: pip_picture_by_picture_set
    label: PIP / Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {item} {value} {checksum}"
    params:
      - name: item
        type: enum
        description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "DATA02 setting value (MODE: 00h=PIP,01h=PbP; START POSITION: 00h-03h corners; sub input values per Appendix)"

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {mode} {checksum}"
    params:
      - name: mode
        type: enum
        description: "DATA01: 00h=OFF, 01h=ON"

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
    command: "03h C9h 00h 00h 03h 09h {input} {value} {checksum}"
    params:
      - name: input
        type: integer
        description: "DATA01 input terminal; see Appendix Supplementary Information by Command"
      - name: value
        type: enum
        description: "DATA02: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "From running status request (DATA03) / basic information request (DATA01)"

  - id: error_status
    type: bitmask
    description: "From error status request; 12 data bytes of per-bit error flags (cover, fan, temperature, lamp, etc.)"

  - id: picture_mute_state
    type: enum
    values: [off, on]
    description: "From mute status request (DATA01)"

  - id: sound_mute_state
    type: enum
    values: [off, on]
    description: "From mute status request (DATA02)"

  - id: onscreen_mute_state
    type: enum
    values: [off, on]
    description: "From mute status request (DATA03)"

  - id: input_signal_status
    type: object
    description: "From input status request (signal type, list number, content displayed)"

  - id: cover_status
    type: enum
    values: [normal_open, closed]
    description: "From cover status request (DATA01): 00h=normal(open), 01h=closed"

  - id: lamp_usage_time
    type: integer
    unit: seconds
    description: "From lamp information request 3 (DATA03-06)"

  - id: lamp_remaining_life
    type: integer
    unit: percent
    description: "From lamp information request 3; negative if replacement deadline exceeded"

  - id: filter_usage_time
    type: integer
    unit: seconds
    description: "From filter usage information request (DATA01-04)"

  - id: freeze_state
    type: enum
    values: [off, on]
    description: "From basic information request (DATA09)"

  - id: eco_mode
    type: integer
    description: "From eco mode request (DATA01); value table in Appendix"

  - id: edge_blending_mode
    type: enum
    values: [off, on]
    description: "From edge blending mode request (DATA01)"

  - id: lens_operation_status
    type: bitmask
    description: "From lens information request (DATA01): lens memory/zoom/focus/shift operation bits"
```

## Variables
```yaml
# Adjustable parameters are exposed as discrete Actions (picture_adjust, volume_adjust,
# aspect_adjust, other_adjust, eco_mode_set, edge_blending_mode_set, etc.).
# No additional settable parameters beyond those actions.
```

## Events
```yaml
# No unsolicited notifications documented in source.
# UNRESOLVED: source does not describe any event/push-notification mechanism.
```

## Macros
```yaml
# No multi-step command sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "During POWER ON, no other command can be accepted (source: 015)."
  - description: "During POWER OFF including cooling time, no other command can be accepted (source: 016)."
# UNRESOLVED: no explicit safety/interlock procedures beyond power command acceptance notes;
# full safety warnings may reside in the operation manual, not this command reference.
```

## Notes
- Binary protocol: all payloads are hexadecimal byte sequences (`NNh` = hex byte). The final byte of every command is a checksum (`CKS`), computed as the low-order 8 bits of the sum of all preceding bytes. For fixed commands the checksum is shown verbatim; for parameterized commands it is shown as `{checksum}` and must be computed at runtime.
- Response framing: success responses set the high nibble of byte 0 to `2` (e.g. `22h`, `23h`, `20h`); error responses set it to `A` (e.g. `A2h`, `A3h`, `A0h`) and carry `<ERR1> <ERR2>` error codes.
- `ID1` (control ID) and `ID2` (model code) appear in responses, not in the command payloads documented here.
- Usage-time queries update at one-minute intervals though reported in one-second units.
- Serial baud rate is configurable among 4800/9600/19200/38400/115200; the device and controller must match.

<!-- UNRESOLVED: input-terminal value table, aspect value table, eco-mode value table, base-model-type values, and signal-type mapping referenced to an Appendix ("Supplementary Information by Command") not present in this refined source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: serial flow control mode not explicitly stated (RTS/CTS pins wired in pin assignment). -->
<!-- UNRESOLVED: protocol version number not stated; manual revision is BDT140013 Rev 7.1. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:44:38.783Z
last_checked_at: 2026-06-18T08:48:58.540Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:48:58.540Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input-terminal value table, aspect value table, eco-mode value table, base-model-type values, and signal-type values are referenced to an \"Appendix: Supplementary Information by Command\" that is not present in the refined source."
- "flow control not stated in source (RTS/CTS pins wired but mode unspecified)"
- "source does not describe any event/push-notification mechanism."
- "no explicit safety/interlock procedures beyond power command acceptance notes;"
- "input-terminal value table, aspect value table, eco-mode value table, base-model-type values, and signal-type mapping referenced to an Appendix (\"Supplementary Information by Command\") not present in this refined source."
- "firmware version compatibility not stated in source."
- "serial flow control mode not explicitly stated (RTS/CTS pins wired in pin assignment)."
- "protocol version number not stated; manual revision is BDT140013 Rev 7.1."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
