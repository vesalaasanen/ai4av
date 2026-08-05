---
spec_id: admin/barco-098-dc2k-19-32
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco 098 Dc2K 19 32 Control Spec"
manufacturer: Barco
model_family: "Barco 098 Dc2K 19 32"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco 098 Dc2K 19 32"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:34:13.403Z
last_checked_at: 2026-07-21T20:30:37.626Z
generated_at: 2026-07-21T20:30:37.626Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "complete list of peripherals (DMX channels, motorized lens options, lamp vs laser) is dynamic — depends on installed configuration. Use introspection at runtime."
  - "source does not document the params object for this method (component name, target version)."
  - "source contains no explicit safety interlocks, voltage/current"
  - "- Firmware version compatibility / minimum required firmware for any specific feature is not stated."
  - "port not stated."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:30:37.626Z
  matched_actions: 89
  action_count: 89
  confidence: medium
  summary: "All 89 spec actions verified as literal matches in source; all transport parameters (port 9090, baud 19200, etc.) confirmed. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco 098 Dc2K 19 32 Control Spec

## Summary
Barco Pulse-based projector controllable over TCP/IP (JSON-RPC 2.0 on port 9090) and RS-232. The spec covers authentication, power control, source selection, illumination/laser power, picture settings, warp/blend/black-level file upload, environment telemetry, DMX, optics, and introspection.

<!-- UNRESOLVED: complete list of peripherals (DMX channels, motorized lens options, lamp vs laser) is dynamic — depends on installed configuration. Use introspection at runtime. -->

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
  type: passcode  # source: authenticate JSON-RPC method requires code parameter; passcode not stated to be optional for non-end-user access levels
```

**Notes on auth:** Source states authentication is optional for normal end-user access. To access higher privilege levels, send a JSON-RPC `authenticate` request with a `code` integer (e.g. `98765`). Code format and value not documented.

## Traits
```yaml
- powerable       # inferred from system.poweron / system.poweroff commands
- routable        # inferred from image.window.main.source selection
- queryable       # inferred from property.get / property.subscribe
- levelable       # inferred from illumination.sources.laser.power and image.brightness/contrast/saturation/gamma
```

## Actions
```yaml
- id: authenticate
  label: Authenticate (set access level)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": { "code": {code} }, "id": 1}'
  params:
    - name: code
      type: integer
      description: Secret pass code (value not documented in source)

- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron" }'
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: '{ "jsonrpc": "2.0", "method": "system.poweroff" }'
  params: []

- id: system_state_query
  label: System State Query
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "system.state" } }'
  params: []

- id: system_state_subscribe
  label: Subscribe to System State Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "system.state" } }'
  params: []

- id: active_source_query
  label: Get Active Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.window.main.source" } }'
  params: []

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list" }'
  params: []

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.source", "value": "{source}" } }'
  params:
    - name: source
      type: string
      description: Source name from image.source.list (e.g. "DisplayPort 1", "HDMI")

- id: source_subscribe
  label: Subscribe to Active Source Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.window.main.source" } }'
  params: []

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list" }'
  params: []

- id: list_source_connectors
  label: List Connectors Used By Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.{source}.listconnectors" }'
  params:
    - name: source
      type: string
      description: Source object name (lowercase, non-word chars stripped; e.g. "displayport1")

- id: connector_signal_query
  label: Get Connector Detected Signal
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.connector.{connector}.detectedsignal" } }'
  params:
    - name: connector
      type: string
      description: Connector object name (e.g. "l1hdmi", "displayport1")

- id: connector_signal_subscribe
  label: Subscribe to Connector Signal Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.connector.{connector}.detectedsignal" } }'
  params:
    - name: connector
      type: string
      description: Connector object name

- id: set_brightness
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.brightness", "value": {value} } }'
  params:
    - name: value
      type: float
      description: Normalized brightness, range -1 to 1 (0 default)

- id: get_brightness
  label: Get Image Brightness
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.brightness" } }'
  params: []

- id: subscribe_brightness
  label: Subscribe to Brightness Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.brightness" } }'
  params: []

- id: set_contrast
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.contrast", "value": {value} } }'
  params:
    - name: value
      type: float
      description: Normalized contrast, range 0 to 2 (1 default)

- id: get_contrast
  label: Get Image Contrast
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.contrast" } }'
  params: []

- id: set_gamma
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.gamma", "value": {value} } }'
  params:
    - name: value
      type: float
      description: Gamma, range 1 to 3 (2.2 default)

- id: get_gamma
  label: Get Image Gamma
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.gamma" } }'
  params: []

- id: set_saturation
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.saturation", "value": {value} } }'
  params:
    - name: value
      type: float
      description: Normalized saturation, range 0 to 2 (1 default)

- id: set_sharpness
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.sharpness", "value": {value} } }'
  params:
    - name: value
      type: integer
      description: Sharpness, range -2 to 8

- id: set_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.orientation", "value": "{orientation}" } }'
  params:
    - name: orientation
      type: string
      enum: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: set_window_position
  label: Set Window Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.position", "value": { "x": {x}, "y": {y} } } }'
  params:
    - name: x
      type: integer
    - name: y
      type: integer

- id: set_window_size
  label: Set Window Size
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.size", "value": { "width": {width}, "height": {height} } } }'
  params:
    - name: width
      type: integer
    - name: height
      type: integer

- id: set_scaling_mode
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.scalingmode", "value": "{mode}" } }'
  params:
    - name: mode
      type: string
      enum: [Fill, OneToOne, FillScreen, Stretch]

- id: illumination_state_query
  label: Illumination State Query
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.state" } }'
  params: []

- id: illumination_state_subscribe
  label: Subscribe to Illumination State Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "illumination.state" } }'
  params: []

- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "illumination.sources.laser.power", "value": {value} } }'
  params:
    - name: value
      type: integer
      description: Power percent (min/max are dynamic, introspect first)

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.power" } }'
  params: []

- id: get_laser_min_power
  label: Get Laser Min Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.minpower" } }'
  params: []

- id: get_laser_max_power
  label: Get Laser Max Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.maxpower" } }'
  params: []

- id: subscribe_laser_power
  label: Subscribe to Laser Power Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "illumination.sources.laser.power" } }'
  params: []

- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage" }'
  params: []

- id: get_laser_serial_number
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber" }'
  params: []

- id: enable_warp
  label: Enable Global Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.enable", "value": {value} } }'
  params:
    - name: value
      type: boolean

- id: upload_warp_file
  label: Upload Warp Grid File (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@{file} http://{address}/api/image/processing/warp/file/transfer'
  params:
    - name: file
      type: string
      description: Warp file (e.g. warp.xml)
    - name: address
      type: string
      description: Projector IP address (e.g. 192.168.1.100)

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.selected", "value": "{file}" } }'
  params:
    - name: file
      type: string

- id: enable_warp_file
  label: Enable Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.enable", "value": true } }'
  params: []

- id: upload_blend_mask
  label: Upload Blend Mask (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@{file} http://{address}/api/image/processing/blend/file/transfer'
  params:
    - name: file
      type: string
      description: Blend mask image (PNG/JPEG/TIFF, 8 or 16 bit grayscale; resolution must match blend layer)
    - name: address
      type: string
      description: Projector IP address

- id: select_blend_file
  label: Select Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.selected", "value": "{file}" } }'
  params:
    - name: file
      type: string

- id: enable_blend_file
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.enable", "value": true } }'
  params: []

- id: upload_blacklevel_mask
  label: Upload Black Level Mask (HTTP POST)
  kind: action
  command: 'curl -X POST -F file=@{file} http://{address}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: file
      type: string
      description: Black level mask image (8 or 16 bit grayscale)
    - name: address
      type: string
      description: Projector IP address

- id: select_blacklevel_file
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.selected", "value": "{file}" } }'
  params:
    - name: file
      type: string

- id: enable_blacklevel_file
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.enable", "value": true } }'
  params: []

- id: introspect
  label: Introspect Object (recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "{object}", "recursive": {recursive} }, "id": 1 }'
  params:
    - name: object
      type: string
      description: Dot-notation object name (default empty introspects all)
    - name: recursive
      type: boolean
      description: Default true; false lists only direct children

- id: introspect_compact
  label: Introspect Object (array form)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": [ "{object}", {recursive} ], "id": 1 }'
  params:
    - name: object
      type: string
    - name: recursive
      type: boolean

- id: subscribe_signal
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "{signal}" } }'
  params:
    - name: signal
      type: string
      description: Signal name (e.g. "modelupdated", "image.processing.warp.gridchanged")

- id: subscribe_signals_multi
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": ["{signal1}", "{signal2}"] } }'
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

- id: unsubscribe_signal
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": "{signal}" } }'
  params:
    - name: signal
      type: string

- id: unsubscribe_signals_multi
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": ["{signal1}", "{signal2}"] } }'
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

- id: subscribe_property
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "{property}" } }'
  params:
    - name: property
      type: string
      description: Property name in dot notation (e.g. "image.brightness")

- id: subscribe_properties_multi
  label: Subscribe to Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": ["{property1}", "{property2}"] } }'
  params:
    - name: property1
      type: string
    - name: property2
      type: string

- id: unsubscribe_property
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": "{property}" } }'
  params:
    - name: property
      type: string

- id: unsubscribe_properties_multi
  label: Unsubscribe from Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": ["{property1}", "{property2}"] } }'
  params:
    - name: property1
      type: string
    - name: property2
      type: string

- id: get_property
  label: Get Property Value
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "{property}" } }'
  params:
    - name: property
      type: string

- id: get_properties_multi
  label: Get Multiple Property Values
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": ["{property1}", "{property2}"] } }'
  params:
    - name: property1
      type: string
    - name: property2
      type: string

- id: set_property
  label: Set Property Value
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "{property}", "value": {value} } }'
  params:
    - name: property
      type: string
    - name: value
      type: string
      description: Value appropriate to property type (boolean, int, float, string, object)

- id: led_blink
  label: Blink Status LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "led": "{led}", "color": "{color}", "period": {period} } }'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. "systemstatus")
    - name: color
      type: string
      description: LED color (e.g. "red")
    - name: period
      type: integer
      description: Blink period

- id: get_environment_temperatures
  label: Get Environment Temperatures
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "Sensor", "valuetype": "Temperature" } }'
  params: []

- id: get_environment_fan_speeds
  label: Get Fan Speeds
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "Sensor", "valuetype": "Speed" } }'
  params: []

- id: get_environment_alarms
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo" }'
  params: []

- id: get_alarm_state
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "environment.alarmstate" } }'
  params: []

- id: get_lan_ipv4_config
  label: Get LAN IPv4 Configuration
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.ip4config" } }'
  params: []

- id: get_lan_state
  label: Get LAN State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.state" } }'
  params: []

- id: get_shutter_position
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.shutter.position" } }'
  params: []

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.shutter.target", "value": "{target}" } }'
  params:
    - name: target
      type: string
      enum: [Open, Closed]

- id: get_zoom_position
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.zoom.position" } }'
  params: []

- id: get_focus_position
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.focus.position" } }'
  params: []

- id: get_lensshift_horizontal_position
  label: Get Lens Shift Horizontal Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.lensshift.horizontal.position" } }'
  params: []

- id: get_lensshift_vertical_position
  label: Get Lens Shift Vertical Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.lensshift.vertical.position" } }'
  params: []

- id: set_standby_enable
  label: Enable/Disable Standby State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.standby.enable", "value": {value} } }'
  params:
    - name: value
      type: boolean

- id: set_eco_enable
  label: Enable/Disable ECO State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.eco.enable", "value": {value} } }'
  params:
    - name: value
      type: boolean

- id: list_dmx_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes" }'
  params: []

- id: list_dmx_channels
  label: List DMX Channels (for current mode)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels" }'
  params: []

- id: get_dmx_mode
  label: Get DMX Mode
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "dmx.mode" } }'
  params: []

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.mode", "value": "{mode}" } }'
  params:
    - name: mode
      type: string

- id: get_dmx_startchannel
  label: Get DMX Start Channel
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "dmx.startchannel" } }'
  params: []

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.startchannel", "value": {channel} } }'
  params:
    - name: channel
      type: integer
      description: DMX start channel, range 1 to 512

- id: get_dmx_shutdown
  label: Get DMX Shutdown Flag
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "dmx.shutdown" } }'
  params: []

- id: set_dmx_shutdown
  label: Set DMX Shutdown Flag
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.shutdown", "value": {value} } }'
  params:
    - name: value
      type: boolean

- id: copy_p7_preset_to_custom
  label: P7 Color - Copy Preset to Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "{presetname}" } }'
  params:
    - name: presetname
      type: string

- id: reset_p7_preset_to_default
  label: P7 Color - Reset Preset to Default Values
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "{presetname}" } }'
  params:
    - name: presetname
      type: string

- id: reset_p7_preset_to_native
  label: P7 Color - Reset to Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative" }'
  params: []

- id: rgb_mode_next
  label: Cycle to Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode" }'
  params: []

- id: list_firmware_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents" }'
  params: []

- id: list_firmware_versions
  label: List Firmware Component Versions and Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus" }'
  params: []

- id: schedule_firmware_upgrade
  label: Schedule Firmware Component Upgrade at Next Reboot
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade" }'
  params: []
  # UNRESOLVED: source does not document the params object for this method (component name, target version).

- id: serial_wake_from_eco
  label: Wake from ECO via RS-232
  kind: action
  command: ':POWR1\r'
  params: []
  notes: |
    Serial-port ASCII wake command. Documented as the only RS-232 ASCII command
    in the source. All other control is via JSON-RPC over TCP/serial.
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]

- id: illumination_state
  type: enum
  values: [On, Off]

- id: laser_power_percent
  type: integer
  description: Laser illumination power in percent (range is dynamic; introspect minpower/maxpower)

- id: laser_min_power_percent
  type: integer
  description: Laser illumination minimum power in percent (read-only, dynamic)

- id: laser_max_power_percent
  type: integer
  description: Laser illumination maximum power in percent (read-only, dynamic)

- id: image_brightness
  type: float
  description: Normalized brightness, range -1 to 1

- id: image_contrast
  type: float
  description: Normalized contrast, range 0 to 2

- id: image_gamma
  type: float
  description: Gamma, range 1 to 3

- id: image_saturation
  type: float
  description: Normalized saturation, range 0 to 2

- id: image_sharpness
  type: integer
  description: Sharpness, range -2 to 8

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: window_scaling_mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: shutter_position
  type: enum
  values: [Open, Closed]

- id: shutter_target
  type: enum
  values: [Open, Closed]

- id: lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: lan_ipv4_config
  type: object
  description: Object with Address, Mask, Gateway, NameServers (all string)

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: environment_temperatures
  type: object
  description: Dictionary of sensor name -> float temperature reading

- id: environment_fan_speeds
  type: object
  description: Dictionary of fan name -> int/float RPM reading

- id: firmware_component_versions
  type: object
  description: Array of {name, versions:{available,running}, status} per component; status enum {Unknown, OK, Upgradable}

- id: dmx_startchannel
  type: integer
  description: DMX start channel, range 1 to 512

- id: dmx_shutdown
  type: boolean

- id: connector_detected_signal
  type: object
  description: Signal info dict with active, name, vertical/horizontal resolution, sync/timing, frequency, pixel_rate, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode. See source for full schema.
```

## Variables
```yaml
- id: image_brightness
  type: float
  range: [-1, 1]
  default: 0

- id: image_contrast
  type: float
  range: [0, 2]
  default: 1

- id: image_gamma
  type: float
  range: [1, 3]
  default: 2.2

- id: image_saturation
  type: float
  range: [0, 2]
  default: 1

- id: image_sharpness
  type: integer
  range: [-2, 8]

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: window_scaling_mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: window_position
  type: object
  schema: {x: int, y: int}

- id: window_size
  type: object
  schema: {width: int, height: int}

- id: illumination_laser_power
  type: integer
  description: Percent. Bounds are dynamic - introspect illumination.sources.laser.{min,max}power.

- id: shutter_target
  type: enum
  values: [Open, Closed]

- id: system_standby_enable
  type: boolean

- id: system_eco_enable
  type: boolean

- id: dmx_mode
  type: string

- id: dmx_startchannel
  type: integer
  range: [1, 512]

- id: dmx_shutdown
  type: boolean

- id: warp_enable
  type: boolean

- id: warp_file_enable
  type: boolean

- id: blend_file_enable
  type: boolean

- id: blacklevel_file_enable
  type: boolean
```

## Events
```yaml
- id: property_changed
  description: |
    Server-initiated notification carrying array of {property_name: value}
    pairs. Client must implement `property.changed` handler. Notifications
    carry no `id` and require no response.
  payload_example: |
    { "jsonrpc": "2.0", "method": "property.changed", "params": { "property": [ { "image.window.main.source": "DisplayPort 2" } ] } }

- id: signal_callback
  description: |
    Server-initiated notification for emitted signals. Carries array of
    {signal_name: args_object}.
  payload_example: |
    { "jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ { "image.processing.warp.gridchanged": { } } ] } }

- id: introspect_objectchanged
  description: |
    Delivered via `signal.callback` when the object tree changes (objects
    added or removed). Payload: {object: name, isnew: bool}.
  payload_example: |
    { "jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ { "introspect.objectchanged": { "object": "motors.motor1", "newobject": true } } ] } }

- id: modelupdated
  description: |
    Signal triggered when object structure changes (subscribe via
    signal.subscribe with signal "modelupdated").
```

## Macros
```yaml
- id: power_on_safe
  description: Verify state before powering on (per source best-practice guidance).
  steps:
    - method: property.get
      params: {property: system.state}
      expect: ["standby", "ready"]
    - method: system.poweron
      params: {}

- id: power_off_safe
  description: Verify state before powering off (per source best-practice guidance).
  steps:
    - method: property.get
      params: {property: system.state}
      expect: ["on"]
    - method: system.poweroff
      params: {}

- id: switch_active_source
  description: Look up available sources and select one.
  steps:
    - method: image.source.list
      params: {}
    - method: property.set
      params: {property: image.window.main.source, value: "{source}"}

- id: upload_and_activate_warp
  description: Upload warp file, select it, then enable file-based warp.
  steps:
    - command: 'curl -X POST -F file=@{file} http://{address}/api/image/processing/warp/file/transfer'
      description: HTTP POST warp file
    - method: property.set
      params: {property: image.processing.warp.file.selected, value: "{file}"}
    - method: property.set
      params: {property: image.processing.warp.file.enable, value: true}
    - method: property.set
      params: {property: image.processing.warp.enable, value: true}

- id: upload_and_activate_blend
  description: Upload blend mask, select it, then enable file-based blend.
  steps:
    - command: 'curl -X POST -F file=@{file} http://{address}/api/image/processing/blend/file/transfer'
    - method: property.set
      params: {property: image.processing.blend.file.selected, value: "{file}"}
    - method: property.set
      params: {property: image.processing.blend.file.enable, value: true}

- id: upload_and_activate_blacklevel
  description: Upload black-level mask, select it, then enable file-based black-level correction.
  steps:
    - command: 'curl -X POST -F file=@{file} http://{address}/api/image/processing/blacklevel/file/transfer'
    - method: property.set
      params: {property: image.processing.blacklevel.file.selected, value: "{file}"}
    - method: property.set
      params: {property: image.processing.blacklevel.file.enable, value: true}
```

## Safety
```yaml
confirmation_required_for:
  - system.poweron    # source recommends verifying state is standby/ready before issuing
  - system.poweroff   # source recommends verifying state is on before issuing
  - firmware.schedulecomponentupgrade  # forces upgrade at next reboot
interlocks: []
# UNRESOLVED: source contains no explicit safety interlocks, voltage/current
# specs, fault recovery sequences, or lockout procedures. The only documented
# state-machine guard is the recommendation to verify system.state before
# power transitions. Do not invent additional safety claims.
```

## Notes
- All commands are JSON-RPC 2.0 over TCP port 9090. The same JSON-RPC surface is also reachable via the RS-232 serial port (19200/8/N/1, no flow control), with the documented exception of `:POWR1\r` for waking from ECO mode.
- Authentication: optional for end-user access. To elevate access, call `authenticate` with `code` integer. Code value is not documented in source.
- The `id` field in requests is optional (string or number). JSON-RPC responses echo it; notifications omit it.
- Properties are dot-notation strings (e.g. `image.brightness`, `illumination.sources.laser.power`). Source object/connector names follow a normalize-to-lowercase-strip-non-word convention (e.g. `DisplayPort 1` -> `displayport1`).
- Property discovery is dynamic — the source explicitly warns that some methods/properties/signals exist only depending on installed peripherals (lens type, DMX mode, etc.). Use `introspect` at runtime to enumerate the live API for a specific unit.
- File upload endpoints (`/api/image/processing/warp/file/transfer`, `/api/image/processing/blend/file/transfer`, `/api/image/processing/blacklevel/file/transfer`) accept HTTP POST with multipart `file=@...` form data via `curl`. The base URL pattern is `http://<projector-ip>/api/...`.
- Source names returned by `image.source.list` vary by projector model and installed options; treat as dynamic enum.
- Best practice from source: after `property.set`, wait for the confirmation response before issuing another `property.set` on the same property, otherwise the server can be flooded and performance degraded.
- The source documents JSON-RPC 2.0 semantics — clients must implement `property.changed` and `signal.callback` handlers; notifications carry no `id` and require no reply.

<!-- UNRESOLVED:
  - Firmware version compatibility / minimum required firmware for any specific feature is not stated.
  - Authentication code value, code source (per-device? per-user?), and access-level semantics not documented.
  - DMX channel counts in basic vs extended modes not enumerated in source.
  - firmware.schedulecomponentupgrade params object (component name / target version) not documented.
  - HTTP base URL is `http://<projector-ip>/api` but no port is specified in source (assumed default 80 for HTTP). UNRESOLVED: port not stated.
  - ECO-mode wake-on-LAN magic packet format not documented.
-->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:34:13.403Z
last_checked_at: 2026-07-21T20:30:37.626Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:30:37.626Z
matched_actions: 89
action_count: 89
confidence: medium
summary: "All 89 spec actions verified as literal matches in source; all transport parameters (port 9090, baud 19200, etc.) confirmed. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "complete list of peripherals (DMX channels, motorized lens options, lamp vs laser) is dynamic — depends on installed configuration. Use introspection at runtime."
- "source does not document the params object for this method (component name, target version)."
- "source contains no explicit safety interlocks, voltage/current"
- "- Firmware version compatibility / minimum required firmware for any specific feature is not stated."
- "port not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
