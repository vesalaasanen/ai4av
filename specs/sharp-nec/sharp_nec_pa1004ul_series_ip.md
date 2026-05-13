---
spec_id: admin/sharp-nec-pa1004ul-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp-NEC PA1004UL Series Control Spec"
manufacturer: Sharp-NEC
model_family: PA1004UL
aliases: []
compatible_with:
  manufacturers:
    - Sharp-NEC
  models:
    - PA1004UL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T10:09:32.506Z
last_checked_at: 2026-04-27T09:45:18.855Z
generated_at: 2026-04-27T09:45:18.855Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-27T09:45:18.855Z
  matched_actions: 54
  action_count: 54
  confidence: high
  summary: "All 54 spec actions match source commands with correct transport parameters; semantic-id convention aligns with protocol documentation."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Sharp-NEC PA1004UL Series Control Spec

## Summary
Laser projector supporting both serial (RS-232C) and wired TCP/IP control. TCP port 7142 is used for command communication. Supports power control, input routing, picture/sound mute, lens positioning, and comprehensive query commands for projector status.

<!-- UNRESOLVED: PA1004UL model not listed in appendix tables (input codes, aspect values, eco modes); values shown are from related NEC/NP projector families -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # 115200/38400/19200/9600/4800 bps selectable
  data_bits: 8
  parity: none
  stop_bits: 1
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
  label: Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal code (hex, e.g. 06h=VIDEO, 1Ah=HDMI)

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
      description: "00h=Absolute, 01h=Relative"
    - name: value
      type: integer
      description: 16-bit signed value

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute, 01h=Relative"
    - name: value
      type: integer
      description: 16-bit signed value

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect ratio code (model-dependent; see appendix)

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: "96hFFh=Lamp Adjust/Light Adjust"
    - name: mode
      type: integer
      description: "00h=Absolute, 01h=Relative"
    - name: value
      type: integer
      description: 16-bit signed value

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (e.g. 02h=POWER ON, 03h=POWER OFF, 0Dh=HELP)

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
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift(H), 03h=Lens Shift(V), 06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=Continuous+, 81h=Continuous-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_2
  label: Lens Control 2 (Absolute/Relative)
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift(H), 03h=Lens Shift(V), FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute, 02h=Relative"
    - name: value
      type: integer
      description: 16-bit value

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
    - name: target
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
    - name: operation
      type: integer
      description: "01h=Freeze On, 02h=Freeze Off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: Eco mode code (model-dependent)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_picture_by_picture_set
  label: PIP/Picture-by-Picture Set
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
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal code
    - name: value
      type: integer
      description: "00h=Specified terminal, 02h=COMPUTER"

- id: error_status_request
  label: Error Status Request
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: bitfield
  values:
    DATA01-Bit0: Cover error
    DATA01-Bit1: Temperature error (bi-metallic strip)
    DATA01-Bit2: None (fixed 0)
    DATA01-Bit3: Fan error
    DATA01-Bit4: Fan error
    DATA01-Bit5: Power error
    DATA01-Bit6: Lamp off or backlight off
    DATA01-Bit7: Lamp in replacement moratorium

- id: running_status
  label: Running Status
  type: struct
  fields:
    - name: power_status
      type: enum
      values: [Standby, PowerOn]
    - name: cooling_process
      type: enum
      values: [NotExecuted, DuringExecution]
    - name: power_on_off_process
      type: enum
      values: [NotExecuted, DuringExecution]
    - name: operation_status
      type: enum
      values: [StandbySleep, PowerOn, Cooling, StandbyError, StandbyPowerSaving, NetworkStandby]

- id: input_status
  label: Input Status
  type: struct
  fields:
    - name: signal_switch_process
      type: enum
      values: [NotExecuted, DuringExecution]
    - name: signal_list_number
      type: integer
    - name: selection_signal_type_1
      type: integer
    - name: selection_signal_type_2
      type: enum
      values: [COMPUTER, VIDEO, S-VIDEO, COMPONENT, BNC, DVI-D, HDMI, DisplayPort, VIEWER, Reserved, USB-A, NETWORK-LAN, HDBaseT, USB-B, APPS]

- id: mute_status
  label: Mute Status
  type: struct
  fields:
    - name: picture_mute
      type: enum
      values: [Off, On]
    - name: sound_mute
      type: enum
      values: [Off, On]
    - name: onscreen_mute
      type: enum
      values: [Off, On]
    - name: forced_onscreen_mute
      type: enum
      values: [Off, On]

- id: model_name
  label: Model Name
  type: string

- id: cover_status
  label: Cover Status
  type: enum
  values: [Normal, CoverClosed]

- id: information_request
  label: Information Request
  type: struct
  fields:
    - name: projector_name
      type: string
    - name: lamp_usage_time
      type: integer
      description: Seconds
    - name: filter_usage_time
      type: integer
      description: Seconds

- id: filter_usage_info
  label: Filter Usage Information
  type: struct
  fields:
    - name: filter_usage_time
      type: integer
      description: Seconds
    - name: filter_alarm_start_time
      type: integer
      description: Seconds (-1 if undefined)

- id: lamp_info_3
  label: Lamp Information 3
  type: struct
  fields:
    - name: target
      type: enum
      values: [Lamp1, Lamp2]
    - name: content
      type: enum
      values: [UsageTime, RemainingLife]
    - name: value
      type: integer

- id: carbon_savings_info
  label: Carbon Savings Information
  type: struct
  fields:
    - name: target
      type: enum
      values: [TotalCarbonSavings, CarbonSavingsDuringOperation]
    - name: carbon_savings_kg
      type: integer
      description: Kilograms (max 99999)
    - name: carbon_savings_mg
      type: integer
      description: Milligrams (max 999999)

- id: gain_parameter_request
  label: Gain Parameter Request 3
  type: struct
  fields:
    - name: status
      type: enum
      values: [DisplayNotPossible, AdjustmentNotPossible, AdjustmentPossible, GainDoesNotExist]
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: default_value
      type: integer
    - name: current_value
      type: integer

- id: setting_request
  label: Setting Request
  type: struct
  fields:
    - name: base_model_type
      type: integer
    - name: sound_function
      type: enum
      values: [NotAvailable, Available]
    - name: profile_number
      type: enum
      values: [NotAvailable, ClockFunction, SleepTimerFunction, ClockAndSleepTimer]

- id: information_string_request
  label: Information String Request
  type: struct
  fields:
    - name: info_type
      type: enum
      values: [HorizontalSyncFreq, VerticalSyncFreq]
    - name: string_length
      type: integer
    - name: string
      type: string

- id: eco_mode_request
  label: Eco Mode Request
  type: integer

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: string

- id: lan_mac_address_request
  label: LAN MAC Address Request 2
  type: string
  description: MAC address (hex format)

- id: pip_picture_by_picture_request
  label: PIP/Picture-by-Picture Request
  type: struct
  fields:
    - name: target
      type: enum
      values: [MODE, START_POSITION, SUB_INPUT, SUB_INPUT_2, SUB_INPUT_3]
    - name: value
      type: integer

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: enum
  values: [OFF, ON]

- id: serial_number_request
  label: Serial Number Request
  type: string

- id: basic_information_request
  label: Basic Information Request
  type: struct
  fields:
    - name: operation_status
      type: enum
      values: [Standby, PowerOn, Cooling, StandbyError, StandbyPowerSaving, NetworkStandby]
    - name: content_displayed
      type: enum
      values: [VideoSignal, NoSignal, ViewerDisplayed, TestPattern, LANDisplayed]
    - name: selection_signal_type_1
      type: integer
    - name: selection_signal_type_2
      type: enum
      values: [COMPUTER, VIDEO, S-VIDEO, COMPONENT, BNC, DVI-D, HDMI, DisplayPort, VIEWER, Reserved, USB-A, NETWORK-LAN, HDBaseT, USB-B, APPS]

- id: lens_control_request
  label: Lens Control Request
  type: struct
  fields:
    - name: target
      type: enum
      values: [Zoom, Focus, LensShiftH, LensShiftV]
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: current_value
      type: integer

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: struct
  fields:
    - name: target
      type: enum
      values: [LoadBySignal, ForcedMute]
    - name: value
      type: enum
      values: [OFF, ON]

- id: lens_profile_request
  label: Lens Profile Request
  type: enum
  values: [Profile1, Profile2]

- id: lens_info_request
  label: Lens Information Request
  type: bitfield
  description: Lens operation status bits

- id: base_model_type_request
  label: Base Model Type Request
  type: struct
  fields:
    - name: base_model_type
      type: integer
    - name: model_name
      type: string
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters outside of action commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
# Note: Some models cannot receive commands in standby mode (see standby mode appendix)
```

## Notes
Command format: 20h [ID1] [ID2] LEN [DATA...] CKS (hexadecimal). Response includes ERR1/ERR2 codes for error reporting. Checksum is low-order byte of sum of all preceding bytes. Some models cannot receive commands in standby mode — see appendix table for model-specific standby mode settings.
<!-- UNRESOLVED: PA1004UL-specific input terminal codes, aspect values, and eco mode values not in source appendix; LED status codes not documented; command timing/cooling time not specified -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T10:09:32.506Z
last_checked_at: 2026-04-27T09:45:18.855Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T09:45:18.855Z
matched_actions: 54
action_count: 54
confidence: high
summary: "All 54 spec actions match source commands with correct transport parameters; semantic-id convention aligns with protocol documentation."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
