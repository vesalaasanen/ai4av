---
spec_id: admin/panasonic-thxx-lf-8-80-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic TH-42/49/55LF8 / TH-42/49/55LF80 Control Spec"
manufacturer: Panasonic
model_family: TH-42LF8
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - TH-42LF8
    - TH-49LF8
    - TH-55LF8
    - TH-42LF80
    - TH-49LF80
    - TH-55LF80
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
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LF8_80_SerialCommandList.pdf
  - "https://ptzprotocols.com/1%20TXB%20Protocols/TXB-Panasonic/Panasonic%20Camera%20Protocol_4.0.pdf"
  - https://www.mediarealm.com.au/articles/panasonic-projector-commands/
  - https://github.com/ssjoholm/panasonic-cn-cnt/blob/main/Panasonic-CN-CNT-Protocol-v1.md
  - https://help.na.panasonic.com/manuals/
retrieved_at: 2026-06-11T22:33:19.002Z
last_checked_at: 2026-06-22T14:12:25.202Z
generated_at: 2026-06-22T14:12:25.202Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LAN port number not stated in source (LAN protocol doc referenced separately). Cable pinout for LF80 YFB200 path not fully specified."
  - "TCP port for LAN control not stated in this source"
  - "feedback states are encoded in the reply strings of each query"
  - "settable scalar parameters are encoded as parameterized actions"
  - "no explicit multi-step macro sequences documented in source"
  - "source does not document safety warnings, interlock procedures,"
  - "LAN TCP port for Protocol1/Protocol2 (LP1/LP2) not in this source. Password/auth model for LAN path not in this source."
verification:
  verdict: verified
  checked_at: 2026-06-22T14:12:25.202Z
  matched_actions: 280
  action_count: 280
  confidence: medium
  summary: "All 280 spec commands matched verbatim against source command table; transport parameters confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Panasonic TH-42/49/55LF8 / TH-42/49/55LF80 Control Spec

## Summary
FullHD LCD professional displays (LF8 and LF80 series, 42/49/55 inch). RS-232C and LAN control via Panasonic command protocol framed with STX/ETX. LF80 adds DIGITAL LINK and YFB200 features.

<!-- UNRESOLVED: LAN port number not stated in source (LAN protocol doc referenced separately). Cable pinout for LF80 YFB200 path not fully specified. -->

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
  type: none  # inferred: no auth procedure in source
# LAN control protocol also documented (see LAN_Protocol_exp.pdf) - port/dialog
# details not in this source; mark unresolved:
# UNRESOLVED: TCP port for LAN control not stated in this source
```

## Traits
```yaml
traits:
  - powerable  # inferred from power on/off commands
  - routable   # inferred from input change commands
  - queryable  # inferred from query commands
  - levelable  # inferred from volume/backlight/brightness commands
```

## Actions
```yaml
# Basic Control
- id: power_on
  label: Power ON
  kind: action
  command: "PON"
  params: []
- id: power_off
  label: Power OFF
  kind: action
  command: "POF"
  params: []
- id: power_status_query
  label: Power Status
  kind: query
  command: "QPW"
  params: []
- id: input_change
  label: Input Change
  kind: action
  command: "IMS:{input}"
  params:
    - name: input
      type: string
      description: HM1 / HM2 / DL1(LF80) / DV1 / PC1 / YP1 / VD1 / UD1
- id: digital_link_input_select
  label: Digital Link Input select (YFB)
  kind: action
  command: "IMS:DL1{input}"
  params:
    - name: input
      type: string
      description: YFB100: HD1/HD2/PC1/PC2/SVD/VID; YFB200: HD1/HD2/PC1/PC2/VID (LF80 only)
- id: audio_volume_set
  label: Audio Volume
  kind: action
  command: "AVL:{level}"
  params:
    - name: level
      type: integer
      description: 000-100
- id: volume_up
  label: Volume Up
  kind: action
  command: "AUU"
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  command: "AUD"
  params: []
- id: current_audio_volume_query
  label: Current Audio Volume
  kind: query
  command: "QAV"
  params: []
- id: audio_mute
  label: Audio Mute
  kind: action
  command: "AMT:{state}"
  params:
    - name: state
      type: string
      description: "0 = Off, 1 = On (or omit to toggle)"
- id: video_mute
  label: Video Mute
  kind: action
  command: "VMT:{state}"
  params:
    - name: state
      type: string
      description: "0 = Off, 1 = On (or omit to toggle)"
- id: aspect_change
  label: Aspect Change
  kind: action
  command: "DAM:{aspect}"
  params:
    - name: aspect
      type: string
      description: FULL / NORM / ZOOM / ZOM2
- id: picture_mode_set
  label: Picture Mode
  kind: action
  command: "VPC:MEN{mode}"
  params:
    - name: mode
      type: string
      description: VIV / NAT / STD / SUV / GRH / DCM
- id: backlight_set
  label: Backlight
  kind: action
  command: "VPC:BLT{value}"
  params:
    - name: value
      type: integer
      description: 000-100 or DEF
- id: contrast_set
  label: Contrast
  kind: action
  command: "VPC:PIC{value}"
  params:
    - name: value
      type: integer
      description: 000-100 or DEF
- id: brightness_set
  label: Brightness
  kind: action
  command: "VPC:BLK{value}"
  params:
    - name: value
      type: integer
      description: 000-100 or DEF
- id: color_set
  label: Color
  kind: action
  command: "VPC:COL{value}"
  params:
    - name: value
      type: integer
      description: 000-100 or DEF
- id: tint_set
  label: Tint
  kind: action
  command: "VPC:TIN{value}"
  params:
    - name: value
      type: integer
      description: 000-100 or DEF
- id: sharpness_set
  label: Sharpness
  kind: action
  command: "VPC:SHP{value}"
  params:
    - name: value
      type: integer
      description: 000-100 or DEF
- id: enhance_level_set
  label: Enhance level
  kind: action
  command: "VPC:SHE{level}"
  params:
    - name: level
      type: string
      description: "1 = low, 2 = high"
- id: gamma_set
  label: Gamma
  kind: action
  command: "VWB:GMM{value}"
  params:
    - name: value
      type: string
      description: 20 / 22 / 24 / 26 / DC
- id: color_temperature_set
  label: Color Temperature
  kind: action
  command: "VPC:TMP{value}"
  params:
    - name: value
      type: string
      description: 032 / 040 / 050 / 065 / 075 / 093 / 107 / NTV / U01 / U02
- id: red_gain_set
  label: Red Gain
  kind: action
  command: "VWB:RGN{value}"
  params:
    - name: value
      type: integer
      description: 0000-0255 (USER1/USER2 only)
- id: green_gain_set
  label: Green Gain
  kind: action
  command: "VWB:GGN{value}"
  params:
    - name: value
      type: integer
      description: 0000-0255 (USER1/USER2 only)
- id: blue_gain_set
  label: Blue Gain
  kind: action
  command: "VWB:BGN{value}"
  params:
    - name: value
      type: integer
      description: 0000-0255 (USER1/USER2 only)
- id: red_bias_set
  label: Red Bias
  kind: action
  command: "VWB:RBS{value}"
  params:
    - name: value
      type: integer
      description: -127 to 0128 (USER1/USER2 only)
- id: green_bias_set
  label: Green Bias
  kind: action
  command: "VWB:GBS{value}"
  params:
    - name: value
      type: integer
      description: -127 to 0128 (USER1/USER2 only)
- id: blue_bias_set
  label: Blue Bias
  kind: action
  command: "VWB:BBS{value}"
  params:
    - name: value
      type: integer
      description: -127 to 0128 (USER1/USER2 only)
- id: six_segment_cm_set
  label: 6-segment color management
  kind: action
  command: "VWB:CMF{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: six_segment_cm_select_color
  label: 6-segment color management select color
  kind: action
  command: "VWB:CML{color}{tint}{sat}{val}"
  params:
    - name: color
      type: string
      description: R / Y / G / C / B / M
    - name: tint
      type: integer
      description: -511 to 0511
    - name: sat
      type: integer
      description: -127 to 0127
    - name: val
      type: integer
      description: -127 to 0127
- id: six_segment_cm_reset
  label: 6-segment color management reset
  kind: action
  command: "VWB:CMR"
  params: []
- id: dynamic_contrast_set
  label: Dynamic Contrast
  kind: action
  command: "VPC:DCO{value}"
  params:
    - name: value
      type: integer
      description: 00-10
- id: color_enhancement_set
  label: Color Enhancement
  kind: action
  command: "VPC:PAJ{level}"
  params:
    - name: level
      type: string
      description: "0 = Off, 1 = Low, 2 = Mid, 3 = High"
- id: refine_enhancer_set
  label: Refine enhancer
  kind: action
  command: "VPC:SRC{level}"
  params:
    - name: level
      type: string
      description: "0 = Off, 1 = Low, 2 = Mid, 3 = High"
- id: gradation_smoother_set
  label: Gradation smoother
  kind: action
  command: "VPC:GRS{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: memory_delete
  label: Memory delete
  kind: action
  command: "VPF:DEL{slot}"
  params:
    - name: slot
      type: integer
      description: 01-06
- id: memory_load
  label: Memory load
  kind: action
  command: "VPF:LOD{slot}"
  params:
    - name: slot
      type: integer
      description: 01-06
- id: memory_name_change
  label: Memory name change
  kind: action
  command: "VPF:NAM{slot}{name}"
  params:
    - name: slot
      type: integer
      description: 01-06
    - name: name
      type: string
      description: Memory name (max 20 chars, allowed chars per source)
- id: memory_save
  label: Memory save
  kind: action
  command: "VPF:SAV{slot}{name}"
  params:
    - name: slot
      type: integer
      description: 01-06
    - name: name
      type: string
      description: Memory name (max 20 chars, allowed chars per source)
- id: memory_state_query
  label: Memory state
  kind: query
  command: "QPF:STA"
  params: []
- id: output_select_set
  label: Output Select
  kind: action
  command: "AAC:OUT{output}"
  params:
    - name: output
      type: string
      description: SPO / LNO (Speakers / Audio Out)
- id: sound_mode_set
  label: Sound Mode
  kind: action
  command: "AAC:MEN{mode}"
  params:
    - name: mode
      type: string
      description: STD(AUT) / DYN / CLR
- id: bass_set
  label: Bass
  kind: action
  command: "AAC:BAS{value}"
  params:
    - name: value
      type: integer
      description: -20 to 020
- id: treble_set
  label: Treble
  kind: action
  command: "AAC:TRE{value}"
  params:
    - name: value
      type: integer
      description: -20 to 020
- id: balance_set
  label: Balance
  kind: action
  command: "AAC:BAL{value}"
  params:
    - name: value
      type: integer
      description: -20 to 020
- id: surround_set
  label: Surround
  kind: action
  command: "AAC:SUR{state}"
  params:
    - name: state
      type: string
      description: MON / OFF (ON / OFF)
- id: hposition_set
  label: Horizontal Position
  kind: action
  command: "DGE:HPO{value}"
  params:
    - name: value
      type: integer
      description: -100 to 0100
- id: hsize_set
  label: Horizontal Size
  kind: action
  command: "DGE:HSZ{value}"
  params:
    - name: value
      type: integer
      description: -100 to 0100
- id: vposition_set
  label: Vertical Position
  kind: action
  command: "DGE:VPO{value}"
  params:
    - name: value
      type: integer
      description: -100 to 0100
- id: vsize_set
  label: Vertical Size
  kind: action
  command: "DGE:VSZ{value}"
  params:
    - name: value
      type: integer
      description: -100 to 0100
- id: clock_phase_set
  label: Clock Phase
  kind: action
  command: "DGE:CLK{value}"
  params:
    - name: value
      type: integer
      description: 00-30
- id: dot_clock_set
  label: Dot Clock
  kind: action
  command: "DGE:DCL{value}"
  params:
    - name: value
      type: integer
      description: -5 to 05
- id: pixel_mode_1to1_set
  label: 1:1 Pixel Mode
  kind: action
  command: "DGE:DBD{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: overscan_set
  label: Overscan
  kind: action
  command: "DGE:OVS{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: pos_size_lump_set
  label: Pos./Size Lump Setting
  kind: action
  command: "DGE:PSZ{hpos}{hsize}{vpos}{vsize}"
  params:
    - name: hpos
      type: integer
      description: -100 to 0100
    - name: hsize
      type: integer
      description: -100 to 0100
    - name: vpos
      type: integer
      description: -100 to 0100
    - name: vsize
      type: integer
      description: -100 to 0100
- id: auto_setup
  label: Auto Setup
  kind: action
  command: "DGE:ASU1"
  params: []
- id: auto_setup_query
  label: Auto Setup Status
  kind: query
  command: "QGE:ASU"
  params: []
- id: wobbling_set
  label: Wobbling
  kind: action
  command: "OSP:WOB{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: no_activity_power_off_set
  label: No activity power off
  kind: action
  command: "SSU:NAO{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: osd_language_set
  label: OSD Language
  kind: action
  command: "SSU:LNG{lang}"
  params:
    - name: lang
      type: string
      description: ENG / DEU / FRA / ITL / ESP / USA / CHA / JPN / RUS
- id: power_management_mode_set
  label: Power Management Mode
  kind: action
  command: "SSU:ECS{mode}"
  params:
    - name: mode
      type: string
      description: "0 = CUSTOM, 1 = ON"
- id: no_signal_power_off_set
  label: No Signal Power Off
  kind: action
  command: "SSU:AOF{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: pc_power_management_set
  label: PC Power Management
  kind: action
  command: "SSU:DPM{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: dvi_d1_power_management_set
  label: DVI-D1 Power Management
  kind: action
  command: "SSU:D1V{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: hdmi1_power_management_set
  label: HDMI1 Power Management
  kind: action
  command: "SSU:D1H{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: hdmi2_power_management_set
  label: HDMI2 Power Management
  kind: action
  command: "SSU:D2H{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: digital_link_power_management_set
  label: DIGITAL LINK Power Management
  kind: action
  command: "SSU:D1L{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on (LF80 only)"
- id: power_save_set
  label: Power Save
  kind: action
  command: "SSU:ECO{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: display_orientation_set
  label: Display Orientation
  kind: action
  command: "SSU:DOR{orientation}"
  params:
    - name: orientation
      type: string
      description: "0 = Landscape, 1 = Portrait"
- id: menu_position_set
  label: Menu Position
  kind: action
  command: "SSU:OPS{pos}"
  params:
    - name: pos
      type: string
      description: "1-5: Upper-left/right, Center, Lower-left/right"
- id: menu_display_duration_set
  label: Menu Display Duration
  kind: action
  command: "SSU:MDT{seconds}"
  params:
    - name: seconds
      type: integer
      description: 005-180 (5s units)
- id: menu_transparency_set
  label: Menu Transparency
  kind: action
  command: "SSU:MTL{value}"
  params:
    - name: value
      type: integer
      description: 000-100 (10% unit)
- id: serial_control_set
  label: Serial Control
  kind: action
  command: "SCT:SEC{path}"
  params:
    - name: path
      type: string
      description: SE1 / DL1 (Serial in / DIGITAL LINK, LF80 only)
- id: network_setup_set
  label: Network Setup
  kind: action
  command: "SSU:NET{i1}{i2}{i3}{i4}{m1}{m2}{m3}{m4}{g1}{g2}{g3}{g4}{dhcp}"
  params:
    - name: i1..i4
      type: integer
      description: IP address bytes 000-255
    - name: m1..m4
      type: integer
      description: Subnet mask bytes 000-255
    - name: g1..g4
      type: integer
      description: Gateway bytes 000-255
    - name: dhcp
      type: string
      description: "0 = DHCP off, 1 = DHCP on"
- id: network_setup_port_set
  label: Network Setup Port Number
  kind: action
  command: "SSU:LCP{port}"
  params:
    - name: port
      type: integer
      description: "01024-65535; 04352, 10000, 20000, 41794 excluded"
- id: digital_link_mode_set
  label: DIGITAL LINK Mode
  kind: action
  command: "SSU:DLM{mode}"
  params:
    - name: mode
      type: string
      description: AT / DL / EN / LR (Auto / DIGITAL LINK / Ethernet / Long Reach) - LF80 only
- id: change_display_name
  label: Change Display Name
  kind: action
  command: "SSU:LDN{name}"
  params:
    - name: name
      type: string
      description: Max 8 parameters, allowed chars per source
- id: digital_link_status_query
  label: DIGITAL LINK Status
  kind: query
  command: "QSU:DLS"
  params: []
- id: amx_dd_set
  label: AMX D.D.
  kind: action
  command: "SSU:ADD{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: crestron_connected_set
  label: Crestron Connected
  kind: action
  command: "SSU:CRV{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: extron_xtp_set
  label: Extron XTP
  kind: action
  command: "SSU:EXP{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on (LF80 only)"
- id: setup_reset
  label: Reset (Setup)
  kind: action
  command: "SSU:LRT"
  params: []
- id: component_rgb_in_select_set
  label: Component/RGB-IN Select
  kind: action
  command: "SSU:CMP{signal}"
  params:
    - name: signal
      type: string
      description: YBR / RGB
- id: yuv_rgb_in_select_set
  label: YUV/RGB-IN Select
  kind: action
  command: "SSU:DYR{signal}"
  params:
    - name: signal
      type: string
      description: YUV / RGB
- id: yc_filter_3d_set
  label: 3D Y/C Filter
  kind: action
  command: "SSG:YCS{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: color_system_set
  label: Color System
  kind: action
  command: "SSG:COS{system}"
  params:
    - name: system
      type: string
      description: NTS / PAL / SCM / 4NT / MPA / NPA / AUT
- id: sync_signal_setting_set
  label: Sync Signal Setting
  kind: action
  command: "SSG:SNC{mode}"
  params:
    - name: mode
      type: string
      description: HAV / GRN / HVS (PC input only)
- id: cinema_reality_set
  label: Cinema Reality 3:2 Pull Down
  kind: action
  command: "SSG:DCR{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: xga_mode_set
  label: XGA Mode
  kind: action
  command: "SSG:XGA{mode}"
  params:
    - name: mode
      type: string
      description: "1 = 1024x768, 2 = 1280x768, 3 = 1366x768, 4 = Auto"
- id: noise_reduction_set
  label: Noise Reduction
  kind: action
  command: "SSG:NRS{level}"
  params:
    - name: level
      type: string
      description: OFF / AUT / LOW / MID / HIG
- id: mpeg_noise_reduction_set
  label: MPEG Noise Reduction
  kind: action
  command: "SSG:MNR{level}"
  params:
    - name: level
      type: string
      description: OFF / LOW / MID / HIG
- id: signal_range_set
  label: Signal Range
  kind: action
  command: "SSG:HRC{range}"
  params:
    - name: range
      type: string
      description: VID / FUL / AUT
- id: input_level_set
  label: Input Level
  kind: action
  command: "VWB:ILV{value}"
  params:
    - name: value
      type: integer
      description: -16 to 016
- id: dynamic_backlight_control_set
  label: Dynamic backlight control
  kind: action
  command: "SSG:DBC{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: screensaver_on_off_set
  label: Screensaver ON/OFF
  kind: action
  command: "OSP:SCR{state}"
  params:
    - name: state
      type: string
      description: "0 = stop, 5 = operating"
- id: screensaver_mode_set
  label: Screensaver Mode
  kind: action
  command: "SSC:MOD{mode}"
  params:
    - name: mode
      type: string
      description: "0 = OFF, 1 = Interval, 2 = Time Designation, 3 = ON, 4 = Standby after Screensaver"
- id: interval_screensaver_set
  label: Interval Screensaver
  kind: action
  command: "SSC:INT{periodic}{operating}"
  params:
    - name: periodic
      type: integer
      description: 0000-2359 periodic time
    - name: operating
      type: integer
      description: 0000-2359 operating time
- id: time_designation_screensaver_set
  label: Time Designation Screensaver
  kind: action
  command: "SSC:TIM{start}{finish}"
  params:
    - name: start
      type: integer
      description: 0000-2359 start time
    - name: finish
      type: integer
      description: 0000-2359 finish time
- id: standby_after_screensaver_set
  label: Standby after Screensaver
  kind: action
  command: "SSC:AOF{time}"
  params:
    - name: time
      type: integer
      description: 0000-2359 time of operation (hour:minute)
- id: set_label_current_input
  label: Set Label for Current Input
  kind: action
  command: "SSU:ILA{label}"
  params:
    - name: label
      type: string
      description: INP / PCN / DV1-DV3 / BD1-BD3 / CTV / VCR / STB / SKP
- id: set_label_each_input
  label: Set Label for EACH INPUT
  kind: action
  command: "SSU:ILA{input}{label}"
  params:
    - name: input
      type: string
      description: HM1 / HM2 / DL1 / DV1 / PC1 / YP1 / VD1
    - name: label
      type: string
      description: INP / DV1-DV3 / BD1-BD3 / CTV / VCR / STB / SKP
- id: function_group_set
  label: Function Group
  kind: action
  command: "OSP:KGR{group}"
  params:
    - name: group
      type: string
      description: INP / MEM / ACT
- id: function_button_set
  label: Function Button Settings
  kind: action
  command: "OSP:KFN{key}{func}"
  params:
    - name: key
      type: integer
      description: "1-6"
    - name: func
      type: string
      description: ACTION& MENU: SIG/SSV/SUT/LNS/ECO/OSH/DZM/MLT; INPUT: HM1/HM2/DL1/DV1/PC1/YP1/VD1/UD1
- id: function_guide_set
  label: Function guide Settings
  kind: action
  command: "OSP:KFG{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: multi_display_on_off
  label: Multi Display ON/OFF
  kind: action
  command: "MDC:{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: multi_display_setup_detail
  label: Multi Display Setup Detail
  kind: action
  command: "MDC:EXP{on}{hscale}{vscale}{bezelh}{bezelv}{loc}"
  params:
    - name: on
      type: string
      description: "0 = off, 1 = on"
    - name: hscale
      type: integer
      description: "01-10 (1-2 for USB)"
    - name: vscale
      type: integer
      description: "01-10 (1-2 for USB)"
    - name: bezelh
      type: integer
      description: "000-100"
    - name: bezelv
      type: integer
      description: "000-100"
    - name: loc
      type: integer
      description: Location 001-100 (A1-J10); USB A1-B2
- id: timer_program_set
  label: Timer Program
  kind: action
  command: "TIM:PRG{prog}{on}{day}{act}{time}{input}"
  params:
    - name: prog
      type: integer
      description: 01-20 program number
    - name: on
      type: string
      description: "0 = off, 1 = on"
    - name: day
      type: string
      description: SUN/MON/TUE/WED/THU/FRI/SAT/EVD
    - name: act
      type: string
      description: PON / POF
    - name: time
      type: integer
      description: 0000-2359 hour, minute
    - name: input
      type: string
      description: HM1/HM2/DL1/DV1/PC1/YP1/VD1/UD1
- id: present_day_query
  label: Present Day
  kind: query
  command: "QIM:DAY"
  params: []
- id: present_time_query
  label: Present Time
  kind: query
  command: "QIM:NOW"
  params: []
- id: day_time_set
  label: DAY TIME
  kind: action
  command: "TIM:DAT{year}{month}{day}{hour}{minute}"
  params:
    - name: year
      type: integer
      description: 2015-2099
    - name: month
      type: integer
      description: 01-12
    - name: day
      type: integer
      description: 01-31
    - name: hour
      type: integer
      description: 00-23
    - name: minute
      type: integer
      description: 00-59
- id: usb_media_player_set
  label: USB media player
  kind: action
  command: "SUS:UMP{state}"
  params:
    - name: state
      type: string
      description: "0 = Disable, 1 = Enable"
- id: resume_play_set
  label: Resume play
  kind: action
  command: "SUS:RSP{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: slide_show_duration_set
  label: Slide show duration
  kind: action
  command: "SUS:SSD{seconds}"
  params:
    - name: seconds
      type: integer
      description: 010-600 (5s unit)
- id: osd_on_off_set
  label: On screen display
  kind: action
  command: "OSP:OSD{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: initial_input_set
  label: Initial input
  kind: action
  command: "OSP:IIN{input}"
  params:
    - name: input
      type: string
      description: OFF / HM1 / HM2 / DL1 / DV1 / PC1 / YP1 / VD1 / UD1
- id: initial_vol_level_set
  label: Initial VOL level
  kind: action
  command: "OSP:IVL{on}{volume}"
  params:
    - name: on
      type: string
      description: "0 = off, 1 = on"
    - name: volume
      type: integer
      description: 000-100
- id: max_vol_level_set
  label: Maximum VOL level
  kind: action
  command: "OSP:MVL{on}{volume}"
  params:
    - name: on
      type: string
      description: "0 = off, 1 = on"
    - name: volume
      type: integer
      description: 000-100
- id: input_lock_set
  label: Input lock
  kind: action
  command: "OSP:INL{input}"
  params:
    - name: input
      type: string
      description: OFF / HM1 / HM2 / DL1 / DV1 / PC1 / YP1 / VD1 / UD1
- id: button_lock_set
  label: Button lock
  kind: action
  command: "OSP:BTL{level}"
  params:
    - name: level
      type: string
      description: OFF / MEN / ALL
- id: controller_user_level_set
  label: Controller User level
  kind: action
  command: "OSP:RCM{level}"
  params:
    - name: level
      type: string
      description: "0 = OFF, 1 = User1, 2 = User2, 3 = User3"
- id: pc_auto_setting_set
  label: PC auto setting
  kind: action
  command: "OSP:PAS{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: offtimer_function_set
  label: Off timer function
  kind: action
  command: "OSP:OFT{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: initial_startup_set
  label: Initial Startup
  kind: action
  command: "OSP:ISU{mode}"
  params:
    - name: mode
      type: string
      description: LST / PON / STB
- id: startup_logo_set
  label: Startup Logo
  kind: action
  command: "OSP:LOG{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: display_id_query
  label: Display ID
  kind: query
  command: "QID:DID"
  params: []
- id: serial_id_function_set
  label: Serial ID function
  kind: action
  command: "SID:SID{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: serial_id_setup
  label: Serial ID Setup
  kind: action
  command: "SIF:{on}{id}"
  params:
    - name: on
      type: string
      description: "0 = off, 1 = on"
    - name: id
      type: integer
      description: 000-100 display ID
- id: serial_response_id_all_set
  label: Serial response (ID all)
  kind: action
  command: "SCT:RIA{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: serial_daisy_chain_position_set
  label: Serial daisy chain position
  kind: action
  command: "SCT:DCP{position}"
  params:
    - name: position
      type: string
      description: TOP / DEF / END
- id: lan_control_protocol_set
  label: LAN Control Protocol
  kind: action
  command: "OSP:LPN{protocol}"
  params:
    - name: protocol
      type: string
      description: LP1 / LP2
- id: power_on_screen_delay_set
  label: Power ON Screen Delay
  kind: action
  command: "OSP:POD{value}"
  params:
    - name: value
      type: string
      description: AT / 00-30
- id: clock_display_set
  label: Clock Display
  kind: action
  command: "OSP:CLK{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: nap_set
  label: Power on message No activity power off
  kind: action
  command: "OSP:NAP{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: power_message_set
  label: Power on message Power management
  kind: action
  command: "OSP:PMM{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: input_search_set
  label: Input search
  kind: action
  command: "ISH:FNC{mode}"
  params:
    - name: mode
      type: string
      description: OFF / ALL / PRI
- id: first_search_input_set
  label: 1st search input
  kind: action
  command: "ISH:PRI{input}"
  params:
    - name: input
      type: string
      description: NON / HM1 / HM2 / DL1 / DV1 / PC1 / YP1 / VD1 / UD1
- id: second_search_input_set
  label: 2nd search input
  kind: action
  command: "ISH:SCI{input}"
  params:
    - name: input
      type: string
      description: NON / HM1 / HM2 / DL1 / DV1 / PC1 / YP1 / VD1 / UD1
- id: input_change_mode_off
  label: Input Change Mode Off
  kind: action
  command: "SBI:OFF"
  params: []
- id: input_change_mode_quick
  label: Input Change Mode Quick
  kind: action
  command: "SBI:QIC{primary}{secondary}{autoswitchback}"
  params:
    - name: primary
      type: string
      description: NON / HM1 / HM2 / DL1 / DV1
    - name: secondary
      type: string
      description: NON / HM1 / HM2 / DL1 / DV1
    - name: autoswitchback
      type: string
      description: "0 = Disable, 1 = Enable"
- id: input_change_mode_normal
  label: Input Change Mode Normal
  kind: action
  command: "SBI:NOR{primary}{secondary}{autoswitchback}"
  params:
    - name: primary
      type: string
      description: NON / HM1/HM2/DL1/DV1/PC1/YP1/VD1/UD1
    - name: secondary
      type: string
      description: NON / HM1/HM2/DL1/DV1/PC1/YP1/VD1/UD1
    - name: autoswitchback
      type: string
      description: "0 = Disable, 1 = Enable"
- id: changing_mode_set
  label: Changing mode
  kind: action
  command: "SBI:CHM{mode}"
  params:
    - name: mode
      type: string
      description: "2 = High speed, 1 = Normal"
- id: backup_input_status_query
  label: Backup Input Status
  kind: query
  command: "QBI:STS"
  params: []
- id: backup_input_signal_status_query
  label: Backup Input Signal Status
  kind: query
  command: "QBI:SIG"
  params: []
- id: manual_switch_back
  label: Manual Switch Back
  kind: action
  command: "BIP:FSB"
  params: []
- id: audio_input_select_current
  label: Audio input select (current)
  kind: action
  command: "SAI:A{audio}"
  params:
    - name: audio
      type: string
      description: HM1/HM2/DL1/PC1/VD1/NAD
- id: audio_input_select_each
  label: Audio input select (each input)
  kind: action
  command: "SAI:V{input}A{audio}"
  params:
    - name: input
      type: string
      description: HM1/HM2/DL1/DV1/PC1/YP1/VD1
    - name: audio
      type: string
      description: HM1/HM2/DL1/PC1/VD1/NAD
- id: no_signal_warning_set
  label: No Signal Warning
  kind: action
  command: "SIT:NSW{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: no_signal_warning_timing_set
  label: No Signal Warning Timing
  kind: action
  command: "SIT:SWT{minutes}"
  params:
    - name: minutes
      type: integer
      description: 01-60
- id: no_signal_error_set
  label: No Signal Error
  kind: action
  command: "SIT:NSE{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: no_signal_error_timing_set
  label: No Signal Error Timing
  kind: action
  command: "SIT:SET{minutes}"
  params:
    - name: minutes
      type: integer
      description: 01-90
- id: temperature_warning_set
  label: Temperature Warning
  kind: action
  command: "SIT:TPW{state}"
  params:
    - name: state
      type: string
      description: "0 = off, 1 = on"
- id: recall
  label: Recall
  kind: action
  command: "DDS"
  params: []
- id: audio_mute_aoc
  label: Audio Mute (AOC)
  kind: action
  command: "AOC:{state}"
  params:
    - name: state
      type: string
      description: "0 = MUTE OFF, 1 = MUTE ON"
- id: osd_clear
  label: OSD Clear
  kind: action
  command: "VDO"
  params: []
- id: digital_zoom
  label: Digital zoom
  kind: action
  command: "DZM:{on}{factor}{hpos}{vpos}"
  params:
    - name: on
      type: string
      description: "0 = off, 1 = on"
    - name: factor
      type: integer
      description: "1-4 enlargement factor"
    - name: hpos
      type: integer
      description: "1-5 display position (Horizontal)"
    - name: vpos
      type: integer
      description: "1-5 display position (Vertical)"
- id: off_timer
  label: Off Timer
  kind: action
  command: "ZOT:{minutes}"
  params:
    - name: minutes
      type: integer
      description: 00-90
- id: usb_next
  label: USB media player - Skip next
  kind: action
  command: "UMP:NXT"
  params: []
- id: usb_previous
  label: USB media player - Skip previous
  kind: action
  command: "UMP:PRE"
  params: []
- id: usb_replay
  label: USB media player - Replay from top
  kind: action
  command: "UMP:RPY"
  params: []
- id: signal_frequency_query
  label: Signal Frequency
  kind: query
  command: "QFR"
  params: []
- id: signal_format_query
  label: Signal Format
  kind: query
  command: "QSF"
  params: []
- id: digital_link_status_detail_query
  label: DIGITAL LINK Status detail
  kind: query
  command: "QST:DLD"
  params: []
- id: no_signal_warning_query
  label: No Signal Warning status
  kind: query
  command: "QST:NSW"
  params: []
- id: no_signal_error_query
  label: No Signal Error status
  kind: query
  command: "QST:NSE"
  params: []
- id: auto_command_send_set
  label: Auto Command Send Setting
  kind: action
  command: "RCM:{qss}{qsserr}"
  params:
    - name: qss
      type: string
      description: "0 = off, 1 = on (QSS command)"
    - name: qsserr
      type: string
      description: "0 = off, 1 = on (QSS:STSERR)"
- id: model_name_query
  label: Model Name
  kind: query
  command: "QMN"
  params: []
- id: model_query
  label: Model
  kind: query
  command: "QID"
  params: []
- id: software_version_main_query
  label: Software Version Main MCU
  kind: query
  command: "QRV"
  params: []
- id: software_version_sub_query
  label: Software Version Sub MCU
  kind: query
  command: "QRV:STB"
  params: []
- id: software_version_eeprom_query
  label: Software Version EEPROM
  kind: query
  command: "QRV:EEP"
  params: []
- id: software_version_hdbaset_query
  label: Software Version HDBaseT
  kind: query
  command: "QRV:HBT"
  params: []
- id: serial_number_query
  label: Serial Number
  kind: query
  command: "QSN"
  params: []
- id: sos_history_query
  label: SOS History
  kind: query
  command: "QSS"
  params: []
- id: sos_status_query
  label: SOS Status
  kind: query
  command: "QSS:STS"
  params: []
- id: input_change_query
  label: Input Change Query
  kind: query
  command: "QMI"
  params: []
- id: digital_link_input_query
  label: Digital Link Input Query
  kind: query
  command: "QMI:DL1"
  params: []
- id: audio_mute_query
  label: Audio Mute Query
  kind: query
  command: "QAM"
  params: []
- id: video_mute_query
  label: Video Mute Query
  kind: query
  command: "QVM"
  params: []
- id: aspect_change_query
  label: Aspect Change Query
  kind: query
  command: "QAS"
  params: []
- id: picture_mode_query
  label: Picture Mode Query
  kind: query
  command: "QPC:MEN"
  params: []
- id: backlight_query
  label: Backlight Query
  kind: query
  command: "QPC:BLT"
  params: []
- id: contrast_query
  label: Contrast Query
  kind: query
  command: "QPC:PIC"
  params: []
- id: brightness_query
  label: Brightness Query
  kind: query
  command: "QPC:BLK"
  params: []
- id: color_query
  label: Color Query
  kind: query
  command: "QPC:COL"
  params: []
- id: tint_query
  label: Tint Query
  kind: query
  command: "QPC:TIN"
  params: []
- id: sharpness_query
  label: Sharpness Query
  kind: query
  command: "QPC:SHP"
  params: []
- id: enhance_level_query
  label: Enhance Level Query
  kind: query
  command: "QPC:SHE"
  params: []
- id: gamma_query
  label: Gamma Query
  kind: query
  command: "QWB:GMM"
  params: []
- id: color_temperature_query
  label: Color Temperature Query
  kind: query
  command: "QPC:TMP"
  params: []
- id: red_gain_query
  label: Red Gain Query
  kind: query
  command: "QWB:RGN"
  params: []
- id: green_gain_query
  label: Green Gain Query
  kind: query
  command: "QWB:GGN"
  params: []
- id: blue_gain_query
  label: Blue Gain Query
  kind: query
  command: "QWB:BGN"
  params: []
- id: red_bias_query
  label: Red Bias Query
  kind: query
  command: "QWB:RBS"
  params: []
- id: green_bias_query
  label: Green Bias Query
  kind: query
  command: "QWB:GBS"
  params: []
- id: blue_bias_query
  label: Blue Bias Query
  kind: query
  command: "QWB:BBS"
  params: []
- id: six_segment_cm_query
  label: 6-Segment Color Management Query
  kind: query
  command: "QWB:CMF"
  params: []
- id: six_segment_cm_select_color_query
  label: 6-Segment Color Management Select Color Query
  kind: query
  command: "QWB:CML*"
  params:
    - name: color
      type: string
      description: R / Y / G / C / B / M
- id: dynamic_contrast_query
  label: Dynamic Contrast Query
  kind: query
  command: "QPC:DCO"
  params: []
- id: color_enhancement_query
  label: Color Enhancement Query
  kind: query
  command: "QPC:PAJ"
  params: []
- id: refine_enhancer_query
  label: Refine Enhancer Query
  kind: query
  command: "QPC:SRC"
  params: []
- id: gradation_smoother_query
  label: Gradation Smoother Query
  kind: query
  command: "QPC:GRS"
  params: []
- id: memory_name_query
  label: Memory Name Query
  kind: query
  command: "QPF:NAM"
  params:
    - name: slot
      type: integer
      description: 01-06
- id: output_select_query
  label: Output Select Query
  kind: query
  command: "QAC:OUT"
  params: []
- id: sound_mode_query
  label: Sound Mode Query
  kind: query
  command: "QAC:MEN"
  params: []
- id: bass_query
  label: Bass Query
  kind: query
  command: "QAC:BAS"
  params: []
- id: treble_query
  label: Treble Query
  kind: query
  command: "QAC:TRE"
  params: []
- id: balance_query
  label: Balance Query
  kind: query
  command: "QAC:BAL"
  params: []
- id: surround_query
  label: Surround Query
  kind: query
  command: "QAC:SUR"
  params: []
- id: hposition_query
  label: Horizontal Position Query
  kind: query
  command: "QGE:HPO"
  params: []
- id: hsize_query
  label: Horizontal Size Query
  kind: query
  command: "QGE:HSZ"
  params: []
- id: vposition_query
  label: Vertical Position Query
  kind: query
  command: "QGE:VPO"
  params: []
- id: vsize_query
  label: Vertical Size Query
  kind: query
  command: "QGE:VSZ"
  params: []
- id: clock_phase_query
  label: Clock Phase Query
  kind: query
  command: "QGE:CLK"
  params: []
- id: dot_clock_query
  label: Dot Clock Query
  kind: query
  command: "QGE:DCL"
  params: []
- id: pixel_mode_1to1_query
  label: 1:1 Pixel Mode Query
  kind: query
  command: "QGE:DBD"
  params: []
- id: overscan_query
  label: Overscan Query
  kind: query
  command: "QGE:OVS"
  params: []
- id: pos_size_lump_query
  label: Pos./Size Lump Setting Query
  kind: query
  command: "QGE:PSZ"
  params: []
- id: wobbling_query
  label: Wobbling Query
  kind: query
  command: "QSP:WOB"
  params: []
- id: no_activity_power_off_query
  label: No Activity Power Off Query
  kind: query
  command: "QSU:NAO"
  params: []
- id: osd_language_query
  label: OSD Language Query
  kind: query
  command: "QSU:LNG"
  params: []
- id: power_management_mode_query
  label: Power Management Mode Query
  kind: query
  command: "QSU:ECS"
  params: []
- id: no_signal_power_off_query
  label: No Signal Power Off Query
  kind: query
  command: "QSU:AOF"
  params: []
- id: pc_power_management_query
  label: PC Power Management Query
  kind: query
  command: "QSU:DPM"
  params: []
- id: dvi_d1_power_management_query
  label: DVI-D1 Power Management Query
  kind: query
  command: "QSU:D1V"
  params: []
- id: hdmi1_power_management_query
  label: HDMI1 Power Management Query
  kind: query
  command: "QSU:D1H"
  params: []
- id: hdmi2_power_management_query
  label: HDMI2 Power Management Query
  kind: query
  command: "QSU:D2H"
  params: []
- id: digital_link_power_management_query
  label: DIGITAL LINK Power Management Query
  kind: query
  command: "QSU:D1L"
  params: []
- id: power_save_query
  label: Power Save Query
  kind: query
  command: "QSU:ECO"
  params: []
- id: display_orientation_query
  label: Display Orientation Query
  kind: query
  command: "QSU:DOR"
  params: []
- id: menu_position_query
  label: Menu Position Query
  kind: query
  command: "QSU:OPS"
  params: []
- id: menu_display_duration_query
  label: Menu Display Duration Query
  kind: query
  command: "QSU:MDT"
  params: []
- id: menu_transparency_query
  label: Menu Transparency Query
  kind: query
  command: "QSU:MTL"
  params: []
- id: serial_control_query
  label: Serial Control Query
  kind: query
  command: "QCT:SEC"
  params: []
- id: network_setup_query
  label: Network Setup Query
  kind: query
  command: "QSU:NET"
  params: []
- id: network_setup_port_query
  label: Network Setup Port Number Query
  kind: query
  command: "QSU:LCP"
  params: []
- id: digital_link_mode_query
  label: DIGITAL LINK Mode Query
  kind: query
  command: "QSU:DLM"
  params: []
- id: display_name_query
  label: Change Display Name Query
  kind: query
  command: "QSU:LDN"
  params: []
- id: amx_dd_query
  label: AMX D.D. Query
  kind: query
  command: "QSU:ADD"
  params: []
- id: crestron_connected_query
  label: Crestron Connected Query
  kind: query
  command: "QSU:CRV"
  params: []
- id: extron_xtp_query
  label: Extron XTP Query
  kind: query
  command: "QSU:EXP"
  params: []
- id: component_rgb_in_select_query
  label: Component/RGB-IN Select Query
  kind: query
  command: "QSU:CMP"
  params: []
- id: yuv_rgb_in_select_query
  label: YUV/RGB-IN Select Query
  kind: query
  command: "QSU:DYR"
  params: []
- id: yc_filter_3d_query
  label: 3D Y/C Filter Query
  kind: query
  command: "QSG:YCS"
  params: []
- id: color_system_query
  label: Color System Query
  kind: query
  command: "QSG:COS"
  params: []
- id: sync_signal_setting_query
  label: Sync Signal Setting Query
  kind: query
  command: "QSG:SNC"
  params: []
- id: cinema_reality_query
  label: Cinema Reality 3:2 Pull Down Query
  kind: query
  command: "QSG:DCR"
  params: []
- id: xga_mode_query
  label: XGA Mode Query
  kind: query
  command: "QSG:XGA"
  params: []
- id: noise_reduction_query
  label: Noise Reduction Query
  kind: query
  command: "QSG:NRS"
  params: []
- id: mpeg_noise_reduction_query
  label: MPEG Noise Reduction Query
  kind: query
  command: "QSG:MNR"
  params: []
- id: signal_range_query
  label: Signal Range Query
  kind: query
  command: "QSG:HRC"
  params: []
- id: input_level_query
  label: Input Level Query
  kind: query
  command: "QWB:ILV"
  params: []
- id: dynamic_backlight_control_query
  label: Dynamic Backlight Control Query
  kind: query
  command: "QSG:DBC"
  params: []
- id: screensaver_on_off_query
  label: Screensaver ON/OFF Query
  kind: query
  command: "QSP:SCR"
  params: []
- id: screensaver_mode_query
  label: Screensaver Mode Query
  kind: query
  command: "QSC:MOD"
  params: []
- id: interval_screensaver_query
  label: Interval Screensaver Query
  kind: query
  command: "QSC:INT"
  params: []
- id: time_designation_screensaver_query
  label: Time Designation Screensaver Query
  kind: query
  command: "QSC:TIM"
  params: []
- id: standby_after_screensaver_query
  label: Standby After Screensaver Query
  kind: query
  command: "QSC:AOF"
  params: []
- id: input_label_query
  label: Input Label Query
  kind: query
  command: "QSU:ILA"
  params: []
- id: function_group_query
  label: Function Group Query
  kind: query
  command: "QSP:KGR"
  params: []
- id: function_button_query
  label: Function Button Settings Query
  kind: query
  command: "QSP:KFN"
  params:
    - name: key
      type: integer
      description: 1-6
- id: function_guide_query
  label: Function Guide Settings Query
  kind: query
  command: "QSP:KFG"
  params: []
- id: multi_display_setup_detail_query
  label: Multi Display Setup Detail Query
  kind: query
  command: "QDC:EXP"
  params: []
- id: timer_program_query
  label: Timer Program Query
  kind: query
  command: "QIM:PRG"
  params:
    - name: prog
      type: integer
      description: 01-20 program number
- id: day_time_query
  label: Day Time Query
  kind: query
  command: "QIM:DAT"
  params: []
- id: usb_media_player_query
  label: USB Media Player Query
  kind: query
  command: "QUS:UMP"
  params: []
- id: resume_play_query
  label: Resume Play Query
  kind: query
  command: "QUS:RSP"
  params: []
- id: slide_show_duration_query
  label: Slide Show Duration Query
  kind: query
  command: "QUS:SSD"
  params: []
- id: osd_on_off_query
  label: On Screen Display Query
  kind: query
  command: "QSP:OSD"
  params: []
- id: initial_input_query
  label: Initial Input Query
  kind: query
  command: "QSP:IIN"
  params: []
- id: initial_vol_level_query
  label: Initial VOL Level Query
  kind: query
  command: "QSP:IVL"
  params: []
- id: max_vol_level_query
  label: Maximum VOL Level Query
  kind: query
  command: "QSP:MVL"
  params: []
- id: input_lock_query
  label: Input Lock Query
  kind: query
  command: "QSP:INL"
  params: []
- id: button_lock_query
  label: Button Lock Query
  kind: query
  command: "QSP:BTL"
  params: []
- id: controller_user_level_query
  label: Controller User Level Query
  kind: query
  command: "QSP:RCM"
  params: []
- id: pc_auto_setting_query
  label: PC Auto Setting Query
  kind: query
  command: "QSP:PAS"
  params: []
- id: offtimer_function_query
  label: Off Timer Function Query
  kind: query
  command: "QSP:OFT"
  params: []
- id: initial_startup_query
  label: Initial Startup Query
  kind: query
  command: "QSP:ISU"
  params: []
- id: startup_logo_query
  label: Startup Logo Query
  kind: query
  command: "QSP:LOG"
  params: []
- id: serial_id_function_query
  label: Serial ID Function Query
  kind: query
  command: "QID:SID"
  params: []
- id: serial_id_setup_query
  label: Serial ID Setup Query
  kind: query
  command: "QIF"
  params: []
- id: serial_response_id_all_query
  label: Serial Response (ID All) Query
  kind: query
  command: "QCT:RIA"
  params: []
- id: serial_daisy_chain_position_query
  label: Serial Daisy Chain Position Query
  kind: query
  command: "QCT:DCP"
  params: []
- id: lan_control_protocol_query
  label: LAN Control Protocol Query
  kind: query
  command: "QSP:LPN"
  params: []
- id: power_on_screen_delay_query
  label: Power ON Screen Delay Query
  kind: query
  command: "QSP:POD"
  params: []
- id: clock_display_query
  label: Clock Display Query
  kind: query
  command: "QSP:CLK"
  params: []
- id: nap_query
  label: Power On Message No Activity Power Off Query
  kind: query
  command: "QSP:NAP"
  params: []
- id: power_message_query
  label: Power On Message Power Management Query
  kind: query
  command: "QSP:PMM"
  params: []
- id: input_search_query
  label: Input Search Query
  kind: query
  command: "QSH:FNC"
  params: []
- id: first_search_input_query
  label: 1st Search Input Query
  kind: query
  command: "QSH:PRI"
  params: []
- id: second_search_input_query
  label: 2nd Search Input Query
  kind: query
  command: "QSH:SCI"
  params: []
- id: backup_input_mode_query
  label: Backup Input Mode Query
  kind: query
  command: "QBI"
  params: []
- id: changing_mode_query
  label: Changing Mode Query
  kind: query
  command: "QBI:CHM"
  params: []
- id: audio_input_select_current_query
  label: Audio Input Select (Current) Query
  kind: query
  command: "QAI"
  params: []
- id: audio_input_select_each_query
  label: Audio Input Select (Each Input) Query
  kind: query
  command: "QAI:V***"
  params:
    - name: input
      type: string
      description: HM1 / HM2 / DL1 / DV1 / PC1 / YP1 / VD1
- id: no_signal_warning_setting_query
  label: No Signal Warning Setting Query
  kind: query
  command: "QIT:NSW"
  params: []
- id: no_signal_warning_timing_query
  label: No Signal Warning Timing Query
  kind: query
  command: "QIT:SWT"
  params: []
- id: no_signal_error_setting_query
  label: No Signal Error Setting Query
  kind: query
  command: "QIT:NSE"
  params: []
- id: no_signal_error_timing_query
  label: No Signal Error Timing Query
  kind: query
  command: "QIT:SET"
  params: []
- id: temperature_warning_setting_query
  label: Temperature Warning Setting Query
  kind: query
  command: "QIT:TPW"
  params: []
- id: temperature_warning_status_query
  label: Temperature Warning Status Query
  kind: query
  command: "QST:TO"
  params: []
- id: digital_zoom_query
  label: Digital Zoom Query
  kind: query
  command: "QDZ"
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: feedback states are encoded in the reply strings of each query
# command above. Each query action returns a parameter string the spec reader
# parses (e.g. QPW returns "0"=Standby / "1"=Power ON, QAM returns "0"/"1").
# No formal enum table beyond per-command notes; reuse per-action reply notes.
```

## Variables
```yaml
# UNRESOLVED: settable scalar parameters are encoded as parameterized actions
# in the Actions section (e.g. VPC:PIC*** for contrast). No separate Variables
# table in source.
```

## Events
```yaml
- id: qst_nsw
  type: notification
  description: No Signal Warning notification (auto-sent on display when enabled)
  command: "QST:NSW"
- id: qst_nse
  type: notification
  description: No Signal Error notification (auto-sent on display when enabled)
  command: "QST:NSE"
- id: qst_to
  type: notification
  description: Temperature warning notification (auto-sent on display when enabled)
  command: "QST:TO"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlock procedures,
# or required power-on sequencing beyond standard power/standby commands.
```

## Notes
- Commands are framed as `STX C1 C2 C3 [:P1 P2 P3 ...] ETX` (STX=0x02, ETX=0x03). When parameters are absent, the colon is omitted.
- Incorrect commands receive an `ER401` reply.
- When sending multiple commands, wait for the reply to the previous one before sending the next.
- In standby (power off), the display only responds to `PON` and `QPW`.
- Serial-ID addressing: prefix with `STX AD94;RAD:<NUM1><NUM2><NUM3>;` and the unit only replies if Display ID matches Serial ID. Display ID 0 and Serial ID 000 are wildcard. Set [Options] > [Serial ID function] to ON to use.
- Daisy-chain pin wiring uses a straight cable with pins ②–⑧ hard-wired. Set [Options] > [Serial daisy chain position] (TOP/DEF/END).
- YFB200 with DIGITAL LINK cannot receive replies longer than 31 characters (LF80 only).
- DIGITAL LINK / YFB200 / Extron XTP commands apply to LF80 only.
- LAN control uses a separate protocol documented in `LAN_Protocol_exp.pdf`; see the `transport` block unresolved note.
- Cable: straight.

<!-- UNRESOLVED: LAN TCP port for Protocol1/Protocol2 (LP1/LP2) not in this source. Password/auth model for LAN path not in this source. -->

## Provenance

```yaml
source_domains:
  - docs.connect.panasonic.com
  - ptzprotocols.com
  - mediarealm.com.au
  - github.com
  - help.na.panasonic.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LF8_80_SerialCommandList.pdf
  - "https://ptzprotocols.com/1%20TXB%20Protocols/TXB-Panasonic/Panasonic%20Camera%20Protocol_4.0.pdf"
  - https://www.mediarealm.com.au/articles/panasonic-projector-commands/
  - https://github.com/ssjoholm/panasonic-cn-cnt/blob/main/Panasonic-CN-CNT-Protocol-v1.md
  - https://help.na.panasonic.com/manuals/
retrieved_at: 2026-06-11T22:33:19.002Z
last_checked_at: 2026-06-22T14:12:25.202Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-22T14:12:25.202Z
matched_actions: 280
action_count: 280
confidence: medium
summary: "All 280 spec commands matched verbatim against source command table; transport parameters confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LAN port number not stated in source (LAN protocol doc referenced separately). Cable pinout for LF80 YFB200 path not fully specified."
- "TCP port for LAN control not stated in this source"
- "feedback states are encoded in the reply strings of each query"
- "settable scalar parameters are encoded as parameterized actions"
- "no explicit multi-step macro sequences documented in source"
- "source does not document safety warnings, interlock procedures,"
- "LAN TCP port for Protocol1/Protocol2 (LP1/LP2) not in this source. Password/auth model for LAN path not in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
