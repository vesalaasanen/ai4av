---
spec_id: admin/nec-pxxm3-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC PXXM3 Series Control Spec"
manufacturer: NEC
model_family: "PXXM3 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "PXXM3 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-22T22:49:15.420Z
last_checked_at: 2026-10-01T07:56:34.732Z
generated_at: 2026-10-01T07:56:34.732Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model variants in PXXM3 Series not enumerated; only series name stated."
  - "settable parameters that are discrete actions are listed under Actions;"
  - "no unsolicited event/notification messages documented in source."
  - "no multi-step macro sequences documented in source."
  - "source states \"While this command is turning on the power, no other command"
  - "the source pinout documents RTS/CTS handshake on pins 7-8 but does not state whether it is required or optional, so no default can be asserted."
  - "the source does not document any authentication procedure."
  - "baud rate default not stated; source lists 5 supported rates — 9600 listed first as fallback default."
  - "model-specific ID2 codes and base model type values referenced as \"Supplementary Information by Command\" appendix not present in source."
  - "input terminal DATA01 value mapping, aspect DATA01 value mapping, eco mode value mapping, sub-input value mapping, and key code full list are all delegated to the appendix; only the rows present in the source command-detail tables are enumerated here."
  - "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
verification:
  verdict: verified
  checked_at: 2026-10-01T07:56:34.732Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action units match the source's 53 commands literally with correct shapes; transport values (port 7142, baud rates, 8N1) supported. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# NEC PXXM3 Series Control Spec

## Summary
Control spec for NEC PXXM3 Series projectors. Covers RS-232C serial (D-SUB 9P) and TCP/IP LAN (port 7142) interfaces using a binary protocol with checksum. Includes power, input switching, mute, picture/volume/aspect/lamp adjust, lens control and memory, freeze, status queries, error reports, and configuration commands.

<!-- UNRESOLVED: exact model variants in PXXM3 Series not enumerated; only series name stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800; 9600 most common default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: UNRESOLVED  # source documents RTS/CTS handshake on pins 7-8; no explicit default stated
auth:
  type: UNRESOLVED  # source does not document any auth method
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
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

- id: input_switch_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: input
      type: integer
      description: Input terminal code (see appendix "Supplementary Information by Command")

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
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: target
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
      type: integer
      description: Adjustment value high-order 8 bits

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: mode
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
      type: integer
      description: Adjustment value high-order 8 bits

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: aspect
      type: integer
      description: Aspect value (see appendix "Supplementary Information by Command")

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: target_lo
      type: integer
      description: "Adjustment target low: 96h=LAMP ADJUST / LIGHT ADJUST"
    - name: target_hi
      type: integer
      description: Adjustment target high byte (FFh)
    - name: mode
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
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
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: lamp
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "Content: 01h=usage time (seconds), 04h=remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: type
      type: integer
      description: "Type: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: key_lo
      type: integer
      description: "Key code low byte (WORD type, see Key code list)"
    - name: key_hi
      type: integer
      description: "Key code high byte (WORD type, see Key code list)"

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
    - name: target
      type: integer
      description: "Lens axis: 06h=Periphery Focus"
    - name: action
      type: integer
      description: "Drive: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+ continuous, 81h=- continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: target
      type: integer
      description: Lens axis to query

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: action
      type: integer
      description: "FFh=Stop (other fields ignored when stop)"
    - name: mode
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
      type: integer
      description: Adjustment value high-order 8 bits

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: op
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: op
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET (operates on profile set by 053-10)"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: option
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: option
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "Setting: 00h=OFF, 01h=ON"

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
    - name: profile
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

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
    - name: value
      type: integer
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
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: state
      type: integer
      description: "01h=On, 02h=Off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: type
      type: integer
      description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

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
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: field
      type: integer
      description: "Field: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
    - name: value
      type: integer
      description: Eco mode value (see appendix "Supplementary Information by Command")

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01-DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP / Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: field
      type: integer
      description: "Field: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value (sub-input values per appendix)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: state
      type: integer
      description: "00h=Off, 01h=On"

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
    - name: input
      type: integer
      description: Input terminal (see appendix "Supplementary Information by Command")
    - name: value
      type: integer
      description: "Setting: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: object
  description: |
    12-byte error status block from ERROR STATUS REQUEST.
    Bit-mapped: cover/temp/fan/power/lamp/format/cover/iris/lens errors, extended status.

- id: power_status
  type: enum
  values: [standby, power_on, not_supported]

- id: cooling_process
  type: enum
  values: [not_executed, during_execution, not_supported]

- id: power_on_off_process
  type: enum
  values: [not_executed, during_execution, not_supported]

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby, not_supported]

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

- id: cover_status
  type: enum
  values: [normal_open, cover_closed]

- id: input_signal_status
  type: object
  description: |
    Signal switch process, signal list number, selection signal type 1/2,
    signal list type, test pattern display, content displayed.

- id: selection_signal_type_1
  type: integer
  description: 1-based signal group number (01h-05h), FFh=not supported

- id: selection_signal_type_2
  type: integer
  description: 01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10), FFh=Not Source Input

- id: model_name
  type: string
  description: NUL-terminated model name string

- id: projector_name
  type: string
  description: NUL-terminated LAN projector name (up to 17 bytes)

- id: serial_number
  type: string
  description: NUL-terminated serial number (up to 16 bytes)

- id: mac_address
  type: string
  description: 6-byte MAC address

- id: lamp_usage_time
  type: integer
  description: Lamp usage time in seconds (1-second resolution, updated at 1-min intervals)

- id: lamp_remaining_life
  type: integer
  description: Lamp remaining life in percent (negative if past replacement deadline)

- id: filter_usage_time
  type: integer
  description: Filter usage time in seconds (-1 if undefined)

- id: filter_alarm_start_time
  type: integer
  description: Filter alarm start time in seconds (-1 if undefined)

- id: carbon_savings
  type: object
  description: |
    Total Carbon Savings or Carbon Savings during operation.
    Reported in kg (max 99999) + mg (max 999999) components.

- id: eco_mode
  type: integer
  description: Eco mode value (see appendix "Supplementary Information by Command")

- id: edge_blending_mode
  type: enum
  values: [off, on]

- id: pip_mode
  type: enum
  values: [pip, picture_by_picture]

- id: pip_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]

- id: lens_memory_option_load_by_signal
  type: enum
  values: [off, on]

- id: lens_memory_option_forced_mute
  type: enum
  values: [off, on]

- id: lens_profile_selected
  type: enum
  values: [profile_1, profile_2]

- id: lens_information
  type: object
  description: |
    Bit-mapped lens status: lens memory, zoom, focus, lens shift H/V per bit.
    0=Stop, 1=During operation.

- id: lens_position_limits
  type: object
  description: Upper/lower limit and current value (16-bit each) per lens axis

- id: gain_parameter
  type: object
  description: |
    Per gain: status, upper/lower limit, default, current value,
    wide/narrow adjustment width, default-valid flag (16-byte response).

- id: horizontal_sync_frequency
  type: string
  description: Human-readable horizontal sync frequency string

- id: vertical_sync_frequency
  type: string
  description: Human-readable vertical sync frequency string
```

## Variables
```yaml
# UNRESOLVED: settable parameters that are discrete actions are listed under Actions;
# no separate scalar variable set documented in source beyond per-action parameters.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification messages documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source states "While this command is turning on the power, no other command
# can be accepted" and similar for power off (including cooling time), and "Forced
# onscreen mute on" error code (02h 04h), but no explicit interlock procedures or
# safety warnings are documented.
```

## Notes
Serial port: D-SUB 9P, full duplex, supports baud rates 115200/38400/19200/9600/4800 bps. Flow control is UNRESOLVED: the source pinout documents RTS/CTS handshake on pins 7-8 but does not state whether it is required or optional, so no default can be asserted.

LAN control uses TCP port 7142 (binary protocol, same framing as serial).

Protocol framing (command): `20h | OPC | ID1 ID2 | LEN | DATA01..DATA?? | CKS`. Response: `2Xh | OPC | ID1 ID2 | LEN | DATA.. | CKS`. Error response: `AXh | OPC | ID1 ID2 | 02h | ERR1 ERR2 | CKS`. Checksum = low-order byte of sum of all preceding bytes.

`ID1` = control ID (projector setting). `ID2` = model code (varies by model). Many commands reserve DATA01-DATA12 for response payloads.

Power commands block other commands while transitioning (including cooling).

Authentication method is UNRESOLVED: the source does not document any authentication procedure.

<!-- UNRESOLVED: baud rate default not stated; source lists 5 supported rates — 9600 listed first as fallback default. -->
<!-- UNRESOLVED: model-specific ID2 codes and base model type values referenced as "Supplementary Information by Command" appendix not present in source. -->
<!-- UNRESOLVED: input terminal DATA01 value mapping, aspect DATA01 value mapping, eco mode value mapping, sub-input value mapping, and key code full list are all delegated to the appendix; only the rows present in the source command-detail tables are enumerated here. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-22T22:49:15.420Z
last_checked_at: 2026-10-01T07:56:34.732Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T07:56:34.732Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action units match the source's 53 commands literally with correct shapes; transport values (port 7142, baud rates, 8N1) supported. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model variants in PXXM3 Series not enumerated; only series name stated."
- "settable parameters that are discrete actions are listed under Actions;"
- "no unsolicited event/notification messages documented in source."
- "no multi-step macro sequences documented in source."
- "source states \"While this command is turning on the power, no other command"
- "the source pinout documents RTS/CTS handshake on pins 7-8 but does not state whether it is required or optional, so no default can be asserted."
- "the source does not document any authentication procedure."
- "baud rate default not stated; source lists 5 supported rates — 9600 listed first as fallback default."
- "model-specific ID2 codes and base model type values referenced as \"Supplementary Information by Command\" appendix not present in source."
- "input terminal DATA01 value mapping, aspect DATA01 value mapping, eco mode value mapping, sub-input value mapping, and key code full list are all delegated to the appendix; only the rows present in the source command-detail tables are enumerated here."
- "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
