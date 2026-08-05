---
spec_id: admin/barco-1520clp-top-pack
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco 1520Clp Top Pack Control Spec"
manufacturer: Barco
model_family: "1520Clp Top Pack"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "1520Clp Top Pack"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:59:44.623Z
last_checked_at: 2026-07-21T20:34:45.853Z
generated_at: 2026-07-21T20:34:45.853Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "protocol version number not stated in source"
  - "actual secret passcode is device-specific; example value 98765 is illustrative only"
  - "no explicit multi-step sequences described in source"
  - "no explicit safety warnings, interlock procedures, or power-on"
  - "actual authentication passcode is device-specific (example 98765 illustrative only)"
  - "full DMX channel mapping in extended mode not documented"
  - "complete list of image.color presets and RGB modes not enumerated"
verification:
  verdict: verified
  checked_at: 2026-07-21T20:34:45.853Z
  matched_actions: 36
  action_count: 36
  confidence: medium
  summary: "All 36 spec actions matched literally in source; transport parameters verified; parameterized property/signal methods cover full API surface. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco 1520Clp Top Pack Control Spec

## Summary
The Barco 1520Clp Top Pack is a Pulse-series projector controllable over TCP/IP (JSON-RPC 2.0 on port 9090) and RS-232 serial. This spec covers the Pulse API methods, settable properties, queryable feedbacks, unsolicited notifications, and HTTP file endpoints documented in the vendor catalog.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: protocol version number not stated in source -->

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
  type: passcode  # source describes optional passcode authentication for elevated access
  # UNRESOLVED: actual secret passcode is device-specific; example value 98765 is illustrative only
```

## Traits
```yaml
traits:
  - powerable  # inferred from system.poweron / system.poweroff commands
  - routable   # inferred from source selection commands
  - queryable  # inferred from property.get / query command examples
  - levelable  # inferred from brightness/contrast/gamma/laser power control
```

## Actions
```yaml
# All commands use JSON-RPC 2.0 envelopes over TCP port 9090.
# Serial carries the same JSON-RPC commands (except the special ECO wake sequence).
actions:
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
    notes: Special ASCII wake-up command sent over RS-232 to wake projector in ECO mode. Does not apply to TCP.

  - id: authenticate
    label: Authenticate
    kind: action
    command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"code": 98765}}'
    params:
      - name: code
        type: integer
        description: Secret passcode for elevated access level. Example value 98765 is illustrative; actual code is device-specific.
    notes: Optional. Only required for access levels above normal end user.

  - id: property_set
    label: Set Property
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "{property}", "value": {value}}}'
    params:
      - name: property
        type: string
        description: Property name in dot notation (e.g. image.brightness).
      - name: value
        type: any
        description: Value to set; type depends on the property.
    notes: Best practice to wait for confirmation before setting the same property again.

  - id: property_get
    label: Get Property
    kind: query
    command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "{property}"}}'
    params:
      - name: property
        type: string
        description: Property name in dot notation.

  - id: property_get_multiple
    label: Get Multiple Properties
    kind: query
    command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": ["{property1}", "{property2}"]}}'
    params:
      - name: property
        type: array
        description: Array of property name strings.

  - id: property_subscribe
    label: Subscribe To Property
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "{property}"}}'
    params:
      - name: property
        type: string
        description: Property name to observe.

  - id: property_subscribe_multiple
    label: Subscribe To Multiple Properties
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": ["{property1}", "{property2}"]}}'
    params:
      - name: property
        type: array
        description: Array of property name strings.

  - id: property_unsubscribe
    label: Unsubscribe From Property
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "{property}"}}'
    params:
      - name: property
        type: string
        description: Property name to stop observing.

  - id: property_unsubscribe_multiple
    label: Unsubscribe From Multiple Properties
    kind: action
    command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": ["{property1}", "{property2}"]}}'
    params:
      - name: property
        type: array
        description: Array of property name strings.

  - id: signal_subscribe
    label: Subscribe To Signal
    kind: action
    command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "{signal}"}}'
    params:
      - name: signal
        type: string
        description: Signal name (e.g. modelupdated).

  - id: signal_subscribe_multiple
    label: Subscribe To Multiple Signals
    kind: action
    command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": ["{signal1}", "{signal2}"]}}'
    params:
      - name: signal
        type: array
        description: Array of signal name strings.

  - id: signal_unsubscribe
    label: Unsubscribe From Signal
    kind: action
    command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "{signal}"}}'
    params:
      - name: signal
        type: string
        description: Signal name.

  - id: signal_unsubscribe_multiple
    label: Unsubscribe From Multiple Signals
    kind: action
    command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": ["{signal1}", "{signal2}"]}}'
    params:
      - name: signal
        type: array
        description: Array of signal name strings.

  - id: introspect_recursive
    label: Introspect (Recursive)
    kind: query
    command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "{object}", "recursive": true}}'
    params:
      - name: object
        type: string
        description: Object name in dot notation; empty/default introspects everything.
    notes: Returns metadata of methods, properties, signals for the object subtree.

  - id: introspect_nonrecursive
    label: Introspect (Non-Recursive)
    kind: query
    command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "{object}", "recursive": false}}'
    params:
      - name: object
        type: string
        description: Object name in dot notation.
    notes: Returns only immediate child object names (one level).

  - id: image_source_list
    label: List Available Sources
    kind: query
    command: '{"jsonrpc": "2.0", "method": "image.source.list"}'
    params: []
    notes: Returns array of source name strings. Contents vary by projector model.

  - id: image_connector_list
    label: List Available Connectors
    kind: query
    command: '{"jsonrpc": "2.0", "method": "image.connector.list"}'
    params: []
    notes: Returns array of physical connector name strings.

  - id: image_source_listconnectors
    label: List Source Connectors
    kind: query
    command: '{"jsonrpc": "2.0", "method": "image.source.{sourceobject}.listconnectors"}'
    params:
      - name: sourceobject
        type: string
        description: Source object name derived by removing non-word chars from source name and lowercasing (e.g. "DisplayPort 1" -> "displayport1").
    notes: Returns array of connector info with name and grid position.

  - id: environment_getcontrolblocks
    label: Get Environment Control Blocks
    kind: query
    command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "{type}", "valuetype": "{valuetype}"}}'
    params:
      - name: type
        type: string
        description: Sensor type enum (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock).
      - name: valuetype
        type: string
        description: Value type enum (Temperature, Speed, PWM, Voltage, Current, Power, etc.).
    notes: Returns dictionary of sensor name -> reading value.

  - id: environment_getalarminfo
    label: Get Alarm Info
    kind: query
    command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
    params: []
    notes: Returns array of alarm info objects with severity, timestamp, source, description, custommessage.

  - id: dmx_listchannels
    label: List DMX Channels
    kind: query
    command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
    params: []
    notes: Returns array of available channel name strings.

  - id: dmx_listmodes
    label: List DMX Modes
    kind: query
    command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
    params: []
    notes: Returns array of mode name strings.

  - id: firmware_listcomponents
    label: List Firmware Components
    kind: query
    command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
    params: []
    notes: Returns array of managed firmware component name strings.

  - id: firmware_listcomponentversionstatus
    label: List Firmware Version Status
    kind: query
    command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
    params: []
    notes: Returns array of {name, versions:{available, running}, status}. status enum: Unknown, OK, Upgradable.

  - id: firmware_schedulecomponentupgrade
    label: Schedule Component Upgrade
    kind: action
    command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
    params: []
    notes: Forces a component upgrade at the following reboot.

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
    notes: Returns laser serial number string.

  - id: image_color_p7_custom_copypresettocustom
    label: Copy Preset To Custom
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Name of the preset to copy.

  - id: image_color_p7_custom_resetpreset
    label: Reset Preset
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "{presetname}"}}'
    params:
      - name: presetname
        type: string
        description: Name of the preset to reset.

  - id: image_color_p7_custom_resettonative
    label: Reset To Native
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
    params: []

  - id: image_color_rgbmode_nextrgbmode
    label: Next RGB Mode
    kind: action
    command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
    params: []
    notes: Cycles to the next RGB mode.

  - id: upload_warp_grid
    label: Upload Warp Grid File
    kind: action
    command: 'curl -X POST -F file=@{filename} http://{projector_ip}/api/image/processing/warp/file/transfer'
    params:
      - name: filename
        type: string
        description: Local warp grid XML file path.
      - name: projector_ip
        type: string
        description: Projector IP address.
    notes: HTTP POST file upload. Warp grid format same as MCM500/400.

  - id: upload_blend_mask
    label: Upload Blend Mask
    kind: action
    command: 'curl -X POST -F file=@{filename} http://{projector_ip}/api/image/processing/blend/file/transfer'
    params:
      - name: filename
        type: string
        description: Local blend mask image file path (PNG/JPEG/TIFF, grayscale 8 or 16 bit).
      - name: projector_ip
        type: string
        description: Projector IP address.

  - id: upload_blacklevel_mask
    label: Upload Black Level Mask
    kind: action
    command: 'curl -X POST -F file=@{filename} http://{projector_ip}/api/image/processing/blacklevel/file/transfer'
    params:
      - name: filename
        type: string
        description: Local black level mask image file path (PNG/JPEG/TIFF, grayscale 8 or 16 bit).
      - name: projector_ip
        type: string
        description: Projector IP address.
```

## Feedbacks
```yaml
feedbacks:
  - id: system_state
    property: system.state
    type: enum
    values: ["boot", "eco", "standby", "ready", "conditioning", "on", "service", "deconditioning", "error"]
    description: Current operation state of the projector.

  - id: illumination_state
    property: illumination.state
    type: enum
    values: ["On", "Off"]
    description: State of the light source.

  - id: laser_minpower
    property: illumination.sources.laser.minpower
    type: float
    description: Minimum laser power in percent (read-only, dynamic).

  - id: laser_maxpower
    property: illumination.sources.laser.maxpower
    type: float
    description: Maximum laser power in percent (read-only, dynamic).

  - id: active_source
    property: image.window.main.source
    type: string
    description: Name of the currently active source displayed in the main window.

  - id: network_lan_state
    property: network.device.lan.state
    type: enum
    values: ["CONNECTED", "DISCONNECTED"]
    description: Current state of the LAN device.

  - id: network_lan_ip4config
    property: network.device.lan.ip4config
    type: object
    description: IPv4 configuration. Fields: Address (string), Mask (string), Gateway (string), NameServers (string).

  - id: environment_alarmstate
    property: environment.alarmstate
    type: enum
    values: ["Fatal", "Error", "Alert", "Warning", "Ok"]
    description: Aggregate alarm state of the projector.

  - id: connector_detectedsignal
    property: image.connector.{connectorobject}.detectedsignal
    type: object
    description: >
      Signal information for a connector. Connector object name derived by lowercasing and
      removing non-word chars (e.g. "DisplayPort 1" -> "displayport1"). Fields include:
      active (bool), name (string), vertical_total, horizontal_total, vertical_resolution,
      horizontal_resolution, vertical_sync_width, vertical_front_porch, vertical_back_porch,
      horizontal_sync_width, horizontal_front_porch, horizontal_back_porch, horizontal_frequency,
      vertical_frequency, pixel_rate, scan (enum), bits_per_component, color_space (enum),
      signal_range (enum: 0-255, 16-235), chroma_sampling (enum: 4:4:4, 4:2:2, 4:2:0),
      gamma_type (enum: POWER, sRGB, REC_BT1886, SMPTE_ST2084), color_primaries (enum),
      mastering_luminance (float), content_aspect_ratio (enum), is_stereo (bool),
      stereo_mode (enum: None, Sequential, FramePacked, TopBottom, SideBySide).
```

## Variables
```yaml
# All set via property.set; read via property.get; observe via property.subscribe.
variables:
  - id: image_window_main_source
    property: image.window.main.source
    type: string
    access: read_write
    description: Source displayed in the main window (e.g. "DisplayPort 1", "HDMI").

  - id: image_window_main_position
    property: image.window.main.position
    type: object
    access: read_write
    description: Window position. Fields: x (int), y (int).

  - id: image_window_main_size
    property: image.window.main.size
    type: object
    access: read_write
    description: Window size. Fields: width (int), height (int).

  - id: image_window_main_scalingmode
    property: image.window.main.scalingmode
    type: enum
    access: read_write
    values: ["Fill", "OneToOne", "FillScreen", "Stretch"]
    description: Scaling mode applied to the source.

  - id: image_brightness
    property: image.brightness
    type: float
    access: read_write
    min: -1
    max: 1
    step_size: 1
    precision: 0.01
    description: Image brightness/offset. 0 is default, 1 is 100% offset.

  - id: image_contrast
    property: image.contrast
    type: float
    access: read_write
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    description: Image contrast/gain. 1 is default.

  - id: image_gamma
    property: image.gamma
    type: float
    access: read_write
    min: 1
    max: 3
    step_size: 1
    precision: 0.1
    description: Image gamma. Default is 2.2.

  - id: image_saturation
    property: image.saturation
    type: float
    access: read_write
    min: 0
    max: 2
    step_size: 1
    precision: 0.01
    description: Image color saturation. 1 is default.

  - id: image_sharpness
    property: image.sharpness
    type: int
    access: read_write
    min: -2
    max: 8
    step_size: 1
    precision: 1
    description: Image sharpness (normalized).

  - id: image_orientation
    property: image.orientation
    type: enum
    access: read_write
    values: ["DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"]
    description: Projection orientation.

  - id: illumination_sources_laser_power
    property: illumination.sources.laser.power
    type: float
    access: read_write
    description: Target laser power in percent.

  - id: image_processing_warp_enable
    property: image.processing.warp.enable
    type: boolean
    access: read_write
    description: Enable/disable all warp functions.

  - id: image_processing_warp_file_enable
    property: image.processing.warp.file.enable
    type: boolean
    access: read_write
    description: Enable/disable file warp.

  - id: image_processing_warp_file_selected
    property: image.processing.warp.file.selected
    type: string
    access: read_write
    description: Currently selected warp file.

  - id: image_processing_blend_file_enable
    property: image.processing.blend.file.enable
    type: boolean
    access: read_write
    description: Enable/disable file blend.

  - id: image_processing_blend_file_selected
    property: image.processing.blend.file.selected
    type: array
    access: read_write
    description: Currently selected blend files (array of strings).

  - id: image_processing_blacklevel_file_enable
    property: image.processing.blacklevel.file.enable
    type: boolean
    access: read_write
    description: Enable/disable black level correction.

  - id: image_processing_blacklevel_file_selected
    property: image.processing.blacklevel.file.selected
    type: string
    access: read_write
    description: Currently selected black level file.

  - id: dmx_mode
    property: dmx.mode
    type: string
    access: read_write
    description: Current DMX mode.

  - id: dmx_startchannel
    property: dmx.startchannel
    type: int
    access: read_write
    min: 1
    max: 512
    description: DMX start channel.

  - id: dmx_shutdown
    property: dmx.shutdown
    type: boolean
    access: read_write
    description: Shutdown enabled or not.

  - id: optics_shutter_position
    property: optics.shutter.position
    type: enum
    access: read_write
    values: ["Open", "Closed"]
    description: Position of shutter.

  - id: optics_shutter_target
    property: optics.shutter.target
    type: enum
    access: read_write
    values: ["Open", "Closed"]
    description: Target of shutter.

  - id: optics_zoom_position
    property: optics.zoom.position
    type: int
    access: read_write
    description: Current zoom position.

  - id: optics_focus_position
    property: optics.focus.position
    type: int
    access: read_write
    description: Current focus position.

  - id: optics_lensshift_horizontal_position
    property: optics.lensshift.horizontal.position
    type: int
    access: read_write
    description: Current horizontal lens shift position.

  - id: optics_lensshift_vertical_position
    property: optics.lensshift.vertical.position
    type: int
    access: read_write
    description: Current vertical lens shift position.

  - id: system_standby_enable
    property: system.standby.enable
    type: boolean
    access: read_write
    description: Enable/disable standby state availability.

  - id: system_eco_enable
    property: system.eco.enable
    type: boolean
    access: read_write
    description: Enable/disable ECO state availability.
```

## Events
```yaml
events:
  - id: property_changed
    method: property.changed
    description: >
      Unsolicited notification when a subscribed property value changes. No id field;
      no response must be returned. params.property is an array of {propertyName: value} objects.
    payload_example: '{"jsonrpc": "2.0", "method": "property.changed", "params": {"property": [{"system.state": "ready"}]}}'
    notes: >
      For source changes, two notifications may be delivered (deselect old, then select new).
      Notifications only sent on actual value change; subscribing does not return current value.

  - id: signal_callback
    method: signal.callback
    description: >
      Unsolicited notification when a subscribed signal is emitted. params.signal is an array
      of {signalName: {args}} objects.
    payload_example: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"introspect.objectchanged": {"object": "motors.motor1", "newobject": true}}]}}'

  - id: modelupdated
    method: modelupdated
    description: >
      Signal triggered when the object structure changes (objects added or removed). Subscribe
      via signal.subscribe. Callback delivered through signal.callback as introspect.objectchanged
      with {object: string, isnew: bool} arguments.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements stated in source. Source notes good-practice advice:
# verify system.state is standby/ready before power_on; verify on before power_off.
# No hard interlocks documented.
```

## Notes
- The Pulse API is dynamic: available objects/methods/properties depend on projector configuration and peripherals (e.g. motorized lens, DMX extended mode). The authoritative API surface for a specific unit is obtained via the `introspect` method.
- Parameters are passed by name; order does not matter in JSON-RPC `params` objects.
- `property.set` best practice: wait for confirmation before setting the same property again to avoid flooding the server.
- Notifications have no `id` field; the client must not send a response for notification messages.
- Blend/black-level/warp masks accept PNG (up to 16 bit), JPEG, TIFF. Only grayscale is used; color images use the blue channel only. Mask resolution must match projector blend/black-level layer resolution (e.g. WUXGA 1920x1200, WQXGA/4K 1280x800, 4K Cinemascope 1280x540).
- DMX basic mode exposes 2 channels; extended mode exposes more (not enumerated in this document).
- ECO mode wake requires WoL (MAC address), remote/kypad power button, or the serial sequence `:POWR1\r`.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: protocol version number not stated in source -->
<!-- UNRESOLVED: actual authentication passcode is device-specific (example 98765 illustrative only) -->
<!-- UNRESOLVED: full DMX channel mapping in extended mode not documented -->
<!-- UNRESOLVED: complete list of image.color presets and RGB modes not enumerated -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:59:44.623Z
last_checked_at: 2026-07-21T20:34:45.853Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:34:45.853Z
matched_actions: 36
action_count: 36
confidence: medium
summary: "All 36 spec actions matched literally in source; transport parameters verified; parameterized property/signal methods cover full API surface. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "protocol version number not stated in source"
- "actual secret passcode is device-specific; example value 98765 is illustrative only"
- "no explicit multi-step sequences described in source"
- "no explicit safety warnings, interlock procedures, or power-on"
- "actual authentication passcode is device-specific (example 98765 illustrative only)"
- "full DMX channel mapping in extended mode not documented"
- "complete list of image.color presets and RGB modes not enumerated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
