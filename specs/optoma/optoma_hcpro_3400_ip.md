---
spec_id: admin/optoma-hcpro-3400
schema_version: ai4av-public-spec-v1
revision: 2
title: "Optoma HCPro-3400 Control Spec"
manufacturer: Optoma
model_family: HCPro-3400
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - HCPro-3400
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - region-resource.optoma.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
retrieved_at: 2026-09-05T16:48:01.368Z
last_checked_at: 2026-09-17T22:20:26.132Z
generated_at: 2026-09-17T22:20:26.132Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source contains no first-party model-page confirmation; model name HCPro-3400 taken from operator-supplied context and prior-research notes indicate zero public footprint — verify with operator"
  - "TCP/IP transport parameters (port number, connection mode, Telnet vs raw socket, line ending negotiation) not stated in source"
  - "firmware / software version compatibility not stated"
  - "command timing, inter-command delays, warm-up/cooldown windows after power on not documented"
  - "response timeout values not specified"
  - "EDID Reminder, HDMI 1/2 EDID, HDBaseT EDID rows in source carry no command codes or values"
  - "network config commands (Subnet Mask, Gateway, DNS, Apply) carry no ~XX codes in source"
  - "TCP/Telnet port number not stated in source"
  - "no multi-step sequences described explicitly in source"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "TCP/Telnet port number not stated — do not assume 23"
  - "HTTP control path/base URL not stated (only an on/off toggle ~XX459)"
  - "exact <CR> handling over Telnet (raw vs negotiated) not specified"
  - "response timeout and inter-command spacing not specified"
  - "model HCPro-3400 has no public footprint per prior research — confirm with operator before publication"
verification:
  verdict: verified
  checked_at: 2026-09-17T22:20:26.132Z
  matched_actions: 266
  action_count: 266
  confidence: medium
  summary: "All 266 spec actions map to literal ~XX### opcodes documented in the source protocol table; transport parameters (19200/8/N/1) verbatim. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Optoma HCPro-3400 Control Spec

## Summary

Optoma HCPro-3400 WUXGA/UHD projector controlled via RS-232 serial (and TCP/IP using the identical ASCII command set over Telnet/raw socket). Command frame: `~[ProjectorID][3-digit-cmd] [value]<CR>` where `~` is the lead code (0x7E), ProjectorID is two digits 00–99 (00 = broadcast to all), and `<CR>` is carriage return (0x0D). Write success reply: `P`. Write failure reply: `F`. Read success reply: `Ok[value]`. Read failure reply: `F`. Unsolicited status uses the `INFO` prefix followed by a variable code. The source document is titled "RS232 Protocol Function List" and documents the full projector command catalogue; the same ASCII command set is carried over the device's Telnet/TCP control interface (toggle ~XX458). The `~XX` notation used throughout preserves the source's literal placeholder where `XX` = the two-digit projector ID.

<!-- UNRESOLVED: source contains no first-party model-page confirmation; model name HCPro-3400 taken from operator-supplied context and prior-research notes indicate zero public footprint — verify with operator -->
<!-- UNRESOLVED: TCP/IP transport parameters (port number, connection mode, Telnet vs raw socket, line ending negotiation) not stated in source -->
<!-- UNRESOLVED: firmware / software version compatibility not stated -->
<!-- UNRESOLVED: command timing, inter-command delays, warm-up/cooldown windows after power on not documented -->
<!-- UNRESOLVED: response timeout values not specified -->
<!-- UNRESOLVED: EDID Reminder, HDMI 1/2 EDID, HDBaseT EDID rows in source carry no command codes or values -->
<!-- UNRESOLVED: network config commands (Subnet Mask, Gateway, DNS, Apply) carry no ~XX codes in source -->

## Transport

```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 19200          # source default; supported range 9600-115200 stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
# UART16550 FIFO: Disable (stated in source)
addressing:
  port: null                # UNRESOLVED: TCP/Telnet port number not stated in source
auth:
  type: none                # inferred: no login procedure in source for the control interface
```

## Traits

```yaml
- powerable       # inferred from ~XX00 power on/off commands
- routable        # inferred from ~XX12 / ~XX305 main/sub source selection
- queryable       # inferred from ~XX121 / ~XX124 / ~XX150 etc. read commands
- levelable       # inferred from brightness/contrast/gain/level commands
```

## Actions

```yaml
# Command template throughout: "~XX{code} {value}\r" - replace XX with the
# two-digit projector ID (00 = all projectors). \r = CR (0x0D). All commands
# terminate with <CR> per source.

# ===== Power / Mute / Freeze / Re-Sync (Other Useful Commands) =====
- id: power_on
  label: Power On
  kind: action
  command: "~XX00 1\r"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "~XX00 0\r"
  params: []

- id: resync
  label: Re-Sync
  kind: action
  command: "~XX01 1\r"
  params: []

- id: av_mute_on
  label: AV Mute On
  kind: action
  command: "~XX02 1\r"
  params: []

- id: av_mute_off
  label: AV Mute Off
  kind: action
  command: "~XX02 0\r"
  params: []

- id: freeze_on
  label: Freeze Screen
  kind: action
  command: "~XX04 1\r"
  params: []

- id: freeze_off
  label: Unfreeze Screen
  kind: action
  command: "~XX04 0\r"
  params: []

# ===== Image Settings - Display Mode =====
- id: set_display_mode
  label: Set Display Mode
  kind: action
  command: "~XX20 {mode}\r"
  params:
    - name: mode
      type: integer
      description: "Presentation=1, Bright=2, Cinema=3, sRGB=4, User=5, 3D=9, DICOM SIM.=13, Blending=19, HDR=21"

# ===== Image Settings - Wall Color =====
- id: set_wall_color
  label: Set Wall Color
  kind: action
  command: "~XX506 {color}\r"
  params:
    - name: color
      type: integer
      description: "Off=0, Blackboard=1, Light Green=3, Light Blue=4, Pink=5, Gray=6, Light Yellow=7"

# ===== Image Settings - DynamicRange / HDR =====
- id: set_hdr_dynamic_range
  label: Set DynamicRange HDR
  kind: action
  command: "~XX565 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, Auto=1"

- id: set_hdr_picture_mode
  label: Set HDR Picture Mode
  kind: action
  command: "~XX566 {mode}\r"
  params:
    - name: mode
      type: integer
      description: "Bright=0, Standard=1, Film=2, Detail=3, SMPTE 2084=4"

# ===== Image Settings - Brightness =====
- id: brightness_decrease
  label: Brightness Decrease
  kind: action
  command: "~XX46 1\r"
  params: []

- id: brightness_increase
  label: Brightness Increase
  kind: action
  command: "~XX46 2\r"
  params: []

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "~XX21 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100"

# ===== Image Settings - Contrast =====
- id: contrast_decrease
  label: Contrast Decrease
  kind: action
  command: "~XX47 1\r"
  params: []

- id: contrast_increase
  label: Contrast Increase
  kind: action
  command: "~XX47 2\r"
  params: []

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "~XX22 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100"

# ===== Image Settings - Sharpness / Color / Tint =====
- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "~XX23 {value}\r"
  params:
    - name: value
      type: integer
      description: "1-15"

- id: set_color
  label: Set Color
  kind: action
  command: "~XX45 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_tint
  label: Set Tint
  kind: action
  command: "~XX44 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100"

# ===== Image Settings - Gamma =====
- id: set_gamma
  label: Set Gamma
  kind: action
  command: "~XX35 {value}\r"
  params:
    - name: value
      type: integer
      description: "Film=1, Video=2, Graphics=3, Standard(2.2)=4, 1.8=5, 2.0=6, 2.4=12, DICOM SIM.=11"

# ===== Image Settings - BrilliantColor / Color Temperature =====
- id: set_brilliant_color
  label: Set BrilliantColor
  kind: action
  command: "~XX34 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-10"

- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  command: "~XX36 {value}\r"
  params:
    - name: value
      type: integer
      description: "Standard=1, Cool=2, Warm=4"

# ===== Image Settings - Color Matching (per-channel Hue/Sat/Gain) =====
- id: set_cm_red_hue
  label: Set Color Matching Red Hue
  kind: action
  command: "~XX327 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_red_saturation
  label: Set Color Matching Red Saturation
  kind: action
  command: "~XX333 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_red_gain
  label: Set Color Matching Red Gain
  kind: action
  command: "~XX339 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_green_hue
  label: Set Color Matching Green Hue
  kind: action
  command: "~XX328 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_green_saturation
  label: Set Color Matching Green Saturation
  kind: action
  command: "~XX334 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_green_gain
  label: Set Color Matching Green Gain
  kind: action
  command: "~XX340 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_blue_hue
  label: Set Color Matching Blue Hue
  kind: action
  command: "~XX329 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_blue_saturation
  label: Set Color Matching Blue Saturation
  kind: action
  command: "~XX335 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_blue_gain
  label: Set Color Matching Blue Gain
  kind: action
  command: "~XX341 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_cyan_hue
  label: Set Color Matching Cyan Hue
  kind: action
  command: "~XX330 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_cyan_saturation
  label: Set Color Matching Cyan Saturation
  kind: action
  command: "~XX336 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_cyan_gain
  label: Set Color Matching Cyan Gain
  kind: action
  command: "~XX342 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_magenta_hue
  label: Set Color Matching Magenta Hue
  kind: action
  command: "~XX332 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_magenta_saturation
  label: Set Color Matching Magenta Saturation
  kind: action
  command: "~XX338 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_magenta_gain
  label: Set Color Matching Magenta Gain
  kind: action
  command: "~XX344 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_yellow_hue
  label: Set Color Matching Yellow Hue
  kind: action
  command: "~XX331 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_yellow_saturation
  label: Set Color Matching Yellow Saturation
  kind: action
  command: "~XX337 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_yellow_gain
  label: Set Color Matching Yellow Gain
  kind: action
  command: "~XX343 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_white_red
  label: Set Color Matching White Red
  kind: action
  command: "~XX345 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_white_green
  label: Set Color Matching White Green
  kind: action
  command: "~XX346 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: set_cm_white_blue
  label: Set Color Matching White Blue
  kind: action
  command: "~XX347 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-254"

- id: color_matching_reset
  label: Color Matching Reset
  kind: action
  command: "~XX215 1\r"
  params: []

# ===== Image Settings - RGB Gain/Bias =====
- id: set_rgb_red_gain
  label: Set RGB Red Gain
  kind: action
  command: "~XX24 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_rgb_green_gain
  label: Set RGB Green Gain
  kind: action
  command: "~XX25 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_rgb_blue_gain
  label: Set RGB Blue Gain
  kind: action
  command: "~XX26 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_rgb_red_bias
  label: Set RGB Red Bias
  kind: action
  command: "~XX27 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_rgb_green_bias
  label: Set RGB Green Bias
  kind: action
  command: "~XX28 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_rgb_blue_bias
  label: Set RGB Blue Bias
  kind: action
  command: "~XX29 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100"

- id: rgb_gain_bias_reset
  label: RGB Gain/Bias Reset
  kind: action
  command: "~XX517 1\r"
  params: []

# ===== Image Settings - Color Space =====
- id: set_color_space
  label: Set Color Space
  kind: action
  command: "~XX37 {value}\r"
  params:
    - name: value
      type: integer
      description: "Auto=1, RGB=2, YUV=3, RGB(0-255)=2, RGB(16-235)=4"

# ===== Image Settings - UltraDetail / Extreme Black / Dynamic Black =====
- id: set_ultra_detail
  label: Set UltraDetail
  kind: action
  command: "~XX41 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, 1=4, 2=5, 3=6"

- id: set_extreme_black
  label: Set Extreme Black
  kind: action
  command: "~XX218 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1"

- id: set_dynamic_black
  label: Set Dynamic Black
  kind: action
  command: "~XX191 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1"

# ===== Image Settings - Brightness Mode / Power Level =====
- id: set_brightness_mode
  label: Set Brightness Mode
  kind: action
  command: "~XX110 {value}\r"
  params:
    - name: value
      type: integer
      description: "Eco Mode=2, Constant Power=6, Constant Luminance=7"

- id: set_power_level
  label: Set Power Level
  kind: action
  command: "~XX326 {value}\r"
  params:
    - name: value
      type: integer
      description: "1-100"

# ===== Image Settings - PureEngine =====
- id: set_pure_contrast
  label: Set PureContrast
  kind: action
  command: "~XX219 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1"

- id: set_pure_color
  label: Set PureColor
  kind: action
  command: "~XX42 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, 1-5"

- id: set_pure_motion
  label: Set PureMotion
  kind: action
  command: "~XX190 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, 1-3"

- id: set_pure_motion_demo
  label: Set PureMotion Demo
  kind: action
  command: "~XX197 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, H Split=1, V Split=2"

- id: image_reset
  label: Image Settings Reset
  kind: action
  command: "~XX509 1\r"
  params: []

# ===== 3D Settings =====
- id: set_3d_mode
  label: Set 3D Mode
  kind: action
  command: "~XX230 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=4"

- id: set_3d_format
  label: Set 3D Format
  kind: action
  command: "~XX405 {value}\r"
  params:
    - name: value
      type: integer
      description: "Auto=0, Side by Side=1, Top and Bottom=2, Frame Sequential=3, Frame Packing=7"

- id: set_3d_to_2d
  label: Set 3D-2D
  kind: action
  command: "~XX400 {value}\r"
  params:
    - name: value
      type: integer
      description: "3D=0, L=1, R=2"

- id: set_3d_sync_invert
  label: Set 3D Sync Invert
  kind: action
  command: "~XX231 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1"

- id: set_3d_sync_out
  label: Set 3D Sync Out
  kind: action
  command: "~XX232 {value}\r"
  params:
    - name: value
      type: integer
      description: "To Emitter=0, To Next Projector=1"

- id: set_lr_reference
  label: Set L/R Reference
  kind: action
  command: "~XX236 {value}\r"
  params:
    - name: value
      type: integer
      description: "Field GPIO=0, 1ST FRAME=1"

- id: set_3d_frame_delay
  label: Set 3D Frame Delay
  kind: action
  command: "~XX233 {value}\r"
  params:
    - name: value
      type: integer
      description: "1-200"

- id: reset_3d
  label: 3D Reset
  kind: action
  command: "~XX234 1\r"
  params: []

# ===== Aspect Ratio / Digital Zoom =====
- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  command: "~XX60 {value}\r"
  params:
    - name: value
      type: integer
      description: "4:3=1, 16:9=2, 16:10=3, LBX=5, Native=6, Auto=7"

- id: set_h_zoom
  label: Set H Zoom
  kind: action
  command: "~XX504 {value}\r"
  params:
    - name: value
      type: integer
      description: "50-400 (%)"

- id: set_v_zoom
  label: Set V Zoom
  kind: action
  command: "~XX505 {value}\r"
  params:
    - name: value
      type: integer
      description: "50-400 (%)"

# ===== Image Shift =====
- id: set_h_image_shift
  label: Set H Image Shift
  kind: action
  command: "~XX63 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_v_image_shift
  label: Set V Image Shift
  kind: action
  command: "~XX64 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100"

# ===== Geometric Correction - Arc / Keystone =====
- id: set_h_arc
  label: Set H Arc
  kind: action
  command: "~XX300 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_v_arc
  label: Set V Arc
  kind: action
  command: "~XX301 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_h_keystone
  label: Set H Keystone
  kind: action
  command: "~XX65 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-40"

- id: set_v_keystone
  label: Set V Keystone
  kind: action
  command: "~XX66 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-40"

# ===== Geometric Correction - Four Corners =====
- id: set_topleft_h
  label: Set Four Corners Top-Left H
  kind: action
  command: "~XX581 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-120"

- id: set_topleft_v
  label: Set Four Corners Top-Left V
  kind: action
  command: "~XX582 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-80"

- id: set_topright_h
  label: Set Four Corners Top-Right H
  kind: action
  command: "~XX583 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-120"

- id: set_topright_v
  label: Set Four Corners Top-Right V
  kind: action
  command: "~XX584 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-80"

- id: set_bottomleft_h
  label: Set Four Corners Bottom-Left H
  kind: action
  command: "~XX585 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-120"

- id: set_bottomleft_v
  label: Set Four Corners Bottom-Left V
  kind: action
  command: "~XX586 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-80"

- id: set_bottomright_h
  label: Set Four Corners Bottom-Right H
  kind: action
  command: "~XX587 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-120"

- id: set_bottomright_v
  label: Set Four Corners Bottom-Right V
  kind: action
  command: "~XX588 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-80"

- id: four_corners_select
  label: Four Corners Selector
  kind: action
  command: "~XX59 {value}\r"
  params:
    - name: value
      type: integer
      description: "Corner-coordinate selector 1-16 (Top-Left H/V=1-4, Top-Right=5-8, Bottom-Left=9-12, Bottom-Right=13-16)"

# ===== Geometric Correction - Warp and Blend =====
- id: set_warp_blend_settings
  label: Set Warp and Blend Settings
  kind: action
  command: "~XX142 {value}\r"
  params:
    - name: value
      type: integer
      description: "All Off=0, All On=3, Blend Off=4"

- id: set_warp_blend_memory
  label: Set Warp and Blend Memory
  kind: action
  command: "~XX147 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, User1=1, User2=2, User3=3"

- id: geometric_reset
  label: Geometric Correction Reset
  kind: action
  command: "~XX561 1\r"
  params: []

# ===== PIP / PBP =====
- id: set_pip_pbp_screen
  label: Set PIP/PBP Screen
  kind: action
  command: "~XX302 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, PIP=1, PBP=2"

- id: set_pip_pbp_location
  label: Set PIP/PBP Location
  kind: action
  command: "~XX303 {value}\r"
  params:
    - name: value
      type: integer
      description: "PIP-TopLeft=1, PIP-TopRight=2, PIP-BottomLeft=3, PIP-BottomRight=4, PBP Main Left=5, Main Top=6, Main Right=7, Main Bottom=8"

- id: set_pip_pbp_size
  label: Set PIP/PBP Size
  kind: action
  command: "~XX304 {value}\r"
  params:
    - name: value
      type: integer
      description: "Large=1, Medium=2, Small=3"

- id: swap_pip_pbp_sources
  label: Swap PIP/PBP Sources
  kind: action
  command: "~XX306 1\r"
  params: []

# ===== Source Selection =====
- id: select_main_source
  label: Select Main Source
  kind: action
  command: "~XX12 {source}\r"
  params:
    - name: source
      type: integer
      description: "HDMI1=1, HDMI2=15, DisplayPort=20, HDBaseT=21, 3G-SDI=22"

- id: select_sub_source
  label: Select Sub Source
  kind: action
  command: "~XX305 {source}\r"
  params:
    - name: source
      type: integer
      description: "HDMI1=1, HDMI2=4, HDBaseT=10, 3G-SDI=11, DisplayPort=17"

# ===== Projection Orientation =====
- id: set_projection
  label: Set Projection Orientation
  kind: action
  command: "~XX71 {value}\r"
  params:
    - name: value
      type: integer
      description: "Front=1, Rear=2, Ceiling-top=3, Rear-top=4"

# ===== Lens Settings =====
- id: lens_zoom_in
  label: Lens Zoom In
  kind: action
  command: "~XX307 1\r"
  params: []

- id: lens_zoom_out
  label: Lens Zoom Out
  kind: action
  command: "~XX307 2\r"
  params: []

- id: lens_focus_in
  label: Lens Focus In
  kind: action
  command: "~XX308 1\r"
  params: []

- id: lens_focus_out
  label: Lens Focus Out
  kind: action
  command: "~XX308 2\r"
  params: []

- id: lens_lock
  label: Lens Function Lock
  kind: action
  command: "~XX349 1\r"
  params: []

- id: lens_unlock
  label: Lens Function Unlock
  kind: action
  command: "~XX349 2\r"
  params: []

- id: lens_shift_up
  label: Lens Shift Up
  kind: action
  command: "~XX84 3\r"
  params: []

- id: lens_shift_down
  label: Lens Shift Down
  kind: action
  command: "~XX84 4\r"
  params: []

- id: lens_shift_left
  label: Lens Shift Left
  kind: action
  command: "~XX84 5\r"
  params: []

- id: lens_shift_right
  label: Lens Shift Right
  kind: action
  command: "~XX84 6\r"
  params: []

- id: lens_calibration
  label: Lens Calibration
  kind: action
  command: "~XX525 {value}\r"
  params:
    - name: value
      type: integer
      description: "No=0, Yes=1"

- id: lens_memory_apply
  label: Lens Memory Apply Position
  kind: action
  command: "~XX359 {slot}\r"
  params:
    - name: slot
      type: integer
      description: "1-5"

- id: lens_memory_save
  label: Lens Memory Save Current Position
  kind: action
  command: "~XX360 {slot}\r"
  params:
    - name: slot
      type: integer
      description: "1-5"

- id: lens_memory_reset
  label: Lens Memory Reset
  kind: action
  command: "~XX361 1\r"
  params: []

# ===== Power Settings =====
- id: set_direct_power_on
  label: Set Direct Power On
  kind: action
  command: "~XX105 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1"

- id: set_auto_power_off
  label: Set Auto Power Off
  kind: action
  command: "~XX106 {minutes}\r"
  params:
    - name: minutes
      type: integer
      description: "0-180 (5 min increments)"

- id: set_sleep_timer
  label: Set Sleep Timer
  kind: action
  command: "~XX107 {minutes}\r"
  params:
    - name: minutes
      type: integer
      description: "0-990 (30 min increments)"

- id: set_always_on
  label: Set Sleep Timer Always On
  kind: action
  command: "~XX507 {value}\r"
  params:
    - name: value
      type: integer
      description: "No=0, Yes=1"

- id: set_standby_power_mode
  label: Set Power Mode (Standby)
  kind: action
  command: "~XX114 {value}\r"
  params:
    - name: value
      type: integer
      description: "Eco=0, Active=1, Communications=3"

# ===== Security =====
- id: set_security
  label: Set Security
  kind: action
  command: "~XX78 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1; PIN suffix 0-nnnn"

- id: set_security_timer_month
  label: Set Security Timer Month
  kind: action
  command: "~XX537 {value}\r"
  params:
    - name: value
      type: integer
      description: "00-12"

- id: set_security_timer_day
  label: Set Security Timer Day
  kind: action
  command: "~XX538 {value}\r"
  params:
    - name: value
      type: integer
      description: "00-29"

- id: set_security_timer_hour
  label: Set Security Timer Hour
  kind: action
  command: "~XX539 {value}\r"
  params:
    - name: value
      type: integer
      description: "00-23"

- id: set_security_timer_mmddhh
  label: Set Security Timer MM/DD/HH (RS232 only)
  kind: action
  command: "~XX77 {MMDDHH}\r"
  params:
    - name: MMDDHH
      type: string
      description: "Month/Day/Hour combined field (RS232 only)"

# ===== Test Pattern =====
- id: set_test_pattern
  label: Set Test Pattern
  kind: action
  command: "~XX195 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, White Grid=1, White=2, Green Grid=3, Magenta Grid=4, Red=5, Green=6, Blue=7, Yellow=8, Magenta=9, Cyan=10, Black=11"

# ===== Remote / IR Settings =====
- id: set_ir_front
  label: Set IR Function Front
  kind: action
  command: "~XX11 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=4, On=5"

- id: set_ir_top
  label: Set IR Function Top
  kind: action
  command: "~XX11 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=6, On=7"

- id: set_ir_hdbaset
  label: Set IR Function HDBaseT
  kind: action
  command: "~XX11 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=10, On=9"

- id: set_remote_code
  label: Set Remote Code
  kind: action
  command: "~XX350 {value}\r"
  params:
    - name: value
      type: integer
      description: "00-99"

- id: set_hotkey
  label: Set Hot-Key Settings
  kind: action
  command: "~XX117 {value}\r"
  params:
    - name: value
      type: integer
      description: "Aspect Ratio=1, Freeze Screen=2"

# ===== 12V Trigger =====
- id: set_12v_trigger
  label: Set 12V Trigger
  kind: action
  command: "~XX192 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1"

# ===== ProService =====
- id: set_projector_id
  label: Set Projector ID
  kind: action
  command: "~XX79 {value}\r"
  params:
    - name: value
      type: integer
      description: "00-99"

- id: set_light_sensor
  label: Set Light Sensor
  kind: action
  command: "~XX552 {value}\r"
  params:
    - name: value
      type: integer
      description: "Default=0, Manual=2"

- id: set_keypad_led
  label: Set Keypad LED
  kind: action
  command: "~XX362 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1"

# ===== Options - Language / Menu / Source =====
- id: set_language
  label: Set Language
  kind: action
  command: "~XX70 {value}\r"
  params:
    - name: value
      type: integer
      description: "English=1, Deutsch=2, Français=3, Italiano=4, Español=5, Português=6, Polski=7, Nederlands=8, Svenska=9, Norsk/Dansk=10, Suomi=11, ελληνικά=12, 繁體中文=13, 簡体中文=14, 日本語=15, 한국어=16, Русский=17, Magyar=18, Čeština=19, ไทย=21, Türkçe=22, Tiếng Việt=25, Bahasa Indonesia=26, Română=27, Slovakian=28"

- id: set_menu_location
  label: Set Menu Location
  kind: action
  command: "~XX72 {value}\r"
  params:
    - name: value
      type: integer
      description: "Top left=1, Top right=2, Center=3, Bottom left=4, Bottom right=5"

- id: set_menu_transparency
  label: Set Menu Transparency
  kind: action
  command: "~XX526 {value}\r"
  params:
    - name: value
      type: integer
      description: "0-9"

- id: set_menu_timer
  label: Set Menu Timer
  kind: action
  command: "~XX515 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, 5sec=1, 10sec=3, 15sec=4"

- id: set_auto_source
  label: Set Auto Source
  kind: action
  command: "~XX563 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1"

# ===== Options - Environment / Display =====
- id: set_high_altitude
  label: Set High Altitude
  kind: action
  command: "~XX101 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1"

- id: set_information_hide
  label: Set Information Hide
  kind: action
  command: "~XX102 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1"

- id: set_logo
  label: Set Logo
  kind: action
  command: "~XX82 {value}\r"
  params:
    - name: value
      type: integer
      description: "Default=1, Neutral=3"

- id: set_background_color
  label: Set Background Color
  kind: action
  command: "~XX104 {value}\r"
  params:
    - name: value
      type: integer
      description: "None=0, Blue=1, Red=3, Green=4, Gray=6, Logo=7"

# ===== Options - Serial Port =====
- id: set_serial_port_path
  label: Set Serial Port Path
  kind: action
  command: "~XX557 {value}\r"
  params:
    - name: value
      type: integer
      description: "RS232=1, HDBaseT=2"

# ===== System Update =====
- id: set_update_notification
  label: Set System Update Notification
  kind: action
  command: "~XX168 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1"

- id: trigger_system_update
  label: Trigger System Update
  kind: action
  command: "~XX168 9\r"
  params: []

# ===== Reset =====
- id: reset_osd
  label: Reset OSD
  kind: action
  command: "~XX546 1\r"
  params: []

- id: reset_to_default
  label: Reset to Default
  kind: action
  command: "~XX112 1\r"
  params: []

# ===== WLAN / Control Toggles =====
- id: set_wlan
  label: Set WLAN
  kind: action
  command: "~XX450 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1"

- id: set_crestron
  label: Set Crestron Control
  kind: action
  command: "~XX454 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1"

- id: set_extron
  label: Set Extron Control
  kind: action
  command: "~XX455 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1"

- id: set_pj_link
  label: Set PJ Link Control
  kind: action
  command: "~XX456 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1"

- id: set_amx_device_discovery
  label: Set AMX Device Discovery
  kind: action
  command: "~XX457 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1"

- id: set_telnet
  label: Set Telnet Control
  kind: action
  command: "~XX458 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1"

- id: set_http
  label: Set HTTP Control
  kind: action
  command: "~XX459 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1"

# ===== Source Lock / Wheels =====
- id: set_source_lock
  label: Set Source Lock
  kind: action
  command: "~XX100 {value}\r"
  params:
    - name: value
      type: integer
      description: "Off=0, On=1"

- id: set_filter_wheel_index
  label: Set Filter Wheel Index
  kind: action
  command: "~XX528 {value}\r"
  params:
    - name: value
      type: integer
      description: "0000-9999"

- id: set_phosphor_wheel_index
  label: Set Phosphor Wheel Index
  kind: action
  command: "~XX529 {value}\r"
  params:
    - name: value
      type: integer
      description: "0000-9999"

- id: light_sensor_calibration
  label: Light Sensor Calibration
  kind: action
  command: "~XX552 2\r"
  params: []

# ===== Remote Control Simulation (~XX140, one opcode, key-id param) =====
- id: remote_key_power
  label: Remote Sim - Power
  kind: action
  command: "~XX140 1\r"
  params: []

- id: remote_key_power_off
  label: Remote Sim - Power Off
  kind: action
  command: "~XX140 2\r"
  params: []

- id: remote_key_up
  label: Remote Sim - Up
  kind: action
  command: "~XX140 10\r"
  params: []

- id: remote_key_left
  label: Remote Sim - Left
  kind: action
  command: "~XX140 11\r"
  params: []

- id: remote_key_enter
  label: Remote Sim - Enter (Menu)
  kind: action
  command: "~XX140 12\r"
  params: []

- id: remote_key_right
  label: Remote Sim - Right
  kind: action
  command: "~XX140 13\r"
  params: []

- id: remote_key_down
  label: Remote Sim - Down
  kind: action
  command: "~XX140 14\r"
  params: []

- id: remote_key_v_keystone_plus
  label: Remote Sim - V Keystone +
  kind: action
  command: "~XX140 15\r"
  params: []

- id: remote_key_v_keystone_minus
  label: Remote Sim - V Keystone -
  kind: action
  command: "~XX140 16\r"
  params: []

- id: remote_key_brightness
  label: Remote Sim - Brightness
  kind: action
  command: "~XX140 19\r"
  params: []

- id: remote_key_menu
  label: Remote Sim - Menu
  kind: action
  command: "~XX140 20\r"
  params: []

- id: remote_key_zoom
  label: Remote Sim - Zoom
  kind: action
  command: "~XX140 21\r"
  params: []

- id: remote_key_av_mute
  label: Remote Sim - AV Mute
  kind: action
  command: "~XX140 24\r"
  params: []

- id: remote_key_contrast
  label: Remote Sim - Contrast
  kind: action
  command: "~XX140 28\r"
  params: []

- id: remote_key_lens_shift
  label: Remote Sim - Lens Shift
  kind: action
  command: "~XX140 31\r"
  params: []

- id: remote_key_zoom_plus
  label: Remote Sim - Zoom +
  kind: action
  command: "~XX140 32\r"
  params: []

- id: remote_key_zoom_minus
  label: Remote Sim - Zoom -
  kind: action
  command: "~XX140 33\r"
  params: []

- id: remote_key_focus_plus
  label: Remote Sim - Focus +
  kind: action
  command: "~XX140 34\r"
  params: []

- id: remote_key_focus_minus
  label: Remote Sim - Focus -
  kind: action
  command: "~XX140 35\r"
  params: []

- id: remote_key_mode
  label: Remote Sim - Mode
  kind: action
  command: "~XX140 36\r"
  params: []

- id: remote_key_info
  label: Remote Sim - Info
  kind: action
  command: "~XX140 40\r"
  params: []

- id: remote_key_auto_resync
  label: Remote Sim - Auto (Re-sync)
  kind: action
  command: "~XX140 41\r"
  params: []

- id: remote_key_input_source
  label: Remote Sim - Input (Source)
  kind: action
  command: "~XX140 47\r"
  params: []

- id: remote_key_1
  label: Remote Sim - 1
  kind: action
  command: "~XX140 51\r"
  params: []

- id: remote_key_2
  label: Remote Sim - 2
  kind: action
  command: "~XX140 52\r"
  params: []

- id: remote_key_3
  label: Remote Sim - 3
  kind: action
  command: "~XX140 53\r"
  params: []

- id: remote_key_4
  label: Remote Sim - 4
  kind: action
  command: "~XX140 54\r"
  params: []

- id: remote_key_5
  label: Remote Sim - 5
  kind: action
  command: "~XX140 55\r"
  params: []

- id: remote_key_6
  label: Remote Sim - 6
  kind: action
  command: "~XX140 56\r"
  params: []

- id: remote_key_7
  label: Remote Sim - 7
  kind: action
  command: "~XX140 57\r"
  params: []

- id: remote_key_8
  label: Remote Sim - 8
  kind: action
  command: "~XX140 58\r"
  params: []

- id: remote_key_9
  label: Remote Sim - 9
  kind: action
  command: "~XX140 59\r"
  params: []

- id: remote_key_0
  label: Remote Sim - 0
  kind: action
  command: "~XX140 60\r"
  params: []

- id: remote_key_gamma
  label: Remote Sim - Gamma
  kind: action
  command: "~XX140 61\r"
  params: []

- id: remote_key_pip
  label: Remote Sim - PIP
  kind: action
  command: "~XX140 63\r"
  params: []

- id: remote_key_lens_h_left
  label: Remote Sim - Lens H (Left)
  kind: action
  command: "~XX140 64\r"
  params: []

- id: remote_key_lens_h_right
  label: Remote Sim - Lens H (Right)
  kind: action
  command: "~XX140 65\r"
  params: []

- id: remote_key_lens_v_up
  label: Remote Sim - Lens V (Up)
  kind: action
  command: "~XX140 66\r"
  params: []

- id: remote_key_lens_v_down
  label: Remote Sim - Lens V (Down)
  kind: action
  command: "~XX140 67\r"
  params: []

- id: remote_key_h_keystone_plus
  label: Remote Sim - H Keystone +
  kind: action
  command: "~XX140 68\r"
  params: []

- id: remote_key_h_keystone_minus
  label: Remote Sim - H Keystone -
  kind: action
  command: "~XX140 69\r"
  params: []

- id: remote_key_hotkey_user1
  label: Remote Sim - Hot Key (user1/F1)
  kind: action
  command: "~XX140 70\r"
  params: []

- id: remote_key_pattern
  label: Remote Sim - Pattern
  kind: action
  command: "~XX140 73\r"
  params: []

- id: remote_key_exit
  label: Remote Sim - Exit
  kind: action
  command: "~XX140 74\r"
  params: []

# ===== Query Actions (Read Commands) =====
- id: query_display_mode
  label: Query Display Mode
  kind: query
  command: "~XX123 1\r"
  params: []

- id: query_brightness
  label: Query Brightness
  kind: query
  command: "~XX125 1\r"
  params: []

- id: query_contrast
  label: Query Contrast
  kind: query
  command: "~XX126 1\r"
  params: []

- id: query_color_temperature
  label: Query Color Temperature
  kind: query
  command: "~XX128 1\r"
  params: []

- id: query_aspect_ratio
  label: Query Aspect Ratio
  kind: query
  command: "~XX127 1\r"
  params: []

- id: query_main_source
  label: Query Main Source
  kind: query
  command: "~XX121 1\r"
  params: []

- id: query_sub_source
  label: Query Sub Source
  kind: query
  command: "~XX131 1\r"
  params: []

- id: query_projection
  label: Query Projection Orientation
  kind: query
  command: "~XX129 1\r"
  params: []

- id: query_lens_function
  label: Query Lens Function Lock
  kind: query
  command: "~XX545 4\r"
  params: []

- id: query_standby_power_mode
  label: Query Power Mode (Standby)
  kind: query
  command: "~XX150 16\r"
  params: []

- id: query_warp_blend_pc_connection
  label: Query Warp and Blend PC Connection
  kind: query
  command: "~XX132 3\r"
  params: []

- id: query_warp_blend_settings
  label: Query Warp and Blend Settings
  kind: query
  command: "~XX132 1\r"
  params: []

- id: query_warp_blend_memory
  label: Query Warp and Blend Memory
  kind: query
  command: "~XX137 1\r"
  params: []

- id: query_h_zoom
  label: Query H Zoom
  kind: query
  command: "~XX543 8\r"
  params: []

- id: query_v_zoom
  label: Query V Zoom
  kind: query
  command: "~XX543 7\r"
  params: []

- id: query_h_image_shift
  label: Query H Image Shift
  kind: query
  command: "~XX543 1\r"
  params: []

- id: query_v_image_shift
  label: Query V Image Shift
  kind: query
  command: "~XX543 2\r"
  params: []

- id: query_h_arc
  label: Query H Arc
  kind: query
  command: "~XX543 6\r"
  params: []

- id: query_v_arc
  label: Query V Arc
  kind: query
  command: "~XX543 5\r"
  params: []

- id: query_v_keystone
  label: Query V Keystone
  kind: query
  command: "~XX543 3\r"
  params: []

- id: query_h_keystone
  label: Query H Keystone
  kind: query
  command: "~XX543 4\r"
  params: []

- id: query_ir_function
  label: Query IR Function Front
  kind: query
  command: "~XX542 1\r"
  params: []

- id: query_ir_function_top
  label: Query IR Function Top
  kind: query
  command: "~XX542 2\r"
  params: []

- id: query_security_timer
  label: Query Security Timer Month
  kind: query
  command: "~XX544 1\r"
  params: []

- id: query_security_timer_day
  label: Query Security Timer Day
  kind: query
  command: "~XX544 2\r"
  params: []

- id: query_security_timer_hour
  label: Query Security Timer Hour
  kind: query
  command: "~XX544 3\r"
  params: []

- id: query_serial_baud_rate
  label: Query Serial Port Baud Rate
  kind: query
  command: "~XX153 1\r"
  params: []

- id: query_system_update_notification
  label: Query System Update Notification
  kind: query
  command: "~XX158 1\r"
  params: []

- id: query_projector_id
  label: Query Projector ID
  kind: query
  command: "~XX558 1\r"
  params: []

- id: query_projection_hours
  label: Query Projection Hours
  kind: query
  command: "~XX108 1\r"
  params: []

- id: query_software_version
  label: Query Software Version
  kind: query
  command: "~XX122 1\r"
  params: []

- id: query_power
  label: Query Power State
  kind: query
  command: "~XX124 1\r"
  params: []

- id: query_av_mute
  label: Query AV Mute
  kind: query
  command: "~XX355 1\r"
  params: []

- id: query_output_3d_state
  label: Query Output 3D State
  kind: query
  command: "~XX130 1\r"
  params: []

- id: query_model_name
  label: Query Model Name
  kind: query
  command: "~XX151 1\r"
  params: []

- id: query_lan_fw_version
  label: Query LAN FW Version
  kind: query
  command: "~XX357 1\r"
  params: []

- id: query_fan_speed
  label: Query Fan Speed
  kind: query
  command: "~XX351 {fan}\r"
  params:
    - name: fan
      type: integer
      description: "Fan 1=1, Fan 2=2, Fan 3=3, Fan 4=4 (0000-9999)"

- id: query_system_temperature
  label: Query System Temperature
  kind: query
  command: "~XX352 1\r"
  params: []

- id: query_serial_number
  label: Query Serial Number
  kind: query
  command: "~XX353 1\r"
  params: []

- id: query_color_depth
  label: Query Color Depth
  kind: query
  command: "~XX156 1\r"
  params: []

- id: query_color_format
  label: Query Color Format
  kind: query
  command: "~XX157 1\r"
  params: []

- id: query_filter_wheel_index
  label: Query Filter Wheel Index
  kind: query
  command: "~XX530 1\r"
  params: []

- id: query_phosphor_wheel_index
  label: Query Phosphor Wheel Index
  kind: query
  command: "~XX531 1\r"
  params: []

- id: query_main_resolution
  label: Query Main Resolution
  kind: query
  command: "~XX150 4\r"
  params: []

- id: query_main_signal_format
  label: Query Main Signal Format
  kind: query
  command: "~XX150 5\r"
  params: []

- id: query_main_pixel_clock
  label: Query Main Pixel Clock
  kind: query
  command: "~XX150 6\r"
  params: []

- id: query_main_horz_refresh
  label: Query Main Horz Refresh
  kind: query
  command: "~XX150 7\r"
  params: []

- id: query_main_vert_refresh
  label: Query Main Vert Refresh
  kind: query
  command: "~XX150 8\r"
  params: []

- id: query_sub_resolution
  label: Query Sub Resolution
  kind: query
  command: "~XX150 10\r"
  params: []

- id: query_sub_signal_format
  label: Query Sub Signal Format
  kind: query
  command: "~XX150 11\r"
  params: []

- id: query_sub_pixel_clock
  label: Query Sub Pixel Clock
  kind: query
  command: "~XX150 12\r"
  params: []

- id: query_sub_horz_refresh
  label: Query Sub Horz Refresh
  kind: query
  command: "~XX150 13\r"
  params: []

- id: query_sub_vert_refresh
  label: Query Sub Vert Refresh
  kind: query
  command: "~XX545 14\r"
  params: []

- id: query_system_temperature_info
  label: Query System Temperature (info)
  kind: query
  command: "~XX150 18\r"
  params: []

- id: query_lan_ip_address
  label: Query LAN IP Address
  kind: query
  command: "~XX87 3\r"
  params: []

- id: query_wlan_ip
  label: Query WLAN IP / Start IP / End IP
  kind: query
  command: "~XX451 {which}\r"
  params:
    - name: which
      type: integer
      description: "IP Address=2, SSID=3, Start IP=5, End IP=6"

- id: query_mac_address
  label: Query MAC Address
  kind: query
  command: "~XX555 1\r"
  params: []

- id: query_dhcp
  label: Query DHCP
  kind: query
  command: "~XX150 17\r"
  params: []

# ===== Additional ~XX150 multi-purpose read variants (upgrade pass) =====
# Source "Other Useful Command" table documents these distinct ~XX150 sub-params.
- id: query_info_string
  label: Query Info String
  kind: query
  command: "~XX150 1\r"
  params: []

- id: query_native_resolution
  label: Query Native Resolution
  kind: query
  command: "~XX150 2\r"
  params: []

- id: query_main_source_via_150
  label: Query Main Source (via ~XX150 alt path)
  kind: query
  command: "~XX150 3\r"
  params: []

- id: query_sub_source_via_150
  label: Query Sub Source (via ~XX150 alt path)
  kind: query
  command: "~XX150 9\r"
  params: []

- id: query_sub_vert_refresh_via_150
  label: Query Sub Vert Refresh (via ~XX150 alt path)
  kind: query
  command: "~XX150 14\r"
  params: []

- id: query_light_source_mode
  label: Query Light Source Mode
  kind: query
  command: "~XX150 15\r"
  params: []
```

## Feedbacks

```yaml
# Write command acknowledgement (per source "Response Format"):
- id: write_pass
  type: enum
  values: ["P"]

- id: write_fail
  type: enum
  values: ["F"]

# Read command reply format: "Ok{value}" on pass, "F" on fail.
- id: read_pass_prefix
  type: enum
  values: ["Ok"]

- id: read_fail
  type: enum
  values: ["F"]

# Power state values returned by ~XX124 query
- id: power_state
  type: enum
  values: ["0", "1"]   # 0=off, 1=on (inferred from ~XX00 set values)

# Serial baud rate values returned by ~XX153 (stated enum in source)
- id: serial_baud_rate
  type: enum
  values: ["9600", "14400", "19200", "38400", "57600", "115200"]

# Standby power mode values returned by ~XX150 16
- id: standby_power_mode
  type: enum
  values: ["0", "1", "3"]   # Eco=0, Active=1, Communications=3

# Output 3D state returned by ~XX130
- id: output_3d_state
  type: enum
  values: ["0", "1"]   # 2D=0, 3D=1
```

## Variables

```yaml
# Discrete value settables are captured as Actions above. No additional
# continuously-variable parameters beyond those enumerated in Actions.
```

## Events

```yaml
# Unsolicited "System Auto Response" notifications use the INFO prefix
# followed by a numeric code. Codes documented in source (Standby Mode table):
- id: standby_mode
  pattern: "INFO0"
  description: "Standby Mode"
- id: warming_up
  pattern: "INFO1"
  description: "Warming up"
- id: cooling_down
  pattern: "INFO2"
  description: "Cooling Down"
- id: out_of_range
  pattern: "INFO3"
  description: "Out of Range"
- id: lamp_fail
  pattern: "INFO4"
  description: "Lamp Fail (LED Fail)"
- id: thermal_switch_error
  pattern: "INFO5"
  description: "Thermal Switch Error"
- id: fan_lock
  pattern: "INFO6"
  description: "Fan Lock"
- id: over_temperature
  pattern: "INFO7"
  description: "Over Temperature"
- id: lamp_hours_running_out
  pattern: "INFO8"
  description: "System Auto Send Lamp Hours Running Out"
- id: cover_open
  pattern: "INFO9"
  description: "Cover Open"
- id: lamp_ignite_fail
  pattern: "INFO10"
  description: "Lamp Ignite Fail"
- id: format_board_power_on_fail
  pattern: "INFO11"
  description: "Format Board Power On Fail"
- id: color_wheel_unexpected_stop
  pattern: "INFO12"
  description: "Color Wheel Unexpected Stop"
- id: over_temperature_2
  pattern: "INFO13"
  description: "Over Temperature"
- id: fan1_lock
  pattern: "INFO14"
  description: "FAN 1 Lock"
- id: fan2_lock
  pattern: "INFO15"
  description: "FAN 2 Lock"
- id: fan3_lock
  pattern: "INFO16"
  description: "FAN 3 Lock"
- id: fan4_lock
  pattern: "INFO17"
  description: "FAN 4 Lock"
- id: fan5_lock
  pattern: "INFO18"
  description: "FAN 5 Lock"
- id: lan_fail_restart
  pattern: "INFO19"
  description: "LAN fail then restart"
- id: ld_lower_than_60
  pattern: "INFO20"
  description: "LD lower than 60%"
- id: ld_ntc1_over_temp
  pattern: "INFO21"
  description: "LD NTC (1) Over Temperature"
- id: ld_ntc2_over_temp
  pattern: "INFO22"
  description: "LD NTC (2) Over Temperature"
- id: high_ambient_temperature
  pattern: "INFO23"
  description: "High Ambient Temperature"
- id: system_ready
  pattern: "INFO24"
  description: "System Ready"
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements beyond the unsolicited INFO error events.
```

## Notes

- Command frame (Write/Read identical structure): `~[ID][CCC] [VVVV]<CR>` where `~`=0x7E lead, `[ID]`=2-digit projector ID (00–99, 00=all), `[CCC]`=3-digit command code, single space separator, `[VVVV]`=variable param, `<CR>`=0x0D. Worked example from source: `~00195 1<CR>` → HEX `7E 30 30 31 39 35 20 31 0D`.
- All commands terminate with `<CR>` (0x0D).
- Default serial config: 19200 baud, 8 data bits, no parity, 1 stop bit, no flow control, UART16550 FIFO disabled. Source notes supported baud range 9600–115200 and that lower baud may help long cable runs.
- Security PIN feature (~XX78) is a projector-level security lock, NOT transport-layer authentication. The control interface itself has no login procedure (auth.type inferred none).
- Source lists `~XX59` as a sub-selector (params 1–16) paired with the Four Corners H/V coordinate setters (~XX581–588); exact semantic of ~XX59 vs the coordinate setters is ambiguous in source — verify on device.
- ~XX150 is a multi-purpose read opcode; the space parameter selects which attribute (Info String=1, Native Resolution=2, Main Source=3, Main Resolution=4, Signal Format=5, Pixel Clock=6, Horz/Vert Refresh=7/8, Sub Source=9, Sub Resolution/Signal/Pixel/Horz=10–13, Sub Vert Refresh=14, Light Source Mode=15, Standby Mode=16, DHCP=17, System Temperature=18).
- ~XX543 is a multi-purpose read opcode for geometric-correction attributes (H/V zoom, H/V image shift, H/V arc, H/V keystone); the space parameter selects the attribute.
- ~XX545 reads both Lens Function lock (param 4) and Sub Vert Refresh (param 14) — overloaded read opcode.
- Sub Vert Refresh is documented under two opcodes in the source: ~XX545 14 (Regulatory table) and ~XX150 14 (Other Useful Command table). Both are enumerated as distinct query actions; source is internally inconsistent — verify on device.
- Main/Sub Source have two documented read paths: ~XX121 1 / ~XX131 1 (Regulatory table, preferred — explicitly referenced by the Input Source rows) and ~XX150 3 / ~XX150 9 (Other Useful Command table, alt). All four enumerated.
- IR Function read (~XX542) is parameterized: param 1=Front, param 2=Top. HDBaseT IR (param value via ~XX542) is not given a distinct read sub-param in source.
- Security Timer read (~XX544) is parameterized: param 1=Month, param 2=Day, param 3=Hour.
- Source rows for EDID Reminder, HDMI 1/2 EDID, HDBaseT EDID, Subnet Mask, Gateway, DNS, and "Apply" carry no command codes — cannot be implemented from this source.
- Source rows for Change Password, Network Reset, Digital Zoom Reset/Exit, F-MCU / S-MCU / F-Image / Formatter / LAN Versions, Brightness Mode (read), and Power Level (read) carry no command codes — cannot be implemented from this source.
- Remote Control Simulation (~XX140) is one opcode with a key-id parameter (1–74); each key is documented as a separate row in source and enumerated above as separate actions.

<!-- UNRESOLVED: TCP/Telnet port number not stated — do not assume 23 -->
<!-- UNRESOLVED: HTTP control path/base URL not stated (only an on/off toggle ~XX459) -->
<!-- UNRESOLVED: exact <CR> handling over Telnet (raw vs negotiated) not specified -->
<!-- UNRESOLVED: response timeout and inter-command spacing not specified -->
<!-- UNRESOLVED: model HCPro-3400 has no public footprint per prior research — confirm with operator before publication -->

## Provenance

```yaml
source_domains:
  - region-resource.optoma.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
retrieved_at: 2026-09-05T16:48:01.368Z
last_checked_at: 2026-09-17T22:20:26.132Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-17T22:20:26.132Z
matched_actions: 266
action_count: 266
confidence: medium
summary: "All 266 spec actions map to literal ~XX### opcodes documented in the source protocol table; transport parameters (19200/8/N/1) verbatim. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source contains no first-party model-page confirmation; model name HCPro-3400 taken from operator-supplied context and prior-research notes indicate zero public footprint — verify with operator"
- "TCP/IP transport parameters (port number, connection mode, Telnet vs raw socket, line ending negotiation) not stated in source"
- "firmware / software version compatibility not stated"
- "command timing, inter-command delays, warm-up/cooldown windows after power on not documented"
- "response timeout values not specified"
- "EDID Reminder, HDMI 1/2 EDID, HDBaseT EDID rows in source carry no command codes or values"
- "network config commands (Subnet Mask, Gateway, DNS, Apply) carry no ~XX codes in source"
- "TCP/Telnet port number not stated in source"
- "no multi-step sequences described explicitly in source"
- "source contains no explicit safety warnings, interlock procedures,"
- "TCP/Telnet port number not stated — do not assume 23"
- "HTTP control path/base URL not stated (only an on/off toggle ~XX459)"
- "exact <CR> handling over Telnet (raw vs negotiated) not specified"
- "response timeout and inter-command spacing not specified"
- "model HCPro-3400 has no public footprint per prior research — confirm with operator before publication"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
