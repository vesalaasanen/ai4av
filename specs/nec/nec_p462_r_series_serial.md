---
spec_id: admin/nec-p462-r-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC P462-R Series Control Spec"
manufacturer: NEC
model_family: "P462-R Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "P462-R Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:29:44.540Z
generated_at: 2026-04-25T21:29:44.540Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:29:44.540Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions match source commands exactly; transport parameters verified verbatim; complete command coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC P462-R Series Control Spec

## Summary
NEC P462-R Series professional projector controllable via RS-232C serial and wired TCP/IP. The document specifies bidirectional hex-encoded commands with checksum validation, supporting power control, input routing, picture/sound adjustment, lens control, mute functions, freeze, eco mode, and comprehensive status queries. Standby mode requirements differ between serial and LAN control.

<!-- UNRESOLVED: some models require specific standby modes for command reception; full compatibility matrix not provided -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port for LAN control
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins present in pinout but flow control mode not explicitly documented
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
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value (low-order then high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: "Aspect code: 00h=AUTO, 01h=WIDE ZOOM, 02h=16:9, 03h=NATIVE, 04h=4:3, etc."

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=Light Adjust"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: 16-bit key code from remote control key code table

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
    - name: action
      type: integer
      description: "00h=Stop, 01h=Drive+1s, 02h=Drive+0.5s, 03h=Drive+0.25s, 7Fh=Drive+, 81h=Drive-, Fdh=Drive-0.25s, FEh=Drive-0.5s, FFh=Drive-1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: action
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: 16-bit position value

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
      description: "01h=Freeze on, 02h=Freeze off"

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
      description: Setting value per target

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
      description: Audio input terminal code
    - name: source
      type: integer
      description: "00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"

- id: error_status_request
  label: Error Status Request
  kind: action
  params: []

- id: information_request
  label: Information Request
  kind: query
  params: []

- id: filter_usage_info_request
  label: Filter Usage Info Request
  kind: query
  params: []

- id: lamp_info_request_3
  label: Lamp Info Request 3
  kind: query
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=usage time, 04h=remaining life"

- id: carbon_savings_request
  label: Carbon Savings Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=Total, 01h=During operation"

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

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []

- id: lens_info_request
  label: Lens Info Request
  kind: query
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: parameter
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp Adjust"

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

- id: info_string_request
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
  label: LAN MAC Address Request
  kind: query
  params: []

- id: pip_picture_by_picture_request
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

- id: basic_info_request
  label: Basic Info Request
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: command_response
  description: Hex response with ERR1/ERR2 status. A0h/22h/23h prefix varies by command class.
  values: []
  # Success: ERR1=00h, ERR2=00h
  # ERR1/ERR2 combinations per error code table

- id: error_status
  type: bitfield
  description: 12-byte error information bitfield from command 009
  # DATA01: Bit0=Cover, Bit1=Temp, Bit4=Fan, Bit5=Power, Bit6=Lamp, Bit7=Lamp moratorium
  # DATA02-DATA04: Additional error bits for lamp2, formatter, temp sensor, dust, etc.
  # DATA09: interlock switch, slave CPU, formatter errors

- id: power_state
  type: enum
  values: [standby, power_on, cooling]
  # DATA03 from 078-2: 00h=Standby, 01h=Power on, 05h=Cooling

- id: mute_status
  type: object
  properties:
    picture_mute: [off, on]
    sound_mute: [off, on]
    onscreen_mute: [off, on]
    forced_onscreen_mute: [off, on]
    onscreen_display: [not_displayed, displayed]

- id: input_status
  type: object
  properties:
    signal_switch_process: [not_executed, in_progress]
    signal_list_number: integer
    signal_type: [computer, video, s_video, component, hdmi, dvi_d, displayport, viewer, lan, hdbaset, sdi]
    content_displayed: [video_signal, no_signal, viewer, test_pattern, lan_displayed]

- id: lamp_info
  type: object
  properties:
    lamp_number: [1, 2]
    usage_time_seconds: integer
    remaining_life_percent: integer  # negative if deadline exceeded

- id: filter_info
  type: object
  properties:
    usage_time_seconds: integer
    alarm_start_time_seconds: integer  # -1 if undefined

- id: carbon_savings
  type: object
  properties:
    target: [total, during_operation]
    kilograms: integer  # max 99999
    milligrams: integer  # max 999999

- id: projector_info
  type: object
  properties:
    name: string
    lamp_usage_time_seconds: integer
    filter_usage_time_seconds: integer

- id: model_name
  type: string

- id: serial_number
  type: string

- id: mac_address
  type: string  # format: XXh-XXh-XXh-XXh-XXh-XXh

- id: gain_parameters
  type: object
  description: Response from 060-1 gain parameter request
  properties:
    status: [display_not_possible, adjustment_not_possible, adjustment_possible, not_exists]
    upper_limit: integer
    lower_limit: integer
    default_value: integer
    current_value: integer
    wide_step: integer
    narrow_step: integer
    default_valid: [invalid, valid]
```

## Variables
```yaml
# UNRESOLVED: many settable parameters exist (brightness, contrast, volume, aspect, eco mode,
# pip settings, edge blending, lens memory options, projector name) but structured as
# action params rather than standalone variables. Variable extraction would require
# separating settable state from command payloads.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented; projector only emits
# responses to sent commands.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: power on/off commands block other commands during execution (cooling period).
# Specific standby mode requirements vary by model for serial vs LAN control but are not
# fully enumerated in source. Safety-critical interlock procedures not explicitly stated.
```

## Notes
- All commands use 6-byte header + variable data + checksum structure (20h prefix for queries, 02h/03h for actions)
- Checksum: low-order byte of sum of all preceding bytes
- Control ID (ID1) and Model Code (ID2) must match projector settings
- Commands 015 (POWER ON) and 016 (POWER OFF) block subsequent commands during execution/cooling
- Lamp and filter usage times update at 1-minute intervals despite 1-second query granularity
- Input terminal hex codes vary by model; appendix lists common values
- Aspect and Eco mode hex codes vary by model; appendix lists common values
<!-- UNRESOLVED: full input terminal code table per model not provided in appendix -->
<!-- UNRESOLVED: full aspect code mapping per model not provided -->
<!-- UNRESOLVED: full eco mode code mapping per model not provided -->
<!-- UNRESOLVED: full selection signal type values per model not provided -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:29:44.540Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:29:44.540Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions match source commands exactly; transport parameters verified verbatim; complete command coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
