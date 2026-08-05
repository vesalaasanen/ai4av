---
spec_id: admin/barco-cinecare-training
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Cinecare Training Control Spec"
manufacturer: Barco
model_family: "Cinecare Training"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Cinecare Training"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:27:23.336Z
last_checked_at: 2026-07-21T21:24:42.293Z
generated_at: 2026-07-21T21:24:42.293Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "list any major gaps here"
  - "source does not document explicit multi-step macro sequences beyond the wake-from-ECO procedure."
  - "source does not document safety warnings, interlocks, or power-on sequencing requirements."
  - "firmware version compatibility not stated in source."
  - "voltage, current, power specs not stated in source."
  - "fault behavior / error recovery sequences not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-21T21:24:42.293Z
  matched_actions: 87
  action_count: 87
  confidence: medium
  summary: "All 87 spec actions verified against documented source methods and properties; transport parameters (9090 TCP, 19200 8/N/1 serial) confirmed in source; no hallucinated commands detected. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Barco Cinecare Training Control Spec

## Summary
Barco Cinecare Training projector with Pulse API. Control via JSON-RPC 2.0 over TCP/IP (port 9090) and RS-232 serial (19200/8/N/1). API covers power, input selection, illumination, image properties, warp/blend/blacklevel files, environment sensors, optics, DMX, network and firmware introspection.

<!-- UNRESOLVED: list any major gaps here -->

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
  type: code  # source: authenticate method takes "code" param; optional for end-user level
```

## Traits
```yaml
- powerable       # inferred from system.poweron / system.poweroff examples
- routable        # inferred from image.window.main.source examples
- queryable       # inferred from property.get examples
- levelable       # inferred from image.brightness / contrast / saturation / gamma properties
```

## Actions
```yaml
- id: system_poweron
  label: System Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
  params: []

- id: system_poweroff
  label: System Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
  params: []

- id: authenticate
  label: Authenticate
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"id": 1, "code": 98765}, "id": 1}'
  params:
    - name: code
      type: integer
      description: Secret pass code for elevated access level

- id: ledctrl_blink
  label: LED Blink
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": {"id": 3, "led": "systemstatus", "color": "red", "period": 42}, "id": 3}'
  params:
    - name: led
      type: string
      description: LED identifier
    - name: color
      type: string
      description: Blink color
    - name: period
      type: integer
      description: Blink period

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"id": 3, "property": "objectname.propertyname", "value": 100}, "id": 3}'
  params:
    - name: property
      type: string
      description: Object.property name in dot notation
    - name: value
      type: string
      description: Value to set

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"id": 4, "property": "objectname.propertyname"}, "id": 4}'
  params:
    - name: property
      type: string
      description: Object.property name in dot notation

- id: property_get_multiple
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": ["image.brightness", "image.contrast"]}, "id": 5}'
  params:
    - name: property
      type: array
      description: List of property names

- id: property_subscribe
  label: Subscribe to Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"id": 6, "property": "image.brightness"}, "id": 6}'
  params:
    - name: property
      type: string
      description: Property name to observe

- id: property_subscribe_multiple
  label: Subscribe to Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"id": 7, "property": ["image.brightness", "image.contrast"]}, "id": 7}'
  params:
    - name: property
      type: array
      description: List of property names to observe

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"id": 8, "property": "image.brightness"}, "id": 8}'
  params:
    - name: property
      type: string
      description: Property name to stop observing

- id: property_unsubscribe_multiple
  label: Unsubscribe from Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"id": 9, "property": ["image.brightness", "image.contrast"]}, "id": 9}'
  params:
    - name: property
      type: array
      description: List of property names to stop observing

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"id": 10, "signal": "modelupdated"}, "id": 10}'
  params:
    - name: signal
      type: string
      description: Signal name

- id: signal_subscribe_multiple
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"id": 11, "signal": ["modelupdated", "image.processing.warp.gridchanged"]}, "id": 11}'
  params:
    - name: signal
      type: array
      description: List of signal names

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"id": 12, "signal": "modelupdated"}, "id": 12}'
  params:
    - name: signal
      type: string
      description: Signal name

- id: signal_unsubscribe_multiple
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"id": 13, "signal": ["modelupdated", "image.processing.warp.gridchanged"]}, "id": 13}'
  params:
    - name: signal
      type: array
      description: List of signal names

- id: introspect
  label: Introspect Object (recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "foo", "recursive": true}, "id": 1}'
  params:
    - name: object
      type: string
      description: Object name in dot notation
    - name: recursive
      type: boolean
      description: Recursive listing flag

- id: introspect_nonrecursive
  label: Introspect Object (non-recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "motors", "recursive": false}, "id": 2}'
  params:
    - name: object
      type: string
      description: Object name in dot notation

- id: introspect_subscribe
  label: Subscribe to Model Updated Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"id": 2, "signal": "modelupdated"}, "id": 2}'
  params: []

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "id": 1}'
  params: []

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "id": 3}'
  params: []

- id: image_source_listconnectors
  label: List Source Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.displayport1.listconnectors", "id": 4}'
  params:
    - name: source
      type: string
      description: Source object name (e.g. displayport1)

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"id": 2, "property": "image.window.main.source", "value": "DisplayPort 1"}, "id": 2}'
  params:
    - name: value
      type: string
      description: Source name from image.source.list

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.window.main.source"}, "id": 0}'
  params: []

- id: get_connector_signal
  label: Get Connector Signal Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.connector.displayport1.detectedsignal"}, "id": 5}'
  params:
    - name: connector
      type: string
      description: Connector object name (e.g. displayport1)

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.state"}, "id": 0}'
  params: []

- id: subscribe_illumination_state
  label: Subscribe Illumination State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "illumination.state"}, "id": 1}'
  params: []

- id: introspect_illumination_sources
  label: Introspect Illumination Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"property": "illumination.sources", "recursive": false}, "id": 2}'
  params: []

- id: get_laser_power
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.power"}, "id": 3}'
  params: []

- id: set_laser_power
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "illumination.sources.laser.power", "value": 40}, "id": 5}'
  params:
    - name: value
      type: number
      description: Power level in percent

- id: subscribe_laser_power
  label: Subscribe Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": ["illumination.sources.laser.power"]}, "id": 4}'
  params: []

- id: get_min_power
  label: Get Min Laser Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.minpower"}, "id": 6}'
  params: []

- id: get_max_power
  label: Get Max Laser Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.maxpower"}, "id": 5}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
  params: []

- id: introspect_image
  label: Introspect Image Service
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"name": "image", "object": "image", "recursive": false}, "id": 6}'
  params: []

- id: get_brightness
  label: Get Brightness
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.brightness"}, "id": 7}'
  params: []

- id: set_brightness
  label: Set Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.brightness", "value": 0.15}, "id": 9}'
  params:
    - name: value
      type: number
      description: Brightness value (-1 to 1)

- id: subscribe_brightness
  label: Subscribe Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": ["image.brightness"]}, "id": 8}'
  params: []

- id: set_contrast
  label: Set Contrast
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.contrast", "value": 1.0}, "id": 9}'
  params:
    - name: value
      type: number
      description: Contrast value (0 to 2)

- id: set_gamma
  label: Set Gamma
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.gamma", "value": 2.2}, "id": 9}'
  params:
    - name: value
      type: number
      description: Gamma value (1 to 3)

- id: set_saturation
  label: Set Saturation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.saturation", "value": 1.0}, "id": 9}'
  params:
    - name: value
      type: number
      description: Saturation value (0 to 2)

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.sharpness", "value": 0}, "id": 9}'
  params:
    - name: value
      type: integer
      description: Sharpness value (-2 to 8)

- id: set_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.orientation", "value": "DESKTOP_FRONT"}, "id": 9}'
  params:
    - name: value
      type: string
      description: Orientation enum (DESKTOP_FRONT/DESKTOP_REAR/CEILING_FRONT/CEILING_REAR)

- id: set_window_position
  label: Set Window Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.position", "value": {"x": 0, "y": 0}}, "id": 9}'
  params:
    - name: value
      type: object
      description: {x: int, y: int}

- id: set_window_size
  label: Set Window Size
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.size", "value": {"width": 1920, "height": 1080}}, "id": 9}'
  params:
    - name: value
      type: object
      description: {width: int, height: int}

- id: set_scalingmode
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.scalingmode", "value": "Fill"}, "id": 9}'
  params:
    - name: value
      type: string
      description: Scaling mode (Fill/OneToOne/FillScreen/Stretch)

- id: enable_warp
  label: Enable Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.enable", "value": true}, "id": 10}'
  params:
    - name: value
      type: boolean
      description: Enable flag

- id: enable_warp_file
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.enable", "value": true}, "id": 12}'
  params:
    - name: value
      type: boolean
      description: Enable flag

- id: select_warp_file
  label: Select Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.selected", "value": "warp.xml"}, "id": 11}'
  params:
    - name: value
      type: string
      description: Warp file name

- id: upload_warp_file
  label: Upload Warp File
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address

- id: download_warp_file
  label: Download Warp File
  kind: action
  command: 'curl -O -J http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address

- id: enable_blend_file
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.enable", "value": true}, "id": 14}'
  params:
    - name: value
      type: boolean
      description: Enable flag

- id: select_blend_file
  label: Select Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.selected", "value": "mask.png"}, "id": 13}'
  params:
    - name: value
      type: array
      description: List of blend file names

- id: upload_blend_file
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://{host}/api/image/processing/blend/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address

- id: enable_blacklevel_file
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.enable", "value": true}, "id": 16}'
  params:
    - name: value
      type: boolean
      description: Enable flag

- id: select_blacklevel_file
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.selected", "value": "blacklevel.png"}, "id": 15}'
  params:
    - name: value
      type: string
      description: Black level file name

- id: upload_blacklevel_file
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://{host}/api/image/processing/blacklevel/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address

- id: color_p7_copy_preset
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": {"presetname": ""}}'
  params:
    - name: presetname
      type: string
      description: Source preset name

- id: color_p7_reset_preset
  label: Reset P7 Preset to Default
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": {"presetname": ""}}'
  params:
    - name: presetname
      type: string
      description: Preset name

- id: color_p7_reset_native
  label: Reset P7 to Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []

- id: rgbmode_next
  label: Cycle to Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  params: []

- id: get_dmx_mode
  label: Get DMX Mode
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "dmx.mode"}}'
  params: []

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.mode", "value": ""}}'
  params:
    - name: value
      type: string
      description: DMX mode name

- id: get_dmx_startchannel
  label: Get DMX Start Channel
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "dmx.startchannel"}}'
  params: []

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.startchannel", "value": 1}}'
  params:
    - name: value
      type: integer
      description: DMX start channel (1..512)

- id: get_dmx_shutdown
  label: Get DMX Shutdown
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "dmx.shutdown"}}'
  params: []

- id: set_dmx_shutdown
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.shutdown", "value": true}}'
  params:
    - name: value
      type: boolean
      description: Shutdown enabled

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
  params: []

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
  params: []

- id: get_network_ip4config
  label: Get Network IP4 Config
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "network.device.lan.ip4config"}}'
  params: []

- id: get_network_state
  label: Get Network State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "network.device.lan.state"}}'
  params: []

- id: get_shutter_position
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.shutter.position"}}'
  params: []

- id: get_shutter_target
  label: Get Shutter Target
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.shutter.target"}}'
  params: []

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.shutter.target", "value": "Open"}}'
  params:
    - name: value
      type: string
      description: Shutter target (Open/Closed)

- id: get_zoom_position
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.zoom.position"}}'
  params: []

- id: get_focus_position
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.focus.position"}}'
  params: []

- id: get_lensshift_horizontal
  label: Get Lens Shift Horizontal
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.lensshift.horizontal.position"}}'
  params: []

- id: get_lensshift_vertical
  label: Get Lens Shift Vertical
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.lensshift.vertical.position"}}'
  params: []

- id: set_standby_enable
  label: Enable Standby State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "system.standby.enable", "value": true}}'
  params:
    - name: value
      type: boolean
      description: Enable flag

- id: set_eco_enable
  label: Enable ECO State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "system.eco.enable", "value": true}}'
  params:
    - name: value
      type: boolean
      description: Enable flag

- id: get_alarm_state
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "environment.alarmstate"}}'
  params: []

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "Sensor", "valuetype": "Temperature"}, "id": 18}'
  params:
    - name: type
      type: string
      description: Sensor type (Sensor/Filter/Controller/Actuator/Alarm/GenericBlock)
    - name: valuetype
      type: string
      description: Sensor value type (Temperature/Speed/PWM/Voltage/Current/etc.)

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  params: []

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  params: []

- id: serial_wake_from_eco
  label: Wake from ECO via Serial
  kind: action
  command: ':POWR1\r'
  params: []
  notes: Send these exact ASCII characters over RS-232 to wake projector from ECO mode.
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
  description: Active source name

- id: image_brightness
  type: number
  description: Normalized brightness, range -1..1

- id: image_contrast
  type: number
  description: Normalized contrast, range 0..2

- id: image_gamma
  type: number
  description: Gamma, range 1..3

- id: image_saturation
  type: number
  description: Normalized saturation, range 0..2

- id: image_sharpness
  type: integer
  description: Sharpness, range -2..8

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: illumination_sources_laser_power
  type: number
  description: Laser power in percent

- id: illumination_sources_laser_minpower
  type: number
  description: Minimum laser power in percent

- id: illumination_sources_laser_maxpower
  type: number
  description: Maximum laser power in percent

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

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

- id: image_connector_detectedsignal
  type: object
  description: Signal info block (active/name/vertical_total/horizontal_total/resolution/frequencies/etc.)

- id: environment_temperatures
  type: object
  description: Dictionary of sensor name -> temperature reading (from environment.getcontrolblocks type=Sensor valuetype=Temperature)

- id: environment_fan_speeds
  type: object
  description: Dictionary of fan name -> RPM (from environment.getcontrolblocks type=Sensor valuetype=Speed)
```

## Variables
```yaml
# All image/warp/blend/blacklevel settings are settable via property.set using the property strings listed in Feedbacks.
# No additional unbounded variables beyond those already enumerated.
```

## Events
```yaml
- id: property_changed
  description: Notification when a subscribed property value changes. Client must implement property.changed handler.
  payload:
    method: property.changed
    params:
      property: [{objectname.propertyname: value}]

- id: signal_callback
  description: Notification when a subscribed signal is emitted. Client must implement signal.callback handler.
  payload:
    method: signal.callback
    params:
      signal: [{objectname.signalname: {args}}]

- id: modelupdated
  description: Signal triggered when object structure changes (objects added or removed).
```

## Macros
```yaml
# UNRESOLVED: source does not document explicit multi-step macro sequences beyond the wake-from-ECO procedure.
- id: wake_from_eco
  description: Wake projector from ECO mode (RS-232 only).
  steps:
    - command: ':POWR1\r'
      notes: Send exact ASCII string over RS-232.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
API is dynamic: parts of the API depend on peripherals (e.g. motorized zoom lens presence) or configuration (e.g. DMX mode). Always use `introspect` to discover the actual API surface for a given projector configuration.

Best practice: wait for the confirmation of `property.set` before issuing the same `property.set` again. Continuously setting without waiting may flood the server and reduce performance.

Power state checks: verify state is `standby` or `ready` before issuing `system.poweron`; verify state is `on` before issuing `system.poweroff`. If projector is already in the target state or transitioning, nothing happens.

JSON-RPC 2.0: parameters are passed by name and order does not matter. `params` member is optional for methods without arguments (ignored if present).

File endpoints follow pattern `http://{host}/api/...` — HTTP POST uploads, GET downloads. Only certain endpoints support download without specifying a filename.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: voltage, current, power specs not stated in source. -->
<!-- UNRESOLVED: fault behavior / error recovery sequences not stated in source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-14T08:27:23.336Z
last_checked_at: 2026-07-21T21:24:42.293Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:24:42.293Z
matched_actions: 87
action_count: 87
confidence: medium
summary: "All 87 spec actions verified against documented source methods and properties; transport parameters (9090 TCP, 19200 8/N/1 serial) confirmed in source; no hallucinated commands detected. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "list any major gaps here"
- "source does not document explicit multi-step macro sequences beyond the wake-from-ECO procedure."
- "source does not document safety warnings, interlocks, or power-on sequencing requirements."
- "firmware version compatibility not stated in source."
- "voltage, current, power specs not stated in source."
- "fault behavior / error recovery sequences not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
