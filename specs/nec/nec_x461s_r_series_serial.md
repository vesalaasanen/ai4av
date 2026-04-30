---
schema_version: ai4av-public-spec-v1
device_id: nec/x461s-r-series
entity_id: nec_x461s_r_series
spec_id: admin/nec-x461s-r-series
revision: 1
author: admin
title: "NEC X461S-R Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "X461S-R Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "X461S-R Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_x461s_r_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T21:36:05.610Z
retrieved_at: 2026-04-26T21:36:05.610Z
last_checked_at: 2026-04-26T21:36:05.610Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T21:36:05.610Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions matched source commands; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X461S-R Series Control Spec

## Summary
NEC X461S-R Series projector with both RS-232C serial and wired LAN (TCP/IP) control interfaces. The serial interface supports multiple baud rates (115200/38400/19200/9600/4800 bps). The LAN interface uses TCP port 7142 for command transmission. Supports power control, input routing, mute functions, picture adjustment, lens control, eco mode, and extensive status monitoring.

<!-- UNRESOLVED: complete command byte encoding for all parameters not fully specified (referenced as "Appendix" but appendix content partially truncated in source) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: multiple rates supported (115200/38400/19200/9600/4800 bps) — no single default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: RTS/CTS loopback present in pinout but flow_control mode not stated
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: POWER ON (015) and POWER OFF (016) commands present
- queryable       # inferred: multiple status/information request commands present
- routable        # inferred: INPUT SW CHANGE (018) command present
- levelable       # inferred: VOLUME ADJUST (030-2), PICTURE ADJUST (030-1), LAMP ADJUST (030-15) commands present
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
  label: Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 01h=COMPUTER, 06h=VIDEO, 20h=LAN/NETWORK, A1h=HDMI)

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
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order byte first)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order byte first)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: "Aspect mode hex code: 00h=AUTO, 01h=WIDE ZOOM, 02h=16:9, 03h=NATIVE, 04h=4:3, etc."

- id: other_adjust_lamp
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, etc. (see key code table)"

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
      description: "Target: 06h=Periphery Focus"
    - name: direction
      type: integer
      description: "Direction: 00h=Stop, 01h/02h/03h=Drive plus 1/0.5/0.25s, 7Fh=Drive plus, 81h=Drive minus, FDh/FEh/FFh=Drive minus 0.25/0.5/1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
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
      description: "Eco mode hex code: 00h=OFF, 01h=ON/AUTO ECO, 02h=ECO1, 03h=ECO2, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture-by-Picture Set
  kind: action
  params:
    - name: parameter
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value (depends on parameter type)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code
    - name: source
      type: integer
      description: "00h=Terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

- id: error_status_request
  label: Error Status Request
  kind: action
  params: []

- id: information_request
  label: Information Request
  kind: action
  params: []

- id: filter_usage_info_request
  label: Filter Usage Info Request
  kind: action
  params: []

- id: lamp_info_request_3
  label: Lamp Info Request 3
  kind: action
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Usage time, 04h=Remaining life"

- id: carbon_savings_request
  label: Carbon Savings Request
  kind: action
  params:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
- id: lens_control_request
  label: Lens Control Status Request
  kind: query
  params: []
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params: []
- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []
- id: gain_parameter_request
  label: Gain Parameter Request
  kind: query
  params: []
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
  params: []
- id: eco_mode_request
  label: Eco Mode Status Request
  kind: query
  params: []
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []
- id: lan_mac_address_request
  label: LAN MAC Address Request
  kind: query
  params: []
- id: pip_picture_by_picture_request
  label: PIP/Picture-by-Picture Status Request
  kind: query
  params: []
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
- id: command_response
  type: object
  properties:
    - name: err1
      type: integer
      description: Error code high byte
    - name: err2
      type: integer
      description: Error code low byte

- id: error_status
  type: object
  description: Error status response (009)
  properties:
    - name: data01
      type: object
      description: "Bit0=Cover error, Bit1=Temperature, Bit3=Fan error, Bit4=Fan error, Bit5=Power error, Bit6=Lamp off, Bit7=Lamp moratorium"
    - name: data02
      type: object
      description: "Bit0=Lamp time exceeded, Bit1=Formatter error, Bit2=Lamp 2 off, Bit3=Extended status"
    - name: data03
      type: object
      description: "Bit1=FPGA error, Bit2=Temperature sensor, Bit3=Lamp not present, Bit4=Lamp data error, Bit5=Mirror cover, Bit6=Lamp 2 moratorium, Bit7=Lamp 2 time exceeded"
    - name: data04
      type: object
      description: "Bit0=Lamp 2 not present, Bit1=Lamp 2 data error, Bit2=Temperature dust, Bit3=Foreign matter, Bit5=Ballast comm error, Bit6=Iris calibration, Bit7=Lens not installed"

- id: projector_info
  type: object
  description: Information response (037) — projector name, lamp/filter usage times

- id: running_status
  type: object
  description: Running status response (078-2)
  properties:
    - name: power_status
      type: enum
      values: [standby, power_on]
    - name: cooling_status
      type: enum
      values: [not_executed, during_execution]
    - name: operation_status
      type: enum
      values: [standby_sleep, standby_power_saving, power_on, cooling, standby_error, network_standby]

- id: input_status
  type: object
  description: Input status response (078-3)

- id: mute_status
  type: object
  description: Mute status response (078-4)
  properties:
    - name: picture_mute
      type: enum
      values: [off, on]
    - name: sound_mute
      type: enum
      values: [off, on]
    - name: onscreen_mute
      type: enum
      values: [off, on]

- id: model_name
  type: string
  description: Model name string (078-5)

- id: cover_status
  type: enum
  values: [normal, closed]
  description: Cover status (078-6)

- id: gain_parameter
  type: object
  description: Gain parameter response (060-1) — brightness, contrast, color, hue, sharpness, volume, lamp adjust

- id: lens_position
  type: object
  description: Lens position response (053-1) — adjustment range and current value

- id: eco_mode
  type: integer
  description: Eco mode value (097-8)

- id: projector_name
  type: string
  description: LAN projector name (097-45)

- id: mac_address
  type: string
  description: MAC address in hex format (097-155)

- id: pip_pbp_status
  type: object
  description: PIP/Picture-by-Picture status (097-198)

- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: Edge blending mode (097-243-1)

- id: serial_number
  type: string
  description: Serial number string (305-2)

- id: basic_info
  type: object
  description: Basic information response (305-3) — operation status, content displayed, signal type, mute states
```

## Variables
```yaml
# UNRESOLVED: variables that can be both set and queried are documented as action/feedback pairs.
# No discrete settings table with get/set semantics separate from actions.
# See Actions and Feedbacks sections for settable parameters.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism described in source.
# Device only responds to commands; no主动 push events documented.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "POWER ON command (015): While turning on the power, no other command can be accepted."
  - description: "POWER OFF command (016): While turning off the power (including cooling time), no other command can be accepted."
# UNRESOLVED: no explicit safety warnings for voltage, current, or physical interlock procedures in source.
```

## Notes
Standby mode requirements: Some models require specific standby modes to receive commands via serial or LAN. Supported serial standby modes: Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON. Supported LAN standby modes: Normal, NORMAL, NETWORK STANDBY, SLEEP, HTBaseT STANDBY, OFF, ON, STANDBY POWER ON. Supported standby modes vary by model — some only support certain modes for LAN vs serial control.

Command encoding: All commands use hex notation with parameters ID1 (control ID), ID2 (model code), CKS (checksum = low-order byte of sum of preceding bytes), and optional DATA fields. Response format includes ERR1/ERR2 error codes.

<!-- UNRESOLVED: complete list of aspect mode hex codes — appendix references values but some (like FULL) have multiple possible codes (09h or 10h) -->
<!-- UNRESOLVED: HDBaseT standby mode details not fully specified in source -->
<!-- UNRESOLVED: lamp information for dual-lamp operation requires model-specific validation -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_x461s_r_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T21:36:05.610Z
retrieved_at: 2026-04-26T21:36:05.610Z
last_checked_at: 2026-04-26T21:36:05.610Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T21:36:05.610Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions matched source commands; transport verified."
```

## Known Gaps

```yaml
[]
```
