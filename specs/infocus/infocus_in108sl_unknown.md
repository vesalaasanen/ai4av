---
spec_id: admin/infocus-in108sl
schema_version: ai4av-public-spec-v1
revision: 1
title: "InFocus IN108SL Control Spec"
manufacturer: InFocus
model_family: IN108SL
aliases: []
compatible_with:
  manufacturers:
    - InFocus
  models:
    - IN108SL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.infocus.com
source_urls:
  - https://cdn.infocus.com/2026/02/b7RCq21d-InFocus_Generic_RS232_Commands.xlsx
retrieved_at: 2026-05-14T16:57:04.324Z
last_checked_at: 2026-10-07T13:36:26.710Z
generated_at: 2026-10-07T13:36:26.710Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "IN108SL not explicitly named in source; attributed via filename context. TCP/IP, HTTP, or network control not described in source."
  - "Safety warnings and interlock procedures not present in source."
  - "TCP/IP, HTTP, or network control not described in source."
  - "IN108SL not explicitly named in source document; attribution based on filename."
  - "Lamp ignition delay, power-down delay, source-change delay, intercommand delay for IN108SL not stated in source."
  - "Authentication mechanism not described in source; auth.type set to UNRESOLVED."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:36:26.710Z
  matched_actions: 159
  action_count: 159
  confidence: medium
  summary: "All 159 Std DLP actions and feedback queries match source ASCII codes and ranges; serial settings match; source is the InFocus Std DLP sheet (model applicability generic). (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# InFocus IN108SL Control Spec

## Summary
InFocus IN108SL DLP projector. RS-232 serial control at 9600/8/N/1. ASCII command format with `<CR>` terminator. Projector IDs 00–99 supported (00 = all projectors). Two command families in source: Std DLP (the IN108SL protocol) and an alternate 19200-baud format used by other InFocus series (IN13xST, IN213x, INL314x, INL412x, IN102x–IN105x). This spec covers the Std DLP family only.

<!-- UNRESOLVED: IN108SL not explicitly named in source; attributed via filename context. TCP/IP, HTTP, or network control not described in source. -->

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
  type: UNRESOLVED
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

- id: power_on_with_password
  label: Power On with Password
  kind: action
  params:
    - name: password
      type: integer
      description: 4-digit password 0000-9999

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

- id: ir_function_on
  label: IR Function On
  kind: action
  params: []

- id: ir_function_off
  label: IR Function Off
  kind: action
  params: []

- id: direct_source_vga
  label: Select Source VGA
  kind: action
  params: []

- id: direct_source_vga2
  label: Select Source VGA 2
  kind: action
  params: []

- id: direct_source_svideo
  label: Select Source S-Video
  kind: action
  params: []

- id: direct_source_video
  label: Select Source Video
  kind: action
  params: []

- id: direct_source_hdmi1
  label: Select Source HDMI 1
  kind: action
  params: []

- id: direct_source_hdmi2
  label: Select Source HDMI 2
  kind: action
  params: []

- id: direct_source_hdbaset
  label: Select Source HDBaseT
  kind: action
  params: []

- id: picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Presentation, 2=Bright, 3=Movie, 4=sRGB, 5=User, 9=3D, 12=Game, 13=DICOM SIM, 14=ISF Day, 15=ISF Night, 22=HDR SIM, 26=HLG SIM, 27=Rec.709, 28=Dark Cinema, 29=Football

- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: sharpness_set
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: 1 to 15

- id: rgb_gain_red_gain_set
  label: Set RGB Gain Red Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: rgb_gain_green_gain_set
  label: Set RGB Gain Green Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: rgb_gain_blue_gain_set
  label: Set RGB Gain Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: rgb_bias_red_bias_set
  label: Set RGB Bias Red Bias
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: rgb_bias_green_bias_set
  label: Set RGB Bias Green Bias
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: rgb_bias_blue_bias_set
  label: Set RGB Bias Blue Bias
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: brilliant_color_set
  label: Set BrilliantColor
  kind: action
  params:
    - name: value
      type: integer
      description: 1 to 10

- id: gamma_set
  label: Set Gamma
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Film, 2=Video, 3=Graphics, 4=Standard(2.2), 5=1.8, 6=2.0, 8=2.6, 12=2.4

- id: color_temp_set
  label: Set Color Temperature
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Warm, 2=Medium(Standard), 3=Cold, 4=Cool

- id: color_space_set
  label: Set Color Space
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Auto, 2=RGB, 3=YUV, 4=RGB(16-235)

- id: tint_set
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_saturation_set
  label: Set Color (Saturation)
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: brightness_adjust
  label: Brightness Adjust
  kind: action
  params:
    - name: direction
      type: integer
      description: 1=Brightness -, 2=Brightness +

- id: contrast_adjust
  label: Contrast Adjust
  kind: action
  params:
    - name: direction
      type: integer
      description: 1=Contrast -, 2=Contrast +

- id: four_corners
  label: Four Corners Geometry Correction
  kind: action
  params:
    - name: corner
      type: integer
      description: 1=top-left right+, 2=top-left left+, 3=top-left up+, 4=top-left down+, 5=top-right right+, 6=top-right left+, 7=top-right up+, 8=top-right down+, 9=bottom-left right+, 10=bottom-left left+, 11=bottom-left up+, 12=bottom-left down+, 13=bottom-right right+, 14=bottom-right left+, 15=bottom-right up+, 16=bottom-right down+

- id: aspect_ratio_set
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: 1=4:3, 2=16:9, 3=16:10, 5=LBX, 6=Native, 7=Auto, 16=21:9, 19=FULL

- id: edge_mask_set
  label: Set Edge Mask
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 10

- id: zoom_set
  label: Set Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: -5 to 25

- id: h_image_shift_set
  label: Set H Image Shift
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to 100

- id: v_image_shift_set
  label: Set V Image Shift
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to 100

- id: h_keystone_set
  label: Set H Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: -30 to 30

- id: v_keystone_set
  label: Set V Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: -40 to 40 (RT); -20 to 20 (ST); -30 to 30 (INL2156/58/59)

- id: auto_keystone_on
  label: Auto Keystone On
  kind: action
  params: []

- id: auto_keystone_off
  label: Auto Keystone Off
  kind: action
  params: []

- id: language_set
  label: Set Language
  kind: action
  params:
    - name: lang
      type: integer
      description: 1=English, 2=Deutsch, 3=Francais, 4=Italiana, 5=Espanol, 6=Portugues, 7=Polski, 8=Nederlands, 9=Svenska, 10=Norsk/Dansk, 11=Suomi, 12=Greek, 13=Traditional Chinese, 14=Simplified Chinese, 15=Japanese, 16=Korean, 17=Russian, 18=Hungarian, 19=Czech, 20=Arabic, 21=Thai, 22=Turkish, 23=Persian, 24=Hindi, 25=Vietnamese, 26=Bahasa Indonesia, 27=Romanian, 28=Slovak, 29=Filipino, 30=Malay, 31=Bengali, 32=Norwegian, 33=Danish

- id: projection_mode_set
  label: Set Projection Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Front, 2=Rear, 3=Front-Ceiling, 4=Rear-Ceiling

- id: menu_location_set
  label: Set Menu Location
  kind: action
  params:
    - name: location
      type: integer
      description: 1=Top Left, 2=Top Right, 3=Centre, 4=Bottom Left, 5=Bottom Right

- id: signal_frequency_set
  label: Set Signal Frequency
  kind: action
  params:
    - name: value
      type: integer
      description: -5 to 5

- id: signal_phase_set
  label: Set Signal Phase
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 63

- id: signal_h_position_set
  label: Set Signal H Position
  kind: action
  params:
    - name: value
      type: integer
      description: -5 to 5

- id: signal_v_position_set
  label: Set Signal V Position
  kind: action
  params:
    - name: value
      type: integer
      description: -5 to 5

- id: security_timer_set
  label: Set Security Timer
  kind: action
  params:
    - name: timer
      type: string
      description: mm/dd/hh format (mm=00-12, dd=00-30, hh=00-24)

- id: security_on
  label: Security On with Password
  kind: action
  params:
    - name: password
      type: integer
      description: 4-digit password 0000-9999

- id: security_off
  label: Security Off
  kind: action
  params:
    - name: password
      type: integer
      description: 4-digit password 0000-9999

- id: projector_id_set
  label: Set Projector ID
  kind: action
  params:
    - name: id
      type: integer
      description: 00 to 99

- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 10

- id: logo_set
  label: Set Logo
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Default, 2=User, 3=Neutral

- id: projection_location_set
  label: Set Projection Location
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Auto, 1=Desktop, 2=Ceiling

- id: closed_captioning_set
  label: Set Closed Captioning
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Off, 1=CC1, 2=CC2

- id: screen_type_set
  label: Set Screen Type
  kind: action
  params:
    - name: type
      type: integer
      description: 0=16:9, 1=16:10 (WXGA/WUXGA only)

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

- id: background_color_set
  label: Set Background Color
  kind: action
  params:
    - name: color
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

- id: auto_power_off_set
  label: Set Auto Power Off
  kind: action
  params:
    - name: minutes
      type: integer
      description: 0 to 180 (5-minute steps)

- id: sleep_timer_set
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: 0 to 990 (30-minute steps)

- id: lamp_reminder_on
  label: Lamp Reminder On
  kind: action
  params: []

- id: lamp_reminder_off
  label: Lamp Reminder Off
  kind: action
  params: []

- id: brightness_mode_set
  label: Set Brightness Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Bright, 2=Eco, 4=Dynamic, 6=Power

- id: lamp_reset
  label: Lamp Reset
  kind: action
  params: []

- id: reset_to_default
  label: Reset to Default
  kind: action
  params:
    - name: password
      type: integer
      description: Required when security is on

- id: signal_power_on_on
  label: Signal Power On On
  kind: action
  params: []

- id: signal_power_on_off
  label: Signal Power On Off
  kind: action
  params: []

- id: power_mode_standby_set
  label: Set Power Mode (Standby)
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Eco(<0.5W), 1=Active, 2=ErP Off

- id: quick_resume_on
  label: Quick Resume On
  kind: action
  params: []

- id: quick_resume_off
  label: Quick Resume Off
  kind: action
  params: []

- id: test_pattern_set
  label: Set Test Pattern
  kind: action
  params:
    - name: pattern
      type: integer
      description: 0=Off, 1=Grid(Red), 2=White, 3=Grid(Green), 4=Grid(Blue), 9=Test Card

- id: white_level_set
  label: Set White Level
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 31

- id: black_level_set
  label: Set Black Level
  kind: action
  params:
    - name: value
      type: integer
      description: -5 to 5

- id: ire_set
  label: Set IRE
  kind: action
  params:
    - name: value
      type: integer
      description: 0=7.5 IRE, 1=0 IRE

- id: display_message_set
  label: Display Message
  kind: action
  params:
    - name: message
      type: string
      description: 1-30 characters

- id: color_setting_reset
  label: Color Setting Reset
  kind: action
  params: []

- id: color_setting_red_hue_set
  label: Set Color Setting Red Hue
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_green_hue_set
  label: Set Color Setting Green Hue
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_blue_hue_set
  label: Set Color Setting Blue Hue
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_cyan_hue_set
  label: Set Color Setting Cyan Hue
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_yellow_hue_set
  label: Set Color Setting Yellow Hue
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_magenta_hue_set
  label: Set Color Setting Magenta Hue
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_red_saturation_set
  label: Set Color Setting Red Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_green_saturation_set
  label: Set Color Setting Green Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_blue_saturation_set
  label: Set Color Setting Blue Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_cyan_saturation_set
  label: Set Color Setting Cyan Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_yellow_saturation_set
  label: Set Color Setting Yellow Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_magenta_saturation_set
  label: Set Color Setting Magenta Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_red_gain_set
  label: Set Color Setting Red Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_green_gain_set
  label: Set Color Setting Green Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_blue_gain_set
  label: Set Color Setting Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_cyan_gain_set
  label: Set Color Setting Cyan Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_yellow_gain_set
  label: Set Color Setting Yellow Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_magenta_gain_set
  label: Set Color Setting Magenta Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_white_red_set
  label: Set Color Setting White Red
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_white_green_set
  label: Set Color Setting White Green
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_setting_white_blue_set
  label: Set Color Setting White Blue
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

- id: d3d_to_d2_set
  label: Set 3D to 2D
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=3D, 1=L, 2=R

- id: d3d_format_set
  label: Set 3D Format
  kind: action
  params:
    - name: format
      type: integer
      description: 0=Auto, 1=SBS, 2=Top and Bottom, 3=Frame Sequential

- id: wall_colour_set
  label: Set Wall Colour
  kind: action
  params:
    - name: color
      type: integer
      description: 0=Whiteboard, 1=Blackboard, 2=Light Yellow, 3=Light Green, 4=Light Blue, 5=Pink, 6=Gray

- id: hdmi_link_on
  label: HDMI Link (CEC) On
  kind: action
  params: []

- id: hdmi_link_off
  label: HDMI Link (CEC) Off
  kind: action
  params: []

- id: auto_source_on
  label: Auto Source On
  kind: action
  params: []

- id: auto_source_off
  label: Auto Source Off
  kind: action
  params: []

- id: ir_function_keypad
  label: IR Function Keypad
  kind: action
  params:
    - name: function
      type: integer
      description: 10=Up, 11=Left, 12=Enter (for Projection MENU), 13=Right, 14=Down, 15=Keystone +, 16=Keystone –, 17=Volume –, 18=Volume +, 19=Brightness, 20=Menu, 21=Zoom, 28=Contrast, 47=Source

- id: d3d_mode_set
  label: Set 3D Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Off, 1=DLP-Link

- id: d3d_sync_invert_set
  label: Set 3D Sync Invert
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Off, 1=On

- id: information_menu_set
  label: Set Information Menu
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=On, 0=Off (0/2 for backward compatible)

- id: optional_filter_installed_set
  label: Set Optional Filter Installed
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Yes, 0=No (0/2 for backward compatible)

- id: filter_reminder_set
  label: Set Filter Reminder
  kind: action
  params:
    - name: reminder
      type: integer
      description: 0=Off, 1=300hr, 2=500hr, 3=800hr, 4=1000hr

- id: filter_reset
  label: Filter Reset
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: projector_info
  label: Projector Information
  type: string
  description: Automatically sent. Codes: a=0(Standby), 1(Warming), 2(Cooling), 3(Out of Range), 4(Lamp Fail), 6(Fan Lock), 7(Over Temperature), 8(Lamp Hours Running Out). Format: INFOa

- id: power_state
  label: Power State
  type: enum
  values: [off, on]
  query_command: "~00124 1"

- id: lamp_hours
  label: Lamp Hours
  type: integer
  description: 0-65535 hours
  query_command: "~00108 1"

- id: input_source
  label: Input Source
  type: integer
  description: Queryable. Source codes vary between model series
  query_command: "~00121 1"

- id: software_version
  label: Software Version
  type: string
  query_command: "~00122 1"

- id: display_mode_status
  label: Display Mode
  type: integer
  query_command: "~00123 1"

- id: brightness_status
  label: Brightness
  type: integer
  description: -50 to 50
  query_command: "~00125 1"

- id: contrast_status
  label: Contrast
  type: integer
  description: -50 to 50
  query_command: "~00126 1"

- id: aspect_ratio_status
  label: Aspect Ratio
  type: integer
  query_command: "~00127 1"

- id: color_temperature_status
  label: Color Temperature
  type: integer
  query_command: "~00128 1"

- id: projection_mode_status
  label: Projection Mode
  type: integer
  query_command: "~00129 1"

- id: information_query
  label: Information Query
  type: string
  description: Returns power status, lamp hours, input source, software version, display mode
  query_command: "~00150 1"

- id: resolution_query
  label: Resolution
  type: string
  description: e.g. Ok1920x1080
  query_command: "~00150 4"

- id: standby_power_mode_status
  label: Standby Power Mode
  type: integer
  query_command: "~00150 16"

- id: refresh_rate_status
  label: Refresh Rate
  type: string
  description: e.g. Ok60Hz
  query_command: "~00150 19"

- id: model_name_status
  label: Model Name
  type: integer
  query_command: "~00151 1"

- id: filter_usage_hours
  label: Filter Usage Hours
  type: integer
  description: 0-99999
  query_command: "~00321 1"

- id: system_temperature
  label: System Temperature
  type: integer
  description: 0-999
  query_command: "~00352 1"

- id: serial_number
  label: Serial Number
  type: string
  query_command: "~00353 1"

- id: av_mute_status
  label: AV Mute
  type: enum
  values: [off, on]
  query_command: "~00355 1"

- id: mute_status
  label: Mute
  type: enum
  values: [off, on]
  query_command: "~00356 1"

- id: h_image_shift_status
  label: H Image Shift
  type: integer
  description: -100 to 100
  query_command: "~00543 1"

- id: v_image_shift_status
  label: V Image Shift
  type: integer
  description: -100 to 100
  query_command: "~00543 2"

- id: v_keystone_status
  label: V Keystone
  type: integer
  description: -40 to 40
  query_command: "~00543 3"

- id: h_keystone_status
  label: H Keystone
  type: integer
  description: -40 to 40
  query_command: "~00543 4"

- id: lan_mac_address
  label: LAN MAC Address
  type: string
  description: Format ##:##:##:##:##:##
  query_command: "~00555 1"

- id: projector_id_status
  label: Projector ID
  type: integer
  description: 00-99
  query_command: "~00558 1"

- id: lan_settings
  label: LAN Settings / Network State
  type: integer
  description: 0=Disconnected, 1=Connected
  query_command: "~0087 1"

- id: lan_ip_address
  label: LAN IP Address
  type: string
  query_command: "~0087 3"
```

## Variables
```yaml
# All settable parameters exposed via Actions. No additional Variables section.
```

## Events
```yaml
# Projector sends unsolicited INFO messages. See Feedbacks.projector_info.
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```
<!-- UNRESOLVED: Safety warnings and interlock procedures not present in source. -->

## Notes
Command string format: `~00XX Y <CR>` where XX = command index, Y = value, `<CR>` = 0x0D hex. Projector ID embedded in first four digits of command header (00 = broadcast to all projectors). Responses: `P` = pass, `F` = fail.

Source also contains two additional command sets not covered here: (1) IN13xST/IN213x/INL314x/INL412x series using 19200 baud with `(CMD)` syntax, and (2) IN102x/In103x/In104x/In105x series using 19200 baud with `Cnn` hex commands.

Security commands require password parameter when projector security is enabled; commands without password return `F`.

Auto Power Off timer: 5-minute steps. Sleep Timer: 30-minute steps.

IRE polarity: command value 1 maps to 0 IRE and command value 0 maps to 7.5 IRE.

Lamp ignition delay: not stated in Std DLP sheet. Intercommand delay minimum: not stated in Std DLP sheet. These timing parameters are documented for the IN13xST series (20s lamp ignition, 10s power down, 8s source change, 5ms inter-command, 2ms inter-character) — not confirmed for IN108SL.
<!-- UNRESOLVED: TCP/IP, HTTP, or network control not described in source. -->
<!-- UNRESOLVED: IN108SL not explicitly named in source document; attribution based on filename. -->
<!-- UNRESOLVED: Lamp ignition delay, power-down delay, source-change delay, intercommand delay for IN108SL not stated in source. -->
<!-- UNRESOLVED: Authentication mechanism not described in source; auth.type set to UNRESOLVED. -->

## Provenance

```yaml
source_domains:
  - cdn.infocus.com
source_urls:
  - https://cdn.infocus.com/2026/02/b7RCq21d-InFocus_Generic_RS232_Commands.xlsx
retrieved_at: 2026-05-14T16:57:04.324Z
last_checked_at: 2026-10-07T13:36:26.710Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:36:26.710Z
matched_actions: 159
action_count: 159
confidence: medium
summary: "All 159 Std DLP actions and feedback queries match source ASCII codes and ranges; serial settings match; source is the InFocus Std DLP sheet (model applicability generic). (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "IN108SL not explicitly named in source; attributed via filename context. TCP/IP, HTTP, or network control not described in source."
- "Safety warnings and interlock procedures not present in source."
- "TCP/IP, HTTP, or network control not described in source."
- "IN108SL not explicitly named in source document; attribution based on filename."
- "Lamp ignition delay, power-down delay, source-change delay, intercommand delay for IN108SL not stated in source."
- "Authentication mechanism not described in source; auth.type set to UNRESOLVED."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
