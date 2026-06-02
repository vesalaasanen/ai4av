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
last_checked_at: 2026-06-02T22:12:58.834Z
generated_at: 2026-06-02T22:12:58.834Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LAN transport details (default port, addressing) not fully specified — network setup commands exist but default TCP port not stated"
  - "firmware version compatibility not stated in source"
  - "default LAN port not stated in source; configurable via SSU:LCP (1024-65535 excluding 4352 and 10000)"
  - "source does not describe unsolicited notifications or event push model"
  - "source does not describe multi-step macro sequences"
  - "no additional safety warnings, interlock procedures, or power-on sequencing found in source"
  - "LAN/TCP transport framing not specified — unclear if same STX/ETX framing or different"
  - "default LAN port not stated"
  - "maximum command queue depth or timing constraints beyond \"wait for response\""
  - "firmware version compatibility range"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:12:58.834Z
  matched_actions: 102
  action_count: 102
  confidence: medium
  summary: "All 102 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Panasonic TH-70/80LF50J (TH-70/80LF50) Control Spec

## Summary
Panasonic LED LCD professional displays (TH-70LF50J, TH-80LF50J series) controlled via RS-232C serial and LAN. The command set covers power, input selection, audio, picture adjustment, geometry, timers, multi-display tiling, screensaver, and diagnostics. Commands use a text-based STX/ETX framed protocol.

<!-- UNRESOLVED: LAN transport details (default port, addressing) not fully specified — network setup commands exist but default TCP port not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred: LAN command list present, network setup/port commands documented
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  cable_type: straight
addressing:
  port: null  # UNRESOLVED: default LAN port not stated in source; configurable via SSU:LCP (1024-65535 excluding 4352 and 10000)
auth:
  type: none  # inferred: no auth procedure in source
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
    command: "IMS:***"
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
          - DV1RGB
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
    command: "SSU:NET*** (13 params)"
    params:
      - name: ip_bytes
        type: string
        description: "IP address 4 bytes (000-255 each)"
      - name: subnet_bytes
        type: string
        description: "Subnet mask 4 bytes (000-255 each)"
      - name: gateway_bytes
        type: string
        description: "Gateway 4 bytes (000-255 each)"
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
```

## Feedbacks
```yaml
feedbacks:
  - id: power_status
    label: Power Status
    command: QPW
    response: "QPW:*"
    type: enum
    values:
      - "0"
      - "1"
    description: "0=Standby, 1=Power on"

  - id: input_query
    label: Current Input
    command: QMI
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
    response: "QAV:***"
    type: integer
    min: 0
    max: 100

  - id: audio_mute_query
    label: Audio Mute State
    command: QAM
    response: "QAM:*"
    type: enum
    values:
      - "0"
      - "1"

  - id: video_mute_query
    label: Video Mute State
    command: QVM
    response: "QVM:*"
    type: enum
    values:
      - "0"
      - "1"

  - id: aspect_query
    label: Current Aspect Ratio
    command: QAS
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
    response: "QPC:MEN***"
    type: enum
    values:
      - STD
      - DYN
      - CNM

  - id: backlight_query
    label: Backlight Level
    command: "QPC:BLT"
    response: "QPC:BLT***"
    type: integer
    min: 0
    max: 100

  - id: contrast_query
    label: Contrast Level
    command: "QPC:PIC"
    response: "QPC:PIC***"
    type: integer
    min: 0
    max: 100

  - id: brightness_query
    label: Black Level (Brightness)
    command: "QPC:BLK"
    response: "QPC:BLK***"
    type: integer
    min: 0
    max: 100

  - id: color_query
    label: Color Level
    command: "QPC:COL"
    response: "QPC:COL***"
    type: integer
    min: 0
    max: 100

  - id: tint_query
    label: Tint Level
    command: "QPC:TIN"
    response: "QPC:TIN***"
    type: integer
    min: 0
    max: 100

  - id: sharpness_query
    label: Sharpness Level
    command: "QPC:SHP"
    response: "QPC:SHP***"
    type: integer
    min: 0
    max: 100

  - id: color_temperature_query
    label: Color Temperature
    command: "QPC:TMP"
    response: "QPC:TMP***"
    type: enum
    values:
      - WRM
      - MID
      - COL

  - id: signal_frequency_query
    label: Signal Frequency
    command: QFR
    response: "QFR:***.* ***.*"
    type: string
    description: "Horizontal freq, Vertical freq (kHz/Hz)"

  - id: signal_format_query
    label: Signal Format
    command: QSF
    response: "QSF:***************** ***"
    type: string
    description: "Current video format info (max 20 chars)"

  - id: model_name_query
    label: Model Name
    command: QMN
    response: "QMN:*****"
    type: string
    values:
      - 80F10
      - 47F10
    description: "Returns LF50 or LFP35"

  - id: serial_number_query
    label: Serial Number
    command: QSN
    response: "QSN:*****"
    type: string
    description: "ASCII 9-15 characters, alphanumeric, space, dash"

  - id: sos_history_query
    label: SOS History
    command: QSS
    response: "QSS:**.**.**.**.**.**"
    type: string
    description: "Error history: count + last 5 SOS codes (00-FF each)"

  - id: sos_status_query
    label: SOS Status
    command: "QSS:STS"
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
    response: "QDZ:* * * *"
    type: string
    description: "OFF/ON, enlarge 1-4, H-pos 1-5, V-pos 1-5"
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
- Command format: `<STX><command>:<params><ETX>` (STX=0x02, ETX=0x03)
- RS-232C only: `<STX>command<ETX>`. SLOT UART: `<STX>AD95;command<ETX>`
- Serial ID targeting: `<STX>AD94;RAD=<NUM>;command<ETX>` (RS-232C only, e.g. RAD=001 for ID 1)
- Error response: `ER401` for incorrect commands
- Response interval: under 100ms from command to response
- Must wait for response before sending next command
- Straight-through serial cable required
- S1A/S1B inputs only available with dual input terminal board installed
- Parameter padding uses leading zeros (e.g. `000`–`100` for 3-digit fields)

<!-- UNRESOLVED: LAN/TCP transport framing not specified — unclear if same STX/ETX framing or different -->
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
last_checked_at: 2026-06-02T22:12:58.834Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:12:58.834Z
matched_actions: 102
action_count: 102
confidence: medium
summary: "All 102 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LAN transport details (default port, addressing) not fully specified — network setup commands exist but default TCP port not stated"
- "firmware version compatibility not stated in source"
- "default LAN port not stated in source; configurable via SSU:LCP (1024-65535 excluding 4352 and 10000)"
- "source does not describe unsolicited notifications or event push model"
- "source does not describe multi-step macro sequences"
- "no additional safety warnings, interlock procedures, or power-on sequencing found in source"
- "LAN/TCP transport framing not specified — unclear if same STX/ETX framing or different"
- "default LAN port not stated"
- "maximum command queue depth or timing constraints beyond \"wait for response\""
- "firmware version compatibility range"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
