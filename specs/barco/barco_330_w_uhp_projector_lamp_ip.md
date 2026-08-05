---
spec_id: admin/barco-330-w-uhp-projector-lamp
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco 330 W UHP Projector Lamp Control Spec"
manufacturer: Barco
model_family: "Barco 330 W UHP Projector Lamp"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco 330 W UHP Projector Lamp"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:36:48.166Z
last_checked_at: 2026-07-21T20:40:34.181Z
generated_at: 2026-07-21T20:40:34.181Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact firmware version range not stated; API documentation states parts of the API are dynamic and depend on peripherals/configuration."
  - "no additional safety warnings or fault recovery procedures documented in source."
  - "firmware version compatibility range not stated in source."
  - "HTTP port for file endpoints (other than 80 default in examples) not stated."
  - "power consumption, voltage, current specifications not stated."
  - "detailed fault/error recovery sequences not stated beyond alarmstate enum."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:40:34.181Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "All 45 spec actions matched source tokens; transport verified (port 9090, 19200 baud, 8N1); spec fully represents Pulse JSON-RPC 2.0 API. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco 330 W UHP Projector Lamp Control Spec

## Summary
Barco Pulse projector using JSON-RPC 2.0 over TCP/IP (port 9090) and RS-232 serial (19200 8N1). This spec covers the Pulse API methods, properties, and signals exposed for power, source selection, illumination control, picture settings, warping, blending, environment telemetry, and optics control.

<!-- UNRESOLVED: exact firmware version range not stated; API documentation states parts of the API are dynamic and depend on peripherals/configuration. -->

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
  type: passcode  # source describes optional authenticate method with secret pass code; normal end-user access may skip auth
```

## Traits
```yaml
- powerable       # inferred from system.poweron / system.poweroff methods
- routable        # inferred from source selection commands (image.window.main.source)
- queryable       # inferred from property.get / property.subscribe patterns
- levelable       # inferred from brightness/contrast/gamma/saturation/sharpness properties
```

## Actions
```yaml
# All JSON-RPC 2.0 methods documented in the source, with literal payload templates.

- id: authenticate
  label: Authenticate (elevated access)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": { "id": 1, "code": 98765 }}'
  params:
    - name: code
      type: integer
      description: Secret pass code for elevated access level.

- id: system_poweron
  label: Power On Projector
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron", "params": { "id": 3, "property": "system.state" }}'
  params: []

- id: system_poweroff
  label: Power Off Projector
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff", "params": { "id": 4, "property": "system.state" }}'
  params: []

- id: property_get
  label: Read Property
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "id": 4, "property": "objectname.propertyname" }}'
  params:
    - name: property
      type: string
      description: Dot-notation objectname.propertyname.

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "id": 3, "property": "objectname.propertyname", "value": 100 }}'
  params:
    - name: property
      type: string
      description: Dot-notation objectname.propertyname.
    - name: value
      type: string
      description: Value to set (string, integer, float, or boolean).

- id: property_get_multiple
  label: Read Multiple Properties
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "id": 5, "property": ["image.brightness","image.contrast"] }}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property names.

- id: property_subscribe
  label: Subscribe To Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "id": 6, "property": "image.brightness" }}'
  params:
    - name: property
      type: string
      description: Dot-notation property name.

- id: property_subscribe_multiple
  label: Subscribe To Multiple Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "id": 7, "property": ["image.brightness","image.contrast"] }}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property names.

- id: property_unsubscribe
  label: Unsubscribe From Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "id": 8, "property": "image.brightness" }}'
  params:
    - name: property
      type: string
      description: Dot-notation property name.

- id: property_unsubscribe_multiple
  label: Unsubscribe From Multiple Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "id": 9, "property": ["image.brightness","image.contrast"] }}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property names.

- id: signal_subscribe
  label: Subscribe To Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "id": 10, "signal": "modelupdated" }}'
  params:
    - name: signal
      type: string
      description: Signal name (e.g. modelupdated).

- id: signal_subscribe_multiple
  label: Subscribe To Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "id": 11, "signal": ["modelupdated","image.processing.warp.gridchanged"] }}'
  params:
    - name: signal
      type: array
      description: Array of signal names.

- id: signal_unsubscribe
  label: Unsubscribe From Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "id": 12, "signal": "modelupdated" }}'
  params:
    - name: signal
      type: string
      description: Signal name.

- id: signal_unsubscribe_multiple
  label: Unsubscribe From Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "id": 13, "signal": ["modelupdated","image.processing.warp.gridchanged"] }}'
  params:
    - name: signal
      type: array
      description: Array of signal names.

- id: introspect_recursive
  label: Introspect Object (Recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "id": 1, "object": "foo", "recursive": true }}'
  params:
    - name: object
      type: string
      description: Object name (dot notation allowed); empty/omitted introspects everything.
    - name: recursive
      type: boolean
      description: If false, only one level of objects is listed.

- id: introspect_non_recursive
  label: Introspect Object (Non-Recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "id": 2, "object": "motors", "recursive": false }}'
  params:
    - name: object
      type: string
      description: Object name.
    - name: recursive
      type: boolean
      description: Set false for single-level listing.

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "params": { "id": 1 }}'
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "params": { "id": 3 }}'
  params: []

- id: image_source_set
  label: Set Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "id": 2, "property": "image.window.main.source", "value": "DisplayPort 1" }}'
  params:
    - name: value
      type: string
      description: Source name from image.source.list (e.g. "DisplayPort 1", "HDMI").

- id: ledctrl_blink
  label: Blink System Status LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "id": 3, "led": "systemstatus", "color": "red", "period": 42 }}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. "systemstatus").
    - name: color
      type: string
      description: LED color.
    - name: period
      type: integer
      description: Blink period.

- id: warp_enable
  label: Enable Warp Globally
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "id": 10, "property": "image.processing.warp.enable", "value": true }}'
  params:
    - name: value
      type: boolean
      description: true to enable, false to disable.

- id: warp_file_upload
  label: Upload Warp Grid File (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://192.168.1.100/api/image/processing/warp/file/transfer'
  params:
    - name: file
      type: string
      description: Local path to warp.xml file.
    - name: address
      type: string
      description: Projector IP address.

- id: warp_file_select
  label: Select Uploaded Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "id": 11, "property": "image.processing.warp.file.selected", "value": "warp.xml" }}'
  params:
    - name: value
      type: string
      description: Filename to activate.

- id: warp_file_enable
  label: Enable Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "id": 12, "property": "image.processing.warp.file.enable", "value": true }}'
  params:
    - name: value
      type: boolean
      description: true to enable, false to disable.

- id: blend_file_upload
  label: Upload Blend Mask (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@mask.png http://192.168.1.100/api/image/processing/blend/file/transfer'
  params:
    - name: file
      type: string
      description: Local path to mask.png file (8 or 16 bit grayscale).
    - name: address
      type: string
      description: Projector IP address.

- id: blend_file_select
  label: Select Uploaded Blend Mask
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "id": 13, "property": "image.processing.blend.file.selected", "value": "mask.png" }}'
  params:
    - name: value
      type: string
      description: Filename to activate.

- id: blend_file_enable
  label: Enable Blend Mask
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "id": 14, "property": "image.processing.blend.file.enable", "value": true }}'
  params:
    - name: value
      type: boolean
      description: true to enable, false to disable.

- id: blacklevel_file_upload
  label: Upload Black Level Mask (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://192.168.1.100/api/image/processing/blacklevel/file/transfer'
  params:
    - name: file
      type: string
      description: Local path to blacklevel.png file.
    - name: address
      type: string
      description: Projector IP address.

- id: blacklevel_file_select
  label: Select Uploaded Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "id": 15, "property": "image.processing.blacklevel.file.selected", "value": "blacklevel.png" }}'
  params:
    - name: value
      type: string
      description: Filename to activate.

- id: blacklevel_file_enable
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "id": 16, "property": "image.processing.blacklevel.file.enable", "value": true }}'
  params:
    - name: value
      type: boolean
      description: true to enable, false to disable.

- id: environment_getcontrolblocks
  label: Read Environment Sensors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "id": 18, "type": "Sensor", "valuetype": "Temperature" }}'
  params:
    - name: type
      type: string
      description: "Sensor type: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock."
    - name: valuetype
      type: string
      description: "Value type: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any."

- id: eco_wake_serial
  label: Wake From ECO Mode (Serial)
  kind: action
  command: ':POWR1\r'
  params: []

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels", "params": {}}'
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes", "params": {}}'
  params: []

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents", "params": {}}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus", "params": {}}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade", "params": {}}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO At Current Light Level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage", "params": {}}'
  params: []

- id: illumination_laser_getserialnumber
  label: Get Illumination Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber", "params": {}}'
  params: []

- id: environment_getalarminfo
  label: Read Environment Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo", "params": {}}'
  params: []

- id: image_color_p7_copypresettocustom
  label: Copy P7 Preset To Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "" }}'
  params:
    - name: presetname
      type: string
      description: Name of preset.

- id: image_color_p7_resetpreset
  label: Reset P7 Custom Preset To Defaults
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "" }}'
  params:
    - name: presetname
      type: string
      description: Name of preset.

- id: image_color_p7_resettonative
  label: Reset P7 Custom Preset To Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative", "params": {}}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle To Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode", "params": {}}'
  params: []

- id: file_download
  label: Download File From Projector (HTTP)
  kind: action
  command: 'curl -O -J http://192.168.1.100/api/image/processing/warp/file/transfer'
  params:
    - name: url
      type: string
      description: Full URL composed of http://<address>/api<endpoint>, optionally with trailing filename.
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  description: Current operation state of the projector.

- id: illumination_state
  type: enum
  values: [On, Off]
  description: State of light.

- id: active_source
  type: string
  description: Source name currently displayed in the main window.

- id: image_brightness
  type: float
  description: Normalized image brightness/offset (-1..1, 0=default).

- id: image_contrast
  type: float
  description: Normalized image contrast/gain (0..2, 1=default).

- id: image_gamma
  type: float
  description: Image gamma (1..3, 2.2=default).

- id: image_saturation
  type: float
  description: Normalized image color saturation (0..2, 1=default).

- id: image_sharpness
  type: integer
  description: Normalized image sharpness (-2..8).

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: optics_shutter_position
  type: enum
  values: [Open, Closed]

- id: optics_shutter_target
  type: enum
  values: [Open, Closed]

- id: optics_zoom_position
  type: integer
  description: Current zoom motor position.

- id: optics_focus_position
  type: integer
  description: Current focus motor position.

- id: optics_lensshift_horizontal_position
  type: integer

- id: optics_lensshift_vertical_position
  type: integer

- id: illumination_laser_power
  type: float
  description: Current target laser power in percent.

- id: illumination_laser_minpower
  type: float
  description: Current minimum allowed laser power in percent.

- id: illumination_laser_maxpower
  type: float
  description: Current maximum allowed laser power in percent.

- id: system_standby_enable
  type: boolean

- id: system_eco_enable
  type: boolean

- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: network_device_lan_ip4config
  type: object
  description: "Address, Mask, Gateway, NameServers (strings)."

- id: dmx_mode
  type: string

- id: dmx_startchannel
  type: integer
  description: DMX start channel 1..512.

- id: dmx_shutdown
  type: boolean

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: environment_controlblocks_result
  type: object
  description: Dictionary of sensor/value pairs returned by environment.getcontrolblocks.
```

## Variables
```yaml
# Settable parameters (properties) that are not discrete action commands.
- id: image_brightness
  property: image.brightness
  type: float
  range: [-1, 1]
  step: 0.01
  access: RW

- id: image_contrast
  property: image.contrast
  type: float
  range: [0, 2]
  step: 0.01
  access: RW

- id: image_gamma
  property: image.gamma
  type: float
  range: [1, 3]
  step: 0.1
  access: RW

- id: image_saturation
  property: image.saturation
  type: float
  range: [0, 2]
  step: 0.01
  access: RW

- id: image_sharpness
  property: image.sharpness
  type: integer
  range: [-2, 8]
  access: RW

- id: image_orientation
  property: image.orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_window_main_source
  property: image.window.main.source
  type: string
  access: RW

- id: image_window_main_scalingmode
  property: image.window.main.scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_window_main_position
  property: image.window.main.position
  type: object
  fields: { x: int, y: int }

- id: image_window_main_size
  property: image.window.main.size
  type: object
  fields: { width: int, height: int }

- id: image_processing_warp_enable
  property: image.processing.warp.enable
  type: boolean
  access: RW

- id: image_processing_warp_file_selected
  property: image.processing.warp.file.selected
  type: string

- id: image_processing_warp_file_enable
  property: image.processing.warp.file.enable
  type: boolean

- id: image_processing_blend_file_selected
  property: image.processing.blend.file.selected
  type: array
  items: string

- id: image_processing_blend_file_enable
  property: image.processing.blend.file.enable
  type: boolean

- id: image_processing_blacklevel_file_selected
  property: image.processing.blacklevel.file.selected
  type: string

- id: image_processing_blacklevel_file_enable
  property: image.processing.blacklevel.file.enable
  type: boolean

- id: illumination_sources_laser_power
  property: illumination.sources.laser.power
  type: float
  access: RW
  description: Target power in percent.

- id: optics_shutter_target
  property: optics.shutter.target
  type: enum
  values: [Open, Closed]

- id: system_standby_enable
  property: system.standby.enable
  type: boolean

- id: system_eco_enable
  property: system.eco.enable
  type: boolean

- id: dmx_mode
  property: dmx.mode
  type: string

- id: dmx_startchannel
  property: dmx.startchannel
  type: integer
  range: [1, 512]

- id: dmx_shutdown
  property: dmx.shutdown
  type: boolean
```

## Events
```yaml
# Unsolicited notifications from the projector (client must implement receivers; no id, no response).
- id: property_changed
  method: property.changed
  description: Array of objectname.propertyname/value pairs delivered when a subscribed property changes.

- id: signal_callback
  method: signal.callback
  description: Array of signalname/argument-list pairs delivered when a subscribed signal fires.

- id: modelupdated
  method: signal.callback (modelupdated)
  description: Fires when object structure changes (objects added or removed).

- id: introspect_objectchanged
  method: signal.callback (introspect.objectchanged)
  description: Object arrival/removal notification. Args: object (string), isnew (bool).
```

## Macros
```yaml
# Multi-step sequences explicitly described in source.
- id: wake_from_eco
  description: Wake a projector that is in ECO mode (choose one path).
  steps:
    - "Send Wake-on-LAN packet using projector's HW (MAC) address."
    - "Or press the power button on the remote control."
    - "Or press the power button on the keypad."
    - "Or send ASCII string ':POWR1\\r' on the RS-232 serial port."

- id: blend_mask_apply
  description: Apply a blend mask to the projector.
  steps:
    - "POST file: curl -X POST -F file=@mask.png http://<address>/api/image/processing/blend/file/transfer"
    - "Select file: property.set image.processing.blend.file.selected = mask.png"
    - "Enable file: property.set image.processing.blend.file.enable = true"

- id: blacklevel_apply
  description: Apply a black level mask.
  steps:
    - "POST file: curl -X POST -F file=@blacklevel.png http://<address>/api/image/processing/blacklevel/file/transfer"
    - "Select file: property.set image.processing.blacklevel.file.selected = blacklevel.png"
    - "Enable file: property.set image.processing.blacklevel.file.enable = true"

- id: warp_apply
  description: Apply a warp grid file.
  steps:
    - "Enable global warp: property.set image.processing.warp.enable = true"
    - "POST file: curl -X POST -F file=@warp.xml http://<address>/api/image/processing/warp/file/transfer"
    - "Select file: property.set image.processing.warp.file.selected = warp.xml"
    - "Enable file warp: property.set image.processing.warp.file.enable = true"
```

## Safety
```yaml
confirmation_required_for:
  - system_poweron
  - system_poweroff
interlocks:
  - "Verify projector state is standby or ready before issuing system.poweron."
  - "Verify projector state is on before issuing system.poweroff."
  - "Wait for property.set confirmation before setting the same property again (continuously setting without confirmation may flood the server)."
# UNRESOLVED: no additional safety warnings or fault recovery procedures documented in source.
```

## Notes
- Pulse API is JSON-RPC 2.0; all requests carry `"jsonrpc": "2.0"`.
- TCP port 9090; RS-232 19200 8N1, no flow control.
- Authentication via `authenticate` method with secret pass code is optional — normal end-user access can skip it.
- ECO mode wake: send ASCII `:POWR1\r` on serial, or Wake-on-LAN, or remote/keypad power button.
- Some API surfaces are dynamic (lens peripherals, DMX mode) — use `introspect` to discover the live API.
- File endpoints under `/api` use HTTP POST for uploads and HTTP GET for downloads (curl `-O -J`).
- Parameters are passed by name; order in `params` does not matter.
- Source mixes real projector examples (laser, single illumination source) with the "330 W UHP Projector Lamp" model context; the exact set of available illumination sources and connectors varies by projector model and configuration.

<!-- UNRESOLVED: firmware version compatibility range not stated in source. -->
<!-- UNRESOLVED: HTTP port for file endpoints (other than 80 default in examples) not stated. -->
<!-- UNRESOLVED: power consumption, voltage, current specifications not stated. -->
<!-- UNRESOLVED: detailed fault/error recovery sequences not stated beyond alarmstate enum. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:36:48.166Z
last_checked_at: 2026-07-21T20:40:34.181Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:40:34.181Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "All 45 spec actions matched source tokens; transport verified (port 9090, 19200 baud, 8N1); spec fully represents Pulse JSON-RPC 2.0 API. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact firmware version range not stated; API documentation states parts of the API are dynamic and depend on peripherals/configuration."
- "no additional safety warnings or fault recovery procedures documented in source."
- "firmware version compatibility range not stated in source."
- "HTTP port for file endpoints (other than 80 default in examples) not stated."
- "power consumption, voltage, current specifications not stated."
- "detailed fault/error recovery sequences not stated beyond alarmstate enum."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
