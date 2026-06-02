---
spec_id: admin/digital-projection-insight-4k-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Digital Projection INSIGHT 4K Series Control Spec"
manufacturer: "Digital Projection"
model_family: "INSIGHT 4K Quad"
aliases: []
compatible_with:
  manufacturers:
    - "Digital Projection"
  models:
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
retrieved_at: 2026-04-30T20:23:55.028Z
last_checked_at: 2026-05-14T18:17:15.561Z
generated_at: 2026-05-14T18:17:15.561Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "3D commands not fully decoded (value ranges partially described)."
  - "no unsolicited event documentation in source"
  - "no macro sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "lamp2/lamp3/lamp4 hours/strikes/serial/status — query responses not explicitly documented for lamps 2-4"
  - "3D sync polarity values not fully decoded beyond pos/neg"
  - "mcgg/tcgg data format x,y coordinates need leading zero prefix (e.g. 0.663,0.332)"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:15.561Z
  matched_actions: 79
  action_count: 108
  confidence: medium
  summary: "All 79 spec actions matched source commands; transport parameters verified verbatim; semantic-id convention properly applied throughout. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Digital Projection INSIGHT 4K Series Control Spec

## Summary
Digital Projection INSIGHT 4K Series professional projector. Control via RS-232C serial. Commands use `*command operator <value>` ASCII format. Supports power, input routing, lens control, image adjustment, lamp management, and full query capability.

<!-- UNRESOLVED: 3D commands not fully decoded (value ranges partially described). -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # power on/off/standby commands present
- routable        # input selection commands present
- queryable       # get commands returning values present
- levelable       # brightness, contrast, gamma, color gain/lift present
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

- id: power_get
  label: Get Power State
  kind: action
  params: []

- id: standby_mode_set
  label: Set Standby Mode
  kind: action
  params:
    - name: mode
      type: string
      values: [normal, super]

- id: standby_mode_get
  label: Get Standby Mode
  kind: action
  params: []

- id: input_set
  label: Set Input
  kind: action
  params:
    - name: input
      type: integer
      description: 0=HDMI A, 1=HDMI B, 2=DisplayPort A, 3=DisplayPort B, 4=Option slot 1, 5=Option slot 2

- id: input_get
  label: Get Input
  kind: action
  params: []

- id: input_next
  label: Next Input
  kind: action
  params: []

- id: input_prev
  label: Previous Input
  kind: action
  params: []

- id: input_max_get
  label: Get Max Input Number
  kind: action
  params: []

- id: formatter_pattern
  label: Set Test Pattern
  kind: action
  params:
    - name: pattern
      type: integer
      description: 13=white, 14=black, 15=green, 16=red, 17=blue, 21=off

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
  label: Center Lens
  kind: action
  params: []

- id: lens_up
  label: Move Lens Up
  kind: action
  params:
    - name: speed
      type: integer
      range: [0, 3]
      description: 0=slowest, 3=fastest

- id: lens_down
  label: Move Lens Down
  kind: action
  params:
    - name: speed
      type: integer
      range: [0, 3]

- id: lens_left
  label: Move Lens Left
  kind: action
  params:
    - name: speed
      type: integer
      range: [0, 3]

- id: lens_right
  label: Move Lens Right
  kind: action
  params:
    - name: speed
      type: integer
      range: [0, 3]

- id: lens_stop
  label: Stop Lens Movement
  kind: action
  params: []

- id: nudge_up
  label: Nudge Lens Up
  kind: action
  params:
    - name: time
      type: integer
      range: [0, 3]
      description: 0=shortest, 3=longest

- id: nudge_down
  label: Nudge Lens Down
  kind: action
  params:
    - name: time
      type: integer
      range: [0, 3]

- id: nudge_left
  label: Nudge Lens Left
  kind: action
  params:
    - name: time
      type: integer
      range: [0, 3]

- id: nudge_right
  label: Nudge Lens Right
  kind: action
  params:
    - name: time
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

- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      range: [-50, 50]

- id: brightness_get
  label: Get Brightness
  kind: action
  params: []

- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      range: [-50, 50]

- id: contrast_get
  label: Get Contrast
  kind: action
  params: []

- id: gamma_set
  label: Set Gamma
  kind: action
  params:
    - name: value
      type: integer
      range: [10, 30]
      description: Corresponds to gamma 1.0 to 3.0

- id: gamma_get
  label: Get Gamma
  kind: action
  params: []

- id: freeze_set
  label: Set Freeze
  kind: action
  params:
    - name: state
      type: string
      values: [on, off]

- id: freeze_get
  label: Get Freeze
  kind: action
  params: []

- id: red_lift_set
  label: Set Red Lift
  kind: action
  params:
    - name: value
      type: integer
      range: [-50, 50]

- id: red_lift_get
  label: Get Red Lift
  kind: action
  params: []

- id: green_lift_set
  label: Set Green Lift
  kind: action
  params:
    - name: value
      type: integer
      range: [-50, 50]

- id: green_lift_get
  label: Get Green Lift
  kind: action
  params: []

- id: blue_lift_set
  label: Set Blue Lift
  kind: action
  params:
    - name: value
      type: integer
      range: [-50, 50]

- id: blue_lift_get
  label: Get Blue Lift
  kind: action
  params: []

- id: red_gain_set
  label: Set Red Gain
  kind: action
  params:
    - name: value
      type: integer
      range: [-50, 50]

- id: red_gain_get
  label: Get Red Gain
  kind: action
  params: []

- id: green_gain_set
  label: Set Green Gain
  kind: action
  params:
    - name: value
      type: integer
      range: [-50, 50]

- id: green_gain_get
  label: Get Green Gain
  kind: action
  params: []

- id: blue_gain_set
  label: Set Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      range: [-50, 50]

- id: blue_gain_get
  label: Get Blue Gain
  kind: action
  params: []

- id: gamut_set
  label: Set Gamut
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Peak, 1=Rec.709, 2=Rec.601, 3=3200K, 4=5400K, 5=6500K, 6=8000K, 7=9000K

- id: csc_matrix_get
  label: Get CSC Matrix
  kind: action
  params: []

- id: csc_preset_set
  label: Set CSC Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: 0=RGB, 1=Rec.601 limited, 2=Rec.601 full, 3=Rec.709

- id: mcgg_data_get
  label: Get MCGD Data
  kind: action
  params: []

- id: mcgg_factory
  label: Reset MCGD to Factory
  kind: action
  params: []

- id: tcgg_data_get
  label: Get TCGD Data
  kind: action
  params: []

- id: three_d_enable_set
  label: Set 3D Enable
  kind: action
  params:
    - name: state
      type: string
      values: [on, off]

- id: three_d_enable_get
  label: Get 3D Enable
  kind: action
  params: []

- id: three_d_frmultiplier_set
  label: Set 3D Frame Multiplier
  kind: action
  params:
    - name: multiplier
      type: integer
      description: 1=x1, 2=x2, 3=x3

- id: three_d_frmultiplier_get
  label: Get 3D Frame Multiplier
  kind: action
  params: []

- id: three_d_darktime_set
  label: Set 3D Dark Time
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 8000]
      description: Steps of 50 µs

- id: three_d_darktime_get
  label: Get 3D Dark Time
  kind: action
  params: []

- id: three_d_syncoffset_set
  label: Set 3D Sync Offset
  kind: action
  params:
    - name: value
      type: integer
      range: [-1500, 1500]
      description: Steps of 100

- id: three_d_syncoffset_get
  label: Get 3D Sync Offset
  kind: action
  params: []

- id: three_d_syncinpolarity_set
  label: Set 3D Sync Input Polarity
  kind: action
  params:
    - name: polarity
      type: string
      values: [pos, neg]

- id: three_d_syncinpolarity_get
  label: Get 3D Sync Input Polarity
  kind: action
  params: []

- id: three_d_syncoutpolarity_set
  label: Set 3D Sync Output Polarity
  kind: action
  params:
    - name: polarity
      type: string
      values: [pos, neg]

- id: three_d_syncoutpolarity_get
  label: Get 3D Sync Output Polarity
  kind: action
  params: []

- id: three_d_syncoutenable_set
  label: Set 3D Sync Output Enable
  kind: action
  params:
    - name: state
      type: string
      values: [on, off]

- id: three_d_syncoutenable_get
  label: Get 3D Sync Output Enable
  kind: action
  params: []

- id: three_d_dominance_set
  label: Set 3D Dominance
  kind: action
  params:
    - name: eye
      type: string
      values: [left, right]

- id: three_d_dominance_get
  label: Get 3D Dominance
  kind: action
  params: []

- id: lamp1_hours_get
  label: Get Lamp 1 Hours
  kind: action
  params: []

- id: lamp1_strikes_get
  label: Get Lamp 1 Strikes
  kind: action
  params: []

- id: lamp1_serial_get
  label: Get Lamp 1 Serial
  kind: action
  params: []

- id: lamp1_status_get
  label: Get Lamp 1 Status
  kind: action
  params: []

- id: lamp_power_set
  label: Set Lamp Power
  kind: action
  params:
    - name: percent
      type: integer
      range: [1, 100]
      description: INSIGHT 4K Quad: 80-100 only. INSIGHT 4K Dual LED: cannot change.

- id: lamp_power_get
  label: Get Lamp Power
  kind: action
  params: []

- id: lamp_mode_set
  label: Set Lamp Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=all lamps, 1=auto 1, 2=auto 2, 3=auto 3

- id: lamp_mode_get
  label: Get Lamp Mode
  kind: action
  params: []

- id: lamp2_hours_get
  label: Get Lamp 2 Hours
  kind: action
  params: []

- id: lamp2_strikes_get
  label: Get Lamp 2 Strikes
  kind: action
  params: []

- id: lamp2_serial_get
  label: Get Lamp 2 Serial
  kind: action
  params: []

- id: lamp2_status_get
  label: Get Lamp 2 Status
  kind: action
  params: []

- id: lamp3_hours_get
  label: Get Lamp 3 Hours
  kind: action
  params: []

- id: lamp3_strikes_get
  label: Get Lamp 3 Strikes
  kind: action
  params: []

- id: lamp3_serial_get
  label: Get Lamp 3 Serial
  kind: action
  params: []

- id: lamp3_status_get
  label: Get Lamp 3 Status
  kind: action
  params: []

- id: lamp4_hours_get
  label: Get Lamp 4 Hours
  kind: action
  params: []

- id: lamp4_strikes_get
  label: Get Lamp 4 Strikes
  kind: action
  params: []

- id: lamp4_serial_get
  label: Get Lamp 4 Serial
  kind: action
  params: []

- id: lamp4_status_get
  label: Get Lamp 4 Status
  kind: action
  params: []

- id: orientation_set
  label: Set Orientation
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Desktop Front, 1=Ceiling Front, 2=Desktop Rear, 3=Ceiling Rear

- id: orientation_get
  label: Get Orientation
  kind: action
  params: []

- id: shutter_set
  label: Set Shutter
  kind: action
  params:
    - name: state
      type: string
      values: [on, open, off, close]

- id: shutter_get
  label: Get Shutter
  kind: action
  params: []

- id: ir_address_set
  label: Set IR Address
  kind: action
  params:
    - name: address
      type: integer
      range: [0, 255]

- id: ir_address_get
  label: Get IR Address
  kind: action
  params: []

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []

- id: identify
  label: Identify Projector
  kind: action
  params: []
  description: Flashes keypad lights for 10 seconds

- id: sw_version_get
  label: Get Software Version
  kind: action
  params: []

- id: board_id_get
  label: Get Board ID
  kind: action
  params: []

- id: videoboard_id_get
  label: Get Video Board ID
  kind: action
  params: []

- id: fw_version_get
  label: Get Firmware Version
  kind: action
  params: []

- id: from_version_get
  label: Get Factory ROM Version
  kind: action
  params: []

- id: lens_version_get
  label: Get Lens Version
  kind: action
  params: []

- id: seq_version_get
  label: Get Sequence Version
  kind: action
  params: []

- id: model_name_get
  label: Get Model Name
  kind: action
  params: []

- id: serial_get
  label: Get Serial Number
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off, standby]

- id: standby_mode
  type: enum
  values: [normal, super]

- id: input_state
  type: enum
  values: [0, 1, 2, 3, 4, 5]
  labels: [HDMI A, HDMI B, DisplayPort A, DisplayPort B, Option slot 1, Option slot 2]

- id: formatter_pattern_state
  type: enum
  values: [13, 14, 15, 16, 17, 21]
  labels: [native white, native black, native green, native red, native blue, off]

- id: brightness_state
  type: integer
  range: [-50, 50]

- id: contrast_state
  type: integer
  range: [-50, 50]

- id: gamma_state
  type: integer
  range: [10, 30]

- id: freeze_state
  type: enum
  values: [on, off]

- id: red_lift_state
  type: integer
  range: [-50, 50]

- id: green_lift_state
  type: integer
  range: [-50, 50]

- id: blue_lift_state
  type: integer
  range: [-50, 50]

- id: red_gain_state
  type: integer
  range: [-50, 50]

- id: green_gain_state
  type: integer
  range: [-50, 50]

- id: blue_gain_state
  type: integer
  range: [-50, 50]

- id: gamut_state
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7]
  labels: [Peak, Rec.709, Rec.601, 3200K, 5400K, 6500K, 8000K, 9000K]

- id: csc_matrix_state
  type: string
  description: Comma-separated c1-c9, Y, Cb, Cr values

- id: csc_preset_state
  type: enum
  values: [0, 1, 2, 3]
  labels: [RGB, Rec.601 limited, Rec.601 full, Rec.709]

- id: mcgg_data_state
  type: string
  description: green-x, green-y, red-x, red-y, blue-x, blue-y, white-x, white-y

- id: tcgg_data_state
  type: string
  description: green-x, green-y, red-x, red-y, blue-x, blue-y, white-x, white-y

- id: three_d_enable_state
  type: enum
  values: [on, off]

- id: three_d_frmultiplier_state
  type: enum
  values: [1, 2, 3]
  labels: [x1, x2, x3]

- id: three_d_darktime_state
  type: integer
  range: [0, 8000]
  description: In µs, steps of 50

- id: three_d_syncoffset_state
  type: integer
  range: [-1500, 1500]
  description: Steps of 100

- id: three_d_syncinpolarity_state
  type: enum
  values: [pos, neg]

- id: three_d_syncoutpolarity_state
  type: enum
  values: [pos, neg]

- id: three_d_syncoutenable_state
  type: enum
  values: [on, off]

- id: three_d_dominance_state
  type: enum
  values: [left, right]

- id: lamp1_hours_state
  type: string
  description: HH:MM format

- id: lamp1_strikes_state
  type: integer

- id: lamp1_serial_state
  type: string

- id: lamp1_status_state
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  labels: [Off, Pre cooling, Ignition, Ignition confirm, Enable communication, Delay cooling, Warm up eco mode, Warm up, Cool down no restrike, Cool down ok restrike, Normal, Error, Ignition retry, Re strike delay, Enable CSI, Deferred shutdown, Shutdown confirm, Error shutdown, Lamp warmup stage 1, Lamp warmup stage 2]

- id: lamp_power_state
  type: integer
  range: [1, 100]

- id: lamp_mode_state
  type: enum
  values: [0, 1, 2, 3]
  labels: [all lamps, auto 1, auto 2, auto 3]

- id: orientation_state
  type: enum
  values: [0, 1, 2, 3]
  labels: [Desktop Front, Ceiling Front, Desktop Rear, Ceiling Rear]

- id: shutter_state
  type: enum
  values: [on, open, off, close]

- id: ir_address_state
  type: integer
  range: [0, 255]

- id: sw_version_state
  type: string

- id: board_id_state
  type: string

- id: videoboard_id_state
  type: string

- id: fw_version_state
  type: string

- id: from_version_state
  type: string

- id: lens_version_state
  type: string

- id: seq_version_state
  type: string

- id: model_name_state
  type: string

- id: serial_state
  type: string

- id: command_response
  type: enum
  values: [ACK, ack, NAK, nack]
  description: ACK/ack=success, NAK/nack=failure
```

## Variables
```yaml
# All settable parameters are covered in Actions above.
# No additional variables beyond action parameters.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event documentation in source
```

## Macros
```yaml
# UNRESOLVED: no macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command format: `*command operator <value>` — space required before operator and value. Operators: `= <value>` (set), `?` (get), execute (no operator).

Wait for complete response before sending next command.

`off` and `standby` power commands are functionally equivalent.

`normal` standby = faster startup, higher power consumption. `super` standby = slower startup, lower power consumption.

`brightness` adjustment resets `red.lift`, `green.lift`, `blue.lift` to zero. `contrast` adjustment resets `red.gain`, `green.gain`, `blue.gain` to zero.

Lamp status values: 0=Off, 1=Pre cooling, 2=Ignition, 3=Ignition confirm, 4=Enable communication, 5=Delay cooling, 6=Warm up eco mode, 7=Warm up, 8=Cool down no restrike, 9=Cool down ok restrike, 10=Normal, 11=Error, 12=Ignition retry, 13=Re strike delay, 14=Enable CSI, 15=Deferred shutdown, 16=Shutdown confirm, 17=Error shutdown, 18=Lamp warmup stage 1, 19=Lamp warmup stage 2.

INSIGHT 4K Quad: lamp power 80-100 only. INSIGHT 4K Dual LED: lamp power cannot be changed.

Gamma values 10-30 correspond to gamma 1.0-3.0.

`c1`-`c9` CSC matrix range approximately ±4.000. `Y`, `Cb`, `Cr` range 0-255.

<!-- UNRESOLVED: lamp2/lamp3/lamp4 hours/strikes/serial/status — query responses not explicitly documented for lamps 2-4 -->
<!-- UNRESOLVED: 3D sync polarity values not fully decoded beyond pos/neg -->
<!-- UNRESOLVED: mcgg/tcgg data format x,y coordinates need leading zero prefix (e.g. 0.663,0.332) -->

## Provenance

```yaml
source_domains:
  - digitalprojection.co.uk
  - manualslib.com
source_urls:
  - "https://digitalprojection.co.uk/dpdownloads/Protocol/Protocol%20Guide%20INSIGHT%204K.pdf"
  - https://www.manualslib.com/manual/1276574/Digital-Projection-Insight-4k-Quad-Series.html
retrieved_at: 2026-04-30T20:23:55.028Z
last_checked_at: 2026-05-14T18:17:15.561Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:15.561Z
matched_actions: 79
action_count: 108
confidence: medium
summary: "All 79 spec actions matched source commands; transport parameters verified verbatim; semantic-id convention properly applied throughout. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "3D commands not fully decoded (value ranges partially described)."
- "no unsolicited event documentation in source"
- "no macro sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "lamp2/lamp3/lamp4 hours/strikes/serial/status — query responses not explicitly documented for lamps 2-4"
- "3D sync polarity values not fully decoded beyond pos/neg"
- "mcgg/tcgg data format x,y coordinates need leading zero prefix (e.g. 0.663,0.332)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
