---
spec_id: admin/dell-cx522qt-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "DELL C5522QT / C6522QT Control Spec"
manufacturer: DELL
model_family: C5522QT
aliases: []
compatible_with:
  manufacturers:
    - DELL
  models:
    - C5522QT
    - C6522QT
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - manuals.plus
  - dl.dell.com
  - infohub.delltechnologies.com
  - downloads.dell.com
source_urls:
  - https://manuals.plus/dell/c5522qt-external-control-manual.pdf
  - https://dl.dell.com/manuals/all-products/esuprt_electronics_accessories/esuprt_electronics_accessories_monitor/dell-c5522qt-monitor_Concept-Guide6_en-us.pdf
  - "https://dl.dell.com/manuals/all-products/esuprt_display_projector/esuprt_Display/dell-c8618qt-monitor_Reference%20Guide2_en-us.pdf"
  - https://infohub.delltechnologies.com/static/media/9d015129-d5b7-49d8-8485-b139b9d2b06a.pdf
  - https://downloads.dell.com/topicspdf/command-configure_Reference-Guide4_en-us.pdf
retrieved_at: 2026-06-12T04:54:20.351Z
last_checked_at: 2026-06-12T19:14:41.044Z
generated_at: 2026-06-12T19:14:41.044Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "factory firmware range not stated; no safety/interlock text in source"
  - "source does not expose settable parameters outside of discrete actions"
  - "source does not document unsolicited notifications"
  - "source does not document multi-step sequences"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "firmware compatibility range not stated; OSD language values 6 and 7 names not in source; video input \"0x00000400\" listed as HDMI4 in error (rows conflict) — treated per source row assignment"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:14:41.044Z
  matched_actions: 85
  action_count: 85
  confidence: medium
  summary: "All 85 spec action hex commands found verbatim in source table; transport parameters verified; bidirectional coverage complete. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# DELL C5522QT / C6522QT Control Spec

## Summary
Control spec for Dell C5522QT and C6522QT large-format LCD displays. Devices expose a binary RS-232C interface and a TCP/IP interface (port 4661) carrying the same command/response protocol for monitor management, power, image adjustment, color, video input, OSD, system, and audio control.

<!-- UNRESOLVED: factory firmware range not stated; no safety/interlock text in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 4661
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power on/off/standby commands
- routable        # inferred from video input select commands
- queryable       # inferred from query commands (Get*)
- levelable       # inferred from brightness/contrast/sharpness/volume commands
```

## Actions
```yaml
# Monitor Management
- id: get_monitor_name
  label: Get Monitor Name
  kind: query
  command: "37 51 02 EB 01 8E"
  params: []

- id: get_monitor_serial_number
  label: Get Monitor Serial Number
  kind: query
  command: "37 51 02 EB 02 8D"
  params: []

- id: get_backlight_hours
  label: Get Backlight Hours
  kind: query
  command: "37 51 02 EB 04 8B"
  params: []

# Power Management
- id: get_power_state
  label: Get Power State
  kind: query
  command: "37 51 02 EB 20 AF"
  params: []

- id: set_power_state_off
  label: Set Power State Off
  kind: action
  command: "37 51 03 EA 20 00 AF"
  params: []

- id: set_power_state_on
  label: Set Power State On
  kind: action
  command: "37 51 03 EA 20 01 AE"
  params: []

- id: set_power_state_standby
  label: Set Power State Standby
  kind: action
  command: "37 51 03 EA 20 02 AD"
  params: []

- id: get_power_led
  label: Get Power LED
  kind: query
  command: "37 51 02 EB 21 AE"
  params: []

- id: set_power_led_off_during_active
  label: Set Power LED Off During Active
  kind: action
  command: "37 51 03 EA 21 00 AE"
  params: []

- id: set_power_led_on_during_active
  label: Set Power LED On During Active
  kind: action
  command: "37 51 03 EA 21 01 AF"
  params: []

- id: get_power_usb
  label: Get Power USB
  kind: query
  command: "37 51 02 EB 22 AD"
  params: []

- id: set_power_usb_off_during_standby
  label: Set Power USB Off During Standby
  kind: action
  command: "37 51 03 EA 22 00 AD"
  params: []

- id: set_power_usb_on_during_standby
  label: Set Power USB On During Standby
  kind: action
  command: "37 51 03 EA 22 01 AC"
  params: []

- id: reset_power
  label: Reset Power
  kind: action
  command: "37 51 02 EA 2F A1"
  params: []

# Image Adjustment
- id: get_brightness
  label: Get Brightness
  kind: query
  command: "37 51 02 EB 30 BF"
  params: []

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "37 51 03 EA 30 {value} {chk}"
  params:
    - name: value
      type: integer
      description: Brightness 0-100

- id: set_brightness_step_decrease
  label: Set Brightness Step Decrease
  kind: action
  command: "37 51 03 EA 35 00 BA"
  params: []

- id: set_brightness_step_increase
  label: Set Brightness Step Increase
  kind: action
  command: "37 51 03 EA 35 01 BB"
  params: []

- id: get_contrast
  label: Get Contrast
  kind: query
  command: "37 51 02 EB 31 BE"
  params: []

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "37 51 03 EA 31 {value} {chk}"
  params:
    - name: value
      type: integer
      description: Contrast 0-100

- id: set_contrast_step_decrease
  label: Set Contrast Step Decrease
  kind: action
  command: "37 51 03 EA 36 00 B9"
  params: []

- id: set_contrast_step_increase
  label: Set Contrast Step Increase
  kind: action
  command: "37 51 03 EA 36 01 B8"
  params: []

- id: get_aspect_ratio
  label: Get Aspect Ratio
  kind: query
  command: "37 51 02 EB 33 BC"
  params: []

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  command: "37 51 03 EA 33 {value} {chk}"
  params:
    - name: value
      type: integer
      description: "0=Wide 16:9, 1=Auto Resize, 2=4:3, 3=1:1, 4=5:4"

- id: get_sharpness
  label: Get Sharpness
  kind: query
  command: "37 51 02 EB 34 BB"
  params: []

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "37 51 03 EA 34 {value} {chk}"
  params:
    - name: value
      type: integer
      description: Sharpness 0-100, increments of 10

- id: set_sharpness_step_decrease
  label: Set Sharpness Step Decrease
  kind: action
  command: "37 51 03 EA 37 00 B8"
  params: []

- id: set_sharpness_step_increase
  label: Set Sharpness Step Increase
  kind: action
  command: "37 51 03 EA 37 01 B9"
  params: []

# Color Management
- id: get_color_temp_caps
  label: Get Color Temperature Capabilities
  kind: query
  command: "37 51 02 EB 42 CD"
  params: []

- id: get_color_temp
  label: Get Color Temperature
  kind: query
  command: "37 51 02 EB 43 CC"
  params: []

- id: set_color_temp_5000k
  label: Set Color Temperature 5000K
  kind: action
  command: "37 51 06 EA 43 01 00 00 00 C8"
  params: []

- id: set_color_temp_5700k
  label: Set Color Temperature 5700K
  kind: action
  command: "37 51 06 EA 43 02 00 00 00 CB"
  params: []

- id: set_color_temp_6500k
  label: Set Color Temperature 6500K
  kind: action
  command: "37 51 06 EA 43 04 00 00 00 CD"
  params: []

- id: set_color_temp_7500k
  label: Set Color Temperature 7500K
  kind: action
  command: "37 51 06 EA 43 08 00 00 00 C1"
  params: []

- id: set_color_temp_9300k
  label: Set Color Temperature 9300K
  kind: action
  command: "37 51 06 EA 43 10 00 00 00 D9"
  params: []

- id: set_color_temp_10000k
  label: Set Color Temperature 10000K
  kind: action
  command: "37 51 06 EA 43 20 00 00 00 E9"
  params: []

- id: get_input_color_format
  label: Get Input Color Format
  kind: query
  command: "37 51 02 EB 46 C9"
  params: []

- id: set_input_color_format_rgb
  label: Set Input Color Format RGB
  kind: action
  command: "37 51 03 EA 46 00 C9"
  params: []

- id: set_input_color_format_ypbpr
  label: Set Input Color Format YPbPr
  kind: action
  command: "37 51 03 EA 46 01 C8"
  params: []

- id: get_color_preset_caps
  label: Get Color Preset Capabilities
  kind: query
  command: "37 51 02 EB 47 C8"
  params: []

- id: get_color_preset
  label: Get Color Preset
  kind: query
  command: "37 51 02 EB 48 C7"
  params: []

- id: set_color_preset_standard
  label: Set Color Preset Standard
  kind: action
  command: "37 51 06 EA 48 01 00 00 00 C3"
  params: []

- id: set_color_preset_comfortview
  label: Set Color Preset ComfortView
  kind: action
  command: "37 51 06 EA 48 00 04 00 00 C6"
  params: []

- id: set_color_preset_custom
  label: Set Color Preset Custom
  kind: action
  command: "37 51 06 EA 48 80 00 00 00 42"
  params: []

- id: set_color_preset_color_temp
  label: Set Color Preset Color Temp
  kind: action
  command: "37 51 06 EA 48 20 00 00 00 E2"
  params: []

- id: get_custom_color
  label: Get Custom Color
  kind: query
  command: "37 51 03 EB 49 C7"
  params: []

- id: set_custom_color_gain
  label: Set Custom Color Gain
  kind: action
  command: "37 51 06 EA 49 00 {R} {G} {B} {chk}"
  params:
    - name: R
      type: integer
      description: Red gain 0-100
    - name: G
      type: integer
      description: Green gain 0-100
    - name: B
      type: integer
      description: Blue gain 0-100

- id: reset_color
  label: Reset Color
  kind: action
  command: "37 51 02 EA 4F C1"
  params: []

# Video Input Management
- id: get_auto_select
  label: Get Auto Select
  kind: query
  command: "37 51 02 EB 60 EF"
  params: []

- id: set_auto_select_off
  label: Set Auto Select Off
  kind: action
  command: "37 51 03 EA 60 00 EF"
  params: []

- id: set_auto_select_on
  label: Set Auto Select On
  kind: action
  command: "37 51 03 EA 60 01 EE"
  params: []

- id: get_video_input_caps
  label: Get Video Input Capabilities
  kind: query
  command: "37 51 02 EB 61 EE"
  params: []

- id: get_video_input
  label: Get Video Input
  kind: query
  command: "37 51 02 EB 62 ED"
  params: []

- id: set_video_input_hdmi1
  label: Set Video Input HDMI1
  kind: action
  command: "37 51 06 EA 62 01 00 00 00 E9"
  params: []

- id: set_video_input_hdmi2
  label: Set Video Input HDMI2
  kind: action
  command: "37 51 06 EA 62 02 00 00 00 EA"
  params: []

- id: set_video_input_hdmi3
  label: Set Video Input HDMI3
  kind: action
  command: "37 51 06 EA 62 04 00 00 00 EC"
  params: []

- id: set_video_input_hdmi4
  label: Set Video Input HDMI4
  kind: action
  command: "37 51 06 EA 62 00 04 00 00 EC"
  params: []

- id: set_video_input_dp1
  label: Set Video Input DP1
  kind: action
  command: "37 51 06 EA 62 08 00 00 00 E0"
  params: []

- id: set_video_input_usb_c
  label: Set Video Input USB-C
  kind: action
  command: "37 51 06 EA 62 00 10 00 00 F8"
  params: []

# OSD Management
- id: get_osd_transparency
  label: Get OSD Transparency
  kind: query
  command: "37 51 02 EB 80 0F"
  params: []

- id: set_osd_transparency
  label: Set OSD Transparency
  kind: action
  command: "37 51 03 EA 80 {value} {chk}"
  params:
    - name: value
      type: integer
      description: OSD transparency 0-100

- id: get_osd_language
  label: Get OSD Language
  kind: query
  command: "37 51 02 EB 81 0E"
  params: []

- id: set_osd_language
  label: Set OSD Language
  kind: action
  command: "37 51 03 EA 81 {value} {chk}"
  params:
    - name: value
      type: integer
      description: "0=English, 1=Español, 2=Français, 3=Deutsch, 4=Português (Brasil), 5=Русский, 6=, 7="

- id: get_osd_timer
  label: Get OSD Timer
  kind: query
  command: "37 51 02 EB 83 0C"
  params: []

- id: set_osd_timer
  label: Set OSD Timer
  kind: action
  command: "37 51 03 EA 83 {value} {chk}"
  params:
    - name: value
      type: integer
      description: OSD timer 5-60 seconds

- id: get_osd_button_lock
  label: Get OSD Button Lock
  kind: query
  command: "37 51 02 EB 84 0B"
  params: []

- id: set_osd_button_lock_unlock
  label: Set OSD Button Lock Unlock
  kind: action
  command: "37 51 03 EA 84 00 0B"
  params: []

- id: set_osd_button_lock_lock
  label: Set OSD Button Lock Lock
  kind: action
  command: "37 51 03 EA 84 01 0A"
  params: []

- id: reset_osd
  label: Reset OSD
  kind: action
  command: "37 51 03 EA 8F 01 01"
  params: []

# System Management
- id: get_version_firmware
  label: Get Firmware Version
  kind: query
  command: "37 51 02 EB A0 2F"
  params: []

- id: get_ddcci
  label: Get DDC/CI
  kind: query
  command: "37 51 02 EB A2 2D"
  params: []

- id: set_ddcci_enable
  label: Set DDC/CI Enable
  kind: action
  command: "37 51 03 EA A2 01 2C"
  params: []

- id: set_ddcci_disable
  label: Set DDC/CI Disable
  kind: action
  command: "37 51 03 EA A2 00 2D"
  params: []

- id: get_lcd_conditioning
  label: Get LCD Conditioning
  kind: query
  command: "37 51 02 EB A3 2C"
  params: []

- id: set_lcd_conditioning_disable
  label: Set LCD Conditioning Disable
  kind: action
  command: "37 51 03 EA A3 00 2C"
  params: []

- id: set_lcd_conditioning_enable
  label: Set LCD Conditioning Enable
  kind: action
  command: "37 51 03 EA A3 01 2D"
  params: []

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "37 51 02 EA AF 21"
  params: []

# Audio Management
- id: get_volume
  label: Get Volume
  kind: query
  command: "37 51 02 EB B0 3F"
  params: []

- id: set_volume
  label: Set Volume
  kind: action
  command: "37 51 03 EA B0 {value} {chk}"
  params:
    - name: value
      type: integer
      description: Volume 0-100

- id: set_volume_step_decrease
  label: Set Volume Step Decrease
  kind: action
  command: "37 51 03 EA B3 00 3C"
  params: []

- id: set_volume_step_increase
  label: Set Volume Step Increase
  kind: action
  command: "37 51 03 EA B3 01 3D"
  params: []

- id: get_speaker_mute
  label: Get Speaker Mute
  kind: query
  command: "37 51 02 EB B1 3E"
  params: []

- id: set_speaker_mute_unmute
  label: Set Speaker Mute Unmute
  kind: action
  command: "37 51 03 EA B1 00 3E"
  params: []

- id: set_speaker_mute_mute
  label: Set Speaker Mute Mute
  kind: action
  command: "37 51 03 EA B1 01 3F"
  params: []

- id: audio_reset
  label: Audio Reset
  kind: action
  command: "37 51 02 EA BF 31"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on, standby]
- id: power_led
  type: enum
  values: [off_during_active, on_during_active]
- id: power_usb
  type: enum
  values: [off_during_standby, on_during_standby]
- id: brightness
  type: integer
  values: 0-100
- id: contrast
  type: integer
  values: 0-100
- id: sharpness
  type: integer
  values: 0-100
- id: aspect_ratio
  type: enum
  values: [wide_16_9, auto_resize, "4_3", "1_1", "5_4"]
- id: color_temperature
  type: enum
  values: ["5000K", "5700K", "6500K", "7500K", "9300K", "10000K"]
- id: input_color_format
  type: enum
  values: [rgb, ypbpr]
- id: color_preset
  type: enum
  values: [standard, comfortview, custom, color_temp]
- id: auto_select
  type: enum
  values: [off, on]
- id: video_input
  type: enum
  values: [hdmi1, hdmi2, hdmi3, hdmi4, dp1, usb_c]
- id: osd_transparency
  type: integer
  values: 0-100
- id: osd_language
  type: enum
  values: [english, espanol, francais, deutsch, portugues_brasil, russian, lang_6, lang_7]
- id: osd_timer
  type: integer
  values: 5-60
- id: osd_button_lock
  type: enum
  values: [unlock, lock]
- id: ddcci
  type: enum
  values: [disabled, enabled]
- id: lcd_conditioning
  type: enum
  values: [disabled, enabled]
- id: volume
  type: integer
  values: 0-100
- id: speaker_mute
  type: enum
  values: [disabled, enabled]
- id: backlight_hours
  type: integer
  values: 0-65535
```

## Variables
```yaml
# UNRESOLVED: source does not expose settable parameters outside of discrete actions
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes
Protocol uses fixed binary framing: header `37 51`, length byte, R/W byte (`EB`=read, `EA`=write), command byte, 0+ data bytes, then XOR checksum across all preceding bytes. Reply framing uses header `6F 37`, then length, reply (`02`), result code (`00`=success, `01`=timeout, `02`=parameters error, `03`=not connected, `04`=other failure), echo of command, data, checksum. Default IP `10.0.50.100`, TCP port `4661` (fixed). RS-232 uses 9-pin D-Sub, 9600/8-N-1, RXD/TXD/GND only.

<!-- UNRESOLVED: firmware compatibility range not stated; OSD language values 6 and 7 names not in source; video input "0x00000400" listed as HDMI4 in error (rows conflict) — treated per source row assignment -->

## Provenance

```yaml
source_domains:
  - manuals.plus
  - dl.dell.com
  - infohub.delltechnologies.com
  - downloads.dell.com
source_urls:
  - https://manuals.plus/dell/c5522qt-external-control-manual.pdf
  - https://dl.dell.com/manuals/all-products/esuprt_electronics_accessories/esuprt_electronics_accessories_monitor/dell-c5522qt-monitor_Concept-Guide6_en-us.pdf
  - "https://dl.dell.com/manuals/all-products/esuprt_display_projector/esuprt_Display/dell-c8618qt-monitor_Reference%20Guide2_en-us.pdf"
  - https://infohub.delltechnologies.com/static/media/9d015129-d5b7-49d8-8485-b139b9d2b06a.pdf
  - https://downloads.dell.com/topicspdf/command-configure_Reference-Guide4_en-us.pdf
retrieved_at: 2026-06-12T04:54:20.351Z
last_checked_at: 2026-06-12T19:14:41.044Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:14:41.044Z
matched_actions: 85
action_count: 85
confidence: medium
summary: "All 85 spec action hex commands found verbatim in source table; transport parameters verified; bidirectional coverage complete. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "factory firmware range not stated; no safety/interlock text in source"
- "source does not expose settable parameters outside of discrete actions"
- "source does not document unsolicited notifications"
- "source does not document multi-step sequences"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
- "firmware compatibility range not stated; OSD language values 6 and 7 names not in source; video input \"0x00000400\" listed as HDMI4 in error (rows conflict) — treated per source row assignment"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
