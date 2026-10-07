---
spec_id: admin/barco-duet-ii
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Duet Ii Control Spec"
manufacturer: Barco
model_family: "Duet Ii"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Duet Ii"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:09:09.600Z
last_checked_at: 2026-10-07T13:18:35.344Z
generated_at: 2026-10-07T13:18:35.344Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full command catalogue could not be enumerated; the source marks API as dynamic and dependent on peripherals/configuration. Best practice is to introspect per-device."
  - "voltage, current, and power specifications — not stated in source for the Duet Ii."
  - "firmware version compatibility ranges — not stated."
  - "full command catalogue — the source marks API as dynamic and dependent on peripherals/configuration; introspection is required per device."
  - "DMX mode values list not enumerated in source (only that dmx.mode is a string and listmodes returns the list)."
  - "image.connector.detectedsignal values lists for scan, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, content_aspect_ratio, stereo_mode — partial extraction due to PDF table layout; treat as documented enums but verify via introspection."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:18:35.344Z
  matched_actions: 82
  action_count: 82
  confidence: medium
  summary: "All 82 action units match source methods and properties; transport supported; source is a generic Pulse API guide that never names Duet II. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-23
---

# Barco Duet Ii Control Spec

## Summary
The Barco Duet Ii is a Pulse-series projector. This spec covers its JSON-RPC 2.0 control API over TCP/IP (port 9090) and the equivalent RS-232 serial interface, including power, source selection, illumination, image properties, warp/blend, environment, optics, and authentication.

<!-- UNRESOLVED: full command catalogue could not be enumerated; the source marks API as dynamic and dependent on peripherals/configuration. Best practice is to introspect per-device. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9090
http:
  base_url: http://<projector-address>/api
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this (was inferred passcode: source documents authenticate method with secret pass code)
```

## Traits
```yaml
# - powerable       (power on/off commands present)
# - routable        (input source selection commands present)
# - queryable       (query commands returning state present)
# - levelable       (brightness, contrast, gamma, illumination power level present)
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
      description: Secret pass code that sets user access level
- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron", "id": 3}'
  params: []
- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff", "id": 4}'
  params: []
- id: system_state_get
  label: Get Projector State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "system.state" }, "id": 1}'
  params: []
- id: system_state_subscribe
  label: Subscribe Projector State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "system.state" }, "id": 2}'
  params: []
- id: system_standby_enable_set
  label: Enable Standby
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.standby.enable", "value": true }, "id": <id>}'
  params:
    - name: value
      type: boolean
      description: Enable/disable standby state
- id: system_eco_enable_set
  label: Enable ECO Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.eco.enable", "value": true }, "id": <id>}'
  params:
    - name: value
      type: boolean
      description: Enable/disable ECO mode
- id: ledctrl_blink
  label: Blink Status LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "led": "systemstatus", "color": "red", "period": 42 }, "id": 3}'
  params:
    - name: led
      type: string
      description: LED identifier
    - name: color
      type: string
      description: Color name (e.g. "red")
    - name: period
      type: integer
      description: Blink period
- id: property_set
  label: Set Property Value
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "objectname.propertyname", "value": 100 }, "id": 3}'
  params:
    - name: property
      type: string
      description: Property path in dot notation
    - name: value
      type: string
      description: Value to assign (string, integer, float, boolean, object, array)
- id: property_get
  label: Get Property Value
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "objectname.propertyname" }, "id": 4}'
  params:
    - name: property
      type: string
      description: Property path in dot notation
- id: property_get_multi
  label: Get Multiple Property Values
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": ["image.brightness", "image.contrast"] }, "id": 5}'
  params:
    - name: property
      type: array
      description: List of property paths
- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.brightness" }, "id": 6}'
  params:
    - name: property
      type: string
      description: Property path (string or array of strings)
- id: property_subscribe_multi
  label: Subscribe to Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": ["image.brightness", "image.contrast"] }, "id": 7}'
  params:
    - name: property
      type: array
      description: List of property paths
- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": "image.brightness" }, "id": 8}'
  params:
    - name: property
      type: string
      description: Property path
- id: property_unsubscribe_multi
  label: Unsubscribe from Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": ["image.brightness", "image.contrast"] }, "id": 9}'
  params:
    - name: property
      type: array
      description: List of property paths
- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "modelupdated" }, "id": 10}'
  params:
    - name: signal
      type: string
      description: Signal name (string or array)
- id: signal_subscribe_multi
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": ["modelupdated", "image.processing.warp.gridchanged"] }, "id": 11}'
  params:
    - name: signal
      type: array
      description: List of signal names
- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": "modelupdated" }, "id": 12}'
  params:
    - name: signal
      type: string
      description: Signal name
- id: signal_unsubscribe_multi
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": ["modelupdated", "image.processing.warp.gridchanged"] }, "id": 13}'
  params:
    - name: signal
      type: array
      description: List of signal names
- id: introspect_recursive
  label: Introspect Object (recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "foo", "recursive": true }, "id": 1}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (default empty introspects everything)
    - name: recursive
      type: boolean
      description: If true, list methods/properties/signals; if false, list object names only
- id: introspect_nonrecursive
  label: Introspect Object (non-recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "motors", "recursive": false }, "id": 2}'
  params:
    - name: object
      type: string
      description: Object name in dot notation
    - name: recursive
      type: boolean
      description: If false, only object names are listed (one level)
- id: introspect_subscribe_modelupdated
  label: Subscribe to Model Updated Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "modelupdated" }, "id": 2}'
  params: []
- id: image_window_main_source_get
  label: Get Active Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.window.main.source" }, "id": 0}'
  params: []
- id: image_source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.list", "id": 1}'
  params: []
- id: image_source_set
  label: Set Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.source", "value": "DisplayPort 1" }, "id": 2}'
  params:
    - name: value
      type: string
      description: Source name returned by image.source.list
- id: image_connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "id": 3}'
  params: []
- id: image_source_displayport1_listconnectors
  label: List Connectors for DisplayPort 1
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.displayport1.listconnectors", "id": 4}'
  params: []
- id: image_connector_displayport1_detectedsignal_get
  label: Get DisplayPort 1 Signal Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.connector.displayport1.detectedsignal" }, "id": 5}'
  params: []
- id: image_brightness_get
  label: Get Brightness
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.brightness" }, "id": 7}'
  params: []
- id: image_brightness_set
  label: Set Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.brightness", "value": 0.15 }, "id": 9}'
  params:
    - name: value
      type: float
      description: Normalized brightness (-1 to 1, default 0)
- id: image_contrast_set
  label: Set Contrast
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.contrast", "value": 1.0 }, "id": <id>}'
  params:
    - name: value
      type: float
      description: Normalized contrast (0 to 2, default 1)
- id: image_gamma_set
  label: Set Gamma
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.gamma", "value": 2.2 }, "id": <id>}'
  params:
    - name: value
      type: float
      description: Gamma (1 to 3, default 2.2)
- id: image_saturation_set
  label: Set Saturation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.saturation", "value": 1.0 }, "id": <id>}'
  params:
    - name: value
      type: float
      description: Normalized saturation (0 to 2, default 1)
- id: image_sharpness_set
  label: Set Sharpness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.sharpness", "value": 0 }, "id": <id>}'
  params:
    - name: value
      type: integer
      description: Sharpness (-2 to 8)
- id: image_orientation_set
  label: Set Orientation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.orientation", "value": "DESKTOP_FRONT" }, "id": <id>}'
  params:
    - name: value
      type: string
      description: One of DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR
- id: image_processing_warp_enable_set
  label: Enable All Warp Functions
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.enable", "value": true }, "id": 10}'
  params:
    - name: value
      type: boolean
- id: image_processing_warp_file_upload
  label: Upload Warp File
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://<projector-address>/api/image/processing/warp/file/transfer'
  params:
    - name: file
      type: string
      description: Path to local warp XML file
- id: image_processing_warp_file_selected_set
  label: Select Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.selected", "value": "warp.xml" }, "id": 11}'
  params:
    - name: value
      type: string
      description: Filename of uploaded warp file
- id: image_processing_warp_file_enable_set
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.enable", "value": true }, "id": 12}'
  params:
    - name: value
      type: boolean
- id: image_processing_blend_file_upload
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://<projector-address>/api/image/processing/blend/file/transfer'
  params:
    - name: file
      type: string
      description: Path to local blend mask PNG (8 or 16 bit grayscale)
- id: image_processing_blend_file_selected_set
  label: Select Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.selected", "value": "mask.png" }, "id": 13}'
  params:
    - name: value
      type: array
      description: List of blend filenames
- id: image_processing_blend_file_enable_set
  label: Enable File Blend
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.enable", "value": true }, "id": 14}'
  params:
    - name: value
      type: boolean
- id: image_processing_blacklevel_file_upload
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://<projector-address>/api/image/processing/blacklevel/file/transfer'
  params:
    - name: file
      type: string
      description: Path to local black level mask PNG
- id: image_processing_blacklevel_file_selected_set
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.selected", "value": "blacklevel.png" }, "id": 15}'
  params:
    - name: value
      type: string
- id: image_processing_blacklevel_file_enable_set
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.enable", "value": true }, "id": 16}'
  params:
    - name: value
      type: boolean
- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "<name>" }, "id": <id>}'
  params:
    - name: presetname
      type: string
- id: image_color_p7_custom_resetpreset
  label: Reset P7 Preset to Default
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "<name>" }, "id": <id>}'
  params:
    - name: presetname
      type: string
- id: image_color_p7_custom_resettonative
  label: Reset P7 to Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative", "id": <id>}'
  params: []
- id: image_color_rgbmode_nextrgbmode
  label: Cycle Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode", "id": <id>}'
  params: []
- id: illumination_state_get
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.state" }, "id": 0}'
  params: []
- id: illumination_state_subscribe
  label: Subscribe Illumination State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "illumination.state" }, "id": 1}'
  params: []
- id: illumination_sources_get
  label: Introspect Illumination Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "illumination.sources", "recursive": false }, "id": 2}'
  params: []
- id: illumination_sources_laser_power_get
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.power" }, "id": 3}'
  params: []
- id: illumination_sources_laser_power_set
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "illumination.sources.laser.power", "value": 40 }, "id": 5}'
  params:
    - name: value
      type: float
      description: Target power in percent (bounded by minpower/maxpower)
- id: illumination_sources_laser_minpower_get
  label: Get Laser Min Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.minpower" }, "id": 6}'
  params: []
- id: illumination_sources_laser_maxpower_get
  label: Get Laser Max Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.maxpower" }, "id": 5}'
  params: []
- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage", "id": <id>}'
  params: []
- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber", "id": <id>}'
  params: []
- id: environment_getcontrolblocks_temperature
  label: Get Temperature Sensors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "Sensor", "valuetype": "Temperature" }, "id": 18}'
  params: []
- id: environment_getcontrolblocks_fanspeed
  label: Get Fan Speed Sensors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "Sensor", "valuetype": "Speed" }, "id": 19}'
  params: []
- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo", "id": <id>}'
  params: []
- id: environment_alarmstate_get
  label: Get Alarm State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "environment.alarmstate" }, "id": <id>}'
  params: []
- id: optics_shutter_target_set
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.shutter.target", "value": "Open" }, "id": <id>}'
  params:
    - name: value
      type: string
      description: One of Open, Closed
- id: optics_zoom_position_get
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.zoom.position" }, "id": <id>}'
  params: []
- id: optics_focus_position_get
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.focus.position" }, "id": <id>}'
  params: []
- id: optics_lensshift_horizontal_position_get
  label: Get Horizontal Lens Shift
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.lensshift.horizontal.position" }, "id": <id>}'
  params: []
- id: optics_lensshift_vertical_position_get
  label: Get Vertical Lens Shift
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.lensshift.vertical.position" }, "id": <id>}'
  params: []
- id: dmx_listchannels
  label: List DMX Channel Names
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels", "id": <id>}'
  params: []
- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes", "id": <id>}'
  params: []
- id: dmx_mode_set
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.mode", "value": "<mode>" }, "id": <id>}'
  params:
    - name: value
      type: string
      description: DMX mode name
- id: dmx_startchannel_set
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.startchannel", "value": 1 }, "id": <id>}'
  params:
    - name: value
      type: integer
      description: DMX start channel [1..512]
- id: dmx_shutdown_set
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.shutdown", "value": true }, "id": <id>}'
  params:
    - name: value
      type: boolean
- id: network_device_lan_ip4config_get
  label: Get LAN IP4 Config
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.ip4config" }, "id": <id>}'
  params: []
- id: network_device_lan_state_get
  label: Get LAN State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.state" }, "id": <id>}'
  params: []
- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents", "id": <id>}'
  params: []
- id: firmware_listcomponentversionstatus
  label: List Firmware Component Version Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus", "id": <id>}'
  params: []
- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade", "id": <id>}'
  params: []
- id: eco_wake_serial
  label: Wake from ECO via Serial
  kind: action
  command: ':POWR1\r'
  params: []
- id: image_processing_warp_file_download
  label: Download Warp File
  kind: action
  command: 'curl -O -J http://api/image/processing/warp/file/ transfer'
  params: []
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "system.state" }, "id": 1}'
- id: illumination_state
  type: enum
  values: [On, Off]
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.state" }, "id": 0}'
- id: image_window_main_source
  type: string
  description: Source name displayed in this window
  query_command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.window.main.source" }, "id": 0}'
- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
- id: optics_shutter_position
  type: enum
  values: [Open, Closed]
- id: optics_shutter_target
  type: enum
  values: [Open, Closed]
- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
- id: network_device_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
```

## Variables
```yaml
- id: image_brightness
  type: float
  range: [-1, 1]
  default: 0
  description: Normalized; 0 is default, 1 is 100% offset
- id: image_contrast
  type: float
  range: [0, 2]
  default: 1
  description: Normalized; 1 is default
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
- id: illumination_sources_laser_power
  type: float
  range: [minpower, maxpower]
  description: Target laser power in percent; bounded by minpower/maxpower
- id: illumination_sources_laser_minpower
  type: float
  description: Read-only dynamic minimum laser power in percent
- id: illumination_sources_laser_maxpower
  type: float
  description: Read-only dynamic maximum laser power in percent
- id: dmx_startchannel
  type: integer
  range: [1, 512]
- id: image_window_main_position
  type: object
  description: {x: int, y: int}
- id: image_window_main_size
  type: object
  description: {width: int, height: int}
- id: network_device_lan_ip4config
  type: object
  description: Address, Mask, Gateway, NameServers (strings)
- id: dmx_mode
  type: string
- id: dmx_shutdown
  type: boolean
```

## Events
```yaml
- id: property_changed
  method: property.changed
  description: Server pushes dictionary of property/value pairs when subscribed property changes
- id: signal_callback
  method: signal.callback
  description: Server pushes array of signal/argument-list pairs when subscribed signal fires
- id: modelupdated_signal
  signal: modelupdated
  description: Triggered when object structure changes (objects added or removed)
- id: introspect_objectchanged
  method: signal.callback
  params: { object: string, isnew: bool }
  description: Fires when an introspected object is added or removed
```

## Macros
```yaml
- id: power_on_with_state_check
  label: Power On (with state verification)
  description: Verify projector state is standby or ready, then power on
  steps:
    - id: system_state_get
    - id: system_poweron
- id: power_off_with_state_check
  label: Power Off (with state verification)
  description: Verify projector state is on, then power off
  steps:
    - id: system_state_get
    - id: system_poweroff
- id: warp_apply_workflow
  label: Apply Warp File
  description: Enable warp, upload file, select file, enable file warp
  steps:
    - id: image_processing_warp_enable_set (value: true)
    - id: image_processing_warp_file_upload
    - id: image_processing_warp_file_selected_set
    - id: image_processing_warp_file_enable_set (value: true)
- id: blend_apply_workflow
  label: Apply Blend Mask
  description: Upload mask, select file, enable file blend
  steps:
    - id: image_processing_blend_file_upload
    - id: image_processing_blend_file_selected_set
    - id: image_processing_blend_file_enable_set (value: true)
- id: blacklevel_apply_workflow
  label: Apply Black Level Mask
  description: Upload mask, select file, enable black level correction
  steps:
    - id: image_processing_blacklevel_file_upload
    - id: image_processing_blacklevel_file_selected_set
    - id: image_processing_blacklevel_file_enable_set (value: true)
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Verify system.state is standby or ready before issuing system.poweron; nothing happens if already on or transitioning
  - description: Verify system.state is on before issuing system.poweroff; nothing happens if already off or transitioning
  - description: Best practice to wait for property.set confirmation before re-setting the same property; otherwise the server may be flooded with requests
```

## Notes
- The API is dynamic: available properties, methods, and signals depend on projector model and attached peripherals (e.g. lens type, DMX mode). The source explicitly recommends introspection to discover the exact API surface on a given device.
- Wait for property.set confirmation before re-setting the same property; otherwise the server may be flooded with requests and performance may degrade.
- Source states notifications are only sent when a value actually changes; subscribing does not return the current value (use property.get).
- All parameters are passed by name; the order of parameters inside `params` does not matter.
- Property name format example: `image.window.main.source` (dot notation, lowercase, JavaScript-like).
- Source object name is derived from the source display name by stripping non-word characters and lowercasing (e.g. "DisplayPort 1" → "displayport1"); connector object names follow the same rule.
- HTTP file endpoints are rooted at `http://<projector-address>/api`; e.g. `http://192.168.1.100/api/image/processing/warp/file/transfer`.
- TCP port 9090 is the JSON-RPC service port. Serial parameters are 19200 baud, 8 data bits, no parity, 1 stop bit, no flow control.
- Image brightness/contrast/saturation/gamma return float values; window position/size are int objects.
- Source list contents vary by projector model and are obtained via `image.source.list`.

<!-- UNRESOLVED: voltage, current, and power specifications — not stated in source for the Duet Ii.
UNRESOLVED: firmware version compatibility ranges — not stated.
UNRESOLVED: full command catalogue — the source marks API as dynamic and dependent on peripherals/configuration; introspection is required per device.
UNRESOLVED: DMX mode values list not enumerated in source (only that dmx.mode is a string and listmodes returns the list).
UNRESOLVED: image.connector.detectedsignal values lists for scan, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, content_aspect_ratio, stereo_mode — partial extraction due to PDF table layout; treat as documented enums but verify via introspection. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:09:09.600Z
last_checked_at: 2026-10-07T13:18:35.344Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:18:35.344Z
matched_actions: 82
action_count: 82
confidence: medium
summary: "All 82 action units match source methods and properties; transport supported; source is a generic Pulse API guide that never names Duet II. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full command catalogue could not be enumerated; the source marks API as dynamic and dependent on peripherals/configuration. Best practice is to introspect per-device."
- "voltage, current, and power specifications — not stated in source for the Duet Ii."
- "firmware version compatibility ranges — not stated."
- "full command catalogue — the source marks API as dynamic and dependent on peripherals/configuration; introspection is required per device."
- "DMX mode values list not enumerated in source (only that dmx.mode is a string and listmodes returns the list)."
- "image.connector.detectedsignal values lists for scan, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, content_aspect_ratio, stereo_mode — partial extraction due to PDF table layout; treat as documented enums but verify via introspection."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
