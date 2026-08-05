---
spec_id: admin/smartlicht-smartlicht-rgbcw
schema_version: ai4av-public-spec-v1
revision: 1
title: "Smartlicht Smartlicht RGBCW Control Spec"
manufacturer: Smartlicht
model_family: "Smartlicht RGBCW"
aliases: []
compatible_with:
  manufacturers:
    - Smartlicht
  models:
    - "Smartlicht RGBCW"
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
retrieved_at: 2026-06-07T21:11:17.529Z
last_checked_at: 2026-08-05T08:43:17.258Z
generated_at: 2026-08-05T08:43:17.258Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version range, exact model string, vendor confirmation that RGBCW is a `color` model variant"
  - "source describes sunrise/sunset effects implemented via start_cf, but does not prescribe a fixed multi-step sequence; left for integrator."
  - "no safety warnings, interlocks, or power-on sequencing requirements appear in the source."
  - "vendor confirmation that Smartlicht RGBCW is a `color` model class; whether the device exposes a physical background light; firmware version compatibility range."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:43:17.258Z
  matched_actions: 35
  action_count: 35
  confidence: medium
  summary: "All 35 spec actions map to source's complete method table; transport values (55443, 239.255.255.250:1982, SSDP headers) verified verbatim. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-08
---

# Smartlicht Smartlicht RGBCW Control Spec

## Summary
The Smartlicht RGBCW is a Yeelight-sub-brand commercial WiFi smart LED supporting RGB color, color-temperature, and brightness control. The device is discovered via SSDP-over-UDP multicast on `239.255.255.250:1982` and controlled over a persistent TCP connection on port 55443 using newline-terminated JSON command messages.

<!-- UNRESOLVED: firmware version range, exact model string, vendor confirmation that RGBCW is a `color` model variant -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 55443
  discovery:
    protocol: udp
    multicast_address: 239.255.255.250
    multicast_port: 1982
    search_method_line: 'M-SEARCH * HTTP/1.1'   # verbatim start line from source 3.1
    man_header: 'ssdp:discover'                  # required; double-quotes included per source
    search_target: wifi_bulb                     # required ST header value
    response_location_format: 'yeelight://<ip>:55443'
    response_headers: [Cache-Control, Date, Ext, Location, Server, id, model, fw_ver, support, power, bright, color_mode, ct, rgb, hue, sat, name]
    advertisement: 'NOTIFY * HTTP/1.1, NTS: ssdp:alive - multicast on join + refreshed at CACHE-CONTROL max-age interval (source 3.2)'
  notes: >-
    TCP listen port 55443 is advertised in the SSDP LOCATION header (e.g.
    `yeelight://<ip>:55443`). UDP/1982 is used only for SSDP discovery.
    Each M-SEARCH / NOTIFY / response line is terminated by "\r\n". Source
    confirms 4 simultaneous TCP connections max; 60 commands/min per
    connection; 144 commands/min total per device. Telnet on port 55443 is
    supported for debugging.
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred: set_power / toggle
- queryable    # inferred: get_prop / cron_get
- levelable    # inferred: set_bright / adjust_bright / set_ct_abx / set_rgb / set_hsv
```

## Actions
```yaml
- id: get_prop
  label: Get Property
  kind: query
  command: '{"id":1,"method":"get_prop","params":["power", "bright"]}'
  params:
    - name: properties
      type: array:string
      description: List of property names to query (see Feedbacks section).
- id: set_ct_abx
  label: Set Color Temperature
  kind: action
  command: '{"id":1,"method":"set_ct_abx","params":[3500, "smooth", 500]}'
  params:
    - name: ct_value
      type: integer
      description: Target color temperature, 1700-6500 K.
    - name: effect
      type: enum
      values: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in ms (min 30); ignored when effect=sudden.
- id: set_rgb
  label: Set RGB Color
  kind: action
  command: '{"id":1,"method":"set_rgb","params":[255, "smooth", 500]}'
  params:
    - name: rgb_value
      type: integer
      description: Decimal RGB value, 0-16777215.
    - name: effect
      type: enum
      values: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in ms.
- id: set_hsv
  label: Set HSV Color
  kind: action
  command: '{"id":1,"method":"set_hsv","params":[255, 45, "smooth", 500]}'
  params:
    - name: hue
      type: integer
      description: Hue, 0-359.
    - name: sat
      type: integer
      description: Saturation, 0-100.
    - name: effect
      type: enum
      values: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in ms.
- id: set_bright
  label: Set Brightness
  kind: action
  command: '{"id":1,"method":"set_bright","params":[50, "smooth", 500]}'
  params:
    - name: brightness
      type: integer
      description: Brightness percentage, 1-100.
    - name: effect
      type: enum
      values: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in ms.
- id: set_power
  label: Set Power
  kind: action
  command: '{"id":1,"method":"set_power","params":["on", "smooth", 500]}'
  params:
    - name: power
      type: enum
      values: [on, off]
    - name: effect
      type: enum
      values: [sudden, smooth]
    - name: duration
      type: integer
      description: Transition time in ms.
    - name: mode
      type: integer
      description: 'Optional. 0=normal (default), 1=CT, 2=RGB, 3=HSV, 4=color flow, 5=night light (ceiling only).'
- id: toggle
  label: Toggle Power
  kind: action
  command: '{"id":1,"method":"toggle","params":[]}'
  params: []
- id: set_default
  label: Save Current State As Default
  kind: action
  command: '{"id":1,"method":"set_default","params":[]}'
  params: []
- id: start_cf
  label: Start Color Flow
  kind: action
  command: '{"id":1,"method":"start_cf","params":[4, 2, "1000, 2, 2700, 100, 500, 1, 255, 10, 5000, 7, 0,0, 500, 2, 5000, 1"]}'
  params:
    - name: count
      type: integer
      description: Number of state changes; 0 = infinite loop.
    - name: action
      type: integer
      description: Action taken when flow stops (0=recover to pre-flow state).
    - name: flow_expression
      type: string
      description: 'Comma-separated flow tuples: duration,mode,value,brightness. Mode 1=color, 2=CT, 7=sleep.'
- id: stop_cf
  label: Stop Color Flow
  kind: action
  command: '{"id":1,"method":"stop_cf","params":[]}'
  params: []
- id: set_scene
  label: Set Scene
  kind: action
  command: '{"id":1,"method":"set_scene","params":["color", 65280, 70]}'
  params:
    - name: class
      type: enum
      values: [color, hsv, ct, cf, auto_delay_off]
    - name: val1
      type: integer
    - name: val2
      type: integer
    - name: val3
      type: integer
      description: Optional; only used by class `cf`.
- id: cron_add
  label: Add Cron Job (Sleep Timer)
  kind: action
  command: '{"id":1,"method":"cron_add","params":[0, 15]}'
  params:
    - name: type
      type: integer
      description: 'Currently must be 0 (power off).'
    - name: value
      type: integer
      description: Timer length in minutes.
- id: cron_get
  label: Get Cron Job
  kind: query
  command: '{"id":1,"method":"cron_get","params":[0]}'
  params:
    - name: type
      type: integer
      description: 'Currently must be 0.'
- id: cron_del
  label: Delete Cron Job
  kind: action
  command: '{"id":1,"method":"cron_del","params":[0]}'
  params:
    - name: type
      type: integer
      description: 'Currently must be 0.'
- id: set_adjust
  label: Adjust Property
  kind: action
  command: '{"id":1,"method":"set_adjust","params":["increase", "ct"]}'
  params:
    - name: action
      type: enum
      values: [increase, decrease, circle]
    - name: prop
      type: enum
      values: [bright, ct, color]
      description: When prop=color, action must be `circle`.
- id: set_music
  label: Set Music Mode
  kind: action
  command: '{"id":1,"method":"set_music","params":[1, "192.168.0.2", 54321]}'
  params:
    - name: action
      type: integer
      description: '0=off, 1=on.'
    - name: host
      type: string
      description: IP of controller TCP server (required when action=1).
    - name: port
      type: integer
      description: TCP port of controller (required when action=1).
- id: set_name
  label: Set Device Name
  kind: action
  command: '{"id":1,"method":"set_name","params":["my_bulb"]}'
  params:
    - name: name
      type: string
      description: Up to 64 bytes; BASE64-encoding recommended for non-ASCII.
- id: bg_set_rgb
  label: Background Light Set RGB
  kind: action
  command: '{"id":1,"method":"bg_set_rgb","params":[255, "smooth", 500]}'
  params:
    - name: rgb_value
      type: integer
    - name: effect
      type: enum
      values: [sudden, smooth]
    - name: duration
      type: integer
- id: bg_set_hsv
  label: Background Light Set HSV
  kind: action
  command: '{"id":1,"method":"bg_set_hsv","params":[255, 45, "smooth", 500]}'
  params:
    - name: hue
      type: integer
    - name: sat
      type: integer
    - name: effect
      type: enum
      values: [sudden, smooth]
    - name: duration
      type: integer
- id: bg_set_ct_abx
  label: Background Light Set CT
  kind: action
  command: '{"id":1,"method":"bg_set_ct_abx","params":[3500, "smooth", 500]}'
  params:
    - name: ct_value
      type: integer
    - name: effect
      type: enum
      values: [sudden, smooth]
    - name: duration
      type: integer
- id: bg_start_cf
  label: Background Light Start Color Flow
  kind: action
  command: '{"id":1,"method":"bg_start_cf","params":[4, 2, "1000, 2, 2700, 100, 500, 1, 255, 10, 5000, 7, 0,0, 500, 2, 5000, 1"]}'
  params:
    - name: count
      type: integer
    - name: action
      type: integer
    - name: flow_expression
      type: string
- id: bg_stop_cf
  label: Background Light Stop Color Flow
  kind: action
  command: '{"id":1,"method":"bg_stop_cf","params":[]}'
  params: []
- id: bg_set_scene
  label: Background Light Set Scene
  kind: action
  command: '{"id":1,"method":"bg_set_scene","params":["color", 65280, 70]}'
  params:
    - name: class
      type: enum
      values: [color, hsv, ct, cf, auto_delay_off]
    - name: val1
      type: integer
    - name: val2
      type: integer
    - name: val3
      type: integer
- id: bg_set_default
  label: Background Light Save Default
  kind: action
  command: '{"id":1,"method":"bg_set_default","params":[]}'
  params: []
- id: bg_set_power
  label: Background Light Set Power
  kind: action
  command: '{"id":1,"method":"bg_set_power","params":["on", "smooth", 500]}'
  params:
    - name: power
      type: enum
      values: [on, off]
    - name: effect
      type: enum
      values: [sudden, smooth]
    - name: duration
      type: integer
    - name: mode
      type: integer
- id: bg_set_bright
  label: Background Light Set Brightness
  kind: action
  command: '{"id":1,"method":"bg_set_bright","params":[50, "smooth", 500]}'
  params:
    - name: brightness
      type: integer
    - name: effect
      type: enum
      values: [sudden, smooth]
    - name: duration
      type: integer
- id: bg_set_adjust
  label: Background Light Adjust
  kind: action
  command: '{"id":1,"method":"bg_set_adjust","params":["increase", "ct"]}'
  params:
    - name: action
      type: enum
      values: [increase, decrease, circle]
    - name: prop
      type: enum
      values: [bright, ct, color]
- id: bg_toggle
  label: Background Light Toggle
  kind: action
  command: '{"id":1,"method":"bg_toggle","params":[]}'
  params: []
- id: dev_toggle
  label: Toggle Main + Background
  kind: action
  command: '{"id":1,"method":"dev_toggle","params":[]}'
  params: []
- id: adjust_bright
  label: Adjust Brightness By Percentage
  kind: action
  command: '{"id":1,"method":"adjust_bright","params":[-20, 500]}'
  params:
    - name: percentage
      type: integer
      description: -100..100.
    - name: duration
      type: integer
      description: Transition time in ms.
- id: adjust_ct
  label: Adjust CT By Percentage
  kind: action
  command: '{"id":1,"method":"adjust_ct","params":[20, 500]}'
  params:
    - name: percentage
      type: integer
      description: -100..100.
    - name: duration
      type: integer
- id: adjust_color
  label: Adjust Color By Percentage
  kind: action
  command: '{"id":1,"method":"adjust_color","params":[20, 500]}'
  params:
    - name: percentage
      type: integer
      description: -100..100; internally defined color, source says caller cannot specify.
    - name: duration
      type: integer
- id: bg_adjust_bright
  label: Background Light Adjust Brightness
  kind: action
  command: '{"id":1,"method":"bg_adjust_bright","params":[-20, 500]}'
  params:
    - name: percentage
      type: integer
      description: -100..100.
    - name: duration
      type: integer
- id: bg_adjust_ct
  label: Background Light Adjust CT
  kind: action
  command: '{"id":1,"method":"bg_adjust_ct","params":[20, 500]}'
  params:
    - name: percentage
      type: integer
      description: -100..100.
    - name: duration
      type: integer
- id: bg_adjust_color
  label: Background Light Adjust Color
  kind: action
  command: '{"id":1,"method":"bg_adjust_color","params":[20, 500]}'
  params:
    - name: percentage
      type: integer
      description: -100..100.
    - name: duration
      type: integer
```

## Feedbacks
```yaml
- id: power
  type: enum
  values: [on, off]
  description: Current power state (software-managed, not hard power).
- id: bright
  type: integer
  range: [1, 100]
  description: Brightness percentage.
- id: color_mode
  type: enum
  values: ["1", "2", "3"]
  description: '1=rgb, 2=color temperature, 3=hsv. Mutually exclusive.'
- id: ct
  type: integer
  range: [1700, 6500]
  description: Color temperature in K. Valid when color_mode=2.
- id: rgb
  type: integer
  range: [0, 16777215]
  description: RGB value. Valid when color_mode=1.
- id: hue
  type: integer
  range: [0, 359]
  description: Hue. Valid when color_mode=3.
- id: sat
  type: integer
  range: [0, 100]
  description: Saturation. Valid when color_mode=3.
- id: flowing
  type: enum
  values: ["0", "1"]
  description: '0=no flow, 1=color flow running.'
- id: delayoff
  type: integer
  range: [1, 60]
  description: Remaining sleep-timer minutes.
- id: flow_params
  type: string
  description: Current flow parameters; meaningful only when flowing=1.
- id: music_on
  type: enum
  values: ["0", "1"]
- id: name
  type: string
  description: Up to 64 bytes.
- id: bg_power
  type: enum
  values: [on, off]
  description: Background light power.
- id: bg_flowing
  type: enum
  values: ["0", "1"]
- id: bg_flow_params
  type: string
- id: bg_ct
  type: integer
  range: [1700, 6500]
- id: bg_lmode
  type: enum
  values: ["1", "2", "3"]
- id: bg_bright
  type: integer
  range: [1, 100]
- id: bg_rgb
  type: integer
  range: [0, 16777215]
- id: bg_hue
  type: integer
  range: [0, 359]
- id: bg_sat
  type: integer
  range: [0, 100]
- id: nl_br
  type: integer
  description: Night-mode brightness (ceiling only).
- id: active_mode
  type: enum
  values: ["0", "1"]
  description: '0=daylight, 1=moonlight (ceiling only).'
- id: error_result
  type: object
  description: 'Error RESULT message (source 4.2). Object {code: int, message: string}. Example: {"code":-1,"message":"unsupported method"}.'
  notes: 'Returned instead of "result" array when a command fails (e.g. unsupported method).'
```

## Variables
```yaml
- id: cron
  description: Current cron-job setting; returned by cron_get as {type, delay, mix}.
  type: object
```

## Events
```yaml
- id: props
  description: Unsolicited state-change notification broadcast to all TCP peers.
  payload: '{"method":"props","params":{"power":"on", "bright":"10"}}'
  notes: 'Sent whenever a property changes. `params` is an object; all values are strings.'
- id: ssdp_advertisement
  description: Unsolicited UDP multicast presence advertisement (SSDP NOTIFY ssdp:alive) sent on network join and refreshed at the CACHE-CONTROL max-age interval.
  transport: udp_multicast
  multicast: '239.255.255.250:1982'
  payload: 'NOTIFY * HTTP/1.1\r\nHOST: 239.255.255.250:1982\r\nCACHE-CONTROL: max-age=3600\r\nLOCATION: yeelight://<ip>:55443\r\nNTS: ssdp:alive\r\nServer: POSIX, UPnP/1.0 YGLC/1\r\nid: <hex>\r\nmodel: <model>\r\nfw_ver: <int>\r\nsupport: <methods>\r\npower: <on|off>\r\nbright: <1-100>\r\ncolor_mode: <1|2|3>\r\nct: <1700-6500>\r\nrgb: <0-16777215>\r\nhue: <0-359>\r\nsat: <0-100>\r\nname: <string>'
  notes: 'All Yeelight-specific fields are identical to the M-SEARCH response (source 3.2). Same property set as Feedbacks above.'
```

## Macros
```yaml
# UNRESOLVED: source describes sunrise/sunset effects implemented via start_cf, but does not prescribe a fixed multi-step sequence; left for integrator.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing requirements appear in the source.
```

## Notes
- Connection quotas: 4 simultaneous TCP connections max; 60 commands/min per connection; 144 commands/min total per device.
- JSON messages must be terminated by `\r\n`.
- UDP discovery uses SSDP-style `M-SEARCH * HTTP/1.1` on multicast `239.255.255.250:1982` with `ST: wifi_bulb`; devices respond with `Location: yeelight://<ip>:55443`.
- `set_power` mode 5 (night light) is documented for ceiling lights only — applicability to the RGBCW commercial model is not confirmed in the source.
- Background-light methods (`bg_*`) are only effective on devices equipped with a secondary light; the RGBCW's background-light capability is not explicitly confirmed in the source.

<!-- UNRESOLVED: vendor confirmation that Smartlicht RGBCW is a `color` model class; whether the device exposes a physical background light; firmware version compatibility range. -->

## Provenance

```yaml
source_domains:
  - yeelight.com
  - open-console.yeelight.com
source_urls:
  - https://www.yeelight.com/download/Yeelight_Inter-Operation_Spec.pdf
  - https://open-console.yeelight.com/commerical-lighting-open-platform-docs-en.html
retrieved_at: 2026-06-07T21:11:17.529Z
last_checked_at: 2026-08-05T08:43:17.258Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:43:17.258Z
matched_actions: 35
action_count: 35
confidence: medium
summary: "All 35 spec actions map to source's complete method table; transport values (55443, 239.255.255.250:1982, SSDP headers) verified verbatim. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version range, exact model string, vendor confirmation that RGBCW is a `color` model variant"
- "source describes sunrise/sunset effects implemented via start_cf, but does not prescribe a fixed multi-step sequence; left for integrator."
- "no safety warnings, interlocks, or power-on sequencing requirements appear in the source."
- "vendor confirmation that Smartlicht RGBCW is a `color` model class; whether the device exposes a physical background light; firmware version compatibility range."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
