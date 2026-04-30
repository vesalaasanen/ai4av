---
schema_version: ai4av-public-spec-v1
device_id: nec/p404-avt2-series
entity_id: nec_p404_avt2_series
spec_id: admin/nec-p404-avt2-series
revision: 1
author: admin
title: "NEC P404-AVT2 Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "P404-AVT2 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "P404-AVT2 Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_p404_avt2_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T21:16:53.687Z
retrieved_at: 2026-04-26T21:16:53.687Z
last_checked_at: 2026-04-26T21:16:53.687Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T21:16:53.687Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions match documented source commands with correct semantic intent; transport parameters verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC P404-AVT2 Series Control Spec

## Summary
NEC P404-AVT2 Series professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control. The projector uses a hexadecimal command protocol with checksum validation, control ID, and model code parameters. Supports power control, input routing, picture/sound mute, lens control, eco mode, and extensive query commands for status monitoring.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced throughout but not included in source — input terminal codes, aspect values, eco mode values, and signal type values are partially documented in the Appendix section of this source only. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # configurable: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142  # TCP port for LAN control
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # POWER ON / POWER OFF commands present
- routable        # INPUT SW CHANGE command present
- queryable      # INFORMATION REQUEST, STATUS REQUEST commands present
- levelable      # VOLUME ADJUST, PICTURE ADJUST commands present
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
      type: integer
      description: Input terminal hex code (e.g., 01h=COMPUTER, 06h=VIDEO, A1h=HDMI)

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
      description: Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)
    - name: mode
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: value
      type: integer
      description: Adjustment value

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: value
      type: integer
      description: Adjustment value

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect
      type: integer
      description: Aspect mode hex code

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: value
      type: integer
      description: Adjustment value

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (e.g., 02h=POWER ON, 03h=POWER OFF, 4Fh=COMPUTER1)

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
      description: Control target (06h=Periphery Focus)
    - name: direction
      type: integer
      description: Direction/action code (00h=Stop, 01h/02h/03h=plus, 7Fh=drive plus, 81h=drive minus, FDh/FEh/FFh=minus)

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: Command (FFh=Stop)
    - name: mode
      type: integer
      description: Mode (00h=absolute, 02h=relative)
    - name: value
      type: integer
      description: Adjustment value

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: Operation (00h=MOVE, 01h=STORE, 02h=RESET)

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: Operation (00h=MOVE, 01h=STORE, 02h=RESET)

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: integer
      description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)
    - name: value
      type: integer
      description: Setting value (00h=OFF, 01h=ON)

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: Profile number (00h=Profile 1, 01h=Profile 2)

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode hex code

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
      description: Item (00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)
    - name: value
      type: integer
      description: Setting value

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Mode (00h=OFF, 01h=ON)

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: State (01h=On, 02h=Off)

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal
    - name: source
      type: integer
      description: Audio source (00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER)
- id: error_status_request
  label: Error Status Request
  kind: query
  params: []

- id: information_request_cmd
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
  params: []

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  params: []

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
- id: error_status
  label: Error Status
  type: bitfield
  description: Error information in DATA01-DATA12 bits

- id: power_state
  label: Power State
  type: enum
  values:
    - "00h: Standby"
    - "01h: Power on"
    - "05h: Cooling"
    - "06h: Standby (error)"
    - "0Fh: Standby (Power saving)"
    - "10h: Network standby"

- id: running_status
  label: Running Status
  type: object
  properties:
    - power_status
    - cooling_process
    - power_on_off_process
    - operation_status

- id: input_status
  label: Input Status
  type: object
  properties:
    - signal_switch_process
    - signal_list_number
    - selection_signal_type_1
    - selection_signal_type_2
    - content_displayed

- id: mute_status
  label: Mute Status
  type: object
  properties:
    - picture_mute
    - sound_mute
    - onscreen_mute
    - forced_onscreen_mute
    - onscreen_display

- id: model_name
  label: Model Name
  type: string

- id: cover_status
  label: Cover Status
  type: enum
  values:
    - "00h: Normal (cover opened)"
    - "01h: Cover closed"

- id: information_request
  label: Information Request
  type: object
  properties:
    - projector_name
    - lamp_usage_time
    - filter_usage_time

- id: filter_usage_info
  label: Filter Usage Information
  type: object
  properties:
    - filter_usage_time
    - filter_alarm_start_time

- id: lamp_info
  label: Lamp Information
  type: object
  properties:
    - lamp_usage_time
    - lamp_remaining_life

- id: carbon_savings_info
  label: Carbon Savings Information
  type: object
  properties:
    - carbon_savings_kg
    - carbon_savings_mg

- id: gain_parameter
  label: Gain Parameter
  type: object
  description: Picture, volume, and backlight adjustment values

- id: lens_position
  label: Lens Position
  type: object
  description: Adjusted values of lens position with upper/lower limits

- id: lens_memory_option
  label: Lens Memory Option
  type: object
  properties:
    - option
    - setting_value

- id: lens_profile
  label: Lens Profile
  type: enum
  values:
    - "00h: Profile 1"
    - "01h: Profile 2"

- id: lens_info
  label: Lens Information
  type: object
  description: Lens memory, zoom, focus, lens shift status bits

- id: eco_mode
  label: Eco Mode
  type: enum
  values:
    - "00h: OFF"
    - "01h: Normal/AUTO ECO/ON"
    - "02h: ECO1/ECO"
    - "03h: ECO2"
    - "04h: LONG LIFE"
    - "05h: BOOST"
    - "06h: SILENT"

- id: lan_projector_name
  label: LAN Projector Name
  type: string

- id: lan_mac_address
  label: LAN MAC Address
  type: string

- id: pip_picture_by_picture
  label: PIP/Picture by Picture
  type: object
  properties:
    - mode
    - start_position
    - sub_input

- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  values:
    - "00h: OFF"
    - "01h: ON"

- id: information_string
  label: Information String
  type: object
  properties:
    - horizontal_sync_frequency
    - vertical_sync_frequency

- id: serial_number
  label: Serial Number
  type: string

- id: basic_info
  label: Basic Information
  type: object
  description: Operation status, content displayed, signal type, mute states, freeze status

- id: base_model_type
  label: Base Model Type
  type: string
```

## Variables
```yaml
# UNRESOLVED: variables that are settable but not discrete actions are covered
# by the action parameters above. No separate variables section applies.
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
  - description: "POWER ON command: While turning on power, no other command can be accepted."
  - description: "POWER OFF command: While turning off power (including cooling time), no other command can be accepted."
  - description: "Lens control: After sending drive command (7Fh or 81h), stop by sending 00h."
# UNRESOLVED: no explicit safety warnings for voltage, current, or power specifications in source
```

## Notes
Command protocol structure: Each command begins with a packet type byte, followed by command code, control ID (ID1, ID2), data length, optional data bytes, and checksum (CKS). Responses follow similar structure with response type byte.

Control ID must match the projector's configured control ID. Model code (ID2) varies by model.

Checksum calculation: Sum all bytes preceding checksum, use low-order byte of result.

Some commands require specific standby modes to be set on the projector before they can be accepted via serial or LAN. Supported standby modes vary by model.

<!-- UNRESOLVED: Appendix values (input terminal codes beyond basic set, aspect values, eco mode values, signal type values) referenced throughout command descriptions but only partially enumerated in this source document. -->
<!-- UNRESOLVED: HDBaseT control mentioned in source but no explicit HDBaseT command set documented. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_p404_avt2_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T21:16:53.687Z
retrieved_at: 2026-04-26T21:16:53.687Z
last_checked_at: 2026-04-26T21:16:53.687Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T21:16:53.687Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions match documented source commands with correct semantic intent; transport parameters verified verbatim."
```

## Known Gaps

```yaml
[]
```
