---
spec_id: admin/yeelight-yeelight_keypad
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yeelight WiFi Light Control Spec"
manufacturer: Yeelight
model_family: "Yeelight Smart LED (generic)"
aliases: []
compatible_with:
  manufacturers:
    - Yeelight
  models:
    - "Yeelight Smart LED (generic)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - yeelight.com
  - open-console.yeelight.com
source_urls:
  - https://www.yeelight.com/download/Yeelight_Inter-Operation_Spec.pdf
  - https://open-console.yeelight.com/commerical-lighting-open-platform-docs-en.html
  - https://open-console.yeelight.com/
retrieved_at: 2026-05-22T03:35:06.925Z
last_checked_at: 2026-07-22T08:53:49.829Z
generated_at: 2026-07-22T08:53:49.829Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific keypad device model commands not present; source is generic Yeelight bulb spec"
  - "specific event triggering conditions not enumerated in source"
  - "no explicit named macros in source"
  - "no safety warnings or interlock procedures in source"
  - "voltage/power specs not stated in source"
  - "specific keypad model details not in source; using generic Yeelight bulb spec"
verification:
  verdict: verified
  checked_at: 2026-07-22T08:53:49.829Z
  matched_actions: 35
  action_count: 35
  confidence: medium
  summary: "All 35 spec actions matched literally with their method counterparts in the source command table; transport parameters verified; perfect one-to-one coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Yeelight WiFi Light Control Spec

## Summary
Yeelight smart LED bulbs expose a TCP-based JSON control protocol on port 55443. Devices are discovered via SSDP multicast (UDP 239.255.255.250:1982). The protocol supports power, color, brightness, color temperature, and scenes. This spec covers Yeelight smart bulbs (models: mono, color, stripe, ceiling, bslamp).

<!-- UNRESOLVED: specific keypad device model commands not present; source is generic Yeelight bulb spec -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 55443  # inferred from Location: yeelight://...:55443 in discovery response
auth:
  type: none  # inferred: no auth procedure in source; direct telnet access documented
```

## Traits
```yaml
- powerable       # set_power, toggle present
- queryable       # get_prop, cron_get present
- levelable       # set_bright, set_ct_abx, set_rgb, set_hsv, adjust_bright, adjust_ct, adjust_color present
```

## Actions
```yaml
- id: get_prop
  label: Get Property
  kind: action
  params:
    - name: props
      type: array
      description: List of property names to retrieve

- id: set_power
  label: Set Power
  kind: action
  params:
    - name: power
      type: string
      description: "on" or "off"
    - name: effect
      type: string
      description: "smooth" or "sudden"
    - name: duration
      type: integer
      description: Transition time in milliseconds
    - name: mode
      type: integer
      description: "0: normal, 1: CT mode, 2: RGB mode, 3: HSV mode, 4: color flow, 5: night light"
      required: false

- id: toggle
  label: Toggle
  kind: action
  params: []

- id: set_bright
  label: Set Brightness
  kind: action
  params:
    - name: brightness
      type: integer
      description: 1-100 (percentage)
    - name: effect
      type: string
      description: "smooth" or "sudden"
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: set_ct_abx
  label: Set Color Temperature
  kind: action
  params:
    - name: ct_value
      type: integer
      description: Color temperature in Kelvin (1700-6500)
    - name: effect
      type: string
      description: "smooth" or "sudden"
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: set_rgb
  label: Set RGB Color
  kind: action
  params:
    - name: rgb_value
      type: integer
      description: RGB value (0-16777215)
    - name: effect
      type: string
      description: "smooth" or "sudden"
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: set_hsv
  label: Set HSV Color
  kind: action
  params:
    - name: hue
      type: integer
      description: Hue (0-359)
    - name: sat
      type: integer
      description: Saturation (0-100)
    - name: effect
      type: string
      description: "smooth" or "sudden"
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: set_default
  label: Save Current State as Default
  kind: action
  params: []

- id: start_cf
  label: Start Color Flow
  kind: action
  params:
    - name: count
      type: integer
      description: Number of state changes (0 = infinite)
    - name: action
      type: integer
      description: "0: recover to previous, 1: stay, 2: turn off"
    - name: flow_expression
      type: string
      description: "Comma-separated flow tuples: duration,mode,value,brightness"

- id: stop_cf
  label: Stop Color Flow
  kind: action
  params: []

- id: set_scene
  label: Set Scene
  kind: action
  params:
    - name: class
      type: string
      description: "color, hsv, ct, cf, auto_delay_off"
    - name: val1
      type: integer
    - name: val2
      type: integer
    - name: val3
      type: integer
      required: false

- id: cron_add
  label: Add Cron Job
  kind: action
  params:
    - name: type
      type: integer
      description: "0 = power off timer"
    - name: value
      type: integer
      description: Timer length in minutes

- id: cron_get
  label: Get Cron Job
  kind: action
  params:
    - name: type
      type: integer
      description: "0 = power off timer"

- id: cron_del
  label: Delete Cron Job
  kind: action
  params:
    - name: type
      type: integer
      description: "0 = power off timer"

- id: set_adjust
  label: Adjust Property
  kind: action
  params:
    - name: action
      type: string
      description: "increase, decrease, circle"
    - name: prop
      type: string
      description: "bright, ct, color"

- id: set_music
  label: Set Music Mode
  kind: action
  params:
    - name: action
      type: integer
      description: "0: off, 1: on"
    - name: host
      type: string
      description: Music server IP address
      required: false
    - name: port
      type: integer
      description: Music server TCP port
      required: false

- id: set_name
  label: Set Device Name
  kind: action
  params:
    - name: name
      type: string
      description: Device name (max 64 bytes)

- id: adjust_bright
  label: Adjust Brightness
  kind: action
  params:
    - name: percentage
      type: integer
      description: Adjustment percentage (-100 to 100)
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: adjust_ct
  label: Adjust Color Temperature
  kind: action
  params:
    - name: percentage
      type: integer
      description: Adjustment percentage (-100 to 100)
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: adjust_color
  label: Adjust Color
  kind: action
  params:
    - name: percentage
      type: integer
      description: Adjustment percentage (-100 to 100)
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: dev_toggle
  label: Toggle Main and Background Light
  kind: action
  params: []
- id: bg_set_rgb
  label: Set Background Light RGB Color
  kind: action
  params:
    - name: rgb_value
      type: integer
      description: "RGB value (0-16777215); refer to set_rgb method"
    - name: effect
      type: string
      description: "smooth" or "sudden"
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: bg_set_hsv
  label: Set Background Light HSV Color
  kind: action
  params:
    - name: hue
      type: integer
      description: "Hue (0-359); refer to set_hsv method"
    - name: sat
      type: integer
      description: Saturation (0-100)
    - name: effect
      type: string
      description: "smooth" or "sudden"
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: bg_set_ct_abx
  label: Set Background Light Color Temperature
  kind: action
  params:
    - name: ct_value
      type: integer
      description: "Color temperature in Kelvin (1700-6500); refer to set_ct_abx method"
    - name: effect
      type: string
      description: "smooth" or "sudden"
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: bg_start_cf
  label: Start Background Light Color Flow
  kind: action
  params:
    - name: count
      type: integer
      description: "Number of state changes (0 = infinite); refer to start_cf method"
    - name: action
      type: integer
      description: "0: recover to previous, 1: stay, 2: turn off"
    - name: flow_expression
      type: string
      description: "Comma-separated flow tuples: duration,mode,value,brightness"

- id: bg_stop_cf
  label: Stop Background Light Color Flow
  kind: action
  params: []

- id: bg_set_scene
  label: Set Background Light Scene
  kind: action
  params:
    - name: class
      type: string
      description: "color, hsv, ct, cf, auto_delay_off; refer to set_scene method"
    - name: val1
      type: integer
    - name: val2
      type: integer
    - name: val3
      type: integer
      required: false

- id: bg_set_default
  label: Save Background Light State as Default
  kind: action
  params: []

- id: bg_set_power
  label: Set Background Light Power
  kind: action
  params:
    - name: power
      type: string
      description: "on" or "off"
    - name: effect
      type: string
      description: "smooth" or "sudden"
    - name: duration
      type: integer
      description: Transition time in milliseconds
    - name: mode
      type: integer
      description: UNRESOLVED
      required: false

- id: bg_set_bright
  label: Set Background Light Brightness
  kind: action
  params:
    - name: brightness
      type: integer
      description: "1-100 (percentage); refer to set_bright method"
    - name: effect
      type: string
      description: "smooth" or "sudden"
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: bg_set_adjust
  label: Adjust Background Light Property
  kind: action
  params:
    - name: action
      type: string
      description: "increase, decrease, circle"
    - name: prop
      type: string
      description: "bright, ct, color"

- id: bg_toggle
  label: Toggle Background Light
  kind: action
  params: []

- id: bg_adjust_bright
  label: Adjust Background Light Brightness
  kind: action
  params:
    - name: percentage
      type: integer
      description: Adjustment percentage (-100 to 100)
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: bg_adjust_ct
  label: Adjust Background Light Color Temperature
  kind: action
  params:
    - name: percentage
      type: integer
      description: Adjustment percentage (-100 to 100)
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: bg_adjust_color
  label: Adjust Background Light Color
  kind: action
  params:
    - name: percentage
      type: integer
      description: Adjustment percentage (-100 to 100)
    - name: duration
      type: integer
      description: Transition time in milliseconds
```

## Feedbacks
```yaml
- id: command_result
  type: object
  properties:
    - name: id
      type: integer
      description: Echoed from command
    - name: result
      type: array
      description: "Array: ['ok'] on success, or property values for get_prop"
    - name: error
      type: object
      description: "Object with code and message on failure"

- id: property_notification
  type: object
  properties:
    - name: method
      type: string
      description: Always "props"
    - name: params
      type: object
      description: Key-value pairs of changed properties
```

## Variables
```yaml
- id: power
  type: enum
  values: [on, off]
  description: Power state

- id: bright
  type: integer
  range: [1, 100]
  description: Brightness percentage

- id: ct
  type: integer
  range: [1700, 6500]
  description: Color temperature in Kelvin

- id: rgb
  type: integer
  range: [0, 16777215]
  description: RGB color value

- id: hue
  type: integer
  range: [0, 359]
  description: Hue value

- id: sat
  type: integer
  range: [0, 100]
  description: Saturation value

- id: color_mode
  type: enum
  values: [1, 2, 3]
  description: "1: RGB mode, 2: CT mode, 3: HSV mode"

- id: flowing
  type: enum
  values: [0, 1]
  description: "0: no flow running, 1: color flow running"

- id: delayoff
  type: integer
  range: [1, 60]
  description: Sleep timer remaining minutes

- id: music_on
  type: enum
  values: [0, 1]
  description: "0: music mode off, 1: music mode on"

- id: name
  type: string
  description: Device name

- id: active_mode
  type: enum
  values: [0, 1]
  description: "0: daylight mode, 1: moonlight mode"
```

## Events
```yaml
# Device sends props notification on state change
# Example: {"method":"props","params":{"power":"on","bright":"10"}}
# UNRESOLVED: specific event triggering conditions not enumerated in source
```

## Macros
```yaml
# Color flow expressions (documented in start_cf)
# Sunrise/Sunset effects implemented via start_cf
# UNRESOLVED: no explicit named macros in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Connection limit: max 4 simultaneous TCP connections per device
- Rate limit: 60 commands/min per connection, 144 commands/min total LAN
- Music mode: disables property reporting and removes quota limits
- Discovery: SSDP multicast to 239.255.255.250:1982
- All messages use JSON over TCP with `\r\n` terminator
- Only accepted when device is in "on" state: set_ct_abx, set_rgb, set_hsv, set_bright, set_default, start_cf, cron_add
- Accepted in both "on" and "off" states: set_power, toggle, set_scene
<!-- UNRESOLVED: voltage/power specs not stated in source -->
<!-- UNRESOLVED: specific keypad model details not in source; using generic Yeelight bulb spec -->

## Provenance

```yaml
source_domains:
  - yeelight.com
  - open-console.yeelight.com
source_urls:
  - https://www.yeelight.com/download/Yeelight_Inter-Operation_Spec.pdf
  - https://open-console.yeelight.com/commerical-lighting-open-platform-docs-en.html
  - https://open-console.yeelight.com/
retrieved_at: 2026-05-22T03:35:06.925Z
last_checked_at: 2026-07-22T08:53:49.829Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T08:53:49.829Z
matched_actions: 35
action_count: 35
confidence: medium
summary: "All 35 spec actions matched literally with their method counterparts in the source command table; transport parameters verified; perfect one-to-one coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific keypad device model commands not present; source is generic Yeelight bulb spec"
- "specific event triggering conditions not enumerated in source"
- "no explicit named macros in source"
- "no safety warnings or interlock procedures in source"
- "voltage/power specs not stated in source"
- "specific keypad model details not in source; using generic Yeelight bulb spec"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
