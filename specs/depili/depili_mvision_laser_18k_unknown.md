---
spec_id: admin/depili-mvision-laser-18k
schema_version: ai4av-public-spec-v1
revision: 1
title: "Depili MVision Laser 18K Control Spec"
manufacturer: Depili
model_family: "MVision Laser 18K"
aliases: []
compatible_with:
  manufacturers:
    - Depili
  models:
    - "MVision Laser 18K"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - digitalprojection.co.uk
source_urls:
  - https://digitalprojection.co.uk/dpdownloads/Protocol/Simplified-Protocol-Guide-Rev-H.pdf
retrieved_at: 2026-08-01T22:05:09.436Z
last_checked_at: 2026-08-05T08:16:53.855Z
generated_at: 2026-08-05T08:16:53.855Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The refined source documents the protocol family across two model columns (E-Vision 6900 and Mercury Quad) but does not explicitly map the MVision Laser 18K to either column. Value enums/ranges below are taken verbatim from the source; the applicable column for this exact model is not confirmed."
  - "serial parity, stop bits, and flow control not stated in source"
  - "firmware version compatibility not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "applicable status enum column for this exact model not confirmed in source"
  - "none additional from source"
  - "no event/unsolicited-notification scheme stated in source"
  - "no macros stated in source"
  - "no power-on sequencing or hardware interlock procedures stated in source"
  - "source lists two model columns (E-Vision 6900, Mercury Quad); the MVision Laser 18K is not explicitly mapped to either — value enums/ranges may differ for this exact model."
  - "serial parity, stop bits, flow control not stated in source."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:16:53.855Z
  matched_actions: 253
  action_count: 253
  confidence: medium
  summary: "Every one of the 253 spec commands is present verbatim in the source tables and every transport value is sourced. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-01
---

# Depili MVision Laser 18K Control Spec

## Summary
Depili MVision Laser 18K projector controlled via RS-232 serial or LAN (TCP) interface using ASCII text commands prefixed with `*` and terminated by a Carriage Return. Commands support set (`=`), get (`?`), increment (`+`), decrement (`-`), and execute operators. The device acknowledges with `ACK`/`ack` on success and `NAK`/`nack` on failure.

<!-- UNRESOLVED: The refined source documents the protocol family across two model columns (E-Vision 6900 and Mercury Quad) but does not explicitly map the MVision Laser 18K to either column. Value enums/ranges below are taken verbatim from the source; the applicable column for this exact model is not confirmed. -->
<!-- UNRESOLVED: serial parity, stop bits, and flow control not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
# Source states both RS232 and LAN (TCP) interfaces are supported.
# "Only one control path at a time should be used for protocol control."
# Default IP 192.168.0.100, TCP port 7000 (stated). Baud 9600, data bits 8 (stated).
protocols:
  - tcp
  - serial
addressing:
  port: 7000
  # default_ip: 192.168.0.100 (stated in source, not a base_url pattern)
serial:
  baud_rate: 9600
  data_bits: 8
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred: power command (0=Off,1=On) present
  - routable   # inferred: input select command present
  - queryable  # inferred: get (?) operator documented on all commands
  - levelable  # inferred: brightness/contrast/saturation/etc. level commands present
```

## Actions
```yaml
# Command format (verbatim from source): "*command operator <value>"
# Operators: Set "= <value>", Get "?", Inc "+", Dec "-", Execute (bare command).
# Spaces REQUIRED before operator and before value. Terminate with CR (code 13).
# Every command below supports all operators (set/get/inc/dec/exe) per source tables.
# The command field shows the SET form; get uses "?", inc "+", dec "-", execute bare.
actions:
  # ---- INPUT ----
  - id: input
    label: Input Select
    kind: action
    command: "*input = {value}"
    params:
      - name: value
        type: integer
        description: "E-Vision 6900: 0=HDMI I,1=HDMI II,2=DVI-D,3=VGA,4=Component,5=HDBaseT. Mercury Quad: 0=HDMI1,1=HDMI2,2=DisplayPort,3=HDBaseT,4=3G-SDI."
  - id: test_pattern
    label: Test Pattern
    kind: action
    command: "*test.pattern = {value}"
    params:
      - name: value
        type: integer
        description: "0=Off,1=White,2=Black,3=Red,4=Green,5=Blue,6=Checkerboard,7=CrossHatch,8=V Burst,9=H Burst,10=Color Bar,11=Hramp/Plunge."
  # ---- LENS ----
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
        description: "E-Vision 6900: 0 to 9. Mercury Quad: 1 to 10. Get returns zero/one string of empty/occupied slots."
  - id: lens_save
    label: Lens Save
    kind: action
    command: "*lens.save = {value}"
    params:
      - name: value
        type: integer
        description: "E-Vision 6900: 0 to 9. Mercury Quad: 1 to 10."
  - id: lens_clear
    label: Lens Clear
    kind: action
    command: "*lens.clear = {value}"
    params:
      - name: value
        type: integer
        description: "E-Vision 6900: 0 to 9. Mercury Quad: 1 to 10."
  - id: lens_type
    label: Lens Type
    kind: action
    command: "*lens.type = {value}"
    params:
      - name: value
        type: integer
        description: "0=non-UST Lens,1=UST Lens."
  - id: lens_lock
    label: Lens Lock
    kind: action
    command: "*lens.lock = {value}"
    params:
      - name: value
        type: integer
        description: "0=Off,1=On. When 1, most other lens commands disabled."
  # ---- IMAGE ----
  - id: pic_mode
    label: Picture Mode
    kind: action
    command: "*pic.mode = {value}"
    params:
      - name: value
        type: integer
        description: "0=High Bright,1=Presentation,2=Video."
  - id: dblack
    label: Dynamic Black
    kind: action
    command: "*dblack = {value}"
    params:
      - name: value
        type: integer
        description: "0=Off,1=On. Not available in 3D."
  - id: gamma
    label: Gamma
    kind: action
    command: "*gamma = {value}"
    params:
      - name: value
        type: integer
        description: "0=1.0,1=1.8,2=2.0,3=2.2,4=2.35,5=2.5,6=S-curve (E-Vision 6900)."
  - id: brightness
    label: Brightness
    kind: action
    command: "*brightness = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: contrast
    label: Contrast
    kind: action
    command: "*contrast = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: saturation
    label: Saturation
    kind: action
    command: "*saturation = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200. E-Vision 6900 only accepts if input is YUV."
  - id: hue
    label: Hue
    kind: action
    command: "*hue = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200. E-Vision 6900 only accepts if input is YUV."
  - id: sharpness
    label: Sharpness
    kind: action
    command: "*sharpness = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 15 (Mercury Quad) / 0 to 31 (E-Vision 6900)."
  - id: nr
    label: Noise Reduction
    kind: action
    command: "*nr = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 15."
  - id: nr_temporal
    label: NR Temporal
    kind: action
    command: "*nr.temporal = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 3."
  - id: nr_block
    label: NR Block
    kind: action
    command: "*nr.block = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 3."
  - id: nr_mosquito
    label: NR Mosquito
    kind: action
    command: "*nr.mosquito = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 3."
  - id: nr_hori
    label: NR Horizontal
    kind: action
    command: "*nr.hori = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 3."
  - id: nr_vert
    label: NR Vertical
    kind: action
    command: "*nr.vert = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 3."
  - id: nr_reset
    label: NR Reset
    kind: action
    command: "*nr.reset = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 3."
  - id: h_position
    label: Horizontal Position
    kind: action
    command: "*h.position = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: v_position
    label: Vertical Position
    kind: action
    command: "*v.position = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: vga_phase
    label: VGA Phase
    kind: action
    command: "*vga.phase = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 31."
  - id: tracking
    label: Tracking
    kind: action
    command: "*tracking = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: sync_level
    label: Sync Level
    kind: action
    command: "*sync.level = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: freeze
    label: Freeze
    kind: action
    command: "*freeze = {value}"
    params:
      - name: value
        type: integer
        description: "0=Off,1=On."
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
  # ---- COLOR ----
  - id: color_space
    label: Color Space
    kind: action
    command: "*color.space = {value}"
    params:
      - name: value
        type: integer
        description: "0=Auto,1=YPbPr,2=YCbCr,3=RGB-PC,4=RGB-Video."
  - id: color_temp
    label: Color Temperature
    kind: action
    command: "*color.temp = {value}"
    params:
      - name: value
        type: integer
        description: "E-Vision 6900: 0=Native,1=5400K,2=6500K,3=7500K,4=9300K. Mercury Quad: 0=3200K,...,5=Native."
  - id: color_mode
    label: Color Mode
    kind: action
    command: "*color.mode = {value}"
    params:
      - name: value
        type: integer
        description: "0=ColorMax,1=Manual Color Matching,2=Color Temperature,3=Gains and Lifts."
  - id: color_max
    label: Color Max
    kind: action
    command: "*color.max = {value}"
    params:
      - name: value
        type: integer
        description: "0=REC709,1=EBU,2=SMPTE,3=Native,4=User1,5=User2."
  - id: red_lift
    label: Red Lift
    kind: action
    command: "*red.lift = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: green_lift
    label: Green Lift
    kind: action
    command: "*green.lift = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: blue_lift
    label: Blue Lift
    kind: action
    command: "*blue.lift = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: red_gain
    label: Red Gain
    kind: action
    command: "*red.gain = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: green_gain
    label: Green Gain
    kind: action
    command: "*green.gain = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: blue_gain
    label: Blue Gain
    kind: action
    command: "*blue.gain = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
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
        description: "0=Off,1=On."
  - id: user_std_rx
    label: User Std Red X
    kind: action
    command: "*user.std.rx = {value}"
    params:
      - name: value
        type: integer
        description: "550 to 750. Values are multiples of 1000."
  - id: user_std_ry
    label: User Std Red Y
    kind: action
    command: "*user.std.ry = {value}"
    params:
      - name: value
        type: integer
        description: "250 to 450."
  - id: user_std_gx
    label: User Std Green X
    kind: action
    command: "*user.std.gx = {value}"
    params:
      - name: value
        type: integer
        description: "200 to 400."
  - id: user_std_gy
    label: User Std Green Y
    kind: action
    command: "*user.std.gy = {value}"
    params:
      - name: value
        type: integer
        description: "400 to 750."
  - id: user_std_bx
    label: User Std Blue X
    kind: action
    command: "*user.std.bx = {value}"
    params:
      - name: value
        type: integer
        description: "50 to 250."
  - id: user_std_by
    label: User Std Blue Y
    kind: action
    command: "*user.std.by = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 120."
  - id: user_std_wx
    label: User Std White X
    kind: action
    command: "*user.std.wx = {value}"
    params:
      - name: value
        type: integer
        description: "200 to 400."
  - id: user_std_wy
    label: User Std White Y
    kind: action
    command: "*user.std.wy = {value}"
    params:
      - name: value
        type: integer
        description: "250 to 450."
  - id: user_std_reset
    label: User Std Reset
    kind: action
    command: "*user.std.reset"
    params: []
  - id: user_target_rx
    label: User Target Red X
    kind: action
    command: "*user.target.rx = {value}"
    params:
      - name: value
        type: integer
        description: "550 to 750. Multiples of 1000."
  - id: user_target_ry
    label: User Target Red Y
    kind: action
    command: "*user.target.ry = {value}"
    params:
      - name: value
        type: integer
        description: "250 to 450."
  - id: user_target_gx
    label: User Target Green X
    kind: action
    command: "*user.target.gx = {value}"
    params:
      - name: value
        type: integer
        description: "200 to 400."
  - id: user_target_gy
    label: User Target Green Y
    kind: action
    command: "*user.target.gy = {value}"
    params:
      - name: value
        type: integer
        description: "400 to 750."
  - id: user_target_bx
    label: User Target Blue X
    kind: action
    command: "*user.target.bx = {value}"
    params:
      - name: value
        type: integer
        description: "50 to 250."
  - id: user_target_by
    label: User Target Blue Y
    kind: action
    command: "*user.target.by = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 120."
  - id: user_target_wx
    label: User Target White X
    kind: action
    command: "*user.target.wx = {value}"
    params:
      - name: value
        type: integer
        description: "200 to 400."
  - id: user_target_wy
    label: User Target White Y
    kind: action
    command: "*user.target.wy = {value}"
    params:
      - name: value
        type: integer
        description: "250 to 450."
  - id: user_target_cx
    label: User Target Cyan X
    kind: action
    command: "*user.target.cx = {value}"
    params:
      - name: value
        type: integer
        description: "125 to 325."
  - id: user_target_cy
    label: User Target Cyan Y
    kind: action
    command: "*user.target.cy = {value}"
    params:
      - name: value
        type: integer
        description: "225 to 425."
  - id: user_target_mx
    label: User Target Magenta X
    kind: action
    command: "*user.target.mx = {value}"
    params:
      - name: value
        type: integer
        description: "200 to 400."
  - id: user_target_my
    label: User Target Magenta Y
    kind: action
    command: "*user.target.my = {value}"
    params:
      - name: value
        type: integer
        description: "50 to 250."
  - id: user_target_yx
    label: User Target Yellow X
    kind: action
    command: "*user.target.yx = {value}"
    params:
      - name: value
        type: integer
        description: "300 to 500."
  - id: user_target_yy
    label: User Target Yellow Y
    kind: action
    command: "*user.target.yy = {value}"
    params:
      - name: value
        type: integer
        description: "400 to 600."
  - id: user_target_reset
    label: User Target Reset
    kind: action
    command: "*user.target.reset"
    params: []
  - id: user2_target_rx
    label: User2 Target Red X
    kind: action
    command: "*user2.target.rx = {value}"
    params:
      - name: value
        type: integer
        description: "550 to 750. Multiples of 1000."
  - id: user2_target_ry
    label: User2 Target Red Y
    kind: action
    command: "*user2.target.ry = {value}"
    params:
      - name: value
        type: integer
        description: "250 to 450."
  - id: user2_target_gx
    label: User2 Target Green X
    kind: action
    command: "*user2.target.gx = {value}"
    params:
      - name: value
        type: integer
        description: "200 to 400."
  - id: user2_target_gy
    label: User2 Target Green Y
    kind: action
    command: "*user2.target.gy = {value}"
    params:
      - name: value
        type: integer
        description: "400 to 750."
  - id: user2_target_bx
    label: User2 Target Blue X
    kind: action
    command: "*user2.target.bx = {value}"
    params:
      - name: value
        type: integer
        description: "50 to 250."
  - id: user2_target_by
    label: User2 Target Blue Y
    kind: action
    command: "*user2.target.by = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 120."
  - id: user2_target_wx
    label: User2 Target White X
    kind: action
    command: "*user2.target.wx = {value}"
    params:
      - name: value
        type: integer
        description: "200 to 400."
  - id: user2_target_wy
    label: User2 Target White Y
    kind: action
    command: "*user2.target.wy = {value}"
    params:
      - name: value
        type: integer
        description: "250 to 450."
  - id: user2_target_cx
    label: User2 Target Cyan X
    kind: action
    command: "*user2.target.cx = {value}"
    params:
      - name: value
        type: integer
        description: "125 to 325."
  - id: user2_target_cy
    label: User2 Target Cyan Y
    kind: action
    command: "*user2.target.cy = {value}"
    params:
      - name: value
        type: integer
        description: "225 to 425."
  - id: user2_target_mx
    label: User2 Target Magenta X
    kind: action
    command: "*user2.target.mx = {value}"
    params:
      - name: value
        type: integer
        description: "200 to 400."
  - id: user2_target_my
    label: User2 Target Magenta Y
    kind: action
    command: "*user2.target.my = {value}"
    params:
      - name: value
        type: integer
        description: "50 to 250."
  - id: user2_target_yx
    label: User2 Target Yellow X
    kind: action
    command: "*user2.target.yx = {value}"
    params:
      - name: value
        type: integer
        description: "300 to 500."
  - id: user2_target_yy
    label: User2 Target Yellow Y
    kind: action
    command: "*user2.target.yy = {value}"
    params:
      - name: value
        type: integer
        description: "400 to 600."
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
        description: "0 to 200."
  - id: hsg_hue_g
    label: HSG Hue Green
    kind: action
    command: "*hsg.hue.g = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_hue_b
    label: HSG Hue Blue
    kind: action
    command: "*hsg.hue.b = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_hue_c
    label: HSG Hue Cyan
    kind: action
    command: "*hsg.hue.c = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_hue_m
    label: HSG Hue Magenta
    kind: action
    command: "*hsg.hue.m = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_hue_y
    label: HSG Hue Yellow
    kind: action
    command: "*hsg.hue.y = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_sat_r
    label: HSG Saturation Red
    kind: action
    command: "*hsg.sat.r = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_sat_g
    label: HSG Saturation Green
    kind: action
    command: "*hsg.sat.g = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_sat_b
    label: HSG Saturation Blue
    kind: action
    command: "*hsg.sat.b = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_sat_c
    label: HSG Saturation Cyan
    kind: action
    command: "*hsg.sat.c = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_sat_m
    label: HSG Saturation Magenta
    kind: action
    command: "*hsg.sat.m = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_sat_y
    label: HSG Saturation Yellow
    kind: action
    command: "*hsg.sat.y = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_gain_r
    label: HSG Gain Red
    kind: action
    command: "*hsg.gain.r = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_gain_g
    label: HSG Gain Green
    kind: action
    command: "*hsg.gain.g = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_gain_b
    label: HSG Gain Blue
    kind: action
    command: "*hsg.gain.b = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_gain_c
    label: HSG Gain Cyan
    kind: action
    command: "*hsg.gain.c = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_gain_m
    label: HSG Gain Magenta
    kind: action
    command: "*hsg.gain.m = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_gain_y
    label: HSG Gain Yellow
    kind: action
    command: "*hsg.gain.y = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_white_r
    label: HSG White Red
    kind: action
    command: "*hsg.white.r = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_white_g
    label: HSG White Green
    kind: action
    command: "*hsg.white.g = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_white_b
    label: HSG White Blue
    kind: action
    command: "*hsg.white.b = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200."
  - id: hsg_reset
    label: HSG Reset
    kind: action
    command: "*hsg.reset"
    params: []
  # ---- GEOMETRY ----
  - id: aspect_ratio
    label: Aspect Ratio
    kind: action
    command: "*aspect.ratio = {value}"
    params:
      - name: value
        type: integer
        description: "0=5:4,1=4:3,2=16:10,3=16:9,4=1.88,5=2.35,6=Theaterscope,7=Source,8=Unscaled."
  - id: digi_zoom
    label: Digital Zoom
    kind: action
    command: "*digi.zoom = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 100."
  - id: digi_pan
    label: Digital Pan
    kind: action
    command: "*digi.pan = {value}"
    params:
      - name: value
        type: integer
        description: "-320 to +320."
  - id: digi_pan_bound
    label: Digital Pan Bound
    kind: action
    command: "*digi.pan.bound = {value}"
    params:
      - name: value
        type: integer
        description: "-320 to +320."
  - id: digi_scan
    label: Digital Scan
    kind: action
    command: "*digi.scan = {value}"
    params:
      - name: value
        type: integer
        description: "-200 to +200."
  - id: digi_scan_bound
    label: Digital Scan Bound
    kind: action
    command: "*digi.scan.bound = {value}"
    params:
      - name: value
        type: integer
        description: "-200 to +200."
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
        description: "E-Vision 6900: 0=Off,1=On. Mercury Quad: 0=Off,1=Crop,2=Zoom."
  - id: h_keystone
    label: Horizontal Keystone
    kind: action
    command: "*h.keystone = {value}"
    params:
      - name: value
        type: integer
        description: "-30 to +30 (E-Vision 6900) / -600 to +600 (Mercury Quad)."
  - id: v_keystone
    label: Vertical Keystone
    kind: action
    command: "*v.keystone = {value}"
    params:
      - name: value
        type: integer
        description: "-30 to +30 (E-Vision 6900) / -400 to +400 (Mercury Quad)."
  - id: rotation
    label: Rotation
    kind: action
    command: "*rotation = {value}"
    params:
      - name: value
        type: integer
        description: "-100 to +100."
  - id: h_pin_barrel
    label: Horizontal Pin/Barrel
    kind: action
    command: "*h.pin.barrel = {value}"
    params:
      - name: value
        type: integer
        description: "-150 to +300."
  - id: v_pin_barrel
    label: Vertical Pin/Barrel
    kind: action
    command: "*v.pin.barrel = {value}"
    params:
      - name: value
        type: integer
        description: "-150 to +300."
  - id: 4corner_ulx
    label: Four Corner Upper Left X
    kind: action
    command: "*4corner.ulx = {value}"
    params:
      - name: value
        type: integer
        description: "-192 to +192."
  - id: 4corner_uly
    label: Four Corner Upper Left Y
    kind: action
    command: "*4corner.uly = {value}"
    params:
      - name: value
        type: integer
        description: "-120 to +120."
  - id: 4corner_urx
    label: Four Corner Upper Right X
    kind: action
    command: "*4corner.urx = {value}"
    params:
      - name: value
        type: integer
        description: "-192 to +192."
  - id: 4corner_ury
    label: Four Corner Upper Right Y
    kind: action
    command: "*4corner.ury = {value}"
    params:
      - name: value
        type: integer
        description: "-120 to +120."
  - id: 4corner_llx
    label: Four Corner Lower Left X
    kind: action
    command: "*4corner.llx = {value}"
    params:
      - name: value
        type: integer
        description: "-192 to +192."
  - id: 4corner_lly
    label: Four Corner Lower Left Y
    kind: action
    command: "*4corner.lly = {value}"
    params:
      - name: value
        type: integer
        description: "-120 to +120."
  - id: 4corner_lrx
    label: Four Corner Lower Right X
    kind: action
    command: "*4corner.lrx = {value}"
    params:
      - name: value
        type: integer
        description: "-192 to +192."
  - id: 4corner_lry
    label: Four Corner Lower Right Y
    kind: action
    command: "*4corner.lry = {value}"
    params:
      - name: value
        type: integer
        description: "-120 to +120."
  - id: arc_top
    label: Arc Top
    kind: action
    command: "*arc.top = {value}"
    params:
      - name: value
        type: integer
        description: "-150 to +150."
  - id: arc_bottom
    label: Arc Bottom
    kind: action
    command: "*arc.bottom = {value}"
    params:
      - name: value
        type: integer
        description: "-150 to +150."
  - id: arc_left
    label: Arc Left
    kind: action
    command: "*arc.left = {value}"
    params:
      - name: value
        type: integer
        description: "-150 to +150."
  - id: arc_right
    label: Arc Right
    kind: action
    command: "*arc.right = {value}"
    params:
      - name: value
        type: integer
        description: "-150 to +150."
  - id: blanking_top
    label: Blanking Top
    kind: action
    command: "*blanking.top = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 360."
  - id: blanking_bottom
    label: Blanking Bottom
    kind: action
    command: "*blanking.bottom = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 360."
  - id: blanking_left
    label: Blanking Left
    kind: action
    command: "*blanking.left = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 534."
  - id: blanking_right
    label: Blanking Right
    kind: action
    command: "*blanking.right = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 534."
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
        description: "0=none,1=Keystone,2=Four Corner,3=Rotation,4=Pin/Barrel,5=Arc."
  - id: cust_wp_write
    label: Custom Warp Write
    kind: action
    command: "*cust.wp.write = {value}"
    params:
      - name: value
        type: integer
        description: "1=User 1 file,2=User 2 file."
  - id: cust_wp_clear
    label: Custom Warp Clear
    kind: action
    command: "*cust.wp.clear = {value}"
    params:
      - name: value
        type: integer
        description: "1=User 1 file,2=User 2 file."
  - id: cust_wp_send
    label: Custom Warp Send
    kind: action
    command: "*cust.wp.send = {value}"
    params:
      - name: value
        type: integer
        description: "0=transfer off,1=User 1 file,2=User 2 file."
  - id: cust_wp_ck_sum
    label: Custom Warp Checksum
    kind: query
    command: "*cust.wp.ck.sum ?"
    params: []
  - id: warp_cust
    label: Warp Custom
    kind: action
    command: "*warp.cust = {value}"
    params:
      - name: value
        type: integer
        description: "0=Off,1=User 1,2=User 2."
  # ---- EDGE BLEND ----
  - id: eb_stat
    label: Edge Blend Status
    kind: action
    command: "*eb.stat = {value}"
    params:
      - name: value
        type: integer
        description: "0=Off,1=On."
  - id: eb_adl
    label: Edge Blend ADL
    kind: action
    command: "*eb.adl = {value}"
    params:
      - name: value
        type: integer
        description: "0=Off,1=On."
  - id: eb_top
    label: Edge Blend Top
    kind: action
    command: "*eb.top = {value}"
    params:
      - name: value
        type: integer
        description: "0, 100 to 500."
  - id: eb_bottom
    label: Edge Blend Bottom
    kind: action
    command: "*eb.bottom = {value}"
    params:
      - name: value
        type: integer
        description: "0, 100 to 500."
  - id: eb_left
    label: Edge Blend Left
    kind: action
    command: "*eb.left = {value}"
    params:
      - name: value
        type: integer
        description: "0, 100 to 800."
  - id: eb_right
    label: Edge Blend Right
    kind: action
    command: "*eb.right = {value}"
    params:
      - name: value
        type: integer
        description: "0, 100 to 800."
  - id: eb_blu_top
    label: Edge Blend Blanking Top
    kind: action
    command: "*eb.blu.top = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 32."
  - id: eb_blu_btm
    label: Edge Blend Blanking Bottom
    kind: action
    command: "*eb.blu.btm = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 32."
  - id: eb_blu_left
    label: Edge Blend Blanking Left
    kind: action
    command: "*eb.blu.left = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 32."
  - id: eb_blu_right
    label: Edge Blend Blanking Right
    kind: action
    command: "*eb.blu.right = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 32."
  - id: eb_all
    label: Edge Blend All
    kind: action
    command: "*eb.all = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 255."
  - id: eb_red
    label: Edge Blend Red
    kind: action
    command: "*eb.red = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 255."
  - id: eb_green
    label: Edge Blend Green
    kind: action
    command: "*eb.green = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 255."
  - id: eb_blue
    label: Edge Blend Blue
    kind: action
    command: "*eb.blue = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 255."
  - id: eb_reset
    label: Edge Blend Reset
    kind: action
    command: "*eb.reset"
    params: []
  # ---- 3D ----
  - id: 3d_format
    label: 3D Format
    kind: action
    command: "*3d.format = {value}"
    params:
      - name: value
        type: integer
        description: "0=Off,1=Auto,2=Side-By-Side(Half),3=Top-And-Bottom,4=Frame Sequential (E-Vision) / Dual-Pipe (Mercury Quad, with 5=Frame Sequential)."
  - id: 3d_dlplink
    label: 3D DLP Link
    kind: action
    command: "*3d.dlplink = {value}"
    params:
      - name: value
        type: integer
        description: "0=Off,1=On."
  - id: 3d_dominance
    label: 3D Dominance
    kind: action
    command: "*3d.dominance = {value}"
    params:
      - name: value
        type: integer
        description: "0=Normal,1=Reverse."
  - id: 3d_darktime
    label: 3D Dark Time
    kind: action
    command: "*3d.darktime = {value}"
    params:
      - name: value
        type: integer
        description: "0=0.65ms,1=1.3ms,2=1.95ms,3=2.5ms."
  - id: 3d_syncoffset
    label: 3D Sync Offset
    kind: action
    command: "*3d.syncoffset = {value}"
    params:
      - name: value
        type: integer
        description: "0 to 200 (E-Vision 6900) / 0 to 60 (Mercury Quad)."
  - id: 3d_syncref
    label: 3D Sync Reference
    kind: action
    command: "*3d.syncref = {value}"
    params:
      - name: value
        type: integer
        description: "0=Internal,1=External."
  # ---- LAMP ----
  - id: lamp_mode
    label: Lamp Mode
    kind: action
    command: "*lamp.mode = {value}"
    params:
      - name: value
        type: integer
        description: "E-Vision 6900: 0=Dual,1=Single,2=Lamp1,3=Lamp2. Mercury Quad: 0=Eco,1=Normal,2=Dimming."
  - id: lamps
    label: Lamps
    kind: action
    command: "*lamps = {value}"
    params:
      - name: value
        type: integer
        description: "0=Dual,1=Triple,2=Quad Lamps."
  - id: power_mode
    label: Power Mode
    kind: action
    command: "*power.mode = {value}"
    params:
      - name: value
        type: integer
        description: "0=Normal,1=Eco,2=Custom Power Level."
  - id: lamp_power
    label: Lamp Power
    kind: action
    command: "*lamp.power = {value}"
    params:
      - name: value
        type: integer
        description: "0-26 (80%-100%)."
  - id: lamp_pow
    label: Lamp Pow
    kind: action
    command: "*lamp.pow = {value}"
    params:
      - name: value
        type: integer
        description: "77-100 (77%-100%)."
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
  # ---- SETUP ----
  - id: altitude
    label: Altitude
    kind: action
    command: "*altitude = {value}"
    params:
      - name: value
        type: integer
        description: "E-Vision 6900: 1=Off,2=On. Mercury Quad: 1=On,2=Auto."
  - id: cooling_condition
    label: Cooling Condition
    kind: action
    command: "*cooling.condition = {value}"
    params:
      - name: value
        type: integer
        description: "0=Table,1=Ceiling,2=Upward,3=Downward."
  - id: orientation
    label: Orientation
    kind: action
    command: "*orientation = {value}"
    params:
      - name: value
        type: integer
        description: "0=Desktop Front,1=Ceiling Front,2=Desktop Rear,3=Ceiling Rear (Mercury Quad adds 4=Vertical Up,5=Vertical Down). Bare command sets default 0."
  - id: screen_setting
    label: Screen Setting
    kind: action
    command: "*screen.setting = {value}"
    params:
      - name: value
        type: integer
        description: "0=16:10,1=16:9,2=4:3."
  - id: screen_format
    label: Screen Format
    kind: action
    command: "*screen.format = {value}"
    params:
      - name: value
        type: integer
        description: "0=16:10,1=16:9,2=4:3."
  - id: screen_shift
    label: Screen Shift
    kind: action
    command: "*screen.shift = {value}"
    params:
      - name: value
        type: integer
        description: "16:10=>0; 16:9=>-60..60; 4:3=>-160..160."
  - id: auto_poweroff
    label: Auto Power Off
    kind: action
    command: "*auto.poweroff = {value}"
    params:
      - name: value
        type: integer
        description: "0=Off,1=On."
  - id: auto_poweron
    label: Auto Power On
    kind: action
    command: "*auto.poweron = {value}"
    params:
      - name: value
        type: integer
        description: "0=Off,1=On."
  - id: schedule_power
    label: Schedule Power
    kind: action
    command: "*schedule.power = {value}"
    params:
      - name: value
        type: integer
        description: "0=Off,1=On."
  - id: schedule1_on_day
    label: Schedule 1 On Day
    kind: action
    command: "*schedule1.on.day = {value}"
    params:
      - name: value
        type: integer
        description: "Day bitmask, bits 0..6 = Sun..Sat."
  - id: schedule1_off_day
    label: Schedule 1 Off Day
    kind: action
    command: "*schedule1.off.day = {value}"
    params:
      - name: value
        type: integer
        description: "Day bitmask, bits 0..6 = Sun..Sat."
  - id: schedule1_on_time
    label: Schedule 1 On Time
    kind: action
    command: "*schedule1.on.time = {value}"
    params:
      - name: value
        type: string
        description: "HH:MM."
  - id: schedule1_off_time
    label: Schedule 1 Off Time
    kind: action
    command: "*schedule1.off.time = {value}"
    params:
      - name: value
        type: string
        description: "HH:MM."
  - id: schedule2_on_day
    label: Schedule 2 On Day
    kind: action
    command: "*schedule2.on.day = {value}"
    params:
      - name: value
        type: integer
        description: "Day bitmask, bits 0..6 = Sun..Sat."
  - id: schedule2_off_day
    label: Schedule 2 Off Day
    kind: action
    command: "*schedule2.off.day = {value}"
    params:
      - name: value
        type: integer
        description: "Day bitmask, bits 0..6 = Sun..Sat."
  - id: schedule2_on_time
    label: Schedule 2 On Time
    kind: action
    command: "*schedule2.on.time = {value}"
    params:
      - name: value
        type: string
        description: "HH:MM."
  - id: schedule2_off_time
    label: Schedule 2 Off Time
    kind: action
    command: "*schedule2.off.time = {value}"
    params:
      - name: value
        type: string
        description: "HH:MM."
  - id: date
    label: Date
    kind: action
    command: "*date = {value}"
    params:
      - name: value
        type: string
        description: "yyyy/MM/dd."
  - id: time_zone
    label: Time Zone
    kind: action
    command: "*time.zone = {value}"
    params:
      - name: value
        type: integer
        description: "-11 to +12."
  - id: time_adjust
    label: Time Adjust
    kind: action
    command: "*time.adjust = {value}"
    params:
      - name: value
        type: string
        description: "HH:MM."
  - id: startup_logo
    label: Startup Logo
    kind: action
    command: "*startup.logo = {value}"
    params:
      - name: value
        type: integer
        description: "0=Off,1=On."
  - id: blank_screen
    label: Blank Screen
    kind: action
    command: "*blank.screen = {value}"
    params:
      - name: value
        type: integer
        description: "0=Logo,1=Black,2=Blue (Mercury Quad adds 3=White)."
  - id: trig_1
    label: Trigger 1
    kind: action
    command: "*trig.1 = {value}"
    params:
      - name: value
        type: integer
        description: "0=Off,1=On (E-Vision). Mercury Quad: 0=Off,1=Screen,2=5:4,...,13=RS232 off."
  - id: trig_2
    label: Trigger 2
    kind: action
    command: "*trig.2 = {value}"
    params:
      - name: value
        type: integer
        description: "0=Off,1=Screen,2=5:4,3=4:3,4=16:10,5=16:9,6=1.88,7=2.35,8=Theaterscope,9=Source,10=Unscaled,11=RS232,12=RS232 on,13=RS232 off."
  - id: auto_source
    label: Auto Source
    kind: action
    command: "*auto.source = {value}"
    params:
      - name: value
        type: integer
        description: "0=Off,1=On."
  - id: auto_src
    label: Auto Src
    kind: action
    command: "*auto.src = {value}"
    params:
      - name: value
        type: integer
        description: "0=Off,1=On."
  - id: ir_enable
    label: IR Enable
    kind: action
    command: "*ir.enable = {value}"
    params:
      - name: value
        type: integer
        description: "0=Off(Disable),1=On(Enable)."
  - id: ir_code
    label: IR Code
    kind: action
    command: "*ir.code = {value}"
    params:
      - name: value
        type: integer
        description: "00 to 99."
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
        description: "00-99 (0=Disable,1-99=Enable)."
  - id: osd_lang
    label: OSD Language
    kind: action
    command: "*osd.lang = {value}"
    params:
      - name: value
        type: integer
        description: "0=English,1=French,2=Spanish,3=German,4=Portuguese,5=CHS,6=CHT,7=Japanese,8=Korean."
  - id: osd_menupos
    label: OSD Menu Position
    kind: action
    command: "*osd.menupos = {value}"
    params:
      - name: value
        type: integer
        description: "0=Center,1=TopLeft,2=TopRight,3=BottomLeft,4=BottomRight (positions vary per model)."
  - id: osd_trans
    label: OSD Transparency
    kind: action
    command: "*osd.trans = {value}"
    params:
      - name: value
        type: integer
        description: "0=0%,1=25%,2=50%,3=75%."
  - id: osd_timer
    label: OSD Timer
    kind: action
    command: "*osd.timer = {value}"
    params:
      - name: value
        type: integer
        description: "0=Always On,1=10s,2=30s,3=60s."
  - id: osd_msgbox
    label: OSD Message Box
    kind: action
    command: "*osd.msgbox = {value}"
    params:
      - name: value
        type: integer
        description: "0=Off,1=On."
  - id: recall_mem
    label: Recall Memory
    kind: action
    command: "*recall.mem = {value}"
    params:
      - name: value
        type: integer
        description: "0=Preset A,1=Preset B,2=Preset C,3=Preset D,4=Default."
  - id: save_mem
    label: Save Memory
    kind: action
    command: "*save.mem = {value}"
    params:
      - name: value
        type: integer
        description: "0=Preset A,1=Preset B,2=Preset C,3=Preset D."
  # ---- NETWORK ----
  - id: network_mode
    label: Network Mode
    kind: action
    command: "*network.mode = {value}"
    params:
      - name: value
        type: integer
        description: "0=Projector Control,1=Service."
  - id: lan_power
    label: LAN Power
    kind: action
    command: "*lan.power = {value}"
    params:
      - name: value
        type: integer
        description: "0=On,1=Off."
  - id: lan_dhcp
    label: LAN DHCP
    kind: action
    command: "*lan.dhcp = {value}"
    params:
      - name: value
        type: integer
        description: "0=On,1=Off."
  - id: lan_ip
    label: LAN IP Address
    kind: action
    command: "*lan.ip = {value}"
    params:
      - name: value
        type: string
        description: "xxx.xxx.xxx.xxx."
  - id: lan_subnet
    label: LAN Subnet
    kind: action
    command: "*lan.subnet = {value}"
    params:
      - name: value
        type: string
        description: "xxx.xxx.xxx.xxx."
  - id: lan_gateway
    label: LAN Gateway
    kind: action
    command: "*lan.gateway = {value}"
    params:
      - name: value
        type: string
        description: "xxx.xxx.xxx.xxx."
  - id: lan_dns
    label: LAN DNS
    kind: action
    command: "*lan.dns = {value}"
    params:
      - name: value
        type: string
        description: "xxx.xxx.xxx.xxx."
  - id: lan_mac
    label: LAN MAC
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
        description: "0=On,1=Off."
  # ---- PIP ----
  - id: pip_mode
    label: PIP Mode
    kind: action
    command: "*pip.mode = {value}"
    params:
      - name: value
        type: integer
        description: "0=On,1=Off."
  - id: pip_input
    label: PIP Input
    kind: action
    command: "*pip.input = {value}"
    params:
      - name: value
        type: integer
        description: "0=HDMI1,1=HDMI2,2=RGB(VGA),3=COMP,4=DisplayPort,5=HDBaseT,6=3G-SDI."
  - id: pip_position
    label: PIP Position
    kind: action
    command: "*pip.position = {value}"
    params:
      - name: value
        type: integer
        description: "0=TopLeft,1=TopRight,2=BottomLeft,3=BottomRight,4=PBP."
  # ---- INFORMATION (read-only queries) ----
  - id: model_name
    label: Model Name
    kind: query
    command: "*model.name ?"
    params: []
  - id: serial
    label: Serial Number
    kind: query
    command: "*serial ?"
    params: []
  - id: sw_version
    label: Software Version
    kind: query
    command: "*sw.version ?"
    params: []
  - id: act_source
    label: Active Source
    kind: query
    command: "*act.source ?"
    params: []
  - id: signal
    label: Signal
    kind: query
    command: "*signal ?"
    params: []
  - id: h_refresh
    label: Horizontal Refresh
    kind: query
    command: "*h.refresh ?"
    params: []
  - id: v_refresh
    label: Vertical Refresh
    kind: query
    command: "*v.refresh ?"
    params: []
  - id: pixel_clock
    label: Pixel Clock
    kind: query
    command: "*pixel.clock ?"
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
  - id: brt_lock_pw
    label: Brightness Lock Password
    kind: action
    command: "*brt.lock.pw = {value}"
    params:
      - name: value
        type: string
        description: "XXXX (4 digits = user or supervisor mode password)."
  - id: brt_lock_pw_set
    label: Brightness Lock Password Set
    kind: action
    command: "*brt.lock.pw.set = {value}"
    params:
      - name: value
        type: string
        description: "XXXX (4 digits = new user mode password)."
  - id: brt_lock_level
    label: Brightness Lock Level
    kind: action
    command: "*brt.lock.level = {value}"
    params:
      - name: value
        type: integer
        description: "0=Dual Lamps,1=Triple Lamps,2=Quad Lamps."
  - id: brt_lock_rst
    label: Brightness Lock Reset
    kind: action
    command: "*brt.lock.rst"
    params: []
  # ---- MISCELLANEOUS ----
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
        description: "Mercury Quad: 0=90~150,1=160~264. E-Vision 6900: n/a."
  - id: ti
    label: TI Temperature
    kind: query
    command: "*ti ?"
    params: []
  - id: tc
    label: TC Temperature
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
        description: "0=Off,1=On."
  - id: shutter
    label: Shutter
    kind: action
    command: "*shutter = {value}"
    params:
      - name: value
        type: integer
        description: "0=Open,1=Close."
  - id: pic_mute
    label: Picture Mute
    kind: action
    command: "*pic.mute = {value}"
    params:
      - name: value
        type: integer
        description: "0=Open,1=Close."
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
# Source documents response scheme, not discrete feedback channel enums.
feedbacks:
  - id: command_ack
    type: string
    description: "Success response begins with ACK or ack, echoed as 'ACK <command> = <value>'."
  - id: command_nak
    type: string
    description: "Failure response begins with NAK or nack, followed by brief problem description."
  - id: status
    type: enum
    description: "Queried via *status ?. E-Vision 6900: 0=Power Off,1=Power On. Mercury Quad: 0=Standby,1=Warm Up,2=Imaging,3=Cooling,4=Error."
    # UNRESOLVED: applicable status enum column for this exact model not confirmed in source
```

## Variables
```yaml
# Settable parameters are represented as Actions with params above (set/get/inc/dec).
# No separate continuous variables beyond those actions.
# UNRESOLVED: none additional from source
```

## Events
```yaml
# Source documents no unsolicited notification events. Responses are synchronous to commands.
# UNRESOLVED: no event/unsolicited-notification scheme stated in source
```

## Macros
```yaml
# Source documents no explicit multi-step macro sequences.
# UNRESOLVED: no macros stated in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Only one control path at a time (serial OR network). Simultaneous commands to both may cause unpredictable behavior."
  - "Lens commands only work if projector is switched on and lens is unlocked. lens.lock=1 disables most lens commands (exceptions: lens.type always; lens.save/lens.clear on Mercury Quad)."
  - "Must wait for the complete response to a command before sending another command."
# UNRESOLVED: no power-on sequencing or hardware interlock procedures stated in source
```

## Notes
- Commands are ASCII strings starting with `*`, terminated by Carriage Return (code 13). Format: `*command operator value` with required spaces before operator and before value (e.g. `*orientation = 3` valid; `*orientation=3` invalid).
- Operators: Set `= <value>`, Get `?`, Increment `+`, Decrement `-`, Execute (bare command). Entering a command name bare sets its default value (e.g. `*orientation` → 0/Desktop Front).
- Every command in the source tables supports all five operators; Actions above show the set/execute form, and get (`?`) is available on each for querying current value.
- Default network: IP `192.168.0.100`, TCP port `7000`.
- Serial: 9600 baud, 8 data bits. Parity/stop bits/flow control not stated.
- `pic.mode`, `gamma`, `brightness`, `contrast`, `saturation`, `hue` apply only to current image source. `dblack` unavailable in 3D. E-Vision 6900 accepts `saturation`/`hue` only on YUV input.
- `user.target`/`user2.target` protocol values are multiples of 1000.
- `cust.wp.ck.sum` returns an unsigned 32-bit checksum by summing all bytes in the currently sent warp file when `cust.wp.send` is non-zero.
<!-- UNRESOLVED: source lists two model columns (E-Vision 6900, Mercury Quad); the MVision Laser 18K is not explicitly mapped to either — value enums/ranges may differ for this exact model. -->
<!-- UNRESOLVED: serial parity, stop bits, flow control not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
````

One fix applied: `ac.voltage` query→action. Source shows all 5 operators + enum (0=90~150, 1=160~264). All 252 other commands already present, accurate.

## Provenance

```yaml
source_domains:
  - digitalprojection.co.uk
source_urls:
  - https://digitalprojection.co.uk/dpdownloads/Protocol/Simplified-Protocol-Guide-Rev-H.pdf
retrieved_at: 2026-08-01T22:05:09.436Z
last_checked_at: 2026-08-05T08:16:53.855Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:16:53.855Z
matched_actions: 253
action_count: 253
confidence: medium
summary: "Every one of the 253 spec commands is present verbatim in the source tables and every transport value is sourced. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The refined source documents the protocol family across two model columns (E-Vision 6900 and Mercury Quad) but does not explicitly map the MVision Laser 18K to either column. Value enums/ranges below are taken verbatim from the source; the applicable column for this exact model is not confirmed."
- "serial parity, stop bits, and flow control not stated in source"
- "firmware version compatibility not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "applicable status enum column for this exact model not confirmed in source"
- "none additional from source"
- "no event/unsolicited-notification scheme stated in source"
- "no macros stated in source"
- "no power-on sequencing or hardware interlock procedures stated in source"
- "source lists two model columns (E-Vision 6900, Mercury Quad); the MVision Laser 18K is not explicitly mapped to either — value enums/ranges may differ for this exact model."
- "serial parity, stop bits, flow control not stated in source."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
