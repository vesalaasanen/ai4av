---
spec_id: admin/barco-infinipix-manager-nm100
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Infinipix Manager NM100 Control Spec"
manufacturer: Barco
model_family: "Infinipix Manager NM100"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Infinipix Manager NM100"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-12T18:21:54.207Z
last_checked_at: 2026-08-19T08:42:38.720Z
generated_at: 2026-08-19T08:42:38.720Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "list any major gaps here"
  - "source documents no explicit multi-step macro sequences."
  - "source contains no explicit safety warnings or interlock procedures."
  - "firmware version compatibility not stated in source."
  - "error object schema and recovery sequences not stated in source."
  - "explicit interlock procedures not stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:42:38.720Z
  matched_actions: 56
  action_count: 56
  confidence: medium
  summary: "All 56 spec actions map to wire-level JSON-RPC methods, HTTP endpoints, or serial tokens documented verbatim in the source. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-12
---

# Barco Infinipix Manager NM100 Control Spec

## Summary
Barco Infinipix Manager NM100 Pulse projector control spec. The device exposes a JSON-RPC 2.0 service over TCP port 9090 and over RS-232C serial at 19200 baud, 8N1, no flow control. An optional authentication request sets a higher access level; normal end-user access can skip authentication. One literal ASCII wake command (`:POWR1\r`) is sent on the serial port to wake from ECO mode.

<!-- UNRESOLVED: list any major gaps here -->

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
  type: none  # inferred: source states authentication is optional and can be skipped for normal end-user access
```

## Traits
```yaml
- powerable       # inferred from system.poweron / system.poweroff methods
- routable        # inferred from input/source selection commands
- queryable       # inferred from property.get / property.subscribe examples
- levelable       # inferred from illumination power and image property setters
```

## Actions
```yaml
- id: authenticate
  label: Authenticate (optional)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": { "code": 98765 }, "id": 1}'
  params:
    - name: code
      type: integer
      description: Secret pass code. Source example uses 98765; actual value is deployment-specific.
  notes: "Optional. Skipped for normal end-user access. Sets higher access level."

- id: system_poweron
  label: Power On Projector
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron", "id": 3}'
  params: []

- id: system_poweroff
  label: Power Off Projector
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff", "id": 4}'
  params: []

- id: get_system_state
  label: Get Projector State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "system.state" }, "id": 1}'
  params: []

- id: subscribe_system_state
  label: Subscribe to System State Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "system.state" }, "id": 2}'
  params: []

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.window.main.source" }, "id": 0}'
  params: []

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "id": 1}'
  params: []

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.source", "value": "{source}" }, "id": 2}'
  params:
    - name: source
      type: string
      description: Source name (e.g. "DisplayPort 1", "HDMI"). Obtain valid values via image.source.list.

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "id": 3}'
  params: []

- id: list_source_connectors
  label: List Connectors Used by Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{sourceobject}.listconnectors", "id": 4}'
  params:
    - name: sourceobject
      type: string
      description: Source object name. Derive by lowercasing source name and stripping non-word chars (e.g. "DisplayPort 1" -> "displayport1").

- id: get_connector_signal
  label: Get Connector Detected Signal
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.connector.{connector}.detectedsignal" }, "id": 5}'
  params:
    - name: connector
      type: string
      description: Connector object name (e.g. "displayport1").

- id: subscribe_source_property
  label: Subscribe to Active Source Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.window.main.source" }, "id": 6}'
  params: []

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.state" }, "id": 0}'
  params: []

- id: subscribe_illumination_state
  label: Subscribe to Illumination State Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "illumination.state" }, "id": 1}'
  params: []

- id: get_illumination_power
  label: Get Illumination Power Level
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.{source}.power" }, "id": 3}'
  params:
    - name: source
      type: string
      description: Illumination source object name (e.g. "laser"). Discover via introspect of illumination.sources.

- id: set_illumination_power
  label: Set Illumination Power Level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "illumination.sources.{source}.power", "value": {value} }, "id": 5}'
  params:
    - name: source
      type: string
      description: Illumination source object name (e.g. "laser").
    - name: value
      type: integer
      description: Power level in percent. Source example uses 40. Constraint range is dynamic; introspect minpower/maxpower first.

- id: get_illumination_min_power
  label: Get Illumination Minimum Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.{source}.minpower" }, "id": 6}'
  params:
    - name: source
      type: string
      description: Illumination source object name (e.g. "laser").

- id: get_illumination_max_power
  label: Get Illumination Maximum Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.{source}.maxpower" }, "id": 6}'
  params:
    - name: source
      type: string
      description: Illumination source object name (e.g. "laser").

- id: property_get
  label: Get Property Value
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "{property}" }, "id": 4}'
  params:
    - name: property
      type: string
      description: Dot-notation property name (e.g. "image.brightness").

- id: property_set
  label: Set Property Value
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "{property}", "value": {value} }, "id": 3}'
  params:
    - name: property
      type: string
      description: Dot-notation property name.
    - name: value
      type: string
      description: Value matching the property's type and constraints.

- id: property_get_multiple
  label: Get Multiple Property Values
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": ["{prop1}", "{prop2}"] }, "id": 5}'
  params:
    - name: properties
      type: array
      description: Array of dot-notation property names.

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "{property}" }, "id": 6}'
  params:
    - name: property
      type: string
      description: Dot-notation property name.

- id: property_subscribe_multiple
  label: Subscribe to Multiple Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": ["{prop1}", "{prop2}"] }, "id": 7}'
  params:
    - name: properties
      type: array
      description: Array of dot-notation property names.

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": "{property}" }, "id": 8}'
  params:
    - name: property
      type: string
      description: Dot-notation property name.

- id: property_unsubscribe_multiple
  label: Unsubscribe from Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": ["{prop1}", "{prop2}"] }, "id": 9}'
  params:
    - name: properties
      type: array
      description: Array of dot-notation property names.

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "{signal}" }, "id": 10}'
  params:
    - name: signal
      type: string
      description: Signal name (e.g. "modelupdated").

- id: signal_subscribe_multiple
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": ["{sig1}", "{sig2}"] }, "id": 11}'
  params:
    - name: signals
      type: array
      description: Array of signal names (e.g. ["modelupdated", "image.processing.warp.gridchanged"]).

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": "{signal}" }, "id": 12}'
  params:
    - name: signal
      type: string
      description: Signal name.

- id: signal_unsubscribe_multiple
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": ["{sig1}", "{sig2}"] }, "id": 13}'
  params:
    - name: signals
      type: array
      description: Array of signal names.

- id: introspect
  label: Introspect Object (recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "{object}", "recursive": true }, "id": 1}'
  params:
    - name: object
      type: string
      description: Object name in dot notation. Empty/omitted introspects everything.

- id: introspect_nonrecursive
  label: Introspect Object (non-recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "{object}", "recursive": false }, "id": 2}'
  params:
    - name: object
      type: string
      description: Object name in dot notation.

- id: led_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "led": "{led}", "color": "{color}", "period": {period} }, "id": 3}'
  params:
    - name: led
      type: string
      description: LED name (e.g. "systemstatus").
    - name: color
      type: string
      description: LED color (e.g. "red").
    - name: period
      type: integer
      description: Blink period. Source example uses 42.

- id: enable_warp
  label: Enable Warp Globally
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.enable", "value": true }, "id": 10}'
  params: []

- id: upload_warp_file
  label: Upload Warp Grid File
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://{address}/api/image/processing/warp/file/transfer'
  params:
    - name: file
      type: string
      description: Path to local warp grid XML file.
    - name: address
      type: string
      description: Projector IP address (e.g. "192.168.1.100").

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.selected", "value": "{filename}" }, "id": 11}'
  params:
    - name: filename
      type: string
      description: Filename of an uploaded warp file (e.g. "warp.xml").

- id: enable_warp_file
  label: Enable Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.enable", "value": true }, "id": 12}'
  params: []

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://{address}/api/image/processing/blend/file/transfer'
  params:
    - name: file
      type: string
      description: Path to PNG blend mask (8 or 16-bit grayscale).
    - name: address
      type: string
      description: Projector IP address.

- id: select_blend_file
  label: Select Blend Mask File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.selected", "value": "{filename}" }, "id": 13}'
  params:
    - name: filename
      type: string
      description: Blend mask filename (e.g. "mask.png").

- id: enable_blend_file
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.enable", "value": true }, "id": 14}'
  params: []

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://{address}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: file
      type: string
      description: Path to PNG black level mask (8 or 16-bit grayscale).
    - name: address
      type: string
      description: Projector IP address.

- id: select_blacklevel_file
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.selected", "value": "{filename}" }, "id": 15}'
  params:
    - name: filename
      type: string
      description: Black level mask filename (e.g. "blacklevel.png").

- id: enable_blacklevel_file
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.enable", "value": true }, "id": 16}'
  params: []

- id: get_environment_controlblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "{type}", "valuetype": "{valuetype}" }, "id": 18}'
  params:
    - name: type
      type: string
      description: One of Sensor, Filter, Controller, Actuator, Alarm, GenericBlock.
    - name: valuetype
      type: string
      description: One of Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any.

- id: get_alarm_info
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  params: []

- id: list_firmware_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
  params: []

- id: list_firmware_version_status
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []

- id: schedule_firmware_upgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  params: []

- id: engage_clo
  label: Engage CLO at Current Light Level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
  params: []

- id: get_laser_serial_number
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
  params: []

- id: color_p7_copy_preset_to_custom
  label: Color P7 Copy Preset to Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "{presetname}" }}'
  params:
    - name: presetname
      type: string
      description: Source preset name.

- id: color_p7_reset_preset
  label: Color P7 Reset Preset
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "{presetname}" }}'
  params:
    - name: presetname
      type: string
      description: Preset to reset.

- id: color_p7_reset_to_native
  label: Color P7 Reset to Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []

- id: rgb_mode_next
  label: Cycle to Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  params: []

- id: dmx_list_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
  params: []

- id: dmx_list_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
  params: []

- id: serial_wake_from_eco
  label: Wake from ECO via Serial
  kind: action
  command: ":POWR1\r"
  params: []
  notes: "Plain ASCII bytes sent to the RS-232 port per source. Not JSON-RPC."
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]
  property: system.state

- id: illumination_state
  type: enum
  values: [On, Off]
  property: illumination.state

- id: image_window_main_source
  type: string
  property: image.window.main.source

- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
  property: image.window.main.scalingmode

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
  property: image.orientation

- id: illumination_sources_laser_power
  type: float
  property: illumination.sources.laser.power
  description: Target power in percent.

- id: illumination_sources_laser_minpower
  type: float
  property: illumination.sources.laser.minpower
  description: Minimum power in percent.

- id: illumination_sources_laser_maxpower
  type: float
  property: illumination.sources.laser.maxpower
  description: Maximum power in percent.

- id: image_brightness
  type: float
  property: image.brightness
  description: Normalized. 0 default, 1 = 100% offset. Range [-1, 1].

- id: image_contrast
  type: float
  property: image.contrast
  description: Normalized. 1 is default. Range [0, 2].

- id: image_gamma
  type: float
  property: image.gamma
  description: Default 2.2. Range [1, 3].

- id: image_saturation
  type: float
  property: image.saturation
  description: Normalized. 1 default. Range [0, 2].

- id: image_sharpness
  type: integer
  property: image.sharpness
  description: Range [-2, 8].

- id: optics_shutter_position
  type: enum
  values: [Open, Closed]
  property: optics.shutter.position

- id: optics_shutter_target
  type: enum
  values: [Open, Closed]
  property: optics.shutter.target

- id: optics_zoom_position
  type: integer
  property: optics.zoom.position

- id: optics_focus_position
  type: integer
  property: optics.focus.position

- id: optics_lensshift_horizontal_position
  type: integer
  property: optics.lensshift.horizontal.position

- id: optics_lensshift_vertical_position
  type: integer
  property: optics.lensshift.vertical.position

- id: system_standby_enable
  type: boolean
  property: system.standby.enable

- id: system_eco_enable
  type: boolean
  property: system.eco.enable

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  property: environment.alarmstate

- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  property: network.device.lan.state

- id: dmx_mode
  type: string
  property: dmx.mode

- id: dmx_startchannel
  type: integer
  property: dmx.startchannel
  description: Range [1, 512].

- id: dmx_shutdown
  type: boolean
  property: dmx.shutdown
```

## Variables
```yaml
# Image geometry and window placement (image.window.main.*)
- id: image_window_main_position
  property: image.window.main.position
  type: object
  fields:
    - name: x
      type: integer
    - name: y
      type: integer

- id: image_window_main_size
  property: image.window.main.size
  type: object
  fields:
    - name: width
      type: integer
    - name: height
      type: integer

# Network configuration (network.device.lan.ip4config)
- id: network_device_lan_ip4config
  property: network.device.lan.ip4config
  type: object
  fields:
    - name: Address
      type: string
    - name: Mask
      type: string
    - name: Gateway
      type: string
    - name: NameServers
      type: string
```

## Events
```yaml
# Client-implemented notifications the server delivers (no request id, no response).
- id: property_changed
  description: Server pushes an array of property/value pairs when subscribed properties change.
  payload_example: '{"jsonrpc": "2.0", "method": "property.changed", "params": { "property": [ { "system.state": "ready" } ] }}'

- id: signal_callback
  description: Server sends an array of signal/argument-list pairs when subscribed signals fire.
  payload_example: '{"jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ { "objectname.signalname": { "arg1": 100, "arg2": "cat" } } ] }}'

- id: introspect_objectchanged
  description: Emitted via modelupdated signal when objects are added or removed.
  args:
    - name: object
      type: string
    - name: isnew
      type: boolean
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures.
# Power sequencing guidance: source recommends verifying system.state is standby/ready
# before poweron and verifying state is on before poweroff; these are best-practice
# hints, not safety interlocks.
```

## Notes
JSON-RPC 2.0 over TCP/9090 and RS-232 share the same call/response model; both transports are interchangeable per the source. Property and signal names use dot-notation, lowercase, JavaScript-like. Responses may include `id` matching the request; notifications omit `id`. Image parameters pass by name; `params` key order is irrelevant. File uploads/download use plain HTTP (`curl`) to `/api/...` endpoints independent of the JSON-RPC service. Parts of the API are dynamic; introspect at runtime to discover available objects, methods, properties, and signals. DMX exposes different channels depending on mode (basic: 2 channels; extended: more). The serial-only `:POWR1\r` wake command is the lone ASCII action outside the JSON-RPC envelope.
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: error object schema and recovery sequences not stated in source. -->
<!-- UNRESOLVED: explicit interlock procedures not stated in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-12T18:21:54.207Z
last_checked_at: 2026-08-19T08:42:38.720Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:42:38.720Z
matched_actions: 56
action_count: 56
confidence: medium
summary: "All 56 spec actions map to wire-level JSON-RPC methods, HTTP endpoints, or serial tokens documented verbatim in the source. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "list any major gaps here"
- "source documents no explicit multi-step macro sequences."
- "source contains no explicit safety warnings or interlock procedures."
- "firmware version compatibility not stated in source."
- "error object schema and recovery sequences not stated in source."
- "explicit interlock procedures not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
