---
schema_version: ai4av-public-spec-v1
device_id: nec/p701-avt-series
entity_id: nec_p701_avt_series
spec_id: admin/nec-p701-avt-series
revision: 1
author: admin
title: "NEC P701-AVT Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "P701-AVT Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "P701-AVT Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_p701_avt_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:32:23.243Z
retrieved_at: 2026-04-25T21:32:23.243Z
last_checked_at: 2026-04-25T21:32:23.243Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:32:23.243Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions matched distinct source commands; transport parameters verified verbatim in manual."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC P701-AVT Series Control Spec

## Summary
NEC P701-AVT Series projector supporting RS-232C serial and TCP/IP control interfaces. Serial communication at 115200/38400/19200/9600/4800 bps, 8N1. LAN control via TCP port 7142. Supports power control, input routing, picture/sound mute, volume adjustment, lens control, eco mode, and comprehensive status queries.

<!-- UNRESOLVED: document is BDT140013 Rev 7.1 — generic NEC projector command reference; specific P701-AVT Series model commands not enumerated separately -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # 115200/38400/19200/9600/4800 bps (auto-selectable)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not specified in source
addressing:
  port: 7142  # LAN TCP port stated for command sending/receiving
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: POWER ON (015) and POWER OFF (016) commands present
- routable        # inferred: INPUT SW CHANGE (018) command present
- queryable       # inferred: multiple REQUEST commands for status, lamp, filter, input, mute, model info
- levelable       # inferred: VOLUME ADJUST (030-2), PICTURE ADJUST (030-1), PICTURE MUTE, SOUND MUTE
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on the projector. No other command accepted during power-on process.

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off the projector. No other command accepted during cooling time.

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 06h=VIDEO, 01h=COMPUTER, A1h=HDMI)

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
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order first)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order first)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code from remote control (see key code table)"

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
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h/02h/03h=Drive plus 1s/0.5s/0.25s, 7Fh=Drive plus, 81h=Drive minus, FDh/FEh/FFh=Drive minus 0.25s/0.5s/1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute value, 02h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON/NORMAL, 02h/03h=ECO, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value dependent on target

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code
    - name: source
      type: integer
      description: "00h=Specified terminal, 01h=BNC, 02h=COMPUTER"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"

- id: error_status_request
  label: Error Status Request
  kind: query
  params: []

- id: information_request
  label: Information Request
  kind: query
  params: []

- id: filter_usage_request
  label: Filter Usage Information Request
  kind: query
  params: []

- id: lamp_information_request
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Usage time, 04h=Remaining life"

- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []

- id: gain_parameter_request
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=VOLUME, 96h=LAMP"

- id: setting_request
  label: Setting Request
  kind: query
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  params: []

- id: information_string_request
  label: Information String Request
  kind: query
  params:
    - name: type
      type: integer
      description: "03h=Horizontal sync freq, 04h=Vertical sync freq"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []

- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: query
  params: []

- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  params: []

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  params: []
```

## Feedbacks
```yaml
# Error response format: A0h/A1h/A2h/A3h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# Success responses vary by command type

- id: error_code
  type: enum
  values:
    - "00h/00h: Command not recognized"
    - "00h/01h: Command not supported"
    - "01h/00h: Invalid value"
    - "01h/01h: Invalid input terminal"
    - "01h/02h: Invalid language"
    - "02h/00h: Memory allocation error"
    - "02h/02h: Memory in use"
    - "02h/03h: Value cannot be set"
    - "02h/04h: Forced onscreen mute on"
    - "02h/06h: Viewer error"
    - "02h/07h: No signal"
    - "02h/08h: Test pattern displayed"
    - "02h/09h: No PC card"
    - "02h/0Ah: Memory operation error"
    - "02h/0Ch: Entry list displayed"
    - "02h/0Dh: Power is off"
    - "02h/0Eh: Command execution failed"
    - "02h/0Fh: No authority"
    - "03h/00h: Incorrect gain number"
    - "03h/01h: Invalid gain"
    - "03h/02h: Adjustment failed"

- id: power_state
  type: enum
  values:
    - "00h: Standby"
    - "01h: Power on"
    - "04h: Power on (alternate)"
    - "05h: Cooling"
    - "06h: Standby (error)"
    - "0Fh: Standby (Power saving)"
    - "10h: Network standby"

- id: mute_status
  type: object
  properties:
    picture_mute: [off, on]
    sound_mute: [off, on]
    onscreen_mute: [off, on]
    forced_onscreen_mute: [off, on]

- id: running_status
  type: object
  properties:
    power_status: [standby, power_on]
    cooling_process: [not_executed, executing]
    power_on_off_process: [not_executed, executing]
    operation_status: [standby_sleep, standby_power_saving, power_on, cooling, standby_error, network_standby]
```

## Variables
```yaml
# UNRESOLVED: settable parameters not clearly distinguished from actions in source
# The following are settable via commands but documented as part of action params:
# - eco_mode: 098-8 ECO MODE SET
# - projector_name: 098-45 LAN PROJECTOR NAME SET
# - pip_pbp_mode: 098-198 PIP/PICTURE BY PICTURE SET
# - edge_blending: 098-243-1 EDGE BLENDING MODE SET
# - audio_select: 319-10 AUDIO SELECT SET
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for:
  - power_on   # Command blocks other commands during execution
  - power_off  # Command blocks other commands during cooling time
interlocks:
  - Some models require specific standby modes to receive commands via serial or LAN.
    Supported standby modes vary by model: Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON.
# UNRESOLVED: specific standby mode requirements for P701-AVT Series not stated
```

## Notes
**Protocol structure**: Commands are hex-encoded binary packets. Format: `<HEADER> <MODEL_CODE> <ID1> <ID2> <LEN> <DATA> <CKS>`. Responses follow similar format with response headers (A0h/A1h/A2h/A3h).

**Checksum calculation**: Add all preceding bytes, use low-order byte.

**Input terminal hex codes**: 01h=COMPUTER, 06h=VIDEO, 0Bh=S-VIDEO, 10h=Component, A1h=HDMI, A2h=HDMI2, 20h=LAN/NETWORK, 9Ch=DVI-D, A6h=DisplayPort.

**Standby mode note**: Some models require specific standby modes to receive commands. Serial supports: Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON. LAN supports: Normal, NORMAL, NETWORK STANDBY, SLEEP, HTBaseT STANDBY, OFF, ON, STANDBY POWER ON.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: specific model variations for P701-AVT Series not enumerated -->
<!-- UNRESOLVED: HDBaseT standby mode support not confirmed for P701-AVT Series -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_p701_avt_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:32:23.243Z
retrieved_at: 2026-04-25T21:32:23.243Z
last_checked_at: 2026-04-25T21:32:23.243Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:32:23.243Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions matched distinct source commands; transport parameters verified verbatim in manual."
```

## Known Gaps

```yaml
[]
```
