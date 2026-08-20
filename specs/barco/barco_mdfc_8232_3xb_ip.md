---
spec_id: admin/barco-mdfc-8232-3xb
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco MDFC 8232 3XB Control Spec"
manufacturer: Barco
model_family: "MDFC 8232 3XB"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "MDFC 8232 3XB"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:17:49.834Z
last_checked_at: 2026-08-19T08:57:37.167Z
generated_at: 2026-08-19T08:57:37.167Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full property/method/signal catalog documented for Pulse API generally; only a subset of properties (image.brightness/contrast/gamma/saturation/sharpness, illumination, image.window.main.source, warp/blend/blacklevel file enable/selected, optics shutter/zoom/focus/lensshift, dmx, network) explicitly illustrated in examples."
  - "auth token format (only `code: 98765` shown), default user/access level name, session lifecycle"
  - "dynamic; specific range for this model not stated"
  - "feature availability per model"
  - "source provides no explicit safety warnings, interlocks, or power-on sequencing hazards."
  - "firmware version compatibility, model-specific source list contents, default DMX mode, full method/property/signal catalogue (only the subset illustrated in the source is fully captured; the alphabetical appendix lists additional properties/methods/signals as documented), default auth access level name, session/connection lifecycle semantics, whether HTTP API uses the same auth as TCP JSON-RPC."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:57:37.167Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec actions are present verbatim in the source, transport parameters match, and no significant commands are unrepresented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-18
---

# Barco MDFC 8232 3XB Control Spec

## Summary
Barco Pulse projectors use a JSON-RPC 2.0 API available over TCP/IP on port 9090 and over RS-232 serial. The same JSON-RPC method/property/signal/object vocabulary drives authentication, property read/write/subscribe, signal subscribe/unsubscribe, introspection, and file upload over HTTP endpoints under `/api`.

<!-- UNRESOLVED: full property/method/signal catalog documented for Pulse API generally; only a subset of properties (image.brightness/contrast/gamma/saturation/sharpness, illumination, image.window.main.source, warp/blend/blacklevel file enable/selected, optics shutter/zoom/focus/lensshift, dmx, network) explicitly illustrated in examples. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
  base_url: http://<projector-ip>/api
auth:
  type: code  # source states a secret "code" pass code is required for elevated access; normal end-user level can skip auth
# UNRESOLVED: auth token format (only `code: 98765` shown), default user/access level name, session lifecycle
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
```

## Traits
```yaml
- powerable       # power on/off commands present
- routable        # input source selection commands present
- queryable       # property.get query commands present
- levelable       # brightness/contrast/gamma/saturation/sharpness/illumination.power present
- subscribable    # property.subscribe / signal.subscribe for change notifications
- introspectable  # introspect method for object/method/property/signal enumeration
```

## Actions
```yaml
- id: authenticate
  label: Authenticate (elevated access)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": { "code": 98765 }, "id": 1}'
  params:
    - name: code
      type: integer
      description: Secret pass code granting elevated access level

- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron", "params": { "id": 3, "property": "system.state" }, "id": 3}'
  notes: Best practice: verify system.state is "standby" or "ready" before issuing. Method returns result:null, not an error.
  params: []

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff", "params": { "id": 4, "property": "system.state" }, "id": 4}'
  notes: Best practice: verify system.state is "on" before issuing.
  params: []

- id: property_set
  label: Set Property Value
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "objectname.propertyname", "value": 100 }, "id": 3}'
  notes: Wait for confirmation before re-setting the same property to avoid request flooding.
  params:
    - name: property
      type: string
      description: Dot-notation property name (e.g. image.window.main.source, image.brightness)
    - name: value
      type: string  # type depends on property (string / float / int / bool)
      description: New value, JSON-encoded

- id: property_get
  label: Get Property Value
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "objectname.propertyname" }, "id": 4}'
  params:
    - name: property
      type: string
      description: Dot-notation property name

- id: property_get_multiple
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": ["image.brightness","image.contrast"] }, "id": 5}'
  params:
    - name: property
      type: array
      description: List of dot-notation property names

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.brightness" }, "id": 6}'
  notes: Notifications arrive as property.changed method calls (no response expected for notifications).
  params:
    - name: property
      type: string
      description: Single property name or array of property names

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": "image.brightness" }, "id": 8}'
  params:
    - name: property
      type: string
      description: Single property name or array of property names

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "modelupdated" }, "id": 10}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": "modelupdated" }, "id": 12}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names

- id: introspect
  label: Introspect Object (recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "foo", "recursive": true }, "id": 1}'
  params:
    - name: object
      type: string
      description: Object name (dot notation allowed); empty/default introspects everything
    - name: recursive
      type: boolean
      description: If false, only direct children are listed (one level)

- id: introspect_non_recursive
  label: Introspect Object (non-recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "motors", "recursive": false }, "id": 2}'
  params:
    - name: object
      type: string
      description: Object name
    - name: recursive
      type: boolean
      description: Set to false for one-level listing

- id: ledctrl_blink
  label: Blink Status LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "led": "systemstatus", "color": "red", "period": 42 }, "id": 3}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. systemstatus)
    - name: color
      type: string
      description: LED color
    - name: period
      type: integer
      description: Blink period

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "id": 1}'
  notes: Returns array of source names; contents vary by projector model.
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "id": 3}'
  notes: Returns array of connector names; availability depends on projector model.
  params: []

- id: image_source_listconnectors
  label: List Connectors Used by Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.displayport1.listconnectors", "id": 4}'
  params:
    - name: sourceName
      type: string
      description: Source object name - translate from display name by stripping non-word chars and lowercasing (e.g. "DisplayPort 1" -> "displayport1")

- id: environment_getcontrolblocks
  label: Get Environment Sensor Blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "Sensor", "valuetype": "Temperature" }, "id": 18}'
  params:
    - name: type
      type: string
      description: "Sensor block type: Sensor | Filter | Controller | Actuator | Alarm | GenericBlock"
    - name: valuetype
      type: string
      description: "Sensor value type: Temperature | Speed | PWM | Voltage | Current | Power | Altitude | Pressure | Humidity | ADC | Coordinate | Peltier | Waveform | Average | Delay | Difference | Interpolation | Limit | Median | Noise | Weighting | Comparison | Threshold | Formula | Driver | PID | Mode | State | Pump | Resistance | Simulation | Constant | Manual | Range | Any"

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  notes: Returns array of alarm objects with severity, timestamp, source, description, custommessage.
  params: []

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
  notes: Extended mode exposes more channels than basic mode.
  params: []

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Versions and Upgrade Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  notes: Forces upgrade at next reboot.
  params: []

- id: illumination_clo_engage
  label: Engage CLO (Constant Light Output)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
  notes: Engages CLO at the current light level.
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
  params: []

- id: image_color_p7_custom_copypresettocustom
  label: P7 Color: Copy Preset to Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "<name>" }}'
  params:
    - name: presetname
      type: string
      description: Name of preset to copy

- id: image_color_p7_custom_resetpreset
  label: P7 Color: Reset Preset to Defaults
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "<name>" }}'
  params:
    - name: presetname
      type: string
      description: Name of preset to reset

- id: image_color_p7_custom_resettonative
  label: P7 Color: Reset to Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  notes: Cycles through all available RGB modes.
  params: []

- id: warp_upload_file
  label: Upload Warp Grid File
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://<projector-ip>/api/image/processing/warp/file/transfer'
  notes: HTTP POST to file endpoint.
  params:
    - name: filename
      type: string
      description: Local path to warp grid XML file

- id: blend_mask_upload
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://<projector-ip>/api/image/processing/blend/file/transfer'
  notes: PNG 8 or 16 bit grayscale; resolution must match blend layer. Supported: PNG up to 16 bit, JPEG, TIFF (color accepted, only blue channel used).
  params:
    - name: filename
      type: string
      description: Local path to blend mask

- id: blacklevel_upload
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://<projector-ip>/api/image/processing/blacklevel/file/transfer'
  notes: PNG 8 or 16 bit grayscale; resolution must match blacklevel layer.
  params:
    - name: filename
      type: string
      description: Local path to black level mask

- id: eco_mode_wake_serial
  label: Wake from ECO Mode via Serial
  kind: action
  command: ':POWR1\r'
  notes: ASCII wake sequence sent on RS-232 when projector is in ECO mode. Other wake paths: WoL packet to MAC address, remote power button, keypad power button.
  params: []
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning]
  # source enum also lists "service" and "error"

- id: illumination_state
  type: enum
  values: [On, Off]

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: detected_signal_active
  type: boolean
  # from image.connector.<name>.detectedsignal.active

- id: detected_signal_name
  type: string
  # from image.connector.<name>.detectedsignal.name (e.g. "2560x1600 @ 50.10Hz")

- id: network_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: optics_shutter_position
  type: enum
  values: [Open, Closed]

- id: property_changed_notification
  type: object
  # server-pushed notification: {"method":"property.changed","params":{"property":[{"object.name": value}, ...]}}

- id: signal_callback_notification
  type: object
  # server-pushed notification: {"method":"signal.callback","params":{"signal":[{"signal.name": {"arg1":...}}, ...]}}

- id: object_changed_notification
  type: object
  # server-pushed notification: {"method":"signal.callback","params":{"signal":[{"introspect.objectchanged":{"object":"...","newobject":true|false}}]}}
```

## Variables
```yaml
- id: image_brightness
  type: float
  range: [-1, 1]
  step: 0.01
  default: 0  # 0 = default, 1 = 100% offset
  property: image.brightness

- id: image_contrast
  type: float
  range: [0, 2]
  step: 0.01
  default: 1  # 1 = default
  property: image.contrast

- id: image_gamma
  type: float
  range: [1, 3]
  step: 0.1
  default: 2.2
  property: image.gamma

- id: image_saturation
  type: float
  range: [0, 2]
  step: 0.01
  default: 1
  property: image.saturation

- id: image_sharpness
  type: integer
  range: [-2, 8]
  step: 1
  property: image.sharpness

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
  property: image.orientation

- id: image_window_main_source
  type: string
  property: image.window.main.source
  # values depend on projector; examples: DisplayPort 1, HDMI

- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
  property: image.window.main.scalingmode

- id: image_window_main_position
  type: object
  properties: {x: int, y: int}
  property: image.window.main.position

- id: image_window_main_size
  type: object
  properties: {width: int, height: int}
  property: image.window.main.size

- id: illumination_sources_laser_power
  type: float
  range: [0, 100]  # percent; minpower/maxpower dynamic, lens dependent
  property: illumination.sources.laser.power

- id: illumination_sources_laser_minpower
  type: float
  property: illumination.sources.laser.minpower
  # UNRESOLVED: dynamic; specific range for this model not stated

- id: illumination_sources_laser_maxpower
  type: float
  property: illumination.sources.laser.maxpower
  # UNRESOLVED: dynamic; specific range for this model not stated

- id: image_processing_warp_enable
  type: boolean
  property: image.processing.warp.enable

- id: image_processing_warp_file_enable
  type: boolean
  property: image.processing.warp.file.enable

- id: image_processing_warp_file_selected
  type: string
  property: image.processing.warp.file.selected

- id: image_processing_blend_file_enable
  type: boolean
  property: image.processing.blend.file.enable

- id: image_processing_blend_file_selected
  type: array
  items: string
  property: image.processing.blend.file.selected

- id: image_processing_blacklevel_file_enable
  type: boolean
  property: image.processing.blacklevel.file.enable

- id: image_processing_blacklevel_file_selected
  type: string
  property: image.processing.blacklevel.file.selected

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

- id: dmx_startchannel
  type: integer
  range: [1, 512]
  property: dmx.startchannel

- id: dmx_mode
  type: string
  property: dmx.mode

- id: dmx_shutdown
  type: boolean
  property: dmx.shutdown

- id: system_standby_enable
  type: boolean
  property: system.standby.enable
  # UNRESOLVED: feature availability per model

- id: system_eco_enable
  type: boolean
  property: system.eco.enable
  # UNRESOLVED: feature availability per model

- id: network_device_lan_ip4config
  type: object
  properties:
    Address: string
    Mask: string
    Gateway: string
    NameServers: string
  property: network.device.lan.ip4config
```

## Events
```yaml
- id: property_changed
  description: Server-pushed notification when a subscribed property value changes. Client must implement property.changed listener.
  payload: '{"jsonrpc": "2.0", "method": "property.changed", "params": { "property": [ {"objectname.propertyname": value} ] }}'

- id: signal_callback
  description: Server-pushed notification when a subscribed signal is emitted. Client must implement signal.callback listener.
  payload: '{"jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ {"signalname": {"arg1": v}} ] }}'

- id: modelupdated
  description: Signal triggered when the object structure changes (objects added or removed). Subscribe via signal.subscribe.
  property: modelupdated

- id: introspect_objectchanged
  description: Signal emitted via signal.callback when introspect detects object addition/removal.
  payload: '{"introspect.objectchanged": {"object": "<name>", "newobject": true|false}}'

- id: source_change_notifications
  description: Two notifications on source switch: first deselects the previous source (empty string), then sets the new one.
  payload: '{"jsonrpc": "2.0", "method": "property.changed", "params": { "property": [ {"image.window.main.source": ""} ] }}'
```

## Macros
```yaml
- id: power_on_with_state_check
  description: Power-on with state pre-check (recommended by source).
  steps:
    - "property.get system.state"
    - "if state in {standby, ready}: system.poweron"

- id: power_off_with_state_check
  description: Power-off with state pre-check (recommended by source).
  steps:
    - "property.get system.state"
    - "if state == on: system.poweroff"

- id: upload_and_activate_warp
  description: Upload warp grid, select, enable.
  steps:
    - "curl -X POST -F file=@warp.xml http://<projector-ip>/api/image/processing/warp/file/transfer"
    - "property.set image.processing.warp.file.selected <warp.xml>"
    - "property.set image.processing.warp.file.enable true"

- id: upload_and_activate_blend
  description: Upload blend mask, select, enable.
  steps:
    - "curl -X POST -F file=@mask.png http://<projector-ip>/api/image/processing/blend/file/transfer"
    - "property.set image.processing.blend.file.selected mask.png"
    - "property.set image.processing.blend.file.enable true"

- id: upload_and_activate_blacklevel
  description: Upload black level mask, select, enable.
  steps:
    - "curl -X POST -F file=@blacklevel.png http://<projector-ip>/api/image/processing/blacklevel/file/transfer"
    - "property.set image.processing.blacklevel.file.selected blacklevel.png"
    - "property.set image.processing.blacklevel.file.enable true"

- id: set_active_source
  description: Set the active input source.
  steps:
    - "image.source.list"
    - "property.set image.window.main.source <source-name>"

- id: subscribe_to_signal_changes
  description: Source and signal change tracking (multi-step).
  steps:
    - "image.source.list"
    - "for each source: image.source.<name>.listconnectors"
    - "for each connector: property.subscribe image.connector.<name>.detectedsignal"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source provides no explicit safety warnings, interlocks, or power-on sequencing hazards.
# Best-practice notes from source: verify system.state before power on/off; await property.set confirmation before re-setting same property.
```

## Notes
All method, property, signal, and object names are case-sensitive and lowercase.

JSON-RPC 2.0 framing required. Parameter order within `params` does not matter; method/payload order in the request object also does not matter.

TCP port 9090 reserved for JSON-RPC service on network interface. Same JSON-RPC available over RS-232 with serial params above.

Auth: `authenticate` with `code` is required only for higher-than-end-user access levels; end-user level can skip authentication. Only numeric example (`98765`) shown.

File endpoints: download directly via `http://<ip>/api/<path>` or `curl -O -J <url>`. Upload via `curl -F file=@<file> http://<ip>/api/<path>` (POST implied by `-F`). Example: `/api/image/processing/warp/file/transfer[warpgrid.xml]`.

ECO-mode wake paths: WoL packet to projector MAC, remote power button, keypad power button, or ASCII `:POWR1\r` on RS-232.

Source notes API is dynamic — feature availability depends on installed peripherals (e.g. motorized zoom lens), projector model, and configuration. Introspection (`introspect`) is the canonical way to enumerate available objects/methods/properties/signals for a given installed unit.

Notifications carry no `id` and require no response.

Source explicitly notes the catalogue shown is illustrative; complete list per installed unit requires introspection.

<!-- UNRESOLVED: firmware version compatibility, model-specific source list contents, default DMX mode, full method/property/signal catalogue (only the subset illustrated in the source is fully captured; the alphabetical appendix lists additional properties/methods/signals as documented), default auth access level name, session/connection lifecycle semantics, whether HTTP API uses the same auth as TCP JSON-RPC. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:17:49.834Z
last_checked_at: 2026-08-19T08:57:37.167Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:57:37.167Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec actions are present verbatim in the source, transport parameters match, and no significant commands are unrepresented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full property/method/signal catalog documented for Pulse API generally; only a subset of properties (image.brightness/contrast/gamma/saturation/sharpness, illumination, image.window.main.source, warp/blend/blacklevel file enable/selected, optics shutter/zoom/focus/lensshift, dmx, network) explicitly illustrated in examples."
- "auth token format (only `code: 98765` shown), default user/access level name, session lifecycle"
- "dynamic; specific range for this model not stated"
- "feature availability per model"
- "source provides no explicit safety warnings, interlocks, or power-on sequencing hazards."
- "firmware version compatibility, model-specific source list contents, default DMX mode, full method/property/signal catalogue (only the subset illustrated in the source is fully captured; the alphabetical appendix lists additional properties/methods/signals as documented), default auth access level name, session/connection lifecycle semantics, whether HTTP API uses the same auth as TCP JSON-RPC."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
