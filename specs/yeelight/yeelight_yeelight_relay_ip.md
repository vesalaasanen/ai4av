---
spec_id: admin/yeelight-yeelight-relay
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yeelight WiFi Light Control Spec"
manufacturer: Yeelight
model_family: "Yeelight WiFi Light"
aliases: []
compatible_with:
  manufacturers:
    - Yeelight
  models:
    - "Yeelight WiFi Light"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - yeelight.com
source_urls:
  - https://www.yeelight.com/download/Yeelight_Inter-Operation_Spec.pdf
retrieved_at: 2026-05-22T03:51:33.609Z
last_checked_at: 2026-07-22T08:10:40.954Z
generated_at: 2026-07-22T08:10:40.954Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no auth procedure in source"
  - "base_url not stated; control channel established via IP + port"
  - "no explicit safety warnings in source"
  - "voltage/current/power specs not stated in source"
  - "firmware compatibility range not stated"
  - "exact error code enumeration not fully documented"
verification:
  verdict: verified
  checked_at: 2026-07-22T08:10:40.954Z
  matched_actions: 35
  action_count: 35
  confidence: medium
  summary: "All 35 spec actions matched their exact method names in source Table 4-1 with identical parameter counts, types, and transport parameters fully supported. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Yeelight WiFi Light Control Spec

## Summary
WiFi smart LED controller. Controls color, color temperature, brightness, and scenes via TCP JSON messages on port 55443. Device discovered via UDP multicast (SSDP) on 239.255.255.250:1982.

<!-- UNRESOLVED: no auth procedure in source -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 55443  # inferred from LOCATION header in discovery response
  # UNRESOLVED: base_url not stated; control channel established via IP + port
udp:
  multicast_address: 239.255.255.250
  multicast_port: 1982
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # set_power, toggle present
- levelable       # set_bright, adjust_bright present
- routable        # set_scene with class selection present
- queryable       # get_prop, cron_get present
```

## Actions
```yaml
- id: get_prop
  label: Get Property
  kind: action
  params:
    - name: properties
      type: array
      description: List of property names to retrieve
  example: '{"id":1,"method":"get_prop","params":["power", "bright"]}'

- id: set_ct_abx
  label: Set Color Temperature
  kind: action
  params:
    - name: ct_value
      type: integer
      description: Color temperature in Kelvin (1700-6500)
    - name: effect
      type: string
      enum: [sudden, smooth]
      description: "sudden" = immediate, "smooth" = gradual
    - name: duration
      type: integer
      description: Transition time in milliseconds (min 30ms)
  example: '{"id":1,"method":"set_ct_abx","params":[3500, "smooth", 500]}'

- id: set_rgb
  label: Set RGB Color
  kind: action
  params:
    - name: rgb_value
      type: integer
      description: RGB value (0-16777215, hex 0xFFFFFF)
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in milliseconds
  example: '{"id":1,"method":"set_rgb","params":[255, "smooth", 500]}'

- id: set_hsv
  label: Set HSV Color
  kind: action
  params:
    - name: hue
      type: integer
      description: Hue value (0-359)
    - name: sat
      type: integer
      description: Saturation value (0-100)
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in milliseconds
  example: '{"id":1,"method":"set_hsv","params":[255, 45, "smooth", 500]}'

- id: set_bright
  label: Set Brightness
  kind: action
  params:
    - name: brightness
      type: integer
      description: Brightness percentage (1-100)
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in milliseconds
  example: '{"id":1,"method":"set_bright","params":[50, "smooth", 500]}'

- id: set_power
  label: Set Power State
  kind: action
  params:
    - name: power
      type: string
      enum: [on, off]
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in milliseconds
    - name: mode
      type: integer
      description: "0=normal, 1=CT mode, 2=RGB mode, 3=HSV mode, 4=color flow, 5=night light"
  example: '{"id":1,"method":"set_power","params":["on", "smooth", 500]}'

- id: toggle
  label: Toggle Power
  kind: action
  params: []
  example: '{"id":1,"method":"toggle","params":[]}'

- id: set_default
  label: Save Current State as Default
  kind: action
  params: []
  example: '{"id":1,"method":"set_default","params":[]}'

- id: start_cf
  label: Start Color Flow
  kind: action
  params:
    - name: count
      type: integer
      description: Number of state changes (0=infinite)
    - name: action
      type: integer
      description: Action after flow stops (0=recover previous state)
    - name: flow_expression
      type: string
      description: "Comma-separated flow tuples: duration,mode,value,brightness"
  example: '{"id":1,"method":"start_cf","params":[4, 2, "1000,2,2700,100,500,1,255,10,5000,7,0,0,500,2,5000,1"]}'

- id: stop_cf
  label: Stop Color Flow
  kind: action
  params: []
  example: '{"id":1,"method":"stop_cf","params":[]}'

- id: set_scene
  label: Set Scene
  kind: action
  params:
    - name: class
      type: string
      enum: [color, hsv, ct, cf, auto_delay_off]
    - name: val1
      type: integer
    - name: val2
      type: integer
    - name: val3
      type: integer
      required: false
  example: '{"id":1,"method":"set_scene","params":["color", 65280, 70]}'

- id: cron_add
  label: Add Cron Job
  kind: action
  params:
    - name: type
      type: integer
      description: "Cron type (0=power off timer)"
    - name: value
      type: integer
      description: Duration in minutes
  example: '{"id":1,"method":"cron_add","params":[0, 15]}'

- id: cron_get
  label: Get Cron Job
  kind: action
  params:
    - name: type
      type: integer
      description: "Cron type (0=power off timer)"
  example: '{"id":1,"method":"cron_get","params":[0]}'

- id: cron_del
  label: Delete Cron Job
  kind: action
  params:
    - name: type
      type: integer
      description: "Cron type (0=power off timer)"
  example: '{"id":1,"method":"cron_del","params":[0]}'

- id: set_adjust
  label: Adjust Property
  kind: action
  params:
    - name: action
      type: string
      enum: [increase, decrease, circle]
    - name: prop
      type: string
      enum: [bright, ct, color]
  example: '{"id":1,"method":"set_adjust","params":["increase", "ct"]}'

- id: set_music
  label: Set Music Mode
  kind: action
  params:
    - name: action
      type: integer
      description: "0=off, 1=on"
    - name: host
      type: string
      description: Music server IP address
      required: false
    - name: port
      type: integer
      description: Music server TCP port
      required: false
  example: '{"id":1,"method":"set_music","params":[1, "192.168.0.2", 54321]}'

- id: set_name
  label: Set Device Name
  kind: action
  params:
    - name: name
      type: string
      description: Device name (max 64 bytes)
  example: '{"id":1,"method":"set_name","params":["my_bulb"]}'

- id: bg_set_rgb
  label: Set Background RGB
  kind: action
  params:
    - name: rgb_value
      type: integer
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer

- id: bg_set_ct_abx
  label: Set Background Color Temperature
  kind: action
  params:
    - name: ct_value
      type: integer
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer

- id: bg_start_cf
  label: Start Background Color Flow
  kind: action
  params:
    - name: count
      type: integer
    - name: action
      type: integer
    - name: flow_expression
      type: string

- id: bg_stop_cf
  label: Stop Background Color Flow
  kind: action
  params: []

- id: bg_set_scene
  label: Set Background Scene
  kind: action
  params:
    - name: class
      type: string
    - name: val1
      type: integer
    - name: val2
      type: integer
    - name: val3
      type: integer
      required: false

- id: bg_set_power
  label: Set Background Power
  kind: action
  params:
    - name: power
      type: string
      enum: [on, off]
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer
    - name: mode
      type: integer

- id: bg_toggle
  label: Toggle Background Light
  kind: action
  params: []

- id: dev_toggle
  label: Toggle Main and Background Light
  kind: action
  params: []

- id: bg_set_hsv
  label: Set Background HSV Color
  kind: action
  params:
    - name: hue
      type: integer
      description: Hue value (0-359)
    - name: sat
      type: integer
      description: Saturation value (0-100)
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in milliseconds
  example: '{"id":1,"method":"bg_set_hsv","params":[255, 45, "smooth", 500]}'

- id: bg_set_bright
  label: Set Background Brightness
  kind: action
  params:
    - name: brightness
      type: integer
      description: Brightness percentage (1-100)
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in milliseconds
  example: '{"id":1,"method":"bg_set_bright","params":[50, "smooth", 500]}'

- id: bg_set_default
  label: Save Background State as Default
  kind: action
  params: []
  example: '{"id":1,"method":"bg_set_default","params":[]}'

- id: bg_set_adjust
  label: Adjust Background Property
  kind: action
  params:
    - name: action
      type: string
      enum: [increase, decrease, circle]
    - name: prop
      type: string
      enum: [bright, ct, color]
  example: '{"id":1,"method":"bg_set_adjust","params":["increase", "ct"]}'

- id: adjust_bright
  label: Adjust Brightness by Percentage
  kind: action
  params:
    - name: percentage
      type: integer
      description: Adjustment percentage (-100 to 100)
    - name: duration
      type: integer
      description: Transition time in milliseconds
  example: '{"id":1,"method":"adjust_bright","params":[-20, 500]}'

- id: adjust_ct
  label: Adjust Color Temperature by Percentage
  kind: action
  params:
    - name: percentage
      type: integer
      description: Adjustment percentage (-100 to 100)
    - name: duration
      type: integer
  example: '{"id":1,"method":"adjust_ct","params":[20, 500]}'

- id: adjust_color
  label: Adjust Color by Percentage
  kind: action
  params:
    - name: percentage
      type: integer
      description: Adjustment percentage (-100 to 100)
    - name: duration
      type: integer
  example: '{"id":1,"method":"adjust_color","params":[20, 500]}'

- id: bg_adjust_bright
  label: Adjust Background Brightness
  kind: action
  params:
    - name: percentage
      type: integer
    - name: duration
      type: integer

- id: bg_adjust_ct
  label: Adjust Background Color Temperature
  kind: action
  params:
    - name: percentage
      type: integer
    - name: duration
      type: integer

- id: bg_adjust_color
  label: Adjust Background Color
  kind: action
  params:
    - name: percentage
      type: integer
    - name: duration
      type: integer
```

## Feedbacks
```yaml
# Result messages returned for each command
# Format: {"id":<int>, "result":<array>|"error":<object>}
# Success: {"id":1,"result":["ok"]}
# Error: {"id":2,"error":{"code":-1,"message":"unsupported method"}}
# Query response: {"id":3,"result":["on","100"]}
```

## Variables
```yaml
# Observable properties (from get_prop and notifications)
- id: power
  type: enum
  values: [on, off]
  description: Current power state

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
  range: [1, 16777215]
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
  description: "1=RGB mode, 2=CT mode, 3=HSV mode"

- id: flowing
  type: enum
  values: [0, 1]
  description: "0=no color flow running, 1=color flow running"

- id: delayoff
  type: integer
  range: [1, 60]
  description: Remaining sleep timer minutes

- id: flow_params
  type: string
  description: Current flow parameters

- id: music_on
  type: enum
  values: [0, 1]
  description: "0=music mode off, 1=music mode on"

- id: name
  type: string
  description: Device name

- id: bg_power
  type: enum
  values: [on, off]
  description: Background light power state

- id: bg_flowing
  type: enum
  values: [0, 1]

- id: bg_ct
  type: integer
  description: Background color temperature

- id: bg_lmode
  type: enum
  values: [1, 2, 3]

- id: bg_bright
  type: integer

- id: bg_rgb
  type: integer

- id: bg_hue
  type: integer

- id: bg_sat
  type: integer

- id: nl_br
  type: integer
  description: Night mode brightness

- id: active_mode
  type: enum
  values: [0, 1]
  description: "0=daylight mode, 1=moonlight mode"
```

## Events
```yaml
# Unsolicited notifications sent when state changes
# Format: {"method":"props","params":{"prop":"value",...}}
- id: state_change
  type: notification
  description: Device sends property change notifications to all connected clients
  example: '{"method":"props","params":{"power":"on","bright":"10"}}'
```

## Macros
```yaml
# Color flow expression format: duration,mode,value,brightness
# Modes: 1=color, 2=color temperature, 7=sleep
# Minimum duration: 50ms
# Brightness: -1=ignore, 1-100=percentage
flow_expression_format: "[duration, mode, value, brightness]"
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "set_ct_abx, set_rgb, set_hsv, set_bright, set_default only accepted when device is in 'on' state"
    source: Section 4-1 method descriptions
# UNRESOLVED: no explicit safety warnings in source
```

## Notes
TCP connection quota: 60 commands/minute per connection, 144 commands/minute total LAN quota. Max 4 simultaneous TCP connections. Port 55443 for control. Discovery via UDP multicast 239.255.255.250:1982 using SSDP M-SEARCH. All messages terminated with "\r\n". No authentication required.
<!-- UNRESOLVED: voltage/current/power specs not stated in source -->
<!-- UNRESOLVED: firmware compatibility range not stated -->
<!-- UNRESOLVED: exact error code enumeration not fully documented -->

## Provenance

```yaml
source_domains:
  - yeelight.com
source_urls:
  - https://www.yeelight.com/download/Yeelight_Inter-Operation_Spec.pdf
retrieved_at: 2026-05-22T03:51:33.609Z
last_checked_at: 2026-07-22T08:10:40.954Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T08:10:40.954Z
matched_actions: 35
action_count: 35
confidence: medium
summary: "All 35 spec actions matched their exact method names in source Table 4-1 with identical parameter counts, types, and transport parameters fully supported. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no auth procedure in source"
- "base_url not stated; control channel established via IP + port"
- "no explicit safety warnings in source"
- "voltage/current/power specs not stated in source"
- "firmware compatibility range not stated"
- "exact error code enumeration not fully documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
