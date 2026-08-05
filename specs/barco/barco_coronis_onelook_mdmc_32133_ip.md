---
spec_id: admin/barco-coronis-onelook-mdmc-32133
schema_version: ai4av-public-spec-v1
revision: 1
title: "Barco Coronis OneLook MDMC 32133 Control Spec"
manufacturer: Barco
model_family: "Coronis OneLook MDMC 32133"
aliases: []
compatible_with:
  manufacturers:
    - Barco
  models:
    - "Coronis OneLook MDMC 32133"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:32:35.014Z
last_checked_at: 2026-08-05T07:24:49.686Z
generated_at: 2026-08-05T07:24:49.686Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is generic \"Pulse API\" for the Barco projector line; specific applicability to MDMC 32133 (medical display) not stated."
  - "no explicit multi-step sequences described in source"
  - "source does not document safety warnings, interlocks, or power-on sequencing requirements beyond \"verify projector state is standby or ready before system.poweron\" and \"verify projector state is on before system.poweroff\""
  - "firmware version compatibility ranges not stated in source; specific feature applicability to MDMC 32133 not stated."
verification:
  verdict: verified
  checked_at: 2026-08-05T07:24:49.686Z
  matched_actions: 82
  action_count: 82
  confidence: medium
  summary: "All 82 spec actions match source JSON-RPC methods/properties or the :POWR1 serial wake token; transport 9090/19200 both verbatim. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-23
---

# Barco Coronis OneLook MDMC 32133 Control Spec

## Summary
Pulse API command catalog for Barco Pulse projectors. Covers JSON-RPC 2.0 control over TCP port 9090, RS-232 serial at 19200 baud, and HTTP file endpoints for warp/blend/black-level masks. Document also references wake-on-LAN and ECO wake via ASCII `:POWR1\r` on serial.

<!-- UNRESOLVED: source is generic "Pulse API" for the Barco projector line; specific applicability to MDMC 32133 (medical display) not stated. -->

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
  type: optional  # source: authentication "only necessary when a higher level than normal end user is required"; skipped for normal end-user access
```

## Traits
```yaml
- powerable       # inferred from system.poweron / system.poweroff methods
- routable        # inferred from image.window.main.source property
- queryable       # inferred from property.get / introspect methods
- levelable       # inferred from image.brightness / contrast / gamma / saturation / sharpness properties
- subscribable    # inferred from property.subscribe and signal.subscribe methods
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

- id: power_state_get
  label: Get Projector State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"system.state"}}'
  params: []

- id: power_state_subscribe
  label: Subscribe to Projector State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"system.state"}}'
  params: []

- id: standby_enable_set
  label: Enable Standby State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.standby.enable","value":true}}'
  params:
    - name: value
      type: boolean
      description: true to enable standby state, false to disable

- id: eco_enable_set
  label: Enable ECO State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"system.eco.enable","value":true}}'
  params:
    - name: value
      type: boolean
      description: true to enable ECO state, false to disable

- id: wake_from_eco_serial
  label: Wake from ECO via Serial
  kind: action
  command: ":POWR1\r"
  params: []

- id: authenticate
  label: Authenticate (Elevated Access)
  kind: action
  command: '{"jsonrpc":"2.0","method":"authenticate","params":{"code":98765}}'
  params:
    - name: code
      type: integer
      description: Secret pass code; sets user access level

- id: source_list
  label: List Available Sources
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.list"}'
  params: []

- id: connector_list
  label: List Available Connectors
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.connector.list"}'
  params: []

- id: active_source_get
  label: Get Active Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.window.main.source"}}'
  params: []

- id: active_source_set
  label: Set Active Source
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.source","value":"DisplayPort 1"}}'
  params:
    - name: value
      type: string
      description: Source name (e.g. "DisplayPort 1", "HDMI", "DVI 1", "HDBaseT", "SDI")

- id: active_source_subscribe
  label: Subscribe to Active Source Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.window.main.source"}}'
  params: []

- id: source_list_connectors
  label: List Connectors for Source
  kind: query
  command: '{"jsonrpc":"2.0","method":"image.source.{source}.listconnectors"}'
  params:
    - name: source
      type: string
      description: Source object name (source name lowercased, non-word chars stripped, e.g. "displayport1")

- id: connector_signal_get
  label: Get Connector Signal Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.connector.{connector}.detectedsignal"}}'
  params:
    - name: connector
      type: string
      description: Connector object name (e.g. "displayport1", "hdmi")

- id: connector_signal_subscribe
  label: Subscribe to Connector Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.connector.{connector}.detectedsignal"}}'
  params:
    - name: connector
      type: string
      description: Connector object name

- id: window_position_set
  label: Set Window Position
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.position","value":{"x":0,"y":0}}}'
  params:
    - name: x
      type: integer
      description: Horizontal position
    - name: y
      type: integer
      description: Vertical position

- id: window_size_set
  label: Set Window Size
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.size","value":{"width":1920,"height":1080}}}'
  params:
    - name: width
      type: integer
      description: Window width in pixels
    - name: height
      type: integer
      description: Window height in pixels

- id: window_scalingmode_set
  label: Set Window Scaling Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.window.main.scalingmode","value":"Fill"}}'
  params:
    - name: value
      type: string
      description: One of "Fill", "OneToOne", "FillScreen", "Stretch"

- id: image_brightness_get
  label: Get Image Brightness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.brightness"}}'
  params: []

- id: image_brightness_set
  label: Set Image Brightness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.brightness","value":0}}'
  params:
    - name: value
      type: float
      description: Normalized -1 to 1; 0 is default, 1 is 100% offset

- id: image_brightness_subscribe
  label: Subscribe to Brightness Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"image.brightness"}}'
  params: []

- id: image_contrast_get
  label: Get Image Contrast
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.contrast"}}'
  params: []

- id: image_contrast_set
  label: Set Image Contrast
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.contrast","value":1}}'
  params:
    - name: value
      type: float
      description: Normalized 0 to 2; 1 is default

- id: image_gamma_get
  label: Get Image Gamma
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.gamma"}}'
  params: []

- id: image_gamma_set
  label: Set Image Gamma
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.gamma","value":2.2}}'
  params:
    - name: value
      type: float
      description: Range 1 to 3; default 2.2

- id: image_saturation_get
  label: Get Image Saturation
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.saturation"}}'
  params: []

- id: image_saturation_set
  label: Set Image Saturation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.saturation","value":1}}'
  params:
    - name: value
      type: float
      description: Normalized 0 to 2; 1 is default

- id: image_sharpness_get
  label: Get Image Sharpness
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"image.sharpness"}}'
  params: []

- id: image_sharpness_set
  label: Set Image Sharpness
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.sharpness","value":0}}'
  params:
    - name: value
      type: integer
      description: Range -2 to 8

- id: image_orientation_set
  label: Set Image Orientation
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.orientation","value":"DESKTOP_FRONT"}}'
  params:
    - name: value
      type: string
      description: One of "DESKTOP_FRONT", "DESKTOP_REAR", "CEILING_FRONT", "CEILING_REAR"

- id: illumination_state_get
  label: Get Illumination State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.state"}}'
  params: []

- id: illumination_state_subscribe
  label: Subscribe to Illumination State
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.state"}}'
  params: []

- id: laser_power_get
  label: Get Laser Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.power"}}'
  params: []

- id: laser_power_set
  label: Set Laser Power
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"illumination.sources.laser.power","value":50}}'
  params:
    - name: value
      type: integer
      description: Target power in percent; bounded by minpower/maxpower

- id: laser_min_power_get
  label: Get Laser Minimum Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.minpower"}}'
  params: []

- id: laser_max_power_get
  label: Get Laser Maximum Power
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"illumination.sources.laser.maxpower"}}'
  params: []

- id: laser_power_subscribe
  label: Subscribe to Laser Power Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"illumination.sources.laser.power"}}'
  params: []

- id: illumination_clo_engage
  label: Engage Constant Light Output
  kind: action
  command: '{"jsonrpc":"2.0","method":"illumination.clo.engage"}'
  params: []

- id: laser_serial_get
  label: Get Laser Serial Number
  kind: query
  command: '{"jsonrpc":"2.0","method":"illumination.laser.getserialnumber"}'
  params: []

- id: warp_enable_set
  label: Enable Global Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.enable","value":true}}'
  params:
    - name: value
      type: boolean
      description: true to enable all warp functions, false to disable

- id: warp_file_upload
  label: Upload Warp Grid File
  kind: action
  command: 'curl -X POST -F file=@warp.xml http://{host}/api/image/processing/warp/file/transfer'
  params:
    - name: host
      type: string
      description: Projector IP address (e.g. 192.168.1.100)
    - name: file
      type: string
      description: Local path to warp grid XML

- id: warp_file_select
  label: Select Warp File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.selected","value":"warp.xml"}}'
  params:
    - name: value
      type: string
      description: Filename of previously uploaded warp grid

- id: warp_file_enable_set
  label: Enable File Warp
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.warp.file.enable","value":true}}'
  params:
    - name: value
      type: boolean
      description: true to enable file-based warp, false to disable

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
      description: Local path to PNG blend mask (8 or 16 bit grayscale)

- id: blend_file_select
  label: Select Blend Files
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.selected","value":["mask.png"]}}'
  params:
    - name: value
      type: array
      description: Array of blend mask filenames

- id: blend_file_enable_set
  label: Enable Blend Mask
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blend.file.enable","value":true}}'
  params:
    - name: value
      type: boolean
      description: true to enable blend mask, false to disable

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
      description: Local path to PNG black-level mask (8 or 16 bit grayscale)

- id: blacklevel_file_select
  label: Select Black Level File
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.selected","value":"blacklevel.png"}}'
  params:
    - name: value
      type: string
      description: Filename of previously uploaded black-level mask

- id: blacklevel_file_enable_set
  label: Enable Black Level Correction
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"image.processing.blacklevel.file.enable","value":true}}'
  params:
    - name: value
      type: boolean
      description: true to enable black level correction, false to disable

- id: shutter_position_get
  label: Get Shutter Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.shutter.position"}}'
  params: []

- id: shutter_target_set
  label: Set Shutter Target
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"optics.shutter.target","value":"Open"}}'
  params:
    - name: value
      type: string
      description: One of "Open", "Closed"

- id: zoom_position_get
  label: Get Zoom Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.zoom.position"}}'
  params: []

- id: focus_position_get
  label: Get Focus Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.focus.position"}}'
  params: []

- id: lensshift_horizontal_get
  label: Get Horizontal Lens Shift Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.horizontal.position"}}'
  params: []

- id: lensshift_vertical_get
  label: Get Vertical Lens Shift Position
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"optics.lensshift.vertical.position"}}'
  params: []

- id: dmx_mode_set
  label: Set DMX Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.mode","value":""}}'
  params:
    - name: value
      type: string
      description: DMX mode name

- id: dmx_startchannel_set
  label: Set DMX Start Channel
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.startchannel","value":1}}'
  params:
    - name: value
      type: integer
      description: DMX start channel 1 to 512

- id: dmx_shutdown_set
  label: Set DMX Shutdown
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"dmx.shutdown","value":true}}'
  params:
    - name: value
      type: boolean
      description: true to enable DMX shutdown, false to disable

- id: dmx_list_channels
  label: List DMX Channels
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listchannels"}'
  params: []

- id: dmx_list_modes
  label: List DMX Modes
  kind: query
  command: '{"jsonrpc":"2.0","method":"dmx.listmodes"}'
  params: []

- id: network_ip4config_get
  label: Get IPv4 Configuration
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.ip4config"}}'
  params: []

- id: network_lan_state_get
  label: Get LAN State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"network.device.lan.state"}}'
  params: []

- id: introspect_recursive
  label: Introspect Object (Recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":true}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation; empty string introspects everything

- id: introspect_nonrecursive
  label: Introspect Object (Non-Recursive)
  kind: query
  command: '{"jsonrpc":"2.0","method":"introspect","params":{"object":"{object}","recursive":false}}'
  params:
    - name: object
      type: string
      description: Object name in dot notation

- id: firmware_list_components
  label: List Firmware Components
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponents"}'
  params: []

- id: firmware_list_component_version_status
  label: List Firmware Component Versions
  kind: query
  command: '{"jsonrpc":"2.0","method":"firmware.listcomponentversionstatus"}'
  params: []

- id: firmware_schedule_component_upgrade
  label: Schedule Firmware Component Upgrade
  kind: action
  command: '{"jsonrpc":"2.0","method":"firmware.schedulecomponentupgrade"}'
  params: []

- id: environment_get_control_blocks
  label: Get Environment Sensor Readings
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getcontrolblocks","params":{"type":"Sensor","valuetype":"Temperature"}}'
  params:
    - name: type
      type: string
      description: Sensor type: "Sensor", "Filter", "Controller", "Actuator", "Alarm", "GenericBlock"
    - name: valuetype
      type: string
      description: Sensor value type, e.g. "Temperature", "Speed", "Voltage", "Current", "Power", "Pressure", "Humidity"

- id: environment_get_alarm_info
  label: Get Environment Alarm Info
  kind: query
  command: '{"jsonrpc":"2.0","method":"environment.getalarminfo"}'
  params: []

- id: environment_alarmstate_get
  label: Get Environment Alarm State
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"environment.alarmstate"}}'
  params: []

- id: property_get
  label: Get Property Value
  kind: query
  command: '{"jsonrpc":"2.0","method":"property.get","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation (objectname.propertyname)

- id: property_set
  label: Set Property Value
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.set","params":{"property":"{property}","value":{value}}}'
  params:
    - name: property
      type: string
      description: Property name in dot notation
    - name: value
      type: any
      description: Value matching the property's type and constraints

- id: property_subscribe
  label: Subscribe to Property Changes
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.subscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names

- id: property_unsubscribe
  label: Unsubscribe from Property
  kind: action
  command: '{"jsonrpc":"2.0","method":"property.unsubscribe","params":{"property":"{property}"}}'
  params:
    - name: property
      type: string
      description: Property name or array of property names

- id: signal_subscribe
  label: Subscribe to Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.subscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names (e.g. "modelupdated")

- id: signal_unsubscribe
  label: Unsubscribe from Signal
  kind: action
  command: '{"jsonrpc":"2.0","method":"signal.unsubscribe","params":{"signal":"{signal}"}}'
  params:
    - name: signal
      type: string
      description: Signal name or array of signal names

- id: ledctrl_blink
  label: Blink Status LED
  kind: action
  command: '{"jsonrpc":"2.0","method":"ledctrl.blink","params":{"led":"systemstatus","color":"red","period":42}}'
  params:
    - name: led
      type: string
      description: LED identifier (e.g. "systemstatus")
    - name: color
      type: string
      description: LED color (e.g. "red")
    - name: period
      type: integer
      description: Blink period

- id: color_p7_copy_preset_to_custom
  label: Copy P7 Preset to Custom
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.copypresettocustom"}'
  params:
    - name: presetname
      type: string
      description: Name of preset to copy

- id: color_p7_reset_preset
  label: Reset P7 Preset to Defaults
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resetpreset"}'
  params:
    - name: presetname
      type: string
      description: Name of preset to reset

- id: color_p7_reset_to_native
  label: Reset P7 to Native Colors
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.p7.custom.resettonative"}'
  params: []

- id: rgbmode_next
  label: Cycle to Next RGB Mode
  kind: action
  command: '{"jsonrpc":"2.0","method":"image.color.rgbmode.nextrgbmode"}'
  params: []
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [boot, eco, standby, ready, conditioning, on, service, deconditioning, error]
  source: system.state property

- id: illumination_state
  type: enum
  values: [On, Off]
  source: illumination.state property

- id: environment_alarm_state
  type: enum
  values: [Fatal, Error, Alert, Warning, Ok]
  source: environment.alarmstate property

- id: network_lan_state
  type: enum
  values: [CONNECTED, DISCONNECTED]
  source: network.device.lan.state property

- id: shutter_position
  type: enum
  values: [Open, Closed]
  source: optics.shutter.position property

- id: window_scaling_mode
  type: enum
  values: [Fill, OneToOne, FillScreen, Stretch]
  source: image.window.main.scalingmode property

- id: image_orientation
  type: enum
  values: [DESKTOP_FRONT, DESKTOP_REAR, CEILING_FRONT, CEILING_REAR]
  source: image.orientation property

- id: firmware_component_status
  type: enum
  values: [Unknown, OK, Upgradable]
  source: firmware.listcomponentversionstatus
```

## Variables
```yaml
- id: image_brightness
  type: float
  range: [-1, 1]
  default: 0
  description: Image brightness/offset; 0 default, 1 is 100% offset
- id: image_contrast
  type: float
  range: [0, 2]
  default: 1
  description: Image contrast/gain; 1 is default
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
- id: illumination_laser_power
  type: integer
  range: [0, 100]
  description: Target power in percent; bounded by minpower/maxpower
- id: illumination_laser_min_power
  type: integer
  range: [0, 100]
  description: Minimum laser power in percent (read-only)
- id: illumination_laser_max_power
  type: integer
  range: [0, 100]
  description: Maximum laser power in percent (read-only)
- id: dmx_startchannel
  type: integer
  range: [1, 512]
- id: dmx_shutdown
  type: boolean
- id: network_lan_ip4config
  type: object
  description: {Address, Mask, Gateway, NameServers}
- id: optics_zoom_position
  type: integer
- id: optics_focus_position
  type: integer
- id: optics_lensshift_horizontal_position
  type: integer
- id: optics_lensshift_vertical_position
  type: integer
- id: window_main_position
  type: object
  description: {x, y}
- id: window_main_size
  type: object
  description: {width, height}
```

## Events
```yaml
- id: property_changed
  description: Server emits this notification when a subscribed property's value changes.
  payload: '{"jsonrpc":"2.0","method":"property.changed","params":{"property":[{"objectname.propertyname":value}]}}'

- id: signal_callback
  description: Server emits this notification when a subscribed signal fires.
  payload: '{"jsonrpc":"2.0","method":"signal.callback","params":{"signal":[{"objectname.signalname":{"arg":value}}]}}'

- id: modelupdated_signal
  description: Triggered when the object structure changes (objects added/removed).
  signal: modelupdated

- id: introspect_object_changed
  description: Notifies when new objects arrive or objects are removed.
  signal: introspect.objectchanged
  payload: '{"signal":[{"introspect.objectchanged":{"object":"motors.motor1","newobject":true}}]}'
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or power-on sequencing requirements beyond "verify projector state is standby or ready before system.poweron" and "verify projector state is on before system.poweroff"
```

## Notes
- Source describes the generic "Pulse API" used across Barco projector lines; per-feature availability on the MDMC 32133 medical display not explicitly stated. Use `introspect` to confirm which objects exist on the target unit.
- Property IDs, signal names, and method names use lower-case dot notation (JavaScript-like).
- All JSON-RPC parameters are passed by name; parameter order does not matter.
- Wait for `property.set` confirmation before issuing the same property.set again to avoid flooding the server.
- Power on/off are no-ops when the projector is already in the requested state or transitioning; check `system.state` first.
- ECO mode wake options: wake-on-LAN (MAC address), remote power button, keypad power button, or serial `:POWR1\r`.
- Notification messages have no `id` field; clients must not reply.
- HTTP file endpoints live under `/api` (e.g. `/api/image/processing/warp/file/transfer`); file download URL pattern is `http://{host}/api/{endpoint}`.
- Mask resolution depends on projector resolution (WUXGA 1920x1200, WQXGA 1280x800, 4K 1280x800, 4K Cinemascope 1280x540).

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source; specific feature applicability to MDMC 32133 not stated. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - "https://www.audiogeneral.com/barco/UDX%20Series/JSON_ReferenceGuide.pdf"
retrieved_at: 2026-07-23T06:32:35.014Z
last_checked_at: 2026-08-05T07:24:49.686Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T07:24:49.686Z
matched_actions: 82
action_count: 82
confidence: medium
summary: "All 82 spec actions match source JSON-RPC methods/properties or the :POWR1 serial wake token; transport 9090/19200 both verbatim. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is generic \"Pulse API\" for the Barco projector line; specific applicability to MDMC 32133 (medical display) not stated."
- "no explicit multi-step sequences described in source"
- "source does not document safety warnings, interlocks, or power-on sequencing requirements beyond \"verify projector state is standby or ready before system.poweron\" and \"verify projector state is on before system.poweroff\""
- "firmware version compatibility ranges not stated in source; specific feature applicability to MDMC 32133 not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
