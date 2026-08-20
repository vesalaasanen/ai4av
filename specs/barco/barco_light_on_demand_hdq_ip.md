---
spec_id: admin/barco-light-on-demand-hdq
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Light On Demand HDQ Control Spec"
manufacturer: Barco
model_family: "Light On Demand HDQ"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Light On Demand HDQ"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:12:54.044Z
last_checked_at: 2026-08-19T08:52:58.020Z
generated_at: 2026-08-19T08:52:58.020Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility not stated; per-model source/connector list varies"
  - "firmware version compatibility range not stated; per-model source/connector/illumination lists vary; image.window.main.position and size properties are documented but no setters shown in examples"
verification:
  verdict: verified
  checked_at: 2026-08-19T08:52:58.020Z
  matched_actions: 76
  action_count: 76
  confidence: medium
  summary: "All 76 spec actions map to JSON-RPC methods, property paths, HTTP endpoints, or the :POWR1\\r serial sequence verbatim in source; transport values match RS232 table and port 9090; bidirectional coverage complete. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-18
---

# Barco Light On Demand HDQ Control Spec

## Summary
The Barco Light On Demand HDQ is a Pulse-platform projector exposing both RS-232 serial and TCP/IP control using a JSON-RPC 2.0 service. This spec covers the Pulse API command catalog including power, source selection, illumination, image properties, warp/blend/blacklevel file transfers, environment sensors, DMX, optics, and authentication. The TCP service listens on port 9090.

<!-- UNRESOLVED: firmware compatibility not stated; per-model source/connector list varies -->

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
  type: passcode  # authenticate method, optional for normal end user access
```

## Traits
```yaml
- powerable       # system.poweron / system.poweroff present
- routable        # image.window.main.source selection present
- queryable       # property.get queries present
- levelable       # image.brightness, contrast, gamma, saturation, sharpness present
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
      description: Secret pass code for elevated access level

- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron", "params": { "property": "system.state" }, "id": 3}'

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff", "params": { "property": "system.state" }, "id": 4}'

- id: system_state_get
  label: Get System State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "system.state" }, "id": 1}'

- id: system_state_subscribe
  label: Subscribe System State Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "system.state" }, "id": 2}'

- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "led": "systemstatus", "color": "red", "period": 42 }, "id": 3}'
  params:
    - name: led
      type: string
      description: LED identifier
    - name: color
      type: string
      description: LED color
    - name: period
      type: integer
      description: Blink period

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "objectname.propertyname", "value": 100 }, "id": 3}'
  params:
    - name: property
      type: string
      description: Dot-notation property path
    - name: value
      type: string
      description: New value for the property

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "objectname.propertyname" }, "id": 4}'
  params:
    - name: property
      type: string
      description: Dot-notation property path

- id: property_get_multi
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": ["image.brightness", "image.contrast"] }, "id": 5}'
  params:
    - name: property
      type: array
      description: Array of property paths

- id: property_subscribe
  label: Subscribe Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.brightness" }, "id": 6}'
  params:
    - name: property
      type: string
      description: Property path or array of paths

- id: property_unsubscribe
  label: Unsubscribe Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": "image.brightness" }, "id": 8}'
  params:
    - name: property
      type: string
      description: Property path or array of paths

- id: signal_subscribe
  label: Subscribe Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "modelupdated" }, "id": 10}'
  params:
    - name: signal
      type: string
      description: Signal name or array of names

- id: signal_unsubscribe
  label: Unsubscribe Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": "modelupdated" }, "id": 12}'
  params:
    - name: signal
      type: string
      description: Signal name or array of names

- id: introspect
  label: Introspect Object
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "foo", "recursive": true }, "id": 1}'
  params:
    - name: object
      type: string
      description: Object name in dot notation
    - name: recursive
      type: boolean
      description: If true returns full hierarchy; if false returns only direct children

- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "id": 1}'

- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "id": 3}'

- id: image_window_main_source_get
  label: Get Active Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.window.main.source" }, "id": 0}'

- id: image_window_main_source_set
  label: Set Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.source", "value": "DisplayPort 1" }, "id": 2}'
  params:
    - name: value
      type: string
      description: Source name as returned by image.source.list

- id: image_window_main_source_subscribe
  label: Subscribe Active Source Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.window.main.source" }, "id": 6}'

- id: image_source_listconnectors
  label: List Connectors For Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.displayport1.listconnectors", "id": 4}'
  params:
    - name: source
      type: string
      description: Source object name (lowercase, no non-word chars)

- id: image_connector_detectedsignal_get
  label: Get Connector Detected Signal
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.connector.displayport1.detectedsignal" }, "id": 5}'
  params:
    - name: connector
      type: string
      description: Connector object name

- id: image_connector_detectedsignal_subscribe
  label: Subscribe Connector Signal Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": ["image.connector.displayport1.detectedsignal"] }, "id": 7}'
  params:
    - name: connector
      type: string
      description: Connector object name

- id: illumination_state_get
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.state" }, "id": 0}'

- id: illumination_state_subscribe
  label: Subscribe Illumination State Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "illumination.state" }, "id": 1}'

- id: illumination_laser_power_get
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.power" }, "id": 3}'

- id: illumination_laser_power_set
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "illumination.sources.laser.power", "value": 40 }, "id": 5}'
  params:
    - name: value
      type: integer
      description: Target power in percent (within dynamic min/max)

- id: illumination_laser_power_subscribe
  label: Subscribe Laser Power Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": ["illumination.sources.laser.power"] }, "id": 4}'

- id: illumination_laser_minpower_get
  label: Get Laser Min Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.minpower" }, "id": 6}'

- id: illumination_laser_maxpower_get
  label: Get Laser Max Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.maxpower" }, "id": 7}'

- id: illumination_sources_introspect
  label: Introspect Illumination Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "illumination.sources", "recursive": false }, "id": 2}'

- id: illumination_clo_engage
  label: Engage CLO
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'

- id: image_brightness_get
  label: Get Image Brightness
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.brightness" }, "id": 7}'

- id: image_brightness_set
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.brightness", "value": 0.15 }, "id": 9}'
  params:
    - name: value
      type: float
      description: Normalized brightness offset, range -1 to 1 (default 0)

- id: image_brightness_subscribe
  label: Subscribe Brightness Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": ["image.brightness"] }, "id": 8}'

- id: image_processing_warp_enable
  label: Enable Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.enable", "value": true }, "id": 10}'
  params:
    - name: value
      type: boolean
      description: Enable/disable all warp functions

- id: image_processing_warp_file_upload
  label: Upload Warp File
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://192.168.1.100/api/image/processing/warp/file/transfer'
  params:
    - name: filename
      type: string
      description: Local warp grid XML filename- id: image_processing_warp_file_selected
  label: Select Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.selected", "value": "warp.xml" }, "id": 11}'
  params:
    - name: value
      type: string
      description: Warp file name to activate

- id: image_processing_warp_file_enable
  label: Enable Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.enable", "value": true }, "id": 12}'

- id: image_processing_blend_file_upload
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://192.168.1.100/api/image/processing/blend/file/transfer'
  params:
    - name: filename
      type: string
      description: Local blend mask PNG filename

- id: image_processing_blend_file_selected
  label: Select Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.selected", "value": "mask.png" }, "id": 13}'
  params:
    - name: value
      type: array
      description: Selected blend filenames

- id: image_processing_blend_file_enable
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.enable", "value": true }, "id": 14}'

- id: image_processing_blacklevel_file_upload
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://192.168.1.100/api/image/processing/blacklevel/file/transfer'
  params:
    - name: filename
      type: string
      description: Local black level mask PNG filename

- id: image_processing_blacklevel_file_selected
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.selected", "value": "blacklevel.png" }, "id": 15}'
  params:
    - name: value
      type: string
      description: Black level mask filename to activate

- id: image_processing_blacklevel_file_enable
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.enable", "value": true }, "id": 16}'

- id: environment_getcontrolblocks
  label: Get Environment Sensor Blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "Sensor", "valuetype": "Temperature" }, "id": 18}'
  params:
    - name: type
      type: string
      description: 'Sensor, Filter, Controller, Actuator, Alarm, GenericBlock'
    - name: valuetype
      type: string
      description: 'Temperature, Speed, PWM, Voltage, Current, Power, etc.'

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'

- id: environment_alarmstate_get
  label: Get Alarm State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "environment.alarmstate" }}'

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'

- id: firmware_listcomponentversionstatus
  label: List Firmware Component Versions
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'

- id: dmx_mode_get
  label: Get DMX Mode
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "dmx.mode" }}'

- id: dmx_startchannel_get
  label: Get DMX Start Channel
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "dmx.startchannel" }}'

- id: dmx_shutdown_get
  label: Get DMX Shutdown State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "dmx.shutdown" }}'

- id: network_lan_ip4config_get
  label: Get IPv4 LAN Config
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.ip4config" }}'

- id: network_lan_state_get
  label: Get LAN State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.state" }}'

- id: optics_shutter_position_get
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.shutter.position" }}'

- id: optics_shutter_target_set
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.shutter.target", "value": "Open" }}'
  params:
    - name: value
      type: string
      description: 'Open or Closed'

- id: optics_zoom_position_get
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.zoom.position" }}'

- id: optics_focus_position_get
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.focus.position" }}'

- id: optics_lensshift_horizontal_position_get
  label: Get Lens Shift Horizontal Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.lensshift.horizontal.position" }}'

- id: optics_lensshift_vertical_position_get
  label: Get Lens Shift Vertical Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.lensshift.vertical.position" }}'

- id: system_standby_enable_set
  label: Enable Standby State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.standby.enable", "value": true }}'
  params:
    - name: value
      type: boolean

- id: system_eco_enable_set
  label: Enable ECO State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.eco.enable", "value": true }}'
  params:
    - name: value
      type: boolean

- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset To Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "" }}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset P7 Custom Preset
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "" }}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset P7 Custom To Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'

- id: image_color_rgbmode_nextrgbmode
  label: Cycle To Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'

- id: image_contrast_set
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.contrast", "value": 1.0 }}'
  params:
    - name: value
      type: float
      description: Normalized gain, range 0 to 2 (default 1)

- id: image_gamma_set
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.gamma", "value": 2.2 }}'
  params:
    - name: value
      type: float
      description: Gamma exponent, range 1 to 3 (default 2.2)

- id: image_saturation_set
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.saturation", "value": 1.0 }}'
  params:
    - name: value
      type: float
      description: Normalized saturation, range 0 to 2 (default 1)

- id: image_sharpness_set
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.sharpness", "value": 0 }}'
  params:
    - name: value
      type: integer
      description: Sharpness, range -2 to 8

- id: image_orientation_set
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.orientation", "value": "DESKTOP_FRONT" }}'
  params:
    - name: value
      type: string
      description: 'DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR'

- id: image_window_main_scalingmode_set
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.scalingmode", "value": "Fill" }}'
  params:
    - name: value
      type: string
      description: 'Fill, OneToOne, FillScreen, Stretch'

- id: serial_wake_from_eco
  label: Wake From ECO (Serial)
  kind: action
  command: ':POWR1\r'
  notes: Send ASCII on RS232 to wake a projector in ECO mode
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]

- id: illumination_state
  type: enum
  values: [On, Off]

- id: illumination_laser_power
  type: integer
  description: Target power in percent

- id: illumination_laser_minpower
  type: integer
  description: Minimum allowed power in percent (dynamic)

- id: illumination_laser_maxpower
  type: integer
  description: Maximum allowed power in percent (dynamic)

- id: network_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

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

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: image_brightness
  type: float
  description: Normalized, default 0

- id: image_contrast
  type: float
  description: Normalized, default 1

- id: image_gamma
  type: float
  description: Default 2.2

- id: image_saturation
  type: float
  description: Normalized, default 1

- id: image_sharpness
  type: integer

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_connector_detectedsignal
  type: object
  description: Includes active, name, resolutions, frequencies, scan type, color space, chroma, etc.
```

## Variables
```yaml
- id: system_standby_enable
  type: boolean
  description: Enable/disable standby state (check availability first)

- id: system_eco_enable
  type: boolean
  description: Enable/disable ECO state (check availability first)

- id: image_processing_warp_enable
  type: boolean
  description: Enable/disable all warp functions

- id: image_processing_warp_file_enable
  type: boolean

- id: image_processing_blend_file_enable
  type: boolean

- id: image_processing_blend_file_selected
  type: array
  description: Selected blend filenames

- id: image_processing_blacklevel_file_enable
  type: boolean

- id: image_processing_blacklevel_file_selected
  type: string

- id: dmx_mode
  type: string

- id: dmx_startchannel
  type: integer
  description: Range 1..512

- id: dmx_shutdown
  type: boolean

- id: network_device_lan_ip4config
  type: object
  description: Address, Mask, Gateway, NameServers

- id: optics_shutter_target
  type: enum
  values: [Open, Closed]
```

## Events
```yaml
- id: modelupdated
  description: Triggered when the object structure changes (objects added or removed). Subscribe via signal.subscribe.

- id: property_changed
  description: Triggered when a property value changes. Client implements property.changed with property/value array.

- id: signal_callback
  description: Triggered when a signal is emitted. Client implements signal.callback with signal/argument-list pairs.
```

## Macros
```yaml
- id: warp_upload_and_activate
  description: Upload warp grid XML, select it, then enable warp file processing.
  steps:
    - id: image_processing_warp_file_upload
    - id: image_processing_warp_file_selected
    - id: image_processing_warp_file_enable
    - id: image_processing_warp_enable

- id: blend_upload_and_activate
  description: Upload blend mask PNG, select it, then enable blend file processing.
  steps:
    - id: image_processing_blend_file_upload
    - id: image_processing_blend_file_selected
    - id: image_processing_blend_file_enable

- id: blacklevel_upload_and_activate
  description: Upload black level mask PNG, select it, then enable black level file processing.
  steps:
    - id: image_processing_blacklevel_file_upload
    - id: image_processing_blacklevel_file_selected
    - id: image_processing_blacklevel_file_enable

- id: wake_from_eco
  description: Three documented ways to wake a projector from ECO mode: wake-on-LAN with MAC, remote power button, keypad power button, or send :POWR1\r over RS232.
  steps:
    - id: serial_wake_from_eco
```

## Safety
```yaml
confirmation_required_for:
  - system_poweroff
  - system_poweron
interlocks: []
# Source recommends verifying system.state is standby/ready before poweron and on before poweroff;
# no formal interlock or safety warnings in source.
```

## Notes
Pulse API uses JSON-RPC 2.0 over both RS-232 (19200-8-N-1) and TCP/IP (port 9090). Parameter order in `params` is irrelevant; named parameters only. Subscribe with `property.subscribe` to receive `property.changed` notifications; subscribing does NOT deliver the current value — call `property.get` first. The `system.poweron` and `system.poweroff` methods return `null` result on success (not an error). Authentication is optional for normal end-user access; the `authenticate` method takes a numeric `code` and returns `result: true`. Warp grid XML format is the same as MCM500/400. Blend and blacklevel masks are grayscale PNG/JPEG/TIFF, up to 16-bit PNG; resolution must match the blend/blacklevel layer. Connector naming convention: strip non-word chars and lowercase (e.g. "DisplayPort 1" → "displayport1"). Introspect the API surface for model-specific peripherals (DMX modes, illumination sources, lens features). ECO-mode wakeup needs WoL, physical button, or serial `:POWR1\r` sequence.

<!-- UNRESOLVED: firmware version compatibility range not stated; per-model source/connector/illumination lists vary; image.window.main.position and size properties are documented but no setters shown in examples -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:12:54.044Z
last_checked_at: 2026-08-19T08:52:58.020Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:52:58.020Z
matched_actions: 76
action_count: 76
confidence: medium
summary: "All 76 spec actions map to JSON-RPC methods, property paths, HTTP endpoints, or the :POWR1\\r serial sequence verbatim in source; transport values match RS232 table and port 9090; bidirectional coverage complete. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility not stated; per-model source/connector list varies"
- "firmware version compatibility range not stated; per-model source/connector/illumination lists vary; image.window.main.position and size properties are documented but no setters shown in examples"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
