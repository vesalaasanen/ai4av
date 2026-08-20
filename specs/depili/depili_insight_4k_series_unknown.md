---
spec_id: admin/depili-insight-4k-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Depili INSIGHT 4k Series Control Spec"
manufacturer: Depili
model_family: "INSIGHT 4k Series"
aliases: []
compatible_with:
  manufacturers:
    - Depili
  models:
    - "INSIGHT 4k Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - digitalprojection.co.uk
  - manualslib.com
source_urls:
  - "https://digitalprojection.co.uk/dpdownloads/Protocol/Protocol%20Guide%20INSIGHT%204K.pdf"
  - https://digitalprojection.co.uk/dpdownloads/Protocol/Simplified-Protocol-Guide-Rev-H.pdf
  - "http://digitalprojection.co.uk/dpdownloads/Protocol/Protocol%20Guide%20INSIGHT%204K.pdf"
  - "http://digitalprojection.co.uk/dpdownloads/Protocol/Simplified%20Protocol%20Guide.pdf"
  - https://www.manualslib.com/manual/1276574/Digital-Projection-Insight-4k-Quad-Series.html
retrieved_at: 2026-08-08T17:15:43.794Z
last_checked_at: 2026-08-19T09:14:22.872Z
generated_at: 2026-08-19T09:14:22.872Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source document does not name \"INSIGHT 4k Series\" explicitly; it documents the shared protocol via the E-Vision 6900 and Mercury Quad model columns. Applicability and exact value ranges for the INSIGHT 4k Series are not confirmed against the device."
  - "Firmware version compatibility not stated in source."
  - "Serial parity, stop bits, and flow control not stated in source."
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "none additional identified in source"
  - "no unsolicited event mechanism described in source"
  - "no macros described in source"
  - "no formal safety/interlock documentation present in source"
  - "Source document does not explicitly name the INSIGHT 4k Series; it documents the protocol via E-Vision 6900 and Mercury Quad columns. Exact applicability and value ranges for the INSIGHT 4k Series are unconfirmed."
  - "Serial parity, stop bits, and flow control not stated."
  - "Firmware version compatibility not stated."
  - "AC voltage spec values (90-150 / 160-264) transcribed verbatim but represent range codes, not invented ratings."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:14:22.872Z
  matched_actions: 253
  action_count: 253
  confidence: medium
  summary: "Every spec action token appears verbatim in source command tables; transport values stated verbatim; full bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-02
---

# Depili INSIGHT 4k Series Control Spec

## Summary
The Depili INSIGHT 4k Series is a 4K projector controllable via an RS-232 serial or LAN (TCP) interface using ASCII text commands. Each command is an ASCII string beginning with `*` and terminated by a Carriage Return (code 13), of the form `*command <operator> <value>`. The source command tables document two model columns (E-Vision 6900 and Mercury Quad); the value ranges and feature availability below are transcribed verbatim from those columns.

<!-- UNRESOLVED: The source document does not name "INSIGHT 4k Series" explicitly; it documents the shared protocol via the E-Vision 6900 and Mercury Quad model columns. Applicability and exact value ranges for the INSIGHT 4k Series are not confirmed against the device. -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Serial parity, stop bits, and flow control not stated in source. -->

## Transport
```yaml
# Source states RS232 and LAN (TCP) control. Default IP 192.168.0.100, TCP port 7000.
# Baud rate 9600, data length 8 bits stated. Parity/stop/flow control not stated.
protocols:
  - tcp
  - serial
addressing:
  host: 192.168.0.100  # default IP stated in source
  port: 7000
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
# - powerable   (inferred from `power` on/off command)
# - queryable   (inferred from many `?` get / status / telemetry commands)
# - levelable   (inferred from brightness/contrast/gain/keystone range commands)
# - routable    (inferred from `input` multi-source selection command)
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

## Actions
```yaml
# Protocol format: ASCII string starting with '*', terminated by Carriage Return (0x0D).
# Form: `*<command> <operator> <value>`. Spaces REQUIRED before operator and before value.
# Operators: Set `= <value>`, Get `?`, Inc `+`, Dec `-`, Execute (no operator).
# Bare `*<command>` (no operator) sets the DEFAULT value for settable commands.
# Unless noted, every command supports all operators where a value applies:
#   set  -> "*<name> = {value}"
#   get  -> "*<name> ?"
#   inc  -> "*<name> +"
#   dec  -> "*<name> -"
#   exe  -> "*<name>"
# Successful response begins with ACK/ack; failure response is NAK/nack + description.
# You MUST wait for the complete response before sending the next command.
#
# `command:` shows the primary (set / execute / query) payload verbatim. Value ranges are
# transcribed from the E-Vision 6900 / Mercury Quad source columns; applicability to the
# INSIGHT 4k Series is UNRESOLVED.

# --- INPUT ---
- id: input
  label: Input Source
  kind: action
  command: "*input = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=HDMI I,1=HDMI II,2=DVI-D,3=VGA,4=Component,5=HDBaseT; Mercury Quad: 0=HDMI 1,1=HDMI 2,2=DisplayPort,3=HDBaseT,4=3G-SDI"
- id: test_pattern
  label: Test Pattern
  kind: action
  command: "*test.pattern = {value}"
  params:
    - name: value
      type: enum
      description: "0=Off,1=White,2=Black,3=Red,4=Green,5=Blue,6=Checkerboard,7=CrossHatch,8=V Burst,9=H Burst,10=Color Bar,11=Hramp/Plunge"

# --- LENS ---
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
      description: "E-Vision 6900: 0 to 9; Mercury Quad: 1 to 10"
- id: lens_save
  label: Lens Save
  kind: action
  command: "*lens.save = {value}"
  params:
    - name: value
      type: integer
      description: "E-Vision 6900: 0 to 9; Mercury Quad: 1 to 10"
- id: lens_clear
  label: Lens Clear
  kind: action
  command: "*lens.clear = {value}"
  params:
    - name: value
      type: integer
      description: "E-Vision 6900: 0 to 9; Mercury Quad: 1 to 10"
- id: lens_type
  label: Lens Type
  kind: action
  command: "*lens.type = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=non-UST Lens,1=UST Lens; Mercury Quad: n/a"
- id: lens_lock
  label: Lens Lock
  kind: action
  command: "*lens.lock = {value}"
  params:
    - name: value
      type: enum
      description: "0=Off,1=On (E-Vision 6900)"

# --- IMAGE ---
- id: pic_mode
  label: Picture Mode
  kind: action
  command: "*pic.mode = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=High Bright,1=Presentation,2=Video; Mercury Quad: n/a"
- id: dblack
  label: Dynamic Black
  kind: action
  command: "*dblack = {value}"
  params:
    - name: value
      type: enum
      description: "0=Off,1=On (E-Vision 6900)"
- id: gamma
  label: Gamma
  kind: action
  command: "*gamma = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=1.0,1=1.8,2=2.0,3=2.2,4=2.35,5=2.5,6=S-curve; Mercury Quad: 0=1.0,1=1.8,2=2.0,3=2.2,4=2.35,5=2.5"
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
      description: "0 to 200 (E-Vision 6900: only applied when input is YUV)"
- id: hue
  label: Hue
  kind: action
  command: "*hue = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200 (E-Vision 6900: only applied when input is YUV)"
- id: sharpness
  label: Sharpness
  kind: action
  command: "*sharpness = {value}"
  params:
    - name: value
      type: integer
      description: "E-Vision 6900: 0 to 31; Mercury Quad: 0 to 15"
- id: nr
  label: Noise Reduction
  kind: action
  command: "*nr = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 15 (E-Vision 6900)"
- id: nr_temporal
  label: NR Temporal
  kind: action
  command: "*nr.temporal = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 3 (Mercury Quad)"
- id: nr_block
  label: NR Block
  kind: action
  command: "*nr.block = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 3 (Mercury Quad)"
- id: nr_mosquito
  label: NR Mosquito
  kind: action
  command: "*nr.mosquito = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 3 (Mercury Quad)"
- id: nr_hori
  label: NR Horizontal
  kind: action
  command: "*nr.hori = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 3 (Mercury Quad)"
- id: nr_vert
  label: NR Vertical
  kind: action
  command: "*nr.vert = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 3 (Mercury Quad)"
- id: nr_reset
  label: NR Reset
  kind: action
  command: "*nr.reset = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 3 (Mercury Quad)"
- id: h_position
  label: Horizontal Position
  kind: action
  command: "*h.position = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200 (E-Vision 6900)"
- id: v_position
  label: Vertical Position
  kind: action
  command: "*v.position = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200 (E-Vision 6900)"
- id: vga_phase
  label: VGA Phase
  kind: action
  command: "*vga.phase = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 31 (E-Vision 6900)"
- id: tracking
  label: Tracking
  kind: action
  command: "*tracking = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200 (E-Vision 6900)"
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
      type: enum
      description: "0=Off,1=On (E-Vision 6900)"
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

# --- COLOR ---
- id: color_space
  label: Color Space
  kind: action
  command: "*color.space = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=Auto,1=YPbPr,2=YCbCr,3=RGB-PC,4=RGB-Video"
- id: color_temp
  label: Color Temperature
  kind: action
  command: "*color.temp = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=Native,1=5400K,2=6500K,3=7500K,4=9300K; Mercury Quad: 0=3200K,1=5400K,2=6500K,3=7500K,4=9300K,5=Native"
- id: color_mode
  label: Color Mode
  kind: action
  command: "*color.mode = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=ColorMax,1=Manual Color Matching,2=Color Temperature,3=Gains and Lifts"
- id: color_max
  label: Color Max
  kind: action
  command: "*color.max = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=REC709,1=EBU,2=SMPTE,3=Native,4=User 1,5=User 2"
- id: red_lift
  label: Red Lift
  kind: action
  command: "*red.lift = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200 (E-Vision 6900)"
- id: green_lift
  label: Green Lift
  kind: action
  command: "*green.lift = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200 (E-Vision 6900)"
- id: blue_lift
  label: Blue Lift
  kind: action
  command: "*blue.lift = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200 (E-Vision 6900)"
- id: red_gain
  label: Red Gain
  kind: action
  command: "*red.gain = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200 (E-Vision 6900)"
- id: green_gain
  label: Green Gain
  kind: action
  command: "*green.gain = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200 (E-Vision 6900)"
- id: blue_gain
  label: Blue Gain
  kind: action
  command: "*blue.gain = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 200 (E-Vision 6900)"
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
      type: enum
      description: "Mercury Quad: 0=Off,1=On"
- id: user_std_rx
  label: User Standard Red X
  kind: action
  command: "*user.std.rx = {value}"
  params:
    - name: value
      type: integer
      description: "550 to 750 (Mercury Quad; values are multiples of 1000)"
- id: user_std_ry
  label: User Standard Red Y
  kind: action
  command: "*user.std.ry = {value}"
  params:
    - name: value
      type: integer
      description: "250 to 450 (Mercury Quad)"
- id: user_std_gx
  label: User Standard Green X
  kind: action
  command: "*user.std.gx = {value}"
  params:
    - name: value
      type: integer
      description: "200 to 400 (Mercury Quad)"
- id: user_std_gy
  label: User Standard Green Y
  kind: action
  command: "*user.std.gy = {value}"
  params:
    - name: value
      type: integer
      description: "400 to 750 (Mercury Quad)"
- id: user_std_bx
  label: User Standard Blue X
  kind: action
  command: "*user.std.bx = {value}"
  params:
    - name: value
      type: integer
      description: "50 to 250 (Mercury Quad)"
- id: user_std_by
  label: User Standard Blue Y
  kind: action
  command: "*user.std.by = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 120 (Mercury Quad)"
- id: user_std_wx
  label: User Standard White X
  kind: action
  command: "*user.std.wx = {value}"
  params:
    - name: value
      type: integer
      description: "200 to 400 (Mercury Quad)"
- id: user_std_wy
  label: User Standard White Y
  kind: action
  command: "*user.std.wy = {value}"
  params:
    - name: value
      type: integer
      description: "250 to 450 (Mercury Quad)"
- id: user_std_reset
  label: User Standard Reset
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
      description: "550 to 750 (Mercury Quad; Target Data - User 1)"
- id: user_target_ry
  label: User Target Red Y
  kind: action
  command: "*user.target.ry = {value}"
  params:
    - name: value
      type: integer
      description: "250 to 450 (Mercury Quad)"
- id: user_target_gx
  label: User Target Green X
  kind: action
  command: "*user.target.gx = {value}"
  params:
    - name: value
      type: integer
      description: "200 to 400 (Mercury Quad)"
- id: user_target_gy
  label: User Target Green Y
  kind: action
  command: "*user.target.gy = {value}"
  params:
    - name: value
      type: integer
      description: "400 to 750 (Mercury Quad)"
- id: user_target_bx
  label: User Target Blue X
  kind: action
  command: "*user.target.bx = {value}"
  params:
    - name: value
      type: integer
      description: "50 to 250 (Mercury Quad)"
- id: user_target_by
  label: User Target Blue Y
  kind: action
  command: "*user.target.by = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 120 (Mercury Quad)"
- id: user_target_wx
  label: User Target White X
  kind: action
  command: "*user.target.wx = {value}"
  params:
    - name: value
      type: integer
      description: "200 to 400 (Mercury Quad)"
- id: user_target_wy
  label: User Target White Y
  kind: action
  command: "*user.target.wy = {value}"
  params:
    - name: value
      type: integer
      description: "250 to 450 (Mercury Quad)"
- id: user_target_cx
  label: User Target Cyan X
  kind: action
  command: "*user.target.cx = {value}"
  params:
    - name: value
      type: integer
      description: "125 to 325 (Mercury Quad)"
- id: user_target_cy
  label: User Target Cyan Y
  kind: action
  command: "*user.target.cy = {value}"
  params:
    - name: value
      type: integer
      description: "225 to 425 (Mercury Quad)"
- id: user_target_mx
  label: User Target Magenta X
  kind: action
  command: "*user.target.mx = {value}"
  params:
    - name: value
      type: integer
      description: "200 to 400 (Mercury Quad)"
- id: user_target_my
  label: User Target Magenta Y
  kind: action
  command: "*user.target.my = {value}"
  params:
    - name: value
      type: integer
      description: "50 to 250 (Mercury Quad)"
- id: user_target_yx
  label: User Target Yellow X
  kind: action
  command: "*user.target.yx = {value}"
  params:
    - name: value
      type: integer
      description: "300 to 500 (Mercury Quad)"
- id: user_target_yy
  label: User Target Yellow Y
  kind: action
  command: "*user.target.yy = {value}"
  params:
    - name: value
      type: integer
      description: "400 to 600 (Mercury Quad)"
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
      description: "550 to 750 (Mercury Quad; Target Data - User 2)"
- id: user2_target_ry
  label: User2 Target Red Y
  kind: action
  command: "*user2.target.ry = {value}"
  params:
    - name: value
      type: integer
      description: "250 to 450 (Mercury Quad)"
- id: user2_target_gx
  label: User2 Target Green X
  kind: action
  command: "*user2.target.gx = {value}"
  params:
    - name: value
      type: integer
      description: "200 to 400 (Mercury Quad)"
- id: user2_target_gy
  label: User2 Target Green Y
  kind: action
  command: "*user2.target.gy = {value}"
  params:
    - name: value
      type: integer
      description: "400 to 750 (Mercury Quad)"
- id: user2_target_bx
  label: User2 Target Blue X
  kind: action
  command: "*user2.target.bx = {value}"
  params:
    - name: value
      type: integer
      description: "50 to 250 (Mercury Quad)"
- id: user2_target_by
  label: User2 Target Blue Y
  kind: action
  command: "*user2.target.by = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 120 (Mercury Quad)"
- id: user2_target_wx
  label: User2 Target White X
  kind: action
  command: "*user2.target.wx = {value}"
  params:
    - name: value
      type: integer
      description: "200 to 400 (Mercury Quad)"
- id: user2_target_wy
  label: User2 Target White Y
  kind: action
  command: "*user2.target.wy = {value}"
  params:
    - name: value
      type: integer
      description: "250 to 450 (Mercury Quad)"
- id: user2_target_cx
  label: User2 Target Cyan X
  kind: action
  command: "*user2.target.cx = {value}"
  params:
    - name: value
      type: integer
      description: "125 to 325 (Mercury Quad)"
- id: user2_target_cy
  label: User2 Target Cyan Y
  kind: action
  command: "*user2.target.cy = {value}"
  params:
    - name: value
      type: integer
      description: "225 to 425 (Mercury Quad)"
- id: user2_target_mx
  label: User2 Target Magenta X
  kind: action
  command: "*user2.target.mx = {value}"
  params:
    - name: value
      type: integer
      description: "200 to 400 (Mercury Quad)"
- id: user2_target_my
  label: User2 Target Magenta Y
  kind: action
  command: "*user2.target.my = {value}"
  params:
    - name: value
      type: integer
      description: "50 to 250 (Mercury Quad)"
- id: user2_target_yx
  label: User2 Target Yellow X
  kind: action
  command: "*user2.target.yx = {value}"
  params:
    - name: value
      type: integer
      description: "300 to 500 (Mercury Quad)"
- id: user2_target_yy
  label: User2 Target Yellow Y
  kind: action
  command: "*user2.target.yy = {value}"
  params:
    - name: value
      type: integer
      description: "400 to 600 (Mercury Quad)"
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
      description: "0 to 200 (E-Vision 6900; Manual Color Matching)"
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

# --- GEOMETRY ---
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "*aspect.ratio = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=5:4,1=4:3,2=16:10,3=16:9,4=1.88,5=2.35,6=Theaterscope,7=Source,8=Unscaled"
- id: digi_zoom
  label: Digital Zoom
  kind: action
  command: "*digi.zoom = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100 (Mercury Quad)"
- id: digi_pan
  label: Digital Pan
  kind: action
  command: "*digi.pan = {value}"
  params:
    - name: value
      type: integer
      description: "-320 to +320 (Mercury Quad)"
- id: digi_pan_bound
  label: Digital Pan Bound
  kind: action
  command: "*digi.pan.bound = {value}"
  params:
    - name: value
      type: integer
      description: "-320 to +320 (Mercury Quad)"
- id: digi_scan
  label: Digital Scan
  kind: action
  command: "*digi.scan = {value}"
  params:
    - name: value
      type: integer
      description: "-200 to +200 (Mercury Quad)"
- id: digi_scan_bound
  label: Digital Scan Bound
  kind: action
  command: "*digi.scan.bound = {value}"
  params:
    - name: value
      type: integer
      description: "-200 to +200 (Mercury Quad)"
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
      type: enum
      description: "E-Vision 6900: 0=Off,1=On; Mercury Quad: 0=Off,1=Crop,2=Zoom"
- id: h_keystone
  label: Horizontal Keystone
  kind: action
  command: "*h.keystone = {value}"
  params:
    - name: value
      type: integer
      description: "E-Vision 6900: -30 to +30; Mercury Quad: -600 to +600"
- id: v_keystone
  label: Vertical Keystone
  kind: action
  command: "*v.keystone = {value}"
  params:
    - name: value
      type: integer
      description: "E-Vision 6900: -30 to +30; Mercury Quad: -400 to +400"
- id: rotation
  label: Rotation
  kind: action
  command: "*rotation = {value}"
  params:
    - name: value
      type: integer
      description: "-100 to +100 (Mercury Quad)"
- id: h_pin_barrel
  label: Horizontal Pincushion/Barrel
  kind: action
  command: "*h.pin.barrel = {value}"
  params:
    - name: value
      type: integer
      description: "-150 to +300 (Mercury Quad)"
- id: v_pin_barrel
  label: Vertical Pincushion/Barrel
  kind: action
  command: "*v.pin.barrel = {value}"
  params:
    - name: value
      type: integer
      description: "-150 to +300 (Mercury Quad)"
- id: 4corner_ulx
  label: Four Corner Upper-Left X
  kind: action
  command: "*4corner.ulx = {value}"
  params:
    - name: value
      type: integer
      description: "-192 to +192 (Mercury Quad)"
- id: 4corner_uly
  label: Four Corner Upper-Left Y
  kind: action
  command: "*4corner.uly = {value}"
  params:
    - name: value
      type: integer
      description: "-120 to +120 (Mercury Quad)"
- id: 4corner_urx
  label: Four Corner Upper-Right X
  kind: action
  command: "*4corner.urx = {value}"
  params:
    - name: value
      type: integer
      description: "-192 to +192 (Mercury Quad)"
- id: 4corner_ury
  label: Four Corner Upper-Right Y
  kind: action
  command: "*4corner.ury = {value}"
  params:
    - name: value
      type: integer
      description: "-120 to +120 (Mercury Quad)"
- id: 4corner_llx
  label: Four Corner Lower-Left X
  kind: action
  command: "*4corner.llx = {value}"
  params:
    - name: value
      type: integer
      description: "-192 to +192 (Mercury Quad)"
- id: 4corner_lly
  label: Four Corner Lower-Left Y
  kind: action
  command: "*4corner.lly = {value}"
  params:
    - name: value
      type: integer
      description: "-120 to +120 (Mercury Quad)"
- id: 4corner_lrx
  label: Four Corner Lower-Right X
  kind: action
  command: "*4corner.lrx = {value}"
  params:
    - name: value
      type: integer
      description: "-192 to +192 (Mercury Quad)"
- id: 4corner_lry
  label: Four Corner Lower-Right Y
  kind: action
  command: "*4corner.lry = {value}"
  params:
    - name: value
      type: integer
      description: "-120 to +120 (Mercury Quad)"
- id: arc_top
  label: Arc Top
  kind: action
  command: "*arc.top = {value}"
  params:
    - name: value
      type: integer
      description: "-150 to +150 (Mercury Quad)"
- id: arc_bottom
  label: Arc Bottom
  kind: action
  command: "*arc.bottom = {value}"
  params:
    - name: value
      type: integer
      description: "-150 to +150 (Mercury Quad)"
- id: arc_left
  label: Arc Left
  kind: action
  command: "*arc.left = {value}"
  params:
    - name: value
      type: integer
      description: "-150 to +150 (Mercury Quad)"
- id: arc_right
  label: Arc Right
  kind: action
  command: "*arc.right = {value}"
  params:
    - name: value
      type: integer
      description: "-150 to +150 (Mercury Quad)"
- id: blanking_top
  label: Blanking Top
  kind: action
  command: "*blanking.top = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 360 (Mercury Quad)"
- id: blanking_bottom
  label: Blanking Bottom
  kind: action
  command: "*blanking.bottom = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 360 (Mercury Quad)"
- id: blanking_left
  label: Blanking Left
  kind: action
  command: "*blanking.left = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 534 (Mercury Quad)"
- id: blanking_right
  label: Blanking Right
  kind: action
  command: "*blanking.right = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 534 (Mercury Quad)"
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
      type: enum
      description: "Mercury Quad: 0=none,1=Keystone,2=Four Corner,3=Rotation,4=Pin/Barrel,5=Arc"
- id: cust_wp_write
  label: Custom Warp Write
  kind: action
  command: "*cust.wp.write = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 1=User 1 file,2=User 2 file"
- id: cust_wp_clear
  label: Custom Warp Clear
  kind: action
  command: "*cust.wp.clear = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 1=User 1 file,2=User 2 file"
- id: cust_wp_send
  label: Custom Warp Send
  kind: action
  command: "*cust.wp.send = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=off,1=User 1 file,2=User 2 file"
- id: cust_wp_ck_sum
  label: Custom Warp Checksum
  kind: query
  command: "*cust.wp.ck.sum ?"
  params: []
  # Mercury Quad: returns unsigned 32-bit checksum (sum of bytes in sent warp file) when cust.wp.send != 0
- id: warp_cust
  label: Warp Custom
  kind: action
  command: "*warp.cust = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=Off,1=User 1,2=User 2"

# --- EDGE BLEND ---
- id: eb_stat
  label: Edge Blend Status
  kind: action
  command: "*eb.stat = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=Off,1=On"
- id: eb_adl
  label: Edge Blend ADL
  kind: action
  command: "*eb.adl = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=Off,1=On"
- id: eb_top
  label: Edge Blend Top
  kind: action
  command: "*eb.top = {value}"
  params:
    - name: value
      type: integer
      description: "0, or 100 to 500 (Mercury Quad)"
- id: eb_bottom
  label: Edge Blend Bottom
  kind: action
  command: "*eb.bottom = {value}"
  params:
    - name: value
      type: integer
      description: "0, or 100 to 500 (Mercury Quad)"
- id: eb_left
  label: Edge Blend Left
  kind: action
  command: "*eb.left = {value}"
  params:
    - name: value
      type: integer
      description: "0, or 100 to 800 (Mercury Quad)"
- id: eb_right
  label: Edge Blend Right
  kind: action
  command: "*eb.right = {value}"
  params:
    - name: value
      type: integer
      description: "0, or 100 to 800 (Mercury Quad)"
- id: eb_blu_top
  label: Edge Blend Blanking Top
  kind: action
  command: "*eb.blu.top = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 32 (Mercury Quad)"
- id: eb_blu_btm
  label: Edge Blend Blanking Bottom
  kind: action
  command: "*eb.blu.btm = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 32 (Mercury Quad)"
- id: eb_blu_left
  label: Edge Blend Blanking Left
  kind: action
  command: "*eb.blu.left = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 32 (Mercury Quad)"
- id: eb_blu_right
  label: Edge Blend Blanking Right
  kind: action
  command: "*eb.blu.right = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 32 (Mercury Quad)"
- id: eb_all
  label: Edge Blend All
  kind: action
  command: "*eb.all = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 255 (Mercury Quad)"
- id: eb_red
  label: Edge Blend Red
  kind: action
  command: "*eb.red = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 255 (Mercury Quad)"
- id: eb_green
  label: Edge Blend Green
  kind: action
  command: "*eb.green = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 255 (Mercury Quad)"
- id: eb_blue
  label: Edge Blend Blue
  kind: action
  command: "*eb.blue = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 255 (Mercury Quad)"
- id: eb_reset
  label: Edge Blend Reset
  kind: action
  command: "*eb.reset"
  params: []

# --- 3D ---
- id: 3d_format
  label: 3D Format
  kind: action
  command: "*3d.format = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=Off,1=Auto,2=Side-By-Side (Half),3=Top-And-Bottom,4=Frame Sequential; Mercury Quad: 0=Off,1=Auto,2=Side-By-Side (Half),3=Top-And-Bottom,4=Dual-Pipe,5=Frame Sequential"
- id: 3d_dlplink
  label: 3D DLP-Link
  kind: action
  command: "*3d.dlplink = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=Off,1=On"
- id: 3d_dominance
  label: 3D Dominance
  kind: action
  command: "*3d.dominance = {value}"
  params:
    - name: value
      type: enum
      description: "0=Normal,1=Reverse (E-Vision 6900)"
- id: 3d_darktime
  label: 3D Dark Time
  kind: action
  command: "*3d.darktime = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=0.65 ms,1=1.3 ms,2=1.95 ms,3=2.5 ms"
- id: 3d_syncoffset
  label: 3D Sync Offset
  kind: action
  command: "*3d.syncoffset = {value}"
  params:
    - name: value
      type: integer
      description: "E-Vision 6900: 0 to 200; Mercury Quad: 0 to 60"
- id: 3d_syncref
  label: 3D Sync Reference
  kind: action
  command: "*3d.syncref = {value}"
  params:
    - name: value
      type: enum
      description: "0=Internal,1=External"

# --- LAMP ---
- id: lamp_mode
  label: Lamp Mode
  kind: action
  command: "*lamp.mode = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=Dual,1=Single,2=Lamp 1,3=Lamp 2; Mercury Quad: 0=Eco mode,1=Normal mode,2=dimming mode"
- id: lamps
  label: Lamps Configuration
  kind: action
  command: "*lamps = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=Dual Lamps,1=Triple Lamps,2=Quad Lamps"
- id: power_mode
  label: Power Mode
  kind: action
  command: "*power.mode = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=Normal,1=Eco,2=Custom Power Level"
- id: lamp_power
  label: Lamp Power
  kind: action
  command: "*lamp.power = {value}"
  params:
    - name: value
      type: integer
      description: "E-Vision 6900: 0-26 (maps to 80%-100%)"
- id: lamp_pow
  label: Lamp Power (Mercury)
  kind: action
  command: "*lamp.pow = {value}"
  params:
    - name: value
      type: integer
      description: "Mercury Quad: 77-100 (maps to 77%-100%)"

# --- SETUP ---
- id: altitude
  label: Altitude
  kind: action
  command: "*altitude = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 1=Off,2=On; Mercury Quad: 1=On,2=Auto"
- id: cooling_condition
  label: Cooling Condition
  kind: action
  command: "*cooling.condition = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=Table,1=Ceiling,2=Upward,3=Downward"
- id: orientation
  label: Orientation
  kind: action
  command: "*orientation = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=Desktop Front,1=Ceiling Front,2=Desktop Rear,3=Ceiling Rear; Mercury Quad: 0=Desktop Front,1=Ceiling Front,2=Desktop Rear,3=Ceiling Rear,4=Vertical Up,5=Vertical Down"
- id: screen_setting
  label: Screen Setting
  kind: action
  command: "*screen.setting = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=16:10,1=16:9,2=4:3"
- id: screen_format
  label: Screen Format
  kind: action
  command: "*screen.format = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=16:10,1=16:9,2=4:3"
- id: screen_shift
  label: Screen Shift
  kind: action
  command: "*screen.shift = {value}"
  params:
    - name: value
      type: integer
      description: "E-Vision 6900: if screen.format=16:10 => 0; =16:9 => -60 to 60; =4:3 => -160 to 160"
- id: auto_poweroff
  label: Auto Power Off
  kind: action
  command: "*auto.poweroff = {value}"
  params:
    - name: value
      type: enum
      description: "0=Off,1=On (E-Vision 6900)"
- id: auto_poweron
  label: Auto Power On
  kind: action
  command: "*auto.poweron = {value}"
  params:
    - name: value
      type: enum
      description: "0=Off,1=On (E-Vision 6900)"
- id: schedule_power
  label: Schedule Power
  kind: action
  command: "*schedule.power = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=Off,1=On"
- id: schedule1_on_day
  label: Schedule 1 On Day
  kind: action
  command: "*schedule1.on.day = {value}"
  params:
    - name: value
      type: integer
      description: "Mercury Quad: bitmask =76543210 (Bit6=Sat,Bit5=Fri,Bit4=Thu,Bit3=Wed,Bit2=Tue,Bit1=Mon,Bit0=Sun)"
- id: schedule1_off_day
  label: Schedule 1 Off Day
  kind: action
  command: "*schedule1.off.day = {value}"
  params:
    - name: value
      type: integer
      description: "Mercury Quad: bitmask =76543210 (Bit6=Sat..Bit0=Sun)"
- id: schedule1_on_time
  label: Schedule 1 On Time
  kind: action
  command: "*schedule1.on.time = {value}"
  params:
    - name: value
      type: string
      description: "Mercury Quad: HH:MM"
- id: schedule1_off_time
  label: Schedule 1 Off Time
  kind: action
  command: "*schedule1.off.time = {value}"
  params:
    - name: value
      type: string
      description: "Mercury Quad: HH:MM"
- id: schedule2_on_day
  label: Schedule 2 On Day
  kind: action
  command: "*schedule2.on.day = {value}"
  params:
    - name: value
      type: integer
      description: "Mercury Quad: bitmask =76543210 (Bit6=Sat..Bit0=Sun)"
- id: schedule2_off_day
  label: Schedule 2 Off Day
  kind: action
  command: "*schedule2.off.day = {value}"
  params:
    - name: value
      type: integer
      description: "Mercury Quad: bitmask =76543210 (Bit6=Sat..Bit0=Sun)"
- id: schedule2_on_time
  label: Schedule 2 On Time
  kind: action
  command: "*schedule2.on.time = {value}"
  params:
    - name: value
      type: string
      description: "Mercury Quad: HH:MM"
- id: schedule2_off_time
  label: Schedule 2 Off Time
  kind: action
  command: "*schedule2.off.time = {value}"
  params:
    - name: value
      type: string
      description: "Mercury Quad: HH:MM"
- id: date
  label: Date
  kind: action
  command: "*date = {value}"
  params:
    - name: value
      type: string
      description: "Mercury Quad: yyyy/MM/dd"
- id: time_zone
  label: Time Zone
  kind: action
  command: "*time.zone = {value}"
  params:
    - name: value
      type: integer
      description: "Mercury Quad: -11 to +12"
- id: time_adjust
  label: Time Adjust
  kind: action
  command: "*time.adjust = {value}"
  params:
    - name: value
      type: string
      description: "Mercury Quad: HH:MM"
- id: startup_logo
  label: Startup Logo
  kind: action
  command: "*startup.logo = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=Off,1=On"
- id: blank_screen
  label: Blank Screen
  kind: action
  command: "*blank.screen = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=Logo,1=Black,2=Blue; Mercury Quad: 0=Logo,1=Black,2=Blue,3=White"
- id: trig_1
  label: Trigger 1
  kind: action
  command: "*trig.1 = {value}"
  params:
    - name: value
      type: enum
      description: "0=Off,1=Screen,2=5:4,3=4:3,4=16:10,5=16:9,6=1.88,7=2.35,8=Theaterscope,9=Source,10=Unscaled,11=RS232,12=RS232 on,13=RS232 off"
- id: trig_2
  label: Trigger 2
  kind: action
  command: "*trig.2 = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=Off,1=Screen,2=5:4,3=4:3,4=16:10,5=16:9,6=1.88,7=2.35,8=Theaterscope,9=Source,10=Unscaled,11=RS232,12=RS232 on,13=RS232 off"
- id: auto_source
  label: Auto Source
  kind: action
  command: "*auto.source = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=Off,1=On"
- id: auto_src
  label: Auto Source (E-Vision)
  kind: action
  command: "*auto.src = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=Off,1=On"
- id: ir_enable
  label: IR Enable
  kind: action
  command: "*ir.enable = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=Off (Disable),1=On (Enable)"
- id: ir_code
  label: IR Code
  kind: action
  command: "*ir.code = {value}"
  params:
    - name: value
      type: integer
      description: "Mercury Quad: 00 to 99"
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
      description: "E-Vision 6900: 00-99 (0=Disable, 1-99=Enable)"
- id: osd_lang
  label: OSD Language
  kind: action
  command: "*osd.lang = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=English,1=French,2=Spanish,3=German,4=Portuguese,5=CHS,6=CHT,7=Japanese,8=Korean"
- id: osd_menupos
  label: OSD Menu Position
  kind: action
  command: "*osd.menupos = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=Center,1=Top Left,2=Top Right,3=Bottom Left,4=Bottom Right; Mercury Quad: 0=Top Left,1=Top Right,2=Bottom Left,3=Bottom Right,4=Center"
- id: osd_trans
  label: OSD Transparency
  kind: action
  command: "*osd.trans = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=0%,1=25%,2=50%,3=75%"
- id: osd_timer
  label: OSD Timer
  kind: action
  command: "*osd.timer = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=Always On,1=10 Seconds,2=30 Seconds,3=60 Seconds"
- id: osd_msgbox
  label: OSD Message Box
  kind: action
  command: "*osd.msgbox = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=Off,1=On"
- id: recall_mem
  label: Recall Memory
  kind: action
  command: "*recall.mem = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=Preset A,1=Preset B,2=Preset C,3=Preset D,4=Default"
- id: save_mem
  label: Save Memory
  kind: action
  command: "*save.mem = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=Preset A,1=Preset B,2=Preset C,3=Preset D"

# --- NETWORK ---
- id: network_mode
  label: Network Mode
  kind: action
  command: "*network.mode = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=Projector Control,1=Service"
- id: lan_power
  label: LAN Power
  kind: action
  command: "*lan.power = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=On,1=Off"
- id: lan_dhcp
  label: LAN DHCP
  kind: action
  command: "*lan.dhcp = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=On,1=Off"
- id: lan_ip
  label: LAN IP Address
  kind: action
  command: "*lan.ip = {value}"
  params:
    - name: value
      type: string
      description: "E-Vision 6900: valid IP address xxx.xxx.xxx.xxx"
- id: lan_subnet
  label: LAN Subnet Mask
  kind: action
  command: "*lan.subnet = {value}"
  params:
    - name: value
      type: string
      description: "E-Vision 6900: valid subnet xxx.xxx.xxx.xxx"
- id: lan_gateway
  label: LAN Gateway
  kind: action
  command: "*lan.gateway = {value}"
  params:
    - name: value
      type: string
      description: "E-Vision 6900: valid gateway xxx.xxx.xxx.xxx"
- id: lan_dns
  label: LAN DNS
  kind: action
  command: "*lan.dns = {value}"
  params:
    - name: value
      type: string
      description: "E-Vision 6900: valid DNS xxx.xxx.xxx.xxx"
- id: lan_amx
  label: LAN AMX
  kind: action
  command: "*lan.amx = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=On,1=Off"

# --- PIP ---
- id: pip_mode
  label: PIP Mode
  kind: action
  command: "*pip.mode = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=On,1=Off"
- id: pip_input
  label: PIP Input
  kind: action
  command: "*pip.input = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=HDMI 1,1=HDMI 2,2=RGB (VGA),3=COMP,4=DisplayPort,5=HDBaseT,6=3G-SDI"
- id: pip_position
  label: PIP Position
  kind: action
  command: "*pip.position = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=TopLeft,1=TopRight,2=BottomLeft,3=BottomRight,4=PBP"

# --- POWER / SHUTTER / MUTE / STATUS ---
- id: power
  label: Power
  kind: action
  command: "*power = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=Off,1=On"
- id: shutter
  label: Shutter
  kind: action
  command: "*shutter = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=Open,1=Close"
- id: pic_mute
  label: Picture Mute
  kind: action
  command: "*pic.mute = {value}"
  params:
    - name: value
      type: enum
      description: "E-Vision 6900: 0=Open,1=Close"
- id: ac_voltage
  label: AC Voltage Range
  kind: action
  command: "*ac.voltage = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=90-150,1=160-264"
- id: brt_lock_pw
  label: Brightness Lock Password
  kind: action
  command: "*brt.lock.pw = {value}"
  params:
    - name: value
      type: string
      description: "Mercury Quad: XXXX (4 digits = user or supervisor mode password)"
- id: brt_lock_pw_set
  label: Brightness Lock Password Set
  kind: action
  command: "*brt.lock.pw.set = {value}"
  params:
    - name: value
      type: string
      description: "Mercury Quad: XXXX (4 digits = new user mode password)"
- id: brt_lock_level
  label: Brightness Lock Level
  kind: action
  command: "*brt.lock.level = {value}"
  params:
    - name: value
      type: enum
      description: "Mercury Quad: 0=Dual Lamps,1=Triple Lamps,2=Quad Lamps"
- id: brt_lock_rst
  label: Brightness Lock Reset
  kind: action
  command: "*brt.lock.rst"
  params: []
- id: factory_reset
  label: Factory Reset
  kind: action
  command: "*factory.reset"
  params: []

# --- INFORMATION (queries) ---
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
  label: Signal Info
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
- id: total_hours
  label: Total Hours
  kind: query
  command: "*total.hours ?"
  params: []
- id: lan_mac
  label: LAN MAC Address
  kind: query
  command: "*lan.mac ?"
  params: []
- id: atmos_alti
  label: Atmospheric Altitude
  kind: query
  command: "*atmos.alti ?"
  params: []
- id: atmos_pressure
  label: Atmospheric Pressure
  kind: query
  command: "*atmos.pressure ?"
  params: []
- id: ti
  label: Internal Temperature
  kind: query
  command: "*ti ?"
  params: []
- id: tc
  label: Color Temperature Reading
  kind: query
  command: "*tc ?"
  params: []
- id: fans
  label: Fan & Environment Status
  kind: query
  command: "*fans ?"
  params: []
- id: status
  label: Projector Status
  kind: query
  command: "*status ?"
  params: []
  # E-Vision 6900: 0=Power Off,1=Power On; Mercury Quad: 0=Standby,1=Warm Up,2=Imaging,3=Cooling,4=Error
- id: errcode
  label: Error Code
  kind: query
  command: "*errcode ?"
  params: []
```

## Feedbacks
```yaml
# Command acknowledgement responses (documented in source Responses section).
- id: command_ack
  type: string
  description: "Success response begins with ACK or ack, e.g. 'ACK aspect.ratio = 1'."
- id: command_nak
  type: string
  description: "Failure response is NAK or nack followed by a brief description of the problem."
- id: power_state
  type: enum
  values: [off, on]
  description: "Derived from `*status ?` / `*power ?`."
- id: projector_phase
  type: enum
  values: [standby, warm_up, imaging, cooling, error]
  description: "Mercury Quad status field."
```

## Variables
```yaml
# All settable parameters are represented as parameterized Actions above
# (brightness, contrast, keystone, color gains, etc.). No additional
# non-action variables documented.
# UNRESOLVED: none additional identified in source
```

## Events
```yaml
# The source documents no unsolicited notifications. All responses are
# solicited (reply to a command).
# UNRESOLVED: no unsolicited event mechanism described in source
```

## Macros
```yaml
# The source documents no multi-step command sequences.
# UNRESOLVED: no macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# The source states operational constraints (not safety interlocks):
#   - Only one control path (serial OR network) should be used at a time;
#     sending commands to both simultaneously may cause unpredictable behavior.
#   - You must wait for the complete response to a command before sending another.
#   - Lens commands only work when the projector is switched on and lens.lock is Off.
# No explicit safety interlock procedures or power-on sequencing warnings are documented.
# UNRESOLVED: no formal safety/interlock documentation present in source
```

## Notes
- Command format: ASCII string starting with `*`, terminated by Carriage Return (code 13 / 0x0D). Form: `*command operator value`. Spaces are required before the operator and before the value. `*orientation=3` is invalid (missing spaces).
- Operators: Set `= <value>`, Get `?`, Increment `+`, Decrement `-`, Execute (no operator). A bare `*command` with no operator sets the default value for settable commands (e.g. `*orientation` sets orientation to 0).
- Almost every command supports all five operators; the `command:` field above shows the primary set/execute/query payload, and the remaining operators apply the same `<name>` token.
- Default network settings: IP `192.168.0.100`, TCP port `7000`. Serial: 9600 baud, 8 data bits.
- Value ranges and feature availability are transcribed from the two source model columns (E-Vision 6900 and Mercury Quad).
- `pic.mode`, `gamma`, `brightness`, `contrast`, `saturation`, `hue` apply only to the current image source. `dblack` is not available in 3D. E-Vision 6900 accepts `saturation`/`hue` only when the input is YUV.
- `lens.save` with a get operator returns a bitmask string of occupied (1) / empty (0) memory slots.
- `user.target` / `user2.target` protocol values are multiples of 1000.

<!-- UNRESOLVED: Source document does not explicitly name the INSIGHT 4k Series; it documents the protocol via E-Vision 6900 and Mercury Quad columns. Exact applicability and value ranges for the INSIGHT 4k Series are unconfirmed. -->
<!-- UNRESOLVED: Serial parity, stop bits, and flow control not stated. -->
<!-- UNRESOLVED: Firmware version compatibility not stated. -->
<!-- UNRESOLVED: AC voltage spec values (90-150 / 160-264) transcribed verbatim but represent range codes, not invented ratings. -->
````

## Provenance

```yaml
source_domains:
  - digitalprojection.co.uk
  - manualslib.com
source_urls:
  - "https://digitalprojection.co.uk/dpdownloads/Protocol/Protocol%20Guide%20INSIGHT%204K.pdf"
  - https://digitalprojection.co.uk/dpdownloads/Protocol/Simplified-Protocol-Guide-Rev-H.pdf
  - "http://digitalprojection.co.uk/dpdownloads/Protocol/Protocol%20Guide%20INSIGHT%204K.pdf"
  - "http://digitalprojection.co.uk/dpdownloads/Protocol/Simplified%20Protocol%20Guide.pdf"
  - https://www.manualslib.com/manual/1276574/Digital-Projection-Insight-4k-Quad-Series.html
retrieved_at: 2026-08-08T17:15:43.794Z
last_checked_at: 2026-08-19T09:14:22.872Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:14:22.872Z
matched_actions: 253
action_count: 253
confidence: medium
summary: "Every spec action token appears verbatim in source command tables; transport values stated verbatim; full bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source document does not name \"INSIGHT 4k Series\" explicitly; it documents the shared protocol via the E-Vision 6900 and Mercury Quad model columns. Applicability and exact value ranges for the INSIGHT 4k Series are not confirmed against the device."
- "Firmware version compatibility not stated in source."
- "Serial parity, stop bits, and flow control not stated in source."
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "none additional identified in source"
- "no unsolicited event mechanism described in source"
- "no macros described in source"
- "no formal safety/interlock documentation present in source"
- "Source document does not explicitly name the INSIGHT 4k Series; it documents the protocol via E-Vision 6900 and Mercury Quad columns. Exact applicability and value ranges for the INSIGHT 4k Series are unconfirmed."
- "Serial parity, stop bits, and flow control not stated."
- "Firmware version compatibility not stated."
- "AC voltage spec values (90-150 / 160-264) transcribed verbatim but represent range codes, not invented ratings."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
