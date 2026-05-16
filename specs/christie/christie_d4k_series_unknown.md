---
spec_id: admin/christie-d4k-60
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie D4K-60 Control Spec"
manufacturer: Christie
model_family: D4K-60
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - D4K-60
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-102207-08-christie-lit-man-ref-spyder-commands.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-05-04T15:10:58.851Z
last_checked_at: 2026-05-14T21:45:09.230Z
generated_at: 2026-05-14T21:45:09.230Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - PNG
  - UID
verification:
  verdict: verified
  checked_at: 2026-05-14T21:45:09.230Z
  matched_actions: 91
  action_count: 91
  confidence: high
  summary: "All 91 spec actions matched to source commands; transport parameters verified; only 2 extra commands (PNG, UID) not in spec, well below the 5-command threshold for short verdict."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Christie D4K-60 Control Spec

## Summary
Christie D4K-60 professional projector with serial API over RS-232/RS-422 and Christie Serial Protocol over Ethernet (TCP). Supports daisy-chained multi-projector control via ADR addressing. Power, lens, lamp, color, and geometry control documented.

<!-- UNRESOLVED: TCP port not confirmed (NET+PORT? returns 1024-49151 range); no explicit auth mechanism confirmed beyond UID command (default credentials not stated) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: null  # UNRESOLVED: TCP port range 1024-49151 per NET+PORT?; exact port not confirmed
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source; UID command present but default credentials not stated
```

## Traits
```yaml
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: address_set
  label: Set Projector Address
  kind: action
  params:
    - name: address
      type: integer
      description: Projector address (0-999)

- id: address_broadcast
  label: Broadcast Set Address
  kind: action
  params:
    - name: address
      type: integer

- id: address_query
  label: Query Address
  kind: action
  params: []

- id: ambient_light_correction
  label: Ambient Light Correction
  kind: action
  params:
    - name: value
      type: integer
      description: -100 to 100 (-100=brightest, 100=darkest env)

- id: auto_power_up
  label: Auto Power Up
  kind: action
  params:
    - name: enabled
      type: integer
      description: 0=Disable, 1=Enable

- id: auto_setup
  label: Auto Setup
  kind: action
  params: []

- id: baud_rate_set
  label: Set Baud Rate
  kind: action
  params:
    - name: port
      type: string
      description: PRTA (RS232-IN), PRTB (RS232-OUT), PRTC (RS422)
    - name: value
      type: integer
      description: 1=2400, 2=9600, 3=19200, 4=38400, 5=57600, 6=115200

- id: base_gamma_curve
  label: Base Gamma Curve
  kind: action
  params:
    - name: value
      type: integer
      description: 0=sRGB, 2=Power Law, 3=M-Series, 4=ITU-R BT.709

- id: built_in_self_test
  label: Built-in Self Test
  kind: action
  params:
    - name: suite
      type: integer
      description: 0=All Tests, 1=Image Processor, 2=Formatter, 3=Active Backplane, 4=Video Path

- id: built_in_self_test_query_list
  label: Query Self Test List
  kind: action
  params: []

- id: color_adjustment_select_table
  label: Color Adjustment Table
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Max Drives, 1=Color Temp, 2=HD Video, 3=Custom

- id: color_adjustment_color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: kelvin
      type: integer
      description: 3200 to 9300

- id: color_adjustment_save
  label: Save Color Primary Settings
  kind: action
  params: []

- id: color_adjustment_reset
  label: Reset Color Primary Settings
  kind: action
  params: []

- id: channel_select
  label: Select Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: 1-24 for various slot configurations

- id: color_enable
  label: Color Enable
  kind: action
  params:
    - name: color
      type: integer
      description: 0=White, 1=Red, 2=Green, 3=Blue, 4=Yellow, 5=Cyan, 6=Magenta

- id: color_space_selection
  label: Color Space Selection
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Auto, 1=RGB Full, 2=RGB Limited, 3=YCbCr HDTV, 4=YCbCr Expanded

- id: factory_defaults
  label: Factory Defaults
  kind: action
  params:
    - name: code
      type: integer
      description: Must be 111

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: black_level_blend_select
  label: Black Level Blend Select
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off, 1-4=Blend number

- id: edge_blending_select
  label: Edge Blending Select
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off, 1-4=Blend number

- id: edid_override
  label: EDID Override
  kind: action
  params:
    - name: rate
      type: integer
      description: Frame rate (24, 25, 30, 48, 50, 60)
    - name: columns
      type: integer
      description: 0=Standard, 1=Two Column, 2=Four Column

- id: async_serial_messages
  label: Asynchronous Serial Messages
  kind: action
  params:
    - name: enabled
      type: integer
      description: 0=Disable, 1=Enable

- id: engine_test_pattern
  label: Engine Test Pattern
  kind: action
  params:
    - name: index
      type: integer
      description: 0-255 (various patterns)

- id: event_manager
  label: Event Manager
  kind: action
  params:
    - name: max
      type: integer
      description: Max events to return (optional)
    - name: start_timestamp
      type: string
      description: Start time yyyy-mm-dd hh:mm:ss (optional)
    - name: end_timestamp
      type: string
      description: End time yyyy-mm-dd hh:mm:ss (optional)

- id: lens_focus_position
  label: Lens Focus Position
  kind: action
  params:
    - name: position
      type: integer

- id: lens_focus_range_query
  label: Lens Focus Range Query
  kind: action
  params: []

- id: frame_delay
  label: Frame Delay
  kind: action
  params:
    - name: delay
      type: integer
      description: 1000-3000 (1/1000ths of frame)

- id: frame_delay_actual_query
  label: Frame Delay Actual Query
  kind: action
  params: []

- id: image_freeze
  label: Image Freeze
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Disable (unfreeze), 1=Freeze

- id: gamma_power_value
  label: Gamma Power Value
  kind: action
  params:
    - name: exponent
      type: integer
      description: 1000-3000 (default 2200)

- id: gamma_slope
  label: Gamma Slope
  kind: action
  params:
    - name: value
      type: integer
      description: 1-100 (default 1)

- id: gamma_black_level_adjust
  label: Gamma Black Level Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: 1000-5000 (default 2000)

- id: lamp_history_query
  label: Lamp History Query
  kind: action
  params: []

- id: internal_test_pattern
  label: Internal Test Pattern
  kind: action
  params:
    - name: index
      type: integer
      description: 0=Off, 1=Grid, 2=Grey Scale 16, etc.

- id: internal_test_pattern_frequency
  label: Internal Test Pattern Frequency
  kind: action
  params:
    - name: freq
      type: integer
      description: 24-60 Hz

- id: lens_motor_calibration
  label: Lens Motor Calibration
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Run calibration

- id: lens_motor_home
  label: Lens Motor Home
  kind: action
  params: []

- id: lens_horizontal_position
  label: Lens Horizontal Position
  kind: action
  params:
    - name: position
      type: integer

- id: lamp_loc_auto
  label: LampLOC Auto
  kind: action
  params:
    - name: start
      type: integer
      description: 0=Cancel, 1=Start

- id: lamp_loc_calibrate
  label: LampLOC Calibrate
  kind: action
  params: []

- id: lamp_loc_light_sensor_query
  label: LampLOC Light Sensor Query
  kind: action
  params: []

- id: lamp_loc_move_motor
  label: LampLOC Move Motor
  kind: action
  params:
    - name: axis
      type: string
      description: X, Y, or Z
    - name: value
      type: integer
      description: -1=negative, 0=stop, 1=positive

- id: lamp_loc_move_motor_absolute
  label: LampLOC Move Motor Absolute
  kind: action
  params:
    - name: axis
      type: string
    - name: position
      type: integer

- id: lamp_loc_move_motor_relative
  label: LampLOC Move Motor Relative
  kind: action
  params:
    - name: axis
      type: string
    - name: steps
      type: integer

- id: lamp_loc_status_query
  label: LampLOC Status Query
  kind: action
  params: []

- id: lens_move_absolute
  label: Lens Move Absolute
  kind: action
  params:
    - name: horizontal
      type: integer
    - name: vertical
      type: integer
    - name: zoom
      type: integer
    - name: focus
      type: integer

- id: lens_move_horizontal_step
  label: Lens Move Horizontal Step
  kind: action
  params:
    - name: steps
      type: integer

- id: lens_move_vertical_step
  label: Lens Move Vertical Step
  kind: action
  params:
    - name: steps
      type: integer

- id: lens_move_focus_step
  label: Lens Move Focus Step
  kind: action
  params:
    - name: steps
      type: integer

- id: lens_move_zoom_step
  label: Lens Move Zoom Step
  kind: action
  params:
    - name: steps
      type: integer

- id: lens_move_horizontal_run
  label: Lens Move Horizontal Run
  kind: action
  params:
    - name: dir
      type: integer
      description: -1=left, 0=stop, 1=right

- id: lens_move_vertical_run
  label: Lens Move Vertical Run
  kind: action
  params:
    - name: dir
      type: integer
      description: -1=down, 0=stop, 1=up

- id: lens_move_focus_run
  label: Lens Move Focus Run
  kind: action
  params:
    - name: dir
      type: integer
      description: -1=inward, 0=stop, 1=outward

- id: lens_move_zoom_run
  label: Lens Move Zoom Run
  kind: action
  params:
    - name: dir
      type: integer
      description: -1=larger, 0=stop, 1=smaller

- id: video_loop_out_enable
  label: Video Loop Out Enable
  kind: action
  params:
    - name: enabled
      type: integer
      description: 0=Disable, 1=Enable

- id: lamp_change
  label: Lamp Change
  kind: action
  params:
    - name: lamp_type
      type: integer
    - name: serial
      type: string
    - name: hours
      type: integer

- id: lamp_type_list_query
  label: Lamp Type List Query
  kind: action
  params: []

- id: lamp_life_set
  label: Lamp Life Set
  kind: action
  params:
    - name: hours
      type: integer
      description: 0=Disable monitoring

- id: lamp_mode_set
  label: Lamp Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Constant Power, 1=Constant Intensity (LiteLOC)

- id: lamp_power_set
  label: Lamp Power Set
  kind: action
  params:
    - name: watts
      type: integer

- id: lamp_power_range_query
  label: Lamp Power Range Query
  kind: action
  params: []

- id: lens_vertical_position
  label: Lens Vertical Position
  kind: action
  params:
    - name: position
      type: integer

- id: network_set
  label: Network Set
  kind: action
  params:
    - name: ip
      type: string
    - name: subnet
      type: string
    - name: gateway
      type: string

- id: network_dhcp_enable
  label: Network DHCP Enable
  kind: action
  params:
    - name: enabled
      type: integer

- id: network_device_group_set
  label: Network Device Group Set
  kind: action
  params:
    - name: group
      type: string

- id: network_hostname_set
  label: Network Hostname Set
  kind: action
  params:
    - name: name
      type: string

- id: network_routing_set
  label: Network Routing Set
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Separate, 1=RS232+RS422, 2=RS232+Ethernet, 3=All joined

- id: profile_select
  label: Profile Select
  kind: action
  params:
    - name: index
      type: integer
      description: 0-4

- id: profile_list_query
  label: Profile List Query
  kind: action
  params: []

- id: power_electronics_override
  label: Power Electronics Override
  kind: action
  params:
    - name: enabled
      type: integer
      description: 0=Disable, 1=Enable

- id: remote_access_level_set
  label: Remote Access Level Set
  kind: action
  params:
    - name: port
      type: string
      description: PRTA, PRTB, PRTC, PUSB
    - name: level
      type: integer
      description: 0=No Access, 1=Login Required, 2=Free Access

- id: shutter
  label: Shutter
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Open, 1=Close

- id: snmp_trap_ip_set
  label: SNMP Trap IP Set
  kind: action
  params:
    - name: index
      type: integer
      description: 1-3
    - name: ip
      type: string

- id: snmp_read_password_set
  label: SNMP Read Password Set
  kind: action
  params:
    - name: password
      type: string

- id: snmp_lamp_trap_enable
  label: SNMP Lamp Trap Enable
  kind: action
  params:
    - name: enabled
      type: integer

- id: snmp_lamp_life_trap_enable
  label: SNMP Lamp Life Trap Enable
  kind: action
  params:
    - name: enabled
      type: integer

- id: snmp_power_trap_enable
  label: SNMP Power Trap Enable
  kind: action
  params:
    - name: enabled
      type: integer

- id: snmp_fan_stall_trap_enable
  label: SNMP Fan Stall Trap Enable
  kind: action
  params:
    - name: enabled
      type: integer

- id: snmp_thermal_trap_enable
  label: SNMP Thermal Trap Enable
  kind: action
  params:
    - name: enabled
      type: integer

- id: screen_orientation
  label: Screen Orientation
  kind: action
  params:
    - name: orientation
      type: integer
      description: 0=Front, 1=Rear, 2=Front Inverted, 3=Rear Inverted

- id: status_query
  label: Status Query
  kind: action
  params:
    - name: group
      type: string
      description: Optional 4-letter group (e.g. TEMP, LAMP)
    - name: index
      type: integer
      description: Optional item index

- id: size_position
  label: Size and Position
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Auto, 1=None, 2=Full, 3=Full Width, 4=Full Height

- id: time_set
  label: Time Set
  kind: action
  params:
    - name: time
      type: string
      description: hh:mm:ss

- id: date_set
  label: Date Set
  kind: action
  params:
    - name: date
      type: string
      description: YYYY/MM/DD

- id: warp_selection
  label: Warp Selection
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off, 1-4=Warp map number

- id: warp_selection_list_query
  label: Warp Selection List Query
  kind: action
  params: []

- id: lens_zoom_position
  label: Lens Zoom Position
  kind: action
  params:
    - name: position
      type: integer

- id: lens_zoom_range_query
  label: Lens Zoom Range Query
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: ["000=Standby", "001=On", "010=Cooling down", "011=Warming up"]

- id: address_value
  type: integer
  description: 0-999, 65535=Broadcast

- id: baud_rate_confirmed
  type: string
  description: Returns baud rate string e.g. "115200"

- id: self_test_result
  type: string
  description: "--OK--" or "Fail" with details

- id: self_test_list
  type: string
  description: List of available test suites

- id: channel_list
  type: string
  description: List of available channels

- id: black_level_blend_list
  type: string
  description: List of available black level blends

- id: edge_blend_list
  type: string
  description: List of available edge blends

- id: event_log
  type: string
  description: Event entries with timestamp, status, description

- id: frame_delay_actual
  type: integer
  description: Actual frame delay in 1/1000ths of frame

- id: frame_delay_ms
  type: string
  description: Frame delay in milliseconds

- id: lamp_history
  type: string
  description: Lamp history entries

- id: lamp_type_list
  type: string
  description: Supported lamp types

- id: lamp_power_range
  type: string
  description: Min/max lamp power in watts

- id: lamp_loc_light_sensor
  type: integer
  description: Light sensor value

- id: lamp_loc_status
  type: integer
  description: LampLOC progress 0-100

- id: lens_focus_range
  type: string
  description: Min/max focus position

- id: lens_horizontal_range
  type: string
  description: Min/max horizontal position

- id: lens_vertical_range
  type: string
  description: Min/max vertical position

- id: lens_zoom_range
  type: string
  description: Min/max zoom position (e.g. "-2400 900")

- id: network_ip
  type: string

- id: network_gateway
  type: string

- id: network_mac
  type: string

- id: network_port
  type: integer
  description: TCP port for Christie Serial Protocol (1024-49151)

- id: network_subnet
  type: string

- id: profile_list
  type: string
  description: List of available profiles

- id: shutter_state
  type: integer
  description: 0=Open, 1=Closed

- id: status_items
  type: string
  description: Status group items with state, value, description

- id: projector_info
  type: string
  description: "<type> <major> <minor> <build>"

- id: warp_selection_list
  type: string
  description: Available warp maps
```

## Variables
```yaml
# UNRESOLVED: no standalone variable parameters found in source; all settable
# parameters documented as Actions above
```

## Events
```yaml
# Asynchronous messages the projector sends:
- id: card_detected
  description: Card detected in slot X
  params:
    - name: slot
      type: integer

- id: card_removed
  description: Card removed from slot X
  params:
    - name: slot
      type: integer

- id: date_time_changed
  description: Date or time changed

- id: factory_defaults_restored
  description: Factory defaults performed

- id: network_configured
  description: Network settings changed (IP, Mask, Gateway)

- id: status_change
  description: Status item changed state
  params:
    - name: group
      type: string
    - name: index
      type: integer
    - name: state
      type: string
    - name: value
      type: string

- id: error_message
  description: Error condition reported
  params:
    - name: message
      type: string

- id: warning_message
  description: Warning condition reported
  params:
    - name: message
      type: string
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Factory defaults (DEF 111): projector must be AC cycled to take effect"
  - description: "Auto setup (ASU): only available when active display has a signal"
  - description: "Built-in self test (BST): do not execute while projector is warming up"
  - description: "Lamp change (LPC): lamp record archived, lamp change must be performed to enter correct type/serial/pre-hours"
# UNRESOLVED: power sequencing requirements, voltage specifications, fault behavior
```

## Notes
Command syntax: `(CMD <args>)` for sending, `CMD!<response>` format for responses. Broadcast address is 65535. Multiple projectors can be daisy-chained via RS-232/RS-422 and addressed individually using ADR command. Default baud rate is 115200 on all ports. Network supports DHCP (default on) and static IP configuration. Christie Serial Protocol over Ethernet uses TCP port in range 1024-49151 (exact port per NET+PORT?).

<!-- UNRESOLVED: TCP port exact value (only range known); flow control configuration; default credentials for UID command; firmware version; voltage/power specs; fault recovery behavior -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-102207-08-christie-lit-man-ref-spyder-commands.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-05-04T15:10:58.851Z
last_checked_at: 2026-05-14T21:45:09.230Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T21:45:09.230Z
matched_actions: 91
action_count: 91
confidence: high
summary: "All 91 spec actions matched to source commands; transport parameters verified; only 2 extra commands (PNG, UID) not in spec, well below the 5-command threshold for short verdict."
```

## Known Gaps

```yaml
- PNG
- UID
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
