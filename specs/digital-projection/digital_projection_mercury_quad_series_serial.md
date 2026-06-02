---
spec_id: admin/digital_projection-mercury-quad-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Digital Projection Mercury Quad Series Control Spec"
manufacturer: "Digital Projection"
model_family: "Mercury Quad Series"
aliases: []
compatible_with:
  manufacturers:
    - "Digital Projection"
  models:
    - "Mercury Quad Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - digitalprojection.co.uk
source_urls:
  - https://digitalprojection.co.uk/dpdownloads/Protocol/Simplified-Protocol-Guide-Rev-H.pdf
retrieved_at: 2026-04-30T04:24:54.659Z
last_checked_at: 2026-05-14T18:17:15.596Z
generated_at: 2026-05-14T18:17:15.596Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power-on sequencing requirements not stated"
  - "populate from source, or remove section if not applicable"
  - "source does not describe unsolicited event notifications"
  - "source does not describe multi-step macros"
  - "power-on sequencing requirements not stated in source"
  - "firmware version compatibility not stated"
  - "port numbers for serial (only baud rate stated)"
  - "default IP address (192.168.0.100) noted for network setup but not confirmed as static"
  - "fault behavior and error recovery sequences"
  - "binary command byte encodings (source uses ASCII text format only)"
  - "protocol version numbers not stated"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:15.596Z
  matched_actions: 176
  action_count: 204
  confidence: medium
  summary: "All 176 spec actions matched source commands with correct parameter ranges and transport values verified. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Digital Projection Mercury Quad Series Control Spec

## Summary
Projector controlled via RS-232C serial or LAN TCP/IP. Commands are ASCII text strings with `*command operator value` format terminated by CR. Successful commands return `ACK` or `ack`; failures return `NAK` or `nack`. Only one control path (serial or network) should be active at a time.

<!-- UNRESOLVED: power-on sequencing requirements not stated -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7000  # TCP port for LAN control; default per source
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # power on/off commands present
- routable        # input selection commands present
- queryable       # query commands (? operator) present
- levelable       # brightness, contrast, hue, saturation, sharpness control present
```

## Actions
```yaml
- id: input
  label: Input
  kind: set
  params:
    - name: value
      type: integer
      description: 0=HDMI 1, 1=HDMI 2, 2=DisplayPort, 3=HDBaseT, 4=3G-SDI

- id: test_pattern
  label: Test Pattern
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Off, 1=White, 2=Black, 3=Red, 4=Green, 5=Blue, 6=Checkerboard, 7=Crosshatch, 8=V Burst, 9=H Burst, 10=Color Bar, 11=Plunge

- id: zoom_in
  label: Zoom In
  kind: action
  params: []

- id: zoom_out
  label: Zoom Out
  kind: action
  params: []

- id: focus_near
  label: Focus Near
  kind: action
  params: []

- id: focus_far
  label: Focus Far
  kind: action
  params: []

- id: lens_up
  label: Lens Up
  kind: action
  params: []

- id: lens_down
  label: Lens Down
  kind: action
  params: []

- id: lens_left
  label: Lens Left
  kind: action
  params: []

- id: lens_right
  label: Lens Right
  kind: action
  params: []

- id: lens_center
  label: Lens Center
  kind: action
  params: []

- id: lens_load
  label: Lens Load
  kind: set
  params:
    - name: value
      type: integer
      description: 1 to 10 (integer)

- id: lens_save
  label: Lens Save
  kind: set
  params:
    - name: value
      type: integer
      description: 1 to 10 (integer)

- id: lens_clear
  label: Lens Clear
  kind: set
  params:
    - name: value
      type: integer
      description: 1 to 10 (integer)

- id: lens_lock
  label: Lens Lock
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Off, 1=On

- id: gamma
  label: Gamma
  kind: set
  params:
    - name: value
      type: integer
      description: 0=1.0, 1=1.8, 2=2.0, 3=2.2, 4=2.35, 5=2.5

- id: brightness
  label: Brightness
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: contrast
  label: Contrast
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: saturation
  label: Saturation
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hue
  label: Hue
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: sharpness
  label: Sharpness
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 15 (integer)

- id: nr_temporal
  label: Noise Reduction Temporal
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 3 (integer)

- id: nr_block
  label: Noise Reduction Block
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 3 (integer)

- id: nr_mosquito
  label: Noise Reduction Mosquito
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 3 (integer)

- id: nr_hori
  label: Noise Reduction Horizontal
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 3 (integer)

- id: nr_vert
  label: Noise Reduction Vertical
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 3 (integer)

- id: nr_reset
  label: Noise Reduction Reset
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 3 (integer)

- id: sync_level
  label: Sync Level
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: freeze
  label: Freeze
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Off, 1=On

- id: resync
  label: Resync
  kind: action
  params: []

- id: color_space
  label: Color Space
  kind: set
  params:
    - name: value
      type: integer

- id: color_temp
  label: Color Temperature
  kind: set
  params:
    - name: value
      type: integer
      description: 0=3200K, 1=5400K, 2=6500K, 3=7500K, 4=9300K, 5=Native

- id: color_mode
  label: Color Mode
  kind: set
  params:
    - name: value
      type: integer
      description: 0=ColorMax, 1=Manual Color Matching, 2=Color Temperature, 3=Gains and Lifts

- id: color_max
  label: ColorMax
  kind: set
  params:
    - name: value
      type: integer
      description: 0=REC709, 1=EBU, 2=SMPTE, 3=Native, 4=User 1, 5=User 2

- id: gainlift_reset
  label: Gain/Lift Reset
  kind: action
  params: []

- id: auto_test_ptrn
  label: Auto Test Pattern
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Off, 1=On

- id: user_std_rx
  label: User Standard Red X
  kind: set
  params:
    - name: value
      type: integer
      description: 550 to 750 (integer)

- id: user_std_ry
  label: User Standard Red Y
  kind: set
  params:
    - name: value
      type: integer
      description: 250 to 450 (integer)

- id: user_std_gx
  label: User Standard Green X
  kind: set
  params:
    - name: value
      type: integer
      description: 200 to 400 (integer)

- id: user_std_gy
  label: User Standard Green Y
  kind: set
  params:
    - name: value
      type: integer
      description: 400 to 750 (integer)

- id: user_std_bx
  label: User Standard Blue X
  kind: set
  params:
    - name: value
      type: integer
      description: 50 to 250 (integer)

- id: user_std_by
  label: User Standard Blue Y
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 120 (integer)

- id: user_std_wx
  label: User Standard White X
  kind: set
  params:
    - name: value
      type: integer
      description: 200 to 400 (integer)

- id: user_std_wy
  label: User Standard White Y
  kind: set
  params:
    - name: value
      type: integer
      description: 250 to 450 (integer)

- id: user_std_reset
  label: User Standard Reset
  kind: action
  params: []

- id: user_target_rx
  label: User Target Red X
  kind: set
  params:
    - name: value
      type: integer
      description: 550 to 750 (integer)

- id: user_target_ry
  label: User Target Red Y
  kind: set
  params:
    - name: value
      type: integer
      description: 250 to 450 (integer)

- id: user_target_gx
  label: User Target Green X
  kind: set
  params:
    - name: value
      type: integer
      description: 200 to 400 (integer)

- id: user_target_gy
  label: User Target Green Y
  kind: set
  params:
    - name: value
      type: integer
      description: 400 to 750 (integer)

- id: user_target_bx
  label: User Target Blue X
  kind: set
  params:
    - name: value
      type: integer
      description: 50 to 250 (integer)

- id: user_target_by
  label: User Target Blue Y
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 120 (integer)

- id: user_target_wx
  label: User Target White X
  kind: set
  params:
    - name: value
      type: integer
      description: 200 to 400 (integer)

- id: user_target_wy
  label: User Target White Y
  kind: set
  params:
    - name: value
      type: integer
      description: 250 to 450 (integer)

- id: user_target_cx
  label: User Target Cyan X
  kind: set
  params:
    - name: value
      type: integer
      description: 125 to 325 (integer)

- id: user_target_cy
  label: User Target Cyan Y
  kind: set
  params:
    - name: value
      type: integer
      description: 225 to 425 (integer)

- id: user_target_mx
  label: User Target Magenta X
  kind: set
  params:
    - name: value
      type: integer
      description: 200 to 400 (integer)

- id: user_target_my
  label: User Target Magenta Y
  kind: set
  params:
    - name: value
      type: integer
      description: 50 to 250 (integer)

- id: user_target_yx
  label: User Target Yellow X
  kind: set
  params:
    - name: value
      type: integer
      description: 300 to 500 (integer)

- id: user_target_yy
  label: User Target Yellow Y
  kind: set
  params:
    - name: value
      type: integer
      description: 400 to 600 (integer)

- id: user_target_reset
  label: User Target Reset
  kind: action
  params: []

- id: user2_target_rx
  label: User2 Target Red X
  kind: set
  params:
    - name: value
      type: integer
      description: 550 to 750 (integer)

- id: user2_target_ry
  label: User2 Target Red Y
  kind: set
  params:
    - name: value
      type: integer
      description: 250 to 450 (integer)

- id: user2_target_gx
  label: User2 Target Green X
  kind: set
  params:
    - name: value
      type: integer
      description: 200 to 400 (integer)

- id: user2_target_gy
  label: User2 Target Green Y
  kind: set
  params:
    - name: value
      type: integer
      description: 400 to 750 (integer)

- id: user2_target_bx
  label: User2 Target Blue X
  kind: set
  params:
    - name: value
      type: integer
      description: 50 to 250 (integer)

- id: user2_target_by
  label: User2 Target Blue Y
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 120 (integer)

- id: user2_target_wx
  label: User2 Target White X
  kind: set
  params:
    - name: value
      type: integer
      description: 200 to 400 (integer)

- id: user2_target_wy
  label: User2 Target White Y
  kind: set
  params:
    - name: value
      type: integer
      description: 250 to 450 (integer)

- id: user2_target_cx
  label: User2 Target Cyan X
  kind: set
  params:
    - name: value
      type: integer
      description: 125 to 325 (integer)

- id: user2_target_cy
  label: User2 Target Cyan Y
  kind: set
  params:
    - name: value
      type: integer
      description: 225 to 425 (integer)

- id: user2_target_mx
  label: User2 Target Magenta X
  kind: set
  params:
    - name: value
      type: integer
      description: 200 to 400 (integer)

- id: user2_target_my
  label: User2 Target Magenta Y
  kind: set
  params:
    - name: value
      type: integer
      description: 50 to 250 (integer)

- id: user2_target_yx
  label: User2 Target Yellow X
  kind: set
  params:
    - name: value
      type: integer
      description: 300 to 500 (integer)

- id: user2_target_yy
  label: User2 Target Yellow Y
  kind: set
  params:
    - name: value
      type: integer
      description: 400 to 600 (integer)

- id: user2_target_reset
  label: User2 Target Reset
  kind: action
  params: []

- id: hsg_hue_r
  label: HSG Hue Red
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_hue_g
  label: HSG Hue Green
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_hue_b
  label: HSG Hue Blue
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_hue_c
  label: HSG Hue Cyan
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_hue_m
  label: HSG Hue Magenta
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_hue_y
  label: HSG Hue Yellow
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_sat_r
  label: HSG Saturation Red
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_sat_g
  label: HSG Saturation Green
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_sat_b
  label: HSG Saturation Blue
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_sat_c
  label: HSG Saturation Cyan
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_sat_m
  label: HSG Saturation Magenta
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_sat_y
  label: HSG Saturation Yellow
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_gain_r
  label: HSG Gain Red
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_gain_g
  label: HSG Gain Green
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_gain_b
  label: HSG Gain Blue
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_gain_c
  label: HSG Gain Cyan
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_gain_m
  label: HSG Gain Magenta
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_gain_y
  label: HSG Gain Yellow
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_white_r
  label: HSG White Red
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_white_g
  label: HSG White Green
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_white_b
  label: HSG White Blue
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_reset
  label: HSG Reset
  kind: action
  params: []

- id: aspect_ratio
  label: Aspect Ratio
  kind: set
  params:
    - name: value
      type: integer

- id: digi_zoom
  label: Digital Zoom
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 100 (integer)

- id: digi_pan
  label: Digital Pan
  kind: set
  params:
    - name: value
      type: integer
      description: -320 to +320 (integer)

- id: digi_pan_bound
  label: Digital Pan Bound
  kind: set
  params:
    - name: value
      type: integer
      description: -320 to +320 (integer)

- id: digi_scan
  label: Digital Scan
  kind: set
  params:
    - name: value
      type: integer
      description: -200 to +200 (integer)

- id: digi_scan_bound
  label: Digital Scan Bound
  kind: set
  params:
    - name: value
      type: integer
      description: -200 to +200 (integer)

- id: digi_zoom_rst
  label: Digital Zoom Reset
  kind: action
  params: []

- id: overscan
  label: Overscan
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Off, 1=Crop, 2=Zoom

- id: h_keystone
  label: Horizontal Keystone
  kind: set
  params:
    - name: value
      type: integer
      description: -600 to +600 (integer)

- id: v_keystone
  label: Vertical Keystone
  kind: set
  params:
    - name: value
      type: integer
      description: -400 to +400 (integer)

- id: rotation
  label: Rotation
  kind: set
  params:
    - name: value
      type: integer
      description: -100 to +100 (integer)

- id: h_pin_barrel
  label: Horizontal Pin Barrel
  kind: set
  params:
    - name: value
      type: integer
      description: -150 to +300 (integer)

- id: v_pin_barrel
  label: Vertical Pin Barrel
  kind: set
  params:
    - name: value
      type: integer
      description: -150 to +300 (integer)

- id: 4corner_ulx
  label: Four Corner Upper Left X
  kind: set
  params:
    - name: value
      type: integer
      description: -192 to +192 (integer)

- id: 4corner_uly
  label: Four Corner Upper Left Y
  kind: set
  params:
    - name: value
      type: integer
      description: -120 to +120 (integer)

- id: 4corner_urx
  label: Four Corner Upper Right X
  kind: set
  params:
    - name: value
      type: integer
      description: -192 to +192 (integer)

- id: 4corner_ury
  label: Four Corner Upper Right Y
  kind: set
  params:
    - name: value
      type: integer
      description: -120 to +120 (integer)

- id: 4corner_llx
  label: Four Corner Lower Left X
  kind: set
  params:
    - name: value
      type: integer
      description: -192 to +192 (integer)

- id: 4corner_lly
  label: Four Corner Lower Left Y
  kind: set
  params:
    - name: value
      type: integer
      description: -120 to +120 (integer)

- id: 4corner_lrx
  label: Four Corner Lower Right X
  kind: set
  params:
    - name: value
      type: integer
      description: -192 to +192 (integer)

- id: 4corner_lry
  label: Four Corner Lower Right Y
  kind: set
  params:
    - name: value
      type: integer
      description: -120 to +120 (integer)

- id: arc_top
  label: Arc Top
  kind: set
  params:
    - name: value
      type: integer
      description: -150 to +150 (integer)

- id: arc_bottom
  label: Arc Bottom
  kind: set
  params:
    - name: value
      type: integer
      description: -150 to +150 (integer)

- id: arc_left
  label: Arc Left
  kind: set
  params:
    - name: value
      type: integer
      description: -150 to +150 (integer)

- id: arc_right
  label: Arc Right
  kind: set
  params:
    - name: value
      type: integer
      description: -150 to +150 (integer)

- id: blanking_top
  label: Blanking Top
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 360 (integer)

- id: blanking_bottom
  label: Blanking Bottom
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 360 (integer)

- id: blanking_left
  label: Blanking Left
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 534 (integer)

- id: blanking_right
  label: Blanking Right
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 534 (integer)

- id: blanking_reset
  label: Blanking Reset
  kind: action
  params: []

- id: warp_reset
  label: Warp Reset
  kind: action
  params: []

- id: active_warp
  label: Active Warp
  kind: set
  params:
    - name: value
      type: integer
      description: 0=none, 1=Keystone, 2=Four Corner, 3=Rotation, 4=Pin/Barrel, 5=Arc

- id: cust_wp_write
  label: Custom Warp Write
  kind: set
  params:
    - name: value
      type: integer
      description: 1=User 1 file, 2=User 2 file

- id: cust_wp_clear
  label: Custom Warp Clear
  kind: set
  params:
    - name: value
      type: integer
      description: 1=User 1 file, 2=User 2 file

- id: cust_wp_send
  label: Custom Warp Send
  kind: set
  params:
    - name: value
      type: integer
      description: 0=off, 1=User 1, 2=User 2

- id: warp_cust
  label: Warp Custom
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Off, 1=User 1, 2=User 2

- id: eb_stat
  label: Edge Blend Status
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Off, 1=On

- id: eb_adl
  label: Edge Blend ADL
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Off, 1=On

- id: eb_top
  label: Edge Blend Top
  kind: set
  params:
    - name: value
      type: integer
      description: 0, 100 to 500

- id: eb_bottom
  label: Edge Blend Bottom
  kind: set
  params:
    - name: value
      type: integer
      description: 0, 100 to 500

- id: eb_left
  label: Edge Blend Left
  kind: set
  params:
    - name: value
      type: integer
      description: 0, 100 to 800

- id: eb_right
  label: Edge Blend Right
  kind: set
  params:
    - name: value
      type: integer
      description: 0, 100 to 800

- id: eb_blu_top
  label: Edge Blend Black Level Top
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 32 (integer)

- id: eb_blu_btm
  label: Edge Blend Black Level Bottom
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 32 (integer)

- id: eb_blu_left
  label: Edge Blend Black Level Left
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 32 (integer)

- id: eb_blu_right
  label: Edge Blend Black Level Right
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 32 (integer)

- id: eb_all
  label: Edge Blend All
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 255 (integer)

- id: eb_red
  label: Edge Blend Red
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 255 (integer)

- id: eb_green
  label: Edge Blend Green
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 255 (integer)

- id: eb_blue
  label: Edge Blend Blue
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 255 (integer)

- id: eb_reset
  label: Edge Blend Reset
  kind: action
  params: []

- id: 3d_format
  label: 3D Format
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Off, 1=Auto, 2=Side-By-Side (Half), 3=Top-And-Bottom, 4=Dual-Pipe, 5=Frame Sequential

- id: 3d_dominance
  label: 3D Dominance
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Normal, 1=Reverse

- id: 3d_darktime
  label: 3D Dark Time
  kind: set
  params:
    - name: value
      type: integer
      description: 0=0.65ms, 1=1.3ms, 2=1.95ms, 3=2.5ms

- id: 3d_syncoffset
  label: 3D Sync Offset
  kind: set
  params:
    - name: value
      type: integer
      description: 0 to 60 (integer)

- id: lamp_mode
  label: Lamp Mode
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Eco mode, 1=Normal mode, 2=dimming mode

- id: lamps
  label: Lamps
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Dual Lamps, 1=Triple Lamps, 2=Quad Lamps

- id: lamp_pow
  label: Lamp Power
  kind: set
  params:
    - name: value
      type: integer
      description: 77-100 (77%-100%)

- id: altitude
  label: Altitude
  kind: set
  params:
    - name: value
      type: integer
      description: 1=On, 2=Auto

- id: orientation
  label: Orientation
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Desktop Front, 1=Ceiling Front, 2=Desktop Rear, 3=Ceiling Rear, 4=Vertical Up, 5=Vertical Down

- id: screen_setting
  label: Screen Setting
  kind: set
  params:
    - name: value
      type: integer
      description: 0=16:10, 1=16:9, 2=4:3

- id: auto_poweroff
  label: Auto Power Off
  kind: set
  params:
    - name: value
      type: integer

- id: auto_poweron
  label: Auto Power On
  kind: set
  params:
    - name: value
      type: integer

- id: schedule_power
  label: Schedule Power
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Off, 1=On

- id: schedule1_on_day
  label: Schedule 1 On Day
  kind: set
  params:
    - name: value
      type: integer
      description: Bit field (Bit 6=Sat, Bit 5=Fri, Bit 4=Thu, Bit 3=Wed, Bit 2=Tue, Bit 1=Mon, Bit 0=Sun)

- id: schedule1_off_day
  label: Schedule 1 Off Day
  kind: set
  params:
    - name: value
      type: integer
      description: Bit field

- id: schedule1_on_time
  label: Schedule 1 On Time
  kind: set
  params:
    - name: value
      type: string
      description: HH:MM

- id: schedule1_off_time
  label: Schedule 1 Off Time
  kind: set
  params:
    - name: value
      type: string
      description: HH:MM

- id: schedule2_on_day
  label: Schedule 2 On Day
  kind: set
  params:
    - name: value
      type: integer
      description: Bit field

- id: schedule2_off_day
  label: Schedule 2 Off Day
  kind: set
  params:
    - name: value
      type: integer
      description: Bit field

- id: schedule2_on_time
  label: Schedule 2 On Time
  kind: set
  params:
    - name: value
      type: string
      description: HH:MM

- id: schedule2_off_time
  label: Schedule 2 Off Time
  kind: set
  params:
    - name: value
      type: string
      description: HH:MM

- id: date
  label: Date
  kind: set
  params:
    - name: value
      type: string
      description: yyyy/MM/dd

- id: time_zone
  label: Time Zone
  kind: set
  params:
    - name: value
      type: integer
      description: -11 to +12 (integer)

- id: time_adjust
  label: Time Adjust
  kind: set
  params:
    - name: value
      type: string
      description: HH:MM

- id: blank_screen
  label: Blank Screen
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Logo, 1=Black, 2=Blue, 3=White

- id: trig_1
  label: Trigger 1
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Off, 1=Screen, 2=5:4, 3=4:3, 4=16:10, 5=16:9, 6=1.88, 7=2.35, 8=Theaterscope, 9=Source, 10=Unscalled, 11=RS232, 12=RS232 on, 13=RS232 off

- id: trig_2
  label: Trigger 2
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Off, 1=Screen, 2=5:4, 3=4:3, 4=16:10, 5=16:9, 6=1.88, 7=2.35, 8=Theaterscope, 9=Source, 10=Unscalled, 11=RS232, 12=RS232 on, 13=RS232 off

- id: auto_source
  label: Auto Source
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Off, 1=On

- id: ir_enable
  label: IR Enable
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Off (Disable), 1=On (Enable)

- id: ir_code
  label: IR Code
  kind: set
  params:
    - name: value
      type: integer
      description: 00 to 99

- id: ir_code_rst
  label: IR Code Reset
  kind: action
  params: []

- id: osd_menupos
  label: OSD Menu Position
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Top Left, 1=Top Right, 2=Bottom Left, 3=Bottom Right, 4=Center

- id: osd_trans
  label: OSD Transparency
  kind: set
  params:
    - name: value
      type: integer
      description: 0=0%, 1=25%, 2=50%, 3=75%

- id: recall_mem
  label: Recall Memory
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Preset A, 1=Preset B, 2=Preset C, 3=Preset D, 4=Default

- id: save_mem
  label: Save Memory
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Preset A, 1=Preset B, 2=Preset C, 3=Preset D

- id: network_mode
  label: Network Mode
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Projector Control, 1=Service

- id: lan_power
  label: LAN Power
  kind: set
  params:
    - name: value
      type: integer
      description: 0=On, 1=Off

- id: lan_dhcp
  label: LAN DHCP
  kind: set
  params:
    - name: value
      type: integer
      description: 0=On, 1=Off

- id: lan_ip
  label: LAN IP Address
  kind: set
  params:
    - name: value
      type: string
      description: IP address xxx.xxx.xxx.xxx

- id: lan_subnet
  label: LAN Subnet
  kind: set
  params:
    - name: value
      type: string
      description: Subnet address xxx.xxx.xxx.xxx

- id: lan_gateway
  label: LAN Gateway
  kind: set
  params:
    - name: value
      type: string
      description: Gateway address xxx.xxx.xxx.xxx

- id: lan_dns
  label: LAN DNS
  kind: set
  params:
    - name: value
      type: string
      description: DNS address xxx.xxx.xxx.xxx

- id: lan_amx
  label: LAN AMX
  kind: set
  params:
    - name: value
      type: integer
      description: 0=On, 1=Off

- id: pip_mode
  label: PIP Mode
  kind: set
  params:
    - name: value
      type: integer
      description: 0=On, 1=Off

- id: pip_input
  label: PIP Input
  kind: set
  params:
    - name: value
      type: integer
      description: 0=HDMI 1, 1=HDMI 2, 2=RGB (VGA), 3=COMP, 4=DisplayPort, 5=HDBaseT, 6=3G-SDI

- id: pip_position
  label: PIP Position
  kind: set
  params:
    - name: value
      type: integer
      description: 0=TopLeft, 1=TopRight, 2=BottomLeft, 3=BottomRight, 4=PBP

- id: power
  label: Power
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Off, 1=On

- id: shutter
  label: Shutter
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Open, 1=Close

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []
- id: brt_lock_pw
  label: Brightness Lock Password
  kind: set
  params:
    - name: value
      type: string
      description: XXXX (4 digits, user or supervisor mode password)

- id: brt_lock_pw_set
  label: Brightness Lock Password Set
  kind: set
  params:
    - name: value
      type: string
      description: XXXX (4 digits, new user mode password)

- id: brt_lock_level
  label: Brightness Lock Level
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Dual Lamps, 1=Triple Lamps, 2=Quad Lamps

- id: brt_lock_rst
  label: Brightness Lock Reset
  kind: action
  params: []

- id: lan_mac
  label: LAN MAC Address
  kind: query
  params:
    - name: value
      type: string
      description: MAC address string

- id: 3d_syncref
  label: 3D Sync Reference
  kind: set
  params:
    - name: value
      type: integer
      description: 0=Internal, 1=External

- id: cust_wp_ck_sum
  label: Custom Warp Checksum
  kind: query
  params:
    - name: value
      type: integer
      description: Returns unsigned 32-bit checksum by summing all bytes in current sent warp file when cust.wp.send is not zero
```

## Feedbacks
```yaml
- id: ack_response
  label: ACK Response
  description: Command acknowledged successfully. Format: "ACK command" or "ack command"

- id: nak_response
  label: NAK Response
  description: Command failed due to syntax error or other problem. Format: "NAK description" or "nack description"

- id: power_state
  label: Power State
  kind: query
  type: enum
  values: [standby, warm_up, imaging, cooling, error]

- id: status
  label: Status
  kind: query
  type: string

- id: model_name
  label: Model Name
  kind: query
  type: string

- id: serial
  label: Serial Number
  kind: query
  type: string

- id: sw_version
  label: Software Version
  kind: query
  type: string

- id: act_source
  label: Active Source
  kind: query
  type: string

- id: signal
  label: Signal
  kind: query
  type: string

- id: lamp1_hours
  label: Lamp 1 Hours
  kind: query
  type: integer

- id: lamp2_hours
  label: Lamp 2 Hours
  kind: query
  type: integer

- id: lamp3_hours
  label: Lamp 3 Hours
  kind: query
  type: integer

- id: lamp4_hours
  label: Lamp 4 Hours
  kind: query
  type: integer

- id: total_hours
  label: Total Hours
  kind: query
  type: integer

- id: errcode
  label: Error Code
  kind: query
  type: string

- id: atmos_alti
  label: Atmosphere Altitude
  kind: query
  type: number

- id: atmos_pressure
  label: Atmosphere Pressure
  kind: query
  type: number

- id: ac_voltage
  label: AC Voltage
  kind: query
  type: integer
  description: 0=90-150V, 1=160-264V

- id: fans
  label: Fans Status
  kind: query
  type: string
  description: All fan and environment status

- id: ti
  label: TI
  kind: query
  type: number

- id: tc
  label: TC
  kind: query
  type: number
```

## Variables
```yaml
# Variables are settable parameters that are not discrete actions.
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Events
```yaml
# Unsolicited notifications the device sends.
# UNRESOLVED: source does not describe unsolicited event notifications
```

## Macros
```yaml
# Multi-step sequences described explicitly in source.
# UNRESOLVED: source does not describe multi-step macros
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Only one control path (serial or network) should be active at a time. Sending commands to both simultaneously may cause unpredictable behavior.
  - Lens commands only work when projector is switched on. Lens must be unlocked (lens.lock != 1) for most lens commands to function. Exceptions: lens.type always works; lens.save and lens.clear always work for Mercury Quad.
  - pic.mode, gamma, brightness, contrast, saturation, hue only apply to current image source.
  - saturation and hue only accepted when input is YUV.
# UNRESOLVED: power-on sequencing requirements not stated in source
```

## Notes
- Commands must be sent as ASCII text strings starting with `*` and ending with CR (ASCII 13).
- Spaces required before operator and value: `*orientation = 3` not `*orientation=3`.
- Wait for complete response before sending next command.
- Execute commands (no operator): `*zoom.in`
- Set commands: `*command = value`
- Get commands: `*command ?`
- Default command (no operator): `*orientation` sets to 0 (Desktop Front).
- `cust.wp.ck.sum` returns unsigned 32-bit checksum by summing all bytes when cust.wp.send is not zero.
- `lens.save` with get operator returns string of 0s and 1s (0=empty slot, 1=occupied).
- user.target and user2.target values are multiples of 1000 (mapped from menu settings).
- Brightness lock password (brt.lock.pw) is 4 digits for user or supervisor mode.
- Brightness lock level: 0=Dual Lamps, 1=Triple Lamps, 2=Quad Lamps.
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: port numbers for serial (only baud rate stated) -->
<!-- UNRESOLVED: default IP address (192.168.0.100) noted for network setup but not confirmed as static -->
<!-- UNRESOLVED: fault behavior and error recovery sequences -->
<!-- UNRESOLVED: binary command byte encodings (source uses ASCII text format only) -->
<!-- UNRESOLVED: protocol version numbers not stated -->

## Provenance

```yaml
source_domains:
  - digitalprojection.co.uk
source_urls:
  - https://digitalprojection.co.uk/dpdownloads/Protocol/Simplified-Protocol-Guide-Rev-H.pdf
retrieved_at: 2026-04-30T04:24:54.659Z
last_checked_at: 2026-05-14T18:17:15.596Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:15.596Z
matched_actions: 176
action_count: 204
confidence: medium
summary: "All 176 spec actions matched source commands with correct parameter ranges and transport values verified. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power-on sequencing requirements not stated"
- "populate from source, or remove section if not applicable"
- "source does not describe unsolicited event notifications"
- "source does not describe multi-step macros"
- "power-on sequencing requirements not stated in source"
- "firmware version compatibility not stated"
- "port numbers for serial (only baud rate stated)"
- "default IP address (192.168.0.100) noted for network setup but not confirmed as static"
- "fault behavior and error recovery sequences"
- "binary command byte encodings (source uses ASCII text format only)"
- "protocol version numbers not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
