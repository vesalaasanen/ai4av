---
spec_id: admin/canon-bu-45h
schema_version: ai4av-public-spec-v1
revision: 1
title: "Canon BU-45H Control Spec"
manufacturer: Canon
model_family: BU-45H
aliases: []
compatible_with:
  manufacturers:
    - Canon
  models:
    - BU-45H
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - usa.canon.com
source_urls:
  - https://www.usa.canon.com/support/p/bu-45h
retrieved_at: 2026-04-30T04:33:00.884Z
last_checked_at: 2026-04-23T15:28:39.241Z
generated_at: 2026-04-23T15:28:39.241Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact command byte format/hex encoding not documented — source describes signals at the control-system level (Crestron module), not raw serial protocol"
  - "no query/response command syntax shown — only signal names and types"
  - "flow control not stated in source"
  - "cable pinout beyond \"CNSP-124\" not documented"
  - "not applicable for serial"
  - "exact values not specified in source"
  - "analog parameter ranges (min/max) not stated in source"
  - "no unsolicited notification protocol documented in source"
  - "no multi-step sequences explicitly documented in source"
  - "source mentions initialization and power commands but no explicit"
  - "raw serial command byte format and checksum not documented"
  - "analog parameter ranges and step sizes not stated"
  - "response time / latency characteristics not stated"
  - "protocol version not stated"
verification:
  verdict: verified
  checked_at: 2026-04-23T15:28:39.241Z
  matched_actions: 71
  action_count: 71
  confidence: medium
  summary: "All 71 spec actions matched literally in source; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# Canon BU-45H Control Spec

## Summary
The Canon BU-45H is a professional PTZ camera with integrated housing (wiper, washer). This spec covers its RS-232 serial control interface, which connects via an RS-232 to RS-422 converter. Commands include pan/tilt/zoom, focus, imaging parameters (gain, iris, white balance), preset memory, and auxiliary relay control.

<!-- UNRESOLVED: exact command byte format/hex encoding not documented — source describes signals at the control-system level (Crestron module), not raw serial protocol -->
<!-- UNRESOLVED: no query/response command syntax shown — only signal names and types -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  # UNRESOLVED: flow control not stated in source
  # UNRESOLVED: cable pinout beyond "CNSP-124" not documented
addressing:
  # UNRESOLVED: not applicable for serial
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable     # Camera_On/Off commands present
- ptz           # Pan, Tilt, Zoom commands present
- queryable     # Feedback signals report camera state
- levelable     # Pan/Tilt speed analog controls, gain/iris/pedestal adjustments
- presettable   # Preset memory store/recall (0-31)
```

## Actions
```yaml
- id: camera_on
  label: Camera On
  kind: action
  params: []

- id: camera_off
  label: Camera Off
  kind: action
  params: []

- id: pan_speed_increase
  label: Pan Speed Increase
  kind: action
  params: []

- id: pan_speed_decrease
  label: Pan Speed Decrease
  kind: action
  params: []

- id: pan_speed_set
  label: Set Pan Speed
  kind: action
  params:
    - name: speed
      type: integer
      description: Analog pan speed value for slider control

- id: tilt_speed_increase
  label: Tilt Speed Increase
  kind: action
  params: []

- id: tilt_speed_decrease
  label: Tilt Speed Decrease
  kind: action
  params: []

- id: tilt_speed_set
  label: Set Tilt Speed
  kind: action
  params:
    - name: speed
      type: integer
      description: Analog tilt speed value for slider control

- id: pan_left
  label: Pan Left
  kind: action
  params: []

- id: pan_right
  label: Pan Right
  kind: action
  params: []

- id: tilt_up
  label: Tilt Up
  kind: action
  params: []

- id: tilt_down
  label: Tilt Down
  kind: action
  params: []

- id: zoom_in
  label: Zoom In
  kind: action
  params: []

- id: zoom_out
  label: Zoom Out
  kind: action
  params: []

- id: zoom_in_wide
  label: Zoom In Wide
  kind: action
  params: []

- id: zoom_out_wide
  label: Zoom Out Wide
  kind: action
  params: []

- id: focus_in
  label: Focus In
  kind: action
  params: []

- id: focus_out
  label: Focus Out
  kind: action
  params: []

- id: focus_manual
  label: Focus Manual
  kind: action
  params: []

- id: focus_auto
  label: Focus Auto
  kind: action
  params: []

- id: wiper_control
  label: Wiper Control
  kind: action
  params: []
  description: Performs one reciprocating wiper operation

- id: washer_control
  label: Washer Control
  kind: action
  params: []
  description: Executes four washer cycles; washer terminal ON during first two cycles

- id: white_balance_preset_a_mem
  label: White Balance Preset A Memory
  kind: action
  params: []
  description: Sets white balance to preset A memory. Cannot revert to auto after triggered. Requires manual shooting mode.

- id: shutter_speed_set
  label: Set Shutter Speed
  kind: action
  params: []
  description: Requires manual shooting mode

- id: image_stabilizer_on
  label: Image Stabilizer On
  kind: action
  params: []

- id: image_stabilizer_off
  label: Image Stabilizer Off
  kind: action
  params: []

- id: nd_filter_set
  label: Set ND Filter
  kind: action
  params: []

- id: shooting_mode_auto
  label: Shooting Mode Auto
  kind: action
  params: []

- id: shooting_mode_manual
  label: Shooting Mode Manual
  kind: action
  params: []

- id: preset_memory_recall
  label: Preset Memory Recall/Store
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 0-31
  description: Recalls stored preset. If Preset Store is active, stores current settings instead.

- id: preset_recall_speed_up
  label: Preset Recall Speed Up
  kind: action
  params: []
  description: Decreases time to recall a stored preset

- id: preset_recall_speed_down
  label: Preset Recall Speed Down
  kind: action
  params: []
  description: Increases time to recall a stored preset

- id: preset_store_enable
  label: Preset Store Enable
  kind: action
  params: []
  description: Toggles preset store mode on/off

- id: aux_1_on
  label: Aux 1 On
  kind: action
  params: []

- id: aux_1_off
  label: Aux 1 Off
  kind: action
  params: []

- id: aux_2_on
  label: Aux 2 On
  kind: action
  params: []

- id: aux_2_off
  label: Aux 2 Off
  kind: action
  params: []

- id: aux_3_on
  label: Aux 3 On
  kind: action
  params: []

- id: aux_3_off
  label: Aux 3 Off
  kind: action
  params: []

- id: aux_4_on
  label: Aux 4 On
  kind: action
  params: []

- id: aux_4_off
  label: Aux 4 Off
  kind: action
  params: []

- id: fpu_power_on
  label: FPU Power On
  kind: action
  params: []

- id: fpu_power_off
  label: FPU Power Off
  kind: action
  params: []

- id: color_bar_on
  label: Color Bar On
  kind: action
  params: []

- id: color_bar_off
  label: Color Bar Off
  kind: action
  params: []

- id: camera_gain_set
  label: Set Camera Gain
  kind: action
  params: []

- id: knee_point_set
  label: Set Knee Point
  kind: action
  params: []
  description: Requires manual shooting mode

- id: gamma_curve_set
  label: Set Gamma Curve
  kind: action
  params: []
  description: Requires manual shooting mode

- id: color_matrix_set
  label: Set Color Matrix
  kind: action
  params: []
  description: Requires manual shooting mode

- id: black_level_set
  label: Set Black Level
  kind: action
  params: []
  description: Requires manual shooting mode

- id: h_detail_frequency_set
  label: Set H Detail Frequency
  kind: action
  params: []
  description: Requires manual shooting mode

- id: r_gain_up
  label: R Gain Up
  kind: action
  params: []
  description: Requires manual shooting mode

- id: r_gain_down
  label: R Gain Down
  kind: action
  params: []
  description: Requires manual shooting mode

- id: g_gain_up
  label: G Gain Up
  kind: action
  params: []
  description: Requires manual shooting mode

- id: g_gain_down
  label: G Gain Down
  kind: action
  params: []
  description: Requires manual shooting mode

- id: b_gain_up
  label: B Gain Up
  kind: action
  params: []
  description: Requires manual shooting mode

- id: b_gain_down
  label: B Gain Down
  kind: action
  params: []
  description: Requires manual shooting mode

- id: color_gain_up
  label: Color Gain Up
  kind: action
  params: []
  description: Requires manual shooting mode

- id: color_gain_down
  label: Color Gain Down
  kind: action
  params: []
  description: Requires manual shooting mode

- id: hue_up
  label: Hue Up
  kind: action
  params: []
  description: Requires manual shooting mode

- id: hue_down
  label: Hue Down
  kind: action
  params: []
  description: Requires manual shooting mode

- id: sharpness_up
  label: Sharpness Up
  kind: action
  params: []
  description: Requires manual shooting mode

- id: sharpness_down
  label: Sharpness Down
  kind: action
  params: []
  description: Requires manual shooting mode

- id: setup_level_up
  label: Setup Level Up
  kind: action
  params: []
  description: Requires manual shooting mode

- id: setup_level_down
  label: Setup Level Down
  kind: action
  params: []
  description: Requires manual shooting mode

- id: iris_ae_level_up
  label: Iris/AE Level Up
  kind: action
  params: []
  description: Controls Iris in manual mode, AE Level in auto mode

- id: iris_ae_level_down
  label: Iris/AE Level Down
  kind: action
  params: []
  description: Controls Iris in manual mode, AE Level in auto mode

- id: master_pedestal_up
  label: Master Pedestal Up
  kind: action
  params: []
  description: Requires manual shooting mode

- id: master_pedestal_down
  label: Master Pedestal Down
  kind: action
  params: []
  description: Requires manual shooting mode

- id: initialize_home
  label: Initialize Home
  kind: action
  params: []
  description: Initializes camera and moves to home position

- id: initialize_original
  label: Initialize Original
  kind: action
  params: []
  description: Initializes camera and moves to original position
```

## Feedbacks
```yaml
- id: camera_is_on
  type: enum
  values: [on, off]
  description: Indicates whether the camera is on or off

- id: pan_speed
  type: analog
  description: Current pan speed analog output for bargraph/slider

- id: tilt_speed
  type: analog
  description: Current tilt speed analog output for bargraph/slider

- id: pan_status
  type: digital
  description: Indicates camera pan activity status
  # UNRESOLVED: exact values not specified in source

- id: tilt_status
  type: digital
  description: Indicates camera tilt activity status
  # UNRESOLVED: exact values not specified in source

- id: zoom_status
  type: enum
  values: [busy, inactive]
  description: Camera zoom activity status

- id: focus_status
  type: enum
  values: [busy, inactive]
  description: Camera focus activity status

- id: focus_mode
  type: enum
  values: [manual, auto]
  description: Current focus mode

- id: white_balance_mode
  type: enum
  values: [auto, not_auto]
  description: White balance mode status

- id: preset_recall_speed_text
  type: string
  description: Text field indicating current preset recall speed

- id: preset_store_active
  type: digital
  description: Flashes when preset store mode is active; clears after storing

- id: r_gain
  type: analog
  description: R Gain setting sent to camera (one-way, does not reflect local camera changes)

- id: g_gain
  type: analog
  description: G Gain setting sent to camera (one-way, does not reflect local camera changes)

- id: b_gain
  type: analog
  description: B Gain setting sent to camera (one-way, does not reflect local camera changes)

- id: color_gain
  type: analog
  description: Color Gain setting sent to camera (one-way, does not reflect local camera changes)

- id: hue
  type: analog
  description: Hue setting sent to camera (one-way, does not reflect local camera changes)

- id: sharpness
  type: analog
  description: Sharpness setting sent to camera (one-way, does not reflect local camera changes)

- id: setup_level
  type: analog
  description: Setup Level setting sent to camera (one-way, does not reflect local camera changes)

- id: iris_ae_level
  type: analog
  description: Iris AE Level setting sent to camera (one-way, does not reflect local camera changes)

- id: master_pedestal
  type: analog
  description: Master Pedestal setting sent to camera (one-way, does not reflect local camera changes)

- id: camera_busy
  type: digital
  description: Indicates camera is busy initializing, powering on, or setting white balance

- id: ae_mode
  type: enum
  values: [auto, not_auto]
  description: AE mode status
```

## Variables
```yaml
# UNRESOLVED: analog parameter ranges (min/max) not stated in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions initialization and power commands but no explicit
# safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes
- Source describes signals at the control-system module level (Digital/Analog/Serial types consistent with Crestron SIMPL), not raw serial byte protocol. Actual RS-232 command framing is not documented.
- Many imaging commands (gain, knee, gamma, color matrix, black level, H detail frequency) require manual shooting mode but the source does not specify parameter ranges or step values.
- Analog feedback gauges (R/G/B Gain, Color Gain, Hue, Sharpness, Setup Level, Iris AE Level, Master Pedestal) are one-way — they reflect values sent from the controller, not values set locally on the camera.
- White Balance Preset A Memory is irreversible — once triggered, auto white balance cannot be restored.
- Requires RS-232 to RS-422 converter and RJ-45F to DB-9M converter for camera connection. Specified cable: CNSP-124.
<!-- UNRESOLVED: raw serial command byte format and checksum not documented -->
<!-- UNRESOLVED: analog parameter ranges and step sizes not stated -->
<!-- UNRESOLVED: response time / latency characteristics not stated -->
<!-- UNRESOLVED: protocol version not stated -->

## Provenance

```yaml
source_domains:
  - usa.canon.com
source_urls:
  - https://www.usa.canon.com/support/p/bu-45h
retrieved_at: 2026-04-30T04:33:00.884Z
last_checked_at: 2026-04-23T15:28:39.241Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:28:39.241Z
matched_actions: 71
action_count: 71
confidence: medium
summary: "All 71 spec actions matched literally in source; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact command byte format/hex encoding not documented — source describes signals at the control-system level (Crestron module), not raw serial protocol"
- "no query/response command syntax shown — only signal names and types"
- "flow control not stated in source"
- "cable pinout beyond \"CNSP-124\" not documented"
- "not applicable for serial"
- "exact values not specified in source"
- "analog parameter ranges (min/max) not stated in source"
- "no unsolicited notification protocol documented in source"
- "no multi-step sequences explicitly documented in source"
- "source mentions initialization and power commands but no explicit"
- "raw serial command byte format and checksum not documented"
- "analog parameter ranges and step sizes not stated"
- "response time / latency characteristics not stated"
- "protocol version not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
