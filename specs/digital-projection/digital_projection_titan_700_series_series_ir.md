---
spec_id: admin/digital-projection-titan-700-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Digital Projection Titan 700 Series Control Spec"
manufacturer: "Digital Projection"
model_family: "Titan 330"
aliases: []
compatible_with:
  manufacturers:
    - "Digital Projection"
  models:
    - "Titan 330"
    - "Titan 660"
    - "Titan 800"
    - "Titan 930"
    - "Titan Quad"
    - "Titan Super Quad"
    - "Titan Quad 2000"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - digitalprojection.co.uk
  - applicationmarket.crestron.com
  - manualslib.com
source_urls:
  - "https://digitalprojection.co.uk/dpdownloads/Protocol/Protocol%20Guide%20Rev%20A.pdf"
  - https://applicationmarket.crestron.com/content/Help/Digital_Projection/Digital_Projection_Titan_Serial_v2_0_Help.pdf
  - "https://www.manualslib.com/manual/1206365/Digital-Projection-Titan-SxPlus600.html?page=137"
retrieved_at: 2026-06-01T06:24:14.868Z
last_checked_at: 2026-06-02T10:14:02.420Z
generated_at: 2026-06-02T10:14:02.420Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "some Titan 700 sub-models (330/660/800/930/Quad/SuperQuad/Quad2000) may have slightly different command coverage; product-badge tables in source distinguish per-model applicability"
  - "no unsolicited event notifications documented in source"
  - "no explicit macro sequences documented in source"
  - "lamp1.status/lamp2.status/lamp3.status/lamp4.status return integer codes mapped in source; enumerating all 20 states as Feedbacks is inferred from the status table"
verification:
  verdict: verified
  checked_at: 2026-06-02T10:14:02.420Z
  matched_actions: 300
  action_count: 300
  confidence: medium
  summary: "All 300 spec action units match verbatim source tokens including the source-typo wire token confguration; transport fully confirmed. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Digital Projection Titan 700 Series Control Spec

## Summary
Digital Projection Titan 700 Series professional projectors support both RS-232 serial and TCP/IP network control. Serial config is 38400 baud, 8N1. TCP uses port 7000 with default IP 192.168.0.100. Commands are ASCII text strings starting with `*` and ending with CR; responses return `ACK` or `NAK`.

<!-- UNRESOLVED: some Titan 700 sub-models (330/660/800/930/Quad/SuperQuad/Quad2000) may have slightly different command coverage; product-badge tables in source distinguish per-model applicability -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7000
auth:
  type: none
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
- id: input_set
  label: Set Input
  kind: action
  command: "*input = {value}"
  params:
    - name: value
      type: integer
      description: "0=CVBS1, 1=CVBS2, 2=S-Video, 3=Component, 4=VGA, 5=3G-SDI, 6=DVI, 7=HDMI, 8=TestPattern, 9=Main/DVI, 10=Sub/HDMI, 11=DualPipe, 9=HDBaseT (HIGHlite3D), 10=DVI2 (HIGHlite3D), 11=HDMI2 (HIGHlite3D), 12=HDMI3 (HIGHlite3D), 13=DualPipe (HIGHlite3D)"

- id: input_query
  label: Input Query
  kind: query
  command: "*input ?"
  params: []

- id: test_pattern_set
  label: Set Test Pattern
  kind: action
  command: "*test.pattern = {value}"
  params:
    - name: value
      type: integer
      description: "0=GreyVBars, 1=GreyHBars, 2=AspectTest, 3=AlignmentGrid, 4=WarpAdjust, 5=SMPTE, 6=Checkerboard, 7=WhiteField, 8=BlackField, 9=ScreenLayout"

- id: test_pattern_query
  label: Test Pattern Query
  kind: query
  command: "*test.pattern ?"
  params: []

- id: formatter_pattern_set
  label: Set Formatter Pattern
  kind: action
  command: "*formatter.pattern = {value}"
  params:
    - name: value
      type: integer
      description: "0=white, 1=black, 2=green, 3=red, 4=blue, 5=magenta, 6=cyan, 7=yellow, 8=checker, 9=align, 10=h-ramp, 11=v-ramp, 12=maxlumens, 13=nativewhite, 14=nativeblack, 15=nativegreen, 16=nativered, 17=nativeblue, 18=nativemagenta, 19=nativecyan, 20=nativeyellow, 21=off"

- id: formatter_pattern_query
  label: Formatter Pattern Query
  kind: query
  command: "*formatter.pattern ?"
  params: []

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

- id: lens_center
  label: Lens Center
  kind: action
  command: "*lens.center"
  params: []

- id: nudge_up
  label: Nudge Up
  kind: action
  command: "*nudge.up = {value}"
  params:
    - name: value
      type: integer
      description: "0=shortest, 3=longest"

- id: nudge_down
  label: Nudge Down
  kind: action
  command: "*nudge.down = {value}"
  params:
    - name: value
      type: integer
      description: "0=shortest, 3=longest"

- id: nudge_left
  label: Nudge Left
  kind: action
  command: "*nudge.left = {value}"
  params:
    - name: value
      type: integer
      description: "0=shortest, 3=longest"

- id: nudge_right
  label: Nudge Right
  kind: action
  command: "*nudge.right = {value}"
  params:
    - name: value
      type: integer
      description: "0=shortest, 3=longest"

- id: lens_up
  label: Lens Up
  kind: action
  command: "*lens.up = {value}"
  params:
    - name: value
      type: integer
      description: "0-3"

- id: lens_down
  label: Lens Down
  kind: action
  command: "*lens.down = {value}"
  params:
    - name: value
      type: integer
      description: "0-3"

- id: lens_left
  label: Lens Left
  kind: action
  command: "*lens.left = {value}"
  params:
    - name: value
      type: integer
      description: "0-3"

- id: lens_right
  label: Lens Right
  kind: action
  command: "*lens.right = {value}"
  params:
    - name: value
      type: integer
      description: "0-3"

- id: lens_stop
  label: Lens Stop
  kind: action
  command: "*lens.stop"
  params: []

- id: calibrate_zoom
  label: Calibrate Zoom
  kind: action
  command: "*calibrate.zoom"
  params: []

- id: calibrate_focus
  label: Calibrate Focus
  kind: action
  command: "*calibrate.focus"
  params: []

- id: lensmemory_save
  label: Save Lens Memory
  kind: action
  command: "*lensmemory.save = {slot}"
  params:
    - name: slot
      type: integer
      description: "0-9"

- id: lensmemory_recall
  label: Recall Lens Memory
  kind: action
  command: "*lensmemory.recall = {slot}"
  params:
    - name: slot
      type: integer
      description: "0-9"

- id: brightness_set
  label: Set Brightness
  kind: action
  command: "*brightness = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: brightness_query
  label: Brightness Query
  kind: query
  command: "*brightness ?"
  params: []

- id: contrast_set
  label: Set Contrast
  kind: action
  command: "*contrast = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: contrast_query
  label: Contrast Query
  kind: query
  command: "*contrast ?"
  params: []

- id: gamma_set
  label: Set Gamma
  kind: action
  command: "*gamma = {value}"
  params:
    - name: value
      type: integer
      description: "0=1.0, 1=1.8, 2=2.0, 3=2.2, 4=2.4, 5=2.6, 6=2.8"

- id: gamma_query
  label: Gamma Query
  kind: query
  command: "*gamma ?"
  params: []

- id: freeze_set
  label: Set Freeze
  kind: action
  command: "*freeze = {value}"
  params:
    - name: value
      type: string
      description: "On, Off"

- id: freeze_query
  label: Freeze Query
  kind: query
  command: "*freeze ?"
  params: []

- id: hue_set
  label: Set Hue
  kind: action
  command: "*hue = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: hue_query
  label: Hue Query
  kind: query
  command: "*hue ?"
  params: []

- id: saturation_set
  label: Set Saturation
  kind: action
  command: "*saturation = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: saturation_query
  label: Saturation Query
  kind: query
  command: "*saturation ?"
  params: []

- id: blacklevel_offset_set
  label: Set Black Level Offset
  kind: action
  command: "*blacklevel.offset = {value}"
  params:
    - name: value
      type: integer
      description: "0=0IRE, 1=7.5IRE"

- id: blacklevel_offset_query
  label: Black Level Offset Query
  kind: query
  command: "*blacklevel.offset ?"
  params: []

- id: sharpness_set
  label: Set Sharpness
  kind: action
  command: "*sharpness = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to 50"

- id: sharpness_query
  label: Sharpness Query
  kind: query
  command: "*sharpness ?"
  params: []

- id: detail_set
  label: Set Detail
  kind: action
  command: "*detail = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100"

- id: detail_query
  label: Detail Query
  kind: query
  command: "*detail ?"
  params: []

- id: luma_sharpness_set
  label: Set Luma Sharpness
  kind: action
  command: "*luma.sharpness = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Low, 2=High"

- id: luma_sharpness_query
  label: Luma Sharpness Query
  kind: query
  command: "*luma.sharpness ?"
  params: []

- id: chroma_sharpness_set
  label: Set Chroma Sharpness
  kind: action
  command: "*chroma.sharpness = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Low, 2=High"

- id: chroma_sharpness_query
  label: Chroma Sharpness Query
  kind: query
  command: "*chroma.sharpness ?"
  params: []

- id: recursive_nr_set
  label: Set Recursive NR
  kind: action
  command: "*recursive.nr = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Low, 2=Medium, 3=High"

- id: recursive_nr_query
  label: Recursive NR Query
  kind: query
  command: "*recursive.nr ?"
  params: []

- id: mosquito_nr_set
  label: Set Mosquito NR
  kind: action
  command: "*mosquito.nr = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Low, 2=Medium, 3=High"

- id: mosquito_nr_query
  label: Mosquito NR Query
  kind: query
  command: "*mosquito.nr ?"
  params: []

- id: ccs_set
  label: Set CCS
  kind: action
  command: "*ccs = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"

- id: ccs_query
  label: CCS Query
  kind: query
  command: "*ccs ?"
  params: []

- id: vga_phase_set
  label: Set VGA Phase
  kind: action
  command: "*vga.phase = {value}"
  params:
    - name: value
      type: integer
      description: "-15 to 15"

- id: vga_phase_query
  label: VGA Phase Query
  kind: query
  command: "*vga.phase ?"
  params: []

- id: vga_samples_set
  label: Set VGA Samples
  kind: action
  command: "*vga.samples = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 1444"

- id: vga_samples_query
  label: VGA Samples Query
  kind: query
  command: "*vga.samples ?"
  params: []

- id: vga_auto
  label: VGA Auto Setup
  kind: action
  command: "*vga.auto"
  params: []

- id: gamut_set
  label: Set Gamut
  kind: action
  command: "*gamut = {value}"
  params:
    - name: value
      type: integer
      description: "0=Peak, 1=HDTV, 2=SDTV, 3=3200K, 4=5400K, 5=6500K, 6=8000K, 7=9000K, 8=User1, 9=User2"

- id: gamut_query
  label: Gamut Query
  kind: query
  command: "*gamut ?"
  params: []

- id: mcgd_data_set
  label: Set MCGD Data
  kind: action
  command: "*mcgd.data = {green_x},{green_y},{red_x},{red_y},{blue_x},{blue_y},{white_x},{white_y}"
  params:
    - name: green_x
      type: number
      description: "green-x coordinate, with leading 0 (e.g. 0.663)"
    - name: green_y
      type: number
      description: "green-y coordinate"
    - name: red_x
      type: number
      description: "red-x coordinate"
    - name: red_y
      type: number
      description: "red-y coordinate"
    - name: blue_x
      type: number
      description: "blue-x coordinate"
    - name: blue_y
      type: number
      description: "blue-y coordinate"
    - name: white_x
      type: number
      description: "white-x coordinate"
    - name: white_y
      type: number
      description: "white-y coordinate"

- id: mcgd_data_query
  label: MCGD Data Query
  kind: query
  command: "*mcgd.data ?"
  params: []

- id: tcgd1_data_set
  label: Set TCGD1 Data
  kind: action
  command: "*tcgd1.data = {green_x},{green_y},{red_x},{red_y},{blue_x},{blue_y},{white_x},{white_y}"
  params:
    - name: green_x
      type: number
      description: "green-x coordinate, with leading 0"
    - name: green_y
      type: number
      description: "green-y coordinate"
    - name: red_x
      type: number
      description: "red-x coordinate"
    - name: red_y
      type: number
      description: "red-y coordinate"
    - name: blue_x
      type: number
      description: "blue-x coordinate"
    - name: blue_y
      type: number
      description: "blue-y coordinate"
    - name: white_x
      type: number
      description: "white-x coordinate"
    - name: white_y
      type: number
      description: "white-y coordinate"

- id: tcgd1_data_query
  label: TCGD1 Data Query
  kind: query
  command: "*tcgd1.data ?"
  params: []

- id: tcgd2_data_set
  label: Set TCGD2 Data
  kind: action
  command: "*tcgd2.data = {green_x},{green_y},{red_x},{red_y},{blue_x},{blue_y},{white_x},{white_y}"
  params:
    - name: green_x
      type: number
      description: "green-x coordinate, with leading 0"
    - name: green_y
      type: number
      description: "green-y coordinate"
    - name: red_x
      type: number
      description: "red-x coordinate"
    - name: red_y
      type: number
      description: "red-y coordinate"
    - name: blue_x
      type: number
      description: "blue-x coordinate"
    - name: blue_y
      type: number
      description: "blue-y coordinate"
    - name: white_x
      type: number
      description: "white-x coordinate"
    - name: white_y
      type: number
      description: "white-y coordinate"

- id: tcgd2_data_query
  label: TCGD2 Data Query
  kind: query
  command: "*tcgd2.data ?"
  params: []

- id: red_lift_set
  label: Set Red Lift
  kind: action
  command: "*red.lift = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to +50"

- id: red_lift_query
  label: Red Lift Query
  kind: query
  command: "*red.lift ?"
  params: []

- id: green_lift_set
  label: Set Green Lift
  kind: action
  command: "*green.lift = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to +50"

- id: green_lift_query
  label: Green Lift Query
  kind: query
  command: "*green.lift ?"
  params: []

- id: blue_lift_set
  label: Set Blue Lift
  kind: action
  command: "*blue.lift = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to +50"

- id: blue_lift_query
  label: Blue Lift Query
  kind: query
  command: "*blue.lift ?"
  params: []

- id: red_gain_set
  label: Set Red Gain
  kind: action
  command: "*red.gain = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to +50"

- id: red_gain_query
  label: Red Gain Query
  kind: query
  command: "*red.gain ?"
  params: []

- id: green_gain_set
  label: Set Green Gain
  kind: action
  command: "*green.gain = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to +50"

- id: green_gain_query
  label: Green Gain Query
  kind: query
  command: "*green.gain ?"
  params: []

- id: blue_gain_set
  label: Set Blue Gain
  kind: action
  command: "*blue.gain = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to +50"

- id: blue_gain_query
  label: Blue Gain Query
  kind: query
  command: "*blue.gain ?"
  params: []

- id: red_dmd_set
  label: Set Red DMD
  kind: action
  command: "*red.dmd = {value}"
  params:
    - name: value
      type: string
      description: "On, Off"

- id: red_dmd_query
  label: Red DMD Query
  kind: query
  command: "*red.dmd ?"
  params: []

- id: green_dmd_set
  label: Set Green DMD
  kind: action
  command: "*green.dmd = {value}"
  params:
    - name: value
      type: string
      description: "On, Off"

- id: green_dmd_query
  label: Green DMD Query
  kind: query
  command: "*green.dmd ?"
  params: []

- id: blue_dmd_set
  label: Set Blue DMD
  kind: action
  command: "*blue.dmd = {value}"
  params:
    - name: value
      type: string
      description: "On, Off"

- id: blue_dmd_query
  label: Blue DMD Query
  kind: query
  command: "*blue.dmd ?"
  params: []

- id: aspect_ratio_set
  label: Set Aspect Ratio
  kind: action
  command: "*aspect.ratio = {value}"
  params:
    - name: value
      type: integer
      description: "0=Source, 1=Fill&Display, 2=Fill&Crop, 3=Anamorphic, 4=TheaterScope"

- id: aspect_ratio_query
  label: Aspect Ratio Query
  kind: query
  command: "*aspect.ratio ?"
  params: []

- id: overscan_set
  label: Set Overscan
  kind: action
  command: "*overscan = {value}"
  params:
    - name: value
      type: integer
      description: "0=0%, 1=2.5%, 2=5%, 3=7.5%"

- id: overscan_query
  label: Overscan Query
  kind: query
  command: "*overscan ?"
  params: []

- id: sizepos_enable_set
  label: Set SizePos Enable
  kind: action
  command: "*sizepos.enable = {value}"
  params:
    - name: value
      type: string
      description: "On, Off"

- id: sizepos_enable_query
  label: SizePos Enable Query
  kind: query
  command: "*sizepos.enable ?"
  params: []

- id: sizepos_setting_set
  label: Set SizePos Setting
  kind: action
  command: "*sizepos.setting = {value}"
  params:
    - name: value
      type: string
      description: "Global, Modal"

- id: sizepos_setting_query
  label: SizePos Setting Query
  kind: query
  command: "*sizepos.setting ?"
  params: []

- id: h_position_set
  label: Set H Position
  kind: action
  command: "*h.position = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to +50"

- id: h_position_query
  label: H Position Query
  kind: query
  command: "*h.position ?"
  params: []

- id: v_position_set
  label: Set V Position
  kind: action
  command: "*v.position = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to +50"

- id: v_position_query
  label: V Position Query
  kind: query
  command: "*v.position ?"
  params: []

- id: h_size_set
  label: Set H Size
  kind: action
  command: "*h.size = {value}"
  params:
    - name: value
      type: integer
      description: "50 to 400"

- id: h_size_query
  label: H Size Query
  kind: query
  command: "*h.size ?"
  params: []

- id: sizepos_aspect_set
  label: Set SizePos Aspect
  kind: action
  command: "*sizepos.aspect = {value}"
  params:
    - name: value
      type: string
      description: "On, Off"

- id: sizepos_aspect_query
  label: SizePos Aspect Query
  kind: query
  command: "*sizepos.aspect ?"
  params: []

- id: v_size_set
  label: Set V Size
  kind: action
  command: "*v.size = {value}"
  params:
    - name: value
      type: integer
      description: "50 to 400"

- id: v_size_query
  label: V Size Query
  kind: query
  command: "*v.size ?"
  params: []

- id: blanking_enable_set
  label: Set Blanking Enable
  kind: action
  command: "*blanking.enable = {value}"
  params:
    - name: value
      type: string
      description: "On, Off"

- id: blanking_enable_query
  label: Blanking Enable Query
  kind: query
  command: "*blanking.enable ?"
  params: []

- id: blanking_top_set
  label: Set Blanking Top
  kind: action
  command: "*blanking.top = {value}"
  params:
    - name: value
      type: integer
      description: "1 to 100"

- id: blanking_top_query
  label: Blanking Top Query
  kind: query
  command: "*blanking.top ?"
  params: []

- id: blanking_bottom_set
  label: Set Blanking Bottom
  kind: action
  command: "*blanking.bottom = {value}"
  params:
    - name: value
      type: integer
      description: "1 to 100"

- id: blanking_bottom_query
  label: Blanking Bottom Query
  kind: query
  command: "*blanking.bottom ?"
  params: []

- id: blanking_left_set
  label: Set Blanking Left
  kind: action
  command: "*blanking.left = {value}"
  params:
    - name: value
      type: integer
      description: "1 to 255"

- id: blanking_left_query
  label: Blanking Left Query
  kind: query
  command: "*blanking.left ?"
  params: []

- id: blanking_right_set
  label: Set Blanking Right
  kind: action
  command: "*blanking.right = {value}"
  params:
    - name: value
      type: integer
      description: "1 to 255"

- id: blanking_right_query
  label: Blanking Right Query
  kind: query
  command: "*blanking.right ?"
  params: []

- id: geometry_engine_set
  label: Set Geometry Engine
  kind: action
  command: "*geometry.engine = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Keystone, 2=4Corner, 3=Rotation, 4=Warp"

- id: geometry_engine_query
  label: Geometry Engine Query
  kind: query
  command: "*geometry.engine ?"
  params: []

- id: h_keystone_set
  label: Set H Keystone
  kind: action
  command: "*h.keystone = {value}"
  params:
    - name: value
      type: integer
      description: "-40 to +40"

- id: h_keystone_query
  label: H Keystone Query
  kind: query
  command: "*h.keystone ?"
  params: []

- id: v_keystone_set
  label: Set V Keystone
  kind: action
  command: "*v.keystone = {value}"
  params:
    - name: value
      type: integer
      description: "-30 to +30"

- id: v_keystone_query
  label: V Keystone Query
  kind: query
  command: "*v.keystone ?"
  params: []

- id: pin_barrel_set
  label: Set Pin Barrel
  kind: action
  command: "*pin.barrel = {value}"
  params:
    - name: value
      type: integer
      description: "-20 to +20"

- id: pin_barrel_query
  label: Pin Barrel Query
  kind: query
  command: "*pin.barrel ?"
  params: []

- id: 4corner_ulx_set
  label: Set 4 Corner ULX
  kind: action
  command: "*4corner.ulx = {value}"
  params:
    - name: value
      type: integer
      description: "-1000 to +1000"

- id: 4corner_ulx_query
  label: 4 Corner ULX Query
  kind: query
  command: "*4corner.ulx ?"
  params: []

- id: 4corner_uly_set
  label: Set 4 Corner ULY
  kind: action
  command: "*4corner.uly = {value}"
  params:
    - name: value
      type: integer
      description: "-1000 to +1000"

- id: 4corner_uly_query
  label: 4 Corner ULY Query
  kind: query
  command: "*4corner.uly ?"
  params: []

- id: 4corner_urx_set
  label: Set 4 Corner URX
  kind: action
  command: "*4corner.urx = {value}"
  params:
    - name: value
      type: integer
      description: "-1000 to +1000"

- id: 4corner_urx_query
  label: 4 Corner URX Query
  kind: query
  command: "*4corner.urx ?"
  params: []

- id: 4corner_ury_set
  label: Set 4 Corner URY
  kind: action
  command: "*4corner.ury = {value}"
  params:
    - name: value
      type: integer
      description: "-1000 to +1000"

- id: 4corner_ury_query
  label: 4 Corner URY Query
  kind: query
  command: "*4corner.ury ?"
  params: []

- id: 4corner_llx_set
  label: Set 4 Corner LLX
  kind: action
  command: "*4corner.llx = {value}"
  params:
    - name: value
      type: integer
      description: "-1000 to +1000"

- id: 4corner_llx_query
  label: 4 Corner LLX Query
  kind: query
  command: "*4corner.llx ?"
  params: []

- id: 4corner_lly_set
  label: Set 4 Corner LLY
  kind: action
  command: "*4corner.lly = {value}"
  params:
    - name: value
      type: integer
      description: "-1000 to +1000"

- id: 4corner_lly_query
  label: 4 Corner LLY Query
  kind: query
  command: "*4corner.lly ?"
  params: []

- id: 4corner_lrx_set
  label: Set 4 Corner LRX
  kind: action
  command: "*4corner.lrx = {value}"
  params:
    - name: value
      type: integer
      description: "-1000 to +1000"

- id: 4corner_lrx_query
  label: 4 Corner LRX Query
  kind: query
  command: "*4corner.lrx ?"
  params: []

- id: 4corner_lry_set
  label: Set 4 Corner LRY
  kind: action
  command: "*4corner.lry = {value}"
  params:
    - name: value
      type: integer
      description: "-1000 to +1000"

- id: 4corner_lry_query
  label: 4 Corner LRY Query
  kind: query
  command: "*4corner.lry ?"
  params: []

- id: rotation_set
  label: Set Rotation
  kind: action
  command: "*rotation = {value}"
  params:
    - name: value
      type: integer
      description: "-180 to 180"

- id: rotation_query
  label: Rotation Query
  kind: query
  command: "*rotation ?"
  params: []

- id: warp_map_set
  label: Set Warp Map
  kind: action
  command: "*warp.map = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 8"

- id: warp_map_query
  label: Warp Map Query
  kind: query
  command: "*warp.map ?"
  params: []

- id: array_width_set
  label: Set Array Width
  kind: action
  command: "*array.width = {value}"
  params:
    - name: value
      type: integer
      description: "1 to 4"

- id: array_width_query
  label: Array Width Query
  kind: query
  command: "*array.width ?"
  params: []

- id: array_height_set
  label: Set Array Height
  kind: action
  command: "*array.height = {value}"
  params:
    - name: value
      type: integer
      description: "1 to 4"

- id: array_height_query
  label: Array Height Query
  kind: query
  command: "*array.height ?"
  params: []

- id: array_hset_set
  label: Set Array H Set
  kind: action
  command: "*array.hset = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 3"

- id: array_hset_query
  label: Array H Set Query
  kind: query
  command: "*array.hset ?"
  params: []

- id: array_vset_set
  label: Set Array V Set
  kind: action
  command: "*array.vset = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 3"

- id: array_vset_query
  label: Array V Set Query
  kind: query
  command: "*array.vset ?"
  params: []

- id: scurve_value_set
  label: Set S Curve Value
  kind: action
  command: "*scurve.value = {value}"
  params:
    - name: value
      type: integer
      description: "10 to 25 (maps to 1.0 to 2.5)"

- id: scurve_value_query
  label: S Curve Value Query
  kind: query
  command: "*scurve.value ?"
  params: []

- id: blending_set
  label: Set Blending
  kind: action
  command: "*blending = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=AlignmentPattern"

- id: blending_query
  label: Blending Query
  kind: query
  command: "*blending ?"
  params: []

- id: segmentation_set
  label: Set Segmentation
  kind: action
  command: "*segmentation = {value}"
  params:
    - name: value
      type: string
      description: "On, Off"

- id: segmentation_query
  label: Segmentation Query
  kind: query
  command: "*segmentation ?"
  params: []

- id: eb_top_set
  label: Set EB Top
  kind: action
  command: "*eb.top = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 720 depending on eb.bottom"

- id: eb_top_query
  label: EB Top Query
  kind: query
  command: "*eb.top ?"
  params: []

- id: eb_bottom_set
  label: Set EB Bottom
  kind: action
  command: "*eb.bottom = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 720 depending on eb.top"

- id: eb_bottom_query
  label: EB Bottom Query
  kind: query
  command: "*eb.bottom ?"
  params: []

- id: eb_left_set
  label: Set EB Left
  kind: action
  command: "*eb.left = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 1280 depending on eb.right"

- id: eb_left_query
  label: EB Left Query
  kind: query
  command: "*eb.left ?"
  params: []

- id: eb_right_set
  label: Set EB Right
  kind: action
  command: "*eb.right = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 1280 depending on eb.left"

- id: eb_right_query
  label: EB Right Query
  kind: query
  command: "*eb.right ?"
  params: []

- id: eb_blu_unblended_set
  label: Set EB BLU Unblended
  kind: action
  command: "*eb.blu.unblended = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 63"

- id: eb_blu_unblended_query
  label: EB BLU Unblended Query
  kind: query
  command: "*eb.blu.unblended ?"
  params: []

- id: eb_blu_topl_set
  label: Set EB BLU Top Left
  kind: action
  command: "*eb.blu.topl = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 63"

- id: eb_blu_topl_query
  label: EB BLU Top Left Query
  kind: query
  command: "*eb.blu.topl ?"
  params: []

- id: eb_blu_top_set
  label: Set EB BLU Top
  kind: action
  command: "*eb.blu.top = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 63"

- id: eb_blu_top_query
  label: EB BLU Top Query
  kind: query
  command: "*eb.blu.top ?"
  params: []

- id: eb_blu_topr_set
  label: Set EB BLU Top Right
  kind: action
  command: "*eb.blu.topr = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 63"

- id: eb_blu_topr_query
  label: EB BLU Top Right Query
  kind: query
  command: "*eb.blu.topr ?"
  params: []

- id: eb_blu_bottoml_set
  label: Set EB BLU Bottom Left
  kind: action
  command: "*eb.blu.bottoml = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 63"

- id: eb_blu_bottoml_query
  label: EB BLU Bottom Left Query
  kind: query
  command: "*eb.blu.bottoml ?"
  params: []

- id: eb_blu_bottom_set
  label: Set EB BLU Bottom
  kind: action
  command: "*eb.blu.bottom = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 63"

- id: eb_blu_bottom_query
  label: EB BLU Bottom Query
  kind: query
  command: "*eb.blu.bottom ?"
  params: []

- id: eb_blu_bottomr_set
  label: Set EB BLU Bottom Right
  kind: action
  command: "*eb.blu.bottomr = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 63"

- id: eb_blu_bottomr_query
  label: EB BLU Bottom Right Query
  kind: query
  command: "*eb.blu.bottomr ?"
  params: []

- id: eb_blu_midl_set
  label: Set EB BLU Mid Left
  kind: action
  command: "*eb.blu.midl = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 63"

- id: eb_blu_midl_query
  label: EB BLU Mid Left Query
  kind: query
  command: "*eb.blu.midl ?"
  params: []

- id: eb_blu_midr_set
  label: Set EB BLU Mid Right
  kind: action
  command: "*eb.blu.midr = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 63"

- id: eb_blu_midr_query
  label: EB BLU Mid Right Query
  kind: query
  command: "*eb.blu.midr ?"
  params: []

- id: eb_blu_x1_set
  label: Set EB BLU X1
  kind: action
  command: "*eb.blu.x1 = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100"

- id: eb_blu_x1_query
  label: EB BLU X1 Query
  kind: query
  command: "*eb.blu.x1 ?"
  params: []

- id: eb_blu_y1_set
  label: Set EB BLU Y1
  kind: action
  command: "*eb.blu.y1 = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100"

- id: eb_blu_y1_query
  label: EB BLU Y1 Query
  kind: query
  command: "*eb.blu.y1 ?"
  params: []

- id: eb_blu_x2_set
  label: Set EB BLU X2
  kind: action
  command: "*eb.blu.x2 = {value}"
  params:
    - name: value
      type: integer
      description: "-100 to 0"

- id: eb_blu_x2_query
  label: EB BLU X2 Query
  kind: query
  command: "*eb.blu.x2 ?"
  params: []

- id: eb_blu_y2_set
  label: Set EB BLU Y2
  kind: action
  command: "*eb.blu.y2 = {value}"
  params:
    - name: value
      type: integer
      description: "-100 to 0"

- id: eb_blu_y2_query
  label: EB BLU Y2 Query
  kind: query
  command: "*eb.blu.y2 ?"
  params: []

- id: eb_blu_x3_set
  label: Set EB BLU X3
  kind: action
  command: "*eb.blu.x3 = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100"

- id: eb_blu_x3_query
  label: EB BLU X3 Query
  kind: query
  command: "*eb.blu.x3 ?"
  params: []

- id: eb_blu_y3_set
  label: Set EB BLU Y3
  kind: action
  command: "*eb.blu.y3 = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100"

- id: eb_blu_y3_query
  label: EB BLU Y3 Query
  kind: query
  command: "*eb.blu.y3 ?"
  params: []

- id: eb_blu_x4_set
  label: Set EB BLU X4
  kind: action
  command: "*eb.blu.x4 = {value}"
  params:
    - name: value
      type: integer
      description: "-100 to 0"

- id: eb_blu_x4_query
  label: EB BLU X4 Query
  kind: query
  command: "*eb.blu.x4 ?"
  params: []

- id: eb_blu_y4_set
  label: Set EB BLU Y4
  kind: action
  command: "*eb.blu.y4 = {value}"
  params:
    - name: value
      type: integer
      description: "-100 to 0"

- id: eb_blu_y4_query
  label: EB BLU Y4 Query
  kind: query
  command: "*eb.blu.y4 ?"
  params: []

- id: eb_reset_set
  label: EB Reset
  kind: action
  command: "*eb.reset = {value}"
  params:
    - name: value
      type: integer
      description: "1=reset width, 2=reset offset, 3=reset width+offset, 4=reset black level uplift, 5=reset width+black level uplift, 6=reset offset+black level offset, 7=reset all"

- id: pip_mode_set
  label: Set PIP Mode
  kind: action
  command: "*pip.mode = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=PIP, 2=PAP, 3=POP"

- id: pip_mode_query
  label: PIP Mode Query
  kind: query
  command: "*pip.mode ?"
  params: []

- id: pip_input_set
  label: Set PIP Input
  kind: action
  command: "*pip.input = {value}"
  params:
    - name: value
      type: integer
      description: "0=CVBS1, 1=CVBS2, 2=S-Video, 3=Component, 4=VGA, 5=3G-SDI, 6=DVI, 7=HDMI"

- id: pip_input_query
  label: PIP Input Query
  kind: query
  command: "*pip.input ?"
  params: []

- id: pip_size_set
  label: Set PIP Size
  kind: action
  command: "*pip.size = {value}"
  params:
    - name: value
      type: integer
      description: "0=small, 1=medium, 2=large"

- id: pip_size_query
  label: PIP Size Query
  kind: query
  command: "*pip.size ?"
  params: []

- id: pip_position_set
  label: Set PIP Position
  kind: action
  command: "*pip.position = {value}"
  params:
    - name: value
      type: integer
      description: "0=TopLeft, 1=TopRight, 2=BottomLeft, 3=BottomRight, 4=Custom"

- id: pip_position_query
  label: PIP Position Query
  kind: query
  command: "*pip.position ?"
  params: []

- id: pip_hpos_set
  label: Set PIP H Position
  kind: action
  command: "*pip.hpos = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100"

- id: pip_hpos_query
  label: PIP H Position Query
  kind: query
  command: "*pip.hpos ?"
  params: []

- id: pip_vpos_set
  label: Set PIP V Position
  kind: action
  command: "*pip.vpos = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100"

- id: pip_vpos_query
  label: PIP V Position Query
  kind: query
  command: "*pip.vpos ?"
  params: []

- id: 3d_enable_set
  label: Set 3D Enable
  kind: action
  command: "*3d.enable = {value}"
  params:
    - name: value
      type: string
      description: "On, Off"

- id: 3d_enable_query
  label: 3D Enable Query
  kind: query
  command: "*3d.enable ?"
  params: []

- id: 3d_frmultiplier_set
  label: Set 3D Frame Multiplier
  kind: action
  command: "*3d.frmultiplier = {value}"
  params:
    - name: value
      type: integer
      description: "1=x1, 2=x2, 3=x3"

- id: 3d_frmultiplier_query
  label: 3D Frame Multiplier Query
  kind: query
  command: "*3d.frmultiplier ?"
  params: []

- id: 3d_darktime_set
  label: Set 3D Dark Time
  kind: action
  command: "*3d.darktime = {value}"
  params:
    - name: value
      type: integer
      description: "0=0us, 1=650us, 2=1300us, 3=7500us"

- id: 3d_darktime_query
  label: 3D Dark Time Query
  kind: query
  command: "*3d.darktime ?"
  params: []

- id: 3d_syncoffset_set
  label: Set 3D Sync Offset
  kind: action
  command: "*3d.syncoffset = {value}"
  params:
    - name: value
      type: integer
      description: "-15 to +15 (represents -1500us to +1500us)"

- id: 3d_syncoffset_query
  label: 3D Sync Offset Query
  kind: query
  command: "*3d.syncoffset ?"
  params: []

- id: 3d_syncpolarity_set
  label: Set 3D Sync Polarity
  kind: action
  command: "*3d.syncpolarity = {value}"
  params:
    - name: value
      type: string
      description: "pos, neg"

- id: 3d_syncpolarity_query
  label: 3D Sync Polarity Query
  kind: query
  command: "*3d.syncpolarity ?"
  params: []

- id: 3d_dominance_set
  label: Set 3D Dominance
  kind: action
  command: "*3d.dominance = {value}"
  params:
    - name: value
      type: string
      description: "left, right"

- id: 3d_dominance_query
  label: 3D Dominance Query
  kind: query
  command: "*3d.dominance ?"
  params: []

- id: 3d_format_set
  label: Set 3D Format
  kind: action
  command: "*3d.format = {value}"
  params:
    - name: value
      type: string
      description: "auto, seq, fpack, tab, sbs"

- id: 3d_format_query
  label: 3D Format Query
  kind: query
  command: "*3d.format ?"
  params: []

- id: lamp1_hours_query
  label: Lamp 1 Hours Query
  kind: query
  command: "*lamp1.hours ?"
  params: []

- id: lamp1_strikes_query
  label: Lamp 1 Strikes Query
  kind: query
  command: "*lamp1.strikes ?"
  params: []

- id: lamp1_serial_query
  label: Lamp 1 Serial Query
  kind: query
  command: "*lamp1.serial ?"
  params: []

- id: lamp1_status_query
  label: Lamp 1 Status Query
  kind: query
  command: "*lamp1.status ?"
  params: []

- id: lamp_power_set
  label: Set Lamp Power
  kind: action
  command: "*lamp.power = {value}"
  params:
    - name: value
      type: integer
      description: "1 to 100 (range varies by model: HIGHlite660/730/740/8000=85-100, Lightning=60-100, Mercury930/Titan800/930/Quad/SuperQuad/Quad2000=80-100)"

- id: lamp_power_query
  label: Lamp Power Query
  kind: query
  command: "*lamp.power ?"
  params: []

- id: lamp_mode_set
  label: Set Lamp Mode
  kind: action
  command: "*lamp.mode = {value}"
  params:
    - name: value
      type: integer
      description: "Dual: 0=both, 1=lamp1, 2=lamp2, 3=auto1. Quad: 0=all, 1=auto3, 2=auto2, 3=auto1, 4=l123, 5=l124, 6=l134, 7=l234, 8=l12, 9=l13, 10=l14, 11=l23, 12=l24, 13=l34, 14=lamp1, 15=lamp2, 16=lamp3, 17=lamp4"

- id: lamp_mode_query
  label: Lamp Mode Query
  kind: query
  command: "*lamp.mode ?"
  params: []

- id: lamp2_hours_query
  label: Lamp 2 Hours Query
  kind: query
  command: "*lamp2.hours ?"
  params: []

- id: lamp2_strikes_query
  label: Lamp 2 Strikes Query
  kind: query
  command: "*lamp2.strikes ?"
  params: []

- id: lamp2_serial_query
  label: Lamp 2 Serial Query
  kind: query
  command: "*lamp2.serial ?"
  params: []

- id: lamp2_status_query
  label: Lamp 2 Status Query
  kind: query
  command: "*lamp2.status ?"
  params: []

- id: compensation_mode_set
  label: Set Compensation Mode
  kind: action
  command: "*compensation.mode = {value}"
  params:
    - name: value
      type: string
      description: "auto, manual"

- id: compensation_mode_query
  label: Compensation Mode Query
  kind: query
  command: "*compensation.mode ?"
  params: []

- id: compensation_set
  label: Set Compensation
  kind: action
  command: "*compensation = {value}"
  params:
    - name: value
      type: integer
      description: "1 to 200"

- id: compensation_query
  label: Compensation Query
  kind: query
  command: "*compensation ?"
  params: []

- id: conditioning_set
  label: Set Conditioning
  kind: action
  command: "*conditioning = {value}"
  params:
    - name: value
      type: string
      description: "On, Off"

- id: conditioning_query
  label: Conditioning Query
  kind: query
  command: "*conditioning ?"
  params: []

- id: lamp3_hours_query
  label: Lamp 3 Hours Query
  kind: query
  command: "*lamp3.hours ?"
  params: []

- id: lamp4_hours_query
  label: Lamp 4 Hours Query
  kind: query
  command: "*lamp4.hours ?"
  params: []

- id: lamp3_strikes_query
  label: Lamp 3 Strikes Query
  kind: query
  command: "*lamp3.strikes ?"
  params: []

- id: lamp4_strikes_query
  label: Lamp 4 Strikes Query
  kind: query
  command: "*lamp4.strikes ?"
  params: []

- id: lamp3_serial_query
  label: Lamp 3 Serial Query
  kind: query
  command: "*lamp3.serial ?"
  params: []

- id: lamp4_serial_query
  label: Lamp 4 Serial Query
  kind: query
  command: "*lamp4.serial ?"
  params: []

- id: lamp3_status_query
  label: Lamp 3 Status Query
  kind: query
  command: "*lamp3.status ?"
  params: []

- id: lamp4_status_query
  label: Lamp 4 Status Query
  kind: query
  command: "*lamp4.status ?"
  params: []

- id: orientation_set
  label: Set Orientation
  kind: action
  command: "*orientation = {value}"
  params:
    - name: value
      type: integer
      description: "0=DesktopFront, 1=CeilingFront, 2=DesktopRear, 3=CeilingRear"

- id: orientation_query
  label: Orientation Query
  kind: query
  command: "*orientation ?"
  params: []

- id: control_dhcp_set
  label: Set Control DHCP
  kind: action
  command: "*control.dhcp = {value}"
  params:
    - name: value
      type: string
      description: "On, Off"

- id: control_dhcp_query
  label: Control DHCP Query
  kind: query
  command: "*control.dhcp ?"
  params: []

- id: control_ip_set
  label: Set Control IP
  kind: action
  command: "*control.ip = {value}"
  params:
    - name: value
      type: string
      description: "IP address xxx.xxx.xxx.xxx"

- id: control_ip_query
  label: Control IP Query
  kind: query
  command: "*control.ip ?"
  params: []

- id: control_subnet_set
  label: Set Control Subnet
  kind: action
  command: "*control.subnet = {value}"
  params:
    - name: value
      type: string
      description: "Subnet address xxx.xxx.xxx.xxx"

- id: control_subnet_query
  label: Control Subnet Query
  kind: query
  command: "*control.subnet ?"
  params: []

- id: shutter_set
  label: Set Shutter
  kind: action
  command: "*shutter = {value}"
  params:
    - name: value
      type: string
      description: "on or open, off or close"

- id: shutter_query
  label: Shutter Query
  kind: query
  command: "*shutter ?"
  params: []

- id: ir_address_set
  label: Set IR Address
  kind: action
  command: "*ir.address = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 255"

- id: ir_address_query
  label: IR Address Query
  kind: query
  command: "*ir.address ?"
  params: []

- id: power_set
  label: Set Power
  kind: action
  command: "*power = {value}"
  params:
    - name: value
      type: string
      description: "On, Off"

- id: power_query
  label: Power Query
  kind: query
  command: "*power ?"
  params: []

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "*factory.reset"
  params: []

- id: identify
  label: Identify
  kind: action
  command: "*identify"
  params: []

- id: latency_set
  label: Set Latency
  kind: action
  command: "*latency = {value}"
  params:
    - name: value
      type: integer
      description: "0=LowLatency, 1=BestVideo"

- id: latency_query
  label: Latency Query
  kind: query
  command: "*latency ?"
  params: []

- id: dvi_boosteq_set
  label: Set DVI Boost EQ
  kind: action
  command: "*dvi.boosteq = {value}"
  params:
    - name: value
      type: string
      description: "On, Off"

- id: dvi_boosteq_query
  label: DVI Boost EQ Query
  kind: query
  command: "*dvi.boosteq ?"
  params: []

- id: digital_colspace_set
  label: Set Digital Color Space
  kind: action
  command: "*digital.colspace = {value}"
  params:
    - name: value
      type: integer
      description: "0=RGB, 1=YPbPr, 2=Auto"

- id: digital_colspace_query
  label: Digital Color Space Query
  kind: query
  command: "*digital.colspace ?"
  params: []

- id: digital_range_set
  label: Set Digital Range
  kind: action
  command: "*digital.range = {value}"
  params:
    - name: value
      type: integer
      description: "0=full, 1=limited, 2=auto"

- id: digital_range_query
  label: Digital Range Query
  kind: query
  command: "*digital.range ?"
  params: []

- id: dvi_port_set
  label: Set DVI Port
  kind: action
  command: "*dvi.port = {value}"
  params:
    - name: value
      type: integer
      description: "0=digital, 1=analog"

- id: dvi_port_query
  label: DVI Port Query
  kind: query
  command: "*dvi.port ?"
  params: []

- id: component_colspace_set
  label: Set Component Color Space
  kind: action
  command: "*component.colspace = {value}"
  params:
    - name: value
      type: integer
      description: "0=RGB, 1=YPbPr"

- id: component_colspace_query
  label: Component Color Space Query
  kind: query
  command: "*component.colspace ?"
  params: []

- id: component_synctype_set
  label: Set Component Sync Type
  kind: action
  command: "*component.synctype = {value}"
  params:
    - name: value
      type: integer
      description: "0=3wire, 1=4wire, 2=Auto"

- id: component_synctype_query
  label: Component Sync Type Query
  kind: query
  command: "*component.synctype ?"
  params: []

- id: 3gsdi_stream_set
  label: Set 3G SDI Stream
  kind: action
  command: "*3gsdi.stream = {value}"
  params:
    - name: value
      type: integer
      description: "0=Stream1, 1=Stream2"

- id: 3gsdi_stream_query
  label: 3G SDI Stream Query
  kind: query
  command: "*3gsdi.stream ?"
  params: []

- id: lan_dhcp_set
  label: Set LAN DHCP
  kind: action
  command: "*lan.dhcp = {value}"
  params:
    - name: value
      type: string
      description: "On, Off"

- id: lan_dhcp_query
  label: LAN DHCP Query
  kind: query
  command: "*lan.dhcp ?"
  params: []

- id: lan_ip_set
  label: Set LAN IP
  kind: action
  command: "*lan.ip = {value}"
  params:
    - name: value
      type: string
      description: "IP address xxx.xxx.xxx.xxx"

- id: lan_ip_query
  label: LAN IP Query
  kind: query
  command: "*lan.ip ?"
  params: []

- id: lan_subnet_set
  label: Set LAN Subnet
  kind: action
  command: "*lan.subnet = {value}"
  params:
    - name: value
      type: string
      description: "Subnet address xxx.xxx.xxx.xxx"

- id: lan_subnet_query
  label: LAN Subnet Query
  kind: query
  command: "*lan.subnet ?"
  params: []

- id: configuration_set
  label: Set Configuration
  kind: action
  command: "*confguration = {value}"  # source spells the wire token 'confguration' (missing 'i'); matches device firmware token verbatim
  params:
    - name: value
      type: integer
      description: "0=PIP, 1=EdgeBlend"

- id: configuration_query
  label: Configuration Query
  kind: query
  command: "*confguration ?"  # source-documented wire token 'confguration' (missing 'i'), verbatim
  params: []

- id: sw_version_query
  label: Software Version Query
  kind: query
  command: "*sw.version ?"
  params: []

- id: board_id_query
  label: Board ID Query
  kind: query
  command: "*board.id ?"
  params: []

- id: fw_version_query
  label: Firmware Version Query
  kind: query
  command: "*fw.version ?"
  params: []

- id: rom_version_query
  label: ROM Version Query
  kind: query
  command: "*from.version ?"
  params: []

- id: lens_version_query
  label: Lens Version Query
  kind: query
  command: "*lens.version ?"
  params: []

- id: seq_version_query
  label: Sequences Version Query
  kind: query
  command: "*seq.version ?"
  params: []

- id: model_name_query
  label: Model Name Query
  kind: query
  command: "*model.name ?"
  params: []

- id: serial_query
  label: Serial Query
  kind: query
  command: "*serial ?"
  params: []

- id: inlet_temp_query
  label: Inlet Temperature Query
  kind: query
  command: "*inlet.temp ?"
  params: []

- id: dmd_temp_query
  label: DMD Temperature Query
  kind: query
  command: "*dmd.temp ?"
  params: []

- id: board_id3d_query
  label: 3D Board ID Query
  kind: query
  command: "*board.id3d ?"
  params: []

- id: fw_version3d_query
  label: 3D Firmware Version Query
  kind: query
  command: "*fw.version3d ?"
  params: []
```

## Feedbacks
```yaml
- id: ack_response
  label: ACK Response
  type: string
  description: "ACK prefix on successful command"

- id: nak_response
  label: NAK Response
  type: string
  description: "NAK prefix on command failure. Possible values: Unknown Command, Invalid Parameter, Missing Parameter, Command Not Applicable, ERROR, Invalid number of parameters"

- id: power_state
  label: Power State
  type: enum
  values: [on, off]

- id: shutter_state
  label: Shutter State
  type: enum
  values: [on, open, off, close]

- id: lamp1_status
  label: Lamp 1 Status
  type: enum
  values: [Off, PreCooling, Ignition, IgnitionConfirm, EnableComm, DelayCooling, WarmupEcoMode, Warmup, CoolDownNoRestrike, CoolDownOkRestrike, Normal, Error, IgnitionRetry, ReStrikeDelay, EnableCSI, DeferredShutdown, ShutdownConfirm, ErrorShutdown, LampWarmupStage1, LampWarmupStage2]

- id: lamp2_status
  label: Lamp 2 Status
  type: enum
  values: [Off, PreCooling, Ignition, IgnitionConfirm, EnableComm, DelayCooling, WarmupEcoMode, Warmup, CoolDownNoRestrike, CoolDownOkRestrike, Normal, Error, IgnitionRetry, ReStrikeDelay, EnableCSI, DeferredShutdown, ShutdownConfirm, ErrorShutdown, LampWarmupStage1, LampWarmupStage2]

- id: lamp3_status
  label: Lamp 3 Status
  type: enum
  values: [Off, PreCooling, Ignition, IgnitionConfirm, EnableComm, DelayCooling, WarmupEcoMode, Warmup, CoolDownNoRestrike, CoolDownOkRestrike, Normal, Error, IgnitionRetry, ReStrikeDelay, EnableCSI, DeferredShutdown, ShutdownConfirm, ErrorShutdown, LampWarmupStage1, LampWarmupStage2]

- id: lamp4_status
  label: Lamp 4 Status
  type: enum
  values: [Off, PreCooling, Ignition, IgnitionConfirm, EnableComm, DelayCooling, WarmupEcoMode, Warmup, CoolDownNoRestrike, CoolDownOkRestrike, Normal, Error, IgnitionRetry, ReStrikeDelay, EnableCSI, DeferredShutdown, ShutdownConfirm, ErrorShutdown, LampWarmupStage1, LampWarmupStage2]
```

## Variables
```yaml
- id: lamp1_hours
  type: string
  description: "Lamp 1 hours in HH:MM format"

- id: lamp2_hours
  type: string
  description: "Lamp 2 hours in HH:MM format"

- id: lamp3_hours
  type: string
  description: "Lamp 3 hours in HH:MM format"

- id: lamp4_hours
  type: string
  description: "Lamp 4 hours in HH:MM format"

- id: inlet_temp
  type: integer
  description: "Inlet temperature in degrees Celsius"

- id: dmd_temp
  type: integer
  description: "DMD temperature in degrees Celsius"
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Command syntax: `*<command> <operator> <value>` ending with CR. Operators: `= <value>` (set), `?` (get/query), execute (no operator). ACK/NAK responses. Serial: 38400 8N1. TCP port 7000, default IP 192.168.0.100. Web config utility accessible at http://<LAN_IP>. No authentication required.

Not all commands apply to all Titan 700 sub-models; product-badge tables in source distinguish per-projector applicability. HIGHlite 660/730/740 require manufacturer upgrade for protocol support. Lamp power ranges vary by series. 3D commands apply only to 3D-capable models. Edge blend and PIP commands apply to specific model families.

The `test.pattern` command is only accessible if `input` is set to 8 (Test Pattern). The `formatter.pattern` off command must be sent (`*formatter.pattern = 21`) to return to normal picture. The `lens.stop` command stops all lens movement; all lens movement commands except nudge continue until stop or limit is reached. `mcgd.data`, `tcgd1.data`, and `tcgd2.data` values must be preceded by a leading 0 (e.g. 0.663,0.332). Source spells the configuration command as `confguration` (missing 'i'); the spec emits the source-documented token `confguration` verbatim to match the device firmware string. The `from.version` command returns the factory ROM version (source label: `from.version`).

<!-- UNRESOLVED: lamp1.status/lamp2.status/lamp3.status/lamp4.status return integer codes mapped in source; enumerating all 20 states as Feedbacks is inferred from the status table -->

## Provenance

```yaml
source_domains:
  - digitalprojection.co.uk
  - applicationmarket.crestron.com
  - manualslib.com
source_urls:
  - "https://digitalprojection.co.uk/dpdownloads/Protocol/Protocol%20Guide%20Rev%20A.pdf"
  - https://applicationmarket.crestron.com/content/Help/Digital_Projection/Digital_Projection_Titan_Serial_v2_0_Help.pdf
  - "https://www.manualslib.com/manual/1206365/Digital-Projection-Titan-SxPlus600.html?page=137"
retrieved_at: 2026-06-01T06:24:14.868Z
last_checked_at: 2026-06-02T10:14:02.420Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T10:14:02.420Z
matched_actions: 300
action_count: 300
confidence: medium
summary: "All 300 spec action units match verbatim source tokens including the source-typo wire token confguration; transport fully confirmed. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "some Titan 700 sub-models (330/660/800/930/Quad/SuperQuad/Quad2000) may have slightly different command coverage; product-badge tables in source distinguish per-model applicability"
- "no unsolicited event notifications documented in source"
- "no explicit macro sequences documented in source"
- "lamp1.status/lamp2.status/lamp3.status/lamp4.status return integer codes mapped in source; enumerating all 20 states as Feedbacks is inferred from the status table"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
