---
spec_id: admin/panasonic-th-65sf2-55sf2-49sf2-43sf2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic TH-65SF2/55SF2/49SF2/43SF2 Control Spec"
manufacturer: Panasonic
model_family: TH-65SF2
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - TH-65SF2
    - TH-55SF2
    - TH-49SF2
    - TH-43SF2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.connect.panasonic.com
  - ptzprotocols.com
  - github.com
  - mediarealm.com.au
  - help.na.panasonic.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/SF2_SerialCommandList.pdf
  - "https://ptzprotocols.com/1%20TXB%20Protocols/TXB-Panasonic/Panasonic%20Camera%20Protocol_4.0.pdf"
  - https://github.com/ssjoholm/panasonic-cn-cnt/blob/main/Panasonic-CN-CNT-Protocol-v1.md
  - https://www.mediarealm.com.au/articles/panasonic-projector-commands/
  - https://help.na.panasonic.com/manuals/
retrieved_at: 2026-05-19T04:42:11.152Z
last_checked_at: 2026-06-10T01:04:15.438Z
generated_at: 2026-06-10T01:04:15.438Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "USB media player commands partially documented but not fully enumerated in source"
  - "protect mode uses MD5; non-protect mode implies no auth but source does not state \"no password\" explicitly"
  - "most settings are action-based with direct set/get commands."
  - "unsolicited notifications (e.g. signal loss, temperature warning)"
  - "no explicit multi-step macro sequences described in source."
  - "safety warnings and interlock procedures not explicitly stated in source."
  - "complete RS-232C cable wiring diagram not in source"
  - "LAN command response timeout values not stated in source"
  - "command rate limiting / flow control details not stated"
  - "DHCP/DNS configuration options not explicitly enumerated"
  - "standby power consumption not stated"
  - "discrete IR remote code table not included in source"
  - "HDMI-CEC detailed command mapping not fully enumerated in source"
verification:
  verdict: verified
  checked_at: 2026-06-10T01:04:15.438Z
  matched_actions: 183
  action_count: 183
  confidence: medium
  summary: "All 183 spec actions matched to source command tokens with correct parameter ranges; bidirectional coverage confirmed across all documented command families and protocol sections. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Panasonic TH-65SF2/55SF2/49SF2/43SF2 Control Spec

## Summary
FullHD LCD commercial display series supporting both RS-232C serial and LAN (TCP/IP) control. Controls: power, input selection, audio, picture settings, network configuration, HDMI-CEC, multi-display, scheduling, and USB media playback. Two LAN protocols (LP1/LP2) with optional MD5 authentication in protect mode.

<!-- UNRESOLVED: USB media player commands partially documented but not fully enumerated in source -->

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
  port: 1024  # default; user configurable (1024~65535, excl. specific ports)
auth:
  type: null  # UNRESOLVED: protect mode uses MD5; non-protect mode implies no auth but source does not state "no password" explicitly
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
- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: string
      description: HM1/HM2/DL1/DV1/PC1/VD1/UD1/MV1
- id: volume_up
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: 000-100
- id: audio_mute
  label: Audio Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: "0: off, 1: on"
- id: video_mute
  label: Video Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: "0: off, 1: on"
- id: set_aspect
  label: Set Aspect Ratio
  kind: action
  params:
    - name: mode
      type: string
      description: FULL/NORM/ZOOM/ZOM2
- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: VIV/NAT/STD/SUV/GRH/DCM
- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: level
      type: integer
      description: "000~100, DEF"
- id: set_picture_contrast
  label: Set Picture Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: "000~100, DEF"
- id: set_black_level
  label: Set Black Level (Brightness)
  kind: action
  params:
    - name: level
      type: integer
      description: "000~100, DEF"
- id: set_color
  label: Set Color
  kind: action
  params:
    - name: level
      type: integer
      description: "000~100, DEF"
- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: level
      type: integer
      description: "000~100, DEF"
- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: "000~100, DEF"
- id: set_enhance_level
  label: Set Enhance Level
  kind: action
  params:
    - name: level
      type: integer
      description: "1: low, 2: high"
- id: set_gamma
  label: Set Gamma
  kind: action
  params:
    - name: value
      type: string
      description: "20/22/24/26"
- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  params:
    - name: value
      type: string
      description: "032/040/050/065/075/093/107/NTV/U01/U02"
- id: set_dynamic_contrast
  label: Set Dynamic Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: "00~10"
- id: set_color_enhancement
  label: Set Color Enhancement
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_refine_enhancer
  label: Set Refine Enhancer
  kind: action
  params:
    - name: value
      type: integer
      description: "0/1/2/3: OFF/Low/Mid/High"
- id: set_gradation_smoother
  label: Set Gradation Smoother
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_audio_output_select
  label: Set Audio Output Select
  kind: action
  params:
    - name: output
      type: string
      description: SPO/LNO
- id: set_balance
  label: Set Balance
  kind: action
  params:
    - name: level
      type: integer
      description: "-20~000~+20"
- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: string
      description: STD(AUT)/DYN/CLR
- id: set_bass
  label: Set Bass
  kind: action
  params:
    - name: level
      type: integer
      description: "-20~000~+20"
- id: set_treble
  label: Set Treble
  kind: action
  params:
    - name: level
      type: integer
      description: "-20~000~+20"
- id: set_surround
  label: Set Surround
  kind: action
  params:
    - name: value
      type: string
      description: MON/OFF
- id: set_h_position
  label: Set Horizontal Position
  kind: action
  params:
    - name: value
      type: integer
      description: "-100~0000~+100"
- id: set_h_size
  label: Set Horizontal Size
  kind: action
  params:
    - name: value
      type: integer
      description: "-100~0000~+100"
- id: set_v_position
  label: Set Vertical Position
  kind: action
  params:
    - name: value
      type: integer
      description: "-100~0000~+100"
- id: set_v_size
  label: Set Vertical Size
  kind: action
  params:
    - name: value
      type: integer
      description: "-100~0000~+100"
- id: set_clock_phase
  label: Set Clock Phase
  kind: action
  params:
    - name: value
      type: integer
      description: "00~30"
- id: set_dot_clock
  label: Set Dot Clock
  kind: action
  params:
    - name: value
      type: integer
      description: "-5~00~+5"
- id: set_pixel_mode
  label: Set 1:1 Pixel Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: auto_setup
  label: Auto Setup
  kind: action
  params: []
- id: set_wobbling
  label: Set Wobbling
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_no_activity_power_off
  label: Set No Activity Power Off
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: string
      description: ENG/DEU/FRA/ITL(ITA)/ESP/USA/CHA/JPN/RUS
- id: set_display_orientation
  label: Set Display Orientation
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Landscape, 1: Portrait"
- id: set_image_rotation
  label: Set Image Rotation
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: 180 degrees"
- id: set_menu_position
  label: Set Menu Position
  kind: action
  params:
    - name: value
      type: integer
      description: "1/2/3"
- id: set_menu_duration
  label: Set Menu Display Duration
  kind: action
  params:
    - name: seconds
      type: integer
      description: "005~180 (5-second units)"
- id: set_menu_transparency
  label: Set Menu Transparency
  kind: action
  params:
    - name: level
      type: integer
      description: "000~100"
- id: set_screensaver
  label: Set Screensaver On/Off
  kind: action
  params:
    - name: value
      type: integer
      description: "0: stop, 5: operating"
- id: set_screensaver_mode
  label: Set Screensaver Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0/1/2/3/4"
- id: set_screensaver_interval
  label: Set Interval Screensaver
  kind: action
  params:
    - name: start
      type: string
      description: "0000~2359 (HHMM)"
    - name: end
      type: string
      description: "0000~2359 (HHMM)"
- id: set_screensaver_time_designation
  label: Set Time Designation Screensaver
  kind: action
  params:
    - name: start
      type: string
      description: "0000~2359 (HHMM)"
    - name: end
      type: string
      description: "0000~2359 (HHMM)"
- id: set_standby_after_screensaver
  label: Set Standby After Screensaver
  kind: action
  params:
    - name: time
      type: string
      description: "0000~2359 (HHMM)"
- id: set_input_label
  label: Set Input Label
  kind: action
  params:
    - name: input
      type: string
      description: HM1/HM2/DL1/DV1/PC1/VD1/UD1/MV1
    - name: label
      type: string
      description: INP/PCN/DV1/DV2/DV3/BD1/BD2/BD3/CTV/VCR/STB/SKP
- id: set_power_management_mode
  label: Set Power Management Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0: Custom, 1: ON"
- id: set_no_signal_power_off
  label: Set No Signal Power Off
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_hdmi1_power_management
  label: Set HDMI1 Power Management
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_hdmi2_power_management
  label: Set HDMI2 Power Management
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_digital_link_power_management
  label: Set DIGITAL LINK Power Management
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_dvi_power_management
  label: Set DVI-D Power Management
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_pc_power_management
  label: Set PC Power Management
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_power_save
  label: Set Power Save
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_extended_standby
  label: Set Extended Standby Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_hdmi_cec_control
  label: Set HDMI-CEC Control
  kind: action
  params:
    - name: value
      type: integer
      description: "0: disable, 1: enable"
- id: hdmi1_change_device
  label: HDMI1 Change Device
  kind: action
  params:
    - name: direction
      type: string
      description: NXT/PRE
- id: hdmi2_change_device
  label: HDMI2 Change Device
  kind: action
  params:
    - name: direction
      type: string
      description: NXT/PRE
- id: set_hdmi_cec_menu_code
  label: Set HDMI-CEC Menu Code
  kind: action
  params:
    - name: code
      type: integer
      description: "1~6"
- id: set_display_to_device
  label: Set Display to Device Command
  kind: action
  params:
    - name: value
      type: string
      description: OFF/POF/PWR
- id: set_device_to_display
  label: Set Device to Display Command
  kind: action
  params:
    - name: value
      type: string
      description: OFF/PON/PWR
- id: set_startup_image
  label: Set Startup Image
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_startup_image_select
  label: Set Startup Image Select
  kind: action
  params:
    - name: value
      type: integer
      description: "0: default image, 1: user image"
- id: set_no_signal_image
  label: Set No Signal Image
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_no_signal_image_select
  label: Set No Signal Image Select
  kind: action
  params:
    - name: value
      type: integer
      description: "0: default image, 1: user image"
- id: set_multi_display_on
  label: Set Multi Display On/Off
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_multi_display_setup
  label: Set Multi Display Setup
  kind: action
  params:
    - name: on_off
      type: integer
      description: "0: off, 1: on"
    - name: h_scale
      type: integer
      description: "01~10"
    - name: v_scale
      type: integer
      description: "01~10"
    - name: bezel_h
      type: integer
      description: "000~100"
    - name: bezel_v
      type: integer
      description: "000~100"
    - name: location
      type: integer
      description: "001~100 (A1~J10)"
- id: set_timer
  label: Set Timer Program
  kind: action
  params:
    - name: program
      type: integer
      description: "01~20"
    - name: on_off
      type: integer
      description: "0: off, 1: on"
    - name: day
      type: string
      description: SUN/MON/TUE/WED/THU/FRI/SAT/EVD
    - name: action
      type: string
      description: PON/POF
    - name: time
      type: string
      description: "0000~2359 (HHMM)"
    - name: input
      type: string
      description: HM1/HM2/DL1/DV1/PC1/VD1/UD1/MV1
- id: set_date_time
  label: Set Date and Time
  kind: action
  params:
    - name: year
      type: integer
      description: "2017~2035"
    - name: month
      type: integer
      description: "01~12"
    - name: day
      type: integer
      description: "01~31"
    - name: hour
      type: integer
      description: "00~23"
    - name: minute
      type: integer
      description: "00~59"
- id: set_synchronize_display
  label: Set Synchronize Display
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_parent_child
  label: Set Parent or Child Setting
  kind: action
  params:
    - name: value
      type: integer
      description: "0: child, 1: parent"
- id: set_serial_control
  label: Set Serial Control
  kind: action
  params:
    - name: mode
      type: string
      description: SE1/DL1
- id: set_network_control
  label: Set Network Control
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_auto_display_name
  label: Set Auto Display Name
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_display_name
  label: Set Display Name
  kind: action
  params:
    - name: name
      type: string
      description: "Max 8 ASCII characters"
- id: set_lan_setup
  label: Set LAN Setup
  kind: action
  params:
    - name: ip1
      type: integer
      description: "000~255 (1st byte)"
    - name: ip2
      type: integer
      description: "000~255 (2nd byte)"
    - name: ip3
      type: integer
      description: "000~255 (3rd byte)"
    - name: ip4
      type: integer
      description: "000~255 (4th byte)"
    - name: sn1
      type: integer
      description: "000~255 (subnet 1st byte)"
    - name: sn2
      type: integer
      description: "000~255 (subnet 2nd byte)"
    - name: sn3
      type: integer
      description: "000~255 (subnet 3rd byte)"
    - name: sn4
      type: integer
      description: "000~255 (subnet 4th byte)"
    - name: gw1
      type: integer
      description: "000~255 (gateway 1st byte)"
    - name: gw2
      type: integer
      description: "000~255 (gateway 2nd byte)"
    - name: gw3
      type: integer
      description: "000~255 (gateway 3rd byte)"
    - name: gw4
      type: integer
      description: "000~255 (gateway 4th byte)"
    - name: dhcp
      type: integer
      description: "0: off, 1: on"
- id: set_lan_port
  label: Set LAN Port Number
  kind: action
  params:
    - name: port
      type: integer
      description: "01024~65535"
- id: set_digital_link_mode
  label: Set DIGITAL LINK Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AT/DL/EN
- id: set_amx_dd
  label: Set AMX D.D.
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_crestron_connected
  label: Set Crestron Connected
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_extron_xtp
  label: Set Extron XTP
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_usb_network_settings
  label: Set USB Memory Network Settings
  kind: action
  params:
    - name: value
      type: integer
      description: "0: prohibit, 1: permit"
- id: reset
  label: Reset
  kind: action
  params: []
- id: set_usb_media_player
  label: Set USB Media Player
  kind: action
  params:
    - name: value
      type: integer
      description: "0: disable, 1: enable"
- id: set_schedule_play
  label: Set Schedule Play Function
  kind: action
  params:
    - name: value
      type: integer
      description: "0: disable, 1: enable"
- id: set_video_playback_mode
  label: Set Video Playback Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0: standard, 1: adjust"
- id: set_resume_play
  label: Set Resume Play
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_slideshow_duration
  label: Set Slide Show Duration
  kind: action
  params:
    - name: seconds
      type: integer
      description: "010~600"
- id: set_playmode
  label: Set Play Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0: individual, 1: synchronize"
- id: set_memory_viewer_function
  label: Set Memory Viewer Function
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_memory_viewer_view
  label: Set Memory Viewer View
  kind: action
  params:
    - name: mode
      type: string
      description: THU/LIS
- id: set_memory_viewer_content
  label: Set Memory Viewer Content Select
  kind: action
  params:
    - name: content
      type: string
      description: STL/VID/AUD/ALL
- id: set_memory_viewer_sort_type
  label: Set Memory Viewer Sort Type
  kind: action
  params:
    - name: type
      type: string
      description: DAT/NAM
- id: set_memory_viewer_sort_order
  label: Set Memory Viewer Sort Order
  kind: action
  params:
    - name: order
      type: string
      description: ASD/DSD
- id: set_memory_viewer_play_method
  label: Set Memory Viewer Play Method
  kind: action
  params:
    - name: method
      type: string
      description: NON/ONE/ALL/RAN
- id: set_function_group
  label: Set Function Group
  kind: action
  params:
    - name: group
      type: string
      description: INP/MEM/ACT
- id: set_function_button
  label: Set Function Button Settings
  kind: action
  params:
    - name: button
      type: integer
      description: "1~6"
    - name: value
      type: string
      description: "SIG/SSV/SUT/LNS/ECO/OSH/MLT/DZM/DID/HCO or HM1/HM2/DL1/DV1/PC1/VD1/UD1/MV1"
- id: set_function_guide
  label: Set Function Guide Settings
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_on_screen_display
  label: Set On Screen Display
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_initial_input
  label: Set Initial Input
  kind: action
  params:
    - name: input
      type: string
      description: OFF/HM1/HM2/DL1/DV1/PC1/VD1/UD1/MV1
- id: set_initial_vol
  label: Set Initial VOL Level
  kind: action
  params:
    - name: on_off
      type: integer
      description: "0: off, 1: on"
    - name: level
      type: integer
      description: "000~100"
- id: set_maximum_vol
  label: Set Maximum VOL Level
  kind: action
  params:
    - name: on_off
      type: integer
      description: "0: off, 1: on"
    - name: level
      type: integer
      description: "000~100"
- id: set_input_lock
  label: Set Input Lock
  kind: action
  params:
    - name: input
      type: string
      description: OFF/HM1/HM2/DL1/DV1/PC1/VD1/UD1/MV1
- id: set_button_lock
  label: Set Button Lock
  kind: action
  params:
    - name: value
      type: string
      description: OFF/MEN/ALL
- id: set_controller_user_level
  label: Set Controller User Level
  kind: action
  params:
    - name: level
      type: integer
      description: "0/1/2/3"
- id: set_pc_auto_setting
  label: Set PC Auto Setting
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_off_timer
  label: Set Off Timer Function
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_initial_startup
  label: Set Initial Startup
  kind: action
  params:
    - name: mode
      type: string
      description: LST/PON/STB
- id: set_serial_id_function
  label: Set Serial ID Function
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_serial_response_normal
  label: Set Serial Response (Normal)
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_serial_response_id_all
  label: Set Serial Response (ID All)
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_serial_id_setup
  label: Set Serial ID Setup
  kind: action
  params:
    - name: on_off
      type: integer
      description: "0: off, 1: on"
    - name: display_id
      type: integer
      description: "000~100"
- id: set_serial_daisychain_position
  label: Set Serial Daisy Chain Position
  kind: action
  params:
    - name: position
      type: string
      description: TOP/DEF/END
- id: set_lan_control_protocol
  label: Set LAN Control Protocol
  kind: action
  params:
    - name: protocol
      type: string
      description: LP1/LP2
- id: set_power_on_screen_delay
  label: Set Power ON Screen Delay
  kind: action
  params:
    - name: value
      type: string
      description: AT/00~30
- id: set_clock_display
  label: Set Clock Display
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_power_on_message_no_activity
  label: Set Power On Message (No Activity Power Off)
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_power_on_message_power_management
  label: Set Power On Message (Power Management)
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_input_search_function
  label: Set Input Search Function
  kind: action
  params:
    - name: mode
      type: string
      description: OFF/ALL/PRI/IDC
- id: set_1st_search_input
  label: Set 1st Search Input
  kind: action
  params:
    - name: input
      type: string
      description: NON/HM1/HM2/DV1/PC1/VD1/UD1
- id: set_2nd_search_input
  label: Set 2nd Search Input
  kind: action
  params:
    - name: input
      type: string
      description: NON/HM1/HM2/DV1/PC1/VD1/UD1
- id: set_detect_digital_input
  label: Set Detect Digital Input
  kind: action
  params:
    - name: input
      type: string
      description: HM1/HM2/DL1/DV1/PC1
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_changing_delay
  label: Set Changing Delay
  kind: action
  params:
    - name: value
      type: integer
      description: "00~10"
- id: set_input_change_mode_off
  label: Set Input Change Mode Off
  kind: action
  params: []
- id: set_input_change_mode_quick
  label: Set Input Change Mode Quick
  kind: action
  params:
    - name: primary
      type: string
      description: NON/HM1/HM2/DL1/DV1
    - name: secondary
      type: string
      description: NON/HM1/HM2/DL1/DV1
    - name: auto_switch_back
      type: integer
      description: "0: disable, 1: enable"
- id: set_input_change_mode_normal
  label: Set Input Change Mode Normal
  kind: action
  params:
    - name: primary
      type: string
      description: NON/HM1/HM2/DL1/DV1/PC1/VD1/UD1
    - name: secondary
      type: string
      description: NON/HM1/HM2/DL1/DV1/PC1/VD1/UD1
    - name: auto_switch_back
      type: integer
      description: "0: disable, 1: enable"
- id: set_changing_mode
  label: Set Changing Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "2: high speed, 1: normal"
- id: manual_switch_back
  label: Manual Switch Back
  kind: action
  params: []
- id: set_audio_input_current
  label: Set Audio Input for Current Input
  kind: action
  params:
    - name: video
      type: string
      description: HM1/HM2/DL1/DV1/PC1/VD1
    - name: audio
      type: string
      description: HM1/HM2/DL1/DV1/PC1/VD1/NAD
- id: set_audio_input_each
  label: Set Audio Input for Each Input
  kind: action
  params:
    - name: video
      type: string
      description: HM1/HM2/DL1/DV1/PC1/VD1
    - name: audio
      type: string
      description: HM1/HM2/DL1/DV1/PC1/VD1/NAD
- id: set_no_signal_warning
  label: Set No Signal Warning
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_no_signal_warning_timing
  label: Set No Signal Warning Timing
  kind: action
  params:
    - name: minutes
      type: integer
      description: "01~60"
- id: set_no_signal_error
  label: Set No Signal Error
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_no_signal_error_timing
  label: Set No Signal Error Timing
  kind: action
  params:
    - name: minutes
      type: integer
      description: "01~90"
- id: set_temperature_warning
  label: Set Temperature Warning
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: digital_zoom
  label: Digital Zoom
  kind: action
  params:
    - name: on_off
      type: integer
      description: "0: off, 1: on"
    - name: factor
      type: integer
      description: "1~4"
    - name: h_pos
      type: integer
      description: "1~5"
    - name: v_pos
      type: integer
      description: "1~5"
- id: set_off_timer_minutes
  label: Set Off Timer (Minutes)
  kind: action
  params:
    - name: minutes
      type: integer
      description: "00~90"
- id: usb_skip_next
  label: USB Media Player Skip Next
  kind: action
  params: []
- id: usb_skip_previous
  label: USB Media Player Skip Previous
  kind: action
  params: []
- id: usb_replay_from_top
  label: USB Media Player Replay From Top
  kind: action
  params: []
- id: memory_delete
  label: Memory Delete
  kind: action
  params:
    - name: slot
      type: integer
      description: "01~06"
- id: memory_load
  label: Memory Load
  kind: action
  params:
    - name: slot
      type: integer
      description: "01~06"
- id: memory_save
  label: Memory Save
  kind: action
  params:
    - name: slot
      type: integer
      description: "01~06"
    - name: name
      type: string
      description: "Max 20 chars"
- id: memory_name_change
  label: Memory Name Change
  kind: action
  params:
    - name: slot
      type: integer
      description: "01~06"
    - name: name
      type: string
      description: "Max 20 chars"
- id: set_red_gain
  label: Set Red Gain
  kind: action
  params:
    - name: level
      type: integer
      description: "0000~0255"
- id: set_green_gain
  label: Set Green Gain
  kind: action
  params:
    - name: level
      type: integer
      description: "0000~0255"
- id: set_blue_gain
  label: Set Blue Gain
  kind: action
  params:
    - name: level
      type: integer
      description: "0000~0255"
- id: set_red_bias
  label: Set Red Bias
  kind: action
  params:
    - name: value
      type: integer
      description: "-127~0000~0128"
- id: set_green_bias
  label: Set Green Bias
  kind: action
  params:
    - name: value
      type: integer
      description: "-127~0000~0128"
- id: set_blue_bias
  label: Set Blue Bias
  kind: action
  params:
    - name: value
      type: integer
      description: "-127~0000~0128"
- id: set_6seg_color_management
  label: Set 6-Segment Color Management
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_6seg_color_adjust
  label: Set 6-Segment Color Adjustment
  kind: action
  params:
    - name: color
      type: string
      description: R/Y/G/C/B/M
    - name: tint
      type: integer
      description: "-511~0000~0511"
    - name: saturation
      type: integer
      description: "-127~0000~0127"
    - name: value
      type: integer
      description: "-127~0000~0127"
- id: reset_6seg_color
  label: Reset 6-Segment Color Management
  kind: action
  params: []
- id: set_position_size_lump
  label: Set Position/Size Lump Setting
  kind: action
  params:
    - name: h_pos
      type: integer
      description: "-100~0000~+100"
    - name: h_size
      type: integer
      description: "-100~0000~+100"
    - name: v_pos
      type: integer
      description: "-100~0000~+100"
    - name: v_size
      type: integer
      description: "-100~0000~+100"
- id: set_3d_yc_filter
  label: Set 3D Y/C Filter
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_color_system
  label: Set Color System
  kind: action
  params:
    - name: mode
      type: string
      description: NTS/PAL/SCM/4NT/MPA/NPA/AUT
- id: set_sync_signal
  label: Set Sync Signal Setting
  kind: action
  params:
    - name: mode
      type: string
      description: HAV/GRN/HVS
- id: set_cinema_reality
  label: Set Cinema Reality 3:2 Pull Down
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_xga_mode
  label: Set XGA Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "1: 1024x768, 2: 1280x768, 3: 1366x768, 4: Auto"
- id: set_noise_reduction
  label: Set Noise Reduction
  kind: action
  params:
    - name: mode
      type: string
      description: OFF/AUT/LOW/MID/HIG
- id: set_mpeg_noise_reduction
  label: Set MPEG Noise Reduction
  kind: action
  params:
    - name: mode
      type: string
      description: OFF/LOW/MID/HIG
- id: set_signal_range
  label: Set Signal Range
  kind: action
  params:
    - name: mode
      type: string
      description: VID/FUL/AUT
- id: set_component_rgb_in
  label: Set Component/RGB-IN Select
  kind: action
  params:
    - name: mode
      type: string
      description: YBR/RGB
- id: set_yuv_rgb_in
  label: Set YUV/RGB-IN Select
  kind: action
  params:
    - name: mode
      type: string
      description: YUV/RGB
- id: set_input_level
  label: Set Input Level
  kind: action
  params:
    - name: value
      type: integer
      description: "-16~000~+16"
- id: set_frame_creation
  label: Set Frame Creation
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_dynamic_backlight_control
  label: Set Dynamic Backlight Control
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_memory_viewer_picture_duration
  label: Set Memory Viewer Picture Duration
  kind: action
  params:
    - name: seconds
      type: integer
      description: "010~600"
- id: set_memory_viewer_content_info
  label: Set Memory Viewer Auto Display Content Info
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: set_memory_viewer_operation_guide
  label: Set Memory Viewer Auto Display Operation Guide
  kind: action
  params:
    - name: value
      type: integer
      description: "0: off, 1: on"
- id: recall
  label: Recall
  kind: action
  params: []
- id: recall_display_id
  label: Recall Display ID and Display Name
  kind: action
  params: []
- id: audio_mute_direct
  label: Audio Mute Direct
  kind: action
  params:
    - name: value
      type: integer
      description: "0: mute off, 1: mute on"
- id: osd_clear
  label: OSD Clear
  kind: action
  params: []
- id: set_auto_command_send
  label: Set Auto Command Send Setting
  kind: action
  params:
    - name: qss_mode
      type: integer
      description: "0: off, 1: on (QSS auto send)"
    - name: qss_stserr_mode
      type: integer
      description: "0: off, 1: on (QSS:STSERR auto send)"
- id: select_digital_link_input_yfb
  label: Select Digital Link Input for YFB Series
  kind: action
  params:
    - name: input
      type: string
      description: HD1/HD2/PC1/PC2/SVD/VID
- id: set_input_label_current
  label: Set Input Label for Current Input
  kind: action
  params:
    - name: label
      type: string
      description: INP/PCN/DV1/DV2/DV3/BD1/BD2/BD3/CTV/VCR/STB/SKP
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status Query
  kind: feedback
  params: []
  returns:
    type: integer
    values:
      - 0
      - 1
    description: "0: Standby (Off), 1: Power ON (On)"
- id: current_input
  label: Current Input Query
  kind: feedback
  params: []
  returns:
    type: string
    description: HM1/HM2/DL1/DV1/PC1/VD1/UD1/MV1
- id: current_volume
  label: Current Audio Volume Query
  kind: feedback
  params: []
  returns:
    type: integer
    range: "000-100"
- id: audio_mute_status
  label: Audio Mute Status Query
  kind: feedback
  params: []
  returns:
    type: integer
    values:
      - 0
      - 1
    description: "0: off, 1: on"
- id: video_mute_status
  label: Video Mute Status Query
  kind: feedback
  params: []
  returns:
    type: integer
    values:
      - 0
      - 1
    description: "0: off, 1: on"
- id: aspect_status
  label: Aspect Ratio Query
  kind: feedback
  params: []
  returns:
    type: string
    description: FULL/NORM/ZOOM/ZOM2
- id: picture_mode_status
  label: Picture Mode Query
  kind: feedback
  params: []
  returns:
    type: string
    description: VIV/NAT/STD/SUV/GRH/DCM
- id: backlight_status
  label: Backlight Query
  kind: feedback
  params: []
  returns:
    type: integer
    range: "000~100, DEF"
- id: picture_contrast_status
  label: Picture Contrast Query
  kind: feedback
  params: []
  returns:
    type: integer
    range: "000~100, DEF"
- id: black_level_status
  label: Black Level Query
  kind: feedback
  params: []
  returns:
    type: integer
    range: "000~100, DEF"
- id: color_status
  label: Color Query
  kind: feedback
  params: []
  returns:
    type: integer
    range: "000~100, DEF"
- id: tint_status
  label: Tint Query
  kind: feedback
  params: []
  returns:
    type: integer
    range: "000~100, DEF"
- id: sharpness_status
  label: Sharpness Query
  kind: feedback
  params: []
  returns:
    type: integer
    range: "000~100, DEF"
- id: enhance_level_status
  label: Enhance Level Query
  kind: feedback
  params: []
  returns:
    type: integer
    values:
      - 1
      - 2
    description: "1: low, 2: high"
- id: gamma_status
  label: Gamma Query
  kind: feedback
  params: []
  returns:
    type: string
    description: "20/22/24/26"
- id: color_temperature_status
  label: Color Temperature Query
  kind: feedback
  params: []
  returns:
    type: string
    description: "032/040/050/065/075/093/107/NTV/U01/U02"
- id: dynamic_contrast_status
  label: Dynamic Contrast Query
  kind: feedback
  params: []
  returns:
    type: integer
    range: "00~10"
- id: color_enhancement_status
  label: Color Enhancement Query
  kind: feedback
  params: []
  returns:
    type: integer
    values:
      - 0
      - 1
    description: "0: off, 1: on"
- id: refine_enhancer_status
  label: Refine Enhancer Query
  kind: feedback
  params: []
  returns:
    type: integer
    values:
      - 0
      - 1
      - 2
      - 3
    description: "0/1/2/3: OFF/Low/Mid/High"
- id: gradation_smoother_status
  label: Gradation Smoother Query
  kind: feedback
  params: []
  returns:
    type: integer
    values:
      - 0
      - 1
    description: "0: off, 1: on"
- id: audio_output_select_status
  label: Audio Output Select Query
  kind: feedback
  params: []
  returns:
    type: string
    description: SPO/LNO
- id: balance_status
  label: Balance Query
  kind: feedback
  params: []
  returns:
    type: integer
    range: "-20~000~+20"
- id: sound_mode_status
  label: Sound Mode Query
  kind: feedback
  params: []
  returns:
    type: string
    description: STD(AUT)/DYN/CLR
- id: bass_status
  label: Bass Query
  kind: feedback
  params: []
  returns:
    type: integer
    range: "-20~000~+20"
- id: treble_status
  label: Treble Query
  kind: feedback
  params: []
  returns:
    type: integer
    range: "-20~000~+20"
- id: surround_status
  label: Surround Query
  kind: feedback
  params: []
  returns:
    type: string
    description: MON/OFF
- id: h_position_status
  label: Horizontal Position Query
  kind: feedback
  params: []
  returns:
    type: integer
    range: "-100~0000~+100"
- id: h_size_status
  label: Horizontal Size Query
  kind: feedback
  params: []
  returns:
    type: integer
    range: "-100~0000~+100"
- id: v_position_status
  label: Vertical Position Query
  kind: feedback
  params: []
  returns:
    type: integer
    range: "-100~0000~+100"
- id: v_size_status
  label: Vertical Size Query
  kind: feedback
  params: []
  returns:
    type: integer
    range: "-100~0000~+100"
- id: clock_phase_status
  label: Clock Phase Query
  kind: feedback
  params: []
  returns:
    type: integer
    range: "00~30"
- id: dot_clock_status
  label: Dot Clock Query
  kind: feedback
  params: []
  returns:
    type: integer
    range: "-5~00~+5"
- id: pixel_mode_status
  label: 1:1 Pixel Mode Query
  kind: feedback
  params: []
  returns:
    type: integer
    values:
      - 0
      - 1
    description: "0: off, 1: on"
- id: overscan_status
  label: Overscan Query
  kind: feedback
  params: []
  returns:
    type: integer
    values:
      - 0
      - 1
    description: "0: off, 1: on"
- id: auto_setup_status
  label: Auto Setup Query
  kind: feedback
  params: []
  returns:
    type: string
    description: OK/NG/OF/NW
- id: memory_state_status
  label: Memory State Query
  kind: feedback
  params: []
  returns:
    type: array
    description: "-/0 (Memory No.1-No.06)"
- id: timer_status
  label: Timer Program Query
  kind: feedback
  params: []
  returns:
    type: string
    description: Full timer config including day, time, input
- id: present_day
  label: Present Day Query
  kind: feedback
  params: []
  returns:
    type: string
    description: SUN/MON/TUE/WED/THU/FRI/SAT
- id: present_time
  label: Present Time Query
  kind: feedback
  params: []
  returns:
    type: string
    description: "0000~2359 (HHMM)"
- id: digital_link_status
  label: DIGITAL LINK Status Query
  kind: feedback
  params: []
  returns:
    type: string
    description: "0/1/2/3 + HDMI status + signal quality"
- id: signal_status
  label: Signal Status Query
  kind: feedback
  params: []
  returns:
    type: integer
    values:
      - 0
      - 1
      - 2
    description: "0: valid signal, 1: no signal, 2: unsupported signal"
- id: signal_frequency
  label: Signal Frequency Query
  kind: feedback
  params: []
  returns:
    type: string
    description: "H***.** V***.** (horizontal and vertical frequency)"
- id: signal_format
  label: Signal Format Query
  kind: feedback
  params: []
  returns:
    type: string
    description: "Max 20 characters"
- id: model_name
  label: Model Name Query
  kind: feedback
  params: []
  returns:
    type: string
    description: "inch size / F / year (e.g. 65/F/17)"
- id: model_inquiry
  label: Model Inquiry
  kind: feedback
  params: []
  returns:
    type: string
    description: "inch size / SF2 / market (J/U/E/W/C)"
- id: software_version_main_mcu
  label: Software Version Main MCU
  kind: feedback
  params: []
  returns:
    type: string
    description: "*.**** SF2"
- id: software_version_sub_mcu
  label: Software Version Sub MCU
  kind: feedback
  params: []
  returns:
    type: string
- id: software_version_eeprom
  label: Software Version EEPROM
  kind: feedback
  params: []
  returns:
    type: string
- id: software_version_hdbaset_rx
  label: Software Version HDBaseT RX
  kind: feedback
  params: []
  returns:
    type: string
- id: software_version_frc
  label: Software Version FRC
  kind: feedback
  params: []
  returns:
    type: string
    description: "(65inch only)"
- id: serial_number
  label: Serial Number Query
  kind: feedback
  params: []
  returns:
    type: string
    description: "ASCII 9~15 characters"
- id: sos_history
  label: SOS History Query
  kind: feedback
  params: []
  returns:
    type: string
    description: "00~FF per slot, up to 10 entries"
- id: sos_status
  label: SOS Status Query
  kind: feedback
  params: []
  returns:
    type: string
    description: NON/ERR/EXT
- id: hdmi1_device_name
  label: HDMI1 Device Name Query
  kind: feedback
  params: []
  returns:
    type: string
    description: "Max 23 chars"
- id: hdmi2_device_name
  label: HDMI2 Device Name Query
  kind: feedback
  params: []
  returns:
    type: string
    description: "Max 23 chars"
- id: display_id
  label: Display ID Query
  kind: feedback
  params: []
  returns:
    type: integer
    range: "000~100"
- id: schedule_play_mode
  label: Schedule Play Mode Query
  kind: feedback
  params: []
  returns:
    type: integer
    values:
      - 0
      - 1
    description: "0: normal, 1: schedule play mode"
- id: digital_link_detail_status
  label: DIGITAL LINK Detail Status Query
  kind: feedback
  params: []
  returns:
    type: string
    description: Link/HDMI/signal quality/channel info
- id: backup_input_status
  label: Backup Input Status Query
  kind: feedback
  params: []
  returns:
    type: string
    description: "active/inactive + input + status"
- id: backup_input_signal_status
  label: Backup Input Signal Status Query
  kind: feedback
  params: []
  returns:
    type: string
    description: "signal status for main/primary/secondary inputs"
- id: no_signal_warning_status
  label: No Signal Warning Status Query
  kind: feedback
  params: []
  returns:
    type: integer
    values:
      - 0
      - 1
- id: no_signal_error_status
  label: No Signal Error Status Query
  kind: feedback
  params: []
  returns:
    type: integer
    values:
      - 0
      - 1
- id: temperature_warning_status
  label: Temperature Warning Status Query
  kind: feedback
  params: []
  returns:
    type: integer
    values:
      - 0
      - 1
    description: "1: HIGH TEMPERATURE-MODE, 0: NORMAL-MODE"
```

## Variables
```yaml
# UNRESOLVED: most settings are action-based with direct set/get commands.
# Variable-style continuous parameters (e.g. backlight level, volume) are
# represented as actions with named parameters above.
```

## Events
```yaml
# UNRESOLVED: unsolicited notifications (e.g. signal loss, temperature warning)
# are sent as messages on the RS-232C/LAN interface but the exact event
# format and triggering conditions are not fully enumerated in the source.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings and interlock procedures not explicitly stated in source.
# Note: device only responds to PON/QPW commands when in standby (power off).
```

## Notes
- Serial protocol: `<STX>CMD:PARAM<ETX>` format, binary: `02h` (STX), `03h` (ETX).
- Commands with no parameters do not require the colon `:` separator.
- In protect mode (LAN Protocol 1 and 2), MD5 hash required: LP1 uses `『zzzzzzzzzyyyyy』` (8-byte random + password), LP2 uses `『xxxxxx:yyyyy:zzzzzzzz』` (username + password + 8-byte random).
- Non-protect mode: no authentication required.
- Response to invalid command: `ER401`.
- Wait for response before sending next command when sending multiple commands.
- Read user image command (Image settings) also returns `ER401`.
- Device ID: models TH-65SF2/55SF2/49SF2/43SF2 — product of 2017 ("F" code).
- DIGITAL LINK features only available on models with DIGITAL LINK hardware.
- YFB100/YFB200 available when YFB100 is connected.
- Some picture adjustment parameters (Backlight, Contrast, Black Level, Color, Tint, Sharpness) only available when Power Save is Off.
- User gain/bias controls only available when Color Temperature is USER1 or USER2.
- Audio adjustments (Balance, Sound Mode, Bass, Treble, Surround) only available when Output Select is SPEAKERS.
- LAN default port: 1024; configurable 1024~65535 (excludes specific ports listed in source).
- LAN control protocol selectable: Protocol 1 (LP1) or Protocol 2 (LP2) via OSP:LPN command.
- When using inquiry commands via LAN in LP1/LP2, the first four characters of the response command are omitted.
- Serial ID format: `<STX>AD94;RAD:<NUM1><NUM2><NUM3>;*****<ETX>` or `<STX>RAD:<NUM1><NUM2><NUM3>;*****<ETX>`.
- Multi display location grid: A1~J10.
- Off timer range: 00~90 minutes.
- Slide show duration: 10~600 seconds (5-second unit).
- No Signal Warning Timing: 01~60 minutes.
- No Signal Error Timing: 01~90 minutes.
- USB media player playback control (skip next/previous/replay) only available when USB media player is active.
<!-- UNRESOLVED: complete RS-232C cable wiring diagram not in source -->
<!-- UNRESOLVED: LAN command response timeout values not stated in source -->
<!-- UNRESOLVED: command rate limiting / flow control details not stated -->
<!-- UNRESOLVED: DHCP/DNS configuration options not explicitly enumerated -->
<!-- UNRESOLVED: standby power consumption not stated -->
<!-- UNRESOLVED: discrete IR remote code table not included in source -->
<!-- UNRESOLVED: HDMI-CEC detailed command mapping not fully enumerated in source -->

## Provenance

```yaml
source_domains:
  - docs.connect.panasonic.com
  - ptzprotocols.com
  - github.com
  - mediarealm.com.au
  - help.na.panasonic.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/SF2_SerialCommandList.pdf
  - "https://ptzprotocols.com/1%20TXB%20Protocols/TXB-Panasonic/Panasonic%20Camera%20Protocol_4.0.pdf"
  - https://github.com/ssjoholm/panasonic-cn-cnt/blob/main/Panasonic-CN-CNT-Protocol-v1.md
  - https://www.mediarealm.com.au/articles/panasonic-projector-commands/
  - https://help.na.panasonic.com/manuals/
retrieved_at: 2026-05-19T04:42:11.152Z
last_checked_at: 2026-06-10T01:04:15.438Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T01:04:15.438Z
matched_actions: 183
action_count: 183
confidence: medium
summary: "All 183 spec actions matched to source command tokens with correct parameter ranges; bidirectional coverage confirmed across all documented command families and protocol sections. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "USB media player commands partially documented but not fully enumerated in source"
- "protect mode uses MD5; non-protect mode implies no auth but source does not state \"no password\" explicitly"
- "most settings are action-based with direct set/get commands."
- "unsolicited notifications (e.g. signal loss, temperature warning)"
- "no explicit multi-step macro sequences described in source."
- "safety warnings and interlock procedures not explicitly stated in source."
- "complete RS-232C cable wiring diagram not in source"
- "LAN command response timeout values not stated in source"
- "command rate limiting / flow control details not stated"
- "DHCP/DNS configuration options not explicitly enumerated"
- "standby power consumption not stated"
- "discrete IR remote code table not included in source"
- "HDMI-CEC detailed command mapping not fully enumerated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
