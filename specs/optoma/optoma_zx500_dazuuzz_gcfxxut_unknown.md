---
spec_id: admin/optoma-zx500-dazuuzz-gcfxxut
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma Zx500 (DAZUUZZ GCFxxUT) Control Spec"
manufacturer: Optoma
model_family: "Zx500 DAZUUZZ GCFxxUT"
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - "Zx500 DAZUUZZ GCFxxUT"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - region-resource.optoma.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
retrieved_at: 2026-09-21T16:56:46.085Z
last_checked_at: 2026-09-21T22:16:41.746Z
generated_at: 2026-09-21T22:16:41.746Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "~XX542"
  - "~XX545"
  - "model name and firmware compatibility not stated in source document (generic Optoma RS232 list); no TCP/UDP port or IP protocol details despite Telnet/PJ Link/HTTP/Crestron enable commands being present"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "firmware version compatibility not stated in source"
  - "no confirmation this generic command list exactly matches Zx500 DAZUUZZ GCFxxUT firmware — verify against device"
  - "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
verification:
  verdict: verified
  checked_at: 2026-09-21T22:16:41.746Z
  matched_actions: 177
  action_count: 177
  confidence: medium
  summary: "All 177 spec actions match source wire literals ~XX00..~XX588 verbatim; transport 19200/8/N/1/N verbatim; only ~XX542 and ~XX545 (IR/Lens Function state reads) lack spec entries. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-21
---

# Optoma Zx500 (DAZUUZZ GCFxxUT) Control Spec

## Summary
RS-232 control protocol for the Optoma Zx500 laser projector (part codes DAZUUZZ / GCFxxUT), taken from the Optoma "RS232 Protocol Function List". Covers serial-framed ASCII commands (`~<ID><opcode> <param>CR`) for power, input selection, image adjustment, geometry/warp, lens control, 3D, network/control-service enablement, plus read-back queries and unsolicited `INFO` status events. The source document is model-agnostic Optoma RS232 documentation assigned to this family by the pipeline; it does not itself name the Zx500.

<!-- UNRESOLVED: model name and firmware compatibility not stated in source document (generic Optoma RS232 list); no TCP/UDP port or IP protocol details despite Telnet/PJ Link/HTTP/Crestron enable commands being present -->

## Transport
```yaml
protocols:
  - serial
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
traits:
  - powerable    # inferred from power command ~XX00 / query ~XX124
  - routable     # inferred from input source select ~XX12 / ~XX305
  - queryable    # inferred from extensive read commands (~XX121, ~XX124, ~XX150, etc.)
  - levelable    # inferred from numeric settables (brightness ~XX21 0-100, contrast ~XX22, power level ~XX326, etc.)
```

## Actions
```yaml
actions:
  - id: power_set
    label: "Power On/Off"
    kind: action
    command: "~XX00 {value}"
    params:
      - name: value
        type: enum
        values: "1=on, 0=off, 2=off"
  - id: resync
    label: "Re-Sync"
    kind: action
    command: "~XX01 1"
    params: []
  - id: av_mute_set
    label: "AV Mute On/Off"
    kind: action
    command: "~XX02 {value}"
    params:
      - name: value
        type: enum
        values: "0=off, 1=on"
  - id: freeze_set
    label: "Freeze On/Off"
    kind: action
    command: "~XX04 {value}"
    params:
      - name: value
        type: enum
        values: "0=unfreeze, 1=freeze"
  - id: set_display_mode
    label: "Display Mode set"
    kind: action
    command: "~XX20 {value}"
    params:
      - name: value
        type: enum
        values: "1=Presentation, 2=Bright, 3=Cinema, 21=HDR, 4=sRGB, 13=DICOM SIM., 19=Blending, 5=User, 9=3D"
  - id: read_display_mode
    label: "Display Mode query"
    kind: query
    command: "~XX123 1"
    params: []
  - id: set_wall_color
    label: "Wall Color set"
    kind: action
    command: "~XX506 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=Blackboard, 7=Light Yellow, 3=Light Green, 4=Light Blue, 5=Pink, 6=Gray"
  - id: set_dynamic_range_hdr
    label: "Dynamic Range (HDR) set"
    kind: action
    command: "~XX565 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=Auto"
  - id: set_hdr_picture_mode
    label: "HDR Picture Mode set"
    kind: action
    command: "~XX566 {value}"
    params:
      - name: value
        type: enum
        values: "0=Bright, 1=Standard, 2=Film, 3=Detail, 4=SMPTE 2084"
  - id: brightness_step
    label: "Brightness step"
    kind: action
    command: "~XX46 {value}"
    params:
      - name: value
        type: enum
        values: "1=decrease, 2=increase"
  - id: set_brightness
    label: "Brightness set"
    kind: action
    command: "~XX21 {value}"
    params:
      - name: value
        type: integer
        values: "0-100"
  - id: read_brightness
    label: "Brightness query"
    kind: query
    command: "~XX125 1"
    params: []
  - id: contrast_step
    label: "Contrast step"
    kind: action
    command: "~XX47 {value}"
    params:
      - name: value
        type: enum
        values: "1=decrease, 2=increase"
  - id: set_contrast
    label: "Contrast set"
    kind: action
    command: "~XX22 {value}"
    params:
      - name: value
        type: integer
        values: "0-100"
  - id: read_contrast
    label: "Contrast query"
    kind: query
    command: "~XX126 1"
    params: []
  - id: set_sharpness
    label: "Sharpness set"
    kind: action
    command: "~XX23 {value}"
    params:
      - name: value
        type: integer
        values: "1-15"
  - id: set_color
    label: "Color set"
    kind: action
    command: "~XX45 {value}"
    params:
      - name: value
        type: integer
        values: "0-100"
  - id: set_tint
    label: "Tint set"
    kind: action
    command: "~XX44 {value}"
    params:
      - name: value
        type: integer
        values: "0-100"
  - id: set_gamma
    label: "Gamma set"
    kind: action
    command: "~XX35 {value}"
    params:
      - name: value
        type: enum
        values: "1=Film, 2=Video, 3=Graphics, 4=Standard(2.2), 11=DICOM SIM., 5=1.8, 6=2.0, 12=2.4"
  - id: set_brilliant_color
    label: "BrilliantColor set"
    kind: action
    command: "~XX34 {value}"
    params:
      - name: value
        type: integer
        values: "0-10"
  - id: set_color_temperature
    label: "Color Temperature set"
    kind: action
    command: "~XX36 {value}"
    params:
      - name: value
        type: enum
        values: "4=Warm, 1=Standard, 2=Cool"
  - id: read_color_temperature
    label: "Color Temperature query"
    kind: query
    command: "~XX128 1"
    params: []
  - id: set_cm_r_hue
    label: "Color Matching (R) Hue set"
    kind: action
    command: "~XX327 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_r_saturation
    label: "Color Matching (R) Saturation set"
    kind: action
    command: "~XX333 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_r_gain
    label: "Color Matching (R) Gain set"
    kind: action
    command: "~XX339 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_g_hue
    label: "Color Matching (G) Hue set"
    kind: action
    command: "~XX328 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_g_saturation
    label: "Color Matching (G) Saturation set"
    kind: action
    command: "~XX334 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_g_gain
    label: "Color Matching (G) Gain set"
    kind: action
    command: "~XX340 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_b_hue
    label: "Color Matching (B) Hue set"
    kind: action
    command: "~XX329 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_b_saturation
    label: "Color Matching (B) Saturation set"
    kind: action
    command: "~XX335 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_b_gain
    label: "Color Matching (B) Gain set"
    kind: action
    command: "~XX341 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_c_hue
    label: "Color Matching (C) Hue set"
    kind: action
    command: "~XX330 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_c_saturation
    label: "Color Matching (C) Saturation set"
    kind: action
    command: "~XX336 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_c_gain
    label: "Color Matching (C) Gain set"
    kind: action
    command: "~XX342 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_m_hue
    label: "Color Matching (M) Hue set"
    kind: action
    command: "~XX332 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_m_saturation
    label: "Color Matching (M) Saturation set"
    kind: action
    command: "~XX338 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_m_gain
    label: "Color Matching (M) Gain set"
    kind: action
    command: "~XX344 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_y_hue
    label: "Color Matching (Y) Hue set"
    kind: action
    command: "~XX331 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_y_saturation
    label: "Color Matching (Y) Saturation set"
    kind: action
    command: "~XX337 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_y_gain
    label: "Color Matching (Y) Gain set"
    kind: action
    command: "~XX343 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_w_red
    label: "Color Matching (W) Red set"
    kind: action
    command: "~XX345 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_w_green
    label: "Color Matching (W) Green set"
    kind: action
    command: "~XX346 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: set_cm_w_blue
    label: "Color Matching (W) Blue set"
    kind: action
    command: "~XX347 {value}"
    params:
      - name: value
        type: integer
        values: "0-254"
  - id: color_matching_reset
    label: "Color Matching Reset"
    kind: action
    command: "~XX215 1"
    params: []
  - id: set_rgb_red_gain
    label: "RGB Gain/Bias Red Gain set"
    kind: action
    command: "~XX24 {value}"
    params:
      - name: value
        type: integer
        values: "0-100"
  - id: set_rgb_green_gain
    label: "RGB Gain/Bias Green Gain set"
    kind: action
    command: "~XX25 {value}"
    params:
      - name: value
        type: integer
        values: "0-100"
  - id: set_rgb_blue_gain
    label: "RGB Gain/Bias Blue Gain set"
    kind: action
    command: "~XX26 {value}"
    params:
      - name: value
        type: integer
        values: "0-100"
  - id: set_rgb_red_bias
    label: "RGB Gain/Bias Red Bias set"
    kind: action
    command: "~XX27 {value}"
    params:
      - name: value
        type: integer
        values: "0-100"
  - id: set_rgb_green_bias
    label: "RGB Gain/Bias Green Bias set"
    kind: action
    command: "~XX28 {value}"
    params:
      - name: value
        type: integer
        values: "0-100"
  - id: set_rgb_blue_bias
    label: "RGB Gain/Bias Blue Bias set"
    kind: action
    command: "~XX29 {value}"
    params:
      - name: value
        type: integer
        values: "0-100"
  - id: rgb_gain_bias_reset
    label: "RGB Gain/Bias Reset"
    kind: action
    command: "~XX517 1"
    params: []
  - id: set_color_space
    label: "Color Space set"
    kind: action
    command: "~XX37 {value}"
    params:
      - name: value
        type: enum
        values: "1=Auto, 2=RGB / RGB(0-255), 3=YUV, 4=RGB(16-235)"
  - id: set_ultra_detail
    label: "UltraDetail set"
    kind: action
    command: "~XX41 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 4=1, 5=2, 6=3"
  - id: set_extreme_black
    label: "Extreme Black set"
    kind: action
    command: "~XX218 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=On"
  - id: set_dynamic_black
    label: "Dynamic Black set"
    kind: action
    command: "~XX191 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=On"
  - id: set_brightness_mode
    label: "Brightness Mode set"
    kind: action
    command: "~XX110 {value}"
    params:
      - name: value
        type: enum
        values: "6=Constant Power, 7=Constant Luminance, 2=Eco Mode"
  - id: set_power_level
    label: "Power Level (light output) set"
    kind: action
    command: "~XX326 {value}"
    params:
      - name: value
        type: integer
        values: "1-100"
  - id: set_pure_contrast
    label: "PureContrast set"
    kind: action
    command: "~XX219 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=On"
  - id: set_pure_color
    label: "PureColor set"
    kind: action
    command: "~XX42 {value}"
    params:
      - name: value
        type: integer
        values: "0-10 (0=Off, 1-10 level)"
  - id: set_pure_motion_demo
    label: "PureMotion Demo set"
    kind: action
    command: "~XX197 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=H Split, 2=V Split"
  - id: image_settings_reset
    label: "Image Settings Reset"
    kind: action
    command: "~XX509 1"
    params: []
  - id: set_3d_mode
    label: "3D Mode set"
    kind: action
    command: "~XX230 {value}"
    params:
      - name: value
        type: enum
        values: "4=On, 0=Off"
  - id: set_3d_format
    label: "3D Format set"
    kind: action
    command: "~XX405 {value}"
    params:
      - name: value
        type: enum
        values: "0=Auto, 7=Frame Packing, 1=Side by Side, 2=Top and Bottom, 3=Frame Sequential"
  - id: set_3d_2d_mode
    label: "3D-2D set"
    kind: action
    command: "~XX400 {value}"
    params:
      - name: value
        type: enum
        values: "0=3D, 1=L, 2=R"
  - id: set_3d_sync_invert
    label: "3D Sync Invert set"
    kind: action
    command: "~XX231 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=On"
  - id: set_3d_sync_out
    label: "3D Sync Out set"
    kind: action
    command: "~XX232 {value}"
    params:
      - name: value
        type: enum
        values: "0=To Emitter, 1=To Next Projector"
  - id: set_lr_reference
    label: "L/R Reference set"
    kind: action
    command: "~XX236 {value}"
    params:
      - name: value
        type: enum
        values: "0=Field GPIO, 1=1ST FRAME"
  - id: set_3d_frame_delay
    label: "3D Frame Delay set"
    kind: action
    command: "~XX233 {value}"
    params:
      - name: value
        type: integer
        values: "1-200"
  - id: reset_3d
    label: "3D Reset"
    kind: action
    command: "~XX234 1"
    params: []
  - id: set_aspect_ratio
    label: "Aspect Ratio set"
    kind: action
    command: "~XX60 {value}"
    params:
      - name: value
        type: enum
        values: "1=4:3, 2=16:9, 3=16:10, 5=LBX, 6=Native, 7=Auto"
  - id: read_aspect_ratio
    label: "Aspect Ratio query"
    kind: query
    command: "~XX127 1"
    params: []
  - id: set_h_zoom
    label: "Digital Zoom H set"
    kind: action
    command: "~XX504 {value}"
    params:
      - name: value
        type: integer
        values: "50-400 (percent)"
  - id: set_v_zoom
    label: "Digital Zoom V set"
    kind: action
    command: "~XX505 {value}"
    params:
      - name: value
        type: integer
        values: "50-400 (percent)"
  - id: set_image_shift_h
    label: "Image Shift H set"
    kind: action
    command: "~XX63 {value}"
    params:
      - name: value
        type: integer
        values: "0-100"
  - id: set_image_shift_v
    label: "Image Shift V set"
    kind: action
    command: "~XX64 {value}"
    params:
      - name: value
        type: integer
        values: "0-100"
  - id: set_h_arc
    label: "Geometric Correction H Arc set"
    kind: action
    command: "~XX300 {value}"
    params:
      - name: value
        type: integer
        values: "0-100"
  - id: set_v_arc
    label: "Geometric Correction V Arc set"
    kind: action
    command: "~XX301 {value}"
    params:
      - name: value
        type: integer
        values: "0-100"
  - id: set_four_corner_top_left_h
    label: "Four Corners Top-left H set"
    kind: action
    command: "~XX581 {value}"
    params:
      - name: value
        type: integer
        values: "0-120"
  - id: set_four_corner_top_left_v
    label: "Four Corners Top-left V set"
    kind: action
    command: "~XX582 {value}"
    params:
      - name: value
        type: integer
        values: "0-80"
  - id: set_four_corner_top_right_h
    label: "Four Corners Top-right H set"
    kind: action
    command: "~XX583 {value}"
    params:
      - name: value
        type: integer
        values: "0-120"
  - id: set_four_corner_top_right_v
    label: "Four Corners Top-right V set"
    kind: action
    command: "~XX584 {value}"
    params:
      - name: value
        type: integer
        values: "0-80"
  - id: set_four_corner_bottom_left_h
    label: "Four Corners Bottom-left H set"
    kind: action
    command: "~XX585 {value}"
    params:
      - name: value
        type: integer
        values: "0-120"
  - id: set_four_corner_bottom_left_v
    label: "Four Corners Bottom-left V set"
    kind: action
    command: "~XX586 {value}"
    params:
      - name: value
        type: integer
        values: "0-80"
  - id: set_four_corner_bottom_right_h
    label: "Four Corners Bottom-right H set"
    kind: action
    command: "~XX587 {value}"
    params:
      - name: value
        type: integer
        values: "0-120"
  - id: set_four_corner_bottom_right_v
    label: "Four Corners Bottom-right V set"
    kind: action
    command: "~XX588 {value}"
    params:
      - name: value
        type: integer
        values: "0-80"
  - id: set_four_corner_select
    label: "Four Corners corner select"
    kind: action
    command: "~XX59 {value}"
    params:
      - name: value
        type: integer
        values: "1-16 (corner/axis select; source table partially garbled)"
  - id: set_h_keystone
    label: "H Keystone set"
    kind: action
    command: "~XX65 {value}"
    params:
      - name: value
        type: integer
        values: "0-40"
  - id: set_v_keystone
    label: "V Keystone set"
    kind: action
    command: "~XX66 {value}"
    params:
      - name: value
        type: integer
        values: "0-40"
  - id: read_geometry
    label: "Geometry values query"
    kind: query
    command: "~XX543 {spec}"
    params:
      - name: spec
        type: enum
        values: "1=image shift H, 2=image shift V, 3=V keystone, 4=H keystone, 5=V arc, 6=H arc, 7=V zoom, 8=H zoom"
  - id: read_warp_pc_connection
    label: "Warp and Blend PC Connection query"
    kind: query
    command: "~XX132 {spec}"
    params:
      - name: spec
        type: enum
        values: "3=PC connection status (reply 0=No, 1=Yes), 1=warp settings (reply 0=All Off, 3=All On, 4=Blend Off)"
  - id: set_warp_blend_settings
    label: "Warp and Blend Settings set"
    kind: action
    command: "~XX142 {value}"
    params:
      - name: value
        type: enum
        values: "0=All Off, 3=All On, 4=Blend Off"
  - id: set_warp_memory
    label: "Warp Memory set"
    kind: action
    command: "~XX147 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=User1, 2=User2, 3=User3"
  - id: read_warp_memory
    label: "Warp Memory query"
    kind: query
    command: "~XX137 1"
    params: []
  - id: warp_blend_reset
    label: "Warp and Blend Control Reset"
    kind: action
    command: "~XX561 1"
    params: []
  - id: set_pip_pbp_screen
    label: "PIP/PBP Screen set"
    kind: action
    command: "~XX302 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=PIP, 2=PBP"
  - id: set_pip_pbp_location
    label: "PIP/PBP Location set"
    kind: action
    command: "~XX303 {value}"
    params:
      - name: value
        type: enum
        values: "1=PIP-Top Left, 2=PIP-Top Right, 3=PIP-Bottom Left, 4=PIP-Bottom Right, 5=PBP Main Left, 6=PBP Main Top, 7=PBP Main Right, 8=PBP Main Bottom"
  - id: set_pip_size
    label: "PIP Size set"
    kind: action
    command: "~XX304 {value}"
    params:
      - name: value
        type: enum
        values: "3=Small, 2=Medium, 1=Large"
  - id: set_main_source
    label: "Input/Main Source select"
    kind: action
    command: "~XX12 {value}"
    params:
      - name: value
        type: enum
        values: "1=HDMI1, 15=HDMI2, 20=DisplayPort, 21=HDBaseT, 22=3G-SDI"
  - id: read_main_source
    label: "Input/Main Source query"
    kind: query
    command: "~XX121 1"
    params: []
  - id: set_sub_source
    label: "PIP/PBP Sub Source select"
    kind: action
    command: "~XX305 {value}"
    params:
      - name: value
        type: enum
        values: "1=HDMI1, 4=HDMI2, 17=DisplayPort, 10=HDBaseT, 11=3G-SDI"
  - id: read_sub_source
    label: "PIP/PBP Sub Source query"
    kind: query
    command: "~XX131 1"
    params: []
  - id: pip_pbp_swap
    label: "PIP/PBP Swap"
    kind: action
    command: "~XX306 1"
    params: []
  - id: set_projection
    label: "Projection orientation set"
    kind: action
    command: "~XX71 {value}"
    params:
      - name: value
        type: enum
        values: "1=Front, 2=Rear, 3=Ceiling-top, 4=Rear-top"
  - id: read_projection
    label: "Projection orientation query"
    kind: query
    command: "~XX129 1"
    params: []
  - id: lens_zoom_step
    label: "Lens Zoom step"
    kind: action
    command: "~XX307 {value}"
    params:
      - name: value
        type: enum
        values: "1=increase (+), 2=decrease (-)"
  - id: lens_focus_step
    label: "Lens Focus step"
    kind: action
    command: "~XX308 {value}"
    params:
      - name: value
        type: enum
        values: "1=increase (+), 2=decrease (-)"
  - id: set_lens_function
    label: "Lens Function lock/unlock"
    kind: action
    command: "~XX349 {value}"
    params:
      - name: value
        type: enum
        values: "1=Lock, 2=Unlock"
  - id: lens_shift_direction
    label: "Lens Shift direction"
    kind: action
    command: "~XX84 {value}"
    params:
      - name: value
        type: enum
        values: "3=Up, 4=Down, 5=Left, 6=Right"
  - id: set_lens_calibration
    label: "Lens Calibration run"
    kind: action
    command: "~XX525 {value}"
    params:
      - name: value
        type: enum
        values: "1=Yes (run), 0=No"
  - id: lens_memory_apply
    label: "Lens Memory apply position"
    kind: action
    command: "~XX359 {value}"
    params:
      - name: value
        type: integer
        values: "1-5"
  - id: lens_memory_save
    label: "Lens Memory save current position"
    kind: action
    command: "~XX360 {value}"
    params:
      - name: value
        type: integer
        values: "1-5"
  - id: lens_memory_reset
    label: "Lens Memory reset"
    kind: action
    command: "~XX361 1"
    params: []
  - id: set_direct_power_on
    label: "Direct Power On set"
    kind: action
    command: "~XX105 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=On"
  - id: set_auto_power_off
    label: "Auto Power Off set"
    kind: action
    command: "~XX106 {value}"
    params:
      - name: value
        type: integer
        values: "0-180 minutes, 5-minute increments"
  - id: set_sleep_timer
    label: "Sleep Timer set"
    kind: action
    command: "~XX107 {value}"
    params:
      - name: value
        type: integer
        values: "000-990 minutes, 30-minute increments"
  - id: set_sleep_timer_always_on
    label: "Sleep Timer Always On set"
    kind: action
    command: "~XX507 {value}"
    params:
      - name: value
        type: enum
        values: "0=No, 1=Yes"
  - id: set_power_mode_standby
    label: "Power Mode (Standby) set"
    kind: action
    command: "~XX114 {value}"
    params:
      - name: value
        type: enum
        values: "0=Eco, 1=Active, 3=Communications"
  - id: set_security
    label: "Security set"
    kind: action
    command: "~XX78 {value}"
    params:
      - name: value
        type: string
        values: "0=Off followed by ~nnnn, 1=On followed by ~nnnn (4-digit password)"
  - id: set_security_timer_month
    label: "Security Timer Month set"
    kind: action
    command: "~XX537 {value}"
    params:
      - name: value
        type: integer
        values: "00-12"
  - id: set_security_timer_day
    label: "Security Timer Day set"
    kind: action
    command: "~XX538 {value}"
    params:
      - name: value
        type: integer
        values: "00-29"
  - id: set_security_timer_hour
    label: "Security Timer Hour set"
    kind: action
    command: "~XX539 {value}"
    params:
      - name: value
        type: integer
        values: "00-23"
  - id: set_security_timer_mmddhh
    label: "Security Timer MM/DD/HH set (RS232 only)"
    kind: action
    command: "~XX77 {value}"
    params:
      - name: value
        type: string
        values: "MMDDHH digit string"
  - id: read_security_timer
    label: "Security Timer query"
    kind: query
    command: "~XX544 {spec}"
    params:
      - name: spec
        type: enum
        values: "1=month, 2=day, 3=hour"
  - id: set_test_pattern
    label: "Test Pattern set"
    kind: action
    command: "~XX195 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=White Grid, 2=White, 3=Green Grid, 4=Magenta Grid, 5=Red, 6=Green, 7=Blue, 8=Yellow, 9=Magenta, 10=Cyan, 11=Black"
  - id: set_ir_function
    label: "IR Function set"
    kind: action
    command: "~XX11 {value}"
    params:
      - name: value
        type: enum
        values: "4=Front Off, 5=Front On, 6=Top Off, 7=Top On, 9=HDBaseT On, 10=HDBaseT Off"
  - id: set_remote_code
    label: "Remote Code set"
    kind: action
    command: "~XX350 {value}"
    params:
      - name: value
        type: integer
        values: "00-99"
  - id: set_hot_key
    label: "Hot-Key Setting set"
    kind: action
    command: "~XX117 {value}"
    params:
      - name: value
        type: enum
        values: "1=Aspect Ratio, 2=Freeze Screen"
  - id: set_12v_trigger
    label: "12V Trigger set"
    kind: action
    command: "~XX192 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=On"
  - id: set_projector_id
    label: "Projector ID set"
    kind: action
    command: "~XX79 {value}"
    params:
      - name: value
        type: integer
        values: "00-99"
  - id: read_projector_id
    label: "Projector ID query"
    kind: query
    command: "~XX558 1"
    params: []
  - id: set_light_sensor
    label: "Light Sensor set / calibrate"
    kind: action
    command: "~XX552 {value}"
    params:
      - name: value
        type: enum
        values: "0=Default, 2=Manual / calibration"
  - id: set_keypad_led
    label: "Keypad LED set"
    kind: action
    command: "~XX362 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=On"
  - id: set_language
    label: "Language set"
    kind: action
    command: "~XX70 {value}"
    params:
      - name: value
        type: enum
        values: "1=English, 2=Deutsch, 3=Francais, 4=Italiano, 5=Espanol, 6=Portugues, 7=Polski, 8=Nederlands, 9=Svenska, 10=Norsk/Dansk, 11=Suomi, 12=Greek, 13=Traditional Chinese, 14=Simplified Chinese, 15=Japanese, 16=Korean, 17=Russian, 18=Magyar, 19=Cestina, 21=Thai, 22=Turkce, 25=Tieng Viet, 26=Bahasa Indonesia, 27=Romana, 28=Slovakian"
  - id: set_menu_location
    label: "Menu Location set"
    kind: action
    command: "~XX72 {value}"
    params:
      - name: value
        type: enum
        values: "1=Top left, 2=Top right, 3=Center, 4=Bottom left, 5=Bottom right"
  - id: set_menu_transparency
    label: "Menu Transparency set"
    kind: action
    command: "~XX526 {value}"
    params:
      - name: value
        type: integer
        values: "0-9"
  - id: set_menu_timer
    label: "Menu Timer set"
    kind: action
    command: "~XX515 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=5sec, 3=10sec, 4=15sec"
  - id: set_auto_source
    label: "Auto Source set"
    kind: action
    command: "~XX563 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=On"
  - id: set_high_altitude
    label: "High Altitude set"
    kind: action
    command: "~XX101 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=On"
  - id: set_information_hide
    label: "Information Hide set"
    kind: action
    command: "~XX102 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=On"
  - id: set_logo
    label: "Logo set"
    kind: action
    command: "~XX82 {value}"
    params:
      - name: value
        type: enum
        values: "1=Default, 3=Neutral"
  - id: set_background_color
    label: "Background Color set"
    kind: action
    command: "~XX104 {value}"
    params:
      - name: value
        type: enum
        values: "0=None, 1=Blue, 3=Red, 4=Green, 6=Gray, 7=Logo"
  - id: set_serial_port_path
    label: "Serial Port Path set"
    kind: action
    command: "~XX557 {value}"
    params:
      - name: value
        type: enum
        values: "1=RS232, 2=HDBaseT"
  - id: set_update_notification
    label: "System Update Notification set"
    kind: action
    command: "~XX168 {value}"
    params:
      - name: value
        type: enum
        values: "1=On, 0=Off"
  - id: read_update_notification
    label: "System Update Notification query"
    kind: query
    command: "~XX158 1"
    params: []
  - id: run_system_update
    label: "System Update run"
    kind: action
    command: "~XX168 9"
    params: []
  - id: reset_osd
    label: "Reset OSD"
    kind: action
    command: "~XX546 1"
    params: []
  - id: reset_to_default
    label: "Reset to Default"
    kind: action
    command: "~XX112 1"
    params: []
  - id: set_wlan
    label: "WLAN set"
    kind: action
    command: "~XX450 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=On"
  - id: set_control_crestron
    label: "Control: Crestron set"
    kind: action
    command: "~XX454 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=On"
  - id: set_control_extron
    label: "Control: Extron set"
    kind: action
    command: "~XX455 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=On"
  - id: set_control_pj_link
    label: "Control: PJ Link set"
    kind: action
    command: "~XX456 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=On"
  - id: set_control_amx_discovery
    label: "Control: AMX Device Discovery set"
    kind: action
    command: "~XX457 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=On"
  - id: set_control_telnet
    label: "Control: Telnet set"
    kind: action
    command: "~XX458 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=On"
  - id: set_control_http
    label: "Control: HTTP set"
    kind: action
    command: "~XX459 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=On"
  - id: set_source_lock
    label: "Source Lock set"
    kind: action
    command: "~XX100 {value}"
    params:
      - name: value
        type: enum
        values: "0=Off, 1=On"
  - id: set_filter_wheel_index
    label: "Filter Wheel Index set"
    kind: action
    command: "~XX528 {value}"
    params:
      - name: value
        type: integer
        values: "0000-9999"
  - id: read_filter_wheel_index
    label: "Filter Wheel Index query"
    kind: query
    command: "~XX530 1"
    params: []
  - id: set_phosphor_wheel_index
    label: "Phosphor Wheel Index set"
    kind: action
    command: "~XX529 {value}"
    params:
      - name: value
        type: integer
        values: "0000-9999"
  - id: read_phosphor_wheel_index
    label: "Phosphor Wheel Index query"
    kind: query
    command: "~XX531 1"
    params: []
  - id: read_power_state
    label: "Power state query"
    kind: query
    command: "~XX124 1"
    params: []
  - id: read_av_mute
    label: "AV Mute query"
    kind: query
    command: "~XX355 1"
    params: []
  - id: read_3d_output_state
    label: "Output 3D state query"
    kind: query
    command: "~XX130 1"
    params: []
  - id: read_serial_number
    label: "Serial Number query"
    kind: query
    command: "~XX353 1"
    params: []
  - id: read_info
    label: "Information query"
    kind: query
    command: "~XX150 {spec}"
    params:
      - name: spec
        type: enum
        values: "1=info string, 2=native resolution, 3=main source, 4=main resolution, 5=main signal format, 6=main pixel clock, 7=main horz refresh, 8=main vert refresh, 9=sub source, 10=sub resolution, 11=sub signal format, 12=sub pixel clock, 13=sub horz refresh, 14=sub vert refresh, 15=light source mode, 16=standby power mode, 17=DHCP, 18=system temperature"
  - id: read_baud_rate
    label: "Serial Port Baud Rate query"
    kind: query
    command: "~XX153 1"
    params: []
  - id: read_color_depth
    label: "Color Depth query"
    kind: query
    command: "~XX156 1"
    params: []
  - id: read_color_format
    label: "Color Format query"
    kind: query
    command: "~XX157 1"
    params: []
  - id: read_projection_hours
    label: "Projection Hours query"
    kind: query
    command: "~XX108 1"
    params: []
  - id: read_lan_ip
    label: "LAN IP Address query"
    kind: query
    command: "~XX87 3"
    params: []
  - id: read_wlan_info
    label: "WLAN info query"
    kind: query
    command: "~XX451 {spec}"
    params:
      - name: spec
        type: enum
        values: "2=AP IP address, 3=SSID, 5=start IP, 6=end IP"
  - id: read_mac_address
    label: "MAC Address query"
    kind: query
    command: "~XX555 1"
    params: []
  - id: read_fw_version
    label: "FW Version query"
    kind: query
    command: "~XX122 1"
    params: []
  - id: read_lan_fw_version
    label: "LAN FW version query"
    kind: query
    command: "~XX357 1"
    params: []
  - id: read_fan_speed
    label: "Fan Speed query"
    kind: query
    command: "~XX351 {spec}"
    params:
      - name: spec
        type: enum
        values: "1=Fan 1, 2=Fan 2, 3=Fan 3, 4=Fan 4"
  - id: read_system_temperature
    label: "System Temperature query"
    kind: query
    command: "~XX352 1"
    params: []
  - id: read_model_name
    label: "Model Name query"
    kind: query
    command: "~XX151 1"
    params: []
  - id: remote_key_simulation
    label: "Remote Navigation Simulation"
    kind: action
    command: "~XX140 {spec}"
    params:
      - name: spec
        type: enum
        values: "1=Power, 2=Power Off, 10=Up, 11=Left, 12=Enter (projection MENU), 13=Right, 14=Down, 15=V Keystone +, 16=V Keystone -, 19=Brightness, 20=Menu, 21=Zoom, 24=AV Mute, 28=Contrast, 31=Lens shift, 32=Zoom +, 33=Zoom -, 34=Focus +, 35=Focus -, 36=Mode, 40=Info, 41=Auto (Re-sync), 47=Input (Source), 51-60=numeric keys 1-9 then 0, 61=Gamma, 63=PIP, 64=Lens H Left, 65=Lens H Right, 66=Lens V Up, 67=Lens V Down, 68=H Keystone +, 69=H Keystone -, 70=Hot Key user1 (F1), 73=Pattern, 74=Exit"
```

## Feedbacks
```yaml
feedbacks:
  - id: write_ack
    type: enum
    values: "P=pass, F=fail"
  - id: read_response
    type: string
    values: "Ok<variable> on pass, F on fail"
  - id: power_state
    type: enum
    values: "0=off, 1=on"
  - id: av_mute_state
    type: enum
    values: "0=off, 1=on"
  - id: output_3d_state
    type: enum
    values: "0=2D, 1=3D"
  - id: baud_rate_value
    type: enum
    values: "9600, 14400, 19200, 38400, 57600, 115200"
  - id: model_name
    type: enum
    values: "5=Optoma WUXGA, 6=Optoma UHD"
```

## Variables
```yaml
# All settable parameters in this source are exposed as parameterized Actions
# (e.g. brightness ~XX21 0-100, power level ~XX326 1-100, keystone ~XX65 0-40).
# No additional settable non-action variables documented.
variables: []
```

## Events
```yaml
events:
  - id: info_autosend
    label: "System auto-send status"
    payload: "INFO<variable>"
    values: "0=Standby Mode, 1=Warming up, 2=Cooling Down, 3=Out of Range, 4=Lamp Fail (LED Fail), 5=Thermal Switch Error, 6=Fan Lock, 7=Over Temperature, 8=Lamp Hours Running Out, 9=Cover Open, 10=Lamp Ignite Fail, 11=Format Board Power On Fail, 12=Color Wheel Unexpected Stop, 13=Over Temperature, 14=FAN 1 Lock, 15=FAN 2 Lock, 16=FAN 3 Lock, 17=FAN 4 Lock, 18=FAN 5 Lock, 19=LAN fail then restart, 20=LD lower than 60%, 21=LD NTC (1) Over Temperature, 22=LD NTC (2) Over Temperature, 23=High Ambient Temperature, 24=System Ready"
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Error/fault status events (INFO 4-23)
# exist but no mandated operator response is documented.
```

## Notes
- Command framing: `~` + projector ID (2 digits, 00-99; 00 = all projectors) + 3-digit command code + space + variable + `<CR>` (HEX 0D). The source writes commands as `~XXnnn` where `XX` is the projector-ID placeholder; substitute the target ID. Worked example from source: ASCII `~00195 1` = HEX `7E 30 30 31 39 35 20 31 0D`. Character HEX map: `~`=7E, `0`-`9`=30-39, space=20, CR=0D.
- Serial defaults: 19200 baud, 8 data bits, no parity, 1 stop bit, no flow control, UART16550 FIFO disabled. Supported range 9600-115200 bps (default 19200); lower rates recommended for long cable runs. Baud is read back via `~XX153`; the source lists no RS-232 write command to change baud (OSD-only setting).
- Write replies: `P` pass / `F` fail. Read replies: `Ok` + variable on pass / `F` on fail. System auto-sends `INFO` + status variable unsolicited.
- Freeze can be released by menu key, exit key, and direct source key (source Note 1).
- Source is an OCR-degraded scan (headers like "Wriot CNmmand" = "Write Command"); a few rows are internally inconsistent: DICOM SIM. writes value 13 but read reply listed as 10; Standby Power Mode read shows 0/1/3 in one table and 1/2 in another; Four Corners rows reference an `~XX59` selector (values 1-16) whose exact semantics are garbled; duplicate (W)Red/Green/Blue color-matching rows appear twice. Values transcribed verbatim despite inconsistencies.
- Source mentions lamp/color-wheel era fault labels (INFO 4, 8-13) alongside laser ones (LD, NTC) — the document is Optoma's model-agnostic RS232 list shared across product lines; not all listed settings may exist in Zx500 firmware. Telnet/PJ Link/HTTP/Crestron/Extron/AMX enable toggles exist, but no ports, URLs, or protocol payloads for those control paths are documented (they are out of scope for this serial spec).
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: no confirmation this generic command list exactly matches Zx500 DAZUUZZ GCFxxUT firmware — verify against device -->

## Provenance

```yaml
source_domains:
  - region-resource.optoma.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
retrieved_at: 2026-09-21T16:56:46.085Z
last_checked_at: 2026-09-21T22:16:41.746Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-21T22:16:41.746Z
matched_actions: 177
action_count: 177
confidence: medium
summary: "All 177 spec actions match source wire literals ~XX00..~XX588 verbatim; transport 19200/8/N/1/N verbatim; only ~XX542 and ~XX545 (IR/Lens Function state reads) lack spec entries. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "~XX542"
- "~XX545"
- "model name and firmware compatibility not stated in source document (generic Optoma RS232 list); no TCP/UDP port or IP protocol details despite Telnet/PJ Link/HTTP/Crestron enable commands being present"
- "source contains no explicit safety warnings, interlock procedures,"
- "firmware version compatibility not stated in source"
- "no confirmation this generic command list exactly matches Zx500 DAZUUZZ GCFxxUT firmware — verify against device"
- "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
