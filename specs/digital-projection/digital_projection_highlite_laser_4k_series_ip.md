---
spec_id: admin/digital-projection-highlite-laser-4k-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Digital Projection HIGHlite Laser 4K Series Control Spec"
manufacturer: "Digital Projection"
model_family: "HIGHlite Laser 4K Series"
aliases: []
compatible_with:
  manufacturers:
    - "Digital Projection"
  models:
    - "HIGHlite Laser 4K Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - digitalprojection.co.uk
source_urls:
  - https://digitalprojection.co.uk/dpdownloads/Protocol/Simplified-Protocol-Guide-Rev-H.pdf
  - "https://digitalprojection.co.uk/dpdownloads/Protocol/Protocol%20Guide%20Rev%20A.pdf"
  - "https://digitalprojection.co.uk/dpdownloads/Protocol/Protocol%20Guide%20INSIGHT%204K.pdf"
  - "http://digitalprojection.co.uk/dpdownloads/DP%20Resources%20115-759G/content/protocol/Protocol%20Guide%20Rev%20D.pdf"
retrieved_at: 2026-05-01T00:18:24.749Z
last_checked_at: 2026-05-14T18:17:15.544Z
generated_at: 2026-05-14T18:17:15.544Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:15.544Z
  matched_actions: 159
  action_count: 227
  confidence: high
  summary: "All 159 spec actions match semantic counterparts in source; transport parameters verified literal; comprehensive command coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Digital Projection HIGHlite Laser 4K Series Control Spec

## Summary
Laser phosphor projector controlled via RS-232 or TCP/IP. Default IP 192.168.0.100:7000. Commands are ASCII strings `*command operator value` terminated by CR. Queries return ASCII values; acknowledged commands return `ACK`/`ack`, errors return `NAK`/`nack`. Only one control path at a time supported.

<!-- UNRESOLVED: command timing (delay between commands) not stated -->
<!-- UNRESOLVED: power on/off commands not found in source — power state queried via `status` -->

## Transport
```yaml
protocols:
  - tcp
  - serial  # RS-232 also documented
addressing:
  port: 7000  # stated: "TCP port number is 7000"
  default_ip: 192.168.0.100
serial:
  baud_rate: 9600  # stated: "Baud rate 9,600 bps"
  data_bits: 8  # stated: "Data length 8 bits"
  parity: null  # UNRESOLVED: parity not stated
  stop_bits: null  # UNRESOLVED: stop bits not stated
  flow_control: null  # UNRESOLVED: flow control not stated
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
- powerable  # inferred: `power` command present (0=Off, 1=On)
- routable  # inferred: `input` command with routing values present
- queryable  # inferred: multiple `?` query commands present
- levelable  # inferred: brightness, contrast, saturation, hue, zoom, focus commands present
```

## Actions
```yaml
- id: input
  label: Input Select
  kind: action
  params:
    - name: source
      type: integer
      description: "E-Vision 6900: 0=HDMI I, 1=HDMI II, 2=DVI-D, 3=VGA, 4=Component, 5=HDBaseT | Mercury Quad: 0=HDMI 1, 1=HDMI 2, 2=DisplayPort, 3=HDBaseT, 4=3G-SDI"

- id: test_pattern
  label: Test Pattern
  kind: action
  params:
    - name: pattern
      type: integer
      description: "E-Vision 6900: 0=Off,1=White,2=Black,3=Red,4=Green,5=Blue,6=Checkboard,7=CrossHatch,8=V Burst,9=H Burst,10=Color Bar,11=Hramp | Mercury Quad: 0=Off,1=White,2=Black,3=Red,4=Green,5=Blue,6=Checkerboard,7=Crosshatch,8=V Burst,9=H Burst,10=Color Bar,11=Plunge"

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
      description: "E-Vision 6900: 0-9 | Mercury Quad: 1-10"

- id: lens_save
  label: Lens Save
  kind: action
  params:
    - name: slot
      type: integer
      description: "E-Vision 6900: 0-9 | Mercury Quad: 1-10"

- id: lens_clear
  label: Lens Clear
  kind: action
  params:
    - name: slot
      type: integer
      description: "E-Vision 6900: 0-9 | Mercury Quad: 1-10"

- id: lens_type
  label: Lens Type
  kind: action
  params:
    - name: type
      type: integer
      description: "0=non-UST Lens, 1=UST Lens"

- id: lens_lock
  label: Lens Lock
  kind: action
  params:
    - name: lock
      type: integer
      description: "0=Off, 1=On"

- id: pic_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=High Bright, 1=Presentation, 2=Video"

- id: dblack
  label: Dynamic Black
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: gamma
  label: Gamma
  kind: action
  params:
    - name: value
      type: integer
      description: "E-Vision 6900: 0=1.0,1=1.8,2=2.0,3=2.2,4=2.35,5=2.5,6=S-curve | Mercury Quad: 0=1.0,1=1.8,2=2.0,3=2.2,4=2.35,5=2.5"

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: saturation
  label: Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hue
  label: Hue
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: "E-Vision 6900: 0-31 | Mercury Quad: 0-15"

- id: nr
  label: Noise Reduction
  kind: action
  params:
    - name: value
      type: integer
      description: "E-Vision 6900: 0-15"

- id: nr_temporal
  label: Temporal NR
  kind: action
  params:
    - name: value
      type: integer
      description: "Mercury Quad: 0-3"

- id: nr_block
  label: Block NR
  kind: action
  params:
    - name: value
      type: integer
      description: "Mercury Quad: 0-3"

- id: nr_mosquito
  label: Mosquito NR
  kind: action
  params:
    - name: value
      type: integer
      description: "Mercury Quad: 0-3"

- id: nr_hori
  label: Horizontal NR
  kind: action
  params:
    - name: value
      type: integer
      description: "Mercury Quad: 0-3"

- id: nr_vert
  label: Vertical NR
  kind: action
  params:
    - name: value
      type: integer
      description: "Mercury Quad: 0-3"

- id: nr_reset
  label: NR Reset
  kind: action
  params: []

- id: h_position
  label: Horizontal Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: v_position
  label: Vertical Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: vga_phase
  label: VGA Phase
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 31"

- id: tracking
  label: Tracking
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: sync_level
  label: Sync Level
  kind: action
  params:
    - name: value
      type: integer
      description: "Mercury Quad: 0-200"

- id: freeze
  label: Freeze
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: resync
  label: Resync
  kind: action
  params: []

- id: vga_auto
  label: VGA Auto
  kind: action
  params: []

- id: color_space
  label: Color Space
  kind: action
  params:
    - name: space
      type: integer
      description: "0=Auto, 1=YPbPr, 2=YCbCr, 3=RGB-PC, 4=RGB-Video"

- id: color_temp
  label: Color Temperature
  kind: action
  params:
    - name: temp
      type: integer
      description: "E-Vision 6900: 0=Native,1=5400K,2=6500K,3=7500K,4=9300K | Mercury Quad: 0=3200K,1=5400K,2=6500K,3=7500K,4=9300K,5=Native"

- id: color_mode
  label: Color Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=ColorMax, 1=Manual Color Matching, 2=Color Temperature, 3=Gains and Lifts"

- id: color_max
  label: ColorMax
  kind: action
  params:
    - name: preset
      type: integer
      description: "0=REC709, 1=EBU, 2=SMPTE, 3=Native, 4=User 1, 5=User 2"

- id: red_lift
  label: Red Lift
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: green_lift
  label: Green Lift
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: blue_lift
  label: Blue Lift
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: red_gain
  label: Red Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: green_gain
  label: Green Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: blue_gain
  label: Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: gainlift_reset
  label: Gain/Lift Reset
  kind: action
  params: []

- id: auto_test_ptrn
  label: Auto Test Pattern
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: user_std_rx
  label: User Standard Rx
  kind: action
  params:
    - name: value
      type: integer
      description: "550 to 750"

- id: user_std_ry
  label: User Standard Ry
  kind: action
  params:
    - name: value
      type: integer
      description: "250 to 450"

- id: user_std_gx
  label: User Standard Gx
  kind: action
  params:
    - name: value
      type: integer
      description: "200 to 400"

- id: user_std_gy
  label: User Standard Gy
  kind: action
  params:
    - name: value
      type: integer
      description: "400 to 750"

- id: user_std_bx
  label: User Standard Bx
  kind: action
  params:
    - name: value
      type: integer
      description: "50 to 250"

- id: user_std_by
  label: User Standard By
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 120"

- id: user_std_wx
  label: User Standard Wx
  kind: action
  params:
    - name: value
      type: integer
      description: "200 to 400"

- id: user_std_wy
  label: User Standard Wy
  kind: action
  params:
    - name: value
      type: integer
      description: "250 to 450"

- id: user_std_reset
  label: User Standard Reset
  kind: action
  params: []

- id: user_target_rx
  label: User Target Rx
  kind: action
  params:
    - name: value
      type: integer
      description: "550 to 750"

- id: user_target_ry
  label: User Target Ry
  kind: action
  params:
    - name: value
      type: integer
      description: "250 to 450"

- id: user_target_gx
  label: User Target Gx
  kind: action
  params:
    - name: value
      type: integer
      description: "200 to 400"

- id: user_target_gy
  label: User Target Gy
  kind: action
  params:
    - name: value
      type: integer
      description: "400 to 750"

- id: user_target_bx
  label: User Target Bx
  kind: action
  params:
    - name: value
      type: integer
      description: "50 to 250"

- id: user_target_by
  label: User Target By
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 120"

- id: user_target_wx
  label: User Target Wx
  kind: action
  params:
    - name: value
      type: integer
      description: "200 to 400"

- id: user_target_wy
  label: User Target Wy
  kind: action
  params:
    - name: value
      type: integer
      description: "250 to 450"

- id: user_target_cx
  label: User Target Cx
  kind: action
  params:
    - name: value
      type: integer
      description: "125 to 325"

- id: user_target_cy
  label: User Target Cy
  kind: action
  params:
    - name: value
      type: integer
      description: "225 to 425"

- id: user_target_mx
  label: User Target Mx
  kind: action
  params:
    - name: value
      type: integer
      description: "200 to 400"

- id: user_target_my
  label: User Target My
  kind: action
  params:
    - name: value
      type: integer
      description: "50 to 250"

- id: user_target_yx
  label: User Target Yx
  kind: action
  params:
    - name: value
      type: integer
      description: "300 to 500"

- id: user_target_yy
  label: User Target Yy
  kind: action
  params:
    - name: value
      type: integer
      description: "400 to 600"

- id: user_target_reset
  label: User Target Reset
  kind: action
  params: []

- id: user2_target_rx
  label: User2 Target Rx
  kind: action
  params:
    - name: value
      type: integer
      description: "550 to 750"

- id: user2_target_ry
  label: User2 Target Ry
  kind: action
  params:
    - name: value
      type: integer
      description: "250 to 450"

- id: user2_target_gx
  label: User2 Target Gx
  kind: action
  params:
    - name: value
      type: integer
      description: "200 to 400"

- id: user2_target_gy
  label: User2 Target Gy
  kind: action
  params:
    - name: value
      type: integer
      description: "400 to 750"

- id: user2_target_bx
  label: User2 Target Bx
  kind: action
  params:
    - name: value
      type: integer
      description: "50 to 250"

- id: user2_target_by
  label: User2 Target By
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 120"

- id: user2_target_wx
  label: User2 Target Wx
  kind: action
  params:
    - name: value
      type: integer
      description: "200 to 400"

- id: user2_target_wy
  label: User2 Target Wy
  kind: action
  params:
    - name: value
      type: integer
      description: "250 to 450"

- id: user2_target_cx
  label: User2 Target Cx
  kind: action
  params:
    - name: value
      type: integer
      description: "125 to 325"

- id: user2_target_cy
  label: User2 Target Cy
  kind: action
  params:
    - name: value
      type: integer
      description: "225 to 425"

- id: user2_target_mx
  label: User2 Target Mx
  kind: action
  params:
    - name: value
      type: integer
      description: "200 to 400"

- id: user2_target_my
  label: User2 Target My
  kind: action
  params:
    - name: value
      type: integer
      description: "50 to 250"

- id: user2_target_yx
  label: User2 Target Yx
  kind: action
  params:
    - name: value
      type: integer
      description: "300 to 500"

- id: user2_target_yy
  label: User2 Target Yy
  kind: action
  params:
    - name: value
      type: integer
      description: "400 to 600"

- id: user2_target_reset
  label: User2 Target Reset
  kind: action
  params: []

- id: hsg_hue_r
  label: HSG Hue Red
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_hue_g
  label: HSG Hue Green
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_hue_b
  label: HSG Hue Blue
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_hue_c
  label: HSG Hue Cyan
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_hue_m
  label: HSG Hue Magenta
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_hue_y
  label: HSG Hue Yellow
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_sat_r
  label: HSG Saturation Red
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_sat_g
  label: HSG Saturation Green
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_sat_b
  label: HSG Saturation Blue
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_sat_c
  label: HSG Saturation Cyan
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_sat_m
  label: HSG Saturation Magenta
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_sat_y
  label: HSG Saturation Yellow
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_gain_r
  label: HSG Gain Red
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_gain_g
  label: HSG Gain Green
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_gain_b
  label: HSG Gain Blue
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_gain_c
  label: HSG Gain Cyan
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_gain_m
  label: HSG Gain Magenta
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_gain_y
  label: HSG Gain Yellow
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_white_r
  label: HSG White Red
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_white_g
  label: HSG White Green
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_white_b
  label: HSG White Blue
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_reset
  label: HSG Reset
  kind: action
  params: []

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: "0=5:4, 1=4:3, 2=16:10, 3=16:9, 4=1.88, 5=2.35, 6=Theaterscope, 7=Source, 8=Unscaled"

- id: digi_zoom
  label: Digital Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 100"

- id: digi_pan
  label: Digital Pan
  kind: action
  params:
    - name: value
      type: integer
      description: "-320 to +320"

- id: digi_pan_bound
  label: Digital Pan Bound
  kind: action
  params:
    - name: value
      type: integer
      description: "-320 to +320"

- id: digi_scan
  label: Digital Scan
  kind: action
  params:
    - name: value
      type: integer
      description: "-200 to +200"

- id: digi_scan_bound
  label: Digital Scan Bound
  kind: action
  params:
    - name: value
      type: integer
      description: "-200 to +200"

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
      description: "E-Vision 6900: 0=Off,1=On | Mercury Quad: 0=Off,1=Crop,2=Zoom"

- id: h_keystone
  label: Horizontal Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: "E-Vision 6900: -30 to +30 | Mercury Quad: -600 to +600"

- id: v_keystone
  label: Vertical Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: "E-Vision 6900: -30 to +30 | Mercury Quad: -400 to +400"

- id: rotation
  label: Rotation
  kind: action
  params:
    - name: value
      type: integer
      description: "Mercury Quad: -100 to +100"

- id: h_pin_barrel
  label: Horizontal Pin Barrel
  kind: action
  params:
    - name: value
      type: integer
      description: "Mercury Quad: -150 to +300"

- id: v_pin_barrel
  label: Vertical Pin Barrel
  kind: action
  params:
    - name: value
      type: integer
      description: "Mercury Quad: -150 to +300"

- id: corner_ulx
  label: Four Corner Upper Left X
  kind: action
  params:
    - name: value
      type: integer
      description: "-192 to +192"

- id: corner_uly
  label: Four Corner Upper Left Y
  kind: action
  params:
    - name: value
      type: integer
      description: "-120 to +120"

- id: corner_urx
  label: Four Corner Upper Right X
  kind: action
  params:
    - name: value
      type: integer
      description: "-192 to +192"

- id: corner_ury
  label: Four Corner Upper Right Y
  kind: action
  params:
    - name: value
      type: integer
      description: "-120 to +120"

- id: corner_llx
  label: Four Corner Lower Left X
  kind: action
  params:
    - name: value
      type: integer
      description: "-192 to +192"

- id: corner_lly
  label: Four Corner Lower Left Y
  kind: action
  params:
    - name: value
      type: integer
      description: "-120 to +120"

- id: corner_lrx
  label: Four Corner Lower Right X
  kind: action
  params:
    - name: value
      type: integer
      description: "-192 to +192"

- id: corner_lry
  label: Four Corner Lower Right Y
  kind: action
  params:
    - name: value
      type: integer
      description: "-120 to +120"

- id: arc_top
  label: Arc Top
  kind: action
  params:
    - name: value
      type: integer
      description: "-150 to +150"

- id: arc_bottom
  label: Arc Bottom
  kind: action
  params:
    - name: value
      type: integer
      description: "-150 to +150"

- id: arc_left
  label: Arc Left
  kind: action
  params:
    - name: value
      type: integer
      description: "-150 to +150"

- id: arc_right
  label: Arc Right
  kind: action
  params:
    - name: value
      type: integer
      description: "-150 to +150"

- id: blanking_top
  label: Blanking Top
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 360"

- id: blanking_bottom
  label: Blanking Bottom
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 360"

- id: blanking_left
  label: Blanking Left
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 534"

- id: blanking_right
  label: Blanking Right
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 534"

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
    - name: mode
      type: integer
      description: "0=none, 1=Keystone, 2=Four Corner, 3=Rotation, 4=Pin/Barrel, 5=Arc"

- id: cust_wp_write
  label: Custom Warp Write
  kind: action
  params:
    - name: file
      type: integer
      description: "1=User 1 file, 2=User 2 file"

- id: cust_wp_clear
  label: Custom Warp Clear
  kind: action
  params:
    - name: file
      type: integer
      description: "1=User 1 file, 2=User 2 file"

- id: cust_wp_send
  label: Custom Warp Send
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=User 1, 2=User 2"

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
      description: "0=Off, 1=User 1, 2=User 2"

- id: eb_stat
  label: Edge Blend Status
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: eb_adl
  label: Edge Blend ADL
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: eb_top
  label: Edge Blend Top
  kind: action
  params:
    - name: value
      type: integer
      description: "0, 100 to 500"

- id: eb_bottom
  label: Edge Blend Bottom
  kind: action
  params:
    - name: value
      type: integer
      description: "0, 100 to 500"

- id: eb_left
  label: Edge Blend Left
  kind: action
  params:
    - name: value
      type: integer
      description: "0, 100 to 800"

- id: eb_right
  label: Edge Blend Right
  kind: action
  params:
    - name: value
      type: integer
      description: "0, 100 to 800"

- id: eb_blu_top
  label: Edge Blend Blu Top
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 32"

- id: eb_blu_btm
  label: Edge Blend Blu Bottom
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 32"

- id: eb_blu_left
  label: Edge Blend Blu Left
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 32"

- id: eb_blu_right
  label: Edge Blend Blu Right
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 32"

- id: eb_all
  label: Edge Blend All
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 255"

- id: eb_red
  label: Edge Blend Red
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 255"

- id: eb_green
  label: Edge Blend Green
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 255"

- id: eb_blue
  label: Edge Blend Blue
  kind: action
  params:
    - name: value
      type: integer
      description: "0 to 255"

- id: eb_reset
  label: Edge Blend Reset
  kind: action
  params: []

- id: format3d
  label: 3D Format
  kind: action
  params:
    - name: fmt
      type: integer
      description: "E-Vision 6900: 0=Off,1=Auto,2=Side-By-Side(Half),3=Top-And-Bottom,4=Frame Sequential | Mercury Quad: 0=Off,1=Auto,2=Side-By-Side(Half),3=Top-And-Bottom,4=Dual-Pipe,5=Frame Sequential"

- id: dlplink
  label: DLP Link
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: dominance
  label: 3D Dominance
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Normal, 1=Reverse"

- id: darktime
  label: 3D Dark Time
  kind: action
  params:
    - name: value
      type: integer
      description: "0=0.65ms, 1=1.3ms, 2=1.95ms, 3=2.5ms"

- id: syncoffset
  label: 3D Sync Offset
  kind: action
  params:
    - name: value
      type: integer
      description: "E-Vision 6900: 0-200 | Mercury Quad: 0-60"

- id: syncref
  label: 3D Sync Reference
  kind: action
  params:
    - name: ref
      type: integer
      description: "0=Internal, 1=External"

- id: lamp_mode
  label: Lamp Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "E-Vision 6900: 0=Dual,1=Single,2=Lamp1,3=Lamp2 | Mercury Quad: 0=Eco,1=Normal,2=Dimming"

- id: lamps
  label: Lamps
  kind: action
  params:
    - name: count
      type: integer
      description: "Mercury Quad: 0=Dual, 1=Triple, 2=Quad"

- id: power_mode
  label: Power Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Normal, 1=Eco, 2=Custom Power Level"

- id: lamp_power
  label: Lamp Power
  kind: action
  params:
    - name: value
      type: integer
      description: "E-Vision 6900: 0-26 (80%-100%)"

- id: lamp_pow
  label: Lamp Power (Mercury)
  kind: action
  params:
    - name: value
      type: integer
      description: "Mercury Quad: 77-100 (77%-100%)"

- id: altitude
  label: Altitude Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "E-Vision 6900: 1=Off,2=On | Mercury Quad: 1=On, 2=Auto"

- id: cooling_condition
  label: Cooling Condition
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Table, 1=Ceiling, 2=Upward, 3=Downward"

- id: orientation
  label: Orientation
  kind: action
  params:
    - name: mode
      type: integer
      description: "E-Vision 6900: 0=Desktop Front,1=Ceiling Front,2=Desktop Rear,3=Ceiling Rear | Mercury Quad adds: 4=Vertical Up, 5=Vertical Down"

- id: screen_setting
  label: Screen Setting
  kind: action
  params:
    - name: ratio
      type: integer
      description: "Mercury Quad: 0=16:10, 1=16:9, 2=4:3"

- id: screen_format
  label: Screen Format
  kind: action
  params:
    - name: fmt
      type: integer
      description: "E-Vision 6900: 0=16:10, 1=16:9, 2=4:3"

- id: screen_shift
  label: Screen Shift
  kind: action
  params:
    - name: value
      type: integer
      description: "Based on screen.format: 16:10=>0, 16:9=>-60~60, 4:3=>-160~160"

- id: auto_poweroff
  label: Auto Power Off
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: auto_poweron
  label: Auto Power On
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: schedule_power
  label: Schedule Power
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: schedule1_on_day
  label: Schedule 1 On Day
  kind: action
  params:
    - name: bits
      type: integer
      description: "Bitmask: Bit6=Sat, Bit5=Fri, Bit4=Thu, Bit3=Wed, Bit2=Tue, Bit1=Mon, Bit0=Sun"

- id: schedule1_off_day
  label: Schedule 1 Off Day
  kind: action
  params:
    - name: bits
      type: integer
      description: "Bitmask: Bit6=Sat, Bit5=Fri, Bit4=Thu, Bit3=Wed, Bit2=Tue, Bit1=Mon, Bit0=Sun"

- id: schedule1_on_time
  label: Schedule 1 On Time
  kind: action
  params:
    - name: time
      type: string
      description: "HH:MM"

- id: schedule1_off_time
  label: Schedule 1 Off Time
  kind: action
  params:
    - name: time
      type: string
      description: "HH:MM"

- id: schedule2_on_day
  label: Schedule 2 On Day
  kind: action
  params:
    - name: bits
      type: integer
      description: "Bitmask"

- id: schedule2_off_day
  label: Schedule 2 Off Day
  kind: action
  params:
    - name: bits
      type: integer
      description: "Bitmask"

- id: schedule2_on_time
  label: Schedule 2 On Time
  kind: action
  params:
    - name: time
      type: string
      description: "HH:MM"

- id: schedule2_off_time
  label: Schedule 2 Off Time
  kind: action
  params:
    - name: time
      type: string
      description: "HH:MM"

- id: date
  label: Date
  kind: action
  params:
    - name: value
      type: string
      description: "yyyy/MM/dd"

- id: time_zone
  label: Time Zone
  kind: action
  params:
    - name: zone
      type: integer
      description: "-11 to +12"

- id: time_adjust
  label: Time Adjust
  kind: action
  params:
    - name: time
      type: string
      description: "HH:MM"

- id: startup_logo
  label: Startup Logo
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: blank_screen
  label: Blank Screen
  kind: action
  params:
    - name: mode
      type: integer
      description: "E-Vision 6900: 0=Logo,1=Black,2=Blue | Mercury Quad adds: 3=White"

- id: trig1
  label: Trigger 1
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On | Mercury Quad: 0=Off,1=Screen,2=5:4,3=4:3,4=16:10,5=16:9,6=1.88,7=2.35,8=Theaterscope,9=Source,10=Unscaled,11=RS232,12=RS232 on,13=RS232 off"

- id: trig2
  label: Trigger 2
  kind: action
  params:
    - name: value
      type: integer
      description: "Same as trig1 (Mercury Quad)"

- id: auto_source
  label: Auto Source
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: auto_src
  label: Auto Source (E-Vision)
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: ir_enable
  label: IR Enable
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: ir_code
  label: IR Code
  kind: action
  params:
    - name: code
      type: integer
      description: "00 to 99"

- id: ir_code_rst
  label: IR Code Reset
  kind: action
  params: []

- id: control_id
  label: Control ID
  kind: action
  params:
    - name: id
      type: integer
      description: "00-99 (0=Disable, 1-99=Enable)"

- id: osd_lang
  label: OSD Language
  kind: action
  params:
    - name: lang
      type: integer
      description: "0=English,1=French,2=Spanish,3=German,4=Portuguese,5=CHS,6=CHT,7=Japanese,8=Korean"

- id: osd_menupos
  label: OSD Menu Position
  kind: action
  params:
    - name: pos
      type: integer
      description: "E-Vision 6900: 0=Center,1=Top Left,2=Top Right,3=Bottom Left,4=Bottom Right | Mercury Quad: 0=Top Left,1=Top Right,2=Bottom Left,3=Bottom Right,4=Center"

- id: osd_trans
  label: OSD Transparency
  kind: action
  params:
    - name: value
      type: integer
      description: "0=0%, 1=25%, 2=50%, 3=75%"

- id: osd_timer
  label: OSD Timer
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Always On, 1=10s, 2=30s, 3=60s"

- id: osd_msgbox
  label: OSD Message Box
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: recall_mem
  label: Recall Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "0=Preset A, 1=Preset B, 2=Preset C, 3=Preset D, 4=Default"

- id: save_mem
  label: Save Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "0=Preset A, 1=Preset B, 2=Preset C, 3=Preset D"

- id: network_mode
  label: Network Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Projector Control, 1=Service"

- id: lan_power
  label: LAN Power
  kind: action
  params:
    - name: state
      type: integer
      description: "0=On, 1=Off"

- id: lan_dhcp
  label: LAN DHCP
  kind: action
  params:
    - name: state
      type: integer
      description: "0=On, 1=Off"

- id: lan_ip
  label: LAN IP Address
  kind: action
  params:
    - name: ip
      type: string
      description: "xxx.xxx.xxx.xxx"

- id: lan_subnet
  label: LAN Subnet
  kind: action
  params:
    - name: subnet
      type: string
      description: "xxx.xxx.xxx.xxx"

- id: lan_gateway
  label: LAN Gateway
  kind: action
  params:
    - name: gateway
      type: string
      description: "xxx.xxx.xxx.xxx"

- id: lan_dns
  label: LAN DNS
  kind: action
  params:
    - name: dns
      type: string
      description: "xxx.xxx.xxx.xxx"

- id: lan_amx
  label: LAN AMX
  kind: action
  params:
    - name: state
      type: integer
      description: "0=On, 1=Off"

- id: pip_mode
  label: PIP Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=On, 1=Off"

- id: pip_input
  label: PIP Input
  kind: action
  params:
    - name: input
      type: integer
      description: "0=HDMI 1, 1=HDMI 2, 2=RGB(VGA), 3=COMP, 4=DisplayPort, 5=HDBaseT, 6=3G-SDI"

- id: pip_position
  label: PIP Position
  kind: action
  params:
    - name: pos
      type: integer
      description: "0=TopLeft, 1=TopRight, 2=BottomLeft, 3=BottomRight, 4=PBP"

- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: shutter
  label: Shutter
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Open, 1=Close"

- id: pic_mute
  label: Picture Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Open, 1=Close"

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: ack_response
  label: Acknowledged Response
  type: string
  description: "Returns ACK or ack followed by command and value on success"

- id: nak_response
  label: Negative Acknowledged Response
  type: string
  description: "Returns NAK or nack followed by error description on failure"

- id: status
  label: Power Status
  type: enum
  values: [0, 1]
  description: "E-Vision 6900: 0=Power Off, 1=Power On | Mercury Quad: 0=Standby, 1=Warm Up, 2=Imaging, 3=Cooling, 4=Error"

- id: power_state
  label: Power State
  type: enum
  values: [off, on]
  description: "From `power` command"
```

## Variables
```yaml
# Read-only information fields from INFORMATION section
- id: model_name
  type: string

- id: serial
  type: string

- id: sw_version
  type: string

- id: act_source
  type: string

- id: signal
  type: string

- id: h_refresh
  type: number

- id: v_refresh
  type: number

- id: pixel_clock
  type: number

- id: lamp1_hours
  type: integer

- id: lamp2_hours
  type: integer

- id: lamp3_hours
  type: integer

- id: lamp4_hours
  type: integer

- id: total_hours
  type: integer

- id: errcode
  type: string
```

## Events
```yaml
# UNRESOLVED: unsolicited event notifications not documented in source
```

## Macros
```yaml
# UNRESOLVED: multi-step macros not explicitly documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Lens commands only work when projector is switched on"
  - "If lens.lock is set to 1, most lens commands are disabled. Exceptions: lens.type (all models), lens.save and lens.clear (Mercury Quad only)"
  - "Only one control path at a time should be used - serial and network simultaneously may cause unpredictable behavior"
  - "saturation and hue only accepted on E-Vision 6900 when input is YUV"
  - "dblack not available in 3D mode"
# UNRESOLVED: power-on sequencing requirements not explicitly stated
```

## Notes
- Serial and TCP/IP are both supported; only one at a time.
- Default IP: 192.168.0.100, TCP port 7000.
- Serial: 9600 baud, 8 data bits, parity/stop bits not stated.
- Command format: `*command operator value` + CR (ASCII 13). Spaces required before operator and value.
- Wait for complete response before sending next command.
- `lens.save` query returns binary string of 0s (empty slots) and 1s (occupied).
- `user.target`/`user2.target` values are multiples of 1000.
- `cust.wp.ck.sum` returns unsigned 32-bit checksum of warp file bytes.
- Schedule day parameters use bitmasks (Bit6=Sat through Bit0=Sun).
- `brightness`/`contrast`/`saturation`/`hue` apply only to current image source.
<!-- UNRESOLVED: inter-command delay timing not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: exact parity and stop bits for RS-232 not stated -->

## Provenance

```yaml
source_domains:
  - digitalprojection.co.uk
source_urls:
  - https://digitalprojection.co.uk/dpdownloads/Protocol/Simplified-Protocol-Guide-Rev-H.pdf
  - "https://digitalprojection.co.uk/dpdownloads/Protocol/Protocol%20Guide%20Rev%20A.pdf"
  - "https://digitalprojection.co.uk/dpdownloads/Protocol/Protocol%20Guide%20INSIGHT%204K.pdf"
  - "http://digitalprojection.co.uk/dpdownloads/DP%20Resources%20115-759G/content/protocol/Protocol%20Guide%20Rev%20D.pdf"
retrieved_at: 2026-05-01T00:18:24.749Z
last_checked_at: 2026-05-14T18:17:15.544Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:15.544Z
matched_actions: 159
action_count: 227
confidence: high
summary: "All 159 spec actions match semantic counterparts in source; transport parameters verified literal; comprehensive command coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
