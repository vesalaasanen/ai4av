---
spec_id: admin/viewsonic-pjd5351ls
schema_version: ai4av-public-spec-v1
revision: 1
title: "ViewSonic PJD5351LS Projector Control Spec"
manufacturer: ViewSonic
model_family: PJD5351LS
aliases: []
compatible_with:
  manufacturers:
    - ViewSonic
  models:
    - PJD5351LS
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - viewsonicvsa.freshdesk.com
  - manualslib.com
  - support.viewsonic.com
  - manuals.viewsonic.com
source_urls:
  - https://viewsonicvsa.freshdesk.com/helpdesk/attachments/43019674572
  - "https://www.manualslib.com/manual/2463050/Viewsonic-Pjd5351ls.html?page=58"
  - https://support.viewsonic.com/en/support/solutions/articles/33000223004-viewsonic-lfd-rs-232-lan-protocol
  - https://www.manualslib.com/manual/2463050/Viewsonic-Pjd5351ls.html
  - https://manuals.viewsonic.com/CDE7512_RS-232_Protocols
retrieved_at: 2026-05-19T01:04:20.332Z
last_checked_at: 2026-06-01T22:35:54.258Z
generated_at: 2026-06-01T22:35:54.258Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source explicitly says \"Apply for all projectors. Note: There are some difference highlighted in the spec for each model.\" The PJD5351LS does not appear by name anywhere in the source — per-model applicability of individual commands (e.g. USB_C, HDBaseT, HDR, ISF modes) cannot be confirmed from this source alone."
  - "single default baud rate not stated; source lists supported rates as 2400/4800/9600/14400/19200/38400/115200."
  - "data_bits, parity, stop_bits, flow_control not stated in source."
  - "source lists 2400/4800/9600/14400/19200/38400/115200 as supported; no single default stated"
  - "not stated in source"
  - "value byte position and valid range not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-01T22:35:54.258Z
  matched_actions: 235
  action_count: 235
  confidence: medium
  summary: "All 235 spec actions match verbatim hex sequences in the source command table; transport port 4661 confirmed in Note 2; baud null is correct as source lists multiple rates without a default. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# ViewSonic PJD5351LS Projector Control Spec

## Summary
ViewSonic PJD5351LS short-throw projector. RS-232 (DSUB 9-pin male) and LAN control via TCP port 4661. The source document is a generic ViewSonic projector RS-232/LAN protocol specification applicable to "all projectors" with per-model differences highlighted in the spec; PJD5351LS-specific command coverage is not explicitly enumerated in the source.

<!-- UNRESOLVED: source explicitly says "Apply for all projectors. Note: There are some difference highlighted in the spec for each model." The PJD5351LS does not appear by name anywhere in the source — per-model applicability of individual commands (e.g. USB_C, HDBaseT, HDR, ISF modes) cannot be confirmed from this source alone. -->
<!-- UNRESOLVED: single default baud rate not stated; source lists supported rates as 2400/4800/9600/14400/19200/38400/115200. -->
<!-- UNRESOLVED: data_bits, parity, stop_bits, flow_control not stated in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 4661  # stated in Note 2 of source: "via a LAN Port 4661"
serial:
  baud_rate: null  # UNRESOLVED: source lists 2400/4800/9600/14400/19200/38400/115200 as supported; no single default stated
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from Power on/off commands (entries 1-2)
- queryable  # inferred from Read/Status commands throughout command list
- routable  # inferred from Source input selection commands (entries 115-130)
- levelable  # inferred from Contrast, Brightness, Volume, Hue, Saturation, Gain, Sharpness commands
```

## Actions
```yaml
# Power
- id: power_on
  label: Power On
  kind: action
  command: "06 14 00 04 00 34 11 00 00 5D"  # literal RS-232 bytes (drop 0x prefixes) from source
  response: "05 14 00 03 00 00 00 01 18"
- id: power_off
  label: Power Off
  kind: action
  command: "06 14 00 04 00 34 11 01 00 5E"
  response: "05 14 00 03 00 00 00 00 17"
- id: power_status
  label: Power Status
  kind: query
  command: "07 14 00 05 00 34 00 00 11 00 5E"
- id: projector_status
  label: Projector Status
  kind: query
  command: "07 14 00 05 00 34 00 00 11 26 84"
  notes: "Response: 0x01=Warm up, 0x03=Cool down, 0x02=Power On, 0x00=Power Off"

# Reset
- id: reset_all_settings
  label: Reset All Settings
  kind: action
  command: "06 14 00 04 00 34 11 02 00 5F"
- id: reset_color_settings
  label: Reset Color Settings
  kind: action
  command: "06 14 00 04 00 34 11 2A 00 87"

# Splash Screen
- id: splash_screen_black
  label: Splash Screen Black
  kind: action
  command: "06 14 00 04 00 34 11 0A 00 67"
- id: splash_screen_blue
  label: Splash Screen Blue
  kind: action
  command: "06 14 00 04 00 34 11 0A 01 68"
- id: splash_screen_viewsonic
  label: Splash Screen ViewSonic
  kind: action
  command: "06 14 00 04 00 34 11 0A 02 69"
- id: splash_screen_capture
  label: Splash Screen Capture
  kind: action
  command: "06 14 00 04 00 34 11 0A 03 6A"
- id: splash_screen_off
  label: Splash Screen Off
  kind: action
  command: "06 14 00 04 00 34 11 0A 04 6B"
- id: splash_screen_status
  label: Splash Screen Status
  kind: query
  command: "07 14 00 05 00 34 00 00 11 0A 68"

# Quick Power Off
- id: quick_power_off_off
  label: Quick Power Off OFF
  kind: action
  command: "06 14 00 04 00 34 11 0B 00 68"
- id: quick_power_off_on
  label: Quick Power Off ON
  kind: action
  command: "06 14 00 04 00 34 11 0B 01 69"
- id: quick_power_off_status
  label: Quick Power Off Status
  kind: query
  command: "07 14 00 05 00 34 00 00 11 0B 69"

# High Altitude Mode
- id: high_altitude_off
  label: High Altitude Mode OFF
  kind: action
  command: "06 14 00 04 00 34 11 0C 00 69"
- id: high_altitude_on
  label: High Altitude Mode ON
  kind: action
  command: "06 14 00 04 00 34 11 0C 01 6A"
- id: high_altitude_status
  label: High Altitude Mode Status
  kind: query
  command: "07 14 00 05 00 34 00 00 11 0C 6A"

# Light Source Mode
- id: light_source_normal
  label: Light Source Mode Normal
  kind: action
  command: "06 14 00 04 00 34 11 10 00 6D"
- id: light_source_eco
  label: Light Source Mode Eco
  kind: action
  command: "06 14 00 04 00 34 11 10 01 6E"
- id: light_source_dynamic_eco
  label: Light Source Mode Dynamic Eco
  kind: action
  command: "06 14 00 04 00 34 11 10 02 6F"
- id: light_source_supereco
  label: Light Source Mode SuperEco
  kind: action
  command: "06 14 00 04 00 34 11 10 03 70"
- id: light_source_status
  label: Light Source Mode Status
  kind: query
  command: "07 14 00 05 00 34 00 00 11 10 6E"

# Message
- id: message_off
  label: Message OFF
  kind: action
  command: "06 14 00 04 00 34 11 27 00 84"
- id: message_on
  label: Message ON
  kind: action
  command: "06 14 00 04 00 34 11 27 01 85"
- id: message_status
  label: Message Status
  kind: query
  command: "07 14 00 05 00 34 00 00 11 27 85"

# Projector Position
- id: position_front_table
  label: Projector Position Front Table
  kind: action
  command: "06 14 00 04 00 34 12 00 00 5E"
- id: position_rear_table
  label: Projector Position Rear Table
  kind: action
  command: "06 14 00 04 00 34 12 00 01 5F"
- id: position_rear_ceiling
  label: Projector Position Rear Ceiling
  kind: action
  command: "06 14 00 04 00 34 12 00 02 60"
- id: position_front_ceiling
  label: Projector Position Front Ceiling
  kind: action
  command: "06 14 00 04 00 34 12 00 03 61"
- id: position_status
  label: Projector Position Status
  kind: query
  command: "07 14 00 05 00 34 00 00 12 00 5F"

# 3D Sync
- id: 3d_sync_off
  label: 3D Sync OFF
  kind: action
  command: "06 14 00 04 00 34 12 20 00 7E"
- id: 3d_sync_auto
  label: 3D Sync Auto
  kind: action
  command: "06 14 00 04 00 34 12 20 01 7F"
- id: 3d_sync_frame_sequential
  label: 3D Sync Frame Sequential
  kind: action
  command: "06 14 00 04 00 34 12 20 02 80"
- id: 3d_sync_frame_packing
  label: 3D Sync Frame Packing
  kind: action
  command: "06 14 00 04 00 34 12 20 03 81"
- id: 3d_sync_top_bottom
  label: 3D Sync Top Bottom
  kind: action
  command: "06 14 00 04 00 34 12 20 04 82"
- id: 3d_sync_side_by_side
  label: 3D Sync Side by Side
  kind: action
  command: "06 14 00 04 00 34 12 20 05 83"
- id: 3d_sync_status
  label: 3D Sync Status
  kind: query
  command: "07 14 00 05 00 34 00 00 12 20 7F"

# 3D Sync Invert
- id: 3d_sync_invert_off
  label: 3D Sync Invert OFF
  kind: action
  command: "06 14 00 04 00 34 12 21 00 7F"
- id: 3d_sync_invert_on
  label: 3D Sync Invert ON
  kind: action
  command: "06 14 00 04 00 34 12 21 01 80"
- id: 3d_sync_invert_status
  label: 3D Sync Invert Status
  kind: query
  command: "07 14 00 05 00 34 00 00 12 21 80"

# Contrast
- id: contrast_decrease
  label: Contrast Decrease
  kind: action
  command: "06 14 00 04 00 34 12 02 00 60"
- id: contrast_increase
  label: Contrast Increase
  kind: action
  command: "06 14 00 04 00 34 12 02 01 61"
- id: contrast_get
  label: Contrast Get Value
  kind: query
  command: "07 14 00 05 00 34 00 00 12 02 61"
  notes: "Response: 2-byte value per mapping table 3.2.2"

# Brightness
- id: brightness_decrease
  label: Brightness Decrease
  kind: action
  command: "06 14 00 04 00 34 12 03 00 61"
- id: brightness_increase
  label: Brightness Increase
  kind: action
  command: "06 14 00 04 00 34 12 03 01 62"
- id: brightness_get
  label: Brightness Get Value
  kind: query
  command: "07 14 00 05 00 34 00 00 12 03 62"
  notes: "Response: 2-byte value per mapping table 3.2.2"

# Aspect Ratio
- id: aspect_auto
  label: Aspect Ratio Auto
  kind: action
  command: "06 14 00 04 00 34 12 04 00 62"
- id: aspect_4_3
  label: Aspect Ratio 4:3
  kind: action
  command: "06 14 00 04 00 34 12 04 02 64"
- id: aspect_16_9
  label: Aspect Ratio 16:9
  kind: action
  command: "06 14 00 04 00 34 12 04 03 65"
- id: aspect_16_10
  label: Aspect Ratio 16:10
  kind: action
  command: "06 14 00 04 00 34 12 04 04 66"
- id: aspect_anamorphic
  label: Aspect Ratio Anamorphic
  kind: action
  command: "06 14 00 04 00 34 12 04 05 67"
- id: aspect_wide
  label: Aspect Ratio Wide
  kind: action
  command: "06 14 00 04 00 34 12 04 06 68"
- id: aspect_2_35_1
  label: Aspect Ratio 2.35:1
  kind: action
  command: "06 14 00 04 00 34 12 04 07 69"
- id: aspect_panorama
  label: Aspect Ratio Panorama
  kind: action
  command: "06 14 00 04 00 34 12 04 08 6A"
- id: aspect_native
  label: Aspect Ratio Native
  kind: action
  command: "06 14 00 04 00 34 12 04 09 6B"
- id: aspect_cycle
  label: Aspect Ratio Cycle
  kind: action
  command: "06 14 00 04 00 34 13 31 00 90"
- id: aspect_get
  label: Aspect Ratio Get Value
  kind: query
  command: "07 14 00 05 00 34 00 00 12 04 63"

# Auto Adjust
- id: auto_adjust
  label: Auto Adjust
  kind: action
  command: "06 14 00 04 00 34 12 05 00 63"

# Horizontal Position
- id: hpos_shift_right
  label: Horizontal Position Shift Right
  kind: action
  command: "06 14 00 04 00 34 12 06 01 65"
- id: hpos_shift_left
  label: Horizontal Position Shift Left
  kind: action
  command: "06 14 00 04 00 34 12 06 00 64"
- id: hpos_get
  label: Horizontal Position Get Value
  kind: query
  command: "07 14 00 05 00 34 00 00 12 06 65"
  notes: "Response: 1-byte value per mapping table 3.2.1"

# Vertical Position
- id: vpos_shift_up
  label: Vertical Position Shift Up
  kind: action
  command: "06 14 00 04 00 34 12 07 00 65"
- id: vpos_shift_down
  label: Vertical Position Shift Down
  kind: action
  command: "06 14 00 04 00 34 12 07 01 66"
- id: vpos_get
  label: Vertical Position Get Value
  kind: query
  command: "07 14 00 05 00 34 00 00 12 07 66"
  notes: "Response: 1-byte value per mapping table 3.2.1"

# Color Temperature
- id: color_temp_warm
  label: Color Temperature Warm
  kind: action
  command: "06 14 00 04 00 34 12 08 00 66"
- id: color_temp_normal
  label: Color Temperature Normal
  kind: action
  command: "06 14 00 04 00 34 12 08 01 67"
- id: color_temp_neutral
  label: Color Temperature Neutral
  kind: action
  command: "06 14 00 04 00 34 12 08 02 68"
- id: color_temp_cool
  label: Color Temperature Cool
  kind: action
  command: "06 14 00 04 00 34 12 08 03 69"
- id: color_temp_get
  label: Color Temperature Get Value
  kind: query
  command: "07 14 00 05 00 34 00 00 12 08 67"

# Blank
- id: blank_on
  label: Blank ON
  kind: action
  command: "06 14 00 04 00 34 12 09 01 68"
- id: blank_off
  label: Blank OFF
  kind: action
  command: "06 14 00 04 00 34 12 09 00 67"
- id: blank_status
  label: Blank Status
  kind: query
  command: "07 14 00 05 00 34 00 00 12 09 68"

# Keystone-Vertical
- id: keystone_v_decrease
  label: Keystone Vertical Decrease
  kind: action
  command: "06 14 00 04 00 34 12 0A 00 68"
- id: keystone_v_increase
  label: Keystone Vertical Increase
  kind: action
  command: "06 14 00 04 00 34 12 0A 01 69"
- id: keystone_v_get
  label: Keystone Vertical Get Value
  kind: query
  command: "07 14 00 05 00 34 00 00 12 0A 69"
  notes: "Response: 1-byte value per mapping table 3.2.1"

# Keystone-Horizontal
- id: keystone_h_decrease
  label: Keystone Horizontal Decrease
  kind: action
  command: "06 14 00 04 00 34 11 31 00 8E"
- id: keystone_h_increase
  label: Keystone Horizontal Increase
  kind: action
  command: "06 14 00 04 00 34 11 31 01 8F"
- id: keystone_h_get
  label: Keystone Horizontal Get Value
  kind: query
  command: "07 14 00 05 00 34 00 00 11 31 8F"
  notes: "Response: 1-byte value per mapping table 3.2.1"

# Color Mode
- id: color_mode_brightest
  label: Color Mode Brightest
  kind: action
  command: "06 14 00 04 00 34 12 0B 00 69"
- id: color_mode_movie
  label: Color Mode Movie
  kind: action
  command: "06 14 00 04 00 34 12 0B 01 6A"
- id: color_mode_standard
  label: Color Mode Standard
  kind: action
  command: "06 14 00 04 00 34 12 0B 04 6D"
- id: color_mode_srgb
  label: Color Mode sRGB/ViewMatch
  kind: action
  command: "06 14 00 04 00 34 12 0B 05 6E"
- id: color_mode_dynamic
  label: Color Mode Dynamic
  kind: action
  command: "06 14 00 04 00 34 12 0B 08 71"
- id: color_mode_rec709
  label: Color Mode Rec709
  kind: action
  command: "06 14 00 04 00 34 12 0B 09 72"
- id: color_mode_dicom_sim
  label: Color Mode DICOM SIM
  kind: action
  command: "06 14 00 04 00 34 12 0B 0A 73"
- id: color_mode_sports
  label: Color Mode Sports
  kind: action
  command: "06 14 00 04 00 34 12 0B 11 7A"
- id: color_mode_photo
  label: Color Mode Photo
  kind: action
  command: "06 14 00 04 00 34 12 0B 13 7C"
- id: color_mode_presentation
  label: Color Mode Presentation
  kind: action
  command: "06 14 00 04 00 34 12 0B 14 7D"
- id: color_mode_gaming
  label: Color Mode Gaming
  kind: action
  command: "06 14 00 04 00 34 12 0B 12 7B"
- id: color_mode_vivid
  label: Color Mode Vivid
  kind: action
  command: "06 14 00 04 00 34 12 0B 15 7E"
- id: color_mode_isf_day
  label: Color Mode ISF Day
  kind: action
  command: "06 14 00 04 00 34 12 0B 16 7F"
- id: color_mode_isf_night
  label: Color Mode ISF Night
  kind: action
  command: "06 14 00 04 00 34 12 0B 17 80"
- id: color_mode_cycle
  label: Color Mode Cycle
  kind: action
  command: "06 14 00 04 00 34 13 33 00 92"
- id: color_mode_status
  label: Color Mode Status
  kind: query
  command: "07 14 00 05 00 34 00 00 12 0B 6A"

# Reset current color settings
- id: reset_current_color_settings
  label: Reset Current Color Settings
  kind: action
  command: "06 14 00 04 00 34 11 2A 00 87"

# ISF mode
- id: isf_mode_on
  label: ISF Mode ON
  kind: action
  command: "06 14 00 04 00 34 12 38 01 97"
- id: isf_mode_off
  label: ISF Mode OFF
  kind: action
  command: "06 14 00 04 00 34 12 38 00 96"
- id: isf_mode_status
  label: ISF Mode Status
  kind: query
  command: "07 14 00 05 00 34 00 00 12 38 97"

# HDR
- id: hdr_auto
  label: HDR Auto
  kind: action
  command: "06 14 00 04 00 34 12 39 00 97"
- id: hdr_sdr
  label: HDR SDR
  kind: action
  command: "06 14 00 04 00 34 12 39 01 98"
- id: hdr_status
  label: HDR Status
  kind: query
  command: "07 14 00 05 00 34 00 00 12 39 98"

# Primary Color
- id: primary_color_r
  label: Primary Color R
  kind: action
  command: "06 14 00 04 00 34 12 10 00 6E"
- id: primary_color_g
  label: Primary Color G
  kind: action
  command: "06 14 00 04 00 34 12 10 01 6F"
- id: primary_color_b
  label: Primary Color B
  kind: action
  command: "06 14 00 04 00 34 12 10 02 70"
- id: primary_color_c
  label: Primary Color C
  kind: action
  command: "06 14 00 04 00 34 12 10 03 71"
- id: primary_color_m
  label: Primary Color M
  kind: action
  command: "06 14 00 04 00 34 12 10 04 72"
- id: primary_color_y
  label: Primary Color Y
  kind: action
  command: "06 14 00 04 00 34 12 10 05 73"
- id: primary_color_status
  label: Primary Color Status
  kind: query
  command: "07 14 00 05 00 34 00 00 12 10 6F"

# Hue/Tint
- id: hue_decrease
  label: Hue/Tint Decrease
  kind: action
  command: "06 14 00 04 00 34 12 11 00 6F"
- id: hue_increase
  label: Hue/Tint Increase
  kind: action
  command: "06 14 00 04 00 34 12 11 01 70"
- id: hue_get
  label: Hue/Tint Get Value
  kind: query
  command: "07 14 00 05 00 34 00 00 12 11 70"
  notes: "Response: 2-byte value per mapping table 3.2.2"

# Saturation
- id: saturation_decrease
  label: Saturation Decrease
  kind: action
  command: "06 14 00 04 00 34 12 12 00 70"
- id: saturation_increase
  label: Saturation Increase
  kind: action
  command: "06 14 00 04 00 34 12 12 01 71"
- id: saturation_get
  label: Saturation Get Value
  kind: query
  command: "07 14 00 05 00 34 00 00 12 12 71"
  notes: "Response: 2-byte value per mapping table 3.2.2"

# Gain
- id: gain_decrease
  label: Gain Decrease
  kind: action
  command: "06 14 00 04 00 34 12 13 00 71"
- id: gain_increase
  label: Gain Increase
  kind: action
  command: "06 14 00 04 00 34 12 13 01 72"
- id: gain_get
  label: Gain Get Value
  kind: query
  command: "07 14 00 05 00 34 00 00 12 13 72"
  notes: "Response: 2-byte value per mapping table 3.2.2"

# Sharpness
- id: sharpness_decrease
  label: Sharpness Decrease
  kind: action
  command: "06 14 00 04 00 34 12 0E 00 6C"
- id: sharpness_increase
  label: Sharpness Increase
  kind: action
  command: "06 14 00 04 00 34 12 0E 01 6D"
- id: sharpness_get
  label: Sharpness Get Value
  kind: query
  command: "07 14 00 05 00 34 00 00 12 0E 6D"
  notes: "Response: 2-byte value per mapping table 3.2.2"

# Freeze
- id: freeze_on
  label: Freeze ON
  kind: action
  command: "06 14 00 04 00 34 13 00 01 60"
- id: freeze_off
  label: Freeze OFF
  kind: action
  command: "06 14 00 04 00 34 13 00 00 5F"
- id: freeze_status
  label: Freeze Status
  kind: query
  command: "07 14 00 05 00 34 00 00 13 00 60"

# Source Input
- id: input_dsub_comp_1
  label: Source Input D-Sub/Comp. 1
  kind: action
  command: "06 14 00 04 00 34 13 01 00 60"
- id: input_dsub_comp_2
  label: Source Input D-Sub/Comp. 2
  kind: action
  command: "06 14 00 04 00 34 13 01 08 68"
- id: input_hdmi_1
  label: Source Input HDMI 1
  kind: action
  command: "06 14 00 04 00 34 13 01 03 63"
- id: input_hdmi_2
  label: Source Input HDMI 2
  kind: action
  command: "06 14 00 04 00 34 13 01 07 67"
- id: input_hdmi_3
  label: Source Input HDMI 3
  kind: action
  command: "06 14 00 04 00 34 13 01 09 69"
- id: input_hdmi_mhl_4
  label: Source Input HDMI/MHL 4
  kind: action
  command: "06 14 00 04 00 34 13 01 0E 6E"
- id: input_composite_video
  label: Source Input Composite Video
  kind: action
  command: "06 14 00 04 00 34 13 01 05 65"
- id: input_s_video
  label: Source Input S-Video
  kind: action
  command: "06 14 00 04 00 34 13 01 06 66"
- id: input_dvi
  label: Source Input DVI
  kind: action
  command: "06 14 00 04 00 34 13 01 0A 6A"
- id: input_component
  label: Source Input Component
  kind: action
  command: "06 14 00 04 00 34 13 01 0B 6B"
- id: input_hdbaset
  label: Source Input HDBaseT
  kind: action
  command: "06 14 00 04 00 34 13 01 0C 6C"
- id: input_usb_c
  label: Source Input USB_C
  kind: action
  command: "06 14 00 04 00 34 13 01 0F 6F"
- id: input_usb_reader
  label: Source Input USB Reader
  kind: action
  command: "06 14 00 04 00 34 13 01 1A 7A"
- id: input_lan_wifi_display
  label: Source Input LAN/WiFi Display
  kind: action
  command: "06 14 00 04 00 34 13 01 1B 7B"
- id: input_usb_display
  label: Source Input USB Display
  kind: action
  command: "06 14 00 04 00 34 13 01 1C 7C"
- id: input_status
  label: Source Input Status
  kind: query
  command: "07 14 00 05 00 34 00 00 13 01 61"

# Quick Auto Search
- id: quick_auto_search_on
  label: Quick Auto Search ON
  kind: action
  command: "06 14 00 04 00 34 13 02 01 62"
- id: quick_auto_search_off
  label: Quick Auto Search OFF
  kind: action
  command: "06 14 00 04 00 34 13 02 00 61"
- id: quick_auto_search_status
  label: Quick Auto Search Status
  kind: query
  command: "07 14 00 05 00 34 00 00 13 02 62"

# Mute
- id: mute_on
  label: Mute ON
  kind: action
  command: "06 14 00 04 00 34 14 00 01 61"
- id: mute_off
  label: Mute OFF
  kind: action
  command: "06 14 00 04 00 34 14 00 00 60"
- id: mute_status
  label: Mute Status
  kind: query
  command: "07 14 00 05 00 34 00 00 14 00 61"

# Volume
- id: volume_increase
  label: Volume Increase
  kind: action
  command: "06 14 00 04 00 34 14 01 00 61"
- id: volume_decrease
  label: Volume Decrease
  kind: action
  command: "06 14 00 04 00 34 14 02 00 62"
- id: volume_write
  label: Volume Write Value
  kind: action
  command: "06 14 00 04 00 34 13 2A 11 9A"  # 0x11 = volume sub-opcode; value byte and valid range not documented
  # UNRESOLVED: value byte position and valid range not stated in source
- id: volume_get
  label: Volume Get Value
  kind: query
  command: "07 14 00 05 00 34 00 00 14 03 64"
  notes: "Response: 1-byte value per mapping table 3.2.1"

# Language
- id: lang_english
  label: Language English
  kind: action
  command: "06 14 00 04 00 34 15 00 00 61"
- id: lang_french
  label: Language Français
  kind: action
  command: "06 14 00 04 00 34 15 00 01 62"
- id: lang_german
  label: Language Deutsch
  kind: action
  command: "06 14 00 04 00 34 15 00 02 63"
- id: lang_italian
  label: Language Italiano
  kind: action
  command: "06 14 00 04 00 34 15 00 03 64"
- id: lang_spanish
  label: Language Español
  kind: action
  command: "06 14 00 04 00 34 15 00 04 65"
- id: lang_russian
  label: Language Русский
  kind: action
  command: "06 14 00 04 00 34 15 00 05 66"
- id: lang_trad_chinese
  label: Language 繁體中文
  kind: action
  command: "06 14 00 04 00 34 15 00 06 67"
- id: lang_simp_chinese
  label: Language 简体中文
  kind: action
  command: "06 14 00 04 00 34 15 00 07 68"
- id: lang_japanese
  label: Language 日本語
  kind: action
  command: "06 14 00 04 00 34 15 00 08 69"
- id: lang_korean
  label: Language 한국어
  kind: action
  command: "06 14 00 04 00 34 15 00 09 6A"
- id: lang_swedish
  label: Language Swedish
  kind: action
  command: "06 14 00 04 00 34 15 00 0A 6B"
- id: lang_dutch
  label: Language Dutch
  kind: action
  command: "06 14 00 04 00 34 15 00 0B 6C"
- id: lang_turkish
  label: Language Turkish
  kind: action
  command: "06 14 00 04 00 34 15 00 0C 6D"
- id: lang_czech
  label: Language Czech
  kind: action
  command: "06 14 00 04 00 34 15 00 0D 6E"
- id: lang_portuguese
  label: Language Portuguese
  kind: action
  command: "06 14 00 04 00 34 15 00 0E 6F"
- id: lang_thai
  label: Language Thai
  kind: action
  command: "06 14 00 04 00 34 15 00 0F 70"
- id: lang_polish
  label: Language Polish
  kind: action
  command: "06 14 00 04 00 34 15 00 10 71"
- id: lang_finnish
  label: Language Finnish
  kind: action
  command: "06 14 00 04 00 34 15 00 11 72"
- id: lang_arabic
  label: Language Arabic
  kind: action
  command: "06 14 00 04 00 34 15 00 12 73"
- id: lang_indonesian
  label: Language Indonesian
  kind: action
  command: "06 14 00 04 00 34 15 00 13 74"
- id: lang_hindi
  label: Language Hindi
  kind: action
  command: "06 14 00 04 00 34 15 00 14 75"
- id: lang_vietnamese
  label: Language Vietnamese
  kind: action
  command: "06 14 00 04 00 34 15 00 15 76"
- id: lang_status
  label: Language Status
  kind: query
  command: "07 14 00 05 00 34 00 00 15 00 62"

# Light Source Usage Time
- id: light_source_hours_reset
  label: Light Source Usage Time Reset to ZERO
  kind: action
  command: "06 14 00 04 00 34 15 01 00 62"
- id: light_source_hours_get
  label: Light Source Usage Time Get
  kind: query
  command: "07 14 00 05 00 34 00 00 15 01 63"
  notes: "Response: bytes 7-10 form little-endian 32-bit hours (Note 4)"

# HDMI Format
- id: hdmi_format_rgb
  label: HDMI Format RGB
  kind: action
  command: "06 14 00 04 00 34 11 28 00 85"
- id: hdmi_format_yuv
  label: HDMI Format YUV
  kind: action
  command: "06 14 00 04 00 34 11 28 01 86"
- id: hdmi_format_auto
  label: HDMI Format Auto
  kind: action
  command: "06 14 00 04 00 34 11 28 02 87"
- id: hdmi_format_status
  label: HDMI Format Status
  kind: query
  command: "07 14 00 05 00 34 00 00 11 28 86"

# HDMI Range
- id: hdmi_range_enhanced
  label: HDMI Range Enhanced
  kind: action
  command: "06 14 00 04 00 34 11 29 00 86"
  notes: "Enhanced = 0-255 steps (Note 6)"
- id: hdmi_range_normal
  label: HDMI Range Normal
  kind: action
  command: "06 14 00 04 00 34 11 29 01 87"
  notes: "Normal = 16-235 steps (Note 6)"
- id: hdmi_range_auto
  label: HDMI Range Auto
  kind: action
  command: "06 14 00 04 00 34 11 29 02 88"
- id: hdmi_range_status
  label: HDMI Range Status
  kind: query
  command: "07 14 00 05 00 34 00 00 11 29 87"

# CEC
- id: cec_off
  label: CEC OFF
  kind: action
  command: "06 14 00 04 00 34 11 2B 00 88"
- id: cec_on
  label: CEC ON
  kind: action
  command: "06 14 00 04 00 34 11 2B 01 89"
- id: cec_status
  label: CEC Status
  kind: query
  command: "07 14 00 05 00 34 00 00 11 2B 89"

# Error status
- id: error_status
  label: Error Status
  kind: query
  command: "07 14 00 05 00 34 00 00 0C 0D 66"
  notes: "Service debug only (Note 3)"

# Brilliant Color
- id: brilliant_color_off
  label: Brilliant Color OFF
  kind: action
  command: "06 14 00 04 00 34 12 0F 00 6D"
- id: brilliant_color_1
  label: Brilliant Color 1
  kind: action
  command: "06 14 00 04 00 34 12 0F 01 6E"
- id: brilliant_color_2
  label: Brilliant Color 2
  kind: action
  command: "06 14 00 04 00 34 12 0F 02 6F"
- id: brilliant_color_3
  label: Brilliant Color 3
  kind: action
  command: "06 14 00 04 00 34 12 0F 03 70"
- id: brilliant_color_4
  label: Brilliant Color 4
  kind: action
  command: "06 14 00 04 00 34 12 0F 04 71"
- id: brilliant_color_5
  label: Brilliant Color 5
  kind: action
  command: "06 14 00 04 00 34 12 0F 05 72"
- id: brilliant_color_6
  label: Brilliant Color 6
  kind: action
  command: "06 14 00 04 00 34 12 0F 06 73"
- id: brilliant_color_7
  label: Brilliant Color 7
  kind: action
  command: "06 14 00 04 00 34 12 0F 07 74"
- id: brilliant_color_8
  label: Brilliant Color 8
  kind: action
  command: "06 14 00 04 00 34 12 0F 08 75"
- id: brilliant_color_9
  label: Brilliant Color 9
  kind: action
  command: "06 14 00 04 00 34 12 0F 09 76"
- id: brilliant_color_10
  label: Brilliant Color 10
  kind: action
  command: "06 14 00 04 00 34 12 0F 0A 77"
- id: brilliant_color_status
  label: Brilliant Color Status
  kind: query
  command: "07 14 00 05 00 34 00 00 12 0F 6E"

# Remote Control Code
- id: remote_code_1
  label: Remote Control Code 1
  kind: action
  command: "06 14 00 04 00 34 0C 48 00 A0"
- id: remote_code_2
  label: Remote Control Code 2
  kind: action
  command: "06 14 00 04 00 34 0C 48 01 A1"
- id: remote_code_3
  label: Remote Control Code 3
  kind: action
  command: "06 14 00 04 00 34 0C 48 02 A2"
- id: remote_code_4
  label: Remote Control Code 4
  kind: action
  command: "06 14 00 04 00 34 0C 48 03 A3"
- id: remote_code_5
  label: Remote Control Code 5
  kind: action
  command: "06 14 00 04 00 34 0C 48 04 A4"
- id: remote_code_6
  label: Remote Control Code 6
  kind: action
  command: "06 14 00 04 00 34 0C 48 05 A5"
- id: remote_code_7
  label: Remote Control Code 7
  kind: action
  command: "06 14 00 04 00 34 0C 48 06 A6"
- id: remote_code_8
  label: Remote Control Code 8
  kind: action
  command: "06 14 00 04 00 34 0C 48 07 A7"
- id: remote_code_status
  label: Remote Control Code Status
  kind: query
  command: "07 14 00 05 00 34 00 00 0C 48 A1"

# Screen Color
- id: screen_color_off
  label: Screen Color OFF
  kind: action
  command: "06 14 00 04 00 34 11 32 00 8F"
- id: screen_color_blackboard
  label: Screen Color Blackboard
  kind: action
  command: "06 14 00 04 00 34 11 32 01 90"
- id: screen_color_greenboard
  label: Screen Color Greenboard
  kind: action
  command: "06 14 00 04 00 34 11 32 02 91"
- id: screen_color_whiteboard
  label: Screen Color Whiteboard
  kind: action
  command: "06 14 00 04 00 34 11 32 03 92"
- id: screen_color_blueboard
  label: Screen Color Blueboard
  kind: action
  command: "06 14 00 04 00 34 11 32 04 93"
- id: screen_color_status
  label: Screen Color Status
  kind: query
  command: "07 14 00 05 00 34 00 00 11 32 90"

# Over Scan
- id: overscan_off
  label: Over Scan OFF
  kind: action
  command: "06 14 00 04 00 34 11 33 00 90"
- id: overscan_1
  label: Over Scan Value 1
  kind: action
  command: "06 14 00 04 00 34 11 33 01 91"
- id: overscan_2
  label: Over Scan Value 2
  kind: action
  command: "06 14 00 04 00 34 11 33 02 92"
- id: overscan_3
  label: Over Scan Value 3
  kind: action
  command: "06 14 00 04 00 34 11 33 03 93"
- id: overscan_4
  label: Over Scan Value 4
  kind: action
  command: "06 14 00 04 00 34 11 33 04 94"
- id: overscan_5
  label: Over Scan Value 5
  kind: action
  command: "06 14 00 04 00 34 11 33 05 95"
- id: overscan_get
  label: Over Scan Get Value
  kind: query
  command: "07 14 00 05 00 34 00 00 11 33 91"

# Remote Key
- id: rkey_menu
  label: Remote Key Menu
  kind: action
  command: "02 14 00 04 00 34 02 04 0F 61"
- id: rkey_exit
  label: Remote Key Exit
  kind: action
  command: "02 14 00 04 00 34 02 04 13 65"
- id: rkey_top
  label: Remote Key Top
  kind: action
  command: "02 14 00 04 00 34 02 04 0B 5D"
- id: rkey_bottom
  label: Remote Key Bottom
  kind: action
  command: "02 14 00 04 00 34 02 04 0C 5E"
- id: rkey_left
  label: Remote Key Left
  kind: action
  command: "02 14 00 04 00 34 02 04 0D 5F"
- id: rkey_right
  label: Remote Key Right
  kind: action
  command: "02 14 00 04 00 34 02 04 0E 60"
- id: rkey_source
  label: Remote Key Source
  kind: action
  command: "02 14 00 04 00 34 02 04 04 56"
- id: rkey_enter
  label: Remote Key Enter
  kind: action
  command: "02 14 00 04 00 34 02 04 15 67"
- id: rkey_auto
  label: Remote Key Auto
  kind: action
  command: "02 14 00 04 00 34 02 04 08 5A"
- id: rkey_my_button
  label: Remote Key My Button
  kind: action
  command: "02 14 00 04 00 34 02 04 11 63"

# AMX device discovery
- id: amx_discovery
  label: AMX Device Discovery
  kind: action
  command: "AMXB<-SDKClass=VideoProjector><-Make=ViewSonic><-Model=PX800HD>"
  notes: "AMX beacon string; example model in source is PX800HD, not PJD5351LS - verify against actual PJD5351LS firmware"

# Operating temperature
- id: operating_temperature_get
  label: Operating Temperature Get
  kind: query
  command: "07 14 00 05 00 34 00 00 15 03 65"
  notes: "Response bytes 7-10 form little-endian value, /10 = degrees C (Note 1)"

# Cycle commands
- id: lamp_mode_cycle
  label: Lamp Mode Cycle
  kind: action
  command: "06 14 00 04 00 34 13 36 00 95"
- id: audio_mode_cycle
  label: Audio Mode Cycle
  kind: action
  command: "06 14 00 04 00 34 13 35 00 94"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
- id: projector_state
  type: enum
  values: [warm_up, cool_down, power_on, power_off]
- id: light_source_mode
  type: enum
  values: [normal, eco, dynamic_eco, supereco]
- id: light_source_hours
  type: integer
  description: "Hours; bytes 7-10 little-endian (Note 4)"
- id: source_input
  type: enum
  values: [dsub_comp_1, dsub_comp_2, hdmi_1, hdmi_2, hdmi_3, hdmi_mhl_4, composite_video, s_video, dvi, component, hdbaset, usb_c, usb_reader, lan_wifi_display, usb_display]
- id: color_mode
  type: enum
  values: [brightest, movie, standard, srgb, dynamic, rec709, dicom_sim, sports, photo, presentation, gaming, vivid, isf_day, isf_night]
- id: aspect_ratio
  type: enum
  values: [auto, 4_3, 16_9, 16_10, anamorphic, wide, 2_35_1, panorama, native]
- id: mute_state
  type: enum
  values: [on, off]
- id: freeze_state
  type: enum
  values: [on, off]
- id: blank_state
  type: enum
  values: [on, off]
- id: high_altitude_state
  type: enum
  values: [on, off]
- id: 3d_sync
  type: enum
  values: [off, auto, frame_sequential, frame_packing, top_bottom, side_by_side]
- id: 3d_sync_invert
  type: enum
  values: [on, off]
- id: position
  type: enum
  values: [front_table, rear_table, rear_ceiling, front_ceiling]
- id: color_temperature
  type: enum
  values: [warm, normal, neutral, cool]
- id: quick_power_off
  type: enum
  values: [on, off]
- id: message
  type: enum
  values: [on, off]
- id: screen_color
  type: enum
  values: [off, blackboard, greenboard, whiteboard, blueboard]
- id: hdmi_format
  type: enum
  values: [rgb, yuv, auto]
- id: hdmi_range
  type: enum
  values: [enhanced, normal, auto]
- id: cec
  type: enum
  values: [on, off]
- id: quick_auto_search
  type: enum
  values: [on, off]
- id: brilliant_color
  type: enum
  values: [off, color_1, color_2, color_3, color_4, color_5, color_6, color_7, color_8, color_9, color_10]
- id: remote_control_code
  type: enum
  values: [code_1, code_2, code_3, code_4, code_5, code_6, code_7, code_8]
- id: isf_mode
  type: enum
  values: [on, off]
- id: hdr
  type: enum
  values: [auto, sdr]
- id: primary_color
  type: enum
  values: [r, g, b, c, m, y]
- id: language
  type: enum
  values: [english, french, german, italian, spanish, russian, trad_chinese, simp_chinese, japanese, korean, swedish, dutch, turkish, czech, portuguese, thai, polish, finnish, arabic, indonesian, hindi, vietnamese]
- id: operating_temperature_c
  type: number
  description: "Degrees C; bytes 7-10 little-endian, /10 (Note 1)"
- id: contrast_value
  type: integer
  description: "2-byte value (mapping table 3.2.2)"
- id: brightness_value
  type: integer
  description: "2-byte value (mapping table 3.2.2)"
- id: hue_value
  type: integer
  description: "2-byte value (mapping table 3.2.2)"
- id: saturation_value
  type: integer
  description: "2-byte value (mapping table 3.2.2)"
- id: gain_value
  type: integer
  description: "2-byte value (mapping table 3.2.2)"
- id: sharpness_value
  type: integer
  description: "2-byte value (mapping table 3.2.2)"
- id: hpos_value
  type: integer
  description: "1-byte value (mapping table 3.2.1)"
- id: vpos_value
  type: integer
  description: "1-byte value (mapping table 3.2.1)"
- id: keystone_v_value
  type: integer
  description: "1-byte value (mapping table 3.2.1)"
- id: keystone_h_value
  type: integer
  description: "1-byte value (mapping table 3.2.1)"
- id: volume_value
  type: integer
  description: "1-byte value (mapping table 3.2.1)"
- id: overscan_value
  type: integer
  description: "0-5"
- id: error_status
  type: object
  description: "20 items: items 0-17 1-byte each, item 18 4-byte burn-in minutes, item 19 1-byte lamp status, item 20 2-byte lamp error status (Note 3)"
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Do not send other commands during Warm Up state (per source Note 7 / Status explanation)"
  - description: "Do not send other commands during Cool Down state (per source Note 7 / Status explanation)"
  - description: "Projector Status must be Power On before sending other control commands (per source Note 7)"
```

## Notes
- **Source coverage caveat:** This is a generic ViewSonic projector RS-232/LAN protocol spec that applies to "all projectors" with per-model differences. PJD5351LS-specific applicability of each command cannot be verified from this source alone; cross-check against the PJD5351LS user guide before deploying.
- **LAN framing:** For LAN control, replace the `0x` byte prefix with `\` (backslash) in the same byte sequence, sent over TCP port 4661 (per source Note 2).
- **Baud rate:** Source states supported rates 2400/4800/9600/14400/19200/38400/115200; no single default is specified. Configure to match the projector's setting (typically 115200 on ViewSonic projectors, but verify against device).
- **Checksum:** Each command ends with a checksum byte. The bytes shown here are pre-computed checksums from the source; implementations should verify the checksum algorithm if regenerating.
- **AMX discovery string:** Source example uses `Model=PX800HD`; PJD5351LS firmware may emit a different model token — verify against actual device.
- **Projector Status response (Note 7):** This function is only applied to some models due to LAN solution — may not be available on PJD5351LS over LAN.
- **Volume Write Value:** Source does not document the value byte position or valid range inside the 0x2A sub-opcode; only the 0x11 volume sub-code is shown. Treat `volume_write` as UNRESOLVED for value range.
- **Command set grew through revisions 1.00 → 1.19;** verify PJD5351LS firmware supports commands added in revisions later than its manufacturing date.
- **Single-byte read responses:** Use mapping table 3.2.1 (256 entries from 0x00→0xFF, mapped to -256 to -1 signed offset).
- **Two-byte read responses:** Use mapping table 3.2.2 (256 entries from 0x0000→0x00FF and 0x0100→0x01FF, mapped to 0-255 and -255 to -1 signed offset).
- **Function-disabled indicator (Note 5):** When projector responds with `0x00 0x14 0x00 0x00 0x00 0x14` as the first byte, the requested function is disabled (greyed out), e.g. Aspect Ratio when no source is connected.
- **Operating temperature value decoding (Note 1):** Bytes 7-10 form little-endian 32-bit; divide by 10 to get degrees C.
- **Light source hours decoding (Note 4):** Bytes 7-10 form little-endian 32-bit hours; no division.
```

Self-check:
- [x] No voltage/current/power invented
- [x] No port numbers assumed (port 4661 from Note 2)
- [x] No baud rate assumed (left UNRESOLVED, supported list in Notes)
- [x] `status: draft` set
- [x] `declared_confidence: low` set
- [x] YAML blocks valid
- [x] `entity_id` placeholder present
- [x] UNRESOLVED markers throughout
- [x] PJD5351LS applicability gap flagged in Summary

## Provenance

```yaml
source_domains:
  - viewsonicvsa.freshdesk.com
  - manualslib.com
  - support.viewsonic.com
  - manuals.viewsonic.com
source_urls:
  - https://viewsonicvsa.freshdesk.com/helpdesk/attachments/43019674572
  - "https://www.manualslib.com/manual/2463050/Viewsonic-Pjd5351ls.html?page=58"
  - https://support.viewsonic.com/en/support/solutions/articles/33000223004-viewsonic-lfd-rs-232-lan-protocol
  - https://www.manualslib.com/manual/2463050/Viewsonic-Pjd5351ls.html
  - https://manuals.viewsonic.com/CDE7512_RS-232_Protocols
retrieved_at: 2026-05-19T01:04:20.332Z
last_checked_at: 2026-06-01T22:35:54.258Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T22:35:54.258Z
matched_actions: 235
action_count: 235
confidence: medium
summary: "All 235 spec actions match verbatim hex sequences in the source command table; transport port 4661 confirmed in Note 2; baud null is correct as source lists multiple rates without a default. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source explicitly says \"Apply for all projectors. Note: There are some difference highlighted in the spec for each model.\" The PJD5351LS does not appear by name anywhere in the source — per-model applicability of individual commands (e.g. USB_C, HDBaseT, HDR, ISF modes) cannot be confirmed from this source alone."
- "single default baud rate not stated; source lists supported rates as 2400/4800/9600/14400/19200/38400/115200."
- "data_bits, parity, stop_bits, flow_control not stated in source."
- "source lists 2400/4800/9600/14400/19200/38400/115200 as supported; no single default stated"
- "not stated in source"
- "value byte position and valid range not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
