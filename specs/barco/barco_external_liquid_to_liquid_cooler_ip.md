---
spec_id: admin/barco-external-liquid-to-liquid-cooler
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco External Liquid To Liquid Cooler Control Spec"
manufacturer: Barco
model_family: "External Liquid To Liquid Cooler"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "External Liquid To Liquid Cooler"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:29:00.341Z
last_checked_at: 2026-08-05T08:00:04.956Z
generated_at: 2026-08-05T08:00:04.956Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - ledctrl.blink
  - "the source artifact is the generic Barco Pulse API / \"RS232 and Network Command Catalog\" and describes projector-class objects (illumination, lens, warp, blend). Its applicability to the \"External Liquid To Liquid Cooler\" product is not confirmed by the source text. Verify against the actual device."
  - "firmware version compatibility not stated in source"
  - "hardware voltage / current / power specifications not stated in source"
  - "min/max are dynamic per device config; read via minpower/maxpower properties"
  - "source does not document named multi-step command sequences."
  - "no formal safety interlock procedures or power-on sequencing"
  - "model name \"External Liquid To Liquid Cooler\" is the supplied device name; source does not confirm it. The source is a projector API catalog."
  - "auth passcode value (only example value 98765 shown)"
  - "firmware version compatibility not stated"
  - "voltage / current / power / fault-recovery specs not stated"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:00:04.956Z
  matched_actions: 51
  action_count: 51
  confidence: medium
  summary: "All 51 spec actions have literal matches in the source's Pulse API catalog; transport parameters (port 9090, 19200/8N1) match verbatim. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Barco External Liquid To Liquid Cooler Control Spec

## Summary
Barco device controlled via the Barco Pulse API, a JSON-RPC 2.0 interface available over TCP/IP (port 9090) and RS-232 serial, with auxiliary HTTP file-transfer endpoints. The source document describes the Pulse projector application programmers interface (power, sources, illumination, image properties, warping, blending, environment monitoring, firmware, DMX). The same Pulse services are exposed regardless of connection type.

<!-- UNRESOLVED: the source artifact is the generic Barco Pulse API / "RS232 and Network Command Catalog" and describes projector-class objects (illumination, lens, warp, blend). Its applicability to the "External Liquid To Liquid Cooler" product is not confirmed by the source text. Verify against the actual device. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: hardware voltage / current / power specifications not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090          # TCP Pulse service port (stated in source)
  base_url: "http://{projector_address}/api/{endpoint}"  # HTTP file endpoints; projector IP not fixed by source
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode  # source documents an `authenticate` request with a numeric secret code
  # Auth is optional: "Authentication is only necessary when a higher level than
  # normal end user is required. For normal end user access the authentication
  # can be skipped." Elevated-access code value is NOT stated in source.
```

## Traits
```yaml
traits:
  - powerable     # inferred: system.poweron / system.poweroff documented
  - queryable     # inferred: property.get queries and status enums documented
  - levelable     # inferred: float-range settable properties (brightness, contrast, gamma, saturation, laser power)
  - routable      # inferred: source selection (image.window.main.source) documented
```

## Actions
```yaml
# All payloads are JSON-RPC 2.0 request frames, transported over TCP (port 9090)
# or RS-232. `id` is the client-supplied request identifier shown verbatim in the
# source examples. Enumerate every documented method/operation.

# --- Power / system ---
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
  params: []

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
  params: []

- id: eco_wake_serial
  label: ECO Mode Wake (serial only)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: ASCII serial wake command for projectors in ECO mode (RS-232 only).

# --- Authentication ---
- id: authenticate
  label: Authenticate (elevated access)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": 98765}}'
  params:
    - name: code
      type: integer
      description: Secret pass code. Value 98765 shown verbatim in source example; actual code UNRESOLVED.

# --- Generic property API (documented verbatim) ---
- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "{objectname.propertyname}", "value": {value}}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name (e.g. image.brightness).
    - name: value
      type: any
      description: Value to set (type per property).

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "{objectname.propertyname}"}}'
  params:
    - name: property
      type: string
      description: Dot-notation property name.

- id: property_get_multi
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": ["image.brightness", "image.contrast"]}}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property names.

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "image.brightness"}}'
  params:
    - name: property
      type: string|array
      description: Single property name or array of names.

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "image.brightness"}}'
  params:
    - name: property
      type: string|array
      description: Single property name or array of names.

# --- Signal API ---
- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "modelupdated"}}'
  params:
    - name: signal
      type: string|array
      description: Signal name or array of names.

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "modelupdated"}}'
  params:
    - name: signal
      type: string|array
      description: Signal name or array of names.

# --- Introspection ---
- id: introspect_recursive
  label: Introspect Object (recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "foo", "recursive": true}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (empty introspects everything).
    - name: recursive
      type: boolean
      description: true (default) for full metadata tree.

- id: introspect_nonrecursive
  label: Introspect Object (non-recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": ["motors", false]}'
  params:
    - name: object
      type: string
      description: Object name in dot notation.
    - name: recursive
      type: boolean
      description: false lists only immediate child object names.

# --- Sources / connectors ---
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list"}'
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list"}'
  params: []

- id: image_source_listconnectors
  label: List Connectors Used by Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{sourceobject}.listconnectors"}'
  params:
    - name: sourceobject
      type: string
      description: Source object name derived by stripping non-word chars and lowercasing the source name (e.g. DisplayPort 1 -> displayport1).

# --- Documented property.set operations (verbatim examples) ---
- id: set_source_displayport1
  label: Select DisplayPort 1 as Input Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "DisplayPort 1"}}'
  params: []

- id: set_source_hdmi
  label: Select HDMI as Input Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "HDMI"}}'
  params: []

- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "illumination.sources.laser.power", "value": 40}}'
  params:
    - name: value
      type: integer
      description: Target power in percent (range per minpower/maxpower properties).

- id: set_brightness
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.brightness", "value": 0.15}}'
  params:
    - name: value
      type: float
      description: Normalized offset, -1..1, default 0, precision 0.01.

- id: set_warp_enable
  label: Enable/Disable Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.enable", "value": true}}'
  params:
    - name: value
      type: boolean
      description: true to globally enable warp.

- id: set_warp_file_selected
  label: Select Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.selected", "value": "warp.xml"}}'
  params:
    - name: value
      type: string
      description: Uploaded warp grid filename.

- id: set_warp_file_enable
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.enable", "value": true}}'
  params:
    - name: value
      type: boolean

- id: set_blend_file_selected
  label: Select Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.selected", "value": "mask.png"}}'
  params:
    - name: value
      type: string
      description: Uploaded blend mask filename.

- id: set_blend_file_enable
  label: Enable Blend Mask
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.enable", "value": true}}'
  params:
    - name: value
      type: boolean

- id: set_blacklevel_file_selected
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.selected", "value": "blacklevel.png"}}'
  params:
    - name: value
      type: string
      description: Uploaded black level mask filename.

- id: set_blacklevel_file_enable
  label: Enable Black Level Mask
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.enable", "value": true}}'
  params:
    - name: value
      type: boolean

# --- Documented property.get queries (verbatim) ---
- id: get_system_state
  label: Get Projector State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "system.state"}}'
  params: []

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.window.main.source"}}'
  params: []

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.state"}}'
  params: []

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.power"}}'
  params: []

- id: get_laser_minpower
  label: Get Laser Minimum Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.minpower"}}'
  params: []

- id: get_laser_maxpower
  label: Get Laser Maximum Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.maxpower"}}'
  params: []

- id: get_brightness
  label: Get Image Brightness
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.brightness"}}'
  params: []

- id: get_connector_detectedsignal
  label: Get Connector Detected Signal
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.connector.{connectorobject}.detectedsignal"}}'
  params:
    - name: connectorobject
      type: string
      description: Connector object name (lowercased, non-word chars stripped; e.g. displayport1).

# --- Environment ---
- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "Sensor", "valuetype": "Temperature"}}'
  params:
    - name: type
      type: enum
      description: Sensor type - Sensor, Filter, Controller, Actuator, Alarm, GenericBlock.
    - name: valuetype
      type: enum
      description: Value type - Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any.

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  params: []

# --- DMX ---
- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
  params: []

# --- Firmware ---
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  params: []
  notes: Forces a component upgrade at the following reboot. Per-component parameters UNRESOLVED (source does not specify params).

# --- Illumination methods ---
- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
  params: []
  notes: Engages Constant Light Output at the current light level.

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
  params: []

# --- Color methods ---
- id: image_color_p7_custom_copypresettocustom
  label: Copy Color Preset To Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset Color Preset
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "{presetname}"}}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset Color To Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  params: []

# --- HTTP file transfer (verbatim curl examples) ---
- id: upload_warp_file
  label: Upload Warp Grid File
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://{projector_ip}/api/image/processing/warp/file/transfer'
  params:
    - name: projector_ip
      type: string
      description: Projector IP address (e.g. 192.168.1.100 in source example).

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://{projector_ip}/api/image/processing/blend/file/transfer'
  params:
    - name: projector_ip
      type: string

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://{projector_ip}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: projector_ip
      type: string
```

## Feedbacks
```yaml
# Observable states surfaced as property.changed notifications or query results.
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]
  source: system.state

- id: illumination_state
  type: enum
  values: [On, Off]
  source: illumination.state

- id: active_source
  type: string
  source: image.window.main.source

- id: laser_power
  type: number
  source: illumination.sources.laser.power

- id: brightness
  type: number
  source: image.brightness

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  source: environment.alarmstate

- id: network_device_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  source: network.device.lan.state

- id: shutter_position
  type: enum
  values: [Open, Closed]
  source: optics.shutter.position
```

## Variables
```yaml
# Settable non-discrete parameters documented with type + constraints.
- id: image_brightness
  property: image.brightness
  type: float
  min: -1
  max: 1
  step_size: 1
  precision: 0.01
  access: READ_WRITE

- id: image_contrast
  property: image.contrast
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  access: READ_WRITE

- id: image_gamma
  property: image.gamma
  type: float
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  access: READ_WRITE

- id: image_saturation
  property: image.saturation
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  access: READ_WRITE

- id: image_sharpness
  property: image.sharpness
  type: integer
  min: -2
  max: 8
  step_size: 1
  precision: 1
  access: READ_WRITE

- id: laser_power_var
  property: illumination.sources.laser.power
  type: float
  min: null  # UNRESOLVED: min/max are dynamic per device config; read via minpower/maxpower properties
  max: null
  access: READ_WRITE

- id: dmx_startchannel
  property: dmx.startchannel
  type: integer
  access: READ_WRITE
  notes: DMX start channel, range 1..512.

- id: dmx_mode
  property: dmx.mode
  type: string
  access: READ_WRITE

- id: dmx_shutdown
  property: dmx.shutdown
  type: boolean
  access: READ_WRITE

- id: system_standby_enable
  property: system.standby.enable
  type: boolean
  access: READ_WRITE

- id: system_eco_enable
  property: system.eco.enable
  type: boolean
  access: READ_WRITE

- id: image_orientation
  property: image.orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
  access: READ_WRITE

- id: image_scalingmode
  property: image.window.main.scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
  access: READ_WRITE
```

## Events
```yaml
# Unsolicited JSON-RPC notifications from device (no id, no response expected).
- id: property_changed
  method: property.changed
  description: Array of property/value pairs when a subscribed property changes.
  payload: '{"jsonrpc": "2.0", "method": "property.changed", "params": {"property": [{"{objectname.propertyname}": {value}}]}}'

- id: signal_callback
  method: signal.callback
  description: Array of signal/argument pairs when a subscribed signal fires.
  payload: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"{objectname.signalname}": {"arg1": 100, "arg2": "cat"}}]}}'

- id: modelupdated_signal
  method: modelupdated
  description: Triggered when object structure changes (objects added/removed). Subscribe via signal.subscribe.
```

## Macros
```yaml
# UNRESOLVED: source does not document named multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Verify projector state is standby or ready before issuing system.poweron (source guidance)."
  - "Verify projector state is on before issuing system.poweroff (source guidance)."
  - "Wait for property.set confirmation before re-setting the same property; flooding the server degrades performance (source guidance)."
# UNRESOLVED: no formal safety interlock procedures or power-on sequencing
# requirements stated beyond the operational guidance above. ECO-mode wake
# involves special handling (WoL / remote / keypad / serial :POWR1\r).
```

## Notes
- JSON-RPC 2.0 over TCP (port 9090) and RS-232 (19200/8N1/no flow control). HTTP is used only for file endpoints (warp grids, blend masks, black-level masks) under `/api/...`.
- Parameters are passed by name; order does not matter.
- The source notes the API is partly dynamic and peripheral-dependent; the authoritative API surface for a specific unit is obtained via the `introspect` method. Not all documented objects exist on every configuration (e.g. motorized zoom only if such a lens is mounted; DMX exposes more channels in extended mode).
- File-transfer image formats: PNG (up to 16 bit), JPEG, TIFF. Interface uses grayscale only (accepts color but uses the blue channel).
- Warp file format is the same as on the MCM500/400.
- Source is the generic Barco Pulse "RS232 and Network Command Catalog"; it describes projector-class objects and does not name the "External Liquid To Liquid Cooler" model explicitly.

<!-- UNRESOLVED: model name "External Liquid To Liquid Cooler" is the supplied device name; source does not confirm it. The source is a projector API catalog. -->
<!-- UNRESOLVED: auth passcode value (only example value 98765 shown) -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: voltage / current / power / fault-recovery specs not stated -->
```

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-26T10:29:00.341Z
last_checked_at: 2026-08-05T08:00:04.956Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:00:04.956Z
matched_actions: 51
action_count: 51
confidence: medium
summary: "All 51 spec actions have literal matches in the source's Pulse API catalog; transport parameters (port 9090, 19200/8N1) match verbatim. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- ledctrl.blink
- "the source artifact is the generic Barco Pulse API / \"RS232 and Network Command Catalog\" and describes projector-class objects (illumination, lens, warp, blend). Its applicability to the \"External Liquid To Liquid Cooler\" product is not confirmed by the source text. Verify against the actual device."
- "firmware version compatibility not stated in source"
- "hardware voltage / current / power specifications not stated in source"
- "min/max are dynamic per device config; read via minpower/maxpower properties"
- "source does not document named multi-step command sequences."
- "no formal safety interlock procedures or power-on sequencing"
- "model name \"External Liquid To Liquid Cooler\" is the supplied device name; source does not confirm it. The source is a projector API catalog."
- "auth passcode value (only example value 98765 shown)"
- "firmware version compatibility not stated"
- "voltage / current / power / fault-recovery specs not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
