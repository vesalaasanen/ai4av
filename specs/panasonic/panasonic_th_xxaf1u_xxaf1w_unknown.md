---
spec_id: admin/panasonic-th-xxaf1u-xxaf1w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic TH-42/49/55AF1 (AF1U/AF1W) Control Spec"
manufacturer: Panasonic
model_family: TH-42AF1U
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - TH-42AF1U
    - TH-42AF1W
    - TH-49AF1U
    - TH-49AF1W
    - TH-55AF1U
    - TH-55AF1W
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.connect.panasonic.com
  - ptzprotocols.com
  - pro-av.panasonic.net
  - manualslib.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/AF1_SerialCommandList.pdf
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LAN_Protocol_exp.pdf
  - https://www.ptzprotocols.com/
  - https://pro-av.panasonic.net/manual/en/index.html
  - https://www.manualslib.com/brand/panasonic/
retrieved_at: 2026-06-15T01:32:30.637Z
last_checked_at: 2026-06-16T07:14:01.725Z
generated_at: 2026-06-16T07:14:01.725Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LAN transport specifics (TCP port, IP framing) not documented in this source. Voltage/power specs not present. Safety/interlock procedures not documented."
  - "TCP port number not stated in source"
  - "LAN base URL / framing not stated in source"
  - "whether LAN uses same STX/ETX framing or a different scheme not stated"
  - "source does not separately distinguish \"variables\" from"
  - "no events documented in source."
  - "no macros documented in source."
  - "source contains no explicit safety warnings, interlock"
  - "TCP/IP transport details (port, base URL, framing) not stated in source despite \"LAN\" in title"
  - "firmware version compatibility not stated"
  - "protocol version not stated"
  - "voltage, current, power, and environmental specs not present"
  - "safety/interlock procedures not present; Safety section inferred only from documented stand-by command-acceptance behavior"
  - "whether LAN transport supports the Serial ID / daisy-chain scheme is not stated"
verification:
  verdict: verified
  checked_at: 2026-06-16T07:14:01.725Z
  matched_actions: 277
  action_count: 277
  confidence: medium
  summary: "All 277 spec actions match source mnemonics and parameter shapes; transport parameters verified verbatim. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Panasonic TH-42/49/55AF1 (AF1U/AF1W) Control Spec

## Summary
Full HD LCD signage display family (TH-42/49/55AF1, markets U/W) controllable via RS-232C and LAN. Spec covers the full RS232C/LAN command list: power, input switching, audio, picture, position, setup, screensaver, timers, multi-display, failover, signal inquiries, and SOS history. Commands use 3-character mnemonics framed with STX/ETX; parameters follow a colon separator.

<!-- UNRESOLVED: LAN transport specifics (TCP port, IP framing) not documented in this source. Voltage/power specs not present. Safety/interlock procedures not documented. -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred: source titled "RS232C/LAN command list"; LAN port/framing not specified here
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  signal_level: RS-232C compliant
  synchronization: asynchronous
  cable_type: straight
auth:
  type: none  # inferred: no auth procedure in source
# UNRESOLVED: TCP port number not stated in source
# UNRESOLVED: LAN base URL / framing not stated in source
# UNRESOLVED: whether LAN uses same STX/ETX framing or a different scheme not stated
```

## Framing
```yaml
format: |
  STX C1 C2 C3 : P1 P2 P3 ... ETX
  Start(02h) Command(3 chars) Colon Parameter End(03h)
  If no parameters, the colon ":" is not sent.
examples:
  - description: Power On
    ascii: "STX P O N ETX"
    hex: "02 50 4F 4E 03"
  - description: Picture Contrast = 85
    ascii: "STX V P C : P I C 0 8 5 ETX"
    hex: "02 56 50 43 3A 50 49 43 30 38 35 03"
serial_id_format: |
  <STX>AD94;RAD:<NUM1><NUM2><NUM3>;<command><ETX>   (Serial Control Only)
  e.g. Serial ID = 1 -> <STX>AD94;RAD:001;PON<ETX>
```

## Traits
```yaml
traits:
  - powerable       # inferred from PON/POF power command examples
  - queryable       # inferred from QPW/QMI/QAV query command examples
  - routable        # inferred from input switching IMS + audio input SAI routing examples
  - levelable       # inferred from AVL volume / VPC picture level commands
```

## Actions
```yaml
# Framing note: every command payload below is the bare mnemonic; the
# controller must wrap it with STX (0x02) ... ETX (0x03) per the Basic Format.
# Where the source shows parameters, the command template shows the variable
# part. "Standby = Avail" means the command is accepted in stand-by mode.

# ===== Basic Control =====
- id: power_on
  label: Power ON
  kind: action
  command: "PON"
  standby_avail: true
  params: []

- id: power_off
  label: Power OFF
  kind: action
  command: "POF"
  params: []

- id: power_status_query
  label: Power Status Inquiry
  kind: query
  command: "QPW"
  reply: "QPW:*"
  standby_avail: true
  params:
    - name: state
      type: enum
      values: ["0", "1"]
      description: "0: Standby (Off), 1: Power ON (On)"

- id: input_change
  label: Input Change
  kind: action
  command: "IMS:{input}"
  params:
    - name: input
      type: enum
      values: [HM1, HM2, DV1, PC1, VD1, UD1, OP1]
      description: "HM1:HDMI1, HM2:HDMI2, DV1:DVI-D, PC1:PC, VD1:VIDEO, UD1:USB Display, OP1:OpenPort PLATFORM"

- id: input_inquiry
  label: Input Inquiry
  kind: query
  command: "QMI"
  reply: "QMI:{input}"
  params:
    - name: input
      type: enum
      values: [HM1, HM2, DV1, PC1, VD1, UD1, OP1]

- id: audio_volume_set
  label: Audio Volume Set
  kind: action
  command: "AVL:{value:03d}"
  params:
    - name: value
      type: integer
      range: "000-100"
      description: "Volume value 0~100"

- id: audio_volume_up
  label: Volume Up
  kind: action
  command: "AUU"
  params: []

- id: audio_volume_down
  label: Volume Down
  kind: action
  command: "AUD"
  params: []

- id: audio_volume_inquiry
  label: Current Audio Volume Inquiry
  kind: query
  command: "QAV"
  reply: "QAV:{value:03d}"
  params:
    - name: value
      type: integer
      range: "000-100"

- id: audio_mute
  label: Audio Mute Toggle
  kind: action
  command: "AMT"
  alt_command: "AMT:{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]
      description: "Toggle; 0:Audio mute Off, 1:Audio mute On"

- id: audio_mute_inquiry
  label: Audio Mute Inquiry
  kind: query
  command: "QAM"
  reply: "QAM:{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: video_mute
  label: Video Mute Toggle
  kind: action
  command: "VMT"
  alt_command: "VMT:{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]
      description: "Toggle; 0:Video mute Off, 1:Video mute On"

- id: video_mute_inquiry
  label: Video Mute Inquiry
  kind: query
  command: "QVM"
  reply: "QVM:{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: aspect_change
  label: Aspect Change
  kind: action
  command: "DAM:{aspect}"
  params:
    - name: aspect
      type: enum
      values: [FULL, NORM, ZOOM, ZOM2]
      description: "FULL / NORMAL / ZOOM1 / ZOOM2"

- id: aspect_inquiry
  label: Aspect Inquiry
  kind: query
  command: "QAS"
  reply: "QAS:{aspect}"
  params:
    - name: aspect
      type: enum
      values: [FULL, NORM, ZOOM, ZOM2]

# ===== Picture Adjustment =====
- id: picture_mode_set
  label: Picture Mode Set
  kind: action
  command: "VPC:MEN{mode}"
  params:
    - name: mode
      type: enum
      values: [VIV, NAT, STD, SUV, GRH, DCM]
      description: "VIVID SIGNAGE / NATURAL SIGNAGE / STANDARD / SURVEILLANCE / GRAPHIC / DICOM"

- id: picture_mode_inquiry
  label: Picture Mode Inquiry
  kind: query
  command: "QPC:MEN"
  reply: "QPC:MEN{mode}"
  params:
    - name: mode
      type: enum
      values: [VIV, NAT, STD, SUV, GRH, DCM]

- id: backlight_set
  label: Backlight Set
  kind: action
  command: "VPC:BLT{value:03d}"
  params:
    - name: value
      type: integer
      range: "000-100"
      special: DEF
      description: "0~100; DEF:set shipping value. Available when Power save is Off."

- id: backlight_inquiry
  label: Backlight Inquiry
  kind: query
  command: "QPC:BLT"
  reply: "QPC:BLT{value:03d}"

- id: contrast_set
  label: Contrast Set
  kind: action
  command: "VPC:PIC{value:03d}"
  params:
    - name: value
      type: integer
      range: "000-100"
      special: DEF
      description: "0~100; DEF:set shipping value"

- id: contrast_inquiry
  label: Contrast Inquiry
  kind: query
  command: "QPC:PIC"
  reply: "QPC:PIC{value:03d}"

- id: brightness_set
  label: Brightness Set
  kind: action
  command: "VPC:BLK{value:03d}"
  params:
    - name: value
      type: integer
      range: "000-100"
      special: DEF

- id: brightness_inquiry
  label: Brightness Inquiry
  kind: query
  command: "QPC:BLK"
  reply: "QPC:BLK{value:03d}"

- id: color_set
  label: Color Set
  kind: action
  command: "VPC:COL{value:03d}"
  params:
    - name: value
      type: integer
      range: "000-100"
      special: DEF

- id: color_inquiry
  label: Color Inquiry
  kind: query
  command: "QPC:COL"
  reply: "QPC:COL{value:03d}"

- id: tint_set
  label: Tint Set
  kind: action
  command: "VPC:TIN{value:03d}"
  params:
    - name: value
      type: integer
      range: "000-100"
      special: DEF

- id: tint_inquiry
  label: Tint Inquiry
  kind: query
  command: "QPC:TIN"
  reply: "QPC:TIN{value:03d}"

- id: sharpness_set
  label: Sharpness Set
  kind: action
  command: "VPC:SHP{value:03d}"
  params:
    - name: value
      type: integer
      range: "000-100"
      special: DEF

- id: sharpness_inquiry
  label: Sharpness Inquiry
  kind: query
  command: "QPC:SHP"
  reply: "QPC:SHP{value:03d}"

- id: enhance_level_set
  label: Enhance Level Set
  kind: action
  command: "VPC:SHE{level}"
  params:
    - name: level
      type: enum
      values: ["1", "2"]
      description: "1:low, 2:high"

- id: enhance_level_inquiry
  label: Enhance Level Inquiry
  kind: query
  command: "QPC:SHE"
  reply: "QPC:SHE{level}"

- id: gamma_set
  label: Gamma Set
  kind: action
  command: "VWB:GMM{value}"
  params:
    - name: value
      type: enum
      values: ["20", "22", "24", "26", "DC"]
      description: "2.0 / 2.2 / 2.4 / 2.6 / DICOM. Not available when Color Temp is NTV. DC: inquiry only when Picture Mode is DCM."

- id: gamma_inquiry
  label: Gamma Inquiry
  kind: query
  command: "QWB:GMM"
  reply: "QWB:GMM{value}"

- id: color_temperature_set
  label: Color Temperature Set
  kind: action
  command: "VPC:TMP{value}"
  params:
    - name: value
      type: enum
      values: ["032", "040", "050", "065", "075", "093", "107", "NTV", "U01", "U02"]
      description: "3200K~10700K / Native / USER1 / USER2. 6500K(065)/9300K(093) available when Picture Mode is DCM."

- id: color_temperature_inquiry
  label: Color Temperature Inquiry
  kind: query
  command: "QPC:TMP"
  reply: "QPC:TMP{value}"

- id: red_gain_set
  label: Red Gain Set
  kind: action
  command: "VWB:RGN{value:04d}"
  precondition: "Color Temperature is USER1 or USER2"
  params:
    - name: value
      type: integer
      range: "0000-0255"

- id: red_gain_inquiry
  label: Red Gain Inquiry
  kind: query
  command: "QWB:RGN"
  reply: "QWB:RGN{value:04d}"

- id: green_gain_set
  label: Green Gain Set
  kind: action
  command: "VWB:GGN{value:04d}"
  precondition: "Color Temperature is USER1 or USER2"
  params:
    - name: value
      type: integer
      range: "0000-0255"

- id: green_gain_inquiry
  label: Green Gain Inquiry
  kind: query
  command: "QWB:GGN"
  reply: "QWB:GGN{value:04d}"

- id: blue_gain_set
  label: Blue Gain Set
  kind: action
  command: "VWB:BGN{value:04d}"
  precondition: "Color Temperature is USER1 or USER2"
  params:
    - name: value
      type: integer
      range: "0000-0255"

- id: blue_gain_inquiry
  label: Blue Gain Inquiry
  kind: query
  command: "QWB:BGN"
  reply: "QWB:BGN{value:04d}"

- id: red_bias_set
  label: Red Bias Set
  kind: action
  command: "VWB:RBS{value}"
  precondition: "Color Temperature is USER1 or USER2"
  params:
    - name: value
      type: integer
      range: "-127-0128"

- id: red_bias_inquiry
  label: Red Bias Inquiry
  kind: query
  command: "QWB:RBS"
  reply: "QWB:RBS{value}"

- id: green_bias_set
  label: Green Bias Set
  kind: action
  command: "VWB:GBS{value}"
  precondition: "Color Temperature is USER1 or USER2"
  params:
    - name: value
      type: integer
      range: "-127-0128"

- id: green_bias_inquiry
  label: Green Bias Inquiry
  kind: query
  command: "QWB:GBS"
  reply: "QWB:GBS{value}"

- id: blue_bias_set
  label: Blue Bias Set
  kind: action
  command: "VWB:BBS{value}"
  precondition: "Color Temperature is USER1 or USER2"
  params:
    - name: value
      type: integer
      range: "-127-0128"

- id: blue_bias_inquiry
  label: Blue Bias Inquiry
  kind: query
  command: "QWB:BBS"
  reply: "QWB:BBS{value}"

- id: color_mgmt_onoff_set
  label: 6-segment Color Management On/Off
  kind: action
  command: "VWB:CMF{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]
      description: "0:off, 1:on"

- id: color_mgmt_onoff_inquiry
  label: 6-segment Color Management On/Off Inquiry
  kind: query
  command: "QWB:CMF"
  reply: "QWB:CMF{state}"

- id: color_mgmt_select_color_set
  label: 6-segment Color Management Select Color
  kind: action
  command: "VWB:CML{color}{tint:04d}{sat:04d}{val:04d}"
  precondition: "6-segment color management is on"
  params:
    - name: color
      type: enum
      values: [R, Y, G, C, B, M]
      description: "Red/Yellow/Green/Cyan/Blue/Magenta"
    - name: tint
      type: integer
      range: "-511-0511"
    - name: saturation
      type: integer
      range: "-127-0127"
    - name: value
      type: integer
      range: "-127-0127"

- id: color_mgmt_select_color_inquiry
  label: 6-segment Color Management Select Color Inquiry
  kind: query
  command: "QWB:CML{color}"
  reply: "QWB:CML{color}{tint:04d}{sat:04d}{val:04d}"

- id: color_mgmt_reset
  label: 6-segment Color Management Reset
  kind: action
  command: "VWB:CMR"
  precondition: "6-segment color management is on"
  params: []

- id: dynamic_contrast_set
  label: Dynamic Contrast Set
  kind: action
  command: "VPC:DCO{value:02d}"
  params:
    - name: value
      type: integer
      range: "00-10"

- id: dynamic_contrast_inquiry
  label: Dynamic Contrast Inquiry
  kind: query
  command: "QPC:DCO"
  reply: "QPC:DCO{value:02d}"

- id: color_enhancement_set
  label: Color Enhancement Set
  kind: action
  command: "VPC:PAJ{level}"
  params:
    - name: level
      type: enum
      values: ["0", "1", "2", "3"]
      description: "OFF/Low/Mid/High"

- id: color_enhancement_inquiry
  label: Color Enhancement Inquiry
  kind: query
  command: "QPC:PAJ"
  reply: "QPC:PAJ{level}"

- id: refine_enhancer_set
  label: Refine Enhancer Set
  kind: action
  command: "VPC:SRC{level}"
  params:
    - name: level
      type: enum
      values: ["0", "1", "2", "3"]
      description: "OFF/Low/Mid/High"

- id: refine_enhancer_inquiry
  label: Refine Enhancer Inquiry
  kind: query
  command: "QPC:SRC"
  reply: "QPC:SRC{level}"

- id: gradation_smoother_set
  label: Gradation Smoother Set
  kind: action
  command: "VPC:GRS{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]
      description: "0:off, 1:on"

- id: gradation_smoother_inquiry
  label: Gradation Smoother Inquiry
  kind: query
  command: "QPC:GRS"
  reply: "QPC:GRS{state}"

# ===== Memory Function =====
- id: memory_delete
  label: Memory Delete
  kind: action
  command: "VPF:DEL{num:02d}"
  params:
    - name: num
      type: integer
      range: "01-06"
      description: "Memory No.1-No.6"

- id: memory_load
  label: Memory Load
  kind: action
  command: "VPF:LOD{num:02d}"
  params:
    - name: num
      type: integer
      range: "01-06"

- id: memory_name_change
  label: Memory Name Change
  kind: action
  command: "VPF:NAM{num:02d}{name}"
  params:
    - name: num
      type: integer
      range: "01-06"
    - name: name
      type: string
      max_length: 20
      description: "Memory name (Max 20 Parameters). Allowed: space, ASCII printable."

- id: memory_name_inquiry
  label: Memory Name Inquiry
  kind: query
  command: "QPF:NAM{num:02d}"
  reply: "QPF:NAM{num:02d}{name}"

- id: memory_save
  label: Memory Save
  kind: action
  command: "VPF:SAV{num:02d}{name}"
  params:
    - name: num
      type: integer
      range: "01-06"
    - name: name
      type: string
      max_length: 20

- id: memory_state_inquiry
  label: Memory State Inquiry
  kind: query
  command: "QPF:STA"
  reply: "QPF:STA{state}"
  params:
    - name: state
      type: enum
      description: "'-' unused, '0' Use, for Memory No.1-No.6"

# ===== Sound Adjustment =====
- id: output_select_set
  label: Output Select Set
  kind: action
  command: "AAC:OUT{value}"
  params:
    - name: value
      type: enum
      values: [SPO, LNO]
      description: "SPEAKERS / AUDIO OUT"

- id: output_select_inquiry
  label: Output Select Inquiry
  kind: query
  command: "QAC:OUT"
  reply: "QAC:OUT{value}"

- id: sound_mode_set
  label: Sound Mode Set
  kind: action
  command: "AAC:MEN{mode}"
  precondition: "Output Select is SPEAKERS"
  params:
    - name: mode
      type: enum
      values: [STD, DYN, CLR]
      description: "STANDARD / DYNAMIC / CLEAR (STD may be sent as AUT)"

- id: sound_mode_inquiry
  label: Sound Mode Inquiry
  kind: query
  command: "QAC:MEN"
  reply: "QAC:MEN{mode}"

- id: bass_set
  label: Bass Set
  kind: action
  command: "AAC:BAS{value}"
  precondition: "Output Select is SPEAKERS"
  params:
    - name: value
      type: integer
      range: "-20-+20"

- id: bass_inquiry
  label: Bass Inquiry
  kind: query
  command: "QAC:BAS"
  reply: "QAC:BAS{value}"

- id: treble_set
  label: Treble Set
  kind: action
  command: "AAC:TRE{value}"
  precondition: "Output Select is SPEAKERS"
  params:
    - name: value
      type: integer
      range: "-20-+20"

- id: treble_inquiry
  label: Treble Inquiry
  kind: query
  command: "QAC:TRE"
  reply: "QAC:TRE{value}"

- id: balance_set
  label: Balance Set
  kind: action
  command: "AAC:BAL{value}"
  precondition: "Output Select is SPEAKERS"
  params:
    - name: value
      type: integer
      range: "-20-+20"

- id: balance_inquiry
  label: Balance Inquiry
  kind: query
  command: "QAC:BAL"
  reply: "QAC:BAL{value}"

- id: surround_set
  label: Surround Set
  kind: action
  command: "AAC:SUR{value}"
  precondition: "Output Select is SPEAKERS"
  params:
    - name: value
      type: enum
      values: [MON, OFF]
      description: "ON / OFF"

- id: surround_inquiry
  label: Surround Inquiry
  kind: query
  command: "QAC:SUR"
  reply: "QAC:SUR{value}"

# ===== Position / Size Adjustment =====
- id: horizontal_position_set
  label: Horizontal Position Set
  kind: action
  command: "DGE:HPO{value:04d}"
  params:
    - name: value
      type: integer
      range: "-100-+100"

- id: horizontal_position_inquiry
  label: Horizontal Position Inquiry
  kind: query
  command: "QGE:HPO"
  reply: "QGE:HPO{value:04d}"

- id: horizontal_size_set
  label: Horizontal Size Set
  kind: action
  command: "DGE:HSZ{value:04d}"
  params:
    - name: value
      type: integer
      range: "-100-+100"

- id: horizontal_size_inquiry
  label: Horizontal Size Inquiry
  kind: query
  command: "QGE:HSZ"
  reply: "QGE:HSZ{value:04d}"

- id: vertical_position_set
  label: Vertical Position Set
  kind: action
  command: "DGE:VPO{value:04d}"
  params:
    - name: value
      type: integer
      range: "-100-+100"

- id: vertical_position_inquiry
  label: Vertical Position Inquiry
  kind: query
  command: "QGE:VPO"
  reply: "QGE:VPO{value:04d}"

- id: vertical_size_set
  label: Vertical Size Set
  kind: action
  command: "DGE:VSZ{value:04d}"
  params:
    - name: value
      type: integer
      range: "-100-+100"

- id: vertical_size_inquiry
  label: Vertical Size Inquiry
  kind: query
  command: "QGE:VSZ"
  reply: "QGE:VSZ{value:04d}"

- id: clock_phase_set
  label: Clock Phase Set
  kind: action
  command: "DGE:CLK{value:03d}"
  params:
    - name: value
      type: integer
      range: "00-30"

- id: clock_phase_inquiry
  label: Clock Phase Inquiry
  kind: query
  command: "QGE:CLK"
  reply: "QGE:CLK{value:03d}"

- id: dot_clock_set
  label: Dot Clock Set
  kind: action
  command: "DGE:DCL{value}"
  params:
    - name: value
      type: integer
      range: "-5-+5"

- id: dot_clock_inquiry
  label: Dot Clock Inquiry
  kind: query
  command: "QGE:DCL"
  reply: "QGE:DCL{value}"

- id: one_to_one_pixel_set
  label: 1:1 Pixel Mode Set
  kind: action
  command: "DGE:DBD{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]
      description: "OFF/ON"

- id: one_to_one_pixel_inquiry
  label: 1:1 Pixel Mode Inquiry
  kind: query
  command: "QGE:DBD"
  reply: "QGE:DBD{state}"

- id: overscan_set
  label: Overscan Set
  kind: action
  command: "DGE:OVS{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: overscan_inquiry
  label: Overscan Inquiry
  kind: query
  command: "QGE:OVS"
  reply: "QGE:OVS{state}"

- id: pos_size_lump_set
  label: Pos./Size Lump Setting
  kind: action
  command: "DGE:PSZ{hpos:04d}{hsize:04d}{vpos:04d}{vsize:04d}"
  params:
    - name: hpos
      type: integer
      range: "-100-+100"
    - name: hsize
      type: integer
      range: "-100-+100"
    - name: vpos
      type: integer
      range: "-100-+100"
    - name: vsize
      type: integer
      range: "-100-+100"

- id: pos_size_lump_inquiry
  label: Pos./Size Lump Inquiry
  kind: query
  command: "QGE:PSZ"
  reply: "QGE:PSZ{hpos:04d}{hsize:04d}{vpos:04d}{vsize:04d}"

- id: auto_setup
  label: Auto Setup
  kind: action
  command: "DGE:ASU"
  params:
    - name: trigger
      type: enum
      values: ["1"]
      description: "1: Execution start"

- id: auto_setup_inquiry
  label: Auto Setup Inquiry
  kind: query
  command: "QGE:ASU"
  reply: "QGE:ASU{result}"
  params:
    - name: result
      type: enum
      values: [OK, NG, OF, NW]
      description: "OK / NG / OF:Un-performing or not effective / NW:adjusting"

# ===== Set up =====
- id: wobbling_set
  label: Wobbling Set
  kind: action
  command: "OSP:WOB{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: wobbling_inquiry
  label: Wobbling Inquiry
  kind: query
  command: "QSP:WOB"
  reply: "QSP:WOB{state}"

- id: no_activity_power_off_set
  label: No Activity Power Off Set
  kind: action
  command: "SSU:NAO{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: no_activity_power_off_inquiry
  label: No Activity Power Off Inquiry
  kind: query
  command: "QSU:NAO"
  reply: "QSU:NAO{state}"

- id: osd_language_set
  label: OSD Language Set
  kind: action
  command: "SSU:LNG{lang}"
  note: "During OPF restart until initial communication completion, void (ER401)."
  params:
    - name: lang
      type: enum
      values: [ENG, DEU, FRA, ITL, ESP, USA, CHA, JPN, RUS]
      description: "English(UK)/German/French/Italian/Spanish/English(US)/Chinese/Japanese/Russian. Source shows ITL alias ITA."

- id: osd_language_inquiry
  label: OSD Language Inquiry
  kind: query
  command: "QSU:LNG"
  reply: "QSU:LNG{lang}"

- id: power_management_mode_set
  label: Power Management Mode Set
  kind: action
  command: "SSU:ECS{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1"]
      description: "CUSTOM / ON"

- id: power_management_mode_inquiry
  label: Power Management Mode Inquiry
  kind: query
  command: "QSU:ECS"
  reply: "QSU:ECS{mode}"

- id: no_signal_power_off_set
  label: No Signal Power Off Set
  kind: action
  command: "SSU:AOF{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: no_signal_power_off_inquiry
  label: No Signal Power Off Inquiry
  kind: query
  command: "QSU:AOF"
  reply: "QSU:AOF{state}"

- id: pc_power_management_set
  label: PC Power Management Set
  kind: action
  command: "SSU:DPM{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: pc_power_management_inquiry
  label: PC Power Management Inquiry
  kind: query
  command: "QSU:DPM"
  reply: "QSU:DPM{state}"

- id: dvi_d1_power_management_set
  label: DVI-D1 Power Management Set
  kind: action
  command: "SSU:D1V{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: dvi_d1_power_management_inquiry
  label: DVI-D1 Power Management Inquiry
  kind: query
  command: "QSU:D1V"
  reply: "QSU:D1V{state}"

- id: hdmi1_power_management_set
  label: HDMI1 Power Management Set
  kind: action
  command: "SSU:D1H{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: hdmi1_power_management_inquiry
  label: HDMI1 Power Management Inquiry
  kind: query
  command: "QSU:D1H"
  reply: "QSU:D1H{state}"

- id: hdmi2_power_management_set
  label: HDMI2 Power Management Set
  kind: action
  command: "SSU:D2H{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: hdmi2_power_management_inquiry
  label: HDMI2 Power Management Inquiry
  kind: query
  command: "QSU:D2H"
  reply: "QSU:D2H{state}"

- id: power_save_set
  label: Power Save Set
  kind: action
  command: "SSU:ECO{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: power_save_inquiry
  label: Power Save Inquiry
  kind: query
  command: "QSU:ECO"
  reply: "QSU:ECO{state}"

- id: opf_standby_set
  label: OpenPort PLATFORM Standby Set
  kind: action
  command: "OPF:STB{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: opf_standby_inquiry
  label: OpenPort PLATFORM Standby Inquiry
  kind: query
  command: "QPF:STB"
  reply: "QPF:STB{state}"

- id: display_orientation_set
  label: Display Orientation Set
  kind: action
  command: "SSU:DOR{orientation}"
  note: "During OPF restart until initial communication completion, void (ER401). When receiving a control command, restarts the OPF."
  params:
    - name: orientation
      type: enum
      values: ["0", "1"]
      description: "Landscape / Portrait"

- id: display_orientation_inquiry
  label: Display Orientation Inquiry
  kind: query
  command: "QSU:DOR"
  reply: "QSU:DOR{orientation}"

- id: menu_position_set
  label: Menu Position Set
  kind: action
  command: "SSU:OPS{pos}"
  params:
    - name: pos
      type: enum
      values: ["1", "2", "3"]
      description: "1:Left(Landscape)/Upper(Portrait), 2:Center, 3:Right(Landscape)/Lower(Portrait)"

- id: menu_position_inquiry
  label: Menu Position Inquiry
  kind: query
  command: "QSU:OPS"
  reply: "QSU:OPS{pos}"

- id: menu_display_duration_set
  label: Menu Display Duration Set
  kind: action
  command: "SSU:MDT{seconds:03d}"
  params:
    - name: seconds
      type: integer
      range: "005-180"
      description: "5-180 seconds (5 second unit)"

- id: menu_display_duration_inquiry
  label: Menu Display Duration Inquiry
  kind: query
  command: "QSU:MDT"
  reply: "QSU:MDT{seconds:03d}"

- id: menu_transparency_set
  label: Menu Transparency Set
  kind: action
  command: "SSU:MTL{value:03d}"
  params:
    - name: value
      type: integer
      range: "000-100"
      description: "0~100% (10% unit)"

- id: menu_transparency_inquiry
  label: Menu Transparency Inquiry
  kind: query
  command: "QSU:MTL"
  reply: "QSU:MTL{value:03d}"

# ===== Signal =====
- id: component_rgb_in_select
  label: Component/RGB-IN Select
  kind: action
  command: "SSU:CMP{value}"
  precondition: "PC1/YP1 selected"
  params:
    - name: value
      type: enum
      values: [YBR, RGB]

- id: component_rgb_in_inquiry
  label: Component/RGB-IN Inquiry
  kind: query
  command: "QSU:CMP"
  reply: "QSU:CMP{value}"

- id: yuv_rgb_in_select
  label: YUV/RGB-IN Select
  kind: action
  command: "SSU:DYR{value}"
  precondition: "HDMI1/HDMI2/DVI-D selected"
  params:
    - name: value
      type: enum
      values: [YUV, RGB]

- id: yuv_rgb_in_inquiry
  label: YUV/RGB-IN Inquiry
  kind: query
  command: "QSU:DYR"
  reply: "QSU:DYR{value}"

- id: yc_filter_set
  label: 3D Y/C Filter Set
  kind: action
  command: "SSG:YCS{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: yc_filter_inquiry
  label: 3D Y/C Filter Inquiry
  kind: query
  command: "QSG:YCS"
  reply: "QSG:YCS{state}"

- id: color_system_set
  label: Color System Set
  kind: action
  command: "SSG:COS{value}"
  params:
    - name: value
      type: enum
      values: [NTS, PAL, SCM, 4NT, MPA, NPA, AUT]
      description: "NTSC/PAL/SECAM/NTSC4.43/PAL-M/PAL-N/AUTO"

- id: color_system_inquiry
  label: Color System Inquiry
  kind: query
  command: "QSG:COS"
  reply: "QSG:COS{value}"

- id: sync_signal_set
  label: Sync Signal Setting
  kind: action
  command: "SSG:SNC{value}"
  precondition: "PC input only"
  params:
    - name: value
      type: enum
      values: [HAV, GRN, HVS]
      description: "Auto detection / Sync On Green / Hvsync"

- id: sync_signal_inquiry
  label: Sync Signal Setting Inquiry
  kind: query
  command: "QSG:SNC"
  reply: "QSG:SNC{value}"

- id: cinema_reality_set
  label: Cinema Reality 3:2 Pull Down Set
  kind: action
  command: "SSG:DCR{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: cinema_reality_inquiry
  label: Cinema Reality 3:2 Pull Down Inquiry
  kind: query
  command: "QSG:DCR"
  reply: "QSG:DCR{state}"

- id: xga_mode_set
  label: XGA Mode Set
  kind: action
  command: "SSG:XGA{mode}"
  params:
    - name: mode
      type: enum
      values: ["1", "2", "3", "4"]
      description: "1024x768 / 1280x768 / 1366x768 / Auto"

- id: xga_mode_inquiry
  label: XGA Mode Inquiry
  kind: query
  command: "QSG:XGA"
  reply: "QSG:XGA{mode}"

- id: noise_reduction_set
  label: Noise Reduction Set
  kind: action
  command: "SSG:NRS{level}"
  params:
    - name: level
      type: enum
      values: [OFF, AUT, LOW, MID, HIG]
      description: "OFF/Auto/Low/Middle/High"

- id: noise_reduction_inquiry
  label: Noise Reduction Inquiry
  kind: query
  command: "QSG:NRS"
  reply: "QSG:NRS{level}"

- id: mpeg_noise_reduction_set
  label: MPEG Noise Reduction Set
  kind: action
  command: "SSG:MNR{level}"
  params:
    - name: level
      type: enum
      values: [OFF, LOW, MID, HIG]

- id: mpeg_noise_reduction_inquiry
  label: MPEG Noise Reduction Inquiry
  kind: query
  command: "QSG:MNR"
  reply: "QSG:MNR{level}"

- id: signal_range_set
  label: Signal Range Set
  kind: action
  command: "SSG:HRC{value}"
  note: "Available Video/FULL/Auto for HDMI; Video/FULL for DVI-D; N/A otherwise."
  params:
    - name: value
      type: enum
      values: [VID, FUL, AUT]

- id: signal_range_inquiry
  label: Signal Range Inquiry
  kind: query
  command: "QSG:HRC"
  reply: "QSG:HRC{value}"

- id: input_level_set
  label: Input Level Set
  kind: action
  command: "VWB:ILV{value}"
  params:
    - name: value
      type: integer
      range: "-16-+16"

- id: input_level_inquiry
  label: Input Level Inquiry
  kind: query
  command: "QWB:ILV"
  reply: "QWB:ILV{value}"

- id: dynamic_backlight_set
  label: Dynamic Backlight Control Set
  kind: action
  command: "SSG:DBC{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: dynamic_backlight_inquiry
  label: Dynamic Backlight Control Inquiry
  kind: query
  command: "QSG:DBC"
  reply: "QSG:DBC{state}"

# ===== Screensaver =====
- id: screensaver_onoff_set
  label: Screensaver On/Off
  kind: action
  command: "OSP:SCR{state}"
  params:
    - name: state
      type: enum
      values: ["0", "5"]
      description: "0:stop, 5:operating"

- id: screensaver_onoff_inquiry
  label: Screensaver On/Off Inquiry
  kind: query
  command: "QSP:SCR"
  reply: "QSP:SCR{state}"

- id: screensaver_mode_set
  label: Screensaver Mode Set
  kind: action
  command: "SSC:MOD{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2", "3", "4"]
      description: "OFF/Interval/Time Designation/ON/Standby after Screensaver"

- id: screensaver_mode_inquiry
  label: Screensaver Mode Inquiry
  kind: query
  command: "QSC:MOD"
  reply: "QSC:MOD{mode}"

- id: interval_screensaver_set
  label: Interval Screensaver Set
  kind: action
  command: "SSC:INT{periodic:04d}{operating:04d}"
  params:
    - name: periodic
      type: string
      pattern: "HHMM 0000-2359"
      description: "Periodic time"
    - name: operating
      type: string
      pattern: "HHMM 0000-2359"
      description: "Operating time"

- id: interval_screensaver_inquiry
  label: Interval Screensaver Inquiry
  kind: query
  command: "QSC:INT"
  reply: "QSC:INT{periodic:04d}{operating:04d}"

- id: time_designation_screensaver_set
  label: Time Designation Screensaver Set
  kind: action
  command: "SSC:TIM{start:04d}{finish:04d}"
  note: "During OPF restart until initial communication completion, void (ER401)."
  params:
    - name: start
      type: string
      pattern: "HHMM 0000-2359"
    - name: finish
      type: string
      pattern: "HHMM 0000-2359"

- id: time_designation_screensaver_inquiry
  label: Time Designation Screensaver Inquiry
  kind: query
  command: "QSC:TIM"
  reply: "QSC:TIM{start:04d}{finish:04d}"

- id: standby_after_screensaver_set
  label: Standby after Screensaver Set
  kind: action
  command: "SSC:AOF{time:04d}"
  params:
    - name: time
      type: string
      pattern: "HHMM 0000-2359"
      description: "Time of operation (hour:minute)"

- id: standby_after_screensaver_inquiry
  label: Standby after Screensaver Inquiry
  kind: query
  command: "QSC:AOF"
  reply: "QSC:AOF{time:04d}"

# ===== Input Label =====
- id: input_label_current_set
  label: Set Label for Current Input
  kind: action
  command: "SSU:ILA{value}"
  params:
    - name: value
      type: enum
      values: [INP, PCN, DV1, DV2, DV3, BD1, BD2, BD3, CTV, VCR, STB, SKP]
      description: "INP/PCN reset input name; DVD1-3/Blu-ray1-3/CATV/VCR/STB/(Skip)"

- id: input_label_current_inquiry
  label: Input Label (Current) Inquiry
  kind: query
  command: "QSU:ILA"
  reply: "QSU:ILA{value}"

- id: input_label_each_set
  label: Set Label for Each Input
  kind: action
  command: "SSU:ILA{input}{value}"
  params:
    - name: input
      type: enum
      values: [HM1, HM2, DV1, PC1, VD1, YP1]
    - name: value
      type: enum
      values: [INP, DV1, DV2, DV3, BD1, BD2, BD3, CTV, VCR, STB, SKP]

- id: input_label_each_inquiry
  label: Input Label (Each) Inquiry
  kind: query
  command: "QSU:ILA{input}"
  reply: "QSU:ILA{input}{value}"

# ===== Function Button Settings =====
- id: function_group_set
  label: Function Group Set
  kind: action
  command: "OSP:KGR{group}"
  params:
    - name: group
      type: enum
      values: [INP, MEM, ACT]
      description: "INPUT / MEMORY / ACTION & MENU (SHORTCUT)"

- id: function_group_inquiry
  label: Function Group Inquiry
  kind: query
  command: "QSP:KGR"
  reply: "QSP:KGR{group}"

- id: function_button_set
  label: Function Button Settings
  kind: action
  command: "OSP:KFN{key}{assignment}"
  params:
    - name: key
      type: integer
      range: "1-6"
      description: "FUNCTION KEY 1-5 (plus 6 for keyboard)"
    - name: assignment
      type: enum
      values: [SIG, SSV, SUT, ECO, OSH, DZM, MLT, HM1, HM2, DV1, PC1, VD1, YP1, UD1, OP1, KBD]
      description: "ACTION&MENU mnemonics, INPUT mnemonics, or KBD (key 6, responds ER401 when input not OPF)."

- id: function_button_inquiry
  label: Function Button Settings Inquiry
  kind: query
  command: "QSP:KFN{key}"
  reply: "QSP:KFN{key}{assignment}"

- id: function_guide_set
  label: Function Guide Settings
  kind: action
  command: "OSP:KFG{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: function_guide_inquiry
  label: Function Guide Settings Inquiry
  kind: query
  command: "QSP:KFG"
  reply: "QSP:KFG{state}"

# ===== Multi Display Setup =====
- id: multi_display_onoff_set
  label: Multi Display On/Off
  kind: action
  command: "MDC:{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]
      description: "OFF/ON"

- id: multi_display_setup_detail_set
  label: Multi Display Setup Detail
  kind: action
  command: "MDC:EXP{state}{hscale:02d}{vscale:02d}{bezelh:03d}{bezelv:03d}{location}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]
    - name: hscale
      type: integer
      range: "01-10"
      description: "Horizontal Scale 1~10 (USB: 1~2)"
    - name: vscale
      type: integer
      range: "01-10"
      description: "Vertical Scale 1~10 (USB: 1~2)"
    - name: bezelh
      type: integer
      range: "000-100"
    - name: bezelv
      type: integer
      range: "000-100"
    - name: location
      type: string
      pattern: "A1-J10 (USB: A1-B2)"

- id: multi_display_setup_detail_inquiry
  label: Multi Display Setup Detail Inquiry
  kind: query
  command: "QDC:EXP"
  reply: "QDC:EXP{detail}"

# ===== Timer Setup =====
- id: timer_program_set
  label: Timer Program Set
  kind: action
  command: "TIM:PRG{num:02d}{func}{day}{action}{time:04d}{input}"
  note: "During OPF restart until initial communication completion, void (ER401). Lower params not sent when func=OFF."
  params:
    - name: num
      type: integer
      range: "01-20"
    - name: func
      type: enum
      values: ["0", "1"]
      description: "OFF/ON"
    - name: day
      type: enum
      values: [SUN, MON, TUE, WED, THU, FRI, SAT, EVD]
      description: "Sunday..Saturday / Everyday"
    - name: action
      type: enum
      values: [PON, POF]
    - name: time
      type: string
      pattern: "HHMM 0000-2359"
    - name: input
      type: enum
      values: [HM1, HM2, DV1, PC1, VD1, YP1, UD1, OP1]

- id: timer_program_inquiry
  label: Timer Program Inquiry
  kind: query
  command: "QIM:PRG{num:02d}"
  reply: "QIM:PRG{num:02d}{detail}"

- id: present_day_inquiry
  label: Present Day Inquiry
  kind: query
  command: "QIM:DAY"
  reply: "QIM:DAY{day}"
  note: "During OPF restart until initial communication completion, void (ER401)."
  params:
    - name: day
      type: enum
      values: [SUN, MON, TUE, WED, THU, FRI, SAT]

- id: present_time_inquiry
  label: Present Time Inquiry
  kind: query
  command: "QIM:NOW"
  reply: "QIM:NOW{time:04d}"
  note: "During OPF restart until initial communication completion, void (ER401)."

- id: day_time_set
  label: Day Time Set
  kind: action
  command: "TIM:DAT{year}{month:02d}{day:02d}{hour:02d}{minute:02d}"
  note: "During OPF restart until initial communication completion, void (ER401). Format YYYYMMDDhhmm."
  params:
    - name: year
      type: integer
      range: "2016-2037"
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

- id: day_time_inquiry
  label: Day Time Inquiry
  kind: query
  command: "QIM:DAT"
  reply: "QIM:DAT{detail}"

# ===== USB Media Player Setup =====
- id: usb_media_player_set
  label: USB Media Player Enable/Disable
  kind: action
  command: "SUS:UMP{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]
      description: "Disable/Enable"

- id: usb_media_player_inquiry
  label: USB Media Player Inquiry
  kind: query
  command: "QUS:UMP"
  reply: "QUS:UMP{state}"

- id: resume_play_set
  label: Resume Play Set
  kind: action
  command: "SUS:RSP{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: resume_play_inquiry
  label: Resume Play Inquiry
  kind: query
  command: "QUS:RSP"
  reply: "QUS:RSP{state}"

- id: slideshow_duration_set
  label: Slide Show Duration Set
  kind: action
  command: "SUS:SSD{seconds:03d}"
  params:
    - name: seconds
      type: integer
      range: "010-600"
      description: "10-600 seconds (5 second unit)"

- id: slideshow_duration_inquiry
  label: Slide Show Duration Inquiry
  kind: query
  command: "QUS:SSD"
  reply: "QUS:SSD{seconds:03d}"

# ===== Options Menu =====
- id: on_screen_display_set
  label: On Screen Display Set
  kind: action
  command: "OSP:OSD{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: on_screen_display_inquiry
  label: On Screen Display Inquiry
  kind: query
  command: "QSP:OSD"
  reply: "QSP:OSD{state}"

- id: initial_input_set
  label: Initial Input Set
  kind: action
  command: "OSP:IIN{input}"
  params:
    - name: input
      type: enum
      values: [OFF, HM1, HM2, DV1, PC1, VD1, YP1, UD1, OP1]

- id: initial_input_inquiry
  label: Initial Input Inquiry
  kind: query
  command: "QSP:IIN"
  reply: "QSP:IIN{input}"

- id: initial_vol_level_set
  label: Initial VOL Level Set
  kind: action
  command: "OSP:IVL{func}{volume:03d}"
  params:
    - name: func
      type: enum
      values: ["0", "1"]
      description: "OFF/ON"
    - name: volume
      type: integer
      range: "000-100"

- id: initial_vol_level_inquiry
  label: Initial VOL Level Inquiry
  kind: query
  command: "QSP:IVL"
  reply: "QSP:IVL{func}{volume:03d}"

- id: maximum_vol_level_set
  label: Maximum VOL Level Set
  kind: action
  command: "OSP:MVL{func}{volume:03d}"
  params:
    - name: func
      type: enum
      values: ["0", "1"]
    - name: volume
      type: integer
      range: "000-100"

- id: maximum_vol_level_inquiry
  label: Maximum VOL Level Inquiry
  kind: query
  command: "QSP:MVL"
  reply: "QSP:MVL{func}{volume:03d}"

- id: input_lock_set
  label: Input Lock Set
  kind: action
  command: "OSP:INL{value}"
  params:
    - name: value
      type: enum
      values: [OFF, HM1, HM2, DV1, PC1, VD1, YP1, UD1, OP1]

- id: input_lock_inquiry
  label: Input Lock Inquiry
  kind: query
  command: "QSP:INL"
  reply: "QSP:INL{value}"

- id: button_lock_set
  label: Button Lock Set
  kind: action
  command: "OSP:BTL{value}"
  params:
    - name: value
      type: enum
      values: [OFF, MEN, ALL]
      description: "OFF / MENU&ENTER / ON"

- id: button_lock_inquiry
  label: Button Lock Inquiry
  kind: query
  command: "QSP:BTL"
  reply: "QSP:BTL{value}"

- id: controller_user_level_set
  label: Controller User Level Set
  kind: action
  command: "OSP:RCM{level}"
  params:
    - name: level
      type: enum
      values: ["0", "1", "2", "3"]
      description: "OFF/User1/User2/User3"

- id: controller_user_level_inquiry
  label: Controller User Level Inquiry
  kind: query
  command: "QSP:RCM"
  reply: "QSP:RCM{level}"

- id: pc_auto_setting_set
  label: PC Auto Setting Set
  kind: action
  command: "OSP:PAS{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: pc_auto_setting_inquiry
  label: PC Auto Setting Inquiry
  kind: query
  command: "QSP:PAS"
  reply: "QSP:PAS{state}"

- id: offtimer_function_set
  label: Offtimer Function Set
  kind: action
  command: "OSP:OFT{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: offtimer_function_inquiry
  label: Offtimer Function Inquiry
  kind: query
  command: "QSP:OFT"
  reply: "QSP:OFT{state}"

- id: initial_startup_set
  label: Initial Startup Set
  kind: action
  command: "OSP:ISU{value}"
  params:
    - name: value
      type: enum
      values: [LST, PON, STB]
      description: "Last memory / ON / STANDBY"

- id: initial_startup_inquiry
  label: Initial Startup Inquiry
  kind: query
  command: "QSP:ISU"
  reply: "QSP:ISU{value}"

- id: startup_logo_set
  label: Startup Logo Set
  kind: action
  command: "OSP:LOG{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: startup_logo_inquiry
  label: Startup Logo Inquiry
  kind: query
  command: "QSP:LOG"
  reply: "QSP:LOG{state}"

- id: display_id_inquiry
  label: Display ID Inquiry
  kind: query
  command: "QID:DID"
  reply: "QID:DID{value:03d}"
  params:
    - name: value
      type: integer
      range: "000-100"

- id: serial_id_function_set
  label: Serial ID Function Set
  kind: action
  command: "SID:SID{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: serial_id_function_inquiry
  label: Serial ID Function Inquiry
  kind: query
  command: "QID:SID"
  reply: "QID:SID{state}"

- id: serial_id_setup
  label: Serial ID Setup
  kind: action
  command: "SIF:{state}{display_id:03d}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]
    - name: display_id
      type: integer
      range: "000-100"

- id: serial_id_setup_inquiry
  label: Serial ID Setup Inquiry
  kind: query
  command: "QIF"
  reply: "QIF:{state}{display_id:03d}"

- id: serial_response_id_all_set
  label: Serial Response (ID All) Set
  kind: action
  command: "SCT:RIA{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: serial_response_id_all_inquiry
  label: Serial Response (ID All) Inquiry
  kind: query
  command: "QCT:RIA"
  reply: "QCT:RIA{state}"

- id: serial_daisy_chain_position_set
  label: Serial Daisy Chain Position Set
  kind: action
  command: "SCT:DCP{value}"
  params:
    - name: value
      type: enum
      values: [TOP, DEF, END]

- id: serial_daisy_chain_position_inquiry
  label: Serial Daisy Chain Position Inquiry
  kind: query
  command: "QCT:DCP"
  reply: "QCT:DCP{value}"

- id: power_on_screen_delay_set
  label: Power ON Screen Delay Set
  kind: action
  command: "OSP:POD{value}"
  params:
    - name: value
      type: string
      pattern: "AT or 00-30"
      description: "AT:Auto; 0-30 seconds"

- id: power_on_screen_delay_inquiry
  label: Power ON Screen Delay Inquiry
  kind: query
  command: "QSP:POD"
  reply: "QSP:POD{value}"

- id: clock_display_set
  label: Clock Display Set
  kind: action
  command: "OSP:CLK{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: clock_display_inquiry
  label: Clock Display Inquiry
  kind: query
  command: "QSP:CLK"
  reply: "QSP:CLK{state}"

- id: power_on_message_no_activity_set
  label: Power On Message (No Activity Power Off) Set
  kind: action
  command: "OSP:NAP{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: power_on_message_no_activity_inquiry
  label: Power On Message (No Activity Power Off) Inquiry
  kind: query
  command: "QSP:NAP"
  reply: "QSP:NAP{state}"

- id: power_on_message_power_management_set
  label: Power On Message (Power Management) Set
  kind: action
  command: "OSP:PMM{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: power_on_message_power_management_inquiry
  label: Power On Message (Power Management) Inquiry
  kind: query
  command: "QSP:PMM"
  reply: "QSP:PMM{state}"

# ===== Input Search =====
- id: input_search_set
  label: Input Search Set
  kind: action
  command: "ISH:FNC{value}"
  params:
    - name: value
      type: enum
      values: [OFF, ALL, PRI]
      description: "OFF / ALL inputs / Custom"

- id: input_search_inquiry
  label: Input Search Inquiry
  kind: query
  command: "QSH:FNC"
  reply: "QSH:FNC{value}"

- id: first_search_input_set
  label: 1st Search Input Set
  kind: action
  command: "ISH:PRI{input}"
  params:
    - name: input
      type: enum
      values: [NON, HM1, HM2, DV1, PC1, YP1, VD1, UD1]

- id: first_search_input_inquiry
  label: 1st Search Input Inquiry
  kind: query
  command: "QSH:PRI"
  reply: "QSH:PRI{input}"

- id: second_search_input_set
  label: 2nd Search Input Set
  kind: action
  command: "ISH:SCI{input}"
  params:
    - name: input
      type: enum
      values: [NON, HM1, HM2, DV1, PC1, YP1, VD1, UD1]

- id: second_search_input_inquiry
  label: 2nd Search Input Inquiry
  kind: query
  command: "QSH:SCI"
  reply: "QSH:SCI{input}"

# ===== Failover / Failback =====
- id: failover_mode_off_set
  label: Input Change Mode Off (Failover)
  kind: action
  command: "SBI:OFF"
  params: []

- id: failover_mode_quick_set
  label: Input Change Mode Quick
  kind: action
  command: "SBI:QIC"
  params:
    - name: primary
      type: enum
      values: [NON, HM1, HM2, DV1, OP1]
      description: "Primary backup input"
    - name: secondary
      type: enum
      values: [NON, HM1, HM2, DV1, OP1]
      description: "Secondary backup input"
    - name: auto_switch_back
      type: enum
      values: ["0", "1"]
      description: "0:Disable / 1:Enable (Auto switch back mode)"

- id: failover_mode_normal_set
  label: Input Change Mode Normal
  kind: action
  command: "SBI:NOR"
  params:
    - name: primary
      type: enum
      values: [NON, HM1, HM2, DV1, PC1, YP1, VD1, UD1, OP1]
    - name: secondary
      type: enum
      values: [NON, HM1, HM2, DV1, PC1, YP1, VD1, UD1, OP1]
    - name: auto_switch_back
      type: enum
      values: ["0", "1"]

- id: failover_changing_mode_set
  label: Failover Changing Mode Set
  kind: action
  command: "SBI:CHM{value}"
  precondition: "Only when [Quick] selected."
  params:
    - name: value
      type: enum
      values: ["2", "1"]
      description: "High speed / Normal speed"

- id: failover_changing_mode_inquiry
  label: Failover Changing Mode Inquiry
  kind: query
  command: "QBI:CHM"
  reply: "QBI:CHM{value}"

- id: backup_input_status_inquiry
  label: Backup Input Status Inquiry
  kind: query
  command: "QBI:STS"
  reply: "QBI:STS{detail}"
  precondition: "Input change mode is not Off"

- id: backup_input_signal_status_inquiry
  label: Backup Input Signal Status Inquiry
  kind: query
  command: "QBI:SIG"
  reply: "QBI:SIG{detail}"
  precondition: "Input change mode is not Off"

- id: manual_switch_back
  label: Manual Switch Back
  kind: action
  command: "BIP:FSB"
  precondition: "Input change mode is not Off and Auto switch back mode is Disable."
  params: []

# ===== Audio Input Select =====
- id: audio_input_current_set
  label: Audio Input Select (Current Input)
  kind: action
  command: "SAI:A{audio_input}"
  params:
    - name: audio_input
      type: enum
      values: [HM1, HM2, PC1, VD1, OP1, NAD]
      description: "HDMI1/HDMI2/AUDIO1(DVI-D or PC)/AUDIO2(COMPONENT or VIDEO)/OpenPort PLATFORM/NO AUDIO"

- id: audio_input_each_set
  label: Audio Input Select (Each Input)
  kind: action
  command: "SAI:V{video_input}A{audio_input}"
  params:
    - name: video_input
      type: enum
      values: [HM1, HM2, DV1, PC1, YP1, VD1, OP1]
    - name: audio_input
      type: enum
      values: [HM1, HM2, PC1, VD1, OP1, NAD]

- id: audio_input_current_inquiry
  label: Audio Input (Current) Inquiry
  kind: query
  command: "QAI"
  reply: "QAI:V{video_input}A{audio_input}"

- id: audio_input_each_inquiry
  label: Audio Input (Each) Inquiry
  kind: query
  command: "QAI:V{video_input}"
  reply: "QAI:V{video_input}A{audio_input}"

# ===== Information Timing =====
- id: no_signal_warning_set
  label: No Signal Warning Set
  kind: action
  command: "SIT:NSW{state}"
  note: "Not sent if set Off."
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: no_signal_warning_inquiry
  label: No Signal Warning Inquiry
  kind: query
  command: "QIT:NSW"
  reply: "QIT:NSW{state}"

- id: no_signal_warning_timing_set
  label: No Signal Warning Timing Set
  kind: action
  command: "SIT:SWT{minutes:02d}"
  params:
    - name: minutes
      type: integer
      range: "01-60"

- id: no_signal_warning_timing_inquiry
  label: No Signal Warning Timing Inquiry
  kind: query
  command: "QIT:SWT"
  reply: "QIT:SWT{minutes:02d}"

- id: no_signal_error_set
  label: No Signal Error Set
  kind: action
  command: "SIT:NSE{state}"
  note: "Not sent if set Off."
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: no_signal_error_inquiry
  label: No Signal Error Inquiry
  kind: query
  command: "QIT:NSE"
  reply: "QIT:NSE{state}"

- id: no_signal_error_timing_set
  label: No Signal Error Timing Set
  kind: action
  command: "SIT:SET{minutes:02d}"
  params:
    - name: minutes
      type: integer
      range: "01-90"

- id: no_signal_error_timing_inquiry
  label: No Signal Error Timing Inquiry
  kind: query
  command: "QIT:SET"
  reply: "QIT:SET{minutes:02d}"

- id: temperature_warning_set
  label: Temperature Warning Set
  kind: action
  command: "SIT:TPW{state}"
  note: "Not sent if set Off."
  params:
    - name: state
      type: enum
      values: ["0", "1"]

- id: temperature_warning_inquiry
  label: Temperature Warning Inquiry
  kind: query
  command: "QIT:TPW"
  reply: "QIT:TPW{state}"

# ===== Others =====
- id: recall
  label: Recall Display
  kind: action
  command: "DDS"
  params: []

- id: audio_mute_others
  label: Audio Mute (Others)
  kind: action
  command: "AOC:{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]
      description: "MUTE OFF / MUTE ON"

- id: osd_clear
  label: OSD Clear
  kind: action
  command: "VDO"
  params: []

- id: digital_zoom_set
  label: Digital Zoom Set
  kind: action
  command: "DZM:{state}{factor}{hpos}{vpos}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]
      description: "OFF/ON"
    - name: factor
      type: enum
      values: ["1", "2", "3", "4"]
      description: "Enlargement factor"
    - name: hpos
      type: enum
      values: ["1", "2", "3", "4", "5"]
      description: "Display position (Horizontal)"
    - name: vpos
      type: enum
      values: ["1", "2", "3", "4", "5"]
      description: "Display position (Vertical)"

- id: digital_zoom_inquiry
  label: Digital Zoom Inquiry
  kind: query
  command: "QDZ"
  reply: "QDZ:{state}{factor}{hpos}{vpos}"

- id: off_timer_set
  label: Off Timer Set
  kind: action
  command: "ZOT:{minutes:02d}"
  params:
    - name: minutes
      type: integer
      range: "00-90"

- id: usb_player_next
  label: USB Media Player Skip to Next
  kind: action
  command: "UMP:NXT"
  precondition: "Using USB media player"
  params: []

- id: usb_player_previous
  label: USB Media Player Skip to Previous
  kind: action
  command: "UMP:PRE"
  precondition: "Using USB media player"
  params: []

- id: usb_player_replay_top
  label: USB Media Player Replay from Top
  kind: action
  command: "UMP:RPY"
  precondition: "Using USB media player"
  params: []

- id: signal_status_inquiry
  label: Signal Status Inquiry
  kind: query
  command: "QSI"
  reply: "QSI:{status}"
  params:
    - name: status
      type: enum
      values: ["0", "1", "2"]
      description: "0:Valid signal, 1:No signal, 2:Unsupported signal"

- id: signal_frequency_inquiry
  label: Signal Frequency Inquiry
  kind: query
  command: "QFR"
  reply: "QFR:H{hfreq}V{vfreq}"
  params:
    - name: hfreq
      type: string
      pattern: "000.00-999.99"
      description: "Horizontal frequency, 2 decimal places"
    - name: vfreq
      type: string
      pattern: "000.00-999.99"
      description: "Vertical frequency, 2 decimal places"

- id: signal_format_inquiry
  label: Signal Format Inquiry
  kind: query
  command: "QSF"
  reply: "QSF:{format}"
  params:
    - name: format
      type: string
      max_length: 20

- id: no_signal_warning_state_inquiry
  label: No Signal Warning State Inquiry
  kind: query
  command: "QST:NSW"
  reply: "QST:NSW{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]
      description: "0:Normal, 1:No Signal Warning. Reply '0' when feature set Off."

- id: no_signal_error_state_inquiry
  label: No Signal Error State Inquiry
  kind: query
  command: "QST:NSE"
  reply: "QST:NSE{state}"
  params:
    - name: state
      type: enum
      values: ["0", "1"]
      description: "0:Normal, 1:No Signal Error. Reply '0' when feature set Off."

- id: auto_command_send_setting
  label: Auto Command Send Setting
  kind: action
  command: "RCM:{qss_state}{qss_stserr_state}"
  params:
    - name: qss_state
      type: enum
      values: ["0", "1"]
      description: "OFF/ON for QSS command"
    - name: qss_stserr_state
      type: enum
      values: ["0", "1"]
      description: "OFF/ON for QSS:STSERR command"

- id: model_name_inquiry
  label: Model Name Inquiry
  kind: query
  command: "QMN"
  reply: "QMN:{detail}"
  standby_avail: true
  params:
    - name: size
      type: enum
      values: ["42", "49", "55"]
      description: "Inch size"
    - name: panel
      type: string
      pattern: "F"
      description: "FHD model"
    - name: model
      type: string
      pattern: "13"
      description: "AF1"

- id: model_inquiry
  label: Model Inquiry
  kind: query
  command: "QID"
  reply: "QID:{detail}"
  params:
    - name: size
      type: enum
      values: ["42", "49", "55"]
    - name: model
      type: string
      pattern: "AF1"
    - name: market
      type: enum
      values: [U, W, C]

- id: software_version_main_inquiry
  label: Software Version Main MCU Inquiry
  kind: query
  command: "QRV"
  reply: "QRV:{version}{model}"
  standby_avail: true
  params:
    - name: version
      type: string
      description: "e.g. 1.0000"
    - name: model
      type: string
      pattern: "AF1"

- id: software_version_sub_inquiry
  label: Software Version Sub MCU Inquiry
  kind: query
  command: "QRV:STB"
  reply: "QRV:STB {version}"
  standby_avail: true
  params:
    - name: version
      type: string
      description: "e.g. 01.00"

- id: software_version_eeprom_inquiry
  label: Software Version EEPROM Inquiry
  kind: query
  command: "QRV:EEP"
  reply: "QRV:EEP {version}"
  standby_avail: true
  params:
    - name: version
      type: string
      description: "e.g. 01.00"

- id: serial_number_inquiry
  label: Serial Number Inquiry
  kind: query
  command: "QSN"
  reply: "QSN:{serial}"
  standby_avail: true
  params:
    - name: serial
      type: string
      length: "9-15 ASCII chars"
      charset: "0x30-0x39, 0x41-0x5A, 0x20, 0x2D"

# ===== SOS History =====
- id: sos_history_inquiry
  label: SOS History Inquiry
  kind: query
  command: "QSS"
  reply: "QSS:{history}"
  standby_avail: true
  params:
    - name: count
      type: string
      pattern: "00-FF"
      description: "Number of times"
    - name: sos_1
      type: string
      pattern: "00-FF"
      description: "First SOS classification"
    - name: sos_2
      type: string
      pattern: "00-FF"
    - name: sos_3
      type: string
      pattern: "00-FF"
    - name: sos_4
      type: string
      pattern: "00-FF"
    - name: sos_5
      type: string
      pattern: "00-FF"
  note: "In the 10th time the order rearranges: 1st, 2nd, 9th, 10th, 8th."

- id: sos_status_inquiry
  label: SOS Status Inquiry
  kind: query
  command: "QSS:STS"
  reply: "QSS:STS{status}"
  standby_avail: true
  params:
    - name: status
      type: enum
      values: [NON, ERR, EXT]
      description: "NON:no SOS history, ERR:SOS generating, EXT:SOS history exists"
```

## Feedbacks
```yaml
# Error / status feedback documented in source
- id: error_reply
  type: enum
  trigger: "Incorrect command sent"
  values: [ER401]
  description: "Replied to computer on incorrect command. Also during OPF restart until initial communication completion."

- id: power_state
  type: enum
  values: ["0", "1"]
  description: "0:Standby(Off), 1:Power ON(On)"

- id: input_state
  type: enum
  values: [HM1, HM2, DV1, PC1, VD1, UD1, OP1]

- id: audio_volume
  type: integer
  range: "000-100"

- id: signal_status
  type: enum
  values: ["0", "1", "2"]
  description: "0:Valid signal, 1:No signal, 2:Unsupported signal"

- id: sos_status
  type: enum
  values: [NON, ERR, EXT]
```

## Variables
```yaml
# UNRESOLVED: source does not separately distinguish "variables" from
# parameterized actions; settable values are all enumerated under Actions.
```

## Events
```yaml
# Source does not document unsolicited notifications.
# Note: No Signal Warning / Temperature Warning features exist but source
# does not specify whether they push unsolicited events.
# UNRESOLVED: no events documented in source.
```

## Macros
```yaml
# Source does not document multi-step command sequences as named macros.
# UNRESOLVED: no macros documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: POF
    note: "Stand-by mode: display responds to PON/QPW commands only."
  - command: OPF:STB
    note: "OpenPort PLATFORM standby affects command acceptance window."
# UNRESOLVED: source contains no explicit safety warnings, interlock
# procedures, or power-on sequencing requirements. No voltage/current/power
# specs present. Populate only after consulting a device-level operating manual.
```

## Notes
- **Framing:** every command is wrapped as `<STX>(0x02) <3-char mnemonic> [:<params>] <ETX>(0x03)`. When no parameters, the colon is omitted. The `command:` field in Actions holds the bare payload; the controller must add STX/ETX.
- **Serial command rate:** when sending multiple commands, wait for the response to the first command before sending the next.
- **Stand-by mode:** in power-off (stand-by) the display responds to `PON` and `QPW` only. Other commands are ignored.
- **Error reply:** incorrect commands return `ER401`. Also returned during OPF restart window until initial communication completes (applies to OSD Language, Display Orientation, Timer Setup, Day/Time, Time Designation Screensaver).
- **Serial ID addressing:** for multi-display daisy chains, commands can be prefixed with `AD94;RAD:DDD;` (3-digit serial ID 000-100). Set `[Options]-[Serial ID function]` to on; configure `[Options]-[Serial daisy chain position]` (TOP/DEF/END). ID `000` = broadcast. Use straight cable with pins 2-8 hard-wired for daisy chain.
- **Numeric formatting:** source shows zero-padded fixed-width parameter fields (e.g. `000-100` means 3 digits; `0000-0255` means 4 digits; `-127~0128` signed). Negative values appear in source as e.g. `-020`.
- **Picture preconditions:** several picture commands (RGB gains/biases) are available only when Color Temperature is USER1 or USER2; Backlight adjustment requires Power Save Off; Gamma DC mode is inquiry-only when Picture Mode is DICOM.
- **Sound preconditions:** Sound Mode, Bass, Treble, Balance, Surround require Output Select = SPEAKERS.
- **Picture Mode alias:** Sound Mode `STD` may appear as `AUT` in the source enum table.

<!-- UNRESOLVED: TCP/IP transport details (port, base URL, framing) not stated in source despite "LAN" in title -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: protocol version not stated -->
<!-- UNRESOLVED: voltage, current, power, and environmental specs not present -->
<!-- UNRESOLVED: safety/interlock procedures not present; Safety section inferred only from documented stand-by command-acceptance behavior -->
<!-- UNRESOLVED: whether LAN transport supports the Serial ID / daisy-chain scheme is not stated -->
````

## Provenance

```yaml
source_domains:
  - docs.connect.panasonic.com
  - ptzprotocols.com
  - pro-av.panasonic.net
  - manualslib.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/AF1_SerialCommandList.pdf
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LAN_Protocol_exp.pdf
  - https://www.ptzprotocols.com/
  - https://pro-av.panasonic.net/manual/en/index.html
  - https://www.manualslib.com/brand/panasonic/
retrieved_at: 2026-06-15T01:32:30.637Z
last_checked_at: 2026-06-16T07:14:01.725Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:14:01.725Z
matched_actions: 277
action_count: 277
confidence: medium
summary: "All 277 spec actions match source mnemonics and parameter shapes; transport parameters verified verbatim. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LAN transport specifics (TCP port, IP framing) not documented in this source. Voltage/power specs not present. Safety/interlock procedures not documented."
- "TCP port number not stated in source"
- "LAN base URL / framing not stated in source"
- "whether LAN uses same STX/ETX framing or a different scheme not stated"
- "source does not separately distinguish \"variables\" from"
- "no events documented in source."
- "no macros documented in source."
- "source contains no explicit safety warnings, interlock"
- "TCP/IP transport details (port, base URL, framing) not stated in source despite \"LAN\" in title"
- "firmware version compatibility not stated"
- "protocol version not stated"
- "voltage, current, power, and environmental specs not present"
- "safety/interlock procedures not present; Safety section inferred only from documented stand-by command-acceptance behavior"
- "whether LAN transport supports the Serial ID / daisy-chain scheme is not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
