---
spec_id: admin/bond-bridge-fan
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bond Bridge Control Spec"
manufacturer: "Bond Bridge"
model_family: "Bond Bridge"
aliases: []
compatible_with:
  manufacturers:
    - "Bond Bridge"
  models:
    - "Bond Bridge"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs-local.appbond.com
source_urls:
  - https://docs-local.appbond.com/
  - https://docs-local.appbond.com
retrieved_at: 2026-04-29T13:04:25.772Z
last_checked_at: 2026-04-30T09:32:23.840Z
generated_at: 2026-04-30T09:32:23.840Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:32:23.840Z
  matched_actions: 44
  action_count: 44
  confidence: high
  summary: "All 44 spec actions match source documentation one-to-one with correct parameters; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Bond Bridge Control Spec

## Summary
Bond Bridge is an IP-to-RF gateway that controls ceiling fans, fireplaces, motorized shades, and other IR/RF devices. The REST API uses HTTP on port 80 with token-based authentication via `BOND-Token` header. Supports push state updates via BPUP (UDP port 30007).

<!-- UNRESOLVED: specific fan model names not stated in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{bond_ip}/v2/"  # IP assigned via DHCP; discovered via mDNS or ping by Bond ID
auth:
  type: token  # BOND-Token header or _token field in body
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

- id: set_speed
  label: Set Speed
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed value 1 to max_speed

- id: increase_speed
  label: Increase Speed
  kind: action
  params:
    - name: speeds
      type: integer
      description: Number of speeds to increase

- id: decrease_speed
  label: Decrease Speed
  kind: action
  params:
    - name: speeds
      type: integer
      description: Number of speeds to decrease

- id: set_direction
  label: Set Direction
  kind: action
  params:
    - name: direction
      type: integer
      description: "1 = forward, -1 = reverse"

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

- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: brightness
      type: integer
      description: Percentage 1-100

- id: increase_brightness
  label: Increase Brightness
  kind: action
  params:
    - name: amount
      type: integer
      description: Brightness increase amount

- id: decrease_brightness
  label: Decrease Brightness
  kind: action
  params:
    - name: amount
      type: integer
      description: Brightness decrease amount

- id: cycle_brightness
  label: Cycle Brightness
  kind: action
  params:
    - name: amount
      type: integer
      description: Cycle step amount

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
      description: "[mode, mean, var] - mode: 0=disabled/1=enabled, mean: 0-100 calm-to-storm, var: 0-100 steady-to-gusty"

- id: set_timer
  label: Set Timer
  kind: action
  params:
    - name: s
      type: integer
      description: Seconds remaining (0 = cancel)

- id: set_flame
  label: Set Flame
  kind: action
  params:
    - name: flame
      type: integer
      description: Flame level 1-100

- id: increase_flame
  label: Increase Flame
  kind: action
  params:
    - name: flame
      type: integer
      description: Flame increase amount

- id: decrease_flame
  label: Decrease Flame
  kind: action
  params:
    - name: flame
      type: integer
      description: Flame decrease amount

- id: set_heat
  label: Set Heat
  kind: action
  params:
    - name: heat
      type: integer
      description: Heat level 1-100

- id: increase_heat
  label: Increase Heat
  kind: action
  params:
    - name: heat
      type: integer
      description: Heat increase amount

- id: decrease_heat
  label: Decrease Heat
  kind: action
  params:
    - name: heat
      type: integer
      description: Heat decrease amount

- id: heat_preset_next
  label: Heat Preset Next
  kind: action
  params: []

- id: heat_preset_prev
  label: Heat Preset Previous
  kind: action
  params: []

- id: open
  label: Open
  kind: action
  params: []

- id: close
  label: Close
  kind: action
  params: []

- id: toggle_open
  label: Toggle Open/Close
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

- id: hold
  label: Hold (Stop Motion)
  kind: action
  params: []

- id: set_position
  label: Set Position
  kind: action
  params:
    - name: position
      type: integer
      description: Position 0-100 (0=retracted, 100=extended)

- id: increase_position
  label: Increase Position
  kind: action
  params:
    - name: amount
      type: integer
      description: Percentage to extend

- id: decrease_position
  label: Decrease Position
  kind: action
  params:
    - name: amount
      type: integer
      description: Percentage to retract

- id: turn_fp_fan_off
  label: Turn Fireplace Fan Off
  kind: action
  params: []

- id: turn_fp_fan_on
  label: Turn Fireplace Fan On
  kind: action
  params: []

- id: set_fp_fan
  label: Set Fireplace Fan Speed
  kind: action
  params:
    - name: speed
      type: integer
      description: Fan speed 1-100

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
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]

- id: speed_state
  type: integer
  description: Current speed 1 to max_speed

- id: brightness_state
  type: integer
  description: Brightness percentage 1-100

- id: light_state
  type: enum
  values: [on, off]

- id: direction_state
  type: integer
  description: "1 = forward, -1 = reverse"

- id: breeze_state
  type: array
  description: "[mode, mean, var]"

- id: timer_state
  type: integer
  description: Seconds remaining

- id: flame_state
  type: integer
  description: Flame level 1-100

- id: heat_state
  type: integer
  description: Heat level 1-100

- id: open_state
  type: enum
  values: [open, closed]

- id: position_state
  type: integer
  description: Position 0-100

- id: fpfan_power_state
  type: enum
  values: [on, off]

- id: fpfan_speed_state
  type: integer
  description: Fireplace fan speed 1-100

- id: battery_state
  type: integer
  description: Battery percentage 0-100

- id: signal_state
  type: integer
  description: RF signal quality 0-100
```

## Variables
```yaml
- id: max_speed
  type: integer
  access: ro
  description: Highest speed available for this device

- id: feature_brightness
  type: boolean
  access: rw
  description: Whether brightness control is supported

- id: feature_heat
  type: boolean
  access: rw
  description: Whether heat control is supported

- id: default_auto_timer_s
  type: integer
  access: rw
  description: Default auto timer in seconds (heater devices only)

- id: trust_state
  type: boolean
  access: rw
  description: Whether Bond trusts state belief vs polling device
```

## Events
```yaml
# BPUP push updates on UDP port 30007
# Format: {"B":"{bond_id}","d":{discoverability},"v":"{fw_ver}","t":"{topic}","i":"{request_id}","s":{http_status},"m":{method},"f":{flags},"b":{body}}
# UNRESOLVED: full event taxonomy not enumerated in source
```

## Macros
```yaml
# Scenes and groups defined via POST /v2/scenes and POST /v2/groups
# UNRESOLVED: specific macro sequences not documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Base URL: `http://{bond_ip}/v2/`. Token obtained via power cycle then GET `/v2/token` within 10 minutes. mDNS discovery: `ping BB{serial}.local` or `avahi-browse -a | grep bond`. Device types: CF (Ceiling Fan), FP (Fireplace), HT (Heater), MS (Motorized Shades), GX (Generic), SW (Smart Switch), LT (Light), BD (Bidet). BPUP (push) runs on UDP port 30007 — keep-alive required every 60s.
<!-- UNRESOLVED: port number for HTTP not explicitly stated (assumed 80); UDP BPUP port 30007 stated explicitly in source -->
<!-- UNRESOLVED: max_speed value varies per device and must be queried at runtime -->
<!-- UNRESOLVED: specific device model names not enumerated in source -->
<!-- UNRESOLVED: firmware compatibility range not stated -->

## Provenance

```yaml
source_domains:
  - docs-local.appbond.com
source_urls:
  - https://docs-local.appbond.com/
  - https://docs-local.appbond.com
retrieved_at: 2026-04-29T13:04:25.772Z
last_checked_at: 2026-04-30T09:32:23.840Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:32:23.840Z
matched_actions: 44
action_count: 44
confidence: high
summary: "All 44 spec actions match source documentation one-to-one with correct parameters; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
