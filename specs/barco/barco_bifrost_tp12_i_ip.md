---
spec_id: admin/barco-bifrost-tp12-i
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Bifrost Tp12 I Control Spec"
manufacturer: Barco
model_family: "Bifrost Tp12 I"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Bifrost Tp12 I"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:49:14.177Z
last_checked_at: 2026-07-21T21:18:12.966Z
generated_at: 2026-07-21T21:18:12.966Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source is generic Pulse API doc, not Bifrost Tp12 I specific. Some properties/methods may not apply to this exact model. Use introspect to confirm."
  - "Firmware version compatibility not stated in source."
  - "min/max not stated in source. Available only with motorized lens."
  - "no hardware interlock or safety certification info in source"
  - "Source is generic Pulse API — not specific to Bifrost Tp12 I. Exact property availability unknown without device introspection."
  - "Firmware version compatibility not stated."
  - "Optics position min/max ranges not stated."
  - "Laser power min/max stated as dynamic (example shows 0–100) but actual bounds depend on lens type/position."
  - "Wake-on-LAN MAC address format documented but WoL payload format not specified beyond \"HW (MAC) address\"."
verification:
  verdict: verified
  checked_at: 2026-07-21T21:18:12.966Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 actions matched literally in source with correct parameter shapes; transport fully verified; spec represents complete Pulse API method set. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco Bifrost Tp12 I Control Spec

## Summary
The Barco Bifrost Tp12 I is a Pulse-platform projector controllable via JSON-RPC 2.0 over TCP/IP (port 9090) or RS-232 serial (19200 baud). The Pulse API exposes power control, source selection, image adjustment (brightness, contrast, gamma, saturation, sharpness), illumination (laser power), lens optics (zoom, focus, lens shift, shutter), warp/blend/black-level file management, DMX, environment monitoring (temperatures, fan speeds), and firmware management. File transfers (warp grids, blend masks, black level masks) use HTTP POST/GET endpoints. The source document is a generic Pulse API reference; exact property availability varies by projector configuration and should be confirmed via introspection.

<!-- UNRESOLVED: Source is generic Pulse API doc, not Bifrost Tp12 I specific. Some properties/methods may not apply to this exact model. Use introspect to confirm. -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090  # TCP JSON-RPC service port
  base_url: "http://{projector_ip}/api"  # HTTP file transfer endpoints; {projector_ip} discovered on network
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode  # source documents optional authenticate method with secret pass code
  notes: >
    Authentication only required for elevated access levels. Normal end-user
    access skips auth entirely. To authenticate, send:
    { "jsonrpc": "2.0", "method": "authenticate", "params": { "code": <secret> } }
```

## Traits
```yaml
traits:
  - powerable   # inferred: system.poweron / system.poweroff methods present
  - queryable   # inferred: property.get method and system.state query present
  - levelable   # inferred: brightness, contrast, gamma, saturation, sharpness, laser power controls present
  - routable    # inferred: image.window.main.source selection present
```

## Actions
```yaml
# All commands use JSON-RPC 2.0 wire format. Responses follow JSON-RPC 2.0 spec
# (result member on success, error member on failure). Notifications carry no id
# and require no response.

# ── System ──
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []
  notes: >
    No-op if projector already on or transitioning. Best practice: verify
    system.state is "standby" or "ready" before issuing.

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []
  notes: >
    No-op if projector already off or transitioning. Best practice: verify
    system.state is "on" before issuing.

- id: eco_wake_serial
  label: ECO Mode Wake (Serial)
  kind: action
  command: ':POWR1\r'
  params: []
  notes: >
    Special ASCII command sent over RS-232 to wake projector from ECO mode.
    Alternative wake methods: Wake-on-LAN with MAC address, remote power button,
    keypad power button.

# ── Authentication ──
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":{code}}}'
  params:
    - name: code
      type: integer
      description: Secret pass code to set elevated user access level
  notes: Only required for higher-than-normal access level. Normal end-user access skips auth.

# ── Generic property operations ──
- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":{property},"value":{value}}}'
  params:
    - name: property
      type: string
      description: Property path in dot notation (e.g. "image.brightness")
    - name: value
      type: any
      description: Value to set (type depends on property)
  notes: >
    Wait for confirmation before setting same property again. Flooding the
    server with repeated sets degrades performance. Key settable properties:
    image.window.main.source, image.brightness, image.contrast, image.gamma,
    image.saturation, image.sharpness, illumination.sources.laser.power,
    image.processing.warp.enable, image.processing.warp.file.enable,
    image.processing.warp.file.selected, image.processing.blend.file.enable,
    image.processing.blend.file.selected, image.processing.blacklevel.file.enable,
    image.processing.blacklevel.file.selected, image.orientation,
    image.window.main.scalingmode, dmx.mode, dmx.startchannel, dmx.shutdown,
    optics.shutter.target, system.standby.enable, system.eco.enable.

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":{property}}}'
  params:
    - name: property
      type: string
      description: Property path in dot notation (e.g. "system.state")

- id: property_get_multiple
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":[{property1},{property2}]}}'
  params:
    - name: property
      type: array
      description: Array of property path strings
  notes: Returns object mapping each property name to its value.

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":{property}}}'
  params:
    - name: property
      type: string
      description: Property path, or array of property paths for multiple

- id: property_unsubscribe
  label: Unsubscribe from Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":{property}}}'
  params:
    - name: property
      type: string
      description: Property path, or array of property paths for multiple

# ── Signal subscriptions ──
- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":{signal}}}'
  params:
    - name: signal
      type: string
      description: Signal name, or array of signal names for multiple

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":{signal}}}'
  params:
    - name: signal
      type: string
      description: Signal name, or array of signal names for multiple

# ── Introspection ──
- id: introspect
  label: Introspect Object Metadata
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":{object},"recursive":{recursive}}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty string introspects everything
      default: ""
    - name: recursive
      type: boolean
      description: If false, only list immediate child object names (one level)
      default: true
  notes: Returns metadata (methods, properties, signals) restricted by authenticated access level.

# ── Image: source/connector management ──
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []
  notes: Returns array of source name strings (e.g. "DVI 1", "DisplayPort 1", "HDMI", "SDI"). Varies by model.

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []
  notes: Returns array of physical connector name strings. Varies by model.

- id: image_source_listconnectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{source_object}.listconnectors"}'
  params:
    - name: source_object
      type: string
      description: >
        Source object name derived from source name by removing non-word chars
        and lowercasing (e.g. "DisplayPort 1" -> "displayport1")
  notes: Returns array of connector info objects with name and grid position.

# ── Image: color management ──
- id: color_copy_preset_to_custom
  label: Copy Color Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":{presetname}}}'
  params:
    - name: presetname
      type: string
      description: Name of the preset to copy

- id: color_reset_preset
  label: Reset Color Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":{presetname}}}'
  params:
    - name: presetname
      type: string
      description: Name of the preset to reset to defaults

- id: color_reset_to_native
  label: Reset Color to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: color_next_rgb_mode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []
  notes: Cycles through all possible RGB modes.

# ── Illumination ──
- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []
  notes: Engages Constant Light Output at the current light level.

- id: illumination_laser_get_serial
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []
  notes: Returns laser serial number string.

# ── Environment ──
- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":{type},"valuetype":{valuetype}}}'
  params:
    - name: type
      type: string
      description: >
        Sensor type enum: "Sensor", "Filter", "Controller", "Actuator", "Alarm",
        "GenericBlock"
    - name: valuetype
      type: string
      description: >
        Value type enum: "Temperature", "Speed", "PWM", "Voltage", "Current",
        "Power", "Altitude", "Pressure", "Humidity", "ADC", "Coordinate",
        "Peltier", "Waveform", "Average", "Delay", "Difference", "Interpolation",
        "Limit", "Median", "Noise", "Weighting", "Comparison", "Threshold",
        "Formula", "Driver", "PID", "Mode", "State", "Pump", "Resistance",
        "Simulation", "Constant", "Manual", "Range", "Any"
  notes: >
    Returns dictionary of sensor name -> value. Use type="Sensor" with
    valuetype="Temperature" for temps, valuetype="Speed" for fan RPM.

- id: environment_get_alarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []
  notes: Returns array of alarm objects with severity, timestamp, source, description, custommessage.

# ── DMX ──
- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []
  notes: Returns array of available channel name strings.

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []
  notes: Returns array of mode name strings.

# ── Firmware ──
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
    Returns array of objects with name, versions {available, running}, and
    status enum: "Unknown", "OK", "Upgradable".

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []
  notes: Forces a component upgrade at the following reboot.

# ── HTTP file transfer endpoints ──
- id: upload_warp_grid
  label: Upload Warp Grid File
  kind: action
  command: 'POST http://{projector_ip}/api/image/processing/warp/file/transfer'
  params:
    - name: file
      type: file
      description: Warp grid XML file (same format as MCM500/400)
  notes: Use multipart form upload (curl -F file=@warp.xml). Same endpoint supports GET for download.

- id: upload_blend_mask
  label: Upload Blend Mask File
  kind: action
  command: 'POST http://{projector_ip}/api/image/processing/blend/file/transfer'
  params:
    - name: file
      type: file
      description: >
        Grayscale blend mask (8 or 16 bit). PNG/JPEG/TIFF accepted. Color images
        use blue channel only. Size must match projector blend layer resolution.
  notes: >
    Mask resolution by projector: WUXGA=1920x1200, WQXGA=1280x800,
    4K=1280x800, 4K Cinemascope=1280x540.

- id: upload_blacklevel_mask
  label: Upload Black Level Mask File
  kind: action
  command: 'POST http://{projector_ip}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: file
      type: file
      description: >
        Grayscale black level mask (8 or 16 bit). PNG/JPEG/TIFF accepted.
        Color images use blue channel only. Size must match projector black
        level layer resolution.
  notes: >
    Mask resolution by projector: WUXGA=1920x1200, WQXGA=1280x800,
    4K=1280x800, 4K Cinemascope=1280x540.
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  property: system.state
  notes: Current projector operating state. Query via property.get or subscribe via property.subscribe.

- id: illumination_state
  type: enum
  values: [On, Off]
  property: illumination.state

- id: active_source
  type: string
  property: image.window.main.source
  notes: Name of currently active source. Two notifications fired on switch (deselect old, select new).

- id: illumination_power
  type: float
  property: illumination.sources.laser.power
  notes: Current laser power level in percent. Source type (laser/LED/etc.) varies by projector; introspect to confirm.

- id: connector_detected_signal
  type: object
  property: image.connector.{name}.detectedsignal
  notes: >
    Signal info object. Fields: active (bool), name (string),
    vertical_total, horizontal_total, vertical_resolution, horizontal_resolution,
    vertical_sync_width, vertical_front_porch, vertical_back_porch,
    horizontal_sync_width, horizontal_front_porch, horizontal_back_porch (int),
    horizontal_frequency, vertical_frequency (float), pixel_rate (int),
    scan (enum: Progressive), bits_per_component (int), color_space (enum),
    signal_range (enum: 0-255, 16-235), chroma_sampling (enum: 4:4:4, 4:2:2, 4:2:0),
    gamma_type (enum: POWER, sRGB, REC_BT1886, SMPTE_ST2084), color_primaries (enum),
    mastering_luminance (float), content_aspect_ratio (enum), is_stereo (bool),
    stereo_mode (enum: None, Sequential, FramePacked, TopBottom, SideBySide).
    If active is false, disregard remaining fields.

- id: network_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  property: network.device.lan.state

- id: shutter_position
  type: enum
  values: [Open, Closed]
  property: optics.shutter.position

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  property: environment.alarmstate
  notes: Aggregate alarm severity. Details via environment.getalarminfo.

- id: environment_temperatures
  type: object
  notes: >
    Retrieved via environment.getcontrolblocks with type="Sensor",
    valuetype="Temperature". Returns dictionary of sensor name -> temp in
    degrees Celsius. Example keys: environment.laser.board0.bank0.temperature,
    environment.temperature.inlet, environment.temperature.outlet,
    environment.temperature.mainboard, etc.

- id: environment_fan_speeds
  type: object
  notes: >
    Retrieved via environment.getcontrolblocks with type="Sensor",
    valuetype="Speed". Returns dictionary of fan name -> RPM. Example keys:
    environment.fan.ar1.tacho, environment.fan.driver.tacho,
    environment.fan.optics.tacho, etc.
```

## Variables
```yaml
- id: laser_power
  property: illumination.sources.laser.power
  type: float
  access: read_write
  min: 0  # inferred from minpower example returning 0
  max: 100  # inferred from maxpower example returning 100
  unit: percent
  notes: Target illumination power. Min/max are dynamic and may change with lens type/position.

- id: image_brightness
  property: image.brightness
  type: float
  access: read_write
  min: -1
  max: 1
  step_size: 1
  precision: 0.01
  notes: Normalized brightness/offset. 0 is default, 1 is 100% offset.

- id: image_contrast
  property: image.contrast
  type: float
  access: read_write
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  notes: Normalized contrast/gain. 1 is default.

- id: image_gamma
  property: image.gamma
  type: float
  access: read_write
  min: 1
  max: 3
  step_size: 1
  precision: 0.1
  notes: Image gamma. Default is 2.2.

- id: image_saturation
  property: image.saturation
  type: float
  access: read_write
  min: 0
  max: 2
  step_size: 1
  precision: 0.01
  notes: Normalized color saturation. 1 is default.

- id: image_sharpness
  property: image.sharpness
  type: integer
  access: read_write
  min: -2
  max: 8
  step_size: 1
  precision: 1

- id: image_orientation
  property: image.orientation
  type: enum
  access: read_write
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: window_scalingmode
  property: image.window.main.scalingmode
  type: enum
  access: read_write
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: window_source
  property: image.window.main.source
  type: string
  access: read_write
  notes: Set to a source name from image.source.list (e.g. "DisplayPort 1", "HDMI").

- id: window_position
  property: image.window.main.position
  type: object
  access: read_write
  fields:
    - name: x
      type: integer
    - name: y
      type: integer

- id: window_size
  property: image.window.main.size
  type: object
  access: read_write
  fields:
    - name: width
      type: integer
    - name: height
      type: integer

- id: dmx_mode
  property: dmx.mode
  type: string
  access: read_write
  notes: Available modes via dmx.listmodes. Extended mode exposes more channels.

- id: dmx_startchannel
  property: dmx.startchannel
  type: integer
  access: read_write
  min: 1
  max: 512

- id: dmx_shutdown
  property: dmx.shutdown
  type: boolean
  access: read_write

- id: shutter_target
  property: optics.shutter.target
  type: enum
  access: read_write
  values: [Open, Closed]

- id: zoom_position
  property: optics.zoom.position
  type: integer
  access: read_write
  notes: UNRESOLVED: min/max not stated in source. Available only with motorized lens.

- id: focus_position
  property: optics.focus.position
  type: integer
  access: read_write
  notes: UNRESOLVED: min/max not stated in source. Available only with motorized lens.

- id: lensshift_horizontal
  property: optics.lensshift.horizontal.position
  type: integer
  access: read_write
  notes: UNRESOLVED: min/max not stated in source. Available only with motorized lens.

- id: lensshift_vertical
  property: optics.lensshift.vertical.position
  type: integer
  access: read_write
  notes: UNRESOLVED: min/max not stated in source. Available only with motorized lens.

- id: standby_enable
  property: system.standby.enable
  type: boolean
  access: read_write
  notes: Check availability first via introspection.

- id: eco_enable
  property: system.eco.enable
  type: boolean
  access: read_write
  notes: Check availability first via introspection.

- id: warp_enable
  property: image.processing.warp.enable
  type: boolean
  access: read_write
  notes: Globally enable/disable all warp functions.

- id: warp_file_enable
  property: image.processing.warp.file.enable
  type: boolean
  access: read_write

- id: warp_file_selected
  property: image.processing.warp.file.selected
  type: string
  access: read_write

- id: blend_file_enable
  property: image.processing.blend.file.enable
  type: boolean
  access: read_write

- id: blend_file_selected
  property: image.processing.blend.file.selected
  type: array
  access: read_write
  notes: Array of selected blend file name strings.

- id: blacklevel_file_enable
  property: image.processing.blacklevel.file.enable
  type: boolean
  access: read_write

- id: blacklevel_file_selected
  property: image.processing.blacklevel.file.selected
  type: string
  access: read_write
```

## Events
```yaml
- id: property_changed
  method: property.changed
  direction: server_to_client
  notes: >
    Unsolicited notification. No id, no response required. Delivered when a
    subscribed property value changes. Payload is an array of property/value
    pair objects. Example:
    {"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"system.state":"ready"}]}}
  payload:
    - name: property
      type: array
      description: Array of objects, each mapping a property name to its new value

- id: signal_callback
  method: signal.callback
  direction: server_to_client
  notes: >
    Unsolicited notification. No id, no response required. Delivered when a
    subscribed signal is emitted. Payload is an array of signal/argument objects.
  payload:
    - name: signal
      type: array
      description: Array of objects, each mapping a signal name to its argument object

- id: modelupdated
  signal: modelupdated
  direction: server_to_client
  notes: >
    Triggered when object structure changes (objects added or removed).
    Subscribe via signal.subscribe. Delivered via signal.callback with
    introspect.objectchanged containing object name and isnew flag.
```

## Macros
```yaml
# No explicit multi-step command sequences documented in source.
# The source describes recommended procedural workflows (e.g., warp file
# upload -> select -> enable) but these are sequences of individual actions,
# not packaged macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: >
      Before issuing system.poweron, verify system.state is "standby" or "ready".
      If projector is already on or in state transition, poweron is a no-op.
    source: "Programmers guide - Power on section"
  - description: >
      Before issuing system.poweroff, verify system.state is "on". If projector
      is already off or in state transition, poweroff is a no-op.
    source: "Programmers guide - Power off section"
notes: >
  No explicit safety interlock hardware or lockout procedures documented in
  source. Power state verification is recommended best practice, not a hard
  interlock.
# UNRESOLVED: no hardware interlock or safety certification info in source
```

## Notes
- The Pulse API is dynamic. Property and method availability depends on projector model, configuration, and connected peripherals (e.g., motorized lens, DMX mode). The source recommends runtime introspection to discover the exact API surface.
- Source/connector object names are derived by removing non-word characters and lowercasing the display name (e.g., "DisplayPort 1" → "displayport1").
- property.set best practice: wait for confirmation before re-setting the same property. Continuous sets without waiting may flood the server and reduce performance.
- Two property.changed notifications are delivered on source switch: first when old source deselected (value ""), then when new source selected.
- Subscribing to a property does NOT return its current value. Use property.get to read the current value.
- The `ledctrl.blink` and `foo.echo` methods appear in the source as illustrative examples of method invocation format, not as real documented API commands.
- Warp grid file format is the same as Barco MCM500/400.

<!-- UNRESOLVED: Source is generic Pulse API — not specific to Bifrost Tp12 I. Exact property availability unknown without device introspection. -->
<!-- UNRESOLVED: Firmware version compatibility not stated. -->
<!-- UNRESOLVED: Optics position min/max ranges not stated. -->
<!-- UNRESOLVED: Laser power min/max stated as dynamic (example shows 0–100) but actual bounds depend on lens type/position. -->
<!-- UNRESOLVED: Wake-on-LAN MAC address format documented but WoL payload format not specified beyond "HW (MAC) address". -->
```

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:49:14.177Z
last_checked_at: 2026-07-21T21:18:12.966Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:18:12.966Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 actions matched literally in source with correct parameter shapes; transport fully verified; spec represents complete Pulse API method set. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source is generic Pulse API doc, not Bifrost Tp12 I specific. Some properties/methods may not apply to this exact model. Use introspect to confirm."
- "Firmware version compatibility not stated in source."
- "min/max not stated in source. Available only with motorized lens."
- "no hardware interlock or safety certification info in source"
- "Source is generic Pulse API — not specific to Bifrost Tp12 I. Exact property availability unknown without device introspection."
- "Firmware version compatibility not stated."
- "Optics position min/max ranges not stated."
- "Laser power min/max stated as dynamic (example shows 0–100) but actual bounds depend on lens type/position."
- "Wake-on-LAN MAC address format documented but WoL payload format not specified beyond \"HW (MAC) address\"."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
