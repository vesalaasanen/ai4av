---
spec_id: admin/barco-fsn-multiviewer-card-mvr
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco FSN Multiviewer Card MVR Control Spec"
manufacturer: Barco
model_family: "FSN Multiviewer Card MVR"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "FSN Multiviewer Card MVR"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-01T18:08:46.804Z
last_checked_at: 2026-08-05T08:03:37.571Z
generated_at: 2026-08-05T08:03:37.571Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility, device-specific command availability, and DMX capability all depend on projector model/configuration."
  - "source does not define named multi-step sequences"
  - "ECO mode wake requires serial escape sequence (:POWR1\\r); full fault-recovery procedures not specified in source"
  - "firmware version compatibility not stated; DMX extended-mode channel count not specified; ECO wake-on-LAN packet format not detailed"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:03:37.571Z
  matched_actions: 67
  action_count: 67
  confidence: medium
  summary: "All 67 spec actions and transport parameters map verbatim to the refined source; spec is a proper subset of source catalog with no extras or drift. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-01
---

# Barco FSN Multiviewer Card MVR Control Spec

## Summary
JSON-RPC 2.0 control interface for Barco Pulse projectors, accessible over TCP/IP (port 9090) or RS-232 serial. The API exposes methods for power, source selection, image properties, illumination, warp/blend/blacklevel files, environment sensors, introspection, and event subscriptions. This spec covers the Pulse command catalog applied to the FSN Multiviewer Card MVR.

<!-- UNRESOLVED: firmware version compatibility, device-specific command availability, and DMX capability all depend on projector model/configuration. -->

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
  type: optional  # source describes authenticate method with secret code; required only for elevated access
```

## Traits
```yaml
- powerable  # inferred from system.poweron / system.poweroff
- routable   # inferred from image.window.main.source property
- queryable  # inferred from property.get / property.subscribe usage
- levelable  # inferred from image.brightness, image.contrast, image.gamma, image.saturation, image.sharpness properties
```

## Actions
```yaml
- id: authenticate
  label: Authenticate (elevated access)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": { "code": 98765 }, "id": 1}'
  params:
    - name: code
      type: integer
      description: Secret pass code; sets user access level

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

- id: property_set
  label: Set Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "objectname.propertyname", "value": 100 }, "id": 3}'
  params:
    - name: property
      type: string
      description: Dot-notation property path
    - name: value
      type: any
      description: Value appropriate for the property type

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
      description: Array of dot-notation property paths

- id: property_subscribe
  label: Subscribe Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": "image.brightness" }, "id": 6}'
  params:
    - name: property
      type: string
      description: Dot-notation property path (string or array)

- id: property_subscribe_multi
  label: Subscribe Multiple Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": { "property": ["image.brightness", "image.contrast"] }, "id": 7}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property paths

- id: property_unsubscribe
  label: Unsubscribe Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": "image.brightness" }, "id": 8}'
  params:
    - name: property
      type: string
      description: Dot-notation property path

- id: property_unsubscribe_multi
  label: Unsubscribe Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": { "property": ["image.brightness", "image.contrast"] }, "id": 9}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property paths

- id: signal_subscribe
  label: Subscribe Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": "modelupdated" }, "id": 10}'
  params:
    - name: signal
      type: string
      description: Signal name (string or array)

- id: signal_subscribe_multi
  label: Subscribe Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": { "signal": ["modelupdated", "image.processing.warp.gridchanged"] }, "id": 11}'
  params:
    - name: signal
      type: array
      description: Array of signal names

- id: signal_unsubscribe
  label: Unsubscribe Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": "modelupdated" }, "id": 12}'
  params:
    - name: signal
      type: string
      description: Signal name

- id: signal_unsubscribe_multi
  label: Unsubscribe Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": { "signal": ["modelupdated", "image.processing.warp.gridchanged"] }, "id": 13}'
  params:
    - name: signal
      type: array
      description: Array of signal names

- id: introspect
  label: Introspect Object (recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "foo", "recursive": true }, "id": 1}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (default empty = all)
    - name: recursive
      type: boolean
      description: If false, only direct children listed (default true)

- id: introspect_nonrecursive
  label: Introspect Object (non-recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": { "object": "motors", "recursive": false }, "id": 2}'
  params:
    - name: object
      type: string
      description: Object name in dot notation

- id: introspect_alt
  label: Introspect Object (alt positional)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": ["foo", true], "id": 1}'
  params:
    - name: params
      type: array
      description: Positional form [object, recursive]

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
  label: List Connectors Used by Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.displayport1.listconnectors", "id": 4}'
  params:
    - name: source_object_name
      type: string
      description: Source object name (e.g. displayport1); derived by stripping non-word chars and lowercasing the source name

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.source", "value": "DisplayPort 1" }, "id": 2}'
  params:
    - name: value
      type: string
      description: Source name from image.source.list (e.g. "DisplayPort 1", "HDMI")

- id: warp_enable
  label: Enable Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.enable", "value": true }, "id": 10}'
  params: []

- id: warp_upload_file
  label: Upload Warp Grid File
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://192.168.1.100/api/image/processing/warp/file/transfer'
  params:
    - name: file
      type: string
      description: Local path to warp XML file

- id: warp_select_file
  label: Select Warp Grid File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.selected", "value": "warp.xml" }, "id": 11}'
  params:
    - name: value
      type: string
      description: Filename of uploaded warp grid

- id: warp_file_enable
  label: Enable Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.warp.file.enable", "value": true }, "id": 12}'
  params: []

- id: blend_upload_file
  label: Upload Blend Mask
  kind: action
  command: 'curl -X POST -F file=@mask.png http://192.168.1.100/api/image/processing/blend/file/transfer'
  params:
    - name: file
      type: string
      description: Local path to blend mask PNG (8 or 16 bit grayscale)

- id: blend_select_file
  label: Select Blend Mask File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.selected", "value": "mask.png" }, "id": 13}'
  params:
    - name: value
      type: string
      description: Filename of uploaded blend mask

- id: blend_file_enable
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blend.file.enable", "value": true }, "id": 14}'
  params: []

- id: blacklevel_upload_file
  label: Upload Black Level Mask
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://192.168.1.100/api/image/processing/blacklevel/file/transfer'
  params:
    - name: file
      type: string
      description: Local path to black level mask PNG (8 or 16 bit grayscale)

- id: blacklevel_select_file
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.selected", "value": "blacklevel.png" }, "id": 15}'
  params:
    - name: value
      type: string
      description: Filename of uploaded black level mask

- id: blacklevel_file_enable
  label: Enable Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.processing.blacklevel.file.enable", "value": true }, "id": 16}'
  params: []

- id: illumination_laser_power_set
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "illumination.sources.laser.power", "value": 40 }, "id": 5}'
  params:
    - name: value
      type: integer
      description: Power in percent (within minpower/maxpower range)

- id: illumination_clo_engage
  label: Engage CLO (Constant Light Output)
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
      type: float
      description: Normalized brightness offset; -1 to 1, default 0

- id: image_contrast_set
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.contrast", "value": 1.0 }}'
  params:
    - name: value
      type: float
      description: Normalized contrast; 0 to 2, default 1

- id: image_gamma_set
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.gamma", "value": 2.2 }}'
  params:
    - name: value
      type: float
      description: Gamma value; 1 to 3, default 2.2

- id: image_saturation_set
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.saturation", "value": 1.0 }}'
  params:
    - name: value
      type: float
      description: Normalized saturation; 0 to 2, default 1

- id: image_sharpness_set
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.sharpness", "value": 0 }}'
  params:
    - name: value
      type: integer
      description: Sharpness; -2 to 8

- id: image_orientation_set
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.orientation", "value": "DESKTOP_FRONT" }}'
  params:
    - name: value
      type: string
      enum: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_window_position_set
  label: Set Window Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.position", "value": { "x": 0, "y": 0 } }}'
  params:
    - name: value
      type: object
      description: Object with int x, int y

- id: image_window_size_set
  label: Set Window Size
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.size", "value": { "width": 1920, "height": 1200 } }}'
  params:
    - name: value
      type: object
      description: Object with int width, int height

- id: image_window_scalingmode_set
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "image.window.main.scalingmode", "value": "Fill" }}'
  params:
    - name: value
      type: string
      enum: [Fill, OneToOne, FillScreen, Stretch]

- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset To Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom", "params": { "presetname": "" }}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resetpreset
  label: Reset P7 Preset
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset", "params": { "presetname": "" }}'
  params:
    - name: presetname
      type: string

- id: image_color_p7_custom_resettonative
  label: Reset P7 To Native
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resettonative"}'
  params: []

- id: image_color_rgbmode_nextrgbmode
  label: Cycle Next RGB Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.rgbmode.nextrgbmode"}'
  params: []

- id: environment_getcontrolblocks_temperatures
  label: Read All Temperatures
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "Sensor", "valuetype": "Temperature" }, "id": 18}'
  params: []

- id: environment_getcontrolblocks_fanspeeds
  label: Read All Fan Speeds
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": { "type": "Sensor", "valuetype": "Speed" }, "id": 19}'
  params: []

- id: environment_getalarminfo
  label: Get Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  params: []

- id: optics_shutter_set
  label: Set Shutter Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.shutter.target", "value": "Open" }}'
  params:
    - name: value
      type: string
      enum: [Open, Closed]

- id: optics_zoom_set
  label: Set Zoom Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.zoom.position", "value": 0 }}'
  params:
    - name: value
      type: integer

- id: optics_focus_set
  label: Set Focus Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.focus.position", "value": 0 }}'
  params:
    - name: value
      type: integer

- id: optics_lensshift_horizontal_set
  label: Set Horizontal Lens Shift
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.lensshift.horizontal.position", "value": 0 }}'
  params:
    - name: value
      type: integer

- id: optics_lensshift_vertical_set
  label: Set Vertical Lens Shift
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "optics.lensshift.vertical.position", "value": 0 }}'
  params:
    - name: value
      type: integer

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

- id: dmx_mode_set
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.mode", "value": "" }}'
  params:
    - name: value
      type: string

- id: dmx_startchannel_set
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.startchannel", "value": 1 }}'
  params:
    - name: value
      type: integer
      description: 1..512

- id: dmx_shutdown_set
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": { "property": "dmx.shutdown", "value": false }}'
  params:
    - name: value
      type: boolean

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

- id: firmware_listcomponents
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponents"}'
  params: []

- id: firmware_listcomponentversionstatus
  label: List Firmware Versions & Status
  kind: query
  command: '{"jsonrpc": "2.0", "method": "firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedulecomponentupgrade
  label: Schedule Firmware Upgrade
  kind: action
  command: '{"jsonrpc": "2.0", "method": "firmware.schedulecomponentupgrade"}'
  params: []

- id: serial_wake_from_eco
  label: Wake From ECO Mode (RS-232 only)
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

- id: environment_alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: optics_shutter_position
  type: enum
  values: [Open, Closed]

- id: network_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
```

## Variables
```yaml
- id: illumination_laser_power
  type: integer
  description: Laser power in percent
  range: {min: 0, max: 100}

- id: illumination_laser_minpower
  type: integer
  description: Minimum laser power in percent (read-only, dynamic)
  access: read

- id: illumination_laser_maxpower
  type: integer
  description: Maximum laser power in percent (read-only, dynamic)
  access: read

- id: image_brightness
  type: float
  description: Normalized brightness offset; 0 default, 1 = 100% offset
  range: {min: -1, max: 1, step: 0.01}

- id: image_contrast
  type: float
  description: Normalized contrast; 1 default
  range: {min: 0, max: 2, step: 0.01}

- id: image_gamma
  type: float
  description: Gamma value; default 2.2
  range: {min: 1, max: 3, step: 0.1}

- id: image_saturation
  type: float
  description: Normalized color saturation; 1 default
  range: {min: 0, max: 2, step: 0.01}

- id: image_sharpness
  type: integer
  description: Normalized image sharpness
  range: {min: -2, max: 8}

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: image_window_main_source
  type: string
  description: Active source name for main window

- id: image_window_main_scalingmode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: dmx_mode
  type: string

- id: dmx_startchannel
  type: integer
  range: {min: 1, max: 512}

- id: dmx_shutdown
  type: boolean

- id: network_lan_ip4config
  type: object
  description: Address, Mask, Gateway, NameServers (strings)
```

## Events
```yaml
- id: property_changed
  description: Sent when a subscribed property value changes; payload is an array of property/value pairs
  example: '{"jsonrpc": "2.0", "method": "property.changed", "params": { "property": [ { "system.state": "ready" } ] }}'

- id: signal_callback
  description: Sent when a subscribed signal fires; payload is an array of signal/argument-list pairs
  example: '{"jsonrpc": "2.0", "method": "signal.callback", "params": { "signal": [ { "objectname.signalname": { "arg1": 100, "arg2": "cat" } } ] }}'

- id: modelupdated
  description: Introspection signal triggered when object structure changes (objects added/removed)

- id: introspect_objectchanged
  description: Signal sent via signal.callback when objects are added/lost; args {object: string, isnew: bool}
```

## Macros
```yaml
# UNRESOLVED: source does not define named multi-step sequences
```

## Safety
```yaml
confirmation_required_for:
  - system_poweroff  # source recommends verifying system.state == on before issuing
  - system_poweron   # source recommends verifying system.state in {standby, ready} before issuing
interlocks: []
# UNRESOLVED: ECO mode wake requires serial escape sequence (:POWR1\r); full fault-recovery procedures not specified in source
```

## Notes
Both TCP (port 9090, JSON-RPC 2.0 over TCP) and RS-232 (19200 8N1, ASCII commands) carry the same Pulse command set per source. Auth is optional — skip for normal end-user access; supply a numeric pass code for elevated access. Property paths use dot notation (e.g. `image.window.main.source`). For multi-property get/subscribe, pass an array. Source object names are derived from display names by stripping non-word chars and lowercasing (e.g. "DisplayPort 1" -> "displayport1"). The warp file format follows the legacy MCM500/400. Blend and blacklevel masks are 8- or 16-bit grayscale PNG/JPEG/TIFF; only the blue channel of color uploads is used. Several APIs (DMX channels, lens motorized features, illumination sources) are model/configuration-dependent; use `introspect` to discover the actual surface on a specific device.
<!-- UNRESOLVED: firmware version compatibility not stated; DMX extended-mode channel count not specified; ECO wake-on-LAN packet format not detailed -->
````

Admin path next:
1. `entity_id` set to `barco_fsn_multiviewer_card_mvr` per input.

Caveat: source doc says "Pulse projectors" — applied to FSN Multiviewer Card MVR per operator instruction. Verify device actually runs Pulse API before promoting to S-tier.

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-01T18:08:46.804Z
last_checked_at: 2026-08-05T08:03:37.571Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:03:37.571Z
matched_actions: 67
action_count: 67
confidence: medium
summary: "All 67 spec actions and transport parameters map verbatim to the refined source; spec is a proper subset of source catalog with no extras or drift. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility, device-specific command availability, and DMX capability all depend on projector model/configuration."
- "source does not define named multi-step sequences"
- "ECO mode wake requires serial escape sequence (:POWR1\\r); full fault-recovery procedures not specified in source"
- "firmware version compatibility not stated; DMX extended-mode channel count not specified; ECO wake-on-LAN packet format not detailed"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
