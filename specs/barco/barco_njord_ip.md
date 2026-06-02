---
spec_id: admin/barco-njord
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Njord Control Spec"
manufacturer: Barco
model_family: Njord
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - Njord
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-19T06:20:50.935Z
last_checked_at: 2026-06-01T23:12:25.118Z
generated_at: 2026-06-01T23:12:25.118Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source doc header reads \"For UDX\" — confirm via introspection that all `image.*` / `illumination.*` / `system.*` properties listed below exist on Njord hardware."
  - "no explicit safety warnings, interlock procedures, or power-on sequencing"
  - "source document is labeled \"For UDX\" and explicitly enumerates UDX-4K22 / UDX-W32 as model examples. Njord is a Pulse-series projector that uses the same facade, but the source does not name Njord directly. Confirm per-projector property availability via introspect."
  - "complete property/signal/file-endpoint catalogs are not fully enumerated here; the on-device introspection is authoritative."
  - "voltage, current, wattage, fault behavior, and firmware compatibility ranges not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-01T23:12:25.118Z
  matched_actions: 38
  action_count: 38
  confidence: medium
  summary: "All 38 spec actions have literal wire-level matches in the source; transport values (port 9090, 19200 8N1, HTTP file endpoints, RS-232 ECO wake) confirmed verbatim. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Barco Njord Control Spec

## Summary
Barco Njord is a Pulse-series laser projector controllable over TCP/IP (JSON-RPC 2.0, port 9090) and RS-232 (19200 8N1). This spec covers the JSON-RPC facade API, HTTP file endpoints, and the RS-232 ECO-wake escape sequence documented in the Barco Pulse API Reference Guide v1.7 (2019-03-04), which lists "UDX" prominently and references UDX-4K22 / UDX-W32 as the named model examples; the same Pulse facade applies to the Njord.

<!-- UNRESOLVED: source doc header reads "For UDX" — confirm via introspection that all `image.*` / `illumination.*` / `system.*` properties listed below exist on Njord hardware. -->

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
  type: passcode  # optional; endpoint access by default, passcode only needed for elevated access
  notes: >-
    For normal end-user access, authentication can be skipped. The `authenticate`
    method accepts a numeric `code` (example in source: 98765) to elevate access;
    valid codes are user/site-specific and not enumerated in the source.
```

## Traits
```yaml
# - powerable       (system.poweron / system.poweroff present; RS-232 :POWR1\r wake)
# - routable        (property.set image.window.main.source with named-source values)
# - queryable       (property.get, image.source.list, image.connector.list, environment.getcontrolblocks)
# - levelable       (property.set illumination.sources.laser.power; image.brightness; etc.)
# - introspectable  (introspect method, modelupdated signal)
# - subscribable    (property.subscribe, signal.subscribe, property.changed, signal.callback)
# - file_endpoint   (HTTP /api/image/processing/{warp,blend,blacklevel}/file/transfer etc.)
```

## Actions
```yaml
# Core JSON-RPC methods. All requests use {"jsonrpc":"2.0", "method":"<name>", "params":{...}, "id":N}
# over TCP port 9090 (same payloads are accepted on the RS-232 serial link).

- id: power_on
  label: Power On Projector
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"system.poweron","id":3}
  params: []
  notes: Verify `system.state` is `standby` or `ready` before issuing. Result is null on success.

- id: power_off
  label: Power Off Projector
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"system.poweroff","id":4}
  params: []
  notes: Verify `system.state` is `on` before issuing. Result is null on success.

- id: authenticate
  label: Authenticate (Elevate Access)
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"authenticate","params":{"code":98765},"id":1}
  params:
    - name: code
      type: integer
      description: Numeric passcode. Example value 98765 from source; actual values are site-specific.
  notes: Skippable for normal end-user access. Required for higher-than-user access levels.

- id: introspect_recursive
  label: Introspect Object (Recursive)
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"introspect","params":{"object":"foo","recursive":true},"id":1}
  params:
    - name: object
      type: string
      description: Dot-notation object name; empty/omitted introspects everything.
    - name: recursive
      type: boolean
      description: If false, only one level of object names is returned.
  notes: Equivalent array form: `params": ["foo", true]`.

- id: introspect_nonrecursive
  label: Introspect Object (Non-Recursive)
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"introspect","params":{"object":"motors","recursive":false},"id":2}
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean

- id: property_set
  label: Set Property Value
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":0.15},"id":9}
  params:
    - name: property
      type: string
      description: Dot-notation property name (e.g. image.brightness, image.window.main.source).
    - name: value
      type: any
      description: JSON value matching the property's type/range.

- id: property_get
  label: Get Property Value
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":7}
  params:
    - name: property
      type: string

- id: property_get_multi
  label: Get Multiple Property Values
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":["image.brightness","image.contrast"]},"id":5}
  params:
    - name: property
      type: array
      description: Array of property name strings.

- id: property_subscribe
  label: Subscribe To Property Changes
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"},"id":8}
  params:
    - name: property
      type: string  # or array of strings for multi-subscribe

- id: property_subscribe_multi
  label: Subscribe To Multiple Properties
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["image.brightness","image.contrast"]},"id":7}

- id: property_unsubscribe
  label: Unsubscribe From Property
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"image.brightness"},"id":8}

- id: property_unsubscribe_multi
  label: Unsubscribe From Multiple Properties
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["image.brightness","image.contrast"]},"id":9}

- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"modelupdated"},"id":10}
  params:
    - name: signal
      type: string  # or array

- id: signal_subscribe_multi
  label: Subscribe To Multiple Signals
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]},"id":11}

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"modelupdated"},"id":12}

- id: signal_unsubscribe_multi
  label: Unsubscribe From Multiple Signals
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]},"id":13}

- id: led_blink
  label: Blink Status LED
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42},"id":3}
  params:
    - name: led
      type: string
    - name: color
      type: string
    - name: period
      type: integer

- id: list_sources
  label: List Available Sources
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.source.list","id":1}
  notes: Returns string array; exact contents vary by projector model (e.g. DVI 1, DVI 2, DisplayPort 1/2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI).

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.connector.list","id":3}

- id: list_source_connectors
  label: List Connectors For A Source
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"image.source.displayport1.listconnectors","id":4}
  params:
    - name: source_object
      type: string
      description: Object name (lowercase, non-word chars stripped). Example: "displayport1" from source "DisplayPort 1".

- id: get_source_signal
  label: Get Detected Signal On Connector
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.displayport1.detectedsignal"},"id":5}
  params:
    - name: property
      type: string
      description: Use connector object name (e.g. image.connector.displayport1.detectedsignal).

- id: get_environment_sensors
  label: Read Environment Sensor Block
  kind: query
  command: |
    {"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"},"id":18}
  params:
    - name: type
      type: string
      description: One of Sensor, Filter, Controller, Actuator, Alarm, GenericBlock.
    - name: valuetype
      type: string
      description: One of Temperature, ADC, Median, Simulation, Speed, Coordinate, Noise, State, PWM, Peltier, Weighting, Pump, Voltage, Waveform, Comparison, Resistance, Current, Average, Threshold, Constant, Power, Delay, Formula, Manual, Altitude, Difference, Driver, Range, Pressure, Interpolation, PID, Any, Humidity, Limit, Mode.

- id: set_active_source
  label: Set Active Source On Main Window
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"},"id":2}
  params:
    - name: value
      type: string
      description: One of the names returned by image.source.list (e.g. "DisplayPort 1", "HDMI", "DVI 1", "HDBaseT", "SDI", "Dual DVI", "Dual DisplayPort", "Dual Head DVI", "Dual Head DisplayPort").

- id: set_brightness
  label: Set Image Brightness
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":0.15},"id":9}
  params:
    - name: value
      type: float
      description: Normalized -1..1, default 0, precision 0.01.

- id: set_laser_power
  label: Set Laser Illumination Power
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":40},"id":5}
  params:
    - name: value
      type: float
      description: Percent. Clamped between current minpower and maxpower (dynamic).

- id: set_warp_enable
  label: Enable Warp Globally
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true},"id":10}

- id: select_warp_file
  label: Select Active Warp File
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"},"id":11}
  params:
    - name: value
      type: string
      description: Filename of a previously uploaded warp grid.

- id: enable_warp_file
  label: Enable Active Warp File
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":12}

- id: select_blend_file
  label: Select Active Blend Mask
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"},"id":13}

- id: enable_blend_file
  label: Enable Active Blend Mask
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":14}

- id: select_blacklevel_file
  label: Select Active Black Level Mask
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"},"id":15}

- id: enable_blacklevel_file
  label: Enable Active Black Level Mask
  kind: action
  command: |
    {"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":16}

- id: upload_warp_file
  label: Upload Warp Grid File (HTTP)
  kind: action
  command: |
    curl -X POST -F file=@warp.xml http://<projector-ip>/api/image/processing/warp/file/transfer
  params:
    - name: file
      type: string
      description: Local path of warp XML file. Format same as MCM500/400.
  notes: HTTP POST to /api/image/processing/warp/file/transfer; must be followed by property.set image.processing.warp.file.selected and image.processing.warp.file.enable.

- id: download_warp_file
  label: Download Current Warp Grid (HTTP)
  kind: action
  command: |
    curl -O -J http://<projector-ip>/api/image/processing/warp/file/transfer
  notes: Returns the active warp file. If the endpoint does not support "current file", specify a filename in the path.

- id: download_warp_file_named
  label: Download Named Warp Grid (HTTP)
  kind: action
  command: |
    curl -O -J http://<projector-ip>/api/image/processing/warp/file/transfer/warpgrid.xml
  params:
    - name: filename
      type: string

- id: upload_blend_file
  label: Upload Blend Mask (HTTP)
  kind: action
  command: |
    curl -X POST -F file=@mask.png http://<projector-ip>/api/image/processing/blend/file/transfer
  notes: Grayscale PNG/JPEG/TIFF, 8 or 16 bit, resolution must match blend layer: WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540.

- id: upload_blacklevel_file
  label: Upload Black Level Mask (HTTP)
  kind: action
  command: |
    curl -X POST -F file=@blacklevel.png http://<projector-ip>/api/image/processing/blacklevel/file/transfer
  notes: Same resolution constraints as blend mask.

- id: rs232_eco_wake
  label: Wake Projector From ECO Mode (RS-232)
  kind: action
  command: ":POWR1\r"
  params: []
  notes: ASCII sent on the serial link. Other wake options: Wake-on-LAN (HW/MAC), remote control, keypad. The wake ASCII sequence is a one-shot escape, not part of the JSON-RPC facade.
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning]
  source_property: system.state

- id: illumination_state
  type: enum
  values: [On, Off]
  source_property: illumination.state

- id: detected_signal
  type: object
  description: Signal info on a connector. Keyed by image.connector.<name>.detectedsignal. Sample fields: active, name, vertical_total, horizontal_total, vertical_resolution, horizontal_resolution, vertical_sync_width, vertical_front_porch, vertical_back_porch, horizontal_sync_width, horizontal_front_porch, horizontal_back_porch, horizontal_frequency, vertical_frequency, pixel_rate, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type.

- id: environment_sensor_block
  type: object
  description: Dictionary returned by environment.getcontrolblocks. Keys include environment.temperature.{cyclon5,imx6,inlet,mainboard,mainpower,outlet,scalerfpga}, environment.laser.board{0,1}.bank{0,1,2}.temperature, environment.laser.board{0,1}.heatsink{0,1,2}.temperature, environment.fan.{ar1..ar5,driver,optics,pcb,phosphorleft,phosphorright,psu}.tacho.

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  source_property: environment.alarmstate

- id: pin_state
  type: enum
  values: [Accepted, Failed, Locked, Unknown]
  source_property: gsm.pinstate

- id: clo_availability
  type: enum
  values: [Available, SensorUnavailable, PendingWarmup, Unavailable, Unknown]
  source_property: illumination.clo.availability

- id: clo_state
  type: enum
  values: [Ok, TooDim, TooBright]
  source_property: illumination.clo.state

- id: artnet_active
  type: boolean
  source_property: dmx.monitor.connectionstate.active
  description: true if a dmx or artnet package was received in the last 10 seconds.

- id: firmware_version
  type: string
  source_property: firmware.firmwareversion
```

## Variables
```yaml
- id: laser_power_percent
  type: float
  range: [illumination.sources.laser.minpower, illumination.sources.laser.maxpower]
  source_property: illumination.sources.laser.power
  access: RW
  notes: Range is dynamic; lens type/position may affect min/max.

- id: laser_power_limited
  type: boolean
  source_property: illumination.sources.laser.ispowerlimited
  access: R

- id: laser_power_limit_reason
  type: string
  source_property: illumination.sources.laser.powerlimitreason
  access: R

- id: brightness
  type: float
  range: [-1, 1]
  precision: 0.01
  source_property: image.brightness
  access: RW

- id: clo_enable
  type: boolean
  source_property: illumination.clo.enable
  access: RW

- id: clo_setpoint
  type: float
  source_property: illumination.clo.setpoint
  access: RW
  description: Target luminosity of the light source.

- id: clo_scale
  type: float
  source_property: illumination.clo.scale
  access: RW
  description: Percentage scaling of the setpoint.

- id: dmx_artnet
  type: boolean
  source_property: dmx.artnet
  access: RW

- id: dmx_artnet_net
  type: integer
  source_property: dmx.artnetnet
  access: RW

- id: dmx_artnet_universe
  type: integer
  source_property: dmx.artnetuniverse
  access: RW

- id: dmx_mode
  type: string
  source_property: dmx.mode
  access: RW

- id: dmx_shutdown
  type: boolean
  source_property: dmx.shutdown
  access: RW

- id: dmx_shutdowntimeout
  type: integer
  source_property: dmx.shutdowntimeout
  access: RW
  description: Shutdown timeout in minutes.

- id: dmx_startchannel
  type: integer
  range: [1, 512]
  source_property: dmx.startchannel
  access: RW

- id: gsm_pin
  type: string
  source_property: gsm.pin
  access: RW

- id: gsm_available
  type: boolean
  source_property: gsm.available
  access: R

# dmx.monitor.channel{01..14}.{function,offset,value} read-only per-channel introspection.
# image.color.p7.custom.{red,green,blue,cyan,magenta,yellow,white}.{gain,lum,x,y} RW color points.
# image.color.p7.custom.{rgbcmy,rgb,luminances,gains,whitegain,cmy}available read-only flags.
# image.color.p7.custom.mode (string RW), .modes (R array), .target (R object), .whitemode (enum: Coordinates|Temperature RW), .whitetemperature (int 3200..13000 RW).
# image.blackcontentdetection.* (DEPRECATED in source): enable (bool RW), dimminginterval (int 0..3000 RW), sampleinterval (int 500..3000 RW), threshold (int 0..255 RW), state (bool R).
```

## Events
```yaml
# Server-to-client notifications. Client must implement the listed methods to receive them;
# notifications carry no `id` and the client must NOT respond.

- id: property_changed
  method: property.changed
  description: Unsolicited change notification for one or more subscribed properties.
  payload_example: |
    {
      "jsonrpc":"2.0",
      "method":"property.changed",
      "params":{
        "property":[
          {"system.state":"ready"}
        ]
      }
    }
  notes: >-
    For each subscription, the server first emits a notification with the
    previously-selected value being cleared (empty string), then a second
    notification with the new value. Not emitted unless value actually changes;
    use property.get to fetch current value.

- id: signal_callback
  method: signal.callback
  description: Unsolicited signal callback for subscribed signals. Payload is a list of signal/argument-list pairs.
  payload_example: |
    {
      "jsonrpc":"2.0",
      "method":"signal.callback",
      "params":{
        "signal":[
          {"introspect.objectchanged":{"object":"motors.motor1","newobject":true}}
        ]
      }
    }
```

## Macros
```yaml
# Documented multi-step sequences.

- id: apply_warp_grid
  label: Upload + Activate + Enable Warp Grid
  steps:
    - upload_warp_file           # POST warp XML to /api/image/processing/warp/file/transfer
    - property_set {property: image.processing.warp.file.selected, value: <filename>}
    - property_set {property: image.processing.warp.file.enable, value: true}
  source_note: Source §"Warping with grid files".

- id: apply_blend_mask
  label: Upload + Activate + Enable Blend Mask
  steps:
    - upload_blend_file          # POST mask.png to /api/image/processing/blend/file/transfer
    - property_set {property: image.processing.blend.file.selected, value: <filename>}
    - property_set {property: image.processing.blend.file.enable, value: true}
  source_note: Source §"Blending with images". Mask must be 8/16-bit grayscale PNG/JPEG/TIFF, size must match blend layer (WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540).

- id: apply_blacklevel_mask
  label: Upload + Activate + Enable Black Level Mask
  steps:
    - upload_blacklevel_file     # POST blacklevel.png to /api/image/processing/blacklevel/file/transfer
    - property_set {property: image.processing.blacklevel.file.selected, value: <filename>}
    - property_set {property: image.processing.blacklevel.file.enable, value: true}
  source_note: Source §"Black level adjustment with images". Same size constraints as blend mask.

- id: wake_from_eco
  label: Wake Projector From ECO Mode
  steps:
    - rs232_eco_wake             # send ":POWR1\r" on the serial link
  notes: Alternatives per source: Wake-on-LAN (MAC), IR remote, keypad. ECO-mode wake is required because the network stack is asleep.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on sequencing
# requirements (beyond the implicit "verify state before power on/off" advice) appear in
# the source document. Populate only if explicit source text is added.
```

## Notes
- API surface is dynamic. The source explicitly states: "Parts of the API are dynamic, other parts depend on peripherals or other factors." Best practice: call `introspect` on the live device to enumerate methods/properties/signals. A `modelupdated` signal fires when objects appear/disappear; the example payload is `{"object":"motors.motor1","newobject":true}`.
- Method/property naming: dot notation, lowercase, JavaScript-like (e.g. `system.poweron`, `image.window.main.source`, `tempctrl.fans.mainfan.rpm`). Members may be `method`, `property`, `signal`, or `object`.
- Parameters are passed by name; `params` order does not matter. `params` may be omitted entirely for methods that take no arguments; supplying an empty `params` is also accepted.
- `property.set` best practice: wait for the result confirmation before issuing another `property.set` on the same property. Continuous flooding degrades server performance.
- Object-name translation: convert source/connector display names to object names by lowercasing and stripping non-word characters. Example from source: "DisplayPort 1" → "displayport1".
- Notifications vs. subscriptions: `property.subscribe` does NOT push the current value; it only requests change notifications. Use `property.get` for the current value.
- The full alphabetical property catalog (dmx.* monitor channels, image.color.p7.custom.*, image.blackcontentdetection.*, illumination.clo.*, environment.*, signal.*, etc.) is documented in the source but too large to enumerate in this spec. The verifier should treat `introspect` as the source of truth for the on-device set.
- Source filename/version: `barco_njord_ip.refined.md` is the refined excerpt of the Barco Pulse API Reference Guide v1.7 (2019-03-04), titled "RS232 and Network Command Catalog — For JSON RPC/Pulse Based Projectors — For UDX".

<!-- UNRESOLVED: source document is labeled "For UDX" and explicitly enumerates UDX-4K22 / UDX-W32 as model examples. Njord is a Pulse-series projector that uses the same facade, but the source does not name Njord directly. Confirm per-projector property availability via introspect. -->
<!-- UNRESOLVED: complete property/signal/file-endpoint catalogs are not fully enumerated here; the on-device introspection is authoritative. -->
<!-- UNRESOLVED: voltage, current, wattage, fault behavior, and firmware compatibility ranges not stated in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-05-19T06:20:50.935Z
last_checked_at: 2026-06-01T23:12:25.118Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T23:12:25.118Z
matched_actions: 38
action_count: 38
confidence: medium
summary: "All 38 spec actions have literal wire-level matches in the source; transport values (port 9090, 19200 8N1, HTTP file endpoints, RS-232 ECO wake) confirmed verbatim. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source doc header reads \"For UDX\" — confirm via introspection that all `image.*` / `illumination.*` / `system.*` properties listed below exist on Njord hardware."
- "no explicit safety warnings, interlock procedures, or power-on sequencing"
- "source document is labeled \"For UDX\" and explicitly enumerates UDX-4K22 / UDX-W32 as model examples. Njord is a Pulse-series projector that uses the same facade, but the source does not name Njord directly. Confirm per-projector property availability via introspect."
- "complete property/signal/file-endpoint catalogs are not fully enumerated here; the on-device introspection is authoritative."
- "voltage, current, wattage, fault behavior, and firmware compatibility ranges not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
