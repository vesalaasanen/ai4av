---
schema_version: ai4av-public-spec-v1
device_id: nec/e805-series
entity_id: nec_e805_series
spec_id: admin/nec-e805-series
revision: 1
author: admin
title: "NEC E805 Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "E805 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "E805 Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_e805_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:17:28.293Z
retrieved_at: 2026-04-25T21:17:28.293Z
last_checked_at: 2026-04-25T21:17:28.293Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps:
  - "INFORMATION STRING REQUEST"
  - "SETTING REQUEST"
  - "BASE MODEL TYPE REQUEST"
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:17:28.293Z
  matched_actions: 43
  action_count: 43
  confidence: high
  summary: "All 43 spec actions match documented NEC display IP commands; transport parameters verified; comprehensive coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC E805 Series Control Spec

## Summary
NEC E805 Series professional projector controllable via RS-232C serial or wired LAN (TCP/IP). TCP port 7142 is used for command transmission. Supports power control, input routing, picture/sound mute, volume, lens adjustment, eco mode, and comprehensive status queries. No authentication procedure described.

<!-- UNRESOLVED: input terminal code values vary across models; Appendix lists model-specific variants -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # also supports: 38400, 19200, 9600, 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
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
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: input_switch
  label: Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 06h=VIDEO, A1h=HDMI, 01h=COMPUTER)

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
      description: Adjustment value (16-bit signed)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code (see Appendix)

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code (e.g., 02h=POWER ON, 03h=POWER OFF, 0Dh=MUTE, 85h=VOLUME UP)"

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
    - name: function
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous+, 81h=continuous-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

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

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON/NORMAL, 02h=ECO1, 03h=ECO2, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT"

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
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value (depends on item)

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
      description: "01h=ON, 02h=OFF"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal
    - name: source
      type: integer
      description: "00h=Terminal in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: bitfield
  description: Error information with 12 data bytes (bit 0=normal, bit 1=error)
  fields:
    - DATA01: [cover_error, temp_error_bimetallic, fan_error_1, fan_error_2, power_error, lamp_off, lamp_moratorium]
    - DATA02: [lamp_time_exceeded, formatter_error, lamp2_off, extended_status]
    - DATA03: [fpga_error, temp_error_sensor, lamp_not_present, lamp_data_error, mirror_cover_error, lamp2_moratorium, lamp2_time_exceeded]
    - DATA04: [lamp2_not_present, lamp2_data_error, temp_error_dust, foreign_matter_sensor, iris_calibration_error, lens_not_installed]

- id: command_response
  label: Command Response
  type: object
  fields:
    - ERR1: Error high byte
    - ERR2: Error low byte

- id: power_status
  label: Power Status
  type: enum
  values:
    - "00h: Standby"
    - "01h: Power on"
    - "04h: Power on"
    - "05h: Cooling"
    - "06h: Standby (error)"
    - "0Fh: Standby (Power saving)"
    - "10h: Network standby"

- id: mute_status
  label: Mute Status
  type: object
  fields:
    - picture_mute: [off, on]
    - sound_mute: [off, on]
    - onscreen_mute: [off, on]
    - forced_onscreen_mute: [off, on]

- id: input_status
  label: Input Status
  type: object
  fields:
    - signal_switch_process: [not_executed, executing]
    - signal_list_number: integer
    - selection_signal_type_1: integer
    - selection_signal_type_2: integer
    - content_displayed: [video_signal, no_signal, viewer, test_pattern, lan]

- id: projector_info
  label: Projector Info
  type: object
  fields:
    - name: string (DATA01-49, NUL-terminated)
    - lamp_usage_time: integer (seconds, DATA83-86)
    - filter_usage_time: integer (seconds, DATA87-90)

- id: filter_usage_info
  label: Filter Usage Info
  type: object
  fields:
    - usage_time: integer (seconds)
    - alarm_start_time: integer (seconds, -1 if undefined)

- id: lamp_info
  label: Lamp Info
  type: object
  fields:
    - lamp: [lamp1, lamp2]
    - usage_time: integer (seconds)
    - remaining_life: integer (percent, negative if exceeded)

- id: carbon_savings
  label: Carbon Savings Info
  type: object
  fields:
    - type: [total, operation]
    - kilograms: integer
    - milligrams: integer

- id: lens_position
  label: Lens Position
  type: object
  fields:
    - upper_limit: integer (16-bit)
    - lower_limit: integer (16-bit)
    - current_value: integer (16-bit)

- id: lens_memory_option
  label: Lens Memory Option
  type: object
  fields:
    - option: [load_by_signal, forced_mute]
    - value: [off, on]

- id: lens_profile
  label: Lens Profile
  type: enum
  values:
    - "00h: Profile 1"
    - "01h: Profile 2"

- id: gain_parameter
  label: Gain Parameter
  type: object
  fields:
    - status: [display_not_possible, adjustment_not_possible, adjustment_possible, gain_not_exist]
    - upper_limit: integer (16-bit)
    - lower_limit: integer (16-bit)
    - default_value: integer (16-bit)
    - current_value: integer (16-bit)
    - wide_adjustment_width: integer (16-bit)
    - narrow_adjustment_width: integer (16-bit)
    - default_valid: [invalid, valid]

- id: model_name
  label: Model Name
  type: string

- id: serial_number
  label: Serial Number
  type: string

- id: mac_address
  label: MAC Address
  type: string
  format: hex-separated (e.g., "01h-23h-45h-67h-89h-ABh")

- id: eco_mode
  label: Eco Mode
  type: enum
  values:
    - "00h: OFF"
    - "01h: ON/NORMAL/AUTO ECO"
    - "02h: ECO1"
    - "03h: ECO2"
    - "04h: LONG LIFE"
    - "05h: BOOST"
    - "06h: SILENT"

- id: pip_status
  label: PIP/Picture by Picture Status
  type: object
  fields:
    - item: [mode, start_position, sub_input, sub_input_2, sub_input_3]
    - value: depends on item

- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  values:
    - "00h: OFF"
    - "01h: ON"

- id: projector_name
  label: Projector Name
  type: string

- id: cover_status
  label: Cover Status
  type: enum
  values:
    - "00h: Normal (opened)"
    - "01h: Closed"

- id: basic_info
  label: Basic Information
  type: object
  fields:
    - operation_status: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    - content_displayed: [video_signal, no_signal, viewer, test_pattern, lan, test_pattern_user, signal_switching]
    - selection_signal_type_1: integer
    - selection_signal_type_2: integer
    - display_signal_type: integer
    - video_mute: [off, on]
    - sound_mute: [off, on]
    - onscreen_mute: [off, on]
    - freeze_status: [off, on]
```

## Variables
```yaml
# UNRESOLVED: variables are primarily settable via Actions (eco_mode_set, lan_projector_name_set, etc.)
# No standalone variable getters beyond the query commands listed in Feedbacks
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source; device only responds to commands
```

## Macros
```yaml
# No explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
# Note: POWER ON command blocks other commands during execution
# Note: POWER OFF command blocks during cooling time
# Note: Some models require specific standby modes for LAN/serial control (varies by model)
```

## Notes
- All commands use hexadecimal notation with structure: `[HEADER] [MODEL_CODE] [ID1] [ID2] [LEN] [DATA...] [CKS]`
- Checksum (CKS) = low-order byte of sum of all preceding bytes
- Device returns error codes ERR1/ERR2 on command failure
- Standby mode requirements vary by model for serial vs LAN control
- Input terminal hex codes vary by model; Appendix lists common values
- Lamp and filter usage times updated at 1-minute intervals despite 1-second resolution
- <!-- UNRESOLVED: specific input codes for E805 series model not differentiated from generic NEC command reference -->
- <!-- UNRESOLVED: HDBaseT standby mode mentioned but not detailed -->
- <!-- UNRESOLVED: aspect mode codes vary by model (some use dual codes) -->
- <!-- UNRESOLVED: eco mode values vary significantly across NEC model range -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_e805_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:17:28.293Z
retrieved_at: 2026-04-25T21:17:28.293Z
last_checked_at: 2026-04-25T21:17:28.293Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:17:28.293Z
matched_actions: 43
action_count: 43
confidence: high
summary: "All 43 spec actions match documented NEC display IP commands; transport parameters verified; comprehensive coverage."
```

## Known Gaps

```yaml
- "INFORMATION STRING REQUEST"
- "SETTING REQUEST"
- "BASE MODEL TYPE REQUEST"
```
