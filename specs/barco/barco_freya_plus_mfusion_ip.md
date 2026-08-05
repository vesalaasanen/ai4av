---
spec_id: admin/barco-freya-plus-mfusion
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Freya Plus Mfusion Control Spec"
manufacturer: Barco
model_family: "Barco Freya Plus Mfusion"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Freya Plus Mfusion"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T06:15:57.598Z
last_checked_at: 2026-08-05T08:03:24.094Z
generated_at: 2026-08-05T08:03:24.094Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full list of supported models / firmware versions not stated in source; some APIs are dynamic and may differ per configuration."
  - "source notes that powering on/off a transitioning projector is a no-op and recommends pre-checking system.state, but does not document additional safety interlocks, lockouts, or warning procedures."
  - "precise firmware version compatibility range for Pulse API; whether all listed properties/methods are present on Freya Plus Mfusion or only on referenced Pulse projector models; full enumeration of dynamic sub-objects (e.g. complete source names, DMX channel counts/modes)."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:03:24.094Z
  matched_actions: 91
  action_count: 91
  confidence: medium
  summary: "All 91 spec action-units are wired to JSON-RPC methods/property paths/HTTP endpoints/serial commands documented verbatim in the source; transport values (port 9090, 19200 8N1) verified. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-04
---

# Barco Freya Plus Mfusion Control Spec

## Summary
Network and serial control spec for the Barco Freya Plus Mfusion projector, covering the Pulse JSON-RPC API over TCP/IP (port 9090) and RS-232 (19200 8N1). Includes authentication, power, source selection, illumination, picture settings, warp/blend/blacklevel file upload, and environmental introspection.

<!-- UNRESOLVED: full list of supported models / firmware versions not stated in source; some APIs are dynamic and may differ per configuration. -->

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
  type: passcode  # authenticate method with code param; not required for normal end-user access
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": { "id": 1, "code": 98765 }}'
  params:
    - name: code
      type: integer
      description: Secret pass code; sets the user access level. Skippable for normal end-user access.

- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron", "params": { "id": 3, "property": "system.state" }}'
  params: []

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff", "params": { "id": 4, "property": "system.state" }}'
  params: []

- id: system_state_get
  label: Get System State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "id": 1, "property": "system.state" }}'
  params: []

- id: system_state_subscribe
  label: Subscribe to System State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "id": 2, "property": "system.state" }}'
  params: []

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "id": 0, "property": "image.window.main.source" }}'
  params: []

- id: list_available_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "params": { "id": 1 }}'
  params: []

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.source", "value": "{source}" }}'
  params:
    - name: source
      type: string
      description: Source name returned by image.source.list (e.g. "DisplayPort 1", "HDMI", "HDBaseT", "SDI", "DVI 1", "DVI 2", "Dual DVI", "Dual DisplayPort", "Dual Head DVI", "Dual Head DisplayPort").

- id: list_connectors
  label: List Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "params": { "id": 3 }}'
  params: []

- id: list_source_connectors
  label: List Source Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{source}.listconnectors", "params": { "id": 4 }}'
  params:
    - name: source
      type: string
      description: Source object name (e.g. displayport1) derived by lowercasing the source name and stripping non-word characters.

- id: get_connector_signal
  label: Get Connector Detected Signal
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "id": 5, "property": "image.connector.{connector}.detectedsignal" }}'
  params:
    - name: connector
      type: string
      description: Connector object name (e.g. l1hdmi, displayport1).

- id: subscribe_source_property
  label: Subscribe to Window Source Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "id": 6, "property": "image.window.main.source" }}'
  params: []

- id: subscribe_connector_signal
  label: Subscribe to Connector Detected Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.connector.{connector}.detectedsignal" }}'
  params:
    - name: connector
      type: string
      description: Connector object name (e.g. l1hdmi).

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "id": 0, "property": "illumination.state" }}'
  params: []

- id: subscribe_illumination_state
  label: Subscribe to Illumination State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "id": 1, "property": "illumination.state" }}'
  params: []

- id: introspect_illumination_sources
  label: Introspect Illumination Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "property": "illumination.sources", "recursive": false }}'
  params: []

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "id": 3, "property": "illumination.sources.laser.power" }}'
  params: []

- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "id": 5, "property": "illumination.sources.laser.power", "value": {level} }}'
  params:
    - name: level
      type: integer
      description: Target power in percent (within minpower/maxpower range).

- id: subscribe_laser_power
  label: Subscribe to Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "id": 4, "property": "illumination.sources.laser.power" }}'
  params: []

- id: get_laser_minpower
  label: Get Laser Min Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "id": 6, "property": "illumination.sources.laser.minpower" }}'
  params: []

- id: get_laser_maxpower
  label: Get Laser Max Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "id": 5, "property": "illumination.sources.laser.maxpower" }}'
  params: []

- id: get_brightness
  label: Get Brightness
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "id": 7, "property": "image.brightness" }}'
  params: []

- id: set_brightness
  label: Set Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "id": 9, "property": "image.brightness", "value": {value} }}'
  params:
    - name: value
      type: float
      description: Normalized brightness offset. 0 is default, 1 is 100% offset. Range -1..1, step 0.01.

- id: subscribe_brightness
  label: Subscribe to Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "id": 8, "property": "image.brightness" }}'
  params: []

- id: set_contrast
  label: Set Contrast
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.contrast", "value": {value} }}'
  params:
    - name: value
      type: float
      description: Normalized contrast. 1 is default. Range 0..2, step 0.01.

- id: set_gamma
  label: Set Gamma
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.gamma", "value": {value} }}'
  params:
    - name: value
      type: float
      description: Gamma value. Default 2.2. Range 1..3, step 0.1.

- id: set_saturation
  label: Set Saturation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.saturation", "value": {value} }}'
  params:
    - name: value
      type: float
      description: Normalized saturation. 1 is default. Range 0..2, step 0.01.

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.sharpness", "value": {value} }}'
  params:
    - name: value
      type: integer
      description: Normalized sharpness. Range -2..8, step 1.

- id: set_orientation
  label: Set Orientation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.orientation", "value": "{orientation}" }}'
  params:
    - name: orientation
      type: enum
      values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: set_window_position
  label: Set Window Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.position", "value": { "x": {x}, "y": {y} } }}'
  params:
    - name: x
      type: integer
    - name: y
      type: integer

- id: set_window_size
  label: Set Window Size
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.size", "value": { "width": {width}, "height": {height} } }}'
  params:
    - name: width
      type: integer
    - name: height
      type: integer

- id: set_scaling_mode
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.scalingmode", "value": "{mode}" }}'
  params:
    - name: mode
      type: enum
      values: [Fill, OneToOne, FillScreen, Stretch]

- id: introspect_image
  label: Introspect Image Service
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "image", "recursive": false }}'
  params: []

- id: set_warp_enable
  label: Enable Warp Globally
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "id": 10, "property": "image.processing.warp.enable", "value": true }}'
  params: []

- id: upload_warp_file
  label: Upload Warp File
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address (e.g. 192.168.1.100).

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "id": 11, "property": "image.processing.warp.file.selected", "value": "{filename}" }}'
  params:
    - name: filename
      type: string

- id: enable_warp_file
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "id": 12, "property": "image.processing.warp.file.enable", "value": true }}'
  params: []

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address.

- id: select_blend_file
  label: Select Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "id": 13, "property": "image.processing.blend.file.selected", "value": "{filename}" }}'
  params:
    - name: filename
      type: string

- id: enable_blend_file
  label: Enable File Blend
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "id": 14, "property": "image.processing.blend.file.enable", "value": true }}'
  params: []

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address.

- id: select_blacklevel_file
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "id": 15, "property": "image.processing.blacklevel.file.selected", "value": "{filename}" }}'
  params:
    - name: filename
      type: string

- id: enable_blacklevel_file
  label: Enable File Black Level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "id": 16, "property": "image.processing.blacklevel.file.enable", "value": true }}'
  params: []

- id: get_environment_temperatures
  label: Get Temperature Sensors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "id": 18, "type": "Sensor", "valuetype": "Temperature" }}'
  params: []

- id: get_environment_fan_speeds
  label: Get Fan Speeds
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "id": 19, "type": "Sensor", "valuetype": "Speed" }}'
  params: []

- id: get_environment_controlblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "{type}", "valuetype": "{valuetype}" }}'
  params:
    - name: type
      type: enum
      values: [Sensor, Filter, Controller, Actuator, Alarm, GenericBlock]
    - name: valuetype
      type: enum
      values: [Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any]

- id: get_environment_alarm_info
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo", "params": {} }'
  params: []

- id: get_environment_alarm_state
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "environment.alarmstate" }}'
  params: []

- id: set_standby_enable
  label: Set Standby Enable
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.standby.enable", "value": {value} }}'
  params:
    - name: value
      type: boolean

- id: set_eco_enable
  label: Set ECO Enable
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.eco.enable", "value": {value} }}'
  params:
    - name: value
      type: boolean

- id: wake_from_eco_serial
  label: Wake From ECO via Serial
  kind: action
  command: ':POWR1\r'
  params: []

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.shutter.target", "value": "{target}" }}'
  params:
    - name: target
      type: enum
      values: [Open, Closed]

- id: get_shutter_position
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.shutter.position" }}'
  params: []

- id: set_optics_zoom
  label: Set Zoom Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.zoom.position", "value": {position} }}'
  params:
    - name: position
      type: integer

- id: set_optics_focus
  label: Set Focus Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.focus.position", "value": {position} }}'
  params:
    - name: position
      type: integer

- id: set_optics_lensshift_horizontal
  label: Set Lens Shift Horizontal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.lensshift.horizontal.position", "value": {position} }}'
  params:
    - name: position
      type: integer

- id: set_optics_lensshift_vertical
  label: Set Lens Shift Vertical
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.lensshift.vertical.position", "value": {position} }}'
  params:
    - name: position
      type: integer

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.mode", "value": "{mode}" }}'
  params:
    - name: mode
      type: string

- id: set_dmx_start_channel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.startchannel", "value": {channel} }}'
  params:
    - name: channel
      type: integer
      description: DMX start channel 1..512.

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.shutdown", "value": {value} }}'
  params:
    - name: value
      type: boolean

- id: list_dmx_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels", "params": {} }'
  params: []

- id: list_dmx_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes", "params": {} }'
  params: []

- id: get_lan_ipv4_config
  label: Get LAN IPv4 Config
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.ip4config" }}'
  params: []

- id: get_lan_state
  label: Get LAN State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.state" }}'
  params: []

- id: set_lan_ipv4_config
  label: Set LAN IPv4 Config
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "network.device.lan.ip4config", "value": { "Address": "{address}", "Mask": "{mask}", "Gateway": "{gateway}", "NameServers": "{nameservers}" } }}'
  params:
    - name: address
      type: string
    - name: mask
      type: string
    - name: gateway
      type: string
    - name: nameServers
      type: string

- id: introspect_recursive
  label: Introspect Recursive (object form)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "{object}", "recursive": true, "id": 1 }}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty introspects everything.

- id: introspect_recursive_positional
  label: Introspect Recursive (positional form)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": ["{object}", true], "id": 1}'
  params:
    - name: object
      type: string

- id: introspect_nonrecursive
  label: Introspect Non-Recursive (object form)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "{object}", "recursive": false, "id": 2 }}'
  params:
    - name: object
      type: string

- id: introspect_nonrecursive_positional
  label: Introspect Non-Recursive (positional form)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": ["{object}", false], "id": 2}'
  params:
    - name: object
      type: string

- id: subscribe_modelupdated
  label: Subscribe to Model Updated Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "id": 2, "signal": "modelupdated" }}'
  params: []

- id: ledctrl_blink
  label: Blink System Status LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "id": 3, "led": "systemstatus", "color": "{color}", "period": {period} }}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. systemstatus).
    - name: color
      type: string
      description: Color name (e.g. red).
    - name: period
      type: integer
      description: Blink period.

- id: property_get
  label: Generic Property Get
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "id": {id}, "property": "{property}" }}'
  params:
    - name: property
      type: string
    - name: id
      type: integer
      description: Request identifier.

- id: property_set
  label: Generic Property Set
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "id": {id}, "property": "{property}", "value": {value} }}'
  params:
    - name: property
      type: string
    - name: value
      description: Value to set; type per property.
    - name: id
      type: integer

- id: property_get_multiple
  label: Property Get Multiple
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "id": 5, "property": ["{p1}", "{p2}"] }}'
  params:
    - name: properties
      type: string
      description: Array of property names.

- id: property_subscribe
  label: Generic Property Subscribe
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "id": {id}, "property": "{property}" }}'
  params:
    - name: property
      type: string
    - name: id
      type: integer

- id: property_subscribe_multiple
  label: Property Subscribe Multiple
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "id": 7, "property": ["{p1}", "{p2}"] }}'
  params:
    - name: properties
      type: string

- id: property_unsubscribe
  label: Generic Property Unsubscribe
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "id": 8, "property": "{property}" }}'
  params:
    - name: property
      type: string

- id: property_unsubscribe_multiple
  label: Property Unsubscribe Multiple
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "id": 9, "property": ["{p1}", "{p2}"] }}'
  params:
    - name: properties
      type: string

- id: signal_subscribe
  label: Signal Subscribe
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "id": 10, "signal": "{signal}" }}'
  params:
    - name: signal
      type: string

- id: signal_subscribe_multiple
  label: Signal Subscribe Multiple
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "id": 11, "signal": ["{s1}", "{s2}"] }}'
  params:
    - name: signals
      type: string

- id: signal_unsubscribe
  label: Signal Unsubscribe
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "id": 12, "signal": "{signal}" }}'
  params:
    - name: signal
      type: string

- id: signal_unsubscribe_multiple
  label: Signal Unsubscribe Multiple
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "id": 13, "signal": ["{s1}", "{s2}"] }}'
  params:
    - name: signals
      type: string

- id: firmware_list_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents", "params": {} }'
  params: []

- id: firmware_list_component_version_status
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus", "params": {} }'
  params: []

- id: firmware_schedule_component_upgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade", "params": { "component": "{component}" }}'
  params:
    - name: component
      type: string

- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage", "params": {} }'
  params: []

- id: illumination_laser_get_serial_number
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber", "params": {} }'
  params: []

- id: p7_copy_preset_to_custom
  label: P7 Copy Preset to Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "{presetname}" }}'
  params:
    - name: presetname
      type: string

- id: p7_reset_preset
  label: P7 Reset Preset to Defaults
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "{presetname}" }}'
  params:
    - name: presetname
      type: string

- id: p7_reset_to_native
  label: P7 Reset to Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative", "params": {} }'
  params: []

- id: rgb_next_mode
  label: Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode", "params": {} }'
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

- id: environment_alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: shutter_position
  type: enum
  values: [Open, Closed]

- id: shutter_target
  type: enum
  values: [Open, Closed]

- id: scaling_mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: connector_detected_signal
  type: object
  description: Reported via image.connector.{name}.detectedsignal; fields include active, name, vertical_total, horizontal_total, vertical_resolution, horizontal_resolution, vertical_sync_width, vertical_front_porch, vertical_back_porch, horizontal_sync_width, horizontal_front_porch, horizontal_back_porch, horizontal_frequency, vertical_frequency, pixel_rate, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode.

- id: scanner_scan
  type: enum
  values: [Progressive]

- id: signal_range
  type: enum
  values: ["0-255", "16-235"]

- id: chroma_sampling
  type: enum
  values: ["4:4:4", "4:2:2", "4:2:0"]

- id: gamma_type
  type: enum
  values: [POWER, sRGB, REC_BT1886, SMPTE_ST2084]

- id: color_primaries
  type: enum
  values: [REC709, REC2020, DCI-P3-D65, DCI-P3-Theater]

- id: content_aspect_ratio
  type: enum
  values: ["5:4", "4:3", "16:10", "16:9", "1.85:1", "2.20:1", "2.35:1", "2.37:1", "2.39:1", Unknown]

- id: stereo_mode
  type: enum
  values: [None, Sequential, FramePacked, TopBottom, SideBySide]

- id: firmware_status
  type: enum
  values: [Unknown, OK, Upgradable]
```

## Variables
```yaml
- id: image_brightness
  type: float
  range: [-1.0, 1.0]
  default: 0.0
  description: Image brightness/offset. 0 is default, 1 is 100% offset.

- id: image_contrast
  type: float
  range: [0.0, 2.0]
  default: 1.0
  description: Image contrast/gain. 1 is default.

- id: image_gamma
  type: float
  range: [1.0, 3.0]
  default: 2.2
  description: Image gamma.

- id: image_saturation
  type: float
  range: [0.0, 2.0]
  default: 1.0
  description: Image color saturation.

- id: image_sharpness
  type: integer
  range: [-2, 8]
  description: Image sharpness.

- id: illumination_laser_power
  type: integer
  unit: percent
  description: Target laser illumination power. Dynamic min/max available via minpower/maxpower.

- id: illumination_laser_minpower
  type: integer
  unit: percent
  read_only: true

- id: illumination_laser_maxpower
  type: integer
  unit: percent
  read_only: true

- id: optics_zoom_position
  type: integer

- id: optics_focus_position
  type: integer

- id: optics_lensshift_horizontal_position
  type: integer

- id: optics_lensshift_vertical_position
  type: integer

- id: window_position
  type: object
  fields:
    - name: x
      type: integer
    - name: y
      type: integer

- id: window_size
  type: object
  fields:
    - name: width
      type: integer
    - name: height
      type: integer

- id: dmx_start_channel
  type: integer
  range: [1, 512]

- id: dmx_shutdown
  type: boolean

- id: dmx_mode
  type: string

- id: standby_enable
  type: boolean

- id: eco_enable
  type: boolean

- id: lan_ipv4_config
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
- id: property_changed
  description: Notification emitted by the device when a subscribed property value changes. Carries an array of property/value pairs under method property.changed. Must be implemented client-side.

- id: signal_callback
  description: Notification emitted when a subscribed signal fires. Carries an array of signal/argument-list pairs under method signal.callback. Must be implemented client-side.

- id: modelupdated
  description: Signal triggered when the object structure changes (objects added or removed). Subscribe via signal.subscribe with signal "modelupdated".

- id: introspect_objectchanged
  description: Signal payload format for object structure changes: { "object": "<name>", "isnew": <bool> }.
```

## Macros
```yaml
- id: power_on_with_state_check
  description: Verify projector state is standby or ready before issuing power on.
  steps:
    - property.get system.state
    - if state in {standby, ready}: system.poweron

- id: power_off_with_state_check
  description: Verify projector state is on before issuing power off.
  steps:
    - property.get system.state
    - if state == on: system.poweroff

- id: warp_full_workflow
  description: Enable warp, upload warp grid, select file, enable file warp.
  steps:
    - property.set image.processing.warp.enable = true
    - curl -X POST -F file=@warp.xml http://<host>/api/image/processing/warp/file/transfer
    - property.set image.processing.warp.file.selected = 
    - property.set image.processing.warp.file.enable = true

- id: blend_workflow
  description: Upload blend mask, select file, enable blend.
  steps:
    - curl -X POST -F file=@mask.png http://<host>/api/image/processing/blend/file/transfer
    - property.set image.processing.blend.file.selected = 
    - property.set image.processing.blend.file.enable = true

- id: blacklevel_workflow
  description: Upload black level mask, select file, enable black level.
  steps:
    - curl -X POST -F file=@blacklevel.png http://<host>/api/image/processing/blacklevel/file/transfer
    - property.set image.processing.blacklevel.file.selected = 
    - property.set image.processing.blacklevel.file.enable = true

- id: wake_from_eco
  description: Wake a projector from ECO mode.
  steps:
    - one of: send wake-on-LAN (HW/MAC address); press power button on remote; press power button on keypad; send :POWR1\r on RS-232 serial port.
```

## Safety
```yaml
confirmation_required_for:
  - system.poweroff
  - firmware.schedulecomponentupgrade
interlocks: []
<!-- UNRESOLVED: source notes that powering on/off a transitioning projector is a no-op and recommends pre-checking system.state, but does not document additional safety interlocks, lockouts, or warning procedures. -->
```

## Notes
The protocol is JSON-RPC 2.0 over TCP/9090 (and RS-232 at 19200 8N1). The same commands are valid on both transports. Parameters may be passed by name; order is not significant. After `property.set`, wait for confirmation before issuing the same set again to avoid flooding the server. The API is partially dynamic and depends on the projector model, mounted peripherals (e.g. motorized lens), and configuration (e.g. DMX mode). Use `introspect` to discover the exact API of your device. ECO-mode wake-up requires one of: wake-on-LAN, remote power button, keypad power button, or sending `:POWR1\r` on the serial port. Authentication is optional for normal end-user access; supply a pass code only when a higher access level is required.

The supported blend mask resolutions are: WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540. The supported black level mask resolutions match the blend layer: WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540. Mask file formats: PNG (up to 16-bit), JPEG, TIFF. Only the blue channel is used for color images.

<!-- UNRESOLVED: precise firmware version compatibility range for Pulse API; whether all listed properties/methods are present on Freya Plus Mfusion or only on referenced Pulse projector models; full enumeration of dynamic sub-objects (e.g. complete source names, DMX channel counts/modes). -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T06:15:57.598Z
last_checked_at: 2026-08-05T08:03:24.094Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:03:24.094Z
matched_actions: 91
action_count: 91
confidence: medium
summary: "All 91 spec action-units are wired to JSON-RPC methods/property paths/HTTP endpoints/serial commands documented verbatim in the source; transport values (port 9090, 19200 8N1) verified. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full list of supported models / firmware versions not stated in source; some APIs are dynamic and may differ per configuration."
- "source notes that powering on/off a transitioning projector is a no-op and recommends pre-checking system.state, but does not document additional safety interlocks, lockouts, or warning procedures."
- "precise firmware version compatibility range for Pulse API; whether all listed properties/methods are present on Freya Plus Mfusion or only on referenced Pulse projector models; full enumeration of dynamic sub-objects (e.g. complete source names, DMX channel counts/modes)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
