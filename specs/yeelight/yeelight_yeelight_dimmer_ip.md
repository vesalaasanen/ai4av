---
spec_id: admin/yeelight-yeelight_dimmer
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yeelight Yeelight Dimmer Control Spec"
manufacturer: Yeelight
model_family: "Yeelight Dimmer"
aliases: []
compatible_with:
  manufacturers:
    - Yeelight
  models:
    - "Yeelight Dimmer"
    - "Yeelight Smart LED (mono model - brightness-only variant)"
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
  - https://open-console.yeelight.com/open-platform-docs-en.html
retrieved_at: 2026-05-27T13:44:03.140Z
last_checked_at: 2026-08-05T08:52:08.355Z
generated_at: 2026-08-05T08:52:08.355Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "This spec derived from general Yeelight WiFi Light Inter-Operation Specification covering multiple models (mono, color, stripe, ceiling, bslamp). Specific dimmer model commands may be subset."
  - "no safety warnings or interlock procedures in source"
  - "Specific dimmer model may only support brightness control (mono variant), but source documents full color/CT support - actual command subset depends on device firmware"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:52:08.355Z
  matched_actions: 35
  action_count: 35
  confidence: medium
  summary: "All 35 spec actions map verbatim to the source's Table 4-1 methods; transport (TCP 55443, UDP 239.255.255.250:1982) confirmed. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Yeelight Yeelight Dimmer Control Spec

## Summary
Yeelight smart LED control protocol over TCP. Device supports brightness-only adjustment (dimmer variant). Discovery via SSDP multicast (UDP 239.255.255.250:1982), control via JSON-RPC over TCP port 55443. No authentication required.

<!-- UNRESOLVED: This spec derived from general Yeelight WiFi Light Inter-Operation Specification covering multiple models (mono, color, stripe, ceiling, bslamp). Specific dimmer model commands may be subset. -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 55443  # inferred from Location header in SSDP response (yeelight://host:port)
udp_discovery:
  multicast_address: 239.255.255.250
  port: 1982
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # set_power, toggle commands present
- levelable       # set_bright, adjust_bright present (brightness adjustment)
- queryable       # get_prop, cron_get present
- routable        # set_scene present (scene selection)
```

## Actions
```yaml
# JSON-RPC over TCP (port 55443). Each command field below holds the verbatim
# "method" value from the source method table (Table 4-1). The full wire frame is:
#   {"id": <int>, "method": "<command>", "params": [<param values in declared order>]}\r\n
# Param values map positionally to each action's params[] list. Every message
# terminated by \r\n. Example full frame for set_power:
#   {"id":1,"method":"set_power","params":["on","smooth",500]}\r\n

# get_prop - query device properties
- id: get_prop
  label: Get Properties
  kind: query
  command: "get_prop"
  params:
    - name: properties
      type: array
      description: List of property names to retrieve (power, bright, ct, rgb, hue, sat, color_mode, etc.)

# set_ct_abx - set color temperature
- id: set_ct_abx
  label: Set Color Temperature
  kind: action
  command: "set_ct_abx"
  params:
    - name: ct_value
      type: integer
      description: Target color temperature in Kelvin (1700-6500)
    - name: effect
      type: string
      enum: [sudden, smooth]
      description: "sudden" = immediate change, "smooth" = gradual transition
    - name: duration
      type: integer
      description: Transition duration in milliseconds (minimum 30ms)

# set_rgb - set RGB color
- id: set_rgb
  label: Set RGB Color
  kind: action
  command: "set_rgb"
  params:
    - name: rgb_value
      type: integer
      description: RGB color value (0-16777215, decimal)
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition duration in milliseconds

# set_hsv - set HSV color
- id: set_hsv
  label: Set HSV Color
  kind: action
  command: "set_hsv"
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
      description: Transition duration in milliseconds

# set_bright - set brightness
- id: set_bright
  label: Set Brightness
  kind: action
  command: "set_bright"
  params:
    - name: brightness
      type: integer
      description: Brightness percentage (1-100)
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition duration in milliseconds

# set_power - power on/off
- id: set_power
  label: Set Power
  kind: action
  command: "set_power"
  params:
    - name: power
      type: string
      enum: [on, off]
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition duration in milliseconds
    - name: mode
      type: integer
      description: "Power-on mode: 0=normal, 1=CT mode, 2=RGB mode, 3=HSV mode, 4=color flow, 5=night light (ceiling only)"

# toggle - toggle power state
- id: toggle
  label: Toggle Power
  kind: action
  command: "toggle"
  params: []

# set_default - save current state as default
- id: set_default
  label: Set Default
  kind: action
  command: "set_default"
  params: []

# start_cf - start color flow
- id: start_cf
  label: Start Color Flow
  kind: action
  command: "start_cf"
  params:
    - name: count
      type: integer
      description: Number of visible state changes before flow stops (0=infinite)
    - name: action
      type: integer
      description: "Action after flow stops: 0=recover to pre-flow state, 1=stay at last state, 2=turn off"
    - name: flow_expression
      type: string
      description: Flow expression - series of flow tuples [duration, mode, value, brightness]

# stop_cf - stop color flow
- id: stop_cf
  label: Stop Color Flow
  kind: action
  command: "stop_cf"
  params: []

# set_scene - set scene directly
- id: set_scene
  label: Set Scene
  kind: action
  command: "set_scene"
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
      description: Optional fourth parameter

# cron_add - add timer job
- id: cron_add
  label: Add Timer
  kind: action
  command: "cron_add"
  params:
    - name: type
      type: integer
      description: Timer type (currently only 0 = power off)
    - name: value
      type: integer
      description: Timer length in minutes

# cron_get - get timer settings
- id: cron_get
  label: Get Timer
  kind: query
  command: "cron_get"
  params:
    - name: type
      type: integer
      description: Timer type (currently only 0)

# cron_del - delete timer
- id: cron_del
  label: Delete Timer
  kind: action
  command: "cron_del"
  params:
    - name: type
      type: integer
      description: Timer type (currently only 0)

# set_adjust - adjustment without knowing current value
- id: set_adjust
  label: Adjust Property
  kind: action
  command: "set_adjust"
  params:
    - name: action
      type: string
      enum: [increase, decrease, circle]
    - name: prop
      type: string
      enum: [bright, ct, color]

# set_music - music mode
- id: set_music
  label: Set Music Mode
  kind: action
  command: "set_music"
  params:
    - name: action
      type: integer
      description: "0=turn off music mode, 1=turn on music mode"
    - name: host
      type: string
      description: Music server IP address (required when action=1)
    - name: port
      type: integer
      description: Music server TCP port (required when action=1)

# set_name - set device name
- id: set_name
  label: Set Device Name
  kind: action
  command: "set_name"
  params:
    - name: name
      type: string
      description: Device name (max 64 bytes)

# bg_set_rgb - background light RGB
- id: bg_set_rgb
  label: Background Set RGB
  kind: action
  command: "bg_set_rgb"
  params:
    - name: rgb_value
      type: integer
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer

# bg_set_hsv - background light HSV
- id: bg_set_hsv
  label: Background Set HSV
  kind: action
  command: "bg_set_hsv"
  params:
    - name: hue
      type: integer
    - name: sat
      type: integer
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer

# bg_set_ct_abx - background light color temperature
- id: bg_set_ct_abx
  label: Background Set Color Temperature
  kind: action
  command: "bg_set_ct_abx"
  params:
    - name: ct_value
      type: integer
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer

# bg_start_cf - background start color flow
- id: bg_start_cf
  label: Background Start Color Flow
  kind: action
  command: "bg_start_cf"
  params:
    - name: count
      type: integer
    - name: action
      type: integer
    - name: flow_expression
      type: string

# bg_stop_cf - background stop color flow
- id: bg_stop_cf
  label: Background Stop Color Flow
  kind: action
  command: "bg_stop_cf"
  params: []

# bg_set_scene - background set scene
- id: bg_set_scene
  label: Background Set Scene
  kind: action
  command: "bg_set_scene"
  params:
    - name: class
      type: string
    - name: val1
      type: integer
    - name: val2
      type: integer
    - name: val3
      type: integer

# bg_set_default - background set default
- id: bg_set_default
  label: Background Set Default
  kind: action
  command: "bg_set_default"
  params: []

# bg_set_power - background set power
- id: bg_set_power
  label: Background Set Power
  kind: action
  command: "bg_set_power"
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

# bg_set_bright - background set brightness
- id: bg_set_bright
  label: Background Set Brightness
  kind: action
  command: "bg_set_bright"
  params:
    - name: brightness
      type: integer
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer

# bg_set_adjust - background adjust
- id: bg_set_adjust
  label: Background Adjust Property
  kind: action
  command: "bg_set_adjust"
  params:
    - name: action
      type: string
      enum: [increase, decrease, circle]
    - name: prop
      type: string
      enum: [bright, ct, color]

# bg_toggle - background toggle
- id: bg_toggle
  label: Background Toggle
  kind: action
  command: "bg_toggle"
  params: []

# dev_toggle - toggle main and background light together
- id: dev_toggle
  label: Device Toggle
  kind: action
  command: "dev_toggle"
  params: []

# adjust_bright - adjust brightness by percentage
- id: adjust_bright
  label: Adjust Brightness
  kind: action
  command: "adjust_bright"
  params:
    - name: percentage
      type: integer
      description: Percentage adjustment (-100 to 100)
    - name: duration
      type: integer
      description: Duration in milliseconds

# adjust_ct - adjust color temperature by percentage
- id: adjust_ct
  label: Adjust Color Temperature
  kind: action
  command: "adjust_ct"
  params:
    - name: percentage
      type: integer
      description: Percentage adjustment (-100 to 100)
    - name: duration
      type: integer
      description: Duration in milliseconds

# adjust_color - adjust color by percentage
- id: adjust_color
  label: Adjust Color
  kind: action
  command: "adjust_color"
  params:
    - name: percentage
      type: integer
      description: Percentage adjustment (-100 to 100)
    - name: duration
      type: integer
      description: Duration in milliseconds

# bg_adjust_bright - background adjust brightness
- id: bg_adjust_bright
  label: Background Adjust Brightness
  kind: action
  command: "bg_adjust_bright"
  params:
    - name: percentage
      type: integer
    - name: duration
      type: integer

# bg_adjust_ct - background adjust color temperature
- id: bg_adjust_ct
  label: Background Adjust Color Temperature
  kind: action
  command: "bg_adjust_ct"
  params:
    - name: percentage
      type: integer
    - name: duration
      type: integer

# bg_adjust_color - background adjust color
- id: bg_adjust_color
  label: Background Adjust Color
  kind: action
  command: "bg_adjust_color"
  params:
    - name: percentage
      type: integer
    - name: duration
      type: integer
```

## Feedbacks
```yaml
# Result message format: { "id": int, "result": array or "error": object }
# Properties observable via get_prop and notification messages:
- id: power_state
  type: enum
  values: [on, off]

- id: brightness
  type: integer
  description: Brightness percentage (1-100)

- id: color_temperature
  type: integer
  description: Color temperature in Kelvin (1700-6500)

- id: rgb_color
  type: integer
  description: RGB color value (0-16777215)

- id: hue
  type: integer
  description: Hue value (0-359)

- id: saturation
  type: integer
  description: Saturation value (0-100)

- id: color_mode
  type: enum
  values: [rgb_mode, ct_mode, hsv_mode]
  description: "1=rgb mode, 2=color temperature mode, 3=HSV mode"

- id: flowing
  type: boolean
  description: Color flow running state

- id: flow_params
  type: string
  description: Current flow parameters (only meaningful when flowing is 1)

- id: delayoff
  type: integer
  description: Sleep timer remaining minutes (1-60)

- id: music_on
  type: boolean
  description: Music mode state

- id: bg_power
  type: enum
  values: [on, off]
  description: Background light power status

- id: bg_flowing
  type: boolean
  description: Background light color flow running state

- id: bg_flow_params
  type: string
  description: Current background light flow parameters (only meaningful when bg_flowing is 1)

- id: bg_ct
  type: integer
  description: Background light color temperature in Kelvin (1700-6500)

- id: bg_lmode
  type: enum
  values: [rgb_mode, ct_mode, hsv_mode]
  description: "Background light mode: 1=rgb, 2=color temperature, 3=HSV"

- id: bg_bright
  type: integer
  description: Background light brightness percentage (1-100)

- id: bg_rgb
  type: integer
  description: Background light RGB color value (0-16777215)

- id: bg_hue
  type: integer
  description: Background light hue value (0-359)

- id: bg_sat
  type: integer
  description: Background light saturation value (0-100)

- id: nl_br
  type: integer
  description: Brightness of night mode light

- id: active_mode
  type: enum
  values: [daylight, moonlight]
  description: "0=daylight mode, 1=moonlight mode (ceiling light only)"

- id: name
  type: string
  description: Device name set by set_name command (max 64 bytes)
```

## Variables
```yaml
# Settable parameters not discrete actions:
- id: device_name
  type: string
  description: User-defined device name (max 64 bytes)

- id: night_mode_brightness
  type: integer
  description: Brightness in night mode (ceiling lights)

- id: active_mode
  type: enum
  values: [daylight, moonlight]
  description: "0=daylight mode, 1=moonlight mode (ceiling only)"
```

## Events
```yaml
# State change notifications sent to all connected devices:
# Format: { "method": "props", "params": { "prop1": "value1", ... } }
- id: state_change
  description: State change notification
  params:
    - name: power
      type: string
      description: "on or off"
    - name: bright
      type: string
      description: Brightness percentage
    - name: ct
      type: string
      description: Color temperature
    - name: rgb
      type: string
      description: RGB value
    - name: hue
      type: string
      description: Hue value
    - name: sat
      type: string
      description: Saturation
    - name: color_mode
      type: string
      description: Current color mode
    - name: flowing
      type: string
      description: Flow running state
    - name: flow_params
      type: string
      description: Current flow parameters (present when flowing is 1)
    - name: delayoff
      type: string
      description: Sleep timer
    - name: music_on
      type: string
      description: Music mode
    - name: name
      type: string
      description: Device name
    - name: bg_power
      type: string
      description: Background light power
    - name: bg_flowing
      type: string
      description: Background flow state
    - name: bg_flow_params
      type: string
      description: Background light flow parameters (present when bg_flowing is 1)
    - name: bg_ct
      type: string
      description: Background color temperature
    - name: bg_lmode
      type: string
      description: Background light mode
    - name: bg_bright
      type: string
      description: Background brightness
    - name: bg_rgb
      type: string
      description: Background RGB
    - name: bg_hue
      type: string
      description: Background hue
    - name: bg_sat
      type: string
      description: Background saturation
    - name: nl_br
      type: string
      description: Night mode brightness
    - name: active_mode
      type: string
      description: Active mode
```

## Macros
```yaml
# Multi-step sequences documented in source:
# Night light mode via set_power mode=5 (ceiling only)
# Sleep timer via cron_add with delay in minutes
# Color flow sunrise/sunset via start_cf with flow_expression
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- TCP port 55443 stated in SSDP Location header (yeelight://host:port format)
- UDP discovery on 239.255.255.250:1982
- Max 4 simultaneous TCP connections per device
- 60 commands/minute per connection, 144 commands/minute total LAN quota
- Music mode bypasses quota limits
- Background light commands only supported on devices with background light feature
- All JSON messages terminated with \r\n
- Effect "smooth" requires minimum 30ms duration
- Flow expression tuple format: [duration, mode, value, brightness] where mode: 1=color, 2=CT, 7=sleep
<!-- UNRESOLVED: Specific dimmer model may only support brightness control (mono variant), but source documents full color/CT support - actual command subset depends on device firmware -->

## Provenance

```yaml
source_domains:
  - yeelight.com
  - open-console.yeelight.com
source_urls:
  - https://www.yeelight.com/download/Yeelight_Inter-Operation_Spec.pdf
  - https://open-console.yeelight.com/commerical-lighting-open-platform-docs-en.html
  - https://open-console.yeelight.com/open-platform-docs-en.html
retrieved_at: 2026-05-27T13:44:03.140Z
last_checked_at: 2026-08-05T08:52:08.355Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:52:08.355Z
matched_actions: 35
action_count: 35
confidence: medium
summary: "All 35 spec actions map verbatim to the source's Table 4-1 methods; transport (TCP 55443, UDP 239.255.255.250:1982) confirmed. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "This spec derived from general Yeelight WiFi Light Inter-Operation Specification covering multiple models (mono, color, stripe, ceiling, bslamp). Specific dimmer model commands may be subset."
- "no safety warnings or interlock procedures in source"
- "Specific dimmer model may only support brightness control (mono variant), but source documents full color/CT support - actual command subset depends on device firmware"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
