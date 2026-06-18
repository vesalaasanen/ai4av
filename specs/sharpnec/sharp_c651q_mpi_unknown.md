---
spec_id: admin/sharp-nec-c651q-mpi
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC C651Q Mpi Control Spec"
manufacturer: Sharp/NEC
model_family: "C651Q Mpi"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "C651Q Mpi"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T08:46:03.236Z
last_checked_at: 2026-06-17T19:36:22.317Z
generated_at: 2026-06-17T19:36:22.317Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "display vs projector classification (manual titled \"Projector\" but applied to C651Q display family); firmware version compatibility not stated; which Appendix \"Supplementary Information\" input-terminal/gain enums apply to this exact model"
  - "flow control not stated in source (RTS/CTS pins wired)"
  - "exact eco-mode enum values not enumerated in this excerpt"
  - "base-model-type code map not in this excerpt"
  - "bounds device-dependent (GAIN PARAMETER REQUEST returns range)"
  - "no multi-step sequences explicitly described in source."
  - "no formal power-on sequencing requirement or external interlock"
  - "exact input-terminal byte map (DATA01 of INPUT SW CHANGE) lives in the Appendix \"Supplementary Information by Command\", not present in this excerpt."
  - "eco-mode value map and base-model-type code map not present in this excerpt."
  - "model-specific subset of lens axes (DATA01 of LENS CONTROL) not fully enumerated in this excerpt."
  - "firmware version compatibility; exact C651Q Mpi classification (display vs projector) not stated in this command reference."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:36:22.317Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched exactly against their source commands with correct byte sequences, parameters, and shapes. Transport parameters verified in source connection section. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC C651Q Mpi Control Spec

## Summary
Sharp/NEC large-format display/projector controlled via binary hexadecimal commands over RS-232C serial or TCP/IP LAN (port 7142). This spec covers the full command catalogue from the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mute, lens control, picture/volume adjust, status queries, and system information.

<!-- UNRESOLVED: display vs projector classification (manual titled "Projector" but applied to C651Q display family); firmware version compatibility not stated; which Appendix "Supplementary Information" input-terminal/gain enums apply to this exact model -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (RTS/CTS pins wired)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: POWER ON / POWER OFF commands present
  - queryable   # inferred: many status request commands returning values
  - routable    # inferred: INPUT SW CHANGE and audio select routing commands present
  - levelable   # inferred: PICTURE ADJUST, VOLUME ADJUST, lens position level commands present
```

## Actions
```yaml
# Framing: every frame is  HEADER CMD ID1 ID2 LEN <DATA...> CKS
# ID1 = control ID, ID2 = model code (00h 00h = broadcast/default in the literal
# payloads below). CKS = low byte of sum of all preceding bytes. Recompute CKS
# whenever DATA or ID bytes change.
# Literal payloads below are copied VERBATIM from the source, including the
# checksum byte. Parameterized commands show the variable part and {cks}.
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
  command: "02h 03h 00h 00h 02h 01h {input} {cks}"
  params:
    - name: input
      type: integer
      description: "Input terminal byte (e.g. 06h = video). Values in Appendix 'Supplementary Information by Command'."

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
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: target
      type: integer
      description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: mode
      type: integer
      description: "00h absolute, 01h relative"
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: mode
      type: integer
      description: "00h absolute, 01h relative"
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {value} 00h {cks}"
  params:
    - name: value
      type: integer
      description: "Aspect value (see Appendix 'Supplementary Information by Command')"

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {target_lo} {target_hi} {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: target_lo
      type: integer
      description: "Adjustment target low byte (96h = LAMP ADJUST / LIGHT ADJUST)"
    - name: target_hi
      type: integer
      description: "Adjustment target high byte (FFh for LAMP/LIGHT ADJUST)"
    - name: mode
      type: integer
      description: "00h absolute, 01h relative"
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits

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
  command: "03h 96h 00h 00h 02h {lamp} {content} {cks}"
  params:
    - name: lamp
      type: integer
      description: "00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: content
      type: integer
      description: "01h usage time (s), 04h remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {type} {cks}"
  params:
    - name: type
      type: integer
      description: "00h total, 01h during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {code_lo} {code_hi} {cks}"
  params:
    - name: code_lo
      type: integer
      description: "Key code low byte (see key code list, e.g. 05h AUTO, 06h MENU)"
    - name: code_hi
      type: integer
      description: "Key code high byte (00h for all listed keys)"

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
  command: "02h 18h 00h 00h 02h {axis} {action} {cks}"
  params:
    - name: axis
      type: integer
      description: "Lens axis (e.g. 06h Periphery Focus)"
    - name: action
      type: integer
      description: "00h stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +, 81h -, FDh -0.25s, FEh -0.5s, FFh -1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {axis} 00h {cks}"
  params:
    - name: axis
      type: integer
      description: Lens axis identifier

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {axis} {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: axis
      type: integer
      description: "Lens axis (FFh = Stop)"
    - name: mode
      type: integer
      description: "00h absolute, 02h relative"
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} {cks}"
  params:
    - name: operation
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} {cks}"
  params:
    - name: operation
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {option} {cks}"
  params:
    - name: option
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {option} {value} {cks}"
  params:
    - name: option
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: value
      type: integer
      description: "00h OFF, 01h ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {profile} {cks}"
  params:
    - name: profile
      type: integer
      description: "00h Profile 1, 01h Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {name} 00h 00h {cks}"
  params:
    - name: name
      type: integer
      description: "00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust"

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
  command: "01h 98h 00h 00h 01h {state} {cks}"
  params:
    - name: state
      type: integer
      description: "01h freeze on, 02h freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {type} 01h {cks}"
  params:
    - name: type
      type: integer
      description: "03h horizontal sync frequency, 04h vertical sync frequency"

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
  label: PIP / Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {item} {cks}"
  params:
    - name: item
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {value} {cks}"
  params:
    - name: value
      type: integer
      description: "Eco mode value (see Appendix 'Supplementary Information by Command')"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_01}-{name_16} 00h {cks}"
  params:
    - name: name_01
      type: string
      description: "Projector name byte 1 (up to 16 bytes total, NUL-terminated)"

- id: pip_picture_by_picture_set
  label: PIP / Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {item} {value} {cks}"
  params:
    - name: item
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: value
      type: integer
      description: "Setting value per item (see Appendix)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} {cks}"
  params:
    - name: value
      type: integer
      description: "00h OFF, 01h ON"

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
  command: "03h C9h 00h 00h 03h 09h {input} {value} {cks}"
  params:
    - name: input
      type: integer
      description: "Input terminal (see Appendix 'Supplementary Information by Command')"
    - name: value
      type: integer
      description: "00h terminal in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
# Query responses return binary frames prefixed 20h/23h with LEN + DATA + CKS.
# Observable states derivable from queries:
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: running_status_request (DATA03/operation status)

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  source: running_status_request (DATA04)

- id: input_signal
  type: composite
  fields: [signal_type_1, signal_type_2, signal_list_number]
  source: input_status_request (DATA02-DATA04)

- id: mute_state
  type: composite
  fields: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute]
  source: mute_status_request (DATA01-DATA04)

- id: cover_state
  type: enum
  values: [normal_opened, closed]
  source: cover_status_request (DATA01)

- id: error_status
  type: bitmask
  width: 96
  source: error_status_request (DATA01-DATA12)

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: lamp_information_request_3 / information_request

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: lamp_information_request_3

- id: filter_usage_time
  type: integer
  unit: seconds
  source: filter_usage_information_request

- id: eco_mode
  type: enum
  source: eco_mode_request (values in Appendix)
  # UNRESOLVED: exact eco-mode enum values not enumerated in this excerpt

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: edge_blending_mode_request

- id: projector_name
  type: string
  source: lan_projector_name_request

- id: mac_address
  type: string
  source: lan_mac_address_status_request2

- id: model_name
  type: string
  source: model_name_request

- id: serial_number
  type: string
  source: serial_number_request

- id: base_model_type
  type: string
  source: base_model_type_request
  # UNRESOLVED: base-model-type code map not in this excerpt

- id: lens_operation_status
  type: bitmask
  width: 8
  source: lens_information_request (lens memory / zoom / focus / shift-H / shift-V)
```

## Variables
```yaml
# Settable parameters already exposed as parameterized Actions:
- id: picture_brightness
  type: integer
  range_min: null  # UNRESOLVED: bounds device-dependent (GAIN PARAMETER REQUEST returns range)
  range_max: null
  source: picture_adjust target 00h / gain_parameter_request_3 name 00h

- id: picture_contrast
  type: integer
  range_min: null
  range_max: null
  source: picture_adjust target 01h / gain_parameter_request_3 name 01h

- id: picture_color
  type: integer
  range_min: null
  range_max: null
  source: picture_adjust target 02h / gain_parameter_request_3 name 02h

- id: picture_hue
  type: integer
  range_min: null
  range_max: null
  source: picture_adjust target 03h / gain_parameter_request_3 name 03h

- id: picture_sharpness
  type: integer
  range_min: null
  range_max: null
  source: picture_adjust target 04h / gain_parameter_request_3 name 04h

- id: volume
  type: integer
  range_min: null
  range_max: null
  source: volume_adjust / gain_parameter_request_3 name 05h

- id: lamp_adjust
  type: integer
  range_min: null
  range_max: null
  source: other_adjust target 96h FFh / gain_parameter_request_3 name 96h
```

## Events
```yaml
# No unsolicited notifications documented. All responses are solicited replies
# to commands. Source defines no push/event mechanism.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: no other command accepted while power-on in progress."
  - "POWER OFF: no other command accepted during power-off including cooling time."
  - "DATA09 extended status Bit1: interlock switch open is reported as an error condition."
# UNRESOLVED: no formal power-on sequencing requirement or external interlock
# procedure stated beyond the in-progress command lockouts above.
```

## Notes
- **Checksum (CKS):** low-order 8 bits of the sum of all preceding bytes in the frame. Example from source: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`. Recompute whenever any DATA/ID byte changes; the literal payloads above already include the correct checksum for default `ID1=ID2=00h`.
- **ID1 / ID2:** Control ID and Model Code. Substituted per-device when not broadcast. Response frames echo the actual `ID1 <ID2>` values.
- **Response framing:** success = header byte ORed with 20h (e.g. `02h`→`22h`, `03h`→`23h`, `00h`→`20h`); error = header ORed with A0h (`A2h`/`A3h`/`A0h`/`A1h`) carrying `<ERR1> <ERR2> <CKS>`.
- **Error codes (ERR1/ERR2):** see source §2.4 — e.g. `02h 0Dh` = command rejected because power is off; `02h 04h` = forced onscreen mute on; `00h 01h` = command not supported by model.
- **Power-off lockout:** many commands return `ERR1=02h ERR2=0Dh` when power is off.
- **Usage-time resolution:** lamp/filter usage times are 1-second units but refreshed at 1-minute intervals. Lamp remaining life may be negative if replacement deadline exceeded.
- **Picture/sound mute auto-clear:** picture mute, sound mute, onscreen mute are cleared on input/video-signal switch (and sound mute also clears on volume adjustment).

<!-- UNRESOLVED: exact input-terminal byte map (DATA01 of INPUT SW CHANGE) lives in the Appendix "Supplementary Information by Command", not present in this excerpt. -->
<!-- UNRESOLVED: eco-mode value map and base-model-type code map not present in this excerpt. -->
<!-- UNRESOLVED: model-specific subset of lens axes (DATA01 of LENS CONTROL) not fully enumerated in this excerpt. -->
<!-- UNRESOLVED: firmware version compatibility; exact C651Q Mpi classification (display vs projector) not stated in this command reference. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T08:46:03.236Z
last_checked_at: 2026-06-17T19:36:22.317Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:36:22.317Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched exactly against their source commands with correct byte sequences, parameters, and shapes. Transport parameters verified in source connection section. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "display vs projector classification (manual titled \"Projector\" but applied to C651Q display family); firmware version compatibility not stated; which Appendix \"Supplementary Information\" input-terminal/gain enums apply to this exact model"
- "flow control not stated in source (RTS/CTS pins wired)"
- "exact eco-mode enum values not enumerated in this excerpt"
- "base-model-type code map not in this excerpt"
- "bounds device-dependent (GAIN PARAMETER REQUEST returns range)"
- "no multi-step sequences explicitly described in source."
- "no formal power-on sequencing requirement or external interlock"
- "exact input-terminal byte map (DATA01 of INPUT SW CHANGE) lives in the Appendix \"Supplementary Information by Command\", not present in this excerpt."
- "eco-mode value map and base-model-type code map not present in this excerpt."
- "model-specific subset of lens axes (DATA01 of LENS CONTROL) not fully enumerated in this excerpt."
- "firmware version compatibility; exact C651Q Mpi classification (display vs projector) not stated in this command reference."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
