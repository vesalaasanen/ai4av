---
spec_id: admin/extron-foxbox-tx-dvi-plus
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron FOXBOX Tx DVI Plus Control Spec"
manufacturer: Extron
model_family: "FOXBOX Tx DVI Plus"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "FOXBOX Tx DVI Plus"
    - "FOXBOX Rx DVI Plus"
    - "FOXBOX Tx DVI"
    - "FOXBOX Rx DVI"
    - "FOXBOX Tx VGA"
    - "FOXBOX Rx VGA"
    - "FOXBOX Tx VGA/YUV"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - extron.com
  - media.extron.com
source_urls:
  - https://www.extron.com/download/files/userman/Matrix3200_6400_Wideband_A.pdf
  - https://media.extron.com/public/download/files/userman/XP_Plus_MAV_D.pdf
  - https://media.extron.com/public/download/files/userman/matrix100all-man.pdf
retrieved_at: 2026-05-01T02:11:30.714Z
last_checked_at: 2026-05-18T16:33:19.337Z
generated_at: 2026-05-18T16:33:19.337Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - 1N
verification:
  verdict: verified
  checked_at: 2026-05-18T16:33:19.337Z
  matched_actions: 42
  action_count: 42
  confidence: high
  summary: "All 42 spec actions matched verbatim in source; transport parameters verified; feedbacks cover all query commands except one part-number variant."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Extron FOXBOX Tx DVI Plus Control Spec

## Summary
Fiber optic DVI transmitter/receiver with RS-232 control via 2.5 mm mini stereo jack or 5-pole captive screw fiber connector. Supports video mute, audio level control, memory presets, test patterns, and status monitoring via SIS command set. RS-232 configuration: 9600 baud, 8N1, no flow control.

<!-- UNRESOLVED: firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
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
- queryable
- levelable
- routable
```

## Actions
```yaml
- id: video_mute
  label: Mute Output
  kind: action
  params: []
- id: video_unmute
  label: Unmute Output
  kind: action
  params: []
- id: set_edid_resolution
  label: Set EDID/DDC Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: Resolution code (01-19)
    - name: refresh
      type: string
      description: Refresh rate (1=50Hz, 2=60Hz)
- id: set_output_sync_format
  label: Set Output Sync Format
  kind: action
  params:
    - name: format
      type: string
      description: "0=RGBHV, 1=RGsB"
- id: set_output_sync_polarity_negative
  label: Force Negative Sync Polarity
  kind: action
  params: []
- id: set_output_sync_polarity_follow_input
  label: Sync Polarity Follows Input
  kind: action
  params: []
- id: set_horizontal_position
  label: Set Horizontal Position
  kind: action
  params:
    - name: position
      type: integer
      description: "000-255"
- id: increment_horizontal_position
  label: Increment Horizontal Position
  kind: action
  params: []
- id: decrement_horizontal_position
  label: Decrement Horizontal Position
  kind: action
  params: []
- id: set_vertical_position
  label: Set Vertical Position
  kind: action
  params:
    - name: position
      type: integer
      description: "000-255"
- id: increment_vertical_position
  label: Increment Vertical Position
  kind: action
  params: []
- id: decrement_vertical_position
  label: Decrement Vertical Position
  kind: action
  params: []
- id: set_horizontal_start
  label: Set Horizontal Start
  kind: action
  params:
    - name: start
      type: integer
      description: "000-255"
- id: increment_horizontal_start
  label: Increment Horizontal Start
  kind: action
  params: []
- id: decrement_horizontal_start
  label: Decrement Horizontal Start
  kind: action
  params: []
- id: set_pixel_phase
  label: Set Pixel Phase
  kind: action
  params:
    - name: phase
      type: integer
      description: "00-31"
- id: increment_pixel_phase
  label: Increment Pixel Phase
  kind: action
  params: []
- id: decrement_pixel_phase
  label: Decrement Pixel Phase
  kind: action
  params: []
- id: set_total_pixels
  label: Set Total Pixels
  kind: action
  params:
    - name: offset
      type: integer
      description: ±255 of default value
- id: increment_total_pixels
  label: Increment Total Pixels
  kind: action
  params: []
- id: decrement_total_pixels
  label: Decrement Total Pixels
  kind: action
  params: []
- id: save_preset
  label: Save Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-30"
- id: recall_preset
  label: Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-30"
- id: set_audio_gain
  label: Set Audio Input Gain
  kind: action
  params:
    - name: gain
      type: string
      description: "00-10 (dB gain)"
- id: set_audio_attenuation
  label: Set Audio Input Attenuation
  kind: action
  params:
    - name: attenuation
      type: string
      description: "00-18 (dB attenuation)"
- id: increment_audio_level
  label: Increment Audio Level
  kind: action
  params: []
- id: decrement_audio_level
  label: Decrement Audio Level
  kind: action
  params: []
- id: audio_mute
  label: Mute Audio
  kind: action
  params: []
- id: audio_unmute
  label: Unmute Audio
  kind: action
  params: []
- id: disable_auto_memory
  label: Disable Auto Memory
  kind: action
  params: []
- id: enable_auto_memory
  label: Enable Auto Memory
  kind: action
  params: []
- id: trigger_auto_image
  label: Trigger Auto Image
  kind: action
  params: []
- id: output_color_bars
  label: Output Color Bars Test Pattern
  kind: action
  params: []
- id: output_grayscale
  label: Output Grayscale Test Pattern
  kind: action
  params: []
- id: output_alternating_pixels
  label: Output Alternating Pixels Test Pattern
  kind: action
  params: []
- id: test_pattern_off
  label: Turn Test Pattern Off
  kind: action
  params: []
- id: disable_return_link
  label: Disable Return Link
  kind: action
  params: []
- id: enable_return_link
  label: Enable Return Link
  kind: action
  params: []
- id: set_video_shutdown_delay
  label: Set Video Shutdown Delay
  kind: action
  params:
    - name: interval
      type: string
      description: "0-6 (0=off, 1=0.25s, 2=0.5s, 3=0.75s, 4=1s, 5=1.25s, 6=1.5s)"
- id: reset_audio
  label: Reset Audio Settings
  kind: action
  params: []
- id: reset_memory_presets
  label: Reset Memory Presets
  kind: action
  params: []
- id: system_reset
  label: System Reset
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: video_mute_status
  label: Video Mute Status
  type: enum
  values: ["0", "1"]
- id: output_sync_format
  label: Output Sync Format
  type: enum
  values: ["0", "1"]
- id: output_sync_polarity
  label: Output Sync Polarity
  type: enum
  values: ["0", "1"]
- id: horizontal_position
  label: Horizontal Position
  type: integer
- id: vertical_position
  label: Vertical Position
  type: integer
- id: horizontal_start
  label: Horizontal Start
  type: integer
- id: pixel_phase
  label: Pixel Phase
  type: integer
- id: total_pixels
  label: Total Pixels Offset
  type: integer
- id: edid_resolution
  label: EDID/DDC Resolution
  type: string
- id: audio_level
  label: Audio Level
  type: string
- id: audio_mute_status
  label: Audio Mute Status
  type: enum
  values: ["0", "1"]
- id: auto_memory_status
  label: Auto Memory Status
  type: enum
  values: ["0", "1"]
- id: test_pattern_status
  label: Test Pattern Status
  type: enum
  values: ["0", "1", "2", "3"]
- id: return_link_status
  label: Return Link Status
  type: string
- id: video_shutdown_interval
  label: Video Shutdown Interval
  type: string
- id: sync_frequency
  label: Sync Frequency
  type: string
- id: firmware_version
  label: Firmware Version
  type: string
- id: part_number
  label: Part Number
  type: string
- id: link1_status
  label: Link 1 Status
  type: enum
  values: ["0", "1"]
- id: link2_status
  label: Link 2 Status
  type: enum
  values: ["0", "1"]
- id: input_video_status
  label: Input Video Status
  type: enum
  values: ["0", "1"]
- id: input_audio_status
  label: Input Audio Status
  type: enum
  values: ["0", "1"]
- id: temperature
  label: Temperature
  type: string
- id: information_status
  label: Information Status
  type: string
- id: dip_switch_position
  label: DIP Switch Position
  type: string
- id: error_response
  label: Error Response
  type: enum
  values: ["E10", "E11", "E13", "E14"]
```

## Variables
```yaml
- id: preset
  label: Memory Preset
  type: integer
- id: audio_gain_setting
  label: Audio Gain Setting
  type: string
- id: audio_attenuation_setting
  label: Audio Attenuation Setting
  type: string
```

## Events
```yaml
- id: power_up_message
  label: Power-Up Message
  type: string
- id: reconfig_message
  label: Reconfig Message
  type: string
- id: status_message
  label: Status Message
  type: string
- id: dip_switch_message
  label: DIP Switch Message
  type: string
```

## Macros
```yaml
- id: video_shutdown_with_delay
  label: Video Shutdown with Delay
  description: Enable video shutdown for a specified interval
  steps:
    - action: set_video_shutdown_delay
      params:
        interval: "3"
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - DIP switch 2 must be up for Video Shutdown Delay command to function
  - Only one fiber optic cable connected means RS-232 reports from controlled device will not be received
  - Install both fiber optic cables for full functionality
  - Daisy chain mode (DIP switch 1 up) supports up to 10 receivers
```

## Notes
RS-232 over fiber supports up to 115200 baud. Timeout: pauses of 10 seconds or longer between command ASCII characters result in command abort. All SIS responses end with CR/LF (`][`). Error codes: E10=Invalid command, E11=Invalid preset, E13=Invalid parameter, E14=Invalid command for this configuration.
<!-- UNRESOLVED: plus mode transmission (firmware 3.00+) specific commands not detailed in source -->

## Provenance

```yaml
source_domains:
  - extron.com
  - media.extron.com
source_urls:
  - https://www.extron.com/download/files/userman/Matrix3200_6400_Wideband_A.pdf
  - https://media.extron.com/public/download/files/userman/XP_Plus_MAV_D.pdf
  - https://media.extron.com/public/download/files/userman/matrix100all-man.pdf
retrieved_at: 2026-05-01T02:11:30.714Z
last_checked_at: 2026-05-18T16:33:19.337Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:33:19.337Z
matched_actions: 42
action_count: 42
confidence: high
summary: "All 42 spec actions matched verbatim in source; transport parameters verified; feedbacks cover all query commands except one part-number variant."
```

## Known Gaps

```yaml
- 1N
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
