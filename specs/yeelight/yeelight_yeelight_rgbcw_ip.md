---
spec_id: admin/yeelight-rgbcw
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yeelight RGBCW Control Spec"
manufacturer: Yeelight
model_family: "Yeelight RGBCW"
aliases: []
compatible_with:
  manufacturers:
    - Yeelight
  models:
    - "Yeelight RGBCW"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - yeelight.com
source_urls:
  - https://www.yeelight.com/download/Yeelight_Inter-Operation_Spec.pdf
retrieved_at: 2026-05-22T03:45:54.424Z
last_checked_at: 2026-07-22T08:58:42.380Z
generated_at: 2026-07-22T08:58:42.380Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no serial support in source"
  - "device exposes read/write properties via get_prop/set_* commands."
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated"
  - "voltage/power specifications not stated"
verification:
  verdict: verified
  checked_at: 2026-07-22T08:58:42.380Z
  matched_actions: 35
  action_count: 35
  confidence: medium
  summary: "All 35 spec action ids match source method names verbatim; port and multicast parameters verified; complete symmetric coverage of command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Yeelight RGBCW Control Spec

## Summary
WiFi smart LED controller. Discovery via SSDP multicast (UDP 239.255.255.250:1982). Control via JSON over TCP on port 55443. Supports power, color (RGB/HSV), color temperature, brightness, scenes, timers, and music mode.

<!-- UNRESOLVED: no serial support in source -->

## Transport
```yaml
protocols:
  - udp    # discovery only
  - tcp    # control channel
addressing:
  port: 55443  # TCP control port, from LOCATION header in discovery response
  discovery:
    multicast: 239.255.255.250
    port: 1982
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # set_power, toggle commands present
- levelable    # set_bright, adjust_bright, adjust_ct, adjust_color present
- queryable    # get_prop command present; props notifications for state changes
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
      enum: [on, off]
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in milliseconds (min 30 for smooth)
    - name: mode
      type: integer
      description: "0=normal, 1=CT, 2=RGB, 3=HSV, 4=color flow, 5=night light"
      default: 0

- id: toggle
  label: Toggle Power
  kind: action
  params: []

- id: set_ct_abx
  label: Set Color Temperature
  kind: action
  params:
    - name: ct_value
      type: integer
      description: Color temperature in Kelvin (1700~6500)
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: set_rgb
  label: Set RGB Color
  kind: action
  params:
    - name: rgb_value
      type: integer
      description: RGB value as decimal (0 to 16777215, hex 0xFFFFFF)
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: set_hsv
  label: Set HSV Color
  kind: action
  params:
    - name: hue
      type: integer
      description: Hue value (0~359)
    - name: sat
      type: integer
      description: Saturation value (0~100)
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: set_bright
  label: Set Brightness
  kind: action
  params:
    - name: brightness
      type: integer
      description: Brightness percentage (1~100)
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: set_default
  label: Save as Default
  kind: action
  params: []

- id: start_cf
  label: Start Color Flow
  kind: action
  params:
    - name: count
      type: integer
      description: Number of state changes (0=infinite)
    - name: action
      type: integer
      description: "Action on completion: 0=restore previous, 1=stay, 2=power off"
    - name: flow_expression
      type: string
      description: Comma-separated flow tuples [duration, mode, value, brightness]

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
      enum: [color, hsv, ct, cf, auto_delay_off]
    - name: val1
      type: integer
    - name: val2
      type: integer
    - name: val3
      type: integer
      required: false

- id: cron_add
  label: Add Timer
  kind: action
  params:
    - name: type
      type: integer
      description: Timer type (0=power off)
    - name: value
      type: integer
      description: Duration in minutes

- id: cron_get
  label: Get Timer
  kind: action
  params:
    - name: type
      type: integer
      description: Timer type (0=power off)

- id: cron_del
  label: Delete Timer
  kind: action
  params:
    - name: type
      type: integer
      description: Timer type (0=power off)

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

- id: set_music
  label: Set Music Mode
  kind: action
  params:
    - name: action
      type: integer
      description: "0=off, 1=on"
    - name: host
      type: string
      description: TCP server IP address
      required: false
    - name: port
      type: integer
      description: TCP server port
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
      description: Adjustment percentage (-100~100)
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: adjust_ct
  label: Adjust Color Temperature
  kind: action
  params:
    - name: percentage
      type: integer
      description: Adjustment percentage (-100~100)
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: adjust_color
  label: Adjust Color
  kind: action
  params:
    - name: percentage
      type: integer
      description: Adjustment percentage (-100~100)
    - name: duration
      type: integer
      description: Transition time in milliseconds
- id: bg_set_rgb
  label: Set Background RGB Color
  kind: action
  params:
    - name: rgb_value
      type: integer
      description: RGB value as decimal (0 to 16777215, hex 0xFFFFFF)
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: bg_set_hsv
  label: Set Background HSV Color
  kind: action
  params:
    - name: hue
      type: integer
      description: Hue value (0~359)
    - name: sat
      type: integer
      description: Saturation value (0~100)
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: bg_set_ct_abx
  label: Set Background Color Temperature
  kind: action
  params:
    - name: ct_value
      type: integer
      description: Color temperature in Kelvin (1700~6500)
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: bg_start_cf
  label: Start Background Color Flow
  kind: action
  params:
    - name: count
      type: integer
      description: Number of state changes (0=infinite)
    - name: action
      type: integer
      description: "Action on completion: 0=restore previous, 1=stay, 2=power off"
    - name: flow_expression
      type: string
      description: Comma-separated flow tuples [duration, mode, value, brightness]

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
      enum: [color, hsv, ct, cf, auto_delay_off]
    - name: val1
      type: integer
    - name: val2
      type: integer
    - name: val3
      type: integer
      required: false

- id: bg_set_default
  label: Save Background as Default
  kind: action
  params: []

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
      description: Transition time in milliseconds
    - name: mode
      type: integer
      description: "0=normal, 1=CT, 2=RGB, 3=HSV, 4=color flow, 5=night light"
      default: 0

- id: bg_set_bright
  label: Set Background Brightness
  kind: action
  params:
    - name: brightness
      type: integer
      description: Brightness percentage (1~100)
    - name: effect
      type: string
      enum: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in milliseconds

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

- id: bg_toggle
  label: Toggle Background Power
  kind: action
  params: []

- id: dev_toggle
  label: Toggle Main and Background Power
  kind: action
  params: []

- id: bg_adjust_bright
  label: Adjust Background Brightness
  kind: action
  params:
    - name: percentage
      type: integer
      description: Adjustment percentage (-100~100)
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: bg_adjust_ct
  label: Adjust Background Color Temperature
  kind: action
  params:
    - name: percentage
      type: integer
      description: Adjustment percentage (-100~100)
    - name: duration
      type: integer
      description: Transition time in milliseconds

- id: bg_adjust_color
  label: Adjust Background Color
  kind: action
  params:
    - name: percentage
      type: integer
      description: Adjustment percentage (-100~100)
    - name: duration
      type: integer
      description: Transition time in milliseconds
```

## Feedbacks
```yaml
- id: power
  type: enum
  values: [on, off]

- id: bright
  type: integer
  description: Brightness percentage (1~100)

- id: ct
  type: integer
  description: Color temperature in Kelvin (1700~6500)

- id: rgb
  type: integer
  description: RGB color value (0~16777215)

- id: hue
  type: integer
  description: Hue value (0~359)

- id: sat
  type: integer
  description: Saturation value (0~100)

- id: color_mode
  type: enum
  values: [1, 2, 3]
  description: "1=RGB, 2=CT, 3=HSV"

- id: flowing
  type: enum
  values: [0, 1]
  description: "0=idle, 1=flow running"

- id: delayoff
  type: integer
  description: Remaining sleep timer minutes (1~60)

- id: music_on
  type: enum
  values: [0, 1]
  description: "0=music mode off, 1=music mode on"

- id: name
  type: string
  description: Device name
```

## Variables
```yaml
# UNRESOLVED: device exposes read/write properties via get_prop/set_* commands.
# Variables covered by Actions and Feedbacks above.
```

## Events
```yaml
- id: props
  description: Unsolicited state change notification
  params:
    - name: power
      type: string
    - name: bright
      type: string
    - name: ct
      type: string
    - name: rgb
      type: string
    - name: hue
      type: string
    - name: sat
      type: string
    - name: color_mode
      type: string
    - name: flowing
      type: string
    - name: delayoff
      type: string
    - name: music_on
      type: string
    - name: name
      type: string
```

## Macros
```yaml
# Color flow expression: [duration, mode, value, brightness]
# modes: 1=RGB, 2=CT, 7=sleep
# brightness: -1=ignore, 1~100=percentage
# example sunrise: "1000,2,2700,100,500,1,255,10,5000,7,0,0,500,2,5000,1"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
TCP connections: max 4 simultaneous, 60 commands/minute per connection, 144 commands/minute total LAN quota. All JSON messages terminated by `\r\n`. Music mode disables property reporting and quota checks. Background light commands (`bg_set_*`, `bg_toggle`, `bg_adjust_*`) only supported on devices with background light.
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: voltage/power specifications not stated -->

## Provenance

```yaml
source_domains:
  - yeelight.com
source_urls:
  - https://www.yeelight.com/download/Yeelight_Inter-Operation_Spec.pdf
retrieved_at: 2026-05-22T03:45:54.424Z
last_checked_at: 2026-07-22T08:58:42.380Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T08:58:42.380Z
matched_actions: 35
action_count: 35
confidence: medium
summary: "All 35 spec action ids match source method names verbatim; port and multicast parameters verified; complete symmetric coverage of command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no serial support in source"
- "device exposes read/write properties via get_prop/set_* commands."
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated"
- "voltage/power specifications not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
