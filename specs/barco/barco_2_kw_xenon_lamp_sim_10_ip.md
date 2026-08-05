---
spec_id: admin/barco-2kw-xenon-lamp-sim-10
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco 2 Kw Xenon Lamp Sim 10 Control Spec"
manufacturer: Barco
model_family: "Barco 2 Kw Xenon Lamp Sim 10"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco 2 Kw Xenon Lamp Sim 10"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:49:14.329Z
last_checked_at: 2026-07-21T20:34:47.434Z
generated_at: 2026-07-21T20:34:47.434Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "illumination source name (laser vs xenon) depends on projector variant; the doc shows laser examples"
  - "source does not document long-lived settable variables separate from property.set"
  - "source does not document device-defined multi-step macros"
  - "source mentions \"verify that the projector state is either standby or ready before issuing the power on command\" as good practice but does not document hardware interlocks"
  - "firmware version compatibility not stated; voltage/current/fault recovery not stated; auth passcode source/format not stated"
verification:
  verdict: verified
  checked_at: 2026-07-21T20:34:47.434Z
  matched_actions: 92
  action_count: 92
  confidence: medium
  summary: "All 92 spec actions verified against source methods, properties, and transport; full coverage confirmed. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco 2 Kw Xenon Lamp Sim 10 Control Spec

## Summary
Pulse API control spec for Barco 2 Kw Xenon Lamp Sim 10 projector. JSON-RPC 2.0 over TCP/IP on port 9090, plus RS-232 serial at 19200 baud. Covers power, source selection, illumination, picture settings, warp/blend, optics, environment monitoring, DMX, firmware, and introspection.

<!-- UNRESOLVED: illumination source name (laser vs xenon) depends on projector variant; the doc shows laser examples -->

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
  type: passcode  # source documents authenticate method with "code" param
```

## Traits
```yaml
- powerable       # inferred from system.poweron / system.poweroff
- routable        # inferred from image.window.main.source selection
- queryable       # inferred from property.get examples
- levelable       # inferred from illumination power and image.brightness/contrast/saturation/gamma/sharpness
```

## Actions
```yaml
- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"id":1,"code":98765}}'
  params:
    - name: code
      type: integer
      description: Passcode for elevated access

- id: power_on
  label: Power On
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweron"}'
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: '{"jsonrpc":"2.0","method":"system.poweroff"}'
  params: []

- id: get_system_state
  label: Get System State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'
  params: []

- id: subscribe_system_state
  label: Subscribe System State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"}}'
  params: []

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"}}'
  params:
    - name: source
      type: string
      description: Source name (e.g. "DisplayPort 1", "HDMI")

- id: list_sources
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []

- id: list_source_connectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{source}.listconnectors"}'
  params:
    - name: source
      type: string
      description: Source object name (e.g. "displayport1" - non-word chars stripped, lowercased)

- id: get_connector_signal
  label: Get Connector Signal
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connector}.detectedsignal"}}'
  params:
    - name: connector
      type: string
      description: Connector object name

- id: subscribe_source_change
  label: Subscribe Source Change
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.window.main.source"}}'
  params: []

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'
  params: []

- id: subscribe_illumination_state
  label: Subscribe Illumination State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"}}'
  params: []

- id: introspect_illumination_sources
  label: Introspect Illumination Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"illumination.sources","recursive":false}}'
  params: []

- id: get_laser_power
  label: Get Illumination Source Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.{source}.power"}}'
  params:
    - name: source
      type: string
      description: Illumination source object name (e.g. "laser")

- id: set_laser_power
  label: Set Illumination Source Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.{source}.power","value":{value}}}'
  params:
    - name: source
      type: string
      description: Illumination source object name
    - name: value
      type: integer
      description: Target power in percent

- id: get_laser_min_power
  label: Get Illumination Source Min Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.{source}.minpower"}}'
  params:
    - name: source
      type: string
      description: Illumination source object name

- id: get_laser_max_power
  label: Get Illumination Source Max Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.{source}.maxpower"}}'
  params:
    - name: source
      type: string
      description: Illumination source object name

- id: clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: get_laser_serial
  label: Get Illumination Source Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

- id: introspect_image
  label: Introspect Image Service
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"image","recursive":false}}'
  params: []

- id: get_brightness
  label: Get Image Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"}}'
  params: []

- id: set_brightness
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized -1 to 1 (0 default)

- id: get_contrast
  label: Get Image Contrast
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.contrast"}}'
  params: []

- id: set_contrast
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized 0 to 2 (1 default)

- id: get_gamma
  label: Get Image Gamma
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.gamma"}}'
  params: []

- id: set_gamma
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{value}}}'
  params:
    - name: value
      type: float
      description: Gamma 1 to 3 (2.2 default)

- id: get_saturation
  label: Get Image Saturation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.saturation"}}'
  params: []

- id: set_saturation
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized 0 to 2 (1 default)

- id: get_sharpness
  label: Get Image Sharpness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.sharpness"}}'
  params: []

- id: set_sharpness
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}}}'
  params:
    - name: value
      type: integer
      description: Sharpness -2 to 8

- id: get_orientation
  label: Get Image Orientation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.orientation"}}'
  params: []

- id: set_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"{value}"}}'
  params:
    - name: value
      type: string
      description: One of DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR

- id: get_scaling_mode
  label: Get Window Scaling Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.scalingmode"}}'
  params: []

- id: set_scaling_mode
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"{value}"}}'
  params:
    - name: value
      type: string
      description: One of Fill, OneToOne, FillScreen, Stretch

- id: set_warp_enable
  label: Enable Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true}}'
  params: []

- id: upload_warp_file
  label: Upload Warp Grid File
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address
    - name: filename
      type: string
      description: Local warp XML file name

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string
      description: Warp file name

- id: enable_warp_file
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true}}'
  params: []

- id: upload_blend_mask
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address
    - name: filename
      type: string
      description: Local blend mask PNG file

- id: select_blend_file
  label: Select Blend Files
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string
      description: Blend mask file name

- id: enable_blend_file
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true}}'
  params: []

- id: upload_blacklevel_mask
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address
    - name: filename
      type: string
      description: Local black level PNG file

- id: select_blacklevel_file
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"}}'
  params:
    - name: filename
      type: string
      description: Black level file name

- id: enable_blacklevel_file
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true}}'
  params: []

- id: get_temperatures
  label: Get Temperature Sensors
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"}}'
  params: []

- id: get_fan_speeds
  label: Get Fan Speeds
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Speed"}}'
  params: []

- id: get_environment_blocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"{type}","valuetype":"{valuetype}"}}'
  params:
    - name: type
      type: string
      description: Block type (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock)
    - name: valuetype
      type: string
      description: Sensor value type (Temperature, Speed, PWM, Voltage, Current, Power, ...)

- id: get_alarm_state
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'
  params: []

- id: get_alarm_info
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

- id: get_shutter_position
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'
  params: []

- id: get_shutter_target
  label: Get Shutter Target
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.target"}}'
  params: []

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

- id: get_lensshift_h_position
  label: Get Lens Shift Horizontal Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"}}'
  params: []

- id: get_lensshift_v_position
  label: Get Lens Shift Vertical Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"}}'
  params: []

- id: get_network_ip4
  label: Get Network IPv4 Config
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"}}'
  params: []

- id: get_network_state
  label: Get Network State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'
  params: []

- id: get_standby_enable
  label: Get Standby Enable
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.standby.enable"}}'
  params: []

- id: set_standby_enable
  label: Set Standby Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":{value}}}'
  params:
    - name: value
      type: boolean
      description: Enable standby state

- id: get_eco_enable
  label: Get ECO Enable
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.eco.enable"}}'
  params: []

- id: set_eco_enable
  label: Set ECO Enable
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":{value}}}'
  params:
    - name: value
      type: boolean
      description: Enable ECO state

- id: led_blink
  label: Blink System Status LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"{color}","period":{period}}}'
  params:
    - name: color
      type: string
      description: LED color (e.g. red)
    - name: period
      type: integer
      description: Blink period

- id: introspect_object
  label: Introspect Object (Recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":true}}'
  params:
    - name: object
      type: string
      description: Object name (dot notation)

- id: introspect_object_one_level
  label: Introspect Object (One Level)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":false}}'
  params:
    - name: object
      type: string
      description: Object name (dot notation)

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
  params:
    - name: property
      type: string
      description: Object.property dot-notation name
    - name: value
      type: string
      description: Value (any basic or container type)

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Object.property dot-notation name

- id: property_get_multi
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{property1}","{property2}"]}}'
  params:
    - name: property1
      type: string
      description: First property name
    - name: property2
      type: string
      description: Second property name

- id: property_subscribe
  label: Subscribe to Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name to observe

- id: property_subscribe_multi
  label: Subscribe to Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["{property1}","{property2}"]}}'
  params:
    - name: property1
      type: string
      description: First property name
    - name: property2
      type: string
      description: Second property name

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name

- id: property_unsubscribe_multi
  label: Unsubscribe from Multiple Properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["{property1}","{property2}"]}}'
  params:
    - name: property1
      type: string
      description: First property name
    - name: property2
      type: string
      description: Second property name

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name

- id: signal_subscribe_multi
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["{signal1}","{signal2}"]}}'
  params:
    - name: signal1
      type: string
      description: First signal name
    - name: signal2
      type: string
      description: Second signal name

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name

- id: signal_unsubscribe_multi
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["{signal1}","{signal2}"]}}'
  params:
    - name: signal1
      type: string
      description: First signal name
    - name: signal2
      type: string
      description: Second signal name

- id: dmx_list_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

- id: dmx_list_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []

- id: get_dmx_mode
  label: Get DMX Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.mode"}}'
  params: []

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":"{value}"}}'
  params:
    - name: value
      type: string
      description: DMX mode name

- id: get_dmx_start_channel
  label: Get DMX Start Channel
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.startchannel"}}'
  params: []

- id: set_dmx_start_channel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":{value}}}'
  params:
    - name: value
      type: integer
      description: Start channel 1..512

- id: get_dmx_shutdown
  label: Get DMX Shutdown
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.shutdown"}}'
  params: []

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":{value}}}'
  params:
    - name: value
      type: boolean
      description: Enable DMX shutdown

- id: firmware_list_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: firmware_list_versions
  label: List Firmware Component Versions
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedule_upgrade
  label: Schedule Firmware Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []

- id: color_p7_copy_preset
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Preset name

- id: color_p7_reset_preset
  label: Reset P7 Preset to Defaults
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Preset name

- id: color_p7_reset_to_native
  label: Reset P7 to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: rgb_next_mode
  label: Cycle to Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

- id: serial_wake_from_eco
  label: Wake from ECO Mode via Serial
  kind: action
  command: ":POWR1\r"
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

- id: active_source
  type: string

- id: scaling_mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: brightness
  type: float

- id: contrast
  type: float

- id: gamma
  type: float

- id: saturation
  type: float

- id: sharpness
  type: integer

- id: orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: warp_enable
  type: boolean

- id: warp_file_enable
  type: boolean

- id: blend_file_enable
  type: boolean

- id: blacklevel_file_enable
  type: boolean

- id: shutter_position
  type: enum
  values: [Open, Closed]

- id: shutter_target
  type: enum
  values: [Open, Closed]

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: network_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: standby_enable
  type: boolean

- id: eco_enable
  type: boolean

- id: dmx_shutdown
  type: boolean

- id: connector_signal
  type: object
```

## Variables
```yaml
# UNRESOLVED: source does not document long-lived settable variables separate from property.set
```

## Events
```yaml
- id: property_changed
  description: Server pushes when a subscribed property value changes
  example: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"system.state":"ready"}]}}'

- id: signal_callback
  description: Server pushes when a subscribed signal emits
  example: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{"arg1":100}}]}}'

- id: modelupdated_signal
  description: Triggered when object structure changes (objects added/removed)
  example: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"introspect.objectchanged":{"object":"motors.motor1","newobject":true}}]}}'
```

## Macros
```yaml
# UNRESOLVED: source does not document device-defined multi-step macros
```

## Safety
```yaml
confirmation_required_for:
  - power_off
  - firmware_schedule_upgrade
interlocks: []
# UNRESOLVED: source mentions "verify that the projector state is either standby or ready before issuing the power on command" as good practice but does not document hardware interlocks
```

## Notes
- Port 9090 TCP for Pulse services; serial at 19200-8N1 for RS-232 fallback.
- Auth via JSON-RPC `authenticate` with passcode; normal end-user access can skip auth.
- API is dynamic — parts depend on peripherals/configuration; use `introspect` to discover available properties/methods for the specific unit.
- Source object names: strip non-word chars, lowercase (e.g. "DisplayPort 1" -> "displayport1").
- ECO mode requires wake-on-LAN, keypad/remote power button, or serial command `:POWR1\r`.
- Wake from ECO via RS-232: send ASCII `:POWR1\r`.
- Wait for `property.set` confirmation before setting the same property again; flooding reduces performance.
- Best practice: verify `system.state` is standby/ready before power-on, on before power-off.
- File uploads via HTTP POST to `http://{host}/api/...`; example endpoints include warp, blend, blacklevel transfers.
- DMX API has basic (2 channels) and extended modes; switching modes exposes additional channels.

<!-- UNRESOLVED: firmware version compatibility not stated; voltage/current/fault recovery not stated; auth passcode source/format not stated -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:49:14.329Z
last_checked_at: 2026-07-21T20:34:47.434Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:34:47.434Z
matched_actions: 92
action_count: 92
confidence: medium
summary: "All 92 spec actions verified against source methods, properties, and transport; full coverage confirmed. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "illumination source name (laser vs xenon) depends on projector variant; the doc shows laser examples"
- "source does not document long-lived settable variables separate from property.set"
- "source does not document device-defined multi-step macros"
- "source mentions \"verify that the projector state is either standby or ready before issuing the power on command\" as good practice but does not document hardware interlocks"
- "firmware version compatibility not stated; voltage/current/fault recovery not stated; auth passcode source/format not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
