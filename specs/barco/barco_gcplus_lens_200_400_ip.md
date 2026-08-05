---
spec_id: admin/barco-gcplus-lens-200-400
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Gcplus Lens 200 400 Control Spec"
manufacturer: Barco
model_family: "Barco Gcplus Lens 200 400"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Gcplus Lens 200 400"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T06:14:13.525Z
last_checked_at: 2026-08-05T08:06:41.616Z
generated_at: 2026-08-05T08:06:41.616Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model mapping to \"Gcplus Lens 200 400\" not explicit in source (doc is generic Pulse API); firmware version compatibility not stated; HTTP port not explicitly stated (URLs omit port); authentication passcode value is example-only"
  - "source does not show params for this method"
  - "no macros stated in source."
  - "no explicit safety warnings or interlock procedures in source."
  - "exact \"Gcplus Lens 200 400\" model identifier not corroborated in source (generic Pulse API doc); firmware version compatibility not stated; HTTP port number not explicitly stated; DMX extended-mode channel list not enumerated; full detectedsignal enum sub-values (color_space, scan, signal_range) not fully listed in source"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:06:41.616Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions are literal JSON-RPC method names verified verbatim in the refined source; transport parameters 9090/19200/8N1 also match. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-04
---

# Barco Gcplus Lens 200 400 Control Spec

## Summary
Barco Pulse-series projector controlled via the Pulse API, a JSON-RPC 2.0 interface available over TCP/IP (port 9090) and RS-232 serial (19200 8N1). HTTP file endpoints under `/api` support upload/download of warp grids, blend masks and black-level masks. Covers power, source selection, illumination/laser power, picture settings, optics (shutter/zoom/focus/lens shift), warping, blending, DMX, environment monitoring and firmware management.

<!-- UNRESOLVED: exact model mapping to "Gcplus Lens 200 400" not explicit in source (doc is generic Pulse API); firmware version compatibility not stated; HTTP port not explicitly stated (URLs omit port); authentication passcode value is example-only -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
  base_url: 'http://{host}/api'  # {host} = projector IP; HTTP used only for file endpoints (warp/blend/blacklevel transfer). Port not explicitly stated in source.
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode  # optional: authenticate method with secret code; skippable for normal end-user access (source lines: Authentication section)
```

## Traits
```yaml
traits:
  - powerable    # inferred: system.poweron / system.poweroff present
  - queryable    # inferred: property.get queries return values (system.state, illumination.state, etc.)
  - routable     # inferred: image.window.main.source selection present
  - levelable    # inferred: brightness/contrast/gamma/saturation/laser-power level control present
```

## Actions
```yaml
# All commands are JSON-RPC 2.0 over TCP/serial unless noted. {id} is the
# client request identifier (string|number). Params shown verbatim from source.
actions:
  - id: system_poweron
    label: Power On Projector
    kind: action
    command: '{"jsonrpc":"2.0","method":"system.poweron"}'
    params: []
    notes: "Result is null (not an error). No-op if already on or transitioning. Best practice: verify system.state is standby/ready first."

  - id: system_poweroff
    label: Power Off Projector
    kind: action
    command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
    params: []
    notes: "Result is null. No-op if already off or transitioning. Best practice: verify system.state is on first."

  - id: authenticate
    label: Authenticate (set access level)
    kind: action
    command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":{code}}}'
    params:
      - name: code
        type: integer
        description: Secret pass code (e.g. 98765 in source example). Sets user access level.
    notes: "Optional. Only required for access levels above normal end user. Skippable for normal access."

  - id: introspect
    label: Introspect Object Metadata
    kind: query
    command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":{object},"recursive":{recursive}}}'
    params:
      - name: object
        type: string
        description: Object name in dot notation; empty/default introspects everything.
      - name: recursive
        type: boolean
        description: "true (default): recurse; false: list one level of object names only."
    notes: "Returns methods/properties/signals restricted by authenticated access level."

  - id: property_set
    label: Set Property Value
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":{property},"value":{value}}}'
    params:
      - name: property
        type: string
        description: Property name in dot notation (e.g. image.brightness).
      - name: value
        type: any
        description: Value to set (type depends on property).
    notes: "Wait for confirmation before setting same property again (flooding reduces performance)."

  - id: property_get
    label: Get Property Value
    kind: query
    command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":{property}}}'
    params:
      - name: property
        type: string
        description: Property name, or array of property names for bulk read.
    notes: "Supports single property (string) or multiple (array)."

  - id: property_subscribe
    label: Subscribe To Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":{property}}}'
    params:
      - name: property
        type: string
        description: Property name, or array of property names.

  - id: property_unsubscribe
    label: Unsubscribe From Property Changes
    kind: action
    command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":{property}}}'
    params:
      - name: property
        type: string
        description: Property name, or array of property names.

  - id: signal_subscribe
    label: Subscribe To Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":{signal}}}'
    params:
      - name: signal
        type: string
        description: Signal name, or array of signal names.

  - id: signal_unsubscribe
    label: Unsubscribe From Signal
    kind: action
    command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":{signal}}}'
    params:
      - name: signal
        type: string
        description: Signal name, or array of signal names.

  - id: image_source_list
    label: List Available Sources
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.source.list"}'
    params: []
    notes: "Returns array of source names (varies by model; e.g. DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI)."

  - id: image_connector_list
    label: List Available Connectors
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
    params: []
    notes: "Returns array of physical connector names (varies by model)."

  - id: image_source_listconnectors
    label: List Connectors Used By Source
    kind: query
    command: '{"jsonrpc":"2.0","method":"image.source.{sourceobject}.listconnectors"}'
    params:
      - name: sourceobject
        type: string
        description: "Source object name = source name with non-word chars removed, lowercased (e.g. 'DisplayPort 1' -> 'displayport1')."
    notes: "Returns array of connector info (name + grid position)."

  - id: dmx_listchannels
    label: List DMX Channels
    kind: query
    command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
    params: []
    notes: "Returns array of available channel names."

  - id: dmx_listmodes
    label: List DMX Modes
    kind: query
    command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
    params: []
    notes: "Returns array of all modes."

  - id: environment_getcontrolblocks
    label: Get Environment Control Blocks
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":{type},"valuetype":{valuetype}}}'
    params:
      - name: type
        type: string
        description: "Sensor type. Values: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock."
      - name: valuetype
        type: string
        description: "Value type. Values: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any."
    notes: "Returns dictionary of sensor name -> reading (e.g. fan tacho speeds, temperatures)."

  - id: environment_getalarminfo
    label: Get Alarm Info
    kind: query
    command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
    params: []
    notes: "Returns array of alarms: severity, timestamp, source, description, custommessage."

  - id: firmware_listcomponents
    label: List Firmware Components
    kind: query
    command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
    params: []
    notes: "Returns array of managed firmware component names."

  - id: firmware_listcomponentversionstatus
    label: List Firmware Component Version Status
    kind: query
    command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
    params: []
    notes: "Returns components with name, versions (available, running), status (Unknown|OK|Upgradable)."

  - id: firmware_schedulecomponentupgrade
    label: Schedule Firmware Component Upgrade
    kind: action
    command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
    params: []  # UNRESOLVED: source does not show params for this method
    notes: "Forces a component upgrade at next reboot."

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
    notes: "Returns value (string)."

  - id: image_color_p7_custom_copypresettocustom
    label: Copy Color Preset To Custom
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":{presetname}}}'
    params:
      - name: presetname
        type: string
        description: Name of preset to copy.

  - id: image_color_p7_custom_resetpreset
    label: Reset Color Preset To Defaults
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":{presetname}}}'
    params:
      - name: presetname
        type: string
        description: Name of preset to reset.

  - id: image_color_p7_custom_resettonative
    label: Reset Color To Native
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
    params: []

  - id: image_color_rgbmode_nextrgbmode
    label: Cycle To Next RGB Mode
    kind: action
    command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
    params: []
    notes: "Cycles through all possible RGB modes."

  - id: serial_eco_wake
    label: Wake From ECO Mode (Serial)
    kind: action
    command: ':POWR1\r'
    params: []
    transport: serial
    notes: "ASCII serial-only wake command for projectors in ECO/power-save mode. Alternatives: Wake-on-LAN (MAC address), remote power button, keypad power button."
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    type: enum
    values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
    query: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'
    notes: "Current operation state. Subscribable via property.subscribe."

  - id: illumination_state
    type: enum
    values: ["On", "Off"]
    query: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'

  - id: illumination_laser_power
    type: number
    query: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}'
    notes: "Current laser power in percent."

  - id: illumination_laser_minpower
    type: number
    query: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}'
    notes: "Minimum power in percent (read-only, dynamic)."

  - id: illumination_laser_maxpower
    type: number
    query: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"}}'
    notes: "Maximum power in percent (read-only, dynamic). Affected by lens type/position."

  - id: connector_detectedsignal
    type: object
    query: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connectorobject}.detectedsignal"}}'
    notes: "Signal info: active, name, resolutions, timings, color_space, chroma_sampling, gamma_type, etc. {connectorobject} = connector name lowercased, non-word removed (e.g. l1hdmi)."

  - id: alarm_state
    type: enum
    values: [Fatal, Error, Alert, Warning, Ok]
    query: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'

  - id: network_lan_state
    type: enum
    values: [CONNECTED, DISCONNECTED]
    query: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'

  - id: optics_shutter_position
    type: enum
    values: [Open, Closed]
    query: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'

  - id: active_source
    type: string
    query: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}'
    notes: "Name of currently active source."
```

## Variables
```yaml
# All set via property.set; verbatim command template per property.
variables:
  - id: illumination_laser_power_set
    property: illumination.sources.laser.power
    type: float
    unit: percent
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{value}}}'
    notes: "Target power in percent. Min/max dynamic (query minpower/maxpower)."

  - id: image_brightness
    property: image.brightness
    type: float
    min: -1
    max: 1
    step_size: 1
    precision: 0.01
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}}}'
    notes: "Normalized offset; 0 default, 1 = 100% offset."

  - id: image_contrast
    property: image.contrast
    type: float
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{value}}}'
    notes: "Normalized gain; 1 default."

  - id: image_gamma
    property: image.gamma
    type: float
    min: 1
    max: 3
    step_size: 1
    precision: 0.1
    default: 2.2
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{value}}}'

  - id: image_saturation
    property: image.saturation
    type: float
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{value}}}'
    notes: "Normalized; 1 default."

  - id: image_sharpness
    property: image.sharpness
    type: integer
    min: -2
    max: 8
    step_size: 1
    precision: 1
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}}}'

  - id: image_window_main_source
    property: image.window.main.source
    type: string
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":{value}}}'
    notes: "Value must be one of the names returned by image.source.list (e.g. 'DisplayPort 1', 'HDMI')."

  - id: image_window_main_scalingmode
    property: image.window.main.scalingmode
    type: enum
    values: [Fill, OneToOne, FillScreen, Stretch]
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":{value}}}'

  - id: image_window_main_position
    property: image.window.main.position
    type: object
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{value}}}'
    notes: "Object {x: int, y: int}."

  - id: image_window_main_size
    property: image.window.main.size
    type: object
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{value}}}'
    notes: "Object {width: int, height: int}."

  - id: image_orientation
    property: image.orientation
    type: enum
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":{value}}}'

  - id: optics_shutter_target
    property: optics.shutter.target
    type: enum
    values: [Open, Closed]
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":{value}}}'

  - id: optics_zoom_position
    property: optics.zoom.position
    type: integer
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.zoom.position","value":{value}}}'

  - id: optics_focus_position
    property: optics.focus.position
    type: integer
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.focus.position","value":{value}}}'

  - id: optics_lensshift_horizontal_position
    property: optics.lensshift.horizontal.position
    type: integer
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.horizontal.position","value":{value}}}'

  - id: optics_lensshift_vertical_position
    property: optics.lensshift.vertical.position
    type: integer
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.lensshift.vertical.position","value":{value}}}'

  - id: warp_enable
    property: image.processing.warp.enable
    type: boolean
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{value}}}'

  - id: warp_file_enable
    property: image.processing.warp.file.enable
    type: boolean
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{value}}}'

  - id: warp_file_selected
    property: image.processing.warp.file.selected
    type: string
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":{value}}}'
    notes: "Upload warp grid via HTTP POST to /api/image/processing/warp/file/transfer first."

  - id: blend_file_enable
    property: image.processing.blend.file.enable
    type: boolean
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{value}}}'

  - id: blend_file_selected
    property: image.processing.blend.file.selected
    type: array
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":{value}}}'
    notes: "Array of strings. Upload mask via HTTP POST to /api/image/processing/blend/file/transfer."

  - id: blacklevel_file_enable
    property: image.processing.blacklevel.file.enable
    type: boolean
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{value}}}'

  - id: blacklevel_file_selected
    property: image.processing.blacklevel.file.selected
    type: string
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":{value}}}'
    notes: "Upload mask via HTTP POST to /api/image/processing/blacklevel/file/transfer."

  - id: dmx_mode
    property: dmx.mode
    type: string
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":{value}}}'
    notes: "Extended mode exposes more channels than basic (2-channel) mode."

  - id: dmx_startchannel
    property: dmx.startchannel
    type: integer
    min: 1
    max: 512
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{value}}}'

  - id: dmx_shutdown
    property: dmx.shutdown
    type: boolean
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{value}}}'

  - id: system_standby_enable
    property: system.standby.enable
    type: boolean
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{value}}}'
    notes: "Check availability first."

  - id: system_eco_enable
    property: system.eco.enable
    type: boolean
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{value}}}'
    notes: "Check availability first."

  - id: network_lan_ip4config
    property: network.device.lan.ip4config
    type: object
    command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"network.device.lan.ip4config","value":{value}}}'
    notes: "Object {Address, Mask, Gateway, NameServers} (all strings)."
```

## Events
```yaml
# Unsolicited JSON-RPC notifications (no id, no response required).
events:
  - id: property_changed
    method: property.changed
    payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"objectname.propertyname":100}]}}'
    notes: "Array of property/value pairs. Client must implement this handler. Triggered on any subscribed property change."

  - id: signal_callback
    method: signal.callback
    payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{"arg1":100,"arg2":"cat"}}]}}'
    notes: "Array of signal/argument-list pairs. Client must implement this handler."

  - id: modelupdated_signal
    method: signal.callback (modelupdated)
    payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"introspect.objectchanged":{"object":"motors.motor1","newobject":true}}]}}'
    notes: "Triggered when object structure changes (objects added/removed). newobject true=new, false=lost."
```

## Macros
```yaml
# No explicit multi-step sequences documented as named macros.
# UNRESOLVED: no macros stated in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >
  Source recommends verifying projector state before power commands (check
  system.state is standby/ready before poweron; on before poweroff) - power
  commands are no-ops during transitions. No explicit safety interlocks,
  confirmation gates, or power-on sequencing requirements stated.
# UNRESOLVED: no explicit safety warnings or interlock procedures in source.
```

## Notes
- API is dynamic: available objects/properties depend on projector configuration and mounted peripherals (e.g. motorized zoom lens, DMX extended mode). Introspection is the authoritative way to discover the exact runtime API.
- Source selection emits two `property.changed` notifications on switch: first when the old source deselects (value `""`), then when the new source selects.
- Notifications only fire on actual value change; subscribing does not return the current value — use `property.get` for that.
- Warp grid file format is shared with MCM500/400.
- File upload endpoints accept PNG (up to 16-bit), JPEG, TIFF; grayscale only (color images use blue channel).
- Blend/black-level mask resolution must match projector resolution (WUXGA 1920×1200; WQXGA/4K 1280×800; 4K Cinemascope 1280×540).
- `firmware.schedulecomponentupgrade` params not shown in source.

<!-- UNRESOLVED: exact "Gcplus Lens 200 400" model identifier not corroborated in source (generic Pulse API doc); firmware version compatibility not stated; HTTP port number not explicitly stated; DMX extended-mode channel list not enumerated; full detectedsignal enum sub-values (color_space, scan, signal_range) not fully listed in source -->
```

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T06:14:13.525Z
last_checked_at: 2026-08-05T08:06:41.616Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:06:41.616Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions are literal JSON-RPC method names verified verbatim in the refined source; transport parameters 9090/19200/8N1 also match. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model mapping to \"Gcplus Lens 200 400\" not explicit in source (doc is generic Pulse API); firmware version compatibility not stated; HTTP port not explicitly stated (URLs omit port); authentication passcode value is example-only"
- "source does not show params for this method"
- "no macros stated in source."
- "no explicit safety warnings or interlock procedures in source."
- "exact \"Gcplus Lens 200 400\" model identifier not corroborated in source (generic Pulse API doc); firmware version compatibility not stated; HTTP port number not explicitly stated; DMX extended-mode channel list not enumerated; full detectedsignal enum sub-values (color_space, scan, signal_range) not fully listed in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
