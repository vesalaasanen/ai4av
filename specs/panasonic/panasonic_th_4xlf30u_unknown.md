---
spec_id: admin/panasonic-th-4xlf30u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic TH-4xLF30U Series Control Spec"
manufacturer: Panasonic
model_family: TH-4xLF30U
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - TH-4xLF30U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.connect.panasonic.com
  - manualslib.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/SQ1H_SerialCommandList.pdf
  - https://docs.connect.panasonic.com/prodisplays/support/rs232c_commandlist.html
  - https://www.manualslib.com/manual/437850/Panasonic-Th-42lf30u.html
  - https://docs.connect.panasonic.com/prodisplays/
retrieved_at: 2026-09-02T20:32:55.184Z
last_checked_at: 2026-09-17T22:22:04.499Z
generated_at: 2026-09-17T22:22:04.499Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source PDF header identifies the TH-86/75SQ1H series, not TH-4xLF30U. Command set and protocol framing treated as identical pending verification against an LF30U unit."
  - "firmware version compatibility not stated in source."
  - "full safety, fault behavior, and error-recovery procedures not present in source."
  - "no HTTP base URL - LAN uses raw TCP socket, not HTTP"
  - "source does not distinguish settable parameters from action values;"
  - "source does not define multi-step macro sequences."
  - "source does not document safety interlocks, fault-recovery procedures,"
  - "source targets TH-86/75SQ1H; applied to TH-4xLF30U based on cross-family assumption. Verify on hardware before relying on the full catalogue."
  - "full safety, fault behavior, and error-recovery sequences not present in source."
  - "firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-09-17T22:22:04.499Z
  matched_actions: 470
  action_count: 470
  confidence: medium
  summary: "All 470 spec actions have wire-literal matches in the source command table; transport values are confirmed in Protocol section; spec covers full source command catalogue. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Panasonic TH-4xLF30U Series Control Spec

## Summary
Control spec for the Panasonic TH-4xLF30U series professional LCD displays, covering RS-232C serial and LAN (TCP) control. Source documents the full ASCII command catalogue including power, input switching, picture/sound adjustment, position, multi-display, portrait, network, schedule, memory, and information queries. Note: source PDF header references the TH-86/75SQ1H series; commands and protocol framing are assumed identical for the TH-4xLF30U family based on Panasonic professional display lineage.

<!-- UNRESOLVED: source PDF header identifies the TH-86/75SQ1H series, not TH-4xLF30U. Command set and protocol framing treated as identical pending verification against an LF30U unit. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: full safety, fault behavior, and error-recovery procedures not present in source. -->

## Transport
```yaml
# RS-232C serial parameters stated in source Protocol section.
# LAN control uses TCP. Default port 1024 (stated).
# LAN auth: MD5(username:password:random) for Protocol 2; password-only MD5 for Protocol 1.
# Both protocols listed per source's "Control via LAN" section.
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
  port: 1024
  base_url: null  # UNRESOLVED: no HTTP base URL - LAN uses raw TCP socket, not HTTP
auth:
  type: password  # LAN Protocol 1/2 both require an Administrator password (MD5-hashed)
  notes: "Protocol 1 hashes an 8-byte random + password with MD5. Protocol 2 hashes username + ':' + password + ':' + 8-byte random with MD5. RS-232 commands themselves carry no auth payload."
```

## Traits
```yaml
powerable: true   # PON/POF/QPW commands present
routable: true    # IMS input-change + multi-input selection present
queryable: true   # QMI, QAV, QPC, QAC, QGE, QSP, QSU etc. queries present
levelable: true   # AVL/AUU/AUD volume; VPC backlight/contrast/brightness/color/tint/sharpness
```

## Actions
```yaml
# Basic control
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
- id: input_change
  label: Input Change
  kind: action
  command: "IMS{input}"
  params:
    - name: input
      type: string
      values: [HM1, HM2, DP1, DL1, DV1, SL1, NW1, UD1, MV1]
      description: HM1 HDMI1 / HM2 HDMI2 / DP1 DisplayPort / DL1 DIGITAL LINK / DV1 DVI-D / SL1 SLOT / NW1 Screen Transfer / UD1 USB / MV1 Memory Viewer
- id: digital_link_input_select
  label: Digital Link Input Select (YFB Series)
  kind: action
  command: "IMS:DL1{input}"
  params:
    - name: input
      type: string
      description: YFB100 HD1/HD2/PC1/PC2/SVD/VID; YFB200 HD1/HD2/PC1/PC2/VID
- id: audio_volume_set
  label: Audio Volume Set
  kind: action
  command: "AVL{level}"
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: 3-digit zero-padded value 000-100
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
- id: audio_volume_query
  label: Audio Volume Query
  kind: query
  command: "QAV"
  params: []
- id: audio_mute
  label: Audio Mute Toggle
  kind: action
  command: "AMT{state}"
  params:
    - name: state
      type: string
      values: ["", "0", "1"]
      description: Empty for toggle, 0 mute off, 1 mute on
- id: audio_mute_query
  label: Audio Mute Query
  kind: query
  command: "QAM"
  params: []
- id: video_mute
  label: Video Mute Toggle
  kind: action
  command: "VMT{state}"
  params:
    - name: state
      type: string
      values: ["", "0", "1"]
- id: video_mute_query
  label: Video Mute Query
  kind: query
  command: "QVM"
  params: []
- id: aspect_change
  label: Aspect Change
  kind: action
  command: "DAM{aspect}"
  params:
    - name: aspect
      type: string
      values: [FULL, NORM, NATV, HFIT, VFIT, ZOOM, ZOM2]
- id: aspect_query
  label: Aspect Query
  kind: query
  command: "QAS"
  params: []

# Picture adjustment
- id: picture_mode_set
  label: Picture Mode
  kind: action
  command: "VPC:MEN{mode}"
  params:
    - name: mode
      type: string
      values: [VIV, NAT, STD, SUV, GRH, DCM]
- id: picture_mode_query
  label: Picture Mode Query
  kind: query
  command: "QPC:MEN"
  params: []
- id: backlight_set
  label: Backlight
  kind: action
  command: "VPC:BLT{level}"
  params:
    - name: level
      type: string
      range: ["000", "100"]
      description: 000-100 or DEF
- id: backlight_query
  label: Backlight Query
  kind: query
  command: "QPC:BLT"
  params: []
- id: picture_contrast_set
  label: Picture Contrast
  kind: action
  command: "VPC:PIC{level}"
  params:
    - name: level
      type: string
      range: ["000", "100"]
- id: picture_contrast_query
  label: Picture Contrast Query
  kind: query
  command: "QPC:PIC"
  params: []
- id: black_level_set
  label: Black Level Brightness
  kind: action
  command: "VPC:BLK{level}"
  params:
    - name: level
      type: string
      range: ["000", "100"]
- id: black_level_query
  label: Black Level Query
  kind: query
  command: "QPC:BLK"
  params: []
- id: color_set
  label: Color
  kind: action
  command: "VPC:COL{level}"
  params:
    - name: level
      type: string
      range: ["000", "100"]
- id: color_query
  label: Color Query
  kind: query
  command: "QPC:COL"
  params: []
- id: tint_set
  label: Tint
  kind: action
  command: "VPC:TIN{level}"
  params:
    - name: level
      type: string
      range: ["000", "100"]
- id: tint_query
  label: Tint Query
  kind: query
  command: "QPC:TIN"
  params: []
- id: sharpness_set
  label: Sharpness
  kind: action
  command: "VPC:SHP{level}"
  params:
    - name: level
      type: string
      range: ["000", "100"]
- id: sharpness_query
  label: Sharpness Query
  kind: query
  command: "QPC:SHP"
  params: []
- id: enhance_level_set
  label: Enhance Level
  kind: action
  command: "VPC:SHE{level}"
  params:
    - name: level
      type: integer
      values: [1, 2]
- id: enhance_level_query
  label: Enhance Level Query
  kind: query
  command: "QPC:SHE"
  params: []
- id: gamma_set
  label: Gamma
  kind: action
  command: "VWB:GMM{value}"
  params:
    - name: value
      type: string
      values: [20, 22, 24, 26]
      description: 2.0 / 2.2 / 2.4 / 2.6
- id: gamma_query
  label: Gamma Query
  kind: query
  command: "QWB:GMM"
  params: []
- id: color_temperature_set
  label: Color Temperature
  kind: action
  command: "VPC:TMP{value}"
  params:
    - name: value
      type: string
      values: ["032", "040", "050", "065", "075", "093", "107", NTV, U01, U02]
- id: color_temperature_query
  label: Color Temperature Query
  kind: query
  command: "QPC:TMP"
  params: []
- id: red_gain_set
  label: Red Gain
  kind: action
  command: "VWB:RGN{value}"
  params:
    - name: value
      type: string
      range: ["0000", "0255"]
- id: red_gain_query
  label: Red Gain Query
  kind: query
  command: "QWB:RGN"
  params: []
- id: green_gain_set
  label: Green Gain
  kind: action
  command: "VWB:GGN{value}"
  params:
    - name: value
      type: string
      range: ["0000", "0255"]
- id: green_gain_query
  label: Green Gain Query
  kind: query
  command: "QWB:GGN"
  params: []
- id: blue_gain_set
  label: Blue Gain
  kind: action
  command: "VWB:BGN{value}"
  params:
    - name: value
      type: string
      range: ["0000", "0255"]
- id: blue_gain_query
  label: Blue Gain Query
  kind: query
  command: "QWB:BGN"
  params: []
- id: red_bias_set
  label: Red Bias
  kind: action
  command: "VWB:RBS{value}"
  params:
    - name: value
      type: string
      range: ["-127", "0128"]
- id: red_bias_query
  label: Red Bias Query
  kind: query
  command: "QWB:RBS"
  params: []
- id: green_bias_set
  label: Green Bias
  kind: action
  command: "VWB:GBS{value}"
  params:
    - name: value
      type: string
      range: ["-127", "0128"]
- id: green_bias_query
  label: Green Bias Query
  kind: query
  command: "QWB:GBS"
  params: []
- id: blue_bias_set
  label: Blue Bias
  kind: action
  command: "VWB:BBS{value}"
  params:
    - name: value
      type: string
      range: ["-127", "0128"]
- id: blue_bias_query
  label: Blue Bias Query
  kind: query
  command: "QWB:BBS"
  params: []
- id: color_management_set
  label: Color Management Mode
  kind: action
  command: "VWB:CMF{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2]
      description: 0 off / 1 6-segment / 2 12-segment
- id: color_management_query
  label: Color Management Query
  kind: query
  command: "QWB:CMF"
  params: []
- id: color_6seg_set
  label: 6-Segment Color Management Select
  kind: action
  command: "VWB:CML{color}{tint}{saturation}{value}"
  params:
    - name: color
      type: string
      values: [R, Y, G, C, B, M]
    - name: tint
      type: string
      range: ["-127", "0127"]
    - name: saturation
      type: string
      range: ["-127", "0127"]
    - name: value
      type: string
      range: ["-127", "0127"]
- id: color_6seg_query
  label: 6-Segment Color Management Query
  kind: query
  command: "QWB:CML{color}"
  params:
    - name: color
      type: string
      values: [R, Y, G, C, B, M]
- id: color_6seg_reset
  label: 6-Segment Color Management Reset
  kind: action
  command: "VWB:CMR"
  params: []
- id: color_12seg_set
  label: 12-Segment Color Management Select
  kind: action
  command: "VWB:CWL{color}{tint}{saturation}{value}"
  params:
    - name: color
      type: string
      values: [RR, RY, YY, YG, GG, GC, CC, CB, BB, BM, MM, MR]
    - name: tint
      type: string
      range: ["-127", "0127"]
    - name: saturation
      type: string
      range: ["-127", "0127"]
    - name: value
      type: string
      range: ["-127", "0127"]
- id: color_12seg_query
  label: 12-Segment Color Management Query
  kind: query
  command: "QWB:CWL{color}"
  params:
    - name: color
      type: string
      values: [RR, RY, YY, YG, GG, GC, CC, CB, BB, BM, MM, MR]
- id: color_12seg_reset
  label: 12-Segment Color Management Reset
  kind: action
  command: "VWB:CWR"
  params: []
- id: dynamic_contrast_set
  label: Dynamic Contrast
  kind: action
  command: "VPC:DCO{level}"
  params:
    - name: level
      type: string
      range: ["00", "10"]
- id: dynamic_contrast_query
  label: Dynamic Contrast Query
  kind: query
  command: "QPC:DCO"
  params: []
- id: color_enhancement_set
  label: Color Enhancement
  kind: action
  command: "VPC:PAJ{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: color_enhancement_query
  label: Color Enhancement Query
  kind: query
  command: "QPC:PAJ"
  params: []
- id: blue_light_reduction_set
  label: Blue Light Reduction
  kind: action
  command: "VPC:BLR{level}"
  params:
    - name: level
      type: integer
      values: [0, 1, 2, 3]
      description: 0 OFF / 1 Low / 2 Mid / 3 High
- id: blue_light_reduction_query
  label: Blue Light Reduction Query
  kind: query
  command: "QPC:BLR"
  params: []
- id: refine_enhancer_set
  label: Refine Enhancer
  kind: action
  command: "VPC:SRC{level}"
  params:
    - name: level
      type: integer
      values: [0, 1, 2, 3]
- id: refine_enhancer_query
  label: Refine Enhancer Query
  kind: query
  command: "QPC:SRC"
  params: []
- id: gradation_smoother_set
  label: Gradation Smoother
  kind: action
  command: "VPC:GRS{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: gradation_smoother_query
  label: Gradation Smoother Query
  kind: query
  command: "QPC:GRS"
  params: []
- id: picture_default
  label: Picture Default
  kind: action
  command: "VPC:DEF{mode}"
  params:
    - name: mode
      type: integer
      values: [1, 2, 3]
      description: "1 current input+mode / 2 current input all mode / 3 all input all mode"

# Picture memory
- id: memory_delete
  label: Memory Delete
  kind: action
  command: "VPF:DEL{number}"
  params:
    - name: number
      type: string
      values: ["01", "02", "03", "04", "05", "06"]
- id: memory_load
  label: Memory Load
  kind: action
  command: "VPF:LOD{number}"
  params:
    - name: number
      type: string
      values: ["01", "02", "03", "04", "05", "06"]
- id: memory_name_set
  label: Memory Name Change
  kind: action
  command: "VPF:NAM{number}{name}"
  params:
    - name: number
      type: string
      values: ["01", "02", "03", "04", "05", "06"]
    - name: name
      type: string
      max_length: 20
- id: memory_name_query
  label: Memory Name Query
  kind: query
  command: "QPF:NAM{number}"
  params:
    - name: number
      type: string
      values: ["01", "02", "03", "04", "05", "06"]
- id: memory_save
  label: Memory Save
  kind: action
  command: "VPF:SAV{number}{name}"
  params:
    - name: number
      type: string
      values: ["01", "02", "03", "04", "05", "06"]
    - name: name
      type: string
      max_length: 20
- id: memory_state_query
  label: Memory State Query
  kind: query
  command: "QPF:STA"
  params: []

# Sound adjustment
- id: audio_output_select_set
  label: Audio Output Select
  kind: action
  command: "AAC:OUT{output}"
  params:
    - name: output
      type: string
      values: [SPO, EXS, LNO]
      description: SPO Internal Speakers / EXS External Speakers / LNO Audio Out
- id: audio_output_select_query
  label: Audio Output Select Query
  kind: query
  command: "QAC:OUT"
  params: []
- id: balance_set
  label: Balance
  kind: action
  command: "AAC:BAL{value}"
  params:
    - name: value
      type: string
      range: ["-20", "+20"]
      description: 4-digit signed -20~+20 (020)
- id: balance_query
  label: Balance Query
  kind: query
  command: "QAC:BAL"
  params: []
- id: sound_mode_set
  label: Sound Mode
  kind: action
  command: "AAC:MEN{mode}"
  params:
    - name: mode
      type: string
      values: [STD, AUT, DYN, CLR]
- id: sound_mode_query
  label: Sound Mode Query
  kind: query
  command: "QAC:MEN"
  params: []
- id: bass_set
  label: Bass
  kind: action
  command: "AAC:BAS{value}"
  params:
    - name: value
      type: string
      range: ["-20", "+20"]
- id: bass_query
  label: Bass Query
  kind: query
  command: "QAC:BAS"
  params: []
- id: treble_set
  label: Treble
  kind: action
  command: "AAC:TRE{value}"
  params:
    - name: value
      type: string
      range: ["-20", "+20"]
- id: treble_query
  label: Treble Query
  kind: query
  command: "QAC:TRE"
  params: []
- id: surround_set
  label: Surround
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
- id: auto_volume_set
  label: Auto Volume
  kind: action
  command: "AAC:ATV{level}"
  params:
    - name: level
      type: string
      values: [OFF, LOW, MID, HIG]
- id: auto_volume_query
  label: Auto Volume Query
  kind: query
  command: "QAC:ATV"
  params: []
- id: installation_set
  label: Installation
  kind: action
  command: "AAC:IST{mode}"
  params:
    - name: mode
      type: string
      values: [STD, WMT]
- id: installation_query
  label: Installation Query
  kind: query
  command: "QAC:IST"
  params: []

# Position/Size
- id: h_position_set
  label: Horizontal Position
  kind: action
  command: "DGE:HPO{value}"
  params:
    - name: value
      type: string
      range: ["-100", "+100"]
- id: h_position_query
  label: Horizontal Position Query
  kind: query
  command: "QGE:HPO"
  params: []
- id: h_size_set
  label: Horizontal Size
  kind: action
  command: "DGE:HSZ{value}"
  params:
    - name: value
      type: string
      range: ["-100", "+100"]
- id: h_size_query
  label: Horizontal Size Query
  kind: query
  command: "QGE:HSZ"
  params: []
- id: v_position_set
  label: Vertical Position
  kind: action
  command: "DGE:VPO{value}"
  params:
    - name: value
      type: string
      range: ["-100", "+100"]
- id: v_position_query
  label: Vertical Position Query
  kind: query
  command: "QGE:VPO"
  params: []
- id: v_size_set
  label: Vertical Size
  kind: action
  command: "DGE:VSZ{value}"
  params:
    - name: value
      type: string
      range: ["-100", "+100"]
- id: v_size_query
  label: Vertical Size Query
  kind: query
  command: "QGE:VSZ"
  params: []
- id: overscan_set
  label: Overscan
  kind: action
  command: "DGE:OVS{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: overscan_query
  label: Overscan Query
  kind: query
  command: "QGE:OVS"
  params: []
- id: pos_size_lump_set
  label: Pos/Size Lump Setting
  kind: action
  command: "DGE:PSZ{hpos}{hsize}{vpos}{vsize}"
  params:
    - name: hpos
      type: string
      range: ["-100", "+100"]
    - name: hsize
      type: string
      range: ["-100", "+100"]
    - name: vpos
      type: string
      range: ["-100", "+100"]
    - name: vsize
      type: string
      range: ["-100", "+100"]
- id: pos_size_lump_query
  label: Pos/Size Lump Query
  kind: query
  command: "QGE:PSZ"
  params: []

# Setup - input/lock/timer
- id: input_lock_set
  label: Input Lock
  kind: action
  command: "OSP:INL{input}"
  params:
    - name: input
      type: string
      values: [OFF, HM1, HM2, DP1, DL1, DV1, SL1, NW1, UD1, MV1, MUI]
- id: input_lock_query
  label: Input Lock Query
  kind: query
  command: "QSP:INL"
  params: []
- id: off_timer_set
  label: Off-Timer Function
  kind: action
  command: "OSP:OFT{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: off_timer_query
  label: Off-Timer Query
  kind: query
  command: "QSP:OFT"
  params: []
- id: no_activity_power_off_set
  label: No Activity Power Off
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
- id: osd_language_set
  label: OSD Language
  kind: action
  command: "SSU:LNG{lang}"
  params:
    - name: lang
      type: string
      values: [ENG, DEU, FRA, ITL, ITA, ESP, USA, CHA, JPN, RUS]
- id: osd_language_query
  label: OSD Language Query
  kind: query
  command: "QSU:LNG"
  params: []
- id: display_orientation_set
  label: Display Orientation
  kind: action
  command: "SSU:DOR{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2]
      description: 0 Landscape / 1 Portrait / 2 Auto
- id: display_orientation_query
  label: Display Orientation Query
  kind: query
  command: "QSU:DOR"
  params: []
- id: display_orientation_actual_query
  label: Display Orientation (Actual) Query
  kind: query
  command: "QSU:DOV"
  params: []
- id: image_rotation_set
  label: Image Rotation
  kind: action
  command: "SSU:IMR{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
      description: 0 Off / 1 180 degrees
- id: image_rotation_query
  label: Image Rotation Query
  kind: query
  command: "QSU:IMR"
  params: []
- id: max_volume_level_set
  label: Maximum VOL Level
  kind: action
  command: "OSP:MVL{function}{volume}"
  params:
    - name: function
      type: integer
      values: [0, 1]
    - name: volume
      type: string
      range: ["000", "100"]
- id: max_volume_level_query
  label: Maximum VOL Level Query
  kind: query
  command: "QSP:MVL"
  params: []
- id: button_lock_set
  label: Button Lock
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
- id: power_button_lock_set
  label: Power Button Lock
  kind: action
  command: "SSU:PBO{mode}"
  params:
    - name: mode
      type: string
      values: [OFF, STB]
- id: power_button_lock_query
  label: Power Button Lock Query
  kind: query
  command: "QSU:PBO"
  params: []
- id: power_led_set
  label: Power LED
  kind: action
  command: "SSU:PLS{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: power_led_query
  label: Power LED Query
  kind: query
  command: "QSU:PLS"
  params: []
- id: controller_user_level_set
  label: Controller User Level
  kind: action
  command: "OSP:RCM{level}"
  params:
    - name: level
      type: integer
      values: [0, 1, 2, 3]
- id: controller_user_level_query
  label: Controller User Level Query
  kind: query
  command: "QSP:RCM"
  params: []
- id: dvi_slot_select_set
  label: DVI-D/SLOT Select
  kind: action
  command: "SSU:IDS{input}"
  params:
    - name: input
      type: string
      values: [DV1, SL1]
- id: dvi_slot_select_query
  label: DVI-D/SLOT Select Query
  kind: query
  command: "QSU:IDS"
  params: []
- id: use_memory_select_set
  label: Use Memory Select
  kind: action
  command: "SSU:SWM{source}"
  params:
    - name: source
      type: string
      values: [USB, INT]
- id: use_memory_select_query
  label: Use Memory Select Query
  kind: query
  command: "QSU:SWM"
  params: []
- id: usb_select_set
  label: USB Select
  kind: action
  command: "SSU:SWU{port}"
  params:
    - name: port
      type: string
      values: [MP1, MP2]
- id: usb_select_query
  label: USB Select Query
  kind: query
  command: "QSU:SWU"
  params: []
- id: quick_input_change_mode_set
  label: Quick Input Change Mode
  kind: action
  command: "SSU:FIC{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: quick_input_change_mode_query
  label: Quick Input Change Mode Query
  kind: query
  command: "QSU:FIC"
  params: []

# Multi display
- id: multi_screen_on_off
  label: Multi Screen ON/OFF
  kind: action
  command: "MDC{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: multi_input_on_off
  label: Multi Input ON/OFF
  kind: action
  command: "MDC:MID{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: multi_input_on_off_query
  label: Multi Input ON/OFF Query
  kind: query
  command: "QDC:MID"
  params: []
- id: display_type_set
  label: Display Type
  kind: action
  command: "MDC:MDY{type}"
  params:
    - name: type
      type: integer
      values: [0, 1]
      description: 0 Multi Screen / 1 Multi Input
- id: display_type_query
  label: Display Type Query
  kind: query
  command: "QDC:MDY"
  params: []
- id: display_format_set
  label: Display Format
  kind: action
  command: "MDC:SDF{format}"
  params:
    - name: format
      type: integer
      values: [0, 1, 2]
      description: 0 4 input / 1 PiP / 2 PbP
- id: display_format_query
  label: Display Format Query
  kind: query
  command: "QDC:SDF"
  params: []
- id: multi_screen_setup_set
  label: Multi Screen Setup Detail
  kind: action
  command: "MDC:EXP{on}{hscale}{vscale}{bezelh}{bezelv}{location}"
  params:
    - name: on
      type: integer
      values: [0, 1]
    - name: hscale
      type: string
      range: ["01", "10"]
    - name: vscale
      type: string
      range: ["01", "10"]
    - name: bezelh
      type: string
      range: ["000", "100"]
    - name: bezelv
      type: string
      range: ["000", "100"]
    - name: location
      type: string
      range: ["001", "100"]
- id: multi_screen_setup_query
  label: Multi Screen Setup Query
  kind: query
  command: "QDC:EXP"
  params: []
- id: input4_display_setup_set
  label: 4-Input Display Setup Detail
  kind: action
  command: "MDC:4IN{on}{ul}{ur}{ll}{lr}{audio}"
  params:
    - name: on
      type: integer
      values: [0, 1]
    - name: ul
      type: string
      values: [HM1, HM2, DP1, DV1, SL1]
    - name: ur
      type: string
      values: [HM1, HM2, DP1, DV1, SL1]
    - name: ll
      type: string
      values: [HM1, HM2, DP1, DV1, SL1]
    - name: lr
      type: string
      values: [HM1, HM2, DP1, DV1, SL1]
    - name: audio
      type: string
      values: [OFF, UPL, UPR, LOL, LOR, AI1]
- id: input4_display_setup_query
  label: 4-Input Display Setup Query
  kind: query
  command: "QDC:4IN"
  params: []
- id: pip_setup_set
  label: Picture-in-Picture Setup Detail
  kind: action
  command: "MDC:PIP{on}{location}{main}{sub}{audio}"
  params:
    - name: on
      type: integer
      values: [0, 1]
    - name: location
      type: integer
      values: [0, 1, 2, 3]
    - name: main
      type: string
      values: [HM1, HM2, DP1, DV1, SL1]
    - name: sub
      type: string
      values: [HM1, HM2, DP1, DV1, SL1]
    - name: audio
      type: string
      values: [OFF, MAN, SUB, AI1]
- id: pip_setup_query
  label: PiP Setup Query
  kind: query
  command: "QDC:PIP"
  params: []
- id: pbp_setup_set
  label: Picture-by-Picture Setup Detail
  kind: action
  command: "MDC:PBP{on}{location}{a}{b}{audio}"
  params:
    - name: on
      type: integer
      values: [0, 1]
    - name: location
      type: integer
      values: [0, 1]
    - name: a
      type: string
      values: [HM1, HM2, DP1, DV1, SL1]
    - name: b
      type: string
      values: [HM1, HM2, DP1, DV1, SL1]
    - name: audio
      type: string
      values: [OFF, IN1, IN2, AI1]
- id: pbp_setup_query
  label: PbP Setup Query
  kind: query
  command: "QDC:PBP"
  params: []
- id: multi_input_position_set
  label: Multi-Input Display Position Change
  kind: action
  command: "MDC:SDP{pos}"
  params:
    - name: pos
      type: integer
      range: [0, 3]
- id: multi_input_position_query
  label: Multi-Input Position Query
  kind: query
  command: "QDC:SDP"
  params: []
- id: multi_input_change
  label: Multi-Input Display Input Change
  kind: action
  command: "MDC:MIM{slot}{input}"
  params:
    - name: slot
      type: integer
      range: [1, 4]
    - name: input
      type: string
      values: [HM1, HM2, DP1, DV1, SL1, PC1]
- id: multi_input_change_query
  label: Multi-Input Change Query
  kind: query
  command: "QDC:MIM{slot}"
  params:
    - name: slot
      type: integer
      range: [1, 4]
- id: multi_input_audio_out_set
  label: Multi-Input Audio Out Change
  kind: action
  command: "MDC:MAO{audio}"
  params:
    - name: audio
      type: integer
      range: [0, 6]
- id: multi_input_audio_out_query
  label: Multi-Input Audio Out Query
  kind: query
  command: "QDC:MAO"
  params: []
- id: multi_input_expansion
  label: Multi-Input Display Expansion
  kind: action
  command: "MDC:MTS{action}"
  params:
    - name: action
      type: integer
      range: [1, 4]
- id: frame_control_set
  label: Frame Control
  kind: action
  command: "MDC:FCT{frame}"
  params:
    - name: frame
      type: integer
      range: [0, 4]
- id: frame_control_query
  label: Frame Control Query
  kind: query
  command: "QDC:FCT"
  params: []

# Portrait
- id: portrait_display_set
  label: Portrait Display
  kind: action
  command: "DPR{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: portrait_display_query
  label: Portrait Display Query
  kind: query
  command: "QPR"
  params: []
- id: portrait_setup_detail_query
  label: Portrait Display Setup Detail Query
  kind: query
  command: "QPR:DET"
  params: []
- id: portrait_1screen_set
  label: Portrait Display Setup (1 screen)
  kind: action
  command: "DPR:D01{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: portrait_1screen_query
  label: Portrait 1-Screen Query
  kind: query
  command: "QPR:D01"
  params: []
- id: portrait_3screen_set
  label: Portrait Display Setup (3 screens)
  kind: action
  command: "DPR:D03{on}{format}{bezel}{location}"
  params:
    - name: on
      type: integer
      values: [0, 1]
    - name: format
      type: integer
      values: [1, 2, 3]
    - name: bezel
      type: string
      range: ["000", "100"]
    - name: location
      type: string
      values: ["01", "02", "03"]
- id: portrait_3screen_query
  label: Portrait 3-Screen Query
  kind: query
  command: "QPR:D03"
  params: []
- id: portrait_landscape3_set
  label: Portrait Display Setup (Landscape 3 screens)
  kind: action
  command: "DPR:DL3{on}{format}{bezel}{location}"
  params:
    - name: on
      type: integer
      values: [0, 1]
    - name: format
      type: integer
      values: [1, 2, 3]
    - name: bezel
      type: string
      range: ["000", "100"]
    - name: location
      type: string
      values: ["01", "02", "03"]
- id: portrait_landscape3_query
  label: Landscape 3-Screen Query
  kind: query
  command: "QPR:DL3"
  params: []

# Signal processing
- id: cinema_reality_set
  label: Cinema Reality 3:2 Pull Down
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
- id: noise_reduction_set
  label: Noise Reduction
  kind: action
  command: "SSG:NRS{level}"
  params:
    - name: level
      type: string
      values: [OFF, AUT, LOW, MID, HIG]
- id: noise_reduction_query
  label: Noise Reduction Query
  kind: query
  command: "QSG:NRS"
  params: []
- id: mpeg_noise_reduction_set
  label: MPEG Noise Reduction
  kind: action
  command: "SSG:MNR{level}"
  params:
    - name: level
      type: string
      values: [OFF, LOW, MID, HIG]
- id: mpeg_noise_reduction_query
  label: MPEG Noise Reduction Query
  kind: query
  command: "QSG:MNR"
  params: []
- id: signal_range_set
  label: Signal Range
  kind: action
  command: "SSG:HRC{range}"
  params:
    - name: range
      type: string
      values: [VID, FUL, AUT]
- id: signal_range_query
  label: Signal Range Query
  kind: query
  command: "QSG:HRC"
  params: []
- id: yuv_rgb_select_set
  label: YUV/RGB-IN Select
  kind: action
  command: "SSU:DYR{mode}"
  params:
    - name: mode
      type: string
      values: [YUV, RGB, AUT]
- id: yuv_rgb_select_query
  label: YUV/RGB Select Query
  kind: query
  command: "QSU:DYR"
  params: []
- id: frame_creation_set
  label: Frame Creation (86-inch only)
  kind: action
  command: "VPC:FRC{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: frame_creation_query
  label: Frame Creation Query
  kind: query
  command: "QPC:FRC"
  params: []
- id: dynamic_backlight_set
  label: Dynamic Backlight Control
  kind: action
  command: "SSG:DBC{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: dynamic_backlight_query
  label: Dynamic Backlight Query
  kind: query
  command: "QSG:DBC"
  params: []
- id: edid_select_set
  label: EDID Select
  kind: action
  command: "SSG:EID{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2, 3]
      description: 0 4K/60p/SDR / 1 4K/30p / 2 2K / 3 4K/60p/HDR
- id: edid_select_query
  label: EDID Select Query
  kind: query
  command: "QSG:EID"
  params: []
- id: dynamic_range_set
  label: Dynamic Range
  kind: action
  command: "SSG:DNR{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2, 3]
      description: 0 Auto / 1 HDR(PQ) / 2 HDR(HLG) / 3 SDR
- id: dynamic_range_query
  label: Dynamic Range Query
  kind: query
  command: "QSG:DNR"
  params: []
- id: colour_gamut_set
  label: Colour Gamut
  kind: action
  command: "SSG:CLG{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2]
      description: 0 Auto / 1 Native / 2 ITU-2020 emu
- id: colour_gamut_query
  label: Colour Gamut Query
  kind: query
  command: "QSG:CLG"
  params: []

# Power-on settings
- id: initial_input_set
  label: Initial Input
  kind: action
  command: "OSP:IIN{input}"
  params:
    - name: input
      type: string
      values: [OFF, HM1, HM2, DP1, DL1, DV1, SL1, NW1, UD1, MV1, MUI]
- id: initial_input_query
  label: Initial Input Query
  kind: query
  command: "QSP:IIN"
  params: []
- id: initial_startup_set
  label: Initial Startup
  kind: action
  command: "OSP:ISU{mode}"
  params:
    - name: mode
      type: string
      values: [LST, PON, STB]
      description: LST Last memory / PON On / STB Standby
- id: initial_startup_query
  label: Initial Startup Query
  kind: query
  command: "QSP:ISU"
  params: []
- id: initial_vol_set
  label: Initial VOL Level
  kind: action
  command: "OSP:IVL{function}{volume}"
  params:
    - name: function
      type: integer
      values: [0, 1]
    - name: volume
      type: string
      range: ["000", "100"]
- id: initial_vol_query
  label: Initial VOL Query
  kind: query
  command: "QSP:IVL"
  params: []
- id: power_on_screen_delay_set
  label: Power ON Screen Delay
  kind: action
  command: "OSP:POD{delay}"
  params:
    - name: delay
      type: string
      values: [AT, "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"]
- id: power_on_screen_delay_query
  label: Power ON Screen Delay Query
  kind: query
  command: "QSP:POD"
  params: []
- id: info_no_activity_power_off_set
  label: Information (No activity power off)
  kind: action
  command: "OSP:NAP{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: info_no_activity_power_off_query
  label: Info No Activity Power Off Query
  kind: query
  command: "QSP:NAP"
  params: []
- id: info_power_management_set
  label: Information (Power management)
  kind: action
  command: "OSP:PMM{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: info_power_management_query
  label: Info Power Management Query
  kind: query
  command: "QSP:PMM"
  params: []
- id: info_display_upside_down_set
  label: Information (Display upside-down)
  kind: action
  command: "OSP:DUD{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: info_display_upside_down_query
  label: Info Display Upside-Down Query
  kind: query
  command: "QSP:DUD"
  params: []
- id: quick_start_set
  label: Quick Start
  kind: action
  command: "SSU:QST{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: quick_start_query
  label: Quick Start Query
  kind: query
  command: "QSU:QST"
  params: []

# Input search
- id: input_search_set
  label: Input Search
  kind: action
  command: "ISH:FNC{mode}"
  params:
    - name: mode
      type: string
      values: [OFF, ALL, PRI, IDC]
- id: input_search_query
  label: Input Search Query
  kind: query
  command: "QSH:FNC"
  params: []
- id: search_1st_input_set
  label: 1st Search Input
  kind: action
  command: "ISH:PRI{input}"
  params:
    - name: input
      type: string
      values: [NON, HM1, HM2, DP1, DL1, DV1, SL1, UD1]
- id: search_1st_input_query
  label: 1st Search Input Query
  kind: query
  command: "QSH:PRI"
  params: []
- id: search_2nd_input_set
  label: 2nd Search Input
  kind: action
  command: "ISH:SCI{input}"
  params:
    - name: input
      type: string
      values: [NON, HM1, HM2, DP1, DL1, DV1, SL1, UD1]
- id: search_2nd_input_query
  label: 2nd Search Input Query
  kind: query
  command: "QSH:SCI"
  params: []
- id: detect_digital_input_set
  label: Detect Digital Input
  kind: action
  command: "ISH:DIN{input}{state}"
  params:
    - name: input
      type: string
      values: [HM1, HM2, DP1, DL1, DV1]
    - name: state
      type: integer
      values: [0, 1]
- id: detect_digital_input_query
  label: Detect Digital Input Query
  kind: query
  command: "QSH:DIN{input}"
  params:
    - name: input
      type: string
      values: [HM1, HM2, DP1, DL1, DV1]
- id: search_changing_delay_set
  label: Search Changing Delay
  kind: action
  command: "ISH:CGD{delay}"
  params:
    - name: delay
      type: string
      range: ["00", "10"]
- id: search_changing_delay_query
  label: Search Changing Delay Query
  kind: query
  command: "QSH:CGD"
  params: []

# Failover/Failback
- id: failover_mode_off
  label: Input Change Mode Off
  kind: action
  command: "SBI:OFF"
  params: []
- id: failover_mode_quick
  label: Input Change Mode Quick
  kind: action
  command: "SBI:QIC{primary}{secondary}{autoswitchback}"
  params:
    - name: primary
      type: string
      values: [NON, HM1, HM2, DP1, DV1, SL1]
    - name: secondary
      type: string
      values: [NON, HM1, HM2, DP1, DV1, SL1]
    - name: autoswitchback
      type: integer
      values: [0, 1]
- id: failover_mode_normal
  label: Input Change Mode Normal
  kind: action
  command: "SBI:NOR{primary}{secondary}{autoswitchback}"
  params:
    - name: primary
      type: string
      values: [NON, HM1, HM2, DP1, DL1, DV1, SL1, UD1]
    - name: secondary
      type: string
      values: [NON, HM1, HM2, DP1, DL1, DV1, SL1, UD1]
    - name: autoswitchback
      type: integer
      values: [0, 1]
- id: failover_query
  label: Failover Input Mode Query
  kind: query
  command: "QBI"
  params: []
- id: failover_changing_mode_set
  label: Failover Changing Mode
  kind: action
  command: "SBI:CHM{mode}"
  params:
    - name: mode
      type: integer
      values: [1, 2]
      description: 1 Normal speed / 2 High speed (only when [Quick] selected)
- id: failover_changing_mode_query
  label: Failover Changing Mode Query
  kind: query
  command: "QBI:CHM"
  params: []
- id: backup_input_status_query
  label: Backup Input Status Query
  kind: query
  command: "QBI:STS"
  params: []
- id: backup_input_signal_status_query
  label: Backup Input Signal Status Query
  kind: query
  command: "QBI:SIG"
  params: []
- id: manual_switch_back
  label: Manual Switch Back
  kind: action
  command: "BIP:FSB"
  params: []

# Screensaver
- id: screensaver_set
  label: Screensaver ON/OFF
  kind: action
  command: "OSP:SCR{state}"
  params:
    - name: state
      type: integer
      values: [0, 5]
      description: 0 stop / 5 operating
- id: screensaver_query
  label: Screensaver Query
  kind: query
  command: "QSP:SCR"
  params: []
- id: screensaver_mode_set
  label: Screensaver Mode
  kind: action
  command: "SSC:MOD{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2, 3, 4]
      description: "0 OFF / 1 Interval / 2 Time Designation / 3 ON / 4 Standby after Screensaver"
- id: screensaver_mode_query
  label: Screensaver Mode Query
  kind: query
  command: "QSC:MOD"
  params: []
- id: interval_screensaver_set
  label: Interval Screensaver
  kind: action
  command: "SSC:INT{period}{operating}"
  params:
    - name: period
      type: string
      range: ["0000", "2359"]
    - name: operating
      type: string
      range: ["0000", "2359"]
- id: interval_screensaver_query
  label: Interval Screensaver Query
  kind: query
  command: "QSC:INT"
  params: []
- id: time_designation_screensaver_set
  label: Time Designation Screensaver
  kind: action
  command: "SSC:TIM{start}{finish}"
  params:
    - name: start
      type: string
      range: ["0000", "2359"]
    - name: finish
      type: string
      range: ["0000", "2359"]
- id: time_designation_screensaver_query
  label: Time Designation Screensaver Query
  kind: query
  command: "QSC:TIM"
  params: []
- id: standby_after_screensaver_set
  label: Standby After Screensaver
  kind: action
  command: "SSC:AOF{time}"
  params:
    - name: time
      type: string
      range: ["0000", "2359"]
- id: standby_after_screensaver_query
  label: Standby After Screensaver Query
  kind: query
  command: "QSC:AOF"
  params: []
- id: wobbling_set
  label: Screensaver Wobbling
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

# Input label
- id: set_label_current_input
  label: Set Label for Current Input
  kind: action
  command: "SSU:ILA{label}"
  params:
    - name: label
      type: string
      values: [INP, DV1, DV2, DV3, BD1, BD2, BD3, CTV, VCR, STB, SKP]
- id: set_label_current_input_query
  label: Set Label Query (Current)
  kind: query
  command: "QSU:ILA"
  params: []
- id: set_label_each_input
  label: Set Label for Each Input
  kind: action
  command: "SSU:ILA{input}{label}"
  params:
    - name: input
      type: string
      values: [HM1, HM2, DP1, DL1, DV1, SL1]
    - name: label
      type: string
      values: [INP, PCN, DV1, DV2, DV3, BD1, BD2, BD3, CTV, VCR, STB, SKP]
- id: set_label_each_input_query
  label: Set Label Query (Each)
  kind: query
  command: "QSU:ILA{input}"
  params:
    - name: input
      type: string
      values: [HM1, HM2, DP1, DL1, DV1, SL1]

# Audio input select
- id: audio_input_current
  label: Audio Input Select (Current Input)
  kind: action
  command: "SAI:A{audio}"
  params:
    - name: audio
      type: string
      values: [HM1, HM2, DP1, DL1, SL1, NW1, AI1, NAD]
- id: audio_input_current_query
  label: Audio Input Select (Current) Query
  kind: query
  command: "QAI"
  params: []
- id: audio_input_each
  label: Audio Input Select (Each Input)
  kind: action
  command: "SAI:V{input}A{audio}"
  params:
    - name: input
      type: string
      values: [HM1, HM2, DP1, DL1, DV1, SL1, NW1]
    - name: audio
      type: string
      values: [HM1, HM2, DP1, DL1, SL1, NW1, AI1, NAD]
- id: audio_input_each_query
  label: Audio Input Select (Each) Query
  kind: query
  command: "QAI:V{input}"
  params:
    - name: input
      type: string
      values: [HM1, HM2, DP1, DL1, DV1, SL1, NW1]

# Power management
- id: power_management_mode_set
  label: Power Management Mode
  kind: action
  command: "SSU:ECS{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2]
      description: 0 CUSTOM / 1 ON / 2 Input detection
- id: power_management_mode_query
  label: Power Management Mode Query
  kind: query
  command: "QSU:ECS"
  params: []
- id: no_signal_power_off_set
  label: No Signal Power Off
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
- id: hdmi1_power_management_set
  label: HDMI1 Power Management
  kind: action
  command: "SSU:D1H{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: hdmi1_power_management_query
  label: HDMI1 PM Query
  kind: query
  command: "QSU:D1H"
  params: []
- id: hdmi2_power_management_set
  label: HDMI2 Power Management
  kind: action
  command: "SSU:D2H{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: hdmi2_power_management_query
  label: HDMI2 PM Query
  kind: query
  command: "QSU:D2H"
  params: []
- id: displayport_power_management_set
  label: DisplayPort Power Management
  kind: action
  command: "SSU:D1P{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: displayport_power_management_query
  label: DisplayPort PM Query
  kind: query
  command: "QSU:D1P"
  params: []
- id: digital_link_power_management_set
  label: DIGITAL LINK Power Management
  kind: action
  command: "SSU:D1L{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: digital_link_power_management_query
  label: DIGITAL LINK PM Query
  kind: query
  command: "QSU:D1L"
  params: []
- id: dvi_d_power_management_set
  label: DVI-D Power Management
  kind: action
  command: "SSU:D1V{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: dvi_d_power_management_query
  label: DVI-D PM Query
  kind: query
  command: "QSU:D1V"
  params: []
- id: power_save_set
  label: Power Save
  kind: action
  command: "SSU:ECO{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: power_save_query
  label: Power Save Query
  kind: query
  command: "QSU:ECO"
  params: []
- id: extended_standby_mode_set
  label: Extended Standby Mode
  kind: action
  command: "SSU:ESM{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: extended_standby_mode_query
  label: Extended Standby Query
  kind: query
  command: "QSU:ESM"
  params: []
- id: pm_changing_delay_set
  label: Power Management Changing Delay
  kind: action
  command: "SSU:CGD{delay}"
  params:
    - name: delay
      type: string
      range: ["00", "10"]
- id: pm_changing_delay_query
  label: PM Changing Delay Query
  kind: query
  command: "QSU:CGD"
  params: []

# External device link
- id: device_information_set
  label: Device Information
  kind: action
  command: "SSU:DDP{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: device_information_query
  label: Device Information Query
  kind: query
  command: "QSU:DDP"
  params: []
- id: wireless_presentation_link_set
  label: Wireless Presentation Link
  kind: action
  command: "SSU:WIS{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: wireless_presentation_link_query
  label: Wireless Presentation Link Query
  kind: query
  command: "QSU:WIS"
  params: []

# HDMI-CEC
- id: hdmi_cec_set
  label: HDMI-CEC Control
  kind: action
  command: "SHC:FNC{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: hdmi_cec_query
  label: HDMI-CEC Query
  kind: query
  command: "QHC:FNC"
  params: []
- id: hdmi1_cec_change_device
  label: HDMI1 CEC Change Device
  kind: action
  command: "SHC:HM1{dir}"
  params:
    - name: dir
      type: string
      values: [NXT, PRE]
- id: hdmi1_cec_device_name_query
  label: HDMI1 CEC Device Name Query
  kind: query
  command: "QHC:HM1"
  params: []
- id: hdmi2_cec_change_device
  label: HDMI2 CEC Change Device
  kind: action
  command: "SHC:HM2{dir}"
  params:
    - name: dir
      type: string
      values: [NXT, PRE]
- id: hdmi2_cec_device_name_query
  label: HDMI2 CEC Device Name Query
  kind: query
  command: "QHC:HM2"
  params: []
- id: slot_cec_change_device
  label: SLOT CEC Change Device
  kind: action
  command: "SHC:SL1{dir}"
  params:
    - name: dir
      type: string
      values: [NXT, PRE]
- id: slot_cec_device_name_query
  label: SLOT CEC Device Name Query
  kind: query
  command: "QHC:SL1"
  params: []
- id: cec_menu_code_set
  label: CEC Menu Code
  kind: action
  command: "SHC:MNC{code}"
  params:
    - name: code
      type: integer
      range: [1, 6]
- id: cec_menu_code_query
  label: CEC Menu Code Query
  kind: query
  command: "QHC:MNC"
  params: []
- id: cec_display_to_device_set
  label: CEC Display to Device
  kind: action
  command: "SHC:PTS{mode}"
  params:
    - name: mode
      type: string
      values: [OFF, POF, PWR]
- id: cec_display_to_device_query
  label: CEC D→D Query
  kind: query
  command: "QHC:PTS"
  params: []
- id: cec_device_to_display_set
  label: CEC Device to Display
  kind: action
  command: "SHC:STP{mode}"
  params:
    - name: mode
      type: string
      values: [OFF, PON, PWR]
- id: cec_device_to_display_query
  label: CEC Device→Display Query
  kind: query
  command: "QHC:STP"
  params: []

# Image settings
- id: startup_image_set
  label: Startup Image Display
  kind: action
  command: "SCI:SIM{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: startup_image_query
  label: Startup Image Query
  kind: query
  command: "QCI:SIM"
  params: []
- id: startup_image_select_set
  label: Startup Image Select
  kind: action
  command: "SCI:SCG{source}"
  params:
    - name: source
      type: integer
      values: [0, 1]
      description: 0 Default / 1 User
- id: startup_image_select_query
  label: Startup Image Select Query
  kind: query
  command: "QCI:SCG"
  params: []
- id: no_signal_image_set
  label: No Signal Image Display
  kind: action
  command: "SCI:NIM{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: no_signal_image_query
  label: No Signal Image Query
  kind: query
  command: "QCI:NIM"
  params: []
- id: no_signal_image_select_set
  label: No Signal Image Select
  kind: action
  command: "SCI:NCG{source}"
  params:
    - name: source
      type: integer
      values: [0, 1]
- id: no_signal_image_select_query
  label: No Signal Image Select Query
  kind: query
  command: "QCI:NCG"
  params: []

# Timer
- id: timer_setup_set
  label: Timer Setup Detail
  kind: action
  command: "TIM:PRG{num}{on}{day}{action}{time}{input}"
  params:
    - name: num
      type: string
      range: ["01", "20"]
    - name: on
      type: integer
      values: [0, 1]
    - name: day
      type: string
      values: [SUN, MON, TUE, WED, THU, FRI, SAT, EVD, WDA, WEN, CUS]
    - name: action
      type: string
      values: [PON, POF]
    - name: time
      type: string
      range: ["0000", "2359"]
    - name: input
      type: string
      values: [HM1, HM2, DP1, DL1, DV1, SL1, NW1, UD1, MV1, MUI]
- id: timer_setup_query
  label: Timer Setup Query
  kind: query
  command: "QIM:PRG{num}"
  params:
    - name: num
      type: string
      range: ["01", "20"]
- id: timer_multi_day_set
  label: Timer Multiple Day Specification
  kind: action
  command: "TIM:PRC{num}{on}{mon}{tue}{wed}{thu}{fri}{sat}{sun}{action}{time}{input}"
  params:
    - name: num
      type: string
      range: ["01", "20"]
    - name: on
      type: integer
      values: [0, 1]
    - name: mon
      type: integer
      values: [0, 1]
    - name: tue
      type: integer
      values: [0, 1]
    - name: wed
      type: integer
      values: [0, 1]
    - name: thu
      type: integer
      values: [0, 1]
    - name: fri
      type: integer
      values: [0, 1]
    - name: sat
      type: integer
      values: [0, 1]
    - name: sun
      type: integer
      values: [0, 1]
    - name: action
      type: string
      values: [PON, POF]
    - name: time
      type: string
      range: ["0000", "2359"]
    - name: input
      type: string
      values: [HM1, HM2, DP1, DL1, DV1, SL1, NW1, UD1, MV1, MUI]
- id: timer_multi_day_query
  label: Timer Multi-Day Query
  kind: query
  command: "QIM:PRC{num}"
  params:
    - name: num
      type: string
      range: ["01", "20"]
- id: present_day_query
  label: Present Day Query
  kind: query
  command: "QIM:DAY"
  params: []
- id: present_time_query
  label: Present Time Query
  kind: query
  command: "QIM:NOW"
  params: []
- id: date_time_set
  label: Date and Time
  kind: action
  command: "TIM:DAT{yyyy}{mm}{dd}{hh}{mm}"
  params:
    - name: yyyy
      type: string
      range: ["2020", "2035"]
    - name: mm
      type: string
      range: ["01", "12"]
    - name: dd
      type: string
      range: ["01", "31"]
    - name: hh
      type: string
      range: ["00", "23"]
    - name: mm
      type: string
      range: ["00", "59"]
- id: date_time_query
  label: Date and Time Query
  kind: query
  command: "QIM:DAT"
  params: []
- id: clock_display_set
  label: Clock Display
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
- id: synchronize_display_set
  label: Synchronize Display
  kind: action
  command: "TIM:SDM{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: synchronize_display_query
  label: Synchronize Display Query
  kind: query
  command: "QIM:SDM"
  params: []
- id: parent_child_set
  label: Parent or Child Setting
  kind: action
  command: "TIM:PCS{role}"
  params:
    - name: role
      type: integer
      values: [0, 1]
      description: 0 Child / 1 Parent
- id: parent_child_query
  label: Parent or Child Query
  kind: query
  command: "QIM:PCS"
  params: []

# Network
- id: serial_control_set
  label: Serial Control
  kind: action
  command: "SCT:SEC{port}"
  params:
    - name: port
      type: string
      values: [SE1, DL1, SL1]
      description: SE1 Serial in / DL1 DIGITAL LINK / SL1 SLOT
- id: serial_control_query
  label: Serial Control Query
  kind: query
  command: "QCT:SEC"
  params: []
- id: network_control_set
  label: Network Control
  kind: action
  command: "SSU:NCT{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: network_control_query
  label: Network Control Query
  kind: query
  command: "QSU:NCT"
  params: []
- id: pjlink_control_set
  label: PJLink Control
  kind: action
  command: "SSU:PCT{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: pjlink_control_query
  label: PJLink Control Query
  kind: query
  command: "QSU:PCT"
  params: []
- id: pjlink_notification_set
  label: PJLink Notification
  kind: action
  command: "SSU:PNT{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: pjlink_notification_query
  label: PJLink Notification Query
  kind: query
  command: "QSU:PNT"
  params: []
- id: pjlink_notified_ip_set
  label: PJLink Notified IP Address
  kind: action
  command: "SSU:PIA{slot}{ip1}{ip2}{ip3}{ip4}"
  params:
    - name: slot
      type: integer
      values: [1, 2]
    - name: ip1
      type: string
      range: ["000", "255"]
    - name: ip2
      type: string
      range: ["000", "255"]
    - name: ip3
      type: string
      range: ["000", "255"]
    - name: ip4
      type: string
      range: ["000", "255"]
- id: pjlink_notified_ip_query
  label: PJLink Notified IP Query
  kind: query
  command: "QSU:PIA{slot}"
  params:
    - name: slot
      type: integer
      values: [1, 2]
- id: auto_display_name_set
  label: Auto Display Name
  kind: action
  command: "SSU:ADN{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: auto_display_name_query
  label: Auto Display Name Query
  kind: query
  command: "QSU:ADN"
  params: []
- id: display_name_set
  label: Display Name
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
- id: lan_network_address_set
  label: LAN Network Address
  kind: action
  command: "SSU:NET{ip1}{ip2}{ip3}{ip4}{sn1}{sn2}{sn3}{sn4}{gw1}{gw2}{gw3}{gw4}{dhcp}"
  params:
    - name: ip1
      type: string
      range: ["000", "255"]
    - name: ip2
      type: string
      range: ["000", "255"]
    - name: ip3
      type: string
      range: ["000", "255"]
    - name: ip4
      type: string
      range: ["000", "255"]
    - name: sn1
      type: string
      range: ["000", "255"]
    - name: sn2
      type: string
      range: ["000", "255"]
    - name: sn3
      type: string
      range: ["000", "255"]
    - name: sn4
      type: string
      range: ["000", "255"]
    - name: gw1
      type: string
      range: ["000", "255"]
    - name: gw2
      type: string
      range: ["000", "255"]
    - name: gw3
      type: string
      range: ["000", "255"]
    - name: gw4
      type: string
      range: ["000", "255"]
    - name: dhcp
      type: integer
      values: [0, 1]
- id: lan_network_address_query
  label: LAN Network Address Query
  kind: query
  command: "QSU:NET"
  params: []
- id: lan_command_port_set
  label: LAN Command Port Number
  kind: action
  command: "SSU:LCP{port}"
  params:
    - name: port
      type: integer
      range: [1024, 65535]
      description: Excluded ports: 4352, 10000, 12000, 12004, 12006, 14000, 20000, 27250, 41794
- id: lan_command_port_query
  label: LAN Command Port Query
  kind: query
  command: "QSU:LCP"
  params: []
- id: digital_link_mode_set
  label: DIGITAL LINK Mode
  kind: action
  command: "SSU:DLM{mode}"
  params:
    - name: mode
      type: string
      values: [AT, DL, EN, LR]
      description: AT Auto / DL DIGITAL LINK / EN Ethernet / LR LongReach
- id: digital_link_mode_query
  label: DIGITAL LINK Mode Query
  kind: query
  command: "QSU:DLM"
  params: []
- id: digital_link_ethernet_control_set
  label: DIGITAL LINK Ethernet Control
  kind: action
  command: "SSU:DLC{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: digital_link_ethernet_control_query
  label: DIGITAL LINK Ethernet Control Query
  kind: query
  command: "QSU:DLC"
  params: []
- id: digital_link_status_query
  label: DIGITAL LINK Status Query
  kind: query
  command: "QSU:DLS"
  params: []
- id: amx_dd_set
  label: AMX D.D.
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
  label: Crestron Connected
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
- id: extron_xtp_set
  label: Extron XTP
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
- id: usb_memory_network_set
  label: USB Memory Network Settings
  kind: action
  command: "SSU:UNS{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: usb_memory_network_query
  label: USB Memory Network Query
  kind: query
  command: "QSU:UNS"
  params: []
- id: lan_control_protocol_set
  label: LAN Control Protocol
  kind: action
  command: "OSP:LPN{protocol}"
  params:
    - name: protocol
      type: string
      values: [LP1, LP2]
- id: lan_control_protocol_query
  label: LAN Control Protocol Query
  kind: query
  command: "QSP:LPN"
  params: []
- id: network_reset
  label: Network Reset
  kind: action
  command: "SSU:LRT"
  params: []

# USB media player
- id: usb_media_player_set
  label: USB Media Player
  kind: action
  command: "SUS:UMP{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: usb_media_player_query
  label: USB Media Player Query
  kind: query
  command: "QUS:UMP"
  params: []
- id: schedule_play_set
  label: Schedule Play Function
  kind: action
  command: "SUS:SPF{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: schedule_play_query
  label: Schedule Play Query
  kind: query
  command: "QUS:SPF"
  params: []
- id: video_playback_mode_set
  label: Video Playback Mode
  kind: action
  command: "SUS:VPB{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1]
- id: video_playback_mode_query
  label: Video Playback Mode Query
  kind: query
  command: "QUS:VPB"
  params: []
- id: still_picture_rotation_set
  label: Still Picture Rotation
  kind: action
  command: "SUS:STR{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2]
- id: still_picture_rotation_query
  label: Still Picture Rotation Query
  kind: query
  command: "QUS:STR"
  params: []
- id: resume_play_set
  label: Resume Play
  kind: action
  command: "SUS:RSP{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: resume_play_query
  label: Resume Play Query
  kind: query
  command: "QUS:RSP"
  params: []
- id: slide_show_duration_set
  label: Slide Show Duration
  kind: action
  command: "SUS:SSD{seconds}"
  params:
    - name: seconds
      type: integer
      range: [10, 600]
      description: 5-second unit
- id: slide_show_duration_query
  label: Slide Show Duration Query
  kind: query
  command: "QUS:SSD"
  params: []
- id: play_mode_set
  label: Play Mode
  kind: action
  command: "SUS:SPM{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1]
      description: 0 Individual / 1 Synchronize
- id: play_mode_query
  label: Play Mode Query
  kind: query
  command: "QUS:SPM"
  params: []
- id: schedule_play_mode_query
  label: Schedule Play Mode Query
  kind: query
  command: "QUS:CMS"
  params: []

# Memory viewer
- id: memory_viewer_set
  label: Memory Viewer Function
  kind: action
  command: "SMS:MVF{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: memory_viewer_query
  label: Memory Viewer Query
  kind: query
  command: "QMS:MVF"
  params: []
- id: memory_viewer_view_set
  label: Memory Viewer View
  kind: action
  command: "SMS:VIE{view}"
  params:
    - name: view
      type: string
      values: [THU, LIS]
- id: memory_viewer_view_query
  label: Memory Viewer View Query
  kind: query
  command: "QMS:VIE"
  params: []
- id: memory_viewer_content_set
  label: Memory Viewer Content Select
  kind: action
  command: "SMS:CON{content}"
  params:
    - name: content
      type: string
      values: [STL, VID, AUD, ALL, SAV, SAA, VAA]
- id: memory_viewer_content_query
  label: Memory Viewer Content Query
  kind: query
  command: "QMS:CON"
  params: []
- id: memory_viewer_sort_type_set
  label: Memory Viewer Sort Type
  kind: action
  command: "SMS:TYP{type}"
  params:
    - name: type
      type: string
      values: [DAT, NAM]
- id: memory_viewer_sort_type_query
  label: Memory Viewer Sort Type Query
  kind: query
  command: "QMS:TYP"
  params: []
- id: memory_viewer_sort_order_set
  label: Memory Viewer Sort Order
  kind: action
  command: "SMS:ODR{order}"
  params:
    - name: order
      type: string
      values: [ASD, DSD]
- id: memory_viewer_sort_order_query
  label: Memory Viewer Sort Order Query
  kind: query
  command: "QMS:ODR"
  params: []
- id: memory_viewer_play_method_set
  label: Memory Viewer Play Method
  kind: action
  command: "SMS:RPT{method}"
  params:
    - name: method
      type: string
      values: [NON, ONE, ALL, RAN, SEL, PRG]
- id: memory_viewer_play_method_query
  label: Memory Viewer Play Method Query
  kind: query
  command: "QMS:RPT"
  params: []
- id: memory_viewer_picture_duration_set
  label: Memory Viewer Picture Duration
  kind: action
  command: "SMS:SSD{seconds}"
  params:
    - name: seconds
      type: integer
      range: [10, 600]
- id: memory_viewer_picture_duration_query
  label: Memory Viewer Picture Duration Query
  kind: query
  command: "QMS:SSD"
  params: []
- id: memory_viewer_info_set
  label: Memory Viewer Auto Display Content Info
  kind: action
  command: "SMS:INF{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: memory_viewer_info_query
  label: Memory Viewer Info Query
  kind: query
  command: "QMS:INF"
  params: []
- id: memory_viewer_guide_set
  label: Memory Viewer Auto Display Operation Guide
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

# Screen Transfer
- id: screen_transfer_set
  label: Screen Transfer Function
  kind: action
  command: "SSU:STF{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: screen_transfer_query
  label: Screen Transfer Query
  kind: query
  command: "QSU:STF"
  params: []
- id: screen_transfer_cut_in_set
  label: Screen Transfer Cut In
  kind: action
  command: "SSU:STC{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: screen_transfer_cut_in_query
  label: Screen Transfer Cut In Query
  kind: query
  command: "QSU:STC"
  params: []
- id: screen_transfer_pin_set
  label: Screen Transfer PIN Code
  kind: action
  command: "SSU:STP{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: screen_transfer_pin_query
  label: Screen Transfer PIN Query
  kind: query
  command: "QSU:STP"
  params: []

# Wireless presentation
- id: wireless_bg_color_set
  label: Wireless Presentation Background Color
  kind: action
  command: "SSU:WBC{color}"
  params:
    - name: color
      type: integer
      values: [0, 1]
      description: 0 Black / 1 Blue
- id: wireless_bg_color_query
  label: Wireless BG Color Query
  kind: query
  command: "QSU:WBC"
  params: []
- id: wireless_date_time_set
  label: Wireless Presentation Date/Time Setting
  kind: action
  command: "SSU:WDT{format}"
  params:
    - name: format
      type: string
      values: ["000", "001", "002", "003", "004", "005", "006", "007", "008", "009", "010"]
- id: wireless_date_time_query
  label: Wireless Date/Time Query
  kind: query
  command: "QSU:WDT"
  params: []
- id: wireless_language_link_set
  label: Wireless Presentation Language Link
  kind: action
  command: "SSU:WLG{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: wireless_language_link_query
  label: Wireless Language Link Query
  kind: query
  command: "QSU:WLG"
  params: []

# Function button
- id: function_group_set
  label: Function Group
  kind: action
  command: "OSP:KGR{group}"
  params:
    - name: group
      type: string
      values: [INP, MEM, ACT]
- id: function_group_query
  label: Function Group Query
  kind: query
  command: "QSP:KGR"
  params: []
- id: function_button_set
  label: Function Button Settings
  kind: action
  command: "OSP:KFN{key}{action}"
  params:
    - name: key
      type: integer
      range: [1, 6]
    - name: action
      type: string
      description: SHORTCUT: SIG/SSV/SUT/LNS/ECO/OSH/MLT/PRT/PDS/DZM/MSW/DID/HCO/PLE; INPUT: HM1/HM2/DP1/DL1/DV1/SL1/NW1/UD1/MV1
- id: function_button_query
  label: Function Button Query
  kind: query
  command: "QSP:KFN{key}"
  params:
    - name: key
      type: integer
      range: [1, 6]
- id: function_guide_set
  label: Function Guide
  kind: action
  command: "OSP:KFG{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: function_guide_query
  label: Function Guide Query
  kind: query
  command: "QSP:KFG"
  params: []

# OSD
- id: menu_position_set
  label: Menu Position
  kind: action
  command: "SSU:OPS{pos}"
  params:
    - name: pos
      type: integer
      values: [1, 2, 3]
- id: menu_position_query
  label: Menu Position Query
  kind: query
  command: "QSU:OPS"
  params: []
- id: menu_display_duration_set
  label: Menu Display Duration
  kind: action
  command: "SSU:MDT{seconds}"
  params:
    - name: seconds
      type: integer
      range: [5, 180]
      description: 5-second unit
- id: menu_display_duration_query
  label: Menu Display Duration Query
  kind: query
  command: "QSU:MDT"
  params: []
- id: on_screen_display_set
  label: On Screen Display
  kind: action
  command: "OSP:OSD{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: on_screen_display_query
  label: On Screen Display Query
  kind: query
  command: "QSP:OSD"
  params: []
- id: osd_transparency_set
  label: OSD Transparency
  kind: action
  command: "SSU:MTL{level}"
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: 10% unit
- id: osd_transparency_query
  label: OSD Transparency Query
  kind: query
  command: "QSU:MTL"
  params: []

# Control settings
- id: display_id_query
  label: Display ID Query
  kind: query
  command: "QID:DID"
  params: []
- id: serial_id_function_set
  label: Serial ID Function
  kind: action
  command: "SID:SID{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: serial_id_function_query
  label: Serial ID Function Query
  kind: query
  command: "QID:SID"
  params: []
- id: serial_response_normal_set
  label: Serial Response (Normal)
  kind: action
  command: "SCT:RIN{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: serial_response_normal_query
  label: Serial Response (Normal) Query
  kind: query
  command: "QCT:RIN"
  params: []
- id: serial_response_id_all_set
  label: Serial Response (ID all)
  kind: action
  command: "SCT:RIA{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: serial_response_id_all_query
  label: Serial Response (ID all) Query
  kind: query
  command: "QCT:RIA"
  params: []
- id: serial_id_setup_set
  label: Serial ID Setup
  kind: action
  command: "SIF{on}{id}"
  params:
    - name: on
      type: integer
      values: [0, 1]
    - name: id
      type: string
      range: ["000", "100"]
- id: serial_id_setup_query
  label: Serial ID Setup Query
  kind: query
  command: "QIF"
  params: []

# Long life / sensors
- id: long_life_mode_set
  label: Long Life Mode
  kind: action
  command: "SLS:LLS{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: long_life_mode_query
  label: Long Life Mode Query
  kind: query
  command: "QLS:LLS"
  params: []
- id: ambient_light_sensor_set
  label: Ambient Light Sensor
  kind: action
  command: "SSU:ALS{level}"
  params:
    - name: level
      type: integer
      values: [0, 1, 2, 3]
- id: ambient_light_sensor_query
  label: Ambient Light Sensor Query
  kind: query
  command: "QSU:ALS"
  params: []
- id: proximity_sensor_set
  label: Proximity Sensor
  kind: action
  command: "SSU:PRS{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1]
      description: 0 Off / 1 Content operation
- id: proximity_sensor_query
  label: Proximity Sensor Query
  kind: query
  command: "QSU:PRS"
  params: []
- id: color_sensor_set
  label: Color Sensor
  kind: action
  command: "SSU:CLS{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1]
      description: 0 Off / 1 Color temperature setting
- id: color_sensor_query
  label: Color Sensor Query
  kind: query
  command: "QSU:CLS"
  params: []

# Information timing
- id: no_signal_warning_set
  label: No Signal Warning
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
  label: No Signal Warning Timing
  kind: action
  command: "SIT:SWT{minutes}"
  params:
    - name: minutes
      type: string
      range: ["01", "60"]
- id: no_signal_warning_timing_query
  label: No Signal Warning Timing Query
  kind: query
  command: "QIT:SWT"
  params: []
- id: no_signal_warning_status_query
  label: No Signal Warning Status Query
  kind: query
  command: "QST:NSW"
  params: []
- id: no_signal_error_set
  label: No Signal Error
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
  label: No Signal Error Timing
  kind: action
  command: "SIT:SET{minutes}"
  params:
    - name: minutes
      type: string
      range: ["01", "90"]
- id: no_signal_error_timing_query
  label: No Signal Error Timing Query
  kind: query
  command: "QIT:SET"
  params: []
- id: no_signal_error_status_query
  label: No Signal Error Status Query
  kind: query
  command: "QST:NSE"
  params: []
- id: temperature_warning_set
  label: Temperature Warning
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
- id: temperature_status_query
  label: Temperature Status Query
  kind: query
  command: "QST:TO"
  params: []
- id: slot_version_query
  label: SLOT Version Query
  kind: query
  command: "QSU:SIV"
  params: []
- id: slot_power_link_set
  label: SLOT Power Link
  kind: action
  command: "SSU:SPL{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: slot_power_link_query
  label: SLOT Power Link Query
  kind: query
  command: "QSU:SPL"
  params: []
- id: slot_standby_set
  label: SLOT Standby
  kind: action
  command: "SSU:SSB{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: slot_standby_query
  label: SLOT Standby Query
  kind: query
  command: "QSU:SSB"
  params: []
- id: slot_forced_termination
  label: SLOT Forced Termination
  kind: action
  command: "SSU:SOF"
  params: []
- id: slot_power_on
  label: SLOT Power On
  kind: action
  command: "SSU:SON"
  params: []

# Others
- id: recall
  label: Recall
  kind: action
  command: "DDS"
  params: []
- id: display_id_displayname
  label: Display ID / Display Name
  kind: action
  command: "DDS:DID"
  params: []
- id: audio_mute_other
  label: Audio Mute
  kind: action
  command: "AOC{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: osd_clear
  label: OSD Clear
  kind: action
  command: "VDO"
  params: []
- id: digital_zoom_set
  label: Digital Zoom
  kind: action
  command: "DZM{on}{factor}{hpos}{vpos}"
  params:
    - name: on
      type: integer
      values: [0, 1]
    - name: factor
      type: integer
      range: [1, 4]
    - name: hpos
      type: integer
      range: [1, 5]
    - name: vpos
      type: integer
      range: [1, 5]
- id: digital_zoom_query
  label: Digital Zoom Query
  kind: query
  command: "QDZ"
  params: []
- id: off_timer
  label: Off Timer
  kind: action
  command: "ZOT{minutes}"
  params:
    - name: minutes
      type: string
      range: ["00", "90"]
- id: ump_next
  label: USB Media Player Next File
  kind: action
  command: "UMP:NXT"
  params: []
- id: ump_previous
  label: USB Media Player Previous File
  kind: action
  command: "UMP:PRE"
  params: []
- id: ump_replay
  label: USB Media Player Replay
  kind: action
  command: "UMP:RPY"
  params: []
- id: signal_status_query
  label: Signal Status Query
  kind: query
  command: "QST:SGS"
  params: []
- id: signal_frequency_query
  label: Signal Frequency Query
  kind: query
  command: "QFR"
  params: []
- id: signal_format_query
  label: Signal Format Query
  kind: query
  command: "QSF"
  params: []
- id: digital_link_detail_query
  label: DIGITAL LINK Detail Query
  kind: query
  command: "QST:DLD"
  params: []
- id: hdcp_status_query
  label: HDCP Status Query
  kind: query
  command: "QST:DCP"
  params: []
- id: monitor_used_time_query
  label: Monitor Used Time Query
  kind: query
  command: "QST:PT"
  params: []
- id: fan_used_time_query
  label: Fan Used Time Query
  kind: query
  command: "QST:F1T"
  params: []
- id: hostname_set
  label: Hostname
  kind: action
  command: "SSU:HSN{name}"
  params:
    - name: name
      type: string
      max_length: 20
- id: hostname_query
  label: Hostname Query
  kind: query
  command: "QSU:HSN"
  params: []
- id: auto_command_send_set
  label: Auto Command Send Setting
  kind: action
  command: "RCM{qss}{stserr}"
  params:
    - name: qss
      type: integer
      values: [0, 1]
    - name: stserr
      type: integer
      values: [0, 1]
- id: model_name_query
  label: Model Name Query
  kind: query
  command: "QMN"
  params: []
- id: model_id_query
  label: Model ID Query
  kind: query
  command: "QID"
  params: []
- id: sw_main_mcu_version_query
  label: Main MCU Software Version Query
  kind: query
  command: "QRV"
  params: []
- id: sw_sub_mcu_version_query
  label: Sub MCU Software Version Query
  kind: query
  command: "QRV:STB"
  params: []
- id: sw_fe_version_query
  label: FE Software Version Query
  kind: query
  command: "QRV:FRE"
  params: []
- id: sw_eeprom_version_query
  label: EEPROM Software Version Query
  kind: query
  command: "QRV:EEP"
  params: []
- id: sw_hdbaset_version_query
  label: HDBaseT RX Software Version Query
  kind: query
  command: "QRV:HBT"
  params: []
- id: sw_fpga_version_query
  label: FPGA Software Version Query
  kind: query
  command: "QRV:FP1"
  params: []
- id: sw_sdi_fpga_version_query
  label: SDI FPGA Software Version Query
  kind: query
  command: "QRV:FP2"
  params: []
- id: sw_frc_version_query
  label: FRC Software Version Query
  kind: query
  command: "QRV:FRC"
  params: []
- id: serial_number_query
  label: Serial Number Query
  kind: query
  command: "QSN"
  params: []
- id: mac_address_query
  label: MAC Address Query
  kind: query
  command: "QMA"
  params: []
- id: lan_data_cloning_write_protect_set
  label: LAN Data Cloning Write Protect
  kind: action
  command: "LCL:WRP{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
- id: lan_data_cloning_write_protect_query
  label: LAN Data Cloning Write Protect Query
  kind: query
  command: "QCL:WRP"
  params: []

# Light ID (Japan only)
- id: lightid_mode_set
  label: LightID Mode
  kind: action
  command: "LID:MOD{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2]
      description: 0 Off / 1 External Control / 2 Internal ID
- id: lightid_mode_query
  label: LightID Mode Query
  kind: query
  command: "QLI:MOD"
  params: []
- id: lightid_stop
  label: Stop LightID
  kind: action
  command: "LID:STP"
  params: []
- id: lightid_backlight_blt
  label: LightID BackLight (BLT)
  kind: action
  command: "LID:BLT{level}"
  params:
    - name: level
      type: integer
      values: [1, 2, 3]
      description: 1 Low / 2 Middle / 3 High
- id: lightid_backlight_blt_query
  label: LightID BackLight (BLT) Query
  kind: query
  command: "QLI:BLT"
  params: []
- id: lightid_backlight_blc
  label: LightID BackLight (BLC)
  kind: action
  command: "LID:BLC{level}"
  params:
    - name: level
      type: integer
      values: [1, 2, 3]
- id: lightid_backlight_blc_query
  label: LightID BackLight (BLC) Query
  kind: query
  command: "QLI:BLC"
  params: []

# Serial ID prefix (when SID enabled) - use as command prefix, not a separate action
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  command: "QPW"
  description: "0 Standby / 1 Power ON"
- id: current_input
  type: string
  values: [HM1, HM2, DP1, DL1, DV1, SL1, NW1, UD1, MV1]
  command: "QMI"
- id: audio_volume
  type: integer
  range: [0, 100]
  command: "QAV"
- id: audio_mute_state
  type: enum
  values: [off, on]
  command: "QAM"
- id: video_mute_state
  type: enum
  values: [off, on]
  command: "QVM"
- id: aspect
  type: string
  values: [FULL, NORM, NATV, HFIT, VFIT, ZOOM, ZOM2]
  command: "QAS"
- id: serial_number
  type: string
  command: "QSN"
- id: mac_address
  type: string
  command: "QMA"
  description: 12 hex chars, requires Main software 3.0000+
- id: model_name
  type: string
  command: "QMN"
- id: model_id
  type: string
  command: "QID"
- id: monitor_used_time
  type: integer
  range: [0, 99999]
  command: "QST:PT"
  description: hours
- id: fan_used_time
  type: integer
  range: [0, 99999]
  command: "QST:F1T"
  description: hours
- id: signal_status
  type: enum
  values: [valid, no_signal, unsupported]
  command: "QST:SGS"
- id: temperature_status
  type: enum
  values: [normal, high]
  command: "QST:TO"
- id: hdcp_status
  type: string
  values: [PRT, NON, "---"]
  command: "QST:DCP"
- id: no_signal_warning_status
  type: enum
  values: [ok, warning]
  command: "QST:NSW"
- id: no_signal_error_status
  type: enum
  values: [ok, error]
  command: "QST:NSE"
```

## Variables
```yaml
# No separate Variables section - every parameter is a discrete action above.
# (UNRESOLVED: source does not distinguish settable parameters from action values;
# all numeric values are passed as part of action commands.)
```

## Events
```yaml
# Auto / unsolicited status messages while RS-232C controls are active.
- id: no_signal_warning
  description: Display sends QST:NSW* automatically when No Signal Warning triggers.
  payload: "QST:NSW{0|1}"
- id: no_signal_error
  description: Display sends QST:NSE* automatically when No Signal Error triggers.
  payload: "QST:NSE{0|1}"
- id: temperature_warning
  description: Display sends QST:TO* automatically when temperature warning triggers.
  payload: "QST:TO{0|1}"
- id: invalid_command
  description: Reply ER401 when an incorrect command is sent.
  payload: "ER401"
```

## Macros
```yaml
# UNRESOLVED: source does not define multi-step macro sequences.
# Operator may compose actions into macros externally; this spec is a flat command catalogue.
```

## Safety
```yaml
confirmation_required_for:
  - power_off
  - slot_forced_termination
interlocks: []
# UNRESOLVED: source does not document safety interlocks, fault-recovery procedures,
# or high-temperature shutdown thresholds beyond the QST:TO temperature-warning notification.
```

## Notes
- Source document PDF header reads "TH-86/75SQ1H", not TH-4xLF30U. Command set and ASCII protocol framing are treated as identical across these Panasonic professional display lines based on the manufacturer's RS232C command list family.
- Frame Creation (VPC:FRC) is documented as "86SQ1H only" in source; if the target LF30U model lacks the feature the action will have no effect.
- Cable type: straight (per source). Do not use null-modem.
- Standby behaviour: with power off (standby), the display responds to PON and QPW only.
- Wait-for-response rule: send one command, wait for reply, then send the next. Source explicitly forbids pipelining.
- Display ID (serial) addressing: prefix commands with `<STX>AD94;RAD:NNN;` or `<STX>RAD:NNN;` when SID is enabled. `NNN` = 3-digit Display ID 000-100. Use 000 to address any display. Inquiry commands are inoperable when using 000.
- LAN control requires MD5 authentication: Protocol 1 hashes 8-byte random + admin password; Protocol 2 hashes username + ":" + password + ":" + 8-byte random. Default TCP command port: 1024. Excluded ports: 4352, 10000, 12000, 12004, 12006, 14000, 20000, 27250, 41794.
- LAN Control Protocol 2 omits the first four characters of the reply when responding to inquiry commands.
- RS-232C frame format: `<STX>(CMD 3 bytes)[:PARAMS]<ETX>`; e.g. Power On = `02 50 4F 4E 03`, Picture+85 = `02 56 50 43 3A 30 38 35 03`.
- LightID section applies to Japan-market models only.

<!-- UNRESOLVED: source targets TH-86/75SQ1H; applied to TH-4xLF30U based on cross-family assumption. Verify on hardware before relying on the full catalogue. -->
<!-- UNRESOLVED: full safety, fault behavior, and error-recovery sequences not present in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - docs.connect.panasonic.com
  - manualslib.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/SQ1H_SerialCommandList.pdf
  - https://docs.connect.panasonic.com/prodisplays/support/rs232c_commandlist.html
  - https://www.manualslib.com/manual/437850/Panasonic-Th-42lf30u.html
  - https://docs.connect.panasonic.com/prodisplays/
retrieved_at: 2026-09-02T20:32:55.184Z
last_checked_at: 2026-09-17T22:22:04.499Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-17T22:22:04.499Z
matched_actions: 470
action_count: 470
confidence: medium
summary: "All 470 spec actions have wire-literal matches in the source command table; transport values are confirmed in Protocol section; spec covers full source command catalogue. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source PDF header identifies the TH-86/75SQ1H series, not TH-4xLF30U. Command set and protocol framing treated as identical pending verification against an LF30U unit."
- "firmware version compatibility not stated in source."
- "full safety, fault behavior, and error-recovery procedures not present in source."
- "no HTTP base URL - LAN uses raw TCP socket, not HTTP"
- "source does not distinguish settable parameters from action values;"
- "source does not define multi-step macro sequences."
- "source does not document safety interlocks, fault-recovery procedures,"
- "source targets TH-86/75SQ1H; applied to TH-4xLF30U based on cross-family assumption. Verify on hardware before relying on the full catalogue."
- "full safety, fault behavior, and error-recovery sequences not present in source."
- "firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
