---
schema_version: ai4av-public-spec-v1
device_id: nec/x462un-series
entity_id: nec_x462un_series
spec_id: admin/nec-x462un_series
revision: 1
author: admin
title: "NEC X462UN Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "X462UN Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "X462UN Series"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_x462un_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:36:48.944Z
retrieved_at: 2026-04-25T21:36:48.944Z
last_checked_at: 2026-04-25T21:36:48.944Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:36:48.944Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions and feedbacks match source command reference; transport parameters verified verbatim; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X462UN Series Control Spec

## Summary
NEC projector/projection system supporting RS-232C serial and wired TCP/IP control. Supports power control, input routing, picture/sound muting, lens control, freeze, eco mode, and comprehensive query commands for status and configuration. Control via PC CONTROL port (RS-232C) or LAN (TCP port 7142). No authentication required.

<!-- UNRESOLVED: This manual (BDT140013 Rev 7.1) appears to be a generic NEC projector command reference. Confirm X462UN Series-specific command support. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # LAN TCP port stated in source
serial:
  baud_rate: 115200  # highest rate listed; source lists 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not mentioned in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # POWER ON / POWER OFF commands present
- routable        # INPUT SW CHANGE command present
- queryable      # INFORMATION REQUEST, STATUS REQUEST, MODEL NAME REQUEST present
- levelable      # PICTURE ADJUST, VOLUME ADJUST present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: string
      description: Input terminal hex code (e.g. "01h"=COMPUTER, "06h"=VIDEO, "A1h"=HDMI, "20h"=LAN)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: string
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: string
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: string
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect
      type: string
      description: "00h=Auto, 01h=Wide Zoom, 02h=16:9, 03h=Native, 04h=4:3, etc."

- id: other_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: string
      description: Hex key code (e.g. "02h"=POWER ON, "03h"=POWER OFF, "0Ah"=LEFT)

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: string
      description: "06h=Periphery Focus"
    - name: direction
      type: string
      description: "00h=Stop, 01h/02h/03h=Plus drive, 7Fh=Continuous plus, 81h=Continuous minus, FDh/FEh/FFh=Minus drive"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: action
      type: string
      description: "FFh=Stop"
    - name: mode
      type: string
      description: "00h=Absolute, 02h=Relative"
    - name: value
      type: integer
      description: 16-bit adjustment value

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: string
      description: "00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: string
      description: "00h=Profile 1, 01h=Profile 2"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "00h=OFF, 01h=NORMAL/ON, 02h=ECO1, 03h=ECO2, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT"
    - name: value
      type: string
      description: Mode/position/input value

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "00h=OFF, 01h=ON"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: string
      description: "01h=On, 02h=Off"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: string
      description: Input terminal hex code
    - name: source
      type: string
      description: "00h=HDMI1, 01h=HDMI2, 02h=DisplayPort, 03h=HDBaseT"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  type: bitfield
  description: |
    Bit-level error status:
    DATA01: Cover error(Bit0), Temp error(Bit1), Fan error(Bit3), Fan error(Bit4), Power error(Bit5), Lamp off(Bit6), Lamp moratorium(Bit7)
    DATA02: Lamp time exceeded(Bit0), Formatter error(Bit1), Lamp2 off(Bit2)
    DATA03: FPGA error(Bit1), Temp sensor error(Bit2), Lamp data error(Bit4), Mirror cover error(Bit5), Lamp2 moratorium(Bit6), Lamp2 time exceeded(Bit7)
    DATA04: Lamp2 not present(Bit0), Lamp2 data error(Bit1), Dust temp error(Bit2), Foreign matter sensor(Bit3), Iris calib error(Bit5), Lens not installed(Bit7)
    DATA09: Portrait cover(Bit0), Interlock open(Bit1), System error slave CPU(Bit2), System error formatter(Bit3)

- id: response_status
  label: Response Status
  type: enum
  values:
    - err1_err2
  description: ERR1/ERR2 codes: 00h/00h=Unrecognized, 00h/01h=Unsupported, 01h/00h=Invalid value, 01h/01h=Invalid input, 01h/02h=Invalid language, 02h/00h=Memory alloc, 02h/02h=Memory in use, 02h/03h=Cannot set, 02h/04h=Forced onscreen mute, 02h/06h=Viewer error, 02h/07h=No signal, 02h/08h=Test pattern, 02h/09h=No PC card, 02h/0Ah=Memory op error, 02h/0Ch=Entry list displayed, 02h/0Dh=Power off, 02h/0Eh=Exec failed, 02h/0Fh=No authority, 03h/00h=Wrong gain number, 03h/01h=Invalid gain, 03h/02h=Adj failed

- id: running_status
  label: Running Status Request
  type: object
  properties:
    - power_status: "00h=Standby, 01h=Power on"
    - cooling_process: "00h=Not executed, 01h=During execution"
    - power_on_off_process: "00h=Not executed, 01h=During execution"
    - operation_status: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

- id: input_status
  label: Input Status Request
  type: object
  properties:
    - signal_switch_process: "00h=Not executed, 01h=During execution"
    - signal_list_number: "Signal list number minus 1"
    - signal_type_1: "01h-05h"
    - signal_type_2: "01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 05h=Reserved, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10)"
    - test_pattern: "00h=Not displayed, 01h=Displayed"
    - content_displayed: "00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN"

- id: mute_status
  label: Mute Status Request
  type: object
  properties:
    - picture_mute: "00h=Off, 01h=On"
    - sound_mute: "00h=Off, 01h=On"
    - onscreen_mute: "00h=Off, 01h=On"
    - forced_onscreen_mute: "00h=Off, 01h=On"
    - onscreen_display: "00h=Not displayed, 01h=Displayed"

- id: model_name
  label: Model Name Request
  type: string
  description: Model name string (NUL-terminated)

- id: cover_status
  label: Cover Status Request
  type: enum
  values: ["00h=Normal (opened)", "01h=Cover closed"]

- id: information_request
  label: Information Request
  type: object
  properties:
    - projector_name: "DATA01-49, NUL-terminated string"
    - lamp_usage_time: "DATA83-86, seconds"
    - filter_usage_time: "DATA87-90, seconds"

- id: filter_usage_info
  label: Filter Usage Information Request
  type: object
  properties:
    - filter_usage_time: "DATA01-04, seconds"
    - filter_alarm_start_time: "DATA05-08, seconds (-1 if undefined)"

- id: lamp_info_3
  label: Lamp Information Request 3
  type: object
  properties:
    - lamp_usage_time: "DATA03-06, seconds"
    - lamp_remaining_life: "DATA03-06, percentage (negative if exceeded)"

- id: carbon_savings
  label: Carbon Savings Information Request
  type: object
  properties:
    - carbon_savings_kg: "DATA02-05, Maximum 99999kg"
    - carbon_savings_mg: "DATA06-09, Maximum 999999mg"

- id: gain_parameter_3
  label: Gain Parameter Request 3
  type: object
  properties:
    - adjustment_status: "00h=Display not possible, 01h=Adj not possible, 02h=Adj possible, FFh=Gain does not exist"
    - upper_limit: "DATA02-03"
    - lower_limit: "DATA04-05"
    - default_value: "DATA06-07"
    - current_value: "DATA08-09"
    - default_valid: "00h=Invalid, 01h=Valid"

- id: setting_request
  label: Setting Request
  type: object
  properties:
    - sound_function: "00h=Not available, 01h=Available"
    - profile_number: "00h=Not available, 01h=Clock, 02h=Sleep timer, 03h=Clock+Sleep timer"

- id: eco_mode_request
  label: Eco Mode Request
  type: string
  description: Eco mode value

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: string
  description: Projector name (NUL-terminated, up to 17 chars)

- id: lan_mac_address
  label: LAN MAC Address Status Request2
  type: string
  description: MAC address (6 bytes)

- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  type: object
  properties:
    - mode: "00h=PIP, 01h=PICTURE BY PICTURE"
    - position: "00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: enum
  values: ["00h=OFF", "01h=ON"]

- id: lens_control_request
  label: Lens Control Request
  type: object
  properties:
    - upper_limit: "DATA02-03"
    - lower_limit: "DATA04-05"
    - current_value: "DATA06-07"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: object
  properties:
    - option: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - value: "00h=OFF, 01h=ON"

- id: lens_profile_request
  label: Lens Profile Request
  type: enum
  values: ["00h=Profile 1", "01h=Profile 2"]

- id: lens_information
  label: Lens Information Request
  type: bitfield
  description: |
    DATA01: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V)

- id: serial_number
  label: Serial Number Request
  type: string
  description: Serial number (NUL-terminated, up to 16 chars)

- id: base_model_type
  label: Base Model Type Request
  type: string
  description: Base model type and model name

- id: basic_information
  label: Basic Information Request
  type: object
  properties:
    - operation_status: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"
    - content_displayed: "00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN, 05h=Test pattern(user), 10h=Signal switching"
    - signal_type_1: "01h-05h"
    - signal_type_2: "01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 05h=Reserved, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10), C4h=SDI, BFh=HDBaseT, FFh=Not Source Input"
    - display_signal_type: "NTSC/PAL/SECAM variants, Component, Unknown"
    - video_mute: "00h=Off, 01h=On"
    - sound_mute: "00h=Off, 01h=On"
    - onscreen_mute: "00h=Off, 01h=On"
    - freeze_status: "00h=Off, 01h=On"
```

## Variables
```yaml
# UNRESOLVED: Variables are settable parameters tracked independently of discrete actions.
# The gain parameter requests (060-1) return settable values but do not have corresponding
# explicit "set" commands in this manual beyond the ADJUST commands already listed in Actions.
```

## Events
```yaml
# UNRESOLVED: The source does not document unsolicited event notifications from the projector.
# All communication appears to be command/response (polling mode).
```

## Macros
```yaml
# UNRESOLVED: No explicit multi-step macro sequences are documented in the source.
```

## Safety
```yaml
confirmation_required_for:
  - power_on    # "While this command is turning on the power, no other command can be accepted."
  - power_off    # "While this command is turning off the power (including the cooling time), no other command can be accepted."
interlocks:
  - command: power_on
    description: "Some models require specific standby modes to receive commands via serial or LAN. Supported standby modes vary by model: Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON for serial; Normal, NORMAL, NETWORK STANDBY, SLEEP, HTBaseT STANDBY, OFF, ON, STANDBY POWER ON for wired LAN."
  - command: lens_control
    description: "After sending continuous drive command (7Fh or 81h), sending 00h stops lens motion."
# UNRESOLVED: voltage, current, power specifications not stated in source
```

## Notes
Command format: `20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>` — all values in hexadecimal. Commands require Control ID (ID1) and Model code (ID2). Checksum (CKS) = low-order byte of sum of all preceding bytes.

Response format: Success (no data): no data part. Success (with data): response code + data. Failure: response code + ERR1 + ERR2 + CKS.

Power commands block other commands during execution. Picture mute auto-releases on input/signal switch. Sound mute auto-releases on input switch, signal switch, or volume adjustment.

<!-- UNRESOLVED: Input terminal code values vary by model (some have alternatives like 1Ah vs 03h for COMPUTER3, A1h vs 1Ah for HDMI). Verify model-specific codes. -->
<!-- UNRESOLVED: Eco mode values vary by model (Normal may be 00h or 01h). Verify model-specific values. -->
<!-- UNRESOLVED: Aspect mode hex codes vary (e.g. FULL may be 09h or 10h). Verify model-specific values. -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_x462un_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:36:48.944Z
retrieved_at: 2026-04-25T21:36:48.944Z
last_checked_at: 2026-04-25T21:36:48.944Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:36:48.944Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions and feedbacks match source command reference; transport parameters verified verbatim; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```
