---
spec_id: admin/bond_bridge-shades
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bond Bridge Shades Control Spec"
manufacturer: "Bond Bridge"
model_family: "Bond Bridge Shades"
aliases: []
compatible_with:
  manufacturers:
    - "Bond Bridge"
  models:
    - "Bond Bridge Shades"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs-local.appbond.com
  - tech.bndh.io
source_urls:
  - https://docs-local.appbond.com
  - https://tech.bndh.io/technical/hex-codes
  - https://tech.bndh.io/technical/ethernet
retrieved_at: 2026-04-29T13:04:25.772Z
last_checked_at: 2026-06-02T22:04:40.298Z
generated_at: 2026-06-02T22:04:40.298Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "port 80 assumed for HTTP; source uses http:// URLs without explicit port declaration"
  - "no safety warnings or interlock procedures in source"
  - "HTTP port number not explicitly stated; UNRESOLVED: firmware version compatibility not stated"
  - "voltage/power specs not applicable to hub device"
  - "exact error recovery sequences not documented in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:04:40.298Z
  matched_actions: 81
  action_count: 81
  confidence: medium
  summary: "All 81 spec actions traced to source (dip-safe re-verify). (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Bond Bridge Shades Control Spec

## Summary
Bond Bridge hub provides REST HTTP API for controlling motorized shades and other devices. Communication uses token-based auth via `BOND-Token` header. Supports device types MS (Motorized Shades) with subtypes ROLLER, SHEER, AWNING. Push state updates via BPUP UDP protocol on port 30007.

<!-- UNRESOLVED: port 80 assumed for HTTP; source uses http:// URLs without explicit port declaration -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  base_url: http://{bond_ip}/v2  # IP discovered via mDNS (e.g., ping BB18038.local)
auth:
  type: token  # token via BOND-Token header or _token body field
```

**BPUP (UDP push):**
```yaml
protocols:
  - udp
addressing:
  port: 30007
auth:
  type: none  # BPUP uses subscription handshake, no token
```

## Traits
```yaml
- powerable  # TurnOn/TurnOff/TogglePower for fan/light devices
- routable  # Open/Close/Raise/Lower/Retract/Extend for shades
- queryable  # Get device state via GET /v2/devices/{id}/state
- levelable  # SetPosition, SetBrightness for shades/lights
```

## Actions
```yaml
- id: open
  label: Open
  kind: action
  params: []
- id: close
  label: Close
  kind: action
  params: []
- id: toggle_open
  label: Toggle Open
  kind: action
  params: []
- id: raise
  label: Raise
  kind: action
  params: []
- id: lower
  label: Lower
  kind: action
  params: []
- id: retract
  label: Retract
  kind: action
  params: []
- id: extend
  label: Extend
  kind: action
  params: []
- id: set_position
  label: Set Position
  kind: action
  params:
    - name: position
      type: integer
      description: Position percentage (0=retracted, 100=extended)
- id: increase_position
  label: Increase Position
  kind: action
  params:
    - name: amount
      type: integer
      description: Amount to increase position
- id: decrease_position
  label: Decrease Position
  kind: action
  params:
    - name: amount
      type: integer
      description: Amount to decrease position
- id: set_tilt_position
  label: Set Tilt Position
  kind: action
  params:
    - name: position
      type: integer
      description: Tilt position in degrees
- id: toggle_tilt
  label: Toggle Tilt
  kind: action
  params: []
- id: stop
  label: Stop
  kind: action
  params: []
- id: preset
  label: Preset
  kind: action
  params: []
- id: hold
  label: Hold
  kind: action
  params: []
# TDBU dual-tube shade actions
- id: set_upper_rail_position
  label: Set Upper Rail Position
  kind: action
  params:
    - name: position
      type: integer
      description: Upper rail position percentage
- id: set_lower_rail_position
  label: Set Lower Rail Position
  kind: action
  params:
    - name: position
      type: integer
      description: Lower rail position percentage
- id: raise_upper_rail
  label: Raise Upper Rail
  kind: action
  params: []
- id: lower_upper_rail
  label: Lower Upper Rail
  kind: action
  params: []
- id: raise_lower_rail
  label: Raise Lower Rail
  kind: action
  params: []
- id: lower_lower_rail
  label: Lower Lower Rail
  kind: action
  params: []
# SheerBlackoutDuo
- id: set_blackout_position
  label: Set Blackout Position
  kind: action
  params:
    - name: position
      type: integer
      description: Blackout shade position 0-100
- id: set_sheer_position
  label: Set Sheer Position
  kind: action
  params:
    - name: position
      type: integer
      description: Sheer shade position 0-100
- id: turn_on
  label: Turn On
  kind: action
  params: []
- id: turn_off
  label: Turn Off
  kind: action
  params: []
- id: toggle_power
  label: Toggle Power
  kind: action
  params: []
- id: set_timer
  label: Set Timer
  kind: action
  params:
    - name: s
      type: integer
- id: set_speed
  label: Set Speed
  kind: action
  params:
    - name: speed
      type: integer
- id: increase_speed
  label: Increase Speed
  kind: action
  params:
    - name: speeds
      type: integer
- id: decrease_speed
  label: Decrease Speed
  kind: action
  params:
    - name: speeds
      type: integer
- id: breeze_on
  label: Breeze On
  kind: action
  params: []
- id: breeze_off
  label: Breeze Off
  kind: action
  params: []
- id: set_breeze
  label: Set Breeze
  kind: action
  params:
    - name: breeze
      type: array
- id: set_direction
  label: Set Direction
  kind: action
  params:
    - name: direction
      type: integer
- id: toggle_direction
  label: Toggle Direction
  kind: action
  params: []
- id: turn_light_on
  label: Turn Light On
  kind: action
  params: []
- id: turn_light_off
  label: Turn Light Off
  kind: action
  params: []
- id: toggle_light
  label: Toggle Light
  kind: action
  params: []
- id: turn_up_light_on
  label: Turn Up Light On
  kind: action
  params: []
- id: turn_down_light_on
  label: Turn Down Light On
  kind: action
  params: []
- id: turn_up_light_off
  label: Turn Up Light Off
  kind: action
  params: []
- id: turn_down_light_off
  label: Turn Down Light Off
  kind: action
  params: []
- id: toggle_up_light
  label: Toggle Up Light
  kind: action
  params: []
- id: toggle_down_light
  label: Toggle Down Light
  kind: action
  params: []
- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: brightness
      type: integer
- id: increase_brightness
  label: Increase Brightness
  kind: action
  params:
    - name: amount
      type: integer
- id: decrease_brightness
  label: Decrease Brightness
  kind: action
  params:
    - name: amount
      type: integer
- id: cycle_brightness
  label: Cycle Brightness
  kind: action
  params:
    - name: amount
      type: integer
- id: set_up_light_brightness
  label: Set Up Light Brightness
  kind: action
  params:
    - name: brightness
      type: integer
- id: set_down_light_brightness
  label: Set Down Light Brightness
  kind: action
  params:
    - name: brightness
      type: integer
- id: increase_up_light_brightness
  label: Increase Up Light Brightness
  kind: action
  params:
    - name: amount
      type: integer
- id: increase_down_light_brightness
  label: Increase Down Light Brightness
  kind: action
  params:
    - name: amount
      type: integer
- id: decrease_up_light_brightness
  label: Decrease Up Light Brightness
  kind: action
  params:
    - name: amount
      type: integer
- id: decrease_down_light_brightness
  label: Decrease Down Light Brightness
  kind: action
  params:
    - name: amount
      type: integer
- id: set_color_temp
  label: Set Color Temp
  kind: action
  params:
    - name: color_temp
      type: integer
- id: increase_color_temp
  label: Increase Color Temp
  kind: action
  params:
    - name: amount
      type: integer
- id: decrease_color_temp
  label: Decrease Color Temp
  kind: action
  params:
    - name: amount
      type: integer
- id: cycle_color_temp
  label: Cycle Color Temp
  kind: action
  params:
    - name: amount
      type: integer
- id: cycle_color_temp_preset
  label: Cycle Color Temp Preset
  kind: action
  params: []
- id: set_hsv
  label: Set HSV
  kind: action
  params:
    - name: h
      type: integer
    - name: s
      type: integer
    - name: v
      type: integer
- id: cycle_color_preset
  label: Cycle Color Preset
  kind: action
  params: []
- id: cycle_color
  label: Cycle Color
  kind: action
  params:
    - name: amount
      type: integer
- id: set_flame
  label: Set Flame
  kind: action
  params:
    - name: flame
      type: integer
- id: increase_flame
  label: Increase Flame
  kind: action
  params:
    - name: flame
      type: integer
- id: decrease_flame
  label: Decrease Flame
  kind: action
  params:
    - name: flame
      type: integer
- id: set_heat
  label: Set Heat
  kind: action
  params:
    - name: heat
      type: integer
- id: increase_heat
  label: Increase Heat
  kind: action
  params:
    - name: heat
      type: integer
- id: decrease_heat
  label: Decrease Heat
  kind: action
  params:
    - name: heat
      type: integer
- id: heat_preset_next
  label: Heat Preset Next
  kind: action
  params: []
- id: heat_preset_prev
  label: Heat Preset Prev
  kind: action
  params: []
- id: turn_fp_fan_on
  label: Turn Fp Fan On
  kind: action
  params: []
- id: turn_fp_fan_off
  label: Turn Fp Fan Off
  kind: action
  params: []
- id: set_fp_fan
  label: Set Fp Fan
  kind: action
  params:
    - name: speed
      type: integer
- id: pair
  label: Pair
  kind: action
  params: []
- id: unpair
  label: Unpair
  kind: action
  params: []
- id: unpair_self
  label: Unpair Self
  kind: action
  params: []
- id: start_dimmer
  label: Start Dimmer
  kind: action
  params: []
- id: start_up_light_dimmer
  label: Start Up Light Dimmer
  kind: action
  params: []
- id: start_down_light_dimmer
  label: Start Down Light Dimmer
  kind: action
  params: []
- id: start_increasing_brightness
  label: Start Increasing Brightness
  kind: action
  params: []
- id: start_decreasing_brightness
  label: Start Decreasing Brightness
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: device_state
  type: object
  properties:
    - name: power
      type: integer
      values: [0, 1]
    - name: speed
      type: integer
    - name: brightness
      type: integer
      range: [1, 100]
    - name: light
      type: integer
      values: [0, 1]
    - name: open
      type: integer
      values: [0, 1]
    - name: position
      type: integer
      range: [0, 100]
    - name: tilt_position
      type: integer
    - name: breeze
      type: array
    - name: timer
      type: integer
```

## Variables
```yaml
- id: position
  type: integer
  range: [0, 100]
  description: Shade position (0=retracted, 100=extended)
- id: tilt_position
  type: integer
  description: Tilt angle in degrees
- id: open
  type: enum
  values: [0, 1]
  description: Open state (1=open, 0=closed)
- id: upper_rail_position
  type: integer
  range: [0, 100]
  description: TDBU upper rail position
- id: lower_rail_position
  type: integer
  range: [0, 100]
  description: TDBU lower rail position
- id: blackout_position
  type: integer
  range: [0, 100]
  description: SheerBlackoutDuo blackout position
- id: sheer_position
  type: integer
  range: [0, 100]
  description: SheerBlackoutDuo sheer position
- id: course_time
  type: integer
  description: Milliseconds for full open/close, -1=unconfigured
- id: open_raises
  type: boolean
  description: Whether Open action raises the shade
- id: open_retracts
  type: boolean
  description: Whether Open action retracts the shade
- id: min_tilt
  type: integer
  description: Minimum tilt degrees (default 0)
- id: max_tilt
  type: integer
  description: Maximum tilt degrees (default 90)
```

## Events
```yaml
# BPUP push updates - device state changes published to UDP port 30007
- id: bpup_state_update
  type: object
  description: Unsolicited device state update via BPUP UDP protocol
```

## Macros
```yaml
# Scene execution
- id: run_scene
  label: Run Scene
  params:
    - name: scene_id
      type: string
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Device discovery via mDNS: `ping BB18038.local` or `avahi-browse -a | grep bond`. Token obtained from `/v2/token` endpoint (valid 10 minutes after power cycle). BPUP keep-alive required every 60 seconds; Bond stops sending after 125 seconds without keep-alive. Action endpoints block up to 7 seconds for confirmation.

<!-- UNRESOLVED: HTTP port number not explicitly stated; UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: voltage/power specs not applicable to hub device -->
<!-- UNRESOLVED: exact error recovery sequences not documented in source -->

## Provenance

```yaml
source_domains:
  - docs-local.appbond.com
  - tech.bndh.io
source_urls:
  - https://docs-local.appbond.com
  - https://tech.bndh.io/technical/hex-codes
  - https://tech.bndh.io/technical/ethernet
retrieved_at: 2026-04-29T13:04:25.772Z
last_checked_at: 2026-06-02T22:04:40.298Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:04:40.298Z
matched_actions: 81
action_count: 81
confidence: medium
summary: "All 81 spec actions traced to source (dip-safe re-verify). (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "port 80 assumed for HTTP; source uses http:// URLs without explicit port declaration"
- "no safety warnings or interlock procedures in source"
- "HTTP port number not explicitly stated; UNRESOLVED: firmware version compatibility not stated"
- "voltage/power specs not applicable to hub device"
- "exact error recovery sequences not documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
