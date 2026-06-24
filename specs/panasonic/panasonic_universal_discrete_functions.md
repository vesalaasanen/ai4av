---
spec_id: admin/panasonic-universal-discrete-functions
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic TH-86/75SQ1H 4K UHD LCD Display Control Spec"
manufacturer: Panasonic
model_family: TH-86SQ1H
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - TH-86SQ1H
    - TH-75SQ1H
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.connect.panasonic.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/SQ1H_SerialCommandList.pdf
  - https://docs.connect.panasonic.com/prodisplays/support/rs232c_commandlist.html
  - https://docs.connect.panasonic.com/projector/download/command/
  - https://docs.connect.panasonic.com/projector/solution/webapi/
retrieved_at: 2026-06-24T06:27:10.290Z
last_checked_at: 2026-06-24T12:07:07.071Z
generated_at: 2026-06-24T12:07:07.071Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - QSH:DIN
  - "exact firmware compatibility range not stated; \"Universal Discrete Functions\" phrase not present in this source (see Notes)"
  - "exact framing/fields of the LAN handshake packets beyond the MD5 hash string."
  - "exact response strings for most Qxx inquiry replies beyond the"
  - "none beyond the parameterized actions listed."
  - "full list of unsolicited event types beyond the three documented."
  - "no explicit multi-step sequences documented in source."
  - "no explicit safety warnings or power-on sequencing interlocks"
  - "exact firmware version compatibility range not stated in source"
  - "concrete byte layout of LAN handshake packets beyond MD5 hash string"
  - "response string formats for many inquiry commands only given as templates"
  - "no first-party document containing the exact phrase \"Universal Discrete Functions\" was located; this spec maps the closest first-party RS232C/LAN command set for the named family."
verification:
  verdict: verified
  checked_at: 2026-06-24T12:07:07.071Z
  matched_actions: 475
  action_count: 475
  confidence: medium
  summary: "All 475 spec actions confirmed in source with literal command matches; only QSH:DIN inquiry (detect digital input) is in the source but not represented as a spec action id, which is 1 extra command well below the short threshold of 5. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-24
---

# Panasonic TH-86/75SQ1H 4K UHD LCD Display Control Spec

## Summary
Panasonic 4K UHD professional LCD signage displays (TH-86SQ1H, TH-75SQ1H) controlled via RS-232C serial or LAN (TCP). This spec covers the full RS232C/LAN command list: power, input selection, picture/sound/position adjustment, multi-display, portrait, setup, network, timer, media, and diagnostic inquiry commands. Note: the entity slug `panasonic_universal_discrete_functions` is inherited from a related Crestron IR-driver product family; the actual source document covers the TH-86/75SQ1H RS232C/LAN command set.

<!-- UNRESOLVED: exact firmware compatibility range not stated; "Universal Discrete Functions" phrase not present in this source (see Notes) -->

## Transport
```yaml
# Source documents BOTH RS-232C (SERIAL) and LAN (TCP) control.
# Serial config is fully specified (Tier 1). LAN default port 1024 stated.
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # straight cable
addressing:
  port: 1024  # default LAN command port, stated in source
auth:
  type: challenge_response  # MD5 hash of challenge+password; differs Protocol1 vs Protocol2
  notes: |
    Protocol1: MD5( <8-byte random from device> + <password> ) -> 32-byte hash.
    Protocol2: MD5( <username> + ":" + <password> + ":" + <8-byte random> ) -> 32-byte hash.
    Credentials configured in display "Administrator account settings". Not stated in source.
# UNRESOLVED: exact framing/fields of the LAN handshake packets beyond the MD5 hash string.
```

## Traits
```yaml
- powerable   # PON/POF present
- routable    # IMS input select + multi-input routing present
- queryable   # many Qxx inquiry commands present
- levelable   # AVL volume, VPC picture levels present
```

## Actions
```yaml
# All command payloads use the source framing: STX + command[:params] + ETX.
# Binary framing shown once here; each `command:` field below is the literal
# command string as written in the source (between STX/ETX).
#   STX=02h, ETX=03h, ":"=3Ah. e.g. Power On full frame = 02 50 4F 4E 03.
# Source error reply: ER401. In standby, only PON/QPW respond.
# Auto-message responses (QST:* auto) are listed in Feedbacks.

# ===== Basic Control =====
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
  label: Power Status Query
  kind: query
  command: "QPW"
  params: []

- id: input_change
  label: Input Change
  kind: action
  command: "IMS:{input}"
  params:
    - name: input
      type: enum
      values: [HM1, HM2, DP1, DL1, DV1, SL1, NW1, UD1, MV1]
      description: "HM1=HDMI1, HM2=HDMI2, DP1=DisplayPort, DL1=DIGITAL LINK, DV1=DVI-D, SL1=SLOT, NW1=Screen Transfer, UD1=USB, MV1=MEMORY VIEWER"

- id: input_change_query
  label: Input Change Query
  kind: query
  command: "QMI"
  params: []

- id: digital_link_input_select_yfb
  label: Digital Link Input select for YFB Series
  kind: action
  command: "IMS:DL1{input}"
  params:
    - name: input
      type: enum
      values: [HD1, HD2, PC1, PC2, SVD, VID]
      description: "YFB100/YFB200. SVD=YFB100 only"

- id: digital_link_input_select_yfb_query
  label: Digital Link Input select for YFB Series Query
  kind: query
  command: "QMI:DL1"
  params: []

- id: audio_volume
  label: Audio Volume
  kind: action
  command: "AVL:{level}"
  params:
    - name: level
      type: integer
      range: "000-100"

- id: audio_volume_query
  label: Current Audio Volume Query
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

- id: audio_mute
  label: Audio Mute
  kind: action
  command: "AMT"
  note: "Toggle when no param; AMT:0/1 supported"
  params: []

- id: audio_mute_query
  label: Audio Mute Query
  kind: query
  command: "QAM"
  params: []

- id: video_mute
  label: Video Mute
  kind: action
  command: "VMT"
  note: "Toggle when no param; VMT:0/1 supported"
  params: []

- id: video_mute_query
  label: Video Mute Query
  kind: query
  command: "QVM"
  params: []

- id: aspect_change
  label: Aspect Change
  kind: action
  command: "DAM:{aspect}"
  params:
    - name: aspect
      type: enum
      values: [FULL, NORM, NATV, HFIT, VFIT, ZOOM, ZOM2]

- id: aspect_change_query
  label: Aspect Change Query
  kind: query
  command: "QAS"
  params: []

# ===== Picture Adjustment =====
- id: picture_mode
  label: Picture Mode
  kind: action
  command: "VPC:MEN{mode}"
  params:
    - name: mode
      type: enum
      values: [VIV, NAT, STD, SUV, GRH, DCM]

- id: picture_mode_query
  label: Picture Mode Query
  kind: query
  command: "QPC:MEN"
  params: []

- id: backlight
  label: Backlight
  kind: action
  command: "VPC:BLT{level}"
  params:
    - name: level
      type: string
      range: "000-100 or DEF"

- id: backlight_query
  label: Backlight Query
  kind: query
  command: "QPC:BLT"
  params: []

- id: picture_contrast
  label: Picture Contrast
  kind: action
  command: "VPC:PIC{level}"
  params:
    - name: level
      type: string
      range: "000-100 or DEF"

- id: picture_contrast_query
  label: Picture Contrast Query
  kind: query
  command: "QPC:PIC"
  params: []

- id: black_level_brightness
  label: Black Level Brightness
  kind: action
  command: "VPC:BLK{level}"
  params:
    - name: level
      type: string
      range: "000-100 or DEF"

- id: black_level_brightness_query
  label: Black Level Brightness Query
  kind: query
  command: "QPC:BLK"
  params: []

- id: color
  label: Color
  kind: action
  command: "VPC:COL{level}"
  params:
    - name: level
      type: string
      range: "000-100 or DEF"

- id: color_query
  label: Color Query
  kind: query
  command: "QPC:COL"
  params: []

- id: tint
  label: Tint
  kind: action
  command: "VPC:TIN{level}"
  params:
    - name: level
      type: string
      range: "000-100 or DEF"

- id: tint_query
  label: Tint Query
  kind: query
  command: "QPC:TIN"
  params: []

- id: sharpness
  label: Sharpness
  kind: action
  command: "VPC:SHP{level}"
  params:
    - name: level
      type: string
      range: "000-100 or DEF"

- id: sharpness_query
  label: Sharpness Query
  kind: query
  command: "QPC:SHP"
  params: []

- id: enhance_level
  label: Enhance level
  kind: action
  command: "VPC:SHE{level}"
  params:
    - name: level
      type: enum
      values: ["1", "2"]
      description: "1=low, 2=high"

- id: enhance_level_query
  label: Enhance level Query
  kind: query
  command: "QPC:SHE"
  params: []

- id: gamma
  label: Gamma
  kind: action
  command: "VWB:GMM{level}"
  params:
    - name: level
      type: enum
      values: ["20", "22", "24", "26"]
      description: "2.0/2.2/2.4/2.6"

- id: gamma_query
  label: Gamma Query
  kind: query
  command: "QWB:GMM"
  params: []

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "VPC:TMP{temp}"
  params:
    - name: temp
      type: enum
      values: ["032", "040", "050", "065", "075", "093", "107", NTV, U01, U02]

- id: color_temperature_query
  label: Color Temperature Query
  kind: query
  command: "QPC:TMP"
  params: []

- id: red_gain
  label: Red Gain
  kind: action
  command: "VWB:RGN{level}"
  params:
    - name: level
      type: integer
      range: "0000-0255"

- id: red_gain_query
  label: Red Gain Query
  kind: query
  command: "QWB:RGN"
  params: []

- id: green_gain
  label: Green Gain
  kind: action
  command: "VWB:GGN{level}"
  params:
    - name: level
      type: integer
      range: "0000-0255"

- id: green_gain_query
  label: Green Gain Query
  kind: query
  command: "QWB:GGN"
  params: []

- id: blue_gain
  label: Blue Gain
  kind: action
  command: "VWB:BGN{level}"
  params:
    - name: level
      type: integer
      range: "0000-0255"

- id: blue_gain_query
  label: Blue Gain Query
  kind: query
  command: "QWB:BGN"
  params: []

- id: red_bias
  label: Red Bias
  kind: action
  command: "VWB:RBS{level}"
  params:
    - name: level
      type: integer
      range: "-127 to 0128"

- id: red_bias_query
  label: Red Bias Query
  kind: query
  command: "QWB:RBS"
  params: []

- id: green_bias
  label: Green Bias
  kind: action
  command: "VWB:GBS{level}"
  params:
    - name: level
      type: integer
      range: "-127 to 0128"

- id: green_bias_query
  label: Green Bias Query
  kind: query
  command: "QWB:GBS"
  params: []

- id: blue_bias
  label: Blue Bias
  kind: action
  command: "VWB:BBS{level}"
  params:
    - name: level
      type: integer
      range: "-127 to 0128"

- id: blue_bias_query
  label: Blue Bias Query
  kind: query
  command: "QWB:BBS"
  params: []

- id: color_management
  label: color management
  kind: action
  command: "VWB:CMF{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2"]
      description: "0=off, 1=6-segment, 2=12-segment"

- id: color_management_query
  label: color management Query
  kind: query
  command: "QWB:CMF"
  params: []

- id: color_mgmt_6seg_select
  label: 6-segment color management select color
  kind: action
  command: "VWB:CML{color}{tint}{sat}{val}"
  params:
    - name: color
      type: enum
      values: [R, Y, G, C, B, M]
    - name: tint
      type: integer
      range: "-127 to 0127"
    - name: sat
      type: integer
      range: "-127 to 0127"
    - name: val
      type: integer
      range: "-127 to 0127"

- id: color_mgmt_6seg_select_query
  label: 6-segment color management select color Query
  kind: query
  command: "QWB:CML{color}"
  params: []

- id: color_mgmt_6seg_reset
  label: 6-segment color management reset
  kind: action
  command: "VWB:CMR"
  params: []

- id: color_mgmt_12seg_select
  label: 12-segment color management select color
  kind: action
  command: "VWB:CWL{color}{tint}{sat}{val}"
  params:
    - name: color
      type: enum
      values: [RR, RY, YY, YG, GG, GC, CC, CB, BB, BM, MM, MR]
    - name: tint
      type: integer
      range: "-127 to 0127"
    - name: sat
      type: integer
      range: "-127 to 0127"
    - name: val
      type: integer
      range: "-127 to 0127"

- id: color_mgmt_12seg_select_query
  label: 12-segment color management select color Query
  kind: query
  command: "QWB:CWL{color}"
  params: []

- id: color_mgmt_12seg_reset
  label: 12-segment color management reset
  kind: action
  command: "VWB:CWR"
  params: []

- id: dynamic_contrast
  label: Dynamic Contrast
  kind: action
  command: "VPC:DCO{level}"
  params:
    - name: level
      type: integer
      range: "00-10"

- id: dynamic_contrast_query
  label: Dynamic Contrast Query
  kind: query
  command: "QPC:DCO"
  params: []

- id: color_enhancement
  label: Color Enhancement
  kind: action
  command: "VPC:PAJ{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: color_enhancement_query
  label: Color Enhancement Query
  kind: query
  command: "QPC:PAJ"
  params: []

- id: blue_light_reduction
  label: Blue light reduction
  kind: action
  command: "VPC:BLR{level}"
  params:
    - name: level
      type: enum
      values: ["0", "1", "2", "3"]

- id: blue_light_reduction_query
  label: Blue light reduction Query
  kind: query
  command: "QPC:BLR"
  params: []

- id: refine_enhancer
  label: Refine enhancer
  kind: action
  command: "VPC:SRC{level}"
  params:
    - name: level
      type: enum
      values: ["0", "1", "2", "3"]

- id: refine_enhancer_query
  label: Refine enhancer Query
  kind: query
  command: "QPC:SRC"
  params: []

- id: gradation_smoother
  label: Gradation smoother
  kind: action
  command: "VPC:GRS{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: gradation_smoother_query
  label: Gradation smoother Query
  kind: query
  command: "QPC:GRS"
  params: []

- id: picture_default
  label: Default
  kind: action
  command: "VPC:DEF{mode}"
  params:
    - name: mode
      type: enum
      values: ["1", "2", "3"]
      description: "Mode1=current input/picture mode; Mode2=current input/all modes; Mode3=all inputs/all modes"

- id: frame_creation
  label: FRAME CREATION (86SQ1H only)
  kind: action
  command: "VPC:FRC{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: frame_creation_query
  label: FRAME CREATION Query
  kind: query
  command: "QPC:FRC"
  params: []

# ===== Picture Memory function =====
- id: memory_delete
  label: Memory delete
  kind: action
  command: "VPF:DEL{num}"
  params:
    - name: num
      type: integer
      range: "01-06"

- id: memory_load
  label: Memory load
  kind: action
  command: "VPF:LOD{num}"
  params:
    - name: num
      type: integer
      range: "01-06"

- id: memory_name_change
  label: Memory name change
  kind: action
  command: "VPF:NAM{num}{name}"
  params:
    - name: num
      type: integer
      range: "01-06"
    - name: name
      type: string
      description: "Max 20 ASCII chars"

- id: memory_name_change_query
  label: Memory name change Query
  kind: query
  command: "QPF:NAM{num}"
  params: []

- id: memory_save
  label: Memory save
  kind: action
  command: "VPF:SAV{num}{name}"
  params:
    - name: num
      type: integer
      range: "01-06"
    - name: name
      type: string
      description: "Max 20 ASCII chars"

- id: memory_state_query
  label: Memory state Query
  kind: query
  command: "QPF:STA"
  params: []

# ===== Sound Adjustment =====
- id: sound_output_select
  label: Output Select
  kind: action
  command: "AAC:OUT{out}"
  params:
    - name: out
      type: enum
      values: [SPO, EXS, LNO]

- id: sound_output_select_query
  label: Output Select Query
  kind: query
  command: "QAC:OUT"
  params: []

- id: sound_balance
  label: Balance
  kind: action
  command: "AAC:BAL{level}"
  params:
    - name: level
      type: integer
      range: "-20 to +20"

- id: sound_balance_query
  label: Balance Query
  kind: query
  command: "QAC:BAL"
  params: []

- id: sound_mode
  label: Sound Mode
  kind: action
  command: "AAC:MEN{mode}"
  params:
    - name: mode
      type: enum
      values: [STD, DYN, CLR]

- id: sound_mode_query
  label: Sound Mode Query
  kind: query
  command: "QAC:MEN"
  params: []

- id: sound_bass
  label: Bass
  kind: action
  command: "AAC:BAS{level}"
  params:
    - name: level
      type: integer
      range: "-20 to +20"

- id: sound_bass_query
  label: Bass Query
  kind: query
  command: "QAC:BAS"
  params: []

- id: sound_treble
  label: Treble
  kind: action
  command: "AAC:TRE{level}"
  params:
    - name: level
      type: integer
      range: "-20 to +20"

- id: sound_treble_query
  label: Treble Query
  kind: query
  command: "QAC:TRE"
  params: []

- id: sound_surround
  label: Surround
  kind: action
  command: "AAC:SUR{mode}"
  params:
    - name: mode
      type: enum
      values: [MON, OFF]

- id: sound_surround_query
  label: Surround Query
  kind: query
  command: "QAC:SUR"
  params: []

- id: sound_auto_volume
  label: Auto Volume
  kind: action
  command: "AAC:ATV{mode}"
  params:
    - name: mode
      type: enum
      values: [OFF, LOW, MID, HIG]

- id: sound_auto_volume_query
  label: Auto Volume Query
  kind: query
  command: "QAC:ATV"
  params: []

- id: sound_installation
  label: Installation
  kind: action
  command: "AAC:IST{mode}"
  params:
    - name: mode
      type: enum
      values: [STD, WMT]

- id: sound_installation_query
  label: Installation Query
  kind: query
  command: "QAC:IST"
  params: []

# ===== Position/Size Adjustment =====
- id: position_horizontal_position
  label: Horizontal Position
  kind: action
  command: "DGE:HPO{level}"
  params:
    - name: level
      type: integer
      range: "-100 to +100"

- id: position_horizontal_position_query
  label: Horizontal Position Query
  kind: query
  command: "QGE:HPO"
  params: []

- id: position_horizontal_size
  label: Horizontal Size
  kind: action
  command: "DGE:HSZ{level}"
  params:
    - name: level
      type: integer
      range: "-100 to +100"

- id: position_horizontal_size_query
  label: Horizontal Size Query
  kind: query
  command: "QGE:HSZ"
  params: []

- id: position_vertical_position
  label: Vertical Position
  kind: action
  command: "DGE:VPO{level}"
  params:
    - name: level
      type: integer
      range: "-100 to +100"

- id: position_vertical_position_query
  label: Vertical Position Query
  kind: query
  command: "QGE:VPO"
  params: []

- id: position_vertical_size
  label: Vertical Size
  kind: action
  command: "DGE:VSZ{level}"
  params:
    - name: level
      type: integer
      range: "-100 to +100"

- id: position_vertical_size_query
  label: Vertical Size Query
  kind: query
  command: "QGE:VSZ"
  params: []

- id: position_overscan
  label: Overscan
  kind: action
  command: "DGE:OVS{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: position_overscan_query
  label: Overscan Query
  kind: query
  command: "QGE:OVS"
  params: []

- id: position_size_lump_setting
  label: Pos./Size Lump Setting
  kind: action
  command: "DGE:PSZ{hpo}{hsz}{vpo}{vsz}"
  params:
    - name: hpo
      type: integer
    - name: hsz
      type: integer
    - name: vpo
      type: integer
    - name: vsz
      type: integer

- id: position_size_lump_setting_query
  label: Pos./Size Lump Setting Query
  kind: query
  command: "QGE:PSZ"
  params: []

# ===== Setup =====
- id: setup_input_lock
  label: Input lock
  kind: action
  command: "OSP:INL{input}"
  params:
    - name: input
      type: enum
      values: [OFF, HM1, HM2, DP1, DL1, DV1, SL1, NW1, UD1, MV1, MUI]

- id: setup_input_lock_query
  label: Input lock Query
  kind: query
  command: "QSP:INL"
  params: []

- id: setup_off_timer_function
  label: Off-timer function
  kind: action
  command: "OSP:OFT{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: setup_off_timer_function_query
  label: Off-timer function Query
  kind: query
  command: "QSP:OFT"
  params: []

- id: setup_no_activity_power_off
  label: No activity power off
  kind: action
  command: "SSU:NAO{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: setup_no_activity_power_off_query
  label: No activity power off Query
  kind: query
  command: "QSU:NAO"
  params: []

- id: setup_osd_language
  label: OSD Language
  kind: action
  command: "SSU:LNG{lang}"
  params:
    - name: lang
      type: enum
      values: [ENG, DEU, FRA, ITL, ESP, USA, CHA, JPN, RUS]

- id: setup_osd_language_query
  label: OSD Language Query
  kind: query
  command: "QSU:LNG"
  params: []

- id: setup_display_orientation
  label: Display Orientation
  kind: action
  command: "SSU:DOR{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2"]

- id: setup_display_orientation_query
  label: Display Orientation Query
  kind: query
  command: "QSU:DOR"
  params: []

- id: setup_display_orientation_actual_query
  label: Display Orientation (Actual) Query
  kind: query
  command: "QSU:DOV"
  params: []

- id: setup_image_rotation
  label: Image rotation
  kind: action
  command: "SSU:IMR{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: setup_image_rotation_query
  label: Image rotation Query
  kind: query
  command: "QSU:IMR"
  params: []

- id: setup_maximum_vol_level
  label: Maximum VOL level
  kind: action
  command: "OSP:MVL{func}{vol}"
  params:
    - name: func
      type: enum
      values: ["0", "1"]
    - name: vol
      type: integer
      range: "000-100"

- id: setup_maximum_vol_level_query
  label: Maximum VOL level Query
  kind: query
  command: "QSP:MVL"
  params: []

- id: setup_button_lock
  label: Button lock
  kind: action
  command: "OSP:BTL{mode}"
  params:
    - name: mode
      type: enum
      values: [OFF, MEN, ALL]

- id: setup_button_lock_query
  label: Button lock Query
  kind: query
  command: "QSP:BTL"
  params: []

- id: setup_power_button_lock
  label: POWER button lock
  kind: action
  command: "SSU:PBO{mode}"
  params:
    - name: mode
      type: enum
      values: [OFF, STB]

- id: setup_power_button_lock_query
  label: POWER button lock Query
  kind: query
  command: "QSU:PBO"
  params: []

- id: setup_power_led
  label: POWER LED
  kind: action
  command: "SSU:PLS{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: setup_power_led_query
  label: POWER LED Query
  kind: query
  command: "QSU:PLS"
  params: []

- id: setup_controller_user_level
  label: Controller User level
  kind: action
  command: "OSP:RCM{level}"
  params:
    - name: level
      type: enum
      values: ["0", "1", "2", "3"]

- id: setup_controller_user_level_query
  label: Controller User level Query
  kind: query
  command: "QSP:RCM"
  params: []

- id: setup_dvi_slot_select
  label: DVI-D/SLOT select
  kind: action
  command: "SSU:IDS{mode}"
  params:
    - name: mode
      type: enum
      values: [DV1, SL1]

- id: setup_dvi_slot_select_query
  label: DVI-D/SLOT select Query
  kind: query
  command: "QSU:IDS"
  params: []

- id: setup_use_memory_select
  label: Use memory select
  kind: action
  command: "SSU:SWM{mem}"
  params:
    - name: mem
      type: enum
      values: [USB, INT]

- id: setup_use_memory_select_query
  label: Use memory select Query
  kind: query
  command: "QSU:SWM"
  params: []

- id: setup_usb_select
  label: USB select
  kind: action
  command: "SSU:SWU{port}"
  params:
    - name: port
      type: enum
      values: [MP1, MP2]

- id: setup_usb_select_query
  label: USB select Query
  kind: query
  command: "QSU:SWU"
  params: []

- id: setup_quick_input_change_mode
  label: Quick input change mode
  kind: action
  command: "SSU:FIC{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: setup_quick_input_change_mode_query
  label: Quick input change mode Query
  kind: query
  command: "QSU:FIC"
  params: []

# ===== Multi display settings =====
- id: multi_screen_onoff
  label: Multi Screen ON/OFF
  kind: action
  command: "MDC:{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: multi_input_onoff
  label: Multi Input ON/OFF
  kind: action
  command: "MDC:MID{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: multi_input_onoff_query
  label: Multi Input ON/OFF Query
  kind: query
  command: "QDC:MID"
  params: []

- id: multi_display_type_settings
  label: Display Type settings
  kind: action
  command: "MDC:MDY{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: multi_display_type_settings_query
  label: Display Type settings Query
  kind: query
  command: "QDC:MDY"
  params: []

- id: multi_display_format
  label: Display Format
  kind: action
  command: "MDC:SDF{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2"]

- id: multi_display_format_query
  label: Display Format Query
  kind: query
  command: "QDC:SDF"
  params: []

- id: multi_screen_setup_detail
  label: Multi Screen Setup Detail
  kind: action
  command: "MDC:EXP{func}{hscale}{vscale}{bezelh}{bezelv}{location}"
  params:
    - name: func
      type: enum
      values: ["0", "1"]
    - name: hscale
      type: integer
      range: "01-10"
    - name: vscale
      type: integer
      range: "01-10"
    - name: bezelh
      type: integer
      range: "000-100"
    - name: bezelv
      type: integer
      range: "000-100"
    - name: location
      type: string
      range: "A1-J10"

- id: multi_screen_setup_detail_query
  label: Multi Screen Setup Detail Query
  kind: query
  command: "QDC:EXP"
  params: []

- id: multi_4input_setup_detail
  label: 4 input display Setup Detail
  kind: action
  command: "MDC:4IN{func}{inUL}{inUR}{inLL}{inLR}{sound}"
  params:
    - name: func
      type: enum
      values: ["0", "1"]
    - name: inUL
      type: enum
      values: [HM1, HM2, DP1, DV1, SL1]
    - name: inUR
      type: enum
      values: [HM1, HM2, DP1, DV1, SL1]
    - name: inLL
      type: enum
      values: [HM1, HM2, DP1, DV1, SL1]
    - name: inLR
      type: enum
      values: [HM1, HM2, DP1, DV1, SL1]
    - name: sound
      type: enum
      values: [OFF, UPL, UPR, LOL, LOR, AI1]

- id: multi_4input_setup_detail_query
  label: 4 input display Setup Detail Query
  kind: query
  command: "QDC:4IN"
  params: []

- id: multi_pip_setup_detail
  label: Picture in picture Setup Detail
  kind: action
  command: "MDC:PIP{func}{loc}{inMain}{inSub}{sound}"
  params:
    - name: func
      type: enum
      values: ["0", "1"]
    - name: loc
      type: enum
      values: ["0", "1", "2", "3"]
    - name: inMain
      type: enum
      values: [HM1, HM2, DP1, DV1, SL1]
    - name: inSub
      type: enum
      values: [HM1, HM2, DP1, DV1, SL1]
    - name: sound
      type: enum
      values: [OFF, MAN, SUB, AI1]

- id: multi_pip_setup_detail_query
  label: Picture in picture Setup Detail Query
  kind: query
  command: "QDC:PIP"
  params: []

- id: multi_pbp_setup_detail
  label: Picture by picture Setup Detail
  kind: action
  command: "MDC:PBP{func}{loc}{inUL}{inLR}{sound}"
  params:
    - name: func
      type: enum
      values: ["0", "1"]
    - name: loc
      type: enum
      values: ["0", "1"]
    - name: inUL
      type: enum
      values: [HM1, HM2, DP1, DV1, SL1]
    - name: inLR
      type: enum
      values: [HM1, HM2, DP1, DV1, SL1]
    - name: sound
      type: enum
      values: [OFF, IN1, IN2, AI1]

- id: multi_pbp_setup_detail_query
  label: Picture by picture Setup Detail Query
  kind: query
  command: "QDC:PBP"
  params: []

- id: multi_input_position_change
  label: Multi input display position change
  kind: action
  command: "MDC:SDP{pos}"
  params:
    - name: pos
      type: enum
      values: ["0", "1", "2", "3"]

- id: multi_input_position_change_query
  label: Multi input display position change Query
  kind: query
  command: "QDC:SDP"
  params: []

- id: multi_input_input_change
  label: Multi input display Input change
  kind: action
  command: "MDC:MIM+{index}{input}"
  params:
    - name: index
      type: integer
      range: "1-4"
    - name: input
      type: enum
      values: [HM1, HM2, DP1, DV1, SL1, PC1]

- id: multi_input_input_change_query
  label: Multi input display Input change Query
  kind: query
  command: "QDC:MIM+"
  params: []

- id: multi_input_audio_out_change
  label: Multi input Audio out change
  kind: action
  command: "MDC:MAO{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6"]

- id: multi_input_audio_out_change_query
  label: Multi input Audio out change Query
  kind: query
  command: "QDC:MAO"
  params: []

- id: multi_input_display_expansion
  label: Multi Input Display Expansion
  kind: action
  command: "MDC:MTS{mode}"
  params:
    - name: mode
      type: enum
      values: ["1", "2", "3", "4"]

- id: multi_frame_control
  label: Frame control
  kind: action
  command: "MDC:FCT{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2", "3", "4"]

- id: multi_frame_control_query
  label: Frame control Query
  kind: query
  command: "QDC:FCT"
  params: []

# ===== Portrait settings =====
- id: portrait_display
  label: Portrait display
  kind: action
  command: "DPR:{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: portrait_display_query
  label: Portrait display Query
  kind: query
  command: "QPR"
  params: []

- id: portrait_display_setup_detail_query
  label: Inquiry about Portrait display setup
  kind: query
  command: "QPR:DET"
  params: []

- id: portrait_setup_1screen
  label: Portrait display setup (Portrait 1 screen)
  kind: action
  command: "DPR:D01{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: portrait_setup_1screen_query
  label: Portrait display setup (1 screen) Query
  kind: query
  command: "QPR:D01"
  params: []

- id: portrait_setup_3screen
  label: Portrait display setup (Portrait 3 screens)
  kind: action
  command: "DPR:D03{mode}{format}{bezel}{location}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]
    - name: format
      type: enum
      values: ["1", "2", "3"]
    - name: bezel
      type: integer
      range: "000-100"
    - name: location
      type: enum
      values: ["01", "02", "03"]

- id: portrait_setup_3screen_query
  label: Portrait display setup (3 screens) Query
  kind: query
  command: "QPR:D03"
  params: []

- id: portrait_setup_landscape_3screen
  label: Portrait display setup (Landscape 3 screens)
  kind: action
  command: "DPR:DL3{mode}{format}{bezel}{location}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]
    - name: format
      type: enum
      values: ["1", "2", "3"]
    - name: bezel
      type: integer
      range: "000-100"
    - name: location
      type: enum
      values: ["01", "02", "03"]

- id: portrait_setup_landscape_3screen_query
  label: Portrait display setup (Landscape 3 screens) Query
  kind: query
  command: "QPR:DL3"
  params: []

# ===== Setup (signal/advanced) =====
- id: setup_cinema_reality
  label: Cinema Reality 3:2 Pull Down
  kind: action
  command: "SSG:DCR{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: setup_cinema_reality_query
  label: Cinema Reality 3:2 Pull Down Query
  kind: query
  command: "QSG:DCR"
  params: []

- id: setup_noise_reduction
  label: Noise Reduction
  kind: action
  command: "SSG:NRS{mode}"
  params:
    - name: mode
      type: enum
      values: [OFF, AUT, LOW, MID, HIG]

- id: setup_noise_reduction_query
  label: Noise Reduction Query
  kind: query
  command: "QSG:NRS"
  params: []

- id: setup_mpeg_noise_reduction
  label: MPEG Noise Reduction
  kind: action
  command: "SSG:MNR{mode}"
  params:
    - name: mode
      type: enum
      values: [OFF, LOW, MID, HIG]

- id: setup_mpeg_noise_reduction_query
  label: MPEG Noise Reduction Query
  kind: query
  command: "QSG:MNR"
  params: []

- id: setup_signal_range
  label: Signal Range
  kind: action
  command: "SSG:HRC{mode}"
  params:
    - name: mode
      type: enum
      values: [VID, FUL, AUT]

- id: setup_signal_range_query
  label: Signal Range Query
  kind: query
  command: "QSG:HRC"
  params: []

- id: setup_yuv_rgb_in_select
  label: YUV/RGB-IN Select
  kind: action
  command: "SSU:DYR{mode}"
  params:
    - name: mode
      type: enum
      values: [YUV, RGB, AUT]

- id: setup_yuv_rgb_in_select_query
  label: YUV/RGB-IN Select Query
  kind: query
  command: "QSU:DYR"
  params: []

- id: setup_dynamic_backlight_control
  label: Dynamic backlight control
  kind: action
  command: "SSG:DBC{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: setup_dynamic_backlight_control_query
  label: Dynamic backlight control Query
  kind: query
  command: "QSG:DBC"
  params: []

- id: setup_edid_select
  label: EDID select
  kind: action
  command: "SSG:EID{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2", "3"]

- id: setup_edid_select_query
  label: EDID select Query
  kind: query
  command: "QSG:EID"
  params: []

- id: setup_dynamic_range
  label: Dynamic range
  kind: action
  command: "SSG:DNR{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2", "3"]

- id: setup_dynamic_range_query
  label: Dynamic range Query
  kind: query
  command: "QSG:DNR"
  params: []

- id: setup_colour_gamut
  label: Colour gamut
  kind: action
  command: "SSG:CLG{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2"]

- id: setup_colour_gamut_query
  label: Colour gamut Query
  kind: query
  command: "QSG:CLG"
  params: []

# ===== Power on settings =====
- id: poweron_initial_input
  label: Initial input
  kind: action
  command: "OSP:IIN{input}"
  params:
    - name: input
      type: enum
      values: [OFF, HM1, HM2, DP1, DL1, DV1, SL1, NW1, UD1, MV1, MUI]

- id: poweron_initial_input_query
  label: Initial input Query
  kind: query
  command: "QSP:IIN"
  params: []

- id: poweron_initial_startup
  label: Initial Startup
  kind: action
  command: "OSP:ISU{mode}"
  params:
    - name: mode
      type: enum
      values: [LST, PON, STB]

- id: poweron_initial_startup_query
  label: Initial Startup Query
  kind: query
  command: "QSP:ISU"
  params: []

- id: poweron_initial_vol_level
  label: Initial VOL level
  kind: action
  command: "OSP:IVL{func}{vol}"
  params:
    - name: func
      type: enum
      values: ["0", "1"]
    - name: vol
      type: integer
      range: "000-100"

- id: poweron_initial_vol_level_query
  label: Initial VOL level Query
  kind: query
  command: "QSP:IVL"
  params: []

- id: poweron_screen_delay
  label: Power ON Screen Delay
  kind: action
  command: "OSP:POD{delay}"
  params:
    - name: delay
      type: string
      range: "AT or 00-30"

- id: poweron_screen_delay_query
  label: Power ON Screen Delay Query
  kind: query
  command: "QSP:POD"
  params: []

- id: poweron_info_no_activity
  label: Information (No activity power off)
  kind: action
  command: "OSP:NAP{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: poweron_info_no_activity_query
  label: Information (No activity power off) Query
  kind: query
  command: "QSP:NAP"
  params: []

- id: poweron_info_power_management
  label: Information (Power management)
  kind: action
  command: "OSP:PMM{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: poweron_info_power_management_query
  label: Information (Power management) Query
  kind: query
  command: "QSP:PMM"
  params: []

- id: poweron_info_upside_down
  label: Information (Display upside-down)
  kind: action
  command: "OSP:DUD{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: poweron_info_upside_down_query
  label: Information (Display upside-down) Query
  kind: query
  command: "QSP:DUD"
  params: []

- id: poweron_quick_start
  label: Quick start
  kind: action
  command: "SSU:QST{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: poweron_quick_start_query
  label: Quick start Query
  kind: query
  command: "QSU:QST"
  params: []

# ===== Input search =====
- id: input_search
  label: Input search
  kind: action
  command: "ISH:FNC{mode}"
  params:
    - name: mode
      type: enum
      values: [OFF, ALL, PRI, IDC]

- id: input_search_query
  label: Input search Query
  kind: query
  command: "QSH:FNC"
  params: []

- id: input_search_1st
  label: 1st search input
  kind: action
  command: "ISH:PRI{input}"
  params:
    - name: input
      type: enum
      values: [NON, HM1, HM2, DP1, DL1, DV1, SL1, UD1]

- id: input_search_1st_query
  label: 1st search input Query
  kind: query
  command: "QSH:PRI"
  params: []

- id: input_search_2nd
  label: 2nd search input
  kind: action
  command: "ISH:SCI{input}"
  params:
    - name: input
      type: enum
      values: [NON, HM1, HM2, DP1, DL1, DV1, SL1, UD1]

- id: input_search_2nd_query
  label: 2nd search input Query
  kind: query
  command: "QSH:SCI"
  params: []

- id: input_search_detect_digital
  label: Detect digital input
  kind: action
  command: "ISH:DIN{input}+{mode}"
  params:
    - name: input
      type: enum
      values: [HM1, HM2, DP1, DL1, DV1]
    - name: mode
      type: enum
      values: ["0", "1"]

- id: input_search_changing_delay
  label: Changing delay (input search)
  kind: action
  command: "ISH:CGD{delay}"
  params:
    - name: delay
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]

- id: input_search_changing_delay_query
  label: Changing delay (input search) Query
  kind: query
  command: "QSH:CGD"
  params: []

# ===== Failover / Failback =====
- id: failover_mode_off
  label: Input Change Mode Off
  kind: action
  command: "SBI:OFF"
  params: []

- id: failover_mode_quick
  label: Input Change Mode Quick
  kind: action
  command: "SBI:QIC"
  params:
    - name: primary
      type: enum
      values: [NON, HM1, HM2, DP1, DV1, SL1]
    - name: secondary
      type: enum
      values: [NON, HM1, HM2, DP1, DV1, SL1]
    - name: autoswitchback
      type: enum
      values: ["0", "1"]

- id: failover_mode_normal
  label: Input Change Mode Normal
  kind: action
  command: "SBI:NOR"
  params:
    - name: primary
      type: enum
      values: [NON, HM1, HM2, DP1, DL1, DV1, SL1, UD1]
    - name: secondary
      type: enum
      values: [NON, HM1, HM2, DP1, DL1, DV1, SL1, UD1]
    - name: autoswitchback
      type: enum
      values: ["0", "1"]

- id: failover_changing_mode
  label: Changing mode
  kind: action
  command: "SBI:CHM{mode}"
  params:
    - name: mode
      type: enum
      values: ["2", "1"]
      description: "2=High speed, 1=Normal speed"

- id: failover_status_query
  label: Failover mode Query
  kind: query
  command: "QBI"
  params: []

- id: failover_backup_input_status_query
  label: Backup Input Status Query
  kind: query
  command: "QBI:STS"
  params: []

- id: failover_backup_input_signal_query
  label: Backup Input Signal Status Query
  kind: query
  command: "QBI:SIG"
  params: []

- id: failover_manual_switch_back
  label: Manual Switch Back
  kind: action
  command: "BIP:FSB"
  params: []

# ===== Screensaver =====
- id: screensaver_onoff
  label: Screensaver ON/OFF
  kind: action
  command: "OSP:SCR{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "5"]

- id: screensaver_onoff_query
  label: Screensaver ON/OFF Query
  kind: query
  command: "QSP:SCR"
  params: []

- id: screensaver_mode
  label: Screensaver Mode
  kind: action
  command: "SSC:MOD{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2", "3", "4"]

- id: screensaver_mode_query
  label: Screensaver Mode Query
  kind: query
  command: "QSC:MOD"
  params: []

- id: screensaver_interval
  label: Interval Screensaver
  kind: action
  command: "SSC:INT{periodic}{operating}"
  params:
    - name: periodic
      type: string
      range: "0000-2359"
    - name: operating
      type: string
      range: "0000-2359"

- id: screensaver_interval_query
  label: Interval Screensaver Query
  kind: query
  command: "QSC:INT"
  params: []

- id: screensaver_time_designation
  label: Time Designation Screensaver
  kind: action
  command: "SSC:TIM{start}{finish}"
  params:
    - name: start
      type: string
      range: "0000-2359"
    - name: finish
      type: string
      range: "0000-2359"

- id: screensaver_time_designation_query
  label: Time Designation Screensaver Query
  kind: query
  command: "QSC:TIM"
  params: []

- id: screensaver_standby_after
  label: Standby after Screensaver
  kind: action
  command: "SSC:AOF{time}"
  params:
    - name: time
      type: string
      range: "0000-2359"

- id: screensaver_standby_after_query
  label: Standby after Screensaver Query
  kind: query
  command: "QSC:AOF"
  params: []

- id: screensaver_wobbling
  label: Wobbling
  kind: action
  command: "OSP:WOB{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: screensaver_wobbling_query
  label: Wobbling Query
  kind: query
  command: "QSP:WOB"
  params: []

# ===== Input label =====
- id: input_label_current
  label: Set Label for Current Input
  kind: action
  command: "SSU:ILA{label}"
  params:
    - name: label
      type: enum
      values: [INP, DV1, DV2, DV3, BD1, BD2, BD3, CTV, VCR, STB, SKP]

- id: input_label_current_query
  label: Set Label for Current Input Query
  kind: query
  command: "QSU:ILA"
  params: []

- id: input_label_each
  label: Set Label for EACH INPUT
  kind: action
  command: "SSU:ILA{input}{label}"
  params:
    - name: input
      type: enum
      values: [HM1, HM2, DP1, DL1, DV1, SL1]
    - name: label
      type: enum
      values: [INP, PCN, DV1, DV2, DV3, BD1, BD2, BD3, CTV, VCR, STB, SKP]

- id: input_label_each_query
  label: Set Label for EACH INPUT Query
  kind: query
  command: "QSU:ILA{input}"
  params: []

# ===== Audio input select =====
- id: audio_input_select_current
  label: Audio input select for Current Input
  kind: action
  command: "SAI:A{audio}"
  params:
    - name: audio
      type: enum
      values: [HM1, HM2, DP1, DL1, SL1, NW1, AI1, NAD]

- id: audio_input_select_each
  label: Audio input select for EACH INPUT
  kind: action
  command: "SAI:V{video}A{audio}"
  params:
    - name: video
      type: enum
      values: [HM1, HM2, DP1, DL1, DV1, SL1, NW1]
    - name: audio
      type: enum
      values: [HM1, HM2, DP1, DL1, SL1, NW1, AI1, NAD]

- id: audio_input_select_query
  label: Audio input select Query
  kind: query
  command: "QAI"
  params: []

# ===== Power management settings =====
- id: powermgmt_mode
  label: Power Management Mode
  kind: action
  command: "SSU:ECS{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2"]

- id: powermgmt_mode_query
  label: Power Management Mode Query
  kind: query
  command: "QSU:ECS"
  params: []

- id: powermgmt_no_signal_power_off
  label: No Signal Power Off
  kind: action
  command: "SSU:AOF{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: powermgmt_no_signal_power_off_query
  label: No Signal Power Off Query
  kind: query
  command: "QSU:AOF"
  params: []

- id: powermgmt_hdmi1
  label: HDMI1 Power Management
  kind: action
  command: "SSU:D1H{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: powermgmt_hdmi1_query
  label: HDMI1 Power Management Query
  kind: query
  command: "QSU:D1H"
  params: []

- id: powermgmt_hdmi2
  label: HDMI2 Power Management
  kind: action
  command: "SSU:D2H{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: powermgmt_hdmi2_query
  label: HDMI2 Power Management Query
  kind: query
  command: "QSU:D2H"
  params: []

- id: powermgmt_displayport
  label: DisplayPort Power Management
  kind: action
  command: "SSU:D1P{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: powermgmt_displayport_query
  label: DisplayPort Power Management Query
  kind: query
  command: "QSU:D1P"
  params: []

- id: powermgmt_digital_link
  label: DIGITAL LINK Power Management
  kind: action
  command: "SSU:D1L{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: powermgmt_digital_link_query
  label: DIGITAL LINK Power Management Query
  kind: query
  command: "QSU:D1L"
  params: []

- id: powermgmt_dvid
  label: DVI-D Power Management
  kind: action
  command: "SSU:D1V{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: powermgmt_dvid_query
  label: DVI-D Power Management Query
  kind: query
  command: "QSU:D1V"
  params: []

- id: powermgmt_power_save
  label: Power Save
  kind: action
  command: "SSU:ECO{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: powermgmt_power_save_query
  label: Power Save Query
  kind: query
  command: "QSU:ECO"
  params: []

- id: powermgmt_extended_standby
  label: Extended standby mode
  kind: action
  command: "SSU:ESM{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: powermgmt_extended_standby_query
  label: Extended standby mode Query
  kind: query
  command: "QSU:ESM"
  params: []

- id: powermgmt_changing_delay
  label: Changing delay (power mgmt)
  kind: action
  command: "SSU:CGD{delay}"
  params:
    - name: delay
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]

- id: powermgmt_changing_delay_query
  label: Changing delay (power mgmt) Query
  kind: query
  command: "QSU:CGD"
  params: []

# ===== External device link =====
- id: extdev_device_info
  label: Device Information
  kind: action
  command: "SSU:DDP{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: extdev_device_info_query
  label: Device Information Query
  kind: query
  command: "QSU:DDP"
  params: []

- id: extdev_wireless_presentation_link
  label: Wireless presentation link
  kind: action
  command: "SSU:WIS{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: extdev_wireless_presentation_link_query
  label: Wireless presentation link Query
  kind: query
  command: "QSU:WIS"
  params: []

# ===== HDMI-CEC settings =====
- id: hdmi_cec_control
  label: HDMI-CEC control
  kind: action
  command: "SHC:FNC{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: hdmi_cec_control_query
  label: HDMI-CEC control Query
  kind: query
  command: "QHC:FNC"
  params: []

- id: hdmi_cec_hdmi1_change
  label: HDMI1 (change device)
  kind: action
  command: "SHC:HM1{mode}"
  params:
    - name: mode
      type: enum
      values: [NXT, PRE]

- id: hdmi_cec_hdmi1_name_query
  label: HDMI1 (get device name) Query
  kind: query
  command: "QHC:HM1"
  params: []

- id: hdmi_cec_hdmi2_change
  label: HDMI2 (change device)
  kind: action
  command: "SHC:HM2{mode}"
  params:
    - name: mode
      type: enum
      values: [NXT, PRE]

- id: hdmi_cec_hdmi2_name_query
  label: HDMI2 (get device name) Query
  kind: query
  command: "QHC:HM2"
  params: []

- id: hdmi_cec_slot_change
  label: SLOT (change device)
  kind: action
  command: "SHC:SL1{mode}"
  params:
    - name: mode
      type: enum
      values: [NXT, PRE]

- id: hdmi_cec_slot_name_query
  label: SLOT (get device name) Query
  kind: query
  command: "QHC:SL1"
  params: []

- id: hdmi_cec_menu_code
  label: MENU code
  kind: action
  command: "SHC:MNC{code}"
  params:
    - name: code
      type: enum
      values: ["1", "2", "3", "4", "5", "6"]

- id: hdmi_cec_menu_code_query
  label: MENU code Query
  kind: query
  command: "QHC:MNC"
  params: []

- id: hdmi_cec_display_to_device
  label: Display -> Device
  kind: action
  command: "SHC:PTS{mode}"
  params:
    - name: mode
      type: enum
      values: [OFF, POF, PWR]

- id: hdmi_cec_display_to_device_query
  label: Display -> Device Query
  kind: query
  command: "QHC:PTS"
  params: []

- id: hdmi_cec_device_to_display
  label: Device -> Display
  kind: action
  command: "SHC:STP{mode}"
  params:
    - name: mode
      type: enum
      values: [OFF, PON, PWR]

- id: hdmi_cec_device_to_display_query
  label: Device -> Display Query
  kind: query
  command: "QHC:STP"
  params: []

# ===== Image settings / Startup image =====
- id: startup_image_display_setting
  label: Startup image Display setting
  kind: action
  command: "SCI:SIM{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: startup_image_display_setting_query
  label: Startup image Display setting Query
  kind: query
  command: "QCI:SIM"
  params: []

- id: startup_image_select
  label: Startup image Image select
  kind: action
  command: "SCI:SCG{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: startup_image_select_query
  label: Startup image Image select Query
  kind: query
  command: "QCI:SCG"
  params: []

# ===== Image settings / No signal image =====
- id: nosignal_image_display_setting
  label: No signal image Display setting
  kind: action
  command: "SCI:NIM{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: nosignal_image_display_setting_query
  label: No signal image Display setting Query
  kind: query
  command: "QCI:NIM"
  params: []

- id: nosignal_image_select
  label: No signal image Image select
  kind: action
  command: "SCI:NCG{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: nosignal_image_select_query
  label: No signal image Image select Query
  kind: query
  command: "QCI:NCG"
  params: []

# ===== Set up timer =====
- id: timer_setup_detail
  label: Timer Setup Detail
  kind: action
  command: "TIM:PRG{prog}{func}{day}{action}{time}{input}"
  params:
    - name: prog
      type: integer
      range: "01-20"
    - name: func
      type: enum
      values: ["0", "1"]
    - name: day
      type: enum
      values: [SUN, MON, TUE, WED, THU, FRI, SAT, EVD, WDA, WEN, CUS]
    - name: action
      type: enum
      values: [PON, POF]
    - name: time
      type: string
      range: "0000-2359"
    - name: input
      type: enum
      values: [HM1, HM2, DP1, DL1, DV1, SL1, NW1, UD1, MV1, MUI]

- id: timer_setup_detail_query
  label: Timer Setup Detail Query
  kind: query
  command: "QIM:PRG{prog}"
  params: []

- id: timer_multiple_day
  label: Multiple day specification
  kind: action
  command: "TIM:PRC{prog}{func}{mon}{tue}{wed}{thu}{fri}{sat}{sun}{action}{time}{input}"
  params:
    - name: prog
      type: integer
      range: "01-20"
    - name: func
      type: enum
      values: ["0", "1"]
    - name: mon
      type: enum
      values: ["0", "1"]
    - name: tue
      type: enum
      values: ["0", "1"]
    - name: wed
      type: enum
      values: ["0", "1"]
    - name: thu
      type: enum
      values: ["0", "1"]
    - name: fri
      type: enum
      values: ["0", "1"]
    - name: sat
      type: enum
      values: ["0", "1"]
    - name: sun
      type: enum
      values: ["0", "1"]
    - name: action
      type: enum
      values: [PON, POF]
    - name: time
      type: string
      range: "0000-2359"
    - name: input
      type: enum
      values: [HM1, HM2, DP1, DL1, DV1, SL1, NW1, UD1, MV1, MUI]

- id: timer_multiple_day_query
  label: Multiple day specification Query
  kind: query
  command: "QIM:PRC{prog}"
  params: []

# ===== Date and time =====
- id: datetime_present_day_query
  label: Present Day Query
  kind: query
  command: "QIM:DAY"
  params: []

- id: datetime_present_time_query
  label: Present Time Query
  kind: query
  command: "QIM:NOW"
  params: []

- id: datetime_daytime
  label: DAY TIME
  kind: action
  command: "TIM:DAT{year}{month}{day}{hour}{minute}"
  params:
    - name: year
      type: integer
      range: "2020-2035"
    - name: month
      type: integer
      range: "01-12"
    - name: day
      type: integer
      range: "01-31"
    - name: hour
      type: integer
      range: "00-23"
    - name: minute
      type: integer
      range: "00-59"

- id: datetime_daytime_query
  label: DAY TIME Query
  kind: query
  command: "QIM:DAT"
  params: []

- id: datetime_clock_display
  label: Clock Display
  kind: action
  command: "OSP:CLK{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: datetime_clock_display_query
  label: Clock Display Query
  kind: query
  command: "QSP:CLK"
  params: []

- id: datetime_synchronize_display
  label: Synchronize display
  kind: action
  command: "TIM:SDM{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: datetime_synchronize_display_query
  label: Synchronize display Query
  kind: query
  command: "QIM:SDM"
  params: []

- id: datetime_parent_child
  label: Parent or child setting
  kind: action
  command: "TIM:PCS{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: datetime_parent_child_query
  label: Parent or child setting Query
  kind: query
  command: "QIM:PCS"
  params: []

# ===== Network settings =====
- id: network_serial_control
  label: Serial Control
  kind: action
  command: "SCT:SEC{src}"
  params:
    - name: src
      type: enum
      values: [SE1, DL1, SL1]

- id: network_serial_control_query
  label: Serial Control Query
  kind: query
  command: "QCT:SEC"
  params: []

- id: network_control
  label: Network Control
  kind: action
  command: "SSU:NCT{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: network_control_query
  label: Network Control Query
  kind: query
  command: "QSU:NCT"
  params: []

- id: network_pjlink_control
  label: PJLink Control
  kind: action
  command: "SSU:PCT{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: network_pjlink_control_query
  label: PJLink Control Query
  kind: query
  command: "QSU:PCT"
  params: []

- id: network_pjlink_notification
  label: PJLink Notification
  kind: action
  command: "SSU:PNT{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: network_pjlink_notification_query
  label: PJLink Notification Query
  kind: query
  command: "QSU:PNT"
  params: []

- id: network_pjlink_notified_ip
  label: PJLink Notified IP Address
  kind: action
  command: "SSU:PIA{index}{b1}{b2}{b3}{b4}"
  params:
    - name: index
      type: enum
      values: ["1", "2"]
    - name: b1
      type: integer
      range: "000-255"
    - name: b2
      type: integer
      range: "000-255"
    - name: b3
      type: integer
      range: "000-255"
    - name: b4
      type: integer
      range: "000-255"

- id: network_pjlink_notified_ip_query
  label: PJLink Notified IP Address Query
  kind: query
  command: "QSU:PIA"
  params: []

- id: network_auto_display_name
  label: Auto Display Name
  kind: action
  command: "SSU:ADN{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: network_auto_display_name_query
  label: Auto Display Name Query
  kind: query
  command: "QSU:ADN"
  params: []

- id: network_display_name
  label: Display name
  kind: action
  command: "SSU:LDN{name}"
  params:
    - name: name
      type: string
      description: "DISPLAY NAME (Max 8 ASCII chars)"

- id: network_display_name_query
  label: Display name Query
  kind: query
  command: "QSU:LDN"
  params: []

- id: network_lan_address
  label: LAN Setup - Network Address
  kind: action
  command: "SSU:NET{ip1}{ip2}{ip3}{ip4}{sm1}{sm2}{sm3}{sm4}{gw1}{gw2}{gw3}{gw4}{dhcp}"
  params:
    - name: ip1
      type: integer
      range: "000-255"
    - name: ip2
      type: integer
      range: "000-255"
    - name: ip3
      type: integer
      range: "000-255"
    - name: ip4
      type: integer
      range: "000-255"
    - name: sm1
      type: integer
      range: "000-255"
    - name: sm2
      type: integer
      range: "000-255"
    - name: sm3
      type: integer
      range: "000-255"
    - name: sm4
      type: integer
      range: "000-255"
    - name: gw1
      type: integer
      range: "000-255"
    - name: gw2
      type: integer
      range: "000-255"
    - name: gw3
      type: integer
      range: "000-255"
    - name: gw4
      type: integer
      range: "000-255"
    - name: dhcp
      type: enum
      values: ["0", "1"]

- id: network_lan_address_query
  label: LAN Setup - Network Address Query
  kind: query
  command: "QSU:NET"
  params: []

- id: network_lan_command_port
  label: LAN Setup - Command Port Number
  kind: action
  command: "SSU:LCP{port}"
  params:
    - name: port
      type: integer
      range: "01024-65535"

- id: network_lan_command_port_query
  label: LAN Setup - Command Port Number Query
  kind: query
  command: "QSU:LCP"
  params: []

- id: network_digital_link_mode
  label: DIGITAL LINK Mode
  kind: action
  command: "SSU:DLM{mode}"
  params:
    - name: mode
      type: enum
      values: [AT, DL, EN, LR]

- id: network_digital_link_mode_query
  label: DIGITAL LINK Mode Query
  kind: query
  command: "QSU:DLM"
  params: []

- id: network_digital_link_ethernet
  label: DIGITAL LINK (Ethernet Control)
  kind: action
  command: "SSU:DLC{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: network_digital_link_ethernet_query
  label: DIGITAL LINK (Ethernet Control) Query
  kind: query
  command: "QSU:DLC"
  params: []

- id: network_digital_link_status_query
  label: DIGITAL LINK STATUS Query
  kind: query
  command: "QSU:DLS"
  params: []

- id: network_amx_dd
  label: AMX D.D.
  kind: action
  command: "SSU:ADD{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: network_amx_dd_query
  label: AMX D.D. Query
  kind: query
  command: "QSU:ADD"
  params: []

- id: network_crestron_connected
  label: Crestron Connected
  kind: action
  command: "SSU:CRV{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: network_crestron_connected_query
  label: Crestron Connected Query
  kind: query
  command: "QSU:CRV"
  params: []

- id: network_extron_xtp
  label: Extron XTP
  kind: action
  command: "SSU:EXP{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: network_extron_xtp_query
  label: Extron XTP Query
  kind: query
  command: "QSU:EXP"
  params: []

- id: network_usb_memory_network
  label: USB memory network settings
  kind: action
  command: "SSU:UNS{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: network_usb_memory_network_query
  label: USB memory network settings Query
  kind: query
  command: "QSU:UNS"
  params: []

- id: network_lan_control_protocol
  label: LAN Control Protocol
  kind: action
  command: "OSP:LPN{protocol}"
  params:
    - name: protocol
      type: enum
      values: [LP1, LP2]

- id: network_lan_control_protocol_query
  label: LAN Control Protocol Query
  kind: query
  command: "QSP:LPN"
  params: []

- id: network_reset
  label: Reset (LAN)
  kind: action
  command: "SSU:LRT"
  params: []

# ===== USB media player settings =====
- id: usb_player_enable
  label: USB media player
  kind: action
  command: "SUS:UMP{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: usb_player_enable_query
  label: USB media player Query
  kind: query
  command: "QUS:UMP"
  params: []

- id: usb_player_schedule_play
  label: Schedule play function
  kind: action
  command: "SUS:SPF{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: usb_player_schedule_play_query
  label: Schedule play function Query
  kind: query
  command: "QUS:SPF"
  params: []

- id: usb_player_video_playback_mode
  label: Video Playback Mode
  kind: action
  command: "SUS:VPB{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: usb_player_video_playback_mode_query
  label: Video Playback Mode Query
  kind: query
  command: "QUS:VPB"
  params: []

- id: usb_player_still_rotation
  label: Still picture rotation
  kind: action
  command: "SUS:STR{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2"]

- id: usb_player_still_rotation_query
  label: Still picture rotation Query
  kind: query
  command: "QUS:STR"
  params: []

- id: usb_player_resume_play
  label: Resume play
  kind: action
  command: "SUS:RSP{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: usb_player_resume_play_query
  label: Resume play Query
  kind: query
  command: "QUS:RSP"
  params: []

- id: usb_player_slideshow_duration
  label: Slide show duration
  kind: action
  command: "SUS:SSD{duration}"
  params:
    - name: duration
      type: integer
      range: "010-600"

- id: usb_player_slideshow_duration_query
  label: Slide show duration Query
  kind: query
  command: "QUS:SSD"
  params: []

- id: usb_player_play_mode
  label: Play mode
  kind: action
  command: "SUS:SPM{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: usb_player_play_mode_query
  label: Play mode Query
  kind: query
  command: "QUS:SPM"
  params: []

- id: usb_player_schedule_play_mode_query
  label: get Schedule play mode Query
  kind: query
  command: "QUS:CMS"
  params: []

# ===== Memory viewer settings =====
- id: memviewer_function
  label: Memory viewer function
  kind: action
  command: "SMS:MVF{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: memviewer_function_query
  label: Memory viewer function Query
  kind: query
  command: "QMS:MVF"
  params: []

- id: memviewer_view
  label: View
  kind: action
  command: "SMS:VIE{view}"
  params:
    - name: view
      type: enum
      values: [THU, LIS]

- id: memviewer_view_query
  label: View Query
  kind: query
  command: "QMS:VIE"
  params: []

- id: memviewer_content_select
  label: Content select
  kind: action
  command: "SMS:CON{type}"
  params:
    - name: type
      type: enum
      values: [STL, VID, AUD, ALL, SAV, SAA, VAA]

- id: memviewer_content_select_query
  label: Content select Query
  kind: query
  command: "QMS:CON"
  params: []

- id: memviewer_sort_type
  label: Sort type
  kind: action
  command: "SMS:TYP{type}"
  params:
    - name: type
      type: enum
      values: [DAT, NAM]

- id: memviewer_sort_type_query
  label: Sort type Query
  kind: query
  command: "QMS:TYP"
  params: []

- id: memviewer_sort_order
  label: Sort order
  kind: action
  command: "SMS:ODR{order}"
  params:
    - name: order
      type: enum
      values: [ASD, DSD]

- id: memviewer_sort_order_query
  label: Sort order Query
  kind: query
  command: "QMS:ODR"
  params: []

- id: memviewer_play_method
  label: Play method
  kind: action
  command: "SMS:RPT{method}"
  params:
    - name: method
      type: enum
      values: [NON, ONE, ALL, RAN, SEL, PRG]

- id: memviewer_play_method_query
  label: Play method Query
  kind: query
  command: "QMS:RPT"
  params: []

- id: memviewer_picture_duration
  label: Picture duration
  kind: action
  command: "SMS:SSD{duration}"
  params:
    - name: duration
      type: integer
      range: "010-600"

- id: memviewer_picture_duration_query
  label: Picture duration Query
  kind: query
  command: "QMS:SSD"
  params: []

- id: memviewer_content_info
  label: Auto display content info
  kind: action
  command: "SMS:INF{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: memviewer_content_info_query
  label: Auto display content info Query
  kind: query
  command: "QMS:INF"
  params: []

- id: memviewer_operation_guide
  label: Auto display operation guide
  kind: action
  command: "SMS:GUI{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: memviewer_operation_guide_query
  label: Auto display operation guide Query
  kind: query
  command: "QMS:GUI"
  params: []

# ===== Screen Transfer settings =====
- id: screen_transfer_function
  label: Screen Transfer function
  kind: action
  command: "SSU:STF{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: screen_transfer_function_query
  label: Screen Transfer function Query
  kind: query
  command: "QSU:STF"
  params: []

- id: screen_transfer_cut_in
  label: Cut in
  kind: action
  command: "SSU:STC{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: screen_transfer_cut_in_query
  label: Cut in Query
  kind: query
  command: "QSU:STC"
  params: []

- id: screen_transfer_pin_code
  label: PIN code
  kind: action
  command: "SSU:STP{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: screen_transfer_pin_code_query
  label: PIN code Query
  kind: query
  command: "QSU:STP"
  params: []

# ===== Wireless presentation settings =====
- id: wireless_background_color
  label: Background color settings
  kind: action
  command: "SSU:WBC{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: wireless_background_color_query
  label: Background color settings Query
  kind: query
  command: "QSU:WBC"
  params: []

- id: wireless_datetime_setting
  label: Date/Time setting
  kind: action
  command: "SSU:WDT{format}"
  params:
    - name: format
      type: enum
      values: ["000", "001", "002", "003", "004", "005", "006", "007", "008", "009", "010"]

- id: wireless_datetime_setting_query
  label: Date/Time setting Query
  kind: query
  command: "QSU:WDT"
  params: []

- id: wireless_language_link
  label: Language link
  kind: action
  command: "SSU:WLG{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: wireless_language_link_query
  label: Language link Query
  kind: query
  command: "QSU:WLG"
  params: []

# ===== Function button settings =====
- id: function_group
  label: Function Group
  kind: action
  command: "OSP:KGR{group}"
  params:
    - name: group
      type: enum
      values: [INP, MEM, ACT]

- id: function_group_query
  label: Function Group Query
  kind: query
  command: "QSP:KGR"
  params: []

- id: function_button_settings
  label: Function Button Settings
  kind: action
  command: "OSP:KFN{key}{func}"
  params:
    - name: key
      type: integer
      range: "1-6"
    - name: func
      type: enum
      values: [SIG, SSV, SUT, LNS, ECO, OSH, MLT, PRT, PDS, DZM, MSW, DID, HCO, PLE, HM1, HM2, DP1, DL1, DV1, SL1, NW1, UD1, MV1]

- id: function_button_settings_query
  label: Function Button Settings Query
  kind: query
  command: "QSP:KFN{key}"
  params: []

- id: functionguide_settings
  label: Functionguide Settings
  kind: action
  command: "OSP:KFG{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: functionguide_settings_query
  label: Functionguide Settings Query
  kind: query
  command: "QSP:KFG"
  params: []

# ===== OSD settings =====
- id: osd_menu_position
  label: Menu Position
  kind: action
  command: "SSU:OPS{pos}"
  params:
    - name: pos
      type: enum
      values: ["1", "2", "3"]

- id: osd_menu_position_query
  label: Menu Position Query
  kind: query
  command: "QSU:OPS"
  params: []

- id: osd_menu_display_duration
  label: Menu Display Duration
  kind: action
  command: "SSU:MDT{duration}"
  params:
    - name: duration
      type: integer
      range: "005-180"

- id: osd_menu_display_duration_query
  label: Menu Display Duration Query
  kind: query
  command: "QSU:MDT"
  params: []

- id: osd_on_screen_display
  label: On screen display
  kind: action
  command: "OSP:OSD{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: osd_on_screen_display_query
  label: On screen display Query
  kind: query
  command: "QSP:OSD"
  params: []

- id: osd_transparency
  label: OSD Transparency
  kind: action
  command: "SSU:MTL{level}"
  params:
    - name: level
      type: integer
      range: "000-100"

- id: osd_transparency_query
  label: OSD Transparency Query
  kind: query
  command: "QSU:MTL"
  params: []

# ===== Control settings =====
- id: control_displayid_query
  label: DisplayID Query
  kind: query
  command: "QID:DID"
  params: []

- id: control_serial_id_function
  label: Serial ID function
  kind: action
  command: "SID:SID{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: control_serial_id_function_query
  label: Serial ID function Query
  kind: query
  command: "QID:SID"
  params: []

- id: control_serial_response_normal
  label: Serial Response (Normal)
  kind: action
  command: "SCT:RIN{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: control_serial_response_normal_query
  label: Serial Response (Normal) Query
  kind: query
  command: "QCT:RIN"
  params: []

- id: control_serial_response_id_all
  label: Serial Response (ID all)
  kind: action
  command: "SCT:RIA{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: control_serial_response_id_all_query
  label: Serial Response (ID all) Query
  kind: query
  command: "QCT:RIA"
  params: []

- id: control_serial_id_setup
  label: Serial ID Setup
  kind: action
  command: "SIF:{mode}{id}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]
    - name: id
      type: integer
      range: "000-100"

- id: control_serial_id_setup_query
  label: Serial ID Setup Query
  kind: query
  command: "QIF"
  params: []

# ===== Long life settings =====
- id: long_life_mode
  label: Long life mode
  kind: action
  command: "SLS:LLS{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: long_life_mode_query
  label: Long life mode Query
  kind: query
  command: "QLS:LLS"
  params: []

# ===== Sensor settings =====
- id: sensor_ambient_light
  label: Ambient light sensor
  kind: action
  command: "SSU:ALS{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2", "3"]

- id: sensor_ambient_light_query
  label: Ambient light sensor Query
  kind: query
  command: "QSU:ALS"
  params: []

- id: sensor_proximity
  label: Proximity sensor
  kind: action
  command: "SSU:PRS{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: sensor_proximity_query
  label: Proximity sensor Query
  kind: query
  command: "QSU:PRS"
  params: []

- id: sensor_color
  label: Color sensor
  kind: action
  command: "SSU:CLS{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: sensor_color_query
  label: Color sensor Query
  kind: query
  command: "QSU:CLS"
  params: []

# ===== Information Timing =====
- id: info_no_signal_warning
  label: No Signal Warning
  kind: action
  command: "SIT:NSW{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: info_no_signal_warning_query
  label: No Signal Warning Query
  kind: query
  command: "QIT:NSW"
  params: []

- id: info_no_signal_warning_timing
  label: No Signal Warning Timing
  kind: action
  command: "SIT:SWT{minutes}"
  params:
    - name: minutes
      type: integer
      range: "01-60"

- id: info_no_signal_warning_timing_query
  label: No Signal Warning Timing Query
  kind: query
  command: "QIT:SWT"
  params: []

- id: info_query_status_no_signal_warning
  label: Query status No Signal Warning Timing
  kind: query
  command: "QST:NSW"
  params: []

- id: info_no_signal_error
  label: No Signal Error
  kind: action
  command: "SIT:NSE{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: info_no_signal_error_query
  label: No Signal Error Query
  kind: query
  command: "QIT:NSE"
  params: []

- id: info_no_signal_error_timing
  label: No Signal Error Timing
  kind: action
  command: "SIT:SET{minutes}"
  params:
    - name: minutes
      type: integer
      range: "01-90"

- id: info_no_signal_error_timing_query
  label: No Signal Error Timing Query
  kind: query
  command: "QIT:SET"
  params: []

- id: info_query_status_no_signal_error
  label: Query status No Signal Error Timing
  kind: query
  command: "QST:NSE"
  params: []

- id: info_temperature_warning
  label: Temperature Warning
  kind: action
  command: "SIT:TPW{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: info_temperature_warning_query
  label: Temperature Warning Query
  kind: query
  command: "QIT:TPW"
  params: []

- id: info_query_status_temperature
  label: Query status Temperature warning
  kind: query
  command: "QST:TO"
  params: []

- id: info_slot_version_query
  label: SLOT information (Version) Query
  kind: query
  command: "QSU:SIV"
  params: []

- id: info_slot_power_link
  label: SLOT power link
  kind: action
  command: "SSU:SPL{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: info_slot_power_link_query
  label: SLOT power link Query
  kind: query
  command: "QSU:SPL"
  params: []

- id: info_slot_standby
  label: SLOT standby
  kind: action
  command: "SSU:SSB{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: info_slot_standby_query
  label: SLOT standby Query
  kind: query
  command: "QSU:SSB"
  params: []

- id: info_slot_forced_termination
  label: SLOT forced termination
  kind: action
  command: "SSU:SOF"
  params: []

- id: info_slot_power_on
  label: SLOT power on
  kind: action
  command: "SSU:SON"
  params: []

# ===== Others =====
- id: others_recall
  label: Recall
  kind: action
  command: "DDS"
  params: []

- id: others_displayid_displayname
  label: DisplayID/Displayname
  kind: action
  command: "DDS:DID"
  params: []

- id: others_audio_mute
  label: Audio Mute (legacy)
  kind: action
  command: "AOC:{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: others_osd_clear
  label: OSD Clear
  kind: action
  command: "VDO"
  params: []

- id: others_digital_zoom
  label: digital zoom
  kind: action
  command: "DZM:{func}{factor}{hpos}{vpos}"
  params:
    - name: func
      type: enum
      values: ["0", "1"]
    - name: factor
      type: enum
      values: ["1", "2", "3", "4"]
    - name: hpos
      type: enum
      values: ["1", "2", "3", "4", "5"]
    - name: vpos
      type: enum
      values: ["1", "2", "3", "4", "5"]

- id: others_digital_zoom_query
  label: digital zoom Query
  kind: query
  command: "QDZ"
  params: []

- id: others_off_timer
  label: Off Timer
  kind: action
  command: "ZOT:{minutes}"
  params:
    - name: minutes
      type: integer
      range: "00-90"

- id: others_ump_skip_next
  label: USB media player Skip to next playback file
  kind: action
  command: "UMP:NXT"
  params: []

- id: others_ump_skip_previous
  label: USB media player Skip to previous playback file
  kind: action
  command: "UMP:PRE"
  params: []

- id: others_ump_replay
  label: USB media player Playback again from top of file
  kind: action
  command: "UMP:RPY"
  params: []

- id: others_signal_status_query
  label: Inquiry about Signal Status of input signal
  kind: query
  command: "QST:SGS"
  params: []

- id: others_signal_frequency_query
  label: Inquiry about Signal Frequency of input signal
  kind: query
  command: "QFR"
  params: []

- id: others_signal_format_query
  label: Inquiry about Signal Format of input signal
  kind: query
  command: "QSF"
  params: []

- id: others_digital_link_status_detail_query
  label: Inquiry about detail of DIGITAL LINK status
  kind: query
  command: "QST:DLD"
  params: []

- id: others_hdcp_status_query
  label: Inquiry about HDCP status
  kind: query
  command: "QST:DCP"
  params: []

- id: others_monitor_used_time_query
  label: Inquiry about Monitor Used Time
  kind: query
  command: "QST:PT"
  params: []

- id: others_fan_used_time_query
  label: Inquiry about FAN Used Time
  kind: query
  command: "QST:F1T"
  params: []

- id: others_set_hostname
  label: Setting Hostname
  kind: action
  command: "SSU:HSN{name}"
  params:
    - name: name
      type: string
      description: "HOSTNAME (Max 20 chars)"

- id: others_set_hostname_query
  label: Setting Hostname Query
  kind: query
  command: "QSU:HSN"
  params: []

- id: others_auto_command_send_setting
  label: Auto Command Send Setting
  kind: action
  command: "RCM:{qss}{stserr}"
  params:
    - name: qss
      type: enum
      values: ["0", "1"]
    - name: stserr
      type: enum
      values: ["0", "1"]

- id: others_model_name_query
  label: Inquiry about Model Name
  kind: query
  command: "QMN"
  params: []

- id: others_model_query
  label: Inquiry about Model
  kind: query
  command: "QID"
  params: []

- id: others_sw_version_main_mcu_query
  label: Software Version Main MCU Query
  kind: query
  command: "QRV"
  params: []

- id: others_sw_version_sub_mcu_query
  label: Software Version Sub MCU Query
  kind: query
  command: "QRV:STB"
  params: []

- id: others_sw_version_fe_query
  label: Software Version FE Query
  kind: query
  command: "QRV:FRE"
  params: []

- id: others_sw_version_eeprom_query
  label: Software Version EEPROM Query
  kind: query
  command: "QRV:EEP"
  params: []

- id: others_sw_version_hdbaset_query
  label: Software Version HDBaseT RX Query
  kind: query
  command: "QRV:HBT"
  params: []

- id: others_sw_version_fpga_query
  label: Software Version FPGA Query
  kind: query
  command: "QRV:FP1"
  params: []

- id: others_sw_version_sdi_fpga_query
  label: Software Version SDI FPGA Query
  kind: query
  command: "QRV:FP2"
  params: []

- id: others_sw_version_frc_query
  label: Software Version FRC Query
  kind: query
  command: "QRV:FRC"
  params: []

- id: others_serial_number_query
  label: Serial number Query
  kind: query
  command: "QSN"
  params: []

- id: others_mac_address_query
  label: MAC Address Query
  kind: query
  command: "QMA"
  params: []

- id: others_lan_clone_write_protect
  label: LAN data Cloning - Write protect
  kind: action
  command: "LCL:WRP{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]

- id: others_lan_clone_write_protect_query
  label: LAN data Cloning - Write protect Query
  kind: query
  command: "QCL:WRP"
  params: []

# ===== Light ID Control (Japan Only) =====
- id: lightid_mode
  label: LightID mode (Select PWM Mode)
  kind: action
  command: "LID:MOD{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2"]
      description: "0=OFF, 1=External Control Mode, 2=Internal ID Mode"

- id: lightid_mode_query
  label: LightID mode Query
  kind: query
  command: "QLI:MOD"
  params: []

- id: lightid_stop
  label: Stop LightID
  kind: action
  command: "LID:STP"
  params: []

- id: lightid_backlight_blt
  label: BackLight Control (BLT)
  kind: action
  command: "LID:BLT{duty}"
  params:
    - name: duty
      type: enum
      values: ["1", "2", "3"]
      description: "Low/Middle/High"

- id: lightid_backlight_blt_query
  label: BackLight Control (BLT) Query
  kind: query
  command: "QLI:BLT"
  params: []

- id: lightid_backlight_blc
  label: BackLight Control (BLC)
  kind: action
  command: "LID:BLC{duty}"
  params:
    - name: duty
      type: enum
      values: ["1", "2", "3"]
      description: "Low/Middle/High"

- id: lightid_backlight_blc_query
  label: BackLight Control (BLC) Query
  kind: query
  command: "QLI:BLC"
  params: []

# ===== Serial ID addressing =====
- id: serial_id_command
  label: Send command with Serial ID
  kind: action
  command: "AD94;RAD:{id};{inner_command}"
  note: "Serial-only. Format: <STX>AD94;RAD:NNN;<cmd><ETX>. Alt: RAD:NNN;<cmd>. Requires Serial ID function ON."
  params:
    - name: id
      type: integer
      range: "000-100"
    - name: inner_command
      type: string
      description: "Any control/inquiry command from this spec"
```

## Feedbacks
```yaml
# Observable states / query responses documented in source.
- id: power_state
  type: enum
  query_command: "QPW"
  reply: "QPW:*"
  values:
    "0": "Standby (Off)"
    "1": "Power ON (On)"

- id: input_state
  type: enum
  query_command: "QMI"
  reply: "QMI:***"
  values: [HM1, HM2, DP1, DL1, DV1, SL1, NW1, UD1, MV1]

- id: audio_volume_state
  type: integer
  query_command: "QAV"
  reply: "QAV:***"
  range: "000-100"

- id: audio_mute_state
  type: enum
  query_command: "QAM"
  reply: "QAM:*"
  values: ["0", "1"]

- id: video_mute_state
  type: enum
  query_command: "QVM"
  reply: "QVM:*"
  values: ["0", "1"]

- id: error_reply
  type: enum
  reply: "ER401"
  description: "Returned for incorrect command, or when running Read user image"

# Auto-message (unsolicited) responses sent automatically while RS-232C controls:
- id: auto_no_signal_warning
  type: enum
  reply: "QST:NSW*"
  values: ["0", "1"]

- id: auto_no_signal_error
  type: enum
  reply: "QST:NSE*"
  values: ["0", "1"]

- id: auto_temperature_warning
  type: enum
  reply: "QST:TO*"
  values:
    "0": "NORMAL-MODE"
    "1": "HIGH TEMPERATURE-MODE"

# UNRESOLVED: exact response strings for most Qxx inquiry replies beyond the
# reply-command prefixes documented in the Actions section (e.g. QPC:BLT***,
# QDC:EXP*, QBI:STS) are given as parameter templates, not concrete formats.
```

## Variables
```yaml
# Settable parameters not represented as discrete actions are captured above as
# parameterized actions. No additional standalone variables required.
# UNRESOLVED: none beyond the parameterized actions listed.
```

## Events
```yaml
# Unsolicited auto-messages while RS-232C controls (see Feedbacks):
# - QST:NSW* (No Signal Warning auto-message)
# - QST:NSE* (No Signal Error auto-message)
# - QST:TO*  (Temperature warning auto-message)
# These are emitted automatically by the display; see Feedbacks section.
# UNRESOLVED: full list of unsolicited event types beyond the three documented.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "In standby mode, display responds to PON and QPW commands only."
  - "When sending multiple commands, wait for the response of the first command before sending the next."
# UNRESOLVED: no explicit safety warnings or power-on sequencing interlocks
# stated in source beyond the command-response ordering constraint.
```

## Notes
- Source document title: "RS232C/LAN command list 4K UHD LCD Displays MODEL: TH-86/75SQ1H". The entity slug `panasonic_universal_discrete_functions` originates from a Crestron Application Market IR-driver product family and does not literally appear in this source. The actual covered models are TH-86SQ1H and TH-75SQ1H.
- Command framing: every command is transmitted as `STX` (02h) + 3-character command + optional `:` + parameters + `ETX` (03h). The `:` is omitted when there are no parameters. Cable must be straight-through.
- Serial config (fully specified): 9600 bps, 8 data bits, no parity, 1 stop bit, no flow control.
- LAN control has two protocol variants. Protocol 1 hashes `random+password`; Protocol 2 hashes `username:password:random`. Default LAN port is 1024. When Protocol 2 is selected, inquiry-command responses omit the first four characters.
- Serial ID addressing (serial only) uses `<STX>AD94;RAD:NNN;<cmd><ETX>` or `<STX>RAD:NNN;<cmd><ETX>`, with NNN = 000-100. Requires `[Control settings] - [Serial ID function]` set to ON. Inquiry commands are inoperable when serial ID is 000 or when sending to ID "000".
- FRAME CREATION (`VPC:FRC`) is 86SQ1H only.
- Light ID Control block is Japan-only.

<!-- UNRESOLVED: exact firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: concrete byte layout of LAN handshake packets beyond MD5 hash string -->
<!-- UNRESOLVED: response string formats for many inquiry commands only given as templates -->
<!-- UNRESOLVED: no first-party document containing the exact phrase "Universal Discrete Functions" was located; this spec maps the closest first-party RS232C/LAN command set for the named family. -->

## Provenance

```yaml
source_domains:
  - docs.connect.panasonic.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/SQ1H_SerialCommandList.pdf
  - https://docs.connect.panasonic.com/prodisplays/support/rs232c_commandlist.html
  - https://docs.connect.panasonic.com/projector/download/command/
  - https://docs.connect.panasonic.com/projector/solution/webapi/
retrieved_at: 2026-06-24T06:27:10.290Z
last_checked_at: 2026-06-24T12:07:07.071Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-24T12:07:07.071Z
matched_actions: 475
action_count: 475
confidence: medium
summary: "All 475 spec actions confirmed in source with literal command matches; only QSH:DIN inquiry (detect digital input) is in the source but not represented as a spec action id, which is 1 extra command well below the short threshold of 5. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- QSH:DIN
- "exact firmware compatibility range not stated; \"Universal Discrete Functions\" phrase not present in this source (see Notes)"
- "exact framing/fields of the LAN handshake packets beyond the MD5 hash string."
- "exact response strings for most Qxx inquiry replies beyond the"
- "none beyond the parameterized actions listed."
- "full list of unsolicited event types beyond the three documented."
- "no explicit multi-step sequences documented in source."
- "no explicit safety warnings or power-on sequencing interlocks"
- "exact firmware version compatibility range not stated in source"
- "concrete byte layout of LAN handshake packets beyond MD5 hash string"
- "response string formats for many inquiry commands only given as templates"
- "no first-party document containing the exact phrase \"Universal Discrete Functions\" was located; this spec maps the closest first-party RS232C/LAN command set for the named family."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
