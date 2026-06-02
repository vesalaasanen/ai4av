---
spec_id: admin/viewsonic-ifpxx32-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "ViewSonic IFPxx32 Series Control Spec"
manufacturer: ViewSonic
model_family: "IFPxx32 Series"
aliases: []
compatible_with:
  manufacturers:
    - ViewSonic
  models:
    - "IFPxx32 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - viewsonicvsa.freshdesk.com
  - manuals.viewsonic.com
  - reddit.com
  - jarcomputers.com
  - manualslib.com
source_urls:
  - https://viewsonicvsa.freshdesk.com/helpdesk/attachments/43019674572
  - https://manuals.viewsonic.com/IFP32_RS-232_Protocols
  - https://www.reddit.com/r/crestron/comments/dt71d7/correct_rs232_format_for_viewsonic_displays/
  - https://www.jarcomputers.com/images/custom/docs/IFP32-2_UG_ENG-171634801263.pdf
  - https://www.manualslib.com/manual/2312923/Viewsonic-Ifp32-Series.html
retrieved_at: 2026-05-26T23:58:53.141Z
last_checked_at: 2026-05-31T22:44:29.340Z
generated_at: 2026-05-31T22:44:29.340Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is titled \"Projector RS-232/LAN Control Protocol\" and states \"Apply for all projectors\" — applicability to IFPxx32 Series (interactive flat panels) not confirmed in source"
  - "specific IFPxx32 model SKUs not listed in source"
  - "default baud rate not stated; supported rates are 2400/4800/9600/14400/19200/38400/115200"
  - "firmware version compatibility not stated in source"
  - "source lists supported rates (2400/4800/9600/14400/19200/38400/115200) but no default"
  - "not explicitly stated in source"
  - "no unsolicited notification events documented in source"
  - "no multi-step sequences documented in source"
  - "source mentions \"do not perform other commands\" during warm up and cool down"
  - "source document is titled \"Projector RS-232/LAN Control Protocol\" — confirms projector protocol, not IFP panel protocol"
  - "data_bits, parity, stop_bits not explicitly stated in source (only baud rate range listed)"
  - "flow control not stated"
  - "specific model numbers in IFPxx32 series not listed"
  - "AMX discovery response references \"PX800HD\" model — may differ for IFP models"
verification:
  verdict: verified
  checked_at: 2026-05-31T22:44:29.340Z
  matched_actions: 234
  action_count: 234
  confidence: medium
  summary: "All 234 spec actions matched verbatim against source section 3.3 command table; transport port 4661 and serial hardware confirmed; coverage ratio 234/235 exceeds 0.9 floor. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# ViewSonic IFPxx32 Series Control Spec

## Summary

ViewSonic IFPxx32 Series projector/display control via RS-232 serial and LAN (TCP port 4661). Binary protocol using hex byte packets with checksum. Supports Write-Function (set), Read-Function (query), and Execute-Function commands. Extensive command set covering power, input selection, image adjustments, 3D settings, audio, and system management.

<!-- UNRESOLVED: source document is titled "Projector RS-232/LAN Control Protocol" and states "Apply for all projectors" — applicability to IFPxx32 Series (interactive flat panels) not confirmed in source -->
<!-- UNRESOLVED: specific IFPxx32 model SKUs not listed in source -->
<!-- UNRESOLVED: default baud rate not stated; supported rates are 2400/4800/9600/14400/19200/38400/115200 -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 4661  # LAN control port stated in Note 2
serial:
  baud_rate: null  # UNRESOLVED: source lists supported rates (2400/4800/9600/14400/19200/38400/115200) but no default
  data_bits: null  # UNRESOLVED: not explicitly stated in source
  parity: null  # UNRESOLVED: not explicitly stated in source
  stop_bits: null  # UNRESOLVED: not explicitly stated in source
  connector: DSUB 9-Pin Male
  cable: crossover (null modem) required
  pins: "TX, RX, GND only (3-pin)"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from power on/off commands
  - queryable    # inferred from extensive read-function query commands
  - routable     # inferred from source input select commands
  - levelable    # inferred from brightness, contrast, volume, hue, saturation, gain, sharpness controls
```

## Actions
```yaml
# Binary protocol. Write commands: 0x06 0x14 0x00 0x04 0x00 0x34 <group> <param> <value> <checksum>
# Read commands: 0x07 0x14 0x00 0x05 0x00 0x34 0x00 0x00 <group> <param> <checksum>
# Execute commands: 0x02 0x14 0x00 0x04 0x00 0x34 <group> <param> <value> <checksum>
# Ack response: 0x03 0x14 0x00 0x00 0x00 0x14
# Read response: 1-byte or 2-byte data format (see §3.2.1 / §3.2.2)
# LAN: same format, replace "0x" with "\" via port 4661

# --- Power ---

- id: power_on
  label: Power On
  kind: action
  hex: "06 14 00 04 00 34 11 00 00 5D"

- id: power_off
  label: Power Off
  kind: action
  hex: "06 14 00 04 00 34 11 01 00 5E"

- id: power_status_query
  label: Power Status Query
  kind: query
  hex: "07 14 00 05 00 34 00 00 11 00 5E"
  response: 1-byte (0x00=off, 0x01=on)

- id: projector_status_query
  label: Projector Status Query
  kind: query
  hex: "07 14 00 05 00 34 00 00 11 26 84"
  response: 1-byte (0x01=warm up, 0x02=cool down, 0x00=power off, 0x03=power on)

- id: quick_power_off_on
  label: Quick Power Off ON
  kind: action
  hex: "06 14 00 04 00 34 11 0B 01 69"

- id: quick_power_off_off
  label: Quick Power Off OFF
  kind: action
  hex: "06 14 00 04 00 34 11 0B 00 68"

- id: quick_power_off_status
  label: Quick Power Off Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 11 0B 69"

# --- Reset ---

- id: reset_all_settings
  label: Reset All Settings
  kind: action
  hex: "06 14 00 04 00 34 11 02 00 5F"

- id: reset_color_settings
  label: Reset Color Settings
  kind: action
  hex: "06 14 00 04 00 34 11 2A 00 87"

# --- Splash Screen ---

- id: splash_screen_black
  label: Splash Screen Black
  kind: action
  hex: "06 14 00 04 00 34 11 0A 00 67"

- id: splash_screen_blue
  label: Splash Screen Blue
  kind: action
  hex: "06 14 00 04 00 34 11 0A 01 68"

- id: splash_screen_viewsonic
  label: Splash Screen ViewSonic
  kind: action
  hex: "06 14 00 04 00 34 11 0A 02 69"

- id: splash_screen_capture
  label: Splash Screen Capture
  kind: action
  hex: "06 14 00 04 00 34 11 0A 03 6A"

- id: splash_screen_off
  label: Splash Screen OFF
  kind: action
  hex: "06 14 00 04 00 34 11 0A 04 6B"

- id: splash_screen_status
  label: Splash Screen Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 11 0A 68"

# --- High Altitude Mode ---

- id: high_altitude_off
  label: High Altitude Mode OFF
  kind: action
  hex: "06 14 00 04 00 34 11 0C 00 69"

- id: high_altitude_on
  label: High Altitude Mode ON
  kind: action
  hex: "06 14 00 04 00 34 11 0C 01 6A"

- id: high_altitude_status
  label: High Altitude Mode Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 11 0C 6A"

# --- Light Source Mode ---

- id: light_source_normal
  label: Light Source Mode Normal
  kind: action
  hex: "06 14 00 04 00 34 11 10 00 6D"

- id: light_source_eco
  label: Light Source Mode Eco
  kind: action
  hex: "06 14 00 04 00 34 11 10 01 6E"

- id: light_source_dynamic_eco
  label: Light Source Mode Dynamic Eco
  kind: action
  hex: "06 14 00 04 00 34 11 10 02 6F"

- id: light_source_supereco
  label: Light Source Mode SuperEco
  kind: action
  hex: "06 14 00 04 00 34 11 10 03 70"

- id: light_source_mode_status
  label: Light Source Mode Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 11 10 6E"

- id: lamp_mode_cycle
  label: Lamp Mode Cycle
  kind: action
  hex: "06 14 00 04 00 34 13 36 00 95"

# --- Message ---

- id: message_off
  label: Message OFF
  kind: action
  hex: "06 14 00 04 00 34 11 27 00 84"

- id: message_on
  label: Message ON
  kind: action
  hex: "06 14 00 04 00 34 11 27 01 85"

- id: message_status
  label: Message Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 11 27 85"

# --- Projector Position ---

- id: position_front_table
  label: Projector Position Front Table
  kind: action
  hex: "06 14 00 04 00 34 12 00 00 5E"

- id: position_rear_table
  label: Projector Position Rear Table
  kind: action
  hex: "06 14 00 04 00 34 12 00 01 5F"

- id: position_rear_ceiling
  label: Projector Position Rear Ceiling
  kind: action
  hex: "06 14 00 04 00 34 12 00 02 60"

- id: position_front_ceiling
  label: Projector Position Front Ceiling
  kind: action
  hex: "06 14 00 04 00 34 12 00 03 61"

- id: position_status
  label: Projector Position Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 00 5F"

# --- 3D Sync ---

- id: 3d_sync_off
  label: 3D Sync OFF
  kind: action
  hex: "06 14 00 04 00 34 12 20 00 7E"

- id: 3d_sync_auto
  label: 3D Sync Auto
  kind: action
  hex: "06 14 00 04 00 34 12 20 01 7F"

- id: 3d_sync_frame_sequential
  label: 3D Sync Frame Sequential
  kind: action
  hex: "06 14 00 04 00 34 12 20 02 80"

- id: 3d_sync_frame_packing
  label: 3D Sync Frame Packing
  kind: action
  hex: "06 14 00 04 00 34 12 20 03 81"

- id: 3d_sync_top_bottom
  label: 3D Sync Top Bottom
  kind: action
  hex: "06 14 00 04 00 34 12 20 04 82"

- id: 3d_sync_side_by_side
  label: 3D Sync Side by Side
  kind: action
  hex: "06 14 00 04 00 34 12 20 05 83"

- id: 3d_sync_status
  label: 3D Sync Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 20 7F"

- id: 3d_sync_invert_off
  label: 3D Sync Invert OFF
  kind: action
  hex: "06 14 00 04 00 34 12 21 00 7F"

- id: 3d_sync_invert_on
  label: 3D Sync Invert ON
  kind: action
  hex: "06 14 00 04 00 34 12 21 01 80"

- id: 3d_sync_invert_status
  label: 3D Sync Invert Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 21 80"

# --- Image Adjustments ---

- id: contrast_decrease
  label: Contrast Decrease
  kind: action
  hex: "06 14 00 04 00 34 12 02 00 60"

- id: contrast_increase
  label: Contrast Increase
  kind: action
  hex: "06 14 00 04 00 34 12 02 01 61"

- id: contrast_get
  label: Contrast Get Value
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 02 61"
  response: 2-byte value (see §3.2.2)

- id: brightness_decrease
  label: Brightness Decrease
  kind: action
  hex: "06 14 00 04 00 34 12 03 00 61"

- id: brightness_increase
  label: Brightness Increase
  kind: action
  hex: "06 14 00 04 00 34 12 03 01 62"

- id: brightness_get
  label: Brightness Get Value
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 03 62"
  response: 2-byte value (see §3.2.2)

- id: sharpness_decrease
  label: Sharpness Decrease
  kind: action
  hex: "06 14 00 04 00 34 12 0E 00 6C"

- id: sharpness_increase
  label: Sharpness Increase
  kind: action
  hex: "06 14 00 04 00 34 12 0E 01 6D"

- id: sharpness_get
  label: Sharpness Get Value
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 0E 6D"
  response: 2-byte value (see §3.2.2)

- id: hue_decrease
  label: Hue / Tint Decrease
  kind: action
  hex: "06 14 00 04 00 34 12 11 00 6F"

- id: hue_increase
  label: Hue / Tint Increase
  kind: action
  hex: "06 14 00 04 00 34 12 11 01 70"

- id: hue_get
  label: Hue / Tint Get Value
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 11 70"
  response: 2-byte value (see §3.2.2)

- id: saturation_decrease
  label: Saturation Decrease
  kind: action
  hex: "06 14 00 04 00 34 12 12 00 70"

- id: saturation_increase
  label: Saturation Increase
  kind: action
  hex: "06 14 00 04 00 34 12 12 01 71"

- id: saturation_get
  label: Saturation Get Value
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 12 71"
  response: 2-byte value (see §3.2.2)

- id: gain_decrease
  label: Gain Decrease
  kind: action
  hex: "06 14 00 04 00 34 12 13 00 71"

- id: gain_increase
  label: Gain Increase
  kind: action
  hex: "06 14 00 04 00 34 12 13 01 72"

- id: gain_get
  label: Gain Get Value
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 13 72"
  response: 2-byte value (see §3.2.2)

# --- Aspect Ratio ---

- id: aspect_auto
  label: Aspect Ratio Auto
  kind: action
  hex: "06 14 00 04 00 34 12 04 00 62"

- id: aspect_4_3
  label: Aspect Ratio 4:3
  kind: action
  hex: "06 14 00 04 00 34 12 04 02 64"

- id: aspect_16_9
  label: Aspect Ratio 16:9
  kind: action
  hex: "06 14 00 04 00 34 12 04 03 65"

- id: aspect_16_10
  label: Aspect Ratio 16:10
  kind: action
  hex: "06 14 00 04 00 34 12 04 04 66"

- id: aspect_anamorphic
  label: Aspect Ratio Anamorphic
  kind: action
  hex: "06 14 00 04 00 34 12 04 05 67"

- id: aspect_wide
  label: Aspect Ratio Wide
  kind: action
  hex: "06 14 00 04 00 34 12 04 06 68"

- id: aspect_2_35_1
  label: Aspect Ratio 2.35:1
  kind: action
  hex: "06 14 00 04 00 34 12 04 07 69"

- id: aspect_panorama
  label: Aspect Ratio Panorama
  kind: action
  hex: "06 14 00 04 00 34 12 04 08 6A"

- id: aspect_native
  label: Aspect Ratio Native
  kind: action
  hex: "06 14 00 04 00 34 12 04 09 6B"

- id: aspect_cycle
  label: Aspect Ratio Cycle
  kind: action
  hex: "06 14 00 04 00 34 13 31 00 90"

- id: aspect_status
  label: Aspect Ratio Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 04 63"

# --- Position Adjustments ---

- id: auto_adjust
  label: Auto Adjust
  kind: action
  hex: "06 14 00 04 00 34 12 05 00 63"

- id: h_position_right
  label: Horizontal Position Shift Right
  kind: action
  hex: "06 14 00 04 00 34 12 06 01 65"

- id: h_position_left
  label: Horizontal Position Shift Left
  kind: action
  hex: "06 14 00 04 00 34 12 06 00 64"

- id: h_position_get
  label: Horizontal Position Get Value
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 06 65"
  response: 1-byte value (see §3.2.1)

- id: v_position_up
  label: Vertical Position Shift Up
  kind: action
  hex: "06 14 00 04 00 34 12 07 00 65"

- id: v_position_down
  label: Vertical Position Shift Down
  kind: action
  hex: "06 14 00 04 00 34 12 07 01 66"

- id: v_position_get
  label: Vertical Position Get Value
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 07 66"
  response: 1-byte value (see §3.2.1)

# --- Color Temperature ---

- id: color_temp_warm
  label: Color Temperature Warm
  kind: action
  hex: "06 14 00 04 00 34 12 08 00 66"

- id: color_temp_normal
  label: Color Temperature Normal
  kind: action
  hex: "06 14 00 04 00 34 12 08 01 67"

- id: color_temp_neutral
  label: Color Temperature Neutral
  kind: action
  hex: "06 14 00 04 00 34 12 08 02 68"

- id: color_temp_cool
  label: Color Temperature Cool
  kind: action
  hex: "06 14 00 04 00 34 12 08 03 69"

- id: color_temp_status
  label: Color Temperature Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 08 67"

# --- Blank ---

- id: blank_on
  label: Blank ON
  kind: action
  hex: "06 14 00 04 00 34 12 09 01 68"

- id: blank_off
  label: Blank OFF
  kind: action
  hex: "06 14 00 04 00 34 12 09 00 67"

- id: blank_status
  label: Blank Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 09 68"

# --- Keystone ---

- id: keystone_v_decrease
  label: Keystone Vertical Decrease
  kind: action
  hex: "06 14 00 04 00 34 12 0A 00 68"

- id: keystone_v_increase
  label: Keystone Vertical Increase
  kind: action
  hex: "06 14 00 04 00 34 12 0A 01 69"

- id: keystone_v_get
  label: Keystone Vertical Get Value
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 0A 69"
  response: 1-byte value (see §3.2.1)

- id: keystone_h_decrease
  label: Keystone Horizontal Decrease
  kind: action
  hex: "06 14 00 04 00 34 11 31 00 8E"

- id: keystone_h_increase
  label: Keystone Horizontal Increase
  kind: action
  hex: "06 14 00 04 00 34 11 31 01 8F"

- id: keystone_h_get
  label: Keystone Horizontal Get Value
  kind: query
  hex: "07 14 00 05 00 34 00 00 11 31 8F"
  response: 1-byte value (see §3.2.1)

# --- Color Mode ---

- id: color_mode_brightest
  label: Color Mode Brightest
  kind: action
  hex: "06 14 00 04 00 34 12 0B 00 69"

- id: color_mode_movie
  label: Color Mode Movie
  kind: action
  hex: "06 14 00 04 00 34 12 0B 01 6A"

- id: color_mode_standard
  label: Color Mode Standard
  kind: action
  hex: "06 14 00 04 00 34 12 0B 04 6D"

- id: color_mode_srgb
  label: Color Mode sRGB / ViewMatch
  kind: action
  hex: "06 14 00 04 00 34 12 0B 05 6E"

- id: color_mode_dynamic
  label: Color Mode Dynamic
  kind: action
  hex: "06 14 00 04 00 34 12 0B 08 71"

- id: color_mode_rec709
  label: Color Mode Rec709
  kind: action
  hex: "06 14 00 04 00 34 12 0B 09 72"

- id: color_mode_dicom_sim
  label: Color Mode DICOM SIM
  kind: action
  hex: "06 14 00 04 00 34 12 0B 0A 73"

- id: color_mode_sports
  label: Color Mode Sports
  kind: action
  hex: "06 14 00 04 00 34 12 0B 11 7A"

- id: color_mode_photo
  label: Color Mode Photo
  kind: action
  hex: "06 14 00 04 00 34 12 0B 13 7C"

- id: color_mode_presentation
  label: Color Mode Presentation
  kind: action
  hex: "06 14 00 04 00 34 12 0B 14 7D"

- id: color_mode_gaming
  label: Color Mode Gaming
  kind: action
  hex: "06 14 00 04 00 34 12 0B 12 7B"

- id: color_mode_vivid
  label: Color Mode Vivid
  kind: action
  hex: "06 14 00 04 00 34 12 0B 15 7E"

- id: color_mode_isf_day
  label: Color Mode ISF Day
  kind: action
  hex: "06 14 00 04 00 34 12 0B 16 7F"

- id: color_mode_isf_night
  label: Color Mode ISF Night
  kind: action
  hex: "06 14 00 04 00 34 12 0B 17 80"

- id: color_mode_cycle
  label: Color Mode Cycle
  kind: action
  hex: "06 14 00 04 00 34 13 33 00 92"

- id: color_mode_status
  label: Color Mode Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 0B 6A"

# --- ISF Mode ---

- id: isf_mode_on
  label: ISF Mode ON
  kind: action
  hex: "06 14 00 04 00 34 12 38 01 97"

- id: isf_mode_off
  label: ISF Mode OFF
  kind: action
  hex: "06 14 00 04 00 34 12 38 00 96"

- id: isf_mode_status
  label: ISF Mode Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 38 97"

# --- HDR ---

- id: hdr_auto
  label: HDR Auto
  kind: action
  hex: "06 14 00 04 00 34 12 39 00 97"

- id: hdr_sdr
  label: HDR SDR
  kind: action
  hex: "06 14 00 04 00 34 12 39 01 98"

- id: hdr_status
  label: HDR Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 39 98"

# --- Primary Color ---

- id: primary_color_r
  label: Primary Color R
  kind: action
  hex: "06 14 00 04 00 34 12 10 00 6E"

- id: primary_color_g
  label: Primary Color G
  kind: action
  hex: "06 14 00 04 00 34 12 10 01 6F"

- id: primary_color_b
  label: Primary Color B
  kind: action
  hex: "06 14 00 04 00 34 12 10 02 70"

- id: primary_color_c
  label: Primary Color C
  kind: action
  hex: "06 14 00 04 00 34 12 10 03 71"

- id: primary_color_m
  label: Primary Color M
  kind: action
  hex: "06 14 00 04 00 34 12 10 04 72"

- id: primary_color_y
  label: Primary Color Y
  kind: action
  hex: "06 14 00 04 00 34 12 10 05 73"

- id: primary_color_status
  label: Primary Color Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 10 6F"
  response: 2-byte value (see §3.2.2)

# --- Freeze ---

- id: freeze_on
  label: Freeze ON
  kind: action
  hex: "06 14 00 04 00 34 13 00 01 60"

- id: freeze_off
  label: Freeze OFF
  kind: action
  hex: "06 14 00 04 00 34 13 00 00 5F"

- id: freeze_status
  label: Freeze Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 13 00 60"
  response: 1-byte value (see §3.2.1)

# --- Source Input ---

- id: source_dsub_comp1
  label: Source D-Sub / Comp. 1
  kind: action
  hex: "06 14 00 04 00 34 13 01 00 60"

- id: source_dsub_comp2
  label: Source D-Sub / Comp. 2
  kind: action
  hex: "06 14 00 04 00 34 13 01 08 68"

- id: source_hdmi1
  label: Source HDMI 1
  kind: action
  hex: "06 14 00 04 00 34 13 01 03 63"

- id: source_hdmi2
  label: Source HDMI 2
  kind: action
  hex: "06 14 00 04 00 34 13 01 07 67"

- id: source_hdmi3
  label: Source HDMI 3
  kind: action
  hex: "06 14 00 04 00 34 13 01 09 69"

- id: source_hdmi_mhl4
  label: Source HDMI / MHL 4
  kind: action
  hex: "06 14 00 04 00 34 13 01 0E 6E"

- id: source_composite
  label: Source Composite Video
  kind: action
  hex: "06 14 00 04 00 34 13 01 05 65"

- id: source_svideo
  label: Source S-Video
  kind: action
  hex: "06 14 00 04 00 34 13 01 06 66"

- id: source_dvi
  label: Source DVI
  kind: action
  hex: "06 14 00 04 00 34 13 01 0A 6A"

- id: source_component
  label: Source Component
  kind: action
  hex: "06 14 00 04 00 34 13 01 0B 6B"

- id: source_hdbaset
  label: Source HDBaseT
  kind: action
  hex: "06 14 00 04 00 34 13 01 0C 6C"

- id: source_usb_c
  label: Source USB-C
  kind: action
  hex: "06 14 00 04 00 34 13 01 0F 6F"

- id: source_usb_reader
  label: Source USB Reader
  kind: action
  hex: "06 14 00 04 00 34 13 01 1A 7A"

- id: source_lan_wifi
  label: Source LAN / WiFi Display
  kind: action
  hex: "06 14 00 04 00 34 13 01 1B 7B"

- id: source_usb_display
  label: Source USB Display
  kind: action
  hex: "06 14 00 04 00 34 13 01 1C 7C"

- id: source_status
  label: Source Input Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 13 01 61"

# --- Quick Auto Search ---

- id: auto_search_on
  label: Quick Auto Search ON
  kind: action
  hex: "06 14 00 04 00 34 13 02 01 62"

- id: auto_search_off
  label: Quick Auto Search OFF
  kind: action
  hex: "06 14 00 04 00 34 13 02 00 61"

- id: auto_search_status
  label: Quick Auto Search Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 13 02 62"

# --- Audio ---

- id: mute_on
  label: Mute ON
  kind: action
  hex: "06 14 00 04 00 34 14 00 01 61"

- id: mute_off
  label: Mute OFF
  kind: action
  hex: "06 14 00 04 00 34 14 00 00 60"

- id: mute_status
  label: Mute Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 14 00 61"

- id: volume_increase
  label: Volume Increase
  kind: action
  hex: "06 14 00 04 00 34 14 01 00 61"

- id: volume_decrease
  label: Volume Decrease
  kind: action
  hex: "06 14 00 04 00 34 14 02 00 62"

- id: volume_set
  label: Volume Set Value
  kind: action
  hex: "06 14 00 04 00 34 13 2A 11 9A"
  params:
    - name: value
      type: integer
      description: Volume level

- id: volume_get
  label: Volume Get Value
  kind: query
  hex: "07 14 00 05 00 34 00 00 14 03 64"
  response: 1-byte value (see §3.2.1)

- id: audio_mode_cycle
  label: Audio Mode Cycle
  kind: action
  hex: "06 14 00 04 00 34 13 35 00 94"

# --- Language ---

- id: language_english
  label: Language English
  kind: action
  hex: "06 14 00 04 00 34 15 00 00 61"

- id: language_french
  label: Language Francais
  kind: action
  hex: "06 14 00 04 00 34 15 00 01 62"

- id: language_german
  label: Language Deutsch
  kind: action
  hex: "06 14 00 04 00 34 15 00 02 63"

- id: language_italian
  label: Language Italiano
  kind: action
  hex: "06 14 00 04 00 34 15 00 03 64"

- id: language_spanish
  label: Language Espanol
  kind: action
  hex: "06 14 00 04 00 34 15 00 04 65"

- id: language_russian
  label: Language Russian
  kind: action
  hex: "06 14 00 04 00 34 15 00 05 66"

- id: language_trad_chinese
  label: Language Traditional Chinese
  kind: action
  hex: "06 14 00 04 00 34 15 00 06 67"

- id: language_simp_chinese
  label: Language Simplified Chinese
  kind: action
  hex: "06 14 00 04 00 34 15 00 07 68"

- id: language_japanese
  label: Language Japanese
  kind: action
  hex: "06 14 00 04 00 34 15 00 08 69"

- id: language_korean
  label: Language Korean
  kind: action
  hex: "06 14 00 04 00 34 15 00 09 6A"

- id: language_swedish
  label: Language Swedish
  kind: action
  hex: "06 14 00 04 00 34 15 00 0A 6B"

- id: language_dutch
  label: Language Dutch
  kind: action
  hex: "06 14 00 04 00 34 15 00 0B 6C"

- id: language_turkish
  label: Language Turkish
  kind: action
  hex: "06 14 00 04 00 34 15 00 0C 6D"

- id: language_czech
  label: Language Czech
  kind: action
  hex: "06 14 00 04 00 34 15 00 0D 6E"

- id: language_portuguese
  label: Language Portuguese
  kind: action
  hex: "06 14 00 04 00 34 15 00 0E 6F"

- id: language_thai
  label: Language Thai
  kind: action
  hex: "06 14 00 04 00 34 15 00 0F 70"

- id: language_polish
  label: Language Polish
  kind: action
  hex: "06 14 00 04 00 34 15 00 10 71"

- id: language_finnish
  label: Language Finnish
  kind: action
  hex: "06 14 00 04 00 34 15 00 11 72"

- id: language_arabic
  label: Language Arabic
  kind: action
  hex: "06 14 00 04 00 34 15 00 12 73"

- id: language_indonesian
  label: Language Indonesian
  kind: action
  hex: "06 14 00 04 00 34 15 00 13 74"

- id: language_hindi
  label: Language Hindi
  kind: action
  hex: "06 14 00 04 00 34 15 00 14 75"

- id: language_vietnamese
  label: Language Vietnamese
  kind: action
  hex: "06 14 00 04 00 34 15 00 15 76"

- id: language_status
  label: Language Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 15 00 62"

# --- Light Source Usage ---

- id: light_source_usage_reset
  label: Light Source Usage Time Reset
  kind: action
  hex: "06 14 00 04 00 34 15 01 00 62"

- id: light_source_usage_get
  label: Light Source Usage Time Get
  kind: query
  hex: "07 14 00 05 00 34 00 00 15 01 63"
  response: 4-byte value (Byte7-10, HEX2DEC(ddccbbaa) = hours)

# --- HDMI Settings ---

- id: hdmi_format_rgb
  label: HDMI Format RGB
  kind: action
  hex: "06 14 00 04 00 34 11 28 00 85"

- id: hdmi_format_yuv
  label: HDMI Format YUV
  kind: action
  hex: "06 14 00 04 00 34 11 28 01 86"

- id: hdmi_format_auto
  label: HDMI Format Auto
  kind: action
  hex: "06 14 00 04 00 34 11 28 02 87"

- id: hdmi_format_status
  label: HDMI Format Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 11 28 86"

- id: hdmi_range_enhanced
  label: HDMI Range Enhanced
  kind: action
  hex: "06 14 00 04 00 34 11 29 00 86"

- id: hdmi_range_normal
  label: HDMI Range Normal
  kind: action
  hex: "06 14 00 04 00 34 11 29 01 87"

- id: hdmi_range_auto
  label: HDMI Range Auto
  kind: action
  hex: "06 14 00 04 00 34 11 29 02 88"

- id: hdmi_range_status
  label: HDMI Range Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 11 29 87"

# --- CEC ---

- id: cec_off
  label: CEC OFF
  kind: action
  hex: "06 14 00 04 00 34 11 2B 00 88"

- id: cec_on
  label: CEC ON
  kind: action
  hex: "06 14 00 04 00 34 11 2B 01 89"

- id: cec_status
  label: CEC Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 11 2B 89"

# --- Error Status ---

- id: error_status
  label: Error Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 0C 0D 66"
  response: 20-item error status block (see Note 3)

# --- Brilliant Color ---

- id: brilliant_color_off
  label: Brilliant Color OFF
  kind: action
  hex: "06 14 00 04 00 34 12 0F 00 6D"

- id: brilliant_color_1
  label: Brilliant Color 1
  kind: action
  hex: "06 14 00 04 00 34 12 0F 01 6E"

- id: brilliant_color_2
  label: Brilliant Color 2
  kind: action
  hex: "06 14 00 04 00 34 12 0F 02 6F"

- id: brilliant_color_3
  label: Brilliant Color 3
  kind: action
  hex: "06 14 00 04 00 34 12 0F 03 70"

- id: brilliant_color_4
  label: Brilliant Color 4
  kind: action
  hex: "06 14 00 04 00 34 12 0F 04 71"

- id: brilliant_color_5
  label: Brilliant Color 5
  kind: action
  hex: "06 14 00 04 00 34 12 0F 05 72"

- id: brilliant_color_6
  label: Brilliant Color 6
  kind: action
  hex: "06 14 00 04 00 34 12 0F 06 73"

- id: brilliant_color_7
  label: Brilliant Color 7
  kind: action
  hex: "06 14 00 04 00 34 12 0F 07 74"

- id: brilliant_color_8
  label: Brilliant Color 8
  kind: action
  hex: "06 14 00 04 00 34 12 0F 08 75"

- id: brilliant_color_9
  label: Brilliant Color 9
  kind: action
  hex: "06 14 00 04 00 34 12 0F 09 76"

- id: brilliant_color_10
  label: Brilliant Color 10
  kind: action
  hex: "06 14 00 04 00 34 12 0F 0A 77"

- id: brilliant_color_status
  label: Brilliant Color Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 12 0F 6E"

# --- Remote Control Code ---

- id: remote_code_1
  label: Remote Control Code 1
  kind: action
  hex: "06 14 00 04 00 34 0C 48 00 A0"

- id: remote_code_2
  label: Remote Control Code 2
  kind: action
  hex: "06 14 00 04 00 34 0C 48 01 A1"

- id: remote_code_3
  label: Remote Control Code 3
  kind: action
  hex: "06 14 00 04 00 34 0C 48 02 A2"

- id: remote_code_4
  label: Remote Control Code 4
  kind: action
  hex: "06 14 00 04 00 34 0C 48 03 A3"

- id: remote_code_5
  label: Remote Control Code 5
  kind: action
  hex: "06 14 00 04 00 34 0C 48 04 A4"

- id: remote_code_6
  label: Remote Control Code 6
  kind: action
  hex: "06 14 00 04 00 34 0C 48 05 A5"

- id: remote_code_7
  label: Remote Control Code 7
  kind: action
  hex: "06 14 00 04 00 34 0C 48 06 A6"

- id: remote_code_8
  label: Remote Control Code 8
  kind: action
  hex: "06 14 00 04 00 34 0C 48 07 A7"

- id: remote_code_status
  label: Remote Control Code Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 0C 48 A1"

# --- Screen Color ---

- id: screen_color_off
  label: Screen Color OFF
  kind: action
  hex: "06 14 00 04 00 34 11 32 00 8F"

- id: screen_color_blackboard
  label: Screen Color Blackboard
  kind: action
  hex: "06 14 00 04 00 34 11 32 01 90"

- id: screen_color_greenboard
  label: Screen Color Greenboard
  kind: action
  hex: "06 14 00 04 00 34 11 32 02 91"

- id: screen_color_whiteboard
  label: Screen Color Whiteboard
  kind: action
  hex: "06 14 00 04 00 34 11 32 03 92"

- id: screen_color_blueboard
  label: Screen Color Blueboard
  kind: action
  hex: "06 14 00 04 00 34 11 32 04 93"

- id: screen_color_status
  label: Screen Color Status
  kind: query
  hex: "07 14 00 05 00 34 00 00 11 32 90"

# --- Over Scan ---

- id: overscan_off
  label: Over Scan OFF
  kind: action
  hex: "06 14 00 04 00 34 11 33 00 90"

- id: overscan_1
  label: Over Scan Value 1
  kind: action
  hex: "06 14 00 04 00 34 11 33 01 91"

- id: overscan_2
  label: Over Scan Value 2
  kind: action
  hex: "06 14 00 04 00 34 11 33 02 92"

- id: overscan_3
  label: Over Scan Value 3
  kind: action
  hex: "06 14 00 04 00 34 11 33 03 93"

- id: overscan_4
  label: Over Scan Value 4
  kind: action
  hex: "06 14 00 04 00 34 11 33 04 94"

- id: overscan_5
  label: Over Scan Value 5
  kind: action
  hex: "06 14 00 04 00 34 11 33 05 95"

- id: overscan_get
  label: Over Scan Get Value
  kind: query
  hex: "07 14 00 05 00 34 00 00 11 33 91"

# --- Remote Key (Execute-Function) ---

- id: remote_key_menu
  label: Remote Key Menu
  kind: action
  hex: "02 14 00 04 00 34 02 04 0F 61"

- id: remote_key_exit
  label: Remote Key Exit
  kind: action
  hex: "02 14 00 04 00 34 02 04 13 65"

- id: remote_key_top
  label: Remote Key Up
  kind: action
  hex: "02 14 00 04 00 34 02 04 0B 5D"

- id: remote_key_bottom
  label: Remote Key Down
  kind: action
  hex: "02 14 00 04 00 34 02 04 0C 5E"

- id: remote_key_left
  label: Remote Key Left
  kind: action
  hex: "02 14 00 04 00 34 02 04 0D 5F"

- id: remote_key_right
  label: Remote Key Right
  kind: action
  hex: "02 14 00 04 00 34 02 04 0E 60"

- id: remote_key_source
  label: Remote Key Source
  kind: action
  hex: "02 14 00 04 00 34 02 04 04 56"

- id: remote_key_enter
  label: Remote Key Enter
  kind: action
  hex: "02 14 00 04 00 34 02 04 15 67"

- id: remote_key_auto
  label: Remote Key Auto
  kind: action
  hex: "02 14 00 04 00 34 02 04 08 5A"

- id: remote_key_my_button
  label: Remote Key My Button
  kind: action
  hex: "02 14 00 04 00 34 02 04 11 63"

# --- AMX Discovery ---

- id: amx_discovery
  label: AMX Device Discovery
  kind: action
  command: "AMX"
  response: "AMXB<-SDKClass=VideoProjector><-Make=ViewSonic><-Model=PX800HD>"

# --- Operating Temperature ---

- id: operating_temp_get
  label: Operating Temperature Get
  kind: query
  hex: "07 14 00 05 00 34 00 00 15 03 65"
  response: 4-byte value (Byte7-10, HEX2DEC(ddccbbaa)/10 = degrees C)
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  description: Power state from power status query

- id: projector_status
  type: enum
  values: [warm_up, cool_down, power_off, power_on]
  description: Projector operational status

- id: source_input
  type: enum
  values: [dsub_comp1, dsub_comp2, hdmi1, hdmi2, hdmi3, hdmi_mhl4, composite, svideo, dvi, component, hdbaset, usb_c, usb_reader, lan_wifi, usb_display]
  description: Current active source input

- id: mute_state
  type: enum
  values: [off, on]

- id: volume_level
  type: integer
  description: Current volume level (1-byte response)

- id: contrast_value
  type: integer
  description: Contrast level (2-byte response)

- id: brightness_value
  type: integer
  description: Brightness level (2-byte response)

- id: sharpness_value
  type: integer
  description: Sharpness level (2-byte response)

- id: hue_value
  type: integer
  description: Hue/tint level (2-byte response)

- id: saturation_value
  type: integer
  description: Saturation level (2-byte response)

- id: gain_value
  type: integer
  description: Gain level (2-byte response)

- id: light_source_usage_hours
  type: integer
  description: Light source usage time in hours (4-byte response)

- id: operating_temperature
  type: number
  description: Operating temperature in degrees C (4-byte response / 10)

- id: error_status
  type: string
  description: 20-item error status block for service debug
```

## Variables
```yaml
# Volume set via volume_set action
# Contrast, brightness, sharpness, hue, saturation, gain adjusted via increase/decrease actions only (no direct set documented except volume)
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions "do not perform other commands" during warm up and cool down
# states (projector status query response), but no formal interlock procedure documented
```

## Notes
- Binary protocol with checksum byte at end of each packet
- RS-232 connector: DSUB 9-Pin Male on rear panel; requires crossover (null modem) cable
- Only 3 pins needed for control: TX, RX, GND
- Supported baud rates: 2400, 4800, 9600, 14400, 19200, 38400, 115200 (no single default stated)
- LAN control uses same command format with `\` replacing `0x` prefix, via TCP port 4661
- Acknowledgement response for valid Write commands: `0x03 0x14 0x00 0x00 0x00 0x14`
- Response `0x00 0x14 0x00 0x00 0x00 0x14` (first byte 0x00) indicates function is disabled/greyed out
- Read responses use 1-byte format (§3.2.1) or 2-byte format (§3.2.2) depending on command
- Light Source Usage Time: HEX2DEC(ddccbbaa) from bytes 7-10 = hours
- Operating Temperature: HEX2DEC(ddccbbaa) / 10 = degrees C
- HDMI Range: Enhanced = 0-255 steps, Normal = 16-235 steps
- During Warm Up and Cool Down states, other commands should not be sent
- Projector Status command (row 4) only applies to particular models with LAN solution

<!-- UNRESOLVED: source document is titled "Projector RS-232/LAN Control Protocol" — confirms projector protocol, not IFP panel protocol -->
<!-- UNRESOLVED: data_bits, parity, stop_bits not explicitly stated in source (only baud rate range listed) -->
<!-- UNRESOLVED: flow control not stated -->
<!-- UNRESOLVED: specific model numbers in IFPxx32 series not listed -->
<!-- UNRESOLVED: AMX discovery response references "PX800HD" model — may differ for IFP models -->

## Provenance

```yaml
source_domains:
  - viewsonicvsa.freshdesk.com
  - manuals.viewsonic.com
  - reddit.com
  - jarcomputers.com
  - manualslib.com
source_urls:
  - https://viewsonicvsa.freshdesk.com/helpdesk/attachments/43019674572
  - https://manuals.viewsonic.com/IFP32_RS-232_Protocols
  - https://www.reddit.com/r/crestron/comments/dt71d7/correct_rs232_format_for_viewsonic_displays/
  - https://www.jarcomputers.com/images/custom/docs/IFP32-2_UG_ENG-171634801263.pdf
  - https://www.manualslib.com/manual/2312923/Viewsonic-Ifp32-Series.html
retrieved_at: 2026-05-26T23:58:53.141Z
last_checked_at: 2026-05-31T22:44:29.340Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:44:29.340Z
matched_actions: 234
action_count: 234
confidence: medium
summary: "All 234 spec actions matched verbatim against source section 3.3 command table; transport port 4661 and serial hardware confirmed; coverage ratio 234/235 exceeds 0.9 floor. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is titled \"Projector RS-232/LAN Control Protocol\" and states \"Apply for all projectors\" — applicability to IFPxx32 Series (interactive flat panels) not confirmed in source"
- "specific IFPxx32 model SKUs not listed in source"
- "default baud rate not stated; supported rates are 2400/4800/9600/14400/19200/38400/115200"
- "firmware version compatibility not stated in source"
- "source lists supported rates (2400/4800/9600/14400/19200/38400/115200) but no default"
- "not explicitly stated in source"
- "no unsolicited notification events documented in source"
- "no multi-step sequences documented in source"
- "source mentions \"do not perform other commands\" during warm up and cool down"
- "source document is titled \"Projector RS-232/LAN Control Protocol\" — confirms projector protocol, not IFP panel protocol"
- "data_bits, parity, stop_bits not explicitly stated in source (only baud rate range listed)"
- "flow control not stated"
- "specific model numbers in IFPxx32 series not listed"
- "AMX discovery response references \"PX800HD\" model — may differ for IFP models"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
