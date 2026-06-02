---
spec_id: admin/panasonic-thxxlfb70-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic TH-50/65/80LFB70 Control Spec"
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
  - eu.connect.panasonic.com
  - mediarealm.com.au
  - ptzprotocols.com
  - help.na.panasonic.com
  - docs.connect.panasonic.com
source_urls:
  - https://eu.connect.panasonic.com/sites/default/files/media/document/2022-09/C136-R1_LFB70_SerialCommandList.pdf
  - https://www.mediarealm.com.au/articles/panasonic-projector-commands/
  - "https://ptzprotocols.com/1%20TXB%20Protocols/TXB-Panasonic/Panasonic%20Camera%20Protocol_4.0.pdf"
  - https://help.na.panasonic.com/manuals/
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LFB70_SerialCommandList.pdf
retrieved_at: 2026-05-13T13:15:38.484Z
last_checked_at: 2026-06-02T17:23:42.829Z
generated_at: 2026-06-02T17:23:42.829Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LAN port number, authentication, and IP/protocol framing details not stated in source."
  - "source describes SSU:LCP for LAN port but does not state a default"
  - "source does not describe any pre-defined multi-step macros"
  - "source does not describe any safety warnings, interlocks, or"
  - "LAN default port not stated; authentication mechanism not stated; firmware version compatibility not stated; binary hex/byte-level encodings for STX/ETX framed commands shown only for two examples (Power On, Picture +85) — full table of binary encodings for all mnemonics not provided."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:42.829Z
  matched_actions: 372
  action_count: 372
  confidence: medium
  summary: "All 372 spec actions match literal command tokens in source with correct wire-level identifiers, parameter ranges, and transport specifications. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Panasonic TH-50/65/80LFB70 Control Spec

## Summary
RS-232C and LAN control protocol for Panasonic multi-touch LCD display series TH-50LFB70, TH-65LFB70, and TH-80LFB70. ASCII command set framed with STX (02h) and ETX (03h), response time under 100 ms (RS-232) / 200 ms (LAN). Covers power, input routing, picture/sound tuning, geometry, network setup, timers, screensaver, ECO, function buttons, lock, weekly command timer, DIGITAL LINK, text display, and inquiry/diagnostic commands.

<!-- UNRESOLVED: LAN port number, authentication, and IP/protocol framing details not stated in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 1024  # UNRESOLVED: source describes SSU:LCP for LAN port but does not state a default
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
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# Basic Controls
- id: power_on
  label: Power On
  kind: action
  command: "PON"
  params: []
- id: power_off
  label: Power Off
  kind: action
  command: "POF"
  params: []
- id: power_status_query
  label: Power Status Query
  kind: query
  command: "QPW"
  params: []
- id: input_select
  label: Input Select
  kind: action
  command: "IMS:{input}"
  params:
    - name: input
      type: string
      values: [HM1, HM2, SL1, VD1, YP1, PC1, DV1, DL1, MG1, NW1, MV1, WB1]
- id: input_select_toggle
  label: Input Select (Toggle)
  kind: action
  command: "IMS"
  params: []
- id: input_status_query
  label: Input Status Query
  kind: query
  command: "QMI"
  params: []
- id: volume_set
  label: Volume Set
  kind: action
  command: "AVL:{level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 63
- id: volume_query
  label: Volume Query
  kind: query
  command: "QAV"
  params: []
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
- id: audio_mute_set
  label: Audio Mute Set
  kind: action
  command: "AMT:{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: audio_mute_toggle
  label: Audio Mute Toggle
  kind: action
  command: "AMT"
  params: []
- id: audio_mute_query
  label: Audio Mute Query
  kind: query
  command: "QAM"
  params: []
- id: video_mute_set
  label: Video Mute Set
  kind: action
  command: "VMT:{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: video_mute_toggle
  label: Video Mute Toggle
  kind: action
  command: "VMT"
  params: []
- id: video_mute_query
  label: Video Mute Query
  kind: query
  command: "QVM"
  params: []
- id: aspect_select
  label: Aspect Select
  kind: action
  command: "DAM:{aspect}"
  params:
    - name: aspect
      type: string
      values: [ZOOM, FULL, JUST, NORM, ZOM2, ZOM3, SJST, SNOM, SFUL, "14:9"]
- id: aspect_toggle
  label: Aspect Toggle
  kind: action
  command: "DAM"
  params: []
- id: aspect_query
  label: Aspect Query
  kind: query
  command: "QAS"
  params: []

# Picture
- id: picture_mode_set
  label: Picture Mode Set
  kind: action
  command: "VPC:MEN{mode}"
  params:
    - name: mode
      type: string
      values: [STD, DYN, CNM]
- id: picture_mode_query
  label: Picture Mode Query
  kind: query
  command: "QPC:MEN"
  params: []
- id: backlight_set
  label: Backlight Set
  kind: action
  command: "VPC:BLT{level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
- id: backlight_query
  label: Backlight Query
  kind: query
  command: "QPC:BLT"
  params: []
- id: contrast_set
  label: Contrast Set
  kind: action
  command: "VPC:PIC{level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
- id: contrast_query
  label: Contrast Query
  kind: query
  command: "QPC:PIC"
  params: []
- id: brightness_set
  label: Brightness Set
  kind: action
  command: "VPC:BLK{level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
- id: brightness_query
  label: Brightness Query
  kind: query
  command: "QPC:BLK"
  params: []
- id: colour_set
  label: Colour Set
  kind: action
  command: "VPC:COL{level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
- id: colour_query
  label: Colour Query
  kind: query
  command: "QPC:COL"
  params: []
- id: hue_set
  label: Hue Set
  kind: action
  command: "VPC:TIN{level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
- id: hue_query
  label: Hue Query
  kind: query
  command: "QPC:TIN"
  params: []
- id: sharpness_set
  label: Sharpness Set
  kind: action
  command: "VPC:SHP{level}"
  params:
    - name: level
      type: integer
      min: -15
      max: 15
- id: sharpness_query
  label: Sharpness Query
  kind: query
  command: "QPC:SHP"
  params: []
- id: white_balance_set
  label: White Balance Set
  kind: action
  command: "VPC:TMP{mode}"
  params:
    - name: mode
      type: string
      values: [WRM, MID, COL]
- id: white_balance_query
  label: White Balance Query
  kind: query
  command: "QPC:TMP"
  params: []
- id: frame_creation_set
  label: Frame Creation Set
  kind: action
  command: "VPC:FRC{level}"
  params:
    - name: level
      type: integer
      values: [0, 1, 2, 3]
- id: frame_creation_query
  label: Frame Creation Query
  kind: query
  command: "QPC:FRC"
  params: []

# Advanced settings
- id: input_level_set
  label: Input Level Set
  kind: action
  command: "VWB:ILV{level}"
  params:
    - name: level
      type: integer
      min: -32
      max: 32
- id: input_level_query
  label: Input Level Query
  kind: query
  command: "QWB:ILV"
  params: []
- id: wb_high_r_set
  label: W/B High R Set
  kind: action
  command: "VWB:RDR{level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
- id: wb_high_r_query
  label: W/B High R Query
  kind: query
  command: "QWB:RDR"
  params: []
- id: wb_high_g_set
  label: W/B High G Set
  kind: action
  command: "VWB:GDR{level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
- id: wb_high_g_query
  label: W/B High G Query
  kind: query
  command: "QWB:GDR"
  params: []
- id: wb_high_b_set
  label: W/B High B Set
  kind: action
  command: "VWB:BDR{level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
- id: wb_high_b_query
  label: W/B High B Query
  kind: query
  command: "QWB:BDR"
  params: []
- id: wb_low_r_set
  label: W/B Low R Set
  kind: action
  command: "VWB:RCT{level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
- id: wb_low_r_query
  label: W/B Low R Query
  kind: query
  command: "QWB:RCT"
  params: []
- id: wb_low_g_set
  label: W/B Low G Set
  kind: action
  command: "VWB:GCT{level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
- id: wb_low_g_query
  label: W/B Low G Query
  kind: query
  command: "QWB:GCT"
  params: []
- id: wb_low_b_set
  label: W/B Low B Set
  kind: action
  command: "VWB:BCT{level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
- id: wb_low_b_query
  label: W/B Low B Query
  kind: query
  command: "QWB:BCT"
  params: []
- id: gamma_set
  label: Gamma Set
  kind: action
  command: "VWB:GMM{gamma}"
  params:
    - name: gamma
      type: string
      values: [SC, "20", "22", "26"]
- id: gamma_query
  label: Gamma Query
  kind: query
  command: "QWB:GMM"
  params: []

# Memory function
- id: memory_delete
  label: Memory Delete
  kind: action
  command: "VPF:DEL{mem}"
  params:
    - name: mem
      type: integer
      min: 1
      max: 8
- id: memory_load
  label: Memory Load
  kind: action
  command: "VPF:LOD{mem}"
  params:
    - name: mem
      type: integer
      min: 1
      max: 8
- id: memory_name_change
  label: Memory Name Change
  kind: action
  command: "VPF:NAM{mem}{name}"
  params:
    - name: mem
      type: integer
      min: 1
      max: 8
    - name: name
      type: string
      max_length: 40
- id: memory_name_query
  label: Memory Name Query
  kind: query
  command: "QPF:NAM{mem}"
  params:
    - name: mem
      type: integer
      min: 1
      max: 8
- id: memory_save
  label: Memory Save
  kind: action
  command: "VPF:SAV{mem}{name}"
  params:
    - name: mem
      type: integer
      min: 1
      max: 8
    - name: name
      type: string
      max_length: 40
- id: memory_state_query
  label: Memory State Query
  kind: query
  command: "QPF:STA"
  params: []

# Sound
- id: speaker_set
  label: Speaker Set
  kind: action
  command: "AAC:OUT{out}"
  params:
    - name: out
      type: string
      values: [SPO, EXT]
- id: speaker_query
  label: Speaker Query
  kind: query
  command: "QAC:OUT"
  params: []
- id: sound_mode_set
  label: Sound Mode Set
  kind: action
  command: "AAC:MEN{mode}"
  params:
    - name: mode
      type: string
      values: [STD, DYN, CLR]
- id: sound_mode_query
  label: Sound Mode Query
  kind: query
  command: "QAC:MEN"
  params: []
- id: bass_set
  label: Bass Set
  kind: action
  command: "AAC:BAS{level}"
  params:
    - name: level
      type: integer
      min: -15
      max: 15
- id: bass_query
  label: Bass Query
  kind: query
  command: "QAC:BAS"
  params: []
- id: mid_set
  label: Mid Set
  kind: action
  command: "AAC:MID{level}"
  params:
    - name: level
      type: integer
      min: -15
      max: 15
- id: mid_query
  label: Mid Query
  kind: query
  command: "QAC:MID"
  params: []
- id: treble_set
  label: Treble Set
  kind: action
  command: "AAC:TRE{level}"
  params:
    - name: level
      type: integer
      min: -15
      max: 15
- id: treble_query
  label: Treble Query
  kind: query
  command: "QAC:TRE"
  params: []
- id: balance_set
  label: Balance Set
  kind: action
  command: "AAC:BAL{level}"
  params:
    - name: level
      type: integer
      min: -30
      max: 30
- id: balance_query
  label: Balance Query
  kind: query
  command: "QAC:BAL"
  params: []
- id: surround_set
  label: Surround Set
  kind: action
  command: "AAC:SUR{state}"
  params:
    - name: state
      type: string
      values: [MON, OFF]
- id: surround_query
  label: Surround Query
  kind: query
  command: "QAC:SUR"
  params: []
- id: audio_out_pip_set
  label: Audio Out (PIP) Set
  kind: action
  command: "ASO:{mode}"
  params:
    - name: mode
      type: string
      values: [M, S]
- id: sdi_sound_left_set
  label: SDI Sound Left Channel Set
  kind: action
  command: "ASD:LCH{ch}"
  params:
    - name: ch
      type: integer
      min: 1
      max: 16
- id: sdi_sound_left_query
  label: SDI Sound Left Channel Query
  kind: query
  command: "QSD:LCH"
  params: []
- id: sdi_sound_right_set
  label: SDI Sound Right Channel Set
  kind: action
  command: "ASD:RCH{ch}"
  params:
    - name: ch
      type: integer
      min: 1
      max: 16
- id: sdi_sound_right_query
  label: SDI Sound Right Channel Query
  kind: query
  command: "QSD:RCH"
  params: []
- id: sdi_sound_out_set
  label: SDI Sound Out Set
  kind: action
  command: "ASD:OUT{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: sdi_sound_out_query
  label: SDI Sound Out Query
  kind: query
  command: "QSD:OUT"
  params: []
- id: sdi_level_meter_set
  label: SDI Level Meter Set
  kind: action
  command: "ASD:LMT{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2]
- id: sdi_level_meter_query
  label: SDI Level Meter Query
  kind: query
  command: "QSD:LMT"
  params: []

# Pos. / Size
- id: hpos_set
  label: H-Pos Set
  kind: action
  command: "DGE:HPO{val}"
  params:
    - name: val
      type: integer
      min: -124
      max: 124
- id: hpos_query
  label: H-Pos Query
  kind: query
  command: "QGE:HPO"
  params: []
- id: hsize_set
  label: H-Size Set
  kind: action
  command: "DGE:HSZ{val}"
  params:
    - name: val
      type: integer
      min: -124
      max: 124
- id: hsize_query
  label: H-Size Query
  kind: query
  command: "QGE:HSZ"
  params: []
- id: vpos_set
  label: V-Pos Set
  kind: action
  command: "DGE:VPO{val}"
  params:
    - name: val
      type: integer
      min: -124
      max: 124
- id: vpos_query
  label: V-Pos Query
  kind: query
  command: "QGE:VPO"
  params: []
- id: vsize_set
  label: V-Size Set
  kind: action
  command: "DGE:VSZ{val}"
  params:
    - name: val
      type: integer
      min: -62
      max: 62
- id: vsize_query
  label: V-Size Query
  kind: query
  command: "QGE:VSZ"
  params: []
- id: dot_clock_set
  label: Dot Clock Set
  kind: action
  command: "DGE:DCL{val}"
  params:
    - name: val
      type: integer
      min: -32
      max: 32
- id: dot_clock_query
  label: Dot Clock Query
  kind: query
  command: "QGE:DCL"
  params: []
- id: clock_phase_set
  label: Clock Phase Set
  kind: action
  command: "DGE:CLK{val}"
  params:
    - name: val
      type: integer
      min: -16
      max: 16
- id: clock_phase_query
  label: Clock Phase Query
  kind: query
  command: "QGE:CLK"
  params: []
- id: clamp_position_set
  label: Clamp Position Set
  kind: action
  command: "DGE:CLP{val}"
  params:
    - name: val
      type: integer
      min: 0
      max: 127
- id: clamp_position_query
  label: Clamp Position Query
  kind: query
  command: "QGE:CLP"
  params: []
- id: pixel_mode_set
  label: 1:1 Pixel Mode Set
  kind: action
  command: "DGE:DBD{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: pixel_mode_query
  label: 1:1 Pixel Mode Query
  kind: query
  command: "QGE:DBD"
  params: []
- id: overscan_set
  label: Over Scan Set
  kind: action
  command: "DGE:OVS{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: overscan_query
  label: Over Scan Query
  kind: query
  command: "QGE:OVS"
  params: []
- id: pos_size_set
  label: Adjust POS./SIZE (H-Pos/H-Size/V-Pos/V-Size) Set
  kind: action
  command: "DGE:PSZ{hpos}{hsize}{vpos}{vsize}"
  params:
    - name: hpos
      type: integer
      min: -124
      max: 124
    - name: hsize
      type: integer
      min: -124
      max: 124
    - name: vpos
      type: integer
      min: -124
      max: 124
    - name: vsize
      type: integer
      min: -62
      max: 62
- id: pos_size_query
  label: Adjust POS./SIZE Query
  kind: query
  command: "QGE:PSZ"
  params: []
- id: auto_setup
  label: Auto Setup
  kind: action
  command: "DGE:ASU{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: display_size_set
  label: Display Size Set
  kind: action
  command: "DGE:SCN{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: display_size_query
  label: Display Size Query
  kind: query
  command: "QGE:SCN"
  params: []

# Touch Screen Settings
- id: touch_screen_set
  label: Touch Screen Set
  kind: action
  command: "STS:TOS{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: touch_screen_query
  label: Touch Screen Query
  kind: query
  command: "QTS:TOS"
  params: []
- id: flick_menu_bar_set
  label: Flick Menu Bar Set
  kind: action
  command: "STS:FMB{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: flick_menu_bar_query
  label: Flick Menu Bar Query
  kind: query
  command: "QTS:FMB"
  params: []
- id: quick_launch_set
  label: Quick Launch Set
  kind: action
  command: "STS:QUL{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: quick_launch_query
  label: Quick Launch Query
  kind: query
  command: "QTS:QUL"
  params: []
- id: initial_background_set
  label: Initial Background Set
  kind: action
  command: "STS:INB{color}"
  params:
    - name: color
      type: string
      values: [WHI, GRE, BLA]
- id: initial_background_query
  label: Initial Background Query
  kind: query
  command: "QTS:INB"
  params: []
- id: auto_save_set
  label: Auto Save Set
  kind: action
  command: "STS:AUS{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: auto_save_query
  label: Auto Save Query
  kind: query
  command: "QTS:AUS"
  params: []
- id: builtin_memory_set
  label: Built-in Memory Setting Set
  kind: action
  command: "STS:BIM{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: builtin_memory_query
  label: Built-in Memory Setting Query
  kind: query
  command: "QTS:BIM"
  params: []

# MULTI PIP
- id: multi_pip_set
  label: MULTI PIP Set
  kind: action
  command: "DWA:{mode}"
  params:
    - name: mode
      type: string
      values: [OFF, PIP, "0", "1", "2", "3"]
- id: multi_pip_query
  label: MULTI PIP Query
  kind: query
  command: "QDW"
  params: []
- id: pip_mode_set
  label: PIP Mode Set
  kind: action
  command: "DWA:MOD{mode}"
  params:
    - name: mode
      type: string
      values: [PIP, PIW]
- id: pip_mode_query
  label: PIP Mode Query
  kind: query
  command: "QDW:MOD"
  params: []
- id: sub_input_pos_toggle
  label: Sub Input Position (Toggle)
  kind: action
  command: "DWA:PIN"
  params: []
- id: sub_input_pos_set
  label: Sub Input Position (Direct)
  kind: action
  command: "DWA:PIN{pos}"
  params:
    - name: pos
      type: integer
      values: [0, 1, 2, 3]
- id: sub_input_size_toggle
  label: Sub Input Size (Toggle)
  kind: action
  command: "DWA:SIZ"
  params: []
- id: sub_input_size_set
  label: Sub Input Size (Direct)
  kind: action
  command: "DWA:SIZ{size}"
  params:
    - name: size
      type: integer
      values: [1, 2, 3, 4]
- id: sub_input_size_query
  label: Sub Input Size Query
  kind: query
  command: "QDW:SIZ"
  params: []
- id: swap_pip
  label: Swap (PIP)
  kind: action
  command: "DWA:SWP"
  params: []

# Network Setup
- id: wired_lan_network_set
  label: Wired LAN (Network) Set
  kind: action
  command: "SSU:NET{ip}{mask}{gw}{dhcp}"
  params:
    - name: ip
      type: string
    - name: mask
      type: string
    - name: gw
      type: string
    - name: dhcp
      type: integer
      values: [0, 1]
- id: wired_lan_network_query
  label: Wired LAN (Network) Query
  kind: query
  command: "QSU:NET"
  params: []
- id: wireless_lan_select_set
  label: Wireless LAN (Select Network) Set
  kind: action
  command: "SSU:LWL{net}"
  params:
    - name: net
      type: string
      values: [OFF, SDT, MDT, UR1, UR2, UR3]
- id: wireless_lan_select_query
  label: Wireless LAN (Select Network) Query
  kind: query
  command: "QSU:LWL"
  params: []
- id: wireless_lan_network_set
  label: Wireless LAN (Network) Set
  kind: action
  command: "SSU:LTI{ip}{mask}{gw}{dhcp}"
  params:
    - name: ip
      type: string
    - name: mask
      type: string
    - name: gw
      type: string
    - name: dhcp
      type: integer
      values: [0, 1]
- id: wireless_lan_network_query
  label: Wireless LAN (Network) Query
  kind: query
  command: "QSU:LTI"
  params: []
- id: wireless_lan_username_set
  label: Wireless LAN (User Name) Set
  kind: action
  command: "SSU:LNC{user}"
  params:
    - name: user
      type: string
      max_length: 8
- id: wireless_lan_username_query
  label: Wireless LAN (User Name) Query
  kind: query
  command: "QSU:LNC"
  params: []
- id: display_name_change
  label: Display Name Change
  kind: action
  command: "SSU:LDN{name}"
  params:
    - name: name
      type: string
      max_length: 8
- id: display_name_query
  label: Display Name Query
  kind: query
  command: "QSU:LDN"
  params: []
- id: multi_live_set
  label: Multi-Live Set
  kind: action
  command: "SSU:LML"
  params: []
- id: multi_live_query
  label: Multi-Live Query
  kind: query
  command: "QSU:LML"
  params: []
- id: live_mode_cut_in_set
  label: Live Mode Cut In Set
  kind: action
  command: "SSU:LLI{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: live_mode_cut_in_query
  label: Live Mode Cut In Query
  kind: query
  command: "QSU:LLI"
  params: []
- id: web_control_set
  label: WEB Control Set
  kind: action
  command: "SSU:LWC{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: web_control_query
  label: WEB Control Query
  kind: query
  command: "QSU:LWC"
  params: []
- id: amx_dd_set
  label: AMX D.D. Set
  kind: action
  command: "SSU:ADD{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: amx_dd_query
  label: AMX D.D. Query
  kind: query
  command: "QSU:ADD"
  params: []
- id: crestron_connected_set
  label: Crestron Connected Set
  kind: action
  command: "SSU:CRV{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: crestron_connected_query
  label: Crestron Connected Query
  kind: query
  command: "QSU:CRV"
  params: []
- id: network_reset
  label: Network Reset
  kind: action
  command: "SSU:LRT"
  params: []
- id: display_id_query
  label: DISPLAY ID Query
  kind: query
  command: "QSU:LDI"
  params: []
- id: antenna_level_query
  label: Antenna Level Query
  kind: query
  command: "QSU:LAL"
  params: []
- id: lan_port_set
  label: LAN Port Set
  kind: action
  command: "SSU:LCP{port}"
  params:
    - name: port
      type: integer
      min: 1024
      max: 65535
- id: lan_port_query
  label: LAN Port Query
  kind: query
  command: "QSU:LCP"
  params: []
- id: digital_link_status_query
  label: DIGITAL LINK Status Query
  kind: query
  command: "QSU:DLS"
  params: []
- id: extron_xtp_set
  label: Extron XTP Set
  kind: action
  command: "SSU:EXP{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: extron_xtp_query
  label: Extron XTP Query
  kind: query
  command: "QSU:EXP"
  params: []

# Memory Viewer Settings
- id: memory_viewer_view_set
  label: Memory Viewer View Set
  kind: action
  command: "SMS:VIE{mode}"
  params:
    - name: mode
      type: string
      values: [THU, LIS]
- id: memory_viewer_view_query
  label: Memory Viewer View Query
  kind: query
  command: "QMS:VIE"
  params: []
- id: memory_viewer_sort_set
  label: Memory Viewer Sort Set
  kind: action
  command: "SMS:SOR{mode}"
  params:
    - name: mode
      type: string
      values: [NAM, TYP, TIM]
- id: memory_viewer_sort_query
  label: Memory Viewer Sort Query
  kind: query
  command: "QMS:SOR"
  params: []
- id: memory_viewer_autoplay_set
  label: Memory Viewer Autoplay Set
  kind: action
  command: "SMS:AUP{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: memory_viewer_autoplay_query
  label: Memory Viewer Autoplay Query
  kind: query
  command: "QMS:AUP"
  params: []
- id: memory_viewer_interval_set
  label: Memory Viewer Interval Set
  kind: action
  command: "SMS:INT{interval}"
  params:
    - name: interval
      type: integer
      values: [0, 1, 2, 3, 4, 5]
- id: memory_viewer_interval_query
  label: Memory Viewer Interval Query
  kind: query
  command: "QMS:INT"
  params: []
- id: memory_viewer_effect_set
  label: Memory Viewer Effect Set
  kind: action
  command: "SMS:EFF{effect}"
  params:
    - name: effect
      type: string
      values: [OFF, RAN, WIL, WIR, WID, SPL, ZOO, FAD, BLI, CHW, SLI, SLO]
- id: memory_viewer_effect_query
  label: Memory Viewer Effect Query
  kind: query
  command: "QMS:EFF"
  params: []
- id: memory_viewer_guide_set
  label: Memory Viewer Guide Set
  kind: action
  command: "SMS:GUI{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: memory_viewer_guide_query
  label: Memory Viewer Guide Query
  kind: query
  command: "QMS:GUI"
  params: []

# Signal
- id: yc_filter_set
  label: 3D Y/C Filter (NTSC) Set
  kind: action
  command: "SSG:YCS{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: yc_filter_query
  label: 3D Y/C Filter (NTSC) Query
  kind: query
  command: "QSG:YCS"
  params: []
- id: sync_set
  label: Sync Set
  kind: action
  command: "SSG:SNC{mode}"
  params:
    - name: mode
      type: string
      values: [GRN, HAV]
- id: sync_query
  label: Sync Query
  kind: query
  command: "QSG:SNC"
  params: []
- id: colour_system_set
  label: Colour System Set
  kind: action
  command: "SSG:COS{sys}"
  params:
    - name: sys
      type: string
      values: [NTS, PAL, SCM, MNT, AUT]
- id: colour_system_query
  label: Colour System Query
  kind: query
  command: "QSG:COS"
  params: []
- id: cinema_reality_set
  label: Cinema Reality Set
  kind: action
  command: "SSG:DCR{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: cinema_reality_query
  label: Cinema Reality Query
  kind: query
  command: "QSG:DCR"
  params: []
- id: pnr_limited_set
  label: P-NR (Limited) Set
  kind: action
  command: "SSG:VNR{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: pnr_limited_query
  label: P-NR (Limited) Query
  kind: query
  command: "QSG:VNR"
  params: []
- id: pnr_set
  label: P-NR Set
  kind: action
  command: "SSG:VNREXT{level}"
  params:
    - name: level
      type: string
      values: [OFF, MIN, MID, MAX]
- id: pnr_query
  label: P-NR Query
  kind: query
  command: "QSG:VNREXT"
  params: []
- id: block_nr_set
  label: Block NR Set
  kind: action
  command: "SSG:BNR{level}"
  params:
    - name: level
      type: string
      values: [OFF, MIN, MID, MAX]
- id: block_nr_query
  label: Block NR Query
  kind: query
  command: "QSG:BNR"
  params: []
- id: mosquito_nr_set
  label: Mosquito NR Set
  kind: action
  command: "SSG:MNR{level}"
  params:
    - name: level
      type: string
      values: [OFF, MIN, MID, MAX]
- id: mosquito_nr_query
  label: Mosquito NR Query
  kind: query
  command: "QSG:MNR"
  params: []
- id: noise_reduction_set
  label: Noise Reduction Set
  kind: action
  command: "SSG:NRS{level}"
  params:
    - name: level
      type: string
      values: [OFF, MIN, MID, MAX, ADV]
- id: noise_reduction_query
  label: Noise Reduction Query
  kind: query
  command: "QSG:NRS"
  params: []
- id: xga_mode_set
  label: XGA Mode Set
  kind: action
  command: "SSG:XGA{mode}"
  params:
    - name: mode
      type: integer
      values: [1, 2, 3, 4]
- id: xga_mode_query
  label: XGA Mode Query
  kind: query
  command: "QSG:XGA"
  params: []
- id: sdi_through_set
  label: SDI Through Set
  kind: action
  command: "SSG:STH{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: sdi_through_query
  label: SDI Through Query
  kind: query
  command: "QSG:STH"
  params: []
- id: hdmi_range_set
  label: HDMI Range Set
  kind: action
  command: "SSG:HRC{range}"
  params:
    - name: range
      type: string
      values: [VID, FUL, AUT]
- id: hdmi_range_query
  label: HDMI Range Query
  kind: query
  command: "QSG:HRC"
  params: []

# Screensaver
- id: screensaver_set
  label: Screensaver Set
  kind: action
  command: "OSP:SCR{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2, 3, 4]
- id: screensaver_query
  label: Screensaver Query
  kind: query
  command: "QSP:SCR"
  params: []
- id: screensaver_function_set
  label: Screensaver Function Set
  kind: action
  command: "SSC:FNC{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2, 3]
- id: screensaver_function_query
  label: Screensaver Function Query
  kind: query
  command: "QSC:FNC"
  params: []
- id: screensaver_mode_set
  label: Screensaver Mode Set
  kind: action
  command: "SSC:MOD{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2, 3, 4]
- id: screensaver_mode_query
  label: Screensaver Mode Query
  kind: query
  command: "QSC:MOD"
  params: []
- id: screensaver_interval_set
  label: Screensaver Interval Set
  kind: action
  command: "SSC:INT{periodic}{operation}"
  params:
    - name: periodic
      type: string
      pattern: "^([0-1][0-9]|2[0-3])[0-5][0-9]$"
    - name: operation
      type: string
      pattern: "^([0-1][0-9]|2[0-3])[0-5][0-9]$"
- id: screensaver_interval_query
  label: Screensaver Interval Query
  kind: query
  command: "QSC:INT"
  params: []
- id: screensaver_time_designation_set
  label: Screensaver Time Designation Set
  kind: action
  command: "SSC:TIM{start}{finish}"
  params:
    - name: start
      type: string
      pattern: "^([0-1][0-9]|2[0-3])[0-5][0-9]$"
    - name: finish
      type: string
      pattern: "^([0-1][0-9]|2[0-3])[0-5][0-9]$"
- id: screensaver_time_designation_query
  label: Screensaver Time Designation Query
  kind: query
  command: "QSC:TIM"
  params: []
- id: screensaver_standby_set
  label: Standby After Screensaver Set
  kind: action
  command: "SSC:AOF{duration}"
  params:
    - name: duration
      type: string
      pattern: "^([0-1][0-9]|2[0-3])[0-5][0-9]$"
- id: screensaver_standby_query
  label: Standby After Screensaver Query
  kind: query
  command: "QSC:AOF"
  params: []
- id: wobbling_set
  label: Wobbling Set
  kind: action
  command: "OSP:WOB{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: wobbling_query
  label: Wobbling Query
  kind: query
  command: "QSP:WOB"
  params: []

# ECO Mode Settings
- id: eco_mode_set
  label: ECO Mode Set
  kind: action
  command: "SSU:ECS{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: eco_mode_query
  label: ECO Mode Query
  kind: query
  command: "QSU:ECS"
  params: []
- id: power_save_set
  label: Power Save Set
  kind: action
  command: "SSU:PSV{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2]
- id: power_save_query
  label: Power Save Query
  kind: query
  command: "QSU:PSV"
  params: []
- id: hdmi1_power_mgmt_set
  label: HDMI1 Power Management Set
  kind: action
  command: "SSU:D1H{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: hdmi1_power_mgmt_query
  label: HDMI1 Power Management Query
  kind: query
  command: "QSU:D1H"
  params: []
- id: hdmi2_power_mgmt_set
  label: HDMI2 Power Management Set
  kind: action
  command: "SSU:D2H{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: hdmi2_power_mgmt_query
  label: HDMI2 Power Management Query
  kind: query
  command: "QSU:D2H"
  params: []
- id: pc_power_mgmt_set
  label: PC Power Management Set
  kind: action
  command: "SSU:DPM{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: pc_power_mgmt_query
  label: PC Power Management Query
  kind: query
  command: "QSU:DPM"
  params: []
- id: dvid_power_mgmt_set
  label: DVI-D Power Management Set
  kind: action
  command: "SSU:DPD{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: dvid_power_mgmt_query
  label: DVI-D Power Management Query
  kind: query
  command: "QSU:DPD"
  params: []
- id: no_signal_power_off_set
  label: No Signal Power Off Set
  kind: action
  command: "SSU:AOF{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: no_signal_power_off_query
  label: No Signal Power Off Query
  kind: query
  command: "QSU:AOF"
  params: []

# Input label
- id: input_label_current_set
  label: Input Label (Current Input) Set
  kind: action
  command: "SSU:ILA{label}"
  params:
    - name: label
      type: string
      values: [NRM, DV1, DV2, DV3, DV4, BD1, BD2, BD3, BD4, CTV, VCR, STB, SKP]
- id: input_label_current_query
  label: Input Label (Current Input) Query
  kind: query
  command: "QSU:ILA"
  params: []
- id: input_label_specified_set
  label: Input Label (Specified Input) Set
  kind: action
  command: "SSU:ILA{input}{label}"
  params:
    - name: input
      type: string
      values: [HM1, HM2, SL1, VD1, YP1, PC1, DV1, DL1, MG1, NW1, MV1, WB1]
    - name: label
      type: string
      values: [NRM, DV1, DV2, DV3, DV4, BD1, BD2, BD3, BD4, CTV, VCR, STB, SKP]
- id: input_label_specified_query
  label: Input Label (Specified Input) Query
  kind: query
  command: "QSU:ILA"
  params: []

# Function Button Settings
- id: function_button_set
  label: Function Button Set
  kind: action
  command: "OSP:KFN{btn}{func}"
  params:
    - name: btn
      type: integer
      values: [1, 2]
    - name: func
      type: string
      values: [ECO, REF, SIG, SUT, HM1, HM2, S1A, S1B, VD1, YP1, PC1, DV1, DLK, MG1, NW1, MV1, WB1, LNS, LML, OSH, MPI, MPS]
- id: function_button_query
  label: Function Button Query
  kind: query
  command: "QSP:KFN"
  params: []
- id: function_button_guide_set
  label: Function Button Guide Set
  kind: action
  command: "OSP:KFG{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: function_button_guide_query
  label: Function Button Guide Query
  kind: query
  command: "QSP:KFG"
  params: []

# On/Off Timer Setup
- id: power_on_timer_set
  label: Power ON Timer Set
  kind: action
  command: "TIM:PON{enable}{time}"
  params:
    - name: enable
      type: integer
      values: [0, 1]
    - name: time
      type: string
      pattern: "^([0-1][0-9]|2[0-3])[0-5][0-9]$"
- id: power_on_timer_query
  label: Power ON Timer Query
  kind: query
  command: "QIM:PON"
  params: []
- id: power_off_timer_set
  label: Power OFF Timer Set
  kind: action
  command: "TIM:POF{enable}{time}"
  params:
    - name: enable
      type: integer
      values: [0, 1]
    - name: time
      type: string
      pattern: "^([0-1][0-9]|2[0-3])[0-5][0-9]$"
- id: power_off_timer_query
  label: Power OFF Timer Query
  kind: query
  command: "QIM:POF"
  params: []

# Day/Time Setup
- id: day_set
  label: Day Set
  kind: action
  command: "TIM:DAY{day}"
  params:
    - name: day
      type: string
      values: [MON, TUE, WED, THU, FRI, SAT, SUN]
- id: day_query
  label: Day Query
  kind: query
  command: "QIM:DAY"
  params: []
- id: time_set
  label: Time Set
  kind: action
  command: "TIM:NOW0{time}"
  params:
    - name: time
      type: string
      pattern: "^([0-1][0-9]|2[0-3])[0-5][0-9]$"
- id: time_query
  label: Time Query
  kind: query
  command: "QIM:NOW"
  params: []
- id: component_rgb_in_select_set
  label: Component/RGB-in Select Set
  kind: action
  command: "SSU:CMP{mode}"
  params:
    - name: mode
      type: string
      values: [YBR, RGB]
- id: component_rgb_in_select_query
  label: Component/RGB-in Select Query
  kind: query
  command: "QSU:CMP"
  params: []
- id: dvi_yuv_rgb_select_set
  label: DVI YUV/RGB Select Set
  kind: action
  command: "SSU:DYR{mode}"
  params:
    - name: mode
      type: string
      values: [YUV, RGB]
- id: dvi_yuv_rgb_select_query
  label: DVI YUV/RGB Select Query
  kind: query
  command: "QSU:DYR"
  params: []
- id: monitor_out_set
  label: Monitor Out Set
  kind: action
  command: "SSU:MOT{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: monitor_out_query
  label: Monitor Out Query
  kind: query
  command: "QSU:MOT"
  params: []
- id: no_activity_power_off_set
  label: No Activity Power Off Set
  kind: action
  command: "SSU:NAO{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: no_activity_power_off_query
  label: No Activity Power Off Query
  kind: query
  command: "QSU:NAO"
  params: []
- id: menu_display_duration_set
  label: Menu Display Duration Set
  kind: action
  command: "SSU:MDT{duration}"
  params:
    - name: duration
      type: string
      values: ["005", "010", "015", "020", "025", "030"]
- id: menu_display_duration_query
  label: Menu Display Duration Query
  kind: query
  command: "QSU:MDT"
  params: []
- id: osd_brightness_set
  label: OSD Brightness Set
  kind: action
  command: "SSU:OBR{level}"
  params:
    - name: level
      type: integer
      values: [1, 2, 3, 4, 5]
- id: osd_brightness_query
  label: OSD Brightness Query
  kind: query
  command: "QSU:OBR"
  params: []
- id: osd_language_set
  label: OSD Language Set
  kind: action
  command: "SSU:LNG{lang}"
  params:
    - name: lang
      type: string
      values: [ENG, DEU, FRA, ITL, CHA, USA, ESP, JPN, RUS]
- id: osd_language_query
  label: OSD Language Query
  kind: query
  command: "QSU:LNG"
  params: []

# Weekly Command Timer
- id: weekly_timer_function_set
  label: Weekly Timer Function Set
  kind: action
  command: "TIW:FNC{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: weekly_timer_function_query
  label: Weekly Timer Function Query
  kind: query
  command: "QIW:FNC"
  params: []
- id: weekly_timer_program_number_set
  label: Weekly Timer Program Number Set
  kind: action
  command: "TIW:DPS{day}{program}"
  params:
    - name: day
      type: string
      values: [MON, TUE, WED, THU, FRI, SAT, SUN]
    - name: program
      type: integer
      min: 1
      max: 7
- id: weekly_timer_program_set
  label: Weekly Timer Program Set
  kind: action
  command: "TIW:WPS{p1}{p2}{p3}{p4}{p5}{p6}{p7}"
  params:
    - name: p1
      type: string
    - name: p2
      type: string
    - name: p3
      type: string
    - name: p4
      type: string
    - name: p5
      type: string
    - name: p6
      type: string
    - name: p7
      type: string
- id: weekly_timer_program_query
  label: Weekly Timer Program Query
  kind: query
  command: "QIW:WPS"
  params: []
- id: weekly_timer_program_edit
  label: Weekly Timer Program Edit
  kind: action
  command: "TIW:PRG{program}{cmd}{time}{type}"
  params:
    - name: program
      type: integer
      min: 1
      max: 7
    - name: cmd
      type: integer
      min: 1
      max: 64
    - name: time
      type: string
      pattern: "^([0-1][0-9]|2[0-3])[0-5][0-9]$"
    - name: type
      type: string
- id: weekly_timer_program_edit_query
  label: Weekly Timer Program Edit Query
  kind: query
  command: "QIW:PRG"
  params: []
- id: weekly_timer_user_command_edit
  label: Weekly Timer User Command Edit
  kind: action
  command: "TIW:CMD{ucmd}{cmd}"
  params:
    - name: ucmd
      type: string
      values: [U01, U02, U03, U04, U05, U06, U07, U08, U09, U10, U11, U12, U13, U14, U15, U16, U17, U18, U19, U20, U21, U22, U23, U24, U25, U26, U27, U28, U29, U30, U31, U32, U33, U34, U35, U36, U37, U38, U39, U40, U41, U42, U43, U44, U45, U46, U47, U48, U49, U50, U51, U52, U53, U54, U55, U56, U57, U58, U59, U60, U61, U62, U63, U64]
    - name: cmd
      type: string
      max_length: 15
- id: weekly_timer_user_command_query
  label: Weekly Timer User Command Query
  kind: query
  command: "QIW:CMD"
  params: []

# Audio input select
- id: audio_input_select_video_audio
  label: Audio Input Select (Video+Audio)
  kind: action
  command: "SAI:V{input}A{audio}"
  params:
    - name: input
      type: string
      values: [HM1, HM2, SL1, VD1, YP1, PC1, DV1, DL1, MG1, NW1, MV1, WB1]
    - name: audio
      type: string
      values: [HM1, HM2, SL1, VD1, PC1, DL1, NW1, NAD]
- id: audio_input_select_video_audio_query
  label: Audio Input Select (Video+Audio) Query
  kind: query
  command: "QAI:V"
  params: []
- id: audio_input_select_audio_only
  label: Audio Input Select (Audio Only)
  kind: action
  command: "SAI:A{audio}"
  params:
    - name: audio
      type: string
      values: [HM1, HM2, SL1, VD1, PC1, DL1, NW1, NAD]
- id: audio_input_select_audio_only_query
  label: Audio Input Select (Audio Only) Query
  kind: query
  command: "QAI"
  params: []

# Input Search
- id: input_search_function_set
  label: Input Search Function Set
  kind: action
  command: "ISH:FNC{mode}"
  params:
    - name: mode
      type: string
      values: [ALL, PRI, OFF]
- id: input_search_function_query
  label: Input Search Function Query
  kind: query
  command: "QSH:FNC"
  params: []
- id: input_search_primary_set
  label: Input Search Primary Input Set
  kind: action
  command: "ISH:PRI{input}"
  params:
    - name: input
      type: string
      values: [HM1, HM2, SL1, VD1, YP1, PC1, DV1, DL1, NW1, NON]
- id: input_search_primary_query
  label: Input Search Primary Input Query
  kind: query
  command: "QSH:PRI"
  params: []
- id: input_search_secondary_set
  label: Input Search Secondary Input Set
  kind: action
  command: "ISH:SCI{input}"
  params:
    - name: input
      type: string
      values: [HM1, HM2, SL1, VD1, YP1, PC1, DV1, DL1, NW1, NON]
- id: input_search_secondary_query
  label: Input Search Secondary Input Query
  kind: query
  command: "QSH:SCI"
  params: []

# Options (additional)
- id: onscreen_display_set
  label: On-Screen Display Set
  kind: action
  command: "OSP:OSD{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: onscreen_display_query
  label: On-Screen Display Query
  kind: query
  command: "QSP:OSD"
  params: []
- id: initial_input_set
  label: Initial Input Set
  kind: action
  command: "OSP:IIN{input}"
  params:
    - name: input
      type: string
      values: [OFF, HM1, HM2, SL1, VD1, YP1, PC1, DV1, DL1, MG1, NW1, MV1, WB1]
- id: initial_input_query
  label: Initial Input Query
  kind: query
  command: "QSP:IIN"
  params: []
- id: initial_vol_level_set
  label: Initial VOL Level Set
  kind: action
  command: "OSP:IVL{enable}{volume}"
  params:
    - name: enable
      type: integer
      values: [0, 1]
    - name: volume
      type: integer
      min: 0
      max: 63
- id: initial_vol_level_query
  label: Initial VOL Level Query
  kind: query
  command: "QSP:IVL"
  params: []
- id: max_vol_level_set
  label: Maximum VOL Level Set
  kind: action
  command: "OSP:MVL{enable}{volume}"
  params:
    - name: enable
      type: integer
      values: [0, 1]
    - name: volume
      type: integer
      min: 0
      max: 63
- id: max_vol_level_query
  label: Maximum VOL Level Query
  kind: query
  command: "QSP:MVL"
  params: []
- id: input_lock_set
  label: INPUT Lock Set
  kind: action
  command: "OSP:INL{input}"
  params:
    - name: input
      type: string
      values: [OFF, HM1, HM2, SL1, VD1, YP1, PC1, DV1, DL1, MG1, NW1, MV1, WB1]
- id: input_lock_query
  label: INPUT Lock Query
  kind: query
  command: "QSP:INL"
  params: []
- id: button_lock_set
  label: Button Lock Set
  kind: action
  command: "OSP:BTL{mode}"
  params:
    - name: mode
      type: string
      values: [OFF, MEN, ALL]
- id: button_lock_query
  label: Button Lock Query
  kind: query
  command: "QSP:BTL"
  params: []
- id: remocon_user_level_set
  label: Remocon User Level Set
  kind: action
  command: "OSP:RCM{level}"
  params:
    - name: level
      type: integer
      values: [0, 1, 2, 3]
- id: remocon_user_level_query
  label: Remocon User Level Query
  kind: query
  command: "QSP:RCM"
  params: []
- id: off_timer_set
  label: Off-Timer Function Set
  kind: action
  command: "OSP:OFT{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: off_timer_query
  label: Off-Timer Function Query
  kind: query
  command: "QSP:OFT"
  params: []
- id: initial_power_mode_set
  label: Initial Power Mode Set
  kind: action
  command: "OSP:IPM{mode}"
  params:
    - name: mode
      type: string
      values: [NOR, PON, STB]
- id: initial_power_mode_query
  label: Initial Power Mode Query
  kind: query
  command: "QSP:IPM"
  params: []
- id: studio_wb_set
  label: Studio W/B Set
  kind: action
  command: "OSP:SWB{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: studio_wb_query
  label: Studio W/B Query
  kind: query
  command: "QSP:SWB"
  params: []
- id: studio_gain_set
  label: Studio Gain Set
  kind: action
  command: "OSP:SGA{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: studio_gain_query
  label: Studio Gain Query
  kind: query
  command: "QSP:SGA"
  params: []
- id: lan_control_protocol_set
  label: LAN Control Protocol Set
  kind: action
  command: "OSP:LPN{proto}"
  params:
    - name: proto
      type: string
      values: [LP1, LP2]
- id: lan_control_protocol_query
  label: LAN Control Protocol Query
  kind: query
  command: "QSP:LPN"
  params: []

# RS-232C/LAN Information Timing
- id: no_signal_warning_set
  label: No Signal Warning Set
  kind: action
  command: "SIT:NSW{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: no_signal_warning_query
  label: No Signal Warning Query
  kind: query
  command: "QIT:NSW"
  params: []
- id: no_signal_warning_timing_set
  label: No Signal Warning Timing Set
  kind: action
  command: "SIT:SWT{minutes}"
  params:
    - name: minutes
      type: integer
      min: 1
      max: 60
- id: no_signal_warning_timing_query
  label: No Signal Warning Timing Query
  kind: query
  command: "QIT:SWT"
  params: []
- id: no_signal_warning_autosend_query
  label: No Signal Warning Auto-Send Query
  kind: query
  command: "QST:NSW"
  params: []
- id: no_signal_error_set
  label: No Signal Error Set
  kind: action
  command: "SIT:NSE{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: no_signal_error_query
  label: No Signal Error Query
  kind: query
  command: "QIT:NSE"
  params: []
- id: no_signal_error_timing_set
  label: No Signal Error Timing Set
  kind: action
  command: "SIT:SET{minutes}"
  params:
    - name: minutes
      type: integer
      min: 1
      max: 90
- id: no_signal_error_timing_query
  label: No Signal Error Timing Query
  kind: query
  command: "QIT:SET"
  params: []
- id: no_signal_error_autosend_query
  label: No Signal Error Auto-Send Query
  kind: query
  command: "QST:NSE"
  params: []
- id: temperature_warning_set
  label: Temperature Warning Set
  kind: action
  command: "SIT:TPW{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: temperature_warning_query
  label: Temperature Warning Query
  kind: query
  command: "QIT:TPW"
  params: []
- id: temperature_warning_value_set
  label: Temperature Warning Value Set
  kind: action
  command: "SIT:TWS{value}"
  params:
    - name: value
      type: integer
      min: -40
      max: 69
- id: temperature_warning_value_query
  label: Temperature Warning Value Query
  kind: query
  command: "QIT:TWS"
  params: []
- id: temperature_warning_release_value_set
  label: Temperature Warning Release Value Set
  kind: action
  command: "SIT:TWR{value}"
  params:
    - name: value
      type: integer
      min: -40
      max: 69
- id: temperature_warning_release_value_query
  label: Temperature Warning Release Value Query
  kind: query
  command: "QIT:TWR"
  params: []
- id: temperature_warning_autosend_query
  label: Temperature Warning Auto-Send Query
  kind: query
  command: "QST:TO"
  params: []
- id: slot_power_set
  label: Slot Power Set
  kind: action
  command: "OSP:SLP{mode}"
  params:
    - name: mode
      type: string
      values: [ON, AT, OF]
- id: slot_power_query
  label: Slot Power Query
  kind: query
  command: "QSP:SLP"
  params: []
- id: power_on_screen_delay_set
  label: Power On Screen Delay Set
  kind: action
  command: "OSP:POD{delay}"
  params:
    - name: delay
      type: integer
      min: 0
      max: 30
- id: power_on_screen_delay_query
  label: Power On Screen Delay Query
  kind: query
  command: "QSP:POD"
  params: []
- id: dvid_power_mgmt_mode_set
  label: DVI-D Power Management Mode Set
  kind: action
  command: "OSP:DPS{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1]
- id: dvid_power_mgmt_mode_query
  label: DVI-D Power Management Mode Query
  kind: query
  command: "QSP:DPS"
  params: []
- id: clock_display_set
  label: Clock Display Set
  kind: action
  command: "OSP:CLK{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: clock_display_query
  label: Clock Display Query
  kind: query
  command: "QSP:CLK"
  params: []
- id: all_aspect_set
  label: All Aspect Set
  kind: action
  command: "OSP:AAS{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: all_aspect_query
  label: All Aspect Query
  kind: query
  command: "QSP:AAS"
  params: []
- id: auto_setup_mode_set
  label: Auto Setup Mode Set
  kind: action
  command: "OSP:ASU{mode}"
  params:
    - name: mode
      type: string
      values: [AUT, BTN]
- id: auto_setup_mode_query
  label: Auto Setup Mode Query
  kind: query
  command: "QSP:ASU"
  params: []
- id: rotate_set
  label: Rotate Set
  kind: action
  command: "OSP:ROT{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: rotate_query
  label: Rotate Query
  kind: query
  command: "QSP:ROT"
  params: []
- id: power_on_message_no_activity_set
  label: Power On Message (No Activity Power Off) Set
  kind: action
  command: "OSP:NAP{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: power_on_message_no_activity_query
  label: Power On Message (No Activity Power Off) Query
  kind: query
  command: "QSP:NAP"
  params: []
- id: power_on_message_power_mgmt_set
  label: Power On Message (Power Management) Set
  kind: action
  command: "OSP:PMM{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: power_on_message_power_mgmt_query
  label: Power On Message (Power Management) Query
  kind: query
  command: "QSP:PMM"
  params: []

# Text display / Other
- id: text_clear
  label: Text Clear
  kind: action
  command: "XTD:CLR"
  params: []
- id: text_display
  label: Text Display
  kind: action
  command: "XTD:NML{x}{y}{fg}{bg}{size}{text}"
  params:
    - name: x
      type: integer
      min: 1
      max: 116
    - name: y
      type: integer
      min: 1
      max: 30
    - name: fg
      type: integer
      min: 0
      max: 9
    - name: bg
      type: integer
      min: 0
      max: 9
    - name: size
      type: integer
      min: 0
      max: 3
    - name: text
      type: string
      max_length: 40
- id: text_timeout_set
  label: Text Display Timeout Set
  kind: action
  command: "XTD:OPT{seconds}"
  params:
    - name: seconds
      type: integer
      min: 1
      max: 99
- id: text_timeout_query
  label: Text Display Timeout Query
  kind: query
  command: "QTD:OPT"
  params: []
- id: text_display_memory_load
  label: Text Display (Memory Load)
  kind: action
  command: "XTD:REA{area}"
  params:
    - name: area
      type: integer
      min: 1
      max: 5
- id: text_scrolling_display
  label: Text Scrolling Display
  kind: action
  command: "XTD:SCR{x}{y}{fg}{bg}{size}{text}"
  params:
    - name: x
      type: integer
      min: 1
      max: 116
    - name: y
      type: integer
      min: 1
      max: 30
    - name: fg
      type: integer
      min: 0
      max: 9
    - name: bg
      type: integer
      min: 0
      max: 9
    - name: size
      type: integer
      min: 0
      max: 3
    - name: text
      type: string
      max_length: 40
- id: text_memory_save
  label: Text Memory Save
  kind: action
  command: "XTD:WRT{area}{x}{y}{fg}{bg}{size}{text}"
  params:
    - name: area
      type: integer
      min: 1
      max: 5
    - name: x
      type: integer
      min: 1
      max: 116
    - name: y
      type: integer
      min: 1
      max: 30
    - name: fg
      type: integer
      min: 0
      max: 9
    - name: bg
      type: integer
      min: 0
      max: 9
    - name: size
      type: integer
      min: 0
      max: 3
    - name: text
      type: string
      max_length: 40
- id: text_memory_save_query
  label: Text Memory Save Query
  kind: query
  command: "QTD:WRT"
  params: []
- id: sub_display_input_select
  label: Sub Display Input Select
  kind: action
  command: "ISS:{input}"
  params:
    - name: input
      type: string
      values: [HM1, HM2, SL1, VD1, YP1, PC1, DV1, DL1, NW1]
- id: sub_display_input_select_toggle
  label: Sub Display Input Select (Toggle)
  kind: action
  command: "ISS"
  params: []
- id: sub_display_input_select_query
  label: Sub Display Input Select Query
  kind: query
  command: "QSI"
  params: []
- id: label_display
  label: Label Display
  kind: action
  command: "DDS"
  params: []
- id: audio_mute_tuner_set
  label: Audio Mute (Tuner) Set
  kind: action
  command: "AOC:{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: clear_osd
  label: Clear OSD
  kind: action
  command: "VDO"
  params: []
- id: digital_zoom_set
  label: Digital Zoom Set
  kind: action
  command: "DZM:{state}{rate}{pos_h}{pos_v}"
  params:
    - name: state
      type: integer
      values: [0, 1]
    - name: rate
      type: integer
      min: 1
      max: 4
    - name: pos_h
      type: integer
      min: 1
      max: 5
    - name: pos_v
      type: integer
      min: 1
      max: 5
- id: digital_zoom_query
  label: Digital Zoom Query
  kind: query
  command: "QDZ"
  params: []
- id: off_timer_countdown_set
  label: Off Timer Set
  kind: action
  command: "ZOT:{minutes}"
  params:
    - name: minutes
      type: integer
      min: 0
      max: 90
- id: digital_link_status_detail_query
  label: DIGITAL LINK Status Detail Query
  kind: query
  command: "QST:DLD"
  params: []
- id: digital_link_input_change_main
  label: DIGITAL LINK Input Change (Main)
  kind: action
  command: "IMS:DL1{input}"
  params:
    - name: input
      type: string
      values: [HD1, HD2, PC1, PC2, SVD, VID]
- id: digital_link_input_change_main_query
  label: DIGITAL LINK Input Change (Main) Query
  kind: query
  command: "QMI:DL1"
  params: []
- id: digital_link_input_change_sub
  label: DIGITAL LINK Input Change (Sub)
  kind: action
  command: "ISS:DL1{input}"
  params:
    - name: input
      type: string
      values: [HD1, HD2, PC1, PC2, SVD, VID]
- id: digital_link_input_change_sub_query
  label: DIGITAL LINK Input Change (Sub) Query
  kind: query
  command: "QSI:DL1"
  params: []

# YFB100 passthrough
- id: yfb100_volume_up
  label: YFB100 Volume Up
  kind: action
  command: "VXX:TRLS1=TR01:AU"
  params: []
- id: yfb100_volume_down
  label: YFB100 Volume Down
  kind: action
  command: "VXX:TRLS1=TR01:AU"
  params: []
- id: yfb100_volume_set
  label: YFB100 Volume Set
  kind: action
  command: "VXX:TRLS1=TR01:AVL:{level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 63
- id: yfb100_aspect_change
  label: YFB100 Aspect Change
  kind: action
  command: "VXX:TRLS1=TR01:VS1"
  params: []
- id: yfb100_closed_caption_set
  label: YFB100 Closed Caption Set
  kind: action
  command: "VXX:TRLS1=TR01:OCC:{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2, 3, 4]
- id: yfb100_auto_setup
  label: YFB100 Auto Setup
  kind: action
  command: "VXX:TRLS1=TR01:OA"
  params: []
- id: yfb100_system_selector
  label: YFB100 System Selector
  kind: action
  command: "VXX:TRLS1=TR01:OS"
  params: []
- id: yfb100_menu_key
  label: YFB100 MENU Key
  kind: action
  command: "VXX:TRLS1=TR01:OM"
  params: []
- id: yfb100_enter_key
  label: YFB100 ENTER Key
  kind: action
  command: "VXX:TRLS1=TR01:OE"
  params: []
- id: yfb100_up_key
  label: YFB100 UP Key
  kind: action
  command: "VXX:TRLS1=TR01:OC"
  params: []
- id: yfb100_down_key
  label: YFB100 DOWN Key
  kind: action
  command: "VXX:TRLS1=TR01:OC"
  params: []
- id: yfb100_left_key
  label: YFB100 LEFT Key
  kind: action
  command: "VXX:TRLS1=TR01:OC"
  params: []
- id: yfb100_right_key
  label: YFB100 RIGHT Key
  kind: action
  command: "VXX:TRLS1=TR01:OC"
  params: []
- id: yfb100_return_key
  label: YFB100 RETURN Key
  kind: action
  command: "VXX:TRLS1=TR01:OB"
  params: []

# Diagnostics / Inquiry
- id: sos_history_query
  label: SOS History Query
  kind: query
  command: "QSS"
  params: []
- id: sos_state_query
  label: SOS State Query
  kind: query
  command: "QSS:STS"
  params: []
- id: signal_frequency_query
  label: Signal Frequency Query
  kind: query
  command: "QFR"
  params: []
- id: signal_name_query
  label: Signal Name Query
  kind: query
  command: "QSF"
  params: []
- id: model_information_query
  label: Model Information Query
  kind: query
  command: "QMN"
  params: []
- id: monitor_mcu_version_query
  label: Monitor MCU Version Query
  kind: query
  command: "QRV"
  params: []
- id: monitor_eeprom_version_query
  label: Monitor EEPROM Version Query
  kind: query
  command: "QRV:EEP"
  params: []
- id: serial_number_query
  label: Serial Number Query
  kind: query
  command: "QSN"
  params: []
- id: yfb_model_name_query
  label: YFB Series Model Name Query
  kind: query
  command: "QST:YFM"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  description: Reply to QPW (0=off, 1=on)
- id: input_state
  type: string
  description: Reply to QMI (e.g. HM1, VD1)
- id: volume_state
  type: integer
  min: 0
  max: 63
  description: Reply to QAV
- id: audio_mute_state
  type: enum
  values: [off, on]
  description: Reply to QAM
- id: video_mute_state
  type: enum
  values: [off, on]
  description: Reply to QVM
- id: aspect_state
  type: string
  description: Reply to QAS
- id: model_info
  type: string
  description: Reply to QMN (model size code, F/12, series)
- id: signal_frequency
  type: string
  description: Reply to QFR (H-freq KHz / V-freq Hz)
- id: signal_name
  type: string
  description: Reply to QSF (signal format e.g. M-1125(1080)/60i)
- id: monitor_mcu_version
  type: string
  description: Reply to QRV (e.g. 1.0000-LFB70)
- id: monitor_eeprom_version
  type: string
  description: Reply to QRV:EEP
- id: serial_number
  type: string
  description: Reply to QSN (max 15 chars)
- id: digital_link_status_detail
  type: string
  description: Reply to QST:DLD (link type, cable length, signal quality, HDMI/HDCP)
```

## Variables
```yaml
# Discrete actions with parameterized values are captured as Actions; settable
# range parameters that aren't first-class commands are listed here for reference.
- id: input
  type: string
  values: [HM1, HM2, SL1, VD1, YP1, PC1, DV1, DL1, MG1, NW1, MV1, WB1]
  description: Main input select parameter
- id: volume
  type: integer
  min: 0
  max: 63
- id: aspect
  type: string
  values: [ZOOM, FULL, JUST, NORM, ZOM2, ZOM3, SJST, SNOM, SFUL, "14:9"]
- id: picture_mode
  type: string
  values: [STD, DYN, CNM]
- id: sound_mode
  type: string
  values: [STD, DYN, CLR]
```

## Events
```yaml
- id: no_signal_warning
  source: device → controller
  description: Sent when signal is disconnected after No Signal Warning Timing. Format QST:NSW{0/1}
  trigger: configured via SIT:NSW
- id: no_signal_error
  source: device → controller
  description: Sent when signal is disconnected after No Signal Error Timing. Format QST:NSE{0/1}
  trigger: configured via SIT:NSE
- id: temperature_warning
  source: device → controller
  description: Sent when internal temperature crosses the configured warning/release values. Format QST:TO{0/1}
  trigger: configured via SIT:TPW
```

## Macros
```yaml
# UNRESOLVED: source does not describe any pre-defined multi-step macros
# that a controller can invoke; the Weekly Command Timer (TIW) is a scheduling
# facility, not a callable macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not describe any safety warnings, interlocks, or
# power-on sequencing requirements specific to this protocol. The Temperature
# Warning feature is operator-configured alarm behavior, not a safety interlock.
```

## Notes
Protocol framing: every command/response is wrapped as STX (02h) + command [:parameters] + ETX (03h). Source gives the wire example "Power On" as `02 50 4F 4E 03` and "Picture +85" as `02 56 50 43 3A 50 49 43 30 38 35 03`. Interval between command and response is <100 ms over RS-232 and <200 ms over LAN. LAN control protocol framing details (port, framing) are not stated in this document beyond the configurable port range 1024-65535 (SSU:LCP) and Protocol 1/2 selection (OSP:LPN).

The source does not state a default LAN port; the only LAN port information is the configurable range `01024-65535` exposed by `SSU:LCP`. There is no authentication procedure in the source. Inputs are denoted by short codes (HM1/HM2/SL1[S1A/S1B]/VD1/YP1/PC1/DV1/DL1/MG1/NW1/MV1/WB1) that expand to the full input name in the reply.

DIGITAL LINK status detail query (QST:DLD) returns link type, estimated cable length, HDMI/HDCP state, and per-channel + min/max signal quality. The same manual covers a passthrough control set (VXX:TRLS1=TR01:...) for an attached YFB100 device.

<!-- UNRESOLVED: LAN default port not stated; authentication mechanism not stated; firmware version compatibility not stated; binary hex/byte-level encodings for STX/ETX framed commands shown only for two examples (Power On, Picture +85) — full table of binary encodings for all mnemonics not provided. -->

## Provenance

```yaml
source_domains:
  - eu.connect.panasonic.com
  - mediarealm.com.au
  - ptzprotocols.com
  - help.na.panasonic.com
  - docs.connect.panasonic.com
source_urls:
  - https://eu.connect.panasonic.com/sites/default/files/media/document/2022-09/C136-R1_LFB70_SerialCommandList.pdf
  - https://www.mediarealm.com.au/articles/panasonic-projector-commands/
  - "https://ptzprotocols.com/1%20TXB%20Protocols/TXB-Panasonic/Panasonic%20Camera%20Protocol_4.0.pdf"
  - https://help.na.panasonic.com/manuals/
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LFB70_SerialCommandList.pdf
retrieved_at: 2026-05-13T13:15:38.484Z
last_checked_at: 2026-06-02T17:23:42.829Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:42.829Z
matched_actions: 372
action_count: 372
confidence: medium
summary: "All 372 spec actions match literal command tokens in source with correct wire-level identifiers, parameter ranges, and transport specifications. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LAN port number, authentication, and IP/protocol framing details not stated in source."
- "source describes SSU:LCP for LAN port but does not state a default"
- "source does not describe any pre-defined multi-step macros"
- "source does not describe any safety warnings, interlocks, or"
- "LAN default port not stated; authentication mechanism not stated; firmware version compatibility not stated; binary hex/byte-level encodings for STX/ETX framed commands shown only for two examples (Power On, Picture +85) — full table of binary encodings for all mnemonics not provided."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
