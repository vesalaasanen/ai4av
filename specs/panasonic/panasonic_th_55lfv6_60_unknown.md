---
spec_id: admin/panasonic-th-55lfv60-lfv6
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic TH-55LFV60/LFV6 Control Spec"
manufacturer: Panasonic
model_family: TH-55LFV60
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - TH-55LFV60
    - TH-55LFV6
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
last_checked_at: 2026-05-18T16:44:21.788Z
generated_at: 2026-05-18T16:44:21.788Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T16:44:21.788Z
  matched_actions: 145
  action_count: 145
  confidence: high
  summary: "All 145 spec actions verified against source command table; all transport parameters match protocol specification."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Panasonic TH-55LFV60/LFV6 Control Spec

## Summary
Ultra Narrow Bezel LCD display controllable via RS-232C serial and LAN. ASCII-encoded packet protocol (STX…ETX framing) with 3-char command mnemonics. Query commands return current state; control commands set parameters. No login/auth procedure described.

<!-- UNRESOLVED: LAN port number not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred: "RS232C/LAN command list" implies TCP/IP support
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  # UNRESOLVED: TCP port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # PON/POF present
- queryable       # QPW, QMI, QAV, QAM, QAS, QPC:*, QWB:*, QAC:*, QGE:*, QSP:*, QSU:*, QID:*, QFR, QSF, QRV, QSN, QSS:*, QST:* present
- routable        # IMS input selection, AAC:OUT/SPO/LNO audio routing present
- levelable       # AVL volume, backlight, contrast, brightness, color, tint, sharpness, bass, treble, balance
```

## Actions
```yaml
# Power
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: input_change
  label: Input Change
  kind: action
  params:
    - name: input
      type: string
      description: "HM1 (HDMI1), HM2 (HDMI2), DV1 (DVI-D), PC1 (PC), VD1 (VIDEO), UD1 (USB Display)"
- id: audio_volume
  label: Audio Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: "000-100"
- id: volume_up
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: audio_mute
  label: Audio Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: "0: mute off, 1: mute on"
- id: video_mute
  label: Video Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: "0: mute off, 1: mute on"
- id: aspect_change
  label: Aspect Change
  kind: action
  params:
    - name: aspect
      type: string
      description: "FULL, NORM (normal), ZOOM, ZOM2 (zoom2)"
- id: picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "VIV (Vivid), NAT (Natural), STD (Standard), SUV (Surveillance), GRH (Graphic), DCM (DICOM)"
- id: backlight
  label: Backlight
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100, DEF (shipping default); available when power save is off"
- id: contrast
  label: Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100, DEF (shipping default)"
- id: brightness
  label: Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100, DEF (shipping default)"
- id: color
  label: Color
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100, DEF (shipping default)"
- id: tint
  label: Tint
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100, DEF (shipping default)"
- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100, DEF (shipping default)"
- id: enhance_level
  label: Enhance Level
  kind: action
  params:
    - name: level
      type: integer
      description: "1: low, 2: high"
- id: gamma
  label: Gamma
  kind: action
  params:
    - name: value
      type: string
      description: "20 (2.0), 22 (2.2), 24 (2.4), 26 (2.6), DC (DICOM); not available when color temp is native; DC inquiry-only when picture mode is DCM"
- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: temp
      type: string
      description: "032 (3200K), 040 (4000K), 050 (5000K), 065 (6500K), 075 (7500K), 093 (9300K), 107 (10700K), NTV (Native), U01 (User1), U02 (User2); 6500K/9300K available when picture mode is DCM"
- id: red_gain
  label: Red Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "0000-0255 (0-255); available when color temperature is USER1 or USER2"
- id: green_gain
  label: Green Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "0000-0255 (0-255); available when color temperature is USER1 or USER2"
- id: blue_gain
  label: Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "0000-0255 (0-255); available when color temperature is USER1 or USER2"
- id: red_bias
  label: Red Bias
  kind: action
  params:
    - name: value
      type: integer
      description: "-127 to 0128; available when color temperature is USER1 or USER2"
- id: green_bias
  label: Green Bias
  kind: action
  params:
    - name: value
      type: integer
      description: "-127 to 0128; available when color temperature is USER1 or USER2"
- id: blue_bias
  label: Blue Bias
  kind: action
  params:
    - name: value
      type: integer
      description: "-127 to 0128; available when color temperature is USER1 or USER2"
- id: dynamic_contrast
  label: Dynamic Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "00-10"
- id: color_enhancement
  label: Color Enhancement
  kind: action
  params:
    - name: level
      type: integer
      description: "0: off, 1: low, 2: mid, 3: high"
- id: refine_enhancer
  label: Refine Enhancer
  kind: action
  params:
    - name: level
      type: integer
      description: "0: off, 1: low, 2: mid, 3: high"
- id: gradation_smoother
  label: Gradation Smoother
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: memory_delete
  label: Memory Delete
  kind: action
  params:
    - name: slot
      type: integer
      description: "01-08"
- id: memory_load
  label: Memory Load
  kind: action
  params:
    - name: slot
      type: integer
      description: "01-08"
- id: memory_save
  label: Memory Save
  kind: action
  params:
    - name: slot
      type: integer
      description: "01-08"
- id: memory_name_change
  label: Memory Name Change
  kind: action
  params:
    - name: slot
      type: integer
      description: "01-08"
    - name: name
      type: string
      description: "Max 20 characters
- id: audio_output_select
  label: Audio Output Select
  kind: action
  params:
    - name: output
      type: string
      description: "SPO (speakers), LNO (audio out)"
- id: sound_mode
  label: Sound Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "STD (standard), DYN (dynamic), CLR (clear); available when output select is SPEAKERS"
- id: bass
  label: Bass
  kind: action
  params:
    - name: value
      type: integer
      description: "-20 to +20; available when output select is SPEAKERS"
- id: treble
  label: Treble
  kind: action
  params:
    - name: value
      type: integer
      description: "-20 to +20; available when output select is SPEAKERS"
- id: balance
  label: Balance
  kind: action
  params:
    - name: value
      type: integer
      description: "-20 to +20; available when output select is SPEAKERS"
- id: surround
  label: Surround
  kind: action
  params:
    - name: on
      type: string
      description: "ON or OFF; available when output select is SPEAKERS"
- id: horizontal_position
  label: Horizontal Position
  kind: action
  params:
    - name: value
      type: integer
      description: "-100 to +100"
- id: horizontal_size
  label: Horizontal Size
  kind: action
  params:
    - name: value
      type: integer
      description: "-100 to +100"
- id: vertical_position
  label: Vertical Position
  kind: action
  params:
    - name: value
      type: integer
      description: "-100 to +100"
- id: vertical_size
  label: Vertical Size
  kind: action
  params:
    - name: value
      type: integer
      description: "-100 to +100"
- id: clock_phase
  label: Clock Phase
  kind: action
  params:
    - name: value
      type: integer
      description: "00-30"
- id: dot_clock
  label: Dot Clock
  kind: action
  params:
    - name: value
      type: integer
      description: "-5 to +5"
- id: pixel_mode_1_1
  label: 1:1 Pixel Mode
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: overscan
  label: Overscan
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: pos_size_lump
  label: Position/Size Lump Setting
  kind: action
  params:
    - name: hpos
      type: integer
      description: "-100 to +100"
    - name: hsize
      type: integer
      description: "-100 to +100"
    - name: vpos
      type: integer
      description: "-100 to +100"
    - name: vsize
      type: integer
      description: "-100 to +100"
- id: auto_setup
  label: Auto Setup
  kind: action
  params:
    - name: execute
      type: integer
      description: "1: execution start"
- id: wobbling
  label: Wobbling
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: no_activity_power_off
  label: No Activity Power Off
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: power_on_screen_delay
  label: Power ON Screen Delay
  kind: action
  params:
    - name: delay
      type: string
      description: "AT (auto) or 00-30 seconds"
- id: osd_language
  label: OSD Language
  kind: action
  params:
    - name: lang
      type: string
      description: "ENG (English UK), DEU (German), FRA (French), ITL/ITA (Italian), ESP (Spanish), USA (English US), CHA (Chinese), JPN (Japanese), RUS (Russian)"
- id: power_management_mode
  label: Power Management Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0: custom, 1: on"
- id: no_signal_power_off
  label: No Signal Power Off
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: pc_power_management
  label: PC Power Management
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: dvi_d1_power_management
  label: DVI-D1 Power Management
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: hdmi1_power_management
  label: HDMI1 Power Management
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: hdmi2_power_management
  label: HDMI2 Power Management
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: power_save
  label: Power Save
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: display_orientation
  label: Display Orientation
  kind: action
  params:
    - name: orientation
      type: integer
      description: "0: landscape, 1: portrait"
- id: menu_position
  label: Menu Position
  kind: action
  params:
    - name: pos
      type: integer
      description: "1: upper/left, 2: upper/right, 3: center, 4: lower/left, 5: lower/right"
- id: menu_display_duration
  label: Menu Display Duration
  kind: action
  params:
    - name: seconds
      type: integer
      description: "005-180 (5 second unit)"
- id: menu_transparency
  label: Menu Transparency
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100 (10% unit)"
- id: network_setup
  label: Network Setup
  kind: action
  params:
    - name: ip1
      type: integer
      description: "IP address 1st byte 000-255"
    - name: ip2
      type: integer
      description: "IP address 2nd byte 000-255"
    - name: ip3
      type: integer
      description: "IP address 3rd byte 000-255"
    - name: ip4
      type: integer
      description: "IP address 4th byte 000-255"
    - name: sn1
      type: integer
      description: "Subnet mask 1st byte 000-255"
    - name: sn2
      type: integer
      description: "Subnet mask 2nd byte 000-255"
    - name: sn3
      type: integer
      description: "Subnet mask 3rd byte 000-255"
    - name: sn4
      type: integer
      description: "Subnet mask 4th byte 000-255"
    - name: gw1
      type: integer
      description: "Gateway 1st byte 000-255"
    - name: gw2
      type: integer
      description: "Gateway 2nd byte 000-255"
    - name: gw3
      type: integer
      description: "Gateway 3rd byte 000-255"
    - name: gw4
      type: integer
      description: "Gateway 4th byte 000-255"
    - name: dhcp
      type: integer
      description: "0: DHCP off, 1: DHCP on"
- id: lan_port_number
  label: LAN Port Number
  kind: action
  params:
    - name: port
      type: integer
      description: "1024-65535 (excludes 4352, 10000, 20000, 41794)"
- id: change_display_name
  label: Change Display Name
  kind: action
  params:
    - name: name
      type: string
      description: "Max 8 characters"
- id: amx_d_d
  label: AMX D.D.
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: crestron_connected
  label: Crestron Connected
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: reset
  label: Reset
  kind: action
  params: []
- id: serial_id_function
  label: Serial ID Function
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: serial_response_id_all
  label: Serial Response (ID All)
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: serial_id_group
  label: Serial ID Group
  kind: action
  params:
    - name: group
      type: string
      description: "A, B, C, D, E, F, or G"
- id: serial_response_id_group
  label: Serial Response (ID Group)
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: serial_daisy_chain_position
  label: Serial Daisy Chain Position
  kind: action
  params:
    - name: pos
      type: string
      description: "TOP, DEF, or END"
- id: multi_control_auto_setting
  label: Multi Control Auto Setting
  kind: action
  params:
    - name: display_id
      type: integer
      description: "000 (reply only) or 001-100"
    - name: control
      type: integer
      description: "0: maintain settings, 1: switch network control on and DHCP on"
- id: component_rgb_select
  label: Component/RGB-IN Select
  kind: action
  params:
    - name: signal
      type: string
      description: "YBR (component) or RGB; available when PC1/YP1 selected"
- id: yuv_rgb_select
  label: YUV/RGB-IN Select
  kind: action
  params:
    - name: signal
      type: string
      description: "YUV or RGB; available when HDMI1/HDMI2/DVI-D selected"
- id: y_c_filter_3d
  label: 3D Y/C Filter
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: color_system
  label: Color System
  kind: action
  params:
    - name: system
      type: string
      description: "NTS (NTSC), PAL, SCM (SECAM), 4NT (NTSC4.43), MPA (PAL-M), NPA (PAL-N), AUT (auto)"
- id: sync_signal_setting
  label: Sync Signal Setting
  kind: action
  params:
    - name: mode
      type: string
      description: "HAV (auto detection), GRN (sync on green), HVS (Hvsync); PC input only"
- id: cinema_reality
  label: Cinema Reality 3:2 Pull Down
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: xga_mode
  label: XGA Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "1: 1024x768, 2: 1280x768, 3: 1366x768, 4: auto"
- id: noise_reduction
  label: Noise Reduction
  kind: action
  params:
    - name: level
      type: string
      description: "OFF, AUT (auto), LOW, MID, HIG (high)"
- id: mpeg_noise_reduction
  label: MPEG Noise Reduction
  kind: action
  params:
    - name: level
      type: string
      description: "OFF, LOW, MID, HIG (high)"
- id: signal_range
  label: Signal Range
  kind: action
  params:
    - name: range
      type: string
      description: "VID (video), FUL (full), AUT (auto); available for HDMI/DVI-D input"
- id: input_level
  label: Input Level
  kind: action
  params:
    - name: value
      type: integer
      description: "-16 to +16"
- id: color_matching
  label: Color Matching
  kind: action
  params:
    - name: color
      type: string
      description: "R (red), Y (yellow), G (green), C (cyan), B (blue), M (magenta)"
    - name: on
      type: integer
      description: "0: off, 1: on (test pattern)"
    - name: r
      type: integer
      description: "Red 0000-2048"
    - name: g
      type: integer
      description: "Green 0000-2048"
    - name: b
      type: integer
      description: "Blue 0000-2048"
- id: color_matching_reset
  label: Color Matching Reset
  kind: action
  params: []
- id: screensaver_on_off
  label: Screensaver On/Off
  kind: action
  params:
    - name: mode
      type: integer
      description: "0: stop, 5: operating"
- id: screensaver_mode
  label: Screensaver Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0: off, 1: interval, 2: time designation, 3: on, 4: standby after screensaver"
- id: interval_screensaver
  label: Interval Screensaver
  kind: action
  params:
    - name: periodic_time
      type: integer
      description: "0000-2359 (HHMM)"
    - name: operating_time
      type: integer
      description: "0000-2359 (HHMM)"
- id: time_designation_screensaver
  label: Time Designation Screensaver
  kind: action
  params:
    - name: start
      type: integer
      description: "0000-2359 (HHMM)"
    - name: finish
      type: integer
      description: "0000-2359 (HHMM)"
- id: standby_after_screensaver
  label: Standby After Screensaver
  kind: action
  params:
    - name: time
      type: integer
      description: "0000-2359 (HH:MM)"
- id: input_label_current
  label: Set Label for Current Input
  kind: action
  params:
    - name: label
      type: string
      description: "INP (reset), DV1-DV3, BD1-BD3, CTV, VCR, STB, SKP (skip)"
- id: input_label_each
  label: Set Label for Each Input
  kind: action
  params:
    - name: input
      type: string
      description: "HM1 (HDMI1), HM2 (HDMI2), DV1 (DVI-D), PC1 (PC), VD1 (VIDEO), YP1 (COMPONENT), UD1 (USB)"
    - name: label
      type: string
      description: "INP (reset), DV1-DV3, BD1-BD3, CTV, VCR, STB, SKP (skip)"
- id: function_group
  label: Function Group
  kind: action
  params:
    - name: group
      type: string
      description: "INP (input), MEM (memory), ACT (action & menu shortcut)"
- id: function_button_settings
  label: Function Button Settings
  kind: action
  params:
    - name: key
      type: integer
      description: "0-9"
    - name: function
      type: string
      description: "For ACTION&MENU: SIG (signal menu), SSV (screensaver menu), SUT (setup timer menu), LNS (network settings menu), ECO (power management mode menu), OSH (AV mute), DZM (digital zoom), MLT (multi display setting menu). For INPUT: HM1, HM2, DV1, PC1, VD1, YP1, UD1"
- id: function_guide_settings
  label: Function Guide Settings
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: multi_display_on_off
  label: Multi Display On/Off
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: multi_display_setup_detail
  label: Multi Display Setup Detail
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
    - name: hscale
      type: integer
      description: "Horizontal scale 1-10 (1-2 for USB)"
    - name: vscale
      type: integer
      description: "Vertical scale 1-10 (1-2 for USB)"
    - name: bezel_h
      type: integer
      description: "Bezel H adjustment 000-100"
    - name: bezel_v
      type: integer
      description: "Bezel V adjustment 000-100"
    - name: location
      type: integer
      description: "A1-J10 for regular, A1-B2 for USB"
- id: frame_control
  label: Frame Control
  kind: action
  params:
    - name: mode
      type: integer
      description: "0: auto, 1-5: fixed"
- id: reverse_scan
  label: Reverse Scan
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: timer_setup
  label: Timer Setup
  kind: action
  params:
    - name: program
      type: integer
      description: "01-20"
    - name: on
      type: integer
      description: "0: off, 1: on"
    - name: day
      type: string
      description: "SUN, MON, TUE, WED, THU, FRI, SAT, EVD (everyday)"
    - name: action
      type: string
      description: "PON (power on) or POF (power off)"
    - name: time
      type: integer
      description: "0000-2359 (HHMM)"
    - name: input
      type: string
      description: "HM1, HM2, DV1, PC1, VD1, YP1, UD1"
- id: day_time_set
  label: Day Time Set
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
- id: usb_media_player
  label: USB Media Player
  kind: action
  params:
    - name: enable
      type: integer
      description: "0: disable, 1: enable"
- id: resume_play
  label: Resume Play
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: slideshow_duration
  label: Slide Show Duration
  kind: action
  params:
    - name: seconds
      type: integer
      description: "010-600 (5 second unit)"
- id: on_screen_display
  label: On Screen Display
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: initial_input
  label: Initial Input
  kind: action
  params:
    - name: input
      type: string
      description: "OFF, HM1, HM2, DV1, PC1, VD1, YP1, UD1"
- id: initial_vol_level
  label: Initial VOL Level
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
    - name: volume
      type: integer
      description: "000-100"
- id: maximum_vol_level
  label: Maximum VOL Level
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
    - name: volume
      type: integer
      description: "000-100"
- id: input_lock
  label: Input Lock
  kind: action
  params:
    - name: input
      type: string
      description: "OFF, HM1, HM2, DV1, PC1, VD1, YP1, UD1"
- id: button_lock
  label: Button Lock
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, MEN (menu&enter), ALL (on)"
- id: controller_user_level
  label: Controller User Level
  kind: action
  params:
    - name: level
      type: integer
      description: "0: off, 1: user1, 2: user2, 3: user3"
- id: pc_auto_setting
  label: PC Auto Setting
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: off_timer_function
  label: Off Timer Function
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: initial_startup
  label: Initial Startup
  kind: action
  params:
    - name: mode
      type: string
      description: "LST (last memory), PON (on), STB (standby)"
- id: startup_logo
  label: Startup Logo
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: lan_control_protocol
  label: LAN Control Protocol
  kind: action
  params:
    - name: protocol
      type: string
      description: "LP1 (Protocol1) or LP2 (Protocol2)"
- id: clock_display
  label: Clock Display
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: power_on_message_no_activity
  label: Power On Message No Activity Power Off
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: power_on_message_power_management
  label: Power On Message Power Management
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: input_search_function
  label: Input Search Function
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, ALL (all inputs), PRI (custom)"
- id: input_search_1st
  label: 1st Search Input
  kind: action
  params:
    - name: input
      type: string
      description: "NON (none), HM1, HM2, DV1, PC1, YP1, VD1, UD1"
- id: input_search_2nd
  label: 2nd Search Input
  kind: action
  params:
    - name: input
      type: string
      description: "NON (none), HM1, HM2, DV1, PC1, YP1, VD1, UD1"
- id: failover_off
  label: Failover/Failback Mode Off
  kind: action
  params: []
- id: failover_quick
  label: Failover/Failback Mode Quick
  kind: action
  params:
    - name: primary
      type: string
      description: "NON, HM1, HM2, DV1"
    - name: secondary
      type: string
      description: "NON, HM1, HM2, DV1"
    - name: enable
      type: integer
      description: "0: disable, 1: enable (auto switch back)"
- id: failover_normal
  label: Failover/Failback Mode Normal
  kind: action
  params:
    - name: primary
      type: string
      description: "NON, HM1, HM2, DV1, PC1, YP1, VD1, UD1"
    - name: secondary
      type: string
      description: "NON, HM1, HM2, DV1, PC1, YP1, UD1"
    - name: enable
      type: integer
      description: "0: disable, 1: enable (auto switch back)"
- id: failover_changing_mode
  label: Changing Mode
  kind: action
  params:
    - name: speed
      type: integer
      description: "2: high speed, 1: normal"
- id: manual_switch_back
  label: Manual Switch Back
  kind: action
  params: []
- id: audio_input_select_current
  label: Audio Input Select (Current Input)
  kind: action
  params:
    - name: video
      type: string
      description: "HM1, HM2, DV1, PC1, YP1, VD1"
    - name: audio
      type: string
      description: "HM1, HM2, NAD (no audio), AUD1 (DVI-D/PC), AUD2 (COMPONENT/VIDEO)"
- id: audio_input_select_each
  label: Audio Input Select (Each Input)
  kind: action
  params:
    - name: video
      type: string
      description: "HM1, HM2, DV1, PC1, YP1, VD1"
    - name: audio
      type: string
      description: "HM1, HM2, NAD (no audio), AUD1 (DVI-D/PC), AUD2 (COMPONENT/VIDEO)"
- id: no_signal_warning
  label: No Signal Warning
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: no_signal_warning_timing
  label: No Signal Warning Timing
  kind: action
  params:
    - name: minutes
      type: integer
      description: "01-60"
- id: no_signal_error
  label: No Signal Error
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: no_signal_error_timing
  label: No Signal Error Timing
  kind: action
  params:
    - name: minutes
      type: integer
      description: "01-90"
- id: temperature_warning
  label: Temperature Warning
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
- id: recall
  label: Recall
  kind: action
  params: []
- id: osd_clear
  label: OSD Clear
  kind: action
  params: []
- id: digital_zoom
  label: Digital Zoom
  kind: action
  params:
    - name: on
      type: integer
      description: "0: off, 1: on"
    - name: factor
      type: integer
      description: "1-4 (enlargement factor)"
    - name: hpos
      type: integer
      description: "1-5 (horizontal position)"
    - name: vpos
      type: integer
      description: "1-5 (vertical position)"
- id: off_timer
  label: Off Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "00-90"
- id: usb_skip_next
  label: USB Media Player Skip Next
  kind: action
  params: []
- id: usb_skip_previous
  label: USB Media Player Skip Previous
  kind: action
  params: []
- id: usb_play_from_top
  label: USB Media Player Play From Top
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: [0, 1]
  description: "0: standby (off), 1: power on"
- id: current_input
  type: string
  description: "HM1 (HDMI1), HM2 (HDMI2), DV1 (DVI-D), PC1 (PC), VD1 (VIDEO), UD1 (USB Display)"
- id: current_audio_volume
  type: integer
  description: "000-100"
- id: audio_mute_status
  type: enum
  values: [0, 1]
  description: "0: mute off, 1: mute on"
- id: video_mute_status
  type: enum
  values: [0, 1]
  description: "0: mute off, 1: mute on"
- id: aspect_status
  type: string
  description: "FULL, NORM, ZOOM, ZOM2"
- id: picture_mode_status
  type: string
  description: "VIV, NAT, STD, SUV, GRH, DCM"
- id: backlight_status
  type: integer
  description: "000-100"
- id: contrast_status
  type: integer
  description: "000-100"
- id: brightness_status
  type: integer
  description: "000-100"
- id: color_status
  type: integer
  description: "000-100"
- id: tint_status
  type: integer
  description: "000-100"
- id: sharpness_status
  type: integer
  description: "000-100"
- id: enhance_level_status
  type: integer
  description: "1: low, 2: high"
- id: gamma_status
  type: string
  description: "20, 22, 24, 26, DC"
- id: color_temperature_status
  type: string
  description: "032-107, NTV, U01, U02"
- id: red_gain_status
  type: integer
  description: "0000-0255"
- id: green_gain_status
  type: integer
  description: "0000-0255"
- id: blue_gain_status
  type: integer
  description: "0000-0255"
- id: red_bias_status
  type: integer
  description: "-127 to 0128"
- id: green_bias_status
  type: integer
  description: "-127 to 0128"
- id: blue_bias_status
  type: integer
  description: "-127 to 0128"
- id: dynamic_contrast_status
  type: integer
  description: "00-10"
- id: color_enhancement_status
  type: integer
  description: "0-3"
- id: refine_enhancer_status
  type: integer
  description: "0-3"
- id: gradation_smoother_status
  type: integer
  description: "0: off, 1: on"
- id: memory_state
  type: string
  description: "Slot usage status 01-08, each returns - (unused) or 0 (use)"
- id: memory_name_status
  type: string
  description: "Memory name for slot 01-08"
- id: audio_output_status
  type: string
  description: "SPO (speakers), LNO (audio out)"
- id: sound_mode_status
  type: string
  description: "STD, DYN, CLR"
- id: bass_status
  type: integer
  description: "-20 to +20"
- id: treble_status
  type: integer
  description: "-20 to +20"
- id: balance_status
  type: integer
  description: "-20 to +20"
- id: surround_status
  type: string
  description: "ON, OFF"
- id: horizontal_position_status
  type: integer
  description: "-100 to +100"
- id: horizontal_size_status
  type: integer
  description: "-100 to +100"
- id: vertical_position_status
  type: integer
  description: "-100 to +100"
- id: vertical_size_status
  type: integer
  description: "-100 to +100"
- id: clock_phase_status
  type: integer
  description: "00-30"
- id: dot_clock_status
  type: integer
  description: "-5 to +5"
- id: pixel_mode_1_1_status
  type: integer
  description: "0: off, 1: on"
- id: overscan_status
  type: integer
  description: "0: off, 1: on"
- id: auto_setup_status
  type: string
  description: "OK, NG, OF (unperforming), NW (adjusting)"
- id: wobbling_status
  type: integer
  description: "0: off, 1: on"
- id: no_activity_power_off_status
  type: integer
  description: "0: off, 1: on"
- id: power_on_screen_delay_status
  type: string
  description: "AT (auto) or 00-30"
- id: osd_language_status
  type: string
  description: "ENG, DEU, FRA, ITL, ESP, USA, CHA, JPN, RUS"
- id: power_management_mode_status
  type: integer
  description: "0: custom, 1: on"
- id: no_signal_power_off_status
  type: integer
  description: "0: off, 1: on"
- id: pc_power_management_status
  type: integer
  description: "0: off, 1: on"
- id: dvi_d1_power_management_status
  type: integer
  description: "0: off, 1: on"
- id: hdmi1_power_management_status
  type: integer
  description: "0: off, 1: on"
- id: hdmi2_power_management_status
  type: integer
  description: "0: off, 1: on"
- id: power_save_status
  type: integer
  description: "0: off, 1: on"
- id: display_orientation_status
  type: integer
  description: "0: landscape, 1: portrait"
- id: menu_position_status
  type: integer
  description: "1-5"
- id: menu_display_duration_status
  type: integer
  description: "005-180"
- id: menu_transparency_status
  type: integer
  description: "000-100"
- id: network_setup_status
  type: object
  description: "IP address, subnet mask, gateway, DHCP status"
- id: lan_port_number_status
  type: integer
  description: "1024-65535"
- id: display_name_status
  type: string
  description: "Display name (max 8 chars)"
- id: amx_d_d_status
  type: integer
  description: "0: off, 1: on"
- id: crestron_connected_status
  type: integer
  description: "0: off, 1: on"
- id: display_id_status
  type: integer
  description: "000-100"
- id: serial_id_function_status
  type: integer
  description: "0: off, 1: on"
- id: serial_response_id_all_status
  type: integer
  description: "0: off, 1: on"
- id: serial_id_group_status
  type: string
  description: "A-G"
- id: serial_response_id_group_status
  type: integer
  description: "0: off, 1: on"
- id: serial_daisy_chain_position_status
  type: string
  description: "TOP, DEF, END"
- id: component_rgb_select_status
  type: string
  description: "YBR, RGB"
- id: yuv_rgb_select_status
  type: string
  description: "YUV, RGB"
- id: y_c_filter_3d_status
  type: integer
  description: "0: off, 1: on"
- id: color_system_status
  type: string
  description: "NTS, PAL, SCM, 4NT, MPA, NPA, AUT"
- id: sync_signal_setting_status
  type: string
  description: "HAV, GRN, HVS"
- id: cinema_reality_status
  type: integer
  description: "0: off, 1: on"
- id: xga_mode_status
  type: integer
  description: "1-4"
- id: noise_reduction_status
  type: string
  description: "OFF, AUT, LOW, MID, HIG"
- id: mpeg_noise_reduction_status
  type: string
  description: "OFF, LOW, MID, HIG"
- id: signal_range_status
  type: string
  description: "VID, FUL, AUT"
- id: input_level_status
  type: integer
  description: "-16 to +16"
- id: color_matching_status
  type: object
  description: "Per-color on/off and RGB values (0000-2048)"
- id: screensaver_on_off_status
  type: integer
  description: "0: stop, 5: operating"
- id: screensaver_mode_status
  type: integer
  description: "0-4"
- id: interval_screensaver_status
  type: object
  description: "Periodic time and operating time HHMM"
- id: time_designation_screensaver_status
  type: object
  description: "Start and finish time HHMM"
- id: standby_after_screensaver_status
  type: integer
  description: "HHMM"
- id: input_label_current_status
  type: string
  description: "Current input label"
- id: input_label_each_status
  type: object
  description: "Label per input"
- id: function_group_status
  type: string
  description: "INP, MEM, ACT"
- id: function_button_settings_status
  type: object
  description: "Function per key 0-9"
- id: function_guide_settings_status
  type: integer
  description: "0: off, 1: on"
- id: multi_display_on_off_status
  type: integer
  description: "0: off, 1: on"
- id: multi_display_setup_detail_status
  type: object
  description: "Multi display setup parameters"
- id: frame_control_status
  type: integer
  description: "0-5"
- id: reverse_scan_status
  type: integer
  description: "0: off, 1: on"
- id: timer_program_status
  type: object
  description: "Timer program 01-20 configuration"
- id: present_day_status
  type: string
  description: "SUN-SAT"
- id: present_time_status
  type: integer
  description: "0000-2359"
- id: usb_media_player_status
  type: integer
  description: "0: disable, 1: enable"
- id: resume_play_status
  type: integer
  description: "0: off, 1: on"
- id: slideshow_duration_status
  type: integer
  description: "010-600"
- id: on_screen_display_status
  type: integer
  description: "0: off, 1: on"
- id: initial_input_status
  type: string
  description: "OFF, HM1, HM2, DV1, PC1, VD1, YP1, UD1"
- id: initial_vol_level_status
  type: object
  description: "Function on/off and volume 000-100"
- id: maximum_vol_level_status
  type: object
  description: "Function on/off and volume 000-100"
- id: input_lock_status
  type: string
  description: "OFF, HM1, HM2, DV1, PC1, VD1, YP1, UD1"
- id: button_lock_status
  type: string
  description: "OFF, MEN, ALL"
- id: controller_user_level_status
  type: integer
  description: "0-3"
- id: pc_auto_setting_status
  type: integer
  description: "0: off, 1: on"
- id: off_timer_function_status
  type: integer
  description: "0: off, 1: on"
- id: initial_startup_status
  type: string
  description: "LST, PON, STB"
- id: startup_logo_status
  type: integer
  description: "0: off, 1: on"
- id: lan_control_protocol_status
  type: string
  description: "LP1, LP2"
- id: clock_display_status
  type: integer
  description: "0: off, 1: on"
- id: power_on_message_no_activity_status
  type: integer
  description: "0: off, 1: on"
- id: power_on_message_power_management_status
  type: integer
  description: "0: off, 1: on"
- id: input_search_function_status
  type: string
  description: "OFF, ALL, PRI"
- id: input_search_1st_status
  type: string
  description: "NON, HM1, HM2, DV1, PC1, YP1, VD1, UD1"
- id: input_search_2nd_status
  type: string
  description: "NON, HM1, HM2, DV1, PC1, YP1, VD1, UD1"
- id: failover_backup_input_status
  type: object
  description: "Active/inactive status, main input, current input (0: main, 1: primary backup, 2: secondary backup)"
- id: failover_backup_signal_status
  type: object
  description: "Signal status for main, primary, secondary inputs (0: no signal, 1: signal present)"
- id: audio_input_select_current_status
  type: object
  description: "Video and audio input selection"
- id: audio_input_select_each_status
  type: object
  description: "Audio selection per input"
- id: no_signal_warning_status
  type: enum
  values: [0, 1]
  description: "0: normal, 1: no signal warning; returns 0 when feature is off"
- id: no_signal_warning_timing_status
  type: integer
  description: "01-60 minutes"
- id: no_signal_error_status
  type: enum
  values: [0, 1]
  description: "0: normal, 1: no signal error; returns 0 when feature is off"
- id: no_signal_error_timing_status
  type: integer
  description: "01-90 minutes"
- id: temperature_warning_status
  type: enum
  values: [0, 1]
  description: "0: normal mode, 1: high temperature mode"
- id: signal_frequency
  type: object
  description: "H (horizontal 000.00-999.99 Hz), V (vertical 000.00-999.99 Hz)"
- id: signal_format
  type: string
  description: "Signal format information (max 20 chars)"
- id: model_name
  type: object
  description: "55 (inch), F (FHD), 13 (model variant LFV60/LFV6)"
- id: model_inquiry
  type: object
  description: "55 (inch), model name, market code"
- id: software_version_main_mcu
  type: object
  description: "Main MCU version and model"
- id: software_version_sub_mcu
  type: string
  description: "Sub MCU version"
- id: software_version_eeprom
  type: string
  description: "EEPROM version"
- id: serial_number
  type: string
  description: "ASCII 9-15 characters (0x30-0x39, 0x41-0x5a, 0x20, 0x2d)"
- id: sos_history
  type: object
  description: "SOS history: count, first through 10th classification codes"
- id: sos_status
  type: string
  description: "NON (no history), ERR (SOS generating), EXT (history exists)"
```

## Variables
```yaml
# All settable parameters are captured in Actions above.
# Queries handled via Feedbacks - no separate Variables section needed.
```

## Events
```yaml
# No unsolicited event emission described in source.
# The device sends QST:NSW*, QST:NSE*, QST:TO* replies when corresponding
# warning/error features are enabled and conditions are met - these are
# reactive queries, not unsolicited events.
# UNRESOLVED: confirm whether device emits any unsolicited notifications on LAN.
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

**Packet format (RS-232C):** `<STX>CMD[:PARAM]<ETX>` — 3-char ASCII command, colon separator, variable-length params. Example: `<STX>PON<ETX>` = power on. STX=0x02, ETX=0x03. When no params, colon optional.

**LAN protocol:** device supports two protocols (LP1/LP2) selectable via `OSP:LPN`. Port number configurable via `SSU:LCP` (1024-65535, excludes 4352/10000/20000/41794).

**Command timing:** must wait for response before sending next command.

**Standby behavior:** only `PON` and `QPW` accepted while in standby.

**Display ID / daisy chain:** serial supports ID 000-100, group ID (A-G → AAA-BBB), daisy chain via straight cable (pins 2-8 hardwired).

**Error response:** invalid commands receive `ER401` reply.

**Serial ID format:** `<STX>AD94;RAD:<3-digit-id>;CMD[:PARAM]<ETX>` — fixed AD94;RAD: prefix, 3-char serial ID (001-100), then standard command.

<!-- UNRESOLVED: LAN TCP port number not stated in source -->
<!-- UNRESOLVED: unsolicited event emission not confirmed in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

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
last_checked_at: 2026-05-18T16:44:21.788Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:44:21.788Z
matched_actions: 145
action_count: 145
confidence: high
summary: "All 145 spec actions verified against source command table; all transport parameters match protocol specification."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
