---
spec_id: admin/digital-projection-highlite-laser-3d-ii-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Digital Projection HIGHlite Laser 3D II Series Control Spec"
manufacturer: "Digital Projection"
model_family: "HIGHlite Laser II 3D Series"
aliases: []
compatible_with:
  manufacturers:
    - "Digital Projection"
  models:
    - "HIGHlite Laser II 3D Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - digitalprojection.co.uk
  - web.archive.org
source_urls:
  - https://digitalprojection.co.uk/dpdownloads/Protocol/Simplified-Protocol-Guide-Rev-H.pdf
  - https://web.archive.org/web/20180921001306/http://www.digitalprojection.co.uk:80/dpdownloads/Protocol/Simplified-Protocol-Guide-Rev-H.pdf
retrieved_at: 2026-10-07T13:27:27.213Z
last_checked_at: 2026-10-07T13:27:27.213Z
generated_at: 2026-10-07T13:27:27.213Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Only one control path at a time should be used — simultaneous serial and network commands may cause unpredictable behavior (noted in source but protocol does not enforce mutual exclusion)"
  - "source does not document unsolicited event notifications"
  - "no explicit multi-step macros documented"
  - "no safety warnings or interlock procedures stated in source"
  - "firmware version compatibility not stated"
  - "fault behavior and error recovery sequences not documented"
  - "port number 7000 confirmed for TCP; RS-232 control via separate DB9 connection not detailed"
  - "command timing / minimum interpacket delay not specified"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:27:27.213Z
  matched_actions: 146
  action_count: 146
  confidence: medium
  summary: "All 146 action units match source commands with correct value shapes; transport supported; commands for the HL Laser II 3D column all represented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Digital Projection HIGHlite Laser 3D II Series Control Spec

## Summary
Laser phosphor projector controllable via RS-232C serial and TCP/IP Ethernet. Command protocol uses ASCII text strings prefixed with `*` and terminated with carriage return. Set operations use `= <value>`, queries use `?`, and execute commands have no operator. Responses return `ACK`/`ack` on success or `NAK`/`nack` on failure. Supports input routing, geometry correction, edge blend, 3D, PIP, and comprehensive image adjustments.

<!-- UNRESOLVED: Only one control path at a time should be used — simultaneous serial and network commands may cause unpredictable behavior (noted in source but protocol does not enforce mutual exclusion) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7000  # TCP port stated in source
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable       # power command present
- routable        # input selection commands present
- queryable       # get (?) operators present throughout
- levelable       # brightness, contrast, saturation, hue, sharpness, gain/lift, zoom, focus present
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Off, 1 = On

- id: input
  label: Input Select
  kind: action
  params:
    - name: value
      type: integer
      description: 0=HDMI1, 1=HDMI2, 2=RGB, 3=BNC, 4=DVI, 5=DP, 6=HDBT, 7=HDSDI

- id: input_get
  label: Input Query
  kind: query
  params: []

- id: test_pattern
  label: Test Pattern
  kind: action
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

- id: pic_mode
  label: Picture Mode
  kind: action
  params:
    - name: value
      type: integer
      description: 0=High Bright, 1=Presentation, 2=Video

- id: db_on
  label: Dynamic Black
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off, 1=On

- id: gamma
  label: Gamma
  kind: action
  params:
    - name: value
      type: integer
      description: 0=1.0, 1=1.8, 2=2.0, 3=2.2, 4=2.35, 5=2.5

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
      description: 0 to 15

- id: freeze
  label: Freeze
  kind: action
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
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Auto, 1=YPbPr, 2=YCbCr, 3=RGB-PC, 4=RGB-Video

- id: color_temp
  label: Color Temperature
  kind: action
  params:
    - name: value
      type: integer
      description: 0=3200K, 1=5400K, 2=6500K, 3=7500K, 4=9300K, 5=Native

- id: color_mode
  label: Color Mode
  kind: action
  params:
    - name: value
      type: integer
      description: 0=ColorMax, 1=Manual Color Matching, 2=Color Temperature, 3=Gains and Lifts

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: value
      type: integer
      description: 0=5:4, 1=4:3, 2=16:10, 3=16:9, 4=1.88, 5=2.35, 6=Theaterscope, 7=Source, 8=Unscaled

- id: h_keystone
  label: Horizontal Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: -470 to +470

- id: v_keystone
  label: Vertical Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: -400 to +400

- id: eb_stat
  label: Edge Blend Status
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off, 1=On

- id: laser_mode
  label: Laser Mode
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Eco, 1=Normal, 2=Custom

- id: laser_power
  label: Laser Power
  kind: action
  params:
    - name: value
      type: integer
      description: 30-100 (only when laser.mode=2)

- id: orientation
  label: Orientation
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Desktop Front, 1=Ceiling Front, 2=Desktop Rear, 3=Ceiling Rear

- id: shutter
  label: Shutter
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Open, 1=Close

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []

- id: nr_temporal
  label: Temporal Noise Reduction
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 3 (integer)

- id: nr_block
  label: Block Noise Reduction
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 3 (integer)

- id: nr_mosquito
  label: Mosquito Noise Reduction
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 3 (integer)

- id: nr_hori
  label: Horizontal Noise Reduction
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 3 (integer)

- id: nr_vert
  label: Vertical Noise Reduction
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 3 (integer)

- id: nr_reset
  label: Noise Reduction Reset
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 3 (integer)

- id: image_position
  label: Image Position
  kind: action
  params:
    - name: command
      type: string
      description: h.position, v.position
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: vga_phase
  label: VGA Phase
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 31 (integer)

- id: tracking
  label: Tracking
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: sync_level
  label: Sync Level
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: color_max
  label: ColorMax
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = REC709, 1 = EBU, 2 = SMPTE, 3 = Native, 4 = User 1, 5 = User 2

- id: color_lift
  label: Color Lift
  kind: action
  params:
    - name: command
      type: string
      description: red.lift, green.lift, blue.lift
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: color_gain
  label: Color Gain
  kind: action
  params:
    - name: command
      type: string
      description: red.gain, green.gain, blue.gain
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: gainlift_reset
  label: Gains And Lifts Reset
  kind: action
  params: []

- id: auto_test_ptrn
  label: Automatic Test Pattern
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Off, 1 = On

- id: user_std
  label: User Standard Color Data
  kind: action
  params:
    - name: command
      type: string
      description: user.std.rx, user.std.ry, user.std.gx, user.std.gy, user.std.bx, user.std.by, user.std.wx, user.std.wy
    - name: value
      type: integer
      description: 'user.std.rx: 550 to 750 (integer); user.std.ry: 250 to 450 (integer); user.std.gx: 200 to 400 (integer); user.std.gy: 400 to 750 (integer); user.std.bx: 50 to 250 (integer); user.std.by: 0 to 120 (integer); user.std.wx: 200 to 400 (integer); user.std.wy: 250 to 450 (integer)'

- id: user_std_reset
  label: User Standard Color Data Reset
  kind: action
  params: []

- id: user_target
  label: User Target Color Data
  kind: action
  params:
    - name: command
      type: string
      description: user.target.rx, user.target.ry, user.target.gx, user.target.gy, user.target.bx, user.target.by, user.target.wx, user.target.wy, user.target.cx, user.target.cy, user.target.mx, user.target.my, user.target.yx, user.target.yy, user2.target.rx, user2.target.ry, user2.target.gx, user2.target.gy, user2.target.bx, user2.target.by, user2.target.wx, user2.target.wy, user2.target.cx, user2.target.cy, user2.target.mx, user2.target.my, user2.target.yx, user2.target.yy
    - name: value
      type: integer
      description: 'user.target.rx / user2.target.rx: 550 to 750 (integer); user.target.ry / user2.target.ry: 250 to 450 (integer); user.target.gx / user2.target.gx: 200 to 400 (integer); user.target.gy / user2.target.gy: 400 to 750 (integer); user.target.bx / user2.target.bx: 50 to 250 (integer); user.target.by / user2.target.by: 0 to 120 (integer); user.target.wx / user2.target.wx: 200 to 400 (integer); user.target.wy / user2.target.wy: 250 to 450 (integer); user.target.cx / user2.target.cx: 125 to 325 (integer); user.target.cy / user2.target.cy: 225 to 425 (integer); user.target.mx / user2.target.mx: 200 to 400 (integer); user.target.my / user2.target.my: 50 to 250 (integer); user.target.yx / user2.target.yx: 300 to 500 (integer); user.target.yy / user2.target.yy: 400 to 600 (integer). Protocol values are multiples of 1000.'

- id: user_target_reset
  label: User Target Color Data Reset
  kind: action
  params:
    - name: command
      type: string
      description: user.target.reset, user2.target.reset

- id: hsg_hue
  label: Manual Color Hue
  kind: action
  params:
    - name: command
      type: string
      description: hsg.hue.r, hsg.hue.g, hsg.hue.b, hsg.hue.c, hsg.hue.m, hsg.hue.y
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_sat
  label: Manual Color Saturation
  kind: action
  params:
    - name: command
      type: string
      description: hsg.sat.r, hsg.sat.g, hsg.sat.b, hsg.sat.c, hsg.sat.m, hsg.sat.y
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_gain
  label: Manual Color Gain
  kind: action
  params:
    - name: command
      type: string
      description: hsg.gain.r, hsg.gain.g, hsg.gain.b, hsg.gain.c, hsg.gain.m, hsg.gain.y
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_white
  label: Manual White Balance
  kind: action
  params:
    - name: command
      type: string
      description: hsg.white.r, hsg.white.g, hsg.white.b
    - name: value
      type: integer
      description: 0 to 200 (integer)

- id: hsg_reset
  label: Manual Color Matching Reset
  kind: action
  params: []

- id: digi_zoom
  label: Digital Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 100 (integer)

- id: digi_pan
  label: Digital Pan
  kind: action
  params:
    - name: value
      type: integer
      description: -320 to +320 (integer)

- id: digi_pan_bound
  label: Digital Pan Bound
  kind: action
  params:
    - name: value
      type: integer
      description: -320 to +320 (integer)

- id: digi_scan
  label: Digital Scan
  kind: action
  params:
    - name: value
      type: integer
      description: -200 to +200 (integer)

- id: digi_scan_bound
  label: Digital Scan Bound
  kind: action
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
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Off, 1 = Crop, 2 = Zoom

- id: rotation
  label: Rotation
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to +100 (integer)

- id: pin_barrel
  label: Pin And Barrel Correction
  kind: action
  params:
    - name: command
      type: string
      description: h.pin.barrel, v.pin.barrel
    - name: value
      type: integer
      description: -150 to +300 (integer)

- id: four_corner
  label: Four Corner Correction
  kind: action
  params:
    - name: command
      type: string
      description: 4corner.ulx, 4corner.uly, 4corner.urx, 4corner.ury, 4corner.llx, 4corner.lly, 4corner.lrx, 4corner.lry
    - name: value
      type: integer
      description: '4corner.ulx / 4corner.urx / 4corner.llx / 4corner.lrx: -192 to +192 (integer); 4corner.uly / 4corner.ury / 4corner.lly / 4corner.lry: -120 to +120 (integer)'

- id: arc
  label: Arc Correction
  kind: action
  params:
    - name: command
      type: string
      description: arc.top, arc.bottom, arc.left, arc.right
    - name: value
      type: integer
      description: -150 to +150 (integer)

- id: blanking
  label: Blanking
  kind: action
  params:
    - name: command
      type: string
      description: blanking.top, blanking.bottom, blanking.left, blanking.right
    - name: value
      type: integer
      description: 'blanking.top / blanking.bottom: 0 to 360 (integer); blanking.left / blanking.right: 0 to 534 (integer)'

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
      description: 0 = none (no warp function is set), 1 = Keystone, 2 = Four Corner, 3 = Rotation, 4 = Pin/Barrel, 5 = Arc

- id: cust_wp_write
  label: Custom Warp Write
  kind: action
  params:
    - name: value
      type: integer
      description: 1 = User 1 file, 2 = User 2 file

- id: cust_wp_clear
  label: Custom Warp Clear
  kind: action
  params:
    - name: value
      type: integer
      description: 1 = User 1 file, 2 = User 2 file

- id: cust_wp_send
  label: Custom Warp Transfer
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = custom warp transfer mode off, 1 = custom warp transfer User 1 file, 2 = custom warp transfer User 2 file

- id: warp_cust
  label: Custom Warp
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Off, 1 = User 1, 2 = User 2

- id: eb_adl
  label: Edge Blend ADL
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Off, 1 = On

- id: edge_blend_width
  label: Edge Blend Width
  kind: action
  params:
    - name: command
      type: string
      description: eb.top, eb.bottom, eb.left, eb.right
    - name: value
      type: integer
      description: 'eb.top / eb.bottom: 0, 100 to 500; eb.left / eb.right: 0, 100 to 800'

- id: edge_blend_black_level_edge
  label: Edge Blend Black Level Edge
  kind: action
  params:
    - name: command
      type: string
      description: eb.blu.btm, eb.blu.left, eb.blu.right
    - name: value
      type: integer
      description: 0 to 32 (integer)

- id: eb_all
  label: Edge Blend All Colors
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 255 (integer)

- id: edge_blend_color
  label: Edge Blend Color
  kind: action
  params:
    - name: command
      type: string
      description: eb.red, eb.green, eb.blue
    - name: value
      type: integer
      description: 0 to 255 (integer)

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
      description: 0 = Off, 1 = Auto, 2 = Side-By-Side (Half), 3 = Top-And-Bottom, 4 = Dual-Pipe, 5 = Frame Sequential

- id: 3d_dominance
  label: 3D Dominance
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Normal, 1 = Reverse

- id: 3d_darktime
  label: 3D Dark Time
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = 0.65 ms, 1 = 1.3 ms, 2 = 1.95 ms, 3 = 2.5 ms

- id: 3d_syncoffset
  label: 3D Sync Offset
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 60 (integer)

- id: 3d_syncref
  label: 3D Sync Reference
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = External, 1 = Internal

- id: altitude
  label: Altitude
  kind: action
  params:
    - name: value
      type: integer
      description: 1 = On, 2 = Auto

- id: screen_setting
  label: Screen Setting
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = 16:10, 1 = 16:9, 2 = 4:3

- id: auto_poweroff
  label: Automatic Power Off
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Off, 1 = On

- id: auto_poweron
  label: Automatic Power On
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Off, 1 = On

- id: schedule_power
  label: Scheduled Power
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Off, 1 = On

- id: schedule_on_day
  label: Scheduled Power On Day
  kind: action
  params:
    - name: command
      type: string
      description: schedule1.on.day, schedule2.on.day
    - name: value
      type: integer
      description: '= 76543210 (Bit 6 = Sat, Bit5 = Fri, Bit4 = Thu, Bit3 = Wed, Bit2 = Tue, Bit1 = Mon, Bit0 = Sun)'

- id: schedule_off_day
  label: Scheduled Power Off Day
  kind: action
  params:
    - name: command
      type: string
      description: schedule1.off.day, schedule2.off.day
    - name: value
      type: integer
      description: '= 76543210 (Bit 6 = Sat, Bit5 = Fri, Bit4 = Thu, Bit3 = Wed, Bit2 = Tue, Bit1 = Mon, Bit0 = Sun)'

- id: schedule_on_time
  label: Scheduled Power On Time
  kind: action
  params:
    - name: command
      type: string
      description: schedule1.on.time, schedule2.on.time
    - name: value
      type: string
      description: HH:MM

- id: schedule_off_time
  label: Scheduled Power Off Time
  kind: action
  params:
    - name: command
      type: string
      description: schedule1.off.time, schedule2.off.time
    - name: value
      type: string
      description: HH:MM

- id: date
  label: Date
  kind: action
  params:
    - name: value
      type: string
      description: yyyy/MM/dd

- id: time_zone
  label: Time Zone
  kind: action
  params:
    - name: value
      type: integer
      description: -11 to +12 (integer)

- id: time_adjust
  label: Time Adjustment
  kind: action
  params:
    - name: value
      type: string
      description: HH:MM

- id: startup_logo
  label: Startup Logo
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Off, 1 = On

- id: trigger
  label: Trigger
  kind: action
  params:
    - name: command
      type: string
      description: trig.1, trig.2
    - name: value
      type: integer
      description: 0 = Off, 1 = Screen, 2 = 5:4, 3 = 4:3, 4 = 16:10, 5 = 16:9, 6 = 1.88, 7 = 2.35, 8 = Theaterscope, 9 = Source, 10 = Unscalled, 11 = RS232, 12 = RS232 on, 13 = RS232 off

- id: auto_source
  label: Automatic Source Selection
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Off, 1 = On

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

- id: osd_menupos
  label: OSD Menu Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Top Left, 1 = Top Right, 2 = Bottom Left, 3 = Bottom Right, 4 = Center

- id: osd_trans
  label: OSD Transparency
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = 0%, 1 = 25%, 2 = 50%, 3 = 75%

- id: osd_timer
  label: OSD Timer
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Always On, 1 = 10 Seconds, 2 = 30 Seconds, 3 = 60 Seconds

- id: osd_msgbox
  label: OSD Message Box
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Off, 1 = On

- id: recall_mem
  label: Recall Memory
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Preset A, 1 = Preset B, 2 = Preset C, 3 = Preset D, 4 = Default

- id: save_mem
  label: Save Memory
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Preset A, 1 = Preset B, 2 = Preset C, 3 = Preset D

- id: network_mode
  label: Network Mode
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Projector Control, 1 = Service

- id: lan_power
  label: LAN Power
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Off, 1 = On

- id: lan_dhcp_set
  label: LAN DHCP
  kind: action
  params:
    - name: command
      type: string
      description: lan.dhcp
    - name: value
      type: integer
      description: 0 = Off, 1 = On

- id: lan_ip_set
  label: LAN IP Address
  kind: action
  params:
    - name: command
      type: string
      description: lan.ip
    - name: value
      type: string
      description: 'A valid IP address in the following format: xxx.xxx.xxx.xxx'

- id: lan_subnet_set
  label: LAN Subnet Address
  kind: action
  params:
    - name: command
      type: string
      description: lan.subnet
    - name: value
      type: string
      description: 'A valid subnet address in the following format: xxx.xxx.xxx.xxx'

- id: lan_gateway_set
  label: LAN Gateway Address
  kind: action
  params:
    - name: command
      type: string
      description: lan.gateway
    - name: value
      type: string
      description: 'A valid gateway address in the following format: xxx.xxx.xxx.xxx'

- id: lan_dns
  label: LAN DNS Address
  kind: action
  params:
    - name: value
      type: string
      description: 'A valid DNS address in the following format: xxx.xxx.xxx.xxx'

- id: lan_amx
  label: LAN AMX
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Off, 1 = On

- id: pip_mode
  label: PIP Mode
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = Off, 1 = On

- id: pip_input
  label: PIP Input
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = HDMI 1, 1 = HDMI 2, 2 = RGB (VGA), 3 = COMP, 4 = DisplayPort, 5 = HDBaseT, 6 = 3G-SDI

- id: pip_position
  label: PIP Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = TopLeft, 1 = TopRight, 2 = BottomLeft, 3 = BottomRight, 4 = PBP
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [0, 1]
  description: 0=Off, 1=On
  query_command: power

- id: input_state
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7]
  description: 0=HDMI1, 1=HDMI2, 2=RGB, 3=BNC, 4=DVI, 5=DP, 6=HDBT, 7=HDSDI
  query_command: input

- id: status_state
  type: enum
  values: [0, 1, 2, 3, 4]
  description: 0=Standby, 1=Warm Up, 2=Imaging, 3=Cooling, 4=Error
  query_command: status

- id: errcode
  type: string
  description: Error code string
  query_command: errcode

- id: model_name
  type: string
  description: Model name string
  query_command: model.name

- id: serial_number
  type: string
  description: Serial number string
  query_command: serial

- id: sw_version
  type: string
  description: Firmware version string
  query_command: sw.version

- id: laser_hours
  type: integer
  description: Laser hours counter
  query_command: laser.hours

- id: total_hours
  type: integer
  description: Total projector hours
  query_command: total.hours

- id: act_source
  type: string
  description: Active source string
  query_command: act.source

- id: signal_info
  type: string
  description: Signal information string
  query_command: signal

- id: cust_wp_ck_sum
  type: integer
  description: Returns the unsigned 32 bits check sum by summing all bytes in the current sent warp file when cust.wp.send is not zero
  query_command: cust.wp.ck.sum

- id: lan_mac
  type: string
  description: string
  query_command: lan.mac

- id: h_refresh
  type: number
  description: number
  query_command: h.refresh

- id: v_refresh
  type: number
  description: number
  query_command: v.refresh

- id: pixel_clock
  type: number
  description: number
  query_command: pixel.clock

- id: atmos_alti
  type: number
  description: number
  query_command: atmos.alti

- id: atmos_pressure
  type: number
  description: number
  query_command: atmos.pressure

- id: ac_voltage
  type: enum
  values: [0, 1]
  description: 0 = 90~150, 1 = 160~264
  query_command: ac.voltage

- id: ti
  type: number
  description: number
  query_command: ti

- id: tc
  type: number
  description: number
  query_command: tc

- id: fans
  type: string
  description: All fan & environment status
  query_command: fans

- id: water_pump
  type: number
  description: number
  query_command: water.pump
```

## Variables
```yaml
# Image adjustments
- id: brightness_var
  type: integer
  range: [0, 200]

- id: contrast_var
  type: integer
  range: [0, 200]

- id: saturation_var
  type: integer
  range: [0, 200]

- id: hue_var
  type: integer
  range: [0, 200]

- id: sharpness_var
  type: integer
  range: [0, 15]

# Color adjustments
- id: red_lift
  type: integer
  range: [0, 200]

- id: green_lift
  type: integer
  range: [0, 200]

- id: blue_lift
  type: integer
  range: [0, 200]

- id: red_gain
  type: integer
  range: [0, 200]

- id: green_gain
  type: integer
  range: [0, 200]

- id: blue_gain
  type: integer
  range: [0, 200]

# Geometry
- id: h_position
  type: integer
  range: [0, 200]

- id: v_position
  type: integer
  range: [0, 200]

- id: digi_zoom
  type: integer
  range: [0, 100]

- id: digi_pan
  type: integer
  range: [-320, 320]

- id: digi_scan
  type: integer
  range: [-200, 200]

# Network
- id: lan_ip
  type: string
  description: IP address string

- id: lan_subnet
  type: string
  description: Subnet address string

- id: lan_gateway
  type: string
  description: Gateway address string

- id: lan_dhcp
  type: enum
  values: [0, 1]
  description: 0=Off, 1=On
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event notifications
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
Command format: `*<command> <operator> <value>` terminated by ASCII CR (code 13). Spaces required before operator and value. Examples: `*orientation = 3`, `*aspect.ratio ?`, `*zoom.in`. Setting default: enter command without operator, e.g. `*orientation` defaults to 0 (Desktop Front). Only one control path (serial or network) should be used at a time — simultaneous commands may cause unpredictable behavior. Wait for complete response before sending next command.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not documented -->
<!-- UNRESOLVED: port number 7000 confirmed for TCP; RS-232 control via separate DB9 connection not detailed -->
<!-- UNRESOLVED: command timing / minimum interpacket delay not specified -->

## Provenance

```yaml
source_domains:
  - digitalprojection.co.uk
  - web.archive.org
source_urls:
  - https://digitalprojection.co.uk/dpdownloads/Protocol/Simplified-Protocol-Guide-Rev-H.pdf
  - https://web.archive.org/web/20180921001306/http://www.digitalprojection.co.uk:80/dpdownloads/Protocol/Simplified-Protocol-Guide-Rev-H.pdf
retrieved_at: 2026-10-07T13:27:27.213Z
last_checked_at: 2026-10-07T13:27:27.213Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:27:27.213Z
matched_actions: 146
action_count: 146
confidence: medium
summary: "All 146 action units match source commands with correct value shapes; transport supported; commands for the HL Laser II 3D column all represented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Only one control path at a time should be used — simultaneous serial and network commands may cause unpredictable behavior (noted in source but protocol does not enforce mutual exclusion)"
- "source does not document unsolicited event notifications"
- "no explicit multi-step macros documented"
- "no safety warnings or interlock procedures stated in source"
- "firmware version compatibility not stated"
- "fault behavior and error recovery sequences not documented"
- "port number 7000 confirmed for TCP; RS-232 control via separate DB9 connection not detailed"
- "command timing / minimum interpacket delay not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
