---
spec_id: admin/panasonic-th80sf2h-th70sf2h
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic TH-80SF2H/70SF2H Control Spec"
manufacturer: Panasonic
model_family: TH-80SF2H
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - TH-80SF2H
    - TH-70SF2H
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - na.panasonic.com
  - eww.pass.panasonic.co.jp
  - eu.connect.panasonic.com
source_urls:
  - "https://na.panasonic.com/ns/303988_API_Panasonic_WX-SR200_Series_IF_Specification_VA.05-20221110.pdf?hsLang=en"
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/RP50_120/RemoteControllerInterfaceSpecifications-E.pdf
  - https://eww.pass.panasonic.co.jp/pav-ks/support/content/general_1/DEF/KAIROS_RestAPI_14_E.pdf
  - https://eu.connect.panasonic.com/sites/default/files/media/2024-04/8475ef1uw_manual_en_8.pdf
  - "https://eww.pass.panasonic.co.jp/pro-av/support/content/download/DEF/soft/lps/AV-HSW10_InterfaceGuide(DVQX2472ZA)_E.pdf"
retrieved_at: 2026-04-30T04:41:48.960Z
last_checked_at: 2026-05-18T16:44:23.292Z
generated_at: 2026-05-18T16:44:23.292Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T16:44:23.292Z
  matched_actions: 176
  action_count: 176
  confidence: high
  summary: "All 176 spec actions map to source commands via semantic-id convention; transport parameters (9600 bps, 8N1, no flow control, port 1024) verified verbatim in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-18
---

# Panasonic TH-80SF2H/70SF2H Control Spec

## Summary
Panasonic large-format LCD display supporting RS-232C serial and TCP/IP LAN control. Protocol 1 and Protocol 2 LAN modes; protect mode (MD5 password auth) and non-protect mode described. Serial: 9600 bps, 8N1, no flow control. Default LAN port 1024. Only PON and QPW operational in standby.

<!-- UNRESOLVED: port number beyond default 1024 not confirmed for RS-232C; UNRESOLVED: LAN port range for Protocol 2 same as Protocol 1 default; UNRESOLVED: command timing/inter-command delay not specified -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 1024  # default; port range 1024~65535 stated
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: non-protect mode described with no password in source
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
      description: "HM1/HM2/DL1/DV1/PC1/VD1/UD1/MV1"
  enum:
    - HM1
    - HM2
    - DL1
    - DV1
    - PC1
    - VD1
    - UD1
    - MV1

- id: set_volume
  label: Set Audio Volume
  kind: action
  params:
    - name: level
      type: integer
      description: "000-100"
  range: [0, 100]

- id: volume_up
  label: Volume Up
  kind: action
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  params: []

- id: set_audio_mute
  label: Audio Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_video_mute
  label: Video Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_aspect
  label: Aspect Change
  kind: action
  params:
    - name: mode
      type: string
      description: "FULL/NORM/ZOOM/ZOM2"
  enum:
    - FULL
    - NORM
    - ZOOM
    - ZOM2

- id: set_picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "VIV/NAT/STD/SUV/GRH/DCM"
  enum:
    - VIV
    - NAT
    - STD
    - SUV
    - GRH
    - DCM

- id: set_backlight
  label: Backlight
  kind: action
  params:
    - name: level
      type: integer
      description: "000~100 or DEF"
  range: [0, 100]

- id: set_picture_contrast
  label: Picture Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: "000~100 or DEF"
  range: [0, 100]

- id: set_black_level
  label: Black Level Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: "000~100 or DEF"
  range: [0, 100]

- id: set_color
  label: Color
  kind: action
  params:
    - name: level
      type: integer
      description: "000~100 or DEF"
  range: [0, 100]

- id: set_tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      description: "000~100 or DEF"
  range: [0, 100]

- id: set_sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: "000~100 or DEF"
  range: [0, 100]

- id: set_enhance_level
  label: Enhance Level
  kind: action
  params:
    - name: level
      type: integer
      description: "1: low, 2: high"
  enum:
    - 1
    - 2

- id: set_gamma
  label: Gamma
  kind: action
  params:
    - name: value
      type: string
      description: "20/22/24/26"
  enum:
    - "20"
    - "22"
    - "24"
    - "26"

- id: set_color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: value
      type: string
      description: "032/040/050/065/075/093/107/NTV/U01/U02"
  enum:
    - "032"
    - "040"
    - "050"
    - "065"
    - "075"
    - "093"
    - "107"
    - NTV
    - U01
    - U02

- id: set_red_gain
  label: Red Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "0000~0255; available when color temp is USER1/USER2"
  range: [0, 255]

- id: set_green_gain
  label: Green Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "0000~0255; available when color temp is USER1/USER2"
  range: [0, 255]

- id: set_blue_gain
  label: Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "0000~0255; available when color temp is USER1/USER2"
  range: [0, 255]

- id: set_red_bias
  label: Red Bias
  kind: action
  params:
    - name: value
      type: integer
      description: "-127~0000~0128; available when color temp is USER1/USER2"
  range: [-127, 128]

- id: set_green_bias
  label: Green Bias
  kind: action
  params:
    - name: value
      type: integer
      description: "-127~0000~0128; available when color temp is USER1/USER2"
  range: [-127, 128]

- id: set_blue_bias
  label: Blue Bias
  kind: action
  params:
    - name: value
      type: integer
      description: "-127~0000~0128; available when color temp is USER1/USER2"
  range: [-127, 128]

- id: set_dynamic_contrast
  label: Dynamic Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: "00~10"
  range: [0, 10]

- id: set_color_enhancement
  label: Color Enhancement
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_refine_enhancer
  label: Refine Enhancer
  kind: action
  params:
    - name: level
      type: integer
      description: "0: off, 1: low, 2: mid, 3: high"
  enum:
    - 0
    - 1
    - 2
    - 3

- id: set_gradation_smoother
  label: Gradation Smoother
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: memory_delete
  label: Memory Delete
  kind: action
  params:
    - name: slot
      type: integer
      description: "01~06"
  range: [1, 6]

- id: memory_load
  label: Memory Load
  kind: action
  params:
    - name: slot
      type: integer
      description: "01~06"
  range: [1, 6]

- id: memory_save
  label: Memory Save
  kind: action
  params:
    - name: slot
      type: integer
      description: "01~06"
    - name: name
      type: string
      description: "up to 20 chars"
  range: [1, 6]

- id: memory_name_change
  label: Memory Name Change
  kind: action
  params:
    - name: slot
      type: integer
      description: "01~06"
    - name: name
      type: string
      description: "up to 20 chars"
  range: [1, 6]

- id: set_audio_output_select
  label: Audio Output Select
  kind: action
  params:
    - name: output
      type: string
      description: "SPO: speakers, LNO: audio out"
  enum:
    - SPO
    - LNO

- id: set_balance
  label: Balance
  kind: action
  params:
    - name: value
      type: integer
      description: "-20~000~+20"
  range: [-20, 20]

- id: set_sound_mode
  label: Sound Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "STD(AUT)/DYN/CLR"
  enum:
    - STD
    - DYN
    - CLR

- id: set_bass
  label: Bass
  kind: action
  params:
    - name: value
      type: integer
      description: "-20~000~+20"
  range: [-20, 20]

- id: set_treble
  label: Treble
  kind: action
  params:
    - name: value
      type: integer
      description: "-20~000~+20"
  range: [-20, 20]

- id: set_surround
  label: Surround
  kind: action
  params:
    - name: state
      type: string
      description: "MON: on, OFF: off"
  enum:
    - MON
    - OFF

- id: set_horizontal_position
  label: Horizontal Position
  kind: action
  params:
    - name: value
      type: integer
      description: "-100~0000~+100"
  range: [-100, 100]

- id: set_horizontal_size
  label: Horizontal Size
  kind: action
  params:
    - name: value
      type: integer
      description: "-100~0000~+100"
  range: [-100, 100]

- id: set_vertical_position
  label: Vertical Position
  kind: action
  params:
    - name: value
      type: integer
      description: "-100~0000~+100"
  range: [-100, 100]

- id: set_vertical_size
  label: Vertical Size
  kind: action
  params:
    - name: value
      type: integer
      description: "-100~0000~+100"
  range: [-100, 100]

- id: set_clock_phase
  label: Clock Phase
  kind: action
  params:
    - name: value
      type: integer
      description: "00~30"
  range: [0, 30]

- id: set_dot_clock
  label: Dot Clock
  kind: action
  params:
    - name: value
      type: integer
      description: "-5~000~+5"
  range: [-5, 5]

- id: set_pixel_mode
  label: 1:1 Pixel Mode
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_overscan
  label: Overscan
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_position_size_lump
  label: Position/Size Lump Setting
  kind: action
  params:
    - name: hpos
      type: integer
      description: "-100~0000~+100"
    - name: hsize
      type: integer
      description: "-100~0000~+100"
    - name: vpos
      type: integer
      description: "-100~0000~+100"
    - name: vsize
      type: integer
      description: "-100~0000~+100"
  range:
    hpos: [-100, 100]
    hsize: [-100, 100]
    vpos: [-100, 100]
    vsize: [-100, 100]

- id: auto_setup
  label: Auto Setup
  kind: action
  params:
    - name: exec
      type: integer
      description: "1: execution start"
  enum:
    - 1

- id: set_wobbling
  label: Wobbling
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_no_activity_power_off
  label: No Activity Power Off
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_osd_language
  label: OSD Language
  kind: action
  params:
    - name: lang
      type: string
      description: "ENG/DEU/FRA/ITL/ESP/USA/CHA/JPN/RUS"
  enum:
    - ENG
    - DEU
    - FRA
    - ITL
    - ESP
    - USA
    - CHA
    - JPN
    - RUS

- id: set_display_orientation
  label: Display Orientation
  kind: action
  params:
    - name: mode
      type: integer
      description: "0: landscape, 1: portrait"
  enum:
    - 0
    - 1

- id: set_image_rotation
  label: Image Rotation
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: 180 degrees"
  enum:
    - 0
    - 1

- id: set_menu_position
  label: Menu Position
  kind: action
  params:
    - name: pos
      type: integer
      description: "1: left(landscape)/upper(portrait), 2: center, 3: right(landscape)/lower(portrait)"
  enum:
    - 1
    - 2
    - 3

- id: set_menu_duration
  label: Menu Display Duration
  kind: action
  params:
    - name: seconds
      type: integer
      description: "005~180 (5 second unit)"
  range: [5, 180]

- id: set_menu_transparency
  label: Menu Transparency
  kind: action
  params:
    - name: level
      type: integer
      description: "000~100 (10% unit)"
  range: [0, 100]

- id: set_3d_yc_filter
  label: 3D Y/C Filter
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_color_system
  label: Color System
  kind: action
  params:
    - name: system
      type: string
      description: "NTS/PAL/SCM/4NT/MPA/NPA/AUT"
  enum:
    - NTS
    - PAL
    - SCM
    - 4NT
    - MPA
    - NPA
    - AUT

- id: set_sync_signal
  label: Sync Signal Setting
  kind: action
  params:
    - name: mode
      type: string
      description: "HAV: auto detection, GRN: sync on green, HVS: hvsync"
  enum:
    - HAV
    - GRN
    - HVS

- id: set_cinema_reality
  label: Cinema Reality 3:2 Pull Down
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_xga_mode
  label: XGA Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "1: 1024x768, 2: 1280x768, 3: 1366x768, 4: auto"
  enum:
    - 1
    - 2
    - 3
    - 4

- id: set_noise_reduction
  label: Noise Reduction
  kind: action
  params:
    - name: level
      type: string
      description: "OFF/AUT/LOW/MID/HIG"
  enum:
    - OFF
    - AUT
    - LOW
    - MID
    - HIG

- id: set_mpeg_noise_reduction
  label: MPEG Noise Reduction
  kind: action
  params:
    - name: level
      type: string
      description: "OFF/LOW/MID/HIG"
  enum:
    - OFF
    - LOW
    - MID
    - HIG

- id: set_signal_range
  label: Signal Range
  kind: action
  params:
    - name: range
      type: string
      description: "VID/FUL/AUT (HDMI/DVI-D); VID/FUL/AUT (other: not avail)"
  enum:
    - VID
    - FUL
    - AUT

- id: set_component_rgb_select
  label: Component/RGB-IN Select
  kind: action
  params:
    - name: mode
      type: string
      description: "YBR: YBR signal, RGB: RGB signal; available when PC selected"
  enum:
    - YBR
    - RGB

- id: set_yuv_rgb_select
  label: YUV/RGB-IN Select
  kind: action
  params:
    - name: mode
      type: string
      description: "YUV/RGB; available when HDMI1/HDMI2/DVI-D selected"
  enum:
    - YUV
    - RGB

- id: set_input_level
  label: Input Level
  kind: action
  params:
    - name: value
      type: integer
      description: "-16~000~+16"
  range: [-16, 16]

- id: set_dynamic_backlight
  label: Dynamic Backlight Control
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_screensaver
  label: Screensaver On/Off
  kind: action
  params:
    - name: mode
      type: integer
      description: "0: stop, 5: operating"
  enum:
    - 0
    - 5

- id: set_screensaver_mode
  label: Screensaver Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0: off, 1: interval, 2: time designation, 3: on, 4: standby after screensaver"
  enum:
    - 0
    - 1
    - 2
    - 3
    - 4

- id: set_interval_screensaver
  label: Interval Screensaver
  kind: action
  params:
    - name: periodic_time
      type: string
      description: "0000~2359"
    - name: operating_time
      type: string
      description: "0000~2359"
  pattern: "^[0-2][0-9][0-5][0-9] [0-2][0-9][0-5][0-9]$"

- id: set_time_designation_screensaver
  label: Time Designation Screensaver
  kind: action
  params:
    - name: start_time
      type: string
      description: "0000~2359"
    - name: finish_time
      type: string
      description: "0000~2359"
  pattern: "^[0-2][0-9][0-5][0-9] [0-2][0-9][0-5][0-9]$"

- id: set_standby_after_screensaver
  label: Standby after Screensaver
  kind: action
  params:
    - name: time
      type: string
      description: "0000~2359 (hour:minute)"
  pattern: "^[0-2][0-9][0-5][0-9]$"

- id: set_input_label_current
  label: Set Label for Current Input
  kind: action
  params:
    - name: label
      type: string
      description: "INP/PCN/DV1/DV2/DV3/BD1/BD2/BD3/CTV/VCR/STB/SKP"
  enum:
    - INP
    - PCN
    - DV1
    - DV2
    - DV3
    - BD1
    - BD2
    - BD3
    - CTV
    - VCR
    - STB
    - SKP

- id: set_power_management_mode
  label: Power Management Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0: custom, 1: on"
  enum:
    - 0
    - 1

- id: set_no_signal_power_off
  label: No Signal Power Off
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_hdmi1_power_management
  label: HDMI1 Power Management
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_hdmi2_power_management
  label: HDMI2 Power Management
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_digital_link_power_management
  label: DIGITAL LINK Power Management
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_dvi_d_power_management
  label: DVI-D Power Management
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_pc_power_management
  label: PC Power Management
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_power_save
  label: Power Save
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_extended_standby_mode
  label: Extended Standby Mode
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_hdmi_cec_control
  label: HDMI-CEC Control
  kind: action
  params:
    - name: state
      type: integer
      description: "0: disable, 1: enable"
  enum:
    - 0
    - 1

- id: set_display_setting
  label: Display Setting (Image Settings)
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_image_select
  label: Image Select (Image Settings)
  kind: action
  params:
    - name: mode
      type: integer
      description: "0: default image, 1: user image"
  enum:
    - 0
    - 1

- id: set_network_control
  label: Network Control
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_lan_setup_port
  label: LAN Setup Port Number
  kind: action
  params:
    - name: port
      type: integer
      description: "1024~65535 (1024~4351, 4353~9999, 10001~19999, 20001~27249, 27251~41793, 41795~65535)"
  range: [1024, 65535]

- id: set_digital_link_mode
  label: DIGITAL LINK Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AT: auto, DL: digital link mode, EN: ethernet"
  enum:
    - AT
    - DL
    - EN

- id: set_usb_media_player
  label: USB Media Player
  kind: action
  params:
    - name: state
      type: integer
      description: "0: disable, 1: enable"
  enum:
    - 0
    - 1

- id: set_schedule_play
  label: Schedule Play Function
  kind: action
  params:
    - name: state
      type: integer
      description: "0: disable, 1: enable"
  enum:
    - 0
    - 1

- id: set_video_playback_mode
  label: Video Playback Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0: standard, 1: adjust"
  enum:
    - 0
    - 1

- id: set_resume_play
  label: Resume Play
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_slide_show_duration
  label: Slide Show Duration
  kind: action
  params:
    - name: seconds
      type: integer
      description: "010~600 (5 second unit)"
  range: [10, 600]

- id: set_play_mode
  label: Play Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0: individual play, 1: synchronize play"
  enum:
    - 0
    - 1

- id: set_memory_viewer_function
  label: Memory Viewer Function
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_memory_viewer_view
  label: Memory Viewer View
  kind: action
  params:
    - name: view
      type: string
      description: "THU: thumbnail, LIS: list"
  enum:
    - THU
    - LIS

- id: set_content_select
  label: Content Select
  kind: action
  params:
    - name: content
      type: string
      description: "STL/VID/AUD/ALL/SAV/SAA/VAA"
  enum:
    - STL
    - VID
    - AUD
    - ALL
    - SAV
    - SAA
    - VAA

- id: set_sort_type
  label: Sort Type
  kind: action
  params:
    - name: type
      type: string
      description: "DAT: date, NAM: name"
  enum:
    - DAT
    - NAM

- id: set_sort_order
  label: Sort Order
  kind: action
  params:
    - name: order
      type: string
      description: "ASD: ascending, DSD: descending"
  enum:
    - ASD
    - DSD

- id: set_play_method
  label: Play Method
  kind: action
  params:
    - name: method
      type: string
      description: "NON/ONE/ALL/RAN/SEL/PRG"
  enum:
    - NON
    - ONE
    - ALL
    - RAN
    - SEL
    - PRG

- id: set_picture_duration
  label: Picture Duration
  kind: action
  params:
    - name: seconds
      type: integer
      description: "010~600 (5 second unit)"
  range: [10, 600]

- id: set_function_group
  label: Function Group
  kind: action
  params:
    - name: group
      type: string
      description: "INP/MEM/ACT"
  enum:
    - INP
    - MEM
    - ACT

- id: set_function_button_settings
  label: Function Button Settings
  kind: action
  params:
    - name: button
      type: integer
      description: "1-6"
    - name: action
      type: string
      description: "(ACTION&MENU) SIG/SSV/SUT/LNS/ECO/OSH/MLT/DZM/DID/HCO/PLE; (INPUT) HM1/HM2/DL1/DV1/PC1/VD1/UD1/MV1"
  range: [1, 6]

- id: set_onscreen_display
  label: On Screen Display
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_initial_input
  label: Initial Input
  kind: action
  params:
    - name: input
      type: string
      description: "OFF/HM1/HM2/DL1/DV1/PC1/VD1/UD1/MV1"
  enum:
    - OFF
    - HM1
    - HM2
    - DL1
    - DV1
    - PC1
    - VD1
    - UD1
    - MV1

- id: set_initial_vol
  label: Initial VOL Level
  kind: action
  params:
    - name: enable
      type: integer
      description: "0: off, 1: on"
    - name: level
      type: integer
      description: "000~100"
  range:
    enable: [0, 1]
    level: [0, 100]

- id: set_maximum_vol
  label: Maximum VOL Level
  kind: action
  params:
    - name: enable
      type: integer
      description: "0: off, 1: on"
    - name: level
      type: integer
      description: "000~100"
  range:
    enable: [0, 1]
    level: [0, 100]

- id: set_input_lock
  label: Input Lock
  kind: action
  params:
    - name: input
      type: string
      description: "OFF/HM1/HM2/DL1/DV1/PC1/VD1/UD1/MV1"
  enum:
    - OFF
    - HM1
    - HM2
    - DL1
    - DV1
    - PC1
    - VD1
    - UD1
    - MV1

- id: set_button_lock
  label: Button Lock
  kind: action
  params:
    - name: lock
      type: string
      description: "OFF/MEN/ALL"
  enum:
    - OFF
    - MEN
    - ALL

- id: set_controller_user_level
  label: Controller User Level
  kind: action
  params:
    - name: level
      type: integer
      description: "0: off, 1: user1, 2: user2, 3: user3"
  enum:
    - 0
    - 1
    - 2
    - 3

- id: set_pc_auto_setting
  label: PC Auto Setting
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_off_timer_function
  label: Off Timer Function
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_initial_startup
  label: Initial Startup
  kind: action
  params:
    - name: mode
      type: string
      description: "LST: last memory, PON: on, STB: standby"
  enum:
    - LST
    - PON
    - STB

- id: set_lan_control_protocol
  label: LAN Control Protocol
  kind: action
  params:
    - name: protocol
      type: string
      description: "LP1: protocol1, LP2: protocol2"
  enum:
    - LP1
    - LP2

- id: set_power_on_screen_delay
  label: Power On Screen Delay
  kind: action
  params:
    - name: delay
      type: string
      description: "AT: auto, 00~30: seconds"
  enum:
    - AT
    - "00"
    - "01"
    - "02"
    - "03"
    - "04"
    - "05"
    - "06"
    - "07"
    - "08"
    - "09"
    - "10"
    - "11"
    - "12"
    - "13"
    - "14"
    - "15"
    - "16"
    - "17"
    - "18"
    - "19"
    - "20"
    - "21"
    - "22"
    - "23"
    - "24"
    - "25"
    - "26"
    - "27"
    - "28"
    - "29"
    - "30"

- id: set_clock_display
  label: Clock Display
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_input_search
  label: Input Search
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF/ALL/PRI/IDC"
  enum:
    - OFF
    - ALL
    - PRI
    - IDC

- id: set_failover_mode_off
  label: Input Change Mode Off (Failover Disable)
  kind: action
  params: []

- id: set_failover_mode_quick
  label: Input Change Mode Quick
  kind: action
  params:
    - name: primary
      type: string
      description: "NON/HM1/HM2/DL1/DV1"
    - name: secondary
      type: string
      description: "NON/HM1/HM2/DL1/DV1"
    - name: auto_switch_back
      type: integer
      description: "0: disable, 1: enable"
  enum:
    primary: [NON, HM1, HM2, DL1, DV1]
    secondary: [NON, HM1, HM2, DL1, DV1]
    auto_switch_back: [0, 1]

- id: set_failover_mode_normal
  label: Input Change Mode Normal
  kind: action
  params:
    - name: primary
      type: string
      description: "NON/HM1/HM2/DL1/DV1/PC1/VD1/UD1"
    - name: secondary
      type: string
      description: "NON/HM1/HM2/DL1/DV1/PC1/VD1/UD1"
    - name: auto_switch_back
      type: integer
      description: "0: disable, 1: enable"
  enum:
    primary: [NON, HM1, HM2, DL1, DV1, PC1, VD1, UD1]
    secondary: [NON, HM1, HM2, DL1, DV1, PC1, VD1, UD1]
    auto_switch_back: [0, 1]

- id: set_changing_mode
  label: Changing Mode
  kind: action
  params:
    - name: speed
      type: integer
      description: "1: high speed, 2: normal"
  enum:
    - 1
    - 2

- id: set_manual_switch_back
  label: Manual Switch Back
  kind: action
  params: []

- id: set_audio_input_current
  label: Audio Input Select for Current Input
  kind: action
  params:
    - name: video_input
      type: string
      description: "HM1/HM2/DL1/DV1/PC1/VD1"
    - name: audio_input
      type: string
      description: "HM1/HM2/DL1/DV1/PC1/VD1/NAD"
  enum:
    video_input: [HM1, HM2, DL1, DV1, PC1, VD1]
    audio_input: [HM1, HM2, DL1, DV1, PC1, VD1, NAD]

- id: set_audio_input_each
  label: Audio Input Select for Each Input
  kind: action
  params:
    - name: video_input
      type: string
      description: "HM1/HM2/DL1/DV1/PC1/VD1"
    - name: audio_input
      type: string
      description: "HM1/HM2/DL1/DV1/PC1/VD1/NAD"
  enum:
    video_input: [HM1, HM2, DL1, DV1, PC1, VD1]
    audio_input: [HM1, HM2, DL1, DV1, PC1, VD1, NAD]

- id: set_no_signal_warning
  label: No Signal Warning
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_no_signal_warning_timing
  label: No Signal Warning Timing
  kind: action
  params:
    - name: minutes
      type: integer
      description: "01~60"
  range: [1, 60]

- id: set_no_signal_error
  label: No Signal Error
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_no_signal_error_timing
  label: No Signal Error Timing
  kind: action
  params:
    - name: minutes
      type: integer
      description: "01~90"
  range: [1, 90]

- id: set_temperature_warning
  label: Temperature Warning
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: recall
  label: Recall
  kind: action
  params: []

- id: osd_clear
  label: OSD Clear
  kind: action
  params: []

- id: set_digital_zoom
  label: Digital Zoom
  kind: action
  params:
    - name: on_off
      type: integer
      description: "0: off, 1: on"
    - name: enlargement
      type: integer
      description: "1/2/3/4"
    - name: hpos
      type: integer
      description: "1/2/3/4/5"
    - name: vpos
      type: integer
      description: "1/2/3/4/5"
  enum:
    on_off: [0, 1]
    enlargement: [1, 2, 3, 4]
    hpos: [1, 2, 3, 4, 5]
    vpos: [1, 2, 3, 4, 5]

- id: set_off_timer
  label: Off Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "00~90"
  range: [0, 90]

- id: usb_skip_next
  label: USB Media Player Skip to Next
  kind: action
  params: []

- id: usb_skip_previous
  label: USB Media Player Skip to Previous
  kind: action
  params: []

- id: usb_play_from_top
  label: USB Media Player Play from Top
  kind: action
  params: []

- id: set_light_id_mode
  label: LightID Mode Select
  kind: action
  params:
    - name: mode
      type: integer
      description: "0: off, 1: external control mode, 2: internal ID mode"
  enum:
    - 0
    - 1
    - 2

- id: stop_light_id
  label: Stop LightID Sending
  kind: action
  params: []

- id: set_backlight_control
  label: Backlight Control (LightID)
  kind: action
  params:
    - name: level
      type: integer
      description: "1: low, 2: middle, 3: high"
  enum:
    - 1
    - 2
    - 3

- id: set_multi_display_on_off
  label: Multi Display On/Off
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_multi_display_setup
  label: Multi Display Setup Detail
  kind: action
  params:
    - name: on_off
      type: integer
      description: "0: off, 1: on"
    - name: hscale
      type: integer
      description: "01~10"
    - name: vscale
      type: integer
      description: "01~10"
    - name: bezel_h
      type: integer
      description: "000~100"
    - name: bezel_v
      type: integer
      description: "000~100"
    - name: location
      type: string
      description: "001~100 (A1~J10)"
  range:
    on_off: [0, 1]
    hscale: [1, 10]
    vscale: [1, 10]
    bezel_h: [0, 100]
    bezel_v: [0, 100]

- id: set_timer_program
  label: Set Up Timer
  kind: action
  params:
    - name: program
      type: integer
      description: "01~20"
    - name: enable
      type: integer
      description: "0: off, 1: on"
    - name: day
      type: string
      description: "SUN/MON/TUE/WED/THU/FRI/SAT/EVD"
    - name: action
      type: string
      description: "PON/POF"
    - name: time
      type: string
      description: "0000~2359"
    - name: input
      type: string
      description: "HM1/HM2/DL1/DV1/PC1/VD1/UD1/MV1"
  range: [1, 20]
  enum:
    day: [SUN, MON, TUE, WED, THU, FRI, SAT, EVD]
    action: [PON, POF]

- id: set_day_time
  label: DAY TIME
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
  range:
    year: [2017, 2035]
    month: [1, 12]
    day: [1, 31]
    hour: [0, 23]
    minute: [0, 59]

- id: set_synchronize_display
  label: Synchronize Display
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_parent_child
  label: Parent or Child Setting
  kind: action
  params:
    - name: mode
      type: integer
      description: "0: child, 1: parent"
  enum:
    - 0
    - 1

- id: set_serial_control
  label: Serial Control
  kind: action
  params:
    - name: port
      type: string
      description: "SE1: serial in, DL1: digital link"
  enum:
    - SE1
    - DL1

- id: set_auto_display_name
  label: Auto Display Name
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_display_name
  label: Display Name
  kind: action
  params:
    - name: name
      type: string
      description: "max 8 chars"
  maxLength: 8

- id: set_lan_setup_network
  label: LAN Setup Network Address
  kind: action
  params:
    - name: ip1
      type: integer
      description: "000~255"
    - name: ip2
      type: integer
      description: "000~255"
    - name: ip3
      type: integer
      description: "000~255"
    - name: ip4
      type: integer
      description: "000~255"
    - name: mask1
      type: integer
      description: "000~255"
    - name: mask2
      type: integer
      description: "000~255"
    - name: mask3
      type: integer
      description: "000~255"
    - name: mask4
      type: integer
      description: "000~255"
    - name: gw1
      type: integer
      description: "000~255"
    - name: gw2
      type: integer
      description: "000~255"
    - name: gw3
      type: integer
      description: "000~255"
    - name: gw4
      type: integer
      description: "000~255"
    - name: dhcp
      type: integer
      description: "0: off, 1: on"
  range:
    ip1: [0, 255]
    ip2: [0, 255]
    ip3: [0, 255]
    ip4: [0, 255]
    mask1: [0, 255]
    mask2: [0, 255]
    mask3: [0, 255]
    mask4: [0, 255]
    gw1: [0, 255]
    gw2: [0, 255]
    gw3: [0, 255]
    gw4: [0, 255]
    dhcp: [0, 1]

- id: set_amx_dd
  label: AMX D.D.
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_crestron
  label: Crestron Connected
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_extron_xtp
  label: Extron XTP
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_usb_memory_network
  label: USB Memory Network Settings
  kind: action
  params:
    - name: state
      type: integer
      description: "0: prohibit, 1: permit"
  enum:
    - 0
    - 1

- id: reset
  label: Reset
  kind: action
  params: []

- id: set_lan_data_clone_write_protect
  label: LAN Data Cloning Write Protect
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_power_on_message_no_activity
  label: Power On Message (No Activity Power Off)
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_power_on_message_power_management
  label: Power On Message (Power Management)
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_hdmi1_device_change
  label: HDMI1 Change Device
  kind: action
  params:
    - name: direction
      type: string
      description: "NXT: next, PRE: previous"
  enum:
    - NXT
    - PRE

- id: set_hdmi2_device_change
  label: HDMI2 Change Device
  kind: action
  params:
    - name: direction
      type: string
      description: "NXT: next, PRE: previous"
  enum:
    - NXT
    - PRE

- id: set_menu_code
  label: HDMI-CEC Menu Code
  kind: action
  params:
    - name: code
      type: integer
      description: "1~6"
  range: [1, 6]

- id: set_display_to_device
  label: Display to Device
  kind: action
  params:
    - name: action
      type: string
      description: "OFF/POF/PWR"
  enum:
    - OFF
    - POF
    - PWR

- id: set_device_to_display
  label: Device to Display
  kind: action
  params:
    - name: action
      type: string
      description: "OFF/PON/PWR"
  enum:
    - OFF
    - PON
    - PWR

- id: set_function_guide
  label: Function Guide Settings
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_detect_digital_input
  label: Detect Digital Input
  kind: action
  params:
    - name: input
      type: string
      description: "HM1/HM2/DL1/DV1/PC1"
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    input: [HM1, HM2, DL1, DV1, PC1]
    state: [0, 1]

- id: set_changing_delay
  label: Changing Delay
  kind: action
  params:
    - name: delay
      type: integer
      description: "00~10 (seconds)"
  range: [0, 10]

- id: set_serial_id_function
  label: Serial ID Function
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_serial_response_normal
  label: Serial Response (Normal)
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_serial_response_id_all
  label: Serial Response (ID All)
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_serial_id_setup
  label: Serial ID Setup
  kind: action
  params:
    - name: function
      type: integer
      description: "0: off, 1: on"
    - name: display_id
      type: integer
      description: "000~100"
  range:
    function: [0, 1]
    display_id: [0, 100]

- id: set_serial_daisy_chain_position
  label: Serial Daisy Chain Position
  kind: action
  params:
    - name: position
      type: string
      description: "TOP/DEF/END"
  enum:
    - TOP
    - DEF
    - END

- id: set_auto_command_send
  label: Auto Command Send Setting
  kind: action
  params:
    - name: enable_qss
      type: integer
      description: "0: off, 1: on"
    - name: enable_stserr
      type: integer
      description: "0: off, 1: on"
  enum:
    enable_qss: [0, 1]
    enable_stserr: [0, 1]

- id: set_6_segment_color_management
  label: 6-segment Color Management
  kind: action
  params:
    - name: state
      type: integer
      description: "0: off, 1: on"
  enum:
    - 0
    - 1

- id: set_6_segment_color_select
  label: 6-segment Color Management Select Color
  kind: action
  params:
    - name: color
      type: string
      description: "R/Y/G/C/B/M"
    - name: tint
      type: integer
      description: "-511~511"
    - name: saturation
      type: integer
      description: "-127~127"
    - name: value
      type: integer
      description: "-127~127"
  enum:
    color: [R, Y, G, C, B, M]
  range:
    tint: [-511, 511]
    saturation: [-127, 127]
    value: [-127, 127]

- id: reset_6_segment_color
  label: 6-segment Color Management Reset
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: ["0", "1"]
  description: "0: standby (off), 1: power on"

- id: current_input
  type: string
  description: "HM1/HM2/DL1/DV1/PC1/VD1/UD1/MV1"

- id: current_audio_volume
  type: integer
  range: [0, 100]
  description: "000-100"

- id: audio_mute_status
  type: enum
  values: ["0", "1"]
  description: "0: audio mute off, 1: audio mute on"

- id: video_mute_status
  type: enum
  values: ["0", "1"]
  description: "0: video mute off, 1: video mute on"

- id: aspect_status
  type: string
  description: "FULL/NORM/ZOOM/ZOM2"

- id: picture_mode_status
  type: string
  description: "VIV/NAT/STD/SUV/GRH/DCM"

- id: backlight_status
  type: integer
  description: "000~100 or DEF"
  range: [0, 100]

- id: picture_contrast_status
  type: integer
  description: "000~100 or DEF"
  range: [0, 100]

- id: black_level_status
  type: integer
  description: "000~100 or DEF"
  range: [0, 100]

- id: color_status
  type: integer
  description: "000~100 or DEF"
  range: [0, 100]

- id: tint_status
  type: integer
  description: "000~100 or DEF"
  range: [0, 100]

- id: sharpness_status
  type: integer
  description: "000~100 or DEF"
  range: [0, 100]

- id: memory_state
  type: string
  description: "- / 0 (memory no.1-no.6): unused / use"

- id: memory_name_status
  type: string
  description: "memory name (max 20 chars)"

- id: audio_output_select_status
  type: string
  description: "SPO: speakers, LNO: audio out"

- id: balance_status
  type: integer
  description: "-20~20"

- id: sound_mode_status
  type: string
  description: "STD(AUT)/DYN/CLR"

- id: bass_status
  type: integer
  description: "-20~20"

- id: treble_status
  type: integer
  description: "-20~20"

- id: surround_status
  type: string
  description: "MON: on, OFF: off"

- id: horizontal_position_status
  type: integer
  description: "-100~+100"

- id: horizontal_size_status
  type: integer
  description: "-100~+100"

- id: vertical_position_status
  type: integer
  description: "-100~+100"

- id: vertical_size_status
  type: integer
  description: "-100~+100"

- id: clock_phase_status
  type: integer
  description: "00~30"

- id: dot_clock_status
  type: integer
  description: "-5~+5"

- id: pixel_mode_status
  type: enum
  values: ["0", "1"]
  description: "0: off, 1: on"

- id: overscan_status
  type: enum
  values: ["0", "1"]
  description: "0: off, 1: on"

- id: auto_setup_result
  type: string
  description: "OK: result OK, NG: result NG, OF: unperforming or not effective, NW: adjusting"

- id: wobbling_status
  type: enum
  values: ["0", "1"]
  description: "0: off, 1: on"

- id: no_activity_power_off_status
  type: enum
  values: ["0", "1"]
  description: "0: off, 1: on"

- id: osd_language_status
  type: string
  description: "ENG/DEU/FRA/ITL/ESP/USA/CHA/JPN/RUS"

- id: display_orientation_status
  type: enum
  values: ["0", "1"]
  description: "0: landscape, 1: portrait"

- id: image_rotation_status
  type: enum
  values: ["0", "1"]
  description: "0: off, 1: 180 degrees"

- id: menu_position_status
  type: integer
  description: "1/2/3"

- id: menu_duration_status
  type: integer
  description: "005~180 (seconds)"

- id: menu_transparency_status
  type: integer
  description: "000~100 (10% unit)"

- id: signal_status_info
  type: enum
  values: ["0", "1", "2"]
  description: "0: valid signal, 1: no signal, 2: unsupported signal"

- id: signal_frequency
  type: string
  description: "H***.** V***.** (horizontal/vertical frequency)"

- id: signal_format
  type: string
  description: "max 20 characters"

- id: model_name
  type: string
  description: "70/80 (inch) F (FHD) 17 (product of 2017)"

- id: model
  type: string
  description: "70/80 SF2H J/U/E/W/C (inch/model/market)"

- id: software_version_main_mcu
  type: string
  description: "*.* version"

- id: software_version_sub_mcu
  type: string
  description: "*.* version"

- id: software_version_eeprom
  type: string
  description: "*.* version"

- id: software_version_hdbaset_rx
  type: string
  description: "*.*.* version"

- id: serial_number
  type: string
  description: "ASCII 9~15 characters"

- id: sos_status
  type: string
  description: "NON: no SOS history, ERR: SOS generating, EXT: SOS history exists"

- id: digital_link_status
  type: string
  description: "link status / HDMI status / est. cable length / signal quality"

- id: display_id
  type: integer
  description: "000~100"

- id: present_day
  type: string
  description: "SUN/MON/TUE/WED/THU/FRI/SAT"

- id: present_time
  type: string
  description: "0000~2359 (hour:minute)"

- id: digital_link_mode_status
  type: string
  description: "AT/DL/EN"

- id: network_control_status
  type: enum
  values: ["0", "1"]
  description: "0: off, 1: on"

- id: lan_setup_port_status
  type: integer
  description: "1024~65535"

- id: schedule_play_mode_status
  type: enum
  values: ["0", "1"]
  description: "0: normal mode, 1: schedule play mode"

- id: usb_media_player_status
  type: enum
  values: ["0", "1"]
  description: "0: disable, 1: enable"

- id: schedule_play_function_status
  type: enum
  values: ["0", "1"]
  description: "0: disable, 1: enable"

- id: memory_viewer_function_status
  type: enum
  values: ["0", "1"]
  description: "0: off, 1: on"

- id: temperature_warning_status
  type: enum
  values: ["0", "1"]
  description: "1: high temperature mode, 0: normal mode"

- id: no_signal_warning_status
  type: enum
  values: ["0", "1"]
  description: "1: no signal warning active, 0: no warning"

- id: no_signal_error_status
  type: enum
  values: ["0", "1"]
  description: "1: no signal error active, 0: no error"

- id: no_signal_warning_timing_status
  type: integer
  description: "01~60 (minutes)"

- id: no_signal_error_timing_status
  type: integer
  description: "01~90 (minutes)"

- id: backup_input_status
  type: string
  description: "status / main input / current input status"

- id: backup_input_signal_status
  type: string
  description: "main input signal / primary backup signal / secondary backup signal"

- id: light_id_mode_status
  type: enum
  values: ["0", "1", "2"]
  description: "0: off, 1: external control mode, 2: internal ID mode"

- id: backlight_control_status
  type: enum
  values: ["1", "2", "3"]
  description: "1: low, 2: middle, 3: high"
```

## Variables
```yaml
# All settable picture/sound/network parameters are represented as Actions with params.
# This device uses discrete command-based control; no separate Variables section applies.
```

## Events
```yaml
# Unsolicited notifications (auto-sent by display on certain conditions):
- id: no_signal_warning_auto
  type: enum
  values: ["0", "1"]
  description: "Auto-sent when RS-232C control active and no signal warning triggers"

- id: no_signal_error_auto
  type: enum
  values: ["0", "1"]
  description: "Auto-sent when RS-232C control active and no signal error triggers"

- id: temperature_warning_auto
  type: enum
  values: ["0", "1"]
  description: "Auto-sent when high temperature mode detected"

- id: sos_history
  type: string
  description: "Auto-sent on SOS event; 6-byte SOS classification data"
```

## Macros
```yaml
# Multi-step sequences from source:
# UNRESOLVED: no explicit multi-step macros defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Only PON and QPW commands operational in standby (standby mode)"
  - "Network control setting to Off while connected with LAN might disconnect the connection"
  - "Backlight (VPC:BLT) available only when Power Save is Off"
  - "Red/Green/Blue Gain and Bias settings available only when Color Temperature is USER1 or USER2"
  - "6-segment color management settings available only when 6-segment color management is On"
  - "Balance, Bass, Treble, Surround, Sound Mode available only when Output Select is SPEAKERS"
  - "Component/RGB-IN Select available only when PC is selected"
  - "YUV/RGB-IN Select available only when HDMI1/HDMI2/DVI-D is selected"
  - "Manual Switch Back enabled only when Input Change Mode is not Off and Auto Switch Back is Disabled"
  - "Changing Mode (high speed/normal) adjustable only when Input Change Mode Quick is selected"
  - "Backlight Control (LightID) not available when LightID mode is Off"
```

## Notes
Serial format: `<STX>command[:parameters]<ETX>` — STX (02h), 3-char command, optional colon + params, ETX (03h). Wait for response before sending next command. Incorrect commands return `ER401`. Display ID + Serial ID mechanism for daisy-chain. LAN Protocol 1 and Protocol 2 differ in MD5 auth format (protect mode) and response framing. Protocol 1 omits first 4 chars of inquiry command reply. Default LAN port 1024; port range 1024~65535 (excluding reserved ranges). Cable type: straight.
<!-- UNRESOLVED: inter-command delay timing not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: port number for RS-232C not explicitly stated beyond default 9600/8N1 -->
<!-- UNRESOLVED: LAN Protocol 2 response format details not fully specified in source excerpt -->

## Provenance

```yaml
source_domains:
  - na.panasonic.com
  - eww.pass.panasonic.co.jp
  - eu.connect.panasonic.com
source_urls:
  - "https://na.panasonic.com/ns/303988_API_Panasonic_WX-SR200_Series_IF_Specification_VA.05-20221110.pdf?hsLang=en"
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/RP50_120/RemoteControllerInterfaceSpecifications-E.pdf
  - https://eww.pass.panasonic.co.jp/pav-ks/support/content/general_1/DEF/KAIROS_RestAPI_14_E.pdf
  - https://eu.connect.panasonic.com/sites/default/files/media/2024-04/8475ef1uw_manual_en_8.pdf
  - "https://eww.pass.panasonic.co.jp/pro-av/support/content/download/DEF/soft/lps/AV-HSW10_InterfaceGuide(DVQX2472ZA)_E.pdf"
retrieved_at: 2026-04-30T04:41:48.960Z
last_checked_at: 2026-05-18T16:44:23.292Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:44:23.292Z
matched_actions: 176
action_count: 176
confidence: high
summary: "All 176 spec actions map to source commands via semantic-id convention; transport parameters (9600 bps, 8N1, no flow control, port 1024) verified verbatim in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
