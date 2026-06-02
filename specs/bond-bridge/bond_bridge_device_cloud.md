---
spec_id: admin/bond_bridge-device
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bond Bridge Device Control Spec"
manufacturer: "Bond Bridge"
model_family: "Bond Bridge Device"
aliases: []
compatible_with:
  manufacturers:
    - "Bond Bridge"
  models:
    - "Bond Bridge Device"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs-local.appbond.com
  - github.com
source_urls:
  - https://docs-local.appbond.com/
  - https://github.com/bondhome/api-v2
retrieved_at: 2026-04-29T12:56:15.451Z
last_checked_at: 2026-04-30T09:32:22.191Z
generated_at: 2026-04-30T09:32:22.191Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "port number not explicitly stated in source — no default port stated for HTTP"
  - "explicit push event types not enumerated in source - consult BPUP topic paths for subscribed events"
  - "no safety warnings or interlock procedures in source"
  - "HTTP port not explicitly stated in source"
  - "MQTT broker address/port not stated"
  - "firmware version compatibility not stated"
  - "voltage/power specifications not in source"
verification:
  verdict: verified
  checked_at: 2026-04-30T09:32:22.191Z
  matched_actions: 57
  action_count: 57
  confidence: medium
  summary: "All 57 spec actions matched to source feature sections with correct semantic mappings; all transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Bond Bridge Device Control Spec

## Summary
Bond Bridge is a hub device that bridges RF remote-controlled fans, shades, fireplaces, and other appliances to HTTP/REST, MQTT, and BPUP (UDP) protocols. The Local API uses unencrypted HTTP with token-based authentication. Token obtained from `/v2/token` endpoint (available within 10 minutes of power cycle). Supports TCP HTTP, UDP BPUP, and MQTT.

<!-- UNRESOLVED: port number not explicitly stated in source — no default port stated for HTTP -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  base_url: http://{bond_ip}  # inferred: IP discovered via mDNS (ping BBxxxxx.local) or avahi-browse/dns-sd
auth:
  type: token  # token via BOND-Token HTTP header or _token body field
  token_endpoint: /v2/token  # token retrievable within 10 min of power cycle
  token_header: BOND-Token
```

## Traits
```yaml
- powerable  # TurnOn, TurnOff, TogglePower actions present
- routable  # Open, Close, Raise, Lower, Retract, Extend for shades/motors
- queryable  # state, properties, device list endpoints present
- levelable  # SetSpeed, SetBrightness, SetPosition, SetHeat, SetFlame actions present
```

## Actions
```yaml
# Power
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

# Speed
- id: set_speed
  label: Set Speed
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed value
- id: increase_speed
  label: Increase Speed
  kind: action
  params:
    - name: speeds
      type: integer
      description: Amount to increase
- id: decrease_speed
  label: Decrease Speed
  kind: action
  params:
    - name: speeds
      type: integer
      description: Amount to decrease

# Brightness
- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: brightness
      type: integer
      description: Brightness percentage (1-100)
- id: increase_brightness
  label: Increase Brightness
  kind: action
  params:
    - name: amount
      type: integer
      description: Amount to increase
- id: decrease_brightness
  label: Decrease Brightness
  kind: action
  params:
    - name: amount
      type: integer
      description: Amount to decrease (minimum 1%)
- id: cycle_brightness
  label: Cycle Brightness
  kind: action
  params:
    - name: amount
      type: integer
      description: Cycle amount

# Light
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

# Direction
- id: set_direction
  label: Set Direction
  kind: action
  params:
    - name: direction
      type: integer
      description: "1=forward, -1=reverse"
- id: toggle_direction
  label: Toggle Direction
  kind: action
  params: []

# Timer
- id: set_timer
  label: Set Timer
  kind: action
  params:
    - name: s
      type: integer
      description: Seconds; turns on if off; zero cancels

# Breeze
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
      description: "[mode, mean, var] - mode 0=disabled/1=enabled, mean 0-100, var 0-100"

# Shade/Motor control
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

# Position
- id: set_position
  label: Set Position
  kind: action
  params:
    - name: position
      type: integer
      description: Position percentage (0-100)

# Tilt
- id: set_tilt_position
  label: Set Tilt Position
  kind: action
  params:
    - name: position
      type: integer
      description: Tilt degrees
- id: toggle_tilt
  label: Toggle Tilt
  kind: action
  params: []

# Color Temp
- id: set_color_temp
  label: Set Color Temperature
  kind: action
  params:
    - name: int
      type: integer
      description: Color temperature in Kelvin
- id: increase_color_temp
  label: Increase Color Temperature
  kind: action
  params:
    - name: int
      type: integer
      description: Amount to increase
- id: decrease_color_temp
  label: Decrease Color Temperature
  kind: action
  params:
    - name: int
      type: integer
      description: Amount to decrease

# Color (HSV)
- id: set_hsv
  label: Set HSV Color
  kind: action
  params:
    - name: h
      type: integer
      description: Hue (0-359)
    - name: s
      type: integer
      description: Saturation (0-100)
    - name: v
      type: integer
      description: Value (0-100)
- id: cycle_color
  label: Cycle Color
  kind: action
  params:
    - name: amount
      type: integer
      description: Hue increase amount
- id: cycle_color_preset
  label: Cycle Color Preset
  kind: action
  params: []

# Heat / Flame
- id: set_heat
  label: Set Heat
  kind: action
  params:
    - name: heat
      type: integer
      description: Heat level (1-100)
- id: increase_heat
  label: Increase Heat
  kind: action
  params:
    - name: heat
      type: integer
      description: Amount to increase
- id: decrease_heat
  label: Decrease Heat
  kind: action
  params:
    - name: heat
      type: integer
      description: Amount to decrease
- id: heat_preset_next
  label: Heat Preset Next
  kind: action
  params: []
- id: heat_preset_prev
  label: Heat Preset Previous
  kind: action
  params: []

- id: set_flame
  label: Set Flame
  kind: action
  params:
    - name: flame
      type: integer
      description: Flame level (1-100)
- id: increase_flame
  label: Increase Flame
  kind: action
  params:
    - name: flame
      type: integer
      description: Amount to increase
- id: decrease_flame
  label: Decrease Flame
  kind: action
  params:
    - name: flame
      type: integer
      description: Amount to decrease

# FP Fan
- id: turn_fp_fan_on
  label: Turn FP Fan On
  kind: action
  params: []
- id: turn_fp_fan_off
  label: Turn FP Fan Off
  kind: action
  params: []
- id: set_fp_fan
  label: Set FP Fan Speed
  kind: action
  params:
    - name: speed
      type: integer
      description: FP Fan speed (1-100)

# Hold / Stop / Preset
- id: hold
  label: Hold
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

# Pair
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

# Dimmer
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
- id: device_list
  type: object
  description: List of device IDs - GET /v2/devices returns {"_":"hash","device_id":{"_":"hash"}}
- id: device_state
  type: object
  description: "State variables: power, speed, light, brightness, timer, breeze, direction, etc."
- id: device_properties
  type: object
  description: "Device properties: trust_state, addr, freq, bps, zero_gap, feature_light, etc."
- id: token_response
  type: object
  description: "Token endpoint response: locked, pin_attempts_left, token, nonce"
```

## Variables
```yaml
# Settable state via PATCH /v2/devices/{id}/state:
- id: power
  type: integer
  values: [0, 1]
- id: speed
  type: integer
  description: 1 to max_speed
- id: light
  type: integer
  values: [0, 1]
- id: brightness
  type: integer
  description: 1-100 percentage
- id: timer
  type: integer
  description: Seconds remaining, 0 = no timer
- id: direction
  type: integer
  values: [1, -1]
- id: breeze
  type: array
  description: "[mode, mean, var]"
- id: position
  type: integer
  description: 0-100 for shades
- id: tilt_position
  type: integer
  description: Degrees
- id: color_temp
  type: integer
  description: Kelvin
- id: hsv
  type: object
  description: "{h: 0-359, s: 0-100, v: 0-100}"
- id: heat
  type: integer
  description: 1-100
- id: flame
  type: integer
  description: 1-100
- id: battery
  type: integer
  description: 0-100 percentage
- id: signal
  type: integer
  description: 0-100 signal quality
```

## Events
```yaml
# BPUP (UDP push on port 30007):
# Keep-Alive: send newline; subscription ack: {"B":"ZZBL12345"}\n
# Update format: {"B":"bond_id","d":discoverability,"v":"fw_ver","t":"topic","i":"request_id","s":200,"m":method,"f":flags,"b":body}\n
#
# MQTT: subscribes v2/<bond_id>/down/#, publishes v2/<bond_id>/up/<subtopic>
# Same message format as BPUP.
#
# Discoverability values:
#   0 = not discoverable (Bond on account)
#   1 = setup mode (not on account, green light ring)
#   2 = SOS mode (on account but cloud connection problem)
#
# UNRESOLVED: explicit push event types not enumerated in source - consult BPUP topic paths for subscribed events
```

## Macros
```yaml
# Scene execution: PUT /v2/scenes/{scene_id}/run
# Body: {"name":"Privacy","actors":[{"device":"aabbccdd","action":"TurnOn"},{"group":"11223344","action":"SetBrightness","argument":50}]}
# Blocks until all member devices execute action (timeout ≤7 seconds).
#
# Schedule (Sked): POST /v2/devices/{device_id}/skeds
# Body: {"enabled":true,"action":"SetBrightness","argument":80,"seconds":-3600,"days_of_week":[false,true,true,true,true,false],"mark":"sunset"}
# Requires sys/time.tz for midnight mark, sys/time.grid+sys/time.tz for solar marks.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

**Token acquisition:** Token available from `/v2/token` within 10 minutes of power cycle. Token required for all endpoints except `/v2/sys/version` and `/v2/token`. Provide via `BOND-Token` HTTP header or `_token` field in request body.

**IP discovery:** mDNS — `ping BBxxxxx.local`, `avahi-browse -a | grep bond` (Linux), `dns-sd -B _bond._tcp .` (MacOS).

**64-bit IDs:** v3.0.0+ uses 64-bit (16-hex) resource identifiers. API accepts both 32-bit (v2.x) and 64-bit formats.

**Hash tree:** Nodes have `_` hash (32-bit) changed on modification. Child values replaced with hashes when not expanded.

**Request ID:** `_request_id` (HTTP) or `i` (BPUP/MQTT) enables retry-safe non-idempotent requests (PUT, POST, PATCH, DELETE).

**Action timeout:** PUT `/v2/devices/{device_id}/actions/{action_name}` blocks up to 7 seconds for confirmation.

**BPUP keep-alive:** Send newline every 60 seconds; Bond stops push after 125 seconds without keep-alive. Port 30007.

<!-- UNRESOLVED: HTTP port not explicitly stated in source -->
<!-- UNRESOLVED: MQTT broker address/port not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: voltage/power specifications not in source -->

## Provenance

```yaml
source_domains:
  - docs-local.appbond.com
  - github.com
source_urls:
  - https://docs-local.appbond.com/
  - https://github.com/bondhome/api-v2
retrieved_at: 2026-04-29T12:56:15.451Z
last_checked_at: 2026-04-30T09:32:22.191Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:32:22.191Z
matched_actions: 57
action_count: 57
confidence: medium
summary: "All 57 spec actions matched to source feature sections with correct semantic mappings; all transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "port number not explicitly stated in source — no default port stated for HTTP"
- "explicit push event types not enumerated in source - consult BPUP topic paths for subscribed events"
- "no safety warnings or interlock procedures in source"
- "HTTP port not explicitly stated in source"
- "MQTT broker address/port not stated"
- "firmware version compatibility not stated"
- "voltage/power specifications not in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
