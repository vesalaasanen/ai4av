---
spec_id: admin/rotel-rap1580
schema_version: ai4av-public-spec-v1
revision: 2
title: "Rotel RAP-1580 Control Spec"
manufacturer: Rotel
model_family: RAP-1580
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RAP-1580
    - RAP-1580MKII
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RAP1580%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
  - https://www.rotel.com/product/rap-1580
  - https://www.rotel.com/control-system-resources
  - "https://www.rotel.com/sites/default/files/product/ir/RAP1580%20HEX.pdf"
retrieved_at: 2026-05-22T17:57:41.575Z
last_checked_at: 2026-06-09T07:16:10.877Z
generated_at: 2026-06-09T07:16:10.877Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "dimmer return format dimmer=+/-##! — sign handling not formally specified in source"
  - "source does not define discrete variable entries; trims/dimmer are"
  - "device does not send unsolicited notifications per source"
  - "no multi-step sequences described in source"
  - "factory_default_on! resets unit; source does not document"
  - "dimmer return format dimmer=+/-##! — not confirmed as signed integer or separate sign field"
verification:
  verdict: verified
  checked_at: 2026-06-09T07:16:10.877Z
  matched_actions: 77
  action_count: 77
  confidence: medium
  summary: "All 77 spec actions match source command tokens literally; transport values (port 9596, baud 115200, no flow control) confirmed; complete coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-08
---

# Rotel RAP-1580 Control Spec

## Summary
Surround amplified processor with RS-232 and IP control interfaces. ASCII-based command protocol with `!` terminator. Each command/response is a single line; no CR/LF after `!`. Covers power, volume, source selection, source transport, menu navigation, DSP mode, per-channel level trims, display dimmer, and factory reset.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: dimmer return format dimmer=+/-##! — sign handling not formally specified in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9596
serial:
  baud_rate: 115200
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
# POWER & VOLUME
- id: power_on
  label: Power On
  kind: action
  command: "power_on!"
  params: []
- id: power_off
  label: Power Off
  kind: action
  command: "power_off!"
  params: []
- id: power_toggle
  label: Power Toggle
  kind: action
  command: "power_toggle!"
  params: []
- id: volume_up
  label: Volume Up
  kind: action
  command: "volume_up!"
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  command: "volume_down!"
  params: []
- id: volume_set
  label: Set Volume
  kind: action
  command: "volume_nn!"
  params:
    - name: level
      type: integer
      description: Volume level 00 (min) - 96 (max)

# MUTE
- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "mute!"
  params: []
- id: mute_on
  label: Mute On
  kind: action
  command: "mute_on!"
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  command: "mute_off!"
  params: []

# SOURCE SELECTION
- id: source_cd
  label: Source CD
  kind: action
  command: "cd!"
  params: []
- id: source_video1
  label: Source Video 1
  kind: action
  command: "video1!"
  params: []
- id: source_video2
  label: Source Video 2
  kind: action
  command: "video2!"
  params: []
- id: source_video3
  label: Source Video 3
  kind: action
  command: "video3!"
  params: []
- id: source_video4
  label: Source Video 4
  kind: action
  command: "video4!"
  params: []
- id: source_video5
  label: Source Video 5
  kind: action
  command: "video5!"
  params: []
- id: source_video6
  label: Source Video 6
  kind: action
  command: "video6!"
  params: []
- id: source_video7
  label: Source Video 7
  kind: action
  command: "video7!"
  params: []
- id: source_video8
  label: Source Video 8
  kind: action
  command: "video8!"
  params: []
- id: source_tuner
  label: Source Tuner
  kind: action
  command: "tuner!"
  params: []
- id: source_phono
  label: Source Phono
  kind: action
  command: "phono!"
  params: []
- id: source_usb
  label: Source Front USB
  kind: action
  command: "usb!"
  params: []
- id: source_pc_usb
  label: Source PC-USB
  kind: action
  command: "pc_usb!"
  params: []
- id: source_bal_xlr
  label: Source XLR
  kind: action
  command: "bal_xlr!"
  params: []
- id: source_bluetooth
  label: Source Bluetooth
  kind: action
  command: "bluetooth!"
  params: []
- id: source_multi_input
  label: Source Multi Input
  kind: action
  command: "multi_input!"
  params: []

# SOURCE TRANSPORT
- id: play
  label: Play
  kind: action
  command: "play!"
  params: []
- id: stop
  label: Stop
  kind: action
  command: "stop!"
  params: []
- id: pause
  label: Pause
  kind: action
  command: "pause!"
  params: []
- id: track_fwd
  label: Track Forward / Tune Up
  kind: action
  command: "track_fwd!"
  params: []
- id: track_back
  label: Track Backward / Tune Down
  kind: action
  command: "track_back!"
  params: []

# MENU NAVIGATION
- id: menu
  label: Display Menu
  kind: action
  command: "menu!"
  params: []
- id: exit
  label: Exit Key
  kind: action
  command: "exit!"
  params: []
- id: cursor_up
  label: Cursor Up
  kind: action
  command: "up!"
  params: []
- id: cursor_down
  label: Cursor Down
  kind: action
  command: "down!"
  params: []
- id: cursor_left
  label: Cursor Left
  kind: action
  command: "left!"
  params: []
- id: cursor_right
  label: Cursor Right
  kind: action
  command: "right!"
  params: []
- id: enter
  label: Enter Key
  kind: action
  command: "enter!"
  params: []

# DSP MODE
- id: dsp_2channel
  label: DSP 2 Channel
  kind: action
  command: "2channel!"
  params: []
- id: dsp_3channel
  label: DSP 3 Channel Stereo
  kind: action
  command: "3channel!"
  params: []
- id: dsp_5channel
  label: DSP 5 Channel Stereo
  kind: action
  command: "5channel!"
  params: []
- id: dsp_7channel
  label: DSP 7 Channel Stereo
  kind: action
  command: "7channel!"
  params: []
- id: dsp_9channel
  label: DSP 9 Channel Stereo
  kind: action
  command: "9channel!"
  params: []
- id: dsp_11channel
  label: DSP 11 Channel Stereo
  kind: action
  command: "11channel!"
  params: []
- id: dsp_dolby_atmos
  label: DSP Dolby Atmos
  kind: action
  command: "dolby_atmos!"
  params: []
- id: dsp_dts_neural
  label: DSP DTS Neural:X
  kind: action
  command: "dts_neural!"
  params: []
- id: dsp_bypass
  label: DSP Analog Bypass
  kind: action
  command: "bypass!"
  params: []
- id: dsp_surround_next
  label: DSP Surround Next
  kind: action
  command: "surround_next!"
  params: []

# LEVEL TRIMS
- id: subwoofer_trim_up
  label: Subwoofer Trim Up (+0.5dB)
  kind: action
  command: "subwoofer_up!"
  params: []
- id: subwoofer_trim_down
  label: Subwoofer Trim Down (-0.5dB)
  kind: action
  command: "subwoofer_down!"
  params: []
- id: center_trim_up
  label: Center Trim Up (+0.5dB)
  kind: action
  command: "center_up!"
  params: []
- id: center_trim_down
  label: Center Trim Down (-0.5dB)
  kind: action
  command: "center_down!"
  params: []
- id: surround_right_trim_up
  label: Surround Right Trim Up (+0.5dB)
  kind: action
  command: "surround_right_up!"
  params: []
- id: surround_right_trim_down
  label: Surround Right Trim Down (-0.5dB)
  kind: action
  command: "surround_right_down!"
  params: []
- id: surround_left_trim_up
  label: Surround Left Trim Up (+0.5dB)
  kind: action
  command: "surround_left_up!"
  params: []
- id: surround_left_trim_down
  label: Surround Left Trim Down (-0.5dB)
  kind: action
  command: "surround_left_down!"
  params: []
- id: center_back_right_trim_up
  label: Center Back Right Trim Up (+0.5dB)
  kind: action
  command: "center_back_right_up!"
  params: []
- id: center_back_right_trim_down
  label: Center Back Right Trim Down (-0.5dB)
  kind: action
  command: "center_back_right_down!"
  params: []
- id: center_back_left_trim_up
  label: Center Back Left Trim Up (+0.5dB)
  kind: action
  command: "center_back_left_up!"
  params: []
- id: center_back_left_trim_down
  label: Center Back Left Trim Down (-0.5dB)
  kind: action
  command: "center_back_left_down!"
  params: []
- id: ceiling_front_right_trim_up
  label: Ceiling Front Right Trim Up (+0.5dB)
  kind: action
  command: "ceiling_front_right_up!"
  params: []
- id: ceiling_front_right_trim_down
  label: Ceiling Front Right Trim Down (-0.5dB)
  kind: action
  command: "ceiling_front_right_down!"
  params: []
- id: ceiling_front_left_trim_up
  label: Ceiling Front Left Trim Up (+0.5dB)
  kind: action
  command: "ceiling_front_left_up!"
  params: []
- id: ceiling_front_left_trim_down
  label: Ceiling Front Left Trim Down (-0.5dB)
  kind: action
  command: "ceiling_front_left_down!"
  params: []
- id: ceiling_rear_right_trim_up
  label: Ceiling Rear Right Trim Up (+0.5dB)
  kind: action
  command: "ceiling_rear_right_up!"
  params: []
- id: ceiling_rear_right_trim_down
  label: Ceiling Rear Right Trim Down (-0.5dB)
  kind: action
  command: "ceiling_rear_right_down!"
  params: []
- id: ceiling_rear_left_trim_up
  label: Ceiling Rear Left Trim Up (+0.5dB)
  kind: action
  command: "ceiling_rear_left_up!"
  params: []
- id: ceiling_rear_left_trim_down
  label: Ceiling Rear Left Trim Down (-0.5dB)
  kind: action
  command: "ceiling_rear_left_down!"
  params: []

# DIMMER
- id: dimmer_toggle
  label: Dimmer Toggle (+/-10)
  kind: action
  command: "dimmer!"
  params: []
- id: dimmer_neutral
  label: Dimmer Neutral (0)
  kind: action
  command: "dimmer_0!"
  params: []
- id: dimmer_set_negative
  label: Dimmer Set Negative
  kind: action
  command: "dimmer_-n!"
  params:
    - name: level
      type: integer
      description: Dimmer level 1-10 (set to -n)
- id: dimmer_set_positive
  label: Dimmer Set Positive
  kind: action
  command: "dimmer_+n!"
  params:
    - name: level
      type: integer
      description: Dimmer level 1-10 (set to +n)

# MAINTENANCE
- id: factory_default
  label: Factory Default Reset
  kind: action
  command: "factory_default_on!"
  params: []

# QUERIES
- id: get_power_status
  label: Get Power Status
  kind: query
  command: "get_current_power!"
  params: []
- id: get_current_source
  label: Get Current Source
  kind: query
  command: "get_current_source!"
  params: []
- id: get_volume
  label: Get Volume
  kind: query
  command: "get_volume!"
  params: []
- id: get_mute_status
  label: Get Mute Status
  kind: query
  command: "get_mute_status!"
  params: []
- id: get_dsp_mode
  label: Get DSP Mode
  kind: query
  command: "get_dsp_mode!"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - on
    - standby
- id: source_state
  label: Current Source
  type: enum
  values:
    - cd
    - coax1
    - coax2
    - coax3
    - opt1
    - opt2
    - opt3
    - tuner
    - phono
    - usb
    - pc_usb
    - video1
    - video2
    - video3
    - video4
    - video5
    - video6
    - video7
    - video8
    - bluetooth
    - bal_xlr
    - multi_input
- id: volume_state
  label: Volume Level
  type: integer
  range: [0, 96]
- id: mute_state
  label: Mute State
  type: enum
  values:
    - on
    - off
- id: dsp_mode_state
  label: DSP Mode
  type: enum
  values:
    - stereo
    - dolby_3_stereo
    - 5_channel_stereo
    - 7_channel_stereo
    - 9_channel_stereo
    - 11_channel_stereo
    - dolby_atmos_surround
    - dts_neural:x
    - analog_bypass
    - source_dependent
- id: subwoofer_level
  label: Subwoofer Level Trim
  type: number
  unit: dB
- id: center_level
  label: Center Level Trim
  type: number
  unit: dB
- id: surround_right_level
  label: Surround Right Level Trim
  type: number
  unit: dB
- id: surround_left_level
  label: Surround Left Level Trim
  type: number
  unit: dB
- id: center_back_right_level
  label: Center Back Right Level Trim
  type: number
  unit: dB
- id: center_back_left_level
  label: Center Back Left Level Trim
  type: number
  unit: dB
- id: ceiling_front_right_level
  label: Ceiling Front Right Level Trim
  type: number
  unit: dB
- id: ceiling_front_left_level
  label: Ceiling Front Left Level Trim
  type: number
  unit: dB
- id: ceiling_rear_right_level
  label: Ceiling Rear Right Level Trim
  type: number
  unit: dB
- id: ceiling_rear_left_level
  label: Ceiling Rear Left Level Trim
  type: number
  unit: dB
- id: dimmer_state
  label: Display Dimmer
  type: integer
  range: [-10, 10]
```

## Variables
```yaml
# UNRESOLVED: source does not define discrete variable entries; trims/dimmer are
# returned as +/-##.#db / +/-## strings, sign-handling not formally specified.
```

## Events
```yaml
# UNRESOLVED: device does not send unsolicited notifications per source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_default
interlocks: []
# UNRESOLVED: factory_default_on! resets unit; source does not document
# a confirmation step before reset.
```

## Notes
Command terminator is `!` — no spaces, no carriage return/line feed after command. RS-232 does not support flow control — avoid packet loss by pacing commands. IP control on port 9596; Front USB input causes slow response — use RS-232 when Front USB is needed. Status returns either terminate with `!` or with a byte count for variable-length data; application must parse accordingly. For one Center Back channel, use Center Back Left commands. For Ceiling Middle channels, use Ceiling Front Left & Right commands. Volume step count: 00-96 (97 steps).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: dimmer return format dimmer=+/-##! — not confirmed as signed integer or separate sign field -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RAP1580%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
  - https://www.rotel.com/product/rap-1580
  - https://www.rotel.com/control-system-resources
  - "https://www.rotel.com/sites/default/files/product/ir/RAP1580%20HEX.pdf"
retrieved_at: 2026-05-22T17:57:41.575Z
last_checked_at: 2026-06-09T07:16:10.877Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:16:10.877Z
matched_actions: 77
action_count: 77
confidence: medium
summary: "All 77 spec actions match source command tokens literally; transport values (port 9596, baud 115200, no flow control) confirmed; complete coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "dimmer return format dimmer=+/-##! — sign handling not formally specified in source"
- "source does not define discrete variable entries; trims/dimmer are"
- "device does not send unsolicited notifications per source"
- "no multi-step sequences described in source"
- "factory_default_on! resets unit; source does not document"
- "dimmer return format dimmer=+/-##! — not confirmed as signed integer or separate sign field"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
