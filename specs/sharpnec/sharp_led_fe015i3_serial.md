---
spec_id: admin/sharp-nec-led-fe015i3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FE015I3 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FE015I3"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FE015I3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T08:58:13.041Z
last_checked_at: 2026-06-18T08:06:08.338Z
generated_at: 2026-06-18T08:06:08.338Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-specific appendix values (input terminal codes, aspect values, eco mode values, base model types, selection signal types) are referenced as \"Supplementary Information by Command\" but not reproduced in the refined source. Specific enum ranges for those fields cannot be enumerated here."
  - "flow control not stated in source (communication mode is full duplex)"
  - "appendix values not in refined source\""
  - "value list in appendix 'Supplementary Information by Command', not in refined source\""
  - "full target list not enumerated in refined source\""
  - "non-stop target list not in refined source\""
  - "enum values in appendix, not in refined source\""
  - "appendix \"Supplementary Information by Command\" referenced by the source (input terminal codes, aspect values, eco mode values, base model types, selection signal types, sub-input setting values) is not present in the refined source document, so those enum ranges could not be enumerated."
  - "firmware version compatibility not stated in source."
  - "flow_control not stated in source (only \"Full duplex\" communication mode given)."
  - "default baud rate not designated; source lists five supported rates (115200/38400/19200/9600/4800)."
  - "LENS CONTROL (053) target list beyond 06h=Periphery Focus not enumerated in refined source."
  - "LENS CONTROL 2 (053-2) non-stop target codes not enumerated in refined source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:06:08.338Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FE015I3 Control Spec

## Summary
Sharp/NEC LED FE015I3 is an LED projector controllable via RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN (TCP port 7142). This spec covers the binary control protocol documented in the Projector Control Command Reference Manual (BDT140013 Revision 7.1): power, input switching, mute, picture/volume/aspect/gain adjustment, lens control and memory, shutter, freeze, eco mode, edge blending, PIP/Picture-by-Picture, and a broad set of status information requests. Commands are hexadecimal byte frames with a trailing additive checksum.

<!-- UNRESOLVED: model-specific appendix values (input terminal codes, aspect values, eco mode values, base model types, selection signal types) are referenced as "Supplementary Information by Command" but not reproduced in the refined source. Specific enum ranges for those fields cannot be enumerated here. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # multiple rates supported; source does not designate a default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (communication mode is full duplex)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - routable     # inferred: INPUT SW CHANGE command present
  - queryable    # inferred: many status/information request commands present
  - levelable    # inferred: PICTURE ADJUST, VOLUME ADJUST, OTHER ADJUST commands present
```

## Actions
```yaml
# Checksum (CKS) rule (from source section 2.2): sum all preceding bytes, take
# low-order one byte of the result. For fixed commands below the CKS is already
# computed in the literal payload. For parameterized commands, CKS must be
# computed from the full byte sequence including substituted params.
# Command frames use ID1=00h (control ID) and ID2=00h (model code) in the
# literal examples; real frames substitute the projector's configured values.

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
    command: "02h 03h 00h 00h 02h 01h {input_terminal} {CKS}"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal code (e.g. 06h = video port). Full value list in appendix 'Supplementary Information by Command'. # UNRESOLVED: appendix values not in refined source"

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
    command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_low} {value_high} {CKS}"
    params:
      - name: target
        type: enum
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: enum
        description: "00h=absolute value, 01h=relative value"
      - name: value_low
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: value_high
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_low} {value_high} {CKS}"
    params:
      - name: mode
        type: enum
        description: "00h=absolute value, 01h=relative value"
      - name: value_low
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: value_high
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect_value} 00h {CKS}"
    params:
      - name: aspect_value
        type: integer
        description: "Value set for the aspect. # UNRESOLVED: value list in appendix 'Supplementary Information by Command', not in refined source"

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_low} {value_high} {CKS}"
    params:
      - name: target
        type: enum
        description: "Adjustment target: DATA01=96h, DATA02=FFh -> LAMP ADJUST / LIGHT ADJUST"
      - name: mode
        type: enum
        description: "DATA03: 00h=absolute value, 01h=relative value"
      - name: value_low
        type: integer
        description: DATA04, adjustment value (low-order 8 bits)
      - name: value_high
        type: integer
        description: DATA05, adjustment value (high-order 8 bits)

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
    command: "03h 96h 00h 00h 02h {lamp} {content} {CKS}"
    params:
      - name: lamp
        type: enum
        description: "00h=Lamp 1, 01h=Lamp 2 (Lamp 2 only on two-lamp models)"
      - name: content
        type: enum
        description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {savings_type} {CKS}"
    params:
      - name: savings_type
        type: enum
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {key_code_low} {key_code_high} {CKS}"
    params:
      - name: key_code_low
        type: enum
        description: "Key code (WORD type), low byte. Examples (low,high): 02h,00h=POWER ON; 03h,00h=POWER OFF; 05h,00h=AUTO; 06h,00h=MENU; 07h,00h=UP; 08h,00h=DOWN; 09h,00h=RIGHT; 0Ah,00h=LEFT; 0Bh,00h=ENTER; 0Ch,00h=EXIT; 0Dh,00h=HELP; 0Fh,00h=MAGNIFY UP; 10h,00h=MAGNIFY DOWN; 13h,00h=MUTE; 29h,00h=PICTURE; 4Bh,00h=COMPUTER1; 4Ch,00h=COMPUTER2; 4Fh,00h=VIDEO1; 51h,00h=S-VIDEO1; 84h,00h=VOLUME UP; 85h,00h=VOLUME DOWN; 8Ah,00h=FREEZE; A3h,00h=ASPECT; D7h,00h=SOURCE; EEh,00h=LAMP MODE/ECO"
      - name: key_code_high
        type: integer
        description: Key code (WORD type), high byte (00h for all listed codes)

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
    command: "02h 18h 00h 00h 02h {target} {content} {CKS}"
    params:
      - name: target
        type: integer
        description: "Lens target (e.g. 06h=Periphery Focus). # UNRESOLVED: full target list not enumerated in refined source"
      - name: content
        type: enum
        description: "Drive command: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {target} 00h {CKS}"
    params:
      - name: target
        type: integer
        description: Lens adjustment target

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {target} {mode} {value_low} {value_high} {CKS}"
    params:
      - name: target
        type: enum
        description: "Lens target; FFh=Stop (when Stop, mode/value ignored). # UNRESOLVED: non-stop target list not in refined source"
      - name: mode
        type: enum
        description: "00h=absolute value, 02h=relative value"
      - name: value_low
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: value_high
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {operation} {CKS}"
    params:
      - name: operation
        type: enum
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {operation} {CKS}"
    params:
      - name: operation
        type: enum
        description: "00h=MOVE, 01h=STORE, 02h=RESET (operates on profile selected via LENS PROFILE SET)"

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {option} {CKS}"
    params:
      - name: option
        type: enum
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {option} {value} {CKS}"
    params:
      - name: option
        type: enum
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: enum
        description: "00h=OFF, 01h=ON"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {profile} {CKS}"
    params:
      - name: profile
        type: enum
        description: "00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {target} 00h 00h {CKS}"
    params:
      - name: target
        type: enum
        description: "Adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

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
    command: "01h 98h 00h 00h 01h {state} {CKS}"
    params:
      - name: state
        type: enum
        description: "01h=freeze on, 02h=freeze off"

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {info_type} 01h {CKS}"
    params:
      - name: info_type
        type: enum
        description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

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
    command: "03h B0h 00h 00h 02h C5h {target} {CKS}"
    params:
      - name: target
        type: enum
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {eco_value} {CKS}"
    params:
      - name: eco_value
        type: integer
        description: "Value set for the eco mode. # UNRESOLVED: value list in appendix 'Supplementary Information by Command', not in refined source"

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {name_bytes_01..16} 00h {CKS}"
    params:
      - name: name_bytes
        type: string
        description: "Projector name (up to 16 bytes, NUL terminated)"

  - id: pip_picture_by_picture_set
    label: PIP / Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {target} {value} {CKS}"
    params:
      - name: target
        type: enum
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "Setting value (MODE: 00h=PIP,01h=PBP; START POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT; SUB INPUT values in appendix)"

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {value} {CKS}"
    params:
      - name: value
        type: enum
        description: "00h=OFF, 01h=ON"

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
    command: "03h C9h 00h 00h 03h 09h {input_terminal} {value} {CKS}"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal code. # UNRESOLVED: value list in appendix 'Supplementary Information by Command', not in refined source"
      - name: value
        type: enum
        description: "00h=the terminal specified in input_terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Success responses begin with 20h (query), 22h (set no-data), 23h (set with data).
# Error responses begin with A0h/A2h/A3h and carry <ERR1> <ERR2> <CKS>.
# Frame: {resp_code} {cmd} <ID1> <ID2> {LEN} {DATA...} <CKS>

feedbacks:
  - id: power_status
    type: enum
    values: [standby, power_on]
    description: "From RUNNING STATUS REQUEST DATA03: 00h=Standby, 01h=Power on, FFh=Not supported"

  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "From RUNNING STATUS REQUEST DATA06: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

  - id: cooling_process
    type: enum
    values: [not_executed, during_execution]
    description: "RUNNING STATUS DATA04: 00h=Not executed, 01h=During execution"

  - id: power_on_off_process
    type: enum
    values: [not_executed, during_execution]
    description: "RUNNING STATUS DATA05: 00h=Not executed, 01h=During execution"

  - id: picture_mute_state
    type: enum
    values: [off, on]
    description: "MUTE STATUS REQUEST DATA01"

  - id: sound_mute_state
    type: enum
    values: [off, on]
    description: "MUTE STATUS REQUEST DATA02"

  - id: onscreen_mute_state
    type: enum
    values: [off, on]
    description: "MUTE STATUS REQUEST DATA03"

  - id: forced_onscreen_mute_state
    type: enum
    values: [off, on]
    description: "MUTE STATUS REQUEST DATA04"

  - id: lamp_usage_time
    type: integer
    description: "INFORMATION REQUEST DATA83-86 or LAMP INFORMATION REQUEST 3 DATA03-06, in seconds (updated at 1-minute intervals)"

  - id: filter_usage_time
    type: integer
    description: "FILTER USAGE INFORMATION REQUEST DATA01-04, in seconds (-1 if undefined)"

  - id: lamp_remaining_life
    type: integer
    description: "LAMP INFORMATION REQUEST 3 (content 04h) DATA03-06, percent; negative if replacement deadline exceeded"

  - id: cover_status
    type: enum
    values: [normal_opened, closed]
    description: "COVER STATUS REQUEST DATA01: 00h=Normal(cover opened), 01h=Cover closed"

  - id: lens_operation_status
    type: bitmask
    description: "LENS INFORMATION REQUEST DATA01: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V) (0=Stop, 1=During operation)"

  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    description: "LENS PROFILE REQUEST DATA01: 00h=Profile 1, 01h=Profile 2"

  - id: eco_mode
    type: integer
    description: "ECO MODE REQUEST DATA01. # UNRESOLVED: enum values in appendix, not in refined source"

  - id: edge_blending_mode
    type: enum
    values: [off, on]
    description: "EDGE BLENDING MODE REQUEST DATA01: 00h=OFF, 01h=ON"

  - id: projector_name
    type: string
    description: "LAN PROJECTOR NAME REQUEST DATA01-17, NUL-terminated"

  - id: mac_address
    type: string
    description: "LAN MAC ADDRESS STATUS REQUEST 2 DATA01-06 (6 bytes)"

  - id: model_name
    type: string
    description: "MODEL NAME REQUEST DATA01-32, NUL-terminated"

  - id: serial_number
    type: string
    description: "SERIAL NUMBER REQUEST DATA01-16, NUL-terminated"

  - id: error_status
    type: bitmask
    description: "ERROR STATUS REQUEST DATA01-12. Each bit: 0=normal, 1=error. Covers cover/fan/temperature/power/lamp/ formatter/FPGA/mirror-cover/ballast/iris/lens-install/interlock/system errors (see source section 3.1 for full bit map). Extended status in DATA09 (Bit1 = interlock switch open)."

  - id: command_error
    type: struct
    description: "Error response ERR1/ERR2 pair. 00h,00h=unrecognized command; 00h,01h=not supported by model; 01h,00h=invalid value; 01h,01h=invalid input terminal; 01h,02h=invalid language; 02h,03h=value cannot be set; 02h,0Dh=power off; 02h,0Eh=execution failed; 02h,0Fh=no authority; 03h,00h=incorrect gain number; 03h,01h=invalid gain; 03h,02h=adjustment failed. (Full list in source section 2.4.)"
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    description: "PICTURE ADJUST target 00h; gain bounds returned by GAIN PARAMETER REQUEST 3"

  - id: contrast
    type: integer
    description: "PICTURE ADJUST target 01h"

  - id: color
    type: integer
    description: "PICTURE ADJUST target 02h"

  - id: hue
    type: integer
    description: "PICTURE ADJUST target 03h"

  - id: sharpness
    type: integer
    description: "PICTURE ADJUST target 04h"

  - id: volume
    type: integer
    description: "VOLUME ADJUST; gain bounds returned by GAIN PARAMETER REQUEST 3 (target 05h)"

  - id: lamp_light_adjust
    type: integer
    description: "OTHER ADJUST (LAMP ADJUST / LIGHT ADJUST), target 96h"
```

## Events
```yaml
# No unsolicited notifications described in source. All data is returned only in
# response to an explicit request command.
events: []
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While POWER ON is executing, no other command can be accepted (source 3.2)."
  - "While POWER OFF is executing (including cooling time), no other command can be accepted (source 3.3)."
  - "Interlock switch status reported in ERROR STATUS REQUEST DATA09 Bit1 ('The interlock switch is open')."
# No explicit power-on sequencing procedure or safety interlock procedure beyond
# the command-acceptance notes above is described in the source.
```

## Notes
- Command/response frames are hexadecimal byte sequences. The trailing byte is an additive checksum (CKS) = low-order 8 bits of the sum of all preceding bytes (source 2.2). All literal payloads above include the precomputed CKS where the frame is fixed; parameterized frames require runtime CKS computation.
- Frame roles by leading byte: commands start `00h` (query), `01h`/`02h` (set), `03h` (set with parameters); success responses start `20h` (query data), `22h` (set ack), `23h` (set ack with data); error responses start `A0h`/`A2h`/`A3h` carrying `<ERR1> <ERR2>`.
- ID1 = projector control ID; ID2 = model code. Literal examples use 00h/00h; real frames must substitute configured values and recompute CKS.
- Serial cable is a cross cable wired to the PC CONTROL D-SUB 9P port (pin 2/3 crossed Rx/Tx, pin 5 GND, pin 7/8 RTS/CTS crossed).
- LAN control uses TCP port 7142 (wired 10/100 Mbps auto-negotiating; wireless via optional LAN unit).
- PICTURE/SOUND/ONSCREEN mute auto-clears on input-terminal switch or video-signal switch (source 3.5, 3.7, 3.9); SOUND mute also clears on volume adjustment.
- For LENS CONTROL, after sending 7Fh (drive plus) or 81h (drive minus) you must send 00h to stop driving (source 3.22). While the lens is being driven, re-issuing the same command continues motion without a stop.
- Lamp usage / filter usage times are returned in one-second units but updated by the projector at one-minute intervals.

<!-- UNRESOLVED: appendix "Supplementary Information by Command" referenced by the source (input terminal codes, aspect values, eco mode values, base model types, selection signal types, sub-input setting values) is not present in the refined source document, so those enum ranges could not be enumerated. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: flow_control not stated in source (only "Full duplex" communication mode given). -->
<!-- UNRESOLVED: default baud rate not designated; source lists five supported rates (115200/38400/19200/9600/4800). -->
<!-- UNRESOLVED: LENS CONTROL (053) target list beyond 06h=Periphery Focus not enumerated in refined source. -->
<!-- UNRESOLVED: LENS CONTROL 2 (053-2) non-stop target codes not enumerated in refined source. -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T08:58:13.041Z
last_checked_at: 2026-06-18T08:06:08.338Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:06:08.338Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-specific appendix values (input terminal codes, aspect values, eco mode values, base model types, selection signal types) are referenced as \"Supplementary Information by Command\" but not reproduced in the refined source. Specific enum ranges for those fields cannot be enumerated here."
- "flow control not stated in source (communication mode is full duplex)"
- "appendix values not in refined source\""
- "value list in appendix 'Supplementary Information by Command', not in refined source\""
- "full target list not enumerated in refined source\""
- "non-stop target list not in refined source\""
- "enum values in appendix, not in refined source\""
- "appendix \"Supplementary Information by Command\" referenced by the source (input terminal codes, aspect values, eco mode values, base model types, selection signal types, sub-input setting values) is not present in the refined source document, so those enum ranges could not be enumerated."
- "firmware version compatibility not stated in source."
- "flow_control not stated in source (only \"Full duplex\" communication mode given)."
- "default baud rate not designated; source lists five supported rates (115200/38400/19200/9600/4800)."
- "LENS CONTROL (053) target list beyond 06h=Periphery Focus not enumerated in refined source."
- "LENS CONTROL 2 (053-2) non-stop target codes not enumerated in refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
