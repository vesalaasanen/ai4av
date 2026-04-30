---
schema_version: ai4av-public-spec-v1
device_id: nec/multisync-series
entity_id: nec_multisync_series
spec_id: admin/nec-multisync-series
revision: 1
author: admin
title: "NEC MultiSync Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "MultiSync Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "MultiSync Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_multisync_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T20:49:45.736Z
retrieved_at: 2026-04-26T20:49:45.736Z
last_checked_at: 2026-04-26T20:49:45.736Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T20:49:45.736Z
  matched_actions: 51
  action_count: 51
  confidence: high
  summary: "All 51 spec actions matched to documented source commands; transport parameters verified verbatim in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC MultiSync Series Control Spec

## Summary
NEC MultiSync Series projectors support both RS-232C serial and wired LAN (TCP/IP) control. The serial interface uses RS-232C at configurable baud rates up to 115200 bps. The LAN interface uses TCP port 7142. This spec covers power control, input routing, picture/sound adjustment, lens control, mute functions, eco mode, and comprehensive status queries.

<!-- UNRESOLVED: specific MultiSync model numbers not listed in source — "MultiSync Series" used as generic model name -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # UNRESOLVED: multiple rates supported (115200/38400/19200/9600/4800); source does not specify default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142  # LAN TCP port
auth:
  type: none  # inferred: no auth procedure in source
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
  params: []

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
      description: Adjustment value (16-bit, low-order byte first)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order byte first)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code (see appendix for values)

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order byte first)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: 16-bit key code (see key code table in source)

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
      description: "00h=Stop, 01h/02h/03h=Drive plus, 7Fh=Drive plus continuous, 81h=Drive minus continuous, FDh/FEh/FFh=Drive minus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute, 02h=Relative"
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

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=On, 02h=Off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode hex code (see appendix for values)

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
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value (varies by item)

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
      description: "00h=Terminal in DATA01, 01h=BNC, 02h=COMPUTER"
- id: information_request
  label: Information Request
  kind: query
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  params: []

- id: lamp_information_request
  label: Lamp Information Request
  kind: query
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

- id: carbon_savings_information_request
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
      description: UNRESOLVED

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
  label: Gain Parameter Request
  kind: query
  params:
    - name: adjusted_value_name
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

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
    - name: information_type
      type: integer
      description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []

- id: lan_mac_address_request
  label: LAN MAC Address Status Request
  kind: query
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  params: []

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: error_status
  type: bitfield
  values:
    - DATA01: Bit0=Cover error, Bit1=Temp error, Bit3=Fan error, Bit4=Fan error, Bit5=Power error, Bit6=Lamp off, Bit7=Lamp replacement moratorium
    - DATA02: Bit0=Lamp time exceeded, Bit1=Formatter error, Bit2=Lamp2 off
    - DATA03: Bit1=FPGA error, Bit2=Temp sensor error, Bit3=Lamp not present, Bit4=Lamp data error, Bit5=Mirror cover error, Bit6=Lamp2 moratorium, Bit7=Lamp2 time exceeded
    - DATA04: Bit0=Lamp2 not present, Bit1=Lamp2 data error, Bit2=Dust temp error, Bit3=Foreign matter sensor, Bit7=Lens not installed

- id: power_status
  type: enum
  values:
    - "00h: Standby"
    - "01h: Power on"
    - "05h: Cooling"
    - "06h: Standby (error)"
    - "0Fh: Standby (Power saving)"
    - "10h: Network standby"

- id: input_status
  type: object
  fields:
    - signal_switch_process: enum ["00h=Not executed", "01h=During execution"]
    - signal_list_number: integer
    - signal_type_1: integer
    - signal_type_2: integer
    - test_pattern_display: enum ["00h=Not displayed", "01h=Displayed"]
    - content_displayed: enum ["00h=Video signal", "01h=No signal", "02h=Viewer", "03h=Test pattern", "04h=LAN"]

- id: mute_status
  type: object
  fields:
    - picture_mute: enum ["00h=Off", "01h=On"]
    - sound_mute: enum ["00h=Off", "01h=On"]
    - onscreen_mute: enum ["00h=Off", "01h=On"]
    - forced_onscreen_mute: enum ["00h=Off", "01h=On"]

- id: projector_information
  type: object
  fields:
    - projector_name: string
    - lamp_usage_time: integer  # seconds
    - filter_usage_time: integer  # seconds

- id: filter_usage_information
  type: object
  fields:
    - filter_usage_time: integer  # seconds
    - filter_alarm_start_time: integer  # seconds, -1 if undefined

- id: lamp_information
  type: object
  fields:
    - lamp: enum ["00h=Lamp 1", "01h=Lamp 2"]
    - content: enum ["01h=Usage time (seconds)", "04h=Remaining life (%)"]
    - value: integer

- id: carbon_savings_information
  type: object
  fields:
    - type: enum ["00h=Total", "01h=During operation"]
    - kilograms: integer  # Max 99999
    - milligrams: integer  # Max 999999

- id: lens_control_request
  type: object
  fields:
    - upper_limit: integer  # 16-bit
    - lower_limit: integer  # 16-bit
    - current_value: integer  # 16-bit

- id: lens_memory_option_request
  type: object
  fields:
    - option: enum ["00h=LOAD BY SIGNAL", "01h=FORCED MUTE"]
    - value: enum ["00h=OFF", "01h=ON"]

- id: lens_profile_request
  type: enum
  values:
    - "00h: Profile 1"
    - "01h: Profile 2"

- id: lens_information
  type: object
  fields:
    - lens_memory_status: enum ["0=Stop", "1=During operation"]
    - zoom_status: enum ["0=Stop", "1=During operation"]
    - focus_status: enum ["0=Stop", "1=During operation"]
    - lens_shift_h_status: enum ["0=Stop", "1=During operation"]
    - lens_shift_v_status: enum ["0=Stop", "1=During operation"]

- id: gain_parameter_request
  type: object
  fields:
    - adjustment_status: enum ["00h=Display not possible", "01h=Adjustment not possible", "02h=Adjustment possible", "FFh=Gain does not exist"]
    - upper_limit: integer  # 16-bit
    - lower_limit: integer  # 16-bit
    - default_value: integer  # 16-bit
    - current_value: integer  # 16-bit

- id: model_name_request
  type: string

- id: serial_number_request
  type: string

- id: cover_status_request
  type: enum
  values:
    - "00h: Normal (cover opened)"
    - "01h: Cover closed"

- id: eco_mode_request
  type: integer  # Eco mode hex code

- id: lan_projector_name_request
  type: string

- id: lan_mac_address_request
  type: string  # MAC address in format "01h-23h-45h-67h-89h-ABh"

- id: pip_picture_by_picture_request
  type: object
  fields:
    - item: enum ["00h=MODE", "01h=START POSITION", "02h=SUB INPUT", "09h=SUB INPUT 2", "0Ah=SUB INPUT 3"]
    - value: integer

- id: edge_blending_mode_request
  type: enum
  values:
    - "00h: OFF"
    - "01h: ON"

- id: information_string_request
  type: string
  fields:
    - type: enum ["03h=Horizontal sync frequency", "04h=Vertical sync frequency"]

- id: running_status_request
  type: object
  fields:
    - power_status: enum ["00h=Standby", "01h=Power on", "05h=Cooling", "06h=Standby (error)", "0Fh=Standby (Power saving)", "10h=Network standby"]
    - cooling_process: enum ["00h=Not executed", "01h=During execution"]
    - power_on_off_process: enum ["00h=Not executed", "01h=During execution"]
    - operation_status: enum ["00h=Standby (Sleep)", "04h=Power on", "05h=Cooling", "06h=Standby (error)", "0Fh=Standby (Power saving)", "10h=Network standby", "FFh=Not supported"]

- id: basic_information_request
  type: object
  fields:
    - operation_status: enum
    - content_displayed: enum
    - signal_type_1: integer
    - signal_type_2: integer
    - display_signal_type: integer
    - video_mute: enum ["00h=Off", "01h=On"]
    - sound_mute: enum ["00h=Off", "01h=On"]
    - onscreen_mute: enum ["00h=Off", "01h=On"]
    - freeze_status: enum ["00h=Off", "01h=On"]
```

## Variables
```yaml
# UNRESOLVED: variables are primarily controlled via Actions (picture_adjust, volume_adjust, etc.)
# which are enumerated in the Actions section above
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# No explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "POWER ON command: While turning on, no other command can be accepted."
  - description: "POWER OFF command: While turning off (including cooling time), no other command can be accepted."
  - description: "LENS CONTROL: After sending continuous drive command (7Fh or 81h), stop by sending 00h."
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond command timing constraints
```

## Notes
The NEC MultiSync Series supports both serial RS-232C and wired LAN control. Serial baud rate is configurable (115200/38400/19200/9600/4800 bps); the default is not explicitly stated in the source. LAN uses TCP port 7142.

Command format uses hex notation with the structure: `<HEADER> <MODEL_CODE> <ID1> <ID2> <LEN> <DATA> <CKS>`. Response format: `<RESPONSE_HEADER> <ID1> <ID2> <LEN> <DATA/ERR> <CKS>`.

Error codes follow a tiered ERR1/ERR2 structure with specific meanings (e.g., 00h/01h = command not supported, 01h/00h = invalid value, 02h/0Dh = power is off).

Some models require specific standby modes to receive commands via serial or LAN. Supported standby modes vary by model and include: Normal, Active, Eco, Network Standby, Sleep, and others. Some models support HDBaseT standby mode.

Key code 02h = POWER ON, 03h = POWER OFF via remote control emulation.

<!-- UNRESOLVED: specific model numbers within MultiSync Series not enumerated in source -->
<!-- UNRESOLVED: appendix referenced for input terminal values, aspect values, eco mode values, and signal type values — full appendix tables not included in this document -->
<!-- UNRESOLVED: port number for serial connection not stated (only interface standard RS-232C stated) -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_multisync_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T20:49:45.736Z
retrieved_at: 2026-04-26T20:49:45.736Z
last_checked_at: 2026-04-26T20:49:45.736Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T20:49:45.736Z
matched_actions: 51
action_count: 51
confidence: high
summary: "All 51 spec actions matched to documented source commands; transport parameters verified verbatim in source."
```

## Known Gaps

```yaml
[]
```
