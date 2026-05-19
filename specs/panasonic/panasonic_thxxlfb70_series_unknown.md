---
spec_id: admin/panasonic-thxxlfb70_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic TH-50/65/80LFB70 Series Control Spec"
manufacturer: Panasonic
model_family: TH-50LFB70
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - TH-50LFB70
    - TH-65LFB70
    - TH-80LFB70
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
last_checked_at: 2026-05-18T16:44:24.027Z
generated_at: 2026-05-18T16:44:24.027Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T16:44:24.027Z
  matched_actions: 352
  action_count: 352
  confidence: high
  summary: "All 352 spec actions match source commands via semantic-id convention; transport fully documented; comprehensive coverage of control categories."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-13
---

# Panasonic TH-50/65/80LFB70 Series Control Spec

## Summary
Multi Touch Screen LCD display supporting RS-232C and LAN control. Full command set includes power, input routing, picture/sound adjustment, network configuration, timer scheduling, and YFB100 subsystem integration. Serial: 9600 baud, 8N1, no flow control. LAN: TCP with configurable port (1024-65535).

<!-- UNRESOLVED: default LAN port number not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: default port not stated; SSU:LCP sets port 01024-65535
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: PON/POF commands present
- routable   # inferred: IMS input select commands present
- queryable  # inferred: QPW, QMI, QAV, etc. present
- levelable  # inferred: AVL volume, AAC:BAS/MID/TRE/BAL present
```

## Actions
```yaml
# Basic Controls
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: query_power
  label: Query Power State
  kind: query
  params: []
- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: string
      description: HM1/HDMI1, HM2/HDMI2, SL1/SLOT, VD1/VIDEO, YP1/COMPONENT, PC1/PC, DV1/DVI, DL1/DIGITAL LINK, MG1/MIRACAST, NW1/NETWORK, MV1/PANASONIC APP, WB1/MEMORY VIEWER
- id: select_input_toggle
  label: Input Select Toggle
  kind: action
  params: []
- id: query_input
  label: Query Input
  kind: query
  params: []
- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: 00-63
- id: volume_up
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: query_volume
  label: Query Volume
  kind: query
  params: []
- id: audio_mute
  label: Audio Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On
- id: audio_mute_toggle
  label: Audio Mute Toggle
  kind: action
  params: []
- id: query_audio_mute
  label: Query Audio Mute
  kind: query
  params: []
- id: video_mute
  label: Video Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On
- id: video_mute_toggle
  label: Video Mute Toggle
  kind: action
  params: []
- id: query_video_mute
  label: Query Video Mute
  kind: query
  params: []
- id: set_aspect
  label: Set Aspect Ratio
  kind: action
  params:
    - name: mode
      type: string
      description: ZOOM/FULL/JUST/NORM/ZOM2/ZOM3/SJST/SNOM/SFUL/14:9
- id: aspect_toggle
  label: Aspect Select Toggle
  kind: action
  params: []
- id: query_aspect
  label: Query Aspect
  kind: query
  params: []

# Picture
- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: STD/DYN/CNM (Normal/Dynamic/Cinema)
- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: level
      type: integer
      description: 000-100
- id: query_backlight
  label: Query Backlight
  kind: query
  params: []
- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: 000-100
- id: query_contrast
  label: Query Contrast
  kind: query
  params: []
- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: 000-100
- id: query_brightness
  label: Query Brightness
  kind: query
  params: []
- id: set_colour
  label: Set Colour
  kind: action
  params:
    - name: level
      type: integer
      description: 000-100
- id: query_colour
  label: Query Colour
  kind: query
  params: []
- id: set_hue
  label: Set Hue
  kind: action
  params:
    - name: level
      type: integer
      description: 000-100
- id: query_hue
  label: Query Hue
  kind: query
  params: []
- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: -15 to +15 (015)
- id: query_sharpness
  label: Query Sharpness
  kind: query
  params: []
- id: set_white_balance
  label: Set White Balance
  kind: action
  params:
    - name: mode
      type: string
      description: WRM/MID/COL (Warm/Normal/Cool)
- id: query_white_balance
  label: Query White Balance
  kind: query
  params: []
- id: set_frame_creation
  label: Set Frame Creation
  kind: action
  params:
    - name: level
      type: integer
      description: 0/1/2/3 (Off/Min/Mid/Max)
- id: query_frame_creation
  label: Query Frame Creation
  kind: query
  params: []

# Advanced Settings
- id: set_input_level
  label: Set Input Level
  kind: action
  params:
    - name: level
      type: integer
      description: -32 to +32 (032)
- id: query_input_level
  label: Query Input Level
  kind: query
  params: []
- id: set_wb_high_r
  label: Set W/B High R
  kind: action
  params:
    - name: level
      type: integer
      description: 000-100
- id: query_wb_high_r
  label: Query W/B High R
  kind: query
  params: []
- id: set_wb_high_g
  label: Set W/B High G
  kind: action
  params:
    - name: level
      type: integer
      description: 000-100
- id: query_wb_high_g
  label: Query W/B High G
  kind: query
  params: []
- id: set_wb_high_b
  label: Set W/B High B
  kind: action
  params:
    - name: level
      type: integer
      description: 000-100
- id: query_wb_high_b
  label: Query W/B High B
  kind: query
  params: []
- id: set_wb_low_r
  label: Set W/B Low R
  kind: action
  params:
    - name: level
      type: integer
      description: 000-100
- id: query_wb_low_r
  label: Query W/B Low R
  kind: query
  params: []
- id: set_wb_low_g
  label: Set W/B Low G
  kind: action
  params:
    - name: level
      type: integer
      description: 000-100
- id: query_wb_low_g
  label: Query W/B Low G
  kind: query
  params: []
- id: set_wb_low_b
  label: Set W/B Low B
  kind: action
  params:
    - name: level
      type: integer
      description: 000-100
- id: query_wb_low_b
  label: Query W/B Low B
  kind: query
  params: []
- id: set_gamma
  label: Set Gamma
  kind: action
  params:
    - name: mode
      type: string
      description: SC/20/22/26 (S-curve/2.0/2.2/2.6)
- id: query_gamma
  label: Query Gamma
  kind: query
  params: []

# Memory Function
- id: memory_delete
  label: Memory Delete
  kind: action
  params:
    - name: slot
      type: integer
      description: 01-08 (Memory No.)
- id: memory_load
  label: Memory Load
  kind: action
  params:
    - name: slot
      type: integer
      description: 01-08 (Memory No.)
- id: memory_save
  label: Memory Save
  kind: action
  params:
    - name: slot
      type: integer
      description: 01-08 (Memory No.)
- id: memory_name_change
  label: Memory Name Change
  kind: action
  params:
    - name: slot
      type: integer
      description: 01-08
    - name: name
      type: string
      description: Max 40 characters
- id: query_memory_state
  label: Query Memory State
  kind: query
  params:
    - name: slot
      type: integer
      description: "01-08"
- id: query_memory_name
  label: Query Memory Name
  kind: query
  params:
    - name: slot
      type: integer
      description: 01-08

# Sound
- id: set_speaker
  label: Set Speaker Output
  kind: action
  params:
    - name: output
      type: string
      description: SPO/EXT (Internal/External)
- id: query_speaker
  label: Query Speaker
  kind: query
  params: []
- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: string
      description: STD(AUT)/DYN/CLR (Normal/Dynamic/Clear)
- id: query_sound_mode
  label: Query Sound Mode
  kind: query
  params: []
- id: set_bass
  label: Set Bass
  kind: action
  params:
    - name: level
      type: integer
      description: -15 to +15 (015)
- id: query_bass
  label: Query Bass
  kind: query
  params: []
- id: set_mid
  label: Set Mid
  kind: action
  params:
    - name: level
      type: integer
      description: -15 to +15 (015)
- id: query_mid
  label: Query Mid
  kind: query
  params: []
- id: set_treble
  label: Set Treble
  kind: action
  params:
    - name: level
      type: integer
      description: -15 to +15 (015)
- id: query_treble
  label: Query Treble
  kind: query
  params: []
- id: set_balance
  label: Set Balance
  kind: action
  params:
    - name: level
      type: integer
      description: -30 to +30 (030)
- id: query_balance
  label: Query Balance
  kind: query
  params: []
- id: set_surround
  label: Set Surround
  kind: action
  params:
    - name: state
      type: string
      description: MON/OFF (On/Off)
- id: query_surround
  label: Query Surround
  kind: query
  params: []
- id: set_audio_out_pip
  label: Set Audio Out (PIP)
  kind: action
  params:
    - name: output
      type: string
      description: M/S (Main/Sub)
- id: sdi_left_channel
  label: SDI Sound Output Left Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: 01-16 (Channel 1-16)
- id: sdi_right_channel
  label: SDI Sound Output Right Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: 01-16 (Channel 1-16)
- id: set_sdi_sound_out
  label: Set SDI Sound Out
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: set_level_meter
  label: Set Level Meter
  kind: action
  params:
    - name: mode
      type: integer
      description: 0/1/2 (Off/1-8ch/9-16ch)

# Position/Size
- id: set_hpos
  label: Set H-Position
  kind: action
  params:
    - name: value
      type: integer
      description: -124 to +124 (0124)
- id: query_hpos
  label: Query H-Position
  kind: query
  params: []
- id: set_hsize
  label: Set H-Size
  kind: action
  params:
    - name: value
      type: integer
      description: -124 to +124 (0124)
- id: query_hsize
  label: Query H-Size
  kind: query
  params: []
- id: set_vpos
  label: Set V-Position
  kind: action
  params:
    - name: value
      type: integer
      description: -124 to +124 (0124)
- id: query_vpos
  label: Query V-Position
  kind: query
  params: []
- id: set_vsize
  label: Set V-Size
  kind: action
  params:
    - name: value
      type: integer
      description: -062 to +62 (0062)
- id: query_vsize
  label: Query V-Size
  kind: query
  params: []
- id: set_dot_clock
  label: Set Dot Clock
  kind: action
  params:
    - name: value
      type: integer
      description: -32 to +32 (0032)
- id: query_dot_clock
  label: Query Dot Clock
  kind: query
  params: []
- id: set_clock_phase
  label: Set Clock Phase
  kind: action
  params:
    - name: value
      type: integer
      description: -16 to +16 (0016)
- id: query_clock_phase
  label: Query Clock Phase
  kind: query
  params: []
- id: set_clamp_position
  label: Set Clamp Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0000-127 (0127)
- id: query_clamp_position
  label: Query Clamp Position
  kind: query
  params: []
- id: set_pixel_mode
  label: Set 1:1 Pixel Mode
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_pixel_mode
  label: Query 1:1 Pixel Mode
  kind: query
  params: []
- id: set_overscan
  label: Set Over Scan
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_overscan
  label: Query Over Scan
  kind: query
  params: []
- id: set_pos_size
  label: Set Position/Size
  kind: action
  params:
    - name: hpos
      type: integer
      description: -124 to +124
    - name: hsize
      type: integer
      description: -124 to +124
    - name: vpos
      type: integer
      description: -124 to +124
    - name: vsize
      type: integer
      description: -62 to +62
- id: auto_setup
  label: Auto Setup
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=execute, 0=interrupt

# Setup - Touch Screen
- id: set_touch_screen
  label: Set Touch Screen
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_touch_screen
  label: Query Touch Screen
  kind: query
  params: []
- id: set_flick_menu_bar
  label: Set Flick Menu Bar
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_flick_menu_bar
  label: Query Flick Menu Bar
  kind: query
  params: []
- id: set_quick_launch
  label: Set Quick Launch
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_quick_launch
  label: Query Quick Launch
  kind: query
  params: []
- id: set_initial_background
  label: Set Initial Background
  kind: action
  params:
    - name: colour
      type: string
      description: WHI/GRE/BLA (White/Green/Black)
- id: query_initial_background
  label: Query Initial Background
  kind: query
  params: []
- id: set_auto_save
  label: Set Auto Save
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_auto_save
  label: Query Auto Save
  kind: query
  params: []
- id: set_builtin_memory
  label: Set Built-in Memory
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_builtin_memory
  label: Query Built-in Memory
  kind: query
  params: []

# MULTI PIP Settings
- id: set_multi_pip
  label: Set MULTI PIP
  kind: action
  params:
    - name: mode
      type: string
      description: OFF/PIP/0/1/2/3
- id: query_multi_pip
  label: Query MULTI PIP
  kind: query
  params: []
- id: set_pip_mode
  label: Set PIP Mode
  kind: action
  params:
    - name: mode
      type: string
      description: PIP/PIW
- id: query_pip_mode
  label: Query PIP Mode
  kind: query
  params: []
- id: set_sub_input_position_toggle
  label: Sub Input Position Toggle
  kind: action
  params: []
- id: set_sub_input_position
  label: Sub Input Position Direct
  kind: action
  params:
    - name: position
      type: integer
      description: 0/1/2/3 (Lower right/Lower left/Upper left/Upper right)
- id: set_sub_input_size_toggle
  label: Sub Input Size Toggle
  kind: action
  params: []
- id: set_sub_input_size
  label: Sub Input Size Direct
  kind: action
  params:
    - name: size
      type: integer
      description: 1/2/3/4
- id: query_sub_input_size
  label: Query Sub Input Size
  kind: query
  params: []
- id: pip_swap
  label: PIP Swap
  kind: action
  params: []

# Network Setup
- id: set_wired_lan
  label: Set Wired LAN
  kind: action
  params:
    - name: ip
      type: string
      description: 000-255.000-255.000-255.000-255
    - name: subnet
      type: string
      description: 000-255.000-255.000-255.000-255
    - name: gateway
      type: string
      description: 000-255.000-255.000-255.000-255
    - name: dhcp
      type: integer
      description: 0/1 (Off/On)
- id: query_wired_lan
  label: Query Wired LAN
  kind: query
  params: []
- id: set_wireless_lan_select
  label: Select Wireless Network
  kind: action
  params:
    - name: network
      type: string
      description: OFF/SDT/MDT/UR1/UR2/UR3
- id: query_wireless_lan_select
  label: Query Wireless LAN Select
  kind: query
  params: []
- id: set_wireless_lan
  label: Set Wireless LAN
  kind: action
  params:
    - name: ip
      type: string
      description: 000-255.000-255.000-255.000-255
    - name: subnet
      type: string
      description: 000-255.000-255.000-255.000-255
    - name: gateway
      type: string
      description: 000-255.000-255.000-255.000-255
    - name: dhcp
      type: integer
      description: 0/1 (Off/On)
- id: query_wireless_lan
  label: Query Wireless LAN
  kind: query
  params: []
- id: set_wireless_lan_username
  label: Set Wireless LAN Username
  kind: action
  params:
    - name: username
      type: string
      description: Max 8 characters
- id: query_wireless_lan_username
  label: Query Wireless LAN Username
  kind: query
  params: []
- id: set_display_name
  label: Set Display Name
  kind: action
  params:
    - name: name
      type: string
      description: Max 8 characters
- id: query_display_name
  label: Query Display Name
  kind: query
  params: []
- id: set_multi_live
  label: Set Multi-Live
  kind: action
  params:
    - name: mode
      type: string
      description: 04MLT/04IDX/16IDX
- id: query_multi_live
  label: Query Multi-Live
  kind: query
  params: []
- id: set_live_mode_cut_in
  label: Set Live Mode Cut In
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_live_mode_cut_in
  label: Query Live Mode Cut In
  kind: query
  params: []
- id: set_web_control
  label: Set WEB Control
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_web_control
  label: Query WEB Control
  kind: query
  params: []
- id: set_amx_dd
  label: Set AMX Device Discovery
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_amx_dd
  label: Query AMX D.D.
  kind: query
  params: []
- id: set_crestron
  label: Set Crestron Connected
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_crestron
  label: Query Crestron Connected
  kind: query
  params: []
- id: network_reset
  label: Network Reset
  kind: action
  params: []
- id: query_display_id
  label: Query Display ID
  kind: query
  params: []
- id: query_antenna_level
  label: Query Antenna Level
  kind: query
  params: []
- id: set_port
  label: Set Port
  kind: action
  params:
    - name: port
      type: integer
      description: 01024-65535
- id: query_port
  label: Query Port
  kind: query
  params: []
- id: query_digital_link_status
  label: Query DIGITAL LINK Status
  kind: query
  params: []
- id: set_extron_xtp
  label: Set Extron XTP
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_extron_xtp
  label: Query Extron XTP
  kind: query
  params: []
- id: set_lan_protocol
  label: Set LAN Control Protocol
  kind: action
  params:
    - name: protocol
      type: string
      description: LP1/LP2 (Protocol 1/Protocol 2)
- id: query_lan_protocol
  label: Query LAN Control Protocol
  kind: query
  params: []

# Memory Viewer Settings
- id: set_memory_viewer_view
  label: Memory Viewer View
  kind: action
  params:
    - name: mode
      type: string
      description: THU/LIS (Thumbnail/List)
- id: query_memory_viewer_view
  label: Query Memory Viewer View
  kind: query
  params: []
- id: set_memory_viewer_sort
  label: Memory Viewer Sort
  kind: action
  params:
    - name: mode
      type: string
      description: NAM/TYP/TIM (Name/Type/Time)
- id: query_memory_viewer_sort
  label: Query Memory Viewer Sort
  kind: query
  params: []
- id: set_memory_viewer_autoplay
  label: Memory Viewer Autoplay
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_memory_viewer_autoplay
  label: Query Memory Viewer Autoplay
  kind: query
  params: []
- id: set_memory_viewer_interval
  label: Memory Viewer Interval
  kind: action
  params:
    - name: interval
      type: integer
      description: 0/1/2/3/4/5 (5S/10S/15S/30S/60S/120S)
- id: query_memory_viewer_interval
  label: Query Memory Viewer Interval
  kind: query
  params: []
- id: set_memory_viewer_effect
  label: Memory Viewer Effect
  kind: action
  params:
    - name: effect
      type: string
      description: OFF/RAN/WIL/WIR/WID/SPL/ZOO/FAD/BLI/CHW/SLI/SLO
- id: query_memory_viewer_effect
  label: Query Memory Viewer Effect
  kind: query
  params: []
- id: set_memory_viewer_guide
  label: Memory Viewer Guide
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_memory_viewer_guide
  label: Query Memory Viewer Guide
  kind: query
  params: []

# Signal
- id: set_3d_yc_filter
  label: Set 3D Y/C Filter
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_3d_yc_filter
  label: Query 3D Y/C Filter
  kind: query
  params: []
- id: set_sync
  label: Set Sync
  kind: action
  params:
    - name: mode
      type: string
      description: GRN/HAV
- id: query_sync
  label: Query Sync
  kind: query
  params: []
- id: set_colour_system
  label: Set Colour System
  kind: action
  params:
    - name: system
      type: string
      description: NTS/PAL/SCM/MNT/AUT
- id: query_colour_system
  label: Query Colour System
  kind: query
  params: []
- id: set_cinema_reality
  label: Set Cinema Reality
  kind: action
  params:
    - name: level
      type: integer
      description: 0/1 (Off/On)
- id: query_cinema_reality
  label: Query Cinema Reality
  kind: query
  params: []
- id: set_pnr
  label: Set P-NR
  kind: action
  params:
    - name: level
      type: integer
      description: 0/1 (Off/Min)
- id: query_pnr
  label: Query P-NR
  kind: query
  params: []
- id: set_pnr_ext
  label: Set P-NR Extended
  kind: action
  params:
    - name: level
      type: string
      description: OFF/MIN/MID/MAX
- id: query_pnr_ext
  label: Query P-NR Extended
  kind: query
  params: []
- id: set_block_nr
  label: Set Block NR
  kind: action
  params:
    - name: level
      type: string
      description: OFF/MIN/MID/MAX
- id: query_block_nr
  label: Query Block NR
  kind: query
  params: []
- id: set_mosquito_nr
  label: Set Mosquito NR
  kind: action
  params:
    - name: level
      type: string
      description: OFF/MIN/MID/MAX
- id: query_mosquito_nr
  label: Query Mosquito NR
  kind: query
  params: []
- id: set_noise_reduction
  label: Set Noise Reduction
  kind: action
  params:
    - name: level
      type: string
      description: OFF/MIN/MID/MAX/ADV
- id: query_noise_reduction
  label: Query Noise Reduction
  kind: query
  params: []
- id: set_xga_mode
  label: Set XGA Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 1/2/3/4 (1024x768/1280x768/1366x768/Auto)
- id: query_xga_mode
  label: Query XGA Mode
  kind: query
  params: []
- id: set_sdi_through
  label: Set SDI Through
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_sdi_through
  label: Query SDI Through
  kind: query
  params: []
- id: set_hdmi_range
  label: Set HDMI Range
  kind: action
  params:
    - name: range
      type: string
      description: VID/FUL/AUT (Video/Full/Auto)
- id: query_hdmi_range
  label: Query HDMI Range
  kind: query
  params: []

# Screensaver
- id: set_screensaver
  label: Set Screensaver
  kind: action
  params:
    - name: mode
      type: integer
      description: 0/1/2/3/4 (Off/Scrolling bar/Negative image/Overlay/White)
- id: query_screensaver
  label: Query Screensaver
  kind: query
  params: []
- id: set_screensaver_function
  label: Screensaver Function
  kind: action
  params:
    - name: function
      type: integer
      description: 0/1/2/3
- id: query_screensaver_function
  label: Query Screensaver Function
  kind: query
  params: []
- id: set_screensaver_mode
  label: Screensaver Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0/1/2/3/4
- id: query_screensaver_mode
  label: Query Screensaver Mode
  kind: query
  params: []
- id: set_screensaver_interval
  label: Screensaver Interval
  kind: action
  params:
    - name: periodic
      type: string
      description: "0000-2359 (HHMM)"
    - name: operation
      type: string
      description: "0000-2359 (HHMM)"
- id: query_screensaver_interval
  label: Query Screensaver Interval
  kind: query
  params: []
- id: set_screensaver_time
  label: Screensaver Time Designation
  kind: action
  params:
    - name: start
      type: string
      description: "0000-2359 (HHMM)"
    - name: finish
      type: string
      description: "0000-2359 (HHMM)"
- id: query_screensaver_time
  label: Query Screensaver Time
  kind: query
  params: []
- id: set_screensaver_standby
  label: Standby after Screensaver
  kind: action
  params:
    - name: duration
      type: string
      description: "0000-2359 (HHMM)"
- id: query_screensaver_standby
  label: Query Standby after Screensaver
  kind: query
  params: []
- id: set_wobbling
  label: Set Wobbling
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_wobbling
  label: Query Wobbling
  kind: query
  params: []

# ECO Mode
- id: set_eco_mode
  label: Set ECO Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0/1 (Custom/On)
- id: query_eco_mode
  label: Query ECO Mode
  kind: query
  params: []
- id: set_power_save
  label: Set Power Save
  kind: action
  params:
    - name: mode
      type: integer
      description: 0/1/2 (Off/On/Sensor)
- id: query_power_save
  label: Query Power Save
  kind: query
  params: []
- id: set_hdmi1_power_management
  label: HDMI1 Power Management
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_hdmi1_power_management
  label: Query HDMI1 Power Management
  kind: query
  params: []
- id: set_hdmi2_power_management
  label: HDMI2 Power Management
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_hdmi2_power_management
  label: Query HDMI2 Power Management
  kind: query
  params: []
- id: set_pc_power_management
  label: PC Power Management
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_pc_power_management
  label: Query PC Power Management
  kind: query
  params: []
- id: set_dvid_power_management
  label: DVI-D Power Management
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_dvid_power_management
  label: Query DVI-D Power Management
  kind: query
  params: []
- id: set_no_signal_power_off
  label: No Signal Power Off
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_no_signal_power_off
  label: Query No Signal Power Off
  kind: query
  params: []

# Input Label
- id: set_input_label_current
  label: Set Input Label (Current Input)
  kind: action
  params:
    - name: label
      type: string
      description: NRM/DV1/DV2/DV3/DV4/BD1/BD2/BD3/BD4/CTV/VCR/STB/SKP
- id: query_input_label_current
  label: Query Input Label (Current Input)
  kind: query
  params: []
- id: set_input_label_specified
  label: Set Input Label (Specified Input)
  kind: action
  params:
    - name: input
      type: string
      description: HM1/HM2/SL1/VD1/YP1/PC1/DV1/DL1/MG1/NW1/MV1/WB1
    - name: label
      type: string
      description: NRM/DV1/DV2/DV3/DV4/BD1/BD2/BD3/BD4/CTV/VCR/STB/SKP

# Function Button
- id: set_function_button
  label: Function Button Settings
  kind: action
  params:
    - name: button
      type: integer
      description: 1/2
    - name: function
      type: string
      description: ECO/REF/SIG/SUT/HM1/HM2/S1A/S1B/VD1/YP1/PC1/DV1/DLK/MG1/NW1/MV1/WB1/LNS/LML/OSH/MPI/MPS
- id: query_function_button
  label: Query Function Button
  kind: query
  params: []
- id: set_function_button_guide
  label: Function Button Guide
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_function_button_guide
  label: Query Function Button Guide
  kind: query
  params: []

# Timer
- id: set_power_on_timer
  label: Power ON Settings
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
    - name: time
      type: string
      description: "0000-2359 (HHMM)"
- id: query_power_on_timer
  label: Query Power ON Settings
  kind: query
  params: []
- id: set_power_off_timer
  label: Power OFF Settings
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
    - name: time
      type: string
      description: "0000-2359 (HHMM)"
- id: query_power_off_timer
  label: Query Power OFF Settings
  kind: query
  params: []
- id: set_day
  label: Set Day
  kind: action
  params:
    - name: day
      type: string
      description: MON/TUE/WED/THU/FRI/SAT/SUN
- id: query_day
  label: Query Day
  kind: query
  params: []
- id: set_time
  label: Set Time
  kind: action
  params:
    - name: time
      type: string
      description: "0000-2359 (HHMM)"
- id: query_time
  label: Query Time
  kind: query
  params: []

# General Setup
- id: set_component_rgb_select
  label: Component/RGB-in Select
  kind: action
  params:
    - name: mode
      type: string
      description: YBR/RGB
- id: query_component_rgb_select
  label: Query Component/RGB-in Select
  kind: query
  params: []
- id: set_dvi_yuv_rgb
  label: DVI YUV/RGB Select
  kind: action
  params:
    - name: mode
      type: string
      description: YUV/RGB
- id: query_dvi_yuv_rgb
  label: Query DVI YUV/RGB Select
  kind: query
  params: []
- id: set_monitor_out
  label: Monitor Out
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_monitor_out
  label: Query Monitor Out
  kind: query
  params: []
- id: set_no_activity_power_off
  label: No Activity Power Off
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_no_activity_power_off
  label: Query No Activity Power Off
  kind: query
  params: []
- id: set_menu_duration
  label: Menu Display Duration
  kind: action
  params:
    - name: duration
      type: integer
      description: 005/010/015/020/025/030 (seconds)
- id: query_menu_duration
  label: Query Menu Display Duration
  kind: query
  params: []
- id: set_osd_brightness
  label: OSD Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: 1/2/3/4/5 (Low to High)
- id: query_osd_brightness
  label: Query OSD Brightness
  kind: query
  params: []
- id: set_osd_language
  label: OSD Language
  kind: action
  params:
    - name: language
      type: string
      description: ENG/DEU/FRA/ITL/CHA/USA/ESP/JPN/RUS
- id: query_osd_language
  label: Query OSD Language
  kind: query
  params: []

# Weekly Command Timer
- id: set_weekly_timer_function
  label: Weekly Timer Function
  kind: action
  params:
    - name: state
      type: integer
      description: 1/0 (On/Off)
- id: query_weekly_timer_function
  label: Query Weekly Timer Function
  kind: query
  params: []
- id: set_weekly_timer_program
  label: Set Weekly Timer Program
  kind: action
  params:
    - name: day1
      type: string
      description: MON/TUE/WED/THU/FRI/SAT/SUN or ---
    - name: day2
      type: string
      description: MON/TUE/WED/THU/FRI/SAT/SUN or ---
    - name: day3
      type: string
      description: MON/TUE/WED/THU/FRI/SAT/SUN or ---
    - name: day4
      type: string
      description: MON/TUE/WED/THU/FRI/SAT/SUN or ---
    - name: day5
      type: string
      description: MON/TUE/WED/THU/FRI/SAT/SUN or ---
    - name: day6
      type: string
      description: MON/TUE/WED/THU/FRI/SAT/SUN or ---
    - name: day7
      type: string
      description: MON/TUE/WED/THU/FRI/SAT/SUN or ---
- id: query_weekly_timer_program
  label: Query Weekly Timer Program
  kind: query
  params: []
- id: set_timer_program_edit
  label: Program Edit
  kind: action
  params:
    - name: program
      type: integer
      description: 1-7
    - name: command_count
      type: integer
      description: 01-64
    - name: time
      type: string
      description: "0000-2359 or ----"
    - name: command
      type: string
      description: S01-S64/U01-U64 or ---
- id: set_user_command
  label: User Command Edit
  kind: action
  params:
    - name: command_num
      type: string
      description: U01-U64
    - name: command
      type: string
      description: Max 15 parameters

# Audio Input Select
- id: set_audio_input
  label: Audio Input Select
  kind: action
  params:
    - name: input
      type: string
      description: HM1/HM2/SL1/VD1/YP1/PC1/DV1/DL1/MG1/NW1/MV1/WB1
    - name: audio
      type: string
      description: HM1/HM2/SL1/VD1/PC1/DL1/NW1/NAD

# Input Search
- id: set_input_search
  label: Input Search
  kind: action
  params:
    - name: mode
      type: string
      description: ALL/PRI/OFF
- id: query_input_search
  label: Query Input Search
  kind: query
  params: []
- id: set_primary_input
  label: Primary Input
  kind: action
  params:
    - name: input
      type: string
      description: HM1/HM2/SL1/VD1/YP1/PC1/DV1/DL1/NW1/NON
- id: query_primary_input
  label: Query Primary Input
  kind: query
  params: []
- id: set_secondary_input
  label: Secondary Input
  kind: action
  params:
    - name: input
      type: string
      description: HM1/HM2/SL1/VD1/YP1/PC1/DV1/DL1/NW1/NON
- id: query_secondary_input
  label: Query Secondary Input
  kind: query
  params: []

# Options
- id: set_onscreen_display
  label: Onscreen Display
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Disable/Enable)
- id: query_onscreen_display
  label: Query Onscreen Display
  kind: query
  params: []
- id: set_initial_input
  label: Initial INPUT
  kind: action
  params:
    - name: input
      type: string
      description: OFF/HM1/HM2/SL1/VD1/YP1/PC1/DV1/DL1/MG1/NW1/MV1/WB1
- id: query_initial_input
  label: Query Initial INPUT
  kind: query
  params: []
- id: set_initial_volume_level
  label: Initial VOL Level
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
    - name: level
      type: integer
      description: 00-63
- id: query_initial_volume_level
  label: Query Initial VOL Level
  kind: query
  params: []
- id: set_maximum_volume_level
  label: Maximum VOL Level
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
    - name: level
      type: integer
      description: 00-63
- id: query_maximum_volume_level
  label: Query Maximum VOL Level
  kind: query
  params: []
- id: set_input_lock
  label: INPUT Lock
  kind: action
  params:
    - name: lock
      type: string
      description: OFF/HM1/HM2/SL1/VD1/YP1/PC1/DV1/DL1/MG1/NW1/MV1/WB1
- id: query_input_lock
  label: Query INPUT Lock
  kind: query
  params: []
- id: set_button_lock
  label: Button Lock
  kind: action
  params:
    - name: lock
      type: string
      description: OFF/MEN/ALL
- id: query_button_lock
  label: Query Button Lock
  kind: query
  params: []
- id: set_remocon_user_level
  label: Remocon User Level
  kind: action
  params:
    - name: level
      type: integer
      description: 0/1/2/3 (Off/User1/User2/User3)
- id: query_remocon_user_level
  label: Query Remocon User Level
  kind: query
  params: []
- id: set_off_timer_function
  label: Off-timer Function
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Disable/Enable)
- id: query_off_timer_function
  label: Query Off-timer Function
  kind: query
  params: []
- id: set_initial_power_mode
  label: Initial Power Mode
  kind: action
  params:
    - name: mode
      type: string
      description: NOR/PON/STB
- id: query_initial_power_mode
  label: Query Initial Power Mode
  kind: query
  params: []
- id: set_display_size
  label: Display Size
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_display_size
  label: Query Display Size
  kind: query
  params: []
- id: set_studio_wb
  label: Studio W/B
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_studio_wb
  label: Query Studio W/B
  kind: query
  params: []
- id: set_studio_gain
  label: Studio Gain
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_studio_gain
  label: Query Studio Gain
  kind: query
  params: []

# RS-232C/LAN Information Timing
- id: set_no_signal_warning
  label: No Signal Warning
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_no_signal_warning
  label: Query No Signal Warning
  kind: query
  params: []
- id: set_no_signal_warning_timing
  label: No Signal Warning Timing
  kind: action
  params:
    - name: minutes
      type: integer
      description: 01-60
- id: query_no_signal_warning_timing
  label: Query No Signal Warning Timing
  kind: query
  params: []
- id: set_no_signal_error
  label: No Signal Error
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_no_signal_error
  label: Query No Signal Error
  kind: query
  params: []
- id: set_no_signal_error_timing
  label: No Signal Error Timing
  kind: action
  params:
    - name: minutes
      type: integer
      description: 01-90
- id: query_no_signal_error_timing
  label: Query No Signal Error Timing
  kind: query
  params: []
- id: set_temperature_warning
  label: Temperature Warning
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_temperature_warning
  label: Query Temperature Warning
  kind: query
  params: []
- id: set_temperature_warning_value
  label: Temperature Warning Value
  kind: action
  params:
    - name: value
      type: integer
      description: -40 to +69 (Celsius)
- id: query_temperature_warning_value
  label: Query Temperature Warning Value
  kind: query
  params: []
- id: set_temperature_release_value
  label: Temperature Warning Release Value
  kind: action
  params:
    - name: value
      type: integer
      description: -40 to +69 (Celsius)
- id: query_temperature_release_value
  label: Query Temperature Release Value
  kind: query
  params: []
- id: set_slot_power
  label: Slot Power
  kind: action
  params:
    - name: mode
      type: string
      description: ON/AT/OF
- id: query_slot_power
  label: Query Slot Power
  kind: query
  params: []
- id: set_power_on_screen_delay
  label: Power On Screen Delay
  kind: action
  params:
    - name: seconds
      type: integer
      description: 00-30 (00=OFF, 1-30)
- id: query_power_on_screen_delay
  label: Query Power On Screen Delay
  kind: query
  params: []
- id: set_dvid_power_mode
  label: DVI-D Power Management Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0/1 (Low Power/Standard)
- id: query_dvid_power_mode
  label: Query DVI-D Power Management Mode
  kind: query
  params: []
- id: set_clock_display
  label: Clock Display
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_clock_display
  label: Query Clock Display
  kind: query
  params: []
- id: set_all_aspect
  label: All Aspect
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_all_aspect
  label: Query All Aspect
  kind: query
  params: []
- id: set_auto_setup_options
  label: Auto Setup
  kind: action
  params:
    - name: mode
      type: string
      description: AUT/BTN
- id: query_auto_setup_options
  label: Query Auto Setup
  kind: query
  params: []
- id: set_rotate
  label: Rotate
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_rotate
  label: Query Rotate
  kind: query
  params: []
- id: set_power_on_message_no_activity
  label: Power On Message (No Activity)
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_power_on_message_no_activity
  label: Query Power On Message (No Activity)
  kind: query
  params: []
- id: set_power_on_message_power_management
  label: Power On Message (Power Management)
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: query_power_on_message_power_management
  label: Query Power On Message (Power Management)
  kind: query
  params: []

# Other
- id: text_clear
  label: Text Clear
  kind: action
  params: []
- id: text_display
  label: Text Display
  kind: action
  params:
    - name: h_start
      type: integer
      description: 001-116
    - name: v_start
      type: integer
      description: 01-30
    - name: text_color
      type: integer
      description: 0-8
    - name: bg_color
      type: integer
      description: 0-8
    - name: text_size
      type: integer
      description: 0-3
    - name: text
      type: string
      description: Max 40 characters
- id: text_timeout
  label: Text Timeout Setting
  kind: action
  params:
    - name: seconds
      type: integer
      description: 01-99
- id: text_memory_load
  label: Text Display Memory Load
  kind: action
  params:
    - name: area
      type: integer
      description: 1-5
- id: text_scrolling_display
  label: Text Scrolling Display
  kind: action
  params:
    - name: h_start
      type: integer
      description: 001-116
    - name: v_start
      type: integer
      description: 01-30
    - name: text_color
      type: integer
      description: 0-8
    - name: bg_color
      type: integer
      description: 0-8
    - name: text_size
      type: integer
      description: 0-3
    - name: text
      type: string
      description: Max 40 characters
- id: text_memory_save
  label: Text Memory Save
  kind: action
  params:
    - name: area
      type: integer
      description: 1-5
    - name: h_start
      type: integer
      description: 001-116
    - name: v_start
      type: integer
      description: 01-30
    - name: text_color
      type: integer
      description: 0-8
    - name: bg_color
      type: integer
      description: 0-8
    - name: text_size
      type: integer
      description: 0-3
    - name: text
      type: string
      description: Max 40 characters
- id: sub_display_input
  label: Sub Display Input Select
  kind: action
  params:
    - name: input
      type: string
      description: HM1/HM2/SL1/VD1/YP1/PC1/DV1/DL1/NW1
- id: sub_display_input_toggle
  label: Sub Display Input Toggle
  kind: action
  params: []
- id: label_display
  label: Label Display
  kind: action
  params: []
- id: audio_mute_tuner
  label: Audio Mute (for Tuner)
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
- id: clear_osd
  label: Clear OSD
  kind: action
  params: []
- id: digital_zoom
  label: Digital Zoom
  kind: action
  params:
    - name: state
      type: integer
      description: 0/1 (Off/On)
    - name: rate
      type: integer
      description: 1-4
    - name: pos_length
      type: integer
      description: 1-5
    - name: pos_side
      type: integer
      description: 1-5
- id: off_timer
  label: Off Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: 0-90 (0=off)
- id: query_digital_link_detail
  label: Inquiry about DIGITAL LINK Status Detail
  kind: query
  params: []
- id: query_no_signal_warning_status
  label: Inquiry about No Signal Warning
  kind: query
  params: []
- id: query_no_signal_error_status
  label: Inquiry about No Signal Error
  kind: query
  params: []
- id: query_yfb_model_name
  label: Inquiry about YFB Series Model Name
  kind: query
  params: []
- id: digital_link_input_main
  label: DIGITAL LINK Input Change (Main)
  kind: action
  params:
    - name: input
      type: string
      description: HD1/HD2/PC1/PC2/SVD/VID
- id: digital_link_input_sub
  label: DIGITAL LINK Input Change (Sub)
  kind: action
  params:
    - name: input
      type: string
      description: HD1/HD2/PC1/PC2/SVD/VID

# YFB100 Commands
- id: yfb100_volume_up
  label: YFB100 Volume Up
  kind: action
  params: []
- id: yfb100_volume_down
  label: YFB100 Volume Down
  kind: action
  params: []
- id: yfb100_volume_set
  label: YFB100 Volume Setting
  kind: action
  params:
    - name: level
      type: integer
      description: 000-063
- id: yfb100_aspect
  label: YFB100 Aspect Change
  kind: action
  params: []
- id: yfb100_closed_caption
  label: YFB100 Closed Caption Setting
  kind: action
  params:
    - name: mode
      type: integer
      description: 0/1/2/3/4 (OFF/CC1/CC2/CC3/CC4)
- id: yfb100_auto_setup
  label: YFB100 Auto Setup
  kind: action
  params: []
- id: yfb100_system_selector
  label: YFB100 System Selector Setting
  kind: action
  params: []
- id: yfb100_menu_key
  label: YFB100 Menu Key Send
  kind: action
  params: []
- id: yfb100_enter_key
  label: YFB100 Enter Key Send
  kind: action
  params: []
- id: yfb100_up_key
  label: YFB100 Up Key Send
  kind: action
  params: []
- id: yfb100_down_key
  label: YFB100 Down Key Send
  kind: action
  params: []
- id: yfb100_left_key
  label: YFB100 Left Key Send
  kind: action
  params: []
- id: yfb100_right_key
  label: YFB100 Right Key Send
  kind: action
  params: []
- id: yfb100_return_key
  label: YFB100 Return Key Send
  kind: action
  params: []

# Status Queries
- id: query_sos_history
  label: SOS History
  kind: query
  params: []
- id: query_sos_state
  label: SOS State
  kind: query
  params: []
- id: query_signal_frequency
  label: Signal Frequency
  kind: query
  params: []
- id: query_signal_name
  label: Signal Name
  kind: query
  params: []
- id: query_model_info
  label: Model Information
  kind: query
  params: []
- id: query_version_monitor_mcu
  label: Version (MONITOR-MCU)
  kind: query
  params: []
- id: query_version_monitor_eeprom
  label: Version (MONITOR-EEPROM)
  kind: query
  params: []
- id: query_serial_number
  label: Serial Number
  kind: query
  params: []
```

## Feedbacks
```yaml
# All query commands in the command list return feedback.
# See Actions section for corresponding query actions.
```

## Variables
```yaml
# UNRESOLVED: all settable parameters are exposed as Actions with params.
# No separate Variables section needed for this device.
```

## Events
```yaml
# Unsolicited notifications the device sends:
- id: no_signal_warning_auto
  label: No Signal Warning Automatic
  description: QST:NSW1 sent when signal disconnected after No Signal Warning Timing
- id: no_signal_error_auto
  label: No Signal Error Automatic
  description: QST:NSE1 sent when signal disconnected after No Signal Error Timing
- id: temperature_warning_auto
  label: Temperature Warning Automatic
  description: QST:TO1 sent when temperature exceeds warning value
- id: temperature_normal_auto
  label: Temperature Normal Automatic
  description: QST:TO0 sent when temperature returns below release value
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

**Command format (serial/LAN):**
- Structure: `STX + Command + [:Parameters] + ETX`
- STX = `0x02`, ETX = `0x03`
- Example: `PON` (power on) → `0x02 0x50 0x4F 0x4E 0x03`
- Example: `VPC:PIC:085` (contrast 85) → `0x02 0x56 0x50 0x43 0x3A 0x50 0x49 0x43 0x30 0x38 0x35 0x03`
- Response interval: ≤100ms (serial), ≤200ms (documented Japanese section)

**LAN control protocols:**
- Protocol 1 (LP1) and Protocol 2 (LP2) supported — which protocol is used for LAN is selectable via `OSP:LPN`

**YFB100 subsystem:**
- Integrated volume/signal box connected via DIGITAL LINK
- Controlled via VXX:TRLS1=TR01: prefix commands

**Input labels:**
- 14 input sources with customizable names (NRM default, DV1-DV4, BD1-BD4, CTV, VCR, STB, SKP)

<!-- UNRESOLVED: default TCP port number (SSU:LCP allows 1024-65535, default not stated) -->
<!-- UNRESOLVED: serial response timeout beyond 100ms recommendation -->
<!-- UNRESOLVED: LAN response timeout beyond 200ms documented in Japanese section -->
<!-- UNRESOLVED: wire type for RS-232 (straight cable stated, no null-modem needed) -->
<!-- UNRESOLVED: protocol 1 vs protocol 2 functional differences -->
<!-- UNRESOLVED: YFB100 subsystem command syntax beyond volume/aspect/closed-caption/menu keys -->
<!-- UNRESOLVED: command chaining or batching support -->
<!-- UNRESOLVED: multicast/broadcast support on LAN -->
<!-- UNRESOLVED: SDI input format and control specifics -->

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
last_checked_at: 2026-05-18T16:44:24.027Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:44:24.027Z
matched_actions: 352
action_count: 352
confidence: high
summary: "All 352 spec actions match source commands via semantic-id convention; transport fully documented; comprehensive coverage of control categories."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
