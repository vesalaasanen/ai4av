---
spec_id: admin/barco-egpu
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Egpu Control Spec"
manufacturer: Barco
model_family: "Barco Egpu"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Egpu"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:29:11.677Z
last_checked_at: 2026-08-05T07:29:18.514Z
generated_at: 2026-08-05T07:29:18.514Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device model \"Egpu\" not explicitly named in source; inferred from prompt context. Source actually titles itself as the Pulse API command catalog for Pulse projectors generally."
  - "section omitted - every settable parameter from the source is already represented as a dedicated action above (per the granularity rule that one named property counts as one action)."
  - "no explicit multi-step sequences described in source."
  - "source recommends verifying system.state is \"standby\" or \"ready\" before poweron, and \"on\" before poweroff; not enforced as an interlock by the device. No explicit safety warnings, interlocks, or power-on sequencing requirements beyond this practice."
  - "device model name \"Egpu\" not stated in source PDF; inferred from prompt. Source describes \"Pulse projectors\" generically."
  - "firmware version compatibility ranges not stated."
  - "voltage/current/power specs intentionally omitted (Tier 3)."
verification:
  verdict: verified
  checked_at: 2026-08-05T07:29:18.514Z
  matched_actions: 86
  action_count: 86
  confidence: medium
  summary: "All 86 spec actions map verbatim to JSON-RPC methods and endpoints documented in the Barco Pulse API catalog; transport parameters (port 9090, 19200 8N1) appear in source. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-23
---

# Barco Egpu Control Spec

## Summary
Barco Pulse API control spec for the Barco Egpu projector. JSON-RPC 2.0 over TCP/IP on port 9090, or RS-232 serial at 19200 baud, 8N1, no flow control. Methods cover power, source selection, picture settings, illumination, warping, blending, environment telemetry, optics, DMX, and firmware management.

<!-- UNRESOLVED: device model "Egpu" not explicitly named in source; inferred from prompt context. Source actually titles itself as the Pulse API command catalog for Pulse projectors generally. -->

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
  type: optional  # inferred: source states authentication "can be skipped" for normal end user access; only required for elevated access levels
```

## Traits
```yaml
- powerable       # inferred from system.poweron / system.poweroff commands
- routable        # inferred from image.window.main.source (source selection) commands
- queryable       # inferred from property.get / property.subscribe query examples
- levelable       # inferred from illumination.sources.laser.power, image.brightness, image.contrast, image.gamma, image.saturation, image.sharpness
```

## Actions
```yaml
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []

- id: system_state_get
  label: Get System State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'
  params: []

- id: system_state_subscribe
  label: Subscribe System State Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"}}'
  params: []

- id: system_standby_enable_set
  label: Set Standby Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{value}}}'
  params:
    - name: value
      type: boolean

- id: system_eco_enable_set
  label: Set ECO Mode Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{value}}}'
  params:
    - name: value
      type: boolean

- id: authenticate
  label: Authenticate (Elevated Access)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":{code}}}'
  params:
    - name: code
      type: integer
      description: Secret pass code for elevated access level

- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"{led}","color":"{color}","period":{period}}}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. systemstatus)
    - name: color
      type: string
      description: LED color (e.g. red)
    - name: period
      type: integer
      description: Blink period

- id: property_set
  label: Set Property Value
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation (e.g. image.brightness)
    - name: value
      type: any
      description: Value to assign (type depends on property)

- id: property_get
  label: Get Property Value
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string

- id: property_get_multiple
  label: Get Multiple Property Values
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{property1}","{property2}"]}}'
  params:
    - name: property1
      type: string
    - name: property2
      type: string

- id: property_subscribe
  label: Subscribe To Property Changes (Single)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string

- id: property_subscribe_multiple
  label: Subscribe To Property Changes (Multiple)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["{property1}","{property2}"]}}'
  params:
    - name: property1
      type: string
    - name: property2
      type: string

- id: property_unsubscribe
  label: Unsubscribe From Property (Single)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string

- id: property_unsubscribe_multiple
  label: Unsubscribe From Properties (Multiple)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["{property1}","{property2}"]}}'
  params:
    - name: property1
      type: string
    - name: property2
      type: string

- id: signal_subscribe
  label: Subscribe To Signal (Single)
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name in dot notation (e.g. modelupdated)

- id: signal_subscribe_multiple
  label: Subscribe To Signals (Multiple)
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["{signal1}","{signal2}"]}}'
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

- id: signal_unsubscribe
  label: Unsubscribe From Signal (Single)
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string

- id: signal_unsubscribe_multiple
  label: Unsubscribe From Signals (Multiple)
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["{signal1}","{signal2}"]}}'
  params:
    - name: signal1
      type: string
    - name: signal2
      type: string

- id: introspect
  label: Introspect Object (Recursive Form)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":true}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation

- id: introspect_positional
  label: Introspect Object (Positional Form)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":["{object}",false]}'
  params:
    - name: object
      type: string

- id: introspect_non_recursive
  label: Introspect Object (Non-recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":false}}'
  params:
    - name: object
      type: string

- id: image_window_main_source_set
  label: Set Active Window Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{value}"}}'
  params:
    - name: value
      type: string
      description: Source name (e.g. DisplayPort 1, HDMI, DVI 1, DVI 2, DisplayPort 2, Dual DVI, Dual DisplayPort, Dual Head DVI, Dual Head DisplayPort, HDBaseT, SDI)

- id: image_window_main_source_get
  label: Get Active Window Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}'
  params: []

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []

- id: image_source_connectors_list
  label: List Connectors For Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{source}.listconnectors"}'
  params:
    - name: source
      type: string
      description: Source object name in dot notation (e.g. displayport1)

- id: image_connector_detectedsignal_get
  label: Get Connector Detected Signal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connector}.detectedsignal"}}'
  params:
    - name: connector
      type: string
      description: Connector object name (e.g. displayport1)

- id: image_window_main_position_set
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":{x},"y":{y}}}}'
  params:
    - name: x
      type: integer
    - name: y
      type: integer

- id: image_window_main_size_set
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":{width},"height":{height}}}}'
  params:
    - name: width
      type: integer
    - name: height
      type: integer

- id: image_window_main_scalingmode_set
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"{value}"}}'
  params:
    - name: value
      type: string
      description: One of Fill, OneToOne, FillScreen, Stretch

- id: image_brightness_set
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}}}'
  params:
    - name: value
      type: float
      description: -1 to 1; 0 default, 1 = 100% offset

- id: image_brightness_get
  label: Get Image Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"}}'
  params: []

- id: image_contrast_set
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{value}}}'
  params:
    - name: value
      type: float
      description: 0 to 2; 1 default

- id: image_gamma_set
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{value}}}'
  params:
    - name: value
      type: float
      description: 1 to 3; default 2.2

- id: image_saturation_set
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{value}}}'
  params:
    - name: value
      type: float
      description: 0 to 2; 1 default

- id: image_sharpness_set
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}}}'
  params:
    - name: value
      type: integer
      description: -2 to 8

- id: image_orientation_set
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"{value}"}}'
  params:
    - name: value
      type: string
      description: One of DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR

- id: image_processing_warp_enable_set
  label: Enable Warp Globally
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":{value}}}'
  params:
    - name: value
      type: boolean

- id: warp_file_upload
  label: Upload Warp File
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{address}/api/image/processing/warp/file/transfer'
  params:
    - name: filename
      type: string
      description: Local warp grid file (XML, MCM500/400 format)
    - name: address
      type: string
      description: Projector IP address

- id: image_processing_warp_file_selected_set
  label: Select Active Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{value}"}}'
  params:
    - name: value
      type: string

- id: image_processing_warp_file_enable_set
  label: Enable Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":{value}}}'
  params:
    - name: value
      type: boolean

- id: blend_mask_upload
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{address}/api/image/processing/blend/file/transfer'
  params:
    - name: filename
      type: string
      description: PNG/JPEG/TIFF grayscale image, 8 or 16 bit; must match blend layer resolution
    - name: address
      type: string

- id: image_processing_blend_file_selected_set
  label: Select Blend Files
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":["{value1}"]}}'
  params:
    - name: value1
      type: string

- id: image_processing_blend_file_enable_set
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":{value}}}'
  params:
    - name: value
      type: boolean

- id: blacklevel_mask_upload
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{address}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: filename
      type: string
      description: PNG/JPEG/TIFF grayscale image, 8 or 16 bit
    - name: address
      type: string

- id: image_processing_blacklevel_file_selected_set
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{value}"}}'
  params:
    - name: value
      type: string

- id: image_processing_blacklevel_file_enable_set
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":{value}}}'
  params:
    - name: value
      type: boolean

- id: illumination_state_get
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'
  params: []

- id: illumination_state_subscribe
  label: Subscribe Illumination State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"}}'
  params: []

- id: illumination_sources_list
  label: List Illumination Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"illumination.sources","recursive":false}}'
  params: []

- id: illumination_laser_power_get
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}'
  params: []

- id: illumination_laser_power_set
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{value}}}'
  params:
    - name: value
      type: integer
      description: Target power in percent

- id: illumination_laser_minpower_get
  label: Get Laser Minimum Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}'
  params: []

- id: illumination_laser_maxpower_get
  label: Get Laser Maximum Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"}}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO At Current Light Level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

- id: environment_temperatures_get
  label: Get Temperature Sensors
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"}}'
  params: []

- id: environment_fanspeeds_get
  label: Get Fan Speeds
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Speed"}}'
  params: []

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
  params:
    - name: type
      type: string
      description: One of Sensor, Filter, Controller, Actuator, Alarm, GenericBlock
    - name: valuetype
      type: string
      description: One of Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

- id: environment_alarmstate_get
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'
  params: []

- id: optics_shutter_position_get
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'
  params: []

- id: optics_shutter_target_set
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"{value}"}}'
  params:
    - name: value
      type: string
      description: Open or Closed

- id: optics_zoom_position_get
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"}}'
  params: []

- id: optics_focus_position_get
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"}}'
  params: []

- id: optics_lensshift_horizontal_get
  label: Get Horizontal Lens Shift Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"}}'
  params: []

- id: optics_lensshift_vertical_get
  label: Get Vertical Lens Shift Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"}}'
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []

- id: dmx_mode_set
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"{value}"}}'
  params:
    - name: value
      type: string

- id: dmx_mode_get
  label: Get DMX Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.mode"}}'
  params: []

- id: dmx_startchannel_set
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{value}}}'
  params:
    - name: value
      type: integer
      description: 1 to 512

- id: dmx_startchannel_get
  label: Get DMX Start Channel
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.startchannel"}}'
  params: []

- id: dmx_shutdown_set
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{value}}}'
  params:
    - name: value
      type: boolean

- id: dmx_shutdown_get
  label: Get DMX Shutdown
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.shutdown"}}'
  params: []

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []

- id: network_lan_ip4config_get
  label: Get LAN IPv4 Config
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"}}'
  params: []

- id: network_lan_state_get
  label: Get LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'
  params: []

- id: image_color_p7_custom_copypresettocustom
  label: P7 Copy Preset To Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: P7 Reset Preset To Defaults
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: P7 Reset To Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle To Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

- id: eco_mode_wake_serial
  label: Wake Projector From ECO Mode (Serial)
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

- id: image_window_main_source
  type: string

- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: illumination_sources_laser_power
  type: integer
  description: Target power in percent

- id: illumination_sources_laser_minpower
  type: integer
  description: Minimum power in percent

- id: illumination_sources_laser_maxpower
  type: integer
  description: Maximum power in percent

- id: image_brightness
  type: float
  description: Normalized; -1 to 1; 0 default

- id: image_contrast
  type: float
  description: Normalized; 0 to 2; 1 default

- id: image_gamma
  type: float
  description: 1 to 3; default 2.2

- id: image_saturation
  type: float
  description: Normalized; 0 to 2; 1 default

- id: image_sharpness
  type: integer
  description: -2 to 8

- id: image_window_main_position
  type: object
  description: { x: int, y: int }

- id: image_window_main_size
  type: object
  description: { width: int, height: int }

- id: image_connector_detectedsignal
  type: object
  description: Includes active, name, resolution/timing fields, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: optics_shutter_position
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

- id: network_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: network_lan_ip4config
  type: object
  description: { Address: string, Mask: string, Gateway: string, NameServers: string }

- id: dmx_mode
  type: string

- id: dmx_startchannel
  type: integer
  description: 1 to 512

- id: dmx_shutdown
  type: boolean

- id: environment_temperatures
  type: object
  description: Dictionary of sensor name -> temperature (Celsius)

- id: environment_fanspeeds
  type: object
  description: Dictionary of fan name -> tachometer reading

- id: firmware_component_status
  type: enum
  values: [Unknown, OK, Upgradable]
```

## Variables
```yaml
# UNRESOLVED: section omitted - every settable parameter from the source is already represented as a dedicated action above (per the granularity rule that one named property counts as one action).
```

## Events
```yaml
- id: property_changed
  description: Notification delivered when a subscribed property value changes. Payload: { "jsonrpc":"2.0", "method":"property.changed", "params": { "property": [ { "name": value } ] } }

- id: signal_callback
  description: Notification delivered when a subscribed signal is emitted. Payload: { "jsonrpc":"2.0", "method":"signal.callback", "params": { "signal": [ { "signalname": { arg1: ..., arg2: ... } } ] } }

- id: modelupdated
  description: Signal emitted when object structure changes (objects added/removed)

- id: introspect_objectchanged
  description: Introspection signal with arguments { object: string, isnew: bool }
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - system_poweroff
  - system_poweron
interlocks: []
# UNRESOLVED: source recommends verifying system.state is "standby" or "ready" before poweron, and "on" before poweroff; not enforced as an interlock by the device. No explicit safety warnings, interlocks, or power-on sequencing requirements beyond this practice.
```

## Notes
- Pulse API uses JSON-RPC 2.0 over TCP port 9090 OR RS-232 at 19200 baud 8N1. Same command set for both transports.
- Property parameters are passed by name (order does not matter).
- Best practice: wait for `property.set` confirmation before setting the same property again.
- "params" member may be omitted for methods that take no arguments; ignored if present.
- `system.poweron` / `system.poweroff` return null; errors come in `error` member.
- ECO-mode wake requires Wake-on-LAN (MAC address), physical power button, or serial `:POWR1\r`.
- Source-to-object-name translation: remove non-word chars, lowercase (e.g. "DisplayPort 1" -> "displayport1").
- File endpoint base URL: `http://<address>/api/...` (not the same as JSON-RPC port).
- API surface is dynamic: introspection is the canonical way to discover available objects/methods/properties/signals for a specific projector configuration.
<!-- UNRESOLVED: device model name "Egpu" not stated in source PDF; inferred from prompt. Source describes "Pulse projectors" generically. -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated. -->
<!-- UNRESOLVED: voltage/current/power specs intentionally omitted (Tier 3). -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:29:11.677Z
last_checked_at: 2026-08-05T07:29:18.514Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T07:29:18.514Z
matched_actions: 86
action_count: 86
confidence: medium
summary: "All 86 spec actions map verbatim to JSON-RPC methods and endpoints documented in the Barco Pulse API catalog; transport parameters (port 9090, 19200 8N1) appear in source. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device model \"Egpu\" not explicitly named in source; inferred from prompt context. Source actually titles itself as the Pulse API command catalog for Pulse projectors generally."
- "section omitted - every settable parameter from the source is already represented as a dedicated action above (per the granularity rule that one named property counts as one action)."
- "no explicit multi-step sequences described in source."
- "source recommends verifying system.state is \"standby\" or \"ready\" before poweron, and \"on\" before poweroff; not enforced as an interlock by the device. No explicit safety warnings, interlocks, or power-on sequencing requirements beyond this practice."
- "device model name \"Egpu\" not stated in source PDF; inferred from prompt. Source describes \"Pulse projectors\" generically."
- "firmware version compatibility ranges not stated."
- "voltage/current/power specs intentionally omitted (Tier 3)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
