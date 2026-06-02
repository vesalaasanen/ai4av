---
spec_id: admin/digital-projection-evl-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Digital Projection EVL Series Control Spec"
manufacturer: "Digital Projection"
model_family: "HIGHlite Laser II 3D Series"
aliases: []
compatible_with:
  manufacturers:
    - "Digital Projection"
  models:
    - "HIGHlite Laser II 3D Series"
    - "HL Laser 4K"
    - "M-Vision Laser 18K"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - digitalprojection.co.uk
source_urls:
  - https://digitalprojection.co.uk/dpdownloads/Protocol/Simplified-Protocol-Guide-Rev-H.pdf
retrieved_at: 2026-05-04T15:09:49.913Z
last_checked_at: 2026-06-02T20:59:02.408Z
generated_at: 2026-06-02T20:59:02.408Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EVL Series model name not found in source document; compatible_with.models lists all models explicitly documented"
  - "source does not document unsolicited event notifications from projector"
  - "source does not document multi-step macro sequences"
  - "EVL Series model number not found in source; compatible_with lists all explicitly documented models (HIGHlite Laser II 3D Series, HL Laser 4K, M-Vision Laser 18K)"
  - "firmware version compatibility range not stated"
  - "authentication credentials or token format not stated (auth.type: none inferred from absence of any login procedure)"
  - "unsolicited event/notification format not documented"
  - "macro/multistep command sequences not documented"
verification:
  verdict: verified
  checked_at: 2026-06-02T20:59:02.408Z
  matched_actions: 256
  action_count: 256
  confidence: medium
  summary: "All 256 spec actions verified against source. Amend added 17 entries with literal dotted keys matching source rows 293, 400, 418-426, 430-435, 438-440 (eb.blu.bottom, serial, g.portrait/tilt, ti/tc/tb1/tb2 temps, fan groups, water pump status). Prior 17 extras now all covered. Transport TCP/IP+Serial confirmed. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Digital Projection EVL Series Control Spec

## Summary
Digital Projection HIGHlite Laser II 3D Series laser projectors support both TCP/IP network control (port 7000) and RS-232 serial control. Commands are ASCII text strings delimited by `*` prefix and CR suffix, with `=` (set), `?` (get), and execute operators. Responses return `ACK`/`ack` on success or `NAK`/`nack` on failure.

<!-- UNRESOLVED: EVL Series model name not found in source document; compatible_with.models lists all models explicitly documented -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7000
  default_ip: 192.168.0.100
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
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: input
  label: Input Select
  kind: action
  params:
    - name: source
      type: integer
      description: HL Laser II 3D: 0=HDMI1 1=HDMI2 2=RGB 3=BNC 4=DVI 5=DP 6=HDBT 7=HDSDI; HL Laser 4K: 0=DisplayPort 1=HDMI1 2=HDMI2 3=HDBaseT 4=3G-SDI; M-Vision Laser 18K: 0=HDMI1 1=HDMI2 2=DP1 3=DP2 4=HDBaseT 5=3G-SDI

- id: test_pattern
  label: Test Pattern
  kind: action
  params:
    - name: pattern
      type: integer
      description: 0=Off 1=White 2=Black 3=Red 4=Green 5=Blue 6=Checkerboard/Cyan 7=Crosshatch/Yellow 8=V Burst/Magenta 9=H Burst 10=Color Bar 11=Plunge

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
  kind: action
  params:
    - name: slot
      type: integer
      description: 1 to 10

- id: lens_save
  label: Lens Save
  kind: action
  params:
    - name: slot
      type: integer
      description: 1 to 10

- id: lens_clear
  label: Lens Clear
  kind: action
  params:
    - name: slot
      type: integer
      description: 1 to 10

- id: lens_type
  label: Lens Type
  kind: action
  params:
    - name: slot
      type: integer
      description: 1 to 10

- id: lens_lock
  label: Lens Lock
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=On

- id: pic_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=High Bright 1=Presentation 2=Video

- id: db_on
  label: Dynamic Black
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=On

- id: sp_on
  label: SP On
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=On

- id: gamma
  label: Gamma
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D: 0=1.0 1=1.8 2=2.0 3=2.2 4=2.35 5=2.5 6=Checkerboard 7=Crosshatch; HL Laser 4K: 0-11 including HDR variants; M-Vision Laser 18K: 0=1.0 1=1.8 2=2.0 3=2.2 4=2.35 5=2.5 6=S-curve 7=DICOM

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: saturation
  label: Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: hue
  label: Hue
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: 0-15; HL Laser 4K: 0-10

- id: nr
  label: Noise Reduction
  kind: action
  params:
    - name: value
      type: integer
      description: M-Vision Laser 18K: 0 to 3

- id: nr_level
  label: NR Level
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser 4K: 0 to 3

- id: nr_temporal
  label: NR Temporal
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D: 0 to 3

- id: nr_block
  label: NR Block
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D: 0 to 3

- id: nr_mosquito
  label: NR Mosquito
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D: 0 to 3

- id: nr_hori
  label: NR Horizontal
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D: 0 to 3

- id: nr_vert
  label: NR Vertical
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D: 0 to 3

- id: nr_reset
  label: NR Reset
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D: 0 to 3

- id: h_position
  label: Horizontal Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: v_position
  label: Vertical Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: vga_phase
  label: VGA Phase
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 31

- id: tracking
  label: Tracking
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: sync_level
  label: Sync Level
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: freeze
  label: Freeze
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=On

- id: resync
  label: Resync
  kind: action
  params: []

- id: color_space
  label: Color Space
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Auto 1=YPbPr 2=YCbCr 3=RGB-PC 4=RGB-Video

- id: color_temp
  label: Color Temperature
  kind: action
  params:
    - name: value
      type: integer
      description: 0=3200K 1=5400K 2=6500K 3=7500K 4=9300K 5=Native

- id: color_mode
  label: Color Mode
  kind: action
  params:
    - name: value
      type: integer
      description: 0=ColorMax 1=Manual Color Matching 2=Color Temperature 3=Gains and Lifts

- id: color_max
  label: ColorMax
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D: 0=REC709 1=EBU 2=SMPTE 3=Native 4=User1 5=User2; HL Laser 4K: 0=REC709 1=EBU 2=SMPTE 3=Peak 4=User1 5=User2; M-Vision: 0=HDTV 1=Peak 2=User1 3=User2

- id: red_lift
  label: Red Lift
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: green_lift
  label: Green Lift
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: blue_lift
  label: Blue Lift
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: red_gain
  label: Red Gain
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: green_gain
  label: Green Gain
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: blue_gain
  label: Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: gainlift_reset
  label: Gain/Lift Reset
  kind: action
  params: []

- id: auto_test_ptrn
  label: Auto Test Pattern
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=On

- id: user_std_rx
  label: User Standard Red X
  kind: action
  params:
    - name: value
      type: integer
      description: 550 to 750

- id: user_std_ry
  label: User Standard Red Y
  kind: action
  params:
    - name: value
      type: integer
      description: 250 to 450

- id: user_std_gx
  label: User Standard Green X
  kind: action
  params:
    - name: value
      type: integer
      description: 200 to 400

- id: user_std_gy
  label: User Standard Green Y
  kind: action
  params:
    - name: value
      type: integer
      description: 400 to 750

- id: user_std_bx
  label: User Standard Blue X
  kind: action
  params:
    - name: value
      type: integer
      description: 50 to 250

- id: user_std_by
  label: User Standard Blue Y
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 120

- id: user_std_wx
  label: User Standard White X
  kind: action
  params:
    - name: value
      type: integer
      description: 200 to 400

- id: user_std_wy
  label: User Standard White Y
  kind: action
  params:
    - name: value
      type: integer
      description: 250 to 450

- id: user_std_reset
  label: User Standard Reset
  kind: action
  params: []

- id: user_target_rx
  label: User Target Red X
  kind: action
  params:
    - name: value
      type: integer
      description: 550 to 750

- id: user_target_ry
  label: User Target Red Y
  kind: action
  params:
    - name: value
      type: integer
      description: 250 to 450

- id: user_target_gx
  label: User Target Green X
  kind: action
  params:
    - name: value
      type: integer
      description: 200 to 400

- id: user_target_gy
  label: User Target Green Y
  kind: action
  params:
    - name: value
      type: integer
      description: 400 to 750

- id: user_target_bx
  label: User Target Blue X
  kind: action
  params:
    - name: value
      type: integer
      description: 50 to 250

- id: user_target_by
  label: User Target Blue Y
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 120

- id: user_target_wx
  label: User Target White X
  kind: action
  params:
    - name: value
      type: integer
      description: 200 to 400

- id: user_target_wy
  label: User Target White Y
  kind: action
  params:
    - name: value
      type: integer
      description: 250 to 450

- id: user_target_cx
  label: User Target Cyan X
  kind: action
  params:
    - name: value
      type: integer
      description: 125 to 325

- id: user_target_cy
  label: User Target Cyan Y
  kind: action
  params:
    - name: value
      type: integer
      description: 225 to 425

- id: user_target_mx
  label: User Target Magenta X
  kind: action
  params:
    - name: value
      type: integer
      description: 200 to 400

- id: user_target_my
  label: User Target Magenta Y
  kind: action
  params:
    - name: value
      type: integer
      description: 50 to 250

- id: user_target_yx
  label: User Target Yellow X
  kind: action
  params:
    - name: value
      type: integer
      description: 300 to 500

- id: user_target_yy
  label: User Target Yellow Y
  kind: action
  params:
    - name: value
      type: integer
      description: 400 to 600

- id: user_target_reset
  label: User Target Reset
  kind: action
  params: []

- id: user2_target_rx
  label: User 2 Target Red X
  kind: action
  params:
    - name: value
      type: integer
      description: 550 to 750

- id: user2_target_ry
  label: User 2 Target Red Y
  kind: action
  params:
    - name: value
      type: integer
      description: 250 to 450

- id: user2_target_gx
  label: User 2 Target Green X
  kind: action
  params:
    - name: value
      type: integer
      description: 200 to 400

- id: user2_target_gy
  label: User 2 Target Green Y
  kind: action
  params:
    - name: value
      type: integer
      description: 400 to 750

- id: user2_target_bx
  label: User 2 Target Blue X
  kind: action
  params:
    - name: value
      type: integer
      description: 50 to 250

- id: user2_target_by
  label: User 2 Target Blue Y
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 120

- id: user2_target_wx
  label: User 2 Target White X
  kind: action
  params:
    - name: value
      type: integer
      description: 200 to 400

- id: user2_target_wy
  label: User 2 Target White Y
  kind: action
  params:
    - name: value
      type: integer
      description: 250 to 450

- id: user2_target_cx
  label: User 2 Target Cyan X
  kind: action
  params:
    - name: value
      type: integer
      description: 125 to 325

- id: user2_target_cy
  label: User 2 Target Cyan Y
  kind: action
  params:
    - name: value
      type: integer
      description: 225 to 425

- id: user2_target_mx
  label: User 2 Target Magenta X
  kind: action
  params:
    - name: value
      type: integer
      description: 200 to 400

- id: user2_target_my
  label: User 2 Target Magenta Y
  kind: action
  params:
    - name: value
      type: integer
      description: 50 to 250

- id: user2_target_yx
  label: User 2 Target Yellow X
  kind: action
  params:
    - name: value
      type: integer
      description: 300 to 500

- id: user2_target_yy
  label: User 2 Target Yellow Y
  kind: action
  params:
    - name: value
      type: integer
      description: 400 to 600

- id: user2_target_reset
  label: User 2 Target Reset
  kind: action
  params: []

- id: hsg_hue_r
  label: HSG Hue Red
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: hsg_hue_g
  label: HSG Hue Green
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: hsg_hue_b
  label: HSG Hue Blue
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: hsg_hue_c
  label: HSG Hue Cyan
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: hsg_hue_m
  label: HSG Hue Magenta
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: hsg_hue_y
  label: HSG Hue Yellow
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: hsg_sat_r
  label: HSG Saturation Red
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: 0-200; HL Laser 4K: 0-100

- id: hsg_sat_g
  label: HSG Saturation Green
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: 0-200; HL Laser 4K: 0-100

- id: hsg_sat_b
  label: HSG Saturation Blue
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: 0-200; HL Laser 4K: 0-100

- id: hsg_sat_c
  label: HSG Saturation Cyan
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: 0-200; HL Laser 4K: 0-100

- id: hsg_sat_m
  label: HSG Saturation Magenta
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: 0-200; HL Laser 4K: 0-100

- id: hsg_sat_y
  label: HSG Saturation Yellow
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: 0-200; HL Laser 4K: 0-100

- id: hsg_gain_r
  label: HSG Gain Red
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: 0-200; HL Laser 4K: 0-100

- id: hsg_gain_g
  label: HSG Gain Green
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: 0-200; HL Laser 4K: 0-100

- id: hsg_gain_b
  label: HSG Gain Blue
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: 0-200; HL Laser 4K: 0-100

- id: hsg_gain_c
  label: HSG Gain Cyan
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: 0-200; HL Laser 4K: 0-100

- id: hsg_gain_m
  label: HSG Gain Magenta
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: 0-200; HL Laser 4K: 0-100

- id: hsg_gain_y
  label: HSG Gain Yellow
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: 0-200; HL Laser 4K: 0-100

- id: hsg_white_r
  label: HSG White Red
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: hsg_white_g
  label: HSG White Green
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: hsg_white_b
  label: HSG White Blue
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200

- id: hsg_reset
  label: HSG Reset
  kind: action
  params: []

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: value
      type: integer
      description: 0=5:4 1=4:3 2=16:10 3=16:9 4=1.88 5=2.35 6=Theaterscope 7=Source 8=Unscaled

- id: digi_zoom
  label: Digital Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 100

- id: digi_pan
  label: Digital Pan
  kind: action
  params:
    - name: value
      type: integer
      description: -320 to +320

- id: digi_pan_bound
  label: Digital Pan Bound
  kind: action
  params:
    - name: value
      type: integer
      description: -320 to +320

- id: digi_scan
  label: Digital Scan
  kind: action
  params:
    - name: value
      type: integer
      description: -200 to +200

- id: digi_scan_bound
  label: Digital Scan Bound
  kind: action
  params:
    - name: value
      type: integer
      description: -200 to +200

- id: digi_zoom_rst
  label: Digital Zoom Reset
  kind: action
  params: []

- id: overscan
  label: Overscan
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=Crop 2=Zoom

- id: h_keystone
  label: Horizontal Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D: -470 to +470; HL Laser 4K: -600 to +600

- id: v_keystone
  label: Vertical Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: -400 to +400

- id: keystone_reset
  label: Keystone Reset
  kind: action
  params: []

- id: rotation
  label: Rotation
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to +100

- id: rotation_reset
  label: Rotation Reset
  kind: action
  params: []

- id: h_pin_barrel
  label: Horizontal Pin Barrel
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D: -150 to +300; HL Laser 4K: -120 to +229; M-Vision: -150 to +300

- id: v_pin_barrel
  label: Vertical Pin Barrel
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: -150 to +300; HL Laser 4K: -120 to +120

- id: pin_barrel_reset
  label: Pin Barrel Reset
  kind: action
  params: []

- id: 4corner_ulx
  label: Four Corner Upper Left X
  kind: action
  params:
    - name: value
      type: integer
      description: -192 to +192

- id: 4corner_uly
  label: Four Corner Upper Left Y
  kind: action
  params:
    - name: value
      type: integer
      description: -120 to +120

- id: 4corner_urx
  label: Four Corner Upper Right X
  kind: action
  params:
    - name: value
      type: integer
      description: -192 to +192

- id: 4corner_ury
  label: Four Corner Upper Right Y
  kind: action
  params:
    - name: value
      type: integer
      description: -120 to +120

- id: 4corner_llx
  label: Four Corner Lower Left X
  kind: action
  params:
    - name: value
      type: integer
      description: -192 to +192

- id: 4corner_lly
  label: Four Corner Lower Left Y
  kind: action
  params:
    - name: value
      type: integer
      description: -120 to +120

- id: 4corner_lrx
  label: Four Corner Lower Right X
  kind: action
  params:
    - name: value
      type: integer
      description: -192 to +192

- id: 4corner_lry
  label: Four Corner Lower Right Y
  kind: action
  params:
    - name: value
      type: integer
      description: -120 to +120

- id: 4corner_reset
  label: Four Corner Reset
  kind: action
  params: []

- id: arc_top
  label: Arc Top
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: -150 to +150; HL Laser 4K: -60 to +115

- id: arc_bottom
  label: Arc Bottom
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: -150 to +150; HL Laser 4K: -60 to +114

- id: arc_left
  label: Arc Left
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: -150 to +150; HL Laser 4K: -60 to +115

- id: arc_right
  label: Arc Right
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: -150 to +150; HL Laser 4K: -60 to +114

- id: arc_reset
  label: Arc Reset
  kind: action
  params: []

- id: blanking_top
  label: Blanking Top
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 360

- id: blanking_bottom
  label: Blanking Bottom
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 360

- id: blanking_left
  label: Blanking Left
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 534

- id: blanking_right
  label: Blanking Right
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 534

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
  kind: action
  params:
    - name: value
      type: integer
      description: 0=none 1=Keystone 2=Four Corner 3=Rotation 4=Pin/Barrel 5=Arc

- id: cust_wp_write
  label: Custom Warp Write
  kind: action
  params:
    - name: value
      type: integer
      description: 1=User1 2=User2

- id: cust_wp_clear
  label: Custom Warp Clear
  kind: action
  params:
    - name: value
      type: integer
      description: 1=User1 2=User2

- id: cust_wp_send
  label: Custom Warp Send
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=User1 2=User2

- id: cust_wp_ck_sum
  label: Custom Warp Checksum
  kind: action
  params: []

- id: warp_cust
  label: Warp Custom
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=User1 2=User2

- id: eb_stat
  label: Edge Blend Status
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=On

- id: eb_adl
  label: Edge Blend ADL
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=On

- id: eb_top
  label: Edge Blend Top
  kind: action
  params:
    - name: value
      type: integer
      description: 0, 100 to 500

- id: eb_bottom
  label: Edge Blend Bottom
  kind: action
  params:
    - name: value
      type: integer
      description: 0, 100 to 500

- id: eb_left
  label: Edge Blend Left
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D: 0, 100 to 800; M-Vision: 0, 100 to 500

- id: eb_right
  label: Edge Blend Right
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D: 0, 100 to 800; M-Vision: 0, 100 to 500

- id: eb_blu_top
  label: Edge Blend Blanking Top
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 32

- id: eb_blu_btm
  label: Edge Blend Blanking Bottom
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 32

- id: eb_blu_left
  label: Edge Blend Blanking Left
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 32

- id: eb_blu_right
  label: Edge Blend Blanking Right
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 32

- id: eb_all
  label: Edge Blend All
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 255

- id: eb_red
  label: Edge Blend Red
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: 0-255; HL Laser 4K: 0-32

- id: eb_green
  label: Edge Blend Green
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: 0-255; HL Laser 4K: 0-32

- id: eb_blue
  label: Edge Blend Blue
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: 0-255; HL Laser 4K: 0-32

- id: eb_reset
  label: Edge Blend Reset
  kind: action
  params: []

- id: 3d_format
  label: 3D Format
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: 0=Off 1=Auto 2=SBS 3=TAB 4=Dual-Pipe 5=Frame Sequential; HL Laser 4K: 0=Off 1=Auto 2=SBS 3=TAB 4=Dual-Pipe 5=Frame Sequential

- id: 3d_dlplink
  label: 3D DLP Link
  kind: action
  params:
    - name: value
      type: integer
      description: M-Vision Laser 18K: 0=Off 1=On

- id: 3d_dominance
  label: 3D Dominance
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Normal 1=Reverse

- id: 3d_darktime
  label: 3D Dark Time
  kind: action
  params:
    - name: value
      type: integer
      description: 0=0.65ms 1=1.3ms 2=1.95ms 3=2.5ms

- id: 3d_syncoffset
  label: 3D Sync Offset
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D: 0-60; M-Vision Laser 18K: 0-200

- id: 3d_syncref
  label: 3D Sync Reference
  kind: action
  params:
    - name: value
      type: integer
      description: 0=External 1=Internal

- id: laser_mode
  label: Laser Mode
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Eco 1=Normal 2=Custom

- id: laser_power
  label: Laser Power
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D: 30-100; M-Vision Laser 18K: 20-100; only available when laser.mode=2

- id: laser_hours
  label: Laser Hours
  kind: action
  params: []

- id: altitude
  label: Altitude Mode
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D: 1=On 2=Auto; HL Laser 4K: 1=Auto 2=On; M-Vision Laser 18K: 0=On 1=Auto 2=Quiet

- id: cooling_condition
  label: Cooling Condition
  kind: action
  params:
    - name: value
      type: integer
      description: M-Vision Laser 18K: 0=Table 1=Ceiling 2=Freetilt 3=Auto

- id: orientation
  label: Orientation
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D/M-Vision: 0=Desktop Front 1=Ceiling Front 2=Desktop Rear 3=Ceiling Rear; M-Vision Laser 18K: also 4=Auto-front

- id: screen_setting
  label: Screen Setting
  kind: action
  params:
    - name: value
      type: integer
      description: 0=16:10 1=16:9 2=4:3

- id: auto_poweroff
  label: Auto Power Off
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=On

- id: auto_poweron
  label: Auto Power On
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=On

- id: schedule_power
  label: Schedule Power
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=On

- id: schedule1_on_day
  label: Schedule 1 On Day
  kind: action
  params:
    - name: value
      type: integer
      description: Bit field (bits 0-6 = Sun-Sat)

- id: schedule1_off_day
  label: Schedule 1 Off Day
  kind: action
  params:
    - name: value
      type: integer
      description: Bit field (bits 0-6 = Sun-Sat)

- id: schedule1_on_time
  label: Schedule 1 On Time
  kind: action
  params:
    - name: value
      type: string
      description: HH:MM format

- id: schedule1_off_time
  label: Schedule 1 Off Time
  kind: action
  params:
    - name: value
      type: string
      description: HH:MM format

- id: schedule2_on_day
  label: Schedule 2 On Day
  kind: action
  params:
    - name: value
      type: integer
      description: Bit field (bits 0-6 = Sun-Sat)

- id: schedule2_off_day
  label: Schedule 2 Off Day
  kind: action
  params:
    - name: value
      type: integer
      description: Bit field (bits 0-6 = Sun-Sat)

- id: schedule2_on_time
  label: Schedule 2 On Time
  kind: action
  params:
    - name: value
      type: string
      description: HH:MM format

- id: schedule2_off_time
  label: Schedule 2 Off Time
  kind: action
  params:
    - name: value
      type: string
      description: HH:MM format

- id: date
  label: Date
  kind: action
  params:
    - name: value
      type: string
      description: HL Laser II 3D/M-Vision: yyyy/MM/dd; HL Laser 4K: DD:MM:YYYY

- id: time_zone
  label: Time Zone
  kind: action
  params:
    - name: value
      type: integer
      description: -11 to +12

- id: time_adjust
  label: Time Adjust
  kind: action
  params:
    - name: value
      type: string
      description: HH:MM format

- id: startup_logo
  label: Startup Logo
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=On

- id: standby_mode
  label: Standby Mode
  kind: action
  params:
    - name: value
      type: integer
      description: M-Vision Laser 18K: 0=Saving 1=Eco 2=Normal

- id: blank_screen
  label: Blank Screen
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser 4K: 0=Black 1=Blue 2=White

- id: trig_1
  label: Trigger 1
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=Screen 2-10=Aspect ratios 11=RS232 12=RS232 on 13=RS232 off

- id: trig_2
  label: Trigger 2
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=Screen 2-10=Aspect ratios 11=RS232 12=RS232 on 13=RS232 off

- id: auto_source
  label: Auto Source
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=On

- id: ir_enable
  label: IR Enable
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser 4K: 0=Off 1=On

- id: ir_code
  label: IR Code
  kind: action
  params:
    - name: value
      type: integer
      description: 00 to 99

- id: ir_code_rst
  label: IR Code Reset
  kind: action
  params: []

- id: osd_lang
  label: OSD Language
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser 4K: 0=English 1=French 2=Spanish 3=German 4=Simplified Chinese 5=Japanese 6=Korean 7=Spanish; M-Vision Laser 18K: 0=English 1=French 2=German 3=Spanish 4=Simplified Chinese

- id: osd_menupos
  label: OSD Menu Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0=TopLeft 1=TopRight 2=BottomLeft 3=BottomRight 4=Center

- id: osd_trans
  label: OSD Transparency
  kind: action
  params:
    - name: value
      type: integer
      description: 0=0% 1=25% 2=50% 3=75%

- id: osd_timer
  label: OSD Timer
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Always On 1=10s 2=30s 3=60s

- id: osd_msgbox
  label: OSD Message Box
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=On

- id: recall_mem
  label: Recall Memory
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Preset A 1=Preset B 2=Preset C 3=Preset D 4=Default

- id: save_mem
  label: Save Memory
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Preset A 1=Preset B 2=Preset C 3=Preset D

- id: network_mode
  label: Network Mode
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Projector Control 1=Service

- id: lan_power
  label: LAN Power
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=On

- id: lan_dhcp
  label: LAN DHCP
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=On

- id: lan_ip
  label: LAN IP Address
  kind: action
  params:
    - name: value
      type: string
      description: xxx.xxx.xxx.xxx format

- id: lan_subnet
  label: LAN Subnet
  kind: action
  params:
    - name: value
      type: string
      description: xxx.xxx.xxx.xxx format

- id: lan_gateway
  label: LAN Gateway
  kind: action
  params:
    - name: value
      type: string
      description: xxx.xxx.xxx.xxx format

- id: lan_dns
  label: LAN DNS
  kind: action
  params:
    - name: value
      type: string
      description: xxx.xxx.xxx.xxx format

- id: lan_mac
  label: LAN MAC Address
  kind: action
  params: []

- id: lan_amx
  label: LAN AMX
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=On

- id: pip_mode
  label: PIP Mode
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=On

- id: pip_input
  label: PIP Input
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser II 3D: 0=HDMI1 1=HDMI2 2=RGB 3=COMP 4=DP 5=HDBaseT 6=3G-SDI; HL Laser 4K: 0=DP 1=HDMI1 2=HDMI2 3=HDBaseT 4=3G-SDI; M-Vision: 0=HDMI1 1=HDMI2 2=DP1 3=DP2 4=HDBaseT 5=3G-SDI

- id: pip_position
  label: PIP Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0=TopLeft 1=TopRight 2=BottomLeft 3=BottomRight 4=PBP

- id: power
  label: Power
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off 1=On

- id: shutter
  label: Shutter
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Open 1=Close

- id: pic_mute
  label: Picture Mute
  kind: action
  params:
    - name: value
      type: integer
      description: M-Vision Laser 18K: 0=Open 1=Close

- id: total_hours
  label: Total Hours
  kind: action
  params: []

- id: status
  label: Projector Status
  kind: action
  params: []

- id: errcode
  label: Error Code
  kind: action
  params: []

- id: sys_info
  label: System Info
  kind: action
  params: []

- id: dlp_pattern
  label: DLP Pattern
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser 4K: 0=Off 1=RGB Ramps 2=Color Bar 3=Step Bars 4=Check Board 5=Grid 6=H Lines 7=V Lines 8=D Lines 9=Ramp H 10=Ramp V 11=White 12=Red 13=Green 14=Blue 15=Black 16=Cyan 17=Magenta 18=Yellow

- id: pri_reset
  label: Pattern Reset
  kind: action
  params: []

- id: sp_power
  label: SP Power
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser 4K: 0=Off 1=On

- id: sp_index_v
  label: SP Index Vertical
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser 4K: 0, 0 to 4096

- id: sp_index_h
  label: SP Index Horizontal
  kind: action
  params:
    - name: value
      type: integer
      description: HL Laser 4K: 0, 0 to 4096

- id: warp_key
  label: Warp Key
  kind: action
  params: []

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []

# === Status / info / environmental commands documented in source but not previously enumerated ===
# Each key below appears verbatim in the source command table.

- id: "eb.blu.bottom"
  label: "eb.blu.bottom — Edge-Blend Black Level Uplift bottom (0-32)"
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 32"

- id: "serial"
  label: "serial — Projector serial number (read-only string)"
  kind: query
  params: []

- id: "g.portrait"
  label: "g.portrait — Geometry portrait orientation (read-only number)"
  kind: query
  params: []

- id: "g.tilt"
  label: "g.tilt — Geometry tilt (read-only number)"
  kind: query
  params: []

- id: "ti"
  label: "ti — Intake (input) temperature (read-only number)"
  kind: query
  params: []

- id: "tc"
  label: "tc — Core / case temperature (read-only number)"
  kind: query
  params: []

- id: "tb1"
  label: "tb1 — Board temperature 1 (read-only number)"
  kind: query
  params: []

- id: "tb2"
  label: "tb2 — Board temperature 2 (read-only number)"
  kind: query
  params: []

- id: "fan1_3"
  label: "fan1_3 — Fan 1-3 speed (xxxx / xxxx / xxxx)"
  kind: query
  params: []

- id: "fan4_6"
  label: "fan4_6 — Fan 4-6 speed"
  kind: query
  params: []

- id: "fan7_9"
  label: "fan7_9 — Fan 7-9 speed"
  kind: query
  params: []

- id: "fan10_12"
  label: "fan10_12 — Fan 10-12 speed"
  kind: query
  params: []

- id: "fan13_15"
  label: "fan13_15 — Fan 13-15 speed"
  kind: query
  params: []

- id: "fan16_18"
  label: "fan16_18 — Fan 16 (-18) speed"
  kind: query
  params: []

- id: "water.pump1"
  label: "water.pump1 — Water pump 1 status (read-only number)"
  kind: query
  params: []

- id: "water.pump2"
  label: "water.pump2 — Water pump 2 status (read-only number)"
  kind: query
  params: []

- id: "water.pump3"
  label: "water.pump3 — Water pump 3 status (read-only number)"
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: ack_response
  label: Command Acknowledged
  type: string
  description: Returns "ACK <command> = <value>" or "ack <command> = <value>" on success

- id: nak_response
  label: Command Rejected
  type: string
  description: Returns "NAK <description>" or "nack <description>" on failure

- id: query_response
  label: Query Response
  type: string
  description: Returns current value as ASCII text string for ? (get) operator commands
```

## Variables
```yaml
# All settable commands above can also be queried via the ? operator.
# The following informational variables are documented:
- id: model_name
  type: string
  description: Model name string

- id: serial_number
  type: string
  description: Serial number string

- id: sw_version
  type: string
  description: Main firmware version string

- id: sw1_version
  type: string
  description: Secondary firmware version (HL Laser 4K)

- id: sw2_version
  type: string
  description: Tertiary firmware version (HL Laser 4K)

- id: sw3_version
  type: string
  description: Quaternary firmware version (HL Laser 4K)

- id: act_source
  type: string
  description: Active source information

- id: signal
  type: string
  description: Signal information

- id: h_refresh
  type: number
  description: Horizontal refresh rate

- id: v_refresh
  type: number
  description: Vertical refresh rate

- id: pixel_clock
  type: number
  description: Pixel clock frequency

- id: laser_hours_info
  type: number
  description: Laser projector hours

- id: atmos_alti
  type: number
  description: Atmospheric altitude info

- id: atmos_pressure
  type: number
  description: Atmospheric pressure

- id: ac_voltage
  type: enum
  values: [0, 1]
  description: 0=90-150V 1=160-264V

- id: g_ceiling
  type: enum
  values: [0, 1]
  description: M-Vision Laser 18K: 0=table 1=ceiling

- id: altitude_info
  type: enum
  values: [0, 1]
  description: HL Laser 4K: 0=Low 1=High

- id: laser_power_info
  type: number
  description: HL Laser 4K laser power level

- id: laser_temp
  type: number
  description: HL Laser 4K laser temperature

- id: fans
  type: string
  description: All fan and environment status

- id: water_pump
  type: number
  description: Water pump status
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event notifications from projector
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Only one control path (serial or network) should be used at a time. Using both simultaneously may result in unpredictable behavior.
  - Wait for complete response to a command before sending another command.
```

## Notes
Command syntax: `*<command> <operator> <value>` where operator is `=` (set), `?` (get), `+`/`-` (inc/dec), or absent (execute). All commands end with ASCII CR (code 13). Spaces are required before operator and value. Example: `*orientation = 3`.

Response format: `ACK/ack` on success (e.g., `ACK aspect.ratio = 1`), `NAK/nack` on failure with error description.

Default IP address: 192.168.0.100. TCP port: 7000.

<!-- UNRESOLVED: EVL Series model number not found in source; compatible_with lists all explicitly documented models (HIGHlite Laser II 3D Series, HL Laser 4K, M-Vision Laser 18K) -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: authentication credentials or token format not stated (auth.type: none inferred from absence of any login procedure) -->
<!-- UNRESOLVED: unsolicited event/notification format not documented -->
<!-- UNRESOLVED: macro/multistep command sequences not documented -->

## Provenance

```yaml
source_domains:
  - digitalprojection.co.uk
source_urls:
  - https://digitalprojection.co.uk/dpdownloads/Protocol/Simplified-Protocol-Guide-Rev-H.pdf
retrieved_at: 2026-05-04T15:09:49.913Z
last_checked_at: 2026-06-02T20:59:02.408Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T20:59:02.408Z
matched_actions: 256
action_count: 256
confidence: medium
summary: "All 256 spec actions verified against source. Amend added 17 entries with literal dotted keys matching source rows 293, 400, 418-426, 430-435, 438-440 (eb.blu.bottom, serial, g.portrait/tilt, ti/tc/tb1/tb2 temps, fan groups, water pump status). Prior 17 extras now all covered. Transport TCP/IP+Serial confirmed. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EVL Series model name not found in source document; compatible_with.models lists all models explicitly documented"
- "source does not document unsolicited event notifications from projector"
- "source does not document multi-step macro sequences"
- "EVL Series model number not found in source; compatible_with lists all explicitly documented models (HIGHlite Laser II 3D Series, HL Laser 4K, M-Vision Laser 18K)"
- "firmware version compatibility range not stated"
- "authentication credentials or token format not stated (auth.type: none inferred from absence of any login procedure)"
- "unsolicited event/notification format not documented"
- "macro/multistep command sequences not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
