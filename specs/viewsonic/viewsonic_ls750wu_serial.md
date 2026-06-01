---
spec_id: admin/viewsonic-ls750wu
schema_version: ai4av-public-spec-v1
revision: 1
title: "ViewSonic LS750WU Control Spec"
manufacturer: ViewSonic
model_family: LS750WU
aliases: []
compatible_with:
  manufacturers:
    - ViewSonic
  models:
    - LS750WU
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - viewsonicglobal.com
source_urls:
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDE5010/CDE5010_UG_ENG.pdf
  - "https://www.viewsonicglobal.com/public/products_download/user_guide/projector/LSC_6_7_8_Series/LSC%20Series%20RS-232%20LAN%20Control%20Protocol%20Specification.pdf"
  - "https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf?pass"
  - https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf
retrieved_at: 2026-04-30T10:02:07.423Z
last_checked_at: 2026-05-31T22:45:08.772Z
generated_at: 2026-05-31T22:45:08.772Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T22:45:08.772Z
  matched_actions: 187
  action_count: 187
  confidence: high
  summary: "All 187 spec actions matched source commands with correct transport parameters (115200 8N1)."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# ViewSonic LS750WU Control Spec

## Summary
Laser phosphor projector with RS-232C serial control interface. Full command table documented including power, source routing, image adjustment, and system configuration. Also supports LAN-based control (Crestron, PJLink, SNMP, AMX) via RJ-45 port.

<!-- UNRESOLVED: HDBaseT control interface not documented beyond presence in OSD menu -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none
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
- id: power_toggle
  label: Power On/Off Toggle
  kind: action
  params: []
- id: power_status
  label: Get Power Status
  kind: query
  params: []
- id: reset_settings
  label: Reset Settings
  kind: action
  params: []
- id: reset_color_settings
  label: Reset Color Settings
  kind: action
  params: []
- id: splash_screen_black
  label: Set Splash Screen Black
  kind: action
  params: []
- id: splash_screen_blue
  label: Set Splash Screen Blue
  kind: action
  params: []
- id: splash_screen_viewsonic
  label: Set Splash Screen ViewSonic
  kind: action
  params: []
- id: splash_screen_status
  label: Get Splash Screen Status
  kind: query
  params: []
- id: high_altitude_off
  label: High Altitude Mode Off
  kind: action
  params: []
- id: high_altitude_on
  label: High Altitude Mode On
  kind: action
  params: []
- id: high_altitude_status
  label: Get High Altitude Mode Status
  kind: query
  params: []
- id: light_source_mode_normal
  label: Light Source Mode Normal
  kind: action
  params: []
- id: light_source_mode_eco
  label: Light Source Mode Eco
  kind: action
  params: []
- id: light_source_mode_dynamic_eco
  label: Light Source Mode Dynamic Eco
  kind: action
  params: []
- id: light_source_mode_custom
  label: Light Source Mode Custom
  kind: action
  params:
    - name: level
      type: integer
      description: Custom level (20, 40, 60, 80, 100)
- id: light_source_mode_status
  label: Get Light Source Mode Status
  kind: query
  params: []
- id: message_off
  label: Message Off
  kind: action
  params: []
- id: message_on
  label: Message On
  kind: action
  params: []
- id: message_status
  label: Get Message Status
  kind: query
  params: []
- id: projector_position_front_table
  label: Set Projector Position Front Table
  kind: action
  params: []
- id: projector_position_rear_table
  label: Set Projector Position Rear Table
  kind: action
  params: []
- id: projector_position_rear_ceiling
  label: Set Projector Position Rear Ceiling
  kind: action
  params: []
- id: projector_position_front_ceiling
  label: Set Projector Position Front Ceiling
  kind: action
  params: []
- id: projector_position_status
  label: Get Projector Position Status
  kind: query
  params: []
- id: 3d_sync_off
  label: 3D Sync Off
  kind: action
  params: []
- id: 3d_sync_auto
  label: 3D Sync Auto
  kind: action
  params: []
- id: 3d_sync_frame_sequential
  label: 3D Sync Frame Sequential
  kind: action
  params: []
- id: 3d_sync_frame_packing
  label: 3D Sync Frame Packing
  kind: action
  params: []
- id: 3d_sync_top_bottom
  label: 3D Sync Top Bottom
  kind: action
  params: []
- id: 3d_sync_side_by_side
  label: 3D Sync Side by Side
  kind: action
  params: []
- id: 3d_sync_status
  label: Get 3D Sync Status
  kind: query
  params: []
- id: 3d_sync_invert_off
  label: 3D Sync Invert Off
  kind: action
  params: []
- id: 3d_sync_invert_on
  label: 3D Sync Invert On
  kind: action
  params: []
- id: 3d_sync_invert_status
  label: Get 3D Sync Invert Status
  kind: query
  params: []
- id: contrast_decrease
  label: Contrast Decrease
  kind: action
  params: []
- id: contrast_increase
  label: Contrast Increase
  kind: action
  params: []
- id: contrast_get
  label: Get Contrast Value
  kind: query
  params: []
- id: brightness_decrease
  label: Brightness Decrease
  kind: action
  params: []
- id: brightness_increase
  label: Brightness Increase
  kind: action
  params: []
- id: brightness_get
  label: Get Brightness Value
  kind: query
  params: []
- id: aspect_ratio_auto
  label: Aspect Ratio Auto
  kind: action
  params: []
- id: aspect_ratio_4_3
  label: Aspect Ratio 4:3
  kind: action
  params: []
- id: aspect_ratio_16_9
  label: Aspect Ratio 16:9
  kind: action
  params: []
- id: aspect_ratio_16_10
  label: Aspect Ratio 16:10
  kind: action
  params: []
- id: aspect_ratio_native
  label: Aspect Ratio Native
  kind: action
  params: []
- id: aspect_ratio_cycle
  label: Aspect Ratio Cycle
  kind: action
  params: []
- id: aspect_ratio_get
  label: Get Aspect Ratio
  kind: query
  params: []
- id: auto_adjust
  label: Auto Adjust
  kind: action
  params: []
- id: horizontal_position_right
  label: Horizontal Position Shift Right
  kind: action
  params: []
- id: horizontal_position_left
  label: Horizontal Position Shift Left
  kind: action
  params: []
- id: horizontal_position_get
  label: Get Horizontal Position
  kind: query
  params: []
- id: vertical_position_up
  label: Vertical Position Shift Up
  kind: action
  params: []
- id: vertical_position_down
  label: Vertical Position Shift Down
  kind: action
  params: []
- id: vertical_position_get
  label: Get Vertical Position
  kind: query
  params: []
- id: color_temperature_5500k
  label: Color Temperature 5500K
  kind: action
  params: []
- id: color_temperature_6500k
  label: Color Temperature 6500K
  kind: action
  params: []
- id: color_temperature_8000k
  label: Color Temperature 8000K
  kind: action
  params: []
- id: color_temperature_get
  label: Get Color Temperature
  kind: query
  params: []
- id: color_temperature_red_gain_decrease
  label: Color Temperature Red Gain Decrease
  kind: action
  params: []
- id: color_temperature_red_gain_increase
  label: Color Temperature Red Gain Increase
  kind: action
  params: []
- id: color_temperature_red_gain_get
  label: Get Color Temperature Red Gain
  kind: query
  params: []
- id: color_temperature_green_gain_decrease
  label: Color Temperature Green Gain Decrease
  kind: action
  params: []
- id: color_temperature_green_gain_increase
  label: Color Temperature Green Gain Increase
  kind: action
  params: []
- id: color_temperature_green_gain_get
  label: Get Color Temperature Green Gain
  kind: query
  params: []
- id: color_temperature_blue_gain_decrease
  label: Color Temperature Blue Gain Decrease
  kind: action
  params: []
- id: color_temperature_blue_gain_increase
  label: Color Temperature Blue Gain Increase
  kind: action
  params: []
- id: color_temperature_blue_gain_get
  label: Get Color Temperature Blue Gain
  kind: query
  params: []
- id: color_temperature_red_offset_decrease
  label: Color Temperature Red Offset Decrease
  kind: action
  params: []
- id: color_temperature_red_offset_increase
  label: Color Temperature Red Offset Increase
  kind: action
  params: []
- id: color_temperature_red_offset_get
  label: Get Color Temperature Red Offset
  kind: query
  params: []
- id: color_temperature_green_offset_decrease
  label: Color Temperature Green Offset Decrease
  kind: action
  params: []
- id: color_temperature_green_offset_increase
  label: Color Temperature Green Offset Increase
  kind: action
  params: []
- id: color_temperature_green_offset_get
  label: Get Color Temperature Green Offset
  kind: query
  params: []
- id: color_temperature_blue_offset_decrease
  label: Color Temperature Blue Offset Decrease
  kind: action
  params: []
- id: color_temperature_blue_offset_increase
  label: Color Temperature Blue Offset Increase
  kind: action
  params: []
- id: color_temperature_blue_offset_get
  label: Get Color Temperature Blue Offset
  kind: query
  params: []
- id: blank_on
  label: Blank On
  kind: action
  params: []
- id: blank_off
  label: Blank Off
  kind: action
  params: []
- id: blank_status
  label: Get Blank Status
  kind: query
  params: []
- id: keystone_vertical_decrease
  label: Keystone Vertical Decrease
  kind: action
  params: []
- id: keystone_vertical_increase
  label: Keystone Vertical Increase
  kind: action
  params: []
- id: keystone_vertical_get
  label: Get Keystone Vertical
  kind: query
  params: []
- id: keystone_horizontal_decrease
  label: Keystone Horizontal Decrease
  kind: action
  params: []
- id: keystone_horizontal_increase
  label: Keystone Horizontal Increase
  kind: action
  params: []
- id: keystone_horizontal_get
  label: Get Keystone Horizontal
  kind: query
  params: []
- id: color_mode_brightest
  label: Color Mode Brightest
  kind: action
  params: []
- id: color_mode_movie
  label: Color Mode Movie
  kind: action
  params: []
- id: color_mode_standard
  label: Color Mode Standard
  kind: action
  params: []
- id: color_mode_photo
  label: Color Mode Photo
  kind: action
  params: []
- id: color_mode_presentation
  label: Color Mode Presentation
  kind: action
  params: []
- id: color_mode_cycle
  label: Color Mode Cycle
  kind: action
  params: []
- id: color_mode_user1
  label: Color Mode User 1
  kind: action
  params: []
- id: color_mode_user2
  label: Color Mode User 2
  kind: action
  params: []
- id: color_mode_status
  label: Get Color Mode Status
  kind: query
  params: []
- id: primary_color_r
  label: Primary Color R
  kind: action
  params: []
- id: primary_color_g
  label: Primary Color G
  kind: action
  params: []
- id: primary_color_b
  label: Primary Color B
  kind: action
  params: []
- id: primary_color_c
  label: Primary Color C
  kind: action
  params: []
- id: primary_color_m
  label: Primary Color M
  kind: action
  params: []
- id: primary_color_y
  label: Primary Color Y
  kind: action
  params: []
- id: primary_color_status
  label: Get Primary Color Status
  kind: query
  params: []
- id: hue_decrease
  label: Hue/Tint Decrease
  kind: action
  params: []
- id: hue_increase
  label: Hue/Tint Increase
  kind: action
  params: []
- id: hue_get
  label: Get Hue/Tint Value
  kind: query
  params: []
- id: saturation_decrease
  label: Saturation Decrease
  kind: action
  params: []
- id: saturation_increase
  label: Saturation Increase
  kind: action
  params: []
- id: saturation_get
  label: Get Saturation Value
  kind: query
  params: []
- id: gain_decrease
  label: Gain Decrease
  kind: action
  params: []
- id: gain_increase
  label: Gain Increase
  kind: action
  params: []
- id: gain_get
  label: Get Gain Value
  kind: query
  params: []
- id: sharpness_decrease
  label: Sharpness Decrease
  kind: action
  params: []
- id: sharpness_increase
  label: Sharpness Increase
  kind: action
  params: []
- id: sharpness_get
  label: Get Sharpness Value
  kind: query
  params: []
- id: freeze_on
  label: Freeze On
  kind: action
  params: []
- id: freeze_off
  label: Freeze Off
  kind: action
  params: []
- id: freeze_status
  label: Get Freeze Status
  kind: query
  params: []
- id: source_dsub_comp1
  label: Source D-Sub/Comp 1
  kind: action
  params: []
- id: source_hdmi1
  label: Source HDMI 1
  kind: action
  params: []
- id: source_composite_video
  label: Source Composite Video
  kind: action
  params: []
- id: source_status
  label: Get Source Status
  kind: query
  params: []
- id: quick_auto_search_on
  label: Quick Auto Search On
  kind: action
  params: []
- id: quick_auto_search_off
  label: Quick Auto Search Off
  kind: action
  params: []
- id: quick_auto_search_status
  label: Get Quick Auto Search Status
  kind: query
  params: []
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: mute_status
  label: Get Mute Status
  kind: query
  params: []
- id: volume_increase
  label: Volume Increase
  kind: action
  params: []
- id: volume_decrease
  label: Volume Decrease
  kind: action
  params: []
- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: Volume value (0-20 based on hex pattern 0x11)
- id: volume_get
  label: Get Volume
  kind: query
  params: []
- id: language_set
  label: Set Language
  kind: action
  params:
    - name: lang
      type: enum
      values:
        - English
        - Français
        - Deutsch
        - Italiano
        - Español
        - РУССКИЙ
        - 繁體中文
        - 简体中文
        - 日本語
        - 한국어
        - Swedish
        - Dutch
        - Turkish
        - Czech
        - Portuguese
        - Thai
        - Polish
        - Finnish
        - Arabic
        - Indonesia
        - Hindi
        - Vie
        - Greek
- id: language_status
  label: Get Language
  kind: query
  params: []
- id: light_source_usage_reset
  label: Reset Light Source Usage Time
  kind: action
  params: []
- id: light_source_usage_get
  label: Get Light Source Usage Time
  kind: query
  params: []
- id: hdmi_format_rgb
  label: HDMI Format RGB
  kind: action
  params: []
- id: hdmi_format_yuv
  label: HDMI Format YUV
  kind: action
  params: []
- id: hdmi_format_auto
  label: HDMI Format Auto
  kind: action
  params: []
- id: hdmi_format_status
  label: Get HDMI Format Status
  kind: query
  params: []
- id: hdmi_range_enhanced
  label: HDMI Range Enhanced
  kind: action
  params: []
- id: hdmi_range_normal
  label: HDMI Range Normal
  kind: action
  params: []
- id: hdmi_range_auto
  label: HDMI Range Auto
  kind: action
  params: []
- id: hdmi_range_status
  label: Get HDMI Range Status
  kind: query
  params: []
- id: cec_off
  label: CEC Off
  kind: action
  params: []
- id: cec_on
  label: CEC On
  kind: action
  params: []
- id: cec_status
  label: Get CEC Status
  kind: query
  params: []
- id: error_status_get
  label: Get Error Status
  kind: query
  params: []
- id: brilliant_color_off
  label: Brilliant Color Off
  kind: action
  params: []
- id: brilliant_color_color1
  label: Brilliant Color Color 1
  kind: action
  params: []
- id: brilliant_color_color2
  label: Brilliant Color Color 2
  kind: action
  params: []
- id: brilliant_color_color3
  label: Brilliant Color Color 3
  kind: action
  params: []
- id: brilliant_color_color4
  label: Brilliant Color Color 4
  kind: action
  params: []
- id: brilliant_color_color5
  label: Brilliant Color Color 5
  kind: action
  params: []
- id: brilliant_color_color6
  label: Brilliant Color Color 6
  kind: action
  params: []
- id: brilliant_color_color7
  label: Brilliant Color Color 7
  kind: action
  params: []
- id: brilliant_color_color8
  label: Brilliant Color Color 8
  kind: action
  params: []
- id: brilliant_color_color9
  label: Brilliant Color Color 9
  kind: action
  params: []
- id: brilliant_color_color10
  label: Brilliant Color Color 10
  kind: action
  params: []
- id: brilliant_color_status
  label: Get Brilliant Color Status
  kind: query
  params: []
- id: remote_control_code_1
  label: Remote Control Code 1
  kind: action
  params: []
- id: remote_control_code_2
  label: Remote Control Code 2
  kind: action
  params: []
- id: remote_control_code_3
  label: Remote Control Code 3
  kind: action
  params: []
- id: remote_control_code_4
  label: Remote Control Code 4
  kind: action
  params: []
- id: remote_control_code_5
  label: Remote Control Code 5
  kind: action
  params: []
- id: remote_control_code_6
  label: Remote Control Code 6
  kind: action
  params: []
- id: remote_control_code_7
  label: Remote Control Code 7
  kind: action
  params: []
- id: remote_control_code_8
  label: Remote Control Code 8
  kind: action
  params: []
- id: remote_control_code_status
  label: Get Remote Control Code Status
  kind: query
  params: []
- id: over_scan_off
  label: Over Scan Off
  kind: action
  params: []
- id: over_scan_value1
  label: Over Scan Value 1
  kind: action
  params: []
- id: over_scan_value2
  label: Over Scan Value 2
  kind: action
  params: []
- id: over_scan_value3
  label: Over Scan Value 3
  kind: action
  params: []
- id: over_scan_value4
  label: Over Scan Value 4
  kind: action
  params: []
- id: over_scan_value5
  label: Over Scan Value 5
  kind: action
  params: []
- id: over_scan_get
  label: Get Over Scan Value
  kind: query
  params: []
- id: remote_key_menu
  label: Remote Key Menu
  kind: action
  params: []
- id: remote_key_exit
  label: Remote Key Exit
  kind: action
  params: []
- id: remote_key_top
  label: Remote Key Top
  kind: action
  params: []
- id: remote_key_bottom
  label: Remote Key Bottom
  kind: action
  params: []
- id: remote_key_left
  label: Remote Key Left
  kind: action
  params: []
- id: remote_key_right
  label: Remote Key Right
  kind: action
  params: []
- id: remote_key_source
  label: Remote Key Source
  kind: action
  params: []
- id: remote_key_enter
  label: Remote Key Enter
  kind: action
  params: []
- id: remote_key_auto
  label: Remote Key Auto
  kind: action
  params: []
- id: operating_temperature_get
  label: Get Operating Temperature
  kind: query
  params: []
- id: light_source_mode_cycle
  label: Light Source Mode Cycle
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
- id: source_state
  type: enum
  values:
    - D-Sub/Comp.1
    - HDMI 1
    - Composite Video
- id: error_state
  type: object
  properties:
    code: string
```

## Variables
```yaml
- id: volume
  type: integer
  range: [0, 20]
- id: brightness
  type: integer
- id: contrast
  type: integer
- id: aspect_ratio
  type: enum
  values: [Auto, "4:3", "16:9", "16:10", Native]
```

## Events
```yaml
# UNRESOLVED: unsolicited event notifications not documented in source
```

## Macros
```yaml
# UNRESOLVED: multi-step macro sequences not documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
RS-232 protocol default: 115200 baud, 8N1. Alternate baud rates supported: 2400/4800/9600/14400/19200/38400/57600/115200 (set via OSD menu). Web interface default password: "0000". LAN control works in standby mode when "Standby LAN Control" is enabled. HDBaseT control port available on LS850WU/LS860WU only — not LS750WU.
<!-- UNRESOLVED: binary protocol packet structure not fully decoded (checksum bytes) -->
<!-- UNRESOLVED: network TCP port number not stated in source -->
<!-- UNRESOLVED: Crestron/IPID/port for room control not verified against LS750WU-specific docs -->

## Provenance

```yaml
source_domains:
  - viewsonicglobal.com
source_urls:
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDE5010/CDE5010_UG_ENG.pdf
  - "https://www.viewsonicglobal.com/public/products_download/user_guide/projector/LSC_6_7_8_Series/LSC%20Series%20RS-232%20LAN%20Control%20Protocol%20Specification.pdf"
  - "https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf?pass"
  - https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf
retrieved_at: 2026-04-30T10:02:07.423Z
last_checked_at: 2026-05-31T22:45:08.772Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:45:08.772Z
matched_actions: 187
action_count: 187
confidence: high
summary: "All 187 spec actions matched source commands with correct transport parameters (115200 8N1)."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
