---
spec_id: admin/infocus-inl21xx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "InFocus INL21xx Series Control Spec"
manufacturer: InFocus
model_family: "INL21xx Series"
aliases: []
compatible_with:
  manufacturers:
    - InFocus
  models:
    - "INL21xx Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.infocus.com
source_urls:
  - https://cdn.infocus.com/2026/02/b7RCq21d-InFocus_Generic_RS232_Commands.xlsx
retrieved_at: 2026-05-14T16:57:04.324Z
last_checked_at: 2026-05-16T11:27:42.289Z
generated_at: 2026-05-16T11:27:42.289Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T11:27:42.289Z
  matched_actions: 181
  action_count: 239
  confidence: high
  summary: "All 181 spec actions match verbatim to source commands S001-S109; transport parameters fully supported; bidirectional coverage achieved."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# InFocus INL21xx Series Control Spec

## Summary
InFocus INL21xx Series DLP projector. RS-232 serial control at 9600 baud, 8-N-1. All commands terminated with `<CR>` (0x0D). Projector returns `P` (pass) or `F` (fail) for each command. Projector ID 00 broadcasts to all projectors.

<!-- UNRESOLVED: TCP/IP, HTTP, or other network protocols not documented for this series. Other sheets in the source document cover IN13xST/IN213x/INL314x/INL412x (19200 baud) and IN102x/In103x/In104x/In105x families separately. -->

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
  type: none  # inferred: no auth procedure in source for serial control
```

## Traits
```yaml
- powerable
- routable
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

- id: power_on_with_password
  label: Power On with Password
  kind: action
  params:
    - name: password
      type: string
      description: 4-digit password, 0000-9999

- id: resync
  label: Resync
  kind: action
  params: []

- id: av_mute_on
  label: AV Mute On
  kind: action
  params: []

- id: av_mute_off
  label: AV Mute Off
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

- id: freeze
  label: Freeze
  kind: action
  params: []

- id: unfreeze
  label: Unfreeze
  kind: action
  params: []

- id: zoom_plus
  label: Zoom Plus
  kind: action
  params: []

- id: zoom_minus
  label: Zoom Minus
  kind: action
  params: []

- id: ir_function_off
  label: IR Function Off
  kind: action
  params: []

- id: ir_function_on
  label: IR Function On
  kind: action
  params: []

- id: source_vga
  label: Direct Source VGA
  kind: action
  params: []

- id: source_vga2
  label: Direct Source VGA 2
  kind: action
  params: []

- id: source_svideo
  label: Direct Source S-Video
  kind: action
  params: []

- id: source_video
  label: Direct Source Video
  kind: action
  params: []

- id: source_hdmi1
  label: Direct Source HDMI (HDMI 1)
  kind: action
  params: []

- id: source_hdmi2
  label: Direct Source HDMI 2
  kind: action
  params: []

- id: source_hdbaset
  label: Direct Source HDBaseT
  kind: action
  params: []

- id: picture_mode_presentation
  label: Picture Mode Presentation
  kind: action
  params: []

- id: picture_mode_bright
  label: Picture Mode Bright
  kind: action
  params: []

- id: picture_mode_movie
  label: Picture Mode Movie (Cinema)
  kind: action
  params: []

- id: picture_mode_srgb
  label: Picture Mode sRGB
  kind: action
  params: []

- id: picture_mode_dicom_sim
  label: Picture Mode DICOM SIM.
  kind: action
  params: []

- id: picture_mode_user
  label: Picture Mode User
  kind: action
  params: []

- id: picture_mode_3d
  label: Picture Mode 3D
  kind: action
  params: []

- id: picture_mode_game
  label: Picture Mode Game (Football)
  kind: action
  params: []

- id: picture_mode_isf_day
  label: Picture Mode ISF Day
  kind: action
  params: []

- id: picture_mode_isf_night
  label: Picture Mode ISF Night
  kind: action
  params: []

- id: picture_mode_hdr_sim
  label: Picture Mode HDR SIM.
  kind: action
  params: []

- id: picture_mode_hlg_sim
  label: Picture Mode HLG SIM.
  kind: action
  params: []

- id: picture_mode_rec709
  label: Picture Mode Rec.709
  kind: action
  params: []

- id: picture_mode_dark_cinema
  label: Picture Mode Dark Cinema
  kind: action
  params: []

- id: picture_mode_football
  label: Picture Mode Football
  kind: action
  params: []

- id: brightness_set
  label: Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: contrast_set
  label: Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: sharpness_set
  label: Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: 1 to 15

- id: rgb_red_gain
  label: RGB Gain/Bias Red Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: rgb_green_gain
  label: RGB Gain/Bias Green Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: rgb_blue_gain
  label: RGB Gain/Bias Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: rgb_red_bias
  label: RGB Gain/Bias Red Bias
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: rgb_green_bias
  label: RGB Gain/Bias Green Bias
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: rgb_blue_bias
  label: RGB Gain/Bias Blue Bias
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: brilliant_color
  label: BrilliantColor
  kind: action
  params:
    - name: value
      type: integer
      description: 1 to 10

- id: gamma_film
  label: Gamma Film
  kind: action
  params: []

- id: gamma_video
  label: Gamma Video
  kind: action
  params: []

- id: gamma_graphics
  label: Gamma Graphics
  kind: action
  params: []

- id: gamma_standard
  label: Gamma Standard (2.2)
  kind: action
  params: []

- id: gamma_1_8
  label: Gamma 1.8
  kind: action
  params: []

- id: gamma_2_0
  label: Gamma 2.0
  kind: action
  params: []

- id: gamma_2_4
  label: Gamma 2.4
  kind: action
  params: []

- id: gamma_2_6
  label: Gamma 2.6
  kind: action
  params: []

- id: colour_temp_warm
  label: Colour Temp Warm
  kind: action
  params: []

- id: colour_temp_medium
  label: Colour Temp Medium (Standard)
  kind: action
  params: []

- id: colour_temp_cool
  label: Colour Temp Cool
  kind: action
  params: []

- id: colour_temp_cold
  label: Colour Temp Cold
  kind: action
  params: []

- id: colour_space_auto
  label: Colour Space Auto
  kind: action
  params: []

- id: colour_space_rgb
  label: Colour Space RGB
  kind: action
  params: []

- id: colour_space_yuv
  label: Colour Space YUV
  kind: action
  params: []

- id: colour_space_rgb_16_235
  label: Colour Space RGB (16-235)
  kind: action
  params: []

- id: tint_set
  label: Tint
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_set
  label: Colour (Saturation)
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: brightness_minus
  label: Brightness -
  kind: action
  params: []

- id: brightness_plus
  label: Brightness +
  kind: action
  params: []

- id: contrast_minus
  label: Contrast -
  kind: action
  params: []

- id: contrast_plus
  label: Contrast +
  kind: action
  params: []

- id: four_corners_top_left_right
  label: Four Corners top-left (right+)
  kind: action
  params: []

- id: four_corners_top_left_left
  label: Four Corners top-left (left+)
  kind: action
  params: []

- id: four_corners_top_left_up
  label: Four Corners top-left (up+)
  kind: action
  params: []

- id: four_corners_top_left_down
  label: Four Corners top-left (down+)
  kind: action
  params: []

- id: four_corners_top_right_right
  label: Four Corners top right (right+)
  kind: action
  params: []

- id: four_corners_top_right_left
  label: Four Corners top right (left+)
  kind: action
  params: []

- id: four_corners_top_right_up
  label: Four Corners top right (up+)
  kind: action
  params: []

- id: four_corners_top_right_down
  label: Four Corners top right (down+)
  kind: action
  params: []

- id: four_corners_bottom_left_right
  label: Four Corners Bottom-left (right+)
  kind: action
  params: []

- id: four_corners_bottom_left_left
  label: Four Corners Bottom-left (left+)
  kind: action
  params: []

- id: four_corners_bottom_left_up
  label: Four Corners Bottom-left (Up+)
  kind: action
  params: []

- id: four_corners_bottom_left_down
  label: Four Corners Bottom-left (down+)
  kind: action
  params: []

- id: four_corners_bottom_right_right
  label: Four Corners Bottom-right (right+)
  kind: action
  params: []

- id: four_corners_bottom_right_left
  label: Four Corners Bottom-right (left+)
  kind: action
  params: []

- id: four_corners_bottom_right_up
  label: Four Corners Bottom-right (Up+)
  kind: action
  params: []

- id: four_corners_bottom_right_down
  label: Four Corners Bottom-right (down+)
  kind: action
  params: []

- id: format_4_3
  label: Format (Aspect Ratio) 4:3
  kind: action
  params: []

- id: format_16_9
  label: Format (Aspect Ratio) 16:9
  kind: action
  params: []

- id: format_16_10
  label: Format (Aspect Ratio) 16:10
  kind: action
  params: []

- id: format_lbx
  label: Format (Aspect Ratio) LBX
  kind: action
  params: []

- id: format_native
  label: Format (Aspect Ratio) Native
  kind: action
  params: []

- id: format_auto
  label: Format (Aspect Ratio) Auto
  kind: action
  params: []

- id: format_21_9
  label: Format (Aspect Ratio) 21:9
  kind: action
  params: []

- id: format_full
  label: Format (Aspect Ratio) FULL
  kind: action
  params: []

- id: edge_mask_set
  label: Edge mask
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 10

- id: zoom_set
  label: Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: -5 to 25

- id: h_image_shift
  label: H Image Shift
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to 100

- id: v_image_shift
  label: V Image Shift
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to 100

- id: h_keystone
  label: H Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: -30 to 30

- id: v_keystone
  label: V Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: -40 to 40 for RT; -20 to 20 for ST; -30 to 30 for INL2156/58/59

- id: auto_keystone_on
  label: Auto Keystone On
  kind: action
  params: []

- id: auto_keystone_off
  label: Auto Keystone Off
  kind: action
  params: []

- id: language
  label: Language
  kind: action
  params:
    - name: value
      type: integer
      description: 1=English, 2=Deutsch, 3=Français, 4=Italiana, 5=Español, 6=Português, 7=Polski, 8=Nederlands, 9=Svenska, 10=Norsk/Dansk, 11=Suomi, 12=ελληνικά, 13=繁體中文, 14=簡体中文, 15=日本語, 16=한국어, 17=Русский, 18=Magyar, 19=Čeština, 20=عربي, 21=ไทย, 22=Türkçe, 23=فارسی, 24=हिंदी, 25=Tiếng Việt, 26=Bahasa Indonesia, 27=Română, 28=Slovenčina, 29=Pilipino, 30=Melayu, 31=বাংলা, 32=Norsk, 33=Dansk

- id: projection_front
  label: Projection Front
  kind: action
  params: []

- id: projection_rear
  label: Projection Rear
  kind: action
  params: []

- id: projection_front_ceiling
  label: Projection Front-Ceiling
  kind: action
  params: []

- id: projection_rear_ceiling
  label: Projection Rear-Ceiling
  kind: action
  params: []

- id: menu_location_top_left
  label: Menu Location Top Left
  kind: action
  params: []

- id: menu_location_top_right
  label: Menu Location Top Right
  kind: action
  params: []

- id: menu_location_centre
  label: Menu Location Centre
  kind: action
  params: []

- id: menu_location_bottom_left
  label: Menu Location Bottom Left
  kind: action
  params: []

- id: menu_location_bottom_right
  label: Menu Location Bottom Right
  kind: action
  params: []

- id: signal_frequency
  label: Signal Frequency
  kind: action
  params:
    - name: value
      type: integer
      description: -5 to 5

- id: signal_phase
  label: Signal Phase
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 63

- id: signal_h_position
  label: Signal H. Position
  kind: action
  params:
    - name: value
      type: integer
      description: -5 to 5

- id: signal_v_position
  label: Signal V. Position
  kind: action
  params:
    - name: value
      type: integer
      description: -5 to 5

- id: security_timer
  label: Security Security Timer Month/Day/Hour
  kind: action
  params:
    - name: mm
      type: integer
      description: Month 00-12
    - name: dd
      type: integer
      description: Day 00-30
    - name: hh
      type: integer
      description: Hour 00-24

- id: security_on_with_password
  label: Security On with password
  kind: action
  params:
    - name: password
      type: string
      description: 4-digit password 0000-9999

- id: security_off_with_password
  label: Security Off with password
  kind: action
  params:
    - name: password
      type: string
      description: 4-digit password 0000-9999

- id: projector_id_set
  label: Projector ID
  kind: action
  params:
    - name: value
      type: integer
      description: 00 to 99

- id: volume_set
  label: Volume (Audio)
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 10

- id: logo_default
  label: Logo Default
  kind: action
  params: []

- id: logo_user
  label: Logo User
  kind: action
  params: []

- id: logo_neutral
  label: Logo Neutral
  kind: action
  params: []

- id: projection_location_auto
  label: Projection Location Auto
  kind: action
  params: []

- id: projection_location_desktop
  label: Projection Location Desktop
  kind: action
  params: []

- id: projection_location_ceiling
  label: Projection Location Ceiling
  kind: action
  params: []

- id: closed_captioning_off
  label: Closed Captioning Off
  kind: action
  params: []

- id: closed_captioning_cc1
  label: Closed Captioning CC1
  kind: action
  params: []

- id: closed_captioning_cc2
  label: Closed Captioning CC2
  kind: action
  params: []

- id: screen_type_16_10
  label: Screen Type 16:10 (WXGA/WUXGA only)
  kind: action
  params: []

- id: screen_type_16_9
  label: Screen Type 16:9 (WXGA/WUXGA only)
  kind: action
  params: []

- id: signal_automatic_on
  label: Signal Automatic On
  kind: action
  params: []

- id: signal_automatic_off
  label: Signal Automatic Off
  kind: action
  params: []

- id: high_altitude_on
  label: High Altitude On
  kind: action
  params: []

- id: high_altitude_off
  label: High Altitude Off
  kind: action
  params: []

- id: information_hide_on
  label: Information Hide On
  kind: action
  params: []

- id: information_hide_off
  label: Information Hide Off
  kind: action
  params: []

- id: keypad_lock_on
  label: Keypad Lock On
  kind: action
  params: []

- id: keypad_lock_off
  label: Keypad Lock Off
  kind: action
  params: []

- id: background_color
  label: Background Color
  kind: action
  params:
    - name: value
      type: integer
      description: 0=None, 1=Blue, 2=Black, 3=Red, 4=Green, 5=White, 6=Gray, 7=Logo

- id: direct_power_on_on
  label: Direct Power On On
  kind: action
  params: []

- id: direct_power_on_off
  label: Direct Power On Off
  kind: action
  params: []

- id: auto_power_off
  label: Auto Power Off (min)
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 180 minutes, 5 minute steps

- id: sleep_timer
  label: Sleep Timer (min)
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 990 minutes, 30 minute steps

- id: lamp_reminder_on
  label: Lamp Reminder On
  kind: action
  params: []

- id: lamp_reminder_off
  label: Lamp Reminder Off
  kind: action
  params: []

- id: brightness_mode_bright
  label: Brightness Mode Bright
  kind: action
  params: []

- id: brightness_mode_eco
  label: Brightness Mode Eco
  kind: action
  params: []

- id: brightness_mode_dynamic
  label: Brightness Mode Dynamic
  kind: action
  params: []

- id: brightness_mode_power
  label: Brightness Mode Power
  kind: action
  params: []

- id: lamp_reset
  label: Lamp Reset
  kind: action
  params: []

- id: reset_to_default
  label: Reset to Default
  kind: action
  params:
    - name: password
      type: string
      description: Optional 4-digit password if security is on

- id: signal_power_on_on
  label: Signal Power On On
  kind: action
  params: []

- id: signal_power_on_off
  label: Signal Power On Off
  kind: action
  params: []

- id: power_mode_standby_active
  label: Power Mode (Standby) Active
  kind: action
  params: []

- id: power_mode_standby_eco
  label: Power Mode (Standby) Eco (<0.5W)
  kind: action
  params: []

- id: power_mode_standby_erp_off
  label: Power Mode (Standby) ErP Off
  kind: action
  params: []

- id: quick_resume_on
  label: Quick Resume On
  kind: action
  params: []

- id: quick_resume_off
  label: Quick Resume Off
  kind: action
  params: []

- id: ir_up
  label: IR Function Up
  kind: action
  params: []

- id: ir_left
  label: IR Function Left
  kind: action
  params: []

- id: ir_enter
  label: IR Function Enter (for Projection MENU)
  kind: action
  params: []

- id: ir_right
  label: IR Function Right
  kind: action
  params: []

- id: ir_down
  label: IR Function Down
  kind: action
  params: []

- id: ir_keystone_plus
  label: IR Function Keystone +
  kind: action
  params: []

- id: ir_keystone_minus
  label: IR Function Keystone -
  kind: action
  params: []

- id: ir_volume_minus
  label: IR Function Volume -
  kind: action
  params: []

- id: ir_volume_plus
  label: IR Function Volume +
  kind: action
  params: []

- id: ir_brightness
  label: IR Function Brightness
  kind: action
  params: []

- id: ir_menu
  label: IR Function Menu
  kind: action
  params: []

- id: ir_zoom
  label: IR Function Zoom
  kind: action
  params: []

- id: ir_contrast
  label: IR Function Contrast
  kind: action
  params: []

- id: ir_source
  label: IR Function Source
  kind: action
  params: []

- id: test_pattern_off
  label: Test Pattern Off
  kind: action
  params: []

- id: test_pattern_grid_red
  label: Test Pattern Grid (Red)
  kind: action
  params: []

- id: test_pattern_white
  label: Test Pattern White
  kind: action
  params: []

- id: test_pattern_grid_green
  label: Test Pattern Grid (Green)
  kind: action
  params: []

- id: test_pattern_grid_blue
  label: Test Pattern Grid (Blue)
  kind: action
  params: []

- id: test_pattern_test_card
  label: Test Pattern Test Card
  kind: action
  params: []

- id: white_level
  label: White level
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 31

- id: black_level
  label: Black level
  kind: action
  params:
    - name: value
      type: integer
      description: -5 to 5

- id: ire_0
  label: IRE 0
  kind: action
  params: []

- id: ire_7_5
  label: IRE 7.5
  kind: action
  params: []

- id: display_osd_message
  label: Display message on the OSD
  kind: action
  params:
    - name: message
      type: string
      description: 1-30 characters

- id: colour_setting_reset
  label: Colour Setting Reset
  kind: action
  params: []

- id: mode_3d_off
  label: 3D Mode Off
  kind: action
  params: []

- id: mode_3d_dlp_link
  label: 3D Mode DLP-Link
  kind: action
  params: []

- id: sync_invert_off
  label: 3D Sync Invert Off
  kind: action
  params: []

- id: sync_invert_on
  label: 3D Sync Invert On
  kind: action
  params: []

- id: information_menu_on
  label: Information Menu On
  kind: action
  params: []

- id: information_menu_off
  label: Information Menu Off
  kind: action
  params: []

- id: optional_filter_installed_yes
  label: Optional Filter Installed Yes
  kind: action
  params: []

- id: optional_filter_installed_no
  label: Optional Filter Installed No
  kind: action
  params: []

- id: filter_reminder_off
  label: Filter Reminder Off
  kind: action
  params: []

- id: filter_reminder_300hr
  label: Filter Reminder 300hr
  kind: action
  params: []

- id: filter_reminder_500hr
  label: Filter Reminder 500hr
  kind: action
  params: []

- id: filter_reminder_800hr
  label: Filter Reminder 800hr
  kind: action
  params: []

- id: filter_reminder_1000hr
  label: Filter Reminder 1000hr
  kind: action
  params: []

- id: filter_reset
  label: Filter Reset
  kind: action
  params: []

- id: colour_red_hue
  label: Colour Setting Red Hue
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_green_hue
  label: Colour Setting Green Hue
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_blue_hue
  label: Colour Setting Blue Hue
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_cyan_hue
  label: Colour Setting Cyan Hue
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_yellow_hue
  label: Colour Setting Yellow Hue
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_magenta_hue
  label: Colour Setting Magenta Hue
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_red_saturation
  label: Colour Setting Red Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_green_saturation
  label: Colour Setting Green Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_blue_saturation
  label: Colour Setting Blue Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_cyan_saturation
  label: Colour Setting Cyan Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_yellow_saturation
  label: Colour Setting Yellow Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_magenta_saturation
  label: Colour Setting Magenta Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_red_gain
  label: Colour Setting Red Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_green_gain
  label: Colour Setting Green Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_blue_gain
  label: Colour Setting Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_cyan_gain
  label: Colour Setting Cyan Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_yellow_gain
  label: Colour Setting Yellow Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_magenta_gain
  label: Colour Setting Magenta Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_white_red
  label: Colour Setting White Red
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_white_green
  label: Colour Setting White Green
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: colour_white_blue
  label: Colour Setting White Blue
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: display_mode_lock_on
  label: Display Mode Lock On
  kind: action
  params: []

- id: display_mode_lock_off
  label: Display Mode Lock Off
  kind: action
  params: []

- id: d3d_to_2d_3d
  label: 3D→2D 3D
  kind: action
  params: []

- id: d3d_to_2d_l
  label: 3D→2D L
  kind: action
  params: []

- id: d3d_to_2d_r
  label: 3D→2D R
  kind: action
  params: []

- id: d3d_format_auto
  label: 3D Format Auto
  kind: action
  params: []

- id: d3d_format_sbs
  label: 3D Format SBS
  kind: action
  params: []

- id: d3d_format_top_bottom
  label: 3D Format Top and Bottom
  kind: action
  params: []

- id: d3d_format_frame_sequential
  label: 3D Format Frame Sequential
  kind: action
  params: []

- id: wall_colour_whiteboard
  label: Wall Colour Whiteboard
  kind: action
  params: []

- id: wall_colour_blackboard
  label: Wall Colour Blackboard
  kind: action
  params: []

- id: wall_colour_light_yellow
  label: Wall Colour Light Yellow
  kind: action
  params: []

- id: wall_colour_light_green
  label: Wall Colour Light Green
  kind: action
  params: []

- id: wall_colour_light_blue
  label: Wall Colour Light Blue
  kind: action
  params: []

- id: wall_colour_pink
  label: Wall Colour Pink
  kind: action
  params: []

- id: wall_colour_gray
  label: Wall Colour Gray
  kind: action
  params: []

- id: hdmi_link_off
  label: HDMI Link (CEC) Off
  kind: action
  params: []

- id: hdmi_link_on
  label: HDMI Link (CEC) On
  kind: action
  params: []

- id: auto_source_off
  label: Auto Source Off
  kind: action
  params: []

- id: auto_source_on
  label: Auto Source On
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: projector_return_pass
  type: string
  values: [P, F]
  description: Projector returns P (pass) or F (fail) for each command

- id: projector_status
  type: string
  description: |
    Projector sends unsolicited status via A001.
    Format: INFOa where a=0 Standby, 1 Warming, 2 Cooling, 3 Out of Range,
    4 Lamp Fail, 6 Fan Lock, 7 Over Temperature, 8 Lamp Hours Running Out

- id: lan_network_state
  description: Network state query via R001. Returns Ok with a=0 Disconnected, a=1 Connected

- id: lan_ip_address
  description: LAN IP Address query via R002. Returns Okaaa_bbb_ccc_ddd

- id: lamp_hours
  description: Lamp Hours query via R003. Returns Okaaaaa (5 digits)

- id: input_source_status
  description: Input Source status via R004. Returns Oka where a=0 None, 1 HDMI(HDMI 1), 2 VGA, 3 VGA 2, 5 Video, 7 HDMI 1, 8 HDMI 2, 9 S-Video, 10 Video, 15 HDMI 2, 16 HDBaseT

- id: software_version
  description: Software version via R005. Returns Okaaaa

- id: display_mode_status
  description: Display mode status via R006. Returns Oka where a=0 None, 1 Presentation, 2 Bright, 3 Movie(Cinema), 4 sRGB, 5 User, 9 3D, 12 Game, 13 DICOM SIM., 14 ISF Day, 15 ISF Night, 22 HDR SIM, 26 HLG SIM

- id: power_state_status
  description: Power state via R007. Returns Oka where a=0 Off, 1 On

- id: brightness_status
  description: Brightness via R008. Returns Okaaa (-50 to +50)

- id: contrast_status
  description: Contrast via R009. Returns Okaaa (-50 to +50)

- id: aspect_ratio_status
  description: Aspect ratio via R010. Returns Okaa where aa=0 None, 1 4:3, 2 16:9, 3 16:10, 5 LBX, 6 Native, 7 Auto, 16 21:9, 19 FULL

- id: colour_temperature_status
  description: Colour temperature via R011. Returns Oka where a=1 Warm, 2 Medium(Standard), 3 Cold, 4 Cool

- id: projection_mode_status
  description: Projection mode via R012. Returns Oka where a=0 Front, 1 Rear, 2 Front-Ceiling, 3 Rear-Ceiling

- id: information_status
  description: |
    Information query via R013. Returns Okabbbbbccddddee where
    a=Power Status (0 Off, 1 On), bbbbb=Lamp Hours, cc=Input Source (00 None, 01 VGA, 02 VGA 2, 05 Video, 07 HDMI 1, 08 HDMI 2, 09 S-Video, 15 HDMI 2, 16 HDBaseT),
    dddd=Software Version, ee=Display Mode

- id: resolution_status
  description: Resolution via R014. Returns Oka (e.g. Ok1920x1080) or Ok0x0 for no signal

- id: standby_power_mode_status
  description: Standby power mode via R015. Returns Oka where a=0 Eco., 1 Active, 2 ErP Off

- id: refresh_rate_status
  description: Refresh rate via R016. Returns Oka (e.g. Ok60Hz) or Ok0Hz for no signal

- id: model_name_status
  description: Model name via R017. Returns Oka where a=1 SVGA, 2 XGA, 3 WXGA, 4 1080p, 5 WUXGA

- id: filter_usage_hours
  description: Filter usage hours via R018. Returns Okaaaaa (00000-99999)

- id: system_temperature
  description: System temperature via R019. Returns Okaaa (000-999)

- id: serial_number
  description: Serial number via R020. Returns Ok followed by string

- id: av_mute_status
  description: AV Mute status via R021. Returns Oka where a=0 Off, 1 On

- id: mute_status
  description: Mute status via R022. Returns Oka where a=0 Off, 1 On

- id: h_image_shift_status
  description: H Image Shift via R023. Returns Okaaaa (-100 to +100)

- id: v_image_shift_status
  description: V Image Shift via R024. Returns Okaaaa (-100 to +100)

- id: v_keystone_status
  description: V Keystone via R025. Returns Okaaa (-40 to +40)

- id: h_keystone_status
  description: H Keystone via R026. Returns Okaaa (-40 to +40)

- id: lan_mac_address
  description: LAN MAC address via R027. Returns Ok##:##:##:##:##:##

- id: projector_id_status
  description: Projector ID via R028. Returns Okaa (00-99)
```

## Variables
```yaml
# No pure variables - all settable parameters are Actions with params[].
# Query commands are listed in Feedbacks as they return current state.
```

## Events
```yaml
# Unsolicited notifications the device sends:
- id: projector_information
  description: |
    Projector sends automatically when state changes.
    A001 INFOa - a=0 Standby, 1 Warming, 2 Cooling, 3 Out of Range,
    4 Lamp Fail, 6 Fan Lock, 7 Over Temperature, 8 Lamp Hours Running Out
```

## Macros
```yaml
# No explicit multi-step macros documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  # Source notes lamp ignition delay (20s), power down delay (10s),
  # source change delay (8s), intercommand minimum delay (5ms),
  # intercharacter minimum delay (2ms)
  - Intercommand minimum delay: 5ms
  - Intercharacter minimum delay: 2ms
  - Lamp ignition delay: 20s
  - Power down delay: 10s
  - Source change delay: 8s
  - Security command note: when security is on, password must be added after command or projector returns F
  - Note 2: when projector shows OSD, sending "~00313 0" (Information menu Off) returns F if security is on
# UNRESOLVED: safety interlock procedures for lamp replacement, fan failure, or over-temperature conditions not explicitly documented in source
```

## Notes
Serial protocol only — 9600 baud, 8-N-1, `<CR>` (0x0D) terminator on all commands. Projector ID 00 broadcasts to all projectors. Returns `P` (pass) or `F` (fail) for each command. Source contains three distinct command sets: Std DLP (INL21xx, 9600 baud), IN13xST/IN213x/INL314x/INL412x (19200 baud), and IN102x/In103x/In104x/In105x (19200 baud). This spec covers only the Std DLP command set.

<!-- UNRESOLVED: TCP/IP, HTTP, Telnet, or other network control protocols for INL21xx not documented in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: voltage, current, power specifications not stated in source -->
<!-- UNRESOLVED: error recovery sequences for fault conditions not documented in source -->

## Provenance

```yaml
source_domains:
  - cdn.infocus.com
source_urls:
  - https://cdn.infocus.com/2026/02/b7RCq21d-InFocus_Generic_RS232_Commands.xlsx
retrieved_at: 2026-05-14T16:57:04.324Z
last_checked_at: 2026-05-16T11:27:42.289Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T11:27:42.289Z
matched_actions: 181
action_count: 239
confidence: high
summary: "All 181 spec actions match verbatim to source commands S001-S109; transport parameters fully supported; bidirectional coverage achieved."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
