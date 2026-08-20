---
spec_id: admin/christie-hdseries
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie HD Series Control Spec"
manufacturer: Christie
model_family: "Christie HD (all)"
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - "Christie HD (all)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - qed-productions.com
  - christiedigital.com
source_urls:
  - https://www.qed-productions.com/downloads/christie/serial-communications.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-102247-02-christie-lit-tech-ref-hs-series-api.pdf
  - http://www.qed-productions.com/downloads/christie/serial-communications.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-102271-04-christie-lit-tech-ref-gs-700-850-api.pdf
  - https://www.christiedigital.com/globalassets/resources/public/christie-hd-series-brochure.pdf
retrieved_at: 2026-08-09T13:58:43.128Z
last_checked_at: 2026-08-19T09:08:11.314Z
generated_at: 2026-08-19T09:08:11.314Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "HD-series-specific product model numbers (HD10K/HD12K/etc.) not enumerated in this source; \"Christie HD (all)\" is the only HD reference. Specific TCP port number for Ethernet not stated. Stop bits not stated."
  - "stop bits not stated in source"
  - "Ethernet TCP port number not stated in source"
  - "no explicit named multi-step macros described; RTE events"
  - "full safety / interlock / power-on sequencing for HD"
  - "HD-series specific model enumeration (HD10K/HD12K/HD14K/HD18K \"Roadster HD\") not present in this TIPM serial-command reference — covers all listed projector families generically."
  - "Ethernet TCP port number not stated."
  - "Stop bits not stated."
  - "Firmware version compatibility not stated."
  - "Voltage / current / power specs not in this command reference."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:08:11.314Z
  matched_actions: 182
  action_count: 182
  confidence: medium
  summary: "All 182 spec actions map to a 3-letter wire code present in the source summary list with matching parameter ranges/enums; transport values (115200/8/N/xon_xoff) confirmed verbatim. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-09
---

# Christie HD Series Control Spec

## Summary
Christie HD series projectors (HD family) controlled via ASCII text messages over RS-232, RS-422, or Ethernet. Messages use 3-letter function codes wrapped in parentheses, e.g. `(PWR1)`. Covers power, source/channel selection, image adjustments, lens control, lamps, edge blending, networking, diagnostics, and 3D sync.

<!-- UNRESOLVED: HD-series-specific product model numbers (HD10K/HD12K/etc.) not enumerated in this source; "Christie HD (all)" is the only HD reference. Specific TCP port number for Ethernet not stated. Stop bits not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred from "ETHERNET port" mention in §1
serial:
  baud_rate: 115200  # RS232 IN/OUT default per (BDR); RS422 default is 19200
  data_bits: 8  # default per (BDR): "8 data bits, no parity"
  parity: none  # default per (BDR)
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: xon_xoff  # §2.7 documents Xon/Xoff flow control
addressing:
  port: null  # UNRESOLVED: Ethernet TCP port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # PWR on/off
  - queryable    # extensive "?" request commands
  - routable     # CHA / SIN source and input selection
  - levelable    # CON, BRT, CLR, etc. slidebar controls
```

## Actions
```yaml
- id: auto_color_enable
  label: Auto Color Enable
  kind: action
  command: "(ACE{state})"  # 0/1 enable/disable
  params:
    - name: state
      type: integer
      description: 0=disable, 1=enable
- id: accuframe
  label: AccuFrame
  kind: action
  command: "(ACF{value})"
  params:
    - name: value
      type: integer
      description: Value range varies with source frame rate (Matrix projectors only)
- id: projector_number
  label: Projector Number
  kind: action
  command: "(ADR{number})"
  params:
    - name: number
      type: integer
      description: Valid address range 0-999
- id: automatic_gain_control
  label: Automatic Gain Control
  kind: action
  command: "(AGC{state})"
  params:
    - name: state
      type: integer
      description: enable/disable
- id: auto_input_levels
  label: Auto Input Levels
  kind: action
  command: "(AIL)"
  params: []
- id: auto_lens_calibration
  label: Automatic Lens Calibration
  kind: action
  command: "(ALC{state})"
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On
- id: active_projector
  label: Active Projector
  kind: action
  command: "(APJ{state})"
  params:
    - name: state
      type: integer
      description: 0=Disable keypad, 1=Enable
- id: optical_aperture
  label: Optical Aperture
  kind: action
  command: "(APR K{action})"  # keypad emulation required
  params:
    - name: action
      type: integer
      description: K2=increase size, K3=decrease size, K0=stop
- id: auto_power_up
  label: Auto Power Up
  kind: action
  command: "(APW{state})"
  params:
    - name: state
      type: integer
      description: 0=disable, 1=enable
- id: aspect_ratio_overlay
  label: Aspect Ratio Overlay
  kind: action
  command: "(ARO{state})"
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On
- id: auto_source
  label: Auto Source
  kind: action
  command: "(ASR S{source} {state})"
  params:
    - name: source
      type: integer
      description: source setup number 1-50
    - name: state
      type: integer
      description: 0=Off, 1=On
- id: auto_setup
  label: Auto Setup
  kind: action
  command: "(ASU)"
  params: []
- id: bottom_blanking
  label: Bottom Blanking
  kind: action
  command: "(BBL{value})"
  params:
    - name: value
      type: integer
- id: baud_rate
  label: Baud Rate (RS232)
  kind: action
  command: "(BDR{code})"
  params:
    - name: code
      type: integer
      description: "0=1200,1=2400,2=9600,3=19200,4=38400,5=57600,6=115200"
- id: baud_rate_rs422
  label: Baud Rate (RS422)
  kind: action
  command: "(BDS{rate})"
  params:
    - name: rate
      type: integer
      description: full baud rate e.g. 38400
- id: base_gamma_curve
  label: Base Gamma Curve
  kind: action
  command: "(BGC{value})"
  params:
    - name: value
      type: integer
      description: 0=default 2.2, 1-21 user-defined
- id: backlight
  label: Backlight
  kind: action
  command: "(BKL{state})"
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On
- id: broadcast_keys
  label: Broadcast Keys
  kind: action
  command: "(BKY{state})"
  params:
    - name: state
      type: integer
      description: 0=disable, 1=enable
- id: blue_blacklevel
  label: Blue BlackLevel
  kind: action
  command: "(BLB{value})"
  params:
    - name: value
      type: integer
      description: 0-511
- id: blue_drive
  label: Blue Drive
  kind: action
  command: "(BLD{value})"
  params:
    - name: value
      type: integer
      description: 0-511
- id: blue_odd_gain
  label: Blue Odd Gain
  kind: action
  command: "(BOG {bnc} {dvi})"
  params:
    - name: bnc
      type: integer
      description: BNC path 0-255 (0 = leave unchanged)
    - name: dvi
      type: integer
      description: DVI/option-card path 0-255 (0 = leave unchanged)
- id: blue_odd_offset
  label: Blue Odd Offset
  kind: action
  command: "(BOO {bnc} {dvi})"
  params:
    - name: bnc
      type: integer
      description: 0-255
    - name: dvi
      type: integer
      description: 0-255
- id: brightness_matching
  label: Brightness Matching
  kind: action
  command: "(BRM{value})"
  params:
    - name: value
      type: integer
      description: Range 25-255
- id: brightness
  label: Brightness
  kind: action
  command: "(BRT{value})"
  params:
    - name: value
      type: integer
      description: 0-1000 (percentage; 1000=100.0%)
- id: brightness_uniformity
  label: Brightness Uniformity
  kind: action
  command: "(BRU {zone} {color} {value})"
  params:
    - name: zone
      type: integer
      description: "0=Overall,1=Left,2=Right,3=Top,4=Bottom,5=TopLeft,6=TopRight,7=BottomLeft,8=BottomRight"
    - name: color
      type: string
      description: "0/R=Red,1/G=Green,2/B=Blue"
    - name: value
      type: integer
      description: "0-255 Overall, 0-127 other zones"
- id: brightness_uniformity_select
  label: Brightness Uniformity Select
  kind: action
  command: "(BUS{state})"
  params:
    - name: state
      type: integer
      description: 0=disable, 1=enable
- id: comprehensive_color_adjustment
  label: Comprehensive Color Adjustment
  kind: action
  command: "(CCA {gamut} {rx} {ry} {gx} {gy} {bx} {by} {wx} {wy})"
  params:
    - name: gamut
      type: integer
      description: "0=dup of 1,1=MaxDrives,2=ColorTemp,3=SDVideo,4=HDVideo,5-8=User1-4"
    - name: rx
      type: integer
    - name: ry
      type: integer
    - name: gx
      type: integer
    - name: gy
      type: integer
    - name: bx
      type: integer
    - name: by
      type: integer
    - name: wx
      type: integer
    - name: wy
      type: integer
- id: comprehensive_color_clear
  label: Comprehensive Color Clear
  kind: action
  command: "(CCC {source})"
  params:
    - name: source
      type: integer
      description: source from CCS list
- id: color_temperature
  label: Color Temperature
  kind: action
  command: "(CCI{kelvin})"
  params:
    - name: kelvin
      type: integer
      description: 3200-9300 (K)
- id: select_output_color
  label: Select Output Color
  kind: action
  command: "(CCS{value})"
  params:
    - name: value
      type: integer
      description: "0=MaxDrives,1=ColorTemp,2=SDVideo,3=HDVideo,4-7=User1-4"
- id: channel_select
  label: Channel Select
  kind: action
  command: "(CHA{channel})"
  params:
    - name: channel
      type: integer
      description: 1-50
- id: color_enable
  label: Color Enable
  kind: action
  command: "(CLE{color})"
  params:
    - name: color
      type: integer
      description: "1=Red,2=Green,3=Blue,4=Yellow,5=Cyan,6=Magenta,7=White,8=Black"
- id: clamping
  label: Clamping
  kind: action
  command: "(CLP{value})"
  params:
    - name: value
      type: integer
      description: "0=SyncTip,1=BackPorch,2=Tri-level"
- id: color
  label: Color
  kind: action
  command: "(CLR{value})"
  params:
    - name: value
      type: integer
      description: 0-1000 (percentage)
- id: contrast
  label: Contrast
  kind: action
  command: "(CON{value})"
  params:
    - name: value
      type: integer
      description: 0-1000 (percentage)
- id: chroma_luma_delay
  label: Chroma/Luma Delay
  kind: action
  command: "(CRM{value})"
  params:
    - name: value
      type: integer
      description: 20-50
- id: color_space
  label: Color Space
  kind: action
  command: "(CSP{value})"
  params:
    - name: value
      type: integer
      description: "0=RGB,1=YPbPr(SDTV),2=YPbPr(HDTV)"
- id: color_wheel_delay
  label: Color Wheel Delay
  kind: action
  command: "(CWD{value})"
  params:
    - name: value
      type: integer
      description: 0-1000 (single-chip only)
- id: second_color_wheel_delay
  label: 2nd Color Wheel Delay
  kind: action
  command: "(CWS{value})"
  params:
    - name: value
      type: integer
      description: 0-1000 (single-chip only)
- id: factory_defaults
  label: Factory Defaults
  kind: action
  command: "(DEF 111)"
  params: []
- id: delete_source
  label: Delete Source
  kind: action
  command: "(DLS{source})"
  params:
    - name: source
      type: integer
      description: "1-50 specific, 0=all unlocked"
- id: delay
  label: Delay (within RTE)
  kind: action
  command: "(DLY{ms})"
  params:
    - name: ms
      type: integer
      description: 1-65535 ms
- id: dark_interval
  label: Dark Interval
  kind: action
  command: "(DRK{value})"
  params:
    - name: value
      type: integer
- id: source_data
  label: Source Data
  kind: action
  command: "(DTA? S{source})"
  params:
    - name: source
      type: integer
      description: 1-50 source setup, 0=all, or T/P for preferences
- id: detail
  label: Detail
  kind: action
  command: "(DTL{value})"
  params:
    - name: value
      type: integer
- id: detail_threshold
  label: Detail Threshold
  kind: action
  command: "(DTT{value})"
  params:
    - name: value
      type: integer
- id: edge_blending_black_levels
  label: Edge Blending Black Levels
  kind: action
  command: "(EBB {index} {value})"
  params:
    - name: index
      type: integer
      description: "1-9 zones/edges, 10-13 widths, 14-16 RGB overall"
    - name: value
      type: integer
      description: "0-247 brightness, 0-255 width/color"
- id: edge_blending_black_levels_select
  label: Edge Blending Black Levels Select
  kind: action
  command: "(EBE{state})"
  params:
    - name: state
      type: integer
      description: 0=disable, 1=enable
- id: edge_blending
  label: Edge Blending
  kind: action
  command: "(EBL {edge} {char} {value})"
  params:
    - name: edge
      type: integer
      description: "0=Left,1=Right,2=Top,3=Bottom"
    - name: char
      type: integer
      description: "0=Width,1=Shape,2=Midpoint"
    - name: value
      type: integer
- id: edge_blending_overlap
  label: Edge Blending Overlap
  kind: action
  command: "(EBO{state})"
  params:
    - name: state
      type: integer
      description: 0=disable, 1=enable
- id: edge_blending_select
  label: Edge Blending Select
  kind: action
  command: "(EBS{state})"
  params:
    - name: state
      type: integer
      description: 0=disable, 1=enable (or list value with TWIST)
- id: error_message_enable
  label: Error Message Enable
  kind: action
  command: "(EME{value})"
  params:
    - name: value
      type: integer
      description: "0=Off,1=OnScreen,2=ASCII,3=Both,4=All except 3D sync errors"
- id: error_history
  label: Error History
  kind: query
  command: "(ERH? {index})"
  params:
    - name: index
      type: integer
      description: 0=last, 1=second last, etc.
- id: error_message
  label: Error Message
  kind: feedback
  command: "(ERR)"
  params: []
- id: fade_time
  label: Fade Time
  kind: action
  command: "(FAD{value})"
  params:
    - name: value
      type: integer
      description: "0-150; 150=1.5s, 1=10ms, 0=off"
- id: focus
  label: Focus
  kind: action
  command: "(FCS K{action})"
  params:
    - name: action
      type: integer
      description: "K0=stop, K2=+ve, K3=-ve (non-ILS); ILS: (FCS S{ch} {pos})"
- id: input_filter
  label: Input Filter
  kind: action
  command: "(FIL{value})"
  params:
    - name: value
      type: integer
      description: "0=Off,1=HDTV,2=SDTV,3=EDTV,4=Graphics/RGB"
- id: floating_inputs
  label: Floating Inputs
  kind: action
  command: "(FIN{state})"
  params:
    - name: state
      type: integer
      description: 0=disable, 1=enable (TIPM-09 only)
- id: frame_lock_enable
  label: Frame Lock Enable
  kind: action
  command: "(FLE{value})"
  params:
    - name: value
      type: integer
      description: "0=RateMatched,1=Locked,2=FreeRun"
- id: film_mode_threshold
  label: Film Mode Threshold
  kind: action
  command: "(FMT{value})"
  params:
    - name: value
      type: integer
      description: 0-255
- id: frame_delay
  label: Frame Delay
  kind: action
  command: "(FRD{value})"
  params:
    - name: value
      type: integer
- id: freeze_image
  label: Freeze Image
  kind: action
  command: "(FRZ{state})"
  params:
    - name: state
      type: integer
      description: 0=unfreeze, 1=freeze
- id: fan_sensor_enable
  label: Fan Sensor Enable
  kind: action
  command: "(FSE{state})"
  params:
    - name: state
      type: integer
      description: 0=disable, 1=enable
- id: for_your_information
  label: For Your Information
  kind: feedback
  command: "(FYI)"
  params: []
- id: gamma
  label: Gamma
  kind: action
  command: "(GAM{value})"
  params:
    - name: value
      type: integer
      description: 100-280 (=1.8-2.0 mapped)
- id: general_input_output
  label: General Input/Output
  kind: action
  command: "(GIO {pin} {state})"
  params:
    - name: pin
      type: integer
      description: GPIO pin 1-7
    - name: state
      type: string
      description: "H=High, L=Low; config: (GIO C{pin} {I|O})"
- id: green_blacklevel
  label: Green BlackLevel
  kind: action
  command: "(GNB{value})"
  params:
    - name: value
      type: integer
      description: 0-511
- id: green_drive
  label: Green Drive
  kind: action
  command: "(GND{value})"
  params:
    - name: value
      type: integer
      description: 0-511
- id: green_odd_gain
  label: Green Odd Gain
  kind: action
  command: "(GOG {bnc} {dvi})"
  params:
    - name: bnc
      type: integer
      description: 0-255
    - name: dvi
      type: integer
      description: 0-255
- id: green_odd_offset
  label: Green Odd Offset
  kind: action
  command: "(GOO {bnc} {dvi})"
  params:
    - name: bnc
      type: integer
      description: 0-255
    - name: dvi
      type: integer
      description: 0-255
- id: dhdm_configuration
  label: DHDM Configuration
  kind: action
  command: "(HDC {slot} {value})"
  params:
    - name: slot
      type: integer
      description: option slot 1 or 2
    - name: value
      type: integer
      description: "0=Auto,1=TwoSingle,2-3=RGB DualLink A/B,4-5=YCbCr 4:4:4 DualLink,6-7=YCbCr 4:2:2 DualLink"
- id: dhdm_loop_thru
  label: DHDM Loop Thru Setting
  kind: action
  command: "(HDL {slot} {value})"
  params:
    - name: slot
      type: integer
    - name: value
      type: integer
      description: 0-3 routing values per source
- id: lamp_history
  label: Lamp History
  kind: query
  command: "(HIS? {lamp})"
  params:
    - name: lamp
      type: integer
      description: 1 or 2
- id: help
  label: Help
  kind: query
  command: "(HLP?)"
  params: []
- id: horizontal_position
  label: Horizontal Position
  kind: action
  command: "(HOR{value})"
  params:
    - name: value
      type: integer
- id: intelligent_lens_system
  label: Intelligent Lens System
  kind: action
  command: "(ILS{state})"
  params:
    - name: state
      type: integer
      description: 0=disable, 1=enable
- id: in_menu
  label: In Menu
  kind: action
  command: "(INM S{channel} {state})"
  params:
    - name: channel
      type: integer
      description: 1-99
    - name: state
      type: integer
      description: 0=exclude, 1=include
- id: image_optimization
  label: Image Optimization
  kind: action
  command: "(IOP{value})"
  params:
    - name: value
      type: integer
      description: "0=BestQuality,1=SmoothSwitching,2=SeamlessSwitching"
- id: test_pattern_grey
  label: Test Pattern Grey
  kind: action
  command: "(ITG{value})"
  params:
    - name: value
      type: integer
- id: internal_test_pattern
  label: Internal Test Pattern
  kind: action
  command: "(ITP{value})"
  params:
    - name: value
      type: integer
      description: "0=UserImage,1-18 patterns (Grid, GreyScale, White, etc.)"
- id: keypad_enable
  label: Keypad Enable
  kind: action
  command: "(KEN {port} {protocol})"
  params:
    - name: port
      type: integer
      description: "0=Wired,1=IR Front,2=IR Rear"
    - name: protocol
      type: integer
      description: "0=Off,1=Any,10-16=Protocols A-G"
- id: key_code
  label: Key Code
  kind: action
  command: "(KEY {code})"
  params:
    - name: code
      type: integer
      description: key code; release = code+128
- id: keystone
  label: Keystone
  kind: action
  command: "(KST{value})"
  params:
    - name: value
      type: integer
      description: 14-50, default 32
- id: left_blanking
  label: Left Blanking
  kind: action
  command: "(LBL{value})"
  params:
    - name: value
      type: integer
      description: 0-1000
- id: lens_calibrate
  label: Lens Calibrate
  kind: action
  command: "(LCB {mode})"
  params:
    - name: mode
      type: integer
      description: "1=Reference,2=Motion,3=Both"
- id: lens_center
  label: Lens Center
  kind: action
  command: "(LCN)"
  params: []
- id: lamp_conditioning
  label: Lamp Conditioning
  kind: action
  command: "(LCO{state})"
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On (Philips UHP only)
- id: lens_direct_motion
  label: Lens Direct Motion
  kind: action
  command: "(LDM {motor} {position} {mode})"
  params:
    - name: motor
      type: integer
      description: 0=zoom (etc.)
    - name: position
      type: integer
    - name: mode
      type: integer
      description: 0=positional, 1=tracking
- id: level_detector
  label: Level Detector
  kind: action
  command: "(LDT{state})"
  params:
    - name: state
      type: integer
      description: 0=disable, 1=enable
- id: level_detector_value
  label: Level Detector Value
  kind: action
  command: "(LDV{value})"
  params:
    - name: value
      type: integer
      description: 1-1023
- id: lens_horizontal_offset
  label: Lens Horizontal Offset
  kind: action
  command: "(LHO K{action})"
  params:
    - name: action
      type: integer
      description: "K2=left, K3=right, K0=stop"
- id: liteloc_calibration
  label: LiteLOC Calibration
  kind: action
  command: "(LLC {mode} {gain} {offset})"
  params:
    - name: mode
      type: integer
      description: "0=default,1=calibrate/custom"
    - name: gain
      type: integer
      description: 0-32767
    - name: offset
      type: integer
      description: -32768 to 32767
- id: lamploc_module
  label: LampLOC Module
  kind: action
  command: "(LLM {cmd} {motor} {pos})"
  params:
    - name: cmd
      type: integer
      description: "0=Move,1=Calibrate,2=AutoAlign"
    - name: motor
      type: integer
      description: "0=x,1=y,2=z"
    - name: pos
      type: integer
- id: lamp_message_enable
  label: Lamp Message Enable
  kind: action
  command: "(LME{state})"
  params:
    - name: state
      type: integer
      description: 0=disable, 1=enable
- id: language
  label: Language
  kind: action
  command: "(LNG{value})"
  params:
    - name: value
      type: integer
      description: "1=English,2=French,3=Spanish,4=German,5=Italian"
- id: lamp_operation
  label: Lamp Operation
  kind: action
  command: "(LOP{value})"
  params:
    - name: value
      type: integer
      description: "1=Lamp1,2=Lamp2,3=Both"
- id: lamp_changed
  label: Lamp Changed
  kind: action
  command: "(LPC \"{serial}\")"
  params:
    - name: serial
      type: string
      description: 8 char max lamp serial number
- id: lamp_hours_of_use
  label: Lamp Hours of Use
  kind: query
  command: "(LPH? {lamp})"
  params:
    - name: lamp
      type: integer
      description: 1 or 2 (dual-lamp models)
- id: lamp_intensity
  label: Lamp Intensity
  kind: action
  command: "(LPI{value})"
  params:
    - name: value
      type: integer
      description: 0-999
- id: lamp_limit
  label: Lamp Limit
  kind: action
  command: "(LPL{hours})"
  params:
    - name: hours
      type: integer
      description: range varies with projector
- id: lamp_mode
  label: Lamp Mode
  kind: action
  command: "(LPM{value})"
  params:
    - name: value
      type: integer
      description: "0=MaxBrightness,1=Intensity(LiteLOC),2=Power"
- id: lamp_power
  label: Lamp Power
  kind: action
  command: "(LPP{watts})"
  params:
    - name: watts
      type: integer
- id: lamp_status
  label: Lamp Status
  kind: query
  command: "(LPS? {lamp})"
  params:
    - name: lamp
      type: integer
      description: 1 or 2
- id: lamp_size
  label: Lamp Size
  kind: action
  command: "(LPZ{watts})"
  params:
    - name: watts
      type: integer
      description: "2000/3000/4500/6000 (Roadie 25K only)"
- id: lamp_statistics
  label: Lamp Statistics
  kind: action
  command: "(LST {cmd} \"{sn}\" {p3} {p4})"
  params:
    - name: cmd
      type: integer
    - name: sn
      type: string
    - name: p3
      type: integer
    - name: p4
      type: integer
- id: menu_font
  label: Menu Font
  kind: action
  command: "(MFT{value})"
  params:
    - name: value
      type: integer
      description: 0=normal, 1=large
- id: source_memory_lock
  label: Source Memory Lock
  kind: action
  command: "(MLK S{source} {state})"
  params:
    - name: source
      type: integer
    - name: state
      type: integer
      description: 0=unlock, 1=lock
- id: menu_status
  label: Menu Status
  kind: action
  command: "(MNU {p1} {p2})"
  params:
    - name: p1
      type: integer
      description: "0=presentation,1=main,2=sub,3=auto-test-pattern"
    - name: p2
      type: integer
- id: motion_filter
  label: Motion Filter
  kind: action
  command: "(MOT{value})"
  params:
    - name: value
      type: integer
      description: "0=Auto,1=Still,2=Motion,3=Film"
- id: menu_shift_horizontal
  label: Menu Shift Horizontal
  kind: action
  command: "(MSH{value})"
  params:
    - name: value
      type: integer
      description: 0 to 466
- id: menu_location
  label: Menu Location
  kind: action
  command: "(MSP{value})"
  params:
    - name: value
      type: integer
      description: "0=4:3TopLeft ... 5=16:9 Inset 2"
- id: menu_shift_vertical
  label: Menu Shift Vertical
  kind: action
  command: "(MSV{value})"
  params:
    - name: value
      type: integer
      description: 0 to 350
- id: source_channel_name
  label: Source Channel Name
  kind: action
  command: "(NAM S{source} \"{name}\")"
  params:
    - name: source
      type: integer
    - name: name
      type: string
- id: noise_reduction
  label: Noise Reduction
  kind: action
  command: "(NRD{value})"
  params:
    - name: value
      type: integer
- id: number_select_image
  label: Number Select Image
  kind: action
  command: "(NSI{value})"
  params:
    - name: value
      type: integer
      description: "0=Never,1=PIP active,2=Always"
- id: network_routing
  label: Network Routing
  kind: action
  command: "(NTR{value})"
  params:
    - name: value
      type: integer
      description: "0=separate,1=RS422→RS232,2=Ethernet→RS232,3=all chained"
- id: on_screen_display
  label: On Screen Display
  kind: action
  command: "(OSD{state})"
  params:
    - name: state
      type: integer
      description: 0=disable, 1=enable
- id: output_format
  label: Output Format (Cine-IPM 2K)
  kind: action
  command: "(OTF{value})"
  params:
    - name: value
      type: integer
      description: "0=SingleLink,1=TwinLink"
- id: output_resolution
  label: Output Resolution (Cine-IPM 2K)
  kind: action
  command: "(OTR{value})"
  params:
    - name: value
      type: integer
      description: "0=HD2,1=SXGA,2=SXGAp,3=HD,4=DC2K,5=XGA,6=WUXGA"
- id: pip_aspect_ratio_preset
  label: PIP Aspect Ratio Preset
  kind: action
  command: "(PAP{value})"
  params:
    - name: value
      type: integer
      description: "0=Default,1=Anamorphic,2=Custom"
- id: pip_border_color
  label: PIP Border Color
  kind: action
  command: "(PBC{value})"
  params:
    - name: value
      type: integer
      description: "0=Black ... 15=White"
- id: pip_border_width
  label: PIP Border Width
  kind: action
  command: "(PBW{value})"
  params:
    - name: value
      type: integer
      description: 0-10
- id: peak_detector
  label: Peak Detector
  kind: action
  command: "(PDT{state})"
  params:
    - name: state
      type: integer
      description: 0=disable, 1=enable
- id: pip_horizontal_position
  label: PIP Horizontal Position
  kind: action
  command: "(PHP{value})"
  params:
    - name: value
      type: integer
      description: 0-100
- id: pip_horizontal_size
  label: PIP Horizontal Size
  kind: action
  command: "(PHS{value})"
  params:
    - name: value
      type: integer
      description: 0-100
- id: picture_in_picture
  label: Picture In Picture
  kind: action
  command: "(PIP{state})"
  params:
    - name: state
      type: integer
      description: 0=off, 1=on
- id: projector_hours_of_use
  label: Projector Hours of Use
  kind: query
  command: "(PJH?)"
  params: []
- id: parameter_lockout
  label: Parameter Lockout
  kind: action
  command: "(PLK \"{code}\" {state})"
  params:
    - name: code
      type: string
      description: 3-letter function code
    - name: state
      type: integer
      description: 0=unlock, 1=lock
- id: plug_display_modes
  label: Plug & Display Modes
  kind: action
  command: "(PND{value})"
  params:
    - name: value
      type: integer
      description: 0-12 (resolution presets)
- id: ping
  label: Ping
  kind: query
  command: "(PNG?)"
  params: []
- id: pip_position_preset
  label: PIP Position Preset
  kind: action
  command: "(PPP{value})"
  params:
    - name: value
      type: integer
      description: "0=TopRight,1=TopLeft,2=BottomLeft,3=BottomRight,4=Custom"
- id: pip_swap
  label: PIP Swap
  kind: action
  command: "(PPS)"
  params: []
- id: projector_rental_hours
  label: Projector Rental Hours
  kind: query
  command: "(PRH?)"
  params: []
- id: alternative_service_password
  label: Alternative Service Password
  kind: action
  command: "(PSW{value})"
  params:
    - name: value
      type: integer
      description: 0-32768
- id: pip_vertical_position
  label: PIP Vertical Position
  kind: action
  command: "(PVP{value})"
  params:
    - name: value
      type: integer
      description: 0-100
- id: password_enable
  label: Password Enable
  kind: action
  command: "(PWE{state})"
  params:
    - name: state
      type: integer
      description: 0=disable, 1=enable
- id: power
  label: Power
  kind: action
  command: "(PWR{state})"
  params:
    - name: state
      type: integer
      description: "0=Off,1=On,2=Boot(download only),3=NoLamp"
- id: active_pixel_wuxga
  label: Active Pixel WUXGA
  kind: action
  command: "(PWU{value})"
  params:
    - name: value
      type: integer
      description: "0=UXGA,1=WUXGA"
- id: pixel_phase
  label: Pixel Phase
  kind: action
  command: "(PXP{value})"
  params:
    - name: value
      type: integer
- id: pixel_tracking
  label: Pixel Tracking
  kind: action
  command: "(PXT{value})"
  params:
    - name: value
      type: integer
- id: right_blanking
  label: Right Blanking
  kind: action
  command: "(RBL{value})"
  params:
    - name: value
      type: integer
      description: 0-1000
- id: red_blacklevel
  label: Red BlackLevel
  kind: action
  command: "(RDB{value})"
  params:
    - name: value
      type: integer
      description: 0-511
- id: red_drive
  label: Red Drive
  kind: action
  command: "(RDD{value})"
  params:
    - name: value
      type: integer
      description: 0-511
- id: remote_commands
  label: Remote Commands
  kind: action
  command: "(REM {port} {config_or_data})"
  params:
    - name: port
      type: integer
      description: "1=RS232IN,2=RS232OUT,3=RS422DB9,4/5=RS422XLR"
    - name: config_or_data
      type: string
- id: red_odd_gain
  label: Red Odd Gain
  kind: action
  command: "(ROG {bnc} {dvi})"
  params:
    - name: bnc
      type: integer
      description: 0-255
    - name: dvi
      type: integer
      description: 0-255
- id: red_odd_pixel_offset
  label: Red Odd Pixel Offset
  kind: action
  command: "(ROO {bnc} {dvi})"
  params:
    - name: bnc
      type: integer
      description: 0-255
    - name: dvi
      type: integer
      description: 0-255
- id: real_time_events
  label: Real Time Events
  kind: action
  command: "(RTE {type} ...)"
  params:
    - name: type
      type: string
      description: "T=Timed,D=Delayed,G=GPIO,S=System,F=FuncKey,X=Delete"
- id: save_changes
  label: Save Changes
  kind: action
  command: "(SAV)"
  params: []
- id: slidebar_enable
  label: Slidebar Enable
  kind: action
  command: "(SBE{state})"
  params:
    - name: state
      type: integer
      description: 0=hide, 1=show
- id: source_dialog_enable
  label: Source Dialog Enable
  kind: action
  command: "(SDE{state})"
  params:
    - name: state
      type: integer
      description: 0=hide, 1=show
- id: shutter
  label: Shutter
  kind: action
  command: "(SHU{state})"
  params:
    - name: state
      type: integer
      description: 0=Open, 1=Close
- id: select_input
  label: Select Input
  kind: action
  command: "(SIN{input})"
  params:
    - name: input
      type: integer
      description: "1=BNC,2=DVI-I,3=Composite,4=SVideo,5/6=OptionSlot1/2,7/8=secondary"
- id: size
  label: Size
  kind: action
  command: "(SIZ{value})"
  params:
    - name: value
      type: integer
      description: 1000 = no resizing
- id: screen_orientation
  label: Screen Orientation
  kind: action
  command: "(SOR{value})"
  params:
    - name: value
      type: integer
      description: "0=Front,1=Rear,2=FrontInverted,3=RearInverted"
- id: splash_select
  label: Splash Select
  kind: action
  command: "(SPS{value})"
  params:
    - name: value
      type: integer
      description: "0=Off,1=Startup,2=Startup+NoSignal,3=Always"
- id: select_source
  label: Select Source
  kind: action
  command: "(SRC {source})"
  params:
    - name: source
      type: integer
- id: system_status
  label: System Status
  kind: query
  command: "(SST? {group} {detail})"
  params:
    - name: group
      type: integer
      description: "0=General,1=System,2=Signal,3=Operation,4=Versions"
    - name: detail
      type: integer
- id: video_standard
  label: Video Standard
  kind: action
  command: "(STD{value})"
  params:
    - name: value
      type: integer
      description: "0=PAL,1=NTSC,2=SECAM,3=NTSC4.43,4=PAL-M,5=PAL-NC,6=PAL-60,7=NTSC,8=Auto"
- id: size_presets_position
  label: Size Presets Position
  kind: action
  command: "(SZP{value})"
  params:
    - name: value
      type: integer
      description: "0=Default,1=NoResize,2=FullScreen,3=FullWidth,4=FullHeight,5=Anamorphic,6=Custom(RO)"
- id: top_blanking
  label: Top Blanking
  kind: action
  command: "(TBL{value})"
  params:
    - name: value
      type: integer
- id: activate_3d
  label: 3D Activate
  kind: action
  command: "(TDA{state})"
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On
- id: delay_3d
  label: 3D Delay
  kind: action
  command: "(TDD{value})"
  params:
    - name: value
      type: integer
- id: stereo_sync_input_3d
  label: 3D Stereo Sync Input
  kind: action
  command: "(TDI{value})"
  params:
    - name: value
      type: integer
      description: "0=A,1=AInv,2=B,3=BInv,4=Internal,5=InternalInv"
- id: stereo_sync_mode_3d
  label: 3D Stereo Sync Mode
  kind: action
  command: "(TDM{value})"
  params:
    - name: value
      type: integer
      description: "0=Off,1=Output,2=OutputInv,3=Input,4=InputInv"
- id: stereo_sync_output_3d
  label: 3D Stereo Sync Output
  kind: action
  command: "(TDO{value})"
  params:
    - name: value
      type: integer
      description: "0=Off,1=Emitter,2=EmitterInv,3=Next,4=NextInv"
- id: stereo_sync_select_3d
  label: 3D Stereo Sync Select
  kind: action
  command: "(TDS{value})"
  params:
    - name: value
      type: integer
      description: "0=A input,1=B input"
- id: time_date
  label: Time/Date
  kind: action
  command: "(TMD {yyyy} {mm} {dd} {hh} {min} {ss})"
  params:
    - name: yyyy
      type: integer
    - name: mm
      type: integer
    - name: dd
      type: integer
    - name: hh
      type: integer
    - name: min
      type: integer
    - name: ss
      type: integer
- id: tint
  label: Tint
  kind: action
  command: "(TNT{value})"
  params:
    - name: value
      type: integer
      description: 0-1000 (percentage)
- id: user_message
  label: User Message
  kind: action
  command: "(USR \"{text}\")"
  params:
    - name: text
      type: string
- id: video_black_level
  label: Video Black Level
  kind: action
  command: "(VBL{value})"
  params:
    - name: value
      type: integer
      description: "0=0 IRE,1=7.5 IRE"
- id: vertical_position
  label: Vertical Position
  kind: action
  command: "(VRT{value})"
  params:
    - name: value
      type: integer
- id: vertical_stretch
  label: Vertical Stretch
  kind: action
  command: "(VST{value})"
  params:
    - name: value
      type: integer
      description: 200-4000, 1000=neutral
- id: white_boost
  label: White Boost
  kind: action
  command: "(WBT{value})"
  params:
    - name: value
      type: integer
      description: 0=Off, 1-10 (single-chip only)
- id: warp_prefilter_h
  label: Warp Prefilter H
  kind: action
  command: "(WFH{value})"
  params:
    - name: value
      type: integer
- id: warp_prefilter_v
  label: Warp Prefilter V
  kind: action
  command: "(WFV{value})"
  params:
    - name: value
      type: integer
- id: keystone_corners_2d
  label: 2D Keystone Corners
  kind: action
  command: "(WKC I{index} {value})"
  params:
    - name: index
      type: integer
      description: "1-8 TL/TR/BL/BR x/y"
    - name: value
      type: integer
- id: warp_latency
  label: Warp Latency
  kind: action
  command: "(WPL{value})"
  params:
    - name: value
      type: integer
- id: warp_select
  label: Warp Select
  kind: action
  command: "(WPS{value})"
  params:
    - name: value
      type: integer
      description: "0=Disable,1=2DKeystone,2-4=User maps"
- id: warp_sharpness
  label: Warp Sharpness
  kind: action
  command: "(WSH{value})"
  params:
    - name: value
      type: integer
- id: xport_artnet_settings
  label: XPort ArtNET Settings
  kind: action
  command: "(XAR {mode} {subnet} {universe} {channel} \"{name}\" \"{desc}\")"
  params:
    - name: mode
      type: integer
      description: 0=Small, 1=Full
    - name: subnet
      type: integer
      description: 0-15
    - name: universe
      type: integer
      description: 0-15
    - name: channel
      type: integer
      description: 1-503
    - name: name
      type: string
    - name: desc
      type: string
- id: xport_ip
  label: XPort IP
  kind: action
  command: "(XIP {ip}:{port})"
  params:
    - name: ip
      type: string
      description: a.b.c.d, or 0.0.0.0 for DHCP
    - name: port
      type: integer
- id: zoom
  label: Zoom
  kind: action
  command: "(ZOM K{action})"
  params:
    - name: action
      type: integer
      description: "K0=stop, K2=+ve, K3=-ve; ILS: (ZOM S{ch} {pos})"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on, boot, cool_down, warm_up]
- id: shutter_state
  type: enum
  values: [open, closed]
- id: signal_state
  type: enum
  values: [good, missing, bad_sync]
- id: osd_state
  type: enum
  values: [off, on]
- id: lamp_status
  type: enum
  values: [good, fan_failure, failed_to_strike, unexpected_off, interlock_tripped]
- id: error
  type: object
  fields: [code, type, text]
- id: fyi_event
  type: object
  fields: [status_code, new_state, detail]
```

## Variables
```yaml
- id: contrast
  type: integer
  range: [0, 1000]
  unit: percentage
- id: brightness
  type: integer
  range: [0, 1000]
  unit: percentage
- id: color
  type: integer
  range: [0, 1000]
  unit: percentage
- id: tint
  type: integer
  range: [0, 1000]
  unit: percentage
- id: horizontal_position
  type: integer
- id: vertical_position
  type: integer
- id: lamp_limit_hours
  type: integer
- id: lamp_power_watts
  type: integer
```

## Events
```yaml
- id: fyi_power_change
  description: Power state changed
  status_code: 001
- id: fyi_address_change
  description: Projector address changed
  status_code: 002
- id: fyi_selection_change
  description: Projector selected/deselected
  status_code: 003
- id: fyi_baud_change
  description: Baud rate changed
  status_code: 004
- id: fyi_standby_change
  description: Standby state changed
  status_code: 005
- id: fyi_signal_change
  description: Signal status changed
  status_code: 006
- id: fyi_osd_change
  description: OSD state changed
  status_code: 007
- id: fyi_shutter_change
  description: Shutter open/closed
  status_code: 009
- id: fyi_input_change
  description: Input/channel changed
  status_code: 010
- id: fyi_picture_mute
  description: Picture mute on/off
  status_code: 011
- id: fyi_pip_change
  description: PIP on/off
  status_code: 012
- id: err_broadcast
  description: Unsolicited error broadcast
```

## Macros
```yaml
# UNRESOLVED: no explicit named multi-step macros described; RTE events
# can chain commands but are user-defined rather than factory macros.
```

## Safety
```yaml
confirmation_required_for:
  - "(DEF 111)"  # factory reset requires P1=111 confirmation constant
interlocks:
  - "DEF (factory reset) deletes all source setups and resets all parameters"
  - "FSE: 3-minute cooldown shutdown after critical fan failure"
  - "Power cool-down takes 5 minutes on DLV projectors"
# UNRESOLVED: full safety / interlock / power-on sequencing for HD
# series not detailed in this serial-commands reference; consult the
# projector User Manual per source §1 note.
```

## Notes
- ASCII message format: `(CODE DATA)` for set, `(CODE?)` for request, `(CODE!DATA)` for reply. Optional `$` ack prefix and `&` checksum prefix.
- Checksum = low byte of sum of ASCII values between `(` and the checksum field, e.g. `(&CON64 240)`.
- Source-setup prefix `S{#}` (e.g. `S5`) targets a specific channel 1-50; `S0` = all source setups.
- Replies pad numeric data to fixed length 3 or 5 chars with leading zeros.
- Network addressing: destination address goes between `(` and code (e.g. `(5pwr1)` = projector #5 on); reply broadcast = 65535.
- Flow control: Xon (0x11) / Xoff (0x13); projector sends Xoff when buffer near full — controller must stop within 10 chars.
- Keypad emulation `K0/K1/K2/K3` required for APR, FCS, LHO, LVO, ZOM set commands.
- Special text escape sequences for `\\`, `\"`, `\(`, `\)`, `\n`, `\b`, `\x` (ESC), `\e`, `\g`, `\s`.
- DEF includes `$` ack recommended to confirm completion.

<!-- UNRESOLVED: HD-series specific model enumeration (HD10K/HD12K/HD14K/HD18K "Roadster HD") not present in this TIPM serial-command reference — covers all listed projector families generically. -->
<!-- UNRESOLVED: Ethernet TCP port number not stated. -->
<!-- UNRESOLVED: Stop bits not stated. -->
<!-- UNRESOLVED: Firmware version compatibility not stated. -->
<!-- UNRESOLVED: Voltage / current / power specs not in this command reference. -->
````

## Provenance

```yaml
source_domains:
  - qed-productions.com
  - christiedigital.com
source_urls:
  - https://www.qed-productions.com/downloads/christie/serial-communications.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-102247-02-christie-lit-tech-ref-hs-series-api.pdf
  - http://www.qed-productions.com/downloads/christie/serial-communications.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-102271-04-christie-lit-tech-ref-gs-700-850-api.pdf
  - https://www.christiedigital.com/globalassets/resources/public/christie-hd-series-brochure.pdf
retrieved_at: 2026-08-09T13:58:43.128Z
last_checked_at: 2026-08-19T09:08:11.314Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:08:11.314Z
matched_actions: 182
action_count: 182
confidence: medium
summary: "All 182 spec actions map to a 3-letter wire code present in the source summary list with matching parameter ranges/enums; transport values (115200/8/N/xon_xoff) confirmed verbatim. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HD-series-specific product model numbers (HD10K/HD12K/etc.) not enumerated in this source; \"Christie HD (all)\" is the only HD reference. Specific TCP port number for Ethernet not stated. Stop bits not stated."
- "stop bits not stated in source"
- "Ethernet TCP port number not stated in source"
- "no explicit named multi-step macros described; RTE events"
- "full safety / interlock / power-on sequencing for HD"
- "HD-series specific model enumeration (HD10K/HD12K/HD14K/HD18K \"Roadster HD\") not present in this TIPM serial-command reference — covers all listed projector families generically."
- "Ethernet TCP port number not stated."
- "Stop bits not stated."
- "Firmware version compatibility not stated."
- "Voltage / current / power specs not in this command reference."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
