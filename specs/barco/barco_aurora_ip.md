---
spec_id: admin/barco-aurora
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Aurora Control Spec"
manufacturer: Barco
model_family: "Barco Aurora"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Aurora"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:42:13.079Z
last_checked_at: 2026-08-05T07:21:27.772Z
generated_at: 2026-08-05T07:21:27.772Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "product variant mapping not stated; \"Pulse API\" is shared across many Barco projector lines."
  - "source describes optional opt-in authentication, not a required login"
  - "per-property access constraints (READ_WRITE vs READ_ONLY) only documented for image.brightness/gamma/saturation/contrast/sharpness; full access table not in source. Firmware version compatibility ranges not stated. Image color properties (REC709, REC2020, etc.) and full signal metadata schemas (color_space, chroma_sampling enum values) only partially enumerated in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T07:21:27.772Z
  matched_actions: 57
  action_count: 57
  confidence: medium
  summary: "All 57 spec actions match JSON-RPC methods, properties, file endpoints, and the serial wake token documented in the Pulse API source. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-23
---

# Barco Aurora Control Spec

## Summary

Pulse API for Barco Aurora projector. JSON-RPC 2.0 over TCP port 9090 and serial (RS-232, 19200/8/N/1). Document covers power, input source selection, illumination, image settings (brightness/contrast/gamma/saturation/sharpness/orientation), warping, blending, black level, optics (shutter/zoom/focus/lensshift), environment sensors, DMX, firmware management, introspection, and signal subscriptions.

<!-- UNRESOLVED: product variant mapping not stated; "Pulse API" is shared across many Barco projector lines. -->

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
  type: optional  # UNRESOLVED: source describes optional opt-in authentication, not a required login
```

## Traits
```yaml
- powerable       # inferred from system.poweron / system.poweroff
- routable        # inferred from image.window.main.source switch examples
- queryable       # inferred from property.get / property.subscribe examples
- levelable       # inferred from illumination.sources.laser.power (settable)
```

## Actions
```yaml
- id: authenticate
  label: Authenticate (optional)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"id": 1, "code": 98765}, "id": 1}'
  params:
    - name: code
      type: integer
      description: Secret pass code required only for access levels above normal end user
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron", "params": {"id": 3, "property": "system.state"}, "id": 3}'
  params: []
- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff", "params": {"id": 4, "property": "system.state"}, "id": 4}'
  params: []
- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "objectname.propertyname", "value": 100}, "id": 3}'
  params:
    - name: property
      type: string
      description: Dot-notation property path (e.g. image.window.main.source)
    - name: value
      type: string
      description: Value to assign (type per property schema)
- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "objectname.propertyname"}, "id": 4}'
  params:
    - name: property
      type: string
      description: Dot-notation property path
- id: property_get_multi
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": ["image.brightness", "image.contrast"]}, "id": 5}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property paths
- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "image.brightness"}, "id": 6}'
  params:
    - name: property
      type: string
      description: Single dot-notation property path or array of paths
- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "image.brightness"}, "id": 8}'
  params:
    - name: property
      type: string
      description: Single dot-notation property path or array of paths
- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "modelupdated"}, "id": 10}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names
- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "modelupdated"}, "id": 12}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names
- id: introspect
  label: Introspect Object
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "foo", "recursive": true}, "id": 1}'
  params:
    - name: object
      type: string
      description: Dot-notation object name (default empty introspects all)
    - name: recursive
      type: boolean
      description: If false, only one level object names are listed
- id: introspect_short
  label: Introspect Object (positional)
  kind: query
  command: '{"method": "introspect", "params": ["foo", true], "id": 1}'
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean
- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": {"led": "systemstatus", "color": "red", "period": 42}, "id": 3}'
  params:
    - name: led
      type: string
    - name: color
      type: string
    - name: period
      type: integer
- id: system_state_get
  label: Get System State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "system.state"}, "id": 1}'
  params: []
- id: system_state_subscribe
  label: Subscribe to System State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "system.state"}, "id": 2}'
  params: []
- id: image_window_main_source_get
  label: Get Active Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.window.main.source"}, "id": 0}'
  params: []
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "id": 1}'
  params: []
- id: image_window_main_source_set
  label: Set Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "DisplayPort 1"}, "id": 2}'
  params:
    - name: value
      type: string
      description: Source name from image.source.list
- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "id": 3}'
  params: []
- id: image_source_listconnectors
  label: List Connectors for a Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.displayport1.listconnectors", "id": 4}'
  params:
    - name: source_object
      type: string
      description: Source object name (e.g. displayport1)
- id: image_connector_detectedsignal_get
  label: Get Connector Detected Signal
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.connector.displayport1.detectedsignal"}, "id": 5}'
  params:
    - name: connector_object
      type: string
      description: Connector object name (e.g. displayport1)
- id: image_window_main_source_subscribe
  label: Subscribe to Active Source Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "image.window.main.source"}, "id": 6}'
  params: []
- id: illumination_state_get
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.state"}, "id": 0}'
  params: []
- id: illumination_state_subscribe
  label: Subscribe to Illumination State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "illumination.state"}, "id": 1}'
  params: []
- id: illumination_sources_introspect
  label: Introspect Illumination Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"recursive": false}, "id": 2}'
  params: []
- id: illumination_laser_power_get
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.power"}, "id": 3}'
  params: []
- id: illumination_laser_power_set
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "illumination.sources.laser.power", "value": 40}, "id": 5}'
  params:
    - name: value
      type: integer
      description: Target power in percent (between minpower and maxpower)
- id: illumination_laser_power_subscribe
  label: Subscribe to Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": ["illumination.sources.laser.power"]}, "id": 4}'
  params: []
- id: illumination_laser_minpower_get
  label: Get Laser Min Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.minpower"}, "id": 6}'
  params: []
- id: illumination_laser_maxpower_get
  label: Get Laser Max Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.maxpower"}, "id": 5}'
  params: []
- id: image_brightness_get
  label: Get Brightness
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.brightness"}, "id": 7}'
  params: []
- id: image_brightness_set
  label: Set Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.brightness", "value": 0.15}, "id": 9}'
  params:
    - name: value
      type: float
      description: Range -1 to 1, step 0.01, default 0
- id: image_brightness_subscribe
  label: Subscribe to Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": ["image.brightness"]}, "id": 8}'
  params: []
- id: image_introspect
  label: Introspect Image Service
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "image", "recursive": false}, "id": 6}'
  params: []
- id: image_processing_warp_enable_set
  label: Enable/Disable Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.enable", "value": true}, "id": 10}'
  params:
    - name: value
      type: boolean
- id: warp_file_upload
  label: Upload Warp File
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address
- id: warp_file_select
  label: Select Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.selected", "value": "warp.xml"}, "id": 11}'
  params:
    - name: value
      type: string
- id: warp_file_enable_set
  label: Enable Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.enable", "value": true}, "id": 12}'
  params:
    - name: value
      type: boolean
- id: blend_file_upload
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: host
      type: string
- id: blend_file_select
  label: Select Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.selected", "value": "mask.png"}, "id": 13}'
  params:
    - name: value
      type: string
- id: blend_file_enable_set
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.enable", "value": true}, "id": 14}'
  params:
    - name: value
      type: boolean
- id: blacklevel_file_upload
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: host
      type: string
- id: blacklevel_file_select
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.selected", "value": "blacklevel.png"}, "id": 15}'
  params:
    - name: value
      type: string
- id: blacklevel_file_enable_set
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.enable", "value": true}, "id": 16}'
  params:
    - name: value
      type: boolean
- id: environment_getcontrolblocks
  label: Get Environment Sensor Blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "Sensor", "valuetype": "Temperature"}, "id": 18}'
  params:
    - name: type
      type: string
      description: Sensor type (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock)
    - name: valuetype
      type: string
      description: Value type (Temperature, Speed, PWM, Voltage, Current, Power, etc.)
- id: eco_wake_serial
  label: Wake from ECO via Serial
  kind: action
  command: ':POWR1\r'
  params: []
- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels", "id": 1}'
  params: []
- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes", "id": 1}'
  params: []
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents", "id": 1}'
  params: []
- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus", "id": 1}'
  params: []
- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade", "params": {"component": "componentname"}, "id": 1}'
  params:
    - name: component
      type: string
- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage", "id": 1}'
  params: []
- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber", "id": 1}'
  params: []
- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": "preset"}, "id": 1}'
  params:
    - name: presetname
      type: string
- id: image_color_p7_custom_resetpreset
  label: Reset P7 Preset to Default
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": "preset"}, "id": 1}'
  params:
    - name: presetname
      type: string
- id: image_color_p7_custom_resettonative
  label: Reset P7 to Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative", "id": 1}'
  params: []
- id: image_color_rgbmode_nextrgbmode
  label: Cycle to Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode", "id": 1}'
  params: []
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
- id: illumination_state
  type: enum
  values: [On, Off]
- id: image_window_main_source
  type: string
  description: Currently active source name (e.g. DisplayPort 1, HDMI)
- id: illumination_sources_laser_power
  type: float
  description: Current laser power in percent
- id: illumination_sources_laser_minpower
  type: float
  description: Laser minimum power in percent
- id: illumination_sources_laser_maxpower
  type: float
  description: Laser maximum power in percent
- id: image_brightness
  type: float
  description: Image brightness/offset, normalized, 0 is default, 1 is 100% offset
- id: image_contrast
  type: float
  description: Image contrast/gain, normalized, 1 is default
- id: image_gamma
  type: float
  description: Image gamma, default 2.2
- id: image_saturation
  type: float
  description: Image color saturation, normalized, 1 is default
- id: image_sharpness
  type: integer
  description: Image sharpness, normalized
- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
- id: image_window_main_position
  type: object
  description: Window position {x, y}
- id: image_window_main_size
  type: object
  description: Window size {width, height}
- id: image_connector_detectedsignal
  type: object
  description: Detected signal info (active, name, resolutions, frequencies, scan, color_space, etc.)
- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
- id: environment_temperatures
  type: object
  description: Dictionary of sensor name to temperature reading
- id: environment_fan_speeds
  type: object
  description: Dictionary of fan name to speed (RPM)
- id: dmx_mode
  type: string
- id: dmx_startchannel
  type: integer
  description: DMX start channel in range [1..512]
- id: dmx_shutdown
  type: boolean
- id: network_device_lan_ip4config
  type: object
  description: Current IPv4 configuration {Address, Mask, Gateway, NameServers}
- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
- id: optics_shutter_position
  type: enum
  values: [Open, Closed]
- id: optics_shutter_target
  type: enum
  values: [Open, Closed]
- id: optics_zoom_position
  type: integer
- id: optics_focus_position
  type: integer
- id: optics_lensshift_horizontal_position
  type: integer
- id: optics_lensshift_vertical_position
  type: integer
- id: system_standby_enable
  type: boolean
- id: system_eco_enable
  type: boolean
- id: firmware_componentstatus
  type: object
  description: Component {name, versions, available, running, status}
```

## Variables
```yaml
# Variables intentionally omitted; all settable parameters are exposed as property.set actions above.
```

## Events
```yaml
- id: property_changed
  description: Server-pushed notification when property value changes
  payload: '{"jsonrpc": "2.0", "method": "property.changed", "params": {"property": [{"objectname.propertyname": 100}]}}'
- id: signal_callback
  description: Server-pushed notification when a subscribed signal fires
  payload: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"objectname.signalname": {"arg1": 100}}]}}'
- id: modelupdated
  description: Signal fired when object structure changes (objects added or removed)
  payload: '{"jsonrpc": "2.0", "method": "signal.callback", "params": {"signal": [{"introspect.objectchanged": {"object": "motors.motor1", "newobject": true}}]}}'
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes

Connection: TCP port 9090 for Pulse services, or RS-232 serial at 19200/8/N/1. The same JSON-RPC commands are available over both transports. Authentication is optional — only required for access levels above normal end user. Power on/off are idempotent; verify state via `system.state` before issuing transitions. Wake-from-ECO on serial: send `:POWR1\r`. To GET a list of available sources, call `image.source.list` first, then SET `image.window.main.source`. Per-property introspection is not supported — introspect the owning object (e.g. `image`) to discover property schemas. Append-only file endpoint for warp/blend/blacklevel upload via HTTP POST to `/api/.../file/transfer`. Wait for property.set confirmation before re-issuing the same property to avoid flooding.

<!-- UNRESOLVED: per-property access constraints (READ_WRITE vs READ_ONLY) only documented for image.brightness/gamma/saturation/contrast/sharpness; full access table not in source. Firmware version compatibility ranges not stated. Image color properties (REC709, REC2020, etc.) and full signal metadata schemas (color_space, chroma_sampling enum values) only partially enumerated in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:42:13.079Z
last_checked_at: 2026-08-05T07:21:27.772Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T07:21:27.772Z
matched_actions: 57
action_count: 57
confidence: medium
summary: "All 57 spec actions match JSON-RPC methods, properties, file endpoints, and the serial wake token documented in the Pulse API source. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "product variant mapping not stated; \"Pulse API\" is shared across many Barco projector lines."
- "source describes optional opt-in authentication, not a required login"
- "per-property access constraints (READ_WRITE vs READ_ONLY) only documented for image.brightness/gamma/saturation/contrast/sharpness; full access table not in source. Firmware version compatibility ranges not stated. Image color properties (REC709, REC2020, etc.) and full signal metadata schemas (color_space, chroma_sampling enum values) only partially enumerated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
