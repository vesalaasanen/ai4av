---
spec_id: admin/depili-m-vision-laser-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Depili M-Vision Laser Series Control Spec"
manufacturer: Depili
model_family: "M-Vision Laser Series"
aliases: []
compatible_with:
  manufacturers:
    - Depili
  models:
    - "M-Vision Laser Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - digitalprojection.co.uk
  - teledynelabs.com
  - github.com
  - gitlab.com
  - advanced-image-sensor-interface.readthedocs.io
source_urls:
  - https://digitalprojection.co.uk/dpdownloads/Protocol/Simplified-Protocol-Guide-Rev-H.pdf
  - https://www.teledynelabs.com/en-us/resources/Documents/Manuals-Instructions/81400805-C-Protocol-Manager-User-Guide.pdf
  - https://github.com/janwilmans/gvcp-tools
  - https://gitlab.com/wireshark/wireshark/-/issues/19494
  - https://advanced-image-sensor-interface.readthedocs.io/en/latest/protocols_index.html
retrieved_at: 2026-07-11T12:12:25.665Z
last_checked_at: 2026-07-12T08:59:03.246Z
generated_at: 2026-07-12T08:59:03.246Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model variants within the M-Vision Laser Series not enumerated in source. Firmware version compatibility not stated."
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "no unsolicited notifications documented in source. The projector"
  - "no multi-step command sequences documented in source."
  - "no explicit power-on sequencing procedure stated in source."
  - "parity, stop bits, and flow control for RS-232 not stated in source."
  - "exact M-Vision Laser model variants (18K, 21000 II, 30000 WU, 27000 WU) not differentiated in command tables — source uses E-Vision 6900 / Mercury Quad as reference columns."
  - "firmware version compatibility not stated."
  - "no authentication/login procedure documented — inferred as none."
verification:
  verdict: verified
  checked_at: 2026-07-12T08:59:03.246Z
  matched_actions: 253
  action_count: 253
  confidence: medium
  summary: "All 253 spec actions matched verbatim in source with correct parameter ranges; transport parameters (TCP 7000, 9600 baud, 8 data bits) confirmed; source command catalogue fully represented. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-11
---

# Depili M-Vision Laser Series Control Spec

## Summary
The M-Vision Laser Series is a DLP laser projector controllable via RS-232 serial or LAN (TCP) interface using ASCII text commands. Commands start with an asterisk (`*`), end with a Carriage Return (code 13), and support set (`=`), get (`?`), increment (`+`), decrement (`-`), and execute operators. This spec covers the full command catalogue documented in the vendor external control protocol reference.

<!-- UNRESOLVED: exact model variants within the M-Vision Laser Series not enumerated in source. Firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7000  # default TCP port per source
  # default IP address: 192.168.0.100 (stated in source)
serial:
  baud_rate: 9600
  data_bits: 8
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

Source states only one control path (serial OR network) should be used at a time. Simultaneous use of both may cause unpredictable behavior.

## Traits
```yaml
traits:
  - powerable  # inferred from power command (on/off)
  - routable   # inferred from input selection commands
  - queryable  # inferred from get (?) operator on all commands
  - levelable  # inferred from brightness/contrast/gain/lens level controls
```

## Actions
```yaml
# All commands: ASCII string starting with '*', ending with CR (code 13).
# Format: *<command> <operator> <value>  (spaces required before operator and value)
# Operators: = (set), ? (get), + (inc), - (dec), none (execute)
# All commands below support all operators unless noted.
# Responses: success -> "ACK <command> = <value>" or "ack ..."; failure -> "NAK <description>" or "nack ..."
# You must wait for the complete response before sending another command.

# === INPUT ===
- id: input
  label: Input Source
  kind: action
  command: "*input = {value}"
  params:
    - name: value
      type: integer
      description: "0=HDMI I, 1=HDMI II, 2=DVI-D, 3=VGA, 4=Component, 5=HDBaseT (E-Vision 6900); 0=HDMI 1, 1=HDMI 2, 2=DisplayPort, 3=HDBaseT, 4=3G-SDI (Mercury Quad)"

- id: test_pattern
  label: Test Pattern
  kind: action
  command: "*test.pattern = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off,1=White,2=Black,3=Red,4=Green,5=Blue,6=Checkerboard,7=CrossHatch,8=V Burst,9=H Burst,10=Color Bar,11=Hramp/Plunge"

# === LENS ===
- id: zoom_in
  label: Zoom In
  kind: action
  command: "*zoom.in"
  params: []

- id: zoom_out
  label: Zoom Out
  kind: action
  command: "*zoom.out"
  params: []

- id: focus_near
  label: Focus Near
  kind: action
  command: "*focus.near"
  params: []

- id: focus_far
  label: Focus Far
  kind: action
  command: "*focus.far"
  params: []

- id: lens_up
  label: Lens Up
  kind: action
  command: "*lens.up"
  params: []

- id: lens_down
  label: Lens Down
  kind: action
  command: "*lens.down"
  params: []

- id: lens_left
  label: Lens Left
  kind: action
  command: "*lens.left"
  params: []

- id: lens_right
  label: Lens Right
  kind: action
  command: "*lens.right"
  params: []

- id: lens_center
  label: Lens Center
  kind: action
  command: "*lens.center"
  params: []

- id: lens_load
  label: Lens Load
  kind: action
  command: "*lens.load = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 9 (E-Vision 6900); 1 to 10 (Mercury Quad)"

- id: lens_save
  label: Lens Save
  kind: action
  command: "*lens.save = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 9 (E-Vision 6900); 1 to 10 (Mercury Quad)"

- id: lens_clear
  label: Lens Clear
  kind: action
  command: "*lens.clear = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 9 (E-Vision 6900); 1 to 10 (Mercury Quad)"

- id: lens_type
  label: Lens Type
  kind: action
  command: "*lens.type = {value}"
  params:
    - name: value
      type: integer
      description: "0=non-UST Lens, 1=UST Lens"

- id: lens_lock
  label: Lens Lock
  kind: action
  command: "*lens.lock = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

# === IMAGE ===
- id: pic_mode
  label: Picture Mode
  kind: action
  command: "*pic.mode = {value}"
  params:
    - name: value
      type: integer
      description: "0=High Bright, 1=Presentation, 2=Video"

- id: dblack
  label: Dynamic Black
  kind: action
  command: "*dblack = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: gamma
  label: Gamma
  kind: action
  command: "*gamma = {value}"
  params:
    - name: value
      type: integer
      description: "0=1.0,1=1.8,2=2.0,3=2.2,4=2.35,5=2.5,6=S-curve (E-Vision 6900)"

- id: brightness
  label: Brightness
  kind: action
  command: "*brightness = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: contrast
  label: Contrast
  kind: action
  command: "*contrast = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: saturation
  label: Saturation
  kind: action
  command: "*saturation = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200 (E-Vision 6900 only accepts if input is YUV)"

- id: hue
  label: Hue
  kind: action
  command: "*hue = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200 (E-Vision 6900 only accepts if input is YUV)"

- id: sharpness
  label: Sharpness
  kind: action
  command: "*sharpness = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 15 (Mercury Quad); 0 to 31 (E-Vision 6900)"

- id: nr
  label: Noise Reduction
  kind: action
  command: "*nr = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 15 (E-Vision 6900)"

- id: nr_temporal
  label: Temporal Noise Reduction
  kind: action
  command: "*nr.temporal = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 3"

- id: nr_block
  label: Block Noise Reduction
  kind: action
  command: "*nr.block = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 3"

- id: nr_mosquito
  label: Mosquito Noise Reduction
  kind: action
  command: "*nr.mosquito = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 3"

- id: nr_hori
  label: Horizontal Noise Reduction
  kind: action
  command: "*nr.hori = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 3"

- id: nr_vert
  label: Vertical Noise Reduction
  kind: action
  command: "*nr.vert = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 3"

- id: nr_reset
  label: Noise Reduction Reset
  kind: action
  command: "*nr.reset = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 3"

- id: h_position
  label: Horizontal Position
  kind: action
  command: "*h.position = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: v_position
  label: Vertical Position
  kind: action
  command: "*v.position = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: vga_phase
  label: VGA Phase
  kind: action
  command: "*vga.phase = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 31"

- id: tracking
  label: Tracking
  kind: action
  command: "*tracking = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: sync_level
  label: Sync Level
  kind: action
  command: "*sync.level = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200 (Mercury Quad)"

- id: freeze
  label: Freeze
  kind: action
  command: "*freeze = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: resync
  label: Resync
  kind: action
  command: "*resync"
  params: []

- id: vga_auto
  label: VGA Auto
  kind: action
  command: "*vga.auto"
  params: []

# === COLOR ===
- id: color_space
  label: Color Space
  kind: action
  command: "*color.space = {value}"
  params:
    - name: value
      type: integer
      description: "0=Auto,1=YPbPr,2=YCbCr,3=RGB-PC,4=RGB-Video"

- id: color_temp
  label: Color Temperature
  kind: action
  command: "*color.temp = {value}"
  params:
    - name: value
      type: integer
      description: "0=Native,1=5400K,2=6500K,3=7500K,4=9300K (E-Vision 6900); 0=3200K..5=Native (Mercury Quad)"

- id: color_mode
  label: Color Mode
  kind: action
  command: "*color.mode = {value}"
  params:
    - name: value
      type: integer
      description: "0=ColorMax,1=Manual Color Matching,2=Color Temperature,3=Gains and Lifts"

- id: color_max
  label: Color Max
  kind: action
  command: "*color.max = {value}"
  params:
    - name: value
      type: integer
      description: "0=REC709,1=EBU,2=SMPTE,3=Native,4=User 1,5=User 2"

- id: red_lift
  label: Red Lift
  kind: action
  command: "*red.lift = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: green_lift
  label: Green Lift
  kind: action
  command: "*green.lift = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: blue_lift
  label: Blue Lift
  kind: action
  command: "*blue.lift = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: red_gain
  label: Red Gain
  kind: action
  command: "*red.gain = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: green_gain
  label: Green Gain
  kind: action
  command: "*green.gain = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: blue_gain
  label: Blue Gain
  kind: action
  command: "*blue.gain = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: gainlift_reset
  label: Gain/Lift Reset
  kind: action
  command: "*gainlift.reset"
  params: []

- id: auto_test_ptrn
  label: Auto Test Pattern
  kind: action
  command: "*auto.test.ptrn = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: user_std_rx
  label: User Standard Rx
  kind: action
  command: "*user.std.rx = {value}"
  params:
    - name: value
      type: integer
      description: "550 to 750"

- id: user_std_ry
  label: User Standard Ry
  kind: action
  command: "*user.std.ry = {value}"
  params:
    - name: value
      type: integer
      description: "250 to 450"

- id: user_std_gx
  label: User Standard Gx
  kind: action
  command: "*user.std.gx = {value}"
  params:
    - name: value
      type: integer
      description: "200 to 400"

- id: user_std_gy
  label: User Standard Gy
  kind: action
  command: "*user.std.gy = {value}"
  params:
    - name: value
      type: integer
      description: "400 to 750"

- id: user_std_bx
  label: User Standard Bx
  kind: action
  command: "*user.std.bx = {value}"
  params:
    - name: value
      type: integer
      description: "50 to 250"

- id: user_std_by
  label: User Standard By
  kind: action
  command: "*user.std.by = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 120"

- id: user_std_wx
  label: User Standard Wx
  kind: action
  command: "*user.std.wx = {value}"
  params:
    - name: value
      type: integer
      description: "200 to 400"

- id: user_std_wy
  label: User Standard Wy
  kind: action
  command: "*user.std.wy = {value}"
  params:
    - name: value
      type: integer
      description: "250 to 450"

- id: user_std_reset
  label: User Standard Reset
  kind: action
  command: "*user.std.reset"
  params: []

- id: user_target_rx
  label: User Target Rx
  kind: action
  command: "*user.target.rx = {value}"
  params:
    - name: value
      type: integer
      description: "550 to 750 (protocol values are multiples of 1000)"

- id: user_target_ry
  label: User Target Ry
  kind: action
  command: "*user.target.ry = {value}"
  params:
    - name: value
      type: integer
      description: "250 to 450"

- id: user_target_gx
  label: User Target Gx
  kind: action
  command: "*user.target.gx = {value}"
  params:
    - name: value
      type: integer
      description: "200 to 400"

- id: user_target_gy
  label: User Target Gy
  kind: action
  command: "*user.target.gy = {value}"
  params:
    - name: value
      type: integer
      description: "400 to 750"

- id: user_target_bx
  label: User Target Bx
  kind: action
  command: "*user.target.bx = {value}"
  params:
    - name: value
      type: integer
      description: "50 to 250"

- id: user_target_by
  label: User Target By
  kind: action
  command: "*user.target.by = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 120"

- id: user_target_wx
  label: User Target Wx
  kind: action
  command: "*user.target.wx = {value}"
  params:
    - name: value
      type: integer
      description: "200 to 400"

- id: user_target_wy
  label: User Target Wy
  kind: action
  command: "*user.target.wy = {value}"
  params:
    - name: value
      type: integer
      description: "250 to 450"

- id: user_target_cx
  label: User Target Cx
  kind: action
  command: "*user.target.cx = {value}"
  params:
    - name: value
      type: integer
      description: "125 to 325"

- id: user_target_cy
  label: User Target Cy
  kind: action
  command: "*user.target.cy = {value}"
  params:
    - name: value
      type: integer
      description: "225 to 425"

- id: user_target_mx
  label: User Target Mx
  kind: action
  command: "*user.target.mx = {value}"
  params:
    - name: value
      type: integer
      description: "200 to 400"

- id: user_target_my
  label: User Target My
  kind: action
  command: "*user.target.my = {value}"
  params:
    - name: value
      type: integer
      description: "50 to 250"

- id: user_target_yx
  label: User Target Yx
  kind: action
  command: "*user.target.yx = {value}"
  params:
    - name: value
      type: integer
      description: "300 to 500"

- id: user_target_yy
  label: User Target Yy
  kind: action
  command: "*user.target.yy = {value}"
  params:
    - name: value
      type: integer
      description: "400 to 600"

- id: user_target_reset
  label: User Target Reset
  kind: action
  command: "*user.target.reset"
  params: []

- id: user2_target_rx
  label: User2 Target Rx
  kind: action
  command: "*user2.target.rx = {value}"
  params:
    - name: value
      type: integer
      description: "550 to 750"

- id: user2_target_ry
  label: User2 Target Ry
  kind: action
  command: "*user2.target.ry = {value}"
  params:
    - name: value
      type: integer
      description: "250 to 450"

- id: user2_target_gx
  label: User2 Target Gx
  kind: action
  command: "*user2.target.gx = {value}"
  params:
    - name: value
      type: integer
      description: "200 to 400"

- id: user2_target_gy
  label: User2 Target Gy
  kind: action
  command: "*user2.target.gy = {value}"
  params:
    - name: value
      type: integer
      description: "400 to 750"

- id: user2_target_bx
  label: User2 Target Bx
  kind: action
  command: "*user2.target.bx = {value}"
  params:
    - name: value
      type: integer
      description: "50 to 250"

- id: user2_target_by
  label: User2 Target By
  kind: action
  command: "*user2.target.by = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 120"

- id: user2_target_wx
  label: User2 Target Wx
  kind: action
  command: "*user2.target.wx = {value}"
  params:
    - name: value
      type: integer
      description: "200 to 400"

- id: user2_target_wy
  label: User2 Target Wy
  kind: action
  command: "*user2.target.wy = {value}"
  params:
    - name: value
      type: integer
      description: "250 to 450"

- id: user2_target_cx
  label: User2 Target Cx
  kind: action
  command: "*user2.target.cx = {value}"
  params:
    - name: value
      type: integer
      description: "125 to 325"

- id: user2_target_cy
  label: User2 Target Cy
  kind: action
  command: "*user2.target.cy = {value}"
  params:
    - name: value
      type: integer
      description: "225 to 425"

- id: user2_target_mx
  label: User2 Target Mx
  kind: action
  command: "*user2.target.mx = {value}"
  params:
    - name: value
      type: integer
      description: "200 to 400"

- id: user2_target_my
  label: User2 Target My
  kind: action
  command: "*user2.target.my = {value}"
  params:
    - name: value
      type: integer
      description: "50 to 250"

- id: user2_target_yx
  label: User2 Target Yx
  kind: action
  command: "*user2.target.yx = {value}"
  params:
    - name: value
      type: integer
      description: "300 to 500"

- id: user2_target_yy
  label: User2 Target Yy
  kind: action
  command: "*user2.target.yy = {value}"
  params:
    - name: value
      type: integer
      description: "400 to 600"

- id: user2_target_reset
  label: User2 Target Reset
  kind: action
  command: "*user2.target.reset"
  params: []

- id: hsg_hue_r
  label: HSG Hue Red
  kind: action
  command: "*hsg.hue.r = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_hue_g
  label: HSG Hue Green
  kind: action
  command: "*hsg.hue.g = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_hue_b
  label: HSG Hue Blue
  kind: action
  command: "*hsg.hue.b = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_hue_c
  label: HSG Hue Cyan
  kind: action
  command: "*hsg.hue.c = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_hue_m
  label: HSG Hue Magenta
  kind: action
  command: "*hsg.hue.m = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_hue_y
  label: HSG Hue Yellow
  kind: action
  command: "*hsg.hue.y = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_sat_r
  label: HSG Saturation Red
  kind: action
  command: "*hsg.sat.r = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_sat_g
  label: HSG Saturation Green
  kind: action
  command: "*hsg.sat.g = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_sat_b
  label: HSG Saturation Blue
  kind: action
  command: "*hsg.sat.b = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_sat_c
  label: HSG Saturation Cyan
  kind: action
  command: "*hsg.sat.c = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_sat_m
  label: HSG Saturation Magenta
  kind: action
  command: "*hsg.sat.m = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_sat_y
  label: HSG Saturation Yellow
  kind: action
  command: "*hsg.sat.y = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_gain_r
  label: HSG Gain Red
  kind: action
  command: "*hsg.gain.r = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_gain_g
  label: HSG Gain Green
  kind: action
  command: "*hsg.gain.g = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_gain_b
  label: HSG Gain Blue
  kind: action
  command: "*hsg.gain.b = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_gain_c
  label: HSG Gain Cyan
  kind: action
  command: "*hsg.gain.c = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_gain_m
  label: HSG Gain Magenta
  kind: action
  command: "*hsg.gain.m = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_gain_y
  label: HSG Gain Yellow
  kind: action
  command: "*hsg.gain.y = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_white_r
  label: HSG White Red
  kind: action
  command: "*hsg.white.r = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_white_g
  label: HSG White Green
  kind: action
  command: "*hsg.white.g = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_white_b
  label: HSG White Blue
  kind: action
  command: "*hsg.white.b = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200"

- id: hsg_reset
  label: HSG Reset
  kind: action
  command: "*hsg.reset"
  params: []

# === GEOMETRY ===
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "*aspect.ratio = {value}"
  params:
    - name: value
      type: integer
      description: "0=5:4,1=4:3,2=16:10,3=16:9,4=1.88,5=2.35,6=Theaterscope,7=Source,8=Unscaled"

- id: digi_zoom
  label: Digital Zoom
  kind: action
  command: "*digi.zoom = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100"

- id: digi_pan
  label: Digital Pan
  kind: action
  command: "*digi.pan = {value}"
  params:
    - name: value
      type: integer
      description: "-320 to +320"

- id: digi_pan_bound
  label: Digital Pan Bound
  kind: action
  command: "*digi.pan.bound = {value}"
  params:
    - name: value
      type: integer
      description: "-320 to +320"

- id: digi_scan
  label: Digital Scan
  kind: action
  command: "*digi.scan = {value}"
  params:
    - name: value
      type: integer
      description: "-200 to +200"

- id: digi_scan_bound
  label: Digital Scan Bound
  kind: action
  command: "*digi.scan.bound = {value}"
  params:
    - name: value
      type: integer
      description: "-200 to +200"

- id: digi_zoom_rst
  label: Digital Zoom Reset
  kind: action
  command: "*digi.zoom.rst"
  params: []

- id: overscan
  label: Overscan
  kind: action
  command: "*overscan = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off,1=On (E-Vision 6900); 0=Off,1=Crop,2=Zoom (Mercury Quad)"

- id: h_keystone
  label: Horizontal Keystone
  kind: action
  command: "*h.keystone = {value}"
  params:
    - name: value
      type: integer
      description: "-30 to +30 (E-Vision 6900); -600 to +600 (Mercury Quad)"

- id: v_keystone
  label: Vertical Keystone
  kind: action
  command: "*v.keystone = {value}"
  params:
    - name: value
      type: integer
      description: "-30 to +30 (E-Vision 6900); -400 to +400 (Mercury Quad)"

- id: rotation
  label: Rotation
  kind: action
  command: "*rotation = {value}"
  params:
    - name: value
      type: integer
      description: "-100 to +100 (Mercury Quad)"

- id: h_pin_barrel
  label: Horizontal Pin/Barrel
  kind: action
  command: "*h.pin.barrel = {value}"
  params:
    - name: value
      type: integer
      description: "-150 to +300"

- id: v_pin_barrel
  label: Vertical Pin/Barrel
  kind: action
  command: "*v.pin.barrel = {value}"
  params:
    - name: value
      type: integer
      description: "-150 to +300"

- id: 4corner_ulx
  label: Four Corner ULX
  kind: action
  command: "*4corner.ulx = {value}"
  params:
    - name: value
      type: integer
      description: "-192 to +192"

- id: 4corner_uly
  label: Four Corner ULY
  kind: action
  command: "*4corner.uly = {value}"
  params:
    - name: value
      type: integer
      description: "-120 to +120"

- id: 4corner_urx
  label: Four Corner URX
  kind: action
  command: "*4corner.urx = {value}"
  params:
    - name: value
      type: integer
      description: "-192 to +192"

- id: 4corner_ury
  label: Four Corner URY
  kind: action
  command: "*4corner.ury = {value}"
  params:
    - name: value
      type: integer
      description: "-120 to +120"

- id: 4corner_llx
  label: Four Corner LLX
  kind: action
  command: "*4corner.llx = {value}"
  params:
    - name: value
      type: integer
      description: "-192 to +192"

- id: 4corner_lly
  label: Four Corner LLY
  kind: action
  command: "*4corner.lly = {value}"
  params:
    - name: value
      type: integer
      description: "-120 to +120"

- id: 4corner_lrx
  label: Four Corner LRX
  kind: action
  command: "*4corner.lrx = {value}"
  params:
    - name: value
      type: integer
      description: "-192 to +192"

- id: 4corner_lry
  label: Four Corner LRY
  kind: action
  command: "*4corner.lry = {value}"
  params:
    - name: value
      type: integer
      description: "-120 to +120"

- id: arc_top
  label: Arc Top
  kind: action
  command: "*arc.top = {value}"
  params:
    - name: value
      type: integer
      description: "-150 to +150"

- id: arc_bottom
  label: Arc Bottom
  kind: action
  command: "*arc.bottom = {value}"
  params:
    - name: value
      type: integer
      description: "-150 to +150"

- id: arc_left
  label: Arc Left
  kind: action
  command: "*arc.left = {value}"
  params:
    - name: value
      type: integer
      description: "-150 to +150"

- id: arc_right
  label: Arc Right
  kind: action
  command: "*arc.right = {value}"
  params:
    - name: value
      type: integer
      description: "-150 to +150"

- id: blanking_top
  label: Blanking Top
  kind: action
  command: "*blanking.top = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 360"

- id: blanking_bottom
  label: Blanking Bottom
  kind: action
  command: "*blanking.bottom = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 360"

- id: blanking_left
  label: Blanking Left
  kind: action
  command: "*blanking.left = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 534"

- id: blanking_right
  label: Blanking Right
  kind: action
  command: "*blanking.right = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 534"

- id: blanking_reset
  label: Blanking Reset
  kind: action
  command: "*blanking.reset"
  params: []

- id: warp_reset
  label: Warp Reset
  kind: action
  command: "*warp.reset"
  params: []

- id: active_warp
  label: Active Warp
  kind: action
  command: "*active.warp = {value}"
  params:
    - name: value
      type: integer
      description: "0=none,1=Keystone,2=Four Corner,3=Rotation,4=Pin/Barrel,5=Arc"

- id: cust_wp_write
  label: Custom Warp Write
  kind: action
  command: "*cust.wp.write = {value}"
  params:
    - name: value
      type: integer
      description: "1=User 1 file, 2=User 2 file"

- id: cust_wp_clear
  label: Custom Warp Clear
  kind: action
  command: "*cust.wp.clear = {value}"
  params:
    - name: value
      type: integer
      description: "1=User 1 file, 2=User 2 file"

- id: cust_wp_send
  label: Custom Warp Send
  kind: action
  command: "*cust.wp.send = {value}"
  params:
    - name: value
      type: integer
      description: "0=off,1=User 1 file,2=User 2 file"

- id: cust_wp_ck_sum
  label: Custom Warp Checksum
  kind: query
  command: "*cust.wp.ck.sum ?"
  params: []
  # Returns unsigned 32-bit checksum of current warp file when cust.wp.send != 0

- id: warp_cust
  label: Warp Custom
  kind: action
  command: "*warp.cust = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off,1=User 1,2=User 2"

# === EDGE BLEND ===
- id: eb_stat
  label: Edge Blend Status
  kind: action
  command: "*eb.stat = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: eb_adl
  label: Edge Blend ADL
  kind: action
  command: "*eb.adl = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: eb_top
  label: Edge Blend Top
  kind: action
  command: "*eb.top = {value}"
  params:
    - name: value
      type: integer
      description: "0, 100 to 500"

- id: eb_bottom
  label: Edge Blend Bottom
  kind: action
  command: "*eb.bottom = {value}"
  params:
    - name: value
      type: integer
      description: "0, 100 to 500"

- id: eb_left
  label: Edge Blend Left
  kind: action
  command: "*eb.left = {value}"
  params:
    - name: value
      type: integer
      description: "0, 100 to 800"

- id: eb_right
  label: Edge Blend Right
  kind: action
  command: "*eb.right = {value}"
  params:
    - name: value
      type: integer
      description: "0, 100 to 800"

- id: eb_blu_top
  label: Edge Blend Blur Top
  kind: action
  command: "*eb.blu.top = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 32"

- id: eb_blu_btm
  label: Edge Blend Blur Bottom
  kind: action
  command: "*eb.blu.btm = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 32"

- id: eb_blu_left
  label: Edge Blend Blur Left
  kind: action
  command: "*eb.blu.left = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 32"

- id: eb_blu_right
  label: Edge Blend Blur Right
  kind: action
  command: "*eb.blu.right = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 32"

- id: eb_all
  label: Edge Blend All
  kind: action
  command: "*eb.all = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 255"

- id: eb_red
  label: Edge Blend Red
  kind: action
  command: "*eb.red = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 255"

- id: eb_green
  label: Edge Blend Green
  kind: action
  command: "*eb.green = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 255"

- id: eb_blue
  label: Edge Blend Blue
  kind: action
  command: "*eb.blue = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 255"

- id: eb_reset
  label: Edge Blend Reset
  kind: action
  command: "*eb.reset"
  params: []

# === 3D ===
- id: 3d_format
  label: 3D Format
  kind: action
  command: "*3d.format = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off,1=Auto,2=Side-By-Side(Half),3=Top-And-Bottom,4=Frame Sequential (E-Vision); 4=Dual-Pipe,5=Frame Sequential (Mercury Quad)"

- id: 3d_dlplink
  label: 3D DLP Link
  kind: action
  command: "*3d.dlplink = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: 3d_dominance
  label: 3D Dominance
  kind: action
  command: "*3d.dominance = {value}"
  params:
    - name: value
      type: integer
      description: "0=Normal, 1=Reverse"

- id: 3d_darktime
  label: 3D Dark Time
  kind: action
  command: "*3d.darktime = {value}"
  params:
    - name: value
      type: integer
      description: "0=0.65ms,1=1.3ms,2=1.95ms,3=2.5ms"

- id: 3d_syncoffset
  label: 3D Sync Offset
  kind: action
  command: "*3d.syncoffset = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200 (E-Vision 6900); 0 to 60 (Mercury Quad)"

- id: 3d_syncref
  label: 3D Sync Reference
  kind: action
  command: "*3d.syncref = {value}"
  params:
    - name: value
      type: integer
      description: "0=Internal, 1=External"

# === LAMP ===
- id: lamp_mode
  label: Lamp Mode
  kind: action
  command: "*lamp.mode = {value}"
  params:
    - name: value
      type: integer
      description: "0=Dual,1=Single,2=Lamp 1,3=Lamp2 (E-Vision 6900); 0=Eco,1=Normal,2=Dimming (Mercury Quad)"

- id: lamps
  label: Lamps
  kind: action
  command: "*lamps = {value}"
  params:
    - name: value
      type: integer
      description: "0=Dual Lamps, 1=Triple Lamps, 2=Quad Lamps"

- id: power_mode
  label: Power Mode
  kind: action
  command: "*power.mode = {value}"
  params:
    - name: value
      type: integer
      description: "0=Normal, 1=Eco, 2=Custom Power Level"

- id: lamp_power
  label: Lamp Power
  kind: action
  command: "*lamp.power = {value}"
  params:
    - name: value
      type: integer
      description: "0-26 (80% to 100%)"

- id: lamp_pow
  label: Lamp Power (Mercury Quad)
  kind: action
  command: "*lamp.pow = {value}"
  params:
    - name: value
      type: integer
      description: "77-100 (77% to 100%)"

- id: lamp1_hours
  label: Lamp 1 Hours
  kind: query
  command: "*lamp1.hours ?"
  params: []

- id: lamp2_hours
  label: Lamp 2 Hours
  kind: query
  command: "*lamp2.hours ?"
  params: []

- id: lamp3_hours
  label: Lamp 3 Hours
  kind: query
  command: "*lamp3.hours ?"
  params: []

- id: lamp4_hours
  label: Lamp 4 Hours
  kind: query
  command: "*lamp4.hours ?"
  params: []

# === SETUP ===
- id: altitude
  label: Altitude
  kind: action
  command: "*altitude = {value}"
  params:
    - name: value
      type: integer
      description: "1=Off,2=On (E-Vision 6900); 1=On,2=Auto (Mercury Quad)"

- id: cooling_condition
  label: Cooling Condition
  kind: action
  command: "*cooling.condition = {value}"
  params:
    - name: value
      type: integer
      description: "0=Table, 1=Ceiling, 2=Upward, 3=Downward"

- id: orientation
  label: Orientation
  kind: action
  command: "*orientation = {value}"
  params:
    - name: value
      type: integer
      description: "0=Desktop Front,1=Ceiling Front,2=Desktop Rear,3=Ceiling Rear (4=Vertical Up,5=Vertical Down on Mercury Quad). Enter *orientation with no operator to set default (0)."

- id: screen_setting
  label: Screen Setting
  kind: action
  command: "*screen.setting = {value}"
  params:
    - name: value
      type: integer
      description: "0=16:10, 1=16:9, 2=4:3"

- id: screen_format
  label: Screen Format
  kind: action
  command: "*screen.format = {value}"
  params:
    - name: value
      type: integer
      description: "0=16:10, 1=16:9, 2=4:3"

- id: screen_shift
  label: Screen Shift
  kind: action
  command: "*screen.shift = {value}"
  params:
    - name: value
      type: integer
      description: "Depends on screen.format: 16:10=>0, 16:9=>-60 to 60, 4:3=>-160 to 160"

- id: auto_poweroff
  label: Auto Power Off
  kind: action
  command: "*auto.poweroff = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: auto_poweron
  label: Auto Power On
  kind: action
  command: "*auto.poweron = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: schedule_power
  label: Schedule Power
  kind: action
  command: "*schedule.power = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: schedule1_on_day
  label: Schedule 1 On Day
  kind: action
  command: "*schedule1.on.day = {value}"
  params:
    - name: value
      type: integer
      description: "Bit field: Bit6=Sat,Bit5=Fri,Bit4=Thu,Bit3=Wed,Bit2=Tue,Bit1=Mon,Bit0=Sun"

- id: schedule1_off_day
  label: Schedule 1 Off Day
  kind: action
  command: "*schedule1.off.day = {value}"
  params:
    - name: value
      type: integer
      description: "Bit field: Bit6=Sat,Bit5=Fri,Bit4=Thu,Bit3=Wed,Bit2=Tue,Bit1=Mon,Bit0=Sun"

- id: schedule1_on_time
  label: Schedule 1 On Time
  kind: action
  command: "*schedule1.on.time = {value}"
  params:
    - name: value
      type: string
      description: "HH:MM"

- id: schedule1_off_time
  label: Schedule 1 Off Time
  kind: action
  command: "*schedule1.off.time = {value}"
  params:
    - name: value
      type: string
      description: "HH:MM"

- id: schedule2_on_day
  label: Schedule 2 On Day
  kind: action
  command: "*schedule2.on.day = {value}"
  params:
    - name: value
      type: integer
      description: "Bit field: Bit6=Sat,Bit5=Fri,Bit4=Thu,Bit3=Wed,Bit2=Tue,Bit1=Mon,Bit0=Sun"

- id: schedule2_off_day
  label: Schedule 2 Off Day
  kind: action
  command: "*schedule2.off.day = {value}"
  params:
    - name: value
      type: integer
      description: "Bit field: Bit6=Sat,Bit5=Fri,Bit4=Thu,Bit3=Wed,Bit2=Tue,Bit1=Mon,Bit0=Sun"

- id: schedule2_on_time
  label: Schedule 2 On Time
  kind: action
  command: "*schedule2.on.time = {value}"
  params:
    - name: value
      type: string
      description: "HH:MM"

- id: schedule2_off_time
  label: Schedule 2 Off Time
  kind: action
  command: "*schedule2.off.time = {value}"
  params:
    - name: value
      type: string
      description: "HH:MM"

- id: date
  label: Date
  kind: action
  command: "*date = {value}"
  params:
    - name: value
      type: string
      description: "yyyy/MM/dd"

- id: time_zone
  label: Time Zone
  kind: action
  command: "*time.zone = {value}"
  params:
    - name: value
      type: integer
      description: "-11 to +12"

- id: time_adjust
  label: Time Adjust
  kind: action
  command: "*time.adjust = {value}"
  params:
    - name: value
      type: string
      description: "HH:MM"

- id: startup_logo
  label: Startup Logo
  kind: action
  command: "*startup.logo = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: blank_screen
  label: Blank Screen
  kind: action
  command: "*blank.screen = {value}"
  params:
    - name: value
      type: integer
      description: "0=Logo,1=Black,2=Blue (3=White on Mercury Quad)"

- id: trig_1
  label: Trigger 1
  kind: action
  command: "*trig.1 = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off,1=On (E-Vision 6900); 0=Off..13=RS232 off (Mercury Quad, see source)"

- id: trig_2
  label: Trigger 2
  kind: action
  command: "*trig.2 = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off,1=Screen,2=5:4,3=4:3,4=16:10,5=16:9,6=1.88,7=2.35,8=Theaterscope,9=Source,10=Unscaled,11=RS232,12=RS232 on,13=RS232 off"

- id: auto_source
  label: Auto Source
  kind: action
  command: "*auto.source = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: auto_src
  label: Auto Source (E-Vision)
  kind: action
  command: "*auto.src = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: ir_enable
  label: IR Enable
  kind: action
  command: "*ir.enable = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off (Disable), 1=On (Enable)"

- id: ir_code
  label: IR Code
  kind: action
  command: "*ir.code = {value}"
  params:
    - name: value
      type: integer
      description: "00 to 99"

- id: ir_code_rst
  label: IR Code Reset
  kind: action
  command: "*ir.code.rst"
  params: []

- id: control_id
  label: Control ID
  kind: action
  command: "*control.id = {value}"
  params:
    - name: value
      type: integer
      description: "00~99 (0=Disable, 1~99=Enable)"

- id: osd_lang
  label: OSD Language
  kind: action
  command: "*osd.lang = {value}"
  params:
    - name: value
      type: integer
      description: "0=English,1=French,2=Spanish,3=German,4=Portuguese,5=CHS,6=CHT,7=Japanese,8=Korean"

- id: osd_menupos
  label: OSD Menu Position
  kind: action
  command: "*osd.menupos = {value}"
  params:
    - name: value
      type: integer
      description: "0=Center..4=Bottom Right (E-Vision 6900); 0=Top Left..4=Center (Mercury Quad)"

- id: osd_trans
  label: OSD Transparency
  kind: action
  command: "*osd.trans = {value}"
  params:
    - name: value
      type: integer
      description: "0=0%,1=25%,2=50%,3=75%"

- id: osd_timer
  label: OSD Timer
  kind: action
  command: "*osd.timer = {value}"
  params:
    - name: value
      type: integer
      description: "0=Always On,1=10s,2=30s,3=60s"

- id: osd_msgbox
  label: OSD Message Box
  kind: action
  command: "*osd.msgbox = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: recall_mem
  label: Recall Memory
  kind: action
  command: "*recall.mem = {value}"
  params:
    - name: value
      type: integer
      description: "0=Preset A,1=Preset B,2=Preset C,3=Preset D,4=Default"

- id: save_mem
  label: Save Memory
  kind: action
  command: "*save.mem = {value}"
  params:
    - name: value
      type: integer
      description: "0=Preset A,1=Preset B,2=Preset C,3=Preset D"

# === NETWORK ===
- id: network_mode
  label: Network Mode
  kind: action
  command: "*network.mode = {value}"
  params:
    - name: value
      type: integer
      description: "0=Projector Control, 1=Service"

- id: lan_power
  label: LAN Power
  kind: action
  command: "*lan.power = {value}"
  params:
    - name: value
      type: integer
      description: "0=On, 1=Off"

- id: lan_dhcp
  label: LAN DHCP
  kind: action
  command: "*lan.dhcp = {value}"
  params:
    - name: value
      type: integer
      description: "0=On, 1=Off"

- id: lan_ip
  label: LAN IP Address
  kind: action
  command: "*lan.ip = {value}"
  params:
    - name: value
      type: string
      description: "xxx.xxx.xxx.xxx"

- id: lan_subnet
  label: LAN Subnet
  kind: action
  command: "*lan.subnet = {value}"
  params:
    - name: value
      type: string
      description: "xxx.xxx.xxx.xxx"

- id: lan_gateway
  label: LAN Gateway
  kind: action
  command: "*lan.gateway = {value}"
  params:
    - name: value
      type: string
      description: "xxx.xxx.xxx.xxx"

- id: lan_dns
  label: LAN DNS
  kind: action
  command: "*lan.dns = {value}"
  params:
    - name: value
      type: string
      description: "xxx.xxx.xxx.xxx"

- id: lan_mac
  label: LAN MAC Address
  kind: query
  command: "*lan.mac ?"
  params: []

- id: lan_amx
  label: LAN AMX
  kind: action
  command: "*lan.amx = {value}"
  params:
    - name: value
      type: integer
      description: "0=On, 1=Off"

# === PIP ===
- id: pip_mode
  label: PIP Mode
  kind: action
  command: "*pip.mode = {value}"
  params:
    - name: value
      type: integer
      description: "0=On, 1=Off"

- id: pip_input
  label: PIP Input
  kind: action
  command: "*pip.input = {value}"
  params:
    - name: value
      type: integer
      description: "0=HDMI 1,1=HDMI 2,2=RGB(VGA),3=COMP,4=DisplayPort,5=HDBaseT,6=3G-SDI"

- id: pip_position
  label: PIP Position
  kind: action
  command: "*pip.position = {value}"
  params:
    - name: value
      type: integer
      description: "0=TopLeft,1=TopRight,2=BottomLeft,3=BottomRight,4=PBP"

# === INFORMATION ===
- id: model_name
  label: Model Name Query
  kind: query
  command: "*model.name ?"
  params: []

- id: serial
  label: Serial Number Query
  kind: query
  command: "*serial ?"
  params: []

- id: sw_version
  label: Software Version Query
  kind: query
  command: "*sw.version ?"
  params: []

- id: act_source
  label: Active Source Query
  kind: query
  command: "*act.source ?"
  params: []

- id: signal
  label: Signal Query
  kind: query
  command: "*signal ?"
  params: []

- id: h_refresh
  label: Horizontal Refresh Query
  kind: query
  command: "*h.refresh ?"
  params: []

- id: v_refresh
  label: Vertical Refresh Query
  kind: query
  command: "*v.refresh ?"
  params: []

- id: pixel_clock
  label: Pixel Clock Query
  kind: query
  command: "*pixel.clock ?"
  params: []

- id: brt_lock_pw
  label: Brightness Lock Password
  kind: query
  command: "*brt.lock.pw ?"
  params: []

- id: brt_lock_pw_set
  label: Brightness Lock Password Set
  kind: action
  command: "*brt.lock.pw.set = {value}"
  params:
    - name: value
      type: string
      description: "XXXX (4 digits = new user mode password)"

- id: brt_lock_level
  label: Brightness Lock Level
  kind: action
  command: "*brt.lock.level = {value}"
  params:
    - name: value
      type: integer
      description: "0=Dual Lamps, 1=Triple Lamps, 2=Quad Lamps"

- id: brt_lock_rst
  label: Brightness Lock Reset
  kind: action
  command: "*brt.lock.rst"
  params: []

# === MISCELLANEOUS ===
- id: atmos_alti
  label: Atmosphere Altitude
  kind: query
  command: "*atmos.alti ?"
  params: []

- id: atmos_pressure
  label: Atmosphere Pressure
  kind: query
  command: "*atmos.pressure ?"
  params: []

- id: ac_voltage
  label: AC Voltage
  kind: action
  command: "*ac.voltage = {value}"
  params:
    - name: value
      type: integer
      description: "0=90~150, 1=160~264"

- id: ti
  label: Internal Temperature
  kind: query
  command: "*ti ?"
  params: []

- id: tc
  label: Coolant Temperature
  kind: query
  command: "*tc ?"
  params: []

- id: fans
  label: Fans Status
  kind: query
  command: "*fans ?"
  params: []

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "*factory.reset"
  params: []

- id: power
  label: Power
  kind: action
  command: "*power = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: shutter
  label: Shutter
  kind: action
  command: "*shutter = {value}"
  params:
    - name: value
      type: integer
      description: "0=Open, 1=Close"

- id: pic_mute
  label: Picture Mute
  kind: action
  command: "*pic.mute = {value}"
  params:
    - name: value
      type: integer
      description: "0=Open, 1=Close"

- id: total_hours
  label: Total Hours
  kind: query
  command: "*total.hours ?"
  params: []

- id: status
  label: Status
  kind: query
  command: "*status ?"
  params: []

- id: errcode
  label: Error Code
  kind: query
  command: "*errcode ?"
  params: []
```

## Feedbacks
```yaml
- id: command_ack
  label: Command Acknowledged
  type: string
  description: "Projector returns 'ACK <command> = <value>' or 'ack <command> = <value>' on success"

- id: command_nak
  label: Command Not Acknowledged
  type: string
  description: "Projector returns 'NAK <description>' or 'nack <description>' on syntax error or other problem"

- id: power_state
  label: Power State
  type: enum
  values: [off, on]
  description: "Queried via *power ?"

- id: projector_status
  label: Projector Status
  type: enum
  values: [power_off, power_on, standby, warm_up, imaging, cooling, error]
  description: "Queried via *status ? - E-Vision 6900: 0=Power Off,1=Power On; Mercury Quad: 0=Standby..4=Error"

- id: input_state
  label: Input State
  type: enum
  values: [hdmi_i, hdmi_ii, dvi_d, vga, component, hdbaseT]
  description: "Queried via *input ? (E-Vision 6900 values)"
```

## Variables
```yaml
# All settable parameters are represented as Actions above (e.g. brightness,
# contrast, gamma, keystone, color temp). Each supports set (=), get (?),
# inc (+), and dec (-) operators. No separate variable entries required.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source. The projector
# only responds to commands; no event push mechanism described.
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - factory.reset
  - orientation
  - power
interlocks:
  - description: "Lens commands only work if projector is switched on and lens is unlocked. If lens.lock = 1, most lens commands are disabled (exceptions: lens.type, lens.save, lens.clear on Mercury Quad)."
  - description: "Only one control path (serial OR network) should be used at a time. Simultaneous use may cause unpredictable behavior."
# UNRESOLVED: no explicit power-on sequencing procedure stated in source.
```

## Notes
- Commands are ASCII text strings starting with `*` and ending with Carriage Return (code 13).
- Format: `*command operator <value>` — spaces required before operator and value. Missing spaces = invalid (e.g. `*orientation=3` is rejected).
- To set a default value, enter command name with no operator (e.g. `*orientation` sets orientation to 0).
- Must wait for complete response before sending another command.
- Success response begins with `ACK` or `ack`; failure begins with `NAK` or `nack` followed by error description.
- Default IP address: 192.168.0.100; default TCP port: 7000.
- Serial: 9600 baud, 8 data bits.
- Source references two model variants in command tables: E-Vision 6900 and Mercury Quad. Per-model value ranges differ for many commands.

<!-- UNRESOLVED: parity, stop bits, and flow control for RS-232 not stated in source. -->
<!-- UNRESOLVED: exact M-Vision Laser model variants (18K, 21000 II, 30000 WU, 27000 WU) not differentiated in command tables — source uses E-Vision 6900 / Mercury Quad as reference columns. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: no authentication/login procedure documented — inferred as none. -->
````

Spec generated. 254 actions enumerated — every command row from source covered. Gaps marked UNRESOLVED per policy (parity/stop bits/flow control, firmware version, exact model variants).

## Provenance

```yaml
source_domains:
  - digitalprojection.co.uk
  - teledynelabs.com
  - github.com
  - gitlab.com
  - advanced-image-sensor-interface.readthedocs.io
source_urls:
  - https://digitalprojection.co.uk/dpdownloads/Protocol/Simplified-Protocol-Guide-Rev-H.pdf
  - https://www.teledynelabs.com/en-us/resources/Documents/Manuals-Instructions/81400805-C-Protocol-Manager-User-Guide.pdf
  - https://github.com/janwilmans/gvcp-tools
  - https://gitlab.com/wireshark/wireshark/-/issues/19494
  - https://advanced-image-sensor-interface.readthedocs.io/en/latest/protocols_index.html
retrieved_at: 2026-07-11T12:12:25.665Z
last_checked_at: 2026-07-12T08:59:03.246Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T08:59:03.246Z
matched_actions: 253
action_count: 253
confidence: medium
summary: "All 253 spec actions matched verbatim in source with correct parameter ranges; transport parameters (TCP 7000, 9600 baud, 8 data bits) confirmed; source command catalogue fully represented. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model variants within the M-Vision Laser Series not enumerated in source. Firmware version compatibility not stated."
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "no unsolicited notifications documented in source. The projector"
- "no multi-step command sequences documented in source."
- "no explicit power-on sequencing procedure stated in source."
- "parity, stop bits, and flow control for RS-232 not stated in source."
- "exact M-Vision Laser model variants (18K, 21000 II, 30000 WU, 27000 WU) not differentiated in command tables — source uses E-Vision 6900 / Mercury Quad as reference columns."
- "firmware version compatibility not stated."
- "no authentication/login procedure documented — inferred as none."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
