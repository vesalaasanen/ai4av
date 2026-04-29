---
schema_version: ai4av-public-spec-v1
device_id: nec/x462s-series
entity_id: nec_x462s_series
spec_id: admin/nec-x462s-series
revision: 1
author: admin
title: "NEC X462S Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "X462S Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "X462S Series"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_x462s_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:35:49.103Z
retrieved_at: 2026-04-25T21:35:49.103Z
last_checked_at: 2026-04-25T21:35:49.103Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:35:49.103Z
  matched_actions: 52
  action_count: 52
  confidence: high
  summary: "All 52 spec actions matched cleanly against source commands; transport parameters verified; comprehensive coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X462S Series Control Spec

## Summary
NEC X462S Series projector supporting both RS-232C serial and wired LAN (TCP/IP) control interfaces. Serial communication uses RS-232C at configurable baud rates up to 115200 bps. LAN control uses TCP port 7142. The projector supports power control, input routing, picture/sound muting, lens positioning, and comprehensive query commands for status monitoring.

<!-- UNRESOLVED: exact model variant within X462S Series not specified; some commands reference two-lamp models not confirmed for this series -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port for LAN control, stated in source
serial:
  baud_rate: 115200  # highest baud rate listed; source lists 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated; RTS/CTS loopback noted in pinout
auth:
  type: none  # inferred: no authentication procedure described in source
```

## Traits
```yaml
- powerable       # POWER ON (015) and POWER OFF (016) commands present
- routable        # INPUT SW CHANGE (018) command present
- queryable       # multiple information request commands (037, 078 series, 305 series)
- levelable       # VOLUME ADJUST (030-2), PICTURE ADJUST (030-1), LAMP ADJUST (030-15)
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on projector power. No other command accepted during power-on sequence.

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off projector power. No other command accepted during cooling.

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 01h=COMPUTER, 06h=VIDEO, 1Ah=HDMI, 20h=LAN)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  description: Turns picture mute on. Cleared by input switch or video signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  description: Turns sound mute on. Cleared by input switch, video signal switch, or volume adjust.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  description: Turns onscreen mute on. Cleared by input switch or video signal switch.

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
      description: "0=absolute value, 1=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order then high-order)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=absolute value, 1=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code (00h=AUTO, 01h=WIDE ZOOM, 02h=16:9, etc.)

- id: other_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=absolute value, 1=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: 16-bit key code (see key code table)

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
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous+, 81h=continuous-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: stop
      type: integer
      description: "FFh=Stop (others ignored)"
    - name: mode
      type: integer
      description: "0=absolute, 2=relative"
    - name: value
      type: integer
      description: 16-bit adjustment value

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
      description: Eco mode hex code (00h=OFF, 01h=AUTO ECO, 02h=ECO1, etc.)

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
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value

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
      description: Input terminal code
    - name: source
      type: integer
      description: "00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  type: bitfield
  description: Returns error information. ERR1/ERR2 codes for command-level errors.

- id: response_with_data
  label: Response with Data
  type: binary
  description: Data-returning commands respond with data portion appended.

- id: power_state_query
  label: Running Status Request
  type: enum
  values: [Standby, Power_on, Cooling, Standby_error, Standby_power_saving, Network_standby]

- id: input_status_query
  label: Input Status Request
  type: object
  description: Returns signal switch status, signal list number, selection signal type, test pattern status, content displayed.

- id: mute_status_query
  label: Mute Status Request
  type: object
  properties:
    picture_mute: [off, on]
    sound_mute: [off, on]
    onscreen_mute: [off, on]
    forced_onscreen_mute: [off, on]
    onscreen_display: [not_displayed, displayed]

- id: model_name_query
  label: Model Name Request
  type: string

- id: cover_status_query
  label: Cover Status Request
  type: enum
  values: [Normal_cover_opened, Cover_closed]

- id: information_request
  label: Information Request
  type: object
  description: Returns projector name, lamp usage time (seconds), filter usage time (seconds).

- id: filter_usage_info
  label: Filter Usage Information Request
  type: object
  description: Returns filter usage time (seconds), filter alarm start time (seconds).

- id: lamp_info_request_3
  label: Lamp Information Request 3
  type: object
  description: Returns lamp usage time (seconds) or lamp remaining life (%). Data01 selects lamp 1 or 2.

- id: carbon_savings_info
  label: Carbon Savings Information Request
  type: object
  description: Returns total carbon savings or carbon savings during operation (kg and mg).

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  type: object
  description: Returns adjusted values for picture (brightness, contrast, color, hue, sharpness), volume, lamp.

- id: setting_request
  label: Setting Request
  type: object
  description: Returns base model type, sound function availability, profile number, clock/sleep timer availability.

- id: lens_control_request
  label: Lens Control Request
  type: object
  description: Returns upper/lower adjustment limits and current lens position values.

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: object
  description: Returns LOAD BY SIGNAL and FORCED MUTE setting values.

- id: lens_profile_request
  label: Lens Profile Request
  type: enum
  values: [Profile_1, Profile_2]

- id: eco_mode_request
  label: Eco Mode Request
  type: integer

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: string

- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  type: string
  description: Returns 6-byte MAC address.

- id: pip_picture_by_picture_request
  label: PIP/Picture-by-Picture Request
  type: object
  description: Returns mode, start position, or sub input settings.

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: enum
  values: [OFF, ON]

- id: information_string_request
  label: Information String Request
  type: object
  description: Returns horizontal/vertical sync frequency as labeled strings.

- id: serial_number_request
  label: Serial Number Request
  type: string

- id: base_model_type_request
  label: Base Model Type Request
  type: object
  description: Returns base model type code and model name string.

- id: basic_information_request
  label: Basic Information Request
  type: object
  description: Returns operation status, content displayed, signal types, mute states, freeze status.
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond actions; all parameters are action arguments
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications described; device only responds to commands
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
The X462S Series supports both serial and LAN control simultaneously. Standby mode must be correctly configured for the control method used — some models require specific standby modes (Normal, Eco, Network Standby, Sleep, etc.) to receive commands via serial or LAN. Two-lamp operations are referenced in some commands (037-4, 053-7) but may not apply to all X462S models. Commands 078-3 and 305-3 reference an Appendix for supplementary values not included in this source document.
<!-- UNRESOLVED: input terminal codes 1Ah and 03h both listed for COMPUTER3 — model-dependent; Appendix values referenced but not included in source -->
<!-- UNRESOLVED: exact baud rate selection method not documented (assumed to be set via projector menu) -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_x462s_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:35:49.103Z
retrieved_at: 2026-04-25T21:35:49.103Z
last_checked_at: 2026-04-25T21:35:49.103Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:35:49.103Z
matched_actions: 52
action_count: 52
confidence: high
summary: "All 52 spec actions matched cleanly against source commands; transport parameters verified; comprehensive coverage confirmed."
```

## Known Gaps

```yaml
[]
```
