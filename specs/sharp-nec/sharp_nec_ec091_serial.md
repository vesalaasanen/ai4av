---
spec_id: admin/sharp-nec-ec091
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp-NEC Ec091 Control Spec"
manufacturer: Sharp-NEC
model_family: Ec091
aliases: []
compatible_with:
  manufacturers:
    - Sharp-NEC
  models:
    - Ec091
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-08-27T18:11:18.583Z
last_checked_at: 2026-10-07T12:57:50.464Z
generated_at: 2026-10-07T12:57:50.464Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific input-terminal, aspect, eco-mode, PIP sub-input, audio-select, base-model-type, signal-type and remote-key-code enumerations are referenced from an external appendix not included in the source document."
  - "enumeration in source appendix not present in this document."
  - "sub input values in source appendix not present."
  - "input terminal values in source appendix not present."
  - "aspect values in source appendix not present."
  - "source documents no unsolicited notification stream; all state is obtained via REQUEST commands."
  - "source does not document multi-step macro sequences."
  - "explicit user-facing safety procedures (lamp replacement moratorium, etc.) are referenced but not detailed in this document."
verification:
  verdict: verified
  checked_at: 2026-10-07T12:57:50.464Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec frames match the source's 53 listed commands byte for byte, transport values are supported, and the source is a generic projector reference with no EC091 model named. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-30
---

# Sharp-NEC Ec091 Control Spec

## Summary
Control spec for Sharp-NEC Ec091 projector over RS-232C (PC CONTROL port, D-SUB 9P) and wired LAN (TCP port 7142). Covers power, input switching, picture/sound/onscreen mute, picture and lens adjustments, shutter, lens memory, status, information, and network commands. Source: Sharp/NEC Projector Control Command Reference Manual (BDT140013 Revision 7.1).

<!-- UNRESOLVED: specific input-terminal, aspect, eco-mode, PIP sub-input, audio-select, base-model-type, signal-type and remote-key-code enumerations are referenced from an external appendix not included in the source document. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps; 115200 is the highest listed
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: UNRESOLVED  # source specifies full duplex but does not specify flow control
addressing:
  port: 7142
auth:
  type: UNRESOLVED  # source does not specify an authentication procedure
```

## Traits
```yaml
- powerable       # inferred from POWER ON / POWER OFF commands
- routable        # inferred from INPUT SW CHANGE and PIP/PBP commands
- queryable       # inferred from REQUEST commands (status, information, gain)
- levelable       # inferred from PICTURE ADJUST, VOLUME ADJUST, ASPECT ADJUST, OTHER ADJUST
```

## Actions
```yaml
# All commands use the frame: SOH TYPE ID1 ID2 LEN DATA... CKS, where CKS = low byte of sum of all preceding bytes.
# IDs ID1 (control ID) and ID2 (model code) are model-specific and inserted by the controller.
# Empty DATA slot rendered as 00h unless otherwise documented.

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

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02 03 00 00 02 01 {DATA01} {CKS}"  # DATA01 = input terminal hex (see appendix)
  params:
    - name: input
      type: string
      description: Input terminal hex code (e.g. 06h for video port; see source appendix for full list)

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
  command: "03 10 00 00 05 {DATA01} FF {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: target
      type: string
      description: Adjustment target hex (00h brightness, 01h contrast, 02h color, 03h hue, 04h sharpness)
    - name: mode
      type: string
      description: Adjustment mode (00h absolute, 01h relative)
    - name: value
      type: integer
      description: Adjustment value as signed 16-bit little-endian (DATA03 low byte, DATA04 high byte)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03 10 00 00 05 05 00 {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: mode
      type: string
      description: Adjustment mode (00h absolute, 01h relative)
    - name: value
      type: integer
      description: Volume adjustment value as signed 16-bit little-endian (DATA02 low byte, DATA03 high byte)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03 10 00 00 05 18 00 00 {DATA01} 00 {CKS}"
  params:
    - name: aspect
      type: string
      description: Aspect value hex (see source appendix)

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03 10 00 00 05 {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: target_hi
      type: string
      description: DATA01 (96h for LAMP ADJUST / LIGHT ADJUST)
    - name: target_lo
      type: string
      description: DATA02 (FFh for LAMP ADJUST / LIGHT ADJUST)
    - name: mode
      type: string
      description: Adjustment mode (00h absolute, 01h relative)
    - name: value
      type: integer
      description: Adjustment value as signed 16-bit little-endian (DATA04 low byte, DATA05 high byte)

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
  command: "03 96 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: lamp
      type: string
      description: Lamp selector (00h lamp 1, 01h lamp 2)
    - name: content
      type: string
      description: Content selector (01h usage time seconds, 04h remaining life percent)

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03 9A 00 00 01 {DATA01} {CKS}"
  params:
    - name: kind
      type: string
      description: Carbon savings selector (00h total, 01h during operation)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02 0F 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: key
      type: string
      description: Key code pair (DATA01,DATA02) from key code list (e.g. 05h 00h AUTO, 02h 00h POWER ON)

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
  command: "02 18 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: target
      type: string
      description: Lens target (06h Periphery Focus; others listed in source appendix)
    - name: direction
      type: string
      description: Drive direction/duration (00h stop, 01h/02h/03h timed plus, 7Fh continuous plus, 81h continuous minus, FDh/FEh/FFh timed minus)

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02 1C 00 00 02 {DATA01} 00 {CKS}"
  params:
    - name: target
      type: string
      description: Lens target selector (see source appendix)

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02 1D 00 00 04 {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: control
      type: string
      description: FFh = stop; else ignored
    - name: mode
      type: string
      description: Adjustment mode (00h absolute, 02h relative)
    - name: value
      type: integer
      description: Adjustment value as signed 16-bit little-endian

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02 1E 00 00 01 {DATA01} {CKS}"
  params:
    - name: op
      type: string
      description: Operation (00h MOVE, 01h STORE, 02h RESET)

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02 1F 00 00 01 {DATA01} {CKS}"
  params:
    - name: op
      type: string
      description: Operation (00h MOVE, 01h STORE, 02h RESET)

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02 20 00 00 01 {DATA01} {CKS}"
  params:
    - name: option
      type: string
      description: Option (00h LOAD BY SIGNAL, 01h FORCED MUTE)

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02 21 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: option
      type: string
      description: Option (00h LOAD BY SIGNAL, 01h FORCED MUTE)
    - name: value
      type: string
      description: Setting (00h OFF, 01h ON)

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02 22 00 00 01 00 25"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02 27 00 00 01 {DATA01} {CKS}"
  params:
    - name: profile
      type: string
      description: Profile number (00h Profile 1, 01h Profile 2)

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02 28 00 00 00 2A"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03 05 00 00 03 {DATA01} 00 00 {CKS}"
  params:
    - name: gain
      type: string
      description: Gain selector (00h brightness, 01h contrast, 02h color, 03h hue, 04h sharpness, 05h volume, 96h lamp/light adjust)

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
  command: "01 98 00 00 01 {DATA01} {CKS}"
  params:
    - name: state
      type: string
      description: 01h on, 02h off

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00 D0 00 00 03 00 {DATA01} 01 {CKS}"
  params:
    - name: kind
      type: string
      description: Information type (03h horizontal sync frequency, 04h vertical sync frequency)

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

- id: pip_pbp_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03 B0 00 00 02 C5 {DATA01} {CKS}"
  params:
    - name: target
      type: string
      description: PIP/PBP target (00h MODE, 01h START POSITION, 02h SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3)

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03 B0 00 00 02 DF 00 94"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03 B1 00 00 02 07 {DATA01} {CKS}"
  params:
    - name: mode
      type: string
      description: Eco mode value (see source appendix)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03 B1 00 00 12 2C {DATA01..DATA16} 00 {CKS}"
  params:
    - name: name
      type: string
      description: Projector name up to 16 bytes, NUL terminated

- id: pip_pbp_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03 B1 00 00 03 C5 {DATA01} {DATA02} {CKS}"
  params:
    - name: target
      type: string
      description: PIP/PBP target (00h MODE, 01h START POSITION, 02h SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3)
    - name: value
      type: string
      description: Setting value hex (see source appendix for sub inputs)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03 B1 00 00 03 DF 00 {DATA01} {CKS}"
  params:
    - name: state
      type: string
      description: 00h off, 01h on

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
  command: "03 C9 00 00 03 09 {DATA01} {DATA02} {CKS}"
  params:
    - name: input
      type: string
      description: Input terminal hex (see source appendix)
    - name: source
      type: string
      description: Audio source (00h specified terminal, 01h BNC, 02h COMPUTER)
```

## Feedbacks
```yaml
- id: error_status
  type: object
  description: 12-byte error bitfield (DATA01-DATA12) covering cover/temperature/fan/power/lamp/formatter/iris/lens-interlock errors.

- id: power_state
  type: enum
  values: [standby_sleep, power_on, standby_error, standby_power_saving, network_standby]
  description: From RUNNING STATUS REQUEST / BASIC INFORMATION REQUEST DATA01 (00h/04h/06h/0Fh/10h).

- id: power_on_process
  type: enum
  values: [not_executed, during_execution, not_supported]
  description: RUNNING STATUS REQUEST DATA05 (00h/01h/FFh).

- id: cooling_process
  type: enum
  values: [not_executed, during_execution, not_supported]
  description: RUNNING STATUS REQUEST DATA04 (00h/01h/FFh).

- id: input_signal_type_1
  type: enum
  values: ["1", "2", "3", "4", "5"]
  description: INPUT STATUS REQUEST DATA03 (01h-05h).

- id: input_signal_type_2
  type: enum
  values: [computer, video, s_video, component, viewer_1_5, dvi_d, hdmi, display_port, viewer_6_10, not_source_input]
  description: INPUT STATUS REQUEST DATA04 (01h/02h/03h/04h/07h/20h/21h/22h/23h/FFh).

- id: content_displayed
  type: enum
  values: [video_signal, no_signal, viewer, test_pattern, lan, test_pattern_user, signal_switching, not_supported]
  description: INPUT STATUS REQUEST / BASIC INFORMATION REQUEST DATA09 / DATA02 (00h/01h/02h/03h/04h/05h/10h/FFh).

- id: picture_mute
  type: enum
  values: [off, on]

- id: sound_mute
  type: enum
  values: [off, on]

- id: onscreen_mute
  type: enum
  values: [off, on]

- id: forced_onscreen_mute
  type: enum
  values: [off, on]

- id: onscreen_display
  type: enum
  values: [not_displayed, displayed]

- id: cover_status
  type: enum
  values: [cover_open, cover_closed]
  description: COVER STATUS REQUEST DATA01 (00h/01h).

- id: freeze_status
  type: enum
  values: [off, on]

- id: video_mute
  type: enum
  values: [off, on]
  description: BASIC INFORMATION REQUEST DATA06.

- id: lamp_usage_time_seconds
  type: integer
  description: Seconds; updated at one-minute intervals. INFORMATION REQUEST DATA83-DATA86 or LAMP INFORMATION REQUEST 3 DATA03-DATA06.

- id: lamp_remaining_life_percent
  type: integer
  description: Percent; negative if replacement deadline exceeded.

- id: filter_usage_time_seconds
  type: integer
  description: Seconds; -1 if undefined.

- id: filter_alarm_start_time_seconds
  type: integer
  description: Seconds; -1 if undefined.

- id: carbon_savings_total_kg
  type: integer
  description: Kilograms, max 99999.

- id: carbon_savings_total_mg
  type: integer
  description: Milligrams, max 999999.

- id: projector_name
  type: string
  description: NUL-terminated; up to 16 bytes via LAN PROJECTOR NAME SET.

- id: mac_address
  type: string
  description: 6-byte MAC from LAN MAC ADDRESS STATUS REQUEST2.

- id: model_name
  type: string
  description: NUL-terminated; up to 32 bytes.

- id: serial_number
  type: string
  description: NUL-terminated; up to 16 bytes.

- id: lens_information
  type: object
  description: Per-target bit flags (stop/during operation) for lens memory, zoom, focus, lens shift H/V.

- id: edge_blending
  type: enum
  values: [off, on]

- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]
  description: PIP/PBP REQUEST/SET DATA01=00h -> DATA02 (00h/01h).

- id: pip_pbp_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]
  description: PIP/PBP REQUEST/SET DATA01=01h -> DATA02 (00h-03h).

- id: basic_information
  type: object
  description: Combined operational snapshot from BASIC INFORMATION REQUEST (operation status, content displayed, signal types, mute flags, freeze status).

- id: input_command_response
  type: string
  description: INPUT SW CHANGE response DATA01 (FFh on error, else input terminal echoed).
```

## Variables
```yaml
# Discrete settable parameters that map to feedback entries but are exposed as named settings.
- id: eco_mode
  type: enum
  description: Light/Lamp mode value (model-dependent). Set via 098-8 ECO MODE SET, request via 097-8 ECO MODE REQUEST.
  values: []  # UNRESOLVED: enumeration in source appendix not present in this document.

- id: pip_pbp_sub_input_1
  type: enum
  description: Sub input for PIP/PBP SUB INPUT 1 (data01=02h).
  values: []  # UNRESOLVED: sub input values in source appendix not present.

- id: pip_pbp_sub_input_2
  type: enum
  description: Sub input for PIP/PBP SUB INPUT 2 (data01=09h).
  values: []  # UNRESOLVED: sub input values in source appendix not present.

- id: pip_pbp_sub_input_3
  type: enum
  description: Sub input for PIP/PBP SUB INPUT 3 (data01=0Ah).
  values: []  # UNRESOLVED: sub input values in source appendix not present.

- id: input_terminal
  type: enum
  description: Input terminal selector for INPUT SW CHANGE and AUDIO SELECT SET.
  values: []  # UNRESOLVED: input terminal values in source appendix not present.

- id: aspect
  type: enum
  description: Aspect ratio setting for ASPECT ADJUST.
  values: []  # UNRESOLVED: aspect values in source appendix not present.

- id: audio_select_source
  type: enum
  description: Audio source per input terminal (00h specified terminal, 01h BNC, 02h COMPUTER).
  values: [specified_terminal, bnc, computer]
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notification stream; all state is obtained via REQUEST commands.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off           # source states: "While this command is turning off the power (including the cooling time), no other command can be accepted."
  - power_on            # source states: "While this command is turning on the power, no other command can be accepted."
interlocks:
  - lens_interlock      # DATA09 Bit1 of extended error status: "The interlock switch is open."
  - cover_interlock     # Cover/lens cover status must be normal for operation (mirror/lens cover status present).
# UNRESOLVED: explicit user-facing safety procedures (lamp replacement moratorium, etc.) are referenced but not detailed in this document.
```

## Notes
- Frame format (every command): SOH(0x00-0x03 header marker) TYPE ID1 ID2 LEN DATA... CKS. The header byte carries the data-length class (00h = short, 01h/02h/03h = variable).
- Checksum CKS = low byte of arithmetic sum of all preceding bytes in the frame.
- ID1 = projector's configured control ID; ID2 = model code (model-specific, must be looked up per device).
- While POWER ON or POWER OFF is in progress (including lamp cooldown), the projector will not accept any other command.
- Picture/sound/onscreen mutes are released automatically by input switch or video signal switch (and sound mute also by volume adjustment).
- Lens continuous-drive direction (7Fh/81h) is stopped by sending 00h for the same target.
- Information that includes lamp usage time, filter usage time, etc. is sampled at one-minute intervals even though the value may be reported in seconds.
- Some enumerations (input terminal, aspect, eco mode, PIP sub-input, audio-select terminals, signal types, base model type, remote-key code) are documented as "see Appendix Supplementary Information by Command" — these were not included in the refined source and are marked UNRESOLVED.
- Document revision: BDT140013 Revision 7.1.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-08-27T18:11:18.583Z
last_checked_at: 2026-10-07T12:57:50.464Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:57:50.464Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec frames match the source's 53 listed commands byte for byte, transport values are supported, and the source is a generic projector reference with no EC091 model named. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific input-terminal, aspect, eco-mode, PIP sub-input, audio-select, base-model-type, signal-type and remote-key-code enumerations are referenced from an external appendix not included in the source document."
- "enumeration in source appendix not present in this document."
- "sub input values in source appendix not present."
- "input terminal values in source appendix not present."
- "aspect values in source appendix not present."
- "source documents no unsolicited notification stream; all state is obtained via REQUEST commands."
- "source does not document multi-step macro sequences."
- "explicit user-facing safety procedures (lamp replacement moratorium, etc.) are referenced but not detailed in this document."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
