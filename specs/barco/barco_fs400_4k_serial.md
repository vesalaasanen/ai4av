---
spec_id: admin/barco-fs400-4k
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Fs400 4K Control Spec"
manufacturer: Barco
model_family: "Fs400 4K"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Fs400 4K"
    - Pulse
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-29T18:28:45.143Z
last_checked_at: 2026-08-05T08:03:18.453Z
generated_at: 2026-08-05T08:03:18.453Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "picture-setting property ranges beyond the ones documented; lens calibration ranges; DMX extended-mode channels"
  - "source describes multi-step sequences inline (set source, then subscribe; upload warp file then select then enable) but not as named macros; left empty."
  - "source mentions ECO-mode wake but no formal interlock or confirmation procedures documented"
  - "exact firmware version, exact supported connector set per SKU, DMX extended-mode channel list"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:03:18.453Z
  matched_actions: 81
  action_count: 81
  confidence: medium
  summary: "All 81 spec actions map to JSON-RPC methods, properties, HTTP endpoints, and the serial wake command documented in the source. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-29
---

# Barco Fs400 4K Control Spec

## Summary
Barco Pulse-series projector (Fs400 4K) control via RS-232 serial and TCP/IP JSON-RPC 2.0. Document covers connection, authentication, methods/properties/signals, and file endpoints for warp/blend/blacklevel uploads. Same Pulse API is shared by all connection types.

<!-- UNRESOLVED: picture-setting property ranges beyond the ones documented; lens calibration ranges; DMX extended-mode channels -->

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
  type: passcode  # source: "authenticate" method requires a "code" (pass code); normal end-user access can skip auth
```

## Traits
```yaml
- powerable       # inferred from system.poweron / system.poweroff methods
- routable        # inferred from image.window.main.source property + image.source.list
- queryable       # inferred from property.get / environment.getcontrolblocks methods
- levelable       # inferred from illumination.sources.laser.power, image.brightness/contrast/gamma/saturation/sharpness properties
```

## Actions
```yaml
- id: authenticate
  label: Authenticate (set access level)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": { "id": 1, "code": 98765 }, "id": 1}'
  params:
    - name: code
      type: integer
      description: Secret pass code (example value 98765)

- id: system_poweron
  label: Power On
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
  params: []

- id: system_poweroff
  label: Power Off
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
  params: []

- id: system_state_get
  label: Get Projector State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "system.state" }, "id": 1}'
  params: []

- id: system_state_subscribe
  label: Subscribe to State Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "system.state" }, "id": 2}'
  params: []

- id: ledctrl_blink
  label: Blink LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": { "led": "systemstatus", "color": "red", "period": 42 }, "id": 3}'
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

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "objectname.propertyname", "value": 100 }, "id": 3}'
  params:
    - name: property
      type: string
      description: Object.property in dot notation
    - name: value
      type: string
      description: Value matching property type

- id: property_get
  label: Get Property
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "objectname.propertyname" }, "id": 4}'
  params:
    - name: property
      type: string
      description: Object.property in dot notation

- id: property_get_multi
  label: Get Multiple Properties
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": ["image.brightness", "image.contrast"] }, "id": 5}'
  params:
    - name: property
      type: array
      description: List of object.property strings

- id: property_subscribe
  label: Subscribe to Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.brightness" }, "id": 6}'
  params:
    - name: property
      type: string
      description: Object.property in dot notation

- id: property_subscribe_multi
  label: Subscribe to Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": ["image.brightness", "image.contrast"] }, "id": 7}'
  params:
    - name: property
      type: array
      description: List of object.property strings

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": "image.brightness" }, "id": 8}'
  params:
    - name: property
      type: string
      description: Object.property in dot notation

- id: property_unsubscribe_multi
  label: Unsubscribe from Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": ["image.brightness", "image.contrast"] }, "id": 9}'
  params:
    - name: property
      type: array
      description: List of object.property strings

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "modelupdated" }, "id": 10}'
  params:
    - name: signal
      type: string
      description: Signal name (e.g. "modelupdated")

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

- id: introspect
  label: Introspect Object (recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "foo", "recursive": true }, "id": 1}'
  params:
    - name: object
      type: string
      description: Object name (dot notation; empty = all)
    - name: recursive
      type: boolean
      description: Recurse into sub-objects (default true)

- id: introspect_nonrecursive
  label: Introspect Object (non-recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "motors", "recursive": false }, "id": 2}'
  params:
    - name: object
      type: string
      description: Object name (dot notation)
    - name: recursive
      type: boolean
      description: Set false to list one level

- id: introspect_objectchanged_subscribe
  label: Subscribe to Object-Changed Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "modelupdated" }, "id": 2}'
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
      description: Source name (e.g. "DisplayPort 1", "HDMI", "DVI 1", "DVI 2", "DisplayPort 1", "DisplayPort 2", "Dual DVI", "Dual DisplayPort", "Dual Head DVI", "Dual Head DisplayPort", "HDBaseT", "HDMI", "SDI")

- id: image_source_get
  label: Get Active Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.window.main.source" }, "id": 0}'
  params: []

- id: image_connector_list
  label: List Connectors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.connector.list", "id": 3}'
  params: []

- id: image_source_displayport1_listconnectors
  label: List Connectors for Source (example: displayport1)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.displayport1.listconnectors", "id": 4}'
  params: []

- id: image_connector_signal_get
  label: Get Connector Detected Signal (example: displayport1)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "image.connector.displayport1.detectedsignal" }, "id": 5}'
  params: []

- id: illumination_state_get
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.state" }, "id": 0}'
  params: []

- id: illumination_state_subscribe
  label: Subscribe to Illumination State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "illumination.state" }, "id": 1}'
  params: []

- id: illumination_laser_power_get
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.power" }, "id": 3}'
  params: []

- id: illumination_laser_power_set
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "illumination.sources.laser.power", "value": 40 }, "id": 5}'
  params:
    - name: value
      type: integer
      description: Target power in percent

- id: illumination_laser_power_subscribe
  label: Subscribe to Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": ["illumination.sources.laser.power"] }, "id": 4}'
  params: []

- id: illumination_laser_minpower_get
  label: Get Laser Minimum Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "illumination.sources.laser.minpower" }, "id": 6}'
  params: []

- id: illumination_clo_engage
  label: Engage CLO at Current Light Level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "illumination.clo.engage"}'
  params: []

- id: illumination_laser_getserialnumber
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc": "2.0", "method": "illumination.laser.getserialnumber"}'
  params: []

- id: image_brightness_set
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.brightness", "value": 0.15 }, "id": 9}'
  params:
    - name: value
      type: number
      description: Normalized -1 to 1 (0 default; step 0.01)

- id: image_contrast_set
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.contrast", "value": 1 }, "id": 9}'
  params:
    - name: value
      type: number
      description: Normalized 0 to 2 (1 default; step 0.01)

- id: image_gamma_set
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.gamma", "value": 2.2 }, "id": 9}'
  params:
    - name: value
      type: number
      description: 1 to 3 (default 2.2; step 0.1)

- id: image_saturation_set
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.saturation", "value": 1 }, "id": 9}'
  params:
    - name: value
      type: number
      description: Normalized 0 to 2 (1 default; step 0.01)

- id: image_sharpness_set
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.sharpness", "value": 0 }, "id": 9}'
  params:
    - name: value
      type: integer
      description: -2 to 8 (step 1)

- id: image_orientation_set
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.orientation", "value": "DESKTOP_FRONT" }, "id": 9}'
  params:
    - name: value
      type: string
      description: "DESKTOP_FRONT | DESKTOP_REAR | CEILING_FRONT | CEILING_REAR"

- id: image_window_position_set
  label: Set Window Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.position", "value": {"x": 0, "y": 0} }, "id": 9}'
  params:
    - name: x
      type: integer
      description: Horizontal position
    - name: y
      type: integer
      description: Vertical position

- id: image_window_size_set
  label: Set Window Size
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.size", "value": {"width": 0, "height": 0} }, "id": 9}'
  params:
    - name: width
      type: integer
      description: Width
    - name: height
      type: integer
      description: Height

- id: image_window_scalingmode_set
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.scalingmode", "value": "Fill" }, "id": 9}'
  params:
    - name: value
      type: string
      description: "Fill | OneToOne | FillScreen | Stretch"

- id: image_processing_warp_enable_set
  label: Enable Warp Globally
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.enable", "value": true }, "id": 10}'
  params:
    - name: value
      type: boolean
      description: true to enable

- id: image_processing_warp_file_enable_set
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.enable", "value": true }, "id": 12}'
  params:
    - name: value
      type: boolean
      description: true to enable

- id: image_processing_warp_file_selected_set
  label: Select Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.selected", "value": "warp.xml" }, "id": 11}'
  params:
    - name: value
      type: string
      description: Filename of uploaded warp grid

- id: warp_file_upload
  label: Upload Warp File (HTTP)
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://192.168.1.100/api/image/processing/warp/file/transfer'
  params:
    - name: file
      type: string
      description: Local path to warp XML file
    - name: host
      type: string
      description: Projector IP address

- id: image_processing_blend_file_selected_set
  label: Select Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.selected", "value": "mask.png" }, "id": 13}'
  params:
    - name: value
      type: string
      description: Filename of uploaded blend mask

- id: image_processing_blend_file_enable_set
  label: Enable File Blend
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.enable", "value": true }, "id": 14}'
  params:
    - name: value
      type: boolean
      description: true to enable

- id: blend_mask_upload
  label: Upload Blend Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@mask.png http://192.168.1.100/api/image/processing/blend/file/transfer'
  params:
    - name: file
      type: string
      description: Local path to PNG/JPEG/TIFF mask (gray scale; PNG up to 16-bit)
    - name: host
      type: string
      description: Projector IP address

- id: image_processing_blacklevel_file_selected_set
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.selected", "value": "blacklevel.png" }, "id": 15}'
  params:
    - name: value
      type: string
      description: Filename of uploaded black level mask

- id: image_processing_blacklevel_file_enable_set
  label: Enable File Black Level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.enable", "value": true }, "id": 16}'
  params:
    - name: value
      type: boolean
      description: true to enable

- id: blacklevel_mask_upload
  label: Upload Black Level Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://192.168.1.100/api/image/processing/blacklevel/file/transfer'
  params:
    - name: file
      type: string
      description: Local path to PNG/JPEG/TIFF mask (gray scale; PNG up to 16-bit)
    - name: host
      type: string
      description: Projector IP address

- id: dmx_mode_set
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.mode", "value": "" }, "id": 9}'
  params:
    - name: value
      type: string
      description: Mode name (use dmx.listmodes)

- id: dmx_startchannel_set
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.startchannel", "value": 1 }, "id": 9}'
  params:
    - name: value
      type: integer
      description: 1..512

- id: dmx_shutdown_set
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.shutdown", "value": true }, "id": 9}'
  params:
    - name: value
      type: boolean
      description: true to enable DMX shutdown

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

- id: environment_getcontrolblocks_temperatures
  label: Get Temperature Sensors
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "Sensor", "valuetype": "Temperature" }, "id": 18}'
  params: []

- id: environment_getcontrolblocks_fanspeeds
  label: Get Fan Speeds
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "Sensor", "valuetype": "Speed" }, "id": 19}'
  params: []

- id: environment_alarmstate_get
  label: Get Alarm State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "environment.alarmstate" }, "id": 9}'
  params: []

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  params: []

- id: network_lan_ip4config_get
  label: Get LAN IPv4 Config
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.ip4config" }, "id": 9}'
  params: []

- id: network_lan_state_get
  label: Get LAN State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "network.device.lan.state" }, "id": 9}'
  params: []

- id: optics_shutter_target_open
  label: Open Shutter
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.shutter.target", "value": "Open" }, "id": 9}'
  params: []

- id: optics_shutter_target_close
  label: Close Shutter
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.shutter.target", "value": "Closed" }, "id": 9}'
  params: []

- id: optics_shutter_position_get
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.shutter.position" }, "id": 9}'
  params: []

- id: optics_zoom_position_get
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.zoom.position" }, "id": 9}'
  params: []

- id: optics_focus_position_get
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.focus.position" }, "id": 9}'
  params: []

- id: optics_lensshift_horizontal_position_get
  label: Get Horizontal Lens Shift Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.lensshift.horizontal.position" }, "id": 9}'
  params: []

- id: optics_lensshift_vertical_position_get
  label: Get Vertical Lens Shift Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": { "property": "optics.lensshift.vertical.position" }, "id": 9}'
  params: []

- id: system_standby_enable_set
  label: Enable Standby State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.standby.enable", "value": true }, "id": 9}'
  params:
    - name: value
      type: boolean

- id: system_eco_enable_set
  label: Enable ECO State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "system.eco.enable", "value": true }, "id": 9}'
  params:
    - name: value
      type: boolean

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Versions and Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  params: []

- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "" }, "id": 9}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset P7 Preset
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "" }, "id": 9}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset P7 Custom to Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle to Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  params: []

- id: wake_from_eco_serial
  label: Wake From ECO via Serial
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

- id: illumination_laser_power
  type: integer
  description: Current laser power in percent

- id: illumination_laser_minpower
  type: float
  description: Minimum power in percent (dynamic, depends on lens/position)

- id: illumination_laser_maxpower
  type: float
  description: Maximum power in percent (dynamic, depends on lens/position)

- id: image_window_source
  type: string
  description: Currently active source name

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_window_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: environment_alarmstate
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: environment_alarminfo
  type: array
  description: List of alarm records (severity, timestamp, source, description, custommessage)

- id: environment_temperatures
  type: object
  description: Map of sensor name to temperature (Celsius)

- id: environment_fan_speeds
  type: object
  description: Map of fan name to RPM (tacho)

- id: network_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: network_lan_ip4config
  type: object
  description: Address / Mask / Gateway / NameServers

- id: optics_shutter_position
  type: enum
  values: [Open, Closed]

- id: firmware_components
  type: array
  description: List of firmware components with name/versions/available/running/status

- id: dmx_modes
  type: array
  description: List of available DMX mode names

- id: dmx_channels
  type: array
  description: List of available DMX channel names
```

## Variables
```yaml
- id: image_brightness
  type: float
  min: -1
  max: 1
  default: 0
  step: 0.01

- id: image_contrast
  type: float
  min: 0
  max: 2
  default: 1
  step: 0.01

- id: image_gamma
  type: float
  min: 1
  max: 3
  default: 2.2
  step: 0.1

- id: image_saturation
  type: float
  min: 0
  max: 2
  default: 1
  step: 0.01

- id: image_sharpness
  type: integer
  min: -2
  max: 8
  default: 0
  step: 1

- id: image_window_position
  type: object
  fields: { x: integer, y: integer }

- id: image_window_size
  type: object
  fields: { width: integer, height: integer }

- id: illumination_laser_power_percent
  type: integer
  min: 0
  max: 100
  description: Target power in percent (dynamic min/max from laser.minpower/laser.maxpower)

- id: dmx_mode
  type: string

- id: dmx_startchannel
  type: integer
  min: 1
  max: 512

- id: dmx_shutdown
  type: boolean

- id: image_processing_warp_enable
  type: boolean

- id: image_processing_warp_file_enable
  type: boolean

- id: image_processing_warp_file_selected
  type: string

- id: image_processing_blend_file_enable
  type: boolean

- id: image_processing_blend_file_selected
  type: array
  items: string

- id: image_processing_blacklevel_file_enable
  type: boolean

- id: image_processing_blacklevel_file_selected
  type: string

- id: system_standby_enable
  type: boolean

- id: system_eco_enable
  type: boolean
```

## Events
```yaml
- id: property_changed
  description: Server pushes an array of object.property -> value pairs when subscribed property changes
  example: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"system.state":"ready"}]}}'

- id: signal_callback
  description: Server pushes an array of signal -> argument-list pairs when signal fires
  example: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{"arg1":100,"arg2":"cat"}}]}}'

- id: introspect_objectchanged
  description: Emitted under modelupdated when objects are added/removed
  example: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"introspect.objectchanged":{"object":"motors.motor1","newobject":true}}]}}'
```

## Macros
```yaml
# UNRESOLVED: source describes multi-step sequences inline (set source, then subscribe; upload warp file then select then enable) but not as named macros; left empty.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions ECO-mode wake but no formal interlock or confirmation procedures documented
```

## Notes
All commands are JSON-RPC 2.0 messages over TCP (port 9090) or RS-232 (19200/8/N/1, no flow control). Same JSON-RPC payload works on either transport; the connection type does not affect command availability. Authentication via `authenticate` method with a pass code is optional for normal end-user access. After `property.set`, wait for the confirmation before issuing another `property.set` on the same property to avoid flooding. Source list contents vary by projector model — use `image.source.list` to enumerate at runtime. Blend/blacklevel mask resolution must match the blend/blacklevel layer (e.g. 4K = 1280x800). Pulse API surface is dynamic: introspect to discover model-specific objects, properties, methods, signals.

<!-- UNRESOLVED: exact firmware version, exact supported connector set per SKU, DMX extended-mode channel list -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-29T18:28:45.143Z
last_checked_at: 2026-08-05T08:03:18.453Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:03:18.453Z
matched_actions: 81
action_count: 81
confidence: medium
summary: "All 81 spec actions map to JSON-RPC methods, properties, HTTP endpoints, and the serial wake command documented in the source. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "picture-setting property ranges beyond the ones documented; lens calibration ranges; DMX extended-mode channels"
- "source describes multi-step sequences inline (set source, then subscribe; upload warp file then select then enable) but not as named macros; left empty."
- "source mentions ECO-mode wake but no formal interlock or confirmation procedures documented"
- "exact firmware version, exact supported connector set per SKU, DMX extended-mode channel list"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
