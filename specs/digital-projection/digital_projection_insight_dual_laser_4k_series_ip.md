---
spec_id: admin/digital_projection-insight-dual-laser-4k-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Digital Projection INSIGHT Dual Laser 4K Series Control Spec"
manufacturer: "Digital Projection"
model_family: "INSIGHT Dual Laser 4K Series"
aliases: []
compatible_with:
  manufacturers:
    - "Digital Projection"
  models:
    - "INSIGHT Dual Laser 4K Series"
    - "INSIGHT 4K Quad"
    - "INSIGHT 4K Dual LED"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - digitalprojection.co.uk
  - manualslib.com
source_urls:
  - "https://digitalprojection.co.uk/dpdownloads/Protocol/Protocol%20Guide%20INSIGHT%204K.pdf"
  - https://www.manualslib.com/manual/1276574/Digital-Projection-Insight-4k-Quad-Series.html
  - https://www.manualslib.com/manual/1340298/Digital-Projection-Insight-Dual-Laser-4k-Series.html
retrieved_at: 2026-10-07T13:18:43.670Z
last_checked_at: 2026-10-07T13:18:43.670Z
generated_at: 2026-10-07T13:18:43.670Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port number not stated in source; DHCP is required for network control"
  - "port number not stated in source"
  - "no standalone settable variables beyond action params"
  - "no unsolicited event notifications described in source"
  - "no multi-step macro sequences described in source"
  - "TCP port number not stated — DHCP-based addressing only"
  - "unsolicited event notifications not described in source"
  - "command timing/latency specifications not provided"
  - "firmware version compatibility ranges not stated"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:18:43.670Z
  matched_actions: 101
  action_count: 101
  confidence: medium
  summary: "All 101 action units match source commands with correct shapes; serial transport supported; spec covers the full source catalogue. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Digital Projection INSIGHT Dual Laser 4K Series Control Spec

## Summary
Laser phosphor projector supporting both RS-232 serial and TCP/IP network control. Commands are ASCII text strings starting with `*` and ending with carriage return. Supports power control, input routing, lens positioning, image adjustments, 3D formatting, and lamp monitoring. Only one control path (serial or network) should be used at a time — simultaneous commands to both ports may cause unpredictable behavior.

<!-- UNRESOLVED: TCP port number not stated in source; DHCP is required for network control -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  # UNRESOLVED: port number not stated in source
  port: UNRESOLVED
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable  # inferred: power on/off commands present
- routable   # inferred: input selection commands present
- queryable  # inferred: lamp hours, version queries present
- levelable  # inferred: brightness, contrast, gamma, color lift/gain present
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: value
      type: enum
      values: [on, off]
      description: Power state

- id: standby_mode
  label: Standby Mode
  kind: action
  params:
    - name: value
      type: enum
      values: [standby, normal, super]

- id: input
  label: Select Input
  kind: action
  params:
    - name: value
      type: integer
      description: 0=HDMI A, 1=HDMI B, 2=DisplayPort A, 3=DisplayPort B, 4=Option slot 1, 5=Option slot 2

- id: input_next
  label: Next Input
  kind: action
  params: []

- id: input_prev
  label: Previous Input
  kind: action
  params: []

- id: formatter_pattern
  label: Test Pattern
  kind: action
  params:
    - name: value
      type: integer
      description: 13=native white, 14=native black, 15=native green, 16=native red, 17=native blue, 21=off

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
      range: [0, 3]
      description: 0=slowest, 3=fastest

- id: lens_down
  label: Lens Down
  kind: action
  params:
    - name: speed
      type: integer
      range: [0, 3]

- id: lens_left
  label: Lens Left
  kind: action
  params:
    - name: speed
      type: integer
      range: [0, 3]

- id: lens_right
  label: Lens Right
  kind: action
  params:
    - name: speed
      type: integer
      range: [0, 3]

- id: lens_stop
  label: Lens Stop
  kind: action
  params: []

- id: nudge_up
  label: Nudge Up
  kind: action
  params:
    - name: duration
      type: integer
      range: [0, 3]
      description: 0=shortest, 3=longest

- id: nudge_down
  label: Nudge Down
  kind: action
  params:
    - name: duration
      type: integer
      range: [0, 3]

- id: nudge_left
  label: Nudge Left
  kind: action
  params:
    - name: duration
      type: integer
      range: [0, 3]

- id: nudge_right
  label: Nudge Right
  kind: action
  params:
    - name: duration
      type: integer
      range: [0, 3]

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
    - name: slot
      type: integer
      range: [0, 9]

- id: lensmemory_recall
  label: Recall Lens Memory
  kind: action
  params:
    - name: slot
      type: integer
      range: [0, 9]

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: value
      type: integer
      range: [-50, 50]

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: value
      type: integer
      range: [-50, 50]

- id: gamma
  label: Gamma
  kind: action
  params:
    - name: value
      type: integer
      range: [10, 30]

- id: freeze
  label: Freeze
  kind: action
  params:
    - name: value
      type: enum
      values: [On, Off]

- id: mcgd_data
  label: MCGD Data
  kind: action
  params:
    - name: value
      type: string
      description: "green-x, green-y, red-x, red-y, blue-x, blue-y, white-x, white-y as comma-separated coordinates with leading 0, e.g. 0.663,0.332"

- id: mcgd_factory
  label: MCGD Factory Reset
  kind: action
  params: []

- id: tcgd_data
  label: TCGD Data
  kind: action
  params:
    - name: value
      type: string
      description: "green-x, green-y, red-x, red-y, blue-x, blue-y, white-x, white-y as comma-separated coordinates"

- id: gamut
  label: Color Gamut
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Peak, 1=Rec.709, 2=Rec.601, 3=3200K, 4=5400K, 5=6500K, 6=8000K, 7=9000K

- id: red_lift
  label: Red Lift
  kind: action
  params:
    - name: value
      type: integer
      range: [-50, 50]

- id: green_lift
  label: Green Lift
  kind: action
  params:
    - name: value
      type: integer
      range: [-50, 50]

- id: blue_lift
  label: Blue Lift
  kind: action
  params:
    - name: value
      type: integer
      range: [-50, 50]

- id: red_gain
  label: Red Gain
  kind: action
  params:
    - name: value
      type: integer
      range: [-50, 50]

- id: green_gain
  label: Green Gain
  kind: action
  params:
    - name: value
      type: integer
      range: [-50, 50]

- id: blue_gain
  label: Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      range: [-50, 50]

- id: csc_matrix
  label: CSC Matrix
  kind: action
  params:
    - name: coefficients
      type: string
      description: "c1,c2,c3,c4,c5,c6,c7,c8,c9,Y,Cb,Cr (c1-c9 range ~±4.000; Y,Cb,Cr range 0-255)"

- id: csc_preset
  label: CSC Preset
  kind: action
  params:
    - name: value
      type: integer
      description: 0=RGB, 1=Rec.601 (limited), 2=Rec.601 (full), 3=Rec.709

- id: d3d_enable
  label: 3D Enable
  kind: action
  params:
    - name: value
      type: enum
      values: [On, Off]

- id: d3d_frmultiplier
  label: 3D Frame Multiplier
  kind: action
  params:
    - name: value
      type: integer
      description: "1=x1, 2=x2, 3=x3"

- id: d3d_darktime
  label: 3D Dark Time
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 8000 µs, steps of 50

- id: d3d_syncoffset
  label: 3D Sync Offset
  kind: action
  params:
    - name: value
      type: integer
      description: -1500 to 1500, steps of 100

- id: d3d_syncinpolarity
  label: 3D Sync Input Polarity
  kind: action
  params:
    - name: value
      type: enum
      values: [pos, neg]

- id: d3d_syncoutpolarity
  label: 3D Sync Output Polarity
  kind: action
  params:
    - name: value
      type: enum
      values: [pos, neg]

- id: d3d_syncoutenable
  label: 3D Sync Output Enable
  kind: action
  params:
    - name: value
      type: enum
      values: [on, off]

- id: d3d_dominance
  label: 3D Dominance
  kind: action
  params:
    - name: value
      type: enum
      values: [left, right]

- id: lamp_power
  label: Lamp Power
  kind: action
  params:
    - name: value
      type: integer
      range: [1, 100]
      description: For INSIGHT 4K Quad minimum is 80

- id: lamp_mode
  label: Lamp Mode
  kind: action
  params:
    - name: value
      type: integer
      description: 0=all lamps, 1=auto 1, 2=auto 2, 3=auto 3

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
      type: enum
      values: [on, open, off, close]

- id: ir_address
  label: IR Address
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []

- id: identify
  label: Identify
  kind: action
  params: []
  description: Flashes keypad lights for 10 seconds

- id: lamp2_hours
  label: Quad Lamp Hours
  kind: action
  params:
    - name: command
      type: enum
      values: [lamp2.hours, lamp3.hours, lamp4.hours]
      description: Select the documented query command mnemonic
  description: "INSIGHT 4K Quad only. Send the selected command with the ? operator using the documented protocol format. Returns lamp hours in HH:MM format."

- id: lamp2_strikes
  label: Quad Lamp Strikes
  kind: action
  params:
    - name: command
      type: enum
      values: [lamp2.strikes, lamp3.strikes, lamp4.strikes]
      description: Select the documented query command mnemonic
  description: "INSIGHT 4K Quad only. Send the selected command with the ? operator using the documented protocol format. Response format: UNRESOLVED."

- id: lamp2_serial
  label: Quad Lamp Serial
  kind: action
  params:
    - name: command
      type: enum
      values: [lamp2.serial, lamp3.serial, lamp4.serial]
      description: Select the documented query command mnemonic
  description: "INSIGHT 4K Quad only. Send the selected command with the ? operator using the documented protocol format. Response format: UNRESOLVED."

- id: lamp2_status
  label: Quad Lamp Status
  kind: action
  params:
    - name: command
      type: enum
      values: [lamp2.status, lamp3.status, lamp4.status]
      description: Select the documented query command mnemonic
  description: "INSIGHT 4K Quad only. Send the selected command with the ? operator using the documented protocol format. Returns 0 = Off, 1 = Pre cooling, 2 = Ignition, 3 = Ignition confirm, 4 = Enable communication, 5 = Delay cooling, 6 = Warm up eco mode, 7 = Warm up, 8 = Cool down no restrike, 9 = Cool down ok restrike, 10 = Normal, 11 = Error, 12 = Ignition retry, 13 = Re strike delay, 14 = Enable CSI, 15 = Deferred shutdown, 16 = Shutdown confirm, 17 = Error shutdown, 18 = Lamp warmup stage 1, 19 = Lamp warmup stage 2."
```

## Feedbacks
```yaml
- id: power_response
  type: enum
  values: [ACK, NAK, ack, nak]
  description: Command acknowledgement

- id: input_response
  query_command: input
  type: integer
  description: Returns 0-5 for current input

- id: input_max_response
  query_command: input.max
  type: integer
  description: Highest available input number

- id: formatter_pattern_response
  query_command: formatter.pattern
  type: integer
  description: Current pattern value

- id: brightness_response
  query_command: brightness
  type: integer
  range: [-50, 50]

- id: contrast_response
  query_command: contrast
  type: integer
  range: [-50, 50]

- id: gamma_response
  query_command: gamma
  type: integer
  range: [10, 30]

- id: freeze_response
  query_command: freeze
  type: enum
  values: [On, Off]

- id: mcgd_data_response
  query_command: mcgd.data
  type: string
  description: Returns green-x, green-y, red-x, red-y, blue-x, blue-y, white-x, white-y

- id: tcgd_data_response
  query_command: tcgd.data
  type: string
  description: Returns green-x, green-y, red-x, red-y, blue-x, blue-y, white-x, white-y

- id: gamut_response
  type: integer
  description: Current gamut value (cannot be queried directly; use tcgd.data ? after setting)

- id: red_lift_response
  query_command: red.lift
  type: integer
  range: [-50, 50]

- id: green_lift_response
  query_command: green.lift
  type: integer
  range: [-50, 50]

- id: blue_lift_response
  query_command: blue.lift
  type: integer
  range: [-50, 50]

- id: red_gain_response
  query_command: red.gain
  type: integer
  range: [-50, 50]

- id: green_gain_response
  query_command: green.gain
  type: integer
  range: [-50, 50]

- id: blue_gain_response
  query_command: blue.gain
  type: integer
  range: [-50, 50]

- id: csc_matrix_response
  query_command: csc.matrix
  type: string
  description: "c1,c2,c3,c4,c5,c6,c7,c8,c9,Y,Cb,Cr values"

- id: d3d_enable_response
  query_command: 3d.enable
  type: enum
  values: [On, Off]

- id: d3d_frmultiplier_response
  query_command: 3d.frmultiplier
  type: integer
  description: "1=x1, 2=x2, 3=x3"

- id: d3d_darktime_response
  query_command: 3d.darktime
  type: integer
  description: 0 to 8000 µs

- id: d3d_syncoffset_response
  query_command: 3d.syncoffset
  type: integer
  description: -1500 to 1500

- id: d3d_syncinpolarity_response
  query_command: 3d.syncinpolarity
  type: enum
  values: [pos, neg]

- id: d3d_syncoutpolarity_response
  query_command: 3d.syncoutpolarity
  type: enum
  values: [pos, neg]

- id: d3d_syncoutenable_response
  query_command: 3d.syncoutenable
  type: enum
  values: [on, off]

- id: d3d_dominance_response
  query_command: 3d.dominance
  type: enum
  values: [left, right]

- id: lamp1_hours_response
  query_command: lamp1.hours
  type: string
  description: Lamp hours in HH:MM format

- id: lamp1_strikes_response
  query_command: lamp1.strikes
  type: integer
  description: Lamp strike count

- id: lamp1_serial_response
  query_command: lamp1.serial
  type: string
  description: Lamp serial number

- id: lamp1_status_response
  query_command: lamp1.status
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  description: "0=Off, 1=Pre cooling, 2=Ignition, 3=Ignition confirm, 4=Enable comm, 5=Delay cooling, 6=Warm up eco, 7=Warm up, 8=Cool down no restrike, 9=Cool down ok restrike, 10=Normal, 11=Error, 12=Ignition retry, 13=Re strike delay, 14=Enable CSI, 15=Deferred shutdown, 16=Shutdown confirm, 17=Error shutdown, 18=Lamp warmup stage 1, 19=Lamp warmup stage 2"

- id: lamp_power_response
  query_command: lamp.power
  type: integer
  range: [1, 100]

- id: lamp_mode_response
  query_command: lamp.mode
  type: integer
  description: "0=all lamps, 1=auto 1, 2=auto 2, 3=auto 3"

- id: orientation_response
  query_command: orientation
  type: integer
  description: "0=Desktop Front, 1=Ceiling Front, 2=Desktop Rear, 3=Ceiling Rear"

- id: shutter_response
  query_command: shutter
  type: enum
  values: [on, open, off, close]

- id: ir_address_response
  query_command: ir.address
  type: integer
  range: [0, 255]

- id: sw_version_response
  query_command: sw.version
  type: string
  description: Software release version

- id: board_id_response
  query_command: board.id
  type: string
  description: CPU hardware version

- id: videoboard_id_response
  query_command: videoboard.id
  type: string
  description: Video hardware version

- id: fw_version_response
  query_command: fw.version
  type: string
  description: Firmware version

- id: from_version_response
  query_command: from.version
  type: string
  description: Factory ROM version

- id: lens_version_response
  query_command: lens.version
  type: string
  description: Lens mount version

- id: seq_version_response
  query_command: seq.version
  type: string
  description: Formatter sequences version

- id: model_name_response
  query_command: model.name
  type: string
  description: Projector model name

- id: serial_response
  query_command: serial
  type: string
  description: Projector serial number
```

## Variables
```yaml
# UNRESOLVED: no standalone settable variables beyond action params
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Only one control path (serial or network) should be used at a time. Simultaneous commands to both ports may result in unpredictable behavior.
  - Adjusting brightness resets red/green/blue lift to zero
  - Adjusting contrast resets red/green/blue gain to zero
  - Frozen image persists even if source is disconnected
  - In super standby mode projector starts up more slowly than in normal standby
```

## Notes
- Commands start with `*` and end with ASCII CR (code 13)
- Command format: `*<command> <operator> <value>` where operator is `=` (set), `?` (get), or absent (execute)
- Must wait for complete response before sending next command
- Successful response: `ACK` or `ack`; failure: `NAK` or `nack`
- DHCP required for network control; only one control path at a time
- `gamut` cannot be queried — set then use `*tcgd.data ?` to verify
- `csc.preset` has no query — after setting use `*csc.matrix ?` to verify
- INSIGHT 4K Quad lamp.power minimum is 80; INSIGHT 4K Dual LED lamp power is fixed
- Lamp status values 0-19 indicate various operational states including error conditions
- `query_command` contains the literal source command mnemonic; use it with the documented `?` operator and protocol framing.

<!-- UNRESOLVED: TCP port number not stated — DHCP-based addressing only -->
<!-- UNRESOLVED: unsolicited event notifications not described in source -->
<!-- UNRESOLVED: command timing/latency specifications not provided -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->

## Provenance

```yaml
source_domains:
  - digitalprojection.co.uk
  - manualslib.com
source_urls:
  - "https://digitalprojection.co.uk/dpdownloads/Protocol/Protocol%20Guide%20INSIGHT%204K.pdf"
  - https://www.manualslib.com/manual/1276574/Digital-Projection-Insight-4k-Quad-Series.html
  - https://www.manualslib.com/manual/1340298/Digital-Projection-Insight-Dual-Laser-4k-Series.html
retrieved_at: 2026-10-07T13:18:43.670Z
last_checked_at: 2026-10-07T13:18:43.670Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:18:43.670Z
matched_actions: 101
action_count: 101
confidence: medium
summary: "All 101 action units match source commands with correct shapes; serial transport supported; spec covers the full source catalogue. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port number not stated in source; DHCP is required for network control"
- "port number not stated in source"
- "no standalone settable variables beyond action params"
- "no unsolicited event notifications described in source"
- "no multi-step macro sequences described in source"
- "TCP port number not stated — DHCP-based addressing only"
- "unsolicited event notifications not described in source"
- "command timing/latency specifications not provided"
- "firmware version compatibility ranges not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
