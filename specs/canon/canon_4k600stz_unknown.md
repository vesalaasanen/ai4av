---
spec_id: admin/canon-4k600stz
schema_version: ai4av-public-spec-v1
revision: 2
title: "Canon 4K600STZ Control Spec"
manufacturer: Canon
model_family: 4K600STZ
aliases: []
compatible_with:
  manufacturers:
    - Canon
  models:
    - 4K600STZ
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - canon.a.bigcontent.io
  - cdn.marketing-cloud.io
  - manualsnet.com
  - usa.canon.com
source_urls:
  - https://canon.a.bigcontent.io/v1/static/636349309990882175PX_xeed-4k600stz_02
  - https://cdn.marketing-cloud.io/wp-content/canon_rebranding/uploads/2025/03/24155528/XC_Control_Protocol_specification_008.pdf
  - https://manualsnet.com/canon/4k600stz
  - https://www.usa.canon.com/support/user-manual-library
retrieved_at: 2026-05-14T13:46:09.968Z
last_checked_at: 2026-07-21T21:41:50.024Z
generated_at: 2026-07-21T21:41:50.024Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no settable parameters distinct from actions identified in source"
  - "no multi-step sequences explicitly described in source"
  - "MEMF/MEMG/MEMS parameter values not enumerated in source"
  - "NRMPG parameter values — only MIDDLE shown as example but full set not listed"
  - "HDR_RANGE valid value range not stated"
  - "LIGHTLV range varies by OPMODE but exact boundaries for all modes not fully confirmed"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-07-21T21:41:50.024Z
  matched_actions: 80
  action_count: 80
  confidence: medium
  summary: "All 80 spec actions map 1:1 to the source's 79 command rows (POWER split into ON/OFF) with matching shapes and transport. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-12
---

# Canon 4K600STZ Control Spec

## Summary

Canon 4K600STZ is a 4K laser projector controllable via RS-232C serial or LAN (TCP/IP). The command protocol uses ASCII text terminated by CR, with set commands (`CMD=VALUE`), reference queries (`GET=CMD`), and typed responses (`i:OK`, `g:CMD=VALUE`, `e:CODE DESCRIPTION`). 79 commands cover power, input routing, image adjustment, audio, lens control, and diagnostics.

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 33336
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred from POWER=ON/OFF commands
- queryable    # inferred from GET= query commands
- routable     # inferred from INPUT command
- levelable    # inferred from AVOL, BRI, CONT, HUE, SAT, SHARP, GAMMA, LIGHTLV commands
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: POWER=ON
  response: i:OK
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: POWER=OFF
  response: i:OK
  params: []

- id: set_6axis_adj
  label: 6-Axis Color Adjustment
  kind: action
  command: "6AXADJ={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [ON, OFF]
      description: Enable or disable 6-axis color adjustment

- id: set_6axis_r
  label: 6-Axis Red Adjustment
  kind: action
  command: "6AXR={hue},{saturation},{brightness}"
  response: i:OK
  params:
    - name: hue
      type: integer
      min: -20
      max: 20
      description: Red hue
    - name: saturation
      type: integer
      min: -20
      max: 20
      description: Red saturation
    - name: brightness
      type: integer
      min: -20
      max: 20
      description: Red brightness

- id: set_6axis_g
  label: 6-Axis Green Adjustment
  kind: action
  command: "6AXG={hue},{saturation},{brightness}"
  response: i:OK
  params:
    - name: hue
      type: integer
      min: -20
      max: 20
    - name: saturation
      type: integer
      min: -20
      max: 20
    - name: brightness
      type: integer
      min: -20
      max: 20

- id: set_6axis_b
  label: 6-Axis Blue Adjustment
  kind: action
  command: "6AXB={hue},{saturation},{brightness}"
  response: i:OK
  params:
    - name: hue
      type: integer
      min: -20
      max: 20
    - name: saturation
      type: integer
      min: -20
      max: 20
    - name: brightness
      type: integer
      min: -20
      max: 20

- id: set_6axis_c
  label: 6-Axis Cyan Adjustment
  kind: action
  command: "6AXC={hue},{saturation},{brightness}"
  response: i:OK
  params:
    - name: hue
      type: integer
      min: -20
      max: 20
    - name: saturation
      type: integer
      min: -20
      max: 20
    - name: brightness
      type: integer
      min: -20
      max: 20

- id: set_6axis_m
  label: 6-Axis Magenta Adjustment
  kind: action
  command: "6AXM={hue},{saturation},{brightness}"
  response: i:OK
  params:
    - name: hue
      type: integer
      min: -20
      max: 20
    - name: saturation
      type: integer
      min: -20
      max: 20
    - name: brightness
      type: integer
      min: -20
      max: 20

- id: set_6axis_y
  label: 6-Axis Yellow Adjustment
  kind: action
  command: "6AXY={hue},{saturation},{brightness}"
  response: i:OK
  params:
    - name: hue
      type: integer
      min: -20
      max: 20
    - name: saturation
      type: integer
      min: -20
      max: 20
    - name: brightness
      type: integer
      min: -20
      max: 20

- id: set_ambient_adj
  label: Ambient Light Correction
  kind: action
  command: "AMBADJ={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [ON, OFF]

- id: set_ambient_level
  label: Ambient Light Level
  kind: action
  command: "AMBLEVEL={level}"
  response: i:OK
  params:
    - name: level
      type: enum
      values: [WEAK, STRONG]

- id: set_ambient_type
  label: Ambient Light Type
  kind: action
  command: "AMBTYPE={type}"
  response: i:OK
  params:
    - name: type
      type: enum
      values: [TG, FL]
      description: TG=tungsten, FL=fluorescent

- id: set_audio_sel_dvi1
  label: DVI-1 Audio Terminal Selection
  kind: action
  command: "ASELD1={source}"
  response: i:OK
  params:
    - name: source
      type: enum
      values: ["1", OFF]
      description: "1=Audio In 1, OFF=off"

- id: set_audio_sel_dvi2
  label: DVI-2 Audio Terminal Selection
  kind: action
  command: "ASELD2={source}"
  response: i:OK
  params:
    - name: source
      type: enum
      values: ["1", OFF]

- id: set_audio_sel_dvi3
  label: DVI-3 Audio Terminal Selection
  kind: action
  command: "ASELD3={source}"
  response: i:OK
  params:
    - name: source
      type: enum
      values: ["1"]

- id: set_audio_sel_dvi4
  label: DVI-4 Audio Terminal Selection
  kind: action
  command: "ASELD4={source}"
  response: i:OK
  params:
    - name: source
      type: enum
      values: ["1"]

- id: set_audio_sel_dvix2
  label: DVI 1x2 Audio Terminal Selection
  kind: action
  command: "ASELDX2={source}"
  response: i:OK
  params:
    - name: source
      type: enum
      values: ["1"]

- id: set_audio_sel_dvix4
  label: DVI 2x2/1x4 Audio Terminal Selection
  kind: action
  command: "ASELDX4={source}"
  response: i:OK
  params:
    - name: source
      type: enum
      values: ["1"]

- id: set_audio_sel_hdmi1
  label: HDMI-1 Audio Terminal Selection
  kind: action
  command: "ASELH1={source}"
  response: i:OK
  params:
    - name: source
      type: enum
      values: [H1, "1"]
      description: "H1=HDMI1 audio, 1=Audio In 1"

- id: set_audio_sel_hdmi2
  label: HDMI-2 Audio Terminal Selection
  kind: action
  command: "ASELH2={source}"
  response: i:OK
  params:
    - name: source
      type: enum
      values: [H2, OFF]

- id: set_audio_sel_hdmix2
  label: HDMIx2 Audio Terminal Selection
  kind: action
  command: "ASELHX2={source}"
  response: i:OK
  params:
    - name: source
      type: enum
      values: [H1, H2, "1"]

- id: set_aspect
  label: Aspect Ratio
  kind: action
  command: "ASPECT={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [AUTO, TRUE]

- id: set_volume
  label: Audio Volume
  kind: action
  command: "AVOL={level}"
  response: i:OK
  params:
    - name: level
      type: integer
      min: 0
      max: 20

- id: set_blank
  label: Screen Blank
  kind: action
  command: "BLANK={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [ON, OFF]

- id: set_brightness
  label: Brightness
  kind: action
  command: "BRI={value}"
  response: i:OK
  params:
    - name: value
      type: integer
      min: -20
      max: 20

- id: set_colorimetry
  label: Colorimetry
  kind: action
  command: "COLMTR={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [AUTO, BT2020, BT709]

- id: set_color_temp
  label: Color Temperature
  kind: action
  command: "COLOR_TEMP={value}"
  response: i:OK
  params:
    - name: value
      type: integer
      min: -17
      max: 21

- id: set_contrast
  label: Contrast
  kind: action
  command: "CONT={value}"
  response: i:OK
  params:
    - name: value
      type: integer
      min: -20
      max: 20

- id: set_date_format
  label: Date Display Format
  kind: action
  command: "DATE_FORMAT={format}"
  response: i:OK
  params:
    - name: format
      type: enum
      values: [YMD, MDY, DMY]

- id: set_date_time
  label: Date/Time Setting
  kind: action
  command: "DATE_TIME={year},{month},{day},{hour},{minute},{second}"
  response: i:OK
  params:
    - name: year
      type: integer
    - name: month
      type: integer
    - name: day
      type: integer
    - name: hour
      type: integer
    - name: minute
      type: integer
    - name: second
      type: integer

- id: set_dynamic_contrast
  label: Dynamic Contrast
  kind: action
  command: "DCONT={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [OFF, MODE1, MODE2, MODE3]

- id: set_dynamic_gamma
  label: Dynamic Gamma
  kind: action
  command: "DGAMMA={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [WEAK]

- id: set_fine_gamma_r
  label: Fine Gamma R
  kind: action
  command: "FINE_GAMMA_R={p1},{p2},...,{pn}"
  response: i:OK
  params:
    - name: points
      type: string
      description: Comma-separated values, 0-1024 each

- id: set_fine_gamma_g
  label: Fine Gamma G
  kind: action
  command: "FINE_GAMMA_G={p1},{p2},...,{pn}"
  response: i:OK
  params:
    - name: points
      type: string
      description: Comma-separated values, 0-1024 each

- id: set_fine_gamma_b
  label: Fine Gamma B
  kind: action
  command: "FINE_GAMMA_B={p1},{p2},...,{pn}"
  response: i:OK
  params:
    - name: points
      type: string
      description: Comma-separated values, 0-1024 each

- id: set_filter_warning
  label: Air Filter Warning
  kind: action
  command: "FLTWRN={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [ON, OFF]

- id: set_freeze
  label: Screen Freeze
  kind: action
  command: "FREEZE={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [ON, OFF]

- id: set_gamma
  label: Gamma Adjustment
  kind: action
  command: "GAMMA={value}"
  response: i:OK
  params:
    - name: value
      type: integer
      min: -10
      max: 10

- id: set_hdmi_edid
  label: HDMI EDID Mode
  kind: action
  command: "HDMI{port}_EDID={mode}"
  response: i:OK
  params:
    - name: port
      type: integer
      description: HDMI port number (1 or 2)
    - name: mode
      type: enum
      values: [WIDE, HCOMP]
      description: "WIDE=4K 60Hz, HCOMP=high compatibility"

- id: set_hdr
  label: HDR Setting
  kind: action
  command: "HDR={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [AUTO, OFF, ON]

- id: set_hdr_range
  label: HDR Range
  kind: action
  command: "HDR_RANGE={value}"
  response: i:OK
  params:
    - name: value
      type: integer

- id: set_high_temp_display
  label: High Temperature Caution Display
  kind: action
  command: "HTMPINF={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [ON]

- id: set_hue
  label: Hue
  kind: action
  command: "HUE={value}"
  response: i:OK
  params:
    - name: value
      type: integer
      min: -20
      max: 20

- id: set_image_mode
  label: Image Mode
  kind: action
  command: "IMAGE={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [STANDARD, PRESENTATION, PHOTO_SRGB, DCM_SIM, DYNAMIC, VIDEO, USER_1, USER_2, USER_3]

- id: set_image_flip
  label: Flip Display
  kind: action
  command: "IMAGEFLIP={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [NONE, CEILING, REAR, REAR_CEILING]

- id: set_input
  label: Input Signal Selection
  kind: action
  command: "INPUT={source}"
  response: i:OK
  params:
    - name: source
      type: enum
      values: [HDMI1, HDMI2, HDMI1X2, D-RGB1, D-RGB2, D-RGB3, D-RGB4, D-RGB1X2, D-RGB2X2, D-RGB1X4]

- id: set_iris
  label: Iris Setting
  kind: action
  command: "IRIS={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [OPEN, CLOSE1, CLOSE2, CLOSE3]

- id: set_key_repeat
  label: Key Repeat
  kind: action
  command: "KREP={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [ON, OFF]

- id: set_light_mode
  label: Light Source Mode
  kind: action
  command: "LIGHT={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [NORMAL, SILENT1, SILENT2, CUSTOM]

- id: set_light_level
  label: Light Level
  kind: action
  command: "LIGHTLV={value}"
  response: i:OK
  params:
    - name: value
      type: integer
      description: "Setting value multiplied by 10 (e.g. 400 = 40.0). Range varies by operation mode: Normal 200-1000, Fixed brightness 200-640, Longduration 1 200-640, Longduration 2 200-400"

- id: set_lens_position_load
  label: Lens Position Load
  kind: action
  command: "LPOSLD={position}"
  response: i:OK
  params:
    - name: position
      type: enum
      values: ["1", "2", "3"]

- id: set_main_panel
  label: Unit Control Panel Emulation
  kind: action
  command: "MAIN={button}"
  response: i:OK
  params:
    - name: button
      type: enum
      values: [POWER, POWER_OFF, MENU, INPUT, AUTOPC, KEYSTONE, UP, "UP+REP", DOWN, "DOWN+REP", LEFT, "LEFT+REP", RIGHT, "RIGHT+REP", OK]
      description: "+REP = button press start; send *-REP to end press"

- id: set_memory_color_flesh
  label: Memory Color Adjustment (Flesh)
  kind: action
  command: "MEMF={value}"
  response: i:OK
  params:
    - name: value
      type: string

- id: set_memory_color_green
  label: Memory Color Adjustment (Green)
  kind: action
  command: "MEMG={value}"
  response: i:OK
  params:
    - name: value
      type: string

- id: set_memory_color_sky
  label: Memory Color Adjustment (Sky)
  kind: action
  command: "MEMS={value}"
  response: i:OK
  params:
    - name: value
      type: string

- id: set_menu_rotation
  label: Menu Rotation
  kind: action
  command: "MENU_RT={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [AUTO, NONE, 90L, 90R]

- id: set_mute
  label: Audio Mute
  kind: action
  command: "MUTE={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [ON, OFF]

- id: set_noise_reduction
  label: Random Noise Reduction
  kind: action
  command: "NR={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [MIDDLE]

- id: set_mpeg_noise_reduction
  label: MPEG Noise Reduction
  kind: action
  command: "NRMPG={mode}"
  response: i:OK
  params:
    - name: mode
      type: string

- id: set_operation_mode
  label: Operation Mode
  kind: action
  command: "OPMODE={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [NORMAL, CONST, LONG1, LONG2]
      description: "CONST=Fixed brightness, LONG1=Longduration 1, LONG2=Longduration 2"

- id: set_quick_start
  label: High-Speed Start
  kind: action
  command: "QSTRT={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [ON, OFF]

- id: set_remote_control
  label: Remote Control Emulation
  kind: action
  command: "RC={button}"
  response: i:OK
  params:
    - name: button
      type: enum
      values: [POWER, POWER_OFF, MENU, EXIT, INPUT, DPC, APC1, APC2, HDMI, COMP, ASPECT, AUTOPC, UP, "UP+REP", DOWN, "DOWN+REP", LEFT, "LEFT+REP", RIGHT, "RIGHT+REP", OK, FOCUS, ZOOM, SHIFT, TPTN, KEYSTONE, NUM_0, NUM_1, NUM_2, NUM_3, NUM_4, NUM_5, NUM_6, NUM_7, NUM_8, NUM_9, DZOOM_P, "DZOOM_P+REP", DZOOM_M, "DZOOM_M+REP", VOL_P, "VOL_P+REP", VOL_M, "VOL_M+REP", MUTE, FN, IMAGE, FREEZE, BLANK, GAMMA, SPLIT, ECO]
      description: "+REP = button press start; send *-REP to end press"

- id: set_rgb_gain
  label: RGB Gain Adjustment
  kind: action
  command: "RGBGAIN={r},{g},{b}"
  response: i:OK
  params:
    - name: r
      type: integer
      min: -60
      max: 60
    - name: g
      type: integer
      min: -60
      max: 60
    - name: b
      type: integer
      min: -60
      max: 60

- id: set_rgb_offset
  label: RGB Offset Adjustment
  kind: action
  command: "RGBOFFSET={r},{g},{b}"
  response: i:OK
  params:
    - name: r
      type: integer
      min: -60
      max: 60
    - name: g
      type: integer
      min: -60
      max: 60
    - name: b
      type: integer
      min: -60
      max: 60

- id: set_saturation
  label: Color Saturation
  kind: action
  command: "SAT={value}"
  response: i:OK
  params:
    - name: value
      type: integer
      min: -20
      max: 20

- id: set_save_image_profile
  label: Save User Image Profile
  kind: action
  command: "SAVEIMGPROF={target}"
  response: i:OK
  params:
    - name: target
      type: enum
      values: [USER_1, USER_2, USER_3, DEL_ALL]

- id: set_sharpness
  label: Sharpness
  kind: action
  command: "SHARP={value}"
  response: i:OK
  params:
    - name: value
      type: integer
      min: -10
      max: 10

- id: set_signal_message
  label: Input Status Display
  kind: action
  command: "SIGMSG={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [ON, OFF]

- id: set_sntp
  label: SNTP Setting
  kind: action
  command: "SNTP={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [OFF, IPV4, IPV6]

- id: set_test_pattern
  label: Test Pattern
  kind: action
  command: "TPTN={pattern}"
  response: i:OK
  params:
    - name: pattern
      type: enum
      values: [CB1, SSH1, SSH2, SSH3, SSV1, SSV2, SSV3, RTF1, RTF2, RTF3, RTF4, RTH1, RTH2, RTH3, RTH4, SSC1, SSC2, CKR1, CKR2, MUL1, MUL2, CHR1, FCS1, BDR1, CRS1, CRS2, CRS3, DCM1, OFF]

- id: set_trigger_out
  label: Trigger Out Setting
  kind: action
  command: "TRGOUT={mode}"
  response: i:OK
  params:
    - name: mode
      type: enum
      values: [OFF, POWER]

# --- Query-only commands (reference/inquiry), source rows 26,32,61,63,68,73,74,76,77 ---

- id: query_command_version
  label: User Command Version Inquiry
  kind: query
  command: GET=COMVER
  response: 'g:COMVER="<version>"'
  params: []

- id: query_error_info
  label: Error Information Inquiry
  kind: query
  command: GET=ERR
  response: g:ERR=<ErrorID>
  params: []

- id: query_usage_time
  label: Projector Usage Time Inquiry
  kind: query
  command: GET=PJUSGT
  response: g:PJUSGT=<hours>
  params: []

- id: query_product_code
  label: Product Name Inquiry
  kind: query
  command: GET=PRODCODE
  response: 'g:PRODCODE="<name>"'
  params: []

- id: query_firmware_version
  label: Firmware Version Inquiry
  kind: query
  command: GET=ROMVER
  response: 'g:ROMVER="<version>"'
  params: []

- id: query_signal_info
  label: Displayed Signal Information Inquiry
  kind: query
  command: GET=SIGNAL_INFO
  response: 'g:SIGNAL_INFO="<info>"'
  params: []

- id: query_signal_status
  label: Signal Detection Inquiry
  kind: query
  command: GET=SIGNALSTATUS
  response: g:SIGNALSTATUS=<status>
  params: []

- id: query_temperature
  label: Temperature Sensor Value Inquiry
  kind: query
  command: GET=TEMP
  response: g:TEMP=<count>,<value1>,...,<valueN>
  params: []

- id: query_time_zone
  label: Time Zone Setting Reference
  kind: query
  command: GET=TIME_ZONE
  response: 'g:TIME_ZONE="<zone>"'
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  query: GET=POWER
  response_prefix: "g:POWER="
  type: enum
  values: [OFF, OFF2ON, ON, ON2PMM, PMM, PMM2ON, ON2OFF]

- id: 6axis_adj_state
  label: 6-Axis Adjustment State
  query: GET=6AXADJ
  response_prefix: "g:6AXADJ="
  type: enum
  values: [ON, OFF]

- id: 6axis_r_values
  label: 6-Axis Red Values
  query: GET=6AXR
  response_prefix: "g:6AXR="
  type: string
  description: "Comma-separated hue,saturation,brightness (-20 to 20)"

- id: 6axis_g_values
  label: 6-Axis Green Values
  query: GET=6AXG
  response_prefix: "g:6AXG="
  type: string

- id: 6axis_b_values
  label: 6-Axis Blue Values
  query: GET=6AXB
  response_prefix: "g:6AXB="
  type: string

- id: 6axis_c_values
  label: 6-Axis Cyan Values
  query: GET=6AXC
  response_prefix: "g:6AXC="
  type: string

- id: 6axis_m_values
  label: 6-Axis Magenta Values
  query: GET=6AXM
  response_prefix: "g:6AXM="
  type: string

- id: 6axis_y_values
  label: 6-Axis Yellow Values
  query: GET=6AXY
  response_prefix: "g:6AXY="
  type: string

- id: ambient_adj_state
  label: Ambient Light Correction State
  query: GET=AMBADJ
  response_prefix: "g:AMBADJ="
  type: enum
  values: [ON, OFF]

- id: ambient_level
  label: Ambient Light Level
  query: GET=AMBLEVEL
  response_prefix: "g:AMBLEVEL="
  type: enum
  values: [WEAK, STRONG]

- id: ambient_type
  label: Ambient Light Type
  query: GET=AMBTYPE
  response_prefix: "g:AMBTYPE="
  type: enum
  values: [TG, FL]

- id: audio_sel_dvi1
  label: DVI-1 Audio Selection
  query: GET=ASELD1
  response_prefix: "g:ASELD1="
  type: string

- id: audio_sel_dvi2
  label: DVI-2 Audio Selection
  query: GET=ASELD2
  response_prefix: "g:ASELD2="
  type: string

- id: audio_sel_dvi3
  label: DVI-3 Audio Selection
  query: GET=ASELD3
  response_prefix: "g:ASELD3="
  type: string

- id: audio_sel_dvi4
  label: DVI-4 Audio Selection
  query: GET=ASELD4
  response_prefix: "g:ASELD4="
  type: string

- id: audio_sel_dvix2
  label: DVI 1x2 Audio Selection
  query: GET=ASELDX2
  response_prefix: "g:ASELDX2="
  type: string

- id: audio_sel_dvix4
  label: DVI 2x2/1x4 Audio Selection
  query: GET=ASELDX4
  response_prefix: "g:ASELDX4="
  type: string

- id: audio_sel_hdmi1
  label: HDMI-1 Audio Selection
  query: GET=ASELH1
  response_prefix: "g:ASELH1="
  type: string

- id: audio_sel_hdmi2
  label: HDMI-2 Audio Selection
  query: GET=ASELH2
  response_prefix: "g:ASELH2="
  type: string

- id: audio_sel_hdmix2
  label: HDMIx2 Audio Selection
  query: GET=ASELHX2
  response_prefix: "g:ASELHX2="
  type: string

- id: aspect
  label: Aspect Ratio
  query: GET=ASPECT
  response_prefix: "g:ASPECT="
  type: enum
  values: [AUTO, TRUE]

- id: volume
  label: Audio Volume
  query: GET=AVOL
  response_prefix: "g:AVOL="
  type: integer
  min: 0
  max: 20

- id: blank_state
  label: Blank State
  query: GET=BLANK
  response_prefix: "g:BLANK="
  type: enum
  values: [ON, OFF]

- id: brightness
  label: Brightness
  query: GET=BRI
  response_prefix: "g:BRI="
  type: integer
  min: -20
  max: 20

- id: colorimetry
  label: Colorimetry
  query: GET=COLMTR
  response_prefix: "g:COLMTR="
  type: enum
  values: [AUTO, BT2020, BT709]

- id: color_temp
  label: Color Temperature
  query: GET=COLOR_TEMP
  response_prefix: "g:COLOR_TEMP="
  type: integer
  min: -17
  max: 21

- id: command_version
  label: User Command Version
  query: GET=COMVER
  response_prefix: "g:COMVER="
  type: string
  description: 'Version string e.g. "01.1234"'

- id: contrast
  label: Contrast
  query: GET=CONT
  response_prefix: "g:CONT="
  type: integer
  min: -20
  max: 20

- id: date_format
  label: Date Display Format
  query: GET=DATE_FORMAT
  response_prefix: "g:DATE_FORMAT="
  type: enum
  values: [YMD, MDY, DMY]

- id: date_time
  label: Date/Time
  query: GET=DATE_TIME
  response_prefix: "g:DATE_TIME="
  type: string
  description: "Comma-separated year,month,day,hour,minute,second"

- id: dynamic_contrast
  label: Dynamic Contrast
  query: GET=DCONT
  response_prefix: "g:DCONT="
  type: enum
  values: [OFF, MODE1, MODE2, MODE3]

- id: dynamic_gamma
  label: Dynamic Gamma
  query: GET=DGAMMA
  response_prefix: "g:DGAMMA="
  type: enum
  values: [WEAK]

- id: error_status
  label: Error Status
  query: GET=ERR
  response_prefix: "g:ERR="
  type: enum
  values: [NO_ERROR, ABNORMAL_TEMPERATURE, FAULTY_LIGHT, FAULTY_COOLING_FAN, FAULTY_POWER_SUPPLY, FAULTY_AIR_FILTER, FAULTY_POWER_ZOOM, FAULTY_POWER_FOCUS, FAULTY_POWER_LENS_SHIFT, FAULTY_LENS_SHIFT_CONNECTOR]

- id: fine_gamma_r
  label: Fine Gamma R
  query: GET=FINE_GAMMA_R
  response_prefix: "g:FINE_GAMMA_R="
  type: string
  description: "Comma-separated values 0-1024"

- id: fine_gamma_g
  label: Fine Gamma G
  query: GET=FINE_GAMMA_G
  response_prefix: "g:FINE_GAMMA_G="
  type: string

- id: fine_gamma_b
  label: Fine Gamma B
  query: GET=FINE_GAMMA_B
  response_prefix: "g:FINE_GAMMA_B="
  type: string

- id: filter_warning
  label: Air Filter Warning
  query: GET=FLTWRN
  response_prefix: "g:FLTWRN="
  type: enum
  values: [ON, OFF]

- id: freeze_state
  label: Freeze State
  query: GET=FREEZE
  response_prefix: "g:FREEZE="
  type: enum
  values: [ON, OFF]

- id: gamma
  label: Gamma Adjustment
  query: GET=GAMMA
  response_prefix: "g:GAMMA="
  type: integer
  min: -10
  max: 10

- id: hdmi_edid
  label: HDMI EDID Mode
  query: "GET=HDMI{port}_EDID"
  response_prefix: "g:HDMI"
  type: enum
  values: [WIDE, HCOMP]

- id: hdr_state
  label: HDR Setting
  query: GET=HDR
  response_prefix: "g:HDR="
  type: enum
  values: [AUTO, OFF, ON]

- id: hdr_range
  label: HDR Range
  query: GET=HDR_RANGE
  response_prefix: "g:HDR_RANGE="
  type: integer

- id: high_temp_display
  label: High Temperature Caution Display
  query: GET=HTMPINF
  response_prefix: "g:HTMPINF="
  type: enum
  values: [ON]

- id: hue
  label: Hue
  query: GET=HUE
  response_prefix: "g:HUE="
  type: integer
  min: -20
  max: 20

- id: image_mode
  label: Image Mode
  query: GET=IMAGE
  response_prefix: "g:IMAGE="
  type: enum
  values: [STANDARD, PRESENTATION, PHOTO_SRGB, DCM_SIM, DYNAMIC, VIDEO, USER_1, USER_2, USER_3]

- id: image_flip
  label: Image Flip
  query: GET=IMAGEFLIP
  response_prefix: "g:IMAGEFLIP="
  type: enum
  values: [NONE, CEILING, REAR, REAR_CEILING]

- id: input_source
  label: Input Source
  query: GET=INPUT
  response_prefix: "g:INPUT="
  type: enum
  values: [HDMI1, HDMI2, HDMI1X2, D-RGB1, D-RGB2, D-RGB3, D-RGB4, D-RGB1X2, D-RGB2X2, D-RGB1X4]

- id: iris
  label: Iris Setting
  query: GET=IRIS
  response_prefix: "g:IRIS="
  type: enum
  values: [OPEN, CLOSE1, CLOSE2, CLOSE3]

- id: key_repeat
  label: Key Repeat
  query: GET=KREP
  response_prefix: "g:KREP="
  type: enum
  values: [ON, OFF]

- id: light_mode
  label: Light Source Mode
  query: GET=LIGHT
  response_prefix: "g:LIGHT="
  type: enum
  values: [NORMAL, SILENT1, SILENT2, CUSTOM]

- id: light_level
  label: Light Level
  query: GET=LIGHTLV
  response_prefix: "g:LIGHTLV="
  type: integer

- id: memory_color_flesh
  label: Memory Color (Flesh)
  query: GET=MEMF
  response_prefix: "g:MEMF="
  type: string

- id: memory_color_green
  label: Memory Color (Green)
  query: GET=MEMG
  response_prefix: "g:MEMG="
  type: string

- id: memory_color_sky
  label: Memory Color (Sky)
  query: GET=MEMS
  response_prefix: "g:MEMS="
  type: string

- id: menu_rotation
  label: Menu Rotation
  query: GET=MENU_RT
  response_prefix: "g:MENU_RT="
  type: enum
  values: [AUTO, NONE, 90L, 90R]

- id: mute_state
  label: Mute State
  query: GET=MUTE
  response_prefix: "g:MUTE="
  type: enum
  values: [ON, OFF]

- id: noise_reduction
  label: Noise Reduction
  query: GET=NR
  response_prefix: "g:NR="
  type: enum
  values: [MIDDLE]

- id: mpeg_noise_reduction
  label: MPEG Noise Reduction
  query: GET=NRMPG
  response_prefix: "g:NRMPG="
  type: string

- id: operation_mode
  label: Operation Mode
  query: GET=OPMODE
  response_prefix: "g:OPMODE="
  type: enum
  values: [NORMAL, CONST, LONG1, LONG2]

- id: usage_time
  label: Projector Usage Time
  query: GET=PJUSGT
  response_prefix: "g:PJUSGT="
  type: integer
  description: Usage time in hours

- id: product_code
  label: Product Name
  query: GET=PRODCODE
  response_prefix: "g:PRODCODE="
  type: string

- id: quick_start
  label: High-Speed Start
  query: GET=QSTRT
  response_prefix: "g:QSTRT="
  type: enum
  values: [ON, OFF]

- id: rgb_gain
  label: RGB Gain
  query: GET=RGBGAIN
  response_prefix: "g:RGBGAIN="
  type: string
  description: "Comma-separated R,G,B values (-60 to 60)"

- id: rgb_offset
  label: RGB Offset
  query: GET=RGBOFFSET
  response_prefix: "g:RGBOFFSET="
  type: string
  description: "Comma-separated R,G,B values (-60 to 60)"

- id: firmware_version
  label: Firmware Version
  query: GET=ROMVER
  response_prefix: "g:ROMVER="
  type: string

- id: saturation
  label: Color Saturation
  query: GET=SAT
  response_prefix: "g:SAT="
  type: integer
  min: -20
  max: 20

- id: image_profile
  label: User Memory Status
  query: GET=SAVEIMGPROF
  response_prefix: "g:SAVEIMGPROF="
  type: string
  description: "Format: count:presence1,presence2,presence3"

- id: sharpness
  label: Sharpness
  query: GET=SHARP
  response_prefix: "g:SHARP="
  type: integer
  min: -10
  max: 10

- id: signal_message
  label: Input Status Display
  query: GET=SIGMSG
  response_prefix: "g:SIGMSG="
  type: enum
  values: [ON, OFF]

- id: signal_info
  label: Signal Information
  query: GET=SIGNAL_INFO
  response_prefix: "g:SIGNAL_INFO="
  type: string
  description: 'e.g. "1920 x 1200 60"'

- id: signal_status
  label: Signal Status
  query: GET=SIGNALSTATUS
  response_prefix: "g:SIGNALSTATUS="
  type: enum
  values: [NO_SIGNAL, DISPLAYING, SETTING, UNSUPPORTED, INSUFFICIENT]

- id: sntp
  label: SNTP Setting
  query: GET=SNTP
  response_prefix: "g:SNTP="
  type: enum
  values: [OFF, IPV4, IPV6]

- id: temperature
  label: Temperature Sensors
  query: GET=TEMP
  response_prefix: "g:TEMP="
  type: string
  description: "Format: count,value1,...,valueN"

- id: time_zone
  label: Time Zone
  query: GET=TIME_ZONE
  response_prefix: "g:TIME_ZONE="
  type: string

- id: test_pattern
  label: Test Pattern
  query: GET=TPTN
  response_prefix: "g:TPTN="
  type: string

- id: trigger_out
  label: Trigger Out Setting
  query: GET=TRGOUT
  response_prefix: "g:TRGOUT="
  type: enum
  values: [OFF, POWER]
```

## Variables
```yaml
# UNRESOLVED: no settable parameters distinct from actions identified in source
```

## Events
```yaml
# Source describes no unsolicited notifications. All responses are solicited by commands.
# The i:BUSY response is solicited, not an event.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes: POWER=OFF returns i:OK as "request accepted" without confirming power-off executed.
# LAN socket closes after 30s inactivity. Serial inter-character timeout Tc=1s; command/response timeout Tr=15s.
# Only one command at a time; second command is discarded while first is processing.
```

## Notes

- **Command delimiter:** CR (0x0D). All commands and responses use CR termination.
- **Command format:** `<COMMAND>=<VALUE>CR` for settings; `GET=<COMMAND>CR` for queries.
- **Response types:** `i:OK` (success), `g:CMD=VALUE` (query response), `e:CODE DESCRIPTION` (error), `i:BUSY` (projector busy).
- **Case insensitivity:** Upper and lowercase letters treated as same; uppercase preferred.
- **Max command length:** 256 bytes including delimiter.
- **LAN timeout:** Socket closes if no command received for 30 seconds.
- **Serial timeout:** Inter-character 1s (Tc), command-response 15s (Tr).
- **Standby mode restrictions:** Many commands only executable when projector is ON; see command list column LAN ON / RS-232C ON.
- **Sequential only:** Next command must wait for previous response. Second command is discarded.
- **Mute auto-cancel:** Adjusting volume during mute cancels mute.
- **Freeze/Blank interaction:** Executing BLANK during FREEZE cancels FREEZE.
- **Wireless LAN:** Device also supports 802.11bgn wireless; wireless side of "Network (wired/wireless)" must be set to "Infra" or "Pj AP". Commands use the same TCP/IP port 33336 over wireless.
- **Numeric parameter range:** Valid value range -32768 to 32767; numeric strings 1-5 digits.
- **Error list (section 7):**
  - `i:OK` — command processed successfully.
  - `e:0002 INVALID_COMMAND` — command invalid/undefined or format incorrect.
  - `e:000A INVALID_PARAMETER` — argument/parameter invalid.
  - `e:F001 SYSTEM` — internal error; resend; if persistent, power-cycle projector.
  - `e:0005 NOT_POWER_SUPPLIED` — power is off; send command while power on.
  - `i:BUSY` — projector undergoing internal processing; wait and resend.
  - `e:1011 FUNCTION_NOT_AVAILABLE` — operation invalid in current status; return UI to projection mode / activate via menu.
  - `e:201F INVALID_SIGNAL` — cannot execute with current input signal.

<!-- UNRESOLVED: MEMF/MEMG/MEMS parameter values not enumerated in source -->
<!-- UNRESOLVED: NRMPG parameter values — only MIDDLE shown as example but full set not listed -->
<!-- UNRESOLVED: HDR_RANGE valid value range not stated -->
<!-- UNRESOLVED: LIGHTLV range varies by OPMODE but exact boundaries for all modes not fully confirmed -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
````

Upgrade done. Changes:
- revision 1→2, created_at updated
- Added 9 `kind: query` actions (COMVER/ERR/PJUSGT/PRODCODE/ROMVER/SIGNAL_INFO/SIGNALSTATUS/TEMP/TIME_ZONE) → all 79 source rows now have action coverage
- NR param string→enum [MIDDLE] (source had explicit table)
- NR feedback also string→enum [MIDDLE]
- Notes: added wireless LAN detail, numeric range, full error list from section 7
- All existing IDs/shapes preserved

## Provenance

```yaml
source_domains:
  - canon.a.bigcontent.io
  - cdn.marketing-cloud.io
  - manualsnet.com
  - usa.canon.com
source_urls:
  - https://canon.a.bigcontent.io/v1/static/636349309990882175PX_xeed-4k600stz_02
  - https://cdn.marketing-cloud.io/wp-content/canon_rebranding/uploads/2025/03/24155528/XC_Control_Protocol_specification_008.pdf
  - https://manualsnet.com/canon/4k600stz
  - https://www.usa.canon.com/support/user-manual-library
retrieved_at: 2026-05-14T13:46:09.968Z
last_checked_at: 2026-07-21T21:41:50.024Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:41:50.024Z
matched_actions: 80
action_count: 80
confidence: medium
summary: "All 80 spec actions map 1:1 to the source's 79 command rows (POWER split into ON/OFF) with matching shapes and transport. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no settable parameters distinct from actions identified in source"
- "no multi-step sequences explicitly described in source"
- "MEMF/MEMG/MEMS parameter values not enumerated in source"
- "NRMPG parameter values — only MIDDLE shown as example but full set not listed"
- "HDR_RANGE valid value range not stated"
- "LIGHTLV range varies by OPMODE but exact boundaries for all modes not fully confirmed"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
