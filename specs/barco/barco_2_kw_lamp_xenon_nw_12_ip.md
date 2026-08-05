---
spec_id: admin/barco-2-kw-lamp-xenon-nw-12
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco 2 Kw Lamp Xenon Nw 12 Control Spec"
manufacturer: Barco
model_family: "Barco 2 Kw Lamp Xenon Nw 12"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco 2 Kw Lamp Xenon Nw 12"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:31:30.055Z
last_checked_at: 2026-07-21T20:34:46.577Z
generated_at: 2026-07-21T20:34:46.577Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Device model name \"2 Kw Lamp Xenon Nw 12\" is the entity designation; exact marketing model name not stated in the source. The source is a generic Pulse API document covering multiple projector models."
  - "Illumination examples in the source use \"illumination.sources.laser.*\" but this device is a xenon lamp projector. The actual illumination source object name must be discovered via introspection (e.g. illumination.sources.xenon.*). All illumination commands below use \"laser\" as documented but may need adaptation."
  - "method name may need adaptation for xenon lamp illumination source"
  - "{source} object name for xenon lamp illumination not stated;"
  - "{source} object name not confirmed for xenon lamp model"
  - "no multi-step command sequences explicitly described in source"
  - "no explicit safety warnings, interlock procedures, or"
  - "exact illumination source object name for xenon lamp models — source examples use \"laser\" but this device uses a xenon lamp"
  - "exact model name and model-specific source/connector list not stated in the generic Pulse API document"
  - "voltage, current, and power specifications not stated in source"
  - "firmware version compatibility not stated"
  - "protocol version number not stated"
verification:
  verdict: verified
  checked_at: 2026-07-21T20:34:46.577Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 spec actions match distinct wire-level methods/commands in source; all transport parameters (9090, 19200 baud, RS-232 pins) verified verbatim; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco 2 Kw Lamp Xenon Nw 12 Control Spec

## Summary
The Barco 2 Kw Lamp Xenon Nw 12 is a Pulse-series projector controllable via JSON-RPC 2.0 over TCP/IP (port 9090) or RS-232 serial (19200 baud). The Pulse API provides methods for power control, source selection, illumination power, picture settings, lens optics, warp/blend/black-level file management, DMX, environment monitoring, firmware management, and full introspection. File transfers (warp grids, blend masks, black-level masks) use HTTP POST endpoints.

<!-- UNRESOLVED: Device model name "2 Kw Lamp Xenon Nw 12" is the entity designation; exact marketing model name not stated in the source. The source is a generic Pulse API document covering multiple projector models. -->
<!-- UNRESOLVED: Illumination examples in the source use "illumination.sources.laser.*" but this device is a xenon lamp projector. The actual illumination source object name must be discovered via introspection (e.g. illumination.sources.xenon.*). All illumination commands below use "laser" as documented but may need adaptation. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090
  base_url: "http://{projector-ip}/api"
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode
  # Optional: authentication is only required for elevated access levels.
  # Normal end-user access does not require authentication.
  # To authenticate, send: {"jsonrpc":"2.0","method":"authenticate","params":{"code":98765}}
```

## Traits
```yaml
traits:
  - powerable  # inferred: system.poweron / system.poweroff commands present
  - queryable  # inferred: property.get and numerous query examples present
  - routable  # inferred: source selection commands present
  - levelable  # inferred: brightness, contrast, gamma, saturation, illumination power controls present
```

## Actions
```yaml
# --- Power control ---
- id: system_poweron
  label: Power On Projector
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []
  notes: >
    Returns null result on success. If projector is already on or transitioning,
    nothing happens. Best practice: verify system.state is "standby" or "ready" first.

- id: system_poweroff
  label: Power Off Projector
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []
  notes: >
    Returns null result on success. If projector is already off or transitioning,
    nothing happens. Best practice: verify system.state is "on" first.

- id: eco_wake_serial
  label: ECO Mode Wake (Serial Only)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: >
    Special ASCII command sent over RS-232 serial port to wake projector from
    ECO/power-save mode. Not a JSON-RPC command. Wake-on-LAN (MAC address),
    remote power button, or keypad power button also work.

# --- Authentication ---
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":{code}}}'
  params:
    - name: code
      type: integer
      description: Secret pass code (e.g. 98765)
  notes: >
    Sets user access level. Only necessary for elevated access above normal
    end user. Optional for normal end-user access.

# --- Property operations (generic JSON-RPC methods) ---
- id: property_set
  label: Set Property Value
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
  params:
    - name: property
      type: string
      description: Property path in dot notation (e.g. "image.brightness")
    - name: value
      type: any
      description: Value to set (type depends on property)
  notes: >
    Wait for confirmation before setting the same property again to avoid
    flooding the server. Documented settable properties include:
    image.window.main.source, image.brightness, image.contrast, image.gamma,
    image.saturation, image.sharpness, image.orientation, image.window.main.position,
    image.window.main.size, image.window.main.scalingmode, illumination.sources.{source}.power,
    image.processing.warp.enable, image.processing.warp.file.enable,
    image.processing.warp.file.selected, image.processing.blend.file.enable,
    image.processing.blend.file.selected, image.processing.blacklevel.file.enable,
    image.processing.blacklevel.file.selected, dmx.mode, dmx.startchannel,
    dmx.shutdown, optics.shutter.target, optics.zoom.position, optics.focus.position,
    optics.lensshift.horizontal.position, optics.lensshift.vertical.position,
    system.standby.enable, system.eco.enable, network.device.lan.ip4config

- id: property_get
  label: Get Property Value
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property path in dot notation (e.g. "system.state")
  notes: >
    Can also accept an array of property names to read multiple properties
    at once: {"property":["image.brightness","image.contrast"]}

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property path, or array of property paths
  notes: >
    Subscribing does not return the current value - use property.get for that.
    Notifications are only sent when a value actually changes.

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property path, or array of property paths

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name (e.g. "modelupdated"), or array of signal names

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name, or array of signal names

# --- Introspection ---
- id: introspect_recursive
  label: Introspect (Recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":true}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (empty string introspects everything)
  notes: >
    Returns full metadata: methods, properties, signals, and child objects.
    Also accepts positional params: ["object", true]

- id: introspect_nonrecursive
  label: Introspect (Non-Recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":false}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation
  notes: >
    Returns only immediate child object names (one level). Also accepts
    positional params: ["object", false]

# --- Source / connector management ---
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []
  notes: >
    Returns array of source name strings (e.g. ["DVI 1","DVI 2","DisplayPort 1",
    "DisplayPort 2","Dual DVI","Dual DisplayPort","Dual Head DVI",
    "Dual Head DisplayPort","HDBaseT","HDMI","SDI"]). List varies by model.

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []
  notes: >
    Returns array of connector name strings. Available connectors depend on model.

- id: image_source_listconnectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{sourceobject}.listconnectors"}'
  params:
    - name: sourceobject
      type: string
      description: >
        Source object name derived from source name by removing non-word
        characters and lowercasing (e.g. "DisplayPort 1" -> "displayport1")
  notes: >
    Returns array of connector info objects with name and grid position.

# --- Environment / monitoring ---
- id: environment_getcontrolblocks
  label: Get Environment Sensor Data
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
  params:
    - name: type
      type: string
      description: >
        Sensor type enum: "Sensor", "Filter", "Controller", "Actuator",
        "Alarm", "GenericBlock"
    - name: valuetype
      type: string
      description: >
        Value type enum: "Temperature", "Speed", "PWM", "Voltage", "Current",
        "Power", "Altitude", "Pressure", "Humidity", "ADC", "Coordinate",
        "Peltier", "Waveform", "Average", "Delay", "Difference",
        "Interpolation", "Limit", "Median", "Noise", "Weighting",
        "Comparison", "Threshold", "Formula", "Driver", "PID", "Mode",
        "State", "Pump", "Resistance", "Simulation", "Constant", "Manual",
        "Range", "Any"
  notes: >
    Returns dictionary of sensor name -> value. Example: type "Sensor" /
    valuetype "Temperature" returns all temperature sensors; type "Sensor" /
    valuetype "Speed" returns all fan tacho speeds.

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []
  notes: >
    Returns array of alarm objects with fields: severity, timestamp, source,
    description, custommessage.

# --- DMX ---
- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []
  notes: Returns a list of available channel names.

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []
  notes: Returns a list of all DMX modes.

# --- Firmware ---
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []
  notes: Returns array of managed firmware component name strings.

- id: firmware_listcomponentversionstatus
  label: List Firmware Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []
  notes: >
    Returns array of objects with: name, versions {available, running},
    status enum ("Unknown", "OK", "Upgradable").

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []
  notes: Forces a component upgrade at the following reboot.

# --- Illumination ---
- id: illumination_clo_engage
  label: Engage CLO (Constant Light Output)
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []
  notes: Engages CLO at the current light level.

- id: illumination_laser_getserialnumber
  label: Get Illumination Source Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []
  notes: >
    Returns serial number string. Method name uses "laser" in the source;
    actual source object name may differ for xenon lamp models.
    # UNRESOLVED: method name may need adaptation for xenon lamp illumination source

# --- Color management ---
- id: image_color_p7_custom_copypresettocustom
  label: Copy Color Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of the preset to copy

- id: image_color_p7_custom_resetpreset
  label: Reset Color Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of the preset to reset to defaults

- id: image_color_p7_custom_resettonative
  label: Reset Color to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: Cycles to the next RGB mode through all possible modes.

# --- HTTP file transfer endpoints ---
- id: http_upload_warp_file
  label: Upload Warp Grid File
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{projector-ip}/api/image/processing/warp/file/transfer'
  params:
    - name: filename
      type: string
      description: Local warp grid file path (e.g. warp.xml)
  notes: Warp file format is the same as MCM500/400.

- id: http_upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{projector-ip}/api/image/processing/blend/file/transfer'
  params:
    - name: filename
      type: string
      description: Local blend mask file path (e.g. mask.png)
  notes: >
    Grayscale images, 8 or 16 bit. Supported formats: PNG (up to 16 bit),
    JPEG, TIFF. Color images accepted but only blue channel used. Mask size
    must match projector resolution (WUXGA: 1920x1200, WQXGA: 1280x800,
    4K: 1280x800, 4K Cinemascope: 1280x540).

- id: http_upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{projector-ip}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: filename
      type: string
      description: Local black level mask file path (e.g. blacklevel.png)
  notes: >
    Grayscale images, 8 or 16 bit. Same formats and size constraints as
    blend masks.

- id: http_download_warp_file
  label: Download Warp Grid File
  kind: query
  command: 'curl -O -J http://{projector-ip}/api/image/processing/warp/file/transfer'
  params: []
  notes: >
    Downloads the current warp grid. Some endpoints require specifying a
    filename: http://{ip}/api/image/processing/warp/file/transfer/warpgrid.xml
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values:
    - boot
    - eco
    - standby
    - ready
    - conditioning
    - on
    - deconditioning
    - service
    - error
  property: system.state
  notes: >
    Query via property.get("system.state"). Subscribe via
    property.subscribe("system.state"). Notifications arrive as
    property.changed messages.

- id: illumination_state
  type: enum
  values:
    - "On"
    - "Off"
  property: illumination.state

- id: active_source
  type: string
  property: image.window.main.source
  notes: >
    Two property.changed notifications are delivered on source switch: first
    with empty string (old source deselected), then with new source name.

- id: alarm_state
  type: enum
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok
  property: environment.alarmstate

- id: network_state
  type: enum
  values:
    - CONNECTED
    - DISCONNECTED
  property: network.device.lan.state

- id: shutter_position
  type: enum
  values:
    - Open
    - Closed
  property: optics.shutter.position

- id: detected_signal
  type: object
  property: image.connector.{connectorname}.detectedsignal
  fields:
    active: bool
    name: string
    vertical_total: int
    horizontal_total: int
    vertical_resolution: int
    horizontal_resolution: int
    vertical_sync_width: int
    vertical_front_porch: int
    vertical_back_porch: int
    horizontal_sync_width: int
    horizontal_front_porch: int
    horizontal_back_porch: int
    horizontal_frequency: float
    vertical_frequency: float
    pixel_rate: int
    scan: enum
    bits_per_component: int
    color_space: enum
    signal_range: enum
    chroma_sampling: enum
    gamma_type: enum
    color_primaries: enum
    mastering_luminance: float
    content_aspect_ratio: enum
    is_stereo: bool
    stereo_mode: enum
  notes: >
    If active is false, no signal detected and remaining fields should be
    disregarded. Connector object name derived from connector name by
    removing non-word characters and lowercasing.

- id: illumination_power_level
  type: float
  property: illumination.sources.{source}.power
  notes: Current illumination power in percent.

- id: illumination_min_power
  type: float
  property: illumination.sources.{source}.minpower
  notes: Minimum illumination power in percent. Read-only, dynamic.

- id: illumination_max_power
  type: float
  property: illumination.sources.{source}.maxpower
  notes: Maximum illumination power in percent. Read-only, dynamic.
  # UNRESOLVED: {source} object name for xenon lamp illumination not stated;
  # source examples use "laser". Use introspection to discover actual name.
```

## Variables
```yaml
- id: image_brightness
  property: image.brightness
  type: float
  min: -1
  max: 1
  step_size: 1
  precision: 0.01
  access: READ_WRITE
  description: Image brightness/offset. 0 is default, 1 is 100% offset.

- id: image_contrast
  property: image.contrast
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  access: READ_WRITE
  description: Image contrast/gain. 1 is default.

- id: image_gamma
  property: image.gamma
  type: float
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  access: READ_WRITE
  description: Image gamma. Default is 2.2.

- id: image_saturation
  property: image.saturation
  type: float
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  access: READ_WRITE
  description: Image color saturation. 1 is default.

- id: image_sharpness
  property: image.sharpness
  type: int
  min: -2
  max: 8
  step_size: 1
  precision: 1
  access: READ_WRITE
  description: Image sharpness. Normalized.

- id: image_orientation
  property: image.orientation
  type: enum
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR
  access: READ_WRITE

- id: image_scalingmode
  property: image.window.main.scalingmode
  type: enum
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch
  access: READ_WRITE

- id: illumination_power
  property: illumination.sources.{source}.power
  type: float
  access: READ_WRITE
  description: Target illumination power in percent.
  # UNRESOLVED: {source} object name not confirmed for xenon lamp model

- id: dmx_mode
  property: dmx.mode
  type: string
  access: READ_WRITE
  description: Current DMX mode. Basic mode exposes 2 channels; extended mode exposes more.

- id: dmx_startchannel
  property: dmx.startchannel
  type: int
  min: 1
  max: 512
  access: READ_WRITE
  description: DMX start channel.

- id: dmx_shutdown
  property: dmx.shutdown
  type: bool
  access: READ_WRITE
  description: Shutdown enabled or not.

- id: optics_shutter_target
  property: optics.shutter.target
  type: enum
  values:
    - Open
    - Closed
  access: READ_WRITE

- id: optics_zoom_position
  property: optics.zoom.position
  type: int
  access: READ_WRITE
  description: Current zoom position.

- id: optics_focus_position
  property: optics.focus.position
  type: int
  access: READ_WRITE
  description: Current focus position.

- id: optics_lensshift_horizontal
  property: optics.lensshift.horizontal.position
  type: int
  access: READ_WRITE
  description: Current horizontal lens shift position.

- id: optics_lensshift_vertical
  property: optics.lensshift.vertical.position
  type: int
  access: READ_WRITE
  description: Current vertical lens shift position.

- id: system_standby_enable
  property: system.standby.enable
  type: bool
  access: READ_WRITE
  description: Enable/disable standby state. Check availability first.

- id: system_eco_enable
  property: system.eco.enable
  type: bool
  access: READ_WRITE
  description: Enable/disable ECO state. Check availability first.

- id: warp_enable
  property: image.processing.warp.enable
  type: bool
  access: READ_WRITE
  description: Enable/disable all warp functions.

- id: warp_file_enable
  property: image.processing.warp.file.enable
  type: bool
  access: READ_WRITE
  description: Enable/disable file warp.

- id: warp_file_selected
  property: image.processing.warp.file.selected
  type: string
  access: READ_WRITE
  description: Currently selected warp file.

- id: blend_file_enable
  property: image.processing.blend.file.enable
  type: bool
  access: READ_WRITE
  description: Enable/disable file blend.

- id: blend_file_selected
  property: image.processing.blend.file.selected
  type: array
  items: string
  access: READ_WRITE
  description: Currently selected blend files.

- id: blacklevel_file_enable
  property: image.processing.blacklevel.file.enable
  type: bool
  access: READ_WRITE
  description: Enable/disable black level correction.

- id: blacklevel_file_selected
  property: image.processing.blacklevel.file.selected
  type: string
  access: READ_WRITE
  description: Currently selected black level file.

- id: window_position
  property: image.window.main.position
  type: object
  fields:
    x: int
    y: int
  access: READ_WRITE
  description: Window position.

- id: window_size
  property: image.window.main.size
  type: object
  fields:
    width: int
    height: int
  access: READ_WRITE
  description: Window size.
```

## Events
```yaml
- id: property_changed
  method: property.changed
  description: >
    Unsolicited notification sent when a subscribed property value changes.
    Client must implement handler for this method. Message has no id and no
    response must be returned.
  payload_format: >
    {"jsonrpc":"2.0","method":"property.changed","params":{"property":[
      {"objectname.propertyname": value},
      ...
    ]}}

- id: signal_callback
  method: signal.callback
  description: >
    Unsolicited notification sent when a subscribed signal is emitted.
    Client must implement handler for this method.
  payload_format: >
    {"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[
      {"objectname.signalname": {"arg1": value, "arg2": value}},
      ...
    ]}}

- id: modelupdated_signal
  signal: modelupdated
  description: >
    Signal triggered when the object structure changes (objects added or removed).
    Subscribe via signal.subscribe("modelupdated"). Callback includes
    introspect.objectchanged with object name and isnew flag.
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences explicitly described in source
# beyond the implicit property.set -> property.changed confirmation flow.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >
  The source recommends verifying projector state before issuing power commands:
  check system.state is "standby" or "ready" before poweron; check system.state
  is "on" before poweroff. No explicit safety interlocks or confirmation
  procedures are documented.
# UNRESOLVED: no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements stated in source.
```

## Notes
- The Pulse API is partially dynamic — available objects, methods, and properties depend on the projector model, installed peripherals (e.g. lens type), and configuration (e.g. DMX mode). Best practice is to use the `introspect` method to discover the exact API surface for a specific device.
- Source/connector object names are derived by removing non-word characters from the display name and converting to lowercase (e.g. "DisplayPort 1" → "displayport1").
- All JSON-RPC parameters are passed by name; parameter order does not matter.
- Notification messages (property.changed, signal.callback) have no id and must not be responded to.
- The same commands work over both TCP/IP and RS-232 connections.
- HTTP file endpoints support download via browser or curl, and upload via curl with `-F file=@filename`.
- Warp file format is identical to MCM500/400.
<!-- UNRESOLVED: exact illumination source object name for xenon lamp models — source examples use "laser" but this device uses a xenon lamp -->
<!-- UNRESOLVED: exact model name and model-specific source/connector list not stated in the generic Pulse API document -->
<!-- UNRESOLVED: voltage, current, and power specifications not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: protocol version number not stated -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:31:30.055Z
last_checked_at: 2026-07-21T20:34:46.577Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:34:46.577Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 spec actions match distinct wire-level methods/commands in source; all transport parameters (9090, 19200 baud, RS-232 pins) verified verbatim; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Device model name \"2 Kw Lamp Xenon Nw 12\" is the entity designation; exact marketing model name not stated in the source. The source is a generic Pulse API document covering multiple projector models."
- "Illumination examples in the source use \"illumination.sources.laser.*\" but this device is a xenon lamp projector. The actual illumination source object name must be discovered via introspection (e.g. illumination.sources.xenon.*). All illumination commands below use \"laser\" as documented but may need adaptation."
- "method name may need adaptation for xenon lamp illumination source"
- "{source} object name for xenon lamp illumination not stated;"
- "{source} object name not confirmed for xenon lamp model"
- "no multi-step command sequences explicitly described in source"
- "no explicit safety warnings, interlock procedures, or"
- "exact illumination source object name for xenon lamp models — source examples use \"laser\" but this device uses a xenon lamp"
- "exact model name and model-specific source/connector list not stated in the generic Pulse API document"
- "voltage, current, and power specifications not stated in source"
- "firmware version compatibility not stated"
- "protocol version number not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
