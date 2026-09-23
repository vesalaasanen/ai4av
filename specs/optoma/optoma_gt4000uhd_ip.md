---
spec_id: admin/optoma-gt4000uhd
schema_version: ai4av-public-spec-v1
revision: 2
title: "Optoma GT4000UHD Control Spec"
manufacturer: Optoma
model_family: GT4000UHD
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - GT4000UHD
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - region-resource.optoma.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
retrieved_at: 2026-09-15T03:27:32.169Z
last_checked_at: 2026-09-17T22:19:55.430Z
generated_at: 2026-09-17T22:19:55.430Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port for Telnet/HTTP not stated in source"
  - "authentication procedure not described"
  - "TCP port for Telnet not stated in source"
  - "TCP port not stated in source"
  - "HTTP base URL not stated in source"
  - "source regulatory row \"Brightness Mode\" has no read command documented"
  - "source does not document multi-step sequences"
  - "source has no explicit interlock procedures. NOTE 1 only describes freeze-screen release."
  - "HTTP base URL/path not stated in source"
  - "authentication credentials not described in source"
  - "voltage/current/power specs not stated in source"
  - "firmware version compatibility range not stated in source"
  - "EDID settings present in OSD menu but no RS232 commands documented"
  - "Network Reset, WLAN Subnet Mask, LAN Subnet Mask/Gateway/DNS apply commands not documented"
  - "Brightness Mode Regulatory row has no explicit read opcode in source"
  - "Power Level Regulatory row has no explicit read opcode in source"
  - "F-MCU/S-MCU/F-Image/Formatter versions listed in source but no read opcodes documented"
verification:
  verdict: verified
  checked_at: 2026-09-17T22:19:55.430Z
  matched_actions: 313
  action_count: 313
  confidence: medium
  summary: "All 313 spec action units have literal ~XX opcode matches in the source; transport values verbatim; source catalogue essentially fully represented. (17 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-15
---

# Optoma GT4000UHD Control Spec

## Summary
Optoma GT4000UHD projector control spec covering RS-232 serial protocol (19200 baud default, 8N1) per vendor RS232 Protocol Function List. Document enumerates write/read command set, response format, and query commands. Spec also notes Telnet, HTTP, Crestron, Extron, PJ Link, AMX Device Discovery control paths enabled via ~XX458 / ~XX459. Source scoped to RS-232 only — no IP port number stated.

<!-- UNRESOLVED: TCP port for Telnet/HTTP not stated in source -->
<!-- UNRESOLVED: authentication procedure not described -->

## Transport
```yaml
# RS232 is the primary documented transport. Source also enables Telnet (~XX458)
# and HTTP (~XX459) via RS232 toggles, but does not state TCP/HTTP ports, so
# tcp/http protocol groups are emitted with UNRESOLVED addressing.
protocols:
  - serial
  - tcp  # inferred from Telnet enable command ~XX458
  - http  # inferred from HTTP enable command ~XX459
serial:
  baud_rate: 19200  # default per source; range 9600-115200 supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
# UNRESOLVED: TCP port for Telnet not stated in source
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source
  base_url: null  # UNRESOLVED: HTTP base URL not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from Power On/Off commands (~XX00)
- routable   # inferred from input source select commands (~XX12, ~XX305)
- queryable  # inferred from query commands (~XX121, ~XX122, ~XX124, ~XX125-129, ~XX150, ~XX151, ~XX353, etc.)
- levelable  # inferred from brightness/contrast/volume-style range commands
```

## Actions
```yaml
# CRITICAL: write/read command format = "~XX{cmmd} {param}<CR>"
# Lead code "~", Projector ID (00-99, 00=all), Command (000-999), space, param (0-9999), CR (0x0D).
# Response on pass: "P"; on fail: "F". Read pass: "O k {value}".
# Each command below maps to a distinct source row.
- id: power_on
  label: Power On
  kind: action
  command: "~XX00 1"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "~XX00 0"
  params: []

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "~XX124"
  params: []
  # returns: Ok0 (off) / Ok1 (on)

- id: re_sync
  label: Re-Sync
  kind: action
  command: "~XX01 1"
  params: []

- id: av_mute_off
  label: AV Mute Off
  kind: action
  command: "~XX02 0"
  params: []

- id: av_mute_on
  label: AV Mute On
  kind: action
  command: "~XX02 1"
  params: []

- id: av_mute_query
  label: AV Mute Query
  kind: query
  command: "~XX355"
  params: []
  # returns: Ok0 / Ok1

- id: freeze_unfreeze
  label: Freeze Unfreeze
  kind: action
  command: "~XX04 0"
  params: []

- id: freeze_freeze
  label: Freeze Freeze
  kind: action
  command: "~XX04 1"
  params: []

- id: display_mode
  label: Display Mode
  kind: action
  command: "~XX20 {n}"
  params:
    - name: n
      type: integer
      description: "0=No Signal, 1=Presentation, 2=Bright, 3=Cinema, 4=sRGB, 5=User, 9=3D, 10=DICOM SIM, 13=DICOM SIM alt, 19=Blending, 21=HDR"
  # read: ~XX123

- id: display_mode_query
  label: Display Mode Query
  kind: query
  command: "~XX123"
  params: []

- id: wall_color
  label: Wall Color
  kind: action
  command: "~XX506 {n}"
  params:
    - name: n
      type: integer
      description: "0=Off, 1=Blackboard, 3=Light Green, 4=Light Blue, 5=Pink, 6=Gray, 7=Light Yellow"

- id: hdr
  label: HDR (DynamicRange)
  kind: action
  command: "~XX565 {n}"
  params:
    - name: n
      type: integer
      description: "0=Off, 1=Auto"

- id: hdr_picture_mode
  label: HDR Picture Mode
  kind: action
  command: "~XX566 {n}"
  params:
    - name: n
      type: integer
      description: "0=Bright, 1=Standard, 2=Film, 3=Detail, 4=SMPTE 2084"

- id: brightness_decrement
  label: Brightness -
  kind: action
  command: "~XX46 1"
  params: []

- id: brightness_increment
  label: Brightness +
  kind: action
  command: "~XX46 2"
  params: []

- id: brightness_set
  label: Brightness Set
  kind: action
  command: "~XX21 {0-100}"
  params:
    - name: value
      type: integer
      description: "0..100"

- id: brightness_query
  label: Brightness Query
  kind: query
  command: "~XX125"
  params: []

- id: contrast_decrement
  label: Contrast -
  kind: action
  command: "~XX47 1"
  params: []

- id: contrast_increment
  label: Contrast +
  kind: action
  command: "~XX47 2"
  params: []

- id: contrast_set
  label: Contrast Set
  kind: action
  command: "~XX22 {0-100}"
  params:
    - name: value
      type: integer
      description: "0..100"

- id: contrast_query
  label: Contrast Query
  kind: query
  command: "~XX126"
  params: []

- id: sharpness_set
  label: Sharpness Set
  kind: action
  command: "~XX23 {1-15}"
  params:
    - name: value
      type: integer
      description: "1..15"

- id: color_set
  label: Color Set
  kind: action
  command: "~XX45 {0-100}"
  params:
    - name: value
      type: integer
      description: "0..100"

- id: tint_set
  label: Tint Set
  kind: action
  command: "~XX44 {0-100}"
  params:
    - name: value
      type: integer
      description: "0..100"

- id: gamma
  label: Gamma
  kind: action
  command: "~XX35 {n}"
  params:
    - name: n
      type: integer
      description: "1=Film, 2=Video, 3=Graphics, 4=Standard(2.2), 5=1.8, 6=2.0, 11=DICOM SIM, 12=2.4"

- id: brilliant_color
  label: BrilliantColor
  kind: action
  command: "~XX34 {0-10}"
  params:
    - name: value
      type: integer
      description: "0..10"

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "~XX36 {n}"
  params:
    - name: n
      type: integer
      description: "1=Standard, 2=Cool, 4=Warm"
  # read: ~XX128 returns 0=Standard, 1=Cool, 3=Warm

- id: color_temperature_query
  label: Color Temperature Query
  kind: query
  command: "~XX128"
  params: []

- id: color_match_r_hue
  label: Color Match R Hue
  kind: action
  command: "~XX327 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_r_saturation
  label: Color Match R Saturation
  kind: action
  command: "~XX333 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_r_gain
  label: Color Match R Gain
  kind: action
  command: "~XX339 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_g_hue
  label: Color Match G Hue
  kind: action
  command: "~XX328 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_g_saturation
  label: Color Match G Saturation
  kind: action
  command: "~XX334 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_g_gain
  label: Color Match G Gain
  kind: action
  command: "~XX340 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_b_hue
  label: Color Match B Hue
  kind: action
  command: "~XX329 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_b_saturation
  label: Color Match B Saturation
  kind: action
  command: "~XX335 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_b_gain
  label: Color Match B Gain
  kind: action
  command: "~XX341 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_c_hue
  label: Color Match C Hue
  kind: action
  command: "~XX330 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_c_saturation
  label: Color Match C Saturation
  kind: action
  command: "~XX336 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_c_gain
  label: Color Match C Gain
  kind: action
  command: "~XX342 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_m_hue
  label: Color Match M Hue
  kind: action
  command: "~XX332 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_m_saturation
  label: Color Match M Saturation
  kind: action
  command: "~XX338 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_m_gain
  label: Color Match M Gain
  kind: action
  command: "~XX344 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_y_hue
  label: Color Match Y Hue
  kind: action
  command: "~XX331 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_y_saturation
  label: Color Match Y Saturation
  kind: action
  command: "~XX337 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_y_gain
  label: Color Match Y Gain
  kind: action
  command: "~XX343 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_w_red
  label: Color Match W Red
  kind: action
  command: "~XX345 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_w_green
  label: Color Match W Green
  kind: action
  command: "~XX346 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_w_blue
  label: Color Match W Blue
  kind: action
  command: "~XX347 {0-254}"
  params:
    - name: value
      type: integer
      description: "0..254"

- id: color_match_reset
  label: Color Match Reset
  kind: action
  command: "~XX215 1"
  params:
    - name: confirm
      type: enum
      values: [cancel, yes]

- id: rgb_gain_red
  label: Red Gain
  kind: action
  command: "~XX24 {0-100}"
  params:
    - name: value
      type: integer
      description: "0..100"

- id: rgb_gain_green
  label: Green Gain
  kind: action
  command: "~XX25 {0-100}"
  params:
    - name: value
      type: integer
      description: "0..100"

- id: rgb_gain_blue
  label: Blue Gain
  kind: action
  command: "~XX26 {0-100}"
  params:
    - name: value
      type: integer
      description: "0..100"

- id: rgb_bias_red
  label: Red Bias
  kind: action
  command: "~XX27 {0-100}"
  params:
    - name: value
      type: integer
      description: "0..100"

- id: rgb_bias_green
  label: Green Bias
  kind: action
  command: "~XX28 {0-100}"
  params:
    - name: value
      type: integer
      description: "0..100"

- id: rgb_bias_blue
  label: Blue Bias
  kind: action
  command: "~XX29 {0-100}"
  params:
    - name: value
      type: integer
      description: "0..100"

- id: rgb_gain_bias_reset
  label: RGB Gain/Bias Reset
  kind: action
  command: "~XX517 1"
  params: []

- id: color_space
  label: Color Space
  kind: action
  command: "~XX37 {n}"
  params:
    - name: n
      type: integer
      description: "1=Auto, 2=RGB(0-255), 3=YUV, 4=RGB(16-235)"

- id: ultra_detail
  label: UltraDetail
  kind: action
  command: "~XX41 {n}"
  params:
    - name: n
      type: integer
      description: "0=Off, 4=1, 5=2, 6=3"

- id: extreme_black
  label: Extreme Black
  kind: action
  command: "~XX218 {n}"
  params:
    - name: n
      type: integer
      description: "0=Off, 1=On"

- id: dynamic_black
  label: Dynamic Black
  kind: action
  command: "~XX191 {n}"
  params:
    - name: n
      type: integer
      description: "0=Off, 1=On"

- id: brightness_mode
  label: Brightness Mode
  kind: action
  command: "~XX110 {n}"
  params:
    - name: n
      type: integer
      description: "2=Eco Mode, 6=Constant Power, 7=Constant Luminance"

- id: power_level
  label: Power Level
  kind: action
  command: "~XX326 {1-100}"
  params:
    - name: value
      type: integer
      description: "1..100"

- id: pure_contrast
  label: PureContrast
  kind: action
  command: "~XX219 {n}"
  params:
    - name: n
      type: integer
      description: "0=Off, 1=On"

- id: pure_color
  label: PureColor
  kind: action
  command: "~XX42 {n}"
  params:
    - name: n
      type: integer
      description: "0=Off, 1..5"

- id: pure_motion
  label: PureMotion
  kind: action
  command: "~XX190 {n}"
  params:
    - name: n
      type: integer
      description: "0=Off, 1=1, 2=2, 3=3"

- id: pure_motion_demo
  label: PureMotion Demo
  kind: action
  command: "~XX197 {n}"
  params:
    - name: n
      type: integer
      description: "0=Off, 1=H Split, 2=V Split"

- id: image_reset
  label: Image Settings Reset
  kind: action
  command: "~XX509 1"
  params: []

- id: threed_mode
  label: 3D Mode
  kind: action
  command: "~XX230 {n}"
  params:
    - name: n
      type: integer
      description: "0=Off, 4=On"

- id: threed_format
  label: 3D Format
  kind: action
  command: "~XX405 {n}"
  params:
    - name: n
      type: integer
      description: "0=Auto, 1=Side by Side, 2=Top and Bottom, 3=Frame Sequential, 7=Frame Packing"

- id: threed_2d
  label: 3D-2D
  kind: action
  command: "~XX400 {n}"
  params:
    - name: n
      type: integer
      description: "0=3D, 1=L, 2=R"

- id: threed_sync_invert
  label: 3D Sync Invert
  kind: action
  command: "~XX231 {n}"
  params:
    - name: n
      type: integer
      description: "0=Off, 1=On"

- id: threed_sync_out
  label: 3D Sync Out
  kind: action
  command: "~XX232 {n}"
  params:
    - name: n
      type: integer
      description: "0=To Emitter, 1=To Next Projector"

- id: lr_reference
  label: L/R Reference
  kind: action
  command: "~XX236 {n}"
  params:
    - name: n
      type: integer
      description: "0=Field GPIO, 1=1ST Frame"

- id: threed_frame_delay
  label: 3D Frame Delay
  kind: action
  command: "~XX233 {1-200}"
  params:
    - name: value
      type: integer
      description: "1..200"

- id: threed_frame_delay_query
  label: 3D Frame Delay Query
  kind: query
  command: "~XX233"
  params: []

- id: threed_reset
  label: 3D Reset
  kind: action
  command: "~XX234 1"
  params: []

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "~XX60 {n}"
  params:
    - name: n
      type: integer
      description: "1=4:3, 2=16:9, 3=16:10, 5=LBX, 6=Native, 7=Auto"
  # read: ~XX127

- id: aspect_ratio_query
  label: Aspect Ratio Query
  kind: query
  command: "~XX127"
  params: []

- id: digital_zoom_h
  label: Digital Zoom H
  kind: action
  command: "~XX504 {50-400}"
  params:
    - name: value
      type: integer
      description: "50..400 (%)"
  # read: ~XX543 param 8

- id: digital_zoom_v
  label: Digital Zoom V
  kind: action
  command: "~XX505 {50-400}"
  params:
    - name: value
      type: integer
      description: "50..400 (%)"
  # read: ~XX543 param 7

- id: image_shift_h
  label: Image Shift H
  kind: action
  command: "~XX63 {0-100}"
  params:
    - name: value
      type: integer
      description: "0..100"

- id: image_shift_v
  label: Image Shift V
  kind: action
  command: "~XX64 {0-100}"
  params:
    - name: value
      type: integer
      description: "0..100"

- id: geometric_h_arc
  label: H Arc
  kind: action
  command: "~XX300 {0-100}"
  params:
    - name: value
      type: integer
      description: "0..100"

- id: geometric_v_arc
  label: V Arc
  kind: action
  command: "~XX301 {0-100}"
  params:
    - name: value
      type: integer
      description: "0..100"

- id: four_corners_topleft_x
  label: Four Corners Top-Left X
  kind: action
  command: "~XX581 {0-120}"
  params:
    - name: value
      type: integer
      description: "0..120"

- id: four_corners_topleft_y
  label: Four Corners Top-Left Y
  kind: action
  command: "~XX582 {0-80}"
  params:
    - name: value
      type: integer
      description: "0..80"

- id: four_corners_topright_x
  label: Four Corners Top-Right X
  kind: action
  command: "~XX583 {0-120}"
  params:
    - name: value
      type: integer
      description: "0..120"

- id: four_corners_topright_y
  label: Four Corners Top-Right Y
  kind: action
  command: "~XX584 {0-80}"
  params:
    - name: value
      type: integer
      description: "0..80"

- id: four_corners_bottomleft_x
  label: Four Corners Bottom-Left X
  kind: action
  command: "~XX585 {0-120}"
  params:
    - name: value
      type: integer
      description: "0..120"

- id: four_corners_bottomleft_y
  label: Four Corners Bottom-Left Y
  kind: action
  command: "~XX586 {0-80}"
  params:
    - name: value
      type: integer
      description: "0..80"

- id: four_corners_bottomright_x
  label: Four Corners Bottom-Right X
  kind: action
  command: "~XX587 {0-120}"
  params:
    - name: value
      type: integer
      description: "0..120"

- id: four_corners_bottomright_y
  label: Four Corners Bottom-Right Y
  kind: action
  command: "~XX588 {0-80}"
  params:
    - name: value
      type: integer
      description: "0..80"

- id: four_corners_top_left_apply
  label: Four Corners Apply Top-Left
  kind: action
  command: "~XX59 1"
  params: []
  # Note: source lists TL/TR/BL/BR apply as ~XX59 sub-values 1-16

- id: four_corners_top_right_apply
  label: Four Corners Apply Top-Right
  kind: action
  command: "~XX59 5"
  params: []

- id: four_corners_bottom_left_apply
  label: Four Corners Apply Bottom-Left
  kind: action
  command: "~XX59 9"
  params: []

- id: four_corners_bottom_right_apply
  label: Four Corners Apply Bottom-Right
  kind: action
  command: "~XX59 13"
  params: []

- id: h_keystone
  label: H Keystone
  kind: action
  command: "~XX65 {0-40}"
  params:
    - name: value
      type: integer
      description: "0..40"

- id: v_keystone
  label: V Keystone
  kind: action
  command: "~XX66 {0-40}"
  params:
    - name: value
      type: integer
      description: "0..40"

- id: warp_blend_pc_connection
  label: Warp/Blend PC Connection
  kind: query
  command: "~XX132 3"
  params: []
  # returns: Ok0 (No) / Ok1 (Yes)

- id: warp_blend_settings
  label: Warp/Blend Settings
  kind: action
  command: "~XX142 {n}"
  params:
    - name: n
      type: integer
      description: "0=All Off, 3=All On, 4=Blend Off"
  # read: ~XX132 1

- id: warp_blend_memory
  label: Warp/Blend Memory
  kind: action
  command: "~XX147 {n}"
  params:
    - name: n
      type: integer
      description: "0=Off, 1=User1, 2=User2, 3=User3"
  # read: ~XX137

- id: warp_blend_memory_query
  label: Warp/Blend Memory Query
  kind: query
  command: "~XX137"
  params: []

- id: geometric_reset
  label: Geometric Correction Reset
  kind: action
  command: "~XX561 1"
  params: []

- id: pip_pbp_screen
  label: PIP/PBP Screen
  kind: action
  command: "~XX302 {n}"
  params:
    - name: n
      type: integer
      description: "0=Off, 1=PIP, 2=PBP"

- id: pip_pbp_location
  label: PIP/PBP Location
  kind: action
  command: "~XX303 {n}"
  params:
    - name: n
      type: integer
      description: "1=PIP-TopLeft, 2=PIP-TopRight, 3=PIP-Bottom Left, 4=PIP-Bottom Right, 5=PBP Main Left, 6=PBP Main Top, 7=PBP Main Right, 8=PBP Main Bottom"

- id: pip_pbp_size
  label: PIP/PBP Size
  kind: action
  command: "~XX304 {n}"
  params:
    - name: n
      type: integer
      description: "1=Large, 2=Medium, 3=Small"

- id: main_source_hdmi1
  label: Main Source HDMI1
  kind: action
  command: "~XX12 1"
  params: []
  # read: ~XX121 returns Ok7

- id: main_source_hdmi2
  label: Main Source HDMI2
  kind: action
  command: "~XX12 15"
  params: []
  # read: ~XX121 returns Ok8

- id: main_source_displayport
  label: Main Source DisplayPort
  kind: action
  command: "~XX12 20"
  params: []
  # read: ~XX121 returns Ok15

- id: main_source_hdbaset
  label: Main Source HDBaseT
  kind: action
  command: "~XX12 21"
  params: []
  # read: ~XX121 returns Ok16

- id: main_source_3gsdi
  label: Main Source 3G-SDI
  kind: action
  command: "~XX12 22"
  params: []
  # read: ~XX121 returns Ok18

- id: sub_source_hdmi1
  label: Sub Source HDMI1
  kind: action
  command: "~XX305 1"
  params: []
  # read: ~XX131 returns Ok7

- id: sub_source_hdmi2
  label: Sub Source HDMI2
  kind: action
  command: "~XX305 4"
  params: []
  # read: ~XX131 returns Ok8

- id: sub_source_displayport
  label: Sub Source DisplayPort
  kind: action
  command: "~XX305 17"
  params: []
  # read: ~XX131 returns Ok15

- id: sub_source_hdbaset
  label: Sub Source HDBaseT
  kind: action
  command: "~XX305 10"
  params: []
  # read: ~XX131 returns Ok16

- id: sub_source_3gsdi
  label: Sub Source 3G-SDI
  kind: action
  command: "~XX305 11"
  params: []
  # read: ~XX131 returns Ok17

- id: pip_pbp_swap
  label: PIP/PBP Swap
  kind: action
  command: "~XX306 1"
  params: []

- id: projection_mode
  label: Projection Mode
  kind: action
  command: "~XX71 {n}"
  params:
    - name: n
      type: integer
      description: "1=Front, 2=Rear, 3=Ceiling-top, 4=Rear-top"
  # read: ~XX129

- id: projection_mode_query
  label: Projection Mode Query
  kind: query
  command: "~XX129"
  params: []

- id: lens_zoom_plus
  label: Lens Zoom +
  kind: action
  command: "~XX307 1"
  params: []

- id: lens_zoom_minus
  label: Lens Zoom -
  kind: action
  command: "~XX307 2"
  params: []

- id: lens_focus_plus
  label: Lens Focus +
  kind: action
  command: "~XX308 1"
  params: []

- id: lens_focus_minus
  label: Lens Focus -
  kind: action
  command: "~XX308 2"
  params: []

- id: lens_function_lock
  label: Lens Function Lock
  kind: action
  command: "~XX349 1"
  params: []

- id: lens_function_unlock
  label: Lens Function Unlock
  kind: action
  command: "~XX349 2"
  params: []

- id: lens_function_query
  label: Lens Function Query
  kind: query
  command: "~XX545 4"
  params: []

- id: lens_shift_up
  label: Lens Shift Up
  kind: action
  command: "~XX84 3"
  params: []

- id: lens_shift_down
  label: Lens Shift Down
  kind: action
  command: "~XX84 4"
  params: []

- id: lens_shift_left
  label: Lens Shift Left
  kind: action
  command: "~XX84 5"
  params: []

- id: lens_shift_right
  label: Lens Shift Right
  kind: action
  command: "~XX84 6"
  params: []

- id: lens_calibration_yes
  label: Lens Calibration Yes
  kind: action
  command: "~XX525 1"
  params: []

- id: lens_calibration_no
  label: Lens Calibration No
  kind: action
  command: "~XX525 0"
  params: []

- id: lens_memory_apply
  label: Lens Memory Apply Position
  kind: action
  command: "~XX359 {1-5}"
  params:
    - name: position
      type: integer
      description: "1..5"

- id: lens_memory_save
  label: Lens Memory Save Current Position
  kind: action
  command: "~XX360 {1-5}"
  params:
    - name: position
      type: integer
      description: "1..5"

- id: lens_memory_reset
  label: Lens Memory Reset
  kind: action
  command: "~XX361 1"
  params:

- id: direct_power_on_off
  label: Direct Power On Off
  kind: action
  command: "~XX105 0"
  params: []

- id: direct_power_on_on
  label: Direct Power On On
  kind: action
  command: "~XX105 1"
  params: []

- id: auto_power_off
  label: Auto Power Off (min)
  kind: action
  command: "~XX106 {0-180}"
  params:
    - name: minutes
      type: integer
      description: "0..180 in 5-minute increments"

- id: sleep_timer
  label: Sleep Timer (min)
  kind: action
  command: "~XX107 {000-990}"
  params:
    - name: minutes
      type: integer
      description: "000..990 in 30-minute increments"

- id: always_on_no
  label: Always On No
  kind: action
  command: "~XX507 0"
  params: []

- id: always_on_yes
  label: Always On Yes
  kind: action
  command: "~XX507 1"
  params: []

- id: power_mode_standby_eco
  label: Power Mode (Standby) Eco
  kind: action
  command: "~XX114 0"
  params: []
  # read: ~XX150 16 returns Ok1

- id: power_mode_standby_active
  label: Power Mode (Standby) Active
  kind: action
  command: "~XX114 1"
  params: []
  # read: ~XX150 16 returns Ok0

- id: power_mode_standby_communications
  label: Power Mode (Standby) Communications
  kind: action
  command: "~XX114 3"
  params: []
  # read: ~XX150 16 returns Ok3

- id: power_mode_standby_query
  label: Power Mode (Standby) Query
  kind: query
  command: "~XX150 16"
  params: []

- id: security_off
  label: Security Off
  kind: action
  command: "~XX78 0 nnnn"
  params:
    - name: code
      type: string
      description: "4-digit passcode"

- id: security_on
  label: Security On
  kind: action
  command: "~XX78 1 nnnn"
  params:
    - name: code
      type: string
      description: "4-digit passcode"

- id: security_timer_month
  label: Security Timer Month
  kind: action
  command: "~XX537 {00-12}"
  params:
    - name: month
      type: string
      description: "00..12"
  # read: ~XX544 1

- id: security_timer_day
  label: Security Timer Day
  kind: action
  command: "~XX538 {00-29}"
  params:
    - name: day
      type: string
      description: "00..29"
  # read: ~XX544 2

- id: security_timer_hour
  label: Security Timer Hour
  kind: action
  command: "~XX539 {00-23}"
  params:
    - name: hour
      type: string
      description: "00..23"
  # read: ~XX544 3

- id: security_timer_set
  label: Security Timer Set (RS232 only)
  kind: action
  command: "~XX77 MMDDHH"
  params:
    - name: mmddhh
      type: string
      description: "MMDDHH format"

- id: test_pattern
  label: Test Pattern
  kind: action
  command: "~XX195 {n}"
  params:
    - name: n
      type: integer
      description: "0=Off, 1=White Grid, 2=White, 3=Green Grid, 4=Magenta Grid, 5=Red, 6=Green, 7=Blue, 8=Yellow, 9=Magenta, 10=Cyan, 11=Black"

- id: ir_front_off
  label: IR Front Off
  kind: action
  command: "~XX11 4"
  params: []
  # read: ~XX542 1

- id: ir_front_on
  label: IR Front On
  kind: action
  command: "~XX11 5"
  params: []
  # read: ~XX542 1

- id: ir_top_off
  label: IR Top Off
  kind: action
  command: "~XX11 6"
  params: []
  # read: ~XX542 2

- id: ir_top_on
  label: IR Top On
  kind: action
  command: "~XX11 7"
  params: []
  # read: ~XX542 2

- id: ir_hdbaset_off
  label: IR HDBaseT Off
  kind: action
  command: "~XX11 10"
  params: []

- id: ir_hdbaset_on
  label: IR HDBaseT On
  kind: action
  command: "~XX11 9"
  params: []

- id: ir_front_query
  label: IR Front Query
  kind: query
  command: "~XX542 1"
  params: []

- id: ir_top_query
  label: IR Top Query
  kind: query
  command: "~XX542 2"
  params: []

- id: remote_code_set
  label: Remote Code Set
  kind: action
  command: "~XX350 {00-99}"
  params:
    - name: code
      type: string
      description: "00..99"

- id: remote_code_query
  label: Remote Code Query
  kind: query
  command: "~XX350"
  params: []

- id: hot_key_settings
  label: Hot-Key Settings
  kind: action
  command: "~XX117 {1-2}"
  params:
    - name: value
      type: integer
      description: "1=Aspect Ratio, 2=Freeze Screen"

- id: trigger_12v_off
  label: 12V Trigger Off
  kind: action
  command: "~XX192 0"
  params: []

- id: trigger_12v_on
  label: 12V Trigger On
  kind: action
  command: "~XX192 1"
  params: []

- id: projector_id_set
  label: Projector ID Set
  kind: action
  command: "~XX79 {00-99}"
  params:
    - name: id
      type: string
      description: "00..99"

- id: projector_id_query
  label: Projector ID Query
  kind: query
  command: "~XX558"
  params: []

- id: light_sensor_default
  label: Light Sensor Default
  kind: action
  command: "~XX552 0"
  params: []

- id: light_sensor_manual
  label: Light Sensor Manual
  kind: action
  command: "~XX552 2"
  params: []

- id: light_sensor_calibration
  label: Light Sensor Calibration
  kind: action
  command: "~XX552 2"
  params: []
  # NOTE: source maps Default=0, Manual=2, and Calibration row also = 2.
  # Source row "Light Sensor Calibration" is a single discrete action in the doc.

- id: keypad_led_off
  label: Keypad LED Off
  kind: action
  command: "~XX362 0"
  params: []

- id: keypad_led_on
  label: Keypad LED On
  kind: action
  command: "~XX362 1"
  params: []

- id: language
  label: Language
  kind: action
  command: "~XX70 {n}"
  params:
    - name: n
      type: integer
      description: "1=English, 2=Deutsch, 3=Français, 4=Italiano, 5=Español, 6=Português, 7=Polski, 8=Nederlands, 9=Svenska, 10=Norsk/Dansk, 11=Suomi, 12=ελληνικά, 13=繁體中文, 14=簡体中文, 15=日本語, 16=한국어, 17=Русский, 18=Magyar, 19=Čeština, 21=ไทย, 22=Türkçe, 25=TiếngViệt, 26=Bahasa Indonesia, 27=Română, 28=Slovakian"

- id: menu_location
  label: Menu Location
  kind: action
  command: "~XX72 {n}"
  params:
    - name: n
      type: integer
      description: "1=Top left, 2=Top right, 3=Center, 4=Bottom left, 5=Bottom right"

- id: menu_transparency
  label: Menu Transparency
  kind: action
  command: "~XX526 {0-9}"
  params:
    - name: value
      type: integer
      description: "0..9"

- id: menu_timer
  label: Menu Timer
  kind: action
  command: "~XX515 {n}"
  params:
    - name: n
      type: integer
      description: "0=Off, 1=5s, 3=10s, 4=15s"

- id: auto_source_off
  label: Auto Source Off
  kind: action
  command: "~XX563 0"
  params: []

- id: auto_source_on
  label: Auto Source On
  kind: action
  command: "~XX563 1"
  params: []

- id: input_source_hdmi1
  label: Input Source HDMI1
  kind: action
  command: "~XX12 1"
  params: []
  # read: ~XX121 Ok7

- id: input_source_hdmi2
  label: Input Source HDMI2
  kind: action
  command: "~XX12 15"
  params: []
  # read: ~XX121 Ok8

- id: input_source_displayport
  label: Input Source DisplayPort
  kind: action
  command: "~XX12 20"
  params: []
  # read: ~XX121 Ok15

- id: input_source_hdbaset
  label: Input Source HDBaseT
  kind: action
  command: "~XX12 21"
  params: []
  # read: ~XX121 Ok16

- id: input_source_3gsdi
  label: Input Source 3G-SDI
  kind: action
  command: "~XX12 22"
  params: []
  # read: ~XX121 Ok18

- id: input_source_query
  label: Input Source Query
  kind: query
  command: "~XX121"
  params: []

- id: sub_source_query
  label: Sub Source Query
  kind: query
  command: "~XX131"
  params: []

- id: high_altitude_off
  label: High Altitude Off
  kind: action
  command: "~XX101 0"
  params: []

- id: high_altitude_on
  label: High Altitude On
  kind: action
  command: "~XX101 1"
  params: []

- id: information_hide_off
  label: Information Hide Off
  kind: action
  command: "~XX102 0"
  params: []

- id: information_hide_on
  label: Information Hide On
  kind: action
  command: "~XX102 1"
  params: []

- id: logo
  label: Logo
  kind: action
  command: "~XX82 {n}"
  params:
    - name: n
      type: integer
      description: "1=Default, 3=Neutral"

- id: background_color
  label: Background Color
  kind: action
  command: "~XX104 {n}"
  params:
    - name: n
      type: integer
      description: "0=None, 1=Blue, 3=Red, 4=Green, 6=Gray, 7=Logo"

- id: serial_port_baud_rate_query
  label: Serial Port Baud Rate Query
  kind: query
  command: "~XX153"
  params: []
  # returns: 9600 / 14400 / 19200 / 38400 / 57600 / 115200

- id: serial_port_path_rs232
  label: Serial Port Path RS232
  kind: action
  command: "~XX557 1"
  params: []

- id: serial_port_path_hdbaset
  label: Serial Port Path HDBaseT
  kind: action
  command: "~XX557 2"
  params: []

- id: system_update_notification_on
  label: System Update Notification On
  kind: action
  command: "~XX168 1"
  params: []
  # read: ~XX158

- id: system_update_notification_off
  label: System Update Notification Off
  kind: action
  command: "~XX168 0"
  params: []
  # read: ~XX158

- id: system_update_notification_query
  label: System Update Notification Query
  kind: query
  command: "~XX158"
  params: []

- id: system_update
  label: System Update
  kind: action
  command: "~XX168 9"
  params:
    - name: confirm
      type: enum
      values: [cancel, yes]

- id: reset_osd
  label: Reset OSD
  kind: action
  command: "~XX546 1"
  params:
    - name: confirm
      type: enum
      values: [cancel, yes]

- id: reset_to_default
  label: Reset to Default
  kind: action
  command: "~XX112 1"
  params:
    - name: confirm
      type: enum
      values: [cancel, yes]

- id: wlan_off
  label: WLAN Off
  kind: action
  command: "~XX450 0"
  params: []

- id: wlan_on
  label: WLAN On
  kind: action
  command: "~XX450 1"
  params: []

- id: wlan_ip_address_query
  label: WLAN IP Address Query
  kind: query
  command: "~XX451 2"
  params: []

- id: wlan_start_ip_query
  label: WLAN Start IP Query
  kind: query
  command: "~XX451 5"
  params: []

- id: wlan_end_ip_query
  label: WLAN End IP Query
  kind: query
  command: "~XX451 6"
  params: []

- id: wlan_ssid_query
  label: WLAN SSID Query
  kind: query
  command: "~XX451 3"
  params: []

- id: lan_mac_address_query
  label: LAN MAC Address Query
  kind: query
  command: "~XX555"
  params: []

- id: lan_dhcp_query
  label: LAN DHCP Query
  kind: query
  command: "~XX150 17"
  params: []
  # returns: Ok0 (Off) / Ok1 (On)
  # NOTE: source also reuses ~XX150 17 for Standby Power "Off" in the regulatory table

- id: lan_ip_address_query
  label: LAN IP Address Query
  kind: query
  command: "~XX87 3"
  params: []

- id: crestron_off
  label: Crestron Off
  kind: action
  command: "~XX454 0"
  params: []

- id: crestron_on
  label: Crestron On
  kind: action
  command: "~XX454 1"
  params: []

- id: extron_off
  label: Extron Off
  kind: action
  command: "~XX455 0"
  params: []

- id: extron_on
  label: Extron On
  kind: action
  command: "~XX455 1"
  params: []

- id: pj_link_off
  label: PJ Link Off
  kind: action
  command: "~XX456 0"
  params: []

- id: pj_link_on
  label: PJ Link On
  kind: action
  command: "~XX456 1"
  params: []

- id: amx_device_discovery_off
  label: AMX Device Discovery Off
  kind: action
  command: "~XX457 0"
  params: []

- id: amx_device_discovery_on
  label: AMX Device Discovery On
  kind: action
  command: "~XX457 1"
  params: []

- id: telnet_off
  label: Telnet Off
  kind: action
  command: "~XX458 0"
  params: []

- id: telnet_on
  label: Telnet On
  kind: action
  command: "~XX458 1"
  params: []

- id: http_off
  label: HTTP Off
  kind: action
  command: "~XX459 0"
  params: []

- id: http_on
  label: HTTP On
  kind: action
  command: "~XX459 1"
  params: []

- id: serial_number_query
  label: Serial Number Query
  kind: query
  command: "~XX353"
  params: []

- id: main_resolution_query
  label: Main Resolution Query
  kind: query
  command: "~XX150 4"
  params: []

- id: main_signal_format_query
  label: Main Signal Format Query
  kind: query
  command: "~XX150 5"
  params: []

- id: main_pixel_clock_query
  label: Main Pixel Clock Query
  kind: query
  command: "~XX150 6"
  params: []

- id: main_horz_refresh_query
  label: Main Horz Refresh Query
  kind: query
  command: "~XX150 7"
  params: []

- id: main_vert_refresh_query
  label: Main Vert Refresh Query
  kind: query
  command: "~XX150 8"
  params: []

- id: sub_resolution_query
  label: Sub Resolution Query
  kind: query
  command: "~XX150 10"
  params: []

- id: sub_signal_format_query
  label: Sub Signal Format Query
  kind: query
  command: "~XX150 11"
  params: []

- id: sub_pixel_clock_query
  label: Sub Pixel Clock Query
  kind: query
  command: "~XX150 12"
  params: []

- id: sub_horz_refresh_query
  label: Sub Horz Refresh Query
  kind: query
  command: "~XX150 13"
  params: []

- id: sub_vert_refresh_query
  label: Sub Vert Refresh Query
  kind: query
  command: "~XX545 14"
  params: []

- id: display_mode_query_info
  label: Display Mode Info Query
  kind: query
  command: "~XX123"
  params: []

- id: system_temperature_query
  label: System Temperature Query
  kind: query
  command: "~XX150 18"
  params: []

- id: color_depth_query
  label: Color Depth Query
  kind: query
  command: "~XX156"
  params: []

- id: color_format_query
  label: Color Format Query
  kind: query
  command: "~XX157"
  params: []

- id: projection_hours_query
  label: Projection Hours Query
  kind: query
  command: "~XX108"
  params: []

- id: fw_version_query
  label: FW Version Query (Global)
  kind: query
  command: "~XX122"
  params: []

- id: model_name_query
  label: Model Name Query
  kind: query
  command: "~XX151"
  params: []
  # returns: Ok5 (Optoma WUXGA), Ok6 (Optoma UHD)

- id: software_version_query
  label: Software Version Query
  kind: query
  command: "~XX122"
  params: []

- id: lan_fw_version_query
  label: LAN FW Version Query
  kind: query
  command: "~XX357"
  params: []

- id: fan_speed_query
  label: Fan Speed Query
  kind: query
  command: "~XX351 {1-4}"
  params:
    - name: fan
      type: integer
      description: "1=Fan1, 2=Fan2, 3=Fan3, 4=Fan4"

- id: system_temperature_direct_query
  label: System Temperature Direct Query
  kind: query
  command: "~XX352"
  params: []

- id: info_string_query
  label: Info String Query
  kind: query
  command: "~XX150 1"
  params: []

- id: native_resolution_query
  label: Native Resolution Query
  kind: query
  command: "~XX150 2"
  params: []

- id: main_source_info_query
  label: Main Source Info Query
  kind: query
  command: "~XX150 3"
  params: []

- id: main_resolution_info_query
  label: Main Resolution Info Query
  kind: query
  command: "~XX150 4"
  params: []

- id: main_signal_format_info_query
  label: Main Signal Format Info Query
  kind: query
  command: "~XX150 5"
  params: []

- id: main_pixel_clock_info_query
  label: Main Pixel Clock Info Query
  kind: query
  command: "~XX150 6"
  params: []

- id: main_horz_refresh_info_query
  label: Main Horz Refresh Info Query
  kind: query
  command: "~XX150 7"
  params: []

- id: main_vert_refresh_info_query
  label: Main Vert Refresh Info Query
  kind: query
  command: "~XX150 8"
  params: []

- id: sub_source_info_query
  label: Sub Source Info Query
  kind: query
  command: "~XX150 9"
  params: []

- id: sub_resolution_info_query
  label: Sub Resolution Info Query
  kind: query
  command: "~XX150 10"
  params: []

- id: sub_signal_format_info_query
  label: Sub Signal Format Info Query
  kind: query
  command: "~XX150 11"
  params: []

- id: sub_pixel_clock_info_query
  label: Sub Pixel Clock Info Query
  kind: query
  command: "~XX150 12"
  params: []

- id: sub_horz_refresh_info_query
  label: Sub Horz Refresh Info Query
  kind: query
  command: "~XX150 13"
  params: []

- id: sub_vert_refresh_info_query
  label: Sub Vert Refresh Info Query
  kind: query
  command: "~XX150 14"
  params: []

- id: light_source_mode_query
  label: Light Source Mode Query
  kind: query
  command: "~XX150 15"
  params: []

- id: standby_power_mode_query
  label: Standby Power Mode Query
  kind: query
  command: "~XX150 16"
  params: []
  # returns: Ok0=Active, Ok1=Eco, Ok2=Eco (per regulatory), Ok3=Communications
  # NOTE: source's Regulatory table maps ~XX150 16 to 0/Active, 1/Eco, 3/Communications.
  # Other Useful Command table also lists Eco=Ok2 under same opcode.
  # Same opcode (~XX150 17) used for DHCP Off = Ok0 (DHCP table) and Standby Off = Ok0.

- id: source_lock_off
  label: Source Lock Off
  kind: action
  command: "~XX100 0"
  params: []

- id: source_lock_on
  label: Source Lock On
  kind: action
  command: "~XX100 1"
  params: []

- id: filter_wheel_index
  label: Filter Wheel Index
  kind: action
  command: "~XX528 {0000-9999}"
  params:
    - name: index
      type: string
      description: "0000..9999"
  # read: ~XX530

- id: filter_wheel_index_query
  label: Filter Wheel Index Query
  kind: query
  command: "~XX530"
  params: []

- id: phosphor_wheel_index
  label: Phosphor Wheel Index
  kind: action
  command: "~XX529 {0000-9999}"
  params:
    - name: index
      type: string
      description: "0000..9999"
  # read: ~XX531

- id: phosphor_wheel_index_query
  label: Phosphor Wheel Index Query
  kind: query
  command: "~XX531"
  params: []

- id: output_3d_state_query
  label: Output 3D State Query
  kind: query
  command: "~XX130"
  params: []
  # returns: Ok0=2D, Ok1=3D

- id: brightness_mode_query
  label: Brightness Mode Query (Regulatory)
  kind: query
  command: "~XX150 20"
  params: []
  # NOTE: regulatory "Brightness Mode" row lists this row without explicit opcode;
  # placeholder retained as UNRESOLVED-equivalent; existing brightness_mode action uses ~XX110.
  # UNRESOLVED: source regulatory row "Brightness Mode" has no read command documented

# Remote Control Simulation commands (~XX140 family)
- id: rc_power
  label: Remote Power
  kind: action
  command: "~XX140 1"
  params: []

- id: rc_power_off
  label: Remote Power Off
  kind: action
  command: "~XX140 2"
  params: []

- id: rc_up
  label: Remote Up
  kind: action
  command: "~XX140 10"
  params: []

- id: rc_left
  label: Remote Left
  kind: action
  command: "~XX140 11"
  params: []

- id: rc_enter
  label: Remote Enter
  kind: action
  command: "~XX140 12"
  params: []

- id: rc_right
  label: Remote Right
  kind: action
  command: "~XX140 13"
  params: []

- id: rc_down
  label: Remote Down
  kind: action
  command: "~XX140 14"
  params: []

- id: rc_vkeystone_plus
  label: Remote V Keystone +
  kind: action
  command: "~XX140 15"
  params: []

- id: rc_vkeystone_minus
  label: Remote V Keystone -
  kind: action
  command: "~XX140 16"
  params: []

- id: rc_brightness
  label: Remote Brightness
  kind: action
  command: "~XX140 19"
  params: []

- id: rc_menu
  label: Remote Menu
  kind: action
  command: "~XX140 20"
  params: []

- id: rc_zoom
  label: Remote Zoom
  kind: action
  command: "~XX140 21"
  params: []

- id: rc_av_mute
  label: Remote AV Mute
  kind: action
  command: "~XX140 24"
  params: []

- id: rc_contrast
  label: Remote Contrast
  kind: action
  command: "~XX140 28"
  params: []

- id: rc_lens_shift
  label: Remote Lens Shift
  kind: action
  command: "~XX140 31"
  params: []

- id: rc_zoom_plus
  label: Remote Zoom +
  kind: action
  command: "~XX140 32"
  params: []

- id: rc_zoom_minus
  label: Remote Zoom -
  kind: action
  command: "~XX140 33"
  params: []

- id: rc_focus_plus
  label: Remote Focus +
  kind: action
  command: "~XX140 34"
  params: []

- id: rc_focus_minus
  label: Remote Focus -
  kind: action
  command: "~XX140 35"
  params: []

- id: rc_mode
  label: Remote Mode
  kind: action
  command: "~XX140 36"
  params: []

- id: rc_info
  label: Remote Info
  kind: action
  command: "~XX140 40"
  params: []

- id: rc_auto
  label: Remote Auto (Re-sync)
  kind: action
  command: "~XX140 41"
  params: []

- id: rc_input
  label: Remote Input
  kind: action
  command: "~XX140 47"
  params: []

- id: rc_digit_1
  label: Remote 1
  kind: action
  command: "~XX140 51"
  params: []

- id: rc_digit_2
  label: Remote 2
  kind: action
  command: "~XX140 52"
  params: []

- id: rc_digit_3
  label: Remote 3
  kind: action
  command: "~XX140 53"
  params: []

- id: rc_digit_4
  label: Remote 4
  kind: action
  command: "~XX140 54"
  params: []

- id: rc_digit_5
  label: Remote 5
  kind: action
  command: "~XX140 55"
  params: []

- id: rc_digit_6
  label: Remote 6
  kind: action
  command: "~XX140 56"
  params: []

- id: rc_digit_7
  label: Remote 7
  kind: action
  command: "~XX140 57"
  params: []

- id: rc_digit_8
  label: Remote 8
  kind: action
  command: "~XX140 58"
  params: []

- id: rc_digit_9
  label: Remote 9
  kind: action
  command: "~XX140 59"
  params: []

- id: rc_digit_0
  label: Remote 0
  kind: action
  command: "~XX140 60"
  params: []

- id: rc_gamma
  label: Remote Gamma
  kind: action
  command: "~XX140 61"
  params: []

- id: rc_pip
  label: Remote PIP
  kind: action
  command: "~XX140 63"
  params: []

- id: rc_lens_h_left
  label: Remote Lens H Left
  kind: action
  command: "~XX140 64"
  params: []

- id: rc_lens_h_right
  label: Remote Lens H Right
  kind: action
  command: "~XX140 65"
  params: []

- id: rc_lens_v_up
  label: Remote Lens V Up
  kind: action
  command: "~XX140 66"
  params: []

- id: rc_lens_v_down
  label: Remote Lens V Down
  kind: action
  command: "~XX140 67"
  params: []

- id: rc_hkeystone_plus
  label: Remote H Keystone +
  kind: action
  command: "~XX140 68"
  params: []

- id: rc_hkeystone_minus
  label: Remote H Keystone -
  kind: action
  command: "~XX140 69"
  params: []

- id: rc_hotkey_f1
  label: Remote Hot Key F1
  kind: action
  command: "~XX140 70"
  params: []

- id: rc_pattern
  label: Remote Pattern
  kind: action
  command: "~XX140 73"
  params: []

- id: rc_exit
  label: Remote Exit
  kind: action
  command: "~XX140 74"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  command: "~XX124"
- id: av_mute_state
  type: enum
  values: [off, on]
  command: "~XX355"
- id: display_mode_state
  type: integer
  command: "~XX123"
- id: aspect_ratio_state
  type: enum
  values: [4_3, 16_9, 16_10, lbx, native, auto]
  command: "~XX127"
- id: projection_mode_state
  type: enum
  values: [front, rear, ceiling_top, rear_top]
  command: "~XX129"
- id: color_temperature_state
  type: enum
  values: [standard, cool, warm]
  command: "~XX128"
- id: standby_power_mode_state
  type: enum
  values: [active, eco, communications]  # source maps ~XX150 16: Ok0=Active, Ok1=Eco, Ok3=Communications
  command: "~XX150 16"
- id: dhcp_state
  type: enum
  values: [off, on]
  command: "~XX150 17"
- id: model_name
  type: enum
  values: [optoma_wuxga, optoma_uhd]
  command: "~XX151"
- id: main_source_state
  type: integer
  command: "~XX121"
- id: sub_source_state
  type: integer
  command: "~XX131"
- id: serial_port_baud_rate_state
  type: enum
  values: [9600, 14400, 19200, 38400, 57600, 115200]
  command: "~XX153"
- id: lens_function_state
  type: enum
  values: [lock, unlock]
  command: "~XX545 4"
- id: warp_blend_memory_state
  type: enum
  values: [off, user1, user2, user3]
  command: "~XX137"
- id: warp_blend_pc_connection_state
  type: enum
  values: [no, yes]
  command: "~XX132 3"
- id: ir_front_state
  type: enum
  values: [off, on]
  command: "~XX542 1"
- id: ir_top_state
  type: enum
  values: [off, on]
  command: "~XX542 2"
- id: system_update_notification_state
  type: enum
  values: [off, on]
  command: "~XX158"
- id: output_3d_state
  type: enum
  values: [2d, 3d]
  command: "~XX130"
- id: filter_wheel_index_state
  type: integer
  command: "~XX530"
- id: phosphor_wheel_index_state
  type: integer
  command: "~XX531"
```

## Variables
```yaml
- id: serial_number
  command: "~XX353"
- id: fw_version
  command: "~XX122"
- id: software_version
  command: "~XX122"
- id: lan_fw_version
  command: "~XX357"
- id: system_temperature
  command: "~XX150 18"
- id: projection_hours
  command: "~XX108"
- id: lan_ip_address
  command: "~XX87 3"
- id: lan_mac_address
  command: "~XX555"
- id: color_depth
  command: "~XX156"
- id: color_format
  command: "~XX157"
- id: main_resolution
  command: "~XX150 4"
- id: main_signal_format
  command: "~XX150 5"
- id: main_pixel_clock
  command: "~XX150 6"
- id: main_horz_refresh
  command: "~XX150 7"
- id: main_vert_refresh
  command: "~XX150 8"
- id: sub_resolution
  command: "~XX150 10"
- id: sub_signal_format
  command: "~XX150 11"
- id: sub_pixel_clock
  command: "~XX150 12"
- id: sub_horz_refresh
  command: "~XX150 13"
- id: sub_vert_refresh
  command: "~XX545 14"
- id: light_source_mode
  command: "~XX150 15"
- id: filter_wheel_index
  command: "~XX530"
- id: phosphor_wheel_index
  command: "~XX531"
- id: fan_1_speed
  command: "~XX351 1"
- id: fan_2_speed
  command: "~XX351 2"
- id: fan_3_speed
  command: "~XX351 3"
- id: fan_4_speed
  command: "~XX351 4"
- id: projector_id
  command: "~XX558"
- id: remote_code
  command: "~XX350"
- id: wlan_ssid
  command: "~XX451 3"
- id: wlan_ip_address
  command: "~XX451 2"
- id: wlan_start_ip
  command: "~XX451 5"
- id: wlan_end_ip
  command: "~XX451 6"
- id: native_resolution
  command: "~XX150 2"
- id: info_string
  command: "~XX150 1"
- id: brightness_value
  command: "~XX125"
- id: contrast_value
  command: "~XX126"
- id: threed_frame_delay
  command: "~XX233"
- id: main_source_info
  command: "~XX150 3"
- id: sub_source_info
  command: "~XX150 9"
- id: main_resolution_info
  command: "~XX150 4"
- id: sub_resolution_info
  command: "~XX150 10"
- id: system_temperature_direct
  command: "~XX352"
```

## Events
```yaml
# Source documents "System Auto Response Format": INFO{n}
# Device sends unsolicited INFO strings for state changes and errors.
- id: standby_mode_state
  source: "INFO"
  values:
    - "0": "Standby Mode"
    - "1": "Warming up"
    - "2": "Cooling Down"
    - "3": "Out of Range"
    - "4": "Lamp Fail (LED Fail)"
    - "5": "Thermal Switch Error"
    - "6": "Fan Lock"
    - "7": "Over Temperature"
    - "8": "Lamp Hours Running Out"
    - "9": "Cover Open"
    - "10": "Lamp Ignite Fail"
    - "11": "Format Board Power On Fail"
    - "12": "Color Wheel Unexpected Stop"
    - "13": "Over Temperature"
    - "14": "FAN 1 Lock"
    - "15": "FAN 2 Lock"
    - "16": "FAN 3 Lock"
    - "17": "FAN 4 Lock"
    - "18": "FAN 5 Lock"
    - "19": "LAN fail then restart"
    - "20": "LD lower than 60%"
    - "21": "LD NTC (1) Over Temperature"
    - "22": "LD NTC (2) Over Temperature"
    - "23": "High Ambient Temperature"
    - "24": "System Ready"
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences
```

## Safety
```yaml
confirmation_required_for:
  - reset_to_default  # ~XX112 1: source lists Cancel/Yes
  - reset_osd         # ~XX546 1: source lists Cancel/Yes
  - system_update     # ~XX168 9: source lists Cancel/Yes
  - color_match_reset # ~XX215 1: source lists Cancel/Yes
  - rgb_gain_bias_reset # ~XX517 1: source lists Cancel/Yes
  - lens_memory_reset  # ~XX361 1: Yes/No
  - lens_calibration   # ~XX525: Yes/NO
interlocks: []
# UNRESOLVED: source has no explicit interlock procedures. NOTE 1 only describes freeze-screen release.
```

## Notes
Source: Optoma RS232 Protocol Function List (refined excerpt) for GT4000UHD. Filename suffix "_ip" is misleading; refined source contains no IP/HTTP wire protocol details.

Protocol framing:
- Frame = `~` (0x7E) + 2-digit projector ID + 3-digit command + space + variable + CR (0x0D).
- ID `00` = broadcast (all projectors).
- Write response: `P` (pass) or `F` (fail).
- Read response: `O k` + variable, or `F`.
- Unsolicited auto-responses use `INFO{n}`.

Baud rate: source default 19200, range 9600-115200. Projector supports querying active rate via ~XX153.

Serial port path: RS232 vs HDBaseT selectable via ~XX557.

IP control: source enables Telnet (~XX458) and HTTP (~XX459) toggles but does not specify IP port numbers, HTTP base URL, or auth credentials — all marked UNRESOLVED. Protocols `tcp` and `http` listed in Transport by inference only.

Security: ~XX78 accepts 4-digit passcode; ~XX77 accepts MMDDHH timestamp (RS232 only).

Source-reuse of opcode ~XX150 16: same query maps to Standby Power Mode in Power Settings table AND in Regulatory table with different Ok-code → meaning cross-reference (Regulatory: Ok0=Active, Ok1=Eco, Ok3=Communications; Other Useful Command table also lists Eco=Ok2 under same opcode — source internal inconsistency preserved as-is).

Source-reuse of opcode ~XX150 17: DHCP On/Off in LAN table AND Standby Power "Off" in Regulatory table.

EDID/HDMI settings (HDMI 1/2/HDBaseT EDID 1.4 vs 2.0, EDID Reminder) listed in OSD but no RS232 write/read commands documented in source — omitted from Actions.

Remote Control Simulation commands (~XX140 family) enumerated separately as discrete actions.

Output 3D state via ~XX130 (Ok0=2D, Ok1=3D) — added as Feedback + dedicated query action `output_3d_state_query`.

Filter Wheel Index (~XX528 write / ~XX530 read) and Phosphor Wheel Index (~XX529 write / ~XX531 read) present in source as discrete rows under "Other Useful Command".

Light Sensor row in source has three distinct sub-rows: Default (~XX552 0), Manual (~XX552 2), Calibration (~XX552 2). Source uses same opcode for Manual and Calibration rows — preserved as separate actions per source-row granularity.

<!-- UNRESOLVED: TCP port for Telnet not stated in source -->
<!-- UNRESOLVED: HTTP base URL/path not stated in source -->
<!-- UNRESOLVED: authentication credentials not described in source -->
<!-- UNRESOLVED: voltage/current/power specs not stated in source -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: EDID settings present in OSD menu but no RS232 commands documented -->
<!-- UNRESOLVED: Network Reset, WLAN Subnet Mask, LAN Subnet Mask/Gateway/DNS apply commands not documented -->
<!-- UNRESOLVED: Brightness Mode Regulatory row has no explicit read opcode in source -->
<!-- UNRESOLVED: Power Level Regulatory row has no explicit read opcode in source -->
<!-- UNRESOLVED: F-MCU/S-MCU/F-Image/Formatter versions listed in source but no read opcodes documented -->

## Provenance

```yaml
source_domains:
  - region-resource.optoma.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
retrieved_at: 2026-09-15T03:27:32.169Z
last_checked_at: 2026-09-17T22:19:55.430Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-17T22:19:55.430Z
matched_actions: 313
action_count: 313
confidence: medium
summary: "All 313 spec action units have literal ~XX opcode matches in the source; transport values verbatim; source catalogue essentially fully represented. (17 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port for Telnet/HTTP not stated in source"
- "authentication procedure not described"
- "TCP port for Telnet not stated in source"
- "TCP port not stated in source"
- "HTTP base URL not stated in source"
- "source regulatory row \"Brightness Mode\" has no read command documented"
- "source does not document multi-step sequences"
- "source has no explicit interlock procedures. NOTE 1 only describes freeze-screen release."
- "HTTP base URL/path not stated in source"
- "authentication credentials not described in source"
- "voltage/current/power specs not stated in source"
- "firmware version compatibility range not stated in source"
- "EDID settings present in OSD menu but no RS232 commands documented"
- "Network Reset, WLAN Subnet Mask, LAN Subnet Mask/Gateway/DNS apply commands not documented"
- "Brightness Mode Regulatory row has no explicit read opcode in source"
- "Power Level Regulatory row has no explicit read opcode in source"
- "F-MCU/S-MCU/F-Image/Formatter versions listed in source but no read opcodes documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
