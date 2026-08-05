---
spec_id: admin/barco-220w-uhp-projector-lamp
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco 220 W Uhp Projector Lamp Control Spec"
manufacturer: Barco
model_family: "Barco 220 W Uhp Projector Lamp"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco 220 W Uhp Projector Lamp"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:56:48.954Z
last_checked_at: 2026-07-21T20:34:48.249Z
generated_at: 2026-07-21T20:34:48.249Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact projector model variant and firmware version not stated in the source document. The source is a generic Pulse API reference."
  - "exact min from minpower property, dynamic"
  - "exact max from maxpower property, dynamic"
  - "no explicit multi-step sequences documented as named macros in source."
  - "no explicit safety warnings, interlock procedures, or power-on sequencing requirements beyond state-verification best practices stated in source."
  - "exact projector model variant not confirmed — source is a generic Pulse API reference."
  - "illumination source type (laser vs UHP lamp) varies by projector; device name suggests UHP lamp but examples show laser properties."
  - "firmware version compatibility not stated in source."
  - "protocol version number not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:34:48.249Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions matched with exact JSON-RPC method names in source. Transport: TCP port 9090, RS-232 19200 baud, HTTP base_url pattern verified. File endpoints (warp/blend/blacklevel) confirmed. Complete coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco 220 W Uhp Projector Lamp Control Spec

## Summary
Barco Pulse-series projector controllable via a JSON-RPC 2.0 API over TCP/IP (port 9090) or RS-232 serial (19200 baud). The API exposes power control, source selection, illumination power, image adjustments (brightness/contrast/gamma/saturation/sharpness), warp/blend/black-level file management, optics (shutter/zoom/focus/lens shift), DMX, environment monitoring, and firmware management. HTTP file endpoints support upload/download of warp grids, blend masks, and black-level masks.

<!-- UNRESOLVED: exact projector model variant and firmware version not stated in the source document. The source is a generic Pulse API reference. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - http
addressing:
  port: 9090  # TCP/IP JSON-RPC service port
  base_url: "http://{projector_address}/api"  # HTTP file endpoints; projector address varies (e.g. 192.168.1.100)
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: passcode  # optional: authentication only required for elevated access levels; normal end-user access skips auth
```

## Traits
```yaml
traits:
  - powerable    # inferred from system.poweron / system.poweroff commands
  - queryable    # inferred from property.get query commands and system.state queries
  - routable     # inferred from image.window.main.source source-selection commands
  - levelable    # inferred from brightness/contrast/gamma/illumination power level controls
```

## Actions
```yaml
actions:
  # --- Power control ---
  - id: power_on
    label: Power On
    kind: action
    command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
    params: []

  - id: eco_wake_serial
    label: ECO Mode Wake (Serial)
    kind: action
    command: ':POWR1\r'
    params: []
    notes: ASCII command sent on RS-232 serial port to wake projector from ECO mode. Alternative wake methods: Wake-on-LAN with MAC address, remote power button, keypad power button.

  # --- Authentication ---
  - id: authenticate
    label: Authenticate
    kind: action
    command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": {passcode}}}'
    params:
      - name: passcode
        type: integer
        description: Secret pass code to set elevated user access level
    notes: Optional - only required for access levels above normal end user.

  # --- Generic property operations ---
  - id: property_set
    label: Set Property
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "{property}", "value": {value}}}'
    params:
      - name: property
        type: string
        description: Property path in dot notation (e.g. image.brightness)
      - name: value
        type: any
        description: Value to set (type depends on property)
    notes: Best practice to wait for confirmation before setting the same property again.

  - id: property_get
    label: Get Property
    kind: query
    command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "{property}"}}'
    params:
      - name: property
        type: string
        description: Property path in dot notation, or array of property paths for multiple reads

  - id: property_subscribe
    label: Subscribe to Property Changes
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "{property}"}}'
    params:
      - name: property
        type: string
        description: Property path, or array of property paths for multiple subscriptions

  - id: property_unsubscribe
    label: Unsubscribe from Property Changes
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "{property}"}}'
    params:
      - name: property
        type: string
        description: Property path, or array of property paths

  # --- Signal operations ---
  - id: signal_subscribe
    label: Subscribe to Signal
    kind: action
    command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "{signal}"}}'
    params:
      - name: signal
        type: string
        description: Signal name, or array of signal names for multiple subscriptions

  - id: signal_unsubscribe
    label: Unsubscribe from Signal
    kind: action
    command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "{signal}"}}'
    params:
      - name: signal
        type: string
        description: Signal name, or array of signal names

  # --- Introspection ---
  - id: introspect
    label: Introspect Object
    kind: query
    command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "{object}", "recursive": {recursive}}}'
    params:
      - name: object
        type: string
        description: Object name in dot notation; empty/default introspects everything
      - name: recursive
        type: boolean
        description: If false, only object names listed (one level). Default true.
    notes: Returns metadata of available objects, methods, properties, signals. Data restricted by authenticated access level.

  # --- Source / connector management ---
  - id: list_sources
    label: List Available Sources
    kind: query
    command: '{"jsonrpc": "2.0", "method": "image.source.list"}'
    params: []
    notes: Returns array of source names (varies by model, e.g. DVI 1, DVI 2, DisplayPort 1, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, HDMI, SDI).

  - id: list_connectors
    label: List Available Connectors
    kind: query
    command: '{"jsonrpc": "2.0", "method": "image.connector.list"}'
    params: []
    notes: Returns array of physical connector names (varies by model).

  - id: list_source_connectors
    label: List Connectors for Source
    kind: query
    command: '{"jsonrpc": "2.0", "method": "image.source.{sourcename}.listconnectors"}'
    params:
      - name: sourcename
        type: string
        description: Source object name derived by removing non-word chars and lowercasing (e.g. DisplayPort 1 → displayport1)
    notes: Returns array of connector info with name and grid position.

  # --- Illumination ---
  - id: engage_clo
    label: Engage CLO
    kind: action
    command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
    params: []
    notes: Engage Constant Light Output at current light level.

  - id: get_laser_serial_number
    label: Get Laser Serial Number
    kind: query
    command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
    params: []

  # --- Color management ---
  - id: copy_preset_to_custom
    label: Copy Preset to Custom
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Name of preset to copy

  - id: reset_color_preset
    label: Reset Color Preset
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Name of preset to reset to defaults

  - id: reset_to_native
    label: Reset to Native
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
    params: []

  - id: next_rgb_mode
    label: Next RGB Mode
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
    params: []
    notes: Cycles through all possible RGB modes.

  # --- Environment monitoring ---
  - id: get_control_blocks
    label: Get Environment Control Blocks
    kind: query
    command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "{type}", "valuetype": "{valuetype}"}}'
    params:
      - name: type
        type: string
        description: Sensor type enum (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock)
      - name: valuetype
        type: string
        description: Value type enum (Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any)
    notes: Returns dictionary of sensor readings (e.g. temperatures, fan speeds).

  - id: get_alarm_info
    label: Get Alarm Info
    kind: query
    command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
    params: []
    notes: Returns array of alarm info objects with severity, timestamp, source, description, custommessage.

  # --- DMX ---
  - id: dmx_list_channels
    label: List DMX Channels
    kind: query
    command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
    params: []
    notes: Returns list of available channel names.

  - id: dmx_list_modes
    label: List DMX Modes
    kind: query
    command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
    params: []
    notes: Returns list of all modes.

  # --- Firmware ---
  - id: list_firmware_components
    label: List Firmware Components
    kind: query
    command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
    params: []
    notes: Returns names of all managed firmware components.

  - id: list_firmware_version_status
    label: List Firmware Version Status
    kind: query
    command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
    params: []
    notes: Returns components with name, available version, running version, status (Unknown, OK, Upgradable).

  - id: schedule_firmware_upgrade
    label: Schedule Firmware Upgrade
    kind: action
    command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
    params: []
    notes: Force a component upgrade at the following reboot.

  # --- HTTP file endpoints ---
  - id: upload_warp_grid
    label: Upload Warp Grid File
    kind: action
    command: 'curl -F file=@{filename} http://{address}/api/image/processing/warp/file/transfer'
    params:
      - name: filename
        type: string
        description: Local warp grid XML file path
      - name: address
        type: string
        description: Projector IP address

  - id: download_warp_grid
    label: Download Warp Grid File
    kind: query
    command: 'http://{address}/api/image/processing/warp/file/transfer'
    params:
      - name: address
        type: string
        description: Projector IP address
    notes: Append specific filename to download a particular file (e.g. /warpgrid.xml).

  - id: upload_blend_mask
    label: Upload Blend Mask
    kind: action
    command: 'curl -F file=@{filename} http://{address}/api/image/processing/blend/file/transfer'
    params:
      - name: filename
        type: string
        description: Local blend mask image file path (PNG/JPEG/TIFF, grayscale)
      - name: address
        type: string
        description: Projector IP address
    notes: Mask resolution must match projector (WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540).

  - id: upload_blacklevel_mask
    label: Upload Black Level Mask
    kind: action
    command: 'curl -F file=@{filename} http://{address}/api/image/processing/blacklevel/file/transfer'
    params:
      - name: filename
        type: string
        description: Local black level mask image file path (PNG/JPEG/TIFF, grayscale)
      - name: address
        type: string
        description: Projector IP address
    notes: Mask resolution must match projector (WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540).
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    type: enum
    values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
    property: system.state
    notes: Current operation state. Query via property.get on "system.state".

  - id: illumination_state
    type: enum
    values: ["On", "Off"]
    property: illumination.state
    notes: Query via property.get on "illumination.state".

  - id: illumination_power
    type: number
    property: illumination.sources.laser.power
    notes: Current illumination power in percent.

  - id: illumination_min_power
    type: number
    property: illumination.sources.laser.minpower
    notes: Minimum power in percent (read-only, dynamic).

  - id: illumination_max_power
    type: number
    property: illumination.sources.laser.maxpower
    notes: Maximum power in percent (read-only, dynamic).

  - id: active_source
    type: string
    property: image.window.main.source
    notes: Name of currently active source.

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

  - id: detected_signal
    type: object
    property: image.connector.{name}.detectedsignal
    notes: Connector signal info (active, name, resolution, timings, color space, etc.). Connector object name derived from connector name. Query via property.get.

  - id: laser_power
    type: number
    property: illumination.sources.laser.power
    notes: Current laser/illumination power in percent.

  - id: brightness
    type: number
    property: image.brightness

  - id: contrast
    type: number
    property: image.contrast

  - id: gamma
    type: number
    property: image.gamma

  - id: saturation
    type: number
    property: image.saturation

  - id: sharpness
    type: integer
    property: image.sharpness
```

## Variables
```yaml
variables:
  - id: illumination_power_set
    property: illumination.sources.laser.power
    type: float
    min: 0  # UNRESOLVED: exact min from minpower property, dynamic
    max: 100  # UNRESOLVED: exact max from maxpower property, dynamic
    description: Target illumination power in percent

  - id: image_window_source
    property: image.window.main.source
    type: string
    description: Active source displayed in main window. Values vary by model (e.g. DisplayPort 1, HDMI, DVI 1, SDI, HDBaseT).

  - id: image_window_position
    property: image.window.main.position
    type: object
    description: Window position {x: int, y: int}

  - id: image_window_size
    property: image.window.main.size
    type: object
    description: Window size {width: int, height: int}

  - id: image_window_scalingmode
    property: image.window.main.scalingmode
    type: enum
    values: [Fill, OneToOne, FillScreen, Stretch]

  - id: brightness
    property: image.brightness
    type: float
    min: -1
    max: 1
    step_size: 1
    precision: 0.01
    description: Image brightness/offset. 0 is default, 1 is 100% offset.

  - id: contrast
    property: image.contrast
    type: float
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    description: Image contrast/gain. 1 is default.

  - id: gamma
    property: image.gamma
    type: float
    min: 1
    max: 3
    step_size: 1
    precision: 0.1
    description: Image gamma. Default 2.2.

  - id: saturation
    property: image.saturation
    type: float
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    description: Image color saturation. 1 is default.

  - id: sharpness
    property: image.sharpness
    type: integer
    min: -2
    max: 8
    step_size: 1
    precision: 1
    description: Image sharpness (normalized).

  - id: image_orientation
    property: image.orientation
    type: enum
    values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

  - id: warp_enable
    property: image.processing.warp.enable
    type: boolean
    description: Enable/disable all warp functions.

  - id: warp_file_enable
    property: image.processing.warp.file.enable
    type: boolean
    description: Enable/disable file warp.

  - id: warp_file_selected
    property: image.processing.warp.file.selected
    type: string
    description: Currently selected warp file.

  - id: blend_file_enable
    property: image.processing.blend.file.enable
    type: boolean
    description: Enable/disable file blend.

  - id: blend_file_selected
    property: image.processing.blend.file.selected
    type: array
    description: Currently selected blend files.

  - id: blacklevel_file_enable
    property: image.processing.blacklevel.file.enable
    type: boolean
    description: Enable/disable black level correction.

  - id: blacklevel_file_selected
    property: image.processing.blacklevel.file.selected
    type: string
    description: Currently selected black level file.

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
    description: DMX shutdown enabled or not.

  - id: shutter_target
    property: optics.shutter.target
    type: enum
    values: [Open, Closed]

  - id: zoom_position
    property: optics.zoom.position
    type: integer
    description: Current zoom position.

  - id: focus_position
    property: optics.focus.position
    type: integer
    description: Current focus position.

  - id: lensshift_horizontal
    property: optics.lensshift.horizontal.position
    type: integer
    description: Current horizontal lens shift position.

  - id: lensshift_vertical
    property: optics.lensshift.vertical.position
    type: integer
    description: Current vertical lens shift position.

  - id: standby_enable
    property: system.standby.enable
    type: boolean
    description: Enable/disable standby state. Check availability first.

  - id: eco_enable
    property: system.eco.enable
    type: boolean
    description: Enable/disable ECO state. Check availability first.
```

## Events
```yaml
events:
  - id: property_changed
    method: property.changed
    description: Unsolicited notification sent when a subscribed property value changes. Client must implement property.changed listener. No response message returned.
    payload_example: '{"jsonrpc": "2.0", "method": "property.changed", "params": {"property": [{"system.state": "ready"}]}}'

  - id: signal_callback
    method: signal.callback
    description: Unsolicited notification sent when a subscribed signal is emitted. Client must implement signal.callback listener. No response message returned.
    payload_example: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"objectname.signalname": {"arg1": 100}}]}}'

  - id: model_updated
    method: modelupdated
    description: Signal triggered when object structure changes (objects added or removed). Subscribe via signal.subscribe on "modelupdated".
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented as named macros in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Power on: verify projector state is standby or ready before issuing system.poweron. If already on or transitioning, nothing happens."
  - description: "Power off: verify projector state is on before issuing system.poweroff. If already off or transitioning, nothing happens."
  - description: "ECO mode wake requires special handling - Wake-on-LAN, remote/keypad power button, or serial :POWR1 command."
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on sequencing requirements beyond state-verification best practices stated in source.
```

## Notes
- The API is JSON-RPC 2.0 based. All parameters are passed by name; parameter order does not matter.
- The API is partially dynamic — available objects/methods/properties depend on projector model, configuration, and connected peripherals (e.g. motorized zoom lens, DMX extended mode). Best way to discover exact API is introspection via the `introspect` method.
- Source/signal updates require reflecting the source-connector structure in the client: call `image.source.list`, translate names to object names (remove non-word chars, lowercase), call `image.source.{name}.listconnectors`, then subscribe to `image.connector.{name}.detectedsignal` for each connector.
- Two notifications are delivered on source switch: first when previous source deselected (value ""), then when new source selected.
- Subscribing to a property does not return its current value — use `property.get` for current values.
- Image file endpoints (warp/blend/blacklevel) accept PNG (up to 16-bit), JPEG, TIFF. Only grayscale is used; color images use blue channel only.
- Warp file format is same as MCM500/400.

<!-- UNRESOLVED: exact projector model variant not confirmed — source is a generic Pulse API reference. -->
<!-- UNRESOLVED: illumination source type (laser vs UHP lamp) varies by projector; device name suggests UHP lamp but examples show laser properties. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: protocol version number not stated in source. -->
```

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:56:48.954Z
last_checked_at: 2026-07-21T20:34:48.249Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:34:48.249Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions matched with exact JSON-RPC method names in source. Transport: TCP port 9090, RS-232 19200 baud, HTTP base_url pattern verified. File endpoints (warp/blend/blacklevel) confirmed. Complete coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact projector model variant and firmware version not stated in the source document. The source is a generic Pulse API reference."
- "exact min from minpower property, dynamic"
- "exact max from maxpower property, dynamic"
- "no explicit multi-step sequences documented as named macros in source."
- "no explicit safety warnings, interlock procedures, or power-on sequencing requirements beyond state-verification best practices stated in source."
- "exact projector model variant not confirmed — source is a generic Pulse API reference."
- "illumination source type (laser vs UHP lamp) varies by projector; device name suggests UHP lamp but examples show laser properties."
- "firmware version compatibility not stated in source."
- "protocol version number not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
