---
spec_id: admin/nec-xc10-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC XC10 Series Control Spec"
manufacturer: NEC
model_family: "XC10 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "XC10 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-22T22:51:11.476Z
last_checked_at: 2026-06-12T19:27:40.092Z
generated_at: 2026-06-12T19:27:40.092Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version range; exact list of XC10 sub-models covered by this reference"
  - "flow control not specified; \"Full duplex\" stated but no RTS/CTS handshaking rule"
  - "source describes request/response only, not unsolicited notifications"
  - "no multi-step sequences described in source"
  - "source notes POWER ON and POWER OFF cannot accept other commands during execution (including cooling time), but does not document safety interlocks or power-on sequencing requirements."
  - "firmware version range; complete input-terminal value mapping; complete aspect value mapping; complete eco-mode value mapping; complete sub-input value mapping; complete base model type value mapping; complete \"Supplementary Information by Command\" appendix"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:27:40.092Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec command sequences found verbatim in BDT140013 Revision 7.1; transport parameters (baud, data/parity/stop bits, TCP port) confirmed in source. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-11
---

# NEC XC10 Series Control Spec

## Summary
NEC XC10 Series projector control via binary protocol over RS-232C and TCP port 7142. Source: BDT140013 Revision 7.1 command reference. Commands are hex framed with header, control ID, model code, data, and checksum.

<!-- UNRESOLVED: firmware version range; exact list of XC10 sub-models covered by this reference -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source supports 115200/38400/19200/9600/4800; 115200 listed first
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not specified; "Full duplex" stated but no RTS/CTS handshaking rule
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from POWER ON / POWER OFF command examples
- routable  # inferred from INPUT SW CHANGE command
- queryable  # inferred from ERROR STATUS REQUEST, INFORMATION REQUEST, etc.
- levelable  # inferred from VOLUME ADJUST, PICTURE ADJUST, LAMP ADJUST commands
```

## Actions
```yaml
# Frame format: HEADER TYPE ID1 ID2 LEN DATA... CKS
# CKS = low-order 1 byte of sum of all preceding bytes
# ID1 = control ID of projector; ID2 = model code (vary by model)
# Each command below lists the literal byte sequence (no CKS computed) from the source.

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00 88 00 00 00 88"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02 00 00 00 00 02"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "02 01 00 00 00 03"
  params: []

- id: input_switch_change
  label: Input Switch Change
  kind: action
  command: "02 03 00 00 02 01 {input} {cks}"
  params:
    - name: input
      type: integer
      description: Input terminal code (see Appendix in source for value mapping)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02 10 00 00 00 12"
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02 11 00 00 00 13"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02 12 00 00 00 14"
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02 13 00 00 00 15"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02 14 00 00 00 16"
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02 15 00 00 00 17"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03 10 00 00 05 {target} FF {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: target
      type: integer
      description: Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness
    - name: mode
      type: integer
      description: 00h absolute, 01h relative
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits (signed)
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits (signed)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03 10 00 00 05 05 00 {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: mode
      type: integer
      description: 00h absolute, 01h relative
    - name: value_lo
      type: integer
      description: Volume value low-order 8 bits
    - name: value_hi
      type: integer
      description: Volume value high-order 8 bits

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03 10 00 00 05 18 00 00 {aspect} 00 {cks}"
  params:
    - name: aspect
      type: integer
      description: Aspect value (see Appendix in source)

- id: other_adjust_lamp
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03 10 00 00 05 96 FF {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: mode
      type: integer
      description: 00h absolute, 01h relative
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits

- id: information_request
  label: Information Request
  kind: query
  command: "03 8A 00 00 00 8D"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03 95 00 00 00 98"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03 96 00 00 02 {lamp} {content} {cks}"
  params:
    - name: lamp
      type: integer
      description: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)
    - name: content
      type: integer
      description: 01h Lamp usage time (seconds), 04h Lamp remaining life (%)

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03 9A 00 00 01 {type} {cks}"
  params:
    - name: type
      type: integer
      description: 00h Total Carbon Savings, 01h Carbon Savings during operation

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02 0F 00 00 02 {key_lo} {key_hi} {cks}"
  params:
    - name: key_lo
      type: integer
      description: Key code low byte (e.g. 05h AUTO, 02h POWER ON, 03h POWER OFF, 84h VOLUME UP, 85h VOLUME DOWN)
    - name: key_hi
      type: integer
      description: Key code high byte (typically 00h)

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02 16 00 00 00 18"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02 17 00 00 00 19"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: "02 18 00 00 02 {target} {content} {cks}"
  params:
    - name: target
      type: integer
      description: Lens target (e.g. 06h Periphery Focus)
    - name: content
      type: integer
      description: 00h Stop, 01h 1s plus, 02h 0.5s plus, 03h 0.25s plus, 7Fh continuous plus, 81h continuous minus, FDh 0.25s minus, FEh 0.5s minus, FFh 1s minus

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02 1C 00 00 02 {target} 00 {cks}"
  params:
    - name: target
      type: integer
      description: Lens target code

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02 1D 00 00 04 {flag} {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: flag
      type: integer
      description: FFh to stop; other values to drive
    - name: mode
      type: integer
      description: 00h absolute, 02h relative
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02 1E 00 00 01 {op} {cks}"
  params:
    - name: op
      type: integer
      description: 00h MOVE, 01h STORE, 02h RESET

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02 1F 00 00 01 {op} {cks}"
  params:
    - name: op
      type: integer
      description: 00h MOVE, 01h STORE, 02h RESET

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02 20 00 00 01 {option} {cks}"
  params:
    - name: option
      type: integer
      description: 00h LOAD BY SIGNAL, 01h FORCED MUTE

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02 21 00 00 02 {option} {value} {cks}"
  params:
    - name: option
      type: integer
      description: 00h LOAD BY SIGNAL, 01h FORCED MUTE
    - name: value
      type: integer
      description: 00h OFF, 01h ON

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02 22 00 00 01 00 25"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02 27 00 00 01 {profile} {cks}"
  params:
    - name: profile
      type: integer
      description: 00h Profile 1, 01h Profile 2

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02 28 00 00 00 2A"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03 05 00 00 03 {name} 00 00 {cks}"
  params:
    - name: name
      type: integer
      description: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust

- id: setting_request
  label: Setting Request
  kind: query
  command: "00 85 00 00 01 00 86"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00 85 00 00 01 01 87"
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00 85 00 00 01 02 88"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00 85 00 00 01 03 89"
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00 85 00 00 01 04 8A"
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00 85 00 00 01 05 8B"
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01 98 00 00 01 {state} {cks}"
  params:
    - name: state
      type: integer
      description: 01h freeze on, 02h freeze off

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00 D0 00 00 03 00 {type} 01 {cks}"
  params:
    - name: type
      type: integer
      description: 03h Horizontal sync frequency, 04h Vertical sync frequency

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03 B0 00 00 01 07 BB"
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03 B0 00 00 01 2C E0"
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03 B0 00 00 02 9A 00 4F"
  params: []

- id: pip_picture_by_picture_request
  label: PIP / Picture by Picture Request
  kind: query
  command: "03 B0 00 00 02 C5 {item} {cks}"
  params:
    - name: item
      type: integer
      description: 00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03 B0 00 00 02 DF 00 94"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03 B1 00 00 02 07 {value} {cks}"
  params:
    - name: value
      type: integer
      description: Eco mode value (see Appendix in source)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03 B1 00 00 12 2C {name_16_bytes} 00 {cks}"
  params:
    - name: name_16_bytes
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP / Picture by Picture Set
  kind: action
  command: "03 B1 00 00 03 C5 {item} {value} {cks}"
  params:
    - name: item
      type: integer
      description: 00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3
    - name: value
      type: integer
      description: Setting value (depends on item; see Appendix for sub input values)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03 B1 00 00 03 DF 00 {state} {cks}"
  params:
    - name: state
      type: integer
      description: 00h OFF, 01h ON

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00 BF 00 00 01 00 C0"
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00 BF 00 00 02 01 06 C8"
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00 BF 00 00 01 02 C2"
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03 C9 00 00 03 09 {input} {value} {cks}"
  params:
    - name: input
      type: integer
      description: Input terminal code (see Appendix in source)
    - name: value
      type: integer
      description: 00h the terminal specified in input, 01h BNC, 02h COMPUTER
```

## Feedbacks
```yaml
# Source documents response frames but treats each command's response as part of that command.
# The following observable state fields are queryable:

- id: error_status
  label: Error Status
  type: bytes
  description: 12-byte bitfield from ERROR STATUS REQUEST. Bits set to 1 indicate errors (cover, temperature, fan, power, lamp, formatter, FPGA, etc.)

- id: running_power_status
  label: Power Status
  type: enum
  values: [standby, power_on, unsupported]

- id: running_cooling_process
  label: Cooling Process
  type: enum
  values: [not_executed, during_execution, unsupported]

- id: running_power_on_off_process
  label: Power On/Off Process
  type: enum
  values: [not_executed, during_execution, unsupported]

- id: running_operation_status
  label: Operation Status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby, unsupported]

- id: picture_mute
  label: Picture Mute
  type: enum
  values: [off, on]

- id: sound_mute
  label: Sound Mute
  type: enum
  values: [off, on]

- id: onscreen_mute
  label: Onscreen Mute
  type: enum
  values: [off, on]

- id: forced_onscreen_mute
  label: Forced Onscreen Mute
  type: enum
  values: [off, on]

- id: onscreen_display
  label: Onscreen Display
  type: enum
  values: [not_displayed, displayed]

- id: cover_status
  label: Cover Status
  type: enum
  values: [normal_open, cover_closed]

- id: freeze_status
  label: Freeze Status
  type: enum
  values: [off, on]

- id: lamp_usage_time_seconds
  label: Lamp Usage Time
  type: integer
  description: Seconds of lamp usage

- id: lamp_remaining_life_percent
  label: Lamp Remaining Life
  type: integer
  description: Percent remaining; negative if replacement deadline exceeded

- id: filter_usage_time_seconds
  label: Filter Usage Time
  type: integer
  description: Seconds; returns -1 if no time defined

- id: filter_alarm_start_time_seconds
  label: Filter Alarm Start Time
  type: integer
  description: Seconds; returns -1 if no time defined

- id: carbon_savings_total_kg
  label: Total Carbon Savings
  type: number
  description: Max 99999 kg

- id: carbon_savings_total_mg
  label: Total Carbon Savings (mg)
  type: integer
  description: Max 999999 mg

- id: carbon_savings_operation_kg
  label: Carbon Savings During Operation
  type: number
  description: Max 99999 kg

- id: carbon_savings_operation_mg
  label: Carbon Savings During Operation (mg)
  type: integer
  description: Max 999999 mg

- id: projector_name
  label: Projector Name
  type: string
  description: NUL-terminated string, up to 16 bytes

- id: model_name
  label: Model Name
  type: string
  description: NUL-terminated string, up to 32 bytes

- id: serial_number
  label: Serial Number
  type: string
  description: NUL-terminated string, up to 16 bytes

- id: base_model_type
  label: Base Model Type
  type: integer
  description: Model type code; see Appendix in source

- id: mac_address
  label: MAC Address
  type: string
  description: 6-byte MAC

- id: signal_list_number
  label: Signal List Number
  type: integer
  description: Returned value is one less than the practical number

- id: signal_type_1
  label: Selection Signal Type 1
  type: integer
  description: 1-5

- id: signal_type_2
  label: Selection Signal Type 2
  type: enum
  values: [computer, video, s_video, component, reserved, viewer_1_5, dvi_d, hdmi, display_port, viewer_6_10, not_source_input]

- id: signal_list_type
  label: Signal List Type
  type: enum
  values: [default, user, unsupported]

- id: test_pattern_display
  label: Test Pattern Display
  type: enum
  values: [not_displayed, displayed, unsupported]

- id: content_displayed
  label: Content Displayed
  type: enum
  values: [video_signal, no_signal, viewer, test_pattern, lan, unsupported]

- id: horizontal_sync_frequency
  label: Horizontal Sync Frequency
  type: string
  description: Label/information string

- id: vertical_sync_frequency
  label: Vertical Sync Frequency
  type: string
  description: Label/information string

- id: lens_position_upper_limit
  label: Lens Position Upper Limit
  type: integer

- id: lens_position_lower_limit
  label: Lens Position Lower Limit
  type: integer

- id: lens_position_current
  label: Lens Position Current Value
  type: integer

- id: lens_status_bits
  label: Lens Status Bits
  type: integer
  description: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift H, Bit4 Lens Shift V; 0=Stop, 1=During operation

- id: lens_profile
  label: Selected Lens Profile
  type: enum
  values: [profile_1, profile_2]

- id: gain_value_upper_limit
  label: Gain Value Upper Limit
  type: integer

- id: gain_value_lower_limit
  label: Gain Value Lower Limit
  type: integer

- id: gain_value_default
  label: Gain Value Default
  type: integer

- id: gain_value_current
  label: Gain Value Current
  type: integer

- id: gain_adjustment_status
  label: Gain Adjustment Status
  type: enum
  values: [display_not_possible, adjustment_not_possible, adjustment_possible, gain_not_exist]

- id: eco_mode_value
  label: Eco Mode Value
  type: integer
  description: See Appendix in source

- id: pip_pbp_mode
  label: PIP/PBP Mode
  type: enum
  values: [pip, picture_by_picture]

- id: pip_pbp_start_position
  label: PIP/PBP Start Position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]

- id: pip_pbp_sub_input
  label: PIP/PBP Sub Input
  type: integer
  description: See Appendix in source

- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  values: [off, on]

- id: sound_function_available
  label: Sound Function
  type: enum
  values: [not_available, available]

- id: profile_function
  label: Profile Function
  type: enum
  values: [not_available, clock, sleep_timer, clock_and_sleep_timer]
```

## Variables
```yaml
# Lens memory load-by-signal and forced-mute options
- id: lens_memory_load_by_signal
  label: Lens Memory Load by Signal
  type: enum
  values: [off, on]
  description: Set via LENS MEMORY OPTION SET (00h)

- id: lens_memory_forced_mute
  label: Lens Memory Forced Mute
  type: enum
  values: [off, on]
  description: Set via LENS MEMORY OPTION SET (01h)
```

## Events
```yaml
# UNRESOLVED: source describes request/response only, not unsolicited notifications
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes POWER ON and POWER OFF cannot accept other commands during execution (including cooling time), but does not document safety interlocks or power-on sequencing requirements.
```

## Notes
Source: NEC Projector Control Command Reference Manual BDT140013 Revision 7.1. All commands use a binary frame: header byte, type byte, ID1 (control ID, set per-projector), ID2 (model code, varies by model), LEN (data length), DATA..., CKS (low byte of sum of all preceding bytes). Many command values are described in an Appendix "Supplementary Information by Command" that is not included in this source extract — referenced fields are documented as parameters with "see Appendix" notes. Serial connection supports 115200/38400/19200/9600/4800 baud; this spec defaults to 115200 (first listed). TCP port 7142. During power-on or power-off (including cooling), no other command is accepted.

<!-- UNRESOLVED: firmware version range; complete input-terminal value mapping; complete aspect value mapping; complete eco-mode value mapping; complete sub-input value mapping; complete base model type value mapping; complete "Supplementary Information by Command" appendix -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-22T22:51:11.476Z
last_checked_at: 2026-06-12T19:27:40.092Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:27:40.092Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec command sequences found verbatim in BDT140013 Revision 7.1; transport parameters (baud, data/parity/stop bits, TCP port) confirmed in source. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version range; exact list of XC10 sub-models covered by this reference"
- "flow control not specified; \"Full duplex\" stated but no RTS/CTS handshaking rule"
- "source describes request/response only, not unsolicited notifications"
- "no multi-step sequences described in source"
- "source notes POWER ON and POWER OFF cannot accept other commands during execution (including cooling time), but does not document safety interlocks or power-on sequencing requirements."
- "firmware version range; complete input-terminal value mapping; complete aspect value mapping; complete eco-mode value mapping; complete sub-input value mapping; complete base model type value mapping; complete \"Supplementary Information by Command\" appendix"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
