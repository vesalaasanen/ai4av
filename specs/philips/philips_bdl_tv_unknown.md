---
spec_id: admin/philips-bdl-tv
schema_version: ai4av-public-spec-v1
revision: 1
title: "Philips BDL TV Control Spec"
manufacturer: Philips
model_family: "BDL TV"
aliases: []
compatible_with:
  manufacturers:
    - Philips
  models:
    - "BDL TV"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.xibo.org.uk
  - digis.ru
source_urls:
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.digis.ru/upload/iblock/bb4/SICP_application_note_v1.6.pdf
retrieved_at: 2026-05-26T17:18:31.293Z
last_checked_at: 2026-06-10T01:15:12.922Z
generated_at: 2026-06-10T01:15:12.922Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - 0xFE
  - "no standalone Variables section found in source"
  - "no unsolicited event notifications documented"
  - "no macro sequences documented"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated in source"
  - "specific BDL model variants (e.g. 10BDL3051T) noted in special cases but no exhaustive model list"
verification:
  verdict: verified
  checked_at: 2026-06-10T01:15:12.922Z
  matched_actions: 117
  action_count: 117
  confidence: medium
  summary: "All 117 spec actions matched one-to-one with source SICP V2.03 opcodes across 119 source commands; only 0xFE (MIC color calibration, TBD) is absent from spec, well below the 5-extra threshold. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Philips BDL TV Control Spec

## Summary
Philips professional business display (BDL series) controlled via RS-232C or Ethernet using SICP V2.03 protocol. Supports power, input routing, IR/keypad lock, failover, and cold-start configuration.

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 5000
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
- routable
```

## Actions
```yaml
- id: power_set
  label: Power State Set
  kind: action
  params:
    - name: state
      type: enum
      values:
        - 0x01  # Power Off
        - 0x02  # On

- id: power_get
  label: Power State Get
  kind: query
  params: []

- id: ir_lock_get
  label: IR Remote Lock Status Get
  kind: query
  params: []

- id: ir_lock_set
  label: IR Remote Lock State Set
  kind: action
  params:
    - name: lock_state
      type: enum
      values:
        - 0x01  # Unlock all
        - 0x02  # Lock all
        - 0x03  # Lock all but Power
        - 0x04  # Lock all but Volume
        - 0x05  # Primary (Master)
        - 0x06  # Secondary (Daisy chain PD)
        - 0x07  # Lock all except Power & Volume

- id: keypad_lock_get
  label: Keypad Lock Status Get
  kind: query
  params: []

- id: keypad_lock_set
  label: Keypad Lock State Set
  kind: action
  params:
    - name: lock_state
      type: enum
      values:
        - 0x01  # Unlock all
        - 0x02  # Lock all
        - 0x03  # Lock all but Power
        - 0x04  # Lock all but Volume
        - 0x07  # Lock all except Power & Volume

- id: power_at_cold_start_get
  label: Power at Cold Start Get
  kind: query
  params: []

- id: power_at_cold_start_set
  label: Power at Cold Start Set
  kind: action
  params:
    - name: cold_start_state
      type: enum
      values:
        - 0x00  # Power Off
        - 0x01  # Forced On
        - 0x02  # Last Status

- id: input_source_set
  label: Input Source Set
  kind: action
  params:
    - name: source
      type: enum
      values:
        - 0x01  # VIDEO
        - 0x02  # S-VIDEO
        - 0x03  # COMPONENT
        - 0x05  # VGA
        - 0x06  # HDMI 2
        - 0x07  # Display Port 2
        - 0x08  # USB 2
        - 0x09  # Card DVI-D
        - 0x0A  # Display Port 1
        - 0x0B  # Card OPS
        - 0x0C  # USB 1
        - 0x0D  # HDMI
        - 0x0E  # DVI-D
        - 0x0F  # HDMI3
        - 0x10  # BROWSER
        - 0x11  # SMARTCMS
        - 0x12  # DMS (Digital Media Server)
        - 0x13  # INTERNAL STORAGE
        - 0x16  # Media Player
        - 0x17  # PDF Player
        - 0x18  # Custom
        - 0x19  # HDMI 4
        - 0x1A  # VGA2
        - 0x1B  # VGA3
        - 0x1C  # IWB

- id: input_source_get
  label: Input Source Get
  kind: query
  params: []

- id: auto_signal_detecting_get
  label: Auto Signal Detecting Get
  kind: query
  params: []

- id: auto_signal_detecting_set
  label: Auto Signal Detecting Set
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - 0x00  # Off
        - 0x01  # All
        - 0x03  # PC sources only
        - 0x04  # Video sources only
        - 0x05  # Failover

- id: failover_get
  label: Failover Get
  kind: query
  params: []

- id: failover_set
  label: Failover Set
  kind: action
  params:
    - name: priority1
      type: enum
      values:
        - 0x00  # HDMI
        - 0x01  # Component
        - 0x02  # Composite
        - 0x03  # Display Port
        - 0x04  # DVI-D
        - 0x05  # VGA
        - 0x06  # OPS
        - 0x07  # USB
        - 0x08  # Browser
        - 0x09  # SmartCMS
        - 0x0A  # Internal Storage
        - 0x0B  # DMS
        - 0x0C  # HDMI2
        - 0x0D  # HDMI3
        - 0x0E  # USB Playlist
        - 0x0F  # USB AutoPlay
        - 0x10  # Media Player
        - 0x11  # PDF Player
        - 0x12  # Custom
        - 0x13  # HDMI 4
        - 0x14  # VGA2
        - 0x15  # VGA3
        - 0x16  # IWB
    - name: priority2
      type: enum
      values: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16]
    - name: priority3
      type: enum
      values: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16]
    - name: priority4
      type: enum
      values: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16]
    - name: priority5
      type: enum
      values: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16]
    - name: priority6
      type: enum
      values: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16]
    - name: priority7
      type: enum
      values: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16]
    - name: priority8
      type: enum
      values: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16]
    - name: priority9
      type: enum
      values: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16]
    - name: priority10
      type: enum
      values: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16]
    - name: priority11
      type: enum
      values: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16]
    - name: priority12
      type: enum
      values: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16]
    - name: priority13
      type: enum
      values: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16]
    - name: priority14
      type: enum
      values: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16]
    - name: priority15
      type: enum
      values: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16]
    - name: priority16
      type: enum
      values: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16]

- id: platform_version_get
  label: Platform and Version Get
  kind: query
  params:
    - name: label_type
      type: enum
      values:
        - 0x00  # SICP implementation version
        - 0x01  # Platform label
        - 0x02  # Platform version

- id: model_firmware_get
  label: Model Number and FW Version Get
  kind: query
  params:
    - name: code
      type: enum
      values:
        - 0x00  # Model Number
        - 0x01  # FW version
        - 0x02  # Build Date
        - 0x03  # Android FW version
- id: monitor_restart_set
  label: Monitor Restart Set
  kind: action
  params:
    - name: target
      type: enum
      values:
        - 0x00  # Android
        - 0x01  # Scalar

- id: backlight_get
  label: Backlight Status Get
  kind: query
  params: []

- id: backlight_set
  label: Backlight Set
  kind: action
  params:
    - name: state
      type: enum
      values:
        - 0x00  # backlight on
        - 0x01  # backlight off

- id: video_parameters_get
  label: Video Parameters Get
  kind: query
  params: []

- id: video_parameters_set
  label: Video Parameters Set
  kind: action
  params:
    - name: brightness
      type: integer
      range: [0, 100]
    - name: color
      type: integer
      range: [0, 100]
    - name: contrast
      type: integer
      range: [0, 100]
    - name: sharpness
      type: integer
      range: [0, 100]
    - name: tint
      type: integer
      range: [0, 100]
    - name: black_level
      type: integer
      range: [0, 100]
    - name: gamma
      type: enum
      values:
        - 0x01  # Native
        - 0x02  # S gamma
        - 0x03  # 2.2
        - 0x04  # 2.4
        - 0x05  # D-image (DICOM gamma)

- id: color_temperature_get
  label: Color Temperature Get
  kind: query
  params: []

- id: color_temperature_set
  label: Color Temperature Set
  kind: action
  params:
    - name: temperature
      type: enum
      values:
        - 0x00  # User 1
        - 0x01  # Native
        - 0x02  # 11000K (Not applicable)
        - 0x03  # 10000K
        - 0x04  # 9300K
        - 0x05  # 7500K
        - 0x06  # 6500K
        - 0x07  # 5770K (Not applicable)
        - 0x08  # 5500K (Not applicable)
        - 0x09  # 5000K
        - 0x0A  # 4000K
        - 0x0B  # 3400K (Not applicable)
        - 0x0C  # 3350K (Not applicable)
        - 0x0D  # 3000K
        - 0x0E  # 2800K (Not applicable)
        - 0x0F  # 2600K (Not applicable)
        - 0x10  # 1850K (Not applicable)
        - 0x12  # User 2

- id: rgb_color_parameters_get
  label: RGB Color Parameters Get
  kind: query
  params: []

- id: rgb_color_parameters_set
  label: RGB Color Parameters Set
  kind: action
  params:
    - name: red_gain
      type: integer
      range: [0, 255]
    - name: green_gain
      type: integer
      range: [0, 255]
    - name: blue_gain
      type: integer
      range: [0, 255]
    - name: red_offset
      type: integer
      range: [0, 255]
    - name: green_offset
      type: integer
      range: [0, 255]
    - name: blue_offset
      type: integer
      range: [0, 255]

- id: color_temperature_100k_get
  label: Color Temperature 100K Steps Get
  kind: query
  params: []

- id: color_temperature_100k_set
  label: Color Temperature 100K Steps Set
  kind: action
  params:
    - name: temperature_step
      type: integer
      range: [20, 100]

- id: picture_format_get
  label: Picture Format Get
  kind: query
  params: []

- id: picture_format_set
  label: Picture Format Set
  kind: action
  params:
    - name: format
      type: enum
      values:
        - 0x00  # Normal (4:3)
        - 0x01  # Custom
        - 0x02  # Real (1:1)
        - 0x03  # Full
        - 0x04  # 21:9
        - 0x05  # Dynamic
        - 0x06  # 16:9

- id: vga_video_parameters_get
  label: VGA Video Parameters Get
  kind: query
  params: []

- id: vga_video_parameters_set
  label: VGA Video Parameters Set
  kind: action
  params:
    - name: clock
      type: integer
      range: [0, 100]
    - name: clock_phase
      type: integer
      range: [0, 100]
    - name: h_position
      type: integer
      range: [0, 100]
    - name: v_position
      type: integer
      range: [0, 100]

- id: pip_get
  label: Picture-in-Picture Get
  kind: query
  params: []

- id: pip_set
  label: Picture-in-Picture Set
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - 0x00  # Off
        - 0x01  # On (PIP)
        - 0x02  # POP
        - 0x03  # Quick swap
        - 0x04  # PBP 2win
        - 0x05  # PBP 3win
        - 0x06  # PBP 4win
        - 0x07  # PBP 3win-1
        - 0x08  # PBP 3win-2
        - 0x09  # PBP 4win-1
        - 0x0A  # SICP (Custom)
    - name: position
      type: enum
      values:
        - 0x00  # position 0 (typically bottom-left)
        - 0x01  # position 1 (typically top-left)
        - 0x02  # position 2 (typically top-right)
        - 0x03  # position 3 (typically bottom-right)
        - 0x04  # position 4 (typically center)

- id: pip_source_get
  label: PIP Source Get
  kind: query
  params: []

- id: pip_source_set
  label: PIP Source Set
  kind: action
  params:
    - name: source_type
      type: enum
      values:
        - 0xFD  # Input Source (normal state)
        - 0xFE  # Reserved for smartcard
    - name: q2_source
      type: integer
      range: [1, 28]
    - name: q3_source
      type: integer
      range: [1, 28]
    - name: q4_source
      type: integer
      range: [1, 28]

- id: volume_get
  label: Volume Get
  kind: query
  params: []

- id: volume_set
  label: Volume Set
  kind: action
  params:
    - name: speaker_out
      type: integer
      range: [0, 100]
    - name: audio_out
      type: integer
      range: [0, 100]

- id: volume_step_set
  label: Volume Step Up/Down Set
  kind: action
  params:
    - name: speaker_out
      type: enum
      values:
        - 0x00  # down
        - 0x01  # up
        - 0x02  # no change
    - name: audio_out
      type: enum
      values:
        - 0x00  # down
        - 0x01  # up
        - 0x02  # no change

- id: volume_limit_speaker_get
  label: Volume Limit Speaker Out Get
  kind: query
  params: []

- id: volume_limit_speaker_set
  label: Volume Limit Speaker Out Set
  kind: action
  params:
    - name: minimum_volume
      type: integer
      range: [0, 100]
    - name: maximum_volume
      type: integer
      range: [0, 100]
    - name: switch_on_volume
      type: integer
      range: [0, 100]

- id: volume_limit_audio_get
  label: Volume Limit Audio Out Get
  kind: query
  params: []

- id: volume_limit_audio_set
  label: Volume Limit Audio Out Set
  kind: action
  params:
    - name: minimum_volume
      type: integer
      range: [0, 100]
    - name: maximum_volume
      type: integer
      range: [0, 100]
    - name: switch_on_volume
      type: integer
      range: [0, 100]

- id: audio_parameters_get
  label: Audio Parameters Get
  kind: query
  params: []

- id: audio_parameters_set
  label: Audio Parameters Set
  kind: action
  params:
    - name: treble
      type: integer
      range: [0, 100]
    - name: bass
      type: integer
      range: [0, 100]

- id: volume_mute_get
  label: Volume Mute Get
  kind: query
  params: []

- id: volume_mute_set
  label: Volume Mute Set
  kind: action
  params:
    - name: mute
      type: enum
      values:
        - 0x00  # mute off
        - 0x01  # mute on

- id: operating_hours_get
  label: Operating Hours Get
  kind: query
  params:
    - name: item
      type: enum
      values:
        - 0x02  # Operating Hours

- id: smart_power_get
  label: Smart Power Get
  kind: query
  params: []

- id: smart_power_set
  label: Smart Power Set
  kind: action
  params:
    - name: level
      type: enum
      values:
        - 0x00  # OFF
        - 0x01  # Low (defined to be same as OFF)
        - 0x02  # Medium
        - 0x03  # High

- id: auto_adjust_set
  label: Auto Adjust Set
  kind: action
  params:
    - name: item
      type: enum
      values:
        - 0x40  # Auto Adjust

- id: temperature_get
  label: Temperature Sensors Get
  kind: query
  params: []

- id: serial_code_get
  label: Serial Code Get
  kind: query
  params: []

- id: tiling_get
  label: Tiling Get
  kind: query
  params: []

- id: tiling_set
  label: Tiling Set
  kind: action
  params:
    - name: enable
      type: enum
      values:
        - 0x00  # No
        - 0x01  # Yes
    - name: frame_comp
      type: enum
      values:
        - 0x00  # No
        - 0x01  # Yes
        - 0x02  # don't overwrite (keep previous value)
    - name: position
      type: integer
      range: [0, 150]
    - name: v_h_monitors
      type: integer
      range: [0, 150]

- id: light_sensor_get
  label: Light Sensor Get
  kind: query
  params: []

- id: light_sensor_set
  label: Light Sensor Set
  kind: action
  params:
    - name: state
      type: enum
      values:
        - 0x00  # Off
        - 0x01  # On

- id: human_sensor_get
  label: Human Sensor Get
  kind: query
  params: []

- id: human_sensor_set
  label: Human Sensor Set
  kind: action
  params:
    - name: timeout
      type: enum
      values:
        - 0x00  # Off
        - 0x01  # 10 mins
        - 0x02  # 20 mins
        - 0x03  # 30 mins
        - 0x04  # 40 mins
        - 0x05  # 50 mins
        - 0x06  # 60 mins

- id: osd_rotating_get
  label: OSD Rotating Get
  kind: query
  params: []

- id: osd_rotating_set
  label: OSD Rotating Set
  kind: action
  params:
    - name: state
      type: enum
      values:
        - 0x00  # Off
        - 0x01  # On

- id: display_orientation_get
  label: Display Orientation Get
  kind: query
  params: []

- id: display_orientation_set
  label: Display Orientation Set
  kind: action
  params:
    - name: auto_rotate
      type: enum
      values:
        - 0x00  # Off
        - 0x01  # On
    - name: osd_rotation
      type: enum
      values:
        - 0x00  # Landscape
        - 0x01  # Portrait
    - name: image_all
      type: enum
      values:
        - 0x00  # Off
        - 0x01  # On
        - 0x02  # On Clock Wise
        - 0x03  # On Counter Clock Wise
    - name: display_window_1
      type: enum
      values:
        - 0x00  # Off
        - 0x01  # On
    - name: display_window_2
      type: enum
      values:
        - 0x00  # Off
        - 0x01  # On
    - name: display_window_3
      type: enum
      values:
        - 0x00  # Off
        - 0x01  # On
    - name: display_window_4
      type: enum
      values:
        - 0x00  # Off
        - 0x01  # On

- id: information_osd_get
  label: Information OSD Feature Get
  kind: query
  params: []

- id: information_osd_set
  label: Information OSD Feature Set
  kind: action
  params:
    - name: duration
      type: integer
      range: [0, 60]

- id: memc_effect_get
  label: MEMC Effect Get
  kind: query
  params: []

- id: memc_effect_set
  label: MEMC Effect Set
  kind: action
  params:
    - name: level
      type: enum
      values:
        - 0x00  # Off
        - 0x01  # Low
        - 0x02  # Medium
        - 0x03  # High

- id: touch_feature_get
  label: Touch Feature Get
  kind: query
  params: []

- id: touch_feature_set
  label: Touch Feature Set
  kind: action
  params:
    - name: state
      type: enum
      values:
        - 0x00  # Off
        - 0x01  # On

- id: noise_reduction_get
  label: Noise Reduction Get
  kind: query
  params: []

- id: noise_reduction_set
  label: Noise Reduction Set
  kind: action
  params:
    - name: level
      type: enum
      values:
        - 0x00  # Off
        - 0x01  # Low
        - 0x02  # Middle
        - 0x03  # High
        - 0x04  # default

- id: scan_mode_get
  label: Scan Mode Get
  kind: query
  params: []

- id: scan_mode_set
  label: Scan Mode Set
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - 0x00  # Over scan
        - 0x01  # Under scan
        - 0x02  # Off

- id: scan_conversion_get
  label: Scan Conversion Get
  kind: query
  params: []

- id: scan_conversion_set
  label: Scan Conversion Set
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - 0x00  # Progressive
        - 0x01  # Interlace

- id: switch_on_delay_get
  label: Switch On Delay Get
  kind: query
  params: []

- id: switch_on_delay_set
  label: Switch On Delay Set
  kind: action
  params:
    - name: delay
      type: enum
      values:
        - 0x00  # Off
        - 0x01  # Auto
        - 0x02  # 2 seconds
        - 0x03  # 3 seconds
        - 0xFF  # 255 seconds

- id: factory_reset_set
  label: Factory Reset Set
  kind: action
  params: []

- id: power_on_logo_get
  label: Power On Logo Get
  kind: query
  params: []

- id: power_on_logo_set
  label: Power On Logo Set
  kind: action
  params:
    - name: state
      type: enum
      values:
        - 0x00  # Off
        - 0x01  # On
        - 0x02  # User

- id: fan_speed_get
  label: Fan Speed Get
  kind: query
  params: []

- id: fan_speed_set
  label: Fan Speed Set
  kind: action
  params:
    - name: speed
      type: enum
      values:
        - 0x00  # Off
        - 0x01  # Auto
        - 0x02  # Low
        - 0x03  # Middle
        - 0x04  # High

- id: apm_status_get
  label: APM Status Get
  kind: query
  params: []

- id: apm_status_set
  label: APM Status Set
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - 0x00  # Off
        - 0x01  # On
        - 0x02  # Mode 1 (TCP off / WOL on)
        - 0x03  # Mode 2 (TCP on / WOL off)

- id: power_saving_mode_get
  label: Power Saving Mode Status Get
  kind: query
  params: []

- id: power_saving_mode_set
  label: Power Saving Mode Status Set
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - 0x00  # RGB Off & Video Off
        - 0x01  # RGB Off, Video On
        - 0x02  # RGB On, Video Off
        - 0x03  # RGB On & Video On
        - 0x04  # mode 1
        - 0x05  # mode 2
        - 0x06  # mode 3
        - 0x07  # mode 4

- id: pixel_shift_get
  label: Pixel Shift Get
  kind: query
  params: []

- id: pixel_shift_set
  label: Pixel Shift Set
  kind: action
  params:
    - name: interval
      type: enum
      values:
        - 0x00  # Off
        - 0x01  # 10 secs
        - 0x02  # 20 secs
        - 0x03  # 30 secs
        - 0x04  # 40 secs
        - 0x5A  # 900 secs
        - 0x5B  # AUTO

- id: off_timer_get
  label: Off Timer Get
  kind: query
  params: []

- id: off_timer_set
  label: Off Timer Set
  kind: action
  params:
    - name: hours
      type: integer
      range: [0, 24]

- id: eco_mode_get
  label: ECO Mode Get
  kind: query
  params: []

- id: eco_mode_set
  label: ECO Mode Set
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - 0x00  # low power standby
        - 0x01  # normal

- id: picture_style_get
  label: Picture Style Get
  kind: query
  params: []

- id: picture_style_set
  label: Picture Style Set
  kind: action
  params:
    - name: style
      type: enum
      values:
        - 0x00  # Highbright
        - 0x01  # sRGB
        - 0x02  # Vivid
        - 0x03  # Natural
        - 0x04  # Standard
        - 0x05  # Video
        - 0x06  # Static Signage
        - 0x07  # Text
        - 0x08  # Energy saving
        - 0x09  # Soft
        - 0x0A  # User

- id: screenshot_set
  label: Screenshot Send Set
  kind: action
  params: []

- id: video_signal_present_get
  label: Video Signal Present Get
  kind: query
  params: []

- id: frame_compensation_horz_get
  label: Frame Compensation Horizontal Get
  kind: query
  params: []

- id: frame_compensation_horz_set
  label: Frame Compensation Horizontal Set
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: frame_compensation_vert_get
  label: Frame Compensation Vertical Get
  kind: query
  params: []

- id: frame_compensation_vert_set
  label: Frame Compensation Vertical Set
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: scheduling_get
  label: Scheduling Parameters Get
  kind: query
  params:
    - name: page
      type: integer
      range: [1, 7]

- id: scheduling_set
  label: Scheduling Parameters Set
  kind: action
  params:
    - name: page
      type: integer
      range: [1, 7]
    - name: start_hour
      type: integer
      range: [0, 24]
    - name: start_minute
      type: integer
      range: [0, 60]
    - name: end_hour
      type: integer
      range: [0, 24]
    - name: end_minute
      type: integer
      range: [0, 60]
    - name: video_source
      type: integer
      range: [0, 28]
    - name: working_days
      type: integer
      range: [0, 255]

- id: group_id_get
  label: Group ID Get
  kind: query
  params: []

- id: group_id_set
  label: Group ID Set
  kind: action
  params:
    - name: group_id
      type: integer
      range: [1, 255]

- id: custom_multi_win_enable_set
  label: Custom Multi-Win Enable Set
  kind: action
  params:
    - name: state
      type: enum
      values:
        - 0x00  # Custom Multi-Win OFF
        - 0x01  # Custom Multi-Win ON
    - name: windows
      type: enum
      values:
        - 0x00  # Open one window
        - 0x01  # Open two windows
        - 0x02  # Open three windows
        - 0x03  # Open four windows

- id: custom_multi_win_window_get
  label: Custom Multi-Win Window Get
  kind: query
  params:
    - name: window
      type: enum
      values:
        - 0x00  # Main (Display Win1)
        - 0x01  # Sub1 (Display Win2)
        - 0x02  # Sub2 (Display Win3)
        - 0x03  # Sub3 (Display Win4)

- id: custom_multi_win_window_set
  label: Custom Multi-Win Window Set
  kind: action
  params:
    - name: window
      type: enum
      values:
        - 0x00  # Main (Display Win1)
        - 0x01  # Sub1 (Display Win2)
        - 0x02  # Sub2 (Display Win3)
        - 0x03  # Sub3 (Display Win4)
    - name: rotation
      type: enum
      values:
        - 0x00  # ROT_NONE (OFF)
        - 0x01  # ROT_90 (ON)
        - 0x02  # ROT_270
        - 0x03  # ROT_H_MIRROR
        - 0x04  # ROT_V_MIRROR
        - 0x05  # ROT_HV_MIRROR
    - name: x_position
      type: integer
      range: [0, 65535]
    - name: y_position
      type: integer
      range: [0, 65535]
    - name: width
      type: integer
      range: [0, 65535]
    - name: height
      type: integer
      range: [0, 65535]
    - name: picture_format
      type: enum
      values:
        - 0x00  # Normal (4:3)
        - 0x01  # Custom
        - 0x02  # Real (1:1)
        - 0x03  # Full
        - 0x04  # 21:9
        - 0x05  # Dynamic
        - 0x06  # 16:9
        - 0xFF  # Current setting (don't change)

- id: led_strip_get
  label: LED Strip Status Get
  kind: query
  params: []

- id: led_strip_set
  label: LED Strip Set
  kind: action
  params:
    - name: state
      type: enum
      values:
        - 0x00  # off
        - 0x01  # on
    - name: red
      type: integer
      range: [0, 255]
    - name: green
      type: integer
      range: [0, 255]
    - name: blue
      type: integer
      range: [0, 255]

- id: external_storage_lock_get
  label: External Storage Lock Get
  kind: query
  params: []

- id: external_storage_lock_set
  label: External Storage Lock Set
  kind: action
  params:
    - name: state
      type: enum
      values:
        - 0x00  # unlocked
        - 0x01  # Locked

- id: monitor_id_set
  label: Monitor ID Set
  kind: action
  params:
    - name: monitor_id
      type: integer
      range: [1, 254]

- id: anytile_get
  label: AnyTile Custom Tiling Get
  kind: query
  params: []

- id: anytile_set
  label: AnyTile Custom Tiling Set
  kind: action
  params:
    - name: enable
      type: enum
      values:
        - 0x00  # No
        - 0x01  # Yes
    - name: rotation_lsb
      type: enum
      values:
        - 0x00  # 0 degree
        - 0x5A  # 90 degree
        - 0x0E  # 270 degree
    - name: rotation_msb
      type: enum
      values:
        - 0x00  # 0 degree or 90 degree
        - 0x10  # 270 degree
    - name: input_h_start
      type: integer
      range: [0, 65535]
    - name: input_v_start
      type: integer
      range: [0, 65535]
    - name: input_h_size
      type: integer
      range: [0, 65535]
    - name: input_v_size
      type: integer
      range: [0, 65535]

- id: resolution_mode_get
  label: Resolution Mode Get
  kind: query
  params: []

- id: resolution_mode_set
  label: Resolution Mode Set
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - 0x00  # default
        - 0x01  # FHD
        - 0x02  # UHD4K

- id: set_group_monitor_id
  label: Set Group ID and Monitor ID
  kind: action
  params:
    - name: monitor_id
      type: integer
      range: [0, 255]
    - name: group_id
      type: integer
      range: [0, 255]

- id: display_monitor_id_set
  label: Display Monitor ID Set
  kind: action
  params:
    - name: monitor_id
      type: integer
      range: [0, 255]
```

## Feedbacks
```yaml
- id: communication_report
  type: enum
  values:
    - 0x06  # ACK
    - 0x15  # NACK
    - 0x18  # NAV

- id: power_state
  type: enum
  values:
    - 0x01  # Power Off
    - 0x02  # On

- id: ir_lock_status
  type: enum
  values:
    - 0x01  # Unlock all
    - 0x02  # Lock all
    - 0x03  # Lock all but Power
    - 0x04  # Lock all but Volume
    - 0x05  # Primary (Master)
    - 0x06  # Secondary (Daisy chain PD)
    - 0x07  # Lock all except Power & Volume

- id: keypad_lock_status
  type: enum
  values:
    - 0x01  # Unlock all
    - 0x02  # Lock all
    - 0x03  # Lock all but Power
    - 0x04  # Lock all but Volume
    - 0x07  # Lock all except Power & Volume

- id: power_at_cold_start
  type: enum
  values:
    - 0x00  # Power Off
    - 0x01  # Forced On
    - 0x02  # Last Status

- id: current_input_source
  type: enum
  values:
    - 0x01  # VIDEO
    - 0x02  # S-VIDEO
    - 0x03  # COMPONENT
    - 0x05  # VGA
    - 0x06  # HDMI 2
    - 0x07  # Display Port 2
    - 0x08  # USB 2
    - 0x09  # Card DVI-D
    - 0x0A  # Display Port 1
    - 0x0B  # Card OPS
    - 0x0C  # USB 1
    - 0x0D  # HDMI
    - 0x0E  # DVI-D
    - 0x0F  # HDMI3
    - 0x10  # BROWSER
    - 0x11  # SMARTCMS
    - 0x12  # DMS (Digital Media Server)
    - 0x13  # INTERNAL STORAGE
    - 0x16  # Media Player
    - 0x17  # PDF Player
    - 0x18  # Custom
    - 0x19  # HDMI 4
    - 0x1A  # VGA2
    - 0x1B  # VGA3
    - 0x1C  # IWB

- id: auto_signal_detecting_status
  type: enum
  values:
    - 0x00  # Off
    - 0x01  # All
    - 0x03  # PC sources only
    - 0x04  # Video sources only
    - 0x05  # Failover
```

## Variables
```yaml
# UNRESOLVED: no standalone Variables section found in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: specific BDL model variants (e.g. 10BDL3051T) noted in special cases but no exhaustive model list -->

## Provenance

```yaml
source_domains:
  - community.xibo.org.uk
  - digis.ru
source_urls:
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.digis.ru/upload/iblock/bb4/SICP_application_note_v1.6.pdf
retrieved_at: 2026-05-26T17:18:31.293Z
last_checked_at: 2026-06-10T01:15:12.922Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T01:15:12.922Z
matched_actions: 117
action_count: 117
confidence: medium
summary: "All 117 spec actions matched one-to-one with source SICP V2.03 opcodes across 119 source commands; only 0xFE (MIC color calibration, TBD) is absent from spec, well below the 5-extra threshold. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- 0xFE
- "no standalone Variables section found in source"
- "no unsolicited event notifications documented"
- "no macro sequences documented"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated in source"
- "specific BDL model variants (e.g. 10BDL3051T) noted in special cases but no exhaustive model list"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
