---
spec_id: admin/barco-gc-lens-102-136
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco GC Lens 102 136 Control Spec"
manufacturer: Barco
model_family: "GC Lens 102 136"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "GC Lens 102 136"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T06:08:09.418Z
last_checked_at: 2026-08-05T08:05:40.841Z
generated_at: 2026-08-05T08:05:40.841Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes Barco Pulse API in general, not the GC Lens 102 136 model specifically. Model-specific commands, lens options, and feature availability must be discovered via JSON-RPC introspection on the live device."
  - "source defines no explicit multi-step macros. Common compositions:"
  - "source is the generic Barco Pulse API manual; the GC Lens 102 136 model name does not appear anywhere. Model-specific feature availability, lens motor ranges, supported resolutions, and connector inventory must be confirmed via live `introspect`. Voltage, current, and power specifications are not stated."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:05:40.841Z
  matched_actions: 81
  action_count: 81
  confidence: medium
  summary: "Spec action literals (JSON-RPC methods/properties and HTTP endpoints) match source verbatim; transport port 9090 and serial 19200/8/N/1 match. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-04
---

# Barco GC Lens 102 136 Control Spec

## Summary
Barco projector control over TCP/IP using the Pulse JSON-RPC API on port 9090. RS-232 also supported at 19200/8/N/1 with ASCII wake command. The source describes the generic Pulse protocol surface; specific behavior of the "GC Lens 102 136" model is not stated and must be discovered via introspection.

<!-- UNRESOLVED: source describes Barco Pulse API in general, not the GC Lens 102 136 model specifically. Model-specific commands, lens options, and feature availability must be discovered via JSON-RPC introspection on the live device. -->

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
  type: code  # source describes `authenticate` request with `code` param; normal end-user access may skip
```

## Traits
```yaml
- powerable   # inferred from system.poweron / system.poweroff
- routable    # inferred from image.window.main.source selection
- queryable   # inferred from property.get / environment.getcontrolblocks
- levelable   # inferred from illumination.sources.laser.power, image.brightness/contrast/gamma/saturation/sharpness
```

## Actions
```yaml
# Authentication
- id: authenticate
  label: Authenticate (elevated access)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"id":1,"code":98765},"id":1}'
  params:
    - name: code
      type: integer
      description: Secret pass code. Source example uses 98765; the actual code is device-specific.

# Power
- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron","id":3}'
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff","id":4}'
  params: []

- id: get_system_state
  label: Get System State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":1}'
  params: []

- id: subscribe_system_state
  label: Subscribe to System State Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"},"id":2}'
  params: []

# LED control (method example)
- id: led_blink
  label: LED Blink
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42},"id":3}'
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

# Properties - generic get/set
- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"objectname.propertyname","value":100},"id":3}'
  params:
    - name: property
      type: string
      description: Dot-notation property path
    - name: value
      type: string
      description: Value (string/bool/int/float per property metadata)

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"objectname.propertyname"},"id":4}'
  params:
    - name: property
      type: string
      description: Dot-notation property path

- id: property_get_multi
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["image.brightness","image.contrast"]},"id":5}'
  params:
    - name: property
      type: array
      description: List of dot-notation property paths

- id: property_subscribe
  label: Subscribe to Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"},"id":6}'
  params:
    - name: property
      type: string
      description: Dot-notation property path

- id: property_subscribe_multi
  label: Subscribe to Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["image.brightness","image.contrast"]},"id":7}'
  params:
    - name: property
      type: array
      description: List of dot-notation property paths

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"image.brightness"},"id":8}'
  params:
    - name: property
      type: string
      description: Dot-notation property path

- id: property_unsubscribe_multi
  label: Unsubscribe from Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["image.brightness","image.contrast"]},"id":9}'
  params:
    - name: property
      type: array
      description: List of dot-notation property paths

# Signals
- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"modelupdated"},"id":10}'
  params:
    - name: signal
      type: string
      description: Signal name

- id: signal_subscribe_multi
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]},"id":11}'
  params:
    - name: signal
      type: array
      description: List of signal names

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"modelupdated"},"id":12}'
  params:
    - name: signal
      type: string
      description: Signal name

- id: signal_unsubscribe_multi
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["modelupdated","image.processing.warp.gridchanged"]},"id":13}'
  params:
    - name: signal
      type: array
      description: List of signal names

# Introspection
- id: introspect_recursive
  label: Introspect (recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"foo","recursive":true},"id":1}'
  params:
    - name: object
      type: string
      description: Object name (dot notation allowed; empty/default introspects everything)
    - name: recursive
      type: bool
      description: If false, lists only one level of object names

- id: introspect_array_form
  label: Introspect (array form)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":["foo",true],"id":1}'
  params:
    - name: object
      type: string
    - name: recursive
      type: bool

# Sources / connectors
- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"},"id":0}'
  params: []

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'
  params: []

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"},"id":2}'
  params:
    - name: value
      type: string
      description: Source name from `image.source.list`

- id: list_connectors
  label: List Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
  params: []

- id: list_source_connectors
  label: List Connectors Used by Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.displayport1.listconnectors","id":4}'
  params:
    - name: source_object_name
      type: string
      description: Source object name in lower-snake form, e.g. `displayport1`

- id: get_connector_signal
  label: Get Connector Detected Signal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.displayport1.detectedsignal"},"id":5}'
  params:
    - name: property
      type: string
      description: Connector property path, e.g. `image.connector.displayport1.detectedsignal`

- id: subscribe_window_source
  label: Subscribe to Window Source Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.window.main.source"},"id":6}'
  params: []

# Illumination
- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":0}'
  params: []

- id: subscribe_illumination_state
  label: Subscribe to Illumination State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"},"id":1}'
  params: []

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":3}'
  params: []

- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":40},"id":5}'
  params:
    - name: value
      type: integer
      description: Target power in percent

- id: subscribe_laser_power
  label: Subscribe to Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["illumination.sources.laser.power"]},"id":4}'
  params: []

- id: get_laser_minpower
  label: Get Laser Min Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":6}'
  params: []

- id: get_laser_maxpower
  label: Get Laser Max Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"},"id":5}'
  params: []

- id: clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: get_laser_serial
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

# Picture settings - brightness
- id: get_brightness
  label: Get Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":7}'
  params: []

- id: set_brightness
  label: Set Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":0.15},"id":9}'
  params:
    - name: value
      type: float
      description: Range -1..1, step 0.01

# Picture settings - contrast / gamma / saturation / sharpness
- id: set_contrast
  label: Set Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":1.0},"id":9}'
  params:
    - name: value
      type: float
      description: Range 0..2, step 0.01

- id: set_gamma
  label: Set Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":2.2},"id":9}'
  params:
    - name: value
      type: float
      description: Range 1..3, step 0.1

- id: set_saturation
  label: Set Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":1.0},"id":9}'
  params:
    - name: value
      type: float
      description: Range 0..2, step 0.01

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":0},"id":9}'
  params:
    - name: value
      type: integer
      description: Range -2..8, step 1

# Orientation
- id: set_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"DESKTOP_FRONT"}}'
  params:
    - name: value
      type: string
      description: One of DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR

# Window geometry
- id: set_window_position
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":0,"y":0}}}'
  params:
    - name: value
      type: object
      description: '{ x: int, y: int }'

- id: set_window_size
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":1920,"height":1080}}}'
  params:
    - name: value
      type: object
      description: '{ width: int, height: int }'

- id: set_scaling_mode
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"Fill"}}'
  params:
    - name: value
      type: string
      description: One of Fill, OneToOne, FillScreen, Stretch

# Warp
- id: enable_warp
  label: Enable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true},"id":10}'
  params: []

- id: upload_warp_file
  label: Upload Warp Grid File (HTTP)
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://192.168.1.100/api/image/processing/warp/file/transfer'
  params: []

- id: select_warp_file
  label: Select Uploaded Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"},"id":11}'
  params:
    - name: value
      type: string
      description: Filename of previously uploaded warp grid

- id: enable_warp_file
  label: Enable Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":12}'
  params: []

# Blend
- id: upload_blend_mask
  label: Upload Blend Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@mask.png http://192.168.1.100/api/image/processing/blend/file/transfer'
  params: []

- id: select_blend_file
  label: Select Uploaded Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"},"id":13}'
  params:
    - name: value
      type: string
      description: Filename of previously uploaded blend mask

- id: enable_blend_file
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":14}'
  params: []

# Black level
- id: upload_blacklevel_mask
  label: Upload Black Level Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://192.168.1.100/api/image/processing/blacklevel/file/transfer'
  params: []

- id: select_blacklevel_file
  label: Select Uploaded Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"},"id":15}'
  params:
    - name: value
      type: string
      description: Filename of previously uploaded black level mask

- id: enable_blacklevel_file
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":16}'
  params: []

# Color (P7)
- id: p7_copy_preset_to_custom
  label: P7 Copy Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"..."}}'
  params:
    - name: presetname
      type: string

- id: p7_reset_preset
  label: P7 Reset Preset
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"..."}}'
  params:
    - name: presetname
      type: string

- id: p7_reset_to_native
  label: P7 Reset to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

# RGB mode
- id: rgb_next_mode
  label: Cycle Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

# DMX
- id: dmx_list_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

- id: dmx_list_channels
  label: List DMX Channels (for mode)
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels","params":{"modes":["..."]}}'
  params:
    - name: modes
      type: array
      description: Mode names

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"basic"}}'
  params:
    - name: value
      type: string

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":1}}'
  params:
    - name: value
      type: integer
      description: Range 1..512

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":true}}'
  params:
    - name: value
      type: bool

# Network
- id: get_lan_ipv4_config
  label: Get LAN IPv4 Config
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"}}'
  params: []

- id: get_lan_state
  label: Get LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'
  params: []

# Optics
- id: get_shutter_position
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'
  params: []

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"Open"}}'
  params:
    - name: value
      type: string
      description: Open or Closed

- id: get_zoom_position
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"}}'
  params: []

- id: get_focus_position
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"}}'
  params: []

- id: get_lensshift_horizontal
  label: Get Lens Shift Horizontal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"}}'
  params: []

- id: get_lensshift_vertical
  label: Get Lens Shift Vertical
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"}}'
  params: []

# System state toggles
- id: set_standby_enable
  label: Enable Standby State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":true}}'
  params:
    - name: value
      type: bool

- id: set_eco_enable
  label: Enable ECO State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":true}}'
  params:
    - name: value
      type: bool

# Environment
- id: get_environment_control_blocks
  label: Get Environment Control Blocks (sensors)
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"},"id":18}'
  params:
    - name: type
      type: string
      description: Sensor, Filter, Controller, Actuator, Alarm, GenericBlock
    - name: valuetype
      type: string
      description: Temperature, Speed, PWM, Voltage, Current, Power, ...

- id: get_alarm_state
  label: Get Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'
  params: []

- id: get_alarm_info
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

# Firmware
- id: firmware_list_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: firmware_list_component_version_status
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedule_component_upgrade
  label: Schedule Firmware Component Upgrade at Next Reboot
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","params":{"component":"..."}}'
  params:
    - name: component
      type: string

# Serial-only - ECO wake
- id: wake_from_eco_serial
  label: Wake from ECO via RS-232
  kind: action
  command: ':POWR1\r'
  params: []
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, error, service]
- id: illumination_state
  type: enum
  values: [On, Off]
- id: lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
- id: shutter_position
  type: enum
  values: [Open, Closed]
- id: scaling_mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
- id: orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
- id: laser_power_percent
  type: float
- id: brightness_normalized
  type: float
- id: contrast_normalized
  type: float
- id: gamma
  type: float
- id: saturation_normalized
  type: float
- id: sharpness
  type: integer
```

## Variables
```yaml
- id: standby_enable
  type: bool
  description: Enable/disable standby state. Check availability first.
- id: eco_enable
  type: bool
  description: Enable/disable ECO state. Check availability first.
- id: dmx_mode
  type: string
- id: dmx_startchannel
  type: integer
  description: Range 1..512
- id: dmx_shutdown
  type: bool
- id: lan_ipv4
  type: object
  description: '{ Address: string, Mask: string, Gateway: string, NameServers: string }'
```

## Events
```yaml
- id: modelupdated
  description: Triggered when the object structure changes (objects added or removed).
- id: property_changed
  description: Server-pushed notification when a subscribed property changes. Client receives `{ "method": "property.changed", "params": { "property": [ { "object.property": value } ] } }`.
- id: signal_callback
  description: Server-pushed notification when a subscribed signal is emitted. Client receives `{ "method": "signal.callback", "params": { "signal": [ { "object.signal": { ...args } } ] } }`.
- id: introspect_objectchanged
  description: Emitted by introspect API when objects are added/removed. Payload: `{ "introspect.objectchanged": { "object": "...", "newobject": bool } }`.
```

## Macros
```yaml
# UNRESOLVED: source defines no explicit multi-step macros. Common compositions:
- id: power_on_and_set_source
  description: Verify state is standby/ready, then power on, then set source.
  steps:
    - id: get_system_state
    - id: power_on
    - id: set_active_source
- id: power_off_if_on
  description: Verify state is on, then power off.
  steps:
    - id: get_system_state
    - id: power_off
- id: upload_and_enable_warp
  description: Upload warp grid via HTTP, select file, enable file warp, enable global warp.
  steps:
    - id: upload_warp_file
    - id: select_warp_file
    - id: enable_warp_file
    - id: enable_warp
```

## Safety
```yaml
confirmation_required_for:
  - system.poweroff
  - firmware.schedulecomponentupgrade
interlocks: []
# Source states: verify system.state is on before poweroff, and standby/ready before poweron; otherwise the command is silently ignored. No formal interlock procedures documented.
```

## Notes
- Pulse API surface is dynamic and model/peripheral dependent; rely on `introspect` to enumerate actual properties for the GC Lens 102 136.
- Normal end-user control does NOT require authentication; only elevated operations require `authenticate` with a pass code.
- TCP port: 9090. RS-232: 19200/8/N/1, none flow control. Serial wake command from ECO: `:POWR1\r`.
- File endpoints (warp grid, blend mask, black level mask) are uploaded via HTTP POST to `http://<ip>/api/<path>`, then selected and enabled via JSON-RPC `property.set`.
- Best practice: wait for `property.set` confirmation before issuing the next `property.set` on the same property.
- Source names are translated to object names by removing non-word chars and lowercasing (e.g. `DisplayPort 1` -> `displayport1`).

<!-- UNRESOLVED: source is the generic Barco Pulse API manual; the GC Lens 102 136 model name does not appear anywhere. Model-specific feature availability, lens motor ranges, supported resolutions, and connector inventory must be confirmed via live `introspect`. Voltage, current, and power specifications are not stated. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-04T06:08:09.418Z
last_checked_at: 2026-08-05T08:05:40.841Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:05:40.841Z
matched_actions: 81
action_count: 81
confidence: medium
summary: "Spec action literals (JSON-RPC methods/properties and HTTP endpoints) match source verbatim; transport port 9090 and serial 19200/8/N/1 match. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes Barco Pulse API in general, not the GC Lens 102 136 model specifically. Model-specific commands, lens options, and feature availability must be discovered via JSON-RPC introspection on the live device."
- "source defines no explicit multi-step macros. Common compositions:"
- "source is the generic Barco Pulse API manual; the GC Lens 102 136 model name does not appear anywhere. Model-specific feature availability, lens motor ranges, supported resolutions, and connector inventory must be confirmed via live `introspect`. Voltage, current, and power specifications are not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
