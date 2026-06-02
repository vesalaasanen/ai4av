---
spec_id: admin/panasonic-th80sf2h-th70sf2h
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic TH-80SF2H / TH-70SF2H Control Spec"
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
  - docs.connect.panasonic.com
  - eu.connect.panasonic.com
  - manualowl.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/SF2H_SerialCommandList.pdf
  - https://docs.connect.panasonic.com/prodisplays/support/rs232c_commandlist.html
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LAN_Protocol_exp.pdf
  - https://eu.connect.panasonic.com/sites/default/files/media/document/2017-12/sf2huw_manual_en.pdf
  - https://www.manualowl.com/m/Panasonic/TH-80SF2H/Manual/515989
retrieved_at: 2026-05-18T03:13:52.321Z
last_checked_at: 2026-06-02T17:23:41.332Z
generated_at: 2026-06-02T17:23:41.332Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Exact LAN port not explicitly pinned in protocol section; \"Default is 1024\" stated for the WEB control admin port. Treat 1024 as the default, but the source also lists a user-configurable LAN Setup - Port Number (1024-4351, 4353-9999, 10001-19999, 20001-27249, 27251-41793, 41795-65535)."
  - "no explicit multi-step command sequences described in source"
  - "no explicit safety warnings, interlock procedures, or power-on"
  - "firmware compatibility version range, voltage/current draw,"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:41.332Z
  matched_actions: 218
  action_count: 218
  confidence: medium
  summary: "All 218 spec actions match source wire tokens with correct shapes; AVL/AMT/VMT colon-separator fixes and changing_mode polarity (2=High,1=Normal) confirmed; transport params (9600 8N1, port 1024, MD5 auth) all verified. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Panasonic TH-80SF2H / TH-70SF2H Control Spec

## Summary
Large-format LCD signage displays (80-inch TH-80SF2H and 70-inch TH-70SF2H). RS-232C and LAN control over an ASCII command set framed with STX (0x02) and ETX (0x03), 3-character command mnemonics with colon-prefixed parameters. The same command mnemonics are exposed over both transports; LAN framing is "NTCONTROL 0" + payload.

<!-- UNRESOLVED: Exact LAN port not explicitly pinned in protocol section; "Default is 1024" stated for the WEB control admin port. Treat 1024 as the default, but the source also lists a user-configurable LAN Setup - Port Number (1024-4351, 4353-9999, 10001-19999, 20001-27249, 27251-41793, 41795-65535). -->

## Transport
```yaml
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
  port: 1024  # default LAN port per source; user-configurable via SSU:LCP (1024-4351, 4353-9999, 10001-19999, 20001-27249, 27251-41793, 41795-65535)
auth:
  type: password  # WEB control admin password (MD5 of random+password) when in Protect mode; Non protect mode sends NTCONTROL 0 directly
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
# All commands are 3-character ASCII mnemonics; parameters are colon-prefixed
# strings of fixed width per command. Wire format on RS-232C: <STX>CMD[:PARAM]<ETX>
# where STX=0x02, ETX=0x03. Wire format on LAN: "NTCONTROL 0" (0x4E 54 43 4F 4E 54
# 52 4F 4C 20 30 0D) followed by the same STX..ETX payload when LAN protocol = 1
# (or "NTCONTROL 1" when protocol = 2).

# --- Basic Control ---
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

- id: power_status
  label: Power Status
  kind: query
  command: "QPW"
  params: []
  # Reply: QPW:0 (Standby) / QPW:1 (Power ON)

- id: input_change
  label: Input Change
  kind: action
  command: "IMS:{input}"  # source: IMS:*** (colon precedes param; omit ':param' to toggle)
  params:
    - name: input
      type: string
      values: [HM1, HM2, DL1, DV1, PC1, VD1, UD1, MV1]
      description: HDMI1 / HDMI2 / DIGITAL LINK / DVI-D / PC / VIDEO / USB / MEMORY VIEWER; omit parameter to toggle

- id: input_change_dl1_yfb
  label: Digital Link Input select for YFB Series
  kind: action
  command: "IMS:DL1{input}"
  params:
    - name: input
      type: string
      values: [HD1, HD2, PC1, PC2, SVD, VID]
      description: "YFB100: HD1/HD2/PC1/PC2/SVD/VID; YFB200: HD1/HD2/PC1/PC2/VID"

- id: audio_volume_set
  label: Audio Volume
  kind: action
  command: "AVL:{level}"  # source: AVL:*** (mandatory colon before level)
  params:
    - name: level
      type: integer
      description: "000-100"

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
  label: Current Audio Volume
  kind: query
  command: "QAV"
  params: []
  # Reply: QAV:000-100

- id: audio_mute
  label: Audio Mute
  kind: action
  command: "AMT:{mode}"  # source: AMT(:*) — colon precedes param; omit ':param' to toggle
  params:
    - name: mode
      type: integer
      values: [0, 1]
      description: "Omit param to toggle. 0 = mute off, 1 = mute on."

- id: video_mute
  label: Video Mute
  kind: action
  command: "VMT:{mode}"  # source: VMT(:*) — colon precedes param; omit ':param' to toggle
  params:
    - name: mode
      type: integer
      values: [0, 1]
      description: "Omit param to toggle. 0 = off, 1 = on."

- id: aspect_change
  label: Aspect Change
  kind: action
  command: "DAM:{mode}"
  params:
    - name: mode
      type: string
      values: [FULL, NORM, ZOOM, ZOM2]
      description: FULL / NORMAL / ZOOM1 / ZOOM2

# --- Picture ---
- id: picture_mode
  label: Picture Mode
  kind: action
  command: "VPC:MEN{mode}"
  params:
    - name: mode
      type: string
      values: [VIV, NAT, STD, SUV, GRH, DCM]
      description: VIVID SIGNAGE / NATURAL SIGNAGE / STANDARD / SURVEILLANCE / GRAPHIC / DICOM

- id: backlight
  label: Backlight
  kind: action
  command: "VPC:BLT{level}"
  params:
    - name: level
      type: string
      description: "000-100 or DEF (default). Available when Power save is Off."

- id: picture_contrast
  label: Picture Contrast
  kind: action
  command: "VPC:PIC{level}"
  params:
    - name: level
      type: string
      description: "000-100 or DEF"

- id: black_level_brightness
  label: Black Level Brightness
  kind: action
  command: "VPC:BLK{level}"
  params:
    - name: level
      type: string
      description: "000-100 or DEF"

- id: color
  label: Color
  kind: action
  command: "VPC:COL{level}"
  params:
    - name: level
      type: string
      description: "000-100 or DEF"

- id: tint
  label: Tint
  kind: action
  command: "VPC:TIN{level}"
  params:
    - name: level
      type: string
      description: "000-100 or DEF"

- id: sharpness
  label: Sharpness
  kind: action
  command: "VPC:SHP{level}"
  params:
    - name: level
      type: string
      description: "000-100 or DEF"

- id: enhance_level
  label: Enhance level
  kind: action
  command: "VPC:SHE{level}"
  params:
    - name: level
      type: string
      values: ["1", "2"]
      description: "1 = low, 2 = high"

- id: gamma
  label: Gamma
  kind: action
  command: "VWB:GMM{value}"
  params:
    - name: value
      type: string
      values: ["20", "22", "24", "26"]
      description: "2.0 / 2.2 / 2.4 / 2.6"

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "VPC:TMP{value}"
  params:
    - name: value
      type: string
      values: ["032", "040", "050", "065", "075", "093", "107", "NTV", "U01", "U02"]
      description: "3200K-10700K, NaTiVe, USER1, USER2"

- id: red_gain
  label: Red Gain
  kind: action
  command: "VWB:RGN{value}"
  params:
    - name: value
      type: string
      description: "0000-0255; available when Color Temperature is USER1/USER2"

- id: green_gain
  label: Green Gain
  kind: action
  command: "VWB:GGN{value}"
  params:
    - name: value
      type: string
      description: "0000-0255; available when Color Temperature is USER1/USER2"

- id: blue_gain
  label: Blue Gain
  kind: action
  command: "VWB:BGN{value}"
  params:
    - name: value
      type: string
      description: "0000-0255; available when Color Temperature is USER1/USER2"

- id: red_bias
  label: Red Bias
  kind: action
  command: "VWB:RBS{value}"
  params:
    - name: value
      type: string
      description: "-127 to 0128 (sign + 4-digit zero-padded); USER1/USER2 only"

- id: green_bias
  label: Green Bias
  kind: action
  command: "VWB:GBS{value}"
  params:
    - name: value
      type: string
      description: "-127 to 0128; USER1/USER2 only"

- id: blue_bias
  label: Blue Bias
  kind: action
  command: "VWB:BBS{value}"
  params:
    - name: value
      type: string
      description: "-127 to 0128; USER1/USER2 only"

- id: six_seg_color_management
  label: 6-segment color management
  kind: action
  command: "VWB:CMF{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = off, 1 = on"

- id: six_seg_color_select
  label: 6-segment color management select color
  kind: action
  command: "VWB:CML{color}{tint}{saturation}{value}"
  params:
    - name: color
      type: string
      values: [R, Y, G, C, B, M]
    - name: tint
      type: string
      description: "-511 to 0511"
    - name: saturation
      type: string
      description: "-127 to 0127"
    - name: value
      type: string
      description: "-127 to 0127"

- id: six_seg_color_reset
  label: 6-segment color management reset
  kind: action
  command: "VWB:CMR"
  params: []

- id: dynamic_contrast
  label: Dynamic Contrast
  kind: action
  command: "VPC:DCO{level}"
  params:
    - name: level
      type: string
      description: "00-10"

- id: color_enhancement
  label: Color Enhancement
  kind: action
  command: "VPC:PAJ{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = OFF, 1 = ON"

- id: refine_enhancer
  label: Refine enhancer
  kind: action
  command: "VPC:SRC{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1", "2", "3"]
      description: "0 = OFF, 1 = Low, 2 = Mid, 3 = High"

- id: gradation_smoother
  label: Gradation smoother
  kind: action
  command: "VPC:GRS{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = off, 1 = on"

# --- Picture Memory ---
- id: memory_delete
  label: Memory delete
  kind: action
  command: "VPF:DEL{slot}"
  params:
    - name: slot
      type: string
      description: "01-06 (Memory No.1 - Memory No.6)"

- id: memory_load
  label: Memory load
  kind: action
  command: "VPF:LOD{slot}"
  params:
    - name: slot
      type: string
      description: "01-06"

- id: memory_name_change
  label: Memory name change
  kind: action
  command: "VPF:NAM{slot}{name}"
  params:
    - name: slot
      type: string
      description: "01-06"
    - name: name
      type: string
      description: "Max 20 characters"

- id: memory_save
  label: Memory save
  kind: action
  command: "VPF:SAV{slot}{name}"
  params:
    - name: slot
      type: string
      description: "01-06"
    - name: name
      type: string
      description: "Max 20 characters"

- id: memory_state
  label: Memory state
  kind: query
  command: "QPF:STA"
  params: []
  # Reply: QPF:STA******  where ****** = "- / 0" per Memory No.1-6 (Unused / Use)

# --- Sound Adjustment ---
- id: output_select
  label: Output Select
  kind: action
  command: "AAC:OUT{target}"
  params:
    - name: target
      type: string
      values: [SPO, LNO]
      description: SPEAKERS / AUDIO OUT

- id: balance
  label: Balance
  kind: action
  command: "AAC:BAL{value}"
  params:
    - name: value
      type: string
      description: "-20 to +20 (4-digit zero-padded, sign+3 digits). Available when Output Select is SPEAKERS."

- id: sound_mode
  label: Sound Mode
  kind: action
  command: "AAC:MEN{mode}"
  params:
    - name: mode
      type: string
      values: [STD, AUT, DYN, CLR]
      description: STANDARD / DYNAMIC / CLEAR. SPEAKERS only.

- id: bass
  label: Bass
  kind: action
  command: "AAC:BAS{value}"
  params:
    - name: value
      type: string
      description: "-20 to +20. SPEAKERS only."

- id: treble
  label: Treble
  kind: action
  command: "AAC:TRE{value}"
  params:
    - name: value
      type: string
      description: "-20 to +20. SPEAKERS only."

- id: surround
  label: Surround
  kind: action
  command: "AAC:SUR{mode}"
  params:
    - name: mode
      type: string
      values: [MON, OFF]
      description: "ON / OFF (the source codes MON/OFF; map MON→ON). SPEAKERS only."

# --- Position/Size ---
- id: horizontal_position
  label: Horizontal Position
  kind: action
  command: "DGE:HPO{value}"
  params:
    - name: value
      type: string
      description: "-100 to +100 (5-digit zero-padded, sign+4 digits)"

- id: horizontal_size
  label: Horizontal Size
  kind: action
  command: "DGE:HSZ{value}"
  params:
    - name: value
      type: string
      description: "-100 to +100"

- id: vertical_position
  label: Vertical Position
  kind: action
  command: "DGE:VPO{value}"
  params:
    - name: value
      type: string
      description: "-100 to +100"

- id: vertical_size
  label: Vertical Size
  kind: action
  command: "DGE:VSZ{value}"
  params:
    - name: value
      type: string
      description: "-100 to +100"

- id: clock_phase
  label: Clock Phase
  kind: action
  command: "DGE:CLK{value}"
  params:
    - name: value
      type: string
      description: "00-30"

- id: dot_clock
  label: Dot Clock
  kind: action
  command: "DGE:DCL{value}"
  params:
    - name: value
      type: string
      description: "-5 to +5 (sign+2 digits)"

- id: one_to_one_pixel_mode
  label: 1:1 Pixel Mode
  kind: action
  command: "DGE:DBD{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = OFF, 1 = ON"

- id: overscan
  label: Overscan
  kind: action
  command: "DGE:OVS{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = OFF, 1 = ON"

- id: pos_size_lump
  label: Pos./Size Lump Setting
  kind: action
  command: "DGE:PSZ{hpos}{hsize}{vpos}{vsize}"
  params:
    - name: hpos
      type: string
      description: "-100 to +100 (5-digit)"
    - name: hsize
      type: string
      description: "-100 to +100 (5-digit)"
    - name: vpos
      type: string
      description: "-100 to +100 (5-digit)"
    - name: vsize
      type: string
      description: "-100 to +100 (5-digit)"

- id: auto_setup
  label: Auto Setup
  kind: action
  command: "DGE:ASU{mode}"
  params:
    - name: mode
      type: string
      description: "1 = Execution start. Inquiry reply: OK / NG / OF / NW."

# --- Set up (Wobbling, Language, Orientation, Menu) ---
- id: wobbling
  label: Wobbling
  kind: action
  command: "OSP:WOB{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = OFF, 1 = ON"

- id: no_activity_power_off
  label: No activity power off
  kind: action
  command: "SSU:NAO{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = OFF, 1 = ON"

- id: osd_language
  label: OSD Language
  kind: action
  command: "SSU:LNG{lang}"
  params:
    - name: lang
      type: string
      values: [ENG, DEU, FRA, ITL, ITA, ESP, USA, CHA, JPN, RUS]
      description: English(UK)/German/French/Italian/Spanish/English(US)/Chinese/Japanese/Russian

- id: display_orientation
  label: Display Orientation
  kind: action
  command: "SSU:DOR{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = Landscape, 1 = Portrait"

- id: image_rotation
  label: Image rotation
  kind: action
  command: "SSU:IMR{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = Off, 1 = 180 degrees"

- id: menu_position
  label: Menu Position
  kind: action
  command: "SSU:OPS{pos}"
  params:
    - name: pos
      type: string
      values: ["1", "2", "3"]
      description: "1 = Left(Landscape)/Upper(Portrait); 2 = Center; 3 = Right(Landscape)/Lower(Portrait)"

- id: menu_display_duration
  label: Menu Display Duration
  kind: action
  command: "SSU:MDT{seconds}"
  params:
    - name: seconds
      type: string
      description: "005-180 (5-second unit)"

- id: menu_transparency
  label: Menu Transparency
  kind: action
  command: "SSU:MTL{percent}"
  params:
    - name: percent
      type: string
      description: "000-100 (10% unit)"

# --- Set up: Signal ---
- id: yc_filter_3d
  label: 3D Y/C Filter
  kind: action
  command: "SSG:YCS{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: color_system
  label: Color System
  kind: action
  command: "SSG:COS{sys}"
  params:
    - name: sys
      type: string
      values: [NTS, PAL, SCM, "4NT", MPA, NPA, AUT]
      description: NTSC / PAL / SECAM / NTSC4.43 / PAL-M / PAL-N / AUTO

- id: sync_signal_setting
  label: Sync Signal Setting
  kind: action
  command: "SSG:SNC{mode}"
  params:
    - name: mode
      type: string
      values: [HAV, GRN, HVS]
      description: "Auto detection / Sync On Green / Hvsync. PC input only."

- id: cinema_reality_32_pulldown
  label: Cinema Reality 3:2 Pull Down
  kind: action
  command: "SSG:DCR{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: xga_mode
  label: XGA Mode
  kind: action
  command: "SSG:XGA{mode}"
  params:
    - name: mode
      type: string
      values: ["1", "2", "3", "4"]
      description: "1=1024x768, 2=1280x768, 3=1366x768, 4=Auto"

- id: noise_reduction
  label: Noise Reduction
  kind: action
  command: "SSG:NRS{mode}"
  params:
    - name: mode
      type: string
      values: [OFF, AUT, LOW, MID, HIG]
      description: "OFF / Auto / Low / Middle / High"

- id: mpeg_noise_reduction
  label: MPEG Noise Reduction
  kind: action
  command: "SSG:MNR{mode}"
  params:
    - name: mode
      type: string
      values: [OFF, LOW, MID, HIG]
      description: "OFF / Low / Middle / High"

- id: signal_range
  label: Signal Range
  kind: action
  command: "SSG:HRC{range}"
  params:
    - name: range
      type: string
      values: [VID, FUL, AUT]
      description: "Video / FULL / Auto. For HDMI/DVI-D inputs only."

- id: component_rgb_select
  label: Component/RGB-IN Select
  kind: action
  command: "SSU:CMP{signal}"
  params:
    - name: signal
      type: string
      values: [YBR, RGB]
      description: "YBR Signal / RGB Signal. PC only."

- id: yuv_rgb_select
  label: YUV/RGB-IN Select
  kind: action
  command: "SSU:DYR{signal}"
  params:
    - name: signal
      type: string
      values: [YUV, RGB]
      description: "YUV Signal / RGB Signal. HDMI1/HDMI2/DVI-D only."

- id: input_level
  label: Input Level
  kind: action
  command: "VWB:ILV{value}"
  params:
    - name: value
      type: string
      description: "-16 to +16 (sign+3 digits)"

- id: dynamic_backlight_control
  label: Dynamic backlight control
  kind: action
  command: "SSG:DBC{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

# --- Set up: Screensaver ---
- id: screensaver_on_off
  label: Screensaver ON/OFF
  kind: action
  command: "OSP:SCR{state}"
  params:
    - name: state
      type: string
      values: ["0", "5"]
      description: "0 = stop, 5 = operating"

- id: screensaver_mode
  label: Screensaver Mode
  kind: action
  command: "SSC:MOD{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1", "2", "3", "4"]
      description: "0=OFF, 1=Interval, 2=Time Designation, 3=ON, 4=Standby after Screensaver"

- id: interval_screensaver
  label: Interval Screensaver
  kind: action
  command: "SSC:INT{periodic}{operating}"
  params:
    - name: periodic
      type: string
      description: "Periodic time HHMM (0000-2359)"
    - name: operating
      type: string
      description: "Operating time HHMM (0000-2359)"

- id: time_designation_screensaver
  label: Time Designation Screensaver
  kind: action
  command: "SSC:TIM{start}{finish}"
  params:
    - name: start
      type: string
      description: "Start time HHMM (0000-2359)"
    - name: finish
      type: string
      description: "Finish time HHMM (0000-2359)"

- id: standby_after_screensaver
  label: Standby after Screensaver
  kind: action
  command: "SSC:AOF{time}"
  params:
    - name: time
      type: string
      description: "HHMM (0000-2359)"

# --- Set up: Input label ---
- id: set_label_current_input
  label: Set Label for Current Input
  kind: action
  command: "SSU:ILA{label}"
  params:
    - name: label
      type: string
      values: [INP, PCN, DV1, DV2, DV3, BD1, BD2, BD3, CTV, VCR, STB, SKP]
      description: "INP/PCN reset name; DV1-3/BD1-3 = DVD/Blu-ray 1-3; CTV/VCR/STB/SKP"

- id: set_label_each_input
  label: Set Label for EACH INPUT
  kind: action
  command: "SSU:ILA{input}{label}"
  params:
    - name: input
      type: string
      values: [HM1, HM2, DL1, DV1, PC1, VD1]
    - name: label
      type: string
      values: [INP, DV1, DV2, DV3, BD1, BD2, BD3, CTV, VCR, STB, SKP]

# --- Set up: Power management ---
- id: power_management_mode
  label: Power Management Mode
  kind: action
  command: "SSU:ECS{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = CUSTOM, 1 = ON"

- id: no_signal_power_off
  label: No Signal Power Off
  kind: action
  command: "SSU:AOF{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: hdmi1_power_management
  label: HDMI1 Power Management
  kind: action
  command: "SSU:D1H{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: hdmi2_power_management
  label: HDMI2 Power Management
  kind: action
  command: "SSU:D2H{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: digital_link_power_management
  label: DIGITAL LINK Power Management
  kind: action
  command: "SSU:D1L{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: dvi_d_power_management
  label: DVI-D Power Management
  kind: action
  command: "SSU:D1V{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: pc_power_management
  label: PC Power Management
  kind: action
  command: "SSU:DPM{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: power_save
  label: Power Save
  kind: action
  command: "SSU:ECO{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: extended_standby_mode
  label: Extended standby mode
  kind: action
  command: "SSU:ESM{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

# --- Set up: HDMI-CEC ---
- id: hdmi_cec_control
  label: HDMI-CEC control
  kind: action
  command: "SHC:FNC{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = Disable, 1 = Enable"

- id: hdmi1_change_device
  label: HDMI1 (change device)
  kind: action
  command: "SHC:HM1{dir}"
  params:
    - name: dir
      type: string
      values: [NXT, PRE]
      description: NXT = next device, PRE = previous device

- id: hdmi1_get_device_name
  label: HDMI1 (get device name)
  kind: query
  command: "QHC:HM1"
  params: []
  # Reply: QHC:HM1<name>  (max 23 chars)

- id: hdmi2_change_device
  label: HDMI2 (change device)
  kind: action
  command: "SHC:HM2{dir}"
  params:
    - name: dir
      type: string
      values: [NXT, PRE]

- id: hdmi2_get_device_name
  label: HDMI2 (get device name)
  kind: query
  command: "QHC:HM2"
  params: []
  # Reply: QHC:HM2<name>  (max 23 chars)

- id: cec_menu_code
  label: MENU code
  kind: action
  command: "SHC:MNC{code}"
  params:
    - name: code
      type: string
      values: ["1", "2", "3", "4", "5", "6"]

- id: cec_display_to_device
  label: Display→Device
  kind: action
  command: "SHC:PTS{mode}"
  params:
    - name: mode
      type: string
      values: [OFF, POF, PWR]
      description: "Disable / Power off / Power on/off"

- id: cec_device_to_display
  label: Device→Display
  kind: action
  command: "SHC:STP{mode}"
  params:
    - name: mode
      type: string
      values: [OFF, PON, PWR]
      description: "Disable / Power on / Power on/off"

# --- Set up: Image settings / Startup image ---
- id: startup_image_display
  label: Display setting (startup image)
  kind: action
  command: "SCI:SIM{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: startup_image_select
  label: Image select (startup image)
  kind: action
  command: "SCI:SCG{image}"
  params:
    - name: image
      type: string
      values: ["0", "1"]
      description: "0 = Default image, 1 = User image"

- id: no_signal_image_display
  label: Display setting (no-signal image)
  kind: action
  command: "SCI:NIM{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: no_signal_image_select
  label: Image select (no-signal image)
  kind: action
  command: "SCI:NCG{image}"
  params:
    - name: image
      type: string
      values: ["0", "1"]
      description: "0 = Default image, 1 = User image"

# --- Set up: Multi display ---
- id: multi_display_on_off
  label: Multi Display ON/OFF
  kind: action
  command: "MDC:{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = OFF, 1 = ON"

- id: multi_display_setup
  label: Multi Display Setup Detail
  kind: action
  command: "MDC:EXP{on}{hscale}{vscale}{bezel_h}{bezel_v}{location}"
  params:
    - name: on
      type: string
      values: ["0", "1"]
    - name: hscale
      type: string
      description: "01-10 (Horizontal Scale)"
    - name: vscale
      type: string
      description: "01-10 (Vertical Scale)"
    - name: bezel_h
      type: string
      description: "000-100 (Bezel H Adjustment)"
    - name: bezel_v
      type: string
      description: "000-100 (Bezel V Adjustment)"
    - name: location
      type: string
      description: "001-100 (Location: A1-J10 encoded numerically)"

# --- Set up timer ---
- id: set_up_timer_program
  label: Set up timer
  kind: action
  command: "TIM:PRG{program}{enable}{day}{action}{time}{input}"
  params:
    - name: program
      type: string
      description: "01-20 (Program number)"
    - name: enable
      type: string
      values: ["0", "1"]
      description: "Function OFF/ON (lower params ignored when OFF)"
    - name: day
      type: string
      values: [SUN, MON, TUE, WED, THU, FRI, SAT, EVD]
    - name: action
      type: string
      values: [PON, POF]
    - name: time
      type: string
      description: "HHMM (0000-2359)"
    - name: input
      type: string
      values: [HM1, HM2, DL1, DV1, PC1, VD1, UD1, MV1]

- id: present_day
  label: Present Day
  kind: query
  command: "QIM:DAY"
  params: []
  # Reply: QIM:DAY<SUN/MON/.../SAT>

- id: present_time
  label: Present Time
  kind: query
  command: "QIM:NOW"
  params: []
  # Reply: QIM:NOW0<HHMM>

- id: set_day_time
  label: DAY TIME
  kind: action
  command: "TIM:DAT{yyyy}{mm}{dd}{hh}{mm_}"
  params:
    - name: yyyy
      type: string
      description: "2017-2035"
    - name: mm
      type: string
      description: "01-12"
    - name: dd
      type: string
      description: "01-31"
    - name: hh
      type: string
      description: "00-23"
    - name: mm_
      type: string
      description: "00-59"

- id: synchronize_display
  label: Synchronize display
  kind: action
  command: "TIM:SDM{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = Off, 1 = On"

- id: parent_or_child_setting
  label: Parent or child setting
  kind: action
  command: "TIM:PCS{role}"
  params:
    - name: role
      type: string
      values: ["0", "1"]
      description: "0 = Child, 1 = Parent"

# --- Network settings ---
- id: serial_control_select
  label: Serial Control
  kind: action
  command: "SCT:SEC{path}"
  params:
    - name: path
      type: string
      values: [SE1, DL1]
      description: "SE1 = Serial in, DL1 = DIGITAL LINK"

- id: network_control
  label: Network Control
  kind: action
  command: "SSU:NCT{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = OFF, 1 = ON. Setting to Off while connected via LAN may disconnect."

- id: auto_display_name
  label: Auto Display Name
  kind: action
  command: "SSU:ADN{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: display_name
  label: Display name
  kind: action
  command: "SSU:LDN{name}"
  params:
    - name: name
      type: string
      description: "Max 8 characters"

- id: lan_setup_network
  label: LAN Setup - Network Address
  kind: action
  command: "SSU:NET{ip1}{ip2}{ip3}{ip4}{sn1}{sn2}{sn3}{sn4}{gw1}{gw2}{gw3}{gw4}{dhcp}"
  params:
    - name: ip1
      type: string
      description: "000-255 (IP byte 1)"
    - name: ip2
      type: string
      description: "000-255"
    - name: ip3
      type: string
      description: "000-255"
    - name: ip4
      type: string
      description: "000-255"
    - name: sn1
      type: string
      description: "000-255 (subnet byte 1)"
    - name: sn2
      type: string
      description: "000-255"
    - name: sn3
      type: string
      description: "000-255 (source appears to have a typo repeating sn1/2; treat as 4 subnet bytes total: 1st-4th)"
    - name: sn4
      type: string
      description: "000-255"
    - name: gw1
      type: string
      description: "000-255 (gateway byte 1)"
    - name: gw2
      type: string
      description: "000-255"
    - name: gw3
      type: string
      description: "000-255"
    - name: gw4
      type: string
      description: "000-255"
    - name: dhcp
      type: string
      values: ["0", "1"]
      description: "0 = DHCP OFF, 1 = DHCP ON"

- id: lan_setup_port
  label: LAN Setup - Port Number
  kind: action
  command: "SSU:LCP{port}"
  params:
    - name: port
      type: string
      description: "1024-4351, 4353-9999, 10001-19999, 20001-27249, 27251-41793, 41795-65535"

- id: digital_link_mode
  label: DIGITAL LINK Mode
  kind: action
  command: "SSU:DLM{mode}"
  params:
    - name: mode
      type: string
      values: [AT, DL, EN]
      description: "Auto / DIGITAL LINK mode / Ethernet"

- id: digital_link_status
  label: DIGITAL LINK STATUS
  kind: query
  command: "QSU:DLS"
  params: []
  # Reply: QSU:DLS%1%2-%3%4-%5%6
  # %1: 0/1/2/3 (No connect/Digital Link/LPM/Ethernet)
  # %2: 0/1/2 (No HDMI/HDMI No HDCP/HDMI HDCP)
  # %3%4: 00-99 (Signal Quality MIN)
  # %5%6: 00-99 (Signal Quality MAX)

- id: amx_dd
  label: AMX D.D.
  kind: action
  command: "SSU:ADD{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: crestron_connected
  label: Crestron Connected
  kind: action
  command: "SSU:CRV{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: extron_xtp
  label: Extron XTP
  kind: action
  command: "SSU:EXP{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: usb_memory_network_settings
  label: USB memory network settings
  kind: action
  command: "SSU:UNS{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = Prohibit, 1 = Permit"

- id: lan_reset
  label: Reset
  kind: action
  command: "SSU:LRT"
  params: []

# --- USB media player settings ---
- id: usb_media_player
  label: USB media player
  kind: action
  command: "SUS:UMP{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = Disable, 1 = Enable"

- id: schedule_play_function
  label: Schedule play function
  kind: action
  command: "SUS:SPF{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = Disable, 1 = Enable"

- id: video_playback_mode
  label: Video Playback Mode
  kind: action
  command: "SUS:VPB{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = Standard, 1 = Adjust"

- id: resume_play
  label: Resume play
  kind: action
  command: "SUS:RSP{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: slide_show_duration
  label: Slide show duration
  kind: action
  command: "SUS:SSD{seconds}"
  params:
    - name: seconds
      type: string
      description: "010-600 (5-second unit)"

- id: play_mode
  label: Play mode
  kind: action
  command: "SUS:SPM{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = Individual play, 1 = Synchronize play"

- id: get_schedule_play_mode
  label: get Schedule play mode
  kind: query
  command: "QUS:CMS"
  params: []
  # Reply: QUS:CMS* 0 = Normal mode, 1 = Schedule play mode

# --- Memory viewer settings ---
- id: memory_viewer_function
  label: Memory viewer function
  kind: action
  command: "SMS:MVF{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = OFF, 1 = ON"

- id: memory_view_view
  label: View
  kind: action
  command: "SMS:VIE{view}"
  params:
    - name: view
      type: string
      values: [THU, LIS]
      description: "THU = Thumbnail, LIS = List"

- id: memory_view_content_select
  label: Content select
  kind: action
  command: "SMS:CON{content}"
  params:
    - name: content
      type: string
      values: [STL, VID, AUD, ALL, SAV, SAA, VAA]
      description: Picture / Video / Audio / All / Picture+Video / Picture+Audio / Video+Audio

- id: memory_view_sort_type
  label: Sort type
  kind: action
  command: "SMS:TYP{type}"
  params:
    - name: type
      type: string
      values: [DAT, NAM]
      description: "DAT = Date, NAM = Name"

- id: memory_view_sort_order
  label: Sort order
  kind: action
  command: "SMS:ODR{order}"
  params:
    - name: order
      type: string
      values: [ASD, DSD]
      description: "ASD = Ascending, DSD = Descending"

- id: memory_view_play_method
  label: Play method
  kind: action
  command: "SMS:RPT{method}"
  params:
    - name: method
      type: string
      values: [NON, ONE, ALL, RAN, SEL, PRG]
      description: None / Repeat one / Repeat all / Random / Select / Program

- id: memory_view_picture_duration
  label: Picture duration
  kind: action
  command: "SMS:SSD{seconds}"
  params:
    - name: seconds
      type: string
      description: "010-600 (5-second unit)"

- id: memory_view_auto_info
  label: Auto display content info
  kind: action
  command: "SMS:INF{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: memory_view_auto_guide
  label: Auto display operation guide
  kind: action
  command: "SMS:GUI{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

# --- Function button settings ---
- id: function_group
  label: Function Group
  kind: action
  command: "OSP:KGR{group}"
  params:
    - name: group
      type: string
      values: [INP, MEM, ACT]
      description: INPUT / MEMORY / ACTION & MENU(SHORTCUT)

- id: function_button_settings
  label: Function Button Settings
  kind: action
  command: "OSP:KFN{key}{value}"
  params:
    - name: key
      type: string
      values: ["1", "2", "3", "4", "5", "6"]
      description: "FUNCTION KEY 1-6"
    - name: value
      type: string
      description: "Per Function Group: ACTION&MENU = SIG/SSV/SUT/LNS/ECO/OSH/MLT/DZM/DID/HCO/PLE; INPUT = HM1/HM2/DL1/DV1/PC1/VD1/UD1/MV1"

- id: function_guide_settings
  label: Function guide Settings
  kind: action
  command: "OSP:KFG{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = OFF, 1 = ON"

# --- Options Menu ---
- id: on_screen_display
  label: On screen display
  kind: action
  command: "OSP:OSD{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: initial_input
  label: Initial input
  kind: action
  command: "OSP:IIN{input}"
  params:
    - name: input
      type: string
      values: [OFF, HM1, HM2, DL1, DV1, PC1, VD1, UD1, MV1]

- id: initial_vol_level
  label: Initial VOL level
  kind: action
  command: "OSP:IVL{enable}{volume}"
  params:
    - name: enable
      type: string
      values: ["0", "1"]
    - name: volume
      type: string
      description: "000-100"

- id: maximum_vol_level
  label: Maximum VOL level
  kind: action
  command: "OSP:MVL{enable}{volume}"
  params:
    - name: enable
      type: string
      values: ["0", "1"]
    - name: volume
      type: string
      description: "000-100"

- id: input_lock
  label: Input lock
  kind: action
  command: "OSP:INL{input}"
  params:
    - name: input
      type: string
      values: [OFF, HM1, HM2, DL1, DV1, PC1, VD1, UD1, MV1]

- id: button_lock
  label: Button lock
  kind: action
  command: "OSP:BTL{mode}"
  params:
    - name: mode
      type: string
      values: [OFF, MEN, ALL]
      description: "OFF / MENU&ENTER / ON"

- id: controller_user_level
  label: Controller User level
  kind: action
  command: "OSP:RCM{level}"
  params:
    - name: level
      type: string
      values: ["0", "1", "2", "3"]
      description: "0 = OFF, 1 = User1, 2 = User2, 3 = User3"

- id: pc_auto_setting
  label: PC auto setting
  kind: action
  command: "OSP:PAS{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: off_timer_function
  label: Off-timer function
  kind: action
  command: "OSP:OFT{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: initial_startup
  label: Initial Startup
  kind: action
  command: "OSP:ISU{value}"
  params:
    - name: value
      type: string
      values: [LST, PON, STB]
      description: "LST = Last memory, PON = ON, STB = STANDBY"

- id: display_id
  label: Display ID
  kind: query
  command: "QID:DID"
  params: []
  # Reply: QID:DID000-100

- id: serial_id_function
  label: Serial ID function
  kind: action
  command: "SID:SID{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: serial_response_normal
  label: Serial Response (Normal)
  kind: action
  command: "SCT:RIN{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: serial_response_id_all
  label: Serial Response (ID all)
  kind: action
  command: "SCT:RIA{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: serial_id_setup
  label: Serial ID Setup
  kind: action
  command: "SIF:{enable}{id}"
  params:
    - name: enable
      type: string
      values: ["0", "1"]
    - name: id
      type: string
      description: "000-100 (Display ID)"

- id: serial_daisy_chain_position
  label: Serial daisy chain position
  kind: action
  command: "SCT:DCP{position}"
  params:
    - name: position
      type: string
      values: [TOP, DEF, END]
      description: "TOP / (default) / END"

- id: lan_control_protocol
  label: LAN Control Protocol
  kind: action
  command: "OSP:LPN{protocol}"
  params:
    - name: protocol
      type: string
      values: [LP1, LP2]
      description: "LP1 = Protocol 1, LP2 = Protocol 2"

- id: power_on_screen_delay
  label: Power ON Screen Delay
  kind: action
  command: "OSP:POD{delay}"
  params:
    - name: delay
      type: string
      description: "AT = Auto, 00-30 seconds"

- id: clock_display
  label: Clock Display
  kind: action
  command: "OSP:CLK{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: power_on_message_no_activity
  label: Power on message (No activity power off)
  kind: action
  command: "OSP:NAP{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: power_on_message_power_management
  label: Power on message (Power management)
  kind: action
  command: "OSP:PMM{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

# --- Input search ---
- id: input_search
  label: Input search
  kind: action
  command: "ISH:FNC{mode}"
  params:
    - name: mode
      type: string
      values: [OFF, ALL, PRI, IDC]
      description: "OFF / ALL inputs / Custom / Input detection"

- id: first_search_input
  label: 1st search input
  kind: action
  command: "ISH:PRI{input}"
  params:
    - name: input
      type: string
      values: [NON, HM1, HM2, DV1, PC1, VD1, UD1]

- id: second_search_input
  label: 2nd search input
  kind: action
  command: "ISH:SCI{input}"
  params:
    - name: input
      type: string
      values: [NON, HM1, HM2, DV1, PC1, VD1, UD1]

- id: detect_digital_input
  label: Detect digital input
  kind: action
  command: "ISH:DIN{input}{mode}"
  params:
    - name: input
      type: string
      values: [HM1, HM2, DL1, DV1, PC1]
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = OFF, 1 = ON"

- id: changing_delay
  label: Changing delay
  kind: action
  command: "ISH:CGD{seconds}"
  params:
    - name: seconds
      type: string
      description: "00-10 (changing time in seconds)"

# --- Failover/Failback ---
- id: input_change_mode_off
  label: Input Change Mode Off
  kind: action
  command: "SBI:OFF"
  params: []

- id: input_change_mode_quick
  label: Input Change Mode Quick
  kind: action
  command: "SBI:QIC{primary}{secondary}{auto_back}"
  params:
    - name: primary
      type: string
      values: [NON, HM1, HM2, DL1, DV1]
    - name: secondary
      type: string
      values: [NON, HM1, HM2, DL1, DV1]
    - name: auto_back
      type: string
      values: ["0", "1"]
      description: "0 = Disable, 1 = Enable"

- id: input_change_mode_normal
  label: Input Change Mode Normal
  kind: action
  command: "SBI:NOR{primary}{secondary}{auto_back}"
  params:
    - name: primary
      type: string
      values: [NON, HM1, HM2, DL1, DV1, PC1, VD1, UD1]
    - name: secondary
      type: string
      values: [NON, HM1, HM2, DL1, DV1, PC1, VD1, UD1]
    - name: auto_back
      type: string
      values: ["0", "1"]

- id: changing_mode
  label: Changing mode
  kind: action
  command: "SBI:CHM{mode}"
  params:
    - name: mode
      type: string
      values: ["1", "2"]
      description: "2 = High speed, 1 = Normal speed (Quick mode only)"

- id: backup_input_status
  label: Backup Input Status
  kind: query
  command: "QBI:STS"
  params: []
  # Reply: QBI:STS<active><main_input><current>
  # active: 0=inactive, 1=active
  # main_input: HM1/HM2/DL1/DV1/PC1/VD1/UD1/MV1
  # current: 0=Main, 1=Primary backup, 2=Secondary backup

- id: backup_input_signal_status
  label: Backup Input Signal Status
  kind: query
  command: "QBI:SIG"
  params: []
  # Reply: QBI:SIG<m><p><s> (0=no signal, 1=not no signal for Main/Primary/Secondary)

- id: manual_switch_back
  label: Manual Switch Back
  kind: action
  command: "BIP:FSB"
  params: []

# --- Audio input select ---
- id: audio_input_select_current
  label: Audio input select (for Current Input)
  kind: action
  command: "SAI:A{audio}"
  params:
    - name: audio
      type: string
      values: [HM1, HM2, DL1, DV1, PC1, VD1, NAD]
      description: "Audio source: HM1/HM2/DL1/DV1/PC1/VD1 or NAD (no audio)"

- id: audio_input_select_each
  label: Audio input select (for EACH INPUT)
  kind: action
  command: "SAI:V{input}A{audio}"
  params:
    - name: input
      type: string
      values: [HM1, HM2, DL1, DV1, PC1, VD1]
    - name: audio
      type: string
      values: [HM1, HM2, DL1, AV, NAD]
      description: "AV covers AV IN x3 (source lists AV IN three times); NAD = no audio"

# --- Information Timing ---
- id: no_signal_warning
  label: No Signal Warning
  kind: action
  command: "SIT:NSW{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = Off, 1 = On (auto reply QST:NSW*)"

- id: no_signal_warning_timing
  label: No Signal Warning Timing
  kind: action
  command: "SIT:SWT{minutes}"
  params:
    - name: minutes
      type: string
      description: "01-60"

- id: query_no_signal_warning
  label: Query status: No Signal Warning
  kind: query
  command: "QST:NSW"
  params: []
  # Reply: 0 = no warning, 1 = no signal warning; 0 when NSW is set OFF

- id: no_signal_error
  label: No Signal Error
  kind: action
  command: "SIT:NSE{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: no_signal_error_timing
  label: No Signal Error Timing
  kind: action
  command: "SIT:SET{minutes}"
  params:
    - name: minutes
      type: string
      description: "01-90"

- id: query_no_signal_error
  label: Query status: No Signal Error
  kind: query
  command: "QST:NSE"
  params: []
  # Reply: 0 = no error, 1 = no signal error; 0 when NSE is set OFF

- id: temperature_warning
  label: Temperature Warning
  kind: action
  command: "SIT:TPW{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = Off, 1 = On (auto reply QST:TO*)"

- id: query_temperature_warning
  label: Query status: Temperature warning
  kind: query
  command: "QST:TO"
  params: []
  # Reply: 0 = NORMAL-MODE, 1 = HIGH TEMPERATURE-MODE

# --- Others ---
- id: recall
  label: Recall
  kind: action
  command: "DDS"
  params: []

- id: display_id_name
  label: Display ID / Display name
  kind: action
  command: "DDS:DID"
  params: []

- id: audio_mute_options
  label: Audio Mute (Options menu)
  kind: action
  command: "AOC:{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]
      description: "0 = MUTE OFF, 1 = MUTE ON"

- id: osd_clear
  label: OSD Clear
  kind: action
  command: "VDO"
  params: []

- id: digital_zoom
  label: digital zoom
  kind: action
  command: "DZM:{on}{factor}{hpos}{vpos}"
  params:
    - name: on
      type: string
      values: ["0", "1"]
    - name: factor
      type: string
      values: ["1", "2", "3", "4"]
    - name: hpos
      type: string
      values: ["1", "2", "3", "4", "5"]
    - name: vpos
      type: string
      values: ["1", "2", "3", "4", "5"]

- id: off_timer
  label: Off Timer
  kind: action
  command: "ZOT:{minutes}"
  params:
    - name: minutes
      type: string
      description: "00-90"

- id: ump_next
  label: USB media player Skip to the next playback file
  kind: action
  command: "UMP:NXT"
  params: []

- id: ump_previous
  label: USB media player Skip to the previous playback file
  kind: action
  command: "UMP:PRE"
  params: []

- id: ump_replay
  label: USB media player Playback again from top of the file
  kind: action
  command: "UMP:RPY"
  params: []

- id: inquiry_signal_status
  label: Inquiry about Signal Status of input signal
  kind: query
  command: "QST:SGS"
  params: []
  # Reply: QST:SGS* 0=Valid signal, 1=No signal, 2=Unsupported signal

- id: inquiry_signal_frequency
  label: Inquiry about Signal Frequency of input signal
  kind: query
  command: "QFR"
  params: []
  # Reply: QFR:H***.** V***.**

- id: inquiry_signal_format
  label: Inquiry about Signal Format of input signal
  kind: query
  command: "QSF"
  params: []
  # Reply: QSF:<format> (max 20 chars)

- id: inquiry_dl_status_detail
  label: Inquiry about detail of DIGITAL LINK status
  kind: query
  command: "QST:DLD"
  params: []
  # Reply: QST:DLD<link><cable><hdmi><A><B><C><D><min><max>
  # link: 0/1/2/3; cable: 000-225 (<20m LAN); hdmi: 0/1/2; A-D: -00 to -99 per channel; min/max: -00 to -99

- id: auto_command_send_setting
  label: Auto Command Send Setting
  kind: action
  command: "RCM:{qss_on}{qss_stserr_on}"
  params:
    - name: qss_on
      type: string
      values: ["0", "1"]
      description: "0 = OFF, 1 = ON - QSS (QSS command)"
    - name: qss_stserr_on
      type: string
      values: ["0", "1"]
      description: "0 = OFF, 1 = ON - QSS:STSERR (QSS:STSERR)"

- id: inquiry_model_name
  label: Inquiry about Model Name
  kind: query
  command: "QMN"
  params: []
  # Reply: QMN:<size><F><17> (e.g. 70F17 = 70-inch FHD 2017)

- id: inquiry_model
  label: Inquiry about Model
  kind: query
  command: "QID"
  params: []
  # Reply: QID:<size>.<model>.<market>  e.g. 70.SF2H.J

- id: software_version_main
  label: Software Version Main MCU
  kind: query
  command: "QRV"
  params: []
  # Reply: QRV:<version>SF2H (e.g. 1.0000SF2H)

- id: software_version_sub
  label: Software Version Sub MCU
  kind: query
  command: "QRV:STB"
  params: []
  # Reply: QRV:STB<version>  e.g. 01.00

- id: software_version_eeprom
  label: Software Version EEPROM
  kind: query
  command: "QRV:EEP"
  params: []
  # Reply: QRV:EEP<version>  e.g. 01.00

- id: software_version_hdbaset_rx
  label: Software Version HDBaseT RX
  kind: query
  command: "QRV:HBT"
  params: []
  # Reply: QRV:HBT<version>  e.g. 30.90.000C

- id: serial_number
  label: Serial number
  kind: query
  command: "QSN"
  params: []
  # Reply: QSN:<serial> 9-15 ASCII chars (alnum upper + space + '-')

- id: lan_cloning_write_protect
  label: LAN data Cloning - Write protect
  kind: action
  command: "LCL:WRP{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1"]

- id: sos_history
  label: SOS History
  kind: query
  command: "QSS"
  params: []
  # Reply: QSS:<count>.<c1>.<c2>...<c10>   up to 10 entries, each 2 hex chars (00-FF)

- id: inquiry_sos_status
  label: Inquiry about SOS Status
  kind: query
  command: "QSS:STS"
  params: []
  # Reply: QSS:STS***  NON=no history, ERR=SOS generating, EXT=history exists

# --- Light ID Control ---
- id: lightid_mode
  label: LightID mode (Select PWM Mode)
  kind: action
  command: "LID:MOD{mode}"
  params:
    - name: mode
      type: string
      values: ["0", "1", "2"]
      description: "0 = Main CPU Control (LightID OFF), 1 = External Control, 2 = Internal ID"

- id: lightid_stop
  label: Stop LightID
  kind: action
  command: "LID:STP"
  params: []

- id: lightid_backlight_blt
  label: BackLight Control (LID:BLT)
  kind: action
  command: "LID:BLT{duty}"
  params:
    - name: duty
      type: string
      values: ["1", "2", "3"]
      description: "1 = Low, 2 = Middle, 3 = High. Not available when LightID mode is Off."

- id: lightid_backlight_blc
  label: BackLight Control (LID:BLC)
  kind: action
  command: "LID:BLC{duty}"
  params:
    - name: duty
      type: string
      values: ["1", "2", "3"]
      description: "1 = Low, 2 = Middle, 3 = High. Not available when LightID mode is Off. Equivalent to LID:BLT/QLI:BLT."

- id: lightid_backlight_blt_query
  label: BackLight Control (LID:BLT) query
  kind: query
  command: "QLI:BLT"
  params: []

- id: lightid_backlight_blc_query
  label: BackLight Control (LID:BLC) query
  kind: query
  command: "QLI:BLC"
  params: []

- id: lightid_mode_query
  label: LightID mode query
  kind: query
  command: "QLI:MOD"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, on]
  # From QPW:0 / QPW:1

- id: audio_mute_state
  type: enum
  values: [off, on]
  # From QAM:0 / QAM:1

- id: video_mute_state
  type: enum
  values: [off, on]
  # From QVM:0 / QVM:1

- id: current_input
  type: string
  values: [HM1, HM2, DL1, DV1, PC1, VD1, UD1, MV1]
  # From QMI:***

- id: current_aspect
  type: string
  values: [FULL, NORM, ZOOM, ZOM2]
  # From QAS

- id: volume_level
  type: integer
  range: [0, 100]
  # From QAV:***

- id: picture_mode
  type: string
  values: [VIV, NAT, STD, SUV, GRH, DCM]
  # From QPC:MEN

- id: backlight_level
  type: integer
  range: [0, 100]
  # From QPC:BLT

- id: no_signal_warning_active
  type: boolean
  # From QST:NSW (1 = warning, 0 = none; 0 when NSW setting is OFF)

- id: no_signal_error_active
  type: boolean
  # From QST:NSE (1 = error, 0 = none; 0 when NSE setting is OFF)

- id: temperature_warning_active
  type: boolean
  # From QST:TO (1 = HIGH TEMPERATURE, 0 = NORMAL)

- id: signal_status
  type: enum
  values: [valid, no_signal, unsupported]
  # From QST:SGS

- id: signal_frequency
  type: object
  # From QFR:H***.** V***.**
  fields: [horizontal_hz, vertical_hz]

- id: signal_format
  type: string
  # From QSF:<format> (max 20 chars)

- id: digital_link_status
  type: object
  # From QSU:DLS - see action id digital_link_status for field layout
```

## Variables
```yaml
# No persistent settings need be exposed beyond the action set; commands carry
# both set and query forms (S*/Q* pairs).
```

## Events
```yaml
# The source describes these unsolicited notifications on the serial/LAN
# control channel when the corresponding auto-reply features are enabled.
# Enable flags: SIT:NSW (No Signal Warning), SIT:NSE (No Signal Error),
# SIT:TPW (Temperature Warning), and Auto Command Send Setting (RCM).
- id: no_signal_warning
  message: "QST:NSW*"
  description: "Sent automatically when No Signal Warning is ON and condition occurs"
  enabled_by: SIT:NSW

- id: no_signal_error
  message: "QST:NSE*"
  description: "Sent automatically when No Signal Error is ON and condition occurs"
  enabled_by: SIT:NSE

- id: temperature_warning
  message: "QST:TO*"
  description: "Sent automatically when Temperature Warning is ON"
  enabled_by: SIT:TPW

- id: sos_history_change
  message: "QSS / QSS:STSERR"
  description: "Auto-sent when RCM (Auto Command Send Setting) is enabled"
  enabled_by: RCM

# In standby (power off), the unit only responds to PON and QPW.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step command sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements stated in the supplied command-list document. The
# full operating manual may contain such sections; this refined source only
# contains the command reference.
```

## Notes
- Serial wire format: 9600 bps, 8N1, no flow control, straight cable. Frame every command as `<STX>3-byte-CMD[:params]<ETX>` (STX = 0x02, ETX = 0x03). STX-only framing is mandatory — the source shows that for `PON`, the on-wire bytes are 02 50 4F 4E 03, and for `VPC:085` the bytes are 02 56 50 43 3A 30 38 35 03 (i.e. parameter strings are case-sensitive ASCII).
- Standby behavior: when the display is in standby it responds to `PON` and `QPW` only; the source explicitly notes this.
- Wait for response: the source warns to wait for the response of one command before sending the next, otherwise the unit may reply `ER401`.
- Multiple commands may be batched only after a successful reply; `ER401` indicates an incorrect command.
- The `Read user image` operation (Image settings) deliberately returns `ER401` to the computer.
- LAN control (Protocol 1 = `NTCONTROL 0` header + payload, Protocol 2 = `NTCONTROL 1` header + payload, both followed by `<STX>...<ETX>`). The source does not state the full on-wire bytes for `NTCONTROL 0/1` beyond the header table; treat 0x4E 0x54 0x43 0x4F 0x4E 0x54 0x52 0x4F 0x4C 0x20 0x30 0x0D (and `...31 0x0D` for protocol 2) as the typical 12-byte header, but verify against the Panasonic web-control reference (https://panasonic.net/cns/prodisplays/) before production use.
- LAN auth: when [Options] - [LAN control protocol] is set to Protocol 1 and a WEB control admin password is configured, the host must obtain a random string from the display, compute MD5 of `zzzzzzzzyyyyy` (8-byte random + password) and send that as part of the payload. In "Non protect mode" (no password set), the host can send commands directly.
- LAN auth (Protocol 2) hashes `xxxxxx:yyyyy:zzzzzzzz` (admin user name : password : 8-byte random) with MD5.
- Default LAN port: 1024, but `SSU:LCP` allows reconfiguring within the source-listed ranges. Restrictions: ports 04352, 10000, 20000, 27250, and 41794 are excluded.
- Display ID + Serial ID: to address a single display on a daisy chain, set [Options] - [Serial ID function] ON and prefix commands with `RAD:<NNN>;` (or `AD94;RAD:<NNN>;`). With Display ID=0 the unit accepts any serial ID but ignores inquiry commands; serial ID `000` is accepted by all units but again blocks inquiries. If Display ID is non-zero, responses are sent only when the Display ID matches the serial ID.
- DIGITAL LINK mode (`SSU:DLM`) supports Auto, DIGITAL LINK, and Ethernet. Detail inquiries (`QSU:DLS` and `QST:DLD`) report per-channel signal quality and HDMI/HDCP state.
- Source typo note: the LAN Setup - Network Address parameter table appears to list 4 subnet mask bytes labelled "1st / 2nd / 1st / 2nd"; treat as the conventional 4-byte subnet mask (bytes 1-4).
- Image rotation (`SSU:IMR`) is Off / 180°; it does not support arbitrary angles.
- Memory viewer (`SMS:*`) and USB media player (`SUS:*`/`UMP:*`) commands are independent and operate on different content sources.
- LightID commands require [LightID mode] (`LID:MOD`) to be set to 1 (External) or 2 (Internal); the backlight duty commands (`LID:BLT` / `LID:BLC`) are unavailable in mode 0.

<!-- UNRESOLVED: firmware compatibility version range, voltage/current draw,
weight, dimensions, maximum cable lengths beyond the 20 m Digital Link LAN
guidance, supported DIGITAL LINK switch models, full LAN control byte layout
(headers, terminators), exact checksum behavior if any. -->

## Provenance

```yaml
source_domains:
  - docs.connect.panasonic.com
  - eu.connect.panasonic.com
  - manualowl.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/SF2H_SerialCommandList.pdf
  - https://docs.connect.panasonic.com/prodisplays/support/rs232c_commandlist.html
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LAN_Protocol_exp.pdf
  - https://eu.connect.panasonic.com/sites/default/files/media/document/2017-12/sf2huw_manual_en.pdf
  - https://www.manualowl.com/m/Panasonic/TH-80SF2H/Manual/515989
retrieved_at: 2026-05-18T03:13:52.321Z
last_checked_at: 2026-06-02T17:23:41.332Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:41.332Z
matched_actions: 218
action_count: 218
confidence: medium
summary: "All 218 spec actions match source wire tokens with correct shapes; AVL/AMT/VMT colon-separator fixes and changing_mode polarity (2=High,1=Normal) confirmed; transport params (9600 8N1, port 1024, MD5 auth) all verified. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Exact LAN port not explicitly pinned in protocol section; \"Default is 1024\" stated for the WEB control admin port. Treat 1024 as the default, but the source also lists a user-configurable LAN Setup - Port Number (1024-4351, 4353-9999, 10001-19999, 20001-27249, 27251-41793, 41795-65535)."
- "no explicit multi-step command sequences described in source"
- "no explicit safety warnings, interlock procedures, or power-on"
- "firmware compatibility version range, voltage/current draw,"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
