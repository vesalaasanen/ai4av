---
spec_id: admin/barco-clp-blp-stand-alone-pack
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Clp Blp Stand Alone Pack Control Spec"
manufacturer: Barco
model_family: "Barco Clp Blp Stand Alone Pack"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Clp Blp Stand Alone Pack"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:41:32.366Z
last_checked_at: 2026-08-05T07:21:39.595Z
generated_at: 2026-08-05T07:21:39.595Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact projector model/family not pinned by source (\"Pulse projectors\" generic); firmware compatibility range not stated; voltage/power specs not in source"
  - "exact min/max numeric range varies by lens type/position per source"
  - "source documents no explicit multi-step named sequences."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "exact projector model not confirmed by source (generic \"Pulse projectors\"); firmware version compatibility not stated; laser min/max power numeric bounds dynamic (lens-dependent); default auth pass code value not documented (98765 is example only); notification schema for all signals beyond modelupdated/property.changed not exhaustively enumerated"
verification:
  verdict: verified
  checked_at: 2026-08-05T07:21:39.595Z
  matched_actions: 39
  action_count: 39
  confidence: medium
  summary: "All 39 spec actions and transport parameters are verbatim in the source; bidirectional coverage holds. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-23
---

# Barco Clp Blp Stand Alone Pack Control Spec

## Summary
Barco Pulse-family projector controlled via the Pulse API, a JSON-RPC 2.0 interface exposed over TCP/IP (port 9090) and RS-232 serial. Covers power state, input source selection, laser illumination, picture settings, warping/blending/black-level file management, environment telemetry, DMX, firmware, and introspection. The same command set is available over both transports.

<!-- UNRESOLVED: exact projector model/family not pinned by source ("Pulse projectors" generic); firmware compatibility range not stated; voltage/power specs not in source -->

## Transport
```yaml
# Source describes both TCP/IP (port 9090) and RS-232 serial access to the same
# Pulse services. Both blocks populated from explicit source statements.
protocols:
  - tcp
  - serial
addressing:
  port: 9090  # source: "The service is available on port number 9090."
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  # Authentication is OPTIONAL per source: only required for higher-than-end-user
  # access. The `authenticate` method takes a numeric secret pass code.
  type: optional_code  # source: optional elevate via authenticate{code}
  note: "Normal end user access skips auth; elevated access uses authenticate method with secret pass code."
```

## Traits
```yaml
traits:
  - powerable  # inferred from system.poweron/system.poweroff methods
  - routable  # inferred from image.window.main.source set + image.source.list
  - queryable  # inferred from property.get query examples and status queries
  - levelable  # inferred from brightness/contrast/gamma/saturation/laser power set
```

## Actions
```yaml
# All payloads are JSON-RPC 2.0 method invocations. The `command:` field holds
# the method name (or property path for property.set) verbatim from source.
# Each request is wrapped in { "jsonrpc": "2.0", "method": ..., "params": ..., "id": N }.
# Notifications carry no id and require no response.

# --- System / Power ---
- id: system_poweron
  label: Power On Projector
  kind: action
  command: "system.poweron"
  params: []
  note: "Result is null (not an error). If already on or transitioning, nothing happens. Verify state is standby/ready before issuing."

- id: system_poweroff
  label: Power Off Projector
  kind: action
  command: "system.poweroff"
  params: []
  note: "Result is null (not an error). If already off or transitioning, nothing happens. Verify state is on before issuing."

- id: eco_wake_serial
  label: Wake From ECO Mode (Serial)
  kind: action
  command: ":POWR1\r"
  params: []
  note: "Special ASCII sequence sent over RS-232 to wake a projector in ECO/power-save mode. Alternative wake methods: Wake-on-LAN (HW/MAC address), remote power button, keypad power button."

# --- Authentication ---
- id: authenticate
  label: Authenticate (Elevated Access)
  kind: action
  command: "authenticate"
  params:
    - name: code
      type: integer
      description: Secret pass code (e.g. 98765). Sets user access level.
  note: "Optional. Only required for higher-than-end-user access. Normal end user access skips auth. Response result is boolean true on success."

# --- LED control ---
- id: ledctrl_blink
  label: LED Blink
  kind: action
  command: "ledctrl.blink"
  params:
    - name: led
      type: string
      description: LED identifier (e.g. "systemstatus").
    - name: color
      type: string
      description: LED color (e.g. "red").
    - name: period
      type: integer
      description: Blink period (e.g. 42).
  note: "Documented method-invocation example. Response result is 0."

# --- Property framework ---
- id: property_set
  label: Set Property
  kind: action
  command: "property.set"
  params:
    - name: property
      type: string
      description: Property path in dot notation (e.g. "image.window.main.source").
    - name: value
      type: any
      description: Value to set (type depends on property).
  note: "Best practice: wait for confirmation before setting the same property again. Flooding may reduce performance."

- id: property_get
  label: Get Property
  kind: query
  command: "property.get"
  params:
    - name: property
      type: string
      description: Property path, or array of paths for multiple properties.
  note: "Pass an array to read multiple properties in one request."

- id: property_subscribe
  label: Subscribe To Property Changes
  kind: action
  command: "property.subscribe"
  params:
    - name: property
      type: string
      description: Property path, or array of paths. Subscribing does not return current value - use property.get for that.

- id: property_unsubscribe
  label: Unsubscribe From Property Changes
  kind: action
  command: "property.unsubscribe"
  params:
    - name: property
      type: string
      description: Property path, or array of paths.

# --- Signal framework ---
- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: "signal.subscribe"
  params:
    - name: signal
      type: string
      description: Signal name (e.g. "modelupdated"), or array of names.

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: "signal.unsubscribe"
  params:
    - name: signal
      type: string
      description: Signal name, or array of names.

# --- Introspection ---
- id: introspect
  label: Introspect API
  kind: query
  command: "introspect"
  params:
    - name: object
      type: string
      description: Object name in dot notation to introspect; empty/"") introspects everything.
    - name: recursive
      type: boolean
      description: "true (default): full metadata tree. false: list object names one level only."
  note: "Returns methods/properties/signals/objects restricted by authenticated access level. Drives OSD menus etc. Params may be object {object, recursive} or positional array."

# --- Source / routing ---
- id: select_source
  label: Select Active Source
  kind: action
  command: "property.set"
  params:
    - name: property
      type: string
      description: Fixed "image.window.main.source".
    - name: value
      type: string
      description: "Source name from image.source.list (e.g. \"DisplayPort 1\", \"HDMI\", \"DVI 1\", \"DVI 2\", \"DisplayPort 2\", \"Dual DVI\", \"Dual DisplayPort\", \"Dual Head DVI\", \"Dual Head DisplayPort\", \"HDBaseT\", \"SDI\")."
  note: "Example: value \"DisplayPort 1\". Get list first via image.source.list. Available sources vary by model."

- id: image_source_list
  label: List Available Sources
  kind: query
  command: "image.source.list"
  params: []
  note: "Returns array of source name strings. List contents vary by projector model."

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: "image.connector.list"
  params: []
  note: "Returns array of physical connector name strings. Available connectors depend on model."

- id: image_source_listconnectors
  label: List Connectors Used By Source
  kind: query
  command: "image.source.{name}.listconnectors"
  params:
    - name: name
      type: string
      description: "Source object name = source name with non-word chars removed and lowercased (e.g. \"DisplayPort 1\" -> \"displayport1\")."
  note: "Returns array of connector info objects {gridposition:{row,column,plane}, name}. Use to map multi-connector sources."

# --- Illumination ---
- id: illumination_clo_engage
  label: Engage Constant Light Output
  kind: action
  command: "illumination.clo.engage"
  params: []
  note: "Engages CLO at the current light level."

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: "illumination.laser.getserialnumber"
  params: []
  note: "Returns value string."

# --- Warp processing ---
- id: set_warp_enable
  label: Enable/Disable All Warp
  kind: action
  command: "property.set"
  params:
    - name: property
      type: string
      description: Fixed "image.processing.warp.enable".
    - name: value
      type: boolean
      description: Globally enable/disable all warp functions.

- id: set_warp_file_selected
  label: Select Warp File
  kind: action
  command: "property.set"
  params:
    - name: property
      type: string
      description: Fixed "image.processing.warp.file.selected".
    - name: value
      type: string
      description: "Uploaded warp grid filename (e.g. \"warp.xml\"). Warp file format matches MCM500/400."

- id: set_warp_file_enable
  label: Enable/Disable File Warp
  kind: action
  command: "property.set"
  params:
    - name: property
      type: string
      description: Fixed "image.processing.warp.file.enable".
    - name: value
      type: boolean

# --- Blend processing ---
- id: set_blend_file_selected
  label: Select Blend File
  kind: action
  command: "property.set"
  params:
    - name: property
      type: string
      description: Fixed "image.processing.blend.file.selected".
    - name: value
      type: array
      description: "Array of selected blend filenames (e.g. [\"mask.png\"])."

- id: set_blend_file_enable
  label: Enable/Disable File Blend
  kind: action
  command: "property.set"
  params:
    - name: property
      type: string
      description: Fixed "image.processing.blend.file.enable".
    - name: value
      type: boolean

# --- Black level processing ---
- id: set_blacklevel_file_selected
  label: Select Black Level File
  kind: action
  command: "property.set"
  params:
    - name: property
      type: string
      description: Fixed "image.processing.blacklevel.file.selected".
    - name: value
      type: string
      description: "Uploaded black level mask filename (e.g. \"blacklevel.png\")."

- id: set_blacklevel_file_enable
  label: Enable/Disable Black Level Correction
  kind: action
  command: "property.set"
  params:
    - name: property
      type: string
      description: Fixed "image.processing.blacklevel.file.enable".
    - name: value
      type: boolean

# --- Color management ---
- id: color_p7_custom_copypresettocustom
  label: Copy Preset To Custom Color
  kind: action
  command: "image.color.p7.custom.copypresettocustom"
  params:
    - name: presetname
      type: string

- id: color_p7_custom_resetpreset
  label: Reset Custom Color Preset
  kind: action
  command: "image.color.p7.custom.resetpreset"
  params:
    - name: presetname
      type: string
  note: "Resets preset back to its default values."

- id: color_p7_custom_resettonative
  label: Reset Custom Color To Native
  kind: action
  command: "image.color.p7.custom.resettonative"
  params: []

- id: color_rgbmode_next
  label: Next RGB Mode
  kind: action
  command: "image.color.rgbmode.nextrgbmode"
  params: []
  note: "Cycles through all possible RGB modes."

# --- Environment telemetry ---
- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: "environment.getcontrolblocks"
  params:
    - name: type
      type: string
      description: "Sensor type. Values: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock."
    - name: valuetype
      type: string
      description: "Sensor value type. Values: Temperature, ADC, Median, Simulation, Speed, Coordinate, Noise, State, PWM, Peltier, Weighting, Pump, Voltage, Waveform, Comparison, Resistance, Current, Average, Threshold, Constant, Power, Delay, Formula, Manual, Altitude, Difference, Driver, Range, Pressure, Interpolation, PID, Any, Humidity, Limit, Mode."
  note: "Returns dictionary of {sensorname: floatvalue}. Used for temps, fan speeds, voltages etc."

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: "environment.getalarminfo"
  params: []
  note: "Returns array of {severity, timestamp, source, description, custommessage}."

# --- Firmware ---
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: "firmware.listcomponents"
  params: []
  note: "Returns array of managed firmware component name strings."

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: "firmware.listcomponentversionstatus"
  params: []
  note: "Returns array of {name, versions:{available, running}, status}. status enum: Unknown, OK, Upgradable."

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: "firmware.schedulecomponentupgrade"
  params: []
  note: "Forces a component upgrade at the following reboot."

# --- DMX ---
- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: "dmx.listchannels"
  params: []
  note: "Returns array of available channel names. Basic mode exposes 2 channels; extended mode exposes more."

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: "dmx.listmodes"
  params: []
  note: "Returns array of all mode name strings."

# --- HTTP file endpoints (upload) ---
- id: upload_warp_file
  label: Upload Warp Grid File
  kind: action
  command: "POST /api/image/processing/warp/file/transfer"
  params:
    - name: file
      type: file
      description: Warp grid file (XML, MCM500/400 format).
  note: "HTTP multipart upload. curl example: curl -F file=@warp.xml http://<projector-ip>/api/image/processing/warp/file/transfer"

- id: upload_blend_file
  label: Upload Blend Mask File
  kind: action
  command: "POST /api/image/processing/blend/file/transfer"
  params:
    - name: file
      type: file
      description: "Grayscale blend mask (PNG up to 16-bit, JPEG, TIFF). Mask resolution must match projector blend layer."
  note: "Mask resolution by projector: WUXGA 1920x1200; WQXGA/4K 1280x800; 4K Cinemascope 1280x540. Only blue channel used if color image supplied."

- id: upload_blacklevel_file
  label: Upload Black Level Mask File
  kind: action
  command: "POST /api/image/processing/blacklevel/file/transfer"
  params:
    - name: file
      type: file
      description: "Grayscale black level mask (PNG up to 16-bit, JPEG, TIFF). Mask resolution must match projector black-level layer."
  note: "Mask resolution by projector: WUXGA 1920x1200; WQXGA/4K 1280x800; 4K Cinemascope 1280x540. Only blue channel used if color image supplied."
```

## Feedbacks
```yaml
# Observable states / query responses returned by property.get or notifications.
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  source_property: system.state

- id: illumination_state
  type: enum
  values: ["On", "Off"]
  source_property: illumination.state

- id: active_source
  type: string
  source_property: image.window.main.source

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  source_property: environment.alarmstate

- id: network_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  source_property: network.device.lan.state

- id: optics_shutter_position
  type: enum
  values: [Open, Closed]
  source_property: optics.shutter.position

- id: laser_power_current
  type: float
  source_property: illumination.sources.laser.power

- id: laser_minpower
  type: float
  source_property: illumination.sources.laser.minpower

- id: laser_maxpower
  type: float
  source_property: illumination.sources.laser.maxpower
  # UNRESOLVED: exact min/max numeric range varies by lens type/position per source

- id: connector_detectedsignal
  type: object
  source_property: image.connector.{name}.detectedsignal
  note: "Returns active, name, resolution/timing details, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode."
```

## Variables
```yaml
# Settable numeric/enum parameters via property.set. Ranges from source.
- id: image_brightness
  property: image.brightness
  type: float
  min: -1
  max: 1
  step_size: 1
  precision: 0.01
  default: 0
  description: "Image brightness/offset, normalized. 0 default, 1 = 100% offset."

- id: image_contrast
  property: image.contrast
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  default: 1
  description: "Image contrast/gain, normalized. 1 default."

- id: image_gamma
  property: image.gamma
  type: float
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  default: 2.2
  description: Image gamma.

- id: image_saturation
  property: image.saturation
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  default: 1
  description: "Image color saturation, normalized. 1 default."

- id: image_sharpness
  property: image.sharpness
  type: integer
  min: -2
  max: 8
  step_size: 1
  precision: 1
  description: Image sharpness, normalized.

- id: laser_power
  property: illumination.sources.laser.power
  type: float
  description: Target laser power in percent (RW). Min/max dynamic - read illumination.sources.laser.minpower / .maxpower.

- id: image_orientation
  property: image.orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_scalingmode
  property: image.window.main.scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
  description: Scaling mode applied to the source.

- id: dmx_mode
  property: dmx.mode
  type: string
  description: Current DMX mode.

- id: dmx_startchannel
  property: dmx.startchannel
  type: integer
  min: 1
  max: 512
  description: DMX start channel.

- id: dmx_shutdown
  property: dmx.shutdown
  type: boolean
  description: DMX shutdown enabled/disabled.

- id: system_standby_enable
  property: system.standby.enable
  type: boolean
  description: "Enable/disable standby state. Check availability first."

- id: system_eco_enable
  property: system.eco.enable
  type: boolean
  description: "Enable/disable ECO state. Check availability first."

- id: optics_shutter_target
  property: optics.shutter.target
  type: enum
  values: [Open, Closed]
  description: Shutter target position.

- id: ip4config
  property: network.device.lan.ip4config
  type: object
  description: "IPv4 config object: {Address, Mask, Gateway, NameServers} strings."
```

## Events
```yaml
# Unsolicited JSON-RPC notifications (no id, no response returned). Client must
# implement listeners for these.
- id: property_changed
  method: property.changed
  description: "Triggered when a subscribed property value changes. params.property is an array of {propertyname: value} objects."
  example: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"system.state":"ready"}]}}'
  note: "Source-switch generates two notifications: empty source (deselect) then new source (select). Only sent on actual value change - subscribing does not push current value."

- id: signal_callback
  method: signal.callback
  description: "Triggered when a subscribed signal is emitted. params.signal is an array of {signalname: {args}} objects."
  example: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"introspect.objectchanged":{"object":"motors.motor1","newobject":true}}]}}'
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step named sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Notes only: good practice to verify
# system.state before power on/off to avoid no-op transitions.
```

## Notes
- **Protocol**: JSON-RPC 2.0. All params passed by name; order does not matter. Requests carry an `id`; notifications (property.changed, signal.callback) carry no id and require no response.
- **Both transports identical**: same command set over TCP:9090 and RS-232 (19200/8/N/1, no flow control). Serial cable is straight-through 9-pin: pin2↔2, pin3↔3, pin5↔5.
- **Auth optional**: end-user access needs no auth; elevated access via `authenticate{code}`. Source shows example code 98765 (do not treat as default).
- **API is dynamic**: parts depend on peripherals/configuration (e.g. motorized zoom lens, DMX extended mode). Best-effort coverage here; use `introspect` to enumerate the exact API of a specific configured unit.
- **ECO wake**: serial `:POWR1\r`, or WoL with MAC address, or remote/keypad power button.
- **Step-size semantics**: step_size is a factor multiplied by precision for GUI increments (e.g. brightness precision 0.01 × step 1 = 0.01 increment).

<!-- UNRESOLVED: exact projector model not confirmed by source (generic "Pulse projectors"); firmware version compatibility not stated; laser min/max power numeric bounds dynamic (lens-dependent); default auth pass code value not documented (98765 is example only); notification schema for all signals beyond modelupdated/property.changed not exhaustively enumerated -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:41:32.366Z
last_checked_at: 2026-08-05T07:21:39.595Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T07:21:39.595Z
matched_actions: 39
action_count: 39
confidence: medium
summary: "All 39 spec actions and transport parameters are verbatim in the source; bidirectional coverage holds. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact projector model/family not pinned by source (\"Pulse projectors\" generic); firmware compatibility range not stated; voltage/power specs not in source"
- "exact min/max numeric range varies by lens type/position per source"
- "source documents no explicit multi-step named sequences."
- "source contains no explicit safety warnings, interlock procedures,"
- "exact projector model not confirmed by source (generic \"Pulse projectors\"); firmware version compatibility not stated; laser min/max power numeric bounds dynamic (lens-dependent); default auth pass code value not documented (98765 is example only); notification schema for all signals beyond modelupdated/property.changed not exhaustively enumerated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
