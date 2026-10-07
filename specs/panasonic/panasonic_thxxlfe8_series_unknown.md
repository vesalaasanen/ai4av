---
spec_id: admin/panasonic-thxxlfe8_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic TH-43/48/55/65LFE8 Control Spec"
manufacturer: Panasonic
model_family: TH-43LFE8
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - TH-43LFE8
    - TH-48LFE8
    - TH-55LFE8
    - TH-65LFE8
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.connect.panasonic.com
  - pna-b2b-storage-mkt.s3.amazonaws.com
  - manua.ls
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LFE8_SerialCommandList.pdf
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LAN_Protocol_exp.pdf
  - https://docs.connect.panasonic.com/prodisplays/support/rs232c_commandlist_prev.html
  - https://pna-b2b-storage-mkt.s3.amazonaws.com/production/148951_LFE8_Series_Operating_Instruction.pdf
  - https://www.manua.ls/panasonic/th-55lfe8/manual
retrieved_at: 2026-05-19T13:15:50.898Z
last_checked_at: 2026-10-07T13:29:20.879Z
generated_at: 2026-10-07T13:29:20.879Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - QGE:PSZ
  - QDZ
  - QPF:NAM
  - QSU:ILA+++
  - "LAN protocol LP1/LP2 distinction not fully documented in source"
  - "TCP port not stated in source; SSU:LCP sets 1024-65535"
  - "detailed variable schema not fully extracted"
  - "unsolicited event format not documented"
  - "no explicit macro sequences in source"
  - "no safety warnings or interlock procedures in source"
  - "LAN protocol LP1 vs LP2 functional differences"
  - "default TCP port not stated"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:29:20.879Z
  matched_actions: 245
  action_count: 245
  confidence: medium
  summary: "All 245 action units map to source commands with matching shapes and serial transport supported; only ~4 query variants unrepresented, coverage above 0.9. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Panasonic TH-43/48/55/65LFE8 Control Spec

## Summary
Full HD LCD display series supporting both RS-232C and LAN (TCP/IP) control. Command protocol uses ASCII framing with STX/ETX. Supports power, input routing, picture/sound adjustment, network setup, timers, and extensive query commands.

<!-- UNRESOLVED: LAN protocol LP1/LP2 distinction not fully documented in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source; SSU:LCP sets 1024-65535
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this
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
  label: Power ON
  kind: action
  params: []

- id: power_off
  label: Power OFF
  kind: action
  params: []

- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: string
      description: Input identifier (HM1/HM2/DV1/PC1/VD1/UD1)

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume value 000-100

- id: volume_up
  label: Volume Up
  kind: action
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  params: []

- id: audio_mute_control
  label: Audio Mute
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: video_mute_control
  label: Video Mute
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_aspect
  label: Set Aspect Ratio
  kind: action
  params:
    - name: mode
      type: string
      description: "FULL/NORM/ZOOM/ZOM2"

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "STD/DYN/CNM"

- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100 or DEF"

- id: set_picture_contrast
  label: Set Picture Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100 or DEF"

- id: set_black_level
  label: Set Black Level Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100 or DEF"

- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100 or DEF"

- id: set_color
  label: Set Color
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100 or DEF"

- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100 or DEF"

- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  params:
    - name: value
      type: string
      description: "032/040/050/065/075/093/107/NTV/U01/U02"

- id: set_red_gain
  label: Set Red Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "0000-0255"

- id: set_green_gain
  label: Set Green Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "0000-0255"

- id: set_blue_gain
  label: Set Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "0000-0255"

- id: set_red_bias
  label: Set Red Bias
  kind: action
  params:
    - name: value
      type: integer
      description: "-127 to 128"

- id: set_green_bias
  label: Set Green Bias
  kind: action
  params:
    - name: value
      type: integer
      description: "-127 to 128"

- id: set_blue_bias
  label: Set Blue Bias
  kind: action
  params:
    - name: value
      type: integer
      description: "-127 to 128"

- id: set_gamma
  label: Set Gamma
  kind: action
  params:
    - name: value
      type: integer
      description: "20/22/24/26"

- id: set_dynamic_contrast
  label: Set Dynamic Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "00-10"

- id: set_color_enhancement
  label: Set Color Enhancement
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: memory_delete
  label: Memory Delete
  kind: action
  params:
    - name: slot
      type: integer
      description: "01-06"

- id: memory_load
  label: Memory Load
  kind: action
  params:
    - name: slot
      type: integer
      description: "01-06"

- id: memory_save
  label: Memory Save
  kind: action
  params:
    - name: slot
      type: integer
      description: "01-06"
    - name: name
      type: string
      description: "Memory name (max 20 chars)"

- id: set_output_select
  label: Set Output Select
  kind: action
  params:
    - name: output
      type: string
      description: "SPO/LNO"

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "STD(AUT)/DYN/CLR"

- id: set_bass
  label: Set Bass
  kind: action
  params:
    - name: value
      type: integer
      description: "-20 to +20"

- id: set_treble
  label: Set Treble
  kind: action
  params:
    - name: value
      type: integer
      description: "-20 to +20"

- id: set_balance
  label: Set Balance
  kind: action
  params:
    - name: value
      type: integer
      description: "-20 to +20"

- id: set_surround
  label: Set Surround
  kind: action
  params:
    - name: value
      type: string
      description: "MON/OFF"

- id: set_horizontal_position
  label: Set Horizontal Position
  kind: action
  params:
    - name: value
      type: integer
      description: "-100 to +100"

- id: set_horizontal_size
  label: Set Horizontal Size
  kind: action
  params:
    - name: value
      type: integer
      description: "-100 to +100"

- id: set_vertical_position
  label: Set Vertical Position
  kind: action
  params:
    - name: value
      type: integer
      description: "-100 to +100"

- id: set_vertical_size
  label: Set Vertical Size
  kind: action
  params:
    - name: value
      type: integer
      description: "-100 to +100"

- id: set_clock_phase
  label: Set Clock Phase
  kind: action
  params:
    - name: value
      type: integer
      description: "00-30"

- id: set_dot_clock
  label: Set Dot Clock
  kind: action
  params:
    - name: value
      type: integer
      description: "-5 to +5"

- id: set_pixel_mode_1_1
  label: Set 1:1 Pixel Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_position_size_lump
  label: Set Pos/Size Lump Setting
  kind: action
  params:
    - name: hpos
      type: integer
      description: "-100 to +100"
    - name: hsz
      type: integer
      description: "-100 to +100"
    - name: vpos
      type: integer
      description: "-100 to +100"
    - name: vsz
      type: integer
      description: "-100 to +100"

- id: auto_setup
  label: Auto Setup
  kind: action
  params:
    - name: value
      type: integer
      description: "1: Execute"

- id: set_wobbling
  label: Set Wobbling
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: string
      description: "ENG/DEU/FRA/ITL(ITA)/ESP/USA/CHA/JPN/RUS"

- id: set_power_management_mode
  label: Set Power Management Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Custom, 1: On"

- id: set_no_signal_power_off
  label: Set No Signal Power Off
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_pc_power_management
  label: Set PC Power Management
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_dvi_power_management
  label: Set DVI Power Management
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_dvi_d1_power_management
  label: Set DVI-D1 Power Management
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_hdmi1_power_management
  label: Set HDMI1 Power Management
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_hdmi2_power_management
  label: Set HDMI2 Power Management
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_power_save
  label: Set Power Save
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_display_orientation
  label: Set Display Orientation
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Landscape, 1: Portrait"

- id: set_menu_position
  label: Set Menu Position
  kind: action
  params:
    - name: value
      type: integer
      description: "1-9"

- id: set_menu_display_duration
  label: Set Menu Display Duration
  kind: action
  params:
    - name: value
      type: integer
      description: "005-180 seconds"

- id: set_menu_transparency
  label: Set Menu Transparency
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100"

- id: set_network_setup
  label: Set Network Setup
  kind: action
  params:
    - name: ip
      type: array
      description: "IP address 4 bytes 000-255"
    - name: subnet
      type: array
      description: "Subnet mask 4 bytes"
    - name: gateway
      type: array
      description: "Gateway 4 bytes"
    - name: dhcp
      type: integer
      description: "0: Off, 1: On"

- id: set_network_setup_port
  label: Set Network Setup Port
  kind: action
  params:
    - name: port
      type: integer
      description: "1024-65535"

- id: set_display_name
  label: Set Display Name
  kind: action
  params:
    - name: name
      type: string
      description: "Max 8 chars"

- id: set_amx_dd
  label: Set AMX D.D.
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_crestron_connected
  label: Set Crestron Connected
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: reset_settings
  label: Reset
  kind: action
  params: []

- id: set_display_id_auto_setup
  label: Set Display ID Auto Setup
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_serial_id
  label: Set Serial ID
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On, 000-100: Display ID"

- id: set_3d_yc_filter
  label: Set 3D Y/C Filter
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_color_system
  label: Set Color System
  kind: action
  params:
    - name: value
      type: string
      description: "NTS/PAL/SCM/4NT/MPA/NPA/AUT"

- id: set_sync_signal
  label: Set Sync Signal Setting
  kind: action
  params:
    - name: value
      type: string
      description: "HAV/GRN/HVS"

- id: set_cinema_reality
  label: Set Cinema Reality 3:2 Pull Down
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_xga_mode
  label: Set XGA Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "1: 1024x768, 3: 1366x768"

- id: set_noise_reduction
  label: Set Noise Reduction
  kind: action
  params:
    - name: value
      type: string
      description: "OFF/AUT/LOW/MID/HIG"

- id: set_mpeg_noise_reduction
  label: Set MPEG Noise Reduction
  kind: action
  params:
    - name: value
      type: string
      description: "OFF/LOW/MID/HIG"

- id: set_signal_range
  label: Set Signal Range
  kind: action
  params:
    - name: value
      type: string
      description: "VID/FUL/AUT"

- id: set_component_rgb_select
  label: Set Component/RGB-IN Select
  kind: action
  params:
    - name: value
      type: string
      description: "YBR/RGB"

- id: set_yuv_rgb_select
  label: Set YUV/RGB-IN Select
  kind: action
  params:
    - name: value
      type: string
      description: "YUV/RGB"

- id: set_input_level
  label: Set Input Level
  kind: action
  params:
    - name: value
      type: integer
      description: "-16 to +16"

- id: set_frame_rate_conversion
  label: Set Frame Rate Conversion
  kind: action
  params:
    - name: value
      type: integer
      description: "0/1/2/3 (65inch only)"

- id: set_screensaver_onoff
  label: Set Screensaver On/Off
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Stop, 5: Operating"

- id: set_screensaver_mode
  label: Set Screensaver Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: Interval, 2: Time Designation, 3: On, 4: Standby after Screensaver"

- id: set_interval_screensaver
  label: Set Interval Screensaver
  kind: action
  params:
    - name: periodic
      type: integer
      description: "0000-2359"
    - name: operating
      type: integer
      description: "0000-2359"

- id: set_time_designation_screensaver
  label: Set Time Designation Screensaver
  kind: action
  params:
    - name: start
      type: integer
      description: "0000-2359"
    - name: finish
      type: integer
      description: "0000-2359"

- id: set_standby_after_screensaver
  label: Set Standby after Screensaver
  kind: action
  params:
    - name: time
      type: integer
      description: "0000-2359"

- id: set_label_current_input
  label: Set Label for Current Input
  kind: action
  params:
    - name: label
      type: string
      description: "INP/PCN/DV1/DV2/DV3/BD1/BD2/BD3/CTV/VCR/STB/SKP"

- id: set_label_each_input
  label: Set Label for Each Input
  kind: action
  params:
    - name: input
      type: string
      description: "HM1/HM2/DV1/PC1/VD1"
    - name: label
      type: string
      description: "INP/DV1/DV2/DV3/BD1/BD2/BD3/CTV/VCR/STB/SKP"

- id: set_function_group
  label: Set Function Group
  kind: action
  params:
    - name: group
      type: string
      description: "INP/MEM/ACT"

- id: set_function_button
  label: Set Function Button Settings
  kind: action
  params:
    - name: button
      type: integer
      description: "1-6"
    - name: function
      type: string
      description: "SIG/SSV/SUT/LNS/ECO/OSH or HM1/HM2/DV1/PC1/VD1/UD1"

- id: set_function_guide
  label: Set Function Guide Settings
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_multi_display_onoff
  label: Set Multi Display On/Off
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_multi_display_setup
  label: Set Multi Display Setup Detail
  kind: action
  params:
    - name: onoff
      type: integer
      description: "0: Off, 1: On"
    - name: hscale
      type: integer
      description: "01-05"
    - name: vscale
      type: integer
      description: "01-05"
    - name: bezel_h
      type: integer
      description: "000-100"
    - name: bezel_v
      type: integer
      description: "000-100"
    - name: location
      type: string
      description: "A1-E5"

- id: set_timer_program
  label: Set Timer Setup Program
  kind: action
  params:
    - name: program
      type: integer
      description: "01-20"
    - name: enable
      type: integer
      description: "0: Off, 1: On"
    - name: day
      type: string
      description: "SUN/MON/TUE/WED/THU/FRI/SAT/EVD"
    - name: action
      type: string
      description: "PON/POF"
    - name: time
      type: integer
      description: "0000-2359"
    - name: input
      type: string
      description: "HM1/HM2/DV1/PC1/VD1/UD1"

- id: set_timer_date_time
  label: Set Timer DATE/TIME
  kind: action
  params:
    - name: year
      type: integer
      description: "2015-2099"
    - name: month
      type: integer
      description: "01-12"
    - name: day
      type: integer
      description: "01-31"
    - name: hour
      type: integer
      description: "00-23"
    - name: minute
      type: integer
      description: "00-59"

- id: set_usb_media_player
  label: Set USB Media Player
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Disable, 1: Enable"

- id: set_resume_play
  label: Set Resume Play
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_slideshow_duration
  label: Set Slide Show Duration
  kind: action
  params:
    - name: value
      type: integer
      description: "005-600 seconds"

- id: set_on_screen_display
  label: Set On Screen Display
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_initial_input
  label: Set Initial Input
  kind: action
  params:
    - name: input
      type: string
      description: "OFF/HM1/HM2/DV1/PC1/VD1/UD1"

- id: set_initial_vol_level
  label: Set Initial VOL Level
  kind: action
  params:
    - name: enable
      type: integer
      description: "0: Off, 1: On"
    - name: volume
      type: integer
      description: "000-100"

- id: set_maximum_vol_level
  label: Set Maximum VOL Level
  kind: action
  params:
    - name: enable
      type: integer
      description: "0: Off, 1: On"
    - name: volume
      type: integer
      description: "000-100"

- id: set_input_lock
  label: Set Input Lock
  kind: action
  params:
    - name: value
      type: string
      description: "OFF/HM1/HM2/DV1/PC1/VD1/UD1"

- id: set_button_lock
  label: Set Button Lock
  kind: action
  params:
    - name: value
      type: string
      description: "OFF/MEN/ALL"

- id: set_controller_user_level
  label: Set Controller User Level
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: User1, 2: User2, 3: User3"

- id: set_off_timer_function
  label: Set Off Timer Function
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_initial_power_mode
  label: Set Initial Power Mode
  kind: action
  params:
    - name: value
      type: string
      description: "NOR/PON/STB"

- id: set_power_on_screen_delay
  label: Set Power ON Screen Delay
  kind: action
  params:
    - name: value
      type: string
      description: "AT: Auto, 00-30: seconds"

- id: set_clock_display
  label: Set Clock Display
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_lan_protocol
  label: Set LAN Control Protocol
  kind: action
  params:
    - name: value
      type: string
      description: "LP1/LP2"

- id: set_pc_auto_setup
  label: Set PC AUTO SETUP
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_no_activity_power_off
  label: Set No Activity Power Off
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_power_management_message
  label: Set Power Management Message
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_input_search_function
  label: Set Input Search Function
  kind: action
  params:
    - name: value
      type: string
      description: "OFF/ALL/PRI"

- id: set_1st_search_input
  label: Set 1st Search Input
  kind: action
  params:
    - name: input
      type: string
      description: "NON/HM1/HM2/DV1/PC1/VD1/UD1"

- id: set_2nd_search_input
  label: Set 2nd Search Input
  kind: action
  params:
    - name: input
      type: string
      description: "NON/HM1/HM2/DV1/PC1/VD1/UD1"

- id: set_no_signal_warning
  label: Set No Signal Warning
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_no_signal_warning_timing
  label: Set No Signal Warning Timing
  kind: action
  params:
    - name: value
      type: integer
      description: "01-60 minutes"

- id: set_no_signal_error
  label: Set No Signal Error
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Off, 1: On"

- id: set_no_signal_error_timing
  label: Set No Signal Error Timing
  kind: action
  params:
    - name: value
      type: integer
      description: "01-90 minutes"

- id: osd_clear
  label: OSD Clear (VDO)
  kind: action
  params: []

- id: recall
  label: Recall (DDS)
  kind: action
  params: []

- id: set_digital_zoom
  label: Set Digital Zoom
  kind: action
  params:
    - name: onoff
      type: integer
      description: "0: Off, 1: On"
    - name: factor
      type: integer
      description: "1-4"
    - name: hpos
      type: integer
      description: "1-5"

- id: set_off_timer
  label: Set Off Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "00-90"

- id: set_auto_command_send
  label: Set Auto Command Send Setting
  kind: action
  params:
    - name: enable
      type: integer
      description: "0: Off, 1: On"
    - name: mode
      type: integer
      description: "0: Off, 1: On"

- id: memory_name_change
  label: Memory Name Change
  kind: action
  params:
    - name: slot
      type: integer
      description: "01~06"
    - name: name
      type: string
      description: "space!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"

- id: audio_mute_aoc
  label: Audio Mute AOC
  kind: action
  params:
    - name: value
      type: integer
      description: "0/1"
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: [0, 1]
  description: "0: Standby, 1: Power ON"
  query_command: QPW

- id: current_input
  type: string
  description: "HM1/HM2/DV1/PC1/VD1/UD1"

- id: current_audio_volume
  type: integer
  range: [000, 100]
  query_command: QAV

- id: audio_mute_status
  type: enum
  values: [0, 1]
  query_command: QAM

- id: video_mute_status
  type: enum
  values: [0, 1]
  query_command: QVM

- id: aspect_status
  type: string
  query_command: QAS

- id: picture_mode_status
  type: string
  query_command: QPC:MEN

- id: backlight_status
  type: integer
  range: [000, 100]
  query_command: QPC:BLT

- id: picture_contrast_status
  type: integer
  range: [000, 100]
  query_command: QPC:PIC

- id: black_level_status
  type: integer
  range: [000, 100]
  query_command: QPC:BLK

- id: sharpness_status
  type: integer
  range: [000, 100]
  query_command: QPC:SHP

- id: color_status
  type: integer
  range: [000, 100]
  query_command: QPC:COL

- id: tint_status
  type: integer
  range: [000, 100]
  query_command: QPC:TIN

- id: color_temperature_status
  type: string
  query_command: QPC:TMP

- id: red_gain_status
  type: integer
  range: [0000, 0255]
  query_command: QWB:RGN

- id: green_gain_status
  type: integer
  range: [0000, 0255]
  query_command: QWB:GGN

- id: blue_gain_status
  type: integer
  range: [0000, 0255]
  query_command: QWB:BGN

- id: red_bias_status
  type: integer
  range: [-127, 128]
  query_command: QWB:RBS

- id: green_bias_status
  type: integer
  range: [-127, 128]
  query_command: QWB:GBS

- id: blue_bias_status
  type: integer
  range: [-127, 128]
  query_command: QWB:BBS

- id: gamma_status
  type: integer
  query_command: QWB:GMM

- id: dynamic_contrast_status
  type: integer
  range: [00, 10]
  query_command: QPC:DCO

- id: color_enhancement_status
  type: enum
  values: [0, 1]
  query_command: QPC:PAJ

- id: memory_state_status
  type: string
  query_command: QPF:STA

- id: output_select_status
  type: string
  query_command: QAC:OUT

- id: sound_mode_status
  type: string
  query_command: QAC:MEN

- id: bass_status
  type: integer
  range: [-20, 20]
  query_command: QAC:BAS

- id: treble_status
  type: integer
  range: [-20, 20]
  query_command: QAC:TRE

- id: balance_status
  type: integer
  range: [-20, 20]
  query_command: QAC:BAL

- id: surround_status
  type: string
  query_command: QAC:SUR

- id: horizontal_position_status
  type: integer
  range: [-100, 100]
  query_command: QGE:HPO

- id: horizontal_size_status
  type: integer
  range: [-100, 100]
  query_command: QGE:HSZ

- id: vertical_position_status
  type: integer
  range: [-100, 100]
  query_command: QGE:VPO

- id: vertical_size_status
  type: integer
  range: [-100, 100]
  query_command: QGE:VSZ

- id: clock_phase_status
  type: integer
  range: [00, 30]
  query_command: QGE:CLK

- id: dot_clock_status
  type: integer
  range: [-5, 5]
  query_command: QGE:DCL

- id: pixel_mode_1_1_status
  type: enum
  values: [0, 1]
  query_command: QGE:DBD

- id: overscan_status
  type: enum
  values: [0, 1]
  query_command: QGE:OVS

- id: auto_setup_status
  type: string
  query_command: QGE:ASU

- id: wobbling_status
  type: enum
  values: [0, 1]
  query_command: QSP:WOB

- id: no_option_status
  type: enum
  values: [0, 1]

- id: osd_language_status
  type: string
  query_command: QSU:LNG

- id: power_management_mode_status
  type: enum
  values: [0, 1]
  query_command: QSU:ECS

- id: no_signal_power_off_status
  type: enum
  values: [0, 1]
  query_command: QSU:AOF

- id: pc_power_management_status
  type: enum
  values: [0, 1]
  query_command: QSU:DPM

- id: dvi_power_management_status
  type: enum
  values: [0, 1]
  query_command: QSU:DPD

- id: dvi_d1_power_management_status
  type: enum
  values: [0, 1]
  query_command: QSU:D1V

- id: hdmi1_power_management_status
  type: enum
  values: [0, 1]
  query_command: QSU:D1H

- id: hdmi2_power_management_status
  type: enum
  values: [0, 1]
  query_command: QSU:D2H

- id: power_save_status
  type: enum
  values: [0, 1]
  query_command: QSU:ECO

- id: display_orientation_status
  type: enum
  values: [0, 1]
  query_command: QSU:DOR

- id: menu_position_status
  type: integer
  range: [1, 9]
  query_command: QSU:OPS

- id: menu_display_duration_status
  type: integer
  range: [005, 180]
  query_command: QSU:MDT

- id: menu_transparency_status
  type: integer
  range: [000, 100]
  query_command: QSU:MTL

- id: network_setup_status
  type: object
  query_command: QSU:NET

- id: network_setup_port_status
  type: integer
  query_command: QSU:LCP

- id: display_name_status
  type: string
  query_command: QSU:LDN

- id: amx_dd_status
  type: enum
  values: [0, 1]
  query_command: QSU:ADD

- id: crestron_connected_status
  type: enum
  values: [0, 1]
  query_command: QSU:CRV

- id: display_id_auto_setup_status
  type: enum
  values: [0, 1]
  query_command: QID:SID

- id: serial_id_status
  type: integer
  query_command: QIF

- id: display_id_status
  type: integer
  range: [000, 100]
  query_command: QID:DID

- id: yc_filter_status
  type: enum
  values: [0, 1]
  query_command: QSG:YCS

- id: color_system_status
  type: string
  query_command: QSG:COS

- id: sync_signal_status
  type: string
  query_command: QSG:SNC

- id: cinema_reality_status
  type: enum
  values: [0, 1]
  query_command: QSG:DCR

- id: xga_mode_status
  type: integer
  query_command: QSG:XGA

- id: noise_reduction_status
  type: string
  query_command: QSG:NRS

- id: mpeg_noise_reduction_status
  type: string
  query_command: QSG:MNR

- id: signal_range_status
  type: string
  query_command: QSG:HRC

- id: component_rgb_select_status
  type: string
  query_command: QSU:CMP

- id: yuv_rgb_select_status
  type: string
  query_command: QSU:DYR

- id: input_level_status
  type: integer
  range: [-16, 16]
  query_command: QWB:ILV

- id: frame_rate_conversion_status
  type: integer
  query_command: QPC:FRC

- id: screensaver_status
  type: integer
  query_command: QSP:SCR

- id: screensaver_mode_status
  type: integer
  query_command: QSC:MOD

- id: interval_screensaver_status
  type: object
  query_command: QSC:INT

- id: time_designation_screensaver_status
  type: object
  query_command: QSC:TIM

- id: standby_after_screensaver_status
  type: integer
  query_command: QSC:AOF

- id: current_input_label_status
  type: string
  query_command: QSU:ILA

- id: function_group_status
  type: string
  query_command: QSP:KGR

- id: function_button_status
  type: object
  query_command: QSP:KFN*

- id: function_guide_status
  type: enum
  values: [0, 1]
  query_command: QSP:KFG

- id: multi_display_status
  type: enum
  values: [0, 1]

- id: multi_display_setup_status
  type: object
  query_command: QDC:EXP

- id: timer_program_status
  type: object
  query_command: QIM:PRG**

- id: present_day_status
  type: string
  query_command: QIM:DAY

- id: present_time_status
  type: integer
  query_command: QIM:NOW0****

- id: timer_date_time_status
  type: object
  query_command: QIM:DAT

- id: usb_media_player_status
  type: enum
  values: [0, 1]
  query_command: QUS:UMP

- id: resume_play_status
  type: enum
  values: [0, 1]
  query_command: QUS:RSP

- id: slideshow_duration_status
  type: integer
  range: [005, 600]
  query_command: QUS:SSD

- id: on_screen_display_status
  type: enum
  values: [0, 1]
  query_command: QSP:OSD

- id: initial_input_status
  type: string
  query_command: QSP:IIN

- id: initial_vol_level_status
  type: object
  query_command: QSP:IVL

- id: maximum_vol_level_status
  type: object
  query_command: QSP:MVL

- id: input_lock_status
  type: string
  query_command: QSP:INL

- id: button_lock_status
  type: string
  query_command: QSP:BTL

- id: controller_user_level_status
  type: integer
  query_command: QSP:RCM

- id: off_timer_function_status
  type: enum
  values: [0, 1]
  query_command: QSP:OFT

- id: initial_power_mode_status
  type: string
  query_command: QSP:IPM

- id: power_on_screen_delay_status
  type: string
  query_command: QSP:POD

- id: clock_display_status
  type: enum
  values: [0, 1]
  query_command: QSP:CLK

- id: lan_protocol_status
  type: string
  query_command: QSP:LPN

- id: pc_auto_setup_status
  type: enum
  values: [0, 1]
  query_command: QSP:PAS

- id: no_activity_power_off_status
  type: enum
  values: [0, 1]
  query_command: QSP:NAP

- id: power_management_message_status
  type: enum
  values: [0, 1]
  query_command: QSP:PMM

- id: input_search_function_status
  type: string
  query_command: QSH:FNC

- id: 1st_search_input_status
  type: string
  query_command: QSH:PRI

- id: 2nd_search_input_status
  type: string
  query_command: QSH:SCI

- id: no_signal_warning_status
  type: enum
  values: [0, 1]
  query_command: QIT:NSW

- id: no_signal_warning_timing_status
  type: integer
  range: [01, 60]
  query_command: QIT:SWT

- id: no_signal_error_status
  type: enum
  values: [0, 1]
  query_command: QIT:NSE

- id: no_signal_error_timing_status
  type: integer
  range: [01, 90]
  query_command: QIT:SET

- id: signal_frequency_status
  type: object
  query_command: QFR

- id: signal_format_status
  type: string
  query_command: QSF

- id: model_name_status
  type: string
  query_command: QMN

- id: software_version_main_status
  type: string
  query_command: QRV

- id: software_version_sub_status
  type: string
  query_command: QRV:STB

- id: software_version_eeprom_status
  type: string
  query_command: QRV:EEP

- id: serial_number_status
  type: string
  query_command: QSN

- id: sos_history_status
  type: object
  query_command: QSS

- id: sos_status
  type: string
  query_command: QSS:STS
```

## Variables
```yaml
# UNRESOLVED: detailed variable schema not fully extracted
```

## Events
```yaml
# UNRESOLVED: unsolicited event format not documented
# Device sends QST:NSW* and QST:NSE* when no signal warning/error triggers
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
# Note: PON/QPW always active in standby mode
```

## Notes
Dual-control: RS-232C (9600/8N1) and TCP/IP. Command framing: STX + 3-char cmd + colon + params + ETX. PON and QPW are the only commands documented as responsive in standby. ER401 returned on invalid command. Multi-display control via Display ID and Serial ID. LAN port configurable 1024-65535 via SSU:LCP. Authentication: UNRESOLVED.
<!-- UNRESOLVED: LAN protocol LP1 vs LP2 functional differences -->
<!-- UNRESOLVED: default TCP port not stated -->
<!-- UNRESOLVED: unsolicited event format not documented -->

## Provenance

```yaml
source_domains:
  - docs.connect.panasonic.com
  - pna-b2b-storage-mkt.s3.amazonaws.com
  - manua.ls
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LFE8_SerialCommandList.pdf
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LAN_Protocol_exp.pdf
  - https://docs.connect.panasonic.com/prodisplays/support/rs232c_commandlist_prev.html
  - https://pna-b2b-storage-mkt.s3.amazonaws.com/production/148951_LFE8_Series_Operating_Instruction.pdf
  - https://www.manua.ls/panasonic/th-55lfe8/manual
retrieved_at: 2026-05-19T13:15:50.898Z
last_checked_at: 2026-10-07T13:29:20.879Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:29:20.879Z
matched_actions: 245
action_count: 245
confidence: medium
summary: "All 245 action units map to source commands with matching shapes and serial transport supported; only ~4 query variants unrepresented, coverage above 0.9. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- QGE:PSZ
- QDZ
- QPF:NAM
- QSU:ILA+++
- "LAN protocol LP1/LP2 distinction not fully documented in source"
- "TCP port not stated in source; SSU:LCP sets 1024-65535"
- "detailed variable schema not fully extracted"
- "unsolicited event format not documented"
- "no explicit macro sequences in source"
- "no safety warnings or interlock procedures in source"
- "LAN protocol LP1 vs LP2 functional differences"
- "default TCP port not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
