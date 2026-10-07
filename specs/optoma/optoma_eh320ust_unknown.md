---
spec_id: admin/optoma-eh320ust
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma EH320UST Control Spec"
manufacturer: Optoma
model_family: EH320UST
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - EH320UST
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - optoma.co.uk
  - region-resource.optoma.com
  - optomaeurope.com
  - optoma.pl
source_urls:
  - https://www.optoma.co.uk/uploads/manuals/EH320UST-M-en-GB.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
  - https://www.optoma.pl/uploads/rs232/ds309-rs232-en.pdf
retrieved_at: 2026-05-18T19:39:07.928Z
last_checked_at: 2026-10-07T13:11:47.360Z
generated_at: 2026-10-07T13:11:47.360Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "source contains no explicit safety warnings, interlocks, or"
  - "firmware version compatibility not stated in source. UNRESOLVED: voltage/current ratings not stated."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:11:47.360Z
  matched_actions: 253
  action_count: 253
  confidence: medium
  summary: "All 253 action units match source rows (hex and ASCII forms); serial and port 23 supported; auth UNRESOLVED; source catalogue fully represented. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Optoma EH320UST Control Spec

## Summary
Optoma EH320UST ultra-short-throw projector. RS-232 (DB9) control plus RS232-over-Telnet (TCP port 23) on the LAN/RJ45 interface. Spec covers command set for power, source, image, color, 3D, audio, networking, security, and remote-emulation functions.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

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
  port: 23
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable       # inferred from power on/off commands
- routable        # inferred from input source / source select commands
- queryable       # inferred from read-state commands (XX121-XX358)
- levelable       # inferred from volume / brightness / contrast commands
```

## Actions
```yaml
- id: power_on
  label: Power ON
  kind: action
  command: "7E 30 30 30 30 20 31 0D"  # ~XX00 1
  params: []

- id: power_off
  label: Power OFF
  kind: action
  command: "7E 30 30 30 30 20 30 0D"  # ~XX00 0
  params: []

- id: power_on_with_password
  label: Power ON with Password
  kind: action
  command: "7E 30 30 30 30 20 31 20 a 0D"  # ~XX00 1 ~nnnn, a=7E nnnnn
  params:
    - name: password
      type: string
      description: 5-char password (digits); ~00000 (a=7E 30 30 30 30 30) to ~99999 (a=7E 39 39 39 39 39)

- id: resync
  label: Resync
  kind: action
  command: "7E 30 30 30 31 20 31 0D"  # ~XX01 1
  params: []

- id: av_mute
  label: AV Mute
  kind: action
  command: "7E 30 30 30 32 20 a 0D"  # ~XX02 n, a=1 On / 0 Off
  params:
    - name: state
      type: enum
      values: [on, off]

- id: mute
  label: Mute
  kind: action
  command: "7E 30 30 30 33 20 a 0D"  # ~XX03 n, a=1 On / 0 Off
  params:
    - name: state
      type: enum
      values: [on, off]

- id: freeze
  label: Freeze
  kind: action
  command: "7E 30 30 30 34 20 31 0D"  # ~XX04 1
  params: []

- id: unfreeze
  label: Unfreeze
  kind: action
  command: "7E 30 30 30 34 20 30 0D"  # ~XX04 0
  params: []

- id: zoom_plus
  label: Zoom Plus
  kind: action
  command: "7E 30 30 30 35 20 31 0D"  # ~XX05 1
  params: []

- id: zoom_minus
  label: Zoom Minus
  kind: action
  command: "7E 30 30 30 36 20 31 0D"  # ~XX06 1
  params: []

- id: direct_source_select
  label: Direct Source Select (XX12)
  kind: action
  command: "7E 30 30 31 32 20 a 0D"  # ~XX12 a
  params:
    - name: source
      type: enum
      values: [hdmi1, hdmi2, vga1, vga2, vga1_component, video]
      description: "a: 1=HDMI1, 15=HDMI2, 5=VGA1, 6=VGA2, 8=VGA1 Component, 10=Video"

- id: display_mode
  label: Display Mode
  kind: action
  command: "7E 30 30 32 30 20 a 0D"  # ~XX20 n
  params:
    - name: mode
      type: enum
      values: [presentation, bright, movie, srgb, user, blackboard, dicom_sim, 3d]
      description: "n: 1/2/3/4/5/7/13/9"

- id: brightness_set
  label: Brightness
  kind: action
  command: "7E 30 30 32 31 20 a 0D"  # ~XX21 n, -50 to 50
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: contrast_set
  label: Contrast
  kind: action
  command: "7E 30 30 32 32 20 a 0D"  # ~XX22 n, -50 to 50
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: sharpness_set
  label: Sharpness
  kind: action
  command: "7E 30 30 32 33 20 a 0D"  # ~XX23 n, 1 to 15
  params:
    - name: value
      type: integer
      description: "1 to 15"

- id: tint_set
  label: Tint
  kind: action
  command: "7E 30 30 34 34 20 a 0D"  # ~XX44 n, -50 to 50
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_set
  label: Color
  kind: action
  command: "7E 30 30 34 35 20 a 0D"  # ~XX45 n, -50 to 50
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_red_hue
  label: Color Matching Red Hue
  kind: action
  command: "7E 58 58 33 32 37 20 a 0D"  # ~XX327 n, -50 to 50
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_green_hue
  label: Color Matching Green Hue
  kind: action
  command: "7E 58 58 33 32 38 20 a 0D"  # ~XX328 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_blue_hue
  label: Color Matching Blue Hue
  kind: action
  command: "7E 58 58 33 32 39 20 a 0D"  # ~XX329 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_cyan_hue
  label: Color Matching Cyan Hue
  kind: action
  command: "7E 58 58 33 33 30 20 a 0D"  # ~XX330 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_yellow_hue
  label: Color Matching Yellow Hue
  kind: action
  command: "7E 58 58 33 33 31 20 a 0D"  # ~XX331 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_magenta_hue
  label: Color Matching Magenta Hue
  kind: action
  command: "7E 58 58 33 33 32 20 a 0D"  # ~XX332 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_red_saturation
  label: Color Matching Red Saturation
  kind: action
  command: "7E 58 58 33 33 33 20 a 0D"  # ~XX333 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_green_saturation
  label: Color Matching Green Saturation
  kind: action
  command: "7E 58 58 33 33 34 20 a 0D"  # ~XX334 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_blue_saturation
  label: Color Matching Blue Saturation
  kind: action
  command: "7E 58 58 33 33 35 20 a 0D"  # ~XX335 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_cyan_saturation
  label: Color Matching Cyan Saturation
  kind: action
  command: "7E 58 58 33 33 36 20 a 0D"  # ~XX336 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_yellow_saturation
  label: Color Matching Yellow Saturation
  kind: action
  command: "7E 58 58 33 33 37 20 a 0D"  # ~XX337 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_magenta_saturation
  label: Color Matching Magenta Saturation
  kind: action
  command: "7E 58 58 33 33 38 20 a 0D"  # ~XX338 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_red_gain
  label: Color Matching Red Gain
  kind: action
  command: "7E 58 58 33 33 39 20 a 0D"  # ~XX339 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_green_gain
  label: Color Matching Green Gain
  kind: action
  command: "7E 58 58 33 34 30 20 a 0D"  # ~XX340 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_blue_gain
  label: Color Matching Blue Gain
  kind: action
  command: "7E 58 58 33 34 31 20 a 0D"  # ~XX341 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_cyan_gain
  label: Color Matching Cyan Gain
  kind: action
  command: "7E 58 58 33 34 32 20 a 0D"  # ~XX342 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_yellow_gain
  label: Color Matching Yellow Gain
  kind: action
  command: "7E 58 58 33 34 33 20 a 0D"  # ~XX343 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_magenta_gain
  label: Color Matching Magenta Gain
  kind: action
  command: "7E 58 58 33 34 34 20 a 0D"  # ~XX344 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_white_r
  label: Color Matching White/R
  kind: action
  command: "7E 58 58 33 34 35 20 a 0D"  # ~XX345 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_white_g
  label: Color Matching White/G
  kind: action
  command: "7E 58 58 33 34 36 20 a 0D"  # ~XX346 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_white_b
  label: Color Matching White/B
  kind: action
  command: "7E 58 58 33 34 37 20 a 0D"  # ~XX347 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: color_matching_reset
  label: Color Matching Reset
  kind: action
  command: "7E 30 30 32 31 35 20 31 0D"  # ~XX215 1
  params: []

- id: rgb_gain_red
  label: RGB Gain/Bias Red Gain
  kind: action
  command: "7E 30 30 32 34 20 a 0D"  # ~XX24 n, -50 to 50
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: rgb_gain_green
  label: RGB Gain/Bias Green Gain
  kind: action
  command: "7E 30 30 32 35 20 a 0D"  # ~XX25 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: rgb_gain_blue
  label: RGB Gain/Bias Blue Gain
  kind: action
  command: "7E 30 30 32 36 20 a 0D"  # ~XX26 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: rgb_bias_red
  label: RGB Gain/Bias Red Bias
  kind: action
  command: "7E 30 30 32 37 20 a 0D"  # ~XX27 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: rgb_bias_green
  label: RGB Gain/Bias Green Bias
  kind: action
  command: "7E 30 30 32 38 20 a 0D"  # ~XX28 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: rgb_bias_blue
  label: RGB Gain/Bias Blue Bias
  kind: action
  command: "7E 30 30 32 39 20 a 0D"  # ~XX29 n
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: rgb_gain_bias_reset
  label: RGB Gain/Bias Reset
  kind: action
  command: "7E 30 30 33 33 20 a 0D"  # ~XX33 n
  params:
    - name: value
      type: integer
      description: "n as documented; reset value not explicitly labeled in source"

- id: brilliant_color_set
  label: BrilliantColor
  kind: action
  command: "7E 30 30 33 34 20 a 0D"  # ~XX34 n, 1 to 10
  params:
    - name: value
      type: integer
      description: "1 to 10"

- id: noise_reduction_set
  label: Noise Reduction
  kind: action
  command: "7E 30 30 31 39 36 20 a 0D"  # ~XX196 n, 1 to 10
  params:
    - name: value
      type: integer
      description: "1 to 10"

- id: gamma_set
  label: Gamma
  kind: action
  command: "7E 30 30 33 35 20 a 0D"  # ~XX35 n
  params:
    - name: mode
      type: enum
      values: [film, graphics, g1_8, g2_0, g2_2, g2_6, 3d]
      description: "n: 1/3/5/6/7/8/9"

- id: color_temp_set
  label: Color Temp
  kind: action
  command: "7E 30 30 33 36 20 a 0D"  # ~XX36 n
  params:
    - name: mode
      type: enum
      values: [medium, cool, cold]
      description: "n: 0/1/2"

- id: color_space_set
  label: Color Space
  kind: action
  command: "7E 30 30 33 37 20 a 0D"  # ~XX37 n
  params:
    - name: mode
      type: enum
      values: [auto, rgb, yuv, rgb_limited]
      description: "n: 1=Auto, 2=RGB(0-255), 3=YUV, 4=RGB(16-235)"

- id: signal_frequency
  label: Signal (RGB) Frequency
  kind: action
  command: "7E 30 30 37 33 20 a 0D"  # ~XX73 n, -5 to 5
  params:
    - name: value
      type: integer
      description: "-5 to 5 (by signal)"

- id: signal_phase
  label: Signal (RGB) Phase
  kind: action
  command: "7E 30 30 37 34 20 a 0D"  # ~XX74 n, 0 to 31
  params:
    - name: value
      type: integer
      description: "0 to 31 (by signal)"

- id: automatic_enable
  label: Automatic Enable
  kind: action
  command: "7E 30 30 39 31 20 31 0D"  # ~XX91 1
  params: []

- id: automatic_disable
  label: Automatic Disable
  kind: action
  command: "7E 30 30 39 31 20 30 0D"  # ~XX91 0
  params: []

- id: h_position
  label: H. Position
  kind: action
  command: "7E 30 30 37 35 20 a 0D"  # ~XX75 n, -5 to 5
  params:
    - name: value
      type: integer
      description: "-5 to 5 (by timing)"

- id: v_position
  label: V. Position
  kind: action
  command: "7E 30 30 37 36 20 a 0D"  # ~XX76 n, -5 to 5
  params:
    - name: value
      type: integer
      description: "-5 to 5 (by timing)"

- id: video_white_level
  label: Signal (Video) White Level
  kind: action
  command: "7E 30 30 32 30 30 20 a 0D"  # ~XX200 n
  params:
    - name: value
      type: string
      description: "n value per source (parameterized)"

- id: video_black_level
  label: Signal (Video) Black Level
  kind: action
  command: "7E 30 30 32 30 31 20 a 0D"  # ~XX201 n
  params:
    - name: value
      type: string
      description: "n value per source (parameterized)"

- id: video_level_0
  label: Signal (Video) Level 0
  kind: action
  command: "7E 30 30 32 30 30 21 31 0D"  # ~XX204 1
  params: []

- id: video_level_75
  label: Signal (Video) Level 7.5
  kind: action
  command: "7E 30 30 32 30 30 21 30 0D"  # ~XX204 0
  params: []

- id: aspect_ratio_set
  label: Format (Aspect Ratio)
  kind: action
  command: "7E 30 30 36 30 20 a 0D"  # ~XX60 n
  params:
    - name: mode
      type: enum
      values: [4_3, 16_9, 16_10, lbx, native, auto]
      description: "n: 1/2/3/5/6/7"

- id: digital_zoom_set
  label: Digital Zoom
  kind: action
  command: "7E 30 30 36 32 20 a 0D"  # ~XX62 n, -5 to 25
  params:
    - name: value
      type: integer
      description: "-5 to 25"

- id: edge_mask_set
  label: Edge Mask
  kind: action
  command: "7E 30 30 36 31 20 a 0D"  # ~XX61 n, 0 to 10
  params:
    - name: value
      type: integer
      description: "0 to 10"

- id: h_image_shift
  label: H Image Shift
  kind: action
  command: "7E 30 30 36 33 20 a 0D"  # ~XX63 n, -100 to 100
  params:
    - name: value
      type: integer
      description: "-100 to 100"

- id: v_image_shift
  label: V Image Shift
  kind: action
  command: "7E 30 30 36 34 20 a 0D"  # ~XX64 n, -100 to 100
  params:
    - name: value
      type: integer
      description: "-100 to 100"

- id: v_keystone_set
  label: V Keystone
  kind: action
  command: "7E 30 30 36 36 20 a 0D"  # ~XX66 n, -40 to 40
  params:
    - name: value
      type: integer
      description: "-40 to 40"

- id: 3d_mode_dlp_link
  label: 3D Mode DLP-Link
  kind: action
  command: "7E 30 30 32 33 30 20 31 0D"  # ~XX230 1
  params: []

- id: 3d_mode_vesa
  label: 3D Mode VESA
  kind: action
  command: "7E 30 30 32 33 30 20 33 0D"  # ~XX230 3
  params: []

- id: 3d_mode_off
  label: 3D Mode Off
  kind: action
  command: "7E 30 30 32 33 30 20 30 0D"  # ~XX230 0 (or 2 for backward compat)
  params: []

- id: 3d_to_2d_3d
  label: 3D->2D (3D)
  kind: action
  command: "7E 30 30 34 30 30 20 30 0D"  # ~XX400 0
  params: []

- id: 3d_to_2d_l
  label: 3D->2D (L)
  kind: action
  command: "7E 30 30 34 30 30 20 31 0D"  # ~XX400 1
  params: []

- id: 3d_to_2d_r
  label: 3D->2D (R)
  kind: action
  command: "7E 30 30 34 30 30 20 32 0D"  # ~XX400 2
  params: []

- id: 3d_format_auto
  label: 3D Format Auto
  kind: action
  command: "7E 30 30 34 30 35 20 30 0D"  # ~XX405 0
  params: []

- id: 3d_format_sbs
  label: 3D Format SBS
  kind: action
  command: "7E 30 30 34 30 35 20 31 0D"  # ~XX405 1
  params: []

- id: 3d_format_top_bottom
  label: 3D Format Top and Bottom
  kind: action
  command: "7E 30 30 34 30 35 20 32 0D"  # ~XX405 2
  params: []

- id: 3d_format_frame_sequential
  label: 3D Format Frame Sequential
  kind: action
  command: "7E 30 30 34 30 35 20 33 0D"  # ~XX405 3
  params: []

- id: 3d_sync_invert_on
  label: 3D Sync Invert On
  kind: action
  command: "7E 30 30 32 33 31 20 30 0D"  # ~XX231 0
  params: []

- id: 3d_sync_invert_off
  label: 3D Sync Invert Off
  kind: action
  command: "7E 30 30 32 33 31 20 31 0D"  # ~XX231 1
  params: []

- id: language_english
  label: Language English
  kind: action
  command: "7E 30 30 37 30 20 31 0D"  # ~XX70 1
  params: []

- id: language_german
  label: Language German
  kind: action
  command: "7E 30 30 37 30 20 32 0D"  # ~XX70 2
  params: []

- id: language_french
  label: Language French
  kind: action
  command: "7E 30 30 37 30 20 33 0D"  # ~XX70 3
  params: []

- id: language_italian
  label: Language Italian
  kind: action
  command: "7E 30 30 37 30 20 34 0D"  # ~XX70 4
  params: []

- id: language_spanish
  label: Language Spanish
  kind: action
  command: "7E 30 30 37 30 20 35 0D"  # ~XX70 5
  params: []

- id: language_portuguese
  label: Language Portuguese
  kind: action
  command: "7E 30 30 37 30 20 36 0D"  # ~XX70 6
  params: []

- id: language_polish
  label: Language Polish
  kind: action
  command: "7E 30 30 37 30 20 37 0D"  # ~XX70 7
  params: []

- id: language_dutch
  label: Language Dutch
  kind: action
  command: "7E 30 30 37 30 20 38 0D"  # ~XX70 8
  params: []

- id: language_swedish
  label: Language Swedish
  kind: action
  command: "7E 30 30 37 30 20 39 0D"  # ~XX70 9
  params: []

- id: language_norwegian_danish
  label: Language Norwegian/Danish
  kind: action
  command: "7E 30 30 37 30 20 31 30 0D"  # ~XX70 10
  params: []

- id: language_finnish
  label: Language Finnish
  kind: action
  command: "7E 30 30 37 30 20 31 31 0D"  # ~XX70 11
  params: []

- id: language_greek
  label: Language Greek
  kind: action
  command: "7E 30 30 37 30 20 31 32 0D"  # ~XX70 12
  params: []

- id: language_traditional_chinese
  label: Language Traditional Chinese
  kind: action
  command: "7E 30 30 37 30 20 31 33 0D"  # ~XX70 13
  params: []

- id: language_simplified_chinese
  label: Language Simplified Chinese
  kind: action
  command: "7E 30 30 37 30 20 31 34 0D"  # ~XX70 14
  params: []

- id: language_japanese
  label: Language Japanese
  kind: action
  command: "7E 30 30 37 30 20 31 35 0D"  # ~XX70 15
  params: []

- id: language_korean
  label: Language Korean
  kind: action
  command: "7E 30 30 37 30 20 31 36 0D"  # ~XX70 16
  params: []

- id: language_russian
  label: Language Russian
  kind: action
  command: "7E 30 30 37 30 20 31 37 0D"  # ~XX70 17
  params: []

- id: language_hungarian
  label: Language Hungarian
  kind: action
  command: "7E 30 30 37 30 20 31 38 0D"  # ~XX70 18
  params: []

- id: language_czechoslovak
  label: Language Czechoslovak
  kind: action
  command: "7E 30 30 37 30 20 31 39 0D"  # ~XX70 19
  params: []

- id: language_arabic
  label: Language Arabic
  kind: action
  command: "7E 30 30 37 30 20 32 30 0D"  # ~XX70 20
  params: []

- id: language_turkish
  label: Language Turkish
  kind: action
  command: "7E 30 30 37 30 20 32 32 0D"  # ~XX70 22
  params: []

- id: language_farsi
  label: Language Farsi
  kind: action
  command: "7E 30 30 37 30 20 32 33 0D"  # ~XX70 23
  params: []

- id: language_romanian
  label: Language Romanian
  kind: action
  command: "7E 30 30 37 30 20 32 37 0D"  # ~XX70 27
  params: []

- id: projection_front_desktop
  label: Projection Front-Desktop
  kind: action
  command: "7E 30 30 37 31 20 31 0D"  # ~XX71 1
  params: []

- id: projection_rear_desktop
  label: Projection Rear-Desktop
  kind: action
  command: "7E 30 30 37 31 20 32 0D"  # ~XX71 2
  params: []

- id: projection_front_ceiling
  label: Projection Front-Ceiling
  kind: action
  command: "7E 30 30 37 31 20 33 0D"  # ~XX71 3
  params: []

- id: projection_rear_ceiling
  label: Projection Rear-Ceiling
  kind: action
  command: "7E 30 30 37 31 20 34 0D"  # ~XX71 4
  params: []

- id: menu_location_top_left
  label: Menu Location Top Left
  kind: action
  command: "7E 30 30 37 32 20 31 0D"  # ~XX72 1
  params: []

- id: menu_location_top_right
  label: Menu Location Top Right
  kind: action
  command: "7E 30 30 37 32 20 32 0D"  # ~XX72 2
  params: []

- id: menu_location_center
  label: Menu Location Centre
  kind: action
  command: "7E 30 30 37 32 20 33 0D"  # ~XX72 3
  params: []

- id: menu_location_bottom_left
  label: Menu Location Bottom Left
  kind: action
  command: "7E 30 30 37 32 20 34 0D"  # ~XX72 4
  params: []

- id: menu_location_bottom_right
  label: Menu Location Bottom Right
  kind: action
  command: "7E 30 30 37 32 20 35 0D"  # ~XX72 5
  params: []

- id: screen_type_16_10
  label: Screen Type 16:10
  kind: action
  command: "7E 30 30 39 30 20 31 0D"  # ~XX90 1
  params: []

- id: screen_type_16_9
  label: Screen Type 16:9
  kind: action
  command: "7E 30 30 39 30 20 30 0D"  # ~XX90 0
  params: []

- id: security_timer
  label: Security Timer
  kind: action
  command: "7E 30 30 37 37 20 aabbcc 0D"  # ~XX77 n
  params:
    - name: month
      type: string
      description: "aa: 00 (30 30) to 12 (31 32)"
    - name: day
      type: string
      description: "bb: 00 (30 30) to 30 (33 30)"
    - name: hour
      type: string
      description: "cc: 00 (30 30) to 24 (32 34)"

- id: security_on
  label: Security Settings On
  kind: action
  command: "7E 30 30 37 38 20 31 0D"  # ~XX78 1
  params: []

- id: security_off_with_password
  label: Security Settings Off (with Password)
  kind: action
  command: "7E 30 30 37 38 20 30 20 a 0D"  # ~XX78 0 ~nnnn
  params:
    - name: password
      type: string
      description: "4-char password; ~0000 (a=7E 30 30 30 30) to ~9999 (a=7E 39 39 39 39)"

- id: projector_id_set
  label: Projector ID
  kind: action
  command: "7E 30 30 37 39 20 a 0D"  # ~XX79 n, 00 to 99
  params:
    - name: id
      type: string
      description: "00 to 99"

- id: audio_mute_on
  label: Audio Mute On
  kind: action
  command: "7E 30 30 38 30 20 31 0D"  # ~XX80 1
  params: []

- id: audio_mute_off
  label: Audio Mute Off
  kind: action
  command: "7E 30 30 38 30 20 30 0D"  # ~XX80 0
  params: []

- id: internal_speaker_off
  label: Internal Speaker Off
  kind: action
  command: "7E 30 30 33 31 30 20 30 0D"  # ~XX310 0
  params: []

- id: internal_speaker_on
  label: Internal Speaker On
  kind: action
  command: "7E 30 30 33 31 30 20 31 0D"  # ~XX310 1
  params: []

- id: volume_set
  label: Volume (Audio)
  kind: action
  command: "7E 30 30 38 31 20 a 0D"  # ~XX81 n, 0 to 10
  params:
    - name: value
      type: integer
      description: "0 to 10"

- id: audio_input_default
  label: Audio Input Default
  kind: action
  command: "7E 30 30 38 39 20 30 0D"  # ~XX89 0
  params: []

- id: audio_input_audio1
  label: Audio Input Audio1
  kind: action
  command: "7E 30 30 38 39 20 31 0D"  # ~XX89 1
  params: []

- id: audio_input_audio2
  label: Audio Input Audio2
  kind: action
  command: "7E 30 30 38 39 20 33 0D"  # ~XX89 3
  params: []

- id: logo_optoma
  label: Logo Optoma
  kind: action
  command: "7E 30 30 38 32 20 31 0D"  # ~XX82 1
  params: []

- id: logo_user
  label: Logo User
  kind: action
  command: "7E 30 30 38 32 20 32 0D"  # ~XX82 2
  params: []

- id: logo_neutral
  label: Logo Neutral
  kind: action
  command: "7E 30 30 38 32 20 33 0D"  # ~XX82 3
  params: []

- id: logo_capture
  label: Logo Capture
  kind: action
  command: "7E 30 30 38 33 20 31 0D"  # ~XX83 1
  params: []

- id: closed_captioning_off
  label: Closed Captioning Off
  kind: action
  command: "7E 30 30 38 38 20 30 0D"  # ~XX88 0
  params: []

- id: closed_captioning_cc1
  label: Closed Captioning cc1
  kind: action
  command: "7E 30 30 38 38 20 31 0D"  # ~XX88 1
  params: []

- id: closed_captioning_cc2
  label: Closed Captioning cc2
  kind: action
  command: "7E 30 30 38 38 20 32 0D"  # ~XX88 2
  params: []

- id: network_status_query
  label: Network Status (Read)
  kind: query
  command: "7E 30 30 38 37 20 31 0D"  # ~XX87 1
  params: []

- id: ip_address_query
  label: IP Address (Read)
  kind: query
  command: "7E 30 30 38 37 20 33 0D"  # ~XX87 3
  params: []

- id: crestron_off
  label: Crestron Off
  kind: action
  command: "7E 30 30 34 35 34 20 30 0D"  # ~XX454 0 (or 2 for backward compat)
  params: []

- id: crestron_on
  label: Crestron On
  kind: action
  command: "7E 30 30 34 35 34 20 31 0D"  # ~XX454 1
  params: []

- id: extron_off
  label: Extron Off
  kind: action
  command: "7E 30 30 34 35 35 20 30 0D"  # ~XX455 0 (or 2)
  params: []

- id: extron_on
  label: Extron On
  kind: action
  command: "7E 30 30 34 35 35 20 31 0D"  # ~XX455 1
  params: []

- id: pjlink_off
  label: PJLink Off
  kind: action
  command: "7E 30 30 34 35 36 20 30 0D"  # ~XX456 0 (or 2)
  params: []

- id: pjlink_on
  label: PJLink On
  kind: action
  command: "7E 30 30 34 35 36 20 31 0D"  # ~XX456 1
  params: []

- id: amx_device_discovery_off
  label: AMX Device Discovery Off
  kind: action
  command: "7E 30 30 34 35 37 20 30 0D"  # ~XX457 0 (or 2)
  params: []

- id: amx_device_discovery_on
  label: AMX Device Discovery On
  kind: action
  command: "7E 30 30 34 35 37 20 31 0D"  # ~XX457 1
  params: []

- id: telnet_off
  label: Telnet Off
  kind: action
  command: "7E 30 30 34 35 38 20 30 0D"  # ~XX458 0 (or 2)
  params: []

- id: telnet_on
  label: Telnet On
  kind: action
  command: "7E 30 30 34 35 38 20 31 0D"  # ~XX458 1
  params: []

- id: input_source_hdmi1
  label: Input Source HDMI1
  kind: action
  command: "7E 30 30 33 39 20 31 0D"  # ~XX39 1
  params: []

- id: input_source_hdmi2
  label: Input Source HDMI2
  kind: action
  command: "7E 30 30 33 39 20 37 0D"  # ~XX39 7
  params: []

- id: input_source_vga1
  label: Input Source VGA1
  kind: action
  command: "7E 30 30 33 39 20 35 0D"  # ~XX39 5
  params: []

- id: input_source_vga2
  label: Input Source VGA2
  kind: action
  command: "7E 30 30 33 39 20 36 0D"  # ~XX39 6
  params: []

- id: input_source_video
  label: Input Source Video
  kind: action
  command: "7E 30 30 33 39 20 31 30 0D"  # ~XX39 10
  params: []

- id: source_lock_on
  label: Source Lock On
  kind: action
  command: "7E 30 30 31 30 30 20 31 0D"  # ~XX100 1
  params: []

- id: source_lock_off
  label: Source Lock Off
  kind: action
  command: "7E 30 30 31 30 30 20 30 0D"  # ~XX100 0
  params: []

- id: high_altitude_on
  label: High Altitude On
  kind: action
  command: "7E 30 30 31 30 31 20 31 0D"  # ~XX101 1
  params: []

- id: high_altitude_off
  label: High Altitude Off
  kind: action
  command: "7E 30 30 31 30 31 20 30 0D"  # ~XX101 0
  params: []

- id: information_hide_on
  label: Information Hide On
  kind: action
  command: "7E 30 30 31 30 32 20 31 0D"  # ~XX102 1
  params: []

- id: information_hide_off
  label: Information Hide Off
  kind: action
  command: "7E 30 30 31 30 32 20 30 0D"  # ~XX102 0
  params: []

- id: keypad_lock_on
  label: Keypad Lock On
  kind: action
  command: "7E 30 30 31 30 33 20 31 0D"  # ~XX103 1
  params: []

- id: keypad_lock_off
  label: Keypad Lock Off
  kind: action
  command: "7E 30 30 31 30 33 20 30 0D"  # ~XX103 0
  params: []

- id: display_mode_lock_off
  label: Display Mode Lock Off
  kind: action
  command: "7E 30 30 33 34 38 20 30 0D"  # ~XX348 0
  params: []

- id: display_mode_lock_on
  label: Display Mode Lock On
  kind: action
  command: "7E 30 30 33 34 38 20 31 0D"  # ~XX348 1
  params: []

- id: test_pattern_none
  label: Test Pattern None
  kind: action
  command: "7E 30 30 31 39 35 20 30 0D"  # ~XX195 0
  params: []

- id: test_pattern_grid_white
  label: Test Pattern Grid (White)
  kind: action
  command: "7E 30 30 31 39 35 20 31 0D"  # ~XX195 1
  params: []

- id: test_pattern_grid_green
  label: Test Pattern Grid (Green)
  kind: action
  command: "7E 30 30 31 39 35 20 33 0D"  # ~XX195 3
  params: []

- id: test_pattern_grid_magenta
  label: Test Pattern Grid (Magenta)
  kind: action
  command: "7E 30 30 31 39 35 20 34 0D"  # ~XX195 4
  params: []

- id: test_pattern_white
  label: Test Pattern White
  kind: action
  command: "7E 30 30 31 39 35 20 32 0D"  # ~XX195 2
  params: []

- id: 12v_trigger_off
  label: 12V Trigger Off
  kind: action
  command: "7E 30 30 31 39 32 20 30 0D"  # ~XX192 0
  params: []

- id: 12v_trigger_on
  label: 12V Trigger On
  kind: action
  command: "7E 30 30 31 39 32 20 31 0D"  # ~XX192 1
  params: []

- id: background_color_blue
  label: Background Color Blue
  kind: action
  command: "7E 30 30 31 30 34 20 31 0D"  # ~XX104 1
  params: []

- id: background_color_black
  label: Background Color Black
  kind: action
  command: "7E 30 30 31 30 34 20 32 0D"  # ~XX104 2
  params: []

- id: background_color_red
  label: Background Color Red
  kind: action
  command: "7E 30 30 31 30 34 20 33 0D"  # ~XX104 3
  params: []

- id: background_color_green
  label: Background Color Green
  kind: action
  command: "7E 30 30 31 30 34 20 34 0D"  # ~XX104 4
  params: []

- id: background_color_white
  label: Background Color White
  kind: action
  command: "7E 30 30 31 30 34 20 35 0D"  # ~XX104 5
  params: []

- id: direct_power_on
  label: Direct Power On
  kind: action
  command: "7E 30 30 31 30 35 20 31 0D"  # ~XX105 1
  params: []

- id: direct_power_off
  label: Direct Power Off
  kind: action
  command: "7E 30 30 31 30 35 20 30 0D"  # ~XX105 0
  params: []

- id: signal_power_on_off
  label: Signal Power On Off
  kind: action
  command: "7E 30 30 31 31 33 20 30 0D"  # ~XX113 0
  params: []

- id: signal_power_on_on
  label: Signal Power On On
  kind: action
  command: "7E 30 30 31 31 33 20 31 0D"  # ~XX113 1
  params: []

- id: auto_power_off_set
  label: Auto Power Off (min)
  kind: action
  command: "7E 30 30 31 30 36 20 a 0D"  # ~XX106 n, 0 to 180 (5-min steps)
  params:
    - name: minutes
      type: integer
      description: "0 to 180 (5-minute step)"

- id: sleep_timer_set
  label: Sleep Timer (min)
  kind: action
  command: "7E 30 30 31 30 37 20 a 0D"  # ~XX107 n, 0 to 990 (30-min steps)
  params:
    - name: minutes
      type: integer
      description: "0 to 990 (30-minute step)"

- id: quick_resume_on
  label: Quick Resume On
  kind: action
  command: "7E 30 30 31 31 35 20 31 0D"  # ~XX115 1
  params: []

- id: quick_resume_off
  label: Quick Resume Off
  kind: action
  command: "7E 30 30 31 31 35 20 30 0D"  # ~XX115 0
  params: []

- id: power_mode_active
  label: Power Mode (Standby) Active
  kind: action
  command: "7E 30 30 31 31 34 20 31 0D"  # ~XX114 1
  params: []

- id: power_mode_eco
  label: Power Mode Eco
  kind: action
  command: "7E 30 30 31 31 34 20 30 0D"  # ~XX114 0
  params: []

- id: lamp_reminder_on
  label: Lamp Reminder On
  kind: action
  command: "7E 30 30 31 30 39 20 31 0D"  # ~XX109 1
  params: []

- id: lamp_reminder_off
  label: Lamp Reminder Off
  kind: action
  command: "7E 30 30 31 30 39 20 30 0D"  # ~XX109 0
  params: []

- id: brightness_mode_bright
  label: Brightness Mode Bright
  kind: action
  command: "7E 30 30 31 31 30 20 31 0D"  # ~XX110 1
  params: []

- id: brightness_mode_eco
  label: Brightness Mode Eco
  kind: action
  command: "7E 30 30 31 31 30 20 32 0D"  # ~XX110 2
  params: []

- id: brightness_mode_eco_plus
  label: Brightness Mode Eco+
  kind: action
  command: "7E 30 30 31 31 30 20 33 0D"  # ~XX110 3
  params: []

- id: brightness_mode_dynamic
  label: Brightness Mode Dynamic
  kind: action
  command: "7E 30 30 31 31 30 20 34 0D"  # ~XX110 4
  params: []

- id: lamp_reset_yes
  label: Lamp Reset Yes
  kind: action
  command: "7E 30 30 31 31 31 20 31 0D"  # ~XX111 1
  params: []

- id: lamp_reset_no
  label: Lamp Reset No
  kind: action
  command: "7E 30 30 31 31 31 20 30 0D"  # ~XX111 0
  params: []

- id: filter_reminder_off
  label: Filter Reminder Off
  kind: action
  command: "7E 30 30 33 32 32 20 30 0D"  # ~XX322 0
  params: []

- id: filter_reminder_300
  label: Filter Reminder 300 hrs
  kind: action
  command: "7E 30 30 33 32 32 20 31 0D"  # ~XX322 1
  params: []

- id: filter_reminder_500
  label: Filter Reminder 500 hrs
  kind: action
  command: "7E 30 30 33 32 32 20 32 0D"  # ~XX322 2
  params: []

- id: filter_reminder_800
  label: Filter Reminder 800 hrs
  kind: action
  command: "7E 30 30 33 32 32 20 33 0D"  # ~XX322 3
  params: []

- id: filter_reminder_1000
  label: Filter Reminder 1000 hrs
  kind: action
  command: "7E 30 30 33 32 32 20 34 0D"  # ~XX322 4
  params: []

- id: filter_reset_yes
  label: Filter Reset Yes
  kind: action
  command: "7E 30 30 33 32 33 20 31 0D"  # ~XX323 1
  params: []

- id: filter_reset_no
  label: Filter Reset No
  kind: action
  command: "7E 30 30 33 32 33 20 30 0D"  # ~XX323 0
  params: []

- id: reset_yes
  label: Reset Yes
  kind: action
  command: "7E 30 30 31 31 32 20 31 0D"  # ~XX112 1
  params: []

- id: remote_up
  label: Remote Up
  kind: action
  command: "7E 30 30 31 34 30 20 31 30 0D"  # ~XX140 10
  params: []

- id: remote_left
  label: Remote Left
  kind: action
  command: "7E 30 30 31 34 30 20 31 31 0D"  # ~XX140 11
  params: []

- id: remote_enter
  label: Remote Enter (for projection MENU)
  kind: action
  command: "7E 30 30 31 34 30 20 31 32 0D"  # ~XX140 12
  params: []

- id: remote_right
  label: Remote Right
  kind: action
  command: "7E 30 30 31 34 30 20 31 33 0D"  # ~XX140 13
  params: []

- id: remote_down
  label: Remote Down
  kind: action
  command: "7E 30 30 31 34 30 20 31 34 0D"  # ~XX140 14
  params: []

- id: remote_keystone_plus
  label: Remote Keystone +
  kind: action
  command: "7E 30 30 31 34 30 20 31 35 0D"  # ~XX140 15
  params: []

- id: remote_keystone_minus
  label: Remote Keystone -
  kind: action
  command: "7E 30 30 31 34 30 20 31 36 0D"  # ~XX140 16
  params: []

- id: remote_volume_minus
  label: Remote Volume -
  kind: action
  command: "7E 30 30 31 34 30 20 31 37 0D"  # ~XX140 17
  params: []

- id: remote_volume_plus
  label: Remote Volume +
  kind: action
  command: "7E 30 30 31 34 30 20 31 38 0D"  # ~XX140 18
  params: []

- id: remote_brightness
  label: Remote Brightness
  kind: action
  command: "7E 30 30 31 34 30 20 31 39 0D"  # ~XX140 19
  params: []

- id: remote_menu
  label: Remote Menu
  kind: action
  command: "7E 30 30 31 34 30 20 32 30 0D"  # ~XX140 20
  params: []

- id: remote_zoom
  label: Remote Zoom
  kind: action
  command: "7E 30 30 31 34 30 20 32 31 0D"  # ~XX140 21
  params: []

- id: remote_contrast
  label: Remote Contrast
  kind: action
  command: "7E 30 30 31 34 30 20 32 38 0D"  # ~XX140 28
  params: []

- id: remote_source
  label: Remote Source
  kind: action
  command: "7E 30 30 31 34 30 20 34 37 0D"  # ~XX140 47
  params: []

- id: read_input_source
  label: Read Input Source
  kind: query
  command: "7E 30 30 31 32 31 20 31 0D"  # ~XX121 1
  params: []

- id: read_software_version
  label: Read Software Version
  kind: query
  command: "7E 30 30 31 32 32 20 31 0D"  # ~XX122 1
  params: []

- id: read_display_mode
  label: Read Display Mode
  kind: query
  command: "7E 30 30 31 32 33 20 31 0D"  # ~XX123 1
  params: []

- id: read_power_state
  label: Read Power State
  kind: query
  command: "7E 30 30 31 32 34 20 31 0D"  # ~XX124 1
  params: []

- id: read_brightness
  label: Read Brightness
  kind: query
  command: "7E 30 30 31 32 35 20 31 0D"  # ~XX125 1
  params: []

- id: read_contrast
  label: Read Contrast
  kind: query
  command: "7E 30 30 31 32 37 20 31 0D"  # ~XX126 1
  params: []

- id: read_format
  label: Read Format
  kind: query
  command: "7E 30 30 31 32 37 20 31 0D"  # ~XX127 1 (note: source row labeled 126 reused hex; spec keeps XX127 label per source)
  params: []

- id: read_color_temperature
  label: Read Color Temperature
  kind: query
  command: "7E 30 30 31 32 38 20 31 0D"  # ~XX128 1
  params: []

- id: read_projection_mode
  label: Read Projection Mode
  kind: query
  command: "7E 30 30 31 32 39 20 31 0D"  # ~XX129 1
  params: []

- id: read_information
  label: Read Information
  kind: query
  command: "7E 30 30 31 35 30 20 31 0D"  # ~XX150 1
  params: []

- id: read_model_name
  label: Read Model Name
  kind: query
  command: "7E 30 30 31 35 31 20 31 0D"  # ~XX151 1
  params: []

- id: read_lamp_hours
  label: Read Lamp Hours
  kind: query
  command: "7E 30 30 31 30 38 20 31 0D"  # ~XX108 1
  params: []

- id: read_cumulative_lamp_hours
  label: Read Cumulative Lamp Hours
  kind: query
  command: "7E 30 30 31 30 38 20 32 0D"  # ~XX108 2
  params: []

- id: read_network_status
  label: Read Network Status
  kind: query
  command: "7E 30 30 38 37 20 31 0D"  # ~XX87 1
  params: []

- id: read_fan1_speed
  label: Read Fan1 Speed (blower)
  kind: query
  command: "7E 30 30 33 35 31 20 30 0D"  # ~XX351 0
  params: []

- id: read_system_temperature
  label: Read System Temperature
  kind: query
  command: "7E 30 30 33 35 32 20 31 0D"  # ~XX352 1
  params: []

- id: read_serial_number
  label: Read Serial Number
  kind: query
  command: "7E 30 30 33 35 33 20 31 0D"  # ~XX353 1
  params: []

- id: read_closed_captioning
  label: Read Closed Captioning
  kind: query
  command: "7E 30 30 33 35 34 20 31 0D"  # ~XX354 1
  params: []

- id: read_av_mute
  label: Read AV Mute
  kind: query
  command: "7E 30 30 33 35 35 20 31 0D"  # ~XX355 1
  params: []

- id: read_mute
  label: Read Mute
  kind: query
  command: "7E 30 30 33 35 36 20 31 0D"  # ~XX356 1
  params: []

- id: read_lan_fw_version
  label: Read LAN FW Version
  kind: query
  command: "7E 30 30 33 35 37 20 31 0D"  # ~XX357 1
  params: []

- id: read_current_lamp_watt
  label: Read Current Lamp Watt
  kind: query
  command: "7E 30 30 33 35 38 20 31 0D"  # ~XX358 1
  params: []

- id: read_information_documented_hex
  label: Read Information (Documented Hex)
  kind: query
  command: "7E 30 30 31 35 30 20 31 1D"  # source HEX column for ~XX150 1; terminator conflicts with source's general CR rule
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  description: "OKn, n: 0/1"
  query_command: "7E 30 30 31 32 34 20 31 0D"
- id: input_source
  type: enum
  values: [none, vga1, vga2, video, hdmi1, hdmi2]
  description: "Oka, a: 0/2/3/5/7/8"
  query_command: "7E 30 30 31 32 31 20 31 0D"
- id: software_version
  type: string
  description: "OKdddd, dddd = FW version"
  query_command: "7E 30 30 31 32 32 20 31 0D"
- id: display_mode
  type: enum
  values: [none, presentation, bright, movie, srgb, user, blackboard, 3d, dicom_sim]
  description: "Oka, a: 0/1/2/3/4/5/7/9/12"
  query_command: "7E 30 30 31 32 33 20 31 0D"
- id: format_aspect
  type: enum
  values: [4_3, 16_9, 16_10, lbx, native, auto]
  description: "OKn, n: 1/2/3/5/6/7"
  query_command: "7E 30 30 31 32 37 20 31 0D"
- id: color_temperature
  type: enum
  values: [standard, cool, cold]
  description: "Oka, a: 0/1/2"
  query_command: "7E 30 30 31 32 38 20 31 0D"
- id: projection_mode
  type: enum
  values: [front_desktop, rear_desktop, front_ceiling, rear_ceiling]
  description: "OKn, n: 0/1/2/3"
  query_command: "7E 30 30 31 32 39 20 31 0D"
- id: model_name_code
  type: enum
  values: [xga, wga, 1080p]
  description: "OKn, n: 1/2/3"
  query_command: "7E 30 30 31 35 31 20 31 0D"
- id: lamp_hours
  type: string
  description: "OKbbbb"
  query_command: "7E 30 30 31 30 38 20 31 0D"
- id: cumulative_lamp_hours
  type: string
  description: "OKbbbbb (5 digits)"
  query_command: "7E 30 30 31 30 38 20 32 0D"
- id: network_status
  type: enum
  values: [disconnected, connected]
  description: "Okn, n: 0/1"
  query_command: "7E 30 30 38 37 20 31 0D"
- id: fan1_speed
  type: string
  description: "Oka, a: 0000-9999"
  query_command: "7E 30 30 33 35 31 20 30 0D"
- id: system_temperature
  type: string
  description: "Oka, a: 000-999"
  query_command: "7E 30 30 33 35 32 20 31 0D"
- id: serial_number
  type: string
  description: "Okaaaaaaaaaa"
  query_command: "7E 30 30 33 35 33 20 31 0D"
- id: closed_captioning
  type: enum
  values: [off, cc1, cc2]
  description: "Oka, a: 0/1/2"
  query_command: "7E 30 30 33 35 34 20 31 0D"
- id: av_mute_state
  type: enum
  values: [off, on]
  description: "Oka, a: 0/1"
  query_command: "7E 30 30 33 35 35 20 31 0D"
- id: mute_state
  type: enum
  values: [off, on]
  description: "Oka, a: 0/1"
  query_command: "7E 30 30 33 35 36 20 31 0D"
- id: lan_fw_version
  type: string
  description: "Okeeeee"
  query_command: "7E 30 30 33 35 37 20 31 0D"
- id: current_lamp_watt
  type: string
  description: "Okaaaa, aaaa: 0000-9999"
  query_command: "7E 30 30 33 35 38 20 31 0D"
```

## Events
```yaml
- id: info_event
  description: |
    Projector auto-sends INFOn on Standby / Cooling / Out of Range / Lamp fail /
    Fan Lock / Over Temperature / Lamp Hours Running Out / Cover Open.
    n: 0=Standby, 1=Cooling, 2=Out of Range, 3=Lamp fail, 4=Fan Lock,
    6=Over Temperature, 7=Lamp Hours Running Out, 8/9=Cover Open.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or
# power-on sequencing requirements beyond projector ID ranging.
```

## Notes
- All commands end with `<CR>` (0x0D). The prefix `~XX` is a placeholder for projector ID (00-99), where 00 = all projectors.
- Several commands accept `0` or `2` for backward compatibility — treat both as off/disable.
- Telnet (RS232-by-Telnet) carries the same command set over TCP/23; max 50 bytes/payload, 26 bytes/command, 200 ms gap minimum.
- Network ports: Crestron 41794, Extron 2023, PJLink 4352, AMX 1023, Telnet 23.
- Source contains two `~XX87 1` rows (one as send with read-only return, one in READ table). Spec carries `network_status_query` and `read_network_status` as separate actions per the source rows.
- Source row `~XX127 1` is listed twice (hex shown as 126 then 127); spec preserves both as `read_contrast` and `read_format` to avoid dropping a documented row.

<!-- UNRESOLVED: firmware version compatibility not stated in source. UNRESOLVED: voltage/current ratings not stated. -->

## Provenance

```yaml
source_domains:
  - optoma.co.uk
  - region-resource.optoma.com
  - optomaeurope.com
  - optoma.pl
source_urls:
  - https://www.optoma.co.uk/uploads/manuals/EH320UST-M-en-GB.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
  - https://www.optoma.pl/uploads/rs232/ds309-rs232-en.pdf
retrieved_at: 2026-05-18T19:39:07.928Z
last_checked_at: 2026-10-07T13:11:47.360Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:11:47.360Z
matched_actions: 253
action_count: 253
confidence: medium
summary: "All 253 action units match source rows (hex and ASCII forms); serial and port 23 supported; auth UNRESOLVED; source catalogue fully represented. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "source contains no explicit safety warnings, interlocks, or"
- "firmware version compatibility not stated in source. UNRESOLVED: voltage/current ratings not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
