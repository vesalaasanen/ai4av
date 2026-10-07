---
spec_id: admin/panasonic-th-xxlf50j-xxlf50u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic TH-70/80LF50J (TH-70/80LF50) Control Spec"
manufacturer: Panasonic
model_family: TH-70LF50J
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - TH-70LF50J
    - TH-80LF50J
    - TH-70LF50
    - TH-80LF50
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.connect.panasonic.com
  - ptzprotocols.com
  - mediarealm.com.au
  - github.com
  - help.na.panasonic.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LF50_SerialCommandList.pdf
  - "https://ptzprotocols.com/1%20TXB%20Protocols/TXB-Panasonic/Panasonic%20Camera%20Protocol_4.0.pdf"
  - https://www.mediarealm.com.au/articles/panasonic-projector-commands/
  - https://github.com/ssjoholm/panasonic-cn-cnt/blob/main/Panasonic-CN-CNT-Protocol-v1.md
  - https://help.na.panasonic.com/manuals/
retrieved_at: 2026-05-19T04:38:31.405Z
last_checked_at: 2026-10-07T15:43:28.941Z
generated_at: 2026-10-07T15:43:28.941Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LAN framing details and default port are not stated in source."
  - "firmware version compatibility not stated in source"
  - "default LAN port not stated in source; SSU:LCP sets the port number (1024-65535 excluding 4352 and 10000)"
  - "wire separators between the four fields.\""
  - "whether STD(AUT) denotes alternative response tokens.\""
  - "wire separators.\""
  - "inquiry wildcard semantics.\""
  - "wire separator.\""
  - "source does not describe unsolicited notifications or event push model"
  - "source does not describe multi-step macro sequences"
  - "no additional safety warnings, interlock procedures, or power-on sequencing found in source"
  - "LAN framing is not specified in the source."
  - "default LAN port not stated"
  - "maximum command queue depth or timing constraints beyond \"wait for response\""
  - "firmware version compatibility range"
verification:
  verdict: verified
  checked_at: 2026-10-07T15:43:28.941Z
  matched_actions: 206
  action_count: 206
  confidence: medium
  summary: "All 206 action units match source literals with correct shapes; serial transport values are confirmed and the spec covers essentially the full command table. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Panasonic TH-70/80LF50J (TH-70/80LF50) Control Spec

## Summary
Panasonic LED LCD professional displays (TH-70LF50J, TH-80LF50J series) controlled via RS-232C serial and LAN. The command set covers power, input selection, audio, picture adjustment, geometry, timers, multi-display tiling, screensaver, and diagnostics. The source documents STX/ETX framing for serial commands; LAN framing is unresolved.

<!-- UNRESOLVED: LAN framing details and default port are not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - lan
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  cable_type: straight
addressing:
  port: null  # UNRESOLVED: default LAN port not stated in source; SSU:LCP sets the port number (1024-65535 excluding 4352 and 10000)
auth:
  type: UNRESOLVED
```

## Traits
```yaml
traits:
  - powerable     # PON/POF commands
  - routable      # IMS input switching
  - queryable     # Q-prefixed inquiry commands
  - levelable     # AVL volume, VPC backlight/picture/brightness, DGE position/size
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: PON
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: POF
    params: []

  - id: input_select
    label: Input Select
    kind: action
    command: "IMS:***(***)"
    params:
      - name: input
        type: enum
        values:
          - AV1
          - AV2
          - PC1
          - DV1
          - HM1
          - SL1
          - S1A
          - S1B
          - AV2YBR
          - AV2RGB
          - DV1YUV
          - DVIRGB
          - SL1YUV
          - SL1RGB
          - S1AYUV
          - S1ARGB
          - S1BYUV
          - S1BRGB
        description: "Input source. S1A/S1B only with dual input terminal board."

  - id: volume_set
    label: Set Volume
    kind: action
    command: "AVL:***"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: "Volume level 000-100"

  - id: volume_up
    label: Volume Up
    kind: action
    command: AUU
    params: []

  - id: volume_down
    label: Volume Down
    kind: action
    command: AUD
    params: []

  - id: audio_mute
    label: Audio Mute
    kind: action
    command: "AMT:*"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "0=off, 1=on"

  - id: video_mute
    label: Video Mute
    kind: action
    command: "VMT:*"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "0=off, 1=on"

  - id: aspect_set
    label: Set Aspect Ratio
    kind: action
    command: "DAM:****"
    params:
      - name: mode
        type: enum
        values:
          - FULL
          - NORM
          - ZOOM
          - ZOM2
        description: "full / normal / zoom1 / zoom2"

  - id: picture_mode_set
    label: Set Picture Mode
    kind: action
    command: "VPC:MEN***"
    params:
      - name: mode
        type: enum
        values:
          - STD
          - DYN
          - CNM
        description: "standard / dynamic / cinema"

  - id: backlight_set
    label: Set Backlight
    kind: action
    command: "VPC:BLT***"
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: contrast_set
    label: Set Contrast (Picture)
    kind: action
    command: "VPC:PIC***"
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: brightness_set
    label: Set Black Level (Brightness)
    kind: action
    command: "VPC:BLK***"
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: color_set
    label: Set Color
    kind: action
    command: "VPC:COL***"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: "AV1 only"

  - id: tint_set
    label: Set Tint
    kind: action
    command: "VPC:TIN***"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: "AV1 only"

  - id: sharpness_set
    label: Set Sharpness
    kind: action
    command: "VPC:SHP***"
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: color_temperature_set
    label: Set Color Temperature
    kind: action
    command: "VPC:TMP***"
    params:
      - name: mode
        type: enum
        values:
          - WRM
          - MID
          - COL
        description: "Low / Mid / High"

  - id: input_level_set
    label: Set Input Level
    kind: action
    command: "VWB:ILV***"
    params:
      - name: level
        type: integer
        min: -16
        max: 16

  - id: gamma_set
    label: Set Gamma
    kind: action
    command: "VWB:GMM**"
    params:
      - name: mode
        type: enum
        values:
          - "20"
          - "22"
          - "26"
          - SC
        description: "2.0 / 2.2 / 2.6 / S Curve"

  - id: agc_set
    label: Set Auto Gain Control
    kind: action
    command: "VWB:AGC*"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "OFF / ON"

  - id: red_drive_set
    label: Set Red Drive
    kind: action
    command: "VWB:RDR***"
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: green_drive_set
    label: Set Green Drive
    kind: action
    command: "VWB:GDR***"
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: blue_drive_set
    label: Set Blue Drive
    kind: action
    command: "VWB:BDR***"
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: red_cutoff_set
    label: Set Red Cutoff
    kind: action
    command: "VWB:RCT***"
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: green_cutoff_set
    label: Set Green Cutoff
    kind: action
    command: "VWB:GCT***"
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: blue_cutoff_set
    label: Set Blue Cutoff
    kind: action
    command: "VWB:BCT***"
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: sound_mode_set
    label: Set Sound Mode
    kind: action
    command: "AAC:MEN***"
    params:
      - name: mode
        type: enum
        values:
          - STD
          - DYN
          - CLR
        description: "Standard / Dynamic / Clear"

  - id: bass_set
    label: Set Bass
    kind: action
    command: "AAC:BAS***"
    params:
      - name: level
        type: integer
        min: -15
        max: 15

  - id: treble_set
    label: Set Treble
    kind: action
    command: "AAC:TRE***"
    params:
      - name: level
        type: integer
        min: -15
        max: 15

  - id: balance_set
    label: Set Balance
    kind: action
    command: "AAC:BAL***"
    params:
      - name: level
        type: integer
        min: -15
        max: 15

  - id: surround_set
    label: Set Surround
    kind: action
    command: "AAC:SUR***"
    params:
      - name: state
        type: enum
        values:
          - MON
          - "OFF"
        description: "ON / OFF"

  - id: horizontal_position_set
    label: Set Horizontal Position
    kind: action
    command: "DGE:HPO****"
    params:
      - name: position
        type: integer
        min: -124
        max: 124

  - id: horizontal_size_set
    label: Set Horizontal Size
    kind: action
    command: "DGE:HSZ****"
    params:
      - name: size
        type: integer
        min: -124
        max: 124

  - id: vertical_position_set
    label: Set Vertical Position
    kind: action
    command: "DGE:VPO****"
    params:
      - name: position
        type: integer
        min: -124
        max: 124

  - id: vertical_size_set
    label: Set Vertical Size
    kind: action
    command: "DGE:VSZ****"
    params:
      - name: size
        type: integer
        min: -124
        max: 124

  - id: clock_phase_set
    label: Set Clock Phase
    kind: action
    command: "DGE:CLK***"
    params:
      - name: phase
        type: integer
        min: 0
        max: 63

  - id: dot_clock_set
    label: Set Dot Clock
    kind: action
    command: "DGE:DCL***"
    params:
      - name: clock
        type: integer
        min: 0
        max: 63

  - id: pixel_1to1_set
    label: Set 1:1 Pixel Mode
    kind: action
    command: "DGE:DBD*"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "OFF / ON"

  - id: overscan_set
    label: Set Overscan
    kind: action
    command: "DGE:OVS*"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "OFF / ON"

  - id: auto_setup
    label: Auto Setup (Position)
    kind: action
    command: "DGE:ASU*"
    params:
      - name: execute
        type: enum
        values:
          - "1"
        description: "Execute auto setup"

  - id: wobbling_set
    label: Set Wobbling
    kind: action
    command: "OSP:WOB*"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "OFF / ON"

  - id: component_rgb_select
    label: Component/RGB-IN Select
    kind: action
    command: "SSU:CMP***"
    params:
      - name: mode
        type: enum
        values:
          - YBR
          - RGB
        description: "for AV2"

  - id: dvi_yuv_rgb_select
    label: DVI YUV/RGB-IN Select
    kind: action
    command: "SSU:DYR***"
    params:
      - name: mode
        type: enum
        values:
          - YUV
          - RGB

  - id: no_activity_power_off_set
    label: Set No Activity Power Off
    kind: action
    command: "SSU:NAO*"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "OFF / ON"

  - id: osd_language_set
    label: Set OSD Language
    kind: action
    command: "SSU:LNG***"
    params:
      - name: language
        type: enum
        values:
          - ENG
          - DEU
          - FRA
          - ITA
          - ESP
          - USA
          - CHA
          - JPN
          - RUS

  - id: eco_mode_set
    label: Set ECO Mode
    kind: action
    command: "SSU:ECS*"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "Custom / ON"

  - id: no_signal_power_off_set
    label: Set No Signal Power Off
    kind: action
    command: "SSU:AOF*"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "OFF / ON"

  - id: pc_power_management_set
    label: Set PC Power Management
    kind: action
    command: "SSU:DPM*"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "OFF / ON"

  - id: dvi_power_management_set
    label: Set DVI-D Power Management
    kind: action
    command: "SSU:DPD*"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "OFF / ON"

  - id: power_save_set
    label: Set Power Save
    kind: action
    command: "SSU:ECO*"
    params:
      - name: mode
        type: enum
        values:
          - "0"
          - "1"
          - "2"
        description: "OFF / ON / Sensor"

  - id: menu_duration_set
    label: Set Menu Display Duration
    kind: action
    command: "SSU:MDT***"
    params:
      - name: seconds
        type: integer
        min: 5
        max: 120
        description: "5 to 120 seconds, step 5"

  - id: menu_transparency_set
    label: Set Menu Transparency
    kind: action
    command: "SSU:MTL***"
    params:
      - name: percent
        type: integer
        min: 0
        max: 100
        description: "0-100%, step 10"

  - id: network_setup
    label: Set Network Configuration
    kind: action
    command: "SSU:NET***"
    params:
      - name: ip_octet_1
        type: integer
        min: 0
        max: 255
        description: "IP address first byte"
      - name: ip_octet_2
        type: integer
        min: 0
        max: 255
        description: "IP address second byte"
      - name: ip_octet_3
        type: integer
        min: 0
        max: 255
        description: "IP address third byte"
      - name: ip_octet_4
        type: integer
        min: 0
        max: 255
        description: "IP address fourth byte"
      - name: subnet_octet_1
        type: integer
        min: 0
        max: 255
        description: "Subnet mask first byte"
      - name: subnet_octet_2
        type: integer
        min: 0
        max: 255
        description: "Subnet mask second byte"
      - name: subnet_octet_3
        type: integer
        min: 0
        max: 255
        description: "Subnet mask third byte"
      - name: subnet_octet_4
        type: integer
        min: 0
        max: 255
        description: "Subnet mask fourth byte"
      - name: gateway_octet_1
        type: integer
        min: 0
        max: 255
        description: "Gateway address first byte"
      - name: gateway_octet_2
        type: integer
        min: 0
        max: 255
        description: "Gateway address second byte"
      - name: gateway_octet_3
        type: integer
        min: 0
        max: 255
        description: "Gateway address third byte"
      - name: gateway_octet_4
        type: integer
        min: 0
        max: 255
        description: "Gateway address fourth byte"
      - name: dhcp
        type: enum
        values:
          - "0"
          - "1"
        description: "DHCP OFF / ON"

  - id: lan_port_set
    label: Set LAN Port Number
    kind: action
    command: "SSU:LCP*****"
    params:
      - name: port
        type: integer
        min: 1024
        max: 65535
        description: "Excludes 4352 and 10000"

  - id: lan_speed_set
    label: Set LAN Speed
    kind: action
    command: "SSU:LSP****"
    params:
      - name: speed
        type: enum
        values:
          - AUTO
          - 010H
          - 010F
          - 100H
          - 100F
        description: "Auto / 10Base Half / 10Base Full / 100Base Half / 100Base Full"

  - id: network_id_set
    label: Set Network ID
    kind: action
    command: "SSU:LID**"
    params:
      - name: id
        type: integer
        min: 0
        max: 99

  - id: sync_signal_set
    label: Set Sync Signal
    kind: action
    command: "SSG:SNC***"
    params:
      - name: mode
        type: enum
        values:
          - HAV
          - GRN
        description: "Auto / Sync On Green (PC input)"

  - id: color_system_set
    label: Set Color System
    kind: action
    command: "SSG:COS***"
    params:
      - name: system
        type: enum
        values:
          - NTS
          - PAL
          - SCM
          - 4NT
          - MPA
          - NPA
          - AUT
        description: "NTSC / PAL / SECAM / NTSC4.43 / PAL-M / PAL-N / Auto (AV1)"

  - id: cinema_reality_set
    label: Set Cinema Reality
    kind: action
    command: "SSG:DCR*"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "OFF / ON"

  - id: xga_mode_set
    label: Set XGA Mode
    kind: action
    command: "SSG:XGA*"
    params:
      - name: mode
        type: enum
        values:
          - "1"
          - "3"
        description: "1024x768 / 1366x768"

  - id: noise_reduction_set
    label: Set Noise Reduction
    kind: action
    command: "SSG:NRS***"
    params:
      - name: level
        type: enum
        values:
          - "OFF"
          - AUT
          - LOW
          - MID
          - HIG

  - id: hdmi_range_set
    label: Set HDMI Range
    kind: action
    command: "SSG:HRC***"
    params:
      - name: range
        type: enum
        values:
          - VID
          - FUL
          - AUT
        description: "Video / Full / Auto"

  - id: screensaver_on_off
    label: Screensaver ON/OFF
    kind: action
    command: "OSP:SCR*"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "5"
        description: "ON / OFF"

  - id: screensaver_mode_set
    label: Set Screensaver Mode
    kind: action
    command: "SSC:MOD*"
    params:
      - name: mode
        type: enum
        values:
          - "0"
          - "1"
          - "2"
          - "3"
          - "4"
        description: "OFF / Interval / Time Designation / ON / Auto power off"

  - id: screensaver_interval_set
    label: Set Screensaver Interval
    kind: action
    command: "SSC:INT**** ****"
    params:
      - name: interval
        type: string
        description: "HH:MM (0000-2359)"
      - name: duration
        type: string
        description: "HH:MM (0000-2359)"

  - id: screensaver_time_set
    label: Set Screensaver Time Designation
    kind: action
    command: "SSC:TIM**** ****"
    params:
      - name: start
        type: string
        description: "HH:MM (0000-2359)"
      - name: end
        type: string
        description: "HH:MM (0000-2359)"

  - id: screensaver_standby_set
    label: Set Standby After Screensaver
    kind: action
    command: "SSC:AOF****"
    params:
      - name: duration
        type: string
        description: "HH:MM (0000-2359)"

  - id: input_label_set
    label: Set Input Label
    kind: action
    command: "SSU:ILA***"
    params:
      - name: label
        type: enum
        values:
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
        description: "reset/PC/DVD/Blu-ray/CATV/VCR/STB/skip"

  - id: multi_display_on_off
    label: Multi Display ON/OFF
    kind: action
    command: "MDC:*"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "OFF / ON"

  - id: multi_display_setup
    label: Multi Display Setup
    kind: action
    command: "MDC:* * **"
    params:
      - name: picture
        type: enum
        values:
          - "0"
          - "1"
        description: "Multi Picture OFF / ON"
      - name: enlarge
        type: integer
        min: 0
        max: 5
        description: "0=2x2, 1=3x3, 2=4x4, 3=2x2 frameless, 4=3x3 frameless, 5=4x4 frameless"
      - name: location
        type: integer
        min: 1
        max: 16
        description: "Location A1-D4"

  - id: multi_display_setup_ext
    label: Multi Display Setup (Extended)
    kind: action
    command: "MDC:EXT* * * * **"
    params:
      - name: picture
        type: enum
        values:
          - "0"
          - "1"
      - name: horizontal
        type: integer
        min: 1
        max: 5
      - name: vertical
        type: integer
        min: 1
        max: 5
      - name: frame
        type: enum
        values:
          - "0"
          - "1"
      - name: location
        type: integer
        min: 1
        max: 25
        description: "A1-E5"

  - id: timer_program_set
    label: Set Timer Program
    kind: action
    command: "TIM:PRG** * *** *** **** ***"
    params:
      - name: program_number
        type: integer
        min: 1
        max: 20
      - name: enabled
        type: enum
        values:
          - "0"
          - "1"
        description: "OFF / ON"
      - name: weekday
        type: enum
        values:
          - MON
          - TUE
          - WED
          - THU
          - FRI
          - SAT
          - SUN
          - EVD
        description: "Day or Every Day"
      - name: action
        type: enum
        values:
          - PON
          - POF
      - name: time
        type: string
        description: "HH:MM (0000-2359)"
      - name: input
        type: enum
        values:
          - AV1
          - AV2
          - PC1
          - DV1
          - HM1
          - SL1
          - S1A
          - S1B

  - id: present_day_set
    label: Set Present Day
    kind: action
    command: "TIM:DAY***"
    params:
      - name: day
        type: enum
        values:
          - MON
          - TUE
          - WED
          - THU
          - FRI
          - SAT
          - SUN

  - id: present_time_set
    label: Set Present Time
    kind: action
    command: "TIM:NOW0****"
    params:
      - name: time
        type: string
        description: "HH:MM (0000-2359)"

  - id: input_search_set
    label: Set Input Search
    kind: action
    command: "ISH:FNC***"
    params:
      - name: mode
        type: enum
        values:
          - "OFF"
          - ALL
          - PRI
        description: "OFF / All input / Priority search"

  - id: primary_input_set
    label: Set Primary Input
    kind: action
    command: "ISH:PRI***"
    params:
      - name: input
        type: enum
        values:
          - NON
          - AV1
          - AV2
          - PC1
          - DV1
          - HM1
          - SL1
          - S1A
          - S1B

  - id: secondary_input_set
    label: Set Secondary Input
    kind: action
    command: "ISH:SCI***"
    params:
      - name: input
        type: enum
        values:
          - NON
          - AV1
          - AV2
          - PC1
          - DV1
          - HM1
          - SL1
          - S1A
          - S1B

  - id: osd_on_off
    label: OSD ON/OFF
    kind: action
    command: "OSP:OSD*"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"

  - id: initial_input_set
    label: Set Initial Input
    kind: action
    command: "OSP:IIN***"
    params:
      - name: input
        type: enum
        values:
          - "OFF"
          - AV1
          - AV2
          - PC1
          - DV1
          - HM1
          - SL1
          - S1A
          - S1B

  - id: initial_vol_level_set
    label: Set Initial Volume Level
    kind: action
    command: "ISH:FNC****"
    params:
      - name: enabled
        type: enum
        values:
          - "0"
          - "1"
      - name: level
        type: integer
        min: 0
        max: 100

  - id: max_vol_level_set
    label: Set Maximum Volume Level
    kind: action
    command: "OSP:MVL****"
    params:
      - name: enabled
        type: enum
        values:
          - "0"
          - "1"
      - name: level
        type: integer
        min: 0
        max: 100

  - id: input_lock_set
    label: Set Input Lock
    kind: action
    command: "OSP:INL***"
    params:
      - name: input
        type: enum
        values:
          - "OFF"
          - AV1
          - AV2
          - PC1
          - DV1
          - HM1
          - SL1
          - S1A
          - S1B

  - id: button_lock_set
    label: Set Button Lock
    kind: action
    command: "OSP:BTL***"
    params:
      - name: mode
        type: enum
        values:
          - "OFF"
          - MEN
          - ALL
        description: "OFF / MENU&ENTER / ON"

  - id: remocon_user_level_set
    label: Set Remote User Level
    kind: action
    command: "OSP:RCM*"
    params:
      - name: level
        type: enum
        values:
          - "0"
          - "1"
          - "2"
          - "3"
        description: "OFF / User1 / User2 / User3"

  - id: off_timer_set
    label: Set Off Timer
    kind: action
    command: "OSP:OFT*"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "OFF / ON"

  - id: function_key_set
    label: Set Function Key
    kind: action
    command: "OSP:KFN* ***"
    params:
      - name: key_number
        type: enum
        values:
          - "1"
          - "2"
      - name: function
        type: enum
        values:
          - SIG
          - SSV
          - ECO
          - SUT
        description: "Signal / Screensaver / ECO / Timer"

  - id: initial_power_mode_set
    label: Set Initial Power Mode
    kind: action
    command: "OSP:IPM***"
    params:
      - name: mode
        type: enum
        values:
          - NOR
          - PON
          - STB
        description: "Normal / Power on / Standby"

  - id: power_on_screen_delay_set
    label: Set Power ON Screen Delay
    kind: action
    command: "OSP:POD**"
    params:
      - name: seconds
        type: integer
        min: 0
        max: 30

  - id: clock_display_set
    label: Set Clock Display
    kind: action
    command: "OSP:CLK"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"

  - id: power_on_message_set
    label: Set Power On Message (No Activity)
    kind: action
    command: "OSP:NAP"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"

  - id: studio_white_balance_set
    label: Set Studio White Balance
    kind: action
    command: "OSP:SWB*"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"

  - id: slot_power_set
    label: Set Slot Power
    kind: action
    command: "OSP:SLP*"
    params:
      - name: mode
        type: enum
        values:
          - OF
          - AT
          - "ON"
        description: "OFF / AUTO / ON"

  - id: sdi_audio_output_set
    label: Set SDI Audio Output
    kind: action
    command: "ASD:OUT*"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"

  - id: sdi_left_channel_set
    label: Set SDI Left Channel
    kind: action
    command: "ASD:LCH**"
    params:
      - name: channel
        type: integer
        min: 1
        max: 16

  - id: sdi_right_channel_set
    label: Set SDI Right Channel
    kind: action
    command: "ASD:RCH**"
    params:
      - name: channel
        type: integer
        min: 1
        max: 16

  - id: sdi_level_meter_set
    label: Set SDI Level Meter Display
    kind: action
    command: "ASD:LMT*"
    params:
      - name: mode
        type: enum
        values:
          - "0"
          - "1"
          - "2"
        description: "Off / 1-8CH / 9-16CH"

  - id: recall_display
    label: Recall Display
    kind: action
    command: DDS
    params: []

  - id: audio_mute_recall
    label: Audio Mute (Recall)
    kind: action
    command: AOC
    params: []

  - id: osd_clear
    label: OSD Clear
    kind: action
    command: VDO
    params: []

  - id: digital_zoom_set
    label: Set Digital Zoom
    kind: action
    command: "DZM:* * * *"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "OFF / ON"
      - name: enlarge
        type: integer
        min: 1
        max: 4
      - name: horizontal_pos
        type: integer
        min: 1
        max: 5
      - name: vertical_pos
        type: integer
        min: 1
        max: 5

  - id: off_timer_minutes_set
    label: Set Off Timer (Minutes)
    kind: action
    command: "ZOT:**"
    params:
      - name: minutes
        type: integer
        min: 0
        max: 90
        description: "0 to 90 minutes"

  - id: 3d_yc_filter_set
    label: Set 3D Y/C Filter
    kind: action
    command: "SSG:YCS*"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "OFF / ON (AV1 only)"

  - id: position_size_lump_set
    label: Set Position And Size
    kind: action
    command: "DGE:PSZ****<br>****<br>****<br>****"
    params:
      - name: horizontal_position
        type: integer
        min: -124
        max: 124
        description: "-124  to  0000  to  +124(0124)"
      - name: horizontal_size
        type: integer
        min: -124
        max: 124
        description: "-124  to  0000  to  +124(0124)"
      - name: vertical_position
        type: integer
        min: -124
        max: 124
        description: "-124  to  0000  to  +124(0124)"
      - name: vertical_size
        type: integer
        min: -124
        max: 124
        description: "-124  to  0000  to  +124(0124)"
    description: "Source template retained verbatim; <br> is source table markup. UNRESOLVED: wire separators between the four fields."

  - id: input_label_by_input_set
    label: Set Label For Specified Input
    kind: action
    command: "SSU:ILAAV1***"
    params:
      - name: input
        type: enum
        values:
          - AV1
          - AV2
          - PC1
          - DV1
          - HM1
          - HM2
          - SL1
          - S1A
          - S1B
        description: "Select the literal command template: AV1=SSU:ILAAV1***; AV2=SSU:ILAAV2***; PC1=SSU:ILAPC1***; DV1=SSU:ILADV1***; HM1=SSU:ILAHM1***; HM2=SSU:ILAHM2***; SL1=SSU:ILASL1***; S1A=SSU:ILAS1A***; S1B=SSU:ILAS1B***. The command field shows the AV1 variant."
      - name: label
        type: enum
        values:
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
        description: "PC1: PCN / DV1 / DV2 / DV3 / BD1 / BD2 / BD3 / CTV / VCR / STB / SKP. Other listed inputs: INP / DV1 / DV2 / DV3 / BD1 / BD2 / BD3 / CTV / VCR / STB / SKP."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_status
    label: Power Status
    command: QPW
    query_command: QPW
    response: "QPW:*"
    type: enum
    values:
      - "0"
      - "1"
    description: "0=Standby, 1=Power on"

  - id: input_query
    label: Current Input
    command: QMI
    query_command: QMI
    response: "QMI:***"
    type: enum
    values:
      - AV1
      - AV2YBR
      - AV2RGB
      - PC1
      - DV1YUV
      - DV1RGB
      - HM1
      - SL1
      - SL1YUV
      - SL1RGB
      - S1A
      - S1B
      - S1AYUV
      - S1ARGB
      - S1BYUV
      - S1BRGB

  - id: volume_query
    label: Current Volume
    command: QAV
    query_command: QAV
    response: "QAV:***"
    type: integer
    min: 0
    max: 100

  - id: audio_mute_query
    label: Audio Mute State
    command: QAM
    query_command: QAM
    response: "QAM:*"
    type: enum
    values:
      - "0"
      - "1"

  - id: video_mute_query
    label: Video Mute State
    command: QVM
    query_command: QVM
    response: "QVM:*"
    type: enum
    values:
      - "0"
      - "1"

  - id: aspect_query
    label: Current Aspect Ratio
    command: QAS
    query_command: QAS
    response: "QAS:****"
    type: enum
    values:
      - FULL
      - NORM
      - ZOOM
      - ZOM2

  - id: picture_mode_query
    label: Picture Mode
    command: "QPC:MEN"
    query_command: "QPC:MEN"
    response: "QPC:MEN***"
    type: enum
    values:
      - STD
      - DYN
      - CNM

  - id: backlight_query
    label: Backlight Level
    command: "QPC:BLT"
    query_command: "QPC:BLT"
    response: "QPC:BLT***"
    type: integer
    min: 0
    max: 100

  - id: contrast_query
    label: Contrast Level
    command: "QPC:PIC"
    query_command: "QPC:PIC"
    response: "QPC:PIC***"
    type: integer
    min: 0
    max: 100

  - id: brightness_query
    label: Black Level (Brightness)
    command: "QPC:BLK"
    query_command: "QPC:BLK"
    response: "QPC:BLK***"
    type: integer
    min: 0
    max: 100

  - id: color_query
    label: Color Level
    command: "QPC:COL"
    query_command: "QPC:COL"
    response: "QPC:COL***"
    type: integer
    min: 0
    max: 100

  - id: tint_query
    label: Tint Level
    command: "QPC:TIN"
    query_command: "QPC:TIN"
    response: "QPC:TIN***"
    type: integer
    min: 0
    max: 100

  - id: sharpness_query
    label: Sharpness Level
    command: "QPC:SHP"
    query_command: "QPC:SHP"
    response: "QPC:SHP***"
    type: integer
    min: 0
    max: 100

  - id: color_temperature_query
    label: Color Temperature
    command: "QPC:TMP"
    query_command: "QPC:TMP"
    response: "QPC:TMP***"
    type: enum
    values:
      - WRM
      - MID
      - COL

  - id: signal_frequency_query
    label: Signal Frequency
    command: QFR
    query_command: QFR
    response: "QFR:***.* ***.*"
    type: string
    description: "Horizontal freq, Vertical freq (kHz/Hz)"

  - id: signal_format_query
    label: Signal Format
    command: QSF
    query_command: QSF
    response: "QSF:***************** ***"
    type: string
    description: "Current video format info (max 20 chars)"

  - id: model_name_query
    label: Model Name
    command: QMN
    query_command: QMN
    response: "QMN:*****"
    type: string
    values:
      - 80F10
      - 47F10
    description: "Returns LF50 or LFP35"

  - id: serial_number_query
    label: Serial Number
    command: QSN
    query_command: QSN
    response: "QSN:*****"
    type: string
    description: "ASCII 9-15 characters, alphanumeric, space, dash"

  - id: sos_history_query
    label: SOS History
    command: QSS
    query_command: QSS
    response: "QSS:**.**.**.**.**.**"
    type: string
    description: "Error history: count + last 5 SOS codes (00-FF each)"

  - id: sos_status_query
    label: SOS Status
    command: "QSS:STS"
    query_command: "QSS:STS"
    response: "QSS:STS***"
    type: enum
    values:
      - NON
      - ERR
      - EXT
    description: "No SOS / Current SOS / SOS history exists"

  - id: auto_setup_query
    label: Auto Setup Status
    command: "QGE:ASU"
    query_command: "QGE:ASU"
    response: "QGE:ASU**"
    type: enum
    values:
      - OK
      - NG
      - OF
      - NW
    description: "Normal End / Abnormal End / Invalid or unfinished / Running"

  - id: digital_zoom_query
    label: Digital Zoom Status
    command: QDZ
    query_command: QDZ
    response: "QDZ:* * * *"
    type: string
    description: "OFF/ON, enlarge 1-4, H-pos 1-5, V-pos 1-5"

  - id: input_level_query
    label: Input Level
    command: "QWB:ILV"
    query_command: "QWB:ILV"
    response: "QWB:ILV***"
    type: integer
    min: -16
    max: 16
    description: "-16  to  000  to  +16(016)"

  - id: gamma_query
    label: Gamma
    command: "QWB:GMM"
    query_command: "QWB:GMM"
    response: "QWB:GMM**"
    type: enum
    values:
      - "20"
      - "22"
      - "26"
      - SC
    description: "20 / 22/ 26 / SC; 2.0 / 2.2 / 2.6 / S Curve"

  - id: agc_query
    label: Auto Gain Control
    command: "QWB:AGC"
    query_command: "QWB:AGC"
    response: "QWB:AGC*"
    type: enum
    values:
      - "0"
      - "1"
    description: "0 / 1; OFF / ON"

  - id: red_drive_query
    label: Red Drive
    command: "QWB:RDR"
    query_command: "QWB:RDR"
    response: "QWB:RDR***"
    type: integer
    min: 0
    max: 100
    description: "000  to  100"

  - id: green_drive_query
    label: Green Drive
    command: "QWB:GDR"
    query_command: "QWB:GDR"
    response: "QWB:GDR***"
    type: integer
    min: 0
    max: 100
    description: "000  to  100"

  - id: blue_drive_query
    label: Blue Drive
    command: "QWB:BDR"
    query_command: "QWB:BDR"
    response: "QWB:BDR***"
    type: integer
    min: 0
    max: 100
    description: "000  to  100"

  - id: red_cutoff_query
    label: Red Cutoff
    command: "QWB:RCT"
    query_command: "QWB:RCT"
    response: "QWB:RCT***"
    type: integer
    min: 0
    max: 100
    description: "000  to  100"

  - id: green_cutoff_query
    label: Green Cutoff
    command: "QWB:GCT"
    query_command: "QWB:GCT"
    response: "QWB:GCT***"
    type: integer
    min: 0
    max: 100
    description: "000  to  100"

  - id: blue_cutoff_query
    label: Blue Cutoff
    command: "QWB:BCT"
    query_command: "QWB:BCT"
    response: "QWB:BCT***"
    type: integer
    min: 0
    max: 100
    description: "000  to  100"

  - id: sound_mode_query
    label: Sound Mode
    command: "QAC:MEN"
    query_command: "QAC:MEN"
    response: "QAC:MEN:***"
    type: enum
    values:
      - "STD(AUT)"
      - DYN
      - CLR
    description: "STD(AUT) / DYN / CLR. UNRESOLVED: whether STD(AUT) denotes alternative response tokens."

  - id: bass_query
    label: Bass
    command: "QAC:BAS"
    query_command: "QAC:BAS"
    response: "QAC:BAS:***"
    type: integer
    min: -15
    max: 15
    description: "-15  to  000  to  +15(015)"

  - id: treble_query
    label: Treble
    command: "QAC:TRE"
    query_command: "QAC:TRE"
    response: "QAC:TRE:***"
    type: integer
    min: -15
    max: 15
    description: "-15  to  000  to  +15(015)"

  - id: balance_query
    label: Balance
    command: "QAC:BAL"
    query_command: "QAC:BAL"
    response: "QAC:BAL:***"
    type: integer
    min: -15
    max: 15
    description: "-15  to  000  to  +15(015)"

  - id: surround_query
    label: Surround
    command: "QAC:SUR"
    query_command: "QAC:SUR"
    response: "QAC:SUR:***"
    type: enum
    values:
      - MON
      - "OFF"
    description: "MON / OFF; ON / OFF"

  - id: horizontal_position_query
    label: Horizontal Position
    command: "QGE:HPO"
    query_command: "QGE:HPO"
    response: "QGE:HPO****"
    type: integer
    min: -124
    max: 124
    description: "-124  to  0000  to  +124(0124)"

  - id: horizontal_size_query
    label: Horizontal Size
    command: "QGE:HSZ"
    query_command: "QGE:HSZ"
    response: "QGE:HSZ****"
    type: integer
    min: -124
    max: 124
    description: "-124  to  0000  to  +124(0124)"

  - id: vertical_position_query
    label: Vertical Position
    command: "QGE:VPO"
    query_command: "QGE:VPO"
    response: "QGE:VPO****"
    type: integer
    min: -124
    max: 124
    description: "-124  to  0000  to  +124(0124)"

  - id: vertical_size_query
    label: Vertical Size
    command: "QGE:VSZ"
    query_command: "QGE:VSZ"
    response: "QGE:VSZ****"
    type: integer
    min: -124
    max: 124
    description: "-124  to  0000  to  +124(0124)"

  - id: clock_phase_query
    label: Clock Phase
    command: "QGE:CLK"
    query_command: "QGE:CLK"
    response: "QGE:CLK***"
    type: integer
    min: 0
    max: 63
    description: "00  to  63"

  - id: dot_clock_query
    label: Dot Clock
    command: "QGE:DCL"
    query_command: "QGE:DCL"
    response: "QGE:DCL***"
    type: integer
    min: 0
    max: 63
    description: "00  to  63"

  - id: pixel_1to1_query
    label: 1:1 Pixel Mode
    command: "QGE:DBD"
    query_command: "QGE:DBD"
    response: "QGE:DBD*"
    type: enum
    values:
      - "0"
      - "1"
    description: "0 / 1; OFF / ON"

  - id: overscan_query
    label: Overscan
    command: "QGE:OVS"
    query_command: "QGE:OVS"
    response: "QGE:OVS*"
    type: enum
    values:
      - "0"
      - "1"
    description: "0 / 1; OFF / ON"

  - id: position_size_lump_query
    label: Position And Size
    command: "QGE:PSZ"
    query_command: "QGE:PSZ"
    response: "QGE:PSZ****<br>****<br>****<br>****"
    type: string
    description: "Four fields, each -124  to  0000  to  +124(0124). Source response template retained verbatim; <br> is source table markup. UNRESOLVED: wire separators."

  - id: wobbling_query
    label: Wobbling
    command: "QSP:WOB"
    query_command: "QSP:WOB"
    response: "QSP:WOB*"
    type: enum
    values:
      - "0"
      - "1"
    description: "0 / 1; OFF / ON"

  - id: component_rgb_query
    label: Component/RGB-IN Selection
    command: "QSU:CMP"
    query_command: "QSU:CMP"
    response: "QSU:CMP***"
    type: enum
    values:
      - YBR
      - RGB
    description: "YBR/RGB; for AV2"

  - id: dvi_yuv_rgb_query
    label: DVI YUV/RGB-IN Selection
    command: "QSU:DYR"
    query_command: "QSU:DYR"
    response: "QSU:DYR***"
    type: enum
    values:
      - YUV
      - RGB
    description: "YUV/RGB; YUV signal/RGB signal"

  - id: no_activity_power_off_query
    label: No Activity Power Off
    command: "QSU:NAO"
    query_command: "QSU:NAO"
    response: "QSU:NAO*"
    type: enum
    values:
      - "0"
      - "1"
    description: "0 / 1; OFF / ON"

  - id: osd_language_query
    label: OSD Language
    command: "QSU:LNG"
    query_command: "QSU:LNG"
    response: "QSU:LNG***"
    type: enum
    values:
      - ENG
      - DEU
      - FRA
      - ITA
      - ESP
      - USA
      - CHA
      - JPN
      - RUS
    description: "ENG / DEU / FRA / ITA / ESP / USA / CHA / JPN / RUS"

  - id: eco_mode_query
    label: ECO Mode
    command: "QSU:ECS"
    query_command: "QSU:ECS"
    response: "QSU:ECS*"
    type: enum
    values:
      - "0"
      - "1"
    description: "0 / 1; Custom / ON"

  - id: no_signal_power_off_query
    label: No Signal Power Off
    command: "QSU:AOF"
    query_command: "QSU:AOF"
    response: "QSU:AOF*"
    type: enum
    values:
      - "0"
      - "1"
    description: "0 / 1; OFF / ON"

  - id: pc_power_management_query
    label: PC Power Management
    command: "QSU:DPM"
    query_command: "QSU:DPM"
    response: "QSU:DPM*"
    type: enum
    values:
      - "0"
      - "1"
    description: "0 / 1; OFF / ON"

  - id: dvi_power_management_query
    label: DVI-D Power Management
    command: "QSU:DPD"
    query_command: "QSU:DPD"
    response: "QSU:DPD*"
    type: enum
    values:
      - "0"
      - "1"
    description: "0 / 1; OFF / ON"

  - id: power_save_query
    label: Power Save
    command: "QSU:ECO"
    query_command: "QSU:ECO"
    response: "QSU:ECO*"
    type: enum
    values:
      - "0"
      - "1"
      - "2"
    description: "0 / 1 / 2; OFF / ON / Sensor"

  - id: menu_duration_query
    label: Menu Display Duration
    command: "QSU:MDT"
    query_command: "QSU:MDT"
    response: "QSU:MDT***"
    type: integer
    min: 5
    max: 120
    description: "005  to  120; 5 to 120 sec (step every 5sec)"

  - id: menu_transparency_query
    label: Menu Transparency
    command: "QSU:MTL"
    query_command: "QSU:MTL"
    response: "QSU:MTL***"
    type: integer
    min: 0
    max: 100
    description: "000  to  100; 0 to 100% (Step every 10%)"

  - id: network_setup_query
    label: Network Configuration
    command: "QSU:NET"
    query_command: "QSU:NET"
    response: "QSU:NET***<br>***<br>***<br>***<br>***<br>***<br>***<br>***<br>***<br>***<br>***<br>***<br>*"
    type: string
    description: "Twelve fields, each 000 to 255: four IP address bytes, four SUB NET MASK bytes, four Gateway address bytes; final field 0/1, DHCP OFF/DHCP ON. Source response template retained verbatim; <br> is source table markup. UNRESOLVED: wire separators."

  - id: lan_port_query
    label: LAN Port Number
    command: "QSU:LC"
    query_command: "QSU:LC"
    response: "QSU:LCP*****"
    type: integer
    min: 1024
    max: 65535
    description: "01024 to 65535(04352，10000を除く); Port No(1024 to 4351，4353 to 9999，10001 to 65535). Inquiry token QSU:LC retained exactly as documented."

  - id: lan_speed_query
    label: LAN Speed
    command: "QSU:LSP"
    query_command: "QSU:LSP"
    response: "QSU:LSP****"
    type: enum
    values:
      - AUTO
      - 010H
      - 010F
      - 100H
      - 100F
    description: "AUTO/010H/010F/100H/100F"

  - id: network_id_query
    label: Network ID
    command: "QSU:LID"
    query_command: "QSU:LID"
    response: "QSU:LID**"
    type: integer
    min: 0
    max: 99
    description: "00 to 99"

  - id: 3d_yc_filter_query
    label: 3D Y/C Filter
    command: "QSG:YCS<br>*"
    query_command: "QSG:YCS<br>*"
    response: "QSG:YCS<br>*"
    type: enum
    values:
      - "0"
      - "1"
    description: "0 / 1; for AV1; OFF / ON. Inquiry template retained verbatim, including its documented wildcard; <br> is source table markup. UNRESOLVED: inquiry wildcard semantics."

  - id: sync_signal_query
    label: Sync Signal Setting
    command: "QSG:SNC"
    query_command: "QSG:SNC"
    response: "QSG:SNC<br>***"
    type: enum
    values:
      - HAV
      - GRN
    description: "HAV / GRN; for PC; Auto / Sync On Green. <br> is source table markup."

  - id: color_system_query
    label: Color System
    command: "QSG:COS"
    query_command: "QSG:COS"
    response: "QSG:COS***"
    type: enum
    values:
      - NTS
      - PAL
      - SCM
      - 4NT
      - MPA
      - NPA
      - AUT
    description: "NTS / PAL / SCM / 4NT / MPA / NPA / AUT; for AV1"

  - id: cinema_reality_query
    label: Cinema Reality
    command: "QSG:DCR"
    query_command: "QSG:DCR"
    response: "QSG:DCR*"
    type: enum
    values:
      - "0"
      - "1"
    description: "0 / 1; OFF / ON"

  - id: xga_mode_query
    label: XGA Mode
    command: "QSG:XGA"
    query_command: "QSG:XGA"
    response: "QSG:XGA*"
    type: enum
    values:
      - "1"
      - "3"
    description: "1 / 3; 1024x768 / 1366x768"

  - id: noise_reduction_query
    label: Noise Reduction
    command: "QSG:NRS"
    query_command: "QSG:NRS"
    response: "QSG:NRS***"
    type: enum
    values:
      - "OFF"
      - AUT
      - LOW
      - MID
      - HIG
    description: "OFF / AUT / LOW / MID / HIG"

  - id: hdmi_range_query
    label: HDMI Range
    command: "QSG:HRC"
    query_command: "QSG:HRC"
    response: "QSG:HRC***"
    type: enum
    values:
      - VID
      - FUL
      - AUT
    description: "VID / FUL / AUT; Video / FULL / auto"

  - id: screensaver_on_off_query
    label: Screensaver State
    command: "QSP:SCR"
    query_command: "QSP:SCR"
    response: "QSP:SCR*"
    type: enum
    values:
      - "0"
      - "5"
    description: "0 / 5; On / off"

  - id: screensaver_mode_query
    label: Screensaver Mode
    command: "QSC:MOD"
    query_command: "QSC:MOD"
    response: "QSC:MOD*"
    type: enum
    values:
      - "0"
      - "1"
      - "2"
      - "3"
      - "4"
    description: "0 / 1 / 2 / 3 / 4; OFF / Interval / Time Designation / ON / Autopower off"

  - id: screensaver_interval_query
    label: Screensaver Interval
    command: "QSC:INT"
    query_command: "QSC:INT"
    response: "QSC:INT****<br>****"
    type: string
    description: "0000  to  2359, 0000  to  2359; Interval(HH:MM), Duration(HH:MM). <br> is source table markup. UNRESOLVED: wire separator."

  - id: screensaver_time_query
    label: Screensaver Time Designation
    command: "QSC:TIM"
    query_command: "QSC:TIM"
    response: "QSC:TIM****<br>****"
    type: string
    description: "0000  to  2359, 0000  to  2359; Start(HH:MM), End(HH:MM). <br> is source table markup. UNRESOLVED: wire separator."

  - id: screensaver_standby_query
    label: Standby After Screensaver
    command: "QSC:AOF"
    query_command: "QSC:AOF"
    response: "QSC:AOF****"
    type: string
    description: "0000  to  2359; Duration(HH:MM)"

  - id: input_label_query
    label: Current Input Label
    command: "QSU:ILA"
    query_command: "QSU:ILA"
    response: "QSU:ILA***"
    type: enum
    values:
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
    description: "INP / PCN / DV1 / DV2 / DV3 / BD1 / BD2 / BD3 / CTV / VCR / STB / SKP"

  - id: input_label_by_input_query
    label: Label For Specified Input
    command: "QSU:ILAAV1"
    query_command: "QSU:ILAAV1"
    response: "QSU:ILAAV1***"
    type: enum
    values:
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
    params:
      - name: input
        type: enum
        values:
          - AV1
          - AV2
          - PC1
          - DV1
          - HM1
          - HM2
          - SL1
          - S1A
          - S1B
        description: "Select the documented inquiry token: AV1=QSU:ILAAV1; AV2=QSU:ILAAV2; PC1=QSU:ILAPC<br>1; DV1=QSU:ILADV<br>1; HM1=QSU:ILAHM<br>1; HM2=QSU:ILAHM<br>2; SL1=QSU:ILASL1; S1A=QSU:ILAS1A; S1B=QSU:ILAS1B. The command and query_command fields show the AV1 variant. <br> is source table markup."
    description: "Response templates: AV1=QSU:ILAAV1***; AV2=QSU:ILAAV2***; PC1=QSU:ILAPC1***; DV1=QSU:ILADV1***; HM1=QSU:ILAHM1***; HM2=QSU:ILAHM2***; SL1=QSU:ILASL1***; S1A=QSU:ILAS1A***; S1B=QSU:ILAS1B***. PC1: PCN / DV1 / DV2 / DV3 / BD1 / BD2 / BD3 / CTV / VCR / STB / SKP. Other listed inputs: INP / DV1 / DV2 / DV3 / BD1 / BD2 / BD3 / CTV / VCR / STB / SKP."

  - id: multi_display_setup_query
    label: Multi Display Setup
    command: QDC
    query_command: QDC
    response: "QDC:*<br>*<br>**"
    type: string
    description: "0 / 1, 0  to  5, 01  to  16; Multi Picture OFF / ON, Enlarge 2x2 / 3x3 / 4x4 / 2x2 frameless / 3x3 frameless / 4x4 frameless, Location A1 to D4. <br> is source table markup. UNRESOLVED: wire separators."

  - id: multi_display_setup_ext_query
    label: Multi Display Setup (Extended)
    command: "QDC:EXT"
    query_command: "QDC:EXT"
    response: "QDC:EXT*<br>*<br>*<br>*<br>**"
    type: string
    description: "0 / 1, 1  to  5, 1  to  5, 0 / 1, 01  to  25; Multi pucture OFF / ON, Horizontal 1 to 5, Vertical 1 to 5, Flame setting OFF / ON, Loation (A1 to E5). <br> is source table markup. UNRESOLVED: wire separators."

  - id: timer_program_query
    label: Timer Program
    command: "QIM:PRG**"
    query_command: "QIM:PRG**"
    response: "QIM:PRG**<br>*<br>***<br>***<br>****<br>***"
    type: string
    params:
      - name: program_number
        type: integer
        min: 1
        max: 20
        description: "01  to  20"
    description: "Program 01  to  20; setting 0 / 1; weekday MON / TUE / WED / THU / FRI / SAT / SUN / EVD; action PON / POF; time 0000  to  2359, Time(HH:MM); input AV1 / AV2 / PC1 / DV1 / HM1 / SL1 / (S1A / S1B). <br> is source table markup. UNRESOLVED: wire separators."

  - id: present_day_query
    label: Present Day
    command: "QIM:DAY"
    query_command: "QIM:DAY"
    response: "QIM:DAY***"
    type: enum
    values:
      - MON
      - TUE
      - WED
      - THU
      - FRI
      - SAT
      - SUN
    description: "MON / TUE / WED / THU / FRI / SAT / SUN"

  - id: present_time_query
    label: Present Time
    command: "QIM:NOW"
    query_command: "QIM:NOW"
    response: "QIM:NOW****"
    type: string
    description: "0000  to  2359; Current time(HH:MM)"

  - id: input_search_query
    label: Input Search
    command: "QSH:FNC"
    query_command: "QSH:FNC"
    response: "QSH:FNC***"
    type: enum
    values:
      - "OFF"
      - ALL
      - PRI
    description: "OFF / ALL / PRI; OFF / All input / priority search"

  - id: primary_input_query
    label: Primary Input
    command: "QSH:PRI"
    query_command: "QSH:PRI"
    response: "QSH:PRI***"
    type: enum
    values:
      - NON
      - AV1
      - AV2
      - PC1
      - DV1
      - HM1
      - SL1
      - S1A
      - S1B
    description: "NON / AV1 / AV2 / PC1 / DV1 / HM1 / SL1 (/ S1A / S1B)"

  - id: secondary_input_query
    label: Secondary Input
    command: "QSH:SCI"
    query_command: "QSH:SCI"
    response: "QSH:SCI***"
    type: enum
    values:
      - NON
      - AV1
      - AV2
      - PC1
      - DV1
      - HM1
      - SL1
      - S1A
      - S1B
    description: "NON / AV1 / AV2 / PC1 / DV1 / HM1 / SL1 (/ S1A / S1B)"

  - id: osd_query
    label: On Screen Display
    command: "QSP:OSD"
    query_command: "QSP:OSD"
    response: "QSP:OSD*"
    type: enum
    values:
      - "0"
      - "1"
    description: "0 / 1; OFF / ON"

  - id: initial_input_query
    label: Initial Input
    command: "QSP:IIN"
    query_command: "QSP:IIN"
    response: "QSP:IIN***"
    type: enum
    values:
      - "OFF"
      - AV1
      - AV2
      - PC1
      - DV1
      - HM1
      - SL1
      - S1A
      - S1B
    description: "OFF / AV1 / AV2 / PC1 / DV1 / HM1 / SL1 (/ S1A / S1B)"

  - id: initial_vol_level_query
    label: Initial Volume Level
    command: "QSP:IVL"
    query_command: "QSP:IVL"
    response: "QSP:IVL****"
    type: string
    description: "0 / 1, 000  to  100; OFF / ON, 0 to 100"

  - id: max_vol_level_query
    label: Maximum Volume Level
    command: "QSP:MVL"
    query_command: "QSP:MVL"
    response: "QSP:MVL****"
    type: string
    description: "0 / 1, 000  to  100; OFF / ON, 0 to 100"

  - id: input_lock_query
    label: Input Lock
    command: "QSP:INL"
    query_command: "QSP:INL"
    response: "QSP:INL***"
    type: enum
    values:
      - "OFF"
      - AV1
      - AV2
      - PC1
      - DV1
      - HM1
      - SL1
      - S1A
      - S1B
    description: "OFF / AV1 / AV2 / PC1 / DV1 / HM1 / SL1 (/ S1A / S1B)"

  - id: button_lock_query
    label: Button Lock
    command: "QSP:BTL"
    query_command: "QSP:BTL"
    response: "QSP:BTL***"
    type: enum
    values:
      - "OFF"
      - MEN
      - ALL
    description: "OFF / MEN / ALL; OFF / MENU&ENTER / ON"

  - id: remocon_user_level_query
    label: Remote User Level
    command: "QSP:RCM"
    query_command: "QSP:RCM"
    response: "QSP:RCM*"
    type: enum
    values:
      - "0"
      - "1"
      - "2"
      - "3"
    description: "0 / 1 / 2 / 3; OFF / User1 / User2 / User3"

  - id: off_timer_query
    label: Off Timer Function
    command: "QSP:OFT"
    query_command: "QSP:OFT"
    response: "QSP:OFT*"
    type: enum
    values:
      - "0"
      - "1"
    description: "0 / 1; OFF / ON"

  - id: function_key_query
    label: Function Key
    command: "QSP:KFN*"
    query_command: "QSP:KFN*"
    response: "QSP:KFN*<br>***"
    type: enum
    values:
      - SIG
      - SSV
      - ECO
      - SUT
    params:
      - name: key_number
        type: enum
        values:
          - "1"
          - "2"
        description: "1 / 2; for FUNCTION KEY 1 / for FUNCTION KEY 2"
    description: "SIG / SSV / ECO / SUT. Response includes the selected key number. <br> is source table markup. UNRESOLVED: wire separator."

  - id: initial_power_mode_query
    label: Initial Power Mode
    command: "QSP:IPM"
    query_command: "QSP:IPM"
    response: "QSP:IPM***"
    type: enum
    values:
      - NOR
      - PON
      - STB
    description: "NOR / PON / STB; Normal/ Power on /standby"

  - id: power_on_screen_delay_query
    label: Power On Screen Delay
    command: "QSP:POD"
    query_command: "QSP:POD"
    response: "QSP:POD**"
    type: integer
    min: 0
    max: 30
    description: "00  to  30; 0 to 30 sec"

  - id: clock_display_query
    label: Clock Display
    command: "QSP:CLK"
    query_command: "QSP:CLK"
    response: "QSP:CLK*"
    type: enum
    values:
      - "0"
      - "1"
    description: "0 / 1; OFF / ON"

  - id: power_on_message_query
    label: Power On Message (No Activity)
    command: "QSP:NAP"
    query_command: "QSP:NAP"
    response: "QSP:NAP*"
    type: enum
    values:
      - "0"
      - "1"
    description: "0 / 1; OFF / ON"

  - id: studio_white_balance_query
    label: Studio White Balance
    command: "QSP:SWB"
    query_command: "QSP:SWB"
    response: "QSP:SWB*"
    type: enum
    values:
      - "0"
      - "1"
    description: "0 / 1; OFF / ON"

  - id: slot_power_query
    label: Slot Power
    command: "QSP:SLP"
    query_command: "QSP:SLP"
    response: "QSP:SLP*"
    type: enum
    values:
      - OF
      - AT
      - "ON"
    description: "OF / AT / ON; SLOT POWER OFF / SLOT POWER AUTO ON / SLOT POWER ON. Response wildcard width retained as documented."

  - id: sdi_audio_output_query
    label: SDI Audio Output
    command: "QSD:OUT"
    query_command: "QSD:OUT"
    response: "QSD:OUT*"
    type: enum
    values:
      - "0"
      - "1"
    description: "0 / 1; off / on"

  - id: sdi_left_channel_query
    label: SDI Left Channel
    command: "QSD:LCH"
    query_command: "QSD:LCH"
    response: "QSD:LCH**"
    type: integer
    min: 1
    max: 16
    description: "01 – 16"

  - id: sdi_right_channel_query
    label: SDI Right Channel
    command: "QSD:RCH"
    query_command: "QSD:RCH"
    response: "QSD:RCH**"
    type: integer
    min: 1
    max: 16
    description: "01 – 16"

  - id: sdi_level_meter_query
    label: SDI Level Meter Display
    command: "QSD:LMT"
    query_command: "QSD:LMT"
    response: "QSD:LMT*"
    type: enum
    values:
      - "0"
      - "1"
      - "2"
    description: "0 / 1 / 2; Off / display 1-8CH / display 9-16CH"
```

## Variables
```yaml
# All settable parameters are covered by Actions entries above.
# No additional Variables beyond what Actions already represent.
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notifications or event push model
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "When power is off, display only responds to PON command"
# UNRESOLVED: no additional safety warnings, interlock procedures, or power-on sequencing found in source
```

## Notes
- Command format: `<STX><command>:<params><ETX>` (STX=0x02, ETX=0x03), documented for serial control.
- RS-232C: `<STX>command<ETX>`. SLOT UART: `<STX>AD95;command<ETX>`
- Serial ID targeting: `<STX>AD94;RAD=<NUM>;command<ETX>` (RS-232C only, e.g. RAD=001 for ID 1)
- Error response: `ER401` for incorrect commands
- Response interval: under 100ms from command to response
- Must wait for response before sending next command
- Straight-through serial cable required
- S1A/S1B inputs only available with dual input terminal board installed
- Parameter padding uses leading zeros (e.g. `000`–`100` for 3-digit fields)

<!-- UNRESOLVED: LAN framing is not specified in the source. -->
<!-- UNRESOLVED: default LAN port not stated -->
<!-- UNRESOLVED: maximum command queue depth or timing constraints beyond "wait for response" -->
<!-- UNRESOLVED: firmware version compatibility range -->

## Provenance

```yaml
source_domains:
  - docs.connect.panasonic.com
  - ptzprotocols.com
  - mediarealm.com.au
  - github.com
  - help.na.panasonic.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LF50_SerialCommandList.pdf
  - "https://ptzprotocols.com/1%20TXB%20Protocols/TXB-Panasonic/Panasonic%20Camera%20Protocol_4.0.pdf"
  - https://www.mediarealm.com.au/articles/panasonic-projector-commands/
  - https://github.com/ssjoholm/panasonic-cn-cnt/blob/main/Panasonic-CN-CNT-Protocol-v1.md
  - https://help.na.panasonic.com/manuals/
retrieved_at: 2026-05-19T04:38:31.405Z
last_checked_at: 2026-10-07T15:43:28.941Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T15:43:28.941Z
matched_actions: 206
action_count: 206
confidence: medium
summary: "All 206 action units match source literals with correct shapes; serial transport values are confirmed and the spec covers essentially the full command table. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LAN framing details and default port are not stated in source."
- "firmware version compatibility not stated in source"
- "default LAN port not stated in source; SSU:LCP sets the port number (1024-65535 excluding 4352 and 10000)"
- "wire separators between the four fields.\""
- "whether STD(AUT) denotes alternative response tokens.\""
- "wire separators.\""
- "inquiry wildcard semantics.\""
- "wire separator.\""
- "source does not describe unsolicited notifications or event push model"
- "source does not describe multi-step macro sequences"
- "no additional safety warnings, interlock procedures, or power-on sequencing found in source"
- "LAN framing is not specified in the source."
- "default LAN port not stated"
- "maximum command queue depth or timing constraints beyond \"wait for response\""
- "firmware version compatibility range"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
