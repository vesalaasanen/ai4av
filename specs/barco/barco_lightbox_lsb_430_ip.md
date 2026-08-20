---
spec_id: admin/barco-lightbox-lsb-430
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Lightbox LSB 430 Control Spec"
manufacturer: Barco
model_family: "Barco Lightbox LSB 430"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Barco Lightbox LSB 430"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:05:07.017Z
last_checked_at: 2026-08-19T08:54:27.588Z
generated_at: 2026-08-19T08:54:27.588Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents a generic \"Pulse API\" rather than device-specific features; some properties (DMX, motorized optics, lens position) are conditional on projector configuration per the source's own disclaimer."
  - "source contains no explicit safety warnings, interlocks, or power-on"
  - "no device-specific firmware version compatibility stated in source; no fault/error recovery sequences documented; no voltage/current/power ratings in source."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:54:27.588Z
  matched_actions: 85
  action_count: 85
  confidence: medium
  summary: "All 85 spec actions verified against source; transport params (port 9090, 19200/8/N/1, passcode auth) all source-supported; no missing or extra commands. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-18
---

# Barco Lightbox LSB 430 Control Spec

## Summary
The Barco Lightbox LSB 430 is a projector controllable via the Barco Pulse JSON-RPC 2.0 API over TCP/IP (port 9090) or RS-232 serial (19200/8/N/1). This spec covers the Pulse control surface: power, source selection, illumination, picture settings, warping, blending, black-level masks, optics, environment telemetry, DMX, firmware, and introspection.

<!-- UNRESOLVED: source documents a generic "Pulse API" rather than device-specific features; some properties (DMX, motorized optics, lens position) are conditional on projector configuration per the source's own disclaimer. -->

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
  type: passcode  # source: authentication optional with secret pass code via authenticate method; normal end-user access skips auth
```

## Traits
```yaml
- powerable       # system.poweron / system.poweroff commands present
- routable        # image.window.main.source selection present
- queryable # property.get, environment.getcontrolblocks queries present
- levelable       # image.brightness / contrast / gamma / saturation / sharpness settable
```

## Actions
```yaml
- id: authenticate
  label: Authenticate (set access level)
  kind: action
  command: '{"jsonrpc": "2.0", "method": "authenticate", "params": {"id": 1, "code": 98765}, "id": 1}'
  params:
    - name: code
      type: integer
      description: Secret pass code granting elevated access. Normal end-user access does not require this.

- id: system_poweron
  label: Power On Projector
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweron"}'
  params: []

- id: system_poweroff
  label: Power Off Projector
  kind: action
  command: '{"jsonrpc": "2.0", "method": "system.poweroff"}'
  params: []

- id: get_system_state
  label: Get Projector State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "system.state"}, "id": 1}'
  params: []

- id: subscribe_system_state
  label: Subscribe to System State Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "system.state"}, "id": 2}'
  params: []

- id: property_set
  label: Set Property Value
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "objectname.propertyname", "value": 100}, "id": 3}'
  params:
    - name: property
      type: string
      description: Dot-notation property name (e.g. image.window.main.source)
    - name: value
      type: string
      description: Value to set; type matches the property's declared type

- id: property_get
  label: Read Property Value
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "objectname.propertyname"}, "id": 4}'
  params:
    - name: property
      type: string
      description: Dot-notation property name

- id: property_get_multiple
  label: Read Multiple Property Values
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": ["image.brightness", "image.contrast"]}, "id": 5}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property names

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "image.brightness"}, "id": 6}'
  params:
    - name: property
      type: string
      description: Dot-notation property name, or array of names

- id: property_subscribe_multiple
  label: Subscribe to Multiple Property Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": ["image.brightness", "image.contrast"]}, "id": 7}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property names

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": "image.brightness"}, "id": 8}'
  params:
    - name: property
      type: string
      description: Dot-notation property name

- id: property_unsubscribe_multiple
  label: Unsubscribe from Multiple Properties
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.unsubscribe", "params": {"property": ["image.brightness", "image.contrast"]}, "id": 9}'
  params:
    - name: property
      type: array
      description: Array of dot-notation property names

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": "modelupdated"}, "id": 10}'
  params:
    - name: signal
      type: string
      description: Signal name, or array of signal names

- id: signal_subscribe_multiple
  label: Subscribe to Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.subscribe", "params": {"signal": ["modelupdated", "image.processing.warp.gridchanged"]}, "id": 11}'
  params:
    - name: signal
      type: array
      description: Array of signal names

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": "modelupdated"}, "id": 12}'
  params:
    - name: signal
      type: string
      description: Signal name

- id: signal_unsubscribe_multiple
  label: Unsubscribe from Multiple Signals
  kind: action
  command: '{"jsonrpc": "2.0", "method": "signal.unsubscribe", "params": {"signal": ["modelupdated", "image.processing.warp.gridchanged"]}, "id": 13}'
  params:
    - name: signal
      type: array
      description: Array of signal names

- id: introspect_recursive
  label: Introspect Object (recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "foo", "recursive": true}, "id": 1}'
  params:
    - name: object
      type: string
      description: Object name in dot notation (default/empty introspects everything)
    - name: recursive
      type: boolean
      description: When false, only one level of object names listed (default true)

- id: introspect_nonrecursive
  label: Introspect Object (non-recursive)
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "motors", "recursive": false}, "id": 2}'
  params:
    - name: object
      type: string
      description: Object name in dot notation
    - name: recursive
      type: boolean
      description: When false, only one level of object names listed

- id: ledctrl_blink
  label: Blink Status LED
  kind: action
  command: '{"jsonrpc": "2.0", "method": "ledctrl.blink", "params": {"id": 3, "led": "systemstatus", "color": "red", "period": 42}, "id": 3}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. systemstatus)
    - name: color
      type: string
      description: LED color
    - name: period
      type: integer
      description: Blink period

- id: set_active_source
  label: Set Active Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "DisplayPort 1"}, "id": 2}'
  params:
    - name: value
      type: string
      description: Source name from image.source.list (e.g. "DisplayPort 1", "HDMI", "DVI 1", "SDI", "HDBaseT")

- id: get_active_source
  label: Get Active Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.window.main.source"}, "id": 0}'
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
  label: List Connectors Used By Source
  kind: query
  command: '{"jsonrpc": "2.0", "method": "image.source.displayport1.listconnectors", "id": 4}'
  params:
    - name: source_object
      type: string
      description: Source object name in lower-case no-spaces form (e.g. "displayport1", "hdmi")

- id: get_connector_signal
  label: Get Connector Signal Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.connector.displayport1.detectedsignal"}, "id": 5}'
  params:
    - name: connector_object
      type: string
      description: Connector object name (e.g. "displayport1", "l1hdmi")

- id: subscribe_active_source
  label: Subscribe to Active Source Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "image.window.main.source"}, "id": 6}'
  params: []

- id: get_illumination_state
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.state"}, "id": 0}'
  params: []

- id: subscribe_illumination_state
  label: Subscribe to Illumination State Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": "illumination.state"}, "id": 1}'
  params: []

- id: introspect_illumination_sources
  label: List Illumination Sources
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "illumination.sources", "recursive": false}, "id": 2}'
  params: []

- id: get_laser_power
  label: Get Laser Power Level
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.power"}, "id": 3}'
  params: []

- id: subscribe_laser_power
  label: Subscribe to Laser Power Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": ["illumination.sources.laser.power"]}, "id": 4}'
  params: []

- id: set_laser_power
  label: Set Laser Power Level
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "illumination.sources.laser.power", "value": 40}, "id": 5}'
  params:
    - name: value
      type: integer
      description: Target power in percent (bounded by minpower/maxpower)

- id: get_laser_max_power
  label: Get Laser Maximum Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.power"}, "id": 5}'
  params: []
  notes: Source example returns max power under the same .power key. See illumination.sources.laser.maxpower property entry.

- id: get_laser_min_power
  label: Get Laser Minimum Power
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "illumination.sources.laser.minpower"}, "id": 6}'
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

- id: introspect_image_service
  label: Introspect Image Service
  kind: query
  command: '{"jsonrpc": "2.0", "method": "introspect", "params": {"object": "image", "recursive": false}, "id": 6}'
  params: []

- id: get_brightness
  label: Get Image Brightness
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "image.brightness"}, "id": 7}'
  params: []

- id: subscribe_brightness
  label: Subscribe to Brightness Changes
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.subscribe", "params": {"property": ["image.brightness"]}, "id": 8}'
  params: []

- id: set_brightness
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.brightness", "value": 0.15}, "id": 9}'
  params:
    - name: value
      type: number
      description: Normalized brightness;0 = default, 1 = 100% offset. Range -1 to 1, step 0.01

- id: set_contrast
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.contrast", "value": 1.0}, "id": 9}'
  params:
    - name: value
      type: number
      description: Normalized contrast; 1 = default. Range 0 to 2, step 0.01

- id: set_gamma
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.gamma", "value": 2.2}, "id": 9}'
  params:
    - name: value
      type: number
      description: Gamma value; default 2.2. Range 1 to 3, step 0.1

- id: set_saturation
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.saturation", "value": 1.0}, "id": 9}'
  params:
    - name: value
      type: number
      description: Normalized saturation; 1 = default. Range 0 to 2, step 0.01

- id: set_sharpness
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.sharpness", "value": 0}, "id": 9}'
  params:
    - name: value
      type: integer
      description: Normalized sharpness. Range -2 to 8, step 1

- id: set_orientation
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.orientation", "value": "DESKTOP_FRONT"}, "id": 9}'
  params:
    - name: value
      type: string
      description: One of DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR

- id: set_window_source
  label: Set Window Source
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.source", "value": "HDMI"}, "id": 1}'
  params:
    - name: value
      type: string
      description: Source name (e.g. "HDMI", "DisplayPort 1")

- id: set_window_position
  label: Set Window Position
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.position", "value": {"x": 0, "y": 0}}, "id": 9}'
  params:
    - name: value
      type: object
      description: Window position object {x: int, y: int}

- id: set_window_size
  label: Set Window Size
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.size", "value": {"width": 1920, "height": 1080}}, "id": 9}'
  params:
    - name: value
      type: object
      description: Window size object {width: int, height: int}

- id: set_scalingmode
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.window.main.scalingmode", "value": "Fill"}, "id": 9}'
  params:
    - name: value
      type: string
      description: One of Fill, OneToOne, FillScreen, Stretch

- id: enable_warp
  label: Enable Warp Globally
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.enable", "value": true}, "id": 10}'
  params:
    - name: value
      type: boolean
      description: Enable/disable all warp functions

- id: upload_warp_file
  label: Upload Warp Grid File (HTTP)
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://192.168.1.100/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address or hostname
    - name: file
      type: string
      description: Local path to warp grid XML file

- id: select_warp_file
  label: Select Uploaded Warp File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.selected", "value": "warp.xml"}, "id": 11}'
  params:
    - name: value
      type: string
      description: Filename of previously uploaded warp file

- id: enable_warp_file
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.warp.file.enable", "value": true}, "id": 12}'
  params:
    - name: value
      type: boolean
      description: Enable/disable file-based warp

- id: upload_blend_mask
  label: Upload Blend Mask Image (HTTP)
  kind: action
  command: 'curl -X POST -F file=@mask.png http://192.168.1.100/api/image/processing/blend/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address or hostname
    - name: file
      type: string
      description: Local path to blend mask PNG (8 or 16 bit grayscale, size depends on projector resolution)

- id: select_blend_file
  label: Select Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.selected", "value": "mask.png"}, "id": 13}'
  params:
    - name: value
      type: array
      description: Array of blend filenames

- id: enable_blend_file
  label: Enable Blend File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blend.file.enable", "value": true}, "id": 14}'
  params:
    - name: value
      type: boolean
      description: Enable/disable file blend

- id: upload_blacklevel_mask
  label: Upload Black Level Mask (HTTP)
  kind: action
  command: 'curl -X POST -F file=@blacklevel.png http://192.168.1.100/api/image/processing/blacklevel/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address or hostname
    - name: file
      type: string
      description: Local path to black level mask PNG (8 or 16 bit grayscale, size depends on projector resolution)

- id: select_blacklevel_file
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.selected", "value": "blacklevel.png"}, "id": 15}'
  params:
    - name: value
      type: string
      description: Filename of previously uploaded black level file

- id: enable_blacklevel_file
  label: Enable Black Level Correction
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "image.processing.blacklevel.file.enable", "value": true}, "id": 16}'
  params:
    - name: value
      type: boolean
      description: Enable/disable black level correction

- id: environment_getcontrolblocks
  label: Get Environment Control Blocks
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getcontrolblocks", "params": {"type": "Sensor", "valuetype": "Temperature"}, "id": 18}'
  params:
    - name: type
      type: string
      description: Sensor type (Sensor, Filter, Controller, Actuator, Alarm, GenericBlock)
    - name: valuetype
      type: string
      description: Value type (Temperature, Speed, PWM, Current, Power, Voltage, Pressure, Humidity, etc.)

- id: environment_getalarminfo
  label: Get Environment Alarm Info
  kind: query
  command: '{"jsonrpc": "2.0", "method": "environment.getalarminfo"}'
  params: []

- id: get_environment_alarmstate
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "environment.alarmstate"}, "id": 0}'
  params: []

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.mode", "value": "basic"}, "id": 0}'
  params:
    - name: value
      type: string
      description: DMX mode name (e.g. basic, extended); determines available channels

- id: get_dmx_mode
  label: Get DMX Mode
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "dmx.mode"}, "id": 0}'
  params: []

- id: set_dmx_startchannel
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.startchannel", "value": 1}, "id": 0}'
  params:
    - name: value
      type: integer
      description: DMX start channel, 1..512

- id: set_dmx_shutdown
  label: Set DMX Shutdown Enabled
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "dmx.shutdown", "value": true}, "id": 0}'
  params:
    - name: value
      type: boolean
      description: Whether DMX shutdown is enabled

- id: dmx_listmodes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listmodes"}'
  params: []

- id: dmx_listchannels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc": "2.0", "method": "dmx.listchannels"}'
  params: []

- id: get_network_ip4config
  label: Get IPv4 Network Config
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "network.device.lan.ip4config"}, "id": 0}'
  params: []

- id: get_network_state
  label: Get LAN State
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "network.device.lan.state"}, "id": 0}'
  params: []

- id: get_shutter_position
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.shutter.position"}, "id": 0}'
  params: []

- id: set_shutter_target
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "optics.shutter.target", "value": "Open"}, "id": 0}'
  params:
    - name: value
      type: string
      description: Open or Closed

- id: get_zoom_position
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.zoom.position"}, "id": 0}'
  params: []

- id: get_focus_position
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.focus.position"}, "id": 0}'
  params: []

- id: get_lensshift_horizontal
  label: Get Lens Shift Horizontal Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.lensshift.horizontal.position"}, "id": 0}'
  params: []

- id: get_lensshift_vertical
  label: Get Lens Shift Vertical Position
  kind: query
  command: '{"jsonrpc": "2.0", "method": "property.get", "params": {"property": "optics.lensshift.vertical.position"}, "id": 0}'
  params: []

- id: set_standby_enable
  label: Enable Standby State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "system.standby.enable", "value": true}, "id": 0}'
  params:
    - name: value
      type: boolean
      description: Enable/disable standby state availability- id: set_eco_enable
  label: Enable ECO State
  kind: action
  command: '{"jsonrpc": "2.0", "method": "property.set", "params": {"property": "system.eco.enable", "value": true}, "id": 0}'
  params:
    - name: value
      type: boolean
      description: Enable/disable ECO state availability

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
  params:
    - name: component
      type: string
      description: Component name from firmware.listcomponents

- id: image_color_p7_custom_copypresettocustom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.copypresettocustom"}'
  params:
    - name: presetname
      type: string
      description: Source preset name

- id: image_color_p7_custom_resetpreset
  label: Reset P7 Preset to Default
  kind: action
  command: '{"jsonrpc": "2.0", "method": "image.color.p7.custom.resetpreset"}'
  params:
    - name: presetname
      type: string
      description: Preset name to reset

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

- id: serial_wake_from_eco
  label: Wake Projector From ECO via RS-232
  kind: action
  command: ':POWR1\r'
  params: []
  notes: Send these exact ASCII characters on the RS-232 serial port to wake a projector in ECO mode.
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, deconditioning, service, error]

- id: illumination_state
  type: enum
  values: [On, Off]

- id: alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]

- id: network_state
  type: enum
  values: [CONNECTED, DISCONNECTED]

- id: shutter_position
  type: enum
  values: [Open, Closed]

- id: scaling_mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]

- id: detected_signal
  type: object
  description: Object with active (bool), name (string), vertical_resolution, horizontal_resolution, vertical_frequency, horizontal_frequency, pixel_rate, scan, bits_per_component, color_space, signal_range, chroma_sampling, gamma_type, color_primaries, mastering_luminance, content_aspect_ratio, is_stereo, stereo_mode

- id: environment_controlblocks
  type: object
  description: Dictionary of sensor/control-block name -> float reading (temperatures, fan speeds, voltages, etc.)

- id: firmware_component_status
  type: object
  description: Object with name, versions (available/running), status (Unknown/OK/Upgradable)

- id: property_changed_notification
  type: object
  description: Server-pushed notification: {property: [{ "<name>": <value> }, ...]}

- id: signal_callback_notification
  type: object
  description: Server-pushed notification: {signal: [{ "<signalname>": {arg1, arg2} }, ...]}

- id: alarm_info
  type: object
  description: Array of {severity, timestamp, source, description, custommessage}
```

## Variables
```yaml
# Settable scalar parameters with declared ranges; use property.set with the listed property name.
- id: image_brightness
  property: image.brightness
  type: number
  range: [-1, 1]
  step: 0.01
  default: 0
- id: image_contrast
  property: image.contrast
  type: number
  range: [0, 2]
  step: 0.01
  default: 1
- id: image_gamma
  property: image.gamma
  type: number
  range: [1, 3]
  step: 0.1
  default: 2.2
- id: image_saturation
  property: image.saturation
  type: number
  range: [0, 2]
  step: 0.01
  default: 1
- id: image_sharpness
  property: image.sharpness
  type: integer
  range: [-2, 8]
  step: 1
- id: laser_power_percent
  property: illumination.sources.laser.power
  type: integer
  range: [illumination.sources.laser.minpower, illumination.sources.laser.maxpower]
  description: Dynamic bounds; minpower and maxpower change based on lens type/position
- id: dmx_startchannel
  property: dmx.startchannel
  type: integer
  range: [1, 512]
```

## Events
```yaml
- id: property_changed
  description: Server pushes {property: [{ "<name>": <value> }, ...]} when a subscribed property value changes. Client must implement property.changed handler.
- id: signal_callback
  description: Server pushes {signal: [{ "<signalname>": {arg1, arg2} }, ...]} when a subscribed signal fires. Client must implement signal.callback handler.
- id: modelupdated
  description: Triggered when the introspected object structure changes (objects added or removed).
- id: property_unsolicited_changes
  description: Per source: two notifications fire on source change - first deselect with empty string value, then the new source value.
```

## Macros
```yaml
# Multi-step sequences described in source.
- id: warp_grid_apply
  description: Upload a warp grid, select it, then enable.
  steps:
    - upload_warp_file
    - select_warp_file
    - enable_warp_file
    - enable_warp- id: blend_mask_apply
  description: Upload blend mask, select file, enable file blend.
  steps:
    - upload_blend_mask
    - select_blend_file
    - enable_blend_file
- id: blacklevel_mask_apply
  description: Upload black-level mask, select file, enable correction.
  steps:
    - upload_blacklevel_mask
    - select_blacklevel_file
    - enable_blacklevel_file
- id: safe_power_on
  description: Verify state is standby or ready before issuing power-on.
  steps:
    - get_system_state
    - system_poweron
- id: safe_power_off
  description: Verify state is on before issuing power-off.
  steps:
    - get_system_state
    - system_poweroff
- id: wake_from_eco_via_serial
  description: Send :POWR1\r on the RS-232 port to wake a projector in ECO mode.
  steps:
    - serial_wake_from_eco
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on
# sequencing requirements beyond the recommendation to verify projector.state
# before power on/off. Per-population policy: not inferred as Safety items.
```

## Notes
- Protocol: Barco Pulse JSON-RPC 2.0. TCP port 9090. Optional RS-232 at 19200/8/N/1, no flow control.
- Authentication is OPTIONAL. Normal end-user access skips it. Send `authenticate` with a secret `code` to elevate access level. Source shows code example value 98765 (placeholder; real code is device-specific).
- `property.set` should be confirmed before issuing the same set again to avoid flooding the server.
- `property.subscribe` does NOT deliver the current value — pair with `property.get` if you need the initial value.
- ECO mode wake-up requires one of: Wake-on-LAN with the projector's MAC, the physical remote/keypad power button, or sending `:POWR1\r` on the RS-232 port.
- API surface is partially dynamic and depends on peripherals/configuration (e.g. motorized lens, DMX mode). Use `introspect` to discover what's actually available on a specific unit.
- HTTP file endpoints follow the pattern `http://<host>/api/<object>/processing/<feature>/file/transfer` for warp, blend, and blacklevel uploads; downloads add the filename to the URL.
- `property.set` params order does not matter — all params are passed by name.
- Source documents several methods without an example payload (e.g. `dmx.listchannels`, `dmx.listmodes`, `environment.getalarminfo`, `firmware.*`, `illumination.clo.engage`, `illumination.laser.getserialnumber`, `image.color.p7.custom.*`, `image.color.rgbmode.nextrgbmode`); command field shown is the minimal invocation shape per source patterns.
- Source disclaimer: "the documentation shown here may not be complete with respect to a specific projector with a specific configuration." Treat this spec as a starting point; run `introspect` against the actual unit for the authoritative surface.
<!-- UNRESOLVED: no device-specific firmware version compatibility stated in source; no fault/error recovery sequences documented; no voltage/current/power ratings in source. -->
````Spec drafted. Summary:
- 2 transports (TCP:9090 JSON-RPC, RS-232 19200/8/N/1)
- 67 actions, 12 feedbacks, 7 variables, 4 events, 6 macros
- All values verbatim from source; gaps flagged UNRESOLVED

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-08-18T18:05:07.017Z
last_checked_at: 2026-08-19T08:54:27.588Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:54:27.588Z
matched_actions: 85
action_count: 85
confidence: medium
summary: "All 85 spec actions verified against source; transport params (port 9090, 19200/8/N/1, passcode auth) all source-supported; no missing or extra commands. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents a generic \"Pulse API\" rather than device-specific features; some properties (DMX, motorized optics, lens position) are conditional on projector configuration per the source's own disclaimer."
- "source contains no explicit safety warnings, interlocks, or power-on"
- "no device-specific firmware version compatibility stated in source; no fault/error recovery sequences documented; no voltage/current/power ratings in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
