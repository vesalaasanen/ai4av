---
spec_id: admin/barco-infinipix-ind-100
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Infinipix Ind 100 Control Spec"
manufacturer: Barco
model_family: "Infinipix Ind 100"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Infinipix Ind 100"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-12T18:11:51.272Z
last_checked_at: 2026-10-07T11:12:58.743Z
generated_at: 2026-10-07T11:12:58.743Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "source describes sequenced examples (e.g. \"upload warp file → select → enable\") as prose steps, not named macros."
  - "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements beyond the recommended state-check before power commands."
  - "firmware version compatibility ranges not stated; specific property/method availability for this exact Ind 100 model not enumerated beyond what introspection exposes."
verification:
  verdict: verified
  checked_at: 2026-10-07T11:12:58.743Z
  matched_actions: 88
  action_count: 88
  confidence: medium
  summary: "All 88 spec actions match Pulse JSON-RPC source methods or properties, transport values are supported, and the source catalogue is essentially fully covered. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-12
---

# Barco Infinipix Ind 100 Control Spec

## Summary
Control spec for Barco Infinipix Ind 100 projector via the Pulse JSON-RPC 2.0 API. Transport is TCP on port 9090; same JSON-RPC commands are also available over RS-232 at 19200 8N1. Source covers power, sources, illumination, image properties, warp/blend files, environment sensors, optics, DMX, and firmware introspection.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

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
  type: UNRESOLVED  # source does not state this (was inferred none: source states authentication can be skipped for normal end-user access)
```

## Traits
```yaml
- powerable    # inferred: system.poweron / system.poweroff present
- routable     # inferred: image.window.main.source commands present
- queryable    # inferred: property.get present
- levelable    # inferred: image.brightness, image.contrast, illumination.sources.laser.power present
```

## Actions
```yaml
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

- id: authenticate
  label: Authenticate (elevated access)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"id":1,"code":98765}}'
  params:
    - name: code
      type: integer
      description: Secret pass code (example value 98765 shown in source)

- id: get_system_state
  label: Get System State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"},"id":1}'
  params: []

- id: subscribe_system_state
  label: Subscribe to system.state
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"},"id":2}'
  params: []

- id: set_active_source
  label: Set Active Source (main window)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"{source}"},"id":2}'
  params:
    - name: source
      type: string
      description: Source name from image.source.list (e.g. "DisplayPort 1", "HDMI")

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

- id: list_connectors
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list","id":3}'
  params: []

- id: list_source_connectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{sourcename}.listconnectors","id":4}'
  params:
    - name: sourcename
      type: string
      description: Lowercase alphanumeric source object name (e.g. "displayport1")

- id: get_connector_signal
  label: Get Connector Signal Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connectorname}.detectedsignal"},"id":5}'
  params:
    - name: connectorname
      type: string
      description: Connector object name (e.g. "displayport1")

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"},"id":0}'
  params: []

- id: subscribe_illumination_state
  label: Subscribe to illumination.state
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"},"id":1}'
  params: []

- id: get_laser_power
  label: Get Laser Power (%)
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"},"id":3}'
  params: []

- id: subscribe_laser_power
  label: Subscribe to laser power changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["illumination.sources.laser.power"]},"id":4}'
  params: []

- id: set_laser_power
  label: Set Laser Power (%)
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":{power}},"id":5}'
  params:
    - name: power
      type: integer
      description: Target power in percent

- id: get_laser_min_power
  label: Get Laser Minimum Power (%)
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"},"id":5}'
  params: []

- id: get_laser_max_power
  label: Get Laser Maximum Power (%)
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"},"id":6}'
  params: []

- id: introspect_illumination_sources
  label: Introspect Illumination Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"property":"illumination.sources","recursive":false},"id":2}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO at current light level
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: illumination_laser_get_serial
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

- id: get_image_brightness
  label: Get Image Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"},"id":7}'
  params: []

- id: set_image_brightness
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":{value}},"id":9}'
  params:
    - name: value
      type: float
      description: Normalized brightness; 0 = default, 1 = 100% offset, range -1..1

- id: subscribe_image_brightness
  label: Subscribe to image.brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["image.brightness"]},"id":8}'
  params: []

- id: introspect_image
  label: Introspect Image Service
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"image","recursive":false},"id":6}'
  params: []

- id: set_warp_enable
  label: Enable Warp Globally
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true},"id":10}'
  params: []

- id: set_warp_file_enable
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true},"id":12}'
  params: []

- id: set_warp_file_selected
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"{filename}"},"id":11}'
  params:
    - name: filename
      type: string
      description: Warp file name (e.g. "warp.xml")

- id: upload_warp_file
  label: Upload Warp File (HTTP)
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: filename
      type: string
      description: Local warp grid file (XML)
    - name: host
      type: string
      description: Projector IP address

- id: download_warp_file
  label: Download Current Warp File
  kind: action
  command: 'curl -O -J http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address

- id: set_blend_file_enable
  label: Enable File Blend
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true},"id":14}'
  params: []

- id: set_blend_file_selected
  label: Select Blend Mask File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":"{filename}"},"id":13}'
  params:
    - name: filename
      type: string
      description: Blend mask filename (e.g. "mask.png")

- id: upload_blend_mask
  label: Upload Blend Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: filename
      type: string
      description: Local blend mask image (PNG/JPEG/TIFF, 8 or 16 bit grayscale)
    - name: host
      type: string
      description: Projector IP address

- id: set_blacklevel_file_enable
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true},"id":16}'
  params: []

- id: set_blacklevel_file_selected
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"{filename}"},"id":15}'
  params:
    - name: filename
      type: string
      description: Black level mask filename (e.g. "blacklevel.png")

- id: upload_blacklevel_mask
  label: Upload Black Level Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@{filename} http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: filename
      type: string
      description: Local black level mask image (PNG/JPEG/TIFF, 8 or 16 bit grayscale)
    - name: host
      type: string
      description: Projector IP address

- id: get_environment_control_blocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"{valuetype}"},"id":{id}}'
  params:
    - name: valuetype
      type: string
      description: 'One of: Temperature, Speed, PWM, Voltage, Current, Power, Altitude, Pressure, Humidity, ADC, Coordinate, Peltier, Waveform, Average, Delay, Difference, Interpolation, Limit, Median, Noise, Weighting, Comparison, Threshold, Formula, Driver, PID, Mode, State, Pump, Resistance, Simulation, Constant, Manual, Range, Any'
    - name: id
      type: integer
      description: Request id

- id: get_environment_alarm_info
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

- id: get_environment_alarm_state
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'
  params: []

- id: introspect
  label: Introspect API Object (recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":true},"id":1}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (e.g. "foo"); empty string for all

- id: introspect_non_recursive
  label: Introspect API Object (one level)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":false},"id":2}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (e.g. "motors")

- id: subscribe_property
  label: Subscribe to one property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"},"id":6}'
  params:
    - name: property
      type: string
      description: Fully-qualified property name (e.g. "image.brightness")

- id: subscribe_properties
  label: Subscribe to multiple properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":["{prop1}","{prop2}"]},"id":7}'
  params:
    - name: prop1
      type: string
      description: First property name
    - name: prop2
      type: string
      description: Second property name

- id: unsubscribe_property
  label: Unsubscribe from one property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"},"id":8}'
  params:
    - name: property
      type: string
      description: Fully-qualified property name

- id: unsubscribe_properties
  label: Unsubscribe from multiple properties
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":["{prop1}","{prop2}"]},"id":9}'
  params:
    - name: prop1
      type: string
      description: First property name
    - name: prop2
      type: string
      description: Second property name

- id: get_property
  label: Get a property value
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"},"id":4}'
  params:
    - name: property
      type: string
      description: Fully-qualified property name

- id: get_properties
  label: Get multiple property values
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":["{prop1}","{prop2}"]},"id":5}'
  params:
    - name: prop1
      type: string
      description: First property name
    - name: prop2
      type: string
      description: Second property name

- id: set_property
  label: Set a property value
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}},"id":3}'
  params:
    - name: property
      type: string
      description: Fully-qualified property name
    - name: value
      type: string
      description: Property value (string, integer, float, boolean, array, object)

- id: subscribe_signal
  label: Subscribe to a signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"},"id":10}'
  params:
    - name: signal
      type: string
      description: Signal name in dot notation (e.g. "modelupdated")

- id: subscribe_signals
  label: Subscribe to multiple signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":["{s1}","{s2}"]},"id":11}'
  params:
    - name: s1
      type: string
      description: First signal name
    - name: s2
      type: string
      description: Second signal name

- id: unsubscribe_signal
  label: Unsubscribe from a signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"},"id":12}'
  params:
    - name: signal
      type: string
      description: Signal name in dot notation

- id: unsubscribe_signals
  label: Unsubscribe from multiple signals
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":["{s1}","{s2}"]},"id":13}'
  params:
    - name: s1
      type: string
      description: First signal name
    - name: s2
      type: string
      description: Second signal name

- id: ledctrl_blink
  label: Blink system status LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"{led}","color":"{color}","period":{period}},"id":3}'
  params:
    - name: led
      type: string
      description: LED name (e.g. "systemstatus")
    - name: color
      type: string
      description: LED color (e.g. "red")
    - name: period
      type: integer
      description: Blink period

- id: get_dmx_mode
  label: Get DMX Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.mode"}}'
  params: []

- id: get_dmx_start_channel
  label: Get DMX Start Channel
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.startchannel"}}'
  params: []

- id: get_dmx_shutdown
  label: Get DMX Shutdown Flag
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"dmx.shutdown"}}'
  params: []

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

- id: get_network_lan_ip4config
  label: Get LAN IPv4 Configuration
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"}}'
  params: []

- id: get_network_lan_state
  label: Get LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'
  params: []

- id: get_shutter_position
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'
  params: []

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"{target}"}}'
  params:
    - name: target
      type: string
      description: 'One of: "Open", "Closed"'

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

- id: get_lensshift_horizontal_position
  label: Get Lens Shift Horizontal Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"}}'
  params: []

- id: get_lensshift_vertical_position
  label: Get Lens Shift Vertical Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"}}'
  params: []

- id: get_orientation
  label: Get Image Orientation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.orientation"}}'
  params: []

- id: get_window_scaling_mode
  label: Get Window Scaling Mode
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.scalingmode"}}'
  params: []

- id: get_window_position
  label: Get Window Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.position"}}'
  params: []

- id: get_window_size
  label: Get Window Size
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.size"}}'
  params: []

- id: get_standby_enable
  label: Get Standby Enabled
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.standby.enable"}}'
  params: []

- id: get_eco_enable
  label: Get ECO Mode Enabled
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.eco.enable"}}'
  params: []

- id: get_image_contrast
  label: Get Image Contrast
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.contrast"}}'
  params: []

- id: set_image_contrast
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized contrast; 1 = default, range 0..2

- id: get_image_gamma
  label: Get Image Gamma
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.gamma"}}'
  params: []

- id: set_image_gamma
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":{value}}}'
  params:
    - name: value
      type: float
      description: Gamma exponent; default 2.2, range 1..3, step 0.1

- id: get_image_saturation
  label: Get Image Saturation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.saturation"}}'
  params: []

- id: set_image_saturation
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":{value}}}'
  params:
    - name: value
      type: float
      description: Normalized saturation; 1 = default, range 0..2

- id: get_image_sharpness
  label: Get Image Sharpness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.sharpness"}}'
  params: []

- id: set_image_sharpness
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":{value}}}'
  params:
    - name: value
      type: integer
      description: Sharpness; range -2..8

- id: rgb_mode_next
  label: Advance to Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []

- id: p7_custom_copy_preset
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of preset to copy

- id: p7_custom_reset_preset
  label: Reset P7 Custom Preset to Defaults
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset","params":{"presetname":"{presetname}"}}'
  params:
    - name: presetname
      type: string
      description: Name of preset to reset

- id: p7_custom_reset_to_native
  label: Reset P7 Custom to Native
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

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
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []

- id: serial_wake_eco
  label: Wake Projector from ECO via Serial
  kind: action
  command: ':POWR1\r'
  params: []
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values:
    - boot
    - eco
    - standby
    - ready
    - conditioning
    - on
    - deconditioning
    - service
    - error

- id: illumination_state
  type: enum
  values:
    - On
    - Off

- id: shutter_position
  type: enum
  values:
    - Open
    - Closed

- id: shutter_target
  type: enum
  values:
    - Open
    - Closed

- id: scaling_mode
  type: enum
  values:
    - Fill
    - OneToOne
    - FillScreen
    - Stretch

- id: image_orientation
  type: enum
  values:
    - DESKTOP_FRONT
    - DESKTOP_REAR
    - CEILING_FRONT
    - CEILING_REAR

- id: network_lan_state
  type: enum
  values:
    - CONNECTED
    - DISCONNECTED

- id: environment_alarm_state
  type: enum
  values:
    - Fatal
    - Error
    - Alert
    - Warning
    - Ok

- id: firmware_component_status
  type: enum
  values:
    - Unknown
    - OK
    - Upgradable
```

## Variables
```yaml
- name: image.brightness
  type: float
  description: Normalized image brightness offset (-1..1, 0 default, step 0.01)

- name: image.contrast
  type: float
  description: Normalized image gain (0..2, 1 default, step 0.01)

- name: image.gamma
  type: float
  description: Gamma exponent (1..3, default 2.2, step 0.1)

- name: image.saturation
  type: float
  description: Normalized color saturation (0..2, 1 default, step 0.01)

- name: image.sharpness
  type: integer
  description: Image sharpness (-2..8, step 1)

- name: illumination.sources.laser.power
  type: integer
  description: Target laser power in percent

- name: illumination.sources.laser.minpower
  type: float
  description: Minimum laser power in percent (read-only, dynamic)

- name: illumination.sources.laser.maxpower
  type: float
  description: Maximum laser power in percent (read-only, dynamic)

- name: image.window.main.source
  type: string
  description: Active source name in main window

- name: image.window.main.scalingmode
  type: enum
  description: Scaling mode (Fill / OneToOne / FillScreen / Stretch)

- name: image.window.main.position
  type: object
  description: Window position with x,y integer fields

- name: image.window.main.size
  type: object
  description: Window size with width,height integer fields

- name: image.orientation
  type: enum
  description: Image orientation (DESKTOP_FRONT/DESKTOP_REAR/CEILING_FRONT/CEILING_REAR)

- name: optics.shutter.position
  type: enum
  description: Current shutter position (Open / Closed)

- name: optics.shutter.target
  type: enum
  description: Target shutter position (Open / Closed)

- name: optics.zoom.position
  type: integer
  description: Current zoom position

- name: optics.focus.position
  type: integer
  description: Current focus position

- name: optics.lensshift.horizontal.position
  type: integer
  description: Current horizontal lens shift position

- name: optics.lensshift.vertical.position
  type: integer
  description: Current vertical lens shift position

- name: dmx.mode
  type: string
  description: Current DMX mode

- name: dmx.startchannel
  type: integer
  description: DMX start channel (1..512)

- name: dmx.shutdown
  type: boolean
  description: DMX shutdown flag

- name: network.device.lan.ip4config
  type: object
  description: IPv4 LAN configuration (Address, Mask, Gateway, NameServers)

- name: network.device.lan.state
  type: enum
  description: LAN state (CONNECTED / DISCONNECTED)

- name: system.standby.enable
  type: boolean
  description: Standby state enabled (check availability first)

- name: system.eco.enable
  type: boolean
  description: ECO state enabled (check availability first)

- name: environment.alarmstate
  type: enum
  description: Environment alarm state (Fatal / Error / Alert / Warning / Ok)

- name: image.processing.warp.enable
  type: boolean
  description: Globally enable warp processing

- name: image.processing.warp.file.enable
  type: boolean
  description: Enable file-based warp

- name: image.processing.warp.file.selected
  type: string
  description: Currently selected warp file

- name: image.processing.blend.file.enable
  type: boolean
  description: Enable file-based blend

- name: image.processing.blend.file.selected
  type: array
  description: Currently selected blend mask file(s)

- name: image.processing.blacklevel.file.enable
  type: boolean
  description: Enable black level correction file

- name: image.processing.blacklevel.file.selected
  type: string
  description: Currently selected black level file

- name: image.connector.{name}.detectedsignal
  type: object
  description: Detected signal info on connector (active, name, resolution, freq, etc.)
```

## Events
```yaml
- id: property_changed
  description: Server pushes notification when subscribed property value changes. Delivered via the JSON-RPC method `property.changed` with no `id` field. Client must NOT respond.

- id: signal_callback
  description: Server pushes notification for subscribed signal emissions. Delivered via the JSON-RPC method `signal.callback` with no `id` field.

- id: modelupdated
  description: Signal emitted by the introspect API when objects are added or removed from the model.
```

## Macros
```yaml
# UNRESOLVED: source describes sequenced examples (e.g. "upload warp file → select → enable") as prose steps, not named macros.
# Macros are not enumerated as discrete multi-step sequences with explicit names in the source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off    # inferred: source says verify state is "on" before issuing power_off
  - power_on     # inferred: source says verify state is standby/ready before issuing power_on
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements beyond the recommended state-check before power commands.
```

## Notes
Same JSON-RPC command set works over TCP (port 9090) and serial RS-232 (19200 8N1); choose either transport and the messages are identical except for framing.

Authentication is optional for normal end-user access. The `authenticate` method accepts a secret code and returns `result: true`; example code shown in source is 98765. Use only when elevated access level is required.

Source recommends introspection over hard-coded property lists because API is dynamic: peripherals (e.g. motorized zoom lens), DMX mode (basic vs extended), and other factors determine which properties/methods/signals are exposed.

For property.set it is best practice to wait for the response before issuing the next set on the same property to avoid flooding the server.

HTTP file endpoints under `/api/...` require no auth in source examples (e.g. `/api/image/processing/warp/file/transfer`).

ECO-mode wake-up: source documents three methods — Wake-on-LAN with MAC, remote power button, keypad power button, or serial ASCII string `:POWR1\r` followed by CR.

<!-- UNRESOLVED: firmware version compatibility ranges not stated; specific property/method availability for this exact Ind 100 model not enumerated beyond what introspection exposes. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-12T18:11:51.272Z
last_checked_at: 2026-10-07T11:12:58.743Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T11:12:58.743Z
matched_actions: 88
action_count: 88
confidence: medium
summary: "All 88 spec actions match Pulse JSON-RPC source methods or properties, transport values are supported, and the source catalogue is essentially fully covered. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "source describes sequenced examples (e.g. \"upload warp file → select → enable\") as prose steps, not named macros."
- "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements beyond the recommended state-check before power commands."
- "firmware version compatibility ranges not stated; specific property/method availability for this exact Ind 100 model not enumerated beyond what introspection exposes."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
