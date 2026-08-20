---
spec_id: admin/depili-titan-highlite-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Depili Titan HIGHLite Series Control Spec"
manufacturer: Depili
model_family: "HIGHlite 660 (2D)"
aliases: []
compatible_with:
  manufacturers:
    - Depili
  models:
    - "HIGHlite 660 (2D)"
    - "HIGHlite 730 (2D)"
    - "HIGHlite 740 (2D)"
    - "HIGHlite 660 (3D)"
    - "HIGHlite 730 (3D)"
    - "HIGHlite 740 (3D)"
    - "HIGHlite 8000"
    - Lightning
    - "Mercury 930"
    - "Titan LED"
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
  - github.com
  - scribd.com
source_urls:
  - "https://digitalprojection.co.uk/dpdownloads/Protocol/Protocol%20Guide%20Rev%20A.pdf"
  - https://github.com/depili
  - https://github.com/depili/betabrite
  - https://www.scribd.com/document/440475150/Titan-ITCH-GLIMPSE-Protocol-Specifications
retrieved_at: 2026-08-16T01:40:21.783Z
last_checked_at: 2026-08-19T09:14:57.982Z
generated_at: 2026-08-19T09:14:57.982Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is branded \"Digital Projection\" in body text/tables; manufacturer recorded as \"Depili\" per entity bootstrap token"
  - "HIGHlite 660/730/740 2D models require a manufacturer's upgrade before this protocol can be used"
  - "no firmware version compatibility ranges stated in source"
  - "no safety warnings, interlock procedures, or power-on"
  - "source document branded \"Digital Projection\" (doc 115-482A); manufacturer token per entity bootstrap"
  - "firmware/protocol version compatibility not stated in source"
  - "command availability per exact model badge not exhaustively cross-listed here; see source tables"
verification:
  verdict: verified
  checked_at: 2026-08-19T09:14:57.982Z
  matched_actions: 175
  action_count: 175
  confidence: medium
  summary: "All 175 spec actions (Commands + Feedbacks counted as query_command-bearing) match literal wire tokens in the source command guide; transport parameters (port 7000, baud 38400 8N1, HTTP base) are verbatim. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-16
---

# Depili Titan HIGHLite Series Control Spec

## Summary
Control protocol spec (source document 115-482A, "Protocol Guide") for a family of large-venue projectors: HIGHlite 660/730/740 (2D/3D), HIGHlite 8000, Lightning, Mercury 930, Titan LED, Titan 330/660, Titan 800/930, and Titan Quad/Super Quad/Quad 2000. Commands are ASCII text strings beginning with `*` and terminated by CR (code 13), carried over RS-232 (38400 8N1) or TCP/IP (default port 7000). An embedded Web Configuration Utility is also reachable over HTTP at the projector's LAN IP address.

<!-- UNRESOLVED: source document is branded "Digital Projection" in body text/tables; manufacturer recorded as "Depili" per entity bootstrap token -->
<!-- UNRESOLVED: HIGHlite 660/730/740 2D models require a manufacturer's upgrade before this protocol can be used -->
<!-- UNRESOLVED: no firmware version compatibility ranges stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 7000  # default TCP port stated in source; default projector IP 192.168.0.100
  base_url: "http://{lan-ip}"  # embedded Web Configuration Utility (mirrors OSD menus); default projector IP 192.168.0.100
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

Command framing (all protocols): ASCII string starting with `*`, ending with ASCII Carriage Return (code 13). Format: `*command operator <value>`. Spaces are required before the operator and before the value. Operators: Set `= <value>`, Get `?`, Execute (no operator). Entering a command name alone (no operator) sets its default value.

## Traits
```yaml
traits:
  - powerable  # inferred: power On/Off command present
  - queryable  # inferred: extensive ? query commands present
  - levelable  # inferred: brightness/contrast/lamp.power continuous level controls present
  - routable   # inferred: input source selection command present
```

## Actions
```yaml
# All commands verbatim from source. Set form: "*<cmd> = {value}". Get form noted
# per command where source documents "?". Execute form: "*<cmd>" (no operator).

# --- INPUTS ---
- id: select_input
  label: Select Input
  kind: action
  command: "*input = {value}"
  params:
    - name: value
      type: integer
      description: "0=CVBS 1, 1=CVBS 2, 2=S-Video, 3=Component, 4=VGA, 5=3G-SDI, 6=DVI, 7=HDMI, 8=Test Pattern; 9-13 model-dependent (see Notes). Get: '*input ?'"

# --- TEST PATTERNS ---
- id: set_test_pattern
  label: Set Test Pattern
  kind: action
  command: "*test.pattern = {value}"
  params:
    - name: value
      type: integer
      description: "0=Grey V Bars, 1=Grey H Bars, 2=Aspect Test, 3=Alignment Grid, 4=Warp Adjust, 5=SMPTE, 6=Checkerboard, 7=White Field, 8=Black Field, 9=Screen Layout. Only accessible when input=8. Get: '*test.pattern ?'"
- id: set_formatter_pattern
  label: Set Formatter Test Pattern
  kind: action
  command: "*formatter.pattern = {value}"
  params:
    - name: value
      type: integer
      description: "0=white, 1=black, 2=green, 3=red, 4=blue, 5=magenta, 6=cyan, 7=yellow, 8=checker, 9=align, 10=h-ramp, 11=v-ramp, 12=max lumens, 13=native white, 14=native black, 15=native green, 16=native red, 17=native blue, 18=native magenta, 19=native cyan, 20=native yellow, 21=off. Send 21 to return to normal picture. Get: '*formatter.pattern ?'"

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
      description: "Nudge time, 0=shortest to 3=longest (brief lens movement)"
- id: nudge_down
  label: Nudge Down
  kind: action
  command: "*nudge.down = {value}"
  params:
    - name: value
      type: integer
      description: "Nudge time, 0=shortest to 3=longest"
- id: nudge_left
  label: Nudge Left
  kind: action
  command: "*nudge.left = {value}"
  params:
    - name: value
      type: integer
      description: "Nudge time, 0=shortest to 3=longest"
- id: nudge_right
  label: Nudge Right
  kind: action
  command: "*nudge.right = {value}"
  params:
    - name: value
      type: integer
      description: "Nudge time, 0=shortest to 3=longest"
- id: lens_up
  label: Lens Up
  kind: action
  command: "*lens.up = {value}"
  params:
    - name: value
      type: integer
      description: "0-3, moves until lens.stop or limit reached"
- id: lens_down
  label: Lens Down
  kind: action
  command: "*lens.down = {value}"
  params:
    - name: value
      type: integer
      description: "0-3, moves until lens.stop or limit reached"
- id: lens_left
  label: Lens Left
  kind: action
  command: "*lens.left = {value}"
  params:
    - name: value
      type: integer
      description: "0-3, moves until lens.stop or limit reached"
- id: lens_right
  label: Lens Right
  kind: action
  command: "*lens.right = {value}"
  params:
    - name: value
      type: integer
      description: "0-3, moves until lens.stop or limit reached"
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
  command: "*lensmemory.save = {value}"
  params:
    - name: value
      type: integer
      description: "0-9"
- id: lensmemory_recall
  label: Recall Lens Memory
  kind: action
  command: "*lensmemory.recall = {value}"
  params:
    - name: value
      type: integer
      description: "0-9"

# --- IMAGE ---
- id: set_brightness
  label: Set Brightness
  kind: action
  command: "*brightness = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to 50. Get: '*brightness ?'"
- id: set_contrast
  label: Set Contrast
  kind: action
  command: "*contrast = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to 50. Get: '*contrast ?'"
- id: set_gamma
  label: Set Gamma
  kind: action
  command: "*gamma = {value}"
  params:
    - name: value
      type: integer
      description: "0=1.0, 1=1.8, 2=2.0, 3=2.2, 4=2.4, 5=2.6, 6=2.8. Get: '*gamma ?'"
- id: set_freeze
  label: Set Freeze
  kind: action
  command: "*freeze = {value}"
  params:
    - name: value
      type: enum
      description: "On, Off. Frozen image persists even if source disconnected. Get: '*freeze ?'"
- id: set_hue
  label: Set Hue
  kind: action
  command: "*hue = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to 50. Get: '*hue ?'"
- id: set_saturation
  label: Set Saturation
  kind: action
  command: "*saturation = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to 50. Get: '*saturation ?'"
- id: set_blacklevel_offset
  label: Set Black Level Offset
  kind: action
  command: "*blacklevel.offset = {value}"
  params:
    - name: value
      type: integer
      description: "0=0 IRE, 1=7.5 IRE. Get: '*blacklevel.offset ?'"
- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "*sharpness = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to 50. Get: '*sharpness ?'"
- id: set_detail
  label: Set Detail
  kind: action
  command: "*detail = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100. Get: '*detail ?'"
- id: set_luma_sharpness
  label: Set Luma Sharpness
  kind: action
  command: "*luma.sharpness = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Low, 2=High. Get: '*luma.sharpness ?'"
- id: set_chroma_sharpness
  label: Set Chroma Sharpness
  kind: action
  command: "*chroma.sharpness = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Low, 2=High. Get: '*chroma.sharpness ?'"
- id: set_recursive_nr
  label: Set Recursive Noise Reduction
  kind: action
  command: "*recursive.nr = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Low, 2=Medium, 3=High. Get: '*recursive.nr ?'"
- id: set_mosquito_nr
  label: Set Mosquito Noise Reduction
  kind: action
  command: "*mosquito.nr = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Low, 2=Medium, 3=High. Get: '*mosquito.nr ?'"
- id: set_ccs
  label: Set Cross Color Suppression
  kind: action
  command: "*ccs = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On. Identical to Image > Video Filters > Cross Color Suppression. Get: '*ccs ?'"
- id: set_vga_phase
  label: Set VGA Phase
  kind: action
  command: "*vga.phase = {value}"
  params:
    - name: value
      type: integer
      description: "-15 to 15. Get: '*vga.phase ?'"
- id: set_vga_samples
  label: Set VGA Total H Samples
  kind: action
  command: "*vga.samples = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 1444. Get: '*vga.samples ?'"
- id: vga_auto
  label: VGA Auto Setup
  kind: action
  command: "*vga.auto"
  params: []

# --- COLOR ---
- id: set_gamut
  label: Set Gamut
  kind: action
  command: "*gamut = {value}"
  params:
    - name: value
      type: integer
      description: "0=Peak, 1=HDTV, 2=SDTV, 3=3200K, 4=5400K, 5=6500K, 6=8000K, 7=9000K, 8=User 1, 9=User 2. Get: '*gamut ?'"
- id: set_mcgd_data
  label: Set MCGD Data
  kind: action
  command: "*mcgd.data = {value}"
  params:
    - name: value
      type: string
      description: "Comma-separated x,y coordinates in order green-x,green-y,red-x,red-y,blue-x,blue-y,white-x,white-y; must be preceded by leading 0, e.g. 0.663,0.332. Get: '*mcgd.data ?'"
- id: set_tcgd1_data
  label: Set User TCGD 1 Data
  kind: action
  command: "*tcgd1.data = {value}"
  params:
    - name: value
      type: string
      description: "Same coordinate format as mcgd.data. Get: '*tcgd1.data ?'"
- id: set_tcgd2_data
  label: Set User TCGD 2 Data
  kind: action
  command: "*tcgd2.data = {value}"
  params:
    - name: value
      type: string
      description: "Same coordinate format as mcgd.data. Get: '*tcgd2.data ?'"
- id: set_red_lift
  label: Set Red Lift
  kind: action
  command: "*red.lift = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to +50. Get: '*red.lift ?'"
- id: set_green_lift
  label: Set Green Lift
  kind: action
  command: "*green.lift = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to +50. Get: '*green.lift ?'"
- id: set_blue_lift
  label: Set Blue Lift
  kind: action
  command: "*blue.lift = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to +50. Get: '*blue.lift ?'"
- id: set_red_gain
  label: Set Red Gain
  kind: action
  command: "*red.gain = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to +50. Get: '*red.gain ?'"
- id: set_green_gain
  label: Set Green Gain
  kind: action
  command: "*green.gain = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to +50. Get: '*green.gain ?'"
- id: set_blue_gain
  label: Set Blue Gain
  kind: action
  command: "*blue.gain = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to +50. Get: '*blue.gain ?'"
- id: set_red_dmd
  label: Set Red DMD Enable
  kind: action
  command: "*red.dmd = {value}"
  params:
    - name: value
      type: enum
      description: "On, Off. Enables/disables the red DMD. Get: '*red.dmd ?'"
- id: set_green_dmd
  label: Set Green DMD Enable
  kind: action
  command: "*green.dmd = {value}"
  params:
    - name: value
      type: enum
      description: "On, Off. Get: '*green.dmd ?'"
- id: set_blue_dmd
  label: Set Blue DMD Enable
  kind: action
  command: "*blue.dmd = {value}"
  params:
    - name: value
      type: enum
      description: "On, Off. Get: '*blue.dmd ?'"

# --- GEOMETRY ---
- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  command: "*aspect.ratio = {value}"
  params:
    - name: value
      type: integer
      description: "0=Source, 1=Fill & Display, 2=Fill & Crop, 3=Anamorphic, 4=TheaterScope. Get: '*aspect.ratio ?'"
- id: set_overscan
  label: Set Overscan
  kind: action
  command: "*overscan = {value}"
  params:
    - name: value
      type: integer
      description: "0=0%, 1=2.5%, 2=5%, 3=7.5%. Get: '*overscan ?'"
- id: set_sizepos_enable
  label: Set Size & Position Enable
  kind: action
  command: "*sizepos.enable = {value}"
  params:
    - name: value
      type: enum
      description: "On, Off. Get: '*sizepos.enable ?'"
- id: set_sizepos_setting
  label: Set Size & Position Setting Mode
  kind: action
  command: "*sizepos.setting = {value}"
  params:
    - name: value
      type: enum
      description: "Global, Modal. Get: '*sizepos.setting ?'"
- id: set_h_position
  label: Set Horizontal Position
  kind: action
  command: "*h.position = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to +50. Get: '*h.position ?'"
- id: set_v_position
  label: Set Vertical Position
  kind: action
  command: "*v.position = {value}"
  params:
    - name: value
      type: integer
      description: "-50 to +50. Get: '*v.position ?'"
- id: set_h_size
  label: Set Horizontal Size
  kind: action
  command: "*h.size = {value}"
  params:
    - name: value
      type: integer
      description: "50 to 400. Get: '*h.size ?'"
- id: set_v_size
  label: Set Vertical Size
  kind: action
  command: "*v.size = {value}"
  params:
    - name: value
      type: integer
      description: "50 to 400. Get: '*v.size ?'"
- id: set_sizepos_aspect
  label: Set Aspect Lock
  kind: action
  command: "*sizepos.aspect = {value}"
  params:
    - name: value
      type: enum
      description: "On, Off. Identical to Geometry > Size & Position > Aspect Lock. Get: '*sizepos.aspect ?'"
- id: set_blanking_enable
  label: Set Blanking Enable
  kind: action
  command: "*blanking.enable = {value}"
  params:
    - name: value
      type: enum
      description: "On, Off. Get: '*blanking.enable ?'"
- id: set_blanking_top
  label: Set Top Blanking
  kind: action
  command: "*blanking.top = {value}"
  params:
    - name: value
      type: integer
      description: "1 to 100. Get: '*blanking.top ?'"
- id: set_blanking_bottom
  label: Set Bottom Blanking
  kind: action
  command: "*blanking.bottom = {value}"
  params:
    - name: value
      type: integer
      description: "1 to 100. Get: '*blanking.bottom ?'"
- id: set_blanking_left
  label: Set Left Blanking
  kind: action
  command: "*blanking.left = {value}"
  params:
    - name: value
      type: integer
      description: "1 to 255. Get: '*blanking.left ?'"
- id: set_blanking_right
  label: Set Right Blanking
  kind: action
  command: "*blanking.right = {value}"
  params:
    - name: value
      type: integer
      description: "1 to 255. Get: '*blanking.right ?'"
- id: set_geometry_engine
  label: Set Geometry Engine
  kind: action
  command: "*geometry.engine = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Keystone, 2=4 Corner, 3=Rotation, 4=Warp. Get: '*geometry.engine ?'"
- id: set_h_keystone
  label: Set Horizontal Keystone
  kind: action
  command: "*h.keystone = {value}"
  params:
    - name: value
      type: integer
      description: "-40 to +40. Get: '*h.keystone ?'"
- id: set_v_keystone
  label: Set Vertical Keystone
  kind: action
  command: "*v.keystone = {value}"
  params:
    - name: value
      type: integer
      description: "-30 to +30. Get: '*v.keystone ?'"
- id: set_pin_barrel
  label: Set Pincushion / Barrel
  kind: action
  command: "*pin.barrel = {value}"
  params:
    - name: value
      type: integer
      description: "-20 to +20. Active when geometry.engine=1 or 3. Get: '*pin.barrel ?'"
- id: set_4corner_ulx
  label: Set 4-Corner Upper Left X
  kind: action
  command: "*4corner.ulx = {value}"
  params:
    - name: value
      type: integer
      description: "-1000 to +1000. Get: '*4corner.ulx ?'"
- id: set_4corner_uly
  label: Set 4-Corner Upper Left Y
  kind: action
  command: "*4corner.uly = {value}"
  params:
    - name: value
      type: integer
      description: "-1000 to +1000. Get: '*4corner.uly ?'"
- id: set_4corner_urx
  label: Set 4-Corner Upper Right X
  kind: action
  command: "*4corner.urx = {value}"
  params:
    - name: value
      type: integer
      description: "-1000 to +1000. Get: '*4corner.urx ?'"
- id: set_4corner_ury
  label: Set 4-Corner Upper Right Y
  kind: action
  command: "*4corner.ury = {value}"
  params:
    - name: value
      type: integer
      description: "-1000 to +1000. Get: '*4corner.ury ?'"
- id: set_4corner_llx
  label: Set 4-Corner Lower Left X
  kind: action
  command: "*4corner.llx = {value}"
  params:
    - name: value
      type: integer
      description: "-1000 to +1000. Get: '*4corner.llx ?'"
- id: set_4corner_lly
  label: Set 4-Corner Lower Left Y
  kind: action
  command: "*4corner.lly = {value}"
  params:
    - name: value
      type: integer
      description: "-1000 to +1000. Get: '*4corner.lly ?'"
- id: set_4corner_lrx
  label: Set 4-Corner Lower Right X
  kind: action
  command: "*4corner.lrx = {value}"
  params:
    - name: value
      type: integer
      description: "-1000 to +1000. Get: '*4corner.lrx ?'"
- id: set_4corner_lry
  label: Set 4-Corner Lower Right Y
  kind: action
  command: "*4corner.lry = {value}"
  params:
    - name: value
      type: integer
      description: "-1000 to +1000. Get: '*4corner.lry ?'"
- id: set_rotation
  label: Set Rotation
  kind: action
  command: "*rotation = {value}"
  params:
    - name: value
      type: integer
      description: "-180 to 180. Get: '*rotation ?'"
- id: set_warp_map
  label: Set Warp Map
  kind: action
  command: "*warp.map = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 8; 0 = off. Get: '*warp.map ?'"

# --- EDGE BLEND ---
- id: set_array_width
  label: Set Array Width
  kind: action
  command: "*array.width = {value}"
  params:
    - name: value
      type: integer
      description: "1 to 4. Get: '*array.width ?'"
- id: set_array_height
  label: Set Array Height
  kind: action
  command: "*array.height = {value}"
  params:
    - name: value
      type: integer
      description: "1 to 4. Get: '*array.height ?'"
- id: set_array_hset
  label: Set Array Horizontal Position
  kind: action
  command: "*array.hset = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 3. Projector position within segmented array. Get: '*array.hset ?'"
- id: set_array_vset
  label: Set Array Vertical Position
  kind: action
  command: "*array.vset = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 3. Get: '*array.vset ?'"
- id: set_scurve_value
  label: Set Blend S-Curve Value
  kind: action
  command: "*scurve.value = {value}"
  params:
    - name: value
      type: integer
      description: "10 to 25 (real values 1.0 to 2.5). Get: '*scurve.value ?'"
- id: set_blending
  label: Set Blending
  kind: action
  command: "*blending = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On, 2=Alignment Pattern. Get: '*blending ?'"
- id: set_segmentation
  label: Set Segmentation
  kind: action
  command: "*segmentation = {value}"
  params:
    - name: value
      type: enum
      description: "On, Off. Get: '*segmentation ?'"
- id: set_eb_top
  label: Set Top Blend Region
  kind: action
  command: "*eb.top = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 720 pixels; max equals 720 minus pixels applied to eb.bottom. Get: '*eb.top ?'"
- id: set_eb_bottom
  label: Set Bottom Blend Region
  kind: action
  command: "*eb.bottom = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 720 pixels; max equals 720 minus pixels applied to eb.top. Get: '*eb.bottom ?'"
- id: set_eb_left
  label: Set Left Blend Region
  kind: action
  command: "*eb.left = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 1280 pixels; max equals 1280 minus pixels applied to eb.right. Get: '*eb.left ?'"
- id: set_eb_right
  label: Set Right Blend Region
  kind: action
  command: "*eb.right = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 1280 pixels; max equals 1280 minus pixels applied to eb.left. Get: '*eb.right ?'"
- id: set_eb_blu_unblended
  label: Set BLU Unblended Region
  kind: action
  command: "*eb.blu.unblended = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 63. Black Level Uplift. Get: '*eb.blu.unblended ?'"
- id: set_eb_blu_topl
  label: Set BLU Upper Left
  kind: action
  command: "*eb.blu.topl = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 63. Get: '*eb.blu.topl ?'"
- id: set_eb_blu_top
  label: Set BLU Upper Middle
  kind: action
  command: "*eb.blu.top = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 63. Get: '*eb.blu.top ?'"
- id: set_eb_blu_topr
  label: Set BLU Upper Right
  kind: action
  command: "*eb.blu.topr = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 63. Get: '*eb.blu.topr ?'"
- id: set_eb_blu_bottoml
  label: Set BLU Lower Left
  kind: action
  command: "*eb.blu.bottoml = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 63. Get: '*eb.blu.bottoml ?'"
- id: set_eb_blu_bottom
  label: Set BLU Lower Middle
  kind: action
  command: "*eb.blu.bottom = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 63. Get: '*eb.blu.bottom ?'"
- id: set_eb_blu_bottomr
  label: Set BLU Lower Right
  kind: action
  command: "*eb.blu.bottomr = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 63. Get: '*eb.blu.bottomr ?'"
- id: set_eb_blu_midl
  label: Set BLU Middle Left
  kind: action
  command: "*eb.blu.midl = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 63. Get: '*eb.blu.midl ?'"
- id: set_eb_blu_midr
  label: Set BLU Middle Right
  kind: action
  command: "*eb.blu.midr = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 63. Get: '*eb.blu.midr ?'"
- id: set_eb_blu_x1
  label: Set Reduce BLU Width X1 (Top Left)
  kind: action
  command: "*eb.blu.x1 = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100. Get: '*eb.blu.x1 ?'"
- id: set_eb_blu_y1
  label: Set Reduce BLU Width Y1 (Top Left)
  kind: action
  command: "*eb.blu.y1 = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100. Get: '*eb.blu.y1 ?'"
- id: set_eb_blu_x2
  label: Set Reduce BLU Width X2 (Top Right)
  kind: action
  command: "*eb.blu.x2 = {value}"
  params:
    - name: value
      type: integer
      description: "-100 to 0. Get: '*eb.blu.x2 ?'"
- id: set_eb_blu_y2
  label: Set Reduce BLU Width Y2 (Top Right)
  kind: action
  command: "*eb.blu.y2 = {value}"
  params:
    - name: value
      type: integer
      description: "-100 to 0. Get: '*eb.blu.y2 ?'"
- id: set_eb_blu_x3
  label: Set Reduce BLU Width X3 (Bottom Left)
  kind: action
  command: "*eb.blu.x3 = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100. Get: '*eb.blu.x3 ?'"
- id: set_eb_blu_y3
  label: Set Reduce BLU Width Y3 (Bottom Left)
  kind: action
  command: "*eb.blu.y3 = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100. Get: '*eb.blu.y3 ?'"
- id: set_eb_blu_x4
  label: Set Reduce BLU Width X4 (Bottom Right)
  kind: action
  command: "*eb.blu.x4 = {value}"
  params:
    - name: value
      type: integer
      description: "-100 to 0. Get: '*eb.blu.x4 ?'"
- id: set_eb_blu_y4
  label: Set Reduce BLU Width Y4 (Bottom Right)
  kind: action
  command: "*eb.blu.y4 = {value}"
  params:
    - name: value
      type: integer
      description: "-100 to 0. Get: '*eb.blu.y4 ?'"
- id: eb_reset
  label: Edge Blend Reset
  kind: action
  command: "*eb.reset = {value}"
  params:
    - name: value
      type: integer
      description: "1=reset width, 2=reset offset, 3=reset width and offset, 4=reset black level uplift, 5=reset width and BLU, 6=reset offset and BLU offset, 7=reset all"

# --- PIP ---
- id: set_pip_mode
  label: Set PIP Mode
  kind: action
  command: "*pip.mode = {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=PIP, 2=PAP, 3=POP. Get: '*pip.mode ?'"
- id: set_pip_input
  label: Set PIP Input
  kind: action
  command: "*pip.input = {value}"
  params:
    - name: value
      type: integer
      description: "0=CVBS 1, 1=CVBS 2, 2=S-Video, 3=Component, 4=VGA, 5=3G-SDI, 6=DVI, 7=HDMI. Get: '*pip.input ?'"
- id: set_pip_size
  label: Set PIP Size
  kind: action
  command: "*pip.size = {value}"
  params:
    - name: value
      type: integer
      description: "0=small, 1=medium, 2=large. Get: '*pip.size ?'"
- id: set_pip_position
  label: Set PIP Position
  kind: action
  command: "*pip.position = {value}"
  params:
    - name: value
      type: integer
      description: "0=Top Left, 1=Top Right, 2=Bottom Left, 3=Bottom Right, 4=Custom. Get: '*pip.position ?'"
- id: set_pip_hpos
  label: Set PIP Horizontal Position
  kind: action
  command: "*pip.hpos = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100. Get: '*pip.hpos ?'"
- id: set_pip_vpos
  label: Set PIP Vertical Position
  kind: action
  command: "*pip.vpos = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 100. Get: '*pip.vpos ?'"

# --- 3D (3D models only) ---
- id: set_3d_enable
  label: Set 3D Enable
  kind: action
  command: "*3d.enable = {value}"
  params:
    - name: value
      type: enum
      description: "On, Off. Get: '*3d.enable ?'"
- id: set_3d_frmultiplier
  label: Set 3D Frame Multiplier
  kind: action
  command: "*3d.frmultiplier = {value}"
  params:
    - name: value
      type: integer
      description: "1=x1, 2=x2, 3=x3. Get: '*3d.frmultiplier ?'"
- id: set_3d_darktime
  label: Set 3D Dark Time
  kind: action
  command: "*3d.darktime = {value}"
  params:
    - name: value
      type: integer
      description: "0=0 us, 1=650 us, 2=1300 us, 3=7500 us. Get: '*3d.darktime ?'"
- id: set_3d_syncoffset
  label: Set 3D Sync Offset
  kind: action
  command: "*3d.syncoffset = {value}"
  params:
    - name: value
      type: integer
      description: "-15 to +15, representing -1500 us to +1500 us. Get: '*3d.syncoffset ?'"
- id: set_3d_syncpolarity
  label: Set 3D Sync Polarity
  kind: action
  command: "*3d.syncpolarity = {value}"
  params:
    - name: value
      type: enum
      description: "pos, neg. Get: '*3d.syncpolarity ?'"
- id: set_3d_dominance
  label: Set 3D Dominance
  kind: action
  command: "*3d.dominance = {value}"
  params:
    - name: value
      type: enum
      description: "left, right. Get: '*3d.dominance ?'"
- id: set_3d_format
  label: Set 3D Format
  kind: action
  command: "*3d.format = {value}"
  params:
    - name: value
      type: enum
      description: "auto, seq, fpack, tab, sbs. Get: '*3d.format ?'"

# --- LAMPS ---
- id: query_lamp1_hours
  label: Query Lamp 1 Hours
  kind: query
  command: "*lamp1.hours ?"
  params: []
- id: query_lamp1_strikes
  label: Query Lamp 1 Strikes
  kind: query
  command: "*lamp1.strikes ?"
  params: []
- id: query_lamp1_serial
  label: Query Lamp 1 Serial
  kind: query
  command: "*lamp1.serial ?"
  params: []
- id: query_lamp1_status
  label: Query Lamp 1 Status
  kind: query
  command: "*lamp1.status ?"
  params: []
- id: set_lamp_power
  label: Set Lamp Power
  kind: action
  command: "*lamp.power = {value}"
  params:
    - name: value
      type: integer
      description: "1 to 100; model-dependent minimum (HIGHlite 660/730/740/8000: 85; Lightning: 60; Mercury 930/Titan 800/930/Quad/Super Quad/Quad 2000: 80 - lower values clamped to minimum). Get: '*lamp.power ?'"
- id: set_lamp_mode
  label: Set Lamp Mode
  kind: action
  command: "*lamp.mode = {value}"
  params:
    - name: value
      type: integer
      description: "Dual-lamp: 0=both, 1=lamp 1, 2=lamp 2, 3=auto 1. Quad-lamp: 0=all, 1=auto 3, 2=auto 2, 3=auto 1, 4=lamps 1,2,3, 5=1,2,4, 6=1,3,4, 7=2,3,4, 8=1+2, 9=1+3, 10=1+4, 11=2+3, 12=2+4, 13=3+4, 14=lamp 1, 15=lamp 2, 16=lamp 3, 17=lamp 4. Get: '*lamp.mode ?'"
- id: query_lamp2_hours
  label: Query Lamp 2 Hours
  kind: query
  command: "*lamp2.hours ?"
  params: []
- id: query_lamp2_strikes
  label: Query Lamp 2 Strikes
  kind: query
  command: "*lamp2.strikes ?"
  params: []
- id: query_lamp2_serial
  label: Query Lamp 2 Serial
  kind: query
  command: "*lamp2.serial ?"
  params: []
- id: query_lamp2_status
  label: Query Lamp 2 Status
  kind: query
  command: "*lamp2.status ?"
  params: []
- id: set_compensation_mode
  label: Set Lamp Compensation Mode
  kind: action
  command: "*compensation.mode = {value}"
  params:
    - name: value
      type: enum
      description: "auto, manual. Get: '*compensation.mode ?'"
- id: set_compensation
  label: Set Lamp Compensation
  kind: action
  command: "*compensation = {value}"
  params:
    - name: value
      type: integer
      description: "1 to 200. Get: '*compensation ?'"
- id: set_conditioning
  label: Set Lamp Conditioning
  kind: action
  command: "*conditioning = {value}"
  params:
    - name: value
      type: enum
      description: "On, Off. Get: '*conditioning ?'"
- id: query_lamp3_hours
  label: Query Lamp 3 Hours
  kind: query
  command: "*lamp3.hours ?"
  params: []
- id: query_lamp4_hours
  label: Query Lamp 4 Hours
  kind: query
  command: "*lamp4.hours ?"
  params: []
- id: query_lamp3_strikes
  label: Query Lamp 3 Strikes
  kind: query
  command: "*lamp3.strikes ?"
  params: []
- id: query_lamp4_strikes
  label: Query Lamp 4 Strikes
  kind: query
  command: "*lamp4.strikes ?"
  params: []
- id: query_lamp3_serial
  label: Query Lamp 3 Serial
  kind: query
  command: "*lamp3.serial ?"
  params: []
- id: query_lamp4_serial
  label: Query Lamp 4 Serial
  kind: query
  command: "*lamp4.serial ?"
  params: []
- id: query_lamp3_status
  label: Query Lamp 3 Status
  kind: query
  command: "*lamp3.status ?"
  params: []
- id: query_lamp4_status
  label: Query Lamp 4 Status
  kind: query
  command: "*lamp4.status ?"
  params: []

# --- SETUP ---
- id: set_orientation
  label: Set Orientation
  kind: action
  command: "*orientation = {value}"
  params:
    - name: value
      type: integer
      description: "0=Desktop Front, 1=Ceiling Front, 2=Desktop Rear, 3=Ceiling Rear. Get: '*orientation ?'"
- id: set_control_dhcp
  label: Set Control DHCP
  kind: action
  command: "*control.dhcp = {value}"
  params:
    - name: value
      type: enum
      description: "On, Off. Get: '*control.dhcp ?'"
- id: set_control_ip
  label: Set Control IP Address
  kind: action
  command: "*control.ip = {value}"
  params:
    - name: value
      type: string
      description: "Valid IP address, format xxx.xxx.xxx.xxx. Get: '*control.ip ?'"
- id: set_control_subnet
  label: Set Control Subnet Mask
  kind: action
  command: "*control.subnet = {value}"
  params:
    - name: value
      type: string
      description: "Valid subnet address, format xxx.xxx.xxx.xxx. Get: '*control.subnet ?'"
- id: set_shutter
  label: Set Shutter
  kind: action
  command: "*shutter = {value}"
  params:
    - name: value
      type: enum
      description: "on or open (close shutter/black), off or close (open shutter/picture). Get: '*shutter ?'"
- id: set_ir_address
  label: Set IR Address
  kind: action
  command: "*ir.address = {value}"
  params:
    - name: value
      type: integer
      description: "0 to 255. Get: '*ir.address ?'"
- id: set_power
  label: Set Power
  kind: action
  command: "*power = {value}"
  params:
    - name: value
      type: enum
      description: "On, Off. Get: '*power ?'"
- id: factory_reset
  label: Factory Reset
  kind: action
  command: "*factory.reset"
  params: []
- id: identify
  label: Identify Projector
  kind: action
  command: "*identify"
  params: []
- id: set_latency
  label: Set Latency Mode
  kind: action
  command: "*latency = {value}"
  params:
    - name: value
      type: integer
      description: "0=Low Latency, 1=Best Video. Get: '*latency ?'"
- id: set_dvi_boosteq
  label: Set DVI Boost EQ
  kind: action
  command: "*dvi.boosteq = {value}"
  params:
    - name: value
      type: enum
      description: "On, Off. Get: '*dvi.boosteq ?'"
- id: set_digital_colspace
  label: Set Digital Color Space
  kind: action
  command: "*digital.colspace = {value}"
  params:
    - name: value
      type: integer
      description: "0=RGB, 1=YPbPr, 2=Auto. Get: '*digital.colspace ?'"
- id: set_digital_range
  label: Set Digital Range
  kind: action
  command: "*digital.range = {value}"
  params:
    - name: value
      type: integer
      description: "0=full, 1=limited, 2=auto. Get: '*digital.range ?'"
- id: set_dvi_port
  label: Set DVI Port Mode
  kind: action
  command: "*dvi.port = {value}"
  params:
    - name: value
      type: integer
      description: "0=digital, 1=analog. Get: '*dvi.port ?'"
- id: set_component_colspace
  label: Set Component Color Space
  kind: action
  command: "*component.colspace = {value}"
  params:
    - name: value
      type: integer
      description: "0=RGB, 1=YPbPr. Get: '*component.colspace ?'"
- id: set_component_synctype
  label: Set Component Sync Type
  kind: action
  command: "*component.synctype = {value}"
  params:
    - name: value
      type: integer
      description: "0=3 wire, 1=4 wire, 2=Auto. Get: '*component.synctype ?'"
- id: set_3gsdi_stream
  label: Set 3G-SDI Stream
  kind: action
  command: "*3gsdi.stream = {value}"
  params:
    - name: value
      type: integer
      description: "0=Stream 1, 1=Stream 2. Get: '*3gsdi.stream ?'"
- id: set_lan_dhcp
  label: Set LAN DHCP
  kind: action
  command: "*lan.dhcp = {value}"
  params:
    - name: value
      type: enum
      description: "On, Off. Get: '*lan.dhcp ?'"
- id: set_lan_ip
  label: Set LAN IP Address
  kind: action
  command: "*lan.ip = {value}"
  params:
    - name: value
      type: string
      description: "Valid IP address, format xxx.xxx.xxx.xxx. Get: '*lan.ip ?'"
- id: set_lan_subnet
  label: Set LAN Subnet Mask
  kind: action
  command: "*lan.subnet = {value}"
  params:
    - name: value
      type: string
      description: "Valid subnet address, format xxx.xxx.xxx.xxx. Get: '*lan.subnet ?'"
- id: set_configuration
  label: Set Configuration Mode
  kind: action
  command: "*confguration = {value}"
  params:
    - name: value
      type: integer
      description: "0=PIP, 1=Edge Blend. Get: '*confguration ?'. NOTE: command spelling 'confguration' is verbatim from source (appears to be vendor typo of 'configuration')"

# --- INFORMATION ---
- id: query_sw_version
  label: Query Software Version
  kind: query
  command: "*sw.version ?"
  params: []
- id: query_board_id
  label: Query Board ID
  kind: query
  command: "*board.id ?"
  params: []
- id: query_fw_version
  label: Query Firmware Version
  kind: query
  command: "*fw.version ?"
  params: []
- id: query_from_version
  label: Query Factory ROM Version
  kind: query
  command: "*from.version ?"
  params: []
- id: query_lens_version
  label: Query Lens Mount Version
  kind: query
  command: "*lens.version ?"
  params: []
- id: query_seq_version
  label: Query Formatter Sequences Version
  kind: query
  command: "*seq.version ?"
  params: []
- id: query_model_name
  label: Query Model Name
  kind: query
  command: "*model.name ?"
  params: []
- id: query_serial
  label: Query Projector Serial Number
  kind: query
  command: "*serial ?"
  params: []
- id: query_inlet_temp
  label: Query Air Inlet Temperature
  kind: query
  command: "*inlet.temp ?"
  params: []
- id: query_dmd_temp
  label: Query DMD Temperature
  kind: query
  command: "*dmd.temp ?"
  params: []
- id: query_board_id3d
  label: Query 3D Board ID
  kind: query
  command: "*board.id3d ?"
  params: []
- id: query_fw_version3d
  label: Query 3D Firmware Version
  kind: query
  command: "*fw.version3d ?"
  params: []
```

## Feedbacks
```yaml
- id: ack
  type: string
  description: 'Acknowledgement. Response begins with "ACK" followed by echo of the command, e.g. "*aspect.ratio = 1" returns "ACK aspect.ratio = 1".'
- id: nak
  type: enum
  values:
    - "NAK Unknown Command"
    - "NAK Invalid Parameter"
    - "NAK Missing Parameter"
    - "NAK Command Not Applicable"
    - "NAK ERROR"
    - "NAK Invalid number of parameters"
  description: "Negative acknowledgement with brief problem description."
- id: power_state
  type: enum
  values: ["On", "Off"]
  description: "Returned by '*power ?'"
- id: input_source
  type: integer
  description: "Returned by '*input ?'; value map model-dependent (see select_input)"
- id: lamp1_hours
  type: string
  description: "Lamp hours in HH:MM format, returned by '*lamp1.hours ?' (lamp2/lamp3/lamp4.hours identical)"
- id: lamp1_status
  type: enum
  values:
    - "0 = Off"
    - "1 = Pre cooling"
    - "2 = Ignition"
    - "3 = Ignition confirm"
    - "4 = Enable communication"
    - "5 = Delay cooling"
    - "6 = Warm up eco mode"
    - "7 = Warm up"
    - "8 = Cool down no restrike"
    - "9 = Cool down ok restrike"
    - "10 = Normal"
    - "11 = Error"
    - "12 = Ignition retry"
    - "13 = Restrike delay"
    - "14 = Enable CSI"
    - "15 = Deferred shutdown"
    - "16 = Shutdown confirm"
    - "17 = Error shutdown"
    - "18 = Lamp warmup stage 1"
    - "19 = Lamp warmup stage 2"
  description: "Returned by '*lampN.status ?' (same states for lamps 1-4)"
- id: inlet_temp
  type: number
  description: "Temperature in degrees C at air inlets, returned by '*inlet.temp ?'"
- id: dmd_temp
  type: number
  description: "Temperature in degrees C at DMD, returned by '*dmd.temp ?'"
- id: model_name
  type: string
  description: "Returned by '*model.name ?'"
- id: sw_version
  type: string
  description: "Software release version, returned by '*sw.version ?' (identical to Information > Configuration > Interface)"
```

## Variables
```yaml
# All settable parameters in this protocol are documented by the source as
# commands (with '=' set operator) and are therefore represented as
# parameterized actions in the Actions section. No standalone variables.
```

## Events
```yaml
# No unsolicited notifications documented in source. Device responds only
# with ACK/NAK (and query values) to sent commands.
```

## Macros
```yaml
# No multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on
# sequencing requirements stated in source.
```

## Notes
- Command framing: ASCII string starting with `*`, terminated by ASCII CR (code 13). Format `*command operator <value>`; spaces required before the operator and the value. `*aspect.ratio=4` (no spaces) is invalid per source.
- Sending a command name with no operator sets its default value (e.g. `*aspect.ratio` sets aspect ratio to 0 / Source).
- Model applicability varies per command; the source assigns each command to model badges (2D/3D/LED/330/660/800/930/Quad/SuperQuad/Quad2000/8000). HIGHlite 660/730/740 2D models need a manufacturer's upgrade for this protocol.
- `input` value map is model-dependent: 0-8 universal; 9=Main/DVI, 10=Sub/HDMI, 11=Dual Pipe on Mercury/LED/Titan 3D models; HIGHlite 3D models use 9=HDBaseT, 10=DVI 2, 11=HDMI 2, 12=HDMI 3, 13=Dual Pipe.
- `test.pattern` only accessible when `*input = 8`.
- `freeze = on` persists the frozen frame even if the source is disconnected.
- Formatter test patterns display immediately regardless of input; send `*formatter.pattern = 21` to return to normal picture; OSD unavailable while displayed.
- All lens commands except `nudge` continue moving until `*lens.stop` or the limit is reached.
- `lamp.power` minimum is model-dependent (85 for HIGHlite 660/730/740/8000, 60 for Lightning, 80 for Mercury 930/Titan 800/930/Quad/SuperQuad/Quad 2000); lower values are clamped up by the projector.
- `confguration` command spelling is verbatim from the source (apparent vendor typo for "configuration").
- Default network settings: IP 192.168.0.100, TCP port 7000.
- Web Configuration Utility at http://<LAN IP Address> mirrors all OSD functions; DiscoveryTool_V1.0.exe finds projectors on the same subnet (identical IP up to third octet).
<!-- UNRESOLVED: source document branded "Digital Projection" (doc 115-482A); manufacturer token per entity bootstrap -->
<!-- UNRESOLVED: firmware/protocol version compatibility not stated in source -->
<!-- UNRESOLVED: command availability per exact model badge not exhaustively cross-listed here; see source tables -->

## Provenance

```yaml
source_domains:
  - digitalprojection.co.uk
  - github.com
  - scribd.com
source_urls:
  - "https://digitalprojection.co.uk/dpdownloads/Protocol/Protocol%20Guide%20Rev%20A.pdf"
  - https://github.com/depili
  - https://github.com/depili/betabrite
  - https://www.scribd.com/document/440475150/Titan-ITCH-GLIMPSE-Protocol-Specifications
retrieved_at: 2026-08-16T01:40:21.783Z
last_checked_at: 2026-08-19T09:14:57.982Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:14:57.982Z
matched_actions: 175
action_count: 175
confidence: medium
summary: "All 175 spec actions (Commands + Feedbacks counted as query_command-bearing) match literal wire tokens in the source command guide; transport parameters (port 7000, baud 38400 8N1, HTTP base) are verbatim. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is branded \"Digital Projection\" in body text/tables; manufacturer recorded as \"Depili\" per entity bootstrap token"
- "HIGHlite 660/730/740 2D models require a manufacturer's upgrade before this protocol can be used"
- "no firmware version compatibility ranges stated in source"
- "no safety warnings, interlock procedures, or power-on"
- "source document branded \"Digital Projection\" (doc 115-482A); manufacturer token per entity bootstrap"
- "firmware/protocol version compatibility not stated in source"
- "command availability per exact model badge not exhaustively cross-listed here; see source tables"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
