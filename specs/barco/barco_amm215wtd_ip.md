---
spec_id: admin/barco-amm215wtd
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Amm215Wtd Control Spec"
manufacturer: Barco
model_family: "Barco Amm215Wtd"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Amm215Wtd"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T18:15:01.709Z
last_checked_at: 2026-10-07T11:17:52.876Z
generated_at: 2026-10-07T11:17:52.876Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device-specific availability for many properties/methods is dynamic and depends on configuration; verify with introspection on the actual unit."
  - "auth.code is a user-configured secret in source (example 98765 shown); actual value/format not standardized."
  - "source provides no explicit safety warnings, interlock procedures, or power-on sequencing requirements beyond the user-level best-practice notes about verifying state before power-on/power-off."
  - "firmware version compatibility ranges not stated; voltage/current/power specs not stated and intentionally omitted; binary encodings and protocol version numbers not stated."
verification:
  verdict: verified
  checked_at: 2026-10-07T11:17:52.876Z
  matched_actions: 83
  action_count: 83
  confidence: medium
  summary: "All 83 actions have literal counterparts in the Pulse API source and transport values (9090, 19200 8N1, passcode auth) are supported. Source applicability is generic Pulse, not model-specific. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco Amm215Wtd Control Spec

## Summary
Control spec for Barco Pulse-platform projectors (model Amm215Wtd family) via JSON-RPC 2.0 over TCP/IP port 9090 and RS-232 serial. Covers power, source selection, illumination, image properties, warping, blending, black-level correction, DMX, optics, environment telemetry, firmware management, and introspection.

<!-- UNRESOLVED: device-specific availability for many properties/methods is dynamic and depends on configuration; verify with introspection on the actual unit. -->

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
  type: passcode  # source: authenticate method with code param; optional for normal end-user access
  notes: "Authentication not required for normal end-user access. Use authenticate method with params.code (example shown: 98765) for higher access levels."
```

<!-- UNRESOLVED: auth.code is a user-configured secret in source (example 98765 shown); actual value/format not standardized. -->

## Traits
```yaml
- powerable      # inferred from system.poweron/system.poweroff methods
- routable       # inferred from image.window.main.source and connector-list methods
- queryable      # inferred from property.get method and multiple sensor queries
- levelable      # inferred from illumination.sources.laser.power and picture settings (brightness, contrast, gamma, saturation, sharpness)
- introspectable # inferred from introspect method
- subscribable   # inferred from property.subscribe / signal.subscribe methods
```

## Actions
```yaml
# Authentication
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765},"id":1}'
  params:
    - name: code
      type: integer
      description: Secret pass code for elevated access (example value: 98765). Omit for normal end-user access.

# Method invocation
- id: led_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42},"id":3}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. "systemstatus")
    - name: color
      type: string
      description: LED color (e.g. "red")
    - name: period
      type: integer
      description: Blink period (units UNRESOLVED)

# Properties - read/write
- id: property_set
  label: Set Property Value
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"objectname.propertyname","value":100},"id":3}'
  params:
    - name: property
      type: string
      description: Property path in dot notation
    - name: value
      type: string
      description: Value to set

- id: property_get
  label: Get Property Value
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"objectname.propertyname"},"id":4}'
  params:
    - name: property
      type: string
      description: Property path in dot notation

- id: property_get_multi
  label: Get Multiple Property Values
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["image.brightness","image.contrast"]},"id":5}'
  params:
    - name: property
      type: array
      description: List of property paths

- id: property_subscribe
  label: Subscribe to One Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"},"id":6}'
  params:
    - name: property
      type: string
      description: Property path to observe

- id: property_subscribe_multi
  label: Subscribe to Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["image.brightness","image.contrast"]},"id":7}'
  params:
    - name: property
      type: array
      description: List of property paths

- id: property_unsubscribe
  label: Unsubscribe from One Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"image.brightness"},"id":8}'
  params:
    - name: property
      type: string
      description: Property path to stop observing

- id: property_unsubscribe_multi
  label: Unsubscribe from Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["image.brightness","image.contrast"]},"id":9}'
  params:
    - name: property
      type: array
      description: List of property paths

- id: signal_subscribe
  label: Subscribe to One Signal
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
  label: Unsubscribe from One Signal
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
- id: introspect
  label: Introspect Object
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"foo","recursive":true},"id":1}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (default empty = all)
    - name: recursive
      type: boolean
      description: If false, only one level listed

- id: introspect_alt
  label: Introspect Object (positional)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":["foo",true],"id":1}'
  params:
    - name: object
      type: string
      description: Object name
    - name: recursive
      type: boolean
      description: Recursive flag

# Power / system state
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron","params":{"property":"system.state"},"id":3}'
  notes: "Best practice: verify state is 'standby' or 'ready' before issuing."

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff","params":{"property":"system.state"},"id":4}'
  notes: "Best practice: verify state is 'on' before issuing."

- id: system_state_get
  label: Get Projector State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":1}'
  notes: "Returns one of: boot, eco, standby, ready, conditioning, on, deconditioning, service, error."

- id: system_state_subscribe
  label: Subscribe to Projector State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"},"id":2}'

# Sources / connectors
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list","id":1}'

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'

- id: image_window_main_source_get
  label: Get Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"},"id":0}'

- id: image_window_main_source_set
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"},"id":2}'
  params:
    - name: value
      type: string
      description: Source name (e.g. "DisplayPort 1", "HDMI", obtained from image.source.list)

- id: image_window_main_source_subscribe
  label: Subscribe to Source Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.window.main.source"},"id":6}'

- id: image_source_list_connectors
  label: List Source Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.displayport1.listconnectors","id":4}'
  params:
    - name: source_object
      type: string
      description: Source object name (lowercase, no non-word chars; e.g. "displayport1")

- id: image_connector_detected_signal_get
  label: Get Connector Detected Signal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.displayport1.detectedsignal"},"id":5}'
  params:
    - name: connector_property
      type: string
      description: Connector property path (e.g. "image.connector.displayport1.detectedsignal")

# Illumination
- id: illumination_state_get
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":0}'

- id: illumination_state_subscribe
  label: Subscribe to Illumination State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"},"id":1}'

- id: illumination_sources_list
  label: List Illumination Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"illumination.sources","recursive":false},"id":2}'

- id: illumination_laser_power_get
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":3}'

- id: illumination_laser_power_subscribe
  label: Subscribe to Laser Power Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["illumination.sources.laser.power"]},"id":4}'

- id: illumination_laser_power_set
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":40},"id":5}'
  params:
    - name: value
      type: integer
      description: Target power in percent

- id: illumination_laser_minpower_get
  label: Get Minimum Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":6}'

- id: illumination_laser_maxpower_get
  label: Get Maximum Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"},"id":5}'
  notes: "The source API reference identifies maxpower as the maximum-power property."

- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage","id":1}'

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber","id":1}'

# Picture settings
- id: image_brightness_get
  label: Get Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":7}'

- id: image_brightness_subscribe
  label: Subscribe to Brightness Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["image.brightness"]},"id":8}'

- id: image_brightness_set
  label: Set Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":0.15},"id":9}'
  params:
    - name: value
      type: number
      description: Normalized brightness/offset (-1 to 1, 0 default)

- id: image_contrast_set
  label: Set Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":1.0},"id":9}'
  params:
    - name: value
      type: number
      description: Normalized contrast/gain (0 to 2, 1 default)

- id: image_gamma_set
  label: Set Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":2.2},"id":9}'
  params:
    - name: value
      type: number
      description: Gamma (1 to 3, 2.2 default)

- id: image_saturation_set
  label: Set Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":1.0},"id":9}'
  params:
    - name: value
      type: number
      description: Normalized saturation (0 to 2, 1 default)

- id: image_sharpness_set
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":0},"id":9}'
  params:
    - name: value
      type: integer
      description: Normalized sharpness (-2 to 8, 0 default)

- id: image_orientation_set
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"DESKTOP_FRONT"},"id":9}'
  params:
    - name: value
      type: string
      enum: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_window_main_position_set
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":0,"y":0}},"id":9}'
  params:
    - name: value
      type: object
      description: "Position object: {x:int, y:int}"

- id: image_window_main_size_set
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":1920,"height":1080}},"id":9}'
  params:
    - name: value
      type: object
      description: "Size object: {width:int, height:int}"

- id: image_window_main_scalingmode_set
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"Fill"},"id":9}'
  params:
    - name: value
      type: string
      enum: [Fill, OneToOne, FillScreen, Stretch]

# Warping
- id: warp_enable
  label: Enable Warp Globally
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true},"id":10}'
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
    - name: file
      type: string
      description: Local path to warp XML file

- id: warp_file_select
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"},"id":11}'
  params:
    - name: value
      type: string
      description: File name (e.g. "warp.xml")

- id: warp_file_enable
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":12}'
  params:
    - name: value
      type: boolean

# Blending
- id: blend_file_upload
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address
    - name: file
      type: string
      description: Local path to mask PNG (8 or 16 bit grayscale)

- id: blend_file_select
  label: Select Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"mask.png"},"id":13}'
  params:
    - name: value
      type: string
      description: File name

- id: blend_file_enable
  label: Enable Blend Mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":14}'
  params:
    - name: value
      type: boolean

# Black level
- id: blacklevel_file_upload
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address
    - name: file
      type: string
      description: Local path to black-level PNG (8 or 16 bit grayscale)

- id: blacklevel_file_select
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"},"id":15}'
  params:
    - name: value
      type: string
      description: File name

- id: blacklevel_file_enable
  label: Enable Black Level Mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":16}'
  params:
    - name: value
      type: boolean

# DMX
- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels","id":1}'

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes","id":1}'

- id: dmx_mode_set
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"basic"},"id":1}'
  params:
    - name: value
      type: string
      description: Mode name (from dmx.listmodes)

- id: dmx_startchannel_set
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":1},"id":1}'
  params:
    - name: value
      type: integer
      description: Start channel 1 to 512

- id: dmx_shutdown_set
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":false},"id":1}'
  params:
    - name: value
      type: boolean

# Environment
- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"},"id":18}'
  params:
    - name: type
      type: string
      enum: [Sensor, Filter, Controller, Actuator, Alarm, GenericBlock]
    - name: valuetype
      type: string
      enum: [Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any]

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo","id":1}'

- id: environment_alarmstate_get
  label: Get Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"},"id":1}'

# Network
- id: network_lan_ip4config_get
  label: Get LAN IPv4 Config
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"},"id":1}'

- id: network_lan_state_get
  label: Get LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"},"id":1}'

# Optics
- id: optics_shutter_position_get
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"},"id":1}'

- id: optics_shutter_target_set
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"Open"},"id":1}'
  params:
    - name: value
      type: string
      enum: [Open, Closed]

- id: optics_zoom_position_get
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"},"id":1}'

- id: optics_focus_position_get
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"},"id":1}'

- id: optics_lensshift_horizontal_position_get
  label: Get Horizontal Lens Shift Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"},"id":1}'

- id: optics_lensshift_vertical_position_get
  label: Get Vertical Lens Shift Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"},"id":1}'

# System power-state enable flags
- id: system_standby_enable_set
  label: Enable Standby State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":true},"id":1}'
  params:
    - name: value
      type: boolean
      description: Check availability first via introspection

- id: system_eco_enable_set
  label: Enable ECO State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":true},"id":1}'
  params:
    - name: value
      type: boolean
      description: Check availability first via introspection

# Firmware
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents","id":1}'

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus","id":1}'

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade","id":1}'

# Color presets (P7)
- id: p7_custom_copypresettocustom
  label: P7 Copy Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"Preset1"},"id":1}'
  params:
    - name: presetname
      type: string

- id: p7_custom_resetpreset
  label: P7 Reset Preset to Defaults
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"Preset1"},"id":1}'
  params:
    - name: presetname
      type: string

- id: p7_custom_resettonative
  label: P7 Reset to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative","id":1}'

# RGB mode
- id: rgbmode_nextrgbmode
  label: Cycle to Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode","id":1}'

# ECO wake-up serial escape
- id: wake_from_eco_serial
  label: Wake from ECO (Serial)
  kind: action
  command: ':POWR1\r'
  notes: "ASCII characters sent on RS-232 to wake a projector in ECO mode. CR terminator."
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]

- id: illumination_state
  type: enum
  values: ["On", "Off"]

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: network_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: optics_shutter_position
  type: enum
  values: [Open, Closed]

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_brightness
  type: number
  description: Normalized brightness (-1 to 1, step 0.01)

- id: image_contrast
  type: number
  description: Normalized contrast (0 to 2, step 0.01)

- id: image_gamma
  type: number
  description: Gamma (1 to 3, step 0.1)

- id: image_saturation
  type: number
  description: Normalized saturation (0 to 2, step 0.01)

- id: image_sharpness
  type: integer
  description: Normalized sharpness (-2 to 8)

- id: illumination_laser_power
  type: integer
  description: Target laser power in percent

- id: optics_zoom_position
  type: integer

- id: optics_focus_position
  type: integer

- id: optics_lensshift_horizontal_position
  type: integer

- id: optics_lensshift_vertical_position
  type: integer

- id: dmx_startchannel
  type: integer
  description: 1 to 512

- id: dmx_shutdown
  type: boolean

- id: environment_temperature_snapshot
  type: object
  description: Dictionary from environment.getcontrolblocks (type=Sensor, valuetype=Temperature) keyed by sensor name (e.g. environment.laser.board0.bank0.temperature) with float °C value.

- id: environment_fan_speed_snapshot
  type: object
  description: Dictionary from environment.getcontrolblocks (type=Sensor, valuetype=Speed) keyed by fan name (e.g. environment.fan.ar1.tacho) with float RPM value.
```

## Variables
```yaml
- id: image_window_main_source
  type: string
  description: Active source name (e.g. "DisplayPort 1")
  settable: true

- id: image_window_main_position
  type: object
  description: "{x:int, y:int}"
  settable: true

- id: image_window_main_size
  type: object
  description: "{width:int, height:int}"
  settable: true

- id: image_window_main_scalingmode
  type: string
  description: "Fill | OneToOne | FillScreen | Stretch"
  settable: true

- id: illumination_sources_laser_power
  type: integer
  description: Target laser power in percent (RW)
  settable: true

- id: illumination_sources_laser_minpower
  type: integer
  description: Min laser power in percent (RO)

- id: illumination_sources_laser_maxpower
  type: integer
  description: Max laser power in percent (RO)

- id: system_standby_enable
  type: boolean
  description: Enable standby state. Check availability first.
  settable: true

- id: system_eco_enable
  type: boolean
  description: Enable ECO state. Check availability first.
  settable: true

- id: image_processing_warp_enable
  type: boolean
  description: Globally enable all warp functions
  settable: true

- id: image_processing_warp_file_enable
  type: boolean
  description: Enable file-based warp
  settable: true

- id: image_processing_warp_file_selected
  type: string
  description: Currently selected warp file name
  settable: true

- id: image_processing_blend_file_enable
  type: boolean
  description: Enable blend mask
  settable: true

- id: image_processing_blend_file_selected
  type: array
  description: List of selected blend file names
  settable: true

- id: image_processing_blacklevel_file_enable
  type: boolean
  description: Enable black-level correction mask
  settable: true

- id: image_processing_blacklevel_file_selected
  type: string
  description: Currently selected black-level file name
  settable: true

- id: dmx_mode
  type: string
  description: Current DMX mode (use dmx.listmodes to enumerate)
  settable: true

- id: network_device_lan_ip4config
  type: object
  description: "{Address:string, Mask:string, Gateway:string, NameServers:string}"
  settable: false
```

## Events
```yaml
- id: property_changed
  direction: server-to-client
  description: Sent whenever a subscribed property changes. Payload: {"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"path":value}, ...]}}
  notes: "Notifications have no id and require no response."

- id: signal_callback
  direction: server-to-client
  description: Sent whenever a subscribed signal is emitted. Payload: {"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"name":args}, ...]}}
  notes: "Notifications have no id and require no response."

- id: modelupdated
  direction: server-to-client
  description: Signal emitted when object structure changes (objects added/removed). Subscribed via signal.subscribe.

- id: introspect_objectchanged
  direction: server-to-client
  description: Signal emitted when a specific object is added or lost. Args: {object:string, isnew:bool}
```

## Macros
```yaml
# No explicit multi-step sequences described in source beyond the application-level
# workflows shown for warp upload, blend upload, and black-level upload.
- id: warp_upload_workflow
  label: Upload + Activate Warp File
  steps:
    - action: warp_file_upload
    - action: warp_file_select
    - action: warp_file_enable
  notes: "Source describes this as a programmer-guide example sequence."

- id: blend_upload_workflow
  label: Upload + Activate Blend Mask
  steps:
    - action: blend_file_upload
    - action: blend_file_select
    - action: blend_file_enable
  notes: "Mask must match blend layer resolution (per source table)."

- id: blacklevel_upload_workflow
  label: Upload + Activate Black Level Mask
  steps:
    - action: blacklevel_file_upload
    - action: blacklevel_file_select
    - action: blacklevel_file_enable

- id: eco_wake_workflow
  label: Wake Projector from ECO
  description: Three equivalent ways per source.
  options:
    - Send Wake-on-LAN packet using the projector's MAC address
    - Use the power button on the remote control or keypad
    - Send ":POWR1\r" on the RS-232 serial port
```

## Safety
```yaml
confirmation_required_for:
  - system.poweroff
  - firmware.schedulecomponentupgrade
interlocks: []
<!-- UNRESOLVED: source provides no explicit safety warnings, interlock procedures, or power-on sequencing requirements beyond the user-level best-practice notes about verifying state before power-on/power-off. -->
```

## Notes
- All JSON-RPC commands are text-based; either transport (TCP/9090 or RS-232/19200) accepts the same commands per the source.
- The `:POWR1\r` ASCII serial escape is documented as a special ECO-wake command; do not confuse with the JSON-RPC `system.poweron` invocation.
- Many properties are dynamic and depend on the projector configuration and installed peripherals (e.g. DMX channels, motorized lens features). Always introspect the live device to confirm presence.
- Authentication is optional for normal end-user access; only required for elevated operations. The `code` value in the example payload (98765) is illustrative only — actual codes are user-configured on the device.
- Best practice from source: verify `system.state` is `standby`/`ready` before `system.poweron`, and `on` before `system.poweroff`.
- Best practice from source: wait for `property.set` confirmation before issuing another `set` on the same property to avoid server flooding.
<!-- UNRESOLVED: firmware version compatibility ranges not stated; voltage/current/power specs not stated and intentionally omitted; binary encodings and protocol version numbers not stated. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T18:15:01.709Z
last_checked_at: 2026-10-07T11:17:52.876Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T11:17:52.876Z
matched_actions: 83
action_count: 83
confidence: medium
summary: "All 83 actions have literal counterparts in the Pulse API source and transport values (9090, 19200 8N1, passcode auth) are supported. Source applicability is generic Pulse, not model-specific. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device-specific availability for many properties/methods is dynamic and depends on configuration; verify with introspection on the actual unit."
- "auth.code is a user-configured secret in source (example 98765 shown); actual value/format not standardized."
- "source provides no explicit safety warnings, interlock procedures, or power-on sequencing requirements beyond the user-level best-practice notes about verifying state before power-on/power-off."
- "firmware version compatibility ranges not stated; voltage/current/power specs not stated and intentionally omitted; binary encodings and protocol version numbers not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
