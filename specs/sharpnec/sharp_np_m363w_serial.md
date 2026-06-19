---
spec_id: admin/sharpnec-np-m363w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP M363W Control Spec"
manufacturer: Sharp/NEC
model_family: "NP M363W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP M363W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:57:37.126Z
last_checked_at: 2026-06-18T08:34:46.285Z
generated_at: 2026-06-18T08:34:46.285Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "ID2 model code value for NP M363W not stated in source (varies by model)."
  - "input terminal value table referenced by Appendix \"Supplementary Information by Command\" is not present in this refined source."
  - "eco mode setting values referenced by Appendix not present."
  - "base model type values referenced by Appendix not present."
  - "flow control not stated; full-duplex mode stated only"
  - "values not in this source."
  - "values not in this source)."
  - "source does not document any unsolicited notifications. All responses"
  - "source does not describe any explicit multi-step sequences."
  - "no explicit power-on sequencing procedure or voltage interlocks stated."
  - "ID2 (model code) for NP M363W not stated."
  - "default/active baud rate not stated (five are valid)."
  - "flow control not stated (only \"Full duplex\" mode named)."
  - "Appendix value tables for input terminal, aspect, eco mode, base model type, PIP sub-input not present."
  - "firmware version compatibility not stated."
  - "protocol version not stated."
  - "LAN auth (if any) over TCP 7142 not documented — inferred none for serial; TCP auth UNRESOLVED."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:34:46.285Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (17 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP M363W Control Spec

## Summary
The Sharp/NEC NP M363W is an LCD projector controllable via RS-232C (PC CONTROL port, D-SUB 9P) and TCP/IP over wired/wireless LAN. This spec covers the binary hex command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input switching, mute, picture/volume/aspect adjustment, lens and lens-memory control, shutter, freeze, eco mode, edge blending, PIP/PbP, and a broad set of status/information queries. Commands are framed in hexadecimal with ID1, ID2, LEN, DATA, and CKS (checksum) fields.

<!-- UNRESOLVED: ID2 model code value for NP M363W not stated in source (varies by model). -->
<!-- UNRESOLVED: input terminal value table referenced by Appendix "Supplementary Information by Command" is not present in this refined source. -->
<!-- UNRESOLVED: eco mode setting values referenced by Appendix not present. -->
<!-- UNRESOLVED: base model type values referenced by Appendix not present. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600   # source lists 115200/38400/19200/9600/4800; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none   # UNRESOLVED: flow control not stated; full-duplex mode stated only
auth:
  type: none  # inferred: no auth procedure in source
```

Note: baud_rate is selectable; the source lists five valid rates without naming a default. 9600 is shown as a placeholder of the documented set — confirm against the device configuration.

## Traits
```yaml
traits:
  - powerable       # 015 POWER ON / 016 POWER OFF present
  - queryable       # numerous status/information request commands
  - levelable       # 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST / 030-15 OTHER ADJUST
  - routable        # 018 INPUT SW CHANGE / 319-10 AUDIO SELECT SET
```

## Actions
```yaml
# Framing: commands are hex byte strings. Shared params per source section 2.2:
#   ID1 = projector control ID; ID2 = model code (varies by model - UNRESOLVED for NP M363W)
#   CKS = low-order byte of sum of all preceding bytes (incl. 0x20/0x02 frame headers).
# Commands below use literal first byte 02h/03h (command header) per source; ID1/ID2/CKS
# are appended by the controller at send time and shown as <ID1> <ID2> <CKS> placeholders.

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
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: Input terminal selector (e.g. 06h = video port). Full table in Appendix "Supplementary Information by Command" - UNRESOLVED: values not in this source.

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
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02}-{DATA04} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: DATA02
      type: enum
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01}-{DATA03} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: Value set for the aspect (table in Appendix - UNRESOLVED: values not in this source).

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh {DATA03}-{DATA05} {CKS}"
  params:
    - name: DATA03
      type: enum
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

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
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: enum
      description: "01h lamp usage time (seconds), 04h lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Key code low byte (see key code list, e.g. 02h POWER ON, 06h MENU, 09h RIGHT)"
    - name: DATA02
      type: enum
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
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "06h Periphery Focus"
    - name: DATA02
      type: enum
      description: "00h Stop; 01h drive +1s; 02h +0.5s; 03h +0.25s; 7Fh drive +; 81h drive -; FDh -0.25s; FEh -0.5s; FFh -1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: Lens adjustment target (per 053 LENS CONTROL DATA01 set).

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01}-{DATA04} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "FFh Stop, otherwise target axis"
    - name: DATA02
      type: enum
      description: "Adjustment mode: 00h absolute, 02h relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h MOVE, 01h STORE, 02h RESET (applies to profile selected via 053-10)"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: DATA02
      type: enum
      description: "Setting value: 00h OFF, 01h ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h Profile 1, 01h Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: enum
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
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "01h Freeze On, 02h Freeze Off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "03h Horizontal sync frequency, 04h Vertical sync frequency"

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
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: Value set for the eco mode (table in Appendix - UNRESOLVED: values not in this source).

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: Projector name bytes DATA01-DATA16 (up to 16 bytes, NUL-terminated).

- id: pip_picture_by_picture_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: DATA02
      type: enum
      description: "Setting value - MODE: 00h PIP/01h PBP; START POSITION: 00h TL/01h TR/02h BL/03h BR; SUB INPUT: per Appendix (UNRESOLVED)."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
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
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: Input terminal (per Appendix - UNRESOLVED: values not in this source).
    - name: DATA02
      type: enum
      description: "00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
# Ack/nak response frame per source section 2.3. Successful command echoes header
# with high bit set (e.g. 02h -> 22h, 03h -> 23h, 00h -> 20h, 01h -> 21h) followed
# by <ID1> <ID2> LEN [DATA...] <CKS>. Failed command returns A{header}h with
# <ERR1> <ERR2> <CKS>.

- id: command_ack
  type: frame
  description: Successful command acknowledgement; header high-bit set (20h/21h/22h/23h).

- id: command_error
  type: frame
  description: Error response A0h..A3h with ERR1/ERR2 codes (see error code list).

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, network_standby]
  # from 078-2 RUNNING STATUS REQUEST DATA06

- id: input_signal_type
  type: enum
  # from 078-3 INPUT STATUS REQUEST DATA04: COMPUTER/VIDEO/S-VIDEO/COMPONENT/DVI-D/HDMI/DisplayPort/VIEWER

- id: mute_state
  type: struct
  fields:
    picture_mute: [off, on]
    sound_mute: [off, on]
    onscreen_mute: [off, on]
    forced_onscreen_mute: [off, on]

- id: cover_state
  type: enum
  values: [normal_open, closed]

- id: freeze_state
  type: enum
  values: [off, on]
```

## Variables
```yaml
- id: lamp_usage_time_seconds
  type: integer
  description: Lamp usage time in seconds, updated at one-minute intervals (037 / 037-4).
- id: filter_usage_time_seconds
  type: integer
  description: Filter usage time in seconds (037-3).
- id: filter_alarm_start_time_seconds
  type: integer
  description: Filter alarm start time in seconds (037-3).
- id: lamp_remaining_life_percent
  type: integer
  description: Lamp remaining life (%); negative if replacement deadline exceeded.
- id: carbon_savings_kg
  type: number
  description: Carbon savings kilograms (max 99999), from 037-6.
- id: carbon_savings_mg
  type: integer
  description: Carbon savings milligrams (max 999999), from 037-6.
- id: picture_brightness
  type: integer
  description: Picture Brightness adjusted value (060-1 / 030-1 DATA01=00h).
- id: picture_contrast
  type: integer
- id: picture_color
  type: integer
- id: picture_hue
  type: integer
- id: picture_sharpness
  type: integer
- id: volume
  type: integer
- id: lamp_light_adjust
  type: integer
  description: Lamp/Light adjust (030-15 / 060-1 DATA01=96h).
- id: projector_name
  type: string
  description: LAN projector name (up to 16 bytes; 097-45 / 098-45).
- id: mac_address
  type: string
  description: Projector MAC address (6 bytes; 097-155).
- id: eco_mode
  type: enum
  description: Value set for eco mode (097-8 / 098-8). Enum values in Appendix - UNRESOLVED.
- id: edge_blending_mode
  type: enum
  values: [off, on]
- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
- id: horizontal_sync_frequency
  type: string
  description: Horizontal sync frequency string (084 DATA01=03h).
- id: vertical_sync_frequency
  type: string
  description: Vertical sync frequency string (084 DATA01=04h).
- id: serial_number
  type: string
  description: Projector serial number (305-2).
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited notifications. All responses
# appear to be solicited (command/ack-query pairs).
```

## Macros
```yaml
# UNRESOLVED: source does not describe any explicit multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: While power-on is executing, no other command can be accepted.
  - command: power_off
    note: While power-off (including cooling time) is executing, no other command can be accepted.
  - command: input_sw_change
    note: Picture mute and onscreen mute auto-clear on input/video switch.
  - command: sound_mute_on
    note: Sound mute auto-clears on input switch, video signal switch, or volume adjustment.
  - command: error_status_request
    note: DATA09 Bit1 "interlock switch is open" reported as error condition.
# UNRESOLVED: no explicit power-on sequencing procedure or voltage interlocks stated.
```

## Notes
- Checksum: sum all preceding bytes, take low-order one byte (eight bits). Worked example from source: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- Response frame header convention: successful response sets the high bit of the command header byte (00h→20h, 01h→21h, 02h→22h, 03h→23h). Error responses use `A0h`–`A3h` (header | 0x80 with 0xA0 base).
- ID2 is the model code and varies by model — the NP M363W value is not stated in this source and must be read from the device.
- Baud rate is selectable across 4800/9600/19200/38400/115200; the unit's configured rate must match the controller.
- LAN commands share the same binary frame as RS-232C and use TCP port 7142.
- Several parameter value tables (input terminal codes, aspect values, eco mode values, base model type values, sub-input values) are referenced as Appendix "Supplementary Information by Command" and are not present in this refined source.

<!-- UNRESOLVED: ID2 (model code) for NP M363W not stated. -->
<!-- UNRESOLVED: default/active baud rate not stated (five are valid). -->
<!-- UNRESOLVED: flow control not stated (only "Full duplex" mode named). -->
<!-- UNRESOLVED: Appendix value tables for input terminal, aspect, eco mode, base model type, PIP sub-input not present. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: protocol version not stated. -->
<!-- UNRESOLVED: LAN auth (if any) over TCP 7142 not documented — inferred none for serial; TCP auth UNRESOLVED. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:57:37.126Z
last_checked_at: 2026-06-18T08:34:46.285Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:34:46.285Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (17 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "ID2 model code value for NP M363W not stated in source (varies by model)."
- "input terminal value table referenced by Appendix \"Supplementary Information by Command\" is not present in this refined source."
- "eco mode setting values referenced by Appendix not present."
- "base model type values referenced by Appendix not present."
- "flow control not stated; full-duplex mode stated only"
- "values not in this source."
- "values not in this source)."
- "source does not document any unsolicited notifications. All responses"
- "source does not describe any explicit multi-step sequences."
- "no explicit power-on sequencing procedure or voltage interlocks stated."
- "ID2 (model code) for NP M363W not stated."
- "default/active baud rate not stated (five are valid)."
- "flow control not stated (only \"Full duplex\" mode named)."
- "Appendix value tables for input terminal, aspect, eco mode, base model type, PIP sub-input not present."
- "firmware version compatibility not stated."
- "protocol version not stated."
- "LAN auth (if any) over TCP 7142 not documented — inferred none for serial; TCP auth UNRESOLVED."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
