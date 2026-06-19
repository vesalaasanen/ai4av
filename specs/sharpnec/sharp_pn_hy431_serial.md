---
spec_id: admin/sharp-nec-pn-hy431
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PN-HY431 Control Spec"
manufacturer: Sharp/NEC
model_family: PN-HY431
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - PN-HY431
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:35:43.955Z
last_checked_at: 2026-06-18T09:16:03.981Z
generated_at: 2026-06-18T09:16:03.981Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Model code (ID2) is model-dependent and not stated. Control ID (ID1) value not stated."
  - "flow control not stated; RTS/CTS pins wired per pin table"
  - "appendix values not in source).\""
  - "appendix \"Supplementary Information by Command\" (input terminal codes,"
  - "source describes no unsolicited/notification events. All responses are replies to commands."
  - "source documents no multi-step macro sequences."
  - "no explicit safety interlock procedures or power-on sequencing"
  - "Appendix \"Supplementary Information by Command\" not in source — input terminal codes, aspect values, eco mode values, base model type codes, sub-input setting values, and selection-signal-type mapping are referenced but not provided."
  - "firmware version compatibility not stated in source."
  - "default baud rate among the five supported not stated."
  - "serial flow control not stated (RTS/CTS pins wired but not described as hardware flow control)."
  - "Control ID (ID1) and Model code (ID2) default values not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:16:03.981Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions have verbatim hex command frames confirmed in source; transport port 7142 and baud rates confirmed; source catalogue exhausted by the spec. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PN-HY431 Control Spec

## Summary
Sharp/NEC projector (model PN-HY431) controlled via binary hex command protocol over RS-232C serial or TCP/IP LAN (port 7142). Source is the "Projector Control Command Reference Manual" (BDT140013 Rev 7.1) covering 53 distinct control commands: power, input switching, mute, picture/volume/aspect adjust, lens control & memory, shutter, freeze, eco mode, edge blending, PIP/PBP, and numerous status queries.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Model code (ID2) is model-dependent and not stated. Control ID (ID1) value not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # multiple supported; default UNRESOLVED
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; RTS/CTS pins wired per pin table
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: POWER ON / POWER OFF commands present
  - routable    # inferred: INPUT SW CHANGE routing command present
  - queryable   # inferred: many status query commands present
  - levelable   # inferred: VOLUME ADJUST / PICTURE ADJUST present
```

## Actions
```yaml
# Command frame format (hex): <op1> <op2> <ID1> <ID2> <LEN> <DATA...> <CKS>
# Request frames shown verbatim. ID1=Control ID, ID2=Model code (model-dependent,
# UNRESOLVED), CKS = low byte of sum of all preceding bytes.

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
      description: "Input terminal byte (DATA01). Example: 06h=Video. Full list in Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix values not in source)."

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
  command: "03h 10h 00h 00h 05h {target} FFh {mode_low} {value_low} {value_high} {checksum}"
  params:
    - name: target
      type: integer
      description: "DATA01 target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode_low
      type: integer
      description: "DATA02 mode: 00h=absolute, 01h=relative"
    - name: value_low
      type: integer
      description: DATA03 adjustment value low 8 bits
    - name: value_high
      type: integer
      description: DATA04 adjustment value high 8 bits

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode_low} {value_low} {value_high} {checksum}"
  params:
    - name: mode_low
      type: integer
      description: "DATA01 mode: 00h=absolute, 01h=relative"
    - name: value_low
      type: integer
      description: DATA02 value low 8 bits
    - name: value_high
      type: integer
      description: DATA03 value high 8 bits

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {value} 00h {checksum}"
  params:
    - name: value
      type: integer
      description: "DATA01 aspect value. Full list in Appendix (UNRESOLVED: appendix values not in source)."

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh {mode_low} {value_low} {value_high} {checksum}"
  params:
    - name: mode_low
      type: integer
      description: "DATA03 mode: 00h=absolute, 01h=relative"
    - name: value_low
      type: integer
      description: DATA04 value low 8 bits
    - name: value_high
      type: integer
      description: DATA05 value high 8 bits

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
      type: integer
      description: "DATA01: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: content
      type: integer
      description: "DATA02: 01h=usage time (seconds), 04h=remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {type} {checksum}"
  params:
    - name: type
      type: integer
      description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_low} {key_high} {checksum}"
  params:
    - name: key_low
      type: integer
      description: "DATA01 (key code WORD low byte). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: key_high
      type: integer
      description: DATA02 (key code WORD high byte; 00h for all listed keys)

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
  command: "02h 18h 00h 00h 02h {target} {action} {checksum}"
  params:
    - name: target
      type: integer
      description: "DATA01: 06h=Periphery Focus (other targets UNRESOLVED)"
    - name: action
      type: integer
      description: "DATA02: 00h=Stop, 01h=drive+ 1s, 02h=drive+ 0.5s, 03h=drive+ 0.25s, 7Fh=drive+, 81h=drive-, FDh=drive- 0.25s, FEh=drive- 0.5s, FFh=drive- 1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
  params:
    - name: target
      type: integer
      description: DATA01 lens axis target

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {mode_low} {value_low} {value_high} {checksum}"
  params:
    - name: target
      type: integer
      description: "DATA01: FFh=Stop (mode/value ignored when Stop)"
    - name: mode_low
      type: integer
      description: "DATA02 mode: 00h=absolute, 02h=relative"
    - name: value_low
      type: integer
      description: DATA03 value low 8 bits
    - name: value_high
      type: integer
      description: DATA04 value high 8 bits

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {action} {checksum}"
  params:
    - name: action
      type: integer
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {action} {checksum}"
  params:
    - name: action
      type: integer
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET (applies to profile set via LENS PROFILE SET)"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {option} {checksum}"
  params:
    - name: option
      type: integer
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {option} {value} {checksum}"
  params:
    - name: option
      type: integer
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
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
      type: integer
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
      type: integer
      description: "DATA01: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"

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
  command: "01h 98h 00h 00h 01h {action} {checksum}"
  params:
    - name: action
      type: integer
      description: "DATA01: 01h=Freeze On, 02h=Freeze Off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {type} 01h {checksum}"
  params:
    - name: type
      type: integer
      description: "DATA01: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

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
  command: "03h B0h 00h 00h 02h C5h {target} {checksum}"
  params:
    - name: target
      type: integer
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "DATA01 eco mode value. Full list in Appendix (UNRESOLVED: appendix values not in source)."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_bytes:16} 00h {checksum}"
  params:
    - name: name_bytes
      type: string
      description: "DATA01-16 projector name (up to 16 bytes, NUL-terminated)"

- id: pip_picture_by_picture_set
  label: PIP / Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {target} {value} {checksum}"
  params:
    - name: target
      type: integer
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "DATA02: MODE 00h=PIP/01h=PbP; START POSITION 00h=TOP-LEFT..03h=BOTTOM-RIGHT; sub-input values in Appendix (UNRESOLVED)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} {checksum}"
  params:
    - name: value
      type: integer
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
      description: "DATA01 input terminal. Values in Appendix (UNRESOLVED)."
    - name: value
      type: integer
      description: "DATA02: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Response frame format (hex): <res_op1> <res_op2> <ID1> <ID2> <LEN> <DATA...> <CKS>
# Success responses carry res opcode high nibble 2Xh; error responses use AXh with ERR1/ERR2.
# Query responses carry the requested DATA bytes.

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: running_status_request DATA03 / basic_information_request DATA01

- id: cooling_process
  type: enum
  values: [not_executed, during_execution, not_supported]
  source: running_status_request DATA04

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: running_status_request DATA06

- id: input_signal_type
  type: enum
  values: [computer, video, s_video, component, dvi_d, hdmi, displayport, viewer]
  source: input_status_request DATA04 / basic_information_request DATA04

- id: picture_mute_state
  type: enum
  values: [off, on]
  source: mute_status_request DATA01

- id: sound_mute_state
  type: enum
  values: [off, on]
  source: mute_status_request DATA02

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  source: mute_status_request DATA03

- id: freeze_state
  type: enum
  values: [off, on]
  source: basic_information_request DATA09

- id: cover_state
  type: enum
  values: [normal_opened, cover_closed]
  source: cover_status_request DATA01

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: lamp_information_request_3 DATA03-06 (content=01h) / information_request DATA83-86

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: lamp_information_request_3 DATA03-06 (content=04h); negative if replacement deadline exceeded

- id: filter_usage_time
  type: integer
  unit: seconds
  source: filter_usage_information_request DATA01-04 / information_request DATA87-90

- id: model_name
  type: string
  source: model_name_request DATA01-32

- id: serial_number
  type: string
  source: serial_number_request DATA01-16

- id: mac_address
  type: string
  source: lan_mac_address_status_request_2 DATA01-06

- id: error_code
  type: enum
  values:
    - "00h00h: command not recognized"
    - "00h01h: command not supported by model"
    - "01h00h: specified value invalid"
    - "01h01h: specified input terminal invalid"
    - "01h02h: specified language invalid"
    - "02h00h: memory allocation error"
    - "02h02h: memory in use"
    - "02h03h: specified value cannot be set"
    - "02h04h: forced onscreen mute on"
    - "02h06h: viewer error"
    - "02h07h: no signal"
    - "02h08h: test pattern/filter displayed"
    - "02h09h: no PC card inserted"
    - "02h0Ah: memory operation error"
    - "02h0Ch: entry list displayed"
    - "02h0Dh: command not accepted (power off)"
    - "02h0Eh: command execution failed"
    - "02h0Fh: no authority for operation"
    - "03h00h: specified gain number incorrect"
    - "03h01h: specified gain invalid"
    - "03h02h: adjustment failed"
  source: error response ERR1/ERR2 (AXh frame)

# UNRESOLVED: appendix "Supplementary Information by Command" (input terminal codes,
# aspect values, eco mode values, base model types) not present in source.
```

## Variables
```yaml
- id: brightness
  type: integer
  source: picture_adjust (target 00h) / gain_parameter_request_3 (name 00h)
  range: UNRESOLVED  # returned dynamically via gain_parameter_request_3 DATA02-DATA05

- id: contrast
  type: integer
  source: picture_adjust (target 01h) / gain_parameter_request_3 (name 01h)
  range: UNRESOLVED

- id: color
  type: integer
  source: picture_adjust (target 02h) / gain_parameter_request_3 (name 02h)
  range: UNRESOLVED

- id: hue
  type: integer
  source: picture_adjust (target 03h) / gain_parameter_request_3 (name 03h)
  range: UNRESOLVED

- id: sharpness
  type: integer
  source: picture_adjust (target 04h) / gain_parameter_request_3 (name 04h)
  range: UNRESOLVED

- id: volume
  type: integer
  source: volume_adjust / gain_parameter_request_3 (name 05h)
  range: UNRESOLVED

- id: lamp_adjust
  type: integer
  source: other_adjust / gain_parameter_request_3 (name 96h)
  range: UNRESOLVED

- id: projector_name
  type: string
  max_length: 16
  source: lan_projector_name_set / lan_projector_name_request
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited/notification events. All responses are replies to commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While POWER ON is turning on the power, no other command can be accepted."
  - "While POWER OFF is turning off the power (including the cooling time), no other command can be accepted."
  - "02h0Dh error: command cannot be accepted because the power is off."
# UNRESOLVED: no explicit safety interlock procedures or power-on sequencing
# requirements stated beyond the command-acceptance interlocks above.
```

## Notes
- Binary hex protocol. Every frame ends in a checksum byte (CKS) = low-order byte of the sum of all preceding bytes (example given: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`).
- Request opcodes: `00h/01h/02h/03h` (command class). Response opcodes: success `20h-23h/2Xh`, error `A0h-A3h/AXh`.
- Serial cable is a cross cable wired to the PC CONTROL port (D-SUB 9P): pins 2↔3 (RxD/TxD), 7↔8 (RTS/CTS), 5=GND.
- Usage-time telemetry (lamp/filter) updates at one-minute intervals even though units are seconds.
- Lamp remaining life (%) returns negative once the replacement deadline is exceeded.
- ID1 (Control ID) and ID2 (Model code) are per-device/per-model parameters — not stated verbatim in source (UNRESOLVED).
- Two-lamp-specific DATA01=01h (Lamp 2) only valid on two-lamp projector models.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not in source — input terminal codes, aspect values, eco mode values, base model type codes, sub-input setting values, and selection-signal-type mapping are referenced but not provided. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: default baud rate among the five supported not stated. -->
<!-- UNRESOLVED: serial flow control not stated (RTS/CTS pins wired but not described as hardware flow control). -->
<!-- UNRESOLVED: Control ID (ID1) and Model code (ID2) default values not stated. -->
```

Spec done. 53 actions enumerated (all source rows). Dual transport serial+TCP (port 7142 verbatim). Checksum rule noted. Appendix values marked UNRESOLVED (not in refined source).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:35:43.955Z
last_checked_at: 2026-06-18T09:16:03.981Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:16:03.981Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions have verbatim hex command frames confirmed in source; transport port 7142 and baud rates confirmed; source catalogue exhausted by the spec. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Model code (ID2) is model-dependent and not stated. Control ID (ID1) value not stated."
- "flow control not stated; RTS/CTS pins wired per pin table"
- "appendix values not in source).\""
- "appendix \"Supplementary Information by Command\" (input terminal codes,"
- "source describes no unsolicited/notification events. All responses are replies to commands."
- "source documents no multi-step macro sequences."
- "no explicit safety interlock procedures or power-on sequencing"
- "Appendix \"Supplementary Information by Command\" not in source — input terminal codes, aspect values, eco mode values, base model type codes, sub-input setting values, and selection-signal-type mapping are referenced but not provided."
- "firmware version compatibility not stated in source."
- "default baud rate among the five supported not stated."
- "serial flow control not stated (RTS/CTS pins wired but not described as hardware flow control)."
- "Control ID (ID1) and Model code (ID2) default values not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
