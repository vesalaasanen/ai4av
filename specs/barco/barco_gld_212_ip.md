---
spec_id: admin/barco-gld-212
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Gld 212 Control Spec"
manufacturer: Barco
model_family: "Barco Gld 212"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Gld 212"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T06:10:08.914Z
last_checked_at: 2026-08-05T08:07:11.039Z
generated_at: 2026-08-05T08:07:11.039Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact firmware version compatibility not stated; API is partly dynamic and varies by projector configuration/peripherals (e.g. motorized lens, DMX extended mode)."
  - "actual pass code value is device-specific, not stated in source"
  - "actual credential.\""
  - "full set of environment sensors is dynamic and projector-specific; use introspection."
  - "additional dynamic properties (e.g. color management P7 presets, lens motor"
  - "source contains no explicit safety interlock procedures, power-sequencing"
  - "firmware version compatibility not stated in source."
  - "authentication pass code value is device-specific (example 98765)."
  - "full property/signal catalogue is dynamic; only documented subset enumerated."
  - "laser power min/max are dynamic and depend on lens type/position."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:07:11.039Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 spec actions match verbatim JSON-RPC methods or serial/file-endpoint commands documented in the source. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-04
---

# Barco Gld 212 Control Spec

## Summary
The Barco Gld 212 is a Pulse-architecture projector controllable via a JSON-RPC 2.0 API ("Pulse API"). The API is reachable over TCP/IP (port 9090) and over an RS-232 serial link (19200 baud). An auxiliary HTTP file-transfer endpoint is used to upload/download warp grids, blend masks, and black-level masks. This spec covers power, source selection, illumination, picture settings, image processing (warp/blend/black level), optics, DMX, environment monitoring, and firmware management.

<!-- UNRESOLVED: exact firmware version compatibility not stated; API is partly dynamic and varies by projector configuration/peripherals (e.g. motorized lens, DMX extended mode). -->

## Transport
```yaml
# TCP/IP carries JSON-RPC; serial carries the same JSON-RPC; HTTP is used only
# for file endpoints (warp/blend/black-level upload+download).
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090  # TCP JSON-RPC service port
  # HTTP file endpoints use base path /api, e.g. http://<host>/api/image/processing/warp/file/transfer
  base_url: "http://{host}/api"  # host address device-specific, not fixed in source
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # Pinout: 9-pin female to host, 9-pin male to projector; 2-2, 3-3, 5-5
auth:
  type: passcode  # source documents an "authenticate" method with a secret code
  # Authentication optional for normal end-user access; required only for higher
  # access levels. Example in source uses code 98765.
  # UNRESOLVED: actual pass code value is device-specific, not stated in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: system.poweron / system.poweroff present
  - queryable     # inferred: property.get query commands present
  - routable      # inferred: source selection via image.window.main.source present
  - levelable     # inferred: brightness/contrast/gamma/saturation/laser power control present
```

## Actions
```yaml
# All JSON-RPC commands share the envelope {"jsonrpc":"2.0","method":...,"params":{...},"id":N}.
# `id` is a client-chosen request identifier (string or number); omitted on notifications.
# Commands below carry the verbatim method/payload from the source.

# --- Power / system ---
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []
  notes: "No-op if already on or in state transition. Verify state is standby/ready first."

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []
  notes: "No-op if already off or in transition. Verify state is on first."

- id: eco_wake_serial
  label: ECO Mode Wake (Serial)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: "ASCII string sent on RS232 to wake a projector in ECO/power-save mode. Serial only. Alternatives: Wake-on-LAN (MAC address), remote power button, keypad power button."

# --- Authentication ---
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765}}'
  params:
    - name: code
      type: integer
      description: "Secret pass code (98765 is a source example; real value device-specific). UNRESOLVED: actual credential."
  notes: "Sets user access level. Optional for normal end-user access; required only for higher levels."

# --- Generic property API (parameterized verbs) ---
- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
  params:
    - name: property
      type: string
      description: "Object/property name in dot notation, e.g. image.brightness"
    - name: value
      type: any
      description: "Value (type depends on target property)"
  notes: "Wait for confirmation before re-setting the same property (avoids flooding)."

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: "Property name, or an array of property names to read multiple at once."

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: "Property name, or array of property names to observe multiple."

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: "Property name, or array of property names."

# --- Generic signal API ---
- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: "Signal name, or array of signal names."

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: "Signal name, or array of signal names."

# --- Introspection ---
- id: introspect
  label: Introspect Object Metadata
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":{recursive}}}'
  params:
    - name: object
      type: string
      description: "Object name in dot notation; empty/'' introspects everything."
    - name: recursive
      type: boolean
      description: "true (default) = full metadata; false = list object names only (one level)."
  notes: "Result restricted by authenticated access level. Also accepts positional params form: params:[\"foo\",true]."

# --- Sources / connectors ---
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []
  notes: "Returns array of source names; contents vary by model (e.g. DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI)."

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []
  notes: "Returns array of physical connector names; varies by model."

- id: image_source_listconnectors
  label: List Connectors Used By Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{sourceobject}.listconnectors"}'
  params:
    - name: sourceobject
      type: string
      description: "Source object name = source name with non-word chars removed, lowercased (e.g. 'DisplayPort 1' -> 'displayport1')."
  notes: "Returns array of {gridposition:{row,column,plane}, name}."

- id: select_source
  label: Select Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"}}'
  params:
    - name: source
      type: string
      description: "Source name from image.source.list, e.g. 'DisplayPort 1', 'HDMI'."

# --- Illumination ---
- id: illumination_clo_engage
  label: Engage Constant Light Output (CLO)
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []
  notes: "Engages CLO at the current light level."

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{value}}}'
  params:
    - name: value
      type: float
      description: "Target power in percent (range device-dependent; see minpower/maxpower)."

# --- Environment ---
- id: environment_getcontrolblocks
  label: Get Environment Sensor Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
  params:
    - name: type
      type: string
      description: "Block type enum: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock."
    - name: valuetype
      type: string
      description: "Value type enum: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any."
  notes: "Returns dict of {sensorname: reading}. Used for temperatures, fan speeds, voltages, etc."

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []
  notes: "Returns array of {severity, timestamp, source, description, custommessage}."

# --- DMX ---
- id: dmx_listchannels
  label: List DMX Channel Names
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []
  notes: "Returns array of available channel names."

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []
  notes: "Returns array of all modes. Basic mode = 2 channels; extended mode exposes more."

# --- Firmware ---
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []
  notes: "Returns array of managed firmware component names."

- id: firmware_listcomponentversionstatus
  label: List Firmware Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []
  notes: "Returns array of {name, versions:{available, running}, status} where status enum: Unknown, OK, Upgradable."

- id: firmware_schedulecomponentupgrade
  label: Schedule Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []
  notes: "Forces a component upgrade at the following reboot."

# --- Color management ---
- id: image_color_p7_custom_copypresettocustom
  label: Copy Color Preset To Custom (P7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: "Name of preset to copy."

- id: image_color_p7_custom_resetpreset
  label: Reset Color Preset (P7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: "Name of preset to reset to defaults."

- id: image_color_p7_custom_resettonative
  label: Reset Color Custom To Native (P7)
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: "Cycles to the next RGB mode."

# --- File endpoints (HTTP) ---
- id: upload_warp_file
  label: Upload Warp Grid File
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: filename
      type: string
      description: "Local warp grid XML file path."
    - name: host
      type: string
      description: "Projector IP address."
  notes: "Warp file format same as MCM500/400. -X POST implied with -F."

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: filename
      type: string
      description: "Grayscale blend mask (PNG up to 16bit, JPEG, TIFF). Size must match blend layer resolution."
    - name: host
      type: string
      description: "Projector IP address."
  notes: "Color images accepted but only blue channel used."

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: filename
      type: string
      description: "Grayscale black level mask (PNG up to 16bit, JPEG, TIFF). Size must match black level layer resolution."
    - name: host
      type: string
      description: "Projector IP address."
```

## Feedbacks
```yaml
# Observable states / query responses. Subscribe via property.subscribe to receive
# unsolicited property.changed notifications.

- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  property: system.state
  description: "Current projector operating state."

- id: illumination_state
  type: enum
  values: [On, Off]
  property: illumination.state
  description: "Light (lamp/laser) on/off state."

- id: laser_power
  type: number
  property: illumination.sources.laser.power
  description: "Current laser power level in percent."

- id: laser_minpower
  type: number
  property: illumination.sources.laser.minpower
  description: "Minimum laser power in percent (read-only, dynamic)."

- id: laser_maxpower
  type: number
  property: illumination.sources.laser.maxpower
  description: "Maximum laser power in percent (read-only, dynamic)."

- id: active_source
  type: string
  property: image.window.main.source
  description: "Name of the currently displayed source."

- id: connector_detectedsignal
  type: object
  property: image.connector.{name}.detectedsignal
  description: "Detected signal info: active, name, resolution, timings, color_space, chroma_sampling, gamma_type, etc. {name} = connector name lowercased, non-word removed."

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  property: environment.alarmstate
  description: "Aggregate projector alarm state."

- id: network_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  property: network.device.lan.state

- id: network_lan_ip4config
  type: object
  property: network.device.lan.ip4config
  description: "{Address, Mask, Gateway, NameServers}."

- id: temperatures
  type: object
  description: "Temperature sensor readings via environment.getcontrolblocks(type:Sensor, valuetype:Temperature). Keys e.g. environment.laser.board0.bank0.temperature, environment.temperature.inlet/outlet/mainboard/scalerfpga, etc."

- id: fan_speeds
  type: object
  description: "Fan tacho readings via environment.getcontrolblocks(type:Sensor, valuetype:Speed). Keys e.g. environment.fan.ar1.tacho ... environment.fan.psu.tacho."

- id: shutter_position
  type: enum
  values: [Open, Closed]
  property: optics.shutter.position

- id: zoom_position
  type: integer
  property: optics.zoom.position

- id: focus_position
  type: integer
  property: optics.focus.position

- id: lensshift_horizontal_position
  type: integer
  property: optics.lensshift.horizontal.position

- id: lensshift_vertical_position
  type: integer
  property: optics.lensshift.vertical.position

# UNRESOLVED: full set of environment sensors is dynamic and projector-specific; use introspection.
```

## Variables
```yaml
# Settable parameters (via property.set). Ranges from source where stated.

- id: image_brightness
  property: image.brightness
  type: float
  min: -1
  max: 1
  step_size: 1
  precision: 0.01
  description: "Image brightness/offset. Normalized; 0 = default, 1 = 100% offset."

- id: image_contrast
  property: image.contrast
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: "Image contrast/gain. Normalized; 1 = default."

- id: image_gamma
  property: image.gamma
  type: float
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  description: "Image gamma. Default 2.2."

- id: image_saturation
  property: image.saturation
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  description: "Color saturation. Normalized; 1 = default."

- id: image_sharpness
  property: image.sharpness
  type: integer
  min: -2
  max: 8
  step_size: 1
  precision: 1
  description: "Image sharpness. Normalized."

- id: image_orientation
  property: image.orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: window_position
  property: image.window.main.position
  type: object
  description: "{x: int, y: int} window position."

- id: window_size
  property: image.window.main.size
  type: object
  description: "{width: int, height: int} window size."

- id: window_scalingmode
  property: image.window.main.scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: warp_enable
  property: image.processing.warp.enable
  type: boolean
  description: "Globally enable/disable all warp functions."

- id: warp_file_enable
  property: image.processing.warp.file.enable
  type: boolean
  description: "Enable/disable file warp."

- id: warp_file_selected
  property: image.processing.warp.file.selected
  type: string
  description: "Currently selected warp grid file name."

- id: blend_file_enable
  property: image.processing.blend.file.enable
  type: boolean

- id: blend_file_selected
  property: image.processing.blend.file.selected
  type: array
  items: string
  description: "Currently selected blend files."

- id: blacklevel_file_enable
  property: image.processing.blacklevel.file.enable
  type: boolean

- id: blacklevel_file_selected
  property: image.processing.blacklevel.file.selected
  type: string

- id: shutter_target
  property: optics.shutter.target
  type: enum
  values: [Open, Closed]

- id: dmx_mode
  property: dmx.mode
  type: string
  description: "Current DMX mode."

- id: dmx_startchannel
  property: dmx.startchannel
  type: integer
  description: "DMX start channel [1..512]."

- id: dmx_shutdown
  property: dmx.shutdown
  type: boolean

- id: standby_enable
  property: system.standby.enable
  type: boolean
  description: "Enable/disable standby state (check availability first)."

- id: eco_enable
  property: system.eco.enable
  type: boolean
  description: "Enable/disable ECO state (check availability first)."

# UNRESOLVED: additional dynamic properties (e.g. color management P7 presets, lens motor
# controls when motorized lens present, extended DMX channels) vary by configuration; use introspect.
```

## Events
```yaml
# Unsolicited JSON-RPC notifications (no id, no response to return).

- id: property_changed
  method: property.changed
  description: "Sent when a subscribed property value changes. params.property is an array of {name: value} objects."
  payload_example: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"image.brightness":0.15}]}}'

- id: signal_callback
  method: signal.callback
  description: "Sent when a subscribed signal is emitted. params.signal is an array of {signalname: {args}} objects."
  payload_example: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"introspect.objectchanged":{"object":"motors.motor1","newobject":true}}]}}'

- id: modelupdated
  signal: modelupdated
  description: "Triggered when the object structure changes (objects added or removed). Subscribe via signal.subscribe."
  notes: "Callback delivers introspect.objectchanged with {object: string, isnew: bool}."
```

## Macros
```yaml
# Multi-step sequences described explicitly in source.
macros:
  - id: activate_warp_file
    label: Upload + Activate Warp Grid
    steps:
      - "Upload via HTTP: curl -X POST -F file=@warp.xml http://{host}/api/image/processing/warp/file/transfer"
      - "property.set image.processing.warp.file.selected = warp.xml"
      - "property.set image.processing.warp.file.enable = true"
      - "property.set image.processing.warp.enable = true"

  - id: activate_blend_mask
    label: Upload + Activate Blend Mask
    steps:
      - "Upload via HTTP: curl -X POST -F file=@mask.png http://{host}/api/image/processing/blend/file/transfer"
      - "property.set image.processing.blend.file.selected = mask.png"
      - "property.set image.processing.blend.file.enable = true"

  - id: activate_blacklevel_mask
    label: Upload + Activate Black Level Mask
    steps:
      - "Upload via HTTP: curl -X POST -F file=@blacklevel.png http://{host}/api/image/processing/blacklevel/file/transfer"
      - "property.set image.processing.blacklevel.file.selected = blacklevel.png"
      - "property.set image.processing.blacklevel.file.enable = true"

  - id: discover_full_api
    label: Reflect Source/Connector Structure
    steps:
      - "Call image.source.list"
      - "Translate each source name to object name (remove non-word chars, lowercase)"
      - "For each source: call image.source.{name}.listconnectors"
      - "Translate connector names to object names"
      - "For each connector: property.subscribe image.connector.{name}.detectedsignal"
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power on is a no-op if projector is already on or in a state transition; source recommends verifying system.state is standby/ready before issuing system.poweron."
  - "Power off is a no-op if already off or transitioning; source recommends verifying system.state is on before issuing system.poweroff."
  - "ECO mode wake requires Wake-on-LAN (MAC), remote/keypad power button, or special serial string :POWR1\\r - normal JSON-RPC poweron does not wake from ECO."
# UNRESOLVED: source contains no explicit safety interlock procedures, power-sequencing
# requirements, or high-voltage warnings beyond the soft-state notes above.
```

## Notes
- The Pulse API is JSON-RPC 2.0. The same command set is available over TCP/IP (port 9090) and RS-232 (19200/8N1); connection type does not change the commands.
- Parameters are passed by name; order does not matter.
- `id` in requests is a client-chosen request identifier (string or number). Notifications (property.changed, signal.callback) have no `id` and must not be answered.
- Source/connector object names are derived from display names by removing non-word characters and lowercasing (e.g. `DisplayPort 1` -> `displayport1`).
- Best practice: wait for `property.set` confirmation before re-setting the same property, to avoid flooding the server.
- The API is partly dynamic — available objects/properties depend on projector configuration and peripherals (e.g. motorized zoom/focus/lens shift, DMX extended mode). Use `introspect` to discover the exact API of a specific unit.
- File endpoints support PNG (up to 16 bit), JPEG, TIFF. Only grayscale is used; color images have their blue channel used (to support grayscale-saved-as-RGB).
- Mask resolution must match the projector's blend/black-level layer: WUXGA -> 1920x1200; WQXGA/4K -> 1280x800; 4K Cinemascope -> 1280x540.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: authentication pass code value is device-specific (example 98765). -->
<!-- UNRESOLVED: full property/signal catalogue is dynamic; only documented subset enumerated. -->
<!-- UNRESOLVED: laser power min/max are dynamic and depend on lens type/position. -->
````

Spec emitted. Barco Gld 212 Pulse JSON-RPC. TCP 9090 + RS232 19200/8N1 + HTTP file endpoints. All methods + properties covered from source. Gaps marked `UNRESOLVED` (firmware ver, auth code, dynamic API surface).

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T06:10:08.914Z
last_checked_at: 2026-08-05T08:07:11.039Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:07:11.039Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 spec actions match verbatim JSON-RPC methods or serial/file-endpoint commands documented in the source. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact firmware version compatibility not stated; API is partly dynamic and varies by projector configuration/peripherals (e.g. motorized lens, DMX extended mode)."
- "actual pass code value is device-specific, not stated in source"
- "actual credential.\""
- "full set of environment sensors is dynamic and projector-specific; use introspection."
- "additional dynamic properties (e.g. color management P7 presets, lens motor"
- "source contains no explicit safety interlock procedures, power-sequencing"
- "firmware version compatibility not stated in source."
- "authentication pass code value is device-specific (example 98765)."
- "full property/signal catalogue is dynamic; only documented subset enumerated."
- "laser power min/max are dynamic and depend on lens type/position."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
