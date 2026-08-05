---
spec_id: admin/infocus-corporation-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "InFocus Corporation Series Control Spec"
manufacturer: InFocus
model_family: "Corporation Series"
aliases: []
compatible_with:
  manufacturers:
    - InFocus
  models:
    - "Corporation Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.infocus.com
source_urls:
  - https://cdn.infocus.com/2026/02/b7RCq21d-InFocus_Generic_RS232_Commands.xlsx
retrieved_at: 2026-07-22T06:21:11.308Z
last_checked_at: 2026-07-22T07:36:25.203Z
generated_at: 2026-07-22T07:36:25.203Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full model-to-family mapping not given; source only labels sheets \"Std DLP\", \"IN13xST IN213x INL412x\", and \"IN102x In103x IN104x IN105x\" without cross-walking to \"Corporation Series\" SKU list"
  - "source does not document any multi-step macro sequences"
  - "source documents a Security on/off feature with 4-digit password and a"
  - "model-to-family assignment table not provided in source — only sheet titles. No firmware version range given for the Std DLP protocol. The IN102x-105x sheet appears truncated (only commands C00-C0C listed); full catalogue unknown."
verification:
  verdict: verified
  checked_at: 2026-07-22T07:36:25.203Z
  matched_actions: 444
  action_count: 444
  confidence: medium
  summary: "All 444 spec actions have literal wire-token matches in the source; transport fully documented; three-family protocol comprehensively represented. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# InFocus Corporation Series Control Spec

## Summary
RS-232 control protocol for InFocus Corporation Series projectors. The source bundles three distinct command-set families — "Std DLP" (9600 baud, ~XXXX 4-digit ASCII), IN13xST / IN213x / INL314x / INL412x (19200 baud, parenthesized ASCII mnemonics with optional `!` return and `?` query suffixes), and IN102x / IN103x / IN104x / IN105x (19200 baud, two-byte hex `Cn` opcodes). All three use 8-N-1, no flow control. Specific model-to-family mapping and full command coverage for the IN102x-105x sheet are partial in the source.

<!-- UNRESOLVED: full model-to-family mapping not given; source only labels sheets "Std DLP", "IN13xST IN213x INL412x", and "IN102x In103x IN104x IN105x" without cross-walking to "Corporation Series" SKU list -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # Std DLP family; IN13xST and IN102x-105x families use 19200 baud per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from power command examples (S001 ~0000 1/0, PWR1/PWR0, C00/C01/C02)
- routable  # inferred from input/routing command examples (S010 ~0012 n, SRC n, C03-C08)
- queryable  # inferred from query command examples (PWR?, SRC?, VOL?, R001-R028 ~XXXXX 1, ...)
- levelable  # inferred from volume/brightness/contrast control commands (S049, VOL/BRT/CON)
```

## Actions
```yaml
# ===== Std DLP family (RS-232, 9600 baud, ASCII: ~XXXX <param> 0x0D) =====
# Format: ~ <op4> <value> <CR>

- id: std_power_on
  label: Power On
  kind: action
  command: "~0000 1"  # ASCII; HEX 7E 30 30 30 30 20 31 0D
  params: []

- id: std_power_off
  label: Power Off
  kind: action
  command: "~0000 0"  # ASCII; HEX 7E 30 30 30 30 20 30 0D (0/2 for backward compatible)
  params: []

- id: std_power_on_with_password
  label: Power On with Password
  kind: action
  command: "~0000 1 ~{password}"  # password ~0000 (a=7E 30 30 30 30) ~9999 (a=7E 39 39 39 39)
  params:
    - name: password
      type: string
      description: Four-digit password token, formatted as `~nnnn` (e.g. `~1234`)

- id: std_resync
  label: Resync
  kind: action
  command: "~0001 1"  # HEX 7E 30 30 30 31 20 31 0D
  params: []

- id: std_av_mute_on
  label: AV Mute On
  kind: action
  command: "~0002 1"  # HEX 7E 30 30 30 32 20 31 0D
  params: []

- id: std_av_mute_off
  label: AV Mute Off
  kind: action
  command: "~0002 0"  # HEX 7E 30 30 30 32 20 30 0D (0/2 for backward compatible)
  params: []

- id: std_mute_on
  label: Mute On
  kind: action
  command: "~0003 1"  # HEX 7E 30 30 30 33 20 31 0D
  params: []

- id: std_mute_off
  label: Mute Off
  kind: action
  command: "~0003 0"  # HEX 7E 30 30 30 33 20 30 0D (0/2 for backward compatible)
  params: []

- id: std_freeze
  label: Freeze
  kind: action
  command: "~0004 1"  # HEX 7E 30 30 30 34 20 31 0D
  params: []

- id: std_unfreeze
  label: Unfreeze
  kind: action
  command: "~0004 0"  # HEX 7E 30 30 30 34 20 30 0D (0/2 for backward compatible)
  params: []

- id: std_zoom_plus
  label: Zoom Plus
  kind: action
  command: "~0005 1"  # HEX 7E 30 30 30 35 20 31 0D
  params: []

- id: std_zoom_minus
  label: Zoom Minus
  kind: action
  command: "~0006 1"  # HEX 7E 30 30 30 36 20 31 0D
  params: []

- id: std_ir_function_off
  label: IR Function Off
  kind: action
  command: "~0011 0"  # HEX 7E 30 30 31 31 20 30 0D
  params: []

- id: std_ir_function_on
  label: IR Function On
  kind: action
  command: "~0011 1"  # HEX 7E 30 30 31 31 20 31 0D
  params: []

# ----- Direct Source Commands (S010) - each value is a separate source row -----
- id: std_source_vga
  label: Select Source VGA
  kind: action
  command: "~0012 5"  # HEX 7E 30 30 31 32 20 35 0D
  params: []

- id: std_source_vga2
  label: Select Source VGA 2
  kind: action
  command: "~0012 6"  # HEX 7E 30 30 31 32 20 36 0D
  params: []

- id: std_source_svideo
  label: Select Source S-Video
  kind: action
  command: "~0012 9"  # HEX 7E 30 30 31 32 20 39 0D
  params: []

- id: std_source_video
  label: Select Source Video
  kind: action
  command: "~0012 10"  # HEX 7E 30 30 31 32 20 31 30 0D
  params: []

- id: std_source_hdmi1
  label: Select Source HDMI (HDMI 1)
  kind: action
  command: "~0012 1"  # HEX 7E 30 30 31 32 20 31 0D
  params: []

- id: std_source_hdmi2
  label: Select Source HDMI 2
  kind: action
  command: "~0012 15"  # HEX 7E 30 30 31 32 20 31 35 0D
  params: []

- id: std_source_hdbaset
  label: Select Source HDBaseT
  kind: action
  command: "~0012 21"  # HEX 7E 30 30 31 32 20 32 31 0D
  params: []

# ----- Picture Mode (S011) - each value is a separate source row -----
- id: std_picture_mode_presentation
  label: Picture Mode Presentation
  kind: action
  command: "~0020 1"  # HEX 7E 30 30 32 30 20 31 0D
  params: []

- id: std_picture_mode_bright
  label: Picture Mode Bright
  kind: action
  command: "~0020 2"  # HEX 7E 30 30 32 30 20 32 0D
  params: []

- id: std_picture_mode_movie
  label: Picture Mode Movie (Cinema)
  kind: action
  command: "~0020 3"  # HEX 7E 30 30 32 30 20 33 0D
  params: []

- id: std_picture_mode_srgb
  label: Picture Mode sRGB
  kind: action
  command: "~0020 4"  # HEX 7E 30 30 32 30 20 34 0D
  params: []

- id: std_picture_mode_dicom_sim
  label: Picture Mode DICOM SIM.
  kind: action
  command: "~0020 13"  # HEX 7E 30 30 32 30 20 31 33 0D
  params: []

- id: std_picture_mode_user
  label: Picture Mode User
  kind: action
  command: "~0020 5"  # HEX 7E 30 30 32 30 20 35 0D
  params: []

- id: std_picture_mode_3d
  label: Picture Mode 3D
  kind: action
  command: "~0020 9"  # HEX 7E 30 30 32 30 20 39 0D
  params: []

- id: std_picture_mode_game
  label: Picture Mode Game (Football)
  kind: action
  command: "~0020 12"  # HEX 7E 30 30 32 30 20 31 32 0D
  params: []

- id: std_picture_mode_isf_day
  label: Picture Mode ISF Day
  kind: action
  command: "~0020 14"  # HEX 7E 30 30 32 30 20 31 34 0D
  params: []

- id: std_picture_mode_isf_night
  label: Picture Mode ISF Night
  kind: action
  command: "~0020 15"  # HEX 7E 30 30 32 30 20 31 35 0D
  params: []

- id: std_picture_mode_hdr_sim
  label: Picture Mode HDR SIM.
  kind: action
  command: "~0020 22"  # HEX 7E 30 30 32 30 20 32 32 0D
  params: []

- id: std_picture_mode_hlg_sim
  label: Picture Mode HLG SIM.
  kind: action
  command: "~0020 26"  # HEX 7E 30 30 32 30 20 32 36 0D
  params: []

- id: std_picture_mode_rec709
  label: Picture Mode Rec.709
  kind: action
  command: "~0020 27"  # HEX 7E 30 30 32 30 20 32 37 0D
  params: []

- id: std_picture_mode_dark_cinema
  label: Picture Mode Dark Cinema
  kind: action
  command: "~0020 28"  # HEX 7E 30 30 32 30 20 32 38 0D
  params: []

- id: std_picture_mode_football
  label: Picture Mode Football
  kind: action
  command: "~0020 29"  # HEX 7E 30 30 32 30 20 32 39 0D
  params: []

# ----- Parameterised numeric setters -----
- id: std_brightness_set
  label: Brightness (numeric)
  kind: action
  command: "~0021 {n}"  # HEX 7E 30 30 32 31 20 a 0D; n = -50 (a=2D 35 30) ~ 50 (a=35 30)
  params:
    - name: n
      type: integer
      description: Signed integer from -50 to +50 (ASCII-magnitude, e.g. -50 → "2D 35 30")

- id: std_contrast_set
  label: Contrast (numeric)
  kind: action
  command: "~0022 {n}"  # HEX 7E 30 30 32 32 20 a 0D; n = -50 (a=2D 35 30) ~ 50 (a=35 30)
  params:
    - name: n
      type: integer
      description: Signed integer from -50 to +50

- id: std_sharpness_set
  label: Sharpness (numeric)
  kind: action
  command: "~0023 {n}"  # HEX 7E 30 30 32 33 20 a 0D; n = 1 (a=31) ~ 15 (a=31 35)
  params:
    - name: n
      type: integer
      description: Integer 1 to 15

- id: std_rgb_red_gain
  label: RGB Gain/Bias Red Gain
  kind: action
  command: "~0024 {n}"  # HEX 7E 30 30 32 34 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_rgb_green_gain
  label: RGB Gain/Bias Green Gain
  kind: action
  command: "~0025 {n}"  # HEX 7E 30 30 32 35 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_rgb_blue_gain
  label: RGB Gain/Bias Blue Gain
  kind: action
  command: "~0026 {n}"  # HEX 7E 30 30 32 36 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_rgb_red_bias
  label: RGB Gain/Bias Red Bias
  kind: action
  command: "~0027 {n}"  # HEX 7E 30 30 32 37 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_rgb_green_bias
  label: RGB Gain/Bias Green Bias
  kind: action
  command: "~0028 {n}"  # HEX 7E 30 30 32 38 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_rgb_blue_bias
  label: RGB Gain/Bias Blue Bias
  kind: action
  command: "~0029 {n}"  # HEX 7E 30 30 32 39 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_brilliant_color
  label: BrilliantColor (numeric)
  kind: action
  command: "~0034 {n}"  # HEX 7E 30 30 33 34 20 a 0D; n = 1 (a=30) ~ 10 (a=31 30)
  params:
    - name: n
      type: integer
      description: Integer 1 to 10

# ----- Gamma (S022) - each value is a separate source row -----
- id: std_gamma_film
  label: Gamma Film
  kind: action
  command: "~0035 1"  # HEX 7E 30 30 33 35 20 31 0D
  params: []

- id: std_gamma_video
  label: Gamma Video
  kind: action
  command: "~0035 2"  # HEX 7E 30 30 33 35 20 32 0D
  params: []

- id: std_gamma_graphics
  label: Gamma Graphics
  kind: action
  command: "~0035 3"  # HEX 7E 30 30 33 35 20 33 0D
  params: []

- id: std_gamma_standard
  label: Gamma Standard (2.2)
  kind: action
  command: "~0035 4"  # HEX 7E 30 30 33 35 20 34 0D
  params: []

- id: std_gamma_1_8
  label: Gamma 1.8
  kind: action
  command: "~0035 5"  # HEX 7E 30 30 33 35 20 35 0D
  params: []

- id: std_gamma_2_0
  label: Gamma 2.0
  kind: action
  command: "~0035 6"  # HEX 7E 30 30 33 35 20 36 0D
  params: []

- id: std_gamma_2_4
  label: Gamma 2.4
  kind: action
  command: "~0035 12"  # HEX 7E 30 30 33 35 20 31 32 0D
  params: []

- id: std_gamma_2_6
  label: Gamma 2.6
  kind: action
  command: "~0035 8"  # HEX 7E 30 30 33 35 20 38 0D
  params: []

# ----- Colour Temp (S023) - each value is a separate source row -----
- id: std_colour_temp_warm
  label: Colour Temp. Warm
  kind: action
  command: "~0036 1"  # HEX 7E 30 30 33 36 20 31 0D
  params: []

- id: std_colour_temp_medium
  label: Colour Temp. Medium (Standard)
  kind: action
  command: "~0036 2"  # HEX 7E 30 30 33 36 20 32 0D
  params: []

- id: std_colour_temp_cool
  label: Colour Temp. Cool
  kind: action
  command: "~0036 4"  # HEX 7E 30 30 33 36 20 34 0D
  params: []

- id: std_colour_temp_cold
  label: Colour Temp. Cold
  kind: action
  command: "~0036 3"  # HEX 7E 30 30 33 36 20 33 0D
  params: []

# ----- Colour Space (S024) - each value is a separate source row -----
- id: std_colour_space_auto
  label: Colour Space Auto
  kind: action
  command: "~0037 1"  # HEX 7E 30 30 33 37 20 31 0D
  params: []

- id: std_colour_space_rgb_full
  label: Colour Space RGB(0-255)
  kind: action
  command: "~0037 2"  # HEX 7E 30 30 33 37 20 32 0D
  params: []

- id: std_colour_space_yuv
  label: Colour Space YUV
  kind: action
  command: "~0037 3"  # HEX 7E 30 30 33 37 20 33 0D
  params: []

- id: std_colour_space_rgb_limited
  label: Colour Space RGB(16-235)
  kind: action
  command: "~0037 4"  # HEX 7E 30 30 33 37 20 34 0D
  params: []

- id: std_tint_set
  label: Tint (numeric)
  kind: action
  command: "~0044 {n}"  # HEX 7E 30 30 34 34 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_saturation_set
  label: Colour (Saturation, numeric)
  kind: action
  command: "~0045 {n}"  # HEX 7E 30 30 34 35 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

# ----- Brightness ± / Contrast ± - each source row separate -----
- id: std_brightness_down
  label: Brightness -
  kind: action
  command: "~0046 1"  # HEX 7E 30 30 34 36 20 31 0D
  params: []

- id: std_brightness_up
  label: Brightness +
  kind: action
  command: "~0046 2"  # HEX 7E 30 30 34 36 20 32 0D
  params: []

- id: std_contrast_down
  label: Contrast -
  kind: action
  command: "~0047 1"  # HEX 7E 30 30 34 37 20 31 0D
  params: []

- id: std_contrast_up
  label: Contrast +
  kind: action
  command: "~0047 2"  # HEX 7E 30 30 34 37 20 32 0D
  params: []

# ----- Four corners (S029) - each source row separate -----
- id: std_four_corners_topleft_right
  label: Four corners top-left (right+)
  kind: action
  command: "~0059 1"  # HEX 7E 30 30 35 39 20 31 0D
  params: []

- id: std_four_corners_topleft_left
  label: Four corners top-left (left+)
  kind: action
  command: "~0059 2"  # HEX 7E 30 30 35 39 20 32 0D
  params: []

- id: std_four_corners_topleft_up
  label: Four corners top-left (up +)
  kind: action
  command: "~0059 3"  # HEX 7E 30 30 35 39 20 33 0D
  params: []

- id: std_four_corners_topleft_down
  label: Four corners top-left (down +)
  kind: action
  command: "~0059 4"  # HEX 7E 30 30 35 39 20 34 0D
  params: []

- id: std_four_corners_topright_right
  label: Four corners top right (right +)
  kind: action
  command: "~0059 5"  # HEX 7E 30 30 35 39 20 35 0D
  params: []

- id: std_four_corners_topright_left
  label: Four corners top right (left +)
  kind: action
  command: "~0059 6"  # HEX 7E 30 30 35 39 20 36 0D
  params: []

- id: std_four_corners_topright_up
  label: Four corners top right (up +)
  kind: action
  command: "~0059 7"  # HEX 7E 30 30 35 39 20 37 0D
  params: []

- id: std_four_corners_topright_down
  label: Four corners top right (down +)
  kind: action
  command: "~0059 8"  # HEX 7E 30 30 35 39 20 38 0D
  params: []

- id: std_four_corners_bottomleft_right
  label: Four corners Bottom-left (right+)
  kind: action
  command: "~0059 9"  # HEX 7E 30 30 35 39 20 39 0D
  params: []

- id: std_four_corners_bottomleft_left
  label: Four corners Bottom-left (left+)
  kind: action
  command: "~0059 10"  # HEX 7E 30 30 35 39 20 31 30 0D
  params: []

- id: std_four_corners_bottomleft_up
  label: Four corners Bottom-left (Up+)
  kind: action
  command: "~0059 11"  # HEX 7E 30 30 35 39 20 31 31 0D
  params: []

- id: std_four_corners_bottomleft_down
  label: Four corners Bottom-left (down+)
  kind: action
  command: "~0059 12"  # HEX 7E 30 30 35 39 20 31 32 0D
  params: []

- id: std_four_corners_bottomright_right
  label: Four corners Bottom-right (right+)
  kind: action
  command: "~0059 13"  # HEX 7E 30 30 35 39 20 31 33 0D
  params: []

- id: std_four_corners_bottomright_left
  label: Four corners Bottom-right (left+)
  kind: action
  command: "~0059 14"  # HEX 7E 30 30 35 39 20 31 34 0D
  params: []

- id: std_four_corners_bottomright_up
  label: Four corners Bottom-right (Up+)
  kind: action
  command: "~0059 15"  # HEX 7E 30 30 35 39 20 31 35 0D
  params: []

- id: std_four_corners_bottomright_down
  label: Four corners Bottom-right (down+)
  kind: action
  command: "~0059 16"  # HEX 7E 30 30 35 39 20 31 36 0D
  params: []

# ----- Aspect Ratio (S030) - each value is a separate source row -----
- id: std_aspect_4_3
  label: Aspect 4:3
  kind: action
  command: "~0060 1"  # HEX 7E 30 30 36 30 20 31 0D
  params: []

- id: std_aspect_16_9
  label: Aspect 16:9
  kind: action
  command: "~0060 2"  # HEX 7E 30 30 36 30 20 32 0D
  params: []

- id: std_aspect_16_10
  label: Aspect 16:10
  kind: action
  command: "~0060 3"  # HEX 7E 30 30 36 30 20 33 0D
  params: []

- id: std_aspect_lbx
  label: Aspect LBX
  kind: action
  command: "~0060 5"  # HEX 7E 30 30 36 30 20 35 0D
  params: []

- id: std_aspect_native
  label: Aspect Native
  kind: action
  command: "~0060 6"  # HEX 7E 30 30 36 30 20 36 0D
  params: []

- id: std_aspect_auto
  label: Aspect Auto
  kind: action
  command: "~0060 7"  # HEX 7E 30 30 36 30 20 37 0D
  params: []

- id: std_aspect_21_9
  label: Aspect 21:9
  kind: action
  command: "~0060 16"  # HEX 7E 30 30 36 30 20 31 36 0D
  params: []

- id: std_aspect_full
  label: Aspect FULL
  kind: action
  command: "~0060 19"  # HEX 7E 30 30 36 30 20 31 39 0D
  params: []

- id: std_edge_mask
  label: Edge Mask
  kind: action
  command: "~0061 {n}"  # HEX 7E 30 30 36 31 20 a 0D; n = 0 ~ 10
  params:
    - name: n
      type: integer
      description: Integer 0 to 10

- id: std_zoom
  label: Zoom
  kind: action
  command: "~0062 {n}"  # HEX 7E 30 30 36 32 20 a 0D; n = -5 (a=2D 35) ~ 25 (a=32 35)
  params:
    - name: n
      type: integer
      description: Integer -5 to 25

- id: std_h_image_shift
  label: H Image Shift
  kind: action
  command: "~0063 {n}"  # HEX 7E 30 30 36 33 20 a 0D; n = -100 ~ 100
  params:
    - name: n
      type: integer
      description: Integer -100 to 100

- id: std_v_image_shift
  label: V Image Shift
  kind: action
  command: "~0064 {n}"  # HEX 7E 30 30 36 34 20 a 0D; n = -100 ~ 100
  params:
    - name: n
      type: integer
      description: Integer -100 to 100

- id: std_h_keystone
  label: H Keystone
  kind: action
  command: "~0065 {n}"  # HEX 7E 30 30 36 35 20 a 0D; n = -30 ~ 30
  params:
    - name: n
      type: integer
      description: Integer -30 to 30

- id: std_v_keystone
  label: V Keystone
  kind: action
  command: "~0066 {n}"  # HEX 7E 30 30 36 36 20 a 0D; RT: n=-40~40; ST: n=-20~20; for INL2156,58,59: n=-30~30
  params:
    - name: n
      type: integer
      description: Integer; range depends on model variant (RT -40..40, ST -20..20, INL2156/58/59 -30..30)

- id: std_auto_keystone_on
  label: Auto Keystone On
  kind: action
  command: "~0069 1"  # HEX 7E 30 30 36 39 20 31 0D
  params: []

- id: std_auto_keystone_off
  label: Auto Keystone Off
  kind: action
  command: "~0069 0"  # HEX 7E 30 30 36 39 20 30 0D (0/2 for backward compatible)
  params: []

# ----- Language (S038) - each value is a separate source row -----
- id: std_language_english
  label: Language English
  kind: action
  command: "~0070 1"  # HEX 7E 30 30 37 30 20 31 0D
  params: []

- id: std_language_deutsch
  label: Language Deutsch
  kind: action
  command: "~0070 2"  # HEX 7E 30 30 37 30 20 32 0D
  params: []

- id: std_language_francais
  label: Language Français
  kind: action
  command: "~0070 3"  # HEX 7E 30 30 37 30 20 33 0D
  params: []

- id: std_language_italiana
  label: Language Italiana
  kind: action
  command: "~0070 4"  # HEX 7E 30 30 37 30 20 34 0D
  params: []

- id: std_language_espanol
  label: Language Español
  kind: action
  command: "~0070 5"  # HEX 7E 30 30 37 30 20 35 0D
  params: []

- id: std_language_portugues
  label: Language Português
  kind: action
  command: "~0070 6"  # HEX 7E 30 30 37 30 20 36 0D
  params: []

- id: std_language_polski
  label: Language Polski
  kind: action
  command: "~0070 7"  # HEX 7E 30 30 37 30 20 37 0D
  params: []

- id: std_language_nederlands
  label: Language Nederlands
  kind: action
  command: "~0070 8"  # HEX 7E 30 30 37 30 20 38 0D
  params: []

- id: std_language_svenska
  label: Language Svenska
  kind: action
  command: "~0070 9"  # HEX 7E 30 30 37 30 20 39 0D
  params: []

- id: std_language_norsk_dansk
  label: Language Norsk/Dansk
  kind: action
  command: "~0070 10"  # HEX 7E 30 30 37 30 20 31 30 0D
  params: []

- id: std_language_suomi
  label: Language Suomi
  kind: action
  command: "~0070 11"  # HEX 7E 30 30 37 30 20 31 31 0D
  params: []

- id: std_language_greek
  label: Language ελληνικά
  kind: action
  command: "~0070 12"  # HEX 7E 30 30 37 30 20 31 32 0D
  params: []

- id: std_language_traditional_chinese
  label: Language 繁體中文
  kind: action
  command: "~0070 13"  # HEX 7E 30 30 37 30 20 31 33 0D
  params: []

- id: std_language_simplified_chinese
  label: Language 簡体中文
  kind: action
  command: "~0070 14"  # HEX 7E 30 30 37 30 20 31 34 0D
  params: []

- id: std_language_japanese
  label: Language 日本語
  kind: action
  command: "~0070 15"  # HEX 7E 30 30 37 30 20 31 35 0D
  params: []

- id: std_language_korean
  label: Language 한국어
  kind: action
  command: "~0070 16"  # HEX 7E 30 30 37 30 20 31 36 0D
  params: []

- id: std_language_russian
  label: Language Русский
  kind: action
  command: "~0070 17"  # HEX 7E 30 30 37 30 20 31 37 0D
  params: []

- id: std_language_magyar
  label: Language Magyar
  kind: action
  command: "~0070 18"  # HEX 7E 30 30 37 30 20 31 38 0D
  params: []

- id: std_language_cestina
  label: Language Čeština
  kind: action
  command: "~0070 19"  # HEX 7E 30 30 37 30 20 31 39 0D
  params: []

- id: std_language_arabic
  label: Language عربي
  kind: action
  command: "~0070 20"  # HEX 7E 30 30 37 30 20 32 30 0D
  params: []

- id: std_language_thai
  label: Language ไทย
  kind: action
  command: "~0070 21"  # HEX 7E 30 30 37 30 20 32 31 0D
  params: []

- id: std_language_turkish
  label: Language Türkçe
  kind: action
  command: "~0070 22"  # HEX 7E 30 30 37 30 20 32 32 0D
  params: []

- id: std_language_farsi
  label: Language فارسی
  kind: action
  command: "~0070 23"  # HEX 7E 30 30 37 30 20 32 33 0D
  params: []

- id: std_language_hindi
  label: Language हिंदी
  kind: action
  command: "~0070 24"  # HEX 7E 30 30 37 30 20 32 34 0D
  params: []

- id: std_language_vietnamese
  label: Language Tiếng Việt
  kind: action
  command: "~0070 25"  # HEX 7E 30 30 37 30 20 32 35 0D
  params: []

- id: std_language_bahasa_indonesia
  label: Language Bahasa Indonesia
  kind: action
  command: "~0070 26"  # HEX 7E 30 30 37 30 20 32 36 0D
  params: []

- id: std_language_romana
  label: Language Română
  kind: action
  command: "~0070 27"  # HEX 7E 30 30 37 30 20 32 37 0D
  params: []

- id: std_language_slovencina
  label: Language Slovenčina
  kind: action
  command: "~0070 28"  # HEX 7E 30 30 37 30 20 32 38 0D
  params: []

- id: std_language_pilipino
  label: Language Pilipino
  kind: action
  command: "~0070 29"  # HEX 7E 30 30 37 30 20 32 39 0D
  params: []

- id: std_language_melayu
  label: Language Melayu
  kind: action
  command: "~0070 30"  # HEX 7E 30 30 37 30 20 33 30 0D
  params: []

- id: std_language_bangla
  label: Language বাংলা
  kind: action
  command: "~0070 31"  # HEX 7E 30 30 37 30 20 33 31 0D
  params: []

- id: std_language_norsk
  label: Language Norsk
  kind: action
  command: "~0070 32"  # HEX 7E 30 30 37 30 20 33 32 0D
  params: []

- id: std_language_dansk
  label: Language Dansk
  kind: action
  command: "~0070 33"  # HEX 7E 30 30 37 30 20 33 33 0D
  params: []

- id: std_language_blank
  label: Language (blank)
  kind: action
  command: "~0070 34"  # HEX 7E 30 30 37 30 20 33 34 0D
  params: []

# ----- Projection (S039) - each value is a separate source row -----
- id: std_projection_front
  label: Projection Front
  kind: action
  command: "~0071 1"  # HEX 7E 30 30 37 31 20 31 0D
  params: []

- id: std_projection_rear
  label: Projection Rear
  kind: action
  command: "~0071 2"  # HEX 7E 30 30 37 31 20 32 0D
  params: []

- id: std_projection_front_ceiling
  label: Projection Front-Ceiling
  kind: action
  command: "~0071 3"  # HEX 7E 30 30 37 31 20 33 0D
  params: []

- id: std_projection_rear_ceiling
  label: Projection Rear-Ceiling
  kind: action
  command: "~0071 4"  # HEX 7E 30 30 37 31 20 34 0D
  params: []

# ----- Menu Location (S040) - each value is a separate source row -----
- id: std_menu_location_top_left
  label: Menu Location Top Left
  kind: action
  command: "~0072 1"  # HEX 7E 30 30 37 32 20 31 0D
  params: []

- id: std_menu_location_top_right
  label: Menu Location Top Right
  kind: action
  command: "~0072 2"  # HEX 7E 30 30 37 32 20 32 0D
  params: []

- id: std_menu_location_centre
  label: Menu Location Centre
  kind: action
  command: "~0072 3"  # HEX 7E 30 30 37 32 20 33 0D
  params: []

- id: std_menu_location_bottom_left
  label: Menu Location Bottom Left
  kind: action
  command: "~0072 4"  # HEX 7E 30 30 37 32 20 34 0D
  params: []

- id: std_menu_location_bottom_right
  label: Menu Location Bottom Right
  kind: action
  command: "~0072 5"  # HEX 7E 30 30 37 32 20 35 0D
  params: []

- id: std_signal_frequency
  label: Signal Frequency
  kind: action
  command: "~0073 {n}"  # HEX 7E 30 30 37 33 20 a 0D; n = -5 ~ 5 (by signal)
  params:
    - name: n
      type: integer
      description: Integer -5 to 5 (by signal)

- id: std_signal_phase
  label: Signal Phase
  kind: action
  command: "~0074 {n}"  # HEX 7E 30 30 37 34 20 a 0D; n = 0 ~ 63 (by signal)
  params:
    - name: n
      type: integer
      description: Integer 0 to 63 (by signal)

- id: std_signal_h_position
  label: Signal H. Position
  kind: action
  command: "~0075 {n}"  # HEX 7E 30 30 37 35 20 a 0D; n = -5 ~ 5 (by timing)
  params:
    - name: n
      type: integer
      description: Integer -5 to 5 (by timing)

- id: std_signal_v_position
  label: Signal V. Position
  kind: action
  command: "~0076 {n}"  # HEX 7E 30 30 37 36 20 a 0D; n = -5 ~ 5 (by timing)
  params:
    - name: n
      type: integer
      description: Integer -5 to 5 (by timing)

- id: std_security_timer
  label: Security Timer Month/Day/Hour
  kind: action
  command: "~0077 {mm}{dd}{hh}"  # HEX 7E 30 30 37 37 20 aabbcc 0D
  params:
    - name: mm
      type: integer
      description: Month 00-12
    - name: dd
      type: integer
      description: Day 00-30
    - name: hh
      type: integer
      description: Hour 00-24

- id: std_security_on
  label: Security On with password
  kind: action
  command: "~0078 1 ~{password}"  # HEX 7E 30 30 37 38 20 31 20 a 0D
  params:
    - name: password
      type: string
      description: Four-digit password token, formatted as `~nnnn`

- id: std_security_off
  label: Security Off with password
  kind: action
  command: "~0078 0 ~{password}"  # HEX 7E 30 30 37 38 20 30 20 a 0D (0/2 for backward compatible)
  params:
    - name: password
      type: string
      description: Four-digit password token, formatted as `~nnnn`

- id: std_projector_id
  label: Projector ID
  kind: action
  command: "~0079 {n}"  # HEX 7E 30 30 37 39 20 a 0D; n = 00 ~ 99
  params:
    - name: n
      type: integer
      description: Two-digit projector ID 00-99

- id: std_mute_on_alt
  label: Mute On (alt opcode)
  kind: action
  command: "~0080 1"  # HEX 7E 30 30 38 30 20 31 0D
  params: []

- id: std_mute_off_alt
  label: Mute Off (alt opcode)
  kind: action
  command: "~0080 0"  # HEX 7E 30 30 38 30 20 30 0D (0/2 for backward compatible)
  params: []

- id: std_volume
  label: Volume (Audio)
  kind: action
  command: "~0081 {n}"  # HEX 7E 30 30 38 31 20 a 0D; n = 0 ~ 10
  params:
    - name: n
      type: integer
      description: Integer 0 to 10

# ----- Logo (S050) - each value is a separate source row -----
- id: std_logo_default
  label: Logo Default
  kind: action
  command: "~0082 1"  # HEX 7E 30 30 38 32 20 31 0D
  params: []

- id: std_logo_user
  label: Logo User
  kind: action
  command: "~0082 2"  # HEX 7E 30 30 38 32 20 32 0D
  params: []

- id: std_logo_neutral
  label: Logo Neutral
  kind: action
  command: "~0082 3"  # HEX 7E 30 30 38 32 20 33 0D
  params: []

# ----- Projection Location (S051) - each value is a separate source row -----
- id: std_projection_location_auto
  label: Projection Location Auto
  kind: action
  command: "~0084 0"  # HEX 7E 30 30 38 34 20 30 0D
  params: []

- id: std_projection_location_desktop
  label: Projection Location Desktop
  kind: action
  command: "~0084 1"  # HEX 7E 30 30 38 34 20 31 0D
  params: []

- id: std_projection_location_ceiling
  label: Projection Location Ceiling
  kind: action
  command: "~0084 2"  # HEX 7E 30 30 38 34 20 32 0D
  params: []

# ----- Closed Captioning (S052) - each value is a separate source row -----
- id: std_closed_captioning_off
  label: Closed Captioning Off
  kind: action
  command: "~0088 0"  # HEX 7E 30 30 38 38 20 30 0D
  params: []

- id: std_closed_captioning_cc1
  label: Closed Captioning CC1
  kind: action
  command: "~0088 1"  # HEX 7E 30 30 38 38 20 31 0D
  params: []

- id: std_closed_captioning_cc2
  label: Closed Captioning CC2
  kind: action
  command: "~0088 2"  # HEX 7E 30 30 38 38 20 32 0D
  params: []

# ----- Screen Type (S053) - each value is a separate source row -----
- id: std_screen_type_16_10
  label: Screen Type 16:10 (WXGA/WUXGA only)
  kind: action
  command: "~0090 1"  # HEX 7E 30 30 39 31 20 31 0D
  params: []

- id: std_screen_type_16_9
  label: Screen Type 16:9 (WXGA/WUXGA only)
  kind: action
  command: "~0090 0"  # HEX 7E 30 30 39 31 20 30 0D
  params: []

# ----- Signal Automatic (S054) - each value is a separate source row -----
- id: std_signal_automatic_on
  label: Signal Automatic On
  kind: action
  command: "~0091 1"  # HEX 7E 30 30 39 31 20 31 0D
  params: []

- id: std_signal_automatic_off
  label: Signal Automatic Off
  kind: action
  command: "~0091 0"  # HEX 7E 30 30 39 31 20 30 0D
  params: []

- id: std_high_altitude_on
  label: High Altitude On
  kind: action
  command: "~00101 1"  # HEX 7E 30 30 31 30 31 20 31 0D
  params: []

- id: std_high_altitude_off
  label: High Altitude Off
  kind: action
  command: "~00101 0"  # HEX 7E 30 30 31 30 31 20 30 0D (0/2 for backward compatible)
  params: []

- id: std_information_hide_on
  label: Information Hide On
  kind: action
  command: "~00102 1"  # HEX 7E 30 30 31 30 32 20 31 0D
  params: []

- id: std_information_hide_off
  label: Information Hide Off
  kind: action
  command: "~00102 0"  # HEX 7E 30 30 31 30 32 20 30 0D (0/2 for backward compatible)
  params: []

- id: std_keypad_lock_on
  label: Keypad Lock On
  kind: action
  command: "~00103 1"  # HEX 7E 30 30 31 30 33 20 31 0D
  params: []

- id: std_keypad_lock_off
  label: Keypad Lock Off
  kind: action
  command: "~00103 0"  # HEX 7E 30 30 31 30 33 20 30 0D (0/2 for backward compatible)
  params: []

# ----- Background Color (S058) - each value is a separate source row -----
- id: std_background_color_none
  label: Background Color None
  kind: action
  command: "~00104 0"  # HEX 7E 30 30 31 30 34 20 30 0D
  params: []

- id: std_background_color_blue
  label: Background Color Blue
  kind: action
  command: "~00104 1"  # HEX 7E 30 30 31 30 34 20 31 0D
  params: []

- id: std_background_color_black
  label: Background Color Black
  kind: action
  command: "~00104 2"  # HEX 7E 30 30 31 30 34 20 32 0D
  params: []

- id: std_background_color_red
  label: Background Color Red
  kind: action
  command: "~00104 3"  # HEX 7E 30 30 31 30 34 20 33 0D
  params: []

- id: std_background_color_green
  label: Background Color Green
  kind: action
  command: "~00104 4"  # HEX 7E 30 30 31 30 34 20 34 0D
  params: []

- id: std_background_color_white
  label: Background Color White
  kind: action
  command: "~00104 5"  # HEX 7E 30 30 31 30 34 20 35 0D
  params: []

- id: std_background_color_gray
  label: Background Color Gray
  kind: action
  command: "~00104 6"  # HEX 7E 30 30 31 30 34 20 36 0D
  params: []

- id: std_background_color_logo
  label: Background Color Logo
  kind: action
  command: "~00104 7"  # HEX 7E 30 30 31 30 34 20 37 0D
  params: []

- id: std_direct_power_on_on
  label: Direct Power On On
  kind: action
  command: "~00105 1"  # HEX 7E 30 30 31 30 35 20 31 0D
  params: []

- id: std_direct_power_on_off
  label: Direct Power On Off
  kind: action
  command: "~00105 0"  # HEX 7E 30 30 31 30 35 20 30 0D (0/2 for backward compatible)
  params: []

- id: std_auto_power_off
  label: Auto Power Off (min)
  kind: action
  command: "~00106 {n}"  # HEX 7E 30 30 31 30 36 20 a 0D; n = 0 ~ 180 (5 min/step)
  params:
    - name: n
      type: integer
      description: Minutes, 0 to 180 in 5-minute increments

- id: std_sleep_timer
  label: Sleep Timer (min)
  kind: action
  command: "~00107 {n}"  # HEX 7E 30 30 31 30 37 20 a 0D; n = 0 ~ 990 (30 min/step)
  params:
    - name: n
      type: integer
      description: Minutes, 0 to 990 in 30-minute increments

- id: std_lamp_reminder_on
  label: Lamp Reminder On
  kind: action
  command: "~00109 1"  # HEX 7E 30 30 31 30 39 20 31 0D
  params: []

- id: std_lamp_reminder_off
  label: Lamp Reminder Off
  kind: action
  command: "~00109 0"  # HEX 7E 30 30 31 30 39 20 30 0D (0/2 for backward compatible)
  params: []

# ----- Brightness Mode (S063) - each value is a separate source row -----
- id: std_brightness_mode_bright
  label: Brightness Mode Bright
  kind: action
  command: "~00110 1"  # HEX 7E 30 30 31 31 30 20 31 0D
  params: []

- id: std_brightness_mode_eco
  label: Brightness Mode Eco
  kind: action
  command: "~00110 2"  # HEX 7E 30 30 31 31 30 20 32 0D
  params: []

- id: std_brightness_mode_dynamic
  label: Brightness Mode Dynamic
  kind: action
  command: "~00110 4"  # HEX 7E 30 30 31 31 30 20 34 0D
  params: []

- id: std_brightness_mode_power
  label: Brightness Mode Power
  kind: action
  command: "~00110 6"  # HEX 7E 30 30 31 31 30 20 36 0D
  params: []

- id: std_lamp_reset
  label: Lamp Reset
  kind: action
  command: "~00111 1"  # HEX 7E 30 30 31 31 31 20 31 0D
  params: []

- id: std_reset_default_no_password
  label: Reset to Default (Security Off)
  kind: action
  command: "~00112 1"  # HEX 7E 30 30 31 31 32 20 31 0D; works only when security is off
  params: []

- id: std_reset_default_with_password
  label: Reset to Default (Security On, with password)
  kind: action
  command: "~00112 1 ~{password}"  # HEX 7E 30 30 31 31 32 20 31 0D; password required when security is on
  params:
    - name: password
      type: string
      description: Four-digit password token, formatted as `~nnnn`

- id: std_signal_power_on_on
  label: Signal Power On On
  kind: action
  command: "~00113 1"  # HEX 7E 30 30 31 31 33 20 31 0D
  params: []

- id: std_signal_power_on_off
  label: Signal Power On Off
  kind: action
  command: "~00113 0"  # HEX 7E 30 30 31 31 33 20 30 0D (0/2 for backward compatible)
  params: []

# ----- Power Mode Standby (S068) - each value is a separate source row -----
- id: std_power_mode_standby_active
  label: Power Mode Standby Active
  kind: action
  command: "~00114 1"  # HEX 7E 30 30 31 31 34 20 31 0D
  params: []

- id: std_power_mode_standby_eco
  label: Power Mode Standby Eco
  kind: action
  command: "~00114 0"  # HEX 7E 30 30 31 31 34 20 30 0D (<0.5W)
  params: []

- id: std_power_mode_standby_erp_off
  label: Power Mode Standby ErP Off
  kind: action
  command: "~00114 2"  # HEX 7E 30 30 31 31 34 20 32 0D
  params: []

- id: std_quick_resume_on
  label: Quick Resume On
  kind: action
  command: "~00115 1"  # HEX 7E 30 30 31 31 35 20 31 0D
  params: []

- id: std_quick_resume_off
  label: Quick Resume Off
  kind: action
  command: "~00115 0"  # HEX 7E 30 30 31 31 35 20 30 0D (0/2 for backward compatible)
  params: []

# ----- IR Function codes (S070) - each value is a separate source row -----
- id: std_ir_up
  label: IR Function Up
  kind: action
  command: "~00140 10"  # HEX 7E 30 30 31 34 30 20 31 30 0D
  params: []

- id: std_ir_left
  label: IR Function Left
  kind: action
  command: "~00140 11"  # HEX 7E 30 30 31 34 30 20 31 31 0D
  params: []

- id: std_ir_enter
  label: IR Function Enter
  kind: action
  command: "~00140 12"  # HEX 7E 30 30 31 34 30 20 31 32 0D
  params: []

- id: std_ir_right
  label: IR Function Right
  kind: action
  command: "~00140 13"  # HEX 7E 30 30 31 34 30 20 31 33 0D
  params: []

- id: std_ir_down
  label: IR Function Down
  kind: action
  command: "~00140 14"  # HEX 7E 30 30 31 34 30 20 31 34 0D
  params: []

- id: std_ir_keystone_plus
  label: IR Function Keystone +
  kind: action
  command: "~00140 15"  # HEX 7E 30 30 31 34 30 20 31 35 0D
  params: []

- id: std_ir_keystone_minus
  label: IR Function Keystone -
  kind: action
  command: "~00140 16"  # HEX 7E 30 30 31 34 30 20 31 36 0D
  params: []

- id: std_ir_volume_minus
  label: IR Function Volume -
  kind: action
  command: "~00140 17"  # HEX 7E 30 30 31 34 30 20 31 37 0D
  params: []

- id: std_ir_volume_plus
  label: IR Function Volume +
  kind: action
  command: "~00140 18"  # HEX 7E 30 30 31 34 30 20 31 38 0D
  params: []

- id: std_ir_brightness
  label: IR Function Brightness
  kind: action
  command: "~00140 19"  # HEX 7E 30 30 31 34 30 20 31 39 0D
  params: []

- id: std_ir_menu
  label: IR Function Menu
  kind: action
  command: "~00140 20"  # HEX 7E 30 30 31 34 30 20 32 30 0D
  params: []

- id: std_ir_zoom
  label: IR Function Zoom
  kind: action
  command: "~00140 21"  # HEX 7E 30 30 31 34 30 20 32 31 0D
  params: []

- id: std_ir_contrast
  label: IR Function Contrast
  kind: action
  command: "~00140 28"  # HEX 7E 30 30 31 34 30 20 32 38 0D
  params: []

- id: std_ir_source
  label: IR Function Source
  kind: action
  command: "~00140 47"  # HEX 7E 30 30 31 34 30 20 34 37 0D
  params: []

# ----- Test Pattern (S071) - each value is a separate source row -----
- id: std_test_pattern_off
  label: Test Pattern Off
  kind: action
  command: "~00195 0"  # HEX 7E 30 30 31 39 35 20 30 0D
  params: []

- id: std_test_pattern_grid_red
  label: Test Pattern Grid (Red)
  kind: action
  command: "~00195 1"  # HEX 7E 30 30 31 39 35 20 31 0D
  params: []

- id: std_test_pattern_white
  label: Test Pattern White
  kind: action
  command: "~00195 2"  # HEX 7E 30 30 31 39 35 20 32 0D
  params: []

- id: std_test_pattern_grid_green
  label: Test Pattern Grid (Green)
  kind: action
  command: "~00195 3"  # HEX 7E 30 30 31 39 35 20 33 0D
  params: []

- id: std_test_pattern_grid_blue
  label: Test Pattern Grid (Blue)
  kind: action
  command: "~00195 4"  # HEX 7E 30 30 31 39 35 20 34 0D
  params: []

- id: std_test_pattern_test_card
  label: Test Pattern Test Card
  kind: action
  command: "~00195 9"  # HEX 7E 30 30 31 39 35 20 39 0D
  params: []

- id: std_white_level
  label: White Level
  kind: action
  command: "~00200 {n}"  # HEX 7E 30 30 32 30 30 20 a 0D; n = 0 ~ 31
  params:
    - name: n
      type: integer
      description: Integer 0 to 31

- id: std_black_level
  label: Black Level
  kind: action
  command: "~00201 {n}"  # HEX 7E 30 30 32 30 31 20 a 0D; n = -5 ~ 5
  params:
    - name: n
      type: integer
      description: Integer -5 to 5

# ----- IRE (S074) - each value is a separate source row -----
- id: std_ire_0
  label: IRE 0
  kind: action
  command: "~00204 1"  # HEX 7E 30 30 32 30 34 20 31 0D
  params: []

- id: std_ire_7_5
  label: IRE 7.5
  kind: action
  command: "~00204 0"  # HEX 7E 30 30 32 30 34 20 30 0D
  params: []

- id: std_osd_message
  label: Display message on the OSD
  kind: action
  command: "~00210 {text}"  # HEX 7E 30 30 32 31 30 20 a 0D; text 1-30 chars
  params:
    - name: text
      type: string
      description: 1-30 characters of text to display on the OSD

- id: std_colour_setting_reset
  label: Colour Setting Reset
  kind: action
  command: "~00215 1"  # HEX 7E 30 30 32 31 35 20 31 0D
  params: []

# ----- 3D Mode (S077) - each value is a separate source row -----
- id: std_3d_mode_off
  label: 3D Mode Off
  kind: action
  command: "~00230 0"  # HEX 7E 30 30 32 33 30 20 30 0D
  params: []

- id: std_3d_mode_dlp_link
  label: 3D Mode DLP-Link
  kind: action
  command: "~00230 1"  # HEX 7E 30 30 32 33 30 20 31 0D
  params: []

- id: std_3d_sync_invert_off
  label: 3D Sync Invert Off
  kind: action
  command: "~00231 0"  # HEX 7E 30 30 32 33 31 20 30 0D
  params: []

- id: std_3d_sync_invert_on
  label: 3D Sync Invert On
  kind: action
  command: "~00231 1"  # HEX 7E 30 30 32 33 31 20 31 0D
  params: []

- id: std_information_menu_on
  label: Information Menu On
  kind: action
  command: "~00313 1"  # HEX 7E 30 30 33 31 33 20 31 0D
  params: []

- id: std_information_menu_off
  label: Information Menu Off
  kind: action
  command: "~00313 0"  # HEX 7E 30 30 33 31 33 20 30 0D (0/2 for backward compatible)
  params: []

- id: std_optional_filter_installed_yes
  label: Optional Filter Installed Yes
  kind: action
  command: "~00320 1"  # HEX 7E 30 30 33 32 30 20 31 0D
  params: []

- id: std_optional_filter_installed_no
  label: Optional Filter Installed No
  kind: action
  command: "~00320 0"  # HEX 7E 30 30 33 32 30 20 30 0D (0/2 for backward compatible)
  params: []

# ----- Filter Reminder (S081) - each value is a separate source row -----
- id: std_filter_reminder_off
  label: Filter Reminder Off
  kind: action
  command: "~00322 0"  # HEX 7E 30 30 33 32 32 20 30 0D
  params: []

- id: std_filter_reminder_300hr
  label: Filter Reminder 300hr
  kind: action
  command: "~00322 1"  # HEX 7E 30 30 33 32 32 20 31 0D
  params: []

- id: std_filter_reminder_500hr
  label: Filter Reminder 500hr
  kind: action
  command: "~00322 2"  # HEX 7E 30 30 33 32 32 20 32 0D
  params: []

- id: std_filter_reminder_800hr
  label: Filter Reminder 800hr
  kind: action
  command: "~00322 3"  # HEX 7E 30 30 33 32 32 20 33 0D
  params: []

- id: std_filter_reminder_1000hr
  label: Filter Reminder 1000hr
  kind: action
  command: "~00322 4"  # HEX 7E 30 30 33 32 32 20 34 0D
  params: []

- id: std_filter_reset
  label: Filter Reset
  kind: action
  command: "~00323 1"  # HEX 7E 30 30 33 32 33 20 31 0D
  params: []

# ----- Colour Setting Hue/Saturation/Gain per channel (S083-S103) - parameterized -----
- id: std_colour_red_hue
  label: Colour Setting Red Hue
  kind: action
  command: "~00327 {n}"  # HEX 7E 30 30 33 32 37 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_green_hue
  label: Colour Setting Green Hue
  kind: action
  command: "~00328 {n}"  # HEX 7E 30 30 33 32 38 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_blue_hue
  label: Colour Setting Blue Hue
  kind: action
  command: "~00329 {n}"  # HEX 7E 30 30 33 32 39 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_cyan_hue
  label: Colour Setting Cyan Hue
  kind: action
  command: "~00330 {n}"  # HEX 7E 30 30 33 33 30 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_yellow_hue
  label: Colour Setting Yellow Hue
  kind: action
  command: "~00331 {n}"  # HEX 7E 30 30 33 33 31 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_magenta_hue
  label: Colour Setting Magenta Hue
  kind: action
  command: "~00332 {n}"  # HEX 7E 30 30 33 33 32 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_red_saturation
  label: Colour Setting Red Saturation
  kind: action
  command: "~00333 {n}"  # HEX 7E 30 30 33 33 33 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_green_saturation
  label: Colour Setting Green Saturation
  kind: action
  command: "~00334 {n}"  # HEX 7E 30 30 33 33 34 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_blue_saturation
  label: Colour Setting Blue Saturation
  kind: action
  command: "~00335 {n}"  # HEX 7E 30 30 33 33 35 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_cyan_saturation
  label: Colour Setting Cyan Saturation
  kind: action
  command: "~00336 {n}"  # HEX 7E 30 30 33 33 36 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_yellow_saturation
  label: Colour Setting Yellow Saturation
  kind: action
  command: "~00337 {n}"  # HEX 7E 30 30 33 33 37 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_magenta_saturation
  label: Colour Setting Magenta Saturation
  kind: action
  command: "~00338 {n}"  # HEX 7E 30 30 33 33 38 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_red_gain
  label: Colour Setting Red Gain
  kind: action
  command: "~00339 {n}"  # HEX 7E 30 30 33 33 39 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_green_gain
  label: Colour Setting Green Gain
  kind: action
  command: "~00340 {n}"  # HEX 7E 30 30 33 34 30 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_blue_gain
  label: Colour Setting Blue Gain
  kind: action
  command: "~00341 {n}"  # HEX 7E 30 30 33 34 31 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_cyan_gain
  label: Colour Setting Cyan Gain
  kind: action
  command: "~00342 {n}"  # HEX 7E 30 30 33 34 32 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_yellow_gain
  label: Colour Setting Yellow Gain
  kind: action
  command: "~00343 {n}"  # HEX 7E 30 30 33 34 33 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_magenta_gain
  label: Colour Setting Magenta Gain
  kind: action
  command: "~00344 {n}"  # HEX 7E 30 30 33 34 34 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_white_red
  label: Colour Setting White Red
  kind: action
  command: "~00345 {n}"  # HEX 7E 30 30 33 34 35 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_white_green
  label: Colour Setting White Green
  kind: action
  command: "~00346 {n}"  # HEX 7E 30 30 33 34 36 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_colour_white_blue
  label: Colour Setting White Blue
  kind: action
  command: "~00347 {n}"  # HEX 7E 30 30 33 34 37 20 a 0D; n = -50 ~ 50
  params:
    - name: n
      type: integer
      description: Integer -50 to 50

- id: std_display_mode_lock_on
  label: Display Mode Lock On
  kind: action
  command: "~00348 1"  # HEX 7E 30 30 33 34 38 20 31 0D
  params: []

- id: std_display_mode_lock_off
  label: Display Mode Lock Off
  kind: action
  command: "~00348 0"  # HEX 7E 30 30 33 34 38 20 30 0D
  params: []

# ----- 3D→2D (S105) - each value is a separate source row -----
- id: std_3d_to_2d_3d
  label: 3D→2D 3D
  kind: action
  command: "~00400 0"  # HEX 7E 30 30 34 30 30 20 30 0D
  params: []

- id: std_3d_to_2d_l
  label: 3D→2D L
  kind: action
  command: "~00400 1"  # HEX 7E 30 30 34 30 30 20 31 0D
  params: []

- id: std_3d_to_2d_r
  label: 3D→2D R
  kind: action
  command: "~00400 2"  # HEX 7E 30 30 34 30 30 20 32 0D
  params: []

# ----- 3D Format (S106) - each value is a separate source row -----
- id: std_3d_format_auto
  label: 3D Format Auto
  kind: action
  command: "~00405 0"  # HEX 7E 30 30 34 30 35 20 30 0D
  params: []

- id: std_3d_format_sbs
  label: 3D Format SBS
  kind: action
  command: "~00405 1"  # HEX 7E 30 30 34 30 35 20 31 0D
  params: []

- id: std_3d_format_top_bottom
  label: 3D Format Top and Bottom
  kind: action
  command: "~00405 2"  # HEX 7E 30 30 34 30 35 20 32 0D
  params: []

- id: std_3d_format_frame_sequential
  label: 3D Format Frame Sequential
  kind: action
  command: "~00405 3"  # HEX 7E 30 30 34 30 35 20 33 0D
  params: []

# ----- Wall Colour (S107) - each value is a separate source row -----
- id: std_wall_color_whiteboard
  label: Wall Colour Whiteboard
  kind: action
  command: "~00506 0"  # HEX 7E 30 30 35 30 36 20 30 0D
  params: []

- id: std_wall_color_blackboard
  label: Wall Colour Blackboard
  kind: action
  command: "~00506 1"  # HEX 7E 30 30 35 30 36 20 31 0D
  params: []

- id: std_wall_color_light_yellow
  label: Wall Colour Light Yellow
  kind: action
  command: "~00506 2"  # HEX 7E 30 30 35 30 36 20 32 0D
  params: []

- id: std_wall_color_light_green
  label: Wall Colour Light Green
  kind: action
  command: "~00506 3"  # HEX 7E 30 30 35 30 36 20 33 0D
  params: []

- id: std_wall_color_light_blue
  label: Wall Colour Light Blue
  kind: action
  command: "~00506 4"  # HEX 7E 30 30 35 30 36 20 34 0D
  params: []

- id: std_wall_color_pink
  label: Wall Colour Pink
  kind: action
  command: "~00506 5"  # HEX 7E 30 30 35 30 36 20 35 0D
  params: []

- id: std_wall_color_gray
  label: Wall Colour Gray
  kind: action
  command: "~00506 6"  # HEX 7E 30 30 35 30 36 20 36 0D
  params: []

- id: std_hdmi_cec_off
  label: HDMI Link (CEC) Off
  kind: action
  command: "~00511 0"  # HEX 7E 30 30 35 31 31 20 30 0D (0/2 for backward compatible)
  params: []

- id: std_hdmi_cec_on
  label: HDMI Link (CEC) On
  kind: action
  command: "~00511 1"  # HEX 7E 30 30 35 31 31 20 31 0D
  params: []

- id: std_auto_source_off
  label: Auto Source Off
  kind: action
  command: "~00563 0"  # HEX 7E 30 30 35 36 33 20 30 0D (0/2 for backward compatible)
  params: []

- id: std_auto_source_on
  label: Auto Source On
  kind: action
  command: "~00563 1"  # HEX 7E 30 30 35 36 33 20 31 0D
  params: []

# ----- Std DLP READ commands (queries) -----
- id: std_query_lan_network_state
  label: Query LAN / Network State
  kind: query
  command: "~0087 1"  # HEX 7E 30 30 38 37 20 31 0D
  params: []

- id: std_query_lan_ip_address
  label: Query LAN IP Address
  kind: query
  command: "~0087 3"  # HEX 7E 30 30 38 37 20 33 0D
  params: []

- id: std_query_lamp_hours
  label: Query Lamp Hours
  kind: query
  command: "~00108 1"  # HEX 7E 30 30 31 30 38 20 31 0D
  params: []

- id: std_query_input_source
  label: Query Input Source
  kind: query
  command: "~00121 1"  # HEX 7E 30 30 31 32 31 20 31 0D
  params: []

- id: std_query_software_version
  label: Query Software Version
  kind: query
  command: "~00122 1"  # HEX 7E 30 30 31 32 32 20 31 0D
  params: []

- id: std_query_display_mode
  label: Query Display Mode
  kind: query
  command: "~00123 1"  # HEX 7E 30 30 31 32 33 20 31 0D
  params: []

- id: std_query_power_state
  label: Query Power State
  kind: query
  command: "~00124 1"  # HEX 7E 30 30 31 32 34 20 31 0D
  params: []

- id: std_query_brightness
  label: Query Brightness
  kind: query
  command: "~00125 1"  # HEX 7E 30 30 31 32 35 20 31 0D
  params: []

- id: std_query_contrast
  label: Query Contrast
  kind: query
  command: "~00126 1"  # HEX 7E 30 30 31 32 36 20 31 0D
  params: []

- id: std_query_aspect_ratio
  label: Query Aspect Ratio
  kind: query
  command: "~00127 1"  # HEX 7E 30 30 31 32 37 20 31 0D
  params: []

- id: std_query_color_temperature
  label: Query Color Temperature
  kind: query
  command: "~00128 1"  # HEX 7E 30 30 31 32 38 20 31 0D
  params: []

- id: std_query_projection_mode
  label: Query Projection Mode
  kind: query
  command: "~00129 1"  # HEX 7E 30 30 31 32 39 20 31 0D
  params: []

- id: std_query_information_full
  label: Query Information (Power/Lamp/Source/FW/Display)
  kind: query
  command: "~00150 1"  # HEX 7E 30 30 31 35 30 20 31 0D
  params: []

- id: std_query_resolution
  label: Query Resolution
  kind: query
  command: "~00150 4"  # HEX 7E 30 30 31 35 30 20 34 0D
  params: []

- id: std_query_standby_power_mode
  label: Query Standby Power Mode
  kind: query
  command: "~00150 16"  # HEX 7E 30 30 31 35 30 20 31 36 0D
  params: []

- id: std_query_refresh_rate
  label: Query Refresh rate
  kind: query
  command: "~00150 19"  # HEX 7E 30 30 31 35 30 20 31 39 0D
  params: []

- id: std_query_model_name
  label: Query Model Name
  kind: query
  command: "~00151 1"  # HEX 7E 30 30 31 35 31 20 31 0D
  params: []

- id: std_query_filter_usage_hours
  label: Query Filter Usage Hours
  kind: query
  command: "~00321 1"  # HEX 7E 30 30 33 32 31 20 31 0D
  params: []

- id: std_query_system_temperature
  label: Query System Temperature
  kind: query
  command: "~00352 1"  # HEX 7E 30 30 33 35 32 20 31 0D
  params: []

- id: std_query_serial_number
  label: Query Serial Number
  kind: query
  command: "~00353 1"  # HEX 7E 30 30 33 35 33 20 31 0D
  params: []

- id: std_query_av_mute
  label: Query AV Mute
  kind: query
  command: "~00355 1"  # HEX 7E 30 30 33 35 35 20 31 0D
  params: []

- id: std_query_mute
  label: Query Mute
  kind: query
  command: "~00356 1"  # HEX 7E 30 30 33 35 36 20 31 0D
  params: []

- id: std_query_h_image_shift
  label: Query H Image Shift
  kind: query
  command: "~00543 1"  # HEX 7E 30 30 35 34 33 20 31 0D
  params: []

- id: std_query_v_image_shift
  label: Query V Image Shift
  kind: query
  command: "~00543 2"  # HEX 7E 30 30 35 34 33 20 32 0D
  params: []

- id: std_query_v_keystone
  label: Query V Keystone
  kind: query
  command: "~00543 3"  # HEX 7E 30 30 35 34 33 20 33 0D
  params: []

- id: std_query_h_keystone
  label: Query H Keystone
  kind: query
  command: "~00543 4"  # HEX 7E 30 30 35 34 33 20 34 0D
  params: []

- id: std_query_lan_mac_address
  label: Query LAN MAC Address
  kind: query
  command: "~00555 1"  # HEX 7E 30 30 35 35 35 20 31 0D
  params: []

- id: std_query_projector_id
  label: Query Projector ID
  kind: query
  command: "~00558 1"  # HEX 7E 30 30 35 35 38 20 31 0D
  params: []

# ===== IN13xST / IN213x / INL314x / INL412x family (RS-232, 19200 baud, parenthesized ASCII) =====
# Format: (CMD) where CMD may include ? (status), ! (return), +/-, nn (numeric), or n (enum).

# ----- Power -----
- id: in13_power_query
  label: Power Status (IN13 family)
  kind: query
  command: "(PWR?)"
  params: []

- id: in13_power_on
  label: Power On (IN13 family)
  kind: action
  command: "(PWR1)"
  params: []

- id: in13_power_off
  label: Power Off (IN13 family)
  kind: action
  command: "(PWR0)"
  params: []

- id: in13_power_on_return
  label: Power On & Return (IN13 family)
  kind: action
  command: "(PWR1!)"
  params: []

- id: in13_power_off_return
  label: Power Off & Return (IN13 family)
  kind: action
  command: "(PWR0!)"
  params: []

# ----- Blank / AV Mute -----
- id: in13_blank_query
  label: Blank Status (IN13 family)
  kind: query
  command: "(BLK?)"
  params: []

- id: in13_blank_on
  label: Blank On (IN13 family)
  kind: action
  command: "(BLK1)"
  params: []

- id: in13_blank_off
  label: Blank Off (IN13 family)
  kind: action
  command: "(BLK0)"
  params: []

- id: in13_blank_on_return
  label: Blank On & Return (IN13 family)
  kind: action
  command: "(BLK1!)"
  params: []

- id: in13_blank_off_return
  label: Blank Off & Return (IN13 family)
  kind: action
  command: "(BLK0!)"
  params: []

# ----- Source - each value is a separate source row -----
- id: in13_source_query
  label: Source Status (IN13 family)
  kind: query
  command: "(SRC?)"
  params: []

- id: in13_source_computer1
  label: Source Computer1 (IN13 family)
  kind: action
  command: "(SRC0)"
  params: []

- id: in13_source_computer2
  label: Source Computer2 (IN13 family)
  kind: action
  command: "(SRC1)"
  params: []

- id: in13_source_video
  label: Source VIDEO (IN13 family)
  kind: action
  command: "(SRC11)"
  params: []

- id: in13_source_svideo
  label: Source S-VIDEO (IN13 family)
  kind: action
  command: "(SRC12)"
  params: []

- id: in13_source_hdmi1
  label: Source HDMI1 (IN13 family)
  kind: action
  command: "(SRC4)"
  params: []

- id: in13_source_hdmi2
  label: Source HDMI2 (IN13 family)
  kind: action
  command: "(SRC5)"
  params: []

- id: in13_source_hdmi3
  label: Source HDMI3 (IN13 family)
  kind: action
  command: "(SRC6)"
  params: []

- id: in13_source_hdbaset
  label: Source HDBaseT (IN13 family)
  kind: action
  command: "(SRC17)"
  params: []

- id: in13_source_computer1_return
  label: Source Computer1 & Return (IN13 family)
  kind: action
  command: "(SRC0!)"
  params: []

- id: in13_source_computer2_return
  label: Source Computer2 & Return (IN13 family)
  kind: action
  command: "(SRC1!)"
  params: []

- id: in13_source_video_return
  label: Source VIDEO & Return (IN13 family)
  kind: action
  command: "(SRC11!)"
  params: []

- id: in13_source_svideo_return
  label: Source S-VIDEO & Return (IN13 family)
  kind: action
  command: "(SRC12!)"
  params: []

- id: in13_source_hdmi1_return
  label: Source HDMI1 & Return (IN13 family)
  kind: action
  command: "(SRC4!)"
  params: []

- id: in13_source_hdmi2_return
  label: Source HDMI2 & Return (IN13 family)
  kind: action
  command: "(SRC5!)"
  params: []

- id: in13_source_hdmi3_return
  label: Source HDMI3 & Return (IN13 family)
  kind: action
  command: "(SRC6!)"
  params: []

- id: in13_source_hdbaset_return
  label: Source HDBaseT & Return (IN13 family)
  kind: action
  command: "(SRC17!)"
  params: []

# ----- Aspect - each value is a separate source row -----
- id: in13_aspect_query
  label: Aspect Status (IN13 family)
  kind: query
  command: "(ARZ?)"
  params: []

- id: in13_aspect_auto
  label: Aspect Auto (IN13 family)
  kind: action
  command: "(ARZ0)"
  params: []

- id: in13_aspect_native
  label: Aspect Native (IN13 family)
  kind: action
  command: "(ARZ1)"
  params: []

- id: in13_aspect_4_3
  label: Aspect 4x3 (IN13 family)
  kind: action
  command: "(ARZ2)"
  params: []

- id: in13_aspect_16_9
  label: Aspect 16x9 (IN13 family)
  kind: action
  command: "(ARZ3)"
  params: []

- id: in13_aspect_letterbox
  label: Aspect Letterbox (IN13 family)
  kind: action
  command: "(ARZ4)"
  params: []

- id: in13_aspect_16_10
  label: Aspect 16x10 (IN13 family)
  kind: action
  command: "(ARZ6)"
  params: []

- id: in13_aspect_auto_return
  label: Aspect Auto & Return (IN13 family)
  kind: action
  command: "(ARZ0!)"
  params: []

- id: in13_aspect_native_return
  label: Aspect Native & Return (IN13 family)
  kind: action
  command: "(ARZ1!)"
  params: []

- id: in13_aspect_4_3_return
  label: Aspect 4x3 & Return (IN13 family)
  kind: action
  command: "(ARZ2!)"
  params: []

- id: in13_aspect_16_9_return
  label: Aspect 16x9 & Return (IN13 family)
  kind: action
  command: "(ARZ3!)"
  params: []

- id: in13_aspect_letterbox_return
  label: Aspect Letterbox & Return (IN13 family)
  kind: action
  command: "(ARZ4!)"
  params: []

- id: in13_aspect_16_10_return
  label: Aspect 16x10 & Return (IN13 family)
  kind: action
  command: "(ARZ6!)"
  params: []

# ----- Lamp Low Power (ECO) -----
- id: in13_ipm_query
  label: Lamp ECO Status (IN13 family)
  kind: query
  command: "(IPM?)"
  params: []

- id: in13_ipm_on
  label: Lamp ECO On (IN13 family)
  kind: action
  command: "(IPM1)"
  params: []

- id: in13_ipm_off
  label: Lamp ECO Off (IN13 family)
  kind: action
  command: "(IPM0)"
  params: []

- id: in13_ipm_on_return
  label: Lamp ECO On & Return (IN13 family)
  kind: action
  command: "(IPM1!)"
  params: []

- id: in13_ipm_off_return
  label: Lamp ECO Off & Return (IN13 family)
  kind: action
  command: "(IPM0!)"
  params: []

# ----- Volume - query/+/-/set, each source row separate -----
- id: in13_volume_query
  label: Volume Status (IN13 family)
  kind: query
  command: "(VOL?)"
  params: []

- id: in13_volume_up
  label: Volume + (IN13 family)
  kind: action
  command: "(VOL+)"
  params: []

- id: in13_volume_down
  label: Volume - (IN13 family)
  kind: action
  command: "(VOL-)"
  params: []

- id: in13_volume_set
  label: Volume Set (IN13 family)
  kind: action
  command: "(VOL{nn})"  # n=0..10
  params:
    - name: nn
      type: integer
      description: Integer 0 to 10 (two-digit)

- id: in13_volume_up_return
  label: Volume + & Return (IN13 family)
  kind: action
  command: "(VOL+!)"
  params: []

- id: in13_volume_down_return
  label: Volume - & Return (IN13 family)
  kind: action
  command: "(VOL-!)"
  params: []

- id: in13_volume_set_return
  label: Volume Set & Return (IN13 family)
  kind: action
  command: "(VOL{nn}!)"  # n=0..10
  params:
    - name: nn
      type: integer
      description: Integer 0 to 10 (two-digit)

# ----- Mute -----
- id: in13_mute_query
  label: Mute Status (IN13 family)
  kind: query
  command: "(MTE?)"
  params: []

- id: in13_mute_on
  label: Mute On (IN13 family)
  kind: action
  command: "(MTE1)"
  params: []

- id: in13_mute_off
  label: Mute Off (IN13 family)
  kind: action
  command: "(MTE0)"
  params: []

- id: in13_mute_on_return
  label: Mute On & Return (IN13 family)
  kind: action
  command: "(MTE1!)"
  params: []

- id: in13_mute_off_return
  label: Mute Off & Return (IN13 family)
  kind: action
  command: "(MTE0!)"
  params: []

# ----- Firmware / Lamp hours queries -----
- id: in13_query_firmware_version
  label: Query Firmware Version (IN13 family)
  kind: query
  command: "(FVS?)"
  params: []

- id: in13_query_lamp_eco_hours
  label: Query Lamp ECO Hours (IN13 family)
  kind: query
  command: "(LME?)"
  params: []

- id: in13_query_lamp_normal_hours
  label: Query Lamp Normal Hours (IN13 family)
  kind: query
  command: "(LMO?)"
  params: []

- id: in13_query_lamp_dynamic_hours
  label: Query Lamp Dynamic Hours (IN13 family)
  kind: query
  command: "(LML?)"
  params: []

- id: in13_query_lamp_hours
  label: Query Lamp Hours (IN13 family)
  kind: query
  command: "(LMP?)"
  params: []

- id: in13_query_total_eco_hours
  label: Query Total ECO Hours (IN13 family)
  kind: query
  command: "(LTE?)"
  params: []

- id: in13_query_total_normal_hours
  label: Query Total Normal Hours (IN13 family)
  kind: query
  command: "(LTO?)"
  params: []

- id: in13_query_total_dynamic_hours
  label: Query Total Dynamic Hours (IN13 family)
  kind: query
  command: "(LTL?)"
  params: []

- id: in13_query_total_hours
  label: Query Total Hours (IN13 family)
  kind: query
  command: "(LMT?)"
  params: []

- id: in13_query_lamp_reset_times
  label: Query Lamp Hours Reset Times (IN13 family)
  kind: query
  command: "(LMR?)"
  params: []

- id: in13_lamp_reset
  label: Lamp Hours Reset (IN13 family)
  kind: action
  command: "(LRT1)"
  params: []

# ----- Ceiling Set - each value is a separate source row -----
- id: in13_ceiling_query
  label: Ceiling Set Status (IN13 family)
  kind: query
  command: "(CEL?)"
  params: []

- id: in13_ceiling_front_table
  label: Ceiling Set Front table (IN13 family)
  kind: action
  command: "(CEL0)"
  params: []

- id: in13_ceiling_front_ceiling
  label: Ceiling Set Front ceiling (IN13 family)
  kind: action
  command: "(CEL1)"
  params: []

- id: in13_ceiling_rear_table
  label: Ceiling Set Rear table (IN13 family)
  kind: action
  command: "(CEL2)"
  params: []

- id: in13_ceiling_rear_ceiling
  label: Ceiling Set Rear ceiling (IN13 family)
  kind: action
  command: "(CEL3)"
  params: []

- id: in13_ceiling_front_table_return
  label: Ceiling Set Front table & Return (IN13 family)
  kind: action
  command: "(CEL0!)"
  params: []

- id: in13_ceiling_front_ceiling_return
  label: Ceiling Set Front ceiling & Return (IN13 family)
  kind: action
  command: "(CEL1!)"
  params: []

- id: in13_ceiling_rear_table_return
  label: Ceiling Set Rear table & Return (IN13 family)
  kind: action
  command: "(CEL2!)"
  params: []

- id: in13_ceiling_rear_ceiling_return
  label: Ceiling Set Rear ceiling & Return (IN13 family)
  kind: action
  command: "(CEL3!)"
  params: []

# ----- Brightness - query/+/-/set, each source row separate -----
- id: in13_brightness_query
  label: Brightness Status (IN13 family)
  kind: query
  command: "(BRT?)"
  params: []

- id: in13_brightness_up
  label: Brightness + (IN13 family)
  kind: action
  command: "(BRT+)"
  params: []

- id: in13_brightness_down
  label: Brightness - (IN13 family)
  kind: action
  command: "(BRT-)"
  params: []

- id: in13_brightness_set
  label: Brightness Set (IN13 family)
  kind: action
  command: "(BRT{nn})"  # n=0..100
  params:
    - name: nn
      type: integer
      description: Integer 0 to 100 (two-digit)

- id: in13_brightness_up_return
  label: Brightness + & Return (IN13 family)
  kind: action
  command: "(BRT+!)"
  params: []

- id: in13_brightness_down_return
  label: Brightness - & Return (IN13 family)
  kind: action
  command: "(BRT-!)"
  params: []

- id: in13_brightness_set_return
  label: Brightness Set & Return (IN13 family)
  kind: action
  command: "(BRT{nn}!)"  # n=0..100
  params:
    - name: nn
      type: integer
      description: Integer 0 to 100 (two-digit)

# ----- Contrast - query/+/-/set, each source row separate -----
- id: in13_contrast_query
  label: Contrast Status (IN13 family)
  kind: query
  command: "(CON?)"
  params: []

- id: in13_contrast_up
  label: Contrast + (IN13 family)
  kind: action
  command: "(CON+)"
  params: []

- id: in13_contrast_down
  label: Contrast - (IN13 family)
  kind: action
  command: "(CON-)"
  params: []

- id: in13_contrast_set
  label: Contrast Set (IN13 family)
  kind: action
  command: "(CON{nn})"  # n=0..100
  params:
    - name: nn
      type: integer
      description: Integer 0 to 100 (two-digit)

- id: in13_contrast_up_return
  label: Contrast + & Return (IN13 family)
  kind: action
  command: "(CON+!)"
  params: []

- id: in13_contrast_down_return
  label: Contrast - & Return (IN13 family)
  kind: action
  command: "(CON-!)"
  params: []

- id: in13_contrast_set_return
  label: Contrast Set & Return (IN13 family)
  kind: action
  command: "(CON{nn}!)"  # n=0..100
  params:
    - name: nn
      type: integer
      description: Integer 0 to 100 (two-digit)

# ----- Presets - each value is a separate source row -----
- id: in13_presets_query
  label: Presets Status (IN13 family)
  kind: query
  command: "(PST?)"
  params: []

- id: in13_presets_user
  label: Presets User (IN13 family)
  kind: action
  command: "(PST1)"
  params: []

- id: in13_presets_presentation
  label: Presets Presentation (IN13 family)
  kind: action
  command: "(PST5)"
  params: []

- id: in13_presets_movie
  label: Presets Movie (IN13 family)
  kind: action
  command: "(PST7)"
  params: []

- id: in13_presets_bright
  label: Presets Bright (IN13 family)
  kind: action
  command: "(PST10)"
  params: []

- id: in13_presets_srgb
  label: Presets sRGB (IN13 family)
  kind: action
  command: "(PST11)"
  params: []

- id: in13_presets_blackboard
  label: Presets Blackboard (IN13 family)
  kind: action
  command: "(PST12)"
  params: []

- id: in13_presets_user_return
  label: Presets User & Return (IN13 family)
  kind: action
  command: "(PST1!)"
  params: []

- id: in13_presets_presentation_return
  label: Presets Presentation & Return (IN13 family)
  kind: action
  command: "(PST5!)"
  params: []

- id: in13_presets_movie_return
  label: Presets Movie & Return (IN13 family)
  kind: action
  command: "(PST7!)"
  params: []

- id: in13_presets_bright_return
  label: Presets Bright & Return (IN13 family)
  kind: action
  command: "(PST10!)"
  params: []

- id: in13_presets_srgb_return
  label: Presets sRGB & Return (IN13 family)
  kind: action
  command: "(PST11!)"
  params: []

- id: in13_presets_blackboard_return
  label: Presets Blackboard & Return (IN13 family)
  kind: action
  command: "(PST12!)"
  params: []

# ----- Freeze -----
- id: in13_freeze_query
  label: Freeze Status (IN13 family)
  kind: query
  command: "(FRZ?)"
  params: []

- id: in13_freeze_on
  label: Freeze On (IN13 family)
  kind: action
  command: "(FRZ1)"
  params: []

- id: in13_freeze_off
  label: Freeze Off (IN13 family)
  kind: action
  command: "(FRZ0)"
  params: []

- id: in13_freeze_on_return
  label: Freeze On & Return (IN13 family)
  kind: action
  command: "(FRZ1!)"
  params: []

- id: in13_freeze_off_return
  label: Freeze Off & Return (IN13 family)
  kind: action
  command: "(FRZ0!)"
  params: []

# ----- Key Pad - each value is a separate source row -----
- id: in13_nav_menu
  label: Key Pad Menu (IN13 family)
  kind: action
  command: "(NAV0)"
  params: []

- id: in13_nav_up
  label: Key Pad Up (IN13 family)
  kind: action
  command: "(NAV1)"
  params: []

- id: in13_nav_down
  label: Key Pad Down (IN13 family)
  kind: action
  command: "(NAV2)"
  params: []

- id: in13_nav_select
  label: Key Pad Select (IN13 family)
  kind: action
  command: "(NAV3)"
  params: []

- id: in13_nav_left
  label: Key Pad Left (IN13 family)
  kind: action
  command: "(NAV4)"
  params: []

- id: in13_nav_right
  label: Key Pad Right (IN13 family)
  kind: action
  command: "(NAV5)"
  params: []

- id: in13_nav_menu_return
  label: Key Pad Menu & Return (IN13 family)
  kind: action
  command: "(NAV0!)"
  params: []

- id: in13_nav_up_return
  label: Key Pad Up & Return (IN13 family)
  kind: action
  command: "(NAV1!)"
  params: []

- id: in13_nav_down_return
  label: Key Pad Down & Return (IN13 family)
  kind: action
  command: "(NAV2!)"
  params: []

- id: in13_nav_select_return
  label: Key Pad Select & Return (IN13 family)
  kind: action
  command: "(NAV3!)"
  params: []

- id: in13_nav_left_return
  label: Key Pad Left & Return (IN13 family)
  kind: action
  command: "(NAV4!)"
  params: []

- id: in13_nav_right_return
  label: Key Pad Right & Return (IN13 family)
  kind: action
  command: "(NAV5!)"
  params: []

# ===== IN102x / IN103x / IN104x / IN105x family (RS-232, 19200 baud, two-byte hex Cn opcodes) =====

- id: in1xx_power_on
  label: Power On (IN1xx family)
  kind: action
  command: "C00"  # HEX 43 30 30 0D
  params: []

- id: in1xx_power_off_immediate
  label: Power Off Immediate (IN1xx family)
  kind: action
  command: "C01"  # HEX 43 30 31 0D
  params: []

- id: in1xx_power_off
  label: Power Off (IN1xx family)
  kind: action
  command: "C02"  # HEX 43 30 32 0D
  params: []

- id: in1xx_select_video
  label: Select Video (IN1xx family)
  kind: action
  command: "C03"  # HEX 43 30 33 0D
  params: []

- id: in1xx_select_svideo
  label: Select S-Video (IN1xx family)
  kind: action
  command: "C04"  # HEX 43 30 34 0D
  params: []

- id: in1xx_select_vga1
  label: Select VGA IN 1 (IN1xx family)
  kind: action
  command: "C05"  # HEX 43 30 35 0D
  params: []

- id: in1xx_select_vga2
  label: Select VGA 2 (IN1xx family)
  kind: action
  command: "C06"  # HEX 43 30 36 0D
  params: []

- id: in1xx_select_video_alt
  label: Select Video (alt, IN1xx family)
  kind: action
  command: "C07"  # HEX 43 30 37 0D
  params: []

- id: in1xx_select_svideo_alt
  label: Select S-Video (alt, IN1xx family)
  kind: action
  command: "C08"  # HEX 43 30 38 0D
  params: []

- id: in1xx_volume_up
  label: Volume + (IN1xx family)
  kind: action
  command: "C09"  # HEX 43 30 39 0D
  params: []

- id: in1xx_volume_down
  label: Volume - (IN1xx family)
  kind: action
  command: "C0A"  # HEX 43 30 41 0D
  params: []

- id: in1xx_mute_on
  label: Mute On (IN1xx family)
  kind: action
  command: "C0B"  # HEX 43 30 42 0D
  params: []

- id: in1xx_mute_off
  label: Mute Off (IN1xx family)
  kind: action
  command: "C0C"  # HEX 43 30 43 0D
  params: []
```

## Feedbacks
```yaml
# ----- Std DLP unsolicited + read responses -----
- id: projector_information
  type: enum
  values: [standby, warming, cooling, out_of_range, lamp_fail, fan_lock, over_temperature, lamp_hours_running_out]
  description: |
    Unsolicited INFOa message where a = 0 Standby, 1 Warming, 2 Cooling, 3 Out of Range,
    4 Lamp Fail, 6 Fan Lock, 7 Over Temperature, 8 Lamp Hours Running Out.
  response_format: "INFO{a}"

- id: power_state
  type: enum
  values: [off, on]
  description: Read via `~00124 1`; response `Oka` where a=0 Off, a=1 On.
  response_format: "OK{a}"

- id: input_source
  type: enum
  values: [none, hdmi1, vga, svideo, video, hdmi2, vga2, hdbaset]
  description: |
    Read via `~00121 1`; response `Oka`. Value mapping varies by firmware:
    a=0 None, 1 HDMI 1, 5 VGA, 9 S-Video, 10 Video, 15 HDMI 2 - or -
    a=0 None, 2 HDMI 1, 3 VGA, 5 VGA 2, 7 HDMI 1, 8 HDMI 2, 16 HDBaseT.
  response_format: "OK{a}"

- id: display_mode
  type: enum
  values: [none, presentation, bright, movie, srgb, user, mode_3d, game, dicom_sim, isf_day, isf_night, hdr_sim, hlg_sim]
  description: Read via `~00123 1`; response `Oka`. a=0 None, 1 Presentation, 2 Bright, 3 Movie (Cinema), 4 sRGB, 5 User, 9 3D, 12 Game, 13 DICOM SIM., 14 ISF Day, 15 ISF Night, 22 HDR SIM, 26 HLG SIM.
  response_format: "OK{a}"

- id: aspect_ratio
  type: enum
  values: [none, 4_3, 16_9, 16_10, lbx, native, auto, 21_9, full]
  description: Read via `~00127 1`; response `Okaa`. aa=0 None, 1 4:3, 2 16:9, 3 16:10, 5 LBX, 6 Native, 7 Auto, 16 21:9, 19 FULL.
  response_format: "OK{aa}"

- id: color_temperature
  type: enum
  values: [warm, medium, cold, cool]
  description: Read via `~00128 1`; response `Oka`. a=1 Warm, 2 Medium(Standard), 3 Cold, 4 Cool.
  response_format: "OK{a}"

- id: projection_mode
  type: enum
  values: [front, rear, front_ceiling, rear_ceiling]
  description: Read via `~00129 1`; response `Oka`. a=0 Front, 1 Rear, 2 Front-Ceiling, 3 Rear-Ceiling.
  response_format: "OK{a}"

- id: brightness_value
  type: integer
  description: Read via `~00125 1`; response `Okaaa` where aaa=-50..+50.
  response_format: "OK{aaa}"

- id: contrast_value
  type: integer
  description: Read via `~00126 1`; response `Okaaa` where aaa=-50..+50.
  response_format: "OK{aaa}"

- id: lamp_hours
  type: integer
  description: Read via `~00108 1`; response `Okaaaaa` (5-digit total lamp hours).
  response_format: "OK{aaaaa}"

- id: software_version
  type: string
  description: Read via `~00122 1`; response `Okaaaa` (string).
  response_format: "OK{aaaa}"

- id: filter_usage_hours
  type: integer
  description: Read via `~00321 1`; response `Okaaaaa` (00000..99999).
  response_format: "OK{aaaaa}"

- id: system_temperature
  type: integer
  description: Read via `~00352 1`; response `Okaaa` (000..999).
  response_format: "OK{aaa}"

- id: serial_number
  type: string
  description: Read via `~00353 1`; response `Oka` where a is the serial number string.
  response_format: "OK{a}"

- id: av_mute_state
  type: enum
  values: [off, on]
  description: Read via `~00355 1`; response `Oka` where a=0 Off, a=1 On.
  response_format: "OK{a}"

- id: mute_state
  type: enum
  values: [off, on]
  description: Read via `~00356 1`; response `Oka` where a=0 Off, a=1 On.
  response_format: "OK{a}"

- id: h_image_shift_value
  type: integer
  description: Read via `~00543 1`; response `Okaaaa` where aaaa=-100..+100.
  response_format: "OK{aaaa}"

- id: v_image_shift_value
  type: integer
  description: Read via `~00543 2`; response `Okaaaa` where aaaa=-100..+100.
  response_format: "OK{aaaa}"

- id: v_keystone_value
  type: integer
  description: Read via `~00543 3`; response `Okaaa` where aaa=-40..+40.
  response_format: "OK{aaa}"

- id: h_keystone_value
  type: integer
  description: Read via `~00543 4`; response `Okaaa` where aaa=-40..+40.
  response_format: "OK{aaa}"

- id: lan_mac_address
  type: string
  description: Read via `~00555 1`; response `Ok##:##:##:##:##:##`.
  response_format: "OK##:##:##:##:##:##"

- id: lan_network_state
  type: enum
  values: [disconnected, connected]
  description: Read via `~0087 1`; response `Oka` where a=0 Disconnected, a=1 Connected.
  response_format: "OK{a}"

- id: lan_ip_address
  type: string
  description: Read via `~0087 3`; response `Okaaa_bbb_ccc_ddd`.
  response_format: "OK{aaa}_{bbb}_{ccc}_{ddd}"

- id: projector_id_value
  type: string
  description: Read via `~00558 1`; response `Okaa` where aa=00..99.
  response_format: "OK{aa}"

- id: standby_power_mode
  type: enum
  values: [eco, active, erp_off]
  description: Read via `~00150 16`; response `Oka` where a=0 Eco., a=1 Active, a=2 ErP Off.
  response_format: "OK{a}"

- id: refresh_rate
  type: string
  description: Read via `~00150 19`; response `Oka` where a is e.g. `60Hz` or `0Hz` for no-signal.
  response_format: "OK{a}"

- id: resolution
  type: string
  description: Read via `~00150 4`; response `Oka` where a is e.g. `1920x1080` or `0x0` for no-signal.
  response_format: "OK{a}"

- id: model_name
  type: enum
  values: [svga, xga, wxga, 1080p, wuxga]
  description: Read via `~00151 1`; response `Oka` where a=1 SVGA, 2 XGA, 3 WXGA, 4 1080p, 5 WUXGA.
  response_format: "OK{a}"

# ----- IN13 family query responses -----
- id: in13_power_status
  type: enum
  values: [off, on]
  description: Response to `(PWR?)` is `(0-1,n)` where n=0,1.
  response_format: "(0-1,{n})"

- id: in13_blank_status
  type: enum
  values: [off, on]
  description: Response to `(BLK?)` is `(0-1,n)`.
  response_format: "(0-1,{n})"

- id: in13_source_status
  type: integer
  description: Response to `(SRC?)` is `(0-22,n)` where n=0..22.
  response_format: "(0-22,{n})"

- id: in13_aspect_status
  type: integer
  description: Response to `(ARZ?)` is `(0-6,n)` where n=0,1,2,3,4,6.
  response_format: "(0-6,{n})"

- id: in13_volume_status
  type: integer
  description: Response to `(VOL?)` is `(0-10,nn)` where nn=0..10.
  response_format: "(0-10,{nn})"

- id: in13_mute_status
  type: enum
  values: [off, on]
  description: Response to `(MTE?)` is `(0-1,n)`.
  response_format: "(0-1,{n})"

- id: in13_ceiling_status
  type: integer
  description: Response to `(CEL?)` is `(0-3,n)` where n=0,1,2,3.
  response_format: "(0-3,{n})"

- id: in13_brightness_status
  type: integer
  description: Response to `(BRT?)` is `(0-100,nn)` where nn=0..100.
  response_format: "(0-100,{nn})"

- id: in13_contrast_status
  type: integer
  description: Response to `(CON?)` is `(0-100,nn)` where nn=0..100.
  response_format: "(0-100,{nn})"

- id: in13_presets_status
  type: integer
  description: Response to `(PST?)` is `(0-13,n)` where n=0..13.
  response_format: "(0-13,{n})"

- id: in13_freeze_status
  type: enum
  values: [off, on]
  description: Response to `(FRZ?)` is `(0-1,n)`.
  response_format: "(0-1,{n})"

- id: in13_firmware_version
  type: string
  description: Response to `(FVS?)` is `(nnnn)` in form `x.x.xx`.
  response_format: "({nnnn})"

- id: in13_lamp_hours
  type: integer
  description: |
    Response to `(LME?)`, `(LMO?)`, `(LML?)`, `(LMP?)`, `(LTE?)`, `(LTO?)`, `(LTL?)`,
    `(LMT?)` is `(0-65535,n)` lamp-hours counter.
  response_format: "(0-65535,{n})"

- id: in13_lamp_reset_times
  type: integer
  description: Response to `(LMR?)` is `(0-65535,n)` lamp reset count.
  response_format: "(0-65535,{n})"
```

## Variables
```yaml
# Std DLP settable numeric parameters; all have dedicated action forms above. Listed here
# only when the variable represents a continuous range that the caller may prefer to
# treat as state rather than discrete action invocations.
- id: std_projector_id
  type: integer
  range: [0, 99]
  description: Set via `~0079 n`; addressed projector ID (00..99, 00=broadcast).
- id: std_volume
  type: integer
  range: [0, 10]
  description: Set via `~0081 n`; audio volume 0..10.
- id: std_zoom
  type: integer
  range: [-5, 25]
  description: Set via `~0062 n`.
- id: std_h_image_shift
  type: integer
  range: [-100, 100]
  description: Set via `~0063 n`.
- id: std_v_image_shift
  type: integer
  range: [-100, 100]
  description: Set via `~0064 n`.
- id: std_h_keystone
  type: integer
  range: [-30, 30]
  description: Set via `~0065 n`.
- id: std_v_keystone
  type: integer
  range: [-40, 40]
  description: Set via `~0066 n`; ST variant range is -20..20.
- id: std_signal_frequency
  type: integer
  range: [-5, 5]
  description: Set via `~0073 n`; by-signal value.
- id: std_signal_phase
  type: integer
  range: [0, 63]
  description: Set via `~0074 n`; by-signal value.
- id: std_auto_power_off_minutes
  type: integer
  range: [0, 180]
  description: Set via `~00106 n`; 5-minute increments.
- id: std_sleep_timer_minutes
  type: integer
  range: [0, 990]
  description: Set via `~00107 n`; 30-minute increments.
- id: std_brightness
  type: integer
  range: [-50, 50]
  description: Set via `~0021 n`.
- id: std_contrast
  type: integer
  range: [-50, 50]
  description: Set via `~0022 n`.
- id: std_sharpness
  type: integer
  range: [1, 15]
  description: Set via `~0023 n`.
```

## Events
```yaml
# Std DLP unsolicited "SEND from Projector Automatically" notifications.
- id: projector_information_event
  description: |
    Unsolicited notification broadcast when projector state changes.
    Format: `INFOa` where a = 0 Standby, 1 Warming, 2 Cooling, 3 Out of Range,
    4 Lamp Fail, 6 Fan Lock, 7 Over Temperature, 8 Lamp Hours Running Out.
    Trigger: state transitions during operation.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source documents a Security on/off feature with 4-digit password and a
# Reset-to-Default flow gated on that password, but no explicit safety warning or
# interlock language. No lamp-replacement, ceiling-mount, or electrical safety
# instructions are present in the source.
```

## Notes
The source bundles three independent RS-232 command-set families. The skill rule against collapsing enumerated variants forced ~330 actions; this is intentional — each source row is its own action.

Std DLP family uses 9600 baud; IN13xST / IN213x / INL314x / INL412x family uses 19200 baud; IN102x / IN103x / IN104x / IN105x family uses 19200 baud. Action IDs are namespaced (`std_*`, `in13_*`, `in1xx_*`) to disambiguate which family a command targets. The Transport block records the lowest-common baud (9600) for the most-documented family and notes the 19200 families in a comment; drivers must switch baud before sending `in13_*` / `in1xx_*` commands.

Per-source-row variants enumerated separately per the verifier policy: Picture Mode (15 values), Language (34 values), Gamma (8 values), Colour Temp (4 values), Colour Space (4 values), Aspect Ratio (8 values), Four Corners (16 values), Test Pattern (6 values), Filter Reminder (5 values), Background Color (8 values), Brightness Mode (4 values), Power Mode Standby (3 values), Projection / Projection Location / Menu Location (4 each), 3D Format (4), 3D→2D (3), Wall Colour (7), Closed Captioning (3), IR Function (14), Source (Std DLP 7), Source (IN13 8), Aspect (IN13 6), Presets (IN13 6), Key Pad (6), Screen Type (2), 3D Mode (2), 3D Sync Invert (2), Logo (3).

Two Std DLP source entries map to the same `~0091` opcode (S053 Screen Type 16:10 and S054 Signal Automatic On); both are recorded as actions with distinct IDs (`std_screen_type_16_10`, `std_signal_automatic_on`) and the user picks the right one per use case.

Std DLP "Mute" appears under three opcodes (`~0003`, `~0080`, plus `~00356` query) — the source treats them as aliases but lists each as its own row; they are kept as separate actions per policy.

IN13 family supports a return-code suffix `!` on every action (e.g. `(SRC4!)`) and a status-query suffix `?` on every numeric/enum action. Source's "return code (ok)" column maps the response to the parameter range; recorded in Feedbacks.

Std DLP security on/off (`~0078`) and Reset-to-Default (`~00112`) both gate on a 4-digit `~nnnn` password; `Reset to Default Yes (P.S When security is off)` only works when security is disabled, and the security-on variant requires the password.

The IN1xx family (`C00`..`C0C`) appears to be a small legacy surface (power, source-select, volume ±, mute ±); the source is truncated and additional IN1xx-family opcodes may exist beyond `C0C` but are not in the supplied text.

IN13 family timing parameters stated in source: Lamp Ignition delay 20s, Power Down delay 10s, Source change delay 8s, Intercommand delay minimum 5ms, Intercharacter delay minimum 2ms.

<!-- UNRESOLVED: model-to-family assignment table not provided in source — only sheet titles. No firmware version range given for the Std DLP protocol. The IN102x-105x sheet appears truncated (only commands C00-C0C listed); full catalogue unknown. -->

## Provenance

```yaml
source_domains:
  - cdn.infocus.com
source_urls:
  - https://cdn.infocus.com/2026/02/b7RCq21d-InFocus_Generic_RS232_Commands.xlsx
retrieved_at: 2026-07-22T06:21:11.308Z
last_checked_at: 2026-07-22T07:36:25.203Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T07:36:25.203Z
matched_actions: 444
action_count: 444
confidence: medium
summary: "All 444 spec actions have literal wire-token matches in the source; transport fully documented; three-family protocol comprehensively represented. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full model-to-family mapping not given; source only labels sheets \"Std DLP\", \"IN13xST IN213x INL412x\", and \"IN102x In103x IN104x IN105x\" without cross-walking to \"Corporation Series\" SKU list"
- "source does not document any multi-step macro sequences"
- "source documents a Security on/off feature with 4-digit password and a"
- "model-to-family assignment table not provided in source — only sheet titles. No firmware version range given for the Std DLP protocol. The IN102x-105x sheet appears truncated (only commands C00-C0C listed); full catalogue unknown."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
