---
schema_version: ai4av-public-spec-v1
device_id: rotel/rsp-1576
entity_id: rotel_rsp_1576_series
spec_id: admin/rotel-rsp-1576-series
revision: 1
author: admin
title: "Rotel RSP-1576 Series Control Spec"
status: published
manufacturer: Rotel
manufacturer_key: rotel
model_family: RSP-1576
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RSP-1576
    - RSP-1576MKII
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: rotel_rsp_1576_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T08:23:34.590Z
retrieved_at: 2026-04-23T08:23:34.590Z
last_checked_at: 2026-04-23T08:23:34.590Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T08:23:34.590Z
  matched_actions: 54
  action_count: 54
  confidence: high
  summary: "All 54 spec actions have literal matches in source; transport parameters (115200 baud, 8N1, TCP 9596) verified verbatim; no shape drift or fabricated commands detected."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Rotel RSP-1576 Series Control Spec

## Summary
The RSP-1576/RSP-1576MKII is a stereo preamp/processor supporting both RS-232 and TCP/IP ASCII control. Commands are terminated by `!`. No authentication required. IP control note: responses are slower when Front USB input is selected.

<!-- UNRESOLVED: product family variants (MKII hardware differences) not detailed in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 9596  # TCP port stated; no auth on RS-232
serial:
  baud_rate: 115200
  data_bits: 8
  parity: N
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- levelable
- routable
- queryable
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
- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
- id: volume_up
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: "Volume level 0(min)–96(max)"
- id: mute_toggle
  label: Mute Toggle
  kind: action
  params: []
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: source_cd
  label: Source CD
  kind: action
  params: []
- id: source_video1
  label: Source Video 1
  kind: action
  params: []
- id: source_video2
  label: Source Video 2
  kind: action
  params: []
- id: source_video3
  label: Source Video 3
  kind: action
  params: []
- id: source_video4
  label: Source Video 4
  kind: action
  params: []
- id: source_video5
  label: Source Video 5
  kind: action
  params: []
- id: source_video6
  label: Source Video 6
  kind: action
  params: []
- id: source_video7
  label: Source Video 7
  kind: action
  params: []
- id: source_tuner
  label: Source Tuner
  kind: action
  params: []
- id: source_phono
  label: Source Phono
  kind: action
  params: []
- id: source_usb
  label: Source Front USB
  kind: action
  params: []
- id: source_pc_usb
  label: Source PC-USB
  kind: action
  params: []
- id: source_bal_xlr
  label: Source XLR
  kind: action
  params: []
- id: source_bluetooth
  label: Source Bluetooth
  kind: action
  params: []
- id: source_multi_input
  label: Source Multi Input
  kind: action
  params: []
- id: play
  label: Play
  kind: action
  params: []
- id: stop
  label: Stop
  kind: action
  params: []
- id: pause
  label: Pause
  kind: action
  params: []
- id: track_fwd
  label: Track Forward / Tune Up
  kind: action
  params: []
- id: track_back
  label: Track Backward / Tune Down
  kind: action
  params: []
- id: menu
  label: Display Menu
  kind: action
  params: []
- id: exit
  label: Exit Key
  kind: action
  params: []
- id: up
  label: Cursor Up
  kind: action
  params: []
- id: down
  label: Cursor Down
  kind: action
  params: []
- id: left
  label: Cursor Left
  kind: action
  params: []
- id: right
  label: Cursor Right
  kind: action
  params: []
- id: enter
  label: Enter Key
  kind: action
  params: []
- id: dsp_2channel
  label: Select 2 Channel Mode
  kind: action
  params: []
- id: dsp_3channel
  label: Select 3 Channel Stereo Mode
  kind: action
  params: []
- id: dsp_5channel
  label: Select 5 Channel Stereo Mode
  kind: action
  params: []
- id: dsp_7channel
  label: Select 7 Channel Stereo Mode
  kind: action
  params: []
- id: dsp_9channel
  label: Select 9 Channel Stereo Mode
  kind: action
  params: []
- id: dsp_11channel
  label: Select 11 Channel Stereo Mode
  kind: action
  params: []
- id: dsp_dolby_atmos
  label: Select Dolby Atmos Mode
  kind: action
  params: []
- id: dsp_dts_neural
  label: Select DTS Neural:X Mode
  kind: action
  params: []
- id: dsp_bypass
  label: Select Analog Bypass Mode
  kind: action
  params: []
- id: dsp_surround_next
  label: Select Next DSP Mode
  kind: action
  params: []
- id: subwoofer_up
  label: Subwoofer Level +0.5dB
  kind: action
  params: []
- id: subwoofer_down
  label: Subwoofer Level -0.5dB
  kind: action
  params: []
- id: center_up
  label: Center Level +0.5dB
  kind: action
  params: []
- id: center_down
  label: Center Level -0.5dB
  kind: action
  params: []
- id: surround_right_up
  label: Surround Right Level +0.5dB
  kind: action
  params: []
- id: surround_right_down
  label: Surround Right Level -0.5dB
  kind: action
  params: []
- id: surround_left_up
  label: Surround Left Level +0.5dB
  kind: action
  params: []
- id: surround_left_down
  label: Surround Left Level -0.5dB
  kind: action
  params: []
- id: center_back_right_up
  label: Center Back Right Level +0.5dB
  kind: action
  params: []
- id: center_back_right_down
  label: Center Back Right Level -0.5dB
  kind: action
  params: []
- id: center_back_left_up
  label: Center Back Left Level +0.5dB
  kind: action
  params: []
- id: center_back_left_down
  label: Center Back Left Level -0.5dB
  kind: action
  params: []
- id: ceiling_front_right_up
  label: Ceiling Front Right Level +0.5dB
  kind: action
  params: []
- id: ceiling_front_right_down
  label: Ceiling Front Right Level -0.5dB
  kind: action
  params: []
- id: ceiling_front_left_up
  label: Ceiling Front Left Level +0.5dB
  kind: action
  params: []
- id: ceiling_front_left_down
  label: Ceiling Front Left Level -0.5dB
  kind: action
  params: []
- id: ceiling_rear_right_up
  label: Ceiling Rear Right Level +0.5dB
  kind: action
  params: []
- id: ceiling_rear_right_down
  label: Ceiling Rear Right Level -0.5dB
  kind: action
  params: []
- id: ceiling_rear_left_up
  label: Ceiling Rear Left Level +0.5dB
  kind: action
  params: []
- id: ceiling_rear_left_down
  label: Ceiling Rear Left Level -0.5dB
  kind: action
  params: []
- id: dimmer_toggle
  label: Dimmer Toggle
  kind: action
  params: []
- id: dimmer_neutral
  label: Dimmer Neutral
  kind: action
  params: []
- id: dimmer_minus
  label: Dimmer Decrease
  kind: action
  params:
    - name: level
      type: integer
      description: "Dimmer level 1-10"
- id: dimmer_plus
  label: Dimmer Increase
  kind: action
  params:
    - name: level
      type: integer
      description: "Dimmer level 1-10"
- id: factory_default_on
  label: Factory Default Reset
  kind: action
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
- id: current_source
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
- id: volume_level
  label: Volume Level
  type: integer
  description: "0(min)–96(max)"
- id: mute_state
  label: Mute State
  type: enum
  values:
    - on
    - off
- id: dsp_mode
  label: DSP Mode
  type: enum
  values:
    - stereo
    - dolby_3_stereo
    - 5_channel_stereo
    - 7_channel_stereo
    - 9_channel_stereo
    - 11_channel_stereo
    - dolbyatmos_surround
    - dts_neural_x
    - analog_bypass
    - source_dependent
- id: subwoofer_level
  label: Subwoofer Level Trim
  type: string
  description: "+/-##.# dB"
- id: center_level
  label: Center Level Trim
  type: string
  description: "+/-##.# dB"
- id: surround_right_level
  label: Surround Right Level Trim
  type: string
  description: "+/-##.# dB"
- id: surround_left_level
  label: Surround Left Level Trim
  type: string
  description: "+/-##.# dB"
- id: center_back_right_level
  label: Center Back Right Level Trim
  type: string
  description: "+/-##.# dB"
- id: center_back_left_level
  label: Center Back Left Level Trim
  type: string
  description: "+/-##.# dB"
- id: ceiling_front_right_level
  label: Ceiling Front Right Level Trim
  type: string
  description: "+/-##.# dB"
- id: ceiling_front_left_level
  label: Ceiling Front Left Level Trim
  type: string
  description: "+/-##.# dB"
- id: ceiling_rear_right_level
  label: Ceiling Rear Right Level Trim
  type: string
  description: "+/-##.# dB"
- id: ceiling_rear_left_level
  label: Ceiling Rear Left Level Trim
  type: string
  description: "+/-##.# dB"
- id: dimmer_level
  label: Dimmer Level
  type: string
  description: "+/-# or 0"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond Actions; volume and trim
# handled via Actions with immediate feedback response.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions in source; device sends
# responses only on command/query, no autonomous status broadcasts described.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - factory_default_on  # inferred: factory reset is destructive
interlocks: []
# UNRESOLVED: no safety interlock procedures stated in source.
```

## Notes
- Command terminator: `!` on all commands. No carriage return or line feed.
- RS-232: no flow control; packet loss possible if data sent too fast.
- IP control: responses slower when Front USB input selected; RS-232 recommended for systems using Front USB.
- Variable-length responses use byte count prefix before `!` terminator.
<!-- UNRESOLVED: coax/optical source inputs (coax1-3, opt1-3) referenced in feedback
commands but not in source selection action table; possible documentation gap. -->
<!-- UNRESOLVED: video8 source listed in feedback but video8 not in action table. -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: rotel_rsp_1576_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T08:23:34.590Z
retrieved_at: 2026-04-23T08:23:34.590Z
last_checked_at: 2026-04-23T08:23:34.590Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:23:34.590Z
matched_actions: 54
action_count: 54
confidence: high
summary: "All 54 spec actions have literal matches in source; transport parameters (115200 baud, 8N1, TCP 9596) verified verbatim; no shape drift or fabricated commands detected."
```

## Known Gaps

```yaml
[]
```
