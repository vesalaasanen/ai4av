---
spec_id: admin/christie-d4k-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie D4K Series Control Spec"
manufacturer: Christie
model_family: D4K-60
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - D4K-60
    - "Mirage 4K"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-101258-05-christie-lit-tech-ref-d4k-serial-api.pdf
retrieved_at: 2026-05-14T14:29:32.789Z
last_checked_at: 2026-06-02T00:53:53.947Z
generated_at: 2026-06-02T00:53:53.947Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - CCA+ROFB
  - CCA+GOFB
  - "baud rate, data bits, parity, stop bits not all stated; TCP default port not specified"
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "configurable 1024-49151; default not stated (3003 reserved)"
  - "source does not document a settable parameter that is not already represented as a discrete action."
  - "source does not document explicit multi-step sequences."
  - "no explicit safety warnings or interlock procedures beyond what is captured above."
  - "data bits, parity, stop bits, flow control not stated; default TCP port not stated; firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T00:53:53.947Z
  matched_actions: 160
  action_count: 160
  confidence: medium
  summary: "All 160 spec actions have verbatim wire-literal matches in the source; only CCA+ROFB and CCA+GOFB are undocumented in the spec (2 of ~128 source tokens). (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Christie D4K Series Control Spec

## Summary
Christie D4K-60 / Mirage 4K projector. Serial (RS-232, RS-422) and TCP/IP (Christie Serial Protocol over Ethernet) control surface. Documents the complete ASCII command set with response formats.

<!-- UNRESOLVED: baud rate, data bits, parity, stop bits not all stated; TCP default port not specified -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # default per source; range 2400-115200 also supported
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: null  # UNRESOLVED: configurable 1024-49151; default not stated (3003 reserved)
auth:
  type: none  # inferred: default access level is "Free Access" (RAL value 2)
```

## Traits
```yaml
traits:
  - powerable       # PWR command present
  - queryable       # many ?-suffixed queries
  - routable        # NTR routes messages between RS232/RS422/Ethernet
```

## Actions
```yaml
- id: address_set
  label: Set Projector Address
  kind: action
  command: "ADR {value}"
  params:
    - name: value
      type: integer
      description: Address 0-999 (65535 = reserved broadcast)

- id: address_query
  label: Query Projector Address
  kind: query
  command: "ADR?"
  params: []

- id: ambient_light_correction
  label: Ambient Light Correction
  kind: action
  command: "ALC {value}"
  params:
    - name: value
      type: integer
      description: -100 to 100; 0 = none, positive = darker, negative = brighter

- id: auto_power_up
  label: Auto Power Up
  kind: action
  command: "APW {value}"
  params:
    - name: value
      type: integer
      description: 0 = disable, 1 = enable

- id: auto_setup
  label: Auto Setup
  kind: action
  command: "ASU"
  params: []

- id: baud_rate_port_a
  label: Baud Rate (RS232-IN)
  kind: action
  command: "BDR+PRTA {value}"
  params:
    - name: value
      type: integer
      description: "1=2400, 2=9600, 3=19200, 4=38400, 5=57600, 6=115200 (default)"

- id: baud_rate_port_b
  label: Baud Rate (RS232-OUT)
  kind: action
  command: "BDR+PRTB {value}"
  params:
    - name: value
      type: integer
      description: "1=2400, 2=9600, 3=19200, 4=38400, 5=57600, 6=115200 (default)"

- id: baud_rate_port_c
  label: Baud Rate (RS422)
  kind: action
  command: "BDR+PRTC {value}"
  params:
    - name: value
      type: integer
      description: "1=2400, 2=9600, 3=19200, 4=38400, 5=57600, 6=115200 (default)"

- id: base_gamma_curve
  label: Base Gamma Curve
  kind: action
  command: "BGC {value}"
  params:
    - name: value
      type: integer
      description: "0=sRGB (default), 2=Power Law, 3=M-Series, 4=ITU-R BT.709"

- id: self_test_list_suites
  label: List Self Test Suites
  kind: query
  command: "BST?L"
  params: []

- id: self_test_run
  label: Run Self Test Suite
  kind: action
  command: "BST {suite}"
  params:
    - name: suite
      type: integer
      description: "0=All, 1=Img Proc, 2=Formatter, 3=ABP, 4=Video Path"

- id: self_test_list_tests
  label: List Self Tests
  kind: query
  command: "BST+TEST?L"
  params: []

- id: self_test_run_test
  label: Run Self Test
  kind: action
  command: "BST+TEST {index}"
  params:
    - name: index
      type: integer
      description: Test index (see source list, indices 0-10)

- id: cca_select_table
  label: Color Table Select
  kind: action
  command: "CCA+SLCT {value}"
  params:
    - name: value
      type: integer
      description: "0=Max Drives, 1=Color Temp, 2=HD Video (BT.709), 3=Custom"

- id: cca_color_temp
  label: Color Temperature
  kind: action
  command: "CCA+CTMP {value}"
  params:
    - name: value
      type: integer
      description: 3200-9300 (Kelvin)

- id: cca_red_x
  label: Custom Color Red X
  kind: action
  command: "CCA+RDCX {value}"
  params:
    - name: value
      type: integer
      description: CIE x * 10000 (e.g. 3350 = x=0.3350)

- id: cca_red_y
  label: Custom Color Red Y
  kind: action
  command: "CCA+RDCY {value}"
  params:
    - name: value
      type: integer
      description: CIE y * 10000

- id: cca_green_x
  label: Custom Color Green X
  kind: action
  command: "CCA+GNCX {value}"
  params: [{name: value, type: integer, description: CIE x * 10000}]

- id: cca_green_y
  label: Custom Color Green Y
  kind: action
  command: "CCA+GNCY {value}"
  params: [{name: value, type: integer, description: CIE y * 10000}]

- id: cca_blue_x
  label: Custom Color Blue X
  kind: action
  command: "CCA+BLCX {value}"
  params: [{name: value, type: integer, description: CIE x * 10000}]

- id: cca_blue_y
  label: Custom Color Blue Y
  kind: action
  command: "CCA+BLCY {value}"
  params: [{name: value, type: integer, description: CIE y * 10000}]

- id: cca_white_x
  label: Custom Color White X
  kind: action
  command: "CCA+WHCX {value}"
  params: [{name: value, type: integer, description: CIE x * 10000}]

- id: cca_white_y
  label: Custom Color White Y
  kind: action
  command: "CCA+WHCY {value}"
  params: [{name: value, type: integer, description: CIE y * 10000}]

- id: cca_gofr
  label: Saturation Green-of-Red
  kind: action
  command: "CCA+GOFR {value}"
  params: [{name: value, type: integer, description: "-1000 to 1000 (1000 = 100%)"}]

- id: cca_bofr
  label: Saturation Blue-of-Red
  kind: action
  command: "CCA+BOFR {value}"
  params: [{name: value, type: integer, description: "-1000 to 1000"}]

- id: cca_rofg
  label: Saturation Red-of-Green
  kind: action
  command: "CCA+ROFG {value}"
  params: [{name: value, type: integer, description: "-1000 to 1000"}]

- id: cca_bofg
  label: Saturation Blue-of-Green
  kind: action
  command: "CCA+BOFG {value}"
  params: [{name: value, type: integer, description: "-1000 to 1000"}]

- id: cca_rofr
  label: Saturation Red-of-Red
  kind: action
  command: "CCA+ROFR {value}"
  params: [{name: value, type: integer, description: "0 to 1000 (1000 = 100%)"}]

- id: cca_gofg
  label: Saturation Green-of-Green
  kind: action
  command: "CCA+GOFG {value}"
  params: [{name: value, type: integer, description: "0 to 1000"}]

- id: cca_bofb
  label: Saturation Blue-of-Blue
  kind: action
  command: "CCA+BOFB {value}"
  params: [{name: value, type: integer, description: "0 to 1000"}]

- id: cca_rofw
  label: Saturation Red-of-White
  kind: action
  command: "CCA+ROFW {value}"
  params: [{name: value, type: integer, description: "0 to 1000"}]

- id: cca_gofw
  label: Saturation Green-of-White
  kind: action
  command: "CCA+GOFW {value}"
  params: [{name: value, type: integer, description: "0 to 1000"}]

- id: cca_bofw
  label: Saturation Blue-of-White
  kind: action
  command: "CCA+BOFW {value}"
  params: [{name: value, type: integer, description: "0 to 1000"}]

- id: cca_rdpx
  label: Native Primary Red X
  kind: action
  command: "CCA+RDPX {value}"
  params: [{name: value, type: integer, description: CIE x * 10000; service user only}]

- id: cca_rdpy
  label: Native Primary Red Y
  kind: action
  command: "CCA+RDPY {value}"
  params: [{name: value, type: integer, description: CIE y * 10000}]

- id: cca_gnpx
  label: Native Primary Green X
  kind: action
  command: "CCA+GNPX {value}"
  params: [{name: value, type: integer, description: CIE x * 10000}]

- id: cca_gnpy
  label: Native Primary Green Y
  kind: action
  command: "CCA+GNPY {value}"
  params: [{name: value, type: integer, description: CIE y * 10000}]

- id: cca_blpx
  label: Native Primary Blue X
  kind: action
  command: "CCA+BLPX {value}"
  params: [{name: value, type: integer, description: CIE x * 10000}]

- id: cca_blpy
  label: Native Primary Blue Y
  kind: action
  command: "CCA+BLPY {value}"
  params: [{name: value, type: integer, description: CIE y * 10000}]

- id: cca_whpx
  label: Native Primary White X
  kind: action
  command: "CCA+WHPX {value}"
  params: [{name: value, type: integer, description: CIE x * 10000}]

- id: cca_whpy
  label: Native Primary White Y
  kind: action
  command: "CCA+WHPY {value}"
  params: [{name: value, type: integer, description: CIE y * 10000}]

- id: cca_copy
  label: Copy Color Table
  kind: action
  command: "CCA+COPY {value}"
  params:
    - name: value
      type: integer
      description: "0=Max, 1=Color Temp, 2=HD Video (BT.709)"

- id: cca_save
  label: Save Color Primaries
  kind: action
  command: "CCA+SAVE"
  params: []

- id: cca_reset
  label: Reset Color Primaries
  kind: action
  command: "CCA+RSET"
  params: []

- id: channel_list
  label: List Available Channels
  kind: query
  command: "CHA?L"
  params: []

- id: channel_select
  label: Select Channel
  kind: action
  command: "CHA {channel}"
  params:
    - name: channel
      type: integer
      description: "1-4 (Four-Port), 11-12 (Two-Port), 21-24 (One-Port)"

- id: color_enable
  label: Color Enable
  kind: action
  command: "CLE {color}"
  params:
    - name: color
      type: integer
      description: "0=White, 1=Red, 2=Green, 3=Blue, 4=Yellow, 5=Cyan, 6=Magenta"

- id: color_space
  label: Color Space Selection
  kind: action
  command: "CSP {value}"
  params:
    - name: value
      type: integer
      description: "0=Auto (default), 1=RGB full, 2=RGB limited, 3=YCbCr BT.709, 4=YCbCr expanded"

- id: factory_defaults
  label: Factory Defaults
  kind: action
  command: "DEF 111"
  params: []
  notes: "Requires exactly '111'. Only valid in standby or cooling down. Requires AC cycle after."

- id: sharpness
  label: Sharpness
  kind: action
  command: "DTL {value}"
  params:
    - name: value
      type: integer
      description: 0-100 (50 = default, higher = sharper)

- id: black_level_blend_list
  label: List Black Level Blends
  kind: query
  command: "EBB+SLCT?L"
  params: []

- id: black_level_blend_select
  label: Select Black Level Blend
  kind: action
  command: "EBB+SLCT {value}"
  params:
    - name: value
      type: integer
      description: "0=off (default), 1-4=blend index"

- id: edge_blend_list
  label: List Edge Blends
  kind: query
  command: "EBL+SLCT?L"
  params: []

- id: edge_blend_select
  label: Select Edge Blend
  kind: action
  command: "EBL+SLCT {value}"
  params:
    - name: value
      type: integer
      description: "0=off, 1-4=blend index"

- id: edid_frame_rate
  label: EDID Override Frame Rate
  kind: action
  command: "EDO {rate}"
  params:
    - name: rate
      type: integer
      description: "24, 25, 30, 48, 50, 60 (default)"

- id: edid_window
  label: EDID Override Window
  kind: action
  command: "EDO+COLM {value}"
  params:
    - name: value
      type: integer
      description: "0=Standard, 1=Two Column, 2=Four Column"

- id: async_messages_enable
  label: Enable Async Serial Messages
  kind: action
  command: "EME {value}"
  params:
    - name: value
      type: integer
      description: "0=disable, 1=enable (default)"

- id: engine_test_pattern
  label: Engine Test Pattern
  kind: action
  command: "ETP {index}"
  params:
    - name: index
      type: integer
      description: "0=Flat Black, 1-22=patterns, 255=Off (see source for full list of 0-255)"

- id: event_manager
  label: Event Manager
  kind: query
  command: "EVT"
  params: []

- id: event_manager_max
  label: Event Manager (max count)
  kind: query
  command: "EVT {max}"
  params: [{name: max, type: integer, description: Maximum events to return}]

- id: event_manager_from
  label: Event Manager (from timestamp)
  kind: query
  command: "EVT \"{timestamp}\""
  params: [{name: timestamp, type: string, description: "yyyy-mm-dd hh:mm:ss"}]

- id: event_manager_range
  label: Event Manager (range)
  kind: query
  command: "EVT \"{start}\" \"{end}\""
  params:
    - name: start
      type: string
      description: "Start timestamp yyyy-mm-dd hh:mm:ss"
    - name: end
      type: string
      description: "End timestamp yyyy-mm-dd hh:mm:ss"

- id: lens_focus
  label: Lens Focus Position
  kind: action
  command: "FCS {position}"
  params:
    - name: position
      type: integer
      description: Absolute focus position (range from FCS?m)

- id: lens_focus_range
  label: Lens Focus Range
  kind: query
  command: "FCS?m"
  params: []

- id: frame_delay
  label: Frame Delay
  kind: action
  command: "FRD {delay}"
  params:
    - name: delay
      type: integer
      description: "1000-3000 (1/1000ths of a frame; 2000 default)"

- id: frame_delay_actual
  label: Frame Delay (actual)
  kind: query
  command: "FRD+STAT?"
  params: []

- id: frame_delay_ms
  label: Frame Delay (ms string)
  kind: query
  command: "FRD+TIME?"
  params: []

- id: image_freeze
  label: Image Freeze
  kind: action
  command: "FRZ {value}"
  params:
    - name: value
      type: integer
      description: "0=disable (default), 1=freeze"

- id: gamma_exponent
  label: Gamma Power Law Exponent
  kind: action
  command: "GAM {exponent}"
  params:
    - name: exponent
      type: integer
      description: "1000-3000 (2200 default); requires BGC=Power Law"

- id: gamma_slope
  label: Gamma Slope
  kind: action
  command: "GAM+SLOP {value}"
  params: [{name: value, type: integer, description: "1-100 (1 default)"}]

- id: gamma_contrast
  label: Gamma BT.1886 Contrast
  kind: action
  command: "GAM+BLKA {value}"
  params: [{name: value, type: integer, description: "1000-5000 (2000 default)"}]

- id: lamp_history
  label: Lamp History
  kind: query
  command: "HIS?"
  params: []

- id: internal_test_pattern
  label: Internal Test Pattern
  kind: action
  command: "ITP {index}"
  params:
    - name: index
      type: integer
      description: "0=Off, 1=Grid, 2=Grey 16, 3=White, 4=Grey, 5=Black, 6=Checker, 7=17pt, 8=Edge, 9=Color Bars, 10=Multi, 11=RGBW, 12=H Ramp, 13=V Ramp, 14=Diag, 15=Sq Grid, 16=Diag Grid, 17=Prism, 18=Max Act, 19=FLIR, 20=Focus"

- id: test_pattern_frequency
  label: Test Pattern Frequency
  kind: action
  command: "ITP+FREQ {value}"
  params: [{name: value, type: integer, description: "24-60 (default)"}]

- id: test_pattern_grey
  label: Test Pattern Grey Level
  kind: action
  command: "ITP+GREY {level}"
  params: [{name: level, type: integer, description: "0-4095 (2048 default)"}]

- id: test_pattern_ramp_speed
  label: Ramp Speed
  kind: action
  command: "ITP+RMPM {speed}"
  params: [{name: speed, type: integer, description: "0-100 (0 default)"}]

- id: test_pattern_ramp_slope
  label: Ramp Slope
  kind: action
  command: "ITP+RMPS {slope}"
  params: [{name: slope, type: integer, description: "1-5 (1 default)"}]

- id: test_pattern_ramp_level
  label: Ramp Start Level
  kind: action
  command: "ITP+RMPL {level}"
  params: [{name: level, type: integer, description: "0-4095 (0 default)"}]

- id: test_pattern_grid_pitch
  label: Grid Pitch
  kind: action
  command: "ITP+GRDP {pitch}"
  params: [{name: pitch, type: integer, description: "2-127 (32 default)"}]

- id: test_pattern_grid_color
  label: Grid Color Mode
  kind: action
  command: "ITP+GRDC {value}"
  params: [{name: value, type: integer, description: "0=White-on-black, 1=Multi-color (default)"}]

- id: test_pattern_grid_motion
  label: Grid Motion
  kind: action
  command: "ITP+GRDM {value}"
  params: [{name: value, type: integer, description: "0=Static (default), 1=Moving"}]

- id: lens_motor_calibrate
  label: Lens Motor Calibration
  kind: action
  command: "LCB 1"
  params: []

- id: lens_motor_home
  label: Lens Motor Home
  kind: action
  command: "LCB+HOME"
  params: []

- id: lens_horizontal
  label: Lens Horizontal Position
  kind: action
  command: "LHO {position}"
  params: [{name: position, type: integer, description: Absolute horizontal position (range from LHO?m)}]

- id: lens_horizontal_range
  label: Lens Horizontal Range
  kind: query
  command: "LHO?m"
  params: []

- id: lamploc_auto
  label: LampLOC Start/Cancel
  kind: action
  command: "LLM+AUTO {start}"
  params: [{name: start, type: integer, description: "0=cancel, 1=start"}]

- id: lamploc_calibrate
  label: LampLOC Calibrate
  kind: action
  command: "LLM+CALI 1"
  params: []

- id: lamploc_light
  label: LampLOC Light Sensor
  kind: query
  command: "LLM+LGHT?"
  params: []

- id: lamploc_movx
  label: LampLOC Move X
  kind: action
  command: "LLM+MOVX {value}"
  params: [{name: value, type: integer, description: "-1=neg, 0=stop, 1=pos"}]

- id: lamploc_movy
  label: LampLOC Move Y
  kind: action
  command: "LLM+MOVY {value}"
  params: [{name: value, type: integer, description: "-1=neg, 0=stop, 1=pos"}]

- id: lamploc_movz
  label: LampLOC Move Z
  kind: action
  command: "LLM+MOVZ {value}"
  params: [{name: value, type: integer, description: "-1=neg, 0=stop, 1=pos"}]

- id: lamploc_mtrx
  label: LampLOC Move X To Position
  kind: action
  command: "LLM+MTRX {value}"
  params: [{name: value, type: integer, description: "-250 to 250"}]

- id: lamploc_mtry
  label: LampLOC Move Y To Position
  kind: action
  command: "LLM+MTRY {value}"
  params: [{name: value, type: integer, description: "-250 to 250"}]

- id: lamploc_mtrz
  label: LampLOC Move Z To Position
  kind: action
  command: "LLM+MTRZ {value}"
  params: [{name: value, type: integer, description: "-175 to 175"}]

- id: lamploc_relx
  label: LampLOC Relative X
  kind: action
  command: "LLM+RELX {steps}"
  params: [{name: steps, type: integer, description: Signed steps"}]

- id: lamploc_rely
  label: LampLOC Relative Y
  kind: action
  command: "LLM+RELY {steps}"
  params: [{name: steps, type: integer, description: Signed steps"}]

- id: lamploc_relz
  label: LampLOC Relative Z
  kind: action
  command: "LLM+RELZ {steps}"
  params: [{name: steps, type: integer, description: Signed steps"}]

- id: lamploc_status
  label: LampLOC Progress
  kind: query
  command: "LLM+STAT?"
  params: []

- id: lens_move_absolute
  label: Lens Move Absolute
  kind: action
  command: "LMV {h} {v} {z} {f}"
  params:
    - name: h
      type: integer
      description: Horizontal position
    - name: v
      type: integer
      description: Vertical position
    - name: z
      type: integer
      description: Zoom position
    - name: f
      type: integer
      description: Focus position

- id: lens_h_steps
  label: Lens Horizontal Steps
  kind: action
  command: "LMV+HSTP {steps}"
  params: [{name: steps, type: integer, description: "Negative=down, positive=up"}]

- id: lens_v_steps
  label: Lens Vertical Steps
  kind: action
  command: "LMV+VSTP {steps}"
  params: [{name: steps, type: integer, description: "Negative=down, positive=up"}]

- id: lens_focus_steps
  label: Lens Focus Steps
  kind: action
  command: "LMV+FSTP {steps}"
  params: [{name: steps, type: integer, description: "Negative=inward, positive=outward"}]

- id: lens_zoom_steps
  label: Lens Zoom Steps
  kind: action
  command: "LMV+ZSTP {steps}"
  params: [{name: steps, type: integer, description: "Negative=larger, positive=smaller"}]

- id: lens_h_run
  label: Lens Horizontal Run
  kind: action
  command: "LMV+HRUN {value}"
  params: [{name: value, type: integer, description: "-1=left, 0=stop, 1=right"}]

- id: lens_v_run
  label: Lens Vertical Run
  kind: action
  command: "LMV+VRUN {value}"
  params: [{name: value, type: integer, description: "-1=down, 0=stop, 1=up"}]

- id: lens_focus_run
  label: Lens Focus Run
  kind: action
  command: "LMV+FRUN {value}"
  params: [{name: value, type: integer, description: "-1=inward, 0=stop, 1=outward"}]

- id: lens_zoom_run
  label: Lens Zoom Run
  kind: action
  command: "LMV+ZRUN {value}"
  params: [{name: value, type: integer, description: "-1=larger, 0=stop, 1=smaller"}]

- id: loop_out_enable
  label: Video Loop Out
  kind: action
  command: "LOE {value}"
  params: [{name: value, type: integer, description: "0=disable, 1=enable (default)"}]

- id: lamp_change
  label: Lamp Change
  kind: action
  command: "LPC {lamp_type} \"{serial}\" [{hours}]"
  params:
    - name: lamp_type
      type: integer
      description: Lamp type index (LPC+TYPE?L)
    - name: serial
      type: string
      description: Lamp serial number
    - name: hours
      type: integer
      description: Pre-used hours (optional)

- id: lamp_type_list
  label: List Lamp Types
  kind: query
  command: "LPC+TYPE?L"
  params: []

- id: lamp_life
  label: Lamp Life Threshold
  kind: action
  command: "LPL {hours}"
  params: [{name: hours, type: integer, description: "Positive hours; 0=disable check (default)"}]

- id: lamp_mode
  label: Lamp Mode
  kind: action
  command: "LPM {value}"
  params: [{name: value, type: integer, description: "0=Constant Power (default), 1=Constant Intensity (LiteLOC)"}]

- id: lamp_power
  label: Lamp Power
  kind: action
  command: "LPP {power}"
  params: [{name: power, type: integer, description: Watts (range from LPP?m)"}]

- id: lamp_power_range
  label: Lamp Power Range
  kind: query
  command: "LPP?m"
  params: []

- id: lens_vertical
  label: Lens Vertical Position
  kind: action
  command: "LVO {position}"
  params: [{name: position, type: integer, description: Absolute vertical position (range from LVO?m)"}]

- id: lens_vertical_range
  label: Lens Vertical Range
  kind: query
  command: "LVO?m"
  params: []

- id: net_set
  label: Network Setup (Static IP)
  kind: action
  command: "NET \"{ip}\" \"{subnet}\" [\"{gateway}\"]"
  params:
    - name: ip
      type: string
      description: IP address
    - name: subnet
      type: string
      description: Subnet mask
    - name: gateway
      type: string
      description: Gateway (optional)

- id: net_dgrp
  label: Network Device Group
  kind: action
  command: "NET+DGRP \"{group}\""
  params: [{name: group, type: string, description: Device group name}]

- id: net_dhcp
  label: Enable DHCP
  kind: action
  command: "NET+DHCP 1"
  params: []

- id: net_ip
  label: Get IP Address
  kind: query
  command: "NET+ETH0?"
  params: []

- id: net_gateway
  label: Get Gateway
  kind: query
  command: "NET+GATE?"
  params: []

- id: net_host
  label: Set Hostname
  kind: action
  command: "NET+HOST \"{name}\""
  params: [{name: name, type: string, description: Hostname (resolves as <name>.local)"}]

- id: net_mac
  label: Get MAC Address
  kind: query
  command: "NET+MAC0?"
  params: []

- id: net_port
  label: Get TCP Port
  kind: query
  command: "NET+PORT?"
  params: []

- id: net_subnet
  label: Get Subnet Mask
  kind: query
  command: "NET+SUB0?"
  params: []

- id: net_routing
  label: Network Routing
  kind: action
  command: "NTR {value}"
  params:
    - name: value
      type: integer
      description: "0=Separate (default), 1=RS232+RS422, 2=RS232+Ethernet, 3=All joined incl USB"

- id: ping
  label: Ping / Device Info
  kind: query
  command: "PNG?"
  params: []

- id: profile_list
  label: List Profiles
  kind: query
  command: "PRO?L"
  params: []

- id: profile_select
  label: Select Profile
  kind: action
  command: "PRO {value}"
  params:
    - name: value
      type: integer
      description: "0=Default, 1-4=custom"

- id: power
  label: Power
  kind: action
  command: "PWR {value}"
  params: [{name: value, type: integer, description: "0=off, 1=on"}]

- id: power_electronics_override
  label: Power Electronics Override
  kind: action
  command: "PWR+ELEC {value}"
  params: [{name: value, type: integer, description: "0=disable, 1=keep electronics on in standby"}]

- id: power_query
  label: Power State
  kind: query
  command: "PWR?"
  params: []

- id: access_level_prta
  label: Access Level (RS232-IN)
  kind: action
  command: "RAL+PRTA {value}"
  params: [{name: value, type: integer, description: "0=No Access, 1=Login Required, 2=Free Access (default)"}]

- id: access_level_prtb
  label: Access Level (RS232-OUT)
  kind: action
  command: "RAL+PRTB {value}"
  params: [{name: value, type: integer, description: "0=No Access, 1=Login Required, 2=Free Access (default)"}]

- id: access_level_prtc
  label: Access Level (RS422)
  kind: action
  command: "RAL+PRTC {value}"
  params: [{name: value, type: integer, description: "0=No Access, 1=Login Required, 2=Free Access (default)"}]

- id: access_level_pusb
  label: Access Level (USB)
  kind: action
  command: "RAL+PUSB {value}"
  params: [{name: value, type: integer, description: "0=No Access, 1=Login Required, 2=Free Access (default)"}]

- id: shutter
  label: Shutter
  kind: action
  command: "SHU {value}"
  params: [{name: value, type: integer, description: "0=open, 1=closed (default)"}]

- id: shutter_query
  label: Shutter State
  kind: query
  command: "SHU?"
  params: []

- id: snmp_tip1
  label: SNMP Trap IP 1
  kind: action
  command: "SNM+TIP1 \"{ip}\""
  params: [{name: ip, type: string, description: "Trap IP; 0.0.0.0 disables (default)"}]

- id: snmp_tip2
  label: SNMP Trap IP 2
  kind: action
  command: "SNM+TIP2 \"{ip}\""
  params: [{name: ip, type: string, description: "Trap IP; 0.0.0.0 disables (default)"}]

- id: snmp_tip3
  label: SNMP Trap IP 3
  kind: action
  command: "SNM+TIP3 \"{ip}\""
  params: [{name: ip, type: string, description: "Trap IP; 0.0.0.0 disables (default)"}]

- id: snmp_read_password
  label: SNMP Read Password
  kind: action
  command: "SNM+READ \"{password}\""
  params: [{name: password, type: string, description: "Default = 'private'"}]

- id: snmp_lamp_trap
  label: SNMP Lamp State Trap
  kind: action
  command: "SNM+LAMP {value}"
  params: [{name: value, type: integer, description: "0=disable, 1=enable"}]

- id: snmp_life_trap
  label: SNMP Lamp End-of-Life Trap
  kind: action
  command: "SNM+LIFE {value}"
  params: [{name: value, type: integer, description: "0=disable, 1=enable"}]

- id: snmp_power_trap
  label: SNMP Power Trap
  kind: action
  command: "SNM+POWR {value}"
  params: [{name: value, type: integer, description: "0=disable, 1=enable"}]

- id: snmp_stall_trap
  label: SNMP Fan Stall Trap
  kind: action
  command: "SNM+STAL {value}"
  params: [{name: value, type: integer, description: "0=disable, 1=enable"}]

- id: snmp_thermal_trap
  label: SNMP Thermal Trap
  kind: action
  command: "SNM+THRM {value}"
  params: [{name: value, type: integer, description: "0=disable, 1=enable"}]

- id: screen_orientation
  label: Screen Orientation
  kind: action
  command: "SOR {value}"
  params: [{name: value, type: integer, description: "0=Front (default), 1=Rear, 2=Front Inverted, 3=Rear Inverted"}]

- id: status_all
  label: Status (all)
  kind: query
  command: "SST?"
  params: []

- id: status_group
  label: Status (group)
  kind: query
  command: "SST+{group}?"
  params: [{name: group, type: string, description: Four-letter status group identifier}]

- id: status_item
  label: Status (item)
  kind: query
  command: "SST+{group}?{index}"
  params:
    - name: group
      type: string
      description: Four-letter status group identifier
    - name: index
      type: integer
      description: Item index within group

- id: size_position
  label: Size and Position
  kind: action
  command: "SZP {value}"
  params:
    - name: value
      type: integer
      description: "0=Auto (default), 1=None, 2=Full size, 3=Full width, 4=Full height"

- id: time_set
  label: Set Time
  kind: action
  command: "TMD+TIME \"{time}\""
  params: [{name: time, type: string, description: "Time as hh:mm:ss"}]

- id: date_set
  label: Set Date
  kind: action
  command: "TMD+DATE \"{date}\""
  params: [{name: date, type: string, description: "Date as YYYY/MM/DD"}]

- id: time_query
  label: Get Time
  kind: query
  command: "TMD+TIME?"
  params: []

- id: user_login
  label: User Login
  kind: action
  command: "UID \"{username}\" \"{password}\""
  params:
    - name: username
      type: string
      description: Username
    - name: password
      type: string
      description: Password
  notes: "Default service login: 'service'/'service'"

- id: warp_list
  label: List Warp Maps
  kind: query
  command: "WRP+SLCT?"
  params: []

- id: warp_select
  label: Select Warp Map
  kind: action
  command: "WRP+SLCT {value}"
  params: [{name: value, type: integer, description: "0=off, 1-4=warp map"}]

- id: lens_zoom
  label: Lens Zoom Position
  kind: action
  command: "ZOM {position}"
  params: [{name: position, type: integer, description: Absolute zoom position (range from ZOM?m)"}]

- id: lens_zoom_range
  label: Lens Zoom Range
  kind: query
  command: "ZOM?m"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, warming_up, on, cooling_down]
  source: "PWR! response: 000=Standby, 011=Warming up, 001=On, 010=Cooling down"

- id: shutter_state
  type: enum
  values: [open, closed]
  source: "SHU? returns 0=open, 1=closed"

- id: status_item_state
  type: enum
  values: [ok, warning, error]
  source: "SST+<group>!<index> state field: 000=OK, 001=Warning, 002=Error"

- id: lamp_history_entry
  type: object
  source: "HIS! response with entry number, install date, serial, lamp type, strikes, failed strikes, failed re-strikes, unexpected offs, pre-inst hours, total hours"

- id: tcp_port
  type: integer
  source: "NET+PORT? returns configured TCP port (1024-49151)"

- id: ip_address
  type: string
  source: "NET+ETH0?"

- id: gateway
  type: string
  source: "NET+GATE?"

- id: subnet_mask
  type: string
  source: "NET+SUB0?"

- id: mac_address
  type: string
  source: "NET+MAC0?"

- id: lamp_lamploc_progress
  type: integer
  source: "LLM+STAT? returns 0-100 percent"

- id: lamp_lamploc_light_sensor
  type: integer
  source: "LLM+LGHT? returns light sensor value"

- id: ping_response
  type: object
  source: "PNG! response: <type> <major> <minor> <build>"

- id: event_entry
  type: object
  source: "EVT! response with index, timestamp, severity (OK/Error/Warning), message"
```

## Variables
```yaml
# UNRESOLVED: source does not document a settable parameter that is not already represented as a discrete action.
```

## Events
```yaml
- id: card_detected
  message_template: "65535 00000 FYI01901 \"Card x detected\""
  description: "Triggered when a new card is detected in slot x while video electronics are already on."

- id: card_removed
  message_template: "65535 00000 FYI01901 \"Card x removed\""
  description: "Triggered when a card is removed from slot x while video electronics are on."

- id: date_set
  message_template: "65535 00000 FYI00916 \"Setting Date to YYYY/MM/DD\""
  description: "Generated when the date is changed."

- id: time_set
  message_template: "65535 00000 FYI00916 \"Setting Time to hh:mm:ss\""
  description: "Generated when the time is changed."

- id: factory_defaults
  message_template: "65535 00000 FYI00919 \"All settings have been restored to their factory defaults. Reboot is required to take effect.\""
  description: "Generated when a factory default has been performed."

- id: network_changed
  message_template: "65535 00000 FYI00915 \"Configured network: IP:... Mask:... Gateway:...\""
  description: "Generated when network settings change."

- id: status_ok
  message_template: "65535 00000 FYI00000 \"(SST+<group>?<index>) <description> = <value>\""
  description: "Status item transitioned to OK."

- id: status_warning
  message_template: "65535 00000 ERR00000 \"System Warning: (SST+<group>?<index>) <description> = <value>\""
  description: "Status item transitioned to warning."

- id: status_error
  message_template: "65535 00000 ERR00000 \"System Error: (SST+<group>?<index>) <description> = <value>\""
  description: "Status item transitioned to error."
```

## Macros
```yaml
# UNRESOLVED: source does not document explicit multi-step sequences.
```

## Safety
```yaml
confirmation_required_for:
  - factory_defaults  # DEF 111, requires exact value 111; only valid in standby/cool down
interlocks:
  - "BST (self test) must not run while projector is warming up"
  - "LPP (lamp power) only meaningful in Constant Power mode (LPM 0)"
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond what is captured above.
```

## Notes
- Protocol: ASCII, parenthesis-delimited, e.g. `(PWR 1)`, `(BDR+PRTA 6)`.
- Subcommands use `+` as separator, e.g. `BDR+PRTA`, `CCA+RDCX`.
- Queries use `?` suffix; responses use `!`, e.g. `ADR?` → `(01001 00005ADR!005)`.
- Multiple projectors on a daisy chain require `ADR` to be set uniquely.
- TCP port is configurable (range 1024-49151, 3003 reserved). The source does not state a default TCP port.
- Baud rate default is 115200 across all three serial ports (RS232-IN, RS232-OUT, RS422). Service-level access required to change.
- Three login levels (RAL): 0 = No Access, 1 = Login Required, 2 = Free Access (default).
- "saved value" annotations in the source mean the setting persists across AC cycles.
- The source documents commands and examples but no formal safety/interlock section.

<!-- UNRESOLVED: data bits, parity, stop bits, flow control not stated; default TCP port not stated; firmware version compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-101258-05-christie-lit-tech-ref-d4k-serial-api.pdf
retrieved_at: 2026-05-14T14:29:32.789Z
last_checked_at: 2026-06-02T00:53:53.947Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T00:53:53.947Z
matched_actions: 160
action_count: 160
confidence: medium
summary: "All 160 spec actions have verbatim wire-literal matches in the source; only CCA+ROFB and CCA+GOFB are undocumented in the spec (2 of ~128 source tokens). (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- CCA+ROFB
- CCA+GOFB
- "baud rate, data bits, parity, stop bits not all stated; TCP default port not specified"
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "configurable 1024-49151; default not stated (3003 reserved)"
- "source does not document a settable parameter that is not already represented as a discrete action."
- "source does not document explicit multi-step sequences."
- "no explicit safety warnings or interlock procedures beyond what is captured above."
- "data bits, parity, stop bits, flow control not stated; default TCP port not stated; firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
