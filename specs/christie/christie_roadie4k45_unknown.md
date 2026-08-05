---
spec_id: admin/christie-roadie4k45
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie Roadie 4K Control Spec"
manufacturer: Christie
model_family: "Roadie 4K"
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - "Roadie 4K"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-101691-02-christie-lit-tech-ref-roadie-4k-serial-api.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-101689-02-christie-lit-tech-ref-roadie-4k-status-system.pdf
  - https://www.christiedigital.com/globalassets/resources/public/christie-dlp-xga-sxga-serial-communications.pdf
retrieved_at: 2026-05-14T15:03:16.341Z
last_checked_at: 2026-07-22T00:56:40.769Z
generated_at: 2026-07-22T00:56:40.769Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact applicability to Roadie4K45 model name not stated in source text. TCP port is queryable but no configured port value is stated. Serial framing beyond baud rate is not stated."
  - "TCP port value not stated; NET+PORT? queries configured port"
  - "data bits not stated"
  - "parity not stated"
  - "stop bits not stated"
  - "flow control not stated"
  - "no explicit multi-step control macros documented"
  - "serial framing, command termination, response timing, checksum behavior, exact TCP port, and complete status-group catalogue are not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:56:40.769Z
  matched_actions: 165
  action_count: 165
  confidence: medium
  summary: "All 165 spec actions map literally onto the Christie Serial Protocol command reference with matching shapes/ranges and full bidirectional coverage; transport values confirmed. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Christie Roadie 4K Control Spec

## Summary

Serial API control spec for Christie Roadie 4K projectors. Christie Serial Protocol supports RS-232, RS-422, and TCP communication over Ethernet, with addressing for daisy-chained projectors.

<!-- UNRESOLVED: exact applicability to Roadie4K45 model name not stated in source text. TCP port is queryable but no configured port value is stated. Serial framing beyond baud rate is not stated. -->

## Transport

```yaml
protocols:
  - serial
  - tcp
addressing:
  port: null  # UNRESOLVED: TCP port value not stated; NET+PORT? queries configured port
serial:
  baud_rate: 115200
  data_bits: null  # UNRESOLVED: data bits not stated
  parity: null  # UNRESOLVED: parity not stated
  stop_bits: null  # UNRESOLVED: stop bits not stated
  flow_control: null  # UNRESOLVED: flow control not stated
auth:
  type: credentials
  login_command: 'UID "{username}" "{password}"'
  access_modes:
    - no_access
    - login_required
    - free_access
```

## Traits

```yaml
- powerable  # inferred from PWR commands
- queryable  # inferred from query commands
- routable  # inferred from CHA and protocol-routing commands
- levelable  # inferred from image, lens, and lamp adjustment commands
```

## Actions

```yaml
- id: set_projector_address
  label: Set Projector Address
  kind: action
  command: "ADR {value}"
  params:
    - name: value
      type: integer
      range: [0, 999]
      description: Projector address; 65535 is reserved for broadcast

- id: query_projector_address
  label: Query Projector Address
  kind: query
  command: "ADR?"
  params: []

- id: set_ambient_light_correction
  label: Set Ambient Light Correction
  kind: action
  command: "ALC {value}"
  params:
    - name: value
      type: integer
      range: [-100, 100]

- id: set_auto_power_up
  label: Set Auto Power Up
  kind: action
  command: "APW {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: auto_setup
  label: Auto Setup
  kind: action
  command: "ASU"
  params: []

- id: set_rs232_in_baud_rate
  label: Set RS-232 In Baud Rate
  kind: action
  command: "BDR+PRTA {value}"
  params:
    - name: value
      type: integer
      enum: [1, 2, 3, 4, 5, 6]
      description: "1=2400, 2=9600, 3=19200, 4=38400, 5=57600, 6=115200"

- id: set_rs232_out_baud_rate
  label: Set RS-232 Out Baud Rate
  kind: action
  command: "BDR+PRTB {value}"
  params:
    - name: value
      type: integer
      enum: [1, 2, 3, 4, 5, 6]

- id: set_rs422_baud_rate
  label: Set RS-422 Baud Rate
  kind: action
  command: "BDR+PRTC {value}"
  params:
    - name: value
      type: integer
      enum: [1, 2, 3, 4, 5, 6]

- id: set_base_gamma_curve
  label: Set Base Gamma Curve
  kind: action
  command: "BGC {value}"
  params:
    - name: value
      type: integer
      enum: [0, 2, 3, 4]

- id: list_self_test_suites
  label: List Self-Test Suites
  kind: query
  command: "BST?L"
  params: []

- id: execute_self_test_suite
  label: Execute Self-Test Suite
  kind: action
  command: "BST {suite}"
  params:
    - name: suite
      type: integer
      enum: [0, 1, 2, 3, 4]

- id: list_self_tests
  label: List Self-Tests
  kind: query
  command: "BST+TEST?L"
  params: []

- id: execute_self_test
  label: Execute Self-Test
  kind: action
  command: "BST+TEST {index}"
  params:
    - name: index
      type: integer
      range: [0, 10]

- id: select_color_table
  label: Select Color Table
  kind: action
  command: "CCA+SLCT {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3]

- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  command: "CCA+CTMP {value}"
  params:
    - name: value
      type: integer
      range: [3200, 9300]

- id: set_custom_red_x
  label: Set Custom Red X Coordinate
  kind: action
  command: "CCA+RDCX {value}"
  params:
    - name: value
      type: integer

- id: set_custom_red_y
  label: Set Custom Red Y Coordinate
  kind: action
  command: "CCA+RDCY {value}"
  params:
    - name: value
      type: integer

- id: set_custom_green_x
  label: Set Custom Green X Coordinate
  kind: action
  command: "CCA+GNCX {value}"
  params:
    - name: value
      type: integer

- id: set_custom_green_y
  label: Set Custom Green Y Coordinate
  kind: action
  command: "CCA+GNCY {value}"
  params:
    - name: value
      type: integer

- id: set_custom_blue_x
  label: Set Custom Blue X Coordinate
  kind: action
  command: "CCA+BLCX {value}"
  params:
    - name: value
      type: integer

- id: set_custom_blue_y
  label: Set Custom Blue Y Coordinate
  kind: action
  command: "CCA+BLCY {value}"
  params:
    - name: value
      type: integer

- id: set_custom_white_x
  label: Set Custom White X Coordinate
  kind: action
  command: "CCA+WHCX {value}"
  params:
    - name: value
      type: integer

- id: set_custom_white_y
  label: Set Custom White Y Coordinate
  kind: action
  command: "CCA+WHCY {value}"
  params:
    - name: value
      type: integer

- id: set_green_of_red
  label: Set Green of Red
  kind: action
  command: "CCA+GOFR {value}"
  params:
    - name: value
      type: integer
      range: [-1000, 1000]

- id: set_blue_of_red
  label: Set Blue of Red
  kind: action
  command: "CCA+BOFR {value}"
  params:
    - name: value
      type: integer
      range: [-1000, 1000]

- id: set_red_of_green
  label: Set Red of Green
  kind: action
  command: "CCA+ROFG {value}"
  params:
    - name: value
      type: integer
      range: [-1000, 1000]

- id: set_blue_of_green
  label: Set Blue of Green
  kind: action
  command: "CCA+BOFG {value}"
  params:
    - name: value
      type: integer
      range: [-1000, 1000]

- id: set_red_of_blue
  label: Set Red of Blue
  kind: action
  command: "CCA+ROFB {value}"
  params:
    - name: value
      type: integer
      range: [-1000, 1000]

- id: set_green_of_blue
  label: Set Green of Blue
  kind: action
  command: "CCA+GOFB {value}"
  params:
    - name: value
      type: integer
      range: [-1000, 1000]

- id: set_red_of_red
  label: Set Red of Red
  kind: action
  command: "CCA+ROFR {value}"
  params:
    - name: value
      type: integer
      range: [0, 1000]

- id: set_green_of_green
  label: Set Green of Green
  kind: action
  command: "CCA+GOFG {value}"
  params:
    - name: value
      type: integer
      range: [0, 1000]

- id: set_blue_of_blue
  label: Set Blue of Blue
  kind: action
  command: "CCA+BOFB {value}"
  params:
    - name: value
      type: integer
      range: [0, 1000]

- id: set_red_of_white
  label: Set Red of White
  kind: action
  command: "CCA+ROFW {value}"
  params:
    - name: value
      type: integer
      range: [0, 1000]

- id: set_green_of_white
  label: Set Green of White
  kind: action
  command: "CCA+GOFW {value}"
  params:
    - name: value
      type: integer
      range: [0, 1000]

- id: set_blue_of_white
  label: Set Blue of White
  kind: action
  command: "CCA+BOFW {value}"
  params:
    - name: value
      type: integer
      range: [0, 1000]

- id: set_native_red_x
  label: Set Native Red X Coordinate
  kind: action
  command: "CCA+RDPX {value}"
  params:
    - name: value
      type: integer

- id: set_native_red_y
  label: Set Native Red Y Coordinate
  kind: action
  command: "CCA+RDPY {value}"
  params:
    - name: value
      type: integer

- id: set_native_green_x
  label: Set Native Green X Coordinate
  kind: action
  command: "CCA+GNPX {value}"
  params:
    - name: value
      type: integer

- id: set_native_green_y
  label: Set Native Green Y Coordinate
  kind: action
  command: "CCA+GNPY {value}"
  params:
    - name: value
      type: integer

- id: set_native_blue_x
  label: Set Native Blue X Coordinate
  kind: action
  command: "CCA+BLPX {value}"
  params:
    - name: value
      type: integer

- id: set_native_blue_y
  label: Set Native Blue Y Coordinate
  kind: action
  command: "CCA+BLPY {value}"
  params:
    - name: value
      type: integer

- id: set_native_white_x
  label: Set Native White X Coordinate
  kind: action
  command: "CCA+WHPX {value}"
  params:
    - name: value
      type: integer

- id: set_native_white_y
  label: Set Native White Y Coordinate
  kind: action
  command: "CCA+WHPY {value}"
  params:
    - name: value
      type: integer

- id: copy_color_table
  label: Copy Color Table
  kind: action
  command: "CCA+COPY {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]

- id: save_color_primaries
  label: Save Color Primaries
  kind: action
  command: "CCA+SAVE"
  params: []

- id: reset_color_primaries
  label: Reset Color Primaries
  kind: action
  command: "CCA+RSET"
  params: []

- id: list_channels
  label: List Channels
  kind: query
  command: "CHA?L"
  params: []

- id: select_channel
  label: Select Channel
  kind: action
  command: "CHA {channel}"
  params:
    - name: channel
      type: integer
      enum: [1, 2, 3, 11, 12, 21, 22, 23, 24]

- id: enable_color
  label: Enable Color
  kind: action
  command: "CLE {color}"
  params:
    - name: color
      type: integer
      enum: [0, 1, 2, 3, 4, 5, 6]

- id: select_color_space
  label: Select Color Space
  kind: action
  command: "CSP {color_space}"
  params:
    - name: color_space
      type: integer
      enum: [0, 1, 2, 3, 4]

- id: factory_defaults
  label: Restore Factory Defaults
  kind: action
  command: "DEF 111"
  params: []

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "DTL {value}"
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: list_black_level_blends
  label: List Black Level Blends
  kind: query
  command: "EBB+SLCT?L"
  params: []

- id: select_black_level_blend
  label: Select Black Level Blend
  kind: action
  command: "EBB+SLCT {value}"
  params:
    - name: value
      type: integer
      range: [0, 4]

- id: list_edge_blends
  label: List Edge Blends
  kind: query
  command: "EBL+SLCT?L"
  params: []

- id: select_edge_blend
  label: Select Edge Blend
  kind: action
  command: "EBL+SLCT {value}"
  params:
    - name: value
      type: integer
      range: [0, 4]

- id: set_edid_frame_rate
  label: Set EDID Frame Rate
  kind: action
  command: "EDO {rate}"
  params:
    - name: rate
      type: integer
      enum: [24, 25, 30, 48, 50, 60]

- id: set_edid_column_mode
  label: Set EDID Column Mode
  kind: action
  command: "EDO+COLM {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]

- id: set_asynchronous_messages
  label: Enable Asynchronous Serial Messages
  kind: action
  command: "EME {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: select_engine_test_pattern
  label: Select Engine Test Pattern
  kind: action
  command: "ETP {index}"
  params:
    - name: index
      type: integer
      description: Engine test-pattern index documented by projector

- id: query_all_events
  label: Query All Events
  kind: query
  command: "EVT"
  params: []

- id: query_recent_events
  label: Query Recent Events
  kind: query
  command: "EVT {max}"
  params:
    - name: max
      type: integer
      description: Maximum number of events

- id: query_events_since
  label: Query Events Since Timestamp
  kind: query
  command: 'EVT "{start_timestamp}"'
  params:
    - name: start_timestamp
      type: string
      description: "yyyy-mm-dd hh:mm:ss"

- id: query_events_between
  label: Query Events Between Timestamps
  kind: query
  command: 'EVT "{start_timestamp}" "{end_timestamp}"'
  params:
    - name: start_timestamp
      type: string
    - name: end_timestamp
      type: string

- id: set_lens_focus
  label: Set Lens Focus Position
  kind: action
  command: "FCS {position}"
  params:
    - name: position
      type: integer
      description: Range returned by FCS?m

- id: query_lens_focus_range
  label: Query Lens Focus Range
  kind: query
  command: "FCS?m"
  params: []

- id: set_frame_delay
  label: Set Frame Delay
  kind: action
  command: "FRD {delay}"
  params:
    - name: delay
      type: integer
      range: [1000, 3000]
      description: Thousandths of a frame

- id: query_actual_frame_delay
  label: Query Actual Frame Delay
  kind: query
  command: "FRD+STAT?"
  params: []

- id: query_frame_delay_time
  label: Query Frame Delay Time
  kind: query
  command: "FRD+TIME?"
  params: []

- id: set_image_freeze
  label: Set Image Freeze
  kind: action
  command: "FRZ {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: set_gamma_exponent
  label: Set Gamma Exponent
  kind: action
  command: "GAM {exponent}"
  params:
    - name: exponent
      type: integer
      range: [1000, 3000]

- id: set_gamma_slope
  label: Set Gamma Slope
  kind: action
  command: "GAM+SLOP {value}"
  params:
    - name: value
      type: integer
      range: [1, 100]

- id: set_gamma_black_adjustment
  label: Set Gamma Black Adjustment
  kind: action
  command: "GAM+BLKA {value}"
  params:
    - name: value
      type: integer
      range: [1000, 5000]

- id: query_lamp_history
  label: Query Lamp History
  kind: query
  command: "HIS?"
  params: []

- id: select_internal_test_pattern
  label: Select Internal Test Pattern
  kind: action
  command: "ITP {index}"
  params:
    - name: index
      type: integer
      range: [0, 20]

- id: set_test_pattern_frequency
  label: Set Test Pattern Frequency
  kind: action
  command: "ITP+FREQ {value}"
  params:
    - name: value
      type: integer
      range: [24, 60]

- id: set_test_pattern_grey
  label: Set Test Pattern Grey Level
  kind: action
  command: "ITP+GREY {value}"
  params:
    - name: value
      type: integer
      range: [0, 4095]

- id: set_test_pattern_ramp_motion
  label: Set Test Pattern Ramp Motion
  kind: action
  command: "ITP+RMPM {speed}"
  params:
    - name: speed
      type: integer
      range: [0, 100]

- id: set_test_pattern_ramp_slope
  label: Set Test Pattern Ramp Slope
  kind: action
  command: "ITP+RMPS {slope}"
  params:
    - name: slope
      type: integer
      range: [1, 5]

- id: set_test_pattern_ramp_level
  label: Set Test Pattern Ramp Level
  kind: action
  command: "ITP+RMPL {value}"
  params:
    - name: value
      type: integer
      range: [0, 4095]

- id: set_test_pattern_grid_pitch
  label: Set Test Pattern Grid Pitch
  kind: action
  command: "ITP+GRDP {pitch}"
  params:
    - name: pitch
      type: integer
      range: [2, 127]

- id: set_test_pattern_grid_color
  label: Set Test Pattern Grid Color Mode
  kind: action
  command: "ITP+GRDC {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: set_test_pattern_grid_motion
  label: Set Test Pattern Grid Motion
  kind: action
  command: "ITP+GRDM {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: calibrate_lens_motors
  label: Calibrate Lens Motors
  kind: action
  command: "LCB 1"
  params: []

- id: home_lens_motors
  label: Home Lens Motors
  kind: action
  command: "LCB+HOME"
  params: []

- id: set_lens_horizontal_position
  label: Set Lens Horizontal Position
  kind: action
  command: "LHO {position}"
  params:
    - name: position
      type: integer
      description: Range returned by LHO?m

- id: query_lens_horizontal_range
  label: Query Lens Horizontal Range
  kind: query
  command: "LHO?m"
  params: []

- id: set_lamploc_auto
  label: Start or Cancel LampLOC
  kind: action
  command: "LLM+AUTO {start}"
  params:
    - name: start
      type: integer
      enum: [0, 1]

- id: query_lamploc_auto
  label: Query LampLOC State
  kind: query
  command: "LLM+AUTO?"
  params: []

- id: calibrate_lamploc_motors
  label: Calibrate LampLOC Motors
  kind: action
  command: "LLM+CALI 1"
  params: []

- id: query_lamploc_light
  label: Query LampLOC Light Sensor
  kind: query
  command: "LLM+LGHT?"
  params: []

- id: move_lamploc_x
  label: Run LampLOC X Motor
  kind: action
  command: "LLM+MOVX {value}"
  params:
    - name: value
      type: integer
      enum: [-1, 0, 1]

- id: move_lamploc_y
  label: Run LampLOC Y Motor
  kind: action
  command: "LLM+MOVY {value}"
  params:
    - name: value
      type: integer
      enum: [-1, 0, 1]

- id: move_lamploc_z
  label: Run LampLOC Z Motor
  kind: action
  command: "LLM+MOVZ {value}"
  params:
    - name: value
      type: integer
      enum: [-1, 0, 1]

- id: position_lamploc_x
  label: Position LampLOC X Motor
  kind: action
  command: "LLM+MTRX {value}"
  params:
    - name: value
      type: integer
      range: [-250, 250]

- id: position_lamploc_y
  label: Position LampLOC Y Motor
  kind: action
  command: "LLM+MTRY {value}"
  params:
    - name: value
      type: integer
      range: [-250, 250]

- id: position_lamploc_z
  label: Position LampLOC Z Motor
  kind: action
  command: "LLM+MTRZ {value}"
  params:
    - name: value
      type: integer
      range: [-175, 175]

- id: step_lamploc_x
  label: Step LampLOC X Motor
  kind: action
  command: "LLM+RELX {steps}"
  params:
    - name: steps
      type: integer

- id: step_lamploc_y
  label: Step LampLOC Y Motor
  kind: action
  command: "LLM+RELY {steps}"
  params:
    - name: steps
      type: integer

- id: step_lamploc_z
  label: Step LampLOC Z Motor
  kind: action
  command: "LLM+RELZ {steps}"
  params:
    - name: steps
      type: integer

- id: query_lamploc_progress
  label: Query LampLOC Progress
  kind: query
  command: "LLM+STAT?"
  params: []

- id: set_lens_position
  label: Set All Lens Axes
  kind: action
  command: "LMV {horizontal} {vertical} {zoom} {focus}"
  params:
    - name: horizontal
      type: integer
    - name: vertical
      type: integer
    - name: zoom
      type: integer
    - name: focus
      type: integer

- id: step_lens_horizontal
  label: Step Lens Horizontal Motor
  kind: action
  command: "LMV+HSTP {steps}"
  params:
    - name: steps
      type: integer

- id: step_lens_vertical
  label: Step Lens Vertical Motor
  kind: action
  command: "LMV+VSTP {steps}"
  params:
    - name: steps
      type: integer

- id: step_lens_focus
  label: Step Lens Focus Motor
  kind: action
  command: "LMV+FSTP {steps}"
  params:
    - name: steps
      type: integer

- id: step_lens_zoom
  label: Step Lens Zoom Motor
  kind: action
  command: "LMV+ZSTP {steps}"
  params:
    - name: steps
      type: integer

- id: run_lens_horizontal
  label: Run Lens Horizontal Motor
  kind: action
  command: "LMV+HRUN {value}"
  params:
    - name: value
      type: integer
      enum: [-1, 0, 1]

- id: run_lens_vertical
  label: Run Lens Vertical Motor
  kind: action
  command: "LMV+VRUN {value}"
  params:
    - name: value
      type: integer
      enum: [-1, 0, 1]

- id: run_lens_focus
  label: Run Lens Focus Motor
  kind: action
  command: "LMV+FRUN {value}"
  params:
    - name: value
      type: integer
      enum: [-1, 0, 1]

- id: run_lens_zoom
  label: Run Lens Zoom Motor
  kind: action
  command: "LMV+ZRUN {value}"
  params:
    - name: value
      type: integer
      enum: [-1, 0, 1]

- id: set_video_loop_out
  label: Set Video Loop Out
  kind: action
  command: "LOE {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: register_lamp_change
  label: Register Lamp Change
  kind: action
  command: 'LPC {lamp_type} "{serial_number}" {hours}'
  params:
    - name: lamp_type
      type: integer
    - name: serial_number
      type: string
    - name: hours
      type: integer
      required: false

- id: list_lamp_types
  label: List Lamp Types
  kind: query
  command: "LPC+TYPE?L"
  params: []

- id: set_lamp_life
  label: Set Lamp Life Warning
  kind: action
  command: "LPL {hours}"
  params:
    - name: hours
      type: integer
      description: Positive hours; zero disables check

- id: set_lamp_mode
  label: Set Lamp Mode
  kind: action
  command: "LPM {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: set_lamp_power
  label: Set Lamp Power
  kind: action
  command: "LPP {power}"
  params:
    - name: power
      type: integer
      description: Watts; valid range depends on installed lamp

- id: query_lamp_power_range
  label: Query Lamp Power Range
  kind: query
  command: "LPP?m"
  params: []

- id: set_lens_vertical_position
  label: Set Lens Vertical Position
  kind: action
  command: "LVO {position}"
  params:
    - name: position
      type: integer
      description: Range returned by LVO?m

- id: query_lens_vertical_range
  label: Query Lens Vertical Range
  kind: query
  command: "LVO?m"
  params: []

- id: set_network
  label: Set Static Network Configuration
  kind: action
  command: 'NET "{ip}" "{subnet}" "{gateway}"'
  params:
    - name: ip
      type: string
    - name: subnet
      type: string
    - name: gateway
      type: string
      required: false

- id: set_device_group
  label: Set Device Group
  kind: action
  command: "NET+DGRP {group}"
  params:
    - name: group
      type: string

- id: enable_dhcp
  label: Enable DHCP
  kind: action
  command: "NET+DHCP 1"
  params: []

- id: query_ip_address
  label: Query IP Address
  kind: query
  command: "NET+ETH0?"
  params: []

- id: query_gateway
  label: Query Gateway
  kind: query
  command: "NET+GATE?"
  params: []

- id: set_hostname
  label: Set Hostname
  kind: action
  command: "NET+HOST {name}"
  params:
    - name: name
      type: string

- id: query_mac_address
  label: Query MAC Address
  kind: query
  command: "NET+MAC0?"
  params: []

- id: query_tcp_port
  label: Query Serial Protocol TCP Port
  kind: query
  command: "NET+PORT?"
  params: []

- id: query_netmask
  label: Query Netmask
  kind: query
  command: "NET+SUB0?"
  params: []

- id: set_protocol_routing
  label: Set Protocol Routing
  kind: action
  command: "NTR {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3]

- id: query_horizontal_resolution
  label: Query Maximum Horizontal Resolution
  kind: query
  command: "OTR+HRES?"
  params: []

- id: query_vertical_resolution
  label: Query Maximum Vertical Resolution
  kind: query
  command: "OTR+VRES?"
  params: []

- id: ping
  label: Query Projector Information
  kind: query
  command: "PNG?"
  params: []

- id: list_profiles
  label: List Profiles
  kind: query
  command: "PRO?L"
  params: []

- id: select_profile
  label: Select Profile
  kind: action
  command: "PRO {value}"
  params:
    - name: value
      type: integer
      range: [0, 4]

- id: set_power
  label: Set Projector Power
  kind: action
  command: "PWR {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: set_electronics_override
  label: Set Video Electronics Standby Override
  kind: action
  command: "PWR+ELEC {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: query_power
  label: Query Projector Power
  kind: query
  command: "PWR?"
  params: []

- id: set_rs232_in_access
  label: Set RS-232 In Access Level
  kind: action
  command: "RAL+PRTA {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]

- id: set_rs232_out_access
  label: Set RS-232 Out Access Level
  kind: action
  command: "RAL+PRTB {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]

- id: set_rs422_access
  label: Set RS-422 Access Level
  kind: action
  command: "RAL+PRTC {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]

- id: set_usb_access
  label: Set USB Access Level
  kind: action
  command: "RAL+PUSB {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]

- id: set_shutter
  label: Set Shutter
  kind: action
  command: "SHU {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: query_shutter
  label: Query Shutter
  kind: query
  command: "SHU?"
  params: []

- id: set_snmp_trap_ip_1
  label: Set SNMP Trap Address 1
  kind: action
  command: "SNM+TIP1 {ip_address}"
  params:
    - name: ip_address
      type: string

- id: set_snmp_trap_ip_2
  label: Set SNMP Trap Address 2
  kind: action
  command: "SNM+TIP2 {ip_address}"
  params:
    - name: ip_address
      type: string

- id: set_snmp_trap_ip_3
  label: Set SNMP Trap Address 3
  kind: action
  command: "SNM+TIP3 {ip_address}"
  params:
    - name: ip_address
      type: string

- id: set_snmp_password
  label: Set SNMP Password
  kind: action
  command: "SNM+READ {password}"
  params:
    - name: password
      type: string

- id: set_snmp_lamp_trap
  label: Set SNMP Lamp State Trap
  kind: action
  command: "SNM+LAMP {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: set_snmp_life_trap
  label: Set SNMP Lamp Life Trap
  kind: action
  command: "SNM+LIFE {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: set_snmp_power_trap
  label: Set SNMP Power Trap
  kind: action
  command: "SNM+POWR {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: set_snmp_fan_stall_trap
  label: Set SNMP Fan Stall Trap
  kind: action
  command: "SNM+STAL {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: set_snmp_thermal_trap
  label: Set SNMP Thermal Trap
  kind: action
  command: "SNM+THRM {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: set_screen_orientation
  label: Set Screen Orientation
  kind: action
  command: "SOR {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3]

- id: query_all_status
  label: Query All Status Items
  kind: query
  command: "SST?"
  params: []

- id: query_status_group
  label: Query Status Group
  kind: query
  command: "SST+{group}?"
  params:
    - name: group
      type: string
      description: Four-letter status group identifier

- id: query_status_item
  label: Query Status Item
  kind: query
  command: "SST+{group}?{index}"
  params:
    - name: group
      type: string
    - name: index
      type: integer

- id: set_aspect_ratio
  label: Set Display Aspect Ratio
  kind: action
  command: "SZP {value}"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4]

- id: set_time
  label: Set Local Time
  kind: action
  command: 'TMD+TIME "{time}"'
  params:
    - name: time
      type: string
      description: "hh:mm:ss"

- id: query_time
  label: Query Local Time
  kind: query
  command: "TMD+TIME?"
  params: []

- id: set_date
  label: Set Local Date
  kind: action
  command: 'TMD+DATE "{date}"'
  params:
    - name: date
      type: string
      description: "YYYY/MM/DD"

- id: login
  label: Log In
  kind: action
  command: 'UID "{username}" "{password}"'
  params:
    - name: username
      type: string
    - name: password
      type: string

- id: list_warp_maps
  label: List Warp Maps
  kind: query
  command: "WRP+SLCT?"
  params: []

- id: select_warp_map
  label: Select Warp Map
  kind: action
  command: "WRP+SLCT {value}"
  params:
    - name: value
      type: integer
      range: [0, 4]

- id: set_lens_zoom
  label: Set Lens Zoom Position
  kind: action
  command: "ZOM {position}"
  params:
    - name: position
      type: integer
      description: Range returned by ZOM?m

- id: query_lens_zoom_range
  label: Query Lens Zoom Range
  kind: query
  command: "ZOM?m"
  params: []
```

## Feedbacks

```yaml
- id: projector_address
  type: integer
  response: "ADR!{value}"

- id: self_test_suite_list
  type: list
  response: 'BST!L{sequence} {available} {index} "{name}"'
  terminator: 'BST!L111 "--END--"'

- id: self_test_result
  type: structured
  response: 'BST!{index} "{result}" "{details}"'

- id: channel_list
  type: list
  response: 'CHA!L{sequence} {available} {index} "{name}"'
  terminator: 'CHA!L111 "--END--"'

- id: event_log
  type: list
  response: 'EVT!{index} "{timestamp}" "{state}" "{description}"'
  terminator: 'EVT!"--END--"'

- id: actual_frame_delay
  type: integer
  response: "FRD+STAT!{value}"

- id: frame_delay_milliseconds
  type: string
  response: 'FRD+TIME!"{value}"'

- id: lamp_history
  type: list
  response: "HIS!{entry_number} {install_date} {serial_number} {lamp_type} {statistics}"

- id: lamp_type_list
  type: list
  response: 'LPC+TYPE!L{sequence} {available} {index} "{name}"'
  terminator: 'LPC+TYPE!L111 "--END--"'

- id: maximum_horizontal_resolution
  type: integer
  response_value: 4096

- id: maximum_vertical_resolution
  type: integer
  response_value: 2160

- id: projector_information
  type: structured
  response_fields:
    - type
    - software_major
    - software_minor
    - software_build

- id: power_state
  type: enum
  response: "PWR!{value}"
  values:
    "000": standby
    "011": warming_up
    "001": "on"
    "010": cooling_down

- id: shutter_state
  type: enum
  values:
    0: open
    1: closed

- id: status_item
  type: structured
  response: 'SST+{group}!{index} {state} "{value}" "{description}"'
  state_values:
    "000": ok
    "001": warning
    "002": error

- id: zoom_range
  type: range
  response: "ZOM!M{minimum} {maximum}"
```

## Variables

```yaml
- id: projector_address
  type: integer
  range: [0, 999]
  persistent: true

- id: asynchronous_messages_enabled
  type: boolean
  values:
    0: false
    1: true

- id: power_state
  type: enum
  values:
    "000": standby
    "011": warming_up
    "001": "on"
    "010": cooling_down

- id: shutter_state
  type: enum
  values:
    0: open
    1: closed

- id: status_condition
  type: enum
  values:
    "000": ok
    "001": warning
    "002": error
```

## Events

```yaml
- id: card_detected
  message: '65535 00000 FYI01901"Card {slot} detected"'
  description: Card detected while video electronics are on

- id: card_removed
  message: '65535 00000 FYI01901"Card {slot} removed"'
  description: Card removed while video electronics are on

- id: date_changed
  message: '65535 00000 FYI00916 "Setting Date to {date}"'

- id: time_changed
  message: '65535 00000 FYI00916 "Setting Time to {time}"'

- id: factory_defaults_completed
  message: '65535 00000 FYI00919 "All settings have been restored to their factory defaults. Reboot is required to take effect."'

- id: network_configuration_changed
  message: '65535 00000 FYI00915"Configured network: IP:{ip} Mask:{mask} Gateway:{gateway}"'

- id: status_ok
  message: '65535 00000 FYI00000 "(SST+{group}?{index}) {description} = {value}"'

- id: status_warning
  message: '65535 00000 ERR00000"System Warning: (SST+{group}?{index}) {description} = {value}"'

- id: status_error
  message: '65535 00000 ERR00000 "System Error: (SST+{group}?{index}) {description} = {value}"'
```

## Macros

```yaml
# UNRESOLVED: no explicit multi-step control macros documented
```

## Safety

```yaml
confirmation_required_for:
  - factory_defaults
  - set_lamp_power
  - register_lamp_change
  - calibrate_lens_motors
  - calibrate_lamploc_motors
interlocks:
  - action: execute_self_test_suite
    requirement: Do not execute while projector is warming up
  - action: execute_self_test
    requirement: Do not execute while projector is warming up
  - action: factory_defaults
    requirement: Projector must be in standby or cooling down
  - action: factory_defaults
    requirement: AC cycle projector after command for changes to take effect
  - action: set_lamp_power
    requirement: Projector must be in Constant Power mode
```

## Notes

Default baud rate for each serial port is 115200. Serial ports can require login, allow free operator access, or deny access. `NET+PORT?` returns Christie Serial Protocol TCP port, whose configurable range is 1024–49151 with exceptions; port 3003 is reserved and cannot be used. RS232-IN and RS232-OUT are always joined. Shutter query may be inaccurate when shutter was moved manually.

<!-- UNRESOLVED: serial framing, command termination, response timing, checksum behavior, exact TCP port, and complete status-group catalogue are not stated in source. -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-101691-02-christie-lit-tech-ref-roadie-4k-serial-api.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-101689-02-christie-lit-tech-ref-roadie-4k-status-system.pdf
  - https://www.christiedigital.com/globalassets/resources/public/christie-dlp-xga-sxga-serial-communications.pdf
retrieved_at: 2026-05-14T15:03:16.341Z
last_checked_at: 2026-07-22T00:56:40.769Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:56:40.769Z
matched_actions: 165
action_count: 165
confidence: medium
summary: "All 165 spec actions map literally onto the Christie Serial Protocol command reference with matching shapes/ranges and full bidirectional coverage; transport values confirmed. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact applicability to Roadie4K45 model name not stated in source text. TCP port is queryable but no configured port value is stated. Serial framing beyond baud rate is not stated."
- "TCP port value not stated; NET+PORT? queries configured port"
- "data bits not stated"
- "parity not stated"
- "stop bits not stated"
- "flow control not stated"
- "no explicit multi-step control macros documented"
- "serial framing, command termination, response timing, checksum behavior, exact TCP port, and complete status-group catalogue are not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
