---
spec_id: admin/digital-projection-evl-10k-series
schema_version: ai4av-public-spec-v1
revision: 2
title: "Digital Projection E-Vision Laser 10K Series Control Spec"
manufacturer: "Digital Projection"
model_family: "E-Vision Laser 10K"
aliases: []
compatible_with:
  manufacturers:
    - "Digital Projection"
  models:
    - "E-Vision Laser 10K"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - digitalprojection.co.uk
source_urls:
  - https://digitalprojection.co.uk/dpdownloads/Protocol/Simplified-Protocol-Guide-Rev-H.pdf
retrieved_at: 2026-04-29T09:13:33.598Z
last_checked_at: 2026-10-07T13:29:18.501Z
generated_at: 2026-10-07T13:29:18.501Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "serial parity/stop bits/flow control and authentication not stated in source"
  - "source prints 76543210 and maps Bit6=Sat through Bit0=Sun; exact wire encoding and Bit7 meaning are not specified\"}]"
  - "source lists standby.power values but leaves every operator column empty; no Set, Get or Execute wire form is established.\""
  - "exact MAC address encoding and validation constraints are not specified in source\""
  - "device is laser; lamp1.hours not in refined source\""
  - "device is laser; lamp2.hours not in refined source\""
  - "parametrable non-discrete params; populate or remove as needed"
  - "unsolicited event behavior is not specified in source"
  - "no explicit macro sequences documented"
  - "power-on sequencing, cooling requirements, high-voltage warnings not detailed in source"
  - "lamp1.hours and lamp2.hours are not in the source for E-Vision Laser 10K; their existing feedback ids are retained without inventing polling commands. Unsupported vga_auto and pic_mute actions were removed under the explicit id-preservation exception."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:29:18.501Z
  matched_actions: 299
  action_count: 299
  confidence: medium
  summary: "All 299 action units match source command tokens with correct ranges and enums; transport values (port 7000, 9600 baud, 8 data bits) in source. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Digital Projection E-Vision Laser 10K Series Control Spec

## Summary
Digital Projection E-Vision Laser 10K professional projector controllable via serial (9,600 bps, 8 data bits) or LAN TCP/IP (default 192.168.0.100, port 7000). Protocol uses ASCII text commands starting with `*` and ending with carriage return. Operators: `= <value>` (set), `?` (get), `+`/`-` (inc/dec where indicated in the source tables), or no operator (execute where documented). ACK/NAK acknowledgement responses. Authentication, serial parity, stop bits and flow control are UNRESOLVED because the source does not specify them.

<!-- UNRESOLVED: serial parity/stop bits/flow control and authentication not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7000  # TCP port; default IP 192.168.0.100
serial:
  baud_rate: 9600
  data_bits: 8
  parity: UNRESOLVED  # parity not stated in source
  stop_bits: UNRESOLVED  # stop bits not stated in source
  flow_control: UNRESOLVED  # flow control not stated in source
auth:
  type: UNRESOLVED  # authentication requirements not stated in source
```

## Traits
```yaml
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
- id: input
  label: Input Select
  kind: action
  command: "*input = {source}"
  params:
    - name: source
      type: integer
      description: 0=DisplayPort, 1=HDMI1, 2=HDMI2, 3=HDBaseT, 4=3G-SDI, 5=HDMI3, 6=HDMI4

- id: test_pattern
  label: Test Pattern
  kind: action
  command: "*test.pattern = {pattern}"
  params:
    - name: pattern
      type: integer
      description: 0=Off, 1=White, 2=Black, 3=Red, 4=Green, 5=Blue, 6=Cyan, 7=Yellow, 8=Magenta

- id: zoom_in
  label: Zoom In
  kind: execute
  command: "*zoom.in"
  params: []
- id: zoom_out
  label: Zoom Out
  kind: execute
  command: "*zoom.out"
  params: []
- id: focus_near
  label: Focus Near
  kind: execute
  command: "*focus.near"
  params: []
- id: focus_far
  label: Focus Far
  kind: execute
  command: "*focus.far"
  params: []
- id: lens_up
  label: Lens Up
  kind: execute
  command: "*lens.up"
  params: []
- id: lens_down
  label: Lens Down
  kind: execute
  command: "*lens.down"
  params: []
- id: lens_left
  label: Lens Left
  kind: execute
  command: "*lens.left"
  params: []
- id: lens_right
  label: Lens Right
  kind: execute
  command: "*lens.right"
  params: []
- id: lens_center
  label: Lens Center
  kind: execute
  command: "*lens.center"
  params: []
- id: lens_load
  label: Lens Load
  kind: action
  command: "*lens.load = {slot}"
  params:
    - name: slot
      type: integer
      description: Memory slot 1-10
- id: lens_save
  label: Lens Save
  kind: action
  command: "*lens.save = {slot}"
  params:
    - name: slot
      type: integer
      description: Memory slot 1-10
- id: lens_clear
  label: Lens Clear
  kind: action
  command: "*lens.clear = {slot}"
  params:
    - name: slot
      type: integer
      description: Memory slot 1-10
- id: lens_type
  label: Lens Type
  kind: action
  command: "*lens.type = {type}"
  params:
    - name: type
      type: integer
      description: 0=non-UST Lens, 1=UST Lens
- id: lens_lock
  label: Lens Lock
  kind: action
  command: "*lens.lock = {lock}"
  params:
    - name: lock
      type: integer
      description: 0=Off, 1=On

- id: pic_mode
  label: Picture Mode
  kind: action
  command: "*pic.mode = {mode}"
  params:
    - name: mode
      type: integer
      description: 0=High Bright, 1=Presentation, 2=Video
- id: db_on
  label: Dynamic Black
  kind: action
  command: "*db.on = {value}"
  params:
    - name: value
      type: integer
      description: 0=Off, 1=On
- id: gamma
  label: Gamma
  kind: action
  command: "*gamma = {value}"
  params:
    - name: value
      type: integer
      description: 0=1.0, 1=1.8, 2=2.0, 3=2.2, 4=2.35, 5=2.5, 6=S-curve, 7=DICOM
- id: brightness
  label: Brightness
  kind: action
  command: "*brightness = {value}"
  params:
    - name: value
      type: integer
      description: 0-200
- id: contrast
  label: Contrast
  kind: action
  command: "*contrast = {value}"
  params:
    - name: value
      type: integer
      description: 0-200
- id: saturation
  label: Saturation
  kind: action
  command: "*saturation = {value}"
  params:
    - name: value
      type: integer
      description: 0-200
- id: hue
  label: Hue
  kind: action
  command: "*hue = {value}"
  params:
    - name: value
      type: integer
      description: 0-200
- id: sharpness
  label: Sharpness
  kind: action
  command: "*sharpness = {value}"
  params:
    - name: value
      type: integer
      description: 0-20

- id: nr_level
  label: Noise Reduction Level
  kind: action
  command: "*nr.level = {value}"
  params:
    - name: value
      type: integer
      description: 0-3
- id: nr_temporal
  label: Temporal NR
  kind: action
  command: "*nr.temporal = {value}"
  params:
    - name: value
      type: integer
      description: 0-3
- id: nr_block
  label: Block NR
  kind: action
  command: "*nr.block = {value}"
  params:
    - name: value
      type: integer
      description: 0-3
- id: nr_mosquito
  label: Mosquito NR
  kind: action
  command: "*nr.mosquito = {value}"
  params:
    - name: value
      type: integer
      description: 0-3
- id: nr_hori
  label: Horizontal NR
  kind: action
  command: "*nr.hori = {value}"
  params:
    - name: value
      type: integer
      description: 0-3
- id: nr_vert
  label: Vertical NR
  kind: action
  command: "*nr.vert = {value}"
  params:
    - name: value
      type: integer
      description: 0-3
- id: nr_reset
  label: Noise Reduction Reset
  kind: action
  command: "*nr.reset"
  payload: " = {value}"
  description: "Source documents Set and Get with integer values 0-3; execute without an operator is not documented. Append payload to command for Set."
  params:
    - name: value
      type: integer
      description: 0-3
- id: h_position
  label: Horizontal Position
  kind: action
  command: "*h.position = {value}"
  params:
    - name: value
      type: integer
      description: 0-200
- id: v_position
  label: Vertical Position
  kind: action
  command: "*v.position = {value}"
  params:
    - name: value
      type: integer
      description: 0-200
- id: vga_phase
  label: VGA Phase
  kind: action
  command: "*vga.phase = {value}"
  params:
    - name: value
      type: integer
      description: 0-31
- id: tracking
  label: Tracking
  kind: action
  command: "*tracking = {value}"
  params:
    - name: value
      type: integer
      description: 0-200
- id: sync_level
  label: Sync Level
  kind: action
  command: "*sync.level = {value}"
  params:
    - name: value
      type: integer
      description: 0-200
- id: freeze
  label: Freeze
  kind: action
  command: "*freeze = {value}"
  params:
    - name: value
      type: integer
      description: 0=Off, 1=On
- id: resync
  label: Resync
  kind: execute
  command: "*resync"
  params: []

- id: color_space
  label: Color Space
  kind: action
  command: "*color.space = {value}"
  params:
    - name: value
      type: integer
      description: 0=Auto, 1=YPbPr, 2=YCbCr, 3=RGB-PC, 4=RGB-Video
- id: color_temp
  label: Color Temperature
  kind: action
  command: "*color.temp = {value}"
  params:
    - name: value
      type: integer
      description: 0=3200K, 1=5400K, 2=6500K, 3=7500K, 4=9300K, 5=Native
- id: color_mode
  label: Color Mode
  kind: action
  command: "*color.mode = {value}"
  params:
    - name: value
      type: integer
      description: 0=ColorMax, 1=Manual Color Matching, 2=Color Temperature, 3=Gains and Lifts
- id: color_max
  label: ColorMax
  kind: action
  command: "*color.max = {value}"
  params:
    - name: value
      type: integer
      description: 0=HDTV (REC709), 1=Peak, 2=User 1, 3=User 2

- id: red_lift
  label: Red Lift
  kind: action
  command: "*red.lift = {value}"
  params:
    - name: value
      type: integer
      description: 0-200
- id: green_lift
  label: Green Lift
  kind: action
  command: "*green.lift = {value}"
  params:
    - name: value
      type: integer
      description: 0-200
- id: blue_lift
  label: Blue Lift
  kind: action
  command: "*blue.lift = {value}"
  params:
    - name: value
      type: integer
      description: 0-200
- id: red_gain
  label: Red Gain
  kind: action
  command: "*red.gain = {value}"
  params:
    - name: value
      type: integer
      description: 0-200
- id: green_gain
  label: Green Gain
  kind: action
  command: "*green.gain = {value}"
  params:
    - name: value
      type: integer
      description: 0-200
- id: blue_gain
  label: Blue Gain
  kind: action
  command: "*blue.gain = {value}"
  params:
    - name: value
      type: integer
      description: 0-200
- id: gainlift_reset
  label: Gain/Lift Reset
  kind: execute
  command: "*gainlift.reset"
  params: []
- id: auto_test_ptrn
  label: Auto Test Pattern
  kind: action
  command: "*auto.test.ptrn = {value}"
  params:
    - name: value
      type: integer
      description: 0=Off, 1=On

- id: user_std_rx
  label: User Standard Rx
  kind: action
  command: "*user.std.rx = {value}"
  params: [{name: value, type: integer, description: 550-750}]
- id: user_std_ry
  label: User Standard Ry
  kind: action
  command: "*user.std.ry = {value}"
  params: [{name: value, type: integer, description: 250-450}]
- id: user_std_gx
  label: User Standard Gx
  kind: action
  command: "*user.std.gx = {value}"
  params: [{name: value, type: integer, description: 200-400}]
- id: user_std_gy
  label: User Standard Gy
  kind: action
  command: "*user.std.gy = {value}"
  params: [{name: value, type: integer, description: 400-750}]
- id: user_std_bx
  label: User Standard Bx
  kind: action
  command: "*user.std.bx = {value}"
  params: [{name: value, type: integer, description: 50-250}]
- id: user_std_by
  label: User Standard By
  kind: action
  command: "*user.std.by = {value}"
  params: [{name: value, type: integer, description: 0-120}]
- id: user_std_wx
  label: User Standard Wx
  kind: action
  command: "*user.std.wx = {value}"
  params: [{name: value, type: integer, description: 200-400}]
- id: user_std_wy
  label: User Standard Wy
  kind: action
  command: "*user.std.wy = {value}"
  params: [{name: value, type: integer, description: 250-450}]
- id: user_std_reset
  label: User Standard Reset
  kind: execute
  command: "*user.std.reset"
  params: []

- id: user_target_rx
  label: User 1 Target Rx
  kind: action
  command: "*user.target.rx = {value}"
  params: [{name: value, type: integer, description: 550-750}]
- id: user_target_ry
  label: User 1 Target Ry
  kind: action
  command: "*user.target.ry = {value}"
  params: [{name: value, type: integer, description: 250-450}]
- id: user_target_gx
  label: User 1 Target Gx
  kind: action
  command: "*user.target.gx = {value}"
  params: [{name: value, type: integer, description: 200-400}]
- id: user_target_gy
  label: User 1 Target Gy
  kind: action
  command: "*user.target.gy = {value}"
  params: [{name: value, type: integer, description: 400-750}]
- id: user_target_bx
  label: User 1 Target Bx
  kind: action
  command: "*user.target.bx = {value}"
  params: [{name: value, type: integer, description: 50-250}]
- id: user_target_by
  label: User 1 Target By
  kind: action
  command: "*user.target.by = {value}"
  params: [{name: value, type: integer, description: 0-120}]
- id: user_target_wx
  label: User 1 Target Wx
  kind: action
  command: "*user.target.wx = {value}"
  params: [{name: value, type: integer, description: 200-400}]
- id: user_target_wy
  label: User 1 Target Wy
  kind: action
  command: "*user.target.wy = {value}"
  params: [{name: value, type: integer, description: 250-450}]
- id: user_target_cx
  label: User 1 Target Cx
  kind: action
  command: "*user.target.cx = {value}"
  params: [{name: value, type: integer, description: 125-325}]
- id: user_target_cy
  label: User 1 Target Cy
  kind: action
  command: "*user.target.cy = {value}"
  params: [{name: value, type: integer, description: 225-425}]
- id: user_target_mx
  label: User 1 Target Mx
  kind: action
  command: "*user.target.mx = {value}"
  params: [{name: value, type: integer, description: 200-400}]
- id: user_target_my
  label: User 1 Target My
  kind: action
  command: "*user.target.my = {value}"
  params: [{name: value, type: integer, description: 50-250}]
- id: user_target_yx
  label: User 1 Target Yx
  kind: action
  command: "*user.target.yx = {value}"
  params: [{name: value, type: integer, description: 300-500}]
- id: user_target_yy
  label: User 1 Target Yy
  kind: action
  command: "*user.target.yy = {value}"
  params: [{name: value, type: integer, description: 400-600}]
- id: user_target_reset
  label: User 1 Target Reset
  kind: execute
  command: "*user.target.reset"
  params: []

- id: user2_target_rx
  label: User 2 Target Rx
  kind: action
  command: "*user2.target.rx = {value}"
  params: [{name: value, type: integer, description: 550-750}]
- id: user2_target_ry
  label: User 2 Target Ry
  kind: action
  command: "*user2.target.ry = {value}"
  params: [{name: value, type: integer, description: 250-450}]
- id: user2_target_gx
  label: User 2 Target Gx
  kind: action
  command: "*user2.target.gx = {value}"
  params: [{name: value, type: integer, description: 200-400}]
- id: user2_target_gy
  label: User 2 Target Gy
  kind: action
  command: "*user2.target.gy = {value}"
  params: [{name: value, type: integer, description: 400-750}]
- id: user2_target_bx
  label: User 2 Target Bx
  kind: action
  command: "*user2.target.bx = {value}"
  params: [{name: value, type: integer, description: 50-250}]
- id: user2_target_by
  label: User 2 Target By
  kind: action
  command: "*user2.target.by = {value}"
  params: [{name: value, type: integer, description: 0-120}]
- id: user2_target_wx
  label: User 2 Target Wx
  kind: action
  command: "*user2.target.wx = {value}"
  params: [{name: value, type: integer, description: 200-400}]
- id: user2_target_wy
  label: User 2 Target Wy
  kind: action
  command: "*user2.target.wy = {value}"
  params: [{name: value, type: integer, description: 250-450}]
- id: user2_target_cx
  label: User 2 Target Cx
  kind: action
  command: "*user2.target.cx = {value}"
  params: [{name: value, type: integer, description: 125-325}]
- id: user2_target_cy
  label: User 2 Target Cy
  kind: action
  command: "*user2.target.cy = {value}"
  params: [{name: value, type: integer, description: 225-425}]
- id: user2_target_mx
  label: User 2 Target Mx
  kind: action
  command: "*user2.target.mx = {value}"
  params: [{name: value, type: integer, description: 200-400}]
- id: user2_target_my
  label: User 2 Target My
  kind: action
  command: "*user2.target.my = {value}"
  params: [{name: value, type: integer, description: 50-250}]
- id: user2_target_yx
  label: User 2 Target Yx
  kind: action
  command: "*user2.target.yx = {value}"
  params: [{name: value, type: integer, description: 300-500}]
- id: user2_target_yy
  label: User 2 Target Yy
  kind: action
  command: "*user2.target.yy = {value}"
  params: [{name: value, type: integer, description: 400-600}]
- id: user2_target_reset
  label: User 2 Target Reset
  kind: execute
  command: "*user2.target.reset"
  params: []
- id: user_p7_rst
  label: User P7 Reset
  kind: execute
  command: "*user.p7.rst"
  params: []

- id: hsg_hue_r
  label: HSG Hue Red
  kind: action
  command: "*hsg.hue.r = {value}"
  params: [{name: value, type: integer, description: 0-200}]
- id: hsg_hue_g
  label: HSG Hue Green
  kind: action
  command: "*hsg.hue.g = {value}"
  params: [{name: value, type: integer, description: 0-200}]
- id: hsg_hue_b
  label: HSG Hue Blue
  kind: action
  command: "*hsg.hue.b = {value}"
  params: [{name: value, type: integer, description: 0-200}]
- id: hsg_hue_c
  label: HSG Hue Cyan
  kind: action
  command: "*hsg.hue.c = {value}"
  params: [{name: value, type: integer, description: 0-200}]
- id: hsg_hue_m
  label: HSG Hue Magenta
  kind: action
  command: "*hsg.hue.m = {value}"
  params: [{name: value, type: integer, description: 0-200}]
- id: hsg_hue_y
  label: HSG Hue Yellow
  kind: action
  command: "*hsg.hue.y = {value}"
  params: [{name: value, type: integer, description: 0-200}]
- id: hsg_sat_r
  label: HSG Saturation Red
  kind: action
  command: "*hsg.sat.r = {value}"
  params: [{name: value, type: integer, description: 0-100}]
- id: hsg_sat_g
  label: HSG Saturation Green
  kind: action
  command: "*hsg.sat.g = {value}"
  params: [{name: value, type: integer, description: 0-100}]
- id: hsg_sat_b
  label: HSG Saturation Blue
  kind: action
  command: "*hsg.sat.b = {value}"
  params: [{name: value, type: integer, description: 0-100}]
- id: hsg_sat_c
  label: HSG Saturation Cyan
  kind: action
  command: "*hsg.sat.c = {value}"
  params: [{name: value, type: integer, description: 0-100}]
- id: hsg_sat_m
  label: HSG Saturation Magenta
  kind: action
  command: "*hsg.sat.m = {value}"
  params: [{name: value, type: integer, description: 0-100}]
- id: hsg_sat_y
  label: HSG Saturation Yellow
  kind: action
  command: "*hsg.sat.y = {value}"
  params: [{name: value, type: integer, description: 0-100}]
- id: hsg_gain_r
  label: HSG Gain Red
  kind: action
  command: "*hsg.gain.r = {value}"
  params: [{name: value, type: integer, description: 0-100}]
- id: hsg_gain_g
  label: HSG Gain Green
  kind: action
  command: "*hsg.gain.g = {value}"
  params: [{name: value, type: integer, description: 0-100}]
- id: hsg_gain_b
  label: HSG Gain Blue
  kind: action
  command: "*hsg.gain.b = {value}"
  params: [{name: value, type: integer, description: 0-100}]
- id: hsg_gain_c
  label: HSG Gain Cyan
  kind: action
  command: "*hsg.gain.c = {value}"
  params: [{name: value, type: integer, description: 0-100}]
- id: hsg_gain_m
  label: HSG Gain Magenta
  kind: action
  command: "*hsg.gain.m = {value}"
  params: [{name: value, type: integer, description: 0-100}]
- id: hsg_gain_y
  label: HSG Gain Yellow
  kind: action
  command: "*hsg.gain.y = {value}"
  params: [{name: value, type: integer, description: 0-100}]
- id: hsg_white_r
  label: HSG White Red
  kind: action
  command: "*hsg.white.r = {value}"
  params: [{name: value, type: integer, description: 0-100}]
- id: hsg_white_g
  label: HSG White Green
  kind: action
  command: "*hsg.white.g = {value}"
  params: [{name: value, type: integer, description: 0-100}]
- id: hsg_white_b
  label: HSG White Blue
  kind: action
  command: "*hsg.white.b = {value}"
  params: [{name: value, type: integer, description: 0-100}]
- id: hsg_reset
  label: HSG Reset
  kind: execute
  command: "*hsg.reset"
  params: []

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "*aspect.ratio = {ratio}"
  params:
    - name: ratio
      type: integer
      description: 0=5:4, 1=4:3, 2=16:10, 3=16:9, 4=1.88, 5=2.35, 6=Theaterscope, 7=Source, 8=Unscaled
- id: digi_zoom
  label: Digital Zoom
  kind: action
  command: "*digi.zoom = {value}"
  params: [{name: value, type: integer, description: 0-100}]
- id: digi_pan
  label: Digital Pan
  kind: action
  command: "*digi.pan = {value}"
  params: [{name: value, type: integer, description: -320 to +320}]
- id: digi_pan_bound
  label: Digital Pan Bounds
  kind: query
  command: "*digi.pan.bound ?"
  params: []
- id: digi_scan
  label: Digital Scan
  kind: action
  command: "*digi.scan = {value}"
  params: [{name: value, type: integer, description: -200 to +200}]
- id: digi_scan_bound
  label: Digital Scan Bounds
  kind: query
  command: "*digi.scan.bound ?"
  params: []
- id: digi_zoom_rst
  label: Digital Zoom Reset
  kind: execute
  command: "*digi.zoom.rst"
  params: []
- id: overscan
  label: Overscan
  kind: action
  command: "*overscan = {value}"
  params: [{name: value, type: integer, description: "0=Off, 1=Crop, 2=Zoom"}]
- id: h_keystone
  label: Horizontal Keystone
  kind: action
  command: "*h.keystone = {value}"
  params: [{name: value, type: integer, description: -600 to +600}]
- id: v_keystone
  label: Vertical Keystone
  kind: action
  command: "*v.keystone = {value}"
  params: [{name: value, type: integer, description: -400 to +400}]
- id: keystone_reset
  label: Keystone Reset
  kind: execute
  command: "*keystone.reset"
  params: []
- id: rotation
  label: Rotation
  kind: action
  command: "*rotation = {value}"
  params: [{name: value, type: integer, description: -100 to +100}]
- id: rotation_reset
  label: Rotation Reset
  kind: execute
  command: "*rotation.reset"
  params: []
- id: h_pin_barrel
  label: Horizontal Pin/Barrel
  kind: action
  command: "*h.pin.barrel = {value}"
  params: [{name: value, type: integer, description: -150 to +300}]
- id: v_pin_barrel
  label: Vertical Pin/Barrel
  kind: action
  command: "*v.pin.barrel = {value}"
  params: [{name: value, type: integer, description: -150 to +300}]
- id: pin_barrel_reset
  label: Pin/Barrel Reset
  kind: execute
  command: "*pin.barrel.reset"
  params: []
- id: four_corner_ulx
  label: 4-Corner UL X
  kind: action
  command: "*4corner.ulx = {value}"
  params: [{name: value, type: integer, description: -192 to +192}]
- id: four_corner_uly
  label: 4-Corner UL Y
  kind: action
  command: "*4corner.uly = {value}"
  params: [{name: value, type: integer, description: -120 to +120}]
- id: four_corner_urx
  label: 4-Corner UR X
  kind: action
  command: "*4corner.urx = {value}"
  params: [{name: value, type: integer, description: -192 to +192}]
- id: four_corner_ury
  label: 4-Corner UR Y
  kind: action
  command: "*4corner.ury = {value}"
  params: [{name: value, type: integer, description: -120 to +120}]
- id: four_corner_llx
  label: 4-Corner LL X
  kind: action
  command: "*4corner.llx = {value}"
  params: [{name: value, type: integer, description: -192 to +192}]
- id: four_corner_lly
  label: 4-Corner LL Y
  kind: action
  command: "*4corner.lly = {value}"
  params: [{name: value, type: integer, description: -120 to +120}]
- id: four_corner_lrx
  label: 4-Corner LR X
  kind: action
  command: "*4corner.lrx = {value}"
  params: [{name: value, type: integer, description: -192 to +192}]
- id: four_corner_lry
  label: 4-Corner LR Y
  kind: action
  command: "*4corner.lry = {value}"
  params: [{name: value, type: integer, description: -120 to +120}]
- id: four_corner_reset
  label: 4-Corner Reset
  kind: execute
  command: "*4corner.reset"
  params: []
- id: arc_top
  label: Arc Top
  kind: action
  command: "*arc.top = {value}"
  params: [{name: value, type: integer, description: -150 to +150}]
- id: arc_bottom
  label: Arc Bottom
  kind: action
  command: "*arc.bottom = {value}"
  params: [{name: value, type: integer, description: -150 to +150}]
- id: arc_left
  label: Arc Left
  kind: action
  command: "*arc.left = {value}"
  params: [{name: value, type: integer, description: -150 to +150}]
- id: arc_right
  label: Arc Right
  kind: action
  command: "*arc.right = {value}"
  params: [{name: value, type: integer, description: -150 to +150}]
- id: arc_t
  label: Arc T (top curvature)
  kind: action
  command: "*arc.t = {value}"
  params: [{name: value, type: integer, description: -192 to +192}]
- id: arc_b
  label: Arc B (bottom curvature)
  kind: action
  command: "*arc.b = {value}"
  params: [{name: value, type: integer, description: -120 to +120}]
- id: arc_l
  label: Arc L (left curvature)
  kind: action
  command: "*arc.l = {value}"
  params: [{name: value, type: integer, description: -192 to +192}]
- id: arc_r
  label: Arc R (right curvature)
  kind: action
  command: "*arc.r = {value}"
  params: [{name: value, type: integer, description: -120 to +120}]
- id: arc_reset
  label: Arc Reset
  kind: execute
  command: "*arc.reset"
  params: []
- id: blanking_top
  label: Blanking Top
  kind: action
  command: "*blanking.top = {value}"
  params: [{name: value, type: integer, description: 0-360}]
- id: blanking_bottom
  label: Blanking Bottom
  kind: action
  command: "*blanking.bottom = {value}"
  params: [{name: value, type: integer, description: 0-360}]
- id: blanking_left
  label: Blanking Left
  kind: action
  command: "*blanking.left = {value}"
  params: [{name: value, type: integer, description: 0-534}]
- id: blanking_right
  label: Blanking Right
  kind: action
  command: "*blanking.right = {value}"
  params: [{name: value, type: integer, description: 0-534}]
- id: blanking_reset
  label: Blanking Reset
  kind: execute
  command: "*blanking.reset"
  params: []
- id: warp_reset
  label: Warp Reset
  kind: execute
  command: "*warp.reset"
  params: []
- id: active_warp
  label: Active Warp
  kind: action
  command: "*active.warp = {value}"
  params: [{name: value, type: integer, description: "0=none, 1=Keystone, 2=Four Corner, 3=Rotation, 4=Pin/Barrel, 5=Arc"}]
- id: cust_wp_write
  label: Custom Warp Write
  kind: action
  command: "*cust.wp.write = {value}"
  params: [{name: value, type: integer, description: "1=User 1 file, 2=User 2 file"}]
- id: cust_wp_clear
  label: Custom Warp Clear
  kind: action
  command: "*cust.wp.clear = {value}"
  params: [{name: value, type: integer, description: "1=User 1 file, 2=User 2 file"}]
- id: cust_wp_send
  label: Custom Warp Send
  kind: action
  command: "*cust.wp.send = {value}"
  params: [{name: value, type: integer, description: "0=off, 1=User 1 file, 2=User 2 file"}]
- id: cust_wp_ck_sum
  label: Custom Warp Checksum
  kind: query
  command: "*cust.wp.ck.sum ?"
  params: []
- id: warp_cust
  label: Warp Custom
  kind: action
  command: "*warp.cust = {value}"
  params: [{name: value, type: integer, description: "0=Off, 1=User 1, 2=User 2"}]

- id: eb_stat
  label: Edge Blend Status
  kind: action
  command: "*eb.stat = {value}"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: eb_adl
  label: Edge Blend Auto Level
  kind: action
  command: "*eb.adl = {value}"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: eb_top
  label: Edge Blend Top
  kind: action
  command: "*eb.top = {value}"
  params: [{name: value, type: integer, description: "0, 100-500"}]
- id: eb_bottom
  label: Edge Blend Bottom
  kind: action
  command: "*eb.bottom = {value}"
  params: [{name: value, type: integer, description: "0, 100-500"}]
- id: eb_left
  label: Edge Blend Left
  kind: action
  command: "*eb.left = {value}"
  params: [{name: value, type: integer, description: "0, 100-500"}]
- id: eb_right
  label: Edge Blend Right
  kind: action
  command: "*eb.right = {value}"
  params: [{name: value, type: integer, description: "0, 100-500"}]
- id: eb_blu_top
  label: Edge Blend Blue Top
  kind: action
  command: "*eb.blu.top = {value}"
  params: [{name: value, type: integer, description: 0-32}]
- id: eb_blu_btm
  label: Edge Blend Blue Bottom
  kind: action
  command: "*eb.blu.btm = {value}"
  params: [{name: value, type: integer, description: 0-32}]
- id: eb_blu_left
  label: Edge Blend Blue Left
  kind: action
  command: "*eb.blu.left = {value}"
  params: [{name: value, type: integer, description: 0-32}]
- id: eb_blu_right
  label: Edge Blend Blue Right
  kind: action
  command: "*eb.blu.right = {value}"
  params: [{name: value, type: integer, description: 0-32}]
- id: eb_all
  label: Edge Blend All (inc/dec)
  kind: action
  command: "*eb.all {op} {value}"
  params:
    - name: op
      type: string
      description: '"+" or "-"'
    - name: value
      type: integer
      description: 0-32
- id: eb_red
  label: Edge Blend Red
  kind: action
  command: "*eb.red = {value}"
  params: [{name: value, type: integer, description: 0-32}]
- id: eb_green
  label: Edge Blend Green
  kind: action
  command: "*eb.green = {value}"
  params: [{name: value, type: integer, description: 0-32}]
- id: eb_blue
  label: Edge Blend Blue
  kind: action
  command: "*eb.blue = {value}"
  params: [{name: value, type: integer, description: 0-32}]
- id: eb_reset
  label: Edge Blend Reset
  kind: execute
  command: "*eb.reset"
  params: []

- id: threed_format
  label: 3D Format
  kind: action
  command: "*3d.format = {value}"
  params: [{name: value, type: integer, description: "0=Off, 1=Auto, 2=Side-By-Side, 3=Top-And-Bottom, 4=Dual-Pipe, 5=Frame Sequential"}]
- id: threed_dlplink
  label: 3D DLP Link
  kind: action
  command: "*3d.dlplink = {value}"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: threed_dominance
  label: 3D Dominance
  kind: action
  command: "*3d.dominance = {value}"
  params: [{name: value, type: integer, description: "0=Normal, 1=Reverse"}]
- id: threed_darktime
  label: 3D Dark Time
  kind: action
  command: "*3d.darktime = {value}"
  params: [{name: value, type: integer, description: "0=0.65ms, 1=1.3ms, 2=1.95ms"}]
- id: threed_syncoffset
  label: 3D Sync Offset
  kind: action
  command: "*3d.syncoffset = {value}"
  params: [{name: value, type: integer, description: 0-60}]
- id: threed_syncref
  label: 3D Sync Reference
  kind: query
  command: "*3d.syncref ?"
  params: []

- id: laser_mode
  label: Laser Mode
  kind: action
  command: "*laser.mode = {value}"
  params: [{name: value, type: integer, description: "0=Eco, 1=Normal, 2=Custom"}]
- id: laser_power
  label: Laser Power
  kind: action
  command: "*laser.power = {value}"
  params: [{name: value, type: integer, description: 20-100 (only when laser.mode=2)}]
- id: laser_hours
  label: Laser Hours
  kind: query
  command: "*laser.hours ?"
  params: []

- id: altitude
  label: Altitude
  kind: action
  command: "*altitude = {value}"
  params: [{name: value, type: integer, description: "0=On, 1=Auto, 2=Quiet"}]
- id: cooling_condition
  label: Cooling Condition
  kind: action
  command: "*cooling.condition = {value}"
  params: [{name: value, type: integer, description: "0=Table, 1=Ceiling, 2=Freetilt, 3=Auto"}]
- id: orientation
  label: Orientation
  kind: action
  command: "*orientation = {value}"
  params: [{name: value, type: integer, description: "0=Desktop Front, 1=Ceiling Front, 2=Desktop Rear, 3=Ceiling Rear, 4=Auto-front"}]
- id: screen_setting
  label: Screen Setting
  kind: action
  command: "*screen.setting = {value}"
  params: [{name: value, type: integer, description: "0=16:10, 1=16:9, 2=4:3"}]
- id: auto_poweroff
  label: Auto Power Off
  kind: action
  command: "*auto.poweroff = {value}"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: auto_poweron
  label: Auto Power On
  kind: action
  command: "*auto.poweron = {value}"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: schedule_power
  label: Schedule Power
  kind: action
  command: "*schedule.power = {value}"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: schedule1_on_day
  label: Schedule 1 On Day
  kind: action
  command: "*schedule1.on.day = {value}"
  params: [{name: value, type: string, description: "UNRESOLVED: source prints 76543210 and maps Bit6=Sat through Bit0=Sun; exact wire encoding and Bit7 meaning are not specified"}]
- id: schedule1_off_day
  label: Schedule 1 Off Day
  kind: action
  command: "*schedule1.off.day = {value}"
  params: [{name: value, type: string, description: "UNRESOLVED: source prints 76543210 and maps Bit6=Sat through Bit0=Sun; exact wire encoding and Bit7 meaning are not specified"}]
- id: schedule1_on_time
  label: Schedule 1 On Time
  kind: action
  command: "*schedule1.on.time = {value}"
  params: [{name: value, type: string, description: "HH:MM"}]
- id: schedule1_off_time
  label: Schedule 1 Off Time
  kind: action
  command: "*schedule1.off.time = {value}"
  params: [{name: value, type: string, description: "HH:MM"}]
- id: schedule2_on_day
  label: Schedule 2 On Day
  kind: action
  command: "*schedule2.on.day = {value}"
  params: [{name: value, type: string, description: "UNRESOLVED: source prints 76543210 and maps Bit6=Sat through Bit0=Sun; exact wire encoding and Bit7 meaning are not specified"}]
- id: schedule2_off_day
  label: Schedule 2 Off Day
  kind: action
  command: "*schedule2.off.day = {value}"
  params: [{name: value, type: string, description: "UNRESOLVED: source prints 76543210 and maps Bit6=Sat through Bit0=Sun; exact wire encoding and Bit7 meaning are not specified"}]
- id: schedule2_on_time
  label: Schedule 2 On Time
  kind: action
  command: "*schedule2.on.time = {value}"
  params: [{name: value, type: string, description: "HH:MM"}]
- id: schedule2_off_time
  label: Schedule 2 Off Time
  kind: action
  command: "*schedule2.off.time = {value}"
  params: [{name: value, type: string, description: "HH:MM"}]
- id: date
  label: Date
  kind: action
  command: "*date = {value}"
  params: [{name: value, type: string, description: "yyyy/MM/dd"}]
- id: time_zone
  label: Time Zone
  kind: action
  command: "*time.zone = {value}"
  params: [{name: value, type: integer, description: -11 to +12}]
- id: time_adjust
  label: Time Adjust
  kind: action
  command: "*time.adjust = {value}"
  params: [{name: value, type: string, description: "HH:MM"}]
- id: startup_logo
  label: Startup Logo
  kind: action
  command: "*startup.logo = {value}"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: blank_screen
  label: Blank Screen
  kind: action
  command: "*blank.screen = {value}"
  params: [{name: value, type: integer, description: "0=Logo, 1=Black, 2=Blue, 3=White"}]
- id: trig_1
  label: Trigger 1
  kind: action
  command: "*trig.1 = {value}"
  params: [{name: value, type: integer, description: "0=Off,1=Screen,2=5:4,3=4:3,4=16:10,5=16:9,6=1.88,7=2.35,8=Theaterscope,9=Source,10=Unscaled,11=RS232,12=RS232on,13=RS232off"}]
- id: trig_2
  label: Trigger 2
  kind: action
  command: "*trig.2 = {value}"
  params: [{name: value, type: integer, description: "0=Off,1=Screen,2=5:4,3=4:3,4=16:10,5=16:9,6=1.88,7=2.35,8=Theaterscope,9=Source,10=Unscaled,11=RS232,12=RS232on,13=RS232off"}]
- id: auto_source
  label: Auto Source
  kind: action
  command: "*auto.source = {value}"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: ir_enable
  label: IR Enable
  kind: action
  command: "*ir.enable = {value}"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: ir_code
  label: IR Code
  kind: action
  command: "*ir.code = {value}"
  params: [{name: value, type: integer, description: "00-99"}]
- id: ir_code_rst
  label: IR Code Reset
  kind: execute
  command: "*ir.code.rst"
  params: []
- id: osd_lang
  label: OSD Language
  kind: action
  command: "*osd.lang = {value}"
  params: [{name: value, type: integer, description: "0=English,1=French,2=German,3=Spanish,4=Simplified Chinese"}]
- id: osd_menupos
  label: OSD Menu Position
  kind: action
  command: "*osd.menupos = {value}"
  params: [{name: value, type: integer, description: "0=TopLeft,1=TopRight,2=BottomLeft,3=BottomRight,4=Center"}]
- id: osd_trans
  label: OSD Transparency
  kind: action
  command: "*osd.trans = {value}"
  params: [{name: value, type: integer, description: "0=0%,1=25%,2=50%,3=75%"}]
- id: osd_timer
  label: OSD Timer
  kind: action
  command: "*osd.timer = {value}"
  params: [{name: value, type: integer, description: "0=AlwaysOn,1=10s,2=30s,3=60s"}]
- id: osd_msgbox
  label: OSD Message Box
  kind: action
  command: "*osd.msgbox = {value}"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: recall_mem
  label: Recall Preset
  kind: action
  command: "*recall.mem = {value}"
  params: [{name: value, type: integer, description: "0=PresetA,1=PresetB,2=PresetC,3=PresetD,4=Default"}]
- id: save_mem
  label: Save Preset
  kind: action
  command: "*save.mem = {value}"
  params: [{name: value, type: integer, description: "0=PresetA,1=PresetB,2=PresetC,3=PresetD"}]

- id: network_mode
  label: Network Mode
  kind: action
  command: "*network.mode = {value}"
  params: [{name: value, type: integer, description: "0=Projector Control, 1=Service"}]
- id: standby_power
  label: Standby Power
  kind: action
  command: UNRESOLVED
  description: "UNRESOLVED: source lists standby.power values but leaves every operator column empty; no Set, Get or Execute wire form is established."
  params: [{name: value, type: integer, description: "0=Save, 1=Eco, 2=Normal; values listed by source, operation support UNRESOLVED"}]
- id: lan_power
  label: LAN Power
  kind: action
  command: "*lan.power = {value}"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: lan_dhcp
  label: LAN DHCP
  kind: action
  command: "*lan.dhcp = {value}"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: lan_ip
  label: LAN IP Address
  kind: action
  command: "*lan.ip = {value}"
  params: [{name: value, type: string, description: "xxx.xxx.xxx.xxx"}]
- id: lan_subnet
  label: LAN Subnet
  kind: action
  command: "*lan.subnet = {value}"
  params: [{name: value, type: string, description: "xxx.xxx.xxx.xxx"}]
- id: lan_gateway
  label: LAN Gateway
  kind: action
  command: "*lan.gateway = {value}"
  params: [{name: value, type: string, description: "xxx.xxx.xxx.xxx"}]
- id: lan_dns
  label: LAN DNS
  kind: action
  command: "*lan.dns = {value}"
  params: [{name: value, type: string, description: "xxx.xxx.xxx.xxx"}]
- id: lan_mac
  label: LAN MAC
  kind: query
  command: "*lan.mac ?"
  params: []
  set_command: "*lan.mac"
  set_payload: " = {value}"
  set_params:
    - name: value
      type: string
      description: "String; UNRESOLVED: exact MAC address encoding and validation constraints are not specified in source"
  description: "Source supports both Set and Get. The existing command is the polling query; concatenate set_command and set_payload for Set."
- id: lan_amx
  label: LAN AMX
  kind: action
  command: "*lan.amx = {value}"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]

- id: pip_mode
  label: PIP Mode
  kind: action
  command: "*pip.mode = {value}"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: pip_input
  label: PIP Input
  kind: action
  command: "*pip.input = {value}"
  params: [{name: value, type: integer, description: "0=DisplayPort,1=HDMI1,2=HDMI2,3=HDBaseT,4=3G-SDI"}]
- id: pip_position
  label: PIP Position
  kind: action
  command: "*pip.position = {value}"
  params: [{name: value, type: integer, description: "0=TopLeft,1=TopRight,2=BottomLeft,3=BottomRight,4=PBP"}]
- id: pip_swap
  label: PIP Swap
  kind: execute
  command: "*pip.swap"
  params: []

- id: power
  label: Power
  kind: action
  command: "*power = {value}"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: shutter
  label: Shutter
  kind: action
  command: "*shutter = {value}"
  params: [{name: value, type: integer, description: "0=Open, 1=Close"}]

- id: laser_reset
  label: Laser Reset
  kind: execute
  command: "*laser.reset"
  params: []
- id: cw_index
  label: CW Index
  kind: action
  command: "*cw.index = {value}"
  params: [{name: value, type: integer, description: "0, 100-1000"}]
- id: pw_index
  label: PW Index
  kind: action
  command: "*pw.index = {value}"
  params: [{name: value, type: integer, description: "0, 100-1000"}]
- id: dlp_pattern
  label: DLP Pattern
  kind: action
  command: "*dlp.pattern = {value}"
  params: [{name: value, type: integer, description: "0=Off,1=White,2=Black,3=Red,4=Green,5=Blue,6=Cyan,7=Magenta,8=Yellow,9=Checkboard,10=Vramp,11=Hramp,12=Grid,13=Cross,14=FPGA_TP_Calibration"}]
- id: pri_reset
  label: Primary Reset
  kind: execute
  command: "*pri.reset"
  params: []
- id: mfg_reset
  label: Manufacturing Reset
  kind: execute
  command: "*mfg.reset"
  params: []
- id: sp_index
  label: SP Index
  kind: action
  command: "*sp.index = {value}"
  params: [{name: value, type: integer, description: "0, 0-4096"}]
- id: sp_index_v
  label: SP Index V
  kind: action
  command: "*sp.index.v = {value}"
  params: [{name: value, type: integer, description: "0, 0-4096"}]
- id: sp_index_h
  label: SP Index H
  kind: action
  command: "*sp.index.h = {value}"
  params: [{name: value, type: integer, description: "0, 0-4096"}]
- id: sp_t1
  label: SP T1
  kind: action
  command: "*sp.t1 = {value}"
  params: [{name: value, type: integer, description: "0, 0-4096"}]
- id: sp_t2
  label: SP T2
  kind: action
  command: "*sp.t2 = {value}"
  params: [{name: value, type: integer, description: "0, 0-4096"}]
- id: factory_reset
  label: Factory Reset
  kind: execute
  command: "*factory.reset"
  params: []

- id: eb_blu_bottom
  label: Edge Blend Blue Bottom
  kind: action
  command: "eb.blu.bottom"
  payload: " = {value}"
  description: "Literal source command token. Prepend an asterisk and append the substituted payload and ASCII carriage return for Set. Its relationship to eb.blu.btm is UNRESOLVED."
  params:
    - name: value
      type: integer
      description: 0 to 32 (integer)
```

## Feedbacks
```yaml
- id: ack_response
  label: ACK
  type: string
  description: '"ACK <command> = <value>" or "ack <command> = <value>"'
- id: nak_response
  label: NAK
  type: string
  description: '"NAK" or "nack", followed by a brief problem description'
- id: model_name
  label: Model Name
  type: string
  query_command: "model.name"
- id: serial
  label: Serial Number
  type: string
  query_command: "serial"
- id: sw_version
  label: Software Version
  type: string
  query_command: "sw.version"
- id: sw1_version
  label: SW1 Version
  type: string
  query_command: "sw1.version"
- id: sw2_version
  label: SW2 Version
  type: string
  query_command: "sw2.version"
- id: sw3_version
  label: SW3 Version
  type: string
  query_command: "sw3.version"
- id: act_source
  label: Active Source
  type: string
  query_command: "act.source"
- id: signal
  label: Signal
  type: string
  query_command: "signal"
- id: h_refresh
  label: Horizontal Refresh
  type: number
  query_command: "h.refresh"
- id: v_refresh
  label: Vertical Refresh
  type: number
  query_command: "v.refresh"
- id: pixel_clock
  label: Pixel Clock
  type: number
  query_command: "pixel.clock"
- id: laser_hours
  label: Laser Hours
  type: integer
  query_command: "laser.hours"
- id: atmos_alti
  label: Atmospheric Altitude
  type: number
  query_command: "atmos.alti"
- id: atmos_pressure
  label: Atmospheric Pressure
  type: number
  query_command: "atmos.pressure"
- id: ac_voltage
  label: AC Voltage Range
  type: enum
  query_command: "ac.voltage"
  values: ["90-150", "160-264"]
- id: g_ceiling
  label: Gravity Ceiling Sensor
  type: enum
  query_command: "g.ceiling"
  values: [table, ceiling]
- id: g_portrait
  label: Gravity Portrait
  type: number
  query_command: "g.portrait"
- id: g_tilt
  label: Gravity Tilt
  type: number
  query_command: "g.tilt"
- id: altitude_info
  label: Altitude Info
  type: enum
  query_command: "altitude.info"
  values: [low, high]
- id: laser_power_info
  label: Laser Power Info
  type: number
  query_command: "laser.power.info"
- id: ti
  label: Temperature TI
  type: number
  query_command: "ti"
- id: ti2
  label: Temperature TI2
  type: number
  query_command: "ti2"
- id: tc
  label: Temperature TC
  type: number
  query_command: "tc"
- id: tb1
  label: Temperature TB1
  type: number
  query_command: "tb1"
- id: tb2
  label: Temperature TB2
  type: number
  query_command: "tb2"
- id: fan1_3
  label: Fan 1-3 Speed
  type: string
  query_command: "fan1_3"
  description: "xxxx / xxxx / xxxx"
- id: fan4_6
  label: Fan 4-6 Speed
  type: string
  query_command: "fan4_6"
- id: fan7_9
  label: Fan 7-9 Speed
  type: string
  query_command: "fan7_9"
- id: fan10_12
  label: Fan 10-12 Speed
  type: string
  query_command: "fan10_12"
- id: fan13_15
  label: Fan 13-15 Speed
  type: string
  query_command: "fan13_15"
- id: fan16_18
  label: Fan 16-18 Speed
  type: string
  query_command: "fan16_18"
  description: "xxxx / NA / NA"
- id: fans
  label: All Fans & Environment
  type: string
  query_command: "fans"
- id: water_pump
  label: Water Pump
  type: number
  query_command: "water.pump"
- id: lamp1_hours
  label: Lamp 1 Hours
  type: integer
  description: "UNRESOLVED: device is laser; lamp1.hours not in refined source"
- id: lamp2_hours
  label: Lamp 2 Hours
  type: integer
  description: "UNRESOLVED: device is laser; lamp2.hours not in refined source"
- id: total_hours
  label: Total Hours
  type: integer
  query_command: "total.hours"
- id: total_minutes
  label: Total Minutes
  type: number
  query_command: "total.minutes"
- id: laser_minutes
  label: Laser Minutes
  type: number
  query_command: "laser.minutes"
- id: laser_normal_hr
  label: Laser Normal Hours
  type: number
  query_command: "laser.normal.hr"
- id: laser_normal_min
  label: Laser Normal Minutes
  type: number
  query_command: "laser.normal.min"
- id: laser_eco_hr
  label: Laser Eco Hours
  type: number
  query_command: "laser.eco.hr"
- id: laser_eco_min
  label: Laser Eco Minutes
  type: number
  query_command: "laser.eco.min"
- id: status
  label: Projector Status
  type: enum
  query_command: "status"
  values: [standby, warm_up, imaging, cooling, error]
- id: errcode
  label: Error Code
  type: string
  query_command: "errcode"
- id: cust_wp_ck_sum
  label: Custom Warp Checksum
  type: integer
  query_command: "cust.wp.ck.sum"
  description: "unsigned 32-bit checksum of bytes in current sent warp file (when cust.wp.send != 0)"
- id: lens_save_map
  label: Lens Memory Occupancy
  type: string
  query_command: "lens.save"
  description: "string of 0s and 1s indicating empty/occupied memory slots"
- id: psoc4_ver
  label: PSOC4 Version
  type: string
  query_command: "psoc4.ver"
- id: warp_key
  label: Warp Key License
  type: enum
  query_command: "warp.key"
  values: ["licence_fail_timeout_expired", "licence_pass_timeout_expired", "licence_fail_timeout_active", "licence_pass_timeout_active"]
- id: power_state
  label: Power State
  type: enum
  query_command: "power"
  values: [off, on]
- id: input_state
  label: Current Input
  type: enum
  query_command: "input"
  values: [displayport, hdmi_1, hdmi_2, hdbaset, sdi3g, hdmi_3, hdmi_4]
- id: brightness_var
  label: Brightness
  type: integer
  query_command: "brightness"
- id: contrast_var
  label: Contrast
  type: integer
  query_command: "contrast"
- id: saturation_var
  label: Saturation
  type: integer
  query_command: "saturation"
- id: hue_var
  label: Hue
  type: integer
  query_command: "hue"
- id: sharpness_var
  label: Sharpness
  type: integer
  query_command: "sharpness"
- id: aspect_ratio_state
  label: Aspect Ratio State
  type: string
  query_command: "aspect.ratio"
- id: zoom_state
  label: Zoom Level
  type: string
  query_command: "digi.zoom"
```

## Variables
```yaml
# UNRESOLVED: parametrable non-discrete params; populate or remove as needed
```

## Events
```yaml
# UNRESOLVED: unsolicited event behavior is not specified in source
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences documented
```

## Safety
```yaml
confirmation_required_for:
  - mfg_reset
  - pri_reset
  - factory_reset
  - laser_reset
  - user_p7_rst
  - user_std_reset
  - user_target_reset
  - user2_target_reset
  - gainlift_reset
  - hsg_reset
  - pin_barrel_reset
  - four_corner_reset
  - arc_reset
  - blanking_reset
  - warp_reset
  - keystone_reset
  - rotation_reset
  - eb_reset
  - digi_zoom_rst
interlocks:
  - Lens commands only work when projector is switched on
  - 'If lens.lock=1, most lens commands disabled (exceptions: lens.type, lens.save, lens.clear)'
  - laser.power only settable when laser.mode=2 (Custom)
# UNRESOLVED: power-on sequencing, cooling requirements, high-voltage warnings not detailed in source
```

## Notes
Only one control path (serial or network) at a time. Wait for complete response before next command. Spaces required before operator and value in ASCII commands. All wire commands end with ASCII carriage return (code 13). For `nr_reset`, concatenate `command` and the substituted `payload` before adding carriage return; the source documents Set and Get, not execute-only behavior. For the Set operation under `lan_mac`, concatenate `set_command` and the substituted `set_payload` before adding carriage return; its existing polling query remains unchanged. The source specifies only a string for the MAC value, so its exact encoding and validation constraints remain UNRESOLVED.

The `standby_power` entry retains the source's listed values, but its wire command is UNRESOLVED because the source marks no supported operators. Do not infer an operator or a default. Authentication, serial parity, stop bits and flow control remain UNRESOLVED. The source's schedule day notation is ambiguous: it prints `76543210` while mapping only bits 6 through 0; no exact wire encoding is established here.

Lens memory occupancy bitmap is returned by `lens.save` with the Get operator. user.target / user2.target protocol values are multiples of 1000 (not raw xy chromaticity). ac.voltage is range indicator, not raw reading. The source additionally lists `eb.blu.bottom` with Set/Get/Inc/Dec support and range 0-32; its relationship to the existing `eb.blu.btm` command is UNRESOLVED.
<!-- UNRESOLVED: lamp1.hours and lamp2.hours are not in the source for E-Vision Laser 10K; their existing feedback ids are retained without inventing polling commands. Unsupported vga_auto and pic_mute actions were removed under the explicit id-preservation exception. -->

The added `eb_blu_bottom.command` and Feedback `query_command` values retain the literal command tokens printed in the source tables. For `eb_blu_bottom`, prepend `*`, append its substituted `payload`, then append ASCII carriage return (code 13). For each Feedback query, prepend `*` to `query_command`, append a space and `?`, then append ASCII carriage return (code 13). The `zoom_state` query reads digital zoom through `digi.zoom`; the source documents no query for optical lens zoom.

## Provenance

```yaml
source_domains:
  - digitalprojection.co.uk
source_urls:
  - https://digitalprojection.co.uk/dpdownloads/Protocol/Simplified-Protocol-Guide-Rev-H.pdf
retrieved_at: 2026-04-29T09:13:33.598Z
last_checked_at: 2026-10-07T13:29:18.501Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:29:18.501Z
matched_actions: 299
action_count: 299
confidence: medium
summary: "All 299 action units match source command tokens with correct ranges and enums; transport values (port 7000, 9600 baud, 8 data bits) in source. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial parity/stop bits/flow control and authentication not stated in source"
- "source prints 76543210 and maps Bit6=Sat through Bit0=Sun; exact wire encoding and Bit7 meaning are not specified\"}]"
- "source lists standby.power values but leaves every operator column empty; no Set, Get or Execute wire form is established.\""
- "exact MAC address encoding and validation constraints are not specified in source\""
- "device is laser; lamp1.hours not in refined source\""
- "device is laser; lamp2.hours not in refined source\""
- "parametrable non-discrete params; populate or remove as needed"
- "unsolicited event behavior is not specified in source"
- "no explicit macro sequences documented"
- "power-on sequencing, cooling requirements, high-voltage warnings not detailed in source"
- "lamp1.hours and lamp2.hours are not in the source for E-Vision Laser 10K; their existing feedback ids are retained without inventing polling commands. Unsupported vga_auto and pic_mute actions were removed under the explicit id-preservation exception."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
