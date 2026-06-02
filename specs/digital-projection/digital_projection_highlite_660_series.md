---
spec_id: admin/digital-projection-highlite-660-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Digital Projection HIGHlite 660 Series Control Spec"
manufacturer: "Digital Projection"
model_family: "HIGHlite 660 2D"
aliases: []
compatible_with:
  manufacturers:
    - "Digital Projection"
  models:
    - "HIGHlite 660 2D"
    - "HIGHlite 660 3D"
    - "HIGHlite 740"
    - "HIGHlite 8000"
    - Lightning
    - "Mercury 930"
    - "M-Vision 930 3D"
    - "Titan LED"
    - "Titan 330"
    - "Titan 660"
    - "Titan 800"
    - "Titan 930"
    - "Titan Quad"
    - "Titan Super Quad"
    - "Quad 2000"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - digitalprojection.co.uk
  - applicationmarket.crestron.com
source_urls:
  - "http://digitalprojection.co.uk/dpdownloads/DP%20Resources%20115-759G/content/protocol/Protocol%20Guide%20Rev%20D.pdf"
  - https://applicationmarket.crestron.com/digital-projection-highlite-660-series/
  - https://applicationmarket.crestron.com/content/Help/Digital_Projection/digital_projection_hl660_v1_0_help_file.pdf
  - "http://digitalprojection.co.uk/dpdownloads/Protocol/Protocol%20Guide%20Rev%20A.pdf"
retrieved_at: 2026-05-01T00:18:24.749Z
last_checked_at: 2026-05-01T07:51:46.401Z
generated_at: 2026-05-01T07:51:46.401Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Section B (HIGHlite Laser 3D, M-Vision 930 3D) has distinct commands with different ranges; this spec covers Section A projectors only. Section B commands noted but not fully populated."
  - "populate from source"
  - "no unsolicited notifications described in source"
  - "no multi-step macros described in source"
  - "safety warnings not found in source beyond standard projector handling"
  - "Section B commands for HIGHlite Laser 3D and M-Vision 930 3D not fully populated"
  - "MCGD/target data commands (mcgd.data, tcgd1.data, tcgd2.data) have comma-separated coordinate input format not modeled in Actions"
  - "4corner commands (4corner.ulx/uly/urx/ury/llx/lly/lrx/lry) range -1000 to +1000 not fully represented"
  - "eb.blu coordinate commands (x1/y1/x2/y2/x3/y3/x4/y4) not fully modeled"
  - "lamp2/lamp3/lamp4 status values (0-19) not fully represented in Feedbacks"
verification:
  verdict: verified
  checked_at: 2026-05-01T07:51:46.401Z
  matched_actions: 150
  action_count: 150
  confidence: medium
  summary: "All 150 spec actions match Section A source commands with correct semantic coverage, all transport parameters verified against source, no fabrications or drift detected. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-01
---

# Digital Projection HIGHlite 660 Series Control Spec

## Summary
Projector controlled via RS-232 or TCP/IP (LAN) with ASCII command strings beginning with `*` and ending with Carriage Return (0x0D). Operators: `= <value>` (set), `?` (get/query), or no operator (execute). Responses: `ACK`/`ack` on success, `NAK`/`nack` on failure. Default IP 192.168.0.100, TCP port 7000. Serial: 38,400 baud, 8 data bits, 1 stop bit, no parity, no flow control.

<!-- UNRESOLVED: Section B (HIGHlite Laser 3D, M-Vision 930 3D) has distinct commands with different ranges; this spec covers Section A projectors only. Section B commands noted but not fully populated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7000  # stated: TCP port number
serial:
  baud_rate: 38400  # stated: Section A baud rate
  data_bits: 8  # stated
  parity: none  # stated
  stop_bits: 1  # stated
  flow_control: none  # stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# powerable: power on/off commands present
# routable: input routing commands present
# queryable: query commands returning state present
# levelable: brightness, contrast, hue, saturation, sharpness present
# geometric: geometry controls including keystone, 4-corner, warp present
# blendable: edge blend controls present
# pipable: PIP commands present
# targeable: 3D control commands present
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: input
  label: Select Input
  kind: action
  params:
    - name: source
      type: integer
      description: 0=CVBS1, 1=CVBS2, 2=S-Video, 3=Component, 4=VGA, 5=3G-SDI, 6=DVI, 7=HDMI, 8=Test Pattern. HIGHlite 660 3D adds: 9=HDBaseT, 10=DVI2, 11=HDMI2, 12=HDMI3, 13=DualPipe

- id: test_pattern
  label: Test Pattern
  kind: action
  params:
    - name: pattern
      type: integer
      description: 0=Grey V Bars, 1=Grey H Bars, 2=Aspect Test, 3=Alignment Grid, 4=Warp Adjust, 5=SMPTE, 6=Checkerboard, 7=White Field, 8=Black Field, 9=Screen Layout

- id: formatter_pattern
  label: Formatter Pattern
  kind: action
  params:
    - name: pattern
      type: integer
      description: 0=white, 1=black, 2=green, 3=red, 4=blue, 5=magenta, 6=cyan, 7=yellow, 8=checker, 9=align, 10=h-ramp, 11=v-ramp, 12=max lumens, 13=native white, 14=native black, 15=native green, 16=native red, 17=native blue, 18=native magenta, 19=native cyan, 20=native yellow, 21=off

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

- id: lens_center
  label: Lens Center
  kind: action
  params: []

- id: lens_up
  label: Lens Up
  kind: action
  params:
    - name: speed
      type: integer
      description: 0=slowest to 3=fastest

- id: lens_down
  label: Lens Down
  kind: action
  params:
    - name: speed
      type: integer
      description: 0=slowest to 3=fastest

- id: lens_left
  label: Lens Left
  kind: action
  params:
    - name: speed
      type: integer
      description: 0=slowest to 3=fastest

- id: lens_right
  label: Lens Right
  kind: action
  params:
    - name: speed
      type: integer
      description: 0=slowest to 3=fastest

- id: lens_stop
  label: Lens Stop
  kind: action
  params: []

- id: nudge_up
  label: Nudge Up
  kind: action
  params:
    - name: time
      type: integer
      description: 0=shortest to 3=longest

- id: nudge_down
  label: Nudge Down
  kind: action
  params:
    - name: time
      type: integer
      description: 0=shortest to 3=longest

- id: nudge_left
  label: Nudge Left
  kind: action
  params:
    - name: time
      type: integer
      description: 0=shortest to 3=longest

- id: nudge_right
  label: Nudge Right
  kind: action
  params:
    - name: time
      type: integer
      description: 0=shortest to 3=longest

- id: calibrate_zoom
  label: Calibrate Zoom
  kind: action
  params: []

- id: calibrate_focus
  label: Calibrate Focus
  kind: action
  params: []

- id: lensmemory_save
  label: Save Lens Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: 0 to 9

- id: lensmemory_recall
  label: Recall Lens Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: 0 to 9

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: gamma
  label: Gamma
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=1.0, 1=1.8, 2=2.0, 3=2.2, 4=2.4, 5=2.6, 6=2.8

- id: freeze
  label: Freeze
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: hue
  label: Hue
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: saturation
  label: Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: blacklevel_offset
  label: Black Level Offset
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=0 IRE, 1=7.5 IRE

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: detail
  label: Detail
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 100

- id: luma_sharpness
  label: Luma Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: 0=Off, 1=Low, 2=High

- id: chroma_sharpness
  label: Chroma Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: 0=Off, 1=Low, 2=High

- id: recursive_nr
  label: Recursive Noise Reduction
  kind: action
  params:
    - name: level
      type: integer
      description: 0=Off, 1=Low, 2=Medium, 3=High

- id: mosquito_nr
  label: Mosquito Noise Reduction
  kind: action
  params:
    - name: level
      type: integer
      description: 0=Off, 1=Low, 2=Medium, 3=High

- id: ccs
  label: Cross Color Suppression
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: vga_phase
  label: VGA Phase
  kind: action
  params:
    - name: value
      type: integer
      description: -15 to 15

- id: vga_samples
  label: VGA Total H Samples
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 1444

- id: vga_auto
  label: VGA Auto Setup
  kind: action
  params: []

- id: gamut
  label: Color Gamut
  kind: action
  params:
    - name: preset
      type: integer
      description: 0=Peak, 1=HDTV, 2=SDTV, 3=3200K, 4=5400K, 5=6500K, 6=8000K, 7=9000K, 8=User1, 9=User2

- id: red_lift
  label: Red Lift
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to +50

- id: green_lift
  label: Green Lift
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to +50

- id: blue_lift
  label: Blue Lift
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to +50

- id: red_gain
  label: Red Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to +50

- id: green_gain
  label: Green Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to +50

- id: blue_gain
  label: Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to +50

- id: red_dmd
  label: Red DMD
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: green_dmd
  label: Green DMD
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: blue_dmd
  label: Blue DMD
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Source, 1=Fill & Display, 2=Fill & Crop, 3=Anamorphic, 4=TheaterScope

- id: overscan
  label: Overscan
  kind: action
  params:
    - name: percent
      type: integer
      description: 0=0%, 1=2.5%, 2=5%, 3=7.5%

- id: sizepos_enable
  label: Size & Position Enable
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: sizepos_setting
  label: Size & Position Setting
  kind: action
  params:
    - name: mode
      type: enum
      values: [Global, Modal]

- id: h_position
  label: Horizontal Position
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to +50

- id: v_position
  label: Vertical Position
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to +50

- id: h_size
  label: Horizontal Size
  kind: action
  params:
    - name: value
      type: integer
      description: 50 to 400

- id: v_size
  label: Vertical Size
  kind: action
  params:
    - name: value
      type: integer
      description: 50 to 400

- id: sizepos_aspect
  label: Aspect Lock
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: blanking_enable
  label: Blanking Enable
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: blanking_top
  label: Blanking Top
  kind: action
  params:
    - name: value
      type: integer
      description: 1 to 100

- id: blanking_bottom
  label: Blanking Bottom
  kind: action
  params:
    - name: value
      type: integer
      description: 1 to 100

- id: blanking_left
  label: Blanking Left
  kind: action
  params:
    - name: value
      type: integer
      description: 1 to 255

- id: blanking_right
  label: Blanking Right
  kind: action
  params:
    - name: value
      type: integer
      description: 1 to 255

- id: geometry_engine
  label: Geometry Engine
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Off, 1=Keystone, 2=4 Corner, 3=Rotation, 4=Warp

- id: h_keystone
  label: Horizontal Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: -40 to +40

- id: v_keystone
  label: Vertical Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: -30 to +30

- id: pin_barrel
  label: Pin/Barrel Distortion
  kind: action
  params:
    - name: value
      type: integer
      description: -20 to +20

- id: warp_map
  label: Warp Map
  kind: action
  params:
    - name: map
      type: integer
      description: 0 to 8

- id: array_width
  label: Array Width
  kind: action
  params:
    - name: value
      type: integer
      description: 1 to 4

- id: array_height
  label: Array Height
  kind: action
  params:
    - name: value
      type: integer
      description: 1 to 4

- id: array_hset
  label: Array Horizontal Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 3

- id: array_vset
  label: Array Vertical Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 3

- id: scurve_value
  label: S-Curve Value
  kind: action
  params:
    - name: value
      type: integer
      description: 10 to 25 (maps to 1.0 to 2.5)

- id: blending
  label: Edge Blend
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Off, 1=On, 2=Alignment Pattern

- id: segmentation
  label: Segmentation
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: eb_top
  label: Edge Blend Top
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 720 (dependent on eb.bottom)

- id: eb_bottom
  label: Edge Blend Bottom
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 720 (dependent on eb.top)

- id: eb_left
  label: Edge Blend Left
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 1280 (dependent on eb.right)

- id: eb_right
  label: Edge Blend Right
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 1280 (dependent on eb.left)

- id: eb_blu_unblended
  label: Black Level Unblended
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 63

- id: eb_reset
  label: Edge Blend Reset
  kind: action
  params:
    - name: reset_type
      type: integer
      description: 1=reset width, 2=reset offset, 3=reset width+offset, 4=reset black level uplift, 5=reset width+black level uplift, 6=reset offset+black level offset, 7=reset all

- id: pip_mode
  label: PIP Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Off, 1=PIP, 2=PAP, 3=POP

- id: pip_input
  label: PIP Input
  kind: action
  params:
    - name: source
      type: integer
      description: 0=CVBS1, 1=CVBS2, 2=S-Video, 3=Component, 4=VGA, 5=3G-SDI, 6=DVI, 7=HDMI

- id: pip_size
  label: PIP Size
  kind: action
  params:
    - name: size
      type: integer
      description: 0=small, 1=medium, 2=large

- id: pip_position
  label: PIP Position
  kind: action
  params:
    - name: position
      type: integer
      description: 0=Top Left, 1=Top Right, 2=Bottom Left, 3=Bottom Right, 4=Custom

- id: pip_hpos
  label: PIP Horizontal Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 100

- id: pip_vpos
  label: PIP Vertical Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 100

- id: d3_enable
  label: 3D Enable
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: d3_frmultiplier
  label: 3D Frame Multiplier
  kind: action
  params:
    - name: multiplier
      type: integer
      description: 1=x1, 2=x2, 3=x3

- id: d3_darktime
  label: 3D Dark Time
  kind: action
  params:
    - name: time
      type: integer
      description: 0=0us, 1=650us, 2=1300us, 3=7500us

- id: d3_syncoffset
  label: 3D Sync Offset
  kind: action
  params:
    - name: value
      type: integer
      description: -15 to +15 (represents -1500us to +1500us)

- id: d3_syncpolarity
  label: 3D Sync Polarity
  kind: action
  params:
    - name: polarity
      type: enum
      values: [pos, neg]

- id: d3_dominance
  label: 3D Dominance
  kind: action
  params:
    - name: eye
      type: enum
      values: [left, right]

- id: d3_format
  label: 3D Format
  kind: action
  params:
    - name: format
      type: enum
      values: [auto, seq, fpack, tab, sbs]

- id: lamp1_hours
  label: Lamp 1 Hours
  kind: query
  params: []

- id: lamp1_strikes
  label: Lamp 1 Strikes
  kind: query
  params: []

- id: lamp1_serial
  label: Lamp 1 Serial
  kind: query
  params: []

- id: lamp1_status
  label: Lamp 1 Status
  kind: query
  params: []

- id: lamp_power
  label: Lamp Power
  kind: action
  params:
    - name: percent
      type: integer
      description: 1 to 100. HIGHlite 660/740/8000: 85-100. Lightning: 60-100. Mercury 930/Titan 800/930/Quad/Super Quad: 80-100

- id: lamp_mode
  label: Lamp Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "Dual: 0=both, 1=lamp1, 2=lamp2, 3=auto1. Quad: 0=all, 1=auto3, 2=auto2, 3=auto1, 4=lamp1+2+3, 5=lamp1+2+4, 6=lamp1+3+4, 7=lamp2+3+4, 8=lamp1+2, 9=lamp1+3, 10=lamp1+4, 11=lamp2+3, 12=lamp2+4, 13=lamp3+4, 14=lamp1, 15=lamp2, 16=lamp3, 17=lamp4"

- id: lamp2_hours
  label: Lamp 2 Hours
  kind: query
  params: []

- id: lamp2_strikes
  label: Lamp 2 Strikes
  kind: query
  params: []

- id: lamp2_serial
  label: Lamp 2 Serial
  kind: query
  params: []

- id: lamp2_status
  label: Lamp 2 Status
  kind: query
  params: []

- id: lamp3_hours
  label: Lamp 3 Hours
  kind: query
  params: []

- id: lamp4_hours
  label: Lamp 4 Hours
  kind: query
  params: []

- id: lamp3_strikes
  label: Lamp 3 Strikes
  kind: query
  params: []

- id: lamp4_strikes
  label: Lamp 4 Strikes
  kind: query
  params: []

- id: lamp3_serial
  label: Lamp 3 Serial
  kind: query
  params: []

- id: lamp4_serial
  label: Lamp 4 Serial
  kind: query
  params: []

- id: lamp3_status
  label: Lamp 3 Status
  kind: query
  params: []

- id: lamp4_status
  label: Lamp 4 Status
  kind: query
  params: []

- id: compensation_mode
  label: Compensation Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [auto, manual]

- id: compensation
  label: Compensation
  kind: action
  params:
    - name: value
      type: integer
      description: 1 to 200

- id: conditioning
  label: Conditioning
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: orientation
  label: Orientation
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Desktop Front, 1=Ceiling Front, 2=Desktop Rear, 3=Ceiling Rear

- id: control_dhcp
  label: Control DHCP
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: control_ip
  label: Control IP Address
  kind: action
  params:
    - name: address
      type: string
      description: IP address in xxx.xxx.xxx.xxx format

- id: control_subnet
  label: Control Subnet
  kind: action
  params:
    - name: address
      type: string
      description: Subnet address in xxx.xxx.xxx.xxx format

- id: shutter
  label: Shutter
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, open, close]

- id: ir_address
  label: IR Address
  kind: action
  params:
    - name: address
      type: integer
      description: 0 to 255

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []

- id: identify
  label: Identify Projector
  kind: action
  params: []

- id: latency
  label: Latency Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Low Latency, 1=Best Video

- id: dvi_boosteq
  label: DVI Boost Equalizer
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: digital_colspace
  label: Digital Color Space
  kind: action
  params:
    - name: space
      type: integer
      description: 0=RGB, 1=YPbPr, 2=Auto

- id: digital_range
  label: Digital Range
  kind: action
  params:
    - name: range
      type: integer
      description: 0=full, 1=limited, 2=auto

- id: dvi_port
  label: DVI Port
  kind: action
  params:
    - name: port
      type: integer
      description: 0=digital, 1=analog

- id: component_colspace
  label: Component Color Space
  kind: action
  params:
    - name: space
      type: integer
      description: 0=RGB, 1=YPbPr

- id: component_synctype
  label: Component Sync Type
  kind: action
  params:
    - name: type
      type: integer
      description: 0=3 wire, 1=4 wire, 2=Auto

- id: d3gsdi_stream
  label: 3G-SDI Stream
  kind: action
  params:
    - name: stream
      type: integer
      description: 0=Stream 1, 1=Stream 2

- id: lan_dhcp
  label: LAN DHCP
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: lan_ip
  label: LAN IP Address
  kind: action
  params:
    - name: address
      type: string
      description: IP address in xxx.xxx.xxx.xxx format

- id: lan_subnet
  label: LAN Subnet
  kind: action
  params:
    - name: address
      type: string
      description: Subnet address in xxx.xxx.xxx.xxx format

- id: lan_gateway
  label: LAN Gateway
  kind: action
  params:
    - name: address
      type: string
      description: Gateway address in xxx.xxx.xxx.xxx format

- id: lan_dns
  label: LAN DNS
  kind: action
  params:
    - name: address
      type: string
      description: DNS address in xxx.xxx.xxx.xxx format

- id: lan_standby
  label: LAN Standby
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: configuration
  label: Configuration
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=PIP, 1=Edge Blend

- id: sw_version
  label: Software Version
  kind: query
  params: []

- id: board_id
  label: Board ID
  kind: query
  params: []

- id: fw_version
  label: Firmware Version
  kind: query
  params: []

- id: from_version
  label: Factory ROM Version
  kind: query
  params: []

- id: lens_version
  label: Lens Version
  kind: query
  params: []

- id: seq_version
  label: Sequences Version
  kind: query
  params: []

- id: model_name
  label: Model Name
  kind: query
  params: []

- id: serial
  label: Serial Number
  kind: query
  params: []

- id: inlet_temp
  label: Inlet Temperature
  kind: query
  params: []

- id: dmd_temp
  label: DMD Temperature
  kind: query
  params: []

- id: board_id3d
  label: Board ID 3D
  kind: query
  params: []

- id: fw_version3d
  label: Firmware Version 3D
  kind: query
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: populate from source
```

## Variables
```yaml
# UNRESOLVED: populate from source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings not found in source beyond standard projector handling
```

## Notes
HIGHlite 660 Series supports both Section A commands (38,400 baud serial) and Section B commands (9,600 baud serial). This spec covers Section A projectors. Section B (HIGHlite Laser 3D, M-Vision 930 3D) has distinct command values and ranges not fully populated here. Only one control path (serial or network) should be used at a time — simultaneous commands to both ports may cause unpredictable behavior. Command must wait for complete response before sending next command.
<!-- UNRESOLVED: Section B commands for HIGHlite Laser 3D and M-Vision 930 3D not fully populated -->
<!-- UNRESOLVED: MCGD/target data commands (mcgd.data, tcgd1.data, tcgd2.data) have comma-separated coordinate input format not modeled in Actions -->
<!-- UNRESOLVED: 4corner commands (4corner.ulx/uly/urx/ury/llx/lly/lrx/lry) range -1000 to +1000 not fully represented -->
<!-- UNRESOLVED: eb.blu coordinate commands (x1/y1/x2/y2/x3/y3/x4/y4) not fully modeled -->
<!-- UNRESOLVED: lamp2/lamp3/lamp4 status values (0-19) not fully represented in Feedbacks -->

## Provenance

```yaml
source_domains:
  - digitalprojection.co.uk
  - applicationmarket.crestron.com
source_urls:
  - "http://digitalprojection.co.uk/dpdownloads/DP%20Resources%20115-759G/content/protocol/Protocol%20Guide%20Rev%20D.pdf"
  - https://applicationmarket.crestron.com/digital-projection-highlite-660-series/
  - https://applicationmarket.crestron.com/content/Help/Digital_Projection/digital_projection_hl660_v1_0_help_file.pdf
  - "http://digitalprojection.co.uk/dpdownloads/Protocol/Protocol%20Guide%20Rev%20A.pdf"
retrieved_at: 2026-05-01T00:18:24.749Z
last_checked_at: 2026-05-01T07:51:46.401Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-01T07:51:46.401Z
matched_actions: 150
action_count: 150
confidence: medium
summary: "All 150 spec actions match Section A source commands with correct semantic coverage, all transport parameters verified against source, no fabrications or drift detected. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Section B (HIGHlite Laser 3D, M-Vision 930 3D) has distinct commands with different ranges; this spec covers Section A projectors only. Section B commands noted but not fully populated."
- "populate from source"
- "no unsolicited notifications described in source"
- "no multi-step macros described in source"
- "safety warnings not found in source beyond standard projector handling"
- "Section B commands for HIGHlite Laser 3D and M-Vision 930 3D not fully populated"
- "MCGD/target data commands (mcgd.data, tcgd1.data, tcgd2.data) have comma-separated coordinate input format not modeled in Actions"
- "4corner commands (4corner.ulx/uly/urx/ury/llx/lly/lrx/lry) range -1000 to +1000 not fully represented"
- "eb.blu coordinate commands (x1/y1/x2/y2/x3/y3/x4/y4) not fully modeled"
- "lamp2/lamp3/lamp4 status values (0-19) not fully represented in Feedbacks"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
