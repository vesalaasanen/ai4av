---
spec_id: admin/barco-hdx-dust-filter-package
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Hdx Dust Filter Package Control Spec"
manufacturer: Barco
model_family: "Barco Hdx Dust Filter Package"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Hdx Dust Filter Package"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-07T06:21:09.328Z
last_checked_at: 2026-10-01T12:41:04.779Z
generated_at: 2026-10-01T12:41:04.779Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document does not name the specific Hdx Dust Filter Package model variant; commands listed here reflect the generic Barco Pulse API surface documented in the source."
  - "source contains no explicit safety warnings, high-voltage interlocks, or"
  - "source does not specify dust-filter-specific commands or properties for the \"Hdx Dust Filter Package\" model. This spec captures the generic Barco Pulse API surface; dust-filter-specific behavior (e.g. filter runtime, replacement alerts) must be discovered via introspection."
verification:
  verdict: verified
  checked_at: 2026-10-01T12:41:04.779Z
  matched_actions: 72
  action_count: 72
  confidence: medium
  summary: "All 72 spec actions and transport values are present verbatim in the Pulse API source; coverage is essentially complete. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-07
---

# Barco Hdx Dust Filter Package Control Spec

## Summary
This spec covers the Barco Hdx Dust Filter Package control surface via the Barco Pulse API, exposed as JSON-RPC 2.0 over TCP (port 9090) and as a serial (RS-232) command set on the projector. The same commands are available on both transports. Authentication is optional and only required when elevated access is needed.

<!-- UNRESOLVED: source document does not name the specific Hdx Dust Filter Package model variant; commands listed here reflect the generic Barco Pulse API surface documented in the source. -->

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
  type: optional  # source states: authentication only necessary when higher access than normal end user is required
```

## Traits
```yaml
- powerable       # system.poweron / system.poweroff present
- routable        # image.window.main.source, image.source.list, image.connector.list present
- queryable       # property.get / system.state / illumination.state queries present
- levelable       # illumination.sources.laser.power (RW float) present
```

## Actions
```yaml
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": { "code": 98765 }, "id": 1}'
  params:
    - name: code
      type: integer
      description: Secret pass code for elevated access (example: 98765)

- id: ledctrl_blink
  label: LED Blink
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "led": "systemstatus", "color": "red", "period": 42 }, "id": 3}'
  params:
    - name: led
      type: string
      description: LED name (e.g. systemstatus)
    - name: color
      type: string
      description: LED color (e.g. red)
    - name: period
      type: integer
      description: Blink period

- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron", "id": 3}'
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff", "id": 4}'
  params: []

- id: get_system_state
  label: Get System State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "system.state" }, "id": 1}'
  params: []

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.source", "value": "DisplayPort 1" }, "id": 2}'
  params:
    - name: value
      type: string
      description: Source name (e.g. "DisplayPort 1", "HDMI", "DVI 1", "DVI 2", "DisplayPort 2", "Dual DVI", "Dual DisplayPort", "Dual Head DVI", "Dual Head DisplayPort", "HDBaseT", "SDI")

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.window.main.source" }, "id": 0}'
  params: []

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "id": 1}'
  params: []

- id: image_connector_list
  label: List Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "id": 3}'
  params: []

- id: image_source_listconnectors
  label: List Connectors Used By Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{sourcename}.listconnectors", "id": 4}'
  params:
    - name: sourcename
      type: string
      description: Source object name (lowercase, no whitespace; e.g. "displayport1", "hdmi", "hdbaset")

- id: get_connector_signal
  label: Get Connector Detected Signal
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.connector.{connectorname}.detectedsignal" }, "id": 5}'
  params:
    - name: connectorname
      type: string
      description: Connector object name (lowercase, no whitespace; e.g. "displayport1")

- id: subscribe_property
  label: Subscribe To Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.brightness" }, "id": 6}'
  params:
    - name: property
      type: string
      description: Property name (string or array of strings)

- id: get_property
  label: Get Property
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "objectname.propertyname" }, "id": 4}'
  params:
    - name: property
      type: string
      description: Property name

- id: get_properties_multi
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": ["image.brightness","image.contrast"] }, "id": 5}'
  params:
    - name: property
      type: array
      description: Array of property names

- id: set_property
  label: Set Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "objectname.propertyname", "value": 100 }, "id": 3}'
  params:
    - name: property
      type: string
      description: Property name
    - name: value
      type: string
      description: Value to set

- id: unsubscribe_property
  label: Unsubscribe From Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": "image.brightness" }, "id": 8}'
  params:
    - name: property
      type: string
      description: Property name or array of names

- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "modelupdated" }, "id": 10}'
  params:
    - name: signal
      type: string
      description: Signal name or array

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": "modelupdated" }, "id": 12}'
  params:
    - name: signal
      type: string
      description: Signal name or array

- id: introspect
  label: Introspect Object
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": [ "foo", true ], "id": 1}'
  params:
    - name: object
      type: string
      description: Object name (dot notation allowed; default empty = all)
    - name: recursive
      type: boolean
      description: If false, only one level of children listed

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.state" }, "id": 0}'
  params: []

- id: subscribe_illumination_state
  label: Subscribe Illumination State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "illumination.state" }, "id": 1}'
  params: []

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.power" }, "id": 3}'
  params: []

- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "illumination.sources.laser.power", "value": 40 }, "id": 5}'
  params:
    - name: value
      type: integer
      description: Target laser power in percent

- id: subscribe_laser_power
  label: Subscribe Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": ["illumination.sources.laser.power"] }, "id": 4}'
  params: []

- id: get_laser_minpower
  label: Get Laser Min Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.minpower" }, "id": 6}'
  params: []

- id: get_laser_maxpower
  label: Get Laser Max Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.maxpower" }, "id": 5}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage", "id": <n>}'
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber", "id": <n>}'
  params: []

- id: set_brightness
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.brightness", "value": 0.15 }, "id": 9}'
  params:
    - name: value
      type: number
      description: Normalized brightness, -1..1, default 0

- id: set_contrast
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.contrast", "value": 1 }, "id": <n>}'
  params:
    - name: value
      type: number
      description: Normalized contrast, 0..2, default 1

- id: set_gamma
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.gamma", "value": 2.2 }, "id": <n>}'
  params:
    - name: value
      type: number
      description: Gamma, 1..3, default 2.2

- id: set_saturation
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.saturation", "value": 1 }, "id": <n>}'
  params:
    - name: value
      type: number
      description: Normalized saturation, 0..2, default 1

- id: set_sharpness
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.sharpness", "value": 0 }, "id": <n>}'
  params:
    - name: value
      type: integer
      description: Normalized sharpness, -2..8

- id: set_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.orientation", "value": "DESKTOP_FRONT" }, "id": <n>}'
  params:
    - name: value
      type: string
      description: One of DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR

- id: set_window_scalingmode
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.scalingmode", "value": "Fill" }, "id": <n>}'
  params:
    - name: value
      type: string
      description: One of Fill, OneToOne, FillScreen, Stretch

- id: set_window_position
  label: Set Window Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.position", "value": {"x":0,"y":0} }, "id": <n>}'
  params:
    - name: value
      type: object
      description: Object with x (int) and y (int)

- id: set_window_size
  label: Set Window Size
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.size", "value": {"width":1920,"height":1200} }, "id": <n>}'
  params:
    - name: value
      type: object
      description: Object with width (int) and height (int)

- id: warp_enable
  label: Enable Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.enable", "value": true }, "id": 10}'
  params:
    - name: value
      type: boolean
      description: true to enable warp globally

- id: warp_file_upload
  label: Upload Warp File
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string
      description: Projector address (e.g. 192.168.1.100)

- id: warp_file_select
  label: Select Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.selected", "value": "warp.xml" }, "id": 11}'
  params:
    - name: value
      type: string
      description: Warp filename

- id: warp_file_enable
  label: Enable Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.enable", "value": true }, "id": 12}'
  params:
    - name: value
      type: boolean
      description: true to enable file warp

- id: blend_file_upload
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: host
      type: string
      description: Projector address

- id: blend_file_select
  label: Select Blend Files
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.selected", "value": ["mask.png"] }, "id": 13}'
  params:
    - name: value
      type: array
      description: Array of blend filenames

- id: blend_file_enable
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.enable", "value": true }, "id": 14}'
  params:
    - name: value
      type: boolean
      description: true to enable blend

- id: blacklevel_file_upload
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: host
      type: string
      description: Projector address

- id: blacklevel_file_select
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.selected", "value": "blacklevel.png" }, "id": 15}'
  params:
    - name: value
      type: string
      description: Black level mask filename

- id: blacklevel_file_enable
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.enable", "value": true }, "id": 16}'
  params:
    - name: value
      type: boolean
      description: true to enable black level correction

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.shutter.target", "value": "Open" }, "id": <n>}'
  params:
    - name: value
      type: string
      description: Open or Closed

- id: set_zoom_position
  label: Set Zoom Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.zoom.position", "value": 0 }, "id": <n>}'
  params:
    - name: value
      type: integer
      description: Zoom position (motorized lens only)

- id: set_focus_position
  label: Set Focus Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.focus.position", "value": 0 }, "id": <n>}'
  params:
    - name: value
      type: integer
      description: Focus position (motorized lens only)

- id: set_lensshift_h
  label: Set Lensshift Horizontal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.lensshift.horizontal.position", "value": 0 }, "id": <n>}'
  params:
    - name: value
      type: integer
      description: Horizontal lensshift position

- id: set_lensshift_v
  label: Set Lensshift Vertical
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.lensshift.vertical.position", "value": 0 }, "id": <n>}'
  params:
    - name: value
      type: integer
      description: Vertical lensshift position

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.mode", "value": "<mode>" }, "id": <n>}'
  params:
    - name: value
      type: string
      description: DMX mode (use dmx.listmodes to enumerate)

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.startchannel", "value": 1 }, "id": <n>}'
  params:
    - name: value
      type: integer
      description: DMX start channel 1..512

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.shutdown", "value": true }, "id": <n>}'
  params:
    - name: value
      type: boolean
      description: DMX shutdown enabled

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels", "id": <n>}'
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes", "id": <n>}'
  params: []

- id: get_network_ipv4config
  label: Get Network IPv4 Config
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.ip4config" }, "id": <n>}'
  params: []

- id: get_network_state
  label: Get Network LAN State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.state" }, "id": <n>}'
  params: []

- id: set_standby_enable
  label: Enable Standby State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.standby.enable", "value": true }, "id": <n>}'
  params:
    - name: value
      type: boolean
      description: true to allow standby state

- id: set_eco_enable
  label: Enable ECO State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.eco.enable", "value": true }, "id": <n>}'
  params:
    - name: value
      type: boolean
      description: true to allow ECO state

- id: get_alarmstate
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "environment.alarmstate" }, "id": <n>}'
  params: []

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "Sensor", "valuetype": "Temperature" }, "id": 18}'
  params:
    - name: type
      type: string
      description: Sensor, Filter, Controller, Actuator, Alarm, or GenericBlock
    - name: valuetype
      type: string
      description: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, or Any

- id: environment_getalarminfo
  label: Get Environment Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo", "id": <n>}'
  params: []

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents", "id": <n>}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus", "id": <n>}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade", "id": <n>}'
  params: []

- id: color_p7_custom_copypresettocustom
  label: Color P7 Custom: Copy Preset To Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "<name>" }, "id": <n>}'
  params:
    - name: presetname
      type: string
      description: Preset name to copy from

- id: color_p7_custom_resetpreset
  label: Color P7 Custom: Reset Preset
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "<name>" }, "id": <n>}'
  params:
    - name: presetname
      type: string
      description: Preset name to reset

- id: color_p7_custom_resettonative
  label: Color P7 Custom: Reset To Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative", "id": <n>}'
  params: []

- id: rgbmode_nextrgbmode
  label: Cycle Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode", "id": <n>}'
  params: []

- id: serial_wake_on_eco
  label: Serial Wake From ECO
  kind: action
  command: ':POWR1\r'
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

- id: network_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: optics_shutter_position
  type: enum
  values: [Open, Closed]

- id: optics_shutter_target
  type: enum
  values: [Open, Closed]

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: window_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: property_changed_notification
  type: object
  description: Server-pushed property.changed notification with array of property/value pairs

- id: signal_callback_notification
  type: object
  description: Server-pushed signal.callback notification with array of signal/argument-list pairs

- id: modelupdated_signal
  type: object
  description: Triggered when the object structure changes (objects added or removed)
```

## Variables
```yaml
# One entry per settable parameter that is not a discrete action.
- name: image_brightness
  property: image.brightness
  type: float
  range: [-1, 1]
  default: 0
  access: RW
- name: image_contrast
  property: image.contrast
  type: float
  range: [0, 2]
  default: 1
  access: RW
- name: image_gamma
  property: image.gamma
  type: float
  range: [1, 3]
  default: 2.2
  access: RW
- name: image_saturation
  property: image.saturation
  type: float
  range: [0, 2]
  default: 1
  access: RW
- name: image_sharpness
  property: image.sharpness
  type: integer
  range: [-2, 8]
  access: RW
- name: illumination_laser_power
  property: illumination.sources.laser.power
  type: float
  description: Target laser power in percent (RW; min/max are dynamic, introspect via illumination.sources.laser.minpower / .maxpower)
- name: window_position
  property: image.window.main.position
  type: object
  fields: { x: int, y: int }
- name: window_size
  property: image.window.main.size
  type: object
  fields: { width: int, height: int }
- name: dmx_mode
  property: dmx.mode
  type: string
- name: dmx_startchannel
  property: dmx.startchannel
  type: integer
  range: [1, 512]
- name: dmx_shutdown
  property: dmx.shutdown
  type: boolean
- name: network_ipv4config
  property: network.device.lan.ip4config
  type: object
  fields: { Address: string, Mask: string, Gateway: string, NameServers: string }
- name: system_standby_enable
  property: system.standby.enable
  type: boolean
- name: system_eco_enable
  property: system.eco.enable
  type: boolean
```

## Events
```yaml
# Unsolicited notifications the device sends.
- id: property_changed
  description: Sent when a subscribed property value changes; payload uses method "property.changed" with array of property/value pairs
- id: signal_callback
  description: Sent when a subscribed signal is emitted; payload uses method "signal.callback" with array of signal/argument-list pairs
- id: introspect_objectchanged
  description: Sent via signal.callback on modelupdated with object and isnew (bool) arguments
```

## Macros
```yaml
# Multi-step sequences described explicitly in source.
- id: wake_from_eco_via_serial
  steps:
    - "Send ':POWR1\\r' on the RS-232 serial port"
  notes: Other wake paths: Wake-on-LAN with HW (MAC) address, remote control power button, keypad power button

- id: enable_warp_file
  steps:
    - action: warp_file_upload
    - action: warp_file_select
    - action: warp_file_enable

- id: enable_blend_mask
  steps:
    - action: blend_file_upload
    - action: blend_file_select
    - action: blend_file_enable

- id: enable_blacklevel_mask
  steps:
    - action: blacklevel_file_upload
    - action: blacklevel_file_select
    - action: blacklevel_file_enable
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source advises verifying system.state is "on" before issuing system.poweroff
  - power_on   # source advises verifying state is "standby" or "ready" before issuing system.poweron
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, high-voltage interlocks, or
# power-on sequencing requirements beyond the read-before-write state check above.
```

## Notes
- Source: Barco Pulse API (RS232 and Network Command Catalog). All commands in the source are JSON-RPC 2.0; the same command surface is reachable over TCP (port 9090) and RS-232.
- JSON-RPC parameter objects use string keys; order of keys does not matter — both request shapes parse identically.
- Best practice per source: wait for property.set confirmation before issuing another property.set on the same property.
- Authentication is optional and only required when elevated access is needed; normal end-user access skips authentication. Example code shown in source is 98765.
- API surface is dynamic — some objects, properties, signals, and methods (e.g. motorized zoom/focus, DMX extended mode) only appear when the projector is configured with the relevant peripherals. Use the introspect method to enumerate the live API.
- ECO-mode projectors require special wake handling (Wake-on-LAN, remote, keypad, or serial `:POWR1\r`); the JSON-RPC system.poweron alone may not wake a projector in ECO.
- Notifications have no `id` and require no response.

<!-- UNRESOLVED: source does not specify dust-filter-specific commands or properties for the "Hdx Dust Filter Package" model. This spec captures the generic Barco Pulse API surface; dust-filter-specific behavior (e.g. filter runtime, replacement alerts) must be discovered via introspection. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-07T06:21:09.328Z
last_checked_at: 2026-10-01T12:41:04.779Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T12:41:04.779Z
matched_actions: 72
action_count: 72
confidence: medium
summary: "All 72 spec actions and transport values are present verbatim in the Pulse API source; coverage is essentially complete. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document does not name the specific Hdx Dust Filter Package model variant; commands listed here reflect the generic Barco Pulse API surface documented in the source."
- "source contains no explicit safety warnings, high-voltage interlocks, or"
- "source does not specify dust-filter-specific commands or properties for the \"Hdx Dust Filter Package\" model. This spec captures the generic Barco Pulse API surface; dust-filter-specific behavior (e.g. filter runtime, replacement alerts) must be discovered via introspection."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
