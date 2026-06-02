---
spec_id: admin/barco-loki
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Loki Control Spec"
manufacturer: Barco
model_family: Loki
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - Loki
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-06-01T22:38:26.750Z
last_checked_at: 2026-06-02T22:04:15.073Z
generated_at: 2026-06-02T22:04:15.073Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "spec covers one model name; full UDX family also shares this API."
  - "no explicit safety warnings, lamp-cooling timers, or interlock procedures stated beyond the above power-state guards."
  - "full property catalog (~hundreds of RW properties) not exhaustively reproduced in this spec — the source lists them all under \"Alphabetical list of all properties\" and the implementer should introspect the live device or read that section when filling in additional Variables."
verification:
  verdict: verified
  checked_at: 2026-06-02T22:04:15.073Z
  matched_actions: 35
  action_count: 35
  confidence: medium
  summary: "All 35 spec actions traced to source (dip-safe re-verify). (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Barco Loki Control Spec

## Summary
Barco Pulse projector family (UDX-titled reference; Loki-named spec). JSON-RPC 2.0 facade over TCP port 9090, plus RS-232 serial. Source is the "Power User Reference guide" rev 1.7 (2019-03-04), which covers Pulse API across TCP/IP and RS-232.

<!-- UNRESOLVED: spec covers one model name; full UDX family also shares this API. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: code  # source describes "authenticate" JSON-RPC call with `code` param; skipped for normal end user
```

## Traits
```yaml
- powerable       # system.poweron / system.poweroff documented
- routable        # image.window.main.source set documented
- queryable       # property.get documented
- levelable       # image.brightness, illumination.sources.laser.power, image.color.p7.custom.* documented
```

## Actions
```yaml
- id: authenticate
  label: Authenticate (raise access level)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765}}'
  params:
    - name: code
      type: integer
      description: Pass code (example: 98765)
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []
- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []
- id: eco_wake_rs232
  label: Wake from ECO (RS-232 ASCII)
  kind: action
  command: ':POWR1\r'
  params: []
- id: property_set
  label: Set property value
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"<name>","value":<value>}}'
  params:
    - name: property
      type: string
      description: Property dot-path (e.g. image.window.main.source)
    - name: value
      type: any
      description: JSON value (string/integer/float/boolean/object/array)
- id: property_get
  label: Get property value
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"<name>"}}'
  params:
    - name: property
      type: string
      description: Property dot-path
- id: property_get_multi
  label: Get multiple property values
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["<a>","<b>"]}}'
  params:
    - name: property
      type: array
      description: Array of property dot-paths
- id: property_subscribe
  label: Subscribe to property change notifications
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"<name>"}}'
  params:
    - name: property
      type: string
      description: Property dot-path
- id: property_subscribe_multi
  label: Subscribe to multiple property change notifications
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["<a>","<b>"]}}'
  params:
    - name: property
      type: array
      description: Array of property dot-paths
- id: property_unsubscribe
  label: Unsubscribe from property change notifications
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"<name>"}}'
  params:
    - name: property
      type: string
      description: Property dot-path
- id: property_unsubscribe_multi
  label: Unsubscribe from multiple properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["<a>","<b>"]}}'
  params:
    - name: property
      type: array
      description: Array of property dot-paths
- id: signal_subscribe
  label: Subscribe to a signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"<name>"}}'
  params:
    - name: signal
      type: string
      description: Signal dot-path (e.g. modelupdated)
- id: signal_subscribe_multi
  label: Subscribe to multiple signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["<a>","<b>"]}}'
  params:
    - name: signal
      type: array
      description: Array of signal dot-paths
- id: signal_unsubscribe
  label: Unsubscribe from a signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"<name>"}}'
  params:
    - name: signal
      type: string
      description: Signal dot-path
- id: signal_unsubscribe_multi
  label: Unsubscribe from multiple signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["<a>","<b>"]}}'
  params:
    - name: signal
      type: array
      description: Array of signal dot-paths
- id: introspect
  label: Introspect object metadata
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"<name>","recursive":true}}'
  params:
    - name: object
      type: string
      description: Object dot-path
    - name: recursive
      type: boolean
      description: Recursive listing (default true)
- id: introspect_positional
  label: Introspect (positional params form)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":["<name>",true]}'
  params:
    - name: object
      type: string
      description: Object dot-path
    - name: recursive
      type: boolean
      description: Recursive flag
- id: image_source_list
  label: List available sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []
- id: image_connector_list
  label: List available connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []
- id: image_source_listconnectors
  label: List connectors for a source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.<sourcename>.listconnectors"}'
  params:
    - name: sourcename
      type: string
      description: Lowercase name with non-word chars stripped (e.g. displayport1)
- id: environment_getcontrolblocks
  label: Query environment sensors
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"<type>","valuetype":"<valuetype>"}}'
  params:
    - name: type
      type: string
      description: Sensor type (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock)
    - name: valuetype
      type: string
      description: Value type (Temperature, Speed, Voltage, Current, Power, etc.)
- id: ledctrl_blink
  label: Blink an LED (example method invocation)
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"<name>","color":"<color>","period":<n>}}'
  params:
    - name: led
      type: string
      description: LED name (e.g. systemstatus)
    - name: color
      type: string
      description: LED color (e.g. red)
    - name: period
      type: integer
      description: Blink period
- id: warp_enable
  label: Enable global warping
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true}}'
  params: []
- id: warp_file_select
  label: Select uploaded warp file
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"<filename>"}}'
  params:
    - name: filename
      type: string
      description: Warp grid file name (e.g. warp.xml)
- id: warp_file_enable
  label: Enable warp grid file
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true}}'
  params: []
- id: warp_file_upload
  label: Upload warp grid file (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@<file> http://<address>/api/image/processing/warp/file/transfer'
  params:
    - name: file
      type: string
      description: Local warp grid file
    - name: address
      type: string
      description: Projector IP address
- id: blend_file_select
  label: Select uploaded blend mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"<filename>"}}'
  params:
    - name: filename
      type: string
      description: Blend mask file name (e.g. mask.png)
- id: blend_file_enable
  label: Enable blend mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true}}'
  params: []
- id: blend_file_upload
  label: Upload blend mask (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@<file> http://<address>/api/image/processing/blend/file/transfer'
  params:
    - name: file
      type: string
      description: Local blend mask file
    - name: address
      type: string
      description: Projector IP address
- id: blacklevel_file_select
  label: Select uploaded black-level mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"<filename>"}}'
  params:
    - name: filename
      type: string
      description: Black level mask file name (e.g. blacklevel.png)
- id: blacklevel_file_enable
  label: Enable black-level mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true}}'
  params: []
- id: blacklevel_file_upload
  label: Upload black-level mask (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@<file> http://<address>/api/image/processing/blacklevel/file/transfer'
  params:
    - name: file
      type: string
      description: Local black-level mask file
    - name: address
      type: string
      description: Projector IP address
- id: set_input_source
  label: Set active source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"<source>"}}'
  params:
    - name: source
      type: string
      description: Source name (e.g. DisplayPort 1, HDMI, DVI 1, DVI 2, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, SDI)
- id: set_laser_power
  label: Set laser power percent
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":<pct>}}'
  params:
    - name: pct
      type: number
      description: Power percent (bounded by minpower/maxpower)
- id: set_image_brightness
  label: Set image brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":<v>}}'
  params:
    - name: v
      type: number
      description: Normalized brightness, -1 to 1, step 0.01
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning]
  notes: Returned by property.get on system.state
- id: illumination_state
  type: enum
  values: [On, Off]
  notes: Returned by property.get on illumination.state
- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  notes: Returned by property.get on environment.alarmstate
- id: gsm_pinstate
  type: enum
  values: [Accepted, Failed, Locked, Unknown]
  notes: Returned by property.get on gsm.pinstate
- id: illumination_clo_availability
  type: enum
  values: [Available, SensorUnavailable, PendingWarmup, Unavailable, Unknown]
- id: illumination_clo_state
  type: enum
  values: [Ok, TooDim, TooBright]
- id: active_source
  type: string
  notes: Returned by property.get on image.window.main.source
- id: dmx_connectionstate_active
  type: boolean
  notes: True if a DMX/Artnet packet was received in last 10 s
- id: detected_signal
  type: object
  notes: image.connector.<name>.detectedsignal (active, name, resolution, frequency, scan, color_space, signal_range, chroma_sampling, gamma_type, etc.)
- id: environment_temperatures
  type: object
  notes: environment.getcontrolblocks with valuetype Temperature
- id: environment_fan_speeds
  type: object
  notes: environment.getcontrolblocks with valuetype Speed
```

## Variables
```yaml
# Documented RW property examples (all set via property.set / read via property.get).
# Use the source's exhaustive property catalog to extend.
- name: image.window.main.source
  type: string
  settable: true
  notes: Active source name
- name: illumination.sources.laser.power
  type: float
  settable: true
  notes: Target laser power percent
- name: illumination.sources.laser.minpower
  type: float
  settable: false
- name: illumination.sources.laser.maxpower
  type: float
  settable: false
- name: illumination.clo.enable
  type: boolean
  settable: true
- name: illumination.clo.setpoint
  type: float
  settable: true
- name: illumination.clo.scale
  type: float
  settable: true
- name: image.brightness
  type: float
  settable: true
  range: [-1, 1]
- name: image.processing.warp.enable
  type: boolean
  settable: true
- name: image.processing.warp.file.selected
  type: string
  settable: true
- name: image.processing.warp.file.enable
  type: boolean
  settable: true
- name: image.processing.blend.file.selected
  type: string
  settable: true
- name: image.processing.blend.file.enable
  type: boolean
  settable: true
- name: image.processing.blacklevel.file.selected
  type: string
  settable: true
- name: image.processing.blacklevel.file.enable
  type: boolean
  settable: true
- name: dmx.artnet
  type: boolean
  settable: true
- name: dmx.artnetnet
  type: integer
  settable: true
- name: dmx.artnetuniverse
  type: integer
  settable: true
- name: dmx.mode
  type: string
  settable: true
- name: dmx.shutdown
  type: boolean
  settable: true
- name: dmx.shutdowntimeout
  type: integer
  settable: true
  notes: Minutes
- name: dmx.startchannel
  type: integer
  settable: true
  range: [1, 512]
- name: gsm.pin
  type: string
  settable: true
# Source contains a much longer RW property list (image.color.p7.custom.*,
# image.blackcontentdetection.*, etc.) - populate from refined source as needed.
```

## Events
```yaml
- id: property_changed
  description: Unsolicited property change notification from server
  payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"<dot.path>":<value>}]}}'
- id: signal_callback
  description: Signal callback notification from server
  payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"<dot.path>":{"arg":<value>}}]}}'
- id: modelupdated_signal
  description: Object added or removed in introspection tree
  payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"introspect.objectchanged":{"object":"<path>","newobject":true}}]}}'
```

## Macros
```yaml
- id: wake_from_eco
  label: Wake projector from ECO mode
  steps:
    - "Send WOL frame (projector MAC) - alternative path"
    - "Or send :POWR1\\r on RS-232"
    - "Or issue power button on remote / keypad"
- id: select_input_pipeline
  label: Get sources, pick one, set active
  steps:
    - "image.source.list - get available source names"
    - "image.connector.list - list connectors"
    - "property.set image.window.main.source = <name>"
    - "property.subscribe image.window.main.source - get change notifications"
- id: apply_warp_grid
  label: Upload + apply a warp grid file
  steps:
    - "property.set image.processing.warp.enable = true"
    - "curl POST warp grid to /api/image/processing/warp/file/transfer"
    - "property.set image.processing.warp.file.selected = <name>"
    - "property.set image.processing.warp.file.enable = true"
- id: apply_blend_mask
  label: Upload + apply a blend mask image
  steps:
    - "curl POST mask to /api/image/processing/blend/file/transfer"
    - "property.set image.processing.blend.file.selected = <name>"
    - "property.set image.processing.blend.file.enable = true"
- id: apply_blacklevel_mask
  label: Upload + apply a black-level mask
  steps:
    - "curl POST mask to /api/image/processing/blacklevel/file/transfer"
    - "property.set image.processing.blacklevel.file.selected = <name>"
    - "property.set image.processing.blacklevel.file.enable = true"
```

## Safety
```yaml
confirmation_required_for:
  - system.poweroff
  - dmx.shutdown
interlocks:
  - "system.poweron is a no-op if projector already on or transitioning between states - verify state is 'standby' or 'ready' first"
  - "system.poweroff is a no-op if projector already off or transitioning - verify state is 'on' first"
  - "ECO-mode wake requires WOL, physical button, or RS-232 :POWR1 - JSON-RPC system.poweron may not wake from ECO"
# UNRESOLVED: no explicit safety warnings, lamp-cooling timers, or interlock procedures stated beyond the above power-state guards.
```

## Notes
JSON-RPC 2.0 envelopes are line-delimited JSON; "params" member may be absent (e.g. system.poweron) and is ignored if present. Parameter order does not matter; only the key/value binding matters. Authentication is optional for normal end-user access; raise access level by calling `authenticate` with a passcode (`code` is an integer — example value 98765 shown in source, actual codes are projector-specific). ECO-mode projectors will not respond to JSON-RPC `system.poweron` while in ECO — wake via WOL, physical button, or RS-232 `:POWR1\r` first. Property.set requests should be confirmed before sending another for the same property to avoid flooding. `property.subscribe` only sends notifications on change; use `property.get` to fetch the current value. The Pulse API surface is dynamic — peripheral / lens / configuration presence gates which properties exist; use `introspect` to enumerate what the connected unit exposes. Source document was the UDX-tagged Power User Reference guide (rev 1.7, 2019-03-04) — file endpoints, property list, and method list apply to Loki as part of the Pulse family.

<!-- UNRESOLVED: full property catalog (~hundreds of RW properties) not exhaustively reproduced in this spec — the source lists them all under "Alphabetical list of all properties" and the implementer should introspect the live device or read that section when filling in additional Variables. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-06-01T22:38:26.750Z
last_checked_at: 2026-06-02T22:04:15.073Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:04:15.073Z
matched_actions: 35
action_count: 35
confidence: medium
summary: "All 35 spec actions traced to source (dip-safe re-verify). (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "spec covers one model name; full UDX family also shares this API."
- "no explicit safety warnings, lamp-cooling timers, or interlock procedures stated beyond the above power-state guards."
- "full property catalog (~hundreds of RW properties) not exhaustively reproduced in this spec — the source lists them all under \"Alphabetical list of all properties\" and the implementer should introspect the live device or read that section when filling in additional Variables."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
